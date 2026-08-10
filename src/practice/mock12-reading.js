// Smart LC Mock Test 12 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + people-matching), P3 argumentative
// (MCQ-4 + sentence endings + YNNG). Key quotas: TFNG ~40/40/20 with no
// runs of three, flat letters, unique concrete-noun answers.
export const MOCK12_READING = {
  id: "mock12-reading",
  bookId: "mock12",
  title: "Mock Test 12 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The invention of canned food",
      passage: `The armies of the eighteenth century lost far more soldiers to hunger and disease than to battle. Food for a campaign had to be carried, and the technology for carrying it had barely changed since Roman times: meat was salted or smoked, bread was baked into biscuit hard enough to survive for months, and everything else was expected to rot. Sailors suffered even more than soldiers, since a ship might still be at sea long after its fresh supplies were finished. It was France, with armies fighting across half of Europe, that finally decided to treat the problem as a matter of national urgency. In 1795 the French government announced a prize of twelve thousand francs for anyone who could invent a reliable way of preserving food for its navy and army.

The man who eventually claimed the money was neither a scientist nor a soldier. Nicolas Appert was a Parisian confectioner, a maker of sweets and preserved fruits, who had spent his whole working life in kitchens and understood the behaviour of food as a practical matter rather than a theoretical one. Beginning in the 1790s, he experimented for some fifteen years with a method of startling simplicity. Food of almost any kind — meat, vegetables, soup, even milk — was packed into wide-necked glass jars. The jars were then sealed with thick corks, held down with wire and strengthened with wax, and finally immersed for several hours in boiling water. Whatever Appert put through this process, he found, remained good to eat not merely for weeks but for years.

In 1810, after samples of his produce had spent months at sea with the French navy and come back in perfect condition, Appert was awarded the prize. One condition was attached to it: instead of patenting his invention, he was required to publish every detail, so that any manufacturer in France could copy the method. His book describing the process appeared that same year, and with the prize money he enlarged his workshop into what is usually considered the world's first commercial cannery — although, since everything was packed in glass, a "bottlery" might be the more accurate word.

What Appert could never do was explain his own success. He believed, wrongly, that shutting out air was the essential step, and he freely admitted that the true mechanism was a mystery to him. The explanation had to wait half a century, until Louis Pasteur demonstrated that the decay of food is caused by microbes — living organisms too small to see, which the heat of Appert's boiling water had been quietly destroying all along. Appert had, in effect, invented sterilisation fifty years before science could say what sterilisation was.

Meanwhile the idea crossed the Channel and changed its container. In 1810 a British merchant named Peter Durand received a patent covering the same principle of heat-treated, sealed food, but he proposed a different vessel: a canister of iron coated with a thin layer of tin, which resisted rust and, unlike glass, could not shatter on a wagon or in a ship's hold. Durand was a man for patents rather than production. He sold his rights to two engineers, Bryan Donkin and John Hall, who by 1813 had a factory in London turning out tinned food. Their first important customer was the Royal Navy, which fed canned meat and vegetables to sailors on long blockade duty and, before long, to the crews of polar expeditions, whose ships might be trapped in the ice for two winters at a time.

The can, however, was still some distance from the convenient object we know today. Early cans were cut and soldered by hand from heavy iron plate, at a rate of only a few dozen a day, and their walls were so thick that a full can sometimes weighed more than the food inside it. Nor was there any elegant way of getting in. The printed instructions on some early cans advised the customer to cut around the top with a hammer and chisel — advice easier to follow in an army camp than in a kitchen. The can opener, the missing half of the invention, appeared only in the 1850s, when thinner steel cans made it possible for a simple hand tool to pierce the lid. It had taken nearly half a century for opening a can to become easier than making one.

Once those pieces were in place, canned food stopped being military equipment and became ordinary groceries. Machines replaced hand-soldering, output rose from dozens of cans a day to thousands an hour, and prices fell steadily. For city families with no garden and no cellar, cans put vegetables on the table in the middle of winter; for emigrants and settlers, they made it possible to live for months beyond the reach of any market. The can changed the world's diet so quietly and so completely that its origins were largely forgotten: a sweet-maker's fifteen years of patience, a prize offered to feed an army, and a kitchen process that waited fifty years for anyone to understand why it worked.`,
      questions: [
        { n: 1, type: "gap", prompt: "The 1795 prize was for a way of preserving food for the French navy and ______.", note: "ONE WORD ONLY", answer: "army" },
        { n: 2, type: "gap", prompt: "Before his experiments, Appert had worked as a ______.", note: "ONE WORD ONLY", answer: "confectioner" },
        { n: 3, type: "gap", prompt: "Appert packed food into glass ______ with wide necks.", note: "ONE WORD ONLY", answer: "jars" },
        { n: 4, type: "gap", prompt: "The containers were sealed with wax, wire and thick ______.", note: "ONE WORD ONLY", answer: "corks" },
        { n: 5, type: "gap", prompt: "Pasteur later showed that food decay is caused by ______.", note: "ONE WORD ONLY", answer: "microbes" },
        { n: 6, type: "gap", prompt: "Durand's canister was made of iron with a coating of ______.", note: "ONE WORD ONLY", answer: "tin" },
        { n: 7, type: "gap", prompt: "Some early cans carried instructions to open them with a hammer and ______.", note: "ONE WORD ONLY", answer: "chisel" },
        { n: 8, type: "tfng", prompt: "Appert understood why his preserving method was successful.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Appert was obliged to make his process public.", answer: "TRUE" },
        { n: 10, type: "tfng", prompt: "Durand manufactured canned food at his own factory.", answer: "FALSE" },
        { n: 11, type: "tfng", prompt: "The Royal Navy was an early buyer of tinned food.", answer: "TRUE" },
        { n: 12, type: "tfng", prompt: "Appert's book was quickly translated into other languages.", answer: "NOT GIVEN" },
        { n: 13, type: "tfng", prompt: "An early can could weigh more than its contents.", answer: "TRUE" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Bringing back the bogs",
      passage: `A — Seen from a distance, a peat bog can look like the dullest landscape on Earth: flat, brown, treeless and wet. The ground itself, however, is one of nature's strangest materials. Peat forms only where the ground stays permanently waterlogged. In such places — above all in bogs built by sphagnum mosses — dead plants cannot rot away completely, because the standing water keeps the air out. Each year's growth is buried, half-decayed, beneath the next, and the compressed remains slowly thicken into peat at a rate of roughly one millimetre a year. A bog ten metres deep is therefore ten thousand years in the making, and its layers preserve a record of everything that ever fell into it: pollen, seeds, ancient tools, and occasionally the startlingly intact bodies of prehistoric people. Marta Nowak, a palaeoecologist who drills cores from bogs in central Europe, thinks that record is by itself reason enough to protect them. "Every centimetre of peat is a page of climate history, laid down in order and dated," she says. "Drain a bog and we are not merely losing carbon. We are burning the only library that records what the climate was doing before anybody thought to measure it."

B — What turns this soggy archive into a matter of global politics is carbon. Living plants draw carbon dioxide out of the atmosphere, and in a healthy bog the carbon in their tissues is never released again by decay; it is locked into the deepening peat instead. The quantities involved are out of all proportion to the area. Peatlands cover about three per cent of the world's land surface, yet they are estimated to hold twice as much carbon as all the world's forests put together. "Forests get the poems and the posters," says Freya Lindqvist, a carbon scientist at the Nordic Climate Institute, "but the largest carbon store on land is the one nobody visits. A bog is a bank vault; a forest is a busy till."

C — For centuries, however, the vault has been steadily emptied. Across Europe and Asia, ditches were dug through bogs to dry the surface for farmland, pasture and timber plantations, while the peat itself was cut and burned as fuel or bagged as compost for gardeners. The consequences only became clear recently. When the water level falls, oxygen enters the peat, and microbes at last finish the decay that water had postponed for thousands of years: the peat itself gradually vanishes into the sky as carbon dioxide, and the ground sinks year by year. Drained and damaged peatlands now produce roughly five per cent of all the carbon dioxide released by human activity, from less than half of one per cent of the land. Dry peat brings a second danger, because it burns: once alight, a peat fire can smoulder underground for months, defeating every attempt to put it out.

D — The repair, it turns out, is disarmingly simple: put the water back. Restoration teams block the old drainage ditches with thousands of small dams of peat, timber or plastic sheeting, so that rain gradually raises the water level to the surface again. Douglas Mair manages one of Europe's largest projects, on Strathcarn Moss in northern Scotland, where crews have built more than four thousand dams across eleven thousand hectares. "We told our volunteers they were working for their grandchildren, because bogs grow so slowly," he says. "Then the sphagnum moss was back within three summers. A damaged bog, it seems, is desperate to be wet again." Full recovery of the deep peat will still take decades, but measurements at Strathcarn show carbon losses falling sharply, and dragonflies and wading birds have already returned in numbers nobody predicted.

E — Rewetting collides with a hard fact: people farm drained peatlands, and flooding a field can look like abolishing a livelihood. One response is a new kind of agriculture, known as paludiculture, which grows crops that thrive on wet peat and so makes drainage unnecessary. Ines Okafor, an agronomist who runs trial farms on rewetted bogs in Germany, harvests sphagnum moss itself as a crop, selling it to plant nurseries as a growing material that replaces the peat once dug from the ground; her neighbouring plots grow bulrushes, whose fibres are pressed into insulation boards for the building trade. "Drainage was never the only way to make a living here," she argues. "The mistake was believing that a farm has to be dry."

F — The last argument for the bogs is financial. Henrik Voss, an environmental economist who advises three governments, points out that machines designed to filter carbon dioxide directly from the air currently cost hundreds of dollars for every tonne they capture, while blocking a ditch costs a few dollars per tonne of emissions prevented. "Rewetting is the cheapest carbon technology we have, and it was invented by moss," he says. "A restored bog also comes with birds, water storage and flood control at no extra charge, which no machine can offer." Payments for storing carbon are now beginning to flow into restoration schemes, and several countries have written peatland targets into their national climate plans. The bogs spent ten thousand years quietly taking carbon out of the air; the cheapest climate policy, it appears, is simply to let them get on with it.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a cost comparison between peatland restoration and a technological alternative", answer: "F" },
        { n: 15, type: "match", group: "minfo", prompt: "an explanation of the conditions in which peat is formed", answer: "A" },
        { n: 16, type: "match", group: "minfo", prompt: "examples of crops that can be grown on wet peatland", answer: "E" },
        { n: 17, type: "match", group: "minfo", prompt: "figures showing peatlands' contribution to global emissions", answer: "C" },
        { n: 18, type: "gap", group: "sum12", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Draining and rewetting",
            lines: [
              "Peat can only form where the ground remains {{18}}, because standing water stops dead plants from decaying fully.",
              "Once a bog is drained, {{19}} enters the peat and decay finally begins, releasing carbon dioxide; the dried-out surface can also catch {{20}} and burn underground for months.",
              "Restorers therefore block the old {{21}} with small dams so that the water level rises again,",
              "and within a few years {{22}} starts to grow back on the surface.",
            ],
          },
          answer: "waterlogged" },
        { n: 19, type: "gap", group: "sum12", answer: "oxygen" },
        { n: 20, type: "gap", group: "sum12", answer: "fire" },
        { n: 21, type: "gap", group: "sum12", answer: "ditches" },
        { n: 22, type: "gap", group: "sum12", answer: ["moss", "sphagnum"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Freya Lindqvist", "Douglas Mair", "Ines Okafor", "Henrik Voss", "Marta Nowak"],
          rubric: "Match each statement with the correct person, A–E.",
          prompt: "Restoring peatland is far cheaper than removing carbon from the air by machine.", answer: "D" },
        { n: 24, type: "match", group: "people", prompt: "Damaged bogs can begin to recover much faster than expected.", answer: "B" },
        { n: 25, type: "match", group: "people", prompt: "Peatlands store more carbon than ecosystems that receive far more public attention.", answer: "A" },
        { n: 26, type: "match", group: "people", prompt: "It is possible to farm peatland without drying it out.", answer: "C" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "What we get wrong about creativity",
      passage: `Few human abilities are more admired than creativity, and few are so thoroughly misunderstood. Ask people how new ideas happen and the answers arrive with remarkable confidence: creativity lives in the right side of the brain; it strikes in sudden flashes of inspiration; it flowers in lively group sessions; it is a gift some people simply have and others simply lack. Each of these beliefs feels like common knowledge. Each is contradicted by decades of research. The interesting question is not only why the folklore is wrong, but why it survives so comfortably in a culture that claims to prize evidence.

Consider first the geography of the brain. The idea of a logical left hemisphere and a creative right one grew out of mid-twentieth-century studies of patients whose two brain halves had been surgically separated, and it escaped the laboratory in wildly simplified form, spawning personality quizzes, training seminars and a whole vocabulary of "right-brained people". Modern imaging tells a different story. When volunteers compose music, invent stories or solve unusual problems inside a scanner, activity spreads across large networks in both hemispheres: regions associated with spontaneous, wandering thought work in tight cooperation with regions that evaluate, select and refine. Creative thinking, on this evidence, is not the property of one half of the brain but a conversation across the whole of it — and studies find no support for the claim that individuals are dominated by one side or the other.

The flash of inspiration has a similar career: vivid as a story, misleading as a description. Cultural memory is stocked with discoveries made in a bath, under an apple tree or in a dream, and the tales are not entirely false — sudden insights genuinely occur. What the stories omit is everything that came first. When researchers examine the notebooks of inventors and composers, the celebrated flash almost always sits on top of years of accumulated sketches, failed drafts and abandoned versions. Laboratory work on incubation — the helpful effect of setting a problem aside — finds that it works only on minds already saturated with the problem. The insight is real, but it is the last visible step of a long invisible climb, and the famous anecdotes were usually polished in the retelling, not infrequently by the discoverers themselves.

The group brainstorming session, that fixture of modern office life, was invented by an advertising executive in the 1950s, complete with rules that are still recited today: produce quantity, withhold criticism, welcome wild ideas. It is one of the most tested procedures in social psychology, and the results are awkward. Study after study finds that the same number of people working separately, with their ideas pooled afterwards, produce more ideas — and more original ones — than they do talking around a table. The reasons are mundane: only one person can speak at a time, so thoughts wither in the queue; people trim their stranger suggestions for fear of judgement, whatever the rules promise; and a room full of colleagues makes it easy to coast on the efforts of others. Groups are not useless — they are demonstrably better than individuals at combining, testing and improving ideas that already exist. The evidence says: generate alone, refine together. Most organisations do the opposite.

What of the belief that creativity is a fixed endowment, present in artists and absent in accountants? Here the research is unusually cheerful. Programmes that train people in specific habits — reframing a problem before solving it, hunting for analogies in distant fields, deliberately generating many options before choosing — produce measurable gains in creative performance, in schoolchildren and engineers alike. The gains are largest not for some mystical general creativity but within particular domains, which is precisely how expertise behaves. Creativity, in other words, looks much less like a personality trait than like a skill: unevenly distributed, certainly, but responsive to practice at every level.

The darkest piece of folklore — the mad genius, whose brilliance is fed by suffering — rests almost entirely on a small gallery of memorable cases, endlessly retold. Large studies that follow tens of thousands of people find, at most, weak and inconsistent links between mental illness and creative achievement, and none at all for most disorders. We remember the tormented painter because the story is unforgettable, and forget the thousands of productive, contented artists who make poor material for legend.

Why, then, do the myths persist? Partly because they are simple, and partly because they flatter or excuse us. The flash of inspiration relieves us of the grind of preparation; the right-brain story converts a skill we could practise into a category we can claim; the fixed gift lets the rest of us off the hook entirely. The evidence offers something less romantic and more hopeful: creativity as a form of expertise — effortful, trainable and far more widely available than the folklore admits. What we call inspiration, one researcher has observed, is usually preparation wearing a mask.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What does the writer say about the idea that creativity is located in the right brain?", options: ["A It was confirmed by early studies of split-brain patients", "B It is accurate only for artists and musicians", "C It is not supported by modern studies of brain activity", "D It was invented by the authors of personality quizzes"], answer: "C" },
        { n: 28, type: "mcq", prompt: "According to the writer, moments of sudden insight", options: ["A generally depend on long periods of earlier work", "B occur only during sleep or bathing", "C are more common in science than in music", "D show that conscious effort can be skipped"], answer: "A" },
        { n: 29, type: "mcq", prompt: "Studies of brainstorming show that", options: ["A criticising ideas early makes sessions more productive", "B advertising agencies no longer use the technique", "C the rules of brainstorming are usually ignored", "D individuals working separately produce more ideas than groups"], answer: "D" },
        { n: 30, type: "mcq", prompt: "Which of the following best summarises the writer's conclusion?", options: ["A Inspiration cannot be studied scientifically", "B Creativity is best treated as a learnable skill", "C The myths about creativity should be taught in schools", "D Only collaboration produces original ideas"], answer: "B" },
        { n: 31, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "is supported by recent studies of famous painters.",
            "usually hides years of preparation behind it.",
            "has been shown to raise measured creative performance.",
            "often produces fewer ideas than the same number of people working alone.",
            "is contradicted by modern brain imaging.",
            "rests on a small number of memorable cases.",
            "was abandoned by the advertising industry.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The belief that creativity lives in one side of the brain", answer: "E" },
        { n: 32, type: "match", group: "ends", prompt: "A famous story of sudden inspiration", answer: "B" },
        { n: 33, type: "match", group: "ends", prompt: "A group brainstorming session", answer: "D" },
        { n: 34, type: "match", group: "ends", prompt: "Training in creative thinking", answer: "C" },
        { n: 35, type: "match", group: "ends", prompt: "The idea of the mad genius", answer: "F" },
        { n: 36, type: "ynng", prompt: "Creative thinking depends mainly on one hemisphere of the brain.", answer: "NO" },
        { n: 37, type: "ynng", prompt: "Preparation contributes more to creative breakthroughs than sudden inspiration does.", answer: "YES" },
        { n: 38, type: "ynng", prompt: "Schools should give more lesson time to creativity training.", answer: "NOT GIVEN" },
        { n: 39, type: "ynng", prompt: "Working in groups has no value at any stage of the creative process.", answer: "NO" },
        { n: 40, type: "ynng", prompt: "The myths about creativity survive partly because people find them appealing.", answer: "YES" },
      ],
    },
  ],
};
