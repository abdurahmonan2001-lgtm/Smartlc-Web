// Coverage and honesty check for the mock explanations.
//
// Two things go wrong when 960 explanations are written by hand: some
// questions get missed, and an "evidence" line gets paraphrased instead of
// quoted, so the student hunts the passage for a sentence that is not there.
// This catches both. Run: node scripts/check-explanations.mjs [testId...]
import fs from 'node:fs'
import path from 'node:path'
import { createServer } from 'vite'

const ROOT = path.resolve(import.meta.dirname, '..')
const NOTES = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/practice/mock-explanations.json'), 'utf8'))
const only = process.argv.slice(2)

// Quotes are compared with punctuation and case flattened: an explanation
// that writes a straight apostrophe where the passage has a curly one is
// still quoting honestly.
const flat = (s) => String(s).toLowerCase().replace(/[‘’']/g, "'")
  .replace(/[“”"]/g, '"').replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim()

const server = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { TESTS } = await server.ssrLoadModule('/src/practice/content.js')

// The spoken script for a listening paper lives in its audio generator.
const scriptFor = (id) => {
  const m = String(id).match(/^mock(\d+)-listening$/)
  if (!m) return null
  const f = path.join(ROOT, `scripts/generate-mock${m[1]}-audio.ps1`)
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : null
}

let missing = 0, unquoted = 0, short = 0, done = 0, total = 0
const rows = []

for (const t of TESTS) {
  if (!/^mock\d+-(reading|listening)$/.test(t.id)) continue
  if (only.length && !only.includes(t.id)) continue
  const source = flat(t.module === 'reading'
    ? t.sections.map((s) => `${s.passageTitle || ''} ${s.passage || ''}`).join(' ')
    : scriptFor(t.id) || '')
  let n = 0, ok = 0, bad = []
  for (const s of t.sections) {
    for (const q of s.questions) {
      if (q.type === 'essay') continue
      n++; total++
      if (!q.explain) { bad.push(`${q.n} missing`); missing++; continue }
      ok++; done++
      if (q.explain.length < 60) { bad.push(`${q.n} thin`); short++ }
      if (q.evidence && source && !source.includes(flat(q.evidence))) {
        bad.push(`${q.n} evidence not in source`); unquoted++
      }
    }
  }
  rows.push({ id: t.id, n, ok, bad })
}

for (const r of rows) {
  const flag = r.bad.length ? '  ⚠ ' + r.bad.slice(0, 6).join('; ') + (r.bad.length > 6 ? ` … +${r.bad.length - 6}` : '') : ''
  console.log(`${r.id.padEnd(20)} ${String(r.ok).padStart(3)}/${r.n}${flag}`)
}
console.log(`\n${done}/${total} explained · missing ${missing} · unquoted evidence ${unquoted} · thin ${short}`)
await server.close()
process.exit(missing || unquoted ? 1 : 0)
