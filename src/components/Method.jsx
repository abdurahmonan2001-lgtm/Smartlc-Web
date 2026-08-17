import { useLang } from "../i18n.jsx";
import { FOUNDER } from "../data/site.js";

// The argument the whole site rests on: an IELTS course that drills past papers
// trains you to recognise questions, and a course that teaches you to think
// trains you to answer any of them. This section makes that case explicitly,
// side by side, because it is the one thing a visitor cannot get from a price
// list or a wall of certificates.
//
// It sits immediately after the hero. Everything below it — courses, prices,
// results — is evidence for the claim made here.

const PillarIcon = ({ d }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
    strokeLinecap="round" strokeLinejoin="round" width="24" height="24" aria-hidden="true">
    <path d={d} />
  </svg>
);

// Four line-drawings, in the order the pillars are read.
const PILLAR_PATHS = [
  // eye / seeing what is really being asked
  "M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Zm10 2.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z",
  // branching thought
  "M12 3v7m0 0-5 4.5M12 10l5 4.5M12 3a1.8 1.8 0 1 0 0-.1M7 14.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Zm10 0a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6Z",
  // puzzle piece / problem solving
  "M9 3h6v3.2a2 2 0 1 0 3.4 1.4H21v6h-3.2a2 2 0 1 0-1.4 3.4V21H9v-3.2a2 2 0 1 1-3.4-1.4H3v-6h2.6A2 2 0 1 0 9 6.2Z",
  // rising person / growth
  "M4 20V9m5 11V4m5 16v-8m5 8V7",
];

export default function Method() {
  const { t } = useLang();
  const m = t.method;

  return (
    <section className="section method" id="method">
      <div className="container">
        <header className="method__head">
          <h2 className="section__title">{m.title}</h2>
          <p className="section__sub method__lead">{m.lead}</p>
        </header>

        {/* The contrast. Rows are paired so the eye reads across, not down —
            each line of "most preparation" has its answer opposite. */}
        <div className="method__compare">
          <div className="method__col method__col--them">
            <h3>{m.themTitle}</h3>
            <ul>
              {m.rows.map((r, i) => (
                <li key={i} style={{ "--i": i }}>
                  <span className="method__x" aria-hidden="true">✕</span>
                  {r.them}
                </li>
              ))}
            </ul>
          </div>

          <div className="method__vs" aria-hidden="true">
            <span>{m.vs}</span>
          </div>

          <div className="method__col method__col--us">
            <h3>{m.usTitle}</h3>
            <ul>
              {m.rows.map((r, i) => (
                <li key={i} style={{ "--i": i }}>
                  <span className="method__tick" aria-hidden="true">✓</span>
                  {r.us}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="method__pillars">
          {m.pillars.map((p, i) => (
            <article className="method__pillar" key={p.title} style={{ "--i": i }}>
              <span className="method__pillar-ico">
                <PillarIcon d={PILLAR_PATHS[i]} />
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>

        {/* Signed, because the promise above is a personal one. */}
        <figure className="method__quote">
          <blockquote>{m.quote}</blockquote>
          <figcaption>
            <img src="/brand/founder-thumb.webp" width="200" height="200" alt="" loading="lazy" />
            <span>
              <strong>{FOUNDER.name}</strong>
              <em>{m.signature}</em>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
