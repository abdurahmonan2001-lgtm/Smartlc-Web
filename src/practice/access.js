// Who may open what.
//
// Practice is coursework, not a library to browse: a student sees the
// papers their class has actually reached, and the rest stay shut until
// the lessons come round. The rules, from the owner:
//
//   - Below Upper-Intermediate: no practice and no mocks at all.
//   - Upper-Intermediate: the 14 split sets spread over 40 lessons
//     (see upper.js). Papers for lessons already taught are open; later
//     ones are visible but locked, so the student can see what is coming.
//   - IELTS Foundation / Proficiency: the practice sets, one full paper
//     per lesson alternating listening and reading, unlocked the same way.
//   - Mock exams: IELTS levels only, and hidden outright below them —
//     not locked, absent.
//
// Lessons run 1..40 and the pools are smaller than that, so a paper can
// serve more than one lesson; a paper is open once its EARLIEST lesson
// has been reached.
import { upperAssignment } from "./upper.js";

export const LEVEL_ORDER = [
  "Beginner", "Elementary", "Pre-Intermediate", "Intermediate",
  "Upper-Intermediate", "IELTS Foundation", "IELTS Proficiency",
];

const UPPER = "Upper-Intermediate";
const IELTS_LEVELS = ["IELTS Foundation", "IELTS Proficiency"];
const TOTAL_LESSONS = 40;
const PSETS = 5;   // IELTS-level practice pool; lessons beyond it recycle

export const isIeltsLevel = (level) => IELTS_LEVELS.includes(level);
export const allowsMocks = (level) => isIeltsLevel(level);
export const allowsPractice = (level) => level === UPPER || isIeltsLevel(level);

/** The papers one lesson assigns, as test ids. */
export function lessonPapers(level, lessonNum) {
  const n = Math.min(TOTAL_LESSONS, Math.max(1, Number(lessonNum) || 1));
  if (level === UPPER) return upperAssignment(n).items.map((i) => i.testId);
  if (isIeltsLevel(level)) {
    const module = n % 2 === 1 ? "listening" : "reading";
    const set = ((Math.ceil(n / 2) - 1) % PSETS) + 1;
    return [`pset${set}-${module}`];
  }
  return [];
}

/** test id -> the earliest lesson that assigns it, for this level. */
export function lessonIndex(level) {
  const map = new Map();
  if (!allowsPractice(level)) return map;
  for (let n = 1; n <= TOTAL_LESSONS; n++) {
    for (const id of lessonPapers(level, n)) if (!map.has(id)) map.set(id, n);
  }
  return map;
}

/** Which programme a paper belongs to, from its id.
 *
 *  Deliberately by family rather than "does some lesson assign it": the
 *  full papers of Upper-Inter sets 1-13 are assigned by no lesson (their
 *  thirds are), and treating unassigned as unrestricted would hand an
 *  Upper-Inter student the whole paper their lessons carefully split up.
 *  "other" is writing practice and staff uploads — real material, but not
 *  on anyone's lesson schedule. */
export const familyOf = (testId) =>
  /^upset\d+-/.test(testId) ? "upper"
    : /^pset\d+-/.test(testId) ? "ielts"
      : /^mock\d+-/.test(testId) ? "mock"
        : /^writing-day-/.test(testId) ? "writing"
          : "other";

/** What this student may see, and of that, what they may open.
 *  `lessonNum` null means we could not establish it — nothing unlocks,
 *  because guessing here would hand out papers a class has not reached. */
export function accessFor(level, lessonNum) {
  const index = lessonIndex(level);
  const reached = Number(lessonNum) || 0;
  const practice = allowsPractice(level);
  const mocks = allowsMocks(level);
  const mine = (testId) => {
    const family = familyOf(testId);
    if (family === "mock") return mocks;
    // Standalone writing is teacher-set: a student never picks one up on
    // their own, so it is refused here as well as absent from the shelves.
    // This does not touch mock writing, which is family "mock".
    if (family === "writing") return false;
    if (family === "other") return practice;         // not lesson work
    return index.has(testId);                        // this level's schedule
  };
  const isOpen = (testId) => {
    if (!mine(testId)) return false;
    const first = index.get(testId);
    return first == null ? true : reached >= first;  // unscheduled: no gate
  };
  return {
    level,
    lessonNum: reached || null,
    mocks,
    practice,
    /** true if the paper belongs to this student at all */
    inProgramme: mine,
    isOpen,
    /** the lesson a locked paper is waiting for */
    opensAt: (testId) => index.get(testId) ?? null,
  };
}
