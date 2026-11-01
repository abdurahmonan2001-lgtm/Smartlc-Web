// Checks every question's paraphrase pair (q.vocab = [inText, inQuestion]):
//   inText      must occur word for word in the passage (reading) or the
//               audio script of that part (listening), after the same
//               quote/dash/space levelling as evidence.js;
//   inQuestion  must occur in what the student reads for that question:
//               the prompt, options, note, or the part's table/notes/box.
// For the mocks the pairs live in mock-explanations.json.
//
//   node scripts/check-paraphrases.mjs            every paper
//   node scripts/check-paraphrases.mjs pset3      papers whose id starts so
// Prints each failure and a per-paper coverage line; exits 1 on any failure.
import fs from 'fs'
import path from 'path'
import { pathToFileURL, fileURLToPath } from 'url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'practice')
const only = process.argv[2] || ''
const transcripts = JSON.parse(fs.readFileSync(path.join(dir, 'transcripts.json'), 'utf8'))
const mockEx = JSON.parse(fs.readFileSync(path.join(dir, 'mock-explanations.json'), 'utf8'))
// Reviewers working in parallel write mock changes to audit/mock-vocab-*.json
// ({ paperId: { n: { vocab, explain, evidence } } }) instead of all editing
// mock-explanations.json at once; they count here, then get merged in.
const auditDir = path.join(dir, '..', '..', 'audit')
for (const f of fs.existsSync(auditDir) ? fs.readdirSync(auditDir).filter(f => /^mock-vocab-.*.json$/.test(f)) : []) {
  const o = JSON.parse(fs.readFileSync(path.join(auditDir, f), 'utf8'))
  for (const [id, qs] of Object.entries(o)) for (const [n, v] of Object.entries(qs)) mockEx[id] = { ...mockEx[id], [n]: { ...mockEx[id]?.[n], ...v } }
}

const CH = { '‘': "'", '’': "'", '‚': "'", '‛': "'", '“': '"', '”': '"', '„': '"', '–': '-', '—': '-', '−': '-', '…': '...' }
const level = (s) => String(s ?? '').replace(/[‘’‚‛“”„–—−…]/g, (c) => CH[c]).toLowerCase()
  .replace(/[.,;:!?"()]/g, ' ').replace(/\s+/g, ' ').trim()

let failures = 0
const files = fs.readdirSync(dir).filter(f => /^(mock|pset|upset)\d+-(listening|reading)\.js$/.test(f) && f.startsWith(only))
for (const f of files.sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))) {
  const m = await import(pathToFileURL(path.join(dir, f)).href)
  const t = Object.values(m).find(v => v && v.sections)
  const isMock = /^mock/.test(t.id)
  let n = 0, have = 0
  t.sections.forEach((s, si) => {
    const source = t.module === 'listening'
      ? level((transcripts[t.id]?.[si] || []).map(l => l.t).join(' '))
      : level(s.passage)
    // Completion tables/notes/boxes sit on one question of their group but are
    // what every gap in it reads, so they count for the whole part.
    const blocks = (s.questions || []).map(x => ({ table: x.table, notes: x.notes, box: x.box, title: x.title }))
    const sectionText = level(JSON.stringify({ table: s.table, notes: s.notes, box: s.box, options: s.options, groups: s.groups, blocks }))
    const qs = (s.questions || []).concat((s.groups || []).flatMap(g => g.questions || []))
    for (const q of qs) {
      n++
      const vocab = isMock ? mockEx[t.id]?.[q.n]?.vocab : q.vocab
      if (!vocab) continue
      have++
      const [inText, inQ] = vocab
      // Only what the student reads: the question minus its key, explanation,
      // evidence and the pair itself (which would otherwise always match),
      // plus the shared prompt/options of its group's first question (the
      // second slot of a "choose TWO" carries only an answer).
      const { vocab: _v, explain: _e, evidence: _ev, answer: _a, ...shown } = q
      const leader = q.group ? qs.find(x => x.group === q.group) : null
      const qText = level(JSON.stringify(shown)) + ' ' + level(JSON.stringify({ p: leader?.prompt, o: leader?.options })) + ' ' + sectionText
      if (!source.includes(level(inText)) && source.includes(level(inQ)) && qText.includes(level(inText))) { failures++; console.log(`${t.id} Q${q.n}: sides reversed (should be [inText, inQuestion]): ${JSON.stringify(vocab)}`) } else if (!source.includes(level(inText))) { failures++; console.log(`${t.id} Q${q.n}: text side not found in the ${t.module === 'listening' ? 'script of part ' + (si + 1) : 'passage ' + (si + 1)}: "${inText}"`) }
      if (!qText.includes(level(inQ))) { failures++; console.log(`${t.id} Q${q.n}: question side not found in the question: "${inQ}"`) }
      if (level(inText) === level(inQ)) { failures++; console.log(`${t.id} Q${q.n}: the two sides are the same words, not a paraphrase: "${inText}"`) }
    }
  })
  console.log(`${t.id}: ${have}/${n} questions have a pair`)
}
console.log(failures ? `\n${failures} problem(s)` : '\nall pairs check out')
process.exit(failures ? 1 : 0)
