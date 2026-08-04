import { useState } from "react";
import { useLang, LANGS } from "../i18n.jsx";
import { CONTACT } from "../data/site.js";
import { PhoneIcon, TelegramIcon } from "./Icons.jsx";
import { AdvCarousel } from "./Sections.jsx";

/** Formats a 9-digit Uzbek local number as "(XX) XXX-XX-XX" while typing. */
function formatLocal(digits) {
  const d = digits.slice(0, 9);
  let out = "";
  if (d.length > 0) out = `(${d.slice(0, 2)}`;
  if (d.length >= 2) out += ") ";
  if (d.length > 2) out += d.slice(2, 5);
  if (d.length > 5) out += "-" + d.slice(5, 7);
  if (d.length > 7) out += "-" + d.slice(7, 9);
  return out;
}

export default function RegisterPage() {
  const { t, lang, setLang } = useLang();
  const r = t.register;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error

  const digits = phone.replace(/\D/g, "");
  const valid = name.trim().length >= 2 && digits.length === 9;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || state === "sending") return;
    setState("sending");
    const lead = {
      name: name.trim(),
      phone: `+998${digits}`,
      lang,
      page: "register",
      ts: new Date().toISOString(),
    };
    try {
      // Lead collection endpoint — wired up at deploy time (Vercel function).
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      setState("done");
    } catch {
      setState("error");
    }
  };

  return (
    <div className="reg">
      <header className="reg__top">
        <a href="/" className="nav__logo">
          <img src="/brand/icon-96.png" alt="Smart Learning Centre logo" width="36" height="36" />
          <span>Smart <em>LC</em></span>
        </a>
        <div className="lang-switch" role="group" aria-label="Language">
          {LANGS.map((l) => (
            <button key={l.code} className={lang === l.code ? "is-active" : ""} onClick={() => setLang(l.code)}>
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <main className="reg__main reg__main--split">
        <div className="reg__col">
        {state !== "done" ? (
          <>
            <h1>
              {r.title1} <span className="reg__accent">{r.title2}</span>
            </h1>
            <p className="reg__sub">{r.sub}</p>
            <form className="reg__form" onSubmit={submit}>
              <input
                type="text"
                autoComplete="name"
                placeholder={r.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="reg__phone">
                <span>+998</span>
                <input
                  type="tel"
                  autoComplete="tel-national"
                  placeholder={r.phone}
                  value={phone}
                  onChange={(e) => setPhone(formatLocal(e.target.value.replace(/\D/g, "")))}
                  required
                />
              </div>
              <button className="btn btn--primary btn--lg" type="submit" disabled={!valid || state === "sending"}>
                {state === "sending" ? "…" : r.submit}
              </button>
            </form>
            {state === "error" && (
              <div className="reg__fallback">
                <p>{r.error}</p>
                <div className="reg__fallback-links">
                  <a className="btn btn--ghost" href={CONTACT.telegram} target="_blank" rel="noreferrer">
                    <TelegramIcon /> Telegram
                  </a>
                  <a className="btn btn--ghost" href={CONTACT.phoneHref}>
                    <PhoneIcon /> {CONTACT.phone}
                  </a>
                </div>
              </div>
            )}
            <p className="reg__motto">English Every Day</p>
          </>
        ) : (
          <div className="reg__done">
            <span className="reg__done-icon">✓</span>
            <h1>{r.doneTitle}</h1>
            <p className="reg__sub">{r.doneText}</p>
            <a className="btn btn--ghost" href="/">{r.back}</a>
          </div>
        )}
        </div>

        <aside className="reg__pager-col">
          <AdvCarousel mode="pager" />
        </aside>
      </main>
    </div>
  );
}
