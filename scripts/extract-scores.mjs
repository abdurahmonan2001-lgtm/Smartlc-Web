// Pulls Listening/Reading/Writing/Speaking subscores out of the TRF PDFs'
// text layers (eTRFs have one; old scans don't) and merges them into
// src/data/results.json, matching entries by name slug.
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, extname, basename } from "node:path";

const SRC = "C:/Users/abdur/Desktop/SMART/App/SmartLC - new website/Student Results";
const BANDS = ["8.0 Holders", "7.5 Holders", "7.0 Holders"];
const MANIFEST = new URL("../src/data/results.json", import.meta.url);

const slugify = (s) =>
  s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parseName(file) {
  const stem = basename(file, extname(file));
  const m = stem.match(/^(\d+)\s*-\s*(.+?)(?:\s*-)?\s*(\d{2}\.\d{2}\.\d{4})?\s*(?:-?\s*\(?(?:etrf|trf|scan)\)?)?$/i);
  if (!m) return null;
  return m[2].replace(/\s+redo\s*$/i, "").replace(/\s*-\s*$/, "").trim();
}

async function scoresFrom(path) {
  try {
    const doc = await getDocument({ data: new Uint8Array(readFileSync(path)), useSystemFonts: true }).promise;
    const page = await doc.getPage(1);
    const items = (await page.getTextContent()).items
      .filter((i) => i.str.trim())
      .map((i) => ({ str: i.str.trim(), x: i.transform[4], y: i.transform[5] }));
    await doc.destroy();

    // values sit to the right of their skill label on (roughly) the same line
    const grab = (label) => {
      const lab = items.find((i) => new RegExp(`^${label}( Retake)?$`, "i").test(i.str));
      if (!lab) return null;
      const nums = items.filter(
        (i) => /^[0-9](\.[05])?$/.test(i.str) && Math.abs(i.y - lab.y) < 9 && i.x > lab.x
      );
      nums.sort((a, b) => a.x - b.x);
      return nums[0]?.str ?? null;
    };
    const fix = (v) => (v && !v.includes(".") ? `${v}.0` : v);
    const s = { l: fix(grab("Listening")), r: fix(grab("Reading")), w: fix(grab("Writing")), s: fix(grab("Speaking")) };
    return s.l && s.r && s.w && s.s ? s : null;
  } catch {
    return null;
  }
}

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const bySlug = new Map(manifest.map((r) => [r.img.split("/").pop().replace(".webp", ""), r]));

let found = 0, missing = 0;
for (const bandDir of BANDS) {
  for (const f of readdirSync(join(SRC, bandDir))) {
    if (extname(f).toLowerCase() !== ".pdf") continue;
    const name = parseName(f);
    if (!name) continue;
    const entry = bySlug.get(slugify(name));
    if (!entry || entry.scores) continue;
    const sc = await scoresFrom(join(SRC, bandDir, f));
    if (sc) { entry.scores = sc; found++; }
    else missing++;
  }
}

writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
console.log(`subscores: ${found} extracted, ${missing} PDFs without a readable text layer`);
