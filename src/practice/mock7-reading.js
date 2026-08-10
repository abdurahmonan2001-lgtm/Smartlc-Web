// Smart LC Mock Test 7 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + people-matching), P3 argumentative
// (MCQ-4 + YNNG + summary from wordlist). Key quotas: TFNG ~40/40/20 with
// no runs of three, flat letters, unique concrete-noun answers.
export const MOCK7_READING = {
  id: "mock7-reading",
  bookId: "mock7",
  title: "Mock Test 7 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "A portable roof: the history of the umbrella",
      passage: `On any wet morning, in any city on earth, the pavements fill with a procession of small portable roofs. The umbrella is so ordinary that it is hard to see it as an invention at all, and its owners treat it accordingly: transport companies report that tens of thousands are abandoned on trains and buses every year. Yet this forgettable object has a history of well over three thousand years — and for most of that time it had nothing whatever to do with rain.

The earliest umbrellas were parasols, built to block sunlight rather than water. Carvings from ancient Egypt and Assyria show attendants holding broad canopies above kings and priests, and in both societies the parasol was above all a mark of rank: the more important the person, the larger the canopy, and ordinary people had no right to its shade at all. Similar rules operated across Asia. At some royal courts, the number of tiers on a ceremonial parasol announced the precise status of the figure beneath it, and a ruler on the move might be accompanied by a whole team of bearers whose only duty was to keep him in shadow.

It was in China that the parasol first learned to cope with weather. Chinese craftsmen stretched paper over ribs of bamboo, and at some point — the exact date is disputed — they began coating the paper with oil, so that it shed water instead of soaking it up. Chinese sources also describe collapsible models whose ribs could slide and fold along the central stick, an idea remarkably close to the modern mechanism. For many centuries, however, these waterproof parasols remained an eastern speciality, and Europe, a continent that has never lacked rain, somehow did without.

The word itself preserves this sun-first history: 'umbrella' comes from the Latin umbra, meaning shade or shadow. When the device finally established itself in Europe, in the France and Italy of the seventeenth century, it did so as a fashionable sunshade, and by the early eighteenth century a light parasol was a standard accessory for elegant walkers in Paris and London. But it was firmly understood that umbrellas were for women. A man who sheltered under one was thought to be admitting that he could not afford a carriage, and he could expect open laughter in the street.

The man usually credited with breaking this rule was Jonas Hanway, a traveller and philanthropist who returned to London in the 1750s after years abroad and began carrying an umbrella through the city in wet weather — publicly, unapologetically, and for the next three decades. He had no commercial interest in the object; he simply preferred to arrive dry. The reaction was remarkable. Passers-by jeered, but the fiercest hostility came from the city's coachmen, who earned a good part of their living from sudden rain: a gentleman who could keep dry under his own portable roof might never hire a cab at all. Drivers were said to steer deliberately through puddles in order to drench him. Hanway simply outlasted them, and by the time of his death in 1786 respectable London men were carrying umbrellas of their own — known, for a while, as 'Hanways'.

Winning acceptance was one thing; building a good umbrella was another. Early European models were heavy and awkward, with a frame of wood or whalebone and a canopy of oiled canvas or waxed silk. They were slow to dry, unpleasant to carry and worse to smell, and a large one could weigh close to two kilograms. Whalebone, moreover, was expensive, and it cracked easily; a strong gust could leave a gentleman holding little more than a ruined bird-cage on a stick.

The decisive improvement came in 1852, when Samuel Fox, an English wire manufacturer, patented a frame of curved steel ribs, U-shaped in section, which proved at once lighter, stronger and far cheaper than anything that had come before. Machines could turn out the new frames by the thousand, prices fell steadily, and the umbrella completed its long journey from royal privilege to everyday possession carried by clerks and schoolchildren alike.

The twentieth century added convenience rather than principle. In the 1920s a German engineer produced a telescopic design whose stick and ribs slid into themselves, creating the folding umbrella small enough for a pocket or a handbag; after the Second World War, nylon replaced silk and cotton in the canopy, and mass production made the umbrella cheap enough to lose without regret. Inventors still file patents every year for radical replacements — aerodynamic canopies tested in wind tunnels, even devices intended to repel rain with jets of air — yet none has displaced the familiar formula of cloth circle, ribs and stick. The commuters hurrying head-down through the next downpour will be holding, almost unchanged, a small piece of the nineteenth century.`,
      questions: [
        { n: 1, type: "gap", prompt: "In Egypt and Assyria, the size of a parasol reflected its owner's ______.", note: "ONE WORD ONLY", answer: "rank" },
        { n: 2, type: "gap", prompt: "Chinese makers treated paper canopies with ______ so that they kept out water.", note: "ONE WORD ONLY", answer: "oil" },
        { n: 3, type: "gap", prompt: "In early eighteenth-century Europe, umbrellas were regarded as suitable only for ______.", note: "ONE WORD ONLY", answer: "women" },
        { n: 4, type: "gap", prompt: "Hanway's harshest critics were the ______, whose earnings depended on rain.", note: "ONE WORD ONLY", answer: "coachmen" },
        { n: 5, type: "gap", prompt: "Early frames were made of wood or ______, which broke easily.", note: "ONE WORD ONLY", answer: "whalebone" },
        { n: 6, type: "gap", prompt: "Fox's patented ribs were made of curved ______.", note: "ONE WORD ONLY", answer: "steel" },
        { n: 7, type: "tfng", prompt: "Early Egyptian parasols were used mainly as protection against rain.", answer: "FALSE" },
        { n: 8, type: "tfng", prompt: "Some Chinese parasols had frames that could be folded.", answer: "TRUE" },
        { n: 9, type: "tfng", prompt: "Hanway carried an umbrella in London for about thirty years.", answer: "TRUE" },
        { n: 10, type: "tfng", prompt: "Hanway earned money from selling umbrellas.", answer: "FALSE" },
        { n: 11, type: "tfng", prompt: "Fox based his steel frame on designs he had seen abroad.", answer: "NOT GIVEN" },
        { n: 12, type: "tfng", prompt: "Umbrellas small enough to fit in a pocket appeared in the twentieth century.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "Most of the world's umbrellas are now made in a single country.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "An ocean to drink",
      passage: `A — Seen from space, the Earth has no shortage of water; seen from a dry tap in the wrong city, it can seem to have almost none. Only about three per cent of the planet's water is fresh, and much of that is locked up in ice or buried deep underground, while the salty remainder fills the oceans. Turning sea water into something drinkable was for centuries a trick attempted mainly by shipwrecked sailors; today it is one of the world's fastest-growing industries. More than twenty thousand desalination plants now operate in over one hundred and fifty countries, their combined output has roughly doubled within a decade, and an estimated three hundred million people already rely on them for some or all of their daily water. In parts of the Arabian Gulf, where a year can pass without rain, entire cities drink almost nothing else.

B — The oldest way to desalt water copies the kettle: boil the sea, catch the steam, and let it condense as fresh water. This thermal approach still operates, especially where fuel is cheap, but it devours heat, and most of the modern industry has turned to a subtler method called reverse osmosis, developed from laboratory work in the 1960s. In a reverse-osmosis plant, sea water is forced at very high pressure against a fine synthetic membrane. The membrane's pores are so small that water molecules slip through while the dissolved salt is held back; fresh water collects on the far side, and the liquid that remains — a concentrated brine roughly twice as salty as the ocean — is piped back out to sea. About seven in every ten new plants built today use this process.

C — The great objection to desalination has always been the electricity it consumes, and here the change over one generation has been dramatic. The pumps that pressurise the sea water once wasted most of their effort, but modern plants pair better membranes with energy-recovery devices, which capture the pressure still stored in the outgoing brine stream and use it to help drive the next batch of sea water. Nadia Rahman, a process engineer who has designed plants on three continents, puts figures on the improvement: 'In the 1970s it took around fifteen kilowatt-hours of electricity to produce a cubic metre of fresh water. The best plants today manage it with less than three. That is not a small gain — it is the difference between a technology for emergencies and a technology for cities.'

D — The sea itself, however, pays part of the bill. Intake pipes can draw in fish larvae and other small organisms along with the water, and the returning brine, being denser than sea water, tends to sink and creep along the seabed, where the extra salt can damage the animals and plants that live there. Leila Haddad, a marine biologist who has surveyed the seafloor around several large plants, believes the issue receives too little attention: 'Because the discharge is invisible from the beach, its effects are routinely underestimated. We have measured changes in seabed life more than a kilometre from some outfalls.' Remedies do exist: operators can fit screens and slow the speed of their intakes, install diffusers that mix the brine rapidly into the surrounding water, and place outfalls in deeper water where strong currents disperse the salt before it can settle.

E — Even where the engineering succeeds, the economics can sting. Desalinated water remains among the most expensive kinds of drinking water, typically costing several times more than water pumped from a river or drawn from a well, and someone has to absorb the difference. Marcus Feld, a resource economist, argues that the social consequences deserve as much scrutiny as the chemistry: 'For a tourist hotel, desalinated water is trivially cheap. For a poor family on a metered supply, it can be unaffordable. The plant produces water; it does not, by itself, produce fairness.' Some governments respond by subsidising household supplies while charging industry the full rate; others quietly pass the cost on to everyone's bill.

F — The industry's next act is already visible, and it runs on sunlight. Several recent plants have been built alongside large solar farms, so that the pumps do their heaviest work in the middle of the day, when panels produce the most power and the electricity is cheapest. At the opposite end of the scale, engineers have squeezed the whole process into units the size of a shipping container, driven entirely by their own solar panels and needing no connection to any grid. Sofia Ortega, an adviser on water policy to several international agencies, sees the significance in precisely these small machines: 'A solar-powered unit the size of a container can now supply an island community that has never had a reliable source of fresh water. The future of desalination is not only giant plants for giant cities.' For a technology first attempted by desperate sailors, it would be a fitting return to the small scale.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a description of the process that separates fresh water from salt water", answer: "B" },
        { n: 15, type: "match", group: "minfo", prompt: "an explanation of how the power needed for desalination has been reduced", answer: "C" },
        { n: 16, type: "match", group: "minfo", prompt: "figures showing the recent growth of desalination worldwide", answer: "A" },
        { n: 17, type: "match", group: "minfo", prompt: "ways of limiting the damage desalination does to sea life", answer: "D" },
        { n: 18, type: "match", group: "minfo", prompt: "an example of desalination serving a small, remote community", answer: "F" },
        { n: 19, type: "gap", group: "sum7", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — How reverse osmosis works",
            lines: [
              "In a modern plant, sea water is pushed at very high {{19}} against a fine synthetic {{20}}, which lets water molecules pass while holding back the salt.",
              "The concentrated {{21}} that remains is returned to the sea. Devices that recover {{22}} from this outgoing stream have sharply cut running costs,",
              "and some of the newest plants — including container-sized units for remote places — are powered by {{23}} panels.",
            ],
          },
          answer: "pressure" },
        { n: 20, type: "gap", group: "sum7", answer: "membrane" },
        { n: 21, type: "gap", group: "sum7", answer: "brine" },
        { n: 22, type: "gap", group: "sum7", answer: ["energy", "pressure"] },
        { n: 23, type: "gap", group: "sum7", answer: "solar" },
        { n: 24, type: "match", group: "people", boxTitle: "List of People",
          box: ["Nadia Rahman", "Marcus Feld", "Leila Haddad", "Sofia Ortega"],
          rubric: "Match each statement with the correct person, A–D.",
          prompt: "The amount of power needed to produce fresh water has fallen dramatically.", answer: "A" },
        { n: 25, type: "match", group: "people", prompt: "The harm caused by waste from desalination plants is frequently underestimated.", answer: "C" },
        { n: 26, type: "match", group: "people", prompt: "Desalination need not be limited to large installations serving big cities.", answer: "D" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Why we laugh",
      passage: `Ask people why they laugh and the answer seems too obvious to examine: because something is funny. On this everyday theory, laughter is the applause we give a joke, comedians are its professional suppliers, and a world without humour would be a world without laughter. The theory has only one weakness. When researchers actually watch human beings laughing, it turns out to be largely wrong.

The most influential evidence comes from studies of laughter in the wild. One research team spent months in shopping centres, university corridors and city streets, discreetly logging well over a thousand episodes of everyday laughter together with the words that immediately preceded each one. Fewer than one laugh in five followed anything that could generously be described as a joke. The overwhelming majority came after entirely unremarkable remarks — greetings, farewells, statements as flat as 'it looked like rain this morning'. What predicted laughter was not wit but company: people laughed around thirty times more often with others than when they were alone, and, most strikingly, the person speaking laughed noticeably more often than the people listening. Laughter, the recordings suggest, is not primarily a reaction to comedy at all. It belongs to speech, woven through ordinary conversation — less like applause, and more like punctuation.

A second line of evidence pushes the origins of laughter far beyond the theatre, and far beyond our species. Young chimpanzees and gorillas produce a rhythmic panting during chasing and tickling games — a breathy, in-and-out sound that appears in exactly the situations that make human children laugh, and that primatologists have long treated as laughter's direct ancestor. Since humans and these apes last shared an ancestor millions of years ago, laughter in some form is almost certainly older than humanity itself. Its original job, most researchers now argue, was to serve as a signal during rough-and-tumble play: an unmistakable message that the chasing and wrestling, however fierce it looked, was not a real attack. On this account, laughter is a piece of social technology far older than language, and our jokes are simply the newest machinery ever built to trigger a very ancient reflex.

Laughter's most curious property is that it spreads. Television producers discovered decades ago that adding recorded laughter to a comedy makes audiences at home rate the same jokes as funnier, and brain-imaging studies hint at why: merely hearing laughter engages the areas that prepare the muscles of the face to join in, as if the sound itself issued an invitation. Some evolutionary psychologists argue that this contagiousness is not a side effect but the point. A wave of laughter sweeping through a group synchronises its mood in seconds, dissolves tension, and marks everyone present as members of the same temporary club; on this view it works as a kind of social grooming that can reach many companions at once, where physical grooming reaches only one.

None of this means laughter is innocent. Precisely because it advertises who belongs, it can advertise who does not: the shared laughter of a group can be aimed at an outsider as effectively as any insult, and most adults can date their oldest social wounds to exactly that sound. Laughter also tracks power with embarrassing precision. Studies of workplace meetings find that employees laugh generously at the feeble jokes of their superiors, while the laughter travelling in the opposite direction is far scarcer; count who laughs at whom, and you can sketch an office's hierarchy without reading a single job title. The behaviour that binds a group can, with no change in the sound itself, become the quiet instrument of its pecking order.

In recent years laughter has also been marketed as medicine. Laughter-therapy sessions run in dozens of countries, and enthusiasts credit the habit with burning calories, lowering blood pressure and strengthening the immune system. Some of these claims have partial experimental support, but the studies behind them are mostly small and short, and they face a stubborn problem: people who laugh a great deal differ from people who do not in many other ways — health, friendships, temperament — so the laughter itself is hard to isolate. The measured physical effects, where they exist, are modest. The honest summary is that the evidence remains limited, and anyone hoping to replace exercise with comedy will be disappointed. But to judge laughter by its effect on blood pressure is probably to miss its point. A behaviour that began as a play signal among apes, and that survives as the connective tissue of human conversation, does not need to cure anything to earn its keep. Its business was never really the body. Its business is the bond.`,
      questions: [
        { n: 27, type: "mcq", prompt: "The researchers who recorded laughter in everyday settings found that", options: ["A people laugh most when they are alone", "B laughter was rare in public places", "C most laughter followed genuinely funny remarks", "D most laughter followed ordinary, unfunny remarks"], answer: "D" },
        { n: 28, type: "mcq", prompt: "According to the recordings, the person speaking", options: ["A laughed less often than the listeners", "B laughed more often than the listeners", "C rarely laughed at all", "D laughed only at their own jokes"], answer: "B" },
        { n: 29, type: "mcq", prompt: "The panting sound made by young apes during play is presented as", options: ["A a direct ancestor of human laughter", "B a warning of a real attack", "C a way of calling adult apes", "D a sound with no clear purpose"], answer: "A" },
        { n: 30, type: "mcq", prompt: "What is the writer's view of the claims made for laughter as medicine?", options: ["A They have been fully confirmed by large studies", "B They are deliberately dishonest", "C The supporting evidence is still weak", "D Laughter is more effective than exercise"], answer: "C" },
        { n: 31, type: "ynng", prompt: "Most everyday laughter is a response to deliberate attempts at humour.", answer: "NO" },
        { n: 32, type: "ynng", prompt: "The writer believes that laughter existed before human beings evolved.", answer: "YES" },
        { n: 33, type: "ynng", prompt: "Men and women differ in how often they laugh.", answer: "NOT GIVEN" },
        { n: 34, type: "ynng", prompt: "The writer accepts that laughter can be used as a weapon against people.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "The writer concludes that laughter's main value lies in its physical health benefits.", answer: "NO" },
        { n: 36, type: "gap", group: "wl",
          box: ["breathing", "jokes", "medicine", "play", "signal", "speech", "strangers", "bonding", "hierarchy"],
          boxTitle: "List of Words",
          notes: {
            title: "Summary — The social origins of laughter",
            lines: [
              "Recordings of ordinary conversation show that laughter is tied far more closely to {{36}} than to deliberate humour: most laughs follow perfectly ordinary remarks.",
              "Laughter also appears to be far older than our species: young apes produce a panting version of it during rough-and-tumble {{37}}.",
              "On this account, laughter began as a {{38}} that an apparent attack was not serious.",
              "Because it spreads so easily from person to person, laughter unites groups, and its deepest function is probably social {{39}}.",
              "The writer is doubtful about laughter as a form of {{40}}, finding the evidence for physical benefits weak.",
            ],
          },
          answer: "F" },
        { n: 37, type: "gap", group: "wl", answer: "D" },
        { n: 38, type: "gap", group: "wl", answer: "E" },
        { n: 39, type: "gap", group: "wl", answer: "H" },
        { n: 40, type: "gap", group: "wl", answer: "C" },
      ],
    },
  ],
};
