// Upper-Intermediate homework support.
//
// Upper-Inter students sit each practice set in thirds across three
// lessons (the owner's rule): Lesson 1 = Listening Parts 1+2 AND Reading
// Passage 1; Lesson 2 = Part 3 AND Passage 2; Lesson 3 = Part 4 AND
// Passage 3 — repeating, so sets 1–13 cover lessons 1–39, and lesson 40
// assigns set 14's papers IN FULL as a level-closing milestone.
//
// A "chunk" is a real test object derived from the full paper: same
// sections, same question numbering, same answers — just fewer sections.
// Scoring, review, once-only locking and explanations all work on it
// unchanged; band conversion stays null because the total is under 40,
// which is correct for a partial paper.

const CHUNK_MIN = { a: 14, b: 8, c: 8 };   // rough sitting time per listening chunk

export function listeningChunks(test) {
  const spec = [
    ["a", [0, 1], "Parts 1–2"],
    ["b", [2], "Part 3"],
    ["c", [3], "Part 4"],
  ];
  return spec.map(([suffix, idxs, label]) => ({
    ...test,
    id: `${test.id}-${suffix}`,
    title: `${test.title} · ${label}`,
    durationMin: CHUNK_MIN[suffix],
    // `part` keeps the number the student knows the section by. Without it
    // the player numbers sections by position, so the Part 3 chunk would
    // call itself "Part 1" and contradict its own questions (21-30).
    sections: idxs.map((i) => ({ ...test.sections[i], part: i + 1 })),
  }));
}

export function readingChunks(test) {
  return test.sections.map((s, i) => ({
    ...test,
    id: `${test.id}-p${i + 1}`,
    title: `${test.title} · Passage ${i + 1}`,
    durationMin: 20,
    sections: [{ ...s, part: i + 1 }],
  }));
}

// For a chunk id, the full paper's id — transcripts and audio cues are
// stored against the parent.
export const parentListeningId = (testId) =>
  String(testId).replace(/-(a|b|c)$/, "");

// Which recording parts a listening chunk covers (1-based, matches cues).
export const chunkParts = (testId) => {
  const m = String(testId).match(/-(a|b|c)$/);
  if (!m) return null;
  return m[1] === "a" ? [1, 2] : m[1] === "b" ? [3] : [4];
};

// The homework rule itself, shared shape with the Student App's
// PracticeCard (which duplicates it — keep the two in sync).
export function upperAssignment(lessonNum) {
  const n = Math.min(40, Math.max(1, Number(lessonNum) || 1));
  if (n >= 40) {
    return {
      full: true,
      items: [
        { testId: "upset14-listening", label: "Upper-Inter Set 14 — full Listening" },
        { testId: "upset14-reading", label: "Upper-Inter Set 14 — full Reading" },
      ],
    };
  }
  const set = Math.ceil(n / 3);                 // 1..13
  const third = (n - 1) % 3;                    // 0,1,2
  const lSuffix = ["a", "b", "c"][third];
  const lLabel = ["Parts 1–2", "Part 3", "Part 4"][third];
  return {
    full: false,
    items: [
      { testId: `upset${set}-listening-${lSuffix}`, label: `Set ${set} Listening · ${lLabel}` },
      { testId: `upset${set}-reading-p${third + 1}`, label: `Set ${set} Reading · Passage ${third + 1}` },
    ],
  };
}
