// Builds the fixed backdrop images that sit behind the dark sections.
//
// A backdrop is not a photograph the visitor is meant to look at — it is
// depth behind text that must stay readable. So each one is darkened hard,
// blurred slightly and tinted toward racing green before it ever reaches the
// browser, rather than being covered with an overlay at runtime:
//
//   - Doing it here means the browser ships one small file instead of
//     compositing a full-screen overlay on every scroll frame.
//   - Blurring lets the sources (900px wide) cover a 1600px-wide band without
//     looking soft, because at this treatment there is no detail left to lose.
//   - Contrast against white text is fixed at build time, so no section can
//     accidentally ship unreadable copy if a photo is swapped later.
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

sharp.cache(false);

const PUB = fileURLToPath(new URL("../public/", import.meta.url));
const OUT = PUB + "backdrops/";
mkdirSync(OUT, { recursive: true });

const JOBS = [
  { src: "stories/traveller.webp", out: "opportunity.webp" },
  { src: "adv/classroom.webp", out: "classroom.webp" },
];

for (const { src, out } of JOBS) {
  // A racing-green wash composited OVER the photo, rather than sharp's
  // .tint(), which desaturates to grey first and throws away every trace of
  // the original colour — the result reads as a flat monochrome plate rather
  // than a photograph seen through green light.
  await sharp(PUB + src)
    .resize(1600, 900, { fit: "cover", kernel: "lanczos3" })
    .blur(5)
    .modulate({ brightness: 0.5, saturation: 0.62 })
    .composite([{
      input: { create: { width: 1600, height: 900, channels: 4,
                         background: { r: 0, g: 43, b: 42, alpha: 0.55 } } },
    }])
    .webp({ quality: 72, effort: 6 })
    .toFile(OUT + out);
  console.log("wrote backdrops/" + out);
}
