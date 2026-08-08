// Smart LC Mock Test 1 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC.
export const MOCK1_READING = {
  id: "mock1-reading",
  bookId: "mock1",
  title: "Mock Test 1 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The box that shrank the world",
      passage: `In the spring of 1956, a converted oil tanker left Newark, New Jersey, carrying fifty-eight metal boxes. Few people watching it depart understood that they were witnessing the beginning of a revolution. The boxes belonged to Malcom McLean, a former truck driver from North Carolina who had spent years watching dock workers load cargo item by item — sacks of coffee, barrels of oil, crates of machinery — and wondering why the truck itself could not simply be lifted onto the ship.

McLean's idea, refined into a standard steel container that could move between truck, train and ship without ever being opened, attacked the greatest cost in ocean trade: time in port. Before containers, a cargo ship might spend as long at the quayside as it did at sea. Gangs of longshoremen wrestled each item into place by hand, and theft was so common that dock workers in some ports considered it an unofficial part of their wages. A sealed container changed all of this. Loading time collapsed from weeks to hours, insurance costs fell, and pilfering became dramatically more difficult.

The container's success, however, depended on something unglamorous: agreement. A box that fitted one country's cranes but not another's was of little use, and through the 1960s shipping lines, railways and governments argued over lengths, widths and corner fittings. The compromise that emerged — most importantly the twenty-foot and forty-foot lengths still used today — was not anyone's ideal, but it was everyone's acceptable second choice, and that was enough. Once the standard existed, ports around the world could invest in cranes and storage yards with confidence.

The consequences reached far beyond the docks. Because moving goods became astonishingly cheap, manufacturers no longer needed to sit close to their customers. Factories migrated to wherever production costs were lowest, and complex products began to cross oceans several times before completion. Economists still debate the exact numbers, but many argue that the container did more to accelerate global trade in the twentieth century than every tariff negotiation of the same period combined. The old ports, meanwhile, were transformed beyond recognition. Cities such as London and New York, whose docklands once employed tens of thousands, watched the work move to deep-water terminals outside the city, run by a handful of crane operators. The romance of the waterfront gave way to the quiet efficiency of the box.`,
      questions: [
        { n: 1, type: "tfng", prompt: "Malcom McLean had worked in the trucking industry before 1956.", answer: "TRUE" },
        { n: 2, type: "tfng", prompt: "The first container ship was built specially for McLean in a shipyard.", answer: "FALSE" },
        { n: 3, type: "tfng", prompt: "Before containers, ships could spend as long in port as at sea.", answer: "TRUE" },
        { n: 4, type: "tfng", prompt: "Dock workers were well paid compared with factory workers.", answer: "NOT GIVEN" },
        { n: 5, type: "tfng", prompt: "Sealed containers made stealing cargo easier.", answer: "FALSE" },
        { n: 6, type: "tfng", prompt: "The standard container sizes agreed in the 1960s satisfied nobody completely.", answer: "TRUE" },
        { n: 7, type: "tfng", prompt: "London's docklands now employ more people than in the 1950s.", answer: "FALSE" },
        { n: 8, type: "gap", prompt: "For shipping companies, the biggest expense the container removed was time spent in ______.", note: "ONE WORD ONLY", answer: "port" },
        { n: 9, type: "gap", prompt: "With sealed containers, loading time fell from weeks to ______.", note: "ONE WORD ONLY", answer: "hours" },
        { n: 10, type: "gap", prompt: "International agreement was needed so that boxes fitted every country's ______.", note: "ONE WORD ONLY", answer: "cranes" },
        { n: 11, type: "gap", prompt: "Cheap transport meant factories moved to where ______ costs were lowest.", note: "ONE WORD ONLY", answer: "production" },
        { n: 12, type: "gap", prompt: "Some products now cross ______ several times before they are finished.", note: "ONE WORD ONLY", answer: "oceans" },
        { n: 13, type: "gap", prompt: "Modern deep-water terminals are operated by a small number of ______ operators.", note: "ONE WORD ONLY", answer: "crane" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Farms that grow upwards",
      passage: `A — The idea sounds like science fiction: lettuce growing in towers twelve storeys high, in the middle of a city, under light that never came from the sun. Yet vertical farms — buildings in which crops are stacked in layers and grown without soil — have moved from experiment to industry in less than two decades, with commercial operations now running in Japan, Singapore, the Netherlands and the United States.

B — The attraction is easiest to see in places where land and water are scarce. A vertical farm can produce, per square metre of ground, dozens of times more food than an open field, because the same footprint is used again on every floor. Water use falls even more sharply: the closed systems recycle what the plants do not absorb, cutting consumption by as much as ninety-five per cent compared with conventional irrigation. For a crowded island city that imports most of its vegetables, those numbers are difficult to ignore.

C — The technology's weakness is equally easy to name: electricity. Sunlight is free; the LED lamps that replace it are not. Lighting can account for more than half of a vertical farm's running costs, which is why the industry's fortunes track the price of both power and LED technology so closely. Critics point out that a salad grown under lamps in a rich city can carry a larger carbon footprint than one trucked in from a sunny valley — unless the electricity comes from renewable sources.

D — This economic pressure explains what vertical farms actually grow. Leafy greens, herbs and strawberries dominate: crops that are light, quick to mature, mostly water, and sold at premium prices to nearby restaurants and supermarkets. Wheat, rice and potatoes — the crops that actually feed the world — remain hopelessly uneconomic indoors, and few serious researchers expect that to change soon.

E — Perhaps the most durable argument for growing food in cities is not efficiency but resilience. When a port closes, a border tightens or a drought strikes, a city that grows even a modest share of its own vegetables has options that others lack. Supporters see vertical farms not as a replacement for the countryside, but as an insurance policy against a more turbulent world — one paid for, willingly, in electricity bills.`,
      questions: [
        { n: 14, type: "match", group: "head",
          boxTitle: "List of Headings",
          box: [
            "An industry that grew quickly",
            "The problem of electricity",
            "Insurance for uncertain times",
            "What vertical farms choose to grow",
            "Saving land and water",
            "The crops of the future",
          ],
          rubric: "Reading Passage 2 has five paragraphs, A–E. Choose the correct heading for each paragraph from the List of Headings below. There are more headings than paragraphs.",
          prompt: "Paragraph A", answer: "A" },
        { n: 15, type: "match", group: "head", prompt: "Paragraph B", answer: "E" },
        { n: 16, type: "match", group: "head", prompt: "Paragraph C", answer: "B" },
        { n: 17, type: "match", group: "head", prompt: "Paragraph D", answer: "D" },
        { n: 18, type: "match", group: "head", prompt: "Paragraph E", answer: "C" },
        { n: 19, type: "gap", group: "sum", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Growing upwards",
            lines: [
              "Vertical farms reuse the same ground area on every floor, and their closed systems cut {{19}} use by up to ninety-five per cent.",
              "Electricity is the technology's weak point: {{20}} alone can swallow over half of what a farm spends to operate.",
              "Critics argue an indoor salad is only greener when the power is {{21}}.",
              "Commercially, farms stick to light, fast crops sold at {{22}} prices to nearby buyers.",
            ],
          },
          answer: "water" },
        { n: 20, type: "gap", group: "sum", answer: "lighting" },
        { n: 21, type: "gap", group: "sum", answer: "renewable" },
        { n: 22, type: "gap", group: "sum", answer: "premium" },
        { n: 23, type: "multiselect", group: "adv",
          prompt: "Which TWO advantages of vertical farming are mentioned in the text?",
          options: [
            "far higher yield per square metre of ground",
            "lower production costs than field farming",
            "much lower water consumption",
            "better-tasting produce",
            "no need for trained staff",
          ],
          answer: "A" },
        { n: 24, type: "multiselect", group: "adv", answer: "C" },
        { n: 25, type: "match", group: "crops", boxTitle: "Crops",
          box: ["leafy greens and herbs", "staple crops such as wheat and rice", "strawberries"],
          rubric: "Match each statement with the correct crop group, A–C. NB You may use any letter more than once.",
          prompt: "unlikely to be grown indoors economically in the near future", answer: "B" },
        { n: 26, type: "match", group: "crops", prompt: "sold at high prices to restaurants and supermarkets nearby", answer: "A" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "In praise of forgetting",
      passage: `We tend to speak of forgetting as failure — a leak in the vessel of the mind, an embarrassment at best and an early warning at worst. Psychology long shared this view, treating memory's losses as noise to be minimised. Over the past two decades, however, a growing group of researchers has argued for a radical reversal: forgetting, they claim, is not memory's malfunction but one of its most important functions.

The argument begins with a simple observation about usefulness. A memory system's job is not to store the past but to serve the present — to make available, at speed, the information most likely to matter now. A mind that retained everything with equal clarity would face an impossible search problem every time it tried to recall a name or a route. Forgetting, on this view, is a filter: by letting the irrelevant fade, it keeps the relevant findable. Experiments support the idea. When people are asked to retrieve a particular memory repeatedly, related but competing memories become measurably harder to recall — a phenomenon known as retrieval-induced forgetting. The brain, it seems, actively suppresses alternatives to sharpen the memory in use.

Neuroscience has added a second, more surprising strand. Forgetting was long assumed to be passive decay, the mental equivalent of paint fading in sunlight. It is now clear that the brain contains dedicated mechanisms whose task is to weaken connections — including, in some much-studied species, identifiable cells that actively dismantle memories. Maintaining a memory costs energy; erasing one, it turns out, is also work. Evolution does not usually pay for machinery that serves no purpose.

The third strand is emotional. People who cannot let memories fade do not describe the condition as a gift. Individuals with highly superior autobiographical memory, who can recall almost every day of their adult lives in detail, frequently report that old grievances and embarrassments return with their original force, decade after decade. At the other extreme, the inability to weaken fear memories is one way of describing post-traumatic stress disorder, and several current therapies amount to assisting the brain's natural forgetting processes to do their work.

None of this means that all forgetting is benign; the losses of dementia are not a filter but a fire. The researchers' claim is narrower and stranger: that a healthy memory is defined not by how much it keeps, but by how well it chooses what to lose. Remembering and forgetting, long cast as opponents, are better understood as partners in the same enterprise — a collaboration, conducted below awareness, that decides who we are able to be today.`,
      questions: [
        { n: 27, type: "ynng", prompt: "Psychology has always regarded forgetting as useful.", answer: "NO" },
        { n: 28, type: "ynng", prompt: "The writer thinks a memory system should mainly serve present needs.", answer: "YES" },
        { n: 29, type: "ynng", prompt: "Retrieval-induced forgetting was first observed in animals.", answer: "NOT GIVEN" },
        { n: 30, type: "ynng", prompt: "Erasing a memory requires no energy from the brain.", answer: "NO" },
        { n: 31, type: "ynng", prompt: "People with highly superior autobiographical memory are usually happy with it.", answer: "NO" },
        { n: 32, type: "mcq", prompt: "The writer compares a mind that forgets nothing to", options: ["A a leaking vessel", "B an impossible search problem", "C fading paint", "D a locked library"], answer: "B" },
        { n: 33, type: "mcq", prompt: "The example of fading paint is used to describe", options: ["A how forgetting was once understood", "B how memories are stored", "C a modern theory of memory", "D the effect of sunlight on the brain"], answer: "A" },
        { n: 34, type: "mcq", prompt: "Post-traumatic stress disorder is described as", options: ["A a failure to form memories", "B a failure to weaken fear memories", "C a result of too much forgetting", "D an untreatable condition"], answer: "B" },
        { n: 35, type: "mcq", prompt: "The writer's attitude to the new research is best described as", options: ["A dismissive", "B alarmed", "C persuaded", "D undecided"], answer: "C" },
        { n: 36, type: "gap", group: "wl",
          box: ["filter", "energy", "cells", "fire", "partners", "decay", "noise", "awareness", "effort"],
          boxTitle: "List of Words",
          notes: {
            title: "Summary — The case for forgetting",
            lines: [
              "Modern researchers argue that forgetting acts as a {{36}} which keeps useful memories easy to find.",
              "Far from being passive {{37}}, forgetting involves dedicated brain machinery,",
              "and in some species specific {{38}} actively dismantle memories.",
              "The writer contrasts this healthy process with dementia, described as a {{39}},",
              "and concludes that remembering and forgetting are best seen as {{40}} in a single enterprise.",
            ],
          },
          answer: "A" },
        { n: 37, type: "gap", group: "wl", answer: "F" },
        { n: 38, type: "gap", group: "wl", answer: "C" },
        { n: 39, type: "gap", group: "wl", answer: "D" },
        { n: 40, type: "gap", group: "wl", answer: "E" },
      ],
    },
  ],
};
