import { useEffect, useRef, useState } from "react";
import { BOOKS, TESTS, getTest } from "./content.js";
import { loginStudent, saveResult, fetchResults, fetchRemoteTests, fetchStudentContext, gradeMockWriting } from "./api.js";
import { accessFor, lessonPlan, lessonPapers, levelLabel, PROGRAMMES } from "./access.js";
import TRANSCRIPTS from "./transcripts.json";
import AUDIO_CUES from "./audio-cues.json";
import { norm, isMockResult, fmtTime, buildReview, VocabMatch } from "./review.jsx";
import Notebook, { useCueAudio, hasCue } from "./Notebook.jsx";
import { parentListeningId, chunkParts } from "./upper.js";
import InsperaPlayer from "./InsperaPlayer.jsx";

const SESSION_KEY = "slc_practice_user";
const PENDING_KEY = "slc_practice_pending";

// raw→band conversion (used only for full 40-question tests)
const BAND_TABLES = {
  reading: [
    [39, 9], [37, 8.5], [35, 8], [33, 7.5], [30, 7], [27, 6.5], [23, 6],
    [19, 5.5], [15, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3],
  ],
  listening: [
    [39, 9], [37, 8.5], [35, 8], [32, 7.5], [30, 7], [26, 6.5], [23, 6],
    [18, 5.5], [16, 5], [13, 4.5], [10, 4], [8, 3.5], [6, 3],
  ],
};
const bandFor = (raw, total, module) => {
  const table = BAND_TABLES[module];
  if (total !== 40 || !table) return null;
  for (const [min, band] of table) if (raw >= min) return band;
  return 2.5;
};

// norm/buildReview/etc. live in review.jsx, shared with the notebook.

/* ─── Login ─── */
function Login({ onLogin }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      const student = await loginStudent(u.trim(), p);
      if (!student) setErr("Wrong username or password. Use your Student App login.");
      else onLogin(student);
    } catch (e) {
      // A swallowed error here once cost us a production outage: a malformed
      // env var made fetch throw, and the message below sent everyone hunting
      // a network fault that did not exist. Leave a trace.
      console.error("practice login failed:", e);
      setErr("Could not reach the server. Check your connection and try again.");
    }
    setBusy(false);
  };

  return (
    <div className="pr-login">
      <form className="pr-login__card" onSubmit={submit}>
        <img src="/brand/icon-96.png" alt="" width="52" height="52" />
        <h1>Practice Platform</h1>
        <p>Sign in with your Student App account. Access is for Smart LC students only.</p>
        <input placeholder="Username" value={u} onChange={(e) => setU(e.target.value)} autoCapitalize="none" />
        <input placeholder="Password" type="password" value={p} onChange={(e) => setP(e.target.value)} />
        {err && <div className="pr-login__err">{err}</div>}
        <button className="btn btn--primary" disabled={busy || !u || !p}>{busy ? "…" : "Sign in"}</button>
      </form>
    </div>
  );
}

/* The papers of one shelf this student may see. Uploaded shelves are set
 * by staff for a particular class, so they sit outside the schedule. */
const testsOfBook = (tests, access, bookId) => tests.filter((t) =>
  t.bookId === bookId && (String(bookId).startsWith("up:") || access.inProgramme(t.id)));

/* ─── Library ─── */
function Library({ user, books, tests, onOpenBook, onOpenLesson, onLogout, onResults, onNotebook, takenMocks, completedMocks, takenPractice, access, picked, setSection }) {
  // Mocks are IELTS-only and hidden below that. The level arrives a moment
  // after first paint, so the chosen tab is resolved on every render
  // rather than fixed at mount — otherwise a student can be left looking
  // at a tab that has since been taken away. The choice itself is held by
  // the root, so opening a shelf and coming back does not silently throw
  // the student onto the other tab.
  const section = picked === "mock" && !access.mocks ? "practice" : picked;

  const forBook = (bookId) => testsOfBook(tests, access, bookId);

  // Uploaded shelves carry no `kind`; they are homework material, so they
  // belong with practice. A shelf whose papers are all outside this
  // student's programme disappears entirely.
  const shown = books
    .filter((b) => (b.kind || "practice") === section)
    .filter(() => (section === "mock" ? access.mocks : access.practice))
    .filter((b) => forBook(b.id).length > 0);

  // Which programme's lessons to lay out. A student has exactly one; the
  // owner's account belongs to neither, so it gets both.
  const byId = new Map(tests.map((t) => [t.id, t]));
  const levels = access.owner ? PROGRAMMES : [{ level: access.level, label: levelLabel(access.level) }];
  const programmes = levels
    .map(({ level, label }) => ({
      level, label,
      lessons: lessonPlan(level)
        .map(({ n, testIds }) => ({ n, tests: testIds.map((id) => byId.get(id)).filter(Boolean) }))
        .filter((l) => l.tests.length > 0),
    }))
    .filter((p) => p.lessons.length > 0);
  const tab = (id, label, hint) => (
    <button
      key={id}
      className={`pr-tab ${section === id ? "is-active" : ""}`}
      onClick={() => setSection(id)}
    >
      <strong>{label}</strong>
      <span>{hint}</span>
    </button>
  );

  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <span className="nav__logo">
          <img src="/brand/icon-96.png" alt="" width="34" height="34" />
          <span>Practice</span>
        </span>
        <div className="pr-lib__user">
          <button className="pr-link" onClick={onNotebook}>My mistakes</button>
          <button className="pr-link" onClick={onResults}>My results</button>
          <span>{user.full_name}</span>
          <button className="pr-link" onClick={onLogout}>Log out</button>
        </div>
      </header>

      {/* Mocks are not merely locked below IELTS level — they are absent. */}
      <div className="pr-tabs">
        {access.mocks && tab("mock", "Mock exams", "Full test · one attempt")}
        {access.practice && tab("practice", "Practice", "Single papers · one attempt each")}
      </div>

      {!access.practice && !access.mocks && (
        <p className="pr-lib__gate">
          {access.level
            ? `Practice papers open up at Upper-Intermediate. Your group is on ${access.level} — keep going.`
            : "We couldn't load your class details, so we can't tell which papers are yours yet. "
              + "Please reload, or ask your teacher if it keeps happening."}
        </p>
      )}

      {/* Mocks stay whole books: a mock is a sitting, not a lesson. */}
      {section === "mock" && (
        <div className="pr-lib__grid">
          {shown.map((b) => {
            const bookTests = forBook(b.id);
            const taken = takenMocks.has(b.id);
            const mins = bookTests.reduce((n, t) => n + t.durationMin, 0);
            return (
              <button
                className={`pr-book ${taken ? "is-taken" : ""}`}
                key={b.id}
                onClick={() => onOpenBook(b.id)}
              >
                <span className="pr-book__cover">{b.short}</span>
                <span className="pr-book__title">{b.title}</span>
                <span className="pr-book__count">
                  {taken ? (completedMocks.has(b.id) ? "✓ completed" : "attempt used")
                    : `${bookTests.length} papers · ${Math.floor(mins / 60)}h ${mins % 60 ? `${mins % 60}m` : ""}`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Practice is arranged by lesson, because that is how it is set and how
          a student is told about it — "lesson 12", not "set 6, reading". */}
      {section === "practice" && programmes.map(({ level, label, lessons }) => (
        <div key={level}>
          {programmes.length > 1 && <h2 className="pr-lib__prog">{label}</h2>}
          <div className="pr-lib__grid pr-lib__grid--lessons">
            {lessons.map(({ n, tests }) => {
              const open = tests.some((t) => access.isOpen(t.id));
              const done = tests.length > 0 && tests.every((t) => takenPractice.has(t.id));
              const mins = tests.reduce((s, t) => s + t.durationMin, 0);
              return (
                <button
                  className={`pr-lesson ${open ? "" : "is-locked"} ${done ? "is-done" : ""}`}
                  key={level + n}
                  disabled={!open}
                  onClick={() => open && onOpenLesson(level, n)}
                >
                  <span className="pr-lesson__n">{n}</span>
                  <span className="pr-lesson__title">{label} Lesson {n}</span>
                  <span className="pr-lesson__count">
                    {!open ? "🔒 not yet"
                      : done ? "✓ done"
                        : `${tests.length} paper${tests.length > 1 ? "s" : ""} · ${mins} min`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── One lesson, as a page of its own ───
 * Pre-IELTS lessons carry two short papers (a listening third and a reading
 * passage); IELTS lessons carry one full paper. Either way this is the page
 * a student lands on when their homework says "lesson 12". */
function LessonPage({ level, label, n, tests, user, access, onBack, onOpenBrief, takenPractice }) {
  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <button className="pr-link pr-back" onClick={onBack}>← Library</button>
        <div className="pr-lib__user"><span>{user.full_name}</span></div>
      </header>

      <h1 className="pr-book__heading">{label} Lesson {n}</h1>

      <div className="pr-lib__tests">
        {tests.map((t) => {
          const done = takenPractice.has(t.id);
          const locked = !access.isOpen(t.id);
          const isChunk = /-(a|b|c|p[123])$/.test(t.id);
          return (
            <div className={`pr-test-row ${locked ? "is-locked" : ""}`} key={t.id}>
              <div>
                <strong>{isChunk ? t.title.split(" · ").slice(1).join(" · ") : t.title}</strong>
                <span>
                  {t.module} · {t.durationMin} min ·{" "}
                  {t.sections.reduce((s, x) => s + x.questions.length, 0)} questions
                </span>
              </div>
              {locked
                ? <span className="pr-lock-chip">🔒 not open yet</span>
                : done
                  ? <span className="pr-done-chip">✓ done — review it under My results</span>
                  : <button className="btn btn--primary" onClick={() => onOpenBrief(t.id)}>Start</button>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── One shelf, as a page of its own ───
 * Opening a shelf used to unfold a panel underneath the grid, which left
 * the student scrolling past every other shelf to reach their papers.
 * It is a page now, with its own URL and its own way back. */
function BookPage({ book, tests, user, access, onBack, onOpenBrief, onStartMock, takenMocks, completedMocks, takenPractice }) {
  const papers = testsOfBook(tests, access, book.id);
  const isMock = (book.kind || "practice") === "mock";

  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <button className="pr-link pr-back" onClick={onBack}>← Library</button>
        <div className="pr-lib__user">
          <span>{user.full_name}</span>
        </div>
      </header>

      {/* MockBrief carries its own title, so only practice needs one. */}
      {!isMock && <h1 className="pr-book__heading">{book.title}</h1>}

      {isMock ? (
        <MockBrief
          book={book}
          papers={papers}
          taken={takenMocks.has(book.id)}
          completed={completedMocks.has(book.id)}
          onStart={() => onStartMock(book.id)}
        />
      ) : (
        <div className="pr-lib__tests">
          {/* Upper-Inter shelves carry both the full papers and the thirds
              the homework rule assigns; the full papers head the list and
              their pieces are indented beneath. */}
          {papers.map((t) => {
            const isChunk = /-(a|b|c|p[123])$/.test(t.id);
            const done = takenPractice.has(t.id);
            // Papers the class has not reached stay visible but shut, so a
            // student can see what is coming without jumping ahead.
            const locked = !String(t.bookId).startsWith("up:") && !access.isOpen(t.id);
            const opensAt = access.opensAt(t.id);
            return (
              <div className={`pr-test-row ${isChunk ? "is-chunk" : ""} ${locked ? "is-locked" : ""}`} key={t.id}>
                <div>
                  <strong>{isChunk ? t.title.split(" · ").slice(1).join(" · ") : t.title}</strong>
                  <span>
                    {t.module} · {t.durationMin} min · {t.sections.reduce((n, s) => n + s.questions.length, 0)} questions
                    {opensAt ? ` · lesson ${opensAt}` : ""}
                  </span>
                </div>
                {locked
                  ? <span className="pr-lock-chip" title={`Opens at lesson ${opensAt}`}>🔒 opens at lesson {opensAt}</span>
                  : done
                    ? <span className="pr-done-chip">✓ done — review it under My results</span>
                    : <button className="btn btn--primary" onClick={() => onOpenBrief(t.id)}>Start</button>}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── The same brief, for a single practice paper ───
 * Practice is one attempt too, so it gets the same treatment as a mock:
 * its own page, the rule stated before the student commits, rather than
 * a panel unfolding under the row they clicked. */
function PracticeBrief({ test, user, onBack, onStart }) {
  const questions = test.sections.reduce((n, s) => n + s.questions.length, 0);
  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <button className="pr-link pr-back" onClick={onBack}>← Back</button>
        <div className="pr-lib__user"><span>{user.full_name}</span></div>
      </header>
      <div className="pr-brief">
        <h3>{test.title}</h3>
        <p className="pr-brief__warn">
          <strong>You can do this paper once only, and your attempt is used the moment
          you press start.</strong> Read this before you begin.
        </p>
        <ol className="pr-brief__rules">
          <li>{test.module === "listening"
            ? "The recording plays once and cannot be paused or rewound, so check your "
              + "sound before you start."
            : "You have the whole time to read, answer and check — the passage stays on "
              + "screen throughout."}</li>
          <li>Allow about {test.durationMin} minutes without a break. {questions} questions.</li>
          <li>Your score, your answers and the time you took are sent to your teachers, so
              work as carefully as you would in class.</li>
          <li>It is marked as soon as you hand it in, with an explanation for every question
              under <strong>My results</strong>.</li>
        </ol>
        <button className="btn btn--primary btn--lg" onClick={onStart}>
          I understand — use my attempt and start
        </button>
        <button className="pr-link pr-brief__cancel" onClick={onBack}>Not yet — go back</button>
      </div>
    </div>
  );
}

/* The rules a student agrees to before a mock begins. Stated plainly and
 * before they commit, because after this point there is no second go. */
function MockBrief({ book, papers, taken, completed, onStart }) {
  const mins = papers.reduce((n, p) => n + p.durationMin, 0);
  if (taken) {
    return (
      <div className="pr-brief pr-brief--done">
        <h3>{book.title} — {completed ? "completed" : "attempt used"}</h3>
        {completed ? (
          <p>
            You have sat this mock exam. Each mock can be taken once only, so it cannot be
            started again. Your result is under <strong>My results</strong>; pick another mock,
            or work through the Practice section.
          </p>
        ) : (
          <p>
            This mock was started but not finished, so the attempt is used and there is
            no result. Each mock can be taken once only. If a technical problem — a power
            cut, a crash — ended your exam, speak to your teacher: the centre can restore
            your attempt.
          </p>
        )}
      </div>
    );
  }
  return (
    <div className="pr-brief">
      <h3>{book.title}</h3>
      <p className="pr-brief__warn">
        <strong>You can sit this mock once only, and your attempt is used the moment you
        press start.</strong> Read this before you begin.
      </p>
      <ol className="pr-brief__rules">
        <li>All three papers are sat one after another, in order: {papers.map((p) => p.module).join(" → ")}.</li>
        <li>Pressing start spends your only attempt. If you leave, close the page, or lose
            power before the last paper is handed in, the mock is used up and <strong>no result
            is saved</strong> — exactly like walking out of a real exam.</li>
        <li>Allow about {Math.floor(mins / 60)}h {mins % 60}m without a break, and check your
            audio and internet connection before you start — the listening recording plays once.</li>
        <li>Listening and Reading are marked automatically. Your writing goes to your teacher.</li>
      </ol>
      <button className="btn btn--primary btn--lg" onClick={onStart}>
        I understand — use my attempt and start
      </button>
    </div>
  );
}

/* ─── Scoring ─── */
// essays are stored for teacher review, everything else auto-scores.
// Keys may list accepted variants (answer: ["colour", "color"]).
// Multi-select pairs store chosen letters alphabetically, so keys
// authored in alphabetical order compare per-number like any letter.
function scoreTest(test, answers, username, startedAt) {
  const all = test.sections.flatMap((s) => s.questions);
  const scorable = all.filter((qq) => qq.type !== "essay");
  const keyVariants = (qq) => (Array.isArray(qq.answer) ? qq.answer : [qq.answer]).map(norm);
  let raw = 0;
  for (const qq of scorable) {
    const given = norm(answers[qq.n]);
    if (!given) continue;
    const keys = keyVariants(qq);
    if (qq.type === "mcq" || qq.type === "select") {
      if (keys.some((k) => given === k || given.startsWith(k + " "))) raw++;
    } else if (keys.includes(given)) raw++;
  }
  const total = scorable.length;
  return {
    student_username: username,
    test_id: test.id,
    module: test.module,
    raw_score: total > 0 ? raw : null,
    total,
    band: bandFor(raw, total, test.module),
    answers,
    duration_seconds: Math.round((Date.now() - startedAt) / 1000),
    taken_at: new Date().toISOString(),
  };
}

// Saves a result, falling back to the browser when the database is
// unreachable so a finished paper is never simply lost.
// The owner's own account sits outside the record: their attempts are not
// stored, so the teacher dashboard keeps showing students' work only, and
// nothing they open ever counts as "used up".
let SUPPRESS_SAVES = false;
export const setSuppressSaves = (v) => { SUPPRESS_SAVES = !!v; };
const EMPTY_SET = new Set();

/** The essay tasks of a writing paper, as the grader needs them: the prompt a
 *  candidate actually saw, and the word target that carries the under-length
 *  penalty. Task 1 is 150 words, Task 2 is 250 — the real exam's figures. */
function essayTasks(test) {
  return test.sections.flatMap((s, i) =>
    s.questions
      .filter((q) => q.type === "essay")
      .map((q) => ({
        n: q.n,
        task: i + 1,
        prompt: [s.passageTitle, s.instructions, s.passage].filter(Boolean).join("\n\n"),
        wordTarget: i === 0 ? 150 : 250,
      })),
  );
}

/** Indicative marking, requested after the paper is safely stored.
 *  Never throws and never blocks: the paper is already saved, and the
 *  teacher's mark is the one that counts. */
async function requestWritingBand(test, result) {
  if (test.module !== "writing" || SUPPRESS_SAVES) return null;
  const tasks = essayTasks(test);
  if (!tasks.length) return null;
  return gradeMockWriting(result.student_username, test.id, tasks);
}

async function persist(result) {
  if (SUPPRESS_SAVES) return true;
  let saved = false;
  try { saved = await saveResult(result); } catch { saved = false; }
  if (!saved) {
    const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
    pending.push(result);
    localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
  }
  return saved;
}

/* ─── Player: a single practice paper — scored and saved on its own ─── */
function Player({ test, user, onExit, onFinished }) {
  const startRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const finish = async (answers) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const result = scoreTest(test, answers, user.username, startRef.current);
    const saved = await persist(result);
    // Marking is requested only once the paper is stored — the grader reads
    // the essays back from that row rather than trusting anything sent here.
    const marked = saved ? await requestWritingBand(test, result) : null;
    onFinished({ ...result, saved, marked });
  };

  return <InsperaPlayer test={test} user={user} onExit={onExit} onFinish={finish} />;
}

/* ─── MockRun: the three papers of one mock, sat in a single sitting ───
 * Listening → Reading → Writing, in that order, with no way back.
 *
 * The attempt is CONSUMED at the start: entering the mock stores an
 * attempt marker, so leaving midway spends the mock with no result —
 * exactly like walking out of a real exam. Paper scores are still only
 * written when the final paper is handed in. Staff can restore an
 * attempt lost to a genuine technical failure by deleting that
 * student's `mockN-attempt` row (and any partial rows) from
 * practice_results.
 */
function MockRun({ book, tests, user, onQuit, onFinished }) {
  const [index, setIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const doneRef = useRef([]);            // results collected so far, unsaved
  const startRef = useRef(Date.now());

  const test = tests[index];
  const last = index === tests.length - 1;

  const finishPaper = async (answers) => {
    doneRef.current.push(scoreTest(test, answers, user.username, startRef.current));
    if (!last) {
      startRef.current = Date.now();
      setIndex(index + 1);
      return;
    }
    // Whole exam done — only now does any of it become a stored result.
    setSaving(true);
    const results = doneRef.current;
    const savedFlags = [];
    for (const r of results) savedFlags.push(await persist(r));
    // The writing paper of the sitting gets its indicative band here, after
    // every paper is safely stored.
    let marked = null;
    const wi = results.findIndex((r) => r.module === "writing");
    if (wi >= 0 && savedFlags[wi]) marked = await requestWritingBand(tests[wi], results[wi]);
    onFinished({ book, results, saved: savedFlags.every(Boolean), marked });
  };

  // Leaving mid-exam forfeits the sitting. The attempt was consumed the
  // moment the mock started, so this is permanent — say so in the
  // strongest terms available.
  const quit = () => {
    const done = doneRef.current.length;
    const progress = done === 0 ? "" : `You have finished ${done} of ${tests.length} papers. `;
    if (window.confirm(
      `Leave the mock exam? ${progress}Your one attempt is already used: if you leave now, `
      + "this mock is spent, NOTHING is saved, and it cannot be taken again."
    )) onQuit();
  };

  if (saving) {
    return (
      <div className="pr-result">
        <div className="pr-result__card">
          <h2>Saving your mock exam…</h2>
          <p>Please keep this page open.</p>
        </div>
      </div>
    );
  }

  return (
    <InsperaPlayer
      key={test.id}
      test={test}
      user={user}
      onExit={quit}
      onFinish={finishPaper}
      examStep={{ current: index + 1, total: tests.length, label: book.title }}
    />
  );
}

/* One card per paper, because a mock's outcome is three numbers, not one. */
function MockResultView({ outcome, onBack }) {
  return (
    <div className="pr-result">
      <div className="pr-result__card">
        <span className="reg__done-icon">✓</span>
        <h2>{outcome.book.title} — complete</h2>
        {outcome.results.map((r) => (
          <div className="pr-mockline" key={r.test_id}>
            <span className="pr-mockline__mod">{r.module}</span>
            <span className="pr-mockline__time">{fmtTime(r.duration_seconds)}</span>
            {r.raw_score == null
              ? <span>sent to your teacher for marking</span>
              : <span><strong>{r.raw_score}</strong> / {r.total}{r.band ? ` · Band ${r.band.toFixed(1)}` : ""}</span>}
          </div>
        ))}
        {!outcome.saved && (
          <p className="pr-result__warn">
            Saved on this device — it will sync to the centre when the connection returns.
            Don't clear your browser data.
          </p>
        )}
        <button className="btn btn--primary" onClick={onBack}>Back to the library</button>
      </div>
    </div>
  );
}

/* ─── Answer review ───
 * Rebuilt from the test content + the stored answers with the SAME
 * matching rules as scoreTest, so what the review marks right is
 * exactly what scoring counted. Practice papers only: a mock's key is
 * never shown, because a completed mock's answers shared with a
 * classmate who has not sat it yet would unseal the exam.
 */

function AnswerReviewList({ review, testId = null, module = null, onListen = null, playing = null }) {
  const [onlyWrong, setOnlyWrong] = useState(true);
  const wrong = review.filter((r) => !r.ok);
  const shown = onlyWrong ? wrong : review;
  const sections = [...new Set(shown.map((r) => r.section))];
  if (!review.length) return null;
  return (
    <div className="pr-review">
      <div className="pr-review__bar">
        <strong>Your answers · {wrong.length} to work on</strong>
        {wrong.length > 0 && (
          <label>
            <input type="checkbox" checked={onlyWrong} onChange={() => setOnlyWrong(!onlyWrong)} />
            <span>mistakes only</span>
          </label>
        )}
      </div>
      {wrong.length === 0 && <p className="pr-review__perfect">Every question correct. Excellent work.</p>}
      {sections.map((sec) => (
        <div key={sec}>
          <div className="pr-review__sec">{sec}</div>
          {shown.filter((r) => r.section === sec).map((r) => (
            <div key={r.n} className={`pr-review__row ${r.ok ? "" : "is-wrong"}`}>
              <span className="pr-review__mark">{r.ok ? "✓" : "✕"}</span>
              <div className="pr-review__body">
                <div className="pr-review__q">{r.n}. {r.prompt}</div>
                {!r.ok && (
                  <>
                    <div className="pr-review__ans">
                      <span className="is-yours">Your answer: <strong>{r.your || "not answered"}</strong></span>
                      <span className="is-key">Correct: <strong>{r.correct}</strong></span>
                    </div>
                    {r.explain && <div className="pr-review__why"><strong>Why:</strong> {r.explain}</div>}
                    {r.evidence && <div className="pr-review__ev">“{r.evidence}”</div>}
                    {module === "listening" && onListen && hasCue(testId, r.n) && (
                      <button type="button" className="pr-listen" onClick={() => onListen(testId, r)}>
                        {playing === `${testId}:${r.n}` ? "◼ Stop" : "▶ Listen from here"}
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Transcript: what the speakers said, revealed only after the paper
 * is finished. Practice listening only — mock transcripts are never in
 * the bundle at all (see scripts/extract-transcripts.mjs). ─── */
function TranscriptPanel({ testId }) {
  const [open, setOpen] = useState(false);
  // Chunk papers share the parent's transcript, filtered to their parts.
  const all = TRANSCRIPTS[parentListeningId(testId)];
  const partNums = chunkParts(testId);
  const parts = all && partNums ? partNums.map((p) => ({ n: p, lines: all[p - 1] }))
    : all ? all.map((lines, i) => ({ n: i + 1, lines })) : null;
  if (!parts) return null;
  return (
    <div className="pr-review pr-transcript">
      <button type="button" className="pr-transcript__toggle" onClick={() => setOpen(!open)}>
        <strong>Recording transcript</strong>
        <span>{open ? "Hide ▲" : "Read what was said ▼"}</span>
      </button>
      {open && parts.map(({ n, lines }, i) => (
        <div key={i}>
          <div className="pr-review__sec">Part {n}</div>
          {lines.map((l, j) => (
            <p key={j} className={`pr-transcript__line is-${l.s}`}>
              <span>{l.s === "A" ? "Speaker A" : "Speaker B"}</span>{l.t}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Result + history ─── */
function ResultView({ result, test, onBack }) {
  const isWriting = result.raw_score == null;
  const pct = isWriting ? null : Math.round((result.raw_score / result.total) * 100);
  // Review only for practice papers whose content we can still find.
  const review = test && !isMockResult(result.test_id) && !isWriting ? buildReview(test, result.answers) : null;
  const time = fmtTime(result.duration_seconds);
  const { playing, toggle } = useCueAudio();
  return (
    <div className="pr-result">
      <div className="pr-result__card">
        <span className="reg__done-icon">✓</span>
        <h2>{isWriting ? "Writing submitted" : "Test complete"}</h2>
        {isWriting ? (
          <p>Your answers have been saved and will be marked by your teacher.</p>
        ) : (
          <>
            <div className="pr-result__score">
              <strong>{result.raw_score}</strong> / {result.total}
            </div>
            <p>
              {pct}% correct{result.band ? ` · Band ${result.band.toFixed(1)}` : ""}
              {time ? ` · ${time} spent` : ""}
            </p>
          </>
        )}
        {!result.saved && <p className="pr-result__warn">Saved on this device — will sync when the results table is set up.</p>}
        <div className="pr-result__actions">
          <button className="btn btn--primary" onClick={onBack}>Back to library</button>
        </div>
      </div>
      {review && (
        <AnswerReviewList review={review} testId={result.test_id} module={test.module}
          onListen={toggle} playing={playing} />
      )}
      {review && <VocabMatch review={review} />}
      {test && !isMockResult(result.test_id) && test.module === "listening" && (
        <TranscriptPanel testId={result.test_id} />
      )}
    </div>
  );
}

/** The indicative band for a writing paper, with the examiner-style detail.
 *
 *  It says "indicative" in three places on purpose. A machine band is useful
 *  feedback and a poor verdict; the teacher's mark is the real one, and a
 *  student should never be able to mistake one for the other. */
export function WritingFeedback({ band, feedback, onClose }) {
  const tasks = feedback?.tasks || [];
  const CRIT = [
    ["task", "Task achievement"],
    ["coherence", "Coherence & cohesion"],
    ["lexical", "Lexical resource"],
    ["grammar", "Grammar"],
  ];
  return (
    <div className="pr-fb" role="dialog" aria-modal="true">
      <div className="pr-fb__panel">
        <header className="pr-fb__top">
          <div>
            <strong>Indicative band {Number(band).toFixed(1)}</strong>
            <span>Marked automatically · your teacher's mark is the official one</span>
          </div>
          <button className="pr-link" onClick={onClose}>Close</button>
        </header>

        {tasks.map((t) => (
          <section className="pr-fb__task" key={t.task}>
            <h3>Task {t.task} — band {Number(t.band).toFixed(1)} <em>({t.words} words)</em></h3>
            <div className="pr-fb__crit">
              {CRIT.map(([k, label]) => (
                <span key={k}><em>{label}</em><strong>{t.criteria[k]}</strong></span>
              ))}
            </div>
            {t.summary && <p className="pr-fb__summary">{t.summary}</p>}
            {t.grammar_feedback && <p><b>Grammar.</b> {t.grammar_feedback}</p>}
            {t.vocabulary_feedback && <p><b>Vocabulary.</b> {t.vocabulary_feedback}</p>}
            {t.coherence_feedback && <p><b>Coherence.</b> {t.coherence_feedback}</p>}
            {t.task_feedback && <p><b>Task.</b> {t.task_feedback}</p>}
            {t.strengths?.length > 0 && (
              <><h4>What worked</h4><ul>{t.strengths.map((s, i) => <li key={i}>{s}</li>)}</ul></>
            )}
            {t.improve?.length > 0 && (
              <><h4>What to fix next</h4><ul>{t.improve.map((s, i) => <li key={i}>{s}</li>)}</ul></>
            )}
          </section>
        ))}
        <p className="pr-fb__note">
          This band is produced by software and can be wrong. Use the detail to see what to work
          on — your teacher's mark is the one that counts.
        </p>
      </div>
    </div>
  );
}

function History({ user, onBack, onReview }) {
  const [rows, setRows] = useState(null);
  const [fb, setFb] = useState(null);
  useEffect(() => {
    (async () => {
      const remote = (await fetchResults(user.username)) || [];
      const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]")
        .filter((r) => r.student_username === user.username);
      // Attempt markers enforce the once-only rule; they are bookkeeping,
      // not results, so the student's history should not show them.
      setRows([...pending.map((r) => ({ ...r, pending: true })), ...remote]
        .filter((r) => r.module !== "attempt"));
    })();
  }, [user.username]);

  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <span className="nav__logo"><img src="/brand/icon-96.png" alt="" width="34" height="34" /><span>My results</span></span>
        <button className="pr-link" onClick={onBack}>← Library</button>
      </header>
      {!rows ? <p className="pr-empty">Loading…</p> : rows.length === 0 ? (
        <p className="pr-empty">No results yet — finish a test and it will appear here.</p>
      ) : (
        <div className="pr-history">
          {rows.map((r, i) => {
            const t = getTest(r.test_id);
            // Reviewable = a practice paper whose content still exists and
            // whose answers were stored. Mock rows stay sealed here too.
            const reviewable = t && !isMockResult(r.test_id) && r.raw_score != null && r.answers;
            return (
              <div className="pr-test-row" key={i}>
                <div>
                  <strong>{t ? t.title : r.test_id}</strong>
                  <span>
                    {new Date(r.taken_at).toLocaleDateString()}
                    {r.raw_score != null
                      ? ` · ${r.raw_score}/${r.total}`
                      : r.ai_band != null
                        ? ` · Band ${Number(r.ai_band).toFixed(1)} (indicative)`
                        : " · awaiting teacher review"}
                    {r.band ? ` · Band ${Number(r.band).toFixed(1)}` : ""}
                    {fmtTime(r.duration_seconds) ? ` · ${fmtTime(r.duration_seconds)}` : ""}
                    {r.pending ? " · not synced" : ""}
                  </span>
                </div>
                {reviewable && (
                  <button className="pr-link" onClick={() => onReview(r)}>Review</button>
                )}
                {r.ai_feedback?.tasks?.length > 0 && (
                  <button className="pr-link" onClick={() => setFb(r)}>Feedback</button>
                )}
                <span className="band-chip">
                  {r.raw_score != null ? `${Math.round((r.raw_score / r.total) * 100)}%` : "✍"}
                </span>
              </div>
            );
          })}
        </div>
      )}
      {fb && (
        <WritingFeedback band={fb.ai_band} feedback={fb.ai_feedback} onClose={() => setFb(null)} />
      )}
    </div>
  );
}

/* ─── Routing ───
 * Every view gets its own URL and its own history entry, so a test opens
 * as a page of its own and the phone's back gesture does what the Back
 * button does.
 *
 * Only these three are restorable FROM a URL. A test path is written to
 * the address bar but never reopened from one: following a shared link
 * or pressing forward would start the test, and starting a mock spends
 * the student's single attempt.
 */
const RESTORABLE = {
  "/practice": "library",
  "/practice/results": "history",
  "/practice/notebook": "notebook",
};
const pathOf = (v) =>
  v.name === "player" ? `/practice/test/${encodeURIComponent(v.testId)}`
    : v.name === "brief" ? `/practice/start/${encodeURIComponent(v.testId)}`
      : v.name === "mock" ? `/practice/mock/${encodeURIComponent(v.bookId)}`
        : v.name === "book" ? `/practice/book/${encodeURIComponent(v.bookId)}`
        : v.name === "lesson" ? `/practice/lesson/${encodeURIComponent(v.level)}/${v.n}`
          : Object.keys(RESTORABLE).find((p) => RESTORABLE[p] === v.name) || "/practice";

/** A URL back to a view. Book pages are safe to restore — looking at a
 *  shelf starts nothing — but test and mock paths deliberately fall back
 *  to the library, since opening one would spend an attempt. */
const viewOfPath = (path) => {
  if (RESTORABLE[path]) return { name: RESTORABLE[path] };
  const book = path.match(/^\/practice\/book\/(.+)$/);
  if (book) return { name: "book", bookId: decodeURIComponent(book[1]) };
  const lesson = path.match(/^\/practice\/lesson\/(.+)\/(\d+)$/);
  if (lesson) return { name: "lesson", level: decodeURIComponent(lesson[1]), n: Number(lesson[2]) };
  return { name: "library" };
};

const LEAVE_WARNING = {
  mock: "Leave the mock exam? Your one attempt is already used: if you leave now, "
    + "this mock is spent, NOTHING is saved, and it cannot be taken again.",
  player: "Leave this paper? Your answers are not saved unless you finish and submit it.",
};

/* ─── Root ─── */
export default function PracticeApp() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
  });
  // library | book | player | mock | result | mockresult | history | notebook
  const [view, setView] = useState(() => viewOfPath(window.location.pathname));
  const [section, setSection] = useState("mock");   // which library tab
  const [remote, setRemote] = useState([]);
  // null until the group's level and lesson are known. Until then nothing
  // unlocks: a failed lookup must never be read as permission.
  const [context, setContext] = useState({ level: null, lessonNum: null });
  const [takenMocks, setTakenMocks] = useState(() => new Set());
  const [completedMocks, setCompletedMocks] = useState(() => new Set());
  const [takenPractice, setTakenPractice] = useState(() => new Set());

  const loadRemote = () => { fetchRemoteTests().then(setRemote); };
  useEffect(loadRemote, []);

  useEffect(() => {
    if (!user) return;
    fetchStudentContext(user)
      .then(setContext)
      .catch((e) => {
        console.error("could not read the student's level/lesson:", e);
        setContext({ level: null, lessonNum: null });
      });
  }, [user]);
  const access = accessFor(context.level, context.lessonNum);
  // An owner browses the library; they do not sit it for a record. Nothing
  // is saved, and nothing reads as used up, so every paper can be reopened.
  setSuppressSaves(!!access.owner);
  const NONE = EMPTY_SET;
  const usedMocks = access.owner ? NONE : takenMocks;
  const doneMocks = access.owner ? NONE : completedMocks;
  const usedPractice = access.owner ? NONE : takenPractice;

  // Which mocks this student has used up. Starting a mock stores an
  // `mockN-attempt` marker, and finishing stores the three paper results,
  // so "used" is derived from stored rows rather than a flag of its own —
  // the two cannot drift apart. Rows queued offline count as well, or a
  // student on a bad connection could sit the same mock twice.
  // `completed` (a writing result exists) is kept separately from `taken`
  // so an abandoned mock can be labelled honestly.
  const loadTaken = () => {
    if (!user) return;
    const mockOf = (testId) => (String(testId).match(/^(mock\d+)-/) || [])[1];
    const pending = (() => {
      try { return JSON.parse(localStorage.getItem(PENDING_KEY) || "[]"); } catch { return []; }
    })();
    fetchResults(user.username).then((rows) => {
      const mine = [...(rows || []), ...pending.filter((r) => r.student_username === user.username)];
      setTakenMocks(new Set(mine.map((r) => mockOf(r.test_id)).filter(Boolean)));
      setCompletedMocks(new Set(
        mine.filter((r) => r.module === "writing").map((r) => mockOf(r.test_id)).filter(Boolean),
      ));
      // Practice papers are once-only too: a finished paper is homework
      // handed in, and doing it again with the answers fresh would only
      // inflate the score the teacher sees. One result per test id.
      setTakenPractice(new Set(
        mine.filter((r) => r.module !== "attempt" && !mockOf(r.test_id)).map((r) => r.test_id),
      ));
    });
  };
  useEffect(loadTaken, [user]);   // eslint-disable-line react-hooks/exhaustive-deps

  // The moment of no return: the attempt marker is stored BEFORE the first
  // paper opens. If it cannot reach the database it queues locally and
  // still counts, so going offline is not a way around the once-only rule.
  const startMock = (bookId) => {
    // The tab is hidden below IELTS level, but hiding a control is not the
    // same as enforcing a rule — this is the one that spends an attempt.
    if (!access.mocks) return;
    persist({
      student_username: user.username,
      test_id: `${bookId}-attempt`,
      module: "attempt",
      raw_score: null,
      total: 0,
      band: null,
      answers: null,
      duration_seconds: 0,
      taken_at: new Date().toISOString(),
    });
    setView({ name: "mock", bookId });
  };

  // uploaded tests appear as extra shelves after the built-in books
  const allTests = [...TESTS, ...remote];
  const remoteBooks = [...new Map(remote.map((t) => [t.bookId, t.bookTitle])).entries()]
    .map(([id, title]) => ({ id, title, short: title.split(/\s+/).map((w) => w[0]).join("").slice(0, 3).toUpperCase() }));
  const allBooks = [...remoteBooks, ...BOOKS];
  const findTest = (id) => getTest(id) || remote.find((t) => t.id === id);

  // Keep the address bar in step with the view. The first pass replaces
  // rather than pushes, so landing on a test URL corrects itself instead
  // of leaving an entry the student never navigated to.
  const firstRoute = useRef(true);
  useEffect(() => {
    const path = pathOf(view);
    const first = firstRoute.current;
    firstRoute.current = false;
    if (window.location.pathname === path) return;
    window.history[first ? "replaceState" : "pushState"](null, "", path);
  }, [view]);

  // Back/forward must respect the same rules as the on-screen button: a
  // student halfway through a paper gets the warning either way, and a
  // refused exit puts the entry back.
  useEffect(() => {
    const onPop = () => {
      const warning = LEAVE_WARNING[view.name];
      if (warning && !window.confirm(warning)) {
        window.history.pushState(null, "", pathOf(view));
        return;
      }
      const next = viewOfPath(window.location.pathname);
      if (pathOf(next) !== window.location.pathname) {
        window.history.replaceState(null, "", pathOf(next));
      }
      if (warning) loadTaken();   // a spent mock must show as spent
      setView(next);
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [view]);   // eslint-disable-line react-hooks/exhaustive-deps

  const login = (u) => { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); setUser(u); };
  const logout = () => { localStorage.removeItem(SESSION_KEY); setUser(null); setView({ name: "library" }); };

  if (!user) return <Login onLogin={login} />;

  if (view.name === "lesson") {
    // A lesson belongs to a programme, and a student only has their own.
    // The owner has neither level, so both are allowed for them.
    const mine = access.owner || view.level === access.level;
    const papers = mine
      ? lessonPapers(view.level, view.n).map(findTest).filter(Boolean)
      : [];
    if (!papers.length || !papers.some((t) => access.isOpen(t.id))) {
      setView({ name: "library" }); return null;
    }
    return (
      <LessonPage
        level={view.level}
        label={levelLabel(view.level)}
        n={view.n}
        tests={papers}
        user={user}
        access={access}
        onBack={() => setView({ name: "library" })}
        onOpenBrief={(testId) => setView({ name: "brief", testId })}
        takenPractice={usedPractice}
      />
    );
  }

  if (view.name === "book") {
    const book = allBooks.find((b) => b.id === view.bookId);
    const kind = (book?.kind || "practice");
    // A shelf the student may not have (wrong level, or a mock below IELTS)
    // sends them back rather than showing an empty page.
    const allowed = book && (kind === "mock" ? access.mocks : access.practice)
      && testsOfBook(allTests, access, book.id).length > 0;
    if (!allowed) { setView({ name: "library" }); return null; }
    return (
      <BookPage
        book={book}
        tests={allTests}
        user={user}
        access={access}
        onBack={() => setView({ name: "library" })}
        onOpenBrief={(testId) => setView({ name: "brief", testId })}
        onStartMock={startMock}
        takenMocks={usedMocks}
        completedMocks={doneMocks}
        takenPractice={usedPractice}
      />
    );
  }

  if (view.name === "brief") {
    const test = findTest(view.testId);
    const staffAssigned = String(test?.bookId || "").startsWith("up:");
    if (!test || (!staffAssigned && !access.isOpen(test.id))) {
      setView({ name: "library" }); return null;
    }
    return (
      <PracticeBrief
        test={test}
        user={user}
        onBack={() => setView({ name: "book", bookId: test.bookId })}
        onStart={() => setView({ name: "player", testId: test.id })}
      />
    );
  }

  if (view.name === "player") {
    const test = findTest(view.testId);
    // Uploaded papers are assigned by staff and sit outside the lesson
    // schedule; everything else must be open to this student.
    const staffAssigned = String(test?.bookId || "").startsWith("up:");
    if (!test || (!staffAssigned && !access.isOpen(test.id))) {
      setView({ name: "library" }); return null;
    }
    return (
      <Player
        test={test}
        user={user}
        onExit={() => { if (window.confirm(LEAVE_WARNING.player)) setView({ name: "library" }); }}
        onFinished={(result) => setView({ name: "result", result })}
      />
    );
  }
  if (view.name === "mock") {
    const book = allBooks.find((b) => b.id === view.bookId);
    // Papers run in exam order regardless of how content.js happens to
    // list them; a repeat attempt is refused even if the URL/state is
    // reconstructed by hand.
    const order = { listening: 0, reading: 1, writing: 2 };
    const papers = allTests
      .filter((t) => t.bookId === view.bookId)
      .sort((a, b) => order[a.module] - order[b.module]);
    if (!book || papers.length < 3 || usedMocks.has(book.id) || !access.mocks) {
      setView({ name: "library" }); return null;
    }
    return (
      <MockRun
        book={book}
        tests={papers}
        user={user}
        onQuit={() => { loadTaken(); setView({ name: "library" }); }}
        onFinished={(outcome) => { loadTaken(); setView({ name: "mockresult", outcome }); }}
      />
    );
  }
  if (view.name === "result") {
    return (
      <ResultView
        result={view.result}
        test={findTest(view.result.test_id)}
        onBack={() => { loadTaken(); setView({ name: view.from === "history" ? "history" : "library" }); }}
      />
    );
  }
  if (view.name === "mockresult") return <MockResultView outcome={view.outcome} onBack={() => setView({ name: "library" })} />;
  if (view.name === "notebook") {
    return <Notebook user={user} findTest={findTest} onBack={() => setView({ name: "library" })} />;
  }
  if (view.name === "history") {
    return (
      <History
        user={user}
        onBack={() => setView({ name: "library" })}
        onReview={(row) => setView({ name: "result", result: { ...row, saved: !row.pending }, from: "history" })}
      />
    );
  }

  return (
    <Library
      user={user}
      books={allBooks}
      tests={allTests}
      takenMocks={usedMocks}
      onLogout={logout}
      onResults={() => setView({ name: "history" })}
      onOpenBook={(bookId) => setView({ name: "book", bookId })}
      onOpenLesson={(level, n) => setView({ name: "lesson", level, n })}
      takenPractice={usedPractice}
      onNotebook={() => setView({ name: "notebook" })}
      completedMocks={doneMocks}
      access={access}
      picked={section}
      setSection={setSection}
    />
  );
}
