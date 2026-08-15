# Generates the four Mock Test 11 listening recordings with Windows TTS.
# Same conventions as Mock 1: "F|"/"M|" pick the voice, "P|<seconds>" is a
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
  "M|Part one. You will hear a woman phoning a repair company to arrange a visit for her washing machine. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Rapid Repairs, good morning. How can I help?",
  "F|Oh, hello. My washing machine has broken down, and I'd like to arrange a repair visit, please.",
  "M|Of course. Is it a top loader or a front loader?",
  "F|A front loader - the door is on the front.",
  "M|Fine. Let me take some details. Your name, please?",
  "F|Farida Rashidova. Shall I spell the surname? It's R - A - S - H - I - D - O - V - A. Rashidova.",
  "M|Thank you. And how old is the machine? If it's under two years old, the repair might be free under the guarantee.",
  "F|Oh, it's much older than that. Let me think. I was going to say five years, but no - we bought it the year we moved to this flat, so it's actually seven years old.",
  "M|Seven years - well outside the guarantee, I'm afraid. And what exactly is the problem?",
  "F|Water is leaking out during the wash. At first I thought it was coming from the hose at the back, but I checked that, and it's actually leaking from the door.",
  "M|From the door - probably the rubber seal. Anything else?",
  "F|Yes, one more thing. Right at the end of the spin cycle there's a loud banging. The whole kitchen shakes.",
  "M|A banging noise at the end of the spin. I'll note that down for the engineer.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|Now, could I take your address?",
  "F|It's flat six, number fourteen, Bustan Street.",
  "M|Bustan Street - is that the one opposite the school?",
  "F|That's right, directly opposite the school gates.",
  "M|Good, the engineer knows it. Now, when would suit you? Could he come on Monday morning?",
  "F|Monday would be perfect.",
  "M|Ah - I'm sorry, I've just seen the rota. The engineer isn't in your area on Mondays. He covers your district on Wednesdays. Would Wednesday morning work?",
  "F|Wednesday morning... yes, that's fine. What time will he arrive?",
  "M|I can't promise an exact time, but it will be between nine and eleven o'clock. He'll ring you when he sets off.",
  "F|Between nine and eleven. All right. And what does the visit cost?",
  "M|The call-out fee is fifty thousand som, and that includes the first half hour of the engineer's labour. If the job takes longer, the extra time is charged on top.",
  "F|Fifty thousand. I see. And if he has to fit new parts?",
  "M|Parts are paid for separately. But every part we fit is guaranteed for one year, so you're covered if anything fails again.",
  "F|Fine. Is there anything I should do before he comes?",
  "M|Two small things. Make sure the machine is completely empty - no clothes left inside. And turn off the tap under the sink - that's the one that feeds water to the machine.",
  "F|Empty the machine, and turn off the tap. Easy enough.",
  "M|Lastly, your booking reference. It's W R five eight. W for window, R for river, then the numbers five and eight.",
  "F|W R five eight. Lovely. Thank you so much for your help.",
  "M|Thank you, Mrs Rashidova. The engineer will see you on Wednesday.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
    "P|5"
)

$s2 = @(
  "M|Part two. You will hear the organiser of a charity fun run giving information to the people taking part. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good evening everyone, and thank you for coming to the briefing for Sunday's charity fun run in Oakwood Park. I'm Anvar, the race organiser, and in the next few minutes I'll tell you everything you need to know.",
  "M|First - why we run. Some of you took part two years ago, when the money went towards repairing the sports club building. That work is finished now, I'm glad to say. And there's been some talk that we're collecting for training courses for young athletes - in fact that's a separate fund with its own events. This year, every som you raise will buy new equipment for the children's hospital on Park Road. The hospital's own staff will be running with us.",
  "M|Now, what's different this year? People keep asking me whether the route is longer. It isn't - it's the same five kilometres it has always been. And the prizes are exactly the same as last year, before you ask. The real change is this: for the first time, there is no age limit. Anyone at all can enter - we already have a runner aged seven and a walker aged seventy-nine.",
  "M|A word about souvenirs. The green T-shirts you may have seen are worn by our volunteers, so you can spot them if you need help - they're not for sale, I'm afraid, and the caps we advertised sold out weeks ago. But everyone who crosses the finish line, fast or slow, will be given a medal, so do finish!",
  "M|And your bags. Please don't leave anything valuable in your cars - the car park is open to the public all morning. Last year we stored bags at the bandstand, but on Sunday the bandstand is being used by the brass band, who are playing us home. So this year, leave your bag at the pavilion, where volunteers will look after it until you finish.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "M|Now let me walk you round the route - you can follow it on the map of the park.",
  "M|Everything begins at the main gate at the bottom of the park. As you come through the gate, the bag storage is immediately on your left, just past the cafe - hand your bag in there before you do anything else.",
  "M|Then make your way to the lake. The start line is on the wide path that runs along the south side of the lake, below the water - please line up there from half past eight.",
  "M|From the start you'll run up the west side of the park. Now, we did plan to put the drinks station at the north end of the lake, where the path bends - but that path is far too narrow for tables and runners together. So instead, the drinks station will be in the north-west corner of the park, at the top of the slope. You'll have earned a drink by the time you reach it.",
  "M|You then run along the top of the park, past the trees, and you'll see the fountain ahead of you. The first-aid tent is right beside the fountain, on the route itself - so if anyone feels unwell, help is never far away.",
  "M|Keep going to the north-east corner, where you turn towards the bottom of the park. Our photographer had planned to stand at that corner, but the morning light there is poor, so instead you'll find the photo point beside the playground, on the east side. Slow down and smile as you pass - the pictures will be on the website.",
  "M|And then it's the finishing stretch: down past the playground and back towards the gate. The finish line is just in front of the main gate, on the opposite side from where you handed in your bag. The medals - and the band - will be waiting for you there.",
  "M|That's everything from me. Sunday morning, half past eight at the lake. Sleep well, and good luck.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
    "P|5"
)

$s3 = @(
  "M|Part three. You will hear two students, Jasur and Laylo, discussing the educational phone app they are developing for their course project. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Laylo, the proposal form asks where the idea for the app came from. Shall we say it was that lecture on educational games? It certainly impressed me.",
  "F|The lecture was good, Jasur, but honestly, the idea was in my head before that. Last summer I spent six weeks helping my little brother with his maths, and I kept thinking - if this practice were a game on a phone, he'd do it without me sitting next to him. That's where the app really comes from.",
  "M|Fair enough - your brother gets the credit, then. Now, who exactly are we designing it for? In my notes I wrote children aged five to seven.",
  "F|I've been worrying about that. Five-year-olds can't read instructions on a screen without an adult. And teachers - well, teachers don't usually choose apps, and schools have no budget for them anyway.",
  "M|True. So we want children who read confidently but still love games. Eight to ten, then?",
  "F|Eight to ten. Let's fix that and stop changing our minds.",
  "M|Agreed. Next, rewards. My first idea was a public scoreboard, so everyone can see the rankings.",
  "F|And you remember what the tutor said about that - the children at the bottom of a public list simply give up. She was quite firm.",
  "M|She was. And a star after every single answer means the stars stop meaning anything. So, the middle way: correct answers earn points, and points unlock the extra games. You have to practise to play.",
  "F|Exactly - that gives them a reason to come back. Now, she also told us where to begin. And it wasn't code.",
  "M|It certainly wasn't. When I showed her my plan she said: before you write a single line, draw every screen on paper - every button, every menu - and only then decide what to build.",
  "F|Paper first, then. And Jasur, be honest - what's making you nervous about this project? The deadline?",
  "M|The deadline's fine; we have the whole semester. And the software costs nothing - all the tools are free for students. No, it's that I've never actually built anything for a phone. Websites, yes. Phones, never.",
  "F|You'll learn faster than you expect. And for the final report - did you write down what she said it must include?",
  "M|Yes. Whatever else we put in, there has to be a plan for testing the app: who tries it, what we measure, and how we use what we find. Screenshots are nice but optional, she said, and she doesn't need a list of costs.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Right - features for version one. I made a list of five ideas. First: a daily practice reminder?",
  "M|Hmm. My weather app sends me a reminder every day, and I've grown to hate it. Leave reminders out for now - maybe later, if parents ask for them.",
  "F|Agreed. Second: a progress page for parents?",
  "M|That one's essential. It's the parents who download the app, and they'll want to see what their child has practised. In it goes.",
  "F|Good. Third: recorded voice instructions - a voice that reads each task aloud?",
  "M|I'd say yes. Even at eight, some children read slowly, and hearing the task keeps the game moving. Version one.",
  "F|Then, fourth: a two-player mode?",
  "M|I'd love it, but it doubles the programming. Version two, definitely not version one.",
  "F|Agreed. And fifth: printable worksheets?",
  "M|On paper? The whole point of the app is to get away from worksheets. No.",
  "F|So: the parents' page and the voice instructions. Now - jobs before we meet again. I could email my old primary school; the head teacher still knows me. If she agrees, we can arrange a visit, watch a maths lesson, and talk to the children.",
  "M|Perfect. And I'll write a set of sample questions - say fifty, at three levels of difficulty - so we have real material to test with.",
  "F|Should one of us send the tutor a timetable for the project?",
  "M|She said not yet - after the school visit, when we know more. And the logo and all of that can wait too.",
  "F|What about the name? The name is easy. We'll call it...",
  "M|We are not deciding the name today, Laylo.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
    "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of wool and the wool trade. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Today I want to talk about a material so ordinary that we forget how much history is knitted into it. Wool.",
  "M|Sheep were among the very first animals that humans ever farmed - they were being kept more than ten thousand years ago. But here is the surprising part: those earliest sheep had no fleece worth cutting. They were kept for two products only - their meat, and their milk. The woolly sheep we know today is really a human invention, created over thousands of years as herders bred, again and again, from their woolliest animals.",
  "M|Getting the wool off the animal was slow work at first. The earliest wool was not cut at all: it was combed out by hand in the season when the sheep shed their coats naturally. The arrival of iron changed that. Iron shears - two blades joined by a spring - let a single worker strip a whole animal in minutes, and versions of that simple tool are still in use on farms today.",
  "M|And why did wool matter so much? Because of one property that plant fibres cannot match: a wool garment keeps the body warm even when it is wet. For sailors, shepherds and soldiers - for anyone whose life was lived outdoors in a cold climate - that one property could mean the difference between life and death.",
  "M|Let us move on to the Middle Ages, when wool became, quite simply, money. English pastures produced heavy fleeces that the whole of Europe wanted, and raw wool became England's most valuable export by a wide margin. The king taxed every sack that left the country, and those taxes helped to pay for his wars. There is a reminder of this in London even now: in Parliament, one of its most senior officials still sits on a great sack stuffed with wool - a piece of furniture designed, centuries ago, to declare exactly where the nation's wealth came from.",
  "M|Most of that English wool crossed the sea to Flanders, whose weavers were the finest in Europe and turned it into expensive fabric. Then, from the fifteenth century, the English drew the obvious conclusion: instead of selling the raw material, they would weave it at home and sell the finished cloth themselves. It was cloth, not fleece, that made England genuinely rich.",
  "M|Meanwhile, Spain was guarding a treasure of its own: the merino, a breed whose wool was extraordinarily fine - fibres so thin and soft that merino fabric clothed the kings of Europe. The Spanish crown protected its monopoly ruthlessly. Taking a merino sheep out of the country was a crime punished by death, and for centuries the ban held. But no monopoly lasts forever. In seventeen ninety-seven, the first merinos were landed in Australia, and the breed thrived on the dry grasslands there as nowhere else on earth. Australia remains the largest producer of fine wool to this day.",
  "M|The twentieth century, however, was unkind to wool. From the nineteen thirties onward, chemists learned to make cheap artificial fibres - the first great success was nylon - and one by one, wool lost its old markets: first stockings, then suits, then carpets. By the end of the century, wool had fallen to a tiny fraction of the world's fibre production.",
  "M|And yet the story is turning once more. Wool is natural, renewable and biodegradable: it grows on grass and sunshine, and at the end of its life it simply rots away - something no plastic fibre can claim. It is also finding new markets that its old merchants never imagined. Builders now pack sheep's wool inside the walls of new houses as insulation - so the same property that once kept the shepherd warm on the hillside now keeps the whole building warm instead.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock11-s1.wav" $s1
Render "mock11-s2.wav" $s2
Render "mock11-s3.wav" $s3
Render "mock11-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
