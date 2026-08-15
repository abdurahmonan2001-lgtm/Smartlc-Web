# Generates the four Upper-Inter Set 6 listening recordings with Windows TTS.
# Same conventions as the mocks: "F|"/"M|" pick the voice, "P|<seconds>" is a
# silent question-preview pause; post-2020 announcer format throughout.
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
  "M|Part one. You will hear a man phoning a company that cleans carpets, to arrange a visit to his home. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good morning, Crestwell Carpet Cleaning, Nargiza speaking. How can I help you?",
  "M|Oh, hello. We moved into an older house in the spring, and the carpets really need a proper clean. Could I arrange for someone to come out?",
  "F|Of course. Let me take some details. Could I have your name, please?",
  "M|It's Rustam Ergashev.",
  "F|Would you mind spelling the surname for me?",
  "M|Not at all. It's E, R, G, A, S, H, E, V. Ergashev.",
  "F|E, R, G, A, S, H, E, V. Thank you. And the address?",
  "M|Twenty-seven Willow Street.",
  "F|Willow Street... is that the street directly opposite the primary school?",
  "M|That's the one. The house with the green gate.",
  "F|Lovely. Now, which rooms would you like cleaned?",
  "M|The living room, definitely - it's the biggest carpet in the house. I did think about the bedroom as well, but that carpet is almost new, so we'll leave it this time. The other one that really needs attention is the hallway - it takes all the dirt from people's shoes.",
  "F|So the living room and the hallway. And do you know what the carpets are made of? We choose our cleaning products to match the fibre.",
  "M|The hallway carpet is some sort of synthetic material, I believe, but the living room one is wool - it belonged to my grandmother, so please be careful with it.",
  "F|Mainly wool, then - I'll put the team down to use the gentle chemicals on everything, to be safe.",
  "M|Thank you. One more thing I should mention: there's a large stain near the window in the living room. My son knocked a cup off the table last month.",
  "F|Was it tea?",
  "M|No - coffee, unfortunately, and it was very dark. It's dried right into the carpet.",
  "F|A coffee stain, near the window. Noted - the team deal with those all the time.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Right, when would suit you? Let me look at the diary. I could book you in for Tuesday morning... oh, no, wait - our big cleaning machine is being serviced on Tuesday, I'm sorry. The first day I can offer you is Friday.",
  "M|Friday is fine - I work from home at the end of the week anyway.",
  "F|Friday it is. We send a team of two cleaners. They could be with you at nine o'clock... actually, no, forgive me - they have a small job on the other side of town first that morning. Let's say half past nine.",
  "M|Half past nine, no problem.",
  "F|The whole job should take about three hours, so they'll be finished by lunchtime.",
  "M|Perfect. And what will it cost?",
  "F|For two rooms it would normally be three hundred thousand som, but we have an autumn offer running this month, so for you it comes to two hundred and fifty thousand - and that includes the stain treatment, so there's no extra charge for the coffee.",
  "M|Two hundred and fifty, that's very reasonable. Oh - there's a small rug in the hall as well. Would that be extra?",
  "F|No, we clean a small rug free of charge - it simply goes through with everything else.",
  "M|Wonderful. Is there anything I should do before Friday?",
  "F|Just one thing: please move any small furniture off the carpets - chairs, side tables, plant stands, that kind of thing. The heavy pieces, like the sofa and the bookcases, the team will shift themselves, so don't strain your back.",
  "M|Move the small furniture, understood. And how do I pay?",
  "F|On the day, by card, once the work is done. We did take cash until last year, but the teams were carrying too much money around town, so I'm afraid it's card only now.",
  "M|By card is easier for me anyway. Thank you very much - Friday at half past nine, then.",
  "F|That's right. Thank you, Mr Ergashev - the team will see you on Friday.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the coordinator of a botanical seed bank talking to visitors at the start of its annual open day. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and a very warm welcome to the Fernleigh Seed Bank. My name is Malika, I'm the coordinator here, and my job today is to make sure you see as much as possible and break as little as possible - I'm joking, of course. Before we set off on the tour, let me tell you a little about who we are and how today will work.",
  "F|People often assume the bank was set up to preserve the seeds of old crop varieties - the vegetables and grains our great-grandparents grew - and we do hold a small collection of those now. Others imagine our main task is supplying seeds to botanical gardens overseas, and yes, small packets do leave here for gardens on every continent. But neither of those is why we exist. The bank was founded twenty years ago with one purpose: to save the seeds of wild plants whose habitats are disappearing - the meadows, heathlands and wetlands that are vanishing year by year. Everything else grew out of that.",
  "F|Now, what makes today different? Not free entry - entry is free every day we open. And it isn't the film about the bank's history either; we screen that at every open day, and it's showing again this afternoon. What's genuinely new is this: at midday, for the first time, our scientists will carry out a germination test in front of visitors, so you can watch seeds that have been asleep for years being woken up. Do not miss it.",
  "F|A practical point before we start. Please don't carry large bags around the collection - the corridors between the cabinets are narrow. Last year we let people leave things in the seminar room, but that's where the film is showing today, so it isn't available. Instead, there are lockers just beside the main entrance - they're free to use, and you set your own code. I wouldn't leave bags in your cars; the car park is a good ten minutes away, and the forecast isn't kind.",
  "F|And finally, people always ask how they can support us. Donations are welcome, naturally, and you can buy young plants raised here on the terrace - every som helps. But the help we need most costs nothing at all: join our wild flower survey. You simply record the wild plants growing near your own home, a few minutes each week, and send us the list. Those records tell us which species are declining and where we should collect next - they genuinely guide everything we do.",
  "F|Before we walk round, please look at questions fifteen to twenty.",
  "P|8",
  "F|Right - let me tell you about the rooms you'll see, in the order we visit them.",
  "F|We start in the cleaning room, where seeds are separated from stalks, husks and soil. Our paid staff here is tiny, and I'll be honest: nearly all the work in that room is done by volunteers - retired teachers, students, one former ship's engineer - who come in every week, and without them the bank would simply stop.",
  "F|Next door is the drying room, where seeds lose their moisture slowly, over several weeks. Have a close look at the machines in there - they weren't built for seed banks at all. They were designed for the food industry, for drying herbs on farms, and our engineers adapted them. They've run for fifteen years without complaint.",
  "F|Then comes the heart of the building: the main vault. Behind that steel door the temperature never rises above minus twenty degrees, because cold is what lets a seed sleep safely for decades. You'll view it through the window - we won't be opening the door, or my colleagues will chase us all out.",
  "F|Across the corridor is our library, and it has a story of its own. Three years ago we appealed for help, and the whole room - the shelves, the books, the rare botanical volumes - was funded entirely by donations from the public. Not one som of government money; we're rather proud of that.",
  "F|Beyond the library is the herbarium, where dried, pressed plants are kept on paper sheets. The oldest sheets there are over two hundred years old - they are the oldest things in the entire building, far older than the bank itself, and they let us compare today's plants with their ancestors.",
  "F|And we finish in the tropical seed room, which holds material from our partner banks overseas. So much is arriving now that next year we'll knock through into the store beside it and double the size of the room - the builders start in January.",
  "F|Right - questions at any point, follow me, and mind those narrow corridors.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two engineering students, Aziz and Laylo, who are preparing their solar-powered car for a national competition. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Right, Laylo, let's go through the job list before the workshop closes. First, the thing people keep asking me: why are we building a completely new body shell? Someone told the department it was because of the new regulations.",
  "F|Which is wrong - the rule changes this year only affect the batteries, not the bodywork. And it's nothing to do with the sponsor either; they gave us money, not materials. The truth is less exciting: the old shell got cracked on the trailer coming back from last year's event. One of the straps wore right through the fibreglass. It couldn't be repaired properly, so - new shell.",
  "M|Exactly. Now, the solar panels. I'll admit I was nervous about those.",
  "F|So was I - I was convinced they'd arrive late, but the box turned up right on time. And one cell looked faulty when we unpacked it, there was a mark across the corner, but it tested perfectly. The real problem is the size: the cells are five millimetres wider than the drawing we sent the supplier. They don't follow the curve of the shell, so the whole mounting has to be redesigned.",
  "M|Which is this month's headache. And listen, about the spring test drive - you should put what actually happened in the report, because people are still telling the story wrongly.",
  "F|I know. Half the team thinks I ignored the battery warning light. There was no warning - the light never came on, the logger proves it. And I certainly wasn't driving too fast; the data shows I never went above forty. What actually happened is that I misread the energy display. The screen shows two figures side by side - energy remaining and energy used - and halfway round the circuit I confused one with the other. So I thought we had half a charge left when the pack was nearly empty.",
  "M|And the car stopped a kilometre from the workshop. It's an honest mistake - the display is genuinely confusing, and we've now swapped the two figures round and added colour.",
  "F|Good. Now, weaknesses. The brakes were my big fear all winter, but since the rebuild they're the strongest part of the car, honestly. The steering is still a little heavy at low speed...",
  "M|A little, but it's fine once you're moving - I wouldn't touch it before the race. No, for me the real worry is the battery cooling. On a hot afternoon the pack temperature creeps right up towards its limit.",
  "F|Agreed - that's the one thing that could genuinely end our race. If the pack overheats, the rules say we stop, immediately. Cooling is the weakness, and it gets our remaining budget.",
  "M|Now, the seat. Have you tried it since we glued the padding in?",
  "F|It fits me perfectly.",
  "M|It fits you because you're the smallest driver on the team! When Bekzod gets in, his knees are up against the dashboard. We'll have to alter the mounting so the whole seat slides further back - otherwise our tallest driver simply can't take his turn.",
  "F|Fair enough - taller drivers matter more than my comfort. And did you speak to our tutor yesterday? What was her advice in the end?",
  "M|Not what I expected. She didn't mention money at all, and she doesn't want extra testing either - she thinks we test quite enough. What she kept repeating was: write everything down. Keep a log of every single change we make to the car, however small, because the scrutineers at the competition will ask for the car's full history, and teams have been turned away without one.",
  "F|Then the log starts tonight.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, realistically, what do we finish this week? Not the paint - the sponsor still hasn't sent us the final logo files, and I'm not painting the shell twice.",
  "M|Agreed, the paint waits. The new tyres, though - they arrived yesterday, and fitting them is a morning's work. I'll do it tomorrow.",
  "F|Yes, let's get the tyres on this week, definitely. And the brakes - the new parts are already fitted, they just need a proper test at speed. We've got the track booked for Thursday afternoon.",
  "M|So the brake test happens this week too. Good. The dashboard rewiring, on the other hand - the connector we need is still on order, could be ten days.",
  "F|And the new seat harness hasn't even been delivered, so that's out as well. Fine: tyres and the brake test this week, the rest waits.",
  "M|Now, the list of things to ask our tutor. Not the team uniform - we settled that by a vote last month, remember.",
  "F|And not the inspection timetable either - the organisers published it on the competition website on Monday, and I've already printed it. But transport is a real question. Hiring the covered trailer costs more than the budget line she gave us, so she'll have to approve the difference - we can't sign anything without her.",
  "M|Agreed, transport goes on the list. And the other one, I'd say, is the battery storage rules. The rulebook is genuinely vague about where the batteries have to be kept overnight during the event, and she knows the organisers personally - she can find out in one phone call.",
  "F|Yes - those two, then. The trailer money and the battery rules. The hotel, by the way, is already handled; the faculty office booked our rooms last week.",
  "M|Perfect. Right - I'll open a document tonight, and the famous log begins.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of fireworks. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good afternoon. Tonight, somewhere in the world, a crowd will stand in the dark and watch the sky explode into colour - and nobody will find it strange. Fireworks are so familiar that we forget how old, and how odd, they are. Today I want to trace their story, from a Chinese campfire to the computer-controlled displays of the present day.",
  "M|The story begins before gunpowder existed at all. In ancient China, people discovered that sections of green bamboo, thrown onto a fire, would burst with a tremendously loud crack - the air and sap sealed inside the hollow stems expanded in the heat until the wood exploded. And that noise was not a nuisance; it was the whole point. Loud bangs were believed to frighten away evil spirits, and burning bamboo became part of festivals and new year celebrations - a tradition of protective noise that fireworks have never really lost.",
  "M|The next step came from the alchemists. Sometime before the tenth century, Chinese experimenters mixed charcoal and sulphur with saltpetre - and found, instead of the elixir of life some of them were seeking, a powder that burned with astonishing speed. Packed into tubes of paper and sealed at both ends, the new powder produced a far greater bang than any bamboo stem: these paper tubes were the first true firecrackers, and they were being made in enormous numbers within a century or two.",
  "M|Knowledge of the powder did not stay in China. It travelled westwards along the trade routes, carried by merchants moving between markets, and by the thirteenth century recipes were circulating in the Middle East and in Europe. Much of that interest, it must be said, was military. But not all of it. In Italy, the great trading cities were staging public firework displays by the fourteenth century, and it was Italian makers, over the following centuries, who turned explosion into theatre. Their key invention was the aerial shell - a container launched high into the air from a tube, timed to burst at the very top of its flight and throw burning stars in every direction. The shape of almost every firework you have ever watched is the shape of the Italian shell.",
  "M|Fireworks quickly became the language of power. Rulers across Europe ordered enormous displays to mark coronations, royal weddings and military victories - occasions when the sky itself was made to celebrate - and some courts kept a permanent staff of firework makers, ready for the next great occasion.",
  "M|And yet, for all that spectacle, the colours were poor. For most of their history, fireworks were mainly orange and white - the colours of burning charcoal and hot metal, and little else. The rainbow we take for granted is surprisingly recent. It arrived in the nineteenth century, when chemists discovered that adding metal salts to the burning mixture would paint the flame: compounds of strontium give red, and barium gives green. One colour, though, still defeats the professionals. Blue is the hardest colour to produce, because the copper compounds that create it fall apart at high temperatures - ask any firework maker, and they will tell you that a perfect deep blue remains the prize of the whole profession.",
  "M|Which brings us to the present. The gunpowder in the shells has hardly changed for centuries, but everything around it has. A large modern display is fired by computer, with every shell timed to a fraction of a second and matched to music. And the industry faces new questions. The smoke that drifts across a city after a big display, and the debris that falls into rivers and gardens, have pushed organisers to look for cleaner mixtures. Concern for animals, which can be terrified by the bangs, has produced quiet fireworks for displays near farms and nature reserves. And some cities have begun replacing fireworks altogether with swarms of illuminated drones. The oldest entertainment in the sky, it seems, is still changing - but I suspect the crowds will be standing in the dark, looking up, for a long time yet.",
  "M|That is the end of part four. You now have some time to check your answers.",
  "P|5"
)

Render "upset6-s1.wav" $s1
Render "upset6-s2.wav" $s2
Render "upset6-s3.wav" $s3
Render "upset6-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
