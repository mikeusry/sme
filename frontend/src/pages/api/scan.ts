/**
 * AI Detection Scan API
 *
 * POST /api/scan
 * Body: { url: string }
 *
 * Fetches page content, calls Originality.ai, stores in Supabase
 */

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false;

// Thresholds
const PASS_THRESHOLD = 20;
const WARNING_THRESHOLD = 40;

function getStatus(aiScore: number): 'pass' | 'warning' | 'fail' {
  if (aiScore < PASS_THRESHOLD) return 'pass';
  if (aiScore < WARNING_THRESHOLD) return 'warning';
  return 'fail';
}

// Extract text content from HTML
function extractText(html: string): string {
  // Remove script and style tags
  let text = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  text = text.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');

  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, ' ');

  // Decode HTML entities
  text = text.replace(/&nbsp;/g, ' ');
  text = text.replace(/&amp;/g, '&');
  text = text.replace(/&lt;/g, '<');
  text = text.replace(/&gt;/g, '>');
  text = text.replace(/&quot;/g, '"');
  text = text.replace(/&#39;/g, "'");

  // Clean up whitespace
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

// Simple hash for content comparison
function hashContent(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(16);
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { url } = await request.json();

    if (!url) {
      return new Response(JSON.stringify({ error: 'URL required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check environment variables
    const ORIGINALITY_API_KEY = import.meta.env.ORIGINALITY_API_KEY;
    const SUPABASE_URL = import.meta.env.POINTDOG_SUPABASE_URL;
    const SUPABASE_KEY = import.meta.env.POINTDOG_SUPABASE_SERVICE_KEY;

    if (!ORIGINALITY_API_KEY) {
      return new Response(JSON.stringify({ error: 'ORIGINALITY_API_KEY not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!SUPABASE_URL || !SUPABASE_KEY) {
      return new Response(JSON.stringify({ error: 'Supabase not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch the page
    console.log(`[Scan] Fetching: ${url}`);
    const pageResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SME-AI-Scanner/1.0)'
      }
    });

    if (!pageResponse.ok) {
      return new Response(JSON.stringify({ error: `Failed to fetch page: ${pageResponse.status}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const html = await pageResponse.text();
    const text = extractText(html);
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

    if (wordCount < 50) {
      return new Response(JSON.stringify({
        error: 'Not enough content to analyze',
        wordCount
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`[Scan] Extracted ${wordCount} words`);

    // Call Originality.ai
    console.log('[Scan] Calling Originality.ai...');
    const originalityResponse = await fetch('https://api.originality.ai/api/v1/scan/ai', {
      method: 'POST',
      headers: {
        'X-OAI-API-KEY': ORIGINALITY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: text.substring(0, 15000), // API limit
        aiModelVersion: '1',
        storeScan: false,
      }),
    });

    if (!originalityResponse.ok) {
      const errorText = await originalityResponse.text();
      console.error('[Scan] Originality API error:', errorText);
      return new Response(JSON.stringify({ error: `Originality API error: ${originalityResponse.status}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const scanResult = await originalityResponse.json();
    console.log('[Scan] Result:', scanResult);

    // Extract scores
    const aiScore = Math.round((scanResult.score?.ai || 0) * 100);
    const humanScore = Math.round((scanResult.score?.original || 0) * 100);
    const status = getStatus(aiScore);

    // Parse URL path
    const urlPath = new URL(url).pathname;
    const contentHash = hashContent(text);

    // Store in Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

    const { error: dbError } = await supabase
      .from('sme_ai_detection')
      .upsert({
        url,
        url_path: urlPath,
        ai_score: aiScore,
        human_score: humanScore,
        status,
        words_checked: wordCount,
        credits_used: 1,
        content_hash: contentHash,
        checked_at: new Date().toISOString(),
      }, {
        onConflict: 'url'
      });

    if (dbError) {
      console.error('[Scan] Supabase error:', dbError);
      // Still return the scan result even if storage fails
    }

    return new Response(JSON.stringify({
      success: true,
      url,
      urlPath,
      aiScore,
      humanScore,
      status,
      wordCount,
      checkedAt: new Date().toISOString(),
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[Scan] Error:', error);
    return new Response(JSON.stringify({
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
