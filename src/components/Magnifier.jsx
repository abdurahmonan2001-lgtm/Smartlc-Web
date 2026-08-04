import { useEffect, useRef } from "react";

const SIZE = 210; // lens diameter, px
const ZOOM = 2.5;

/**
 * Round magnifying lens that follows the cursor over any `.zoomable`
 * certificate image (results marquee, hero cards) — same behaviour as the
 * magnifier on the old smartlc.uz. Desktop only; touch devices keep the
 * tap-to-open lightbox. The lightbox has its own lens, so it is skipped.
 */
export default function Magnifier() {
  const lensRef = useRef(null);

  useEffect(() => {
    if (!matchMedia("(hover: hover)").matches) return;
    const lens = lensRef.current;
    const hide = () => { lens.style.display = "none"; };

    const move = (e) => {
      const under = document.elementFromPoint(e.clientX, e.clientY);
      if (!under || under.closest(".lightbox")) return hide();
      const holder = under.closest(".zoomable");
      const img = holder?.querySelector("img") ?? (holder?.tagName === "IMG" ? holder : null);
      if (!img || !img.complete) return hide();
      const r = img.getBoundingClientRect();
      const relX = e.clientX - r.left;
      const relY = e.clientY - r.top;
      lens.style.display = "block";
      lens.style.left = `${e.clientX}px`;
      lens.style.top = `${e.clientY}px`;
      lens.style.backgroundImage = `url("${img.src}")`;
      lens.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
      lens.style.backgroundPosition = `${-(relX * ZOOM - SIZE / 2)}px ${-(relY * ZOOM - SIZE / 2)}px`;
    };

    document.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      document.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      window.removeEventListener("scroll", hide);
    };
  }, []);

  return <div className="magnifier-lens" ref={lensRef} aria-hidden="true" />;
}
