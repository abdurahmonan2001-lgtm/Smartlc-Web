// ─── Practice content registry ──────────────────────────────────────
// Each test is a plain object following the schema below. Add new tests
// by creating an object and pushing it into TESTS — the library builds
// itself from this file. Books with no tests show as "coming soon".
//
// Test schema:
// {
//   id: "cam9-t1-reading",      unique id (stored with results)
//   bookId: "cam9",             must match a BOOKS entry
//   title: "Test 1 — Reading",
//   module: "reading",          reading | listening
//   durationMin: 60,
//   sections: [{
//     title: "Passage 1",
//     instructions: "You should spend about 20 minutes...",
//     passageTitle: "…",
//     passage: "…\n\n…",        paragraphs separated by blank lines
//     questions: [{
//       n: 1,
//       type: "tfng" | "ynng" | "mcq" | "gap" | "select",
//       prompt: "…",
//       options: ["A …", "B …"],   (mcq / select only)
//       answer: "TRUE" | "B" | "word",
//       note: "ONE WORD ONLY",     (optional hint shown under prompt)
//     }]
//   }]
// }

import { MOCK1_LISTENING } from "./mock1-listening.js";
import { MOCK1_READING } from "./mock1-reading.js";
import { MOCK1_WRITING } from "./mock1-writing.js";
import { MOCK2_LISTENING } from "./mock2-listening.js";
import { MOCK2_READING } from "./mock2-reading.js";
import { MOCK2_WRITING } from "./mock2-writing.js";
import WRITING_BANK from "./writing-bank.json";

// The centre's own writing collection: 93 days of paired Task 1 + Task 2
// questions (extracted by scripts/extract-writing-bank.mjs). Days 1 and 2
// are used inside Mock Tests 1 and 2; the rest become standalone writing
// tests here, each with its original task-1 visual.
const WRITING_PRACTICE = WRITING_BANK.filter((d) => d.day >= 3).map((d) => ({
  id: `writing-day-${d.day}`,
  bookId: "wbank",
  title: `Day ${d.day} — ${d.t1Type} + ${d.t2Type}`.replace(/\s*-\s*pdf\s*$/i, ""),
  module: "writing",
  durationMin: 60,
  sections: [
    {
      title: "Writing Task 1",
      passageTitle: "Writing Task 1",
      instructions: "You should spend about 20 minutes on this task. Write at least 150 words.",
      image: d.image,
      passage: d.t1,
      questions: [{ n: 1, type: "essay", prompt: "Write your report below.", minWords: 150 }],
    },
    {
      title: "Writing Task 2",
      passageTitle: "Writing Task 2",
      instructions: "You should spend about 40 minutes on this task. Write at least 250 words.",
      passage: d.t2,
      questions: [{ n: 2, type: "essay", prompt: "Write your essay below.", minWords: 250 }],
    },
  ],
}));

export const BOOKS = [
  { id: "mock1", title: "Smart LC Mock Test 1", short: "M1" },
  { id: "mock2", title: "Smart LC Mock Test 2", short: "M2" },
  { id: "wbank", title: "Writing Practice", short: "W" },
  { id: "cam9", title: "Cambridge IELTS 9", short: "9" },
  { id: "cam10", title: "Cambridge IELTS 10", short: "10" },
  { id: "cam11", title: "Cambridge IELTS 11", short: "11" },
  { id: "cam12", title: "Cambridge IELTS 12", short: "12" },
  { id: "cam13", title: "Cambridge IELTS 13", short: "13" },
  { id: "cam14", title: "Cambridge IELTS 14", short: "14" },
  { id: "cam15", title: "Cambridge IELTS 15", short: "15" },
  { id: "cam16", title: "Cambridge IELTS 16", short: "16" },
  { id: "cam17", title: "Cambridge IELTS 17", short: "17" },
  { id: "cam18", title: "Cambridge IELTS 18", short: "18" },
  { id: "cam19", title: "Cambridge IELTS 19", short: "19" },
];


// Extended schema for the grouped question blocks (see mock2 files for
// worked examples):
//   q.group          — questions sharing a group id render as ONE block
//   q.options        — options for mcq / multiselect (letters auto A–)
//   q.box/boxTitle   — shared lettered option box for match groups
//   q.image/letters  — plan image + letter range for label groups
//   q.table/notes    — completion layout; cells/lines hold {{n}} markers,
//                      "## " lines are bold sub-headings; notes+box = the
//                      summary-from-wordlist type (letter dropdowns)
//   q.rubric         — overrides the auto-generated instruction line
//   q.answer         — string or array of accepted variants
// Multi-select keys MUST be authored in alphabetical order across a group.
export const TESTS = [
  MOCK1_LISTENING, MOCK1_READING, MOCK1_WRITING,
  MOCK2_LISTENING, MOCK2_READING, MOCK2_WRITING,
  ...WRITING_PRACTICE,
];

export const testsForBook = (bookId) => TESTS.filter((t) => t.bookId === bookId);
export const getTest = (id) => TESTS.find((t) => t.id === id);
