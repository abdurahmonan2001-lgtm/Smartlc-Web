# Generates the four Upper-Inter Set 7 listening recordings with Windows TTS.
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
  "F|Part one. You will hear a man phoning a company that hires out party equipment, to arrange a family celebration. First, you have some time to look at questions one to five.",
  "P|6",
  "F|Now listen carefully and answer questions one to five.",
  "F|Silverbird Party Hire, good morning. How can I help?",
  "M|Oh, hello. We're organising a big family party in August, and a colleague of mine said you supplied everything for his son's wedding. I'd like to arrange something similar, please.",
  "F|Of course. Let me open a booking form. Could I take your name first?",
  "M|Yes, it's Rustam Ergashev.",
  "F|Could you spell the surname for me?",
  "M|Certainly. E, R, G, A, S, H, E, V. Ergashev.",
  "F|E, R, G, A, S, H, E, V. Thank you. And what sort of event is it? Another wedding?",
  "M|No, not a wedding this time. It's my mother's seventieth birthday. The whole family is coming, some of them from abroad, so we want to do it properly.",
  "F|A seventieth birthday, how wonderful. And which date are we talking about?",
  "M|We were hoping for Saturday the sixteenth of August.",
  "F|The sixteenth... I'm sorry, that weekend all our large marquees are already out at a festival. The following Saturday is completely free, though - that's the twenty-third.",
  "M|Let me check the calendar... yes, the twenty-third of August will suit us. Her actual birthday is the twenty-fifth, so that's even closer to the day.",
  "F|Lovely. And where will the party be? We deliver to halls, restaurants, private homes...",
  "M|We did think about hiring a hall, but my mother would much rather stay at home, so it will be in the garden. It's a big garden, plenty of space.",
  "F|A garden party, perfect. Is the ground level? Marquees don't like slopes.",
  "M|Completely level, and it's grass, not paving.",
  "F|Ideal - we can peg straight into grass. And how many guests are you expecting?",
  "M|About seventy-five, once you count all the cousins.",
  "F|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "F|Now listen and answer questions six to ten.",
  "F|Now, for seventy-five people I wouldn't recommend our nine-metre marquee - it would be a squeeze. The twelve-metre one is the right size. It's twelve metres long and six metres wide, and if the weather is hot we can take the side walls out completely.",
  "M|The twelve-metre one, then. And we'll need tables as well. Round ones, if you have them.",
  "F|We do - each round table seats ten people. So for seventy-five guests, seven tables would just about do it.",
  "M|Hmm, seven sounds tight. People bring children at the last minute. Let's say eight tables, to be safe.",
  "F|Eight round tables, noted. Chairs are included in the table price, by the way. Seat covers are extra, if you want them - though most people skip those for a garden party.",
  "M|We'll skip them too. Now, my daughters are determined that there will be dancing. Is that something you can help with?",
  "F|Certainly - we hire out a wooden dance floor. It comes in sections, so it goes down in about an hour, right inside the marquee.",
  "M|Perfect, add the dance floor. And music - my nephew is bringing his own playlist, but we have nothing to play it on. And there will be speeches, of course. There are always speeches.",
  "F|Then you'll want our sound system. That's two large speakers plus a cordless microphone, so the speeches can happen anywhere in the marquee.",
  "M|Exactly what we need. What about lighting? The party will go on after dark.",
  "F|Strings of festoon lights around the roof edge come free of charge with every marquee. They look lovely in the evening.",
  "M|Even better. So when would you deliver everything?",
  "F|We normally deliver the day before - the Friday, in your case. Actually, no - let me check - that Friday we're fully booked with the festival returns. We'd deliver on the Thursday instead, if somebody can be at home.",
  "M|Thursday is fine, my wife works from home. And afterwards?",
  "F|We collect everything the Monday after the party. Now, to hold the booking we ask for a deposit of a quarter of the total price.",
  "M|A quarter up front, understood. And how do I pay?",
  "F|By bank transfer, please - the details are on the booking form, and the balance needs to reach us at least five days before the event.",
  "M|By bank transfer, no problem. Thank you, you've made this very easy.",
  "F|My pleasure. I'll email the form this afternoon - and I hope your mother has a wonderful birthday.",
  "F|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear a member of staff at a science centre telling visitors about its new gallery and exhibits. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good morning, everyone, and welcome to Brightwater Science Centre. My name's Adam, I'm one of the education officers here, and my job this morning is to introduce our brand-new Discovery Gallery before you go in.",
  "M|First, a little background, because people keep asking how we paid for it. It wasn't the city council - they support our schools programme, and we're grateful, but there was no council money in this building. And it wasn't ticket sales either; honestly, tickets barely cover our running costs. The real story is rather moving. A retired engineer called Vera Holden, who visited us with her grandchildren for years, left the centre a very large sum of money in her will, and that gift paid for the entire gallery.",
  "M|Now, about getting in. From July, entry to the Discovery Gallery will be included in the standard ticket, and school groups will be able to book in the usual way. But for its first month, the gallery is open to members only - which is why you are all here today. Do enjoy being ahead of the crowd.",
  "M|A practical tip for those of you with young children. The gallery is quietest first thing, so that's the time to bring little ones if you can. Weekends are busier, of course, but perfectly manageable, and no, you don't need to book a time slot - we tried timed tickets years ago and everybody hated them.",
  "M|And one request before I describe the exhibits. We're not handing out feedback forms today, and we are certainly not asking you for donations - Vera took care of that. The most useful thing you can do costs nothing: tell your friends and neighbours about the gallery. Word of mouth fills this building far better than any advertisement we have ever paid for.",
  "M|Before I let you in, please look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "M|So, what will you find inside? Let me walk you through the six main exhibits, in the order you'll meet them.",
  "M|Just inside the entrance is the earthquake platform. You stand on it, hold the rail, and feel the ground movement of a real recorded earthquake. A word of warning: the floor starts shaking without any warning, and it is surprisingly loud, so some visitors find the first few seconds quite alarming. Do hold the rail.",
  "M|Beyond that is the giant heart. You walk in through one side, squeeze through the chambers, and come out by the main artery, with the heartbeat sound all around you. It wasn't built for us, by the way: it stood for twenty years in a museum in the capital, which closed last year, and we were able to buy it for the new gallery.",
  "M|Next to the heart is the robot arm, which can play noughts and crosses against you and stack wooden blocks - or rather, it will. I have to be honest: the software is misbehaving, and the robot arm is not working at the moment. The engineers promise it will be running by next month, so that's your reason to come back.",
  "M|Across the hall is the weather studio, where you stand in front of a green screen and present tomorrow's forecast, which appears on the monitors exactly as it would on television. It's enormously popular, so each group gets ten minutes and no more - there's a countdown clock on the wall, and when it reaches zero, the next group comes in.",
  "M|Then comes the sound tunnel, a curved corridor where your voice comes back to you changed - stretched, deepened, multiplied. The whole thing was designed and built by engineering students at the university as their final-year project, and I think it's extraordinary.",
  "M|And finally, at the far end, the planetarium dome. We expected it to appeal mainly to children. The surprise has been the grown-ups: it has become especially popular with adult visitors, so much so that we now run evening sessions just for them, with the coffee machine on.",
  "M|Right - that's everything. Members, the Discovery Gallery is yours. Enjoy it.",
  "M|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two nutrition students, Aziz and Laylo, planning a study of their university canteen. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Laylo, before we write the proposal, we should agree on how this canteen idea actually started. Was it your job in that sandwich shop?",
  "F|Everyone assumes that, Aziz, but no - the shop was just a holiday job. What actually got me thinking was that national survey of student eating habits that came out in the spring. The findings were genuinely shocking - half the students surveyed hadn't eaten a single vegetable in the previous two days. I read it and immediately thought of our own canteen. Our tutor did say food was a rich area when we mentioned it, but by then I'd already decided.",
  "M|Fair enough. Now, the research question, because we keep drifting. At one point we said we'd measure how much food gets thrown away, and last week you talked about rating how healthy the menu is.",
  "F|Both too big, and the waste study has been done here twice already. No - what nobody has looked at is why students pick one dish rather than another. What influences the choice at the moment they're standing at the counter. That's our question, agreed?",
  "M|Agreed - the influences on choice, not the menu itself. So, methods. Questionnaires first?",
  "F|Actually I think that's backwards. If we write the questionnaire now, we'll only ask about the influences we can already imagine. Let's spend the first week just watching what students buy - standing near the counter, recording choices. Then the questionnaire can ask about the patterns we actually see.",
  "M|Good - observation first, questionnaire second, and we can always interview the staff later if something needs explaining. Speaking of staff, did you talk to the canteen manager?",
  "F|I did, and she was much friendlier than I expected. I thought she might tell us to stay away at lunchtime, but she said the busy period is exactly when we should come, because that's when the real choosing happens. And she didn't ask to see our results, though I'll send them to her anyway. The one thing she insists on is that we wear something that identifies us - our student cards on lanyards will do - so customers know we're doing research and not just staring at their trays.",
  "M|Lanyards it is. Now, my worry. When we get to the questionnaire stage - people are strange about food. If I ask you what you ate this week, you'll suddenly remember the salad and forget the chips. I think students may not tell us the truth about what they eat - not lying exactly, just improving the story.",
  "F|That's a real problem, and it's exactly why the observation matters: the tills don't improve the story. We can compare what people say with what we actually saw them buy. Right - did you show the tutor our draft proposal?",
  "M|I did. She liked the question, she liked the two-stage design, and she wants one addition: a week-by-week timetable for the whole term. Which weeks we observe, which weeks we hand out questionnaires, when we analyse. She said proposals without a timetable always run late. No budget section needed, since we're not spending anything, and she said our reading list was already long enough.",
  "F|Then let's draft the timetable tonight.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, from the reading we've both done - what do we actually expect to influence choice? The posters, for instance. The canteen has all those healthy-eating posters above the counter.",
  "M|And every study I found says posters like that change almost nothing. People look straight past them. I wouldn't put them anywhere near the top of the list.",
  "F|Agreed, the posters probably do very little. What about the queues? If the salad queue is long, people join the short queue for the fried food.",
  "M|Queue length matters for whether people eat in the canteen at all, but once they're inside, I found no evidence it changes which dish they pick. I'd leave it out. For me the two big ones are price - every single paper mentions price - and where a dish sits on the counter. Things at eye level and near the till get bought far more often.",
  "F|I found exactly the same: price and position, again and again. My cousin swears everyone just copies their friends, but the evidence for that was thin - one small study. So we agree: price and position are our two.",
  "M|Agreed. And if the study confirms it, we should end the report with recommendations. Realistic ones.",
  "F|The obvious one is putting fruit next to the tills - but the manager told me she's already planning that for September, so we can hardly claim it as ours. What about calorie labels on the menus?",
  "M|The evidence on calorie labels is genuinely mixed - some studies show a small effect, others none at all. I wouldn't stake our report on it. And someone in the seminar suggested longer opening hours, but that's a staffing question, way beyond our study. No - the price finding gives us a strong one: they should cut the price of salad. Even a small cut shifted choices in the studies I read.",
  "F|Cheaper salad, definitely. And there was that lovely plate study - people served themselves less and wasted less when the plates were smaller, without even noticing. The canteen's plates are enormous, and smaller ones would cost almost nothing.",
  "M|Cheaper salad and smaller plates - those are our two recommendations. That's a proposal, Laylo. Let's write it up.",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of shorthand writing. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good afternoon. Before recording machines, before typewriters, there was only one way to capture the human voice at the speed of speech, and that was shorthand - systems of strokes and symbols that let a trained hand write as fast as a person can talk. Today I want to trace its history, because it is really a history of who controls the record of what was said.",
  "M|The story begins, by tradition, in ancient Rome. The system's inventor is usually named as Tiro, who worked as Cicero's secretary. Tiro was born a slave and was later freed, and he served the great orator for decades, managing his letters and his library. To keep up with his master's words he devised a set of several thousand symbols, and with them he took down speeches word for word in the Senate - including, famously, the speeches Cicero delivered against the conspirator Catiline. The symbols became known as Tironian notes, and they long outlived both men: for many centuries they remained in use among monks across Europe, who abbreviated their manuscripts with them.",
  "M|Then the trail goes cold. In the Middle Ages, shorthand fell out of use almost entirely, because a script that few could read attracted suspicion, and shorthand became linked with magic and secrecy - a private code, people feared, might hide forbidden knowledge. Interest only returned in England in the sixteenth century, when a physician named Timothy Bright published a new system and dedicated it to the queen. Shorthand then became something of a national enthusiasm, and its most devoted users were found in church: many people used it to copy sermons as they were preached, filling notebooks Sunday after Sunday. A century later, the naval official Samuel Pepys kept his now-celebrated diary in shorthand; it sat unread on a library shelf for generations, and was only decoded in the nineteenth century.",
  "M|The modern era begins in 1837, with a schoolmaster from Bath named Isaac Pitman. Pitman's insight was that English spelling is chaos, and that a writing system should record sounds, not spelling - his symbols capture a word as the ear receives it, not as the dictionary prints it. The system is beautifully economical: thick and thin strokes distinguish related letters, and the position of a symbol above or on the line shows its vowels. Pitman's shorthand travelled the world with the British Empire, and in some countries it is thriving still.",
  "M|Half a century later, in 1888, an Irish emigrant named John Robert Gregg published a rival system. Where Pitman is angular, Gregg flows: it is based on curves taken from ordinary handwriting, the ellipses and gentle slopes of longhand, so the pen rarely leaves the paper. Gregg carried his method to the United States, and it became the standard system in America, taught in schools from coast to coast.",
  "M|Why did millions of people learn these systems? The answer is work. Demand grew with the nineteenth-century growth of offices - correspondence, contracts, minutes, all of it dictated and transcribed. And it is worth pausing on who did that work: shorthand gave many women their first chance of professional employment, a respectable salaried position at a time when most careers were closed to them. The shorthand-and-typing course became a doorway into working life.",
  "M|And today? The dictation machine and then the computer swept most of this world away, but shorthand is not quite dead. In Britain, trainee journalists must still pass an examination at one hundred words per minute - editors insist on it, because a notebook needs no battery and its contents are accepted in court. Courtrooms themselves have moved on: official reporters now use a shorthand machine with a small keyboard, pressing several keys at once to record whole syllables, at speeds no pen can match. And there is one more group who care: historians. A diary kept in symbols nobody else could read is often unguarded, and that makes it a wonderfully honest record of everyday life - which is why, two thousand years after Tiro, people are still learning to read the strokes.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset7-s1.wav" $s1
Render "upset7-s2.wav" $s2
Render "upset7-s3.wav" $s3
Render "upset7-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
