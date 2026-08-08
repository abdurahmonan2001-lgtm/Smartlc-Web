# IELTS Academic Test Blueprint — Smart LC authoring spec

Compiled 2026-08-08 from a structural analysis of:
- Cambridge IELTS 20 on disk (4 complete tests, machine-readable — 74
  classified question groups, passage word counts, complexity metrics);
- **Cambridge 15, 16, 17, 18, 19, 21 via engnovate.com (23 more tests,
  listening + reading group structure per test)** — so the sample spans
  the whole post-2020 standardized format: 7 books, 27 tests;
- Cambridge 9/11–17 disk editions (passage conventions), Mock volumes
  (writing tasks, answer keys, Vol 1 transcripts — NOTE these transcripts
  are pre-2020 format: "Section" naming + worked example).
Only STRUCTURE was analyzed and retained — no test content was copied,
and none may be.

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
Completion in 27 of 27 sampled tests (notes ~16, table ~6, form ~4, one
form+table split), word limit `ONE WORD AND/OR A NUMBER` in all but ~3.
**Post-2020 format (Cambridge 16 onward): sections are called "Parts" and
the old worked Example before Q1 is GONE** — the Vol 1 mock transcripts
("Section 1" + example) follow the pre-2020 format and should not be
copied on this point. Content staples: names spelled letter-by-letter,
phone numbers, prices/deposits, dates, addresses, times.

**Part 2 — one speaker, everyday monologue (tour guide, event organizer,
council rep).** 2–3 groups built from: MCQ 3-option (~20/27 tests),
multi-select pairs (~13), matching-box (~10), **map/plan labelling
(7/27 tests ≈ every 4th test — a must-support type)**, rare table
completion. Canonical combos: MCQ+map, MCQ+matching-box,
multi-select×2+matching-box.

**Part 3 — academic discussion, 2–4 speakers (students ± tutor).**
2–3 groups. Multi-select pairs appear in ~17/27 tests (their heartland),
plus MCQ 3-option runs, matching-box (opinions → speakers/topics), and a
newer variant: **flow-chart completion from a lettered box** (3
occurrences, Cam 16/19/21). Rarely a completion group instead (1 test).
Hardest listening discrimination: opinion, agreement, stance.

**Part 4 — academic lecture, one speaker, no mid-part pause.**
A single **note-completion group of 10, word limit ONE WORD ONLY, in 27
of 27 sampled tests** — the strongest invariant in the whole exam.
Notes are hierarchical (headed sections, bullet lines).

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

**Type inventory measured across the 12 C20 passages (groups):**
completion (notes/sentences/summary) 11 · TFNG 5 · matching (features/
people) 4 · matching-information 4 · multi-select pairs 4 · MCQ-4 3 ·
matching-sentence-endings 2 · YNNG 1 · summary-wordlist 1 ·
matching-headings 1.

**Seven-book confirmation (Cambridge 15–21, 27 tests, via engnovate):**
- Passage 1 = completion + TFNG in ~85% of tests; rare deviations swap in
  matching-information (15 T2, 18 T3) or add diagram labelling /
  short-answer (16 T4 — the only occurrences in the sample).
- Passage 2 = matching-information (~17/27) + completion + features/
  two-letter picks; matching-headings only 3/27. Books 16 and 18
  occasionally push MCQ-4 or YNNG into passage 2 — variance to imitate
  sparingly.
- Passage 3 = MCQ-4 in ~24/27 and YNNG in ~17/27; summary-from-wordlist
  ~12/27; matching-sentence-endings ~5/27. TFNG appears in passage 3 in a
  minority of tests (F/NG then replaces Y/NG).
- Reading word limits post-2020 trend strongly to `ONE WORD ONLY`, with
  occasional `NO MORE THAN TWO WORDS AND/OR A NUMBER` (books 15/18).

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
6. ~~Example item for listening part 1~~ — NOT needed: the post-2020
   format dropped the worked example (verified in Cam 16+). Also add
   **map/plan image labelling** (7/27 tests) and **flow-chart-from-box**.
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
   **P1/P4 notes rule (Abdurahmon, 2026-08-08): every main idea of the
   recording appears as a bullet — gapped OR plain-information — so the
   notes mirror the whole talk, grouped under bold sub-headings. The
   plain bullets anchor the listener between gaps; never write notes
   that are only a list of the questions.**
2. Keep audio-per-answer at 75–95 words; answers strictly in order.
3. Hold reading vocabulary CONSTANT across passages (~16% long words) and
   ascend via abstraction + question type, not word rarity.
4. Grade paraphrase distance within every group (first questions near,
   last questions far).
5. Respect the F/NG and mentioned/agreed trap grammars — they are the
   exam's core discriminators.
6. Target the 40/35/25 easy/mid/hard mix so our raw scores map honestly
   onto the official band tables.

---

# Part III — Reverse-engineered construction rules & solving keys

Measured on the answer keys of 19 complete retired IELTS tests (Vol 3
spreadsheets: 10 listening + 9 reading, 760+ keyed answers), plus the
transcript/passage analyses of Parts I–II. These are the regularities the
test-makers evidently follow — and the solving shortcuts each one implies.

## 12. Answer-key statistics (real retired tests)

**TRUE/FALSE/NOT GIVEN & YES/NO/NOT GIVEN (109 items, 9 reading tests):**
- TRUE 39% · FALSE 39% · NOT GIVEN 22% — T and F are engineered to balance;
  NG is deliberately rarer (~1 in 5, i.e. 1–2 per group of 6).
- **Longest run of identical answers: 2. Zero runs of three anywhere in
  nine tests.** This is the strongest construction rule found.
- Solving keys: expect roughly equal T/F with fewer NG; if you have three
  identical answers in a row, one is wrong; a group with zero NG or three
  NGs deserves a second look.

**Multiple choice / matching letters:**
- Listening 3-option MCQ: A 29% / B 28% / C 26% — statistically flat.
  Reading letters A–D: 17–22% each, flat. No lucky letter exists; "when
  unsure pick B" is superstition. Guessing gains nothing over randomness,
  so blanks should be guessed but never left empty (no negative marking).
- Matching boxes: every option letter distribution is near-uniform, and
  headings (roman numerals) spread evenly — the unused distractor headings
  carry no positional pattern.

**Completion answers (306 items):**
- Listening: 78% ONE word; 13% contain digits (prices "5.60", "21.50",
  dates, quantities); 7% capitalised proper nouns (months, countries);
  19% of one-word answers are plurals.
- Reading: 67% one word, 31% two words, digits rarer (7%).
- Overwhelmingly **concrete nouns** (campsite, passport, gardens, wall);
  occasional adjectives (safe, long); verbs rare.
- **Answers virtually never repeat within a test** (5 repeats in 306 —
  and none within the same reading test). If you've written the same word
  twice, one is probably wrong.
- Solving keys: the gap's grammar predicts the answer's class (article or
  adjective before the gap → noun; "to ___" → verb; number slot signalled
  by units); plural agreement with the verb is a free check; in listening,
  expect at least one price/number and one spelled proper noun in Part 1.

## 13. How the questions appear to be built (inferred process)

Working backwards from the artefacts, each group behaves as if written so:
1. Pick the answer WORDS first — content nouns spread evenly through the
   text (one per ~80 words of audio; one per paragraph zone in reading),
   never the same word twice.
2. Write the stem by PARAPHRASING the sentence around the kept answer word
   — the answer itself stays verbatim, everything around it is re-worded
   (synonyms for verbs/adjectives, re-ordered clauses). Paraphrase distance
   is dialled up with question number (§10).
3. Build distractors from material ACTUALLY PRESENT: the corrected first
   version (P1), the option another speaker rejects (P3), the time-shifted
   or scope-shifted fact (yesterday/usually/only-today; all/some/most).
   Every MCQ option is anchored to something said or written — nothing is
   invented — which is why "I heard that word" is the trap, and why the
   correct option is usually the PARAPHRASED one while wrong options tend
   to echo the source wording.
4. For TFNG: TRUE items paraphrase a stated fact; FALSE items contradict a
   stated fact head-on (usually by flipping a quantity, time, or scope
   word); NOT GIVEN items add a plausible detail the text never addresses
   (comparisons and reasons are favourites: "X was the first/best/cheaper
   than Y" where the text ranks nothing).
5. Balance the key (T/F counts, letter spread, no 3-runs) as a final pass.

## 14. The practical "ease keys" (what to teach students)

1. Answers come in order (except matching-information) — never search the
   whole text for the next answer; search FORWARD of the last one.
2. Anchor on what cannot be paraphrased: names, numbers, dates, places in
   the stem locate the answer zone; the words AROUND the gap will not
   appear in the text — their synonyms will.
3. In MCQ, distrust the option that repeats the text's exact words; trust
   the one that says the same thing differently.
4. FALSE/NO needs a contradiction you can point at; if you're merely not
   sure, that's what NOT GIVEN is for — and NG appears only ~1 in 5 times.
5. Word-limit discipline: "ONE WORD" answers are single concrete nouns —
   if your candidate answer is a phrase, you've grabbed the wrong slot.
6. Check the key's own grammar: article agreement, plural-verb agreement,
   and the no-repeats rule are free error detectors.
7. Never leave blanks — the letter distribution is flat, and there is no
   penalty.

**Authoring implication for Smart LC tests:** apply the same quotas —
T/F/NG ≈ 40/40/20 with no 3-runs, flat letter spread, unique concrete-noun
answers, distractors built only from in-text material, correct options
paraphrased while distractors echo the source. Part I §5's wording bank +
Part II §11's ascension rules + these quotas together fully specify a test.

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
