// Folds the reviewers' audit/mock-vocab-*.json overlays into
// src/practice/mock-explanations.json, then removes nothing: run once, check
// with scripts/check-paraphrases.mjs, and delete the overlays by hand.
// A field set to null in an overlay is removed from the question.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const file = path.join(root, 'src', 'practice', 'mock-explanations.json')
const data = JSON.parse(fs.readFileSync(file, 'utf8'))
const auditDir = path.join(root, 'audit')
let n = 0
for (const f of fs.readdirSync(auditDir).filter(f => /^mock-vocab-.*\.json$/.test(f))) {
  const o = JSON.parse(fs.readFileSync(path.join(auditDir, f), 'utf8'))
  for (const [id, qs] of Object.entries(o)) {
    data[id] ||= {}
    for (const [q, v] of Object.entries(qs)) {
      const merged = { ...data[id][q], ...v }
      for (const k of Object.keys(merged)) if (merged[k] == null) delete merged[k]
      data[id][q] = merged
      n++
    }
  }
}
// The file is two-space JSON with Windows line endings; keep it so.
fs.writeFileSync(file, JSON.stringify(data, null, 2).replace(/\n/g, '\r\n') + '\r\n')
console.log(`merged ${n} question entries into mock-explanations.json`)
