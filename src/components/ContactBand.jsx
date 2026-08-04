import { useLang } from "../i18n.jsx";
import { CONTACT } from "../data/site.js";
import { TelegramIcon, InstagramIcon, PhoneIcon } from "./Icons.jsx";

const KINDS = {
  telegram: { href: CONTACT.telegram, Icon: TelegramIcon, external: true },
  phone: { href: CONTACT.phoneHref, Icon: PhoneIcon, external: false },
  instagram: { href: CONTACT.instagram, Icon: InstagramIcon, external: true },
  register: { href: "/register", Icon: null, external: false },
};

/** Slim one-line contact CTA shown between sections; `kind` picks the channel. */
export default function ContactBand({ kind, dark = false }) {
  const { t } = useLang();
  const { href, Icon, external } = KINDS[kind];
  const band = t.bands[kind];
  return (
    <div className={`cta-band ${dark ? "cta-band--dark" : ""}`}>
      <p>{band.text}</p>
      <a
        className={`btn ${kind === "register" ? "btn--primary" : "btn--band"}`}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
      >
        {Icon && <Icon />} {band.cta}
      </a>
    </div>
  );
}
