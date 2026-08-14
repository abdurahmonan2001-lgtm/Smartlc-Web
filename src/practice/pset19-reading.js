// Smart LC Practice Set 19 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET19_READING = {
  id: "pset19-reading",
  bookId: "pset19",
  title: "Practice Set 19 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The chimney",
      passage: `For most of human history a house was heated by a fire laid on the floor in the middle of the main room. In the halls of medieval northern Europe this was not a sign of poverty but the normal way of building: a hearth of stone in the centre, a high open roof above it, and the smoke left to find its own way out through a slatted opening in the ridge called a louvre. The arrangement had real advantages. Heat radiated evenly in every direction, so an entire household could gather around a single fire, and the drifting smoke cured the meat hung in the rafters and discouraged the insects living in the thatch.

It also filled the room. Complaints about smarting eyes and blackened beams suggest that people simply endured a permanent haze at head height. What they could not endure was the loss of space. A hall with a central fire had to be open all the way to the roof, because a floor across the middle would have trapped the smoke below it. The chimney, when it finally arrived, did far more than clear the air: it made the modern house possible.

It arrived surprisingly late. Roman builders understood flues and used them to carry hot gases through the walls of bath houses, yet the ordinary Roman house had no chimney, and neither did the Anglo-Saxon farm. The first domestic chimneys in Europe appear in the stone castles of the twelfth century, where a fireplace was hollowed out of the thickness of an outer wall and a short flue carried the smoke to an opening on the face of the building. Such fireplaces were a luxury of masonry, available only to people who could afford to build in cut stone, and for three hundred years they spread very slowly.

What changed the picture was brick. As brick became cheap and plentiful in the fifteenth and sixteenth centuries, a stack could be raised inside an existing timber-framed house without rebuilding it in stone, and the fireplace moved from the castle to the farmhouse. Historians of the English countryside describe the period between about 1570 and 1640 as a great rebuilding, and the chimney stood at the centre of it. A writer of the 1570s, listing the changes his older neighbours had noticed in their lifetimes, put the multitude of chimneys lately erected first, ahead of feather beds and pewter plates.

The consequences went well beyond warmth. Once the fire stood against a wall and its smoke was confined to a flue, a ceiling could be inserted across the old open hall, and the space beneath the roof became rooms. Households that had eaten, worked and slept together in one smoky chamber now divided themselves between floors, and the idea that a family ought to have private spaces belongs to the same century as the domestic chimney. The fire itself, meanwhile, became worse at heating people. A wall fireplace throws its warmth in one direction only, and most of the heat released by the burning fuel now went straight up the flue.

That waste was tolerated for two centuries, partly because nobody understood why chimneys behaved as they did. A flue draws because the hot gas inside it is lighter than the cold air outside, so a tall stack pulls harder than a short one; but a badly proportioned opening, or a neighbouring roof that threw wind down the shaft, could send the smoke back into the room. Builders answered the second problem by raising the outlet on tall pots, and the first by trial and error.

The first serious analysis was published in 1796 by Benjamin Thompson, an American-born scientist known as Count Rumford. Rumford saw that most fireplaces had an opening far too wide and a throat far too large, so that a great volume of warm room air was dragged up the flue along with the smoke. His remedy was to narrow the throat sharply, to bring the back of the fireplace forward, and to splay the side walls so that they reflected heat into the room. Rumford fireplaces smoked less, burned less fuel and warmed more of the space in front of them, and his design was copied for a century.

Chimneys also created a trade with an ugly history. Narrow flues had to be cleaned, and in Britain much of it was done by small children sent up inside them. In 1775 the surgeon Percivall Pott noticed that sweeps suffered from a particular cancer, the first occupational disease ever traced to a specific substance; the soot itself was the cause. Reformers campaigned for decades against the use of climbing boys, and a series of weak laws was passed and ignored before the practice was finally stopped in 1875.

The chimney's decline has been as quiet as its rise. Coal fires made the cities of industrial Europe famously filthy, and after the London smog of 1952 killed thousands of people, clean-air legislation pushed households towards smokeless fuel, and central heating then removed the need for a fire in each room. Millions of flues were capped and forgotten. They were not empty, though. The dark sheltered shafts had long been colonised by swifts, which nest in them each summer, and conservationists now ask builders to leave a few of them open.`,
      questions: [
        { n: 1, type: "gap", prompt: "In a medieval hall the smoke escaped through an opening in the roof ridge known as a ______.", note: "ONE WORD ONLY", answer: "louvre",
          explain: "The passage names the opening directly: the smoke found its own way out through 'a slatted opening in the ridge called a louvre'. The question keeps 'ridge' as the anchor word.",
          evidence: "a slatted opening in the ridge called a louvre" },
        { n: 2, type: "gap", prompt: "Chimneys reached ordinary houses once ______ became cheap and widely available.", note: "ONE WORD ONLY", answer: "brick",
          explain: "The material that moved the fireplace 'from the castle to the farmhouse' was brick. The question paraphrases 'plentiful' as 'widely available'.",
          evidence: "As brick became cheap and plentiful",
          vocab: ["plentiful", "widely available"] },
        { n: 3, type: "gap", prompt: "With the smoke shut inside a flue, a ______ could be put in across the open hall.", note: "ONE WORD ONLY", answer: "ceiling",
          explain: "Once the smoke was confined, 'a ceiling could be inserted across the old open hall', creating rooms under the roof. 'Inserted' becomes 'put in' in the question.",
          evidence: "a ceiling could be inserted across the old open hall",
          vocab: ["inserted", "put in"] },
        { n: 4, type: "gap", prompt: "To stop wind blowing smoke back down the flue, builders raised the outlet on tall ______.", note: "ONE WORD ONLY", answer: "pots",
          explain: "The passage describes a neighbouring roof throwing wind down the shaft, and says builders answered it 'by raising the outlet on tall pots'.",
          evidence: "raising the outlet on tall pots" },
        { n: 5, type: "gap", prompt: "Rumford's principal change was to make the ______ of the fireplace much narrower.", note: "ONE WORD ONLY", answer: "throat",
          explain: "Rumford's remedy was 'to narrow the throat sharply' so that less warm room air was dragged up the flue. 'Sharply' in the passage matches 'much' in the question.",
          evidence: "to narrow the throat sharply" },
        { n: 6, type: "gap", prompt: "Unused flues are valued today as nesting places for ______.", note: "ONE WORD ONLY", answer: "swifts",
          explain: "The capped shafts 'had long been colonised by swifts, which nest in them each summer' — the question turns 'colonised' into 'nesting places'.",
          evidence: "colonised by swifts, which nest in them each summer",
          vocab: ["colonised", "nesting places"] },
        { n: 7, type: "tfng", prompt: "Smoke from a central hearth brought some benefits to a medieval household.", answer: "TRUE",
          explain: "TRUE: the drifting smoke cured hanging meat, kept the thatch dry and drove off insects — the passage explicitly calls these 'real advantages'.",
          evidence: "the drifting smoke cured the meat hung in the rafters",
          vocab: ["real advantages", "benefits"] },
        { n: 8, type: "tfng", prompt: "Chimneys were a standard feature of Roman houses.", answer: "FALSE",
          explain: "FALSE: the Romans understood flues and used them in bath houses, but 'the ordinary Roman house had no chimney' — a direct contradiction of 'standard feature'.",
          evidence: "the ordinary Roman house had no chimney",
          vocab: ["ordinary", "standard"] },
        { n: 9, type: "tfng", prompt: "During the great rebuilding, more chimneys were added in towns than in the countryside.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage dates the great rebuilding and puts the chimney at the centre of it, but nowhere compares town and country. A plausible comparison the text never makes is the classic NG.",
          evidence: "a great rebuilding, and the chimney stood at the centre of it" },
        { n: 10, type: "tfng", prompt: "A wall fireplace wasted more of a fire's heat than a central hearth had done.", answer: "TRUE",
          explain: "TRUE: the fire 'became worse at heating people' because a wall fireplace radiates in one direction only and most of the heat went up the flue — more waste than the hearth that warmed every side.",
          evidence: "A wall fireplace throws its warmth in one direction only",
          vocab: ["worse at heating people", "wasted more"] },
        { n: 11, type: "tfng", prompt: "Rumford advised builders to make the opening of a fireplace wider.", answer: "FALSE",
          explain: "FALSE: Rumford's complaint was that openings were already 'far too wide', and his remedy narrowed the throat and splayed the sides. The statement reverses his advice.",
          evidence: "His remedy was to narrow the throat sharply" },
        { n: 12, type: "tfng", prompt: "Pott was the first person to connect an illness with a particular material found at work.", answer: "TRUE",
          explain: "TRUE: the cancer he identified in sweeps was 'the first occupational disease ever traced to a specific substance', and that substance was soot.",
          evidence: "the first occupational disease ever traced to a specific substance",
          vocab: ["a specific substance", "a particular material"] },
        { n: 13, type: "tfng", prompt: "The first laws against sending children up chimneys worked immediately.", answer: "FALSE",
          explain: "FALSE: 'a series of weak laws was passed and ignored' before the practice ended in 1875, so the early legislation plainly did not work at once.",
          evidence: "a series of weak laws was passed and ignored",
          vocab: ["weak laws", "did not work"] },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The high street rewritten",
      passage: `A — Walk down the main shopping street of almost any medium-sized town in western Europe and you will pass a shuttered unit within a minute. In Britain, roughly one shop in seven now stands empty, and in the weaker centres of the north and west the figure is closer to one in five. The explanations are familiar enough: online retail took a fifth of all spending in barely a decade; the supermarkets and retail parks on the ring road offer parking that costs nothing; and the rents and business taxes attached to a high-street lease were fixed in an age when a shop window was the only way to reach a customer. What is far less familiar is the question of what should now be done with the buildings that are left behind.

B — The retail geographer Elena Vasquez argues that the whole debate is framed wrongly. The street lined from end to end with shops, she points out, is not an ancient form but a phase, roughly a hundred and fifty years long, produced by railways, cheap plate glass and a population that had to buy its groceries within walking distance of home. Towns went on adding retail floorspace long after that logic had gone, and England built more shops in the twenty years to 2008 than in the previous fifty. Counting shops, in her view, is the wrong measure of a town centre's health. The right one is how many people come, how long they stay and how many separate reasons they have for being there at all.

C — That is not an argument for complacency, because empty units are not neutral. The economist Karl Lindqvist has tracked turnover street by street in a dozen towns and finds that vacancy is contagious: each additional closed unit in a run of shops reduces the takings of its neighbours measurably, because shoppers judge a street at a glance and walk away from one that looks abandoned. Lost trade then closes the next business, which lowers footfall again. Lindqvist calls the result a doom loop, and observes that it can run on for years after the original cause of the closures has disappeared.

D — The commonest response is to turn shops into homes. Rules in several countries now allow a landlord to convert retail premises into flats without a full planning application, and tens of thousands of dwellings have been produced this way. The housing researcher Owen Pryce, who has inspected several hundred of them, is blunt about the results. A Victorian shop is a long, narrow box, and a flat carved out of the back of one may have a window at a single end. Some of the units he has surveyed are below the minimum floor area, have no outdoor space of any kind, and receive so little daylight that the lights are on at noon. Homes above the shops are an old and excellent idea, he says; homes behind them very often are not.

E — A second response is to let the space to somebody else for a while. The town-centre manager Ruth Adeyemi runs a scheme in which the owners of long-standing empty units are offered relief from local taxes if they hand the keys to a managing agency, which sublets to makers, repairers, charities, dance classes and food producers on rolling agreements of six or twelve months. The short lease is the whole point: the tenants are people who could never sign for fifteen years, while the landlord keeps the option of a commercial letting if the market turns. About a quarter of the tenants in her scheme have gone on to take a conventional lease somewhere in the same town.

F — The buildings themselves get in the way. The architect Mei Chen points out that the standard nineteenth-century shop was designed as a single tenancy: the upper floors are reached only through the shop, deliveries come through the same door, and there is rarely a rear yard. For as long as that arrangement holds, the flat above cannot be let separately, and one empty ground floor sterilises three storeys. Providing a separate entrance from the street to the upper floors is, she argues, the single most valuable alteration available, and it is cheap compared with a full conversion. Where local authorities have paid for it, occupancy of the upper floors has risen sharply.

G — None of this happens by itself. The towns that have recovered, the evidence suggests, are the ones that decided deliberately to have less retail: to concentrate the surviving shops in a compact core where footfall reinforces itself, and to convert the edges to housing, workshops, health centres and colleges. That requires somebody to act on behalf of the street as a whole, which is difficult when the units belong to pension funds three countries away. Community ownership, still rare, is one answer to that problem. So is patience, which is scarce among politicians who face an election every four years. The high street will not be rewritten by nostalgia; it will be rewritten by whoever is willing to take responsibility for the empty half of it.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "an explanation of how one closed shop damages the businesses beside it", answer: "C",
          explain: "Paragraph C is where Lindqvist shows that 'vacancy is contagious' and that each extra closed unit cuts the takings of its neighbours. The word 'damages' paraphrases that measured loss of trade.",
          evidence: "vacancy is contagious",
          vocab: ["contagious", "damages the businesses beside it"] },
        { n: 15, type: "match", group: "info", prompt: "a reference to the period of time for which premises are rented out", answer: "E",
          explain: "Paragraph E describes lettings on 'rolling agreements of six or twelve months' and calls the short lease 'the whole point' — that is the reference to the length of a tenancy.",
          evidence: "rolling agreements of six or twelve months",
          vocab: ["rolling agreements", "period of time"] },
        { n: 16, type: "match", group: "info", prompt: "a figure for the share of shops currently standing empty", answer: "A",
          explain: "Paragraph A gives the statistic: about one shop in seven is empty nationally, and one in five in the weakest centres. 'Share' is the question's word for that proportion.",
          evidence: "roughly one shop in seven now stands empty",
          vocab: ["one shop in seven", "the share of shops"] },
        { n: 17, type: "match", group: "info", prompt: "a claim that towns already had too much shop space before internet shopping arrived", answer: "B",
          explain: "Paragraph B argues that towns 'went on adding retail floorspace long after that logic had gone', building more shops in twenty years than in the previous fifty — an oversupply that predates online retail.",
          evidence: "Towns went on adding retail floorspace long after that logic had gone",
          vocab: ["retail floorspace", "shop space"] },
        { n: 18, type: "match", group: "info", prompt: "criticism of the quality of some housing created inside former shops", answer: "D",
          explain: "Paragraph D reports Pryce's inspections: units below the minimum floor area, no outdoor space and so little daylight that lights burn at midday. That is the criticism of quality.",
          evidence: "receive so little daylight that the lights are on at noon",
          vocab: ["below the minimum floor area", "quality"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — What to do with the empty shops",
            lines: [
              "A street with many closed units loses {{19}}, so the traders who remain take less money and more of them are forced to shut. Lindqvist gives this self-feeding process the name doom {{20}}.",
              "Turning shops into flats is the usual answer, but Pryce found that a home cut out of the back of a narrow shop may have a window at one end only and almost no {{21}}.",
              "Chen argues that the cheapest useful alteration is to give the floors above a shop their own {{22}} from the street, so that they can be let on their own.",
            ],
          },
          answer: "footfall",
          explain: "In paragraph C, lost trade closes the next business, 'which lowers footfall again'. The summary paraphrases 'lowers' as 'loses', so the missing noun is 'footfall'.",
          evidence: "which lowers footfall again",
          vocab: ["lowers footfall", "loses footfall"] },
        { n: 20, type: "gap", group: "sum2", answer: "loop",
          explain: "Lindqvist's name for the self-feeding decline is a 'doom loop'. The summary supplies 'doom' and asks for the second half of the phrase.",
          evidence: "Lindqvist calls the result a doom loop",
          vocab: ["it can run on for years", "self-feeding"] },
        { n: 21, type: "gap", group: "sum2", answer: "daylight",
          explain: "Pryce's surveyed flats 'receive so little daylight that the lights are on at noon'. The summary turns 'so little' into 'almost no', keeping 'daylight' as the answer.",
          evidence: "receive so little daylight",
          vocab: ["so little", "almost no"] },
        { n: 22, type: "gap", group: "sum2", answer: "entrance",
          explain: "Chen's recommendation is 'a separate entrance from the street to the upper floors', which she calls the single most valuable alteration — 'their own' in the summary paraphrases 'separate'.",
          evidence: "a separate entrance from the street to the upper floors",
          vocab: ["separate", "their own"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Elena Vasquez",
            "Karl Lindqvist",
            "Ruth Adeyemi",
            "Mei Chen",
            "Owen Pryce",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Empty premises are being let for short periods to occupants of a new kind.", answer: "C",
          explain: "Adeyemi's scheme puts makers, repairers, charities, dance classes and food producers into long-empty units on six- or twelve-month agreements — new sorts of tenant on short lettings.",
          evidence: "sublets to makers, repairers, charities, dance classes and food producers",
          vocab: ["makers, repairers, charities", "occupants of a new kind"] },
        { n: 24, type: "match", group: "people", prompt: "The number of shops in a town is not a good indicator of its condition.", answer: "A",
          explain: "Vasquez says plainly that 'counting shops... is the wrong measure of a town centre's health', preferring visitor numbers, length of stay and variety of purpose.",
          evidence: "Counting shops, in her view, is the wrong measure of a town centre's health",
          vocab: ["the wrong measure", "not a good indicator"] },
        { n: 25, type: "match", group: "people", prompt: "Homes made out of former shops are sometimes below an acceptable standard.", answer: "E",
          explain: "Pryce, who inspected several hundred conversions, found units under the minimum floor area with no outdoor space and almost no daylight — the definition of below standard.",
          evidence: "Some of the units he has surveyed are below the minimum floor area",
          vocab: ["below the minimum floor area", "below an acceptable standard"] },
        { n: 26, type: "match", group: "people", prompt: "When one business fails, those around it are more likely to fail too.", answer: "B",
          explain: "Lindqvist's street-by-street data show that every extra closed unit 'reduces the takings of its neighbours measurably', and that lost trade then closes the next business.",
          evidence: "reduces the takings of its neighbours measurably",
          vocab: ["reduces the takings", "more likely to fail"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The feeling of something vast",
      passage: `Stand at the foot of a glacier, or under a sky with no city light in it, or in the nave of a building put up by people who died six hundred years ago, and something happens that ordinary language handles badly. The heart rate slows a little, the mouth opens, the chest fills; the mind goes quiet in a way that is not quite pleasure and not quite fear. English calls it awe, and for most of the twentieth century psychology left it alone. It fitted neither the short list of basic emotions nor the division of feeling into pleasant and unpleasant, and it was hard to produce in a laboratory to order.

That changed in 2003, when two American psychologists proposed a working definition with two parts. The first is perceived vastness: the encounter must present something on a scale far beyond the observer, whether in size, number, authority or skill. The second, and the more interesting, is a need for accommodation, meaning the sense that one's existing mental categories cannot absorb what is in front of one and must be stretched or rebuilt. Vastness need not be physical. A mathematical proof, a piece of music or an act of moral courage can all deliver it. Accommodation is what separates awe from ordinary pleasure: a beautiful meal does not require you to revise your model of the world, and a supernova does.

Because accommodation is a small shock, awe sits much closer to fear than the tourist industry likes to admit. Eighteenth-century writers who discussed the sublime understood this perfectly well, and in many languages the word for awe is also the word for dread. Modern researchers separate the two, calling one variety threat-based, the storm and the epidemic and the ruler on a high balcony, and finding that it produces much the same physiological signature in a different emotional colour.

The most reliable finding concerns the self. People who have just experienced awe describe themselves as smaller and less significant; asked to draw themselves in a landscape, they draw a smaller figure; asked to write about the experience, they use fewer first-person singular pronouns. Researchers call this the small self, and it is easy to misread. It is not a loss of confidence, and it is not a low mood. On every measure of well-being taken at the same moment, the participants are doing better than before rather than worse. The self shrinks, but it does not suffer; what falls away is the constant background calculation of one's own standing.

Downstream of that shrinking, the effects run outward. Volunteers who have watched footage of vast landscapes, or looked up for a minute into a stand of tall trees, are more likely to help a stranger who drops a handful of pens, more generous in economic games, more patient, and more inclined to judge that they have plenty of time. The mechanism proposed is simple: attention has been pulled outward, and rumination, which is attention pulled inward, stops for a while.

It is here that caution is needed, and the field has not always shown it. Most of these results come from brief laboratory manipulations, a two-minute video or a guided recollection, measured immediately afterwards, and the effects, while real, are modest. Some have replicated well and some have not. The best-known field study asked older adults to take a weekly walk with instructions to look for whatever surprised them, and reported more smiling and less distress after eight weeks; it is a genuinely promising result from a sample of fifty-two people. The evidence that a moment of awe can change an afternoon is decent. The claim, now standard in wellness marketing, that awe repairs the immune system or lifts a depression is not supported, and the long-term claims run well ahead of the data.

There is a second reason for caution, and it is moral rather than statistical. If awe suspends the self's ordinary defences and hands the mind a category it cannot yet fill, then whoever supplies that category has unusual power. Rulers have known this for four thousand years. The vast hall, the massed choir, the parade that stretches out of sight, the temple designed so that a person entering it feels reduced: these are technologies of awe, and their purpose is not always generosity. The same emotion that makes an audience kinder can make a crowd obedient. Any account of awe that treats it purely as a wellness product has left out half of what it does.

Which leaves the practical question. The industry grown up around this research sells awe as a destination: the aurora, the canyon, the eclipse, at a price. The research points the other way. What predicts how much awe a person reports is not how far they travel but how often they look, at weather, at old trees, at the skill of somebody very good at something, at the faces of people they have known for thirty years. People who go looking for it reliably find more of it, and they need not leave their own street to do so. The point is not that awe will improve you. It is that a mind occasionally reminded of its own scale seems to work rather better in company than one that is never reminded at all.`,
      questions: [
        { n: 27, type: "mcq", prompt: "According to the second paragraph, what makes awe different from simple enjoyment?", options: ["A It is caused only by things of enormous physical size", "B It forces a change in how the person understands the world", "C It cannot be produced deliberately in a laboratory", "D It depends on the observer's skill and authority"], answer: "B",
          explain: "The paragraph states that 'accommodation is what separates awe from ordinary pleasure' — the mind's categories must be stretched or rebuilt. A contradicts 'vastness need not be physical'; C and D simply echo words from elsewhere in the text.",
          evidence: "Accommodation is what separates awe from ordinary pleasure",
          vocab: ["revise your model of the world", "change in how the person understands the world"] },
        { n: 28, type: "mcq", prompt: "What do the studies of the 'small self' show?", options: ["A People feel worse about themselves after an experience of awe", "B The effect appears only when participants write about the experience", "C A sense of personal importance falls without any loss of well-being", "D Confidence recovers slowly once the experience has ended"], answer: "C",
          explain: "The passage insists the shrinking is not a loss of confidence or a low mood, and that well-being scores are better, not worse. B is the trap: drawing and pronoun measures are both listed, so writing is not the only method.",
          evidence: "The self shrinks, but it does not suffer",
          vocab: ["it does not suffer", "without any loss of well-being"] },
        { n: 29, type: "mcq", prompt: "The writer's main reservation about the research on awe is that", options: ["A most of it rests on short laboratory procedures", "B the emotion occurs too rarely to be studied", "C researchers cannot agree on how to define it", "D it has been carried out only with older adults"], answer: "A",
          explain: "The caution paragraph says most results come from brief laboratory manipulations measured immediately afterwards, with modest effects. C is contradicted by the 2003 definition, and D confuses one field study with the whole literature.",
          evidence: "Most of these results come from brief laboratory manipulations",
          vocab: ["brief laboratory manipulations", "short laboratory procedures"] },
        { n: 30, type: "mcq", prompt: "In the seventh paragraph, the writer suggests that awe", options: ["A is stronger when it is felt by a crowd than by an individual", "B was first used deliberately by the builders of temples", "C becomes unpleasant whenever it is mixed with fear", "D can encourage submission just as easily as kindness"], answer: "D",
          explain: "The paragraph ends by saying the same emotion that makes an audience kinder can make a crowd obedient, and that its purpose is not always generosity. A, B and C reuse the paragraph's vocabulary without stating its point.",
          evidence: "The same emotion that makes an audience kinder can make a crowd obedient",
          vocab: ["make a crowd obedient", "encourage submission"] },
        { n: 31, type: "ynng", prompt: "Psychology was slow to treat awe as a serious research subject.", answer: "YES",
          explain: "YES: the writer says that for most of the twentieth century 'psychology left it alone', because awe fitted no existing scheme and resisted laboratory control.",
          evidence: "for most of the twentieth century psychology left it alone",
          vocab: ["left it alone", "slow to treat as a serious research subject"] },
        { n: 32, type: "ynng", prompt: "Only things of great physical size are capable of producing awe.", answer: "NO",
          explain: "NO: the writer states that 'vastness need not be physical' and lists proofs, music and moral courage as sources — the statement is directly rejected.",
          evidence: "Vastness need not be physical",
          vocab: ["need not be physical", "only things of great physical size"] },
        { n: 33, type: "ynng", prompt: "People who live in the countryside experience awe more often than city dwellers.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the writer says what matters is how often people look rather than how far they travel, but never compares rural and urban residents. Do not import outside assumptions.",
          evidence: "not how far they travel but how often they look" },
        { n: 34, type: "ynng", prompt: "Claims that awe brings lasting improvements to health go further than the evidence allows.", answer: "YES",
          explain: "YES: the writer calls the immune-system and depression claims unsupported and says explicitly that 'the long-term claims run well ahead of the data'.",
          evidence: "the long-term claims run well ahead of the data",
          vocab: ["run well ahead of the data", "go further than the evidence allows"] },
        { n: 35, type: "ynng", prompt: "Deliberately setting out to find awe is a waste of effort.", answer: "NO",
          explain: "NO: the writer reports that 'people who go looking for it reliably find more of it', and adds that they need not travel at all — the opposite of a waste of effort.",
          evidence: "People who go looking for it reliably find more of it",
          vocab: ["go looking for it", "deliberately setting out to find"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "shows that the emotion can serve power as readily as kindness.",
            "gave an encouraging result from a sample too small to settle the matter.",
            "proves that the feeling has nothing in common with fear.",
            "joins a sense of vastness to the need to rebuild one's mental categories.",
            "is to notice what is already close at hand rather than travel for it.",
            "explains why some people never experience the feeling at all.",
            "become readier to help others and feel less short of time.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The definition of awe put forward in 2003", answer: "D",
          explain: "The 2003 definition has exactly two parts: perceived vastness, and a need for accommodation in which existing categories are stretched or rebuilt — ending D states both.",
          evidence: "a working definition with two parts",
          vocab: ["stretched or rebuilt", "rebuild one's mental categories"] },
        { n: 37, type: "match", group: "ends", prompt: "Volunteers who have just experienced awe", answer: "G",
          explain: "After awe, volunteers help a stranger who drops pens, give more in economic games and feel they have plenty of time — ending G, 'readier to help others and feel less short of time'.",
          evidence: "more likely to help a stranger who drops a handful of pens",
          vocab: ["plenty of time", "less short of time"] },
        { n: 38, type: "match", group: "ends", prompt: "The use of vast halls, choirs and parades by rulers", answer: "A",
          explain: "These are called technologies of awe whose purpose 'is not always generosity', and the paragraph concludes that awe can make a crowd obedient — ending A, serving power as readily as kindness.",
          evidence: "these are technologies of awe, and their purpose is not always generosity",
          vocab: ["technologies of awe", "serve power"] },
        { n: 39, type: "match", group: "ends", prompt: "The study of weekly walks taken by older adults", answer: "B",
          explain: "The walking study reported more smiling and less distress, but the writer immediately notes the sample of fifty-two — promising yet too small to be decisive, which is ending B.",
          evidence: "a genuinely promising result from a sample of fifty-two people",
          vocab: ["genuinely promising", "encouraging"] },
        { n: 40, type: "match", group: "ends", prompt: "The writer's practical advice to readers", answer: "E",
          explain: "The closing paragraph rejects awe as a paid destination and says people who look for it find it without leaving their own street — ending E, noticing what is already close at hand.",
          evidence: "they need not leave their own street to do so",
          vocab: ["need not leave their own street", "already close at hand"] },
      ],
    },
  ],
};
