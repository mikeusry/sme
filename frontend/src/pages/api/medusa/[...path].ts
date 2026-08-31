/**
 * Same-origin proxy to the Medusa store API.
 *
 * The browser talks to soulminerseden.com. This route forwards to Railway.
 * That avoids the CORS failure that killed Add to Cart (Railway returned
 * credentials:true and no Access-Control-Allow-Origin).
 */
import type { APIRoute } from 'astro';

export const prerender = false;

const BACKEND =
  import.meta.env.PUBLIC_MEDUSA_BACKEND_URL ||
  'https://backend-production-2bafd.up.railway.app';
const PUBLISHABLE_KEY =
  import.meta.env.PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  'pk_a503cb83700c8aead31f0bd42cd213ca12f7870f6922831c7f48bdf37748b877';

async function proxy({ params, request }: Parameters<APIRoute>[0]) {
  const path = Array.isArray(params.path) ? params.path.join('/') : params.path || '';
  const incoming = new URL(request.url);
  const target = `${BACKEND.replace(/\/$/, '')}/${path}${incoming.search}`;

  const headers = new Headers();
  const contentType = request.headers.get('content-type');
  if (contentType) headers.set('content-type', contentType);
  headers.set(
    'x-publishable-api-key',
    request.headers.get('x-publishable-api-key') || PUBLISHABLE_KEY
  );
  const cookie = request.headers.get('cookie');
  if (cookie) headers.set('cookie', cookie);

  const init: RequestInit = { method: request.method, headers };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  const upstream = await fetch(target, init);
  const body = await upstream.arrayBuffer();
  const out = new Headers();
  const ct = upstream.headers.get('content-type');
  if (ct) out.set('content-type', ct);

  return new Response(body, { status: upstream.status, headers: out });
}

export const ALL: APIRoute = proxy;
export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
