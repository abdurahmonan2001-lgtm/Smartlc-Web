// Smart LC Mock Test 4 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + multi-select pairs), P3 argumentative
// (MCQ-4 + YNNG + summary from a wordlist box). Key quotas: TFNG balanced
// with no runs of three, flat letters, unique concrete-noun answers.
export const MOCK4_READING = {
  id: "mock4-reading",
  bookId: "mock4",
  title: "Mock Test 4 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "A light on every dangerous shore",
      passage: `It is easy to forget, in an age of satellite positioning, that for most of history the most dangerous part of a sea voyage was the end of it. The open ocean offered storms, but the coast offered rocks, sandbanks and cliffs, all of them invisible after dark. The oldest remedy was also the simplest: fire. From antiquity, communities on dangerous shores burned wood on headlands to warn ships away or guide them home, and the lighthouse is, at heart, nothing more than that ancient bonfire made permanent.

The first lighthouse worthy of the name was raised on the island of Pharos, at the entrance to the harbour of Alexandria in Egypt, around 280 BC. Ancient writers describe a stone tower of astonishing height — modern estimates put it above a hundred metres, which would have made it one of the tallest structures in the world. A fire burned at its top each night, and according to several accounts its light was strengthened by a great polished mirror, probably of bronze, which threw the glow far out to sea. The tower stood for more than a thousand years, outliving the civilisation that built it, until a series of earthquakes finally brought it down in the Middle Ages. Its name outlived even the ruins: in many languages, the everyday word for lighthouse is still some version of "pharos".

The Romans, practical as always, built lighthouses wherever they built harbours, from Dover in Britain to the Black Sea. The most remarkable survivor is the Tower of Hercules on the north-west coast of Spain, built in the second century and, after careful restoration, still guiding ships today — the oldest lighthouse in the world that remains in service. When the empire collapsed, however, most of its lights went out with it. Through the medieval centuries, such coastal lights as existed were mostly maintained by monks, who kept fires of coal or candles burning in chapel towers on lonely headlands. It was charity rather than a system, and it depended on the weather, the fuel supply and the devotion of a handful of individuals.

The modern lighthouse was born on a half-submerged reef. The Eddystone rocks, lying in open water off the English port of Plymouth, had wrecked ships for centuries, and in 1698 an engineer and showman named Henry Winstanley completed the first tower ever erected on rocks in the open sea. It was an eccentric, highly decorated structure, made mostly of wood, and Winstanley was so proud of it that he declared his wish to be inside it during the greatest storm that ever blew. In November 1703 he received exactly that: he was in the tower, supervising repairs, when the most violent storm in English memory swept the coast. By morning, nothing remained of the lighthouse or of the man.

The reef finally received a tower worthy of it in 1759, from the engineer John Smeaton, and his design changed lighthouse building for ever. Smeaton modelled his tower on the trunk of an oak, broad at the base and curving gently inwards as it rose, so that the force of a breaking wave flowed around the structure instead of striking it flat. He built it from blocks of granite cut to interlock, borrowing from woodworking the idea of dovetail joints so that every stone gripped its neighbours, and he perfected a mortar that could harden under water — an early step towards modern concrete. His tower stood against the Atlantic for over a century, and its profile was copied on wave-swept rocks around the world.

A strong tower, though, was only half the problem; the other half was the light itself. Candles and simple oil lamps threw a feeble glow that haze could swallow within a few miles. The decisive invention came in 1822 from the French physicist Augustin Fresnel: a lens assembled from concentric rings of glass, which captured light that would otherwise be wasted and bent it into a single intense horizontal beam. A lamp that had been visible for five miles could suddenly be seen for thirty. Just as importantly, when the lens was made to rotate, the light swept the horizon in regular flashes, and by giving every station its own rhythm, engineers gave each lighthouse an identity. A captain counting the seconds between flashes could tell precisely which point of the coast lay ahead of him.

Behind every beam lived the keepers, trimming wicks, winding machinery and polishing glass through the night, often in total isolation. Their world ended slowly, then completely. Electric light replaced flame only gradually — many stations were still burning oil well into the twentieth century — but automation was merciless, and during the 1990s the last keepers in most countries locked the doors behind them. Satellite navigation has since taken over most of the lighthouse's work, yet very few countries have switched their lights off. Electronics can fail; the beam does not. The towers are kept partly as a backup, and partly, perhaps, out of gratitude.`,
      questions: [
        { n: 1, type: "gap", prompt: "According to ancient accounts, the light of the Pharos was made stronger by a large bronze ______.", note: "ONE WORD ONLY", answer: "mirror" },
        { n: 2, type: "gap", prompt: "In medieval Europe, coastal lights were usually kept burning by ______.", note: "ONE WORD ONLY", answer: "monks" },
        { n: 3, type: "gap", prompt: "Winstanley's tower on the Eddystone rocks was largely built of ______.", note: "ONE WORD ONLY", answer: "wood" },
        { n: 4, type: "gap", prompt: "Smeaton based the shape of his tower on the trunk of an ______.", note: "ONE WORD ONLY", answer: "oak" },
        { n: 5, type: "gap", prompt: "Smeaton took the idea of dovetail ______ from woodworking.", note: "ONE WORD ONLY", answer: "joints" },
        { n: 6, type: "gap", prompt: "Fresnel's rings of glass bent the lamp's light into one powerful ______.", note: "ONE WORD ONLY", answer: "beam" },
        { n: 7, type: "gap", prompt: "A rotating lens identified each lighthouse by its individual pattern of ______.", note: "ONE WORD ONLY", answer: "flashes" },
        { n: 8, type: "tfng", prompt: "A Roman lighthouse in Spain is still in operation today.", answer: "TRUE" },
        { n: 9, type: "tfng", prompt: "Winstanley was on land when the storm of 1703 destroyed his tower.", answer: "FALSE" },
        { n: 10, type: "tfng", prompt: "Smeaton's tower took longer to build than he had planned.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "The Fresnel lens increased the distance from which a light could be seen.", answer: "TRUE" },
        { n: 12, type: "tfng", prompt: "All lighthouses had changed to electric light by the end of the nineteenth century.", answer: "FALSE" },
        { n: 13, type: "tfng", prompt: "Some former lighthouse keepers now work as guides for visitors.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The long run: the science of the marathon",
      passage: `A — Every autumn weekend, somewhere in the world, tens of thousands of people line up before dawn to run 42.195 kilometres through closed city streets. Two generations ago the marathon was a minority pursuit for a hardened few; today more than a million people finish one every year, and the largest races turn away as many hopeful entrants as they accept. The awkward distance itself is an accident of history, fixed early in the twentieth century and never revised since. It has not changed, and neither has human biology — which is precisely why scientists find the event so interesting. The marathon sits close to the edge of what a human body can do, and every runner who attempts it, fast or slow, runs a full-scale experiment in physiology.

B — Laboratory studies have settled on three measurements that together predict most of marathon performance. The first is maximal oxygen uptake, the engine size of the athlete; the second is the lactate threshold, the fraction of that engine that can be used for hours without the muscles flooding with fatigue; the third is running economy, the amount of oxygen a runner burns to hold a given pace. Marta Keller, a physiologist in Vienna who has tested elite marathoners for two decades, argues that the last of these is the quiet champion. "Among top runners, engine size is surprisingly similar — some spend weeks training at high altitude chasing a little more of it. What separates the podium from the pack is economy: who wastes the least."

C — Amateur runners care less about thresholds than about a wall. The body of a trained runner stores roughly two thousand kilocalories of glycogen, the fuel made from carbohydrate, in its muscles and liver; a marathon costs closer to three thousand. Somewhere around the thirtieth kilometre the stores run low, and the body turns to burning fat, a fuel that demands more oxygen for every stride. The pace collapses, and the final kilometres become a negotiation. Samuel Ochieng, a sports scientist in Nairobi, believes the crash is partly protective. "The brain reads the fuel gauge and applies the brakes before real damage is done. You do not hit the wall because your legs are empty — you hit it because your brain refuses to let you empty them." The most effective defence, his studies suggest, is unglamorous: an even pace from the first kilometre, however fresh the legs feel.

D — Fuelling strategies have changed direction more than once. For decades, runners were urged to drink at every station, as much as they could hold; many races now teach the opposite lesson. Hanna Lindqvist, a sports nutritionist in Stockholm, points out that drinking far beyond thirst can dilute the blood's sodium to dangerous levels, a condition called hyponatremia. "In modern city marathons, more runners are harmed by too much water than by too little," she says. The condition is rare but can be fatal, and its typical victims are not the leaders but slower runners, out on the course for five or six hours and sipping diligently at every station. Her advice is disarmingly simple: eat plenty of carbohydrate in the days before the race, as most runners now do, and on the day itself drink when thirsty, and no more.

E — The most visible revolution, though, is on the runners' feet. Shoes built around a stiff carbon-fibre plate and thick, springy foam appeared in 2016, and record times began falling almost immediately. Rafael Soto, a biomechanist in Madrid, led one of the laboratory teams that measured the effect on treadmill runners: an improvement in running economy of about four per cent, more than most athletes gain from a year of training. The gain is not spread evenly — his tests found the benefit varies noticeably between individuals — and the makers' further claim that the shoes reduce muscle damage rests, he cautions, on much weaker evidence. Critics called the technology a form of mechanical doping and demanded a ban; the sport's governing body chose instead to set limits on sole thickness and plate design, and almost every major record since has been set in the new shoes.

F — How much further can the event go? The two-hour barrier, long treated as the edge of human possibility, was finally broken in 2019 — though only in a specially staged event, with rotating pacemakers, that the record books do not recognise. Conditions matter as much as talent: analysis of decades of results shows marathons are fastest on cool, still days at around ten to twelve degrees Celsius, which is why record attempts cluster in spring and autumn. For the millions who will never see the front of the race, the science distils into advice of almost comic modesty: run an even pace, and drink when you are thirsty. The wall, like most walls, is best approached with patience.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a comparison between the energy the body can store and the energy a marathon requires", answer: "C" },
        { n: 15, type: "match", group: "minfo", prompt: "a figure for how much a piece of equipment improves efficiency", answer: "E" },
        { n: 16, type: "match", group: "minfo", prompt: "a claim that one measurement separates the best runners from the rest", answer: "B" },
        { n: 17, type: "match", group: "minfo", prompt: "a warning about consuming too much of something", answer: "D" },
        { n: 18, type: "match", group: "minfo", prompt: "the weather conditions in which marathons are run fastest", answer: "F" },
        { n: 19, type: "gap", group: "sum4", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Hitting the wall",
            lines: [
              "A trained runner's muscles and liver hold about two thousand kilocalories of {{19}}, but a marathon costs nearer three thousand.",
              "When the stores run low, the body switches to burning {{20}}, which needs more oxygen for every stride, and the pace collapses.",
              "Ochieng argues the collapse is partly protective: the {{21}} slows the body down before serious damage can occur.",
              "According to his research, the best defence is to hold an even {{22}} from the very start of the race.",
            ],
          },
          answer: "glycogen" },
        { n: 20, type: "gap", group: "sum4", answer: "fat" },
        { n: 21, type: "gap", group: "sum4", answer: "brain" },
        { n: 22, type: "gap", group: "sum4", answer: "pace" },
        { n: 23, type: "multiselect", group: "adv4",
          prompt: "Which TWO pieces of advice for ordinary marathon runners are given in the passage?",
          options: [
            "drink only when you feel thirsty",
            "spend some weeks training at high altitude",
            "keep your speed steady throughout the race",
            "buy shoes with a carbon-fibre plate",
            "avoid carbohydrate in the days before the race",
          ],
          answer: "A" },
        { n: 24, type: "multiselect", group: "adv4", answer: "C" },
        { n: 25, type: "multiselect", group: "shoes4",
          prompt: "Which TWO statements about carbon-plated shoes are true, according to the passage?",
          options: [
            "They have been banned from official races",
            "They improve running economy by about four per cent",
            "They benefit all runners to the same degree",
            "Their effect was measured in laboratory tests",
            "They have been proved to reduce muscle damage",
          ],
          answer: "B" },
        { n: 26, type: "multiselect", group: "shoes4", answer: "D" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The last speakers",
      passage: `Roughly seven thousand languages are spoken in the world today, but the figure conceals an extraordinary imbalance. A couple of dozen giants — the languages of school systems, armies and television — are spoken by half of humanity, while thousands of others survive in single valleys, island villages or scattered families. Linguists estimate that at least forty per cent of all languages are endangered, and a widely quoted claim holds that one falls silent every few weeks. The claim deserves caution — counting languages is notoriously difficult, and the pace of loss is uneven and disputed — but the direction of travel is not. On any realistic projection, the coming century will be the quietest in human history: hundreds of ways of speaking, and of thinking, will simply stop being heard.

It is worth being precise about how a language dies, because the popular image is misleading. Languages are rarely lost because their speakers die out, and outright prohibition, though it has happened, is not the usual cause either. Far more often, a language dies through a long chain of private decisions. Parents who were mocked or punished for their speech resolve that their children will have the dominant language of the school and the job market; the children grow up understanding their grandparents but answering them in another tongue; their own children do not even understand. Each choice is understandable, even loving. Yet it is worth asking how free such choices really are. When one language carries prestige, schooling and employment, and another carries stigma, the decision has been weighted long before any parent makes it. Language shift is less like a preference and more like surrender to pressure.

Why should the rest of the world care? One answer is practical: small languages are dense archives of local knowledge, cataloguing medicinal plants, fish runs and soil types that outsiders have barely begun to study. Another is cultural: an oral literature dies with its language, unread forever. But the deepest argument is scientific. Every language is a natural experiment in what a human mind can do, and the diversity of the sample is itself the data. Some languages, famously, have no words for left and right; their speakers describe every position by compass direction — the cup stands north-east of the plate — and, tested in the field, they maintain an accurate sense of orientation even inside unfamiliar buildings. The point of such examples is not that these speakers are exotic, but that the human mind has more settings than any single language reveals. Each time an unrecorded language disappears, an experiment that ran for a thousand years ends with its results unread.

Hence the race to document. Field linguists today arrive not with notebooks alone but with video cameras and audio recorders, aiming to capture not word lists but living speech: stories, arguments, songs, jokes. The recordings, transcribed and archived, join grammars and dictionaries in digital collections designed to outlast both the speakers and the linguists. Technology cuts both ways here. The smartphone is a powerful engine of language shift, pouring the world's dominant languages into every pocket; it is also the cheapest recording studio ever made, and a growing number of communities now document their own speech without waiting for a visiting academic.

Documentation, however, is not revival, and the distinction matters. An archived language is like a preserved seed: safe, but not growing. The revivals that have genuinely succeeded — a handful of celebrated cases in which languages returned to daily life and even to native speakers — share one feature, and it is not the quality of their dictionaries. In each case a community decided, for its own reasons of identity and pride, that the language would be spoken at home, by children, about ordinary things. Linguists supplied materials; broadcasters and schools helped; but the decisive act took place in kitchens, not in universities. A language lives when a child hears it from a parent and answers back. Nothing else, in the end, counts.

There remains a sceptical view, and it should be faced honestly. Languages, the argument runs, have always died; a shared tongue unites nations and raises the poor; sentiment should not stand in the way of opportunity. The premise is true, but the conclusion does not follow, because it rests on a false choice. Human beings are built for bilingualism — most of the world's population already lives in more than one language — and a child who keeps a grandmother's tongue loses no part of a global one. What extinguishes small languages is not the existence of big ones but policies and prejudices that punish the small: schools that forbid, officials who sneer, markets that exclude. Those are choices, and choices can change. The archives should be filled, urgently, while the last speakers can still be recorded. But the future of any language will be decided where it has always been decided — at home, one answering child at a time.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What point does the writer make about the world's seven thousand languages?", options: ["A Most of them will survive the coming century", "B Speakers are spread very unevenly among them", "C Nearly all of them are spoken in remote valleys", "D They disappear at a rate of one every day"], answer: "B" },
        { n: 28, type: "mcq", prompt: "According to the writer, a language most commonly dies because", options: ["A its last speakers die in a disaster", "B governments officially prohibit it", "C linguists fail to record it in time", "D parents stop passing it on to their children"], answer: "D" },
        { n: 29, type: "mcq", prompt: "The writer mentions languages without words for left and right in order to show that", options: ["A languages differ in ways that reveal the mind's range", "B all languages describe space in the same way", "C some communities are easily disoriented", "D compass directions are a universal human idea"], answer: "A" },
        { n: 30, type: "mcq", prompt: "What does the writer say about the smartphone?", options: ["A It is the single greatest cause of language death", "B It has made professional linguists unnecessary", "C It both accelerates language loss and assists recording", "D Communities distrust it as a documentation tool"], answer: "C" },
        { n: 31, type: "ynng", prompt: "The choice to abandon a small language is seldom a completely free one.", answer: "YES" },
        { n: 32, type: "ynng", prompt: "Governments spend more money on revival than on documentation.", answer: "NOT GIVEN" },
        { n: 33, type: "ynng", prompt: "Recording a language is sufficient to keep it alive.", answer: "NO" },
        { n: 34, type: "ynng", prompt: "Successful language revivals depend chiefly on the communities themselves.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "People must give up a small language in order to master a global one.", answer: "NO" },
        { n: 36, type: "gap", group: "wl4",
          box: ["archives", "children", "choice", "dictionaries", "experiment", "pressure", "prestige", "recordings", "schooling", "trade"],
          boxTitle: "List of Words",
          notes: {
            title: "Summary — Saving what can be saved",
            lines: [
              "Languages rarely die suddenly; more often, families gradually stop using them under social and economic {{36}}.",
              "The loss matters to science because every unrecorded language is a natural {{37}} in what human minds can do.",
              "Field linguists therefore hurry to build {{38}} filled with {{39}} of living, everyday speech, alongside written grammars.",
              "But a language is only truly alive while it is spoken at home by {{40}}.",
            ],
          },
          answer: "F" },
        { n: 37, type: "gap", group: "wl4", answer: "E" },
        { n: 38, type: "gap", group: "wl4", answer: "A" },
        { n: 39, type: "gap", group: "wl4", answer: "H" },
        { n: 40, type: "gap", group: "wl4", answer: "B" },
      ],
    },
  ],
};
