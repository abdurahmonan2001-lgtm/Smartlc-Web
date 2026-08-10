// Smart LC Mock Test 11 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + people-matching), P3 argumentative
// (MCQ-4 + YNNG + wordlist summary). Key quotas: TFNG ~40/40/20 with no
// runs of three, flat letters, unique concrete-noun answers.
export const MOCK11_READING = {
  id: "mock11-reading",
  bookId: "mock11",
  title: "Mock Test 11 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The frozen harvest",
      passage: `On a February morning in 1806, a ship named the Favorite left Boston harbour with a cargo that struck most observers as an elaborate joke: eighty tons of ice, cut from a frozen pond outside the city and bound for the Caribbean island of Martinique. The local newspapers were openly scornful, one of them assuring its readers that the story was, unbelievably, true — a vessel really had cleared the port loaded with frozen water. The man behind the venture, a twenty-three-year-old Bostonian named Frederic Tudor, was untroubled by the laughter. People in hot countries, he reasoned, had never had the chance to buy cold; once they had tasted an iced drink in August, they would not willingly go without another.

The first voyage proved the doubters half right. Most of the ice survived the three-week passage, but Martinique had nowhere to keep it and no habit of using it, and the cargo melted faster than it could be sold. Tudor lost heavily, and over the following decade his obsession twice landed him in a debtors' prison. Yet he went on quietly refining the two things on which the whole trade would depend: keeping ice frozen through a long tropical voyage, and keeping it frozen once it arrived.

The answer to the first problem was lying on the floors of New England's timber mills. Tudor experimented with straw, blankets and wood shavings before finding that sawdust, packed tightly around and between the blocks, was the most effective insulation of all — and, being the waste product of the region's sawmills, it cost next to nothing. Sealed under sawdust in a ship's hold, ice melted with astonishing slowness. The second problem he answered with architecture, building thick-walled icehouses in the ports he supplied, in which a season's stock could sit through the tropical summer losing only a fraction of its weight.

The harvest itself was transformed by one of Tudor's suppliers, a Boston businessman named Nathaniel Wyeth. Until the 1820s ice had been hacked from ponds in irregular lumps, which wasted labour and stowed badly. In 1825 Wyeth introduced a horse-drawn plough whose iron blade scored the frozen surface into a neat grid; workers with hand tools then split the sheet along the grooves. The device cut the cost of harvesting dramatically, and it produced uniform blocks that could be stacked as tightly as bricks — which mattered, because a solid mass of ice holds its cold far better than a loose pile, and tight stacking greatly reduced melting on the journey.

By the middle of the century, ice had become one of New England's great industries. Each winter thousands of men and horses worked the frozen ponds around Boston — among them Walden Pond, where the writer Henry Thoreau, living in his cabin on the shore, watched a hundred labourers strip away the pond's surface in a single season. Railways carried the blocks to the coast, and ships took them to the southern states, to the Caribbean, and across the Atlantic.

The trade's most celebrated feat came in 1833, when the ship Tuscany carried 180 tons of ice from Boston to Calcutta, a four-month voyage that crossed the equator twice. About half the cargo survived, and its arrival caused a sensation; the city's British residents paid for a granite icehouse by public subscription so that future cargoes could be stored properly. For decades afterwards the India run remained the most profitable branch of the entire business.

Yet the exotic routes were never the heart of the trade. The biggest market was at home. By the 1850s the icebox — an insulated wooden cabinet lined with metal, with a compartment at the top for a block of ice — had become a fixture of ordinary American kitchens, and the iceman with his horse and cart was as familiar a figure as the postman. Households could now keep milk, meat and vegetables fresh for days, and whole industries reorganised themselves around cheap cold: brewers made beer through the summer, and meat packers began shipping fresh beef in iced railway cars.

The industry that had conquered distance was finally undone by machinery. From the 1870s, plants that manufactured ice artificially spread through the southern cities, closest to the customers and farthest from the frozen ponds. Many customers at first regarded this factory-made ice with suspicion, insisting that natural pond ice was purer and slower to melt; but the manufactured product was cheap, local and, above all, reliable — a warm New England winter could halve the natural harvest, while a machine worked in any weather. By the early twentieth century the pond trade was shrinking fast, and the arrival of the household electric refrigerator in the 1920s and 1930s ended it altogether. What remains is a curious historical fact: for the better part of a century, one of America's most valuable exports was frozen water.`,
      questions: [
        { n: 1, type: "gap", prompt: "In 1806 the Favorite carried a cargo of ice from Boston to the island of ______.", note: "ONE WORD ONLY", answer: "Martinique" },
        { n: 2, type: "gap", prompt: "Packed layers of ______ proved to be the cheapest and best insulation for ice on board ship.", note: "ONE WORD ONLY", answer: "sawdust" },
        { n: 3, type: "gap", prompt: "Wyeth's horse-drawn ______ marked the frozen surface into a grid before the ice was split.", note: "ONE WORD ONLY", answer: ["plough", "plow"] },
        { n: 4, type: "gap", prompt: "Stacking uniform blocks tightly together greatly reduced ______ during transport.", note: "ONE WORD ONLY", answer: "melting" },
        { n: 5, type: "gap", prompt: "Roughly half of the Tuscany's cargo survived the four-month voyage to ______.", note: "ONE WORD ONLY", answer: "Calcutta" },
        { n: 6, type: "gap", prompt: "An icebox was a metal-lined wooden ______ used in homes to keep food cold.", note: "ONE WORD ONLY", answer: "cabinet" },
        { n: 7, type: "tfng", prompt: "The press made fun of Tudor's first shipment of ice.", answer: "TRUE" },
        { n: 8, type: "tfng", prompt: "Wyeth's ice-cutting device was powered by steam.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Ice from Walden Pond was considered the best in New England.", answer: "NOT GIVEN" },
        { n: 10, type: "tfng", prompt: "The Indian route eventually earned more than any other part of the ice trade.", answer: "TRUE" },
        { n: 11, type: "tfng", prompt: "In the 1850s, few ordinary American households used ice.", answer: "FALSE" },
        { n: 12, type: "tfng", prompt: "Some customers initially believed factory-made ice was of lower quality than pond ice.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "The last natural-ice company closed down in the 1930s.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The first electric cars",
      passage: `A — A visitor to a large American motor show in 1900 would have found three rival technologies parked side by side, and no obvious winner among them. Steam cars were powerful but complicated; petrol cars were noisy, smelly and hard to start; electric cars were silent, clean and simple. Nor was the electric vehicle a curiosity: of the roughly eight thousand motor cars then registered in the United States, around a third ran on batteries, and in some eastern cities the proportion was far higher. Fleets of electric taxis hummed through Manhattan, and London had briefly operated its own — nicknamed for the gentle buzzing sound they made as they passed. To many sober observers of the time, it was the petrol engine that looked like the dead end.

B — The electric car's appeal to city drivers was easy to state. It started at the turn of a switch, while a petrol engine had to be woken with a hand crank — a brutal ritual that could, and regularly did, break the arm of the careless. It needed no gear changing, produced no smoke, and made so little noise that early models were fitted with bells to warn pedestrians. For a doctor making house calls or a family paying visits across town, the electric's short range hardly mattered and its cleanliness was decisive. Manufacturers noticed who was buying and aimed their advertising accordingly: the electric was sold as an elegant enclosed carriage for the well-to-do woman, upholstered like a drawing room and requiring neither strength nor mechanical knowledge. Renata Costa, an energy historian, warns against reading that cleanliness too generously. "The electric car of 1900 was clean at the kerb and nowhere else," she says. "Its charge came from coal-fired power stations, so the smoke was moved to the edge of town rather than removed — and the industry has been quietly repeating that piece of arithmetic ever since."

C — What destroyed this promising machine was less a single failure than a squeeze from several directions at once. In 1908 Henry Ford launched the Model T, and once his moving assembly line was running its price fell year after year, until a petrol car cost a fraction of the price of an electric one. New oilfields in Texas kept petrol cheap, while electricity remained, outside the big cities, a luxury: most rural American homes had no supply at all, so a touring driver could not have recharged even if he had wanted to. Then, in 1912, the engineer Charles Kettering perfected an electric starter for petrol engines, and the dangerous crank disappeared — taking with it the electric car's most persuasive selling point. Petrol cars could now be started by a woman in gloves, and driven from New York to California past a filling station on every main road. The electric, tied by its limited range to the city where it slept, had no answer.

D — There was one serious attempt to save it. Thomas Edison spent the better part of a decade perfecting a nickel-iron battery, lighter-lived than lead and almost indestructible, and in 1914 his friend Henry Ford announced that the two of them would produce a cheap electric car for the ordinary family. Prototypes were built; a factory was discussed; and then the project simply faded away, defeated by cost, by technical troubles with the batteries, and by the Model T's unanswerable price. Ingrid Halvorsen, a historian of battery technology, sees the episode as an early lesson in a recurring problem: "Battery chemistry improved far more slowly than the pioneers assumed it would. The batteries of 1914 broke the promises the carmakers had made for them — and that pattern repeated for most of a century."

E — The electric vehicle did not vanish so much as retreat into work that suited it. In Britain, electric milk floats delivered bottles door to door until the end of the century, ideal for a short fixed route with constant stopping. Forklift trucks went electric because exhaust fumes are intolerable inside a warehouse; golf carts and airport vehicles followed for similar reasons. Daniel Osei, curator of a motor museum, argues that the car's image was damaged as much by its marketing as by its batteries: "By selling the electric as a genteel carriage for wealthy ladies, the makers told everyone else, in effect, that this car was not for them. The vehicles disappeared, but that image took far longer to die."

F — A century later, the electric car has returned, and historians of technology are regularly asked what took it so long. Marcus Webb, a transport historian, resists the idea that the early electric was simply a bad product. "The first electric car did not lose a technical argument; it lost a commercial race. Petrol got a twenty-year head start on infrastructure — by the time anyone imagined a national charging network, there was already a filling station on every corner. Once that happened, no battery, however good, could win." The lesson he draws is uncomfortable for anyone who believes the best technology reliably wins: markets choose early, infrastructure hardens the choice, and undoing such a decision can take a hundred years.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "an account of a joint project by two famous industrialists", answer: "D" },
        { n: 15, type: "match", group: "minfo", prompt: "reasons why electric cars suited people driving in cities", answer: "B" },
        { n: 16, type: "match", group: "minfo", prompt: "examples of specialised jobs in which electric vehicles stayed in use", answer: "E" },
        { n: 17, type: "match", group: "minfo", prompt: "an invention that removed one of the petrol car's main drawbacks", answer: "C" },
        { n: 18, type: "match", group: "minfo", prompt: "figures showing the electric car's share of the early motor market", answer: "A" },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why the electric car lost",
            lines: [
              "After 1908, Ford's moving {{19}} line cut the price of the Model T year after year.",
              "In 1912 the electric starter appeared, so petrol cars no longer needed a dangerous hand {{20}}.",
              "Because of its limited {{21}}, the electric car could not leave the city,",
              "and most homes in the countryside were not yet connected to {{22}}.",
              "Meanwhile, newly discovered oilfields kept the price of {{23}} low.",
            ],
          },
          answer: "assembly" },
        { n: 20, type: "gap", group: "sum2", answer: "crank" },
        { n: 21, type: "gap", group: "sum2", answer: "range" },
        { n: 22, type: "gap", group: "sum2", answer: "electricity" },
        { n: 23, type: "gap", group: "sum2", answer: "petrol" },
        { n: 24, type: "match", group: "people", boxTitle: "List of People",
          box: ["Marcus Webb", "Ingrid Halvorsen", "Daniel Osei", "Renata Costa"],
          rubric: "Match each statement with the correct person, A–D.",
          prompt: "The way early electric cars were advertised discouraged many possible buyers.", answer: "C" },
        { n: 25, type: "match", group: "people", prompt: "The electric car was beaten commercially rather than technically.", answer: "A" },
        { n: 26, type: "match", group: "people", prompt: "Batteries improved more slowly than the early carmakers expected.", answer: "B" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The point of boredom",
      passage: `Everyone knows the feeling, and nobody enjoys it: the dragging afternoon, the endless queue, the meeting that will not end. Boredom is among the most ordinary of human experiences, and for precisely that reason science ignored it for the better part of a century. It seemed too trivial to study, a non-feeling, the mere absence of interest — the psychological equivalent of an empty room. Only in the last two decades has a research community formed around boredom, and its first discovery was that the empty room is anything but empty.

Begin with what boredom is not. It is not simply having nothing to do. Prisoners in solitary confinement are bored, but so are air-traffic controllers on quiet shifts, students in stimulating lecture halls, and commuters scrolling through more entertainment than any previous generation could have imagined. The definition most researchers now use has two parts: boredom is the uncomfortable state of wanting, but failing, to engage attention in an activity that feels meaningful. Both parts matter. A task can hold our attention and still bore us if it seems pointless; a valuable task can bore us if it is too easy or too hard to grip our attention. Boredom, in other words, is not a property of empty environments. It is a signal about the fit between a person and what that person is doing.

Some people, it turns out, feel this misfit far more often than others. Psychologists measure a trait they call boredom proneness, and the questionnaire scores correlate with an unsettling list of behaviours: compulsive gambling, dangerous driving, problem drinking, dropping out of education. Such correlations must be read with care — they cannot show whether frequent boredom causes reckless behaviour, or whether some third factor, such as a general hunger for stimulation, drives both. But the pattern is consistent enough that researchers treat chronic boredom as a genuine warning sign rather than a comic complaint.

How badly do people want the feeling to stop? One widely discussed experiment gives a startling answer. Participants were asked to sit alone in a plain room for fifteen minutes with nothing to do but think. Beforehand, most had said they would pay money to avoid receiving a mild electric shock. Left alone with the shock button, a large share of them — most of the men, and a quarter of the women — chose to shock themselves rather than simply sit with their own thoughts. Whatever else the study shows, it demonstrates the sheer motivational force of an unoccupied mind: people will accept physical pain in exchange for something, anything, to do.

The emerging view among researchers is that this force is exactly the point. On this account, boredom is functional: like pain, it is unpleasant by design, because its job is to interrupt us. Pain tells the body to stop before an injury worsens; boredom tells the mind that the current activity has stopped being worth its attention, and pushes us to redirect our energies towards something more valuable. A person incapable of boredom would drift through unrewarding activities indefinitely, never prompted to change course. Seen this way, the misery of a wasted afternoon is not a malfunction but a message — and a life from which boredom had been surgically removed would not be a better life, merely an unexamined one.

That conclusion lands awkwardly in an age that has industrialised the killing of spare moments. The smartphone is, among other things, the most efficient boredom-suppression device ever built: every twinge of restlessness can now be soothed within seconds, in the queue, in the lift, at the traffic lights. If boredom is a signal, we have become expert at silencing the alarm without asking what it was ringing about. Some researchers worry about this; others point out that people have always fled boredom by whatever means were available, from gossip to cheap novels, and that the panic over each new medium repeats itself once a generation.

What of the popular claim — beloved of newspaper columnists — that boredom is secretly good for us, a spur to daydreaming and therefore to creativity? Here the honest answer is that the evidence is thin. A handful of small studies have found that people produce more ideas after a dull task than after an absorbing one, but the effects are modest, hard to reproduce, and open to other explanations. Boredom may sometimes shove the mind into wandering, and a wandering mind sometimes wanders somewhere useful; that is a long way from a reliable creative method. The strongest claim the research currently supports is more modest: boredom is information. It tells us that the present activity has lost its grip, and it makes doing nothing so uncomfortable that we are forced to act on the news. What we do next — reach for a distraction, or change something real about our situation — is not the signal's business. It is ours.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What does the writer say about boredom in the first paragraph?", options: ["A It affects some people much more than others", "B It was not taken seriously by researchers until recently", "C It has become more common in modern life", "D It is best understood as a medical condition"], answer: "B" },
        { n: 28, type: "mcq", prompt: "According to the passage, people are bored when they", options: ["A have absolutely nothing to do", "B are too tired to concentrate on a task", "C are kept in an unstimulating environment", "D cannot fix their attention on anything that feels worthwhile"], answer: "D" },
        { n: 29, type: "mcq", prompt: "The writer describes the electric-shock experiment in order to show that", options: ["A people will accept pain rather than remain unoccupied", "B most people secretly enjoy mild pain", "C the participants misunderstood their instructions", "D boredom cannot be produced in a laboratory"], answer: "A" },
        { n: 30, type: "mcq", prompt: "Which of the following best summarises the writer's conclusion?", options: ["A Boredom should be treated as a psychological disorder", "B Technology has finally solved the problem of boredom", "C Boredom is a message that deserves attention", "D Creative people rarely experience boredom"], answer: "C" },
        { n: 31, type: "ynng", prompt: "For a long time, scientists did not regard boredom as worth studying.", answer: "YES" },
        { n: 32, type: "ynng", prompt: "Removing boredom from life completely would make people better off.", answer: "NO" },
        { n: 33, type: "ynng", prompt: "Children experience boredom more intensely than adults.", answer: "NOT GIVEN" },
        { n: 34, type: "ynng", prompt: "Boredom, like pain, can serve a protective purpose.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "Research has clearly established that boredom makes people more creative.", answer: "NO" },
        { n: 36, type: "gap", group: "wl",
          box: ["signal", "attention", "escape", "meaning", "risks", "habit", "comfort", "evidence", "memory"],
          boxTitle: "List of Words",
          notes: {
            title: "Summary — What boredom does",
            lines: [
              "Boredom arises when we cannot hold our {{36}} on an activity that offers {{37}}.",
              "People who are bored very frequently are statistically more likely to take {{38}}.",
              "The shock experiment shows how urgently bored people search for a means of {{39}}.",
              "For the writer, boredom works as a {{40}} telling us that what we are doing has stopped being worth our energy.",
            ],
          },
          answer: "B" },
        { n: 37, type: "gap", group: "wl", answer: "D" },
        { n: 38, type: "gap", group: "wl", answer: "E" },
        { n: 39, type: "gap", group: "wl", answer: "C" },
        { n: 40, type: "gap", group: "wl", answer: "A" },
      ],
    },
  ],
};
