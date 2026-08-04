// Prepares advantage-carousel images: converts the downloaded Unsplash
// photos to webp and builds a collage from three of our own certificates.
import sharp from "sharp";

import { existsSync } from "node:fs";
for (const name of ["oxford", "classroom", "parent"]) {
  if (!existsSync(`public/adv/${name}.jpg`)) continue; // already converted earlier
  await sharp(`public/adv/${name}.jpg`)
    .resize({ width: 900, height: 620, fit: "cover" })
    .webp({ quality: 74 })
    .toFile(`public/adv/${name}.webp`);
}

// certificate collage: top halves of three 8.0 certs side by side
const certs = [
  "public/results/8.0/egamova-farangis.webp",
  "public/results/8.0/aziza-abduvaliyeva.webp",
  "public/results/8.0/mansurov-shodiyorbek.webp",
];
const W = 300, H = 620;
const strips = [];
for (let i = 0; i < certs.length; i++) {
  strips.push({
    input: await sharp(certs[i]).resize({ width: W, height: H, fit: "cover", position: "top" }).toBuffer(),
    left: i * W,
    top: 0,
  });
}
await sharp({ create: { width: W * 3, height: H, channels: 3, background: "#fff" } })
  .composite(strips)
  .webp({ quality: 74 })
  .toFile("public/adv/results.webp");

console.log("adv images ready");
