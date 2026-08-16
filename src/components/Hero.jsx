import { useEffect, useRef } from "react";
import { useLang } from "../i18n.jsx";
import { CONTACT, FOUNDER } from "../data/site.js";
import results from "../data/results.json";

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
        <div className="hero__copy">
          <p className="hero__eyebrow">
            <span className="hero__dot" aria-hidden="true" />
            {h.eyebrow}
          </p>

          <h1 className="hero__motto">
            {h.headline.map((line, i) => (
              <span className="hero__line" key={i} style={{ animationDelay: `${0.12 + i * 0.16}s` }}>
                {line.accent ? <em>{line.text}</em> : line.text}
              </span>
            ))}
          </h1>

          <p className="hero__sub">{h.sub}</p>

          {/* Speaking 9.0 is deliberately absent here — it is the seal on the
              portrait, where the eye lands first. Repeating it would spend the
              strongest fact twice and read as padding. */}
          <ul className="hero__creds">
            <li>
              <strong>{FOUNDER.writing}</strong>
              <span>{h.creds.writing}</span>
            </li>
            <li>
              <strong>{FOUNDER.years}+</strong>
              <span>{h.creds.years}</span>
            </li>
            <li>
              <strong>{results.length}+</strong>
              <span>{h.creds.results}</span>
            </li>
          </ul>

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

        <div className="hero__portrait" ref={tiltRef}>
          {/* The seal is anchored to this wrapper, not to the column: the
              column is full-width and the photograph is not, so anchoring to
              the column left the badge floating in space on narrow screens. */}
          <div className="hero__portrait-inner">
            <div className="hero__portrait-ring" aria-hidden="true" />
            <figure className="hero__portrait-frame">
              <img
                src={FOUNDER.photo}
                srcSet={`${FOUNDER.photoSm} 420w, ${FOUNDER.photo} 640w`}
                sizes="(max-width: 1000px) 300px, 420px"
                width="640"
                height="640"
                alt={`${FOUNDER.name} — ${h.role}`}
                fetchPriority="high"
              />
              <figcaption>
                <span className="hero__portrait-name">{FOUNDER.name}</span>
                <span className="hero__portrait-role">{h.role}</span>
              </figcaption>
            </figure>

            {/* The single strongest credential, pulled out of the list so it
                reads even to a visitor who only glances at the photograph. */}
            <div className="hero__seal">
              <span className="hero__seal-band">{FOUNDER.speaking}</span>
              <span className="hero__seal-text">{h.seal}</span>
            </div>
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#method" aria-label={h.badge}>
        <span aria-hidden="true" />
      </a>

      <p className="visually-hidden">{CONTACT.phone}</p>
    </section>
  );
}
