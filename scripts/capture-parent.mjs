// Captures the Parent App home screen (localhost:5184) at phone size.
// All Supabase REST calls are intercepted and answered with mock demo
// data, so no real accounts or student records are involved.
import puppeteer from "puppeteer-core";
import sharp from "sharp";

const CHILD = {
  username: "aziz_karimov", full_name: "Aziz Karimov", teacher_username: "Laylo Zokirova",
  day: "odd", class_time: "10:30", status: "active", group_id: "39221d2c-8892-4379-840d-695278997ee5",
  ielts_goal: "proficiency", enrolled_date: "2026-06-05", avatar_url: null,
};
const GROUP = {
  id: "39221d2c-8892-4379-840d-695278997ee5", teacher_username: "Laylo Zokirova",
  day: "odd", class_time: "10:30", level: "Elementary", current_lesson_order: 9,
  created_at: "2026-06-04T11:59:54.126027+00:00", first_lesson_date: "2026-06-03",
};
const HW = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1, teacher_username: "Laylo Zokirova", day: "odd", class_time: "10:30",
}));
const SUBS = Array.from({ length: 10 }, (_, i) => ({
  homework_id: i + 1, grade: [92, 88, 95, 90, 86, 94, 91, 89, 93, 87][i],
  ai_grade: null, feedback: ["Excellent essay — clear structure and rich vocabulary.", "Great progress on past tenses. Keep practising!", "Wonderful dialogue work — very natural phrasing."][i % 3],
  ai_feedback: null, submitted_at: new Date(Date.now() - i * 86400000 * 2).toISOString(),
}));

function mockFor(url) {
  const table = (url.match(/\/rest\/v1\/(\w+)/) || [])[1];
  switch (table) {
    case "parent_children": return [{ parent_username: "parent_demo", student_username: CHILD.username }];
    case "students": return [CHILD];
    case "groups": return [GROUP];
    case "attendance": return Array.from({ length: 14 }, () => ({ status: "present", student_username: CHILD.username }));
    case "homework": return HW;
    case "homework_submissions": return SUBS;
    default: return [];
  }
}

const browser = await puppeteer.launch({
  executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  headless: "new",
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.log("[pageerror]", String(e).slice(0, 300)));
await page.setViewport({ width: 375, height: 812, deviceScaleFactor: 2 });

await page.setRequestInterception(true);
const CORS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "access-control-allow-methods": "*",
};
page.on("request", (req) => {
  if (req.url().includes("supabase.co/rest/v1/")) {
    if (req.method() === "OPTIONS") {
      req.respond({ status: 204, headers: CORS });
    } else {
      req.respond({
        status: 200,
        contentType: "application/json",
        headers: { ...CORS, "content-range": "0-9/10" },
        body: JSON.stringify(mockFor(req.url())),
      });
    }
  } else if (req.url().includes("supabase.co")) {
    req.abort();
  } else {
    req.continue();
  }
});

await page.goto("http://localhost:5184", { waitUntil: "networkidle2" });
await page.evaluate(() => {
  localStorage.setItem("slc_parent_user", JSON.stringify({
    username: "parent_demo", full_name: "Bekzod Karimov", role: "parent", avatar_url: null,
  }));
  localStorage.setItem("slc_parent_lang", "en");
});
await page.goto("http://localhost:5184", { waitUntil: "networkidle2" });
await new Promise((r) => setTimeout(r, 4500));

await page.screenshot({ path: "scripts/parent-home-raw.png" });
await browser.close();

await sharp("scripts/parent-home-raw.png").webp({ quality: 82 }).toFile("public/brand/parent-home.webp");
console.log("captured public/brand/parent-home.webp");
