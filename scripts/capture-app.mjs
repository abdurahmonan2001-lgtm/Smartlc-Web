// Captures the Student App home screen (localhost:5182) at phone size
// for the website's advantages card. Restores the app's localStorage
// caches so the dashboard renders offline, with the real student's
// identity swapped for a generic name.
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const U = "hilola_nasriddinova";
const student = {
  username: U, full_name: "Aziz Karimov", teacher_username: "Laylo Zokirova",
  day: "odd", class_time: "10:30", status: "active", left_date: null, coins: 0, gems: 0,
  group_id: null, mentor_warnings: 0, created_at: "2026-06-05T09:34:13.173901+00:00",
  enrolled_date: "2026-06-05", is_trial: false, ielts_goal: "proficiency",
  trial_restarted_date: null, redirect_count: 0, contract_date: null, avatar_url: null,
  contract_number: null, first_enrolled_date: "2026-06-05", left_reason: null,
  left_reason_note: null, blacklisted: false, blacklist_reason: null, blacklist_note: null,
  blacklisted_at: null, role: "student",
};
const group = {
  id: "39221d2c-8892-4379-840d-695278997ee5", teacher_username: "Laylo Zokirova",
  day: "odd", class_time: "10:30", level: "Elementary", current_lesson_order: 9,
  created_at: "2026-06-04T11:59:54.126027+00:00", first_lesson_date: "2026-06-03",
};
const lessonsMeta = [
  ["7e24195f-c8ba-4d3c-add4-131e93ac6b80", "Unit 3.2", "2026-07-29", 12],
  ["9cd4fee3-6586-4c91-a5c2-f6c54be090cc", "Unit 3.1", "2026-07-27", 11],
  ["05eab2e2-fd11-4e7b-8fdb-2ae969b5ded2", "Unit 2.4", "2026-07-24", 10],
  ["2fdf2210-b804-4e9d-84bf-98516c7bfc61", "Unit 2.3", "2026-07-22", 9],
  ["aac55c10-73dd-478e-8055-9e353b5ae9cb", "Unit 2.2", "2026-07-20", 8],
  ["a72720c1-5c65-4698-b9c9-510fc8c7b2c5", "Unit 2.1", "2026-07-17", 7],
  ["ecb97921-9a5c-4488-961a-ced504160e3c", "Unit 1.4", "2026-07-15", 6],
  ["67352c79-dfc0-4b4f-b047-cfd4a561d326", "Unit 1.3", "2026-07-13", 5],
  ["4a1ace71-3959-42bc-b360-dff3cc462f0f", "Unit 1.2", "2026-07-10", 4],
  ["23eef722-64a8-4535-930c-ad093829c271", "Unit 1.1", "2026-07-08", 3],
  ["2cf631c9-8fc0-4ca5-9c9f-016057cdd5ad", "Unit 0.2", "2026-07-06", 2],
  ["5ab2ecb0-7fda-4fbe-ac40-0077d814b09c", "Unit 0.1", "2026-07-03", 1],
];
const hwLessons = lessonsMeta.map(([id, title, lesson_date, lesson_number]) => ({
  id, teacher_username: "Laylo Zokirova", title, lesson_date, day: "odd",
  class_time: "10:30", month: "2026-07", lesson_number, level: "Elementary",
}));
const attendance = [
  "2fbe30af-55fe-4378-b7b8-b47996407c09", "ec39eac7-f474-4eca-9ab5-7bba9cf55ceb",
  "2cf631c9-8fc0-4ca5-9c9f-016057cdd5ad", "769896d2-0685-4666-8463-117bbe5ad887",
  "ecb97921-9a5c-4488-961a-ced504160e3c", "5ab2ecb0-7fda-4fbe-ac40-0077d814b09c",
  "12ad195f-929a-48e0-913e-893a0dfc584c", "67352c79-dfc0-4b4f-b047-cfd4a561d326",
  "4a1ace71-3959-42bc-b360-dff3cc462f0f", "23eef722-64a8-4535-930c-ad093829c271",
].map((lesson_id) => ({ lesson_id, status: "present" }));

const LS = {
  [`slc_lb_rank_${U}`]: "1",
  slc_screen_time: JSON.stringify({ "2026-07-29": 1002855 }),
  [`slc_ascension_${U}`]: JSON.stringify({
    score: 81.8, provisional: false, attendanceRate: 1, completionRate: 0.5365853658536586,
    qualityAvg: 89.13636363636364, recentAvg: 92, gradedCount: 22, tier: "Ruby", band: 1,
    next: { label: "Ruby II", delta: 0.8 }, promoted: false,
  }),
  [`slc_coins_${U}`]: JSON.stringify({
    words: 686, lessons: 10, passed: { sentences: 10, essay: 5, dialogue: 5 }, tasks: 23,
    correct: 0, podCorrect: 0, vocabulary: 6860, attendance: 1000, homework: 2049,
    articles: 0, podcasts: 0, total: 9909, spent: 0, balance: 9909,
  }),
  [`slc_dash_v1_${U}`]: JSON.stringify({
    student, ieltsGoal: "proficiency", group, totalLessons: 40, currentLessonNum: 12,
    currentLesson: { id: "509c148f-478a-4757-a51e-80d6dc931bac", level: "Elementary", lesson_order: 12, lesson_name: "Unit 3.2" },
    nextLevel: null, holidays: [], attendance, upcomingSession: null,
  }),
  [`snap_hw_${U}`]: JSON.stringify({
    lessons: hwLessons, groupLevel: "Elementary", currentLesson: hwLessons[0], testTemplate: null,
  }),
  [`slc_progress_v3_${U}`]: JSON.stringify({
    group, scores: { essay: 34, sentences: 57, dialogue: 45, vocabulary: 61, attendance: 100 },
    details: {
      vocabTotal: 442, vocabLearned: 271, attPresent: 7, attLate: 0, attAbsent: 0, attTotal: 7,
      essayCount: 13, sentCount: 14, dialogCount: 10, essaySubmitted: 5, sentSubmitted: 9,
      dialogSubmitted: 5, currentLesson: 12,
    },
    stats: {
      wordsLifetime: 684, wordsThisWeek: 0, wordsLastWeek: 107, improvementPct: -9,
      streak: 10, lessonsCompleted: 16, lessonsThisWeek: 3, attThisWeek: 0,
    },
    spark: {
      words: [0, 0, 0, 413, 80, 84, 107, 0], lessons: [2, 2, 0, 0, 3, 3, 3, 3],
      attendance: [100, 100, 100, 100, 100, 100, 100, 100],
    },
    studiedLevels: [
      { level: "Beginner", total: 752, learned: 415, pct: 55, overallPct: 77, skills: { essay: 0, sentences: 87, dialogue: null, vocabulary: 55, attendance: 100 } },
      { level: "Elementary", total: 442, learned: 271, pct: 61, overallPct: 54, skills: { essay: 34, sentences: 57, dialogue: 45, vocabulary: 61, attendance: 100 } },
    ],
    percentile: 61,
  }),
  slc_user: JSON.stringify(student),
};

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: "new",
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 300)));
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });

await page.goto("http://localhost:5182", { waitUntil: "networkidle2" });
await page.evaluate((data) => {
  for (const [k, v] of Object.entries(data)) localStorage.setItem(k, v);
}, LS);
await page.goto("http://localhost:5182", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 5000));

await page.screenshot({ path: "scripts/app-home-raw.png" });
await browser.close();

await sharp("scripts/app-home-raw.png").webp({ quality: 82 }).toFile("public/brand/app-home.webp");
console.log("captured public/brand/app-home.webp");
