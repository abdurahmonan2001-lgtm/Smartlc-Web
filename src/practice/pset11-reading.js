// Smart LC Practice Set 11 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// science (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET11_READING = {
  id: "pset11-reading",
  bookId: "pset11",
  title: "Practice Set 11 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The wheelbarrow",
      passage: `The wheelbarrow belongs to that small class of inventions so ordinary that nobody thinks to ask where they came from. It has one moving part, costs very little and needs no fuel, yet it roughly doubles the amount a single worker can shift in a day. Mechanically it is two ancient devices joined together: a wheel, which does away with the friction of dragging, and a lever, which lets the load rest partly on the ground and partly on the operator's arms. Where the wheel sits along that lever decides almost everything about how a barrow behaves, and it is precisely on this point that the two great traditions of wheelbarrow design disagree.

The earliest secure evidence comes from China. Carvings and painted tomb bricks of the Han dynasty, some of them dated to the first century AD, show one-wheeled carts being pushed and pulled, and written sources from the following centuries describe such carts at work on farms and battlefields. Chinese tradition credits the invention to Zhuge Liang, a statesman and general of the third century, who is said to have supplied his armies in mountainous country with devices known as the wooden ox and the gliding horse. Historians doubt the attribution, since the archaeological evidence is older than Zhuge Liang himself, but the association with military supply is telling. An army that had to be fed along narrow mountain tracks, where a cart and its ox could not pass, had every reason to develop a vehicle that one man could push.

The Chinese barrow was built around a single large wheel placed at the centre, with the load carried on frames to either side of it. Because almost the whole weight rested directly over the axle, the pusher supported very little of it and spent his strength on balance and direction rather than on lifting. Loads of two hundred kilograms were routine, and travellers described barrows carrying six passengers at once. On long journeys a mast and sail were sometimes rigged so that a following wind could take a share of the work, a practice that astonished European visitors well into the nineteenth century. The design had one obvious weakness: the central wheel divided the load in two, so the barrow could not be tipped, and awkward or heavy single objects were difficult to carry at all.

Europe arrived at the machine much later and solved it differently. Wheelbarrows appear in European manuscripts and in painted window glass from about 1170, and by the thirteenth century they were common on the great building sites, where masons used them to move stone, mortar and rubble. The European barrow put its wheel at the front. That arrangement made the operator carry a far larger share of the weight, but it bought two advantages that mattered on a construction site: the barrow could be steered through a doorway or along a narrow plank, and it could be tipped forward to empty in a second. Since the loads were smaller and the journeys were measured in metres rather than miles, the trade was worth making.

From building the machine spread to mining and to farming. In the shallow mines of central Europe, barrows carried ore along galleries too low for a horse; on farms they moved manure, roots and hay. For centuries they were made entirely of wood, either by their users or by the village wheelwright, with a wheel of oak strengthened by an iron rim. Industry changed the materials rather than the idea. Nineteenth-century foundries turned out cast-iron wheels and, later, whole barrows of pressed steel, cheap enough to buy rather than build. The pneumatic tyre, borrowed from the bicycle, reached the wheelbarrow early in the twentieth century and was the last real improvement: it softened the ride, protected fragile loads and, by spreading the weight over a wider footprint, stopped the barrow sinking into soft ground.

Attempts to improve on the basic form have mostly failed. Two-wheeled versions are more stable but cannot be tipped so easily and will not run along a plank; motorised barrows exist but are heavy and expensive to maintain; barrows with a ball in place of a wheel enjoyed a brief fashion in gardens. The plain single-wheeled tray remains the standard on building sites everywhere, in a shape a medieval mason would recognise at once. What has changed is the load it is built around: the ordinary builder's barrow of today holds about eighty-five litres, a volume settled on because a full one of wet concrete is already as much as an adult can raise from the ground.

Its history also carries a warning about the way we count inventions. The wheelbarrow was no breakthrough in physics; every principle in it was already old. What made it valuable was the combination, and the combination was arrived at twice, a thousand years apart, by people who almost certainly knew nothing of each other's work and who reached different answers because they were solving different problems. Economic historians have used it in a long argument about why simple labour-saving devices spread quickly in some societies and slowly in others. The answer, they suggest, has less to do with cleverness than with cost: a device that saves a worker's time is taken up where workers are scarce and ignored where they are not.`,
      questions: [
        { n: 1, type: "gap", prompt: "The wheelbarrow combines a wheel with a ______, so that the ground carries part of the load.", note: "ONE WORD ONLY", answer: "lever",
          explain: "The passage calls the barrow two ancient devices joined together, the second being a lever that lets the load rest partly on the ground. The gap needs that noun.",
          evidence: "a lever, which lets the load rest partly on the ground" },
        { n: 2, type: "gap", prompt: "Zhuge Liang is said to have used wheeled devices to keep his ______ supplied in mountainous country.", note: "ONE WORD ONLY", answer: "armies",
          explain: "Chinese tradition says Zhuge Liang supplied his armies in mountainous country with the wooden ox and the gliding horse. 'Keep supplied' paraphrases 'supplied'.",
          evidence: "who is said to have supplied his armies in mountainous country",
          vocab: ["supplied", "keep supplied"] },
        { n: 3, type: "gap", prompt: "A ______ was occasionally fitted to a Chinese barrow so that the wind could do part of the pushing.", note: "ONE WORD ONLY", answer: "sail",
          explain: "On long journeys a mast and sail were rigged so that a following wind could take a share of the work — 'a share of the work' is the question's 'part of the pushing'.",
          evidence: "a mast and sail were sometimes rigged",
          vocab: ["a share of the work", "part of the pushing"] },
        { n: 4, type: "gap", prompt: "In thirteenth-century Europe, ______ used barrows to shift stone and mortar on large building sites.", note: "ONE WORD ONLY", answer: "masons",
          explain: "By the thirteenth century barrows were common on the great building sites, where masons moved stone, mortar and rubble with them. 'Shift' paraphrases 'move'.",
          evidence: "where masons used them to move stone, mortar and rubble",
          vocab: ["move", "shift"] },
        { n: 5, type: "gap", prompt: "Traditional wooden barrows had a wheel of ______ reinforced with a band of iron.", note: "ONE WORD ONLY", answer: "oak",
          explain: "The village wheelwright built barrows with a wheel of oak strengthened by an iron rim. 'Strengthened' becomes 'reinforced' and 'rim' becomes 'band' in the question.",
          evidence: "with a wheel of oak strengthened by an iron rim",
          vocab: ["strengthened", "reinforced"] },
        { n: 6, type: "gap", prompt: "The final significant advance was the ______, an idea taken from the bicycle.", note: "ONE WORD ONLY", answer: "tyre",
          explain: "The pneumatic tyre, borrowed from the bicycle, was the last real improvement. 'Borrowed from' is paraphrased as 'taken from' and 'last real' as 'final significant'.",
          evidence: "The pneumatic tyre, borrowed from the bicycle",
          vocab: ["borrowed from", "taken from"] },
        { n: 7, type: "tfng", prompt: "Historians are not convinced that Zhuge Liang invented the wheelbarrow.", answer: "TRUE",
          explain: "TRUE: the passage says historians doubt the attribution because the archaeological evidence predates him. 'Doubt' is exactly 'are not convinced'.",
          evidence: "Historians doubt the attribution",
          vocab: ["doubt", "not convinced"] },
        { n: 8, type: "tfng", prompt: "The user of a Chinese barrow had to bear most of the weight of the load.", answer: "FALSE",
          explain: "FALSE: with the wheel at the centre almost all the weight sat over the axle, so the pusher supported very little of it — the direct opposite of bearing most of it.",
          evidence: "the pusher supported very little of it",
          vocab: ["supported very little", "bear most of the weight"] },
        { n: 9, type: "tfng", prompt: "Chinese barrows cost more to build than European ones.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage compares the two designs for balance, tipping and bulk, but never mentions what either cost to make. A comparison the text does not draw is classic NOT GIVEN.",
          evidence: "The design had one obvious weakness" },
        { n: 10, type: "tfng", prompt: "The European design allowed a barrow to be emptied very quickly.", answer: "TRUE",
          explain: "TRUE: with the wheel at the front the barrow could be tipped forward to empty in a second — 'in a second' is the passage's way of saying 'very quickly'.",
          evidence: "it could be tipped forward to empty in a second",
          vocab: ["in a second", "very quickly"] },
        { n: 11, type: "tfng", prompt: "Wheelbarrows proved to be of little use underground.", answer: "FALSE",
          explain: "FALSE: in the shallow mines of central Europe barrows carried ore along galleries too low for a horse, which is a use underground, not a failure there.",
          evidence: "barrows carried ore along galleries too low for a horse",
          vocab: ["galleries too low for a horse", "underground"] },
        { n: 12, type: "tfng", prompt: "The pneumatic tyre reduced the risk of a barrow sinking into soft ground.", answer: "TRUE",
          explain: "TRUE: by spreading the weight over a wider footprint the tyre stopped the barrow sinking into soft ground — 'stopped' supports 'reduced the risk of'.",
          evidence: "stopped the barrow sinking into soft ground",
          vocab: ["stopped", "reduced the risk"] },
        { n: 13, type: "tfng", prompt: "Two-wheeled barrows have taken the place of single-wheeled ones on building sites.", answer: "FALSE",
          explain: "FALSE: the passage says the plain single-wheeled tray remains the standard on building sites everywhere, so the two-wheeled version has not replaced it.",
          evidence: "remains the standard on building sites everywhere",
          vocab: ["remains the standard", "taken the place of"] },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Warmth from one boiler",
      passage: `A — District heating reverses an assumption most people never examine: that every building ought to make its own heat. In a district system there is no boiler in the flat and no flue on the outside wall. Water is heated at one plant, pumped out through insulated pipes buried beneath the streets, and passed through a small exchanger in each building, where it warms the radiators and the hot taps before returning, cooled, along a second pipe to be heated again. The idea is unfamiliar in Britain and North America, and entirely ordinary elsewhere: two-thirds of Danish households are connected, and in Iceland nine in ten.

B — It is also older than the technology usually credited with it. In the French village of Chaudes-Aigues, water from hot springs has been carried into houses since the fourteenth century, and its villagers were paying a heating charge four hundred years before anyone built a power station. The modern industry, however, begins in 1877 in Lockport, New York, where an engineer named Birdsill Holly ran a steam pipe from his own furnace to a neighbour's house, then to a dozen more, and sold the heat. Holly's company licensed the system across the country, and by 1900 steam networks warmed the centres of most large American cities. Reykjavik piped geothermal water to the whole city after the Second World War, and post-war Eastern Europe built networks on a scale never seen before.

C — A power station that produces electricity alone converts only about a third of the energy in its fuel into current; the remaining two-thirds leaves as warm water or steam and is dumped into a river, the sea or the air. Ingrid Halvorsen, an energy engineer who advises northern European cities, points out that this waste is not a fault of the machinery but a law of physics, since heat engines cannot do better, and that the only way to recover the loss is to find a customer for the warmth. Combined heat and power does exactly that: the same fuel makes electricity and then heats a city, lifting the useful output of a station from around thirty-five per cent to more than eighty.

D — A second advantage is one the industry has only recently learned to advertise. A network is indifferent to where its heat comes from, so the source can be changed without touching a single radiator. Wei Chen, who maps urban heat sources for a research institute, argues that a district pipe is therefore the most valuable asset a city can own: the plant at the end of it can be swapped from coal to gas to biomass to a giant heat pump as prices change, while a city of individual boilers must be converted one household at a time. Her surveys have turned up heat in unlikely places. Stockholm now warms thousands of flats with the exhaust of data centres, whose computers would otherwise throw their heat away, and other schemes draw warmth from sewers, from supermarket refrigeration and from the flooded workings of abandoned coal mines.

E — The obstacle is money, and it lies almost entirely in the ground. Ana Duarte, an economist who has assessed schemes in a dozen countries, notes that the plant is rarely the problem: it is the trench. Laying insulated pipe under an existing street costs a fortune, disrupts a neighbourhood for months, and the return arrives slowly, over a payback period of thirty to forty years. Everything therefore depends on heat density, the amount of demand along each kilometre of pipe. A street of apartment blocks repays the trench; a suburb of detached houses with large gardens may never do so, which is why the technology suits compact cities and largely defeats sprawling ones.

F — Households have an objection of their own, and it is not about carbon. Once the pipe is in, the customer is joined to a single supplier for the life of the building, with no rival network to switch to. Samuel Ofori, who studies the regulation of household services, has collected the results in countries where nobody thought to legislate for this: sudden price rises, standing charges that bear no relation to consumption, and residents in unmetered blocks paying for a neighbour's open window. Where district heating has a poor reputation, he argues, the fault lies almost never with the engineering and almost always with the absence of rules governing a monopoly that householders did not choose.

G — Denmark's answer is worth studying because it is old enough to have been tested. Danish heat companies are owned either by the municipality or by their own customers, and the law requires them to sell heat at cost: they are forbidden to make a profit, and any surplus is returned to consumers in the following year's price. Municipalities were also given power to divide a town into heat zones and decide which technology would serve each, so that networks were built where they made sense rather than wherever a developer chose. Marek Nowak, a planner who has advised several cities on adopting the model, warns that the ownership rules matter more than the pipes: a city that installs the hardware without the constitution, he says, is building a monopoly and hoping for the best.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a description of what happens to the water once it has given up its heat", answer: "A",
          explain: "Paragraph A follows the water all the way round the loop: after warming the radiators and taps it returns, cooled, along a second pipe to be heated again.",
          evidence: "returning, cooled, along a second pipe to be heated again",
          vocab: ["cooled", "given up its heat"] },
        { n: 15, type: "match", group: "info", prompt: "an example of heat being recovered from a building full of computers", answer: "D",
          explain: "Paragraph D gives Stockholm's data centres, whose computers would otherwise throw their heat away, as one of Chen's unlikely heat sources — a building full of computers.",
          evidence: "warms thousands of flats with the exhaust of data centres",
          vocab: ["data centres", "a building full of computers"] },
        { n: 16, type: "match", group: "info", prompt: "an explanation of why the technology does not suit areas of low-density housing", answer: "E",
          explain: "Paragraph E introduces heat density and contrasts apartment blocks, which repay the trench, with a suburb of detached houses that may never do so.",
          evidence: "a suburb of detached houses with large gardens may never do so",
          vocab: ["detached houses with large gardens", "low-density housing"] },
        { n: 17, type: "match", group: "info", prompt: "an account of the first commercial network in the United States", answer: "B",
          explain: "Paragraph B describes Birdsill Holly in Lockport in 1877 running a steam pipe to his neighbours and selling the heat — the start of the modern commercial industry.",
          evidence: "ran a steam pipe from his own furnace to a neighbour's house",
          vocab: ["sold the heat", "commercial"] },
        { n: 18, type: "match", group: "info", prompt: "a legal restriction on what heat companies may earn", answer: "G",
          explain: "Paragraph G states that Danish law requires heat to be sold at cost and that the companies are forbidden to make a profit — a legal limit on earnings.",
          evidence: "they are forbidden to make a profit",
          vocab: ["forbidden to make a profit", "restriction on what they may earn"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Making heat and power together",
            lines: [
              "A power station that produces electricity alone throws away roughly two-thirds of the energy in its {{19}}, releasing it into a river, the sea or the air. A combined plant sells that warmth instead, so its useful output more than doubles.",
              "No domestic {{20}} can approach such efficiency, but the saving is not what limits the technology.",
              "The real difficulty is the cost of the network itself: burying insulated {{21}} beneath an existing street is slow, disruptive work, and the money comes back only over several decades. Planners therefore measure heat {{22}}, the quantity of demand along each kilometre of the route, before approving a scheme.",
            ],
          },
          answer: "fuel",
          explain: "Only about a third of the energy in a station's fuel becomes electricity; the rest is dumped. The summary's 'throws away' paraphrases the passage's 'dumped'.",
          evidence: "converts only about a third of the energy in its fuel into current",
          vocab: ["dumped", "throws away"] },
        { n: 20, type: "gap", group: "sum2", answer: "boiler",
          explain: "Paragraph A contrasts the network with the individual appliance in the home: in a district system 'there is no boiler in the flat'. The summary needs that domestic appliance.",
          evidence: "there is no boiler in the flat",
          vocab: ["in the flat", "domestic"] },
        { n: 21, type: "gap", group: "sum2", answer: "pipes",
          explain: "The heat travels through insulated pipes buried beneath the streets, and paragraph E says laying that pipe under an existing street costs a fortune — the expensive part of the network.",
          evidence: "pumped out through insulated pipes buried beneath the streets",
          vocab: ["buried beneath", "burying"] },
        { n: 22, type: "gap", group: "sum2", answer: "density",
          explain: "Everything depends on heat density, defined in the passage as the amount of demand along each kilometre of pipe — exactly the definition the summary repeats.",
          evidence: "Everything therefore depends on heat density",
          vocab: ["the amount of demand", "the quantity of demand"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Ingrid Halvorsen",
            "Samuel Ofori",
            "Ana Duarte",
            "Marek Nowak",
            "Wei Chen",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "A heating network can be moved on to a different energy source without disturbing its customers.", answer: "E",
          explain: "Chen argues that the plant at the end of the pipe can be swapped between fuels as prices and politics change, whereas individual boilers must be replaced house by house.",
          evidence: "can be swapped from coal to gas to biomass to a giant heat pump",
          vocab: ["swapped", "moved on to a different energy source"] },
        { n: 24, type: "match", group: "people", prompt: "The heat lost in generating electricity cannot be prevented, only put to use.", answer: "A",
          explain: "Halvorsen calls the waste a law of physics rather than a fault of the machinery, and says the only way to recover it is to find a customer for the warmth.",
          evidence: "the only way to recover the loss is to find a customer for the warmth",
          vocab: ["find a customer for the warmth", "put to use"] },
        { n: 25, type: "match", group: "people", prompt: "The money spent on the underground pipework takes decades to come back.", answer: "C",
          explain: "The economist Duarte locates the cost in the trench rather than the plant and gives a payback period of thirty to forty years — several decades.",
          evidence: "over a payback period of thirty to forty years",
          vocab: ["payback period", "takes to come back"] },
        { n: 26, type: "match", group: "people", prompt: "Dissatisfaction with district heating usually reflects weak rules rather than weak engineering.", answer: "B",
          explain: "Ofori concludes that where the technology has a poor reputation the fault lies not with the engineering but with the absence of rules governing the monopoly.",
          evidence: "almost never with the engineering and almost always with the absence of rules",
          vocab: ["absence of rules", "weak rules"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Why music moves us",
      passage: `Music is a puzzle that hides behind its own familiarity. A sequence of tones makes no statements, names no objects and describes no events, yet it can raise the hair on a listener's arms, bring an audience to tears, or turn a crowd of strangers into something that behaves like a single body. No human society has ever been found without it. Darwin admitted defeat, seeing no use for musical ability in the lives of our ancestors. The psychologist Steven Pinker's phrase for it, auditory cheesecake, has become the standard provocation: music, on this view, is not an adaptation but a confection that tickles half a dozen faculties which evolved for other reasons. The phrase is usually quoted as an insult and answered with indignation. It should not be. The byproduct claim is very probably right as far as it goes; the trouble is that it goes almost no distance towards explaining why the tickling works.

The most durable explanation begins with expectation. In 1956 the musicologist Leonard Meyer proposed that musical emotion arises when a tendency to respond is delayed or blocked: a phrase leads the ear towards a note, and the composer withholds it. Half a century of experiment has supplied the mechanism. Listeners absorb the statistical regularities of the music around them without being taught, and by the age of five can tell a well-formed phrase in their own tradition from a badly formed one. The brain uses that knowledge to predict what is coming, and each note either confirms the prediction or corrects it. What listeners enjoy is not surprise as such, since random notes are merely unpleasant. The pleasure lies in the pattern of delay and return, which is why a familiar piece still moves people who know exactly what comes next.

Since 2000 the argument has moved into the scanner. Volunteers who reliably experience chills show a release of dopamine in the reward system, the chemistry recruited by food, money and sex. The most quoted finding is a division of labour in time: the anticipation of the coming climax engages one structure, while the climax itself engages another, mapping onto the distinction psychologists draw between wanting and liking. All of this is real, and all of it is less explanatory than it looks. Showing which circuits are active tells us that music reaches the reward system; it does not tell us why an arrangement of frequencies should have been granted the key.

A second line of research locates the answer not in the ear but in the body. A steady beat is almost unknown in nature, and the ability to synchronise movement to one is shared by humans with only a handful of other species. People who row, march, dance or drum in time show raised pain thresholds, the standard marker of endorphin release, and afterwards rate their partners as more likeable and cooperate more readily in economic games than people who performed the same movements out of step. The solitary listener in headphones, who supplies almost all our experimental data, is a very recent creature; for most of human history music was something people did together.

How much of this is universal? The best-known test took recordings of Western piano music to the Mafa of northern Cameroon, who had never heard it before, and found that they identified the pieces intended as happy, sad and fearful well above chance. The cues that travel are the crude ones, such as speed and loudness, and they travel because they are borrowed from the voice: a frightened person speaks fast and loud, a grieving one slow and low. Finer conventions do not travel at all. The minor third that signals sorrow to a European ear carries no such message in every tradition; it works, where it works, because it copies the falling interval of a dejected speaker.

Nothing tests these ideas like the oldest question about music: why anyone would choose to listen to something sad. Surveys find that listeners do not describe sad music as making them sad; they describe being moved, which is a different state and a pleasant one. The emotion is felt at a distance, with none of the costs that attend real loss. One popular explanation holds that sorrowful music releases a hormone associated with comfort; the evidence for that particular claim remains thin, and it has failed to replicate as often as it has succeeded. A simpler reading is that music offers a rehearsal: a safe place to feel a large emotion and discover that it can be survived.

Where does this leave the cheesecake? Roughly here: no single explanation will do, and the search for one has been the field's main error. Music appears to work by seizing several systems that are individually much older than it is: the prediction machinery that keeps an animal ahead of the world, the reward circuits that teach it what to want, the motor system that lets a group move as one, and the vocal signals by which mammals broadcast their state. Nothing on that list evolved for art. But an invention that captures four such systems at once is no trivial accident, and the question worth asking is no longer whether music was selected for, but what a species does with a technology this powerful.`,
      questions: [
        { n: 27, type: "mcq", prompt: "The writer mentions the phrase 'auditory cheesecake' in order to", options: ["A dismiss it as an insult to musicians", "B introduce a view he regards as correct but inadequate", "C show that music evolved for one clear purpose", "D argue that music matters less than language"], answer: "B",
          explain: "The writer says the byproduct claim is very probably right as far as it goes, but explains almost nothing — correct yet inadequate. He explicitly refuses to treat it as an insult, so A is the trap.",
          evidence: "The byproduct claim is very probably right as far as it goes",
          vocab: ["right as far as it goes", "correct but inadequate"] },
        { n: 28, type: "mcq", prompt: "According to the passage, what gives listeners pleasure in a musical phrase?", options: ["A sounds they have never encountered before", "B the difficulty of the performance", "C the pattern of postponement and eventual arrival", "D recognising what the composer intended"], answer: "C",
          explain: "The passage rejects surprise itself, since random notes are merely unpleasant, and locates the pleasure in the pattern of delay and return — postponement followed by arrival.",
          evidence: "The pleasure lies in the pattern of delay and return",
          vocab: ["delay and return", "postponement and eventual arrival"] },
        { n: 29, type: "mcq", prompt: "What limitation does the writer identify in the brain-imaging research?", options: ["A It has been carried out on too few volunteers", "B It cannot measure the chills response reliably", "C Its findings apply only to trained musicians", "D It locates the circuits involved but not the reason sound reaches them"], answer: "D",
          explain: "The writer accepts the findings but says showing which circuits are active does not explain why sound was granted the key to the reward system. Sample size and training are never raised.",
          evidence: "it does not tell us why an arrangement of frequencies should have been granted the key",
          vocab: ["granted the key", "the reason sound reaches them"] },
        { n: 30, type: "mcq", prompt: "The findings from listeners in Cameroon suggest that", options: ["A every aspect of musical emotion is shared by all cultures", "B broad emotional signals cross cultures while detailed ones do not", "C speed and loudness have no effect outside their own tradition", "D sadness is easier to recognise in music than happiness"], answer: "B",
          explain: "The Mafa recognised happy, sad and fearful pieces above chance, but the passage says only the crude cues travel and finer conventions do not travel at all.",
          evidence: "Finer conventions do not travel at all",
          vocab: ["the crude ones", "broad emotional signals"] },
        { n: 31, type: "ynng", prompt: "Music can produce powerful feelings although it carries no information.", answer: "YES",
          explain: "YES: the writer opens by noting that a sequence of tones states nothing and names nothing, yet raises the hair on the arms and brings audiences to tears.",
          evidence: "makes no statements, names no objects and describes no events",
          vocab: ["makes no statements", "carries no information"] },
        { n: 32, type: "ynng", prompt: "There is good evidence that enjoyment of sad music comes from the release of a comforting hormone.", answer: "NO",
          explain: "NO: the writer calls the evidence for that particular claim thin and notes that it has failed to replicate about as often as it has succeeded — the opposite of good evidence.",
          evidence: "the evidence for that particular claim remains thin",
          vocab: ["remains thin", "good evidence"] },
        { n: 33, type: "ynng", prompt: "Children who learn a musical instrument do better in other school subjects.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: children appear only as evidence that musical knowledge is absorbed without teaching by the age of five. Musical training and school performance are never linked.",
          evidence: "by the age of five can tell a well-formed phrase in their own tradition from a badly formed one" },
        { n: 34, type: "ynng", prompt: "Music makes use of brain systems that developed for other purposes.", answer: "YES",
          explain: "YES: the writer's conclusion is that music works by seizing several systems much older than itself, and that nothing on the list evolved for art.",
          evidence: "Music appears to work by seizing several systems that are individually much older than it is",
          vocab: ["seizing", "makes use of"] },
        { n: 35, type: "ynng", prompt: "One theory will eventually account for the emotional power of music.", answer: "NO",
          explain: "NO: the writer states plainly that no single explanation will do and that hunting for one has been the field's main error.",
          evidence: "no single explanation will do",
          vocab: ["no single explanation", "one theory"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "raises pain thresholds and makes strangers readier to cooperate.",
            "shows that musical taste is decided in early childhood.",
            "happens without instruction, simply through exposure to a culture's music.",
            "imitates the way the voice changes in a person who is unhappy.",
            "proves that the pleasure of music depends on formal training.",
            "involves a different brain structure from the moment of pleasure itself.",
            "produces a feeling that is experienced at a distance, without its usual costs.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Learning the regularities of a musical style", answer: "C",
          explain: "Listeners absorb the statistical regularities of the music around them without being taught — ending C's 'without instruction, simply through exposure'.",
          evidence: "Listeners absorb the statistical regularities of the music around them without being taught",
          vocab: ["without being taught", "without instruction"] },
        { n: 37, type: "match", group: "ends", prompt: "Waiting for a musical climax", answer: "F",
          explain: "The most quoted imaging finding is that anticipation engages one structure while the climax itself engages another — ending F. The wanting-and-liking distinction is the same point.",
          evidence: "the anticipation of the coming climax engages one structure, while the climax itself engages another",
          vocab: ["anticipation", "waiting for"] },
        { n: 38, type: "match", group: "ends", prompt: "Moving in time with other people", answer: "A",
          explain: "People who row, march, dance or drum in time show raised pain thresholds and afterwards cooperate more readily than those who moved out of step — ending A.",
          evidence: "cooperate more readily in economic games than people who performed the same movements out of step",
          vocab: ["cooperate more readily", "readier to cooperate"] },
        { n: 39, type: "match", group: "ends", prompt: "The minor third heard as sorrowful in Europe", answer: "D",
          explain: "It carries no such message everywhere; where it works, it works because it copies the falling interval of a dejected speaker — ending D's 'imitates the way the voice changes'.",
          evidence: "it copies the falling interval of a dejected speaker",
          vocab: ["copies", "imitates"] },
        { n: 40, type: "match", group: "ends", prompt: "The sadness aroused by sorrowful music", answer: "G",
          explain: "Listeners report being moved rather than miserable: the emotion is felt at a distance, with none of the costs that attend real loss — ending G.",
          evidence: "The emotion is felt at a distance, with none of the costs that attend real loss",
          vocab: ["felt at a distance", "experienced at a distance"] },
      ],
    },
  ],
};
