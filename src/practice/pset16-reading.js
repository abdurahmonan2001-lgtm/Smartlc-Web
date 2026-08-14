// Smart LC Practice Set 16 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET16_READING = {
  id: "pset16-reading",
  bookId: "pset16",
  title: "Practice Set 16 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Playing cards",
      passage: `Few manufactured objects have travelled as far, or changed as little, as the pack of playing cards. A deck bought today in Tashkent, Toronto or Tokyo holds the same fifty-two cards, divided among the same four suits, and two strangers who each own one can sit down and play without exchanging a word of explanation. Yet the pack reached that settled form very slowly, through a long series of local accidents, and almost nothing about it was designed in the way a modern product is designed.

The first cards were Chinese, and they existed because paper did. By the ninth century, under the Tang dynasty, paper was being made cheaply enough in China to be printed, folded and thrown away, and sheets of it were already circulating as money. Historians have long noticed how difficult it is to say whether the earliest Chinese cards were tokens used in a game or the money itself, staked and passed from hand to hand; the two ideas are not really separable, and the first packs may simply have been banknotes with rules attached. What is clear is that a court diarist described ladies of the imperial household amusing themselves with a leaf game, and that within two centuries printed cards were common enough to be sold openly in the markets of several cities.

From China the cards moved west along the trade routes, and somewhere in the Islamic world they acquired the shape that Europe would inherit. The decisive evidence is a set of cards surviving from Mamluk Egypt, made in the fifteenth century but plainly copying a much older pattern. It has fifty-two cards in four suits — cups, coins, swords and polo sticks — with ten numbered cards and three court cards in every suit, and the court cards are not portraits but ornamental panels bearing titles, since the painting of human figures was avoided. Anyone who has held a modern deck will recognise that arithmetic at once.

Europe met cards in a rush. There is no mention of them anywhere in European records before the 1370s, and then, within a single decade, city after city begins banning them: Florence, Basel, Paris, Barcelona. Nothing advertises a craze more reliably than the effort to suppress it. The earliest European packs were painted by hand, gilded and priced accordingly, and a set made for a duke could cost as much as a good horse. What turned cards into an everyday object was a technique already used for cheap religious pictures: whole sheets were printed from woodblocks, coloured roughly through a mask, pasted onto backing paper and cut apart. A pack that had been a treasure could now be bought by a soldier.

Each region then redrew the suits to please itself. German makers replaced the Mamluk symbols with hearts, bells, acorns and leaves; Italian and Spanish makers kept cups, coins and swords, but turned the polo sticks, an object entirely unknown to them, into clubs. The French, around 1480, made the change that eventually defeated all the others. They reduced the suit signs to four flat silhouettes — heart, spade, diamond and club — in two colours only, and that simplification had a commercial consequence its inventors can hardly have missed: such shapes could be applied through stencils in a few strokes, while German and Italian designs still demanded a skilled block-cutter. French cards were therefore cheaper, and cheapness, not beauty, decided the matter.

England took the French suits and gave them English names, calling the pike-head a spade and the clover a club, and English packs carried that pattern to North America and eventually round the world. Two later additions completed the modern deck. The first was purely practical. Until the 1870s a player had to spread a hand widely to read the value of each card, because the symbols were scattered across its whole face; once small numbers and letters were printed in the corners of each card, a hand could be held in a tight fan. The improvement seems so obvious in retrospect that it is startling to find it took five centuries. The second addition was the joker, introduced in the United States around 1860 to act as the highest trump in the game of euchre.

Governments, meanwhile, had noticed how many packs were being sold. England taxed playing cards from 1588, and from the early eighteenth century the duty was collected in a peculiar way: one card in every pack, the ace of spades, had to be bought from the tax office, which printed it with an elaborate stamp. That is why the ace of spades in an English deck is still the decorated one, long after anybody remembers why. The arrangement also created a small criminal trade in forged aces, punishable in theory by hanging, and it survived in reduced form until the duty was abolished in 1960.

The pack has resisted every improvement offered to it since. Manufacturers have tried five suits, round cards, packs of sixty-five and cards that cannot be marked; all of them failed in the market. What survives is a fifteenth-century Egyptian structure wearing a fifteenth-century French costume, printed by the million, and still the cheapest portable machine for generating uncertainty that anyone has managed to build.`,
      questions: [
        { n: 1, type: "gap", prompt: "The earliest cards appeared in China because ______ was by then being produced cheaply.", note: "ONE WORD ONLY", answer: "paper",
          explain: "The passage states that Chinese cards 'existed because paper did' and that paper was being made cheaply enough to be thrown away. The question paraphrases 'made cheaply' as 'produced cheaply'.",
          evidence: "paper was being made cheaply enough in China",
          vocab: ["made cheaply", "produced cheaply"] },
        { n: 2, type: "gap", prompt: "The four Mamluk suits were cups, coins, swords and ______ sticks.", note: "ONE WORD ONLY", answer: "polo",
          explain: "The surviving Mamluk pack has four suits listed in the passage, and the word before 'sticks' is the one the gap needs. No paraphrase is involved — copy it exactly.",
          evidence: "cups, coins, swords and polo sticks" },
        { n: 3, type: "gap", prompt: "Affordable European packs were printed from ______.", note: "ONE WORD ONLY", answer: "woodblocks",
          explain: "The technique that made cards an everyday object was printing whole sheets from woodblocks. 'Turned cards into an everyday object' is the passage's version of 'affordable'.",
          evidence: "whole sheets were printed from woodblocks",
          vocab: ["an everyday object", "affordable"] },
        { n: 4, type: "gap", prompt: "The flat French suit signs could be put onto cards using ______.", note: "ONE WORD ONLY", answer: "stencils",
          explain: "The French silhouettes 'could be applied through stencils in a few strokes', unlike German and Italian designs, which needed a block-cutter. 'Applied' becomes 'put onto' in the question.",
          evidence: "such shapes could be applied through stencils in a few strokes",
          vocab: ["applied", "put onto"] },
        { n: 5, type: "gap", prompt: "Holding a hand in a narrow fan became possible when small numbers and letters were added to the ______ of the cards.", note: "ONE WORD ONLY", answer: "corners",
          explain: "From the 1870s the values were printed in the corners of each card, so a hand could be held in a tight fan. The question's 'narrow fan' paraphrases 'tight fan'.",
          evidence: "small numbers and letters were printed in the corners of each card",
          vocab: ["tight fan", "narrow fan"] },
        { n: 6, type: "gap", prompt: "In England the ace of spades carried an elaborate ______ proving that the duty had been paid.", note: "ONE WORD ONLY", answer: "stamp",
          explain: "The tax office sold that one card and printed it with an elaborate stamp, which is how the duty was collected. 'The duty was collected' is the passage's phrasing of 'proving the duty had been paid'.",
          evidence: "which printed it with an elaborate stamp",
          vocab: ["the duty was collected", "the duty had been paid"] },
        { n: 7, type: "tfng", prompt: "It is uncertain whether the first Chinese cards were pieces for a game or a form of money.", answer: "TRUE",
          explain: "TRUE: the passage says historians find it difficult to say which of the two the earliest cards were, and that the ideas are not really separable — exactly the uncertainty the statement describes.",
          evidence: "how difficult it is to say whether the earliest Chinese cards were tokens used in a game or the money itself",
          vocab: ["difficult to say", "uncertain"] },
        { n: 8, type: "tfng", prompt: "The court cards in the Mamluk pack were decorated with pictures of people.", answer: "FALSE",
          explain: "FALSE: the passage states directly that the Mamluk court cards are not portraits but ornamental panels bearing titles, because human figures were avoided — a head-on contradiction.",
          evidence: "the court cards are not portraits but ornamental panels bearing titles",
          vocab: ["not portraits", "pictures of people"] },
        { n: 9, type: "tfng", prompt: "Cards were banned in Italy before they were banned in France.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: Florence and Paris both appear in the list of cities that banned cards, but the passage gives no order and no comparison between countries. A shared list is not a sequence.",
          evidence: "city after city begins banning them: Florence, Basel, Paris, Barcelona" },
        { n: 10, type: "tfng", prompt: "The first European packs were too expensive for most people to own.", answer: "TRUE",
          explain: "TRUE: hand-painted, gilded packs were 'priced accordingly', and a duke's set cost as much as a good horse — a price that obviously excludes most people, as the following sentence confirms.",
          evidence: "a set made for a duke could cost as much as a good horse",
          vocab: ["cost as much as a good horse", "too expensive"] },
        { n: 11, type: "tfng", prompt: "The French suit symbols spread across Europe mainly because people found them attractive.", answer: "FALSE",
          explain: "FALSE: the passage ends the paragraph by ruling this out — 'cheapness, not beauty, decided the matter'. The French signs won on price, not looks.",
          evidence: "cheapness, not beauty, decided the matter",
          vocab: ["beauty", "attractive"] },
        { n: 12, type: "tfng", prompt: "The joker was created for use in one particular card game.", answer: "TRUE",
          explain: "TRUE: it was introduced around 1860 to act as the highest trump in euchre — a single named game, which is what 'one particular card game' means.",
          evidence: "introduced in the United States around 1860 to act as the highest trump in the game of euchre",
          vocab: ["the game of euchre", "one particular card game"] },
        { n: 13, type: "tfng", prompt: "The English tax on playing cards was removed during the nineteenth century.", answer: "FALSE",
          explain: "FALSE: the duty survived until 1960, which is the twentieth century. The statement moves the date back by a hundred years, and the passage contradicts it outright.",
          evidence: "it survived in reduced form until the duty was abolished in 1960",
          vocab: ["abolished", "removed"] },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The fox on the ring road",
      passage: `A — At three in the morning, on a stretch of ring road outside a European city, a camera trap recorded a fox trotting along the hard shoulder, pausing at a slip road, and vanishing into a hedge behind a petrol station. The animal was not lost. It was doing what tens of thousands of its kind now do every night: feeding, resting and raising young inside a landscape built entirely for people. Foxes are only the most visible case. Wild boar root through the parks of Berlin, coyotes raise litters within sight of Chicago's towers, peregrine falcons nest on office blocks in New York, and leopards hunt on the edges of Mumbai. The city, long treated in ecology as the place where nature stops, has turned out to be a habitat.

B — The reasons are not mysterious. A large city runs several degrees warmer than the countryside around it, so winters are milder and the ground rarely freezes. Food is abundant and, more importantly, predictable: bins emptied on the same evening each week, fruit trees planted as ornament, and the food residents put out on purpose. Large predators are absent and shooting is not permitted. Ecologists now sort species into three groups by their response to all this. Urban avoiders retreat as soon as the first houses appear; urban adapters, such as foxes and blackbirds, exploit gardens and edges; urban exploiters, among them pigeons, rats and house sparrows, depend on people altogether. The interesting group is the middle one, because its members are neither rescued by the city nor destroyed by it.

C — What the city takes from them is not space but connection. Ilse Brandt, an ecologist who has fitted radio collars to more than two hundred urban mammals, points out that a six-lane road with a central barrier acts less as a danger than as a barrier: her collared hedgehogs crossed one such road on eleven occasions in three years, although suitable habitat lay a hundred metres away. The consequence shows up in the animals themselves. Populations separated for even a few decades begin to lose genetic variety, and Brandt's samples from either side of one motorway are now measurably different from each other. A city, seen from the height of a hedgehog, is not one habitat but several hundred small ones, each too small to hold a population for long.

D — The remedy is to reconnect the fragments, and the vocabulary for doing so is now standard: corridors. At the expensive end are green bridges, planted overpasses wide enough to carry hedges and soil across a motorway, and underpasses built for badgers and amphibians. At the cheap end are the strips of unmown verges beside every road, the banks of railway lines, and rivers left with rough edges. Marcus Adeyemi, a transport engineer who has instrumented crossings in four countries, argues that the design details decide everything. A tunnel with a dry ledge along one wall is used many times more often than an identical tunnel that floods after rain; a green bridge narrower than thirty metres is largely ignored; and a crossing with a street lamp at its mouth may as well not have been built.

E — Cities also change their tenants. Yuki Tanaka, a biologist who has compared urban and rural foxes for fifteen years, finds that the city animals hold territories a fraction of the size, tolerate one another at much closer quarters, and are markedly bolder in the presence of people. Their skulls have begun to shift in shape, with shorter and stronger jaws suited to the food they now eat. Whether any of this amounts to domestication, as some writers cheerfully claim, Tanaka doubts. What she does insist on is that the urban animal is no longer a country animal that happens to live in town, and that studies which assume otherwise will go on producing puzzling results.

F — Not everyone is persuaded that corridors are the answer. Rosa Delgado, an economist who has costed wildlife schemes for several city governments, does not dispute that green bridges work; her objection is that each one absorbs a budget that could instead have created several hectares of rough grassland, and that the species most in need of help are rarely the ones photographed using the bridge. There are other doubts. A corridor carries whatever enters it, including disease and species nobody wanted, and residents at the far end are not always delighted: a fox in the garden is charming until it takes the chickens. Public enthusiasm, Delgado notes drily, is highest among people who do not live beside the corridor.

G — The most promising work is therefore modest. Nils Halvorsen, a city planner in Scandinavia, has spent a decade persuading his colleagues that the cheapest ecological network in any city already exists in its back gardens: a run of gardens whose fences carry small gaps at ground level is, in effect, a corridor, and it costs nothing but a saw and a conversation between neighbours. He has argued the same for cemeteries, allotments and school playing fields, mown once a year instead of weekly. None of it looks like conservation, and that may be the point. The fox on the ring road was never waiting to be rescued; it was waiting for the gaps.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a comparison between what one expensive scheme costs and what the same money could buy", answer: "F",
          explain: "Paragraph F carries Delgado's objection: each green bridge 'absorbs a budget that could instead have created several hectares of rough grassland' — one scheme's cost set against an alternative use of the money.",
          evidence: "absorbs a budget that could instead have created several hectares of rough grassland",
          vocab: ["absorbs a budget", "what one scheme costs"] },
        { n: 15, type: "match", group: "info", prompt: "examples of large wild mammals established in named cities", answer: "A",
          explain: "Paragraph A lists boar in Berlin, coyotes in Chicago and leopards outside Mumbai — large mammals attached to named cities. The falcons in the same list are birds, so the mammals are the clue.",
          evidence: "Wild boar root through the parks of Berlin, coyotes raise litters within sight of Chicago's towers" },
        { n: 16, type: "match", group: "info", prompt: "figures showing how seldom animals moved from one side of a road to the other", answer: "C",
          explain: "Paragraph C gives Brandt's count: hedgehogs crossed the road eleven times in three years despite good habitat opposite. That number is the 'figures' the question asks for.",
          evidence: "crossed one such road on eleven occasions in three years",
          vocab: ["eleven occasions in three years", "how seldom"] },
        { n: 17, type: "match", group: "info", prompt: "a detail of construction that greatly increases how often a crossing is used", answer: "D",
          explain: "Paragraph D reports Adeyemi's finding that a tunnel with a dry ledge is used many times more often than one that floods — a construction detail driving usage.",
          evidence: "A tunnel with a dry ledge along one wall is used many times more often",
          vocab: ["design details", "detail of construction"] },
        { n: 18, type: "match", group: "info", prompt: "an explanation of why food is easier for animals to find in cities", answer: "B",
          explain: "Paragraph B explains the food supply: bins on a fixed evening, ornamental fruit trees and deliberate feeding by residents. 'Abundant and predictable' is the passage's version of 'easier to find'.",
          evidence: "Food is abundant and, more importantly, predictable",
          vocab: ["abundant and predictable", "easier to find"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Roads, corridors and city wildlife",
            lines: [
              "For a small mammal, a wide road is less a threat to life than a {{19}}, and populations that are cut off from one another in this way slowly lose genetic {{20}}.",
              "Planners answer the problem with corridors: planted bridges over a motorway, tunnels beneath it, and, most cheaply of all, the unmown {{21}} that run alongside every road.",
              "The cheapest network of all is already in place in people's gardens, provided the fences between them are pierced by small {{22}} at ground level.",
            ],
          },
          answer: "barrier",
          explain: "Brandt's point is that a six-lane road 'acts less as a danger than as a barrier'. The summary keeps the same contrast but paraphrases 'danger' as 'threat to life', so the missing noun is 'barrier'.",
          evidence: "acts less as a danger than as a barrier",
          vocab: ["danger", "threat to life"] },
        { n: 20, type: "gap", group: "sum2", answer: "variety",
          explain: "Separated populations 'begin to lose genetic variety'. The summary paraphrases 'separated' as 'cut off from one another' but keeps the two-word phrase 'genetic variety' intact.",
          evidence: "begin to lose genetic variety",
          vocab: ["separated", "cut off from one another"] },
        { n: 21, type: "gap", group: "sum2", answer: "verges",
          explain: "The cheap end of the corridor list is 'the strips of unmown verges beside every road' — the summary changes 'beside' to 'alongside' but keeps 'unmown' as the cue word before the gap.",
          evidence: "the strips of unmown verges beside every road",
          vocab: ["beside every road", "alongside every road"] },
        { n: 22, type: "gap", group: "sum2", answer: "gaps",
          explain: "Halvorsen's network works when 'fences carry small gaps at ground level'. The summary rewrites 'carry' as 'are pierced by', leaving the concrete noun 'gaps' for the gap.",
          evidence: "whose fences carry small gaps at ground level",
          vocab: ["carry small gaps", "pierced by small gaps"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Ilse Brandt",
            "Marcus Adeyemi",
            "Yuki Tanaka",
            "Rosa Delgado",
            "Nils Halvorsen",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Whether a wildlife crossing works depends on small features of its design.", answer: "B",
          explain: "Adeyemi, the transport engineer, is the one who instrumented crossings and concluded that 'the design details decide everything', giving the dry ledge and the street lamp as examples.",
          evidence: "argues that the design details decide everything",
          vocab: ["design details decide everything", "depends on small features"] },
        { n: 24, type: "match", group: "people", prompt: "Animals in cities can no longer be treated as the same creatures as their rural relatives.", answer: "C",
          explain: "Tanaka compared urban and rural foxes and insists the urban animal 'is no longer a country animal that happens to live in town' — precisely the statement's claim.",
          evidence: "the urban animal is no longer a country animal that happens to live in town",
          vocab: ["country animal", "rural relatives"] },
        { n: 25, type: "match", group: "people", prompt: "Money spent on major crossings would help more wildlife if it were used in other ways.", answer: "D",
          explain: "Delgado, the economist, accepts that green bridges work but objects that the same budget could have created several hectares of grassland instead — a better use of the money.",
          evidence: "her objection is that each one absorbs a budget",
          vocab: ["absorbs a budget", "money spent"] },
        { n: 26, type: "match", group: "people", prompt: "Busy roads split animal populations into separate groups.", answer: "A",
          explain: "Brandt's radio-collar work shows animals rarely crossing a six-lane road and populations on either side drifting apart genetically — the splitting the statement describes.",
          evidence: "Populations separated for even a few decades",
          vocab: ["populations separated", "split into separate groups"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Why an hour is never an hour",
      passage: `An hour on a clock is a fixed quantity, guaranteed by the vibrations of a caesium atom and identical in a dentist's waiting room and on the last afternoon of a holiday. An hour in the head is nothing of the kind. It stretches while you wait for a delayed train and contracts while you talk to somebody you like; it crawls through a familiar week and then disappears across a decade. This mismatch is usually treated as a charming failure of the mind, a small unreliability to be apologised for. It is better understood as the visible output of a system that was never built to measure time in the first place.

Vision has eyes and hearing has ears; time has nothing. There is no organ that receives duration, and no single clock in the brain that all the other regions consult. What the brain does instead is construct a sense of duration out of material gathered for quite different purposes — attention, memory, the state of the body — which is why the answer to the question how long was that? depends on when it is asked. Psychologists therefore divide the question in two. Prospective judgements are made while the interval is still running, by somebody who knows a judgement is coming. Retrospective judgements are made afterwards, out of whatever the episode happened to leave behind. The two use different raw materials, and they routinely disagree.

While an interval is running, the currency is attention. Every moment spent noticing time — checking the clock, registering the wait — is added to the total, so the more of your attention time receives, the longer the interval feels. Boredom is the pure case: nothing else is competing for notice, so the mind measures time itself and the hour swells. Absorption is the mirror image. A task that consumes all the attention available leaves none for timekeeping, and the afternoon is gone before anyone notices. The folk wisdom is exact: a watched pot really does boil more slowly, for the watcher.

Afterwards, the currency changes. A period that has ended can only be judged by what remains of it, and what remains is events. A week of travel, in which nothing was familiar and every hour laid down something new, is remembered as long. A week at a desk, in which each day resembled the last and the brain sensibly stored one copy rather than five, shrinks to almost nothing in recall. This is the origin of the holiday paradox. A good holiday passes quickly while it is happening, because attention is fully occupied, and is remembered as enormous, because it left so much behind. The clock, meanwhile, recorded the same fourteen days throughout.

The same machinery accounts for the complaint that the years accelerate with age. The popular explanation is proportional: a year is a tenth of the life of a ten-year-old and a fiftieth of a fifty-year-old's, so it must feel smaller. The theory is neat, and it is very poorly supported; when researchers actually ask people to judge durations, the ratio predicts almost nothing about their answers. The memory account does better. Childhood and early adulthood are crowded with events that happen exactly once — a first journey alone, a first job — while later decades tend to be organised, repetitive and therefore efficiently compressed. Time is not passing faster. It is being recorded more thinly, and the thinness is felt only in retrospect.

Fear seems, at first, to break the pattern. People who have fallen from a height report that the seconds opened out and everything moved slowly, and the obvious interpretation is that the brain speeds up under threat. One researcher tested the idea directly by dropping volunteers, safely, from a tower while they wore a device displaying digits that flickered slightly too fast to read. If perception had genuinely accelerated, the falling volunteers should have been able to read the digits. None of them could. They did, however, overestimate their own fall by about a third afterwards. The slow motion, in other words, was written into the memory rather than experienced in the moment: fear does not stretch the present, it thickens the record.

The state of the body supplies the last ingredient. Raise a person's temperature and their estimates of duration lengthen; cool them and the estimates shrink. Drugs that increase dopamine make intervals seem longer, and the timing difficulties of Parkinson's disease point at the same circuitry. None of this yields the single central clock that early researchers hoped to find. It suggests, rather, that duration is a reading taken off several instruments at once, and that they can be pushed apart by fever, fright or a dull afternoon.

There is a practical conclusion here, and it is not the one usually drawn. Advice about time is nearly always advice about the clock: rise earlier, waste fewer minutes, fit more into each hour. But the hour is not the unit anyone actually lives in. If a life feels short in retrospect, the cause is not a shortage of hours but a shortage of distinguishable ones, and the remedy is not efficiency — which smooths experience into repetition — but novelty, which is the only thing memory reliably counts. A new route to work is worth more, by this reckoning, than a faster one.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer suggests that the difference between clock time and felt time", options: ["A is a small fault that most people learn to correct", "B reveals how the mind's handling of duration actually works", "C appears mainly in situations that people find unpleasant", "D has only recently been taken seriously by scientists"], answer: "B",
          explain: "The writer rejects the 'charming failure' reading and calls the mismatch the visible output of a system built for another purpose — that is, it shows the mechanism working, not failing. A echoes 'unreliability' from the text but reverses the point.",
          evidence: "the visible output of a system that was never built to measure time in the first place",
          vocab: ["the visible output of a system", "reveals how the mind's handling of duration works"] },
        { n: 28, type: "mcq", prompt: "Why do judgements made during an interval often differ from judgements made afterwards?", options: ["A People forget how they felt while the interval was running", "B Only one of the two kinds is made by a central brain clock", "C They are built out of different kinds of information", "D Participants know in advance that they will be questioned"], answer: "C",
          explain: "The passage states that prospective and retrospective judgements 'use different raw materials, and they routinely disagree'. Option D repeats a phrase from the definition of prospective judgements, which is why it is tempting.",
          evidence: "The two use different raw materials, and they routinely disagree",
          vocab: ["different raw materials", "different kinds of information"] },
        { n: 29, type: "mcq", prompt: "What did the experiment in which volunteers fell from a tower show?", options: ["A The brain samples the world more quickly when it is frightened", "B People cannot judge short intervals at all while under stress", "C Frightening events are afterwards thought to have lasted less time", "D The impression of slow motion is produced when the event is recalled"], answer: "D",
          explain: "Nobody could read the flickering digits, so perception did not accelerate; yet the fall was later overestimated. The writer concludes the slow motion 'was written into the memory rather than experienced in the moment'. C reverses the overestimate.",
          evidence: "was written into the memory rather than experienced in the moment",
          vocab: ["written into the memory", "produced when the event is recalled"] },
        { n: 30, type: "mcq", prompt: "What is the writer's view of the proportional explanation for the years seeming to speed up?", options: ["A It is appealing but the evidence does not support it", "B It holds for children but not for older adults", "C It has been replaced by an explanation based on body temperature", "D It is correct as far as it goes but leaves much unexplained"], answer: "A",
          explain: "The writer calls the theory 'neat' and then says it is very poorly supported, since the ratio predicts almost nothing when people are actually tested. D sounds generous but the passage rejects the theory rather than extending it.",
          evidence: "The theory is neat, and it is very poorly supported",
          vocab: ["neat", "appealing"] },
        { n: 31, type: "ynng", prompt: "Timing in the brain depends on one central mechanism that all other regions refer to.", answer: "NO",
          explain: "NO: the writer states there is 'no single clock in the brain that all the other regions consult', and returns to the point later by rejecting the single central clock. The statement is contradicted twice.",
          evidence: "no single clock in the brain that all the other regions consult",
          vocab: ["no single clock", "one central mechanism"] },
        { n: 32, type: "ynng", prompt: "A period feels longer at the time when nothing else is demanding one's attention.", answer: "YES",
          explain: "YES: boredom is described as the pure case — with nothing competing for notice the mind measures time itself and 'the hour swells', which is the statement's 'feels longer at the time'.",
          evidence: "nothing else is competing for notice, so the mind measures time itself and the hour swells",
          vocab: ["competing for notice", "demanding one's attention"] },
        { n: 33, type: "ynng", prompt: "Children estimate short intervals less accurately than adults do.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: childhood is discussed only as a period rich in first-time events, and the ratio theory is tested on people in general. The accuracy of children's estimates is never compared with adults'.",
          evidence: "when researchers actually ask people to judge durations, the ratio predicts almost nothing about their answers" },
        { n: 34, type: "ynng", prompt: "The repetitive character of adult life is the main reason later years feel compressed.", answer: "YES",
          explain: "YES: the writer prefers the memory account, in which later decades are 'organised, repetitive and therefore efficiently compressed' while early life is full of unrepeatable events.",
          evidence: "later decades tend to be organised, repetitive and therefore efficiently compressed",
          vocab: ["efficiently compressed", "feel compressed"] },
        { n: 35, type: "ynng", prompt: "Using each hour more efficiently is the best way to make a life feel longer.", answer: "NO",
          explain: "NO: the closing paragraph says the remedy is 'not efficiency — which smooths experience into repetition — but novelty'. Efficiency is named and rejected, so this is a contradiction rather than an omission.",
          evidence: "the remedy is not efficiency",
          vocab: ["efficiency", "using each hour more efficiently"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "measures how much of a period the mind has kept.",
            "makes an experience feel longer while it is being lived through.",
            "shows that danger does not really speed up perception.",
            "leaves almost nothing behind to be remembered.",
            "explains why a holiday feels short at the time and long afterwards.",
            "proves that older people have weaker memories than the young.",
            "should be judged by what it leaves behind rather than by the clock.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Deliberately noticing the passing of time", answer: "B",
          explain: "Attention is the currency while an interval runs: the more attention time receives, the longer it feels. Ending B states this as an effect on the experience as it is lived.",
          evidence: "the more of your attention time receives, the longer the interval feels",
          vocab: ["the longer the interval feels", "feel longer while it is being lived through"] },
        { n: 37, type: "match", group: "ends", prompt: "A judgement of duration made after an interval has ended", answer: "A",
          explain: "Such a judgement can only work from what remains, and what remains is events — so it measures what the mind has stored. Ending A paraphrases 'what remains of it' as 'how much the mind has kept'.",
          evidence: "A period that has ended can only be judged by what remains of it",
          vocab: ["what remains of it", "how much the mind has kept"] },
        { n: 38, type: "match", group: "ends", prompt: "A week in which every day resembles the last", answer: "D",
          explain: "The desk week shrinks to almost nothing in recall because the brain stored a single copy of the repeated day — ending D, 'leaves almost nothing behind to be remembered'. Ending E describes the holiday, not the routine.",
          evidence: "shrinks to almost nothing in recall",
          vocab: ["shrinks to almost nothing in recall", "almost nothing behind to be remembered"] },
        { n: 39, type: "match", group: "ends", prompt: "The volunteers' inability to read the flickering digits", answer: "C",
          explain: "The test was designed so that genuinely faster perception would have made the digits readable. Since none could read them, perception had not accelerated — ending C.",
          evidence: "the falling volunteers should have been able to read the digits",
          vocab: ["perception had genuinely accelerated", "speed up perception"] },
        { n: 40, type: "match", group: "ends", prompt: "In the writer's view, time that has been well spent", answer: "G",
          explain: "The final paragraph rejects clock-based advice, arguing that the hour is not the unit anyone lives in and that novelty, which memory records, is what counts — ending G.",
          evidence: "But the hour is not the unit anyone actually lives in",
          vocab: ["the unit anyone actually lives in", "rather than by the clock"] },
      ],
    },
  ],
};
