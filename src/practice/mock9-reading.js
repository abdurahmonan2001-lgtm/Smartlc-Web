// Smart LC Mock Test 9 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive reportage with lettered
// paragraphs (matching-information + summary + two choose-TWO groups),
// P3 argumentative science (MCQ-4 + YNNG + sentence endings). Key quotas:
// TFNG/YNNG balanced with no runs of three, flat letters, unique
// concrete-noun answers, correct MCQ options paraphrase the text.
export const MOCK9_READING = {
  id: "mock9-reading",
  bookId: "mock9",
  title: "Mock Test 9 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Drawing the world: a short history of the map",
      passage: `The impulse to draw the world is very old. Among the earliest surviving attempts is a small tablet of clay from Mesopotamia, scratched with a ring of ocean enclosing a flat disc of land, with the city of Babylon sitting comfortably at its heart. It is easy to dismiss such objects as crude, but that is to misunderstand what they were for. They were not measurements; they were memory aids and statements of belief, made for people who knew their own valley intimately and imagined everything beyond it from hearsay. Almost every early map shares this character. It records relationships — this settlement lies past that river, this mountain guards the road north — without any consistent scale, and it places the mapmaker's own community firmly and unapologetically in the middle of things.

The first serious attempt to put mapping on a mathematical footing came from the Greek world. Eratosthenes, working in Alexandria in the third century BCE, knew that at noon on the longest day of the year the sun stood directly above a well in the southern town of Syene and cast no shadow at all, while at the same moment in Alexandria an upright post cast a short one. From the angle of that shadow and the marching distance between the two towns he calculated the circumference of the earth, and came remarkably close to the modern figure. Three centuries later Claudius Ptolemy pushed the idea further. His Geography gave every place he could learn about a pair of coordinates, so that a map could in principle be rebuilt anywhere in the world from nothing but a list of numbers. Ptolemy himself surveyed none of it. He worked from road itineraries, sailing times and the accounts of travellers, and his mistakes — a Mediterranean stretched much too far from west to east, an Asia that ran on and on — were copied faithfully for well over a thousand years.

Medieval Europe produced maps of an entirely different kind. The great mappae mundi that hung in cathedrals put Jerusalem at the centre of the circle and east, the direction of the rising sun, at the top; the earthly paradise occupied the upper rim, and the spaces between were filled with beasts, saints and the ruins of empires. Nobody consulted one before setting out on a journey, because that was never their purpose. They were pictures of a moral order, not route-finding instruments. Elsewhere the tradition of measurement carried on. In Sicily, the geographer al-Idrisi spent years collecting the testimony of travellers for King Roger II and produced a world map engraved on a great disc of silver, together with a book explaining it. In China, meanwhile, official cartographers were already laying their country out on a square grid, a technique that would not appear in Europe for centuries.

Practical accuracy returned to European mapping by sea rather than by land. From the thirteenth century, Mediterranean sailors were using portolan charts: coastal outlines drawn with startling precision, every harbour and headland named in a dense fringe of writing, and the interior left almost entirely blank because it was of no use to anyone on a ship. Across each chart ran a web of straight rhumb lines radiating from ornamental compass roses, allowing a navigator to lay a course with a ruler. They were drawn on vellum, and on many the curve of the animal's neck can still be seen along one edge. These were working documents made by seamen for seamen, and they owed nothing to the scholars.

Printing multiplied maps, and the sixteenth century supplied the innovation that made the printed sea chart genuinely useful. The difficulty was ancient: a sphere cannot be flattened without something being deformed. In 1569 Gerardus Mercator published a projection that stretched the spacing of the parallels towards the poles by exactly the amount needed to make a course of constant compass bearing appear as a perfectly straight line. For navigation this was a gift. The price was distortion of area: on a Mercator map Greenland swells until it rivals Africa, though the real continent is fourteen times larger.

Mapping a whole country accurately demanded a different discipline again. Surveyors began by measuring one short baseline across level ground with obsessive care, then built outwards from it a chain of triangles whose angles were read with a theodolite, so that thousands of square kilometres could be fixed from a single measured distance. In France four generations of the Cassini family worked at this task for the best part of a century; when their new coastline was laid over the older maps, the kingdom visibly shrank, and Louis XIV is said to have complained that he had lost more territory to his surveyors than to any enemy. Britain's Ordnance Survey, founded in 1791, admits its purpose in its name: it was begun by the army to map the vulnerable southern coast.

The camera then took mapping into the air, first from balloons and later from aircraft, and finally into orbit. Today most maps are assembled automatically from satellite imagery and delivered to a device that also knows where its owner is standing. The technology would astonish Ptolemy, but the oldest problem has not gone away: every map leaves out far more than it shows, and what it leaves out is always a choice.`,
      questions: [
        { n: 1, type: "gap", prompt: "One of the oldest surviving maps was scratched onto a small tablet made of ______.", note: "ONE WORD ONLY", answer: "clay" },
        { n: 2, type: "gap", prompt: "Ptolemy's Geography recorded each place by giving it a pair of ______.", note: "ONE WORD ONLY", answer: "coordinates" },
        { n: 3, type: "gap", prompt: "On medieval mappae mundi, the city of ______ was placed at the centre of the world.", note: "ONE WORD ONLY", answer: "Jerusalem" },
        { n: 4, type: "gap", prompt: "Portolan charts were drawn on ______, and the shape of the animal's neck is often still visible.", note: "ONE WORD ONLY", answer: "vellum" },
        { n: 5, type: "gap", prompt: "National surveys started by measuring a single ______ on flat ground with great care.", note: "ONE WORD ONLY", answer: "baseline" },
        { n: 6, type: "gap", prompt: "The angles of the survey triangles were measured using a ______.", note: "ONE WORD ONLY", answer: "theodolite" },
        { n: 7, type: "tfng", prompt: "The earliest maps were not drawn to a consistent scale.", answer: "TRUE" },
        { n: 8, type: "tfng", prompt: "Ptolemy compiled his Geography from surveys he made himself.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Mappae mundi were intended to help travellers plan their routes.", answer: "FALSE" },
        { n: 10, type: "tfng", prompt: "Chinese mapmakers learned to use a grid from Islamic geographers.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "Portolan charts contained very little information about inland areas.", answer: "TRUE" },
        { n: 12, type: "tfng", prompt: "Mercator's projection makes some landmasses appear larger than they are.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "The Ordnance Survey's earliest maps were sold to the general public.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The sea garden: seaweed farming and its promise",
      passage: `A — Along the coasts of Korea, Japan and China, farming the sea is no novelty. Growers there have raised edible seaweeds on stakes, nets and ropes for centuries, and the practice long ago became an ordinary part of the rural economy. The modern scale of it, however, surprises most people outside Asia. Somewhere over thirty-five million tonnes of seaweed are now harvested each year, and the overwhelming majority of that tonnage is cultivated rather than gathered from the wild. Four countries account for most of it. In Europe and North America, by contrast, the industry is in its infancy, with a few hundred small farms and a great deal of enthusiasm, much of it based on a simple observation: here is a crop that occupies no farmland, drinks no fresh water and takes no fertiliser.

B — The growing cycle starts on shore. In a hatchery, fertile fronds are induced to release spores, which settle on fine twine wound around frames standing in tanks of chilled, filtered seawater. Some weeks later the seeded twine is carried out to sea and wound around heavier longlines strung between anchored buoys, a few metres below the surface. After that the crop largely looks after itself. The fronds take nitrogen, phosphorus and carbon straight out of the water around them and build tissue using sunlight alone; in good conditions a kelp blade can add several centimetres in a day and reach the length of a person by the spring harvest. Dr Ana Ferreira, who advises new growers on the Atlantic coast, likes to puncture the romance early. "The only inputs are seawater and light, which sounds like magic," she says. "Growing the stuff is genuinely the easy part. Everything that happens after you pull it out of the water is where farms succeed or fail."

C — Most farmed seaweed is eaten more or less as it comes, dried into the sheets and strips that are familiar across East Asia. A second and less visible market lies in extraction. The cell walls of red and brown seaweeds yield hydrocolloids — alginate, agar and carrageenan — which thicken, set and stabilise an extraordinary range of manufactured goods. They keep the crystals out of ice cream, hold toothpaste together, stop paint from separating and form the capsules of medicines. Millions of consumers who would never knowingly eat seaweed swallow a little of it daily. Smaller streams feed animal rations, garden fertilisers and experimental packaging films that dissolve harmlessly in water.

D — It is the climate argument that has attracted investors, and it deserves careful handling. Because seaweed grows fast and absorbs carbon as it does so, enthusiasts have suggested that vast offshore farms could lock away a meaningful share of the world's emissions. Researchers who study the carbon cycle are markedly cooler. Almost all of the carbon in a harvested crop returns to the atmosphere within months, once the product has been eaten, spread on a field or worn out; only the fraction that breaks free, sinks into deep water and stays there counts as storage, and measuring that fraction at sea is extremely difficult. Professor Tomas Lindqvist puts it bluntly. "Growing seaweed and then eating it is not carbon storage. It is a carbon loan, repaid in full within the year. That is not an argument against the crop, but it is an argument against the brochures."

E — One climate claim, though, has survived testing well. A red seaweed of the genus Asparagopsis produces a compound that interferes with the microbes in a cow's stomach responsible for generating methane, a potent greenhouse gas belched out by ruminants in enormous quantities. In feeding trials, adding a very small quantity to the daily ration has cut those emissions sharply without harming the animals or the milk. The remaining problems are practical rather than biological: the species is difficult to cultivate in bulk, the active compound degrades in storage, and feed regulators in most countries move slowly.

F — Farms also perform quieter services. The fronds strip out nitrogen and phosphorus that have washed off farmland into coastal water, nutrients which would otherwise feed the algal blooms that starve estuaries of oxygen, and the suspended structures shelter juvenile fish and shellfish. Yet seaweed farming is agriculture, and it inherits agriculture's difficulties. Planting a single variety densely over many hectares is an invitation to disease, which can sweep through a crop in days; growers who propagate from a handful of strains narrow the genetic base still further; ropes shed plastic fibres; and a very large farm shades the seabed beneath it. Dr Ratna Wijaya, who has studied tropical farms for two decades, warns against complacency. "Every farming system we have ever built eventually meets a pest or a pathogen," she says. "The industry should be breeding for variety now, while it is still small enough to change course."

G — The obstacles that actually decide the future are duller than any of this. Harvested seaweed is around nine-tenths water and begins to spoil almost immediately, so it must be dried or processed within hours, and drying consumes fuel, space and money. Labour costs are high in exactly the places where the new farms are being built. Most analysts therefore expect western growers to prosper, if they prosper at all, by selling small quantities of high-value material rather than bulk tonnage. For coastal communities watching their fisheries decline, even that would be worth having.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEFG",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          prompt: "a description of how young plants are raised before being taken out to sea", answer: "B" },
        { n: 15, type: "match", group: "minfo", prompt: "a warning that the climate benefits of the crop have been overstated", answer: "D" },
        { n: 16, type: "match", group: "minfo", prompt: "figures indicating how much seaweed is now produced worldwide", answer: "A" },
        { n: 17, type: "match", group: "minfo", prompt: "a reference to seaweed extracts contained in everyday manufactured goods", answer: "C" },
        { n: 18, type: "match", group: "minfo", prompt: "a call for growers to widen the range of varieties they plant", answer: "F" },
        { n: 19, type: "gap", group: "sum9", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — How a seaweed farm works",
            lines: [
              "Unlike crops on land, seaweed needs no fresh water and no {{19}}, because the fronds absorb what they need from the water around them.",
              "The cycle begins in a {{20}} on shore, where spores settle onto twine that is later wound around longlines held below the surface by buoys.",
              "As the crop grows it removes nitrogen and {{21}} that would otherwise feed harmful algal blooms in coastal waters. Growers must nevertheless watch for",
              "{{22}}, which spreads rapidly where a single variety has been planted across a wide area.",
            ],
          },
          answer: "fertiliser" },
        { n: 20, type: "gap", group: "sum9", answer: "hatchery" },
        { n: 21, type: "gap", group: "sum9", answer: "phosphorus" },
        { n: 22, type: "gap", group: "sum9", answer: "disease" },
        { n: 23, type: "multiselect", group: "adv",
          prompt: "Which TWO benefits of seaweed farming are mentioned in the passage?",
          options: [
            "It permanently removes carbon dioxide from the atmosphere.",
            "It offers work to coastal communities whose fisheries are shrinking.",
            "It requires no specialised equipment of any kind.",
            "It takes up nutrients that would otherwise damage coastal water.",
            "It has been shown to increase catches of wild fish nearby.",
          ],
          answer: "B" },
        { n: 24, type: "multiselect", group: "adv", answer: "D" },
        { n: 25, type: "multiselect", group: "prob",
          prompt: "Which TWO difficulties facing the industry does the writer identify?",
          options: [
            "the speed at which the harvest deteriorates once it is cut",
            "organised opposition from environmental campaigners",
            "the cost of employing people in the newer producing regions",
            "a shortage of species suitable for cultivation",
            "declining demand for seaweed products in Asia",
          ],
          answer: "A" },
        { n: 26, type: "multiselect", group: "prob", answer: "C" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The stubborn minority: making sense of left-handedness",
      passage: `Roughly one person in ten prefers the left hand, and that proportion is one of the more remarkable constants in human biology. It holds, with modest variation, across continents and across social classes, and it appears to have held for a very long time. Prehistoric artists who blew pigment around a hand pressed against a cave wall usually stencilled the left one, which is what a right-handed painter holding the pipe in the dominant hand would produce; counted across hundreds of such images, the ratio is close to the modern figure. Analyses of scratches on ancient teeth, made when a piece of meat was held in one hand and cut towards the mouth with a tool in the other, point the same way. Whatever produces left-handedness, it has been producing it at much the same rate since before writing existed, and no society has ever succeeded in stamping it out.

Explaining it has proved harder than explaining almost any other common human trait. Handedness clearly runs in families, but weakly: two left-handed parents are considerably more likely than two right-handed ones to have a left-handed child, yet most of their children will still be right-handed. Identical twins, who share their entire genome, disagree about handedness surprisingly often. When researchers finally acquired samples large enough to search the genome properly — hundreds of thousands of participants — the expected single gene failed to appear. Instead they found dozens of locations, each nudging the odds by a fraction of a percentage point, and together explaining only a small part of the variation. Many of the genes involved govern the scaffolding that shapes cells early in development, which suggests that the asymmetry of the body and the asymmetry of the hand are laid down together, long before a child ever reaches for anything.

If the genetic account is incomplete, the developmental one is suggestive. Ultrasound studies show foetuses favouring one hand for thumb-sucking months before birth, usually the hand they will prefer as children. What emerges is not a switch but a bias, which the noise of development can easily overrule.

Beneath the hand lies the brain, and here a persistent myth needs dismantling. Because language is processed mainly in the left hemisphere of most right-handers, it is widely assumed that left-handers must be the mirror image, with language on the right and a correspondingly different way of thinking. They are not. The majority of left-handers process language in the left hemisphere exactly as right-handers do; only a minority show the reversed pattern, and a further group use both sides. Handedness and language dominance are related, but loosely, and the popular image of the left-hander as a person with a fundamentally reorganised brain does not survive contact with the scanning data.

The same scepticism is due to the claim that left-handers are unusually creative. It is an attractive idea, supported chiefly by lists of famous artists and inventors who happened to be left-handed — a method that would prove almost anything. Controlled studies of creative performance find differences that are small, inconsistent and frequently absent altogether. The occupational statistics that are sometimes cited turn out to reflect who chooses to enter a profession rather than who excels once inside it.

One advantage, however, is real, and it is found in sport. In contests where two opponents face each other directly — fencing, boxing, table tennis, cricket, baseball — left-handers are represented at several times their share of the population, while in sports where competitors perform alone, such as swimming, gymnastics or running, they are no more common than anywhere else. The explanation is not superior coordination but rarity itself. A right-hander has spent a career training against other right-handers, and meets the mirrored angles of attack only occasionally; the left-hander has faced the standard pattern in every practice session since childhood. The advantage belongs to the minority precisely because it is a minority, which implies that it would shrink if left-handers ever became numerous — a neat piece of biological book-keeping that may help explain why the ten per cent has stayed so stable.

Costs exist as well, though they are mostly manufactured rather than natural. Scissors, tin openers, notebooks, cameras, power tools and the humble spiral binding are all designed around the right hand, and left-handers negotiate a world of small daily awkwardness that right-handers never notice. Until recently the awkwardness was enforced: within living memory children in many countries had the left hand tied behind them or struck with a ruler until they wrote with the right, a practice defended as discipline and now recognised as pointless cruelty that produced anxiety and stammering without altering the underlying preference.

That history explains what was once the most alarming finding in the field. A famous survey in the 1990s reported that left-handers died, on average, several years earlier than right-handers, and the result circulated widely. The explanation had nothing to do with health. Older people in the sample had grown up when switching was compulsory and had duly been recorded as right-handed, so the pool of elderly left-handers was artificially thin. Once researchers compared people born in the same decade, the gap dissolved. The lesson is a general one: much of what has been claimed about the left hand says more about the societies doing the claiming than about the people themselves.`,
      questions: [
        { n: 27, type: "mcq", prompt: "The writer refers to cave paintings and marked teeth in order to show that", options: ["A prehistoric people were more often left-handed than people today", "B the proportion of left-handers has remained stable for a very long time", "C early artists worked mainly with the hand they used for hunting", "D handedness can be measured more easily in ancient remains than in living people"], answer: "B" },
        { n: 28, type: "mcq", prompt: "What have large genetic studies of handedness found?", options: ["A a single gene that determines which hand a person prefers", "B that handedness is not inherited from parents at all", "C that many genes each make a very small contribution", "D that identical twins always share the same hand preference"], answer: "C" },
        { n: 29, type: "mcq", prompt: "According to the passage, the advantage left-handers enjoy in certain sports comes from", options: ["A the unfamiliarity of their movements to their opponents", "B their better coordination between hand and eye", "C the extra coaching they receive as children", "D the design of the equipment used in those sports"], answer: "A" },
        { n: 30, type: "mcq", prompt: "The survey reporting that left-handers had shorter lives was misleading because", options: ["A its sample contained too few participants to be reliable", "B it ignored the health risks of using right-handed tools", "C it confused left-handedness with ambidexterity", "D older left-handers had been recorded as right-handed"], answer: "D" },
        { n: 31, type: "ynng", prompt: "The idea that left-handers are more creative rests on weak evidence.", answer: "YES" },
        { n: 32, type: "ynng", prompt: "Schools were justified in forcing left-handed children to write with the right hand.", answer: "NO" },
        { n: 33, type: "ynng", prompt: "Left-handed players are paid more than right-handed players in professional sport.", answer: "NOT GIVEN" },
        { n: 34, type: "ynng", prompt: "Everyday objects are still designed mainly for right-handed users.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "The proportion of left-handers in the population is likely to rise substantially.", answer: "NO" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "have identified many genes, each with only a tiny effect.",
            "turned out to reflect how earlier generations had been brought up.",
            "has been shown to improve performance in mathematics.",
            "suggest that the ratio of left- to right-handers has changed little over thousands of years.",
            "explains why left-handedness is commoner in some countries than others.",
            "would disappear if the minority ever became a majority.",
            "takes place in the left hemisphere for most left-handers too.",
            "is now taken into account by the makers of most household tools.",
          ],
          rubric: "Complete each sentence with the correct ending, A–H, below.",
          prompt: "Hand stencils on prehistoric cave walls", answer: "D" },
        { n: 37, type: "match", group: "ends", prompt: "Studies of very large numbers of participants", answer: "A" },
        { n: 38, type: "match", group: "ends", prompt: "The edge left-handers hold in face-to-face sports", answer: "F" },
        { n: 39, type: "match", group: "ends", prompt: "The apparent shortage of elderly left-handers", answer: "B" },
        { n: 40, type: "match", group: "ends", prompt: "The processing of language in the brain", answer: "G" },
      ],
    },
  ],
};
