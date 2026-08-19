// Indicative IELTS band for a mock writing paper.
//
// Deliberate design decisions, because this marks a student's work:
//
//  • The ESSAYS ARE READ FROM THE DATABASE, not from the request. The browser
//    only says "grade my paper for test X"; it cannot submit text that differs
//    from what was handed in, and it cannot award itself a band — the band is
//    written here, with the service role.
//  • Each task is graded SEPARATELY against the four official criteria, then
//    combined Task 1 : Task 2 = 1 : 2, which is how a real IELTS writing band
//    is formed. Grading both tasks in one call would blur them.
//  • Word counts are computed HERE and given to the grader. Under-length is a
//    penalty in the real exam, and a model asked to count words is unreliable.
//  • The result is explicitly INDICATIVE. The teacher's mark is the real one;
//    this exists so a student gets specific feedback immediately and the
//    teacher walks into the lesson already knowing what to look at.
import { env } from './_session.js'

export const config = { maxDuration: 60 }

const MAX_ESSAY_CHARS = 12000
const RECENT_MINUTES = 180          // only a paper handed in recently may be graded
const MAX_PER_STUDENT_PER_HOUR = 6

const hits = new Map()
function rateLimited(key) {
  const now = Date.now()
  const list = (hits.get(key) || []).filter((t) => now - t < 3600000)
  if (list.length >= MAX_PER_STUDENT_PER_HOUR) return true
  list.push(now)
  hits.set(key, list)
  return false
}

const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).length
const toHalf = (n) => Math.round(n * 2) / 2

const RUBRIC = `You are an experienced IELTS examiner. Mark the candidate's response against the official IELTS Writing band descriptors.

Be honest and accurate. Do NOT inflate the band to be kind — an inflated band misleads the student about what they need to fix, which is worse than a disappointing number. Apply the descriptors as strictly as you would for a real candidate. A mid-range script is a 5.5 or 6, not a 7.

Score each criterion 0-9 in whole or half bands:
- task: Task Achievement (Task 1) or Task Response (Task 2)
- coherence: Coherence and Cohesion
- lexical: Lexical Resource
- grammar: Grammatical Range and Accuracy

For each of grammar, vocabulary and coherence write specific, detailed feedback that QUOTES the candidate's own words. Name the actual error and give the correction. Vague advice such as "improve your grammar" is useless — say which structures fail and how to fix them.

Respond with ONLY this JSON, no prose around it:
{"task":6,"coherence":6,"lexical":5.5,"grammar":5.5,
 "grammar_feedback":"...","vocabulary_feedback":"...","coherence_feedback":"...",
 "task_feedback":"...","summary":"...","strengths":["..."],"improve":["..."]}`

async function gradeTask({ key, taskNo, prompt, answer, wordTarget }) {
  const wc = words(answer)
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: RUBRIC,
      messages: [{
        role: 'user',
        // The candidate's text is data, never instructions: only a band and
        // feedback are read back out of the reply.
        content: `IELTS Academic Writing Task ${taskNo}. Minimum ${wordTarget} words; this response is ${wc} words`
          + (wc < wordTarget ? ` — UNDER LENGTH, apply the penalty the descriptors require.` : '.')
          + `\n\nTask prompt:\n${String(prompt || '').slice(0, 4000)}`
          + `\n\nCandidate's response:\n${String(answer || '').slice(0, MAX_ESSAY_CHARS)}`,
      }],
    }),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status} — ${(await r.text().catch(() => '')).slice(0, 200)}`)
  const data = await r.json()
  const parsed = JSON.parse((data.content?.[0]?.text || '').replace(/```json|```/g, '').trim())

  const band = (v) => {
    const n = Number(v)
    return Number.isFinite(n) && n >= 0 && n <= 9 ? toHalf(n) : null
  }
  const four = { task: band(parsed.task), coherence: band(parsed.coherence), lexical: band(parsed.lexical), grammar: band(parsed.grammar) }
  if (Object.values(four).some((v) => v == null)) throw new Error('grader returned a band outside 0-9')

  // An IELTS task band is the average of the four criteria, to the nearest half.
  const overall = toHalf((four.task + four.coherence + four.lexical + four.grammar) / 4)
  return {
    task: taskNo, words: wc, band: overall, criteria: four,
    grammar_feedback: String(parsed.grammar_feedback || '').slice(0, 1500),
    vocabulary_feedback: String(parsed.vocabulary_feedback || '').slice(0, 1500),
    coherence_feedback: String(parsed.coherence_feedback || '').slice(0, 1500),
    task_feedback: String(parsed.task_feedback || '').slice(0, 1500),
    summary: String(parsed.summary || '').slice(0, 800),
    strengths: (Array.isArray(parsed.strengths) ? parsed.strengths : []).slice(0, 5).map((s) => String(s).slice(0, 300)),
    improve: (Array.isArray(parsed.improve) ? parsed.improve : []).slice(0, 5).map((s) => String(s).slice(0, 300)),
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const key = env('ANTHROPIC_API_KEY')
  const url = (env('SUPABASE_URL') || env('VITE_SUPABASE_URL')).replace(/\/+$/, '')
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY')
  if (!key || !url || !serviceKey) return res.status(503).json({ error: 'Marking is not configured.' })

  const { username, testId, tasks } = req.body || {}
  if (!username || !testId || !Array.isArray(tasks) || !tasks.length) {
    return res.status(400).json({ error: 'username, testId and tasks are required.' })
  }
  if (rateLimited(`w:${username}`)) return res.status(429).json({ error: 'Too many marking requests. Try later.' })

  const rest = (path, init) => fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json', ...(init?.headers || {}) },
  })

  // Authorisation is "you handed this paper in": a row must already exist for
  // this student and test, recently, and not yet be graded. There is nothing
  // to grade without one, so a stranger cannot spend credit here.
  const since = new Date(Date.now() - RECENT_MINUTES * 60000).toISOString()
  const found = await rest(
    `practice_results?student_username=eq.${encodeURIComponent(username)}&test_id=eq.${encodeURIComponent(testId)}`
    + `&taken_at=gte.${since}&order=taken_at.desc&limit=1&select=id,answers,ai_band,module`,
  )
  if (!found.ok) return res.status(502).json({ error: 'Could not read the paper.', detail: (await found.text().catch(() => '')).slice(0, 200) })
  const row = (await found.json())[0]
  if (!row) return res.status(404).json({ error: 'No recent paper found for this student and test.' })
  if (row.ai_band != null) return res.status(200).json({ alreadyGraded: true, band: row.ai_band })

  // The essays come from the stored row; the client only supplies the public
  // task prompts, which are test content rather than the student's work.
  const answers = row.answers || {}
  const graded = []
  for (const t of tasks) {
    const answer = answers[t.n] ?? answers[String(t.n)]
    if (!String(answer || '').trim()) continue
    try {
      graded.push(await gradeTask({
        key, taskNo: t.task ?? t.n, prompt: t.prompt,
        answer, wordTarget: t.wordTarget ?? ((t.task ?? t.n) === 1 ? 150 : 250),
      }))
    } catch (e) {
      console.error('mock writing task grading failed', String(e).slice(0, 300))
      return res.status(502).json({ error: 'Marking failed — your paper is saved and your teacher will mark it.' })
    }
  }
  if (!graded.length) return res.status(200).json({ empty: true, message: 'No written response to mark.' })

  // Task 2 counts double, as in the real exam. With only one task present,
  // that task stands alone rather than being averaged against nothing.
  const t1 = graded.find((g) => g.task === 1)
  const t2 = graded.find((g) => g.task === 2)
  const overall = t1 && t2 ? toHalf((t1.band + t2.band * 2) / 3) : toHalf(graded[0].band)

  const feedback = { indicative: true, tasks: graded, gradedAt: new Date().toISOString() }
  const patch = await rest(`practice_results?id=eq.${row.id}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ ai_band: overall, ai_feedback: feedback, ai_graded_at: feedback.gradedAt }),
  })
  if (!patch.ok) {
    // The student still deserves their feedback even if the column is missing
    // (migration not yet run) — return it rather than throwing it away.
    console.error('mock writing band not stored', patch.status, (await patch.text().catch(() => '')).slice(0, 200))
    return res.status(200).json({ band: overall, feedback, stored: false })
  }
  return res.status(200).json({ band: overall, feedback, stored: true })
}
