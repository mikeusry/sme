/**
 * Customer Notifications
 *
 * Sends emails/SMS to customers for order updates
 * TODO: Wire to SendGrid, Resend, or similar service
 */

interface PickupSchedule {
  method: string
  pickupDate?: string
  timeSlot?: string
  notes?: string
}

/**
 * Send "Order Ready for Pickup" notification
 */
export async function sendReadyNotification(
  email: string,
  orderNumber: string,
  schedule: PickupSchedule
) {
  console.log(`[NOTIFICATION] Order ${orderNumber} ready for ${email}`)
  console.log(`Pickup: ${schedule.pickupDate} (${schedule.timeSlot})`)

  // TODO: Implement email sending
  // Example with SendGrid:
  // await sendEmail({
  //   to: email,
  //   subject: `Your Order ${orderNumber} is Ready for Pickup!`,
  //   html: readyForPickupTemplate(orderNumber, schedule),
  // })

  return {
    sent: false,
    message: 'Email notifications not yet configured',
  }
}

/**
 * Send order confirmation notification
 */
export async function sendOrderConfirmation(
  email: string,
  orderNumber: string,
  schedule: PickupSchedule
) {
  console.log(`[NOTIFICATION] Order ${orderNumber} confirmed for ${email}`)

  // TODO: Implement
  return {
    sent: false,
    message: 'Email notifications not yet configured',
  }
}

/**
 * Send pickup reminder (day before)
 */
export async function sendPickupReminder(
  email: string,
  orderNumber: string,
  schedule: PickupSchedule
) {
  console.log(`[NOTIFICATION] Pickup reminder for ${orderNumber} to ${email}`)

  // TODO: Implement
  return {
    sent: false,
    message: 'Email notifications not yet configured',
  }
}

// Email templates (to be moved to separate files when implemented)

function readyForPickupTemplate(orderNumber: string, schedule: PickupSchedule): string {
  const timeSlots: Record<string, string> = {
    morning: '8 AM - 12 PM',
    afternoon: '12 PM - 5 PM',
    evening: '5 PM - 7 PM',
    anytime: '24/7 Access',
  }

  const timeWindow = schedule.timeSlot ? timeSlots[schedule.timeSlot] : '24/7 Access'

  return `
    <h1>Your Order is Ready!</h1>
    <p>Order ${orderNumber} is ready for pickup at Soul Miner's Eden honor stand.</p>

    <h2>Pickup Details</h2>
    <ul>
      <li><strong>Date:</strong> ${schedule.pickupDate}</li>
      <li><strong>Time Window:</strong> ${timeWindow}</li>
      <li><strong>Location:</strong> 189 Luke Road, Bogart, GA 30622</li>
    </ul>

    <p>The honor stand is accessible 24/7. Your items will be waiting for you!</p>

    ${schedule.notes ? `<p><strong>Note:</strong> ${schedule.notes}</p>` : ''}

    <p>Thank you for supporting Soul Miner's Eden!</p>
  `
}
