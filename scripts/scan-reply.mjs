// Walks a raw grader reply character by character and reports the first
// structure that never closes, plus any raw control character sitting inside
// a JSON string. "Expected ',' or '}'" at the very end of a reply that looks
// complete means something opened much earlier, and the message points at the
// wrong place entirely.
import fs from 'node:fs'
import path from 'node:path'

const file = process.argv[2] || path.join(import.meta.dirname, 'failed-reply.txt')
const s = fs.readFileSync(file, 'utf8')

let inStr = false, esc = false, depth = 0, arr = 0
const openBraces = []
const openBrackets = []
const controls = []

for (let i = 0; i < s.length; i++) {
  const c = s[i]
  if (esc) { esc = false; continue }
  if (c === '\\') { esc = true; continue }
  if (c === '"') { inStr = !inStr; continue }
  if (inStr) {
    if (c === '\n' || c === '\r' || c === '\t') controls.push([i, c])
    continue
  }
  if (c === '{') { depth++; openBraces.push(i) }
  else if (c === '}') { depth--; openBraces.pop() }
  else if (c === '[') { arr++; openBrackets.push(i) }
  else if (c === ']') { arr--; openBrackets.pop() }
}

console.log('length             :', s.length)
console.log('brace depth at end :', depth, depth === 0 ? '(balanced)' : '(UNBALANCED)')
console.log('bracket depth      :', arr, arr === 0 ? '(balanced)' : '(UNBALANCED)')
console.log('string open at end :', inStr)
console.log('raw control chars in strings:', controls.length)

for (const [i, c] of controls.slice(0, 5)) {
  console.log(`  ${JSON.stringify(c)} at ${i}: ${JSON.stringify(s.slice(Math.max(0, i - 70), i + 70))}`)
}
const show = (label, list) => {
  if (!list.length) return
  const i = list[0]
  console.log(`\nfirst unclosed ${label} at ${i}:`)
  console.log(JSON.stringify(s.slice(Math.max(0, i - 120), i + 180)))
}
show('{', openBraces)
show('[', openBrackets)
