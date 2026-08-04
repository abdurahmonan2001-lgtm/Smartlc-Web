import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { CONTACT } from "../data/site.js";
import results from "../data/results.json";
import { CertLightbox } from "./Results.jsx";

const featured = results.filter((r) => r.band === "8.0").slice(0, 3);

export default function Hero() {
  const { t } = useLang();
  const [zoom, setZoom] = useState(null);
  return (
    <section className="hero" id="top">
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">{t.hero.eyebrow}</p>
          <h1 className="hero__motto">
            {t.hero.motto.map((word, i) => (
              <span className="hero__word" style={{ animationDelay: `${0.15 + i * 0.22}s` }} key={word}>
                {word}{" "}
              </span>
            ))}
          </h1>
          <p className="hero__sub">{t.hero.sub}</p>
          <div className="hero__ctas">
            <a className="btn btn--primary btn--lg" href="/register">
              {t.nav.enroll}
            </a>
            <a className="btn btn--ghost btn--lg" href={CONTACT.phoneHref}>
              {t.hero.cta2}
            </a>
          </div>
          <a className="hero__badge" href="#results">
            <strong>{results.length}+</strong> {t.hero.badge} →
          </a>
        </div>

        <div className="hero__cards">
          {featured.map((r, i) => (
            <button
              className={`hero__card hero__card--${i}`}
              key={r.img}
              type="button"
              onClick={() => setZoom(r)}
              aria-label={`View IELTS ${r.band} certificate — ${r.name}`}
            >
              <img src={r.img} alt="" loading="eager" />
              <div className="hero__card-label">
                <span className="band-chip">{r.band}</span>
                <span>{r.name}</span>
                <span className="hero__card-zoom" aria-hidden="true">🔍</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {zoom && <CertLightbox cert={zoom} onClose={() => setZoom(null)} />}
    </section>
  );
}
