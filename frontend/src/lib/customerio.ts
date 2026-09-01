/**
 * Customer.io Track API — Southland workspace.
 * Identify first, then fire the event. Never the other way around.
 *
 * SME profiles must carry sub_brand so they do not look like Southland customers.
 * Do not set unsubscribed: false — a Luke Road form must not re-open a workspace opt-out.
 */

const CIO_TRACK_API = 'https://track.customer.io/api/v1/customers'

export type SignupSource = 'farm-stand-interest' | 'events-interest' | 'contact_form' | string

const EVENT_BY_SOURCE: Record<string, string> = {
  'farm-stand-interest': 'farm_stand_interest',
  'events-interest': 'events_interest',
  contact_form: 'website_contact',
  contact: 'website_contact',
}

function splitName(name?: string) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean)
  return {
    first_name: parts[0] || undefined,
    last_name: parts.length > 1 ? parts.slice(1).join(' ') : undefined,
  }
}

function trackAuth() {
  const siteId = import.meta.env.CUSTOMERIO_SITE_ID
  const trackKey = import.meta.env.CUSTOMERIO_TRACK_API_KEY
  if (!siteId || !trackKey) return null
  return Buffer.from(`${siteId}:${trackKey}`).toString('base64')
}

export async function identifyAndTrack(opts: {
  email: string
  name?: string
  phone?: string
  source?: SignupSource
}): Promise<{ success: boolean; message: string }> {
  const email = opts.email.trim().toLowerCase()
  if (!email) return { success: false, message: 'Email is required' }

  const auth = trackAuth()
  if (!auth) {
    console.warn('[CIO] Track keys not configured — skipping identify')
    return { success: false, message: 'Customer.io not configured' }
  }

  const source = opts.source || 'contact_form'
  const eventName = EVENT_BY_SOURCE[source] || 'website_contact'
  const { first_name, last_name } = splitName(opts.name)
  const id = encodeURIComponent(email)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Basic ${auth}`,
  }

  const identify = await fetch(`${CIO_TRACK_API}/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      email,
      sub_brand: 'soul-miners-eden',
      sme_signup_source: source,
      sme_signup_at: Math.floor(Date.now() / 1000),
      ...(first_name && { first_name }),
      ...(last_name && { last_name }),
      ...(opts.phone && { phone: opts.phone }),
    }),
  })

  if (!identify.ok) {
    const errorText = await identify.text()
    console.error('[CIO] identify error:', identify.status, errorText)
    return { success: false, message: `Customer.io identify ${identify.status}` }
  }

  const tracked = await fetch(`${CIO_TRACK_API}/${id}/events`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      name: eventName,
      data: {
        sub_brand: 'soul-miners-eden',
        source,
      },
    }),
  })

  if (!tracked.ok) {
    const errorText = await tracked.text()
    console.error('[CIO] event error:', tracked.status, errorText)
    return { success: false, message: `Customer.io event ${tracked.status}` }
  }

  return { success: true, message: eventName }
}
