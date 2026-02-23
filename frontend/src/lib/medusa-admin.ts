/**
 * Medusa Admin API Client
 *
 * Server-side only - uses admin credentials
 * DO NOT import this in browser code
 */

const MEDUSA_BACKEND_URL = import.meta.env.MEDUSA_BACKEND_URL || "https://backend-production-2bafd.up.railway.app"
const ADMIN_EMAIL = import.meta.env.MEDUSA_ADMIN_EMAIL || ""
const ADMIN_PASSWORD = import.meta.env.MEDUSA_ADMIN_PASSWORD || ""

interface FetchOptions {
  method?: string
  body?: any
  headers?: Record<string, string>
}

/**
 * Admin session token (cached)
 */
let adminToken: string | null = null
let tokenExpiry: number = 0

/**
 * Authenticate as admin and get JWT token
 */
async function getAdminToken(): Promise<string> {
  // Return cached token if still valid
  if (adminToken && Date.now() < tokenExpiry) {
    return adminToken
  }

  // Login to get new token (Medusa v2 uses /auth/user/emailpass)
  const response = await fetch(`${MEDUSA_BACKEND_URL}/auth/user/emailpass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    }),
  })

  if (!response.ok) {
    throw new Error("Admin authentication failed")
  }

  const data = await response.json()
  adminToken = data.token || null

  if (!adminToken) {
    throw new Error("No admin token received")
  }

  // Cache for 23 hours (tokens typically last 24 hours)
  tokenExpiry = Date.now() + 23 * 60 * 60 * 1000

  return adminToken
}

/**
 * Admin fetch wrapper with automatic authentication
 */
export async function adminFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options

  // Get admin token
  const token = await getAdminToken()

  const response = await fetch(`${MEDUSA_BACKEND_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  })

  if (!response.ok) {
    // Token might have expired, try refreshing once
    if (response.status === 401 && adminToken) {
      adminToken = null // Clear cached token
      return adminFetch(endpoint, options) // Retry once
    }

    const error = await response.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

/**
 * Get all orders (admin only)
 */
export async function getOrders(params?: Record<string, any>) {
  const searchParams = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
  }

  const query = searchParams.toString() ? `?${searchParams.toString()}` : ""
  const data = await adminFetch<{ orders: any[]; count: number }>(`/admin/orders${query}`)
  return data
}

/**
 * Get a single order
 */
export async function getOrder(orderId: string) {
  const data = await adminFetch<{ order: any }>(`/admin/orders/${orderId}`)
  return data.order
}

/**
 * Update order metadata
 */
export async function updateOrderMetadata(orderId: string, metadata: Record<string, any>) {
  const data = await adminFetch<{ order: any }>(`/admin/orders/${orderId}`, {
    method: "POST",
    body: { metadata },
  })
  return data.order
}
