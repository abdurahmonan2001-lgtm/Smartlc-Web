import { useEffect, useRef, useState } from "react";
import { BOOKS, TESTS, getTest } from "./content.js";
import { loginStudent, handoffStudent, hasSession, endSession, saveResult, fetchResults, fetchRemoteTests, fetchStudentContext, gradeMockWriting } from "./api.js";
import { accessFor, lessonPlan, lessonPapers, levelLabel, PROGRAMMES } from "./access.js";
import { unitsOf } from "./units.js";
import PracticeMap from "./PracticeMap.jsx";
import CourseRegion, { regionOf } from "./CourseRegion.jsx";
import TRANSCRIPTS from "./transcripts.json";
import { norm, isMockResult, bandFor, fmtBand, fmtTime } from "./review.jsx";
import Notebook from "./Notebook.jsx";
import { PaperReview } from "./PaperReview.jsx";
import { parentListeningId, chunkParts } from "./upper.js";
import InsperaPlayer from "./InsperaPlayer.jsx";
import { WritingFeedback } from "./WritingFeedback.jsx";

export { WritingFeedback };   // callers still import it from here

const SESSION_KEY = "slc_practice_user";
const PENDING_KEY = "slc_practice_pending";

// norm/buildReview/bandFor/etc. live in review.jsx, shared with the notebook.

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
export function Library({ user, books, tests, onOpenBook, onOpenLesson, onLogout, onResults, onNotebook, takenMocks, completedMocks, takenPractice, access, picked, setSection, resultsKnown = true }) {
  // Home is the trail, Practice every lesson by unit, Mock exams the mocks.
  // Mocks are IELTS-only and hidden below that. The level arrives a moment
  // after first paint, so the chosen tab is resolved on every render rather
  // than fixed at mount. The choice itself is held by the root, so opening a
  // lesson and coming back returns to the same tab.
  const section = picked === "mock" && !access.mocks ? "home" : (picked || "home");

  const forBook = (bookId) => testsOfBook(tests, access, bookId);

  // Mock shelves. A shelf whose papers are all outside this student's
  // programme disappears entirely.
  const shown = books
    .filter((b) => (b.kind || "practice") === "mock")
    .filter(() => access.mocks)
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

  // Each programme's lessons with their state, grouped into its units, and
  // the record they add up to (the top row, the trail and the cards all read
  // the same numbers).
  const now = access.lessonNum;
  const stateOf = (tests) => {
    const open = tests.some((t) => access.isOpen(t.id));
    const doneTests = tests.filter((t) => takenPractice.has(t.id));
    const done = tests.length > 0 && doneTests.length === tests.length;
    const opens = Math.min(...tests.map((t) => access.opensAt(t.id) ?? Infinity));
    const state = !open ? "is-locked" : done ? "is-done" : doneTests.length ? "is-partial"
      : now && opens === now ? "is-current" : now && opens < now && resultsKnown ? "is-missed" : "";
    return { open, doneTests, done, opens, state };
  };
  const progs = programmes.map((p) => {
    const lessons = p.lessons.map((l) => ({ ...l, ...stateOf(l.tests) }));
    const byN = new Map(lessons.map((l) => [l.n, l]));
    const openL = lessons.filter((l) => l.open);
    const doneL = openL.filter((l) => l.done);
    // Behind = lessons already past and not finished; this lesson's papers
    // are not late yet.
    const behind = openL.filter((l) => !l.done && l.opens < (now || 0)).length;
    const scores = lessons.flatMap((l) => l.tests.map((t) => takenPractice.get(t.id))).filter((s) => s?.total);
    const avg = scores.length ? Math.round(100 * scores.reduce((a, s) => a + s.raw, 0) / scores.reduce((a, s) => a + s.total, 0)) : null;
    // "Your band if you took IELTS now": the last six papers' bands averaged
    // to the half (CEO: always shown, with a half-band disclaimer).
    const bands = lessons.flatMap((l) => l.tests.map((t) => takenPractice.get(t.id)?.band)).filter((b) => b != null).slice(-6);
    const band = bands.length ? Math.round(2 * bands.reduce((a, b) => a + Number(b), 0) / bands.length) / 2 : null;
    // Where "Continue" goes: this lesson if it is not finished, else the
    // earliest one still owed.
    const next = lessons.find((l) => l.open && !l.done && l.opens >= (now || 0))
      || lessons.find((l) => l.open && !l.done);
    const units = unitsOf(p.level).map((u) => {
      const ls = u.lessons.map((n) => byN.get(n)).filter(Boolean);
      const o = ls.filter((l) => l.open);
      const d = o.filter((l) => l.done);
      const sc = ls.flatMap((l) => l.tests.map((t) => takenPractice.get(t.id))).filter((s) => s?.total);
      return {
        ...u, ls,
        open: o.length > 0,
        done: o.length > 0 && d.length === ls.length,
        here: ls.some((l) => l.state === "is-current") || (!!next && ls.includes(next)),
        behind: o.filter((l) => !l.done && l.opens < (now || 0)).length,
        doneCount: d.length,
        avg: sc.length ? Math.round(100 * sc.reduce((a, s) => a + s.raw, 0) / sc.reduce((a, s) => a + s.total, 0)) : null,
      };
    }).filter((u) => u.ls.length > 0);
    return { ...p, lessons, openL, doneL, behind, avg, band, bandOf: bands.length, next, units };
  });
  const mine = !access.owner && resultsKnown && progs.length === 1 ? progs[0] : null;
  // Names here are written "Surname Firstname" (and may go on: "… qizi").
  const names = String(user.full_name || "").trim().split(/\s+/);
  const first = names[1] || names[0] || "";

  // The record and the way straight back in: beside the map on Home (a column
  // of its own on a wide screen), above the lessons on Practice.
  const record = mine && mine.openL.length > 0 ? (
        <section className="pr-exp__top">
          <div className="pr-exp__go">
            <span className="pr-exp__hi">Salom, {first || "friend"}!</span>
            <strong>
              {mine.next
                ? mine.next.state === "is-current" ? `Lesson ${mine.next.n} is today's homework` : `Lesson ${mine.next.n} is waiting for you`
                : "Every lesson so far is done. Brilliant!"}
            </strong>
            {mine.next && (
              <button className="pr-hero__go" onClick={() => onOpenLesson(mine.level, mine.next.n)}>
                {mine.next.state === "is-current" ? "Start" : "Continue"} · Lesson {mine.next.n} →
              </button>
            )}
          </div>
          <div className="pr-exp__stat"><span>Lessons done</span><b>{mine.doneL.length}/{mine.openL.length}</b>
            <i className="pr-exp__meter"><i style={{ width: `${(100 * mine.doneL.length) / mine.openL.length}%` }} /></i></div>
          <div className="pr-exp__stat"><span>Average</span><b>{mine.avg != null ? `${mine.avg}%` : "—"}</b>
            {mine.behind > 0 && <em>{mine.behind} to catch up</em>}</div>
          <div className="pr-exp__stat pr-exp__band">
            <span>Your band if you took IELTS now</span>
            <b>{mine.band != null ? fmtBand(mine.band) : "—"}</b>
            <em className="is-quiet">
              {mine.band != null
                ? `± 0.5 band · from your last ${mine.bandOf} paper${mine.bandOf === 1 ? "" : "s"}`
                : "Hand in a paper to see it"}
            </em>
          </div>
        </section>
  ) : null;

  const nav = [
    ["home", "Home", "🏠"],
    ...(access.practice ? [["practice", "Practice", "📝"]] : []),
    ...(access.mocks ? [["mock", "Mock exams", "🏆"]] : []),
    ["mistakes", "My mistakes", "🔁"],
    ["results", "Results", "📈"],
  ];
  const go = (id) => (id === "mistakes" ? onNotebook() : id === "results" ? onResults() : setSection(id));

  return (
    <div className="pr-lib pr-exp">
      {/* One bar on every library tab; a phone gets it as tabs along the bottom. */}
      <header className="pr-exp__bar">
        <span className="pr-exp__brand"><img src="/brand/icon-96.png" alt="" width="28" height="28" /> SMART Practice</span>
        <nav className="pr-exp__nav">
          {nav.map(([id, label, icon]) => (
            <button key={id} className={`pr-exp__link ${section === id ? "is-on" : ""}`} onClick={() => go(id)}>
              <i aria-hidden="true">{icon}</i><span>{label}</span>
            </button>
          ))}
        </nav>
        <span className="pr-exp__me">{first || user.full_name}<button className="pr-exp__out" onClick={onLogout}>Log out</button></span>
      </header>

      {!access.practice && !access.mocks && (
        <p className="pr-lib__gate">
          {access.level
            ? `Practice papers open up at Upper-Intermediate. Your group is on ${access.level} — keep going.`
            : "We couldn't load your class details, so we can't tell which papers are yours yet. "
              + "Please reload, or ask your teacher if it keeps happening."}
        </p>
      )}

      {section === "practice" && record}

      {/* Home: the journey, the Student App's course map for practice. */}
      {section === "home" && (
        <div className={`pr-exp__home ${record ? "has-record" : ""}`}>
          {record && <aside className="pr-exp__side">{record}</aside>}
          <div className="pr-exp__maps">
            {progs.map((p) => (
              <div key={p.level}>
                {progs.length > 1 && <h2 className="pr-lib__prog">{p.label}</h2>}
                <PracticeMap prog={p} onOpenLesson={onOpenLesson}
                  chipFor={(t) => <ScoreChip key={t.id} test={t} score={takenPractice.get(t.id)} />} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Practice: every lesson, unit by unit. */}
      {section === "practice" && progs.map(({ level, label, units }) => (
        <div key={level}>
          {progs.length > 1 && <h2 className="pr-lib__prog">{label}</h2>}
          {units.map((u) => (
            <div key={u.key} className="pr-exp__unitblock">
              {/* In its landscape's colour, as on the map; the Introduction and
                  Welcome to IELTS are where the journey starts. */}
              <h3 className="pr-exp__unith" style={{ "--tone": regionOf(chapterOf(u)).banner }}>
                <span>{u.no === "0" ? "Start" : u.exam ? "Exam" : `Unit ${u.no}`}</span>{u.title}
                <small>{regionOf(chapterOf(u)).name}</small>
                {u.open && <em>{u.doneCount}/{u.ls.length} done{u.avg != null ? ` · ${u.avg}%` : ""}</em>}</h3>
              <div className="pr-lib__grid pr-lib__grid--lessons">
                {u.ls.map((l) => <LessonCard key={l.n} lesson={l} level={level} takenPractice={takenPractice} onOpenLesson={onOpenLesson} />)}
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Mocks stay whole books: a mock is a sitting, not a lesson. */}
      {section === "mock" && (
        <div className="pr-lib__grid pr-lib__grid--books">
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
    </div>
  );
}

/* A unit as the course map's regions see it (CourseRegion.jsx). */
const chapterOf = (u) => ({
  kind: u.exam ? "exam" : "unit", no: /^\d+$/.test(u.no) ? Number(u.no) : 0, title: u.title, topic: u.topic,
  final: u.key === "final", state: "open", done: 0, total: 0, units: [],
});

/* One lesson as a card: its state on its face, a chip a paper, a bar of
 * papers done. */
function LessonCard({ lesson, level, takenPractice, onOpenLesson }) {
  const { n, tests, open, doneTests, done, state } = lesson;
  const mins = tests.reduce((s, t) => s + t.durationMin, 0);
  return (
    <button className={`pr-lesson ${state}`} disabled={!open} onClick={() => open && onOpenLesson(level, n)}>
      {state === "is-current" && <span className="pr-lesson__flag">Today</span>}
      <span className="pr-lesson__n">
        {n}
        {done && <i className="pr-lesson__tick">✓</i>}
      </span>
      <span className="pr-lesson__title">Lesson {n}</span>
      {open && (
        <span className="pr-lesson__scores">
          {tests.map((t) => <ScoreChip key={t.id} test={t} score={takenPractice.get(t.id)} />)}
        </span>
      )}
      <span className="pr-lesson__count">
        {!open ? "🔒 opens later"
          : done ? "Done"
            : doneTests.length ? `${doneTests.length} of ${tests.length} done`
              : state === "is-missed" ? "Not done yet"
                : `${mins} min`}
      </span>
      {open && tests.length > 1 && (
        <span className="pr-lesson__bar"><i style={{ width: `${(100 * doneTests.length) / tests.length}%` }} /></span>
      )}
    </button>
  );
}

/* One paper's result as a chip: 🎧 8/10, green from 80%, amber from 50%,
 * red below; a paper not yet handed in is a grey "to do". */
const pctTone = (raw, total) => {
  const p = total ? raw / total : 0;
  return p >= 0.8 ? "is-high" : p >= 0.5 ? "is-mid" : "is-low";
};
function ScoreChip({ test, score }) {
  const icon = test.module === "listening" ? "🎧" : "📖";
  if (!score) return <span className="pr-chip is-todo">{icon} to do</span>;
  if (score.raw == null || !score.total) return <span className="pr-chip is-high">{icon} ✓</span>;
  return <span className={`pr-chip ${pctTone(score.raw, score.total)}`}>{icon} {score.raw}/{score.total}</span>;
}

/* ─── One lesson, as a page of its own ───
 * Pre-IELTS lessons carry two short papers (a listening third and a reading
 * passage); IELTS lessons carry one full paper. Either way this is the page
 * a student lands on when their homework says "lesson 12". */
export function LessonPage({ level, label, n, tests, user, access, onBack, onOpenBrief, takenPractice }) {
  // The lesson wears its unit's landscape (CourseRegion.jsx): the same region
  // the map draws it in, so opening a lesson feels like stepping into it.
  const unit = unitsOf(level).find((u) => u.lessons.includes(Number(n)));
  const chapter = unit ? chapterOf(unit) : { kind: "unit", no: 1, title: "", state: "open", done: 0, total: 0, units: [] };
  const region = regionOf(chapter);
  const headRef = useRef(null);
  const [w, setW] = useState(900);
  useEffect(() => {
    const el = headRef.current;
    if (!el) return undefined;
    const m = () => setW(el.clientWidth || 900);
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const done = tests.filter((t) => takenPractice.has(t.id)).length;
  return (
    <div className="pr-lib pr-lp">
      <header className="pr-lp__head" ref={headRef} style={{ "--tone": region.banner }}>
        <div className="pr-lp__land"><CourseRegion chapter={chapter} width={w} height={200} first seed={Number(n) || 1} /></div>
        <div className="pr-lp__over">
          <button className="pr-lp__back" onClick={onBack}>← Back to the map</button>
          <div className="pr-lp__card">
            <span className="pr-lp__kicker">{label}{unit ? ` · ${unit.exam ? unit.title : `Unit ${unit.no}`} · ${region.name}` : ""}</span>
            <h1>Lesson {n}</h1>
            {unit && !unit.exam && <p>{unit.title}</p>}
            <span className="pr-lp__progress">{done} of {tests.length} paper{tests.length === 1 ? "" : "s"} done</span>
          </div>
        </div>
      </header>

      <div className="pr-lp__papers">
        {tests.map((t) => {
          const score = takenPractice.get(t.id);
          const isDone = takenPractice.has(t.id);
          const locked = !access.isOpen(t.id);
          const isChunk = /-(a|b|c|p[123])$/.test(t.id);
          const qs = t.sections.reduce((s, x) => s + x.questions.length, 0);
          return (
            <div className={`pr-lp__paper ${locked ? "is-locked" : ""} ${isDone ? "is-done" : ""}`} key={t.id} style={{ "--tone": region.banner }}>
              <span className="pr-lp__icon" aria-hidden="true">{t.module === "listening" ? "🎧" : "📖"}</span>
              <div className="pr-lp__body">
                <span className="pr-lp__mod">{t.module}</span>
                <strong>{isChunk ? t.title.split(" · ").slice(1).join(" · ") : t.title}</strong>
                <span className="pr-lp__meta">{t.durationMin} min · {qs} questions</span>
              </div>
              <div className="pr-lp__act">
                {locked
                  ? <span className="pr-lock-chip">🔒 not open yet</span>
                  : isDone
                    ? <>
                        {score?.total ? <ScoreChip test={t} score={score} /> : <span className="pr-chip is-high">✓ done</span>}
                        <span className="pr-lp__hint">Review it under My mistakes</span>
                      </>
                    : <button className="pr-lp__start" onClick={() => onOpenBrief(t.id)}>Start →</button>}
              </div>
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
const EMPTY_MAP = new Map();

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
        prompt: [s.passageTitle, s.instructions, s.passage,
          s.visualData && `Data in the visual (for checking the figures the candidate reports): ${s.visualData}`,
        ].filter(Boolean).join("\n\n"),
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
export function MockResultView({ outcome, onBack }) {
  const [showFb, setShowFb] = useState(false);
  // The writing paper of the sitting is marked too. This screen used to say
  // only "sent to your teacher for marking", so a student who sat a whole mock
  // never saw the band that had just been worked out for them — the single
  // paper screen showed it, this one did not.
  const marked = outcome.marked?.band != null ? outcome.marked : null;
  return (
    <div className="pr-result">
      <div className="pr-result__card">
        <span className="reg__done-icon">✓</span>
        <h2>{outcome.book.title} — complete</h2>
        {outcome.results.map((r) => (
          <div className="pr-mockline" key={r.test_id}>
            <span className="pr-mockline__mod">{r.module}</span>
            <span className="pr-mockline__time">{fmtTime(r.duration_seconds)}</span>
            {r.raw_score != null
              ? <span><strong>{r.raw_score}</strong> / {r.total}{r.band ? ` · Band ${fmtBand(r.band)}` : ""}</span>
              : r.module === "writing" && marked
                ? <span><strong>Band {fmtBand(marked.band)}</strong></span>
                : <span>not marked</span>}
          </div>
        ))}
        {marked && (
          <button className="pr-link" onClick={() => setShowFb(true)}>
            See my writing and feedback
          </button>
        )}
        {!outcome.saved && (
          <p className="pr-result__warn">
            Saved on this device — it will sync to the centre when the connection returns.
            Don't clear your browser data.
          </p>
        )}
        <button className="btn btn--primary" onClick={onBack}>Back to the library</button>
      </div>
      {showFb && marked && (
        <WritingFeedback band={marked.band} feedback={marked.feedback} onClose={() => setShowFb(false)} />
      )}
    </div>
  );
}

/* ─── Answer review ───
 * The review itself lives in PaperReview.jsx: the source beside the
 * questions, the answers marked on it, and the strip of numbered boxes
 * underneath. The notebook shows the same screen, so a paper reads the
 * same whether it was just handed in or opened again a month later.
 *
 * Mock papers used to be sealed here so an exam could be re-used across
 * intakes. Overruled: a student who has sat a paper should be able to
 * study from it.
 */

/* ─── Transcript: what the speakers said, revealed only after the paper
 * is finished. Kept for papers whose review does not show the source
 * panel; the panel above is the fuller view. ─── */
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
              <span className="pr-transcript__who">{l.s === "A" ? "Speaker A" : "Speaker B"}</span>
              <span className="pr-transcript__said">{l.t}</span>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── Result + history ─── */
export function ResultView({ result, test, onBack }) {
  const isWriting = result.raw_score == null;
  const [showFb, setShowFb] = useState(false);
  // Marking comes back with the submission, so a student who has just written
  // for an hour sees it here rather than having to go looking for it.
  const marked = result.marked?.band != null ? result.marked : null;
  const pct = isWriting ? null : Math.round((result.raw_score / result.total) * 100);
  const reviewable = !!test && !isWriting && !!result.answers;
  const time = fmtTime(result.duration_seconds);
  return (
    <div className="pr-result">
      <div className="pr-result__card">
        <span className="reg__done-icon">✓</span>
        <h2>{isWriting ? "Writing submitted" : "Test complete"}</h2>
        {isWriting ? (
          marked ? (
            <>
              <div className="pr-result__score">
                <strong>{fmtBand(marked.band)}</strong>
                <span className="pr-result__indic">your band</span>
              </div>
              <p>
                Marked against the four IELTS writing criteria.
                <br />See your essay with every mistake marked and explained.
              </p>
              <button className="pr-link" onClick={() => setShowFb(true)}>
                See my writing and feedback
              </button>
            </>
          ) : (
            <p>Your answers have been saved and will be marked by your teacher.</p>
          )
        ) : (
          <>
            <div className="pr-result__score">
              <strong>{result.raw_score}</strong> / {result.total}
            </div>
            <p>
              {pct}% correct{result.band ? ` · Band ${fmtBand(result.band)}` : ""}
              {time ? ` · ${time} spent` : ""}
            </p>
          </>
        )}
        {!result.saved && <p className="pr-result__warn">Saved on this device — will sync when the results table is set up.</p>}
        <div className="pr-result__actions">
          <button className="btn btn--primary" onClick={onBack}>Back to library</button>
        </div>
      </div>
      {/* The source on one side, the questions on the other — the same
          division the paper itself uses, so a student marking their mistakes
          reads it the way they read it in the exam. */}
      {reviewable && <PaperReview test={test} result={result} />}
      {showFb && marked && (
        <WritingFeedback band={marked.band} feedback={marked.feedback} onClose={() => setShowFb(false)} />
      )}
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
            // Reviewable = any paper whose content still exists and whose
            // answers were stored. Mocks included: a paper already sat is a
            // paper worth studying from.
            const reviewable = t && r.raw_score != null && r.answers;
            return (
              <div className="pr-test-row" key={i}>
                <div>
                  <strong>{t ? t.title : r.test_id}</strong>
                  <span>
                    {new Date(r.taken_at).toLocaleDateString()}
                    {r.raw_score != null
                      ? ` · ${r.raw_score}/${r.total}`
                      : r.ai_band != null
                        ? ` · Band ${fmtBand(r.ai_band)}`
                        : " · awaiting teacher review"}
                    {r.band ? ` · Band ${fmtBand(r.band)}` : ""}
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
/* A student who opens a paper from the Student App arrives with a pass after
 * '#' in the address (#handoff=...). It is read once, when this module loads,
 * and taken out of the address straight away, so it is not left in the
 * history or passed on with a copied link. See handoffStudent() in api.js. */
const takeHandoff = () => {
  if (typeof window === "undefined") return null;
  const m = /(?:^#|&)handoff=([^&]+)/.exec(window.location.hash || "");
  if (!m) return null;
  try { window.history.replaceState(null, "", window.location.pathname + window.location.search); } catch { /* keep going */ }
  try { return decodeURIComponent(m[1]); } catch { return null; }
};
const HANDOFF_PASS = takeHandoff();

export default function PracticeApp() {
  // A saved student without a live token is signed out: the database answers
  // only to the token (api.js), so the session would show nothing.
  const [user, setUser] = useState(() => {
    try {
      if (!hasSession()) { localStorage.removeItem(SESSION_KEY); return null; }
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch { return null; }
  });
  // Sent from the app: sign in as the student it names -- replacing whoever
  // last used this browser -- before anything is shown. A pass that does not
  // check out falls through to the usual sign-in.
  const [arriving, setArriving] = useState(() => !!HANDOFF_PASS);
  useEffect(() => {
    if (!HANDOFF_PASS) return undefined;
    let alive = true;
    handoffStudent(HANDOFF_PASS).then((s) => {
      if (!alive) return;
      if (s) login(s);
      setArriving(false);
    });
    return () => { alive = false; };
  }, []);   // eslint-disable-line react-hooks/exhaustive-deps
  // library | book | player | mock | result | mockresult | history | notebook
  const [view, setView] = useState(() => viewOfPath(window.location.pathname));
  const [section, setSection] = useState("home");   // which library tab
  const [remote, setRemote] = useState([]);
  // null until the group's level and lesson are known. Until then nothing
  // unlocks: a failed lookup must never be read as permission.
  const [context, setContext] = useState({ level: null, lessonNum: null });
  const [takenMocks, setTakenMocks] = useState(() => new Set());
  const [completedMocks, setCompletedMocks] = useState(() => new Set());
  // testId → { raw, total } for every practice paper handed in: a Map, so
  // "done?" is .has() as before and the lesson cards can show the score.
  const [takenPractice, setTakenPractice] = useState(() => new Map());
  // Whether the results have arrived. Until then (or if they cannot be read)
  // no lesson may be called missed and no catch-up count shown: an empty
  // record would paint every past lesson red.
  const [resultsKnown, setResultsKnown] = useState(false);

  // Uploaded papers are read with the student's token, so after sign-in.
  useEffect(() => { if (user) fetchRemoteTests().then(setRemote); }, [user?.username]);   // eslint-disable-line react-hooks/exhaustive-deps

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
  const usedPractice = access.owner ? EMPTY_MAP : takenPractice;

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
      const scores = new Map();
      for (const r of mine) {
        if (r.module === "attempt" || mockOf(r.test_id) || scores.has(r.test_id)) continue;
        // Every paper carries a band for the record's estimate: its own when it
        // is a full 40-question paper, otherwise its score scaled to 40 and read
        // off the same official table (a Pre-IELTS third has no band of its own).
        const band = r.band ?? (r.total && r.raw_score != null ? bandFor(Math.round((r.raw_score / r.total) * 40), 40, r.module) : null);
        scores.set(r.test_id, { raw: r.raw_score, total: r.total, band });
      }
      setTakenPractice(scores);
      setResultsKnown(rows !== null);
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
  const logout = () => { localStorage.removeItem(SESSION_KEY); endSession(); setUser(null); setView({ name: "library" }); };

  if (arriving) {
    return (
      <div className="pr-login">
        <div className="pr-login__card">
          <img src="/brand/icon-96.png" alt="" width="52" height="52" />
          <h1>Practice Platform</h1>
          <p>Signing you in from the Student App…</p>
        </div>
      </div>
    );
  }
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
      resultsKnown={access.owner || resultsKnown}
      onNotebook={() => setView({ name: "notebook" })}
      completedMocks={doneMocks}
      access={access}
      picked={section}
      setSection={setSection}
    />
  );
}
