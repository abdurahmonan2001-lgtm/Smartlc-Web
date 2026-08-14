// Smart LC Practice Set 15 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET15_READING = {
  id: "pset15-reading",
  bookId: "pset15",
  title: "Practice Set 15 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The nail",
      passage: `Almost nothing in the built world is easier to overlook than a nail, and almost nothing has been manufactured in greater numbers. A nail is simply a wedge with a head. Driven into wood, it forces the fibres apart, and the grip of those compressed fibres holds it fast while the head stops the joint from opening. The principle has not altered in five thousand years. What has altered, three times over and with consequences far beyond carpentry, is the way nails are made, and each change made them cheaper, until a fastening that was once counted and hoarded became something a builder buys by the kilogram.

The oldest nails to survive are Egyptian, made of bronze and dated to around 3400 BC, but it was Rome that first produced iron nails in quantity. Every one of them was forged individually by hand, and the scale of that effort can be judged from a single find in Scotland. When the legionary fortress at Inchtuthil was abandoned in about AD 87, the departing soldiers dug a pit seven metres deep, tipped rather more than three quarters of a million nails into it and buried the lot. The gesture was not wasteful but strategic: seven tonnes of worked iron were being kept out of local hands, and that iron was worth considerably more than the timber it had fastened.

Hand forging remained the only method for the next seventeen centuries. The nailer worked from a nail rod, a long square section of iron produced by water-powered slitting mills, introduced to England in the 1590s, which sliced flat iron into narrow lengths. Heating one end of the rod, the nailer drew it to a point on the anvil, cut the shank off at the required length, dropped it into a heading tool and struck the projecting stub two or three times to spread the head. A skilled worker could turn out a thousand or more in a day, and in the villages of the English Midlands whole families did this work, women and children included, paid by the thousand for what they made in a shed behind the house.

Because every nail carried a measurable amount of skilled labour, nails were valuable, and their value shows up in odd corners of history. In colonial America, where iron was imported and dear, a household abandoning a homestead would sometimes set fire to the building in order to rake the nails out of the ashes; the loss of housing was serious enough that at least one colonial assembly offered compensation to anyone who left a house standing instead. Thomas Jefferson ran a nail manufactory at Monticello and reported its output as proudly as his crops.

The first break came in the 1790s. Instead of forging a nail from a rod, a machine could shear it, and inventors on both sides of the Atlantic built devices that cut tapered blanks from a flat strip of rolled iron, like slices from a loaf. Early machines still needed a worker to head each blank by hand; by the 1820s that operation too was automatic, and one machine attended by a boy produced what a dozen skilled nailers had. The price of nails fell by something like ninety per cent in forty years, and the hand nailers of the Midlands, who resisted the change for two generations, lost.

The second break came from wire. Machines that chopped lengths from a coil of drawn wire, pointed one end and squeezed the other into a head had been used in France to make shoe tacks; adapted to building work and fed with cheap steel, they produced the round nail we use today. Wire nails were quicker to make than cut nails and quicker still to drive, and although carpenters complained that they held less firmly in the wood, the argument was settled by price. In the United States, wire outsold cut nails for the first time in 1892, and within a decade the cut-nail industry had all but disappeared.

Cheapness changed buildings. A traditional timber frame was a piece of joinery: heavy posts and beams shaped to fit one another, cut by a carpenter who had served years to learn how. Once nails cost almost nothing, a frame could instead be assembled from thin sawn studs simply nailed together — the balloon frame, first raised in Chicago in the 1830s and soon standard across North America. A crew with no specialist training could put up the shell of a house in a week. Critics called the result flimsy and predicted that it would blow away, which is thought to be where the name came from; the houses are still standing.

For archaeologists the nail is now a clock. A hand-wrought nail with an irregular head means work done before about 1800; a rectangular cut nail places a building roughly between 1800 and 1890; a round wire nail means later. Restorers still buy cut nails by choice, since a rectangular shank grips the grain of an old floorboard better than a round one. The pneumatic nail gun, which fires collated nails from a strip, has changed how they are driven but not what they are: a wedge with a head, doing quietly what it has always done.`,
      questions: [
        { n: 1, type: "gap", prompt: "The earliest surviving nails, which came from Egypt, were made of ______.", note: "ONE WORD ONLY", answer: "bronze",
          explain: "The passage says the oldest nails to survive are Egyptian and 'made of bronze'. 'Oldest to survive' is simply reworded as 'earliest surviving', so the metal named is the answer.",
          evidence: "made of bronze and dated to around 3400 BC",
          vocab: ["oldest nails to survive", "earliest surviving nails"] },
        { n: 2, type: "gap", prompt: "Before leaving Inchtuthil, the Roman soldiers hid their nails in a deep ______.", note: "ONE WORD ONLY", answer: "pit",
          explain: "The departing soldiers 'dug a pit seven metres deep' and buried the nails in it. 'Departing' in the passage becomes 'before leaving' in the question; the noun stays the same.",
          evidence: "the departing soldiers dug a pit seven metres deep",
          vocab: ["departing", "before leaving"] },
        { n: 3, type: "gap", prompt: "Water-powered ______ mills produced the iron rods that hand nailers worked from.", note: "ONE WORD ONLY", answer: "slitting",
          explain: "The nail rod was 'produced by water-powered slitting mills', which sliced flat iron into narrow lengths. The word before 'mills' in the passage is exactly what the gap needs.",
          evidence: "produced by water-powered slitting mills" },
        { n: 4, type: "gap", prompt: "In colonial America, buildings were sometimes burnt down so that nails could be raked out of the ______.", note: "ONE WORD ONLY", answer: "ashes",
          explain: "A household leaving a homestead would set fire to the building 'in order to rake the nails out of the ashes'. The question paraphrases 'set fire to' as 'burnt down'.",
          evidence: "rake the nails out of the ashes",
          vocab: ["set fire to the building", "burnt down"] },
        { n: 5, type: "gap", prompt: "From the 1790s, machines sheared nail blanks from a flat ______ of rolled iron.", note: "ONE WORD ONLY", answer: "strip",
          explain: "The new machines 'cut tapered blanks from a flat strip of rolled iron'. 'Cut' in the passage is the question's 'sheared', which the previous sentence supplies.",
          evidence: "cut tapered blanks from a flat strip of rolled iron",
          vocab: ["cut", "sheared"] },
        { n: 6, type: "gap", prompt: "The ______ frame, first put up in Chicago, used thin sawn timbers held together with nails.", note: "ONE WORD ONLY", answer: "balloon",
          explain: "Once nails were cheap, frames were assembled from thin sawn studs nailed together: 'the balloon frame, first raised in Chicago in the 1830s'. 'Raised' is reworded as 'put up'.",
          evidence: "the balloon frame, first raised in Chicago in the 1830s",
          vocab: ["first raised", "first put up"] },
        { n: 7, type: "tfng", prompt: "Roman nails were produced one at a time rather than by machine.", answer: "TRUE",
          explain: "TRUE: 'Every one of them was forged individually by hand' says exactly this — 'individually by hand' is the passage's way of saying 'one at a time rather than by machine'.",
          evidence: "Every one of them was forged individually by hand",
          vocab: ["individually by hand", "one at a time"] },
        { n: 8, type: "tfng", prompt: "The nails buried at Inchtuthil would have been of little value to the local population.", answer: "FALSE",
          explain: "FALSE: the burial was strategic because the iron was 'worth considerably more than the timber it had fastened' and was deliberately kept from local hands — the opposite of little value.",
          evidence: "that iron was worth considerably more than the timber it had fastened",
          vocab: ["worth considerably more", "of little value"] },
        { n: 9, type: "tfng", prompt: "Nail makers in the English Midlands were paid more than other metal workers.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: we learn that whole families were 'paid by the thousand', which describes how they were paid, not how much. No other trade's wages appear anywhere in the passage.",
          evidence: "paid by the thousand for what they made in a shed behind the house" },
        { n: 10, type: "tfng", prompt: "An official body in colonial America tried to discourage the burning of houses for their nails.", answer: "TRUE",
          explain: "TRUE: 'at least one colonial assembly offered compensation to anyone who left a house standing' — paying people not to burn houses is an attempt to discourage the practice.",
          evidence: "at least one colonial assembly offered compensation to anyone who left a house standing",
          vocab: ["colonial assembly", "official body"] },
        { n: 11, type: "tfng", prompt: "Machine-cut nails cost more to produce than hand-forged ones.", answer: "FALSE",
          explain: "FALSE: after the cutting machines arrived, 'The price of nails fell by something like ninety per cent in forty years', which contradicts the claim that machine nails were dearer.",
          evidence: "The price of nails fell by something like ninety per cent in forty years",
          vocab: ["the price fell", "cost more"] },
        { n: 12, type: "tfng", prompt: "Wire nails were outselling cut nails in the United States before 1900.", answer: "TRUE",
          explain: "TRUE: wire 'outsold cut nails for the first time in 1892', and 1892 is before 1900 — the date in the passage is the whole test here.",
          evidence: "wire outsold cut nails for the first time in 1892" },
        { n: 13, type: "tfng", prompt: "Nail guns drive nails faster than a carpenter can drive them by hand.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage says the nail gun 'has changed how they are driven but not what they are', but it never compares the speed of a gun with the speed of hand driving.",
          evidence: "has changed how they are driven but not what they are" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Towers built of timber",
      passage: `A — For most of the last three hundred years the tall building has been made of steel and concrete, and the reason is fire. After London burned in 1666, city after city wrote timber out of its building regulations, and by the mid-nineteenth century a multi-storey wooden structure was in most places illegal. Yet in the past decade wood has come back, and not modestly. There is now an eighteen-storey tower in a small Norwegian town, a twenty-five-storey block of flats in the American Midwest, and a queue of taller proposals behind them. These are not log cabins, but engineered buildings made of a material that behaves less like the timber of a barn than like a manufactured slab.

B — That material is mass timber, and its most important form is cross-laminated timber, or CLT. Softwood boards are planed, laid side by side to make a layer, then stacked in three, five or seven layers, with the grain of each layer set at right angles to the one below, the whole assembly bonded under pressure into a single panel as large as a wall or a floor. The cross-lamination is the point: wood is strong along the grain and weak across it, and alternating the direction cancels that weakness, so a panel carries load in both directions. Beams and columns come from glulam, in which smaller sections are glued into members of almost any length or curve. Panels are cut in the factory from the architect's digital model, openings and all, and arrive on site numbered.

C — What this does to a building site is dramatic. Because the pieces arrive finished, a crew of a few people can close a floor in days rather than weeks, and the structural engineer Mattias Holm, who has costed a dozen such projects, points out that the savings are not only in time. A CLT floor weighs about a fifth of the equivalent concrete slab, so foundations shrink, sites with poor ground become usable, and extra storeys can be added to old buildings that could never have carried concrete. Lorry movements on his projects fall by four fifths; there is no wet trade, no waiting for curing, and the neighbours notice the quiet.

D — There is also an argument about the people inside. Amara Nwosu, an environmental psychologist, has run studies in offices and classrooms where the timber structure is left exposed, comparing them with identical rooms lined in plasterboard. Occupants of the wooden rooms report lower stress, and her measurements of heart rate and skin conductance move in the same direction; children in the timber classrooms were rated as calmer by teachers who did not know what was being tested. She is careful about the size of the effect, which is modest, but notes that it turns up in every building type she has examined. Not every response is favourable: timber floors are springier than concrete, and complaints about footsteps overhead are the commonest fault in tall wooden housing.

E — Fire is the objection everyone raises first, and the answer is counter-intuitive. A heavy timber member does burn, but it burns slowly and predictably: the outer surface turns to char, and that char layer, a poor conductor, shields the wood beneath it. Kenji Arai, who tests loaded beams in a furnace, reports charring at a rate of roughly seven tenths of a millimetre a minute, which is why engineers now design timber members oversized by a calculated sacrificial thickness, so that after two hours of fire enough sound section survives to hold the building up. Unprotected steel, by contrast, loses its strength suddenly and without warning. The real uncertainties concern the glue lines, and how a mass-timber building behaves once the fire brigade has gone home.

F — The climate case is the reason most cities have rewritten their rules, and it is the one that Rosa Delgado, a forest scientist, treats most cautiously. Cement manufacture alone accounts for something like eight per cent of global carbon emissions, while a tonne of timber locks carbon up rather than releasing it, so the arithmetic looks conclusive. Delgado's point is that the arithmetic is only valid at both ends. The carbon is genuinely stored only if the forest that supplied it regrows, and only if the building stands long enough for that to happen; a wooden tower demolished after thirty years and sent to landfill is, she argues, a slow chimney. Nor is the supply endless. If mass timber becomes the default everywhere, the pressure on managed forests will be intense, and so will the temptation to cut faster than the science allows.

G — Which is why the architect Sofia Lindqvist finds the race for the tallest wooden tower a distraction. Records attract attention and money, she agrees, but the buildings that will decide whether timber matters are the unglamorous ones: the six-storey block, the school, the clinic, repeated ten thousand times. Her own practice designs for disassembly, bolting panels rather than gluing them and keeping a digital record of every component, so that a building taken down in eighty years is a stack of materials rather than a heap of rubble. The forests, she says, are lending us the carbon; the least we can do is hand it back in usable form.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "examples showing how tall timber buildings have already become", answer: "A",
          explain: "Paragraph A gives the two completed examples — an eighteen-storey Norwegian tower and a twenty-five-storey block in the American Midwest — which is exactly the evidence of height the question asks for.",
          evidence: "an eighteen-storey tower in a small Norwegian town",
          vocab: ["a queue of taller proposals", "how tall timber buildings have become"] },
        { n: 15, type: "match", group: "info", prompt: "a comparison of the weight of a timber floor and a concrete one", answer: "C",
          explain: "Paragraph C supplies the ratio: a CLT floor weighs about a fifth of the equivalent concrete slab. 'Slab' is the passage's word for the concrete floor in the question.",
          evidence: "A CLT floor weighs about a fifth of the equivalent concrete slab",
          vocab: ["concrete slab", "concrete floor"] },
        { n: 16, type: "match", group: "info", prompt: "an argument that ordinary buildings matter more than record-breaking ones", answer: "G",
          explain: "Paragraph G is Lindqvist's case that the race for the tallest tower is a distraction and that the decisive buildings are the unglamorous everyday ones — 'unglamorous' paraphrases 'ordinary'.",
          evidence: "the buildings that will decide whether timber matters are the unglamorous ones",
          vocab: ["unglamorous", "ordinary"] },
        { n: 17, type: "match", group: "info", prompt: "the measured rate at which heavy timber is consumed by fire", answer: "E",
          explain: "Paragraph E reports Arai's furnace figure of roughly seven tenths of a millimetre a minute — a measured rate of charring, which is what 'consumed by fire' refers to.",
          evidence: "charring at a rate of roughly seven tenths of a millimetre a minute",
          vocab: ["charring", "consumed by fire"] },
        { n: 18, type: "match", group: "info", prompt: "findings about how exposed wood affects the people who use a building", answer: "D",
          explain: "Paragraph D reports Nwosu's studies of rooms where the timber is left exposed: occupants report lower stress and their physiological measurements agree.",
          evidence: "Occupants of the wooden rooms report lower stress",
          vocab: ["occupants", "the people who use a building"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — How a mass-timber building is put together",
            lines: [
              "In cross-laminated timber, boards are stacked in layers, with the grain of each layer running at right {{19}} to the layer below, so that the finished panel is strong in both directions.",
              "Beams and columns are made from {{20}} instead, which allows sections of small timber to be joined into members of almost any shape.",
              "Every panel is cut in the {{21}} from the architect's digital model, then delivered to the site with a number on it, so that erecting the frame is closer to assembling a kit.",
              "Because a timber floor is so much lighter than a concrete one, the {{22}} under the building can be smaller, and ground that was previously too weak can be built on.",
            ],
          },
          answer: "angles",
          explain: "The boards are stacked 'with the grain of each layer set at right angles to the one below'. The summary keeps the phrase 'right ___', so the missing noun is 'angles'.",
          evidence: "with the grain of each layer set at right angles to the one below",
          vocab: ["set at right angles", "running at right angles"] },
        { n: 20, type: "gap", group: "sum2", answer: "glulam",
          explain: "The passage says 'Beams and columns come from glulam', in which smaller sections are glued into members of almost any length or curve — the summary's 'almost any shape'.",
          evidence: "Beams and columns come from glulam",
          vocab: ["almost any length or curve", "almost any shape"] },
        { n: 21, type: "gap", group: "sum2", answer: "factory",
          explain: "Panels are 'cut in the factory from the architect's digital model' and arrive numbered. The summary paraphrases 'arrive on site numbered' as delivered with a number on them.",
          evidence: "Panels are cut in the factory from the architect's digital model",
          vocab: ["arrive on site numbered", "delivered with a number on it"] },
        { n: 22, type: "gap", group: "sum2", answer: "foundations",
          explain: "Because a CLT floor is far lighter, 'foundations shrink, sites with poor ground become usable'. The summary turns 'shrink' into 'can be smaller', so the answer is 'foundations'.",
          evidence: "so foundations shrink, sites with poor ground become usable",
          vocab: ["foundations shrink", "can be smaller"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Mattias Holm",
            "Rosa Delgado",
            "Kenji Arai",
            "Amara Nwosu",
            "Sofia Lindqvist",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "The benefit for the climate depends on what happens to the forest and to the building afterwards.", answer: "B",
          explain: "Delgado, the forest scientist, insists the carbon arithmetic 'is only valid at both ends': the forest must regrow and the building must stand long enough. That is the double condition in the statement.",
          evidence: "The carbon is genuinely stored only if the forest that supplied it regrows",
          vocab: ["only valid at both ends", "depends on what happens"] },
        { n: 24, type: "match", group: "people", prompt: "Timber buildings go up faster and disturb their surroundings less.", answer: "A",
          explain: "Holm, the structural engineer, reports floors closed in days rather than weeks, lorry movements down by four fifths and neighbours noticing the quiet — speed plus less disturbance.",
          evidence: "a crew of a few people can close a floor in days rather than weeks",
          vocab: ["the neighbours notice the quiet", "disturb their surroundings less"] },
        { n: 25, type: "match", group: "people", prompt: "People are calmer in rooms where the wooden structure can be seen.", answer: "D",
          explain: "Nwosu, the environmental psychologist, found teachers rating children in exposed-timber classrooms as calmer, without knowing what was being tested — a controlled finding about visible wood.",
          evidence: "children in the timber classrooms were rated as calmer by teachers",
          vocab: ["left exposed", "can be seen"] },
        { n: 26, type: "match", group: "people", prompt: "Buildings of moderate height, not towers, will decide timber's future.", answer: "E",
          explain: "Lindqvist, the architect, calls the race for the tallest tower a distraction and points instead to the six-storey block, the school and the clinic — buildings of moderate height.",
          evidence: "the six-storey block, the school, the clinic, repeated ten thousand times",
          vocab: ["six-storey block", "moderate height"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The itch to know",
      passage: `Curiosity has an unusual reputation. Most drives — hunger, anger, the wish for status — are things we are told to manage; curiosity is the one appetite adults recommend to children without qualification. The enthusiasm is not misplaced, but it has made curiosity hard to study, because a virtue is not the same kind of object as a mechanism. The most productive move of the last thirty years was to stop treating curiosity as a personal quality that some people simply have more of, and start treating it as a state: something that arises under particular conditions, does a job, and goes away again.

The account that made this possible describes curiosity as a response to an information gap. On this view we become curious not when we know nothing about a subject but when we notice a hole in what we know — when a question forms that our existing knowledge frames but cannot answer. The gap is felt as a deprivation, which is why the sensation is so often described physically, as an itch, a thirst, a nagging. It also explains the shape of the curve. Total ignorance produces no curiosity at all, and complete knowledge produces none either. Curiosity peaks in between, where you know enough to be aware of what you are missing, and the practical consequence is unexpected — curiosity has to be built rather than summoned.

Brain imaging supports the appetite metaphor more literally than one might expect. When volunteers rate trivia questions for how badly they want the answer, the high-curiosity items produce activity in the same midbrain and striatal circuits that respond to food and money, and it is the anticipation, rather than the answer's arrival, that drives most of it. More interesting is what curiosity does to memory. In one design, participants waited a few seconds between question and answer, and during the wait were shown a photograph of a face with nothing to do with the question. Faces presented during high-curiosity waits were remembered better a day later than faces from low-curiosity waits. The curious state, in other words, is not a spotlight aimed at the thing we want to know; it is closer to a floodlight, and whatever happens to be nearby gets learned too.

This is where the moral simplicity breaks down. If curiosity is a drive to close a gap, it will sometimes drive us to close gaps we would be better off leaving open. In experiments on what has been called morbid curiosity, people choose to look at unpleasant images, or press pens that may deliver a mild electric shock, purely to find out which ones do — and they report afterwards that they wish they had not. The same mechanism that makes a child take a clock apart makes an adult read a message that will ruin their evening. Curiosity is not a virtue; it is a hunger, and like other hungers it is indifferent to whether the meal is good for us.

The gap account also has uncomfortable implications for teaching. If curiosity depends on a question the learner has actually formed, then the standard sequence of instruction — answer first, question afterwards — is precisely backwards, and a great deal of classroom effort goes into filling gaps that were never opened. Teachers who withhold the answer for a few minutes, or who open with a puzzle instead of a definition, are not being theatrical; they are manufacturing the deprivation on which the whole mechanism depends. It is often said that children start school curious and leave it incurious, generally as an indictment of schools. The evidence for the decline itself is thinner than the confidence with which it is asserted, but if the decline is real, the mechanism is unlikely to be that curiosity has been destroyed. What institutions reward is answers; questions are at best tolerated, and a state that is never rewarded is simply not entered.

A related worry attaches to the speed of modern answers. Because almost any factual gap can now be closed in seconds, the argument runs, we are training the shallow form of curiosity — the kind that flits between novelties — at the expense of the deep form that stays with one question for years. There is something in this: the two forms are measurably different, and the second produces expertise. But the pessimism assumes that gaps are a fixed resource, which they are not. Answers create questions faster than they close them, as anyone who has followed one search into six others knows, and there is as yet no evidence that a generation with instant access asks fewer deep questions than one that waited for a library book.

What follows is modest and practical. Curiosity cannot be commanded, in oneself or in anyone else, because it is a response to a condition rather than an act of will. Conditions, however, can be arranged. Anything that makes a gap visible — an unexplained result, a good question left hanging, a stranger who knows something you do not — will produce the state reliably, and the state does the rest. The people we call curious are not, for the most part, born with an unusual appetite. They are people who have arranged their lives so that they keep noticing what they do not know.`,
      questions: [
        { n: 27, type: "mcq", prompt: "According to the writer, the most useful recent development in research on curiosity has been", options: ["A the recognition that some individuals are naturally more curious than others", "B the decision to treat curiosity as a temporary condition rather than a character trait", "C the discovery that curiosity can be observed in the brain", "D the acceptance that curiosity should not always be encouraged"], answer: "B",
          explain: "The 'most productive move' was to stop treating curiosity as a personal quality and 'start treating it as a state' — a temporary condition. Option A repeats the wording of the view the writer says was abandoned.",
          evidence: "start treating it as a state",
          vocab: ["a state", "a temporary condition"] },
        { n: 28, type: "mcq", prompt: "What does the experiment with photographs of faces suggest about curiosity?", options: ["A It improves memory only for the information a person wanted", "B It makes people less aware of their surroundings", "C It helps people learn material unrelated to their question", "D It has a greater effect on memory than reward does"], answer: "C",
          explain: "Faces irrelevant to the question were remembered better when curiosity was high, so learning spreads to unrelated material — the writer's 'floodlight'. Option A is the 'spotlight' idea the passage explicitly rejects.",
          evidence: "whatever happens to be nearby gets learned too",
          vocab: ["closer to a floodlight", "material unrelated to their question"] },
        { n: 29, type: "mcq", prompt: "The writer mentions studies of morbid curiosity in order to show that", options: ["A unpleasant images are remembered more clearly than pleasant ones", "B the drive to know weakens when the information may be distressing", "C people enjoy mild discomfort more than is generally assumed", "D curiosity can lead people to act against their own interests"], answer: "D",
          explain: "Volunteers sought out shocks and unpleasant images and then wished they had not — curiosity working against them. Options B and C reverse what the experiments actually found.",
          evidence: "they report afterwards that they wish they had not",
          vocab: ["wish they had not", "against their own interests"] },
        { n: 30, type: "mcq", prompt: "How does the writer respond to the claim that instant answers are damaging deep curiosity?", options: ["A It wrongly assumes that the number of available questions is fixed", "B It is correct, and the effect can already be measured in young people", "C It confuses two forms of curiosity that are really the same", "D It underestimates how slow research used to be"], answer: "A",
          explain: "The writer concedes the two forms differ but says 'the pessimism assumes that gaps are a fixed resource, which they are not'. Option C contradicts the passage, which calls the forms measurably different.",
          evidence: "the pessimism assumes that gaps are a fixed resource, which they are not",
          vocab: ["a fixed resource", "the number of available questions is fixed"] },
        { n: 31, type: "ynng", prompt: "Curiosity has to be created by circumstances rather than produced by an effort of will.", answer: "YES",
          explain: "YES: the writer states that 'curiosity has to be built rather than summoned', and returns to the point at the end — the state is a response to conditions, not something we can command.",
          evidence: "curiosity has to be built rather than summoned",
          vocab: ["summoned", "an effort of will"] },
        { n: 32, type: "ynng", prompt: "Adults notice information gaps less often than children do.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the writer puts a child and an adult in one sentence to show the same mechanism at work in both, but never says which of them experiences gaps more often.",
          evidence: "The same mechanism that makes a child take a clock apart makes an adult read a message that will ruin their evening." },
        { n: 33, type: "ynng", prompt: "Curiosity is always beneficial to the person who feels it.", answer: "NO",
          explain: "NO: the writer says curiosity 'is not a virtue; it is a hunger' that is indifferent to whether the meal is good for us, and gives morbid curiosity as the example.",
          evidence: "Curiosity is not a virtue; it is a hunger",
          vocab: ["indifferent to whether the meal is good for us", "always beneficial"] },
        { n: 34, type: "ynng", prompt: "Starting a lesson with a puzzle is a sound teaching strategy.", answer: "YES",
          explain: "YES: teachers who open with a puzzle instead of a definition are 'manufacturing the deprivation on which the whole mechanism depends' — the writer treats this as doing the job properly, not as showmanship.",
          evidence: "they are manufacturing the deprivation on which the whole mechanism depends",
          vocab: ["open with a puzzle", "starting a lesson with a puzzle"] },
        { n: 35, type: "ynng", prompt: "It has been clearly demonstrated that schooling reduces children's curiosity.", answer: "NO",
          explain: "NO: the writer says the evidence for the decline 'is thinner than the confidence with which it is asserted' — that is, the claim is often made but not demonstrated.",
          evidence: "The evidence for the decline itself is thinner than the confidence with which it is asserted",
          vocab: ["thinner than the confidence", "clearly demonstrated"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "were remembered better when they appeared during a period of strong curiosity.",
            "were shown only to volunteers who had answered a question correctly.",
            "we become aware of a question that our present knowledge cannot answer.",
            "have arranged their surroundings so that gaps keep appearing.",
            "spend less time than other people on any single question.",
            "waiting for an answer stirs the circuits that respond to food and money.",
            "fills gaps that the learner had not yet noticed.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The information-gap account says that curiosity arises when", answer: "C",
          explain: "Curiosity comes not from total ignorance but from noticing 'a hole in what we know' — a question our knowledge frames but cannot answer, which is ending C.",
          evidence: "we become curious not when we know nothing about a subject but when we notice a hole in what we know",
          vocab: ["a hole in what we know", "a question our present knowledge cannot answer"] },
        { n: 37, type: "match", group: "ends", prompt: "Brain imaging of curious volunteers shows that", answer: "F",
          explain: "High-curiosity questions activate the same midbrain and striatal circuits as food and money, and it is the anticipation — the waiting — that drives most of the activity, which is ending F.",
          evidence: "the same midbrain and striatal circuits that respond to food and money",
          vocab: ["the anticipation of the answer", "waiting for an answer"] },
        { n: 38, type: "match", group: "ends", prompt: "The photographs used in the memory experiment", answer: "A",
          explain: "Faces shown during high-curiosity waits were recalled better a day later than those shown during low-curiosity waits — ending A. Ending B invents a condition the experiment never had.",
          evidence: "Faces presented during high-curiosity waits were remembered better a day later",
          vocab: ["high-curiosity waits", "a period of strong curiosity"] },
        { n: 39, type: "match", group: "ends", prompt: "Teaching that gives the answer before the question", answer: "G",
          explain: "The writer calls the answer-first sequence 'precisely backwards' because 'a great deal of classroom effort goes into filling gaps that were never opened' — ending G, gaps the learner had not noticed.",
          evidence: "a great deal of classroom effort goes into filling gaps that were never opened",
          vocab: ["gaps that were never opened", "gaps the learner had not yet noticed"] },
        { n: 40, type: "match", group: "ends", prompt: "In the writer's opinion, the people we describe as curious", answer: "D",
          explain: "They are not born with a bigger appetite; they 'have arranged their lives so that they keep noticing what they do not know' — ending D. Ending E describes the shallow form the writer refuses to blame them for.",
          evidence: "They are people who have arranged their lives so that they keep noticing what they do not know.",
          vocab: ["arranged their lives", "arranged their surroundings"] },
      ],
    },
  ],
};
