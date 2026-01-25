/**
 * Medusa v2 API Client
 *
 * Uses fetch with publishable API key for store operations.
 * Medusa v2 uses different endpoints than v1.
 */

const MEDUSA_BACKEND_URL = import.meta.env.PUBLIC_MEDUSA_BACKEND_URL || "https://backend-production-2bafd.up.railway.app"
const PUBLISHABLE_API_KEY = import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY || "pk_a503cb83700c8aead31f0bd42cd213ca12f7870f6922831c7f48bdf37748b877"

interface FetchOptions {
  method?: string
  body?: any
  headers?: Record<string, string>
}

/**
 * Base fetch wrapper with proper headers
 */
async function medusaFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options

  const response = await fetch(`${MEDUSA_BACKEND_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "x-publishable-api-key": PUBLISHABLE_API_KEY,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }))
    throw new Error(error.message || `HTTP ${response.status}`)
  }

  return response.json()
}

// =============================================================================
// TYPES
// =============================================================================

export interface Product {
  id: string
  title: string
  handle: string
  description: string | null
  thumbnail: string | null
  variants: ProductVariant[]
  options: ProductOption[]
  images: { url: string }[]
  collection_id: string | null
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  title: string
  sku: string | null
  barcode: string | null
  prices: Price[]
  options: { value: string; option_id: string }[]
  inventory_quantity: number
  manage_inventory: boolean
  allow_backorder: boolean
  calculated_price?: {
    calculated_amount: number
    currency_code: string
  }
}

export interface ProductOption {
  id: string
  title: string
  values: { id: string; value: string }[]
}

export interface Price {
  id: string
  amount: number
  currency_code: string
}

export interface Region {
  id: string
  name: string
  currency_code: string
  countries: { iso_2: string; name: string }[]
}

export interface Cart {
  id: string
  region_id: string
  email: string | null
  items: LineItem[]
  subtotal: number
  discount_total: number
  shipping_total: number
  tax_total: number
  total: number
  currency_code: string
  shipping_address: Address | null
  billing_address: Address | null
  shipping_methods: ShippingMethod[]
}

export interface LineItem {
  id: string
  cart_id: string
  variant_id: string
  product_id: string
  title: string
  description: string | null
  thumbnail: string | null
  quantity: number
  unit_price: number
  subtotal: number
  total: number
  variant: ProductVariant
}

export interface Address {
  first_name: string | null
  last_name: string | null
  address_1: string | null
  address_2: string | null
  city: string | null
  province: string | null
  postal_code: string | null
  country_code: string | null
  phone: string | null
}

export interface ShippingMethod {
  id: string
  name: string
  price: number
}

export interface ShippingOption {
  id: string
  name: string
  amount: number
  is_tax_inclusive: boolean
}

// =============================================================================
// PRODUCTS
// =============================================================================

/**
 * Get all products
 */
export async function getProducts(params?: Record<string, any>) {
  const searchParams = new URLSearchParams()
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value))
      }
    })
  }

  const query = searchParams.toString() ? `?${searchParams.toString()}` : ""
  const data = await medusaFetch<{ products: Product[]; count: number }>(`/store/products${query}`)
  return data
}

/**
 * Get a single product by ID
 */
export async function getProduct(productId: string) {
  const data = await medusaFetch<{ product: Product }>(`/store/products/${productId}`)
  return data.product
}

/**
 * Get product by handle
 */
export async function getProductByHandle(handle: string) {
  const data = await medusaFetch<{ products: Product[] }>(`/store/products?handle=${handle}`)
  return data.products[0] || null
}

// =============================================================================
// REGIONS
// =============================================================================

/**
 * Get all regions
 */
export async function getRegions() {
  const data = await medusaFetch<{ regions: Region[] }>("/store/regions")
  return data.regions
}

/**
 * Get default region (US)
 */
export async function getDefaultRegion() {
  const regions = await getRegions()
  // Prefer US region
  const usRegion = regions.find(r =>
    r.countries.some(c => c.iso_2 === "us" || c.iso_2 === "US")
  )
  return usRegion || regions[0]
}

// =============================================================================
// CART
// =============================================================================

/**
 * Create a new cart
 */
export async function createCart(regionId?: string) {
  const body: Record<string, any> = {}

  if (regionId) {
    body.region_id = regionId
  } else {
    // Get default region if not specified
    const region = await getDefaultRegion()
    if (region) {
      body.region_id = region.id
    }
  }

  const data = await medusaFetch<{ cart: Cart }>("/store/carts", {
    method: "POST",
    body,
  })
  return data.cart
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string) {
  const data = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}`)
  return data.cart
}

/**
 * Add item to cart
 */
export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  const data = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items`, {
    method: "POST",
    body: {
      variant_id: variantId,
      quantity,
    },
  })
  return data.cart
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(cartId: string, lineItemId: string, quantity: number) {
  const data = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "POST",
    body: { quantity },
  })
  return data.cart
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartId: string, lineItemId: string) {
  const data = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${lineItemId}`, {
    method: "DELETE",
  })
  return data.cart
}

/**
 * Update cart (email, shipping address, etc.)
 */
export async function updateCart(cartId: string, data: Partial<{
  email: string
  shipping_address: Partial<Address>
  billing_address: Partial<Address>
}>) {
  const result = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}`, {
    method: "POST",
    body: data,
  })
  return result.cart
}

// =============================================================================
// SHIPPING
// =============================================================================

/**
 * Get shipping options for cart
 */
export async function getShippingOptions(cartId: string) {
  const data = await medusaFetch<{ shipping_options: ShippingOption[] }>(
    `/store/shipping-options?cart_id=${cartId}`
  )
  return data.shipping_options
}

/**
 * Add shipping method to cart
 */
export async function addShippingMethod(cartId: string, shippingOptionId: string) {
  const data = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}/shipping-methods`, {
    method: "POST",
    body: { option_id: shippingOptionId },
  })
  return data.cart
}

// =============================================================================
// CHECKOUT
// =============================================================================

/**
 * Create payment sessions for cart
 */
export async function createPaymentSessions(cartId: string) {
  const data = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}/payment-sessions`, {
    method: "POST",
  })
  return data.cart
}

/**
 * Set payment session (select payment provider)
 */
export async function setPaymentSession(cartId: string, providerId: string) {
  const data = await medusaFetch<{ cart: Cart }>(`/store/carts/${cartId}/payment-session`, {
    method: "POST",
    body: { provider_id: providerId },
  })
  return data.cart
}

/**
 * Complete cart (place order)
 */
export async function completeCart(cartId: string) {
  const data = await medusaFetch<{ type: string; data: any }>(`/store/carts/${cartId}/complete`, {
    method: "POST",
  })
  return data
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Format price for display
 */
export function formatPrice(amount: number, currencyCode: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(amount / 100) // Medusa stores prices in cents
}

/**
 * Get the cheapest variant price
 */
export function getProductPrice(product: Product, currencyCode: string = "usd"): number | null {
  if (!product.variants || product.variants.length === 0) return null

  const prices = product.variants
    .flatMap(v => v.prices || [])
    .filter(p => p.currency_code === currencyCode)
    .map(p => p.amount)

  return prices.length > 0 ? Math.min(...prices) : null
}
