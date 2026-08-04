import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

const DWELL = 1050; // ms at a normal stop
const DWELL_END = 2250; // the long pause at the final IELTS stop

/* One vessel per level — each grander than the last, from a rowing dinghy
   at Beginner to a superyacht at IELTS. Premium flat-illustration style:
   curved silhouettes, gradient volume, glass bands, rimmed portholes.
   All face right; hulls share a waterline (container is bottom-anchored). */
const VESSELS = [
  // 0 · Beginner — rowing dinghy
  <svg viewBox="0 0 50 30" width="50" height="30" aria-hidden="true" key="v0">
    <defs>
      <linearGradient id="v0h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#00b389" /><stop offset="1" stopColor="#00674f" />
      </linearGradient>
    </defs>
    <line x1="23" y1="4" x2="35" y2="16" stroke="#a8713a" strokeWidth="2.6" strokeLinecap="round" />
    <ellipse cx="36.8" cy="17.6" rx="3.4" ry="1.7" fill="#8a5a2b" transform="rotate(45 36.8 17.6)" />
    <path d="M4 14 C13 12.4 37 12.4 46 14 L40 24.5 C32 28 18 28 10 24.5 Z" fill="url(#v0h)" />
    <path d="M4 14 C13 12.4 37 12.4 46 14 L44.5 16.5 C33 14.9 17 14.9 5.5 16.5 Z" fill="#f0cd77" />
    <path d="M12 25.6 C18 27.6 32 27.6 38 25.6 L40 24.5 C32 28 18 28 10 24.5 Z" fill="#004d3b" opacity="0.6" />
  </svg>,
  // 1 · Elementary — small sailboat, billowed sail
  <svg viewBox="0 0 60 48" width="60" height="48" aria-hidden="true" key="v1">
    <defs>
      <linearGradient id="v1s" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#c3e0d7" />
      </linearGradient>
      <linearGradient id="v1h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#00b389" /><stop offset="1" stopColor="#00674f" />
      </linearGradient>
    </defs>
    <rect x="29" y="2" width="2.2" height="31" rx="1.1" fill="#123531" />
    <path d="M33 4 Q46 19 51 33 L33 33 Z" fill="url(#v1s)" stroke="#9ec9bd" strokeWidth="0.9" strokeLinejoin="round" />
    <path d="M27 10 Q17 22 13.5 33 L27 33 Z" fill="#ddefe8" stroke="#9ec9bd" strokeWidth="0.9" strokeLinejoin="round" />
    <path d="M31 33 L51 33" stroke="#123531" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M6 35 C18 33.4 42 33.4 54 35 L47 43.5 C37 46.8 23 46.8 13 43.5 Z" fill="url(#v1h)" />
    <path d="M6 35 C18 33.4 42 33.4 54 35 L52.4 37.4 C40 35.8 20 35.8 7.6 37.4 Z" fill="#f0cd77" />
  </svg>,
  // 2 · Pre-Intermediate — two-sail sloop with a fluttering pennant
  <svg viewBox="0 0 72 54" width="72" height="54" aria-hidden="true" key="v2">
    <defs>
      <linearGradient id="v2s" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#c3e0d7" />
      </linearGradient>
      <linearGradient id="v2h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#00a37e" /><stop offset="1" stopColor="#005c46" />
      </linearGradient>
      <linearGradient id="v2g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#f0cd77" /><stop offset="1" stopColor="#d4a843" />
      </linearGradient>
    </defs>
    <rect x="34.5" y="2.5" width="2.4" height="36" rx="1.2" fill="#123531" />
    <path className="flag" d="M37.5 3 L49.5 6.4 L37.5 9.8 Z" fill="url(#v2g)" />
    <path d="M39 9 Q55 23 60.5 39 L39 39 Z" fill="url(#v2s)" stroke="#9ec9bd" strokeWidth="0.9" strokeLinejoin="round" />
    <path d="M32 14 Q21 26 17 39 L32 39 Z" fill="#ddefe8" stroke="#9ec9bd" strokeWidth="0.9" strokeLinejoin="round" />
    <path d="M37 39 L60.5 39" stroke="#123531" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M7 41 C21 39.2 51 39.2 65 41 L57 49.5 C45 52.8 27 52.8 15 49.5 Z" fill="url(#v2h)" />
    <path d="M7 41 C21 39.2 51 39.2 65 41 L63.3 43.5 C49 41.8 23 41.8 8.7 43.5 Z" fill="#f0cd77" />
  </svg>,
  // 3 · Intermediate — sleek motorboat, raked bow, tinted windshield
  <svg viewBox="0 0 84 42" width="84" height="42" aria-hidden="true" key="v3">
    <defs>
      <linearGradient id="v3c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e2f1ec" />
      </linearGradient>
      <linearGradient id="v3g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bfe9df" /><stop offset="1" stopColor="#6fbfae" />
      </linearGradient>
      <linearGradient id="v3h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#00a37e" /><stop offset="1" stopColor="#00543f" />
      </linearGradient>
    </defs>
    <path d="M22 8 C28 5.2 40 5.2 45 7.6 L53 20 L18 20 Z" fill="url(#v3c)" />
    <path d="M44 7.8 L53 20 L45.5 20 L39.5 8.4 Z" fill="url(#v3g)" />
    <rect x="24" y="11" width="7.5" height="5" rx="1.6" fill="#a5dccf" />
    <path d="M4 20 C20 17.6 52 17.6 66 19.2 Q76 20.4 80 24 L70 33.5 C52 38 26 38 12 33.5 Q5 29 4 23 Z" fill="url(#v3h)" />
    <path d="M4 20 C20 17.6 52 17.6 66 19.2 Q76 20.4 80 24 L78 26 C64 22.5 24 21.5 5.5 23 Z" fill="#f0cd77" />
    <path d="M14 34.2 C30 37.6 52 37.4 68 33.8 L70 33.5 C52 38 26 38 12 33.5 Z" fill="#003a2c" opacity="0.55" />
  </svg>,
  // 4 · Pre-IELTS — cabin cruiser: flybridge, glass band, rimmed portholes
  <svg viewBox="0 0 100 56" width="100" height="56" aria-hidden="true" key="v4">
    <defs>
      <linearGradient id="v4c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e2f1ec" />
      </linearGradient>
      <linearGradient id="v4g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bfe9df" /><stop offset="1" stopColor="#6fbfae" />
      </linearGradient>
      <linearGradient id="v4h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0a5a51" /><stop offset="1" stopColor="#032e28" />
      </linearGradient>
    </defs>
    <rect x="47" y="1.5" width="1.8" height="7" rx="0.9" fill="#123531" />
    <rect x="43.5" y="1.2" width="9" height="1.8" rx="0.9" fill="#123531" />
    <path d="M28 7 C34 4.4 46 4.4 51 6.6 L56 14.5 L24 14.5 Z" fill="url(#v4c)" />
    <rect x="31" y="8.6" width="18" height="3.6" rx="1.8" fill="url(#v4g)" />
    <path d="M14 14.5 C30 12.4 52 12.4 61 13.8 L67 25 L11 25 Z" fill="#f6fbfa" />
    <circle cx="24" cy="19.6" r="2.6" fill="url(#v4g)" stroke="#0a4d49" strokeWidth="0.9" />
    <circle cx="34" cy="19.6" r="2.6" fill="url(#v4g)" stroke="#0a4d49" strokeWidth="0.9" />
    <circle cx="44" cy="19.6" r="2.6" fill="url(#v4g)" stroke="#0a4d49" strokeWidth="0.9" />
    <circle cx="54" cy="19.6" r="2.6" fill="url(#v4g)" stroke="#0a4d49" strokeWidth="0.9" />
    <path d="M4 25 C24 22.6 62 22.6 76 24 Q86 25.4 90 28.6 L79 41.5 C58 46.5 28 46.5 15 41.5 Q6 36 4 29 Z" fill="url(#v4h)" />
    <path d="M4 25 C24 22.6 62 22.6 76 24 Q86 25.4 90 28.6 L88 30.8 C72 26.8 26 26.2 5.6 28.4 Z" fill="#f0cd77" />
    <path d="M17 42.2 C36 46.2 60 46 77 41.8 L79 41.5 C58 46.5 28 46.5 15 41.5 Z" fill="#001d18" opacity="0.5" />
  </svg>,
  // 5 · IELTS — the superyacht: three decks, radar arch, gold waterline
  <svg viewBox="0 0 130 66" width="130" height="66" aria-hidden="true" key="v5">
    <defs>
      <linearGradient id="v5c" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#e2f1ec" />
      </linearGradient>
      <linearGradient id="v5g" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#bfe9df" /><stop offset="1" stopColor="#6fbfae" />
      </linearGradient>
      <linearGradient id="v5h" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#0a4d49" /><stop offset="1" stopColor="#001512" />
      </linearGradient>
      <linearGradient id="v5f" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#f0cd77" /><stop offset="1" stopColor="#d4a843" />
      </linearGradient>
    </defs>
    <path d="M57 2 L60.5 2 L64 12 L53.5 12 Z" fill="#123531" />
    <rect x="52" y="4.6" width="13" height="1.6" rx="0.8" fill="#123531" />
    <path className="flag" d="M66 2.5 L78 5.5 L66 8.5 Z" fill="url(#v5f)" />
    <path d="M44 12 C50 9.4 62 9.4 67 11.4 L72 19 L40 19 Z" fill="url(#v5c)" />
    <rect x="47" y="13.8" width="19" height="3.4" rx="1.7" fill="url(#v5g)" />
    <path d="M28 19 C44 16.6 68 16.6 79 18.2 L86 30 L22 30 Z" fill="#f6fbfa" />
    <rect x="33" y="21.8" width="42" height="4" rx="2" fill="url(#v5g)" />
    <path d="M5 30 C32 27 80 27 98 28.8 Q114 30.6 120 35 L106 51.5 C80 57.5 42 57.5 24 51.5 Q10 45 5 35 Z" fill="url(#v5h)" />
    <path d="M5 30 C32 27 80 27 98 28.8 Q114 30.6 120 35 L117.6 37.8 C98 32.8 30 31.6 6.8 34.2 Z" fill="url(#v5f)" />
    <circle cx="34" cy="42" r="2.4" fill="url(#v5g)" stroke="#d4a843" strokeWidth="0.8" />
    <circle cx="48" cy="43" r="2.4" fill="url(#v5g)" stroke="#d4a843" strokeWidth="0.8" />
    <circle cx="62" cy="43.6" r="2.4" fill="url(#v5g)" stroke="#d4a843" strokeWidth="0.8" />
    <circle cx="76" cy="43.6" r="2.4" fill="url(#v5g)" stroke="#d4a843" strokeWidth="0.8" />
    <circle cx="90" cy="42.8" r="2.4" fill="url(#v5g)" stroke="#d4a843" strokeWidth="0.8" />
    <path d="M26 52.4 C52 58 84 57.6 104 51.8 L106 51.5 C80 57.5 42 57.5 24 51.5 Z" fill="#000b09" opacity="0.5" />
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
