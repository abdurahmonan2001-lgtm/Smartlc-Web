// Smart LC Practice Set 3 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET3_READING = {
  id: "pset3-reading",
  bookId: "pset3",
  title: "Practice Set 3 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "Lighting the city streets",
      passage: `For most of history, night in the city meant something close to total darkness. Once the sun went down, respectable life withdrew indoors, and many towns enforced the point with a curfew: a bell rang in the evening, the gates were shut, and anyone found in the streets after that hour without good reason could be arrested. Those who did have to travel made their own arrangements. In London a pedestrian could hire one of the so-called link-boys, children who ran ahead of their customers carrying burning torches to light the way. It was a service used with caution, for the boys had a mixed reputation: while most were honest, some were said to work with thieves, guiding a well-dressed customer not to his door but into an unlit lane where accomplices were waiting. City councils, for their part, planned around the sky. Meetings, banquets and journeys were fixed for nights near the full moon, the only reliable source of public light there was.

The first serious attempt to light a whole city came in Paris. In 1667 the city's newly appointed chief of police, Gabriel Nicolas de la Reynie, ordered thousands of lanterns, each holding a candle, to be hung on ropes above the middle of the streets, where no passer-by could steal them and no shopkeeper could claim them as his own. The scheme was funded by a special tax, and it transformed the city's reputation: within a generation Paris was being called the city of light, and visitors wrote home in astonishment about streets that could be walked at midnight. Other cities copied the idea, replacing candles with lamps that burned oil, much of it obtained from whales hunted in the North Atlantic. Improved burners at the end of the eighteenth century made the flame brighter and steadier, but oil lighting remained feeble, expensive and demanding: every lamp had to be filled, trimmed and cleaned by hand.

The real revolution arrived with gas. In the 1790s the Scottish engineer William Murdoch, experimenting at his home in Cornwall, found that the gas given off by heating coal could be piped and burned as a steady flame, and he lit his own house with it. In 1807 the promoter Frederick Winsor staged a public demonstration in Pall Mall in London, the first street in the world lit by gas. Critics were loud: pamphlets warned that the pipes would leak, that the gasworks would poison the air, and that whole streets might explode. The public, however, voted with its feet, strolling in the evening simply to look at the new lamps, and within a few decades tens of thousands of gas lamps burned in London alone. The system had its own workforce, the lamplighters, who walked fixed rounds at dusk lighting each lamp high above the street with long poles, and returned at dawn to put them out.

Electricity entered the streets in stages, and its first form was almost too much of a good thing. The arc lamp, in which a blinding spark leaps continuously between two carbon rods, was demonstrated on the boulevards of Paris in 1878, and observers agreed that it turned night into day. That was precisely the problem: the glare was so fierce that arc lighting suited large open spaces, squares, docks and railway stations, far better than narrow residential streets, where it dazzled pedestrians and threw everything outside its circle into deeper shadow. Some American cities drew the logical conclusion and lifted the lamps out of reach altogether, mounting clusters of arc lights on tall towers, fifty metres high or more, that flooded whole districts with a pale imitation of moonlight. The gentler incandescent bulb made street-level electric lighting practical, and in 1881 the small English town of Godalming became one of the first places anywhere to light its streets with the new lamps.

For much of the twentieth century, the story was one of efficiency rather than spectacle. The sodium lamp, introduced in the 1930s, produced its familiar orange glow using far less electricity than the lamps it replaced, and it spread along roads and motorways until, seen from the air at night, entire countries appeared wrapped in the same amber haze. Drivers benefited, but the colour flattened every face and building into the same dull tone, and astronomers began to complain that the glow was washing the stars out of the sky.

The present century has brought the LED, which cuts energy use again and, because each lamp can be dimmed or brightened remotely, gives cities minute-by-minute control of their lighting for the first time. It has also brought second thoughts. Researchers have shown that artificial light at night disturbs insects in enormous numbers, drawing them from the surrounding darkness until they die of exhaustion around the lamps, and that it interferes with human sleep as well. Some cities now dim their streets after midnight or shield their lamps so that light falls only where it is needed. Three and a half centuries after Paris hung out its first lanterns, the ambition has quietly reversed: the modern city is learning how to put some of its darkness back.`,
      questions: [
        { n: 1, type: "gap", prompt: "In London, pedestrians could pay boys to light their way with burning ______.", note: "ONE WORD ONLY", answer: "torches",
          explain: "The link-boys were children paid to run ahead of customers carrying burning torches, so 'torches' completes the sentence. 'Pay' in the question paraphrases 'hire' in the passage.",
          evidence: "children who ran ahead of their customers carrying burning torches",
          vocab: ["hire", "pay"] },
        { n: 2, type: "gap", prompt: "Many of the lamps that replaced candle lanterns burned oil that came from ______.", note: "ONE WORD ONLY", answer: "whales",
          explain: "The lamps that replaced candles burned oil, and the passage says much of that oil was obtained from whales hunted in the North Atlantic.",
          evidence: "much of it obtained from whales hunted in the North Atlantic",
          vocab: ["obtained from", "came from"] },
        { n: 3, type: "gap", prompt: "The gas used for street lighting was produced by heating ______.", note: "ONE WORD ONLY", answer: "coal",
          explain: "'Produced by heating' paraphrases 'given off by heating': Murdoch discovered that heating coal releases a gas which can be piped and burned as a flame.",
          evidence: "the gas given off by heating coal could be piped",
          vocab: ["given off by", "produced by"] },
        { n: 4, type: "gap", prompt: "Lamplighters lit lamps that hung high above the street using long ______.", note: "ONE WORD ONLY", answer: "poles",
          explain: "The lamplighters walked fixed rounds at dusk and lit each lamp high above the street with long poles, so 'poles' is the missing word.",
          evidence: "lighting each lamp high above the street with long poles" },
        { n: 5, type: "gap", prompt: "In some American cities, groups of arc lamps were mounted on very tall ______.", note: "ONE WORD ONLY", answer: "towers",
          explain: "'Groups' in the question paraphrases 'clusters' in the passage: American cities mounted clusters of arc lights on tall towers of fifty metres or more.",
          evidence: "mounting clusters of arc lights on tall towers",
          vocab: ["clusters", "groups"] },
        { n: 6, type: "gap", prompt: "Studies have shown that street lighting at night is harmful to ______ as well as to people.", note: "ONE WORD ONLY", answer: "insects",
          explain: "'Is harmful to' paraphrases 'disturbs': researchers showed that night lighting disturbs insects in enormous numbers and also interferes with human sleep.",
          evidence: "artificial light at night disturbs insects in enormous numbers",
          vocab: ["disturbs", "is harmful to"] },
        { n: 7, type: "tfng", prompt: "In some towns, people needed a valid reason to be outside after the evening bell.", answer: "TRUE",
          explain: "TRUE: anyone found outside after the curfew bell 'without good reason could be arrested', so people did need a valid reason to be in the streets.",
          evidence: "anyone found in the streets after that hour without good reason could be arrested",
          vocab: ["without good reason", "a valid reason"] },
        { n: 8, type: "tfng", prompt: "The lanterns introduced in Paris in 1667 were paid for by individual householders.", answer: "FALSE",
          explain: "FALSE: the passage says the lantern scheme was funded by a special tax, not by individual householders, so the statement contradicts the text directly.",
          evidence: "The scheme was funded by a special tax",
          vocab: ["funded by", "paid for by"] },
        { n: 9, type: "tfng", prompt: "Link-boys earned more money in winter than in summer.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage discusses the link-boys' honesty and mixed reputation, but their earnings — in winter, summer or at all — are never mentioned.",
          evidence: "the boys had a mixed reputation" },
        { n: 10, type: "tfng", prompt: "Some people believed that gas lighting was a danger to the public.", answer: "TRUE",
          explain: "TRUE: critics' pamphlets warned that the pipes would leak, the gasworks would poison the air and streets might explode — clearly a belief that gas endangered the public.",
          evidence: "pamphlets warned that the pipes would leak",
          vocab: ["pamphlets warned", "people believed"] },
        { n: 11, type: "tfng", prompt: "Arc lamps were considered unsuitable for small residential streets.", answer: "TRUE",
          explain: "TRUE: arc light suited large open spaces 'far better than narrow residential streets', where it dazzled pedestrians — in other words, it was unsuitable for small streets.",
          evidence: "far better than narrow residential streets, where it dazzled pedestrians" },
        { n: 12, type: "tfng", prompt: "Sodium lamps consumed more electricity than the lighting they replaced.", answer: "FALSE",
          explain: "FALSE: the sodium lamp produced its glow using far less electricity than the lamps it replaced — the exact opposite of consuming more.",
          evidence: "using far less electricity than the lamps it replaced" },
        { n: 13, type: "tfng", prompt: "LED street lamps need to be replaced less often than sodium lamps.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage covers the LED's lower energy use and remote dimming, but it never says how often any type of lamp must be replaced.",
          evidence: "the LED, which cuts energy use again" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Special delivery: drones over the city",
      passage: `A — The promise has been repeated so often that it has become part of the furniture of the future: order a pair of shoes, and thirty minutes later a small aircraft lowers the box onto your doorstep. Retailers began filing patents for drone delivery more than a decade ago, and pilot schemes have multiplied ever since — parcels crossing Icelandic bays, burritos descending onto Australian lawns. The most convincing results, however, have come from places with no doorsteps at all. In parts of East Africa, fixed-wing drones have for years been carrying blood supplies and vaccines from central stores to rural clinics, cutting delivery times from hours to minutes across terrain where roads wash away every rainy season. The technology plainly works. Whether it works for the everyday shopping of a crowded city is a different question, and a surprisingly complicated one.

B — The economic case rests on a peculiarity of logistics known as the last-mile problem. Moving a container across an ocean is astonishingly cheap per item; what is expensive is the final stage, in which a single parcel travels from a local depot to a single front door. Ruth Vandermeer, a logistics analyst who has spent twenty years modelling delivery networks, calculates that this closing stage regularly accounts for about half of a parcel's total shipping cost, since it resists every economy of scale: one van, one driver, one address at a time. It is exactly here, she notes, that a drone looks attractive. It needs no driver, no fuel and no parking space, and studies suggest the marginal cost of a short flight could fall below a single dollar. But the same analysis defines the machine's limits: drones pay their way only for parcels that are light, urgent and travelling alone. Nobody will ever air-lift a sofa, and a van that drops off two hundred packages in an afternoon remains unbeatable for routine, bundled deliveries.

C — The physical obstacles are stubborn. Batteries remain heavy for the energy they store, which caps both the range of a delivery drone and the weight it can lift — most current models carry no more than two or three kilograms. Weather grounds fleets with humiliating ease: strong winds make hovering unstable between tall buildings, and heavy rain or fog can stop operations for a whole day, an awkward trait in a service sold on reliability. The hardest problem of all may be the final three metres. A city customer rarely owns a lawn. Finding safe landing sites among balconies, wires, trees and pedestrians has pushed operators towards compromises — parcels lowered on winches, lockers on rooftops, collection points in car parks — each of which chips away at the doorstep convenience that justified the drone in the first place.

D — Even a drone that lands perfectly must first be listened to. Felix Oduya, an acoustic engineer who has measured drone flights over test neighbourhoods, argues that the industry has misunderstood its noise problem by quoting decibel readings alone. His recordings show that the high-pitched whine of small fast-spinning rotors provokes far more complaints than road traffic of exactly the same measured loudness; the sound is unfamiliar, tonal and hard to ignore, and residents in his surveys described it as more intrusive than lorries. People also rate a noise as more annoying when they receive no benefit from it, which bodes ill for airborne shopping that overflies a hundred households to serve one. Quieter rotor designs exist, flying more slowly helps, and routing flights along railways and canals keeps them away from bedrooms — but silence, Oduya warns, is not on the menu.

E — Then there is the law. Aviation rules were written for aircraft with pilots inside them, and regulators have spent a decade adapting them, cautiously, to aircraft with pilots on the ground or with none at all. Certification for flights beyond the operator's line of sight remains slow and expensive, and rules differ from one country to the next. The urban planner Carmen Ibarra argues that the harder question is not whether drones may fly, but where. Low-altitude airspace over a city, she points out, is a public resource, exactly like the street grid below it. Her proposal is that cities should design formal air corridors — mapping them, capping traffic, charging for access — just as they lay out and manage roads, rather than letting routes be fixed by whichever company arrives first. Historians of technology hear an echo: early motor cars, too, spent years hemmed in by rules written for horse traffic, including the famous requirement that a man walk ahead of each vehicle carrying a red flag, before the law caught up with the machine.

F — So what will actually arrive overhead? Probably not the pizza. Mei Tanaka, who studies medical logistics at a Japanese university, argues that the industry's future lies in exactly the cargo that launched it: blood samples, transplant tissue, defibrillators, emergency medicines — items whose value lies in speed, whose weight is measured in grams, and whose urgency persuades neighbourhoods to tolerate a little noise. Hospital networks in several countries are already linking laboratories by air on precisely this logic. The likeliest future, she suggests, is a quiet one in both senses: not swarms of aircraft carrying shopping to every doorstep, but a thin, specialised traffic of small machines carrying things that genuinely cannot wait.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a prediction about the type of goods drones are most likely to carry", answer: "F",
          explain: "Paragraph F predicts the likeliest cargo: not shopping but small, urgent items such as medicines — a forecast of the goods drones will most probably carry.",
          evidence: "the industry's future lies in exactly the cargo that launched it",
          vocab: ["likeliest", "most likely"] },
        { n: 15, type: "match", group: "minfo", prompt: "figures showing how much of a parcel's transport cost arises at the end of its journey", answer: "B",
          explain: "The figure is in paragraph B: Vandermeer calculates that the closing stage of delivery regularly accounts for about half of a parcel's total shipping cost.",
          evidence: "regularly accounts for about half of a parcel's total shipping cost",
          vocab: ["closing stage", "end of its journey"] },
        { n: 16, type: "match", group: "minfo", prompt: "examples of weather conditions that can stop drone deliveries", answer: "C",
          explain: "Paragraph C names the weather that grounds fleets: strong winds between tall buildings, and heavy rain or fog that can halt operations for a whole day.",
          evidence: "heavy rain or fog can stop operations for a whole day",
          vocab: ["grounds fleets", "stop drone deliveries"] },
        { n: 17, type: "match", group: "minfo", prompt: "a comparison between the regulation of drones and rules made for an earlier form of transport", answer: "E",
          explain: "The earlier transport is the motor car: paragraph E recalls early cars hemmed in by rules written for horse traffic, including the famous red-flag requirement.",
          evidence: "early motor cars, too, spent years hemmed in by rules written for horse traffic",
          vocab: ["early motor cars", "earlier form of transport"] },
        { n: 18, type: "match", group: "minfo", prompt: "an example of drones already delivering medical supplies", answer: "A",
          explain: "Paragraph A gives the real-world example: fixed-wing drones in East Africa have for years carried blood supplies and vaccines to rural clinics.",
          evidence: "carrying blood supplies and vaccines from central stores to rural clinics",
          vocab: ["blood supplies and vaccines", "medical supplies"] },
        { n: 19, type: "gap", group: "sum3", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why city deliveries are hard for drones",
            lines: [
              "Heavy batteries limit how far a delivery drone can fly and the {{19}} it is able to carry.",
              "The weather is a further constraint: strong {{20}} make it difficult for drones to hover among tall buildings, and rain or fog can halt flights entirely.",
              "In crowded districts it is also hard to find safe {{21}} sites, so operators use winches, rooftop lockers and collection points instead of the doorstep.",
              "Finally, residents object to the high-pitched {{22}} of the rotors, which annoys people more than traffic of the same loudness.",
            ],
          },
          answer: "weight",
          explain: "The summary mirrors the passage: heavy batteries cap both the range and 'the weight it can lift', so the gap is 'weight' — what the drone carries.",
          evidence: "caps both the range of a delivery drone and the weight it can lift",
          vocab: ["it can lift", "able to carry"] },
        { n: 20, type: "gap", group: "sum3", answer: ["winds", "wind"],
          explain: "The passage says strong winds make hovering unstable between tall buildings; the summary keeps the word 'strong', so the noun 'winds' completes the sentence.",
          evidence: "strong winds make hovering unstable between tall buildings" },
        { n: 21, type: "gap", group: "sum3", answer: "landing",
          explain: "'Safe ___ sites' matches 'safe landing sites' in the passage: the winches, rooftop lockers and collection points are the operators' compromises when landing is difficult.",
          evidence: "Finding safe landing sites among balconies, wires, trees and pedestrians" },
        { n: 22, type: "gap", group: "sum3", answer: "whine",
          explain: "The summary repeats 'high-pitched', pointing to the noun 'whine' — the tonal rotor sound that residents in Oduya's surveys found more intrusive than lorries.",
          evidence: "the high-pitched whine of small fast-spinning rotors",
          vocab: ["provokes far more complaints", "annoys people more"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Ruth Vandermeer", "Felix Oduya", "Carmen Ibarra", "Jonas Berg", "Mei Tanaka"],
          rubric: "Look at the following statements and the list of people below. Match each statement with the correct person, A–E. NB There is one person you do not need to use.",
          prompt: "The sound drones make causes more irritation than its loudness alone would predict.", answer: "B",
          explain: "Oduya (B): his recordings show the drone sound provokes more complaints than road traffic of identical measured loudness — irritation beyond what the decibel readings predict.",
          evidence: "provokes far more complaints than road traffic of exactly the same measured loudness",
          vocab: ["complaints", "irritation"] },
        { n: 24, type: "match", group: "people", prompt: "Deliveries connected with health care, rather than shopping, will drive the industry's growth.", answer: "E",
          explain: "Tanaka (E) argues the industry's future lies in medical cargo — blood samples, transplant tissue, emergency medicines — rather than everyday shopping.",
          evidence: "blood samples, transplant tissue, defibrillators, emergency medicines",
          vocab: ["medical logistics", "health care"] },
        { n: 25, type: "match", group: "people", prompt: "Cities should plan and control routes through the air in the same way as they manage streets.", answer: "C",
          explain: "Ibarra (C) proposes that cities design formal air corridors — mapping them, capping traffic and charging for access — just as they lay out and manage roads.",
          evidence: "cities should design formal air corridors",
          vocab: ["formal air corridors", "routes through the air"] },
        { n: 26, type: "match", group: "people", prompt: "The final stage of a parcel's journey is responsible for a large share of its total cost.", answer: "A",
          explain: "Vandermeer (A) made the calculation: the closing stage of a parcel's journey accounts for about half of its total shipping cost — a large share arising at the end.",
          evidence: "this closing stage regularly accounts for about half of a parcel's total shipping cost",
          vocab: ["about half", "a large share"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Why we put things off",
      passage: `Everyone recognises the scene. The report is due on Friday; it is now Tuesday evening; and the person responsible for it is alphabetising the spice rack. Ask the culprit why, and the answer will usually be an apology dressed as a diagnosis: I'm lazy, I'm disorganised, I'm hopeless with time. Popular advice accepts the diagnosis and prescribes accordingly — buy a planner, make a schedule, switch off your phone. Yet this whole framing, comfortable as it is, fails the most basic test: it cannot explain the behaviour it describes. The procrastinator is rarely idle. She is often working hard, sometimes frantically, on precisely the wrong things; the spice rack has never been so orderly. Nor is she ignorant of the clock — on the contrary, few people are more agonisingly aware of the passing hours than someone avoiding a deadline. Whatever procrastination is, it is not a shortage of energy and not a failure to own a calendar, and treating it as either has produced a self-help industry with a remarkably poor record.

A more persuasive account begins in an unexpected place: not with time, but with feeling. On this view, we postpone a task not because we underestimate the hours it needs but because of the emotions the task itself stirs up. A tax return radiates tedium; a difficult email threatens conflict; a thesis chapter carries the weight of judgement. Turning away from the task is, in that moment, a highly effective way of switching off the discomfort — psychologists who study the behaviour describe it as repairing one's mood by escape, giving in to feel good. Crucially, this explains the otherwise puzzling choice of substitute activities. The procrastinator does not lie down; she cleans, answers harmless messages, reorganises files — tasks chosen not for their importance but because they are soothing: finishable, blameless and mildly virtuous.

The repair, however, is a loan at high interest. The relief of setting a dreaded task aside fades within minutes, while the task itself waits, now a little larger, and the evening acquires a familiar background hum of guilt. Studies that track people through a working week find that those who postpone the most report more stress and poorer sleep, not less, and students who habitually delay tend to earn lower grades along with higher anxiety. There is a crueller mechanism at work too: each escape is rewarded by that first flush of relief, and rewarded behaviour repeats itself. The habit thus feeds on its own consequences, which is why stern resolutions made at midnight so rarely survive contact with the following afternoon.

Why does the future not frighten us into action sooner? Part of the answer seems to be that, at the moment of choice, the future barely feels like ours. In brain-imaging experiments, researchers watched the patterns of activity that appeared when volunteers thought about themselves, about strangers, and about themselves ten years from now. The result was uncomfortable: for many people, thinking about their future self produced activity closer to the stranger pattern than to the self pattern. The person who will pay for tonight's delay is, neurologically speaking, somebody else. Economists reach the same conclusion from a different direction: rewards and punishments shrink drastically in imagined value as they move away in time. Hand students a deadline months away and most will delay longer than those given one next week, not because they misjudge the calendar but because a distant cost weighs almost nothing today.

The task itself matters as much as the person. Work is postponed most reliably when it is boring, frustrating or personally threatening — and, above all, when it is vague. An instruction to "make progress on the project" offers no obvious first move, and the mind, offered no handle, slides off the surface. Ambition can make things worse. For the perfectionist, an imperfect draft is not a stage of the work but evidence against the self, and the safest way never to produce an imperfect result is never to begin; the extreme procrastinator is thus often not the laziest person in the office but the one who cares most desperately about the quality of what she has not yet started.

If the disease is emotional, the cures should be too, and the evidence suggests they are. In one much-quoted study, researchers followed students who had procrastinated badly before their first examination. Those who reported forgiving themselves for the lapse — rather than marinating in guilt — procrastinated significantly less before the second examination, apparently because forgiveness drained the task of its accumulated dread. Other well-supported tactics work by shrinking the emotional cliff: cutting a formless project into concrete, almost laughably small steps gives the mind a first move that costs little courage to make, and deciding in advance exactly when and where the work will happen removes the nightly renegotiation in which the present self always wins. What unites these remedies is what they quietly abandon: the heroic model of gritted teeth. Willpower, the research suggests, is the least dependable tool in the box, a resource that fails precisely when feelings run strongest. The procrastinator's problem was never that she could not manage time. It was that no one had taught her what the delay was for.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer's main purpose is to", options: ["A describe a typical evening of procrastination", "B recommend planners and schedules as remedies", "C argue that a widely accepted explanation is wrong", "D show that procrastinators are unaware of time passing"], answer: "C",
          explain: "The paragraph presents the popular laziness diagnosis only to attack it: the framing 'fails the most basic test' because it cannot explain the behaviour it describes.",
          evidence: "this whole framing, comfortable as it is, fails the most basic test",
          vocab: ["this whole framing", "accepted explanation"] },
        { n: 28, type: "mcq", prompt: "According to the second paragraph, people postpone a task chiefly because", options: ["A avoiding it removes an unpleasant feeling", "B they underestimate the hours the task needs", "C substitute activities are more important", "D they prefer working on several things at once"], answer: "A",
          explain: "Turning away from the task is 'a highly effective way of switching off the discomfort' — avoidance removes an unpleasant feeling, not a misjudged timetable.",
          evidence: "a highly effective way of switching off the discomfort",
          vocab: ["switching off the discomfort", "removes an unpleasant feeling"] },
        { n: 29, type: "mcq", prompt: "The brain-imaging experiments described by the writer showed that", options: ["A volunteers disliked thinking about strangers", "B imagining the future is impossible for many people", "C brain activity is identical for all mental tasks", "D people's future selves are processed much like other people"], answer: "D",
          explain: "Thinking about the future self produced brain activity closer to the stranger pattern than the self pattern, so future selves are processed much like other people.",
          evidence: "produced activity closer to the stranger pattern than to the self pattern",
          vocab: ["the stranger pattern", "like other people"] },
        { n: 30, type: "mcq", prompt: "The writer refers to the study of students and their examinations in order to show that", options: ["A examinations are a major cause of procrastination", "B letting go of guilt reduces future delay", "C forgiving other people improves academic results", "D students procrastinate more before a first examination"], answer: "B",
          explain: "The study is cited to show that students who forgave themselves procrastinated significantly less before the second exam — letting go of guilt reduces future delay.",
          evidence: "procrastinated significantly less before the second examination",
          vocab: ["forgiving themselves", "letting go of guilt"] },
        { n: 31, type: "ynng", prompt: "Explaining procrastination as poor time management overlooks its true cause.", answer: "YES",
          explain: "YES: the writer insists procrastination is not 'a failure to own a calendar' — the time-management framing cannot explain the behaviour, so it misses the real cause.",
          evidence: "it is not a shortage of energy and not a failure to own a calendar",
          vocab: ["hopeless with time", "poor time management"] },
        { n: 32, type: "ynng", prompt: "Postponing a task leaves people feeling better for the rest of the day.", answer: "NO",
          explain: "NO: the relief fades within minutes, the task grows a little larger, and the evening acquires a background hum of guilt — the opposite of feeling better.",
          evidence: "The relief of setting a dreaded task aside fades within minutes",
          vocab: ["relief", "feeling better"] },
        { n: 33, type: "ynng", prompt: "Procrastination is more common among young people than among older people.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: students and workers are mentioned, but the passage never compares young people with older people, so no view is expressed either way.",
          evidence: "students who habitually delay tend to earn lower grades" },
        { n: 34, type: "ynng", prompt: "Tasks with no clear starting point are especially likely to be postponed.", answer: "YES",
          explain: "YES: work is postponed most reliably when it is vague, because a vague instruction 'offers no obvious first move' — exactly a task with no clear starting point.",
          evidence: "and, above all, when it is vague",
          vocab: ["no obvious first move", "no clear starting point"] },
        { n: 35, type: "ynng", prompt: "Willpower is the most dependable defence against procrastination.", answer: "NO",
          explain: "NO: the writer calls willpower 'the least dependable tool in the box', failing precisely when feelings run strongest — the reverse of the most dependable defence.",
          evidence: "the least dependable tool in the box" },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "may never begin the work at all.",
            "strengthens the habit of avoidance.",
            "tend to delay longer than people given a nearer one.",
            "shows that laziness is passed down in families.",
            "makes the first move feel far less daunting.",
            "is less likely to put off similar work again.",
            "proves that deadlines serve no purpose.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "People who are set a distant deadline", answer: "C",
          explain: "Students handed a deadline months away delay longer than those given one next week, because a distant cost 'weighs almost nothing today'.",
          evidence: "most will delay longer than those given one next week",
          vocab: ["a deadline months away", "a distant deadline"] },
        { n: 37, type: "match", group: "ends", prompt: "Someone who pardons their own earlier delay", answer: "F",
          explain: "'Pardons their own earlier delay' paraphrases 'forgiving themselves for the lapse': those students procrastinated significantly less before the next examination.",
          evidence: "forgiving themselves for the lapse",
          vocab: ["forgiving themselves", "pardons"] },
        { n: 38, type: "match", group: "ends", prompt: "A perfectionist who dreads an imperfect result", answer: "A",
          explain: "For the perfectionist an imperfect draft is 'evidence against the self', so the safest way never to produce one is never to begin the work at all.",
          evidence: "the safest way never to produce an imperfect result is never to begin" },
        { n: 39, type: "match", group: "ends", prompt: "Dividing a shapeless project into small concrete steps", answer: "E",
          explain: "Cutting the project into laughably small steps gives the mind a first move that 'costs little courage' — in other words, the first move feels far less daunting.",
          evidence: "gives the mind a first move that costs little courage to make",
          vocab: ["a formless project", "a shapeless project"] },
        { n: 40, type: "match", group: "ends", prompt: "The short-lived relief that follows an escape from a task", answer: "B",
          explain: "Each escape is rewarded by a first flush of relief, and 'rewarded behaviour repeats itself' — the brief relief strengthens the habit of avoidance.",
          evidence: "each escape is rewarded by that first flush of relief",
          vocab: ["first flush of relief", "short-lived relief"] },
      ],
    },
  ],
};
