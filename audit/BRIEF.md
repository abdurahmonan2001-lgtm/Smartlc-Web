# Practice paper review: the brief

SMART Learning Center (Tashkent) runs an IELTS practice website. Its papers are
original, written for SMART, in `src/practice/`:

- `mock1`–`mock12` (`-listening.js`, `-reading.js`; mock1/mock2 also `-writing.js`):
  full IELTS mock tests for the IELTS levels. Their explanations, evidence
  quotes and paraphrase pairs live in `src/practice/mock-explanations.json`
  (`{ paperId: { questionNumber: { explain, evidence, vocab } } }`), not in the
  paper files.
- `pset1`–`pset20`: IELTS practice sets (IELTS Foundation/Proficiency levels).
- `upset1`–`upset14`: "Pre-IELTS" sets sat by Upper-Intermediate (B2) students,
  taken in thirds. They should be IELTS format at a slightly gentler level.

Listening audio scripts are in `src/practice/transcripts.json`
(`{ paperId: [ part1Lines, part2Lines, ... ] }`, each line `{ s: speaker, t: text }`).
The schema of a paper is described at the top of `src/practice/content.js`.
Each question has `n`, `type`, `prompt`, `options`, `answer`, and in the
pset/upset files also `explain`, `evidence` (the line that gives the answer) and
sometimes `vocab`.

The owner asked for two things. Do both for every paper in your slice.

## 1. Are these papers at real IELTS level?

Read every passage, script and question. Judge against the real test
(Cambridge IELTS Academic):

**Reading**: 3 passages of roughly 750–950 words each, academic register for a
non-specialist reader (journal/magazine/textbook style), difficulty rising from
passage 1 to 3, C1-level vocabulary and sentence structure in passages 2–3.
Questions: the IELTS types (T/F/NG, Y/N/NG, matching headings/information/
features, sentence/summary/table/note completion, MCQ). Completion and T/F/NG
answers follow passage order. Keys are paraphrased, not copied. NOT GIVEN must
genuinely be unaddressed (not contradicted). FALSE must be contradicted. Each
question has exactly one defensible answer. Completion answers are copied
words from the passage and respect the word limit in `note`.

**Listening**: Part 1 an everyday conversation (form/note completion: names
spelled out, numbers, dates); Part 2 a monologue in a social setting (MCQ,
map/plan labelling, matching); Part 3 an academic discussion of 2–4 speakers
(MCQ, matching); Part 4 an academic lecture (note completion). Scripts long
enough for the real timing (very roughly 600–1,000 words a part). Real
distractors: a speaker corrects themselves, a wrong option is mentioned
before the right one, the answer is heard but paraphrased. Answers appear in
question order in the script. Gap answers are exactly as heard, spelled
correctly, inside the word limit.

**Writing** (mock1/mock2 only): Task 1 an Academic visual (chart/table/map/
process), 150 words; Task 2 an essay prompt, 250 words; prompts as IELTS
phrases them.

**Pre-IELTS (`upset`)**: same format, but aimed at B2 learners: should feel a
little gentler than the psets/mocks, never trivial, never above IELTS.

## 2. Paraphrase pairs for every question

The owner: "take vocabulary from questions (both listening and reading) and ask
students to find the rephrasing in the audio script and text. This will greatly
help students learn paraphrase." The site will show the question's words and
ask the student to find the matching words in the script/passage. For that,
every question needs one pair:

`vocab: [inText, inQuestion]`

- `inText`: a short phrase (1–8 words) copied **exactly** from the passage or
  from the script of that part: the words that mean the same as the question's
  wording and lead to the answer.
- `inQuestion`: the phrase copied **exactly** from what the student reads for
  that question (its prompt, an option, its note, or the part's table/notes
  where the gap sits) that `inText` paraphrases.
- They must say the same thing in different words. Not identical words. Not a
  synonym you invented: both sides are copied from the paper.
- Choose the pair that teaches the most: the paraphrase a student would need
  to spot to get the question right.
- If a question has no real paraphrase (e.g. a spelled-out name in Part 1, or a
  number read out), leave `vocab` off. Aim for well over 80% coverage.
- Existing pairs: keep the good ones, fix broken ones (reversed sides, phrases
  not actually in the text or question, invented synonyms).

Where to write them:
- pset/upset: set `vocab` on the question object in the paper file.
- mocks: do NOT edit `mock-explanations.json` (other reviewers share it).
  Write your mock changes to `audit/mock-vocab-<your slice name>.json` as
  `{ "mock3-reading": { "14": { "vocab": ["…", "…"] } } }` (you may also put
  corrected `explain`/`evidence` there). They are merged later.

Check your work with the checker, until it reports no problems for your papers:

    node scripts/check-paraphrases.mjs pset3

(the argument is a prefix: `mock1` also matches mock10–12, so read only your lines.)

## What to change and what to report

Fix directly in the files, when you are sure:
- a wrong or ambiguous answer key, or a question with two defensible answers
  (fix the question or the key, keep the question number and type);
- an answer breaking its word limit, a misspelling, an answer not in the text;
- a T/F/NG that is really FALSE/NG the other way;
- an `evidence` or `explain` that is wrong;
- typos or broken English in passages, scripts or questions.
Keep the papers' structure, numbering and ids. Never change `transcripts.json`
timing or audio-related fields (`audio-cues.json`): the audio is already
recorded from the scripts, so do NOT change script wording at all, only
report script problems. Passages (reading) you may correct for typos only.

Report, do not rewrite: a passage that is too short or too easy, a part that
is too easy/hard, missing distractors, a question type mix that is off. Give
concrete suggestions.

Write one report per paper: `audit/<paperId>.json`:

```json
{
  "id": "pset3-reading",
  "verdict": "at IELTS level | slightly easier than IELTS | clearly below IELTS | harder than IELTS",
  "estimatedBandToScore30of40": "e.g. 6.5",
  "summary": "two or three sentences in plain English for the school owner",
  "strengths": ["…"],
  "issues": [
    { "q": 14, "severity": "high | medium | low", "problem": "…", "fixed": true, "change": "what you changed, or what you suggest" }
  ],
  "paraphrasePairs": { "before": 24, "after": 37 }
}
```

Rules: do not touch files outside your slice; do not commit, push or deploy;
do not run other tooling than node scripts. When done, reply with a short
summary: per paper the verdict, number of fixes made, and anything serious.
