// Swaps the small-classes, every-day and Oxford card photos (teen-focused set)
// and stamps an OXFORD wordmark onto the Oxford card photo.
import sharp from "sharp";

const T = process.env.TEMP;

// small classes: teacher presenting at whiteboard/screen to teenage class
await sharp(`${T}/wb1.jpg`)
  .resize({ width: 900, height: 620, fit: "cover" })
  .webp({ quality: 76 })
  .toFile("public/adv/classroom.webp");

// english every day: tutor working one-on-one with a teenage student
await sharp(`${T}/ed2.jpg`)
  .resize({ width: 900, height: 560, fit: "cover" })
  .webp({ quality: 76 })
  .toFile("public/adv/tutor.webp");

// oxford: teen student in library + OXFORD wordmark
const label = Buffer.from(
  `<svg width="900" height="620">
     <text x="40" y="560" font-family="Georgia, serif" font-size="92" font-weight="bold"
       fill="#ffffff" opacity="0.96">OXFORD</text>
     <rect x="44" y="578" width="330" height="6" fill="#d4a843"/>
   </svg>`
);
await sharp(`${T}/ox1.jpg`)
  .resize({ width: 900, height: 620, fit: "cover" })
  .composite([{ input: label, left: 0, top: 0 }])
  .webp({ quality: 76 })
  .toFile("public/adv/oxford.webp");

console.log("classroom, tutor and oxford images updated (teen set)");
