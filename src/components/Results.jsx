import { useRef, useState } from "react";
import { useLang } from "../i18n.jsx";
import results from "../data/results.json";

const BANDS = ["8.0", "7.5", "7.0"];
const MAX_PER_SET = 24;
const LENS = 190; // magnifier diameter, px
const ZOOM = 2.4;

/** Certificate image with a hover magnifier (desktop) / tap zoom (touch). */
function ZoomImage({ src, alt }) {
  const wrapRef = useRef(null);
  const [lens, setLens] = useState(null); // {x, y}
  const [tapZoom, setTapZoom] = useState(null); // {ox, oy}

  const move = (e) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) return setLens(null);
    setLens({ x, y, w: rect.width, h: rect.height });
  };

  const tap = (e) => {
    if (matchMedia("(hover: hover)").matches) return; // desktop uses the lens
    const rect = wrapRef.current.getBoundingClientRect();
    const ox = ((e.clientX - rect.left) / rect.width) * 100;
    const oy = ((e.clientY - rect.top) / rect.height) * 100;
    setTapZoom(tapZoom ? null : { ox, oy });
  };

  return (
    <div
      className="zoom"
      ref={wrapRef}
      onMouseMove={move}
      onMouseLeave={() => setLens(null)}
      onClick={tap}
    >
      <img
        src={src}
        alt={alt}
        style={tapZoom ? { transform: `scale(${ZOOM})`, transformOrigin: `${tapZoom.ox}% ${tapZoom.oy}%` } : undefined}
      />
      {lens && (
        <div
          className="zoom__lens"
          style={{
            left: lens.x - LENS / 2,
            top: lens.y - LENS / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${lens.w * ZOOM}px ${lens.h * ZOOM}px`,
            backgroundPosition: `${-(lens.x * ZOOM - LENS / 2)}px ${-(lens.y * ZOOM - LENS / 2)}px`,
          }}
        />
      )}
    </div>
  );
}

// "14.03.2025" -> sortable number; undated entries sink to the bottom
const dateKey = (r) => {
  if (!r.date) return 0;
  const [d, m, y] = r.date.split(".");
  return Number(`${y}${m}${d}`);
};
const byDateDesc = [...results].sort((a, b) => dateKey(b) - dateKey(a));

/** Full-screen certificate viewer with the magnifier — shared with the hero. */
export function CertLightbox({ cert, onClose }) {
  const { t } = useLang();
  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true">
      <button className="lightbox__close" aria-label={t.results.close}>✕</button>
      <figure onClick={(e) => e.stopPropagation()}>
        <ZoomImage src={cert.img} alt={`IELTS ${cert.band} — ${cert.name}`} />
        <figcaption>
          <strong>{cert.name} — IELTS {cert.band}{cert.date ? ` · ${cert.date.slice(-4)}` : ""}</strong>
          <ScoreRow scores={cert.scores} size="lg" />
          <span>{t.results.zoomHint}</span>
        </figcaption>
      </figure>
    </div>
  );
}

/** `highlight` names the skill the row is evidence FOR ("l"|"r"|"w"|"s").
 *  Without it the highest score is marked, which is right for a student's
 *  certificate — but wrong where the row backs a specific claim. On the
 *  founder's Writing 8.5 forms the Listening 9.0 was being highlighted
 *  instead, drawing the eye away from the very number the card exists to
 *  prove. */
export function ScoreRow({ scores, size, highlight }) {
  if (!scores) return null;
  const cells = [["L", scores.l, "l"], ["R", scores.r, "r"], ["W", scores.w, "w"], ["S", scores.s, "s"]];
  const top = Math.max(...cells.map(([, v]) => parseFloat(v)));
  const marked = ([, v, key]) => (highlight ? key === highlight : parseFloat(v) === top);
  return (
    <div className={`score-row ${size === "lg" ? "score-row--lg" : ""}`}>
      {cells.map((cell) => (
        <span className={`score-row__cell${marked(cell) ? " is-top" : ""}`} key={cell[2]}>
          <em>{cell[0]}</em>
          <strong>{cell[1]}</strong>
        </span>
      ))}
    </div>
  );
}

export default function Results() {
  const { t } = useLang();
  const [band, setBand] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const set = (band === "all" ? byDateDesc : results.filter((r) => r.band === band)).slice(0, MAX_PER_SET);
  const rowA = set.filter((_, i) => i % 2 === 0);
  const rowB = set.filter((_, i) => i % 2 === 1);

  const Row = ({ items, reverse }) =>
    items.length > 0 && (
      <div className="marquee marquee--results">
        <div className={`marquee__track ${reverse ? "marquee__track--reverse" : ""}`}>
          {[...items, ...items].map((r, i) => (
            <button className="result-card" key={`${r.img}-${i}`} onClick={() => setLightbox(r)}>
              <div className="result-card__img zoomable">
                <img src={r.img} alt={`IELTS ${r.band} — ${r.name}`} loading="lazy" />
              </div>
              <div className="result-card__meta">
                <span className="result-card__name">{r.name}</span>
                <span className="band-chip">{r.band}</span>
              </div>
              <ScoreRow scores={r.scores} />
            </button>
          ))}
        </div>
      </div>
    );

  return (
    <section className="section section--dark" id="results">
      <div className="container">
        <h2 className="section__title">{t.results.title}</h2>
        <p className="section__sub">{t.results.sub}</p>

        <div className="results__filters" role="group">
          <button className={band === "all" ? "is-active" : ""} onClick={() => setBand("all")}>
            {t.results.all}
          </button>
          {BANDS.map((b) => (
            <button className={band === b ? "is-active" : ""} onClick={() => setBand(b)} key={b}>
              {b} · {results.filter((r) => r.band === b).length}
            </button>
          ))}
        </div>
      </div>

      <Row items={rowA} />
      <Row items={rowB} reverse />

      {lightbox && <CertLightbox cert={lightbox} onClose={() => setLightbox(null)} />}
    </section>
  );
}
