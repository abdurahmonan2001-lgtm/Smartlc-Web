// Grades a piece of writing WITHOUT touching the database.
//
// This exists so the marking can be checked against scripts whose band a real
// IELTS examiner already awarded — the official sample responses published by
// IELTS.org. Without it there is no way to ask "does our 6 mean what their 6
// means?" except by marking real students and hoping.
//
// Staff-only, same shared secret as the rest of the admin surface. It writes
// nothing and reads nothing from the database; the only cost is the API call.
import { env } from './_session.js'
import { gradeTask } from './mock-writing-grade.js'

export const config = { maxDuration: 60 }

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const adminKey = env('PRACTICE_ADMIN_KEY')
  const regradeKey = env('REGRADE_KEY')
  const supplied = String(req.body?.key || '')
  const ok = !!supplied && ((!!adminKey && supplied === adminKey) || (!!regradeKey && supplied === regradeKey))
  if (!ok) return res.status(401).json({ error: 'Wrong admin key.' })

  const key = env('ANTHROPIC_API_KEY')
  if (!key) return res.status(503).json({ error: 'ANTHROPIC_API_KEY not set.' })

  const { taskNo, prompt, essay, wordTarget } = req.body || {}
  if (![1, 2].includes(Number(taskNo)) || !String(essay || '').trim()) {
    return res.status(400).json({ error: 'taskNo (1 or 2) and essay are required.' })
  }

  try {
    const graded = await gradeTask({
      key,
      taskNo: Number(taskNo),
      prompt: String(prompt || ''),
      answer: String(essay),
      wordTarget: Number(wordTarget) || (Number(taskNo) === 1 ? 150 : 250),
    })
    return res.status(200).json({
      band: graded.band,
      criteria: graded.criteria,
      words: graded.words,
      corrections: (graded.corrections || []).length,
      summary: graded.summary,
    })
  } catch (e) {
    console.error('calibration grading failed', String(e).slice(0, 300))
    return res.status(502).json({ error: String(e).slice(0, 300) })
  }
}
