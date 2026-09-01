/**
 * Admin Orders API
 *
 * Fetches orders from Medusa with pickup scheduling metadata
 */
import type { APIRoute } from 'astro';

export const prerender = false;
import { getOrders } from '../../../lib/medusa-admin';

export const GET: APIRoute = async ({ url }) => {
  try {
    // Get query params
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const status = url.searchParams.get('status');

    // Fetch from Medusa
    const params: Record<string, any> = {
      limit,
      offset,
      fields: '+items,+shipping_address,+customer',
    };

    if (status) {
      params.status = status;
    }

    const { orders, count } = await getOrders(params);

    // Transform orders to include pickup scheduling info from metadata
    const transformedOrders = orders.map(order => {
      const address = order.shipping_address
      const customer = order.customer
      const name = [
        address?.first_name || customer?.first_name,
        address?.last_name || customer?.last_name,
      ].filter(Boolean).join(' ').trim()
      const items = order.items || []

      return {
        id: order.id,
        orderNumber: order.display_id ? `SME-${order.display_id}` : order.id,
        customerName: name || order.email || 'Customer',
        email: order.email || customer?.email,
        phone: address?.phone || customer?.phone || undefined,
        total: order.total ?? 0,
        itemCount: items.reduce((sum: number, item: { quantity?: number }) => sum + (item.quantity || 0), 0),
        status: order.metadata?.fulfillment_status || 'awaiting_pickup',
        fulfillmentMethod: order.metadata?.fulfillment?.method || 'pickup',
        pickupDate: order.metadata?.fulfillment?.pickupDate,
        pickupTime: order.metadata?.fulfillment?.timeSlot,
        notes: order.metadata?.fulfillment?.notes,
        createdAt: order.created_at,
        items: items.map((item: { title?: string; quantity?: number; unit_price?: number }) => ({
          title: item.title,
          quantity: item.quantity,
          price: item.unit_price,
        })),
      }
    });

    return new Response(
      JSON.stringify({
        orders: transformedOrders,
        count,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    console.error('Failed to fetch orders:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to fetch orders',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
};
