import { defineMiddleware } from 'astro:middleware'
import {
  hasAdminSession,
  isAdminConfigured,
  isAdminPath,
  isPublicAdminPath,
} from './lib/admin-auth'

export const onRequest = defineMiddleware(async (context, next) => {
  const path = context.url.pathname
  if (!isAdminPath(path) || isPublicAdminPath(path)) {
    return next()
  }

  const wantsJson = path.startsWith('/api/')

  if (!isAdminConfigured()) {
    if (wantsJson) {
      return Response.json({ error: 'Admin password is not configured' }, { status: 503 })
    }
    return new Response('Admin password is not configured.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  if (!hasAdminSession(context.cookies)) {
    if (wantsJson) {
      return Response.json({ error: 'Sign in required' }, { status: 401 })
    }
    const nextPath = path + (context.url.search || '')
    return context.redirect(`/admin/login?next=${encodeURIComponent(nextPath)}`)
  }

  return next()
})
