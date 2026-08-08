// Smart LC Mock Test 2 — Academic Writing (2 tasks).
// Questions from the centre's writing collection (Day 2); the task-1
// visual is redrawn as a clean SVG from the same data.
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
      image: "/practice-img/writing/day2.svg",
      passage: "The graph below shows the numbers of three types of visitors to a museum between 1997 and 2012.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      questions: [
        { n: 1, type: "essay", prompt: "Write your report below.", minWords: 150 },
      ],
    },
    {
      title: "Writing Task 2",
      passageTitle: "Writing Task 2",
      instructions: "You should spend about 40 minutes on this task. Write at least 250 words.",
      passage: "The best way for a country to prepare for the future is to invest resources in its young people.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      questions: [
        { n: 2, type: "essay", prompt: "Write your essay below.", minWords: 250 },
      ],
    },
  ],
};
