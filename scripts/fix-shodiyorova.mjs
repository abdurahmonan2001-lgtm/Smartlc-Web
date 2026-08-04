// One-off: rebuild Shodiyorova Marjona's certificate image from the upright
// eTRF file (the scan variant was upside down) and re-apply the soft blur.
import { pdf } from "pdf-to-img";
import sharp from "sharp";
sharp.cache(false);

const SRC = "C:/Users/abdur/Desktop/SMART/App/SmartLC - new website/Student Results/7.0 Holders/53 - Shodiyorova Marjona - 25.01.2026 - etrf.pdf";
const OUT = "public/results/7.0/shodiyorova-marjona.webp";

const doc = await pdf(SRC, { scale: 3 });
let page;
for await (const p of doc) { page = p; break; }

const base = await sharp(page).rotate().resize({ width: 1600, withoutEnlargement: true }).toBuffer();
const { width, height } = await sharp(base).metadata();

const RECTS = [
  { x: 0.80, y: 0.145, w: 0.185, h: 0.050 },
  { x: 0.14, y: 0.308, w: 0.360, h: 0.057 },
  { x: 0.14, y: 0.360, w: 0.260, h: 0.065 },
  { x: 0.68, y: 0.788, w: 0.305, h: 0.084 },
];

const overlays = [];
for (const r of RECTS) {
  const left = Math.round(r.x * width), top = Math.round(r.y * height);
  const w = Math.round(r.w * width), h = Math.round(r.h * height);
  const tiny = await sharp(base).extract({ left, top, width: w, height: h })
    .resize(Math.max(12, Math.round(w / 14)), Math.max(6, Math.round(h / 6)), { fit: "fill" })
    .toBuffer();
  const region = await sharp(tiny).resize(w, h, { fit: "fill" }).blur(6).toBuffer();
  overlays.push({ input: region, left, top });
}
const out = await sharp(base).composite(overlays).webp({ quality: 78 }).toBuffer();
await sharp(out).toFile(OUT);
console.log("rebuilt", OUT, `${width}x${height}`);
