// Builds src/practice/transcripts.json from the practice sets' recording
// scripts, so the player can show a transcript after a listening paper.
//
// PRACTICE SETS ONLY, and deliberately so: everything in this JSON ships
// inside the public bundle, and a mock's transcript contains its answers
// - including it would unseal the one-attempt exams for anyone who can
// open the browser's dev tools. Mock scripts stay server-side files.
//
// The announcer's framing lines and the P| pauses are dropped: the
// transcript is for studying what the speakers said, not replaying the
// exam mechanics. Speaker tags map to neutral labels.
//
//   node scripts/extract-transcripts.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const isAnnouncer = (text) =>
  /^Part (one|two|three|four)[.,]/i.test(text) ||
  /^(Now listen|Before you hear|You now have|That is the end)/i.test(text);

const out = {};
const NAMES = [...Array.from({ length: 20 }, (_, i) => `pset${i + 1}`), ...Array.from({ length: 14 }, (_, i) => `upset${i + 1}`)];
for (const name of NAMES) {
  const p1 = path.join(root, "scripts", `generate-${name}-audio.ps1`);
  if (!fs.existsSync(p1)) continue;
  const src = fs.readFileSync(p1, "utf8");
  const parts = [];
  const re = /\$s([1-4])\s*=\s*@\(([\s\S]*?)\n\)/g;
  let m;
  while ((m = re.exec(src))) {
    const lines = [];
    for (const lm of m[2].matchAll(/^\s*"((?:[^"]|"")*)"\s*,?\s*$/gm)) {
      const raw = lm[1].replace(/""/g, '"');
      if (/^P\|/.test(raw)) continue;
      const tag = raw.slice(0, 2);
      const text = raw.slice(2).trim();
      if (!text || isAnnouncer(text)) continue;
      lines.push({ s: tag === "F|" ? "A" : "B", t: text });
    }
    parts[Number(m[1]) - 1] = lines;
  }
  out[`${name}-listening`] = parts;
}

const dest = path.join(root, "src", "practice", "transcripts.json");
fs.writeFileSync(dest, JSON.stringify(out));
const kb = Math.round(fs.statSync(dest).size / 1024);
console.log(`wrote ${dest} (${kb} KB, ${Object.keys(out).length} tests)`);
