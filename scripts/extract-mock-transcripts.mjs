// Pulls the twelve mock listening transcripts out of the audio-generation
// scripts and into transcripts.json, in the shape the app already uses for the
// practice sets: one array per part, each entry {s: speaker, t: line}.
//
// The scripts are the only place the spoken words exist — the recordings were
// generated straight from them — so this is the source of truth, not a
// re-transcription of the audio.
//
// The announcer is dropped. "Now listen carefully and answer questions one to
// five" is part of sitting the exam; it is noise when you are reading the
// script afterwards to find where an answer came from.
import fs from 'node:fs'
import path from 'node:path'

const HERE = import.meta.dirname
const OUT = path.join(HERE, '..', 'src', 'practice', 'transcripts.json')

const ANNOUNCER = [
  /^You will hear a number of different recordings/i,
  /^Part (one|two|three|four)\b/i,
  /^Now listen (carefully )?and answer questions/i,
  /^Before you hear the rest/i,
  /^Before we (walk|set off|start)/i,
  /^That is the end of part/i,
  /^You now have (half a minute|some time)/i,
  /^First, you have some time to look at questions/i,
  /^Before I describe the plans in detail/i,
  /^Now let me take you round/i,
]
const isAnnouncer = (t) => ANNOUNCER.some((re) => re.test(t.trim()))

// F is the female voice and M the male one. The existing transcripts label
// speakers A and B, so keep that rather than inventing a second convention.
const SPEAKER = { F: 'A', M: 'B' }

const transcripts = JSON.parse(fs.readFileSync(OUT, 'utf8'))
let added = 0, lines = 0

for (let n = 1; n <= 12; n++) {
  const file = path.join(HERE, `generate-mock${n}-audio.ps1`)
  if (!fs.existsSync(file)) { console.log(`mock${n}: no audio script — skipped`); continue }
  const src = fs.readFileSync(file, 'utf8')

  // Each part is a PowerShell array literal `$sN = @( ... )`; take them in order.
  const parts = []
  for (const m of src.matchAll(/\$s(\d)\s*=\s*@\(([\s\S]*?)^\)/gm)) {
    const body = m[2]
    const spoken = []
    for (const line of body.split(/\r?\n/)) {
      const hit = line.match(/^\s*"([FM])\|([\s\S]*?)",?\s*$/)
      if (!hit) continue
      const text = hit[2].replace(/""/g, '"').trim()
      if (!text || isAnnouncer(text)) continue
      spoken.push({ s: SPEAKER[hit[1]] || 'A', t: text })
    }
    parts.push(spoken)
  }
  if (parts.length !== 4) { console.log(`mock${n}: found ${parts.length} parts, expected 4 — skipped`); continue }

  transcripts[`mock${n}-listening`] = parts
  added++
  lines += parts.reduce((a, p) => a + p.length, 0)
  console.log(`mock${n}-listening: ${parts.map((p) => p.length).join(' + ')} = ${parts.reduce((a, p) => a + p.length, 0)} lines`)
}

fs.writeFileSync(OUT, JSON.stringify(transcripts, null, 1) + '\n')
console.log(`\n${added} transcripts written, ${lines} spoken lines. transcripts.json now holds ${Object.keys(transcripts).length} papers.`)
