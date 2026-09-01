import type { APIRoute } from 'astro'
import { fulfillStripeCheckout } from '../../../lib/fulfill-paid-order'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  let sessionId = ''
  try {
    const body = await request.json()
    sessionId = String(body.sessionId || '')
  } catch {
    return Response.json({ message: 'Invalid JSON' }, { status: 400 })
  }

  if (!sessionId) {
    return Response.json({ message: 'Missing session' }, { status: 400 })
  }

  try {
    const result = await fulfillStripeCheckout(sessionId)
    return Response.json(result)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Fulfillment failed'
    const paid = message.includes('farm ticket')
    return Response.json({ message, paid }, { status: paid ? 502 : 409 })
  }
}
