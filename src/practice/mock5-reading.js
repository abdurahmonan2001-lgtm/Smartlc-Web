// Smart LC Mock Test 5 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching headings + summary + multiselect + short answer), P3
// argumentative science (MCQ-4 + YNNG + sentence endings). Key quotas:
// TFNG/YNNG balanced with no runs of three, flat letters, unique
// concrete-noun answers, correct MCQ options paraphrase the text.
export const MOCK5_READING = {
  id: "mock5-reading",
  bookId: "mock5",
  title: "Mock Test 5 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Two wheels that changed the world",
      passage: `One summer morning in 1817, the citizens of Mannheim, in south-western Germany, watched a forestry official named Karl von Drais ride past on a curious wooden machine. It had two wheels set one behind the other, joined by a beam on which the rider sat, and a bar at the front for steering. It had no pedals: the rider simply pushed against the ground with his feet, gliding forward between strides. Drais called it a running machine, and on a firm road it was genuinely quicker than walking. Fashionable young men in Paris and London soon took up the "hobby horse", as the English mockingly renamed it, but the craze was brief. The machines were heavy, the roads were poor, and after a series of collisions on crowded pavements several cities banned them altogether. Within a few years the invention had been pushed to the back of coach houses and largely forgotten.

The idea slept for more than forty years. In the 1860s it woke in Paris, in the workshop of the blacksmith Pierre Michaux, where cranks and pedals were fitted for the first time to the front wheel of a two-wheeled machine. Exactly whose idea this was is still argued over: the credit has been claimed for Michaux himself, for his son Ernest, and for their sometime employee Pierre Lallement, who later patented a similar design in America. Whoever deserves the honour, the pedal turned the old hobby horse into something new — the velocipede — and started a small industry. It also earned the machine a less flattering title. With a rigid frame and tyres of solid iron rattling over cobbled streets, the velocipede shook its rider so thoroughly that everyone simply called it the boneshaker.

The velocipede had a built-in limitation. Because the pedals were fixed directly to the front wheel, one turn of the pedals produced exactly one turn of the wheel, so the only route to more speed was a bigger wheel: a larger circle covered a greater distance with every turn of the pedals. Front wheels accordingly swelled, year after year, until some measured over a metre and a half, with a tiny trailing wheel behind for balance. This towering machine, known in Britain as the ordinary and later as the penny-farthing, was fast and, its admirers insisted, elegant. It was also dangerous. The rider perched almost directly above the giant wheel, and a stone or a rut in the road could pitch him over the handlebars head first — a fall common enough to have its own name, the header. Riding an ordinary demanded strength, nerve and long legs, and cycling therefore remained the pastime of a small club of athletic young men.

The machine that opened cycling to everybody appeared in 1885, in the Coventry workshop of John Kemp Starley. His Rover "safety bicycle" placed the rider low down between two wheels of equal, modest size, and drove the rear wheel through a chain. The chain was the decisive detail: with gearing, the wheel could be made to turn faster than the pedals, so speed no longer required size. Three years later John Boyd Dunlop, a veterinary surgeon working in Belfast, wrapped the wheels of his son's tricycle in rubber tubes filled with air. The pneumatic tyre soaked up the vibration of rough roads, and when it was combined with Starley's design the result was safer, faster and more comfortable than the ordinary in every respect. Within a few years the giant wheel had vanished from the roads into museums.

What followed in the 1890s was one of the great crazes of the century. Bicycles began to be produced in factories rather than by individual craftsmen, output soared, and falling prices brought the machine within reach of clerks, teachers and shop assistants. For women, the bicycle proved quietly revolutionary. Long, heavy skirts tangled dangerously in chains and spokes, and cycling did much to make simpler, more practical clothing acceptable in public. Campaigners for women's rights praised the machine in extravagant terms, and with reason: a woman with a bicycle could travel where she pleased, unescorted, at her own speed. The bicycle's reach even shows up in records of family life, for historians studying village registers have found that once the machine became common, people more often found marriage partners beyond their own parish.

In the twentieth century the motor car pushed the bicycle down the ladder of status in wealthy countries, though it remained the workhorse of daily life across much of the world. In recent decades, congestion, concern for health and the cost of fuel have carried it back into fashion, this time with electric motors to flatten the hills. Yet the essential design — two equal wheels, a diamond-shaped frame, a chain to the rear wheel and tyres full of air — has scarcely changed since Starley's Rover. A rider from 1890, set down in a modern city, would recognise today's machine at a glance.`,
      questions: [
        { n: 1, type: "gap", prompt: "Riders moved the running machine along by pushing against the ground with their ______.", note: "ONE WORD ONLY", answer: "feet" },
        { n: 2, type: "gap", prompt: "Because of its iron tyres and rigid frame, the velocipede was nicknamed the ______.", note: "ONE WORD ONLY", answer: "boneshaker" },
        { n: 3, type: "gap", prompt: "Enlarging the front wheel meant that a rider covered a greater ______ with each turn of the pedals.", note: "ONE WORD ONLY", answer: "distance" },
        { n: 4, type: "gap", prompt: "On the safety bicycle, power was carried to the rear wheel by a ______.", note: "ONE WORD ONLY", answer: "chain" },
        { n: 5, type: "gap", prompt: "Dunlop's tyre was a rubber tube filled with ______.", note: "ONE WORD ONLY", answer: "air" },
        { n: 6, type: "gap", prompt: "In the 1890s, prices fell as bicycles started to be made in ______.", note: "ONE WORD ONLY", answer: "factories" },
        { n: 7, type: "tfng", prompt: "The running machine remained fashionable for only a short time.", answer: "TRUE" },
        { n: 8, type: "tfng", prompt: "Historians are certain who first fitted pedals to a two-wheeled machine.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Some owners of the ordinary took part in organised races.", answer: "NOT GIVEN" },
        { n: 10, type: "tfng", prompt: "The chain made it possible for bicycles to be fast without large wheels.", answer: "TRUE" },
        { n: 11, type: "tfng", prompt: "Dunlop developed the pneumatic tyre for his own bicycle.", answer: "FALSE" },
        { n: 12, type: "tfng", prompt: "Cycling influenced the way some women dressed.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "The safety bicycle sold better in Britain than in France.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Replanting the rainforests of the sea",
      passage: `A — Coral reefs cover a fraction of one per cent of the ocean floor, yet they shelter roughly a quarter of all known marine species, protect coastlines from storm waves, and support the diets and incomes of hundreds of millions of people. They are also in serious trouble. When seawater stays unusually warm for weeks, corals expel the microscopic algae that feed them and turn ghostly white — a process called bleaching — and if the heat persists, they die. Marine heatwaves that were once rare now arrive repeatedly, and surveys show that many of the world's reefs have already lost a large share of their living coral. Faced with losses on this scale, a growing number of scientists have stopped simply recording the decline and begun asking a more active question: can a reef be rebuilt?

B — The oldest and most widespread answer borrows its logic from the garden. Many corals, like many plants, can regrow from a cutting. Restoration teams therefore collect small fragments from healthy colonies and suspend them in underwater nurseries — frames of rope, or plastic "trees" anchored in mid-water — where, safe from predators and competition, the fragments grow several times faster than they would on the reef. After months of tending, divers fasten the young corals onto damaged reef, one by one. Amara Diallo, who runs a nursery programme in the Caribbean, estimates that her teams have planted more than forty thousand corals in a decade, but she is frank about the cost of the method: every single one was trimmed, hung, cleaned and finally cemented into place by hand. Gardening, she points out, also has a bias — it works best with fast-growing, branching corals, the sprinters of the reef.

C — The reef's marathon runners posed a harder problem. The massive, boulder-shaped corals that form a reef's foundations may add only a few millimetres a year, far too slowly for any nursery. The solution emerged when researchers noticed that corals cut into very small pieces behave quite differently. Leah Sandoval, who helped refine the technique now known as microfragmentation, saws healthy colonies into fragments of just a few polyps, each of which grows at many times the normal rate, as though racing to repair a wound. The fragments are raised on small ceramic tiles, then fixed to the reef in close groups; because each piece carries identical tissue, neighbouring fragments do not compete but knit together, eventually fusing into a single colony. Growth that would once have taken a century, Sandoval argues, can now be compressed into a decade or two.

D — A third approach avoids cutting anything at all. On a few nights each year, cued by the full moon and water temperature, an entire reef takes part in a mass spawning, releasing eggs and sperm that rise through the water in a drifting pink cloud. Teams led by Kenji Morita motor out to meet it, skimming off a tiny share of the floating spawn and rearing the resulting larvae in floating pools by the million. A week or so later the young corals are released over damaged reef, or settled first onto small devices that give them a foothold. Most will die — that is true on a natural reef as well — but the numbers are so vast that even a small survival rate can seed a slope with new colonies, at far less labour per coral than gardening demands.

E — Not everyone is persuaded. The reef scientist Ingrid Bauer points to unforgiving arithmetic: projects worldwide have restored hundreds of hectares, while degraded reef is measured in tens of thousands of square kilometres, and the price — commonly hundreds of thousands of dollars for each hectare treated — puts the gap beyond closing. Her sharpest objection, though, concerns the future rather than the budget: corals planted this year remain just as sensitive to temperature as their parents, so a single severe heatwave can erase a decade of careful work. Restorers have answered by breeding from colonies that survived recent bleaching, an approach called assisted evolution, in the hope of planting heat-tolerant stock. Even its advocates, however, accept Bauer's central point: restoration buys time, and only cutting the emissions that warm the ocean addresses the cause.

F — How, finally, should success be judged? Counting surviving corals is the easy measure, and the wrong one, argues the ecologist Grace Otieno, because a reef is not a plantation but a working system. Her team listens to reefs instead: a healthy reef crackles and hums with snapping shrimp and grazing fish, while a degraded one falls eerily quiet, and young fish drifting in open water use that soundscape to decide where to settle. Restored sites, her recordings show, grow steadily louder as life returns — and playing the sound of a healthy reef through underwater speakers can draw settlers in sooner. Otieno adds one more test that has nothing to do with biology: the projects that last are those run with the fishing and tourism communities whose livelihoods depend on the reef. The true goal, she argues, is a reef that no longer needs its gardeners.`,
      questions: [
        { n: 14, type: "match", group: "head",
          boxTitle: "List of Headings",
          box: [
            "How ocean chemistry is changing",
            "Borrowing a technique from the garden",
            "Measuring more than the corals themselves",
            "Why reefs matter and why they are in danger",
            "Questioning whether restoration can keep up",
            "A call to end reef tourism",
            "A faster way to grow the slowest corals",
            "Collecting the results of a yearly event",
          ],
          rubric: "Reading Passage 2 has six paragraphs, A–F. Choose the correct heading for each paragraph from the List of Headings below. There are more headings than paragraphs.",
          prompt: "Paragraph A", answer: "D" },
        { n: 15, type: "match", group: "head", prompt: "Paragraph B", answer: "B" },
        { n: 16, type: "match", group: "head", prompt: "Paragraph C", answer: "G" },
        { n: 17, type: "match", group: "head", prompt: "Paragraph D", answer: "H" },
        { n: 18, type: "match", group: "head", prompt: "Paragraph E", answer: "E" },
        { n: 19, type: "match", group: "head", prompt: "Paragraph F", answer: "C" },
        { n: 20, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Growing corals by hand",
            lines: [
              "In the most widespread method, divers collect small {{20}} from healthy colonies and hang them in underwater {{21}}, where they grow quickly before being fixed onto damaged reef.",
              "The technique suits branching corals, but the massive species that form a reef's foundations grow too slowly for it.",
              "Microfragmentation overcomes this: corals are cut into tiny pieces and raised on ceramic {{22}}, and when the pieces are placed close together on the reef they eventually fuse into a single {{23}}.",
            ],
          },
          answer: "fragments" },
        { n: 21, type: "gap", group: "sum2", answer: "nurseries" },
        { n: 22, type: "gap", group: "sum2", answer: "tiles" },
        { n: 23, type: "gap", group: "sum2", answer: "colony" },
        { n: 24, type: "multiselect", group: "crit",
          prompt: "Which TWO criticisms of reef restoration are mentioned in the passage?",
          options: [
            "It damages the healthy reefs that fragments are taken from.",
            "It costs a very large amount for each hectare treated.",
            "It attracts too many tourists to fragile sites.",
            "Newly planted corals may be killed by the next severe heatwave.",
            "It takes work away from local communities.",
          ],
          answer: "B" },
        { n: 25, type: "multiselect", group: "crit", answer: "D" },
        { n: 26, type: "gap", prompt: "What yearly event provides researchers with enormous numbers of coral eggs?", note: "NO MORE THAN TWO WORDS", answer: ["spawning", "mass spawning", "coral spawning", "the spawning"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The birds that never forget a hiding place",
      passage: `Each autumn, in the mountain forests of western North America, a grey and black bird called Clark's nutcracker works with the urgency of a creature that knows exactly what winter will demand of it. Prising seeds from pine cones with its long bill, a single bird may harvest tens of thousands of them and bury them in the soil in thousands of separate hoards, or caches, scattered across many square kilometres of forest. Months later, with the landscape transformed and often deep in snow, the bird returns and digs its stores up again; its survival, and that of the chicks it raises at the end of winter, depends on finding them. For a long time many psychologists simply declined to believe that a bird could remember so much. A brain weighing a few grams, holding thousands of locations for half a year? Surely, the argument ran, the birds were doing something simpler: searching at random in promising places, smelling the seeds through the soil, or following a rule of thumb such as always burying food beside a log.

One by one, those comfortable explanations have been dismantled. Random search fails the arithmetic: in aviary experiments where birds cache seeds in sand-covered floors, they relocate their own hoards at rates far beyond anything chance allows, while largely ignoring caches made by other birds in the same room. Smell fails too, and the demonstration is elegant in its simplicity — nutcrackers dig confidently at precisely the right spots even when experimenters have quietly removed the buried seeds beforehand, which means there is nothing in the ground left to detect; whatever guides the bird is inside its head. The most revealing experiments concern landmarks. Birds were allowed to bury seeds in an arena furnished with prominent objects — stones, logs, upright posts — which the researchers later shifted, all together, a short distance in the same direction. Returning birds dug not at the true location of the seeds but at a spot displaced by exactly the distance the landmarks had moved. They were navigating by remembered geometry: not "where the seed is", but "where the seed sits in relation to everything around it".

Anatomy tells a matching story. The hippocampus, a brain structure central to spatial memory in birds and mammals alike, is consistently larger in food-storing birds, relative to the rest of the brain, than in closely related species that store little or nothing. Nor is the structure fixed. In chickadees, small northern birds that hide seeds by the thousand, the hippocampus enlarges in autumn, just as the caching season begins, adding new neurons before shrinking again once the stores are gone. Brain tissue is among the most expensive tissue an animal can maintain, and few findings illustrate so neatly the principle that the brain invests in memory when, and only when, memory pays.

Remembering places, moreover, may be the least of it. In a series of much-discussed laboratory experiments, western scrub jays were given two foods to cache: wax worms, which they greatly prefer but which rot quickly, and peanuts, which are less prized but keep indefinitely. Allowed to recover their caches a few hours later, the jays went straight for the worms. When the delay stretched to several days — long enough, as the birds had learned, for worms to become inedible — they abandoned the worm sites and dug up the peanuts instead. The jays, it appears, remembered what they had hidden, where they had hidden it, and how long ago: a bundle of information, sometimes called episodic-like memory, that theorists had long reserved for humans. The same species then supplied a social twist. A jay that has itself pilfered other birds' caches behaves like a bird expecting to be robbed: if it was watched while hiding food, it will return later, alone, and move that food to fresh sites. Jays with no history of stealing rarely take such precautions. It is difficult to describe the difference without reaching for words like suspicion and experience.

How should all this be interpreted? For one school, the food-storers are a textbook case of adaptive specialisation: a brutal ecological problem — survive winter on what you hid in autumn — favoured birds with an enlarged hippocampus and a memory tuned to places, and the result is a specialised instrument, not a generally clever mind. Critics answer that the picture is far less tidy than the theory requires. Measured differences between storing and non-storing species, they note, are often modest and vary from one study to the next; laboratory tasks may miss what matters in the wild, for an aviary floor is not a mountainside; and some early comparisons mixed up species that differ in more than their storing habits. The debate continues, but its terms are worth noticing: nobody now argues that the birds do not remember, only about how, and how specially. Whichever school prevails, the birds have already done useful damage to an old assumption. Creatures with brains a small fraction the size of our own perform feats of spatial memory that rival those of primates, and they remind us that memory did not evolve once, in us, but many times — wherever remembering paid its way.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What is the writer's main point in the first paragraph?", options: ["A Nutcrackers store more seeds than any other bird", "B Winter makes food impossible to find in the forests", "C The birds' retrieval task appears too demanding for their brains", "D Psychologists have finally explained how caching works"], answer: "C" },
        { n: 28, type: "mcq", prompt: "The landmark experiments showed that the birds", options: ["A locate their caches in relation to nearby objects", "B follow the smell of the seeds to each cache", "C search wherever the ground has been disturbed", "D remember the appearance of each individual cache"], answer: "A" },
        { n: 29, type: "mcq", prompt: "The birds' accurate digging after seeds had been removed suggests that they", options: ["A lose their memories within a few weeks", "B were copying the behaviour of other birds", "C had marked each cache site in some way", "D were not being guided by smell"], answer: "D" },
        { n: 30, type: "mcq", prompt: "The writer mentions the seasonal change in the chickadee hippocampus to show that", options: ["A all birds' brains grow larger in autumn", "B the brain devotes resources to memory when it is most needed", "C chickadees are the most intelligent of the food-storers", "D memory inevitably declines as birds age"], answer: "B" },
        { n: 31, type: "mcq", prompt: "In the experiments with worms and peanuts, the jays' choices depended on", options: ["A which food they preferred to eat", "B which food had been buried closest to them", "C how much time had passed since caching", "D whether other birds were watching them"], answer: "C" },
        { n: 32, type: "ynng", prompt: "The writer accepts that food-storing birds find their caches by memory rather than chance.", answer: "YES" },
        { n: 33, type: "ynng", prompt: "The writer believes laboratory studies of caching prove nothing.", answer: "NO" },
        { n: 34, type: "ynng", prompt: "The writer considers the nutcracker's memory superior to that of any mammal.", answer: "NOT GIVEN" },
        { n: 35, type: "ynng", prompt: "The writer regards the scrub-jay findings as evidence of memory for events.", answer: "YES" },
        { n: 36, type: "ynng", prompt: "The writer concludes that complex memory arose only once in evolution.", answer: "NO" },
        { n: 37, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "point out that findings differ from one study to the next.",
            "dug at a spot shifted by the same distance as the objects around it.",
            "grows smaller during the autumn months.",
            "is larger than in related species that do not hide food.",
            "moved its food to new places when it had been observed hiding it.",
            "was unable to remember any caches after two months.",
          ],
          rubric: "Complete each sentence with the correct ending, A–F, below.",
          prompt: "A bird searching after the landmarks had been moved", answer: "B" },
        { n: 38, type: "match", group: "ends", prompt: "The hippocampus of a food-storing species", answer: "D" },
        { n: 39, type: "match", group: "ends", prompt: "A jay with its own history of stealing", answer: "E" },
        { n: 40, type: "match", group: "ends", prompt: "Critics of the specialisation theory", answer: "A" },
      ],
    },
  ],
};
