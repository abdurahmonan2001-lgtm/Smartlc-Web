import { useState, useEffect, useRef } from "react";

// Public placement test (smartlc.uz/placement).
// The browser holds NO answer key and NO database credentials: questions come
// from /api/placement-start stripped of their answers, and /api/placement-submit
// scores them, AI-grades the writing and stores the result server-side. The
// only thing this page ever learns is the candidate's own outcome.

const G = "#009472";
const D = "#1F283B";

const LEVEL_COLORS = {
  Beginner: "#f5a623",
  Elementary: "#3b82f6",
  "Pre-Intermediate": G,
  Intermediate: G,
  "Upper-Intermediate": "#8b5cf6",
  "IELTS Foundation": "#0369a1",
};

function formatPhone(val) {
  const digits = val.replace(/\D/g, "").slice(0, 12);
  if (digits.length === 0) return "";
  let out = "+998";
  if (digits.length > 3) out += " (" + digits.slice(3, 5);
  if (digits.length > 5) out += ") " + digits.slice(5, 8);
  if (digits.length > 8) out += "-" + digits.slice(8, 10);
  if (digits.length > 10) out += "-" + digits.slice(10, 12);
  return out;
}

const card = {
  background: "#fff", borderRadius: "16px", padding: "22px",
  border: "1px solid #e4e8e7", boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
};
const label = {
  fontSize: "11px", fontWeight: 700, color: "#475569",
  textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: "6px",
};

function OptionBtn({ letter, text, selected, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: "13px 16px", borderRadius: "12px",
      border: `2px solid ${selected ? G : "#e4e8e7"}`,
      background: selected ? `${G}10` : "#F7FAF9",
      textAlign: "left", fontSize: "14.5px", fontWeight: selected ? 700 : 500,
      color: selected ? G : D, cursor: "pointer", width: "100%",
      display: "flex", alignItems: "center", gap: "12px", transition: "all .15s",
    }}>
      {letter && (
        <span style={{
          width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
          border: `2px solid ${selected ? G : "#e4e8e7"}`, background: selected ? G : "#fff",
          color: selected ? "#fff" : "#94a3b8", fontSize: "12px", fontWeight: 800,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>{letter}</span>
      )}
      {text}
    </button>
  );
}

function Progress({ current, total, section }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", gap: "12px" }}>
      <span style={{ fontSize: "13px", fontWeight: 700, color: G }}>{section}</span>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ height: "6px", width: "120px", background: "#e4e8e7", borderRadius: "6px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${(current / total) * 100}%`, background: G, borderRadius: "6px", transition: "width .3s" }} />
        </div>
        <span style={{ fontSize: "12px", color: "#64748b", whiteSpace: "nowrap" }}>{current} / {total}</span>
      </div>
    </div>
  );
}

export default function PlacementTest() {
  const [step, setStep] = useState(0);           // 0 info · 1 grammar · 2 reading · 3 writing · 4 results
  const [bank, setBank] = useState(null);
  const [loadErr, setLoadErr] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [honey, setHoney] = useState("");        // honeypot — hidden from humans
  const [gAns, setGAns] = useState({});
  const [rAns, setRAns] = useState({});
  const [writing, setWriting] = useState("");
  const [qi, setQi] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);
  const submitted = useRef(false);

  useEffect(() => { document.title = "Placement Test · Smart Learning Centre"; }, []);

  const start = async () => {
    if (!fullName.trim() || phone.replace(/\D/g, "").length < 9) return;
    setBusy(true); setError("");
    try {
      const r = await fetch("/api/placement-start", { method: "POST" });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Could not start the test.");
      setBank(j); setStep(1); setQi(0);
    } catch (e) {
      setLoadErr(e.message || "Could not start the test. Please try again.");
    }
    setBusy(false);
  };

  const finish = async (skipWriting) => {
    if (submitted.current) return;
    submitted.current = true;
    setBusy(true); setError("");
    try {
      const r = await fetch("/api/placement-submit", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: bank.token, fullName: fullName.trim(), phone,
          grammarAnswers: gAns, readingAnswers: rAns,
          writing: skipWriting ? "" : writing, skipWriting: !!skipWriting,
          website: honey,
        }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Could not submit your test.");
      setResults(j); setStep(4);
    } catch (e) {
      setError(e.message || "Could not submit — please try again.");
      submitted.current = false;   // allow a genuine retry
    }
    setBusy(false);
  };

  const shell = (children) => (
    <div style={{ minHeight: "100vh", background: "#F7FAF9", fontFamily: "'DM Sans',system-ui,sans-serif" }}>
      <div style={{ background: D, padding: "18px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <a href="/" style={{ color: "rgba(255,255,255,.75)", fontSize: "13px", textDecoration: "none", fontWeight: 600 }}>← Smart LC</a>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: "15px", marginLeft: "auto" }}>Placement Test</span>
      </div>
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "22px 16px 60px" }}>{children}</div>
    </div>
  );

  // ── STEP 0 — details ──────────────────────────────────────────────────────
  if (step === 0) return shell(
    <>
      <h1 style={{ fontSize: "26px", fontWeight: 800, color: D, marginBottom: "6px" }}>Check your English level</h1>
      <p style={{ fontSize: "14.5px", color: "#475569", marginBottom: "18px", lineHeight: 1.6 }}>
        A free 45-minute test: 50 grammar questions, a reading text with 10 questions, and one short writing task.
        You get your recommended level immediately, and our team will call you to talk about groups.
      </p>
      <div style={{ ...card, marginBottom: "14px" }}>
        <div style={{ marginBottom: "14px" }}>
          <label style={label}>Full name *</label>
          <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Ism va familiya"
            style={{ width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: "10px", border: "1.5px solid #e4e8e7", fontSize: "16px", outline: "none", background: "#F7FAF9", color: D, fontFamily: "inherit" }} />
        </div>
        <div>
          <label style={label}>Phone number *</label>
          <input value={phone} onChange={(e) => setPhone(formatPhone(e.target.value))} placeholder="+998 (90) 123-45-67" inputMode="numeric"
            style={{ width: "100%", boxSizing: "border-box", padding: "13px 14px", borderRadius: "10px", border: "1.5px solid #e4e8e7", fontSize: "16px", outline: "none", background: "#F7FAF9", color: D, fontFamily: "inherit" }} />
          <div style={{ fontSize: "11.5px", color: "#94a3b8", marginTop: "5px" }}>We only use this to share your result and call you about groups.</div>
        </div>
        {/* honeypot — off-screen, never shown to a human */}
        <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={honey} onChange={(e) => setHoney(e.target.value)}
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }} />
      </div>
      <div style={{ ...card, background: `${G}08`, borderColor: `${G}25`, marginBottom: "16px" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: G, marginBottom: "10px" }}>What's in the test</div>
        {[["Grammar & Vocabulary", "50 questions"], ["Reading", "10 questions"], ["Writing", "1 email · AI graded"]].map(([a, b]) => (
          <div key={a} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(0,148,114,.1)", fontSize: "13.5px", color: D }}>
            <span>{a}</span><span style={{ color: G, fontWeight: 700 }}>{b}</span>
          </div>
        ))}
      </div>
      {loadErr && <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: "10px", padding: "11px 14px", fontSize: "13.5px", color: "#dc2626", marginBottom: "12px" }}>⚠️ {loadErr}</div>}
      <button onClick={start} disabled={busy || !fullName.trim() || phone.replace(/\D/g, "").length < 9}
        style={{ width: "100%", padding: "15px", borderRadius: "12px", border: "none", color: "#fff", fontSize: "15px", fontWeight: 700, fontFamily: "inherit",
          background: !busy && fullName.trim() && phone.replace(/\D/g, "").length >= 9 ? G : "#cbd5d1",
          cursor: !busy && fullName.trim() ? "pointer" : "default" }}>
        {busy ? "Loading…" : "Start the test →"}
      </button>
    </>
  );

  // ── STEP 1 — grammar ──────────────────────────────────────────────────────
  if (step === 1 && bank) {
    const q = bank.grammar[qi];
    const last = qi === bank.grammar.length - 1;
    const goNext = () => {
      if (!last) return setQi(qi + 1);
      const blank = bank.grammar.filter((x) => !gAns[x.id]).length;
      if (blank && !window.confirm(`You have ${blank} unanswered question${blank > 1 ? "s" : ""}. Unanswered questions count as incorrect. Continue to Reading?`)) return;
      setStep(2); setQi(0);
    };
    return shell(
      <>
        <Progress current={qi + 1} total={bank.grammar.length} section="Grammar & Vocabulary" />
        <div style={{ ...card, marginBottom: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "10px" }}>Question {qi + 1} of {bank.grammar.length}</div>
          <p style={{ fontSize: "17px", fontWeight: 700, color: D, lineHeight: 1.45, marginBottom: "18px" }}>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {q.options.map((opt, i) => (
              <OptionBtn key={opt} letter={"ABCD"[i]} text={opt} selected={gAns[q.id] === opt}
                onClick={() => setGAns((p) => ({ ...p, [q.id]: opt }))} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {qi > 0 && <button onClick={() => setQi(qi - 1)} style={{ padding: "13px 18px", borderRadius: "12px", border: "1.5px solid #e4e8e7", background: "#fff", color: "#475569", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>←</button>}
          <button onClick={goNext} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "none", background: gAns[q.id] ? G : "#64748b", color: "#fff", fontSize: "14.5px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: gAns[q.id] ? 1 : 0.75 }}>
            {last ? "Go to Reading →" : gAns[q.id] ? "Next →" : "Skip →"}
          </button>
        </div>
      </>
    );
  }

  // ── STEP 2 — reading ──────────────────────────────────────────────────────
  if (step === 2 && bank) {
    const q = bank.reading[qi];
    const last = qi === bank.reading.length - 1;
    const goNext = () => {
      if (!last) return setQi(qi + 1);
      const blank = bank.reading.filter((x) => !rAns[x.id]).length;
      if (blank && !window.confirm(`You have ${blank} unanswered question${blank > 1 ? "s" : ""}. Unanswered questions count as incorrect. Continue to Writing?`)) return;
      setStep(3);
    };
    return shell(
      <>
        <Progress current={qi + 1} total={bank.reading.length} section="Reading" />
        <div style={{ ...card, marginBottom: "12px", maxHeight: "230px", overflowY: "auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>Read the text</div>
          {bank.passage.split("\n\n").map((p, i) => (
            <p key={i} style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.7, marginBottom: "10px" }}>{p}</p>
          ))}
        </div>
        <div style={{ ...card, marginBottom: "14px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
            {q.options.length === 2 ? "True or False?" : "Choose the best answer"} · Q{qi + 1}
          </div>
          <p style={{ fontSize: "16px", fontWeight: 700, color: D, marginBottom: "14px", lineHeight: 1.45 }}>{q.q}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {q.options.map((opt) => (
              <OptionBtn key={opt} text={opt} selected={rAns[q.id] === opt}
                onClick={() => setRAns((p) => ({ ...p, [q.id]: opt }))} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          {qi > 0 && <button onClick={() => setQi(qi - 1)} style={{ padding: "13px 18px", borderRadius: "12px", border: "1.5px solid #e4e8e7", background: "#fff", color: "#475569", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>←</button>}
          <button onClick={goNext} style={{ flex: 1, padding: "13px", borderRadius: "12px", border: "none", background: rAns[q.id] ? G : "#64748b", color: "#fff", fontSize: "14.5px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", opacity: rAns[q.id] ? 1 : 0.75 }}>
            {last ? "Go to Writing →" : rAns[q.id] ? "Next →" : "Skip →"}
          </button>
        </div>
      </>
    );
  }

  // ── STEP 3 — writing ──────────────────────────────────────────────────────
  if (step === 3 && bank) {
    const words = writing.trim().split(/\s+/).filter(Boolean).length;
    return shell(
      <>
        <h2 style={{ fontSize: "21px", fontWeight: 800, color: D, marginBottom: "4px" }}>Writing task</h2>
        <p style={{ fontSize: "13.5px", color: "#475569", marginBottom: "14px" }}>This counts toward your placement, and an IELTS-level recommendation requires it.</p>
        <div style={{ ...card, marginBottom: "14px" }}>
          <p style={{ fontSize: "15.5px", fontWeight: 700, color: D, lineHeight: 1.5, marginBottom: "14px" }}>{bank.writingPrompt}</p>
          <textarea value={writing} onChange={(e) => setWriting(e.target.value)} rows={10} placeholder="Write your email here…"
            style={{ width: "100%", boxSizing: "border-box", padding: "14px", borderRadius: "12px", border: "1.5px solid #e4e8e7", background: "#F7FAF9", color: D, fontSize: "15px", outline: "none", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "12px" }}>
            <span style={{ color: "#94a3b8" }}>{words} words</span>
            <span style={{ color: words >= 50 ? G : "#94a3b8" }}>Aim for 50+ words</span>
          </div>
        </div>
        {error && <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: "10px", padding: "11px 14px", fontSize: "13.5px", color: "#dc2626", marginBottom: "12px" }}>⚠️ {error}</div>}
        {busy && <div style={{ background: `${G}10`, border: `1px solid ${G}25`, borderRadius: "12px", padding: "13px", fontSize: "13.5px", color: G, fontWeight: 600, marginBottom: "12px" }}>Checking your answers and grading your writing…</div>}
        <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
          <button onClick={() => finish(false)} disabled={busy}
            style={{ padding: "15px", borderRadius: "12px", border: "none", background: busy ? "#cbd5d1" : G, color: "#fff", fontSize: "15px", fontWeight: 700, cursor: busy ? "default" : "pointer", fontFamily: "inherit" }}>
            {busy ? "Processing…" : "Submit test ✓"}
          </button>
          <button onClick={() => { if (window.confirm("Skip the writing task? Writing improves placement accuracy, and IELTS-level placement requires it.")) finish(true); }} disabled={busy}
            style={{ padding: "13px", borderRadius: "12px", border: "1.5px solid #e4e8e7", background: "#fff", color: "#475569", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Skip writing & submit
          </button>
        </div>
      </>
    );
  }

  // ── STEP 4 — results ──────────────────────────────────────────────────────
  if (step === 4 && results) {
    const lc = LEVEL_COLORS[results.level] || G;
    return shell(
      <>
        <div style={{ background: `linear-gradient(135deg, ${D}, ${lc})`, borderRadius: "18px", padding: "34px 20px", textAlign: "center", marginBottom: "16px" }}>
          <div style={{ fontSize: "46px", marginBottom: "8px" }}>🎉</div>
          <h1 style={{ fontSize: "25px", fontWeight: 800, color: "#fff", marginBottom: "4px" }}>Test complete!</h1>
          <p style={{ fontSize: "14.5px", color: "rgba(255,255,255,.75)" }}>Well done, {results.firstName}!</p>
        </div>
        <div style={{ ...card, textAlign: "center", marginBottom: "14px" }}>
          <div style={{ fontSize: "12px", fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>Recommended level</div>
          <div style={{ fontSize: "32px", fontWeight: 800, color: lc, marginBottom: "8px" }}>{results.level}</div>
          <div style={{ fontSize: "12.5px", color: "#64748b" }}>Overall weighted score: <strong style={{ color: D }}>{results.composite}%</strong></div>
        </div>
        <div style={{ ...card, marginBottom: "14px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700, color: D, marginBottom: "14px" }}>Score breakdown</div>
          {[["Grammar & Vocabulary", results.grammarScore, results.grammarTotal, D],
            ["Reading", results.readingScore, results.readingTotal, "#3b82f6"],
            ["Writing", results.writingScore, 10, G]].map(([lbl, sc, mx, col]) => (
            <div key={lbl} style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "13px" }}>
                <span style={{ fontWeight: 600, color: D }}>{lbl}</span>
                <span style={{ fontWeight: 800, color: col }}>{sc ?? "—"} / {mx}</span>
              </div>
              <div style={{ height: "6px", background: "#eef1f0", borderRadius: "6px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${((sc ?? 0) / mx) * 100}%`, background: col, borderRadius: "6px", transition: "width .8s ease" }} />
              </div>
            </div>
          ))}
        </div>
        {results.writingFeedback && results.writingFeedback !== "No writing submitted." && (
          <div style={{ ...card, background: `${G}08`, borderColor: `${G}20`, marginBottom: "14px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, color: G, marginBottom: "6px" }}>AI writing feedback</div>
            <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>{results.writingFeedback}</p>
          </div>
        )}
        <div style={{ ...card, textAlign: "center" }}>
          <p style={{ fontSize: "13.5px", color: "#475569", lineHeight: 1.6, marginBottom: "12px" }}>
            Your result has been sent to our team — we'll call you shortly to find the right group. 📞
          </p>
          <a href="/" style={{ display: "inline-block", padding: "12px 22px", borderRadius: "12px", background: D, color: "#fff", fontSize: "14px", fontWeight: 700, textDecoration: "none" }}>Back to the website</a>
        </div>
      </>
    );
  }

  return shell(<div style={{ textAlign: "center", padding: "40px", color: "#64748b" }}>Loading…</div>);
}
