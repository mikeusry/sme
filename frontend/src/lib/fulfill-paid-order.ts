import Stripe from 'stripe'
import { completePaidCart, getStoreCart } from './medusa-server'
import { writeNexusFarmOrder, type FarmOrderItem } from './nexus-sme-order'
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

  const email = session.customer_details?.email || session.customer_email || ''
  const phone = session.customer_details?.phone || ''
  const name = session.customer_details?.name || ''
  const notes =
    session.metadata?.pickup_notes ||
    session.custom_fields?.find((f) => f.key === 'pickup_notes')?.text?.value ||
    ''

  if (session.metadata?.order_id) {
    const nexus = await syncNexusTicket({
      stripe,
      session,
      medusaOrderId: session.metadata.order_id,
      email,
      name,
      phone,
      notes,
    })
    return {
      orderId: session.metadata.order_id,
      nexusOrderNumber: nexus?.orderNumber,
      email,
      phone,
      name,
      total: session.amount_total || 0,
      currency: session.currency || 'usd',
      alreadyFulfilled: true,
    }
  }

  const cartId = session.metadata?.cart_id
  if (!cartId) throw new Error('Checkout is missing the cart')

  const cart = await getStoreCart(cartId)
  const result = await completePaidCart(cartId, {
    paid: true,
    paid_via: 'stripe_checkout',
    stripe_checkout_session: sessionId,
    fulfillment: { method: 'pickup', notes: notes || undefined },
  })

  const orderId = result.order?.id || result.data?.id
  if (!orderId) throw new Error('Payment landed; farm ticket failed')

  const items = (cart.items || []).map((item) => ({
    title: String(item.title || 'Item'),
    quantity: Number(item.quantity || 1),
    priceLabel: formatPrice(lineItemCents(item), cart.currency_code),
  }))

  await stripe.checkout.sessions.update(sessionId, {
    metadata: {
      ...session.metadata,
      order_id: orderId,
    },
  })

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

  const nexus = await syncNexusTicket({
    stripe,
    session: { ...session, metadata: { ...session.metadata, order_id: orderId } },
    medusaOrderId: orderId,
    email: email || cart.email || '',
    name,
    phone,
    notes,
    cartItems: cart.items,
    currency: cart.currency_code,
    cartTotal: cart.total,
  })

  return {
    orderId,
    nexusOrderNumber: nexus?.orderNumber,
    email: email || cart.email || '',
    phone,
    name,
    total: session.amount_total || cart.total,
    currency: cart.currency_code,
    notes,
    items,
    alreadyFulfilled: false,
  }
}

async function syncNexusTicket(opts: {
  stripe: Stripe
  session: Stripe.Checkout.Session
  medusaOrderId: string
  email: string
  name: string
  phone: string
  notes: string
  cartItems?: Awaited<ReturnType<typeof getStoreCart>>['items']
  currency?: string
  cartTotal?: number
}) {
  if (opts.session.metadata?.nexus_order_id) {
    return {
      id: opts.session.metadata.nexus_order_id,
      orderNumber: opts.session.metadata.nexus_order_number || opts.session.metadata.nexus_order_id,
    }
  }

  try {
    let items: FarmOrderItem[] = (opts.cartItems || []).map((item) => {
      const qty = Number(item.quantity || 1)
      return {
        title: String(item.title || 'Farm pickup'),
        quantity: qty,
        unitPriceDollars: lineItemCents(item) / 100 / qty,
        handle: item.product?.handle,
        sku: item.variant?.sku || undefined,
      }
    })

    if (!items.length && opts.session.metadata?.cart_id) {
      try {
        const cart = await getStoreCart(opts.session.metadata.cart_id)
        items = (cart.items || []).map((item) => {
          const qty = Number(item.quantity || 1)
          return {
            title: String(item.title || 'Farm pickup'),
            quantity: qty,
            unitPriceDollars: lineItemCents(item) / 100 / qty,
            handle: item.product?.handle,
            sku: item.variant?.sku || undefined,
          }
        })
      } catch (err) {
        console.error('[NEXUS] Cart reload failed:', err)
      }
    }

    if (!items.length && opts.session.amount_total) {
      items = [
        {
          title: "Soul Miner's Humus Compost",
          quantity: 1,
          unitPriceDollars: opts.session.amount_total / 100,
          handle: 'humus-compost',
        },
      ]
    }

    const nexus = await writeNexusFarmOrder({
      stripeSessionId: opts.session.id,
      medusaOrderId: opts.medusaOrderId,
      email: opts.email,
      name: opts.name,
      phone: opts.phone || undefined,
      notes: opts.notes || undefined,
      totalDollars: (opts.session.amount_total || 0) / 100,
      items,
      fulfillment: 'pickup',
    })

    if (nexus) {
      await opts.stripe.checkout.sessions.update(opts.session.id, {
        metadata: {
          ...opts.session.metadata,
          order_id: opts.medusaOrderId,
          nexus_order_id: nexus.id,
          nexus_order_number: nexus.orderNumber,
        },
      })
    }

    return nexus
  } catch (err) {
    console.error('[NEXUS] Paid ticket failed after payment:', err)
    return null
  }
}
