/**
 * Service Request Form API
 *
 * POST /api/service-request
 * Logs land management service requests to Supabase service_requests table.
 * Falls back gracefully if Supabase is unavailable.
 */

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      property_type, property_size, location, current_maintenance, timeline,
      name, email, phone, organization, notes
    } = data;

    // Validate required fields
    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Name, email, and phone are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Log to Supabase if configured
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.SUPABASE_SERVICE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from('service_requests').insert({
        property_type: property_type || null,
        property_size: property_size || null,
        property_location: location || null,
        current_maintenance: current_maintenance || null,
        timeline: timeline || null,
        name,
        email,
        phone,
        company: organization || null,
        notes: notes || null,
        source: 'website_service_request',
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase insert error:', error);
      }
    } else {
      console.log('Service request (no Supabase configured):', { name, email, property_type });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Service request error:', err);
    return new Response(JSON.stringify({ error: 'Something went wrong. Please call us at (706) 613-4415.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
