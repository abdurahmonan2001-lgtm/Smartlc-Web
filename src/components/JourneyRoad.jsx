import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

const DWELL = 1050; // ms at a normal stop
const DWELL_END = 2250; // the long pause at the final IELTS stop

/* One vessel per level — each grander than the last, from a rowing dinghy
   at Beginner to a superyacht at IELTS. All face right, hulls sit on the
   same waterline (the container is bottom-anchored). */
const VESSELS = [
  // 0 · Beginner — rowing dinghy
  <svg viewBox="0 0 44 26" width="44" height="26" aria-hidden="true" key="v0">
    <line x1="21" y1="4" x2="33" y2="15" stroke="#8a5a2b" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M2 13 L42 13 L35 22 Q22 26 9 22 Z" fill="#009472" />
    <path d="M2 13 L42 13 L40.5 15.5 L3.5 15.5 Z" fill="#ffe9b3" />
  </svg>,
  // 1 · Elementary — small sailboat
  <svg viewBox="0 0 54 42" width="54" height="42" aria-hidden="true" key="v1">
    <rect x="26" y="2" width="2.5" height="26" rx="1" fill="#0c1f1d" />
    <path d="M30 4 L47 27 L30 27 Z" fill="#ffffff" />
    <path d="M24 10 L12 27 L24 27 Z" fill="#d9f6ee" />
    <path d="M4 29 L50 29 L43 38 Q27 42 11 38 Z" fill="#009472" />
    <path d="M4 29 L50 29 L48.5 31.5 L5.5 31.5 Z" fill="#ffe9b3" />
  </svg>,
  // 2 · Pre-Intermediate — two-sail sloop with a pennant
  <svg viewBox="0 0 64 46" width="64" height="46" aria-hidden="true" key="v2">
    <rect x="31" y="2" width="2.5" height="31" fill="#0c1f1d" />
    <path d="M34 2 L44 5 L34 8 Z" fill="#d4a843" />
    <path d="M35 7 L56 31 L35 31 Z" fill="#ffffff" />
    <path d="M29 10 L14 31 L29 31 Z" fill="#d9f6ee" />
    <path d="M4 33 L60 33 L52 42 Q32 46 12 42 Z" fill="#009472" />
    <path d="M4 33 L60 33 L58.5 35.5 L5.5 35.5 Z" fill="#ffe9b3" />
  </svg>,
  // 3 · Intermediate — motorboat
  <svg viewBox="0 0 72 36" width="72" height="36" aria-hidden="true" key="v3">
    <path d="M16 6 L38 6 L45 16 L14 16 Z" fill="#ffffff" />
    <rect x="20" y="9" width="7" height="5" rx="1" fill="#9fd8cc" />
    <rect x="30" y="9" width="7" height="5" rx="1" fill="#9fd8cc" />
    <path d="M2 16 L58 16 L70 20 L61 30 Q32 35 12 30 L2 23 Z" fill="#009472" />
    <path d="M2 16 L58 16 L70 20 L68.5 22 L3.5 18.5 Z" fill="#ffe9b3" />
  </svg>,
  // 4 · Pre-IELTS — cabin cruiser with flybridge
  <svg viewBox="0 0 86 48" width="86" height="48" aria-hidden="true" key="v4">
    <rect x="43" y="1" width="2" height="8" fill="#0c1f1d" />
    <path d="M26 5 L44 5 L49 12 L22 12 Z" fill="#ffffff" />
    <path d="M14 12 L56 12 L63 22 L11 22 Z" fill="#f4fbf9" />
    <circle cx="22" cy="17" r="2.5" fill="#9fd8cc" />
    <circle cx="32" cy="17" r="2.5" fill="#9fd8cc" />
    <circle cx="42" cy="17" r="2.5" fill="#9fd8cc" />
    <circle cx="52" cy="17" r="2.5" fill="#9fd8cc" />
    <path d="M2 22 L70 22 L84 27 L73 40 Q41 46 15 40 L2 31 Z" fill="#0a4d49" />
    <path d="M2 22 L70 22 L84 27 L82 29.5 L4 25 Z" fill="#ffe9b3" />
  </svg>,
  // 5 · IELTS — the superyacht
  <svg viewBox="0 0 108 56" width="108" height="56" aria-hidden="true" key="v5">
    <rect x="52" y="2" width="2.5" height="10" fill="#0c1f1d" />
    <path d="M55 3 L67 6 L55 9 Z" fill="#d4a843" />
    <path d="M36 8 L60 8 L66 16 L32 16 Z" fill="#ffffff" />
    <rect x="40" y="10.5" width="20" height="3.5" rx="1.75" fill="#9fd8cc" />
    <path d="M22 16 L74 16 L82 26 L16 26 Z" fill="#f4fbf9" />
    <rect x="27" y="19.5" width="6" height="4" rx="1" fill="#9fd8cc" />
    <rect x="37" y="19.5" width="6" height="4" rx="1" fill="#9fd8cc" />
    <rect x="47" y="19.5" width="6" height="4" rx="1" fill="#9fd8cc" />
    <rect x="57" y="19.5" width="6" height="4" rx="1" fill="#9fd8cc" />
    <rect x="67" y="19.5" width="6" height="4" rx="1" fill="#9fd8cc" />
    <path d="M2 26 L88 26 L106 32 L93 47 Q51 54 19 47 L2 37 Z" fill="#002b2a" />
    <path d="M2 26 L88 26 L106 32 L103.5 35 L4.5 30 Z" fill="#d4a843" />
  </svg>,
];

export default function JourneyRoad() {
  const { t } = useLang();
  const steps = t.courses.steps;
  const n = steps.length;
  // `at` is the bus position: -1 = open road before Beginner, 0..n-1 = course
  // stops, n = rolling off the road past IELTS. The bus only ever moves
  // forward; the loop restarts with an instant (transition-free) jump to -1.
  const [at, setAt] = useState(-1);
  const [driving, setDriving] = useState(false);
  const [jump, setJump] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const jumpRef = useRef(false);

  useEffect(() => {
    let alive = true;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    // drive only while the road is on screen — checked directly each pass
    // (an IntersectionObserver's callbacks ride on rendering steps and can
    // go undelivered in hidden/background tabs, deadlocking the loop)
    const roadVisible = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < innerHeight && r.bottom > 0;
    };

    (async () => {
      while (alive) {
        if (!roadVisible()) { await wait(600); continue; }
        for (let i = 0; i < n && alive; i++) {
          setDriving(true);
          setAt(i);
          await wait(1300); // matches the CSS transition time
          setDriving(false);
          await wait(i === n - 1 ? DWELL_END : DWELL);
        }
        if (!alive) break;
        // ride forward off the road — no reversing. The restart is seamless:
        // fade out beyond the right edge, teleport to just beyond the LEFT
        // edge while invisible, let the road pan home, then fade back in as
        // the next lap's drive-in begins — the bus visibly drives in from
        // the start rather than materialising in place.
        setDriving(true);
        setAt(n);
        await wait(1300);
        setDriving(false);
        setHidden(true);
        await wait(450);
        jumpRef.current = true;
        setJump(true);
        setAt(-1);
        await wait(650);
        jumpRef.current = false;
        setJump(false);
        await wait(60); // let the left transition re-arm before the drive-in
        setHidden(false);
        await wait(120);
      }
    })();

    return () => { alive = false; timers.forEach(clearTimeout); };
  }, [n]);

  // keep the bus visible on narrow screens; on restart the road pans home
  // smoothly while the bus is faded out
  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc || sc.scrollWidth <= sc.clientWidth) return;
    const k = Math.min(Math.max(at, 0), n - 1);
    const target = (k / (n - 1)) * (sc.scrollWidth - 160) - sc.clientWidth / 2 + 80;
    sc.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [at, n]);

  // inset the route: open water before Beginner and after IELTS
  const pos = (i) => `${9 + (i / (n - 1)) * 84}%`;
  // -1 sits just beyond the left edge so each lap opens with a sail-in
  const busPos = at <= -1 ? "-5%" : at >= n ? "107%" : pos(at);
  const active = steps[Math.min(Math.max(at, 0), n - 1)];
  // the vessel upgrades on ARRIVAL: while sailing toward stop i the
  // previous level's boat is still underneath you
  const vessel = Math.min(Math.max(driving ? at - 1 : at, 0), n - 1);

  return (
    <div className="road-wrap" ref={sectionRef}>
      <div className="road-scroller" ref={scrollerRef}>
        <div className="road">
          <div className="road__line" aria-hidden="true" />
          {steps.map((s, i) => (
            <div
              className={`road__stop ${i <= at ? "is-passed" : ""} ${i === at ? "is-current" : ""} ${i === n - 1 ? "road__stop--ielts" : ""}`}
              style={{ left: pos(i) }}
              key={s.name}
            >
              <span className="road__sign">{i === n - 1 ? "🎓" : ""}</span>
              <span className="road__pole" aria-hidden="true" />
              <span className="road__tag">
                <span className="road__label">{s.name}</span>
                <span className="road__sub">
                  {s.bands ? s.bands.join(" · ") : `${s.dur} ${s.dur === 1 ? t.courses.month : t.courses.months}`}
                </span>
              </span>
            </div>
          ))}
          <div
            className={`road__bus ${driving ? "is-driving" : ""} ${jump ? "is-jumping" : ""} ${hidden ? "is-hidden" : ""}`}
            style={{ left: busPos }}
          >
            <span className="boat" key={vessel}>{VESSELS[vessel]}</span>
          </div>
        </div>
      </div>

      <div className="road-detail" key={active.name}>
        <div className="road-detail__top">
          <span className="journey__level">{active.level}</span>
          <h3>{active.name}</h3>
          <span className="journey__dur">{active.dur} {active.dur === 1 ? t.courses.month : t.courses.months}</span>
        </div>
        <p>{active.d}</p>
      </div>

      <p className="journey__total">{t.courses.total}</p>
      <div className="road-cta">
        <a className="btn btn--primary btn--lg" href="/register">{t.courses.registerCta} →</a>
      </div>
    </div>
  );
}
