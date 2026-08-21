// The personal mistake notebook: every question this student has ever
// got wrong, on a practice paper OR a mock, in one place — with the
// explanations, the evidence lines, a listen-from-here button for
// listening items, a re-quiz over old mistakes, and the paraphrase
// vocabulary game.
//
// Mocks were once sealed here, so an exam could be re-used across
// intakes. That was overruled: a student who sits a mock should be able
// to study from it like any other paper. Mock papers are still marked
// "Exam" in the list so a student knows which is which, and the seal
// remains on the history screen, where a mock cannot be re-opened.
import { useEffect, useMemo, useState } from "react";
import { fetchResults, saveReview } from "./api.js";
import AUDIO_CUES from "./audio-cues.json";
import { buildReview, isMockResult, typeStats, TypeStatsBars, VocabMatch } from "./review.jsx";
import { parentListeningId } from "./upper.js";

const PENDING_KEY = "slc_practice_pending";
const QUIZABLE = new Set(["mcq", "select", "tfng", "ynng", "gap"]);

/* One shared audio element; play(test, item) seeks to the cue. */
export function useCueAudio() {
  const [playing, setPlaying] = useState(null);   // "testId:n"
  const [audio] = useState(() => {
    const a = new Audio();
    a.preload = "none";
    return a;
  });
  useEffect(() => () => audio.pause(), [audio]);
  const toggle = (testId, item) => {
    const key = `${testId}:${item.n}`;
    if (playing === key) { audio.pause(); setPlaying(null); return; }
    // Chunk papers (upsetN-listening-a/b/c) share the parent's recording.
    const parent = parentListeningId(testId);
    const cue = AUDIO_CUES[parent]?.[item.n];
    if (!cue) return;
    audio.src = `/practice-audio/${parent.replace(/-listening$/, "")}-s${cue.p}.mp3`;
    audio.currentTime = 0;
    audio.onloadedmetadata = () => { audio.currentTime = cue.t; audio.play(); };
    audio.onended = () => setPlaying(null);
    audio.load();
    setPlaying(key);
  };
  return { playing, toggle };
}

export const hasCue = (testId, n) => !!AUDIO_CUES[parentListeningId(testId)]?.[n];

/* Re-answer old mistakes, one at a time, with immediate feedback.
 * The session is recorded when it finishes: the notebook list is derived from
 * practice_results and needs no saving, but whether the student actually went
 * back over their mistakes was previously nowhere, so a teacher could not see
 * it. Nothing here blocks on the save. */
function QuizMe({ items, username }) {
  const [i, setI] = useState(0);
  const [given, setGiven] = useState(null);   // chosen option / typed text
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [text, setText] = useState("");
  const [answered, setAnswered] = useState([]);   // {test_id, n, type, right}
  const [startedAt] = useState(() => Date.now());
  const [saved, setSaved] = useState(false);
  const q = items[i];

  // Fires once, on the finish screen. A session abandoned half way is not
  // recorded — claiming a student reviewed their mistakes when they walked
  // away would be worse than recording nothing.
  useEffect(() => {
    if (q || saved || !answered.length || !username) return;
    setSaved(true);
    saveReview({
      student_username: username,
      right_count: score,
      total_count: answered.length,
      items: answered,
      seconds: Math.round((Date.now() - startedAt) / 1000),
    });
  }, [q, saved, answered, score, username, startedAt]);

  if (!items.length) return null;
  if (!q) {
    return (
      <div className="pr-review">
        <div className="pr-review__bar"><strong>Quiz finished</strong></div>
        <p className="pr-vocab__done">
          {score} of {items.length} of your old mistakes answered correctly this time.
          {score === items.length ? " All of them — they are not mistakes any more." : " The rest stay in the notebook for next time."}
          <br />Your teacher can see that you worked on these.
        </p>
      </div>
    );
  }

  const opts = q.type === "tfng" ? ["True", "False", "Not Given"]
    : q.type === "ynng" ? ["Yes", "No", "Not Given"]
    : q.options;
  const normLoc = (s) => String(s ?? "").trim().toLowerCase().replace(/[.,;:!?'"]/g, "").replace(/\s+/g, " ");
  const isRight = (val) => {
    const g = normLoc(val);
    return q.type === "mcq" || q.type === "select"
      ? q.keys.some((k) => g === k || g.startsWith(k + " "))
      : q.keys.includes(g);
  };

  const submit = (val) => {
    if (checked) return;
    setGiven(val); setChecked(true);
    const right = isRight(val);
    if (right) setScore((s) => s + 1);
    setAnswered((a) => a.some((x) => x.test_id === q.testId && x.n === q.n)
      ? a
      : [...a, { test_id: q.testId, n: q.n, type: q.type, right }]);
  };
  const next = () => { setI(i + 1); setGiven(null); setChecked(false); setText(""); };

  return (
    <div className="pr-review">
      <div className="pr-review__bar">
        <strong>Quiz me — my old mistakes</strong>
        <span className="pr-quiz__count">{i + 1} / {items.length}</span>
      </div>
      <div className="pr-quiz__meta">{q.title} · Q{q.n}</div>
      <div className="pr-review__q" style={{ marginBottom: 10 }}>{q.prompt}</div>
      {opts ? (
        <div className="pr-quiz__opts">
          {opts.map((o) => {
            const state = !checked ? "" : isRight(o) ? "is-right" : o === given ? "is-wrong" : "";
            return (
              <button key={o} type="button" className={`pr-quiz__opt ${state}`} disabled={checked}
                onClick={() => submit(o)}>{o}</button>
            );
          })}
        </div>
      ) : (
        <div className="pr-quiz__gap">
          <input value={text} onChange={(e) => setText(e.target.value)} disabled={checked}
            placeholder={q.note || "Type your answer"}
            onKeyDown={(e) => { if (e.key === "Enter" && text.trim()) submit(text); }} />
          {!checked && <button className="btn btn--primary" disabled={!text.trim()} onClick={() => submit(text)}>Check</button>}
        </div>
      )}
      {checked && (
        <div className={`pr-quiz__verdict ${isRight(given) ? "is-right" : "is-wrong"}`}>
          {isRight(given) ? "Correct this time." : <>Still tricky — the answer is <strong>{q.correct}</strong>.</>}
          {q.explain && <div className="pr-review__why" style={{ marginTop: 6 }}>{q.explain}</div>}
          <button className="btn btn--primary" style={{ marginTop: 10 }} onClick={next}>
            {i + 1 < items.length ? "Next →" : "Finish"}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Notebook({ user, findTest, onBack }) {
  const [rows, setRows] = useState(null);
  const { playing, toggle } = useCueAudio();
  const [mode, setMode] = useState("mistakes");   // mistakes | quiz | vocab

  useEffect(() => {
    (async () => {
      const remote = (await fetchResults(user.username)) || [];
      const pending = (() => {
        try { return JSON.parse(localStorage.getItem(PENDING_KEY) || "[]"); } catch { return []; }
      })();
      setRows([...pending.filter((r) => r.student_username === user.username), ...remote]
        .filter((r) => r.module !== "attempt"));
    })();
  }, [user.username]);

  const data = useMemo(() => {
    if (!rows) return null;
    const seen = new Set();
    const papers = [];   // {testId,title,module,isMock,items}
    const allReviews = [];
    for (const r of rows) {
      if (r.raw_score == null || !r.answers) continue;
      if (seen.has(r.test_id)) continue;   // one attempt per paper; guard anyway
      const t = findTest(r.test_id);
      if (!t) continue;
      seen.add(r.test_id);
      const items = buildReview(t, r.answers);
      allReviews.push(items);
      papers.push({ testId: r.test_id, title: t.title, module: t.module, isMock: isMockResult(r.test_id), items });
    }
    const mistakes = papers.flatMap((p) =>
      p.items.filter((it) => !it.ok).map((it) => ({ ...it, testId: p.testId, title: p.title, module: p.module })));
    return {
      stats: typeStats(allReviews),
      papers,
      mistakes,
      quizItems: mistakes.filter((m) => QUIZABLE.has(m.type)),
      vocabReview: mistakes,
    };
  }, [rows, findTest]);

  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <span className="nav__logo"><img src="/brand/icon-96.png" alt="" width="34" height="34" /><span>My mistakes</span></span>
        <button className="pr-link" onClick={onBack}>← Library</button>
      </header>

      {!rows || !data ? <p className="pr-empty">Loading…</p> : data.mistakes.length === 0 ? (
        <p className="pr-empty">
          Nothing here yet — finish a practice paper or a mock and any mistakes will be
          collected into this notebook to study from.
        </p>
      ) : (
        <>
          <TypeStatsBars stats={data.stats} title="Where you lose marks" />

          <div className="pr-tabs" style={{ marginTop: 16 }}>
            {[["mistakes", "My mistakes", `${data.mistakes.length} collected`],
              ["quiz", "Quiz me", `${data.quizItems.length} re-askable`],
              ["vocab", "Vocabulary", "paraphrase pairs"]].map(([id, label, hint]) => (
              <button key={id} className={`pr-tab ${mode === id ? "is-active" : ""}`} onClick={() => setMode(id)}>
                <strong>{label}</strong><span>{hint}</span>
              </button>
            ))}
          </div>

          {mode === "quiz" && <QuizMe key={data.quizItems.length} items={data.quizItems} username={user.username} />}
          {mode === "vocab" && <VocabMatch review={data.vocabReview} cap={10} />}
          {mode === "mistakes" && data.papers.map((p) => {
            const wrong = p.items.filter((it) => !it.ok);
            if (!wrong.length) return null;
            return (
              <div className="pr-review" key={p.testId}>
                <div className="pr-review__bar">
                  <strong>{p.title}</strong>
                  {p.isMock && <span className="pr-tagx">Exam</span>}
                  <span className="pr-quiz__count">{wrong.length} to work on</span>
                </div>
                {wrong.map((r) => (
                  <div key={r.n} className="pr-review__row is-wrong">
                    <span className="pr-review__mark">✕</span>
                    <div className="pr-review__body">
                      <div className="pr-review__q">{r.n}. {r.prompt}</div>
                      <div className="pr-review__ans">
                        <span className="is-yours">Your answer: <strong>{r.your || "not answered"}</strong></span>
                        <span className="is-key">Correct: <strong>{r.correct}</strong></span>
                      </div>
                      {r.explain && <div className="pr-review__why"><strong>Why:</strong> {r.explain}</div>}
                      {r.evidence && <div className="pr-review__ev">“{r.evidence}”</div>}
                      {p.module === "listening" && hasCue(p.testId, r.n) && (
                        <button type="button" className="pr-listen" onClick={() => toggle(p.testId, r)}>
                          {playing === `${p.testId}:${r.n}` ? "◼ Stop" : "▶ Listen from here"}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
