// Can every question's evidence actually be found in the text a student will
// be looking at? The review screen highlights the span where the answer is
// given, so an evidence string that does not appear verbatim highlights
// nothing and silently does no harm — which is exactly why it needs checking
// here rather than being noticed by a student.
import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'

const ROOT = path.resolve(import.meta.dirname, '..')
const server = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { TESTS } = await server.ssrLoadModule('/src/practice/content.js')
const { parentListeningId } = await server.ssrLoadModule('/src/practice/upper.js')
// The SAME matcher the review screen uses. Checking a reimplementation here
// would prove that two copies agree, not that students see highlights.
const { locateEvidence } = await server.ssrLoadModule('/src/practice/evidence.js')
const TR = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/practice/transcripts.json'), 'utf8'))

const locate = (source, evidence) => locateEvidence(source, evidence)

const groups = {}
const misses = []

for (const t of TESTS) {
  if (t.module === 'writing') continue
  const kind = (/^mock/.test(t.id) ? 'mock ' : 'practice ') + t.module
  groups[kind] ??= { total: 0, withEv: 0, found: 0, noSource: 0 }
  const g = groups[kind]

  let source = null
  if (t.module === 'reading') {
    // Raw, not normalised: locateEvidence does its own normalising and needs
    // real positions so the review screen can highlight the right characters.
    source = t.sections.map((s) => `${s.passageTitle || ''} ${s.passage || ''}`).join(' ')
  } else {
    const parts = TR[t.id] || TR[parentListeningId(t.id)]
    source = parts ? parts.flat().map((l) => l.t).join(' ') : null
  }

  for (const s of t.sections) {
    for (const q of s.questions) {
      if (q.type === 'essay') continue
      g.total++
      if (!q.evidence) continue
      g.withEv++
      if (!source) { g.noSource++; continue }
      if (locate(source, q.evidence)) g.found++
      else misses.push({ id: t.id, n: q.n, ev: String(q.evidence).slice(0, 70) })
    }
  }
}

let anyMissing = 0
for (const [k, g] of Object.entries(groups)) {
  const pct = g.withEv ? Math.round((g.found / g.withEv) * 100) : 0
  console.log(
    `${k.padEnd(19)} ${String(g.total).padStart(5)} questions · ${String(g.withEv).padStart(5)} with evidence · `
    + `${String(g.found).padStart(5)} findable (${pct}%)`
    + (g.noSource ? ` · ${g.noSource} have NO transcript` : ''),
  )
  anyMissing += g.withEv - g.found
}

console.log(`\n${misses.length} evidence strings could not be located in their own source text.`)
for (const m of misses.slice(0, 12)) console.log(`  ${m.id} q${m.n}: "${m.ev}"`)
if (misses.length > 12) console.log(`  … and ${misses.length - 12} more`)

await server.close()
process.exit(anyMissing ? 1 : 0)
