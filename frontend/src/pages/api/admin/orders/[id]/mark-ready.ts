/**
 * Mark Order Ready for Pickup API
 *
 * Updates order metadata to mark as ready
 */
import type { APIRoute } from 'astro';

export const prerender = false;
import { getOrder, updateOrderMetadata } from '../../../../../lib/medusa-admin';
import { sendReadyNotification } from '../../../../../lib/notifications';

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
      fulfillment_status: 'ready',
      ready_at: new Date().toISOString(),
    });

    // Send email notification to customer
    try {
      await sendReadyNotification(
        updatedOrder.email,
        `SME-${updatedOrder.display_id}`,
        updatedOrder.metadata?.fulfillment || {}
      );
    } catch (notifError) {
      console.error('Failed to send notification:', notifError);
      // Don't fail the request if notification fails
    }

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
    console.error('Failed to mark order ready:', error);
    return new Response(
      JSON.stringify({
        error: error.message || 'Failed to mark order ready',
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
