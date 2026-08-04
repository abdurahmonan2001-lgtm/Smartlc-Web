import { createContext, useContext, useState } from "react";

export const LANGS = [
  { code: "en", label: "EN" },
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
];

// Default to the visitor's device language (uz / ru / en), unless they
// already picked one manually.
function detectLang() {
  const saved = localStorage.getItem("smartlc-lang");
  if (saved && ["en", "uz", "ru"].includes(saved)) return saved;
  for (const l of navigator.languages ?? [navigator.language]) {
    const code = (l || "").toLowerCase().slice(0, 2);
    if (code === "uz") return "uz";
    if (code === "ru") return "ru";
    if (code === "en") return "en";
  }
  return "en";
}

const dict = {
  en: {
    nav: { about: "Why us", courses: "Courses", pricing: "Prices", teachers: "Teachers", results: "Results", location: "Location", contact: "Contact", enroll: "Enroll now", enrollShort: "Enroll" },
    hero: {
      eyebrow: "Smart Learning Centre · Tashkent",
      motto: ["English", "Every", "Day."],
      sub: "Our motto is simple: real progress comes from showing up daily. Structured courses from your first English word to IELTS — built on the Oxford University Press program and taught by high-band teachers.",
      cta: "Sign up via Telegram",
      cta2: "Call us",
      badge: "official IELTS 7.0+ results",
    },
    stats: {
      results: "Official IELTS 7.0+ results",
      top: "Top student band score",
      years: "Years of proven results",
      program: "Oxford University Press program",
      programVal: "Licensed",
    },
    adv: {
      title: "Why Smart LC?",
      sub: "Six reasons our students reach their target — and enjoy the road there.",
      app: {
        t: "Student App",
        d: "Our motto, built into an app. A fresh Word, Study Tip, Article, Podcast and Shadowing task every single day. Streaks and coins that make practice addictive, a built-in dictionary, live progress and group rankings — and one-tap mentor sessions.",
      },
      week: { teacher: "Teacher", mentor: "Mentor", app: "App", event: "Event" },
      fastStart: { num: "1", unit: "month", note: "and you're past Beginner" },
      badges: { classes: "max 15 students", oxford: "Solutions · 3rd edition", results: "90+ official TRFs" },
      cards: [
        { t: "A start that respects your time", d: "Beginner takes just 1 month — most newcomers already know more than they think. We test your level precisely and never make you sit through what you already know." },
        { t: "English Every Day — literally", d: "3 days a week with your Main Teacher, 3 days with your Mentor, plus independent daily tasks in the Student App. With Smart LC, there is no day without English." },
        { t: "Parent App", d: "Parents see everything in real time: attendance, progress, and whether every single piece of homework is actually done." },
        { t: "Small classes, interactive whiteboards", d: "Groups of up to 15, taught on interactive whiteboards — lessons stay vivid and focused, and every student gets the teacher's full attention." },
        { t: "Official Oxford Solutions, 3rd edition", d: "The Oxford University Press Solutions series — speaking practice in every lesson, step-by-step exam training, and a proven path used by millions of learners worldwide." },
        { t: "Real, verifiable results", d: "Every score we advertise is backed by an official IELTS Test Report Form — see them below." },
      ],
    },
    courses: {
      title: "Your Journey",
      sub: "Six steps from your first English word to IELTS mastery — English Every Day, at every level.",
      start: "Start here",
      finish: "IELTS ready",
      month: "month",
      months: "months",
      total: "The full journey from zero: about 16 months of consistent study.",
      registerCta: "Get on the bus — Register",
      goal: {
        name: "Your Goal",
        sub: "🎓 · ✈️ · 💼",
        level: "IELTS = your key",
        d: "IELTS isn't the finish line — it's the key that opens doors. Most test takers use their score to win university places and scholarships abroad, qualify for study and work visas, or step into international careers. Whatever your goal is, this bus takes you there.",
      },
      steps: [
        { name: "Beginner", dur: 1, level: "A1", d: "Your very first step — alphabet, core vocabulary and simple everyday phrases." },
        { name: "Elementary", dur: 3, level: "A2", d: "Build grammar foundations and start speaking in full sentences with confidence." },
        { name: "Pre-Intermediate", dur: 3, level: "B1", d: "Expand into real-life topics and hold longer conversations." },
        { name: "Intermediate", dur: 3, level: "B1+", d: "Strengthen all four skills and take on complex, real-world English." },
        { name: "Pre-IELTS", dur: 3, level: "B2", d: "Refine accuracy and fluency to a solid, independent-user level." },
        { name: "IELTS", dur: 3, level: "B2 – C2", bands: ["B2 – C2"], d: "Full IELTS training — master the exam format, then polish every skill with intensive mock-test practice up to your target band." },
      ],
    },
    pricing: {
      title: "One Honest Price",
      sub: "700 000 so'm a month — whether you're learning General English or preparing for IELTS. Everything included, no hidden extras.",
      perMonth: "per month",
      popular: "Most popular",
      cta: "Register now",
      plans: [
        {
          name: "General English",
          desc: "Beginner → Pre-IELTS",
          features: [
            "Oxford Solutions 3rd edition books & notebooks — free",
            "3 days Main Teacher + 3 days Mentor every week",
            "Student App: daily tasks, streaks, dictionary",
            "Parent App: progress visible at home",
            "Small groups (max 15) on interactive whiteboards",
          ],
        },
        {
          name: "IELTS Preparation",
          desc: "IELTS · B2 – C2",
          features: [
            "All books, notebooks & IELTS materials — free",
            "3 days Main Teacher + 3 days Mentor every week",
            "Full mock exams with real exam timing",
            "Band-target training: 6.5 → 8.5",
            "Taught by an IELTS 8.5 teacher (Speaking 9.0)",
          ],
        },
      ],
    },
    events: {
      title: "Sunday Events",
      sub: "The week ends, English doesn't. Every Sunday at Smart LC:",
      list: [
        { icon: "🎬", name: "Movie Club", d: "Watch films in English and unpack them together — real language, real culture, zero subtitles fear." },
        { icon: "🗣️", name: "Speaking Club", d: "Themed discussions that get everyone talking. Confidence grows when English becomes conversation, not homework." },
        { icon: "📝", name: "Sunday Mock Practice", d: "A full IELTS mock under real exam conditions — timing, silence, answer sheets. Exam day becomes routine." },
      ],
    },
    teachers: {
      title: "Our Teachers",
      sub: "Learn from teachers who have taken the exam — and scored at the top.",
      exp: "years of experience",
      exp1: "year of experience",
      list: [
        { name: "Abdurahmon Nasriddinov", band: "IELTS 8.5", details: ["Speaking 9.0", "Writing 8.5"], years: 7, bio: "Specialist in IELTS preparation with a focus on speaking and writing. Helps students break through plateaus with proven band-score strategies." },
      ],
    },
    results: {
      title: "Real Results. Official Certificates.",
      sub: "Not promises — papers. Every certificate is an official IELTS Test Report Form earned by a Smart LC student.",
      all: "Latest",
      holders: "holders",
      zoomHint: "Move your cursor over the certificate to magnify · tap to zoom on mobile",
      close: "Close",
    },
    testimonials: {
      title: "What Our Students Say",
      sub: "Words from students who reached their target — you can find their certificates above.",
    },
    location: {
      title: "Visit Us",
      sub: "Come by for a chat and a level check — we'll map your journey on the spot.",
      addressLabel: "Address",
      address: "Yunusabad District, Kashgar street 9A, Tashkent",
      directionsLabel: "How to reach us",
      directions: "The map shows walking routes from Abdulla Qodiriy metro (blue) and Mustaqillik Maydoni metro (red). Or hop on any of these buses:",
      busLabel: "Bus routes",
      minWalk: "min walk",
      mapCta: "Open in Google Maps",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        { q: "How do I start studying at Smart LC?", a: "Message us on Telegram or call us. We'll determine your current level and place you in the right group so you never study material that's too easy or too hard." },
        { q: "I'm a complete beginner. Can I still aim for IELTS?", a: "Yes — that's exactly what our journey is for. You start at Beginner and climb six steps to IELTS. The full path from zero takes about 16 months." },
        { q: "How long does it take to reach IELTS?", a: "From Pre-Intermediate, the road through Intermediate, Pre-IELTS and IELTS takes about 12 months of consistent study. Our 90+ official 7.0+ results show the system works when you do." },
        { q: "Do you offer mock exams?", a: "Yes. Students take full IELTS-style mock tests under real exam timing, so the real exam feels like just another practice day." },
        { q: "What materials do you use?", a: "The licensed Oxford University Press program for general English levels, plus dedicated IELTS materials and mock tests for the exam stages — supported daily by our Student App." },
      ],
    },
    contact: {
      title: "Start Your English Journey Today",
      sub: "One tap — Telegram, Instagram or a call. We'll help you choose the right course.",
      telegram: "Telegram",
      phone: "Call us",
      instagram: "Instagram",
      email: "Email",
      cta: "Write on Telegram",
    },
    footer: { rights: "All rights reserved.", tagline: "English Every Day" },
    bands: {
      telegram: { text: "Questions? We answer fast on Telegram.", cta: "Write on Telegram" },
      phone: { text: "Prefer to talk? Call us — we'll guide you.", cta: "Call us" },
      instagram: { text: "See everyday life at Smart LC on Instagram.", cta: "Follow us" },
      register: { text: "Your certificate could be next.", cta: "Register now" },
    },
    register: {
      title1: "Want to learn",
      title2: "ENGLISH?",
      sub: "Leave your name and number — we'll call you back, answer every question and book your free level check.",
      name: "Your name",
      phone: "Phone number",
      submit: "Send",
      doneTitle: "Got it!",
      doneText: "We received your request. We'll call you back shortly — keep your phone nearby.",
      back: "Back to the website",
      error: "Something went wrong sending the form. Reach us directly instead:",
    },
  },

  uz: {
    nav: { about: "Nega biz", courses: "Kurslar", pricing: "Narxlar", teachers: "Ustozlar", results: "Natijalar", location: "Manzil", contact: "Aloqa", enroll: "Ro'yxatdan o'tish", enrollShort: "Yozilish" },
    hero: {
      eyebrow: "Smart Learning Centre · Toshkent",
      motto: ["English", "Every", "Day."],
      sub: "Shiorimiz oddiy: haqiqiy natija — har kuni shug'ullanishdan keladi. Birinchi inglizcha so'zdan IELTS gacha tizimli kurslar — Oxford University Press dasturi asosida, yuqori natijali ustozlar bilan.",
      cta: "Telegram orqali yozilish",
      cta2: "Qo'ng'iroq qilish",
      badge: "rasmiy IELTS 7.0+ natijalar",
    },
    stats: {
      results: "Rasmiy IELTS 7.0+ natijalar",
      top: "Talabalarning eng yuqori bali",
      years: "Yillik tasdiqlangan natijalar",
      program: "Oxford University Press dasturi",
      programVal: "Litsenziya",
    },
    adv: {
      title: "Nega Smart LC?",
      sub: "Talabalarimiz maqsadiga yetishining oltita sababi — va bu yo'ldan zavq olishlari.",
      app: {
        t: "Student App",
        d: "Shiorimiz — ilova ko'rinishida. Har kuni yangi So'z, O'quv maslahati, Maqola, Podkast va Shadowing vazifasi. Mashg'ulotni odatga aylantiradigan streak va coinlar, ichki lug'at, jonli progress va guruh reytingi — hamda bir bosishda mentor darsi.",
      },
      week: { teacher: "Ustoz", mentor: "Mentor", app: "Ilova", event: "Tadbir" },
      fastStart: { num: "1", unit: "oy", note: "va Beginner ortda qoladi" },
      badges: { classes: "maks. 15 talaba", oxford: "Solutions · 3-nashr", results: "90+ rasmiy sertifikat" },
      cards: [
        { t: "Vaqtingizni qadrlaydigan boshlanish", d: "Beginner atigi 1 oy — ko'pchilik yangi kelganlar o'ylaganidan ko'proq bilishadi. Darajangizni aniq tekshiramiz va bilgan narsangizni qayta o'qitib vaqtingizni olmaymiz." },
        { t: "English Every Day — tom ma'noda", d: "Haftasiga 3 kun Asosiy ustoz bilan, 3 kun Mentor bilan, qolganida esa Student App dagi mustaqil kundalik vazifalar. Smart LC bilan inglizsiz kun bo'lmaydi." },
        { t: "Parent App", d: "Ota-onalar hammasini real vaqtda ko'rishadi: davomat, progress va har bir uy vazifasi haqiqatan bajarilgan-bajarilmagani." },
        { t: "Kichik guruhlar, interaktiv doskalar", d: "15 tagacha talabadan iborat guruhlar, darslar interaktiv doskalarda — mashg'ulotlar jonli va diqqat markazida, har bir talabaga ustozning to'liq e'tibori yetadi." },
        { t: "Rasmiy Oxford Solutions, 3-nashr", d: "Oxford University Press ning Solutions seriyasi — har darsda speaking mashqi, bosqichma-bosqich imtihon tayyorgarligi va dunyo bo'ylab millionlab o'quvchilar sinovidan o'tgan yo'l." },
        { t: "Haqiqiy, tekshirsa bo'ladigan natijalar", d: "Biz e'lon qilgan har bir ball rasmiy IELTS sertifikati bilan tasdiqlangan — quyida ko'ring." },
      ],
    },
    courses: {
      title: "Sizning yo'lingiz",
      sub: "Birinchi inglizcha so'zdan IELTS mahoratigacha olti qadam — har bosqichda English Every Day.",
      start: "Boshlanish",
      finish: "IELTS tayyor",
      month: "oy",
      months: "oy",
      total: "Noldan to'liq yo'l: taxminan 16 oy muntazam o'qish.",
      registerCta: "Avtobusga chiqing — Ro'yxatdan o'ting",
      goal: {
        name: "Maqsadingiz",
        sub: "🎓 · ✈️ · 💼",
        level: "IELTS = kalitingiz",
        d: "IELTS marra emas — eshiklarni ochadigan kalit. Ko'pchilik o'z bali bilan chet el universitetlariga va grantlarga qabul qilinadi, o'qish va ish vizalarini oladi yoki xalqaro karyerani boshlaydi. Maqsadingiz qanday bo'lmasin — bu avtobus sizni o'sha yerga olib boradi.",
      },
      steps: [
        { name: "Beginner", dur: 1, level: "A1", d: "Eng birinchi qadam — alifbo, asosiy so'z boyligi va oddiy kundalik iboralar." },
        { name: "Elementary", dur: 3, level: "A2", d: "Grammatika poydevorini quring va to'liq gaplar bilan ishonchli gapirishni boshlang." },
        { name: "Pre-Intermediate", dur: 3, level: "B1", d: "Hayotiy mavzularga kengaying va uzunroq suhbatlar quring." },
        { name: "Intermediate", dur: 3, level: "B1+", d: "To'rtala ko'nikmani mustahkamlang va murakkab, hayotiy ingliz tilini o'zlashtiring." },
        { name: "Pre-IELTS", dur: 3, level: "B2", d: "Aniqlik va ravonlikni mustaqil foydalanuvchi darajasiga yetkazing." },
        { name: "IELTS", dur: 3, level: "B2 – C2", bands: ["B2 – C2"], d: "To'liq IELTS tayyorgarligi — imtihon formatini o'zlashtiring, so'ng mock testlar bilan har bir ko'nikmani maqsadli balgacha sayqallang." },
      ],
    },
    pricing: {
      title: "Bitta halol narx",
      sub: "Oyiga 700 000 so'm — umumiy ingliz tili ham, IELTS tayyorgarligi ham. Hammasi narx ichida, yashirin to'lovlar yo'q.",
      perMonth: "oyiga",
      popular: "Eng ommabop",
      cta: "Ro'yxatdan o'tish",
      plans: [
        {
          name: "General English",
          desc: "Beginner → Pre-IELTS",
          features: [
            "Oxford Solutions 3-nashr kitoblari va daftarlar — bepul",
            "Haftasiga 3 kun Asosiy ustoz + 3 kun Mentor",
            "Student App: kundalik vazifalar, streak, lug'at",
            "Parent App: progress uyda ko'rinadi",
            "Kichik guruhlar (maks. 15), interaktiv doskalar",
          ],
        },
        {
          name: "IELTS tayyorgarligi",
          desc: "IELTS · B2 – C2",
          features: [
            "Barcha kitoblar, daftarlar va IELTS materiallari — bepul",
            "Haftasiga 3 kun Asosiy ustoz + 3 kun Mentor",
            "Haqiqiy vaqt bilan to'liq mock imtihonlar",
            "Maqsadli ball: 6.5 → 8.5",
            "IELTS 8.5 natijali ustoz darslari (Speaking 9.0)",
          ],
        },
      ],
    },
    events: {
      title: "Yakshanba tadbirlari",
      sub: "Hafta tugaydi, ingliz tili — yo'q. Har yakshanba Smart LC da:",
      list: [
        { icon: "🎬", name: "Movie Club", d: "Ingliz tilida film ko'ramiz va birga tahlil qilamiz — jonli til, haqiqiy madaniyat, subtitrlardan qo'rqish yo'q." },
        { icon: "🗣️", name: "Speaking Club", d: "Hammani gapirtiradigan mavzuli suhbatlar. Ingliz tili uy vazifasi emas, suhbatga aylanganda ishonch o'sadi." },
        { icon: "📝", name: "Sunday Mock Practice", d: "Haqiqiy imtihon sharoitida to'liq IELTS mock — vaqt, sukunat, javob varaqalari. Imtihon kuni odatiy holga aylanadi." },
      ],
    },
    teachers: {
      title: "Ustozlarimiz",
      sub: "Imtihonni o'zi topshirib, eng yuqori natija olgan ustozlardan o'rganing.",
      exp: "yillik tajriba",
      exp1: "yillik tajriba",
      list: [
        { name: "Abdurahmon Nasriddinov", band: "IELTS 8.5", details: ["Speaking 9.0", "Writing 8.5"], years: 7, bio: "IELTS tayyorlash bo'yicha mutaxassis, speaking va writing yo'nalishiga alohida e'tibor beradi. Isbotlangan strategiyalar bilan talabalarga to'siqlardan o'tishga yordam beradi." },
      ],
    },
    results: {
      title: "Haqiqiy natijalar. Rasmiy sertifikatlar.",
      sub: "Va'dalar emas — hujjatlar. Har bir sertifikat Smart LC talabasi qo'lga kiritgan rasmiy IELTS sertifikatidir.",
      all: "So'nggilari",
      holders: "egalari",
      zoomHint: "Sertifikat ustiga kursorni olib boring — kattalashtiriladi · telefonda bosing",
      close: "Yopish",
    },
    testimonials: {
      title: "Talabalarimiz fikri",
      sub: "Maqsadiga erishgan talabalar so'zlari — sertifikatlarini yuqorida topishingiz mumkin.",
    },
    location: {
      title: "Bizga tashrif buyuring",
      sub: "Suhbat va daraja tekshiruvi uchun keling — yo'lingizni shu yerning o'zida chizamiz.",
      addressLabel: "Manzil",
      address: "Yunusobod tumani, Qashqar ko'chasi 9A, Toshkent",
      directionsLabel: "Bizga qanday yetib kelish mumkin",
      directions: "Xaritada Abdulla Qodiriy metrosidan (ko'k) va Mustaqillik maydoni metrosidan (qizil) piyoda yo'nalishlar ko'rsatilgan. Yoki quyidagi avtobuslardan biriga chiqing:",
      busLabel: "Avtobus yo'nalishlari",
      minWalk: "daqiqa piyoda",
      mapCta: "Google Maps da ochish",
    },
    faq: {
      title: "Ko'p so'raladigan savollar",
      items: [
        { q: "Smart LC da o'qishni qanday boshlayman?", a: "Telegram orqali yozing yoki qo'ng'iroq qiling. Darajangizni aniqlab, sizni mos guruhga joylashtiramiz — hech qachon juda oson yoki juda qiyin material o'qimaysiz." },
        { q: "Men noldan boshlayman. IELTS ga erisha olamanmi?", a: "Ha — yo'limiz aynan shuning uchun. Beginner dan boshlab IELTS gacha olti qadam ko'tarilasiz. Noldan to'liq yo'l taxminan 16 oy davom etadi." },
        { q: "IELTS ga yetish qancha vaqt oladi?", a: "Pre-Intermediate dan boshlab Intermediate, Pre-IELTS va IELTS orqali yo'l taxminan 12 oy muntazam o'qishni talab qiladi. 90+ rasmiy 7.0+ natijamiz tizim ishlashini isbotlaydi." },
        { q: "Mock imtihonlar bormi?", a: "Ha. Talabalar haqiqiy imtihon vaqti bilan to'liq IELTS formatidagi mock testlarni topshirishadi — haqiqiy imtihon oddiy mashg'ulotdek tuyuladi." },
        { q: "Qanday materiallardan foydalanasiz?", a: "Umumiy ingliz tili bosqichlari uchun litsenziyalangan Oxford University Press dasturi, imtihon bosqichlari uchun maxsus IELTS materiallari va mock testlar — har kuni Student App yordamida." },
      ],
    },
    contact: {
      title: "Ingliz tili safaringizni bugun boshlang",
      sub: "Bir marta bosing — Telegram, Instagram yoki qo'ng'iroq. To'g'ri kursni tanlashga yordam beramiz.",
      telegram: "Telegram",
      phone: "Qo'ng'iroq",
      instagram: "Instagram",
      email: "Email",
      cta: "Telegramda yozish",
    },
    footer: { rights: "Barcha huquqlar himoyalangan.", tagline: "English Every Day" },
    bands: {
      telegram: { text: "Savollaringiz bormi? Telegramda tez javob beramiz.", cta: "Telegramda yozish" },
      phone: { text: "Gaplashishni afzal ko'rasizmi? Qo'ng'iroq qiling — yo'l ko'rsatamiz.", cta: "Qo'ng'iroq qilish" },
      instagram: { text: "Smart LC dagi kundalik hayotni Instagramda ko'ring.", cta: "Obuna bo'lish" },
      register: { text: "Keyingi sertifikat sizniki bo'lishi mumkin.", cta: "Ro'yxatdan o'tish" },
    },
    register: {
      title1: "INGLIZ TILI ni",
      title2: "o'rganmoqchimisiz?",
      sub: "Ismingiz va raqamingizni qoldiring — sizga qo'ng'iroq qilamiz, barcha savollaringizga javob beramiz va bepul daraja tekshiruviga yozamiz.",
      name: "Ismingiz",
      phone: "Telefon raqami",
      submit: "Yuborish",
      doneTitle: "Qabul qilindi!",
      doneText: "So'rovingizni oldik. Tez orada qo'ng'iroq qilamiz — telefoningiz yonida bo'lsin.",
      back: "Saytga qaytish",
      error: "Formani yuborishda xatolik yuz berdi. To'g'ridan-to'g'ri bog'laning:",
    },
  },

  ru: {
    nav: { about: "Почему мы", courses: "Курсы", pricing: "Цены", teachers: "Преподаватели", results: "Результаты", location: "Адрес", contact: "Контакты", enroll: "Записаться", enrollShort: "Запись" },
    hero: {
      eyebrow: "Smart Learning Centre · Ташкент",
      motto: ["English", "Every", "Day."],
      sub: "Наш девиз прост: настоящий прогресс приходит с ежедневной практикой. Системные курсы от первого английского слова до IELTS — на основе программы Oxford University Press, с преподавателями с высокими баллами.",
      cta: "Записаться в Telegram",
      cta2: "Позвонить",
      badge: "официальных результатов IELTS 7.0+",
    },
    stats: {
      results: "Официальные результаты IELTS 7.0+",
      top: "Лучший балл студента",
      years: "Лет подтверждённых результатов",
      program: "Программа Oxford University Press",
      programVal: "Лицензия",
    },
    adv: {
      title: "Почему Smart LC?",
      sub: "Шесть причин, по которым наши студенты достигают цели — и получают удовольствие от пути.",
      app: {
        t: "Student App",
        d: "Наш девиз, встроенный в приложение. Каждый день — новое Слово, Совет, Статья, Подкаст и задание Shadowing. Стрики и монеты, которые превращают практику в привычку, встроенный словарь, живой прогресс и рейтинг группы — и запись к ментору в одно касание.",
      },
      week: { teacher: "Учитель", mentor: "Ментор", app: "Прил.", event: "Ивент" },
      fastStart: { num: "1", unit: "месяц", note: "— и Beginner позади" },
      badges: { classes: "до 15 студентов", oxford: "Solutions · 3-е изд.", results: "90+ официальных TRF" },
      cards: [
        { t: "Старт, который ценит ваше время", d: "Beginner — всего 1 месяц: большинство новичков знают больше, чем думают. Мы точно определяем уровень и не заставляем проходить то, что вы уже знаете." },
        { t: "English Every Day — буквально", d: "3 дня в неделю с Основным преподавателем, 3 дня с Ментором, плюс ежедневные самостоятельные задания в Student App. Со Smart LC не бывает дня без английского." },
        { t: "Parent App", d: "Родители видят всё в реальном времени: посещаемость, прогресс и действительно ли выполнена каждая домашняя работа." },
        { t: "Небольшие группы, интерактивные доски", d: "Группы до 15 человек, занятия на интерактивных досках — уроки живые и сфокусированные, каждому студенту достаётся внимание преподавателя." },
        { t: "Официальный Oxford Solutions, 3-е издание", d: "Серия Solutions от Oxford University Press — разговорная практика на каждом уроке, пошаговая подготовка к экзаменам и путь, проверенный миллионами учеников по всему миру." },
        { t: "Реальные, проверяемые результаты", d: "Каждый балл подтверждён официальным сертификатом IELTS — смотрите ниже." },
      ],
    },
    courses: {
      title: "Ваш путь",
      sub: "Шесть шагов от первого английского слова до мастерства IELTS — English Every Day на каждом уровне.",
      start: "Старт",
      finish: "Готов к IELTS",
      month: "месяц",
      months: "месяца",
      total: "Полный путь с нуля: около 16 месяцев регулярных занятий.",
      registerCta: "Садитесь в автобус — Регистрация",
      goal: {
        name: "Ваша цель",
        sub: "🎓 · ✈️ · 💼",
        level: "IELTS = ваш ключ",
        d: "IELTS — не финиш, а ключ, открывающий двери. Чаще всего балл нужен для поступления и стипендий в зарубежных университетах, учебных и рабочих виз или старта международной карьеры. Какой бы ни была ваша цель — этот автобус довезёт вас до неё.",
      },
      steps: [
        { name: "Beginner", dur: 1, level: "A1", d: "Самый первый шаг — алфавит, базовая лексика и простые повседневные фразы." },
        { name: "Elementary", dur: 3, level: "A2", d: "Постройте грамматический фундамент и начните уверенно говорить полными предложениями." },
        { name: "Pre-Intermediate", dur: 3, level: "B1", d: "Расширяйтесь на жизненные темы и ведите более длинные беседы." },
        { name: "Intermediate", dur: 3, level: "B1+", d: "Укрепите все четыре навыка и осваивайте сложный, реальный английский." },
        { name: "Pre-IELTS", dur: 3, level: "B2", d: "Отточите точность и беглость до уровня независимого пользователя." },
        { name: "IELTS", dur: 3, level: "B2 – C2", bands: ["B2 – C2"], d: "Полная подготовка к IELTS — освойте формат экзамена и доведите каждый навык до целевого балла на интенсивных mock-тестах." },
      ],
    },
    pricing: {
      title: "Одна честная цена",
      sub: "700 000 сумов в месяц — и общий английский, и подготовка к IELTS. Всё включено, без скрытых доплат.",
      perMonth: "в месяц",
      popular: "Самый популярный",
      cta: "Записаться",
      plans: [
        {
          name: "General English",
          desc: "Beginner → Pre-IELTS",
          features: [
            "Учебники Oxford Solutions 3-е изд. и тетради — бесплатно",
            "3 дня с Основным преподавателем + 3 дня с Ментором",
            "Student App: ежедневные задания, стрики, словарь",
            "Parent App: прогресс виден дома",
            "Небольшие группы (до 15) с интерактивными досками",
          ],
        },
        {
          name: "Подготовка к IELTS",
          desc: "IELTS · B2 – C2",
          features: [
            "Все книги, тетради и материалы IELTS — бесплатно",
            "3 дня с Основным преподавателем + 3 дня с Ментором",
            "Полные mock-экзамены с реальным таймингом",
            "Целевые баллы: 6.5 → 8.5",
            "Занятия ведёт преподаватель с IELTS 8.5 (Speaking 9.0)",
          ],
        },
      ],
    },
    events: {
      title: "Воскресные события",
      sub: "Неделя заканчивается, английский — нет. Каждое воскресенье в Smart LC:",
      list: [
        { icon: "🎬", name: "Movie Club", d: "Смотрим фильмы на английском и разбираем их вместе — живой язык, настоящая культура, никакого страха субтитров." },
        { icon: "🗣️", name: "Speaking Club", d: "Тематические дискуссии, в которых говорит каждый. Уверенность растёт, когда английский — это разговор, а не домашка." },
        { icon: "📝", name: "Sunday Mock Practice", d: "Полный mock-экзамен IELTS в реальных условиях — тайминг, тишина, бланки ответов. День экзамена становится рутиной." },
      ],
    },
    teachers: {
      title: "Наши преподаватели",
      sub: "Учитесь у тех, кто сам сдал экзамен — на высший балл.",
      exp: "лет опыта",
      exp1: "год опыта",
      list: [
        { name: "Абдурахмон Насриддинов", band: "IELTS 8.5", details: ["Speaking 9.0", "Writing 8.5"], years: 7, bio: "Специалист по подготовке к IELTS с фокусом на speaking и writing. Помогает студентам преодолевать плато с помощью проверенных стратегий." },
      ],
    },
    results: {
      title: "Реальные результаты. Официальные сертификаты.",
      sub: "Не обещания — документы. Каждый сертификат — официальный IELTS Test Report Form студента Smart LC.",
      all: "Последние",
      holders: "обладатели",
      zoomHint: "Наведите курсор на сертификат для увеличения · на телефоне — коснитесь",
      close: "Закрыть",
    },
    testimonials: {
      title: "Что говорят наши студенты",
      sub: "Слова студентов, достигших цели — их сертификаты вы найдёте выше.",
    },
    location: {
      title: "Приходите к нам",
      sub: "Заходите на беседу и проверку уровня — составим ваш маршрут на месте.",
      addressLabel: "Адрес",
      address: "Юнусабадский район, ул. Кашгар 9А, Ташкент",
      directionsLabel: "Как до нас добраться",
      directions: "На карте показаны пешие маршруты от метро Абдулла Кадыри (синий) и метро Мустакиллик Майдони (красный). Или садитесь на любой из этих автобусов:",
      busLabel: "Автобусы",
      minWalk: "мин пешком",
      mapCta: "Открыть в Google Maps",
    },
    faq: {
      title: "Часто задаваемые вопросы",
      items: [
        { q: "Как начать учиться в Smart LC?", a: "Напишите нам в Telegram или позвоните. Мы определим ваш уровень и подберём подходящую группу — вы никогда не будете учить слишком лёгкий или слишком сложный материал." },
        { q: "Я начинаю с нуля. Смогу ли я сдать IELTS?", a: "Да — именно для этого наш путь. Вы начинаете с Beginner и поднимаетесь по шести ступеням до IELTS. Полный путь с нуля занимает около 16 месяцев." },
        { q: "Сколько времени нужно до IELTS?", a: "С Pre-Intermediate дорога через Intermediate, Pre-IELTS и IELTS занимает около 12 месяцев регулярных занятий. Наши 90+ официальных результатов 7.0+ доказывают: система работает." },
        { q: "Есть ли пробные экзамены?", a: "Да. Студенты проходят полные mock-тесты в формате IELTS с реальным таймингом — настоящий экзамен ощущается как обычная тренировка." },
        { q: "По каким материалам вы занимаетесь?", a: "Лицензированная программа Oxford University Press для уровней общего английского, плюс специальные материалы IELTS и mock-тесты для экзаменационных ступеней — с ежедневной поддержкой Student App." },
      ],
    },
    contact: {
      title: "Начните свой путь в английском сегодня",
      sub: "Одно касание — Telegram, Instagram или звонок. Поможем выбрать подходящий курс.",
      telegram: "Telegram",
      phone: "Позвонить",
      instagram: "Instagram",
      email: "Email",
      cta: "Написать в Telegram",
    },
    footer: { rights: "Все права защищены.", tagline: "English Every Day" },
    bands: {
      telegram: { text: "Есть вопросы? В Telegram отвечаем быстро.", cta: "Написать в Telegram" },
      phone: { text: "Удобнее поговорить? Позвоните — мы всё подскажем.", cta: "Позвонить" },
      instagram: { text: "Повседневная жизнь Smart LC — в нашем Instagram.", cta: "Подписаться" },
      register: { text: "Следующий сертификат может быть вашим.", cta: "Записаться" },
    },
    register: {
      title1: "Хотите выучить",
      title2: "АНГЛИЙСКИЙ?",
      sub: "Оставьте имя и номер — мы перезвоним, ответим на все вопросы и запишем вас на бесплатную проверку уровня.",
      name: "Ваше имя",
      phone: "Номер телефона",
      submit: "Отправить",
      doneTitle: "Принято!",
      doneText: "Мы получили вашу заявку. Скоро перезвоним — держите телефон рядом.",
      back: "Вернуться на сайт",
      error: "Не удалось отправить форму. Свяжитесь с нами напрямую:",
    },
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(detectLang);
  const change = (code) => {
    setLang(code);
    localStorage.setItem("smartlc-lang", code);
    document.documentElement.lang = code;
  };
  return (
    <LangContext.Provider value={{ lang, setLang: change, t: dict[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
