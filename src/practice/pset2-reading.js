// Smart LC Practice Set 2 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching with one extra name),
// P3 argumentative science (MCQ-4 + YNNG + summary from a wordlist box).
// Key quotas: TFNG/YNNG balanced with no runs of three, flat letters,
// unique concrete-noun answers, correct MCQ options paraphrase the text.
export const PSET2_READING = {
  id: "pset2-reading",
  bookId: "pset2",
  title: "Practice Set 2 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Building the Roman roads",
      passage: `In 312 BC the Roman censor Appius Claudius Caecus persuaded the Senate to pay for a road running south-east from Rome towards the city of Capua, more than two hundred kilometres away. The road took his name — the Via Appia — and it set the pattern for everything that came after it. Its purpose was frankly military. Rome was at war with the Samnite peoples of the southern hills, and its armies were struggling along tracks that turned to mud every winter. A properly built road allowed legions, couriers and supply wagons to move at a predictable speed in every season, and that predictability, more than any weapon, was what allowed a middling Italian city to hold together an empire. Over the following five centuries the same logic pushed roads outwards to Spain, Gaul, Britain, the Danube and North Africa, until the network of paved highways measured something like eighty thousand kilometres.

A road began not with stone but with sighting. Professional surveyors planned the route, and their essential instrument was the groma: an upright staff carrying two crossed arms, from the ends of which four cords hung, each weighted with a plumb bob. By sighting along pairs of these cords, a surveyor could project a perfectly straight line across country, or set out an exact right angle. On longer stretches, surveying parties worked from one piece of high ground to the next, using smoke from signal fires to keep their alignments true. The chosen line was then marked out on the ground with wooden stakes, and work gangs followed behind, felling trees and clearing boulders. The celebrated straightness of Roman roads was never an aesthetic choice: a straight road is the shortest road, it is cheaper to build and quicker to march along, and it offers fewer blind corners in which an enemy can wait. Faced with rising ground, Roman engineers usually preferred to cut directly through a hill rather than curve around it, and where the land turned to marsh they lifted the road onto an embankment.

The building itself followed a remarkably consistent recipe. Workers first dug a trench along the marked line, deep enough to reach firm ground. Into this excavation went a foundation of large stones, packed tightly together; over that came a layer of smaller broken stones, often bound with lime mortar; and above that a bed of coarse sand or fine gravel was rolled firm to take the surface. On ordinary routes the surface was compacted gravel, but on great highways it was made of thick paving slabs, cut to fit one another so closely that carts rolled over the joints without jolting. Crucially, the finished surface was never flat. It was built with a pronounced camber, rising towards the centre, so that rainwater ran off at once into the drainage ditches dug along both sides of the road. Heavy kerbstones held the edges in place, and in many towns raised stepping stones allowed pedestrians to cross without muddying their feet. A well-drained road, the engineers understood, is a road that survives frost, flood and traffic.

Who did the work? Contractors and local labour played their part, but on the frontiers much of the building was carried out by soldiers themselves. Roman commanders regarded construction as a legitimate use of a legion, and road building kept troops fit, disciplined and usefully occupied between campaigns; several surviving inscriptions proudly record which legion laid which stretch of highway. The finished road was then furnished with information. Cylindrical stone pillars nearly two metres tall were set up at intervals of one Roman mile, recording the distance to the nearest city and the name of the emperor under whom the stone was raised. Travellers could judge their progress from milestones alone, and so, for the first time in Europe, a journey could be planned in advance with real confidence.

The state added one further refinement: an official courier and transport service. Along the main highways stood relay stations, spaced roughly a day's ride apart for lodging and much closer for changes of animals, where messengers on government business exchanged tired horses for fresh ones and rode on. A dispatch could cover eighty kilometres in a day, and far more in an emergency. The service was strictly reserved for those travelling on the business of the state; a private citizen, however wealthy, was expected to make his own arrangements on the road.

Rivers were crossed on bridges of timber or arched stone, some of them among the boldest engineering of the ancient world. After the empire in the west collapsed, the skills behind all this faded, and medieval builders quarried the old highways for their stone. Yet the routes themselves refused to die. Traffic continued to follow the firm, straight, well-drained lines the surveyors had chosen, and across Europe today countless modern roads, and even railway lines, still run along alignments plotted by men with a groma more than two thousand years ago.`,
      questions: [
        { n: 1, type: "gap", prompt: "Surveyors set out straight lines and right angles using an instrument called a ______.", note: "ONE WORD ONLY", answer: "groma" },
        { n: 2, type: "gap", prompt: "The route of a new road was marked on the ground with wooden ______.", note: "ONE WORD ONLY", answer: "stakes" },
        { n: 3, type: "gap", prompt: "Before laying any stone, workers dug a ______ that reached down to firm ground.", note: "ONE WORD ONLY", answer: "trench" },
        { n: 4, type: "gap", prompt: "Because of the road's camber, ______ drained quickly into ditches at the sides.", note: "ONE WORD ONLY", answer: "rainwater" },
        { n: 5, type: "gap", prompt: "Travellers could measure how far they had gone by using the ______ placed along the road.", note: "ONE WORD ONLY", answer: "milestones" },
        { n: 6, type: "gap", prompt: "On the frontiers, roads were often built by ______ rather than hired workers.", note: "ONE WORD ONLY", answer: "soldiers" },
        { n: 7, type: "gap", prompt: "Government messengers collected fresh horses at relay ______ along the main highways.", note: "ONE WORD ONLY", answer: "stations" },
        { n: 8, type: "tfng", prompt: "The Via Appia was named after the official who arranged for it to be built.", answer: "TRUE" },
        { n: 9, type: "tfng", prompt: "Roman engineers preferred to take a road around a hill rather than through it.", answer: "FALSE" },
        { n: 10, type: "tfng", prompt: "A major Roman road usually took more than ten years to complete.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "Road building was considered a useful way of occupying soldiers between wars.", answer: "TRUE" },
        { n: 12, type: "tfng", prompt: "Wealthy private travellers were allowed to use the official relay service.", answer: "FALSE" },
        { n: 13, type: "tfng", prompt: "Some Roman bridges still carry modern traffic today.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Turbines among the rooftops",
      passage: `A — Cities consume the great majority of the world's electricity, yet almost none of it is generated where it is used. Power arrives from distant plants along transmission lines that lose a share of their cargo on the way and cost billions to build and maintain. The appeal of urban wind power is therefore easy to state: if even a fraction of a city's electricity could be made on its own rooftops, that fraction would arrive with no losses, no new pylons and no fuel bill. Over the past two decades this promise has produced a lively market in small wind turbines — machines with blades a metre or two across, sold to householders, schools and city councils — and, alongside it, a running argument about whether they can ever deliver.

B — The difficulty is that a city is one of the worst wind environments on Earth. Wind approaching over open country is slowed by every obstacle it meets, and buildings do more than slow it: they tear the smooth flow into gusts and swirling eddies, a condition engineers call turbulence. Above a rooftop, the wind rarely blows steadily from anywhere for long; its speed rises and collapses within seconds, and its direction swings constantly around the compass. This is a serious problem for the conventional turbine of the wind farm, a horizontal-axis machine that must swivel so that its propeller faces squarely into the wind before it can work efficiently. The aerodynamicist Elena Vasquez, who has spent years measuring rooftop airflow, puts it bluntly: in a city street, the wind changes direction faster than any machine can follow, and by the time a rooftop turbine has turned to face a gust, the gust has gone.

C — Hence the growing interest in a different architecture: the vertical-axis wind turbine. Instead of a propeller on a horizontal shaft, its blades revolve around an upright shaft, sweeping a path like a carousel. Some designs use simple curved scoops that the wind pushes round; others use vertical aerofoil blades that generate lift as they slice through the air. The arrangement has one decisive advantage in a city: it accepts wind from any direction, instantly, with no need to swivel at all. It has quieter virtues too. Its blade tips travel more slowly than a propeller's, so the machine produces far less of the whistling aerodynamic noise that makes neighbours object to rooftop turbines, and the slower, smoother rotation transmits much less vibration into the structure of the building beneath. A machine that upsets nobody, its makers argue, can be placed where the people and the demand actually are.

D — Whether it earns its keep is another matter. The most sobering evidence comes from field trials in which real machines on real buildings were monitored for months. The energy analyst Tomas Lindgren led one of the largest, tracking dozens of small turbines installed across several European cities, and his conclusion was blunt: on average the machines generated less than a tenth of the electricity their manufacturers advertised, and a typical installation met only a few per cent of a household's annual demand. Some units, over a windless winter, actually consumed more power than they produced, because their electronics drew a constant trickle from the grid. The chief culprit was not the technology but the siting: buyers had mounted turbines on low roofs, behind taller buildings, in air too slow and too disturbed for any design to harvest.

E — Those results have pushed the industry towards humbler and more sensible niches. Where a connection to the grid is impractical or expensive, the arithmetic changes completely. The engineer Peter Novak, who designs off-grid systems, points out that a small vertical-axis turbine charging a battery can run a streetlight, a river-level sensor or a remote traffic sign for years unattended, and that the cheapest cable is the one you never have to lay. Many such units pair the turbine with a solar panel, since wind is often strongest in the dark winter months when the panel contributes least; between them, the two sources keep the battery alive through the year.

F — And the machines may earn value in a currency other than kilowatt-hours. The urban planner Miriam Adeyemi argues that a turbine spinning above a school or a library is the most visible statement a city can make about energy — unlike insulation or efficient boilers, it is renewable energy that citizens can actually watch working, and schools report that it changes how pupils talk about electricity. Architects have begun to design for it: Sofia Marchetti has drawn office towers whose curved facades deliberately funnel and accelerate wind towards turbines built into the structure itself. Urban wind will never power a city, its defenders concede. But specified honestly, sited carefully and priced against the alternatives, the small vertical-axis turbine is finding the places where it genuinely belongs.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a description of the wind conditions that make cities difficult for turbines", answer: "B" },
        { n: 15, type: "match", group: "minfo", prompt: "examples of small turbines being used where a grid connection is impractical", answer: "E" },
        { n: 16, type: "match", group: "minfo", prompt: "a comparison between the electricity turbines actually produced and the amounts promised", answer: "D" },
        { n: 17, type: "match", group: "minfo", prompt: "an explanation of why a slower-moving turbine disturbs residents less", answer: "C" },
        { n: 18, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why city wind is hard to harvest",
            lines: [
              "Conventional turbines need smooth, steady airflow, but buildings tear the wind into gusts and eddies — a condition known as {{18}}.",
              "A horizontal-axis machine must also swivel to face the wind, and its fast-moving blade tips create the aerodynamic {{19}} that neighbours complain about.",
              "A vertical-axis turbine avoids both problems: it accepts wind from any {{20}} without turning,",
              "and its smoother rotation passes far less {{21}} into the building below.",
              "Even so, trials show a typical rooftop machine supplies only a few per cent of a household's annual {{22}}.",
            ],
          },
          answer: "turbulence" },
        { n: 19, type: "gap", group: "sum2", answer: "noise" },
        { n: 20, type: "gap", group: "sum2", answer: "direction" },
        { n: 21, type: "gap", group: "sum2", answer: "vibration" },
        { n: 22, type: "gap", group: "sum2", answer: "demand" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Elena Vasquez", "Tomas Lindgren", "Miriam Adeyemi", "Peter Novak", "Sofia Marchetti"],
          rubric: "Match each statement with the correct person, A–E. NB There is one more name than you need.",
          prompt: "City wind shifts direction more quickly than a machine can turn to follow it.", answer: "A" },
        { n: 24, type: "match", group: "people", prompt: "Small turbines produced far less electricity than their makers claimed.", answer: "B" },
        { n: 25, type: "match", group: "people", prompt: "Avoiding the cost of laying a cable can make a small turbine worthwhile.", answer: "D" },
        { n: 26, type: "match", group: "people", prompt: "A visible turbine can change the way people think about energy.", answer: "C" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The scent of the past",
      passage: `It is among the most familiar of mental ambushes. A stranger's perfume in a lift, a corridor smelling of floor polish, woodsmoke on a cold evening — and suddenly, uninvited, a scene from decades ago stands fully formed in the mind: a grandmother's hallway, a first classroom, a holiday shore. Writers noticed the phenomenon long before science did, and it now carries a literary name: the Proust phenomenon, after the French novelist whose narrator is transported to his childhood by the taste and smell of a small cake dipped in tea. For most of the twentieth century such episodes belonged to memoir and anecdote, cherished but unexamined. Over the past three decades, however, psychologists have brought the experience into the laboratory, asking whether smell really does have a privileged key to memory — and, if so, what kind of key it is.

The case begins with anatomy, and the anatomy is genuinely unusual. Signals from the eyes, ears, skin and tongue all pass through the thalamus, a central relay deep in the brain, before being distributed to the cortex for analysis. Smell alone skips the queue. Neurons in the lining of the nose report to the olfactory bulb, at the base of the brain, and from there the signal passes almost directly — across remarkably few connections — into the amygdala, a structure central to emotion, and the neighbouring hippocampus, which is essential for laying down long-term memories. No other sense enjoys so short a route into the machinery of feeling and remembering. On wiring alone, a neuroscientist might predict that memories awakened through the nose would arrive with an emotional charge that memories awakened through words or pictures lack.

That is broadly what the experiments find. In a typical study, volunteers are given a cue — sometimes as a word, sometimes as a picture, sometimes as the odour itself — and asked to describe whatever personal memory it summons. Memories evoked by odours are consistently rated as more emotional than those evoked by the same item in verbal or visual form; volunteers more often report the uncanny sense of being carried back into the original scene rather than merely recalling it. The memories are not produced any faster, and they are no richer in checkable detail, but they differ strikingly in their dating. When cues are words, remembered episodes cluster in adolescence and early adulthood, the familiar "reminiscence bump" of autobiographical memory. When the cues are smells, the distribution slides backwards: odour-evoked memories cluster in the first decade of life, most densely before the age of ten. A smell, it seems, is a corridor to childhood.

Yet the strongest claims deserve the coldest water, and several researchers have supplied it. The feeling of being transported, they note, is just that — a feeling. When experimenters test what can actually be verified, the picture changes. In studies where the original events are known — staged episodes, for instance, engineered with distinctive ambient odours and revisited months later — memories retrieved through smell are no more accurate than memories retrieved any other way. Their emotional intensity, meanwhile, inflates confidence: people feel surest about precisely the recollections that smell has made vivid. Sceptics add that odour-evoked memories are rare treasures, arriving perhaps a handful of times a year, and that a memory system truly organised around smell would show its advantages more often. Vividness, in short, is not accuracy, and a memory that moves us is not thereby a memory we should trust.

None of this has discouraged those who see practical value in the link. Retailers scent their shops in the hope that the smell, and the warm associations it plants, will be revisited along with the memory of the merchandise. More seriously, clinicians have begun to take the nose into account. Odour cues are being tested as aids for recovering autobiographical memories in depression, where recall tends to turn grey and general. The traffic also runs the other way: people who lose their sense of smell after infections or head injuries frequently describe a flattening of emotional life that outsiders underestimate — food loses its comfort, other people their familiar signatures, the past one of its doors. Clinical surveys repeatedly find raised rates of depression among such patients, a reminder that this quiet sense is threaded through wellbeing far more deeply than its reputation suggests.

What remains is a scientific field still young enough to be honest about its ignorance. Why one odour unlocks a memory while another, equally familiar, unlocks nothing; why the effect favours early childhood so strongly; how much is anatomy and how much the simple fact that smells are hard to put into words and so escape the retellings that wear other memories smooth — none of this is settled. The nose, it is clear, holds a genuine and peculiar key to the past. What the key opens, and how far it can be trusted, the laboratory has only begun to learn.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer's main purpose is to", options: ["A explain how the nose detects different odours", "B show that writers understand memory better than scientists", "C introduce a common experience that science has begun to study", "D argue that smell is the most powerful of the senses"], answer: "C" },
        { n: 28, type: "mcq", prompt: "According to the second paragraph, smell differs from the other senses in that its signals", options: ["A reach the brain's emotion and memory regions more directly", "B are analysed on both sides of the brain at once", "C travel more slowly to the cortex", "D pass through the thalamus twice"], answer: "A" },
        { n: 29, type: "mcq", prompt: "Compared with memories triggered by words, memories triggered by smells tend to", options: ["A contain more detail that can be checked", "B come to mind more quickly", "C be recalled with less confidence", "D date from earlier in a person's life"], answer: "D" },
        { n: 30, type: "mcq", prompt: "The writer mentions the staged-event studies in order to show that", options: ["A odour-evoked memories are usually invented", "B the vividness of a memory is no guarantee that it is correct", "C laboratory research on smell is unreliable", "D emotional memories fade more slowly than others"], answer: "B" },
        { n: 31, type: "ynng", prompt: "The direct connection between smell and the brain's emotion centres is physically real.", answer: "YES" },
        { n: 32, type: "ynng", prompt: "Proust was the first person to notice that smells can trigger memories.", answer: "NOT GIVEN" },
        { n: 33, type: "ynng", prompt: "Memories evoked by smells are more accurate than memories evoked in other ways.", answer: "NO" },
        { n: 34, type: "ynng", prompt: "Losing the sense of smell can damage a person's emotional wellbeing.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "Science has now fully explained the link between smell and memory.", answer: "NO" },
        { n: 36, type: "gap", group: "wl",
          box: ["emotion", "shortcut", "childhood", "vividness", "accuracy", "language", "survival", "marketing", "confidence"],
          boxTitle: "List of Words",
          notes: {
            title: "Summary — Why smells bring back the past",
            lines: [
              "Unlike signals from the other senses, smell signals take a {{36}} to the brain's emotion and memory centres.",
              "This wiring may explain why memories cued by odours carry so much {{37}}.",
              "Such memories also reach back unusually far, most often into early {{38}}.",
              "Sceptics point out that when their details are checked, these memories show no advantage in {{39}},",
              "so what truly sets them apart is their {{40}}.",
            ],
          },
          answer: "B" },
        { n: 37, type: "gap", group: "wl", answer: "A" },
        { n: 38, type: "gap", group: "wl", answer: "C" },
        { n: 39, type: "gap", group: "wl", answer: "E" },
        { n: 40, type: "gap", group: "wl", answer: "D" },
      ],
    },
  ],
};
