// Processes the founder portrait into public/brand/founder-*.webp.
//
// The source is a 640x640 studio shot on a dark grey backdrop. Two things
// are done to it:
//
//   1. A gentle tone lift. The original is dark enough that on a phone in
//      daylight the face loses detail; a small gamma/brightness nudge keeps
//      the mood while bringing the eyes back.
//   2. A background cool-down. The backdrop is neutral grey, and the hero it
//      sits in is racing green — untreated, the square reads as a grey patch
//      pasted onto the page. Tinting the darkest tones very slightly toward
//      the brand green makes the frame belong to the section. The subject is
//      unaffected: the tint is applied under the original at low opacity, so
//      only near-black backdrop pixels move.
//
// Native resolution is 640, so nothing is upscaled — the largest output is
// the source size and the layout displays it at ~420px, leaving ~1.5x for
// high-density screens.
import sharp from "sharp";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

sharp.cache(false);

const SRC = "C:/Users/abdur/Desktop/my photo.jpg";
const OUT = fileURLToPath(new URL("../public/brand/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const RACING = { r: 0, g: 43, b: 42 };

const graded = await sharp(SRC)
  .modulate({ brightness: 1.07, saturation: 1.06 })
  .linear(1.05, -6)                       // a touch more contrast
  .composite([{
    // A racing-green wash, multiplied in, so black backdrop -> dark green
    // while the lit side of the face barely moves.
    input: { create: { width: 640, height: 640, channels: 4, background: { ...RACING, alpha: 0.16 } } },
    blend: "colour-dodge",
  }])
  .toBuffer();

for (const size of [640, 420]) {
  const name = size === 640 ? "founder.webp" : "founder-sm.webp";
  await sharp(graded)
    .resize(size, size, { fit: "cover", kernel: "lanczos3" })
    .webp({ quality: 90, effort: 6 })
    .toFile(OUT + name);
  console.log("wrote", name, size + "px");
}

// A small square for the teacher card further down the page, where the
// portrait appears again at thumbnail size.
await sharp(graded)
  .resize(200, 200, { fit: "cover", kernel: "lanczos3" })
  .webp({ quality: 88, effort: 6 })
  .toFile(OUT + "founder-thumb.webp");
console.log("wrote founder-thumb.webp 200px");
