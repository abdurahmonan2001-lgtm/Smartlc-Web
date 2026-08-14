# Generates the four Upper-Inter Set 11 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a teacher phoning a coach company to book a minibus for a school day-trip. First, you have some time to look at questions one to five.",
  "P|6",
  "M|Now listen carefully and answer questions one to five.",
  "M|Brightway Coaches, good morning. How can I help?",
  "F|Oh, good morning. I'm calling from Greenside Primary School. We're planning a day-trip for one of our classes next month, and we'd like to book a minibus.",
  "M|We do school trips all the time. Let me take some details. Could I have your name, please?",
  "F|Yes, it's Farida Nazarova. I should spell the surname, because people always want to write it with an E. It's N, A, Z, A, R, O, V, A. Nazarova.",
  "M|N, A, Z, A, R, O, V, A. Thank you. And when would you like to travel?",
  "F|We were hoping for Friday the sixteenth of May.",
  "M|The sixteenth... ah, that's awkward. Our minibus goes in for its service that week, so the sixteenth isn't possible, I'm afraid. It's back on the road the following Monday. Could you manage the twenty-third instead? That's also a Friday.",
  "F|Let me look at the calendar... yes, actually the twenty-third of May is even better for us - it misses the school tests. Let's say the twenty-third.",
  "M|The twenty-third it is. And where are you off to?",
  "F|Oakford Nature Reserve. It's about an hour each way, I believe.",
  "M|About that, yes - a little less if the road is quiet. Now, how many passengers?",
  "F|Well, there are thirty children in the class, but three families have said no, so twenty-four pupils - and then three adults, myself and two parents. So twenty-seven in total.",
  "M|Twenty-seven altogether. That fits our twenty-nine-seat minibus nicely. And children always bring far more luggage than you expect, so I'd recommend the one with a trailer on the back. Boots, lunch boxes, spare clothes - it all goes in there, and the aisle stays clear.",
  "F|The trailer sounds very sensible, yes please. And can we fix the departure time? The reserve expects us at ten, so I thought we could leave at half past eight.",
  "M|Mmm, half past eight puts you right into the town traffic. I'd say leave at eight fifteen - those fifteen minutes make a surprising difference. We'd pick you up outside the school gates, if that suits.",
  "F|Eight fifteen at the gates, perfect.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "F|And we do need to be back at school by half past four, when the children are collected.",
  "M|No problem at all. If you leave the reserve at three, you'll be back at the school by four thirty comfortably. Now, the cost. For a full day - minibus, driver and fuel all included - it comes to nine hundred thousand som.",
  "F|Nine hundred thousand, that's within our budget. Do you need anything from us now?",
  "M|A deposit, to hold the date. For the large coaches it's two hundred thousand, but for the minibus it's one hundred and fifty thousand som - and we'd need that this week, I'm afraid, because May fills up very quickly.",
  "F|One hundred and fifty, this week - understood. Anything else you need?",
  "M|One document, yes. On the day, the driver must have a signed passenger list, with an emergency contact for every child. No list, no trip - that's the law, not me being difficult.",
  "F|Of course - I'll prepare the list myself. Now, the children are bound to ask: can they eat their sweets on the bus?",
  "M|I'm afraid not - there's no food on board at all. It's partly the seats and partly allergies. Water is absolutely fine, though - bottles with lids, ideally.",
  "F|Understood - we'll save the picnic for the reserve. Oh, one more thing. One of our pupils uses a wheelchair. Is that a difficulty?",
  "M|Not at all. The big coaches have a lift, but for the minibus we simply fit a ramp - it folds away under the floor. There's no extra charge; just remind me the day before.",
  "F|A ramp - that's wonderful, thank you. So how do we confirm everything?",
  "M|We used to post out booking forms, but people found the post far too slow. I'll send everything by text this afternoon - the price, the times, and the account details for the deposit. Just reply to accept.",
  "F|By text, lovely. Thank you so much - the children will be thrilled.",
  "M|Our pleasure. Speak soon.",
  "M|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear the operations manager of the Silverhill Funicular Railway briefing new staff before the railway reopens to the public. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome to the Silverhill Funicular. In three days we reopen to the public, so this morning I want to tell you what has changed while we were closed, and what visitors are going to ask you.",
  "F|First, the closure itself, because passengers will certainly raise it. People assume we shut because the carriages were worn out, and one newspaper even claimed the lower station was falling down. Neither is true. The carriages were perfectly sound, and the station needed nothing worse than a coat of paint. The real problem was at the top of the hill: the winding machinery that hauls the cars up the slope dated from the nineteen sixties, and spare parts for it simply no longer existed. Replacing that equipment took the best part of two years, and that is the whole story of the closure.",
  "F|Now, tickets. The prices have hardly moved, and I'm afraid local residents pay the same as everyone else - a discount scheme was discussed, and dropped. You can buy online if you like, but nobody has to; the ticket office and the machines take cards and cash. The genuinely new thing is this: every ticket is now valid for the whole day, so passengers can ride up and down as many times as they like. Families love that, so do point it out.",
  "F|Weather. Under the old rules, the moment ice formed on the rails we stopped running altogether, and everybody stood at the bottom feeling cold. The new carriages have a braking system designed for exactly those conditions, so from now on, in icy weather the service continues, but at half the usual speed - the journey takes eight minutes instead of four, and nobody minds. We did consider carrying fewer passengers in each car instead, but the engineers say it makes no difference. We only stop completely for lightning, which is rare.",
  "F|One more general point. Between twelve and two the queue at the bottom can reach forty minutes, and the terrace gets uncomfortably full. When visitors ask for advice, tell them honestly that the quietest hours are before eleven and after three - anyone who wants the hill to themselves should simply avoid the middle of the day. People sometimes ask whether weekdays are quieter. A little, but the real difference is the time of day, not the day of the week - and booking online saves no time at busy periods, because the queue is for the carriages, not the tickets.",
  "M|Before you hear the rest of the briefing, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Now let me walk you round the railway itself, from the bottom of the hill to the top.",
  "F|The lower station is where visitors form their first impression. The building has been repainted, of course, but the change everyone notices is inside: the old storeroom has become a cafe - proper coffee, and cakes from the bakery in town. There is no cafe at the top any more, by the way - the kiosk up there has closed for good - so if passengers ask where to eat, the answer is the lower station.",
  "F|The upper station is the one part of the project that is not quite done. The booking hall is ready, but the waiting room is still being plastered and painted, so parts of the building are behind screens for another month. Passengers can walk through perfectly safely - just warn them about the noise on weekday mornings.",
  "F|The carriages will surprise people. Underneath, they are completely new - new frames, new brakes, new electronics. But the panelling, the seats and the deep red paint were all copied faithfully from old photographs, so they look exactly as they did when the line opened in nineteen twelve. Visitors will swear we simply polished the originals.",
  "F|The engine room at the top is, I promise you, the most impressive sight on the hill - but it is a working machine space, and nobody wanders in. It can only be seen on a guided tour, which runs on Saturdays and must be booked at the ticket office.",
  "F|Beside the upper station is the new viewing platform, and I want you to know its story, because it is a good one. The railway did not pay for it. The money was raised entirely by donations from local people - more than three thousand of them - and their names are engraved along the railing.",
  "F|And finally the footpath, which zigzags down the hillside beside the track. Plenty of visitors like to ride up and walk down, and the path costs nothing to use - though after rain, do warn people that the lower section gets slippery.",
  "F|Right - questions in a moment, but first, let's go and look at those carriages.",
  "M|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two biology students, Aziz and Kamola, discussing their project on urban foxes. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Right, Kamola - the draft introduction. I've written that we chose urban foxes because Dr Melieva suggested the topic. That is true, isn't it?",
  "F|Not really, Aziz. She approved it, but the suggestion didn't come from her - and it wasn't that television documentary either; I only watched that afterwards, for background. What actually happened is that last spring a fox family moved in behind my apartment block, and I watched the cubs from my balcony every evening for a month. After that I couldn't think about anything else.",
  "M|That's a much better opening. Now, methods. The examiner will ask how we tell one animal from another. I had assumed we'd fit radio collars.",
  "F|Collars need a licence, and the paperwork takes the best part of a year - we'd graduate first. And ear tags mean trapping the animals, which the university won't allow for an undergraduate project. But honestly, we don't need either. Look at the photographs: every fox has its own pattern - the white tip of the tail, the dark smudges on the face and legs. After a dozen clips you can name each fox at a glance.",
  "M|From the coats alone - agreed. Now I have to confess something about the first week of recording. The footage was nearly useless.",
  "F|The cameras weren't stolen, were they?",
  "M|No, no - they were chained to the trees, and the batteries lasted the whole week; all of that was fine. The problem was the neighbourhood cats. The cats set the cameras off all night - I had nine hundred clips, and the memory cards were full by two in the morning. I've raised the cameras and narrowed the sensors now.",
  "F|Nine hundred videos of cats. Marvellous. Now, the timing question, because it decides our whole schedule. I always assumed foxes were creatures of midnight.",
  "M|So did I, but the footage says otherwise - between eleven and three there's remarkably little. And just after sunset they do emerge, but there are still too many people and dogs about, so the foxes stay in cover and you see almost nothing.",
  "F|Whereas the clips from the hour before sunrise are extraordinary - the streets are empty and the foxes patrol the gardens completely openly. So if we want to observe them live, we agree it has to be before dawn?",
  "M|Before dawn it is. I'll bring the coffee. And the residents - you did the doorstep interviews. Anything useful?",
  "F|Very. I expected endless complaints about noise, but there were only one or two. One man has put a net over his vegetable beds, but nobody else tries to keep the animals out. The important thing for us is that several households put food out for the foxes every night - chicken scraps, even tins of dog food. Deliberately, on a plate. That changes where the foxes go, so we can't ignore it.",
  "M|We certainly can't. And when you showed Dr Melieva the first month of data, what was her advice?",
  "F|She was firm about two things we should not do: no mapping of territories, because that needs a full year of data, and no counting cubs, because we'd have to approach the dens. What she wants is for us to compare our results with the published studies of countryside foxes. Apparently the differences in diet and range are dramatic, and that comparison would give the project a real argument.",
  "M|City fox against country fox. I like it.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "M|Now, the interim report needs a section on weaknesses. Which ones do we admit to? Someone in the seminar said studying a single district was a fatal flaw.",
  "F|I asked Dr Melieva about exactly that, and she said depth in one district is worth more than thin data from five. So no, not that. And the rain? A few clips are blurred.",
  "M|Only from three wet nights out of forty - I checked, and the counts from those nights match the dry ones. What worries me is different: the same fox may appear at two cameras in one night, and if we're careless we count one animal twice. We need to cross-check identities every single morning.",
  "F|Agreed - that goes in the report. And the other serious one, surely, is time. Six weeks is simply a very short time in a fox's year - no breeding season, no winter. We have to admit the study is a snapshot.",
  "M|Yes. Those two, then - the double counting and the short period. Nothing else rises to serious. Someone also suggested the cameras might frighten the animals, but they're silent and infrared; the foxes walk straight past them.",
  "F|They do. Right - next steps. My cousin has offered to put up posters asking people to report fox sightings.",
  "M|Kind of him, but public sightings are hopeless as data - half the reports would turn out to be cats. And I thought about moving a camera to the park, but the council would take weeks to give permission, so not yet. What we can do straight away is ask the residents about feeding - a short questionnaire, five doors in each street, so we know exactly who feeds and when.",
  "F|Good - I'll draft the questions tonight. And the other job is the backlog: we have forty hours of clips that nobody has watched properly. We should start coding the footage this weekend - species, time, individual, behaviour, straight into the spreadsheet.",
  "M|Questionnaire and coding, then. And no, before you ask - we are not spending another Sunday looking for tracks along the canal. Last time we found two dog prints and a shopping trolley.",
  "F|Agreed. The foxes can keep the canal.",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of cheese. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. Today we turn to one of the oldest manufactured foods on earth - cheese. Every supermarket sells a hundred kinds of it, yet almost nobody stops to ask where the idea came from, and the answer takes us back a very long way indeed.",
  "M|Cheese was almost certainly discovered by accident, more than eight thousand years ago, soon after people first began keeping sheep and goats. The likeliest story involves transport. Herders carried milk in bags made from the stomach of a sheep or a goat - the ancient world's waterproof container. Now, the lining of such a bag naturally contains rennet, the very substance cheesemakers still use today, and on a warm day's journey the milk separated into solid curds and a thin liquid called whey. Some traveller opened the bag expecting a drink and found, instead, the first fresh cheese.",
  "M|Whatever the exact circumstances, the discovery solved an urgent problem. Fresh milk spoils within hours, but the curds, once pressed and salted, kept for months without spoiling - a way of storing the goodness of summer milk deep into the winter. And there was a second advantage, invisible at the time. In cheesemaking, most of the milk sugar drains away with the whey, which explains something you may have noticed: many adults who cannot digest fresh milk can eat cheese quite comfortably.",
  "M|The ancient world took cheese for granted. Roman soldiers received hard cheese as part of their daily rations, because it was light, it lasted, and it needed no cooking. Roman writers described cheesemaking in remarkable detail - the breeds, the seasons, the storage rooms - and as the legions marched, the army carried those techniques to every corner of the empire.",
  "M|When the empire collapsed, much of that knowledge survived in one institution above all: the monasteries. Monks had land, animals, patience and written records - the perfect combination - and many of the cheeses still famous today were first made by monks, refined over centuries behind abbey walls. Elsewhere, in the high mountain valleys, villages pooled their milk each summer to make enormous wheels that would feed families through the snowed-in months. And cheese was real money. In several regions villagers could pay their taxes in wheels of cheese, and rents were settled the same way - a currency you could eat.",
  "M|The nineteenth century changed everything, twice. First came the science. In the eighteen sixties Louis Pasteur showed that gentle heating destroys the harmful microbes in milk without ruining its flavour, and cheesemaking slowly moved from folk knowledge to controlled process. Second came the scale. In eighteen fifty-one the first cheese factory opened in the United States, pooling the milk of dozens of farms, and the idea spread quickly. Factory cheese was cheap, safe and always identical - which was exactly its virtue, and, its critics said, exactly its problem.",
  "M|And that brings us to the present day. World production is now led by Europe and the United States, and it is enormous - well over twenty million tonnes a year. Yet the old local traditions have not disappeared; if anything, the law now defends them. Many famous names are legally protected, so a cheese carrying one of those names may only be made in its home region, by the traditional method - a rule defended as fiercely as any trademark. And science has returned with new tools: researchers are using DNA tests to study the mould that ripens each traditional cheese, and they keep finding that every cellar, sometimes every single farm, has a microscopic signature of its own. Eight thousand years after that first surprised traveller, we are still discovering what is actually happening inside a wheel of cheese.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset11-s1.wav" $s1
Render "upset11-s2.wav" $s2
Render "upset11-s3.wav" $s3
Render "upset11-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
