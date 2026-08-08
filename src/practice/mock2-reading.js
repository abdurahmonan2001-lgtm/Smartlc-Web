// Smart LC Mock Test 2 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// (completion + TFNG), P2 discursive with lettered paragraphs
// (matching-information + summary + features), P3 argumentative
// (MCQ-4 + sentence endings + YNNG). Key quotas: TFNG ~40/40/20 with no
// runs of three, flat letters, unique concrete-noun answers.
export const MOCK2_READING = {
  id: "mock2-reading",
  bookId: "mock2",
  title: "Mock Test 2 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "A small piece of paper that changed the world",
      passage: `It is difficult now to imagine how awkward sending a letter once was. In Britain before 1840, postage was normally paid not by the sender but by the recipient, who could examine the letter at the door and refuse it — a common trick was to agree a code with a distant relative, glance at the outside of the letter, and hand it back unopened, the message received and not a penny spent. Prices were high and bewildering: the cost depended on the number of sheets of paper and on the distance the letter had to travel, so that a two-page letter from London to Edinburgh might cost more than a labourer earned in a day.

The man who untangled this system was not a postal official at all. Rowland Hill was a schoolmaster and inventor who, in 1837, published a pamphlet arguing that the true cost of delivering a letter had almost nothing to do with how far it went. The expensive part was the clerical labour: calculating each charge, recording it, and collecting the money at the door. Hill's remedy was radical simplicity. There should be one low, uniform rate — a single penny — for any letter of a given weight, sent anywhere in the country; and the postage should be prepaid by the sender, proved by a small printed label stuck to the envelope.

That label appeared in May 1840. The Penny Black, as it became known, carried a profile of the young Queen Victoria against a dark background, and it transformed the economics of communication almost overnight. Prepayment put an end to the refused-letter game, and the flat rate made writing home an ordinary habit rather than a luxury: the number of letters posted in Britain more than doubled within a year, and kept climbing for decades.

The stamp itself, however, still had rough edges — literally. The first stamps were printed in sheets with no easy way to divide them, and post office clerks and customers alike had to cut them apart with scissors, a slow business that left many stamps damaged. The solution came in 1854, when a machine designed by the engineer Henry Archer was adopted: it punched rows of tiny holes between the stamps, the perforations that still let a stamp be torn cleanly from a sheet today.

Other countries needed little persuading. Brazil issued its famous "bull's eye" stamps in 1843, several Swiss cantons produced their own in the same period, and within twenty years the adhesive postage stamp was a worldwide standard. Almost as quickly, an unexpected side effect appeared: people began to keep stamps rather than use them. Within a generation the hobby had dealers, albums, catalogues and a grand name of its own — philately — and rare specimens were changing hands for remarkable sums. Governments noticed that the small labels doubled as advertisements for the nation, and stamps grew into miniature galleries of kings, birds, battles and inventions.

Electronic communication has, of course, done to the letter what the letter once did to the messenger on horseback. Yet the stamp has outlived the habit that created it. Collectors still meet, catalogues are still printed, and a scrap of gummed paper from 1840 — of which millions were made — can now sell for more than a house. Rowland Hill's penny label solved a practical problem; it also created, quite by accident, one of the world's most durable objects of desire.`,
      questions: [
        { n: 1, type: "gap", prompt: "Before 1840, the cost of a letter was normally paid by the ______.", note: "ONE WORD ONLY", answer: "recipient" },
        { n: 2, type: "gap", prompt: "Postage was calculated from the number of sheets and the ______ a letter travelled.", note: "ONE WORD ONLY", answer: "distance" },
        { n: 3, type: "gap", prompt: "Hill argued that the greatest expense in the old system was clerical ______.", note: "ONE WORD ONLY", answer: "labour" },
        { n: 4, type: "gap", prompt: "Under Hill's plan, a single rate applied to any letter of a given ______.", note: "ONE WORD ONLY", answer: "weight" },
        { n: 5, type: "gap", prompt: "Early stamps had to be separated from the sheet using ______.", note: "ONE WORD ONLY", answer: "scissors" },
        { n: 6, type: "gap", prompt: "Archer's machine punched the small holes known as ______.", note: "ONE WORD ONLY", answer: "perforations" },
        { n: 7, type: "tfng", prompt: "The Penny Black showed a portrait of a monarch.", answer: "TRUE" },
        { n: 8, type: "tfng", prompt: "Rowland Hill was working for the postal service when he proposed his reform.", answer: "FALSE" },
        { n: 9, type: "tfng", prompt: "Prepayment ended the practice of refusing letters at the door.", answer: "TRUE" },
        { n: 10, type: "tfng", prompt: "The design of the Penny Black was chosen through a public competition.", answer: "NOT GIVEN" },
        { n: 11, type: "tfng", prompt: "Perforated stamps were introduced in the same year as the Penny Black.", answer: "FALSE" },
        { n: 12, type: "tfng", prompt: "Some places outside Britain issued stamps within a few years of 1840.", answer: "TRUE" },
        { n: 13, type: "tfng", prompt: "The writer says interest in stamp collecting ended with the rise of electronic communication.", answer: "FALSE" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "Science for everyone",
      passage: `A — On a cold morning each December, thousands of people across the Americas put on warm coats, pick up binoculars and spend the day counting birds. The Christmas Bird Count has run every year since 1900, which makes it one of the longest-running wildlife surveys in existence — and almost nobody taking part is paid to do it. The count is an early and famous example of what is now called citizen science: genuine research carried out, in whole or in part, by volunteers who are not professional scientists.

B — The idea is older than the name. Nineteenth-century lighthouse keepers logged bird migrations, Victorian gardeners recorded the first flowering dates of plants for decades on end, and networks of amateur weather observers supplied the measurements on which early climate records were built. What has changed is scale. The spread of smartphones has turned millions of pockets into portable laboratories, each with a camera, a clock and a satellite position, and the internet allows a project to recruit helpers on every continent at almost no cost.

C — The best-known success of the modern era began with galaxies. In 2007, astronomers sitting on a million telescope images asked the public to help sort spiral galaxies from elliptical ones, expecting a few hundred helpers; within a year, more than 150,000 people had made tens of millions of classifications. Daniel Okoye, an astronomer who has worked with the project's data, points out the lesson that surprised outsiders most: for tasks like recognising a faint spiral arm in a blurry image, "the human eye still beats the algorithm — some judgements simply have not been automated, and volunteers make them in their millions."

D — Scepticism about amateur data has always shadowed the field, and not without reason: an untrained observer can mistake one species for another, or count the same bird twice. Elena Marsh, an ecologist who has audited long-running surveys, argues that the answer lies in design rather than distrust. "With clear instructions, short training and built-in checks — the same photograph judged by many people, obvious errors flagged automatically — volunteer records match professional ones far more often than critics expect. Accuracy is a property of the system, not of the person."

E — Why do people give up their evenings and weekends to classify galaxies or count moths? Money is not the answer, and even scientific curiosity is only part of it. Priya Nair, a social scientist who interviews long-term volunteers, finds that the strongest motives are belonging and purpose: "People stay for the community — the forums, the shared jokes, the feeling of being part of something that matters. The science recruits them; the other people keep them." Projects that ignore this, she notes, watch their helpers quietly drift away.

F — The movement's quiet triumph is that its numbers now carry official weight. Volunteer water-quality tests have triggered investigations of polluted rivers, and amateur air-quality sensors have shifted the placement of monitoring stations. Tomás Herrera, who advises city governments on environmental data, says the change is recent but real: "Ten years ago a minister could wave away volunteer measurements. Today those datasets are cited in court cases and written into official policy. That is a transfer of power, not just of information." Citizen science began as a way for the public to help researchers; increasingly, it is also a way for the public to hold institutions to account.`,
      questions: [
        { n: 14, type: "match", group: "minfo", letters: "ABCDEF",
          rubric: "Reading Passage 2 has six paragraphs, A–F. Which paragraph contains the following information? Write the correct letter, A–F. NB You may use any letter more than once.",
          prompt: "a project whose volunteers judged images better than software", answer: "C" },
        { n: 15, type: "match", group: "minfo", prompt: "examples of unpaid observers from before the twentieth century", answer: "B" },
        { n: 16, type: "match", group: "minfo", prompt: "a response to doubts about the reliability of volunteer records", answer: "D" },
        { n: 17, type: "match", group: "minfo", prompt: "an explanation of why volunteers continue to take part", answer: "E" },
        { n: 18, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — What made modern citizen science possible",
            lines: [
              "Volunteer research is old, but its scale is new. The spread of {{18}} means millions of people now carry an instrument with a camera, clock and location-finder,",
              "while the internet lets projects recruit helpers cheaply worldwide. Good projects protect data quality through short {{19}} and built-in {{20}},",
              "such as having many people judge the same {{21}}. As a result, volunteer datasets are now cited in court and written into official {{22}}.",
            ],
          },
          answer: "smartphones" },
        { n: 19, type: "gap", group: "sum2", answer: "training" },
        { n: 20, type: "gap", group: "sum2", answer: "checks" },
        { n: 21, type: "gap", group: "sum2", answer: "photograph" },
        { n: 22, type: "gap", group: "sum2", answer: "policy" },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: ["Elena Marsh", "Daniel Okoye", "Priya Nair", "Tomás Herrera"],
          rubric: "Match each statement with the correct person, A–D.",
          prompt: "Volunteer measurements now influence legal and government decisions.", answer: "D" },
        { n: 24, type: "match", group: "people", prompt: "Reliable results come from well-designed systems rather than expert observers.", answer: "A" },
        { n: 25, type: "match", group: "people", prompt: "Certain visual judgements are still beyond computers.", answer: "B" },
        { n: 26, type: "match", group: "people", prompt: "Social connection keeps volunteers involved longer than curiosity does.", answer: "C" },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The trouble with choice",
      passage: `Standing before a supermarket shelf that offers ninety kinds of breakfast cereal, it is easy to believe that abundance is an unmixed blessing. Freedom to choose is, after all, close to the heart of what modern societies mean by freedom itself. Yet for two decades psychologists have been arguing about a disquieting possibility: that beyond a certain point, more options make us not freer and happier but hesitant, anxious and less satisfied with whatever we finally pick.

The debate began in earnest with a jar of jam. In a now-celebrated field experiment, researchers set up a tasting table in a California grocery store, sometimes displaying six varieties of jam and sometimes twenty-four. The larger display was better theatre: it drew a substantially bigger crowd. But it was worse commerce — of those who stopped at the twenty-four-jam table, only a tiny fraction went on to buy a jar, while shoppers who had faced just six options bought at roughly ten times that rate. Attention, it seemed, was not the same thing as decision, and too many possibilities could quietly paralyse the will.

Later work suggested that the pain of choosing depends as much on the chooser as on the menu. One line of research divides people into two broad styles. Maximisers approach every decision determined to find the best possible option, and so cannot stop searching until every alternative has been examined; satisficers look until they find something good enough, choose it, and move on. The styles come at different prices. Maximisers do tend to make objectively better choices — they find the higher-paying job, the better-reviewed camera — but study after study finds them less happy with the outcome, more prone to regret, and more likely to keep comparing after the decision is made. Even a good result gives less pleasure when your standard is a perfect one.

If the story had ended there, the practical advice would be simple: cut the options, everywhere and always. But science rarely leaves a tidy story alone. In 2010, researchers pooled the results of fifty separate experiments on choice overload in a single meta-analysis, and the headline finding was deflating: averaged across every study, the effect of adding options was close to zero. Sometimes large assortments hurt, sometimes they helped, and often they made no difference at all. The original phenomenon had not been disproved, but it had been demoted — from a law of human nature to something more conditional, which appears reliably only under particular circumstances.

What are those circumstances? The pattern across studies suggests that choice becomes burdensome when the options are complex and hard to compare, when the chooser knows little about the field, and when no clear favourite exists in advance; it is harmless, even pleasant, when we know what we like and can tell the alternatives apart at a glance. A wine novice facing three hundred unfamiliar bottles suffers; the same wall of labels is a playground to a collector. This reframing shifts the responsibility from the size of the menu to the design of the choosing: what overwhelms us is not number itself but comparison without support.

That conclusion is less dramatic than the jam study, and more useful. It implies that shops, websites and governments do not need to ration our options so much as organise them — sort them into meaningful categories, make the differences visible, and supply honest defaults for those who would rather not become experts. Choice, in other words, is neither poison nor pure freedom. It is an interface problem, and like any interface it can be designed well or badly. The shelf of ninety cereals is only a burden when we are left to face it alone.`,
      questions: [
        { n: 27, type: "mcq", prompt: "What point does the writer make with the jam experiment?", options: ["A Shoppers dislike tasting tables in stores", "B A bigger display attracted people but discouraged buying", "C Six varieties of jam was still too many", "D The researchers expected the result they found"], answer: "B" },
        { n: 28, type: "mcq", prompt: "According to the passage, maximisers typically", options: ["A make worse decisions than satisficers", "B refuse to make decisions at all", "C avoid comparing products before buying", "D feel less pleasure even after good decisions"], answer: "D" },
        { n: 29, type: "mcq", prompt: "The writer cites the 2010 meta-analysis to show that", options: ["A the choice-overload effect is weaker and less general than first believed", "B the jam study was dishonestly reported", "C large assortments always help sales", "D psychologists no longer study consumer choice"], answer: "A" },
        { n: 30, type: "mcq", prompt: "The writer's overall conclusion is that", options: ["A the number of options should be reduced everywhere", "B people should learn to become experts before choosing", "C how choices are organised matters more than how many there are", "D freedom of choice is an illusion"], answer: "C" },
        { n: 31, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "stop searching once an option seems good enough.",
            "helps mainly when options are complex and the chooser inexperienced.",
            "drew a larger crowd but produced far fewer sales.",
            "was rejected by most psychologists as a fraud.",
            "keep examining alternatives in search of the best possible one.",
            "prefer to let other people decide on their behalf.",
            "found that, on average, extra options had almost no effect.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "In the experiment, the twenty-four-jam table", answer: "C" },
        { n: 32, type: "match", group: "ends", prompt: "Maximisers are people who", answer: "E" },
        { n: 33, type: "match", group: "ends", prompt: "Satisficers are people who", answer: "A" },
        { n: 34, type: "match", group: "ends", prompt: "The pooled analysis of fifty studies", answer: "G" },
        { n: 35, type: "match", group: "ends", prompt: "The writer believes reducing options", answer: "B" },
        { n: 36, type: "ynng", prompt: "The writer accepts that a large number of options can delay decisions.", answer: "YES" },
        { n: 37, type: "ynng", prompt: "The writer believes the jam study settled the question of choice overload.", answer: "NO" },
        { n: 38, type: "ynng", prompt: "The writer thinks online retailers deliberately exploit choice overload.", answer: "NOT GIVEN" },
        { n: 39, type: "ynng", prompt: "The writer considers the chooser's expertise relevant to how choice feels.", answer: "YES" },
        { n: 40, type: "ynng", prompt: "The writer concludes that menu size is the most important factor.", answer: "NO" },
      ],
    },
  ],
};
