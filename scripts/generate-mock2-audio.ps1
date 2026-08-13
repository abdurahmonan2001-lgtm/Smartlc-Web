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
  "F|Oh hello. A friend of mine held a party at your hall in the spring, and she hasn't stopped praising it since. I'd like to book a room for a family party myself, please.",
  "M|That's lovely to hear. Certainly. Could I start with your name?",
  "F|Of course. It's Dilnoza Yusupova.",
  "M|Could you spell the surname for me? I'd rather not guess.",
  "F|It's Y, U, S, U, P, O, V, A. Yusupova.",
  "M|Y, U, S, U, P, O, V, A. Got it, thank you. And what's the occasion? A birthday, perhaps?",
  "F|Everyone assumes that! No, actually it's an anniversary celebration. My parents have been married thirty years this summer.",
  "M|An anniversary, how lovely. And which date were you thinking of?",
  "F|We were hoping for Saturday the seventh of June.",
  "M|Let me check the diary... ah, I'm sorry - the seventh is already taken. A wedding reception, and they booked months ago. We do have the following Saturday free, though. That's the fourteenth of June.",
  "F|The fourteenth... let me think. My brother flies in on the twelfth, so... yes, actually, the fourteenth will work even better.",
  "M|The fourteenth of June it is. And roughly how many guests are you expecting?",
  "F|That's the difficult question. We first thought about fifty, but people keep saying yes, and my mother has a lot of cousins, so let's put down sixty to be safe.",
  "M|Sixty, noted. Now, that size fits two of our rooms. The Main Hall takes two hundred, but honestly, with sixty guests it will feel empty and the speeches will echo. I'd suggest the Garden Room - it holds up to eighty, and it opens straight onto the lawn, which is lovely in June if the weather behaves.",
  "F|The Garden Room sounds perfect. My parents love being outdoors, so the lawn would be a real bonus for the photographs.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "F|Now, the practical side. What does the room cost?",
  "M|It depends on the day. On weekdays the Garden Room is thirty-five thousand som per hour, but for a Saturday you'll be on the weekend rate, which is forty thousand som per hour.",
  "F|Forty thousand, all right. I'll work out the hours later. Is there anything to pay now?",
  "M|We ask for a deposit of two hundred thousand som to hold the date. It's fully refundable after the event, as long as the room is left in good condition.",
  "F|Two hundred thousand, that's fine. Does the price include anything else?",
  "M|Yes - use of the kitchen is included, so your caterers can warm and serve food there. It has two ovens and plenty of fridge space. There's parking behind the building too, no charge for that.",
  "F|Wonderful. What about music? My cousin wants to look after that side of things. Is there a sound system?",
  "M|That's the one thing we don't provide, I'm afraid. We used to have one, but it was forever breaking down. Most families just bring their own speakers - there are plenty of sockets along the wall, so setting up takes minutes.",
  "F|Our own speakers, easy enough - my cousin has all the equipment anyway. Oh, and can we come in early to decorate the room?",
  "M|Yes, the room is yours from an hour before the booking starts, at no extra cost. So how would you like to confirm all this?",
  "F|Whatever is simplest. Do I need to fill something in?",
  "M|We used to post out booking forms, but everything is electronic now. I'll send the confirmation by email today - just read it through, reply to accept, and pay the deposit using the reference in the message.",
  "F|By email, perfect. I'll watch out for it this evening. Thank you so much, you've been really helpful.",
  "M|My pleasure. We'll see you on the fourteenth - and congratulations to your parents.",
  "M|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear the manager of Westfield City Farm talking to a group of visitors on its open day. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good morning everyone, and welcome to Westfield City Farm. I've managed the farm for six years now, and it's a real pleasure to see so many new faces. Before we start the tour, let me give you a little history and a few practical points.",
  "M|People often assume the farm was set up to supply vegetables to the shops round here, or as a place for city children to meet animals for the first time. Both of those things happen now, of course - you'll see school groups here most mornings, and our produce does reach a few local shelves. But the real reason we exist is simpler. Thirty years ago this site was an abandoned railway yard, full of rubbish, and a group of neighbours decided to bring the empty land back into use. The animals came later, almost by accident, when somebody donated a pair of goats.",
  "M|Now, today is a little special, and I should explain exactly why. Entry is free, as it is every day, so that's nothing new. But just for today, a chef from the Riverside Hotel is here giving cooking demonstrations, at noon and again at three, using our own produce - eggs, herbs, and vegetables picked this morning. Do stay for one if you can. And please remember that feeding the animals is a job for our staff only - the animals are on carefully planned diets, and a hundred kind visitors with bread would undo all of that in an afternoon.",
  "M|A word about cars, because it causes confusion every year. If you came by car - the street beside the farm is strictly no parking, and the council will happily give you a ticket. Our neighbours at the supermarket have also asked us, politely but firmly, not to send visitors to their car park. The school opposite has very kindly opened its playground for farm visitors, so please park there - the entrance is signposted, and it's a two-minute walk.",
  "M|And people always ask how they can help us, which is kind. Donations are always welcome, of course, and yes, we do keep a volunteer list, though I should say the list is currently full. But truthfully, the thing that helps us most is very simple: buy something from the farm shop on your way out. Eggs, honey, jam, whatever takes your eye. Every som goes straight back into the animals.",
  "M|Before we walk round, please look at questions fifteen to twenty.",
  "P|8",
  "M|Now, what will you see today? Let me take the areas one by one, in the order we'll visit them.",
  "M|We'll begin at the orchard. Those apple and apricot trees were planted the very first spring, before we had a single animal or even a proper fence - it's the oldest part of the farm, and still my favourite corner.",
  "M|Next to it stands the greenhouse. Everything growing in there - the tomatoes, the herbs, the salad leaves - goes straight to the kitchen, so whatever you eat in the cafe today started life about twenty metres away. You're welcome to walk through, but do close the door behind you; the tomatoes are fussy about draughts.",
  "M|Then come the vegetable beds. We don't touch those at all, actually - they're looked after entirely by children from three local schools, who come every week to dig, plant and water. Whatever you think of the straightness of the rows, they did it all themselves, and they are enormously proud of it.",
  "M|The chicken house you'll see is absolutely gleaming, and there's a reason for that. After a fox got in last autumn we pulled the whole structure down, and it has just been rebuilt, stronger, warmer and, I'm told by the volunteers, rather more stylish than my own house.",
  "M|I'm sorry to say the pond is off limits today. The old safety fence is being replaced this week, and while the posts are out of the ground we can't let anyone near the water, so it's closed to visitors - the ducks, I promise, are perfectly fine.",
  "M|And finally, for the youngest visitors, the play area by the gate - the climbing frame, the sandpit, the little wooden tractor. It's brand new this year, and I want to say a public thank you to the family bakery on Mill Road, whose generous donation paid for every bit of it.",
  "M|Right - wellies on, cameras ready, and follow me.",
  "M|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two psychology students, Karim and Nilufar, discussing their experiment on sleep and memory. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Nilufar, we should decide what goes in the introduction about why we picked sleep and memory in the first place. Was it that book I lent you?",
  "F|The book was interesting, Karim, but no. Honestly, it was my own results last term. I slept about four hours before one exam and did far worse than anyone expected, including me, and I wanted to know whether the bad night was really the reason, or whether I was just making excuses. The tutor did approve the topic when we suggested it, but the idea itself was mine.",
  "M|Fair enough - that's a more honest opening anyway. And the first experiment - we should describe the design clearly. We had the two groups memorise... the pictures, was it?",
  "F|No, remember we dropped the pictures at the planning stage, because the pilot showed they were far too easy. And we talked about using a short scientific text as well, but that tests understanding as much as memory, so it went too. In the end everyone memorised a list of forty unrelated words, and we tested recall the next day.",
  "M|Right, the word list. And I have to own up to something in the report, don't I? I tested the well-rested group in the morning, but the sleep-deprived group in the late afternoon. The instructions were word for word identical, I read them from a script, and I recorded every single response - but the time of day was different for the two groups, and that could matter, because alertness changes across the day.",
  "F|It could matter, and it's better to admit it ourselves than have the tutor spot it. And it wasn't the only weakness, was it? We only had twelve participants.",
  "M|Twelve is tiny, I completely agree. Too small to conclude anything.",
  "F|Exactly. There's also the questionnaire to discuss. It mostly worked, but the question about hours of sleep confused people - some counted naps, some didn't, and one person seemed to count time spent lying awake. A few answers made no sense at all, so the wording was clearly the problem.",
  "M|At least it was short - nobody complained about the length.",
  "F|True. Someone did ask me whether the answers should have been anonymous, but I don't think that was an issue - people were happy to write their names, and we needed the names to match the memory scores anyway.",
  "M|Agreed, that's a non-issue. And what did the tutor say about the report itself? I keep expecting her to demand more references.",
  "F|That's the funny thing - she said the references were fine, actually, and she didn't ask us to cut the method section either, which I'd been dreading. Her main point was that pages of numbers are unreadable - she wants the results presented visually, charts and graphs, before anything else.",
  "M|Visual results it is, then. I'll draft the charts this weekend.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So for the write-up, which problems do we actually call serious? We should be selective - if we list ten weaknesses it looks as though the whole project failed. You mentioned the room was noisy once.",
  "M|Someone slammed a door during one session, that's all - a single moment. I don't think the noise mattered, and the scores from that session look completely normal. The two real issues, for me, are the testing times and the number of people.",
  "F|Agreed on both. Twelve people, tested at different times of day - those are the two we flag as serious. I did wonder about the word list being too hard, because a couple of people groaned when they saw it, but the scores don't support that at all - the average was right where the published studies put it.",
  "M|No, the list was fine. And the sessions themselves were under twenty minutes, so nobody was getting tired towards the end - the length wasn't a problem either. So, the second experiment. What do we change, concretely?",
  "F|First, everyone gets tested at the same hour. Nine in the morning, both groups, no exceptions - I'll book the room for the whole week if I have to.",
  "M|Definitely. And I think we should widen the sample - not just our classmates this time. Different ages. My uncle's colleagues have already agreed, and your cousins said they'd help, so we can manage a proper range.",
  "F|Yes, let's commit to that. Should we also look for a quieter room, just in case?",
  "M|Honestly, the room was fine - thick walls, hardly any noise from the corridor. Nothing to change there. And someone in the seminar suggested offering people a small reward for taking part. Tempting, but we have no budget at all, so that's out.",
  "F|Agreed. As for the questionnaire, we'll reword the sleep question, but I wouldn't make it any shorter - it only takes five minutes as it is. So we're decided. Same hour for everyone, and a wider age range - just those two changes, done properly.",
  "M|To the library, then. Those charts won't draw themselves.",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of rubber. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. Today's material is something you have touched a hundred times before breakfast - the soles of your shoes, the seal on the fridge door, the grip of your toothbrush. Rubber. It looks like the most ordinary substance in the world, and its history, as we shall see, is anything but ordinary.",
  "M|Let us begin with what it actually is. Natural rubber begins as latex - the milky sap of a tropical tree. Cut the bark at an angle, and the tree bleeds this white liquid, which can be collected in a cup, drop by drop, without harming the tree itself. The peoples of the Amazon rainforest were collecting it centuries before any European arrived, and they understood the material remarkably well - they waterproofed baskets and cloth with it, and made bottles and simple shoes by smoking layer after layer of it over a fire.",
  "M|Further north, in ancient Central America, the material had an altogether more sacred career: it was shaped into balls for ritual games played in great stone courts, some of which are still standing today. The rules of those games are partly lost to us, but we know the stakes could be extraordinary - these were games that were sometimes, quite literally, matters of life and death.",
  "M|Europe met rubber through samples brought home by early explorers, and for two centuries treated it as little more than a curiosity - a strange bouncing gum from the New World, displayed in private collections and passed around as a novelty. Even the English name records a small domestic discovery: the stuff could rub out pencil marks, and so it became, simply, rubber. Few materials are named after so humble a talent.",
  "M|Early manufacturers, naturally, had ambitions well beyond erasers - waterproof coats, boots, covers for wagons - and throughout the early nineteenth century they all met the same embarrassing pair of problems. In hot weather the products turned soft and sticky, sometimes collapsing into a shapeless, evil-smelling mess in the shop window; and in a cold winter they went stiff and cracked like old paint. Investors lost fortunes, and rubber seemed to be a material with no manners at all.",
  "M|The cure arrived in 1839, more or less by accident, in the workshop of a determined American named Charles Goodyear, who had already spent years, and every dollar he possessed, on the problem. He heated rubber together with sulphur, and the result changed everything: a material that stayed firm and springy at any temperature, summer or winter. The process was eventually named vulcanisation, after the Roman god of fire, and in refined form it remains the basis of the industry to this day.",
  "M|Demand now exploded, and here is a detail that surprises students every year: the first great market was not the motor car, which at that point barely existed, but the makers of bicycles, whose new air-filled wheels transformed the comfort of riding on rough streets. The cycling craze of the 1890s consumed rubber faster than the scattered wild trees of Brazil could possibly supply it.",
  "M|So supply had to follow demand. In the 1870s, seeds were carried - some say smuggled - from Brazil to Asia, raised with great care in European glasshouses on the way, and then shipped east. Vast plantations grew up wherever the climate suited the tree, above all in Malaysia, which came to dominate world production for much of the twentieth century, with orderly rows of trees replacing the wild ones and cutting the cost of the raw material dramatically.",
  "M|Then war intervened, as it so often does in the history of materials. Cut off from the Asian plantations in the 1940s, the industrial nations poured enormous sums into inventing synthetic rubber, made from petroleum, in a research effort second in scale only to their work on aircraft and radar. They succeeded so well that the artificial version never went away: around seventy per cent of all the rubber produced today is man-made.",
  "M|Natural rubber, however, was never fully replaced, and this is worth pausing on. The natural molecule has a combination of strength and elasticity that the factory versions still cannot quite match. For the most demanding uses of all - above all aircraft tyres, which must survive extraordinary heat and force on every single landing - only the natural material will do.",
  "M|And the story is still moving, because it contains a hidden risk. The world's rubber trees are worryingly similar genetically - most descend from that one small shipment of seeds - so a single disease could, in principle, sweep through plantations across an entire continent. Looking for insurance, researchers are now breeding an unlikely alternative crop: the dandelion, the same yellow flower you pull out of the lawn, whose roots produce a perfectly usable latex, and which grows happily in cool climates where the rubber tree cannot survive. The next aircraft you board may, in a small way, run on flowers.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock2-s1.wav" $s1
Render "mock2-s2.wav" $s2
Render "mock2-s3.wav" $s3
Render "mock2-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
