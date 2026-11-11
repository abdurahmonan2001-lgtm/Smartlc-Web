// One finished paper, opened to study from.
//
// The same screen serves two places — straight after a paper is handed in,
// and later from the mistake notebook — so a student never has to learn two
// layouts for the same thing. It carries:
//
//   · the paper's own analytics (score, band, blanks, part-by-part, type-by-type)
//   · the source beside the questions, the answers marked on it
//   · every question as a numbered box, green or red, that jumps to its row
//
// It lives outside PracticeApp because the notebook shows it too, and the
// notebook cannot import from PracticeApp — PracticeApp already imports the
// notebook, and that would close a cycle.
import { useEffect, useRef, useState } from "react";
import TRANSCRIPTS from "./transcripts.json";
import AUDIO_CUES from "./audio-cues.json";
import LINE_CUES from "./line-cues.json";
import { parentListeningId, chunkParts } from "./upper.js";
import { markEvidence } from "./evidence.js";
import { answerText, buildReview, fmtBand, fmtTime, typeStats, TypeStatsBars, VocabMatch } from "./review.jsx";
import { WritingFeedback } from "./WritingFeedback.jsx";

/* ─── Listen-from-here ───
 * One shared audio element; toggle(testId, item) seeks to that question's cue. */
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
export const cueOf = (testId, n) => AUDIO_CUES[parentListeningId(testId)]?.[n] || null;

/* The recording part (1–4) a paper's section i is: a chunk paper carries only
 * some of the parent's parts. */
export const partOf = (testId, i) => {
  const nums = chunkParts(testId);
  return nums ? nums[i] : i + 1;
};

/* Where each line of the recording script starts (line-cues.json, built from
 * the recordings by scripts/build-cues-from-cache.mjs), and which line is
 * playing at time t. */
const lineTimes = (testId, part) => LINE_CUES[parentListeningId(testId)]?.[part - 1] || null;
const lineAt = (times, t) => {
  if (!times || t == null) return -1;
  let at = -1;
  for (let i = 0; i < times.length; i++) if (times[i] != null && times[i] <= t + 0.05) at = i;
  return at;
};

const mmss = (s) => {
  const v = Math.max(0, Math.floor(s || 0));
  return `${Math.floor(v / 60)}:${String(v % 60).padStart(2, "0")}`;
};
const RATES = [1, 0.85, 0.75];

/* ─── The recording, at hand ───
 * One part of a listening paper, with everything a student going back over a
 * mistake needs: play and pause, back and forward five seconds, a bar to drag,
 * and a slower speed. The exam plays once; studying from it should not.
 *
 *   seek     { t, k }: jump to t seconds and play, whenever k changes — what
 *            "Listen from here" and a tapped script line send
 *   start    where it sits before anything is played (a mistake's own moment)
 *   onTime   the playing position, so the script can light the line
 */
export function PartPlayer({ testId, part, seek = null, start = 0, onTime = null, label = null }) {
  const ref = useRef(null);
  const [st, setSt] = useState({ playing: false, t: start, dur: 0 });
  const [rate, setRate] = useState(0);
  const parent = parentListeningId(testId);
  const src = `/practice-audio/${parent.replace(/-listening$/, "")}-s${part}.mp3`;

  // A new part (or a new mistake) starts from its own place, paused.
  useEffect(() => {
    const a = ref.current;
    if (!a) return;
    a.pause();
    const put = () => { a.currentTime = start; setSt((s) => ({ ...s, t: start, playing: false })); };
    if (a.readyState >= 1) put(); else a.addEventListener("loadedmetadata", put, { once: true });
  }, [src, start]);
  useEffect(() => {
    const a = ref.current;
    if (!a || !seek) return;
    const go = () => { a.currentTime = seek.t; a.play().catch(() => {}); };
    if (a.readyState >= 1) go(); else a.addEventListener("loadedmetadata", go, { once: true });
  }, [seek?.k]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (ref.current) ref.current.playbackRate = RATES[rate]; }, [rate]);
  useEffect(() => () => ref.current?.pause(), []);

  const a = () => ref.current;
  const nudge = (d) => { if (a()) a().currentTime = Math.max(0, Math.min((a().duration || 0), a().currentTime + d)); };
  const toggle = () => { if (!a()) return; if (a().paused) a().play().catch(() => {}); else a().pause(); };
  return (
    <div className="pr-clip">
      <audio ref={ref} src={src} preload="metadata"
        onLoadedMetadata={(e) => setSt((s) => ({ ...s, dur: e.target.duration }))}
        onTimeUpdate={(e) => { setSt((s) => ({ ...s, t: e.target.currentTime })); onTime?.(e.target.currentTime); }}
        onPlay={() => setSt((s) => ({ ...s, playing: true }))}
        onPause={() => setSt((s) => ({ ...s, playing: false }))} />
      {label && <div className="pr-clip__label">{label}</div>}
      <div className="pr-clip__row">
        <button type="button" className="pr-clip__btn" onClick={() => nudge(-5)} aria-label="Back 5 seconds">↺ 5</button>
        <button type="button" className="pr-clip__play" onClick={toggle} aria-label={st.playing ? "Pause" : "Play"}>
          {st.playing ? "❚❚" : "▶"}
        </button>
        <button type="button" className="pr-clip__btn" onClick={() => nudge(5)} aria-label="Forward 5 seconds">5 ↻</button>
        <input className="pr-clip__bar" type="range" min="0" max={st.dur || 0} step="0.1" value={Math.min(st.t, st.dur || 0)}
          onChange={(e) => { if (a()) a().currentTime = Number(e.target.value); }} aria-label="Position in the recording" />
        <span className="pr-clip__time">{mmss(st.t)} / {mmss(st.dur)}</span>
        <button type="button" className="pr-clip__btn" onClick={() => setRate((r) => (r + 1) % RATES.length)}
          aria-label="Playback speed">{RATES[rate]}×</button>
      </div>
    </div>
  );
}

/* ─── One mistake's own piece of the source ───
 * The paragraph the answer is in, or the few lines of the recording around it.
 * `marked` lights the answer's words — after the student has had another go,
 * not before, or the passage would simply hand them the answer. */
export function SourceSnippet({ test, testId, item, marked = false }) {
  const i = test.sections.findIndex((s) => s.title === item.section);
  if (i < 0) return null;
  const ev = item.evidence ? [{ n: item.n, evidence: item.evidence }] : [];
  const has = (text) => ev.length > 0 && markEvidence(text, ev).some((p) => p.ns.length);
  if (test.module === "listening") {
    const lines = TRANSCRIPTS[parentListeningId(testId)]?.[partOf(testId, i) - 1] || [];
    const at = lines.findIndex((l) => has(l.t));
    if (at < 0) return null;
    return (
      <div className="pr-snip">
        {lines.slice(Math.max(0, at - 1), at + 2).map((l, j) => (
          <p key={j} className={`pr-transcript__line is-${l.s}`}>
            <span className="pr-transcript__who">{l.s === "A" ? "Speaker A" : "Speaker B"}</span>
            <span className="pr-transcript__said"><MarkedText text={l.t} items={marked ? ev : []} /></span>
          </p>
        ))}
      </div>
    );
  }
  const paras = String(test.sections[i].passage || "").split(/\n\n+/);
  const at = paras.findIndex(has);
  if (at < 0) return null;
  return (
    <div className="pr-snip">
      <p className="pr-source__para"><MarkedText text={paras[at]} items={marked ? ev : []} /></p>
    </div>
  );
}

/* ─── The passage, or the recording script, with the answers marked on it ───
 *
 * A student working through mistakes needs to see WHERE the answer was, not
 * just be told what it was. Every question carries the line it came from, and
 * all 4,800 of those were checked against their own source text
 * (scripts/check-evidence.mjs), so every one of these marks lands somewhere.
 *
 * The number on a mark is the question it answers. Two questions answered by
 * the same sentence produce one mark carrying both numbers rather than a
 * nested pair — hence data-qs (plural), which is also what the question boxes
 * search on when they scroll the source to the right place.
 */
function MarkedText({ text, items }) {
  const parts = markEvidence(text, items);
  return parts.map((p, i) => (p.ns.length ? (
    <mark className="pr-ev" key={i} data-qs={p.ns.join(" ")}>
      {p.text}
      <sup>{p.ns.join(", ")}</sup>
    </mark>
  ) : <span key={i}>{p.text}</span>));
}

/** Reading passages or the listening script, section by section, marked up.
 *  `only` narrows it to one part, so the panel beside the questions holds the
 *  passage those questions are about and nothing else. */
export function SourcePanel({ test, review, testId, panelRef = null, only = null, onLine = null, now = null }) {
  const isListening = test.module === "listening";
  const all = isListening ? TRANSCRIPTS[parentListeningId(testId)] : null;
  const partNums = isListening ? chunkParts(testId) : null;
  if (isListening && !all) return null;

  const forSection = (secTitle) =>
    review.filter((r) => r.section === secTitle && r.evidence).map((r) => ({ n: r.n, evidence: r.evidence }));

  return (
    <div className="pr-source" ref={panelRef}>
      <div className="pr-source__head">
        <strong>{isListening ? "What was said" : "The passages"}</strong>
        <span>Highlighted where each answer comes from, numbered by question.</span>
      </div>
      {test.sections.map((sec, i) => {
        // Filtered here rather than with .filter() so `i` still indexes the
        // paper's own parts — the transcript is looked up by that number.
        if (only && sec.title !== only) return null;
        const items = forSection(sec.title);
        // A chunk paper carries only some of the parent's parts.
        const part = partNums ? partNums[i] : i + 1;
        const lines = isListening ? all[part - 1] : null;
        // Tap a line, hear it (line-cues.json); the line playing is lit.
        const times = isListening && onLine ? lineTimes(testId, part) : null;
        return (
          <section className="pr-source__sec" key={sec.title || i}>
            <div className="pr-review__sec">{sec.title}{sec.passageTitle ? ` — ${sec.passageTitle}` : ""}</div>
            {isListening && times && <div className="pr-source__tip">Tap any line to hear it.</div>}
            {isListening
              ? (lines || []).map((l, j) => (
                // The line is a flex row, so what was said has to be ONE
                // child. Left as loose text it became a second flex item
                // beside the speaker label — and inherited the label's 84px
                // width and grey uppercase, turning every script into a
                // column of unreadable stripes.
                <p key={j}
                  className={`pr-transcript__line is-${l.s} ${times?.[j] != null ? "is-tappable" : ""} ${now?.part === part && now?.i === j ? "is-now" : ""}`}
                  onClick={times?.[j] != null ? () => onLine(part, times[j]) : undefined}>
                  <span className="pr-transcript__who">{l.s === "A" ? "Speaker A" : "Speaker B"}</span>
                  <span className="pr-transcript__said"><MarkedText text={l.t} items={items} /></span>
                </p>
              ))
              : String(sec.passage || "").split(/\n\n+/).map((para, j) => (
                <p className="pr-source__para" key={j}>
                  <MarkedText text={para} items={items} />
                </p>
              ))}
          </section>
        );
      })}
    </div>
  );
}

/* Every question of the paper, with what the student put and why the key is
 * what it is.
 *
 * The whole paper, part by part, in the order it was sat — not a list of the
 * mistakes. This once opened filtered to the wrong answers only, which threw
 * away the thing that makes a paper worth reading back: what was around the
 * question. Question 9 read as a bare sentence rather than as the third of
 * five True/False items about Samarkand. The filter is still here, as a box
 * to tick.
 *
 * `onlyWrong` is lifted out so the question boxes can switch it off when a
 * student who HAS ticked it taps a question they got right — otherwise the
 * box would scroll to a row that is filtered away. */
export function AnswerReviewList({
  review, testId = null, module = null, onListen = null, playing = null,
  onlyWrong = null, setOnlyWrong = null, focusN = null, listRef = null, only = null,
}) {
  const [ownOnlyWrong, setOwnOnlyWrong] = useState(false);
  const filtered = onlyWrong == null ? ownOnlyWrong : onlyWrong;
  const setFiltered = setOnlyWrong || setOwnOnlyWrong;
  const wrong = review.filter((r) => !r.ok);
  const inPart = only ? review.filter((r) => r.section === only) : review;
  const shown = (filtered ? wrong : review).filter((r) => !only || r.section === only);
  const sections = [...new Set(shown.map((r) => r.section))];
  if (!review.length) return null;
  return (
    <div className="pr-review" ref={listRef}>
      <div className="pr-review__bar">
        <strong>
          Your answers · {inPart.length} question{inPart.length === 1 ? "" : "s"},
          {" "}{inPart.filter((r) => !r.ok).length} to work on
        </strong>
        {wrong.length > 0 && (
          <label>
            <input type="checkbox" checked={filtered} onChange={() => setFiltered(!filtered)} />
            <span>mistakes only</span>
          </label>
        )}
      </div>
      {inPart.every((r) => r.ok) && (
        <p className="pr-review__perfect">
          {only ? "Every question in this part correct." : "Every question correct. Excellent work."}
        </p>
      )}
      {sections.map((sec) => (
        <div key={sec}>
          <div className="pr-review__sec">{sec}</div>
          {shown.filter((r) => r.section === sec).map((r) => (
            <div key={r.n} data-q={r.n}
              className={`pr-review__row ${r.ok ? "" : "is-wrong"} ${focusN === r.n ? "is-focus" : ""}`}>
              <span className="pr-review__mark">{r.ok ? "✓" : "✕"}</span>
              <div className="pr-review__body">
                <div className="pr-review__q">{r.n}. {r.prompt}</div>
                {r.ok ? (
                  <div className="pr-review__ans">
                    <span className="is-key">Your answer: <strong>{answerText(r.your, r.options)}</strong></span>
                  </div>
                ) : (
                  <>
                    <div className="pr-review__ans">
                      <span className="is-yours">Your answer: <strong>{r.your ? answerText(r.your, r.options) : "not answered"}</strong></span>
                      <span className="is-key">Correct: <strong>{answerText(r.correct, r.options)}</strong></span>
                    </div>
                    {r.explain && <div className="pr-review__why"><strong>Why:</strong> {r.explain}</div>}
                    {r.evidence && <div className="pr-review__ev">“{r.evidence}”</div>}
                  </>
                )}
                {/* Every question, right ones too: hearing how a right answer
                    was said is how the next one gets caught. */}
                {module === "listening" && onListen && hasCue(testId, r.n) && (
                  <button type="button" className={`pr-listen ${r.ok ? "pr-listen--quiet" : ""}`} onClick={() => onListen(testId, r)}>
                    {playing === `${testId}:${r.n}` ? "◼ Stop" : "▶ Listen from here"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─── The question strip ───
 * The same row of numbered squares the student answered the paper on, in the
 * same place at the foot of the screen — except that here green and red mean
 * right and wrong rather than answered and skipped. Tapping one jumps to that
 * question and to the line of the passage it came from. */
export function QuestionBoxes({ review, onPick, focusN, current = null }) {
  const sections = [...new Set(review.map((r) => r.section))];
  const state = (r) => (r.ok ? "is-right" : String(r.your ?? "").trim() ? "is-wrong" : "is-blank");
  return (
    <div className="pr-boxes">
      <div className="pr-boxes__head">
        <strong>Every question</strong>
        <span className="pr-boxes__legend">
          <i className="is-right" />right<i className="is-wrong" />wrong<i className="is-blank" />left blank
        </span>
      </div>
      <div className="pr-boxes__parts">
        {sections.map((sec) => (
          <div className={`pr-boxes__part ${sec === current ? "is-current" : ""}`} key={sec}>
            <span className="pr-boxes__label">{sec}</span>
            <div className="pr-boxes__squares">
              {review.filter((r) => r.section === sec).map((r) => (
                <button key={r.n} type="button"
                  className={`pr-sq ${state(r)} ${focusN === r.n ? "is-focus" : ""}`}
                  title={r.ok ? `Question ${r.n} — correct` : `Question ${r.n} — you put “${r.your || "nothing"}”, the answer is “${r.correct}”`}
                  onClick={() => onPick(r.n)}>{r.n}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* A single right/wrong bar, the same shape TypeStatsBars uses, so a part and
 * a question type read the same way. */
function Bar({ label, wrong, total }) {
  const pct = total ? Math.round((wrong / total) * 100) : 0;
  return (
    <div className="pr-stat">
      <div className="pr-stat__head">
        <span>{label}</span>
        <span>{wrong} wrong of {total}</span>
      </div>
      <div className="pr-stat__track">
        <div className="pr-stat__fill" style={{ width: `${pct}%`, background: pct >= 50 ? "#dc2626" : pct >= 25 ? "#f59e0b" : "var(--green)" }} />
      </div>
    </div>
  );
}

/** This one paper's numbers: the score, and where the marks went. */
export function PaperStats({ review, result }) {
  const total = review.length;
  const right = review.filter((r) => r.ok).length;
  const blank = review.filter((r) => !String(r.your ?? "").trim()).length;
  const wrongAnswered = total - right - blank;
  const sections = [...new Set(review.map((r) => r.section))];
  const time = fmtTime(result?.duration_seconds);
  const band = result?.band;
  const tiles = [
    [`${right}/${total}`, "correct"],
    [`${total ? Math.round((right / total) * 100) : 0}%`, "of the paper"],
    band != null ? [`Band ${fmtBand(band)}`, "for this paper"] : null,
    [String(wrongAnswered), wrongAnswered === 1 ? "answered wrongly" : "answered wrongly"],
    [String(blank), "left blank"],
    time ? [time, "spent"] : null,
  ].filter(Boolean);

  return (
    <div className="pr-review pr-an">
      <div className="pr-review__bar"><strong>How this paper went</strong></div>
      <div className="pr-an__tiles">
        {tiles.map(([v, label]) => (
          <div className="pr-an__tile" key={label}><strong>{v}</strong><span>{label}</span></div>
        ))}
      </div>
      {sections.length > 1 && (
        <div className="pr-an__group">
          <div className="pr-review__sec">Part by part</div>
          {sections.map((sec) => {
            const inSec = review.filter((r) => r.section === sec);
            return <Bar key={sec} label={sec} wrong={inSec.filter((r) => !r.ok).length} total={inSec.length} />;
          })}
        </div>
      )}
      <div className="pr-an__group">
        <div className="pr-review__sec">Question by question type</div>
        {typeStats([review]).map((s) => <Bar key={s.type} label={s.label} wrong={s.wrong} total={s.total} />)}
      </div>
    </div>
  );
}

/* ─── The whole paper, laid out to study from ───
 *
 * Reading keeps the exam's own arrangement — passage on the left, questions on
 * the right. Listening is the other way round: the questions are what the
 * student had in front of them while the recording played, so those lead, and
 * the script sits beside them.
 */
export function PaperReview({ test, result, showStats = true, showVocab = true, onRedo = null, redoCount = 0 }) {
  const [onlyWrong, setOnlyWrong] = useState(false);
  const [focusN, setFocusN] = useState(null);
  // Which part is open. The exam shows one part at a time and so does this:
  // reading a passage back means having that passage and its questions on
  // screen together, not scrolling past two others to reach them.
  const [part, setPart] = useState(0);
  // The recording of the open part (PartPlayer): what "Listen from here" and a
  // tapped script line ask it to play, and which line it is on.
  const [seek, setSeek] = useState(null);   // { t, k }
  const [now, setNow] = useState(null);     // { part, i }
  const listRef = useRef(null);
  const srcRef = useRef(null);
  const isListening = test.module === "listening";
  const review = test.module === "writing" ? [] : buildReview(test, result?.answers || {});
  const parts = [...new Set(review.map((r) => r.section))];
  const here = parts[Math.min(part, parts.length - 1)] ?? null;
  const tid = result?.test_id || test.id;
  const herePart = isListening && here != null ? partOf(tid, test.sections.findIndex((s) => s.title === here)) : null;
  const playAt = (t) => setSeek({ t, k: Date.now() });
  const onTime = (t) => {
    const i = lineAt(lineTimes(tid, herePart), t);
    setNow((cur) => (cur?.part === herePart && cur?.i === i ? cur : { part: herePart, i }));
  };
  // Another part has its own recording: what was asked of the last one is void.
  useEffect(() => { setSeek(null); setNow(null); }, [herePart]);

  // A tap on a numbered box opens that question's part, scrolls the question
  // into view, and scrolls the line of the passage or script that answers it.
  // Unfiltering first, or — for a student who has ticked "mistakes only" —
  // the row for a question they got RIGHT would not be there to scroll to.
  const pick = (n) => {
    const item = review.find((r) => r.n === n);
    if (item?.ok && onlyWrong) setOnlyWrong(false);
    const i = parts.indexOf(item?.section);
    if (i >= 0 && i !== part) setPart(i);
    setFocusN(n);
  };
  // A new part starts at the top of both columns, the way turning to a new
  // passage in the exam does.
  useEffect(() => {
    if (srcRef.current) srcRef.current.scrollTop = 0;
    if (listRef.current) listRef.current.scrollTop = 0;
  }, [part]);
  useEffect(() => {
    if (focusN == null) return;
    // The source column is centred by hand rather than with scrollIntoView,
    // and without smooth scrolling. Two smooth scrolls in one tick fight —
    // the row's wins and the passage never moves — and a smooth run down
    // 18,000px of transcript is a blur to watch anyway.
    //
    // Both columns scroll inside themselves now, so neither may use
    // scrollIntoView: it walks up to the window as well and drags the whole
    // page down past the header.
    const centre = (panel, el) => {
      if (!panel || !el) return;
      const a = el.getBoundingClientRect(), b = panel.getBoundingClientRect();
      panel.scrollTop += (a.top - b.top) - (b.height - a.height) / 2;
    };
    centre(srcRef.current, srcRef.current?.querySelector(`[data-qs~="${focusN}"]`));
    centre(listRef.current, listRef.current?.querySelector(`[data-q="${focusN}"]`));
  }, [focusN, onlyWrong, part]);

  if (test.module === "writing") {
    const band = result?.ai_band ?? result?.marked?.band;
    const feedback = result?.ai_feedback || result?.marked?.feedback;
    if (!feedback?.tasks?.length) {
      return <p className="pr-empty">This paper has not been marked yet.</p>;
    }
    return <WritingFeedback band={band} feedback={feedback} test={test} variant="page" />;
  }
  if (!review.length) return <p className="pr-empty">This paper has no answers stored.</p>;

  const source = (
    <SourcePanel
      test={test} review={review} testId={tid}
      panelRef={srcRef} only={here}
      onLine={isListening ? (_p, t) => playAt(t) : null} now={now}
    />
  );
  const answers = (
    <AnswerReviewList
      review={review} testId={tid} module={test.module}
      onListen={(_id, r) => { const c = cueOf(tid, r.n); if (c) playAt(c.t); }}
      onlyWrong={onlyWrong} setOnlyWrong={setOnlyWrong} focusN={focusN} listRef={listRef}
      only={here}
    />
  );

  return (
    <>
      {showStats && <PaperStats review={review} result={result} />}
      {/* No row of part tabs above the passage. The strip of numbered boxes
          below is already the paper's navigation — tapping any question opens
          its part — and a second switcher would only cost the passage a band
          of height to say what the panel headings say anyway. */}
      {(isListening && herePart) || (onRedo && redoCount > 0) ? (
        <div className="pr-tools">
          {isListening && herePart && (
            <PartPlayer testId={tid} part={herePart} seek={seek} onTime={onTime}
              label={`${here} recording · tap a line of the script, or “Listen from here”`} />
          )}
          {/* Hearing it again is half of it; the other half is answering again. */}
          {onRedo && redoCount > 0 && (
            <button type="button" className="btn btn--primary pr-tools__redo" onClick={onRedo}>
              Redo my {redoCount} mistake{redoCount === 1 ? "" : "s"} in this paper
            </button>
          )}
        </div>
      ) : null}
      <div className="pr-split">
        {isListening ? <>{answers}{source}</> : <>{source}{answers}</>}
      </div>
      <QuestionBoxes review={review} onPick={pick} focusN={focusN} current={here} />
      {showVocab && <VocabMatch review={review} />}
    </>
  );
}
