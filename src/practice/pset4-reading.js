// Smart LC Practice Set 4 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching paragraph-information + summary + people-matching with one
// extra name), P3 argumentative science (MCQ-4 + YNNG + wordlist
// summary). Key quotas: TFNG/YNNG balanced with no runs of three, flat
// letters, unique concrete-noun answers, correct MCQ options paraphrase
// the text while distractors echo its wording.
export const PSET4_READING = {
  id: "pset4-reading",
  bookId: "pset4",
  title: "Practice Set 4 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The dictionary makers",
      passage: `The urge to make lists of words is almost as old as writing itself. The oldest known word lists were pressed into clay tablets nearly four thousand years ago, in the cities of Mesopotamia, by scribes learning their trade. Sumerian, the old language of religion and law, was no longer spoken in the street, so trainee scribes needed written help with it, and their teachers prepared long double columns in which each Sumerian sign was set beside its equivalent in Akkadian, the everyday tongue. These earliest reference works were not arranged alphabetically. Words were grouped instead by subject — trees and wooden objects on one tablet, professions on another, animals on a third — so that a student worked through the vocabulary of the world domain by domain. The list, in other words, began life not as a record of a language but as a classroom tool, and it kept that character for a very long time.

In medieval Europe the same need produced a different device. Monks reading Latin manuscripts would write the meaning of a difficult word between the lines, in simpler Latin or in their own language, and these little notes — glosses — were eventually gathered into separate collections called glossaries. A glossary was still a helping hand rather than a survey: it dealt only with the words a reader was likely to stumble over. Even the idea of strict alphabetical order took centuries to settle. Early compilers often sorted their entries by the first letter alone and let chaos reign thereafter, and some apologised to readers for an arrangement they feared was strange and unnatural.

The first book that can claim to be an English dictionary appeared in London in 1604, when a schoolmaster named Robert Cawdrey published A Table Alphabeticall. It was a modest thing: about two and a half thousand entries, each explained in a few plain words. Cawdrey made no attempt to cover the whole language. He listed only what he called hard words — terms borrowed from Latin, Greek and French that an ordinary reader could not be expected to know — and his title page declared that the book was written for the benefit of women, and of any other readers who had never studied the learned languages. For more than a century his successors followed the same recipe, each borrowing freely from the last, and each covering only the difficult fringe of English rather than its everyday heart.

The man who changed the scale of the enterprise was Samuel Johnson, whose Dictionary of the English Language appeared in 1755. Johnson set out to record the language as its best writers had actually used it, and he supported his definitions with more than a hundred thousand quotations drawn from two centuries of English literature — a method that dictionaries have relied on ever since. Working in the attic of his house off Fleet Street, he was helped by six assistants, who copied out the marked passages while Johnson wrote the definitions himself. The whole task took him nine years, a fact he was proud of: the forty members of the French Academy, he liked to point out, had needed forty years to produce a dictionary of French.

Across the Atlantic, dictionary-making became an act of politics. Noah Webster, a Connecticut teacher convinced that an independent nation needed an independent language, spent nearly thirty years on his American Dictionary of the English Language, published in 1828. Webster wanted American spelling to be simpler and more logical than British spelling, and some of his reforms — dropping the u from colour, turning centre into center — were adopted and remain the American standard today. Others, such as his proposal to write tongue as tung, were quietly ignored by the public, and he accepted the defeat.

The grandest project of all began in Britain in 1857, when scholars proposed a dictionary that would trace the history of every English word from its earliest recorded use. The material was to be gathered by an army of volunteer readers, who combed through books of every period and sent in each example they found on a slip of paper, with the word, the date and the quotation. When James Murray became editor in 1879, he built a corrugated-iron shed in his garden in Oxford, lined it with hundreds of pigeonholes for the slips, and named it the Scriptorium. The editors first believed the work might take about ten years; in the event, the final section of what became the Oxford English Dictionary was not published until 1928, seventy years after the project was proposed, and supplements began almost at once.

Today the dictionary maker's raw material has changed again. Instead of slips in pigeonholes, editors search a corpus — an enormous electronic collection of real texts, from novels to news reports — to see how words actually behave, and definitions describe usage rather than dictate it. Publication has changed even more. An online dictionary can add a word within weeks of its first appearance and revise an entry continuously, instead of waiting years for a new edition. What has not changed is the essential task Cawdrey set himself four centuries ago: explaining words, plainly, to the people who need them.`,
      questions: [
        { n: 1, type: "gap", prompt: "The earliest known word lists were written on clay ______.", note: "ONE WORD ONLY", answer: "tablets" },
        { n: 2, type: "gap", prompt: "Cawdrey's title page said the book was written partly for ______.", note: "ONE WORD ONLY", answer: "women" },
        { n: 3, type: "gap", prompt: "Johnson was helped in his attic workroom by six ______.", note: "ONE WORD ONLY", answer: "assistants" },
        { n: 4, type: "gap", prompt: "Quotations for the Oxford dictionary were collected by volunteer ______.", note: "ONE WORD ONLY", answer: "readers" },
        { n: 5, type: "gap", prompt: "Murray stored the quotation slips in a garden shed he called the ______.", note: "ONE WORD ONLY", answer: "Scriptorium" },
        { n: 6, type: "gap", prompt: "Modern editors study word behaviour in a large electronic collection of texts called a ______.", note: "ONE WORD ONLY", answer: "corpus" },
        { n: 7, type: "gap", prompt: "Online dictionaries can be updated continuously rather than waiting for a new ______.", note: "ONE WORD ONLY", answer: "edition" },
        { n: 8, type: "tfng", prompt: "The word lists of Mesopotamia were arranged in alphabetical order.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Cawdrey's dictionary explained only a small part of the English vocabulary.", answer: "TRUE" },
        { n: 10, type: "tfng", prompt: "Johnson's dictionary sold well as soon as it was published.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "All of Webster's proposed spellings were accepted by the American public.", answer: "FALSE" },
        { n: 12, type: "tfng", prompt: "The Oxford English Dictionary took much longer to complete than its editors first expected.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "Printed dictionaries will eventually stop being produced.", answer: "NOT GIVEN" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Catching the rain in thirsty cities",
      passage: `A — The driest cities in the world share a strange double life. For most of the year they behave like places where water is treasure: they pump it from wells that reach ever deeper into shrinking aquifers, or pipe it in over hundreds of kilometres of mountains and desert at enormous cost in money and energy. Then the rains arrive — brief, violent and unmanaged — and for a few hours the same cities behave like places drowning in the stuff, as streets turn to rivers and storm drains overflow. The water that floods the roads in January is, in effect, the water that will be missing from the taps in June. Rainwater harvesting, an idea at once ancient and newly fashionable, proposes to close that absurd loop: catch the storm where it falls, store it, and use it. The climate scientist Elena Petrova adds a warning that gives the idea urgency, for her models suggest that in many dry regions the rain of the future will come in fewer, heavier bursts, which cities will have to absorb or suffer.

B — There is nothing new in the principle. Households on Mediterranean islands cut cisterns into the rock beneath their floors two thousand years ago and filled them from their roofs each winter. The desert towns of north-western India went further, building magnificent public stepwells and street-side tanks that gathered the monsoon for the dry months ahead. The urban planner Farhan Qureshi, who has spent years documenting these structures in Rajasthan, argues that their decline had little to do with performance. The old tanks were abandoned, he says, when piped municipal water arrived in the twentieth century: once water seemed to come effortlessly from somewhere else, the community effort that maintained the local systems collapsed within a generation, and structures that had worked for centuries silted up in decades.

C — The modern domestic version is simple enough to fit on a suburban roof. Rain runs from the roof into gutters, and the first few minutes of every storm are deliberately thrown away: a device called a first-flush diverter fills with that initial water, which carries the dust, soot and bird droppings the roof has collected since the last rain, and only the cleaner flow that follows passes on. A screen over the inlet keeps out leaves before the water settles in a covered tank. Households typically use the stored water for gardens and toilets, which together can account for half of domestic demand, though with treatment it can do more. The most interesting refinement, however, sends the surplus underground: when the tank is full, the overflow is led into recharge wells — gravel-filled shafts that let the water soak down to refill the aquifer beneath the city. The hydrologist Rosa Delgado has measured the effect in Mexico City, where clusters of recharge wells serve entire districts, and her instruments record groundwater levels rising measurably beneath neighbourhoods that installed them.

D — Some cities have tried to turn the household experiment into policy. The Indian city of Chennai made rooftop harvesting compulsory for every building in 2003, after a catastrophic drought, and studies in the following decade found groundwater levels in several districts higher than before the rule, even as the city grew. Enforcement, though, was uneven, and many systems decayed once the crisis passed. Tucson, in the Arizona desert, chose persuasion instead of compulsion: the city hands out rebates that repay households part of the cost of tanks and rain gardens, and it now requires new commercial buildings to meet part of their landscaping demand with harvested water. The two cities' fortunes suggest that the law on paper matters less than what happens on the roof five years later.

E — The economics attract sharper argument. The economist Nadia Haddad has compared costs across dozens of projects, and her conclusion is uncomfortable: counted litre for litre, water from a household tank often costs more than the same litre from the mains, once the tank, the pumps and the maintenance are honestly priced. Domestic tanks are frequently the wrong size for the roof they serve, she finds, and subsidy schemes tend to reward wealthier householders who would have installed systems anyway, while renters and the poor, who cannot alter the buildings they live in, get nothing. Harvesting, in her view, deserves support only where it is genuinely the cheapest option — and it often is not.

F — Defenders reply that the litre-for-litre ledger misses most of what harvesting actually does. The engineer Marcus Bell points out that every tank that fills during a storm is also flood protection, quietly subtracting water from the surge that would otherwise swamp the drains, and that a city whose roofs feed its aquifer holds a reserve that keeps working when pipes burst or reservoirs run low. The real product, Bell argues, is not cheap water but resilience, and resilience never looks economic until the day it is needed. On one point, every camp agrees, and it echoes Qureshi's history lesson: tanks and recharge wells are not machines that can be installed and forgotten, but small pieces of infrastructure that live or die by maintenance — and by whether the people who own the roofs believe the water belongs to them.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "examples of financial encouragement offered by a city", answer: "D" },
        { n: 15, type: "match", group: "minfo", prompt: "a description of how dirt is kept out of stored rainwater", answer: "C" },
        { n: 16, type: "match", group: "minfo", prompt: "an explanation of why traditional harvesting structures fell out of use", answer: "B" },
        { n: 17, type: "match", group: "minfo", prompt: "a comparison between the cost of harvested water and mains water", answer: "E" },
        { n: 18, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — How a rooftop system works",
            lines: [
              "The first water of each storm is thrown away, because it carries the {{18}} that has settled on the roof, and a {{19}} over the inlet stops leaves entering the tank.",
              "Stored water is generally used for toilets and {{20}}, which make up a large share of what a household consumes.",
              "When the tank overflows, the extra water can be sent down special recharge {{21}}, so that it soaks away and helps to refill the {{22}} lying under the city.",
            ],
          },
          answer: "dust" },
        { n: 19, type: "gap", group: "sum2", answer: "screen" },
        { n: 20, type: "gap", group: "sum2", answer: "gardens" },
        { n: 21, type: "gap", group: "sum2", answer: "wells" },
        { n: 22, type: "gap", group: "sum2", answer: "aquifer" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Rosa Delgado",
            "Farhan Qureshi",
            "Nadia Haddad",
            "Marcus Bell",
            "Elena Petrova",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. There are more names than statements, so you will not use them all.",
          prompt: "Harvested water can be more expensive than water from the ordinary supply.", answer: "C" },
        { n: 24, type: "match", group: "people", prompt: "Old harvesting systems were given up once piped water became available.", answer: "B" },
        { n: 25, type: "match", group: "people", prompt: "The true value of harvesting lies in more than the water it collects.", answer: "D" },
        { n: 26, type: "match", group: "people", prompt: "Groundwater levels have risen where recharge wells are in use.", answer: "A" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Does colour change how we think?",
      passage: `Walk through any airport bookshop and you will find the claims waiting on the shelves: paint your office blue and creativity will flow; expose athletes to red and they will surge with aggression; feed children in yellow rooms and they will chatter, in pink ones and they will doze. Colour psychology is a thriving trade. Consultancies advise corporations on the emotional wavelength of their logos, hospitals repaint wards on the strength of half-remembered studies, and marketing textbooks state flatly that warm hues stimulate and cool hues soothe, as though the matter were settled physics. It is not. The awkward truth, familiar to anyone who reads the research rather than the summaries of it, is that the confidence of these claims runs far ahead of the evidence that supports them. Colour almost certainly does influence us — but weakly, conditionally, and in ways the posters and paint charts rarely acknowledge.

The most solid findings come from a narrow and surprising corner: the psychology of tests. In a series of experiments beginning in the 2000s, researchers gave volunteers puzzles from intelligence tests and varied one tiny detail — the colour of the participant number, the cover page or the instruction ink. People who glimpsed red before starting scored consistently worse than those who saw green or grey, even though almost none of them could later recall what colour they had seen. The proposed mechanism is avoidance: through years of corrected homework and warning signs, red has come to whisper of errors and danger, and that whisper is enough to make a test-taker cautious, narrow and slightly worse. What unsettled psychologists was not the size of the effect, which was modest, but the demonstration that so small a cue could move measured performance at all.

Other celebrated results have aged less well. In the late 1970s, an American researcher reported that a particular shade of bubble-gum pink — later named Baker-Miller pink — appeared to calm agitated detainees within minutes, and the finding escaped the laboratory at extraordinary speed. Holding cells, school corridors and hospital rooms were repainted; one university even painted the visiting team's changing room pink to soften opponents before the game. But when other researchers repeated the work with proper controls, the calming effect usually failed to appear, and several studies found no difference at all between pink cells and grey ones. The pink-room episode has become a small classic in the history of science: an appealing result, a tiny sample, a press release, and decades of repainting before anyone checked whether the effect was real.

Part of the problem is that colour refuses to mean one thing. The red that depresses test scores appears to do the opposite on the sports field, where analyses of combat sports at the Olympic Games found that competitors assigned red kit won slightly more often than those in blue — an edge attributed to red's ancient association with dominance and threat. In courtship, the same wavelength signals attraction rather than danger. A theory known as colour-in-context makes sense of the contradictions: colours carry not fixed messages but situational ones, switching meaning as the setting changes, so that asking what red does to people is as empty as asking what a raised voice means without knowing whether it comes from a coach, a judge or a lover.

Where do the meanings come from? The romantic answer is biology — deep instincts written by evolution, the red of blood and ripe fruit, the blue of clear sky and safe water. Some associations probably do have such roots. But the sheer variety of colour meaning across cultures argues that most of it is learned. White, the colour of weddings in one hemisphere, is the colour of mourning in another; the green that reassures a Western driver carries religious weight elsewhere; and the pink-for-girls convention, often defended as timeless, is barely a century old — early twentieth-century advice sometimes recommended pink for boys, as the stronger colour. A child does not inherit these codes; a child absorbs them, the way vocabulary is absorbed, and what is absorbed can differ from place to place and change within a lifetime.

The last decade of psychology, with its unsparing insistence on repeating experiments before believing them, has been hard on colour research, and the honest summary is now easy to state. A few effects, such as red's small drag on test performance, have survived replication reasonably well; many others, including most of what fills the marketing textbooks, have shrunk or vanished when tested at proper scale. The reasonable conclusion is not that colour is powerless, but that its powers are real, small and tied tightly to context — a nudge among a hundred larger forces, not a lever. That will disappoint anyone hoping to transform a company with a logo or pacify a prison with a paint roller. It should not disappoint scientists. Small, conditional, learnable effects are exactly what one would expect from a signal that human beings invented most of the meanings for; the interesting work now is mapping when the nudge operates, not repeating the fairy tale that it rules us.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer suggests that popular claims about colour", options: ["A are based on the latest research", "B are stated with more certainty than the evidence allows", "C have been rejected by the marketing industry", "D apply only to offices and hospitals"], answer: "B" },
        { n: 28, type: "mcq", prompt: "What surprised psychologists about the test experiments was that", options: ["A red improved performance on some puzzles", "B participants remembered the colours clearly", "C the effect was larger than any previously found", "D such a minor signal could affect results at all"], answer: "D" },
        { n: 29, type: "mcq", prompt: "What point does the writer make about Baker-Miller pink?", options: ["A Its early results were not confirmed when the work was repeated", "B It is still the standard colour for holding cells", "C It calms some groups of people but not others", "D Its effect becomes stronger with longer exposure"], answer: "A" },
        { n: 30, type: "mcq", prompt: "In the final paragraph, the writer concludes that colour effects", options: ["A were invented entirely by advertisers", "B depend mainly on an individual's personality", "C exist but are minor and tied to the situation", "D will soon be explained by evolutionary biology"], answer: "C" },
        { n: 31, type: "ynng", prompt: "Some widely repeated claims about colour rest on weak evidence.", answer: "YES" },
        { n: 32, type: "ynng", prompt: "Painting a room pink is a dependable way of calming people.", answer: "NO" },
        { n: 33, type: "ynng", prompt: "Blue is the most pleasant colour for most people.", answer: "NOT GIVEN" },
        { n: 34, type: "ynng", prompt: "The message a colour sends depends on the situation in which it appears.", answer: "YES" },
        { n: 35, type: "ynng", prompt: "Most colour associations are fixed in humans at birth.", answer: "NO" },
        { n: 36, type: "gap", group: "wl",
          box: ["attention", "caution", "context", "emotion", "learning", "replication", "samples", "profits", "instinct"],
          boxTitle: "List of Words",
          notes: {
            title: "Summary — Why colour research is difficult",
            lines: [
              "Many of the best-known colour experiments used small {{36}}, so their findings were fragile,",
              "and later attempts at {{37}} often produced no effect at all.",
              "A further difficulty is that a single colour can send opposite messages, which means its influence depends on {{38}}.",
              "In addition, most colour associations appear to be a product of {{39}} rather than of biology.",
              "The writer therefore advises treating confident commercial claims with {{40}}.",
            ],
          },
          answer: "G" },
        { n: 37, type: "gap", group: "wl", answer: "F" },
        { n: 38, type: "gap", group: "wl", answer: "C" },
        { n: 39, type: "gap", group: "wl", answer: "E" },
        { n: 40, type: "gap", group: "wl", answer: "B" },
      ],
    },
  ],
};
