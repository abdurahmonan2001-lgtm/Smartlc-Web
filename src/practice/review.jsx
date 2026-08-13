// Shared review logic + components for the practice platform.
//
// Lives outside PracticeApp so the post-test result screen and the
// mistake notebook use the SAME matching rules and the same widgets —
// a question the scorer counted wrong must never read as right in a
// review, and vice versa.
import { useState } from "react";

export const norm = (s) =>
  String(s ?? "").trim().toLowerCase().replace(/[.,;:!?'"]/g, "").replace(/\s+/g, " ");

export const isMockResult = (testId) => /^mock\d+-/.test(String(testId));

export const fmtTime = (secs) => {
  if (!secs && secs !== 0) return null;
  const m = Math.floor(secs / 60), s = secs % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
};

/* Rebuilds a per-question review from the test content + stored answers,
 * mirroring scoreTest's matching exactly. */
export function buildReview(test, answers) {
  const items = [];
  for (const s of test.sections) {
    for (const q of s.questions) {
      if (q.type === "essay") continue;
      const given = norm(answers?.[q.n]);
      const keys = (Array.isArray(q.answer) ? q.answer : [q.answer]).map(norm);
      const ok = q.type === "mcq" || q.type === "select"
        ? keys.some((k) => given === k || given.startsWith(k + " "))
        : keys.includes(given);
      items.push({
        n: q.n,
        section: s.title,
        type: q.type,
        prompt: q.prompt || (q.table ? `${q.table.title} — gap ${q.n}` : q.notes ? `${q.notes.title} — gap ${q.n}` : `Question ${q.n}`),
        options: q.options || null,
        note: q.note || null,
        your: answers?.[q.n] ?? null,
        correct: Array.isArray(q.answer) ? q.answer[0] : q.answer,
        keys,
        ok,
        explain: q.explain || null,
        evidence: q.evidence || null,
        vocab: Array.isArray(q.vocab) && q.vocab.length === 2 ? q.vocab : null,
      });
    }
  }
  return items;
}

export const TYPE_LABELS = {
  tfng: "True/False/Not Given",
  ynng: "Yes/No/Not Given",
  mcq: "Multiple choice",
  gap: "Completion",
  match: "Matching",
  multiselect: "Choose two",
  label: "Map/plan labelling",
  select: "Selection",
};

/* Aggregates right/wrong per question type across many reviews. */
export function typeStats(reviewLists) {
  const stats = {};
  for (const items of reviewLists) {
    for (const r of items) {
      const s = (stats[r.type] ||= { right: 0, wrong: 0 });
      r.ok ? s.right++ : s.wrong++;
    }
  }
  return Object.entries(stats)
    .map(([type, s]) => ({ type, label: TYPE_LABELS[type] || type, ...s, total: s.right + s.wrong }))
    .filter((s) => s.total >= 3)
    .sort((a, b) => (b.wrong / b.total) - (a.wrong / a.total));
}

export function TypeStatsBars({ stats, title }) {
  if (!stats.length) return null;
  return (
    <div className="pr-review">
      <div className="pr-review__bar"><strong>{title}</strong></div>
      {stats.map((s) => {
        const pct = Math.round((s.wrong / s.total) * 100);
        return (
          <div key={s.type} className="pr-stat">
            <div className="pr-stat__head">
              <span>{s.label}</span>
              <span>{s.wrong} wrong of {s.total}</span>
            </div>
            <div className="pr-stat__track">
              <div className="pr-stat__fill" style={{ width: `${pct}%`, background: pct >= 50 ? "#dc2626" : pct >= 25 ? "#f59e0b" : "var(--green)" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Tap-to-match paraphrase game. Pairs come from wrong answers first. */
export function VocabMatch({ review, cap = 8 }) {
  const pairs = [
    ...review.filter((r) => !r.ok && r.vocab).map((r) => r.vocab),
    ...review.filter((r) => r.ok && r.vocab).map((r) => r.vocab),
  ].slice(0, cap);
  const [left, setLeft] = useState(null);
  const [matched, setMatched] = useState({});
  const [miss, setMiss] = useState(null);
  if (pairs.length < 3) return null;

  const order = [...pairs.keys()];
  const rightOrder = [...pairs.keys()].sort((a, b) =>
    (Math.sin(a * 31 + pairs.length) - Math.sin(b * 31 + pairs.length)));
  const done = Object.keys(matched).length === pairs.length;

  const pickRight = (idx) => {
    if (left == null || matched[idx]) return;
    if (idx === left) { setMatched((m) => ({ ...m, [idx]: true })); setLeft(null); }
    else { setMiss(idx); setTimeout(() => setMiss(null), 450); }
  };

  return (
    <div className="pr-review pr-vocab">
      <div className="pr-review__bar"><strong>Vocabulary practice — match the paraphrase</strong></div>
      <p className="pr-vocab__hint">
        The test never repeats the text's words — it paraphrases them. Tap a phrase on the
        left, then its partner on the right.
      </p>
      <div className="pr-vocab__cols">
        <div>
          {order.map((i) => (
            <button key={i} type="button"
              className={`pr-vocab__chip ${matched[i] ? "is-done" : ""} ${left === i ? "is-picked" : ""}`}
              disabled={matched[i]}
              onClick={() => setLeft(i)}>{pairs[i][0]}</button>
          ))}
        </div>
        <div>
          {rightOrder.map((i) => (
            <button key={i} type="button"
              className={`pr-vocab__chip ${matched[i] ? "is-done" : ""} ${miss === i ? "is-miss" : ""}`}
              disabled={matched[i]}
              onClick={() => pickRight(i)}>{pairs[i][1]}</button>
          ))}
        </div>
      </div>
      {done && <p className="pr-vocab__done">All matched — these pairs are exactly how the test disguised its answers. 🎉</p>}
    </div>
  );
}
