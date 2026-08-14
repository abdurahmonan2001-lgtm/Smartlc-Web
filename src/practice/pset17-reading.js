// Smart LC Practice Set 17 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET17_READING = {
  id: "pset17-reading",
  bookId: "pset17",
  title: "Practice Set 17 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The screw",
      passage: `Of the simple machines described by the ancient world — the lever, the wedge, the pulley, the wheel and axle — the screw was the last to be understood and by far the slowest to become useful. It is really a wedge wrapped around a cylinder. The thread converts a small circular movement into a large force along the axis, and it does so gradually, which is why a screw can lift, squeeze or grip with a patience that no hammer can match. Greek writers credited the idea to Archimedes, who is said to have designed, in the third century BC, a wooden helix inside a tube that raised water when it was turned. Egyptian farmers may well have used something similar before him, and modern versions of the same device still drain fields and move grain today.

For nearly two thousand years, however, the screw was not a fastener at all. It was a press. Roman workshops used a great wooden screw, turned by two or three men on a bar, to squeeze oil from olives and juice from grapes, and the same mechanism was later borrowed by paper makers, by cloth finishers and, most consequentially of all, by printers: the machine that produced Europe's first printed books was in essence a converted wine press. What none of these uses demanded was precision. A press screw was carved from a single baulk of timber, its thread cut by eye, and it worked perfectly well with whatever nut had been shaped to fit that particular screw and no other.

The metal screw that holds things together appears much later, in the workshops of late medieval Europe. Armourers used small screws to attach plates; the first mechanical clocks depended on them; and by the sixteenth century a gunsmith could hardly work without them. Each one, though, was an individual. A craftsman forged a blank, sawed the slot in its head, and then shaped the thread by hand with a file, sometimes winding a strip of metal round the shank first as a guide for the eye. No two screws were alike, so no two were interchangeable: a screw and its nut were made as a married pair, and if one was lost the other became scrap. Screws were also costly enough to be worth taking out of a broken machine and saving.

The escape from this trap was mechanical. If a cutting tool could be advanced along a rotating bar at a fixed rate, the tool would trace a perfectly regular helix, and every screw cut that way would match every other. Machines of the kind were sketched in the sixteenth century, but the decisive version was built around 1800 by the English engineer Henry Maudslay, whose lathe carried the tool on a sliding rest driven by a long master thread. The screws it produced were accurate, repeatable and cheap, and they were used in turn to build better machines. Maudslay also trained a generation of engineers who carried the method into workshops across the country.

Accuracy, however, is not the same thing as agreement. Every good workshop could now make consistent screws, but each made them to its own shape, so a bolt from one factory still would not enter a nut from another. In 1841 Joseph Whitworth, who had worked for Maudslay, gathered screws from workshops all over Britain, measured them, and proposed a national standard: a single thread form, with a fixed angle of fifty-five degrees and a fixed number of turns per inch for every diameter. Britain adopted it. The United States, some twenty years later, adopted a rival standard with a flatter, sixty-degree thread that was easier to cut and to inspect. The two systems ran side by side for the best part of a century, and the mismatch was a genuine nuisance during the Second World War, when American and British machines could not always share spare parts.

The screw itself was still awkward to use. Until the middle of the nineteenth century its end was blunt, so a carpenter had to bore a hole before driving it home. The gimlet point, a screw ending in a sharp taper that could cut its own way into soft wood, was patented in the United States in the 1850s and turned the screw into an everyday joint rather than a specialist one. The head changed too. A single slot is easy to cut but hard to find with a driver and easy to slip out of, and in the 1930s a cross-shaped recess, promoted by the American businessman Henry Phillips, was taken up by car manufacturers, whose assembly lines needed a head that would guide the tool to the centre automatically.

The result of all this effort is an object so ordinary that it has become invisible. A modern car holds several thousand threaded fasteners; the lid of a jar, the cap of a bottle, the lens of a camera and the leg of a chair all depend on the same wrapped wedge. Its usefulness, it is worth remembering, owed far less to its invention, which is ancient, than to the much duller achievement of making every example of it identical.`,
      questions: [
        { n: 1, type: "gap", prompt: "The device attributed to Archimedes was a helix inside a tube that lifted ______ when it was rotated.", note: "ONE WORD ONLY", answer: "water",
          explain: "The passage describes 'a wooden helix inside a tube that raised water when it was turned'. The question paraphrases 'raised' as 'lifted' and 'turned' as 'rotated', leaving the noun unchanged.",
          evidence: "a wooden helix inside a tube that raised water when it was turned",
          vocab: ["raised", "lifted"] },
        { n: 2, type: "gap", prompt: "Roman workshops used a large wooden screw to press oil out of ______.", note: "ONE WORD ONLY", answer: "olives",
          explain: "The Roman press was used 'to squeeze oil from olives and juice from grapes'. Grapes are a trap: they give juice, not oil, so only the first noun fits the gap.",
          evidence: "to squeeze oil from olives and juice from grapes",
          vocab: ["squeeze", "press"] },
        { n: 3, type: "gap", prompt: "Before machines were used, the thread of each metal screw was shaped by hand with a ______.", note: "ONE WORD ONLY", answer: "file",
          explain: "The craftsman 'shaped the thread by hand with a file'. The wording of the question is nearly the passage's own, so the only decision is which noun follows 'with a'.",
          evidence: "shaped the thread by hand with a file" },
        { n: 4, type: "gap", prompt: "Maudslay's ______ moved the cutting tool on a sliding rest controlled by a master thread.", note: "ONE WORD ONLY", answer: "lathe",
          explain: "The decisive machine was Maudslay's lathe, 'whose lathe carried the tool on a sliding rest driven by a long master thread'. 'Driven by' becomes 'controlled by' in the question.",
          evidence: "whose lathe carried the tool on a sliding rest driven by a long master thread",
          vocab: ["driven by", "controlled by"] },
        { n: 5, type: "gap", prompt: "Whitworth's national standard fixed the ______ of the thread at fifty-five degrees.", note: "ONE WORD ONLY", answer: "angle",
          explain: "Whitworth proposed 'a fixed angle of fifty-five degrees' as part of a single thread form. The figure in the question locates the sentence; the missing word is the measurement it describes.",
          evidence: "with a fixed angle of fifty-five degrees" },
        { n: 6, type: "gap", prompt: "A screw with a gimlet ______ was able to make its own way into soft wood.", note: "ONE WORD ONLY", answer: "point",
          explain: "The gimlet point is 'a screw ending in a sharp taper that could cut its own way into soft wood'. 'Cut its own way' is echoed as 'make its own way' in the question.",
          evidence: "The gimlet point, a screw ending in a sharp taper that could cut its own way into soft wood",
          vocab: ["cut its own way", "make its own way"] },
        { n: 7, type: "tfng", prompt: "The screw was recognised as a simple machine later than the other simple machines were.", answer: "TRUE",
          explain: "TRUE: the opening sentence lists the simple machines and says the screw 'was the last to be understood'. Being last means later than all the others.",
          evidence: "the screw was the last to be understood",
          vocab: ["the last to be understood", "later than the other"] },
        { n: 8, type: "tfng", prompt: "Screws used in presses had to be made to accurate measurements.", answer: "FALSE",
          explain: "FALSE: the passage states plainly that 'What none of these uses demanded was precision' — the press screw was cut by eye and paired with a nut made to fit it.",
          evidence: "What none of these uses demanded was precision",
          vocab: ["precision", "accurate measurements"] },
        { n: 9, type: "tfng", prompt: "Medieval armourers preferred screws to other methods of joining metal plates.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: we are told armourers used small screws to attach plates, but no other joining method is mentioned and no preference is expressed. A stated use is not a stated preference.",
          evidence: "Armourers used small screws to attach plates" },
        { n: 10, type: "tfng", prompt: "A hand-made screw could normally be used only with the nut that had been made for it.", answer: "TRUE",
          explain: "TRUE: 'a screw and its nut were made as a married pair, and if one was lost the other became scrap' — exactly the situation the statement describes.",
          evidence: "a screw and its nut were made as a married pair",
          vocab: ["a married pair", "only with the nut that had been made for it"] },
        { n: 11, type: "tfng", prompt: "The American thread standard was introduced before Whitworth's.", answer: "FALSE",
          explain: "FALSE: Whitworth proposed his standard in 1841 and the United States adopted a rival standard 'some twenty years later'. The order in the statement is reversed.",
          evidence: "The United States, some twenty years later, adopted a rival standard" },
        { n: 12, type: "tfng", prompt: "The two rival thread standards were eventually replaced by a single international one.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage says the two systems ran side by side for about a century and caused wartime difficulties, but it never says what, if anything, replaced them.",
          evidence: "The two systems ran side by side for the best part of a century" },
        { n: 13, type: "tfng", prompt: "Car makers adopted the cross-shaped head because it helped position the tool correctly.", answer: "TRUE",
          explain: "TRUE: assembly lines 'needed a head that would guide the tool to the centre automatically' — guiding the tool to the centre is positioning it correctly.",
          evidence: "needed a head that would guide the tool to the centre automatically",
          vocab: ["guide the tool to the centre", "position the tool correctly"] },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Clothes that come round again",
      passage: `A — For most of human history a coat was too valuable to throw away. It was cut with generous seams so that it could be let out, handed down through a family, turned inside out when the outer face wore thin, and sold at last to a rag merchant, who shredded it for paper or for cheap re-spun cloth. Nothing was wasted because nothing was cheap. That economy weakened in the twentieth century and collapsed in the last thirty: world clothing production roughly doubled between 2000 and 2015, while the number of times a garment is worn before it is discarded fell by more than a third. Most countries have no plan for the result. In Europe and North America the great majority of unwanted clothing is burned or buried, and only a few per cent of it returns as new fabric.

B — Against that background, second-hand clothing has become unexpectedly fashionable. Resale platforms have turned the wardrobe into something closer to a portfolio, to be traded rather than emptied, and charity shops have redesigned themselves to look like boutiques. Most shoppers under thirty now buy used clothes at least once a year, and the resale market is growing several times faster than the sale of new clothes. Whether that growth displaces new production, or merely adds a second purchase to the first, nobody has yet shown.

C — What happens to a bag of clothes left at a charity shop is a good deal less romantic than donors imagine, as the economist Marta Kowalski has spent a decade documenting. The bag goes to a sorting warehouse, where it is opened by hand and graded item by item into dozens of categories. Only a modest share, well under a fifth, is good and fashionable enough for the charity's own shops. Most of the rest is compressed into bales weighing forty-five kilograms and sold by weight to dealers who ship them abroad. Kowalski's point is a financial one: the price those bales fetch has fallen as the quality of donations has fallen, and because many charities depend on that income, a shift in demand thousands of kilometres away can close shops at home.

D — The obvious alternative is to turn old cloth back into new cloth, and here the difficulty is technical rather than commercial, as the textile chemist Yusuf Demir explains. Nearly all textile recycling today is mechanical: the fabric is torn apart by machine so that it can be spun again, but the tearing leaves the fibres shorter than they were, so the recycled yarn is weak and can be used only in low-value products such as insulation for buildings. The greater obstacle is that modern garments are blends. Cotton spun together with polyester cannot be pulled apart by any machine, and a shirt that is ninety-five per cent cotton may still be unrecyclable because of the polyester thread it was sewn with. Chemical processes that dissolve cloth back to its raw components can handle mixed fabrics, but the plants that do it are few, small and expensive to run.

E — Even a perfect recycling system would be second best. Reusing a garment as clothing, the behavioural researcher Ingrid Halvorsen points out, avoids far more damage than recycling the same garment into fibre, because it replaces the manufacture of a whole new item rather than only its raw material. Her own work asks why people hesitate. In surveys, shoppers cite hygiene, uncertainty about size, and the time it takes to hunt; in her experiments, however, the strongest predictor of whether people buy second-hand is none of these. It is the shop itself: when used clothes are displayed, lit and priced like new ones, the stated objections evaporate, and buyers who call themselves squeamish buy anyway.

F — The export trade that keeps the whole system solvent is also its most criticised feature. The geographer Kwame Mensah has followed bales from European sorting sheds to the markets of West Africa, and his account is deliberately double-edged. The trade supports many traders, tailors and repairers and clothes people cheaply; but a substantial share of every bale is unsellable on arrival, and the receiving country pays to bury or burn what the exporter did not want. Cheap imports have also made it very hard for local mills and clothes-makers to compete. Mensah's conclusion is blunt: whatever else the export of used clothing may be, it should not be counted as recycling, and countries that report it that way are flattering themselves.

G — Where does that leave policy? With the producers, argues the designer Sofia Delgado. Several European governments now require clothing companies to pay a fee on every item they place on the market, to cover the cost of collecting and treating it later. Delgado's interest is in what such rules do upstream: when the fee falls as durability rises, a design office that never used to think about the end of a garment's life begins to think about seams, fibres and repairability at the sketch stage. She is careful not to overstate it: the fees are small, and no rule yet obliges anyone to make fewer clothes. But the direction is right, she says, and it points back to where this article began: to a time when a coat was a possession rather than a purchase.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a description of the ways clothing was kept in use before it was cheap", answer: "A",
          explain: "Paragraph A describes altering, handing down, turning inside out and finally selling a coat to a rag merchant, and explains that nothing was wasted because nothing was cheap.",
          evidence: "Nothing was wasted because nothing was cheap",
          vocab: ["nothing was cheap", "before it was cheap"] },
        { n: 15, type: "match", group: "info", prompt: "an explanation of why a charity's income depends on prices in other countries", answer: "C",
          explain: "Paragraph C says the price bales fetch abroad has fallen and that many charities depend on that income, so a change in distant demand can close shops at home.",
          evidence: "a shift in demand thousands of kilometres away can close shops at home",
          vocab: ["thousands of kilometres away", "in other countries"] },
        { n: 16, type: "match", group: "info", prompt: "the claim that sending clothes overseas should not be treated as a form of recycling", answer: "F",
          explain: "Paragraph F ends with Mensah's blunt conclusion that the export of used clothing 'should not be counted as recycling', and that countries reporting it so are flattering themselves.",
          evidence: "it should not be counted as recycling",
          vocab: ["counted as recycling", "treated as a form of recycling"] },
        { n: 17, type: "match", group: "info", prompt: "reference to a charge that manufacturers are legally required to pay", answer: "G",
          explain: "Paragraph G reports that several European governments now require clothing companies to pay a fee on every item they put on the market — a legal charge on manufacturers.",
          evidence: "require clothing companies to pay a fee on every item they place on the market",
          vocab: ["a fee", "a charge"] },
        { n: 18, type: "match", group: "info", prompt: "a finding about what most influences people's willingness to buy used clothes", answer: "E",
          explain: "Paragraph E reports Halvorsen's experimental finding that the strongest predictor is not hygiene, size or time but the appearance of the shop itself.",
          evidence: "the strongest predictor of whether people buy second-hand is none of these",
          vocab: ["strongest predictor", "what most influences"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — From the donation bag to the shredder",
            lines: [
              "Clothes left at a charity shop are opened and graded by hand. Less than a fifth is sold in the charity's own shops, and most of what remains is pressed into {{19}} of forty-five kilograms and sold by weight to dealers who send them overseas.",
              "Anything that cannot be worn again may be recycled mechanically. Tearing the fabric apart makes the {{20}} shorter, so the yarn produced is weak and is used only for low-value goods such as {{21}} for buildings.",
              "The hardest garments to deal with are {{22}}, in which cotton and polyester are spun together; only chemical methods, which remain rare and costly, can separate them.",
            ],
          },
          answer: "bales",
          explain: "Sorted clothing that the shops cannot sell is 'compressed into bales weighing forty-five kilograms and sold by weight to dealers who ship them abroad'. The summary turns 'compressed' into 'pressed'.",
          evidence: "compressed into bales weighing forty-five kilograms",
          vocab: ["compressed", "pressed"] },
        { n: 20, type: "gap", group: "sum2", answer: "fibres",
          explain: "Mechanical recycling 'leaves the fibres shorter than they were', which is why the yarn is weak. The summary paraphrases 'torn apart by machine' as 'tearing the fabric apart'.",
          evidence: "the tearing leaves the fibres shorter than they were",
          vocab: ["torn apart by machine", "tearing the fabric apart"] },
        { n: 21, type: "gap", group: "sum2", answer: "insulation",
          explain: "The weak recycled yarn 'can be used only in low-value products such as insulation for buildings' — the summary keeps 'low-value goods' and 'for buildings' around the gap.",
          evidence: "low-value products such as insulation for buildings" },
        { n: 22, type: "gap", group: "sum2", answer: "blends",
          explain: "Demir's greater obstacle is that 'modern garments are blends', with cotton and polyester spun together and impossible to separate mechanically. The word before the colon in the passage is the answer.",
          evidence: "The greater obstacle is that modern garments are blends" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Marta Kowalski",
            "Kwame Mensah",
            "Yusuf Demir",
            "Sofia Delgado",
            "Ingrid Halvorsen",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Wearing a garment again prevents more harm than turning it back into fibre.", answer: "E",
          explain: "Halvorsen argues that reuse 'avoids far more damage than recycling the same garment into fibre' because it replaces a whole new item, not merely its raw material.",
          evidence: "avoids far more damage than recycling the same garment into fibre",
          vocab: ["avoids far more damage", "prevents more harm"] },
        { n: 24, type: "match", group: "people", prompt: "Most donated clothing is sold abroad rather than in the country where it was given.", answer: "A",
          explain: "Kowalski's account of the sorting warehouse shows that under a fifth is sold in the charity's shops and most of the rest is baled and shipped to dealers abroad.",
          evidence: "sold by weight to dealers who ship them abroad",
          vocab: ["ship them abroad", "sold abroad"] },
        { n: 25, type: "match", group: "people", prompt: "Charges on producers are beginning to change the way clothes are designed.", answer: "D",
          explain: "Delgado's interest is in what the fees do upstream: a design office that ignored a garment's end of life 'begins to think about seams, fibres and repairability at the sketch stage'.",
          evidence: "begins to think about seams, fibres and repairability at the sketch stage",
          vocab: ["at the sketch stage", "the way clothes are designed"] },
        { n: 26, type: "match", group: "people", prompt: "Imported second-hand clothes make it difficult for local producers to survive.", answer: "B",
          explain: "Mensah reports that cheap imports 'have also made it very hard for local mills and clothes-makers to compete' in the markets he followed the bales to.",
          evidence: "made it very hard for local mills and clothes-makers to compete",
          vocab: ["compete", "survive"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Hiding in the group",
      passage: `In 1913 a French agricultural engineer published measurements whose subject was, on the face of it, farm machinery. Maximilien Ringelmann wanted to know how much useful work a team could be expected to do, so he attached a rope to a measuring device and asked men to pull on it, first alone and then together. A man pulling alone produced about sixty-three kilograms of force. Two men produced not one hundred and twenty-six kilograms but about one hundred and eighteen, an average of fifty-nine each. In a team of eight the average per man fell to thirty-one, less than half of what the same man had managed by himself. The team pulled more in total, but every additional member made every member less productive. The result appeared in an agricultural bulletin and lay almost unread for sixty years.

When psychologists rediscovered it, their first question was mechanical rather than moral. Perhaps the men were simply getting in one another's way: eight people cannot pull in perfect unison, and effort spent out of step is wasted, so the loss might be coordination and nothing to do with willingness. To separate that coordination loss from any loss of motivation, a later team ran the experiment with a rope and a deception. Each participant was blindfolded, placed at the front of the rope, and told that others were pulling behind him. In fact he pulled alone, and there was nothing whatever to coordinate with. Effort still fell — not as far as in a genuine group, but far enough to show that most of Ringelmann's loss was in the head rather than the hands. The phenomenon acquired a name: social loafing.

It has since turned up almost everywhere anyone has looked for it: in shouting and clapping, in the generation of ideas, in the committee whose report one member ends up writing. A large review of the evidence concluded that the effect is real and widespread but that its size varies considerably — with the task, with the group, and with the culture in which the study was run, being consistently smaller where people describe themselves first as members of a group and only afterwards as individuals. What does not vary is the participants' account of themselves. Asked afterwards, people insist that they pulled, shouted or thought as hard as they always do. The loss is not a decision anyone reports making.

Three explanations do most of the work. The first is evaluation. A contribution that cannot be identified cannot be judged, and effort tracks the possibility of being judged with uncomfortable precision; swimmers whose lap times were called out swam faster than those whose were not, in the same race. The second is dispensability: in a large group one person's effort seems unlikely to decide the outcome, and an effort that will not decide anything is easy to withhold. The third is fairness. Faced with a partner who is plainly doing little, most people reduce their own effort rather than carry someone, a reaction known as the sucker effect, which is why a single visible free rider can lower the output of a whole team without any of its members deciding to be lazy.

The same three levers, reversed, describe what works against loafing. Make the individual contribution visible and the loss largely disappears. Give the task a purpose that the group actually cares about, and it shrinks. Keep the group small enough that dispensability is not believable, and give every member a job that is clearly theirs and clearly needed. Under conditions of that kind the effect can even invert: a weaker member of a pair, knowing that the team's result depends on them, will often work harder than they would alone — an increase psychologists call the Köhler effect.

All of which makes the usual practical response to social loafing look badly chosen. In offices and classrooms the finding is treated as a discovery about people: some of them are lazy, and group work exposes them. The research says something less comfortable. The experiments recruit volunteers at random and find the same fall in nearly all of them, including those most confident that they were immune. A manager who responds by identifying and lecturing the loafers has misread the result, because the fault lies in the design of the work rather than in the character of the workers. Schools are the worst offenders here. A group project marked with a single shared grade, with no individual component and no record of who did what, is a machine for manufacturing exactly the behaviour that teachers then complain about.

Two cautions. Not every underperforming team is loafing; groups also fail through poor instructions and bad leadership, and reaching for the fashionable explanation first is its own kind of laziness. And the laboratory tasks are short, artificial and trivial, which is what makes them measurable. Real work is longer, more interesting and carried out in front of colleagues whose opinion matters, and the effect there is smaller and much harder to isolate. The design lesson survives all the same. If you want effort out of a group, make each person's share of it visible, keep the group small enough for that visibility to be credible, and give it work worth doing. Nothing in that recipe requires better people, which is fortunate, because better people are not usually available.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What was the purpose of the experiment in which participants were blindfolded?", options: ["A to discover whether people pull harder when they cannot see one another", "B to establish whether the drop in effort was caused by motivation rather than coordination", "C to measure the greatest force a single person can produce", "D to check that Ringelmann's measuring equipment had been accurate"], answer: "B",
          explain: "The blindfold experiment was run 'to separate that coordination loss from any loss of motivation'. The other options recycle words from the paragraph (blindfold, coordination, measuring device) without stating its purpose.",
          evidence: "To separate that coordination loss from any loss of motivation",
          vocab: ["separate", "establish whether"] },
        { n: 28, type: "mcq", prompt: "According to the passage, the sucker effect occurs when people", options: ["A work harder in order to make up for a colleague who is doing little", "B fail to notice that others in their group are contributing nothing", "C are given a share of the work that is too difficult for them", "D hold back their own effort so as not to be taken advantage of"], answer: "D",
          explain: "Faced with a partner doing little, 'most people reduce their own effort rather than carry someone'. Option A reverses this, and B and C describe situations the passage never mentions.",
          evidence: "most people reduce their own effort rather than carry someone",
          vocab: ["rather than carry someone", "not to be taken advantage of"] },
        { n: 29, type: "mcq", prompt: "The writer mentions the Köhler effect in order to show that", options: ["A being needed by a group can increase a person's effort", "B pairs always achieve more than larger groups do", "C weaker members are better left out of teams", "D loafing disappears when groups are rewarded properly"], answer: "A",
          explain: "The Köhler effect is introduced as the inversion of loafing: a weaker member whose contribution the team depends on 'will often work harder than they would alone' — being needed raises effort.",
          evidence: "knowing that the team's result depends on them, will often work harder than they would alone",
          vocab: ["the team's result depends on them", "being needed by a group"] },
        { n: 30, type: "mcq", prompt: "What does the writer say about laboratory studies of social loafing?", options: ["A Their findings have been contradicted by studies in real workplaces", "B They exaggerate the differences between one person and another", "C Their tasks are brief and unimportant, so the effect at work is weaker", "D They are the only trustworthy evidence available on the subject"], answer: "C",
          explain: "The tasks are 'short, artificial and trivial', while real work is longer and watched by colleagues, so 'the effect there is smaller'. Weaker, not contradicted: option A overstates the passage.",
          evidence: "the effect there is smaller and much harder to isolate",
          vocab: ["short, artificial and trivial", "brief and unimportant"] },
        { n: 31, type: "ynng", prompt: "Ringelmann's work received little attention for many years after it was published.", answer: "YES",
          explain: "YES: the writer says the result 'appeared in an agricultural bulletin and lay almost unread for sixty years' — sixty years of being unread is little attention.",
          evidence: "lay almost unread for sixty years",
          vocab: ["almost unread", "little attention"] },
        { n: 32, type: "ynng", prompt: "Social loafing has been shown to be equally strong in every culture studied.", answer: "NO",
          explain: "NO: the review found the size of the effect varies with the culture, 'being consistently smaller where people describe themselves first as members of a group'. Equal strength is contradicted.",
          evidence: "being consistently smaller where people describe themselves first as members of a group",
          vocab: ["consistently smaller", "equally strong"] },
        { n: 33, type: "ynng", prompt: "Loafing is more common in teams whose members have not worked together before.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the writer discusses group size, culture, task and visibility, but never compares new teams with established ones. Familiarity between members is simply not addressed.",
          evidence: "with the task, with the group, and with the culture in which the study was run" },
        { n: 34, type: "ynng", prompt: "The way group projects are usually assessed in schools encourages loafing.", answer: "YES",
          explain: "YES: a project with one shared grade and no record of who did what is called 'a machine for manufacturing exactly the behaviour that teachers then complain about'.",
          evidence: "is a machine for manufacturing exactly the behaviour that teachers then complain about",
          vocab: ["a machine for manufacturing", "encourages"] },
        { n: 35, type: "ynng", prompt: "People who reduce their effort in a group are usually aware that they are doing so.", answer: "NO",
          explain: "NO: participants insist they worked as hard as ever, and the writer states that 'The loss is not a decision anyone reports making' — that is, it is not consciously chosen.",
          evidence: "The loss is not a decision anyone reports making" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "removed the need for coordination and so isolated the loss of motivation.",
            "leads managers to blame people instead of redesigning the work.",
            "explains why large committees reach their decisions more quickly.",
            "reduces the amount of effort that people hold back.",
            "showed that the force produced per person fell as the team grew.",
            "proves that people always perform best when they are completely alone.",
            "can make a weaker member work harder than they would alone.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Ringelmann's measurements of men pulling on a rope", answer: "E",
          explain: "The force per man fell from sixty-three kilograms alone to thirty-one in a team of eight: 'every additional member made every member less productive', which is ending E.",
          evidence: "every additional member made every member less productive",
          vocab: ["less productive", "the force produced per person fell"] },
        { n: 37, type: "match", group: "ends", prompt: "Blindfolding participants and telling them others were pulling", answer: "A",
          explain: "With nobody actually behind him, 'there was nothing whatever to coordinate with', so any fall in effort had to come from motivation — ending A.",
          evidence: "there was nothing whatever to coordinate with",
          vocab: ["nothing whatever to coordinate with", "removed the need for coordination"] },
        { n: 38, type: "match", group: "ends", prompt: "Knowing that one's own contribution can be identified", answer: "D",
          explain: "'Make the individual contribution visible and the loss largely disappears' — when effort can be identified, less of it is withheld, which is ending D.",
          evidence: "Make the individual contribution visible and the loss largely disappears",
          vocab: ["the loss largely disappears", "reduces the amount of effort that people hold back"] },
        { n: 39, type: "match", group: "ends", prompt: "Being given a part of a task that the group clearly depends on", answer: "G",
          explain: "This is the Köhler effect: a weaker member who knows the result depends on them works harder than they would alone. Ending G repeats that outcome.",
          evidence: "a weaker member of a pair, knowing that the team's result depends on them",
          vocab: ["the team's result depends on them", "the group clearly depends on"] },
        { n: 40, type: "match", group: "ends", prompt: "Treating social loafing as a flaw in individual character", answer: "B",
          explain: "The manager who identifies and lectures the loafers 'has misread the result, because the fault lies in the design of the work rather than in the character of the workers' — ending B.",
          evidence: "has misread the result, because the fault lies in the design of the work",
          vocab: ["the design of the work", "redesigning the work"] },
      ],
    },
  ],
};
