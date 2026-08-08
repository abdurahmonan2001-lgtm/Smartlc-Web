// Extracts Task 1 + Task 2 QUESTIONS (never the model essays) from the
// "0 - FULL ORDER" writing collection, plus each day's chart image, into:
//   src/practice/writing-bank.json      (prompts + metadata)
//   public/practice-img/writing/dayN.*  (the task-1 visual, largest image)
// Run: node scripts/extract-writing-bank.mjs "<folder with WORD docx files>"
import { execSync } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync, mkdirSync, statSync, copyFileSync, rmSync } from "node:fs";
import { join, basename } from "node:path";
import { tmpdir } from "node:os";

const src = process.argv[2];
const outImg = "public/practice-img/writing";
mkdirSync(outImg, { recursive: true });

const clean = (s) => s
  .replace(/^[\d-]+(?=[A-Z])/g, "")           // strip textbox position junk like "4648200-560070"
  .replace(/\s+/g, " ")
  .trim();

const bank = [];
for (const f of readdirSync(src).filter((x) => x.endsWith(".docx") && !x.startsWith("~"))) {
  const m = basename(f).match(/^Day (\d+) - (.+?) \+ (.+?)\.docx$/i);
  if (!m) { console.log("skip (name):", f); continue; }
  const day = +m[1], t1Type = m[2].trim(), t2Type = m[3].trim();

  const tmp = join(tmpdir(), "wb-" + day);
  rmSync(tmp, { recursive: true, force: true });
  execSync(`unzip -o -q "${join(src, f)}" -d "${tmp}"`);

  const xml = readFileSync(join(tmp, "word/document.xml"), "utf8");
  const paras = xml.split(/<w:p[ >]/).map((p) =>
    [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map((t) => t[1]).join("")
      .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'")
  ).map(clean).filter(Boolean);

  const grab = (startRe, endRe) => {
    const out = [];
    let on = false;
    for (const p of paras) {
      if (!on && startRe.test(p)) { on = true; continue; }
      if (on) {
        if (endRe.test(p)) break;
        if (/^(WRITING TASK|Write about the following topic)/i.test(p)) continue;
        // never carry model-essay content
        if (/^(Task [12]|Chatgpt|ChatGPT|Word count)/i.test(p)) break;
        out.push(p);
      }
    }
    return out.join("\n\n");
  };

  const t1 = grab(/^You should spend about 20 minutes/i, /^Write at least 150 words/i);
  const t2 = grab(/^You should spend about 40 minutes/i, /^Write at least 250 words/i);

  // largest media file = the chart
  let img = null;
  try {
    const media = readdirSync(join(tmp, "word/media"))
      .map((x) => ({ x, size: statSync(join(tmp, "word/media", x)).size }))
      .sort((a, b) => b.size - a.size);
    if (media.length) {
      const ext = media[0].x.split(".").pop().toLowerCase();
      img = `day${day}.${ext}`;
      copyFileSync(join(tmp, "word/media", media[0].x), join(outImg, img));
    }
  } catch {}

  rmSync(tmp, { recursive: true, force: true });
  if (!t1 || !t2) { console.log(`day ${day}: MISSING ${!t1 ? "T1" : ""} ${!t2 ? "T2" : ""}`); }
  bank.push({ day, t1Type, t2Type, t1, t2, image: img ? `/practice-img/writing/${img}` : null });
}

bank.sort((a, b) => a.day - b.day);
writeFileSync("src/practice/writing-bank.json", JSON.stringify(bank, null, 1));
console.log(`extracted ${bank.length} days; images in ${outImg}`);
console.log("sample day 2 T1:", bank.find((b) => b.day === 2)?.t1.slice(0, 120));
