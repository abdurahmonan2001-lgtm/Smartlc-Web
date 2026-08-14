// Smart LC Practice Set 20 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET20_READING = {
  id: "pset20-reading",
  bookId: "pset20",
  title: "Practice Set 20 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The plough",
      passage: `Few tools have altered the surface of the earth as thoroughly as the plough. Before it existed, crops were planted in ground opened by hand, with a digging stick or a hoe, and the area a family could cultivate was limited by the strength of its arms. The plough changed that arithmetic. By handing the work of breaking soil to animals, it allowed one household to grow food for several others, and the surplus it produced is what made towns, trades and eventually writing possible. Almost every civilisation that left records behind it was a ploughing civilisation.

The earliest ploughs were scarcely more than a digging stick dragged through the ground. Known as the ard, this implement appeared in Mesopotamia by about 4000 BC and consisted of a wooden beam pulled by a pair of oxen, with a pointed share angled down into the earth. The ard did not turn the soil over; it merely scratched a shallow furrow, and fields were usually worked twice, the second pass at right angles to the first, so that the ground was broken evenly. In the dry, light soils of the Near East and the Mediterranean this was exactly what was wanted, since deep turning would have released moisture the crop could not spare. Mesopotamian farmers even fitted a funnel behind the share so that seed dropped straight into the furrow as it opened, a device that Europe would forget entirely and then reinvent three thousand years later.

Northern Europe posed a different problem. Its soils were heavy wet clays, matted with roots, and a scratch plough simply rode over the top of them. The answer, assembled piece by piece during and after the Roman period, was the heavy mouldboard plough. Three parts did the work: a knife-like coulter that cut a vertical slit ahead of the share, the share itself, which sliced a slab of earth away horizontally, and behind them a curved wooden mouldboard that lifted the slab and rolled it over. Turning the soil buried weeds, let air into the ground and left a ridged surface that drained. Because such a plough was heavy it was often carried on wheels, and because dragging it through clay demanded enormous effort it needed a team of six or eight oxen, far more than a single peasant household could own.

That requirement reorganised village life. Neighbours pooled their animals and took turns, and since a team of eight was awkward to turn, fields were laid out as long narrow strips, ploughed up one side and down the other. The open-field system of medieval Europe, with its scattered strips and its shared beasts, was in large part a consequence of the machine. Ploughing grew quicker after the ninth century, when the padded horse collar reached Europe from Asia. Unlike the throat harness it replaced, the collar pressed on a horse's shoulders rather than its windpipe, and a horse in a collar could pull steadily for longer than an ox, though it ate more and cost more to keep.

For several centuries after that the design stood still. The revival began in the Low Countries, where Dutch farmers were using a mouldboard with a smooth twisting curve that turned the furrow with far less resistance. English landowners copied it, and in 1730 Joseph Foljambe patented the Rotherham plough, a light two-horse implement whose curve was calculated rather than whittled by eye. Iron slowly replaced wood at the cutting surfaces, and in 1819 the American Jethro Wood patented a plough cast in three separate iron pieces, so that a farmer could replace a worn part instead of buying a whole new plough.

Cast iron then met its match on the prairies. The deep black soil of the American Midwest clung to an iron mouldboard in sticky lumps, and ploughmen had to stop every few paces to scrape it clean. In 1837 a blacksmith in Illinois, John Deere, shaped a mouldboard from a discarded steel saw blade. Polished steel proved slippery enough for the earth to slide off it as the plough moved, and this self-scouring design opened the grasslands to grain.

Power changed next. Steam engines proved too heavy to drive across a field, since they sank into the soil they were meant to work, so from the 1850s pairs of them stood at opposite edges of a field and hauled a plough to and fro between them on a steel cable. The arrangement was expensive and awkward, and it disappeared as soon as the internal-combustion tractor arrived. A tractor could carry the plough on its own frame, and by the middle of the twentieth century one driver was turning in a day what a medieval village had turned in a season.

Only then did the doubts arrive. A ploughed field is bare soil, and bare soil blows and washes away; the dust storms that stripped the American plains in the 1930s were the visible bill for a century of enthusiastic turning. Ploughing also breaks the fungal threads and burrows that hold soil together, and it releases carbon the ground had been quietly storing. Many farmers now practise minimum tillage, or drill their seed directly into the stubble of the previous crop, disturbing the surface hardly at all. The plough is not finished, but after ten thousand years it is no longer taken for granted.`,
      questions: [
        { n: 1, type: "gap", prompt: "The ard cut only a shallow ______ instead of turning the earth over.", note: "ONE WORD ONLY", answer: "furrow",
          explain: "The passage says the ard 'merely scratched a shallow furrow'. The question keeps 'shallow', so the missing noun is the one that follows it in the text.",
          evidence: "it merely scratched a shallow furrow",
          vocab: ["scratched", "cut"] },
        { n: 2, type: "gap", prompt: "Farmers in Mesopotamia attached a ______ behind the share so that seed fell straight into the ground.", note: "ONE WORD ONLY", answer: "funnel",
          explain: "The text describes how they 'fitted a funnel behind the share' so seed dropped into the furrow as it opened. 'Fitted' is paraphrased as 'attached'.",
          evidence: "fitted a funnel behind the share",
          vocab: ["fitted", "attached"] },
        { n: 3, type: "gap", prompt: "On the heavy plough, the ______ made a vertical cut in front of the share.", note: "ONE WORD ONLY", answer: "coulter",
          explain: "The three parts are listed in order, and the one that 'cut a vertical slit ahead of the share' is the coulter. 'Ahead of' becomes 'in front of' in the question.",
          evidence: "a knife-like coulter that cut a vertical slit ahead of the share",
          vocab: ["ahead of", "in front of"] },
        { n: 4, type: "gap", prompt: "The padded collar bore on a horse's shoulders rather than on its ______.", note: "ONE WORD ONLY", answer: "windpipe",
          explain: "The collar 'pressed on a horse's shoulders rather than its windpipe' — the question repeats the contrast and asks for the second noun. 'Pressed' is paraphrased as 'bore'.",
          evidence: "the collar pressed on a horse's shoulders rather than its windpipe",
          vocab: ["pressed on", "bore on"] },
        { n: 5, type: "gap", prompt: "In 1837 John Deere made a mouldboard from the blade of an old steel ______.", note: "ONE WORD ONLY", answer: "saw",
          explain: "Deere 'shaped a mouldboard from a discarded steel saw blade'. The question turns 'discarded' into 'old' and asks for the single word before 'blade'.",
          evidence: "shaped a mouldboard from a discarded steel saw blade",
          vocab: ["discarded", "old"] },
        { n: 6, type: "gap", prompt: "Steam ploughing used two engines that dragged the plough backwards and forwards on a steel ______.", note: "ONE WORD ONLY", answer: "cable",
          explain: "Pairs of steam engines 'hauled a plough to and fro between them on a steel cable'. 'To and fro' is paraphrased as 'backwards and forwards' and 'hauled' as 'dragged'.",
          evidence: "hauled a plough to and fro between them on a steel cable",
          vocab: ["to and fro", "backwards and forwards"] },
        { n: 7, type: "tfng", prompt: "The ard suited the soils of the region where it was first used.", answer: "TRUE",
          explain: "TRUE: in the dry, light soils of the Near East and the Mediterranean the ard's shallow work 'was exactly what was wanted', because deep turning would have dried the ground out.",
          evidence: "this was exactly what was wanted",
          vocab: ["exactly what was wanted", "suited"] },
        { n: 8, type: "tfng", prompt: "One ordinary family could usually supply the animals a heavy mouldboard plough required.", answer: "FALSE",
          explain: "FALSE: the heavy plough needed six or eight oxen, 'far more than a single peasant household could own' — the direct opposite of the statement.",
          evidence: "far more than a single peasant household could own",
          vocab: ["a single peasant household", "one ordinary family"] },
        { n: 9, type: "tfng", prompt: "Long narrow fields were adopted because large ox teams were hard to turn round.", answer: "TRUE",
          explain: "TRUE: 'since a team of eight was awkward to turn, fields were laid out as long narrow strips' — the passage gives exactly this reason, with 'awkward' for 'hard'.",
          evidence: "since a team of eight was awkward to turn, fields were laid out as long narrow strips",
          vocab: ["awkward to turn", "hard to turn round"] },
        { n: 10, type: "tfng", prompt: "Horses were less expensive to maintain than oxen.", answer: "FALSE",
          explain: "FALSE: the horse could work longer than an ox, 'though it ate more and cost more to keep' — so it was more expensive, not less.",
          evidence: "though it ate more and cost more to keep",
          vocab: ["cost more to keep", "less expensive to maintain"] },
        { n: 11, type: "tfng", prompt: "Foljambe's Rotherham plough was widely sold outside England.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage records the patent and describes the design, but says nothing at all about where the plough was sold. A famous invention is not automatically an exported one.",
          evidence: "in 1730 Joseph Foljambe patented the Rotherham plough" },
        { n: 12, type: "tfng", prompt: "Jethro Wood's plough allowed a damaged section to be renewed on its own.", answer: "TRUE",
          explain: "TRUE: the plough was cast in three separate pieces so that 'a farmer could replace a worn part instead of buying a whole new plough' — exactly the statement's meaning.",
          evidence: "a farmer could replace a worn part instead of buying a whole new plough",
          vocab: ["a worn part", "a damaged section"] },
        { n: 13, type: "tfng", prompt: "Steam engines were driven across the fields they ploughed.", answer: "FALSE",
          explain: "FALSE: steam engines 'proved too heavy to drive across a field' and sank into it, which is precisely why they stood at the edges and pulled the plough on a cable.",
          evidence: "Steam engines proved too heavy to drive across a field" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Light after dark",
      passage: `A — Ask anyone to picture a city at night and they will describe light: chains of orange along the roads, office towers left burning until dawn, and the pale dome that hangs above a town and can be seen from thirty kilometres away by a driver still out in the fields. Astronomers gave that dome a name half a century ago — sky glow — and it is the most visible symptom of what is now called light pollution. Satellite measurements suggest that the lit surface of the planet has been expanding by roughly two per cent a year, and that most people in Europe and North America now live under a sky in which the Milky Way cannot be made out at all. A generation is growing up that has never once looked up and found it.

B — Cities do not light themselves by accident. Artificial light stretches the trading day, guides traffic, makes shift work possible and answers a steady demand from residents who associate darkness with danger. What changed recently was the price. The switch from orange sodium lamps to light-emitting diodes cut the cost of a unit of light so sharply that many authorities, having replaced their lamps in order to save money, quietly put up more of them, or brighter ones, and finished the exercise spending much what they had spent before while producing far more light. Economists call this a rebound effect. It is the reason a technology sold as the cure for light pollution has, in a good many towns, made it measurably worse.

C — The safety argument is the one that decides budgets, and it is far less settled than most people assume. The lighting engineer Marta Kovacs points out that the eye judges a scene by contrast rather than by quantity. A powerful lamp beside a dark doorway can leave a pedestrian less able to see who is standing in it than a modest lamp whose light is spread evenly along the pavement, because a bright source narrows the pupil and throws everything around it into deeper shadow. What makes a street work, she argues, is even coverage and light falling on people's faces at head height, not raw output. Several cities, she notes, have spent very large sums making their streets brighter without making them any easier to read.

D — Then there is everything else that lives in a city. The ecologist Yusuf Demir has been counting insects around street lamps for a decade, and describes a single unshielded lamp as a trap that pulls night-flying insects out of the hedgerows around it and holds them circling there until they die of exhaustion. The losses matter well beyond the insects themselves, since the same insects feed bats and young birds. Light reaches plants too: Demir's team finds that trees standing within a few metres of a lamp keep their leaves several days later into the autumn than trees of the same species further along the road, a small shift in the seasonal clock whose consequences nobody has yet traced.

E — Human bodies also read light as a clock. Melatonin, the hormone that tells the body it is night, is suppressed by light entering the eye, and most strongly by the blue-rich white that modern lamps emit. The sleep researcher Elena Ruiz measured light levels in several hundred bedrooms and set them against her volunteers' sleep records: those whose windows faced a street lamp went to sleep later and slept for less time. Ruiz is careful about what this proves. The light crossing a bedroom is a tiny fraction of daylight, the effect on any one sleeper is small, and a heavy curtain deals with it — but a small effect spread across a whole city, she adds, is not the same as no effect at all.

F — Not everyone welcomes the campaign against the glare. The geographer Nils Aaberg has interviewed residents of towns that switched their lamps off after midnight to save money, and reports that the people who mind most are women, older residents and those walking home from night shifts, many of whom respond by simply not making the journey. A darkened street, he argues, is not equally free to everybody, and a policy that appears to cost nothing in fact moves a cost onto the people least able to refuse it. He is not defending the floodlit car park; his point is that the bill should be read carefully before anyone sends it.

G — The compromise now emerging is not less light but better-aimed light. The lighting designer Sofia Lindqvist builds her schemes on four rules. Fit every lamp with a shield, so that nothing is thrown upwards into the sky. Choose warmer lamps, with a colour temperature below three thousand kelvin, which are gentler on human eyes and far less attractive to insects. Turn the whole system down after midnight, when the streets are all but empty. And let sensors raise the level again wherever movement is detected, so that a person walking home carries a bubble of brightness along with them. Towns that have done all four report lower bills, fewer complaints from residents and, on clear nights, the slow return of a sky worth looking at.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "an explanation of how cheaper light led to more of it being used", answer: "B",
          explain: "Paragraph B describes the move to LEDs cutting the cost of light, after which authorities installed more and brighter lamps — the rebound effect. That is the cheaper-then-more sequence.",
          evidence: "cut the cost of a unit of light so sharply",
          vocab: ["a rebound effect", "cheaper light led to more of it"] },
        { n: 15, type: "match", group: "info", prompt: "a reference to a natural sight many people have never seen", answer: "A",
          explain: "Paragraph A says most people in Europe and North America live where the Milky Way 'cannot be made out at all', and that a whole generation has never found it in the sky.",
          evidence: "A generation is growing up that has never once looked up and found it",
          vocab: ["never once looked up and found it", "never seen"] },
        { n: 16, type: "match", group: "info", prompt: "the point that a brighter street is not necessarily a clearer one", answer: "C",
          explain: "Paragraph C is Kovacs on contrast: a powerful lamp can make a pedestrian see less, and cities have made streets brighter 'without making them any easier to read'.",
          evidence: "without making them any easier to read",
          vocab: ["easier to read", "clearer"] },
        { n: 17, type: "match", group: "info", prompt: "evidence that lighting alters the timing of a natural cycle in plants", answer: "D",
          explain: "Paragraph D reports Demir's finding that trees near a lamp keep their leaves later into autumn — 'a small shift in the seasonal clock', which is the timing of a natural cycle.",
          evidence: "a small shift in the seasonal clock",
          vocab: ["the seasonal clock", "the timing of a natural cycle"] },
        { n: 18, type: "match", group: "info", prompt: "the argument that reducing lighting affects some groups of people more than others", answer: "F",
          explain: "Paragraph F carries Aaberg's objection: after midnight switch-offs, women, older residents and night-shift workers are the ones who stop travelling. 'Not equally free to everybody' is the key phrase.",
          evidence: "A darkened street, he argues, is not equally free to everybody",
          vocab: ["not equally free to everybody", "affects some groups more than others"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Lindqvist's four rules for city lighting",
            lines: [
              "Every lamp should be given a {{19}} so that none of its light is wasted on the sky.",
              "Lamps should be warmer in colour, with a temperature of under three thousand {{20}}, which suits both human eyes and insects better.",
              "The system as a whole should be turned down after {{21}}, when few people are out.",
              "Sensors should then bring the light back up wherever {{22}} is detected, so that a walker is accompanied by a pool of light.",
            ],
          },
          answer: "shield",
          explain: "Lindqvist's first rule is to 'Fit every lamp with a shield, so that nothing is thrown upwards into the sky'. The summary paraphrases 'thrown upwards' as 'wasted on the sky'.",
          evidence: "Fit every lamp with a shield",
          vocab: ["thrown upwards into the sky", "wasted on the sky"] },
        { n: 20, type: "gap", group: "sum2", answer: "kelvin",
          explain: "The second rule sets 'a colour temperature below three thousand kelvin'. The summary keeps the number and asks for the unit, which is a single word.",
          evidence: "a colour temperature below three thousand kelvin",
          vocab: ["below", "under"] },
        { n: 21, type: "gap", group: "sum2", answer: "midnight",
          explain: "The third rule is to 'Turn the whole system down after midnight, when the streets are all but empty'. 'All but empty' is paraphrased as 'few people are out'.",
          evidence: "Turn the whole system down after midnight",
          vocab: ["all but empty", "few people are out"] },
        { n: 22, type: "gap", group: "sum2", answer: "movement",
          explain: "The fourth rule lets sensors 'raise the level again wherever movement is detected'. The summary reuses 'is detected', so the gap needs the noun the sensors respond to.",
          evidence: "wherever movement is detected" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Marta Kovacs",
            "Nils Aaberg",
            "Elena Ruiz",
            "Sofia Lindqvist",
            "Yusuf Demir",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Some people stop going out when street lighting is cut back.", answer: "B",
          explain: "Aaberg interviewed residents of towns that turned their lamps off after midnight and found that many of those affected 'respond by simply not making the journey' — they stop going out.",
          evidence: "many of whom respond by simply not making the journey",
          vocab: ["not making the journey", "stop going out"] },
        { n: 24, type: "match", group: "people", prompt: "Light from outside a home is linked to poorer sleep.", answer: "C",
          explain: "The sleep researcher Ruiz matched bedroom light levels against sleep records: people whose windows faced a street lamp fell asleep later and slept less — poorer sleep.",
          evidence: "those whose windows faced a street lamp went to sleep later and slept for less time",
          vocab: ["slept for less time", "poorer sleep"] },
        { n: 25, type: "match", group: "people", prompt: "Adding brightness to a street does not automatically make it easier to see in.", answer: "A",
          explain: "The lighting engineer Kovacs argues that the eye works by contrast, so a very bright lamp can leave a pedestrian seeing less; even coverage matters more than 'raw output'.",
          evidence: "the eye judges a scene by contrast rather than by quantity",
          vocab: ["by contrast rather than by quantity", "not automatically easier to see"] },
        { n: 26, type: "match", group: "people", prompt: "Good design can cut light pollution without leaving streets in darkness.", answer: "D",
          explain: "Lindqvist's four rules aim at 'not less light but better-aimed light', and towns applying them get lower bills and a returning sky while keeping their streets lit.",
          evidence: "not less light but better-aimed light",
          vocab: ["better-aimed light", "good design"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Teaching as learning",
      passage: `Ask experienced teachers when they finally understood their subject, and a surprising number will name the year they first had to teach it. The observation is old enough to be a cliche, and for most of its history it survived on anecdote alone, repeated in staffrooms and believed because it was flattering. Over the past two decades, however, psychologists have taken the claim into the laboratory, and what they have found is more interesting than a compliment to the profession. Preparing to explain something to another person appears to change the way the material is learned, and it does so before a single word of explanation has been spoken.

The experiment that established the effect is disarmingly simple. Two groups of students are given the same text and the same amount of time with it. One group is told that they will be tested on it afterwards; the other is told that they will have to teach it to a fellow student. In fact nobody teaches anything: both groups sit the same test. The group that expected to teach reliably outperforms the other, and the advantage is not evenly spread. They do a little better on isolated facts and considerably better on questions that require them to connect one part of the material to another. Their written answers are also better organised, following the logic of the subject rather than the order in which the text happened to present it.

Three mechanisms are usually offered, and they are not rivals. The first is retrieval. Anyone rehearsing an explanation is pulling material out of memory rather than pushing it back in, and a large literature shows that retrieval strengthens memory far more than re-reading does. The second is organisation: to explain something you must decide what comes first, what can be left out and what the whole thing is for, and those decisions impose a structure that a passive reader never builds. The third, and probably the most powerful, is monitoring. We are poor judges of our own understanding. Asked how well they understand a bicycle or a zip, people rate themselves highly, then drop their ratings sharply once they attempt an actual description — the gap psychologists call the illusion of explanatory depth. An imagined audience audits us in a way we will not audit ourselves.

Does the audience have to exist? Apparently not entirely. Studies using teachable agents — cartoon characters on a screen which students instruct and then watch attempt a quiz — report gains close to those produced by human partners, and they bring a curious extra advantage. When the agent fails, students blame the agent, feel no personal shame, and go back to the material instead of giving up. Explaining aloud to an empty room or a camera also produces much of the benefit, which suggests that the essential work is done in the preparing rather than the performing. A living listener, though, contributes something no software can, namely the unexpected question; and it is the unexpected question that finds the hole in the account.

Schools have not ignored all this. Peer tutoring, in which pupils work in pairs, and cross-age schemes, in which older children coach younger ones, have been evaluated for half a century, and the reviews are consistently positive for both parties. What surprises people is that the tutor commonly gains as much as the pupil, and often rather more, which makes the usual objection — that such schemes exploit the abler child — hard to sustain. The gains are largest where the scheme is structured: short training for the tutors, prepared materials, and someone checking afterwards that what was taught was actually correct.

That last condition matters far more than enthusiasts admit. Explaining does not create knowledge out of nothing; it consolidates and reorganises what is already there. A student who has misunderstood a topic and is then asked to teach it will produce a fluent, confident and thoroughly wrong account, and the very fluency of it makes the error harder to shift later. Studies comparing tutors who had studied the material properly beforehand with tutors who had not find that the benefit shrinks towards zero in the second group. Learning by teaching is therefore a poor substitute for instruction and an excellent partner to it, and the schools that get results treat the explaining as the second half of a lesson rather than as the whole of it.

There is one further argument, and it has nothing to do with test scores. Being asked to explain changes a learner's position in the room. For a few minutes the student is the person with something to give rather than the person with a deficit to be filled, and teachers who run these schemes report that the effect on children who had been quietly written off is out of all proportion to the modest academic gains. Whether that effect lasts is not well established, and the research on it remains thin. But the arrangement we have inherited, in which one person who understands talks for an hour to thirty who do not, wastes the most reliable learning device in the room: the thirty. Nothing in the evidence suggests that they should sit and listen for as long as we ask them to.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What is the most striking feature of the experiment described in the second paragraph?", options: ["A The students who taught did so better than their tutors expected", "B The advantage appeared although no teaching actually took place", "C Both groups answered factual questions equally well", "D The test suited students who had read the text twice"], answer: "B",
          explain: "The point of the design is that 'nobody teaches anything: both groups sit the same test', yet the group expecting to teach still did better — the gain comes from preparation alone.",
          evidence: "In fact nobody teaches anything: both groups sit the same test",
          vocab: ["nobody teaches anything", "no teaching actually took place"] },
        { n: 28, type: "mcq", prompt: "According to the writer, the illusion of explanatory depth shows that people", options: ["A overestimate how well they can account for familiar things", "B remember pictures better than they remember words", "C understand machines more easily than abstract ideas", "D lose confidence in everything once they have been tested"], answer: "A",
          explain: "Asked about a bicycle or a zip, people rate themselves highly and then lower those ratings once they try to describe the thing — they had overestimated their grasp of the familiar.",
          evidence: "people rate themselves highly, then drop their ratings sharply once they attempt an actual description",
          vocab: ["rate themselves highly", "overestimate"] },
        { n: 29, type: "mcq", prompt: "One advantage of teachable agents over human listeners is that", options: ["A they ask questions the student cannot predict", "B they can be used when no teacher is available", "C students cover the material more quickly with them", "D failure causes the student no embarrassment"], answer: "D",
          explain: "When the on-screen character fails, 'students blame the agent, feel no personal shame' and keep working. Option A is the reverse: the unexpected question is what only a live listener supplies.",
          evidence: "students blame the agent, feel no personal shame",
          vocab: ["feel no personal shame", "no embarrassment"] },
        { n: 30, type: "mcq", prompt: "The writer says that peer tutoring schemes produce the best results when", options: ["A the tutors are much older than the pupils they coach", "B the pairs are left to arrange their own sessions", "C the tutors are trained and their teaching is checked", "D the pupils are tested immediately after each session"], answer: "C",
          explain: "The gains are largest in structured schemes: 'short training for the tutors, prepared materials, and someone checking afterwards'. Age and testing are never given as conditions for success.",
          evidence: "short training for the tutors, prepared materials, and someone checking afterwards",
          vocab: ["short training", "trained"] },
        { n: 31, type: "ynng", prompt: "Preparing to teach improves the way learners organise what they know.", answer: "YES",
          explain: "YES: deciding what comes first and what to leave out imposes 'a structure that a passive reader never builds' — organisation is one of the three mechanisms the writer endorses.",
          evidence: "those decisions impose a structure that a passive reader never builds",
          vocab: ["impose a structure", "organise what they know"] },
        { n: 32, type: "ynng", prompt: "Explaining material to a camera produces no benefit at all.", answer: "NO",
          explain: "NO: the writer states that explaining aloud to an empty room or a camera 'also produces much of the benefit'. 'Much of the benefit' contradicts 'no benefit at all'.",
          evidence: "Explaining aloud to an empty room or a camera also produces much of the benefit",
          vocab: ["much of the benefit", "no benefit at all"] },
        { n: 33, type: "ynng", prompt: "A learner who has misunderstood a topic may still explain it convincingly.", answer: "YES",
          explain: "YES: such a student produces 'a fluent, confident and thoroughly wrong account', and the writer adds that the fluency itself makes the mistake harder to correct afterwards.",
          evidence: "a fluent, confident and thoroughly wrong account",
          vocab: ["fluent, confident", "convincingly"] },
        { n: 34, type: "ynng", prompt: "Tutoring schemes take unfair advantage of the more able child.", answer: "NO",
          explain: "NO: the writer reports that the tutor usually gains as much as the pupil or more, which makes this very objection 'hard to sustain' — he is rejecting the claim, not accepting it.",
          evidence: "that such schemes exploit the abler child — hard to sustain",
          vocab: ["exploit the abler child", "take unfair advantage"] },
        { n: 35, type: "ynng", prompt: "Teachers find peer tutoring harder to manage than ordinary lessons.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage says structured schemes work best and lists what structure means, but it never compares the workload or difficulty of running tutoring against normal teaching.",
          evidence: "The gains are largest where the scheme is structured" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "gains little or nothing from the experience of explaining it.",
            "involves recalling information rather than simply going over it again.",
            "proves that staffroom anecdotes are usually mistaken.",
            "leaves the most dependable learning resource in the room unused.",
            "forces the learner to build a structure the text does not supply.",
            "makes students less willing to carry on with the task.",
            "sends students back to the material instead of discouraging them.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Rehearsing an explanation helps memory because it", answer: "B",
          explain: "Rehearsing means 'pulling material out of memory rather than pushing it back in', and retrieval beats re-reading — ending B, with 'going over it again' for 're-reading'.",
          evidence: "retrieval strengthens memory far more than re-reading does",
          vocab: ["re-reading", "going over it again"] },
        { n: 37, type: "match", group: "ends", prompt: "Deciding what to leave out of an explanation", answer: "E",
          explain: "Those choices 'impose a structure that a passive reader never builds', which ending E restates as building a structure the text does not supply.",
          evidence: "to explain something you must decide what comes first, what can be left out and what the whole thing is for",
          vocab: ["a passive reader never builds", "the text does not supply"] },
        { n: 38, type: "match", group: "ends", prompt: "Watching a teachable agent fail a quiz", answer: "G",
          explain: "Because the blame falls on the character rather than the student, learners 'go back to the material instead of giving up' — ending G. Ending F says the opposite of the passage.",
          evidence: "go back to the material instead of giving up",
          vocab: ["instead of giving up", "instead of discouraging them"] },
        { n: 39, type: "match", group: "ends", prompt: "A tutor who has not studied the topic properly first", answer: "A",
          explain: "Comparisons of prepared and unprepared tutors find 'the benefit shrinks towards zero in the second group' — ending A, gaining little or nothing from explaining.",
          evidence: "the benefit shrinks towards zero in the second group",
          vocab: ["shrinks towards zero", "little or nothing"] },
        { n: 40, type: "match", group: "ends", prompt: "The usual arrangement of a school lesson", answer: "D",
          explain: "One speaker addressing thirty listeners 'wastes the most reliable learning device in the room: the thirty' — ending D, with 'dependable resource' paraphrasing 'reliable device'.",
          evidence: "wastes the most reliable learning device in the room: the thirty",
          vocab: ["the most reliable learning device", "the most dependable learning resource"] },
      ],
    },
  ],
};
