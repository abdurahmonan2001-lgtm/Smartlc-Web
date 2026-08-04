// Smart LC Mock Test 1 — Academic Writing (2 tasks).
// Original material authored for Smart LC.
export const MOCK1_WRITING = {
  id: "mock1-writing",
  bookId: "mock1",
  title: "Mock Test 1 — Writing",
  module: "writing",
  durationMin: 60,
  sections: [
    {
      title: "Writing Task 1",
      passageTitle: "Writing Task 1",
      instructions: "You should spend about 20 minutes on this task. Write at least 150 words.",
      image: "/practice-img/mock1-task1.svg",
      passage: "The chart below shows the number of weekly visits to Northfield Public Library made by four different age groups in 2010 and 2020.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      questions: [
        { n: 1, type: "essay", prompt: "Write your report below.", minWords: 150 },
      ],
    },
    {
      title: "Writing Task 2",
      passageTitle: "Writing Task 2",
      instructions: "You should spend about 40 minutes on this task. Write at least 250 words.",
      passage: "In many countries, young people leave their home town after finishing school and move to larger cities to study or work.\n\nDo the advantages of this development outweigh the disadvantages?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      questions: [
        { n: 2, type: "essay", prompt: "Write your essay below.", minWords: 250 },
      ],
    },
  ],
};
