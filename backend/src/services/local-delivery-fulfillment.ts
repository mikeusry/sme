import {
  AbstractFulfillmentService,
  MedusaContainer,
} from "@medusajs/framework/utils"

class LocalDeliveryFulfillmentService extends AbstractFulfillmentService {
  static identifier = "local-delivery"

  constructor(container: MedusaContainer, options: Record<string, unknown>) {
    super(container, options)
  }

  async getFulfillmentOptions(): Promise<any[]> {
    return [
      {
        id: "local-delivery-standard",
        name: "Local Delivery - Standard",
        description: "Delivery within 3-5 business days",
      },
      {
        id: "local-delivery-express",
        name: "Local Delivery - Express",
        description: "Delivery within 1-2 business days",
      },
      {
        id: "local-delivery-same-day",
        name: "Local Delivery - Same Day",
        description: "Delivery same day if ordered before 2 PM",
      },
    ]
  }

  async validateFulfillmentData(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    // Validate delivery address is within service area
    const shippingAddress = cart.shipping_address as any

    if (!shippingAddress) {
      throw new Error("Shipping address is required for local delivery")
    }

    // Add your validation logic here
    // For example, check if postal code is in service area
    const validPostalCodes = ["12345", "12346", "12347"] // Example postal codes

    // Uncomment and customize based on your service area
    // if (!validPostalCodes.includes(shippingAddress.postal_code)) {
    //   throw new Error("This address is outside our local delivery area")
    // }

    return data
  }

  async validateOption(
    data: Record<string, unknown>
  ): Promise<boolean> {
    return true
  }

  async canCalculate(
    data: Record<string, unknown>
  ): Promise<boolean> {
    return true
  }

  async calculatePrice(
    optionData: Record<string, unknown>,
    data: Record<string, unknown>,
    cart: Record<string, unknown>
  ): Promise<number> {
    const option = optionData.id as string

    // Calculate price based on delivery option
    const prices = {
      "local-delivery-standard": 5.99,
      "local-delivery-express": 12.99,
      "local-delivery-same-day": 19.99,
    }

    // You can add additional logic here, such as:
    // - Free delivery over certain amount
    // - Distance-based pricing
    // - Weight-based pricing

    const cartTotal = (cart.subtotal as number) || 0
    const basePrice = prices[option as keyof typeof prices] || 5.99

    // Example: Free delivery over $50
    if (cartTotal >= 5000) { // Amount in cents
      return 0
    }

    return basePrice * 100 // Convert to cents
  }

  async createFulfillment(
    data: Record<string, unknown>,
    items: any[],
    order: Record<string, unknown>,
    fulfillment: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    // Create fulfillment record
    // You can integrate with your delivery management system here

    return {
      data: {
        delivery_option: data.id,
        estimated_delivery: this.calculateEstimatedDelivery(data.id as string),
        items: items.map(item => ({
          item_id: item.item_id,
          quantity: item.quantity,
        })),
      },
    }
  }

  async cancelFulfillment(
    fulfillment: Record<string, unknown>
  ): Promise<void> {
    // Handle cancellation logic
    // Notify delivery team, update status, etc.
    return
  }

  async createReturn(
    returnOrder: Record<string, unknown>
  ): Promise<Record<string, unknown>> {
    // Handle return logic
    return {
      data: {
        return_id: `ret_${Date.now()}`,
      },
    }
  }

  async getFulfillmentDocuments(
    data: Record<string, unknown>
  ): Promise<any[]> {
    // Return shipping labels, packing slips, etc.
    return []
  }

  async getReturnDocuments(
    data: Record<string, unknown>
  ): Promise<any[]> {
    // Return return labels, instructions, etc.
    return []
  }

  async getShipmentDocuments(
    data: Record<string, unknown>
  ): Promise<any[]> {
    // Return shipping documents
    return []
  }

  async retrieveDocuments(
    fulfillmentData: Record<string, unknown>,
    documentType: string
  ): Promise<any[]> {
    // Retrieve specific document types
    return []
  }

  private calculateEstimatedDelivery(optionId: string): Date {
    const now = new Date()
    const daysToAdd = {
      "local-delivery-standard": 5,
      "local-delivery-express": 2,
      "local-delivery-same-day": 0,
    }

    const days = daysToAdd[optionId as keyof typeof daysToAdd] || 3
    now.setDate(now.getDate() + days)

    return now
  }
}

export default LocalDeliveryFulfillmentService
