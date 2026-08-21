// Measures the writing grader against scripts a real IELTS examiner has
// already banded.
//
// Why this exists: the marking is only worth anything if our 6 means what
// their 6 means. Without this file the only way to find out is to mark real
// students and hope, and the first measurement showed the grader was marking
// roughly two and a half bands low — which had already reached three students.
//
// The scripts are the official sample responses published by IELTS.org, with
// the band the examiner awarded. They are held in calibration-scripts.json
// next to this file. Four Academic scripts, bands 4 to 7.5.
//
// Usage:
//     node scripts/calibrate-writing.mjs
//
// The key is read from ANTHROPIC_API_KEY, either already in the environment
// or from the .env file beside package.json. .env is covered by .gitignore,
// so a key put there cannot be committed by accident — but it is a real
// secret sitting in a real file, so remove the line once the run is done.
//
// Pass one or more script ids to grade just those. To compare a rubric change
// against the version before it, run this, then `git stash` the change and run
// it again — the numbers are what settle the argument, not the reasoning that
// motivated the edit.
import fs from 'node:fs'
import path from 'node:path'
import { gradeTask } from '../api/mock-writing-grade.js'

const HERE = import.meta.dirname
const SET = JSON.parse(fs.readFileSync(path.join(HERE, 'calibration-scripts.json'), 'utf8'))

// Vite loads .env for the app, but a plain node script gets nothing, so read
// it here. Values may be quoted and may contain '=' (keys often do), hence the
// split on the FIRST '=' only.
const fromEnvFile = (name) => {
  for (const f of ['.env', '.env.local']) {
    const p = path.join(HERE, '..', f)
    if (!fs.existsSync(p)) continue
    for (const line of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
      const at = line.indexOf('=')
      if (at < 1 || line.trimStart().startsWith('#')) continue
      if (line.slice(0, at).trim() !== name) continue
      return line.slice(at + 1).trim().replace(/^["']|["']$/g, '')
    }
  }
  return ''
}

const key = process.env.ANTHROPIC_API_KEY || fromEnvFile('ANTHROPIC_API_KEY')
if (!key) {
  console.error('No ANTHROPIC_API_KEY found.')
  console.error('Add a line to the .env file next to package.json:')
  console.error('    ANTHROPIC_API_KEY=sk-ant-...')
  process.exit(2)
}
// Never print the key itself. A fingerprint is enough to tell two keys apart
// when one of them turns out to be the dead one — which has happened here.
console.log(`key ...${key.slice(-4)}, ${key.length} chars\n`)

// slice(2) drops the node binary and this script's own path. Without it the
// id filter matched nothing and the run graded zero scripts while reporting
// no failures — the quietest possible way to do nothing.
const only = process.argv.slice(2).filter((a) => !a.startsWith('--'))
const scripts = SET.filter((s) => !only.length || only.includes(s.id))
if (!scripts.length) { console.error('No scripts matched:', only.join(', ')); process.exit(2) }
console.log(`grading ${scripts.length} examiner-marked script(s)\n`)

const fmt = (n) => (n > 0 ? '+' : '') + n.toFixed(1)
const rows = []

// One at a time. These are long calls, and a parallel burst against the
// Anthropic API buys nothing here except a rate limit.
for (const s of scripts) {
  const started = Date.now()
  let g
  try {
    g = await gradeTask({ key, taskNo: s.task, prompt: s.prompt, answer: s.response, wordTarget: s.task === 1 ? 150 : 250 })
  } catch (e) {
    console.log(`${s.id.padEnd(9)} FAILED — ${String(e.message || e).slice(0, 120)}`)
    continue
  }
  const secs = Math.round((Date.now() - started) / 1000)
  const diff = g.band - s.officialBand
  rows.push({ id: s.id, task: s.task, official: s.officialBand, ours: g.band, diff, criteria: g.criteria, secs })
  console.log(
    `${s.id.padEnd(9)} Task ${s.task}  examiner ${String(s.officialBand).padStart(3)}  ours ${String(g.band).padStart(3)}`
    + `  diff ${fmt(diff).padStart(5)}  [${Object.values(g.criteria).join('/')}]  ${secs}s`,
  )
  // The band is the headline, but a criterion that is consistently wrong is
  // the thing to fix, so keep the evidence the grader gave for each one.
  if (g.reasons?.task?.descriptor) {
    for (const k of ['task', 'coherence', 'lexical', 'grammar']) {
      const r = g.reasons[k]
      if (r?.descriptor) console.log(`             ${k.padEnd(9)} ${g.criteria[k]} — ${r.descriptor.slice(0, 110)}`)
    }
  }
}

if (!rows.length) { console.log('\nNothing graded.'); process.exit(1) }

const d = rows.map((r) => r.diff)
const mean = d.reduce((a, b) => a + b, 0) / d.length
const abs = d.reduce((a, b) => a + Math.abs(b), 0) / d.length
console.log(`\n--- ${rows.length} examiner-marked scripts ---`)
console.log('mean difference       :', fmt(mean), mean < -0.25 ? '(we mark LOWER)' : mean > 0.25 ? '(we mark HIGHER)' : '(no material bias)')
console.log('mean absolute error   :', abs.toFixed(2), 'bands')
console.log('within 0.5 of examiner:', d.filter((x) => Math.abs(x) <= 0.5).length + '/' + d.length)
console.log('within 1.0 of examiner:', d.filter((x) => Math.abs(x) <= 1).length + '/' + d.length)

// Human examiners agree with each other within half a band most of the time.
// That is the bar worth aiming at, and it is worth printing the verdict
// rather than leaving four numbers to be interpreted charitably.
const good = Math.abs(mean) <= 0.5 && d.filter((x) => Math.abs(x) <= 1).length === d.length
console.log('\nverdict:', good
  ? 'usable — no systematic bias, every script within one band'
  : 'NOT yet usable — see the mean difference above; do not rely on these bands for students')

// What the deliberate round-down costs, separated from any error in judging.
// Smart LC floors each task band to the half rather than rounding, on purpose.
// It is worth knowing how much of any remaining gap is that rule rather than
// the grader misreading the script.
const rawAvg = rows.map((r) => Object.values(r.criteria).reduce((a, b) => a + b, 0) / 4)
const lossToFloor = rawAvg.map((v, i) => v - rows[i].ours).reduce((a, b) => a + b, 0) / rows.length
console.log(`\nround-down rule costs an average of ${lossToFloor.toFixed(2)} of a band (criteria average vs the floored band).`)

fs.writeFileSync(path.join(HERE, 'calibration-result.json'), JSON.stringify(rows, null, 2) + '\n')
console.log('per-script detail written to scripts/calibration-result.json')
