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
import { MOCK3_LISTENING } from "./mock3-listening.js";
import { MOCK3_READING } from "./mock3-reading.js";
import { MOCK4_LISTENING } from "./mock4-listening.js";
import { MOCK4_READING } from "./mock4-reading.js";
import { MOCK5_LISTENING } from "./mock5-listening.js";
import { MOCK5_READING } from "./mock5-reading.js";
import { MOCK6_LISTENING } from "./mock6-listening.js";
import { MOCK6_READING } from "./mock6-reading.js";
import { MOCK7_LISTENING } from "./mock7-listening.js";
import { MOCK7_READING } from "./mock7-reading.js";
import { MOCK8_LISTENING } from "./mock8-listening.js";
import { MOCK8_READING } from "./mock8-reading.js";
import { MOCK9_LISTENING } from "./mock9-listening.js";
import { MOCK9_READING } from "./mock9-reading.js";
import { MOCK10_LISTENING } from "./mock10-listening.js";
import { MOCK10_READING } from "./mock10-reading.js";
import { MOCK11_LISTENING } from "./mock11-listening.js";
import { MOCK11_READING } from "./mock11-reading.js";
import { MOCK12_LISTENING } from "./mock12-listening.js";
import { MOCK12_READING } from "./mock12-reading.js";
import { PSET1_LISTENING } from "./pset1-listening.js";
import { PSET1_READING } from "./pset1-reading.js";
import { PSET2_LISTENING } from "./pset2-listening.js";
import { PSET2_READING } from "./pset2-reading.js";
import { PSET3_LISTENING } from "./pset3-listening.js";
import { PSET3_READING } from "./pset3-reading.js";
import { PSET4_LISTENING } from "./pset4-listening.js";
import { PSET4_READING } from "./pset4-reading.js";
import { PSET5_LISTENING } from "./pset5-listening.js";
import { PSET5_READING } from "./pset5-reading.js";
import { UPSET1_LISTENING } from "./upset1-listening.js";
import { UPSET1_READING } from "./upset1-reading.js";
import { UPSET2_LISTENING } from "./upset2-listening.js";
import { UPSET2_READING } from "./upset2-reading.js";
import { UPSET3_LISTENING } from "./upset3-listening.js";
import { UPSET3_READING } from "./upset3-reading.js";
import { UPSET4_LISTENING } from "./upset4-listening.js";
import { UPSET4_READING } from "./upset4-reading.js";
import { UPSET5_LISTENING } from "./upset5-listening.js";
import { UPSET5_READING } from "./upset5-reading.js";
import { UPSET6_LISTENING } from "./upset6-listening.js";
import { UPSET6_READING } from "./upset6-reading.js";
import { UPSET7_LISTENING } from "./upset7-listening.js";
import { UPSET7_READING } from "./upset7-reading.js";
import { UPSET8_LISTENING } from "./upset8-listening.js";
import { UPSET8_READING } from "./upset8-reading.js";
import { UPSET9_LISTENING } from "./upset9-listening.js";
import { UPSET9_READING } from "./upset9-reading.js";
import { UPSET10_LISTENING } from "./upset10-listening.js";
import { UPSET10_READING } from "./upset10-reading.js";
import { UPSET11_LISTENING } from "./upset11-listening.js";
import { UPSET11_READING } from "./upset11-reading.js";
import { UPSET12_LISTENING } from "./upset12-listening.js";
import { UPSET12_READING } from "./upset12-reading.js";
import { UPSET13_LISTENING } from "./upset13-listening.js";
import { UPSET13_READING } from "./upset13-reading.js";
import { UPSET14_LISTENING } from "./upset14-listening.js";
import { UPSET14_READING } from "./upset14-reading.js";
import { listeningChunks, readingChunks } from "./upper.js";
import WRITING_BANK from "./writing-bank.json";

// Builds the two writing sections from one day of the centre's collection.
const writingSections = (d) => [
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
];

// The centre's own writing collection: 93 days of paired Task 1 + Task 2
// questions (extracted by scripts/extract-writing-bank.mjs). Day N supplies
// the writing paper of Mock Test N for the first twelve days — days 1 and 2
// have redrawn SVG visuals of their own (mock1/mock2-writing.js), days 3–12
// keep their original images. Everything from day 13 on becomes a
// standalone writing test on the Writing Practice shelf.
const MOCK_WRITING = WRITING_BANK.filter((d) => d.day >= 3 && d.day <= 12).map((d) => ({
  id: `mock${d.day}-writing`,
  bookId: `mock${d.day}`,
  title: `Mock Test ${d.day} — Writing`,
  module: "writing",
  durationMin: 60,
  sections: writingSections(d),
}));

const WRITING_PRACTICE = WRITING_BANK.filter((d) => d.day >= 13).map((d) => ({
  id: `writing-day-${d.day}`,
  bookId: "wbank",
  title: `Day ${d.day} — ${d.t1Type} + ${d.t2Type}`.replace(/\s*-\s*pdf\s*$/i, ""),
  module: "writing",
  durationMin: 60,
  sections: writingSections(d),
}));

// `kind` splits the library in two:
//   mock     — sat once, all three papers in one sitting, nothing saved
//              unless the whole exam is finished
//   practice — single papers, taken freely and repeatedly, the pool
//              homework is set from
// Mock books are deliberately NOT also offered as separate papers: a
// student who could sit Mock 5's listening as practice would walk into
// their one official attempt already knowing it.
export const BOOKS = [
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `mock${i + 1}`,
    title: `Smart LC Mock Test ${i + 1}`,
    short: `M${i + 1}`,
    kind: "mock",
  })),
  // Practice sets: mock-format single papers, taken freely and repeatedly.
  // Authored separately from the mocks so homework never leaks exam content.
  ...Array.from({ length: 5 }, (_, i) => ({
    id: `pset${i + 1}`,
    title: `Practice Set ${i + 1}`,
    short: `P${i + 1}`,
    kind: "practice",
  })),
  // Upper-Intermediate sets: sat in thirds across three lessons (see
  // upper.js). Both the full papers and their thirds sit on the shelf, so a
  // student can open exactly the piece their homework names.
  ...Array.from({ length: 14 }, (_, i) => ({
    id: `upset${i + 1}`,
    title: `Upper-Inter Set ${i + 1}`,
    short: `U${i + 1}`,
    kind: "practice",
  })),
  { id: "wbank", title: "Writing Practice", short: "W", kind: "practice" },
  { id: "cam9", title: "Cambridge IELTS 9", short: "9", kind: "practice" },
  { id: "cam10", title: "Cambridge IELTS 10", short: "10", kind: "practice" },
  { id: "cam11", title: "Cambridge IELTS 11", short: "11", kind: "practice" },
  { id: "cam12", title: "Cambridge IELTS 12", short: "12", kind: "practice" },
  { id: "cam13", title: "Cambridge IELTS 13", short: "13", kind: "practice" },
  { id: "cam14", title: "Cambridge IELTS 14", short: "14", kind: "practice" },
  { id: "cam15", title: "Cambridge IELTS 15", short: "15", kind: "practice" },
  { id: "cam16", title: "Cambridge IELTS 16", short: "16", kind: "practice" },
  { id: "cam17", title: "Cambridge IELTS 17", short: "17", kind: "practice" },
  { id: "cam18", title: "Cambridge IELTS 18", short: "18", kind: "practice" },
  { id: "cam19", title: "Cambridge IELTS 19", short: "19", kind: "practice" },
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
// Upper-Intermediate papers, plus the thirds the homework rule assigns:
// Listening Parts 1-2 / Part 3 / Part 4 and one paper per Reading passage.
// Derived from the full papers so there is a single source of truth.
const UPPER_FULL = [
  UPSET1_LISTENING, UPSET1_READING,
  UPSET2_LISTENING, UPSET2_READING,
  UPSET3_LISTENING, UPSET3_READING,
  UPSET4_LISTENING, UPSET4_READING,
  UPSET5_LISTENING, UPSET5_READING,
  UPSET6_LISTENING, UPSET6_READING,
  UPSET7_LISTENING, UPSET7_READING,
  UPSET8_LISTENING, UPSET8_READING,
  UPSET9_LISTENING, UPSET9_READING,
  UPSET10_LISTENING, UPSET10_READING,
  UPSET11_LISTENING, UPSET11_READING,
  UPSET12_LISTENING, UPSET12_READING,
  UPSET13_LISTENING, UPSET13_READING,
  UPSET14_LISTENING, UPSET14_READING,
];
const UPPER_CHUNKS = UPPER_FULL.flatMap((t) =>
  t.module === "listening" ? listeningChunks(t) : readingChunks(t));

export const TESTS = [
  MOCK1_LISTENING, MOCK1_READING, MOCK1_WRITING,
  MOCK2_LISTENING, MOCK2_READING, MOCK2_WRITING,
  MOCK3_LISTENING, MOCK3_READING,
  MOCK4_LISTENING, MOCK4_READING,
  MOCK5_LISTENING, MOCK5_READING,
  MOCK6_LISTENING, MOCK6_READING,
  MOCK7_LISTENING, MOCK7_READING,
  MOCK8_LISTENING, MOCK8_READING,
  MOCK9_LISTENING, MOCK9_READING,
  MOCK10_LISTENING, MOCK10_READING,
  MOCK11_LISTENING, MOCK11_READING,
  MOCK12_LISTENING, MOCK12_READING,
  PSET1_LISTENING, PSET1_READING,
  PSET2_LISTENING, PSET2_READING,
  PSET3_LISTENING, PSET3_READING,
  PSET4_LISTENING, PSET4_READING,
  PSET5_LISTENING, PSET5_READING,
  ...UPPER_FULL,
  ...UPPER_CHUNKS,
  ...MOCK_WRITING,
  ...WRITING_PRACTICE,
];

export const testsForBook = (bookId) => TESTS.filter((t) => t.bookId === bookId);
export const getTest = (id) => TESTS.find((t) => t.id === id);
