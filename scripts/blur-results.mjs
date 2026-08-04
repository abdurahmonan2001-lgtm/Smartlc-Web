// Pixelates private fields on the TRF images in public/results:
// candidate number, candidate ID (passport), date of birth, TRF number.
// Coordinates are normalized (fraction of width/height) against the
// standard TRF layout; per-file overrides handle odd phone photos.
// Run AFTER process-results.mjs. Safe to re-run (re-pixelating is a no-op visually).
import sharp from "sharp";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

sharp.cache(false);

const ROOT = fileURLToPath(new URL("../public/results/", import.meta.url));

const STANDARD = [
  { x: 0.80, y: 0.145, w: 0.185, h: 0.050 }, // candidate number (top right)
  { x: 0.14, y: 0.308, w: 0.360, h: 0.057 }, // candidate ID
  { x: 0.14, y: 0.360, w: 0.260, h: 0.065 }, // date of birth
  { x: 0.68, y: 0.788, w: 0.305, h: 0.084 }, // TRF number (bottom right)
];

const OVERRIDES = {
  "7.0/botir-safarov.webp": [
    { x: 0.80, y: 0.148, w: 0.185, h: 0.047 },
    { x: 0.13, y: 0.322, w: 0.370, h: 0.050 },
    { x: 0.13, y: 0.383, w: 0.250, h: 0.049 },
    { x: 0.68, y: 0.885, w: 0.305, h: 0.040 },
    { x: 0.005, y: 0.700, w: 0.555, h: 0.090 }, // retake comment lists TRF + candidate numbers
  ],
};

let done = 0;
for (const band of readdirSync(ROOT)) {
  for (const f of readdirSync(join(ROOT, band))) {
    const path = join(ROOT, band, f);
    const src = readFileSync(path);
    const { width, height } = await sharp(src).metadata();
    const rects = OVERRIDES[`${band}/${f}`] ?? STANDARD;

    const overlays = [];
    for (const r of rects) {
      const left = Math.round(r.x * width);
      const top = Math.round(r.y * height);
      const w = Math.round(r.w * width);
      const h = Math.round(r.h * height);
      // soft gaussian blur: unreadable but visually subtle — the region just
      // looks gently out of focus instead of showing harsh redaction blocks.
      // (downscale first so the blur is irreversible even at high sigma zoom)
      const tiny = await sharp(src).extract({ left, top, width: w, height: h })
        .resize(Math.max(12, Math.round(w / 14)), Math.max(6, Math.round(h / 6)), { fit: "fill" })
        .toBuffer();
      const region = await sharp(tiny)
        .resize(w, h, { fit: "fill" })
        .blur(6)
        .toBuffer();
      overlays.push({ input: region, left, top });
    }
    const out = await sharp(src).composite(overlays).webp({ quality: 78 }).toBuffer();
    writeFileSync(path, out);
    done++;
  }
}
console.log(`${done} certificates redacted`);
