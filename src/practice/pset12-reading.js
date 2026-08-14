// Smart LC Practice Set 12 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET12_READING = {
  id: "pset12-reading",
  bookId: "pset12",
  title: "Practice Set 12 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The candle",
      passage: `For most of human history the length of the working day was set by the sun, and the only way to steal an hour from the darkness was to burn something. Of all the answers people found, the candle was the neatest: a portable flame that carried its own fuel, regulated its own burning, needed no chimney and could be made at a kitchen table. It held that position for more than two thousand years, and it lost it, more or less completely, in the space of a single century.

The candle's ancestor was the rushlight, used in ancient Egypt and, much later, in the cottages of northern Europe. A rush was stripped of most of its green skin, dried, and drawn through hot animal fat until the soft pith inside had soaked up the grease. Held at an angle in a metal clip, it burned for about half an hour. A poor household might burn several hundred of them in the course of a single winter. A rushlight was almost free, but it was not a candle, because it had no wick in the proper sense: the whole object was consumed together. The true candle — a fibre wick standing in a block of solid fuel that its own flame melts and draws upwards — appears among the Romans about two thousand years ago. Their candles were made of tallow, the rendered fat of cattle and sheep, built up in layers around a twisted length of flax.

Tallow was cheap, and it was horrible. It burned with a smoky yellow flame, it dripped, it softened in warm weather, and it filled the room with the smell of a kitchen the day after a feast; mice ate the candles from their sticks. The alternative was beeswax, which burned with a bright steady flame, gave off a faint sweetness rather than smoke, and kept its shape in summer. But a hive yields a great deal more honey than wax, and beeswax candles cost many times what tallow candles cost. For centuries, therefore, the quality of a household's light was among the plainest measures of its wealth, and the great wax candles of a cathedral were an act of expenditure as much as of worship.

Candle-making became a trade early, and a divided one. In medieval London and Paris the tallow chandlers and the wax chandlers formed separate companies with separate rules, and each was forbidden to work in the other's material. The rules were enforced by inspection, and offending stock could be seized. The candle also became an instrument. In the ninth century King Alfred of Wessex is said to have divided his day with a candle clock: six marked candles, each burning for four hours, protected from draughts by a lantern of thin horn. Monasteries used similar devices to time the night services. A candle that burns at a known rate is a clock that also lights the room, and in a society without reliable mechanical timekeeping that was no small thing.

One defect defeated every maker until the nineteenth century. The wick did not burn away as quickly as the fuel around it, so a lengthening stub of charred fibre stood in the flame, making it smoke, gutter and dim. Candles had to be trimmed every twenty minutes or so with snuffers — scissors with a small box on the blades to catch the burnt end. A better light arrived from an unexpected source. In the eighteenth century whalers began to sell spermaceti, the waxy material taken from the head cavity of the sperm whale, which set hard, burned without smell and gave a light of remarkable brilliance. So even was that flame that it became a measurement: the light of one spermaceti candle burning at a fixed rate defined the candlepower, a unit still in use in the twentieth century.

The nineteenth century then solved the rest of the problem in thirty years. About 1820 the French chemist Jean-Jacques Cambaceres introduced a plaited wick, which curls over as it burns so that its tip leans out of the flame into the air and is consumed there; the candle now snuffed itself, and the snuffers went into a drawer. In 1823 Michel Chevreul, who had worked out that fats are combinations of fatty acids with glycerine, patented candles of stearin, hard and white and almost odourless. From the 1850s came paraffin wax, distilled from petroleum and oil shale, which was cheaper to produce than tallow had ever been and cleaner to burn than beeswax.

Blended with a little stearic acid for hardness, paraffin gave the world the candle we still recognise: white, odourless, upright and cheap. The irony is exact. The candle was perfected at the moment it stopped being necessary. Gas lighting had already taken the streets and the factories, and from the 1880s the electric lamp took the rooms as well. Within two generations a technology that had lit every evening of European life was reduced to a standby for power cuts.

It did not disappear. The candle kept the work that no lamp can do: it marks a birthday, a festival, a memory, a meal that is meant to feel unlike other meals. Manufacturers noticed that what people now buy is not light at all but atmosphere and scent, and sales of scented candles have risen steadily for two decades. The oldest lighting technology in the house survives because it stopped competing on light.`,
      questions: [
        { n: 1, type: "gap", prompt: "Roman candles were made of ______, which was produced from the fat of cattle and sheep.", note: "ONE WORD ONLY", answer: "tallow",
          explain: "The passage says Roman candles 'were made of tallow, the rendered fat of cattle and sheep'. The question turns 'rendered fat' into 'produced from the fat', but the answer word itself stays unchanged.",
          evidence: "Their candles were made of tallow, the rendered fat of cattle and sheep",
          vocab: ["rendered fat", "produced from the fat"] },
        { n: 2, type: "gap", prompt: "Candles of ______ burned more brightly and smelled sweeter, but were much dearer.", note: "ONE WORD ONLY", answer: "beeswax",
          explain: "Beeswax burned 'with a bright steady flame' and gave 'a faint sweetness rather than smoke', yet cost many times the price of tallow — exactly the contrast in the question.",
          evidence: "The alternative was beeswax, which burned with a bright steady flame",
          vocab: ["a faint sweetness", "smelled sweeter"] },
        { n: 3, type: "gap", prompt: "King Alfred is said to have divided his day by means of a candle ______.", note: "ONE WORD ONLY", answer: "clock",
          explain: "The ninth-century device is named directly in the passage: a candle clock of six marked candles, each burning for four hours. The gap needs the noun that follows 'candle'.",
          evidence: "divided his day with a candle clock" },
        { n: 4, type: "gap", prompt: "The brightest candles of the eighteenth century used a waxy substance from the head of the sperm ______.", note: "ONE WORD ONLY", answer: "whale",
          explain: "Spermaceti is described as 'the waxy material taken from the head cavity of the sperm whale'. 'Head cavity' in the passage becomes simply 'head' in the question.",
          evidence: "taken from the head cavity of the sperm whale",
          vocab: ["head cavity", "head"] },
        { n: 5, type: "gap", prompt: "Before the 1820s, the burnt end of a wick had to be cut off with ______.", note: "ONE WORD ONLY", answer: "snuffers",
          explain: "Candles 'had to be trimmed every twenty minutes or so with snuffers'. The question paraphrases 'trimmed' as 'cut off', so the tool named after 'with' is the answer.",
          evidence: "Candles had to be trimmed every twenty minutes or so with snuffers",
          vocab: ["trimmed", "cut off"] },
        { n: 6, type: "gap", prompt: "From the 1850s, ______ wax distilled from petroleum made candles cheaper than they had ever been.", note: "ONE WORD ONLY", answer: "paraffin",
          explain: "The date 1850s takes you to paraffin wax, 'distilled from petroleum and oil shale', which cost less to produce than tallow ever had. The gap sits before 'wax', so a single noun is needed.",
          evidence: "From the 1850s came paraffin wax, distilled from petroleum and oil shale" },
        { n: 7, type: "tfng", prompt: "In a rushlight, the wick was made of a different material from the fuel.", answer: "FALSE",
          explain: "FALSE: the passage states a rushlight 'had no wick in the proper sense' because the whole object burned away together — so there was no separate wick material at all.",
          evidence: "it had no wick in the proper sense: the whole object was consumed together" },
        { n: 8, type: "tfng", prompt: "Beeswax candles were considerably more expensive than tallow ones.", answer: "TRUE",
          explain: "TRUE: beeswax candles 'cost many times what tallow candles cost'. 'Many times' is a direct match for 'considerably more expensive'.",
          evidence: "beeswax candles cost many times what tallow candles cost",
          vocab: ["many times", "considerably more expensive"] },
        { n: 9, type: "tfng", prompt: "Wax chandlers were wealthier than tallow chandlers.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage says the two trades formed separate companies and could not work in each other's material, but it never compares their earnings. Beeswax being dearer is not a statement about the chandlers' wealth.",
          evidence: "the tallow chandlers and the wax chandlers formed separate companies with separate rules" },
        { n: 10, type: "tfng", prompt: "A standard unit of light was based on a burning spermaceti candle.", answer: "TRUE",
          explain: "TRUE: the flame was so even that 'the light of one spermaceti candle burning at a fixed rate defined the candlepower' — that is a unit of light based on such a candle.",
          evidence: "the light of one spermaceti candle burning at a fixed rate defined the candlepower",
          vocab: ["defined the candlepower", "a standard unit of light"] },
        { n: 11, type: "tfng", prompt: "Paraffin wax cost more to make than tallow.", answer: "FALSE",
          explain: "FALSE: paraffin 'was cheaper to produce than tallow had ever been'. The statement reverses the comparison the passage makes, which is the standard FALSE trap.",
          evidence: "cheaper to produce than tallow had ever been" },
        { n: 12, type: "tfng", prompt: "The candle reached its best form just as other kinds of lighting were replacing it.", answer: "TRUE",
          explain: "TRUE: the writer calls the timing 'exact' — the candle 'was perfected at the moment it stopped being necessary', with gas already in the streets and electricity arriving from the 1880s.",
          evidence: "The candle was perfected at the moment it stopped being necessary",
          vocab: ["perfected", "reached its best form"] },
        { n: 13, type: "tfng", prompt: "More candles are bought today than were bought in the nineteenth century.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: sales of scented candles have risen for twenty years, but the passage never sets modern sales against nineteenth-century ones. A rising trend is not a comparison with the past.",
          evidence: "sales of scented candles have risen steadily for two decades" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Soil under the pavement",
      passage: `A — Cities are built on soil and then behave as though it were not there. Under the pavements of any street lies a material that was once a living system: a mixture of mineral grains, decayed plants, water, air and an enormous population of fungi, bacteria and small animals. Construction crushes it, buries it and forgets it, and the consequences show above ground. A centimetre of it takes centuries to form and an afternoon to destroy. A street tree planted in a European or North American city has an average life expectancy of about seven years. The same species, planted a hundred metres away in a park, will often stand for a century. The tree is not different. The ground is. Almost every failure that city foresters record — thin crowns, early autumn colour, branches that die back from the tip — begins below the surface, in material nobody looked at before the tree arrived.

B — What separates the two is compaction. Healthy soil is close to half empty space: a network of pores, some fine enough to hold water against gravity, others coarse enough to let air and roots through. Machinery closes them. The soil scientist Elena Ruiz, who has taken cores from building sites in three countries, reports that a single pass of a loaded truck can reduce pore space by a third, and that the ground beneath a finished pavement is routinely compacted to a density at which roots cannot obtain enough oxygen to survive. Water behaves differently too: rain runs across compacted ground instead of soaking into it, so the tree is drowned at the surface and parched below.

C — The second problem is volume. A mature tree needs something like fifteen to thirty cubic metres of usable soil; the pit cut for it in a pavement typically holds two or three. The mismatch is easier to picture as furniture: the tree needs the volume of a small van and is given the volume of a bath. Roots that meet hard ground on every side do the only thing available to them and run along the narrow band of loose material just under the surface, where they thicken year by year and lift the slabs above them into the ridges every city knows. The tree is then blamed for the damage, and often removed for it. The urban forester Dana Whitfield has costed the resulting cycle in a dozen municipalities and found that taking out, replacing and re-establishing trees that die in their first decade costs a city several times what it would have paid to build a proper rooting space at the start.

D — Engineers have three answers. The first is structural soil: a skeleton of crushed stone whose angular fragments lock together and carry the weight of the pavement, with the spaces between them filled with soil that stays loose. The second is suspended pavement, in which plastic cells like a stack of milk crates support the paving slabs directly, so that the soil beneath them is never loaded at all. The third, developed in Stockholm and now widely copied, packs coarse rock with charcoal and lets storm water from the road drain down through it. Karl Nyberg, who has planted several thousand trees into such systems, says the difference is visible within five years: trunks thicken at two or three times the rate of trees in conventional pits.

E — None of this works unless the soil is alive. Roots do not gather water and nutrients unaided; they trade sugars with fungi whose threads reach far beyond the root tips, and those fungi in turn depend on a community of bacteria and small invertebrates that recycles dead material. City soil is hard on all of them. Road salt spread through the winter is the most destructive single input: chloride is toxic to fine roots and to soil organisms, and sodium breaks down the crumb structure that gives soil its pores. Old industrial ground adds lead and oils, and the habit of sweeping every leaf away removes the litter from which new organic matter would otherwise come. Ground kept bare in this way supports only a fraction of the fungal life a healthy soil carries.

F — Where the ground is repaired, the returns are large and quick. The hydrologist Marcus Oyelaran has instrumented tree pits built to the newer designs and measured them through storms: a single well-built pit, he reports, can take in and hold back some thirty thousand litres of rainfall in a year, water that would otherwise reach the drains within minutes. Trees growing in adequate soil also transpire enough to cool the air around them by two or three degrees on a hot afternoon, and, unlike trees that die young, they live long enough to store a meaningful quantity of carbon. The soil itself, left undisturbed, holds more carbon than all the world's vegetation put together. Roughly a third of that store sits in the top thirty centimetres, the layer a building site strips away first.

G — Why, then, is so little done? Sofia Lindqvist, who studies how city governments are organised, points to a boundary running straight through the problem: the department that owns the surface of the street is almost never the department that plants the trees, and the two hold separate budgets, separate timetables and separate ideas of success. The cost of good soil falls on the highway engineer; the benefit appears years later in the parks account. Until soil is treated as infrastructure — surveyed, specified and paid for like a pipe or a cable — the seven-year tree will go on being planted, and go on dying, on schedule.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a description of a structure that keeps the weight of the pavement off the soil", answer: "D",
          explain: "Paragraph D describes suspended pavement, in which plastic cells hold up the paving slabs so the soil below carries no load at all — precisely the structure the question describes.",
          evidence: "support the paving slabs directly, so that the soil beneath them is never loaded at all",
          vocab: ["never loaded", "keeps the weight off"] },
        { n: 15, type: "match", group: "info", prompt: "a comparison between how long trees survive in two different settings", answer: "A",
          explain: "Paragraph A sets a street tree's seven-year life expectancy against the same species in a park, which 'will often stand for a century' — the two settings the question refers to.",
          evidence: "will often stand for a century",
          vocab: ["life expectancy", "how long trees survive"] },
        { n: 16, type: "match", group: "info", prompt: "a figure for the amount of rain that one tree pit can absorb", answer: "F",
          explain: "Paragraph F gives Oyelaran's measured figure: a single well-built pit can hold back some thirty thousand litres of rainfall a year. 'Take in' is the passage's word for 'absorb'.",
          evidence: "can take in and hold back some thirty thousand litres of rainfall in a year",
          vocab: ["take in", "absorb"] },
        { n: 17, type: "match", group: "info", prompt: "an explanation of why roots damage the surface of a street", answer: "C",
          explain: "Paragraph C explains that roots blocked on every side run through the loose band just under the surface, thickening until they lift the slabs. That is the mechanism of the damage.",
          evidence: "run along the narrow band of loose material just under the surface" },
        { n: 18, type: "match", group: "info", prompt: "reference to a substance used on roads that kills soil organisms", answer: "E",
          explain: "Paragraph E names road salt as the most destructive single input, with chloride toxic to fine roots and to soil organisms — the substance the question means.",
          evidence: "Road salt spread through the winter is the most destructive single input",
          vocab: ["toxic", "kills"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why street trees fail, and what can be done",
            lines: [
              "Healthy soil is nearly half empty space, but the weight of machinery closes the {{19}} through which air, water and roots would otherwise move.",
              "A tree given only two or three cubic metres of soil sends its roots into the loose band just below the surface, where they swell and lift the {{20}} of the pavement.",
              "Better designs keep the load off the ground. One uses a framework of crushed {{21}} strong enough to carry the street while the spaces inside it stay soft; another rests the paving on plastic {{22}}, so that the soil below is never pressed at all.",
            ],
          },
          answer: "pores",
          explain: "Healthy soil is described as 'a network of pores' that machinery closes. The summary paraphrases 'let air and roots through' as 'through which air, water and roots would otherwise move'.",
          evidence: "a network of pores",
          vocab: ["network of pores", "closes the pores"] },
        { n: 20, type: "gap", group: "sum2", answer: "slabs",
          explain: "Roots running just under the surface 'thicken year by year and lift the slabs above them'. The summary keeps the verb 'lift' and paraphrases 'thicken' as 'swell'.",
          evidence: "lift the slabs above them into the ridges every city knows",
          vocab: ["thicken", "swell"] },
        { n: 21, type: "gap", group: "sum2", answer: "stone",
          explain: "Structural soil is 'a skeleton of crushed stone' whose locked fragments carry the pavement while the gaps stay loose. 'Skeleton' in the passage becomes 'framework' in the summary.",
          evidence: "a skeleton of crushed stone whose angular fragments lock together",
          vocab: ["skeleton", "framework"] },
        { n: 22, type: "gap", group: "sum2", answer: "cells",
          explain: "In suspended pavement, 'plastic cells like a stack of milk crates' hold the slabs so the soil is never loaded. The summary reuses 'plastic', so only the noun is missing.",
          evidence: "plastic cells like a stack of milk crates" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Elena Ruiz",
            "Karl Nyberg",
            "Dana Whitfield",
            "Marcus Oyelaran",
            "Sofia Lindqvist",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Compacted ground holds too little air for roots to stay alive.", answer: "A",
          explain: "The soil scientist Ruiz measured compaction in her cores and found soil under finished pavement dense enough that roots cannot get the oxygen they need. 'Oxygen' is the question's 'air'.",
          evidence: "roots cannot obtain enough oxygen to survive",
          vocab: ["oxygen", "air"] },
        { n: 24, type: "match", group: "people", prompt: "Trees planted into engineered ground grow far faster than those in ordinary pits.", answer: "B",
          explain: "Nyberg, who has planted thousands of trees into structural systems, reports trunks thickening at two or three times the rate seen in conventional pits — the growth difference in the statement.",
          evidence: "trunks thicken at two or three times the rate of trees in conventional pits",
          vocab: ["conventional pits", "ordinary pits"] },
        { n: 25, type: "match", group: "people", prompt: "Replacing trees that die young costs more than preparing the ground properly.", answer: "C",
          explain: "The urban forester Whitfield costed the cycle across a dozen municipalities: replacing trees that die in their first decade costs several times the price of a proper rooting space.",
          evidence: "costs a city several times what it would have paid to build a proper rooting space at the start",
          vocab: ["rooting space", "preparing the ground"] },
        { n: 26, type: "match", group: "people", prompt: "The street surface and the trees are the responsibility of different city departments.", answer: "E",
          explain: "Lindqvist studies municipal organisation and identifies exactly this split: the department owning the street surface is almost never the one that plants the trees.",
          evidence: "the department that owns the surface of the street is almost never the department that plants the trees",
          vocab: ["separate budgets", "different city departments"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Too many decisions",
      passage: `In a Californian supermarket some years ago, two psychologists set out a tasting table with jars of jam. On some days the table carried twenty-four varieties, on other days only six. Everyone who tasted was handed a coupon worth a dollar off a jar, so that the count of buyers could be exact. The large display drew more attention: about six shoppers in ten stopped at it, against four in ten at the small one. What happened next made the study famous. Of those who paused at the small display, roughly a third went on to buy a jar. Of those who crowded round the twenty-four, three per cent did. Abundance had attracted people and then paralysed them, and the result became one of the most quoted findings in the history of consumer research.

It was quoted, in fact, far beyond what it could carry. The idea that plenty makes us miserable is congenial to a wealthy society with a taste for self-reproach, and it hardened into folklore. Then the checking began. When some fifty later experiments on the same question were pooled, the average effect on satisfaction and purchasing was close to zero. A few studies found the overload effect, a few found the opposite, and the two piles cancelled. The right conclusion is not that the jam study was wrong but that the effect is not general; it is conditional. It appears reliably when the options are hard to compare, when the chooser arrives without an existing preference, and when the decision must be made quickly. A specialist who knows what she wants is untroubled by a hundred varieties; a newcomer under time pressure is not. Alter any one of those conditions and the effect thins or vanishes altogether.

A second idea travels in the same company. Decision fatigue holds that choosing draws on a limited store of mental energy which is used up through the day. Its most cited evidence comes from a study of parole hearings, in which the proportion of favourable rulings appeared to fall steeply across each session and to recover after the judges had eaten. The judges heard cases in quick succession, sometimes several dozen in a day, with two food breaks between them. The image is memorable, and it has not survived careful testing. Large coordinated attempts to reproduce the laboratory versions of depletion produced effects indistinguishable from nothing, and the parole finding is disputed too, because the order in which cases reached the court was not random. The fuel model remains unproven.

Something, nevertheless, is happening. Watch people work through a long sequence of choices — configuring a car, filling an online basket — and their behaviour changes as they go. Early on they compare features carefully; later they take the option presented first, or the one already selected, or they put the decision off altogether. That is not a tank running dry. It is a sensible economy: attention is expensive, and past a certain point the return on further comparison is smaller than the cost of making it. The shift also arrives sooner when the choices that remain matter less, which is not what a draining reservoir would predict. The practical consequence is the same either way. Whoever writes the default answer on a form decides for a great many people, which is why the wording of a pension form or an organ donation register moves numbers that argument never could.

Why should choosing well feel so bad? Part of the answer is that the price of any choice includes the ones you did not make. Economists call this opportunity cost; the mind experiences it as a set of alternative lives briefly imagined. Six jams offer five foregone alternatives, twenty-four offer twenty-three, and every extra option is one more possibility to picture, one more way in which the jar in the basket might have been bettered. The regret is sharpest immediately afterwards, while the rejected jars are still vivid and the chosen one is untasted. This is why satisfaction can fall while objective quality rises: the shopper with more to choose from goes home with a better jam and a worse feeling about it.

The size of that penalty varies with the person. Psychologists distinguish the maximiser, who searches until convinced that nothing better exists, from the satisficer, who fixes a standard in advance and takes the first option that meets it. Following graduates through a year of job-hunting, researchers found that the maximisers ended up in posts paying about twenty per cent more, and yet reported being less satisfied with them, more anxious during the search and more inclined to look back at the offers they had turned down. The satisficer's standard is not laziness. It is a judgement about how much deciding is worth.

The obvious remedy — offer less — is usually the wrong one. Variety is a genuine good, and a shop that halves its range simply loses the customers whose preferences lay in the missing half. What helps is not fewer options but better structure: grouping them into a few families, filtering by the two or three attributes that actually differ, and marking a sensible recommendation for those who have no preference of their own. The same trick works privately. A rule fixed in advance — the second cheapest bottle on the list, the same breakfast every weekday, nothing expensive bought without a night's delay — converts a repeated decision into a single one, made once, calmly, and thereafter simply obeyed.

Seen this way, the modern complaint is not really about the number of things available. It is about being asked to hold an opinion on all of them. Attention is the scarce resource, and the useful skill is not choosing well so much as choosing where to choose: spending real deliberation on the few decisions that change something, and letting rules, habits and defaults absorb the rest.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What does the writer conclude about the jam experiment?", options: ["A It was carried out on too few shoppers to be reliable", "B Its result holds only in particular circumstances", "C No other researcher has attempted to repeat it", "D It showed that shoppers avoid unfamiliar products"], answer: "B",
          explain: "The writer says the effect 'is not general; it is conditional', listing the circumstances in which it appears. Option C echoes the fifty later experiments but reverses their meaning, and A and D are never claimed.",
          evidence: "the effect is not general; it is conditional",
          vocab: ["conditional", "only in particular circumstances"] },
        { n: 28, type: "mcq", prompt: "What does the writer say about the study of parole hearings?", options: ["A There may be another explanation for its pattern", "B It was based on too small a number of cases", "C It proves that choosing uses up a store of energy", "D It contradicts the results of laboratory research"], answer: "A",
          explain: "The finding is 'disputed' because the cases did not reach the court in random order — an alternative explanation for the falling pattern. C states the theory the writer rejects; the number of cases is never questioned.",
          evidence: "because the order in which cases reached the court was not random",
          vocab: ["not random", "another explanation"] },
        { n: 29, type: "mcq", prompt: "According to the writer, satisfaction can fall as the number of options grows because people", options: ["A spend longer on the decision than they meant to", "B end up with goods of lower quality", "C think about the possibilities they rejected", "D forget what they originally wanted"], answer: "C",
          explain: "Each additional option is 'one more possibility to picture' — the imagined alternatives are what spoil the satisfaction. B is contradicted outright: objective quality rises even as the feeling worsens.",
          evidence: "every extra option is one more possibility to picture",
          vocab: ["one more possibility to picture", "think about the possibilities"] },
        { n: 30, type: "mcq", prompt: "The research on graduates looking for work found that maximisers", options: ["A reached their decisions faster than satisficers", "B were more numerous than satisficers", "C became satisficers once they were employed", "D were better paid but less content with their jobs"], answer: "D",
          explain: "Maximisers ended in posts paying about twenty per cent more yet 'reported being less satisfied with them' — a better outcome enjoyed less. Speed, numbers and later change are not in the passage.",
          evidence: "reported being less satisfied with them",
          vocab: ["less satisfied", "less content"] },
        { n: 31, type: "ynng", prompt: "The belief that extra choice always reduces satisfaction is weaker than it is usually presented.", answer: "YES",
          explain: "YES: pooling around fifty experiments gave an average effect 'close to zero', and the writer calls the popular version folklore that goes beyond what the evidence can carry.",
          evidence: "the average effect on satisfaction and purchasing was close to zero",
          vocab: ["close to zero", "weaker than usually presented"] },
        { n: 32, type: "ynng", prompt: "The theory that decisions drain a limited supply of mental energy has been firmly established.", answer: "NO",
          explain: "NO: replication attempts produced effects 'indistinguishable from nothing' and the writer states plainly that 'The fuel model remains unproven' — the opposite of firmly established.",
          evidence: "The fuel model remains unproven",
          vocab: ["remains unproven", "firmly established"] },
        { n: 33, type: "ynng", prompt: "Older shoppers are more troubled by large ranges of goods than younger ones.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage says the effect depends on expertise, prior preference and time pressure, but it never compares age groups. Do not import an assumption the writer never makes.",
          evidence: "when the chooser arrives without an existing preference" },
        { n: 34, type: "ynng", prompt: "Shops would serve their customers better by stocking fewer products.", answer: "NO",
          explain: "NO: the writer calls 'offer less' the wrong remedy, since a shop that halves its range loses the customers whose preferences were in the missing half. Structure, not scarcity, is his answer.",
          evidence: "a shop that halves its range simply loses the customers",
          vocab: ["halves its range", "stocking fewer products"] },
        { n: 35, type: "ynng", prompt: "Settling a question in advance is an effective response to having too much to decide.", answer: "YES",
          explain: "YES: a rule fixed beforehand turns many decisions into one that is 'made once, calmly, and thereafter simply obeyed' — the writer offers it as what actually helps.",
          evidence: "made once, calmly, and thereafter simply obeyed" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "turns a set of repeated decisions into a single one.",
            "left far fewer shoppers willing to buy anything.",
            "cannot be explained by tiredness alone.",
            "shows that variety is of no real value to customers.",
            "depends on the situation as much as on the number of options.",
            "leaves people dwelling on the choices they did not make.",
            "proves that people always take the first option they see.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The larger display of jams", answer: "B",
          explain: "The big table attracted more shoppers but only three per cent of them bought a jar, against roughly a third at the small table — ending B, 'far fewer shoppers willing to buy'.",
          evidence: "Of those who crowded round the twenty-four, three per cent did",
          vocab: ["three per cent did", "far fewer shoppers"] },
        { n: 37, type: "match", group: "ends", prompt: "The choice-overload effect", answer: "E",
          explain: "The effect is conditional: it appears when options are hard to compare, when the chooser has no preference and when time is short — so it depends on the situation, ending E.",
          evidence: "It appears reliably when the options are hard to compare",
          vocab: ["appears reliably when", "depends on the situation"] },
        { n: 38, type: "match", group: "ends", prompt: "The way people choose towards the end of a long sequence", answer: "C",
          explain: "The shift to defaults late in a sequence 'is not a tank running dry' but 'a sensible economy' of attention — ending C, not explicable by tiredness alone. Ending G overstates it.",
          evidence: "It is a sensible economy: attention is expensive",
          vocab: ["a tank running dry", "tiredness"] },
        { n: 39, type: "match", group: "ends", prompt: "A wide range of options", answer: "F",
          explain: "Every option not taken becomes 'a set of alternative lives briefly imagined', which is ending F — people dwell on the choices they did not make. Ending D says something the writer denies.",
          evidence: "a set of alternative lives briefly imagined",
          vocab: ["alternative lives briefly imagined", "dwelling on the choices"] },
        { n: 40, type: "match", group: "ends", prompt: "A rule decided in advance", answer: "A",
          explain: "Such a rule 'converts a repeated decision into a single one' — ending A. The examples given are the second cheapest bottle and the same breakfast every weekday.",
          evidence: "converts a repeated decision into a single one",
          vocab: ["converts", "turns into"] },
      ],
    },
  ],
};
