// The band, the four criteria, the essay with every mistake marked on it,
// and how to fix each one.
//
// Its own module because both the result screens and the mistake notebook
// show it, and having the notebook import it from PracticeApp would close a
// cycle — PracticeApp already imports the notebook.
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

/** A writing paper's band, the student's own essay with the mistakes marked
 *  on it, and an explanation of each one. */
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
            <strong>Band {Number(band).toFixed(1)}</strong>
            <span>Marked against the four IELTS writing criteria</span>
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

            {t.essay && (
              <>
                <h4>Your writing, with the mistakes marked</h4>
                <MarkedEssay text={t.essay} corrections={t.corrections || []} />
              </>
            )}
            {t.corrections?.length > 0 && (
              <>
                <h4>Every mistake, and how to fix it</h4>
                <ol className="pr-fb__fixes">
                  {t.corrections.map((c, i) => (
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
            )}

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
          This paper is marked by software against the IELTS band descriptors. It is careful, but it
          is not an examiner and it can be wrong — if a correction here looks wrong to you, ask your
          teacher rather than assuming it is right.
        </p>
      </div>
    </div>
  );
}
