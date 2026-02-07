/**
 * Pickup Scheduling System
 *
 * Types and utilities for managing honor stand pickup scheduling.
 * Integrates with Medusa cart metadata.
 */

import { updateCart, type Cart } from './medusa-v2'

// =============================================================================
// TYPES
// =============================================================================

export type FulfillmentMethod = 'pickup' | 'delivery'

export type TimeSlot = 'morning' | 'afternoon' | 'evening' | 'anytime'

export interface PickupSchedule {
  /** Fulfillment method: pickup at honor stand or delivery */
  method: FulfillmentMethod
  /** Pickup date in ISO format (YYYY-MM-DD) */
  pickupDate?: string
  /** Time slot for pickup */
  timeSlot?: TimeSlot
  /** Optional pickup notes */
  notes?: string
}

export interface CartMetadata {
  /** Pickup/delivery scheduling information */
  fulfillment?: PickupSchedule
  /** Additional metadata fields (preserve existing) */
  [key: string]: any
}

// =============================================================================
// TIME SLOT CONFIGURATION
// =============================================================================

export const TIME_SLOTS: Record<TimeSlot, { label: string; hours: string; description: string }> = {
  anytime: {
    label: 'Anytime (24/7)',
    hours: 'Honor stand is always accessible',
    description: 'Pick up whenever convenient - our honor stand is open 24/7',
  },
  morning: {
    label: 'Morning',
    hours: '8:00 AM - 12:00 PM',
    description: 'Best for fresh eggs and dairy products',
  },
  afternoon: {
    label: 'Afternoon',
    hours: '12:00 PM - 5:00 PM',
    description: 'Typically less crowded, great for browsing',
  },
  evening: {
    label: 'Evening',
    hours: '5:00 PM - 7:00 PM',
    description: 'After-work pickup, products restocked',
  },
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get available pickup dates (next 14 days)
 */
export function getAvailablePickupDates(): Date[] {
  const dates: Date[] = []
  const today = new Date()

  // Start from tomorrow (allow 24hr prep time)
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(date)
  }

  return dates
}

/**
 * Format date for display (e.g., "Wed, Feb 12")
 */
export function formatPickupDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * Format date for form input (YYYY-MM-DD)
 */
export function formatDateForInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Check if pickup date is valid (not in past, within 14-day window)
 */
export function isValidPickupDate(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const minDate = new Date(today)
  minDate.setDate(today.getDate() + 1) // Tomorrow

  const maxDate = new Date(today)
  maxDate.setDate(today.getDate() + 14) // 14 days out

  return date >= minDate && date <= maxDate
}

// =============================================================================
// CART METADATA MANAGEMENT
// =============================================================================

/**
 * Get pickup schedule from cart metadata
 */
export function getPickupSchedule(cart: Cart): PickupSchedule | null {
  if (!cart.metadata || !cart.metadata.fulfillment) {
    return null
  }

  return cart.metadata.fulfillment as PickupSchedule
}

/**
 * Update cart with pickup schedule
 */
export async function updatePickupSchedule(
  cartId: string,
  schedule: Partial<PickupSchedule>
): Promise<Cart> {
  // Medusa cart metadata is updated via the cart update endpoint
  // We merge with existing metadata to preserve other fields
  const updatedCart = await updateCart(cartId, {
    metadata: {
      fulfillment: schedule,
    } as any, // Medusa accepts any metadata
  })

  return updatedCart
}

/**
 * Clear pickup schedule from cart
 */
export async function clearPickupSchedule(cartId: string): Promise<Cart> {
  const updatedCart = await updateCart(cartId, {
    metadata: {
      fulfillment: null,
    } as any,
  })

  return updatedCart
}

/**
 * Get fulfillment method summary for display
 */
export function getFulfillmentSummary(schedule: PickupSchedule | null): string {
  if (!schedule) return 'Not selected'

  if (schedule.method === 'delivery') {
    return 'Local Delivery ($40 base + $1.25/mile after 20 miles)'
  }

  // Pickup
  if (!schedule.pickupDate || !schedule.timeSlot) {
    return 'Pickup at Honor Stand (time not selected)'
  }

  const dateStr = formatPickupDate(schedule.pickupDate)
  const timeSlotInfo = TIME_SLOTS[schedule.timeSlot]

  if (schedule.timeSlot === 'anytime') {
    return `Pickup ${dateStr} - Anytime (24/7 access)`
  }

  return `Pickup ${dateStr} - ${timeSlotInfo.label} (${timeSlotInfo.hours})`
}

/**
 * Validate pickup schedule is complete
 */
export function isPickupScheduleComplete(schedule: PickupSchedule | null): boolean {
  if (!schedule) return false

  if (schedule.method === 'delivery') {
    return true // Delivery doesn't need pickup time
  }

  // Pickup requires date and time slot
  return !!(
    schedule.pickupDate &&
    isValidPickupDate(schedule.pickupDate) &&
    schedule.timeSlot
  )
}

// =============================================================================
// ORDER MANAGEMENT HELPERS
// =============================================================================

/**
 * Group orders by pickup date for admin dashboard
 */
export interface PickupGroup {
  date: string
  dateFormatted: string
  timeSlot: TimeSlot
  orders: Array<{
    orderId: string
    orderNumber: string
    customerName: string
    email: string
    total: number
    itemCount: number
    notes?: string
  }>
}

/**
 * Parse pickup schedule from order metadata
 * (For use when rendering completed orders)
 */
export function parseOrderPickupSchedule(orderMetadata: any): PickupSchedule | null {
  if (!orderMetadata || !orderMetadata.fulfillment) {
    return null
  }

  return orderMetadata.fulfillment as PickupSchedule
}
