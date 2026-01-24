import Medusa from "@medusajs/medusa-js"

// Get backend URL from environment variables
const MEDUSA_BACKEND_URL = import.meta.env.PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

// Create Medusa client instance
export const medusaClient = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3
})

// API utility functions

/**
 * Get all products
 */
export async function getProducts(params?: any) {
  try {
    const { products, count, limit, offset } = await medusaClient.products.list(params)
    return { products, count, limit, offset }
  } catch (error) {
    console.error("Error fetching products:", error)
    throw error
  }
}

/**
 * Get a single product by ID
 */
export async function getProduct(productId: string) {
  try {
    const { product } = await medusaClient.products.retrieve(productId)
    return product
  } catch (error) {
    console.error(`Error fetching product ${productId}:`, error)
    throw error
  }
}

/**
 * Get product by handle (slug)
 */
export async function getProductByHandle(handle: string) {
  try {
    const { products } = await medusaClient.products.list({ handle })
    return products[0] || null
  } catch (error) {
    console.error(`Error fetching product by handle ${handle}:`, error)
    throw error
  }
}

/**
 * Get collections
 */
export async function getCollections(params?: any) {
  try {
    const { collections, count, limit, offset } = await medusaClient.collections.list(params)
    return { collections, count, limit, offset }
  } catch (error) {
    console.error("Error fetching collections:", error)
    throw error
  }
}

/**
 * Get a single collection by ID
 */
export async function getCollection(collectionId: string) {
  try {
    const { collection } = await medusaClient.collections.retrieve(collectionId)
    return collection
  } catch (error) {
    console.error(`Error fetching collection ${collectionId}:`, error)
    throw error
  }
}

/**
 * Get products by collection ID
 */
export async function getProductsByCollection(collectionId: string, params?: any) {
  try {
    const { products } = await medusaClient.products.list({
      collection_id: [collectionId],
      ...params
    })
    return products
  } catch (error) {
    console.error(`Error fetching products for collection ${collectionId}:`, error)
    throw error
  }
}

/**
 * Get regions
 */
export async function getRegions() {
  try {
    const { regions } = await medusaClient.regions.list()
    return regions
  } catch (error) {
    console.error("Error fetching regions:", error)
    throw error
  }
}

/**
 * Create a cart
 */
export async function createCart(regionId?: string) {
  try {
    const payload: any = {}
    if (regionId) {
      payload.region_id = regionId
    }
    const { cart } = await medusaClient.carts.create(payload)
    return cart
  } catch (error) {
    console.error("Error creating cart:", error)
    throw error
  }
}

/**
 * Get cart by ID
 */
export async function getCart(cartId: string) {
  try {
    const { cart } = await medusaClient.carts.retrieve(cartId)
    return cart
  } catch (error) {
    console.error(`Error fetching cart ${cartId}:`, error)
    throw error
  }
}

/**
 * Add item to cart
 */
export async function addToCart(cartId: string, variantId: string, quantity: number = 1) {
  try {
    const { cart } = await medusaClient.carts.lineItems.create(cartId, {
      variant_id: variantId,
      quantity
    })
    return cart
  } catch (error) {
    console.error("Error adding item to cart:", error)
    throw error
  }
}

/**
 * Update cart item quantity
 */
export async function updateCartItem(cartId: string, lineItemId: string, quantity: number) {
  try {
    const { cart } = await medusaClient.carts.lineItems.update(cartId, lineItemId, {
      quantity
    })
    return cart
  } catch (error) {
    console.error("Error updating cart item:", error)
    throw error
  }
}

/**
 * Remove item from cart
 */
export async function removeFromCart(cartId: string, lineItemId: string) {
  try {
    const { cart } = await medusaClient.carts.lineItems.delete(cartId, lineItemId)
    return cart
  } catch (error) {
    console.error("Error removing item from cart:", error)
    throw error
  }
}

/**
 * Complete cart (create order)
 */
export async function completeCart(cartId: string) {
  try {
    const { data } = await medusaClient.carts.complete(cartId)
    return data
  } catch (error) {
    console.error("Error completing cart:", error)
    throw error
  }
}

/**
 * Search products
 */
export async function searchProducts(query: string, params?: any) {
  try {
    const { products } = await medusaClient.products.list({
      q: query,
      ...params
    })
    return products
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}
