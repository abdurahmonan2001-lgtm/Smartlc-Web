// Smart LC Mock Test 10 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + people-matching), P3 argumentative
// (MCQ-4 + sentence endings + YNNG). Key quotas: TFNG ~40/40/20 with no
// runs of three, flat letters, unique concrete-noun answers.
export const MOCK10_READING = {
  id: "mock10-reading",
  bookId: "mock10",
  title: "Mock Test 10 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The rise of the elevator",
      passage: `The desire to be lifted without climbing is far older than the machine that finally made it safe. Roman engineers installed hoisting platforms beneath the arena of the Colosseum, where teams of slaves hauled on ropes to deliver wild animals and scenery up to the sand through hidden trapdoors. Medieval monasteries perched on cliffs raised their visitors and supplies in baskets swung from wooden cranes, and at least one Renaissance palace concealed a "flying chair" between floors for the comfort of an ageing monarch. All of these devices worked on the same principle — a platform, a rope and a source of muscle — and all of them shared the same alarming weakness.

That weakness became a matter of daily life during the Industrial Revolution. By the early nineteenth century, hoists driven by steam engines were common in factories, warehouses and mines, moving coal, cotton and machinery between floors far faster than human porters ever could. What they rarely moved was people. Every platform hung from a single rope of hemp or, later, of iron wire, and ropes wear out. When one parted, the platform simply fell to the bottom of the shaft, and everyone who worked in such buildings knew it. The problem of the elevator, as one historian has put it, was never lifting; it was falling.

The man who solved the problem did not set out to change the world's cities. In 1852, Elisha Graves Otis was employed as a master mechanic at a bedstead factory in Yonkers, near New York, where he was instructed to build a hoist for lifting heavy equipment to the upper floor. Knowing the grim reputation of such machines, Otis added something of his own invention. On top of the platform he mounted a metal spring taken from a wagon, connected it to the hoisting rope, and set its two ends close to a pair of notched guide rails. So long as the rope stayed taut, its tension held the spring flat and the platform ran freely; the moment the rope broke, the spring sprang outwards, jammed into the notches and locked the platform exactly where it was. Otis himself thought so little of the device that he did not at first patent it, and in the following year he sold only three of his "safety hoisters".

What changed his fortunes was a piece of pure theatre. At an exhibition in New York in 1854, Otis had himself hauled high above the crowd on an open platform loaded with barrels and crates. He then ordered an assistant, in full view of the audience, to cut the hoisting rope with an axe. Spectators screamed as the rope parted — and the platform dropped a few centimetres, caught on its rails, and held. "All safe, gentlemen, all safe," Otis announced, raising his hat. Orders at last began to arrive.

In 1857 his company installed the world's first passenger elevator for the public in a five-storey New York store selling imported china and glassware. Driven by steam, the car crawled upwards at less than twelve metres a minute, but speed was hardly the point: shoppers queued to ride it as an attraction in its own right, and the owner judged that the novelty repaid its cost in publicity alone. Grand hotels followed, furnishing their cars with mirrors, carpets and velvet benches to reassure nervous passengers that they were sitting in a small moving room, not dangling over a pit.

Even so, architects were surprisingly slow to build higher. For two decades after 1857, few commercial buildings rose beyond six or seven floors, partly because their thick load-bearing walls of brick and stone could support no more, and partly because steam cars were too slow to serve the floors above. Both limits fell together in the 1880s, when the first practical electric elevator was demonstrated in Germany. Electric machines were faster, smaller and far cheaper to run than steam, and when they were combined with the new steel skeleton frame, the skyscraper suddenly became possible. Within twenty years, American cities were competing to raise towers of thirty, forty and fifty storeys, every one of them entirely dependent on its elevators.

The machine also quietly rearranged life inside the building. For most of history, height had meant hardship: the top floors, reached by endless stairs, were the coldest and cheapest rooms in the house, traditionally occupied by servants, students and the poor. The elevator inverted that old hierarchy. Once the upper storeys could be reached without effort, they offered what the street never could — light, quiet and a view — and rents began to rise with the floor number. The word penthouse, which had once meant nothing grander than a rough shed leaning against a wall, was reborn as the name of the most expensive address in the building.

Elevators now complete billions of journeys every day, and per trip they are among the safest vehicles ever engineered; the brakes fitted to a modern cab are still direct descendants of Otis's spring and ratchet. The invention rarely receives the credit given to the car or the aeroplane, perhaps because a box that travels thirty metres seems too humble to count as transport. Yet without it, the modern city — a place that grows upwards rather than outwards — could not exist at all.`,
      questions: [
        { n: 1, type: "gap", prompt: "The great danger of early hoists was that the ______ supporting the platform could break.", note: "ONE WORD ONLY", answer: "rope" },
        { n: 2, type: "gap", prompt: "At the 1854 exhibition, the rope of Otis's platform was cut with an ______.", note: "ONE WORD ONLY", answer: "axe" },
        { n: 3, type: "gap", prompt: "Otis's safety device consisted of a metal ______ that jammed into notched rails.", note: "ONE WORD ONLY", answer: "spring" },
        { n: 4, type: "gap", prompt: "The first public passenger elevator was installed in a New York ______.", note: "ONE WORD ONLY", answer: "store" },
        { n: 5, type: "gap", prompt: "Early passenger elevators were powered by ______, which made them very slow.", note: "ONE WORD ONLY", answer: "steam" },
        { n: 6, type: "gap", prompt: "The highest floors of buildings were traditionally used by students, the poor and ______.", note: "ONE WORD ONLY", answer: "servants" },
        { n: 7, type: "gap", prompt: "The elevator turned the top of a building into its best address, giving new meaning to the word ______.", note: "ONE WORD ONLY", answer: "penthouse" },
        { n: 8, type: "tfng", prompt: "Lifting platforms of various kinds existed long before the nineteenth century.", answer: "TRUE" },
        { n: 9, type: "tfng", prompt: "Otis invented his safety device while running his own elevator company.", answer: "FALSE" },
        { n: 10, type: "tfng", prompt: "Otis's 1854 demonstration was reported in newspapers across America.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "Electric elevators operated at higher speeds than steam-powered ones.", answer: "TRUE" },
        { n: 12, type: "tfng", prompt: "Very tall buildings appeared as soon as the first passenger elevator opened.", answer: "FALSE" },
        { n: 13, type: "tfng", prompt: "The writer believes the elevator changed which floors of a building people wanted to occupy.", answer: "TRUE" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The loudest problem in the city",
      passage: `A — Stand at a busy junction in any large city and the sound around you will probably measure seventy decibels or more — roughly the level of a vacuum cleaner held at arm's length, sustained for most of the day. Traffic is the dominant source, but construction sites, sirens, delivery vans and crowded night-time streets each add their own layer, and in many districts the total never falls low enough for proper rest, even in the small hours. According to the World Health Organization, environmental noise now ranks second only to air pollution among environmental threats to health in Europe, where well over one hundred million people are exposed to traffic noise above recommended levels. The problem is growing fastest in the rapidly expanding cities of Asia, Africa and Latin America, yet noise remains, in the words of one campaigner, "the pollutant nobody photographs": invisible, unglamorous, and easy for governments to push down the agenda.

B — The harm goes far beyond irritation, argues Ingrid Halvorsen, an epidemiologist who has spent two decades studying communities living close to airports and motorways. "The ear has no lid," she says. "While you sleep, your brain goes on processing sound, and your body responds to it. Heart rate climbs, blood pressure rises, and stress hormones are released — even in people who do not remember waking at all." Repeated night after night, this invisible disturbance accumulates: large long-term studies now link chronic exposure to road and aircraft noise with raised risks of high blood pressure and heart disease, effects that remain after air quality and income are taken into account. The residents most affected, Halvorsen notes, often insist that they have "got used to" the noise. Their bodies, her data suggest, have not.

C — You cannot manage what you do not measure, and many governments do now measure. European law, for example, requires larger cities to produce detailed noise maps every five years, charting the din street by street, and to publish action plans in response. Rosa Delgado, who spent fifteen years as a city environmental officer, is blunt about what happens next. "The maps get made, because the law says they must. Then they get filed," she says. The action plans that follow, she points out, tend to be written in careful conditional language — measures that "could be considered" — and are issued without budgets or deadlines attached. "Measurement has quietly become a substitute for action. A map, after all, is much cheaper than a quiet road."

D — Noise is also a matter of money, and of fairness. The economist Anton Weiss has tracked apartment prices along arterial roads, railway corridors and flight paths in a dozen cities, and calculates that each additional decibel of steady traffic noise shaves a measurable percentage from a home's value. The result is that quiet has become a luxury good, purchased through rent. Housing beside the loudest infrastructure is the cheapest available, so it is occupied disproportionately by poorer residents, who then carry the health costs that Halvorsen's research describes. "Lay a noise map over an income map," Weiss says, "and you are looking at almost the same picture. Exposure to noise is one of the clearest environmental inequalities we have."

E — None of this means that cities are helpless, and the engineering toolkit is improving. Worn road surfaces can be relaid with porous, low-noise asphalt that cuts traffic sound by three to five decibels; modern tyre standards quieten vehicles at the source; electric buses remove engine roar from the busiest corridors; earth banks and glazed barriers deflect sound away from homes; lower night-time speed limits and restrictions on late deliveries move heavy lorries away from sleeping streets. No single measure transforms a city — each is worth only a few decibels — but the gains add up, and because loudness is perceived logarithmically, a total reduction of ten decibels sounds to residents like a halving of the noise. The obstacle, in other words, is rarely technical possibility: the methods are well understood, and several northern European cities have already shown that a determined programme can make whole districts measurably calmer within a decade. Priya Raman, an acoustics engineer who advises vehicle regulators, nevertheless believes that cities are working at the wrong scale. "A noise barrier protects one street. A tighter limit on tyre and engine noise protects every street in the country at once," she says. The decisive reductions, on her account, will come from the standards imposed on manufacturers rather than from anything a mayor can build.

F — A final group of researchers argues that cutting decibels is only half the task. Daniel Mensah, an urban planner, points out that people's reaction to sound depends on its source as much as its level: in listening experiments, volunteers rate birdsong and running water as pleasant at volumes at which traffic is judged unbearable. Planners, he argues, should therefore design "soundscapes" rather than merely police noise — fountains positioned to mask nearby traffic, dense planting that both absorbs sound and adds its own, and legally protected quiet areas in parks where citizens can recover from the acoustic pressure of the streets. "A good city is not a silent city," Mensah says. "It is a city where you can hear the things worth hearing."`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a reason why official noise measurements seldom lead to change", answer: "C" },
        { n: 15, type: "match", group: "minfo", prompt: "examples of technical measures that reduce traffic noise", answer: "E" },
        { n: 16, type: "match", group: "minfo", prompt: "a comparison between noise and another environmental health threat", answer: "A" },
        { n: 17, type: "match", group: "minfo", prompt: "evidence that noise affects people who are not conscious of it", answer: "B" },
        { n: 18, type: "gap", group: "sum10", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why city noise matters",
            lines: [
              "Noise harms more than our mood. Even during {{18}}, the body reacts: blood pressure rises and stress {{19}} are released,",
              "and over the years this raises the risk of {{20}} disease. The burden is unfair, because housing near loud roads is cheap and therefore occupied largely by {{21}} residents.",
              "Engineers can help, for example by relaying road {{22}} with low-noise asphalt, though each measure saves only a few decibels.",
            ],
          },
          answer: "sleep" },
        { n: 19, type: "gap", group: "sum10", answer: "hormones" },
        { n: 20, type: "gap", group: "sum10", answer: "heart" },
        { n: 21, type: "gap", group: "sum10", answer: "poorer" },
        { n: 22, type: "gap", group: "sum10", answer: "surfaces" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Ingrid Halvorsen", "Rosa Delgado", "Anton Weiss", "Daniel Mensah", "Priya Raman"],
          rubric: "Match each statement with the correct person, A–E.",
          prompt: "Cities should add pleasant sounds as well as remove unpleasant ones.", answer: "D" },
        { n: 24, type: "match", group: "people", prompt: "The pattern of noise exposure closely follows the pattern of income.", answer: "C" },
        { n: 25, type: "match", group: "people", prompt: "The body responds to noise even when a person does not wake up.", answer: "A" },
        { n: 26, type: "match", group: "people", prompt: "Legal requirements to record noise levels have rarely produced practical results.", answer: "B" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The ten-thousand-hour question",
      passage: `What separates the concert violinist from the competent amateur, or the chess grandmaster from the enthusiastic club player? For most of history, the answer seemed obvious: a gift. Talent was understood as something like height — innate, unevenly distributed and largely beyond our control — and practice merely allowed the gifted to display what nature had already decided. In the late twentieth century, however, a group of psychologists mounted a radical challenge to this view. Greatness, they argued, is not born but built, and the building material is a very particular kind of work.

The foundational evidence came from a study of violinists at a music academy in Berlin. Researchers asked the professors to divide their students into three groups — likely international soloists, good performers, and those headed for careers as teachers — and then reconstructed each student's musical life through interviews and practice diaries. The groups were strikingly similar in most respects: they had begun lessons at about the same age, studied with comparable teachers and devoted similar total time to music. What separated them was one variable: the accumulated hours of solitary, effortful practice. By the age of twenty, the best violinists had amassed around ten thousand such hours, roughly twice the total of the future teachers. From this and later work came the concept of deliberate practice: activity designed specifically to improve performance, aimed at weaknesses just beyond current ability, guided by immediate feedback, and so mentally demanding that it can be sustained for only a few hours a day. Crucially, it is not the same as experience, and it is rarely enjoyable; playing through a favourite piece yet again is repetition, not improvement.

The idea escaped the laboratory in simplified form. A bestselling book compressed the research into a memorable slogan — the "ten-thousand-hour rule" — and the figure took on a life of its own, quoted in classrooms, boardrooms and sports academies as the price of mastery. The original researchers protested, with limited success. Ten thousand hours, they pointed out, had been an average across a group, not a threshold for individuals: some violinists had needed far fewer hours, others far more. Worse, the slogan ignored the quality of practice altogether, implying that any ten thousand hours would do, when the whole point of the research had been that only a rare, deliberate kind of work produces improvement.

Then came the counter-attack. In 2014, researchers pooled the results of eighty-eight separate studies covering more than eleven thousand participants, asking how much of the difference between performers practice could actually explain. The answer, averaged across all domains, was about twelve per cent. The figure varied revealingly by field: deliberate practice accounted for roughly a quarter of the variation in games such as chess, about a fifth in music, and a little less in sport — but only four per cent in education and almost nothing in the professions, where the tasks are less predictable and the rules keep changing. Practice mattered everywhere; it was decisive nowhere. Something else, evidently, was doing much of the work.

What might that something be? Age of starting is one candidate: several studies find that musicians who began training as young children outperform later starters even when their total accumulated hours are identical, a difference the practice framework alone could not explain. Basic cognitive capacities are another: measures of working memory predict skills such as sight-reading music over and above the effect of practice. Genetics contributes in a subtler way than the old idea of a "gift" suggested. Large studies of twins indicate that musical aptitude is partly heritable — but so, remarkably, is the propensity to practise in the first place. The willingness to spend thousands of solitary hours at an instrument appears itself to be influenced by temperament, and temperament by genes. Nature and nurture, on this evidence, are not opposing forces but entangled ones: practice does not simply compete with talent, it partly expresses it.

Where does this leave the ambitious learner? Neither of the old, comfortable stories survives. The pure-talent view fails, because no domain has yet produced an expert who skipped the years of structured work. The pure-practice view fails too, because identical hours produce stubbornly different results. Yet the practical conclusion is not gloomy, and it need not discourage anyone. Among all the factors that shape expertise, deliberate practice remains the largest one that a person can actually control, and its central insights — work at the edge of your ability, seek immediate feedback, expect improvement to feel uncomfortable — have been confirmed in domain after domain, whatever the final percentages turn out to be. The honest summary of thirty years of research is brief: deliberate practice is necessary, and it is not sufficient. The argument about everything else — genes, timing, memory, luck — continues, and is likely to continue for some time.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the Berlin study, the best violinists differed from the others mainly in", options: ["A the age at which they had started lessons", "B the total time they had spent practising alone", "C the quality of the teachers they studied with", "D how much they enjoyed practising"], answer: "B" },
        { n: 28, type: "mcq", prompt: "The original researchers objected to the \"ten-thousand-hour rule\" because it", options: ["A underestimated the hours that experts need", "B was based on the wrong group of musicians", "C turned a group average into a fixed target and ignored quality", "D applied only to music"], answer: "C" },
        { n: 29, type: "mcq", prompt: "The writer cites the 2014 pooled analysis to show that", options: ["A practice explains only a modest share of the difference between performers", "B practice has no effect outside music and chess", "C the Berlin study had been dishonestly reported", "D experts practise less than had been assumed"], answer: "A" },
        { n: 30, type: "mcq", prompt: "In the final paragraph, the writer concludes that deliberate practice", options: ["A should be abandoned as a scientific theory", "B matters only for those who begin in childhood", "C guarantees expertise in games and music", "D is the most useful factor that a learner can control"], answer: "D" },
        { n: 31, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "was an average across a group, not a target for individuals.",
            "predicts success more strongly in games and music than in the professions.",
            "demands effort and feedback rather than enjoyable repetition.",
            "shows that talent can be detected in early childhood.",
            "may itself be influenced by a person's genes.",
            "has no connection with expert performance.",
            "explained differences that hours of practice could not.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Deliberate practice, as originally defined,", answer: "C" },
        { n: 32, type: "match", group: "ends", prompt: "The figure of ten thousand hours", answer: "A" },
        { n: 33, type: "match", group: "ends", prompt: "The amount of practice a person accumulates", answer: "B" },
        { n: 34, type: "match", group: "ends", prompt: "The age at which musicians began their training", answer: "G" },
        { n: 35, type: "match", group: "ends", prompt: "The tendency to keep practising persistently", answer: "E" },
        { n: 36, type: "ynng", prompt: "The writer accepts that deliberate practice is different from simply repeating an activity.", answer: "YES" },
        { n: 37, type: "ynng", prompt: "The writer believes the 2014 analysis proved that practice is unimportant.", answer: "NO" },
        { n: 38, type: "ynng", prompt: "The writer thinks employers should test the working memory of job applicants.", answer: "NOT GIVEN" },
        { n: 39, type: "ynng", prompt: "The writer believes the genetic findings need not discourage learners.", answer: "YES" },
        { n: 40, type: "ynng", prompt: "The writer considers the scientific debate about expertise to be settled.", answer: "NO" },
      ],
    },
  ],
};
