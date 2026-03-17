/**
 * Contact Form API
 *
 * POST /api/contact
 * Logs contact form submissions to Supabase contact_inquiries table.
 * Falls back gracefully if Supabase is unavailable.
 */

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { sendContactNotification } from '../../lib/notifications';
import { subscribeToList } from '../../lib/klaviyo';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, subject, message } = data;

    // Validate required fields — email-only signups (events, farm stand) skip name/message
    const isSignup = data.type === 'events-interest' || data.type === 'farm-stand-interest';
    if (!email || (!isSignup && (!name || !message))) {
      return new Response(JSON.stringify({ error: 'Email is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Log to Supabase if configured
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
    const supabaseKey = import.meta.env.SUPABASE_SERVICE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { error } = await supabase.from('contact_inquiries').insert({
        name,
        email,
        phone: phone || null,
        subject: subject || null,
        message,
        source: 'website_contact_form',
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error('Supabase insert error:', error);
        // Don't fail the request — still return success to user
      }
    } else {
      console.log('Contact form submission (no Supabase configured):', { name, email, subject });
    }

    // Subscribe to Klaviyo list
    await subscribeToList({
      email,
      name,
      phone,
      source: data.type || 'contact_form',
    }).catch(err => console.error('Klaviyo subscribe failed:', err));

    // Send email notification to farm team
    await sendContactNotification({
      name,
      email,
      phone,
      message,
      type: data.type || 'contact',
    }).catch(err => console.error('Email notification failed:', err));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ error: 'Something went wrong. Please call us at (706) 613-4415.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
