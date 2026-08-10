import crypto from 'crypto';
import { NextResponse } from 'next/server';
import { getOrders, updateOrder } from '@/backend/db';
import { sendOrderConfirmationEmail } from '@/backend/mail';

export const runtime = 'nodejs';

function verifyStripeSignature(payload, signatureHeader, secret) {
  if (!signatureHeader || !secret) return false;
  const parts = Object.fromEntries(signatureHeader.split(',').map(part => part.split('=')));
  const timestamp = parts.t;
  const signature = parts.v1;
  if (!timestamp || !signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`)
    .digest('hex');

  const expectedBuffer = Buffer.from(expected);
  const signatureBuffer = Buffer.from(signature);
  return expectedBuffer.length === signatureBuffer.length && crypto.timingSafeEqual(expectedBuffer, signatureBuffer);
}

export async function POST(request) {
  try {
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    const payload = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!verifyStripeSignature(payload, signature, webhookSecret)) {
      return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(payload);
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const orderId = session.metadata?.order_id;

      if (orderId) {
        const orders = await getOrders();
        const order = orders.find(item => String(item.id) === String(orderId));
        if (order) {
          const updatedOrder = await updateOrder(orderId, {
            items: order.items || [],
            subtotal: order.subtotal,
            shipping: order.shipping,
            total: order.total,
            currency: order.currency || 'gbp',
            stripeSessionId: session.id,
            customer: session.customer_details || null,
            delivery: session.shipping_details || null,
          }, 'paid');

          if (updatedOrder) {
            sendOrderConfirmationEmail(updatedOrder).catch(error => {
              console.error('Order confirmation email failed:', error);
            });
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
