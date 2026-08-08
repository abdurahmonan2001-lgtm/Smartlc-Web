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

export const BOOKS = [
  { id: "mock1", title: "Smart LC Mock Test 1", short: "M1" },
  { id: "sample", title: "Smart LC Sample", short: "S" },
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

const SAMPLE_READING = {
  id: "sample-reading-1",
  bookId: "sample",
  title: "Sample Test — Reading (1 passage)",
  module: "reading",
  durationMin: 20,
  sections: [
    {
      title: "Reading Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on the passage below.",
      passageTitle: "The quiet rise of urban beekeeping",
      passage: `For most of the twentieth century, beekeeping was seen as a strictly rural pursuit, belonging to orchards, meadows and farmland. Over the last two decades, however, hives have been appearing in the least likely of places: on the roofs of hotels, behind railway stations, and in the small courtyards of city schools. Urban beekeeping has grown from a curiosity into a movement, and its supporters argue that cities may actually suit honeybees surprisingly well.

The claim sounds improbable, yet it rests on solid ground. Modern farmland is often dominated by a single crop, which flowers briefly and then leaves bees with little to eat for the rest of the season. Cities, by contrast, offer variety: parks, gardens, balconies and roadside trees bloom at different times from early spring to late autumn. A study of hive weights in Berlin found that city colonies gained weight faster and for longer each year than colonies kept just outside the city. Urban bees also encounter fewer agricultural pesticides, one of the main suspects in the decline of pollinating insects worldwide.

City beekeeping is not without difficulties. Hives placed too close together compete for the same flowers, and some researchers warn that enthusiastic amateurs may create more colonies than a neighbourhood can feed. There is also the question of temperament: a badly positioned hive on a busy street can bring bees and people into uncomfortable contact. Most city councils therefore ask keepers to register their hives, to position entrances away from footpaths, and to manage swarming carefully during the early summer months.

Perhaps the most striking effect of urban beekeeping has little to do with honey. Schools that keep bees report that pupils become noticeably more attentive to the green spaces around them, noticing which flowers open in which month and which insects visit them. Restaurants that keep rooftop hives use the honey in their kitchens, but chefs often say the real value is the story it lets them tell about where food comes from. In this sense, the urban hive works less like a farm and more like a small, humming classroom.`,
      questions: [
        { n: 1, type: "tfng", prompt: "Beekeeping was once considered an activity for the countryside.", answer: "TRUE" },
        { n: 2, type: "tfng", prompt: "Most city hives are kept by professional beekeepers.", answer: "NOT GIVEN" },
        { n: 3, type: "tfng", prompt: "Farmland usually provides bees with food for the whole season.", answer: "FALSE" },
        { n: 4, type: "tfng", prompt: "The Berlin study compared city hives with hives outside the city.", answer: "TRUE" },
        { n: 5, type: "tfng", prompt: "Urban bees are exposed to more pesticides than rural bees.", answer: "FALSE" },
        { n: 6, type: "gap", prompt: "Hives placed too near each other compete for the same ______.", note: "ONE WORD ONLY from the passage", answer: "flowers" },
        { n: 7, type: "gap", prompt: "Councils usually require keepers to ______ their hives.", note: "ONE WORD ONLY from the passage", answer: "register" },
        { n: 8, type: "gap", prompt: "Hive entrances should face away from ______.", note: "ONE WORD ONLY from the passage", answer: "footpaths" },
        { n: 9, type: "gap", prompt: "Keepers must manage ______ carefully in early summer.", note: "ONE WORD ONLY from the passage", answer: "swarming" },
        { n: 10, type: "mcq", prompt: "Why does the writer mention parks, gardens and balconies?", options: ["A To show cities bloom over a longer period", "B To suggest cities need more green space", "C To explain why bees leave farmland", "D To describe where hives should be placed"], answer: "A" },
        { n: 11, type: "mcq", prompt: "What concern do some researchers raise about urban beekeeping?", options: ["A Bees may become more aggressive in cities", "B There may be too many colonies for the available food", "C Honey quality is lower in cities", "D Registration rules are too strict"], answer: "B" },
        { n: 12, type: "mcq", prompt: "According to the writer, school beehives mainly help pupils to…", options: ["A produce honey for the school", "B learn to handle insects safely", "C pay more attention to nature around them", "D improve their science results"], answer: "C" },
        { n: 13, type: "mcq", prompt: "The phrase “a small, humming classroom” suggests the urban hive is valuable mainly for…", options: ["A its noise", "B its education", "C its honey", "D its size"], answer: "B" },
      ],
    },
  ],
};

const SAMPLE_LISTENING = {
  id: "sample-listening-1",
  bookId: "sample",
  title: "Sample Test — Listening (Section 1)",
  module: "listening",
  durationMin: 10,
  sections: [
    {
      title: "Section 1",
      passageTitle: "Enrolment phone call",
      instructions: "Questions 1–5. Listen to a student phoning a language centre, and answer the questions. In the real exam you hear the recording ONCE only.",
      audioSrc: "/practice-audio/sample-listening.wav",
      questions: [
        { n: 1, type: "gap", prompt: "The caller's family name is ______.", note: "ONE WORD ONLY", answer: "Karimov" },
        { n: 2, type: "gap", prompt: "He wants to join the ______ course.", note: "ONE WORD ONLY", answer: "evening" },
        { n: 3, type: "mcq", prompt: "Which day does his group meet?", options: ["A Monday", "B Tuesday", "C Wednesday", "D Thursday"], answer: "B" },
        { n: 4, type: "gap", prompt: "Classes begin at ______ o'clock.", note: "A NUMBER", answer: "six" },
        { n: 5, type: "gap", prompt: "Students should bring a ______ to the first lesson.", note: "ONE WORD ONLY", answer: "notebook" },
      ],
    },
  ],
};

const SAMPLE_WRITING = {
  id: "sample-writing-1",
  bookId: "sample",
  title: "Sample Test — Writing (Tasks 1 & 2)",
  module: "writing",
  durationMin: 60,
  sections: [
    {
      title: "Writing Task 1",
      passageTitle: "Writing Task 1",
      instructions: "You should spend about 20 minutes on this task. Write at least 150 words.",
      passage: "You recently borrowed a book from your English teacher, and you have accidentally damaged it.\n\nWrite a letter to your teacher. In your letter:\n\n• explain what happened to the book\n• apologise for the damage\n• say what you will do about it",
      questions: [
        { n: 1, type: "essay", prompt: "Write your letter below.", minWords: 150 },
      ],
    },
    {
      title: "Writing Task 2",
      passageTitle: "Writing Task 2",
      instructions: "You should spend about 40 minutes on this task. Write at least 250 words.",
      passage: "Some people believe that children learn a foreign language best by starting lessons as early as possible. Others think it is better to wait until children are settled in their own language.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      questions: [
        { n: 2, type: "essay", prompt: "Write your essay below.", minWords: 250 },
      ],
    },
  ],
};

// Demonstrates every question type the player supports, including the
// grouped blocks added for full IELTS authenticity: multi-select pairs,
// matching from a lettered box, map labelling, and table/notes completion.
// Doubles as living documentation of the authoring schema:
//   q.group          — questions sharing a group id render as ONE block
//   q.options        — checkbox options for multiselect (letters auto A–)
//   q.box/boxTitle   — shared lettered option box for match groups
//   q.image/letters  — plan image + letter range for label groups
//   q.table/notes    — completion layout; cells/lines hold {{n}} gap markers
//   q.rubric         — overrides the auto-generated instruction line
//   q.answer         — string or array of accepted variants
// Multi-select keys MUST be authored in alphabetical order across the group.
const SAMPLE_TYPES = {
  id: "sample-types-1",
  bookId: "sample",
  title: "Sample — All Question Types",
  module: "reading",
  durationMin: 15,
  sections: [
    {
      title: "Question-type demo",
      instructions: "This demo shows every question format used in the real test, in the order you might meet them.",
      passageTitle: "The Greyfield Visitor Centre",
      passage: `The Greyfield Visitor Centre opened in 2019 on the site of the town's old fish market. Its library stays open until 9 p.m. on weekdays, while the swimming pool on Station Road closes every Monday for maintenance. Entry to both the library and the museum is free for residents.

The library reopened last spring after a full renovation, and the pool is popular with families throughout the summer. Guided tours of the town leave from the harbour every hour, and every ticket includes a free map of the old quarter.`,
      questions: [
        { n: 1, type: "gap", group: "t1", note: "ONE WORD AND/OR A NUMBER",
          table: {
            title: "Greyfield Visitor Centre",
            headers: ["Facility", "Location", "Notes"],
            rows: [
              ["Library", "Main Street", "open until {{1}} p.m. on weekdays"],
              ["Swimming pool", "{{2}} Road", "closed on Mondays"],
            ],
          },
          answer: "9" },
        { n: 2, type: "gap", group: "t1", answer: "station" },
        { n: 3, type: "multiselect", group: "ms1",
          prompt: "Which TWO facilities are free for residents?",
          options: ["the library", "the swimming pool", "the gym", "the cinema", "the museum"],
          answer: "A" },
        { n: 4, type: "multiselect", group: "ms1", answer: "E" },
        { n: 5, type: "match", group: "m1", boxTitle: "Comments",
          box: ["popular with families", "recently renovated", "closing next year"],
          prompt: "the library", answer: "B" },
        { n: 6, type: "match", group: "m1", prompt: "the swimming pool", answer: "A" },
        { n: 7, type: "label", group: "l1", image: "/practice-img/sample-map.svg", letters: "ABCDE",
          prompt: "Information desk", answer: "C" },
        { n: 8, type: "label", group: "l1", prompt: "Café", answer: "E" },
        { n: 9, type: "gap", group: "n1", note: "ONE WORD ONLY",
          notes: {
            title: "Guided tours",
            lines: ["Tours leave from the {{9}} every hour.", "Each ticket includes a free {{10}}."],
          },
          answer: "harbour" },
        { n: 10, type: "gap", group: "n1", answer: ["map", "maps"] },
      ],
    },
  ],
};

export const TESTS = [
  MOCK1_LISTENING, MOCK1_READING, MOCK1_WRITING,
  SAMPLE_LISTENING, SAMPLE_READING, SAMPLE_WRITING, SAMPLE_TYPES,
];

export const testsForBook = (bookId) => TESTS.filter((t) => t.bookId === bookId);
export const getTest = (id) => TESTS.find((t) => t.id === id);
