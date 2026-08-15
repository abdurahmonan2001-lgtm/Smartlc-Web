# Generates the four Practice Set 20 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a coach company to book places on a day trip. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Highfield Coaches, good morning. How can I help you?",
  "M|Good morning. I'm ringing about your day trips. My neighbour went on one in the spring and hasn't stopped talking about it.",
  "F|I'm glad to hear it. We run a full-day coach trip on the last Saturday of every month, and there are still places on the next one. Shall I book you in?",
  "M|Yes, please.",
  "F|Then I'll need a few details. Can I take your name?",
  "M|It's Malika Sattorova.",
  "F|And could you spell the surname for me?",
  "M|Of course. It's S, A, double T, O, R, O, V, A. Sattorova.",
  "F|Thank you. Now, there are two trips running that weekend - the abbey tour and the castle tour. Which one were you thinking of?",
  "M|The abbey one, I think. That's the one my neighbour went on.",
  "F|Ah. I'm sorry, but the abbey tour is completely full - it fills within a week every month. The castle tour has plenty of room, though, and between ourselves most people enjoy it more. There is a great deal more to see.",
  "M|The castle tour, then. That's fine by me.",
  "F|Lovely. Now, the date. The trips this autumn are on the fifteenth and the twenty-second of September. The fifteenth is the abbey one, so yours, the castle trip, is Saturday the twenty-second of September.",
  "M|Saturday the twenty-second. I'm writing this down.",
  "F|Good. Now, the pick-up point. For years we left from the bus station, but the roadworks there have made it impossible, so we now pick up outside the museum, in Park Street. Everybody knows where that is.",
  "M|Outside the museum, Park Street. And what time do we go?",
  "F|The leaflet says eight fifteen, but we've brought it forward for the autumn, because the days are shorter and the castle shuts earlier. So the coach leaves at quarter to eight. Do come fifteen minutes before that, though - the driver can't wait for anyone.",
  "M|Quarter to eight, arrive by half past seven. And when are we home?",
  "F|Back in the city by about seven in the evening, traffic permitting.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|Right - and how much does the trip cost?",
  "F|It was a hundred and ten thousand som last season, but we've agreed a group rate with the castle, so it's ninety-five thousand som per adult now. And that price includes your entrance ticket, which people often forget when they compare us with other companies.",
  "M|Ninety-five thousand, entrance included. Do I pay the whole amount today?",
  "F|No, just a deposit at this stage. It's twenty thousand som, and we ask for that within three days, or I'm afraid the seat goes back on sale. The rest you pay the driver on the morning.",
  "M|Twenty thousand within three days. Fine. Is lunch part of the price?",
  "F|No, lunch isn't included. Some people bring sandwiches, though there's no proper picnic area. There is a cafe beside the car park, and it's rather a good one - just be warned that it fills up at one o'clock, so go early or go late.",
  "M|A cafe by the car park. Noted.",
  "F|The seats are numbered, by the way, and we allocate them in the order people book, so you'll be well towards the front. The front row itself is kept for the guide.",
  "M|That's fine. Is there anything I ought to bring?",
  "F|A warm jacket, definitely. People arrive in summer clothes and regret it within the hour - the walk along the castle roof is completely open to the wind, and it is cold up there even in September. Sensible shoes as well, of course.",
  "M|A warm jacket. I'll remember that.",
  "F|Oh, and do tell me if anyone in your party is a student or over sixty - they pay ten per cent less.",
  "M|My mother is coming, so I'll mention it when I pay.",
  "F|Please do. The last thing is your tickets. For most trips we email them, but the castle insists on a paper ticket for every visitor, so for this one they go in the post. They should reach you early next week.",
  "M|By post. Thank you very much indeed.",
  "F|Thank you for calling. We'll see you on the twenty-second.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a project officer talking to visitors about a new open-water swimming lake. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good afternoon, everyone, and welcome to Ashwood Lake. Before I show you round, let me tell you how all this came about.",
  "F|People make some odd guesses about what this place used to be. Because of the shape of it, most visitors assume it was a reservoir that once supplied the city - it wasn't; the city water has always come from the hills. There was a proposal in the nineteen nineties to turn it into a fish farm, and you'll still find that in some of the old guidebooks, but nothing was ever built. What this actually is, is a hole. Gravel was dug out of here for thirty years to build the motorway, and when the diggers left, the ground water simply filled it up.",
  "F|Turning a flooded gravel pit into a swimming lake took us five years, which was three years longer than we promised. I should say straight away that the money was never the problem - a national lottery grant covered nearly all of it. And people always blame the weather, but the wet spring actually helped us, because it filled the shallow end. No, what held us up was a plant. A survey found a protected marsh orchid growing on the north bank, one of only four sites in the region, and the whole layout had to be redrawn around it. That took eight months of argument and a completely new design for the entrance.",
  "F|Now, the rules, because there are only three that really matter. You do not have to book every session - we only ask for bookings in July and August, when it gets crowded. We recommend that you swim with a friend, and most people do, but it isn't compulsory. The one absolute rule is this: every swimmer must wear a brightly coloured hat, which we hand out at the gate. In open water a head is a very small thing to see, and our lifeguards need to be able to count you.",
  "F|And what am I proudest of? Well, we have two and a half thousand members, which is more than any similar lake in the country, but numbers are not really an achievement, they're just a queue. The children's club on Sunday mornings is wonderful and I'd love to claim it, but it was the schools who set that up. No - what I am proudest of is that every one of our lifeguards is a volunteer from this town, trained here, at our expense, over two winters. Not one of them is paid, and not one of them was brought in from outside.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right. Let me take you round the site, and I'll say a word about each part of it as we go.",
  "F|We're standing at the shallow bay, here at the southern end, where the water never comes above chest height. Nobody who can already swim a kilometre needs to be in here at all, and we ask them not to be: the bay is set aside for beginners, and for the lessons we run on weekday evenings.",
  "F|Out to your right is the jetty, which is where the serious swimmers get into the water. We could never have afforded to build it ourselves - it was paid for by a local business, the engineering firm on the industrial estate, whose staff swim here most lunchtimes.",
  "F|The brick building behind you is the old weighbridge, from the gravel days. It's the only original building left standing, and rather than knock it down we filled it with kit. There are wetsuits in there in every size, floats, and safety buoys, and all of it holds equipment that can be borrowed by any member for a small charge.",
  "F|Beyond the weighbridge is the meadow, which we sowed with wildflowers in the first year. I'll be honest, we expected the swimmers to use it and nobody else. In fact it is popular with people who do not swim - families, dog walkers, half the town on a warm evening - and it has done more for our reputation than the lake itself.",
  "F|Then there's the car park, which is, frankly, far too small. We built it for a hundred cars and on a hot Saturday we get three hundred. The land next to it has now been bought, and it will be made larger next year, with a proper cycle store at the same time.",
  "F|And finally, out in the middle, the island. It looks tempting on a calm day, and I know exactly what you are thinking. Please don't. The island is a nesting site for terns, it must not be entered by swimmers at any time of year, and the buoys around it mark the limit of the swimming area.",
  "F|Right - follow me down to the jetty, and mind the step.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two students, Islom and Sitora, discussing a survey of bees they are carrying out. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Sitora, the project form. Question one: how did we come to choose the bee count?",
  "F|The honest answer, or the impressive one?",
  "M|The honest one. It wasn't Doctor Karimova's pollinator lecture, was it - that was in November, and we'd already registered the title.",
  "F|It wasn't. And it wasn't your uncle's hives either, though you do mention them roughly once a week. It was the national count last summer - we both signed up as volunteers, spent a fortnight sitting in front of flowers with a clipboard, and by the end of it we had more questions than the survey did.",
  "M|That's what I'll write, then. Now, section two - what's wrong with the standard method.",
  "F|It isn't the timing. Ten minutes at each patch is plenty, whatever you said last week, and the results compare perfectly well between sites - that's the whole point of a standard method. My objection is narrower. The standard count only records a bee if it is actually sitting on a flower. Bees flying through, bees resting, bees going into a nest in a wall - none of that is counted at all, and in a city that is where a lot of them are.",
  "M|Agreed, that's the gap. So, sites. I still like the idea of the railway banks - nobody mows them, they're full of flowers.",
  "F|They are, but we'd need permission from the railway company and they take months. Same trouble with the school grounds - two head teachers, safeguarding forms, and the school year ends before we'd finish. The public parks are the answer. The council has a standing agreement with the university, the flower beds are planted to a known list, and we can walk in at any hour.",
  "M|Public parks it is. Now, what exactly do we count?",
  "F|Not individual bees. You can't - they look identical and they come back.",
  "M|And not the time each bee spends on a flower, either. I tried that in the national count and I was hopeless at it.",
  "F|So we count the number of visits made to flowers. Every time a bee lands on a bloom, that's one visit, whether it's the same bee or not. It's what the pollination people use, because it measures the work being done rather than the population.",
  "M|Number of visits. Good. Now, I saw the tutor on Monday. She had one condition.",
  "F|Which was?",
  "M|Not photographs - she said photographing every bee would take us three times as long. And she doesn't mind whether we follow the same route through the park or wander about. What she insists on is that every count is repeated on three separate days. One warm morning proves nothing, she said, and she is quite right.",
  "F|Three days per site. That trebles the fieldwork, but fine.",
  "M|And what worries you most about all this?",
  "F|Telling the species apart, without a doubt. Half the bumblebees in a park are two species that differ by a band of hair, and I can't do it at two metres with a bee in motion.",
  "M|That's exactly my fear too. If we get the species wrong the whole data set is worthless - the numbers would still add up, but they'd mean nothing.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, what do we write down besides the bees?",
  "M|Air temperature, surely. Bees hardly fly below about thirteen degrees, so a cold morning would look like an empty park.",
  "F|Yes, that has to go in - a pocket thermometer costs almost nothing. What about the amount of cloud? The national form had a box for it.",
  "M|And everybody filled it in differently. One person's light cloud is another person's overcast. It's too much of a judgement, and we'd never be able to defend it. Leave it out.",
  "F|Fair. Then the other thing we must record is the names of the flowers in bloom - which plants are actually being visited. Without that we can't say anything useful at all.",
  "M|Definitely. Should we measure the height of the plants as well?",
  "F|Why? It tells us nothing about bees. And before you suggest it - no, we are not counting the other insects too. Hoverflies would double the work and that's somebody else's project.",
  "M|All right. So, jobs before the first count.",
  "F|The parks. Even with the standing agreement, we need it in writing for the ethics form, so I'll write to the parks department this afternoon.",
  "M|Good. And given what we just said about species, I'll make an identification chart - the six commonest bees, photographs, side by side, laminated so it survives the rain. We each carry one.",
  "F|Perfect. What about the tally app? I downloaded it.",
  "M|Honestly, paper. You can't see a phone screen in bright sun and you can't hold it and a chart at once. Paper and a pencil.",
  "F|Agreed. And I did ask Doctor Karimova about a training session, but she's abroad until October, so that can't happen before we start. She has offered to check our photographs afterwards, which is nearly as good.",
  "M|And we don't need to borrow a camera - our phones are better than the department's old one anyway. Right: you write to the parks, I make the chart, and we start on the fourteenth.",
  "F|The fourteenth it is.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of map projections. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we discussed how the size of the earth was first measured - by Eratosthenes, in Egypt, more than two thousand years ago, using shadows and a great deal of nerve. Today I want to look at the problem that measurement creates: how do you draw a round earth on a flat sheet of paper?",
  "F|The first serious attempt we still have belongs to Ptolemy, working in Alexandria around one hundred and fifty AD. Ptolemy did two things that mattered. He listed the coordinates of some eight thousand places, and he set the known world on a curved grid of latitude and longitude lines, so that the map could be rebuilt by anyone who had the numbers. That grid is the ancestor of every map you have ever used.",
  "F|But Ptolemy could not solve the underlying difficulty, and neither can anyone else, because it is a matter of geometry rather than skill. A sphere cannot be flattened without distortion. Peel an orange and try to press the peel flat: it tears, or it stretches, and there is no third option. So every projection - and there are several thousand of them - is a choice about what to sacrifice. You may keep shapes correct, or areas correct, or distances correct along certain lines, but you can never keep all three.",
  "F|The most famous choice was made by Gerardus Mercator in fifteen sixty-nine. Mercator was not trying to draw a beautiful world; he was solving a problem in navigation. On his map, a course of constant compass bearing appears as a perfectly straight line, so a sailor could rule a line between two ports, read off the angle, and hold that heading for weeks. It made ocean voyages measurably safer, and for that reason it is still printed on marine charts today. The cost is well known. To keep the angles true, Mercator had to stretch the map more and more as it went north and south, so that land far from the equator looks enormously too big. Greenland is the usual example.",
  "F|Other projections were built for other jobs. In seventeen seventy-two Johann Lambert published a family of them, including a cone-shaped projection which is extremely accurate across a narrow band of latitude and hopeless outside it. That suited large countries in the middle latitudes, and it remains the standard for the charts used in aviation, as well as for many national surveys.",
  "F|By the twentieth century the argument had turned from sailing to fairness. In nineteen sixty-three the American geographer Arthur Robinson took a different route entirely: instead of getting one property exactly right, he designed a compromise - a map that is slightly wrong everywhere and badly wrong nowhere, chosen because it simply looked right to the eye. It hung on classroom walls for a quarter of a century.",
  "F|Then, in the nineteen seventies, came the loudest row in the history of cartography. Equal-area projections keep area correct, at the price of squashing and stretching the shapes badly, and the best known of them was promoted as a political corrective - its supporters argued that the familiar map made the wealthy northern countries look far more important than they are. Aid agencies adopted it; cartographers complained that the shapes were an insult; and the quarrel went on for twenty years.",
  "F|The compromise line eventually won. In nineteen ninety-eight the Robinson map was itself replaced by the Winkel Tripel, a projection from nineteen twenty-one which is noticeably more accurate near the poles, and that is the world map most of you were taught from.",
  "F|And now, the screen. It is a small irony that online maps have gone straight back to Mercator, in a version usually called web Mercator, for a very practical reason: when you zoom in on a street corner, the shapes stay true and the angles are right, which is what a driver or a walker needs. Zoom out, though, and the old distortion is back - on a world view, Greenland can look as large as Africa, which is roughly fourteen times its actual size. Some services now handle this by switching to a globe as soon as the user zooms right out, which is, when you think about it, an admission of defeat after four hundred and fifty years.",
  "F|Next week we turn to the survey instruments that supplied the numbers.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset20-s1.wav" $s1
Render "pset20-s2.wav" $s2
Render "pset20-s3.wav" $s3
Render "pset20-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
