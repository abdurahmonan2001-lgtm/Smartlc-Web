# Generates the four Practice Set 12 listening recordings with Windows TTS.
# Same conventions as the mock tests: "F|"/"M|" pick the voice, "P|<seconds>"
# is a silent question-preview pause; post-2020 announcer format throughout.
Add-Type -AssemblyName System.Speech
$out = Join-Path $PSScriptRoot "..\public\practice-audio"
New-Item -ItemType Directory -Force $out | Out-Null

$synth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$voices = $synth.GetInstalledVoices() | ForEach-Object { $_.VoiceInfo.Name }
$female = ($voices | Where-Object { $_ -match "Zira|Female" } | Select-Object -First 1)
$male   = ($voices | Where-Object { $_ -match "David|Mark|Male" } | Select-Object -First 1)

function Render($file, $lines) {
    $synth.SetOutputToWaveFile((Join-Path $out $file))
    $synth.Rate = -1
    foreach ($line in $lines) {
        $parts = $line.Split("|", 2)
        if ($parts[0] -eq "P") {
            $ms = [int]([double]$parts[1] * 1000)
            $synth.SpeakSsml("<speak version=""1.0"" xmlns=""http://www.w3.org/2001/10/synthesis"" xml:lang=""en-US""><break time=""$($ms)ms""/></speak>")
            continue
        }
        $voice = if ($parts[0] -eq "F") { $female } else { $male }
        if ($voice) { try { $synth.SelectVoice($voice) } catch {} }
        $synth.Speak($parts[1])
    }
    $synth.SetOutputToNull()
    Write-Host "wrote $file"
}

$s1 = @(
  "M|Part one. You will hear a woman telephoning a repair company to arrange a visit from an engineer. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Ashford Home Repairs, good morning.",
  "F|Good morning. I'd like to book an engineer to come and look at an appliance, if that's possible this week.",
  "M|I'm sure we can manage that. I'll take a few details and then find you a slot. Can I start with your name?",
  "F|Yes, it's Dilbar Tursunova.",
  "M|Could you spell the surname for me, please?",
  "F|Of course. T, U, R, S, U, N, O, V, A. Tursunova.",
  "M|Thank you. And which appliance is giving you trouble?",
  "F|Well, the washing machine has been noisy for months, but that isn't why I'm ringing - I can live with the noise. It's the dishwasher. It finishes the cycle and there is still water standing in the bottom of it.",
  "M|Right, so it's the dishwasher we're coming out for. How old is it, roughly?",
  "F|About four years. We bought it when we moved in.",
  "M|That's fine, we carry parts for most machines of that age. Now, the address, please.",
  "F|It's flat three, fourteen Rosemary Street.",
  "M|Rosemary Street. Is that the one that runs off the market square?",
  "F|That's right. If it helps, we're directly opposite the pharmacy. People sometimes say opposite the bakery, but the bakery is further down, on the corner.",
  "M|Opposite the pharmacy. That is useful - our engineers lose a lot of time hunting for doorways. Now, when would suit you? I could offer you Thursday the twelfth... ah, no, I do apologise, that one has just been taken. The next free day is Thursday the nineteenth.",
  "F|Thursday the nineteenth is fine.",
  "M|And the engineer will be with you between eight and ten in the morning. He telephones about twenty minutes before he arrives, so you won't be waiting by the window.",
  "F|Good. Can I ask what it costs?",
  "M|The call-out charge is ninety thousand som. It was a hundred and twenty until the summer, but we brought it down when we put a second van on the road. The ninety thousand covers the visit and the diagnosis; any parts are charged on top of that, and he will tell you the price before he fits anything.",
  "F|Ninety thousand. And how would you like me to pay?",
  "M|Card or cash on the day, whichever is easier for you.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|There is one difficulty. I have to be at work by half past eight, so I probably won't be here when he comes.",
  "M|That's not a problem at all, as long as somebody can let him in. Is there a relative nearby who could hold a key?",
  "F|My sister lives right across town, so she's no use. The caretaker used to keep keys for the whole building, but he retired in the spring and nobody has replaced him. I could leave it with my neighbour, though - she is at home all day.",
  "M|Perfect. I'll write down that the key will be with the neighbour, and I'll put her flat number on the job sheet as well.",
  "F|Thank you. Is there anything I should do before he arrives?",
  "M|Yes, one thing that genuinely helps. The waste pipe runs behind the unit, so please empty the cupboard under the sink - take everything out of it. Otherwise he spends the first ten minutes moving bottles around, and you are paying for that time.",
  "F|Empty the cupboard. Right.",
  "M|And don't run the machine that morning. He would rather see it exactly as it is when it fails.",
  "F|Understood. Will I get something in writing?",
  "M|You will. We used to send everything by email, but half of it disappeared into people's junk folders, so nowadays we confirm by text message instead. Is the number you're calling from a mobile?",
  "F|It is, yes.",
  "M|Then the text will reach you within the hour, with the date, the time slot and the reference number.",
  "F|And if the fault comes back afterwards?",
  "M|Every repair we do carries a three-month guarantee. If the same fault returns inside that period we come out again, and there is no second call-out charge.",
  "F|That's reassuring. Thank you very much indeed.",
  "M|Thank you for calling. We'll see you on the nineteenth.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a transport officer talking to a community meeting about a new bus-on-demand service in the town of Marden. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone. Six months ago the number thirty-one bus disappeared and something called Marden Connect took its place, and I know some of you are still not sure what happened or why.",
  "F|Let me deal with the why first, because there are two explanations going round that are simply wrong. People assume we did it to save money on fuel. Fuel is expensive, certainly, but that is not what drove the decision. And several of you have asked whether it was because of the new houses out at Ashcombe; those came later, and the plan was already written. The plain fact is that the number thirty-one, running its fixed route four times a day, was carrying an average of two passengers a journey. Two. A service that empty cannot be defended, and the choice in front of us was between cancelling it altogether and reinventing it.",
  "F|So how does it work? You tell us where you are and where you want to go, the software puts you together with other people travelling the same way, and a minibus comes to a pick-up point near you. Now, how you book. There is a telephone line, and it will stay, because I know perfectly well that not everybody wants an application on a phone; the office takes bookings from eight in the morning. But nine journeys out of ten are now booked through the app, and honestly that is where the system works best, because it shows you your pick-up time straight away instead of ringing you back. The machine at the bus station, by the way, only sells tickets for the regional coaches. It cannot book a journey with us, so please don't queue there.",
  "F|What are people unhappy about? Waiting times, you would expect. In fact the average wait has been eleven minutes and we have had almost no complaints about it. Fares are exactly what they were on the old bus, so nobody complains about those either. No - every complaint we have received, and there have been plenty, is about where the vehicle stops. People expected to be collected outside their own front door, and in most of the town they walk to a corner up to four hundred metres away.",
  "F|And what is changing? From April the service will run later. At the moment the last booking is at seven in the evening; from April you will be able to travel until eleven, which the college students have been asking for since the day we started. Fares are not going up this year. The area we cover will grow as well, but not in April - that is for next year, once the second minibus is delivered.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Right. Let me take you through the main destinations one by one, because each of them has its own story.",
  "F|The hospital first. More journeys end at the hospital than anywhere else on the network - it accounts for almost a third of everything we carry, and if you travel at two in the afternoon you will certainly be sharing the minibus.",
  "F|Marden railway station. The pick-up point there used to be on the forecourt, but the taxi firms objected and, to be fair to them, the forecourt is chaotic at half past seven in the morning. So since the middle of last month we have collected and set down in Bridge Lane, at the side of the station.",
  "F|The business park at Weir Road. Almost all of that traffic is early. The shifts start at seven, the minibus is full between six and seven in the morning, and for the rest of the day it is nearly empty.",
  "F|The village of Ashcombe, where the new houses are. Ashcombe was outside our boundary when we launched, and the residents wrote to the council about it in some numbers. We brought the village inside the zone four weeks ago, and it is already busy.",
  "F|The leisure centre. It sits at the far end of the zone and the road out there is slow, so it is the one destination we ask you to book the day before, rather than an hour before. If you try to book it at short notice the app will simply refuse you.",
  "F|And the market. We run to the market square on Saturdays only - there is no service to it during the week, because on weekdays the square is closed to vehicles altogether. On Saturday mornings, though, we run every twenty minutes.",
  "F|Right, that is the tour. I'll take questions now.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two psychology students, Javlon and Madina, discussing a memory test they are preparing. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Javlon, before we write anything else, the report wants a paragraph on why we chose this topic. Memory for spoken instructions.",
  "M|Do we say the tutor suggested it?",
  "F|She didn't, though. She suggested memory for faces, and we turned it down. And it wasn't that article you sent me either, the one about pilots and their checklists - interesting, but we had already decided by then.",
  "M|True. It was the warehouse, wasn't it. I work there at weekends, the supervisor calls out five or six instructions at the door, and by the time we reach the far aisle nobody can remember more than three of them.",
  "F|That's the honest reason, so that is what we write. Right - the literature. I read eleven papers in the end.",
  "M|And they were solid, I thought. The word lists were a decent length, whatever you said at first.",
  "F|Yes, I withdraw that. And two of them have been repeated by other teams, so replication isn't the weakness either. My problem is the participants. Almost every one of those studies used undergraduates between eighteen and twenty-two. That is not the population that gets shouted at in a warehouse.",
  "M|Agreed, that is the gap. Now, the pilot. It didn't go well, did it.",
  "F|It did not. Though not for the reasons we feared. The room was quiet enough, and the recording was perfectly audible - I checked with everyone afterwards.",
  "M|The problem was that three of them wrote the words down while they were listening. One of them had a pen out on the desk before I finished speaking.",
  "F|Which destroys the whole point. We are measuring memory, not handwriting. So the instructions have to say it, and we clear the desks ourselves.",
  "M|Now, the delay. Between hearing the list and being asked to recall it, how long?",
  "F|In the pilot we used ten seconds, which was far too short - everybody simply repeated the words back.",
  "M|A minute, then?",
  "F|I'd go further. In the warehouse it might be four or five minutes before you actually need the instruction. Let's make it five minutes, with a simple counting task in the middle so they can't rehearse.",
  "M|Five minutes it is. That's a better match with the real situation anyway.",
  "F|Now, something is bothering me about our sample.",
  "M|Not the numbers? We have forty-two people, that's plenty.",
  "F|The numbers are fine, and they've all promised to come to the second session. What worries me is who they are. Nearly two-thirds of them study languages. People who spend their days memorising vocabulary are not typical, and a reviewer will say so.",
  "M|Fair. We can at least record their subject and report it. Oh - and the tutor's note came back on the draft.",
  "F|What did she want? More references?",
  "M|No, she said the reading was thorough. She wants a diagram of the procedure - a box for each stage, the timings underneath. She says nobody can follow our method from the paragraph we wrote, and she is right, I read it again this morning.",
  "F|I'll draw it. Limitations she was happy with, then?",
  "M|Happy enough.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, the word lists themselves. What do we change?",
  "M|Two things, I think. First, length. We had cinema next to refrigerator next to cat, and the long ones were remembered worse simply because they are long. Every word should be about the same length - two syllables, say.",
  "F|Agreed, that has to be first. What about adding some rare words, to spread the scores out?",
  "M|No. Unfamiliar words test vocabulary, not memory. Leave them out.",
  "F|And the speed? Some of the pilot group said it was fast.",
  "M|They always say that. The rate is the same as the supervisor's, which is the point of the study. I'm leaving the speed alone.",
  "F|Then my change is the categories. In list two we had spoon, plate and cup together, and people recalled all three or none - they were storing them as a group. Any words from the same category have to come out.",
  "M|Yes. Same length, no categories - those are the two changes. What about the voice? Should we record a man and a woman?",
  "F|That's a whole extra variable, and we haven't the numbers for it. One voice, mine, on every list.",
  "M|Fine. Now, what has to be done before we start properly?",
  "F|The consent form, first. The ethics office won't look at anything until the form is written, and they take two weeks.",
  "M|I'll do that tonight. The laboratory is already booked, by the way - I did it in September for the whole term.",
  "F|Good. And the second job is the pilot data. We can't set the scoring rules until we've been through the pilot answers properly, and that means going through them together.",
  "M|Thursday afternoon?",
  "F|Thursday. And we don't need to buy headphones, do we?",
  "M|No, the department has twenty pairs. And the instructions stay in English, so nothing to translate.",
  "F|Right. Consent form and the pilot data. That's the week.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of purple dye. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we followed the history of indigo. Today I want to take the colour that sits opposite it in every sense: purple. For three thousand years purple was not simply a colour. It was a statement about who you were.",
  "F|The story begins on the coast of what is now Lebanon, in the Phoenician city of Tyre, which gave the dye the name it still carries: Tyrian purple. And the source of that dye was, of all things, a sea snail. Two or three related species were used, and the dye came from a single small gland inside the animal. Fresh from the gland the liquid is not purple at all - it is a pale cream, and it turns through green and blue to deep red-purple only when it is exposed to air and sunlight.",
  "F|Getting the colour out of the animals was an industry, and a brutal one. The workshops were always built outside the city walls, and the reason was the smell. Thousands of shellfish were left to rot in shallow vats in the sun, and ancient writers describe the stench as unbearable from a considerable distance. Roman writers who praised the colour on a senator's robe were quite clear that they would not live near the place it was made.",
  "F|And the yields were tiny. The best modern estimate is that something like ten thousand snails were needed to produce a single gram of the finished dye. A pound of dyed wool could cost more than a skilled worker earned in a year. That is the whole economic explanation for what follows.",
  "F|Because a colour that expensive becomes a signal, and signals get regulated. In imperial Rome the deepest shade, the one they called blood-purple, was restricted by law to the emperor himself, and wearing it without permission was treated as an act of treason rather than a matter of fashion. In the Byzantine empire the association went further still: children of the ruling family were delivered in a chamber lined with purple stone, and were said ever afterwards to have been born in the purple.",
  "F|That trade ended abruptly. When Constantinople fell in fourteen fifty-three, the imperial workshops closed, the guild that held the technique was dispersed, and within a generation the method of making true Tyrian purple was simply lost. For four hundred years afterwards Europe made do with purples mixed from plant dyes, which faded badly in sunlight and washed out in water.",
  "F|Now to the accident that changed everything. In eighteen fifty-six an eighteen-year-old chemistry student in London called William Perkin was working through the Easter holiday in a laboratory at the top of his parents' house. His goal was quinine, the drug used against malaria, which at that time could only be obtained from the bark of a South American tree. He was trying to build it up from the waste products of the gas industry - that is, from coal tar. He failed completely. What he got was a black sludge, and when he tried to wash the flask out with alcohol the sludge dissolved into an intense purple liquid, which stained a scrap of silk on his bench a brilliant shade that did not wash out and did not fade.",
  "F|Perkin was eighteen, and he did something remarkable: he left his studies, borrowed money from his father, and opened a dye factory west of London within two years. He called the colour mauve. The timing was extraordinarily lucky. The colour caught the attention of the Empress of France and then of Queen Victoria, who wore it at her daughter's wedding, and the newspapers of the day wrote about mauve fever. What settled it, though, was something much smaller: in eighteen sixty-one the new penny stamp was printed in Perkin's colour, and suddenly every household in the country handled mauve every week.",
  "F|The consequences reach far beyond fashion. Perkin's accident created the synthetic dye industry, and that industry created the modern chemical laboratory - Germany in particular built its industrial strength on the coal-tar colours that followed. And because the same companies were already making and testing complicated organic molecules, it was those dye works that produced the first synthetic drugs, aspirin among them, at the end of the century. The search for a colour, in other words, built the pharmaceutical industry.",
  "F|So: a snail, an emperor, a failed experiment and a postage stamp. Next week, the history of the colour green, which turns out to be an even stranger story, because for most of the nineteenth century it was poisonous.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset12-s1.wav" $s1
Render "pset12-s2.wav" $s2
Render "pset12-s3.wav" $s3
Render "pset12-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
