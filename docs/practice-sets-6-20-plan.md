# Practice Sets 6–20 — topic allocation

Fills the IELTS-level schedule to lesson 40. Sets 1–5 cover lessons 1–10
(one paper per lesson, listening on odd, reading on even); sets 6–20 carry
lessons 11–40 on the same alternation.

Every topic below is checked against the 93 reading passages and 20
listening scenarios already in the catalogue (mocks 1–12, practice sets
1–5, Pre-IELTS sets 1–14). Nothing here repeats one of those.

## Shape of each paper

Fixed by `docs/ielts-test-blueprint.md`; repeated here so a set can be
written without re-deriving it.

**Reading** — passages run **800–1000 words**, rising gently from Passage 1
(~850–920) to Passage 3 (~880–1000), which is what the blueprint measured
in Cambridge 20. Sets 6–20 were first written against a tighter 800–900
ceiling, so their passages are flat at ~880 and several agents had to cut
examples and argument steps to fit; anything written from now on should use
the full band and let Passage 3 be the longest.

P1 factual history (completion + TFNG);
P2 discursive with lettered paragraphs (matching information + summary +
people matching, one extra name); P3 argumentative science (MCQ-4 + YNNG +
sentence endings). Every question carries `answer`, `explain` and a
verbatim `evidence` quote; paraphrase pairs go in `vocab`.

**Listening** — S1 transactional phone call, two speakers; S2 monologue of
local information; S3 two named students on a project; S4 academic lecture
("the history of …"). 10 questions per section.

## Reading topics

| Set | P1 — history of a thing | P2 — the city now | P3 — how people think |
|-----|-------------------------|-------------------|-----------------------|
| 6  | The zip fastener            | Roofs that grow           | Why we misjudge risk |
| 7  | Concrete, old and new       | Streets without cars      | The crowd that does nothing |
| 8  | Barbed wire                 | Bringing back buried rivers | What sleep does with the day |
| 9  | The pencil                  | The repair café           | The cost of an interruption |
| 10 | The mirror                  | Power owned by the street | What we expect, and what we feel |
| 11 | The wheelbarrow             | Warmth from one boiler    | Why music moves us |
| 12 | The candle                  | Soil under the pavement   | Too many decisions |
| 13 | The lock and key            | Room for the bicycle      | The uses of looking back |
| 14 | The button                  | Food that misses the bin  | Reading other people |
| 15 | The nail                    | Towers built of timber    | The itch to know |
| 16 | Playing cards               | The fox on the ring road  | Why an hour is never an hour |
| 17 | The screw                   | Clothes that come round again | Hiding in the group |
| 18 | The sewing machine          | The drinking fountain returns | Sure, and wrong |
| 19 | The chimney                 | The high street rewritten | The feeling of something vast |
| 20 | The plough                  | Light after dark          | Teaching as learning |

## Listening scenarios

| Set | S1 — booking / enquiry | S2 — local information | S3 — two students | S4 — lecture |
|-----|------------------------|------------------------|-------------------|--------------|
| 6  | Registering at a health centre   | A new cycle-hire scheme          | Nodira & Timur — a bird survey        | the history of fireworks |
| 7  | Booking a removal van            | Museum late-opening programme     | Anvar & Malika — a soil study         | the history of tea |
| 8  | Enrolling on an evening course   | Community allotment rules         | Dilshod & Sabina — a traffic count    | the history of salt |
| 9  | Hiring a hall for a party        | A river footpath project          | Rustam & Nigora — a sleep diary       | the history of bread |
| 10 | Joining a sports centre          | Recycling collection changes      | Bekzod & Feruza — a plant experiment  | the history of cheese |
| 11 | Booking a dental hygienist       | A town's new market hall          | Otabek & Zarina — a noise survey      | the history of perfume |
| 12 | Ordering a repair visit          | Local bus-on-demand service       | Javlon & Madina — a memory test       | the history of purple dye |
| 13 | Booking a campsite pitch         | A heritage-trail launch           | Sherzod & Gulnora — a river survey    | the history of clocks |
| 14 | Reporting a lost item            | Volunteer lifeguard scheme        | Umid & Sevara — a food-waste audit    | the history of rubber |
| 15 | Booking a driving course         | Library makerspace opening        | Farrukh & Nilufar — a wind study      | the history of glass |
| 16 | Arranging a house clean          | Winter street-market plans        | Sanjar & Dildora — a shadow study     | the history of wool |
| 17 | Joining a choir                  | New footbridge consultation       | Aziz & Shahnoza — a survey of queues  | the history of pepper |
| 18 | Booking a photography studio     | Park wildlife-pond project        | Bakhtiyor & Kamola — a light study    | the history of the calendar |
| 19 | Enquiring about a language exchange | Neighbourhood energy advice     | Doniyor & Zebo — a rainfall record    | the history of the violin |
| 20 | Booking a coach trip             | A new swimming lake               | Islom & Sitora — a bee count          | the history of the map projection |

## Names

Uzbek first names throughout, matching sets 1–5, with no name reused
within a set. Surnames are avoided in listening, as in the existing
papers.

## Status

- [x] Plan agreed
- [ ] Set 6 … 20 authored, audited, wired
- [ ] Recordings generated (`scripts/generate-psetN-audio.ps1` →
      `scripts/generate-neural-audio.mjs psetN`)
- [ ] `PSETS` in `src/practice/access.js` and `SETS` in the Student App's
      `PracticeCard.jsx` raised from 5 to 20 — do this only as content
      lands, or the schedule will point at papers that do not exist.
