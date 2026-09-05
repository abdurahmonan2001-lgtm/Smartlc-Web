// Tests one hypothesis: the grader forms a single impression of a script and
// applies it to all four criteria.
//
// The evidence for it is the profiles. Real examiners produce uneven ones
// (7/8/6/7). Ours came back [6/6/6/6], [5/5/5/5], [6/6/6/7], [5/5/4/4] —
// nearly flat every time, on every script, in both models.
//
// If that is a halo, asking for ONE criterion per call, with nothing else to
// judge, should move the numbers. If the criteria come back the same as they
// did together, the halo idea is wrong and the gap is genuine judgement.
import fs from 'node:fs'
import path from 'node:path'
import { TASK1_DESCRIPTORS, TASK2_DESCRIPTORS } from '../api/_writing-descriptors.js'

const HERE = import.meta.dirname
const SET = JSON.parse(fs.readFileSync(path.join(HERE, 'calibration-scripts.json'), 'utf8'))
const key = process.env.ANTHROPIC_API_KEY
const model = process.env.WRITING_MODEL || 'claude-opus-5'
if (!key) { console.error('ANTHROPIC_API_KEY not set'); process.exit(2) }

const NAMES = {
  task: (n) => (n === 1 ? 'Task Achievement' : 'Task Response'),
  coherence: () => 'Coherence and Cohesion',
  lexical: () => 'Lexical Resource',
  grammar: () => 'Grammatical Range and Accuracy',
}
const FOCUS = {
  task: 'Judge ONLY how fully and appropriately the response answers the question. Ignore vocabulary, grammar and paragraphing except where they stop the argument being understood.',
  coherence: 'Judge ONLY organisation, progression, paragraphing and cohesive devices. Ignore how accurate the grammar and vocabulary are; a script can be poorly worded and still be well organised.',
  lexical: 'Judge ONLY the vocabulary: its range, precision, collocation, register, and spelling/word-formation. Ignore sentence grammar entirely — verb tense and article errors belong to another criterion, not this one.',
  grammar: 'Judge ONLY sentence structures: the range of forms attempted, and accuracy of grammar and punctuation. Ignore word choice and spelling — those belong to Lexical Resource.',
}

const ask = async (script, criterion) => {
  const d = script.task === 1 ? TASK1_DESCRIPTORS : TASK2_DESCRIPTORS
  const system = `You are an experienced IELTS examiner. You are marking ONE criterion only: ${NAMES[criterion](script.task)}.

${FOCUS[criterion]}

OFFICIAL IELTS WRITING TASK ${script.task} BAND DESCRIPTORS (public version, May 2023). Each band below describes all four criteria in one paragraph, in this order: Task ${script.task === 1 ? 'Achievement' : 'Response'}; Coherence and Cohesion; Lexical Resource; Grammatical Range and Accuracy. Read ONLY the part that describes ${NAMES[criterion](script.task)}.
${d}

This is a timed exam answer written in about ${script.task === 1 ? 'twenty' : 'forty'} minutes, by hand, with no dictionary and no chance to redraft. The descriptors already expect the slips that produces.

Work out which band this script matches for ${NAMES[criterion](script.task)} alone. Say what it achieves, what limits it, quote the descriptor phrase you are matching, and then give a whole-number band. Bands above 6 explicitly tolerate errors — what matters is whether the errors match the frequency and effect the descriptor names, not whether errors exist.

Reply with ONLY: {"achieves":"...","limits":"...","descriptor":"band N: ...","band":N}`

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({
      model, max_tokens: 3000, system,
      messages: [{ role: 'user', content: `Task ${script.task} prompt:\n${script.prompt}\n\nCandidate's response (${script.words} words):\n${script.response}` }],
    }),
  })
  if (!r.ok) throw new Error(`HTTP ${r.status} — ${(await r.text()).slice(0, 160)}`)
  const data = await r.json()
  const txt = (data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('')
  return JSON.parse(txt.replace(/```json|```/g, '').trim())
}

const floorHalf = (n) => Math.floor(n * 2) / 2
const ids = process.argv.slice(2)
const scripts = SET.filter((s) => !ids.length || ids.includes(s.id))

for (const s of scripts) {
  const keys = ['task', 'coherence', 'lexical', 'grammar']
  const out = await Promise.all(keys.map((k) => ask(s, k)))
  const four = Object.fromEntries(keys.map((k, i) => [k, out[i].band]))
  const band = floorHalf(keys.reduce((a, k) => a + four[k], 0) / 4)
  const diff = band - s.officialBand
  console.log(`\n${s.id}  examiner ${s.officialBand}  ->  ${band}  (diff ${diff > 0 ? '+' : ''}${diff.toFixed(1)})  [${keys.map((k) => four[k]).join('/')}]`)
  keys.forEach((k, i) => console.log(`   ${k.padEnd(9)} ${four[k]}  ${String(out[i].descriptor || '').slice(0, 96)}`))
}
