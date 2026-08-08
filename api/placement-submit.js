// Scores a placement attempt and stores it. Everything of consequence happens
// here, server-side:
//   • answers are graded against the server-only bank (the browser never had
//     the answer key, and the level it displays is the one computed here)
//   • the writing is AI-graded with the server's Anthropic key
//   • the row is written with the Supabase SERVICE ROLE key, so the public
//     website needs no database credentials at all and cannot read anyone
//     else's results back
// Anti-abuse: signed one-use session token, minimum completion time, honeypot
// field, per-IP rate limits, and hard input size caps.
import { GRAMMAR, READING, WRITING_PROMPT, determineLevel } from './_bank.js'
import { verifySession, seededShuffle, clientIp, rateLimited, countRecent, recordHit, env } from './_session.js'

// A whole family sharing one connection, or a queue of candidates on the
// centre's own tablet, all look like a single IP — so the quota counts only
// COMPLETED tests (the ones that cost an AI call and create a record), while a
// separate, looser ceiling stops a script from hammering the endpoint.
const HOUR = 60 * 60000
const MAX_COMPLETED_PER_HOUR = 20
const MAX_ATTEMPTS_PER_HOUR = 60

const MIN_SECONDS = 60                    // faster than this is not a human sitting the test
const MAX_SESSION_MS = 4 * 3600 * 1000    // a session older than 4h is stale
const MAX_WRITING_CHARS = 6000
const MAX_NAME = 120
const MAX_PHONE = 40

async function gradeWriting(text) {
  const key = env('ANTHROPIC_API_KEY')
  if (!key) return { score: null, feedback: 'Grading unavailable — needs manual review.' }
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: 'Grade this English writing for a placement test. Score 0-10 (integer). Respond ONLY with JSON: {"score":7,"feedback":"Brief comment under 40 words"}',
        // The candidate's text is data, never instructions — it is passed as
        // user content and only a score/feedback pair is read back out.
        messages: [{ role: 'user', content: `Prompt: ${WRITING_PROMPT}\n\nStudent writing:\n${text}` }],
      }),
    })
    if (!r.ok) throw new Error(`HTTP ${r.status}`)
    const data = await r.json()
    const raw = data.content?.[0]?.text || ''
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim())
    const score = Number(parsed.score)
    if (!Number.isFinite(score) || score < 0 || score > 10) throw new Error('bad score')
    const feedback = String(parsed.feedback || 'Graded.').slice(0, 400)
    return { score: Math.round(score), feedback }
  } catch (e) {
    console.error('placement writing grading failed', e)
    return { score: null, feedback: 'Grading unavailable — needs manual review.' }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const url = (env('SUPABASE_URL') || env('VITE_SUPABASE_URL')).replace(/\/+$/, '')
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) return res.status(500).json({ error: 'Placement test is not configured yet.' })

  const ip = clientIp(req)
  if (rateLimited(`try:${ip}`, MAX_ATTEMPTS_PER_HOUR, HOUR)) {
    return res.status(429).json({ error: 'Too many requests from this connection. Please try again later.' })
  }
  if (countRecent(`done:${ip}`, HOUR) >= MAX_COMPLETED_PER_HOUR) {
    return res.status(429).json({ error: 'Too many completed tests from this connection in the last hour. Please try again later.' })
  }

  const b = req.body || {}
  // Honeypot: a hidden field no human ever fills in.
  if (b.website) return res.status(200).json({ ok: true })

  const session = verifySession(b.token)
  if (!session) return res.status(400).json({ error: 'Your test session is invalid. Please start the test again.' })
  const age = Date.now() - Number(session.iat || 0)
  if (age > MAX_SESSION_MS) return res.status(400).json({ error: 'Your test session has expired. Please start again.' })
  if (age < MIN_SECONDS * 1000) return res.status(400).json({ error: 'That was too quick — please complete the test properly.' })

  const fullName = String(b.fullName || '').trim().slice(0, MAX_NAME)
  const phone    = String(b.phone || '').trim().slice(0, MAX_PHONE)
  if (!fullName || phone.replace(/\D/g, '').length < 9) {
    return res.status(400).json({ error: 'Please provide your name and a valid phone number.' })
  }
  // The form requires age, but a candidate who started on an older cached
  // bundle may submit without one — accept null rather than discard their test.
  const candidateAge = Number(b.age)
  const ageValue = Number.isInteger(candidateAge) && candidateAge >= 3 && candidateAge <= 99 ? candidateAge : null

  // Answers arrive keyed by question id; values must be option STRINGS.
  const gA = (b.grammarAnswers && typeof b.grammarAnswers === 'object') ? b.grammarAnswers : {}
  const rA = (b.readingAnswers && typeof b.readingAnswers === 'object') ? b.readingAnswers : {}
  const writing = String(b.writing || '').slice(0, MAX_WRITING_CHARS)

  // Score against the server-side key. Only ids from the bank are considered,
  // so injected extra keys cannot inflate anything.
  const grammarScore = GRAMMAR.filter(q => gA[q.id] === q.answer).length
  const readingScore = READING.filter(q => rA[q.id] === q.answer).length

  // Re-derive what the candidate actually saw (guards a tampered payload that
  // claims answers for a differently-ordered test).
  const seenIds = new Set(seededShuffle(GRAMMAR.map(q => q.id), Number(session.seed)))
  for (const k of Object.keys(gA)) {
    if (!seenIds.has(Number(k))) return res.status(400).json({ error: 'Your answers did not match your test session.' })
  }

  const skipWriting = b.skipWriting === true || writing.trim().length <= 10
  const wr = skipWriting ? { score: null, feedback: 'No writing submitted.' } : await gradeWriting(writing)
  const { level, composite } = determineLevel(
    grammarScore / GRAMMAR.length,
    readingScore / READING.length,
    wr.score != null ? wr.score / 10 : null,
  )

  const row = {
    full_name: fullName,
    age: ageValue,
    phone,
    grammar_score: grammarScore,
    reading_score: readingScore,
    writing_score: wr.score,
    writing_answer: skipWriting ? '' : writing,
    ai_writing_grade: wr.score,
    level,
    grammar_answers: gA,
    reading_answers: rA,
    // 'pending' = test taken, awaiting placement into a group. This is what
    // puts the candidate into the admin app's New Students pipeline and its
    // Daily Tasks counter; the office marks it 'added' on enrolment.
    status: 'pending',
    source: 'website',
  }

  const rest = (path, init) => fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })

  // If the office already BOOKED this test for a lead, fill that row in rather
  // than creating a second one — otherwise the CRM lead stays wired to an empty
  // "booked, not yet taken" row while the real scores sit in a separate record.
  // Phones are compared by their last 9 digits, since the CRM and this form
  // format them differently.
  const digits = phone.replace(/\D/g, '').slice(-9)
  let bookedId = null
  try {
    const r = await rest('placement_results?status=eq.booked&select=id,phone&order=created_at.desc&limit=200')
    if (r.ok) {
      const rows = await r.json()
      bookedId = rows.find(x => String(x.phone || '').replace(/\D/g, '').slice(-9) === digits)?.id ?? null
    }
  } catch (e) { console.error('placement booked-row lookup failed', e) }

  const save = async payload => bookedId
    ? rest(`placement_results?id=eq.${bookedId}`, { method: 'PATCH', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(payload) })
    : rest('placement_results', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify(payload) })

  // Never let an unexpected throw here become a crash page: the candidate has
  // just spent 45 minutes, and a clear "try again" is recoverable where a 500
  // is not.
  let saved
  try {
    saved = await save(row)
    if (!saved.ok) {
      // `source` / `age` may not exist as columns yet — retry without them
      // rather than losing a real candidate's result.
      const { source, age: _age, ...minimal } = row      // eslint-disable-line no-unused-vars
      saved = await save(minimal)
    }
  } catch (e) {
    console.error('placement save threw', e)
    return res.status(502).json({ error: 'Could not save your results — please try submitting again.' })
  }
  if (!saved.ok) {
    console.error('placement save failed', saved.status, await saved.text().catch(() => ''))
    return res.status(502).json({ error: 'Could not save your results — please try submitting again.' })
  }

  recordHit(`done:${ip}`)   // charge the quota only for a test that actually completed

  // Only the candidate's own outcome is returned — never any other row.
  return res.status(200).json({
    level, composite,
    grammarScore, grammarTotal: GRAMMAR.length,
    readingScore, readingTotal: READING.length,
    writingScore: wr.score,
    writingFeedback: wr.feedback,
    firstName: fullName.split(' ')[0],
  })
}
