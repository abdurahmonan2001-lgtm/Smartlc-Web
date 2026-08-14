// Smart LC Practice Set 7 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET7_READING = {
  id: "pset7-reading",
  bookId: "pset7",
  title: "Practice Set 7 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Concrete, old and new",
      passage: `After water, concrete is the substance that human beings consume in the greatest quantity, and almost every road, bridge, dam and apartment block of the past hundred years has depended on it. Its recipe is disarmingly simple: cement, sand and gravel, and water. What makes it interesting is that the mixture does not dry. The water is not lost but consumed, locking into the cement in a chemical reaction called hydration that grows a mass of interlocking crystals through the whole mass. This is why fresh concrete sets perfectly well under the sea, and why builders on a hot site keep it damp rather than letting it bake. The reaction also gives off heat, enough in a mass as thick as a dam to crack the wall from within. Concrete is, in effect, an artificial stone that arrives as a liquid.

The Romans understood the material better than anyone would again for fifteen hundred years. Their engineers discovered that lime mixed with a particular volcanic ash, dug from the ground near the Bay of Naples, produced a mortar of remarkable strength, and they built with it on a scale nothing else allowed. The dome of the Pantheon in Rome, completed around AD 126, is made of unreinforced concrete, lightened towards its crown with a coarse aggregate of pumice; nearly two thousand years later it remains the largest structure of its kind on earth. More surprising still are the harbours. Roman marine engineers packed the mixture into wooden forms and lowered it into the Mediterranean, and modern analysis has shown that seawater, far from destroying these blocks, reacted slowly with the ash to grow new interlocking minerals inside them. The piers of Roman harbours have therefore been getting stronger, very gradually, for twenty centuries.

With the collapse of the western empire the technique was largely lost. Medieval Europe built in stone, brick and timber, and although lime mortars were never forgotten, nobody again poured whole structures. The rediscovery was the work of engineers with a specific problem. In the 1750s the Englishman John Smeaton, commissioned to build a lighthouse on the Eddystone rocks off Plymouth, needed a mortar that would harden in wet conditions, and by patient testing he found that limes burnt from clay-rich limestone would do exactly that. Seventy years later a bricklayer from Leeds named Joseph Aspdin patented a fiercer version, burnt at a higher temperature and ground to a fine powder. He called it Portland cement, because the grey stone it set into resembled the building stone quarried on the Isle of Portland. The name has outlived everything else about him.

Cement alone, however, could not have produced the modern city. Concrete resists crushing magnificently and pulling very badly: a beam of it will snap under its own weight if the span is at all generous. The remedy came from an unlikely direction. In 1867 Joseph Monier, a French gardener who was tired of his plant tubs cracking, patented pots made of concrete strengthened with a mesh of iron, and the idea moved rapidly from the nursery to the building site. The contractor François Hennebique soon turned it into a complete system of beams, columns and floors. Steel and concrete turn out to be almost perfect partners. They expand and contract at nearly the same rate as the temperature changes, so the two never tear each other apart, and the chemistry of the surrounding concrete is alkaline enough to keep the metal from rusting. Freed from the limits of stone, architects could cantilever a balcony into the air and roof a hall without a single column.

That partnership also contains the flaw of modern concrete. Over decades, carbon dioxide from the air works into the surface and neutralises its alkalinity, and salt from winter grit lorries or sea spray travels in through fine cracks. Once the protective chemistry fails, the reinforcement corrodes; rust occupies more space than the steel it replaces, so the metal swells and blows the surface off from within. Engineers call the result spalling and the public calls it concrete cancer. A great deal of twentieth-century construction is now reaching the age at which it appears, and the Roman harbours look, by comparison, embarrassingly durable.

There is a second and larger problem. Making cement means heating limestone in a kiln to around 1,450 degrees, which burns a great deal of fuel; but the chemistry itself also drives carbon dioxide out of the limestone, and that share, roughly half of the total, cannot be removed by changing the fuel. Cement production accounts for something close to eight per cent of the world's carbon emissions, more than aviation and shipping combined.

The response has produced a genuinely inventive decade. Part of the cement in a mix can be replaced with industrial leftovers such as blast-furnace slag or the ash from coal-fired power stations, and a newer recipe substitutes clay, roasted at much lower temperatures, for as much as half of it. Others have gone back to the Romans, studying the seawater reaction in the hope of designing marine structures that improve with age. The most theatrical proposal comes from Delft, where researchers mix dormant bacteria and their food into the wet mixture; when a crack opens and water reaches them, the organisms wake, feed, and deposit limestone that seals the gap. Concrete that repairs itself would not solve the carbon problem, but it would keep buildings standing longer, and in a material this heavy that is a saving of its own.`,
      questions: [
        { n: 1, type: "gap", group: "p1c", note: "ONE WORD ONLY",
          prompt: "Concrete hardens through a chemical reaction known as ______, not by drying out.", answer: "hydration",
          explain: "The passage says the water is consumed, locking into the cement 'in a chemical reaction called hydration'. The question turns 'called' into 'known as', so the missing noun is copied straight from the text.",
          evidence: "a chemical reaction called hydration",
          vocab: ["called", "known as"] },
        { n: 2, type: "gap", group: "p1c",
          prompt: "Roman builders made a very strong mortar by combining lime with volcanic ______ from near the Bay of Naples.", answer: "ash",
          explain: "Their engineers found that 'lime mixed with a particular volcanic ash' made a mortar of remarkable strength. 'Combining' is the question's paraphrase of 'mixed'.",
          evidence: "lime mixed with a particular volcanic ash",
          vocab: ["mixed with", "combining"] },
        { n: 3, type: "gap", group: "p1c",
          prompt: "The Pantheon's ______, finished in about AD 126, is still the biggest one of its type anywhere.", answer: "dome",
          explain: "The date AD 126 locates the sentence about the dome of the Pantheon, which 'remains the largest structure of its kind on earth' — the question's 'still the biggest one of its type anywhere'.",
          evidence: "The dome of the Pantheon in Rome, completed around AD 126",
          vocab: ["remains the largest", "still the biggest"] },
        { n: 4, type: "gap", group: "p1c",
          prompt: "Tests have shown that ______ made new minerals grow inside Roman harbour blocks.", answer: "seawater",
          explain: "Modern analysis showed that seawater 'reacted slowly with the ash to grow new interlocking minerals inside them'. 'Analysis has shown' becomes 'tests have shown' in the question.",
          evidence: "reacted slowly with the ash to grow new interlocking minerals inside them",
          vocab: ["modern analysis", "tests"] },
        { n: 5, type: "gap", group: "p1c",
          prompt: "Smeaton was searching for a mortar that would set in wet conditions while he was building a ______.", answer: "lighthouse",
          explain: "Smeaton was 'commissioned to build a lighthouse on the Eddystone rocks' and needed a mortar that would harden when wet. 'Harden' is paraphrased as 'set' in the question.",
          evidence: "commissioned to build a lighthouse on the Eddystone rocks",
          vocab: ["harden in wet conditions", "set in wet conditions"] },
        { n: 6, type: "gap", group: "p1c",
          prompt: "Monier reinforced his garden pots with a mesh made of ______.", answer: "iron",
          explain: "Monier 'patented pots made of concrete strengthened with a mesh of iron'. 'Strengthened' in the passage is the question's 'reinforced', so the answer is the metal named.",
          evidence: "concrete strengthened with a mesh of iron",
          vocab: ["strengthened", "reinforced"] },
        { n: 7, type: "tfng", prompt: "The dome of the Pantheon contains no metal reinforcement.", answer: "TRUE",
          explain: "TRUE: the passage states plainly that the dome 'is made of unreinforced concrete' — unreinforced means no metal was put inside it.",
          evidence: "is made of unreinforced concrete",
          vocab: ["unreinforced concrete", "no metal reinforcement"] },
        { n: 8, type: "tfng", prompt: "Long contact with the sea has weakened Roman harbour concrete.", answer: "FALSE",
          explain: "FALSE: the text says seawater, 'far from destroying these blocks', grew new minerals in them, and that the piers have been getting stronger for twenty centuries — the opposite of weakened.",
          evidence: "far from destroying these blocks",
          vocab: ["getting stronger", "weakened"] },
        { n: 9, type: "tfng", prompt: "Smeaton's lighthouse was the first structure in Britain to be built of concrete.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: we are told what Smeaton needed and what he discovered, but the passage never ranks his lighthouse against other buildings. Claims about being 'the first' are a classic NOT GIVEN trap.",
          evidence: "needed a mortar that would harden in wet conditions" },
        { n: 10, type: "tfng", prompt: "Aspdin's cement was fired at a greater heat than Smeaton's material.", answer: "TRUE",
          explain: "TRUE: Aspdin patented 'a fiercer version, burnt at a higher temperature' than the clay-rich limes Smeaton had described seventy years earlier.",
          evidence: "burnt at a higher temperature",
          vocab: ["a higher temperature", "a greater heat"] },
        { n: 11, type: "tfng", prompt: "Concrete breaks more easily when it is compressed than when it is stretched.", answer: "FALSE",
          explain: "FALSE: concrete 'resists crushing magnificently and pulling very badly', so it is stretching, not compression, that breaks it — the statement reverses the passage.",
          evidence: "resists crushing magnificently and pulling very badly",
          vocab: ["crushing", "compressed"] },
        { n: 12, type: "tfng", prompt: "Steel and concrete react to changes in temperature in much the same way.", answer: "TRUE",
          explain: "TRUE: the two 'expand and contract at nearly the same rate as the temperature changes', which is why they do not tear each other apart.",
          evidence: "expand and contract at nearly the same rate as the temperature changes",
          vocab: ["at nearly the same rate", "in much the same way"] },
        { n: 13, type: "tfng", prompt: "Concrete cancer is more common near the coast than inland.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: sea spray is named as one source of salt alongside winter grit lorries, but the passage never compares how often the damage occurs in coastal and inland places.",
          evidence: "salt from winter grit lorries or sea spray travels in through fine cracks" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Streets without cars",
      passage: `A — The street is the oldest piece of public equipment a city owns, and for most of urban history it was a room rather than a corridor. Children played in it, traders sold from it, neighbours argued across it, and the slow traffic of carts and animals threaded through the gaps. The motor car ended that arrangement within a single generation: by the 1930s the roadway had been redefined as a place for vehicles, and everyone else was pushed to its edges and told when to cross. The word jaywalker, coined by American motoring interests, made the pedestrian the intruder. In 1962 Copenhagen closed Strøget, its main shopping street, to traffic for a trial winter. Shopkeepers predicted ruin and newspapers predicted empty pavements. Both were wrong, and within a decade the experiment had been copied across northern Europe.

B — The present wave is larger and more ambitious. Instead of pedestrianising one high street, cities now filter whole districts. Barcelona's superblocks group nine city blocks together and push through-traffic out to their perimeter; London and Ghent have closed hundreds of residential short cuts with bollards and planters; and several thousand European schools now shut their surrounding streets at the start and end of the school day. The motives have shifted too. Early schemes were argued on shopping; today's are argued on road safety, air quality, noise, climate targets and, increasingly, the arithmetic of space, since a parked car occupies twelve square metres for the twenty-three hours a day it is not moving.

C — Every scheme meets the same objection: the cars will simply go somewhere else. Behind it lies an assumption traffic engineers held for decades: that the number of vehicles is fixed, like water in a pipe, and must reappear wherever it is allowed to. The transport engineer Ingrid Halvorsen has spent twenty years showing that the assumption is false. Reviewing several hundred road closures, she found that some drivers do divert, but others travel at a different hour, share a vehicle, switch to a bus or a bicycle, combine two errands, or decide the journey was not worth making. On average a substantial share of the displaced traffic never turns up anywhere at all; it simply evaporates. Her sample runs from single closed bridges to the removal of whole urban motorways. The mirror image of the finding is better known and rarely acted upon: widen a road, and within a few years the new lanes fill, so that adding capacity generates the congestion it was built to cure.

D — The second objection comes from business, and it is sincerely felt. The retail analyst Rafael Duarte has surveyed traders and their customers in the same streets, on the same days, for a decade, and finds a consistent gap between the two. Shopkeepers in his surveys believe that around half of their customers arrive by car; when the customers are asked, the true figure is usually between a tenth and a quarter, the rest arriving on foot, by bicycle or by bus. Traders, he suspects, generalise from their own commute. After pedestrianisation the counts usually support him: in the schemes he has followed, footfall rose over the first two years and takings rose with it. He adds two qualifications: the gains are largest for cafés and small independent shops, and any scheme that fails to give deliveries a workable morning window will lose the traders it most needs.

E — The health case is newer and, to its advocates, decisive. The public-health researcher Amara Nwosu measured the air inside classrooms on filtered streets before and after closure, and recorded falls in nitrogen dioxide of a fifth or more within a year. Noise, which she regards as the more underrated harm, dropped by an amount her subjects described as the difference between shouting and speaking. Her longer interest is in children. The proportion of British children who walk or cycle to school unaccompanied fell by more than half between the 1970s and the 2010s, a change she attributes almost entirely to fear of traffic, and school-street schemes are the first intervention she has studied that reverses it.

F — The strongest criticism is not that these schemes fail but that they are unfair. The urban geographer Stefan Weiss maps traffic before and after, and points out that the roads which absorb whatever does not evaporate are usually the boundary roads: wider, poorer, already noisier, and lined with the cheapest housing in the district. A filtered neighbourhood can therefore export its dirty air and its noise to the people least able to object. Households on those roads are also the least likely to own a car. Weiss adds two complaints supporters brush aside too quickly. Drivers with disabilities may depend on the door they are no longer permitted to reach, and the residents who dominate consultation meetings are, everywhere he has looked, the older and more confident half of the street.

G — None of this is an argument against removing cars; it is an argument about method, and the planner Yuki Tanaka has made a specialty of method. Her rule is that nothing should be built in concrete until it has been tried in plastic. A scheme begins as movable planters and painted bollards for eighteen months; traffic, air and trade are measured on the filtered streets and the boundary roads alike; the figures are published, argued over and, where necessary, used to redraw the layout; only then is a permanent decision taken. Trials, she notes drily, turn an argument about principles into an argument about evidence, and the evidence, in most of her schemes, has been enough.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a description of how streets were used before motor vehicles took them over", answer: "A",
          explain: "Paragraph A describes the street as 'a room rather than a corridor', with children playing and traders selling in it, before the motor car redefined the roadway as a place for vehicles.",
          evidence: "Children played in it, traders sold from it",
          vocab: ["a room rather than a corridor", "how streets were used"] },
        { n: 15, type: "match", group: "info", prompt: "an explanation of why adding road space can increase congestion", answer: "C",
          explain: "Paragraph C gives the mirror image of traffic evaporation: widen a road and the new lanes fill, so extra capacity produces the very congestion it was meant to remove.",
          evidence: "adding capacity generates the congestion it was built to cure",
          vocab: ["adding capacity", "adding road space"] },
        { n: 16, type: "match", group: "info", prompt: "a claim that the drawbacks of a scheme fall on poorer residents", answer: "F",
          explain: "Paragraph F is Weiss's fairness argument: the boundary roads that absorb the traffic are poorer and lined with the cheapest housing, so the harm is exported to people least able to object.",
          evidence: "lined with the cheapest housing in the district",
          vocab: ["least able to object", "poorer residents"] },
        { n: 17, type: "match", group: "info", prompt: "evidence that trade improves once cars are excluded", answer: "D",
          explain: "Paragraph D reports Duarte's counts after pedestrianisation: footfall rose over the first two years and takings rose with it — the trade evidence the question asks for.",
          evidence: "footfall rose over the first two years and takings rose with it",
          vocab: ["takings rose", "trade improves"] },
        { n: 18, type: "match", group: "info", prompt: "a way of testing a scheme before it is made permanent", answer: "G",
          explain: "Paragraph G sets out Tanaka's method: eighteen months of movable planters and painted bollards, with measurements published, before any permanent decision is taken.",
          evidence: "nothing should be built in concrete until it has been tried in plastic",
          vocab: ["tried in plastic", "testing a scheme"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — What happens when road space is taken away",
            lines: [
              "Engineers used to treat the number of vehicles as fixed, so they expected a closed street to push the queues onto the next one. Halvorsen's review of hundreds of schemes shows instead that a large share of the traffic {{19}}, because drivers change their hour, share a vehicle, take a bus or give the trip up.",
              "The same reasoning runs backwards: a wider road fills with new vehicles, so extra capacity creates the {{20}} it was supposed to remove.",
              "Traders resist the schemes because they think about half their customers come by {{21}}, when in fact far fewer do; after pedestrianisation, counts of {{22}} on the street normally rise, and so do takings.",
            ],
          },
          answer: "evaporates",
          explain: "Halvorsen found that much of the displaced traffic 'never turns up anywhere at all; it simply evaporates'. The gap follows 'a large share of the traffic', so a singular verb is needed.",
          evidence: "it simply evaporates",
          vocab: ["never turns up anywhere", "evaporates"] },
        { n: 20, type: "gap", group: "sum2", answer: "congestion",
          explain: "Widening a road generates 'the congestion it was built to cure'. The summary paraphrases 'built to cure' as 'supposed to remove', keeping the noun itself as the answer.",
          evidence: "generates the congestion it was built to cure",
          vocab: ["built to cure", "supposed to remove"] },
        { n: 21, type: "gap", group: "sum2", answer: "car",
          explain: "Duarte's shopkeepers 'believe that around half of their customers arrive by car', while the customers' own answers give a much lower figure. 'Come by' paraphrases 'arrive by'.",
          evidence: "around half of their customers arrive by car",
          vocab: ["arrive by", "come by"] },
        { n: 22, type: "gap", group: "sum2", answer: "footfall",
          explain: "After pedestrianisation, 'footfall rose over the first two years and takings rose with it'. Footfall is the count of people on the street, which is exactly what the gap describes.",
          evidence: "footfall rose over the first two years" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Ingrid Halvorsen",
            "Stefan Weiss",
            "Amara Nwosu",
            "Yuki Tanaka",
            "Rafael Duarte",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Traders are mistaken about how most of their customers travel to them.", answer: "E",
          explain: "The retail analyst Duarte surveys traders and customers together and finds a consistent gap: shopkeepers say half arrive by car, customers report a tenth to a quarter.",
          evidence: "finds a consistent gap between the two",
          vocab: ["a consistent gap", "are mistaken"] },
        { n: 24, type: "match", group: "people", prompt: "Some journeys stop being made altogether when road space is reduced.", answer: "A",
          explain: "Halvorsen's review of road closures found that some people 'decide the journey was not worth making', so the traffic does not reappear elsewhere — it evaporates.",
          evidence: "decide the journey was not worth making",
          vocab: ["not worth making", "stop being made"] },
        { n: 25, type: "match", group: "people", prompt: "A scheme should run temporarily before any permanent decision is taken.", answer: "D",
          explain: "Tanaka's rule is that nothing is built in concrete until it has been tried in plastic: eighteen months of movable planters first, a permanent decision only afterwards.",
          evidence: "only then is a permanent decision taken",
          vocab: ["tried in plastic", "run temporarily"] },
        { n: 26, type: "match", group: "people", prompt: "The costs of a scheme can be passed to the streets around it.", answer: "B",
          explain: "Weiss maps the traffic afterwards and shows that a filtered neighbourhood 'can therefore export its dirty air and its noise' to the boundary roads — the streets around it.",
          evidence: "can therefore export its dirty air and its noise",
          vocab: ["export", "passed to"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The crowd that does nothing",
      passage: `In March 1964 a young woman was attacked and killed outside her apartment building in a quiet district of New York. Two weeks later a newspaper reported that thirty-eight respectable citizens had watched from their windows for more than half an hour, and that not one had telephoned the police. The story was irresistible. It ran round the world, entered the textbooks, and gave the century one of its favourite parables about the coldness of city life. Almost every part of it has since turned out to be unreliable. Later scrutiny showed that the number was wrong, that most of those who heard anything heard fragments in the dark and could not have known what they meant, and that at least two people did telephone the police. Yet the false version had one entirely genuine consequence: it sent two young psychologists into the laboratory, and the work they began there has lasted sixty years.

Bibb Latané and John Darley decided that the interesting question was not why those neighbours failed, but whether anybody's willingness to act depends on how many others are present. Their first experiment was almost comically simple. A student sat filling in a questionnaire when smoke began to seep through a vent in the wall. Three-quarters of those sitting alone reported it, most of them within two minutes. When the same student sat with two others who had been instructed to glance at the smoke, shrug and carry on writing, the figure collapsed to about one in ten, and several participants sat rubbing their eyes in a room thick with smoke rather than be the one who raised the alarm. A second study, in which a fellow participant appeared over an intercom to suffer a seizure, produced the same shape: the more people a participant believed were listening, the less likely that participant was to fetch help, and the longer the delay. A third variant sent a woman crashing off a chair in the next room; alone, most participants went to her, but in pairs of strangers fewer than half did.

Three mechanisms are usually offered, and they are layers rather than alternatives. The first is diffusion of responsibility: when a duty is shared among many, each person's portion of it shrinks, and with thirty witnesses the obligation resting on any one of them can feel close to nothing. The second, and the most interesting, is pluralistic ignorance. Ambiguous situations have to be interpreted, and we interpret them by watching other people; but the others are watching us, and each is careful to appear composed. Everybody therefore reads the untroubled faces around them as evidence that nothing is wrong, while contributing an untroubled face of their own to that evidence. A crowd can manufacture, in seconds, a calm that none of its members actually feels. The third is evaluation apprehension, the fear of acting on a misreading, of shouting for an ambulance and being told it was a rehearsal. All three grow with the size of the group, which is why the classic finding is expressed as a probability: the more bystanders there are, the lower the chance that any given one of them acts.

For thirty years this was taught as a settled law of social life, and it was oversold. A large meta-analysis of the laboratory studies found the effect to be real but conditional: it shrinks, and can disappear altogether, when the emergency is unmistakable and physically dangerous, partly because obvious danger makes helping look necessary and partly because it makes helpers want company. The sharpest correction came from outside the laboratory. A study published in 2019 examined security-camera recordings of hundreds of real conflicts in three cities, and found that someone stepped in in about nine cases out of ten, and that the odds of intervention rose, rather than fell, with the number of people present. The recordings came from Amsterdam, Lancaster and Cape Town, and in the average conflict more than three bystanders intervened. Real streets, it turns out, are not silent rooms with instructed strangers in them.

Why did the bleak version travel so much further than the correction? Partly because it arrived as a story with a name and a street, while the correction arrived as a table. But mostly, I think, because it confirmed something people already wanted to believe about modern cities, namely that scale and anonymity dissolve ordinary decency. The research does not support that reading. What the experiments actually demonstrate is a fact about situations, not about souls: put the most conscientious person you know in an ambiguous room with two calm strangers, and the odds move against them. This distinction matters, because the moral version of the story tells frightened witnesses that they are bad people, whereas the situational version tells them something they can use.

What they can use is mostly a matter of destroying the ambiguity. First-aid trainers teach a technique that follows directly from the theory: never appeal to a crowd, but point at one individual and give that person a task: you, in the blue jacket, call an ambulance now. Naming a person converts a shared duty into a personal one, and the person named almost always complies. Knowing that the effect exists is itself protective: students taught about bystander research intervene more often months afterwards than those who are not. And once one person moves, the ambiguity has gone for everybody, which is why help in real emergencies tends to arrive not singly but in a small rush. The crowd that does nothing is not a crowd of bad people. It is a crowd waiting, quite reasonably, for somebody to tell it what it is looking at.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What does the writer say about the 1964 newspaper report?", options: ["A It was written by one of the witnesses", "B Later examination found its key details untrue", "C Psychologists at the time paid no attention to it", "D It described an incident that had not taken place"], answer: "B",
          explain: "The passage says later scrutiny showed the number was wrong and that at least two people did call the police — its key details fail. D is a trap that overstates this: the attack itself did happen.",
          evidence: "Later scrutiny showed that the number was wrong",
          vocab: ["scrutiny", "examination"] },
        { n: 28, type: "mcq", prompt: "In the smoke experiment, participants who were sitting alone", options: ["A left the building at once", "B decided the smoke was harmless", "C waited to be given instructions", "D raised the alarm far more often than those in groups"], answer: "D",
          explain: "Three-quarters of those alone reported the smoke, against about one in ten of those sitting with two calm strangers — far more often. B describes the confederates' behaviour, not theirs.",
          evidence: "Three-quarters of those sitting alone reported it",
          vocab: ["reported it", "raised the alarm"] },
        { n: 29, type: "mcq", prompt: "Pluralistic ignorance arises when people", options: ["A take the composure of others as proof that there is no emergency", "B fail to notice that anything has happened", "C do not know what kind of help to give", "D assume that others are better qualified to act"], answer: "A",
          explain: "Everyone reads the untroubled faces around them as evidence that nothing is wrong, while adding their own to that evidence. D describes diffusion of responsibility, not pluralistic ignorance.",
          evidence: "reads the untroubled faces around them as evidence that nothing is wrong",
          vocab: ["untroubled faces", "composure"] },
        { n: 30, type: "mcq", prompt: "The 2019 study of security-camera recordings suggests that", options: ["A city crowds are more violent than had been assumed", "B most public arguments are settled by those involved in them", "C help is usual in real conflicts and more likely in bigger groups", "D people help less when they know they are being filmed"], answer: "C",
          explain: "Someone stepped in in about nine cases out of ten, and the chance of intervention rose with the number of people present — the opposite of the laboratory pattern.",
          evidence: "the odds of intervention rose, rather than fell, with the number of people present",
          vocab: ["stepped in", "help"] },
        { n: 31, type: "ynng", prompt: "The 1964 case was worthwhile in spite of the mistakes in the way it was reported.", answer: "YES",
          explain: "YES: the writer grants that almost every part of the story was unreliable but insists it had 'one entirely genuine consequence' — sixty years of research that would not otherwise exist.",
          evidence: "the false version had one entirely genuine consequence",
          vocab: ["genuine consequence", "worthwhile"] },
        { n: 32, type: "ynng", prompt: "The bystander effect measured in laboratories describes behaviour in public places accurately.", answer: "NO",
          explain: "NO: the writer says the finding was oversold and that on real streets intervention was common and rose with crowd size — 'real streets are not silent rooms with instructed strangers in them'.",
          evidence: "Real streets, it turns out, are not silent rooms with instructed strangers in them" },
        { n: 33, type: "ynng", prompt: "First-aid training is now a compulsory part of the school curriculum in many countries.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: first-aid trainers and taught students are both mentioned, but the passage says nothing about whether such training is required in schools anywhere.",
          evidence: "First-aid trainers teach a technique that follows directly from the theory" },
        { n: 34, type: "ynng", prompt: "Failures to help are explained better by circumstances than by the character of those present.", answer: "YES",
          explain: "YES: the writer states that the experiments demonstrate 'a fact about situations, not about souls', and that even the most conscientious person is affected by the room they are in.",
          evidence: "a fact about situations, not about souls",
          vocab: ["situations", "circumstances"] },
        { n: 35, type: "ynng", prompt: "When one person has intervened, the others present usually hold back.", answer: "NO",
          explain: "NO: once one person moves the ambiguity is gone, 'which is why help in real emergencies tends to arrive not singly but in a small rush' — others join rather than hold back.",
          evidence: "help in real emergencies tends to arrive not singly but in a small rush",
          vocab: ["in a small rush", "others join"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "the fear of looking foolish in front of strangers.",
            "proves that crowds always react more slowly than individuals do.",
            "each person present feels a smaller share of the duty to act.",
            "survived because the original story appeared to confirm it.",
            "the effect weakens when the danger is obvious.",
            "removes the assumption that somebody else will deal with it.",
            "explains why witnesses often disagree about what they saw.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Diffusion of responsibility means that", answer: "C",
          explain: "When a duty is shared among many, 'each person's portion of it shrinks' — ending C, which paraphrases 'portion' as 'share' and 'duty' unchanged.",
          evidence: "each person's portion of it shrinks",
          vocab: ["portion", "share"] },
        { n: 37, type: "match", group: "ends", prompt: "Evaluation apprehension is", answer: "A",
          explain: "Evaluation apprehension is defined as the fear of acting on a misreading and being told it was a rehearsal — in other words the fear of looking foolish in public, ending A.",
          evidence: "the fear of acting on a misreading",
          vocab: ["acting on a misreading", "looking foolish"] },
        { n: 38, type: "match", group: "ends", prompt: "The meta-analysis of the laboratory studies showed that", answer: "E",
          explain: "The meta-analysis found the effect 'real but conditional': it shrinks or disappears when the emergency is unmistakable and dangerous. Ending B contradicts this and is the trap.",
          evidence: "it shrinks, and can disappear altogether, when the emergency is unmistakable and physically dangerous",
          vocab: ["unmistakable", "obvious"] },
        { n: 39, type: "match", group: "ends", prompt: "Naming one particular person in a crowd", answer: "F",
          explain: "Naming a person 'converts a shared duty into a personal one', so nobody can suppose the duty belongs to someone else — ending F.",
          evidence: "Naming a person converts a shared duty into a personal one",
          vocab: ["converts a shared duty", "removes the assumption"] },
        { n: 40, type: "match", group: "ends", prompt: "The idea that city life makes people indifferent", answer: "D",
          explain: "The bleak version spread because 'it confirmed something people already wanted to believe about modern cities' — the story kept an existing belief alive, ending D.",
          evidence: "it confirmed something people already wanted to believe about modern cities",
          vocab: ["already wanted to believe", "appeared to confirm"] },
      ],
    },
  ],
};
