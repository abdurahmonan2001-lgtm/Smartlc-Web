# Generates the four Upper-Inter Set 1 listening recordings with Windows TTS.
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
    "M|You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and answer the questions. All the recordings will be played once only. The test is in four parts. Now turn to part one.",
    "P|3",
  "M|Part one. You will hear a man phoning a cycle workshop about booking a repair for his bicycle. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Brookfield Cycle Workshop, good morning.",
  "M|Oh, hello. My bicycle needs some work done, and a friend of mine says you're the best place in town. Could I book it in, please?",
  "F|Of course. Let me take a few details first. Could I have your name?",
  "M|It's Rustam Nazarov.",
  "F|Could you spell the surname for me?",
  "M|Certainly. N, A, Z, A, R, O, V. Nazarov.",
  "F|N, A, Z, A, R, O, V. Thank you. And what kind of bicycle is it?",
  "M|It's a mountain bike. Silver frame. I bought it second-hand last year, so it's seen a bit of life.",
  "F|A silver mountain bike, noted. And what seems to be the trouble with it?",
  "M|The main thing is the brakes. They feel weak at the best of times, but in wet weather they hardly work at all, and there's a steep hill on my way home.",
  "F|Right, that certainly needs looking at straight away. Anything else?",
  "M|Yes, the back tyre is badly worn - there's almost no pattern left on it, so I imagine it wants replacing. The front one is fine, though; it was new in the spring.",
  "F|So that's the brakes and a rear tyre. And while it's with us we'll clean and oil the chain as well - we do that free of charge with every repair.",
  "M|Oh, very good. And what sort of cost are we looking at?",
  "F|For the parts - the brake pads, the cables and the tyre - it would be about two hundred thousand som. Actually, hold on, let me check the tyre size... no, yours takes the standard tyre, not the wide off-road one, so the parts would come to about one hundred and eighty thousand som altogether.",
  "M|One hundred and eighty. That's less than I feared, to be honest.",
  "F|Then on top of that there's the labour, which is ninety thousand som an hour, and yours is probably an hour's work.",
  "M|Understood. That all sounds reasonable.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|So when could I bring the bike in?",
  "F|Let me look at the diary. We could take it on Tuesday morning... oh no, wait - our mechanic is away on a training course on Tuesday. Wednesday morning would be fine, though.",
  "M|Wednesday morning suits me - I can drop it in on my way to work.",
  "F|Perfect. We open at half past eight, and we're here until six every weekday. Do remember we're closed on Sundays, though, in case you were thinking of the weekend.",
  "M|Noted. And when would it be ready?",
  "F|If it comes in on Wednesday morning, it will be ready for collection after four o'clock on Thursday. We need the early afternoon to road-test everything.",
  "M|After four on Thursday, lovely. Now, whereabouts are you exactly? I know the area, but I've never actually noticed the workshop.",
  "F|That's because the entrance isn't on the main road. It's in Cedar Street - that's C, E, D, A, R - directly opposite the bakery. Look for the green double doors.",
  "M|Cedar Street, opposite the bakery. Got it.",
  "F|Oh, and one thing I should ask - are you a member of the cycling club, by any chance? The one that meets at the stadium?",
  "M|I am, actually. I joined back in January.",
  "F|Then you'll get ten per cent off the whole bill. Just show your membership card when you pay - and we take card or cash at the counter, whichever you prefer.",
  "M|Ten per cent - even better. Is there anything I need to bring with the bike?",
  "F|Just one thing. Your bike has a lock fitted to the frame, I imagine? Please remember to leave the key for the lock with us, because without it we can't remove the back wheel - and then the tyre can't be changed.",
  "M|Of course - the key. I'd never have thought of that. I'll tape it to the handlebars so I don't forget.",
  "F|Wonderful. So that's Wednesday morning, then. We'll see you and the bike then, Mr Nazarov.",
  "M|Thank you very much for your help. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a guide giving an introductory talk to visitors at Halton Botanical Gardens. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome to Halton Botanical Gardens. My name's Karina, I'm one of the guides here, and before you set off to explore I'd like to tell you a little about the place and about what's happening today.",
  "F|First, a bit of history, because visitors often get this wrong. People see the grand gates and the long stone wall and assume the gardens began as the private grounds of some wealthy family. Not at all. The gardens were laid out in 1810 by the university's medical school, as a teaching collection where students training to be doctors could learn to recognise the plants their medicines came from. In those days almost every treatment began as a leaf or a root, so a garden like this mattered as much to a young doctor as a library. It only opened to the general public fifty years later.",
  "F|Now, what about today? Several of you have asked at the desk about our famous plant sale. I'm afraid that's next month - the first Saturday of October - so do come back for it. And entry today is the normal price, I'm sorry to say. But there is something special: this weekend is the city's summer festival, and to mark it the gardens are staying open until nine o'clock this evening, instead of closing at five as we usually do. The light on the lake at sunset is worth staying for, I promise you.",
  "F|A practical word about lunch. There's a lovely little cafe beside the lake, but little is the word - it has a dozen tables, and from about half past twelve you'll be queueing for a long time. You're welcome to bring your own food, but picnics are only allowed in the paved courtyard, which has very little shade on a hot day. So my honest advice is to go to the cafe early - arrive by noon and you'll walk straight in.",
  "F|One more thing before we set off. People often ask how they can support the gardens. Money, for once, is not the problem - a generous grant last year is paying for all the building work you'll see around you. And the shop is always glad of your custom, of course. But what we're truly short of is people. Every season we run a wildlife survey, counting the birds, butterflies and dragonflies that live here, and we badly need volunteers to help with the counting. No experience is needed - we train you. If you can spare one morning a month, please put your name down at the desk.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Right - let me take you round the main areas of the gardens, in the order you'll reach them from this gate.",
  "F|Straight ahead of you is the rose garden, and this summer we are especially proud of it: in June it won a national award, the Gold Medal of the Rose Society, and that's the first time any garden in this region has taken it. Expect photographers everywhere.",
  "F|Beyond it you'll see the glass roof of the orchid house, and here I'm afraid I have some disappointing news: you can't go inside at the moment. The heating system that keeps the orchids alive is being completely replaced, and the house stays shut until the work is finished - about another three weeks, we think. You can still peer in through the glass, though.",
  "F|On the slope to your left is the rock garden. It's older than it looks: it was designed in the 1920s by Edith Rowan, probably the most famous garden designer this country has produced, and it still follows her original plan stone by stone. Garden historians travel a long way to see it.",
  "F|Through the arch behind it is the herb garden. It's small at the moment - but not for much longer, because this year we're doubling its size by taking in the old vegetable plot next door. You'll see the new beds already marked out with string.",
  "F|Then comes my own favourite, the Japanese garden, with its red bridge and its maple trees. It was a gift: the city of Okayama, which is twinned with ours, presented it to mark thirty years of friendship, and even sent two of its own gardeners here to build it.",
  "F|And finally, at the far end, the arboretum - our tree collection. If you want to stand where everything began, go there: several of the oaks were planted in the gardens' very first year, so it holds the oldest plants anywhere in the gardens. Older than the wall, older than the gates.",
  "F|That's quite enough from me. Do take a map from the desk, and enjoy your day.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two statistics students, Timur and Gulnora, planning a survey about how students travel to their campus. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Gulnora, the project proposal is due on Friday, and we need to explain why we chose the topic. When I tell people we're surveying how students get to campus, they assume it's because you're always complaining about the buses.",
  "F|I do complain about the buses, Timur, and being late twice in one week did start me thinking. But that's not the reason to put in the proposal. The real point is that the university is about to redraw its parking rules - next term they decide how much of the car park to keep and whether to charge for it - and at the moment nobody has any actual data about how people travel in. If we collect it properly, the planning office might genuinely use our numbers.",
  "M|That's a much stronger justification than that article I showed you, then?",
  "F|The article was about cycling in Denmark - interesting, but it's someone else's city and someone else's data. Ours will be local and current.",
  "M|Fair enough. Next thing: how do we actually collect the answers? My first idea was interviews - standing at the campus gates with a clipboard.",
  "F|We'd be there for weeks. Two minutes per person means thirty people an hour at best, and only the ones who aren't rushing to a class. And an online form has the opposite problem: easy to send out, but the link sits in everyone's inbox, maybe one person in ten clicks it, and the ones who do aren't typical - they're just the keen ones.",
  "M|So we're back to paper, like last year's group?",
  "F|Paper, but done properly. If a lecturer gives us five minutes at the start of a lecture, everyone in the room fills the form in there and then, and we collect them at the door. The response rate is close to a hundred per cent, and it costs us a morning, not a month.",
  "M|Agreed - paper questionnaires it is. Now, the draft questions. I showed our tutor the version we wrote on Monday. Interestingly, she didn't complain about the length - she said twelve questions is fine - and she was quite relaxed about us asking which faculty people belong to.",
  "F|So what was the problem?",
  "M|Ambiguity. She circled two of the questions and said each of them could be read in different ways. The worst was - how long is your journey to campus. Half the class will answer in kilometres and the other half in minutes.",
  "F|Oh, of course. And the other one must have been - how do you usually travel - because someone who cycles in summer and takes the bus in winter has two honest answers, not one.",
  "M|Exactly. The wording has to pin down one meaning and one only.",
  "F|Now, the sample. My instinct is just to collect as many forms as we possibly can - the more the better, surely?",
  "M|That's what I thought too, until I read the chapter she set us. Size isn't the main thing. A thousand answers from the engineering building would still tell us nothing about the medical students across the river. What matters is that every faculty is represented, roughly in proportion to its numbers. Five hundred forms spread across all six faculties beat two thousand from one corner of the campus.",
  "F|You're right, and it protects us in the write-up too. So: some lectures from every faculty. First years only would have been easier - we know all their timetables - but they mostly live in the halls next to campus, so their journeys aren't typical of anybody else's.",
  "M|Agreed. Next, the pilot. Before we print five hundred copies, we should test the wording on a few people. I was going to use our own classmates.",
  "F|Bad idea, I think. Everyone in our statistics class has been studying questionnaire design for a month - they'll read it as examiners, not as ordinary respondents, and they already know what we're trying to measure. My hostel friends would be more natural, but they're nearly all in one faculty, and that brings back the same old problem.",
  "M|So we want people who know nothing about the project and come from somewhere else. My cousin is on the geography course - I could ask her seminar group. Ten people, a different faculty, no idea what we're doing.",
  "F|Perfect - a small group from another course. And one last thing about the tutor: the results. What does she actually want to see?",
  "M|Not decoration, she was very clear. She actually warned me against spending our evenings making the charts colourful, and she doesn't want the full tables in the main report either - those go in the appendix. What she insists on, for every percentage we give, is the margin of error around it, so nobody treats five hundred forms as if they were the whole university.",
  "F|Fair enough - that's the statistics, after all. A margin of error on everything, then.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "M|Can we talk about what might go wrong? I keep thinking about things that could make the results unrepresentative.",
  "F|Go on.",
  "M|Well, the obvious one is the weather. We're surveying in one single week. If it pours with rain all that week, everyone who normally cycles will be sitting on the bus, and our figures will say nobody ever cycles to this university.",
  "F|Agreed - that one's real, and we should note the weather each day so we can comment on it in the report. And I've got another: think about who is actually sitting in a daytime lecture. The part-time students - and there are a lot of them - mostly come in for evening classes. Our forms will never reach them, and they're exactly the people who travel differently, coming straight from work.",
  "M|That's a real gap, yes. We'll have to state clearly that our results describe full-time daytime students only.",
  "F|What about people answering dishonestly - claiming they cycle because it sounds healthy?",
  "M|Honestly, I can't see why anyone would lie about a bus ticket, and the form's anonymous anyway. I'd leave that worry out.",
  "F|Fine. And exams don't clash - they're in January, nowhere near our week.",
  "M|True. Oh, and someone told me new students never fill in forms. Should we worry about the first years refusing?",
  "F|The opposite, in my experience - they're the most obliging people on the whole campus. No: it's the weather and the part-timers. Those are the two we write down as serious.",
  "M|Right. So, jobs before we meet on Thursday. The lecturers won't let us into their classes without warning, so someone has to email them all this week and ask for five minutes. I'll do that tonight - I've already got the list of course leaders.",
  "F|Good. And I'll take the two problem questions and rewrite them - kilometres or minutes, summer or winter - so the new wording is ready to test on the geography group.",
  "M|What about printing the five hundred copies?",
  "F|Not yet - there's no point printing anything before the pilot. That can wait.",
  "M|And I checked the software licence, by the way - the university gives it to students free, so there's nothing to buy. And reading that Danish study can wait until we write the discussion section.",
  "F|Agreed. Emails and rewording - that's the week. To the library?",
  "M|To the library.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of bread. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good afternoon. In this series of lectures on the foods that shaped civilisation, we come today to the most fundamental of them all: bread. For most of recorded history, across most of the western world, bread has not been part of the meal - it has been the meal, with everything else merely something to put on it. And its story begins earlier than you might expect.",
  "M|For a long time, historians assumed that bread came after farming: first people learned to grow wheat, then they learned to bake. We now know it was the other way round. At a site in the desert in Jordan, archaeologists have identified crumbs of actual bread in an ancient fireplace about fourteen thousand years old - which is some four thousand years before anyone planted a crop. Those earliest loaves were flat, of course, and they were made from crushed wild grains, gathered rather than grown, mixed with water into a paste. The dough was baked on hot stones placed in the fire, and the result would have looked much like the flatbreads still made across the Middle East and Central Asia today. Some historians argue, in fact, that it was the desire for bread that pushed people towards farming in the first place. We did not invent bread because we had wheat; we tamed wheat because we wanted bread.",
  "M|The next great step happened in Egypt, and like many great steps it was almost certainly an accident. Bake your paste at once and you get flatbread. But leave the dough standing in a warm place, as some forgetful baker must have done four or five thousand years ago, and wild yeast drifts in from the air, begins to feed on the flour, and fills the dough with tiny bubbles of gas. Bake it now and the loaf rises - lighter, softer, and to most tastes far better. The Egyptians learned to keep back a piece of each day's risen dough to start the next day's batch, and with that, leavened bread was born. It made them famous: Greek travellers called the Egyptians the bread eaters. And bread sat at the very centre of their economy. Coins did not yet exist, so the workers who built the royal tombs were paid not in coins but in loaves and in beer - a skilled man might receive ten loaves a day, and surviving records show the numbers being carefully counted. Egypt gave us one more invention. To bake a tall risen loaf evenly, a hot stone is not enough, and so Egyptian bakers developed the closed clay oven, the direct ancestor of every bread oven since.",
  "M|Rome turned baking from a household craft into an industry. By the first century, the city had hundreds of large professional bakeries, some of them enormous, and the bakers formed one of the most powerful trade associations in the city. And bread in Rome was never just food; it was a message. The colour of the loaf you ate announced your status: the rich ate pale bread made from finely sifted wheat flour, while the poor ate dark, coarse loaves, and a family on its way up in the world changed its bread before it changed anything else. Pale flour was costly precisely because so much of the grain was thrown away to make it - a wastefulness only the wealthy could afford.",
  "M|The Middle Ages give us one of my favourite details in the whole story. In the great halls, diners did not eat from china or metal. Instead, thick slices of old bread, several days stale and hard as a board, were laid on the table and used as plates - trenchers, they were called. The meat and the sauce went straight onto the bread, and at the end of the meal the trencher, soaked in juices, was handed to the poor waiting at the door, or thrown to the dogs. Nothing was wasted.",
  "M|Then, in the nineteenth century, machines changed bread as they changed everything else. The new roller mills of the 1870s could do cheaply what had once been a luxury: they stripped the dark parts out of the grain and produced fine white flour in quantities no stone mill could match. White bread, for centuries the privilege of the rich, became the everyday food of the poor almost overnight. There was a cost, though, and it took decades to understand it: the parts of the grain the new mills removed - the germ and the outer coat - are precisely the parts that hold most of the goodness, and the soft white loaf was the poorer food. The twentieth century added convenience. In 1928, in the American state of Missouri, a machine was demonstrated that sliced a whole loaf ready for the table, and it was so successful that within ten years an American phrase measured every new invention against it. Factory baking accelerated again in the 1960s, when high-speed methods cut the journey from flour to finished loaf to a few hours; but these industrial loaves drew criticism too, above all for the additives mixed into the dough to keep it soft on the shelf for days.",
  "M|Which brings us to today, and to a curious turn of the wheel. Walk through any city now and you will find bakers proudly doing what every baker did before commercial yeast existed: raising their loaves slowly with sourdough, a living culture of flour and water that can be kept alive for years, sometimes for generations. The slow loaf, once the only loaf, is now the fashionable one. And bread has kept its older meanings too. In a dozen languages, the words for sharing bread became words for friendship itself - our word companion means, literally, the person you share your bread with. Fourteen thousand years after those first crumbs fell into a desert fire, bread is still doing what it has always done: feeding us, and binding us together.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset1-s1.wav" $s1
Render "upset1-s2.wav" $s2
Render "upset1-s3.wav" $s3
Render "upset1-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
