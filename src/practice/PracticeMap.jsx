// The practice programme as islands on a metro line -- the same design as the
// Student App's course map (src/CourseIslands.jsx; CEO, 11 Nov 2026: the long
// road was "too noisy for a computer … shorter, remove those treasure chests
// … combine the three visuals … make the background topic-based").
//
//   island    one per unit, on its own landscape from its topic
//             (CourseRegion.jsx, copied from the Student App), a frosted head
//             with the unit, its region and chips: done, average, to catch up
//   line      the unit's lessons as stations on a short line in its colour
//   station   a ring that fills with the lesson's papers handed in: ✓ done,
//             amber half done, red when missed, a gold halo for today's lesson,
//             grey while locked; under it the lesson's scores
//
// Three islands a row on a wide monitor, two on a laptop, one on a phone.
import { useLayoutEffect, useRef, useState } from "react";
import CourseRegion, { regionOf } from "./CourseRegion.jsx";

const ISLAND_H = 200;
const chapterName = (c) => (c.kind === "exam" ? (c.final ? "Final exam" : "Mid-term exam") : c.no === 0 ? "Start" : `Unit ${c.no}`);

function Station({ l, here, tone, onOpen }) {
  const R = 22, C = 2 * Math.PI * R;
  const locked = l.state === "is-locked", done = l.state === "is-done";
  const missed = l.state === "is-missed", partial = l.state === "is-partial";
  const frac = l.tests.length ? l.doneTests.length / l.tests.length : 0;
  const arc = done ? "#059669" : missed ? "#dc2626" : partial ? "#d97706" : tone;
  return (
    <button type="button" className="pr-st" disabled={locked} onClick={() => !locked && onOpen(l.n)}
      aria-label={`Lesson ${l.n}, ${locked ? "opens later" : done ? "done" : missed ? "not done yet" : here ? "today" : "to do"}`}>
      <svg width="56" height="56" viewBox="0 0 56 56" className={here ? "is-here" : ""}>
        {here && <circle cx="28" cy="28" r="27" fill="none" stroke="#e3b95a" strokeWidth="3" />}
        <circle cx="28" cy="28" r={R} fill={locked ? "#f1f4f3" : "#fff"} stroke={locked ? "#d5dbd9" : "#e7ebea"} strokeWidth="5" />
        {!locked && frac > 0 && (
          <circle cx="28" cy="28" r={R} fill="none" stroke={arc} strokeWidth="5" strokeLinecap="round"
            strokeDasharray={`${C * frac} ${C}`} transform="rotate(-90 28 28)" />
        )}
        {missed && !frac && <circle cx="28" cy="28" r={R} fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 4" />}
        {done
          ? <path d="M19.5 28.5l5.5 5.5 11.5-12" fill="none" stroke="#059669" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round" />
          : <text x="28" y="32.5" textAnchor="middle" fontSize="14" fontWeight="800" fill={locked ? "#9aa6a3" : "#1f2d2b"}>{l.n}</text>}
      </svg>
      <span className={`pr-st__tag ${locked ? "is-locked" : done ? "is-done" : missed ? "is-missed" : here ? "is-here" : ""}`}>
        {locked ? "🔒" : done ? `L${l.n} ✓` : missed ? "not done" : here ? "today" : partial ? `${l.doneTests.length}/${l.tests.length}` : `L${l.n}`}
      </span>
    </button>
  );
}

function Island({ u, i, width, hereN, level, onOpenLesson, islandRef }) {
  const chapter = {
    kind: u.exam ? "exam" : "unit", no: /^\d+$/.test(u.no) ? Number(u.no) : 0, title: u.title, topic: u.topic,
    final: u.key === "final", state: !u.open ? "locked" : u.done ? "done" : "open", done: u.doneCount, total: u.ls.length, units: [],
  };
  const region = regionOf(chapter);
  const isHere = u.ls.some((l) => l.n === hereN);
  return (
    <section ref={isHere ? islandRef : null} className={`pr-isl ${isHere ? "is-here" : ""} ${!u.open ? "is-locked" : ""}`} style={{ "--tone": region.banner, height: ISLAND_H }}>
      <div className="pr-isl__land"><CourseRegion chapter={chapter} width={width} height={ISLAND_H} first seed={i + 1} /></div>
      <div className="pr-isl__head">
        <span className="pr-isl__kicker">{chapterName(chapter)} · {region.name}</span>
        <strong>{u.title}</strong>
        <span className="pr-isl__chips">
          {isHere && <em className="is-here">You are here</em>}
          {u.open && <em>{u.doneCount}/{u.ls.length} done</em>}
          {u.open && u.avg != null && <em>{u.avg}%</em>}
          {u.behind > 0 && <em className="is-warn">{u.behind} to catch up</em>}
          {!u.open && <em>🔒 opens later</em>}
        </span>
      </div>
      <div className="pr-isl__line">
        <i />
        <div>{u.ls.map((l) => <Station key={l.n} l={l} here={l.n === hereN} tone={region.banner} onOpen={(n) => onOpenLesson(level, n)} />)}</div>
      </div>
    </section>
  );
}

export default function PracticeMap({ prog, onOpenLesson }) {
  const wrapRef = useRef(null);
  const hereRef = useRef(null);
  const [width, setWidth] = useState(700);
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(el.clientWidth || 700);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const scrolled = useRef(false);
  useLayoutEffect(() => {
    if (scrolled.current || !hereRef.current) return;
    scrolled.current = true;
    if (hereRef.current.getBoundingClientRect().top > window.innerHeight) hereRef.current.scrollIntoView({ block: "center" });
  });
  // Three a row on a wide monitor, two on a laptop, one on a phone.
  const cols = width >= 1100 ? 3 : width >= 660 ? 2 : 1, gap = 14;
  const islandW = Math.floor((width - gap * (cols - 1)) / cols);
  const hereN = prog.next?.n ?? null;
  return (
    <div className="pr-isls" ref={wrapRef} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gap }}>
      {prog.units.map((u, i) => (
        <Island key={u.key} u={u} i={i} width={islandW} hereN={hereN} level={prog.level} onOpenLesson={onOpenLesson} islandRef={hereRef} />
      ))}
    </div>
  );
}
