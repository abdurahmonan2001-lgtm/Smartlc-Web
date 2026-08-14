# Generates the four Upper-Inter Set 14 listening recordings with Windows TTS.
# Same conventions as the mock scripts: "F|"/"M|" pick the voice, "P|<seconds>"
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
  "M|Part one. You will hear a student telephoning a company to confirm gown hire and photography for her graduation ceremony. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good morning, Milestone Ceremonies. How can I help?",
  "F|Oh, hello. I'm graduating from City University this summer, and my department said you handle the gowns and the official photographs. I'd like to get everything confirmed, please.",
  "M|Of course. That will be the ceremony in the Great Hall on the fourth of July. Let me open a booking. Could I take your name?",
  "F|Yes, it's Kamola Nazarova.",
  "M|Would you spell the surname for me? I'd rather not guess.",
  "F|Certainly. N, A, Z, A, R, O, V, A. Nazarova.",
  "M|N, A, Z, A, R, O, V, A. Thank you. Now, your student number - it's the six digits on your university card.",
  "F|It's three zero eight, five six two.",
  "M|Three zero eight, six five two?",
  "F|No, five six two. Three zero eight, five six two.",
  "M|Five six two. Got it. And which degree will you be receiving? We print it under the photograph, so it has to be exactly right.",
  "F|Chemistry. Just Chemistry - there's no second subject attached.",
  "M|Chemistry, lovely. Now the gown itself. We don't work from clothing sizes - gowns are sized by height. How tall are you?",
  "F|About a hundred and sixty centimetres... no, wait - they measured us for lab coats last month and I was a bit more than I thought. Put down a hundred and sixty-five.",
  "M|A hundred and sixty-five centimetres - that's a medium gown, no problem. And every graduate wears a hood in their faculty colour. Do you know yours?",
  "F|My flatmate graduated last year and hers was purple. Will mine be purple too?",
  "M|Purple is the Business school, I'm afraid. You're in the faculty of Science, so your hood will be gold.",
  "F|Gold - even better.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|Can we talk about money? What does the gown cost?",
  "M|The hire fee is a hundred and eighty thousand som, and that includes the cleaning - there's nothing extra to pay for that. There is also a deposit. It used to be two hundred thousand, but it went up this year, so it's now two hundred and fifty thousand som. You get every som of it back, as long as the gown comes home undamaged.",
  "F|Two hundred and fifty, fine. And where do I actually collect the gown on the day?",
  "M|Good question, because it's changed. Last year our desk was over in the sports hall and half the graduates got lost looking for it, so this year we're in the foyer of the Great Hall - you'll walk straight past us on your way in. The desk opens at half past eight.",
  "F|The foyer - much more sensible. And when does the gown go back?",
  "M|By six in the evening, please. I have to warn you: late returns lose the whole deposit.",
  "F|Understood. Now, the photographs. What are the choices?",
  "M|Three packages. The standard is just the moment on stage as you're handed the certificate. The classic adds a framed portrait. And the premium includes everything - the pictures taken in the studio as well as on the stage.",
  "F|I was going to say the classic... but my grandmother has been talking about a proper studio portrait for months. Go on - make it the premium.",
  "M|The premium it is. And how quickly will you want the pictures?",
  "F|As soon as possible - my parents fly home in the middle of July.",
  "M|Then you're in luck. Normally we say two weeks, but we take on extra editors in graduation season, so for July ceremonies it's ten days, and everything arrives as digital files.",
  "F|Ten days - that's before they leave. Wonderful. Thank you so much.",
  "M|A pleasure. Congratulations, and we'll see you on the fourth of July.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the coordinator of a new city ice rink briefing staff and volunteers about its opening week. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming in before we open on Monday. After three years of planning, the city finally has its own ice rink, and by the end of this briefing I want everyone to know exactly how the first week will run.",
  "F|Let me start with the question I'm asked every single day: who paid for all this? Most people assume it was the city council. In fact, the council could only find about a quarter of the money. This building exists because our application to the national sports fund was successful - that grant covered most of the construction costs. Local businesses helped as well, and I'll come back to one of them in a moment, but the fund is the reason we're standing here.",
  "F|Now, last month we ran three test sessions with invited families, and they taught us a lot. We knew the children would love it, and they did. And the tickets went quickly, though frankly we expected that. What genuinely surprised us was the adults: more than seventy of them asked, completely unprompted, about lessons for themselves. We'd assumed adult classes would be a quiet corner of the timetable, and we've had to double them before opening day. The ice machines, in case anyone is worried, behaved perfectly all month.",
  "F|Opening day itself needs care, because it's different from the posters. The posters give our normal opening time, ten in the morning, and from Tuesday onwards that's exactly right. But on Monday the morning belongs to the schools and the official ceremony, so the doors open to the public at two in the afternoon. If people arrive at ten on Monday, please explain politely and point them to the cafe.",
  "F|One more thing before we walk the building: queues. Saturday will be enormous, and the ticket desk will struggle. When visitors ask how to avoid the wait, the answer is simple: book on the website. Online bookings have their own entrance on the left and go straight through. Coming on a weekday morning won't help - that's when the school groups are in - and the evenings will honestly be the busiest hours of all.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Right - the building, area by area, in the order you'll show visitors round.",
  "F|First, the beginners' area. It's the short stretch of ice at the far end, and it's separated from the main ice by a low barrier, so new skaters can find their feet without faster skaters flying past their elbows.",
  "F|Next door is the equipment shop, and I'm afraid there's bad news there: the first delivery of stock is stuck at the border, so the shop will open later than the rest of the building - week two, realistically. Until then, send people to the hire desk.",
  "F|The cafe upstairs, on the other hand, is completely ready, and it's a story worth telling visitors: everything in it - the ovens, the furniture, even the espresso machine - was paid for by Polar Bakery, the family firm from Winter Street. Their name is above the counter, and they've earned every centimetre of it.",
  "F|Now, the sessions. The family session runs every morning at ten, and numbers are capped so that small children have room to fall over safely. For that session, booking in advance is essential - we will be turning away anyone who just walks up, so please warn people.",
  "F|The late-night session, Fridays and Saturdays from nine, with music and coloured lights - I can save you some conversations here, because every place for the whole of opening week has sold out. Not one ticket left, so don't let anyone queue for it.",
  "F|And finally, the viewing gallery, up the stairs beside the main entrance. It costs nothing at all: anyone can go up and watch for as long as they like without paying a thing. Mention it to grandparents - they love it.",
  "F|That's the tour. Skates on, everyone - let's walk the ice before the whole city arrives.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two final-year biology students, Timur and Laylo, planning their research poster for the end-of-year exhibition. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|So, Timur - three years of green roofs and insect traps, and it all has to fit on one sheet of paper. Where do we start?",
  "M|By deciding what the poster is actually for. My instinct is to squeeze the whole dissertation onto it - every method, every table, every number.",
  "F|And that's exactly the classic mistake. Remember what Dr Usmanova told us: a poster is an invitation, not the whole dissertation. Its job is to make people stop, look, and ask us questions - the conversation is where the marks are.",
  "M|Fair enough. The poster starts conversations, and we finish them.",
  "F|Exactly. Did you look through the photos of last year's exhibition?",
  "M|I did, and it wasn't what I expected. The print quality was actually better than I'd feared, and most of the titles were perfectly fine. The real problem was the amount of text. Some posters were a solid wall of writing - eight hundred, a thousand words - and you could watch visitors read one line and drift away.",
  "F|So we set ourselves a limit. Three hundred words, not one more.",
  "M|Agreed. Now - my draft chart. Be honest.",
  "F|Honestly? The colours came out fine on the test print, and two variables is exactly the right amount. But I stood a metre back from it, the way a visitor would, and I couldn't read the axis labels at all. They're tiny.",
  "M|Then I'll double the label size tonight. Better to hear it from you than at the exhibition.",
  "F|Next decision: printing. The online company is about thirty per cent cheaper than anywhere else.",
  "M|Cheaper, yes - but delivery takes up to eight days, and if it arrives creased there's no time for a reprint. The department's own printer only goes up to A3, which is useless for a poster. At the university print room we pay a little more, but we can collect the same day and check it on the spot.",
  "F|Same-day and checkable beats cheap. The print room it is.",
  "M|Title next. I had a question as the title - Do green roofs help insects? A question pulls people in, doesn't it?",
  "F|Mm - a question sounds inviting, but think about a visitor scanning fifty posters. They want the answer, not homework. And no jokes, please - the medics tried funny titles last year and it just looked desperate. The strongest titles state the main finding. Ours would be: Green roofs double insect life in the city centre.",
  "M|Straight to the result. You're right - that's our title.",
  "F|Last thing for today: the exhibition afternoon itself. Should we each script a one-minute summary?",
  "M|We tried scripts at the conference practice, remember? Word for word - and we sounded like robots. And printed handouts are officially discouraged now; all that paper ends up in the bin by five o'clock. Simpler idea: we take turns at the poster, an hour on, an hour off. One of us is always there, and we each still get to see everyone else's work.",
  "F|Turns it is. I'll draw up a rota tonight.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|You know what the discussion section still needs? One honest line about why the project worked. Everyone will ask what we'd tell next year's students, and we should agree on the answer now.",
  "M|For me it was the pilot study, no contest. Those two trial roofs in October showed us the traps flooded in heavy rain, and we fixed the design before the real fieldwork began. Without that, we'd have lost the whole spring.",
  "F|Completely agreed - the pilot saved us. And I'd add the weekly meetings. Every Friday, even when there was nothing new to say. It meant no problem ever sat unsolved for more than a few days.",
  "M|The pilot and the meetings, then. Though people will expect us to name Dr Usmanova's advice.",
  "F|She was wonderful when we could reach her, but she was on sabbatical the whole autumn - we mostly solved things ourselves. And I wouldn't mention the identification software either. It kept labelling every small beetle as the same species; you re-checked half the photographs by hand.",
  "M|True. And access to roofs was a struggle, not a strength - eleven building managers said no before we finally had our six sites. So: the pilot and the meetings. That's our answer.",
  "F|Good. Now, before the file goes for printing - is anything still missing from the poster itself?",
  "M|You said the examiners' checklist wants results to be traceable. A full reference list would eat a hundred of our three hundred words.",
  "F|It would - but the new rule lets us put a QR code in the corner instead, linking to the full data and the references together. One small square instead of a hundred words.",
  "M|A QR code - perfect. Anything else?",
  "F|An acknowledgements line. The building managers gave us their roofs for a whole year; their names belong on the poster. Two lines at the bottom, no more.",
  "M|Agreed. What about that photograph of the insect traps you took in spring?",
  "F|I looked again - it's far too blurry to survive printing at poster size. And before you suggest it, a map of the six sites would just be six dots scattered across the city. It tells nobody anything.",
  "M|Fine - the code and the acknowledgements, and we print on Thursday.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of underwater diving. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. This is the final lecture in our series on exploration, and we finish by going in the one direction we haven't yet tried: straight down, under the sea. The story of diving is a journey completed in stages, with each invention letting people go a little deeper, and stay a little longer, than the generation before. Looking back across it, you can watch human beings slowly winning an argument with their own bodies.",
  "M|For thousands of years there was only one way to work under water: you took a breath at the surface and you held it. Breath-hold divers are as old as coastal life itself. They gathered food, naturally, and they brought up shells and sponges - the natural sponge was so valuable in the ancient Mediterranean that whole island communities lived on the trade. Divers had military careers too: Greek writers describe war divers who swam out in darkness and cut the anchor cables of enemy ships, setting whole fleets drifting onto the rocks. But the body set hard limits. A trained diver of the ancient world could stay under for about two minutes, and reach a depth of perhaps twenty metres. Beyond that, flesh and lungs simply refused.",
  "M|The first extension came not from the body but from a container. By the sixteenth century, engineers had understood that a large bell, turned upside down and lowered carefully into the sea, keeps a pocket of air trapped inside it. A diver could work on the seabed and return to the bell, again and again, to breathe. The weakness was obvious: the trapped air turned stale within minutes. In sixteen ninety the astronomer Edmond Halley - the same Halley whose name rides on a comet - solved it in a way that seems simple only afterwards: fresh air was sent down from the surface in weighted barrels, each one tipped and emptied into the bell so that the air inside was continually renewed. Divers could now stay below for an hour or more, and bells began earning serious money, used above all to recover cargo from sunken wrecks. One Swedish operation lifted more than fifty bronze cannon from a warship lying thirty metres down - with equipment a village blacksmith could have made.",
  "M|Still, the bell chained the diver to one spot. The next step was to give each diver a personal air supply, and it came in the eighteen thirties from Augustus Siebe, a German-born engineer working in London. Siebe joined a metal helmet to a waterproof canvas suit, with air pumped down from the surface through a flexible hose. For nearly a century this suit was the working uniform of the underwater world: men in Siebe's copper helmets built bridge foundations, repaired harbour walls, and walked the decks of ships that had sunk a generation earlier. But the suit revealed a new enemy. Divers who rose too quickly were seized by agonising pain in the joints - a sometimes fatal illness, which the divers themselves named the bends. The cause was found only decades later: bubbles of gas forming in the blood as the pressure drops. The cure, we now know, is patience - rising slowly, in careful stages.",
  "M|The final act belongs to France, in nineteen forty-three, when Jacques Cousteau and the engineer Emile Gagnan built the aqualung. The idea was elegantly simple: divers carried compressed air in cylinders on the back, and a demand valve released it only at the moment they breathed in. No hose, no bell, no helmet the weight of a stove - for the first time in history, a diver was a free swimmer in open water. After the Second World War, diving became a popular leisure activity, and today millions of people every year put on the aqualung's descendants simply to look at fish. As for the dangerous industrial work - inspecting pipelines, repairing the legs of drilling platforms - much of it has left human hands altogether: it is now mostly done by robots, machines that dive to depths no body could survive while their operators sit dry above. From a single held breath to a machine four kilometres down: the journey took three thousand years, and it was completed one careful invention at a time.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset14-s1.wav" $s1
Render "upset14-s2.wav" $s2
Render "upset14-s3.wav" $s3
Render "upset14-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
