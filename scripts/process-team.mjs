// Processes the Team folder's IELTS certificates into public/team/*.webp:
// 1600px wide, with the same subtle gaussian redaction as the student wall
// (candidate number, candidate ID, DOB, TRF number — plus the retake
// comments box, which quotes the original TRF number). Names and photos
// stay visible: the team is public.
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

sharp.cache(false);

const SRC = "C:/Users/abdur/Desktop/SMART/App/SmartLC - new website/Team";
const OUT = fileURLToPath(new URL("../public/team/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const FILES = [
  { f: "Abdurakhmon Team.pdf", out: "abdurakhmon", comments: true },
  { f: "Fazilat Team.jpg", out: "fazilat", comments: true },
  { f: "Laylo Team.pdf", out: "laylo", comments: false },
  { f: "Sardorbek team.pdf", out: "sardorbek", comments: true },
  { f: "Turdaliyeva Mashxura Team.pdf", out: "mashxura", comments: false },
];

const BASE = [
  { x: 0.80, y: 0.145, w: 0.185, h: 0.055 }, // candidate number (top right)
  { x: 0.14, y: 0.305, w: 0.36, h: 0.062 }, // candidate ID
  { x: 0.14, y: 0.358, w: 0.26, h: 0.07 }, // date of birth
  { x: 0.66, y: 0.78, w: 0.325, h: 0.095 }, // TRF number (bottom right)
];
const COMMENTS = { x: 0.025, y: 0.655, w: 0.545, h: 0.115 }; // retake comments quote the original TRF no.

for (const { f, out, comments } of FILES) {
  let input;
  if (extname(f).toLowerCase() === ".pdf") {
    const doc = await pdf(join(SRC, f), { scale: 3 });
    for await (const page of doc) { input = page; break; }
  } else {
    input = join(SRC, f);
  }
  const base = await sharp(input).rotate().resize({ width: 1600, withoutEnlargement: true }).toBuffer();
  const { width, height } = await sharp(base).metadata();

  const rects = comments ? [...BASE, COMMENTS] : BASE;
  const overlays = [];
  for (const r of rects) {
    const left = Math.round(r.x * width);
    const top = Math.round(r.y * height);
    const w = Math.round(r.w * width);
    const h = Math.round(r.h * height);
    const tiny = await sharp(base).extract({ left, top, width: w, height: h })
      .resize(Math.max(12, Math.round(w / 14)), Math.max(6, Math.round(h / 6)), { fit: "fill" })
      .toBuffer();
    const region = await sharp(tiny).resize(w, h, { fit: "fill" }).blur(6).toBuffer();
    overlays.push({ input: region, left, top });
  }
  await sharp(base).composite(overlays).webp({ quality: 78 }).toFile(join(OUT, `${out}.webp`));
  console.log(`ok ${out} (${width}x${height})`);
}
