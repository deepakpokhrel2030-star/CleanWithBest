import { NextResponse } from 'next/server';
import { addOrder, getProducts } from '@/backend/db';

export const runtime = 'nodejs';

function priceToPence(price = '') {
  const match = String(price).replace(/,/g, '').match(/(\d+(?:\.\d{1,2})?)/);
  if (!match) return 0;
  return Math.round(Number(match[1]) * 100);
}

function siteUrl(request) {
  return process.env.NEXT_PUBLIC_SITE_URL
    || process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`
    || request.nextUrl.origin;
}

export async function POST(request) {
  try {
    const stripeSecret = process.env.STRIPE_SECRET_KEY?.trim();
    if (!stripeSecret) {
      return NextResponse.json(
        { success: false, error: 'Online payment is not configured yet. Add STRIPE_SECRET_KEY to enable checkout.' },
        { status: 500 }
      );
    }

    const { items } = await request.json();
    const basket = Array.isArray(items) ? items : [];
    if (basket.length === 0) {
      return NextResponse.json({ success: false, error: 'Your basket is empty.' }, { status: 400 });
    }

    const products = await getProducts();
    const productMap = new Map(products.map(product => [String(product.id), product]));
    const orderItems = basket
      .map(item => {
        const product = productMap.get(String(item.id));
        const quantity = Math.max(1, Math.min(20, Number(item.quantity) || 1));
        const unitAmount = priceToPence(product?.price);
        if (!product || unitAmount <= 0) return null;
        return { product, quantity, unitAmount };
      })
      .filter(Boolean);

    if (orderItems.length === 0) {
      return NextResponse.json({ success: false, error: 'No available products found in your basket.' }, { status: 400 });
    }

    const subtotal = orderItems.reduce((total, item) => total + item.unitAmount * item.quantity, 0);
    const shipping = subtotal >= 5000 ? 0 : 499;
    const total = subtotal + shipping;
    const origin = siteUrl(request);
    const order = await addOrder({
      items: orderItems.map(({ product, quantity, unitAmount }) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        unitAmount,
      })),
      subtotal,
      shipping,
      total,
      currency: 'gbp',
    });

    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', `${origin}/shop/success?order=${order.id}`);
    params.set('cancel_url', `${origin}/shop?checkout=cancelled`);
    params.set('shipping_address_collection[allowed_countries][0]', 'GB');
    params.set('metadata[order_id]', String(order.id));
    params.set('payment_intent_data[metadata][order_id]', String(order.id));

    orderItems.forEach(({ product, quantity, unitAmount }, index) => {
      params.set(`line_items[${index}][quantity]`, String(quantity));
      params.set(`line_items[${index}][price_data][currency]`, 'gbp');
      params.set(`line_items[${index}][price_data][unit_amount]`, String(unitAmount));
      params.set(`line_items[${index}][price_data][product_data][name]`, product.name);
      if (product.description) {
        params.set(`line_items[${index}][price_data][product_data][description]`, product.description.slice(0, 250));
      }
    });

    if (shipping > 0) {
      const shippingIndex = orderItems.length;
      params.set(`line_items[${shippingIndex}][quantity]`, '1');
      params.set(`line_items[${shippingIndex}][price_data][currency]`, 'gbp');
      params.set(`line_items[${shippingIndex}][price_data][unit_amount]`, String(shipping));
      params.set(`line_items[${shippingIndex}][price_data][product_data][name]`, 'UK delivery');
    }

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeSecret}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });
    const stripeJson = await stripeRes.json();

    if (!stripeRes.ok) {
      console.error('Stripe checkout error:', stripeJson);
      return NextResponse.json({ success: false, error: 'Could not start payment. Please try again.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, url: stripeJson.url });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
