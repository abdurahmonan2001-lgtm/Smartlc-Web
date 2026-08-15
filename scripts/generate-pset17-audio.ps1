# Generates the four Practice Set 17 listening recordings with Windows TTS.
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
    "M|You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and answer the questions. All the recordings will be played once only. The test is in four parts. Now turn to part one.",
    "P|3",
  "M|Part one. You will hear a woman telephoning the secretary of a community choir about joining. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Riverside Community Choir, good evening.",
  "F|Good evening. I saw your poster in the library, and I'd like to join. Are you still taking new singers?",
  "M|We are - we always need voices before the spring concert. Let me take a few details and I'll put you on the list. Can I start with your name?",
  "F|It's Dilnoza Rashidova.",
  "M|Would you spell the surname for me?",
  "F|Of course. It's R, A, S, H, I, D, O, V, A. Rashidova.",
  "M|Thank you. And which part do you sing?",
  "F|Soprano, I think. Although at school the teacher moved me across, because I could never reach the high notes.",
  "M|Then I suspect you are an alto, and that is what I'll write on the form for now. Our director listens to everybody on their first evening and she will settle it properly.",
  "F|An alto. That would explain a great deal.",
  "M|Now, rehearsals. We met on Mondays for years, but the hall was double booked once too often, so since January we have rehearsed on Wednesdays.",
  "F|Wednesday. That suits me better in any case.",
  "M|We start at half past seven, though do arrive by twenty past, because the warm up is the part everybody needs. We finish at nine.",
  "F|Half past seven until nine. And where do you meet?",
  "M|That has changed as well. It used to be the church hall on Bridge Street, but the roof is being repaired, so until the summer we are in the school hall in Mill Lane. There is parking behind it.",
  "F|The school hall, Mill Lane. I know it.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Can I ask about the cost?",
  "M|There is a membership fee for the year. It was a hundred and eighty thousand som - no, I do apologise, that was last season. The committee brought it down when the council grant came through, so it is a hundred and twenty thousand now, and you may pay it in two halves if that helps.",
  "F|A hundred and twenty thousand. That is fine. What should I bring on the first evening?",
  "M|Just a pencil. Everybody forgets, and you will want to mark your music, because our director changes something every two bars.",
  "F|A pencil. Do I need to buy the music itself?",
  "M|No. We lend you the scores, and you get a folder to keep them in, which is included in the fee. The one thing you will have to buy eventually is the concert dress - a plain black top with a skirt or trousers - but there is no hurry at all.",
  "F|Good. And when would my first concert be?",
  "M|We sing twice a year. The summer concert is in June, but the one you will be rehearsing for is the carol concert in December, in the cathedral.",
  "F|December. Something to aim at. Is there anything I should do before Wednesday?",
  "M|One thing. There is a short form - contact details and an emergency number. We used to hand it round on paper, but half of them came back unreadable, so it is on the website now. Fill it in tonight and the director will have your name in front of her.",
  "F|I'll do that this evening. Thank you very much indeed.",
  "M|You are very welcome. We will see you on Wednesday at half past seven.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a council project officer speaking at a public meeting about a proposed new footbridge. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out on such a wet night to hear about the Weir Lane footbridge.",
  "F|Let me begin with why we are building it at all, because there are several theories going round the town. The riverside walking trail does bring visitors, and one or two people have told me the bridge is really for tourists - it is not. Others remember that the little passenger ferry stopped running eight years ago, and yes, we did look at a bridge then and decided we could not afford one. What has actually forced our hand is the railway. The company is closing the level crossing at the end of Weir Lane on safety grounds next year, and without it the whole Northfield estate is cut off from the station and the shops. The bridge replaces that crossing.",
  "F|Now, the design. We put three options on show in the library in March. The suspension design, the one hanging from a single tower, was easily the most popular with visitors - and easily the most expensive, so it has gone. The river authority asked whether the middle section could be opened for tall boats, but the deck already clears the water by six metres, which is more than anything that sails here needs, so we have not pursued it. What we are taking forward is a deck of laminated timber on steel supports. Timber holds far less carbon than concrete, it goes up more quickly, and, as anyone who lives beside a steel bridge will tell you, it is a great deal quieter underfoot.",
  "F|We have had four hundred and twelve written responses so far, and I want to be honest about them. A handful of people think the money would be better spent on the roads. The trees caused a good deal of worry early on, but once we confirmed that only two willows have to be moved, that fell away almost completely. The objection that comes up again and again, in more than half of the responses, is what happens on the bridge after dark. People are afraid it will attract groups at night and that the estate will get the noise. We take that seriously, and I will come back to it.",
  "F|So what happens next? A number of you have asked whether the builders arrive in the spring. They do not. We will redraw the design where these responses tell us to, and then put the new drawings on show again in the autumn, here in this hall, before anything goes near the planning committee.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Let me take you through the scheme piece by piece.",
  "F|The north landing, on this side of the river, is not where it was in March. The drawings showed it beside the pumping station, until the water company pointed out the main that runs underneath, so the landing has shifted forty metres upstream, opposite the allotments.",
  "F|The south ramp is the long, gentle slope up to the estate, and it is the one part of this project the council is not paying for. The company building the ninety houses at Northfield is meeting the whole cost of it as a condition of their permission.",
  "F|Lighting. This is our answer to the worry I mentioned. The bridge will have low level lights along the handrail, bright enough to walk by and no brighter, and they will be switched off between midnight and five. We have promised to look at that again twelve months after the bridge opens, once we can see how it is actually used.",
  "F|The cycle lane along the deck was not in our first drawings at all. It is there because the two primary schools asked for it. They run the cycle training, and their staff argued that pushing children onto a narrow shared path is how accidents happen. They were right.",
  "F|The viewing platform over the weir is the part I am sorriest about. It was a fine wide half circle in the first design, but the tender prices came back well above our budget, and it is now half the size it was. It is still worth standing on.",
  "F|And finally the riverside path, which we will resurface from the north landing down to the mill. The stone for that is coming from the old level crossing - the setts and kerbs will be lifted before it is taken out, and laid again on the path, which pleases the history society more than anything else in the scheme.",
  "F|Right. There are plans on the tables, and my colleagues have the comment forms.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two students, Aziz and Shahnoza, discussing a survey of queues that they are carrying out. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Shahnoza, before we go any further - the report wants a paragraph on why we picked queues. What do we say?",
  "F|The truth, I suppose. Not that documentary you keep quoting, the one about airports.",
  "M|It was a good documentary.",
  "F|It was, but we had chosen the topic weeks before it. And it was not Doctor Umarov's suggestion either - he only offered us the traffic project, which we turned down. It was the passport office. Forty minutes standing in a room with no line, no numbers, nobody knowing who was next, and everybody furious. I came out thinking that somebody must study this.",
  "M|Somebody does, and that is the next paragraph. I read eleven papers this week.",
  "F|And?",
  "M|And nearly all of them measure the same thing: how many minutes people actually wait. Arrival rates, service rates, all very tidy. Almost nobody records how long the wait felt, which is the part that decides whether you ever come back to the shop.",
  "F|That is our gap, then. Right - the pilot. What did Tuesday actually teach us?",
  "M|That we had the busy period wrong. We both assumed the rush would be at lunchtime, and we sat there from twelve until two counting almost nobody. The queue built up after four, when people finish work.",
  "F|So we move the sessions. The counting itself worked, I thought - the clicker was fine, and people were perfectly happy to talk to us afterwards.",
  "M|Yes, no trouble there. Which brings us to how we ask them. I still like the idea of an app.",
  "F|Aziz, we have five weeks. Doctor Umarov said it himself - building an app would eat the whole term. And paper forms are hopeless outdoors, they blow about and nobody wants to stand there filling one in. One spoken question as they walk away, that is all: how long do you think you were waiting? Four seconds.",
  "M|One spoken question as they leave. Agreed, and it is a cleaner comparison anyway - their guess against our stopwatch.",
  "F|Now, the rules. Doctor Umarov was very clear on Monday. He does not mind what time of day we test, and he is not asking for a particular number of observations, though obviously more is better. But we may not stand in any shop or office without a letter of permission from whoever manages it, signed, before we start.",
  "M|Written permission first. Fine. And my worry, honestly, is the people who give up.",
  "F|The ones who join the queue, wait, look at it and walk out?",
  "M|Exactly. Our stopwatch says nothing about them, and they are the unhappiest customers in the building. If we do not record them, we are measuring the patient people only.",
  "F|That worries me just as much. We will add a column for it.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, where do we go? We cannot be everywhere.",
  "M|The bank was my first thought, but you need clearance from their head office, and that takes a month.",
  "F|Out, then. The bus station?",
  "M|I went to look. There is not a queue at all - it is a crowd that moves when the bus arrives. There is nothing to time.",
  "F|Agreed, out. So: the supermarket checkout, obviously. The manager at Ravnaq said yes on the spot, and there are eight tills, so we can watch a short queue and a long one at the same time.",
  "M|The supermarket is definite. And the second one - the pharmacy on the square?",
  "F|Three customers an hour, Aziz. We would be there all term. I would much rather have the city post office. It is busy all day, the queue is a single line, and my aunt works there, so the letter will take a day.",
  "M|The post office it is. Supermarket and post office.",
  "F|Now, this week. The permission letter has to be written and signed - I will draft it tonight and take it round tomorrow.",
  "M|That is the one thing that cannot slip. And I think we should also spend an hour practising the counting together, both of us on the same queue, comparing our numbers. If we are timing differently, we need to find out now, not in week four.",
  "F|Yes - a practice run together. Good. What about the second stopwatch?",
  "M|Not needed. The phones are accurate to a hundredth of a second and we both have one.",
  "F|And the reading can wait - eleven papers is plenty for the draft. Shall I book the computer room for the analysis?",
  "M|Not yet, that is weeks away. The letter and the practice, then.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of pepper. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we followed sugar around the world. Today I want to look at a spice that was, for most of recorded history, worth a great deal more than sugar ever was: pepper.",
  "F|Let us start with the plant, because almost everything else follows from where it grows. Black pepper comes from a single species native to the Malabar coast, the wet south-western edge of India. It is not a tree and not a bush: it is a climbing vine, and growers train it up living trees or wooden poles, where it can reach eight or nine metres. The fruit is a small berry, and here is the point that surprises people every year - black, green and white pepper all come from the same berry, and the difference lies entirely in the treatment. For black pepper the berries are picked while they are still unripe and green, then dried in the sun until they wrinkle and turn black. For white pepper the berries are left to ripen fully and are then soaked in water for a week or so, until the outer skin can be rubbed off, leaving the pale seed inside.",
  "F|Now, the trade, which is far older than most people imagine. Peppercorns have been found in the nose of an Egyptian king buried more than three thousand years ago, which tells us the spice was already crossing the ocean in the Bronze Age. By Roman times the route was a regular commercial highway. Greek and Roman captains had learned to sail with the monsoon winds, out to India in one season and home on the reversed wind in the next, which cut a coastal crawl of eighteen months to a voyage of a few weeks. Rome consumed pepper on an extraordinary scale, and not everyone approved: a Roman writer complained bitterly that the trade in spices was draining the empire of gold, year after year, for something that offered nothing but its bite. And when the Goths surrounded Rome in the year four hundred and eight, the price of leaving was silver, silk and three thousand pounds of pepper. Pepper was part of the ransom.",
  "F|In medieval Europe pepper kept that status as a kind of currency. It was counted out corn by corn, weighed on the most delicate scales in the house, accepted in payment of taxes and dues, and left to relatives in wills. We still have the fossil of that habit in our law: when a landlord wants to grant something for almost nothing, but must charge something, the token payment is called a peppercorn rent. In London the men who dealt in the spice formed a guild, and because they owned the accurate scales, that body ended up weighing and checking other goods for the whole city. Meanwhile the last stage of the route made Venice and Genoa rich; the spice changed hands perhaps a dozen times between the Indian grower and the German kitchen, and every pair of hands took its share.",
  "F|Which is precisely why Europe went looking for a way round. In fourteen ninety-eight Vasco da Gama reached the Indian coast by sea, and within twenty years Portugal was policing the pepper route with guns. The Dutch took the business from them in the seventeenth century and did something cleverer: they moved the crop, establishing great pepper plantations on the island of Sumatra, and later elsewhere in the region. That was the beginning of the end of pepper as treasure. As supply grew the price fell, and by the eighteenth century pepper stood on ordinary tables all over Europe. Nothing destroys a luxury faster than success.",
  "F|Two footnotes before we finish. The heat of pepper comes from a chemical called piperine, first isolated in eighteen twenty, and it works by irritating the same nerve endings that report heat and pain - which is why we describe a taste in the language of temperature. And the story you have all heard, that medieval cooks used pepper to disguise the taste of meat that had gone bad, is simply untrue: anybody who could afford pepper could afford fresh meat, and the spice was used because people liked it. Today the plant that was once worth its weight in silver grows right across the tropics, and the largest producer in the world is now Vietnam. Next week: the potato.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset17-s1.wav" $s1
Render "pset17-s2.wav" $s2
Render "pset17-s3.wav" $s3
Render "pset17-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
