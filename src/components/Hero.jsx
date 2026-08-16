import { useEffect, useRef } from "react";
import { useLang } from "../i18n.jsx";
import { CONTACT, FOUNDER } from "../data/site.js";

// A founder-led hero. The certificates that used to sit here now live on the
// results wall further down: a visitor arriving from an advert needs to know
// WHO is going to teach them before they are shown proof of what past students
// scored, and a face does that in a way three certificate thumbnails cannot.
//
// The portrait tracks the pointer very slightly (a few degrees of tilt). It is
// pointer-only and disabled under prefers-reduced-motion, so it never affects
// touch users or anyone who has asked for stillness.
function useTilt(enabled) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        // -1..1 across the element, clamped so a pointer far away does not
        // keep pushing the tilt further.
        const x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / r.width));
        const y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / r.height));
        el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 6).toFixed(2)}deg`);
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);
  return ref;
}

export default function Hero() {
  const { t } = useLang();
  const tiltRef = useTilt(true);
  const h = t.hero;

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      {/* An oversized ghost wordmark behind everything. It is what stops a
          dark hero reading as an empty rectangle with a photo pasted on:
          the eye registers structure at a size the headline cannot reach. */}
      <span className="hero__watermark" aria-hidden="true">IELTS</span>
      <div className="container hero__inner">
        <p className="hero__eyebrow">
          <span className="hero__dot" aria-hidden="true" />
          {h.eyebrow}
        </p>

        {/* The name is set above the photograph in widely tracked capitals —
            the treatment a masthead uses. At this tracking it reads as a
            title rather than a caption, which is what lets the space around
            the figure stay empty without looking unfinished. */}
        <p className="hero__name">{FOUNDER.name}</p>

        {/* The figure is the centrepiece, and the only things allowed to share
            the space with it are the two band scores. Everything that explains
            the offer waits until below. */}
        <div className="hero__stage">
          <div className="hero__score hero__score--left">
            <strong>{FOUNDER.speaking}</strong>
            <i aria-hidden="true" />
            <span>Speaking</span>
            <em>{h.twice}</em>
          </div>

          <div className="hero__portrait" ref={tiltRef}>
            <div className="hero__portrait-inner">
              <div className="hero__portrait-ring" aria-hidden="true" />
              <img
                className="hero__figure"
                src={FOUNDER.cutout}
                srcSet={`${FOUNDER.cutoutSm} 520w, ${FOUNDER.cutout} 900w`}
                sizes="(max-width: 780px) 300px, 470px"
                width="900"
                height="1213"
                alt={`${FOUNDER.name} — ${h.role}`}
                fetchPriority="high"
              />
            </div>
          </div>

          <div className="hero__score hero__score--right">
            <strong>{FOUNDER.writing}</strong>
            <i aria-hidden="true" />
            <span>Writing</span>
            <em>{h.twice}</em>
          </div>
        </div>

        <p className="hero__role">{h.role}</p>

        <h1 className="hero__motto">
          {h.headline.map((line, i) => (
            <span className="hero__line" key={i} style={{ animationDelay: `${0.12 + i * 0.16}s` }}>
              {line.accent ? <em>{line.text}</em> : line.text}
            </span>
          ))}
        </h1>

        <p className="hero__sub">{h.sub}</p>

        <div className="hero__ctas">
          <a className="btn btn--primary btn--lg" href="/register">
            {t.nav.enroll}
          </a>
          <a className="btn btn--ghost btn--lg" href="/placement">
            {h.cta2}
          </a>
        </div>

        <a className="hero__badge" href="#method">
          {h.badge} <span aria-hidden="true">↓</span>
        </a>
      </div>

      <a className="hero__scroll" href="#method" aria-label={h.badge}>
        <span aria-hidden="true" />
      </a>

      <p className="visually-hidden">{CONTACT.phone}</p>
    </section>
  );
}
