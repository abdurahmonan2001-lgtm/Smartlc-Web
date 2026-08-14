// Smart LC Practice Set 10 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history of the mirror (completion + TFNG), P2 discursive with lettered
// paragraphs (matching information + summary + people matching), P3
// argumentative science on expectation and the placebo effect (MCQ-4 +
// YNNG + sentence endings). Key quotas: TFNG/YNNG balanced with no runs of
// three, flat letters, unique concrete-noun answers, correct MCQ options
// paraphrase the text while distractors echo its wording.
export const PSET10_READING = {
  id: "pset10-reading",
  bookId: "pset10",
  title: "Practice Set 10 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The mirror",
      passage: `A mirror is one of the very few household objects people owned long before anyone knew how to make one. Any still pool of water returns a serviceable likeness, and the earliest made mirrors were attempts to carry that borrowed surface indoors. The oldest examples yet found, cut about eight thousand years ago in what is now Turkey, are polished discs of obsidian, the black glass thrown out by volcanoes, ground against sand and grit until they shone. They are small, heavy and slightly distorting, and the face they return is dark, as though glimpsed at dusk. Yet they are unmistakably mirrors, and they mattered to their owners: archaeologists have recovered them from graves, laid beside the dead.

Metal soon displaced stone. From about 3000 BC workshops in Egypt, and later in China, Greece and Rome, cast small discs of bronze, fitted them with handles and polished them to a warm yellow shine. Such a mirror was a possession of some importance, often decorated on the back and frequently buried with its owner, but it carried a permanent flaw: bronze tarnishes. Left alone for a few weeks in damp air it clouded over, so a mirror required constant rubbing with fine powder and a cloth to show any image at all. Wealthier households in Rome bought mirrors of silver, which stayed bright longer and threw back more light, but even those had to be polished weekly.

The Romans also made the first glass mirrors, backing small pieces of blown glass with a thin skin of molten lead. The idea was sound and the execution poor. The glass of the period was uneven and tinted, the metal behind it dulled quickly, and the pieces were rarely larger than a coin; the image such a mirror gave was dimmer than that of a well-polished bronze disc, which is why glass never displaced metal in the ancient world. When Roman industry collapsed the technique went with it, and for something like a thousand years Europe returned to burnished metal.

Glass came back in the thirteenth century by a route nobody would now predict. A glassblower blew a sphere, poured a little molten tin or lead into it while the glass was still hot, and rolled the metal round the inside until it set as a reflecting film. The sphere was then cut into curved fragments. Each fragment was a small convex mirror, the bulging bull's-eye that hangs on the back wall of so many Flemish paintings, and although it shrank and bent whatever it showed, it was bright and it was cheap enough for an ordinary household to own.

The flat mirror we would recognise today was a Venetian achievement. By 1300 the glassmakers of Venice had been moved to the island of Murano, officially so that their furnaces could not set the city alight, in practice so that the state could keep them where it could watch them. There they solved two problems together. They perfected cristallo, a glass clear and colourless enough to look through without a greenish cast, and they learned to make it flat: a long cylinder was blown, slit down one side, softened again and opened out into a sheet. Onto that sheet the workers laid a leaf of tin foil, flooded it with mercury and pressed the two together until they combined into a bright amalgam that clung to the glass. The result, at last, returned a human face at life size and in something close to its true colour.

Venice guarded the method fiercely. The masters of Murano were honoured and well paid, and forbidden to leave; the penalties for carrying the secret abroad reached beyond the offender to his family. For nearly two centuries the republic sold mirrors to every court in Europe at prices that could exceed those of a painting by a famous artist. The monopoly was broken by a rival government. In the 1660s Jean-Baptiste Colbert, finance minister to Louis XIV, quietly offered wages and workshops to any Venetian craftsman willing to defect, and enough of them came. Within twenty years the French had overtaken their teachers by casting plate glass, pouring molten glass onto a flat iron table and rolling it smooth, a method that yielded sheets far larger than any that could be blown. The Hall of Mirrors at Versailles, finished in 1684, was in part an advertisement for the new industry.

Two things still kept mirrors expensive. Backing them took weeks, because the amalgam had to drain and harden slowly, and the work was quietly lethal: mercury vapour attacks the nervous system, and the men who breathed it suffered tremors, lost their teeth and rarely worked long. Both problems ended in 1835, when the German chemist Justus von Liebig published a way of depositing a film of pure silver directly onto glass from a warmed solution of silver nitrate. The process took minutes rather than weeks, used no mercury and threw back more light than any amalgam. Within a generation the mirror stopped being furniture and became a fitting, cheap enough for a wardrobe door, a handbag or a bicycle.

Modern mirrors are cut from a ribbon of glass floated over molten tin, and backed with aluminium rather than silver, which costs less and does not stain. Eight thousand years separate them from the obsidian discs of Anatolia, and the principle has not moved at all.`,
      questions: [
        { n: 1, type: "gap", prompt: "The earliest mirrors so far discovered are polished discs of ______.", note: "ONE WORD ONLY", answer: "obsidian",
          explain: "The oldest examples found in what is now Turkey are described as polished discs of obsidian, a black volcanic glass. The question turns 'oldest examples yet found' into 'earliest so far discovered'.",
          evidence: "are polished discs of obsidian",
          vocab: ["oldest examples", "earliest"] },
        { n: 2, type: "gap", prompt: "From about 3000 BC, small mirrors with handles were cast in ______.", note: "ONE WORD ONLY", answer: "bronze",
          explain: "Workshops from 3000 BC onwards 'cast small discs of bronze' and fitted them with handles. The date in the question takes you straight to the sentence containing the metal.",
          evidence: "cast small discs of bronze" },
        { n: 3, type: "gap", prompt: "Roman glass mirrors were given a backing of molten ______.", note: "ONE WORD ONLY", answer: "lead",
          explain: "The first glass mirrors were made by backing blown glass 'with a thin skin of molten lead'. The gap follows the adjective 'molten', exactly as in the passage.",
          evidence: "with a thin skin of molten lead",
          vocab: ["a thin skin", "a backing"] },
        { n: 4, type: "gap", prompt: "The glassmakers of Venice were made to work on the island of ______.", note: "ONE WORD ONLY", answer: "Murano",
          explain: "Venice moved its glassmakers to the island of Murano so that the state could watch them. 'Had been moved' becomes 'were made to work' in the question, so the place name is unchanged.",
          evidence: "moved to the island of Murano",
          vocab: ["had been moved", "were made to work"] },
        { n: 5, type: "gap", prompt: "To make a Venetian mirror, tin foil was covered with ______ and pressed onto the glass.", note: "ONE WORD ONLY", answer: "mercury",
          explain: "The workers laid tin foil on the sheet, 'flooded it with mercury' and pressed the two together into a bright amalgam. 'Flooded' is paraphrased as 'covered' in the question.",
          evidence: "flooded it with mercury",
          vocab: ["flooded it", "covered"] },
        { n: 6, type: "gap", prompt: "Liebig's method of 1835 laid a film of pure ______ straight onto the glass.", note: "ONE WORD ONLY", answer: "silver",
          explain: "In 1835 Liebig published a way of depositing a film of pure silver directly onto glass. The date anchors the answer, and 'depositing' is paraphrased as 'laid'.",
          evidence: "depositing a film of pure silver directly onto glass",
          vocab: ["depositing", "laid"] },
        { n: 7, type: "tfng", prompt: "Obsidian mirrors have been found in ancient burials.", answer: "TRUE",
          explain: "TRUE: archaeologists have recovered the obsidian discs from graves, laid beside the dead. 'Graves' is the passage's word for the question's 'ancient burials'.",
          evidence: "archaeologists have recovered them from graves",
          vocab: ["from graves", "in ancient burials"] },
        { n: 8, type: "tfng", prompt: "A bronze mirror stayed bright with very little care.", answer: "FALSE",
          explain: "FALSE: bronze tarnishes, and a mirror needed constant rubbing with powder and a cloth to show any image at all. That contradicts 'very little care' directly.",
          evidence: "a mirror required constant rubbing with fine powder and a cloth",
          vocab: ["constant rubbing", "very little care"] },
        { n: 9, type: "tfng", prompt: "In the ancient world, glass mirrors gave a better image than metal ones.", answer: "FALSE",
          explain: "FALSE: the image from a Roman glass mirror 'was dimmer' than that of a well-polished bronze disc, which is why glass never displaced metal. Dimmer is the opposite of better.",
          evidence: "was dimmer than that of a well-polished bronze disc",
          vocab: ["dimmer", "better image"] },
        { n: 10, type: "tfng", prompt: "Medieval convex mirrors were produced by breaking up a blown sphere.", answer: "TRUE",
          explain: "TRUE: the glassblower coated the inside of a sphere with metal and the sphere 'was then cut into curved fragments', each of which became a small convex mirror.",
          evidence: "The sphere was then cut into curved fragments",
          vocab: ["cut into fragments", "breaking up"] },
        { n: 11, type: "tfng", prompt: "Venice was the first place in Europe to produce colourless glass.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage says the Venetians perfected a clear, colourless glass, but it never claims they were the first in Europe to make one. A ranking the text does not give is classic NOT GIVEN.",
          evidence: "a glass clear and colourless enough to look through" },
        { n: 12, type: "tfng", prompt: "French plate glass could be made in bigger sheets than Venetian glass.", answer: "TRUE",
          explain: "TRUE: casting plate glass on an iron table 'yielded sheets far larger than any that could be blown', and blowing was the Venetian method described earlier.",
          evidence: "yielded sheets far larger than any that could be blown",
          vocab: ["far larger", "bigger"] },
        { n: 13, type: "tfng", prompt: "Liebig made a large fortune from his silvering process.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage describes how fast, safe and bright his process was, but says nothing whatever about what Liebig earned from it. Do not assume money from success.",
          evidence: "The process took minutes rather than weeks, used no mercury" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Power owned by the street",
      passage: `A — Electricity has almost always reached people's homes from far away, generated by a company they will never meet and sold at a price they cannot argue with. Community energy reverses that arrangement. Instead of buying power, a street, a village or a block of flats buys the machinery that makes it, and shares whatever the machinery earns. The idea is older than the solar panel. From the late 1970s, Danish farmers and villagers formed co-operatives to buy wind turbines together, and by the end of the 1990s most of the country's turbines belonged to local partnerships rather than utilities. What has changed since is the price of the equipment and the size of the ambition: an array that would once have needed a national grant can now be assembled on a roof over a long weekend.

B — The mechanics are simple enough to explain at a public meeting. A group of residents registers a co-operative and sells shares to anybody living nearby, usually at a price low enough for an ordinary household to afford one. The money buys panels, and the panels are fixed to the roof of a public building, most often a school, whose roof is large, whose governors are willing and whose electricity is used in daylight hours when the panels are working hardest. The building buys that power at slightly below the commercial rate, and whatever it cannot use is exported. Once the original loan has been repaid, the co-operative pays its members a modest yearly return and puts the rest into a fund that the members themselves vote on.

C — Why bother, when a utility would happily install the same panels? The energy economist Elena Duarte has spent a decade following the money. When a household pays a distant supplier, she points out, nearly all of that payment leaves the district the moment it is made, and returns only as electricity. A locally owned scheme keeps far more of every unit's value inside the area, because the dividends, the insurance, the cleaning and the repairs are all bought close to home. In the schemes she has audited, roughly two thirds of the money spent remained within the region, against about a tenth for a conventional installation by an outside firm.

D — The technical picture is less comfortable. Kwame Mensah, an engineer who advises distribution companies, points out that the cables under our streets were designed for electricity travelling in one direction only, from a large station to a customer who simply consumed it. Hundreds of small generators reverse that flow for part of the day. On a bright, cool afternoon a street full of panels can push the local voltage above the limit the equipment was built for, and protection systems designed to detect a fault can misread the surge and disconnect. Set against that, making power beside the people who use it avoids the losses that occur in transmission across long distances. The remedies are known, and none of them is free: smart meters, batteries at the end of the street, and inverters that can be instructed to turn themselves down.

E — There is also an effect on behaviour that no engineer predicted. Ingrid Halvorsen, who studies the social side of energy, compared households that had bought into a co-operative with neighbours in the same streets who had not, and found the members using measurably less electricity a year later, even though nothing about their tariff had changed. Ownership, she suggests, turns an invisible service into something people notice and talk about. She has recorded the same pattern in attitudes to wind power: objections to a turbine fall away sharply when the turbine belongs, in part, to the village that has to look at it.

F — Community energy has critics, and the sharpest of them are sympathetic ones. Rafael Costa, a policy analyst, has examined who actually buys the shares. Membership, he finds, is drawn overwhelmingly from households that already own their homes and have savings they can spare, while tenants, who often pay the highest bills of anyone, are almost absent. Because many schemes are helped along by public money, the effect is a subsidy travelling towards people who are already comfortable. Costa is careful to say that the answer is better design rather than abandonment, but he warns that a movement which describes itself as democratic should be able to prove it. Other difficulties are duller and just as fatal: the paperwork, the licensing, the volunteer treasurer who moves away.

G — The projects that survive, argues Mei Lin Chen, who has advised dozens of them, are the ones that stop relying on enthusiasm. Her first recommendation is unromantic: as soon as the income allows it, employ somebody. A part-time coordinator who answers the letters, chases the invoices and files the accounts costs little and prevents the slow exhaustion that closes more schemes than any technical fault. Her second is to sign a long agreement with the local council, which owns the roofs and outlives every committee. Her third is to hold back a block of shares that can be paid for in small monthly instalments, so that the people Costa worries about can join after all. None of it is glamorous. But a street that owns its own supply argues about electricity in a way that a street which merely buys it never does.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a description of how residents come to hold a stake in a scheme", answer: "B",
          explain: "Paragraph B explains the mechanics: a co-operative is registered and sells shares to local people at a price an ordinary household can afford. Holding a share is holding a stake.",
          evidence: "sells shares to anybody living nearby",
          vocab: ["sells shares", "hold a stake"] },
        { n: 15, type: "match", group: "info", prompt: "an explanation of why local generation makes the network harder to manage", answer: "D",
          explain: "Paragraph D is the technical one: cables built for one-way flow, voltage pushed above its limit and protection systems misreading the surge are all management problems caused by local generation.",
          evidence: "designed for electricity travelling in one direction only",
          vocab: ["one direction only", "harder to manage"] },
        { n: 16, type: "match", group: "info", prompt: "a reference to co-operative ownership of power in an earlier decade", answer: "A",
          explain: "Paragraph A recalls the Danish wind co-operatives formed from the late 1970s, when villagers bought turbines together. That is the earlier decade the question points to.",
          evidence: "Danish farmers and villagers formed co-operatives to buy wind turbines together",
          vocab: ["formed co-operatives", "co-operative ownership"] },
        { n: 17, type: "match", group: "info", prompt: "a warning that public support reaches those who need it least", answer: "F",
          explain: "Paragraph F carries Costa's criticism: because schemes are helped by public money and members are already well off, the subsidy travels towards the comfortable rather than the hard-pressed.",
          evidence: "a subsidy travelling towards people who are already comfortable",
          vocab: ["already comfortable", "need it least"] },
        { n: 18, type: "match", group: "info", prompt: "advice that a project should take on a paid worker", answer: "G",
          explain: "Paragraph G opens with Chen's first recommendation, that a scheme should employ somebody as soon as it can afford to, and describes what a part-time coordinator does.",
          evidence: "as soon as the income allows it, employ somebody",
          vocab: ["employ somebody", "a paid worker"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Setting up a community energy scheme",
            lines: [
              "A newly registered co-operative raises its money by selling {{19}} to people who live nearby, usually at a price an ordinary household can meet.",
              "The panels bought with that money are normally fitted to the roof of a public building such as a {{20}}, which uses most of its electricity during the hours when the panels are producing.",
              "Because the power is used near the place where it is made, less of it is lost in {{21}} over long distances; against that, when many small generators feed in at once the local {{22}} may rise above the level the equipment was built for.",
            ],
          },
          answer: "shares",
          explain: "Paragraph B says the co-operative 'sells shares to anybody living nearby' at a price a household can afford, which is exactly how the money is raised in the summary.",
          evidence: "sells shares to anybody living nearby",
          vocab: ["sells shares", "raises money by selling"] },
        { n: 20, type: "gap", group: "sum2", answer: "school",
          explain: "The panels go on the roof of a public building, 'most often a school', chosen because its roof is large and its electricity is used in daylight. The summary keeps the daylight detail as a clue.",
          evidence: "most often a school",
          vocab: ["in daylight hours", "during the hours"] },
        { n: 21, type: "gap", group: "sum2", answer: "transmission",
          explain: "Paragraph D says generating power beside its users avoids 'the losses that occur in transmission across long distances'. The summary paraphrases 'losses' as 'less of it is lost'.",
          evidence: "the losses that occur in transmission across long distances",
          vocab: ["losses", "lost"] },
        { n: 22, type: "gap", group: "sum2", answer: "voltage",
          explain: "A street full of panels 'can push the local voltage above the limit the equipment was built for'. The summary reuses 'local' and asks for the quantity that rises.",
          evidence: "push the local voltage above the limit",
          vocab: ["push above the limit", "rise above the level"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Rafael Costa",
            "Ingrid Halvorsen",
            "Kwame Mensah",
            "Elena Duarte",
            "Mei Lin Chen",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Much more of the money spent on energy stays in the district when the scheme is locally owned.", answer: "D",
          explain: "The economist Duarte audited the schemes and found roughly two thirds of the money remained in the region, against a tenth for an outside firm. 'Remained within' matches 'stays in'.",
          evidence: "remained within the region, against about a tenth",
          vocab: ["remained within", "stays in"] },
        { n: 24, type: "match", group: "people", prompt: "The existing network was built for power moving one way only.", answer: "C",
          explain: "Mensah, the engineer advising distribution companies, says the cables under the streets were designed for electricity travelling in one direction only, from station to consumer.",
          evidence: "the cables under our streets were designed for electricity travelling in one direction only",
          vocab: ["travelling in one direction", "moving one way"] },
        { n: 25, type: "match", group: "people", prompt: "The people who benefit from these schemes tend to be those who are already secure.", answer: "A",
          explain: "The policy analyst Costa found membership drawn from home-owners with savings, while tenants are almost absent, so public help flows to people who are already comfortable.",
          evidence: "households that already own their homes and have savings they can spare",
          vocab: ["already own their homes", "already secure"] },
        { n: 26, type: "match", group: "people", prompt: "Owning part of a scheme changes how much electricity a household consumes.", answer: "B",
          explain: "Halvorsen compared co-operative members with their neighbours and found the members using measurably less electricity a year later, with no change to their tariff.",
          evidence: "found the members using measurably less electricity a year later",
          vocab: ["measurably less electricity", "how much they consume"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "What we expect, and what we feel",
      passage: `Give a patient a capsule containing nothing but starch, tell her it is a powerful painkiller, and a dependable proportion of the time her pain will fade. The capsule's name, placebo, is Latin for 'I shall please', and it entered medicine as an insult: an eighteenth-century dictionary defines it as a prescription given to satisfy a demanding patient rather than to cure him. For two hundred years it remained a joke about human gullibility. It is now among the most closely studied phenomena in medicine, and the joke is on the people who told it, because the response the dummy capsule produces is not imaginary. It is measurable, it is chemical, and some version of it accompanies every treatment that works.

Modern interest begins with an American anaesthetist, Henry Beecher, who spent part of the Second World War treating wounded men at Anzio in Italy. Short of morphine, he noticed something that made no obvious sense: soldiers with severe injuries asked for less pain relief than civilians with comparable wounds in his hospital at home. A wound, Beecher decided, means different things to different men, and for the soldier it meant the fighting was over. In 1955 he published a paper claiming that roughly a third of all patients respond to a placebo. The figure was too generous, and later analysts showed that much of what he counted was ordinary recovery that would have happened anyway. The phenomenon survived the correction; the arithmetic did not.

What makes it real is expectation. The decisive demonstration came in 1978, when researchers gave placebo painkillers to patients recovering from dental surgery, then gave some of them naloxone, a drug that blocks the receptors used by morphine and by the body's own opioids. The relief the placebo had produced disappeared. If a dummy pill worked purely by persuading people to say they felt better, blocking a chemical pathway should have made no difference; instead the effect switched off, which means the pill had prompted the brain to release its own painkillers. Later imaging work has watched the same circuits light up, and in Parkinson's disease researchers have measured dopamine released by the mere promise of a drug.

Expectation is not the whole mechanism, because part of the response is learned in the way a dog learns a bell. If a distinctive drink is given repeatedly alongside a drug that suppresses the immune system, the drink alone will eventually suppress it, in animals and in people, without anybody needing to believe anything. Doctors who treat children see a domestic version of the same thing: a medicine that worked last time works better this time, and the colour, the spoon and the ceremony around it are part of the dose.

This is also where the limits are. Placebos act on how an illness is experienced, on pain, nausea, tiredness and low mood, and there is no evidence that they shrink a tumour or knit a broken bone. A much-quoted study of asthma made the distinction vividly. Patients were given a real inhaler, a dummy inhaler, sham acupuncture or nothing, and asked how much better they felt; the three treatments produced almost identical reports of improvement. When the researchers measured how much air the patients could actually move, only the real inhaler had changed anything. A placebo can make a person feel well while leaving them ill, which in asthma is not a curiosity but a danger.

The strength of the response depends on things that ought to be irrelevant. Two dummy capsules beat one, a coloured capsule beats a white one, an injection of salt water beats a tablet, and volunteers told a cream is expensive report more relief than those told it is cheap. The person delivering the treatment matters most of all: warmth, confidence and a few unhurried minutes raise the effect measurably. Strangest of all is the open-label finding. Patients with long-standing bowel complaints were handed a bottle labelled 'placebo pills' and told plainly that the contents were inert, that placebos often help anyway, and that they should take them twice a day. They improved more than the untreated group. Deception, it appears, is not the active ingredient.

The mechanism has an unpleasant twin. Expectation of harm produces harm, and this nocebo effect is why reading a list of side effects makes them more likely. In trials of cholesterol-lowering statins, patients who knew they might be taking the drug reported muscle pain at almost the same rate whether they had swallowed it or a dummy, and the complaints faded when nobody knew which was which. A warning delivered carelessly is itself a small dose of something.

All of which suggests that the name is wrong. There is no power in the starch. What the experiments keep uncovering is the effect of context, of expectation, ritual, attention and the sense that something is being done, and that context is present whenever a real drug is handed over too. Every effective treatment is therefore delivered twice, once by its chemistry and once by its setting, and the second delivery costs nothing. The conclusion is not that doctors should quietly hand out sugar pills, which is both dishonest and, as the open-label work shows, unnecessary. It is that the unhurried consultation and the confident explanation are not decorations on medicine but part of its machinery, and the first thing a hurried health system throws away.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What does the writer say about Beecher's paper of 1955?", options: ["A It was the first study to use the term placebo", "B Its estimate of how many patients respond was too high", "C Other doctors at the time rejected its findings", "D It dealt only with injuries received in war"], answer: "B",
          explain: "The passage calls Beecher's one-third figure 'too generous' and says later analysts found ordinary recovery among the cases. A, C and D reuse words from the paragraph but are never claimed.",
          evidence: "The figure was too generous",
          vocab: ["too generous", "too high"] },
        { n: 28, type: "mcq", prompt: "The naloxone experiment of 1978 is described in order to show that", options: ["A a dummy pill can set off the body's own chemistry", "B morphine relieves pain more reliably than a placebo does", "C some patients are more easily persuaded than others", "D pain is hard for patients to describe accurately"], answer: "A",
          explain: "Because blocking the opioid receptors abolished the relief, the placebo must have made the brain release its own painkillers. The other options echo words in the paragraph without being its point.",
          evidence: "the pill had prompted the brain to release its own painkillers",
          vocab: ["release its own painkillers", "the body's own chemistry"] },
        { n: 29, type: "mcq", prompt: "What point does the asthma study make?", options: ["A Dummy inhalers should not be used in medical research", "B Patients cannot be trusted to report their own symptoms", "C A treatment may change how ill people feel without changing the illness", "D Sham acupuncture works better than a dummy inhaler"], answer: "C",
          explain: "All three treatments produced the same reported improvement, but only the real inhaler changed the measured airflow, so feeling well and being well came apart.",
          evidence: "A placebo can make a person feel well while leaving them ill",
          vocab: ["feel well", "how ill people feel"] },
        { n: 30, type: "mcq", prompt: "The writer treats the open-label study as important because it suggests that", options: ["A placebos ought to replace drugs for minor complaints", "B patients pay little attention to what they are told", "C concealing the truth makes a treatment stronger", "D the benefit does not depend on patients being misled"], answer: "D",
          explain: "The patients were told outright that the pills were inert and still improved more than the untreated group, so the writer concludes that deception is not the active ingredient.",
          evidence: "Deception, it appears, is not the active ingredient.",
          vocab: ["deception", "being misled"] },
        { n: 31, type: "ynng", prompt: "The improvement a placebo brings exists only in the patient's mind.", answer: "NO",
          explain: "NO: the writer insists the response is 'not imaginary' but measurable and chemical, and the rest of the passage sets out the physiology. The statement is exactly what the writer rejects.",
          evidence: "the response the dummy capsule produces is not imaginary",
          vocab: ["not imaginary", "only in the mind"] },
        { n: 32, type: "ynng", prompt: "Children respond to placebos more strongly than adults do.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: children appear only as an everyday illustration of conditioning. The writer never compares the size of the response in children with the response in adults.",
          evidence: "Doctors who treat children see a domestic version of the same thing" },
        { n: 33, type: "ynng", prompt: "The look and the price of a dummy treatment affect how well it works.", answer: "YES",
          explain: "YES: the writer lists colour, number and route of the dose, and reports that a cream described as expensive brings more relief than the same cream described as cheap.",
          evidence: "a coloured capsule beats a white one",
          vocab: ["a coloured capsule", "the look"] },
        { n: 34, type: "ynng", prompt: "Telling patients about possible side effects can bring those effects on.", answer: "YES",
          explain: "YES: the nocebo paragraph states that reading a list of side effects makes them more likely, and the statin trials show the same complaint appearing without the drug.",
          evidence: "reading a list of side effects makes them more likely",
          vocab: ["makes them more likely", "can bring them on"] },
        { n: 35, type: "ynng", prompt: "Doctors should give patients dummy pills without telling them.", answer: "NO",
          explain: "NO: the closing paragraph rejects handing out sugar pills quietly, calling it dishonest and, given the open-label results, unnecessary. The writer argues for better consultations instead.",
          evidence: "which is both dishonest and, as the open-label work shows, unnecessary" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "named a prescription meant to satisfy a patient rather than cure one.",
            "proves that most modern medicines work no better than nothing.",
            "asked for less pain relief than civilians with similar wounds.",
            "belong to the context of every treatment, including the ones that work.",
            "can make the drink on its own produce the drug's effect.",
            "patients reported the same complaint whether or not they had the drug.",
            "should be removed from clinical trials in future.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "When the word 'placebo' first entered medicine, it", answer: "A",
          explain: "The eighteenth-century dictionary defined a placebo as a prescription given to satisfy a demanding patient rather than to cure him, which is ending A almost word for word.",
          evidence: "a prescription given to satisfy a demanding patient rather than to cure him" },
        { n: 37, type: "match", group: "ends", prompt: "The wounded soldiers Beecher treated in Italy", answer: "C",
          explain: "At Anzio the soldiers with severe injuries asked for less pain relief than civilians with comparable wounds at home. 'Comparable' is the passage's word for ending C's 'similar'.",
          evidence: "asked for less pain relief than civilians with comparable wounds",
          vocab: ["comparable wounds", "similar wounds"] },
        { n: 38, type: "match", group: "ends", prompt: "Giving a distinctive drink repeatedly alongside a real drug", answer: "E",
          explain: "This is the conditioning example: after enough pairings 'the drink alone will eventually suppress it', so the drink by itself produces the drug's effect, ending E.",
          evidence: "the drink alone will eventually suppress it",
          vocab: ["drink alone", "drink on its own"] },
        { n: 39, type: "match", group: "ends", prompt: "Trials of cholesterol-lowering statins showed that", answer: "F",
          explain: "Patients who knew they might be on the drug reported muscle pain at almost the same rate whether they had taken it or a dummy, which is what ending F states.",
          evidence: "reported muscle pain at almost the same rate",
          vocab: ["almost the same rate", "the same complaint"] },
        { n: 40, type: "match", group: "ends", prompt: "The writer concludes that the effects usually credited to placebos", answer: "D",
          explain: "The final paragraph argues that the real cause is context, and that this context 'is present whenever a real drug is handed over too', so it belongs to every treatment.",
          evidence: "that context is present whenever a real drug is handed over too",
          vocab: ["is present whenever", "belong to every treatment"] },
      ],
    },
  ],
};
