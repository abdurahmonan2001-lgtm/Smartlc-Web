// Smart LC Practice Set 18 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET18_READING = {
  id: "pset18-reading",
  bookId: "pset18",
  title: "Practice Set 18 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The sewing machine",
      passage: `For most of human history every stitch in every garment was made by hand. A skilled seamstress working steadily could manage perhaps thirty-five stitches a minute, and a single shirt, with its collar, cuffs and buttonholes, took her the better part of fourteen hours. Clothing was therefore expensive, wardrobes were small, and the making of clothes occupied an enormous and largely invisible workforce of women. The machine that ended this arrangement arrived late, and it arrived in pieces. No single inventor produced it, and almost every man who supplied one part of the solution was ignored, ruined or sued.

The first useful idea appeared in 1755, when Charles Weisenthal, a German working in London, patented a needle for mechanical sewing. His needle was sharpened at both ends with the eye in the middle, so that it could be pushed through the cloth and drawn out on the far side without ever being turned round. That trick lies inside every sewing machine built since. Weisenthal never built a machine to hold it. In 1790 an English cabinetmaker named Thomas Saint went considerably further and patented a complete design intended for leather and canvas: an awl punched a hole, a forked rod pushed the thread down through it, and a hook underneath caught the loop to form a chain stitch. Saint appears never to have made the machine, and his drawings lay unread in the patent office for eighty years.

The first workshop full of sewing machines belonged to a French tailor, Barthelemy Thimonnier, who patented a wooden chain-stitch machine in 1830 and was soon running eighty of them, producing uniforms for the French army. The tailors of Paris, convinced that the machines would take away their livelihoods, broke into the workshop in 1831 and destroyed every one of them. Thimonnier started again twice and died a pauper.

Meanwhile, in New York, a mechanic called Walter Hunt had solved the deeper problem. A chain stitch is made from a single thread and unravels the moment the end is pulled. Hunt's machine of about 1834 used two threads instead: an eye-pointed needle carried the upper thread through the cloth, where a shuttle slipped a second thread through the waiting loop, locking the two together. This lockstitch is still the stitch your clothes are sewn with today. Hunt, however, persuaded himself that his invention would throw poor seamstresses out of work, and never troubled to patent it, a scruple that cost his family a fortune.

The man who did patent the lockstitch was Elias Howe, in 1846. Howe's machine sewed two hundred and fifty stitches a minute, five times faster than the quickest hand sewer, and he set it against five seamstresses in public to prove the point. Selling it was another matter. One machine cost about as much as a labourer earned in a year, tailors distrusted it, and Howe ended up pawning his patent papers in London. He came home to find several American firms building machines that used his stitch.

Among them was Isaac Singer, a failed actor with a gift for machinery and a greater gift for publicity. Singer did not invent the sewing machine; he made it usable. Earlier machines sewed a short seam and then had to be stopped and reset. Singer's, patented in 1851, had a straight needle moving up and down, a presser foot that held the cloth firmly against the plate, and a foot treadle in place of a hand crank, so that both of the operator's hands stayed free to guide the fabric. It would sew a continuous seam starting anywhere on a piece of cloth, and it kept working.

Howe sued, and so did everybody else. By 1856 the young industry was so entangled in litigation that the leading manufacturers took an unprecedented step and pooled their patents. The Sewing Machine Combination, the first patent pool in American history, let any member build a complete machine in exchange for a fixed payment, and Howe drew a royalty on every machine sold in the United States until his patent expired. He died a wealthy man.

Singer's deepest innovation, though, was commercial rather than mechanical. A machine still cost more than most households could find at once, so his company allowed customers to pay by instalments, five dollars down and three dollars a month, an arrangement so successful that hire purchase spread from sewing machines to every other costly object in the home. Singer opened bright showrooms where women demonstrated the machines to other women, advertised on a scale nobody had attempted, and built a network of agents who could repair whatever they sold. By the 1870s the firm was making half a million machines a year and shipping them from Glasgow to Shanghai.

The consequences ran far beyond the workshop. Ready-made clothing, until then the poor relation of tailoring, became a great industry, the price of a shirt fell by roughly four fifths within a generation, and factories filled with rows of machinists working at speeds no hand could match. Whether this freed the women who had sewn by candlelight or merely moved them into worse conditions was argued then and is argued now. What is certain is that the finished machine belonged to nobody. It was assembled, across ninety years, out of a needle, a shuttle, a treadle and a lawsuit.`,
      questions: [
        { n: 1, type: "gap", prompt: "Thomas Saint's patented design was meant for sewing canvas and ______.", note: "ONE WORD ONLY", answer: "leather",
          explain: "Saint patented 'a complete design intended for leather and canvas'. The question reverses the order of the pair, so the missing material is leather.",
          evidence: "a complete design intended for leather and canvas" },
        { n: 2, type: "gap", prompt: "Thimonnier's workshop of eighty machines made ______ for soldiers.", note: "ONE WORD ONLY", answer: "uniforms",
          explain: "His eighty machines were 'producing uniforms for the French army'. The question paraphrases 'the French army' as 'soldiers', leaving the product itself as the answer.",
          evidence: "producing uniforms for the French army",
          vocab: ["the French army", "soldiers"] },
        { n: 3, type: "gap", prompt: "In Hunt's design a ______ passed a second thread through the loop made by the needle.", note: "ONE WORD ONLY", answer: "shuttle",
          explain: "In the lockstitch machine 'a shuttle slipped a second thread through the waiting loop'. The question turns 'slipped' into 'passed', keeping the noun intact.",
          evidence: "a shuttle slipped a second thread through the waiting loop",
          vocab: ["slipped", "passed"] },
        { n: 4, type: "gap", prompt: "Singer replaced the hand crank with a ______, which left the operator both hands for the cloth.", note: "ONE WORD ONLY", answer: "treadle",
          explain: "Singer's machine had 'a foot treadle in place of a hand crank', so that both hands stayed free to guide the fabric. 'In place of' matches 'replaced'.",
          evidence: "a foot treadle in place of a hand crank",
          vocab: ["in place of", "replaced"] },
        { n: 5, type: "gap", prompt: "The 1856 patent pool meant that Howe was paid a ______ for each machine sold in America.", note: "ONE WORD ONLY", answer: "royalty",
          explain: "After the pool was formed, Howe 'drew a royalty on every machine sold in the United States'. 'Every machine' becomes 'each machine' in the question.",
          evidence: "Howe drew a royalty on every machine sold in the United States",
          vocab: ["drew", "was paid"] },
        { n: 6, type: "gap", prompt: "Singer's company let buyers pay for a machine in ______ rather than all at once.", note: "ONE WORD ONLY", answer: "instalments",
          explain: "Because a machine cost more than a household could find at once, the company 'allowed customers to pay by instalments'. 'Customers' is paraphrased as 'buyers'.",
          evidence: "allowed customers to pay by instalments",
          vocab: ["customers", "buyers"] },
        { n: 7, type: "tfng", prompt: "Weisenthal produced a working machine that used his double-pointed needle.", answer: "FALSE",
          explain: "FALSE: the passage states flatly that 'Weisenthal never built a machine to hold it', which contradicts the claim that he produced a working machine.",
          evidence: "Weisenthal never built a machine to hold it" },
        { n: 8, type: "tfng", prompt: "Saint's design attracted no attention for a long period after it was patented.", answer: "TRUE",
          explain: "TRUE: his drawings 'lay unread in the patent office for eighty years' — eighty years of being unread is exactly 'no attention for a long period'.",
          evidence: "his drawings lay unread in the patent office for eighty years",
          vocab: ["lay unread", "attracted no attention"] },
        { n: 9, type: "tfng", prompt: "Thimonnier's machines were wrecked by workers who feared for their jobs.", answer: "TRUE",
          explain: "TRUE: the tailors of Paris were 'convinced that the machines would take away their livelihoods' and destroyed every one — fear for their jobs, and wrecking.",
          evidence: "convinced that the machines would take away their livelihoods",
          vocab: ["take away their livelihoods", "feared for their jobs"] },
        { n: 10, type: "tfng", prompt: "Hunt sold the rights to his lockstitch machine to another manufacturer.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: we are told only that he 'never troubled to patent it' because of his scruple. No sale of rights to anyone is mentioned anywhere in the passage.",
          evidence: "never troubled to patent it, a scruple that cost his family a fortune" },
        { n: 11, type: "tfng", prompt: "Howe found buyers for his machine easily once he had demonstrated its speed.", answer: "FALSE",
          explain: "FALSE: immediately after the demonstration the passage says 'Selling it was another matter' — the machine was too expensive and tailors distrusted it.",
          evidence: "Selling it was another matter" },
        { n: 12, type: "tfng", prompt: "Singer's machine could sew a long seam without having to be stopped.", answer: "TRUE",
          explain: "TRUE: earlier machines had to be stopped and reset after a short seam, whereas Singer's 'would sew a continuous seam starting anywhere on a piece of cloth'.",
          evidence: "It would sew a continuous seam starting anywhere on a piece of cloth",
          vocab: ["a continuous seam", "without having to be stopped"] },
        { n: 13, type: "tfng", prompt: "The idea of pooling the patents came originally from Howe.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the pool is described and Howe's royalty from it is stated, but the passage never says whose idea it was — do not infer authorship from who benefited.",
          evidence: "the leading manufacturers took an unprecedented step and pooled their patents" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The drinking fountain returns",
      passage: `A — A public drinking fountain is so ordinary that it is easy to forget how radical it once was. In the middle of the nineteenth century the water sold in the streets of London was frequently filthy, cholera was killing thousands, and the cheapest safe drink available to a working man was beer. In 1859 a group of reformers founded an association to build free public fountains, and the first of them, set into the railings of a churchyard on Holborn Hill, was used by seven thousand people a day. The campaign had two engines behind it: doctors who wanted clean water for the poor, and the temperance movement, which wanted to offer people something to drink instead of alcohol. Within twenty years it had built hundreds of fountains and cattle troughs, and the idea had spread from Dublin to Melbourne.

B — Then, gradually, the fountains went away. The first blow came from medicine: early in the twentieth century the shared metal cup chained beside the basin was identified as a route for infection, and city after city banned it. The bubbler, which threw up an arc of water so that no cup was needed, rescued the fountain for another fifty years, but two later changes finished it off. Bottled water, almost unknown in 1970, grew into one of the world's largest drinks businesses, and drinking from a public tap began to seem faintly shabby. Meanwhile the fountains aged, and in most cities they belonged to nobody in particular: parks budgets shrank every year, and a broken fountain was cheaper to take away than to mend. London lost more than half of its fountains in the second half of the century.

C — The revival, when it came, was driven by rubbish rather than thirst. Campaigns against single-use plastic made the refillable bottle first respectable and then fashionable, and cities that had spent decades removing taps began installing them again. The new machines look very little like their Victorian ancestors. A modern unit carries a tall nozzle set above the bowl so that a bottle can be filled without being tipped, a sensor that starts the flow without being touched, a small counter on the front displaying the number of bottles refilled since installation, and pipework buried below the frost line and drained automatically in winter. Many are mapped in a phone app that also reports a fault to the maintenance team the moment the flow drops.

D — The economics are what persuade finance committees, and the water engineer Ana Duarte has spent years assembling them. A public fountain, she points out, costs a few thousand pounds to install and a few hundred a year to service, while the water it delivers is almost free: mains water in most European cities costs a fraction of a penny a litre, against roughly a pound a litre for the bottled equivalent. Measured against the bottles it replaces, Duarte calculates, a well-used city-centre fountain repays its whole installation cost within about three years, and everything after that is a gain to the public purse. The figures collapse, she readily concedes, if the fountain is placed somewhere nobody walks.

E — The health case is broader than thirst. The public-health researcher Idris Coker studies what happens to cities in extreme heat, and his findings are blunt: during a heatwave the people who suffer first are those who cannot easily get out of the sun and cannot afford to buy a drink, among them outdoor workers, older people on foot and anyone sleeping rough. Free water in the street, he argues, is the cheapest heat protection a council can buy.

F — There are objections, and they are not foolish. The first is hygiene: after the pandemic many people were unwilling to put their mouth near a public spout, and some councils switched their fountains off rather than argue. Designers answer with touch-free sensors and bottle fillers, which remove the contact altogether, but the fear has proved stubborn. The historian Marta Kovacs finds all this thoroughly familiar. The objections raised today, she notes, are almost word for word the ones that closed the fountains a century ago, when the chained cup was banned, and then as now the answer that worked was not reassurance but redesign. A different criticism comes from the geographer Jonas Wexler, who mapped every working fountain in four cities and found them clustered in wealthy central districts and tourist parks, while the outer neighbourhoods with the least shade and the fewest shops had almost none — the places, he observes, where a free drink would matter most.

G — The schemes that survive, argues the planner Yasmin Haddad, are the ones that stop treating fountains as ornaments. In her model the water company, rather than the parks department, owns and services them, because a utility already has crews, meters and a legal duty to supply; every fountain is mapped, numbered and signed, so that a fault has an address and residents can report it. Where that has been done, she says, the failure rate falls sharply and the taps stay on. The Victorians understood something that was forgotten for fifty years: a city that gives water away in the street is making a statement about who the street belongs to.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "an explanation of why fountains vanished from the streets", answer: "B",
          explain: "Paragraph B is the account of the decline: the banned cup, the rise of bottled water, ageing equipment and shrinking repair budgets. That is the 'why' the question asks for.",
          evidence: "a broken fountain was cheaper to take away than to mend",
          vocab: ["went away", "vanished"] },
        { n: 15, type: "match", group: "info", prompt: "a description of the equipment built into a fountain today", answer: "C",
          explain: "Paragraph C lists what a modern unit carries: a tall nozzle, a sensor, a counter and frost-protected pipework. No other paragraph describes the hardware.",
          evidence: "a sensor that starts the flow without being touched",
          vocab: ["a modern unit", "a fountain today"] },
        { n: 16, type: "match", group: "info", prompt: "a calculation comparing the price of tap water and bottled water", answer: "D",
          explain: "Paragraph D gives Duarte's figures: a fraction of a penny a litre from the mains against roughly a pound a litre for the bottled equivalent — a direct price comparison.",
          evidence: "against roughly a pound a litre for the bottled equivalent",
          vocab: ["mains water", "tap water"] },
        { n: 17, type: "match", group: "info", prompt: "a reference to a campaign that promoted water as a substitute for alcohol", answer: "A",
          explain: "Paragraph A names the temperance movement, which wanted to offer people something to drink instead of alcohol — 'instead of' is the question's 'as a substitute for'.",
          evidence: "wanted to offer people something to drink instead of alcohol",
          vocab: ["instead of", "as a substitute for"] },
        { n: 18, type: "match", group: "info", prompt: "the observation that present-day complaints echo those of an earlier era", answer: "F",
          explain: "Paragraph F carries Kovacs's point that today's objections repeat almost word for word the ones that closed the fountains a century ago.",
          evidence: "are almost word for word the ones that closed the fountains a century ago",
          vocab: ["a century ago", "an earlier era"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — The modern fountain and the case for it",
            lines: [
              "Public taps came back not because people were thirstier but because campaigners objected to the waste of single-use {{19}}, which made carrying a refillable bottle fashionable again.",
              "The equipment has changed too. A tall nozzle fills a bottle without tipping it, a sensor starts the water without contact, and a {{20}} on the front of the machine shows how many bottles have been refilled so far. Underground, the pipes are laid deeper than the {{21}} and emptied automatically in winter.",
              "Supporters point to cost and to health: free water in the street is the cheapest protection a council can offer during a {{22}}, when those who cannot get out of the sun suffer first.",
            ],
          },
          answer: "plastic",
          explain: "The revival was 'driven by rubbish rather than thirst': campaigns against single-use plastic made refillable bottles fashionable. The summary keeps 'single-use' and asks for the material.",
          evidence: "Campaigns against single-use plastic",
          vocab: ["driven by rubbish", "objected to the waste"] },
        { n: 20, type: "gap", group: "sum2", answer: "counter",
          explain: "The modern unit has 'a small counter on the front displaying the number of bottles refilled'. The summary paraphrases 'displaying' as 'shows', keeping the noun 'counter'.",
          evidence: "a small counter on the front displaying the number of bottles refilled",
          vocab: ["displaying", "shows"] },
        { n: 21, type: "gap", group: "sum2", answer: "frost",
          explain: "The pipework is 'buried below the frost line and drained automatically in winter'. 'Laid deeper than the ______' needs the noun from 'below the frost line'.",
          evidence: "pipework buried below the frost line",
          vocab: ["buried below", "laid deeper than"] },
        { n: 22, type: "gap", group: "sum2", answer: "heatwave",
          explain: "Coker's point is that during a heatwave those who cannot leave the sun or buy a drink suffer first, so street water is the cheapest heat protection a council can buy.",
          evidence: "during a heatwave the people who suffer first",
          vocab: ["the cheapest heat protection", "the cheapest protection"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Ana Duarte",
            "Marta Kovacs",
            "Idris Coker",
            "Jonas Wexler",
            "Yasmin Haddad",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "A busy fountain earns back what it cost to build within a few years.", answer: "A",
          explain: "The engineer Duarte's calculation is that a well-used city-centre fountain repays its whole installation cost in about three years — 'repays' is the statement's 'earns back'.",
          evidence: "repays its whole installation cost within about three years",
          vocab: ["repays", "earns back"] },
        { n: 24, type: "match", group: "people", prompt: "Street water protects the people most exposed to high temperatures.", answer: "C",
          explain: "Coker, the public-health researcher, studies cities in extreme heat and calls free water in the street the cheapest heat protection a council can buy.",
          evidence: "is the cheapest heat protection a council can buy",
          vocab: ["extreme heat", "high temperatures"] },
        { n: 25, type: "match", group: "people", prompt: "The arguments used against fountains now were used against them before.", answer: "B",
          explain: "The historian Kovacs points out that today's objections repeat, almost word for word, those that closed the fountains a hundred years ago when the shared cup was banned.",
          evidence: "The objections raised today, she notes",
          vocab: ["raised today", "used against fountains now"] },
        { n: 26, type: "match", group: "people", prompt: "Fountains are concentrated in the districts that need them least.", answer: "D",
          explain: "The geographer Wexler mapped four cities and found fountains clustered in wealthy central districts, while poorer outer areas — where a free drink would matter most — had almost none.",
          evidence: "found them clustered in wealthy central districts and tourist parks",
          vocab: ["clustered", "concentrated"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "Sure, and wrong",
      passage: `Ask a hundred people how long the River Nile is, and most will hesitate. Ask them instead for a range, a lowest and a highest figure chosen so that they are ninety per cent certain the true length lies between the two, and something odd happens. The task has just been made easy: anyone can guarantee a hit by answering "between one kilometre and a million". Yet when psychologists run this exercise across dozens of questions, the true value falls outside people's ninety-per-cent ranges roughly forty per cent of the time. The distance between ninety and sixty is the plainest available measurement of a habit that shapes hiring, lending, medicine, engineering and war. We are, as a species, considerably surer of ourselves than the evidence permits.

The word overconfidence, however, covers three separate things, which researchers now keep apart. Overestimation is believing you scored better on a test than you actually did. Overplacement is believing you are better than other people, the effect that has most drivers rating themselves above average. Overprecision is the ninety-per-cent problem: believing your estimate is more exact than it is. The three are only loosely related, and someone may show one of them strongly and another hardly at all. The engineer who is genuinely modest about her standing among her colleagues will still hand you a completion date with a confidence no schedule has ever deserved. Of the three, overprecision is the hardest to shift and does the most damage, because it removes the margin that would otherwise have absorbed the surprise.

Nor is the bias uniform. When questions are easy, people are typically underconfident, getting more of them right than they claim they will; when questions are hard, or the event in question is rare, confidence runs far ahead of accuracy. This hard-easy effect means that the popular summary, that people are overconfident, is too crude to be useful. What the evidence actually shows is that confidence responds only weakly to difficulty. It sits in a comfortable middle range while accuracy swings wildly, so the two come apart at both ends of the scale.

There are, however, groups whose confidence tracks their accuracy almost perfectly. Professional weather forecasters are the classic case: when they say there is a seventy per cent chance of rain, it rains on about seventy per cent of those days. What such people have in common is not modesty or intelligence but a particular kind of working life. Their predictions are explicit and numerical, the outcome arrives within hours, it is unambiguous, and it is recorded. Compare a doctor who orders a test and learns the diagnosis months later, if at all, or a manager whose forecasts of next year's demand are never written down and never scored. Calibration, on this evidence, is not a virtue of character but a product of the environment. It grows where feedback is fast, frequent and honest, and it withers everywhere else.

Why, then, does overconfidence survive, when it costs us so obviously? Partly because it pays. In laboratory studies of small groups, members who speak with great certainty are judged more competent by the others and gain influence over the decision, even when their answers turn out to be no better than anyone else's; the hedged, careful contributor is heard as weak. The same market operates outside the laboratory: a client told that the work will take somewhere between six and eleven months takes his business to the firm that says eight. Confidence is rewarded by listeners immediately, while accuracy is rewarded, if it ever is, much later and by nobody in particular.

Something can be done about all this, though less than the self-help shelf implies. The most reliable single technique is disarmingly simple: before committing to an estimate, write down the reasons your judgement might be wrong. That instruction, known as considering the opposite, reliably widens people's ranges and improves their calibration, because the reasons were available all along and were never sought. The second technique is scorekeeping. Keeping a dated written record of your own predictions, each with a probability attached, supplies the feedback that ordinary life withholds and stops the memory quietly rewriting what you thought last year. Large forecasting tournaments, in which volunteers predicted world events over several years, found that a few hours of training in these habits — break the question up, start from the base rate, give a number, update in small steps — produced measurably more accurate forecasters, some of whom beat professionals with access to secret material.

Two cautions survive all of this. Knowing about a bias does not dissolve it: people who can define overprecision in a seminar still produce ranges that are far too narrow an hour afterwards, which is why the interventions that work are procedures, not insights. And confidence is not simply a fault to be removed. Nobody starts a company, or a rescue, on a balanced view of the odds, and the stubbornness that carries difficult work through its middle years is not built on accurate self-assessment. The goal is not humility, which is only confidence pointed downwards, but calibration: saying you are sure when you are sure, saying you are not when you are not, and being able to tell the two apart. That is a skill, and like other skills it is learned by keeping score.`,
      questions: [
        { n: 27, type: "mcq", prompt: "The writer uses the ninety-per-cent range task in the first paragraph to show that", options: ["A people know less about geography than they realise", "B stated certainty runs well ahead of what accuracy would justify", "C most people are unwilling to give numerical answers", "D ranges are a poor way of measuring what someone knows"], answer: "B",
          explain: "The task is deliberately easy to pass, yet the truth escapes the ranges about forty per cent of the time — certainty far exceeding accuracy. The Nile is only the example, so A misreads it.",
          evidence: "the true value falls outside people's ninety-per-cent ranges roughly forty per cent of the time",
          vocab: ["surer of ourselves than the evidence permits", "certainty runs well ahead of accuracy"] },
        { n: 28, type: "mcq", prompt: "What does the writer say about the three types of overconfidence?", options: ["A They are normally found together in the same individual", "B They are all measured with the ninety-per-cent range task", "C They have each become more common in recent decades", "D Showing one of them tells you little about the others"], answer: "D",
          explain: "The three are 'only loosely related', and the modest engineer still gives an overprecise deadline — so one tells you little about the others. Option A states the opposite; B echoes the paragraph's wording.",
          evidence: "The three are only loosely related",
          vocab: ["only loosely related", "tells you little about the others"] },
        { n: 29, type: "mcq", prompt: "According to the writer, weather forecasters are well calibrated because", options: ["A the results of their predictions are known quickly and beyond argument", "B they are trained in statistics more thoroughly than other professionals", "C they work in teams whose members correct one another", "D they are penalised whenever a forecast turns out to be wrong"], answer: "A",
          explain: "Their predictions are numerical, the outcome arrives within hours, it is unambiguous and it is recorded. Training, teams and penalties are never mentioned — they belong to no sentence in the passage.",
          evidence: "the outcome arrives within hours, it is unambiguous, and it is recorded",
          vocab: ["unambiguous", "beyond argument"] },
        { n: 30, type: "mcq", prompt: "The writer suggests that overconfidence persists mainly because", options: ["A people who doubt themselves achieve less in life", "B the bias is impossible to notice in oneself", "C listeners treat certainty as evidence of ability", "D accurate forecasts are rarely remembered by anyone"], answer: "C",
          explain: "In group studies the certain speaker is 'judged more competent' and gains influence regardless of accuracy — listeners read certainty as ability. D echoes the television line but is not the writer's main reason.",
          evidence: "members who speak with great certainty are judged more competent by the others",
          vocab: ["judged more competent", "evidence of ability"] },
        { n: 31, type: "ynng", prompt: "Confidence brings no benefit at all to the person who has it.", answer: "NO",
          explain: "NO: the writer explicitly says confidence 'is not simply a fault to be removed', since no one starts a company or a rescue on a balanced view of the odds.",
          evidence: "confidence is not simply a fault to be removed",
          vocab: ["not simply a fault", "brings no benefit"] },
        { n: 32, type: "ynng", prompt: "Listing the reasons a judgement might be wrong makes people less certain of their estimates.", answer: "YES",
          explain: "YES: considering the opposite 'reliably widens people's ranges and improves their calibration' — a wider range is precisely a less certain estimate.",
          evidence: "reliably widens people's ranges and improves their calibration",
          vocab: ["widens people's ranges", "less certain"] },
        { n: 33, type: "ynng", prompt: "A short period of training can make people better forecasters.", answer: "YES",
          explain: "YES: the tournaments found that a few hours of training in these habits 'produced measurably more accurate forecasters' — a few hours is a short period.",
          evidence: "produced measurably more accurate forecasters",
          vocab: ["a few hours of training", "a short period of training"] },
        { n: 34, type: "ynng", prompt: "Overconfidence is stronger in younger people than in older people.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage compares the three types of overconfidence and different working environments, but never compares age groups. Nothing here supports or denies the claim.",
          evidence: "someone may show one of them strongly and another hardly at all" },
        { n: 35, type: "ynng", prompt: "Learning about the bias is by itself enough to correct it.", answer: "NO",
          explain: "NO: 'Knowing about a bias does not dissolve it' — seminar-trained people still give ranges that are far too narrow, which is why procedures beat insights.",
          evidence: "Knowing about a bias does not dissolve it",
          vocab: ["does not dissolve it", "not enough to correct it"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "gained influence even when they were no more accurate than anyone else.",
            "reveals that confidence and accuracy are not connected in a simple way.",
            "shows that most people prefer not to give numbers at all.",
            "is in a poor position to improve his or her judgement.",
            "typically produces intervals that are much too narrow.",
            "proves that experience has no effect on the quality of a forecast.",
            "supplies the feedback that everyday life withholds.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Asking people for a range they are ninety per cent sure of", answer: "E",
          explain: "The truth escapes those ranges about forty per cent of the time, which means the ranges people offer are much too narrow — ending E. C contradicts the passage.",
          evidence: "the true value falls outside people's ninety-per-cent ranges",
          vocab: ["falls outside", "too narrow"] },
        { n: 37, type: "match", group: "ends", prompt: "The hard-easy effect", answer: "B",
          explain: "The effect shows that confidence 'responds only weakly to difficulty' while accuracy swings wildly — the two are not connected in a simple way, ending B.",
          evidence: "confidence responds only weakly to difficulty",
          vocab: ["responds only weakly", "not connected in a simple way"] },
        { n: 38, type: "match", group: "ends", prompt: "A doctor who seldom finds out what became of a patient", answer: "D",
          explain: "Such a doctor is the counter-example to the forecaster: calibration grows where feedback is fast and honest and 'withers everywhere else', so his judgement cannot improve — ending D.",
          evidence: "a doctor who orders a test and learns the diagnosis months later, if at all",
          vocab: ["learns the diagnosis months later", "seldom finds out"] },
        { n: 39, type: "match", group: "ends", prompt: "In laboratory studies of small groups, the members who spoke with great certainty", answer: "A",
          explain: "They 'gain influence over the decision, even when their answers turn out to be no better than anyone else's' — ending A restates this in the past tense.",
          evidence: "gain influence over the decision, even when their answers turn out to be no better",
          vocab: ["no better than anyone else's", "no more accurate"] },
        { n: 40, type: "match", group: "ends", prompt: "Writing down each of your predictions with a date and a probability", answer: "G",
          explain: "Scorekeeping 'supplies the feedback that ordinary life withholds' and stops memory rewriting the past — ending G, with 'ordinary' paraphrased as 'everyday'.",
          evidence: "supplies the feedback that ordinary life withholds",
          vocab: ["ordinary life", "everyday life"] },
      ],
    },
  ],
};
