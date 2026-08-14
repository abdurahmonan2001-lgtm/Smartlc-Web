# Generates the four Practice Set 15 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a driving school to book an intensive driving course. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Highfield Driving School, good morning.",
  "F|Good morning. I'd like to book one of your intensive courses, if there are any places left this summer.",
  "M|There are, yes - we run one most weeks. It's two hours of driving every weekday, so ten hours across the five days. Shall I take your details?",
  "F|Please do.",
  "M|Your full name first.",
  "F|It's Zulfiya Bekmurodova.",
  "M|Could you spell the surname for me?",
  "F|Of course. It's B, E, K, M, U, R, O, D, O, V, A. Bekmurodova.",
  "M|Thank you. Now, we run two kinds of intensive week. There's the beginners course, which lasts ten days and assumes you have never sat behind a wheel. Is that the one you want?",
  "F|I don't think so. I had about twelve lessons two years ago, and then I moved and stopped.",
  "M|Then the beginners course would waste your time and your money. I'll put you down for the refresher course - that's the five-day one, for people who have driven before.",
  "F|The refresher course. That sounds right.",
  "M|May I ask what has brought this on? We're always curious.",
  "F|Work, mainly. I've been a receptionist at the clinic for three years, but I qualify in July - I start as a nurse, and I'll have to drive out to patients in the villages.",
  "M|Congratulations. Right, dates. The next refresher week begins on Monday the fifteenth of June... ah, no, forgive me, that is the week we close for instructor training. It's the one after: Monday the twenty-second of June.",
  "F|Monday the twenty-second. That works nicely.",
  "M|Lessons run from nine thirty to eleven thirty each morning, and your instructor will be Ruslan, who also takes our theory classes.",
  "F|And where do I meet him on the first day?",
  "M|Normally he would pick you up outside our office, but the office car park is being resurfaced that fortnight. So for the first lesson, wait outside the station and he'll collect you there. After that he comes to your home.",
  "F|Outside the station. Fine.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|And what does the week cost?",
  "M|The published price is nine hundred thousand som, but if you book all five days at once there's a package rate, so it comes to seven hundred and eighty.",
  "F|Seven hundred and eighty thousand. Do I pay the whole amount now?",
  "M|Half today by card, half on the first morning.",
  "F|Right. What do I need to bring with me?",
  "M|Your provisional licence - the photocard, not the paper part, which we don't need. Without the licence Ruslan is not allowed to let you drive at all, so please don't forget it.",
  "F|Provisional licence. Do you need a passport as well?",
  "M|No, no passport. But do bring your glasses. He has to do the eyesight check on the first morning - reading a number plate at twenty metres - and people turn up having left them at home.",
  "F|My glasses. I'll put them in my bag tonight.",
  "M|And there's one optional extra you might think about. On the Friday afternoon we can add two hours of either night driving or motorway driving, for a small charge.",
  "F|Night driving I can practise with my brother. It's the big roads that frighten me, so the motorway one, please.",
  "M|Motorway driving on the Friday, noted. And have you got your theory test?",
  "F|I passed it in April, luckily.",
  "M|Excellent - that saves you about three weeks. Last thing: how shall I confirm? We used to post everything out and half of it never arrived, so now it's a text message with all the details, unless you would rather have email.",
  "F|A text is perfect.",
  "M|Then I'll send the confirmation by text this afternoon, and we'll see you on the twenty-second.",
  "F|Thank you very much. Goodbye.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a librarian talking to visitors at the opening of a new makerspace at Ashgrove Library. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and welcome to Ashgrove Library. Before I show you round the makerspace, let me answer the four questions I have been asked most often this week.",
  "F|The first is whose idea this was. The culture department at the council has taken a certain amount of the credit, and they did pay for part of it, but the idea was not theirs. Nor did it come out of the reader survey we ran two years ago - the survey came afterwards and simply confirmed what we already knew. The truth is that a group of teenagers who came in every Thursday spent about eighteen months asking us, politely at first and then rather less politely, to buy a three D printer. In the end we bought a good deal more than that.",
  "F|The second question is who may use it. Everyone, and I mean that. You do need to be a member of the library, but membership is free and takes two minutes at the desk, so it is hardly a barrier. There is no annual fee for the makerspace itself, and you do not have to be a student, or a resident of this borough. Some of the machines have to be booked, and I'll come to those, but the room itself is open all day.",
  "F|The third question is what went wrong, because everybody enjoys that one. Money, oddly, was the easy part - the grant came through first time. Finding staff was easier than we had feared, too, once the volunteers heard what we were planning. What nearly stopped the project was the building: we had designed the makerspace for the first floor, and then the engineers told us the floor there would not carry the weight of the equipment. So the whole thing came downstairs, which is why you are standing in what used to be the reference room.",
  "F|And the fourth question is what it is for. Not, principally, to train people for employment, though if that happens we shan't complain. And it is not a youth club, whatever the Friday evening timetable suggests. The purpose is simpler and much older: to help people mend and alter the things they already own, and to make the things they cannot buy. A library lends you books you could not afford to own. This room lends you tools on exactly the same principle.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Right - let me take you round the room, corner by corner.",
  "F|We start at the door with the print bay, which holds the three D printers and the laser cutter. Everything else in this room is free to use, but the print bay is our one exception: we charge for the plastic filament and the sheet material by weight, at exactly what it costs us. It is the only corner of the makerspace where anybody will ask you for money.",
  "F|Along the window is the textile room, with the sewing and embroidery machines. Some of you will recognise the equipment. The Tuesday sewing group used to meet in the hall behind the church, and when the hall was sold last year they brought the whole lot across to us - same machines, same members, new address.",
  "F|Behind the screen is the wood workshop: saws, a lathe, a pillar drill. Nobody touches anything in there until they have sat through our forty-minute safety session with one of the technicians. It runs twice a week, and I am afraid there are no exceptions to that rule, not even for retired carpenters.",
  "F|In the far corner is the recording booth, for music, podcasts and our oral history project. It is the one part of the building you can use when the library itself is shut: it's bookable until nine in the evening, four hours after the front desk closes, because the people who want it are mostly at work in the daytime.",
  "F|Opposite the booth is the electronics bench, with the soldering irons, the microscopes and those beautiful component drawers. We could never have afforded any of it. An engineering firm on the industrial estate replaced their workshop last year and gave us the old one, complete, on the single condition that we never mention their name. So I shan't.",
  "F|And finally the display cabinet by the entrance, where finished projects go on show. That was not our design at all: we ran a competition in the primary schools, and the winning class worked with the joiner on the shelves, the lighting and even the little labels. They chose that colour too, as you can probably tell.",
  "F|Right. Do go in, and please touch things.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two geography students, Farrukh and Nilufar, planning a study of wind on their university campus. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Nilufar, before we write the proposal - how do we explain why we picked wind?",
  "F|Honestly? The student newspaper. Three weeks running there were letters about the wind at the library entrance - somebody's coffee, somebody's essay, somebody nearly knocked off her feet. That is what made me think there was a project in it.",
  "M|Not Professor Rakhimov's lecture on urban climate, then?",
  "F|That was in November. We had already chosen by then. And the bin that blew into the road happened afterwards too - a good story, but the wrong order.",
  "M|The newspaper letters it is. Now, the literature review. What's your line on it?",
  "F|That there is plenty of it, and hardly any of it is measurement. Nearly everything published on pedestrian-level wind is modelling - computer simulations of airflow round blocks - and very few people go outside with an instrument to check. I am not saying the models are wrong. I am saying nobody has tested them on a campus like ours.",
  "M|That's our gap, then. Equipment - can we get the department's ultrasonic anemometers?",
  "F|I asked. Both of them are at the coastal site until October.",
  "M|We could build our own. There are sensor kits for almost nothing.",
  "F|And we would spend six weeks calibrating them. No - the sports centre has four hand-held meters they use for the archery field. I have borrowed them already; they're in my locker.",
  "M|Hand-held meters, then. What did the tutor say about the design?",
  "F|She was happy with the sites and with the timing. The one thing she was firm about was temperature. She says wind speed on its own tells us nothing about what people actually complain of, which is cold. So we note the temperature at every reading, without fail.",
  "M|Temperature at every reading. She didn't mind us working alone?",
  "F|She suggested pairs, she didn't insist. And access is already agreed - estates signed it off in March.",
  "M|Good. I'll admit what is keeping me awake, though. It isn't the equipment, and it isn't the sites. It's that we do all this in the calmest fortnight of the year and come back with thirty readings of two metres per second and nothing whatever to say.",
  "F|A flat calm. Yes, that would be a disaster. We should agree now to extend into a second week if the forecast looks poor.",
  "M|Agreed. And who is this actually for, do you think, beyond the marks?",
  "F|Not the city council - the campus isn't theirs. Future students will read it, but that's not a use. It's the estates department. They're planting the new avenue next spring and they still haven't decided where the trees go. If we can show them which corners are worst, that decision gets made with evidence instead of guesswork.",
  "M|Estates. Right - that goes in the introduction.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So which features are actually making the wind? Let's agree on that before we choose the sites.",
  "M|The obvious one is the gap between the two towers. It's a funnel - everything that hits the south face has to go somewhere, and it goes through there. That's where the letters came from.",
  "F|Agreed, that's the first one. What about the glass? People always blame the smooth surfaces.",
  "M|They do, but smooth cladding doesn't create wind, it just fails to slow it down. It isn't a cause. I'd leave it out.",
  "F|Fine. The raised walkway?",
  "M|I measured up there once with a phone app - it's no worse than the car park. Surprisingly sheltered, in fact.",
  "F|Then my second one is the underpass beneath the library. It's the same funnel effect but at ground level, and it's worse because everybody has to walk through it. Twice a day I'm holding my hood on in there.",
  "M|The underpass, yes. That's our second feature. And the young trees along the path?",
  "F|They are two metres high. In ten years they'll matter; this year they do nothing at all.",
  "M|So the gap between the towers, and the underpass. Now - what has to be done before we take a single reading?",
  "F|The risk assessment. The department won't release the meters until it's signed, and it has to cover working outdoors in high wind, which is precisely what we are planning to do.",
  "M|I'll draft it tonight. And we ought to tell estates.",
  "F|We have access, but not to the roof-level walkway - that's a separate permission and it takes a week. So yes, contact estates, this week, or we lose a site.",
  "M|Risk assessment and estates. What about mapping the sites?",
  "F|Done. I traced them off the campus plan on Sunday.",
  "M|And the recording app you wanted?",
  "F|Forget the app. Try tapping a screen in a gale with cold hands. Paper sheets on a clipboard, and we type them up in the evening.",
  "M|Paper it is. Right - I write the risk assessment, you email estates.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of glass. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good afternoon. Today's lecture is about a material so ordinary that you are almost certainly looking through some of it, or at it, at this very moment: glass.",
  "F|Glass existed long before anybody made it. Where a volcano cools its lava quickly enough, it forms a natural glass called obsidian, and our ancestors were shaping obsidian into knives and arrow points hundreds of thousands of years before the first furnace was lit. It takes an edge finer than steel; a few surgeons still use it.",
  "F|Who first made glass deliberately, we do not know. The Romans told a story of Phoenician merchants who cooked a meal on a beach, propped their pots on blocks of natron, and found glass running out of the fire in the morning. It is a charming story and almost certainly a legend - a beach fire is nowhere near hot enough. What the archaeology shows is that the first manufactured glass appears in Mesopotamia around three and a half thousand years before Christ, and that it appears as beads: small, coloured, valuable, and made in imitation of precious stone.",
  "F|Vessels came much later, and they were extraordinarily laborious. There was no way to blow a bottle, so the glassmaker built one. He shaped a core of clay on the end of a rod, trailed molten glass around it, rolled the surface smooth, let the whole thing cool, and then scraped the core out through the neck. A single small jar was weeks of work, which is why glass, for two thousand years, belonged to kings.",
  "F|Everything changed at about fifty years before Christ, in the Syrian region, with the discovery that a blob of molten glass on the end of a hollow iron tube can be inflated with the breath. Blowing is fast, it wastes almost nothing, and it needs one worker rather than a workshop. Within a century glass had gone from a royal luxury to an ordinary Roman kitchen material. The Romans stored food in it, drank from it, and were the first people to fit glass into windows, although their window glass was thick, greenish and barely transparent.",
  "F|Rome fell; the glassblowers did not. Their descendants worked in Venice, and by the thirteenth century Venice dominated the European trade. In twelve ninety-one the city took a decision that tells you how dangerous the industry was: every furnace was ordered out of Venice itself and onto the island of Murano, where a fire could burn without taking the city with it. It was convenient for keeping secrets, too - the makers of Murano were forbidden to leave the republic, on pain of severe punishment. Their great achievement was cristallo, a glass so nearly free of colour that for the first time you could see through it clearly rather than merely see light through it.",
  "F|The next advance was English. In the sixteen seventies George Ravenscroft, hunting for a glass that would not crack, added lead to the mixture and produced the heavy, brilliant, softly refracting material we still call lead crystal. What mattered in the long run was not the wine glasses. It was that European workshops could now make discs of a purity that would bend light in a controlled way, and out of that came the lens - and out of the lens the telescope, which enlarged the universe, and the microscope, which revealed the cell and, eventually, the germ. It is no exaggeration to say that a great deal of modern science was waiting for clear glass.",
  "F|Flat glass, meanwhile, stayed difficult and expensive until astonishingly recently. Then, in nineteen fifty-nine, after seven years of failure, Alastair Pilkington's team in England perfected the float process: molten glass is poured onto a bath of molten tin, on which it spreads out and floats, and comes off the far end as a perfectly flat ribbon. It is cheap, it is continuous, and almost every pane of window glass in the world is now made that way. The glass tower, and with it the whole look of the modern city, dates from that moment.",
  "F|There is one more transformation, and it is the one you are living inside. In nineteen seventy, researchers at Corning drew glass fibres pure enough to carry light for kilometres without the signal fading away, and those fibres are the physical foundation of the internet. And in your pocket there is a sheet of chemically strengthened glass, a few tenths of a millimetre thick, covering the screen of almost every phone made today.",
  "F|From an arrow point to a fibre carrying this lecture across the country. Next week: ceramics.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset15-s1.wav" $s1
Render "pset15-s2.wav" $s2
Render "pset15-s3.wav" $s3
Render "pset15-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
