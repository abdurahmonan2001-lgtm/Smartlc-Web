import { useEffect } from "react";
import { LangProvider } from "./i18n.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import { Stats, Advantages, Courses, Unlocks, EnglishGives, SuccessStories, LevelCheck, Pricing, Teachers } from "./components/Sections.jsx";
import Results from "./components/Results.jsx";
import { Testimonials, Location, Faq, Footer } from "./components/Closing.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import ContactBand from "./components/ContactBand.jsx";
import PracticeApp from "./practice/PracticeApp.jsx";
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
  useScrollReveal(!isRegister && !isPractice);

  if (isPractice) return <PracticeApp />;

  return (
    <LangProvider>
      {isRegister ? (
        <RegisterPage />
      ) : (
        <>
          <Nav />
          <main>
            {/* Act 1 — why learn English at all */}
            <Hero />
            <EnglishGives />
            {/* Act 2 — how you do it with Smart LC */}
            <Advantages />
            <ContactBand kind="telegram" />
            <Courses />
            <Pricing />
            <ContactBand kind="phone" />
            <Teachers />
            <ContactBand kind="instagram" />
            {/* Act 3 — what it gives you */}
            <Unlocks />
            <Stats />
            <Results />
            <SuccessStories />
            <LevelCheck />
            <Testimonials />
            <Location />
            <ContactBand kind="phone" />
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
