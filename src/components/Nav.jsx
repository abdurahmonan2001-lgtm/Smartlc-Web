import { useState, useEffect } from "react";
import { useLang, LANGS } from "../i18n.jsx";
import { CONTACT } from "../data/site.js";
import { PhoneIcon } from "./Icons.jsx";

export default function Nav() {
  const { t, lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["#about", t.nav.about],
    ["#courses", t.nav.courses],
    ["#pricing", t.nav.pricing],
    ["#teachers", t.nav.teachers],
    ["#results", t.nav.results],
    ["#location", t.nav.location],
  ];

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__pill">
        <a href="#top" className="nav__logo">
          <img src="/brand/icon-96.png" alt="Smart Learning Centre logo" width="36" height="36" />
          <span>Smart <em>LC</em></span>
        </a>

        <nav className={`nav__links ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
          {links.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="nav__actions">
          <a className="nav__phone" href={CONTACT.phoneHref}>
            <PhoneIcon /> <span>{t.contact.phone}</span>
          </a>
          <div className="lang-switch" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button
                key={l.code}
                className={lang === l.code ? "is-active" : ""}
                onClick={() => setLang(l.code)}
              >
                {l.label}
              </button>
            ))}
          </div>
          <a className="btn btn--primary nav__cta" href="/register">
            <span className="nav__cta-full">{t.nav.enroll}</span>
            <span className="nav__cta-short">{t.nav.enrollShort}</span>
          </a>
          <button className="nav__burger" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
