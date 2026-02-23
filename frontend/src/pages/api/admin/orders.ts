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
      expand: 'items,shipping_address,customer',
    };

    if (status) {
      params.status = status;
    }

    const { orders, count } = await getOrders(params);

    // Transform orders to include pickup scheduling info from metadata
    const transformedOrders = orders.map(order => ({
      id: order.id,
      orderNumber: `SME-${order.display_id}`,
      customerName: order.shipping_address
        ? `${order.shipping_address.first_name || ''} ${order.shipping_address.last_name || ''}`.trim()
        : 'Unknown Customer',
      email: order.email,
      phone: order.shipping_address?.phone || undefined,
      total: order.total,
      itemCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
      status: order.metadata?.fulfillment_status || 'awaiting_pickup',
      fulfillmentMethod: order.metadata?.fulfillment?.method || 'pickup',
      pickupDate: order.metadata?.fulfillment?.pickupDate,
      pickupTime: order.metadata?.fulfillment?.timeSlot,
      notes: order.metadata?.fulfillment?.notes,
      createdAt: order.created_at,
      items: order.items.map(item => ({
        title: item.title,
        quantity: item.quantity,
        price: item.unit_price,
      })),
    }));

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
