/**
 * point.dog ecommerce pixel (pd-pixel.min.js).
 * Waits for the async script (~5s) before track/identify.
 */

declare global {
  interface Window {
    pdPixel?: {
      track: (event: string, data?: Record<string, unknown>) => void
      identify: (traits: { email?: string; phone?: string }) => void
    }
    pdPixelConfig?: Record<string, unknown>
  }
}

const READY_TIMEOUT_MS = 5000
const READY_INTERVAL_MS = 100

function waitForPixel(): Promise<NonNullable<Window['pdPixel']> | undefined> {
  if (typeof window === 'undefined') return Promise.resolve(undefined)
  if (window.pdPixel) return Promise.resolve(window.pdPixel)

  return new Promise((resolve) => {
    const started = Date.now()
    const id = window.setInterval(() => {
      if (window.pdPixel) {
        window.clearInterval(id)
        resolve(window.pdPixel)
        return
      }
      if (Date.now() - started >= READY_TIMEOUT_MS) {
        window.clearInterval(id)
        resolve(undefined)
      }
    }, READY_INTERVAL_MS)
  })
}

export async function pdTrack(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return
  const pixel = await waitForPixel()
  pixel?.track(event, data)
}

export async function pdIdentify(traits: { email?: string; phone?: string }) {
  if (typeof window === 'undefined') return
  const pixel = await waitForPixel()
  pixel?.identify(traits)
}

export function dollarsFromCents(cents: number | undefined | null): number {
  if (!cents || !Number.isFinite(cents)) return 0
  return Math.round(cents) / 100
}
