// The practice programme as one road across the screen (CEO, 11 Nov 2026:
// "a widening path horizontally, from left to right … the whole page is one
// big road map"). The Student App's map runs top to bottom; a computer screen
// is wide, so here the road runs left to right and grows wider as the course
// goes on -- a trail at the Start camp, a broad road by the Final Summit.
//
//   land      each unit is a stretch of country drawn from its topic
//             (CourseRegion.jsx's themes): big, plain props on the hills
//             behind and in the foreground, not the faint margins of the
//             app's tall map
//   stops     the unit's lessons on the road, as the same rings the islands
//             use (PracticeMap.jsx), each under a badge with an object of its
//             own, so no two lessons in a unit look alike
//   exams     the mid-term castle and the final summit, on the road
//
// The road behind today's lesson is gold: the part already walked. Scroll it
// with the wheel, by dragging, with the arrows, or by picking a unit below;
// it opens on today's lesson. A phone keeps the islands.
import { useLayoutEffect, useRef, useState } from "react";
import { Castle, regionOf } from "./CourseRegion.jsx";
import PracticeMap, { Station } from "./PracticeMap.jsx";

const H = 560;          // map height
const PAD = 120;        // a unit's margin before its first and after its last stop
const STEP = 150;       // between two stops
const EXAM_W = 380;     // the stretch an exam stands on
const ROAD_FROM = 14, ROAD_TO = 64;   // the road's width at the start and the end

const f1 = (v) => Math.round(v * 10) / 10;
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return Math.abs(h);
}
const rnd = (s, n) => (hash(`${s}:${n}`) % 10007) / 10007;

const roadY = (x) => H * 0.56 + 34 * Math.sin(x / 300 + 0.6) + 10 * Math.sin(x / 97);
const hillY = (x) => H * 0.36 + 20 * Math.sin(x / 190 + 1.3) + 9 * Math.sin(x / 61);
const groundY = (x) => H * 0.78 + 12 * Math.sin(x / 140 + 0.4);
const chapterName = (c) => (c.kind === "exam" ? (c.final ? "Final exam" : "Mid-term exam") : c.no === 0 ? "Start" : `Unit ${c.no}`);

/** Units → stretches of road, with each stop's place on it. */
function layout(units) {
  let x = 0;
  const out = units.map((u, i) => {
    const chapter = {
      kind: u.exam ? "exam" : "unit", no: /^\d+$/.test(u.no) ? Number(u.no) : 0, title: u.title, topic: u.topic,
      final: u.key === "final", state: !u.open ? "locked" : u.done ? "done" : "open", done: u.doneCount, total: u.ls.length, units: [],
    };
    const w = u.exam ? EXAM_W : PAD * 2 + (u.ls.length - 1) * STEP;
    const stops = u.ls.map((l, k) => ({ l, x: u.exam ? x + w / 2 : x + PAD + k * STEP }));
    const seg = { u, i, chapter, region: regionOf(chapter), x0: x, x1: x + w, stops };
    x += w;
    return seg;
  });
  return { segs: out, W: x };
}

/** A path from y = top(x) down to the bottom of the map, between x0 and x1. */
const fillBelow = (top, x0, x1) => {
  let d = `M${f1(x0)} ${H}`;
  for (let x = x0; x <= x1 + 1; x += 10) d += ` L${f1(Math.min(x, x1))} ${f1(top(Math.min(x, x1)))}`;
  return `${d} L${f1(x1)} ${H}Z`;
};

function Road({ W, walked }) {
  const half = (x) => (ROAD_FROM + (ROAD_TO - ROAD_FROM) * (x / W)) / 2;
  const edge = (sign, to = W) => {
    const pts = [];
    for (let x = 0; x <= to + 1; x += 12) { const xx = Math.min(x, to); pts.push(`${f1(xx)} ${f1(roadY(xx) + sign * half(xx))}`); }
    return pts;
  };
  const shape = (to) => `M${edge(-1, to).join(" L")} L${edge(1, to).reverse().join(" L")}Z`;
  // The centre line once the road is wide enough to have one.
  const centre = [];
  for (let x = W * 0.25; x <= W; x += 12) centre.push(`${f1(x)} ${f1(roadY(x))}`);
  return (
    <g>
      <path d={shape(W)} fill="#0b1324" opacity=".07" transform="translate(0 5)" />
      <path d={shape(W)} fill="#f4ecd8" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
      {walked > 0 && <path d={shape(Math.min(walked, W))} fill="#f3cf7a" />}
      <path d={`M${centre.join(" L")}`} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeDasharray="10 12" opacity=".85" />
    </g>
  );
}

/** One unit's stretch of land: sky, hills, ground, and its topic's props. */
function Land({ seg }) {
  const { x0, x1, region, u, stops } = seg;
  const [top, bottom] = region.bg;
  const id = `rd${seg.i}`;
  const p = region.pieces;
  // Between the stops (never on them): on the hills behind, smaller; on the
  // ground in front, larger.
  const gaps = [x0 + PAD * 0.45, ...stops.slice(1).map((s, k) => (s.x + stops[k].x) / 2), x1 - PAD * 0.45];
  if (u.exam) gaps.splice(0, gaps.length, x0 + 60, x1 - 60);
  const back = gaps.map((x, k) => ({ x: x + (rnd(id, k) - 0.5) * 30, piece: p[(k + seg.i) % p.length], s: 1.35 + rnd(id, 20 + k) * 0.35 }));
  const front = gaps.map((x, k) => ({ x: x + (rnd(id, 40 + k) - 0.5) * 50, piece: p[(k + seg.i + 1) % p.length], s: 1.9 + rnd(id, 60 + k) * 0.6 }));
  return (
    <g className={!u.open ? "pr-rd__shut" : ""}>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} />
        </linearGradient>
      </defs>
      {/* A little past each edge, so the next unit's land meets it without a seam. */}
      <rect x={x0 - 1} y="0" width={x1 - x0 + 2} height={H} fill={`url(#${id}g)`} />
      <circle cx={f1(x0 + (x1 - x0) * (0.3 + rnd(id, 90) * 0.4))} cy="70" r="46" fill="#ffffff" opacity=".35" />
      <path d={fillBelow(hillY, x0, x1)} fill={region.banner} opacity=".1" />
      <path d={fillBelow((x) => hillY(x) + 34, x0, x1)} fill={region.banner} opacity=".07" />
      {back.map((b, k) => (
        <g key={`b${k}`} transform={`translate(${f1(b.x)} ${f1(hillY(b.x) - 6)}) scale(${f1(b.s)})`} opacity=".9">{b.piece()}</g>
      ))}
      <path d={fillBelow(groundY, x0, x1)} fill={region.banner} opacity=".1" />
      {front.map((b, k) => (
        <g key={`f${k}`}>
          <ellipse cx={f1(b.x)} cy={f1(groundY(b.x) + 34)} rx={f1(13 * b.s)} ry="4" fill="#0b1324" opacity=".08" />
          <g transform={`translate(${f1(b.x)} ${f1(groundY(b.x) + 22)}) scale(${f1(b.s)})`}>{b.piece()}</g>
        </g>
      ))}
      {u.exam && <Castle cx={(x0 + x1) / 2} by={f1(roadY((x0 + x1) / 2) - 40)} final={seg.chapter.final} />}
    </g>
  );
}

function RoadMap({ prog, onOpenLesson }) {
  const { segs, W } = layout(prog.units);
  const hereN = prog.next?.n ?? null;
  const here = segs.flatMap((s) => s.stops).find((s) => s.l.n === hereN);
  const walked = here ? here.x : 0;
  const scroller = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: true });

  const onScroll = () => {
    const el = scroller.current;
    if (el) setEdges({ left: el.scrollLeft > 8, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 8 });
  };
  const goTo = (x, smooth = true) => {
    const el = scroller.current;
    if (el) el.scrollTo({ left: Math.max(0, x - el.clientWidth / 2), behavior: smooth ? "smooth" : "auto" });
  };
  // Open on today's lesson, once.
  useLayoutEffect(() => { if (here) goTo(here.x, false); onScroll(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  // The wheel walks the road; a page with nothing below the map loses nothing.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const max = el.scrollWidth - el.clientWidth;
      if ((e.deltaY < 0 && el.scrollLeft <= 0) || (e.deltaY > 0 && el.scrollLeft >= max)) return;
      e.preventDefault();
      el.scrollLeft += e.deltaY;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Drag to pan, unless the press is on a stop.
  const drag = useRef(null);
  const onDown = (e) => {
    if (e.button !== 0 || e.target.closest("button")) return;
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false };
    scroller.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    if (Math.abs(e.clientX - d.x) > 3) d.moved = true;
    scroller.current.scrollLeft = d.left - (e.clientX - d.x);
  };
  const onUp = () => { drag.current = null; };

  return (
    <div className="pr-rd">
      <div className="pr-rd__view">
        <div className="pr-rd__scroll" ref={scroller} onScroll={onScroll} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          <div className="pr-rd__map" style={{ width: W, height: H }}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="pr-rd__svg">
              {segs.map((s) => <Land key={s.u.key} seg={s} />)}
              {/* A soft haze where one unit's land meets the next. */}
              <defs>
                <linearGradient id="rdSeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" /><stop offset=".5" stopColor="#ffffff" stopOpacity=".22" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {segs.slice(1).map((s) => <rect key={s.u.key} x={s.x0 - 40} y="0" width="80" height={H} fill="url(#rdSeam)" />)}
              <Road W={W} walked={walked} />
            </svg>

            {segs.map((s) => (
              <div key={s.u.key} className={`pr-rd__card ${!s.u.open ? "is-locked" : ""}`} style={{ left: s.x0 + 18, maxWidth: s.x1 - s.x0 - 36, "--tone": s.region.banner }}>
                <span className="pr-isl__kicker">{chapterName(s.chapter)} · {s.region.name}</span>
                <strong>{s.u.title}</strong>
                <span className="pr-isl__chips">
                  {s.stops.some((t) => t.l.n === hereN) && <em className="is-here">You are here</em>}
                  {s.u.open && <em>{s.u.doneCount}/{s.u.ls.length} done</em>}
                  {s.u.open && s.u.avg != null && <em>{s.u.avg}%</em>}
                  {s.u.behind > 0 && <em className="is-warn">{s.u.behind} to catch up</em>}
                  {!s.u.open && <em>🔒 opens later</em>}
                </span>
              </div>
            ))}

            {segs.flatMap((s) => s.stops.map((t, k) => {
              const y = roadY(t.x);
              const piece = s.region.pieces[(k + s.i) % s.region.pieces.length];
              return (
                <div key={t.l.n} className="pr-rd__stop" style={{ left: t.x - 28, top: y - 28 }}>
                  {/* The lesson's own object; an exam has its castle instead. */}
                  {!s.u.exam && (
                    <svg className={`pr-rd__badge ${t.l.state === "is-locked" ? "is-locked" : ""}`} width="52" height="52" viewBox="-26 -26 52 52" aria-hidden="true" style={{ "--tone": s.region.banner }}>
                      <circle r="24" fill="#ffffff" stroke={s.region.banner} strokeWidth="2.5" />
                      <g transform="scale(1.15)">{piece()}</g>
                    </svg>
                  )}
                  <Station l={t.l} here={t.l.n === hereN} tone={s.region.banner} onOpen={(n) => onOpenLesson(prog.level, n)} />
                </div>
              );
            }))}
          </div>
        </div>
        {edges.left && <button type="button" className="pr-rd__arrow is-left" aria-label="Back along the road" onClick={() => scroller.current.scrollBy({ left: -scroller.current.clientWidth * 0.7, behavior: "smooth" })}>‹</button>}
        {edges.right && <button type="button" className="pr-rd__arrow is-right" aria-label="On along the road" onClick={() => scroller.current.scrollBy({ left: scroller.current.clientWidth * 0.7, behavior: "smooth" })}>›</button>}
      </div>

      {/* Every unit by name: a jump along the road. */}
      <nav className="pr-rd__units" aria-label="Units">
        {segs.map((s) => (
          <button key={s.u.key} type="button" className={`${s.u.done ? "is-done" : ""} ${!s.u.open ? "is-locked" : ""} ${s.stops.some((t) => t.l.n === hereN) ? "is-here" : ""}`}
            style={{ "--tone": s.region.banner }} onClick={() => goTo((s.x0 + s.x1) / 2)}>
            <i>{s.u.no === "0" ? "Start" : s.u.exam ? "★" : s.u.no}</i>{s.u.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

/** The road on a wide screen; the islands (PracticeMap.jsx) on a phone. */
export default function PracticeRoad({ prog, onOpenLesson }) {
  const ref = useRef(null);
  const [wide, setWide] = useState(true);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const m = () => setWide((el.clientWidth || 1000) >= 760);
    m();
    const ro = new ResizeObserver(m);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref}>
      {wide ? <RoadMap prog={prog} onOpenLesson={onOpenLesson} /> : <PracticeMap prog={prog} onOpenLesson={onOpenLesson} />}
    </div>
  );
}
