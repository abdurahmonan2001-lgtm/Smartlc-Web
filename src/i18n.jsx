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
    nav: { about: "Why us", courses: "Courses", unlocks: "Opportunities", pricing: "Prices", teachers: "Team", results: "Results", location: "Location", levelCheck: "Level check", contact: "Contact", enroll: "Enroll now", enrollShort: "Enroll" },
    hero: {
      eyebrow: "Smart Learning Centre · Tashkent",
      role: "Founder & Lead IELTS Teacher",
      headline: [
        { text: "Practice tests don't" },
        { text: "make a band 8." },
        { text: "Thinking does.", accent: true },
      ],
      sub: "I am Abdurahmon Nasriddinov, and I have spent seven years working out why some students stall at 6.5 while others walk into the exam already thinking like the examiner. Everything I learned became a programme of my own — one that teaches you what IELTS is really measuring, instead of drilling what it happened to ask last year.",
      creds: { writing: "Writing, twice", years: "years teaching", results: "official IELTS 7.0+ results" },
      twice: "achieved twice",
      trial: "Your first lesson is free — come and see how the programme works before you decide anything.",
      cta: "Sign up via Telegram",
      cta2: "Free level check",
      badge: "See how the programme works",
    },
    method: {
      eyebrow: "The programme",
      title: "A programme, not a question bank",
      lead: "Most IELTS courses are a queue of past papers. You sit one, you mark it, you sit the next, and you hope the pattern sinks in. Sometimes it does — slowly, and only for the questions you have already seen. My programme is built the other way round: understand what the examiner is measuring, and every new question becomes a version of one you can already handle.",
      themTitle: "Most IELTS preparation",
      usTitle: "This programme",
      vs: "vs",
      rows: [
        { them: "Sit a test, check the answers, sit another.", us: "Understand why the right answer is right — and why the tempting one is not." },
        { them: "Memorised phrases for Speaking.", us: "Opinions you actually hold, argued clearly under pressure." },
        { them: "A template for every Writing task.", us: "Arguments built from your own reasoning, so an unfamiliar prompt cannot stop you." },
        { them: "Word lists to revise.", us: "Language you own, because you used it to say something you meant." },
        { them: "You leave with a band score.", us: "You leave thinking differently — in English and in your own language." },
      ],
      pillars: [
        {
          title: "You learn what IELTS is actually asking",
          body: "Every task in the exam tests one specific thing. Once you can name it, you stop guessing what the examiner wants and start giving it to them deliberately.",
        },
        {
          title: "Critical and analytical thinking",
          body: "You are taught to take a claim apart, weigh the evidence and spot a weak argument — including your own. That is what a band 8 Writing answer is made of, and it does not switch off when you leave the exam hall.",
        },
        {
          title: "Problem-solving under pressure",
          body: "The exam is a timed problem, not a memory test. You practise choosing an approach, committing to it, and recovering when a passage or a question turns out harder than expected.",
        },
        {
          title: "You grow — not just your score",
          body: "Students finish this programme more articulate, more confident and much harder to fool: as people, not only as candidates. The certificate is the by-product.",
        },
      ],
      quote: "I do not want a student who can pass IELTS. I want a student who can think — and who then finds IELTS easy. In seven years I have never once seen it work the other way round.",
      signature: "Founder, Smart Learning Centre · IELTS 9.0 Speaking, 8.5 Writing",
    },
    proof: {
      eyebrow: "The evidence",
      title: "The certificates behind those numbers",
      sub: "Two sittings at Speaking 9.0, two at Writing 8.5. Every Test Report Form is here — open any of them full size. Candidate ID, date of birth and the form number are blurred; nothing else is.",
      speaking: "Speaking",
      writing: "Writing",
      open: "Open the certificate",
      note: "Any IELTS score can be checked by a recognising organisation at ielts.org/verify. We would rather you did.",
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
      sub: "Seven reasons our students reach their target — and enjoy the road there.",
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
        { t: "A system that guarantees results", d: "Nothing here is improvised: every level has a fixed syllabus, clear goals and regular progress checks — and you move up only once you truly meet the standard. That structure is exactly why we can promise good results.", steps: ["Precise level placement", "Fixed syllabus at every level", "Regular progress checks", "Level up only when you're ready"] },
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
      registerCta: "Come aboard — Register",
      steps: [
        { name: "Beginner", dur: 1, level: "A1", d: "Your very first step — alphabet, core vocabulary and simple everyday phrases." },
        { name: "Elementary", dur: 3, level: "A2", d: "Build grammar foundations and start speaking in full sentences with confidence." },
        { name: "Pre-Intermediate", dur: 3, level: "B1", d: "Expand into real-life topics and hold longer conversations." },
        { name: "Intermediate", dur: 3, level: "B1+", d: "Strengthen all four skills and take on complex, real-world English." },
        { name: "Pre-IELTS", dur: 3, level: "B2", d: "Refine accuracy and fluency to a solid, independent-user level." },
        { name: "IELTS", dur: 3, level: "B2 – C2", bands: ["B2 – C2"], d: "Full IELTS training — master the exam format, then polish every skill with intensive mock-test practice up to your target band." },
      ],
    },
    unlocks: {
      title: "Where the Ship Sails",
      sub: "An IELTS certificate isn't just paper — it's a boarding pass. Here's what it opens:",
      rows: [
        { icon: "🎓", dest: "Universities abroad", d: "The UK, USA, Europe and Asia — direct admission and scholarship applications.", band: "6.5 – 7.5" },
        { icon: "🏛️", dest: "International universities in Tashkent", d: "Westminster, Inha, Webster, MDIS and more admit by IELTS band.", band: "5.5 – 6.5" },
        { icon: "📝", dest: "State university entrance (DTM)", d: "IELTS 5.5+ (B2) counts as a 100% score in the foreign-language subject.", band: "5.5+" },
        { icon: "🏅", dest: "El-Yurt Umidi & global scholarships", d: "State-funded study abroad — a strong IELTS is your ticket in.", band: "6.5+" },
        { icon: "💼", dest: "International careers", d: "Global companies, IT and tourism — English-speaking roles pay more.", band: "7.0+" },
        { icon: "✈️", dest: "Work & migration visas", d: "The UK, Canada and Australia all count IELTS in their points systems.", band: "5.0 – 7.0" },
      ],
      cta: "Get your boarding pass — Register",
      goal: {
        title: "What's your goal?",
        sub: "Tap a goal — see the band you need and the road that takes you there.",
        target: "Your target",
        cta: "Start with a free level check",
        goals: [
          { icon: "🎓", label: "Study abroad", band: "6.5 – 7.5", need: "Most universities ask for 6.5–7.0, and scholarship applications are strongest at 7.0+.", plan: "Your road: Pre-IELTS → IELTS — about 6 months of exam-focused training, with a full mock every Sunday." },
          { icon: "🏛️", label: "University in Tashkent", band: "5.5 – 6.5", need: "Westminster, Inha, Webster and MDIS admit from around 5.5–6.0.", plan: "Reachable from Intermediate: 3–6 months depending on your level — a free level check shows your exact starting stop." },
          { icon: "📝", label: "Maximum DTM score", band: "5.5+", need: "IELTS 5.5 (B2) already counts as a 100% foreign-language score at state university entrance.", plan: "From Intermediate it takes about 6 months — and the certificate keeps working after admission." },
          { icon: "💼", label: "Global career", band: "7.0+", need: "International employers read 7.0+ as fully professional working English.", plan: "The full journey with speaking-heavy classes, daily app practice and interview-ready fluency." },
          { icon: "💬", label: "Confident English", band: "B2+", need: "No exam needed — just real conversations without fear.", plan: "General English: Beginner → Pre-IELTS, from 1 to 13 months depending on where you start." },
        ],
      },
    },
    english: {
      title: "Why English?",
      sub: "Because the language itself opens the world — before any exam ever enters the picture:",
      items: [
        ["1.5 bln+", "people speak English worldwide — talk to 1 in 5 humans"],
        ["50%", "of everything on the internet is in English"],
        ["100+", "countries where English connects you"],
        ["No.1", "language of science, IT and global business"],
      ],
    },
    stories: {
      title: "Success Stories",
      sub: "The certificate is a key — here is what our students opened with it:",
      more: "Show more stories",
    },
    levelCheck: {
      title: "Not sure where to start?",
      name: "Free 15-minute level check",
      steps: [
        ["🗣️", "A short speaking and written check with a teacher"],
        ["📍", "You learn your exact starting stop on the journey"],
        ["🗺️", "You leave with a personal road map and timeline"],
      ],
      cta: "Book yours — it's free",
      or: "or call us",
    },
    pricing: {
      title: "One Reasonable Price",
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
      title: "Our Team",
      sub: "Everyone who teaches you has passed the exam themselves — tap any certificate to inspect it up close.",
      roles: {
        abdurakhmon: "English Teacher",
        sardorbek: "English Teacher",
        fazilat: "English Teacher",
        mashxura: "English Teacher",
        laylo: "English Teacher",
      },
      bios: {
        abdurakhmon: "IELTS 8.5 (C2) with a perfect 9.0 in both Listening and Reading. Specialist in IELTS preparation with 7 years of experience — helps students break through plateaus with proven band-score strategies.",
        sardorbek: "A specialist with 2 years of English-teaching experience, focused on making complex grammar topics and language rules simple, clear and memorable. Every lesson is built around the individual student — their level, goal and learning style. Modern methods and hands-on practice grow confident, fluent spoken English.",
        fazilat: "An English specialist holding IELTS 7.0 (C1). Across her work in schools and learning centres she has helped many students grow their language skills. Her lessons rely on interactive methods that make English engaging and effective.",
        mashxura: "An English teacher with an IELTS 7.5 certificate and 2 years of experience. Her goal is to teach English not as a school subject but as a skill you use freely in everyday life. Lessons focus on speaking, grammar, vocabulary and real-life communication — shaped around each student's individual needs, with progress followed closely.",
        laylo: "An English teacher holding IELTS 7.0 with three years of experience. The approach is built on interactive, practical lessons that make English straightforward and efficient to learn: an individual fit to each student's level and goals, particular attention to Speaking and Grammar, and the confidence to use English in everyday conversation.",
      },
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
      name: "Name and surname",
      age: "Age",
      phone: "Phone number",
      submit: "Send",
      doneTitle: "Got it!",
      doneText: "We received your request. We'll call you back shortly — keep your phone nearby.",
      back: "Back to the website",
      error: "Something went wrong sending the form. Reach us directly instead:",
    },
  },

  uz: {
    nav: { about: "Nega biz", courses: "Kurslar", unlocks: "Imkoniyatlar", pricing: "Narxlar", teachers: "Jamoa", results: "Natijalar", location: "Manzil", levelCheck: "Daraja testi", contact: "Aloqa", enroll: "Ro'yxatdan o'tish", enrollShort: "Yozilish" },
    hero: {
      eyebrow: "Smart Learning Centre · Toshkent",
      role: "Asoschi va bosh IELTS ustozi",
      headline: [
        { text: "Amaliy testlar" },
        { text: "sizga 8.0 bermaydi." },
        { text: "Fikrlash beradi.", accent: true },
      ],
      sub: "Men Abdurahmon Nasriddinovman. Yetti yil davomida nega ba'zi o'quvchilar 6.5 da to'xtab qolishini, boshqalari esa imtihonga kirishdan oldin ham imtihonchidek fikrlashini o'rgandim. Shu tajribadan o'z dasturim tug'ildi: u sizga IELTS aslida nimani o'lchayotganini o'rgatadi, o'tgan yil nima so'ralganini yodlatmaydi.",
      creds: { writing: "Writing, ikki marta", years: "yillik tajriba", results: "rasmiy IELTS 7.0+ natija" },
      twice: "ikki marta",
      trial: "Birinchi darsingiz bepul — biror narsaga qaror qilishdan oldin dastur qanday ishlashini o'z ko'zingiz bilan ko'ring.",
      cta: "Telegram orqali yozilish",
      cta2: "Bepul daraja testi",
      badge: "Dastur qanday ishlashini ko'ring",
    },
    method: {
      eyebrow: "Dastur",
      title: "Savollar to'plami emas — dastur",
      lead: "Ko'pchilik IELTS kurslari — o'tgan yillardagi testlar navbati. Bittasini ishlaysiz, tekshirasiz, keyingisiga o'tasiz va qonuniyat o'z-o'zidan singishiga umid qilasiz. Ba'zan singadi — sekin va faqat siz allaqachon ko'rgan savollar uchun. Mening dasturim teskari qurilgan: imtihonchi nimani o'lchayotganini tushunsangiz, har qanday yangi savol siz uddalay oladigan savolning bir ko'rinishiga aylanadi.",
      themTitle: "Odatdagi IELTS tayyorgarligi",
      usTitle: "Bu dastur",
      vs: "vs",
      rows: [
        { them: "Test ishlang, javoblarni tekshiring, yana test ishlang.", us: "To'g'ri javob nega to'g'ri, chalg'ituvchisi nega noto'g'ri — buni tushunasiz." },
        { them: "Speaking uchun yodlangan iboralar.", us: "O'zingiz chindan ishonadigan fikrlar, bosim ostida aniq himoya qilinadi." },
        { them: "Har bir Writing vazifasi uchun shablon.", us: "O'z mulohazangizdan qurilgan dalillar — notanish mavzu ham sizni to'xtata olmaydi." },
        { them: "Yodlash uchun so'zlar ro'yxati.", us: "O'zingizniki bo'lgan til, chunki uni haqiqiy fikringizni aytish uchun ishlatgansiz." },
        { them: "Siz ball bilan chiqasiz.", us: "Siz boshqacha fikrlab chiqasiz — ingliz tilida ham, ona tilingizda ham." },
      ],
      pillars: [
        {
          title: "IELTS aslida nima so'rayotganini bilasiz",
          body: "Imtihondagi har bir vazifa aniq bitta narsani tekshiradi. Uni nomlay olsangiz, imtihonchi nima kutayotganini taxmin qilishni bas qilasiz va uni ongli ravishda berasiz.",
        },
        {
          title: "Tanqidiy va tahliliy fikrlash",
          body: "Da'voni qismlarga ajratish, dalillarni tortish va zaif fikrni — hatto o'zingiznikini ham — payqashni o'rganasiz. Band 8 darajasidagi Writing javobi aynan shundan iborat, va bu ko'nikma imtihon zalidan chiqqach yo'qolmaydi.",
        },
        {
          title: "Bosim ostida muammo yechish",
          body: "Imtihon — vaqt chegarasidagi masala, yodlash sinovi emas. Yo'l tanlash, unga sodiq qolish va matn yoki savol kutilganidan qiyin chiqqanda o'zingizni tiklashni mashq qilasiz.",
        },
        {
          title: "Ball emas — siz o'sasiz",
          body: "Bu dasturni tugatgan o'quvchilar ravonroq gapiradi, o'ziga ishonadi va ularni aldash ancha qiyin bo'ladi: nafaqat imtihon topshiruvchi, balki inson sifatida. Sertifikat esa shunchaki natija.",
        },
      ],
      quote: "Menga IELTS dan o'ta oladigan o'quvchi kerak emas. Menga fikrlay oladigan o'quvchi kerak — va unga IELTS oson bo'lib qoladi. Yetti yilda buning teskarisi ishlaganini bir marta ham ko'rmadim.",
      signature: "Asoschi, Smart Learning Centre · IELTS Speaking 9.0, Writing 8.5",
    },
    proof: {
      eyebrow: "Dalil",
      title: "Bu raqamlar ortidagi sertifikatlar",
      sub: "Speaking 9.0 — ikki marta, Writing 8.5 — ikki marta. Har bir Test Report Form shu yerda: istalganini bosib, to'liq hajmda ko'ring. Faqat nomzod ID raqami, tug'ilgan sana va forma raqami xiralashtirilgan — boshqa hech narsa emas.",
      speaking: "Speaking",
      writing: "Writing",
      open: "Sertifikatni ochish",
      note: "Har qanday IELTS natijasini tan oluvchi tashkilotlar ielts.org/verify orqali tekshirishi mumkin. Biz buni ma'qullaymiz.",
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
      sub: "Talabalarimiz maqsadiga yetishining yettita sababi — va bu yo'ldan zavq olishlari.",
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
        { t: "Natijani kafolatlaydigan tizim", d: "Bizda hech narsa tavakkaliga qurilmagan: har bir bosqichning aniq dasturi, aniq maqsadlari va muntazam nazorati bor — keyingi bosqichga esa faqat standartga to'liq erishganingizda o'tasiz. Aynan shu tizim tufayli yaxshi natijani ishonch bilan kafolatlaymiz.", steps: ["Darajani aniq belgilash", "Har bosqichda aniq dastur", "Muntazam progress nazorati", "Keyingi bosqich — faqat tayyor bo'lganda"] },
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
      registerCta: "Kemaga chiqing — Ro'yxatdan o'ting",
      steps: [
        { name: "Beginner", dur: 1, level: "A1", d: "Eng birinchi qadam — alifbo, asosiy so'z boyligi va oddiy kundalik iboralar." },
        { name: "Elementary", dur: 3, level: "A2", d: "Grammatika poydevorini quring va to'liq gaplar bilan ishonchli gapirishni boshlang." },
        { name: "Pre-Intermediate", dur: 3, level: "B1", d: "Hayotiy mavzularga kengaying va uzunroq suhbatlar quring." },
        { name: "Intermediate", dur: 3, level: "B1+", d: "To'rtala ko'nikmani mustahkamlang va murakkab, hayotiy ingliz tilini o'zlashtiring." },
        { name: "Pre-IELTS", dur: 3, level: "B2", d: "Aniqlik va ravonlikni mustaqil foydalanuvchi darajasiga yetkazing." },
        { name: "IELTS", dur: 3, level: "B2 – C2", bands: ["B2 – C2"], d: "To'liq IELTS tayyorgarligi — imtihon formatini o'zlashtiring, so'ng mock testlar bilan har bir ko'nikmani maqsadli balgacha sayqallang." },
      ],
    },
    unlocks: {
      title: "Kema qayerga suzadi?",
      sub: "IELTS sertifikati shunchaki qog'oz emas — bu bording-pass. Mana u ochadigan yo'llar:",
      rows: [
        { icon: "🎓", dest: "Chet el universitetlari", d: "Buyuk Britaniya, AQSH, Yevropa va Osiyo — to'g'ridan-to'g'ri qabul va grant arizalari.", band: "6.5 – 7.5" },
        { icon: "🏛️", dest: "Toshkentdagi xalqaro universitetlar", d: "Westminster, Inha, Webster, MDIS va boshqalar IELTS bali bo'yicha qabul qiladi.", band: "5.5 – 6.5" },
        { icon: "📝", dest: "Mahalliy OTMlarga kirish (DTM)", d: "IELTS 5.5+ (B2) chet tili fanidan 100% ball sifatida hisoblanadi.", band: "5.5+" },
        { icon: "🏅", dest: "El-Yurt Umidi va xalqaro grantlar", d: "Davlat hisobidan chet elda o'qish — yuqori IELTS asosiy chiptangiz.", band: "6.5+" },
        { icon: "💼", dest: "Xalqaro karyera", d: "Global kompaniyalar, IT va turizm — ingliz tilini bilganlar ko'proq maosh oladi.", band: "7.0+" },
        { icon: "✈️", dest: "Ish va migratsiya vizalari", d: "Buyuk Britaniya, Kanada va Avstraliya ballar tizimida IELTS ni hisobga oladi.", band: "5.0 – 7.0" },
      ],
      cta: "Bording-passingizni oling — Ro'yxatdan o'ting",
      goal: {
        title: "Maqsadingiz nima?",
        sub: "Maqsadni tanlang — kerakli ball va unga olib boradigan yo'lni ko'ring.",
        target: "Sizning maqsadingiz",
        cta: "Bepul daraja tekshiruvidan boshlang",
        goals: [
          { icon: "🎓", label: "Chet elda o'qish", band: "6.5 – 7.5", need: "Ko'pchilik universitetlar 6.5–7.0 so'raydi, grant arizalari esa 7.0+ bilan kuchli bo'ladi.", plan: "Yo'lingiz: Pre-IELTS → IELTS — taxminan 6 oylik imtihonga yo'naltirilgan tayyorgarlik, har yakshanba to'liq mock bilan." },
          { icon: "🏛️", label: "Toshkentdagi universitet", band: "5.5 – 6.5", need: "Westminster, Inha, Webster va MDIS taxminan 5.5–6.0 dan qabul qiladi.", plan: "Intermediate dan boshlab 3–6 oyda erishish mumkin — bepul daraja tekshiruvi aniq boshlang'ich bekatni ko'rsatadi." },
          { icon: "📝", label: "DTM da maksimal ball", band: "5.5+", need: "IELTS 5.5 (B2) davlat OTMlariga kirishda chet tili fanidan 100% ball hisoblanadi.", plan: "Intermediate dan taxminan 6 oy — sertifikat esa qabuldan keyin ham ishlayveradi." },
          { icon: "💼", label: "Xalqaro karyera", band: "7.0+", need: "Xalqaro ish beruvchilar 7.0+ ni to'liq professional ingliz tili deb qabul qiladi.", plan: "Speaking ko'p bo'lgan darslar, har kungi ilova mashqlari va intervyuga tayyor ravonlik bilan to'liq yo'l." },
          { icon: "💬", label: "Erkin ingliz tili", band: "B2+", need: "Imtihon shart emas — shunchaki qo'rquvsiz, erkin suhbatlar.", plan: "General English: Beginner → Pre-IELTS, boshlang'ich darajangizga qarab 1 oydan 13 oygacha." },
        ],
      },
    },
    english: {
      title: "Nega ingliz tili?",
      sub: "Chunki tilning o'zi — hali hech qanday imtihon bo'lmasidan — dunyoni ochadi:",
      items: [
        ["1.5 mlrd+", "kishi ingliz tilida gaplashadi — har 5 kishidan biri bilan suhbatlashing"],
        ["50%", "internetdagi barcha ma'lumot ingliz tilida"],
        ["100+", "mamlakatda ingliz tili sizni bog'laydi"],
        ["No.1", "fan, IT va global biznes tili"],
      ],
    },
    stories: {
      title: "Muvaffaqiyat tarixlari",
      sub: "Sertifikat — bu kalit. Mana talabalarimiz u bilan qanday eshiklarni ochdi:",
      more: "Yana tarixlarni ko'rish",
    },
    levelCheck: {
      title: "Qayerdan boshlashni bilmayapsizmi?",
      name: "Bepul 15 daqiqalik daraja tekshiruvi",
      steps: [
        ["🗣️", "Ustoz bilan qisqa speaking va yozma tekshiruv"],
        ["📍", "Yo'ldagi aniq boshlang'ich bekatingizni bilib olasiz"],
        ["🗺️", "Shaxsiy yo'l xaritasi va muddat bilan chiqasiz"],
      ],
      cta: "Band qiling — bu bepul",
      or: "yoki qo'ng'iroq qiling",
    },
    pricing: {
      title: "Bitta maqbul narx",
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
      title: "Jamoamiz",
      sub: "Sizga dars beradigan har bir inson imtihonni o'zi topshirgan — istalgan sertifikatni bosib, yaqindan ko'ring.",
      roles: {
        abdurakhmon: "Ingliz tili ustozi",
        sardorbek: "Ingliz tili ustozi",
        fazilat: "Ingliz tili ustozi",
        mashxura: "Ingliz tili ustozi",
        laylo: "Ingliz tili ustozi",
      },
      bios: {
        abdurakhmon: "IELTS 8.5 (C2), Listening va Reading bo'yicha mukammal 9.0. 7 yillik tajribaga ega IELTS tayyorgarligi mutaxassisi — isbotlangan strategiyalar bilan talabalarga to'siqlardan o'tishga yordam beradi.",
        sardorbek: "Ingliz tili o'qitish bo'yicha 2 yillik tajribaga ega mutaxassis. Murakkab grammatik mavzular va til qoidalarini sodda, tushunarli va esda qolarli usullar bilan o'rgatishga ixtisoslashgan. Har bir o'quvchining bilim darajasi, maqsadi va o'rganish uslubidan kelib chiqib, individual yondashuvda dars o'tadi. Zamonaviy metodlar va amaliy mashg'ulotlar orqali o'quvchilarning ingliz tilida erkin muloqot qilishi va o'ziga ishonchini oshirishga e'tibor qaratadi.",
        fazilat: "IELTS 7.0 (C1) darajasiga ega ingliz tili mutaxassisi. Maktab va o'quv markazlaridagi tajribasi davomida ko'plab o'quvchilarning til ko'nikmalarini rivojlantirishga hissa qo'shgan. Darslarda interaktiv metodlardan foydalanib, ingliz tilini qiziqarli va samarali tarzda o'rgatadi.",
        mashxura: "IELTS 7.5 sertifikati va 2 yillik tajribaga ega ingliz tili o'qituvchisi. Asosiy maqsadi — o'quvchilarga ingliz tilini faqat fan sifatida emas, kundalik hayotda erkin qo'llanadigan ko'nikma sifatida o'rgatish. Darslarida speaking, grammar, vocabulary va real-life communicationga alohida e'tibor beradi; har bir o'quvchining individual ehtiyojidan kelib chiqib ishlash va rivojlanishini kuzatib borish u uchun muhim.",
        laylo: "IELTS 7.0 sertifikatiga va 3 yillik tajribaga ega ingliz tili o'qituvchisi. Interaktiv va amaliy darslar orqali ingliz tilini oson va samarali o'rganishga yo'naltirilgan yondashuv. O'quvchilarning darajasi va maqsadlariga mos individual yondashuv, Speaking va Grammar ko'nikmalarini rivojlantirish hamda kundalik muloqotda ingliz tilidan ishonch bilan foydalanishga yo'naltirish.",
      },
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
      name: "Ism va familiyangiz",
      age: "Yoshingiz",
      phone: "Telefon raqami",
      submit: "Yuborish",
      doneTitle: "Qabul qilindi!",
      doneText: "So'rovingizni oldik. Tez orada qo'ng'iroq qilamiz — telefoningiz yonida bo'lsin.",
      back: "Saytga qaytish",
      error: "Formani yuborishda xatolik yuz berdi. To'g'ridan-to'g'ri bog'laning:",
    },
  },

  ru: {
    nav: { about: "Почему мы", courses: "Курсы", unlocks: "Возможности", pricing: "Цены", teachers: "Команда", results: "Результаты", location: "Адрес", levelCheck: "Тест уровня", contact: "Контакты", enroll: "Записаться", enrollShort: "Запись" },
    hero: {
      eyebrow: "Smart Learning Centre · Ташкент",
      role: "Основатель и ведущий преподаватель IELTS",
      headline: [
        { text: "Практика" },
        { text: "не даёт 8.0." },
        { text: "Мышление даёт.", accent: true },
      ],
      sub: "Я Абдурахмон Насриддинов. Семь лет я разбирался, почему одни студенты застревают на 6.5, а другие входят в аудиторию, уже думая как экзаменатор. Из этого выросла моя собственная программа: она учит понимать, что IELTS на самом деле измеряет, а не заучивать то, что спрашивали в прошлом году.",
      creds: { writing: "Writing, дважды", years: "лет преподавания", results: "официальных результатов 7.0+" },
      twice: "дважды",
      trial: "Первое занятие бесплатное — приходите и посмотрите, как устроена программа, прежде чем что-то решать.",
      cta: "Записаться в Telegram",
      cta2: "Бесплатный тест уровня",
      badge: "Как устроена программа",
    },
    method: {
      eyebrow: "Программа",
      title: "Программа, а не банк вопросов",
      lead: "Большинство курсов IELTS — это очередь из прошлых экзаменов. Вы решаете один, проверяете, беретесь за следующий и надеетесь, что закономерность уложится сама. Иногда укладывается — медленно и только для тех заданий, которые вы уже видели. Моя программа построена наоборот: поймите, что измеряет экзаменатор, и любой новый вопрос станет версией того, с которым вы уже справляетесь.",
      themTitle: "Обычная подготовка к IELTS",
      usTitle: "Эта программа",
      vs: "vs",
      rows: [
        { them: "Решить тест, проверить ответы, взять следующий.", us: "Понять, почему верный ответ верен — и почему заманчивый неверен." },
        { them: "Заученные фразы для Speaking.", us: "Мнения, которых вы действительно придерживаетесь, ясно защищённые под давлением." },
        { them: "Шаблон на каждое задание Writing.", us: "Аргументы из вашего собственного рассуждения — незнакомая тема вас не остановит." },
        { them: "Списки слов для зубрёжки.", us: "Язык, который стал вашим, потому что вы сказали на нём то, что думали." },
        { them: "Вы уходите с баллом.", us: "Вы уходите с другим мышлением — и на английском, и на родном языке." },
      ],
      pillars: [
        {
          title: "Вы понимаете, о чём на самом деле спрашивает IELTS",
          body: "Каждое задание проверяет что-то одно и вполне конкретное. Как только вы можете это назвать, вы перестаёте гадать, чего хочет экзаменатор, и начинаете давать это осознанно.",
        },
        {
          title: "Критическое и аналитическое мышление",
          body: "Вас учат разбирать утверждение на части, взвешивать доводы и замечать слабый аргумент — в том числе свой. Именно из этого состоит ответ Writing на 8.0, и этот навык не выключается за дверью экзамена.",
        },
        {
          title: "Решение задач под давлением",
          body: "Экзамен — это задача с таймером, а не проверка памяти. Вы тренируетесь выбирать подход, придерживаться его и восстанавливаться, когда текст или вопрос оказались сложнее ожидаемого.",
        },
        {
          title: "Растёт не балл — растёте вы",
          body: "Студенты заканчивают программу более красноречивыми, уверенными и куда менее внушаемыми: как люди, а не только как кандидаты. Сертификат при этом побочный продукт.",
        },
      ],
      quote: "Мне не нужен студент, который может сдать IELTS. Мне нужен студент, который умеет думать — и для которого IELTS становится лёгким. За семь лет я ни разу не видел, чтобы это работало наоборот.",
      signature: "Основатель, Smart Learning Centre · IELTS Speaking 9.0, Writing 8.5",
    },
    proof: {
      eyebrow: "Доказательство",
      title: "Сертификаты за этими цифрами",
      sub: "Speaking 9.0 — дважды, Writing 8.5 — дважды. Каждый Test Report Form здесь: откройте любой в полном размере. Скрыты только идентификатор кандидата, дата рождения и номер формы — больше ничего.",
      speaking: "Speaking",
      writing: "Writing",
      open: "Открыть сертификат",
      note: "Любой результат IELTS можно проверить на ielts.org/verify. Мы только за.",
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
      sub: "Семь причин, по которым наши студенты достигают цели — и получают удовольствие от пути.",
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
        { t: "Система, которая гарантирует результат", d: "У нас ничего не строится на импровизации: у каждого уровня — чёткая программа, ясные цели и регулярный контроль прогресса, а на следующий уровень вы переходите, только действительно достигнув стандарта. Именно эта система позволяет нам уверенно гарантировать хороший результат.", steps: ["Точное определение уровня", "Чёткая программа каждого уровня", "Регулярный контроль прогресса", "Переход только по готовности"] },
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
      registerCta: "Поднимайтесь на борт — Регистрация",
      steps: [
        { name: "Beginner", dur: 1, level: "A1", d: "Самый первый шаг — алфавит, базовая лексика и простые повседневные фразы." },
        { name: "Elementary", dur: 3, level: "A2", d: "Постройте грамматический фундамент и начните уверенно говорить полными предложениями." },
        { name: "Pre-Intermediate", dur: 3, level: "B1", d: "Расширяйтесь на жизненные темы и ведите более длинные беседы." },
        { name: "Intermediate", dur: 3, level: "B1+", d: "Укрепите все четыре навыка и осваивайте сложный, реальный английский." },
        { name: "Pre-IELTS", dur: 3, level: "B2", d: "Отточите точность и беглость до уровня независимого пользователя." },
        { name: "IELTS", dur: 3, level: "B2 – C2", bands: ["B2 – C2"], d: "Полная подготовка к IELTS — освойте формат экзамена и доведите каждый навык до целевого балла на интенсивных mock-тестах." },
      ],
    },
    unlocks: {
      title: "Куда плывёт корабль?",
      sub: "Сертификат IELTS — не просто бумага, это посадочный талон. Вот что он открывает:",
      rows: [
        { icon: "🎓", dest: "Университеты за рубежом", d: "Великобритания, США, Европа и Азия — прямое поступление и заявки на стипендии.", band: "6.5 – 7.5" },
        { icon: "🏛️", dest: "Международные университеты в Ташкенте", d: "Westminster, Inha, Webster, MDIS и другие принимают по баллу IELTS.", band: "5.5 – 6.5" },
        { icon: "📝", dest: "Поступление в вузы Узбекистана (DTM)", d: "IELTS 5.5+ (B2) засчитывается как 100% балла по иностранному языку.", band: "5.5+" },
        { icon: "🏅", dest: "El-Yurt Umidi и мировые стипендии", d: "Обучение за рубежом за счёт государства — высокий IELTS открывает дверь.", band: "6.5+" },
        { icon: "💼", dest: "Международная карьера", d: "Глобальные компании, IT и туризм — со знанием английского платят больше.", band: "7.0+" },
        { icon: "✈️", dest: "Рабочие и миграционные визы", d: "Великобритания, Канада и Австралия учитывают IELTS в балльных системах.", band: "5.0 – 7.0" },
      ],
      cta: "Получите посадочный талон — Регистрация",
      goal: {
        title: "Какая у вас цель?",
        sub: "Выберите цель — увидите нужный балл и дорогу, которая к нему ведёт.",
        target: "Ваша цель",
        cta: "Начните с бесплатной проверки уровня",
        goals: [
          { icon: "🎓", label: "Учёба за рубежом", band: "6.5 – 7.5", need: "Большинство университетов просят 6.5–7.0, а заявки на стипендии сильнее всего с 7.0+.", plan: "Ваша дорога: Pre-IELTS → IELTS — около 6 месяцев экзаменационной подготовки с полным mock-тестом каждое воскресенье." },
          { icon: "🏛️", label: "Университет в Ташкенте", band: "5.5 – 6.5", need: "Westminster, Inha, Webster и MDIS принимают примерно с 5.5–6.0.", plan: "Достижимо с уровня Intermediate за 3–6 месяцев — бесплатная проверка уровня покажет вашу точную стартовую остановку." },
          { icon: "📝", label: "Максимум на DTM", band: "5.5+", need: "IELTS 5.5 (B2) засчитывается как 100% балла по иностранному языку при поступлении.", plan: "С Intermediate — около 6 месяцев, а сертификат продолжает работать и после поступления." },
          { icon: "💼", label: "Международная карьера", band: "7.0+", need: "Международные работодатели воспринимают 7.0+ как полностью профессиональный английский.", plan: "Полный путь с упором на говорение, ежедневной практикой в приложении и уверенностью на собеседованиях." },
          { icon: "💬", label: "Свободный английский", band: "B2+", need: "Экзамен не нужен — просто живое общение без страха.", plan: "General English: Beginner → Pre-IELTS, от 1 до 13 месяцев в зависимости от старта." },
        ],
      },
    },
    english: {
      title: "Почему английский?",
      sub: "Потому что сам язык открывает мир — ещё до всяких экзаменов:",
      items: [
        ["1.5 млрд+", "человек говорят по-английски — каждый пятый на планете"],
        ["50%", "всего контента в интернете — на английском"],
        ["100+", "стран, где английский вас соединяет"],
        ["No.1", "язык науки, IT и глобального бизнеса"],
      ],
    },
    stories: {
      title: "Истории успеха",
      sub: "Сертификат — это ключ. Вот какие двери им открыли наши студенты:",
      more: "Показать ещё истории",
    },
    levelCheck: {
      title: "Не знаете, с чего начать?",
      name: "Бесплатная 15-минутная проверка уровня",
      steps: [
        ["🗣️", "Короткая устная и письменная проверка с преподавателем"],
        ["📍", "Узнаете свою точную стартовую остановку на пути"],
        ["🗺️", "Уйдёте с личной картой пути и сроками"],
      ],
      cta: "Записаться — это бесплатно",
      or: "или позвоните нам",
    },
    pricing: {
      title: "Одна разумная цена",
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
      title: "Наша команда",
      sub: "Каждый, кто вас учит, сам сдал экзамен — нажмите на любой сертификат, чтобы рассмотреть его вблизи.",
      roles: {
        abdurakhmon: "Преподаватель английского",
        sardorbek: "Преподаватель английского",
        fazilat: "Преподаватель английского",
        mashxura: "Преподаватель английского",
        laylo: "Преподаватель английского",
      },
      bios: {
        abdurakhmon: "IELTS 8.5 (C2), идеальные 9.0 по Listening и Reading. Специалист по подготовке к IELTS с 7-летним опытом — помогает студентам преодолевать плато с помощью проверенных стратегий.",
        sardorbek: "Специалист с 2-летним опытом преподавания английского языка. Объясняет сложные грамматические темы и правила языка просто, понятно и так, что они запоминаются. Строит каждое занятие индивидуально — с учётом уровня, цели и стиля обучения студента. С помощью современных методик и практических заданий развивает свободную речь и уверенность в английском.",
        fazilat: "Специалист по английскому языку с IELTS 7.0 (C1). За время работы в школах и учебных центрах помогла многим ученикам развить языковые навыки. На занятиях использует интерактивные методы, делая английский увлекательным и эффективным.",
        mashxura: "Преподаватель английского с сертификатом IELTS 7.5 и 2-летним опытом. Её цель — научить английскому не как школьному предмету, а как навыку для свободной повседневной жизни. Особое внимание на занятиях — speaking, grammar, vocabulary и живое общение; работа строится от индивидуальных потребностей каждого ученика с постоянным отслеживанием прогресса.",
        laylo: "Преподаватель английского языка с сертификатом IELTS 7.0 и трёхлетним опытом. Подход строится на интерактивных и практических занятиях, которые делают изучение английского простым и результативным: индивидуальный подбор под уровень и цели каждого студента, особое внимание к Speaking и Grammar и уверенное использование английского в повседневном общении.",
      },
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
      name: "Имя и фамилия",
      age: "Возраст",
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
