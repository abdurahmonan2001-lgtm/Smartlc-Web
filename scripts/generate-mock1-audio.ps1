# Generates the four Mock Test 1 listening recordings with Windows TTS.
# Lines prefixed "F|" use the female voice, "M|" the male voice.
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
        $voice = if ($parts[0] -eq "F") { $female } else { $male }
        if ($voice) { try { $synth.SelectVoice($voice) } catch {} }
        $synth.Speak($parts[1])
    }
    $synth.SetOutputToNull()
    Write-Host "wrote $file"
}

$s1 = @(
  "M|Section one. You will hear a woman phoning a sports centre about swimming lessons.",
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
  "F|Great. How much does it cost?",
  "M|It's ninety thousand som per month. And I should mention, we can't accept cash at the desk any more, so payment must be made by card.",
  "F|By card, no problem. Do I need to bring anything?",
  "M|We provide everything for the lessons themselves, but students must bring their own towel. And if you don't want to carry your things around, a locker can be rented at the front desk for a small fee.",
  "F|Perfect. Anything else?",
  "M|Just one thing. For your membership form, please bring one small photo with you to the first lesson.",
  "F|A photo. Got it. Thank you so much for your help!",
  "M|You're welcome. See you on Friday."
)

$s2 = @(
  "F|Section two. You will hear a guide welcoming visitors to a new city library.",
  "F|Good morning everyone, and welcome to the new Riverside Library. Before we walk around, let me give you a quick picture of the building.",
  "F|We've thought carefully about where everything goes. The children's section, with its story corner, is on the ground floor, so families don't need to use the stairs.",
  "F|If you're looking for the computers, they're not on the first floor as many people expect. All the computers are located on the second floor, in the quiet study zone.",
  "F|We keep all the daily newspapers next to the café, so you can read them with a cup of coffee.",
  "F|In winter, our talks and readings happen in the main hall. But in summer, all events are held in the garden behind the building, which is a lovely space.",
  "F|Please note our opening days. We're open six days a week. The library is closed on Monday.",
  "F|Membership costs very little, and it is completely free for anyone under eighteen.",
  "F|Now, about today's tour. We originally planned to start at ten o'clock, but to let everyone arrive, today's tour begins at half past ten.",
  "F|A few rules about borrowing. Until last year members could take eight books at a time, but we've raised that. You may now borrow a maximum of ten books.",
  "F|Downstairs we also have a small recording studio. I'm afraid it isn't open to everyone. The studio can be booked by members only.",
  "F|Finally, people always ask me where to begin. The reading hall is beautiful, but honestly, I always recommend visitors start with the roof terrace. The view over the river is wonderful, and it helps you understand the whole building. Right, let's begin."
)

$s3 = @(
  "M|Section three. You will hear two students, Aziz and Malika, planning a class presentation about recycling.",
  "M|OK Malika, let's plan this properly. How long does our presentation have to be? I thought ten minutes.",
  "F|It was ten last term, Aziz, but the teacher told me yesterday it must last fifteen minutes now.",
  "M|Fifteen, fine. And what should we focus on? Paper is the easiest topic.",
  "F|Everyone will choose paper, though. And glass is a bit boring. I think we should focus on plastic. There's much more to say about it.",
  "M|Agreed, plastic it is. Now, about the survey we're planning. Are you worried the questions are too long?",
  "F|Not really. My main worry is that too few people will answer it. Students always ignore surveys.",
  "M|True. We'll push it in the group chat. And when do the slides have to be handed in? Tuesday?",
  "F|No, we have a bit more time. The teacher wants the slides by Thursday.",
  "M|Good. Let's divide up the jobs. Who writes the survey questions?",
  "F|I'll design the survey questions, I enjoy that kind of thing.",
  "M|Then I'll take care of printing the posters. My cousin works at a print shop.",
  "F|What about interviewing the biology teacher? I'm a bit nervous to go alone.",
  "M|Let's interview her together then. It'll be easier with two of us.",
  "F|Deal. And once the survey results come in, I'll prepare the charts, since I made the survey anyway.",
  "M|Fine. Then I'll write the conclusion, I've already got some ideas for it.",
  "F|And the timing? Fifteen minutes is strict.",
  "M|We'll practise the timing together the evening before. Both of us, with a stopwatch.",
  "F|Perfect. I think we have a plan."
)

$s4 = @(
  "M|Section four. You will hear part of a lecture about the history of tea.",
  "M|Today I want to trace the long journey of the world's most popular drink after water. Tea.",
  "M|Tea begins in ancient China, and what's often forgotten is that for centuries nobody drank it for pleasure. Tea was first drunk as a kind of medicine, a bitter tonic for tiredness and poor digestion.",
  "M|Transporting loose leaves over long distances was difficult, so early traders pressed the tea leaves into hard bricks, which could survive months on the road and were sometimes even used as money.",
  "M|Europeans came to tea remarkably late. Tea reached Europe in the seventeenth century, brought by Dutch and later English merchants.",
  "M|At first it was fabulously expensive, a luxury for the very rich. In wealthy houses, tea was kept in a locked box, and the lady of the house herself carried the key.",
  "M|As demand exploded in the nineteenth century, speed became money. Merchants built fast sailing ships known as clippers, which raced each other from China to London with the new season's harvest.",
  "M|The next revolution happened in America, and it happened by accident. A New York merchant sent customers samples of tea in small silk bags. His customers, misunderstanding, dropped the whole bag into hot water. The tea bag was born.",
  "M|And today? The world's largest producer of tea is China, followed by India and Kenya.",
  "M|Let me finish with the question students ask most often. Green tea and black tea come from the same plant. The difference between them is caused by oxidation of the leaves. Black tea is fully oxidised, green tea is not. Next week we'll look at coffee."
)

Render "mock1-s1.wav" $s1
Render "mock1-s2.wav" $s2
Render "mock1-s3.wav" $s3
Render "mock1-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
