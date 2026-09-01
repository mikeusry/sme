import type { APIRoute } from 'astro'
import { clearAdminCookie } from '../../lib/admin-auth'

export const prerender = false

export const GET: APIRoute = ({ cookies, redirect }) => {
  clearAdminCookie(cookies)
  return redirect('/admin/login')
}
