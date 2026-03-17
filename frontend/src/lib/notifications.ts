/**
 * Customer Notifications — SendGrid
 *
 * Sends branded emails for order confirmations, pickup readiness,
 * and reminders via SendGrid v3 API (raw fetch, no SDK needed).
 */

const SENDGRID_API = 'https://api.sendgrid.com/v3/mail/send';

// Eden brand colors (matches design-tokens.css)
const BRAND = {
  clay: '#A8643F',
  sage: '#4D6B42',
  charcoal: '#2D2926',
  cream: '#FAF8F5',
  steel: '#6E6E68',
  border: '#e8e4df',
};

interface PickupSchedule {
  method: string;
  pickupDate?: string;
  timeSlot?: string;
  notes?: string;
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

// ---------------------------------------------------------------------------
// Core send function
// ---------------------------------------------------------------------------

async function sendEmail({ to, subject, html }: SendEmailOptions): Promise<{ sent: boolean; message: string }> {
  const apiKey = import.meta.env.SENDGRID_API_KEY;

  if (!apiKey) {
    console.warn('[EMAIL] SENDGRID_API_KEY not configured — skipping send');
    return { sent: false, message: 'SendGrid not configured' };
  }

  try {
    const res = await fetch(SENDGRID_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: 'farm@soulminerseden.com', name: "Soul Miner's Eden" },
        subject,
        content: [{ type: 'text/html', value: html }],
      }),
    });

    if (res.ok || res.status === 202) {
      console.log(`[EMAIL] Sent "${subject}" to ${to}`);
      return { sent: true, message: 'Email sent' };
    }

    const errorText = await res.text();
    console.error(`[EMAIL] SendGrid error ${res.status}:`, errorText);
    return { sent: false, message: `SendGrid error: ${res.status}` };
  } catch (err) {
    console.error('[EMAIL] Send failed:', err);
    return { sent: false, message: err instanceof Error ? err.message : 'Unknown error' };
  }
}

// ---------------------------------------------------------------------------
// Brand email wrapper
// ---------------------------------------------------------------------------

function brandWrap(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:${BRAND.cream};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <!-- Header -->
        <tr><td style="background:${BRAND.charcoal};padding:24px 32px;border-radius:12px 12px 0 0;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="color:#fff;font-size:20px;font-weight:700;letter-spacing:0.5px;">Soul Miner's Eden</td>
              <td align="right" style="color:rgba(255,255,255,0.6);font-size:12px;text-transform:uppercase;letter-spacing:1px;">${title}</td>
            </tr>
          </table>
        </td></tr>
        <!-- Body -->
        <tr><td style="background:#ffffff;padding:32px;border-left:1px solid ${BRAND.border};border-right:1px solid ${BRAND.border};">
          ${body}
        </td></tr>
        <!-- Footer -->
        <tr><td style="background:${BRAND.cream};padding:20px 32px;border-radius:0 0 12px 12px;border:1px solid ${BRAND.border};border-top:none;">
          <p style="margin:0;font-size:12px;color:${BRAND.steel};text-align:center;">
            Soul Miner's Eden &middot; 189 Luke Road, Bogart, GA 30622 &middot; (706) 613-4415<br>
            <a href="https://www.soulminerseden.com" style="color:${BRAND.sage};text-decoration:none;">soulminerseden.com</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;font-size:13px;color:${BRAND.steel};border-bottom:1px solid ${BRAND.border};white-space:nowrap;">${label}</td>
    <td style="padding:8px 12px;font-size:14px;color:${BRAND.charcoal};border-bottom:1px solid ${BRAND.border};">${value}</td>
  </tr>`;
}

// ---------------------------------------------------------------------------
// Time slot display
// ---------------------------------------------------------------------------

const TIME_SLOTS: Record<string, string> = {
  morning: '8 AM - 12 PM',
  afternoon: '12 PM - 5 PM',
  evening: '5 PM - 7 PM',
  anytime: '24/7 Access',
};

// ---------------------------------------------------------------------------
// Notification functions
// ---------------------------------------------------------------------------

/**
 * Send order confirmation email to customer
 */
export async function sendOrderConfirmation(
  email: string,
  orderNumber: string,
  schedule: PickupSchedule
) {
  const timeWindow = schedule.timeSlot ? TIME_SLOTS[schedule.timeSlot] || schedule.timeSlot : '24/7 Access';

  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;color:${BRAND.charcoal};">Order Confirmed</h2>
    <p style="margin:0 0 20px;font-size:14px;color:${BRAND.steel};">Thanks for your order. Here are the details.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${row('Order', orderNumber)}
      ${schedule.pickupDate ? row('Pickup Date', schedule.pickupDate) : ''}
      ${row('Time Window', timeWindow)}
      ${row('Location', '189 Luke Road, Bogart, GA 30622')}
    </table>
    <p style="margin:20px 0 0;font-size:14px;color:${BRAND.charcoal};">
      The honor stand is accessible 24/7. Your items will be ready and waiting.
    </p>
    ${schedule.notes ? `<p style="margin:12px 0 0;font-size:13px;color:${BRAND.steel};"><strong>Note:</strong> ${schedule.notes}</p>` : ''}
  `;

  return sendEmail({
    to: email,
    subject: `Order ${orderNumber} confirmed — Soul Miner's Eden`,
    html: brandWrap('Order Confirmation', body),
  });
}

/**
 * Send "Order Ready for Pickup" notification
 */
export async function sendReadyNotification(
  email: string,
  orderNumber: string,
  schedule: PickupSchedule
) {
  const timeWindow = schedule.timeSlot ? TIME_SLOTS[schedule.timeSlot] || schedule.timeSlot : '24/7 Access';

  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;color:${BRAND.charcoal};">Your Order is Ready!</h2>
    <p style="margin:0 0 20px;font-size:14px;color:${BRAND.steel};">Order ${orderNumber} is ready for pickup at the honor stand.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${row('Order', orderNumber)}
      ${schedule.pickupDate ? row('Pickup Date', schedule.pickupDate) : ''}
      ${row('Time Window', timeWindow)}
      ${row('Location', '189 Luke Road, Bogart, GA 30622')}
    </table>
    <p style="margin:20px 0 0;font-size:14px;color:${BRAND.charcoal};">
      Drive up to the stand, grab your order, and leave payment in the box. Simple as that.
    </p>
  `;

  return sendEmail({
    to: email,
    subject: `Order ${orderNumber} is ready for pickup — Soul Miner's Eden`,
    html: brandWrap('Ready for Pickup', body),
  });
}

/**
 * Send pickup reminder (day before)
 */
export async function sendPickupReminder(
  email: string,
  orderNumber: string,
  schedule: PickupSchedule
) {
  const timeWindow = schedule.timeSlot ? TIME_SLOTS[schedule.timeSlot] || schedule.timeSlot : '24/7 Access';

  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;color:${BRAND.charcoal};">Pickup Reminder</h2>
    <p style="margin:0 0 20px;font-size:14px;color:${BRAND.steel};">Just a heads up — your order is waiting for you tomorrow.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${row('Order', orderNumber)}
      ${schedule.pickupDate ? row('Pickup Date', schedule.pickupDate) : ''}
      ${row('Time Window', timeWindow)}
      ${row('Location', '189 Luke Road, Bogart, GA 30622')}
    </table>
    <p style="margin:20px 0 0;font-size:14px;color:${BRAND.charcoal};">
      See you at the stand!
    </p>
  `;

  return sendEmail({
    to: email,
    subject: `Pickup reminder: Order ${orderNumber} — Soul Miner's Eden`,
    html: brandWrap('Pickup Reminder', body),
  });
}

/**
 * Send internal notification to farm team about new contact/inquiry
 */
export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
  type?: string;
}) {
  const body = `
    <h2 style="margin:0 0 8px;font-size:22px;color:${BRAND.charcoal};">New ${data.type === 'events-interest' ? 'Events Signup' : data.type === 'farm-stand-interest' ? 'Farm Stand Signup' : 'Contact Form'}</h2>
    <p style="margin:0 0 20px;font-size:14px;color:${BRAND.steel};">Someone reached out through the website.</p>
    <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border};border-radius:8px;overflow:hidden;">
      ${data.name ? row('Name', data.name) : ''}
      ${row('Email', data.email)}
      ${data.phone ? row('Phone', data.phone) : ''}
      ${row('Type', data.type || 'contact')}
      ${data.message ? row('Message', data.message) : ''}
    </table>
  `;

  return sendEmail({
    to: 'farm@soulminerseden.com',
    subject: `New inquiry from ${data.name || data.email} — soulminerseden.com`,
    html: brandWrap('Website Inquiry', body),
  });
}
