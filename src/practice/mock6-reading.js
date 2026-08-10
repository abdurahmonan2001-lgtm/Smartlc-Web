// Smart LC Mock Test 6 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + people), P3 argumentative
// (MCQ-4 + sentence endings + YNNG). Key quotas: TFNG/YNNG balanced with
// no runs of three, flat letters, unique concrete-noun answers.
export const MOCK6_READING = {
  id: "mock6-reading",
  bookId: "mock6",
  title: "Mock Test 6 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The age of windmills",
      passage: `Before steam and electricity, only three forces were available for heavy work: muscle, moving water and the wind. Water was dependable but tied to riverbanks, and a dry summer could still a whole valley of wheels; muscle, whether human or animal, was expensive to feed and quick to tire. The wind cost nothing and blew almost everywhere, and the machine invented to capture it — the windmill — served as one of the world's most important engines for roughly a thousand years. At the height of its career it could be found from the plateaus of Persia to the coasts of northern Europe, grinding grain, draining wetlands, sawing timber and pressing seeds for oil.

The earliest windmills for which reliable evidence survives were working in eastern Persia by the ninth century, in a border region whose summer wind blows hard from one direction for months at a time. They looked nothing like the mill of a European postcard. Their sails, woven from bundles of reeds, were fixed to a vertical shaft inside a two-storey building of mud brick; openings in the walls funnelled the moving air onto one side of the wheel, so that it spun like a revolving door. The shaft turned a millstone directly, without any gearing, and the design proved so well suited to its landscape that it barely changed for a thousand years: travellers were still photographing working examples in the region in the 1960s.

Windmills begin to appear in European records towards the end of the twelfth century, and historians still argue about whether the idea arrived along trade routes or was simply invented a second time. What is certain is that the European machine was no copy. Its sails turned on a horizontal axis, mounted high on a wooden body, and they faced into the wind rather than hiding from it — which created a new problem, because the wind does not always blow from the same quarter. The first solution was the post mill: the entire body of the mill, machinery and all, balanced on a single massive upright post, so that the miller could push the whole building round with a long tail beam until the sails met the wind squarely.

The sails themselves were long lattice frames spread with canvas, which the miller managed much as a sailor manages a ship, taking cloth in when a gale threatened and spreading every inch of it in light summer airs. As mills grew larger, turning the whole building became impractical, and by the fifteenth century a better arrangement was spreading across Europe: the tower mill, whose body was a fixed tower of brick or stone. Only the cap — the small roof that carried the sails and their shaft — rotated, riding on a curved track at the top of the wall. Tower mills could be built taller, catch stronger and steadier winds, and drive several pairs of millstones at once.

Even a tower mill demanded constant vigilance, for a mill caught by a sudden shift with the wind behind its sails could be wrecked in minutes. The remedy arrived in 1745, when the English engineer Edmund Lee patented the fantail: a small wind-wheel mounted at right angles to the main sails, behind the cap. When the wind changed direction it struck the fantail and set it spinning, and through a chain of gears the spinning slowly wound the cap round until the main sails faced the wind once more. From that moment the mill could steer itself, day and night, with nobody watching.

Grinding grain was never the whole story. In the Low Countries, where much of the land lies below the level of the sea, windmills were set to pumping. Ranged in lines across the polders, they lifted water in stages from the fields into drainage channels and finally into the rivers, and whole provinces of the modern Netherlands were kept dry by their patient labour. Elsewhere mills sawed logs into planks for shipyards, crushed seeds for lamp oil, ground pigments for painters and pulped rags for paper. By the middle of the nineteenth century tens of thousands of windmills were at work across Europe, and the millwright — the travelling craftsman who built and repaired them — carried in his head much of the practical mechanics that the coming industrial age would draw upon.

That age, when it arrived, had little room for them. A steam engine worked in calm weather and foul, at any hour of any season, anywhere coal could be carted, and it never had to wait for the sky's cooperation. Through the second half of the nineteenth century the mills fell idle by the thousand; sails were stripped for firewood, and towers were converted into houses or left to crumble. By the 1920s the working windmill, so recently the tallest structure in most villages, had become a curiosity.

It never quite disappeared. Enthusiasts began rescuing derelict mills between the wars, and today hundreds have been restored, their sails turning on open days while volunteers grind flour for visitors. Engineers, meanwhile, have returned to the wind in earnest: the turbines now ranged across hillsides and shallow seas are the windmill's direct descendants, built by a civilisation that has remembered why free power out of moving air was worth chasing in the first place.`,
      questions: [
        { n: 1, type: "gap", prompt: "In the earliest Persian mills, the sails were woven from bundles of ______.", note: "ONE WORD ONLY", answer: "reeds" },
        { n: 2, type: "gap", prompt: "In the first European design, the whole body of the mill balanced on a large upright ______.", note: "ONE WORD ONLY", answer: "post" },
        { n: 3, type: "gap", prompt: "Millers controlled their sails by adjusting the amount of ______ spread on the frames.", note: "ONE WORD ONLY", answer: "canvas" },
        { n: 4, type: "gap", prompt: "In a tower mill, the only part of the building that turned was the ______.", note: "ONE WORD ONLY", answer: "cap" },
        { n: 5, type: "gap", prompt: "After 1745, a device called the ______ allowed a mill to turn itself to face the wind.", note: "ONE WORD ONLY", answer: "fantail" },
        { n: 6, type: "gap", prompt: "Dutch mills raised ______ in stages from low-lying fields into the rivers.", note: "ONE WORD ONLY", answer: "water" },
        { n: 7, type: "gap", prompt: "Windmills lost their importance once engines powered by ______ became widespread.", note: "ONE WORD ONLY", answer: "steam" },
        { n: 8, type: "tfng", prompt: "The earliest well-documented windmills were built in Europe.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Some Persian windmills were still operating in the twentieth century.", answer: "TRUE" },
        { n: 10, type: "tfng", prompt: "European windmills used the same design as the Persian ones.", answer: "FALSE" },
        { n: 11, type: "tfng", prompt: "Millwrights earned more than other craftsmen of their time.", answer: "NOT GIVEN" },
        { n: 12, type: "tfng", prompt: "The fantail removed the need for mills to be turned by hand.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "More historic windmills survive in the Netherlands than in any other country.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Why cities are planting trees",
      passage: `A — City governments have discovered a new way to compete. One mayor promises a million new trees within a decade; a rival city across the border announces a "green corridor" running the length of its main avenue; a third pledges that no resident will live more than a ten-minute walk from a shaded park. Behind the photo opportunities — politicians in clean boots pressing saplings into prepared holes — lies a genuine shift in thinking. Urban trees, long treated as decoration to be added if money remained at the end of a project, are increasingly described by planners as infrastructure: as essential to a functioning city as its drains, cables and buses, and deserving the same budgets and the same engineering attention.

B — The most direct argument is heat. Streets of asphalt and concrete absorb the sun all day and release it all night, which is why a city centre can be several degrees warmer than the surrounding countryside. Sofia Lindqvist, an urban climatologist who has spent a decade fitting temperature sensors to lamp posts, has measured the difference trees make: on summer afternoons, streets beneath a full canopy of mature trees were up to five degrees cooler than bare streets a few hundred metres away. Shade is only half the explanation. The other half is transpiration: a mature tree can release hundreds of litres of water vapour a day, cooling the air around it exactly as evaporating sweat cools skin. "A big street tree works like a quiet outdoor air conditioner," she says, "except that it runs on sunlight and costs the city a fraction as much." Cooling, though, is not the only thing a canopy does to city air. Priya Raman, an air-quality scientist who models how exhaust fumes move along streets, warns that a dense, unbroken canopy above a busy narrow road can trap pollution at pavement level instead of letting it disperse upwards. "A tree is not a filter you can hang anywhere," she says. "On a wide boulevard, plant as many as will fit; in a narrow canyon, choose an open-crowned species and leave the air a way out."

C — The health case has grown just as quickly. In studies covering many thousands of residents, the public-health researcher Daniel Osei has found that people living on tree-lined streets report better general health and lower stress, and are prescribed less medication for anxiety and depression, than people on comparable streets without trees. The obvious objection is that greener neighbourhoods tend to be richer ones. Osei's team spent years testing exactly that. "The association survives when you control for income and education," he says. "Wealth explains part of the pattern, but not all of it. Something about the daily presence of trees themselves appears to matter."

D — There is also a ledger. Trees raise the value of the properties they shade; their shade cuts summer cooling bills in the buildings beneath them; and their canopies intercept rainfall, holding back part of every downpour and releasing it slowly. Rachel Whitfield, an economist who audits city planting programmes, calculates that a typical street tree returns several times its planting and maintenance cost over its lifetime. "If a company sold a machine that cooled the street, cleaned the air, held back stormwater and raised the value of every building nearby," she argues, "no city would hesitate to buy it. Trees are that machine, at a fraction of the price."

E — Enthusiasm, however, is not the same as success. A young street tree is planted into a hostile world of compacted soil, road salt, reflected heat and dry summers, and in some celebrated campaigns as many as half of the new trees have died within five years. Ana Duarte, who manages the street-tree programme of a large southern European city, has watched several waves of ambitious planting wither. "The photograph gets taken on planting day, but the real work starts afterwards," she says. "A newly planted tree needs watering, staking and pruning for years before it can look after itself. Budgets that pay for planting ceremonies and nothing afterwards produce avenues of dead sticks." Her rule is that no tree should go into the ground without a funded plan for its first decade — and without checking that the species suits the site.

F — The newest maps add one more argument. Aerial surveys of canopy cover show that trees are not spread evenly across any city: prosperous districts often enjoy several times the tree cover of poorer ones, a difference you can feel as degrees of heat on a summer afternoon and read in local health statistics. Several cities have begun steering their planting programmes accordingly, sending the next wave of saplings not to the leafy avenues that request them but to the bare streets that need them. If trees really are infrastructure, the argument runs, they should be distributed like infrastructure — according to need. The million-tree slogans will ultimately be judged not by the number of holes dug, but by how many trees are alive twenty years later, and by whose windows their shade finally falls across.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "examples of cities promising large planting programmes", answer: "A" },
        { n: 15, type: "match", group: "minfo", prompt: "a mention of research involving very large numbers of people", answer: "C" },
        { n: 16, type: "match", group: "minfo", prompt: "a figure for the proportion of newly planted trees that die", answer: "E" },
        { n: 17, type: "match", group: "minfo", prompt: "evidence that tree cover differs between rich and poor districts", answer: "F" },
        { n: 18, type: "gap", group: "sum6", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — What trees do for a city",
            lines: [
              "Trees cool city streets in two ways: they cast shade, and they release large amounts of water {{18}}, which lowers the temperature of the air just as sweating cools the body.",
              "On hot afternoons, streets under a full canopy can be as much as five {{19}} cooler than unshaded streets nearby.",
              "Residents of tree-lined streets also report better health and lower {{20}}, a link that money alone does not explain.",
              "Trees even hold back rainwater during storms, and over its lifetime a street tree repays its planting and maintenance {{21}} several times over —",
              "yet many campaign trees die young, so experts insist that every tree needs a funded plan for its first {{22}}.",
            ],
          },
          answer: ["vapour", "vapor"] },
        { n: 19, type: "gap", group: "sum6", answer: "degrees" },
        { n: 20, type: "gap", group: "sum6", answer: "stress" },
        { n: 21, type: "gap", group: "sum6", answer: ["cost", "costs"] },
        { n: 22, type: "gap", group: "sum6", answer: "decade" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Sofia Lindqvist", "Daniel Osei", "Rachel Whitfield", "Ana Duarte", "Priya Raman"],
          rubric: "Match each statement with the correct person, A–E.",
          prompt: "Money spent on planting is wasted without money for later care.", answer: "D" },
        { n: 24, type: "match", group: "people", prompt: "A single tree cools its surroundings like an appliance, at far lower cost.", answer: "A" },
        { n: 25, type: "match", group: "people", prompt: "The financial benefits of urban trees are worth several times what they cost.", answer: "C" },
        { n: 26, type: "match", group: "people", prompt: "The link between trees and wellbeing is not fully explained by residents' wealth.", answer: "B" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The navigators",
      passage: `The Arctic tern breeds within sight of polar ice and winters at the edge of the Antarctic pack, an annual round trip that can exceed seventy thousand kilometres. Loggerhead turtles hatched on a quiet beach scramble to the sea, disappear into decades of open-ocean wandering, and return to breed on the shore where they hatched, sometimes within a few kilometres of their own birthplace. Monarch butterflies leave Canada in autumn and arrive, generations removed from any butterfly that has made the journey before, at a handful of mountain groves in central Mexico. How animals find their way across such distances — often at night, often over featureless water — is one of biology's oldest riddles, and the closer researchers look, the less it resembles a single trick.

A celebrated experiment of the mid-twentieth century first exposed the layered nature of the ability. Migrating starlings, trapped in the Netherlands in the middle of their autumn journey, were flown hundreds of kilometres away and released far off their normal route. The young birds, migrating for the first time, carried on in their inherited direction as if nothing had happened, and ended the season in territory their species never normally visits. The experienced adults did something quite different: they corrected for the displacement and arrived at their usual wintering grounds. The juveniles, it seemed, possessed only a compass — an inborn instruction to fly on a certain bearing for a certain time — while their elders had acquired something richer: a map, built from experience, which told them not just which way to go but where they actually were.

Compasses, at least, the natural world supplies in abundance. Many animals that travel by day steer by the sun, an instrument that is useless unless its steady march across the sky is corrected for the time of day; birds keep that correction with an internal clock, and if the clock is shifted artificially — by keeping birds under lights that come on hours out of step with dawn — they set off in a predictably wrong direction. Night migrants can use the stars. Songbirds raised in a planetarium learned their star compass not by memorising particular constellations but by watching the way the artificial sky rotated, treating the still point of that rotation as north; when experimenters made the sky rotate around a different star, the birds calmly adopted the new centre as their pole. And a remarkable range of animals — birds, sea turtles, salamanders, even some insects — can orient by the Earth's magnetic field, a cue that works in cloud, in darkness and under water.

How the magnetic sense works remains one of the liveliest arguments in the field, not least because no dedicated organ for it has ever been found. Two candidate mechanisms dominate the debate. One camp points to magnetite, a naturally magnetic mineral whose microscopic crystals occur in animal tissue; such particles could tug on nerve endings as the animal turns, like so many microscopic compass needles. The other camp centres on cryptochrome, a light-sensitive protein found in the retina, in which the field's direction subtly biases the outcome of certain chemical reactions — implying, remarkably, that a bird might in effect see the magnetic field, laid faintly over the visual world. The evidence is suggestive for both and decisive for neither; effects that appear clearly in one laboratory have a way of weakening in the next. Nor need the two be rivals: several researchers now propose that a single animal may use a magnetite-based sense to judge its position and a cryptochrome-based one as its compass.

The map itself may be assembled from humbler materials. Salmon returning from years in the open sea locate the mouth of their home river, the evidence suggests, by recognising the particular chemistry of its water, imprinted on them when they were young fish heading the other way. Homing pigeons made temporarily unable to smell have struggled to find their way back from unfamiliar release sites, while birds with their senses intact flew straight home — a result, replicated many times, which suggests that odours carried on the wind form stable gradients that a bird can read as position. Sea turtles, for their part, appear to read the slow variation of the magnetic field across an ocean basin as a rough grid of latitude and longitude, a magnetic signature for every stretch of coast.

For most of a century, the search was for the navigation sense: a single hidden organ that, once found, would dissolve the mystery. That search now looks misconceived. What the accumulated evidence describes instead is redundancy — sun, stars, magnetism, smell and remembered landmarks, ranked, cross-checked and exchanged as conditions demand, in an order of priority that differs from species to species and even from journey to journey. A migrating songbird is less like a sailor steering by a single compass than like a modern aircraft carrying overlapping instruments, any one of which can fail without bringing the whole enterprise down. The interesting question is no longer whether animals have the means to find their way, but how a brain the size of a bean weighs so many streams of information at once. Much remains genuinely unknown — the magnetic sense still lacks an agreed mechanism — and the honest summary is that animal navigation is not one solved problem but a family of partly solved ones, whose most elegant solutions may still be waiting in plain sight.`,
      questions: [
        { n: 27, type: "mcq", prompt: "The writer uses the starling experiment to show that", options: ["A experienced birds navigate differently from young ones", "B starlings cannot correct their course after displacement", "C birds inherit a complete map of their migration route", "D migration routes never change from year to year"], answer: "A" },
        { n: 28, type: "mcq", prompt: "According to the passage, the sun compass is reliable only if the animal", options: ["A flies mainly in the morning", "B can also see the stars", "C makes allowance for the time of day", "D resets its internal clock each season"], answer: "C" },
        { n: 29, type: "mcq", prompt: "What does the writer say about the two proposed magnetic mechanisms?", options: ["A The magnetite theory has now been abandoned", "B They may both operate in a single animal", "C Cryptochrome has been proved to create a visual image", "D Neither has any experimental support"], answer: "B" },
        { n: 30, type: "mcq", prompt: "Which of the following best summarises the writer's conclusion?", options: ["A Animal navigation depends on one undiscovered organ", "B The puzzle of navigation has now been fully solved", "C Animals rely mainly on their sense of smell", "D Navigation rests on several overlapping systems"], answer: "D" },
        { n: 31, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "took their bearings from the apparent rotation of the sky.",
            "found it hard to return home from unfamiliar places.",
            "implies that a bird might see the magnetic field.",
            "return to breed on the shore where they hatched.",
            "showed that magnetite plays no part in navigation.",
            "seem to recognise the chemistry of their home water.",
            "become lost whenever clouds hide the sun.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Loggerhead turtles", answer: "D" },
        { n: 32, type: "match", group: "ends", prompt: "Songbirds raised under an artificial sky", answer: "A" },
        { n: 33, type: "match", group: "ends", prompt: "Salmon arriving from the open sea", answer: "F" },
        { n: 34, type: "match", group: "ends", prompt: "The cryptochrome theory", answer: "C" },
        { n: 35, type: "match", group: "ends", prompt: "Pigeons temporarily unable to smell", answer: "B" },
        { n: 36, type: "ynng", prompt: "Some navigational knowledge is present in birds before their first journey.", answer: "YES" },
        { n: 37, type: "ynng", prompt: "The magnetite explanation of the magnetic sense has been proved correct.", answer: "NO" },
        { n: 38, type: "ynng", prompt: "Human-made structures are interfering with animal navigation.", answer: "NOT GIVEN" },
        { n: 39, type: "ynng", prompt: "Searching for a single navigation sense was a mistaken approach.", answer: "YES" },
        { n: 40, type: "ynng", prompt: "Scientists now fully understand how animals find their way.", answer: "NO" },
      ],
    },
  ],
};
