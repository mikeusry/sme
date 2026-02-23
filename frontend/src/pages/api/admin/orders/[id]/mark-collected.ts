/**
 * Mark Order Collected API
 *
 * Updates order metadata to mark as collected
 */
import type { APIRoute } from 'astro';

export const prerender = false;
import { getOrder, updateOrderMetadata } from '../../../../../lib/medusa-admin';

export const POST: APIRoute = async ({ params }) => {
  try {
    const orderId = params.id;
    if (!orderId) {
      return new Response(
        JSON.stringify({ error: 'Order ID required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Get current order
    const order = await getOrder(orderId);

    // Update metadata
    const updatedOrder = await updateOrderMetadata(orderId, {
      ...order.metadata,
      fulfillment_status: 'collected',
      collected_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        success: true,
        order: updatedOrder,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error: any) {
    console.error('Failed to mark order collected:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to mark order collected',
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
