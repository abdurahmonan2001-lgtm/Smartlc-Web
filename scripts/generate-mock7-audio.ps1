# Generates the four Mock Test 7 listening recordings with Windows TTS.
# Same conventions as Mocks 1-6: "F|"/"M|" pick the voice, "P|<seconds>" is
# a silent question-preview pause; post-2020 announcer format throughout.
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
  "M|Part one. You will hear a man telephoning an arts studio to enrol in an evening pottery class. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good afternoon, Valley Arts Studio.",
  "M|Oh, hello. I picked up a leaflet about your evening pottery classes, and I'd like to sign up, if there's still a place.",
  "F|There is, yes. Let me take a few details and I'll put your name down. Could I start with your name?",
  "M|It's Farrukh Rakhimov.",
  "F|And how do you spell the surname?",
  "M|R, A, K, H, I, M, O, V. Rakhimov. People often want to put a C in it, but there isn't one.",
  "F|R, A, K, H, I, M, O, V. Thank you. Now, have you done any pottery before?",
  "M|None at all, I'm afraid. Is that going to be a problem?",
  "F|Not in the least. The class you want is the beginners course - no experience is needed, and honestly most people arrive having never touched clay in their lives.",
  "M|That's a relief. The leaflet said the class was on Tuesday evenings, I think.",
  "F|It did, and I'm sorry to say the Tuesday group is already full. It filled up in the first week. But we've opened a second group, and that one runs on Thursday evenings. There are still places free on Thursday.",
  "M|Thursday actually suits me better. And when does it start?",
  "F|The original plan was the ninth of September, but the tutor asked us to bring it forward, so the first class is now the second of September.",
  "M|The second. Good. And what time in the evening?",
  "F|Half past six until half past eight. It used to finish at eight, but everyone complained they were being sent home just as the work got interesting, so we added the extra half hour.",
  "M|Six thirty to eight thirty, then. And how long does the whole course run?",
  "F|Ten weeks. It was eight weeks when we first ran the programme, but ten works far better - you need time for the pieces to dry and be fired properly.",
  "M|Ten weeks. That sounds ideal.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Now, the practical details. We keep the classes small - a maximum of twelve students, so the tutor can get round everybody at the wheel.",
  "M|That's good to hear. And what does it cost?",
  "F|Four hundred and fifty thousand som for the ten weeks. I should say it was four hundred thousand last year - the price went up in the spring. But that figure includes all your clay and the firing, so there is nothing extra to pay later.",
  "M|Four hundred and fifty thousand, clay and firing included. Is there anything I need to bring with me?",
  "F|Just an old shirt. We don't supply aprons, and you will get clay on you - there is really no avoiding it. An old shirt is the sensible answer.",
  "M|An old shirt. Noted.",
  "F|And one piece of advice from the tutor. Do take your rings off before you sit at the wheel. Wet clay works its way underneath them and it is miserable to clean out afterwards. A watch is fine, as long as it goes in your bag.",
  "M|Rings off. I'll remember that. Now, is there anywhere to park? I'll be driving straight from work.",
  "F|Don't leave the car on the street - it's permit holders only after six and people really do get fined. There's a free car park behind the bank, about two minutes' walk from us. Students sometimes try the library car park, but that one is staff only in the evenings.",
  "M|Behind the bank. Thank you. So how do I actually enrol?",
  "F|We used to hand out paper forms, but not any more. Just complete the enrolment form on the website - it takes about two minutes - and pay a deposit of one hundred thousand som. The rest is due at the first class.",
  "M|Form on the website, and a hundred thousand deposit. That's everything, I think. Thank you very much.",
  "F|My pleasure. We'll see you on the second. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the volunteer coordinator at the Grand Avenue Community Theatre giving an induction talk to a group of new volunteers. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening everyone, and welcome to the Grand Avenue Community Theatre. I'm the volunteer coordinator, and this hour is your induction: a little history, a few rules, then a walk round the building.",
  "F|People love guessing what this place used to be. The most popular answer is a cinema, and that is half right: it was a cinema from nineteen fifty-two until nineteen eighty. But that was its second life. Go back further, to eighteen ninety, and these walls went up as the covered market for this part of the city - the fruit and vegetable market. The church that people sometimes ask about is the building next door, and it has nothing to do with us.",
  "F|Now, timings, and please write this one down. Our doors open to the public forty-five minutes before curtain up. Until last season, volunteers were asked to be here one hour before the performance, and it was never quite enough - we were still counting programmes as the first visitors walked in. So from this season, please arrive an hour and a half before the performance begins. Ninety minutes.",
  "F|Next, what to do if a member of the public is taken ill. Your instinct will be to help directly - to walk them outside for some fresh air, or to fetch them a glass of water. Please do neither of those things, however kind they seem. Both can make matters worse, and it is the duty manager who will know whether an ambulance is needed. Find the duty manager, or radio for one. That is the whole of the rule.",
  "F|And finally, people always ask me how best to prepare before a first shift. Some of you will want to learn the season's programme by heart. It is a lovely thing to know, but the box office answers those questions, not you. Others ask whether they ought to watch a few rehearsals - please do, if you enjoy it, though it won't help you much on a busy Friday evening. The genuinely useful preparation is duller than either: learn your way around the building. A volunteer who knows the building is worth three who know the programme.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right. The plan in front of you shows the ground floor, and I'll take you round it in the order you will walk it on your first evening, starting at the main entrance at the bottom of the plan.",
  "F|Come in through those doors and you are standing in the foyer, in the middle of the building. Two rooms open off the foyer, one on each side. The one on your right as you come in, in that corner of the building, is the box office - the glass window you can see from the street belongs to it.",
  "F|Directly opposite the box office, on the other side of the foyer, on your left as you enter, is the volunteers' room. That is where you sign in, leave your coat, and find the kettle.",
  "F|Now walk forward from the foyer. The auditorium is straight ahead of you in the centre of the building, with the stage beyond it at the far end. A corridor runs up each side of the auditorium, with two rooms opening off each corridor.",
  "F|Take the left-hand corridor first - the same side of the building as the volunteers' room. The first room you pass, the one nearer the foyer, is only a storeroom. Keep walking to the far end of that corridor, to the room beside the stage, and that one is the rehearsal studio. If a class is running, the light outside the door will be red.",
  "F|Now cross to the right-hand corridor, on the opposite side of the auditorium. This time it is the first room, the one nearest the foyer, that matters to you: that is the lighting control room. Never open that door during a performance. The room beyond it, further up the corridor towards the stage, is the dressing rooms, and those are private.",
  "F|That leaves the two rooms at the very top of the plan, one on either side of the stage. The one on the left, the same side as the rehearsal studio, is the green room, where the actors wait before they go on.",
  "F|And the room across from it, on the other side of the stage, is the costume store. If you are ever sent to fetch something from there, take the key from the volunteers' room first, because that door locks itself behind you.",
  "F|That is the whole ground floor. Bring your plan and we'll walk it together now.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two business students, Madina and Timur, discussing a case study of a bicycle courier company called Pedal Express. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Timur, shall we start with why the two founders set the company up at all? I assumed they couldn't find work after graduating.",
  "M|That's what I thought too, Madina, but read the second page again. Both of them had job offers. What set it off was the traffic - they were sitting in a cafe watching delivery vans crawling down the same street for twenty minutes, and one of them said a bicycle would have done it in three.",
  "F|Of course. And the bank loan?",
  "M|That came much later, and the first bank turned them down flat. It wasn't the reason they started.",
  "F|Fine, so the vans in the traffic. Next - where the money came from in year one. I've written restaurants.",
  "M|I'd check that. The restaurant work is what everybody remembers, but it doesn't appear until year two. In the first year the case study is very clear: nearly seventy per cent of their income came from law firms sending contracts and documents across the city centre.",
  "F|Law firms, you're right. And the pharmacies were later still, weren't they?",
  "M|Third year.",
  "F|So what would you say their biggest early advantage was? They weren't cheap - they charged more than the van companies.",
  "M|No, they were never the cheap option. And I know the report goes on about how friendly the riders were, but every small company says that about its staff.",
  "F|Agreed, that's not really an advantage. For me it's simply how fast they were in the centre. A guaranteed delivery inside thirty minutes, right across the middle of the city, and no van could promise that.",
  "M|That's the one. Speed in the centre.",
  "F|Then year three, when they nearly went under. That was the accident, wasn't it? The rider who broke his arm?",
  "M|That was in year three, but it barely touched the finances - the insurance covered it. The thing that nearly finished them was a rival firm arriving and cutting its prices to about half of what Pedal Express charged. They lost a third of their customers in a single quarter.",
  "F|A price war. And the new traffic rules?",
  "M|Those actually helped them - fewer cars in the centre meant more work for bikes.",
  "F|So how did they survive it? Not by cutting the riders' pay, I hope.",
  "M|They didn't, to their credit - the pay stayed the same. And the second loan was refused. What saved them was going specialist: medical deliveries. Blood samples, urgent prescriptions, test results between the clinics and the laboratory. Time-critical work that the cheap rival couldn't handle, and the hospitals paid properly for it.",
  "F|Medical deliveries. Now, the final section - the tutor wants an analysis of one wider issue.",
  "M|We could look at how they expanded into other cities.",
  "F|We could, but there are only two paragraphs of data on that. And the rider training programme is already covered in our section two, so it would repeat.",
  "M|True. Then let's take the environmental angle - what replacing a fleet of vans with thirty bicycles actually does to emissions in a city centre. There are real figures for that in the appendix.",
  "F|The environmental effect it is. That's our closing section.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Now, why is demand for bicycle couriers growing everywhere? The article lists five reasons and I don't accept all of them.",
  "M|Nor do I. The first one is solid, though - people ordering food online. That market has roughly tripled in five years, and somebody has to carry it.",
  "F|Yes, online food ordering goes in. What about bicycles being cheaper?",
  "M|They aren't, really. A courier's bike costs more than mine ever did. I'd leave that out.",
  "F|Agreed. Then there's the environmental one - customers caring more about emissions.",
  "M|People say that in surveys, certainly. But the same surveys show they choose a courier on price and speed, every time. It's a nice idea that isn't actually driving demand.",
  "F|Out, then. And government support?",
  "M|There is none. Not a single grant mentioned anywhere in the case study.",
  "F|Which leaves the restrictions on cars in city centres, and that one I would definitely keep. Half the cities in the article have closed their centres to vans during the day. That's what creates the work.",
  "M|Right - online food ordering and the car restrictions. Those are our two.",
  "F|Good. Last thing - what still has to be done before we hand it in on Monday?",
  "M|I've been through your sections and you've been through mine, so the checking is finished.",
  "F|It is. And we interviewed the founder by video on Tuesday, so that's done as well. Do we need to go back to the office?",
  "M|There's nothing left to see there. But the charts are a problem. They're pretty, and they're empty - there's no revenue on them at all. We need to put the financial data into them.",
  "F|That's mine, I'll do it tonight. And I'm afraid the introduction has to go.",
  "M|The introduction? I quite liked it.",
  "F|We wrote it in week one, before we knew what the conclusion would be. It promises a completely different assignment. It needs rewriting from the beginning.",
  "M|You're right, it does. Financial data in the charts, and a new introduction. Then we're finished.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of salt. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Today I want to talk about a substance sitting on every table in this country, costing almost nothing, and yet responsible for trade routes, taxes, wars and at least one revolution. Salt.",
  "F|Let's begin with why it mattered so much. Salt is not a luxury for the human body; it is a requirement. Your nerves and your muscles simply cannot work without it. And here is the difficulty: unlike so many other things, the body cannot manufacture it. We have to eat it, every week of our lives. Put that together with a second fact - that for most of history salt was genuinely hard to obtain - and you have the recipe for something extremely valuable.",
  "F|So how was it produced? Three methods, and they depended entirely on where you lived. On warm coastlines the work was easy and almost free. Sea water was trapped in shallow pools behind low walls, and then people simply waited, because the evaporation was done by the sun. Weeks later, a crust of white crystals was raked up off the floor of the pool.",
  "F|In colder regions, of course, that does not work - there isn't enough heat and there is far too much rain. Instead, salty water, or brine, was boiled over open fires until only the salt remained, and this was enormously expensive. Not in labour, but in fuel: the boiling consumed vast quantities of wood. Whole forests around the salt towns of northern Europe were felled and never grew back. Coal replaced the timber eventually, but that was very late in the story.",
  "F|The third method was mining. In some places salt lies underground in solid form, left behind by seas that dried up millions of years ago, and it can be cut out like stone. The most famous of these mines, in Poland, was worked for something like seven hundred years, and produced solid blocks of rock salt.",
  "F|Now, trade - because salt was rarely produced where it was needed. The most dramatic route ran across the Sahara. Slabs of salt were cut in the middle of the desert and carried south by caravans of camels, sometimes several thousand animals moving together, on journeys that took forty days. And when those slabs reached the markets of West Africa, they met a metal that the region had in abundance. The exchange rate has passed into legend: in some places and some years, salt was traded for an equal weight of gold. It sounds absurd until you remember that in those southern kingdoms you could find gold in the rivers, but no salt anywhere at all.",
  "F|Salt shaped language too. Roman soldiers received an allowance of money to buy salt, and the Latin word for salt, sal, sits inside the word we still use for the money we earn each month: salary. The Romans also built a road specifically for this trade, the Via Salaria, the salt road, which carried salt from the coastal pans inland to the capital.",
  "F|But the real reason salt was worth so much is what it did in the kitchen. Before refrigeration, the great problem of the year was surviving the winter, and salt was the main way of storing meat and fish. Its action is beautifully simple: bacteria need water in order to grow, and salt draws that water out. It is the moisture, then, that salting removes, and without it the bacteria cannot multiply and the food survives for months rather than days. Cheap salted cod, dried hard as a board, was the food that fed generations of sailors on voyages lasting a year or more - and without it the great sea crossings of the fifteenth and sixteenth centuries would not have been possible.",
  "F|Which brings us to governments. If everybody must buy a product, then a tax on that product reaches everybody, and rulers noticed this very early. Salt taxes were among the first taxes anywhere, and they were bitterly resented, because they fell just as heavily on a poor family as on a rich one - all households had to buy salt. In France the salt tax was called the gabelle, and it was so hated, and so unequally applied from province to province, that historians count it among the grievances that helped provoke the Revolution of seventeen eighty-nine. And the pattern repeated in the twentieth century. In nineteen thirty, Gandhi walked to the sea with a handful of followers, picked up a lump of natural salt from the beach, and in doing so deliberately broke the law - because the British administration held a monopoly on salt in India, and no Indian was permitted to make it. Tens of thousands followed him.",
  "F|And today? We produce more salt than ever - well over two hundred million tonnes every year. But almost none of it reaches a dinner table. The largest single use in cold countries is not food at all: it is spread on the roads in winter to keep them free of ice.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock7-s1.wav" $s1
Render "mock7-s2.wav" $s2
Render "mock7-s3.wav" $s3
Render "mock7-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
