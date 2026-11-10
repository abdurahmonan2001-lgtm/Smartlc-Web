// Re-records chosen mock listening parts with ElevenLabs (Nov 2026: the Edge
// voice service behind generate-neural-audio.mjs started refusing requests).
//
// The generate-*-audio.ps1 scripts stay the single source of truth for WHAT is
// said; this reads their $s1..$s4 arrays exactly as generate-neural-audio.mjs
// does. The announcer's framing lines ("Part one...", "Now listen...") reuse
// their existing Edge recordings from .neural-cache/, so the announcer sounds
// the same in every part of a test; only the speakers are new. An announcer
// line with no cached recording stops the run rather than changing voice.
//
// Each speaker line is cached by model + voice + text in .neural-cache/el-*,
// so a re-run only pays for lines that changed. Output: the same mp3 files,
// mono 22 kHz, speech levelled to about -19 LUFS like the Edge recordings.
//
// Needs ELEVENLABS_API_KEY in the environment (never printed) and ffmpeg.
//   node scripts/generate-elevenlabs-audio.mjs mock3:1,4 mock11:1
import { execFileSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const audioDir = path.join(root, "public", "practice-audio");
const cacheDir = path.join(root, ".neural-cache");
const KEY = process.env.ELEVENLABS_API_KEY;
if (!KEY) throw new Error("ELEVENLABS_API_KEY is not set");
const MODEL = "eleven_v4";

const FFMPEG = (() => {
  try { execFileSync("ffmpeg", ["-version"], { stdio: "ignore" }); return "ffmpeg"; } catch { /* not on PATH */ }
  const winget = path.join(process.env.LOCALAPPDATA || "", "Microsoft", "WinGet", "Packages");
  const hit = fs.readdirSync(winget).find((d) => d.startsWith("Gyan.FFmpeg"));
  const walk = (d) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isFile() && e.name === "ffmpeg.exe") return p;
      if (e.isDirectory()) { const r = walk(p); if (r) return r; }
    }
    return null;
  };
  return walk(path.join(winget, hit));
})();
const ff = (args) => execFileSync(FFMPEG, ["-hide_banner", "-loglevel", "error", "-y", ...args]);

// ── casting: one female and one male voice per part, as in the scripts' F|/M| tags.
// Mostly British, with Scottish, Irish, Australian and American speakers mixed in
// as in real IELTS recordings. Never the book's two instruction voices (Jane, Christopher).
const V = {
  Alice: "Xb7hH8MSUJpSbSDYk0k2", Lily: "pFZP5JQG7iQjIQuC4Bku", George: "JBFqnCBsd6RMkjVDRZzb",
  Daniel: "onwK4e9ZLuTAKqWW03F9", Charlie: "IKne3meq5aSn9XLyUdCD", Chris: "iP95p4xoKVk53GoZ742B",
  Emma: "56bWURjYFHyYyVf490Dp", Hugh: "y6p0SvBlfEe2MH4XN7BP", JessicaG: "DbwWo4rVEd5NrejHYUnm",
  Paul: "WLKp2jV6nrS8aMkPPDRO",
};
const CAST = {
  "mock3-s1": { F: "Alice", M: "Charlie" },     // receptionist (British), caller (Australian)
  "mock3-s4": { F: "Lily", M: "Lily" },         // lecturer (British)
  "mock4-s1": { F: "Emma", M: "Daniel" },       // caller (Australian), office (British)
  "mock8-s1": { F: "JessicaG", M: "Paul" },     // caller (Irish), agency (Australian)
  "mock8-s4": { F: "George", M: "George" },     // lecturer (British)
  "mock9-s1": { F: "Lily", M: "Chris" },        // customer (British), store (American)
  "mock11-s1": { F: "Alice", M: "Hugh" },       // customer (British), repairs (Scottish)
  "mock11-s4": { F: "Daniel", M: "Daniel" },    // lecturer (British)
};

// Exactly the announcer test generate-neural-audio.mjs uses, so the same lines hit its cache.
const ANNOUNCER = "en-GB-ThomasNeural";
const isAnnouncer = (text) =>
  /^Part (one|two|three|four)[.,]/i.test(text) ||
  /^(Now listen|Before you hear|You now have|That is the end)/i.test(text) ||
  /look at questions .+\.\s*$/i.test(text) && /^(First|You will hear)/i.test(text);
const forSpeech = (text) => text.replace(/\b([A-Z]) - (?=[A-Z]\b)/g, "$1, ");

function parseScript(ps1Path) {
  const src = fs.readFileSync(ps1Path, "utf8");
  const parts = [];
  for (const m of src.matchAll(/\$s([1-4])\s*=\s*@\(([\s\S]*?)\n\)/g)) {
    parts[Number(m[1]) - 1] = [...m[2].matchAll(/^\s*"((?:[^"]|"")*)"\s*,?\s*$/gm)].map((x) => x[1].replace(/""/g, '"'));
  }
  return parts;
}

let charsSent = 0;
async function speak(voiceName, text, prev, next) {
  const id = V[voiceName];
  const seg = path.join(cacheDir, "el-" + crypto.createHash("sha1").update([MODEL, id, text].join("\u0000")).digest("hex") + ".mp3");
  if (fs.existsSync(seg)) return seg;
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${id}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        text, model_id: MODEL, previous_text: prev, next_text: next,
        voice_settings: { stability: 0.5, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true },
      }),
    });
    if (res.ok) {
      const raw = seg + ".raw.mp3";
      fs.writeFileSync(raw, Buffer.from(await res.arrayBuffer()));
      charsSent += text.length;
      // Level each line like the Edge recordings, and match their format.
      ff(["-i", raw, "-af", "loudnorm=I=-19:TP=-2:LRA=7", "-ac", "1", "-ar", "24000", "-c:a", "libmp3lame", "-b:a", "48k", seg]);
      fs.unlinkSync(raw);
      return seg;
    }
    const body = (await res.text()).slice(0, 200);
    if (attempt >= 3 || res.status === 401 || res.status === 402) throw new Error(`${res.status} for "${text.slice(0, 50)}": ${body}`);
    await new Promise((r) => setTimeout(r, 2000 * attempt));
  }
}

const silences = new Map();
function silenceFile(seconds) {
  const key = seconds.toFixed(2);
  if (!silences.has(key)) {
    const f = path.join(cacheDir, `silence-${key}.mp3`);
    if (!fs.existsSync(f)) ff(["-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", key, "-c:a", "libmp3lame", "-b:a", "48k", f]);
    silences.set(key, f);
  }
  return silences.get(key);
}

async function renderPart(name, partIdx, lines) {
  const cast = CAST[`${name}-s${partIdx + 1}`];
  if (!cast) throw new Error(`no cast for ${name}-s${partIdx + 1}`);
  const spoken = lines.map((raw) => {
    if (/^P\|/.test(raw)) return null;
    const text = forSpeech(raw.slice(2).trim());
    return { tag: raw.slice(0, 1), text, announcer: isAnnouncer(text) };
  });
  const segs = [];
  for (const [i, raw] of lines.entries()) {
    const pause = raw.match(/^P\|(\d+(?:\.\d+)?)/);
    if (pause) { segs.push(silenceFile(Number(pause[1]))); continue; }
    const s = spoken[i];
    if (!s.text) continue;
    let seg;
    if (s.announcer) {
      seg = path.join(cacheDir, crypto.createHash("sha1").update(ANNOUNCER + "\u0000" + s.text).digest("hex") + ".mp3");
      if (!fs.existsSync(seg)) throw new Error(`announcer line not in the Edge cache: "${s.text.slice(0, 60)}"`);
    } else {
      // The same speaker's neighbouring lines give the voice its flow.
      const near = (j) => (spoken[j] && !spoken[j].announcer && spoken[j].tag === s.tag ? spoken[j].text : undefined);
      seg = await speak(cast[s.tag], s.text, near(i - 1), near(i + 1));
      process.stdout.write(".");
    }
    if (i > 0) segs.push(silenceFile(0.45));            // breathing room between turns
    segs.push(seg);
  }
  const list = path.join(cacheDir, `${name}-s${partIdx + 1}-el.txt`);
  fs.writeFileSync(list, segs.map((s) => `file '${s.replace(/\\/g, "/").replace(/'/g, "'\\''")}'`).join("\n"));
  const out = path.join(audioDir, `${name}-s${partIdx + 1}.mp3`);
  ff(["-f", "concat", "-safe", "0", "-i", list, "-ac", "1", "-ar", "22050", "-codec:a", "libmp3lame", "-q:a", "5", out]);
  return out;
}

const jobs = process.argv.slice(2).map((a) => {
  const [name, parts] = a.split(":");
  return { name, parts: (parts || "1,2,3,4").split(",").map(Number) };
});
if (!jobs.length) throw new Error("usage: generate-elevenlabs-audio.mjs mock3:1,4 …");
for (const { name, parts } of jobs) {
  const all = parseScript(path.join(root, "scripts", `generate-${name}-audio.ps1`));
  for (const p of parts) {
    const t0 = Date.now();
    const out = await renderPart(name, p - 1, all[p - 1]);
    console.log(` ${path.basename(out)}  ${Math.round(fs.statSync(out).size / 1024)} KB  (${Math.round((Date.now() - t0) / 1000)}s)`);
  }
}
console.log(`done — ${charsSent} characters sent to ElevenLabs`);
