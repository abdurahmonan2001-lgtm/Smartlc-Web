// Grades placement writing that was submitted but never scored.
//
// While the Anthropic account was out of credit every essay came back
// ungraded: the score stored as null and the candidate's level was computed
// from grammar and reading alone. The essays themselves were saved, so they
// can be marked after the fact — this endpoint finds them and does exactly
// that, using the same grader and the same level maths as a live submission.
//
// Staff-only, same shared-secret pattern as practice-tests.js: the caller
// sends PRACTICE_ADMIN_KEY and this function acts with the Supabase SERVICE
// ROLE key. Nothing here is reachable by a student or a visitor.
//
// POST { key, apply?, limit? }
//   apply omitted / false → dry run: report what WOULD be graded, spend nothing
//   apply: true           → grade and write back
import { GRAMMAR, READING, WRITING_PROMPT, determineLevel } from './_bank.js'
import { env } from './_session.js'

// A serverless function is killed at 60s, and each grading call takes a few
// seconds, so this works in small batches and reports what is left rather than
// trying to clear a backlog in one request and dying halfway through.
export const config = { maxDuration: 60 }

const MAX_BATCH = 8
const DEFAULT_BATCH = 5
const MAX_WRITING_CHARS = 6000

async function gradeWriting(text) {
  const key = env('ANTHROPIC_API_KEY')
  if (!key) return { score: null, error: 'ANTHROPIC_API_KEY not set' }
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        system: 'Grade this English writing for a placement test. Score 0-10 (integer). Respond ONLY with JSON: {"score":7,"feedback":"Brief comment under 40 words"}',
        messages: [{ role: 'user', content: `Prompt: ${WRITING_PROMPT}\n\nStudent writing:\n${String(text).slice(0, MAX_WRITING_CHARS)}` }],
      }),
    })
    if (!r.ok) return { score: null, error: `HTTP ${r.status} — ${(await r.text().catch(() => '')).slice(0, 200)}` }
    const data = await r.json()
    const parsed = JSON.parse((data.content?.[0]?.text || '').replace(/```json|```/g, '').trim())
    const score = Number(parsed.score)
    if (!Number.isFinite(score) || score < 0 || score > 10) return { score: null, error: 'bad score from grader' }
    return { score: Math.round(score), feedback: String(parsed.feedback || '').slice(0, 400) }
  } catch (e) {
    return { score: null, error: String(e).slice(0, 200) }
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const body = req.body || {}
  const admin = env('PRACTICE_ADMIN_KEY')
  if (!admin || body.key !== admin) return res.status(401).json({ error: 'Wrong admin key.' })

  const url = (env('SUPABASE_URL') || env('VITE_SUPABASE_URL')).replace(/\/+$/, '')
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !serviceKey) return res.status(500).json({ error: 'Supabase is not configured.' })

  const rest = (path, init) => fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })

  const limit = Math.min(Number(body.limit) || MAX_BATCH, MAX_BATCH)
  const listed = await rest(
    'placement_results?writing_score=is.null&select=id,full_name,created_at,grammar_score,reading_score,level,writing_answer' +
    `&order=created_at.desc&limit=${limit}`,
  )
  if (!listed.ok) {
    return res.status(502).json({ error: 'Could not read placement_results', detail: (await listed.text().catch(() => '')).slice(0, 300) })
  }

  const rows = await listed.json()
  // A null score means either "essay could not be graded" or "no essay at
  // all". Only the first kind is regradeable.
  const pending = rows.filter((r) => String(r.writing_answer || '').trim().length > 10)

  if (body.apply !== true) {
    return res.status(200).json({
      dryRun: true,
      nullScoreRows: rows.length,
      regradeable: pending.length,
      blankEssays: rows.length - pending.length,
      candidates: pending.map((r) => ({ id: r.id, name: r.full_name, at: r.created_at, chars: r.writing_answer.length })),
      next: 'Send the same request with "apply": true to grade these.',
    })
  }

  const done = []
  for (const row of pending) {
    const g = await gradeWriting(row.writing_answer)
    if (g.score == null) { done.push({ id: row.id, name: row.full_name, ok: false, error: g.error }); continue }

    // The stored level was derived without a writing score. Now that one
    // exists, recompute it exactly as a live submission would — otherwise the
    // office keeps acting on a level that ignored a third of the test.
    const { level, composite } = determineLevel(
      (row.grammar_score ?? 0) / GRAMMAR.length,
      (row.reading_score ?? 0) / READING.length,
      g.score / 10,
    )
    const patch = await rest(`placement_results?id=eq.${row.id}`, {
      method: 'PATCH',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ writing_score: g.score, ai_writing_grade: g.score, level }),
    })
    done.push({
      id: row.id, name: row.full_name, ok: patch.ok,
      writing: g.score, feedback: g.feedback,
      levelBefore: row.level, levelAfter: level, composite,
      levelChanged: row.level !== level,
      ...(patch.ok ? {} : { error: (await patch.text().catch(() => '')).slice(0, 200) }),
    })
  }

  return res.status(200).json({
    applied: true,
    graded: done.filter((d) => d.ok).length,
    failed: done.filter((d) => !d.ok).length,
    levelsChanged: done.filter((d) => d.ok && d.levelChanged).length,
    results: done,
  })
}
