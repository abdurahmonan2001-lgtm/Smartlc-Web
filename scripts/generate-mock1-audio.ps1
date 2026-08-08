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
  "F|Hello. I'd like to sign up for swimming lessons, please.",
  "M|Of course. Can I take your family name first?",
  "F|Yes, it's Salimova. S, A, L, I, M, O, V, A. Salimova.",
  "M|Thank you. And which level would you like? We run beginner, intermediate and advanced groups.",
  "F|I've never really swum before, so the beginner class, please.",
  "M|Good choice. Now, the beginner group used to meet on Thursdays, but from this month the classes take place every Friday evening.",
  "F|Friday is fine. What time do they start?",
  "M|Lessons start at seven o'clock sharp, so please arrive a little earlier.",
  "F|And how long does the whole course last?",
  "M|The full course lasts for twelve weeks. Most people are swimming confidently by the end.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "F|Great. How much does it cost?",
  "M|It's ninety thousand som per month. And I should mention, we can't accept cash at the desk any more, so payment must be made by card.",
  "F|By card, no problem. Do I need to bring anything?",
  "M|We provide everything for the lessons themselves, but students must bring their own towel. And if you don't want to carry your things around, a locker can be rented at the front desk for a small fee.",
  "F|Perfect. Anything else?",
  "M|Just one thing. For your membership form, please bring one small photo with you to the first lesson.",
  "F|A photo. Got it. Thank you so much for your help!",
  "M|You're welcome. See you on Friday.",
  "M|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear a guide welcoming visitors to the new Riverside Library. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning everyone, and welcome to the new Riverside Library. Before we walk around, let me deal with the questions people always ask: what does it cost, and what's new?",
  "F|Most of our services carry a small charge. Printing, for example, costs two hundred som a page, and reserving books online needs a paid membership card. But I'm pleased to say that joining the library is completely free for anyone under eighteen. No charge at all.",
  "F|Our little recording studio downstairs is popular. Members can book it, but I'm afraid it isn't free. There is a small hourly fee.",
  "F|In summer, we run concerts and readings in the garden behind the building, and yes, entry to all of those summer events is free. Just turn up.",
  "F|Now, what has changed this year? People ask about opening hours. They stay exactly the same as last year, six days a week. The café? Same menu, I'm afraid, same excellent coffee.",
  "F|Two things really are new. First, the borrowing limit. Until last year members could take eight books at a time. From January, you may borrow up to ten. And second, downstairs we've built a brand new story corner for children, with cushions, puppets, and a stage for storytelling.",
  "F|Oh, and our daily tour. It usually leaves at ten sharp. Only for today, because of this opening event, we'll begin at half past ten instead.",
  "F|Before we set off, please look at the plan of the ground floor, and at questions fifteen to twenty.",
  "P|8",
  "F|Right, let's walk through the building together. We're standing at the main entrance, and the information desk is directly in front of you.",
  "F|As you come in, look to your right. The large room beside the information desk, in the front corner, is the children's section. That's where you'll find the new story corner.",
  "F|From there, let your eyes travel to the far side of the building. Right at the back, in the left-hand corner, is the computer room. We put it as far from the entrance as possible, to keep it quiet.",
  "F|Back at this end, on your left, just past the café, there's a comfortable room where we keep all the daily papers. That's the newspaper corner. Coffee in one hand, newspaper in the other.",
  "F|Now walk with me towards the middle of the building. You see the staircase. The small room tucked in right beside it, on its far side, is the recording studio I mentioned earlier.",
  "F|If you carry on straight past the stairs to the back wall, the room directly ahead of you, in the centre, leads out to the garden. We call it the garden door, and in summer it stays open all day.",
  "F|And finally, the room I'm proudest of. In the back corner on the right, with the tall windows over the river, is the reading hall. The morning light in there is wonderful. Right, let's begin the tour properly.",
  "F|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two students, Aziz and Malika, planning a class presentation about recycling. First, you have some time to look at questions twenty-one to twenty-four.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-four.",
  "M|OK Malika, let's plan this properly. How long does our presentation have to be? I thought ten minutes.",
  "F|It was ten last term, Aziz, but the teacher told me yesterday it must last fifteen minutes now.",
  "M|Fifteen, fine. And what should we focus on? Paper is the easiest topic.",
  "F|Everyone will choose paper, though. And glass is a bit boring. I think we should focus on plastic. There's much more to say about it.",
  "M|Agreed, plastic it is. Now, about the survey we're planning. Are you worried the questions are too long?",
  "F|Not really. My main worry is that too few people will answer it. Students always ignore surveys.",
  "M|True. We'll push it in the group chat. And when do the slides have to be handed in? Tuesday?",
  "F|No, we have a bit more time. The teacher wants the slides by Thursday.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-five to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-five to thirty.",
  "M|Good. Let's divide up the jobs. Who writes the survey questions?",
  "F|I'll design the survey questions, I enjoy that kind of thing.",
  "M|Then I'll take care of printing the posters. My cousin works at a print shop.",
  "F|What about interviewing the biology teacher? I'm a bit nervous to go alone.",
  "M|Let's interview her together then. It'll be easier with two of us.",
  "F|Deal. And once the survey results come in, I'll prepare the charts, since I made the survey anyway.",
  "M|Fine. Then I'll write the conclusion, I've already got some ideas for it.",
  "F|And the timing? Fifteen minutes is strict.",
  "M|We'll practise the timing together the evening before. Both of us, with a stopwatch.",
  "F|Perfect. I think we have a plan.",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of tea. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Today I want to trace the long journey of the world's most popular drink after water. Tea.",
  "M|Tea begins in ancient China, and what's often forgotten is that for centuries nobody drank it for pleasure. Tea was first drunk as a kind of medicine, a bitter tonic for tiredness and poor digestion.",
  "M|Transporting loose leaves over long distances was difficult, so early traders pressed the tea leaves into hard bricks, which could survive months on the road and were sometimes even used as money.",
  "M|Europeans came to tea remarkably late. Tea reached Europe in the seventeenth century, brought by Dutch and later English merchants.",
  "M|At first it was fabulously expensive, a luxury for the very rich. In wealthy houses, tea was kept in a locked box, and the lady of the house herself carried the key.",
  "M|As demand exploded in the nineteenth century, speed became money. Merchants built fast sailing ships known as clippers, which raced each other from China to London with the new season's harvest.",
  "M|The next revolution happened in America, and it happened by accident. A New York merchant sent customers samples of tea in small silk bags. His customers, misunderstanding, dropped the whole bag into hot water. The tea bag was born.",
  "M|And today? The world's largest producer of tea is China, followed by India and Kenya.",
  "M|Let me finish with the question students ask most often. Green tea and black tea come from the same plant. The difference between them is caused by oxidation of the leaves. Black tea is fully oxidised, green tea is not. Next week we'll look at coffee.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock1-s1.wav" $s1
Render "mock1-s2.wav" $s2
Render "mock1-s3.wav" $s3
Render "mock1-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
