// Smart LC Practice Set 13 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET13_READING = {
  id: "pset13-reading",
  bookId: "pset13",
  title: "Practice Set 13 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The lock and key",
      passage: `The oldest lock anybody has found was lifted from the ruins of Nineveh, in what is now northern Iraq, and it is roughly four thousand years old. It is not a delicate object. The whole mechanism is cut from wood, the bolt is a heavy beam, and the key is a bar the size of a forearm. Yet anyone who opened a front door this morning used its descendant. Egyptian carpenters, working at roughly the same period, had arrived at the same idea, and the idea is a very good one: instead of guarding a door with strength alone, guard it with a shape that only one person possesses.

The Egyptian lock worked like this. A bolt slid across the door, and above the bolt sat a housing holding several loose pins. When the bolt was pushed home, the pins dropped into matching holes drilled along it, and the bolt could no longer move. The key was a bar with pegs standing up along its length, arranged to match the pattern of the pins. Pushed into a slot and lifted, it raised every pin clear of the bolt at once, and the door opened. Two principles were established there and never abandoned: the obstacle should be several separate pieces rather than one, and the key should carry a code rather than force.

The Romans made two changes that mattered. First, they built locks from iron and bronze instead of wood, so the parts could be smaller and finer. Second, they invented the ward, a set of fixed obstructions inside the case, shaped so that only a key cut with matching notches could turn far enough to move the bolt. Roman keys shrank until some were small enough to be worn on the finger as a ring. A visible key announced that its owner had a strongbox somewhere, and therefore something worth putting in it.

For the next thousand years European locksmiths mostly elaborated what the Romans had left them. Wards grew into mazes of curling metal, cases were engraved and gilded, and a great house might own a lock that was as much furniture as security. The craftsmanship was often superb, and some of these cases sit in museums today. The trouble is that a ward tests the shape of the key's edge and nothing else. A thief who filed away everything except the outer rim of a blank had a key that slipped past the wards of an entire household — the tool later known as the skeleton key. Medieval locks looked formidable and were, in the main, an advertisement.

Real improvement came in a rush at the end of the eighteenth century. In 1778 the English locksmith Robert Barron patented the double-acting lever tumbler, in which each internal lever had to be raised to exactly the right height: lift one too far and the bolt stayed shut just as firmly as if it had not been lifted at all. Six years later Joseph Bramah went further still, and then did something no engineer had done before. He put his new lock in his shop window in London beside a printed card promising two hundred guineas to anybody who could open it. The card stayed there, undisturbed, for sixty-seven years. In 1851 an American locksmith, Alfred Hobbs, took up the challenge and worked at the lock for fifty-one hours spread over sixteen days before it yielded, and Bramah's firm paid him the money.

Between those two dates came the cleverest idea of the century, which was not about resisting attack at all. In 1818 Jeremiah Chubb patented what he called the detector lock. If a lever inside was lifted too high by a pick or by a wrong key, the mechanism froze and stayed frozen, so the owner arrived to find the door jammed and knew at once that somebody had been at it. The government tested the claim by offering a convict, a locksmith by trade, his freedom and a hundred pounds if he could open a Chubb lock. He was given the lock, his own tools and three months. He failed.

The lock most of us actually carry a key to was designed in the United States in the 1860s by Linus Yale junior, who went back to the Egyptian pin and made it small. His father had built bank locks on a related principle. His mechanism sits inside a narrow cylinder set into the door, and the key is a flat strip whose serrated edge pushes each spring-loaded pin to precisely the height at which the cylinder can rotate. Two things made the design win. It was compact enough for any door, and its keys could be stamped out by machine in enormous numbers at very low cost, which no hand-filed lever key ever could.

Since then the direction of travel has been away from metal altogether. Combination locks replaced the key with a number held in the owner's memory; hotels replaced the number with a plastic card that can be cancelled the moment a guest leaves; a modern car recognises a code sent from a fob or a telephone. The bolt is still a bolt, and it still slides. What has changed is that a shape which once had to be carried in the hand can now be sent through the air — and a shape sent through the air can be copied, cancelled and, of course, stolen without anybody going near the door.`,
      questions: [
        { n: 1, type: "gap", prompt: "The lock found at Nineveh was made entirely of ______.", note: "ONE WORD ONLY", answer: "wood",
          explain: "The passage says the whole mechanism of the Nineveh lock is cut from wood — 'entirely' in the question matches 'the whole mechanism' in the text.",
          evidence: "The whole mechanism is cut from wood",
          vocab: ["the whole mechanism", "entirely"] },
        { n: 2, type: "gap", prompt: "Some Roman keys were small enough to be worn on the finger as a ______.", note: "ONE WORD ONLY", answer: "ring",
          explain: "Roman keys shrank until some could be worn on the finger as a ring. The wording round the gap is almost identical, so this is a pure scanning question.",
          evidence: "small enough to be worn on the finger as a ring" },
        { n: 3, type: "gap", prompt: "In Barron's design, every ______ inside the lock had to be lifted to precisely the correct height.", note: "ONE WORD ONLY", answer: "lever",
          explain: "Barron's double-acting lever tumbler required each internal lever to be raised to exactly the right height. 'Exactly' becomes 'precisely' and 'raised' becomes 'lifted'.",
          evidence: "each internal lever had to be raised to exactly the right height",
          vocab: ["raised to exactly the right height", "lifted to precisely the correct height"] },
        { n: 4, type: "gap", prompt: "Bramah offered a reward of two hundred ______ to anyone who could open the lock in his window.", note: "ONE WORD ONLY", answer: "guineas",
          explain: "The printed card in Bramah's shop window promised two hundred guineas. The number in the question takes you straight to the sentence; the noun after it is the answer.",
          evidence: "promising two hundred guineas to anybody who could open it",
          vocab: ["promising", "offered a reward"] },
        { n: 5, type: "gap", prompt: "To test Chubb's lock, the authorities offered a ______ his freedom and a sum of money.", note: "ONE WORD ONLY", answer: "convict",
          explain: "The government offered a convict who was a locksmith by trade his freedom and a hundred pounds. 'The authorities' paraphrases 'the government'.",
          evidence: "offering a convict, a locksmith by trade, his freedom",
          vocab: ["the government", "the authorities"] },
        { n: 6, type: "gap", prompt: "Yale's pins are held inside a narrow ______ that turns when the key is correct.", note: "ONE WORD ONLY", answer: "cylinder",
          explain: "Yale's mechanism sits inside a narrow cylinder set into the door, and the serrated key raises the pins to the height at which that cylinder can rotate.",
          evidence: "His mechanism sits inside a narrow cylinder set into the door",
          vocab: ["can rotate", "turns"] },
        { n: 7, type: "tfng", prompt: "Locks of a similar design appeared in Egypt at about the same time as the one found at Nineveh.", answer: "TRUE",
          explain: "TRUE: Egyptian carpenters were working at roughly the same period and had arrived at the same idea — 'the same idea' is the question's 'similar design'.",
          evidence: "Egyptian carpenters, working at roughly the same period, had arrived at the same idea",
          vocab: ["roughly the same period", "about the same time"] },
        { n: 8, type: "tfng", prompt: "Roman locks were built from the same materials as the locks that came before them.", answer: "FALSE",
          explain: "FALSE: the Romans built locks from iron and bronze instead of wood, so the materials changed. 'Instead of' signals the contradiction.",
          evidence: "they built locks from iron and bronze instead of wood",
          vocab: ["instead of wood", "the same materials"] },
        { n: 9, type: "tfng", prompt: "Medieval locks were less secure than their appearance suggested.", answer: "TRUE",
          explain: "TRUE: the writer says they looked formidable but were mainly an advertisement, and explains that a filed-down blank defeated the wards of a whole household.",
          evidence: "Medieval locks looked formidable and were, in the main, an advertisement",
          vocab: ["looked formidable", "their appearance suggested"] },
        { n: 10, type: "tfng", prompt: "Barron's lever lock cost more to make than the warded locks it replaced.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage describes how Barron's lock worked but says nothing at all about what it cost to produce. Price is discussed only much later, for Yale's keys.",
          evidence: "In 1778 the English locksmith Robert Barron patented the double-acting lever tumbler" },
        { n: 11, type: "tfng", prompt: "Hobbs opened Bramah's lock in one continuous attempt.", answer: "FALSE",
          explain: "FALSE: he worked at it for fifty-one hours spread over sixteen days, which contradicts 'one continuous attempt' directly.",
          evidence: "worked at the lock for fifty-one hours spread over sixteen days",
          vocab: ["spread over sixteen days", "one continuous attempt"] },
        { n: 12, type: "tfng", prompt: "Chubb's lock was intended to show the owner that someone had tampered with it.", answer: "TRUE",
          explain: "TRUE: if the mechanism froze, the owner found the door jammed and knew immediately that somebody had been at it — exactly the purpose the statement describes.",
          evidence: "knew at once that somebody had been at it",
          vocab: ["somebody had been at it", "someone had tampered with it"] },
        { n: 13, type: "tfng", prompt: "Yale's keys were more expensive to produce than lever keys.", answer: "FALSE",
          explain: "FALSE: Yale's keys could be machine-stamped in enormous numbers at very low cost, which no hand-filed lever key could match — the opposite of more expensive.",
          evidence: "stamped out by machine in enormous numbers at very low cost",
          vocab: ["at very low cost", "more expensive"] },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Room for the bicycle",
      passage: `A — For most of the twentieth century the bicycle was treated as a machine that people would grow out of. In 1950 something like half of all journeys inside Dutch towns were made on two wheels; twenty-five years later the share had fallen to a fifth, and the streets that had carried children to school were carrying cars instead. What reversed the decline was not a change of taste but a change of policy. Rising numbers of child deaths on the roads produced angry street protests, the oil shock of 1973 made fuel expensive overnight, and Dutch and Danish cities began to rebuild their streets around the bicycle. The Dutch protest movement even had a name, Stop de Kindermoord, and what it asked for was paths rather than promises; within a decade the money for them had been written into the national transport budget. Today about a third of journeys in Copenhagen and close to half of those in central Amsterdam are made by bicycle, while in most other European and North American cities the figure sits stubbornly at one or two per cent.

B — That gap is not explained by weather, by hills or by national character, all of which have been tested and found wanting. What predicts cycling is a single measurable thing: whether an ordinary person, with no special courage and possibly a child on the back, can travel from home to a destination without ever sharing space with fast traffic. Surveys in a dozen countries divide the adult population in much the same way. A small group will cycle whatever the conditions, a smaller group never will, and around sixty per cent describe themselves as interested but concerned. Campaigns urging people to cycle move that group hardly at all. Physical separation from motor traffic moves it a great deal.

C — Separation alone, however, is not enough, as the transport engineer Mateo Ferreira has spent fifteen years demonstrating. A protected lane that stops short at a busy roundabout, he argues, is worse than useless, because it delivers an inexperienced rider to the most dangerous point of the journey. His modelling of a dozen mid-sized cities shows that the number of riders does not rise smoothly as lanes are added; it stays flat, sometimes for years, and then climbs steeply once the connected network becomes dense enough for a typical household to reach one within about four hundred metres. A network, as he likes to put it, is not the sum of its lanes.

D — The safety argument has a curious feature that non-cyclists find hard to believe. The epidemiologist Ingrid Halvorsen has assembled data from more than sixty cities showing that as the number of people cycling doubles, the risk to each individual rider falls by roughly a third: drivers who expect bicycles behave differently around them. Her work also locates the danger precisely. The great majority of serious collisions happen at junctions rather than on the stretches between them, which is where design effort and money ought to go. And she is careful to add the comparison that most reporting omits: measured across a population, the health gained from regular cycling outweighs the risk of injury by something like twenty to one.

E — A journey, though, does not end when the rider stops pedalling, and this is the half of the problem that planners forget. The planner Ana Duarte points out that theft is the reason most often given by people who have given up cycling — more often than rain, hills or traffic. A bicycle that must be carried up three flights of stairs, or left chained to a lamp post overnight, is a bicycle that will eventually not be replaced. Dutch railway stations now hold guarded underground parking for tens of thousands of machines, and new apartment blocks in several countries are required to include secure storage at ground level. The largest of these garages, beneath a station square in Utrecht, runs to three storeys and keeps its own repair shop. These are unglamorous provisions, and they change behaviour more reliably than any advertising campaign.

F — Opposition, where it appears, comes most loudly from shopkeepers, who fear that removing car parking will remove their customers. The economist Nathan Weiss tested that fear directly, interviewing merchants and their customers on the same streets in four cities. Shopkeepers estimated that around two-thirds of their trade arrived by car; the customers' own answers put the true figure at a quarter or less, with the rest arriving on foot, by bicycle or by bus. Weiss then followed retail takings on streets where lanes had replaced parking, and found that spending rose in most cases and fell in none — partly because a space that holds one car holds ten bicycles.

G — None of which settles the harder question of who the new streets are for. The geographer Yuki Tanaka has mapped the order in which cycle lanes get built, and the pattern is consistent: the earliest and best provision appears in central, comparatively wealthy districts, while the outer neighbourhoods whose residents would gain most from cheap transport wait longest. In two of the cities she examined, the outermost districts still had no protected route fifteen years after the first one opened downtown. She also notes how narrowly the cyclist is still imagined. Electric bicycles flatten hills and shrink distances for older riders, and cargo bicycles carry the shopping and the children that were supposed to make cycling impossible; yet both are largely absent from the plans she reviews. A city that builds only for the fit young commuter, she concludes, will get the cyclists it designed for, and then wonder why there are so few of them.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "an explanation of why new cycle routes may fail to attract riders", answer: "C",
          explain: "Paragraph C is where Ferreira explains that a lane ending at a roundabout leaves a rider at the most dangerous point, and that numbers stay flat until the network is dense.",
          evidence: "A protected lane that stops short at a busy roundabout, he argues, is worse than useless",
          vocab: ["worse than useless", "fail to attract riders"] },
        { n: 15, type: "match", group: "info", prompt: "figures for the proportion of urban journeys now made by bicycle", answer: "A",
          explain: "Paragraph A gives the percentages: about a third of journeys in Copenhagen, nearly half in central Amsterdam, one or two per cent elsewhere.",
          evidence: "about a third of journeys in Copenhagen and close to half of those in central Amsterdam",
          vocab: ["journeys", "urban journeys"] },
        { n: 16, type: "match", group: "info", prompt: "a mistaken belief held by local businesses about their customers", answer: "F",
          explain: "Paragraph F reports that shopkeepers thought two-thirds of their trade came by car while customers' own answers showed a quarter or less — a measured error of belief.",
          evidence: "Shopkeepers estimated that around two-thirds of their trade arrived by car",
          vocab: ["shopkeepers", "local businesses"] },
        { n: 17, type: "match", group: "info", prompt: "a statement of where most serious accidents involving cyclists occur", answer: "D",
          explain: "Paragraph D locates the danger: the great majority of serious collisions happen at junctions rather than on the stretches between them.",
          evidence: "The great majority of serious collisions happen at junctions",
          vocab: ["collisions", "accidents"] },
        { n: 18, type: "match", group: "info", prompt: "a criticism of the order in which facilities are provided across a city", answer: "G",
          explain: "Paragraph G carries Tanaka's mapping of the building order: the best provision comes first in wealthy central districts while outer neighbourhoods wait longest.",
          evidence: "the earliest and best provision appears in central, comparatively wealthy districts",
          vocab: ["wait longest", "the order in which facilities are provided"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — What actually persuades people to cycle",
            lines: [
              "Persuasion campaigns achieve very little. The condition that the hesitant majority insists on is physical {{19}} from fast-moving traffic.",
              "Even protected lanes fail if they are isolated: Ferreira's modelling shows that rider numbers only climb once the connected {{20}} is dense enough for households to reach it easily.",
              "Money spent on design belongs at {{21}}, since that is where most serious collisions occur, rather than on the stretches in between.",
              "Finally, the end of the trip matters too. Because {{22}} is the reason people most often give for abandoning cycling, guarded parking and secure storage in new buildings change behaviour more dependably than advertising.",
            ],
          },
          answer: "separation",
          explain: "Paragraph B closes by contrasting campaigns with 'physical separation from motor traffic', which is what actually moves the hesitant group. The summary repeats 'physical' as the cue.",
          evidence: "Physical separation from motor traffic moves it a great deal.",
          vocab: ["motor traffic", "fast-moving traffic"] },
        { n: 20, type: "gap", group: "sum2", answer: "network",
          explain: "Ferreira's point is that numbers climb steeply only once the connected network is dense enough to be reached from a typical household — 'a network is not the sum of its lanes'.",
          evidence: "once the connected network becomes dense enough",
          vocab: ["a typical household", "households"] },
        { n: 21, type: "gap", group: "sum2", answer: "junctions",
          explain: "Halvorsen's data show that most serious collisions happen at junctions, so that is where design effort and money ought to go — the summary paraphrases 'design effort and money'.",
          evidence: "which is where design effort and money ought to go",
          vocab: ["design effort and money", "money spent on design"] },
        { n: 22, type: "gap", group: "sum2", answer: "theft",
          explain: "Duarte identifies theft as the reason given most often by people who stop cycling, ahead of rain, hills or traffic — hence the emphasis on guarded parking and storage.",
          evidence: "theft is the reason most often given by people who have given up cycling",
          vocab: ["given up cycling", "abandoning cycling"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Mateo Ferreira",
            "Nathan Weiss",
            "Ana Duarte",
            "Yuki Tanaka",
            "Ingrid Halvorsen",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "The danger to each cyclist decreases as more people take up cycling.", answer: "E",
          explain: "The epidemiologist Halvorsen assembled data from over sixty cities showing that when the number of riders doubles, individual risk falls by about a third.",
          evidence: "the risk to each individual rider falls by roughly a third",
          vocab: ["risk to each individual rider", "danger to each cyclist"] },
        { n: 24, type: "match", group: "people", prompt: "Traders are wrong about how their customers reach them.", answer: "B",
          explain: "The economist Weiss compared what shopkeepers assumed with what customers reported and found the car share was overstated by a factor of two or three.",
          evidence: "the customers' own answers put the true figure at a quarter or less",
          vocab: ["shopkeepers estimated", "traders are wrong"] },
        { n: 25, type: "match", group: "people", prompt: "Cycle routes tend to be built last in the areas that need them most.", answer: "D",
          explain: "The geographer Tanaka mapped the building order and found the outer neighbourhoods that would gain most from cheap transport are the ones that wait longest.",
          evidence: "the outer neighbourhoods whose residents would gain most from cheap transport wait longest",
          vocab: ["wait longest", "built last"] },
        { n: 26, type: "match", group: "people", prompt: "What happens once a rider arrives deters people as much as conditions on the road.", answer: "C",
          explain: "The planner Duarte insists that a journey does not end when the rider stops pedalling: storage and theft decide whether a bicycle is replaced when it goes.",
          evidence: "A journey, though, does not end when the rider stops pedalling",
          vocab: ["stops pedalling", "once a rider arrives"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The uses of looking back",
      passage: `Nostalgia entered the language as a disease. In 1688 a Swiss medical student named Johannes Hofer, casting about for a name for the wasting misery he saw in mercenary soldiers posted far from their valleys, joined two Greek words meaning return and pain. His patients would not eat, could not sleep and sometimes died, and Hofer was in no doubt that he was describing a disorder of the body. For the next two centuries physicians agreed with him and merely argued about the mechanism, blaming the noise of cowbells, the pressure of mountain air and, eventually, a lesion somewhere in the brain. Doctors were expected to recognise the signs on sight, and the diagnosis kept its place in the medical manuals for well over a hundred years. When medicine finally gave the condition up, psychiatry took it over, and for much of the twentieth century nostalgia was classified as a variety of depression. Nobody thought to ask what it might be for.

That question was finally put in the late 1990s, when a group of social psychologists began, in effect, to run the emotion in a laboratory. Their method is simple and has been repeated in dozens of variations. Half the participants are asked to bring to mind an event from their own past that makes them feel nostalgic and to write about it for a few minutes; the other half write about an ordinary event from last week. Everyone then completes the same measures. Those measures are ordinary instruments borrowed from elsewhere in the discipline: agreement with statements about liking oneself, about having people to turn to, about a life that hangs together. The differences are consistent. People who have just been nostalgic report higher self-esteem, a stronger sense of being connected to other people, and a firmer sense that their life is meaningful and continuous — that the person remembering and the person remembered are recognisably the same.

What sets the emotion off has been mapped almost as carefully. Loneliness, boredom and a sense of being adrift are the psychological triggers; music and smell the sensory ones. Of the two, smell is the more reliable, for anatomical reasons: the nerve that carries it reaches the memory system by an unusually short route. There is also a body of work on cold: people in chilly rooms report more nostalgia than people in warm ones, and participants asked to recall a nostalgic memory subsequently judged the same room as warmer and kept a hand in iced water for longer. It is an appealing set of findings and it is quoted everywhere, though the samples are small and the replications uneven, so a degree of caution is in order that the studies rarely receive.

The internal shape of the emotion explains a good deal. Nostalgia is not simple pleasure. When researchers code what people actually write, the narratives are overwhelmingly positive but almost never purely so; a thread of loss runs through them, because the remembered scene is by definition unavailable. The structure is uniform: the writer stands at the centre of the story, surrounded by people who mattered, and the episode typically moves from difficulty towards warmth or resolution. Participants asked instead for an ordinary pleasant memory produce something recognisably different: a scene with fewer people in it, and no movement from difficulty towards anything. That shape is the clue to its function. A nostalgic memory is not a fact about the past but a piece of evidence about the self, and the evidence it offers is that one has been loved and has come through something. Delivered at the moment when a person feels least sure of both, it is difficult to think of a better-designed intervention.

The obvious objection is that all of this amounts to living backwards. If the past is so much more agreeable than the present, why would anyone act? Critics point to studies linking a general tendency towards nostalgia with rumination and low mood, and the correlation is real. But it dissolves under a distinction the critics tend to skip. Measuring how often somebody feels nostalgic tells you mainly about their circumstances, since the emotion arrives when things are difficult; measuring what happens after a nostalgic episode tells you what it does. On the second measure the picture reverses. Participants who have just been nostalgic report greater optimism, describe themselves as more willing to take on demanding goals, show more interest in unfamiliar people and give more money to strangers. The emotion looks less like a retreat than a supply.

The serious criticism is political. Nostalgia for one's own life and nostalgia on behalf of a nation are not the same emotion wearing different clothes. When the object of longing is a collective past, the measured consequences invert. Collective nostalgia predicts suspicion of outsiders and support for excluding them, while personal nostalgia predicts the opposite, a readiness to approach people one does not know. Both can be measured in the same person, and the two scores barely move together. The two share a name and very little else, and the confusion between them is, in my view, the main reason nostalgia retains its poor reputation among historians and commentators who have never examined the personal variety at all.

The practical uses follow from the mechanism. Reminiscence work with older people, in which photographs and music are used to prompt recollection, improves mood and conversation in care homes. Universities that ask new students to write about home during the first difficult weeks find that the exercise reduces, rather than deepens, their homesickness. The general principle is that nostalgia is most valuable exactly where continuity is threatened: at migrations, bereavements, retirements, the beginnings of things. Hofer was not entirely wrong; the emotion he described does arrive with dislocation. He simply mistook the repair for the injury. Looking back, it turns out, is a large part of how a mind assembles a self coherent enough to go forward.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What does the writer emphasise about nostalgia in the first paragraph?", options: ["A It was treated as a medical condition for a very long time.", "B It was first described by soldiers serving abroad.", "C It was harder to treat than other illnesses of the period.", "D It spread from Switzerland to the rest of Europe."], answer: "A",
          explain: "Physicians argued for two centuries only about the mechanism, and psychiatry then reclassified it as a form of depression — an illness throughout. The soldiers were described by Hofer, not describing it themselves.",
          evidence: "for much of the twentieth century nostalgia was classified as a variety of depression",
          vocab: ["classified as a variety of depression", "treated as a medical condition"] },
        { n: 28, type: "mcq", prompt: "The laboratory method described in the second paragraph involves", options: ["A asking participants to keep a diary of their memories.", "B interviewing people who have recently left home.", "C comparing people recalling a nostalgic event with people recalling an ordinary one.", "D recording how often the past is mentioned in conversation."], answer: "C",
          explain: "Half the participants write about a nostalgic event and half about an ordinary event from last week, and both groups then complete the same measures — a comparison of two induced conditions.",
          evidence: "the other half write about an ordinary event from last week",
          vocab: ["half the participants", "comparing people"] },
        { n: 29, type: "mcq", prompt: "What is the writer's attitude to the research on cold and nostalgia?", options: ["A It explains why the emotion is commoner in winter.", "B It is interesting but not yet firmly established.", "C It has been confirmed by studies with much larger groups.", "D It contradicts earlier work on what triggers nostalgia."], answer: "B",
          explain: "The writer calls the findings appealing and widely quoted, then notes small samples and uneven replications and says caution is in order — interesting but not yet firmly established.",
          evidence: "the samples are small and the replications uneven",
          vocab: ["a degree of caution is in order", "not yet firmly established"] },
        { n: 30, type: "mcq", prompt: "According to the writer, nostalgia strengthens people mainly because it", options: ["A removes the memory of past difficulties.", "B is more enjoyable than other kinds of memory.", "C reminds them to spend more time with old friends.", "D shows them that they have been valued and have survived hardship."], answer: "D",
          explain: "The writer says a nostalgic memory is evidence about the self: that one has been loved and has come through something. The narratives keep the difficulty rather than removing it, so A is a trap.",
          evidence: "one has been loved and has come through something",
          vocab: ["has been loved", "have been valued"] },
        { n: 31, type: "ynng", prompt: "Deliberately recalling the past can improve the way people feel about themselves.", answer: "YES",
          explain: "YES: participants who have just written about a nostalgic memory report higher self-esteem and a stronger sense of connection — the effect of recalling the past on purpose.",
          evidence: "People who have just been nostalgic report higher self-esteem",
          vocab: ["higher self-esteem", "feel about themselves"] },
        { n: 32, type: "ynng", prompt: "Nostalgia should be understood as an entirely pleasant emotion.", answer: "NO",
          explain: "NO: the writer states plainly that nostalgia is not simple pleasure and that a thread of loss runs through almost every nostalgic narrative.",
          evidence: "a thread of loss runs through them",
          vocab: ["not simple pleasure", "entirely pleasant"] },
        { n: 33, type: "ynng", prompt: "Older people feel nostalgic more often than younger people do.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: reminiscence work with older people is described, but the passage never compares how frequently different age groups experience the emotion.",
          evidence: "Reminiscence work with older people" },
        { n: 34, type: "ynng", prompt: "Nostalgia for one's own life and nostalgia for a nation's past have different effects.", answer: "YES",
          explain: "YES: collective nostalgia predicts suspicion of outsiders while personal nostalgia predicts a readiness to approach strangers — the writer insists they share a name and little else.",
          evidence: "Collective nostalgia predicts suspicion of outsiders",
          vocab: ["share a name and very little else", "different effects"] },
        { n: 35, type: "ynng", prompt: "Feeling nostalgic makes people less inclined to pursue difficult aims.", answer: "NO",
          explain: "NO: after a nostalgic episode participants describe themselves as more willing to take on demanding goals, which contradicts the statement directly.",
          evidence: "more willing to take on demanding goals",
          vocab: ["demanding goals", "difficult aims"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "asked what the emotion does rather than what it reveals.",
            "proves that memories become less accurate as people age.",
            "places the person among others who mattered to them.",
            "shows that the emotion is felt most strongly in warm surroundings.",
            "is linked to hostility towards people outside the group.",
            "described a condition believed to be caused by absence from home.",
            "can give a misleading impression of what the emotion actually does.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Johannes Hofer's original account of nostalgia", answer: "F",
          explain: "Hofer named the condition he saw in mercenaries posted far from their valleys, joining the Greek words for return and pain — a disorder caused by being away from home.",
          evidence: "he saw in mercenary soldiers posted far from their valleys",
          vocab: ["posted far from their valleys", "absence from home"] },
        { n: 37, type: "match", group: "ends", prompt: "The experiments begun in the late 1990s", answer: "A",
          explain: "Before that decade nobody asked what nostalgia might be for; the psychologists ran the emotion in a laboratory to see what it produced — ending A, what it does rather than what it reveals.",
          evidence: "Nobody thought to ask what it might be for.",
          vocab: ["what it might be for", "what the emotion does"] },
        { n: 38, type: "match", group: "ends", prompt: "The typical nostalgic memory", answer: "C",
          explain: "When the narratives are coded, the writer stands at the centre of the story surrounded by people who mattered — ending C. Ending B is never suggested anywhere in the passage.",
          evidence: "the writer stands at the centre of the story, surrounded by people who mattered",
          vocab: ["surrounded by people who mattered", "among others who mattered"] },
        { n: 39, type: "match", group: "ends", prompt: "Measuring how frequently a person feels nostalgic", answer: "G",
          explain: "That measure tells you mainly about circumstances, since the emotion arrives when things are difficult, so it misleads about the emotion's effects — which only the post-episode measure shows.",
          evidence: "Measuring how often somebody feels nostalgic tells you mainly about their circumstances",
          vocab: ["tells you mainly about their circumstances", "a misleading impression"] },
        { n: 40, type: "match", group: "ends", prompt: "Nostalgia felt on behalf of a country", answer: "E",
          explain: "Collective nostalgia predicts suspicion of outsiders and support for excluding them — ending E. Personal nostalgia is said to predict the opposite.",
          evidence: "support for excluding them",
          vocab: ["suspicion of outsiders", "hostility towards people outside the group"] },
      ],
    },
  ],
};
