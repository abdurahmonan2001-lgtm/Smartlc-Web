// Smart LC Practice Set 14 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET14_READING = {
  id: "pset14-reading",
  bookId: "pset14",
  title: "Practice Set 14 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The button",
      passage: `For an object that costs almost nothing and is thrown away without a thought, the button has an unusually long history, and a slow one. It is worth starting with a distinction that most people never make: a button on its own fastens nothing. What fastens a garment is a button together with a buttonhole, and the two halves of that partnership were invented some four thousand years apart. The earliest known buttons were jewellery. Archaeologists working at sites of the Indus Valley civilisation have recovered small discs of curved seashell, pierced with a pair of holes and carefully polished, that are roughly five thousand years old. They were sewn onto cloth, and there they sat, doing no work at all beyond catching the light. Nothing in the surviving garments of that world suggests that anybody had yet thought of cutting a hole for them.

The classical world was equally content to leave its clothing loose. Greek and Roman dress was draped rather than cut to shape, and where it needed holding it was held by a pin or a brooch, sometimes by a belt or a length of cord. Buttons of bone and bronze do turn up on Roman sites, but they worked with cord loops rather than with slits cut in the fabric, and the arrangement was clumsy: a loop stretches, slips and wears through. For century after century the button remained what it had begun as, an ornament that was occasionally useful.

The buttonhole changed everything. It appears in Europe in the thirteenth century, probably carried home from the eastern Mediterranean by soldiers and merchants, and its arrival coincided with a revolution in tailoring. Until then, garments had been cut wide and pulled over the head. Now cutters learned to shape cloth to the body, and a narrow sleeve or a fitted jacket cannot be pulled on at all unless it opens somewhere and closes again afterwards. A row of buttons and buttonholes allowed clothing to be sewn tight to the wearer and still be taken off at night. Within two generations, fashionable European dress had sprouted buttons from wrist to elbow and from collar to waist, in numbers that had nothing to do with holding anything shut.

Being everywhere, buttons became a way of displaying wealth. The rich wore them in silver, gold, ivory and enamel, and a single coat might carry two or three hundred of them. Several governments responded with sumptuary laws, which set out the metal each rank was permitted and the number that might be worn with it. Making buttons was a skilled trade, and the makers organised themselves into guilds that defended their work fiercely. When cheap cloth-covered buttons began arriving from abroad in the seventeenth century, the French guilds persuaded the crown to forbid them, and inspectors were sent through the streets with the power to fine anyone whose coat was fastened with the illegal kind.

Machinery quietly ended all that. In eighteenth-century Birmingham the manufacturer Matthew Boulton turned water-powered stamping machinery on to buttons of gilt metal and polished steel, producing in a day what a workshop had once produced in a week; the price fell steadily, and went on falling for a century and a half. In 1825 the Danish inventor Bertel Sanders, then living in England, patented a button made in two metal halves that clamped a disc of cloth between them, so that any fabric could be given buttons to match it. Fifteen years later Richard Prosser found a way of pressing damp clay into shape and firing it, which gave the century its hard white shirt button. Other buttons were cut from ocean shell, from horn and hoof, and from the ivory-like nut of a South American palm.

The twentieth century handed the work to chemistry. Buttons were moulded first from casein, an early plastic made from milk, then from cellulose, and finally from the synthetic resins that arrived after the Second World War. Injection moulding, in which melted plastic is forced into a metal mould, delivers a finished button in a few seconds and in any colour a designer can name. A shirt button today costs a fraction of a penny, which is one reason nobody thinks about it, and why an object that once announced a man's rank now announces nothing whatever.

Two curiosities have outlived all this change. The first is that men's shirts fasten with the buttons on the right and women's with the buttons on the left, a division at least four hundred years old for which no documented explanation survives. The favourite theory is that wealthy women were dressed by servants who stood facing them, so that a mirror-image arrangement suited the servant's hands; it is a good story, but the evidence for it is thin. The second curiosity is the button's survival. The zip, patented in the 1890s and made reliable in 1913, was widely expected to sweep it away. Instead the zip took the trousers, the bag and the boot, and left the shirt and the coat alone. The button endures partly because it fails gracefully: a broken zip is usually the end of a garment, while a button that comes off costs a minute with a needle and thread.`,
      questions: [
        { n: 1, type: "gap", prompt: "The oldest buttons found so far are polished discs of curved ______.", note: "ONE WORD ONLY", answer: "seashell",
          explain: "The Indus Valley finds are described as 'small discs of curved seashell', pierced with two holes and polished. The question keeps 'discs of curved' and asks for the material.",
          evidence: "small discs of curved seashell",
          vocab: ["earliest known", "oldest"] },
        { n: 2, type: "gap", prompt: "Roman buttons were fastened using cord ______ instead of openings cut in the cloth.", note: "ONE WORD ONLY", answer: "loops",
          explain: "Roman buttons 'worked with cord loops rather than with slits cut in the fabric'. The question paraphrases 'slits cut in the fabric' as 'openings cut in the cloth', leaving 'loops' as the answer.",
          evidence: "they worked with cord loops rather than with slits cut in the fabric",
          vocab: ["slits cut in the fabric", "openings cut in the cloth"] },
        { n: 3, type: "gap", prompt: "The buttonhole arrived in Europe at the same time as a great change in ______.", note: "ONE WORD ONLY", answer: "tailoring",
          explain: "Its arrival 'coincided with a revolution in tailoring' — cutters began shaping cloth to the body. 'Coincided with' becomes 'at the same time as' and 'revolution' becomes 'great change'.",
          evidence: "coincided with a revolution in tailoring",
          vocab: ["a revolution", "a great change"] },
        { n: 4, type: "gap", prompt: "Sumptuary laws stated which ______ each social rank could wear, and how many buttons.", note: "ONE WORD ONLY", answer: "metal",
          explain: "The laws 'set out the metal each rank was permitted and the number that might be worn with it'. 'Set out' is paraphrased as 'stated' and 'permitted' as 'could wear'.",
          evidence: "which set out the metal each rank was permitted",
          vocab: ["permitted", "could wear"] },
        { n: 5, type: "gap", prompt: "In Birmingham, Boulton used stamping machinery driven by ______ to make metal buttons.", note: "ONE WORD ONLY", answer: "water",
          explain: "Boulton 'turned water-powered stamping machinery on to buttons of gilt metal and polished steel'. 'Water-powered' becomes 'driven by water' in the question.",
          evidence: "turned water-powered stamping machinery on to buttons",
          vocab: ["water-powered", "driven by water"] },
        { n: 6, type: "gap", prompt: "Prosser's method was to press damp ______ into shape and then bake it.", note: "ONE WORD ONLY", answer: "clay",
          explain: "Prosser found a way of 'pressing damp clay into shape and firing it', which produced the hard white shirt button. 'Firing' is paraphrased as 'baking'.",
          evidence: "pressing damp clay into shape and firing it",
          vocab: ["firing", "baking"] },
        { n: 7, type: "tfng", prompt: "A button cannot hold a garment closed unless it has a buttonhole to work with.", answer: "TRUE",
          explain: "TRUE: the writer states plainly that 'a button on its own fastens nothing' and that fastening requires a button together with a buttonhole.",
          evidence: "a button on its own fastens nothing",
          vocab: ["fastens nothing", "cannot hold a garment closed"] },
        { n: 8, type: "tfng", prompt: "Buttons were unknown in the Roman world.", answer: "FALSE",
          explain: "FALSE: the passage says buttons of bone and bronze 'do turn up on Roman sites' — they existed but worked awkwardly with cord loops. That contradicts 'unknown'.",
          evidence: "Buttons of bone and bronze do turn up on Roman sites" },
        { n: 9, type: "tfng", prompt: "Fitted garments cost more to make than loose ones.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage explains that fitted garments must open and close, but it never compares the cost of making fitted and loose clothing. Prices are discussed only for buttons themselves.",
          evidence: "a narrow sleeve or a fitted jacket cannot be pulled on at all unless it opens" },
        { n: 10, type: "tfng", prompt: "French button-makers succeeded in having imported cloth buttons banned.", answer: "TRUE",
          explain: "TRUE: the guilds 'persuaded the crown to forbid them', and inspectors could fine anyone wearing the illegal kind. 'Forbid' is the passage's word for 'ban'.",
          evidence: "the French guilds persuaded the crown to forbid them",
          vocab: ["forbid", "banned"] },
        { n: 11, type: "tfng", prompt: "Boulton's machinery made buttons more expensive to buy.", answer: "FALSE",
          explain: "FALSE: after the machinery arrived 'the price fell steadily, and went on falling for a century and a half' — the opposite of becoming more expensive.",
          evidence: "the price fell steadily, and went on falling for a century and a half" },
        { n: 12, type: "tfng", prompt: "One early plastic used for buttons was obtained from milk.", answer: "TRUE",
          explain: "TRUE: buttons were moulded first from casein, described as 'an early plastic made from milk'. 'Made from' is paraphrased as 'obtained from'.",
          evidence: "casein, an early plastic made from milk",
          vocab: ["made from milk", "obtained from milk"] },
        { n: 13, type: "tfng", prompt: "Zips break more often than buttons come off.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the writer contrasts the consequences of the two failures — a broken zip ends a garment, a lost button costs a minute of sewing — but never says which happens more often.",
          evidence: "a broken zip is usually the end of a garment" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Food that misses the bin",
      passage: `A — Roughly a third of all the food the world grows is never eaten. In poorer countries most of that loss happens early, between the field and the market, for want of storage and transport; in wealthy ones it happens at the end of the chain, in shops, in restaurants and above all in kitchens at home. Yet much of what is thrown away in a rich city is not spoiled at all. It is surplus: bread baked in greater quantity than was sold, vegetables rejected for the shape they grew in, chilled meals a day away from their date. The past two decades have seen a serious effort to catch this food before it reaches the bin and pass it to people who would be glad of it.

B — The machinery of redistribution has grown quickly and taken several forms. Charities collect unsold stock from the back doors of supermarkets; telephone applications sell restaurant meals cheaply in the last hour of trading, without saying in advance what the customer will get; social supermarkets offer surplus at a fraction of the usual price to households on low incomes; community fridges stand in libraries and stations, open to anyone. Governments have joined in. France obliged its large supermarkets, from 2016, to sign donation agreements instead of destroying edible stock, while several other countries have encouraged the same behaviour through tax relief.

C — The obstacle is not goodwill but logistics, as the transport researcher Ingrid Halvorsen has spent a decade demonstrating. Surplus food, she points out, behaves in exactly the way that makes distribution expensive. It appears without warning, in small quantities, at thousands of separate shops; much of it must travel in refrigerated vans; and it must be eaten within a day or two of collection. Her modelling of collection routes in four cities found that the greater part of the cost lies in the final mile — the stopping, waiting, loading and paperwork at each door — rather than in moving food across the city. Her recommendation is unromantic: a single depot where the day's collections can be sorted, chilled and sent out again in full loads, instead of a hundred volunteers driving half-empty cars to a hundred kitchens.

D — A second obstacle is printed on the packet. The data analyst Samuel Adeyemi has spent years arguing that two very different labels are being read as one. A use-by date is a safety instruction, and food should not be eaten after it; a best-before date is a manufacturer's opinion about flavour and texture, and food is usually perfectly good beyond it. Adeyemi's surveys found that most shoppers treat the two as identical, and that staff in small shops often do the same. When one chain took best-before dates off its fresh fruit and vegetables, his analysis of its records showed a measurable fall in the quantity thrown away, both in the stores and, according to follow-up interviews, in customers' homes.

E — What is available is not always what is needed. Ritu Chandra, who studies nutrition in low-income households, has weighed and analysed the contents of several thousand food parcels assembled from donated surplus. Bread, pastry, breakfast cereal and sugary drinks were abundant; fresh vegetables, fruit and protein were scarce, because those are precisely the foods that shops order carefully and sell out of. A diet built from what happens to be left over, she warns, can fill a family without feeding it. Chandra is also interested in choice. Households given a parcel eat what they are handed, whereas the same households, allowed to select their own items in a social supermarket, put together a noticeably better diet for themselves.

F — The sharpest objection is not practical at all. The sociologist Klaus Brenner argues that redistribution has become a comfortable arrangement for everyone except the hungry. A retailer that gives its surplus away avoids the cost of disposing of it, gains a tax deduction and earns a photograph in the local paper, while nothing whatever changes in the ordering system that produced the surplus in the first place. Worse, Brenner says, a permanent charitable food supply allows governments to treat hunger as a distribution problem rather than a question of income. He reserves particular scorn for the movement's favourite public figure, the number of meals redistributed: a rising total records a growing surplus and a growing need, and yet it is reported everywhere as an achievement.

G — Where does that leave the people doing the work? Mei Tanaka, who runs a neighbourhood kitchen and advises others starting one, accepts most of Brenner's criticism and answers it with an order of priority. Prevention comes first: better forecasting, smaller orders and automatic discounts on the shelf stop far more waste than any charity can move. What cannot be prevented should feed people, then animals, and only then the compost heap. Within that order there is a great deal to be done well or badly. Tanaka's kitchens cook surplus into meals rather than handing over ingredients, because a bag of unfamiliar vegetables often goes home and rots there; they publish what they receive, so that donors cannot quietly send them rubbish; and they pay two staff, having learned that a service run entirely by volunteers collapses in the month when the volunteers are ill.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a finding about which stage of the journey costs the most", answer: "C",
          explain: "Paragraph C reports Halvorsen's modelling: most of the cost sits in the final mile — the stopping, waiting and loading at each door — not in crossing the city.",
          evidence: "the greater part of the cost lies in the final mile",
          vocab: ["the greater part of the cost", "costs the most"] },
        { n: 15, type: "match", group: "info", prompt: "an estimate of how much of the world's food is never consumed", answer: "A",
          explain: "Paragraph A opens with the global figure: roughly a third of all food grown is never eaten. 'Never eaten' is the passage's wording for 'never consumed'.",
          evidence: "Roughly a third of all the food the world grows is never eaten",
          vocab: ["never eaten", "never consumed"] },
        { n: 16, type: "match", group: "info", prompt: "a warning that a popular measure of success is misleading", answer: "F",
          explain: "Paragraph F attacks 'the movement's favourite public figure, the number of meals redistributed', because a rising total actually records growing surplus and need yet is reported as an achievement.",
          evidence: "a rising total records a growing surplus and a growing need",
          vocab: ["favourite public figure", "popular measure"] },
        { n: 17, type: "match", group: "info", prompt: "an explanation of the difference between two kinds of date on food packaging", answer: "D",
          explain: "Paragraph D distinguishes the use-by date, a safety instruction, from the best-before date, an opinion about flavour and texture — exactly the two labels the question asks about.",
          evidence: "A use-by date is a safety instruction",
          vocab: ["two very different labels", "two kinds of date"] },
        { n: 18, type: "match", group: "info", prompt: "a ranking of the ways surplus food should be dealt with", answer: "G",
          explain: "Paragraph G sets out Tanaka's 'order of priority': prevention first, then feeding people, then animals, and only then composting — a ranking of responses to surplus.",
          evidence: "What cannot be prevented should feed people, then animals, and only then the compost heap",
          vocab: ["an order of priority", "a ranking"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why moving surplus food is expensive",
            lines: [
              "Surplus food is difficult to collect because it appears without warning, in small amounts, at thousands of separate {{19}}, and because it has to be used almost immediately.",
              "A large share of it also has to be carried in {{20}} vans, which adds to the expense.",
              "Halvorsen's study of four cities showed that most of the cost falls in the last {{21}} of the journey, where vehicles stop, wait, load and complete paperwork.",
              "She therefore recommends collecting everything at one {{22}}, where the day's food can be sorted and chilled before it is sent out again in full loads.",
            ],
          },
          answer: "shops",
          explain: "Halvorsen says surplus 'appears without warning, in small quantities, at thousands of separate shops'. The summary paraphrases 'quantities' as 'amounts', keeping 'shops' as the answer.",
          evidence: "at thousands of separate shops",
          vocab: ["small quantities", "small amounts"] },
        { n: 20, type: "gap", group: "sum2", answer: "refrigerated",
          explain: "The passage states that much of the food 'must travel in refrigerated vans'. The summary keeps the noun 'vans' and removes the adjective, so the gap needs an adjective, not a noun.",
          evidence: "much of it must travel in refrigerated vans",
          vocab: ["travel in", "carried in"] },
        { n: 21, type: "gap", group: "sum2", answer: "mile",
          explain: "The greater part of the cost lies 'in the final mile' — the stopping, waiting, loading and paperwork at each door, which the summary repeats in the same order.",
          evidence: "the final mile",
          vocab: ["final", "last"] },
        { n: 22, type: "gap", group: "sum2", answer: "depot",
          explain: "Her recommendation is 'a single depot' where the day's collections can be sorted, chilled and sent out in full loads. 'A single' becomes 'one' in the summary.",
          evidence: "a single depot where the day's collections can be sorted",
          vocab: ["a single", "one"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Ingrid Halvorsen",
            "Samuel Adeyemi",
            "Ritu Chandra",
            "Klaus Brenner",
            "Mei Tanaka",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Donated food tends to be short of exactly the items people most need.", answer: "C",
          explain: "Chandra weighed thousands of parcels and found bread, pastry and sugary drinks abundant but fresh vegetables, fruit and protein scarce — the foods shops order carefully and sell out of.",
          evidence: "fresh vegetables, fruit and protein were scarce",
          vocab: ["were scarce", "short of"] },
        { n: 24, type: "match", group: "people", prompt: "Giving away surplus lets a company benefit while its habits remain unchanged.", answer: "D",
          explain: "Brenner's complaint is that a donating retailer saves disposal costs, gains a tax deduction and good publicity 'while nothing whatever changes in the ordering system that produced the surplus'.",
          evidence: "while nothing whatever changes in the ordering system that produced the surplus",
          vocab: ["nothing whatever changes", "remain unchanged"] },
        { n: 25, type: "match", group: "people", prompt: "Two types of label are widely misunderstood as meaning the same thing.", answer: "B",
          explain: "Adeyemi's surveys found that most shoppers, and often shop staff too, 'treat the two as identical' although use-by and best-before dates do quite different jobs.",
          evidence: "most shoppers treat the two as identical",
          vocab: ["treat the two as identical", "meaning the same thing"] },
        { n: 26, type: "match", group: "people", prompt: "Stopping surplus from arising saves more than redistributing it ever can.", answer: "E",
          explain: "Tanaka puts prevention first: forecasting, smaller orders and shelf discounts 'stop far more waste than any charity can move'.",
          evidence: "stop far more waste than any charity can move",
          vocab: ["prevention comes first", "stopping surplus from arising"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Reading other people",
      passage: `We do it hundreds of times a day and almost never notice. A colleague says the meeting went fine, and from a half-second of delay we conclude that it did not. Psychologists call this capacity a theory of mind: the ability to treat other people as bearers of beliefs, intentions and feelings that are not our own and cannot be observed. It develops in early childhood, it is unevenly distributed, and it is the machinery on which every kind of cooperation rests. It is also, this article will argue, considerably less accurate than the people using it believe, and the remedies most often recommended for improving it rest on evidence that is thinner than their popularity suggests.

Part of the confusion comes from the word empathy, which is used for two abilities that come apart. Cognitive empathy is the work of inference: reconstructing what another person knows, wants or intends. Affective empathy is the sharing of feeling: distress at another's distress. The two are separable in ordinary people and dramatically so in unusual ones — the skilled manipulator has the first without the second, and many kind, easily moved people have the second without much of the first. The best known laboratory measure, the Reading the Mind in the Eyes test, asks participants to choose which of four words describes the mental state of a person shown in a narrow strip of photograph containing only the eyes. It is a genuine test of something; it is not, however, a test of what its name implies. Performance depends heavily on vocabulary, the photographs are posed, and scores predict rather little about how accurately the same participants read a live conversation.

When accuracy in live conversation is measured directly, the results are humbling. In the standard design, two people talk while being recorded; afterwards each watches the tape and reports what they were actually thinking at intervals, while the partner guesses. Hit rates are modest, typically well under half, and the interesting number is not the accuracy but the confidence, which is consistently much higher. Long acquaintance does not close the gap. Couples married for decades read each other little better than strangers do, while believing that they read each other almost perfectly, and it is the belief rather than the skill that grows with the years.

Into this uncomfortable picture came an appealing remedy. In 2013 a pair of experiments reported that volunteers who had just read a passage of literary fiction went on to score higher on the Eyes test than volunteers who had read popular fiction or non-fiction. The finding travelled around the world in a week. What travelled less well was the sequel. Direct replications with far larger samples found no such effect, and later analyses concluded that the original result had been small, fragile and probably a product of chance variation between small groups. A weaker claim does survive: people who have read a great deal of fiction over a lifetime tend to score better on social-inference tasks. But a correlation of that kind is exactly what one would expect if the causal arrow ran the other way, with people who are interested in other minds choosing to spend their evenings with novels.

The reason the story was so readily believed is that its mechanism is attractive. Reading a novel is the only situation in which a person has direct access to another mind's inner speech, unfiltered and at length; it looks like a simulator for social life, offering practice at inference with the answers supplied. There is nothing absurd in this. But an attractive mechanism is not a result, and demonstrating that fiction builds social skill would require what nobody has yet done: following readers for years, with reading assigned rather than chosen, and measuring their accuracy with real people rather than with photographs.

Meanwhile a separate line of work has quietly undermined the other standard piece of advice. Across roughly two dozen experiments, participants asked to put themselves in another's shoes before judging that person's preferences, feelings or opinions did no better than participants given no instruction at all, and in several studies they did slightly worse: imagination supplied a confident picture drawn largely from the imaginer. One intervention did improve accuracy, substantially and repeatedly, and it was not mental. It was asking the other person and listening to the answer. The skill we have been treating as a private act of insight turns out to be, in large part, a conversational one.

None of this makes fellow-feeling worthless, but it does explain why it makes such a poor guide to decisions of any size. Affective empathy works like a spotlight: intense, narrow and pointed by circumstance rather than by need. It shines on the individual whose face we can see, on the person nearest us, and on those most like ourselves, which is why a single identified victim reliably attracts more help than a statistical thousand. A policy built on that spotlight will be generous in the wrong places. What the evidence recommends instead is unglamorous and entirely learnable: assume less, ask more, and treat the answer as data rather than as a puzzle to be solved. Read novels, by all means, and for their own sake. To understand the person in front of you, put the book down and ask.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What does the writer say about the Reading the Mind in the Eyes test?", options: ["A It is the only reliable measure psychologists possess", "B It was designed for use with young children", "C It says little about how well people read real conversations", "D It has been shown to depend on the age of the participant"], answer: "C",
          explain: "The writer accepts it tests something real but adds that scores 'predict rather little about how accurately the same participants read a live conversation'. A and D are never claimed.",
          evidence: "scores predict rather little about how accurately the same participants read a live conversation",
          vocab: ["predict rather little", "says little about"] },
        { n: 28, type: "mcq", prompt: "Studies in which people guess a conversation partner's thoughts have found that", options: ["A accuracy improves steadily with practice", "B certainty is higher than performance justifies", "C partners agree about what was said but not about what was meant", "D people are more accurate about strangers than about friends"], answer: "B",
          explain: "Hit rates are modest while confidence is 'consistently much higher' — certainty outruns performance. D twists the passage, which says long-married couples do little better than strangers, not worse.",
          evidence: "the interesting number is not the accuracy but the confidence, which is consistently much higher",
          vocab: ["confidence", "certainty"] },
        { n: 29, type: "mcq", prompt: "What happened to the 2013 finding about reading literary fiction?", options: ["A Larger repeat experiments failed to reproduce it", "B It was withdrawn by the researchers themselves", "C It was found to apply only to experienced readers", "D It was confirmed but judged too small to matter"], answer: "A",
          explain: "'Direct replications with far larger samples found no such effect', and the original was judged fragile and probably chance. Nobody withdrew it and it was not confirmed, so B and D fail.",
          evidence: "Direct replications with far larger samples found no such effect",
          vocab: ["direct replications", "repeat experiments"] },
        { n: 30, type: "mcq", prompt: "The experiments on putting oneself in another's shoes suggest that", options: ["A the technique works best with people one knows well", "B accuracy depends on how much time is allowed", "C imagining another's position is the most dependable method", "D obtaining information directly beats trying to imagine it"], answer: "D",
          explain: "Instructed perspective-taking produced no gain and sometimes harm, while one intervention worked repeatedly: asking the person and listening. C echoes the passage's wording but states the opposite of its finding.",
          evidence: "It was asking the other person and listening to the answer",
          vocab: ["asking the other person", "obtaining information directly"] },
        { n: 31, type: "ynng", prompt: "Working out what someone is thinking is a different ability from sharing what they feel.", answer: "YES",
          explain: "YES: the writer separates cognitive empathy, 'the work of inference', from affective empathy, 'the sharing of feeling', and says the two come apart in ordinary people.",
          evidence: "The two are separable in ordinary people",
          vocab: ["are separable", "a different ability"] },
        { n: 32, type: "ynng", prompt: "Reading fiction has been shown to make people better at understanding others.", answer: "NO",
          explain: "NO: the writer reports that larger replications found no effect and that the surviving correlation may run the other way — so the causal claim has not been shown.",
          evidence: "the original result had been small, fragile and probably a product of chance variation",
          vocab: ["found no such effect", "has been shown"] },
        { n: 33, type: "ynng", prompt: "Novelists intend their books to train readers' social judgement.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage discusses what reading novels may or may not do to readers, but never mentions what novelists intend. Do not read the simulator argument as a statement about authors.",
          evidence: "it looks like a simulator for social life" },
        { n: 34, type: "ynng", prompt: "Emotional fellow-feeling is a poor foundation for decisions affecting many people.", answer: "YES",
          explain: "YES: affective empathy is called a spotlight, pointed 'by circumstance rather than by need', and the writer concludes that a policy built on it 'will be generous in the wrong places'.",
          evidence: "A policy built on that spotlight will be generous in the wrong places",
          vocab: ["a policy", "decisions affecting many people"] },
        { n: 35, type: "ynng", prompt: "The idea that novels act as practice for social life is far-fetched.", answer: "NO",
          explain: "NO: the writer explicitly says 'There is nothing absurd in this' about the simulator idea. The objection is that the mechanism is untested, not that it is far-fetched.",
          evidence: "There is nothing absurd in this",
          vocab: ["nothing absurd", "far-fetched"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "may simply show that people interested in other minds choose to read novels.",
            "works better than any attempt to imagine another person's position.",
            "proves that reading has no effect whatever on its readers.",
            "asks people to judge a mental state from a photograph of the eyes alone.",
            "left the original claim without solid support.",
            "is strongest towards those who are close by and similar to us.",
            "shows that strangers judge each other better than married couples do.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The Reading the Mind in the Eyes test", answer: "D",
          explain: "The test shows 'a narrow strip of photograph containing only the eyes' and asks which of four words describes the person's mental state — ending D, with 'strip of photograph' paraphrased as 'photograph of the eyes alone'.",
          evidence: "a narrow strip of photograph containing only the eyes",
          vocab: ["a narrow strip of photograph", "a photograph of the eyes alone"] },
        { n: 37, type: "match", group: "ends", prompt: "The link between a lifetime of reading fiction and social skill", answer: "A",
          explain: "The writer says such a correlation is what you would expect 'if the causal arrow ran the other way' — people interested in other minds choose novels. Ending A states that alternative.",
          evidence: "people who are interested in other minds choosing to spend their evenings with novels",
          vocab: ["the causal arrow ran the other way", "may simply show"] },
        { n: 38, type: "match", group: "ends", prompt: "The outcome of the later, larger experiments", answer: "E",
          explain: "The replications found no effect and the original was judged small and fragile, so the claim was left unsupported — ending E. Ending C overstates this into 'no effect whatever'.",
          evidence: "later analyses concluded that the original result had been small, fragile",
          vocab: ["small, fragile", "without solid support"] },
        { n: 39, type: "match", group: "ends", prompt: "Asking a person directly what they think", answer: "B",
          explain: "Imagined perspective-taking gave no gain, while asking and listening improved accuracy 'substantially and repeatedly' — ending B compares the two exactly as the passage does.",
          evidence: "One intervention did improve accuracy, substantially and repeatedly",
          vocab: ["put themselves in another's shoes", "imagine another person's position"] },
        { n: 40, type: "match", group: "ends", prompt: "The pull of shared feeling", answer: "F",
          explain: "The spotlight of affective empathy 'shines on the individual whose face we can see, on the person nearest us, and on those most like ourselves' — ending F, close by and similar.",
          evidence: "on the person nearest us, and on those most like ourselves",
          vocab: ["nearest us", "close by"] },
      ],
    },
  ],
};
