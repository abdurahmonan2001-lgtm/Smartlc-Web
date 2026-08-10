// Smart LC Mock Test 3 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + people-matching), P3 argumentative
// (MCQ-4 + sentence endings + YNNG). Key quotas: TFNG ~40/40/20 with no
// runs of three, flat letters, unique concrete-noun answers.
export const MOCK3_READING = {
  id: "mock3-reading",
  bookId: "mock3",
  title: "Mock Test 3 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Highways of still water",
      passage: `The oldest canals in the world were not built for boats at all. In Mesopotamia, more than six thousand years ago, farmers cut channels from the Tigris and the Euphrates to carry river water to their crops, and the survival of whole cities depended on keeping those channels clear of silt. Transport came later, almost as an afterthought. Once a channel was wide and deep enough, people discovered the fact on which every canal engineer since has relied: water carries weight almost for free. A horse that can drag perhaps a tonne along a rough road can pull a barge of thirty tonnes or more along still water, because the water itself supports the load. The ancient Egyptians exploited this principle to move enormous blocks of stone for their monuments, floating them along channels dug between the Nile and the building sites.

Nothing in the ancient world, however, compared with the Grand Canal of China. Begun as a series of local waterways and joined into a single system in the seventh century, it eventually stretched some 1,800 kilometres and linked two of the country's great rivers, the Yellow River and the Yangtze. Its purpose was not irrigation but supply. The fertile south produced far more food than it needed, and the canal existed above all to carry grain northwards, feeding the capital and the armies that guarded the frontier. Sections of it are still crowded with barges today, which makes the Grand Canal both the longest and the oldest artificial waterway in continuous use anywhere on Earth.

Every canal builder faced the same enemy: hills. Water will not flow uphill, and a canal must hold its level or its water simply drains away. The earliest answer was the flash lock, a single gate in a dam which, when opened, released a rush of water on which a boat could ride down — or be hauled up, slowly and dangerously, against the flow. It wasted vast quantities of water and wrecked a good many boats. The real solution, the pound lock, appeared in China in the tenth century, the invention of a Chinese engineer responsible for river traffic. The idea is simple and beautiful: two gates instead of one, with the boat waiting in a sealed chamber between them while the water level inside is gently raised or lowered. Europe adopted the device centuries later, and Leonardo da Vinci added a refinement that remains in service today — the mitre gate, a pair of doors meeting at an angle pointed upstream, so that the pressure of the water itself squeezes them shut.

It was in eighteenth-century Britain that canals turned from useful conveniences into engines of economic change. In 1761 the Duke of Bridgewater opened a canal to bring coal from his mines at Worsley into the fast-growing town of Manchester. Within a year the price of coal in the city had halved, and investors across the country took note. There followed the frenzy remembered as canal mania, during which a network of roughly 6,500 kilometres was dug almost entirely by hand, by travelling gangs of labourers known as navvies. Along these narrow waterways moved the raw materials of the Industrial Revolution: coal, iron, clay, salt and stone. The boats themselves were pulled by horses, which plodded along a towpath at the water's edge, and whole families lived aboard the cramped cabins, which they decorated with painted roses and castles.

The engineering of the network still astonishes. Aqueducts carried boats in iron troughs high above river valleys, and tunnels took them straight through hills, the longest running for more than three kilometres in total darkness. To save money, most tunnels were built without a towpath, so the horse was led over the top of the hill while the boat was worked through by legging: the boatmen lay on their backs on planks and pushed against the tunnel walls with their legs, walking the vessel through the hill, sometimes for hours at a time.

The railways ended it all with remarkable speed. From the 1830s onwards, goods that had taken days to cross the country by barge could make the same journey in hours; the new trains were faster, cheaper and untroubled by frost, which could freeze a canal solid for weeks. Traffic drained away, canal companies were bought up by their railway rivals — sometimes only to be closed — and by the middle of the twentieth century much of the network lay derelict, its channels choked with weed and its lock gates rotting on their hinges.

The rescue came from an unexpected direction: pleasure. From the 1940s, enthusiasts began to argue that the decaying network was not an eyesore but a treasure, and volunteers, unpaid and working at weekends with borrowed tools, set about restoring ruined locks and re-digging abandoned channels. They succeeded beyond any reasonable hope. Today more boats float on Britain's canals than at the height of the Industrial Revolution, nearly all of them for leisure; towpaths have become footpaths and cycle routes; and the warehouses that once stored cotton and coal have been reborn as apartments, galleries and cafés. The canals never stopped being useful. They simply changed their cargo — from coal and grain to quiet.`,
      questions: [
        { n: 1, type: "gap", prompt: "The very first canals were dug to bring water to farmers' ______.", note: "ONE WORD ONLY", answer: "crops" },
        { n: 2, type: "gap", prompt: "The main task of the Grand Canal was to move ______ to the north of China.", note: "ONE WORD ONLY", answer: "grain" },
        { n: 3, type: "gap", prompt: "In a pound lock, a boat rises or falls inside a sealed ______.", note: "ONE WORD ONLY", answer: "chamber" },
        { n: 4, type: "gap", prompt: "Within a year of the Bridgewater Canal opening, ______ cost half as much in Manchester.", note: "ONE WORD ONLY", answer: "coal" },
        { n: 5, type: "gap", prompt: "Boats on British canals were originally pulled by ______ walking on the towpath.", note: "ONE WORD ONLY", answer: "horses" },
        { n: 6, type: "gap", prompt: "In tunnels, boatmen moved the vessel by pushing on the walls with their ______.", note: "ONE WORD ONLY", answer: "legs" },
        { n: 7, type: "tfng", prompt: "The Grand Canal connected two major Chinese rivers.", answer: "TRUE" },
        { n: 8, type: "tfng", prompt: "The pound lock was invented by a European engineer.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "A gate designed by Leonardo da Vinci is still used on canals today.", answer: "TRUE" },
        { n: 10, type: "tfng", prompt: "Canal companies paid the navvies unusually high wages.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "Trains proved slower than canal barges for moving goods.", answer: "FALSE" },
        { n: 12, type: "tfng", prompt: "Some ruined canals were repaired by people who were not paid for the work.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "Canal holidays are especially popular with retired people.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "A hive above the city",
      passage: `A — The beekeeper of the twenty-first century is as likely to wear a business suit as wellington boots. Over the past two decades, beehives have appeared in the least rural places imaginable: on the roof of the national opera house in one European capital, on the terraces of banks and grand hotels, behind primary schools, on supermarket roofs and in tiny courtyard gardens. Urban beekeeping has grown from an eccentric hobby into a fashionable cause. Evening courses sell out months in advance, waiting lists for city apiary sites run to years, and honey labelled with the name of a single neighbourhood now sells, jar for jar, at the price of fine wine. Not everyone is reassured by the speed of the boom. Kenji Mori, a veterinarian who inspects colonies for a national bee health service, warns that hives crowded onto neighbouring rooftops pass mites and viruses between one another with ease, and that most beginners are never taught to recognise a sick colony. "City bees are not defeated by the city," he says. "They are defeated by owners who cannot tell a healthy hive from an infected one."

B — At first sight a city seems the worst possible home for an insect that lives on blossom. In fact, urban areas can offer bees a better diet than much of the modern countryside. Intensively farmed land is often a green desert: a single crop that flowers spectacularly for two or three weeks and then offers nothing at all. A city, by contrast, is a patchwork of parks, gardens, balconies, cemeteries, railway embankments and street trees, and between them they provide an extraordinary variety of flowers from early spring until late autumn. Cities are also warmer — typically a few degrees warmer than the surrounding countryside, since brick and asphalt store the day's heat — which stretches the foraging season at both ends. And a city garden, unlike a field of oilseed, is rarely sprayed with agricultural pesticides.

C — The obvious worry is pollution: who wants to eat honey made beside a six-lane ring road? Ingrid Halvorsen, a food chemist who has analysed hundreds of urban honey samples, says the fear is misplaced. "People expect city honey to be full of traffic fumes. In fact the levels of lead and other metals we measure are almost always far below the safety limits — the bee is a surprisingly good filter, and nectar itself is remarkably clean." What her analyses do reveal is a chemical portrait of the district: pollen grains and trace compounds show which trees line the streets and which weeds fill the empty plots. Her team has come to treat hives as living sensors. "A single colony samples millions of flowers across several square kilometres. Reading its honey tells you more about a neighbourhood's environment than any instrument we could afford to install."

D — Success, however, has delivered an awkward problem: too many bees. Marcus Adeyemi, an ecologist who maps insect populations in three large cities, points out that honeybees are livestock, not wildlife. "In some districts the number of hives has doubled, and then doubled again, and there is simply not enough nectar to go round. A managed colony contains tens of thousands of foragers, and it competes directly with the wild pollinators — bumblebees, solitary bees, hoverflies — that have nowhere else to go." His surveys find wild species becoming scarcer precisely where clusters of hives are densest, and he notes the irony without enjoyment: a movement that began as a gesture towards nature may, in crowded corners, be squeezing nature out.

E — The emerging answer among campaigners is blunt: plant more, keep less. A city that genuinely wants to help bees, they argue, should be sowing nectar-rich trees and wildflower verges rather than adding another rooftop apiary. Claudia Reyes, who advises the parks department of a large Latin American city, has turned that principle into policy. "For every decision we now ask a simple question: does this add food, or does it only add mouths?" Her department has planted flowering avenues along forty streets, allows sections of its parks to grow shaggy through the summer, and has introduced a register of hives, so that a new apiary must show there is enough forage nearby before it is approved. "Registration is not a punishment," she says. "It is how we stop enthusiasm from loving the bees to death."

F — None of this diminishes what beekeeping does for the people who practise it. Peter Voss, who has taught beekeeping to city dwellers for fifteen years, watches the same transformation in every class. "Students arrive wanting honey, and they leave caring about street trees. They start noticing what is in flower on their way to work, they plant their balconies, they argue with the council about mowing. A hive is a window: once you look after bees, you never see a city the same way again." Schools that keep an observation hive report that pupils track the seasons with new attention, and several housing estates credit their shared apiaries with introducing neighbours who had lived beside each other, unspeaking, for years.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a comparison between temperatures in cities and in the countryside", answer: "B" },
        { n: 15, type: "match", group: "minfo", prompt: "an example of hives kept on a well-known building", answer: "A" },
        { n: 16, type: "match", group: "minfo", prompt: "a claim that planting is more helpful to bees than new hives", answer: "E" },
        { n: 17, type: "match", group: "minfo", prompt: "evidence that honey produced in cities is safe to eat", answer: "C" },
        { n: 18, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Bees in the city",
            lines: [
              "Cities can suit honeybees surprisingly well. Parks, gardens and street trees supply a wide variety of {{18}} for most of the year,",
              "and built-up areas are usually a few degrees {{19}} than the land around them. Tests show that city honey normally contains only tiny traces of {{20}},",
              "and researchers now use hives as living {{21}} that reveal the state of a district's environment. The main concern is that too many hives",
              "may leave wild {{22}} without enough food.",
            ],
          },
          answer: "flowers" },
        { n: 19, type: "gap", group: "sum2", answer: "warmer" },
        { n: 20, type: "gap", group: "sum2", answer: "metals" },
        { n: 21, type: "gap", group: "sum2", answer: "sensors" },
        { n: 22, type: "gap", group: "sum2", answer: "pollinators" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Ingrid Halvorsen", "Marcus Adeyemi", "Claudia Reyes", "Peter Voss", "Kenji Mori"],
          rubric: "Match each statement with the correct person, A–E.",
          prompt: "Looking after bees permanently changes how people see their city.", answer: "D" },
        { n: 24, type: "match", group: "people", prompt: "Honey can provide detailed information about a local environment.", answer: "A" },
        { n: 25, type: "match", group: "people", prompt: "In some areas there are now more bees than the food supply can support.", answer: "B" },
        { n: 26, type: "match", group: "people", prompt: "New apiaries should be approved only where enough food exists for them.", answer: "C" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The soundtrack of everyday life",
      passage: `There is almost nowhere left to escape from music. It plays in supermarkets and gyms, in cafés and airport lounges, in offices and waiting rooms; and where no one else provides it, we provide it ourselves, sealing our ears against the street with headphones. For most of human history, hearing music meant being in the presence of musicians, and silence was the ordinary background of work and travel. Within a couple of generations that relationship has been reversed: recorded music is now the default condition of public and private space, and silence has become the exception rather than the rule. The interesting question is no longer whether we like this arrangement, but what all this background sound is actually doing to us.

The oldest and best-supported answer is that music works on the body before it works on the mind. Rhythm and volume raise what psychologists call arousal — the general level of alertness — while familiar and well-liked music lifts mood. For simple, repetitive activities, that combination is genuinely useful: people fold laundry, enter data and run on treadmills measurably better with music than without, because the task leaves attention to spare and the music keeps the mind from sagging. This mundane truth was, for a while, inflated into something far grander. In 1993 a small study found that students performed slightly better on a spatial reasoning task for a few minutes after listening to Mozart, and the media seized on it: newspapers announced that classical music made children more intelligent, recordings were marketed to anxious parents, and one American state even discussed issuing classical CDs to newborn babies. The follow-up research told a duller story. The boost was real but tiny and brief, and — crucially — it was not about Mozart: an enjoyable story read aloud, or a pop song the listener happened to like, produced the same short-lived improvement. What the experiments had discovered was not a secret property of genius but the ordinary effect of pleasure and arousal on a brain about to take a test.

Against these modest benefits stands an equally well-documented cost. The ear cannot be closed, and whatever enters it competes for the brain's limited processing capacity. Decades of laboratory work on what researchers call the irrelevant sound effect show that background speech and music reliably impair memory for ordered material — precisely the kind of remembering that reading, mental arithmetic and writing depend on. The damage is worst when the background sound contains language: reading comprehension suffers particularly when the music includes lyrics, because the words of the song and the words on the page are processed by the same machinery, and the machinery cannot fully serve two masters. For complex verbal work, the dull conclusion of the literature is that quiet remains the best soundtrack.

Averages, however, conceal as much as they reveal, because people differ sharply in how much background sound they can absorb. One consistent finding concerns personality: introverts, whose nervous systems appear to run closer to their optimal level of stimulation, are more easily pushed past it, and tend to be more affected by background music than outgoing people, who may even seek extra noise when a task bores them. Another factor is control. Music we have chosen ourselves is processed differently from music imposed on us: the chosen playlist is predictable, carries no social irritation, and can be abandoned at will, which is partly why the same person who works happily in headphones may be driven to distraction by a colleague's radio. In the argument about music in open-plan offices, who picks the music matters nearly as much as whether it plays.

Retailers understood the power of background sound long before laboratories measured it. Studies conducted in shops and restaurants since the 1980s show that tempo acts like an invisible hand: when slow music plays, customers walk more slowly through the aisles, linger at tables, and — the finding that pays for all this research — spend more. Faster music speeds diners up, which is exactly what a restaurant wants when the queue is long. Volume and style matter too: louder music shortens visits, and shoppers have been shown to reach for more expensive purchases when the background music matches an upmarket setting. None of this is hidden persuasion in any sinister sense — the customers simply drift with the current — but it is persuasion nonetheless, and it is entirely deliberate.

What, then, should a sensible person conclude? Background music is neither the harmless wallpaper its providers pretend nor the enemy of thought its critics denounce. It is a mild drug with predictable interactions: helpful for dull and mechanical work, harmful for reading and remembering, more dangerous to some temperaments than others, and most pleasant when self-administered. It would be as foolish to ban music from every workplace as to pipe it into every corner. The intelligent response is not a verdict but a habit of matching: fit the soundtrack to the task, the person and the moment — and remember that in a shop, the person doing the matching is not working for you.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer suggests that", options: ["A people today deliberately seek out silent places", "B silence has become unusual rather than normal", "C most public music is chosen by those who hear it", "D shops and gyms play very similar music"], answer: "B" },
        { n: 28, type: "mcq", prompt: "Research that followed the original 'Mozart effect' study showed that", options: ["A only Mozart's music produced the improvement", "B the improvement lasted longer than first reported", "C anything enjoyable could produce a similar brief boost", "D spatial reasoning cannot be measured reliably"], answer: "C" },
        { n: 29, type: "mcq", prompt: "According to the writer, background music causes most difficulty when", options: ["A a person is reading and the music contains words", "B the listener dislikes the style of music being played", "C it is played more loudly than expected", "D a task is repetitive and mechanical"], answer: "A" },
        { n: 30, type: "mcq", prompt: "Which statement best summarises the writer's conclusion?", options: ["A Music should be removed from public spaces", "B Complex work always benefits from silence", "C People should avoid music that contains lyrics", "D Music's effect depends on the task, the person and who controls it"], answer: "D" },
        { n: 31, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "tend to be more affected by background music than outgoing people.",
            "was dismissed by researchers as impossible to measure.",
            "encourages shoppers to leave a store more quickly.",
            "often improves when music raises arousal and lifts mood.",
            "is less disturbing than music imposed by someone else.",
            "suffers particularly when the music includes lyrics.",
            "leads customers to spend more time and money.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Performance on simple, repetitive tasks", answer: "D" },
        { n: 32, type: "match", group: "ends", prompt: "The writer states that reading comprehension", answer: "F" },
        { n: 33, type: "match", group: "ends", prompt: "According to the passage, introverts", answer: "A" },
        { n: 34, type: "match", group: "ends", prompt: "Music that a person has selected for themselves", answer: "E" },
        { n: 35, type: "match", group: "ends", prompt: "Slow music playing in a shop", answer: "G" },
        { n: 36, type: "ynng", prompt: "The media exaggerated the findings of the original Mozart-effect study.", answer: "YES" },
        { n: 37, type: "ynng", prompt: "Employers should prohibit music in every workplace.", answer: "NO" },
        { n: 38, type: "ynng", prompt: "Trained musicians are less distracted by background music than other people.", answer: "NOT GIVEN" },
        { n: 39, type: "ynng", prompt: "Retailers use music deliberately to influence how customers behave.", answer: "YES" },
        { n: 40, type: "ynng", prompt: "Silence is the best condition for every kind of work.", answer: "NO" },
      ],
    },
  ],
};
