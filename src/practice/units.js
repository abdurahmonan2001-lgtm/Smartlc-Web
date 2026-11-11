// The practice lessons grouped into the units a class actually goes through,
// for the library's trail ("Expedition", CEO, 11 Nov 2026).
//
//   Pre-IELTS (Upper-Intermediate)  the Solutions Upper-Intermediate course:
//                                   Introduction 1–2, Unit 1 3–6 … Unit 5
//                                   19–22, the mid-term 23, Unit 6 24–27 …
//                                   Unit 9 36–39, the final 40
//   IELTS Foundation                its own book: lesson 1 Welcome, then 13
//                                   units of three lessons (2–4 … 38–40)
//   anything else                   plain blocks of four lessons
//
// Titles copied from the Student App (src/courseChapters.js), which is where
// the class sees them; change both together.
const UPPER_TITLES = ["Introduction", "Fame", "Problems", "Customs and culture", "Holidays and tourism",
  "Relationships", "Health", "Tall stories", "Change the world", "Consumerism"];
const UNIT_ENDS = [2, 6, 10, 14, 18, 22, 27, 31, 35, 39];
const IELTS_F = [
  ["Learning for life", "Education"], ["Going places", "Travel"], ["A warming world", "Environment"],
  ["Eureka!", "Science"], ["Smart machines", "Technology"], ["Breaking news", "Media"],
  ["Healthy choices", "Health"], ["Wild planet", "Nature"], ["Inside the mind", "Mind"],
  ["City life", "Cities"], ["Echoes of the past", "History"], ["The world of work", "Work"],
  ["Rules and rights", "Law"],
];

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/** → [{ key, no, title, lessons: [n…], exam? }] covering lessons 1–40. */
export function unitsOf(level) {
  if (level === "Upper-Intermediate") {
    const out = [];
    let first = 1;
    UNIT_ENDS.forEach((end, u) => {
      if (u === 6) {
        out.push({ key: "mid", no: "★", title: "Mid-term exam", lessons: [23], exam: true });
        first = 24;
      }
      out.push({ key: `u${u}`, no: String(u), title: UPPER_TITLES[u], lessons: range(first, end) });
      first = end + 1;
    });
    out.push({ key: "final", no: "★", title: "Final exam", lessons: [40], exam: true });
    return out;
  }
  if (level === "IELTS Foundation") {
    return [
      { key: "welcome", no: "0", title: "Welcome to IELTS", lessons: [1] },
      ...IELTS_F.map(([title], i) => ({ key: `u${i + 1}`, no: String(i + 1), title, lessons: range(2 + 3 * i, 4 + 3 * i) })),
    ];
  }
  return Array.from({ length: 10 }, (_, i) => ({
    key: `b${i}`, no: String(i + 1), title: `Lessons ${4 * i + 1}–${4 * i + 4}`, lessons: range(4 * i + 1, 4 * i + 4),
  }));
}
