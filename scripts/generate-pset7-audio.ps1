# Generates the four Practice Set 7 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a removal company to book a van for a house move. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good morning, Citywide Removals. How can I help you?",
  "F|Hello. I'm moving out of my flat next month and I'd like to book a van and some help with the furniture.",
  "M|Certainly, I can do that now. We run Monday to Saturday - Sundays we only do office moves. Can I start with your name?",
  "F|Yes, it's Dilnoza Ibragimova.",
  "M|Could you spell the surname for me, please?",
  "F|Of course. It's I, B, R, A, G, I, M, O, V, A. Ibragimova.",
  "M|Thank you. And where are we collecting from?",
  "F|A flat on Amir Temur Street. It's on the third floor - no, sorry, I keep doing that. We moved up a floor in the spring. It's the fourth floor.",
  "M|The fourth floor. And is there a lift in the building?",
  "F|That's the problem. There isn't one, and the staircase turns quite sharply at the top.",
  "M|Noted. Stairs are fine, we just need to know in advance. And the date?",
  "F|I was hoping for Saturday the fifth of September.",
  "M|Let me look... I'm afraid the fifth is completely booked, both teams are out. I could offer you the following Saturday, the twelfth?",
  "F|Saturday the twelfth would actually suit me better. Yes, let's say the twelfth.",
  "M|The twelfth of September it is, and the team would arrive at eight in the morning. Now, what size of van do we need? How much are we moving?",
  "F|It's a two-bedroom flat. Not enormous, but there's a sofa and a lot of books.",
  "M|Right. My first thought was the large van, but honestly, for a two-bedroom flat the large one is money wasted. The medium van takes a two-bedroom flat comfortably. I'll put you down for the medium.",
  "F|The medium van, then. There is one other thing. Some of my furniture isn't at the flat at all - my mother has been keeping a wardrobe and a bookcase for me. Could the driver collect those on the way?",
  "M|Where are they exactly?",
  "F|In her garage, about ten minutes from my new house.",
  "M|That's no trouble at all. I'll add a second collection at the garage - as long as it's on the route we don't charge extra for it.",
  "F|Wonderful. And what will all this cost?",
  "M|The large van with two men is eight hundred thousand som for the first four hours. The medium is seven hundred, and that includes the two men, the fuel and the insurance.",
  "F|Seven hundred thousand. That's within my budget.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Do you need any money from me today?",
  "M|We ask for a ten per cent deposit to hold the date. You can pay it by card over the phone now, or in the office - what we can't take any more is a bank transfer, it took too long to appear and we lost too many bookings.",
  "F|By card is easiest. I'll do that at the end of the call.",
  "M|Perfect. Now, packing. We deliver flat-packed boxes a week beforehand, free of charge, and you keep them as long as you need. One warning, though, because everybody is caught out by it: we don't supply tape. The boxes come flat and you'll need tape to make them up, so buy a couple of rolls before the boxes arrive.",
  "F|Tape. I'd never have thought of that.",
  "M|Nobody does. Is there anything fragile we should know about? Musical instruments, glass, that sort of thing?",
  "F|There's a very large mirror in the hall. It belonged to my grandmother and I'm terrified of it.",
  "M|Then tell the team the moment they arrive. We'll wrap the mirror in blankets and strap it upright against the side of the van - flat on the floor is how mirrors get broken.",
  "F|That's a relief.",
  "M|Last thing, and it's the one that causes trouble. What's parking like outside the flat?",
  "F|It's a narrow street. There's a loading bay, but it's usually full of cars.",
  "M|Then you'll need to apply for a permit from the district office. They suspend the bay for the morning and put a sign up, but you have to apply at least ten working days ahead. We can't do it for you - the permit has to come from the resident.",
  "F|A permit, ten days ahead. I'll go in on Monday.",
  "M|Then that's everything. I'll email the booking through to you this afternoon.",
  "F|Thank you very much indeed. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a member of staff at the Riverside Museum talking about the museum's late-opening evenings. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and welcome to the Riverside Museum. Before you go off and explore, let me tell you how our late openings work and what there is to see tonight.",
  "F|People often ask how the late evenings started. A few visitors assume it was a money-raising idea, and I understand why - most museums our size are looking for income - but that wasn't it, and in fact the evenings cost us more than they earn. Others think the city council asked us to do it; the council has been supportive, but the request never came from them. The real reason was a piece of research. Three years ago we surveyed people who had never visited us, and the answer that came back again and again was that they were at work whenever we were open. We were open ten to five, Monday to Friday. If you have a full-time job, that museum does not exist. So we opened in the evening instead, and two-thirds of the people who come on a late evening have never been inside the building before.",
  "F|The scheme has grown since then. In the first two years we opened late on the first Thursday of the month, and every time, people arrived on the wrong Thursday and went away disappointed. So from January this year we are open late every Thursday, without exception, which is far easier to remember. I should add that the closing time has not changed - it is still nine o'clock, as it always was - and I'm afraid the evenings are not free; the usual ticket price applies, although members come in as they always do.",
  "F|What has worked best? Well, the archaeologist's talk on the Roman river crossing filled the lecture room, and last month's jazz concert in the courtyard was a lovely evening, if a rather cold one. But nothing has come close to the family sleepover in February. We took ninety children, they slept under the whale skeleton, and the tickets were gone in forty minutes - the fastest we have ever sold anything. We are running four of them next year.",
  "F|One practical point before you set off, and it matters. During the day you come in through the main doors on Bridge Street. In the evening those doors are locked, because the ticket hall is closed, and everybody comes in and out through the garden entrance at the side of the building. Do remember that when you leave, or you will find yourself walking round the outside of the museum in the dark.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right - let me take you quickly through the building, so you know where to go.",
  "F|We're standing in the Great Hall, which on a Thursday evening is not a quiet place. From seven o'clock there is a band in here every week - folk, jazz, brass, whatever we can persuade to come - and the sound is remarkable under that roof. If you want to look at the paintings in peace, come back on a Saturday.",
  "F|Straight ahead of you is the textile gallery, with the embroidery collection. Do see it tonight if you are interested, because from the middle of next month it shuts for the roof to be repaired and the scaffolding will be up until the spring. It is the last chance for six months.",
  "F|Upstairs on the first floor is the coin room. It is small and people walk past it, which is a shame, particularly at the moment: the silver hoard has just come home after two years on loan to a museum in Berlin, and this is the first week it has been back on display here.",
  "F|Keep going up and you reach the roof terrace. There is nothing on show up there at all - no cases, no labels - but on a clear evening you can see the whole city, the river, the hills behind it, and the lights coming on. Most visitors tell us it is the best thing in the building.",
  "F|Back down on the ground floor, past the lift, is the children's studio. That room exists because of one person: a woman who worked in our shop for thirty years left us everything she had when she died, and she asked that it be spent on children. So it was.",
  "F|And finally the courtyard cafe. Do use it tonight - it serves soup and bread until half past eight. But please don't come looking for it on a Sunday afternoon, because we simply haven't the staff: the cafe opens on late evenings and at no other time.",
  "F|Right. Off you go, and enjoy the museum.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two environmental science students, Anvar and Malika, planning a study of soil. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Malika, we have to fill in the project form today. The first question is why we chose soil quality as our subject.",
  "F|Do you want the official answer or the real one?",
  "M|The real one, obviously. It wasn't the climate change module, was it? Everyone will put that.",
  "F|No, and it wasn't the news report about the dust storms either, although you keep mentioning it. It was my grandfather's vegetable plot. He has grown vegetables on the same ground for forty years and in the last three seasons almost nothing has come up. Nobody could tell him why. That is when I started reading about soil.",
  "M|Then that goes on the form. Right, the literature review. What did you think of the papers?",
  "F|They were careful, and there were plenty of them - it isn't that the subject is neglected, and one of them was published last year, so it's not out of date either. But they nearly all share a weakness. The soil is taken away and studied in the laboratory, under controlled conditions, and hardly anybody measures it where it actually is, in the ground, in the rain. And they did cover small gardens, by the way, so we can't claim that.",
  "M|Fair enough - so our gap is field measurement. Now, participants. Where do we take our samples?",
  "F|My first thought was the park by the river, but the council would want a permit and that takes months. And the university farm is tempting because it's close, except the soil there is managed so heavily that it tells us nothing about ordinary ground.",
  "M|The allotments, then. I spoke to two of the gardeners last week and they were delighted - forty separate plots, all different, all worked by hand. The allotment gardens are exactly what we want.",
  "F|Agreed. So what do we actually measure? Acidity is the obvious one.",
  "M|It's obvious and it's easy, but it moves about so much from week to week that we'd need a whole year of readings to say anything. And I know you like the idea of counting earthworms, but honestly, two people digging pits in forty plots - we'd still be there in June.",
  "F|So organic matter. That's the main measurement, then - how much organic matter each plot holds. It's stable, it's comparable, and it's what actually explains whether the ground works.",
  "M|Organic matter it is. Now, I saw Dr Rashidova on Monday about the method. She wasn't worried about photographs - take them if you like, she said, but nobody will look at them - and she says the risk assessment is a two-page form we do at the end. What she was absolutely firm about is repetition. Three samples at every single point, not one.",
  "F|Three samples at every point. That triples the work.",
  "M|It does, but she's right. One sample from one hole tells you about the hole, not the plot.",
  "F|Fine. And what worries you most about all this?",
  "M|Honestly? Not the weather - we can wait a week if it rains. It's the plots themselves. These are people's gardens, Malika. If we walk across a seed bed or leave a hole in somebody's onions, that's the end of the project and we'd deserve it.",
  "F|That's exactly my fear too. We should take a plank to stand on, and fill every hole properly before we leave it.",
  "M|Agreed. Let's write that into the method.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, how do we measure organic matter? There's that hand-held electronic probe in the store cupboard.",
  "M|There is, and it gives you a number in four seconds, which is why I don't trust it. The technician says it hasn't been calibrated since it was bought, and neither of us knows how.",
  "F|Then we do it properly. Step one, we dry the samples, sieve out the stones and roots, and weigh what's left. Sieving and weighing dried samples gives us the base figure everything else depends on.",
  "M|Yes, that has to be first. And step two is the furnace, isn't it? We burn the dried sample in the department's furnace and weigh it again, and the weight it loses is the organic matter.",
  "F|Exactly - burning samples in the furnace is the standard method and the marker will expect it. What about the colour chart, the one they sell in garden centres?",
  "M|It's a nice teaching tool, but it's somebody's eye judging a shade of brown. And the home testing kits are worse - they're designed for acidity anyway. Two methods is plenty.",
  "F|Good. Now, what has to happen before we can start digging?",
  "M|The gardeners. I know two of them, but there are forty plots and the committee meets once a month. If we don't write to the allotment committee this week we won't have permission until October.",
  "F|I'll draft that letter tonight. The other urgent one is the drying oven. Every second-year project needs it in the same fortnight, and the technician keeps the book on paper in her office.",
  "M|Then book the drying oven tomorrow morning, before anyone else thinks of it.",
  "F|I will. The auger we can borrow any time - there are four of them and nobody wants them. And the sample bags arrived last week, a thousand of them, so don't order more.",
  "M|And the spreadsheet for the results can wait until we have results. Right - you write to the committee, I book the oven, and we meet on Friday.",
  "F|Friday. See you then.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of tea. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we followed sugar around the world. Today I want to take the other half of that story: tea, the drink that, after water, more human beings consume than any other.",
  "F|Let me begin with the plant, because there is a common misunderstanding here. Green tea, black tea, white tea, oolong - students often assume these come from different plants. They do not. Every kind of tea comes from a single species, Camellia sinensis, and the differences between them are created entirely after picking, by how long the leaf is allowed to oxidise before it is dried. Black tea is simply a leaf that has been allowed to go on oxidising; green tea is one that was heated quickly to stop it.",
  "F|The origin story is a legend, and a good one. The Chinese emperor Shen Nong is said to have been sitting under a tree, boiling water, when leaves blew into his bowl. He drank it, and the world had tea. What the records actually show is rather different in tone: for its first several centuries in China, tea was not a pleasant drink at all but a medicine, prescribed for headaches, fatigue and poor digestion, and often taken with onion or ginger.",
  "F|By the eighth century it had become an everyday drink, and in about the year seven sixty a writer called Lu Yu produced the first book ever written about tea, a manual of growing, making and drinking it that is still in print. The tea of that period did not look like ours. The leaves were steamed and pressed into hard bricks, which is a form that travels: a brick could be carried for a year across a desert without spoiling. And because it was durable, valuable and easy to divide, tea in brick form was used as currency across much of Central Asia and Tibet, well into the twentieth century - you could pay a debt or a tax in tea.",
  "F|The drink spread first within Asia. Buddhist monks studying in China carried tea home to Japan, where over several centuries it grew into the most formal ceremony surrounding any drink anywhere in the world.",
  "F|Europe met tea late. Portuguese and Dutch ships brought the first chests home in the early sixteen hundreds, and it arrived as an expensive curiosity for the very rich. In England it was made fashionable by a Portuguese princess, Catherine of Braganza, who married Charles the Second in sixteen sixty-two and brought her tea-drinking habit with her; within a generation the court had copied her, and within two generations everybody else had. Governments noticed, as governments do, and taxed it savagely - at one point the duty in Britain reached over a hundred per cent, with the result that smuggling became one of the largest industries on the south coast, and much of the tea drunk in Britain had never passed through a customs house at all. Across the Atlantic the same taxes had a more famous consequence: in seventeen seventy-three a crowd in Boston threw three shiploads of tea into the harbour.",
  "F|Now, all this tea came from China, and by the eighteen twenties Britain was desperate to grow its own. Two things made that possible. First, in eighteen twenty-three a different variety of the plant, with much larger leaves, was found growing wild in Assam, in north-east India - proof that China had no natural monopoly. Second, in eighteen forty-eight the Scottish botanist Robert Fortune travelled through China in disguise and removed not only twenty thousand plants but, more importantly, a group of skilled workers who knew how to process the leaf. Without those workers the plants would have been useless. Within forty years India was exporting more tea than China.",
  "F|Ceylon, now Sri Lanka, came next, and by accident. The island's plantations grew coffee until a fungus destroyed the entire coffee crop in the eighteen seventies, and the ruined planters replanted with tea. The finished product came home in the famous clipper races, sailing ships competing to land the first crop of the season.",
  "F|One last date. In nineteen oh eight a New York merchant named Thomas Sullivan sent samples to his customers in small silk bags, intending them to tip the leaves out. His customers dropped the whole silk bag into the pot, asked for more, and the tea bag was invented by a misunderstanding. Today it accounts for the overwhelming majority of the tea drunk in Britain and America.",
  "F|So: a medicine, a currency, a smuggled luxury and an accident. Next week, coffee.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset7-s1.wav" $s1
Render "pset7-s2.wav" $s2
Render "pset7-s3.wav" $s3
Render "pset7-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
