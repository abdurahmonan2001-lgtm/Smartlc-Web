// Builds contact sheets of the "Test Results" strip from every certificate
// still missing subscores, so they can be transcribed by eye in bulk.
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const MANIFEST = new URL("../src/data/results.json", import.meta.url);
const OUT = fileURLToPath(new URL("./sheets/", import.meta.url));
mkdirSync(OUT, { recursive: true });

const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
const missing = manifest.filter((r) => !r.scores);

const STRIP_W = 760, LABEL_W = 210, ROW_H = 96, PER_SHEET = 12;

async function strip(entry) {
  const path = fileURLToPath(new URL(`../public${entry.img}`, import.meta.url));
  const img = sharp(path);
  const { width, height } = await img.metadata();
  const top = Math.round(height * 0.55);
  const h = Math.round(height * 0.115);
  return sharp(path)
    .extract({ left: 0, top, width, height: h })
    .resize({ width: STRIP_W, height: ROW_H, fit: "fill" })
    .toBuffer();
}

let sheet = 0;
for (let i = 0; i < missing.length; i += PER_SHEET) {
  const batch = missing.slice(i, i + PER_SHEET);
  const overlays = [];
  for (let j = 0; j < batch.length; j++) {
    const slug = batch[j].img.split("/").pop().replace(".webp", "");
    overlays.push({ input: await strip(batch[j]), left: LABEL_W, top: j * ROW_H });
    const label = Buffer.from(
      `<svg width="${LABEL_W}" height="${ROW_H}"><rect width="100%" height="100%" fill="#0a4d49"/><text x="8" y="${ROW_H / 2 - 6}" fill="#fff" font-family="Arial" font-size="15" font-weight="bold">${batch[j].band} · ${slug.slice(0, 22)}</text><text x="8" y="${ROW_H / 2 + 16}" fill="#9fd" font-family="Arial" font-size="13">${slug.slice(22) || ""}</text></svg>`
    );
    overlays.push({ input: label, left: 0, top: j * ROW_H });
  }
  sheet++;
  await sharp({ create: { width: LABEL_W + STRIP_W, height: batch.length * ROW_H, channels: 3, background: "#fff" } })
    .composite(overlays)
    .png()
    .toFile(`${OUT}sheet-${sheet}.png`);
}
writeFileSync(`${OUT}slugs.json`, JSON.stringify(missing.map((r) => r.img.split("/").pop().replace(".webp", ""))));
console.log(`${missing.length} strips across ${sheet} sheets in scripts/sheets/`);
