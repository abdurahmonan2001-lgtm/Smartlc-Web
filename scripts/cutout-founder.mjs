// Cuts the founder out of his studio backdrop so he stands on the page rather
// than sitting inside a rectangle.
//
// Two processes, deliberately. Segmentation runs in scripts/_seg.mjs on its
// own: loading onnxruntime's native addon in the same process as sharp's makes
// sharp fail to load its .node binary afterwards. Run:
//
//   node scripts/_seg.mjs      # writes .cutout-raw.png
//   node scripts/cutout-founder.mjs
//
// Segmentation is local — the photograph never leaves this machine. Only the
// model weights are fetched, once. This is a personal photograph, and sending
// it to a third-party "remove background" service to save a dependency would
// be a poor trade.
//
// ON RESOLUTION: the camera original is 640x640, and the subject occupies
// 446x601 of it. That is the ceiling. The 2x output below is a lanczos
// upscale, which is honest at the size the layout actually uses (~470px wide)
// but would not survive being displayed much larger.
import sharp from "sharp";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";

sharp.cache(false);

const RAW = fileURLToPath(new URL("../.cutout-raw.png", import.meta.url));
const OUT = fileURLToPath(new URL("../public/brand/", import.meta.url));

if (!existsSync(RAW)) {
  console.error("Missing .cutout-raw.png — run `node scripts/_seg.mjs` first.");
  process.exit(1);
}

// Trim the transparent margin so the figure fills its box. Without this he
// floats small inside a mostly empty square and every layout size has to
// guess where he actually is.
const trimmed = await sharp(RAW).trim({ threshold: 1 }).toBuffer();
const tm = await sharp(trimmed).metadata();
console.log("subject:", tm.width + "x" + tm.height);

// The same warm lift the framed version had, so he does not read as flat now
// that the backdrop's contrast is gone from behind him.
const graded = await sharp(trimmed)
  .modulate({ brightness: 1.06, saturation: 1.05 })
  .linear(1.04, -4)
  .toBuffer();

for (const [w, name] of [[900, "founder-cut.webp"], [520, "founder-cut-sm.webp"]]) {
  await sharp(graded)
    .resize({ width: w, kernel: "lanczos3" })
    .webp({ quality: 90, effort: 6, alphaQuality: 100 })
    .toFile(OUT + name);
  const m = await sharp(OUT + name).metadata();
  console.log("wrote brand/" + name, m.width + "x" + m.height);
}
