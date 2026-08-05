// Signed placement session tokens + a shared per-IP rate limiter.
//
// The token carries the per-candidate question order and the issue time, signed
// with HMAC-SHA256. That lets the scoring endpoint re-derive the exact order a
// candidate saw WITHOUT trusting anything the browser sends, and enforce a
// minimum completion time (bot guard) and a maximum session age.
import crypto from 'node:crypto'

// Env values can arrive with a UTF-8 byte-order mark or stray whitespace when
// they are pasted from a file saved as "UTF-8 with BOM" — an invisible U+FEFF
// in front of a URL makes it unparseable and crashes fetch. Always read env
// through this.
export const env = name => String(process.env[name] || '').replace(/^﻿/, '').trim()

const SECRET = () => env('PLACEMENT_SECRET') || env('SUPABASE_SERVICE_ROLE_KEY') || ''

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

// Per-warm-instance limiters. Ephemeral (reset on cold start) so they blunt
// bursts rather than guaranteeing a hard cap — the AI cost ceiling and the
// session token do the heavy lifting.
const buckets = new Map()

function prune(key, windowMs) {
  const now = Date.now()
  const arr = (buckets.get(key) || []).filter(t => now - t < windowMs)
  buckets.set(key, arr)
  if (buckets.size > 5000) buckets.clear()
  return arr
}

// Records a hit and reports whether the allowance is now exceeded.
export function rateLimited(key, maxPerWindow, windowMs) {
  const arr = prune(key, windowMs)
  arr.push(Date.now())
  return arr.length > maxPerWindow
}

// Counts without recording — lets a caller charge the quota only for the
// outcomes that actually cost something (a saved result, an AI call).
export function countRecent(key, windowMs) { return prune(key, windowMs).length }
export function recordHit(key) {
  const arr = buckets.get(key) || []
  arr.push(Date.now())
  buckets.set(key, arr)
}
