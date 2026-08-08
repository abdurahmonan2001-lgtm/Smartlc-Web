// Smart LC Mock Test 1 — Academic Writing (2 tasks).
// Questions from the centre's writing collection (Day 1); the task-1
// visual is redrawn as a clean SVG from the same data.
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
      image: "/practice-img/writing/day1.svg",
      passage: "The graph below shows the percentage of people by age group visiting the cinema at least once a month between 1978 and 2008.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      questions: [
        { n: 1, type: "essay", prompt: "Write your report below.", minWords: 150 },
      ],
    },
    {
      title: "Writing Task 2",
      passageTitle: "Writing Task 2",
      instructions: "You should spend about 40 minutes on this task. Write at least 250 words.",
      passage: "Many employees can now do their work from home using modern technology. However, this change may only benefit workers, not the employers.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
      questions: [
        { n: 2, type: "essay", prompt: "Write your essay below.", minWords: 250 },
      ],
    },
  ],
};
