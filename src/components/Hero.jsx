import { useEffect, useRef } from "react";
import { useLang } from "../i18n.jsx";
import { CONTACT, FOUNDER } from "../data/site.js";

// A founder-led hero, composed as three columns over one photograph.
//
//   left   — given name, then the statement the whole site argues
//   centre — the figure, cut out, standing in front of the wordmark
//   right  — family name, then both band scores
//
// The name is split across the stage rather than set above it, so the
// photograph interrupts it and the two read as one line broken by him instead
// of a caption placed near him. Nothing sits above or below the stage: the
// hero begins at the nav and ends at his feet, where the white panel takes
// over.
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

  // Split on the last space, so a middle name would stay with the given name
  // rather than being orphaned on the wrong side of the photograph.
  const cut = FOUNDER.name.lastIndexOf(" ");
  const given = FOUNDER.name.slice(0, cut);
  const family = FOUNDER.name.slice(cut + 1);

  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__stage">
          {/* Behind the figure and wider than him, so he hides its middle.
              That occlusion is what tells the eye they share a space. */}
          <span className="hero__wordmark" aria-hidden="true">SMART LC</span>

          {/* The name whole, for screen readers and search engines, which
              should not have to reassemble it from two placed halves. */}
          <h2 className="hero__fullname visually-hidden">{FOUNDER.name}</h2>

          <div className="hero__side hero__side--left">
            <p className="hero__namepart" aria-hidden="true">{given}</p>
            <h1 className="hero__statement">
              {h.headline.map((line, i) => (
                <span className="hero__line" key={i} style={{ animationDelay: `${0.12 + i * 0.16}s` }}>
                  {line.accent ? <em>{line.text}</em> : line.text}
                </span>
              ))}
            </h1>
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

          <div className="hero__side hero__side--right">
            <p className="hero__namepart" aria-hidden="true">{family}</p>
            <div className="hero__scores">
              <div className="hero__score">
                <strong>{FOUNDER.speaking}</strong>
                <i aria-hidden="true" />
                <span>Speaking</span>
                <em>{h.twice}</em>
              </div>
              <div className="hero__score">
                <strong>{FOUNDER.writing}</strong>
                <i aria-hidden="true" />
                <span>Writing</span>
                <em>{h.twice}</em>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="visually-hidden">{CONTACT.phone}</p>
    </section>
  );
}

/** The buttons, at the top of the white panel.
 *
 *  They live here rather than in the hero so the photograph runs all the way
 *  down to the panel's edge and the two meet with no dark gap between them. */
export function HeroIntro() {
  const { t } = useLang();
  const h = t.hero;
  return (
    <section className="intro" id="intro">
      <div className="container intro__ctas">
        <a className="btn btn--primary btn--lg" href="/register">
          {t.nav.enroll}
        </a>
        <a className="btn btn--ghost-green btn--lg" href="/placement">
          {h.cta2}
        </a>
      </div>
    </section>
  );
}
