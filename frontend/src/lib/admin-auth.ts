import { createHmac, timingSafeEqual } from 'node:crypto'
import type { AstroCookies } from 'astro'

export const ADMIN_COOKIE = 'sme_admin'
const TTL_MS = 14 * 24 * 60 * 60 * 1000

function secret(): string {
  return String(import.meta.env.SITE_ADMIN_PASSWORD || '')
}

export function isAdminConfigured(): boolean {
  return secret().length >= 8
}

export function checkAdminPassword(input: string): boolean {
  const expected = secret()
  if (!expected || !input) return false
  const a = Buffer.from(input)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function signAdminSession(now = Date.now()): string {
  const exp = String(now + TTL_MS)
  const sig = createHmac('sha256', secret()).update(exp).digest('hex')
  return `${exp}.${sig}`
}

export function verifyAdminSession(value: string | undefined): boolean {
  if (!value || !isAdminConfigured()) return false
  const dot = value.indexOf('.')
  if (dot < 1) return false
  const exp = value.slice(0, dot)
  const sig = value.slice(dot + 1)
  if (!sig || Number(exp) < Date.now()) return false
  const expected = createHmac('sha256', secret()).update(exp).digest('hex')
  const a = Buffer.from(sig)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/') || pathname.startsWith('/api/admin')
}

export function isPublicAdminPath(pathname: string): boolean {
  return pathname === '/admin/login' || pathname === '/admin/logout'
}

export function safeAdminNext(path: string | null): string {
  if (path && path.startsWith('/admin') && !path.startsWith('//') && !path.includes('://')) {
    return path
  }
  return '/admin/orders'
}

function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: import.meta.env.PROD,
    path: '/',
    maxAge: Math.floor(TTL_MS / 1000),
  }
}

export function setAdminCookie(cookies: AstroCookies) {
  cookies.set(ADMIN_COOKIE, signAdminSession(), cookieOptions())
}

export function clearAdminCookie(cookies: AstroCookies) {
  cookies.delete(ADMIN_COOKIE, { path: '/' })
}

export function hasAdminSession(cookies: AstroCookies): boolean {
  return verifyAdminSession(cookies.get(ADMIN_COOKIE)?.value)
}
