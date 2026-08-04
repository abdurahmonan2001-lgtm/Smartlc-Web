import sharp from "sharp";
import { mkdirSync } from "node:fs";

const src = "C:/Users/abdur/Desktop/SMART/App/SmartLC - new website/Smart Logo/Logo icon.png";
mkdirSync("public/brand", { recursive: true });

const m = await sharp(src).metadata();
console.log("alpha:", m.hasAlpha, `${m.width}x${m.height}`);

const t = await sharp(src).trim().toBuffer({ resolveWithObject: true });
console.log("trimmed:", `${t.info.width}x${t.info.height}`);

const size = 512;
const radius = Math.round(size * 0.225);
const mask = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}"/></svg>`);
await sharp(t.data)
  .resize(size, size, { fit: "cover" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toFile("public/brand/icon.png");
await sharp("public/brand/icon.png").resize(96, 96).png().toFile("public/brand/icon-96.png");
console.log("icons written");
