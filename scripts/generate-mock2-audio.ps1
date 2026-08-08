# Generates the four Mock Test 2 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman phoning a community hall about booking a room for a family event. First, you have some time to look at questions one to five.",
  "P|6",
  "M|Now listen carefully and answer questions one to five.",
  "M|Riverton Community Hall, good afternoon.",
  "F|Oh hello. I'd like to book a room for a family party, please.",
  "M|Certainly. Could I start with your name?",
  "F|It's Dilnoza Yusupova. That's the family name — Y, U, S, U, P, O, V, A. Yusupova.",
  "M|Thank you. And what's the occasion? A birthday, perhaps?",
  "F|Actually it's an anniversary celebration. My parents have been married thirty years.",
  "M|How lovely. And which date were you thinking of?",
  "F|We were hoping for Saturday the seventh of June.",
  "M|Ah, I'm sorry — the seventh is already taken. We do have the following Saturday free, that's the fourteenth of June.",
  "F|The fourteenth... yes, that will work.",
  "M|And roughly how many guests?",
  "F|We first thought about fifty, but people keep saying yes, so let's put down sixty to be safe.",
  "M|Sixty, noted. That size fits two of our rooms. The Main Hall takes two hundred, but honestly it will feel empty. I'd suggest the Garden Room — it holds up to eighty and opens onto the lawn.",
  "F|The Garden Room sounds perfect.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "F|And what does it cost?",
  "M|On weekdays the Garden Room is thirty-five thousand som per hour, but for a Saturday you'll be on the weekend rate, which is forty thousand som per hour.",
  "F|Forty, all right. Is there anything to pay now?",
  "M|We ask for a deposit of two hundred thousand som. It's fully refundable after the event if the room is left in good condition.",
  "F|Fine. Does the price include anything else?",
  "M|Yes — use of the kitchen is included, so your caterers can warm and serve food there. There's parking behind the building too, no charge.",
  "F|Wonderful. What about music? Is there a sound system?",
  "M|That's the one thing we don't provide, I'm afraid. Most families bring their own speakers — there are plenty of sockets along the wall.",
  "F|Our own speakers, easy enough. So how do we confirm all this?",
  "M|We used to post out booking forms, but everything is electronic now. I'll send the confirmation by email today — just reply with the deposit reference.",
  "F|By email, perfect. Thank you so much.",
  "M|My pleasure. See you on the fourteenth.",
  "M|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear the manager of Westfield City Farm talking to a group of visitors on its open day. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good morning everyone, and welcome to Westfield City Farm. Before we start the tour, a little history and some practical points.",
  "M|People often assume the farm was set up to supply vegetables to the shops round here, or as a place for children to meet animals. Both of those things happen now, of course. But the real reason we exist is simpler: thirty years ago this site was an abandoned railway yard, full of rubbish, and a group of neighbours decided to bring the empty land back into use. The animals came later.",
  "M|Now, today is a little special. Entry is free, as it is every day, so that's nothing new. But just for today, a chef from the Riverside Hotel is here giving cooking demonstrations at noon and again at three, using our own produce. Do stay for one. And please remember, feeding the animals is a job for our staff only.",
  "M|If you came by car — the street beside the farm is strictly no parking, and our neighbours at the supermarket have asked us not to send visitors to their car park. The school opposite has kindly opened its playground for farm visitors, so please park there.",
  "M|And people always ask how they can help us. Donations are always welcome, and yes, we keep a volunteer list, though I should say the list is currently full. Truthfully, the thing that helps us most is very simple: buy something from the farm shop on your way out. Every som goes back into the animals.",
  "M|Before we walk round, please look at questions fifteen to twenty.",
  "P|8",
  "M|Now, what will you see today? Let me take the areas one by one.",
  "M|We'll begin at the orchard. Those apple and apricot trees were planted the very first spring, before we had a single animal — it's the oldest part of the farm, and still my favourite.",
  "M|Next to it stands the greenhouse. Everything growing in there — the tomatoes, the herbs, the salad leaves — goes straight to the kitchen, so whatever you eat in the café today started life about twenty metres away.",
  "M|Then come the vegetable beds. We don't touch those at all, actually — they're looked after entirely by children from three local schools, who visit every week. Whatever you think of the straightness of the rows, they did it themselves.",
  "M|The chicken house you'll see is gleaming, and there's a reason. After a fox got in last autumn we pulled the whole structure down, and it has just been rebuilt, stronger and, I'm told, more stylish than my own house.",
  "M|I'm sorry to say the pond is off limits today. The safety fence is being replaced this week, so it's closed to visitors — the ducks, I promise, are fine.",
  "M|And finally, for the youngest visitors, the play area by the gate. It's brand new this year, and I want to thank the family bakery on Mill Road, whose donation paid for all of it.",
  "M|Right — wellies on, and follow me.",
  "M|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two psychology students, Karim and Nilufar, discussing their experiment on sleep and memory. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Nilufar, we should decide what goes in the report about why we picked sleep and memory. Was it that book I lent you?",
  "F|The book was interesting, Karim, but no. Honestly, it was my own results last term. I slept about four hours before one exam and did far worse than expected, and I wanted to know if that was really the reason. The tutor did approve the topic, but the idea was mine.",
  "M|Fair enough. And the first experiment — we should describe it clearly. We had the two groups memorise... the pictures, was it?",
  "F|No, remember we dropped the pictures because they were too easy. Everyone memorised a list of forty unrelated words, and we tested recall the next day.",
  "M|Right, the word list. And I have to own up to something in the report. I tested the well-rested group in the morning, but the sleep-deprived group in the late afternoon. The instructions were identical, I recorded everything — but the time of day was different, and that could matter.",
  "F|It could. And it wasn't the only weakness. We only had twelve participants.",
  "M|Twelve is tiny, I completely agree. Too small to conclude anything.",
  "F|There's also the questionnaire. It mostly worked, but the question about hours of sleep confused people — some counted naps, some didn't. A few answers made no sense at all.",
  "M|At least it was short — nobody complained about the length.",
  "F|True. And what did the tutor say about the report itself? More references?",
  "M|She said the references were fine, actually. Her main point was that pages of numbers are unreadable — she wants the results presented visually, charts and graphs, before anything else.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So for the write-up, which problems do we call serious? You mentioned the room was noisy once.",
  "M|Someone slammed a door, that's all — I don't think the noise mattered. The two real issues, for me, are the testing times and the number of people.",
  "F|Agreed on both. Twelve people tested at different times — those are the two we flag. I did wonder about the word list being too hard, but the scores don't support that.",
  "M|No, the list was fine. So, the second experiment. What do we change?",
  "F|First, everyone gets tested at the same hour. Nine in the morning, both groups, no exceptions.",
  "M|Definitely. And I think we should widen the sample — not just our classmates. Different ages this time. My uncle's colleagues have already agreed, and your cousins.",
  "F|Yes, let's do that. Should we also find a quieter room?",
  "M|Honestly the room was fine. And someone suggested paying people, but we have no budget at all.",
  "F|Then we're decided. Same hour for everyone, and a wider age range.",
  "M|To the library, then.",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of rubber. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Today's material is something you have touched a hundred times before breakfast. Rubber.",
  "M|Natural rubber begins as latex — the milky sap of a tropical tree. Cut the bark, and it bleeds this white liquid, which the peoples of the Amazon rainforest were collecting centuries before Europeans arrived.",
  "M|Further north, in ancient Central America, the material had a sacred career: it was shaped into balls for ritual games played in stone courts — games that were sometimes, literally, matters of life and death.",
  "M|Europe met rubber through samples brought home by early explorers, and treated it as a curiosity. Even the English name records a small discovery: the stuff could rub out pencil marks, and so it became, simply, rubber.",
  "M|Early manufacturers had ambitions beyond erasers — coats, boots, covers — and they all met the same embarrassing problem. In hot weather the products turned soft and sticky; in a cold winter they went stiff and cracked. Rubber seemed to be a material with no manners.",
  "M|The cure arrived in 1839, more or less by accident, in the workshop of an American named Charles Goodyear. He heated rubber together with sulphur, and the result changed everything: a material that stayed firm and springy at any temperature. The process was named vulcanisation, after the Roman god of fire.",
  "M|Demand now exploded, and here is a detail that surprises students: the first great market was not the motor car, which barely existed, but the makers of bicycles, whose new air-filled wheels transformed the comfort of riding.",
  "M|Supply had to follow. In the 1870s, seeds were carried — some say smuggled — from Brazil to Asia, and vast plantations grew up, above all in Malaysia, which came to dominate world production for much of the twentieth century.",
  "M|Then war intervened. Cut off from Asian plantations in the 1940s, industrial nations poured money into inventing synthetic rubber, made from petroleum. They succeeded so well that around seventy per cent of all rubber today is man-made.",
  "M|Natural rubber, however, was never fully replaced. For the most demanding uses — above all aircraft tyres, which must survive extraordinary heat and force — only the natural material will do.",
  "M|And the story is still moving. Because the world's rubber trees are worryingly similar genetically, researchers are now breeding an unlikely alternative crop: the dandelion, whose roots produce a usable latex. The next aircraft you board may, in a small way, run on flowers.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock2-s1.wav" $s1
Render "mock2-s2.wav" $s2
Render "mock2-s3.wav" $s3
Render "mock2-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
