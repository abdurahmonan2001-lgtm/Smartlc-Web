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

---

# Part II — Difficulty ascension & skills tested

Measured on the Vol 1 transcripts (Tests 1–3, per part) and the 12
Cambridge-20 passages. Numbers are averages.

## 8. The two modules ascend along DIFFERENT axes

**Listening — vocabulary rises, syntax alternates by genre:**

| Part | words | sent. len | %words ≥8 letters | corrections | hedges | academic connectors |
|---|---|---|---|---|---|---|
| 1 | 938 | 11.4 | 8.0 | 2.3 | 2.7 | 0.0 |
| 2 | 749 | 16.4 | 10.3 | 0.7 | 1.3 | 1.7 |
| 3 | 802 | 12.1 | 13.4 | 1.7 | 5.3 | 0.3 |
| 4 | 803 | 17.6 | 15.2 | 0.3 | 0.7 | 3.0 |

- Long-word share nearly DOUBLES from part 1 to part 4 (8% → 15.2%) —
  the lexical ramp is monotonic.
- Sentence length is NOT monotonic: dialogues (P1, P3) run short turns
  (~11–12 words), monologues (P2, P4) long planned sentences (~16–18).
  Difficulty in P3 is not syntax — it's speaker interaction.
- **Trap signatures move by part:** corrections/self-repairs cluster in P1
  (2.3 per script: "…actually", "no wait", plus letter-by-letter spelling
  and "double T" moments); hedged opinion language peaks sharply in P3
  (5.3 hedges vs ≤2.7 elsewhere); P4 has almost no traps — its difficulty
  is pure density (academic connectors 3.0, the highest, with zero rescue
  repetition).
- Audio-per-answer is constant: ~75–94 words of audio per question in every
  part. The exam never speeds up; it deepens.

**Reading — vocabulary stays FLAT, abstraction and question type rise:**

| Passage | words | sent. len | %words ≥8 letters | lexical density | connectors |
|---|---|---|---|---|---|
| 1 | 897 | 18.9 | 16.4 | 60.4 | 3.8 |
| 2 | 895 | 19.2 | 16.0 | 57.3 | 2.8 |
| 3 | 963 | 20.4 | 16.5 | 56.0 | 4.8 |

- Long-word share is ~16% in ALL three passages — passage 3 is NOT harder
  vocabulary. Sentence length creeps up (18.9 → 20.4) and length grows
  (+70 words), but the real ascension is elsewhere:
- Lexical density FALLS (60.4 → 56.0) while connectors rise: passage 1 is
  fact-packed but transparent; passage 3 spends more words on argument
  scaffolding (stance, concession, hedging). Difficulty = abstraction +
  argument structure + paraphrase distance, delivered through the question
  types (literal completion/TFNG → matching/synthesis → inference/MCQ-4/
  YNNG), not through rarer words.

## 9. What each question type actually tests

**Listening**
- Form/table/notes completion (P1): catching predicted specifics in real
  time + orthographic accuracy (spelling read out letter-by-letter, numbers,
  prices, dates) + surviving the correction trap. Skill: prediction from
  the form's gaps, then verification.
- MCQ 3-option (P2/P3): real-time paraphrase matching while REJECTING two
  spoken distractors — every option is mentioned; only one survives the
  correction/negation/time-shift.
- Matching-box (P2/P3): holding 6–8 options in working memory while
  tracking WHICH speaker/item each comment attaches to.
- Multi-select pairs (P3): discriminating "mentioned" from "agreed/decided"
  — the classic distractor is an option a speaker raises and the other
  rejects.
- Map/plan labelling (P2): spatial language processing (left/opposite/
  beyond/just past) mapped onto a diagram while audio continues.
- Lecture notes (P4): sustained attention across 5–6 minutes with no pause,
  tracking signposting ("turning now to…") through the densest vocabulary
  of the module.

**Reading**
- Completion (P1 dominant): scanning for specifics + word-form fit (the
  gap's grammar tells you the answer's part of speech) + word-limit
  discipline.
- TRUE/FALSE/NOT GIVEN: truth-conditional comparison. The core trap is
  scope words (all/only/most/first) and the F-vs-NG boundary: FALSE needs a
  contradiction IN the text; NOT GIVEN is plausible-but-absent. Follows
  passage order (an anchor for pacing).
- Matching-information: paragraph-level gist + synonym recognition; does
  NOT follow passage order — tests search strategy under time pressure
  ("NB you may use any letter more than once" removes elimination).
- Matching-headings: main-idea vs supporting-detail discrimination; wrong
  headings are usually true details that aren't the paragraph's POINT.
- Summary completion / wordlist: cohesion + grammatical-class awareness;
  the wordlist variant (P3) adds distractor words of the right topic but
  wrong class or wrong stance.
- MCQ 4-option (P3 only): closest-reading inference; distractors are
  near-paraphrases that fail on one modifier.
- YES/NO/NOT GIVEN (P3): separating the WRITER's claim from views the
  writer reports/attributes — argument-voice tracking.
- Sentence-endings/features matching: proposition-level synthesis across
  non-adjacent text.

**Writing**
- T1: data literacy — selection ("main features"), grouping, comparison
  language, ~4-paragraph report discipline, no opinion.
- T2: position management — thesis, concession, development with examples,
  cohesion at 250+ words in 40 minutes.

## 10. Within-part and within-group ascension rules

- Groups inside a part get harder: P1-style literal tasks precede
  inference tasks in the same passage; in listening the completion group
  precedes the choice group when both appear.
- Inside a group, answers come in text/audio order (except
  matching-information, deliberately unordered).
- Early questions in a group use nearer paraphrases; later ones are more
  distant (measurable in the mock keys' "where it is located" column: Q1's
  key sentence shares surface words with the question; Q13's shares almost
  none).
- Band discrimination by design: parts 1–2 / passage 1 + completion types
  separate bands 4–6; part 3–4 / passage 3 + YNNG/MCQ-4/wordlist separate
  bands 6.5–9. A 40-question set therefore needs ~40% easy-literal, ~35%
  mid (matching/synthesis), ~25% hard (inference/stance) to reproduce the
  official raw→band curve.
- Timing pressure is a designed skill: reading = 90 s/question flat
  (20 min/passage including transfer of answers); listening allows ~30–45 s
  of preview per group, which is itself the tested skill of prediction.

## 11. Authoring checklist for the ascension logic

1. Write each listening part to its trap profile (P1: 2–3 corrections +
   one spelling; P2: all-options-mentioned MCQ distractors; P3: hedged
   opinions and mentioned-vs-agreed; P4: zero traps, maximum density).
2. Keep audio-per-answer at 75–95 words; answers strictly in order.
3. Hold reading vocabulary CONSTANT across passages (~16% long words) and
   ascend via abstraction + question type, not word rarity.
4. Grade paraphrase distance within every group (first questions near,
   last questions far).
5. Respect the F/NG and mentioned/agreed trap grammars — they are the
   exam's core discriminators.
6. Target the 40/35/25 easy/mid/hard mix so our raw scores map honestly
   onto the official band tables.

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
