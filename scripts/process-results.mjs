// Converts the Student Results TRF scans (PDF/JPG/PNG) into optimized
// web images and writes a manifest the site renders the score wall from.
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { readdirSync, mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const SRC = "C:/Users/abdur/Desktop/SMART/App/SmartLC - new website/Student Results";
const OUT = fileURLToPath(new URL("../public/results/", import.meta.url));
const BANDS = ["8.0 Holders", "7.5 Holders", "7.0 Holders"];

// keep the L/R/W/S subscores that extract-scores.mjs / scores-manual.json
// already merged into the manifest — re-running this script must not drop them
const MANIFEST_PATH = fileURLToPath(new URL("../src/data/results.json", import.meta.url));
const prevScores = new Map(
  existsSync(MANIFEST_PATH)
    ? JSON.parse(readFileSync(MANIFEST_PATH, "utf8")).filter((r) => r.scores).map((r) => [r.img, r.scores])
    : []
);

const manifest = [];

function parseName(file) {
  // "12 - Nuraliyev Javohirbek - 08.12.2022.pdf" with variants:
  // missing second dash, "redo", "(etrf)", "- etrf", "- scan" suffixes
  const stem = basename(file, extname(file));
  const m = stem.match(/^(\d+)\s*-\s*(.+?)(?:\s*-)?\s*(\d{2}\.\d{2}\.\d{4})?\s*(?:-?\s*\(?(?:etrf|trf|scan)\)?)?$/i);
  if (!m) return { idx: 999, name: stem, date: null };
  const name = m[2].replace(/\s+redo\s*$/i, "").replace(/\s*-\s*$/, "").trim();
  return { idx: Number(m[1]), name, date: m[3] ?? null, isEtrf: /etrf/i.test(stem) };
}

for (const bandDir of BANDS) {
  const band = bandDir.split(" ")[0]; // "8.0"
  const files = readdirSync(join(SRC, bandDir)).filter(f => /\.(pdf|jpe?g|png)$/i.test(f));

  // dedupe by index number, preferring a real scan over the electronic TRF
  const byIdx = new Map();
  for (const f of files) {
    const meta = parseName(f);
    const existing = byIdx.get(meta.idx);
    if (!existing || (existing.meta.isEtrf && !meta.isEtrf)) byIdx.set(meta.idx, { f, meta });
  }

  const outDir = join(OUT, band);
  mkdirSync(outDir, { recursive: true });

  for (const { f, meta } of [...byIdx.values()].sort((a, b) => b.meta.idx - a.meta.idx)) {
    const slug = meta.name.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const outFile = join(outDir, `${slug}.webp`);
    try {
      let input;
      if (extname(f).toLowerCase() === ".pdf") {
        // scale 3 ≈ 1790px wide — text must stay legible under the 2.4x
        // magnifier lens, so render high and downsize only slightly
        const doc = await pdf(join(SRC, bandDir, f), { scale: 3 });
        for await (const page of doc) { input = page; break; } // first page only
      } else {
        input = join(SRC, bandDir, f);
      }
      await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 76 }).toFile(outFile);
      const img = `/results/${band}/${slug}.webp`;
      const scores = prevScores.get(img);
      manifest.push({ name: meta.name, band, date: meta.date, img, ...(scores ? { scores } : {}) });
      console.log(`ok  ${band}  ${meta.name}`);
    } catch (e) {
      console.error(`FAIL ${band} ${f}: ${e.message}`);
    }
  }
}

writeFileSync(new URL("../src/data/results.json", import.meta.url), JSON.stringify(manifest, null, 2));
console.log(`\n${manifest.length} results written to manifest`);
