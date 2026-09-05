import { useEffect, useState } from "react";
import { useLang, LANGS } from "../i18n.jsx";
import { CONTACT } from "../data/site.js";
import { PhoneIcon, TelegramIcon } from "./Icons.jsx";
import { AdvCarousel } from "./Sections.jsx";

// ── Ad attribution capture ──────────────────────────────────────────────────
// Runs once at first page load (module scope, so it fires on the landing page,
// not just when the visitor reaches the form). Click ids and UTM tags live in
// the LANDING url — by the time someone navigates to /register they're gone —
// so they are stashed in sessionStorage and attached to the lead on submit.
// This is what lets the CRM price a website lead back to the exact ad.
const ATTR_KEY = "slc_attr";
try {
  const q = new URLSearchParams(window.location.search);
  const found = {};
  // ad_id/adset_id/campaign_id arrive via Meta's dynamic URL parameters
  // ({{ad.id}} etc. in the ad's tracking template) — they let the CRM price
  // a website lead back to the exact ad, same as an instant-form lead.
  for (const k of ["fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "ad_id", "adset_id", "campaign_id"]) {
    if (q.get(k)) found[k] = q.get(k);
  }
  const prev = JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}");
  sessionStorage.setItem(ATTR_KEY, JSON.stringify({
    // First touch wins: a re-visit without tags must not erase the ad that
    // actually brought them.
    ...found, ...prev,
    landing_page: prev.landing_page || window.location.href,
    referrer: prev.referrer || document.referrer || "",
  }));
} catch { /* storage blocked — the lead still saves, just unattributed */ }

const storedAttr = () => {
  try { return JSON.parse(sessionStorage.getItem(ATTR_KEY) || "{}"); }
  catch { return {}; }
};

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
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("idle"); // idle | sending | done | error

  const digits = phone.replace(/\D/g, "");
  const ageNum = Number(age);
  const ageValid = age !== "" && ageNum >= 3 && ageNum <= 99;
  const valid = name.trim().length >= 2 && ageValid && digits.length === 9;

  // after a successful registration, return the visitor to the main site
  // (the thank-you screen shows for a few seconds first)
  useEffect(() => {
    if (state !== "done") return;
    const t = setTimeout(() => { window.location.href = "/"; }, 3500);
    return () => clearTimeout(t);
  }, [state]);

  const submit = async (e) => {
    e.preventDefault();
    if (!valid || state === "sending") return;
    setState("sending");
    const attr = storedAttr();
    const lead = {
      name: name.trim(),
      age: ageNum,
      phone: `+998${digits}`,
      lang,
      page: "register",
      ts: new Date().toISOString(),
      // Ad attribution — lets the CRM credit this lead to the exact ad.
      fbclid: attr.fbclid || null,
      ad_id: attr.ad_id || null,
      adset_id: attr.adset_id || null,
      campaign_id: attr.campaign_id || null,
      utm: {
        source: attr.utm_source || null,
        medium: attr.utm_medium || null,
        campaign: attr.utm_campaign || null,
        content: attr.utm_content || null,
        term: attr.utm_term || null,
      },
      landing_page: attr.landing_page || null,
      referrer: attr.referrer || null,
    };
    try {
      // Lead collection endpoint — wired up at deploy time (Vercel function).
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      // Tell the Meta Pixel a lead happened — this is the optimization event
      // for website-destination ad sets. Guarded: a blocked pixel must never
      // break the visitor's confirmation.
      try { window.fbq && window.fbq("track", "Lead"); } catch { /* ignore */ }
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
              <input
                className="reg__age"
                type="text"
                inputMode="numeric"
                maxLength={2}
                placeholder={r.age}
                value={age}
                onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
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
