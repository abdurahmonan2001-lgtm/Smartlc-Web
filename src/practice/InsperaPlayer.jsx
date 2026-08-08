import { useEffect, useMemo, useRef, useState } from "react";
import "./inspera.css";

// Faithful replica of the Inspera CD-IELTS player (fjord theme) as seen on
// demo-ielts.inspera.com — white 56px header with candidate bar, section
// rubric band, draggable split view, order-number boxes, part tabs with
// sub-question squares, deliver/check button, options overlay, listening
// play-gate with once-only audio, and the select-text Note/Highlight popup.

/* ─ icons (FontAwesome-4 glyphs the player uses, inlined as SVG) ─ */
const I = {
  wifi: <svg viewBox="0 0 640 512" width="17" height="16" fill="currentColor" aria-hidden="true"><path d="M320 416a48 48 0 1 0 0-96 48 48 0 0 0 0 96zM108 246c56-52 131-84 212-84s156 32 212 84l45-46C505 134 417 96 320 96S135 134 63 200l45 46zm106 108c28-26 66-42 106-42s78 16 106 42l45-46c-40-37-94-60-151-60s-111 23-151 60l45 46z"/></svg>,
  bell: <svg viewBox="0 0 448 512" width="17" height="18" fill="currentColor" aria-hidden="true"><path d="M224 480a56 56 0 0 0 56-56H168a56 56 0 0 0 56 56zm215-135c-21-23-61-57-61-169 0-85-60-153-140-170V48a32 32 0 1 0-64 0v-42C94 23 34 91 34 176c0 112-40 146-61 169-7 7-9 16-9 23 0 17 13 32 33 32h382c20 0 33-15 33-32 0-7-2-16-9-23zM97 336c23-25 49-71 49-160 0-61 43-112 100-112s100 51 100 112c0 89 26 135 49 160H97z" transform="translate(30,0)"/></svg>,
  bars: <svg viewBox="0 0 448 512" width="18" height="18" fill="currentColor" aria-hidden="true"><path d="M0 96c0-9 7-16 16-16h416c9 0 16 7 16 16v32c0 9-7 16-16 16H16c-9 0-16-7-16-16V96zm0 160c0-9 7-16 16-16h416c9 0 16 7 16 16v32c0 9-7 16-16 16H16c-9 0-16-7-16-16v-32zm448 160v32c0 9-7 16-16 16H16c-9 0-16-7-16-16v-32c0-9 7-16 16-16h416c9 0 16 7 16 16z"/></svg>,
  note: <svg viewBox="0 0 448 512" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M448 348.1V80c0-26.5-21.5-48-48-48H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h268.1c12.7 0 24.9-5.1 33.9-14.1l83.9-83.9c9-9 14.1-21.2 14.1-33.9zM320 432v-96h96l-96 96zM48 80h352v208h-96c-26.5 0-48 21.5-48 48v96H48V80z"/></svg>,
  volume: <svg viewBox="0 0 576 512" width="14" height="13" fill="currentColor" aria-hidden="true"><path d="M215 71L126 160H24c-13 0-24 11-24 24v144c0 13 11 24 24 24h102l89 89c15 15 41 5 41-17V88c0-22-26-32-41-17zm233 185c0-44-25-83-61-102-12-6-26-2-32 10s-2 26 9 32c21 11 36 34 36 60s-15 49-36 60c-12 6-16 21-9 32 6 12 21 16 32 10 37-19 61-58 61-102zm79 0c0-74-40-142-104-177-12-6-26-2-33 10-6 12-2 26 10 33 49 27 79 77 79 134s-31 108-79 134c-12 6-16 21-10 33 6 12 21 16 33 10 64-36 104-103 104-177z"/></svg>,
  check: <svg viewBox="0 0 512 512" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M173.9 439.4l-166.4-166.4c-10-10-10-26.2 0-36.2l36.2-36.2c10-10 26.2-10 36.2 0L192 312.7 432.1 72.6c10-10 26.2-10 36.2 0l36.2 36.2c10 10 10 26.2 0 36.2L210.1 439.4c-10 10-26.2 10-36.2 0z"/></svg>,
  arrowsH: <svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M377 137l87 87c10 10 10 25 0 34l-87 87c-15 15-41 5-41-17v-56H176v56c0 22-26 32-41 17l-87-87c-10-10-10-25 0-34l87-87c15-15 41-5 41 17v56h160v-56c0-22 26-32 41-17z"/></svg>,
  plane: <svg viewBox="0 0 512 512" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M440 6L23 209c-16 8-15 31 2 37l111 41 32 130c4 17 25 22 37 10l60-61 106 79c13 9 31 2 34-14L512 30c3-19-16-33-33-24zM165 275L409 87 217 300l4 79-32-113z"/></svg>,
  adjust: <svg viewBox="0 0 512 512" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448V56c110 0 200 90 200 200s-90 200-200 200z"/></svg>,
  zoomIn: <svg viewBox="0 0 512 512" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M304 192v32c0 7-5 12-12 12h-56v56c0 7-5 12-12 12h-32c-7 0-12-5-12-12v-56h-56c-7 0-12-5-12-12v-32c0-7 5-12 12-12h56v-56c0-7 5-12 12-12h32c7 0 12 5 12 12v56h56c7 0 12 5 12 12zm201 284l-27 27c-9 9-24 9-34 0l-100-99c-4-5-7-11-7-17v-16C301 402 258 416 208 416 93 416 0 323 0 208S93 0 208 0s208 93 208 208c0 50-14 93-45 129h16c6 0 12 3 17 7l100 100c9 9 9 24 1 32zM344 208c0-75-61-136-136-136S72 133 72 208s61 136 136 136 136-61 136-136z"/></svg>,
  prev: <svg viewBox="0 0 320 512" width="22" height="34" fill="currentColor" aria-hidden="true"><path d="M34 239L228 45c9-9 24-9 34 0l22 22c9 9 9 24 0 34L128 256l156 155c9 9 9 24 0 34l-22 22c-9 9-24 9-34 0L34 273c-10-10-10-25 0-34z"/></svg>,
  next: <svg viewBox="0 0 320 512" width="22" height="34" fill="currentColor" aria-hidden="true"><path d="M286 273L92 467c-9 9-24 9-34 0l-22-22c-9-9-9-24 0-34l156-155L36 101c-9-9-9-24 0-34l22-22c9-9 24-9 34 0l194 194c10 10 10 25 0 34z"/></svg>,
  close: <svg viewBox="0 0 384 512" width="20" height="20" fill="currentColor" aria-hidden="true"><path d="M231 256l114-114c12-12 12-31 0-43l-22-22c-12-12-31-12-43 0L166 191 52 77c-12-12-31-12-43 0L-13 99c-12 12-12 31 0 43l114 114L-13 370c-12 12-12 31 0 43l22 22c12 12 31 12 43 0l114-114 114 114c12 12 31 12 43 0l22-22c12-12 12-31 0-43L231 256z" transform="translate(26,0)"/></svg>,
};

const fmtLeft = (sec) => {
  const m = Math.ceil(sec / 60);
  return m >= 60 ? `${Math.floor(m / 60)} hour${Math.floor(m / 60) > 1 ? "s" : ""} ${m % 60} minutes left` : `${m} minute${m !== 1 ? "s" : ""} left`;
};

const letterFor = (i) => "ABCDEFGHIJKLMN"[i];
const boxLetters = (g) => (g.meta.letters || (g.meta.box || []).map((_, i) => letterFor(i)).join(""));

// Standard IELTS rubric line for each run of same-type questions, matching
// how Inspera groups them under a "Questions X–Y" headline.
const groupRubric = (g) => {
  if (g.meta.rubric) return g.meta.rubric;
  const { type, note } = g.meta;
  const range = g.qs.length > 1 ? `Questions ${g.qs[0].n}–${g.qs[g.qs.length - 1].n}` : `Question ${g.qs[0].n}`;
  if (type === "tfng") return "Do the following statements agree with the information given in the text? Choose TRUE if the statement agrees with the information, FALSE if the statement contradicts the information, or NOT GIVEN if there is no information on this.";
  if (type === "ynng") return "Do the following statements agree with the claims of the writer? Choose YES if the statement agrees with the claims of the writer, NO if the statement contradicts the claims of the writer, or NOT GIVEN if it is impossible to say what the writer thinks about this.";
  if (type === "multiselect") {
    const count = ["TWO", "THREE", "FOUR"][g.qs.length - 2] || "TWO";
    return `Choose ${count} letters, A–${letterFor((g.meta.options || []).length - 1)}.`;
  }
  if (type === "match") {
    const L = boxLetters(g);
    return `Choose the correct answer and write the correct letter, ${L[0]}–${L[L.length - 1]}, next to ${range}.`;
  }
  if (type === "label") {
    const L = boxLetters(g);
    return `Label the ${g.meta.labelKind || "plan"} below. Write the correct letter, ${L[0]}–${L[L.length - 1]}, next to ${range}.`;
  }
  if (type === "gap" && g.meta.table) return `Complete the table below. Write ${note || "ONE WORD ONLY"} for each answer.`;
  if (type === "gap" && g.meta.notes) return `Complete the notes below. Write ${note || "ONE WORD ONLY"} for each answer.`;
  if (type === "gap") return `Complete the sentences below. Write ${note || "ONE WORD ONLY"} for each answer.`;
  if (type === "mcq" || type === "select") return "Choose the correct answer.";
  return "";
};

/* Groups a section's questions into blocks. Questions sharing an explicit
 * `group` id form one interactive block (multi-select pair, matching run,
 * labelled map, table/notes completion); otherwise contiguous same-type
 * questions group under one headline as before. */
const groupQuestions = (questions) => {
  const groups = [];
  for (const q of questions) {
    const g = groups[groups.length - 1];
    const sameExplicit = g && q.group && g.gid === q.group;
    const sameImplicit = g && !q.group && !g.gid && g.type === q.type && q.type !== "essay" &&
      !["multiselect", "match", "label"].includes(q.type);
    if (sameExplicit || sameImplicit) g.qs.push(q);
    else groups.push({ type: q.type, gid: q.group, meta: q, note: q.note, qs: [q] });
  }
  return groups;
};

/* Lettered option box shown above matching/labelling runs (Inspera style). */
function OptionBox({ g }) {
  if (!g.meta.box) return null;
  return (
    <div className="ins-box">
      {g.meta.boxTitle && <div className="ins-box__title">{g.meta.boxTitle}</div>}
      {g.meta.box.map((text, i) => (
        <div className="ins-box__row" key={i}>
          <strong>{letterFor(i)}</strong>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}

/* Splits table-cell / notes-line text on {{n}} markers and renders the
 * inline numbered answer boxes exactly where the markers sit. */
function GapText({ text, answers, setAns, activeN, setActiveN }) {
  return text.split(/(\{\{\d+\}\})/).map((part, i) => {
    const m = part.match(/^\{\{(\d+)\}\}$/);
    if (!m) return <span key={i}>{part}</span>;
    const n = +m[1];
    return (
      <span key={i} className="ins-inlinegap">
        <span className={`ins-num ${activeN === n ? "is-active" : ""}`}>{n}</span>
        <input
          className="ins-gap"
          type="text"
          value={answers[n] || ""}
          onFocus={() => setActiveN(n)}
          onChange={(e) => setAns(n, e.target.value)}
          aria-label={`Answer ${n}`}
        />
      </span>
    );
  });
}

/* Inline gap sentence: the ______ in the prompt becomes the answer box. */
function GapPrompt({ q, value, onChange }) {
  const parts = q.prompt.split(/_{3,}/);
  return (
    <span className="ins-text">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <input
              className="ins-gap"
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              aria-label={`Answer ${q.n}`}
            />
          )}
        </span>
      ))}
    </span>
  );
}

export default function InsperaPlayer({ test, user, onExit, onFinish }) {
  const all = useMemo(() => test.sections.flatMap((s, si) => s.questions.map((q) => ({ ...q, si }))), [test]);
  const [si, setSi] = useState(0);
  const [answers, setAnswers] = useState({});
  const [activeN, setActiveN] = useState(all[0]?.n);
  const [page, setPage] = useState("test");          // test | toc
  const [overlay, setOverlay] = useState(null);      // options | messages | notes | confirm
  const [split, setSplit] = useState(50);
  const [left, setLeft] = useState(test.durationMin * 60);
  const [textSize, setTextSize] = useState(0);       // 0 small 1 medium 2 large
  const [contrast, setContrast] = useState(false);
  const [audioGate, setAudioGate] = useState(test.module === "listening");
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [notes, setNotes] = useState([]);
  const [popup, setPopup] = useState(null);          // {x, y, text}
  const mainRef = useRef(null);
  const qRefs = useRef({});
  const audioRef = useRef(null);
  const playedRef = useRef({});
  const finishedRef = useRef(false);

  const section = test.sections[si];
  const hasStimulus = !!(section.passage || section.passageTitle) && test.module !== "listening";
  const attempted = (sIdx) => test.sections[sIdx].questions.filter((q) => String(answers[q.n] ?? "").trim()).length;

  /* ─ timer ─ */
  useEffect(() => {
    const iv = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    if (left === 0 && !finishedRef.current) { finishedRef.current = true; onFinish(answers); }
  }, [left]);   // eslint-disable-line react-hooks/exhaustive-deps

  /* ─ once-only audio per section ─ */
  const startSectionAudio = (idx) => {
    const src = test.sections[idx].audioSrc;
    if (!src || playedRef.current[src]) return;
    playedRef.current[src] = true;
    const audio = new Audio(src);
    audioRef.current = audio;
    audio.play().then(() => setAudioPlaying(true)).catch(() => setAudioPlaying(false));
    audio.onended = () => setAudioPlaying(false);
  };
  const passGate = () => { setAudioGate(false); startSectionAudio(si); };
  useEffect(() => () => { audioRef.current?.pause(); }, []);

  const selectPart = (idx) => {
    setSi(idx); setPage("test");
    setActiveN(test.sections[idx].questions[0]?.n);
    if (!audioGate) startSectionAudio(idx);
    mainRef.current?.scrollTo({ top: 0 });
  };

  const jumpTo = (n, sIdx) => {
    if (sIdx !== si) { setSi(sIdx); setPage("test"); if (!audioGate) startSectionAudio(sIdx); }
    setActiveN(n);
    setTimeout(() => qRefs.current[n]?.scrollIntoView({ block: "center" }), 50);
  };

  const step = (dir) => {
    if (page === "toc") { if (dir < 0) { setPage("test"); } return; }
    const idx = all.findIndex((q) => q.n === activeN);
    const nxt = all[idx + dir];
    if (nxt) jumpTo(nxt.n, nxt.si);
    else if (dir > 0) setPage("toc");
  };

  const setAns = (n, v) => setAnswers((a) => ({ ...a, [n]: v }));

  /* ─ split divider drag ─ */
  const startDrag = (e) => {
    e.preventDefault();
    const rect = mainRef.current.getBoundingClientRect();
    const move = (ev) => setSplit(Math.min(95, Math.max(5, ((ev.clientX - rect.left) / rect.width) * 100)));
    const up = () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", up); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  /* ─ select-text popup: Note / Highlight (CSS Custom Highlight API) ─ */
  const hlRef = useRef(null);
  useEffect(() => {
    if (typeof window.Highlight === "function" && CSS.highlights) {
      hlRef.current = new window.Highlight();
      CSS.highlights.set("ins-marker", hlRef.current);
    }
    return () => CSS.highlights?.delete("ins-marker");
  }, []);
  const onMouseUp = () => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) { setPopup(null); return; }
    const r = sel.getRangeAt(0).getBoundingClientRect();
    setPopup({ x: Math.max(8, r.left), y: Math.max(60, r.top - 62), text: sel.toString() });
  };
  const doHighlight = () => {
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && hlRef.current) hlRef.current.add(sel.getRangeAt(0).cloneRange());
    setPopup(null); sel?.removeAllRanges();
  };
  const doNote = () => {
    setNotes((ns) => [...ns, { text: popup.text, at: new Date() }]);
    setPopup(null); window.getSelection()?.removeAllRanges();
    setOverlay("notes");
  };

  const confirmFinish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    audioRef.current?.pause();
    onFinish(answers);
  };

  const zoomCls = ["ins-zoom-small", "ins-zoom-medium", "ins-zoom-large"][textSize];

  /* ══ render ══ */
  return (
    <div className={`ins ${zoomCls} ${contrast ? "ins-contrast" : ""}`}>

      {/* ─ header ─ */}
      <header className="ins-header">
        <div className="ins-header__logo" onDoubleClick={onExit} title="">
          <img src="/brand/icon-96.png" alt="" />
          <span>Smart&nbsp;LC</span>
        </div>
        <div className="ins-header__central">
          <div className="ins-header__name">{user.full_name}</div>
          <div className="ins-header__sub">
            {audioPlaying
              ? <span>{I.volume}<span className="ins-header__subtitle">Audio is Playing</span></span>
              : <span className="ins-header__subtitle">{fmtLeft(left)}</span>}
          </div>
        </div>
        <div className="ins-header__right">
          <div className="ins-header__conn" title="Connected">{I.wifi}</div>
          <button className="ins-header__btn" aria-label="Messages" onClick={() => setOverlay("messages")}>{I.bell}</button>
          <button className="ins-header__btn" aria-label="Options" onClick={() => setOverlay("options")}>{I.bars}</button>
          <button className="ins-header__btn" aria-label="Show notes" onClick={() => setOverlay("notes")}>{I.note}</button>
        </div>
      </header>

      {/* ─ TOC / submission page ─ */}
      {page === "toc" && (
        <>
          <div className="ins-tocbar">
            <p>Click next to continue</p>
            <button className="ins-btn-black" onClick={() => setOverlay("confirm")}>{I.plane}Next</button>
          </div>
          <div className="ins-content ins-content--toc">
            <h2 className="ins-toc__title">Table of contents</h2>
            {test.sections.map((s, i) => (
              <button className="ins-toc__row" key={i} onClick={() => selectPart(i)}>
                <span>Part {i + 1}</span>
                <span className="ins-toc__count">{attempted(i)} of {s.questions.length} questions attempted</span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* ─ test page ─ */}
      {page === "test" && (
        <div className="ins-content" onMouseUp={onMouseUp}>
          <section className="ins-rubric">
            <h2>Part {si + 1}</h2>
            <p>{section.instructions}</p>
          </section>

          <div className="ins-splitwrap" ref={mainRef}>
            {hasStimulus && (
              <>
                <div className="ins-stimulus" style={{ width: `${split}%` }}>
                  {section.passageTitle && <h2 className="ins-stimulus__title">{section.passageTitle}</h2>}
                  {section.passage && section.passage.split("\n\n").map((p, i) => <p key={i}>{p}</p>)}
                  {section.image && <img className="ins-stimulus__img" src={section.image} alt="" />}
                </div>
                <div className="ins-divider">
                  <div className="ins-divider__line" />
                  <button className="ins-divider__btn" onPointerDown={startDrag} aria-label="Resize panels">{I.arrowsH}</button>
                </div>
              </>
            )}

            <div className="ins-questions" style={hasStimulus ? { width: `${100 - split}%` } : undefined}>
              {section.image && !hasStimulus && <img className="ins-stimulus__img" src={section.image} alt="" />}
              {groupQuestions(section.questions).map((g, gi) => (
                <div className="ins-group" key={gi}>
                  {g.type !== "essay" && (
                    <div className="ins-group__rubric">
                      <h3 className="ins-headline">
                        {g.qs.length > 1 ? `Questions ${g.qs[0].n}–${g.qs[g.qs.length - 1].n}` : `Question ${g.qs[0].n}`}
                      </h3>
                      <p>{groupRubric(g)}</p>
                    </div>
                  )}

                  {/* multi-select pair: one checkbox list answering 2+ numbers */}
                  {g.type === "multiselect" && (() => {
                    const ns = g.qs.map((q) => q.n);
                    const chosen = ns.map((n) => answers[n]).filter(Boolean);
                    const toggle = (letter) => {
                      const set = new Set(chosen);
                      if (set.has(letter)) set.delete(letter);
                      else if (set.size < ns.length) set.add(letter);
                      const arr = [...set].sort();
                      ns.forEach((n, i) => setAns(n, arr[i] || ""));
                    };
                    return (
                      <div
                        className="ins-item"
                        ref={(el) => ns.forEach((n) => { qRefs.current[n] = el; })}
                        onPointerDown={() => setActiveN(ns.find((n) => !answers[n]) ?? ns[0])}
                      >
                        <p className="ins-prompt">
                          {ns.map((n) => (
                            <span key={n} className={`ins-num ${activeN === n ? "is-active" : ""}`}>{n}</span>
                          ))}
                          <span className="ins-text">{g.meta.prompt}</span>
                        </p>
                        <ul className="ins-options">
                          {(g.meta.options || []).map((o, i) => {
                            const letter = letterFor(i);
                            return (
                              <li key={o}>
                                <input
                                  type="checkbox"
                                  id={`g${ns[0]}-${letter}`}
                                  checked={chosen.includes(letter)}
                                  onChange={() => toggle(letter)}
                                />
                                <label htmlFor={`g${ns[0]}-${letter}`}><span>{o}</span></label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })()}

                  {/* matching / labelling: shared lettered box + a dropdown per item */}
                  {(g.type === "match" || g.type === "label") && (
                    <div
                      className="ins-item"
                      ref={(el) => g.qs.forEach((q) => { qRefs.current[q.n] = el; })}
                    >
                      {g.type === "label" && g.meta.image && (
                        <img className="ins-map" src={g.meta.image} alt="Plan to label" />
                      )}
                      <OptionBox g={g} />
                      {g.qs.map((q) => (
                        <p className="ins-prompt ins-matchrow" key={q.n}>
                          <span className={`ins-num ${activeN === q.n ? "is-active" : ""}`}>{q.n}</span>
                          <span className="ins-text">{q.prompt}</span>
                          <select
                            className="ins-select"
                            value={answers[q.n] || ""}
                            onFocus={() => setActiveN(q.n)}
                            onChange={(e) => setAns(q.n, e.target.value)}
                            aria-label={`Answer ${q.n}`}
                          >
                            <option value=""></option>
                            {boxLetters(g).split("").map((L) => <option key={L} value={L}>{L}</option>)}
                          </select>
                        </p>
                      ))}
                    </div>
                  )}

                  {/* table / notes completion: rendered layout with inline gaps */}
                  {g.type === "gap" && (g.meta.table || g.meta.notes) && (
                    <div
                      className="ins-item"
                      ref={(el) => g.qs.forEach((q) => { qRefs.current[q.n] = el; })}
                    >
                      {g.meta.table && (
                        <table className="ins-table">
                          {g.meta.table.title && <caption>{g.meta.table.title}</caption>}
                          {g.meta.table.headers && (
                            <thead><tr>{g.meta.table.headers.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
                          )}
                          <tbody>
                            {g.meta.table.rows.map((row, ri) => (
                              <tr key={ri}>
                                {row.map((cell, ci) => (
                                  <td key={ci}><GapText text={cell} answers={answers} setAns={setAns} activeN={activeN} setActiveN={setActiveN} /></td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                      {g.meta.notes && (
                        <div className="ins-notes">
                          {g.meta.notes.title && <div className="ins-notes__title">{g.meta.notes.title}</div>}
                          {g.meta.notes.lines.map((line, li) => (
                            <p key={li}><GapText text={line} answers={answers} setAns={setAns} activeN={activeN} setActiveN={setActiveN} /></p>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {["multiselect", "match", "label"].includes(g.type) || (g.type === "gap" && (g.meta.table || g.meta.notes)) ? null : g.qs.map((q) => (
                    <div
                      className="ins-item"
                      key={q.n}
                      ref={(el) => { qRefs.current[q.n] = el; }}
                      onFocusCapture={() => setActiveN(q.n)}
                      onPointerDown={() => setActiveN(q.n)}
                    >
                      {(q.type === "tfng" || q.type === "ynng" || q.type === "mcq" || q.type === "select") && (
                        <>
                          <p className="ins-prompt">
                            <span className={`ins-num ${activeN === q.n ? "is-active" : ""}`}>{q.n}</span>
                            <span className="ins-text">{q.prompt}</span>
                          </p>
                          <ul className="ins-options" role="radiogroup">
                            {(q.type === "tfng" ? ["TRUE", "FALSE", "NOT GIVEN"]
                              : q.type === "ynng" ? ["YES", "NO", "NOT GIVEN"]
                              : q.options
                            ).map((o) => {
                              const val = (q.type === "mcq" || q.type === "select") ? o.slice(0, 1) : o;
                              return (
                                <li key={o}>
                                  <input
                                    type="radio"
                                    id={`q${q.n}-${val}`}
                                    name={`q${q.n}`}
                                    checked={answers[q.n] === val}
                                    onChange={() => setAns(q.n, val)}
                                  />
                                  <label htmlFor={`q${q.n}-${val}`}><span>{o}</span></label>
                                </li>
                              );
                            })}
                          </ul>
                        </>
                      )}

                      {q.type === "gap" && (
                        <p className="ins-prompt">
                          <span className={`ins-num ${activeN === q.n ? "is-active" : ""}`}>{q.n}</span>
                          <GapPrompt q={q} value={answers[q.n]} onChange={(v) => setAns(q.n, v)} />
                        </p>
                      )}

                      {q.type === "essay" && (() => {
                        const words = String(answers[q.n] || "").trim().split(/\s+/).filter(Boolean).length;
                        return (
                          <div className="ins-essaywrap">
                            <textarea
                              className="ins-essay"
                              value={answers[q.n] || ""}
                              onChange={(e) => setAns(q.n, e.target.value)}
                              aria-label="The text will be saved as you type."
                            />
                            <span className="ins-words">Words: {words}</span>
                          </div>
                        );
                      })()}
                    </div>
                  ))}
                  <div className="ins-group__footer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─ prev / next ─ */}
      <div className="ins-nav">
        <button className="ins-nav__btn" aria-label="Previous" onClick={() => step(-1)}>{I.prev}</button>
        <button className="ins-nav__btn" aria-label="Next" onClick={() => step(1)}>{I.next}</button>
      </div>

      {/* ─ footer ─ */}
      <footer className="ins-footer">
        <div className="ins-footer__parts">
          {test.sections.map((s, i) => {
            const selected = i === si && page === "test";
            return (
              <div className={`ins-part ${selected ? "is-selected" : ""}`} key={i}>
                <button className="ins-part__label" onClick={() => selectPart(i)}>
                  <span>Part</span> <span>{i + 1}</span>
                  {!selected && <span className="ins-part__count">{attempted(i)} of {s.questions.length}</span>}
                </button>
                {selected && s.questions.length > 1 && (
                  <div className="ins-part__squares">
                    {s.questions.map((q) => (
                      <button
                        key={q.n}
                        className={`ins-sq ${activeN === q.n ? "is-active" : ""}`}
                        onClick={() => jumpTo(q.n, i)}
                      >
                        {q.n}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <button
          className={`ins-deliver ${page === "toc" ? "is-active" : ""}`}
          aria-label="Review your answers"
          onClick={() => setPage("toc")}
        >
          {I.check}
        </button>
      </footer>

      {/* ─ listening play gate ─ */}
      {audioGate && (
        <div className="ins-overlay-dark">
          <div className="ins-gate">
            <p>You will be listening to an audio clip during this test.<br />
              You will not be permitted to pause or rewind the audio while answering the questions.</p>
            <p>To continue, click <strong>Play</strong>.</p>
            <button className="ins-btn-black" onClick={passGate}>Play</button>
          </div>
        </div>
      )}

      {/* ─ select-text popup ─ */}
      {popup && (
        <div className="ins-adder" style={{ left: popup.x, top: popup.y }}>
          <button onClick={doNote}><em>+</em><span>Note</span></button>
          <button onClick={doHighlight}><em>✎</em><span>Highlight</span></button>
          <button onClick={() => setPopup(null)}><em>▣</em><span>Keep text selected</span></button>
        </div>
      )}

      {/* ─ full-screen overlays ─ */}
      {overlay && (
        <div className="ins-overlay">
          <div className="ins-overlay__top">
            <h2>{overlay === "options" ? "Options" : overlay === "messages" ? "Messages" : overlay === "notes" ? "Notes" : "Submit"}</h2>
            <button className="ins-overlay__close" onClick={() => setOverlay(null)}>
              {I.close}<span>Close</span>
            </button>
          </div>

          {overlay === "options" && (
            <div className="ins-overlay__col">
              <button className="ins-option ins-option--main" onClick={() => { setOverlay(null); setPage("toc"); }}>
                {I.plane}<span>Go to submission page</span>
              </button>
              <div className="ins-option-group">
                <button className="ins-option" onClick={() => setContrast((c) => !c)}>
                  {I.adjust}<span>Contrast</span>
                </button>
                <button className="ins-option" onClick={() => setTextSize((t) => (t + 1) % 3)}>
                  {I.zoomIn}<span>Text size</span>
                </button>
              </div>
            </div>
          )}

          {overlay === "messages" && (
            <div className="ins-overlay__col">
              <p className="ins-empty">You have no messages.</p>
            </div>
          )}

          {overlay === "notes" && (
            <div className="ins-overlay__col">
              {notes.length === 0
                ? <p className="ins-empty">You have no notes. Select text in the test and choose “Note” to create one.</p>
                : notes.map((n, i) => (
                    <div className="ins-note" key={i}>
                      <blockquote>“{n.text.slice(0, 160)}”</blockquote>
                      <button onClick={() => setNotes((ns) => ns.filter((_, j) => j !== i))}>Delete</button>
                    </div>
                  ))}
            </div>
          )}

          {overlay === "confirm" && (
            <div className="ins-overlay__col">
              <p className="ins-empty">
                You are about to submit your answers. {all.filter((q) => String(answers[q.n] ?? "").trim()).length} of {all.length} questions attempted.
                You will not be able to change your answers after submitting.
              </p>
              <button className="ins-option ins-option--main" onClick={confirmFinish}>
                {I.plane}<span>Submit</span>
              </button>
              <div className="ins-option-group">
                <button className="ins-option" onClick={() => setOverlay(null)}>
                  <span>Return to the test</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
