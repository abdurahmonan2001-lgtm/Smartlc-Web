// A dev-only harness for the practice library's lesson cards: a made-up
// Pre-IELTS student at lesson 12 who has handed in some papers, so the done,
// half-done, current and missed cards can be looked at without signing in.
// Not part of the app and not in the production build.
//
//   http://localhost:5189/preview/library.html
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import { Library, LessonPage } from "../src/practice/PracticeApp.jsx";
import { BOOKS, TESTS } from "../src/practice/content.js";
import { bandFor } from "../src/practice/review.jsx";
import { accessFor, lessonPlan, lessonPapers, levelLabel, PROGRAMMES } from "../src/practice/access.js";

const level = new URLSearchParams(location.search).get("level") || PROGRAMMES[0].level;
const access = accessFor(level, 12);
// Lessons 1–9 handed in (lesson 4 only half), with a spread of scores.
const taken = new Map();
for (const { n, testIds } of lessonPlan(level)) {
  if (n > 9) break;
  testIds.forEach((id, k) => {
    if (n === 4 && k === 1) return;
    const t = TESTS.find((x) => x.id === id);
    const total = t ? t.sections.reduce((s, x) => s + x.questions.length, 0) : 10;
    const raw = Math.max(0, total - ((n * 3 + k * 5) % (total + 1)));
    taken.set(id, { raw, total, band: bandFor(Math.round((raw / total) * 40), 40, t?.module) });
  });
}

function App() {
  const [section, setSection] = useState("home");
  const [lesson, setLesson] = useState(null);
  if (lesson) return <LessonPage level={level} label={levelLabel(level)} n={lesson} access={access} takenPractice={taken}
    tests={lessonPapers(level, lesson).map((id) => TESTS.find((t) => t.id === id)).filter(Boolean)}
    user={{ username: "preview", full_name: "Preview Student" }} onBack={() => setLesson(null)} onOpenBrief={() => {}} />;
  return <Library user={{ username: "preview", full_name: "Preview Student" }} books={BOOKS} tests={TESTS}
    takenMocks={new Set()} completedMocks={new Set()} takenPractice={taken} access={access}
    picked={section} setSection={setSection}
    onLogout={() => {}} onResults={() => {}} onOpenBook={() => {}} onOpenLesson={(_l, n) => setLesson(n)} onNotebook={() => {}} />;
}
createRoot(document.getElementById("root")).render(<App />);
