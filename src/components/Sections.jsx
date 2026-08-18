import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import results from "../data/results.json";
import stories from "../data/stories.json";
import team from "../data/team.json";
import { CONTACT } from "../data/site.js";
import JourneyRoad from "./JourneyRoad.jsx";
import { CertLightbox, ScoreRow } from "./Results.jsx";

const CARD_ICONS = ["🚀", "🗓️", "👨‍👩‍👧", "🖥️", "📚", "📜"];

/** true below the given viewport width, live-updating on resize */
export function useIsMobile(bp = 860) {
  const [m, setM] = useState(() => matchMedia(`(max-width: ${bp}px)`).matches);
  useEffect(() => {
    const q = matchMedia(`(max-width: ${bp}px)`);
    const sync = () => setM(q.matches);
    q.addEventListener("change", sync);
    window.addEventListener("resize", sync);
    return () => {
      q.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
    };
  }, [bp]);
  return m;
}

/** One-frame slideshow with dots: auto-advances, swipeable, pausable. */
export function Pager({ slides, className = "" }) {
  const [slide, setSlide] = useState(0);
  const lastTouchRef = useRef(0);
  const frameRef = useRef(null);
  const n = slides.length;

  useEffect(() => {
    const iv = setInterval(() => {
      if (Date.now() - lastTouchRef.current < 6000 || document.hidden) return;
      setSlide((s) => (s + 1) % n);
    }, 5000);
    return () => clearInterval(iv);
  }, [n]);

  // Native swipe listeners: horizontal swipes page back/forward, vertical
  // flicks pass through untouched so page scrolling never hijacks a slide.
  // Interaction only DELAYS autoplay (6s) — it never stops it.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    let sx = 0, sy = 0;
    const onStart = (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; };
    const onEnd = (e) => {
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        lastTouchRef.current = Date.now();
        setSlide((s) => (((s + (dx < 0 ? 1 : -1)) % n) + n) % n);
      }
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [n]);

  const go = (i) => {
    lastTouchRef.current = Date.now();
    setSlide(((i % n) + n) % n);
  };

  return (
    <div className={`adv-pager ${className}`}>
      <div className="adv-pager__frame" ref={frameRef}>
        {slides.map((s, i) => (
          <div className={`adv-slide ${i === slide ? "is-active" : ""}`} key={i} aria-hidden={i !== slide}>
            {s}
          </div>
        ))}
      </div>
      <div className="adv-pager__dots" role="tablist">
        {Array.from({ length: n }, (_, i) => (
          <button key={i} className={i === slide ? "is-active" : ""} aria-label={`Slide ${i + 1}`} onClick={() => go(i)} />
        ))}
      </div>
    </div>
  );
}

/** Counts a numeric stat up from 0 the first time it scrolls into view. */
function CountUp({ value }) {
  const m = String(value).match(/^(\d+(?:\.\d)?)(.*)$/);
  const target = m ? parseFloat(m[1]) : null;
  const suffix = m ? m[2] : "";
  const decimals = m && m[1].includes(".") ? 1 : 0;
  const [shown, setShown] = useState(target === null ? value : 0);
  const ref = useRef(null);

  useEffect(() => {
    if (target === null || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(value);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const dur = 1300;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown((target * eased).toFixed(decimals) + (p === 1 ? suffix : ""));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return <span ref={ref}>{shown}</span>;
}

export function Stats() {
  const { t } = useLang();
  const topBand = results.reduce((m, r) => Math.max(m, parseFloat(r.band)), 0).toFixed(1);
  const firstYear = Math.min(...results.filter((r) => r.date).map((r) => Number(r.date.slice(-4))));
  const years = new Date().getFullYear() - firstYear;
  const items = [
    [`${results.length}+`, t.stats.results],
    [topBand, t.stats.top],
    [`${years}+`, t.stats.years],
    [t.stats.programVal, t.stats.program],
  ];
  return (
    <section className="stats">
      <div className="container stats__grid">
        {items.map(([val, label]) => (
          <div className="stats__item" key={label}>
            <span className="stats__value"><CountUp value={val} /></span>
            <span className="stats__label">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// index in t.adv.cards -> photo shown on the carousel card
// (0 = fast-start visual, 1 = week strip, 2 = Parent App phone — custom-rendered)
const CARD_PHOTOS = {
  3: "/adv/classroom.webp",
  4: "/adv/oxford.webp",
};

/** Mon–Sun strip: 3 teacher + 3 mentor days, Sunday Event — app every day. */
function WeekStrip() {
  const { t } = useLang();
  const days = [
    ["teacher", "📖"], ["mentor", "🧭"], ["teacher", "📖"], ["mentor", "🧭"],
    ["teacher", "📖"], ["mentor", "🧭"], ["event", "🎉"],
  ];
  return (
    <div className="week-strip" aria-hidden="true">
      {days.map(([kind, icon], i) => (
        <div className={`week-strip__day week-strip__day--${kind}`} style={{ "--i": i }} key={i}>
          <span className="week-strip__icons">
            <span>{icon}</span>
            <span>📱</span>
          </span>
          <em>{t.adv.week[kind]}</em>
        </div>
      ))}
    </div>
  );
}

// photo card index -> overlay badge key in t.adv.badges
const CARD_BADGES = { 3: "classes", 4: "oxford" };

// card index -> the section that elaborates on it; tapping the card goes
// there (same tap-through behaviour as the results card). "/#..." form so
// the links also work from the /register pager.
const CARD_LINKS = {
  0: "/#courses", // 1-month fast start -> the journey
  1: "/#pricing", // weekly teacher/mentor rhythm -> listed in what's included
  3: "/#teachers", // small classes -> who teaches them
  4: "/#faq", // Oxford program -> materials answer in the FAQ
  5: "/#courses", // structured system -> the level-by-level journey
  6: "/#results", // score podium -> the certificates
};

/** Checklist visual for the structured-system card: checks pulse in turn. */
/** The four stages as a numbered ladder rather than a tick list.
 *
 *  This card was the most prose-heavy in the carousel — 277 characters of copy
 *  against a visual holding 22% of the height. The claim it makes is that the
 *  programme is a SEQUENCE, so drawing it as one lets the picture carry the
 *  argument and the paragraph stop having to. */
function MethodSteps({ steps }) {
  return (
    <ol className="method-steps" aria-hidden="true">
      {steps.map((s, i) => (
        <li style={{ "--i": i }} key={s}>
          <span className="method-steps__num">{i + 1}</span>
          <span className="method-steps__label">{s}</span>
        </li>
      ))}
    </ol>
  );
}

/** Band-score column chart for the results card, computed from the real
 *  manifest. Column heights use a sqrt scale so the gold 8.0 column stays
 *  readable next to the much larger 7.0 group. */
function ScorePodium() {
  const { t } = useLang();
  const bands = ["7.0", "7.5", "8.0"];
  const counts = bands.map((b) => results.filter((r) => r.band === b).length);
  const max = Math.max(...counts);
  return (
    <div className="score-podium" aria-hidden="true">
      <div className="score-podium__total">
        <strong>{results.length}+</strong>
        <span>{t.adv.badges.results.replace(/^\d+\+?\s*/, "")}</span>
      </div>
      <div className="score-podium__chart">
        {bands.map((b, j) => (
          <div
            className={`score-podium__col ${b === "8.0" ? "score-podium__col--gold" : ""}`}
            style={{ "--i": j }}
            key={b}
          >
            <span className="score-podium__count">
              {b === "8.0" && <em>★</em>}
              {counts[j]}
            </span>
            <span
              className="score-podium__pillar"
              style={{ height: `${Math.round(Math.sqrt(counts[j] / max) * 82)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="score-podium__bands">
        {bands.map((b) => (
          <span className="score-podium__band" key={b}>{b}</span>
        ))}
      </div>
    </div>
  );
}

export function AdvCarousel({ mode = "track" }) {
  const { t } = useLang();
  const c = t.adv.cards;
  const trackRef = useRef(null);
  const lastTouchRef = useRef(0);

  const scrollByCard = (dir) => {
    const track = trackRef.current;
    const card = track?.querySelector(".adv-card");
    if (!track || !card) return;
    lastTouchRef.current = Date.now();
    track.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: "smooth" });
  };

  // Desktop (hover devices): continuous slow drift, marquee-style.
  // Touch devices: snap one poster card every 5s, Inter Nation-style.
  // Both pause while the visitor interacts; cards are rendered twice
  // for a seamless loop.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const touch = () => { lastTouchRef.current = Date.now(); };

    // Pause only for REAL carousel interaction. Vertical page scrolling that
    // merely passes over the cards must never stop the autoplay, so touch
    // pauses only once a swipe proves horizontal, wheel only on horizontal
    // deltas, and the mouse only while it is actually moving over the track
    // (pointerover would re-fire as cards drift under a parked cursor and
    // stall the loop forever).
    let sx = 0, sy = 0, horizontal = false;
    const onTouchStart = (e) => {
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; horizontal = false;
    };
    const onTouchMove = (e) => {
      const dx = Math.abs(e.touches[0].clientX - sx);
      const dy = Math.abs(e.touches[0].clientY - sy);
      if (horizontal || (dx > 8 && dx > dy)) { horizontal = true; touch(); }
    };
    const onWheel = (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) touch(); };
    const onPointerMove = (e) => { if (e.pointerType === "mouse") touch(); };
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("wheel", onWheel, { passive: true });
    track.addEventListener("pointermove", onPointerMove, { passive: true });

    const isTouch = matchMedia("(hover: none)").matches;
    let raf, iv;

    if (isTouch) {
      iv = setInterval(() => {
        if (Date.now() - lastTouchRef.current < 5000 || document.hidden) return;
        const card = track.querySelector(".adv-card");
        if (!card) return;
        const step = card.offsetWidth + 20;
        const half = track.scrollWidth / 2;
        if (track.scrollLeft >= half) track.scrollLeft -= half; // invisible loop reset
        // align to the card grid so a manual swipe can never derail autoplay
        const next = (Math.round(track.scrollLeft / step) + 1) * step;
        track.scrollTo({ left: next, behavior: "smooth" });
      }, 5000);
    } else {
      const drift = () => {
        if (Date.now() - lastTouchRef.current > 3500 && !document.hidden) {
          const half = track.scrollWidth / 2;
          if (half > track.clientWidth) {
            track.scrollLeft = track.scrollLeft >= half ? track.scrollLeft - half : track.scrollLeft + 0.7;
          }
        }
        raf = requestAnimationFrame(drift);
      };
      raf = requestAnimationFrame(drift);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      if (iv) clearInterval(iv);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  const cardSet = (copy) => [
      <article className="adv-card adv-card--app" key={`app-${copy}`}>
        <div className="adv-card__body">
          <h3>{t.adv.app.t}</h3>
          <p>{t.adv.app.d}</p>
        </div>
        <div className="adv-card__phone">
          <img src="/brand/app-home.webp" alt="Smart LC Student App home screen" loading="lazy" />
        </div>
      </article>,

      ...c.map((card, i) => {
        const photo = CARD_PHOTOS[i];
        const badge = CARD_BADGES[i];
        const inner = (
          <>
            {photo && (
              <div className="adv-card__photo">
                <img src={photo} alt="" loading="lazy" />
                {badge && <span className="adv-card__badge">{t.adv.badges[badge]}</span>}
              </div>
            )}
            {i === 0 && (
              <div className="fast-start" aria-hidden="true">
                <div className="fast-start__panel">
                  <span className="fast-start__rocket">🚀</span>
                  <span className="fast-start__num">{t.adv.fastStart.num}</span>
                  <span className="fast-start__unit">{t.adv.fastStart.unit}</span>
                </div>
                <div className="fast-start__path">
                  <span className="fast-start__stop">Beginner</span>
                  <span className="fast-start__dots" />
                  <span className="fast-start__stop fast-start__stop--next">Elementary</span>
                </div>
              </div>
            )}
            {i === 1 && <WeekStrip />}
            {i === 7 && (
              <div className="pair" aria-hidden="true">
                <span className="pair__who">
                  <b>📖</b>{t.adv.week.teacher}
                </span>
                <span className="pair__arm" />
                <span className="pair__you">🎓</span>
                <span className="pair__arm" />
                <span className="pair__who pair__who--mentor">
                  <b>🧭</b>{t.adv.week.mentor}
                </span>
              </div>
            )}
            <div className="adv-card__body">
              <h3>{card.t}</h3>
              <p>{card.d}</p>
            </div>
            {i === 0 && (
              <div className="adv-card__fill">
                <img src="/adv/study.webp" alt="" loading="lazy" />
              </div>
            )}
            {i === 1 && (
              <div className="adv-card__fill">
                <img src="/adv/tutor.webp" alt="" loading="lazy" />
              </div>
            )}
            {i === 5 && card.steps && <MethodSteps steps={card.steps} />}
            {i === 6 && <ScorePodium />}
            {i === 2 && (
              <div className="adv-card__phone adv-card__phone--parent">
                <img src="/brand/parent-home.webp" alt="Smart LC Parent App home screen" loading="lazy" />
              </div>
            )}
          </>
        );
        const link = CARD_LINKS[i];
        const cls = ["adv-card"];
        if (i === 0) cls.push("adv-card--fast");
        if (i === 1) cls.push("adv-card--week");
        if (i === 2) cls.push("adv-card--parent-app");
        if (i === 3) cls.push("adv-card--classes");
        if (i === 4) cls.push("adv-card--oxford");
        if (i === 5) cls.push("adv-card--method");
        if (i === 6) cls.push("adv-card--results");
        if (i === 7) cls.push("adv-card--pair");
        if (link) cls.push("adv-card--link");
        return (
          <article className={cls.join(" ")} key={`${card.t}-${copy}`}>
            {link ? <a href={link}>{inner}</a> : inner}
          </article>
        );
      }),

      <article className="adv-card adv-card--events" key={`events-${copy}`}>
        <div className="adv-card__body">
          <span className="event-card__day">Sunday</span>
          <h3>{t.events.title}</h3>
          <ul className="adv-events">
            {t.events.list.map((e) => (
              <li key={e.name}>
                <span className="adv-events__icon" aria-hidden="true">{e.icon}</span>
                <div>
                  <strong>{e.name}</strong>
                  <small>{e.d}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </article>,
  ];

  if (mode === "pager") {
    return <Pager slides={cardSet(0)} />;
  }

  return (
    <div className="adv">
      <button className="adv__arrow adv__arrow--prev" aria-label="Previous" onClick={() => scrollByCard(-1)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <div className="adv__track" ref={trackRef}>
        {cardSet(0)}
        {cardSet(1)}
      </div>
      <button className="adv__arrow adv__arrow--next" aria-label="Next" onClick={() => scrollByCard(1)}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
      </button>
    </div>
  );
}

export function Advantages() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section__title">{t.adv.title}</h2>
        <p className="section__sub">{t.adv.sub}</p>
      </div>
      <AdvCarousel mode={isMobile ? "pager" : "track"} />
    </section>
  );
}

export function Courses() {
  const { t } = useLang();
  return (
    <section className="section section--alt" id="courses">
      <div className="container">
        <h2 className="section__title">{t.courses.title}</h2>
        <p className="section__sub">{t.courses.sub}</p>
        <JourneyRoad />
      </div>
    </section>
  );
}

/** Airport-style departures board: what an IELTS certificate unlocks.
 *  Board chrome ("DEPARTURES", "BOARDING") stays in English on purpose —
 *  real departure boards do. */
export function Unlocks() {
  const { t } = useLang();
  const u = t.unlocks;
  return (
    <section className="section section--dark unlocks" id="unlocks">
      <div className="container">
        <h2 className="section__title">{u.title}</h2>
        <p className="section__sub">{u.sub}</p>
        <div className="board">
          <div className="board__head">
            <span className="board__dot" aria-hidden="true" />
            DEPARTURES
          </div>
          {u.rows.map((r, i) => (
            <div className="board__row" style={{ "--i": i }} key={r.dest}>
              <span className="board__icon" aria-hidden="true">{r.icon}</span>
              <span className="board__dest">
                <strong>{r.dest}</strong>
                <small>{r.d}</small>
              </span>
              <span className="board__band">IELTS {r.band}</span>
              <span className="board__status"><i aria-hidden="true" />Boarding</span>
            </div>
          ))}
        </div>
        <GoalPicker />
      </div>
    </section>
  );
}

/** Interactive goal picker: choose a destination, see the band you need,
 *  the road there, and a level-check CTA — the board made personal. */
function GoalPicker() {
  const { t } = useLang();
  const g = t.unlocks.goal;
  const [sel, setSel] = useState(0);
  const active = g.goals[sel];
  return (
    <div className="goal">
      <h3 className="goal__title">{g.title}</h3>
      <p className="goal__sub">{g.sub}</p>
      <div className="goal__chips" role="tablist">
        {g.goals.map((item, i) => (
          <button
            key={item.label}
            role="tab"
            aria-selected={i === sel}
            className={`goal__chip ${i === sel ? "is-active" : ""}`}
            onClick={() => setSel(i)}
          >
            <span aria-hidden="true">{item.icon}</span> {item.label}
          </button>
        ))}
      </div>
      <div className="goal__result" key={active.label}>
        <div className="goal__band">
          <em>{g.target}</em>
          <strong>{active.band.includes("B2") ? active.band : `IELTS ${active.band}`}</strong>
        </div>
        <div className="goal__text">
          <p>{active.need}</p>
          <p className="goal__plan">{active.plan}</p>
          <a className="btn btn--primary" href="/placement">{g.cta} →</a>
        </div>
      </div>
    </div>
  );
}

/** What English itself gives — count-up tiles, light twin of the stats band. */
export function EnglishGives() {
  const { t } = useLang();
  const e = t.english;
  return (
    <section className="section english" id="english">
      <div className="container">
        <h2 className="section__title">{e.title}</h2>
        <p className="section__sub">{e.sub}</p>
        <div className="stats__grid english__grid">
          {e.items.map(([v, label]) => (
            <div className="stats__item" key={label}>
              <span className="stats__value"><CountUp value={v} /></span>
              <span className="stats__label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Alumni success stories — rich feature cards from src/data/stories.json:
 *  [{ id, name, photo|null, chips, title/story/quote: {en, uz, ru}, gallery? }].
 *  Photo falls back to an initials avatar until a portrait is provided. */
const STORIES_PAGE = 2;

/** Optional photo strip for a story that comes with more than one picture.
 *
 *  The strip loads thumbnails only — nine full-size images on a card that is
 *  itself below the fold would be about 1.8MB nobody asked for. The full file
 *  is fetched when a photo is actually opened.
 *
 *  CertLightbox is not reused here: it captions with an IELTS band and score
 *  row, which these photos do not have. */
function StoryGallery({ photos, name }) {
  const [open, setOpen] = useState(null);
  const step = (d) => setOpen((i) => (i + d + photos.length) % photos.length);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, photos.length]);

  return (
    <>
      <div className="story-gallery">
        {photos.map((p, i) => (
          <button
            className="story-gallery__thumb"
            key={p.src}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={p.caption}
          >
            <img src={p.thumb} alt={p.caption} loading="lazy" />
          </button>
        ))}
      </div>
      {open !== null && (
        <div className="lightbox" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <button className="lightbox__close" aria-label="Close">✕</button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img className="story-lightbox__img" src={photos[open].src} alt={`${name} — ${photos[open].caption}`} />
            <figcaption>
              <strong>{photos[open].caption}</strong>
              <span>{open + 1} / {photos.length}</span>
            </figcaption>
          </figure>
          {photos.length > 1 && (
            <>
              <button
                className="story-lightbox__nav story-lightbox__nav--prev"
                type="button"
                aria-label="Previous photo"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
              >‹</button>
              <button
                className="story-lightbox__nav story-lightbox__nav--next"
                type="button"
                aria-label="Next photo"
                onClick={(e) => { e.stopPropagation(); step(1); }}
              >›</button>
            </>
          )}
        </div>
      )}
    </>
  );
}

export function SuccessStories() {
  const { t, lang } = useLang();
  const [shown, setShown] = useState(STORIES_PAGE);
  // drafts wait for missing details (e.g. the student's name) before showing
  const live = stories.filter((s) => !s.draft);
  if (!live.length) return null;
  const L = (v) => (v ? v[lang] ?? v.en : null);
  return (
    <section className="section section--alt" id="stories">
      <div className="container">
        <h2 className="section__title">{t.stories.title}</h2>
        <p className="section__sub">{t.stories.sub}</p>
        <div className="stories">
          {live.slice(0, shown).map((s, i) => (
            <article
              className={`story ${i % 2 ? "story--flip" : ""} ${!s.photo ? "story--nophoto" : ""}`}
              key={s.id}
            >
              {s.photo && (
                <div className="story__media">
                  <img src={s.photo} alt={s.name} loading="lazy" />
                </div>
              )}
              <div className="story__body">
                <div className="story__chips">
                  {s.chips.map((c) => (
                    <span className="band-chip" key={c}>{c}</span>
                  ))}
                </div>
                <h3>{s.name}</h3>
                <p className="story__role">{L(s.title)}</p>
                <p className="story__text">{L(s.story)}</p>
                {s.quote && <blockquote className="story__quote">{L(s.quote)}</blockquote>}
                {s.gallery?.length > 0 && <StoryGallery photos={s.gallery} name={s.name} />}
              </div>
            </article>
          ))}
        </div>
        {shown < live.length && (
          <div className="stories__more-wrap">
            <button className="stories__more" type="button" onClick={() => setShown(shown + STORIES_PAGE)}>
              {t.stories.more} (+{live.length - shown})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/** Free level check — the low-commitment first step, after the results. */
export function LevelCheck() {
  const { t } = useLang();
  const lc = t.levelCheck;
  return (
    <section className="section" id="level-check">
      <div className="container">
        <div className="lcheck">
          <div className="lcheck__info">
            <h2 className="section__title">{lc.title}</h2>
            <p className="lcheck__name">{lc.name}</p>
            <ul className="lcheck__steps">
              {lc.steps.map(([icon, text]) => (
                <li key={text}>
                  <span aria-hidden="true">{icon}</span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
          <div className="lcheck__cta">
            {/* Free online placement test — public, no account needed */}
            <a className="btn btn--primary btn--lg" href="/placement">{lc.cta} →</a>
            <span className="lcheck__or">{lc.or}</span>
            <a className="btn btn--ghost" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRICE = "700 000";

export function Pricing() {
  const { t } = useLang();
  const isMobile = useIsMobile();
  const cards = t.pricing.plans.map((plan) => (
    <article className="price-card" key={plan.name}>
      <h3>{plan.name}</h3>
      <p className="price-card__desc">{plan.desc}</p>
      <div className="price-card__price">
        <strong>{PRICE}</strong>
        <span>so'm</span>
        <em>{t.pricing.perMonth}</em>
      </div>
      <ul className="price-card__features">
        {plan.features.map((f) => (
          <li key={f}><span aria-hidden="true">✓</span>{f}</li>
        ))}
      </ul>
      <a className="btn btn--primary" href="/register">{t.pricing.cta}</a>
    </article>
  ));
  return (
    <section className="section" id="pricing">
      <div className="container">
        <h2 className="section__title">{t.pricing.title}</h2>
        <p className="section__sub">{t.pricing.sub}</p>
        {isMobile ? (
          <Pager slides={cards} className="adv-pager--pricing" />
        ) : (
          <div className="pricing__grid">{cards}</div>
        )}
      </div>
    </section>
  );
}

/** The team, certificate-first: every member's own TRF is on the card,
 *  zoomable with the lens and expandable into the full-screen viewer. */
export function Teachers() {
  const { t } = useLang();
  const [zoom, setZoom] = useState(null);
  return (
    <section className="section" id="teachers">
      <div className="container">
        <h2 className="section__title">{t.teachers.title}</h2>
        <p className="section__sub">{t.teachers.sub}</p>
        <div className="team__grid">
          {team.map((m) => (
            <article className={`team-card ${m.founder ? "team-card--founder" : ""}`} key={m.id}>
              <button
                className="team-card__cert zoomable"
                type="button"
                onClick={() => setZoom(m)}
                aria-label={`View IELTS ${m.band} certificate — ${m.name}`}
              >
                <img src={m.img} alt="" loading="lazy" />
              </button>
              <div className="team-card__meta">
                <h3>{m.name}</h3>
                {t.teachers.roles?.[m.id] && <span className="team-card__role">{t.teachers.roles[m.id]}</span>}
                <div className="team-card__bands">
                  <span className="band-chip band-chip--lg">IELTS {m.band}</span>
                  <span className="band-chip band-chip--outline">{m.cefr}</span>
                </div>
                <ScoreRow scores={m.scores} />
              </div>
              {t.teachers.bios?.[m.id] && <p className="team-card__bio">{t.teachers.bios[m.id]}</p>}
            </article>
          ))}
        </div>
      </div>
      {zoom && <CertLightbox cert={zoom} onClose={() => setZoom(null)} />}
    </section>
  );
}
