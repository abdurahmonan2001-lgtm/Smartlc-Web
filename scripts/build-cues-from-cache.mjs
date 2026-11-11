// Timings for the listening review, rebuilt from the recordings already on
// disk — no voice service is called.
//
// generate-neural-audio.mjs and generate-elevenlabs-audio.mjs both leave the
// ffmpeg concat list of every part they build in .neural-cache/ (nameN-sK.txt,
// and nameN-sK-el.txt for a part re-recorded with ElevenLabs). The list IS the
// recording, segment by segment, in order: silences (silence-*.mp3) and one
// file per spoken line of the part's $sK array in generate-nameN-audio.ps1.
// Adding up the segment lengths gives the moment each line starts. From that:
//
//   src/practice/line-cues.json   every line of transcripts.json, its start in
//                                 seconds: { "mock1-listening": [[t, t, …] ×4] }
//                                 — tap a line of the script, hear it
//   src/practice/audio-cues.json  for the MOCKS, each question's cue, matched
//                                 to its line exactly as generate-neural-audio
//                                 does for the practice sets (the evidence
//                                 quote, else the answer text)
//
// Mocks used to be left without question cues so a mock could be re-used
// across intakes: the cue map would index its answers. That was overruled — a
// mock opens in the mistake notebook like any other paper, answers and script
// included — so the cues only make that review usable.
//
//   node scripts/build-cues-from-cache.mjs [cache-dir]
//
// cache-dir defaults to this checkout's .neural-cache; a worktree passes the
// main folder's, where the recordings were made. A part whose list does not
// add up to its mp3 is skipped and reported, never guessed.
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const cacheDir = path.resolve(process.argv[2] || path.join(root, ".neural-cache"));
const audioDir = path.join(root, "public", "practice-audio");
const practiceDir = path.join(root, "src", "practice");
const cuesPath = path.join(practiceDir, "audio-cues.json");
const linesPath = path.join(practiceDir, "line-cues.json");
const EXPLAIN = JSON.parse(fs.readFileSync(path.join(practiceDir, "mock-explanations.json"), "utf8"));
const TRANSCRIPTS = JSON.parse(fs.readFileSync(path.join(practiceDir, "transcripts.json"), "utf8"));

const FFPROBE = (() => {
  try { execFileSync("ffprobe", ["-version"], { stdio: "ignore" }); return "ffprobe"; } catch { /* not on PATH */ }
  const winget = path.join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages");
  const hit = fs.readdirSync(winget).find((d) => d.startsWith("Gyan.FFmpeg"));
  if (!hit) throw new Error("ffprobe not found");
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isFile() && e.name === "ffprobe.exe") return p;
      if (e.isDirectory()) { const r = walk(p); if (r) return r; }
    }
    return null;
  };
  return walk(path.join(winget, hit));
})();
const durCache = new Map();
const durationOf = (file) => {
  if (!durCache.has(file)) {
    durCache.set(file, parseFloat(execFileSync(FFPROBE,
      ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString()));
  }
  return durCache.get(file);
};

// The same parsing and matching as generate-neural-audio.mjs.
function parseScript(ps1Path) {
  const src = fs.readFileSync(ps1Path, "utf8");
  const parts = [];
  const re = /\$s([1-4])\s*=\s*@\(([\s\S]*?)\n\)/g;
  let m;
  while ((m = re.exec(src))) {
    const lines = [];
    for (const lm of m[2].matchAll(/^\s*"((?:[^"]|"")*)"\s*,?\s*$/gm)) lines.push(lm[1].replace(/""/g, '"'));
    parts[Number(m[1]) - 1] = lines;
  }
  return parts;
}
const forSpeech = (text) => text.replace(/\b([A-Z]) - (?=[A-Z]\b)/g, "$1, ");
const normText = (s) => String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
function evidenceCore(ev) {
  const q = String(ev).match(/"([^"]{8,})"|“([^”]{8,})”/);
  return normText(q ? (q[1] || q[2]) : ev);
}
function cueQuestions(section, partIdx, lineStarts) {
  const cues = {};
  for (const q of section.questions) {
    const targets = [];
    if (q.evidence) targets.push(evidenceCore(q.evidence));
    for (const a of Array.isArray(q.answer) ? q.answer : [q.answer]) {
      if (a && String(a).length > 2) targets.push(normText(a));
    }
    let hit = null;
    for (const t of targets) {
      if (t.length < 3) continue;
      hit = lineStarts.find((l) => l.text.includes(t));
      if (hit) break;
    }
    if (hit) cues[q.n] = { p: partIdx + 1, t: Math.max(0, Math.round((hit.start - 3) * 10) / 10) };
  }
  return cues;
}

// The list the part's mp3 was last built from: the newer of the Edge and the
// ElevenLabs list.
function listFor(name, part) {
  const lists = [`${name}-s${part}.txt`, `${name}-s${part}-el.txt`]
    .map((f) => path.join(cacheDir, f)).filter((f) => fs.existsSync(f));
  if (!lists.length) return null;
  return lists.sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs)[0];
}
const isSilence = (s) => /[\\/]silence-[\d.]+\.mp3$/.test(s);

// Where each spoken line of one part starts, or a reason it cannot be known.
function lineStartsOf(name, p, script) {
  const list = listFor(name, p + 1);
  if (!list) return { why: "no concat list" };
  const segs = fs.readFileSync(list, "utf8").split(/\r?\n/).filter(Boolean)
    .map((l) => l.replace(/^file '/, "").replace(/'$/, "").replace(/'\\''/g, "'"));
  const spoken = script.filter((raw) => !/^P\|/.test(raw) && forSpeech(raw.slice(2).trim()));
  const voiced = segs.filter((s) => !isSilence(s));
  if (voiced.length !== spoken.length) return { why: `${voiced.length} recorded lines, ${spoken.length} in the script` };
  const starts = [];
  let offset = 0, v = 0;
  for (const s of segs) {
    if (!isSilence(s)) starts.push({ text: normText(forSpeech(spoken[v++].slice(2).trim())), start: offset });
    offset += durationOf(s);
  }
  // The list has to add up to the file students hear, or every time drifts.
  const mp3 = durationOf(path.join(audioDir, `${name}-s${p + 1}.mp3`));
  if (Math.abs(mp3 - offset) > 1.5) return { why: `list adds up to ${offset.toFixed(1)}s, the mp3 is ${mp3.toFixed(1)}s` };
  return { starts };
}

const names = [...new Set(fs.readdirSync(audioDir)
  .map((f) => (f.match(/^((?:mock|pset|upset)\d+)-s[1-4]\.mp3$/) || [])[1]).filter(Boolean))]
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));

const qCues = {};
const lineCues = {};
const problems = [];
for (const name of names) {
  const ps1 = path.join(root, "scripts", `generate-${name}-audio.ps1`);
  const transcript = TRANSCRIPTS[`${name}-listening`];
  if (!fs.existsSync(ps1) || !transcript) { problems.push(`${name}: no script or no transcript`); continue; }
  const parts = parseScript(ps1);
  const mock = /^mock\d+$/.test(name);
  let test = null;
  if (mock) {
    const k = name.slice(4);
    const raw = (await import(pathToFileURL(path.join(practiceDir, `${name}-listening.js`)).href))[`MOCK${k}_LISTENING`];
    // A mock's evidence quotes live in mock-explanations.json (content.js
    // merges them in at load); the paper file itself carries none.
    const extra = EXPLAIN[`${name}-listening`] || {};
    test = { ...raw, sections: raw.sections.map((s) => ({
      ...s, questions: s.questions.map((q) => ({ ...q, evidence: q.evidence || extra[q.n]?.evidence })),
    })) };
  }
  const testLines = [];
  const testCues = {};
  for (let p = 0; p < 4; p++) {
    const { starts, why } = lineStartsOf(name, p, parts[p] || []);
    if (!starts) { problems.push(`${name} part ${p + 1}: ${why}`); testLines.push(null); continue; }
    // Each transcript line is one spoken line (the announcer's are left out of
    // the transcript), so walk both in order, matching on the text.
    let at = 0;
    const times = (transcript[p] || []).map((l) => {
      const want = normText(l.t);
      const i = starts.findIndex((s, j) => j >= at && s.text === want);
      if (i < 0) return null;
      at = i + 1;
      return Math.round(starts[i].start * 10) / 10;
    });
    const missing = times.filter((t) => t == null).length;
    if (missing) problems.push(`${name} part ${p + 1}: ${missing} transcript line(s) not found in the recording`);
    testLines.push(times);
    if (test) Object.assign(testCues, cueQuestions(test.sections[p], p, starts));
  }
  lineCues[`${name}-listening`] = testLines;
  if (test) {
    qCues[`${name}-listening`] = testCues;
    console.log(`${name}: ${Object.keys(testCues).length}/40 questions located`);
  }
}

fs.writeFileSync(linesPath, JSON.stringify(lineCues));
const onDisk = fs.existsSync(cuesPath) ? JSON.parse(fs.readFileSync(cuesPath, "utf8")) : {};
fs.writeFileSync(cuesPath, JSON.stringify({ ...onDisk, ...qCues }));
console.log(`line cues for ${Object.keys(lineCues).length} papers`);
console.log(problems.length ? problems.join("\n") : "every part timed");
