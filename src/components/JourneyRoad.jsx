import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";

const DWELL = 2100; // ms at a normal stop
const DWELL_IELTS = 3200; // a beat longer at the exam stop
const DWELL_END = 4500; // the long pause happens at the goal stop

function BusSvg() {
  return (
    <svg viewBox="0 0 64 40" width="58" height="36" aria-hidden="true">
      <rect x="2" y="4" width="60" height="26" rx="7" fill="#009472" />
      <rect x="7" y="9" width="10" height="9" rx="2" fill="#d9f6ee" />
      <rect x="20" y="9" width="10" height="9" rx="2" fill="#d9f6ee" />
      <rect x="33" y="9" width="10" height="9" rx="2" fill="#d9f6ee" />
      <rect x="46" y="9" width="11" height="9" rx="2" fill="#ffe9b3" />
      <rect x="6" y="22" width="52" height="4" rx="2" fill="#00745a" />
      <circle cx="16" cy="32" r="6" fill="#0c1f1d" />
      <circle cx="16" cy="32" r="2.5" fill="#8fb0aa" />
      <circle cx="48" cy="32" r="6" fill="#0c1f1d" />
      <circle cx="48" cy="32" r="2.5" fill="#8fb0aa" />
    </svg>
  );
}

export default function JourneyRoad() {
  const { t } = useLang();
  const steps = t.courses.steps;
  const n = steps.length;
  const goal = t.courses.goal;
  // `at` is the bus position: -1 = open road before Beginner, 0..n-1 = course
  // stops, n = the "Your Goal" stop beyond IELTS, n+1 = rolling off the road.
  // The bus only ever moves forward; the loop restarts with an instant
  // (transition-free) jump back to -1.
  const [at, setAt] = useState(-1);
  const [driving, setDriving] = useState(false);
  const [jump, setJump] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sectionRef = useRef(null);
  const scrollerRef = useRef(null);
  const runningRef = useRef(false);
  const jumpRef = useRef(false);

  // run the loop only while the road is on screen
  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => { runningRef.current = e.isIntersecting; },
      { threshold: 0.3 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    let alive = true;
    const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));

    (async () => {
      while (alive) {
        if (!runningRef.current) { await wait(600); continue; }
        for (let i = 0; i < n && alive; i++) {
          setDriving(true);
          setAt(i);
          await wait(1300); // matches the CSS transition time
          setDriving(false);
          await wait(i === n - 1 ? DWELL_IELTS : DWELL);
        }
        if (!alive) break;
        // one more hop: the goal beyond IELTS, where the long pause happens
        setDriving(true);
        setAt(n);
        await wait(1300);
        setDriving(false);
        await wait(DWELL_END);
        if (!alive) break;
        // ride forward off the road — no reversing. The restart is seamless:
        // fade out beyond the edge, teleport while invisible, let the road
        // pan home, then fade back in on the open road before Beginner.
        setDriving(true);
        setAt(n + 1);
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
        setHidden(false);
        await wait(800);
      }
    })();

    return () => { alive = false; timers.forEach(clearTimeout); };
  }, [n]);

  // keep the bus visible on narrow screens; on restart the road pans home
  // smoothly while the bus is faded out
  useEffect(() => {
    const sc = scrollerRef.current;
    if (!sc || sc.scrollWidth <= sc.clientWidth) return;
    const k = Math.min(Math.max(at, 0), n);
    const target = (k / n) * (sc.scrollWidth - 160) - sc.clientWidth / 2 + 80;
    sc.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, [at, n]);

  // n+1 points on the road (courses + goal), inset so there is open road
  // before Beginner and after the goal
  const pos = (i) => `${8 + (i / n) * 85}%`;
  const busPos = at <= -1 ? "2%" : at > n ? "107%" : pos(at);
  const isGoal = at >= n;
  const active = isGoal ? goal : steps[Math.max(at, 0)];

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
          {/* the destination beyond IELTS: university, visa, career */}
          <div
            className={`road__stop road__stop--goal ${at >= n ? "is-passed is-current" : ""}`}
            style={{ left: pos(n) }}
          >
            <span className="road__sign">🏆</span>
            <span className="road__pole" aria-hidden="true" />
            <span className="road__tag">
              <span className="road__label">{goal.name}</span>
              <span className="road__sub">{goal.sub}</span>
            </span>
          </div>
          <div
            className={`road__bus ${driving ? "is-driving" : ""} ${jump ? "is-jumping" : ""} ${hidden ? "is-hidden" : ""}`}
            style={{ left: busPos }}
          >
            <BusSvg />
          </div>
        </div>
      </div>

      <div className="road-detail" key={active.name}>
        <div className="road-detail__top">
          <span className="journey__level">{active.level}</span>
          <h3>{active.name}</h3>
          {!isGoal && (
            <span className="journey__dur">{active.dur} {active.dur === 1 ? t.courses.month : t.courses.months}</span>
          )}
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
