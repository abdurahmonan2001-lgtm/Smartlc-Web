# IELTS Academic Test Blueprint — Smart LC authoring spec

Compiled 2026-08-08 from a structural analysis of the materials on disk:
Cambridge IELTS 20 (4 complete tests, machine-readable — the primary sample:
16 listening parts, 12 reading passages, 74 classified question groups),
Cambridge 9/11–17 editions (reading-passage compilations used for passage
conventions), and the Mock volumes (Vol 1 full tests: writing tasks, answer
keys, and the four listening transcripts of Test 1). Only STRUCTURE was
analyzed and retained — no test content was copied, and none may be.

## 1. Overall architecture

| Module | Time | Questions | Structure |
|---|---|---|---|
| Listening | ~30 min + 10 min transfer (paper) / no transfer (computer) | 40 | 4 parts × 10 questions |
| Reading (Academic) | 60 min, no transfer time | 40 | 3 passages: Q1–13, Q14–26, Q27–40 |
| Writing | 60 min | 2 tasks | Task 1 (20 min, 150+ words), Task 2 (40 min, 250+ words) |

- Every question = 1 mark, no negative marking.
- Reading question split observed: passage 1 gets 13, passages 2–3 get 13/14
  (the 40 split as 13+13+14, boundaries always at 13 and 26).
- Question groups are contiguous runs of ONE type, sized 2–10 questions;
  a part/passage typically holds 2–3 groups (listening part 1 and 4 are
  usually a single 10-question group).

## 2. Listening — part-by-part pattern

**Part 1 — everyday transactional dialogue (2 speakers: caller + service).**
In ALL 4 sampled tests: a single completion group of 10 (form ×2, table ×2,
notes ×2 across the sample), word limit `ONE WORD AND/OR A NUMBER`.
Always contains the worked **Example** ("There is an example that has been
done for you. On this occasion only, the conversation relating to this will
be played first."). Content staples: names spelled letter-by-letter, phone
numbers, prices/deposits, dates, addresses, times.

**Part 2 — one speaker, everyday monologue (tour guide, event organizer,
council rep).** 2 groups. Observed combos: MCQ(6)+multi-select(2+2);
matching-box(6)+MCQ(4); MCQ(6)+map/plan labelling(4);
multi-select(2+2)+matching-box(6). This is where **map/plan labelling**
lives when it appears.

**Part 3 — academic discussion, 2–4 speakers (students ± tutor).**
2–3 groups. Observed: multi-select pairs (heavily favoured here: 7 of the
sample's 12 multi-select groups), MCQ 3-option, matching-box (opinions →
speakers/topics). Hardest listening discrimination: opinion, agreement,
stance.

**Part 4 — academic lecture, one speaker, no mid-part pause.**
In ALL 4 tests: a single **note-completion group of 10**, word limit
`ONE WORD ONLY`. Notes are hierarchical (headed sections, bullet lines).

**Audio script conventions (from the Vol 1 transcripts):**
- Opening announcement: "You will hear a number of different recordings…
  All the recordings will be played once only. The test is in four sections…"
- Per part: "You will hear [scenario]. First you have some time to look at
  questions X to Y. [pause] Now listen carefully and answer questions X to Y."
- Parts 1–3 pause mid-part between groups ("Before you hear the rest of the
  conversation, you have some time to look at questions…"); part 4 plays
  straight through.
- Answers arrive in question order; distractor-then-correction is standard
  ("Thursday — oh no, wait, that's the other group — Tuesday").
- End: "That is the end of the listening test. You now have ten minutes to
  transfer your answers."

## 3. Reading — passage-by-passage pattern

Passage lengths measured (C20): 815–1000 words each, gentle rise from
passage 1 (~850–920) to passage 3 (~880–1000). Total ~2,600–2,800 per test.
Rubric line before each: "You should spend about 20 minutes on Questions
X–Y, which are based on Reading Passage N below."

**Passage 1 — factual/descriptive (history of a thing, biography, process).
Easiest.** Pattern in ALL sampled tests: one completion group
(notes/sentences, `ONE WORD ONLY` or `ONE WORD AND/OR A NUMBER`) + one
TRUE/FALSE/NOT GIVEN group of 6–7. One test adds matching-headings.

**Passage 2 — discursive/journalistic (research findings, social trends).**
3 groups, the "matching zone": matching-information ("Which section
contains…", 3–5), matching features/people, summary completion
(`ONE WORD ONLY`), sentence completion, multi-select pairs.
Paragraphs are lettered A–G for the matching tasks.

**Passage 3 — dense academic argument (theory, cognition, abstract science).
Hardest.** 3 groups. The ONLY passage where 4-option MCQ appears (all 3
occurrences), plus YES/NO/NOT GIVEN (writer's claims), summary-from-wordlist
(letters A–J box), matching-sentence-endings, matching features.

**Type inventory measured across the 12 passages (groups):**
completion (notes/sentences/summary) 11 · TFNG 5 · matching (features/
people) 4 · matching-information 4 · multi-select pairs 4 · MCQ-4 3 ·
matching-sentence-endings 2 · YNNG 1 · summary-wordlist 1 ·
matching-headings 1.

## 4. Writing (from Mock Vol 1 + official format)

- **Task 1 (Academic):** "You should spend about 20 minutes on this task."
  → boxed italic prompt: "The [table/chart/graph/diagram] below shows…
  Summarise the information by selecting and reporting the main features,
  and make comparisons where relevant." → "Write at least 150 words."
  → the visual (table/bar/line/pie/process/map).
- **Task 2:** 40 minutes, 250+ words. Prompt formulas: "Discuss both these
  views and give your own opinion." / "To what extent do you agree or
  disagree?" / "What problems…? What solutions…?" + "Give reasons for your
  answer and include any relevant examples from your own knowledge or
  experience."

## 5. Standard instruction wording bank (verbatim conventions)

- TFNG: "Do the following statements agree with the information given in
  Reading Passage N? … TRUE if the statement agrees with the information /
  FALSE if the statement contradicts the information / NOT GIVEN if there
  is no information on this."
- YNNG: "…agree with the claims of the writer… YES / NO / NOT GIVEN if it
  is impossible to say what the writer thinks about this."
- MCQ: "Choose the correct letter, A, B or C." (listening) /
  "Choose the correct letter, A, B, C or D." (reading P3)
- Multi-select: "Choose TWO letters, A–E." (counts as 2 answers, any order)
- Matching-box: "Choose FIVE/SIX answers from the box and write the correct
  letter, A–G, next to Questions X–Y." (box may have MORE options than
  questions; letters may repeat only if stated)
- Matching-information: "Reading Passage N has seven paragraphs, A–G.
  Which paragraph contains the following information? … NB You may use any
  letter more than once."
- Completion: "Complete the [form/notes/table/sentences/summary/flow-chart]
  below. Write ONE WORD ONLY / ONE WORD AND/OR A NUMBER / NO MORE THAN TWO
  WORDS from the passage for each answer."
- Answer-sheet framing (paper): "…in boxes X–Y on your answer sheet."
  (computer-delivered drops the boxes phrasing — our player should too)

**Word-limit distribution measured:** listening completion = `ONE WORD
AND/OR A NUMBER` (parts 1–3) or `ONE WORD ONLY` (part 4); reading
completion = overwhelmingly `ONE WORD ONLY` in recent editions.

## 6. Keys, scoring, difficulty conventions

- Answer keys accept variants: "walk/walking", numbers as digits or words,
  case-insensitive; hyphenated dates ("19(th) June"). Misspelt answers are
  wrong; answers over the word limit are wrong.
- Raw→band (already in the app's BAND_TABLES): listening 39→9, 35→8, 30→7,
  23→6, 16→5; reading (Academic) 39→9, 35→8, 30→7, 23→6, 15→5.
- Difficulty ramps WITHIN each module (part 1 → 4, passage 1 → 3) and
  within groups (early questions easier).
- The Mock volumes' key format worth copying: a table of
  **No | Answer | "Where it is located"** — the passage/transcript excerpt
  with the answer highlighted. Ideal for a post-test review screen.

## 7. What this means for the Smart LC format

Player types already supported: `tfng, ynng, mcq, select, gap, essay`.
To author fully authentic tests the content schema needs:

1. **multi-select** ("Choose TWO letters") — checkbox pair scored as 2.
2. **matching-box** — shared option box (A–G) for a run of questions;
   dropdown per question in CD-IELTS style.
3. **matching-headings / matching-information / sentence-endings** — same
   dropdown mechanics with different framing (roman-numeral headings list).
4. **table/form/notes layouts** for completion groups (currently gaps are
   one sentence each; part 1 forms and part 4 notes need a rendered
   table/notes block with inline gaps — the Inspera player already renders
   inline gap inputs, so this is a layout concern, `layout: "table"|"notes"`
   with rows).
5. **Group-level rubric objects** (instruction text + optional box/word
   list + optional image for maps/diagrams) instead of per-question notes.
6. **Example item** support for listening part 1 (shown, not scored).
7. **Answer variants** per key: `answer: ["colour", "color"]` + word-limit
   enforcement at scoring time.
8. **Review key** fields for the location-justified answer table.

Suggested authoring recipe per original Smart LC test:
- Listening: P1 form/table 10×(word+number) with example; P2 monologue
  MCQ+matching or labelling; P3 discussion MCQ+multi-select; P4 lecture
  notes 10×one-word. Two voices minimum (TTS: distinct voices per speaker),
  once-only playback, scripted announcer lines from §2.
- Reading: P1 factual + completion/TFNG; P2 lettered paragraphs +
  matching-information/summary; P3 argumentative + MCQ-4/YNNG/wordlist.
  Target 850/900/950 words.
- Writing: T1 data visual (SVG, as in Mock 1) + T2 opinion/discussion
  formula prompt.
