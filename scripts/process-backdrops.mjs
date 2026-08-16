// Builds the single photograph that sits behind the entire site.
//
// Source: Harvard Yard, by Somesh Kesarla Suresh on Unsplash
//   https://unsplash.com/photos/photo-1622397333309-3056849bc70b
// The Unsplash License permits commercial use with no attribution required.
// Downloaded once with the owner's permission; the treated output is committed
// and the original is not, so this script needs the source only if the
// treatment is ever changed.
//
// WHY THE TREATMENT IS SO HEAVY
// This backdrop sits behind a LIGHT page: white cards, dark-green body text.
// The photograph is not there to be looked at — it is there to stop the page
// reading as flat panels stacked on a flat colour. So it is:
//
//   - lightened hard, so black text keeps its contrast anywhere on the page;
//   - desaturated, because Harvard's red brick fights the emerald brand
//     colours badly at full saturation;
//   - washed toward racing green, so what remains belongs to the palette;
//   - blurred, which both removes distracting detail and lets one image cover
//     a very wide viewport without looking soft.
//
// Doing all of it here rather than with CSS filters matters: a filter on a
// full-screen fixed layer is recomposited on every scroll frame, which is
// exactly the juddering this is meant to avoid.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { mkdirSync, existsSync } from "node:fs";

sharp.cache(false);

const SRC = "C:/Users/abdur/AppData/Local/Temp/claude/C--Users-abdur-Desktop-Sales/"
  + "c5ff9da2-bfe5-42dd-bba5-2b34f132b838/scratchpad/harvard-src.jpg";
const OUT = fileURLToPath(new URL("../public/backdrops/", import.meta.url));
mkdirSync(OUT, { recursive: true });

if (!existsSync(SRC)) {
  console.error("Source photograph not found. Re-download it with:\n"
    + '  curl -L "https://images.unsplash.com/photo-1622397333309-3056849bc70b'
    + '?w=2400&q=85&fm=jpg&fit=max" -o "' + SRC + '"');
  process.exit(1);
}

// Two widths. A phone never needs the 2000px plate, and this backdrop is the
// single largest image on the page.
const SIZES = [
  { w: 2000, h: 1250, out: "site.webp", quality: 68 },
  { w: 1000, h: 900, out: "site-sm.webp", quality: 66 },
];

for (const { w, h, out, quality } of SIZES) {
  await sharp(SRC)
    .resize(w, h, { fit: "cover", position: "centre", kernel: "lanczos3" })
    .blur(w > 1200 ? 4 : 2.5)
    .modulate({ brightness: 1.1, saturation: 0.34 })
    .linear(0.86, 24)                       // flatten contrast, lift the floor
    .composite([{
      input: { create: { width: w, height: h, channels: 4,
                         background: { r: 228, g: 240, b: 237, alpha: 0.3 } } },
    }])
    .webp({ quality, effort: 6 })
    .toFile(OUT + out);
  console.log("wrote backdrops/" + out, `${w}x${h}`);
}
