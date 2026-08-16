import { useEffect, lazy, Suspense } from "react";
import { LangProvider } from "./i18n.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Method from "./components/Method.jsx";
import { Stats, Advantages, Courses, Unlocks, SuccessStories, LevelCheck, Pricing, Teachers } from "./components/Sections.jsx";
import Results from "./components/Results.jsx";
import { Testimonials, Location, Faq, Footer } from "./components/Closing.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import ContactBand from "./components/ContactBand.jsx";
// Loaded on demand: between them these carry every mock, practice paper and
// placement item, which is most of the bundle. A visitor reading the home page
// should not download the IELTS library to get there.
const PracticeApp = lazy(() => import("./practice/PracticeApp.jsx"));
const PlacementTest = lazy(() => import("./placement/PlacementTest.jsx"));
import Magnifier from "./components/Magnifier.jsx";

/** Fades each section in as it scrolls into view (skipped for reduced-motion users). */
function useScrollReveal(enabled) {
  useEffect(() => {
    if (!enabled || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const targets = document.querySelectorAll("main > section, main > .cta-band");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in-view");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -40px" }
    );
    targets.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
    return () => io.disconnect();
  }, [enabled]);
}

export default function App() {
  const path = window.location.pathname.replace(/\/$/, "");
  const isRegister = path === "/register";
  const isPractice = path === "/practice" || path.startsWith("/practice/");
  const isPlacement = path === "/placement";
  useScrollReveal(!isRegister && !isPractice && !isPlacement);

  if (isPractice || isPlacement) {
    return (
      <Suspense fallback={<div className="route-loading">Loading…</div>}>
        {isPractice ? <PracticeApp /> : <PlacementTest />}
      </Suspense>
    );
  }

  return (
    <LangProvider>
      {isRegister ? (
        <RegisterPage />
      ) : (
        <>
          <Nav />
          <main>
            {/* Act 1 — who teaches you, and on what argument */}
            <Hero />
            <Method />
            <Stats />
            <SuccessStories />
            {/* Act 2 — how you do it with Smart LC */}
            <Advantages />
            <ContactBand kind="telegram" />
            <Courses />
            <ContactBand kind="phone" />
            <Teachers />
            <ContactBand kind="instagram" />
            {/* Act 3 — what it gives you */}
            <Unlocks />
            <Results />
            <LevelCheck />
            <Testimonials />
            <Location />
            <ContactBand kind="phone" />
            {/* the price comes late — after the full case has been made */}
            <Pricing />
            <Faq />
            <ContactBand kind="telegram" />
          </main>
          <Footer />
          <Magnifier />
        </>
      )}
    </LangProvider>
  );
}
