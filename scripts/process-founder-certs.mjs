// The four Test Report Forms behind the two claims in the hero:
// Speaking 9.0 twice, Writing 8.5 twice.
//
// A band score advertised without its certificate is just a number. These are
// published so a visitor can check the claim — and so can a competitor.
//
// REDACTION. Names, dates and scores stay visible; that is the point. What is
// removed is everything that could be used against him: candidate number,
// candidate ID, date of birth and the Test Report Form number. The TRF number
// plus a date is enough to look up a result on the verification service, so it
// is treated as sensitive even though it appears on the paper.
//
// The two layouts need different coordinates. The 2023 forms are the older
// printed stock with a compact header; the 2024-25 forms are the current
// digital layout, whose long NOTE block pushes every field down the page.
// Using one set of boxes for both leaves real data showing.
import { pdf } from "pdf-to-img";
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

sharp.cache(false);

const SRC = "C:/Users/abdur/Desktop/SMART/Certificates/Personal Results";
const OUT = fileURLToPath(new URL("../public/founder-certs/", import.meta.url));
mkdirSync(OUT, { recursive: true });

// Fractions of page width/height. Generous — a box that is slightly too big
// costs nothing, one slightly too small publishes an ID number.
const BOXES = {
  old: [
    { x: 0.780, y: 0.146, w: 0.175, h: 0.046 }, // candidate number
    { x: 0.155, y: 0.303, w: 0.330, h: 0.050 }, // candidate ID
    { x: 0.170, y: 0.352, w: 0.235, h: 0.050 }, // date of birth
    { x: 0.700, y: 0.795, w: 0.260, h: 0.052 }, // TRF number
  ],
  new: [
    { x: 0.795, y: 0.140, w: 0.195, h: 0.060 },
    { x: 0.135, y: 0.300, w: 0.370, h: 0.066 },
    { x: 0.135, y: 0.353, w: 0.270, h: 0.074 },
    { x: 0.650, y: 0.775, w: 0.335, h: 0.100 },
  ],
};

const CERTS = [
  { f: "8 - 03.06.2023 - 8.5.pdf", out: "speaking-9-jun2023", fmt: "old" },
  { f: "17 - 03.08.2025 - 8.5.pdf", out: "speaking-9-aug2025", fmt: "new" },
  { f: "9 - 03.09.2023 - 8.5.pdf", out: "writing-85-sep2023", fmt: "old" },
  { f: "13 - 03.09.2024 - 8.5.pdf", out: "writing-85-sep2024", fmt: "new" },
];

for (const { f, out, fmt } of CERTS) {
  let input;
  if (extname(f).toLowerCase() === ".pdf") {
    const doc = await pdf(join(SRC, f), { scale: 3 });
    for await (const page of doc) { input = page; break; }
  } else {
    input = join(SRC, f);
  }

  const base = await sharp(input).rotate().resize({ width: 1400, withoutEnlargement: true }).toBuffer();
  const { width, height } = await sharp(base).metadata();

  // Pixellate-then-blur rather than a solid block: it reads as a redaction
  // applied to a document rather than as a document with holes cut in it, and
  // it is just as irreversible.
  const overlays = [];
  for (const r of BOXES[fmt]) {
    const left = Math.round(r.x * width);
    const top = Math.round(r.y * height);
    const w = Math.round(r.w * width);
    const h = Math.round(r.h * height);
    const tiny = await sharp(base).extract({ left, top, width: w, height: h })
      .resize(Math.max(10, Math.round(w / 16)), Math.max(5, Math.round(h / 7)), { fit: "fill" })
      .toBuffer();
    overlays.push({ input: await sharp(tiny).resize(w, h, { fit: "fill" }).blur(7).toBuffer(), left, top });
  }

  const redacted = await sharp(base).composite(overlays).toBuffer();

  // Full size for the lightbox, and a card version for the grid.
  //
  // The card version is 760px, not 460px, because the hover magnifier reads
  // the rendered <img>'s own src and enlarges it 2.5x. A card shows the form
  // at roughly 270px, so the lens needs about 675px of real pixels behind it —
  // a 460px file would magnify into mush, which is the opposite of what a
  // magnifier is for.
  await sharp(redacted).webp({ quality: 78 }).toFile(OUT + out + ".webp");
  await sharp(redacted).resize({ width: 760 }).webp({ quality: 76 })
    .toFile(OUT + out + "-card.webp");
  console.log(`ok ${out} (${width}x${height}, ${fmt} layout)`);
}
