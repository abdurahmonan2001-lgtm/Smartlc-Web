// Signed placement session tokens + a shared per-IP rate limiter.
//
// The token carries the per-candidate question order and the issue time, signed
// with HMAC-SHA256. That lets the scoring endpoint re-derive the exact order a
// candidate saw WITHOUT trusting anything the browser sends, and enforce a
// minimum completion time (bot guard) and a maximum session age.
import crypto from 'node:crypto'

const SECRET = () =>
  process.env.PLACEMENT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || ''

const b64u = buf => Buffer.from(buf).toString('base64url')

export function signSession(payload) {
  const body = b64u(JSON.stringify(payload))
  const sig = crypto.createHmac('sha256', SECRET()).update(body).digest('base64url')
  return `${body}.${sig}`
}

export function verifySession(token) {
  if (typeof token !== 'string' || !token.includes('.')) return null
  const [body, sig] = token.split('.')
  const expect = crypto.createHmac('sha256', SECRET()).update(body).digest('base64url')
  // Constant-time compare; lengths must match first or timingSafeEqual throws.
  if (sig.length !== expect.length) return null
  if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expect))) return null
  try { return JSON.parse(Buffer.from(body, 'base64url').toString()) } catch { return null }
}

// Deterministic shuffle from a seed, so the order is reproducible server-side
// from the token alone (no server state to keep between the two requests).
export function seededShuffle(arr, seed) {
  const a = [...arr]
  let s = seed >>> 0
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296 }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function clientIp(req) {
  return String(req.headers['x-forwarded-for'] || '').split(',')[0].trim()
    || req.socket?.remoteAddress || 'unknown'
}

// Per-warm-instance limiter. Ephemeral (resets on cold start) so it blunts
// bursts rather than guaranteeing a hard cap — the AI cost ceiling and the
// session token do the heavy lifting.
const buckets = new Map()
export function rateLimited(key, maxPerWindow, windowMs) {
  const now = Date.now()
  const arr = (buckets.get(key) || []).filter(t => now - t < windowMs)
  arr.push(now)
  buckets.set(key, arr)
  if (buckets.size > 5000) buckets.clear()
  return arr.length > maxPerWindow
}
