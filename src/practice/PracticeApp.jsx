import { useEffect, useRef, useState } from "react";
import { BOOKS, TESTS, testsForBook, getTest } from "./content.js";
import { loginStudent, saveResult, fetchResults } from "./api.js";
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

const norm = (s) =>
  String(s ?? "").trim().toLowerCase().replace(/[.,;:!?'"]/g, "").replace(/\s+/g, " ");

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

/* ─── Player: the Inspera-replica UI plus scoring/saving on finish ─── */
function Player({ test, user, onExit, onFinished }) {
  const startRef = useRef(Date.now());
  const finishedRef = useRef(false);

  const finish = async (answers) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    const all = test.sections.flatMap((s) => s.questions);
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

  return <InsperaPlayer test={test} user={user} onExit={onExit} onFinish={finish} />;
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
