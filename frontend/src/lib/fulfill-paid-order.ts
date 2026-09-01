import Stripe from 'stripe'
import { completePaidCart, getStoreCart } from './medusa-server'
import { sendPaidOrderEmails } from './notifications'
import { formatPrice, lineItemCents } from './medusa-v2'

export async function fulfillStripeCheckout(sessionId: string) {
  const secret = import.meta.env.STRIPE_SECRET_KEY
  if (!secret) throw new Error('Stripe is not configured')

  const stripe = new Stripe(secret)
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer_details'],
  })

  if (session.payment_status !== 'paid') {
    throw new Error('Payment has not succeeded')
  }

  if (session.metadata?.order_id) {
    return {
      orderId: session.metadata.order_id,
      email: session.customer_details?.email || session.customer_email || '',
      phone: session.customer_details?.phone || '',
      name: session.customer_details?.name || '',
      total: session.amount_total || 0,
      currency: session.currency || 'usd',
      alreadyFulfilled: true,
    }
  }

  const cartId = session.metadata?.cart_id
  if (!cartId) throw new Error('Checkout is missing the cart')

  const cart = await getStoreCart(cartId)
  const notes =
    session.metadata?.pickup_notes ||
    session.custom_fields?.find((f) => f.key === 'pickup_notes')?.text?.value ||
    ''
  const email = session.customer_details?.email || session.customer_email || cart.email || ''
  const phone = session.customer_details?.phone || ''
  const name = session.customer_details?.name || ''

  const result = await completePaidCart(cartId, {
    paid: true,
    paid_via: 'stripe_checkout',
    stripe_checkout_session: sessionId,
    fulfillment: { method: 'pickup', notes: notes || undefined },
  })

  const orderId = result.order?.id || result.data?.id
  if (!orderId) throw new Error('Payment landed; farm ticket failed')

  await stripe.checkout.sessions.update(sessionId, {
    metadata: {
      ...session.metadata,
      order_id: orderId,
    },
  })

  const items = (cart.items || []).map((item) => ({
    title: String(item.title || 'Item'),
    quantity: Number(item.quantity || 1),
    priceLabel: formatPrice(lineItemCents(item), cart.currency_code),
  }))

  if (email) {
    try {
      await sendPaidOrderEmails({
        customerEmail: email,
        customerName: name || undefined,
        customerPhone: phone || undefined,
        orderId,
        totalLabel: formatPrice(session.amount_total || cart.total, cart.currency_code),
        items,
        notes: notes || undefined,
      })
    } catch (err) {
      console.error('[EMAIL] Paid order emails failed after payment:', err)
    }
  }

  return {
    orderId,
    email,
    phone,
    name,
    total: session.amount_total || cart.total,
    currency: cart.currency_code,
    notes,
    items,
    alreadyFulfilled: false,
  }
}
