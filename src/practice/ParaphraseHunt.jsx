// "Find the paraphrase" (CEO, 1 Nov 2026: "take vocabulary from questions —
// both listening and reading — and ask students to find the rephrasing in the
// audio script and text. This will greatly help students learn paraphrase.")
//
// IELTS never repeats the passage's words in its questions; it paraphrases
// them, and spotting that is most of the skill. So for each question with a
// pair (q.vocab = [inText, inQuestion], checked by scripts/check-paraphrases.mjs)
// the student sees the question with its words marked, and the passage or the
// audio script of that part, and taps the words that say the same thing: one
// tap where the phrase starts, one where it ends. Mistakes come first.
//
// A pick counts when it covers the phrase and adds at most a few words around
// it (a student who taps the whole paragraph has not found anything).
import { useMemo, useState } from "react";
import TRANSCRIPTS from "./transcripts.json";
import { parentListeningId, chunkParts } from "./upper.js";

const CH = { "‘": "'", "’": "'", "“": '"', "”": '"', "–": "-", "—": "-" };
const bare = (w) => String(w).replace(/[‘’“”–—]/g, (c) => CH[c]).toLowerCase().replace(/[^a-z0-9'-]/g, "");
const tokens = (s) => String(s || "").split(/\s+/).filter(Boolean);
const SLACK = 4;   // extra words a correct pick may include around the phrase

/** The words of the passage or script part a question sits in, as lines of
 *  tokens: [{ who, words: [{ w, i }] }], i counting across the whole text. */
function sourceOf(item) {
  const test = item.test;
  if (!test) return null;
  const si = test.sections.findIndex((s) => s.title === item.section);
  if (si < 0) return null;
  let i = 0;
  const line = (who, text) => ({ who, words: tokens(text).map((w) => ({ w, i: i++ })) });
  if (test.module === "listening") {
    const all = TRANSCRIPTS[parentListeningId(item.testId)];
    const parts = chunkParts(item.testId);
    const lines = all?.[(parts ? parts[si] : si + 1) - 1];
    if (!lines) return null;
    return { kind: "script", lines: lines.map((l) => line(l.s, l.t)), count: i };
  }
  const paras = String(test.sections[si].passage || "").split(/\n\s*\n/).filter((p) => p.trim());
  if (!paras.length) return null;
  return { kind: "passage", title: test.sections[si].passageTitle, lines: paras.map((p) => line(null, p)), count: i };
}

/** Where the phrase sits: [first word, last word], or null. */
function locate(src, phrase) {
  const want = tokens(phrase).map(bare).filter(Boolean);
  const flat = src.lines.flatMap((l) => l.words);
  const have = flat.map((x) => bare(x.w));
  for (let s = 0; s + want.length <= have.length; s++) {
    if (want.every((w, k) => have[s + k] === w)) return [flat[s].i, flat[s + want.length - 1].i];
  }
  return null;
}

/** The question with its paraphrased words in bold. */
function Marked({ text, phrase }) {
  const at = String(text).toLowerCase().indexOf(String(phrase).toLowerCase());
  if (at < 0) return <>{text}</>;
  return <>{text.slice(0, at)}<mark className="ph-q">{text.slice(at, at + phrase.length)}</mark>{text.slice(at + phrase.length)}</>;
}

export default function ParaphraseHunt({ items, cap = 8, title = "Find the paraphrase" }) {
  // Mistakes first, then the rest; only questions whose pair can be shown.
  const tasks = useMemo(() => {
    const ready = [];
    for (const it of [...items.filter((x) => !x.ok), ...items.filter((x) => x.ok)]) {
      if (!it.vocab) continue;
      const src = sourceOf(it);
      const span = src && locate(src, it.vocab[0]);
      if (span) ready.push({ it, src, span });
      if (ready.length >= cap) break;
    }
    return ready;
  }, [items, cap]);

  const [k, setK] = useState(0);
  const [pick, setPick] = useState([]);          // [start] or [start, end]
  const [state, setState] = useState(null);      // null | "right" | "wrong" | "shown"
  const [tries, setTries] = useState(0);
  const [score, setScore] = useState(0);

  if (!tasks.length) {
    return (
      <div className="pr-review ph">
        <div className="pr-review__bar"><strong>{title}</strong></div>
        <p className="pr-vocab__hint">Nothing to practise here yet: this works on papers you have taken.</p>
      </div>
    );
  }
  if (k >= tasks.length) {
    return (
      <div className="pr-review ph">
        <div className="pr-review__bar"><strong>{title}</strong></div>
        <p className="ph-done">You found {score} of {tasks.length} paraphrases on your own.</p>
        <p className="pr-vocab__hint">This is the skill IELTS tests most: the question and the text say the same thing in different words. The more of these you spot, the faster you find answers in the exam.</p>
        <button type="button" className="ph-btn" onClick={() => { setK(0); setPick([]); setState(null); setTries(0); setScore(0) }}>Start again</button>
      </div>
    );
  }

  const { it, src, span } = tasks[k];
  const [inText, inQ] = it.vocab;
  const lo = pick.length ? Math.min(...pick) : null;
  const hi = pick.length ? Math.max(...pick) : null;
  const picked = (i) => lo != null && i >= lo && i <= (pick.length === 2 ? hi : lo);
  const target = (i) => (state === "right" || state === "shown") && i >= span[0] && i <= span[1];

  const tap = (i) => {
    if (state === "right" || state === "shown") return;
    setState(null);
    setPick((p) => (p.length === 1 ? [p[0], i] : [i]));
  };
  const check = () => {
    if (pick.length === 0) return;
    const a = lo, b = pick.length === 2 ? hi : lo;
    const ok = a <= span[0] && b >= span[1] && (b - a) - (span[1] - span[0]) <= SLACK;
    // A pick inside the phrase that holds most of it also counts.
    const inside = a >= span[0] && b <= span[1] && (b - a + 1) >= Math.ceil((span[1] - span[0] + 1) * 0.6);
    if (ok || inside) { setState("right"); if (tries === 0) setScore((s) => s + 1); }
    else { setState("wrong"); setTries((t) => t + 1); }
  };
  const next = () => { setK(k + 1); setPick([]); setState(null); setTries(0); };

  return (
    <div className="pr-review ph">
      <div className="pr-review__bar"><strong>{title}</strong><span>{k + 1} / {tasks.length}</span></div>
      <p className="pr-vocab__hint">
        The question never uses the {src.kind === "script" ? "speakers'" : "passage's"} own words. Find the words
        in the {src.kind === "script" ? "audio script" : "passage"} that mean the same as the <mark className="ph-q">marked words</mark>:
        tap where they start, then where they end.
      </p>

      <div className="ph-question">
        <span className="ph-qn">Question {it.n}{it.title ? ` · ${it.title}` : ""}{!it.ok ? " · you got this wrong" : ""}</span>
        <p><Marked text={it.prompt || ""} phrase={inQ} /></p>
        {it.options && String(it.prompt || "").toLowerCase().indexOf(inQ.toLowerCase()) < 0 && (
          <ul className="ph-opts">{it.options.map((o) => <li key={o}><Marked text={o} phrase={inQ} /></li>)}</ul>
        )}
        {String(it.prompt || "").toLowerCase().indexOf(inQ.toLowerCase()) < 0 && !it.options?.some((o) => o.toLowerCase().includes(inQ.toLowerCase())) && (
          <p className="ph-look">Look for: <mark className="ph-q">{inQ}</mark></p>
        )}
      </div>

      <div className={`ph-source is-${src.kind}`}>
        {src.title && <div className="ph-title">{src.title}</div>}
        {src.lines.map((l, li) => (
          <p key={li} className="ph-line">
            {l.who && <span className="ph-who">{l.who === "A" ? "A" : "B"}</span>}
            {l.words.map(({ w, i }) => (
              <span key={i}>
                <span role="button" tabIndex={0}
                  className={`ph-w${picked(i) ? " is-picked" : ""}${target(i) ? " is-target" : ""}`}
                  onClick={() => tap(i)} onKeyDown={(e) => { if (e.key === "Enter") tap(i) }}>{w}</span>{" "}
              </span>
            ))}
          </p>
        ))}
      </div>

      <div className="ph-bar">
        {state === "right" && <p className="ph-ok">✓ Yes: “{inText}” = “{inQ}”.</p>}
        {state === "shown" && <p className="ph-show">Here it is: “{inText}” means “{inQ}”.</p>}
        {state === "wrong" && <p className="ph-no">Not quite. {tries >= 2 ? "Look near the answer to this question." : "Read around it again: same meaning, different words."}</p>}
        {(state === "right" || state === "shown")
          ? <button type="button" className="ph-btn" onClick={next}>{k + 1 < tasks.length ? "Next" : "Finish"}</button>
          : (
            <span className="ph-actions">
              {tries >= 2 && <button type="button" className="ph-btn is-ghost" onClick={() => setState("shown")}>Show me</button>}
              <button type="button" className="ph-btn" disabled={!pick.length} onClick={check}>Check</button>
            </span>
          )}
      </div>
    </div>
  );
}
