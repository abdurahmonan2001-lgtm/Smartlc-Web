# Generates the four Mock Test 1 listening recordings with Windows TTS.
# Lines prefixed "F|" use the female voice, "M|" the male voice, and
# "P|<seconds>" inserts silence (the question-preview pauses of the real
# exam). Announcer conventions follow the post-2020 format: "Part" naming,
# no worked example, mid-part breaks in Parts 1-3, none in Part 4.
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
  "M|Part one. You will hear a woman phoning a sports centre about swimming lessons. First, you have some time to look at questions one to five.",
  "P|6",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good morning, Northside Sports Centre. How can I help you?",
  "F|Oh, hello. I hope I've got the right number - is this where I can book swimming lessons?",
  "M|It certainly is. All our courses run here at the centre. Are you calling for yourself, or for a child?",
  "F|For myself, actually. I'm a little embarrassed to say I never learned to swim properly, and my doctor keeps telling me it's the best exercise there is.",
  "M|Please don't be embarrassed - about half the people on our adult courses are complete newcomers to the water. Let me take a few details down. Can I have your family name first?",
  "F|Yes, it's Salimova. That's S, A, L, I, M, O, V, A. Salimova.",
  "M|S, A, L, I, M, O, V, A. Lovely, I've got that. And which level would you like? We run beginner, intermediate and advanced groups.",
  "F|Well, as I say, I've never really swum before, so it would have to be the beginner class, please.",
  "M|Good choice. The beginner group is very friendly, and the teacher has been coaching adults for over ten years. Now, one important thing about the day. The beginner group used to meet on Thursdays, and our old leaflets still say so, but from this month the classes take place every Friday evening instead.",
  "F|Every Friday - that actually suits me better, because on Thursdays I usually work late. And what time do they start?",
  "M|The intermediate group goes in at six, but your lessons start at seven o'clock sharp. The pool gate closes once the class begins, so please arrive a little earlier - ten minutes is plenty.",
  "F|Seven o'clock, and arrive early. Understood. And how long does the whole course last? A friend of mine did a course somewhere that was only eight weeks, and she said it wasn't nearly enough.",
  "M|Ours is longer than that. The full course lasts for twelve weeks, one lesson a week, and most people are swimming confidently by the end.",
  "F|Twelve weeks sounds much more sensible.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "F|Great. Now the important question - how much does it all cost?",
  "M|The advanced squad pays one hundred and ten thousand, but the course you want, the beginner one, is ninety thousand som per month.",
  "F|Ninety thousand a month - that's less than I expected, to be honest. And how do I pay? Can I just bring the money along to the first lesson?",
  "M|Ah, I'm glad you asked, because this catches people out. We can't accept cash at the desk any more - the centre changed its system in the spring - so payment must be made by card. Any bank card is fine.",
  "F|By card, no problem, I hardly ever carry cash anyway. Do I need to bring anything with me? I don't actually own any proper swimming things yet.",
  "M|The centre provides everything for the lessons themselves - floats, kickboards, all the equipment - but students must bring their own towel. We stopped lending towels out a few years ago and never went back to it.",
  "F|My own towel, easy enough. And is there somewhere to leave my things? I'd rather not leave my bag lying on a bench by the pool.",
  "M|No need for that. If you don't want to carry your things around, a locker can be rented at the front desk for a small fee, and you keep the key with you for the whole evening.",
  "F|Perfect, I'll do that. Is there anything else I should know before the first lesson?",
  "M|Just one more thing. For your membership form, please bring one small photo with you to the first lesson - the kind you would use for a passport. We attach it to your card there and then.",
  "F|One small photo. Got it. You've been really helpful - thank you so much!",
  "M|You're very welcome. See you on Friday. Goodbye.",
  "F|Goodbye.",
  "M|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear a guide welcoming visitors to the new Riverside Library. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning everyone, and a very warm welcome to the new Riverside Library. I've worked here since the old building closed, so nobody is happier than I am to see readers walking in again. Before we walk around, let me deal with the two questions people always ask first: what does everything cost, and what has actually changed this year?",
  "F|Money first, and I'll be honest with you - most of our services do carry a small charge, because a building like this has to pay for itself somehow. Printing, for example, costs two hundred som a page. And reserving books online needs a paid membership card - the free accounts can search the catalogue, but they can't reserve.",
  "F|There is good news, though, and it's the thing I always tell families. Joining the library is completely free for anyone under eighteen. No charge at all, right up to their eighteenth birthday.",
  "F|Our little recording studio downstairs is very popular with students who make podcasts. Members can certainly book it, but I'm afraid it isn't free. There is a small hourly fee, which goes towards the microphones and the maintenance.",
  "F|And then summer. From June to August we run concerts, poetry readings and family evenings in the garden behind the building, and yes, entry to all of those summer events is free. You don't even need to be a member. Just turn up.",
  "F|Now, what has changed this year? Let me clear a few rumours away. People ask about opening hours - there was talk that we would open on Sundays. No. The hours stay exactly the same as last year, six days a week. The cafe? People keep hoping. Same menu, I'm afraid, same three kinds of cake, same excellent coffee.",
  "F|Two things really are new this year, though. First, the borrowing limit. Until last year members could take eight books at a time. From January, you may borrow up to ten. And second - you will probably hear it before you see it - downstairs we've built a brand new story corner for children, with cushions, puppets, and a little stage for storytelling. Nothing like it existed in the old building.",
  "F|Oh, and one small practical point about our daily tour. It usually leaves at ten sharp, every day of the week. Only for today, because of this opening event, we'll begin at half past ten instead - so a little later than usual. Everything is back to normal tomorrow.",
  "F|Before we set off, please look at the plan of the ground floor, and at questions fifteen to twenty.",
  "P|8",
  "F|Right, let's walk through the building together, and do stop me if I go too fast. We're standing at the main entrance, and the information desk is directly in front of you - that's where you go for cards and questions.",
  "F|As you come in, look to your right. The large room beside the information desk, in the front corner, is the children's section. That's where you'll find the new story corner I mentioned, and on Saturday mornings it is gloriously noisy in there.",
  "F|From there, let your eyes travel to the far side of the building. Right at the back, in the left-hand corner, is the computer room. We put it as far from the entrance as possible, quite deliberately, to keep it quiet.",
  "F|Back at this end, on your left, just past the cafe, there's a comfortable room where we keep all the daily papers and the magazines. That's the newspaper corner. Some of our older readers are in there by nine every morning - coffee in one hand, newspaper in the other.",
  "F|Now walk with me towards the middle of the building. You see the staircase ahead of you. The small room tucked in right beside it, on its far side, is the recording studio I mentioned earlier. It's soundproofed, which is why it had to go in the middle, away from the windows.",
  "F|If you carry on straight past the stairs to the back wall, the room directly ahead of you, in the centre, leads out to the garden. We simply call it the garden door, and in summer it stays open all day, so you can take your book outside.",
  "F|And finally, the room I'm proudest of in the whole building. In the back corner on the right, with the tall windows over the river, is the reading hall. The morning light in there is honestly wonderful. Right - enough from me. Let's begin the tour properly.",
  "F|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two students, Aziz and Malika, planning a class presentation about recycling. First, you have some time to look at questions twenty-one to twenty-four.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-four.",
  "M|OK Malika, we've only got until the end of lunch, so let's plan this properly. First things first - how long does our presentation actually have to be? I had ten minutes written down in my notes.",
  "F|That was last term, Aziz - ten minutes was for the science fair talks. And somebody in our group was saying it's twenty now, but that's just a rumour. The teacher told me herself yesterday that it must last fifteen minutes. She was quite firm about it.",
  "M|Fifteen, fine, I'll change my notes. Now, the topic. We said recycling in general, but that's far too broad for one talk. What should we actually focus on? My first thought was paper, because the school already collects it, so we'd have real numbers to use.",
  "F|Mmm, I did think about paper too. The trouble is that everyone will choose paper, for exactly that reason - we'd be the fourth pair saying the same things. And glass, I don't know, glass just seems a bit boring to me. It gets melted, it gets remade, end of story. I think we should focus on plastic. There's much more to say about it - the different types, why some of it can't be recycled at all, what ends up in the river.",
  "M|Agreed, plastic it is. It's the one people actually argue about. Now, the survey we're planning for the other classes - I keep going back and forth about it. Are you at all worried the questions are too long? I read somewhere that people give up after ten questions.",
  "F|Not really, to be honest. Ours only has eight, and they're mostly tick-boxes, so it takes two minutes at most. No, my main worry is a different one - that too few people will answer it at all. Students always ignore surveys. Remember the canteen survey last year? Eleven answers from the whole school.",
  "M|Eleven, yes, that was embarrassing. True. We'll push it in the group chat, and maybe ask the form teachers to give people five minutes in class. And one more date I need to write down - when do the slides have to be handed in? Tuesday? I've got Tuesday in my head for some reason.",
  "F|Tuesday is the biology test - that's probably why. No, we have a bit more time than that. The teacher wants the slides by Thursday. Though honestly, I'd like us to finish them on Wednesday ourselves, so we have a whole day spare for checking.",
  "M|Sensible. Thursday for her, Wednesday for us.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-five to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-five to thirty.",
  "M|Good. Let's divide up the jobs, then, and write it all down so nobody forgets anything. Who writes the survey questions? I don't mind drafting them if you'd rather not.",
  "F|Actually - no offence, Aziz - I'll design the survey questions myself. I enjoy that kind of thing, and we covered questionnaires in maths club, so I know about not asking leading questions.",
  "M|None taken, it's all yours. Then I'll take care of producing the posters - the ones advertising the survey and the talk. My cousin works at a print shop, so we can get proper colour printing for nothing.",
  "F|Perfect, because that's exactly the sort of thing I'm hopeless at. Now, the biology teacher. We're supposed to interview her about what the school does with its waste, and I'll be honest, I'm a bit nervous to go and see her alone. She's lovely, but she asks such quick questions.",
  "M|Let's interview her together then - it'll be easier with two of us, one asking and one writing things down. We can catch her on Monday after her last lesson.",
  "F|Deal. And once the survey results come in, I'll turn them into the charts as well, since I'm making the survey anyway - I'll already have everything in the spreadsheet. Unless you desperately want to?",
  "M|No, no, spreadsheets and I are not friends. But in exchange, I'll write the final section - the conclusion, with our recommendations. I've already got some ideas for it. Bins in every classroom, that kind of thing.",
  "F|That's fair. You write better endings than I do anyway - mine just stop. And the timing? Fifteen minutes is strict. She said she'll actually cut people off this time.",
  "M|Then we can't just hope for the best. We'll practise the timing together the evening before - both of us, with a stopwatch, a full run-through, twice if we have to.",
  "F|Perfect. You know, I think we actually have a plan. That must be a first.",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of tea. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Today I want to trace the long journey of the world's most popular drink after water. Tea. It's a good subject for this course, because the story of tea touches almost everything we've discussed this term - trade, technology, fashion, and the sheer power of everyday habit. Around two billion cups of it are drunk every single day, and yet most of the people drinking them know almost nothing about how it reached their table.",
  "M|Tea begins in ancient China, and the written record there takes it back well over two thousand years. According to legend, an emperor was boiling his drinking water outdoors when a few leaves drifted down from a wild tea tree into the pot, and he found the result strangely refreshing. It's a charming story, and almost certainly untrue, but it preserves an important detail, because what's often forgotten is that for centuries nobody drank tea for pleasure. Tea was first drunk as a kind of medicine - a bitter tonic, prescribed for tiredness and poor digestion, and taken in careful doses rather than by the cup. Early Chinese medical writers list it alongside herbs, not alongside foods.",
  "M|As tea spread across China itself, a practical problem appeared, and it's the same problem that shapes so much of trade history - transport. Loose leaves are light, but they're bulky, they crumble, and they spoil quickly in damp air; carrying them for weeks by horse over mountain roads was hopeless. So early traders pressed the tea leaves into hard bricks - dense, dry blocks which could survive months on the road without losing their flavour. A brick of tea was compact, it was durable, and it had a known value, which explains the strangest fact in today's lecture: in some border regions, tea bricks were sometimes even used as money. You could pay your taxes with them.",
  "M|Europeans came to tea remarkably late - more than a thousand years after it had become an everyday drink in the East. Tea reached Europe in the seventeenth century, brought first by Dutch merchants and, a little later, by the English, whose trading companies would eventually dominate the whole business. The timing matters, because this is exactly the period when coffee and chocolate also arrived, and the three new drinks competed with one another in the fashionable cities of Europe.",
  "M|At first, tea was fabulously expensive - a luxury for the very rich, drunk from tiny porcelain cups in tiny quantities. A pound of tea could cost more than a servant earned in a year, and people behaved accordingly. In wealthy houses, tea was kept in a locked box, and the lady of the house herself carried the key at her waist; the servants were simply not trusted with anything so valuable. Serving tea to guests was a performance of wealth as much as an act of hospitality.",
  "M|Prices fell steadily through the eighteenth century, and then came the great acceleration. As demand exploded in the nineteenth century, speed became money, because the first cargo home each season sold at the highest prices. So merchants built fast, slender sailing ships known as clippers, which raced each other halfway around the world, from China to London, with the new season's harvest. Newspapers reported their positions, the public placed bets, and the fastest of these vessels could complete the voyage in under a hundred days - astonishing for the age of sail.",
  "M|The next revolution in the story happened not in China and not in Britain, but in America - and it happened entirely by accident. Around the beginning of the last century, a New York merchant began sending his customers small samples of tea, and to make those samples look elegant he packed them in small silk bags, sewn by hand. His customers, misunderstanding what the bags were for, dropped the whole bag into hot water - and found that it worked rather well. The leaves stayed in, the flavour came out, and there was nothing to clean afterwards. The merchant took the hint, and the tea bag was born.",
  "M|And today? Tea is now grown in more than sixty countries, but production is still dominated by the region where the story began. The world's largest producer of tea is China, followed by India and Kenya - and between them, those three countries grow well over half of everything the world drinks.",
  "M|Let me finish with the question students ask most often, usually in the break. Green tea and black tea - surely they come from different plants? They do not. Green tea and black tea come from the very same plant. The difference between them is not botanical at all; it happens after picking, and it is caused by oxidation of the leaves. For black tea, the picked leaves are rolled and left exposed to the air, where they slowly darken - black tea is fully oxidised. For green tea, the leaves are heated almost immediately, which stops the process, so green tea is not. Same plant, different chemistry. Next week we'll ask the same questions about coffee.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock1-s1.wav" $s1
Render "mock1-s2.wav" $s2
Render "mock1-s3.wav" $s3
Render "mock1-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
