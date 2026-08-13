// Regenerates the listening recordings with Microsoft neural voices.
//
// The generate-*-audio.ps1 scripts remain the single source of truth for
// WHAT is said: this reads their $s1..$s4 arrays (the "F|", "M|", "P|n"
// lines) and only changes WHO says it - Edge's neural voices instead of
// the old Windows SAPI synthesis, which is what made the recordings
// sound robotic. Because the text is untouched, every answer stays
// exactly where the answer key expects it.
//
// Each part gets its own cast, rotated deterministically across tests
// and parts, mixing British, Australian and American voices the way
// real IELTS recordings do. The announcer is one constant voice across
// every test, recognised by the fixed framing lines ("Part one...",
// "Now listen...", "That is the end of...").
//
// Needs internet (voices are cloud-rendered) and ffmpeg. Segments are
// cached in .neural-cache/, so an interrupted run resumes where it
// stopped and a re-run after editing one script only re-renders the
// lines that changed. Output goes straight to the mp3 files the player
// loads; no .wav step.
//
//   node scripts/generate-neural-audio.mjs            all 17 tests
//   node scripts/generate-neural-audio.mjs mock3 pset1   just these
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const audioDir = path.join(root, "public", "practice-audio");
const cacheDir = path.join(root, ".neural-cache");
fs.mkdirSync(cacheDir, { recursive: true });

const FFMPEG = (() => {
  try { execFileSync("ffmpeg", ["-version"], { stdio: "ignore" }); return "ffmpeg"; } catch { /* not on PATH */ }
  const winget = path.join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages");
  const hit = fs.readdirSync(winget).find((d) => d.startsWith("Gyan.FFmpeg"));
  if (!hit) throw new Error("ffmpeg not found");
  const dir = path.join(winget, hit);
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isFile() && e.name === "ffmpeg.exe") return p;
      if (e.isDirectory()) { const r = walk(p); if (r) return r; }
    }
    return null;
  };
  return walk(dir);
})();

// ── casting ──────────────────────────────────────────────────────────
const ANNOUNCER = "en-GB-ThomasNeural";
const FEMALE = ["en-GB-SoniaNeural", "en-AU-NatashaNeural", "en-US-JennyNeural", "en-GB-LibbyNeural", "en-US-MichelleNeural"];
const MALE = ["en-GB-RyanNeural", "en-AU-WilliamNeural", "en-US-GuyNeural", "en-US-EricNeural"];

// The announcer's lines are the fixed exam framing, not dialogue.
const isAnnouncer = (text) =>
  /^Part (one|two|three|four)[.,]/i.test(text) ||
  /^(Now listen|Before you hear|You now have|That is the end)/i.test(text) ||
  /look at questions .+\.\s*$/i.test(text) && /^(First|You will hear)/i.test(text);

// ── ps1 parsing ──────────────────────────────────────────────────────
function parseScript(ps1Path) {
  const src = fs.readFileSync(ps1Path, "utf8");
  const parts = [];
  const re = /\$s([1-4])\s*=\s*@\(([\s\S]*?)\n\)/g;
  let m;
  while ((m = re.exec(src))) {
    const lines = [];
    for (const lm of m[2].matchAll(/^\s*"((?:[^"]|"")*)"\s*,?\s*$/gm)) {
      lines.push(lm[1].replace(/""/g, '"'));
    }
    parts[Number(m[1]) - 1] = lines;
  }
  if (parts.length !== 4 || parts.some((p) => !p || !p.length)) {
    throw new Error(`${path.basename(ps1Path)}: expected 4 content arrays, got ${parts.filter(Boolean).length}`);
  }
  return parts;
}

// Spelling runs ("R - A - S - H") read better as comma pauses.
const forSpeech = (text) => text.replace(/\b([A-Z]) - (?=[A-Z]\b)/g, "$1, ");

// ── synthesis ────────────────────────────────────────────────────────
// One connection per voice, reused; a failed line retries on a fresh
// connection before giving up, since the endpoint drops idle sockets.
const engines = new Map();
async function synth(voice, text, outFile) {
  for (let attempt = 1; ; attempt++) {
    try {
      if (!engines.has(voice)) {
        const t = new MsEdgeTTS();
        await t.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
        engines.set(voice, t);
      }
      const { audioStream } = await engines.get(voice).toStream(text);
      const ws = fs.createWriteStream(outFile + ".tmp");
      audioStream.pipe(ws);
      await new Promise((res, rej) => { ws.on("finish", res); audioStream.on("error", rej); ws.on("error", rej); });
      if (fs.statSync(outFile + ".tmp").size < 400) throw new Error("empty audio returned");
      fs.renameSync(outFile + ".tmp", outFile);
      return;
    } catch (e) {
      engines.delete(voice);
      if (attempt >= 3) throw new Error(`synth failed for [${voice}] "${text.slice(0, 60)}": ${e.message}`);
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
  }
}

const silences = new Map();
function silenceFile(seconds) {
  const key = seconds.toFixed(2);
  if (!silences.has(key)) {
    const f = path.join(cacheDir, `silence-${key}.mp3`);
    if (!fs.existsSync(f)) {
      execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y",
        "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", key,
        "-c:a", "libmp3lame", "-b:a", "48k", f]);
    }
    silences.set(key, f);
  }
  return silences.get(key);
}

async function renderPart(name, partIdx, lines, testIdx) {
  const fVoice = FEMALE[(testIdx + partIdx) % FEMALE.length];
  const mVoice = MALE[(testIdx * 2 + partIdx) % MALE.length];
  const segs = [];
  for (const [i, raw] of lines.entries()) {
    const pause = raw.match(/^P\|(\d+(?:\.\d+)?)/);
    if (pause) { segs.push(silenceFile(Number(pause[1]))); continue; }
    const tag = raw.slice(0, 2);
    const text = forSpeech(raw.slice(2).trim());
    if (!text) continue;
    const voice = isAnnouncer(text) ? ANNOUNCER : tag === "F|" ? fVoice : mVoice;
    const seg = path.join(cacheDir,
      crypto.createHash("sha1").update(voice + "\u0000" + text).digest("hex") + ".mp3");
    if (!fs.existsSync(seg)) await synth(voice, text, seg);
    if (i > 0) segs.push(silenceFile(0.45));       // breathing room between turns
    segs.push(seg);
  }
  const list = path.join(cacheDir, `${name}-s${partIdx + 1}.txt`);
  fs.writeFileSync(list, segs.map((s) => `file '${s.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`).join("\n"));
  const out = path.join(audioDir, `${name}-s${partIdx + 1}.mp3`);
  execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y",
    "-f", "concat", "-safe", "0", "-i", list,
    "-ac", "1", "-ar", "22050", "-codec:a", "libmp3lame", "-q:a", "5", out]);
  return out;
}

// ── main ─────────────────────────────────────────────────────────────
const ALL = [...Array.from({ length: 12 }, (_, i) => `mock${i + 1}`),
             ...Array.from({ length: 5 }, (_, i) => `pset${i + 1}`)];
const wanted = process.argv.slice(2).length ? process.argv.slice(2) : ALL;

for (const name of wanted) {
  const ps1 = path.join(root, "scripts", `generate-${name}-audio.ps1`);
  const parts = parseScript(ps1);
  const testIdx = ALL.indexOf(name);
  for (let p = 0; p < 4; p++) {
    const t0 = Date.now();
    const out = await renderPart(name, p, parts[p], testIdx);
    const kb = Math.round(fs.statSync(out).size / 1024);
    console.log(`${name}-s${p + 1}.mp3  ${kb} KB  (${Math.round((Date.now() - t0) / 1000)}s)`);
  }
}
console.log("done");
