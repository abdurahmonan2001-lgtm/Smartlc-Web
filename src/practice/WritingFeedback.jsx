// The band, the four criteria, the essay with every mistake marked on it,
// and how to fix each one.
//
// Its own module because both the result screens and the mistake notebook
// show it, and having the notebook import it from PracticeApp would close a
// cycle — PracticeApp already imports the notebook.
import { useEffect, useRef, useState } from "react";
import { fmtBand } from "./review.jsx";

export const CRITERIA = [
  ["task", "Task achievement"],
  ["coherence", "Coherence & cohesion"],
  ["lexical", "Lexical resource"],
  ["grammar", "Grammar"],
];
/** The student's essay with every mistake marked on it.
 *
 *  Splitting on the quotes rather than replacing them keeps the writing
 *  exactly as it was typed — nothing is rewritten on screen, the errors are
 *  simply underlined in place, numbered to match the list underneath. */
function MarkedEssay({ text, corrections }) {
  if (!text) return null;
  const marks = [];
  for (let i = 0; i < corrections.length; i++) {
    const q = corrections[i].quote;
    // Search past marks already placed, so a phrase occurring twice marks
    // twice rather than the same spot twice over.
    const from = marks.length ? marks[marks.length - 1].end : 0;
    const at = text.indexOf(q, from);
    if (at < 0) continue;
    marks.push({ start: at, end: at + q.length, i });
  }
  const parts = [];
  let cursor = 0;
  for (const m of marks) {
    if (m.start > cursor) parts.push(text.slice(cursor, m.start));
    parts.push(
      <mark className={`pr-mk pr-mk--${corrections[m.i].kind}`} key={m.i}>
        {text.slice(m.start, m.end)}
        <sup>{m.i + 1}</sup>
      </mark>,
    );
    cursor = m.end;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <div className="pr-fb__essay">{parts}</div>;
}

/** The question each task set, recovered from the paper itself — matched to
 *  the task numbering the grader used (the section's position in the paper,
 *  exactly as essayTasks() in PracticeApp assigns it).
 *
 *  Without this a student rereading a marked essay could see their own words
 *  and every correction on them, but not the question they were answering. */
function taskPrompts(test) {
  const out = new Map();
  test?.sections?.forEach((s, i) => {
    if (!s.questions?.some((q) => q.type === "essay")) return;
    out.set(i + 1, {
      title: s.passageTitle || s.title,
      instructions: s.instructions || "",
      passage: s.passage || "",
      image: s.image || null,
    });
  });
  return out;
}

/** Every mistake in one task, numbered to match the marks on the essay. */
function Fixes({ corrections }) {
  if (!corrections?.length) return null;
  return (
    <>
      <h4>Every mistake, and how to fix it</h4>
      <ol className="pr-fb__fixes">
        {corrections.map((c, i) => (
          <li key={i}>
            <span className={`pr-fb__kind pr-fb__kind--${c.kind}`}>{c.kind}</span>
            <span className="pr-fb__wrong">{c.quote}</span>
            <span className="pr-fb__arrow">→</span>
            <span className="pr-fb__right">{c.fix}</span>
            <p>{c.why}</p>
          </li>
        ))}
      </ol>
    </>
  );
}

/** The rubric, the data and the picture — what the student was asked to do. */
function TaskPrompt({ p }) {
  if (!p) return <p className="pr-empty">The task this paper set is not stored.</p>;
  return (
    <div className="pr-fb__prompt">
      {p.instructions && <p className="pr-fb__rubric">{p.instructions}</p>}
      {p.passage.split(/\n\n+/).filter(Boolean).map((para, i) => <p key={i}>{para}</p>)}
      {p.image && <img className="pr-fb__img" src={p.image} alt="" />}
    </div>
  );
}

/* ─── A writing paper as a screen of its own ───
 *
 * The same shape as a reading paper: what was set on one side, what the
 * student produced on the other, each column scrolling by itself. Writing was
 * the odd one out — a single column two thousand pixels long, so the chart a
 * student was describing scrolled out of sight before their description of it
 * came into view.
 *
 * The four criteria and the examiner's summary are NOT here. They are figures
 * about the paper rather than the paper, and they live in Analytics with the
 * rest of the numbers.
 */
function WritingPage({ band, tasks, prompts }) {
  const [i, setI] = useState(0);
  const promptRef = useRef(null);
  const workRef = useRef(null);
  const t = tasks[Math.min(i, tasks.length - 1)];
  useEffect(() => {
    if (promptRef.current) promptRef.current.scrollTop = 0;
    if (workRef.current) workRef.current.scrollTop = 0;
  }, [i]);
  if (!t) return <p className="pr-empty">This paper has not been marked yet.</p>;

  return (
    <div className="pr-fb pr-fb--page">
      <div className="pr-split">
        <div className="pr-source" ref={promptRef}>
          <div className="pr-source__head">
            <strong>The task you were set</strong>
            <span>Task {t.task}{t.words ? ` · you wrote ${t.words} words` : ""}</span>
          </div>
          <TaskPrompt p={prompts.get(t.task)} />
        </div>
        <div className="pr-review" ref={workRef}>
          <div className="pr-review__bar">
            <strong>
              Your writing · band {fmtBand(t.band)},
              {" "}{t.corrections?.length || 0} to work on
            </strong>
          </div>
          <MarkedEssay text={t.essay} corrections={t.corrections || []} />
          <Fixes corrections={t.corrections} />
        </div>
      </div>

      {/* The strip along the foot is the paper's navigation, the way the
          numbered boxes are on a reading paper — so it appears only when
          there are two tasks to move between. With one it was a box saying
          what the column header beside it already said. */}
      {tasks.length > 1 && (
        <div className="pr-boxes">
          <div className="pr-boxes__head">
            <strong>Both tasks</strong>
            <span className="pr-boxes__legend">
              Band {fmtBand(band)} overall — Task 2 counts double
            </span>
          </div>
          <div className="pr-tasks">
            {tasks.map((x, j) => (
              <button key={x.task} type="button"
                className={`pr-tsk ${j === i ? "is-active" : ""}`}
                onClick={() => setI(j)}>
                <strong>Task {x.task}</strong>
                <span>band {fmtBand(x.band)} · {x.corrections?.length || 0} to fix</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="pr-fb__note">
        This paper is marked by software against the IELTS band descriptors. It is careful, but it
        is not an examiner and it can be wrong — if a correction here looks wrong to you, ask your
        teacher rather than assuming it is right.
      </p>
    </div>
  );
}

/** A writing paper's band, the task it set, the student's own essay with the
 *  mistakes marked on it, and an explanation of each one.
 *
 *  `variant="page"` gives the notebook a paper of its own — two columns, no
 *  modal shell, and the criteria left to Analytics. The dialog that opens
 *  straight after a mock keeps all of it: that is the first and sometimes the
 *  only time a student reads the mark. */
export function WritingFeedback({ band, feedback, onClose, test = null, variant = "modal" }) {
  const tasks = feedback?.tasks || [];
  const prompts = taskPrompts(test);
  if (variant === "page") return <WritingPage band={band} tasks={tasks} prompts={prompts} />;

  return (
    <div className="pr-fb" role="dialog" aria-modal="true">
    <div className="pr-fb__panel">
      <header className="pr-fb__top">
        <div>
          <strong>Band {fmtBand(band)}</strong>
          <span>Marked against the four IELTS writing criteria</span>
        </div>
        <button className="pr-link" onClick={onClose}>Close</button>
      </header>

      {tasks.map((t) => {
        const p = prompts.get(t.task);
        return (
          <section className="pr-fb__task" key={t.task}>
            <h3>Task {t.task} — band {fmtBand(t.band)} <em>({t.words} words)</em></h3>
            <div className="pr-fb__crit">
              {CRITERIA.map(([k, label]) => (
                <span key={k}><em>{label}</em><strong>{t.criteria[k]}</strong></span>
              ))}
            </div>

            {p && <><h4>The task you were set</h4><TaskPrompt p={p} /></>}

            {t.essay && (
              <>
                <h4>Your writing, with the mistakes marked</h4>
                <MarkedEssay text={t.essay} corrections={t.corrections || []} />
              </>
            )}
            <Fixes corrections={t.corrections} />

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
        );
      })}
      <p className="pr-fb__note">
        This paper is marked by software against the IELTS band descriptors. It is careful, but it
        is not an examiner and it can be wrong — if a correction here looks wrong to you, ask your
        teacher rather than assuming it is right.
      </p>
    </div>
    </div>
  );
}
