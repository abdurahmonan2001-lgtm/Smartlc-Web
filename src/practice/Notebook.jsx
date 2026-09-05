// The personal mistake notebook, in two halves:
//
//   Analytics — what the whole record says: how many papers, how the bands
//               are moving, which question types keep costing marks.
//   My papers — every practice paper and every mock this student has sat,
//               as a shelf. Opening one gives back the paper itself: the
//               passage or the recording script beside the questions, the
//               answers marked on it, and the exam's own strip of numbered
//               boxes underneath, green for right and red for wrong.
//
// It used to be a flat list of wrong questions with no way back to the paper
// they came from — which is the opposite of how anyone studies. The list is
// still there, inside each paper, one tick-box away.
//
// Mocks were once sealed here, so an exam could be re-used across intakes.
// That was overruled: a student who sits a mock should be able to study from
// it like any other paper. A mock opens to its three papers first, because
// "my mistakes on Mock 3" is not one paper but three.
import { useEffect, useMemo, useState } from "react";
import { fetchResults, saveReview } from "./api.js";
import { BOOKS } from "./content.js";
import { buildReview, fmtBand, fmtTime, halfBand, isMockResult, typeStats, TypeStatsBars, VocabMatch } from "./review.jsx";
import { hasCue, PaperReview, useCueAudio } from "./PaperReview.jsx";
import { CRITERIA } from "./WritingFeedback.jsx";

const PENDING_KEY = "slc_practice_pending";
const QUIZABLE = new Set(["mcq", "select", "tfng", "ynng", "gap"]);

const MOCK_TITLE = new Map(BOOKS.filter((b) => b.kind === "mock").map((b) => [b.id, b]));
const MODULE_ICON = { listening: "🎧", reading: "📖", writing: "✍️" };
const mockOf = (testId) => (String(testId).match(/^(mock\d+)-/) || [])[1] || null;

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

/* ─── The shelf ───
 * One tile per paper. The icon says which skill it was, so a student picks
 * out "the listening one" without reading a single title. */
function PaperCard({ card, onOpen }) {
  const done = card.review
    ? `${card.right}/${card.total}${card.band != null ? ` · Band ${fmtBand(card.band)}` : ""}`
    : card.band != null ? `Band ${fmtBand(card.band)}` : "marked";
  return (
    <button className={`pr-paper is-${card.module}`} onClick={() => onOpen(card)}>
      <span className="pr-paper__icon">{MODULE_ICON[card.module] || "📄"}</span>
      <span className="pr-paper__title">{card.title}</span>
      <span className="pr-paper__meta">{done}</span>
      <span className="pr-paper__work">
        {card.wrong ? `${card.wrong} to work on` : card.review ? "all correct" : "read the corrections"}
      </span>
      {card.isMock && <span className="pr-tagx pr-paper__tag">Exam</span>}
    </button>
  );
}

/* A whole mock, as one tile. It opens to its three papers rather than
 * straight to a review — a mock is a sitting, and "my mistakes on Mock 3"
 * is three different papers with three different answers. */
function MockCard({ mock, onOpen }) {
  const wrong = mock.papers.reduce((n, p) => n + (p.wrong || 0), 0);
  return (
    <button className="pr-paper is-mock" onClick={() => onOpen(mock)}>
      <span className="pr-paper__icon pr-paper__icon--cover">{mock.short}</span>
      <span className="pr-paper__title">{mock.title}</span>
      <span className="pr-paper__meta">{mock.papers.length} papers</span>
      <span className="pr-paper__work">{wrong ? `${wrong} to work on` : "open the papers"}</span>
      <span className="pr-tagx pr-paper__tag">Exam</span>
    </button>
  );
}

/* ─── Writing, criterion by criterion ───
 *
 * The four criteria and the examiner's verdict on each task. These used to sit
 * on the marked essay itself, which made a paper you open to REREAD open on a
 * page of figures instead. They are numbers about the writing, so they belong
 * with the other numbers; the paper is left to be the paper.
 *
 * Each criterion is a whole band, as an examiner awards them, and a task's own
 * band is those four averaged — so the four are worth seeing side by side.
 */
function WritingAnalytics({ cards }) {
  const papers = cards.filter((c) => c.module === "writing" && c.row?.ai_feedback?.tasks?.length);
  if (!papers.length) return null;
  return (
    <div className="pr-review pr-an">
      <div className="pr-review__bar"><strong>Your writing, criterion by criterion</strong></div>
      {papers.map((c) => (
        <div className="pr-an__group" key={c.testId}>
          <div className="pr-review__sec">{c.title} — band {fmtBand(c.band)}</div>
          {c.row.ai_feedback.tasks.map((t) => (
            <div className="pr-an__task" key={t.task}>
              <div className="pr-an__taskhead">
                <strong>Task {t.task}</strong>
                <span>band {fmtBand(t.band)}{t.words ? ` · ${t.words} words` : ""}</span>
              </div>
              <div className="pr-fb__crit">
                {CRITERIA.map(([k, label]) => (
                  <span key={k}><em>{label}</em><strong>{t.criteria?.[k] ?? "—"}</strong></span>
                ))}
              </div>
              {t.summary && <p className="pr-fb__summary">{t.summary}</p>}
              {t.strengths?.length > 0 && (
                <><h4 className="pr-an__h4">What worked</h4>
                  <ul className="pr-an__list">{t.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></>
              )}
              {t.improve?.length > 0 && (
                <><h4 className="pr-an__h4">What to fix next</h4>
                  <ul className="pr-an__list">{t.improve.map((s, i) => <li key={i}>{s}</li>)}</ul></>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Analytics ───
 * The whole record rather than one paper: how much has been sat, how the
 * bands are moving, and which question types keep taking the marks. */
function Analytics({ data }) {
  const scored = data.cards.filter((c) => c.review);
  const totalQs = scored.reduce((n, c) => n + c.total, 0);
  const totalRight = scored.reduce((n, c) => n + c.right, 0);
  const banded = scored.filter((c) => c.band != null);
  // An average of bands is still a band, so it is reported as one: a whole
  // mark or a half, never 6.6.
  const avg = (list) => (list.length
    ? halfBand(list.reduce((s, c) => s + Number(c.band), 0) / list.length)
    : null);
  const byModule = ["listening", "reading"].map((m) => {
    const mine = scored.filter((c) => c.module === m);
    return {
      module: m,
      papers: mine.length,
      right: mine.reduce((n, c) => n + c.right, 0),
      total: mine.reduce((n, c) => n + c.total, 0),
      band: avg(mine.filter((c) => c.band != null)),
    };
  }).filter((m) => m.papers > 0);
  const writing = data.cards.filter((c) => c.module === "writing" && c.band != null);
  // Newest first everywhere else; a trend has to read the other way round.
  const trend = [...banded].sort((a, b) => new Date(a.takenAt || 0) - new Date(b.takenAt || 0));

  const tiles = [
    [String(data.cards.length), data.cards.length === 1 ? "paper sat" : "papers sat"],
    [String(totalQs), "questions answered"],
    [`${totalQs ? Math.round((totalRight / totalQs) * 100) : 0}%`, "of them right"],
    [String(data.mistakes.length), "mistakes to work on"],
    avg(banded) != null ? [`Band ${fmtBand(avg(banded))}`, "average, listening & reading"] : null,
    writing.length ? [`Band ${fmtBand(avg(writing))}`, "average, writing"] : null,
  ].filter(Boolean);

  return (
    <>
      <div className="pr-review pr-an">
        <div className="pr-review__bar"><strong>Everything you have sat</strong></div>
        <div className="pr-an__tiles">
          {tiles.map(([v, label]) => (
            <div className="pr-an__tile" key={label}><strong>{v}</strong><span>{label}</span></div>
          ))}
        </div>
      </div>

      <TypeStatsBars stats={data.stats} title="Where you lose marks" />

      <WritingAnalytics cards={data.cards} />

      {byModule.length > 0 && (
        <div className="pr-review pr-an">
          <div className="pr-review__bar"><strong>By skill</strong></div>
          {byModule.map((m) => (
            <div className="pr-an__skill" key={m.module}>
              <span className="pr-an__skillname">{MODULE_ICON[m.module]} {m.module}</span>
              <span>{m.papers} paper{m.papers > 1 ? "s" : ""}</span>
              <span>{m.right}/{m.total} right</span>
              <span>{m.band != null ? `Band ${fmtBand(m.band)} average` : "—"}</span>
            </div>
          ))}
        </div>
      )}

      {trend.length > 1 && (
        <div className="pr-review pr-an">
          <div className="pr-review__bar"><strong>Your bands, in the order you sat them</strong></div>
          <div className="pr-an__trend">
            {trend.map((c) => (
              <div className="pr-an__point" key={c.testId} title={`${c.title} — Band ${fmtBand(c.band)}`}>
                <div className="pr-an__col" style={{ height: `${(halfBand(c.band) / 9) * 100}%` }} />
                <span className="pr-an__band">{fmtBand(c.band)}</span>
                <span className="pr-an__when">{MODULE_ICON[c.module]}</span>
              </div>
            ))}
          </div>
          <p className="pr-an__foot">Each column is one paper. Height is the band, out of 9.</p>
        </div>
      )}

      <div className="pr-review pr-an">
        <div className="pr-review__bar"><strong>Every paper</strong></div>
        {data.cards.map((c) => (
          <div className="pr-an__row" key={c.testId}>
            <span className="pr-an__rowicon">{MODULE_ICON[c.module]}</span>
            <span className="pr-an__rowtitle">{c.title}{c.isMock ? " · exam" : ""}</span>
            <span>{c.review ? `${c.right}/${c.total}` : "written"}</span>
            <span>{c.band != null ? `Band ${fmtBand(c.band)}` : "—"}</span>
            <span>{c.takenAt ? new Date(c.takenAt).toLocaleDateString() : ""}</span>
            <span>{fmtTime(c.row?.duration_seconds) || ""}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// rows/initialMode/initialPick are optional and exist so this screen can be
// rendered without a network — scripts/render-screens.mjs uses them to produce
// the preview of what a student sees. In the app none is passed.
export default function Notebook({
  user, findTest, onBack,
  rows: seededRows = null, initialMode = "mistakes", initialPick = null,
}) {
  const [rows, setRows] = useState(seededRows);
  const [mode, setMode] = useState(initialMode);   // mistakes | analytics
  // What is open inside the mistakes tab: nothing (the shelf), one paper,
  // one mock's three papers, or one of the two practice games.
  const [pick, setPick] = useState(initialPick);

  useEffect(() => {
    if (seededRows) return;
    (async () => {
      const remote = (await fetchResults(user.username)) || [];
      const pending = (() => {
        try { return JSON.parse(localStorage.getItem(PENDING_KEY) || "[]"); } catch { return []; }
      })();
      setRows([...pending.filter((r) => r.student_username === user.username), ...remote]
        .filter((r) => r.module !== "attempt"));
    })();
  }, [user.username, seededRows]);

  const data = useMemo(() => {
    if (!rows) return null;
    const seen = new Set();
    const cards = [];
    for (const r of rows) {
      if (seen.has(r.test_id)) continue;   // one attempt per paper; guard anyway
      const t = findTest(r.test_id);
      if (!t) continue;
      const base = {
        testId: r.test_id, test: t, title: t.title, row: r,
        isMock: isMockResult(r.test_id), takenAt: r.taken_at,
      };
      // A writing paper has no raw score and no per-question answers, so it
      // once fell out of this notebook entirely — a student working through
      // their mistakes could not reach the essay that had been marked for
      // them. It is a paper on the shelf like any other now.
      if (r.ai_feedback?.tasks?.length) {
        seen.add(r.test_id);
        cards.push({ ...base, module: "writing", band: r.ai_band, review: null, wrong: 0 });
        continue;
      }
      if (r.raw_score == null || !r.answers) continue;
      seen.add(r.test_id);
      const review = buildReview(t, r.answers);
      cards.push({
        ...base, module: t.module, band: r.band, review,
        right: review.filter((x) => x.ok).length,
        total: review.length,
        wrong: review.filter((x) => !x.ok).length,
      });
    }
    cards.sort((a, b) => new Date(b.takenAt || 0) - new Date(a.takenAt || 0));

    const mistakes = cards.filter((c) => c.review).flatMap((c) =>
      c.review.filter((it) => !it.ok).map((it) => ({ ...it, testId: c.testId, title: c.title, module: c.module })));

    // Mocks group into their sitting; everything else is a practice paper.
    const practice = [];
    const mocks = [];
    const byBook = new Map();
    for (const c of cards) {
      const m = mockOf(c.testId);
      if (!m) { practice.push(c); continue; }
      if (!byBook.has(m)) {
        const book = MOCK_TITLE.get(m);
        const mk = { bookId: m, title: book?.title || m, short: book?.short || m.toUpperCase(), papers: [] };
        byBook.set(m, mk);
        mocks.push(mk);
      }
      byBook.get(m).papers.push(c);
    }
    const order = { listening: 0, reading: 1, writing: 2 };
    for (const mk of mocks) mk.papers.sort((a, b) => order[a.module] - order[b.module]);
    mocks.sort((a, b) => Number(a.bookId.slice(4)) - Number(b.bookId.slice(4)));

    return {
      cards, practice, mocks, mistakes,
      byId: new Map(cards.map((c) => [c.testId, c])),
      stats: typeStats(cards.filter((c) => c.review).map((c) => c.review)),
      quizItems: mistakes.filter((m) => QUIZABLE.has(m.type)),
    };
  }, [rows, findTest]);

  const openPaper = (card) => setPick({ kind: "paper", testId: card.testId });
  const openMock = (mock) => setPick({ kind: "mock", bookId: mock.bookId });

  // The two halves of the notebook are the page's own title, in the header
  // beside the logo. They were a pair of cards below the rule, which meant
  // "My mistakes" was written twice on the same screen — once as the heading
  // and once as the card under it — and cost a band of space above every
  // paper.
  const tab = (id, label) => (
    <button key={id} className={`pr-nbtab ${mode === id ? "is-active" : ""}`} onClick={() => setMode(id)}>
      {label}
    </button>
  );

  /* What sits inside the mistakes tab. */
  const shelf = () => {
    if (!pick) {
      return (
        <>
          {data.practice.length > 0 && (
            <>
              <h2 className="pr-pick__h">Practice papers</h2>
              <div className="pr-papers">
                {data.practice.map((c) => <PaperCard key={c.testId} card={c} onOpen={openPaper} />)}
              </div>
            </>
          )}
          {data.mocks.length > 0 && (
            <>
              <h2 className="pr-pick__h">Mock exams</h2>
              <div className="pr-papers">
                {data.mocks.map((m) => <MockCard key={m.bookId} mock={m} onOpen={openMock} />)}
              </div>
            </>
          )}
          {(data.quizItems.length > 0 || data.mistakes.length > 0) && (
            <>
              <h2 className="pr-pick__h">Practise from your mistakes</h2>
              <div className="pr-papers">
                <button className="pr-paper is-tool" onClick={() => setPick({ kind: "quiz" })}>
                  <span className="pr-paper__icon">🔁</span>
                  <span className="pr-paper__title">Quiz me</span>
                  <span className="pr-paper__meta">your old mistakes, asked again</span>
                  <span className="pr-paper__work">{data.quizItems.length} to re-answer</span>
                </button>
                <button className="pr-paper is-tool" onClick={() => setPick({ kind: "vocab" })}>
                  <span className="pr-paper__icon">🔤</span>
                  <span className="pr-paper__title">Vocabulary</span>
                  <span className="pr-paper__meta">match the paraphrase</span>
                  <span className="pr-paper__work">how the test hid the answer</span>
                </button>
              </div>
            </>
          )}
        </>
      );
    }

    // The way back and the name of what is open both live in the header now
    // (see `crumb`), so nothing below repeats them.
    if (pick.kind === "quiz") {
      return <QuizMe key={data.quizItems.length} items={data.quizItems} username={user.username} />;
    }
    if (pick.kind === "vocab") return <VocabMatch review={data.mistakes} cap={10} />;
    if (pick.kind === "mock") {
      const mock = data.mocks.find((m) => m.bookId === pick.bookId);
      if (!mock) return null;
      return (
        <>
          <h2 className="pr-pick__h">{mock.title} — which paper?</h2>
          <div className="pr-papers">
            {mock.papers.map((c) => <PaperCard key={c.testId} card={c} onOpen={openPaper} />)}
          </div>
        </>
      );
    }

    const card = data.byId.get(pick.testId);
    if (!card) return null;
    // No score tiles and no vocabulary game here: this screen is for reading
    // the paper back. The numbers are the Analytics tab's job, and the
    // vocabulary exercise has a tile of its own on the shelf.
    return <PaperReview test={card.test} result={card.row} showStats={false} showVocab={false} />;
  };

  /* What is open, and the way back out of it — both in the header line, so
   * an open paper spends none of its height on a title and a link. */
  const crumb = (() => {
    if (!pick || !data) return null;
    if (pick.kind === "quiz") return { back: "All my papers", to: null };
    if (pick.kind === "vocab") return { back: "All my papers", to: null };
    if (pick.kind === "mock") return { back: "All my papers", to: null };
    const card = data.byId.get(pick.testId);
    if (!card) return null;
    const book = mockOf(card.testId);
    return {
      icon: MODULE_ICON[card.module],
      title: card.title,
      exam: card.isMock,
      back: book ? MOCK_TITLE.get(book)?.title || "The mock" : "All my papers",
      to: book ? { kind: "mock", bookId: book } : null,
    };
  })();

  // An open paper takes the whole width: two columns of 512px were the
  // shelf's measure, not a passage's, and half of what a student reads here
  // is the exam's own text. Writing counts too now that it is a split as
  // well — the task on one side, the marked essay on the other.
  const wide = mode === "mistakes" && pick?.kind === "paper";

  return (
    <div className={`pr-lib ${wide ? "pr-lib--wide" : ""}`}>
      <header className="pr-lib__top">
        <span className="nav__logo">
          <img src="/brand/icon-96.png" alt="" width="34" height="34" />
          {data?.cards.length
            ? <span className="pr-nbtabs">{tab("mistakes", "My mistakes")}{tab("analytics", "Analytics")}</span>
            : <span>My mistakes</span>}
        </span>
        <span className="pr-lib__crumb">
          {crumb?.title && (
            <span className="pr-lib__paper">
              {crumb.icon} {crumb.title}
              {crumb.exam && <span className="pr-tagx">Exam</span>}
            </span>
          )}
          {crumb && (
            <button className="pr-link" onClick={() => setPick(crumb.to)}>← {crumb.back}</button>
          )}
          <button className="pr-link" onClick={onBack}>← Library</button>
        </span>
      </header>

      {!rows || !data ? <p className="pr-empty">Loading…</p> : !data.cards.length ? (
        <p className="pr-empty">
          Nothing here yet — finish a practice paper or a mock and it will appear here to
          study from, with every mistake explained.
        </p>
      ) : mode === "analytics" ? <Analytics data={data} /> : shelf()}
    </div>
  );
}
