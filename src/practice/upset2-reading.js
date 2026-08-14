// Smart LC Upper-Inter Set 2 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching paragraph-information + summary + people matching with one
// extra name), P3 argumentative psychology (MCQ-4 + YNNG + wordlist
// summary). Key quotas: TFNG/YNNG balanced with no runs of three, flat
// letters, unique concrete-noun answers; every question carries explain/
// evidence enrichment for the Upper-Intermediate lesson flow.
export const UPSET2_READING = {
  id: "upset2-reading",
  bookId: "upset2",
  title: "Upper-Inter Set 2 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Reaching for the sky",
      passage: `For thousands of years, the height of a building was set by a simple and stubborn rule: the walls held everything up. In a structure of brick or stone, the entire weight of the roof and every floor pressed down through the walls, so the taller a building rose, the thicker its lower walls had to be. Above five or six storeys the arithmetic became hopeless — the base swelled until it consumed the very space the building was meant to provide — and in any case few tenants would willingly climb so many stairs. Cities therefore grew outwards rather than upwards, and the skyline of 1850, in London as in New York, was pierced only by church spires and the occasional dome.

The building that broke the rule appeared in a city that had just burned. In 1871 a great fire destroyed the commercial heart of Chicago, and the rebuilding that followed collided with an awkward fact of geography: the business district was squeezed between Lake Michigan and a web of railway lines and could not spread sideways. Land prices climbed to extraordinary levels. Speculators bought and resold the same corner plots within months, and a downtown site could change hands for a sum that would once have bought a farm of several hundred hectares. For the first time, owners began to ask their architects not how wide a building could be, but how high.

The decisive answer came in 1885 from William Le Baron Jenney, an engineer commissioned to design offices for an insurance company. Instead of resting the floors on the walls, Jenney hung them on a metal skeleton of iron and steel columns and beams concealed inside the building; the masonry outside carried almost nothing but its own weight. His Home Insurance Building rose ten storeys yet weighed perhaps a third as much as a conventional block of the same size. It was demolished in 1931, and engineers still argue over how much steel it really contained, but historians generally honour it as the first true skyscraper.

How radical the new method was can still be seen a few streets away. The Monadnock Building, finished in 1891, was the last great American tower to be supported the old way, and the price of tradition is written in its fabric: to hold up sixteen storeys it needed walls almost two metres thick at street level, tapering as they rise, and its lowest offices sit behind deep, gloomy openings. In a framed building, by contrast, the outer wall supports nothing. It became a light curtain of glass and stone hung on the frame, windows could spread until they filled the wall, and floors could be added without thickening anything below.

Two further problems had to be solved before offices thirty floors up could earn their rent. The first was reaching them: safe passenger lifts, perfected in the same decades, turned the upper floors from a punishment into the most valuable space in the building. The change of habit was complete within a generation: where the cheapest rooms had once been those nearest the roof, the top of a tower now commanded the highest rents, and the grandest offices moved upstairs to the light and the view. The second was the weather. A tall frame flexes, and in a gale its upper floors can move alarmingly; engineers learned to thread diagonal bracing between the columns to stiffen the frame against the wind, borrowing their tricks from the builders of iron bridges.

New York took the Chicago invention and turned it into a competition. By the early twentieth century its towers were crowding out the sky, and in 1916 the city adopted a pioneering zoning resolution. Contrary to popular belief, it set no limit on height. Instead it required a building's upper floors to step back from the street in stages, so that light could reach the pavements below, and it allowed a tower of unlimited height on no more than a quarter of the plot. The law gave the city its classic 'wedding cake' silhouette — and its race to the clouds. The Chrysler Building snatched the record in 1930 by hoisting a hidden steel spire through its own roof, only to be overtaken within a year by the Empire State Building, completed ahead of schedule in 1931 and unchallenged for four decades afterwards.

The race has since left America altogether: the majority of the world's hundred tallest buildings now stand in Asia or the Middle East, and the tallest of all rises above Dubai. Their problems, however, are the old ones magnified. The slenderest towers sway enough to unsettle stomachs, so designers now hang a tuned mass damper near the summit — a steel pendulum weighing several hundred tonnes that swings a heartbeat behind the building and cancels much of its motion. A visitor gazing up at such a tower is looking at the same idea Jenney hid inside his Chicago offices: a building is no longer a pile of walls, but a skeleton wearing a skin.`,
      questions: [
        { n: 1, type: "gap", prompt: "In a brick or stone building, the whole weight of the structure was carried by its ______.", note: "ONE WORD ONLY", answer: "walls",
          explain: "The first paragraph explains that in traditional buildings all the weight travelled down through the walls, which is why the lower walls had to be so thick.",
          evidence: "the entire weight of the roof and every floor pressed down through the walls",
          vocab: ["pressed down through", "carried by"] },
        { n: 2, type: "gap", prompt: "The rebuilding of Chicago after a great ______ created a demand for taller buildings.", note: "ONE WORD ONLY", answer: "fire",
          explain: "Chicago is the city 'that had just burned': the 1871 fire destroyed its centre, and the rebuilding that followed created the pressure to build upwards.",
          evidence: "a great fire destroyed the commercial heart of Chicago" },
        { n: 3, type: "gap", prompt: "Jenney supported the floors on a metal ______ hidden inside the building.", note: "ONE WORD ONLY", answer: "skeleton",
          explain: "Jenney's floors did not rest on the walls; they hung on a skeleton of iron and steel columns and beams. 'Hidden' in the question paraphrases 'concealed'.",
          evidence: "hung them on a metal skeleton of iron and steel",
          vocab: ["concealed", "hidden"] },
        { n: 4, type: "gap", prompt: "In framed buildings, the outer wall became a thin ______ of glass and stone.", note: "ONE WORD ONLY", answer: "curtain",
          explain: "Once the frame carried the load, the outer wall supported nothing and became a curtain of glass and stone; 'thin' in the question matches 'light' in the passage.",
          evidence: "a light curtain of glass and stone hung on the frame",
          vocab: ["light", "thin"] },
        { n: 5, type: "gap", prompt: "Engineers added diagonal bracing to stop tall frames moving in the ______.", note: "ONE WORD ONLY", answer: "wind",
          explain: "A tall frame flexes in a gale, so engineers threaded diagonal bracing between the columns; the gap needs the natural force being resisted — the wind.",
          evidence: "stiffen the frame against the wind" },
        { n: 6, type: "gap", prompt: "The 1916 law made upper floors step back so that ______ could reach street level.", note: "ONE WORD ONLY", answer: "light",
          explain: "The zoning resolution required upper floors to step back in stages precisely so that daylight could reach the pavements — the streets — below.",
          evidence: "so that light could reach the pavements below",
          vocab: ["pavements", "streets"] },
        { n: 7, type: "gap", prompt: "To reduce swaying, some modern towers contain a huge steel ______ near the top.", note: "ONE WORD ONLY", answer: "pendulum",
          explain: "Modern designers hang a tuned mass damper near the summit: a steel pendulum whose swing lags behind the building and cancels much of its movement.",
          evidence: "a steel pendulum weighing several hundred tonnes",
          vocab: ["near the summit", "near the top"] },
        { n: 8, type: "tfng", prompt: "The Home Insurance Building no longer exists.", answer: "TRUE",
          explain: "TRUE: the passage states directly that the building was demolished in 1931, so it no longer stands today.",
          evidence: "It was demolished in 1931" },
        { n: 9, type: "tfng", prompt: "The walls of the Monadnock Building are the same thickness at every level.", answer: "FALSE",
          explain: "FALSE: the walls are almost two metres thick at street level and taper as they rise, so their thickness changes from level to level.",
          evidence: "walls almost two metres thick at street level, tapering as they rise" },
        { n: 10, type: "tfng", prompt: "Steel-frame buildings were cheaper to construct than load-bearing ones.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage compares the weight and the walls of the two methods, but it never says anything about their construction costs.",
          evidence: "In a framed building, by contrast, the outer wall supports nothing" },
        { n: 11, type: "tfng", prompt: "The Empire State Building was finished earlier than planned.", answer: "TRUE",
          explain: "TRUE: 'finished earlier than planned' paraphrases 'completed ahead of schedule' — the building then held the height record for four decades.",
          evidence: "completed ahead of schedule in 1931",
          vocab: ["ahead of schedule", "earlier than planned"] },
        { n: 12, type: "tfng", prompt: "The 1916 New York regulations set a maximum height for buildings.", answer: "FALSE",
          explain: "FALSE: the passage contradicts this head-on — the law 'set no limit on height'; it only controlled a building's shape through setbacks.",
          evidence: "it set no limit on height" },
        { n: 13, type: "tfng", prompt: "Most of the world's tallest buildings today are in the United States.", answer: "FALSE",
          explain: "FALSE: the race has left America — the majority of the hundred tallest buildings now stand in Asia or the Middle East, with the tallest in Dubai.",
          evidence: "now stand in Asia or the Middle East" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The smallest livestock",
      passage: `A — Depending on where in the world you grew up, the idea of eating an insect is either perfectly ordinary or almost unthinkable. Roasted crickets are sold in bags at Mexican markets, fried grasshoppers are a street snack across parts of Africa and Asia, and by most estimates some two billion people already include insects in their diet. What is new is the attempt to turn this ancient habit into an industry. Over the past decade, dozens of companies in Europe and North America have begun farming crickets, mealworms and a remarkable creature called the black soldier fly in stacked plastic trays inside converted warehouses. Their bet is a simple one: that the world's growing demand for protein cannot be met by conventional livestock alone, and that the smallest livestock of all can help to fill the gap.

B — On paper, the case is compelling. Because insects are cold-blooded, they waste no energy keeping their bodies warm, and they convert feed into body mass with startling efficiency: a kilogram of crickets can be raised on less than two kilograms of feed, while a kilogram of beef requires roughly eight. They need a tiny fraction of the land and water that cattle do, they mature in weeks rather than years, and some species will happily grow fat on food waste that would otherwise be thrown away. Yet the environmental arithmetic is not automatic. Ingrid Solberg, an environmental scientist who has compared the full life cycles of insect farms with those of chicken and salmon production, found that the answer depends on what the insects eat and on how their buildings are run. "An insect is only as green as its diet and its heating bill," she says. "Feed the larvae on grain grown specially for them, and warm their sheds all winter with fossil electricity, and much of the advantage simply evaporates."

C — Perhaps surprisingly, most insect companies are not trying to put their product on anyone's dinner plate — at least not directly. Their customers are other animals. Fish farming is the fastest-growing form of food production on the planet, and it has a structural problem: farmed salmon and trout have traditionally been fed on fishmeal, made from small wild-caught fish such as anchovies, and the supply of those fish cannot grow any further. Prices have climbed steadily for decades. Larvae of the black soldier fly, which wild fish eat naturally, can be raised on organic residues and pressed into a high-protein meal that suits fish and poultry well. Joseph Banda, an analyst who studies the animal-feed market, believes this is where insects will matter first. "Persuading a salmon to eat an insect requires no advertising campaign," he points out. "The most useful thing insect farming can do this decade is to take the pressure off wild fish."

D — Feeding insects to people is a different matter, and the obstacle is not nutrition but feeling. Marc Feldman, a consumer psychologist, has spent years measuring precisely how and when disgust defeats curiosity. In his tasting studies, most volunteers refuse a whole roasted cricket, however politely it is served. Grind the same cricket into flour and bake it into biscuits, bread or pasta, however, and acceptance rises dramatically — in one experiment, three-quarters of participants happily ate crackers clearly labelled as containing insect flour, and rated them as tasty as the ordinary version. "Visibility is the real barrier," Feldman concludes. "People will eat insects they cannot see. What they cannot manage, at least for now, is legs and wings on a plate."

E — Even if shoppers can be won over, the industry has production problems of its own to solve. An insect farm is a city of millions of inhabitants packed into crowded trays, and disease can move through such a city with frightening speed — a single viral outbreak has been known to wipe out an entire cricket farm in days. Breeding stock remains barely domesticated, automation is still primitive, and hand labour keeps costs stubbornly high. Ana Duarte, a food scientist who advises several producers, notes that insect meal still sells for several times the price of the soy and fishmeal it is meant to replace. "The biology works beautifully," she says. "It is the arithmetic that does not. Until a kilogram of insect protein costs no more than the ingredient it replaces, this will remain a niche business, whatever its virtues."

F — Regulators, meanwhile, are feeling their way through unfamiliar territory. The European Union has now approved several species, including the house cricket and the yellow mealworm, for human consumption as "novel foods", and insect protein may legally be fed to farmed fish and, more recently, to poultry and pigs. Each approval, however, took years of committee work, because the safety rules were originally written with other industries in mind — a point the food lawyer Helen Croft has made repeatedly to anyone who will listen. Whether or not insects ever become a familiar sight in supermarkets, the industry's quieter path is already clear: they will reach most of us indirectly, inside the fish and chicken we already eat. The smallest livestock may change farming not by appearing on the plate, but by disappearing into it.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "figures comparing the feed needed by insects and by cattle", answer: "B",
          explain: "Paragraph B gives the figures: a kilogram of crickets needs less than two kilograms of feed, while a kilogram of beef requires roughly eight.",
          evidence: "a kilogram of crickets can be raised on less than two kilograms of feed" },
        { n: 15, type: "match", group: "minfo", prompt: "examples of familiar foods in which insect flour was accepted", answer: "D",
          explain: "Paragraph D lists them: ground into flour, the same cricket was accepted in biscuits, bread, pasta and clearly labelled crackers.",
          evidence: "bake it into biscuits, bread or pasta" },
        { n: 16, type: "match", group: "minfo", prompt: "a reason why insect protein is attractive to the fish-farming industry", answer: "C",
          explain: "Paragraph C explains the logic: fishmeal comes from wild fish whose supply cannot grow, so prices keep climbing while fish farming keeps expanding.",
          evidence: "the supply of those fish cannot grow any further" },
        { n: 17, type: "match", group: "minfo", prompt: "a description of how illness can spread when insects are packed together", answer: "E",
          explain: "Paragraph E describes disease moving with frightening speed through the crowded trays, including a viral outbreak that destroyed a whole farm in days.",
          evidence: "disease can move through such a city with frightening speed",
          vocab: ["crowded trays", "packed together"] },
        { n: 18, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Farming insects",
            lines: [
              "Insects convert feed into body weight very efficiently, and they use only a small share of the {{18}} and land that cattle require.",
              "Some species can even be raised on food {{19}} that would otherwise be discarded.",
              "However, the climate benefit shrinks if the larvae eat specially grown grain and their sheds are warmed with fossil {{20}}.",
              "Most producers therefore target the market for animal {{21}}, especially for farmed fish.",
              "For human food, the main barrier remains the {{22}} that whole insects provoke in many consumers.",
            ],
          },
          answer: "water",
          explain: "Cattle need far more land and water than insects do; the summary reverses the order of the pair, so the missing word is water.",
          evidence: "a tiny fraction of the land and water that cattle do" },
        { n: 19, type: "gap", group: "sum2", answer: "waste",
          explain: "Some species grow fat on food waste that would otherwise be thrown away; 'discarded' in the summary paraphrases 'thrown away'.",
          evidence: "food waste that would otherwise be thrown away",
          vocab: ["thrown away", "discarded"] },
        { n: 20, type: "gap", group: "sum2", answer: "electricity",
          explain: "Solberg's warning names the energy source: sheds warmed all winter with fossil electricity can wipe out much of the climate advantage.",
          evidence: "warm their sheds all winter with fossil electricity" },
        { n: 21, type: "gap", group: "sum2", answer: "feed",
          explain: "Most companies sell to other animals rather than to people, so the realistic market is animal feed — Banda's whole argument is about feeding fish.",
          evidence: "Their customers are other animals" },
        { n: 22, type: "gap", group: "sum2", answer: "disgust",
          explain: "Feldman measures when disgust defeats curiosity: whole insects provoke that reaction, so disgust is the barrier the summary needs.",
          evidence: "how and when disgust defeats curiosity" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Ingrid Solberg",
            "Joseph Banda",
            "Marc Feldman",
            "Ana Duarte",
            "Helen Croft",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one more person than you need.",
          prompt: "The price of insect protein must fall before the industry can grow beyond a niche.", answer: "D",
          explain: "Duarte's point is arithmetic: until a kilogram of insect protein costs no more than the ingredient it replaces, it stays a niche business.",
          evidence: "costs no more than the ingredient it replaces" },
        { n: 24, type: "match", group: "people", prompt: "The environmental value of insect farming depends on how the farms are operated.", answer: "A",
          explain: "Solberg compared full life cycles and found the benefit depends on the insects' diet and on how their buildings are heated and run.",
          evidence: "the answer depends on what the insects eat",
          vocab: ["buildings are run", "farms are operated"] },
        { n: 25, type: "match", group: "people", prompt: "Consumers accept insect protein when it is invisible in familiar foods.", answer: "C",
          explain: "Feldman's rule is visibility: people will eat insects they cannot see, accepting flour in biscuits and crackers while refusing whole insects.",
          evidence: "People will eat insects they cannot see",
          vocab: ["cannot see", "invisible"] },
        { n: 26, type: "match", group: "people", prompt: "The industry's most important contribution will be reducing demand for wild-caught fish.", answer: "B",
          explain: "Banda believes the most useful thing insect farming can do this decade is to replace fishmeal and so take the pressure off wild fish.",
          evidence: "take the pressure off wild fish",
          vocab: ["take the pressure off", "reducing demand"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "What was your name again?",
      passage: `The situation is so universal that every language seems to have a joke about it. A familiar figure approaches you at a party, smiling in recognition. You know her face at once; you know she is an architect; you remember that she has a dog and strong opinions about coffee. Her name, however, has simply gone. Most of us treat such moments as small personal failures and, past a certain age, as something more ominous. Memory researchers see them quite differently. Proper names, study after study confirms, are the most fragile items in the mental dictionary: they are forgotten earlier, more often and more completely than almost any other kind of word, by the young as well as the old. Explaining why has turned out to reveal a great deal about how human memory is built.

The classic demonstration is known as the Baker/baker paradox. Volunteers are shown a photograph of an unfamiliar man. Half are told that the man is a baker; the others are told that his surname is Baker. When the groups are tested days later, those given the profession remember it roughly twice as often as those given the name — although the word itself is identical. The difference lies in what the word touches. A baker, as an occupation, summons a web of associations: flour, ovens, early mornings, the smell of fresh bread. Baker as a surname touches nothing. It is an arbitrary label, fastened to its owner by convention rather than by meaning, and memory can hold on to it only by that single thread. Ordinary words are held in place by their many links; a name hangs by one.

Why, then, do we recognise the face and the profession while the name refuses to come? Research on how we identify people points to an answer with an elegant shape: retrieval proceeds through a fixed sequence of stages. The face is matched first, producing that instant feeling of familiarity. Biographical knowledge is unlocked next — where you know her from, what she does, whom she married. Only at the end of the chain does the name itself arrive. Because the name sits at the far end of the sequence, it is the first thing to fail when the system is tired, distracted or simply older, while everything upstream survives. The reverse experience — confidently recalling a name while knowing nothing whatever about its owner — essentially never occurs, an asymmetry that is hard to explain unless retrieval really does run in one direction.

Sometimes the chain does not so much break as jam. In the tip-of-the-tongue state, which researchers have now studied for six decades, a word feels imminently available yet refuses to surface. The name is not gone; it is stored but temporarily out of reach, and the proof is that people in this state can often report the first letter, the number of syllables, even the stress pattern of the missing word. Frequently a wrong name arrives instead — you reach for Malika and are handed Marina — and this uninvited guest makes matters worse: once retrieved, it actively blocks the target, returning more strongly each time you try. The practical advice from the laboratory is counter-intuitive but well supported: stop trying. Released from the struggle, memory very often delivers the missing name a few minutes later, once the blocker has faded.

For older adults, these episodes carry a special dread. Name-finding is among the first abilities to feel the effects of normal ageing, and in surveys of healthy people over fifty, forgetting names is the single most common complaint about memory. Understandably, many fear that a vanished name is the first footprint of dementia. In fact it is a poor predictor. The diseases of memory announce themselves differently — in losing the thread of recent events, in repeated questions, in familiar routes that suddenly confuse — and clinicians attach little weight to misplaced names on their own. A stuck name, by itself, is an ordinary memory doing what ordinary memories do.

The remedies that genuinely work all attack the same weakness: arbitrariness. Memory trainers teach elaboration — converting the empty sound of a name into a vivid picture and pinning it to the person: Mrs Fisher casting a fishing line, Mr Stone with a boulder under his arm. The technique feels childish, and that is precisely why it succeeds, because the image gives the empty label the one thing it lacked: connections. But the most common cause of a 'forgotten' name is humbler still — the name was never stored in the first place. At the moment of introduction, our attention is consumed by the social performance: smiling, offering a hand, composing our own next sentence. The syllables pass through the room without ever entering memory, and there is nothing, later, to retrieve. Hence the oldest advice remains the best: use a new name immediately, and you double the chance of keeping it. Our brains, in the end, were built to remember what people are, not what they are called — and a system tuned so finely to meaning will always fumble the one kind of word that has none.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What point does the writer make in the first paragraph?",
          options: ["A Forgetting a name usually signals the beginning of memory decline", "B People forget names because they meet too many new people", "C Difficulty with names says more about memory's design than about the individual", "D Older people forget names far more often than young people do"],
          answer: "C",
          explain: "The paragraph argues these lapses are not personal failures or omens: names are fragile for everyone, and studying them reveals how memory is built.",
          evidence: "reveal a great deal about how human memory is built" },
        { n: 28, type: "mcq", prompt: "The Baker/baker experiment shows that a word is easier to remember when it",
          options: ["A is connected to many other pieces of knowledge", "B is heard several days before the test", "C is presented together with a photograph", "D is a common surname rather than a rare one"],
          answer: "A",
          explain: "The occupation wins because it summons flour, ovens and bread — many links. Option C echoes the photograph detail, which both groups saw equally.",
          evidence: "Ordinary words are held in place by their many links",
          vocab: ["web of associations", "connected"] },
        { n: 29, type: "mcq", prompt: "According to the writer, the tip-of-the-tongue state proves that",
          options: ["A unused names disappear from memory completely", "B people can invent details of words they never knew", "C similar names are kept in separate parts of memory", "D a name can remain in memory while being impossible to produce"],
          answer: "D",
          explain: "People in the state can report the first letter and syllable count, so the name is stored but temporarily out of reach — present yet unproducible.",
          evidence: "it is stored but temporarily out of reach",
          vocab: ["out of reach", "impossible to produce"] },
        { n: 30, type: "mcq", prompt: "The writer says many names are forgotten because",
          options: ["A older listeners cannot hear introductions clearly", "B the listener's mind is occupied at the moment of introduction", "C people rarely meet a new person more than once", "D modern introductions are too short"],
          answer: "B",
          explain: "At introductions our attention is consumed by smiling and planning what to say next, so the name is never stored; 'mind is occupied' paraphrases this.",
          evidence: "our attention is consumed by the social performance",
          vocab: ["attention is consumed", "mind is occupied"] },
        { n: 31, type: "ynng", prompt: "Proper names are harder to retrieve than most other words.", answer: "YES",
          explain: "YES: proper names are called the most fragile items in the mental dictionary, forgotten earlier and more often than almost any other kind of word.",
          evidence: "the most fragile items in the mental dictionary" },
        { n: 32, type: "ynng", prompt: "A person's name is usually recalled before other facts about them.", answer: "NO",
          explain: "NO: the passage says the exact opposite — the face and the biographical facts come first, and the name arrives only at the end of the chain.",
          evidence: "Only at the end of the chain does the name itself arrive" },
        { n: 33, type: "ynng", prompt: "Tip-of-the-tongue states are more frequent in some languages than in others.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: tip-of-the-tongue research is described in detail, but the passage never compares how often the state occurs in different languages.",
          evidence: "which researchers have now studied for six decades" },
        { n: 34, type: "ynng", prompt: "Forgetting acquaintances' names is a reliable early sign of serious memory disease.", answer: "NO",
          explain: "NO: the writer states a vanished name is a poor predictor of dementia; the diseases of memory announce themselves in quite different ways.",
          evidence: "In fact it is a poor predictor" },
        { n: 35, type: "ynng", prompt: "Techniques that give a name meaning can improve recall.", answer: "YES",
          explain: "YES: elaboration converts a name into a vivid image, and the writer says the technique succeeds precisely because it supplies what the label lacked.",
          evidence: "that is precisely why it succeeds" },
        { n: 36, type: "gap", group: "wl",
          box: ["attention", "blocking", "connections", "decline", "images", "labels", "meaning", "rehearsal", "stages"],
          boxTitle: "List of Words",
          notes: {
            title: "Summary — Why names slip away",
            lines: [
              "Names are hard to retrieve because they are arbitrary {{36}} which, unlike ordinary words, carry almost no {{37}}.",
              "Recognising a person happens in fixed {{38}}, with the name arriving last of all.",
              "A similar rival name can cause {{39}}, keeping the right one out of reach.",
              "Memory techniques succeed by giving a name new {{40}}.",
            ],
          },
          answer: "F",
          explain: "Names are described as arbitrary labels: the word Baker as a surname is fastened to its owner by convention alone, holding by a single thread.",
          evidence: "It is an arbitrary label" },
        { n: 37, type: "gap", group: "wl", answer: "G",
          explain: "The label is attached by convention rather than by meaning — unlike 'baker' the occupation, the surname carries no meaning of its own.",
          evidence: "by convention rather than by meaning" },
        { n: 38, type: "gap", group: "wl", answer: "I",
          explain: "Person memory retrieves in a fixed sequence of stages — face, then biography, then name — so 'stages' completes the summary line.",
          evidence: "a fixed sequence of stages" },
        { n: 39, type: "gap", group: "wl", answer: "B",
          explain: "A wrong name like Marina, once retrieved, actively blocks the right one and returns more strongly each time — the box word is blocking.",
          evidence: "it actively blocks the target" },
        { n: 40, type: "gap", group: "wl", answer: "C",
          explain: "Imagery works because it gives the empty label the one thing it lacked — connections; 'images' names the method, not the mechanism.",
          evidence: "the one thing it lacked: connections" },
      ],
    },
  ],
};
