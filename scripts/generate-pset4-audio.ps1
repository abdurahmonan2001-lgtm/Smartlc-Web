# Generates the four Practice Set 4 listening recordings with Windows TTS.
# Same conventions as the mock tests: "F|"/"M|" pick the voice, "P|<seconds>"
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
  "M|Part one. You will hear a woman telephoning a car hire company to book a car for a week. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Skyline Car Hire, good afternoon. Rustam speaking.",
  "F|Oh, good afternoon. I'd like to book a car for a week in July, please. Seven days.",
  "M|Certainly. All our weekly bookings come with unlimited mileage, so you can drive as far as you like at no extra charge. Can I start with your name?",
  "F|Yes, it's Dilnoza Ergasheva.",
  "M|Could you spell the surname for me?",
  "F|Of course. E, R, G, A, S, H, E, V, A. Ergasheva.",
  "M|Lovely, thank you. And what type of car did you have in mind? Most customers take a saloon.",
  "F|I did wonder about a saloon, but there will be four of us, and we're taking camping equipment - a tent, sleeping bags, cooking things.",
  "M|Ah, then a saloon boot will be far too small. I'd suggest an estate. You lose nothing on comfort, and you get more than twice the luggage space.",
  "F|An estate it is, then.",
  "M|Now, dates. When would you like to collect the car?",
  "F|Well, we fly in on the eleventh of July, so I thought the eleventh.",
  "M|What time does the flight land?",
  "F|Just after eleven at night, I'm afraid.",
  "M|Then the eleventh won't work - the desk will be shut long before you're through with your bags. Let's make it the twelfth, first thing in the morning.",
  "F|The twelfth. Fine. And how much is the estate per day?",
  "M|The automatic is five hundred and fifty thousand som a day - but honestly, take the manual. That one is four hundred and fifty thousand a day, and it's the same car otherwise. And on a weekly booking, the seventh day is free.",
  "F|Four hundred and fifty, and a free day. Good. What about insurance?",
  "M|Full cover is included in the price. And ours is better than most, because it also covers the tyres and the windscreen. Most companies make you pay separately for those, and on mountain roads it's the windscreen that suffers.",
  "F|That's reassuring.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|There is one payment I should mention - the deposit. We hold five hundred thousand som on your card when you collect the car, and it's released as soon as the car comes back undamaged.",
  "F|Five hundred thousand. Understood. And where do I pick the car up? Your city-centre office?",
  "M|Normally yes, but the city-centre branch is closed for repairs until the autumn - the whole building is being done up. So you'd collect from our airport office instead, which rather suits you anyway, since you're flying in.",
  "F|The airport office. Much easier, actually.",
  "M|Now, fuel. The car will have a full tank when you take it, and we ask you to return it with a full tank as well. There's a petrol station two minutes from the airport, so fill up there on your way back.",
  "F|A full tank both ways. Fine.",
  "M|And since you mentioned camping - I'll add a roof rack to the booking, free of charge. We normally rent those out, but in July we include one with every estate.",
  "F|A free roof rack - wonderful. That's the tent solved.",
  "M|One or two practical things before you go. Bring your driving licence, and we do need both the card and the paper part. The office opens at eight every morning, so come any time after that. And shall I send your confirmation by text?",
  "F|Actually, my phone has a habit of eating messages. Could you send it by email instead?",
  "M|By email, of course. Do check your junk folder - our messages sometimes land there. And one last thing: if your plans change, cancellation is free up to forty-eight hours before pick-up.",
  "F|Perfect. Thank you so much - you've been very helpful.",
  "M|A pleasure. We'll see you on the twelfth. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the organiser of the new Bridgefield evening food market talking to local traders who are interested in taking a stall. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming. You're all here because you've asked about a stall at Bridgefield's new evening food market, so let me tell you exactly where things stand.",
  "F|First, the site, because I've heard three different rumours this week. We did look hard at the main square - it's the obvious place - but the buildings around it are people's homes, and the residents made it very clear they did not want noise under their windows late every week. Some of you suggested the station forecourt, and we went and measured it, and it simply isn't big enough for more than a dozen stalls. So the market will be held on the riverside car park. It's flat, it's well lit, and there's room for sixty stalls with space to walk between them.",
  "F|Timing. The council originally wanted us to run every evening right through the summer, as a trial, and frankly we don't have enough traders for that. Once a month was the other suggestion, and the traders we consulted said a monthly market never builds a habit - people forget you exist. So we've settled in the middle: every Friday evening, five o'clock until ten.",
  "F|Now, what you have to do before you can trade with us. You do not need your own insurance - the market's policy covers every stallholder, and that's included in your pitch fee. The food-hygiene course people keep asking me about is only compulsory if you're cooking on site; for everyone else it is recommended, nothing more. But what every single stallholder must do, before their first market, is pay a deposit. It is returnable - you get every som back when you leave us, provided your pitch is left clean - but nobody trades without paying it.",
  "F|Vehicles. You can drive onto the site from four o'clock to unload - and then your van must come off the site before we open at five. The fire officer was absolutely firm about that, so there is no parking behind the stalls, I'm sorry. The station car park is three minutes away, and traders get a reduced evening rate there - not free, I'm afraid, but cheap.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Now let me walk you around the plan, area by area.",
  "F|The hot-food section sits at the far end, along the river wall. And I want to be completely clear about this one: it is the only part of the market where cooking is permitted. Gas, grills, fryers - all of that happens there and nowhere else, because that is where the safety equipment and the extinguishers will be.",
  "F|The bakery stalls. We've put those right beside the entrance - the nearest pitches to the gate - for the simple reason that nothing pulls people in off the street like the smell of fresh bread.",
  "F|The fruit and vegetable stalls. Now, if you're holding one of the printed plans we sent out last month, please cross that section out, because they are not where the plan shows them. The generator has to sit in that corner, and nobody wants to sell peaches next to a generator, so the fruit and vegetable stalls have moved across to the river side. The plan on the website is correct; the printed one is not.",
  "F|The drinks tent. We're doing something a little different there. The catering students from Bridgefield College will run it from start to finish - it counts towards their course, they keep the takings, and their tutors will be on site with them.",
  "F|The dessert stalls. I'll be honest with you: we have places for six, and we have received nineteen applications. So there is a waiting list, and if dessert is your trade, get your form in quickly.",
  "F|And finally the seating area, in the middle of the site. Here's something not everyone realises: it will be open from two in the afternoon, hours before the stalls - the only part of the market that is - so that office workers can bring their lunch, get to know the place, and still be sitting there when you all open at five.",
  "F|Right. Forms are at the back, and the deposit desk is by the door. Let's make this a good one.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two linguistics students, Aziz and Kamila, discussing their project to build a corpus of local radio speech. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Aziz, the project report needs a background section - why local radio? We should get our story straight.",
  "M|Well, it wasn't Dr Alimova's idea, whatever people in the department think. She actually suggested television, remember - we had to talk her out of it.",
  "F|We did. And it wasn't that corpus project that won the faculty prize last year, either - that was about newspaper language. Nothing to do with speech at all.",
  "M|No. The real reason is much simpler: we searched the national spoken corpus, and there is not one single recording from our region in it. Every sample comes from the capital. If we don't record our own speech, nobody will.",
  "F|Exactly - and that's our opening paragraph. Now, we should be honest in the report about the first batch of recordings.",
  "M|The disaster week. Go on.",
  "F|Well, the file sizes weren't the problem - people warned us they'd be enormous, and actually the drive swallowed them easily. And the presenters were fine - nice and clear, not too fast at all.",
  "M|The problem was the music. The morning show plays music underneath the talk, quietly, the whole time - and once voice and music are mixed together, you cannot pull them apart. Whole stretches were impossible to transcribe. We lost about four hours of material.",
  "F|So from now on we only record the programmes with clean speech. Right - the meeting with the station manager. What goes in the report?",
  "M|He was far more relaxed than I expected. There's normally a licensing fee for reusing broadcast material, but he waived it completely, because it's research.",
  "F|And he said he'd be pleased if we mentioned the station by name in the report - but he stressed that that's entirely up to us.",
  "M|The one thing he would not bend on was consent. Every guest whose voice goes into the corpus has to sign a form - written consent, no exceptions. He emailed us the template the same afternoon.",
  "F|Fair enough. Now, the phone-in callers. I've been transcribing them all week, and honestly, they're gold.",
  "M|Because they talk about local issues?",
  "F|That's interesting for the council, maybe, but it's not the point for us. Listen to the presenters - they smooth their speech out, they avoid every regional word. The callers don't. Yesterday one man used five dialect words in a single sentence. The callers use far more dialect than the presenters ever do - that's the value.",
  "M|Agreed - that goes in bold. Now, transcription. At our current speed we will still be typing at graduation.",
  "F|We could split the recordings between us fifty-fifty, but we'd still never finish. And paying another student is out - we spent the equipment money.",
  "M|So we do what the Manchester project did: from every programme, we transcribe one ten-minute section in full, and simply log the rest. Agreed?",
  "F|Agreed - one section from each. Which brings us to what we do next, because the vowel analysis has to wait until the transcripts are solid.",
  "M|Next is the boring job: a proper catalogue. Every recording gets a number, a date, a programme name and a list of speakers. Without an index, the corpus is just a heap of files nobody can use.",
  "F|The catalogue first, then. And not the second radio station - one station is plenty for this year.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Let's fix the final list of programmes, once and for all. The early-morning news bulletins?",
  "M|Out. Every word of a bulletin is scripted - it's written language read aloud, and we want real speech.",
  "F|Out they go. The afternoon phone-in stays, obviously - that's our best material by a mile.",
  "M|Definitely in. The cookery programme?",
  "F|I fought for it, but no - the presenter reads the recipes straight off a card. It's the bulletin problem all over again.",
  "M|Out, then. The interviews with visiting guests? The writers, the musicians - the wrestler last month?",
  "F|In, absolutely. Real unscripted conversation, and the guests come from every corner of the region.",
  "M|So: the phone-in and the interviews. And the sports commentary is out too - I tried a sample, and the crowd noise is even worse than the music was.",
  "F|In fairness, you did warn me. Now - the end of term. What's actually left to do?",
  "M|Well, the hard drive is bought and sitting on my desk, so forget that. And the ethics approval came through in October - signed and filed.",
  "F|And the seminar presentation isn't until next term, so that's not urgent either. Which leaves two real jobs. First, the speaker descriptions: for every voice in the corpus, a short profile - age, home town, occupation. The researchers who use this after us will need that, or the whole thing is useless.",
  "M|And second, quality. We take a sample of the transcripts and check it word by word against the audio, and we write down the error rate. If it's high, everything gets rechecked.",
  "F|Speaker profiles and the transcript check. That's the term, then. Tea?",
  "M|Tea.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of neon signs. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good afternoon. Tonight, when you walk home past the shopfronts, look up. Here and there, among the flat glowing panels, you may still see a sign written in bent tubes of coloured light. That is neon - and its story runs through chemistry, art and business for more than a century.",
  "F|Let's begin with the gas itself. Neon is all around us in this room: it is one of the rare gases present in tiny amounts in ordinary air - a few parts in every hundred thousand. It was found in London, in 1898, by two chemists who were studying liquid air. They cooled air until it condensed, boiled it away fraction by fraction, and examined what was left - and among the leftovers was a gas nobody had ever seen. When they passed an electric current through a sample, it blazed a brilliant red, and they named it after the Greek word for new. A fitting name, as you will see, for a gas whose whole career has been about novelty.",
  "F|The man who turned this laboratory curiosity into an industry was a French engineer, Georges Claude. Claude ran a business liquefying air on an industrial scale in order to sell oxygen to hospitals and welders - and neon, for him, was a by-product. Every day his plant produced litres of this useless glowing gas, and Claude, who was a businessman as well as an engineer, went looking for a use. In December 1910 he showed the world what he had found. At a motor show in Paris, he lit two tubes of pure neon, each twelve metres long, and visitors crowded around them all evening. Within two years he had his first paying customer - not a theatre, not a department store, but a barber, whose little shop on a Paris boulevard became the first business on earth to advertise itself in neon.",
  "F|A word about colour, because pure neon gives you one colour only: that unmistakable red. Every other shade needs a trick, and the most important trick is this. You fill the tube with a different gas, argon, and you add to it a single drop of mercury - and the tube glows a cool electric blue. Red and blue, neon and argon: those two tubes are the ancestors of every colour the industry later produced. And the tubes themselves could never be made by machine. Each letter, each curve, is shaped by hand: the glassworker warms the tube over a flame until it softens, bends it a few degrees, and warms it again. It is a craft closer to glassblowing than to manufacturing, and it has hardly changed in a hundred years.",
  "F|Neon conquered America before most Americans knew its name. In 1923, Claude's company sold its first two signs in the United States - to a car dealer in Los Angeles, who paid a small fortune to hang the name of his business in glowing letters above the street. The effect on the public was extraordinary. People called the new signs liquid fire, and they would stop in the street and simply stare - there are reports of traffic coming to a standstill beneath them. From that one showroom the technology spread with astonishing speed, and by 1940 there was neon on almost every main street in the country, and the entertainment districts of the big cities had turned night into a kind of second day.",
  "F|So why did it fade? From the 1960s onwards, shopkeepers began to turn away from neon, and the reason, as usual, was money. A sign made of plastic, with an ordinary lamp inside lighting it from within, cost a fraction of the price of handmade glass, needed no specialist to repair it, and shrugged off the weather. Neon came to look old-fashioned - the light of cheap hotels and all-night diners - and thousands of signs were taken down and scrapped. Which is ironic, because a well-made neon tube is a remarkably durable object: it can glow, more or less untouched, for over ten years.",
  "F|But the story does not end in a scrapyard. The signs that survived became, first, collectors' items, and then heritage. In Las Vegas, hundreds of rescued signs - some restored and relit, others magnificently rusted - now stand together in an open-air museum, and visitors walk among them at dusk as they might walk through a sculpture park. And the craft itself is being kept deliberately alive. A handful of workshops still bend glass the old way, and they are training new apprentices, because the skill takes years to master and would vanish within a generation without them. The flat panels outside may be brighter and cheaper - but when a city wants light with a memory in it, it still calls for neon.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset4-s1.wav" $s1
Render "pset4-s2.wav" $s2
Render "pset4-s3.wav" $s3
Render "pset4-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
