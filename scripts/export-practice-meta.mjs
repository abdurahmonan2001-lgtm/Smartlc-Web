// Exports a compact map of the practice platform's tests for the
// StaffApp's teacher dashboard: test id → title, module and per-question
// {type, correct answer, short prompt}. The StaffApp lives in a separate
// repo with no access to this one's content modules, and its audience is
// teachers, so shipping the answer keys there is the point — it is what
// lets a teacher see WHICH questions a student missed, not just a score.
//
// Writing papers carry no key (teacher-marked) and are skipped; the
// dashboard labels their results from the test id alone.
//
//   node scripts/export-practice-meta.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dest = path.join(root, "..", "..", "StaffApp-main", "StaffApp-main", "src", "practice-meta.json");

const meta = {};
const load = async (file, exportName) =>
  (await import(pathToFileURL(path.join(root, "src", "practice", file)).href))[exportName];

import { listeningChunks, readingChunks } from "../src/practice/upper.js";
import fsSync from "node:fs";

const names = [
  ...Array.from({ length: 12 }, (_, i) => `mock${i + 1}`),
  ...Array.from({ length: 5 }, (_, i) => `pset${i + 1}`),
  ...Array.from({ length: 14 }, (_, i) => `upset${i + 1}`),
];
const add = (t) => {
  const questions = {};
  for (const s of t.sections) {
    for (const q of s.questions) {
      if (q.type === "essay") continue;
      questions[q.n] = {
        type: q.type,
        correct: Array.isArray(q.answer) ? q.answer[0] : q.answer,
        prompt: String(q.prompt || `${s.title} — Q${q.n}`).slice(0, 90),
      };
    }
  }
  meta[t.id] = { title: t.title, module: t.module, questions };
};
for (const name of names) {
  for (const mod of ["listening", "reading"]) {
    const file = path.join(root, "src", "practice", `${name}-${mod}.js`);
    if (!fsSync.existsSync(file)) continue;   // upsets appear as they are authored
    const t = await load(`${name}-${mod}.js`, `${name.toUpperCase()}_${mod.toUpperCase()}`);
    add(t);
    // Upper-Inter sets are sat in thirds, so their results reference the
    // chunk ids — the dashboard needs those rows too.
    if (/^upset/.test(name)) {
      for (const c of mod === "listening" ? listeningChunks(t) : readingChunks(t)) add(c);
    }
  }
}

fs.writeFileSync(dest, JSON.stringify(meta));
console.log(`wrote ${dest} (${Math.round(fs.statSync(dest).size / 1024)} KB, ${Object.keys(meta).length} tests)`);
