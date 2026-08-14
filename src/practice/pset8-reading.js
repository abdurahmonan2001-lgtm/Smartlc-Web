// Smart LC Practice Set 8 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// science (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET8_READING = {
  id: "pset8-reading",
  bookId: "pset8",
  title: "Practice Set 8 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Barbed wire",
      passage: `A fence is the least glamorous of inventions, and for most of history it was built from whatever the land happened to offer: stone in the hill country, split timber near the forests, thorn hedges in the wet lowlands. The settlers who moved onto the grasslands of the American West in the middle of the nineteenth century found that the land offered nothing at all. There was no stone worth lifting and hardly a tree in a hundred miles, yet a farm without a fence was not a farm: cattle from the open range wandered in and ate the crop. Timber could be carried in by rail, but fencing a modest holding often cost more than the land it enclosed. Farmers tried ditches and earth banks, and above all they planted hedges of Osage orange, a thorny American tree that could be trained into a barrier. The hedges worked after a fashion, but they took four or five years to grow, they had to be cut back every season, and their roots drank the moisture that the crop beside them needed.

Plain wire was already on sale and cheap enough, yet cattle leaned on it, stretched it and walked through it; the difficulty lay not in the wire but in the animal's indifference to it. In 1873 a farmer named Henry Rose brought a curious object to the county fair at DeKalb, in Illinois: a wooden strip studded with short metal points, hung on his fence to discourage a cow that kept escaping. Rose's device was clumsy and was never manufactured, but among the crowd who stopped to examine it were three local men, Joseph Glidden, Jacob Haish and Isaac Ellwood, and each of them went home thinking about points. Glidden's answer was the one that lasted. Working at home, he cut short lengths of wire, coiled them into barbs on a converted coffee mill, threaded them onto a wire and twisted a second strand around the first so that they could not slide along the fence. He applied for a patent in October 1873, and after a long argument with Haish, it was granted in November 1874.

Selling a fence that hurt cattle was another matter. Ranchers protested that the barbs would tear valuable animals, and the first salesmen were shown the door in town after town. The demonstration that changed their minds was staged in San Antonio in 1876, where a young salesman called John Gates fenced part of the city's Military Plaza with the new wire and drove a herd of longhorns into it. The cattle charged, felt the barbs once, and then stood quietly in the middle of the pen; orders followed by the wagonload. The lesson, repeated by the industry ever afterwards, was that the wire taught rather than injured: an animal that had touched it once avoided it for life.

The production figures tell the rest of the story. Glidden's works turned out some ten thousand pounds of wire in 1874; six years later the American mills were selling eighty million pounds a year, and the price had fallen by more than half. The open range, across which herds had drifted freely between grass and water, was enclosed within a decade, and the long cattle drives came to an end. Not everyone accepted the change quietly. During the Texas drought of 1883, bands of masked men rode out after dark and cut the new fences, some of which had illegally enclosed public land and the only springs for miles, until the state made fence-cutting a crime and sent the Rangers to stop it. Three winters later the wire showed a crueller face. In the blizzard of 1886 cattle that would once have drifted south before the wind piled up against the fences and died there in their thousands, and several great ranching companies never recovered.

The consequences reached well beyond the ranches. For the peoples of the plains, whose hunting grounds the fences crossed, the wire arrived faster than any treaty could be argued over, and within twenty years the pattern was being exported to Argentina, to Australia and to southern Africa, wherever a few settlers wished to claim grazing from people who had used it in common.

Armies noticed the material almost at once. It was strung around blockhouses in the South African war of 1899, but its great and terrible period was the First World War, when belts of entanglement thirty metres deep lay in front of the trenches. The wire rarely killed; it held. Its purpose was to stop attacking infantry in the open ground, within range of the machine guns, for the seconds that decided a battle, and the failure of the artillery to cut it explains many of the worst days of that war. Later designers coiled the wire into concertinas that one soldier could carry and unroll in a few minutes.

Glidden died in 1906 among the richest men in Illinois, and the patent he defended through eighteen years of litigation, settled in his favour by the Supreme Court in 1892, had become one of the most valuable ever issued. It is an odd monument. The thing itself is nothing — a few grams of drawn steel twisted by a machine anybody can understand — yet it did quickly what neither law nor army could do at all, drawing lines across a continent that had none.`,
      questions: [
        { n: 1, type: "gap", prompt: "Before wire was available, farmers on the plains grew thorny ______ of Osage orange to keep animals out.", note: "ONE WORD ONLY", answer: "hedges",
          explain: "The passage says farmers 'planted hedges of Osage orange, a thorny American tree'. The question keeps 'thorny' and 'Osage orange', so only the noun is missing.",
          evidence: "they planted hedges of Osage orange" },
        { n: 2, type: "gap", prompt: "Glidden shaped his barbs using an adapted coffee ______.", note: "ONE WORD ONLY", answer: "mill",
          explain: "He 'coiled them into barbs on a converted coffee mill'. The question paraphrases 'converted' as 'adapted', but the machine itself keeps its name.",
          evidence: "coiled them into barbs on a converted coffee mill",
          vocab: ["converted", "adapted"] },
        { n: 3, type: "gap", prompt: "A second ______ was twisted round the first so that the barbs stayed in position.", note: "ONE WORD ONLY", answer: "strand",
          explain: "Glidden 'twisted a second strand around the first so that they could not slide'. 'Stayed in position' is the question's paraphrase of 'could not slide'.",
          evidence: "twisted a second strand around the first",
          vocab: ["could not slide", "stayed in position"] },
        { n: 4, type: "gap", prompt: "Gates proved the fence worked by penning longhorns in a ______ in San Antonio.", note: "ONE WORD ONLY", answer: "Plaza",
          explain: "Gates 'fenced part of the city's Military Plaza' and drove longhorns into it. The place name supplies the missing word; keep the capital letter as in the passage.",
          evidence: "fenced part of the city's Military Plaza with the new wire" },
        { n: 5, type: "gap", prompt: "During the ______ of 1886 huge numbers of cattle died against the new fences.", note: "ONE WORD ONLY", answer: "blizzard",
          explain: "The date 1886 takes you straight to the sentence about the blizzard, in which drifting cattle 'piled up against the fences and died there in their thousands'.",
          evidence: "In the blizzard of 1886 cattle that would once have drifted south",
          vocab: ["in their thousands", "huge numbers"] },
        { n: 6, type: "gap", prompt: "In the First World War the wire was meant to delay advancing ______ in front of the guns.", note: "ONE WORD ONLY", answer: "infantry",
          explain: "The purpose of the wire was 'to stop attacking infantry in the open ground, within range of the machine guns'. 'Attacking' becomes 'advancing' in the question.",
          evidence: "to stop attacking infantry in the open ground",
          vocab: ["attacking", "advancing"] },
        { n: 7, type: "tfng", prompt: "Three men who later made wire of their own examined Rose's device at the fair.", answer: "TRUE",
          explain: "TRUE: among the crowd who stopped to examine Rose's strip were Glidden, Haish and Ellwood — three local men who all went home thinking about points, and two of whom are later shown manufacturing wire.",
          evidence: "among the crowd who stopped to examine it were three local men",
          vocab: ["stopped to examine", "examined"] },
        { n: 8, type: "tfng", prompt: "Glidden's patent was accepted without any legal dispute.", answer: "FALSE",
          explain: "FALSE: the patent was one he 'defended through eighteen years of litigation', finally settled by the Supreme Court, and there was already an argument with Haish before it was granted.",
          evidence: "the patent he defended through eighteen years of litigation",
          vocab: ["litigation", "legal dispute"] },
        { n: 9, type: "tfng", prompt: "Farmers went on planting Osage orange hedges after barbed wire became available.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage explains why hedges were unsatisfactory but never says whether anyone continued to plant them once wire arrived. Slow growth is not a statement about later use.",
          evidence: "they took four or five years to grow" },
        { n: 10, type: "tfng", prompt: "Output of barbed wire rose enormously within a few years of the patent.", answer: "TRUE",
          explain: "TRUE: ten thousand pounds in 1874 became eighty million pounds a year six years later — an enormous rise in a few years, exactly as the statement says.",
          evidence: "six years later the American mills were selling eighty million pounds a year" },
        { n: 11, type: "tfng", prompt: "The Texas fence-cutters worked openly in daylight.", answer: "FALSE",
          explain: "FALSE: the cutters were 'bands of masked men' who 'rode out after dark' — both details contradict working openly in daylight.",
          evidence: "bands of masked men rode out after dark and cut the new fences",
          vocab: ["after dark", "in daylight"] },
        { n: 12, type: "tfng", prompt: "The fences made cattle losses worse during one severe winter.", answer: "TRUE",
          explain: "TRUE: in 1886 animals that would previously have drifted south before the wind instead 'piled up against the fences and died there in their thousands'.",
          evidence: "piled up against the fences and died there in their thousands",
          vocab: ["died there in their thousands", "cattle losses"] },
        { n: 13, type: "tfng", prompt: "Wire made for armies was more expensive to produce than wire made for farms.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage describes military uses and a later coiled design, but it never compares the cost of military wire with the cost of farm wire. No prices are given for either.",
          evidence: "Later designers coiled the wire into concertinas that one soldier could carry" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Bringing back buried rivers",
      passage: `A — Walk across almost any old city and you are walking over water. Rivers explain why towns stand where they do, and the small streams that fed them — the brooks and burns that crowd the earliest maps — once ran openly between houses and mills. In the nineteenth century they became a problem. Populations grew faster than drainage, the streams took the waste of the streets, and the smell of a city brook became a political matter. The engineering answer was the culvert: the stream was lined with brick, roofed over and buried, and the land above it was sold for building. The work was done with enthusiasm and on an extraordinary scale. In a number of European and North American cities more than two-thirds of the original stream network now runs underground.

B — In the past thirty years a handful of cities have begun to dig the streams out again, a practice known, rather beautifully, as daylighting. The best-known example is in Seoul, where an elevated motorway was demolished in 2003 to uncover the Cheonggyecheon; smaller schemes have since reopened stream reaches in Yonkers, Zurich and dozens of lesser towns. The motives are seldom romantic. Victorian culverts are reaching the end of their working lives, and a city that must spend money on a buried stream anyway has a genuine choice about what to spend it on.

C — The engineering argument is set out most clearly by the hydraulic engineer Marta Lindqvist. A pipe, she points out, has one capacity and can never be given another; when more rain falls than the culvert was designed for, the surplus rises through the manholes and runs down the street. An open channel can be given a shallow floodplain on either side, so that a flood spreads sideways instead of upwards, and it can be widened later if the climate demands it. Cost, however, is the argument that persuades committees. Comparing eleven schemes in northern Europe, Lindqvist found that reopening a buried reach was usually cheaper than replacing the culvert that carried it, because the most expensive part of the job — digging a trench along a working street — has to be paid for either way.

D — What returns when the lid comes off surprises people. A culverted stream has no light, no leaf fall and no gravel; its bed is a smooth concrete floor on which almost nothing can live. Within weeks of reopening, gravel washes back into the channel and insects colonise it, and the freshwater ecologist Yusuf Demir, who has monitored twenty restored reaches, records mayflies in the first season and small fish in the second. Demir insists that the planting matters as much as the digging. Young trees along the new banks cast shade, and shade holds the summer water temperature down by two or three degrees, which is the difference between a stream that trout can use and one they cannot.

E — The effects above the water are easier to sell to a council. The urban economist Elena Rossi has counted pedestrians and interviewed traders along four reopened streams. Footfall on the streets beside the water rose by roughly a quarter in the two years after opening, and the shopkeepers she spoke to reported longer visits and more customers, the cafes most of all. Rossi is careful about what this proves: some of the increase, she says, belongs to the wider rebuilding that daylighting is usually part of. The cooling, at least, is not in doubt. On summer afternoons her instruments read the air above an open channel two to three degrees below the air in the parallel street.

F — The obstacles are real. The first is land: a buried stream lies under something, and that something is usually a road, a car park or a row of buildings, so a scheme that looks simple on a plan requires either demolition or a long argument about traffic. The second is smell. Household waste pipes are frequently joined by mistake to the surface-water drain — misconnections, in the trade — and while the stream is inside a pipe nobody notices; once it is open, everybody does. The sharpest criticism comes from the geographer Kwame Boateng, who examined flood records for fourteen schemes. A few hundred metres of open channel, he found, changes very little while the rest of the catchment stays piped: the water arrives from upstream exactly as fast as it did before, and the protection claimed in the brochure belongs to a system nobody has yet built.

G — Boateng's own conclusion is not that cities should stop, and the planner Sofia Marchetti draws the practical lesson. Daylighting works, she argues, when it is timed rather than merely wished for: written into the drainage plan for a whole catchment, and then carried out in the year the road above is due to be rebuilt or the site above is being redeveloped, so that the trench is open and the disruption is already paid for. Schemes arranged that way, in her experience, cost a fraction of schemes arranged alone. Most of what the nineteenth century hid will stay hidden. But a street with a stream in it is worth more than a street with a pipe under it — in drainage, in shade, and in the willingness of people to stop and look at something moving.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a comparison of the cost of two ways of dealing with an ageing culvert", answer: "C",
          explain: "Paragraph C sets reopening a buried reach against replacing the culvert and reports Lindqvist's finding that the first is usually the cheaper of the two.",
          evidence: "reopening a buried reach was usually cheaper than replacing the culvert",
          vocab: ["replacing the culvert", "dealing with an ageing culvert"] },
        { n: 15, type: "match", group: "info", prompt: "a figure for how much of a city's stream network now lies below ground", answer: "A",
          explain: "Paragraph A gives the proportion: in many European and North American cities more than two-thirds of the original stream network is underground. 'Below ground' paraphrases 'underground'.",
          evidence: "more than two-thirds of the original stream network now runs underground",
          vocab: ["runs underground", "lies below ground"] },
        { n: 16, type: "match", group: "info", prompt: "an account of the conditions that come back to a stream once it is uncovered", answer: "D",
          explain: "Paragraph D describes exactly what returns when the lid comes off: gravel, insects, then fish, and the shade cast by new planting — the conditions the question asks about.",
          evidence: "gravel washes back into the channel and insects colonise it",
          vocab: ["when the lid comes off", "once it is uncovered"] },
        { n: 17, type: "match", group: "info", prompt: "evidence that reopening a stream may do little to reduce flooding", answer: "F",
          explain: "Paragraph F reports Boateng's study of flood records for fourteen schemes: a short open reach changes very little while the rest of the catchment remains in pipes.",
          evidence: "changes very little while the rest of the catchment stays piped",
          vocab: ["changes very little", "do little to reduce flooding"] },
        { n: 18, type: "match", group: "info", prompt: "advice on the best moment to carry out such a project", answer: "G",
          explain: "Paragraph G is Marchetti's point about timing: do the work in the year the road or site above is already being rebuilt, so the trench is open anyway.",
          evidence: "carried out in the year the road above is due to be rebuilt",
          vocab: ["timed rather than merely wished for", "the best moment"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Uncovering a buried stream",
            lines: [
              "A pipe has a fixed capacity, but an open channel can be given a shallow {{19}} on each side, so that flood water spreads outwards rather than rising into the street.",
              "Reopening also restores what a culvert removes. Light returns, {{20}} is washed back over the bare concrete bed, and insects arrive within weeks, followed by fish.",
              "Trees planted along the new banks provide {{21}}, which lowers the water temperature in summer by two or three degrees.",
              "The commonest complaint about a reopened stream is smell, and the usual cause is {{22}} — waste pipes wrongly attached to the surface-water drain further upstream.",
            ],
          },
          answer: "floodplain",
          explain: "Lindqvist's contrast is between a pipe of fixed capacity and an open channel 'given a shallow floodplain on either side'. The summary's 'on each side' paraphrases 'on either side'.",
          evidence: "a shallow floodplain on either side",
          vocab: ["on either side", "on each side"] },
        { n: 20, type: "gap", group: "sum2", answer: "gravel",
          explain: "A culverted stream has 'no gravel' and a concrete bed; within weeks of reopening 'gravel washes back into the channel'. The summary turns 'washes back' into 'is washed back'.",
          evidence: "gravel washes back into the channel",
          vocab: ["washes back", "is washed back"] },
        { n: 21, type: "gap", group: "sum2", answer: "shade",
          explain: "Young trees on the new banks 'cast shade', and that shade holds the summer temperature down. The summary paraphrases 'cast' as 'provide' and 'holds down' as 'lowers'.",
          evidence: "Young trees along the new banks cast shade",
          vocab: ["cast shade", "provide shade"] },
        { n: 22, type: "gap", group: "sum2", answer: "misconnections",
          explain: "The passage names the trade term for waste pipes wrongly joined to the surface-water drain: misconnections. They go unnoticed while the stream is piped and are obvious once it is open.",
          evidence: "misconnections, in the trade",
          vocab: ["joined by mistake", "wrongly attached"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Marta Lindqvist",
            "Kwame Boateng",
            "Elena Rossi",
            "Sofia Marchetti",
            "Yusuf Demir",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "A short stretch of open water does little to protect the area downstream.", answer: "B",
          explain: "Boateng studied flood records for fourteen schemes and found that a few hundred metres of open channel changes little because the water still arrives from upstream at the same speed.",
          evidence: "the water arrives from upstream exactly as fast as it did before",
          vocab: ["A few hundred metres of open channel", "A short stretch of open water"] },
        { n: 24, type: "match", group: "people", prompt: "Uncovering a stream frequently costs less than renewing the pipe it runs in.", answer: "A",
          explain: "The hydraulic engineer Lindqvist compared eleven schemes and found reopening usually cheaper than replacing the culvert, since the trench must be dug in either case.",
          evidence: "Comparing eleven schemes in northern Europe",
          vocab: ["replacing the culvert", "renewing the pipe"] },
        { n: 25, type: "match", group: "people", prompt: "Shops beside a reopened stream have gained trade.", answer: "C",
          explain: "The urban economist Rossi counted pedestrians and interviewed traders: footfall rose about a quarter and shopkeepers reported more customers, especially the cafes.",
          evidence: "reported longer visits and more customers",
          vocab: ["more customers", "gained trade"] },
        { n: 26, type: "match", group: "people", prompt: "What is planted beside the channel affects the temperature of the water.", answer: "E",
          explain: "The ecologist Demir argues that planting matters as much as digging, because the shade of young trees keeps the summer water temperature two or three degrees lower.",
          evidence: "the planting matters as much as the digging",
          vocab: ["holds the summer water temperature down", "affects the temperature"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "What sleep does with the day",
      passage: `Sleep is the strangest thing we do. A third of a life is spent motionless, unresponsive and unable to defend ourselves, in an arrangement that evolution has preserved in every animal with a nervous system worth the name. Natural selection does not usually tolerate that kind of exposure, and the conclusion researchers now draw is that whatever sleep is for must be worth the risk. For most of the twentieth century the answer given was rest: the brain, like a muscle, was thought to be recovering. The last three decades have replaced that answer with a more interesting one. Measured from the inside, the sleeping brain is not resting at all. It is going back over the day it has just had, and much of what we call learning happens after the learning has stopped.

The mechanism, in outline, is now widely agreed. New experience is captured by the hippocampus, a small structure that learns in a single trial but holds what it learns only briefly, and it must be transferred to the cortex, which learns slowly but keeps things for decades. The transfer happens largely in the deep, slow-wave stage of sleep. Recordings from sleeping animals show the hippocampus firing off short bursts of activity — sharp-wave ripples — in which the sequences of the previous day are run through again, and they are replayed to the cortex far faster than they originally occurred, so that an hour of experience can be reviewed in a matter of seconds. The lighter, dreaming stage that follows appears to do different work, favouring skills, patterns and the emotional colouring of what happened rather than the details of where and when.

The most striking demonstrations put the process under experimental control. Volunteers learn the positions of objects on a screen while a faint smell of roses fills the room; when the same smell is released during their slow-wave sleep, and only then, they remember the positions markedly better the next morning. The trick works with sounds as well, and it works selectively: cue half the material and that half is preferentially retained, at some cost to the rest. Nobody is teaching anything to a sleeping person here — the cueing merely nudges the brain towards one set of memories among many that are queued for consolidation. A ninety-minute nap performs much of the same work as a night, which is why the effect can be studied in an afternoon.

Sleep also matters before learning, not only after it. Volunteers kept awake for a night and then shown a long list of images take in markedly less of it than volunteers who have slept, and brain imaging locates the failure in the hippocampus itself, which behaves as though there were no room left to write in. On this account a night without sleep costs a student twice: once for the material learnt the day before, which is never properly filed, and once for the material of the following day, which is barely taken in.

If all this were simply storage, sleep would be a tape recorder. It is not. Sleep does not copy the day; it edits it. What survives the night is not a random sample: material that carries emotion, material that was rewarded, and — most tellingly — material that people have been told they will be tested on are all retained better than material they believe they may forget. Alongside this selection runs an opposite process. During waking hours the connections between neurons are strengthened almost indiscriminately, since the brain cannot know in advance what will matter; on one influential account, sleep then weakens those connections in proportion, so that the strongest survive the reduction while the weakest are erased. Both descriptions point the same way. The purpose of the night is not to keep everything but to decide what is worth keeping.

The clearest evidence that sleep reorganises rather than merely preserves comes from a famous problem-solving experiment. Volunteers were taught a laborious procedure for transforming strings of numbers, without being told that the procedure concealed a shortcut which produced the answer immediately. Those who slept between training and testing were about twice as likely to notice the hidden rule as those who spent the same hours awake. Nothing new entered the sleepers' heads overnight; what changed was the arrangement of what was already there, and the shortcut had become visible in the morning as it had not been the evening before.

None of this should be oversold, and some of it has been. Much of the human work is correlational, the effect sizes in memory studies are moderate rather than dramatic, and several well-publicised findings have proved difficult to reproduce with larger samples. But the direction of the evidence is remarkably consistent across species, methods and laboratories, and the practical implication is hard to avoid. We treat sleep as time subtracted from work and study, an expense to be cut when the timetable tightens. If the night is where the day is sorted, that accounting is exactly backwards. Early school starting times, which oblige adolescents to sit examinations at an hour when their body clocks are still hours from waking, are set against the biology of the very people they are meant to serve — and the several districts that have moved the school day later report the results one would predict.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer suggests that sleep", options: ["A is dangerous for most animals in the wild", "B is an active process concerned with recent experience", "C allows the brain to recover in the way a muscle does", "D was of little interest to researchers before the last decade"], answer: "B",
          explain: "The paragraph rejects the idea of rest and says the sleeping brain 'is going back over the day it has just had' — an active process dealing with recent experience. C is the view the writer says has been replaced.",
          evidence: "It is going back over the day it has just had",
          vocab: ["going back over the day", "concerned with recent experience"] },
        { n: 28, type: "mcq", prompt: "What do the experiments with smells and sounds show?", options: ["A that people are able to learn new material while asleep", "B that smells influence memory more powerfully than sounds", "C that the effect of sleep on memory appears only in laboratories", "D that a cue given during sleep can direct which memories are strengthened"], answer: "D",
          explain: "The cue 'nudges the brain towards one set of memories among many', and cueing half the material retains that half at the expense of the rest. The passage explicitly denies A: nobody is teaching a sleeping person anything.",
          evidence: "the cueing merely nudges the brain towards one set of memories",
          vocab: ["nudges the brain towards", "direct which memories"] },
        { n: 29, type: "mcq", prompt: "The writer describes the number-string experiment in order to show that sleep", options: ["A rearranges material rather than simply keeping it", "B is more useful for practical skills than for facts", "C works better for volunteers who have been trained", "D adds information that was not present beforehand"], answer: "A",
          explain: "The experiment is introduced as 'the clearest evidence that sleep reorganises rather than merely preserves': nothing new entered the sleepers' heads, only the arrangement changed. D states the opposite of the text.",
          evidence: "Nothing new entered the sleepers' heads overnight",
          vocab: ["reorganises rather than merely preserves", "rearranges rather than simply keeping"] },
        { n: 30, type: "mcq", prompt: "What is the writer's overall assessment of the research?", options: ["A It is convincing chiefly because so many species have been studied", "B It has been reproduced reliably in every large study", "C It is uneven in quality but points consistently in one direction", "D It is too weak to support any change in public policy"], answer: "C",
          explain: "The writer concedes correlational designs, moderate effect sizes and failures to reproduce, then says the direction of the evidence is 'remarkably consistent' — uneven quality, consistent direction. B contradicts the admitted replication problems.",
          evidence: "the direction of the evidence is remarkably consistent",
          vocab: ["difficult to reproduce", "uneven in quality"] },
        { n: 31, type: "ynng", prompt: "The sleeping brain is far less inactive than was once assumed.", answer: "YES",
          explain: "YES: the writer replaces the old 'rest' account with the claim that 'the sleeping brain is not resting at all' — precisely the statement's point.",
          evidence: "the sleeping brain is not resting at all",
          vocab: ["not resting at all", "far less inactive"] },
        { n: 32, type: "ynng", prompt: "Sleep keeps the previous day's experience without altering it.", answer: "NO",
          explain: "NO: the writer says flatly that sleep 'does not copy the day; it edits it', and that what survives is not a random sample — the statement is directly rejected.",
          evidence: "Sleep does not copy the day; it edits it",
          vocab: ["edits it", "altering it"] },
        { n: 33, type: "ynng", prompt: "Going without sleep reduces how much can be learnt the next day.", answer: "YES",
          explain: "YES: volunteers kept awake for a night 'take in markedly less' of a list of images than those who slept, and the writer says a sleepless night costs the student twice.",
          evidence: "take in markedly less of it than volunteers who have slept",
          vocab: ["take in markedly less", "reduces how much can be learnt"] },
        { n: 34, type: "ynng", prompt: "Naps taken in the afternoon are more effective than naps taken earlier in the day.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage says a ninety-minute nap does much of the work of a night, and that this is convenient to study in an afternoon, but it never compares naps at different times of day.",
          evidence: "A ninety-minute nap performs much of the same work as a night" },
        { n: 35, type: "ynng", prompt: "The human research described has established cause and effect beyond doubt.", answer: "NO",
          explain: "NO: the writer states that much of the human work is correlational, the effects are moderate, and several findings have not reproduced — the opposite of proof beyond doubt.",
          evidence: "Much of the human work is correlational",
          vocab: ["correlational", "cause and effect"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "learns quickly but holds material only for a short time.",
            "conflict with the biology of the students they are meant to serve.",
            "are replayed to the cortex far faster than they originally occurred.",
            "is more likely to be kept than material a person expects to lose.",
            "shows that emotion has no influence on what is remembered.",
            "reduces the day's connections in proportion, leaving the strongest intact.",
            "proves that new memories can be created in a sleeping person.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The hippocampus", answer: "A",
          explain: "The hippocampus 'learns in a single trial but holds what it learns only briefly', which ending A restates as learning quickly and holding material only for a short time. The cortex is the structure that keeps things for decades.",
          evidence: "learns in a single trial but holds what it learns only briefly",
          vocab: ["in a single trial", "quickly"] },
        { n: 37, type: "match", group: "ends", prompt: "During slow-wave sleep, the sequences of the previous day", answer: "C",
          explain: "The sequences are run through again in sharp-wave ripples and 'replayed to the cortex far faster than they originally occurred', so that an hour of experience takes seconds — ending C.",
          evidence: "replayed to the cortex far faster than they originally occurred" },
        { n: 38, type: "match", group: "ends", prompt: "The weakening of connections overnight", answer: "F",
          explain: "On the account the writer cites, sleep 'weakens those connections in proportion, so that the strongest survive' — ending F, with 'erased' matching the loss of the weakest. Ending E contradicts the passage on emotion.",
          evidence: "sleep then weakens those connections in proportion",
          vocab: ["in proportion, so that the strongest survive", "leaving the strongest intact"] },
        { n: 39, type: "match", group: "ends", prompt: "Material that people have been told they will be tested on", answer: "D",
          explain: "Such material is 'retained better than material they believe they may forget' — ending D, in which 'expects to lose' paraphrases 'believe they may forget'.",
          evidence: "material they believe they may forget",
          vocab: ["believe they may forget", "expects to lose"] },
        { n: 40, type: "match", group: "ends", prompt: "Early school starting times", answer: "B",
          explain: "The writer says early starts are 'set against the biology of the very people they are meant to serve', which ending B restates as conflicting with the students' biology.",
          evidence: "are set against the biology of the very people they are meant to serve",
          vocab: ["set against the biology", "conflict with the biology"] },
      ],
    },
  ],
};
