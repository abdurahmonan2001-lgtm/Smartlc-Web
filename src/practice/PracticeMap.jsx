// The practice programme as a journey, the way the Student App's course map
// draws the course (CEO, 11 Nov 2026: "adjust the roadmap to make it more
// attractive just like in student app"). Each unit is its own landscape drawn
// from its topic (CourseRegion.jsx, copied from the Student App) with a
// banner, its lessons along a winding road, and a chest at the end that opens
// when the unit is finished; the mid-term and final are castles.
//
// The layout and the road are the Student App's CourseMap.jsx, kept in step
// with it; the card is the website's own: the lesson, a chip a paper with its
// score, and its state.
import { useLayoutEffect, useRef, useState } from "react";
import CourseRegion, { ChapterBanner, Chest, Castle } from "./CourseRegion.jsx";

const G = "#009472";
const CARD_W = 172;
const CARD_H = 96;
const STEP = 150;
const EDGE = 10;
const MAX_SWING = 112;
const TOP = 16;
const BANNER = 92;
const CHEST = 100;
const EXAM = 300;

const swingFor = (width) => Math.max(30, Math.min(MAX_SWING, width / 2 - CARD_W / 2 - EDGE));
const offsetFor = (i, swing) => (i % 2 ? 1 : -1) * swing * (0.86 + 0.14 * Math.sin(i * 1.7));

// The road: into a lesson card an arc, into a chest or a castle an S
// (CourseMap.jsx curve). Returns the road up to each stop.
function curve(pts) {
  if (!pts.length) return [""];
  let d = `M ${pts[0].x} ${pts[0].y}`;
  const upTo = [d];
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const dx = b.x - a.x, dy = b.y - a.y;
    if (b.order != null && Math.abs(dx) > 20) d += ` C ${a.x + dx * 0.55} ${a.y}, ${b.x} ${b.y - dy * 0.55}, ${b.x} ${b.y}`;
    else { const my = a.y + dy / 2; d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`; }
    upTo.push(d);
  }
  return upTo;
}

function layout(chapters, width) {
  const mid = width / 2, swing = swingFor(width);
  const regions = [], cards = [], chests = [], nodes = [];
  let y = TOP, gi = 0;
  for (const c of chapters) {
    const top = y, banner = y + 10;
    y += BANNER;
    if (c.kind !== "exam") {
      for (const u of c.units) {
        const p = { x: mid + offsetFor(gi++, swing), y: y + CARD_H / 2 };
        cards.push({ u, ...p });
        nodes.push({ ...p, order: u.order, locked: u.state === "locked" });
        y += STEP;
      }
      const p = { x: mid, y: y + 16 };
      chests.push({ c, ...p });
      nodes.push({ ...p, locked: c.state !== "done" });
      y += CHEST;
      regions.push({ c, top, banner, height: y - top });
    } else {
      const u = c.units[0];
      const p = { x: mid, y: y + 222 };
      cards.push({ u, ...p });
      nodes.push({ ...p, order: u.order, locked: u.state === "locked" });
      regions.push({ c, top, banner, castleBase: y + 166 });
      y += EXAM;
      regions[regions.length - 1].height = y - top;
    }
  }
  return { regions, cards, chests, nodes, height: y + 24 };
}

/* One lesson on the road: its number, a chip a paper, its state. */
function LessonNode({ u, here, onOpen }) {
  const l = u.lesson;
  const tone = { done: "#059669", started: "#d97706", missed: "#dc2626", open: "#0f3d34", locked: "#b8c2bf" }[u.state];
  return (
    <button type="button" className={`pr-node is-${u.state} ${here ? "is-here" : ""}`} disabled={u.state === "locked"}
      onClick={() => u.state !== "locked" && onOpen(l.n)} style={{ "--tone": tone }}
      aria-label={`Lesson ${l.n}, ${u.state === "locked" ? "opens later" : u.state}`}>
      {here && <span className="pr-node__here">YOU ARE HERE</span>}
      <span className="pr-node__top">
        <span className="pr-node__n">{u.state === "done" ? "✓" : l.n}</span>
        <span className="pr-node__t">
          <b>Lesson {l.n}</b>
          <em>{u.state === "locked" ? "🔒 opens later" : u.state === "done" ? "Done" : u.state === "started" ? `${l.doneTests.length} of ${l.tests.length} done`
            : u.state === "missed" ? "Not done yet" : here ? "Today" : `${l.tests.reduce((s, t) => s + t.durationMin, 0)} min`}</em>
        </span>
      </span>
      {u.state !== "locked" && <span className="pr-node__chips">{u.chips}</span>}
    </button>
  );
}

export default function PracticeMap({ prog, onOpenLesson, chipFor }) {
  const wrapRef = useRef(null);
  const hereRef = useRef(null);
  const [width, setWidth] = useState(420);
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return undefined;
    const measure = () => setWidth(Math.min(760, el.clientWidth || 420));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const stateOf = (l) => (l.state === "is-locked" ? "locked" : l.state === "is-done" ? "done" : l.state === "is-partial" ? "started"
    : l.state === "is-missed" ? "missed" : "open");
  const chapters = prog.units.map((u) => ({
    key: u.key,
    kind: u.exam ? "exam" : "unit",
    no: /^\d+$/.test(u.no) ? Number(u.no) : 0,
    title: u.title,
    topic: u.topic,
    final: u.key === "final",
    state: !u.open ? "locked" : u.done ? "done" : "open",
    done: u.doneCount,
    total: u.ls.length,
    units: u.ls.map((l) => ({ order: l.n, label: l.n, state: stateOf(l), lesson: l, chips: l.tests.map((t) => chipFor(t)) })),
  }));
  const hereN = prog.next?.n ?? null;
  const { regions, cards, chests, nodes, height } = layout(chapters, width);
  const reached = nodes.reduce((last, n, i) => (n.locked ? last : i), 0);
  const roads = curve(nodes);
  const road = roads[roads.length - 1];
  const walked = roads[reached];

  // Open on where the student is, not on lesson 1.
  const scrolled = useRef(false);
  useLayoutEffect(() => {
    if (scrolled.current || !hereRef.current) return;
    scrolled.current = true;
    const r = hereRef.current.getBoundingClientRect();
    if (r.top > window.innerHeight) hereRef.current.scrollIntoView({ block: "center" });
  });

  return (
    <div className="pr-map" ref={wrapRef}>
      <div style={{ position: "relative", width, height, margin: "0 auto" }}>
        {regions.map((r, i) => (
          <div key={r.c.key} style={{ position: "absolute", left: 0, top: r.top, width, height: r.height }}>
            <CourseRegion chapter={r.c} width={width} height={r.height} first={i === 0} seed={i + 1} />
          </div>
        ))}
        <svg className="slc-region" width={width} height={height} aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <path d={road} fill="none" stroke="rgba(120,90,40,.16)" strokeWidth="21" strokeLinecap="round" />
          <path d={road} fill="none" stroke="#fbf4e2" strokeWidth="15" strokeLinecap="round" />
          <path d={road} fill="none" stroke="#d9cfb6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 9" />
          {reached > 0 && <path d={walked} fill="none" stroke={G} strokeWidth="4" strokeLinecap="round" strokeDasharray="1 8" />}
        </svg>
        {regions.filter((r) => r.c.kind === "exam").map((r) => (
          <svg key={`k${r.c.key}`} className={`slc-region${r.c.state === "locked" ? " slc-region-muted" : ""}`}
            width={width} height={r.height} aria-hidden="true"
            style={{ position: "absolute", left: 0, top: r.top, pointerEvents: "none", overflow: "visible" }}>
            <Castle cx={width / 2} by={r.castleBase - r.top} final={r.c.final} />
          </svg>
        ))}
        {regions.map((r) => (
          <div key={`b${r.c.key}`} style={{ position: "absolute", left: 0, right: 0, top: r.banner, zIndex: 1 }}>
            <ChapterBanner chapter={r.c} width={width} />
          </div>
        ))}
        {chests.map(({ c, x, y }) => (
          <div key={`c${c.key}`} style={{ position: "absolute", left: x - 100, top: y - 26, width: 200, zIndex: 1 }}>
            <Chest chapter={c} />
          </div>
        ))}
        {cards.map(({ u, x, y }) => (
          <div key={u.order} ref={u.order === hereN ? hereRef : null}
            style={{ position: "absolute", left: x - CARD_W / 2, top: y - CARD_H / 2, width: CARD_W, zIndex: u.order === hereN ? 3 : 2 }}>
            <LessonNode u={u} here={u.order === hereN} onOpen={(n) => onOpenLesson(prog.level, n)} />
          </div>
        ))}
      </div>
    </div>
  );
}
