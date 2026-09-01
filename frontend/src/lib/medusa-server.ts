/**
 * Server-only Medusa store calls (API routes). Do not import from the browser.
 */
const BACKEND = (
  import.meta.env.PUBLIC_MEDUSA_BACKEND_URL ||
  'https://backend-production-2bafd.up.railway.app'
).replace(/\/$/, '')

const PUBLISHABLE_KEY =
  import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  'pk_a503cb83700c8aead31f0bd42cd213ca12f7870f6922831c7f48bdf37748b877'

export async function medusaStore<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers = new Headers(init.headers)
  if (!headers.has('content-type') && init.body) {
    headers.set('content-type', 'application/json')
  }
  headers.set('x-publishable-api-key', PUBLISHABLE_KEY)

  const res = await fetch(`${BACKEND}${path}`, { ...init, headers })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error((data as { message?: string }).message || `Medusa ${res.status}`)
  }
  return data as T
}

export async function getStoreCart(cartId: string) {
  const data = await medusaStore<{
    cart: {
      id: string
      total: number
      currency_code: string
      items: {
        title?: string
        quantity?: number
        unit_price?: number
        total?: number | null
        subtotal?: number | null
        thumbnail?: string | null
        product?: { handle?: string; title?: string } | null
        variant?: { sku?: string | null } | null
      }[]
      email?: string | null
      metadata?: Record<string, unknown> | null
    }
  }>(`/store/carts/${cartId}`)
  return data.cart
}

export async function completePaidCart(cartId: string, metadata: Record<string, unknown>) {
  const cart = await getStoreCart(cartId)
  await medusaStore(`/store/carts/${cartId}`, {
    method: 'POST',
    body: JSON.stringify({
      metadata: { ...(cart.metadata || {}), ...metadata },
    }),
  })

  const created = await medusaStore<{ payment_collection: { id: string } }>(
    '/store/payment-collections',
    { method: 'POST', body: JSON.stringify({ cart_id: cartId }) }
  )
  await medusaStore(`/store/payment-collections/${created.payment_collection.id}/payment-sessions`, {
    method: 'POST',
    body: JSON.stringify({ provider_id: 'pp_system_default' }),
  })
  return medusaStore<{ type: string; order?: { id: string }; data?: { id: string } }>(
    `/store/carts/${cartId}/complete`,
    { method: 'POST' }
  )
}
