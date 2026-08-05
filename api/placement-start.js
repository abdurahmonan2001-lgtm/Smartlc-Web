// Serves the placement test questions WITHOUT their answers, in a
// per-candidate random order, plus a signed session token that the submit
// endpoint uses to re-derive that exact order and score it.
import { GRAMMAR, READING, READING_PASSAGE, WRITING_PROMPT } from './_bank.js'
import { signSession, seededShuffle, clientIp, rateLimited } from './_session.js'
import crypto from 'node:crypto'

export default function handler(req, res) {
  // Same-origin page; no CORS headers on purpose.
  if (req.method !== 'POST' && req.method !== 'GET') return res.status(405).json({ error: 'POST only' })
  if (!process.env.PLACEMENT_SECRET && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return res.status(500).json({ error: 'Placement test is not configured yet.' })
  }
  // Generous: starting costs nothing (no AI call, no database write), and a
  // shared office tablet or a NAT'd mobile network puts many real candidates
  // behind one IP. The submit endpoint carries the meaningful quota.
  if (rateLimited(`start:${clientIp(req)}`, 40, 60 * 60000)) {
    return res.status(429).json({ error: 'Too many attempts from this connection. Please try again later.' })
  }

  // Order is derived from the seed, never sent as data — so a candidate cannot
  // reorder their way to a mismatch between what they saw and what is scored.
  const seed = crypto.randomInt(1, 2 ** 31)
  const gOrder = seededShuffle(GRAMMAR.map(q => q.id), seed)
  const grammar = gOrder.map(id => {
    const q = GRAMMAR.find(x => x.id === id)
    return { id: q.id, q: q.q, options: seededShuffle(q.options, seed + id) }
  })
  // Reading questions keep passage order (they follow the text); only the
  // multiple-choice options shuffle. True/False stays as-is.
  const reading = READING.map(q => ({
    id: q.id, q: q.q,
    options: q.options.length > 2 ? seededShuffle(q.options, seed + 1000 + q.id) : q.options,
  }))

  const token = signSession({ seed, iat: Date.now(), n: crypto.randomBytes(8).toString('hex') })
  return res.status(200).json({
    token, grammar, reading,
    passage: READING_PASSAGE,
    writingPrompt: WRITING_PROMPT,
  })
}
