// Smart LC Mock Test 2 — Academic Writing (2 tasks).
// Original material authored for Smart LC.
export const MOCK2_WRITING = {
  id: "mock2-writing",
  bookId: "mock2",
  title: "Mock Test 2 — Writing",
  module: "writing",
  durationMin: 60,
  sections: [
    {
      title: "Writing Task 1",
      passageTitle: "Writing Task 1",
      instructions: "You should spend about 20 minutes on this task. Write at least 150 words.",
      image: "/practice-img/mock2-task1.svg",
      passage: "The graph below shows the percentage of households with internet access in three countries between 2005 and 2025.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      questions: [
        { n: 1, type: "essay", prompt: "Write your report below.", minWords: 150 },
      ],
    },
    {
      title: "Writing Task 2",
      passageTitle: "Writing Task 2",
      instructions: "You should spend about 40 minutes on this task. Write at least 250 words.",
      passage: "Some people believe that practical life skills, such as cooking and managing money, should be taught at school. Others believe that these skills are the responsibility of the family.\n\nDiscuss both these views and give your own opinion.\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      questions: [
        { n: 2, type: "essay", prompt: "Write your essay below.", minWords: 250 },
      ],
    },
  ],
};
