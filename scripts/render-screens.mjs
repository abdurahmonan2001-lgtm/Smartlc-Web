// Renders the three end-of-paper screens to a single standalone HTML file,
// using the real components and the real stylesheet. Nothing here is
// hand-written markup, so what comes out is what a student sees.
import fs from 'node:fs'
import { createServer } from 'vite'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'

const ROOT = 'C:/Users/abdur/Desktop/SMART/App/SmartLC - new website/website'
const OUT = 'C:/Users/abdur/Desktop/SMART/App/SmartLC - new website/student-end-screens.html'

// ResultView opens a shared audio element for the listen-from-here buttons.
// Node has no Audio, and a useState initialiser runs even under static
// rendering, so it needs a stand-in or the render throws.
globalThis.Audio = class { constructor() { this.currentTime = 0 } play() { return Promise.resolve() } pause() {} addEventListener() {} removeEventListener() {} }

const server = await createServer({ root: ROOT, server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' })
const { MockResultView, ResultView, WritingFeedback } = await server.ssrLoadModule('/src/practice/PracticeApp.jsx')
const { getTest } = await server.ssrLoadModule('/src/practice/content.js')
const data = JSON.parse(fs.readFileSync(new URL('./screens-data.json', import.meta.url), 'utf8'))

// A real practice paper, so the review shows genuine questions and genuine
// explanations rather than invented ones.
const test = getTest('pset1-reading')
const key = {}
for (const s of test.sections) for (const q of s.questions) key[q.n] = Array.isArray(q.answer) ? q.answer[0] : q.answer
const answers = { ...key, ...data.wrongAnswers }

// A finished mock, built from the paper's own key so the review below shows
// real questions and real explanations rather than invented ones.
const mockR = getTest('mock1-reading')
const mockL = getTest('mock1-listening')
const sheet = (t, wrong) => {
  const a = {}
  for (const sec of t.sections) {
    for (const q of sec.questions) {
      if (q.type === 'essay') continue
      a[q.n] = Array.isArray(q.answer) ? q.answer[0] : q.answer
    }
  }
  for (const n of wrong) a[n] = 'WRONG'
  const total = Object.keys(a).length
  return { test_id: t.id, raw_score: total - wrong.length, total, band: 7, duration_seconds: 3300, saved: true, answers: a }
}

const h = React.createElement
const frame = (n, title, note, node) => `
  <section class="shot">
    <div class="shot__bar">
      <div class="shot__n">Screen ${n}</div>
      <div class="shot__t">${title}</div>
      <div class="shot__note">${note}</div>
    </div>
    <div class="shot__body">${renderToStaticMarkup(node)}</div>
  </section>`

const body = [
  frame(1, 'After a practice paper',
    'Score, band and time — then every question the student got wrong, with the reason and the line of the passage it came from.',
    h(ResultView, { result: { ...data.practiceResult, answers }, test, onBack() {} })),
  frame(2, 'After a full mock',
    'All three papers on one card. The writing band appears here too — this is the screen that used to say only “sent to your teacher”.',
    h(MockResultView, { outcome: { ...data.mockOutcome, marked: data.marked }, onBack() {} })),
  frame(3, 'The writing feedback',
    'Opens from either screen above: the band, the four criteria, the essay with every mistake marked on it, and how to fix each one.',
    h(WritingFeedback, { band: data.marked.band, feedback: data.marked.feedback, onClose() {} })),
  frame(4, 'A finished mock — reading',
    'The passage on one side, the questions on the other. Each answer is highlighted where it appears in the text, numbered by question. Mock papers used to be sealed here entirely.',
    h(ResultView, { result: sheet(mockR, [1, 14, 21]), test: mockR, onBack() {} })),
  frame(5, 'A finished mock — listening',
    'The same division for listening: the recording script beside the questions, with the line each answer came from marked and numbered.',
    h(ResultView, { result: sheet(mockL, [3, 15, 31]), test: mockL, onBack() {} })),
].join('\n')

const css = fs.readFileSync(ROOT + '/src/index.css', 'utf8')
fs.writeFileSync(OUT, `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>What students see after a paper — Smart LC practice platform</title>
<style>${css}</style>
<style>
  body { background:#eef2f6; margin:0; padding:28px 16px 60px; }
  .wrap { max-width: 1000px; margin: 0 auto; }
  .lead { font: 15px/1.6 system-ui, sans-serif; color:#334155; background:#fff; border:1px solid #dbe3ec;
          border-radius:14px; padding:18px 20px; margin:0 0 28px; }
  .lead h1 { font-size:20px; margin:0 0 8px; color:#0f172a; }
  .shot { margin: 0 0 44px; box-shadow: 0 10px 30px rgba(15,23,42,.08); border-radius:14px; }
  .shot__bar { background:#0f172a; color:#fff; padding:14px 18px; border-radius:14px 14px 0 0;
               font-family: system-ui, sans-serif; }
  .shot__n { font-size:11.5px; letter-spacing:.09em; text-transform:uppercase; opacity:.55; }
  .shot__t { font-size:18px; font-weight:700; margin-top:2px; }
  .shot__note { font-size:13.5px; opacity:.82; margin-top:5px; line-height:1.5; }
  .shot__body { background:#fff; border:1px solid #dbe3ec; border-top:0;
                border-radius:0 0 14px 14px; padding:20px; }
  /* The feedback panel is a modal in the app; show it flat so it can be read here. */
  .shot__body .pr-fb { position:static; background:none; padding:0; display:block; }
  .shot__body .pr-fb__panel { max-height:none; box-shadow:none; }
</style>
</head><body><div class="wrap">
<div class="lead"><h1>What a student sees when a paper is finished</h1>
Rendered from the live components and the live stylesheet, with one real practice paper
(Practice Set 1 — Reading) and a sample writing script. This is the actual screen, not a mock-up.</div>
${body}
</div></body></html>
`)
await server.close()
console.log('wrote', OUT, '—', (fs.statSync(OUT).size / 1024).toFixed(0) + ' KB')
