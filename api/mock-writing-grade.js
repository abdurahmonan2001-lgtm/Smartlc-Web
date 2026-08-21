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
import { TASK1_DESCRIPTORS, TASK2_DESCRIPTORS } from './_writing-descriptors.js'

export const config = { maxDuration: 300 }

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

// Smart LC marks DOWN, not to nearest — deliberately stricter than the public
// IELTS rounding, so a band is one a student has actually earned rather than
// one they rounded up into.
//
//   • each criterion → a whole band (as an examiner awards them)
//   • each task band → the four criteria averaged, then FLOORED to a half band
//   • the final band → Task 1 ⅓ + Task 2 ⅔, floored to a half band
//
// Flooring to the half is what makes the marking scheme's rules come out:
//   6,6,6,5 → 5.75 → 5.5      three 6s and a 5 is half a band above the 5
//   6,6,5,5 → 5.50 → 5.5      two and two, likewise
//   6,5,5,5 → 5.25 → 5        one 6 against three 5s earns nothing extra
//   7,7,7,7 → 7.00 → 7        a 7 still requires a 7 in all four
//   7,7,7,6 → 6.75 → 6.5      one weak criterion always costs at least a half
const floorHalf = (n) => Math.floor(n * 2) / 2

// The ORDER of this reply is load-bearing, not cosmetic.
//
// The first version asked for the four band numbers as the opening tokens
// of the JSON, with the analysis and the error list after them. A grader
// that emits "task":5 before it has written a word of analysis is not
// applying the descriptors; it is forming an impression and then
// rationalising it, and against the official examiner-marked scripts that
// impression came out roughly two bands low.
//
// So the reply now runs: evidence for each criterion, THEN the band for that
// criterion, and the mistake list LAST. Because the model writes in order,
// the bands cannot be coloured by a hunt for twelve errors that has not
// happened yet — and the band must be preceded by the descriptor wording it
// claims to match, which is much harder to do carelessly.
const rubricFor = (taskNo) => `You are an experienced IELTS examiner. Mark the candidate's response against the official IELTS Writing band descriptors, which are reproduced in full below. They are the standard: judge against their wording, not against your impression of the script.

OFFICIAL IELTS WRITING TASK ${taskNo} BAND DESCRIPTORS (public version, updated May 2023)
${taskNo === 1 ? TASK1_DESCRIPTORS : TASK2_DESCRIPTORS}

WHAT YOU ARE MARKING
This is an exam answer, produced in about ${taskNo === 1 ? 'twenty' : 'forty'} minutes under timed conditions, with no dictionary, no spellchecker and no chance to redraft. The descriptors are written for exactly that: they already expect the slips, the repetition and the unevenness that timed writing produces. Judge it as a piece of exam work, not as something that has been edited.

HOW TO USE THE DESCRIPTORS
Work through one criterion at a time, and for each one do this in order:
1. Say what the script actually ACHIEVES on that criterion — the features that are present and working. Quote the candidate.
2. Say what LIMITS it — the features that hold it back. Quote the candidate.
3. Name the band whose descriptor fits, and quote the phrase from that descriptor which the script matches. Begin it with the band, like "band 6: ...".
4. Only then give the number, and it MUST be the band you just named. Quoting the band 5 descriptor and then awarding 4 is a contradiction, not caution — if the script matches band 5, the number is 5.

Read the band above and the band below before settling: the right band is the one the script matches best, not the one it fails least. Bolded text in the descriptors marks negative features that cap a rating.

Be honest and accurate in BOTH directions. Do not inflate to be kind — an inflated band misleads the student about what to fix. But do not mark down out of caution either, and this is the commoner error: a script that meets the band 7 descriptors is a 7, and calling it a 6 to seem rigorous is just as wrong as calling a 5 a 6. Errors are not by themselves evidence of a low band; every criterion above band 6 explicitly tolerates errors, so what matters is whether they match the frequency and the effect the descriptor names.

Award a WHOLE band — an integer from 0 to 9 — for each of the four criteria. Never a half band. This is how IELTS examiners assess the criteria: each one gets a whole band, and only the averaged result is reported in halves. Choose the single descriptor that best fits; do not split the difference between two.
- task: ${taskNo === 1 ? 'Task Achievement' : 'Task Response'}
- coherence: Coherence and Cohesion
- lexical: Lexical Resource
- grammar: Grammatical Range and Accuracy

For each of grammar, vocabulary and coherence also write specific, detailed feedback that QUOTES the candidate's own words. Name the actual error and give the correction. Vague advice such as "improve your grammar" is useless — say which structures fail and how to fix them.

LAST, and only after the bands are settled, list the individual mistakes in "corrections". This list is shown to the student marked onto their own essay, so they can see exactly what is wrong and why. It records what you found; it does not decide the band, which you have already given.
- "quote" MUST be copied EXACTLY, character for character, from the candidate's response. Do not paraphrase it, do not correct its spelling, do not add or remove punctuation. If you cannot copy it exactly, leave the mistake out.
- Keep each quote short — the words that are actually wrong, not the whole sentence.
- "kind" is one of: grammar, vocabulary, spelling, punctuation, coherence.
- "fix" is the corrected wording, ready to drop in.
- "why" explains the rule in one or two plain sentences, so the student learns the pattern rather than memorising one correction. Write it for a learner, not for a linguist.
Give every mistake worth learning from, up to 12. Order them as they appear in the response.

Respond with ONLY this JSON, no prose around it, and with the keys in exactly this order:
{"analysis":{
   "task":{"achieves":"...","limits":"...","descriptor":"band 6: addresses all parts of the task though some parts more fully covered than others","band":6},
   "coherence":{"achieves":"...","limits":"...","descriptor":"...","band":6},
   "lexical":{"achieves":"...","limits":"...","descriptor":"...","band":5},
   "grammar":{"achieves":"...","limits":"...","descriptor":"...","band":5}},
 "grammar_feedback":"...","vocabulary_feedback":"...","coherence_feedback":"...",
 "task_feedback":"...","summary":"...","strengths":["..."],"improve":["..."],
 "corrections":[{"quote":"the government have to provides","kind":"grammar","fix":"the government has to provide","why":"'Government' takes a singular verb here, and after 'has to' the verb stays in its base form — so 'has to provide', never 'has to provides'."}]}`

export async function gradeTask({ key, taskNo, prompt, answer, wordTarget }) {
  const wc = words(answer)
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      // 2000 was enough against a short paraphrased rubric; against the full
      // descriptors the reply grew and was being truncated mid-JSON, which
      // surfaced only as a parse error. The per-criterion analysis added
      // another block again, so leave real headroom.
      max_tokens: 6000,
      system: rubricFor(taskNo),
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
  // A truncated reply is not a malformed one — say which, or the next person
  // debugging this reads "unexpected end of JSON" and goes looking at parsing.
  if (data.stop_reason === 'max_tokens') throw new Error('grader reply hit max_tokens and was cut off')
  const parsed = JSON.parse((data.content?.[0]?.text || '').replace(/```json|```/g, '').trim())

  // Each criterion is a WHOLE band, as an examiner awards them. A model that
  // hedges with 5.5 is snapped to a whole band rather than being let through:
  // half bands on a criterion are not a finer measurement, they are a refusal
  // to choose a descriptor.
  const band = (v) => {
    const n = Number(v)
    return Number.isFinite(n) && n >= 0 && n <= 9 ? Math.round(n) : null
  }
  // The band now sits inside the per-criterion analysis, after the evidence
  // for it. The flat top-level form is still accepted so a reply that comes
  // back in the older shape is marked rather than thrown away.
  const a = parsed.analysis || {}
  // The descriptor quote names a band ("band 6: ..."). Twice in a calibration
  // run the grader quoted one band and then awarded the one below it — both
  // times on Task Achievement, both times downward. The number has to follow
  // the evidence, so where the two disagree the quoted descriptor wins: it is
  // the half a reader can check against the published descriptors.
  const overrides = []
  const scoreOf = (k) => {
    const given = band(a?.[k]?.band ?? parsed[k])
    const named = band((String(a?.[k]?.descriptor || '').match(/band\s*([0-9](?:\.[05])?)/i) || [])[1])
    if (given != null && named != null && named !== given) {
      overrides.push(`${k}: quoted band ${named}, awarded ${given} — took ${named}`)
      return named
    }
    return given
  }
  const four = { task: scoreOf('task'), coherence: scoreOf('coherence'), lexical: scoreOf('lexical'), grammar: scoreOf('grammar') }
  if (Object.values(four).some((v) => v == null)) throw new Error('grader returned a band outside 0-9')

  // Floored to the half, not rounded: a 7 here still means every criterion
  // reached 7, and a single weak criterion always costs at least half a band
  // instead of being averaged away.
  const overall = floorHalf((four.task + four.coherence + four.lexical + four.grammar) / 4)

  // A correction is only useful if its quote can be found in the essay — that
  // is what lets the student see it marked on their own writing. A quote the
  // model invented or tidied up would highlight nothing, so it is dropped
  // rather than shown as a mistake the student cannot locate.
  const KINDS = ['grammar', 'vocabulary', 'spelling', 'punctuation', 'coherence']
  const text = String(answer || '')
  const corrections = (Array.isArray(parsed.corrections) ? parsed.corrections : [])
    .map((c) => ({
      quote: String(c?.quote || '').trim(),
      kind: KINDS.includes(String(c?.kind || '').toLowerCase()) ? String(c.kind).toLowerCase() : 'grammar',
      fix: String(c?.fix || '').slice(0, 300),
      why: String(c?.why || '').slice(0, 600),
    }))
    .filter((c) => c.quote && c.why && text.includes(c.quote))
    // Drop a "fix" that is not a fix, and the same quote twice. Live output
    // produced both on a near-blank script: the model, with almost nothing to
    // mark, flagged the one phrase there twice and offered it back unchanged.
    .filter((c) => c.fix.trim().toLowerCase() !== c.quote.trim().toLowerCase())
    .filter((c, i, arr) => arr.findIndex((o) => o.quote === c.quote) === i)
    .slice(0, 12)

  return {
    // The essay travels with its marking. Both the student's screen and the
    // teacher's need to show the corrections ON the writing, and keeping them
    // together means neither has to re-fetch the answers and re-pair them.
    task: taskNo, words: wc, band: overall, criteria: four, corrections, essay: text,
    // Why each criterion got its band, in the examiner's own terms. This is
    // what a teacher needs to see to judge whether the marking is fair, and
    // it is what makes a disputed band arguable rather than opaque.
    reasons: ['task', 'coherence', 'lexical', 'grammar'].reduce((acc, k) => {
      const r = a?.[k]
      if (r) acc[k] = {
        achieves: String(r.achieves || '').slice(0, 600),
        limits: String(r.limits || '').slice(0, 600),
        descriptor: String(r.descriptor || '').slice(0, 300),
      }
      return acc
    }, {}),
    // Empty in the normal case. Non-empty means the grader contradicted
    // itself and the code corrected it, which is worth being able to see.
    overrides,
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

  // Staff path: a paper handed in before marking existed, or one whose marking
  // failed, is older than the window below and can never be picked up by the
  // student's own submission. A shared secret lets staff mark it after the
  // fact. It waives ONLY the recency check — an already-graded paper is still
  // left alone, so this cannot be used to overwrite a band.
  const adminKey = env('PRACTICE_ADMIN_KEY')
  const regradeKey = env('REGRADE_KEY')
  const supplied = String(req.body?.key || '')
  const isStaff = !!supplied && ((!!adminKey && supplied === adminKey) || (!!regradeKey && supplied === regradeKey))

  if (!isStaff && rateLimited(`w:${username}`)) {
    return res.status(429).json({ error: 'Too many marking requests. Try later.' })
  }

  const rest = (path, init) => fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}`, 'Content-Type': 'application/json', ...(init?.headers || {}) },
  })

  // Authorisation is "you handed this paper in": a row must already exist for
  // this student and test, recently, and not yet be graded. There is nothing
  // to grade without one, so a stranger cannot spend credit here.
  const since = new Date(Date.now() - RECENT_MINUTES * 60000).toISOString()
  const window = isStaff ? '' : `&taken_at=gte.${since}`
  const found = await rest(
    `practice_results?student_username=eq.${encodeURIComponent(username)}&test_id=eq.${encodeURIComponent(testId)}`
    + `${window}&order=taken_at.desc&limit=1&select=id,answers,ai_band,module`,
  )
  if (!found.ok) return res.status(502).json({ error: 'Could not read the paper.', detail: (await found.text().catch(() => '')).slice(0, 200) })
  const row = (await found.json())[0]
  if (!row) return res.status(404).json({ error: 'No recent paper found for this student and test.' })
  if (row.ai_band != null) return res.status(200).json({ alreadyGraded: true, band: row.ai_band })

  // The essays come from the stored row; the client only supplies the public
  // task prompts, which are test content rather than the student's work.
  const answers = row.answers || {}
  // Both tasks are graded AT ONCE. Sequentially they take roughly twice as
  // long as one grading call, and the function is killed at 60s — a two-task
  // paper was close enough to that ceiling to be a coin toss.
  const wanted = tasks
    .map((t) => ({ t, answer: answers[t.n] ?? answers[String(t.n)] }))
    .filter((x) => String(x.answer || '').trim())
  let graded
  try {
    graded = await Promise.all(wanted.map(({ t, answer }) => gradeTask({
      key, taskNo: t.task ?? t.n, prompt: t.prompt,
      answer, wordTarget: t.wordTarget ?? ((t.task ?? t.n) === 1 ? 150 : 250),
    })))
  } catch (e) {
    console.error('mock writing task grading failed', String(e).slice(0, 300))
    return res.status(502).json({ error: 'Marking failed — your paper is saved and your teacher will mark it.' })
  }
  if (!graded.length) return res.status(200).json({ empty: true, message: 'No written response to mark.' })

  // Task 1 is a third of the paper and Task 2 two thirds. This is the only
  // place a half band can appear; with one task only, that task stands alone
  // rather than being averaged against nothing.
  const t1 = graded.find((g) => g.task === 1)
  const t2 = graded.find((g) => g.task === 2)
  const overall = t1 && t2 ? floorHalf((t1.band + t2.band * 2) / 3) : floorHalf(graded[0].band)

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
