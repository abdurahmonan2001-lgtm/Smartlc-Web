import { useEffect, useMemo, useRef, useState } from "react";
import { BOOKS, TESTS, testsForBook, getTest } from "./content.js";
import { loginStudent, saveResult, fetchResults } from "./api.js";

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

const norm = (s) =>
  String(s ?? "").trim().toLowerCase().replace(/[.,;:!?'"]/g, "").replace(/\s+/g, " ");

function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

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
    } catch {
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

/* ─── Library ─── */
function Library({ user, onStart, onLogout, onResults }) {
  const [openBook, setOpenBook] = useState(null);
  return (
    <div className="pr-lib">
      <header className="pr-lib__top">
        <span className="nav__logo">
          <img src="/brand/icon-96.png" alt="" width="34" height="34" />
          <span>Practice</span>
        </span>
        <div className="pr-lib__user">
          <button className="pr-link" onClick={onResults}>My results</button>
          <span>{user.full_name}</span>
          <button className="pr-link" onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="pr-lib__grid">
        {BOOKS.map((b) => {
          const tests = testsForBook(b.id);
          const has = tests.length > 0;
          return (
            <button
              className={`pr-book ${has ? "" : "pr-book--empty"} ${openBook === b.id ? "is-open" : ""}`}
              key={b.id}
              onClick={() => has && setOpenBook(openBook === b.id ? null : b.id)}
            >
              <span className="pr-book__cover">{b.short}</span>
              <span className="pr-book__title">{b.title}</span>
              <span className="pr-book__count">{has ? `${tests.length} test${tests.length > 1 ? "s" : ""}` : "coming soon"}</span>
            </button>
          );
        })}
      </div>

      {openBook && (
        <div className="pr-lib__tests">
          {testsForBook(openBook).map((t) => (
            <div className="pr-test-row" key={t.id}>
              <div>
                <strong>{t.title}</strong>
                <span>{t.module} · {t.durationMin} min · {t.sections.reduce((n, s) => n + s.questions.length, 0)} questions</span>
              </div>
              <button className="btn btn--primary" onClick={() => onStart(t.id)}>Start</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Player (Inspera-style) ─── */
function Player({ test, user, onExit, onFinished }) {
  const all = useMemo(() => test.sections.flatMap((s, si) => s.questions.map((q) => ({ ...q, si }))), [test]);
  const [si, setSi] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flags, setFlags] = useState({});
  const [left, setLeft] = useState(test.durationMin * 60);
  const [confirm, setConfirm] = useState(false);
  const [split, setSplit] = useState(50); // passage pane width, %
  const startRef = useRef(Date.now());
  const finishedRef = useRef(false);
  const mainRef = useRef(null);
  const qRefs = useRef({});

  const section = test.sections[si];

  const finish = async () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    // essays are stored for teacher review, everything else auto-scores
    const scorable = all.filter((qq) => qq.type !== "essay");
    let raw = 0;
    for (const qq of scorable) {
      const given = norm(answers[qq.n]);
      if (qq.type === "mcq" || qq.type === "select") {
        if (given === norm(qq.answer) || given.startsWith(norm(qq.answer) + " ")) raw++;
      } else if (given && given === norm(qq.answer)) raw++;
    }
    const total = scorable.length;
    const result = {
      student_username: user.username,
      test_id: test.id,
      module: test.module,
      raw_score: total > 0 ? raw : null,
      total,
      band: bandFor(raw, total, test.module),
      answers,
      duration_seconds: Math.round((Date.now() - startRef.current) / 1000),
      taken_at: new Date().toISOString(),
    };
    let saved = false;
    try { saved = await saveResult(result); } catch { saved = false; }
    if (!saved) {
      const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]");
      pending.push(result);
      localStorage.setItem(PENDING_KEY, JSON.stringify(pending));
    }
    onFinished({ ...result, saved });
  };

  useEffect(() => {
    const iv = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => { if (left === 0) finish(); }, [left]);

  // draggable divider between passage and questions
  const startDrag = (e) => {
    e.preventDefault();
    const main = mainRef.current;
    const move = (ev) => {
      const rect = main.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.min(72, Math.max(28, pct)));
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const jumpTo = (qq) => {
    const go = () => qRefs.current[qq.n]?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (qq.si !== si) { setSi(qq.si); setTimeout(go, 60); }
    else go();
  };

  const setAns = (n, v) => setAnswers((a) => ({ ...a, [n]: v }));

  return (
    <div className="pr-player">
      <header className="pr-player__top">
        <span className="pr-player__title">{test.title}</span>
        {test.sections.length > 1 && (
          <span className="pr-player__sections">
            {test.sections.map((s, i) => (
              <button key={i} className={i === si ? "is-cur" : ""} onClick={() => setSi(i)}>
                {i + 1}
              </button>
            ))}
          </span>
        )}
        <span className={`pr-player__timer ${left < 300 ? "is-low" : ""}`}>⏱ {fmtTime(left)}</span>
        <span className="pr-player__user">{user.full_name}</span>
        <button className="pr-player__finish" onClick={() => setConfirm(true)}>Finish test</button>
      </header>

      <div
        className="pr-player__main pr-player__main--split"
        ref={mainRef}
        style={{ "--split": `${split}%` }}
      >
        <div className="pr-pane pr-pane--passage">
          <p className="pr-pane__instructions">{section.instructions}</p>
          {section.audioSrc && (
            <div className="pr-audio">
              <strong>🎧 {section.passageTitle || "Listening"}</strong>
              <audio controls src={section.audioSrc} preload="auto" />
              <p>In the real exam the recording plays only once. Play it when you are ready.</p>
            </div>
          )}
          {!section.audioSrc && section.passageTitle && <h2>{section.passageTitle}</h2>}
          {section.passage && section.passage.split("\n\n").map((para, i) => <p key={i}>{para}</p>)}
          {section.image && (
            <img className="pr-pane__image" src={section.image} alt="Task diagram" loading="lazy" />
          )}
        </div>

        <div
          className="pr-divider"
          onPointerDown={startDrag}
          role="separator"
          aria-orientation="vertical"
          title="Drag to resize"
        >
          <span />
        </div>

        <div className="pr-pane pr-pane--question">
          {section.questions.map((q) => (
            <div className="pr-q" key={q.n} ref={(el) => { qRefs.current[q.n] = el; }}>
              <div className="pr-q__head">
                <span className="pr-q__num">Question {q.n}</span>
                <button
                  className={`pr-q__flag ${flags[q.n] ? "is-on" : ""}`}
                  onClick={() => setFlags((f) => ({ ...f, [q.n]: !f[q.n] }))}
                >
                  ⚑ {flags[q.n] ? "Flagged" : "Flag"}
                </button>
              </div>
              <p className="pr-q__prompt">{q.prompt}</p>
              {q.note && <p className="pr-q__note">{q.note}</p>}

              {(q.type === "tfng" || q.type === "ynng") && (
                <div className="pr-q__options">
                  {(q.type === "tfng" ? ["TRUE", "FALSE", "NOT GIVEN"] : ["YES", "NO", "NOT GIVEN"]).map((o) => (
                    <label className={`pr-opt ${answers[q.n] === o ? "is-sel" : ""}`} key={o}>
                      <input type="radio" name={`q${q.n}`} checked={answers[q.n] === o} onChange={() => setAns(q.n, o)} />
                      {o}
                    </label>
                  ))}
                </div>
              )}
              {(q.type === "mcq" || q.type === "select") && (
                <div className="pr-q__options">
                  {q.options.map((o) => {
                    const letter = o.slice(0, 1);
                    return (
                      <label className={`pr-opt ${answers[q.n] === letter ? "is-sel" : ""}`} key={o}>
                        <input type="radio" name={`q${q.n}`} checked={answers[q.n] === letter} onChange={() => setAns(q.n, letter)} />
                        {o}
                      </label>
                    );
                  })}
                </div>
              )}
              {q.type === "gap" && (
                <input
                  className="pr-q__input"
                  placeholder="Type your answer"
                  value={answers[q.n] || ""}
                  onChange={(e) => setAns(q.n, e.target.value)}
                />
              )}
              {q.type === "essay" && (() => {
                const words = (answers[q.n] || "").trim().split(/\s+/).filter(Boolean).length;
                return (
                  <>
                    <textarea
                      className="pr-essay"
                      placeholder="Write your answer here…"
                      value={answers[q.n] || ""}
                      onChange={(e) => setAns(q.n, e.target.value)}
                    />
                    <div className={`pr-essay__count ${words >= (q.minWords || 0) ? "is-ok" : ""}`}>
                      {words} words{q.minWords ? ` · minimum ${q.minWords}` : ""}
                    </div>
                  </>
                );
              })()}
            </div>
          ))}
        </div>
      </div>

      <footer className="pr-palette">
        {all.map((qq) => (
          <button
            key={qq.n}
            className={`pr-palette__q ${answers[qq.n] ? "is-done" : ""} ${flags[qq.n] ? "is-flag" : ""}`}
            onClick={() => jumpTo(qq)}
          >
            {qq.n}
          </button>
        ))}
      </footer>

      {confirm && (
        <div className="pr-modal" onClick={() => setConfirm(false)}>
          <div className="pr-modal__card" onClick={(e) => e.stopPropagation()}>
            <h3>Finish the test?</h3>
            <p>
              {all.filter((qq) => answers[qq.n]).length} of {all.length} questions answered.
              {all.some((qq) => flags[qq.n]) ? " You still have flagged questions." : ""}
            </p>
            <div className="pr-modal__row">
              <button className="btn btn--band" onClick={() => setConfirm(false)}>Keep working</button>
              <button className="btn btn--primary" onClick={finish}>Submit</button>
            </div>
          </div>
        </div>
      )}

      <button className="pr-player__exit" onClick={onExit} title="Exit without saving">✕</button>
    </div>
  );
}

/* ─── Result + history ─── */
function ResultView({ result, onBack }) {
  const isWriting = result.raw_score == null;
  const pct = isWriting ? null : Math.round((result.raw_score / result.total) * 100);
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
            <p>{pct}% correct{result.band ? ` · Band ${result.band.toFixed(1)}` : ""}</p>
          </>
        )}
        {!result.saved && <p className="pr-result__warn">Saved on this device — will sync when the results table is set up.</p>}
        <button className="btn btn--primary" onClick={onBack}>Back to library</button>
      </div>
    </div>
  );
}

function History({ user, onBack }) {
  const [rows, setRows] = useState(null);
  useEffect(() => {
    (async () => {
      const remote = (await fetchResults(user.username)) || [];
      const pending = JSON.parse(localStorage.getItem(PENDING_KEY) || "[]")
        .filter((r) => r.student_username === user.username);
      setRows([...pending.map((r) => ({ ...r, pending: true })), ...remote]);
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
            return (
              <div className="pr-test-row" key={i}>
                <div>
                  <strong>{t ? t.title : r.test_id}</strong>
                  <span>
                    {new Date(r.taken_at).toLocaleDateString()}
                    {r.raw_score != null ? ` · ${r.raw_score}/${r.total}` : " · awaiting teacher review"}
                    {r.band ? ` · Band ${Number(r.band).toFixed(1)}` : ""}
                    {r.pending ? " · not synced" : ""}
                  </span>
                </div>
                <span className="band-chip">
                  {r.raw_score != null ? `${Math.round((r.raw_score / r.total) * 100)}%` : "✍"}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ─── Root ─── */
export default function PracticeApp() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; } catch { return null; }
  });
  const [view, setView] = useState({ name: "library" }); // library | player | result | history

  const login = (u) => { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); setUser(u); };
  const logout = () => { localStorage.removeItem(SESSION_KEY); setUser(null); setView({ name: "library" }); };

  if (!user) return <Login onLogin={login} />;

  if (view.name === "player") {
    const test = getTest(view.testId);
    return (
      <Player
        test={test}
        user={user}
        onExit={() => setView({ name: "library" })}
        onFinished={(result) => setView({ name: "result", result })}
      />
    );
  }
  if (view.name === "result") return <ResultView result={view.result} onBack={() => setView({ name: "library" })} />;
  if (view.name === "history") return <History user={user} onBack={() => setView({ name: "library" })} />;

  return (
    <Library
      user={user}
      onLogout={logout}
      onResults={() => setView({ name: "history" })}
      onStart={(testId) => setView({ name: "player", testId })}
    />
  );
}
