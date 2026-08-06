import nodemailer from 'nodemailer';

const NOTIFICATION_TO = 'cleanwithbest@gmail.com';

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

async function sendNotification({ subject, heading, rows }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('Email notification skipped: SMTP_HOST, SMTP_USER, or SMTP_PASSWORD is missing.');
    return;
  }

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;

  await transporter.sendMail({
    from,
    to: NOTIFICATION_TO,
    replyTo: rows.find(([label]) => label === 'Email')?.[1] || undefined,
    subject,
    text: `${heading}\n\n${textLines(rows)}`,
    html: `
      <div style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;">
          <div style="background:#0f766e;color:#ffffff;padding:18px 22px;">
            <h1 style="margin:0;font-size:20px;">${escapeHtml(heading)}</h1>
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
  return sendNotification({
    subject: `New website message from ${cleanValue(contact.name)}`,
    heading: 'New Contact Message',
    rows: [
      ['Name', contact.name],
      ['Email', contact.email],
      ['Phone', contact.phone],
      ['Subject', contact.subject],
      ['Message', contact.message],
    ],
  });
}

export function sendQuoteNotification(quote) {
  return sendNotification({
    subject: `New quote request from ${cleanValue(`${quote.firstName || ''} ${quote.lastName || ''}`.trim())}`,
    heading: 'New Quote Request',
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
