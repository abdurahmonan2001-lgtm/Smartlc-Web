// Smart LC Practice Set 9 — Academic Reading (40 questions, 3 passages).
// Original material authored for Smart LC to the blueprint: P1 factual
// history (completion + TFNG), P2 discursive with lettered paragraphs
// (matching information + summary + people matching), P3 argumentative
// psychology (MCQ-4 + YNNG + sentence endings). Key quotas: TFNG/YNNG
// balanced with no runs of three, flat letters, unique concrete-noun
// answers, correct MCQ options paraphrase the text.
export const PSET9_READING = {
  id: "pset9-reading",
  bookId: "pset9",
  title: "Practice Set 9 — Reading",
  module: "reading",
  durationMin: 60,
  sections: [
    {
      title: "Passage 1",
      instructions: "You should spend about 20 minutes on Questions 1–13, which are based on Reading Passage 1 below.",
      passageTitle: "The pencil",
      passage: `Few manufactured objects are as easy to overlook as the pencil. It costs almost nothing, it works upside down and in freezing weather, it never leaks, and when it fails it fails politely, growing shorter until one day it is gone. Yet the wooden pencil is a piece of real ingenuity, and its history begins not in a factory but with a storm.

Some time in the middle of the sixteenth century, a great tree was blown down in Borrowdale, a valley in the north of England, and beneath its roots the local people found a strange black material. It was soft, greasy to the touch and left a dark line on anything it was rubbed against. Farmers cut it into lumps and used it to mark their sheep, which is the first recorded use of what we now call graphite. Nobody at the time knew what the substance was. Because it wrote in much the same way as the lead styluses of the Romans, it was assumed to be a form of lead, and the mistake has never been undone: we still speak of the lead in a pencil, although no pencil has ever contained any.

The Borrowdale deposit was extraordinary in one respect. Graphite occurs in many places, but almost everywhere it is mixed with clay and grit, whereas the Cumbrian graphite was pure enough to be sawn into narrow sticks and used exactly as it came out of the ground. Nowhere else in the world produced anything comparable for two hundred years. The sticks were wrapped in string, which the writer unwound as the point wore down, or pushed into a holder of wood or metal to keep the fingers clean. The material rapidly became valuable for a reason that had nothing to do with writing: graphite was used to line the moulds in which cannon balls were cast, so a state that controlled a supply of it held an advantage in war. The mine was deliberately flooded when it was not being worked, guards were posted at its mouth, and an Act of Parliament of 1752 made stealing from it a serious crime.

The wooden casing appeared in Italy. A couple named Bernacotti, working in the 1560s, hollowed out a stick of juniper and slid a thin rod of graphite inside it. Hollowing was slow and wasteful, and within a generation the method that survives to this day had been worked out: two flat pieces of wood, each with a groove cut along it, glued around the graphite so that the finished pencil is in effect a sandwich. Cheap, strong and easy to sharpen, the new casing turned the pencil into an object of trade rather than a curiosity.

Everything still depended on a supply of pure graphite, and in the 1790s war cut that supply off. France, at war with Britain, could obtain no Cumbrian graphite at all, and Nicolas-Jacques Conte, an officer and inventor, was asked to find a way round the shortage. His answer, patented in 1795, is the basis of every pencil made since. Conte ground inferior graphite to a powder, mixed it with clay and water, pressed the paste into thin rods and baked them in a kiln. The fired rods were hard, smooth and, decisively, adjustable: more clay in the mixture gave a harder, paler line, more graphite a softer, blacker one. For the first time a manufacturer could produce a graded range of pencils to order, and the letters still stamped on them, H for hard and B for black, describe exactly the proportion that Conte learned how to control.

The rest of the story is largely about timber, machinery and marketing. The casing that split most cleanly under a knife was cut from the red cedar of the southern United States, and later from a cedar grown in California, and pencil manufacture followed the wood across the continent. In 1858 an American, Hymen Lipman, patented a pencil with a rubber fixed into a recess at one end. The courts eventually struck his patent down on the grounds that he had merely put two familiar things side by side, but the design itself proved unstoppable, and the small metal band that grips the rubber, the ferrule, is now the only part of a pencil that most users cannot name. Colour turned out to matter too. At a Paris exhibition late in the nineteenth century an Austrian firm displayed a pencil painted bright yellow, a colour then associated with the finest Chinese graphite, and the association proved so powerful that yellow remains the standard livery of the ordinary pencil across much of the world.

Predictions of the pencil's disappearance have been made in every generation since the invention of the fountain pen, and every one of them has been wrong. Global production still runs into billions of pencils a year. Architects and engineers value a line that can be removed without trace; artists value the range of tone that a box of graded leads provides; and anyone who has watched a ballpoint die in a cold field understands the appeal of a tool with no moving parts and nothing to go wrong. The pencil survives because the problem it solved, how to make a mark permanent enough to read and temporary enough to erase, has never gone away.`,
      questions: [
        { n: 1, type: "gap", prompt: "The people of Borrowdale first used the black material to mark their ______.", note: "ONE WORD ONLY", answer: "sheep",
          explain: "The passage says farmers cut the material into lumps and used it to mark their sheep. 'Farmers' in the text becomes 'the people of Borrowdale' in the question, but the noun in the gap is unchanged.",
          evidence: "used it to mark their sheep",
          vocab: ["Farmers", "the people of Borrowdale"] },
        { n: 2, type: "gap", prompt: "Sticks of graphite were often wrapped in ______, which was unwound as the point wore away.", note: "ONE WORD ONLY", answer: "string",
          explain: "The sticks 'were wrapped in string, which the writer unwound as the point wore down'. The question paraphrases 'wore down' as 'wore away', so the missing noun is 'string'.",
          evidence: "The sticks were wrapped in string",
          vocab: ["wore down", "wore away"] },
        { n: 3, type: "gap", prompt: "The first wooden pencils were made by hollowing out a piece of ______.", note: "ONE WORD ONLY", answer: "juniper",
          explain: "The Bernacottis 'hollowed out a stick of juniper' and slid a rod of graphite inside. 'Stick' in the passage becomes 'piece' in the question; the wood itself is the answer.",
          evidence: "hollowed out a stick of juniper",
          vocab: ["a stick", "a piece"] },
        { n: 4, type: "gap", prompt: "To make his rods, Conte combined powdered graphite with water and ______.", note: "ONE WORD ONLY", answer: "clay",
          explain: "Conte 'mixed it with clay and water' before pressing and firing the paste. The question keeps 'water' and asks for the other ingredient, and 'combined' paraphrases 'mixed'.",
          evidence: "mixed it with clay and water",
          vocab: ["mixed", "combined"] },
        { n: 5, type: "gap", prompt: "Pencil casings were traditionally cut from ______ grown in the United States.", note: "ONE WORD ONLY", answer: "cedar",
          explain: "The casing 'was cut from the red cedar of the southern United States, and later from a cedar grown in California'. The single word the gap needs is the name of the timber.",
          evidence: "cut from the red cedar of the southern United States" },
        { n: 6, type: "gap", prompt: "A metal ______ is the part that holds the rubber onto the end of a pencil.", note: "ONE WORD ONLY", answer: "ferrule",
          explain: "The passage names 'the small metal band that grips the rubber, the ferrule'. 'Grips' is paraphrased as 'holds', and the technical name is the answer.",
          evidence: "the small metal band that grips the rubber, the ferrule",
          vocab: ["grips", "holds"] },
        { n: 7, type: "tfng", prompt: "The material found at Borrowdale was quickly recognised as something quite different from lead.", answer: "FALSE",
          explain: "FALSE: nobody knew what the substance was, and because it wrote like a Roman lead stylus it was assumed to BE a form of lead. That is the opposite of being recognised as different from lead.",
          evidence: "it was assumed to be a form of lead",
          vocab: ["assumed to be a form of lead", "recognised as something quite different"] },
        { n: 8, type: "tfng", prompt: "Graphite had a military value because of its role in the manufacture of weapons.", answer: "TRUE",
          explain: "TRUE: graphite lined the moulds in which cannon balls were cast, so controlling it gave a state an advantage in war. 'Cannon balls' are the weapons the statement refers to.",
          evidence: "graphite was used to line the moulds in which cannon balls were cast",
          vocab: ["an advantage in war", "military value"] },
        { n: 9, type: "tfng", prompt: "The Borrowdale mine was more heavily guarded than any other mine in Britain.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: we are told the mine was flooded when idle and that guards stood at its mouth, but no other mine is mentioned, so the comparison cannot be checked. Comparisons are a classic NOT GIVEN trap.",
          evidence: "guards were posted at its mouth" },
        { n: 10, type: "tfng", prompt: "The technique of gluing two grooved pieces of wood together replaced hollowing after only a few decades.", answer: "TRUE",
          explain: "TRUE: hollowing was slow and wasteful, and 'within a generation' the two-grooved-halves method had been worked out. A generation matches 'only a few decades'.",
          evidence: "within a generation the method that survives to this day had been worked out",
          vocab: ["within a generation", "after only a few decades"] },
        { n: 11, type: "tfng", prompt: "Conte's pencils were made from graphite of the same high quality as the British material.", answer: "FALSE",
          explain: "FALSE: France could obtain no Cumbrian graphite at all, so Conte ground INFERIOR graphite to a powder. The whole point of his process was to make poor graphite usable.",
          evidence: "Conte ground inferior graphite to a powder",
          vocab: ["inferior graphite", "the same high quality"] },
        { n: 12, type: "tfng", prompt: "Lipman's patent for a pencil with a rubber attached was later cancelled.", answer: "TRUE",
          explain: "TRUE: the courts 'struck his patent down' because he had merely placed two familiar things side by side. 'Struck down' is the passage's way of saying 'cancelled'.",
          evidence: "The courts eventually struck his patent down",
          vocab: ["struck his patent down", "was later cancelled"] },
        { n: 13, type: "tfng", prompt: "Yellow pencils were sold at a higher price than pencils of other colours.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: yellow signalled the finest Chinese graphite and became the standard colour, but the passage never mentions what yellow pencils cost compared with any other kind.",
          evidence: "a colour then associated with the finest Chinese graphite" },
      ],
    },
    {
      title: "Passage 2",
      instructions: "You should spend about 20 minutes on Questions 14–26, which are based on Reading Passage 2 below.",
      passageTitle: "The repair cafe",
      passage: `A — On one Saturday morning a month, a library hall in an ordinary town fills up with broken things. People arrive carrying toasters, table lamps, bicycles with slipping gears and laptops that will no longer charge. Along one wall sit volunteers with soldering irons, sewing machines and boxes of odd screws; along the other, tea. This is a repair cafe, an idea that began in Amsterdam in 2009 and has since spread to more than two thousand groups in dozens of countries. Two rules are almost universal. Nothing is charged for, and nothing is dropped off: the owner must stay and, wherever possible, hold the screwdriver while the repair is made.

B — The movement exists because of an arithmetic that has quietly turned upside down. For most of industrial history a manufactured object was expensive and an hour of labour was cheap, so mending was the obvious course. Today the ratio is reversed. A new kettle costs less than forty minutes of a technician's time, the shop that once employed that technician has closed, and the customer is told, correctly, that repair would cost more than replacement. The results are visible in the waste figures: the world now discards well over fifty million tonnes of electrical and electronic goods each year, and the average working life of a domestic appliance has fallen by several years within a single generation. Very little of what is thrown away is broken beyond hope. Most of it is simply not worth a professional's afternoon.

C — What is actually wrong with these objects is the movement's most quoted statistic. Marek Dolan, an electrical engineer who has volunteered at repair sessions for eleven years, keeps a record of every item that crosses his table. The great majority of failures, he reports, come down to one cheap component: a frayed cable where it enters the casing, a worn switch, a capacitor worth a few pence. Across the sessions he has logged, roughly two thirds of the items brought in leave the hall working again, and a further tenth are diagnosed well enough for the owner to order the necessary part.

D — If the fault is usually trivial, the obstacle usually is not. Aisha Nkemdirim, a design researcher who catalogues the ways in which products resist opening, describes a steady hardening of the shell around consumer goods. Cases that were once held together by four visible fasteners are now sealed with glue, so that opening them at all means damaging them. Where fasteners survive, they are often screws with heads of unusual shapes for which no ordinary tool exists. Spare parts may be sold only to approved workshops, or offered as an assembly costing nearly as much as a new machine. And a growing number of appliances are governed by software that recognises components by serial number and refuses to accept a replacement the manufacturer has not authorised. None of these choices, Nkemdirim notes, was made in order to prevent repair. Each was made for a defensible reason of cost, appearance or safety. The effect is the same.

E — Governments have begun to respond, under the banner of a right to repair. European rules now oblige makers of certain appliances to supply spare parts for up to ten years and to design machines that a technician can take apart with everyday tools. France requires several categories of product to display a repairability score on the shelf edge, alongside the price. Elena Vasquez, who analyses the effect of such measures, has tracked what happens after the labels appear: buyers move measurably towards the better-scoring models, and manufacturers respond by redesigning the products that score badly, which she regards as the more important of the two effects. Rules of this kind, she argues, work less by informing shoppers than by embarrassing designers.

F — Not everyone is convinced. Insurers point out that a volunteer who rewires a customer's heater carries no professional liability, and most groups now refuse to touch anything connected to the mains. The sharper objection comes from Joseph Adeyemi, a campaigner who has spent years pressing for stricter product standards. Repair cafes, he accepts, do good in the room they are held in; his fear is what they do outside it. A monthly session staffed by unpaid enthusiasts allows a manufacturer to point to a thriving repair culture while changing nothing about the way its goods are built, and it converts a failure of regulation into a hobby. The volunteers, he says, are cleaning up after an industry that should not be allowed to make the mess.

G — Whether that is fair may depend on what the sessions are really for. Ingrid Halvorsen, a sociologist who has observed repair groups in four cities, argues that the mended objects are almost a by-product. The people who come, she found, stay far longer than the repair requires; the retired engineer who has not been asked a technical question in a decade is asked twenty in an afternoon, and the student who arrives with a broken lamp leaves able to mend the next one. The volunteers are trained never to take the job out of the owner's hands, but to talk them through it, which is slower and produces fewer repairs per session. It also produces the thing the movement is best at: a room in which competence is handed round rather than bought.`,
      questions: [
        { n: 14, type: "match", group: "info",
          rubric: "Reading Passage 2 has seven paragraphs, A–G. Which paragraph contains the following information? Write the correct letter, A–G. NB You may use any letter more than once.",
          boxTitle: "Paragraphs",
          box: ["Paragraph A", "Paragraph B", "Paragraph C", "Paragraph D", "Paragraph E", "Paragraph F", "Paragraph G"],
          prompt: "a comparison between the cost of mending an item and the cost of buying a new one", answer: "B",
          explain: "Paragraph B sets the price of a new kettle against a technician's time and concludes that repair would cost more than replacement. That is exactly the comparison the question describes.",
          evidence: "repair would cost more than replacement",
          vocab: ["replacement", "buying a new one"] },
        { n: 15, type: "match", group: "info", prompt: "figures for the proportion of items successfully mended during a session", answer: "C",
          explain: "Paragraph C gives Dolan's own record: about two thirds of items leave working and a further tenth are diagnosed. Those fractions are the 'figures for the proportion' asked about.",
          evidence: "roughly two thirds of the items brought in leave the hall working again",
          vocab: ["leave the hall working again", "successfully mended"] },
        { n: 16, type: "match", group: "info", prompt: "an account of how new laws have changed what manufacturers are obliged to provide", answer: "E",
          explain: "Paragraph E describes European rules forcing makers to supply spare parts for up to ten years and French labelling requirements. 'Oblige' in the text is the question's 'are obliged to provide'.",
          evidence: "oblige makers of certain appliances to supply spare parts for up to ten years",
          vocab: ["oblige makers", "manufacturers are obliged"] },
        { n: 17, type: "match", group: "info", prompt: "a warning that voluntary work may reduce the pressure on industry to change", answer: "F",
          explain: "Paragraph F carries Adeyemi's fear: unpaid enthusiasts let a manufacturer point to a repair culture while changing nothing about how its goods are built.",
          evidence: "while changing nothing about the way its goods are built",
          vocab: ["unpaid enthusiasts", "voluntary work"] },
        { n: 18, type: "match", group: "info", prompt: "examples of design features that prevent an owner from opening a device", answer: "D",
          explain: "Paragraph D lists them: cases sealed with glue, screws with unusual heads, restricted spare parts and software checks. These are the design features the question means.",
          evidence: "Cases that were once held together by four visible fasteners are now sealed with glue",
          vocab: ["resist opening", "prevent an owner from opening"] },
        { n: 19, type: "gap", group: "sum2", note: "ONE WORD ONLY",
          notes: {
            title: "Summary — Why modern products resist repair",
            lines: [
              "Many devices can no longer be opened without harm, because their cases are sealed with {{19}} instead of being fastened, and where fastenings do remain the manufacturer often uses {{20}} of unusual shapes that no ordinary tool will turn.",
              "Anyone who does get inside may then find that the replacement {{21}} needed are sold only to approved workshops, or are supplied as a whole assembly at nearly the price of a new machine.",
              "A further obstacle is the {{22}} built into many appliances, which checks serial numbers and rejects any component the maker has not authorised.",
            ],
          },
          answer: "glue",
          explain: "Paragraph D says cases once held by visible fasteners 'are now sealed with glue', so opening them means damaging them. The summary's 'without harm' paraphrases that damage.",
          evidence: "are now sealed with glue",
          vocab: ["damaging them", "without harm"] },
        { n: 20, type: "gap", group: "sum2", answer: "screws",
          explain: "Where fasteners survive, 'they are often screws with heads of unusual shapes for which no ordinary tool exists'. The summary keeps 'unusual shapes' and asks for the fastening itself.",
          evidence: "they are often screws with heads of unusual shapes" },
        { n: 21, type: "gap", group: "sum2", answer: "parts",
          explain: "The passage says spare parts 'may be sold only to approved workshops, or offered as an assembly costing nearly as much as a new machine' — both halves of the summary sentence.",
          evidence: "Spare parts may be sold only to approved workshops",
          vocab: ["offered as an assembly", "supplied as a whole assembly"] },
        { n: 22, type: "gap", group: "sum2", answer: "software",
          explain: "Appliances are 'governed by software that recognises components by serial number and refuses to accept a replacement the manufacturer has not authorised' — the summary's 'checks serial numbers and rejects'.",
          evidence: "governed by software that recognises components by serial number",
          vocab: ["refuses to accept", "rejects"] },
        { n: 23, type: "match", group: "people", boxTitle: "List of People",
          box: [
            "Marek Dolan",
            "Elena Vasquez",
            "Aisha Nkemdirim",
            "Joseph Adeyemi",
            "Ingrid Halvorsen",
          ],
          rubric: "Look at the following statements (Questions 23–26) and the list of people below. Match each statement with the correct person, A–E. NB There is one person you will not need.",
          prompt: "Most breakdowns are caused by the failure of a single inexpensive component.", answer: "A",
          explain: "Dolan, the engineer who logs every item, reports that the great majority of failures come down to one cheap component — a frayed cable, a worn switch, a capacitor worth pence.",
          evidence: "come down to one cheap component",
          vocab: ["one cheap component", "a single inexpensive component"] },
        { n: 24, type: "match", group: "people", prompt: "Repair events may allow industry to avoid making changes.", answer: "D",
          explain: "Adeyemi, the campaigner, warns that a monthly volunteer session lets a manufacturer advertise a repair culture while altering nothing in its designs, turning a regulatory failure into a hobby.",
          evidence: "it converts a failure of regulation into a hobby",
          vocab: ["changing nothing", "avoid making changes"] },
        { n: 25, type: "match", group: "people", prompt: "Displaying repair information on products changes the behaviour of both buyers and designers.", answer: "B",
          explain: "Vasquez tracks what happens after repairability labels appear: shoppers shift to better-scoring models and makers redesign the worst ones, which she considers the more significant result.",
          evidence: "buyers move measurably towards the better-scoring models",
          vocab: ["redesigning the products that score badly", "changes the behaviour of designers"] },
        { n: 26, type: "match", group: "people", prompt: "The most valuable outcome of these sessions is not the repairs themselves.", answer: "E",
          explain: "Halvorsen, the sociologist, argues the mended objects are 'almost a by-product'; what the sessions really produce is confidence and skill passed between people.",
          evidence: "the mended objects are almost a by-product",
          vocab: ["almost a by-product", "not the repairs themselves"] },
      ],
    },
    {
      title: "Passage 3",
      instructions: "You should spend about 20 minutes on Questions 27–40, which are based on Reading Passage 3 below.",
      passageTitle: "The cost of an interruption",
      passage: `An interruption feels like a small thing. A colleague leans over the desk with a question; a message arrives and is answered; a phone lights up and is turned face down. Each of these events costs seconds, and seconds are cheap. That arithmetic is what makes the modern office look affordable to the people who design it, and it is almost entirely wrong. The seconds spent on the interruption are trivial; the expensive part is what happens afterwards, inside the head of the person who was interrupted. In careful observational studies, researchers sat beside office workers with stopwatches and recorded every switch of activity. They found that after being pulled away from a task, people took on average around twenty-three minutes to return to it, and that the return was rarely direct: most passed through two other pieces of work before coming back to the one they had abandoned.

The obvious explanation, that we simply forget where we were, is only a small part of the story. The deeper mechanism has been given a name: attention residue. When we move from one task to another, a portion of our attention stays behind, still processing the unfinished business of the first task. The residue is heaviest when the abandoned job was left in an ambiguous state, with no clear plan for finishing it, which is precisely the state that most interruptions create. The person who turns back to a report after a five-minute conversation is therefore not quite the worker who left it; for some minutes they are running on reduced capacity, and they are generally unaware of the fact. Self-assessment in this area is poor. Asked afterwards, interrupted workers tend to report that they lost a moment or two.

There is a second finding, more surprising and regularly misread. When researchers compared interrupted work with uninterrupted work, they found that the interrupted tasks were often completed faster. This looks like a defence of interruption, and it is sometimes quoted as one. But the same studies recorded what the speed cost. People who had been interrupted worked at a higher tempo and reported significantly more stress, frustration and time pressure, along with a greater sense of effort. They kept the deadline by spending themselves, which is a strategy that works for an afternoon and fails over a career. Accuracy tells a similar story: in laboratory tasks that require holding a sequence in mind, interruptions of less than three seconds have been shown to double the rate of mistakes at the point where work resumes.

If interruption were purely something done to us, the remedy would be simple. It is not. When the same observers counted the sources of the switches, roughly half turned out to be self-generated: nobody spoke, no message arrived, and the worker left the task anyway. This is the part of the picture that resists moralising. A mind trained over thousands of repetitions to expect a small reward whenever it looks away will begin to look away on its own, particularly when the work in front of it becomes difficult or dull. Self-interruption is not a defect of character; it is the predictable behaviour of a system that has learned where the easy rewards lie.

Given all this, the standard advice, which is to concentrate harder and show more discipline, is oddly placed. Discipline is being asked to fight an environment that has been engineered, quite deliberately, to defeat it. Consider the ordinary furniture of professional life: the open-plan floor, adopted to encourage the spontaneous exchanges that are, by definition, interruptions; the messaging platform whose culture treats a reply within minutes as the mark of a reliable colleague; the notification, designed by companies whose income depends on capturing attention. None of this is accidental, and none of it is any individual's doing, yet the individual is who gets blamed.

The useful responses are structural. The first changes what an interruption costs rather than how many arrive: before turning away, spend twenty seconds writing down where you had got to and what comes next. Experiments on this ready-to-resume habit show that it substantially reduces the residue, because the abandoned task is no longer ambiguous; the plan for finishing it is on paper instead of in the mind. The second gathers interruptions instead of scattering them. Answering messages in three fixed periods rather than continuously does not reduce the number of messages, but it collapses the number of occasions on which concentration must be built again from nothing, and rebuilding is where the cost lies. The third is agreement rather than effort: teams that establish shared quiet hours consistently do better than teams whose members each try, privately, to be more disciplined.

Two cautions are worth keeping in view. Interruption is not simply a harm to be minimised. The question from the next desk often prevents a week of work in the wrong direction, and organisations that make themselves uninterruptible tend to find that nobody is checking anybody. What is wrong is not that interruption exists but that its price and its distribution are currently set by accident. Nor will any single fix do the job: switching off notifications while the surrounding culture still expects instant answers merely moves the pressure somewhere else. The cost of an interruption is real, measurable and largely invisible, and it is paid, in the end, by whoever is least able to defend their attention.`,
      questions: [
        { n: 27, type: "mcq", prompt: "In the first paragraph, the writer argues that the real cost of an interruption is", options: ["A best measured by the length of the conversation involved", "B far greater than the time the interruption itself occupies", "C accurately calculated by those who design workplaces", "D lower than most office workers assume"], answer: "B",
          explain: "The writer concedes that the seconds are trivial and locates the expense in what happens afterwards, in the interrupted person's mind. A and C echo the paragraph's own wording about seconds and designers, which is the trap.",
          evidence: "the expensive part is what happens afterwards",
          vocab: ["the seconds are trivial", "far greater than the time"] },
        { n: 28, type: "mcq", prompt: "Studies that compared interrupted work with uninterrupted work found that interrupted tasks were", options: ["A abandoned more often than they were finished", "B returned to in a different order", "C judged less accurate by the researchers", "D completed sooner but at a cost to the worker"], answer: "D",
          explain: "The interrupted tasks were often completed faster, but the same workers reported more stress, frustration, time pressure and effort. That combination is 'sooner but at a cost to the worker'.",
          evidence: "worked at a higher tempo and reported significantly more stress",
          vocab: ["a higher tempo", "completed sooner"] },
        { n: 29, type: "mcq", prompt: "What does the writer say about interruptions that people cause themselves?", options: ["A They account for about half of all switches of activity", "B They are commonest among inexperienced employees", "C They have been reduced by better software design", "D They are a sign of a weak character"], answer: "A",
          explain: "Roughly half the switches were self-generated, with nobody speaking and no message arriving. D repeats the passage's own phrase about character only to have it rejected: 'not a defect of character'.",
          evidence: "roughly half turned out to be self-generated",
          vocab: ["self-generated", "people cause themselves"] },
        { n: 30, type: "mcq", prompt: "The writer's main objection to advice about concentrating harder is that such advice", options: ["A underestimates how fast attention recovers", "B ignores the benefits that some interruptions bring", "C expects individuals to resist conditions built to overcome them", "D has never been tested under laboratory conditions"], answer: "C",
          explain: "Discipline is 'being asked to fight an environment that has been engineered, quite deliberately, to defeat it' — the paraphrase in C. B is true of the passage elsewhere, but it is not the objection to this advice.",
          evidence: "an environment that has been engineered, quite deliberately, to defeat it",
          vocab: ["engineered to defeat it", "built to overcome them"] },
        { n: 31, type: "ynng", prompt: "People generally underestimate how much an interruption affects them.", answer: "YES",
          explain: "YES: the writer says self-assessment in this area is poor and that interrupted workers report losing only 'a moment or two', while the measured recovery takes far longer.",
          evidence: "interrupted workers tend to report that they lost a moment or two",
          vocab: ["Self-assessment in this area is poor", "underestimate"] },
        { n: 32, type: "ynng", prompt: "Concentration returns to its full level the moment work on the original task begins again.", answer: "NO",
          explain: "NO: for some minutes after resuming, people are 'running on reduced capacity' because part of their attention is still on the abandoned job — a direct contradiction.",
          evidence: "for some minutes they are running on reduced capacity",
          vocab: ["reduced capacity", "full level"] },
        { n: 33, type: "ynng", prompt: "Some occupations suffer more interruptions than others.", answer: "NOT GIVEN",
          explain: "NOT GIVEN: the passage counts and describes interruptions in office work, but never compares one occupation or industry with another. Do not import what you know from outside the text.",
          evidence: "researchers sat beside office workers with stopwatches" },
        { n: 34, type: "ynng", prompt: "Switching off notifications is enough on its own to fix the problem.", answer: "NO",
          explain: "NO: the writer states that turning notifications off while the culture still expects instant answers 'merely moves the pressure somewhere else' — explicitly not a solution on its own.",
          evidence: "merely moves the pressure somewhere else",
          vocab: ["no single fix will do the job", "enough on its own"] },
        { n: 35, type: "ynng", prompt: "Certain interruptions prevent more serious mistakes.", answer: "YES",
          explain: "YES: the question from the next desk 'often prevents a week of work in the wrong direction', and workplaces that allow no interruption end up with nobody checking anybody.",
          evidence: "often prevents a week of work in the wrong direction",
          vocab: ["work in the wrong direction", "more serious mistakes"] },
        { n: 36, type: "match", group: "ends", boxTitle: "Sentence endings",
          box: [
            "leaves the unfinished job in a clearer state, so less attention stays behind.",
            "describes how long people take on average to get back to an interrupted task.",
            "shows that most interruptions are caused by managers.",
            "reduces the number of times concentration has to be rebuilt from nothing.",
            "leaves part of the mind still working on the previous job.",
            "were introduced in order to encourage the very exchanges that break concentration.",
            "proves that interruption has no effect on the quality of work.",
          ],
          rubric: "Complete each sentence with the correct ending, A–G, below.",
          prompt: "Attention residue is the name for the way an interruption", answer: "E",
          explain: "Attention residue is defined as a portion of attention staying behind, still processing the unfinished business of the first task — ending E puts that in plainer words.",
          evidence: "a portion of our attention stays behind, still processing the unfinished business",
          vocab: ["a portion of our attention stays behind", "part of the mind still working"] },
        { n: 37, type: "match", group: "ends", prompt: "The figure of twenty-three minutes", answer: "B",
          explain: "The stopwatch studies produced this figure as the average time people took to return to an abandoned task — ending B. Nothing in the passage links the figure to accuracy or to managers.",
          evidence: "people took on average around twenty-three minutes to return to it",
          vocab: ["return to it", "get back to an interrupted task"] },
        { n: 38, type: "match", group: "ends", prompt: "Open-plan offices", answer: "F",
          explain: "The open-plan floor was 'adopted to encourage the spontaneous exchanges that are, by definition, interruptions' — ending F, with 'adopted' paraphrased as 'were introduced'.",
          evidence: "adopted to encourage the spontaneous exchanges",
          vocab: ["adopted", "were introduced"] },
        { n: 39, type: "match", group: "ends", prompt: "Noting down your position before you turn away", answer: "A",
          explain: "The ready-to-resume habit reduces residue because the abandoned task is no longer ambiguous — ending A, which restates 'no longer ambiguous' as 'in a clearer state'.",
          evidence: "because the abandoned task is no longer ambiguous",
          vocab: ["no longer ambiguous", "in a clearer state"] },
        { n: 40, type: "match", group: "ends", prompt: "Dealing with messages in a few fixed periods", answer: "D",
          explain: "Batching does not reduce the number of messages, but it 'collapses the number of occasions on which concentration must be built again from nothing' — ending D.",
          evidence: "collapses the number of occasions on which concentration must be built again from nothing",
          vocab: ["built again from nothing", "rebuilt from nothing"] },
      ],
    },
  ],
};
