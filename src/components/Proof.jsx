import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { FOUNDER } from "../data/site.js";
import { CertLightbox, ScoreRow } from "./Results.jsx";

// The four Test Report Forms behind the two numbers in the hero.
//
// A band score advertised without its certificate is just a number, and this
// site's whole argument is that the claims on it are checkable. So the papers
// go up: two sittings at Speaking 9.0, two at Writing 8.5, each openable full
// size. Personal identifiers are blurred at build time — see
// scripts/process-founder-certs.mjs for exactly what and why.
//
// Shaped to match the student results wall so it reuses that lightbox rather
// than growing a second one.
const CERTS = [
  {
    key: "speaking-9-jun2023", claim: "speaking", date: "03.06.2023",
    img: "/founder-certs/speaking-9-jun2023.webp",
    thumb: "/founder-certs/speaking-9-jun2023-thumb.webp",
    band: "8.5", scores: { l: "9.0", r: "8.5", w: "7.0", s: "9.0" },
  },
  {
    key: "speaking-9-aug2025", claim: "speaking", date: "03.08.2025",
    img: "/founder-certs/speaking-9-aug2025.webp",
    thumb: "/founder-certs/speaking-9-aug2025-thumb.webp",
    band: "8.5", scores: { l: "9.0", r: "8.5", w: "7.0", s: "9.0" },
  },
  {
    key: "writing-85-sep2023", claim: "writing", date: "03.09.2023",
    img: "/founder-certs/writing-85-sep2023.webp",
    thumb: "/founder-certs/writing-85-sep2023-thumb.webp",
    band: "8.5", scores: { l: "9.0", r: "8.5", w: "8.5", s: "7.5" },
  },
  {
    key: "writing-85-sep2024", claim: "writing", date: "03.09.2024",
    img: "/founder-certs/writing-85-sep2024.webp",
    thumb: "/founder-certs/writing-85-sep2024-thumb.webp",
    band: "8.5", scores: { l: "9.0", r: "9.0", w: "8.5", s: "8.0" },
  },
];

export default function Proof() {
  const { t } = useLang();
  const p = t.proof;
  const [zoom, setZoom] = useState(null);

  return (
    <section className="section proof" id="proof">
      <div className="container">
        <p className="method__eyebrow">{p.eyebrow}</p>
        <h2 className="section__title">{p.title}</h2>
        <p className="section__sub">{p.sub}</p>

        <div className="proof__grid">
          {CERTS.map((c) => (
            <button
              className="proof__card"
              key={c.key}
              type="button"
              onClick={() => setZoom({ ...c, name: FOUNDER.name })}
              aria-label={`${p.open} — ${c.date}`}
            >
              <span className="proof__shot">
                <img src={c.thumb} alt="" loading="lazy" width="460" height="650" />
              </span>
              <span className="proof__meta">
                <span className="proof__claim">
                  <strong>{c.claim === "speaking" ? FOUNDER.speaking : FOUNDER.writing}</strong>
                  {c.claim === "speaking" ? p.speaking : p.writing}
                </span>
                <span className="proof__date">{c.date}</span>
              </span>
              {/* Marks the skill this form is evidence for, not the highest
                  number on it — otherwise the Writing cards highlight their
                  Listening 9.0 and point away from the claim. */}
              <ScoreRow scores={c.scores} highlight={c.claim === "speaking" ? "s" : "w"} />
            </button>
          ))}
        </div>

        <p className="proof__note">{p.note}</p>
      </div>

      {zoom && <CertLightbox cert={zoom} onClose={() => setZoom(null)} />}
    </section>
  );
}
