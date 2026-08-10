import nodemailer from 'nodemailer';

const NOTIFICATION_TO = 'cleanwithbest@gmail.com';
const DEFAULT_SITE_URL = 'https://cleanwithbest.com';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

function cleanValue(value) {
  if (value === undefined || value === null || value === '') return 'Not provided';
  return String(value);
}

function escapeHtml(value) {
  return cleanValue(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function detailRows(rows) {
  return rows
    .map(([label, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#475569;font-weight:700;">${escapeHtml(label)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(value)}</td></tr>`)
    .join('');
}

function textLines(rows) {
  return rows.map(([label, value]) => `${label}: ${cleanValue(value)}`).join('\n');
}

function getAdminUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || DEFAULT_SITE_URL;
  return `${siteUrl.replace(/\/$/, '')}/admin`;
}

async function sendNotification({ subject, heading, intro, rows }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('Email notification skipped: SMTP_HOST, SMTP_USER, or SMTP_PASSWORD is missing.');
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const adminUrl = getAdminUrl();

  await transporter.sendMail({
    from,
    to: NOTIFICATION_TO,
    replyTo: rows.find(([label]) => label === 'Email')?.[1] || undefined,
    subject,
    text: `${heading}\n\nHey Krishna/Deepak,\n\n${intro}\n\nAdmin login: ${adminUrl}\n\n${textLines(rows)}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="background:#0f766e;color:#ffffff;padding:18px 22px;">
            <h1 style="margin:0;font-size:20px;">${escapeHtml(heading)}</h1>
          </div>
          <div style="padding:18px 22px;border-bottom:1px solid #e2e8f0;">
            <p style="margin:0 0 8px;color:#0f172a;font-size:16px;font-weight:700;">Hey Krishna/Deepak,</p>
            <p style="margin:0 0 14px;color:#0f172a;font-size:16px;line-height:1.5;">${escapeHtml(intro)}</p>
            <a href="${escapeHtml(adminUrl)}" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;font-weight:700;border-radius:8px;padding:11px 16px;">Open Admin Dashboard</a>
            <p style="margin:12px 0 0;color:#64748b;font-size:13px;">Admin login: ${escapeHtml(adminUrl)}</p>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tbody>${detailRows(rows)}</tbody>
          </table>
        </div>
      </div>
    `,
  });
}

export function sendContactNotification(contact) {
  const name = cleanValue(contact.name);

  return sendNotification({
    subject: `New message from ${name}`,
    heading: 'New Website Message',
    intro: `You received a new message from ${name}. Please check the website admin dashboard.`,
    rows: [
      ['Name', contact.name],
      ['Email', contact.email],
      ['Phone', contact.phone],
      ['Subject', contact.subject],
      ['Message', contact.message],
    ],
  });
}

function money(pence = 0) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(Number(pence || 0) / 100);
}

function orderItemRows(order) {
  return (order.items || [])
    .map(item => `<tr><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;">${escapeHtml(`${item.quantity}x ${item.name}`)}</td><td style="padding:8px 12px;border-bottom:1px solid #e2e8f0;color:#0f172a;text-align:right;">${money(item.unitAmount * item.quantity)}</td></tr>`)
    .join('');
}

function orderItemLines(order) {
  return (order.items || []).map(item => `${item.quantity}x ${item.name} - ${money(item.unitAmount * item.quantity)}`).join('\n');
}

const STATUS_MESSAGES = {
  paid: { subject: 'Order confirmed', heading: "We've got your order!", intro: 'Thanks for your order. We are getting it ready.' },
  packing: { subject: 'Order update: packing', heading: 'Your order is being packed', intro: 'Good news, we are packing your order now.' },
  shipped: { subject: 'Order update: shipped', heading: 'Your order is on its way', intro: 'Your order has been shipped and is on its way to you.' },
  fulfilled: { subject: 'Order delivered', heading: 'Your order has been delivered', intro: 'Your order has been delivered. Thanks for shopping with us!' },
  cancelled: { subject: 'Order cancelled', heading: 'Your order was cancelled', intro: 'Your order has been cancelled. If you were not expecting this, please reply to this email or contact us.' },
};

async function sendOrderEmail(order, { subject, heading, intro }) {
  const to = order.customer?.email;
  if (!to) {
    console.warn(`Order email skipped for order #${order.id}: no customer email on file.`);
    return;
  }

  const transporter = getTransporter();
  if (!transporter) {
    console.warn('Order email skipped: SMTP_HOST, SMTP_USER, or SMTP_PASSWORD is missing.');
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const name = order.customer?.name ? cleanValue(order.customer.name) : 'there';
  const deliveryAddress = order.delivery?.address
    ? [order.delivery.address.line1, order.delivery.address.line2, order.delivery.address.city, order.delivery.address.postal_code]
        .filter(Boolean)
        .join(', ')
    : '';

  await transporter.sendMail({
    from,
    to,
    subject: `${subject} - Order #${order.id} - CleanWithBest`,
    text: `${heading}\n\nHi ${name},\n\n${intro}\n\nOrder #${order.id}\n${orderItemLines(order)}\n\nSubtotal: ${money(order.subtotal)}\nDelivery: ${order.shipping ? money(order.shipping) : 'Free'}\nTotal: ${money(order.total)}\n${deliveryAddress ? `\nDelivery address: ${deliveryAddress}\n` : ''}\nWe will email you again as your order progresses. Questions? Just reply to this email.\n\nCleanWithBest`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="background:#0f766e;color:#ffffff;padding:18px 22px;">
            <h1 style="margin:0;font-size:20px;">${escapeHtml(heading)}</h1>
          </div>
          <div style="padding:18px 22px;border-bottom:1px solid #e2e8f0;">
            <p style="margin:0 0 8px;color:#0f172a;font-size:16px;font-weight:700;">Hi ${escapeHtml(name)},</p>
            <p style="margin:0 0 4px;color:#0f172a;font-size:15px;line-height:1.5;">${escapeHtml(intro)}</p>
            <p style="margin:12px 0 0;color:#64748b;font-size:13px;">We'll email you again as your order progresses.</p>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            <tbody>${orderItemRows(order)}</tbody>
          </table>
          <div style="padding:14px 22px;border-top:1px solid #e2e8f0;font-size:14px;color:#0f172a;">
            <div style="display:flex;justify-content:space-between;"><span>Subtotal</span><span>${money(order.subtotal)}</span></div>
            <div style="display:flex;justify-content:space-between;"><span>Delivery</span><span>${order.shipping ? money(order.shipping) : 'Free'}</span></div>
            <div style="display:flex;justify-content:space-between;font-weight:700;font-size:16px;margin-top:6px;"><span>Total</span><span>${money(order.total)}</span></div>
          </div>
          ${deliveryAddress ? `<div style="padding:0 22px 18px;font-size:13px;color:#475569;">Delivery address: ${escapeHtml(deliveryAddress)}</div>` : ''}
        </div>
      </div>
    `,
  });
}

export function sendOrderConfirmationEmail(order) {
  const { subject, heading, intro } = STATUS_MESSAGES.paid;
  return sendOrderEmail(order, { subject, heading, intro });
}

export function sendOrderStatusEmail(order, status) {
  const message = STATUS_MESSAGES[status];
  if (!message) return Promise.resolve();
  return sendOrderEmail(order, message);
}

export function sendQuoteNotification(quote) {
  const name = cleanValue(`${quote.firstName || ''} ${quote.lastName || ''}`.trim());

  return sendNotification({
    subject: `New quote request from ${name}`,
    heading: 'New Quote Request',
    intro: `You received a new quote request from ${name}. Please check the website admin dashboard.`,
    rows: [
      ['Name', `${quote.firstName || ''} ${quote.lastName || ''}`.trim()],
      ['Phone', quote.phone],
      ['Email', quote.email],
      ['Contact preference', quote.contactPreference],
      ['Service', quote.service],
      ['Property type', quote.propertyType],
      ['Property size', quote.propertySize],
      ['Bedrooms', quote.bedrooms],
      ['Bathrooms', quote.bathrooms],
      ['Frequency', quote.frequency],
      ['Preferred date', quote.preferredDate],
      ['Postcode', quote.postcode],
      ['Address', quote.address],
      ['Message', quote.message],
    ],
  });
}
