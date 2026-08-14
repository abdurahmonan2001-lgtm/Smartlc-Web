# Generates the four Practice Set 11 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a dental practice to make an appointment with the hygienist. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good morning, Bright Lane Dental Practice.",
  "F|Good morning. I'd like to book an appointment with the hygienist, please. I've never been to one before.",
  "M|Of course. Are you registered with us already?",
  "F|Yes, I am. I came in for a check-up in the spring.",
  "M|Then I'll have your record here. Can I take your name?",
  "F|It's Dilnoza Umarova.",
  "M|Umarova - could you spell the surname for me?",
  "F|Yes, it's U, M, A, R, O, V, A.",
  "M|U, M, A, R, O, V, A. Thank you. And this will be the routine appointment - the teeth cleaned, and the hygienist checks the gums at the same time.",
  "F|That's right. When is she free?",
  "M|Let me look. She has a space on Wednesday the fifteenth of October... no, I do apologise, I'm looking at last month. The fifteenth has gone. The next free one is Wednesday the twenty-second of October.",
  "F|Wednesday the twenty-second. That works for me.",
  "M|Now, the time. I can offer you five o'clock... ah, no, that one has just gone as well - the screen is slow this morning. What I can give you is half past five, five thirty.",
  "F|Five thirty is better for me anyway. How long does it take?",
  "M|Forty minutes. It's longer than people expect, because it's your first visit.",
  "F|Fine. And what actually happens?",
  "M|She does the scaling first, which takes off the hard deposits, and then a polish to take off stains from tea and coffee. People sometimes ask about whitening - we don't do that at a hygienist appointment, it's an entirely separate treatment.",
  "F|Just the scaling and the polish, then.",
  "M|Yes. And she spends a few minutes showing you how to clean properly at home. Most patients are given a small brush for the gaps between the teeth - far more use than mouthwash, whatever the adverts tell you.",
  "F|A brush for the gaps. Right.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|And what does it cost?",
  "M|It was two hundred thousand som last year, but the practice reduced the hygienist fee in January, so it's a hundred and eighty thousand now.",
  "F|A hundred and eighty. Do I pay in advance?",
  "M|No, you pay at reception afterwards, by card or in cash, whichever suits you.",
  "F|Good. Now, I'm not sure I remember exactly where you are. You're on Market Street, aren't you?",
  "M|We are, but people often say they can't find the door, because it isn't at street level. We're above the bakery, next to the bus stop. There's a pharmacy three doors along and half our patients walk into that one by mistake. Look for the bakery and the blue door beside it.",
  "F|Above the bakery. I'll find it.",
  "M|One other thing. Could you bring a list of your medicines with you? Anything you take regularly. The hygienist needs to know, and nobody ever remembers the names.",
  "F|A list of my medicines. I'll write it out.",
  "M|Thank you. And a piece of advice for afterwards: the polish leaves the surface of the teeth open for a day, so keep away from anything that stains. Tea isn't too serious, but no coffee for twenty-four hours.",
  "F|No coffee. That's the hard part.",
  "M|It always is. Right, that's booked. We used to post reminder letters, but half of them arrived after the appointment, so you'll get a reminder by text the day before instead.",
  "F|By text. Lovely. Thank you very much.",
  "M|We'll see you on the twenty-second. Goodbye.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the manager of a new market hall in the town of Ashfield talking to a group of local residents. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming. I manage the new market hall, and I'd like to tell you how it came about, and then take you round it.",
  "F|People ask why the council spent this money at all. Two stories are going round, and neither is right. The first is that we were forced into it by the fire. There was a fire, yes, but it was in a storage shed behind the old market and it damaged nothing else. The second is that the council wanted the open site for housing. Nothing has ever been proposed there; it will be a public square. The real reason is duller and sadder. The outdoor market had been shrinking for fifteen years, and when we asked the stallholders who had left why they went, almost every one of them gave the same answer: standing in the rain from six in the morning through a northern winter is not a living. We built a roof to stop the traders leaving.",
  "F|As for paying for it, we applied for a national heritage grant and were turned down, twice. And we sold no land - I know that rumour too. In the end the council borrowed the money, and the loan is being repaid out of the rents the stallholders pay. That is why the rents are what they are, and I'll come back to that.",
  "F|The building work took nineteen months, and I'm sorry to say we tested your patience. We had complaints about the noise, of course, although the contractor kept to the agreed hours. We had complaints about dust, and we paid to have the windows on Chapel Row cleaned twice. But one subject filled the postbag week after week, and it was parking - forty spaces closed for a year and a half, and I understood every letter.",
  "F|And what do the traders themselves say now? They are pleased about the hours: we open at seven and close at eight, far longer than the old market ever managed. They are less pleased about the rents, which are higher than they were outdoors, for the reason I have just given. But the thing they mention first, every single time, is the cold store. Twenty traders share one large cold store in the basement, and nobody has to drive their stock home overnight any more. That is what has changed their working lives.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Now, the building itself, and I'll take it in order.",
  "F|You come in by the north entrance, on Market Street. When the old corn exchange was pulled down in the nineteen sixties, somebody had the sense to keep the stone arch and the clock above it, and both went into storage for sixty years. They stand in the north entrance today, so the first thing you meet is a piece of the building that was here before this one.",
  "F|Straight ahead of you are the fish and meat counters. I'll be honest about those: they cost more than we planned. Refrigerated counters, drainage, tiling to the standard the inspectors require - the final bill was nearly double the figure in the original budget, and the rest of the scheme had to be trimmed to pay for it.",
  "F|Up the stairs is the gallery, which runs round three sides of the hall. There are six stalls up there and a good deal of empty floor, and that floor earns its keep, because the gallery can be hired for private events - weddings, parties, company evenings - on Sundays and after eight in the evening.",
  "F|Out through the side doors is the courtyard, with room for another twenty stalls. It is open only in the summer, from May to September. We looked hard at covering it, but the cost was impossible, and in any case the traders out there are growers with nothing to sell in January.",
  "F|Beside the courtyard is the demonstration kitchen, paid for, I'm glad to say, by a national food charity. We run cookery classes in it at weekends, and it is used every Thursday morning by the primary school on Chapel Row, whose pupils come and cook with whatever is on the stalls that day.",
  "F|And last, the roof terrace. I can't show you that tonight, because it isn't finished. The planting and the railings are booked for the spring, so it will not be open until next year. When it is, it will be free to everybody, and the view down the valley is worth the wait.",
  "F|Two things you may have heard about elsewhere. The benches all round the hall were paid for by donations from local people, and I thank everyone who gave. And the six stalls at the far end are reserved for producers from the surrounding villages, at half rent, because a market that sells nothing local is only a shop with poor lighting.",
  "F|Right. Follow me, and watch the step.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two students, Otabek and Zarina, planning a noise survey of their town. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Right, Otabek. The form wants a paragraph on why we chose noise.",
  "M|Well, Doctor Karimov suggested traffic flow, not noise, so we can't pretend it was his idea.",
  "F|And it wasn't the residents' association either, although they have written to the council about it twice. It was you, wasn't it. Your flat.",
  "M|It was my flat. Third floor, twelve metres from the ring road, and for two years I did not sleep properly. I measured it once on my phone out of curiosity and I've thought about it ever since. That's the honest answer, so let's write it down.",
  "F|Written. Now, what is already known? The council does hold noise data.",
  "M|It does, and it's recent - last year, in fact, so nobody can call it out of date. And they measured day and night, which surprised me.",
  "F|The problem isn't the dates. Look at their map. Four monitoring points for a town of ninety thousand people, and all four on the main road. Nothing at all for the residential streets, nothing near the school, nothing by the hospital. Four points cannot describe a town.",
  "M|Agreed, that's our gap. Now, equipment. My phone app was good enough to convince me, but it isn't good enough for a report.",
  "F|Definitely not - phone microphones are poor at the low frequencies. I asked whether our department could buy two proper meters and the answer was no, there's nothing in the budget this year. But environmental science has four of them, and they've agreed to lend us two for a fortnight.",
  "M|Borrowed meters. Excellent. So where do we measure, and when?",
  "F|There are two ways of doing it. We could leave one meter at a single site for a whole week and get a beautiful picture of one street.",
  "M|Which tells us nothing about the town. I'd rather have six sites and visit each of them at the same three times of day - morning, afternoon and late evening. It's a lot more walking, but the sites can be compared.",
  "F|Six sites at fixed times, then. I did wonder about letting residents nominate the sites, but they would all nominate the noisiest corner they know and the sample would be useless.",
  "M|Six sites chosen by us. Now, I saw the tutor about the plan on Tuesday.",
  "F|What did she say? Was it the analysis? I know our statistics are weak.",
  "M|She barely mentioned the analysis - she said bring her the numbers in week five and she'll go through them. And permission isn't an issue at all; measuring sound in a public street needs nobody's approval. Her worry was the late-evening readings. Two students on an unlit street at eleven at night with expensive borrowed equipment - she wants us to go together, never alone, and to tell somebody where we are.",
  "F|That's fair, actually. We'll always go as a pair.",
  "M|Good. And what worries you most about the whole thing?",
  "F|Honestly? Not the walking, and not the weather - we can postpone a wet evening. It's that a single lorry, or a barking dog, or somebody's party lands in the middle of a five-minute reading and ruins it. One accident on the ring road and that site's numbers are meaningless.",
  "M|That's exactly my fear too. Random events we can't control. We'll take three readings at every visit and note anything unusual.",
  "F|Agreed.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So at each site we record the sound level. What else do we write down?",
  "M|The number of vehicles passing, obviously. If we can't relate the noise to the traffic we have no explanation, only numbers.",
  "F|A vehicle count, yes. And pedestrians? I did think about counting people on foot.",
  "M|Interesting, but they aren't making the noise, and counting two things at once in a five-minute window is beyond me.",
  "F|Fair enough. Wind speed, then - the guidance says a strong wind affects the microphone.",
  "M|The guidance also says don't measure at all above five metres a second, so we'd simply go home instead of writing a figure down. We don't need it.",
  "F|True. What about the road surface? Concrete against asphalt makes a real difference.",
  "M|It does, but three of our sites aren't beside roads at all, so it wouldn't apply everywhere. Leave it out.",
  "F|Then the last one on my list is the height of the buildings on either side. A narrow street with tall blocks reflects everything straight back at you.",
  "M|Now that I like. Vehicle counts and building height at every site - that's our two.",
  "F|Good. Jobs before we start, then. The meters are calibrated - environmental science check them every month and they did it last week, so that's one thing we can forget.",
  "M|And I printed the recording sheet and tried it out on the ring road yesterday. It works; the columns are in a sensible order.",
  "F|Excellent. Do we have to agree the timetable with the tutor first?",
  "M|No - she said just send it to her once it's fixed. But the college wants something in writing before we take borrowed equipment off site, a permission form, signed by the department.",
  "F|That one matters. Can you do it?",
  "M|I'll get the form signed tomorrow morning.",
  "F|And two of the six sites are four kilometres out. We can't carry the meters out there at eleven at night and walk home afterwards.",
  "M|My cousin has a car. I'll arrange transport for the outer sites - that's the other job.",
  "F|Then we're ready. Meters on Monday.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture on the history of perfume. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good afternoon. Last week we followed the history of soap. Today, its more glamorous relative: perfume.",
  "F|Start with the word itself. Perfume comes from the Latin per fumum, which means through smoke, and the name is a piece of history in itself. The first perfumes were not worn at all; they were burned. Aromatic gums and resins were thrown on the temple fire so that the rising smoke would carry a prayer upwards, and for something like a thousand years that was what perfume was for.",
  "F|Egypt made an industry of it. The resins the Egyptian temples needed, frankincense and myrrh above all, did not grow in Egypt and had to be brought by sea from the land of Punt, on the Red Sea coast; those expeditions were important enough to be carved on temple walls. Egyptian perfume was not only religious, though. At a feast, a guest would arrive wearing a cone of scented fat on the head, which melted slowly through the evening and perfumed the hair and the shoulders. And in Mesopotamia we meet the first perfume maker whose name we know: a woman called Tapputi, recorded on a clay tablet from about twelve hundred BC, who is described soaking flowers, oil and reeds and then passing the mixture through a still to draw off the scent. She is arguably the first chemist in history.",
  "F|The Greeks and the Romans made perfume domestic rather than sacred. Greek perfumers worked by soaking petals and spices in oil, usually olive oil, because fat absorbs scent - a technique that went unchanged for two thousand years. Rome then took the idea to an extreme that even Romans complained about: scented fountains, scented doves released over the tables at banquets, and ships' sails soaked in perfume so that a vessel announced itself before it arrived.",
  "F|The next great step was chemical, and it happened in the Arab world. Distillation was already known, but it was Ibn Sina, in the eleventh century, who refined both the equipment and the method well enough to produce something genuinely new: pure rose water, the scent of the flower separated from the flower itself. From that point a perfumer could store and blend concentrated essences. What arrived rather later was alcohol as the liquid base, and it changed everything: alcohol carries scent up into the air as oil never does, so perfume became light, and it evaporates in stages, which is why a modern perfume smells different an hour after you put it on.",
  "F|Medieval Europe used scent as medicine. People believed that disease travelled through bad air, so anyone who could afford one carried a pomander, a pierced metal ball packed with amber, cloves and rosemary, and held it to the nose in the street in the honest belief that a sweet smell kept out disease. Wrong, of course, but it kept the perfume trade alive through some difficult centuries.",
  "F|Then France. It surprises students to learn that Grasse, the perfume capital of the world, began as a town of tanners. Grasse was a centre of glove making, and the leather smelled so unpleasant that the glovers began scenting their products - and discovered that the scent was worth more than the gloves. The hills behind the town turned out to suit jasmine and lavender, and within a century Grasse had changed trades entirely. In seventeen oh nine, meanwhile, an Italian living in Germany produced the light citrus mixture we still call eau de Cologne.",
  "F|The modern industry begins in the eighteen sixties, and it begins in a laboratory. In eighteen sixty-eight the first important synthetic scent was made, and it smelled of new-mown hay; within twenty years it was at the heart of the first perfume built around a laboratory material rather than a garden. Synthetics did two things. They cut the price, because a kilogram of jasmine flowers is a fortune and a kilogram of a synthetic is not, and they freed the perfumer from the harvest and from flowers whose scent cannot be extracted at all. Lily of the valley, famously, yields nothing to distillation; every lily-of-the-valley perfume you have ever smelled is an invention.",
  "F|Which brings us to the present. The technique called headspace analysis puts a glass bell over a living flower, samples the air trapped inside it and identifies the compounds by machine, so that a perfumer can now reproduce the smell of a flower without picking it - or the smell of a rainforest, or of the air after a storm. Two thousand years after the first resin went on the temple fire, we are still making smoke, only rather better.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset11-s1.wav" $s1
Render "pset11-s2.wav" $s2
Render "pset11-s3.wav" $s3
Render "pset11-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
