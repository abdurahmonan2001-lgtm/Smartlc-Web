// Smart LC Mock Test 8 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + people-matching), P3 argumentative
// (MCQ-4 + sentence endings + YNNG). Key quotas: TFNG/YNNG balanced with
// no runs of three, flat letters, unique concrete-noun answers.
export const MOCK8_READING = {
  id: "mock8-reading",
  bookId: "mock8",
  title: "Mock Test 8 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Fixing the shadow: the origins of photography",
      passage: `Long before anyone spoke of photography, people knew how to make a picture with light. If light enters a completely darkened room through a tiny hole in one wall, an image of the scene outside appears, upside down, on the wall opposite. The effect had been described by scholars in the ancient world, and by the seventeenth century it had been tamed into a portable box with a lens, known as the camera obscura — Latin for "dark room". Artists prized the device: they could place a sheet of thin paper over its glass screen and trace the projected scene in perfect perspective. Yet the picture itself remained a ghost. The moment the box was closed, the image vanished, and the dream of somehow fixing it on the paper — of making light draw a permanent picture of the world — stayed out of reach for another two centuries.

The first person to catch the ghost was a retired French army officer named Joseph Nicéphore Niépce, who experimented for years on his country estate near Chalon-sur-Saône. His method was heroic in its slowness. He coated a polished plate of pewter with a thin layer of bitumen, a kind of natural asphalt that hardens where light falls on it, and set the plate inside a camera obscura pointed out of an upstairs window. An exposure of about eight hours was needed before the plate could be washed, leaving a faint, grainy image of rooftops and a distant pear tree. The picture, made around 1826, still exists, but the process was far too slow to be of practical use, and when Niépce died in 1833 his achievement was known to almost nobody.

His research, however, did not die with him, because Niépce had taken a partner: Louis Daguerre, a Parisian theatre painter with a genius for showmanship. Daguerre replaced the pewter and bitumen with a sheet of silver-plated copper made sensitive to light by chemical fumes, and discovered that a barely visible image could be strengthened by exposing the plate to the vapour of warmed mercury. The exposure time fell from hours to minutes. In 1839 the invention was announced in Paris, and the French government, in exchange for pensions to Daguerre and Niépce's son, presented the process openly for anyone in the world to use. The daguerreotype was a sensation. Its detail astonished viewers — writers described examining a street scene with a magnifying glass and counting the cobblestones — but each picture was a one-off. The process produced a single image on metal, and the only way to obtain a second copy was to photograph the scene again.

Portraiture drove the new trade. Within a few years, daguerreotype studios had opened in cities across Europe and America, and having one's likeness taken became a fashionable, if uncomfortable, ritual. Exposures still lasted the better part of a minute, so studios kept an iron clamp on a stand behind the chair to hold the sitter's head still — one reason the faces gazing out of early photographs so rarely smile.

Meanwhile, in England, a quieter revolution was under way. William Henry Fox Talbot, a landowner and scientist, had been fixing images on chemically treated writing paper since the mid-1830s. His pictures were reversed, with light and dark exchanged, but Talbot saw that this apparent fault was actually the key: the paper original was a negative, and by shining light through it onto a second sheet, any number of positive prints could be made. The images were softer and less detailed than the daguerreotype's polished mirror, and for a decade the French process kept the upper hand. In the long run, though, it was Talbot's principle of negative and positive that survived: for a century and a half, nearly every photograph in the world was made his way.

One barrier remained. Photography still demanded chemistry, darkrooms and patience, and so it belonged to professionals and to wealthy enthusiasts. The person who removed the barrier was an American bank clerk turned manufacturer, George Eastman. In 1888 his company, Kodak, offered a small box camera that came already loaded with a roll of film long enough for a hundred pictures. When the roll was finished, the owner posted the whole camera to the factory, which developed the pictures and returned the camera reloaded. No knowledge of lenses or chemicals was required, and photography passed, in a single decade, from the laboratory into the pocket. Barely sixty years separated Niépce's eight-hour view of his farmyard from a device a child could use — one of the swiftest journeys any invention has made from marvel to habit.`,
      questions: [
        { n: 1, type: "gap", prompt: "In a darkened room, an image of the outside world could enter through a small ______ in a wall.", note: "ONE WORD ONLY", answer: "hole" },
        { n: 2, type: "gap", prompt: "Niépce made his first photograph on a plate of polished ______.", note: "ONE WORD ONLY", answer: "pewter" },
        { n: 3, type: "gap", prompt: "Niépce's picture required an exposure lasting about eight ______.", note: "ONE WORD ONLY", answer: "hours" },
        { n: 4, type: "gap", prompt: "Daguerre strengthened his images using the vapour of warmed ______.", note: "ONE WORD ONLY", answer: "mercury" },
        { n: 5, type: "gap", prompt: "In portrait studios, an iron ______ kept the sitter's head still during the exposure.", note: "ONE WORD ONLY", answer: "clamp" },
        { n: 6, type: "gap", prompt: "Talbot realised his reversed paper image was in fact a ______, from which many prints could be made.", note: "ONE WORD ONLY", answer: "negative" },
        { n: 7, type: "gap", prompt: "The first Kodak camera was sold already loaded with a roll of ______.", note: "ONE WORD ONLY", answer: "film" },
        { n: 8, type: "tfng", prompt: "Artists were using the camera obscura before a way of fixing its image existed.", answer: "TRUE" },
        { n: 9, type: "tfng", prompt: "Niépce's process was widely celebrated during his lifetime.", answer: "FALSE" },
        { n: 10, type: "tfng", prompt: "Daguerreotype portraits cost more in America than in Europe.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "A daguerreotype could not be copied except by taking another photograph.", answer: "TRUE" },
        { n: 12, type: "tfng", prompt: "Talbot's paper pictures showed finer detail than daguerreotypes.", answer: "FALSE" },
        { n: 13, type: "tfng", prompt: "Eastman's camera was designed for people with no technical knowledge.", answer: "TRUE" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The scandal of the bin",
      passage: `A — Add up everything grown, caught and raised for human consumption, and then follow it from field to fork, and a startling figure emerges: roughly a third of the world's food is never eaten. Some rots in fields or warehouses, some is rejected by buyers, and a vast amount is simply thrown away. The waste is more than a moral embarrassment. Producing food that nobody eats swallows land, water, fuel and labour, and as discarded food breaks down in landfill it releases methane, a powerful greenhouse gas. Researchers estimate that if food waste were a country, only two nations would emit more.

B — Where the waste happens, however, depends on where you look. In lower-income countries, most losses occur near the farm: harvests spoil for want of refrigerated storage, decent roads or airtight silos, and food often perishes before it ever reaches a market. In wealthy countries the picture is reversed. Farms and factories are relatively efficient; it is shops, restaurants and, above all, households that discard food, much of it perfectly edible. The two problems demand opposite remedies — investment in basic infrastructure in one case, changes in behaviour and business practice in the other. Anjali Rao, an agricultural engineer who designs airtight grain bags and solar-powered cold rooms for smallholders, believes the first of these is badly neglected. "The cheapest food in the world is the food already grown," she says. "A few dollars of decent storage on a farm in Africa or South Asia rescues more grain than any amount of persuasion aimed at shoppers in Europe, and nobody has to change a single habit."

C — Retailers sit at the point where the two worlds meet, and their rules quietly shape what is wasted. For decades, supermarkets rejected fruit and vegetables for purely cosmetic reasons — a curved cucumber, a two-legged carrot — until public pressure persuaded many chains to sell "wonky" ranges at a discount. Labelling is changing too: one large British grocer removed "best before" dates from hundreds of fresh products, reasoning that shoppers' own eyes judge an apple better than a printed date does. David Ansah, who runs sustainability policy for a retail group, argues that shoppers are ahead of the industry: "Every trial tells the same story. Offer people slightly odd-looking produce at a fair price and they buy it. The perfect-vegetable standard was our invention, not their demand."

D — Even so, in rich countries the largest single share of waste occurs in the home, and researchers who sift through household bins report how ordinary its causes are. Ruth Calder, a behavioural scientist who has run kitchen studies in several hundred homes, found that families discard food not from carelessness but from confusion and habit: they misread date labels, throwing away food that is merely past its "best before" rather than unsafe; they shop without checking the fridge; they cook more than anyone intends to eat. Her trials suggest the remedies are equally ordinary. "Writing a shopping list, checking the fridge first, serving smaller portions and freezing what is left — none of this is glamorous," she says, "but in our studies these small routines cut a family's food waste by a third. Tiny habits, repeated daily, beat any campaign poster."

E — Technology now works on the problem from several directions. Forecasting software helps supermarkets order more accurately, so that less arrives than must later be discarded. Smartphone apps connect bakeries, cafés and grocers with nearby customers willing to collect unsold food cheaply at closing time, and others let neighbours give away surplus from their own kitchens. Marta Keller, a food-systems researcher, cautions that the clever tools rest on an unglamorous foundation: measurement. "Most companies genuinely do not know how much food they throw away," she says. "The moment they weigh it, the number appears in a report, someone is responsible for it, and it starts to fall. You cannot manage what you have not measured."

F — Governments have begun to act on the food that remains. France was first to require large supermarkets, by law, to donate unsold edible food to charities rather than destroy it, and several countries have since followed. Redistribution organisations collect surplus from farms, manufacturers and shops and channel it to food banks and community kitchens. Felipe Duarte, who coordinates one such network across a large city, insists the benefit is not only nutritional: "A neighbourhood kitchen cooking rescued food becomes a place where people meet, volunteer and learn. Surplus food, handled with dignity, builds a community as well as feeding it."

G — No single actor can solve waste on this scale, and researchers describe a hierarchy of responses: prevent surplus first, redistribute what cannot be prevented, feed animals or make compost with what remains, and send to landfill only the last resort. The encouraging news is that the problem yields to attention. Cities and companies that measure their waste and act on the numbers routinely report reductions of a quarter or more within a few years — evidence that the third of food now wasted is not an unavoidable cost of feeding the world, but a habit that can be unlearned.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEFG",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          prompt: "a legal obligation for shops to pass on unsold food", answer: "F" },
        { n: 15, type: "match", group: "minfo", prompt: "an explanation of why food waste occurs at different stages in different countries", answer: "B" },
        { n: 16, type: "match", group: "minfo", prompt: "examples of software connecting surplus food with people who want it", answer: "E" },
        { n: 17, type: "match", group: "minfo", prompt: "a change a retailer made to the dates printed on food", answer: "C" },
        { n: 18, type: "gap", group: "sum8", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Waste in wealthy countries",
            lines: [
              "In rich countries, the largest share of food waste happens in the {{18}}. Households misunderstand date {{19}} and so discard food that is still safe to eat,",
              "and they often buy too much because they shop without first checking the {{20}}. Research by Ruth Calder suggests simple routines make the difference:",
              "writing a shopping {{21}} before going out, serving smaller {{22}} at meals, and freezing leftovers cut waste in her studies by a third.",
            ],
          },
          answer: "home" },
        { n: 19, type: "gap", group: "sum8", answer: "labels" },
        { n: 20, type: "gap", group: "sum8", answer: "fridge" },
        { n: 21, type: "gap", group: "sum8", answer: "list" },
        { n: 22, type: "gap", group: "sum8", answer: "portions" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Marta Keller", "David Ansah", "Ruth Calder", "Felipe Duarte", "Anjali Rao"],
          rubric: "Match each statement with the correct person, A–E.",
          prompt: "Waste begins to fall once an organisation starts weighing it.", answer: "A" },
        { n: 24, type: "match", group: "people", prompt: "Small everyday routines reduce waste more than publicity does.", answer: "C" },
        { n: 25, type: "match", group: "people", prompt: "Customers are willing to buy produce that does not look perfect.", answer: "B" },
        { n: 26, type: "match", group: "people", prompt: "Rescued food can bring people together as well as feed them.", answer: "D" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The shrinking world of play",
      passage: `Ask three generations of one family where they played as children, and you map a quiet transformation. A man now in his seventies describes roaming woods and riverbanks several kilometres from home, unsupervised, from breakfast to dusk. His daughter, growing up in the 1980s, was allowed the park at the end of the street. Her own children, today, play mostly in the garden or indoors, within sight of an adult. Researchers who study children's independent mobility — the freedom to move around a neighbourhood without an adult — have documented the same pattern across many countries: the territory a child may explore alone has contracted dramatically within living memory, in some studies to a tenth of what it was two generations ago.

The causes form a familiar list, though their weights are argued over. Traffic is the most concrete: streets that once served as playgrounds now carry constant cars, and parents' judgement that roads are dangerous is, on the numbers, sound. Other fears rest on shakier ground. Abduction by a stranger — the scenario that shapes so many family rules — remains among the rarest of crimes, no more common than decades ago; what has changed is not the danger but its visibility, as every distant tragedy now arrives instantly on every screen. To this are added longer school hours, timetables filled with organised activities, the pull of devices, and a legal climate in which any injury on public property may produce a claim. Each pressure is individually reasonable. Together they have rebuilt childhood.

Does it matter? A body of research on what scholars call "risky play" suggests that it does. The term is easily misread: it does not mean recklessness, but the kinds of play children have always sought out — climbing higher than feels quite comfortable, swinging fast, balancing, play-fighting, exploring out of sight of adults. Its signature is a thrill of uncertainty that the child controls, edging towards a limit and retreating from it. Observational studies find that children given such freedom become measurably better at judging what they can and cannot manage — they fall, but learn how to fall — and several longitudinal studies associate early risky play with greater confidence and lower anxiety later in childhood. The provocative conclusion is that the safest childhood, in the long run, may be one containing a regular, moderate diet of managed danger.

The modern playground illustrates how good intentions can defeat themselves. Frightened of accidents and of the lawsuits that follow them, many local authorities stripped out tall slides, high climbing frames and fast roundabouts, replacing them with low, rounded equipment set in rubber surfacing. The paradox, observed repeatedly, is that equipment designed to eliminate challenge also eliminates interest: children ignore apparatus that offers nothing to master, or invent unofficial and genuinely dangerous uses for it — climbing the outside of the safety barriers, jumping from the roof of the toddler house. Meanwhile, national injury statistics show no clear improvement attributable to the redesigns. The risk was not removed; it was displaced.

Some designers have drawn the lesson. So-called adventure playgrounds — enclosed sites stocked with loose materials such as planks, tyres, crates and tools, staffed by trained playworkers who watch but rarely intervene — invert the usual logic: instead of a fixed structure that is "finished", they offer raw possibility. Studies comparing the two settings find that children stay far longer at adventure playgrounds than at conventional ones, play more cooperatively, and, counter-intuitively, suffer no more injuries. Where a bolted steel frame can be exhausted in an afternoon, a pile of planks is a different place every day, because the children themselves keep rebuilding it.

It is sometimes objected that today's children are hardly idle: they swim, they train, they attend clubs. But organised activity, whatever its virtues, is not a substitute for free play. In a football session an adult sets the goal, the rules and the schedule. In unstructured play, children must do the work that matters developmentally — negotiate the rules, resolve the quarrels, invent the game and change it when it fails. Sociologists note that this small self-governing republic of the street and the vacant lot was, for most of history, where social skill was rehearsed; a calendar of supervised sessions, however enriching, rehearses obedience to a timetable.

None of this requires nostalgia for a vanished golden age; it requires design. Where cities have closed residential streets to traffic for a few hours a week, children pour out of doors within minutes, and such "play street" schemes deserve to spread. Playgrounds can be built to offer graded challenge rather than none. Schools can lengthen, not shorten, breaktimes. What is not needed is yet more instruction: given time, space and other children, the young of our species need no lessons in how to play. The task for adults is not to teach children to take risks, nor to watch them ever more closely, but to rebuild the ordinary places and relaxed expectations within which children teach themselves.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer describes three generations of a family in order to show", options: ["A that older people exaggerate the freedom they once had", "B how much the ground children cover on their own has shrunk", "C that towns used to be safer than they are now", "D why children today prefer to stay indoors"], answer: "B" },
        { n: 28, type: "mcq", prompt: "According to the passage, researchers use the term \"risky play\" to describe activities that", options: ["A frequently result in serious injuries", "B deliberately break rules set by adults", "C let children test a limit at a level of danger they set themselves", "D are only possible in natural surroundings"], answer: "C" },
        { n: 29, type: "mcq", prompt: "What point does the writer make about redesigned playground equipment?", options: ["A Its very safety may be why children lose interest in it", "B It has caused more injuries than the equipment it replaced", "C It is too expensive for most local authorities", "D It is suitable only for very young children"], answer: "A" },
        { n: 30, type: "mcq", prompt: "The writer's overall conclusion is that", options: ["A children have become naturally more cautious than before", "B screen time fully explains the decline in outdoor play", "C children now need closer adult supervision when playing", "D adults should change the environments and expectations they create"], answer: "D" },
        { n: 31, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "hold children's attention longer than conventional playgrounds.",
            "has contracted sharply within a few generations.",
            "should be banned from public parks altogether.",
            "helps children learn to judge danger for themselves.",
            "has led local authorities to remove challenging structures.",
            "does not provide the developmental benefits of unstructured play.",
            "was more common in the countryside than in cities.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Being allowed to take risks in play", answer: "D" },
        { n: 32, type: "match", group: "ends", prompt: "The territory children may explore on their own", answer: "B" },
        { n: 33, type: "match", group: "ends", prompt: "Fear of legal claims after accidents", answer: "E" },
        { n: 34, type: "match", group: "ends", prompt: "Sites offering loose materials such as planks and tyres", answer: "A" },
        { n: 35, type: "match", group: "ends", prompt: "Organised activity such as sports training", answer: "F" },
        { n: 36, type: "ynng", prompt: "The decline of outdoor play has real costs for children's development.", answer: "YES" },
        { n: 37, type: "ynng", prompt: "Parents' fears about strangers accurately reflect the actual level of danger.", answer: "NO" },
        { n: 38, type: "ynng", prompt: "Boys have been more affected by the decline in outdoor play than girls.", answer: "NOT GIVEN" },
        { n: 39, type: "ynng", prompt: "Schemes that close streets to traffic so children can play are worthwhile.", answer: "YES" },
        { n: 40, type: "ynng", prompt: "Adults should give children lessons in how to play.", answer: "NO" },
      ],
    },
  ],
};
