/**
 * Hosted Stripe Checkout. Amount and line items come from the Medusa cart.
 */
import type { APIRoute } from 'astro'
import Stripe from 'stripe'
import { getStoreCart, medusaStore } from '../../../lib/medusa-server'
import { lineItemCents } from '../../../lib/medusa-v2'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  const secret = import.meta.env.STRIPE_SECRET_KEY
  if (!secret) {
    return Response.json({ message: 'Stripe is not configured' }, { status: 500 })
  }

  let cartId = ''
  let email = ''
  let notes = ''
  try {
    const body = await request.json()
    cartId = String(body.cartId || '')
    email = String(body.email || '').trim()
    notes = String(body.notes || '').trim()
  } catch {
    return Response.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  if (!cartId) {
    return Response.json({ message: 'Missing cart' }, { status: 400 })
  }

  const cart = await getStoreCart(cartId)
  if (!cart?.items?.length || !cart.total) {
    return Response.json({ message: 'Cart is empty' }, { status: 400 })
  }

  if (email) {
    await medusaStore(`/store/carts/${cartId}`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        metadata: {
          ...(cart.metadata || {}),
          fulfillment: { method: 'pickup', notes: notes || undefined },
        },
      }),
    })
  }

  const origin = new URL(request.url).origin
  const stripe = new Stripe(secret)
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email || cart.email || undefined,
    phone_number_collection: { enabled: true },
    billing_address_collection: 'required',
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?canceled=1`,
    metadata: {
      cart_id: cart.id,
      pickup_notes: notes,
      source: 'soulminerseden-checkout',
    },
    line_items: cart.items.map((item) => ({
      quantity: item.quantity || 1,
      price_data: {
        currency: (cart.currency_code || 'usd').toLowerCase(),
        unit_amount: Math.round(lineItemCents(item) / (item.quantity || 1)),
        product_data: { name: item.title || 'Farm pickup' },
      },
    })),
  })

  if (!session.url) {
    return Response.json({ message: 'Could not start Stripe Checkout' }, { status: 500 })
  }

  return Response.json({ url: session.url })
}
