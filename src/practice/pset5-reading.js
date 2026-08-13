// Smart LC Practice Set 5 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET5_READING = {
  id: "pset5-reading",
  bookId: "pset5",
  title: "Practice Set 5 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Reading tomorrow's sky",
      passage: `People have always needed to know what the weather would do next, and for most of history they read the answer from the sky itself. Farmers and sailors passed on rules of thumb in rhymes: a red sky in the evening promised a fine morning, a ring around the moon meant rain on the way. Some of these sayings contain a grain of physics, and many more do not, but for thousands of years they were all anyone had. The first person to treat the weather as a subject worth systematic thought was the Greek philosopher Aristotle, whose book Meteorologica, written around 340 BC, attempted to explain clouds, wind, rain and thunder. Much of it was wrong, yet such was Aristotle's authority that his account remained the standard European explanation of the weather for nearly two thousand years.

Real progress had to wait for instruments, because the sky keeps its most useful secrets invisible. In the early seventeenth century, Galileo and his circle in Italy devised the first crude thermometer, and in 1643 his pupil Evangelista Torricelli produced something far more important. Investigating why pumps could not raise water beyond a certain height, Torricelli filled a glass tube with mercury, upended it in a dish, and found that the metal column stood about seventy-six centimetres high, held up by the weight of the air pressing on the dish. He had invented the barometer, and with it the discovery that the atmosphere itself has weight. It took decades for observers to notice the instrument's practical value: the column did not stand still. When the mercury fell steadily, foul weather usually followed; a rising column promised calm. The barometer, in other words, felt tomorrow's storms before any human eye could see them, and by the eighteenth century observers across Europe were keeping daily records of pressure, temperature and wind.

Those records exposed a frustrating problem. Weather is not local: the storm that ruins a harvest in one country was yesterday somewhere else. A network of observers could, in principle, track weather as it travelled, but their letters moved no faster than a mail coach, so the storm always arrived before the warning. The solution appeared in the 1840s with the electric telegraph. For the first time, observations made that morning in dozens of distant towns could be gathered on a single desk while the weather they described was still on its way. Distant readings could now be drawn together on a chart of the whole country at a single hour, and the chart could be redrawn as the pattern moved.

The pioneer who turned this possibility into a public service was Robert FitzRoy, a British naval officer appointed in 1854 to head a new government office collecting weather statistics for sailors. In 1859 a violent storm wrecked the ship Royal Charter off the coast of Wales with the loss of over four hundred lives, and the disaster convinced FitzRoy that prediction, not record-keeping, was his real duty. He organised a system of storm warnings: coastal stations telegraphed their readings to London, and when danger threatened, signals were hoisted in the harbours to keep fishing boats at home. In 1861 he went further and began publishing predictions of the next day's weather in a London newspaper, inventing a new word for them — forecasts. The public read them eagerly; the scientific establishment was appalled by their frequent failures, and rival papers made fun of the forecasts whenever rain fell on a promised fine day. Exhausted and disheartened, FitzRoy died in 1865, and his daily forecasts were suspended soon afterwards, though the storm warnings survived.

The next revolution was mathematical. Around 1900 the Norwegian physicist Vilhelm Bjerknes argued that the atmosphere obeys the laws of physics, so its future state could in principle be calculated from its present one. The English scientist Lewis Fry Richardson took up the challenge, and while serving as an ambulance driver in the First World War he worked through the immense arithmetic by hand, spending the better part of two years computing a single six-hour forecast for one spring day in 1910. The result was wildly wrong, but the method was sound, and Richardson saw exactly what it lacked: speed. He imagined a vast circular theatre holding sixty-four thousand human computers, each calculating the weather for one small district, kept in step by a conductor at the centre — a fantasy, he admitted, but a precise description of what was needed.

What was needed arrived as electronics. In 1950 the American computer ENIAC produced the first forecast ever calculated by machine; it took roughly twenty-four hours to compute the next twenty-four hours of weather, barely keeping pace with the sky it described. Machines soon outran the weather, and in 1960 the satellite TIROS-1 began transmitting photographs of the clouds from orbit, so that storms brewing far out over the oceans, invisible to every land station, could at last be watched as they formed.

Forecasters today run their models dozens of times with slightly varied starting conditions, reading the spread of results as a measure of confidence. Chaos sets a horizon of roughly two weeks on useful detail, yet within it the gains have been steady: a five-day forecast now is about as reliable as a one-day forecast was in 1980.`,
      questions: [
        { n: 1, type: "gap", prompt: "Torricelli's barometer consisted of a dish and a glass tube filled with ______.", note: "ONE WORD ONLY", answer: "mercury" },
        { n: 2, type: "gap", prompt: "The barometer could sense coming ______ before anyone was able to see them.", note: "ONE WORD ONLY", answer: "storms" },
        { n: 3, type: "gap", prompt: "From the 1840s, the ______ allowed distant observations to be collected while the weather was still travelling.", note: "ONE WORD ONLY", answer: "telegraph" },
        { n: 4, type: "gap", prompt: "FitzRoy's daily predictions appeared in a London ______.", note: "ONE WORD ONLY", answer: "newspaper" },
        { n: 5, type: "gap", prompt: "Richardson pictured thousands of human computers working together inside an enormous circular ______.", note: "ONE WORD ONLY", answer: "theatre" },
        { n: 6, type: "gap", prompt: "From 1960, TIROS-1 sent back pictures of the ______ taken from space.", note: "ONE WORD ONLY", answer: "clouds" },
        { n: 7, type: "tfng", prompt: "Aristotle's explanation of the weather was accepted in Europe for a very long time.", answer: "TRUE" },
        { n: 8, type: "tfng", prompt: "The barometer's usefulness for prediction was recognised as soon as it was invented.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Fishing communities helped to pay for FitzRoy's storm-warning system.", answer: "NOT GIVEN" },
        { n: 10, type: "tfng", prompt: "Some newspapers mocked FitzRoy's forecasts when they proved wrong.", answer: "TRUE" },
        { n: 11, type: "tfng", prompt: "Richardson's hand-calculated forecast turned out to be broadly correct.", answer: "FALSE" },
        { n: 12, type: "tfng", prompt: "Satellite pictures made it possible to observe storms developing far from land.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "Modern forecasting models are updated several times every day.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Bringing the marshes back to town",
      passage: `A — A wetland is simply land that is wet for much of the year — marsh, swamp, reed bed, the soggy margin of a river — yet for most of urban history it was treated as land that had gone wrong. Wetlands bred insects, smelled of decay and could not be built on, so growing cities drained, filled and buried them with real enthusiasm. Mexico City stands on the bed of a lake that was gradually drained over four centuries; much of Boston sits on marshland filled in with gravel during the nineteenth century; and the streams of countless cities were forced into buried pipes and forgotten. By some estimates, the world's cities have destroyed well over half of the wetlands they grew up among.

B — In the past three decades the flow has begun, here and there, to reverse. City governments that once paid engineers to bury marshes now pay them to dig marshes up again: to break streams out of their concrete culverts, re-flood old meadows and plant reed beds where car parks used to stand. The motives are practical rather than sentimental. Cities are discovering that the wetlands they destroyed had been doing quiet, unpaid work — soaking up floods, filtering dirty water, cooling the air — and that replacing that work with machinery is expensive.

C — The flood argument is the easiest to put into figures, and the engineer Daniel Okafor has spent much of his career doing so. A restored wetland, he explains, behaves like a sponge: during a downpour it stores enormous volumes of storm water across its pools and soils, then releases the water slowly over the following days, so the surge never reaches the streets. The conventional alternative is to enlarge the city's drains and build underground storage tanks and concrete channels. Comparing recent schemes, Okafor calculates that wetland storage typically costs less than a third as much per flood as the equivalent engineering, and unlike a tank it does not sit idle between storms.

D — The second service is purification, and it works because a wetland is a machine for slowing water down. As runoff spreads out among the reeds, its speed drops, and the sediment it carries — grit, soil, particles of metal from the roads — settles to the bottom instead of washing into the river. The plants themselves take up dissolved nitrogen and phosphorus, and bacteria living on their submerged stems and roots break down oils and other organic pollutants. What flows out of a healthy reed bed is dramatically cleaner than what flowed in. The wildlife follows. The ecologist Hana Suzuki, who has surveyed restored wetlands in a dozen cities, reports that the speed of the recovery surprises even the people who planned it: dragonflies and water beetles colonise new pools within months, frogs follow in the first year, and by the third year her teams were recording herons and even otters in marshes surrounded on every side by traffic.

E — The benefits are not only hydrological. The public-health researcher Priya Raman tracked several hundred residents living near a chain of restored ponds and found that regular visitors reported lower stress and showed measurably lower blood pressure than matched neighbours who stayed away — an effect she attributes partly to the water itself, which people watch in a way they do not watch grass. Wetlands also cool their surroundings: on summer afternoons, Raman's instruments recorded air above the ponds three degrees cooler than the streets a few hundred metres away, a difference that matters more with every heatwave.

F — There are, of course, objections. Residents' first fear is nearly always mosquitoes, though designers answer that a functioning wetland, with moving water and healthy populations of fish and dragonflies, supports fewer of them than the blocked gutters it replaces. Maintenance is a real cost: reed beds must be cut, channels kept clear, litter removed, and a neglected wetland loses both its efficiency and its public support. The sharpest criticism, however, comes from the geographer Tomas Berg, who studied property markets around new wetland parks in three cities and found that rents and house prices nearby rose so quickly that many long-standing residents could no longer afford to stay. A project sold as a public good, he warns, can quietly become a machine for displacement — an outcome planners rarely measure and seldom admit.

G — The projects that avoid these traps, argues the planner Lucia Fernandez, are the ones that treat local people as partners rather than beneficiaries. In the schemes she advises, residents help choose the site and the design, school classes adopt stretches of bank, and trained volunteers — many of them retired — carry out the routine water testing that would otherwise consume the maintenance budget. Involvement of that kind, she argues, is what turns a municipal drainage scheme into a place people defend. The marshes our great-grandparents buried will not all come back; but a city that restores even a few of them recovers something useful, cheap and, on a summer evening loud with frogs, unexpectedly loved.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a comparison between the cost of wetlands and the cost of conventional engineering", answer: "C" },
        { n: 15, type: "match", group: "info", prompt: "examples of cities built on land where wetlands were destroyed", answer: "A" },
        { n: 16, type: "match", group: "info", prompt: "an account of how wetland plants and the organisms on them clean polluted water", answer: "D" },
        { n: 17, type: "match", group: "info", prompt: "a warning that restoration can harm the people it was intended to help", answer: "F" },
        { n: 18, type: "match", group: "info", prompt: "a measured difference in temperature between a wetland and nearby streets", answer: "E" },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — How a restored wetland protects a city",
            lines: [
              "During heavy rain, a restored wetland acts like a {{19}}, holding huge amounts of storm water and letting it go gradually, so that flooding never reaches the streets.",
              "The wetland also cleans the water that passes through it: as the flow slows among the reeds, the {{20}} carried by runoff sinks to the bottom, the plants absorb dissolved chemicals, and {{21}} on their stems and roots break down oils and other pollutants.",
              "Providing the same services with tanks and concrete {{22}} would cost the city far more.",
            ],
          },
          answer: "sponge" },
        { n: 20, type: "gap", group: "sum2", answer: "sediment" },
        { n: 21, type: "gap", group: "sum2", answer: "bacteria" },
        { n: 22, type: "gap", group: "sum2", answer: "channels" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Daniel Okafor",
            "Tomas Berg",
            "Hana Suzuki",
            "Lucia Fernandez",
            "Priya Raman",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Wildlife returned to restored wetlands more quickly than anyone had expected.", answer: "C" },
        { n: 24, type: "match", group: "people", prompt: "Natural flood storage is far cheaper than building the equivalent engineering.", answer: "A" },
        { n: 25, type: "match", group: "people", prompt: "Living close to restored water is associated with measurable health benefits.", answer: "E" },
        { n: 26, type: "match", group: "people", prompt: "Wetland projects can make an area too expensive for its existing residents.", answer: "B" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The loops that run our lives",
      passage: `Consider the first hour of your day. You woke, silenced the alarm, showered, dressed, made coffee and checked your phone, and it is quite possible that you made no genuine decision at any point in the sequence. Researchers who ask people to record their behaviour at random moments through the day come to a striking conclusion: roughly forty per cent of what we do is not decided at all, but repeated — the same action, in the same place, at the same time, performed with the mind largely elsewhere. It is fashionable to say this as though it were a scandal, but the arrangement is a triumph of design. Conscious attention is the scarcest resource the brain has. A creature that had to deliberate about every doorway, kettle and shoelace would be exhausted by breakfast; habit is the mechanism that frees the mind for problems that deserve it.

The mechanics of the arrangement are now reasonably well mapped. A habit has three parts: a cue, a routine and a reward. The cue is the trigger — a time of day, a place, a feeling, the sight of another person; the routine is the behaviour itself; and the reward is whatever payoff, however small, follows it. When the loop is new, the behaviour is managed by the prefrontal cortex, the brain's deliberate, effortful planner. But as the loop repeats, control passes downward to older structures, above all the basal ganglia, a region that specialises in storing well-practised sequences and running them almost without conscious supervision. The reward has a precise teaching function: each time it arrives, it strengthens the link, instructing the brain to launch the routine the next time the cue appears. With enough repetition the anticipation itself moves forward in time — the craving arrives with the cue, before the behaviour has even begun. At that point the loop no longer needs your agreement.

How long does the transfer take? Popular books have answered "twenty-one days" for half a century, a figure usually traced to a surgeon's casual observation that his patients took about three weeks to get used to their changed faces. The claim has the great merit of being encouraging and the great weakness of being false. In the most widely cited study of the question, volunteers each chose a new behaviour — drinking water with lunch, a daily walk — and were tracked for months while researchers measured how automatic the action felt. The average time to full automaticity was sixty-six days, but the average conceals the real finding: the range ran from eighteen days to more than two hundred and fifty, depending on the person and the complexity of the behaviour. There is no magic number, and missing a single day, the data showed, made almost no difference to the outcome.

The loop's dependence on the cue has a consequence that most self-improvement advice ignores: habits belong to places. In one much-discussed experiment, cinema-goers ate stale, week-old popcorn as readily as fresh popcorn — but only inside a cinema; in a meeting room, where the contextual cue was absent, the stale popcorn went largely uneaten. The behaviour, in other words, was not driven by appetite but by the setting. This is why habits so often dissolve of their own accord when people move house, change jobs or begin a new term: the old cues are simply no longer there to fire the old routines. Researchers who study behaviour change now treat such transitions as windows of unusual opportunity, and there is good evidence that a new exercise regime or diet begun in a new environment survives far longer than the same regime begun amid the cues of the old life.

If habits are loops waiting for their cues, the standard strategy against them — gritted teeth — is poorly chosen. Willpower is real, but it fluctuates with stress, sleep and hunger, and it must win every single confrontation, whereas the habit needs to win only once a day. Worse, suppression leaves the underlying loop intact: brain-imaging and relapse studies agree that an established habit is never truly deleted, only overlaid with newer learning, which is why a smoker who quit years ago can be undone by one bad week. To interpret such relapses as weakness of character is, on the evidence, simply a mistake — though it is a mistake our moral vocabulary makes constantly.

What works better is redesign. The most reliable technique keeps the cue and the reward but swaps the routine: the smoker who wants a break and a moment of relief learns to take the same break with different props. Because the old loop's scaffolding is reused rather than fought, substitution succeeds far more often than suppression. The second technique is friction: make the unwanted behaviour slightly harder — delete the app, put the biscuits on a high shelf — and make the wanted one slightly easier. The effect requires no vigilance at all; the loop simply fires less often because the path is longer. None of this is heroic, and that is the point. We flatter ourselves that character drives behaviour, but the evidence says environment writes most of the script. The person who seems disciplined has usually just built a life in which the right actions are the easy ones — and that skill, unlike willpower, is available to anyone.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer's main point is that", options: ["A most people regret how they spend their mornings", "B a large share of daily behaviour happens without deliberate decision", "C morning routines are the most difficult habits to change", "D researchers disagree about how to measure habits"], answer: "B" },
        { n: 28, type: "mcq", prompt: "What does the writer say about the claim that habits take twenty-one days to form?", options: ["A It was deliberately invented to sell books", "B It applies only to simple physical habits", "C It has been confirmed for most volunteers", "D Research shows the true time differs enormously between people"], answer: "D" },
        { n: 29, type: "mcq", prompt: "According to the writer, moving to a new home often weakens old habits because", options: ["A the triggers that started the routines are no longer present", "B people feel more energetic in new surroundings", "C there is less time available for old routines", "D the rewards of old habits become less satisfying"], answer: "A" },
        { n: 30, type: "mcq", prompt: "The writer's view of willpower is that", options: ["A it grows stronger with regular practice", "B it matters more than the design of one's surroundings", "C it is too unreliable to be the main weapon against a habit", "D it fails only in people under unusual stress"], answer: "C" },
        { n: 31, type: "ynng", prompt: "Habits are, on the whole, a useful feature of human behaviour.", answer: "YES" },
        { n: 32, type: "ynng", prompt: "An established habit can be completely removed from the brain.", answer: "NO" },
        { n: 33, type: "ynng", prompt: "Children develop new habits more easily than adults.", answer: "NOT GIVEN" },
        { n: 34, type: "ynng", prompt: "Changing one's environment is a better strategy than relying on determination.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "Returning to an old habit after years of abstinence shows a weak character.", answer: "NO" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "found great differences in how long new habits took to become automatic.",
            "teaches the brain to start the routine the next time the cue appears.",
            "explains why rewards gradually lose their power over behaviour.",
            "can reduce the behaviour without any deliberate effort.",
            "stores well-practised routines so that they run with little conscious attention.",
            "proves that habits disappear if they are avoided for long enough.",
            "succeeds more often than trying to suppress the behaviour entirely.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "The basal ganglia is a brain region that", answer: "E" },
        { n: 37, type: "match", group: "ends", prompt: "The reward at the end of a habit loop", answer: "B" },
        { n: 38, type: "match", group: "ends", prompt: "The most widely cited study of habit formation", answer: "A" },
        { n: 39, type: "match", group: "ends", prompt: "Replacing the routine while keeping the cue and the reward", answer: "G" },
        { n: 40, type: "match", group: "ends", prompt: "Making an unwanted habit harder to perform", answer: "D" },
      ],
    },
  ],
};
