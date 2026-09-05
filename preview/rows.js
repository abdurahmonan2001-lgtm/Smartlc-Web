// The made-up student both preview pages use.
//
// Every answer sheet is built from the paper's own answer key, so the
// questions, the explanations and the highlighted lines are all the real
// thing — only the ticks and crosses are invented.
//
// Not part of the app and not in the production build: vite builds
// index.html only, and nothing here is imported by src/.
import { getTest } from "../src/practice/content.js";
import { bandFor } from "../src/practice/review.jsx";
import SAMPLE from "../scripts/screens-data.json";

export const user = { username: "preview", full_name: "Preview Student" };

/* An answer sheet: every answer right except the numbers listed. */
const sheet = (testId, wrong, extra = {}) => {
  const t = getTest(testId);
  const a = {};
  for (const sec of t.sections) {
    for (const q of sec.questions) {
      if (q.type === "essay") continue;
      a[q.n] = Array.isArray(q.answer) ? q.answer[0] : q.answer;
    }
  }
  // A mix of wrong answers and blanks, so the boxes show all three states.
  wrong.forEach((n, i) => { a[n] = i % 3 === 2 ? "" : "WRONG"; });
  const total = Object.keys(a).length;
  const raw = total - wrong.length;
  return {
    student_username: user.username,
    test_id: testId,
    module: t.module,
    raw_score: raw,
    total,
    // Converted with the app's own table, never written by hand. Hand-written
    // bands here once showed 35/40 reading as band 6.0 — two whole bands under
    // what the same score scores in the app, and nothing to catch it.
    band: bandFor(raw, total, t.module),
    duration_seconds: 3300,
    answers: a,
    ...extra,
  };
};

/* The stored sample was marked when only Task 1 was graded. A real mock
 * writing paper has two, so the second is built here from the first —
 * different band, different essay, different corrections — or the preview
 * would never show the Task 1 / Task 2 switch that a real paper has. */
const TASK1 = SAMPLE.marked.feedback.tasks[0];
const TASK2 = {
  ...TASK1,
  task: 2,
  // A task's band is the four criteria averaged and floored to the half, the
  // way the grader does it (mock-writing-grade.js). Written by hand here, so
  // it has to agree with the criteria beside it: 7 + 6 + 6 + 5 = 24, ÷ 4 = 6.
  band: 6,
  words: 274,
  criteria: { task: 7, coherence: 6, lexical: 6, grammar: 5 },
  essay:
    "Some people believe that children should begin formal education as early as possible, "
    + "while others argue that they benefit more from starting later. In my opinion the age "
    + "matters less than what happens in the classroom.\n\n"
    + "Those who supports an early start point out that young children absorb language and "
    + "number quickly. A child of four who is read to every day will usually arrive at primary "
    + "school already able to recognise words, and this advantage tends to persist. Early "
    + "schooling also gives working parents reliable care, which is no small consideration.\n\n"
    + "On the other hand, there is evidence that countries where formal lessons begin at seven, "
    + "such as Finland, achieve excellent results. Their children spend their first years "
    + "playing, and play is how a small child learns to negotiate, to concentrate and to "
    + "recover from failure. If a four-year-old is made to sit at a desk, they may learn to "
    + "read sooner but learn to dislike reading.\n\n"
    + "In conclusion, I would argue that neither age is right by itself. What decides the "
    + "outcome is whether the teaching suits the child in front of it.",
  corrections: [
    { kind: "grammar", quote: "Those who supports an early start",
      fix: "Those who support an early start",
      why: "'Those who' is plural, so the verb takes no -s: those who support." },
    { kind: "vocabulary", quote: "no small consideration",
      fix: "an important consideration",
      why: "The double negative is a fixed phrase in English but it reads oddly here. Say what you mean directly." },
    { kind: "grammar", quote: "If a four-year-old is made to sit at a desk, they may learn to read sooner but learn to dislike reading.",
      fix: "…they may learn to read sooner but also learn to dislike it.",
      why: "The second 'learn' needs 'also' to balance the contrast, and 'reading' repeats the word you have just used." },
  ],
  summary:
    "Both views are covered and the position is clear, but the essay leans on general "
    + "assertion where an example would carry more weight, and one paragraph is noticeably "
    + "shorter than the others.",
  strengths: [
    "A clear position stated in the introduction and held to the end.",
    "The Finland example is specific and used to make an argument rather than dropped in.",
  ],
  improve: [
    "Balance the paragraph lengths — the third is half the length of the second.",
    "Watch subject-verb agreement after 'those who' and similar plural subjects.",
  ],
};

export const rows = [
  sheet("pset1-reading", [2, 9, 18, 24, 31, 37], { taken_at: "2026-08-20T10:00:00Z" }),
  sheet("pset1-listening", [4, 12, 19, 26, 33], { taken_at: "2026-08-18T10:00:00Z" }),
  sheet("mock1-listening", [3, 11, 15, 31], { taken_at: "2026-08-24T09:00:00Z" }),
  sheet("mock1-reading", [1, 4, 14, 21, 27], { taken_at: "2026-08-24T10:00:00Z" }),
  {
    student_username: user.username,
    test_id: "mock1-writing",
    module: "writing",
    raw_score: null,
    total: null,
    band: null,
    answers: {},
    taken_at: "2026-08-24T11:30:00Z",
    ai_band: SAMPLE.marked.band,
    ai_feedback: { ...SAMPLE.marked.feedback, tasks: [TASK1, TASK2] },
  },
];
