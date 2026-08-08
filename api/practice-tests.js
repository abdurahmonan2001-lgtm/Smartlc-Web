// Staff-only test management for the practice platform.
// All writes to practice_tests and all storage uploads are authorised here,
// server-side: the browser sends the shared PRACTICE_ADMIN_KEY, and this
// function acts with the Supabase SERVICE ROLE key. Students never write.
//
// Ops (POST body { op, key, ... }):
//   create  { test }          → validates the test object and upserts the row
//   sign    { path }          → signed upload URL for an audio file, so the
//                               staff browser PUTs big MP3s straight to
//                               Supabase Storage (bypasses Vercel body limit)
//   hide    { id }            → soft-deletes a test (status = 'hidden')
//   list    {}                → all rows incl. hidden (the public read path
//                               for students is the anon REST query instead)
import { env } from './_session.js'

const MODULES = ['listening', 'reading', 'writing']
const Q_TYPES = ['tfng', 'ynng', 'mcq', 'select', 'gap', 'essay']
const MAX_BODY_TESTS = 1
const MAX_SECTIONS = 8
const MAX_QUESTIONS = 60
const SLUG = /^[a-z0-9][a-z0-9-]{1,80}$/
const AUDIO_PATH = /^[a-z0-9][a-z0-9/._-]{1,120}\.(mp3|m4a|wav|ogg)$/i

/** Returns a human-readable problem string, or null if the test is valid. */
function validateTest(t) {
  if (!t || typeof t !== 'object') return 'test must be an object'
  if (!SLUG.test(String(t.id || ''))) return 'id must be a lowercase slug (letters, digits, dashes)'
  if (!t.title || typeof t.title !== 'string' || t.title.length > 120) return 'title is required (max 120 chars)'
  if (!t.bookTitle || typeof t.bookTitle !== 'string' || t.bookTitle.length > 80) return 'bookTitle is required (max 80 chars)'
  if (!MODULES.includes(t.module)) return `module must be one of ${MODULES.join(', ')}`
  const dur = Number(t.durationMin)
  if (!Number.isInteger(dur) || dur < 5 || dur > 240) return 'durationMin must be 5–240'
  if (!Array.isArray(t.sections) || t.sections.length < 1 || t.sections.length > MAX_SECTIONS) return `sections must be an array of 1–${MAX_SECTIONS}`
  let nQuestions = 0
  const seen = new Set()
  for (const [si, s] of t.sections.entries()) {
    const where = `sections[${si}]`
    if (!s || typeof s !== 'object') return `${where} must be an object`
    if (!s.instructions || typeof s.instructions !== 'string') return `${where}.instructions is required`
    if (s.audioSrc && typeof s.audioSrc !== 'string') return `${where}.audioSrc must be a string URL`
    if (!Array.isArray(s.questions) || s.questions.length < 1) return `${where}.questions must be a non-empty array`
    for (const [qi, q] of s.questions.entries()) {
      const qw = `${where}.questions[${qi}]`
      nQuestions++
      if (!Number.isInteger(q.n) || q.n < 1 || q.n > 99) return `${qw}.n must be an integer 1–99`
      if (seen.has(q.n)) return `${qw}.n=${q.n} is duplicated — question numbers must be unique across the test`
      seen.add(q.n)
      if (!Q_TYPES.includes(q.type)) return `${qw}.type must be one of ${Q_TYPES.join(', ')}`
      if (!q.prompt || typeof q.prompt !== 'string') return `${qw}.prompt is required`
      if ((q.type === 'mcq' || q.type === 'select')) {
        if (!Array.isArray(q.options) || q.options.length < 2) return `${qw}.options must list at least 2 options`
        if (typeof q.answer !== 'string' || !q.answer) return `${qw}.answer is required (the correct option letter)`
      } else if (q.type !== 'essay') {
        if (typeof q.answer !== 'string' || !q.answer) return `${qw}.answer is required`
      }
      if (q.type === 'gap' && !/_{3,}/.test(q.prompt)) return `${qw}: gap prompts need a ______ blank where the answer box goes`
    }
  }
  if (nQuestions > MAX_QUESTIONS) return `too many questions (${nQuestions}; max ${MAX_QUESTIONS})`
  return null
}

export default async function handler(req, res) {
  // The Education Dept panel in the Admin app calls this from its own origin.
  // Open CORS is safe here: every mutating op requires the admin key.
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const url = (env('SUPABASE_URL') || env('VITE_SUPABASE_URL') || '').replace(/\/+$/, '')
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY')
  const adminKey = env('PRACTICE_ADMIN_KEY')
  if (!url || !serviceKey) return res.status(500).json({ error: 'Server is not configured (Supabase keys missing).' })
  if (!adminKey) return res.status(500).json({ error: 'Server is not configured (PRACTICE_ADMIN_KEY missing).' })

  const b = req.body || {}
  if (String(b.key || '') !== adminKey) return res.status(401).json({ error: 'Wrong upload key.' })

  const rest = (path, init) => fetch(`${url}${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })

  try {
    if (b.op === 'create') {
      const problem = validateTest(b.test)
      if (problem) return res.status(400).json({ error: problem })
      const t = b.test
      const row = {
        id: t.id, title: t.title, book_title: t.bookTitle, module: t.module,
        duration_min: Number(t.durationMin), sections: t.sections, status: 'active',
      }
      const r = await rest('/rest/v1/practice_tests?on_conflict=id', {
        method: 'POST',
        headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
        body: JSON.stringify(row),
      })
      if (!r.ok) return res.status(502).json({ error: `Could not save the test (${r.status}). Has practice_tests.sql been run?` })
      return res.status(200).json({ ok: true, id: t.id })
    }

    if (b.op === 'sign') {
      const path = String(b.path || '')
      if (!AUDIO_PATH.test(path)) return res.status(400).json({ error: 'Audio path must be like tests/vol2-test3/part1.mp3' })
      // the storage endpoint parses the body as JSON, so an empty body 400s
      const r = await rest(`/storage/v1/object/upload/sign/practice-audio/${path}`, { method: 'POST', body: '{}' })
      const j = await r.json().catch(() => ({}))
      if (!r.ok || !j.url) return res.status(502).json({ error: `Could not create an upload URL (${r.status}). Does the practice-audio bucket exist?` })
      // browser PUTs the file to signedUrl; publicUrl is what goes in audioSrc
      return res.status(200).json({
        signedUrl: `${url}/storage/v1${j.url}`,
        publicUrl: `${url}/storage/v1/object/public/practice-audio/${path}`,
      })
    }

    if (b.op === 'hide') {
      if (!SLUG.test(String(b.id || ''))) return res.status(400).json({ error: 'Bad test id.' })
      const r = await rest(`/rest/v1/practice_tests?id=eq.${encodeURIComponent(b.id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ status: 'hidden' }),
      })
      if (!r.ok) return res.status(502).json({ error: `Could not hide the test (${r.status}).` })
      return res.status(200).json({ ok: true })
    }

    if (b.op === 'list') {
      const r = await rest('/rest/v1/practice_tests?select=id,title,book_title,module,duration_min,status,created_at&order=created_at.desc')
      if (!r.ok) return res.status(502).json({ error: `Could not list tests (${r.status}).` })
      return res.status(200).json({ tests: await r.json() })
    }

    return res.status(400).json({ error: 'Unknown op.' })
  } catch (e) {
    console.error('practice-tests op failed', b.op, e)
    return res.status(502).json({ error: 'Unexpected server error — try again.' })
  }
}
