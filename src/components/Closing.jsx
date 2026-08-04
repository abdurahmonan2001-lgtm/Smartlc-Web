import { useState } from "react";
import { useLang } from "../i18n.jsx";
import { CONTACT, TESTIMONIALS, BUS_ROUTES } from "../data/site.js";
import { TelegramIcon, InstagramIcon, PhoneIcon, MailIcon, PinIcon } from "./Icons.jsx";
import MapView from "./MapView.jsx";

const MAP_QUERY = encodeURIComponent("Kashgar street 9A, Yunusabad district, Tashkent");

export function Testimonials() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="container">
        <h2 className="section__title">{t.testimonials.title}</h2>
        <p className="section__sub">{t.testimonials.sub}</p>
      </div>
      <div className="marquee">
        <div className="marquee__track">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((q, i) => (
            <blockquote className="quote-card" key={i}>
              <p>“{q.quote}”</p>
              <footer>
                <span>{q.name}</span>
                <span className="band-chip">{q.band}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Location() {
  const { t } = useLang();
  return (
    <section className="section section--alt" id="location">
      <div className="container">
        <h2 className="section__title">{t.location.title}</h2>
        <p className="section__sub">{t.location.sub}</p>
        <div className="location">
          <div className="location__info">
            <div className="location__row">
              <span className="location__icon"><PinIcon /></span>
              <div>
                <h3>{t.location.addressLabel}</h3>
                <p>{t.location.address}</p>
              </div>
            </div>
            <div className="location__row">
              <span className="location__icon"><PinIcon /></span>
              <div>
                <h3>{t.location.directionsLabel}</h3>
                <p>{t.location.directions}</p>
              </div>
            </div>
            <div className="location__buses">
              <h3>{t.location.busLabel}</h3>
              <div className="location__bus-chips">
                {BUS_ROUTES.map((b) => (
                  <span className="bus-chip" key={b}>{b}</span>
                ))}
              </div>
            </div>
            <a
              className="btn btn--primary"
              href={`https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`}
              target="_blank"
              rel="noreferrer"
            >
              {t.location.mapCta}
            </a>
          </div>
          <div className="location__map">
            <MapView
              labels={{
                address: t.location.address,
                minWalk: t.location.minWalk,
                qodiriy: "Abdulla Qodiriy",
                mustaqillik: "Mustaqillik Maydoni",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq() {
  const { t } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faq">
      <div className="container container--narrow">
        <h2 className="section__title">{t.faq.title}</h2>
        <div className="faq">
          {t.faq.items.map((item, i) => (
            <div className={`faq__item ${open === i ? "is-open" : ""}`} key={i}>
              <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {item.q}
                <span aria-hidden="true">{open === i ? "−" : "+"}</span>
              </button>
              <div className="faq__a"><p>{item.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="nav__logo">
            <img src="/brand/icon-96.png" alt="" width="32" height="32" />
            <span>Smart <em>LC</em></span>
          </span>
          <p className="footer__motto">{t.footer.tagline}</p>
        </div>
        <div className="footer__social">
          <a href={CONTACT.telegram} target="_blank" rel="noreferrer" aria-label="Telegram"><TelegramIcon /></a>
          <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramIcon /></a>
          <a href={CONTACT.phoneHref} aria-label="Phone"><PhoneIcon /></a>
          <a href={`mailto:${CONTACT.email}`} aria-label="Email"><MailIcon /></a>
        </div>
        <p>
          © {new Date().getFullYear()} Smart Learning Centre. {t.footer.rights}{" "}
          · <a className="footer__practice" href="/practice">Student Practice →</a>
        </p>
      </div>
    </footer>
  );
}
