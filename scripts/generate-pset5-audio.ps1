# Generates the four Practice Set 5 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning an arts centre to sign up for a weekend photography course. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Fairview Arts Centre, good afternoon. How can I help?",
  "F|Oh, hello. I'm ringing about the weekend photography course - I saw it on the noticeboard in your cafe. Are there still places?",
  "M|The photography course, let me have a look... yes, you're in luck, there are a few places left. It runs over two days, a Saturday and a Sunday, and we hold it once a month. Shall I book you on?",
  "F|Yes, please.",
  "M|Then I'll need a few details. Can I take your name first?",
  "F|It's Laylo Nazarova.",
  "M|Could you spell the surname for me?",
  "F|Of course. It's N, A, Z, A, R, O, V, A. Nazarova.",
  "M|Lovely, thank you. Now, we run the course at two levels. The beginners group is for people who have never really used a camera at all. Would that be you?",
  "F|Not quite. I've had a camera for about a year and I know the basic controls - I just never get the pictures I'm hoping for.",
  "M|Then the beginners group would bore you, honestly - and in any case it's already full this month. I'll put you in the intermediate group. That's exactly for people with a little experience.",
  "F|The intermediate group. That sounds right.",
  "M|Now, dates. The next course with places starts on Saturday the seventh of March... no, hold on, I do apologise - the seventh is the landscape workshop. Yours starts on Saturday the fourteenth of March.",
  "F|Saturday the fourteenth. Fine.",
  "M|And it carries on the next day, Sunday the fifteenth. Both days run from ten in the morning until four in the afternoon. And you'll be in very good hands - the tutor is a professional wildlife photographer. He teaches for us twice a year.",
  "F|Wonderful. And where in the building is it held?",
  "M|Normally we'd use the Lake Room, down by the entrance, but that's being repainted at the moment. So your course will be in the Garden Room instead. That's up on the top floor of the centre - the light is much better up there anyway, so people usually prefer it.",
  "F|The Garden Room, top floor. And how much does the course cost?",
  "M|It was five hundred thousand som when we first advertised it, but we've just brought in a spring discount, so you'll pay four hundred and fifty. And that includes all the printing materials - paper, ink, everything.",
  "F|Four hundred and fifty thousand. Do you need a deposit from me now?",
  "M|No, no deposit. You simply pay the full amount on the first morning, at the desk.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|And how many people will there be? I don't want to be lost in a crowd.",
  "M|You won't be. We used to take twelve, but people said they didn't get enough individual attention, so the class size is now a maximum of ten students.",
  "F|Even better. What do I need to bring with me?",
  "M|Your own camera, obviously. And do bring a spare battery - we're outdoors a fair amount, and there's nowhere to charge anything once we leave the building.",
  "F|A spare battery, right. Should I bring a tripod? I don't own one.",
  "M|No need at all - tripods are provided by the centre. But there is one thing people always forget. On the Sunday we spend the afternoon walking around the lake, and in March that path is extremely muddy. So wear strong boots. Trainers will be ruined, I promise you.",
  "F|Boots. I'll remember.",
  "M|Oh, and one thing that might please you. Do you have a library card, by any chance? We run a scheme with the city libraries - card holders get ten per cent off the course fee.",
  "F|I do, actually. I'll bring it along.",
  "M|Do. The discount comes off when you pay. Right - the last thing is your confirmation. We used to telephone people, but nobody answers their phone these days, so everything goes out by email now. Could I take your address?",
  "F|Of course, it's laylo, dot, n, at silkmail, dot, com.",
  "M|Perfect. The confirmation will be with you by email this evening, and we'll see you on the fourteenth.",
  "F|Thank you so much. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a presenter at Brookfield Community Radio showing a group of visitors around the station. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome to Brookfield Community Radio. Before we walk round, let me tell you a little about who we are.",
  "F|People make all sorts of guesses about how the station began. Because we take students on placement, many assume we grew out of the journalism course at the college - we didn't. Others have heard that two local journalists founded us, and it's true that a pair of reporters from the town paper joined us early on and taught us a great deal. But the station itself actually grew out of something much smaller: the little studio that used to broadcast music and messages to patients at the hospital. When the hospital moved to its new site, the volunteers decided the whole town deserved a station, and Brookfield Radio was born.",
  "F|Now, money - the question everyone is too polite to ask. We do carry a small amount of advertising from local shops, but honestly it barely covers the electricity. And the city council was generous when we moved into this building - they paid for the rewiring - but they give us nothing towards the day-to-day running. What actually keeps us on air is our listeners: over four hundred people give us a small amount every month, and those regular gifts pay for almost everything you'll see today.",
  "F|We have about sixty volunteers, and some of you may be thinking of joining them. I should manage your expectations. Newcomers always imagine they'll be reading the news in week one, or interviewing the mayor. In fact, everybody - and I do mean everybody, including me, twenty years ago - starts in the same place: down in the basement, sorting and cataloguing the music collection. It sounds dull; it's actually the best training there is, because you learn what the station owns and how the playout system works.",
  "F|And what am I proudest of? People often mention our podcast about the history of the town, which has listeners as far away as Canada. The young musicians' competition we ran last summer drew our biggest ever audience for a single evening. But for me, the station proved what it was for two winters ago, during the floods, when the power was out across half the district and we stayed on air all night, every night, reading out road closures and shelter addresses. That week, I think, was our finest hour.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right, let me take you round, room by room.",
  "F|We'll start in Studio One, the main broadcast studio, straight ahead of you. When we rebuilt it, the volunteers voted on what to call it, and it now carries the name of the man who started the station all those years ago at the hospital - he was, I'm glad to say, here to unveil the sign himself.",
  "F|Next door is Studio Two, where we record interviews and drama. Everything in that room - the desk, the microphones, the screens - was bought with the money from a national community-radio prize we won three years ago. We spent every penny of the award in that one room, and you can hear the difference.",
  "F|Across the corridor is the newsroom. It's a squeeze in there, frankly - six desks for what is now our busiest team - so I'm delighted to say the builders arrive in January: by this time next year the newsroom will be twice the size, taking in the old office next to it.",
  "F|Downstairs is the record library, the basement I mentioned - forty thousand discs, some of them rarities you won't find anywhere else in the region. It isn't just for us, by the way: it's open to the public every Saturday, and collectors come from all over to spend the day there.",
  "F|Beside it is the training room, where our volunteers learn the desk before we let them anywhere near a live microphone. It doesn't look like it now, but that room was originally the caretaker's flat, back when this building was the town's telephone exchange - you can still see his fireplace behind the equipment rack.",
  "F|And finally the performance space, our small live-music venue. When it was built, the acoustic engineers rather showed off: it is soundproofed to a standard you'd normally only find in a big city concert studio. A band can play at full volume in there while we broadcast the news next door, and not a whisper gets through.",
  "F|Right - follow me, and mind the stairs.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two sport-science students, Sardor and Kamila, planning a study of warm-up routines. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Kamila, the proposal form. The first box asks why we chose the topic.",
  "F|Ha. Do we tell the truth?",
  "M|Which is what? Doctor Aliyeva's lecture on injury prevention? That's what half the class will write.",
  "F|But it wouldn't be honest - the lecture came after we'd already decided. And it wasn't that magazine article you sent me either, the one about footballers' routines. It was my ankle, Sardor. I skipped my warm-up before the regional trials, tore a ligament, and spent six weeks on crutches wondering whether five minutes of preparation would have saved me.",
  "M|That's what we write, then. It's a better story anyway. Now, the literature review. We read, what, a dozen papers?",
  "F|At least. And they weren't too short, whatever you said at first - most of the warm-up sessions they tested were a decent length. And they covered plenty of sports, team games and individual events alike. My complaint is different: almost every single study looked at professional athletes. Olympic sprinters, premier-league squads.",
  "M|Agreed - that's the real gap. Nobody has looked properly at ordinary people who train twice a week, and results from professionals just don't transfer. Let's make that the justification. Which brings us to participants. I still think the athletics club would come.",
  "F|They'd come, but they're the same problem again - they train seriously five times a week. And the tutor warned me off using the first-years from our own course; she says testing your own classmates causes all sorts of bias. No - we put posters up in the university gym. The people who use the gym are exactly the ordinary exercisers we're talking about.",
  "M|Gym users it is. Now, what do we actually measure? I originally wanted ankle flexibility, for obvious reasons.",
  "F|And we can note it down as an extra, but flexibility is slow to change and hard to measure reliably. Heart-rate recovery has the same problem - too many things affect it.",
  "M|So we time them. A thirty-metre sprint after each type of warm-up. Sprint times are the main measurement - simple, quick and objective.",
  "F|Agreed. Now, I saw the tutor on Tuesday, and she was very firm about one thing. She doesn't care what time of day we test people, and she said on no account should we pay anyone - apparently that needs a whole extra approval. But she insists on a control group. One group of participants has to do no warm-up at all, or we'll have nothing to compare against.",
  "M|A no-warm-up group. Fine, though it makes recruitment harder - we'll need more people. And that's what actually worries me, to be honest. Not finding people at the start - keeping them. Three visits over three weeks... people will come once and vanish.",
  "F|That's my biggest fear too. If we lose a third of them before the final session, the whole design collapses. We should send reminder messages the night before each session.",
  "M|Good idea. Let's do that.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Right - which warm-ups do we actually compare? The bike is the classic one, ten minutes of gentle cycling.",
  "M|The classic, but the gym only has two bikes free at peak times, and we'd need six people warming up at once. It's out, practically speaking.",
  "F|Then I vote for dynamic stretching - lunges, leg swings, movement the whole time. That's the routine every recent paper recommends.",
  "M|Yes, that has to be in. And logically the thing to test it against is the old-fashioned kind - static stretching, where you hold each position for thirty seconds. Half the people in the gym still do it, and half the coaches now say it slows you down. Dynamic against static - that's a real question.",
  "F|Perfect. What about a short jog as a third routine?",
  "M|With the control group as well, that's four conditions - too many for thirty people. The jog goes. And before you say it: no skipping. Asking beginners to skip with a rope at speed is exactly how we'd cause the injuries we're studying.",
  "F|Ha, fair enough. So, two routines plus the control. Now - jobs for this week, before the trial can start.",
  "M|The sports hall. Exam season is coming and the hall gets booked solid, so reserving it can't wait - I'll do it tomorrow morning.",
  "F|And I'll start the ethics application. The office told me approval takes three full weeks, so if we don't send the form now, the whole timetable slips.",
  "M|What about the questionnaire - the one about their exercise history?",
  "F|Later. We only hand it out at the first session, so we can write it after the pilot. And don't buy stopwatches, whatever you do - the department is lending us the electronic timing gates.",
  "M|Which also means we don't need to train up a second timekeeper - the gates record everything themselves. Right. You do ethics, I book the hall, and we meet Thursday.",
  "F|Thursday it is.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of kites. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we looked at the history of the balloon. Today I want to go much further back, to the oldest flying machine of all: the kite.",
  "F|The kite was invented in China, and it is genuinely ancient - well over two thousand years old. The earliest Chinese kites were built on a light frame of bamboo, and the frame was covered with silk, which made them beautiful, strong and extremely expensive. That changed when paper became cheap enough to waste: paper replaced silk as the covering, and the kite stopped being a luxury and became something ordinary families could make at home.",
  "F|But the early history of the kite is not really a story about toys - it is a story about armies. There is a famous account of a Chinese general whose soldiers planned to break into an enemy city by digging underground. He flew a kite over the city wall, quietly measured how much line he had let out, and used that figure to calculate the length of the tunnel his men would have to dig. Kites were also a signalling technology: their colours and movements were used to send signals between military camps, faster than any messenger on horseback.",
  "F|From China the kite travelled along the trade routes, first to Korea and Japan, then across the rest of Asia, gathering new uses as it went. In Japan, kites did farm work: farmers flew them over their fields to frighten away the birds that would otherwise have eaten the young crop. Europe met the kite surprisingly late - it arrived in the sixteenth century, brought home by sailors returning from Asian ports. And Europeans, it must be said, were unimpressed. For roughly two hundred years they saw no serious use for the kite whatsoever and regarded it as nothing more than a toy for children.",
  "F|That opinion was demolished in the summer of seventeen fifty-two by Benjamin Franklin. In his famous experiment, Franklin flew a kite into a thunderstorm with a metal key tied to the line. When sparks jumped from the key, he had his proof that lightning is electrical - the same force scientists had been making in laboratories. I should say, as I say every year: it was astonishingly dangerous, and the next man who tried it was killed. But it turned the kite, overnight, into an instrument of science.",
  "F|Scientists took the hint. Through the nineteenth century, the new weather services of Europe and America used kites as their eyes in the sky, sending up recording instruments - thermometers, pressure gauges - on long trains of kites. The best of these flights carried instruments more than a mile above the ground, far higher than any tower, and gave forecasters their first regular measurements of the upper air. The kite itself was improving too. In eighteen ninety-three, the Australian inventor Lawrence Hargrave produced the box kite, a cellular design so stable and so powerful that four of them once lifted Hargrave himself clear off the beach. His box kite mattered far beyond the beach, because its wing structure directly influenced the builders of the first aircraft - several early flying machines were, in effect, box kites with engines.",
  "F|The kite had one more great scientific moment. In December nineteen oh one, the engineer Guglielmo Marconi was on the coast of Newfoundland, trying to receive the first radio signal ever sent across the Atlantic. His receiving equipment needed a wire raised hundreds of metres into the sky, and his masts had blown down in a storm. So he turned to a kite: it was a kite that lifted the aerial into the winter gale, and with it Marconi heard the three faint clicks that opened the age of global communication.",
  "F|In the twentieth century powered flight took over the sky, but the kite kept working quietly at the edges. The Wright brothers, remember, tested their wing designs with kites for years before they risked a pilot. And today the kite is having a remarkable second life. The most visible example is kite surfing, now one of the fastest growing water sports in the world, in which the rider stands on a board and is pulled across the water by a kite many times larger than the rider. Engineers have had the same idea on a much larger scale: several shipping companies are testing giant computer-steered kites that fly ahead of cargo ships and pull them along, cutting the amount of fuel the engines burn.",
  "F|Two thousand years after a general measured his tunnel, the kite is still doing serious work. Next week, we move on to the glider.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset5-s1.wav" $s1
Render "pset5-s2.wav" $s2
Render "pset5-s3.wav" $s3
Render "pset5-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
