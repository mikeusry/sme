/**
 * Cart Store
 *
 * Client-side cart state management with localStorage persistence.
 * Uses a simple event-based pattern for reactivity.
 */

import { createCart, getCart, addToCart, updateCartItem, removeFromCart, type Cart } from "./medusa-v2"

const CART_ID_KEY = "sme_cart_id"

// Event for cart updates
export const CART_UPDATED_EVENT = "cart:updated"

// Global cart state
let currentCart: Cart | null = null
let isLoading = false

/**
 * Get cart ID from localStorage
 */
export function getStoredCartId(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(CART_ID_KEY)
}

/**
 * Store cart ID in localStorage
 */
function setStoredCartId(cartId: string): void {
  if (typeof window === "undefined") return
  localStorage.setItem(CART_ID_KEY, cartId)
}

/**
 * Clear stored cart ID
 */
export function clearStoredCartId(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CART_ID_KEY)
  currentCart = null
  dispatchCartUpdate()
}

/**
 * Dispatch cart update event
 */
function dispatchCartUpdate(): void {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, {
    detail: { cart: currentCart, isLoading }
  }))
}

/**
 * Initialize or retrieve existing cart
 */
export async function initializeCart(): Promise<Cart> {
  isLoading = true
  dispatchCartUpdate()

  try {
    const storedCartId = getStoredCartId()

    if (storedCartId) {
      try {
        // Try to retrieve existing cart
        currentCart = await getCart(storedCartId)
        isLoading = false
        dispatchCartUpdate()
        return currentCart
      } catch (error) {
        // Cart doesn't exist or expired, create new one
        console.log("Stored cart not found, creating new cart")
        clearStoredCartId()
      }
    }

    // Create new cart
    currentCart = await createCart()
    setStoredCartId(currentCart.id)
    isLoading = false
    dispatchCartUpdate()
    return currentCart
  } catch (error) {
    isLoading = false
    dispatchCartUpdate()
    throw error
  }
}

/**
 * Get current cart (from cache or fetch)
 */
export async function getCurrentCart(): Promise<Cart | null> {
  if (currentCart) return currentCart

  const storedCartId = getStoredCartId()
  if (!storedCartId) return null

  try {
    currentCart = await getCart(storedCartId)
    return currentCart
  } catch {
    clearStoredCartId()
    return null
  }
}

/**
 * Get cart item count
 */
export function getCartItemCount(): number {
  if (!currentCart) return 0
  return currentCart.items.reduce((sum, item) => sum + item.quantity, 0)
}

/**
 * Add product variant to cart
 */
export async function addItemToCart(variantId: string, quantity: number = 1): Promise<Cart> {
  isLoading = true
  dispatchCartUpdate()

  try {
    // Ensure we have a cart
    if (!currentCart) {
      await initializeCart()
    }

    currentCart = await addToCart(currentCart!.id, variantId, quantity)
    isLoading = false
    dispatchCartUpdate()
    return currentCart
  } catch (error) {
    isLoading = false
    dispatchCartUpdate()
    throw error
  }
}

/**
 * Update item quantity in cart
 */
export async function updateItemQuantity(lineItemId: string, quantity: number): Promise<Cart> {
  if (!currentCart) throw new Error("No cart found")

  isLoading = true
  dispatchCartUpdate()

  try {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      currentCart = await removeFromCart(currentCart.id, lineItemId)
    } else {
      currentCart = await updateCartItem(currentCart.id, lineItemId, quantity)
    }

    isLoading = false
    dispatchCartUpdate()
    return currentCart
  } catch (error) {
    isLoading = false
    dispatchCartUpdate()
    throw error
  }
}

/**
 * Remove item from cart
 */
export async function removeItemFromCart(lineItemId: string): Promise<Cart> {
  if (!currentCart) throw new Error("No cart found")

  isLoading = true
  dispatchCartUpdate()

  try {
    currentCart = await removeFromCart(currentCart.id, lineItemId)
    isLoading = false
    dispatchCartUpdate()
    return currentCart
  } catch (error) {
    isLoading = false
    dispatchCartUpdate()
    throw error
  }
}

/**
 * Subscribe to cart updates
 */
export function subscribeToCart(callback: (cart: Cart | null, isLoading: boolean) => void): () => void {
  const handler = (event: CustomEvent<{ cart: Cart | null; isLoading: boolean }>) => {
    callback(event.detail.cart, event.detail.isLoading)
  }

  window.addEventListener(CART_UPDATED_EVENT, handler as EventListener)

  // Immediately call with current state
  callback(currentCart, isLoading)

  // Return unsubscribe function
  return () => {
    window.removeEventListener(CART_UPDATED_EVENT, handler as EventListener)
  }
}

/**
 * Format cart total for display
 */
export function formatCartTotal(cart: Cart): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: cart.currency_code.toUpperCase(),
  }).format(cart.total / 100)
}

/**
 * Format line item price for display
 */
export function formatLineItemPrice(item: { total: number }, currencyCode: string = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode.toUpperCase(),
  }).format(item.total / 100)
}
