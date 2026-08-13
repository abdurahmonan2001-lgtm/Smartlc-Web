// Smart LC Practice Set 1 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching paragraph-information + summary + people matching with one
// extra name), P3 argumentative science (MCQ-4 + YNNG + sentence
// endings). Key quotas: TFNG/YNNG balanced with no runs of three, flat
// letters, unique concrete-noun answers, correct MCQ options paraphrase
// the text while distractors echo its wording.
export const PSET1_READING = {
  id: "pset1-reading",
  bookId: "pset1",
  title: "Practice Set 1 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The invention of paper",
      passage: `Before paper, the world wrote on whatever it could find, and none of the options was satisfactory. In China, official records were kept on strips of bamboo bound together with cord: a single document could weigh as much as a man could carry, and one early emperor was said to work through fifty kilograms of state papers a day. Silk took ink beautifully and weighed almost nothing, but it was far too expensive for everyday use. In Egypt and around the Mediterranean, writers used papyrus, made by pressing together strips of a marsh reed, while medieval Europe would later depend on parchment, produced from the treated skins of sheep and calves — a bible copied onto parchment might require the skins of an entire flock. Writing, in short, was possible everywhere but cheap nowhere.

The traditional story of paper's invention names a precise man and a precise year. In AD 105, Cai Lun, an official at the Chinese imperial court, reported to the emperor a new method of making a writing surface from cheap and plentiful things: the bark of trees, waste hemp, old cloth and discarded fishing nets. The materials were shredded and beaten to loosen their fibres, then stirred into a vat of water. A flat screen was dipped into the vat and lifted out, catching a thin, even layer of tangled fibre which, once pressed and dried, became a sheet of paper. Archaeologists have since found fragments of paper more than two centuries older than Cai Lun's report, so he was almost certainly improving an existing craft rather than creating one. But it was his version, cheap and repeatable, that spread, and Chinese tradition honoured him afterwards as the god of papermakers.

The technique remained an East Asian possession for six hundred years, passing to Korea and Japan, where papermaking became a refined art. Its journey westwards began, according to a much-repeated account, with a military disaster. In 751, a Chinese army was defeated at the Talas River, in Central Asia, and among the prisoners taken were men who knew how to make paper. Set to work by their captors, they established the craft in Samarkand, which soon became famous for the quality of its paper. From there the skill travelled to Baghdad, where paper mills were running by the end of the eighth century, supplying a bureaucracy and a book trade that parchment could never have sustained. Paper then moved slowly along the length of the Islamic world, through North Africa and into Spain, where Europe's first paper mills were built in the twelfth century — more than a thousand years after Cai Lun.

Europeans changed the process in one important way: they mechanised the heavy work. Where Asian papermakers had beaten their fibre by hand, European mills harnessed the power of falling water to drive rows of wooden hammers, which pounded the raw material to pulp far faster than human arms could. The raw material itself, however, remained what it had been in China: fibre recovered from worn-out textiles. European paper was made almost entirely from rags, and the collection of old linen and cotton became a significant trade in its own right, with rag-pickers combing cities for material. When printing with movable type appeared in the fifteenth century, the demand for paper multiplied enormously — a single printed edition might consume what a team of copyists had once used in years — and the pressure on the rag supply grew with it.

By the eighteenth century that pressure had become a crisis. Printers complained constantly of the shortage of rags; governments restricted their export; and scientific societies offered prizes for a workable substitute. Suggestions poured in — straw, nettles, even wasps' nests, whose papery structure showed that an insect could do what industry could not — but none proved practical. The breakthrough came in the 1840s, when the German weaver Friedrich Gottlob Keller perfected a machine that ground logs against a wet revolving stone, reducing wood to pulp. Combined with new chemical treatments, Keller's process gave papermakers an almost limitless raw material, and paper made from wood soon cost a fraction of the old rag paper. At almost the same time, the Fourdrinier machine — named after the London stationers who financed it — replaced the individual dipped sheet with an endless moving belt of mesh, on which paper formed as a continuous roll, kilometres long.

Cheap paper transformed daily life. Newspapers became something a labourer could buy, novels appeared in editions of tens of thousands, and governments, schools and businesses buried themselves in forms and files. The revolution had a hidden cost, however. The chemicals used in early wood-pulp paper slowly generate acid, and books printed on it have been quietly destroying themselves ever since; librarians today find volumes from the 1880s crumbling at the touch, while rag-paper books three centuries older remain white and flexible. It is an irony of progress: the paper that taught the whole world to read was, from the day it was made, already burning slowly from within.`,
      questions: [
        { n: 1, type: "gap", prompt: "As well as bark, hemp and old cloth, Cai Lun's method used discarded fishing ______.", note: "ONE WORD ONLY", answer: "nets" },
        { n: 2, type: "gap", prompt: "A layer of wet fibre was collected by dipping a flat ______ into a vat.", note: "ONE WORD ONLY", answer: "screen" },
        { n: 3, type: "gap", prompt: "Papermaking reached Samarkand through captured ______ who knew the craft.", note: "ONE WORD ONLY", answer: "prisoners" },
        { n: 4, type: "gap", prompt: "European mills used the power of falling ______ to drive their hammers.", note: "ONE WORD ONLY", answer: "water" },
        { n: 5, type: "gap", prompt: "For centuries, European paper was produced almost entirely from ______.", note: "ONE WORD ONLY", answer: "rags" },
        { n: 6, type: "gap", prompt: "Keller's machine created pulp by grinding ______ against a wet stone.", note: "ONE WORD ONLY", answer: ["wood", "logs"] },
        { n: 7, type: "tfng", prompt: "The writing materials used before paper were either costly or difficult to handle.", answer: "TRUE" },
        { n: 8, type: "tfng", prompt: "Paper was completely unknown in China before Cai Lun's report to the emperor.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "The papermakers of Samarkand tried to keep their methods secret.", answer: "NOT GIVEN" },
        { n: 10, type: "tfng", prompt: "The invention of printing greatly increased the amount of paper needed.", answer: "TRUE" },
        { n: 11, type: "tfng", prompt: "A practical replacement for rags was found soon after the shortage began.", answer: "FALSE" },
        { n: 12, type: "tfng", prompt: "Books printed on early wood-pulp paper have lasted less well than older rag-paper books.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "Most paper produced today is made from recycled material.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Cable cars over the city",
      passage: `A — For most people, the cable car belongs to the ski resort: a string of cabins swaying above a snowfield, carrying tourists to the top of a mountain. Over the past two decades, however, the same technology has been quietly reinvented as serious urban transport. The Colombian city of Medellín opened the first modern example in 2004, linking hillside districts to its metro, and the idea has since spread across Latin America and beyond. La Paz in Bolivia now operates the largest urban cable car network in the world, with ten lines threading between the city's two levels, while systems have opened in cities as different as Ankara, Portland and Toulouse. What began as holiday machinery has become, in some places, the way tens of thousands of people get to work every day.

B — The appeal is easiest to understand in cities built on steep ground. Where hillsides are dense with housing, conventional transport struggles: roads zigzag, buses crawl, and a metro tunnel through rock costs a fortune. The transport planner Elena Ferro, who has advised several South American governments, points out that a cable car line can be built for a small fraction of the price of a metro and in a few years rather than a few decades. Because the cabins fly above the streets, the line needs to purchase very little land — only the narrow footprints of its towers and stations touch the ground — and it passes straight over the traffic jammed in the streets below. For a city with limited money and difficult terrain, Ferro argues, it is often the only rapid link that can be built at all.

C — The technology's critics do not dispute any of that; they dispute the arithmetic of scale. The economist Daniel Okafor has calculated that a typical urban gondola moves three to four thousand passengers per hour in each direction, while a metro line can move ten times that number. In his view, a cable car is best understood as a feeder — a short line that lifts people from an isolated district down to a high-capacity network — and cities court disappointment when they treat it as a substitute for that network. A gondola that ends at a bus stop, he warns, simply moves the queue further down the hill.

D — What cable cars do for the neighbourhoods they touch is harder to measure but may matter more. The sociologist Priya Raman spent two years interviewing residents of hillside settlements before and after a line opened above their streets. Journeys that had taken ninety minutes on foot and crowded minibuses fell to under thirty; nurses and cleaners on early shifts no longer set out in darkness. But the change residents mentioned most, Raman reports, was not the timetable. People spoke of feeling visibly connected to the city that had long ignored them — of the cabins overhead as proof that the municipality knew they existed. Several told her interviewers that the district's reputation among outsiders improved once the line appeared on the official transport map, alongside the metro stations of wealthier areas.

E — Sceptics often assume that a vehicle hanging from a rope must be at the mercy of the weather, and it is true that high winds can force a line to close: cabins are brought into the stations when gusts pass a set threshold. The engineer Tomas Lindqvist, who has audited systems on three continents, finds that these interruptions loom larger in imagination than in the record. The networks he has studied typically run more than ninety-eight per cent of their scheduled hours, a reliability many bus operators would envy, partly because a cable car has remarkably few moving parts and its cabins circulate continuously rather than keeping to a timetable that can collapse. Maintenance is concentrated in a few overnight hours, and a stalled line can be evacuated cabin by cabin — slowly, but safely.

F — The gravest danger to the urban cable car may be its own glamour. The tourism researcher Hannah Weiss has studied lines that were promoted as symbols of a modern city rather than as workaday transport, and her findings are uncomfortable. Built to serve viewpoints rather than housing, several charge fares pitched at visitors — three or four times the price of a bus ticket — and carry almost no daily commuters at all; one system she examined stood nearly empty on weekday mornings while the buses beneath it were full. The lesson Weiss draws is not that cable cars fail, but that a line succeeds only when its fares sit inside the city's ordinary ticketing system and its stations sit where people actually live. A cable car, in the end, is neither a toy nor a miracle. It is a tool — a narrow, clever tool that, hung across the right valley at the right price, can stitch a divided city together.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a comparison between the capacity of cable cars and that of another form of transport", answer: "C" },
        { n: 15, type: "match", group: "minfo", prompt: "examples of cities in different parts of the world that have built urban cable cars", answer: "A" },
        { n: 16, type: "match", group: "minfo", prompt: "a reason why cable car services are sometimes suspended", answer: "E" },
        { n: 17, type: "match", group: "minfo", prompt: "figures showing how much journey times fell after a line opened", answer: "D" },
        { n: 18, type: "match", group: "minfo", prompt: "a description of lines whose prices suit visitors rather than local passengers", answer: "F" },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why steep cities choose cable cars",
            lines: [
              "In hillside cities, ordinary transport performs badly, and digging a metro through rock is extremely expensive. A cable car line, by contrast, can be completed within a few {{19}} and at far lower cost.",
              "Since only the towers and stations touch the ground, very little {{20}} has to be bought, and the cabins simply pass over the {{21}} in the streets below.",
              "Critics accept these advantages but point to the technology's limited {{22}}, arguing that a gondola works best as a feeder for a larger network.",
            ],
          },
          answer: "years" },
        { n: 20, type: "gap", group: "sum2", answer: "land" },
        { n: 21, type: "gap", group: "sum2", answer: "traffic" },
        { n: 22, type: "gap", group: "sum2", answer: "capacity" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Elena Ferro",
            "Daniel Okafor",
            "Priya Raman",
            "Tomas Lindqvist",
            "Hannah Weiss",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one more person than you need.",
          prompt: "Cable cars should carry passengers into larger transport networks rather than replace them.", answer: "B" },
        { n: 24, type: "match", group: "people", prompt: "A new line changed how residents felt about their own district.", answer: "C" },
        { n: 25, type: "match", group: "people", prompt: "Interruptions to services are rarer than people imagine.", answer: "D" },
        { n: 26, type: "match", group: "people", prompt: "Ticket prices can exclude the very passengers a line should serve.", answer: "E" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Inside the teenage brain",
      passage: `For most of the twentieth century, science had one explanation for the storms of adolescence, and it fitted on a single word: hormones. The moodiness, the risk-taking, the slammed doors — all were put down to the chemical upheaval of puberty, a biological squall to be waited out. The brain itself was assumed to be essentially finished; anatomists taught that it reached its adult size by the age of six, and where the organ's structure was concerned, a teenager was simply an adult with less experience. Only in the 1990s, when magnetic resonance imaging made it possible to photograph living brains year after year, did that assumption collapse. The scans revealed that the brain, far from being complete, undergoes a reconstruction in the second decade of life as profound as anything in infancy — and that the timing of this rebuilding may explain adolescence rather better than hormones ever did.

The imaging studies produced two great surprises. The first concerned grey matter, the tissue dense with the connections between brain cells. Instead of growing steadily, it peaks around the start of puberty and then declines for years, as connections that are rarely used are pruned away. Far from being a loss, this thinning is a refinement: like a sculptor cutting away stone, the adolescent brain discards what it does not use so that the circuits it keeps run faster and more reliably. The second surprise was the order in which regions mature. The pruning sweeps across the brain from back to front, and the last region to be remodelled — well into the mid-twenties — is the prefrontal cortex, the area behind the forehead that handles planning, self-control and the weighing of consequences. Meanwhile the limbic system, a deeper set of structures involved in emotion and the anticipation of reward, is transformed early in puberty and becomes, for a period, more excitable than it will ever be again: brain responses to rewards are stronger in adolescence than in either childhood or adulthood.

From these findings grew what is known as the dual-systems model. Adolescence, on this account, is a period when the accelerator is fully developed but the brakes are still being fitted: a reward system at maximum sensitivity, supervised by a control system that is years from completion. The model makes a specific prediction — that teenagers will take most risks not when alone but when the social rewards of daring are on display — and experiments bear it out. In a well-known series of driving-simulator studies, teenagers, university students and adults steered a car through a course where yellow lights invited a gamble. Driving alone, the teenagers took no more chances than the adults did. When two friends were watching, their risky decisions and crashes roughly doubled, while the adults drove exactly as before. The presence of peers, the researchers concluded, acts directly on the adolescent reward circuitry: nothing about the road had changed, only the audience.

The rebuilt brain also keeps a different clock. At puberty, the nightly release of melatonin, the hormone that signals the body to sleep, shifts two hours or more later, so a teenager instructed to sleep at ten lies awake in a body still chemically wide awake — and is then dragged from deep sleep by a school bell tuned to adult rhythms. Sleep researchers have accordingly argued for later school start times, and districts that have made the change report students who are more alert and, in some studies, measurably safer on the roads. What looks like adolescent laziness, the research suggests, is in large part biology — a conclusion with obvious consequences for how schools organise their mornings.

It is a tidy story, and parts of it have been oversold; the dual-systems model has attracted serious criticism, and some of it sticks. The differences in brain maturation between individuals are large, so a scan cannot say of any particular seventeen-year-old that their prefrontal cortex is unfinished; and anthropologists note that the reckless teenager is not a universal figure, since in many traditional societies adolescents move smoothly into adult roles, which suggests that culture shapes how the brain's tendencies are expressed. Nor is risk-taking simply a defect to be engineered away. An animal that never left its parents' territory would never breed; the adolescent appetite for novelty and for the company of peers is, on the evolutionary reading, precisely the machinery that pushes a juvenile out into the world.

The wisest conclusion may be that adolescence is not a design flaw but a trade-off. The same unfinished circuitry that permits a bad decision on a Saturday night is what allows a teenager to learn a language, an instrument or an identity at a speed no adult can match, because a brain still under construction is a brain that can still be built to fit its world. That openness has a price: the majority of lifelong mental illnesses first appear during adolescence, when the remodelling is at its height, and a plastic brain is also a brain that experience can wound. Understanding the teenage brain, then, is not a matter of cataloguing its weaknesses. It is a matter of protecting, during the years when everything is still being wired, the most powerful learning machine any of us will ever own.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What point does the writer make in the first paragraph?", options: ["A Hormones have little influence on adolescent behaviour", "B The brain reaches its adult size later than anatomists believed", "C An old explanation of adolescence was weakened by new imaging evidence", "D Scientists in the 1990s were reluctant to scan living brains"], answer: "C" },
        { n: 28, type: "mcq", prompt: "According to the second paragraph, the loss of grey matter during adolescence", options: ["A makes the brain's remaining circuits work more efficiently", "B begins in the prefrontal cortex and spreads backwards", "C shows that the brain is dense with connections", "D continues at the same rate throughout adult life"], answer: "A" },
        { n: 29, type: "mcq", prompt: "In the driving-simulator studies, teenagers took more risks when", options: ["A they had been driving for a long time", "B the course contained more yellow lights", "C they were competing against adults", "D other young people were watching them"], answer: "D" },
        { n: 30, type: "mcq", prompt: "The writer discusses melatonin research in order to show that", options: ["A teenagers need more sleep than adults do", "B behaviour often blamed on laziness has a biological cause", "C school bells are tuned to adult rhythms", "D later school start times are difficult to introduce"], answer: "B" },
        { n: 31, type: "ynng", prompt: "The adolescent brain differs measurably from the adult brain.", answer: "YES" },
        { n: 32, type: "ynng", prompt: "The dual-systems model is beyond serious criticism.", answer: "NO" },
        { n: 33, type: "ynng", prompt: "Teenagers today take more risks than teenagers of earlier generations.", answer: "NOT GIVEN" },
        { n: 34, type: "ynng", prompt: "The adaptability of the adolescent brain brings benefits as well as dangers.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "Changing school start times has made no difference to students.", answer: "NO" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "responds more strongly during adolescence than at any other time of life.",
            "is caused mainly by the use of digital devices.",
            "makes waking early genuinely difficult for most teenagers.",
            "matures later than the regions it is supposed to supervise.",
            "proves that teenagers are unable to control their behaviour.",
            "suggests that an adaptable brain is also an exposed one.",
            "was demonstrated under controlled experimental conditions.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The prefrontal cortex", answer: "D" },
        { n: 37, type: "match", group: "ends", prompt: "The brain's system for anticipating rewards", answer: "A" },
        { n: 38, type: "match", group: "ends", prompt: "The effect of an audience of peers on risk-taking", answer: "G" },
        { n: 39, type: "match", group: "ends", prompt: "The later nightly release of melatonin", answer: "C" },
        { n: 40, type: "match", group: "ends", prompt: "The appearance of most mental illness during adolescence", answer: "F" },
      ],
    },
  ],
};
