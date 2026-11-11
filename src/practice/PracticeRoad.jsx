// The practice programme as one road across the screen (CEO, 11 Nov 2026:
// "a widening path horizontally, from left to right … the whole page is one
// big road map"). The Student App's map runs top to bottom; a computer screen
// is wide, so here the road runs left to right and grows wider as the course
// goes on -- a trail at the Start camp, a broad road by the Final Summit.
//
//   land      each unit is a stretch of country in its own colour, with a
//             landmark for its topic (LandArt.jsx, shared with the Student
//             App); the higher the level, the richer the land
//   stops     the unit's lessons on the road, as the same rings the islands
//             use (PracticeMap.jsx), each under a badge with an object of its
//             own, so no two lessons in a unit look alike
//
// The map fills the screen under the header, and any scroll -- up, down or
// sideways -- travels along the road ("scrolling … should always move the
// map to the left … only this upper part remains fixed"). Arrows, dragging
// and the unit row below move it too; it opens on today's lesson. The road
// behind today's lesson is gold: the part already walked. A phone keeps the
// islands.
import { useLayoutEffect, useRef, useState } from "react";
import { regionOf } from "./CourseRegion.jsx";
import { Landscape, tierOf, mix } from "./LandArt.jsx";
import PracticeMap, { Station } from "./PracticeMap.jsx";

const PAD = 120;        // a unit's margin before its first and after its last stop
const STEP = 150;       // between two stops
const EXAM_W = 380;     // the stretch an exam stands on
const ROAD_FROM = 14, ROAD_TO = 64;   // the road's width at the start and the end

const f1 = (v) => Math.round(v * 10) / 10;
const roadAt = (H) => (x) => H * 0.62 + H * 0.05 * Math.sin(x / 300 + 0.6) + H * 0.015 * Math.sin(x / 97);
const chapterName = (c) => (c.kind === "exam" ? (c.final ? "Final exam" : "Mid-term exam") : c.no === 0 ? "Start" : `Unit ${c.no}`);

/** Units → stretches of road, with each stop's place on it. */
function layout(units) {
  let x = 0;
  const segs = units.map((u, i) => {
    const chapter = {
      kind: u.exam ? "exam" : "unit", no: /^\d+$/.test(u.no) ? Number(u.no) : 0, title: u.title, topic: u.topic,
      final: u.key === "final", state: !u.open ? "locked" : u.done ? "done" : "open", done: u.doneCount, total: u.ls.length, units: [],
    };
    const w = u.exam ? EXAM_W : PAD * 2 + (u.ls.length - 1) * STEP;
    const stops = u.ls.map((l, k) => ({ l, x: u.exam ? x + w / 2 : x + PAD + k * STEP }));
    // The landmark stands between two stops, never behind one.
    const mid = stops.length > 1 ? (stops[Math.floor((stops.length - 1) / 2)].x + stops[Math.floor((stops.length - 1) / 2) + 1].x) / 2 : x + w / 2;
    const seg = { u, i, chapter, region: regionOf(chapter), x0: x, x1: x + w, stops, landmarkAt: mid };
    x += w;
    return seg;
  });
  return { segs, W: x };
}

function Road({ W, H, walked }) {
  const roadY = roadAt(H);
  const half = (x) => (ROAD_FROM + (ROAD_TO - ROAD_FROM) * (x / W)) / 2;
  const edge = (sign, to) => {
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
      <path d={shape(W)} fill="#0b1324" opacity=".08" transform="translate(0 5)" />
      <path d={shape(W)} fill="#f6f0e2" stroke="#ffffff" strokeWidth="2.5" strokeLinejoin="round" />
      {walked > 0 && <path d={shape(Math.min(walked, W))} fill="#efc76c" />}
      <path d={`M${centre.join(" L")}`} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeDasharray="10 12" opacity=".85" />
    </g>
  );
}

/** The lesson's own object, drawn in its unit's colour on a white disc. */
function Badge({ piece, tone, locked, id }) {
  return (
    <svg className={`pr-rd__badge ${locked ? "is-locked" : ""}`} width="50" height="50" viewBox="-25 -25 50 50" aria-hidden="true">
      <defs>
        <filter id={id} colorInterpolationFilters="sRGB">
          <feFlood floodColor={mix(tone, "#000000", 0.08)} /><feComposite in2="SourceAlpha" operator="in" />
        </filter>
      </defs>
      <circle r="23" fill="#ffffff" stroke={mix(tone, "#ffffff", 0.35)} strokeWidth="2" />
      <g transform="scale(1.1)" filter={`url(#${id})`}>{piece()}</g>
    </svg>
  );
}

function RoadMap({ prog, onOpenLesson, solo }) {
  const { segs, W } = layout(prog.units);
  const tier = tierOf(prog.level);
  const hereN = prog.next?.n ?? null;
  const here = segs.flatMap((s) => s.stops).find((s) => s.l.n === hereN);
  const walked = here ? here.x : 0;
  const view = useRef(null);
  const units = useRef(null);
  const scroller = useRef(null);
  const [edges, setEdges] = useState({ left: false, right: true });
  const [inView, setInView] = useState(null);   // the unit at the middle of the screen

  // The map takes the rest of the screen under the header, so the page itself
  // never scrolls and only the header stays put.
  const [H, setH] = useState(560);
  useLayoutEffect(() => {
    const fit = () => {
      const el = view.current;
      if (!el) return;
      // Everything on the page but the map, measured, so page + map = the screen.
      const rest = document.documentElement.scrollHeight - el.offsetHeight;
      setH(solo ? Math.round(Math.max(380, Math.min(820, window.innerHeight - rest - 2))) : 520);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [solo]);
  const roadY = roadAt(H);

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ left: el.scrollLeft > 8, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 8 });
    // Keep that unit's name in sight in the row below, which may run off screen.
    const mid = el.scrollLeft + el.clientWidth / 2;
    const seg = segs.find((g) => mid >= g.x0 && mid < g.x1) || segs[segs.length - 1];
    if (seg && seg.u.key !== inView) {
      setInView(seg.u.key);
      const row = units.current, pill = row?.querySelector(`[data-unit="${seg.u.key}"]`);
      if (pill && (pill.offsetLeft < row.scrollLeft || pill.offsetLeft + pill.offsetWidth > row.scrollLeft + row.clientWidth)) {
        row.scrollTo({ left: pill.offsetLeft - row.clientWidth / 2 + pill.offsetWidth / 2, behavior: "smooth" });
      }
    }
  };
  const goTo = (x, smooth = true) => {
    const el = scroller.current;
    if (el) el.scrollTo({ left: Math.max(0, x - el.clientWidth / 2), behavior: smooth ? "smooth" : "auto" });
  };
  // Open on today's lesson, once.
  useLayoutEffect(() => { if (here) goTo(here.x, false); onScroll(); }, []);   // eslint-disable-line react-hooks/exhaustive-deps

  // Any scroll on the page travels the road: down or right goes forward.
  useLayoutEffect(() => {
    const onWheel = (e) => {
      const el = scroller.current;
      if (!el || e.ctrlKey) return;               // ctrl+wheel is the browser's zoom
      // The owner's two roads share a page that scrolls: there only the map
      // under the pointer takes the wheel.
      if (!solo && !el.contains(e.target)) return;
      const unit = e.deltaMode === 1 ? 40 : e.deltaMode === 2 ? el.clientWidth : 1;
      const d = (Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX) * unit;
      if (!d) return;
      e.preventDefault();
      el.scrollLeft += d;
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [solo]);

  // Drag to pan, unless the press is on a stop.
  const drag = useRef(null);
  const onDown = (e) => {
    if (e.button !== 0 || e.target.closest("button")) return;
    drag.current = { x: e.clientX, left: scroller.current.scrollLeft };
    scroller.current.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    const d = drag.current;
    if (d) scroller.current.scrollLeft = d.left - (e.clientX - d.x);
  };
  const onUp = () => { drag.current = null; };

  return (
    <div className="pr-rd">
      <div className="pr-rd__view" ref={view}>
        <div className="pr-rd__scroll" ref={scroller} onScroll={onScroll} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          <div className="pr-rd__map" style={{ width: W, height: H }}>
            <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} aria-hidden="true" className="pr-rd__svg">
              {segs.map((s) => (
                <g key={s.u.key} className={!s.u.open ? "pr-rd__shut" : ""}>
                  <Landscape x0={s.x0} x1={s.x1} height={H} tone={s.region.banner} name={s.region.name} tier={tier}
                    seed={`${prog.level}|${s.u.key}`} horizon={0.3} ground={0.93}
                    landmarkAt={s.landmarkAt} landmarkScale={s.u.exam ? 1.5 : 1.1} landmarkBack={1} />
                </g>
              ))}
              {/* A soft haze where one unit's land meets the next. */}
              <defs>
                <linearGradient id="rdSeam" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ffffff" stopOpacity="0" /><stop offset=".5" stopColor="#ffffff" stopOpacity=".2" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
              {segs.slice(1).map((s) => <rect key={s.u.key} x={s.x0 - 40} y="0" width="80" height={H} fill="url(#rdSeam)" />)}
              <Road W={W} H={H} walked={walked} />
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

            {segs.flatMap((s) => s.stops.map((t, k) => (
              <div key={t.l.n} className="pr-rd__stop" style={{ left: t.x - 28, top: roadY(t.x) - 28 }}>
                {/* The lesson's own object; an exam has its castle instead. */}
                {!s.u.exam && (
                  <Badge piece={s.region.pieces[(k + s.i) % s.region.pieces.length]} tone={s.region.banner}
                    locked={t.l.state === "is-locked"} id={`bd${prog.level.length}-${t.l.n}`} />
                )}
                <Station l={t.l} here={t.l.n === hereN} tone={s.region.banner} onOpen={(n) => onOpenLesson(prog.level, n)} />
              </div>
            )))}
          </div>
        </div>
        {edges.left && <button type="button" className="pr-rd__arrow is-left" aria-label="Back along the road" onClick={() => scroller.current.scrollBy({ left: -scroller.current.clientWidth * 0.7, behavior: "smooth" })}>‹</button>}
        {edges.right && <button type="button" className="pr-rd__arrow is-right" aria-label="On along the road" onClick={() => scroller.current.scrollBy({ left: scroller.current.clientWidth * 0.7, behavior: "smooth" })}>›</button>}
      </div>

      {/* Every unit by name: a jump along the road. */}
      <nav className="pr-rd__units" aria-label="Units" ref={units}>
        {segs.map((s) => (
          <button key={s.u.key} data-unit={s.u.key} type="button" className={`${s.u.done ? "is-done" : ""} ${!s.u.open ? "is-locked" : ""} ${s.stops.some((t) => t.l.n === hereN) ? "is-here" : ""} ${inView === s.u.key ? "is-view" : ""}`}
            style={{ "--tone": s.region.banner }} onClick={() => goTo((s.x0 + s.x1) / 2)}>
            <i>{s.u.no === "0" ? "Start" : s.u.exam ? "★" : s.u.no}</i>{s.u.title}
          </button>
        ))}
      </nav>
    </div>
  );
}

/** The road on a wide screen; the islands (PracticeMap.jsx) on a phone. */
export default function PracticeRoad({ prog, onOpenLesson, solo = true }) {
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
      {wide ? <RoadMap prog={prog} onOpenLesson={onOpenLesson} solo={solo} /> : <PracticeMap prog={prog} onOpenLesson={onOpenLesson} />}
    </div>
  );
}
