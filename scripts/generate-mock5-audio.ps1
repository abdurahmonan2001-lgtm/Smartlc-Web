# Generates the four Mock Test 5 listening recordings with Windows TTS.
# Same conventions as Mocks 1-4: "F|"/"M|" pick the voice, "P|<seconds>" is
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
  "M|Part one. You will hear a woman phoning a letting agency about a flat she has seen advertised. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Rushmore Lettings, good morning. How can I help?",
  "F|Good morning. I'm calling about a flat you advertised on your website last week - the one-bedroom one with the new kitchen. Is it still available?",
  "M|It is, yes. Let me bring the details up on the screen... here we are. Shall I run through it with you?",
  "F|Please do. Where exactly is it? The advert only said city centre.",
  "M|It's number seven, Cardwell Street. That's C, A, R, D, W, E, L, L. Cardwell.",
  "F|Cardwell... is that the long road with all the cafes on it?",
  "M|No, no - you're thinking of Carlton Road. Cardwell Street is the small street near the river, just behind it. Very quiet.",
  "F|Oh, I know the one. And which floor is the flat on?",
  "M|It's on the third floor. I should apologise, actually - the advert said fourth, and that was our typing error. It's the third. And there is a lift in the building, so it makes very little difference either way.",
  "F|Good, a lift matters to me. And it's one bedroom, is that right?",
  "M|One good-sized bedroom, yes. But there's also a small room off the hallway. The current tenant uses it as a study, for working at home. It's too small to be a second bedroom, honestly, but it takes a desk and a bookcase comfortably.",
  "F|A study would suit me perfectly, actually - I work from home three days a week. And the kitchen?",
  "M|Completely refitted last year. Everything in there is new.",
  "F|That sounds promising. Can we talk about money?",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "M|Of course. Shall I start with the rent?",
  "F|Please.",
  "M|It went on the market at six million som a month, but the owner has just reduced it. It's five million now.",
  "F|Five million som a month. And is there a deposit as well?",
  "M|There is. It's the equivalent of two months' rent, so ten million, and you get all of that back at the end of the tenancy, assuming there's no damage.",
  "F|Two months. Fine. What about bills - is anything included?",
  "M|Heating and water are both included in the rent, which is unusual and rather nice. Electricity isn't, though. That's paid by the tenant. You'd set up your own account with the supplier when you move in.",
  "F|So the electricity is mine. Right. Could I come and see the flat?",
  "M|Of course. The agent who holds the keys is over that way on... let me look. Friday - oh, sorry, no, we close early on Fridays, he won't have the keys. Wednesday, then. Wednesday at half past five. Would that suit you?",
  "F|Wednesday at five thirty, yes, that's fine.",
  "M|Lovely. Now, one thing - please don't wait at the front door of the building, because you can't get into the lobby without a code, and he'll never see you. There's a pharmacy right next door. Wait outside that and he'll find you.",
  "F|Outside the pharmacy. Got it. Should I bring anything with me?",
  "M|Yes - a copy of your passport, if you would. We need it for the tenancy form. A driving licence isn't enough, I'm afraid; the owner insists.",
  "F|A copy of my passport. And how long is the contract?",
  "M|The minimum tenancy is one year. Some of our owners ask for two, but not this one.",
  "F|One year suits me very well. Could you email me directions to the street?",
  "M|I could, but our emails go into people's junk folders half the time. I'll send them by text instead, to the number you're calling from. Much quicker.",
  "F|By text, perfect. Thank you very much indeed.",
  "M|My pleasure. Wednesday at five thirty, then. Goodbye.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the director of the Silverdale Museum talking to invited guests about its reopening after two years of renovation. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, and welcome back to the Silverdale Museum. Two years is a long time to shut a museum, so let me explain what we have been doing, and why.",
  "F|People have offered me all sorts of theories about why we closed. The most popular one is that visitor numbers had collapsed - and that simply isn't true. Our last full year before the closure was one of the busiest we have ever had. Another rumour was that the city had offered us a bigger site across the park. That was discussed, years ago, and it came to nothing. The truth is duller. A survey of the roof and the upper floors found that parts of this building were no longer safe to stand in. We closed because we had no choice.",
  "F|The question everybody asks next is what happened to the objects. We did lend a handful of pieces to museums in other cities, and one or two very large items had to stay here, boarded up, because they could not be moved at all. But the collection as a whole - some forty thousand objects - was packed up and taken to a storage building outside the town, where it sat in perfect conditions for two years.",
  "F|So, what will you find when you walk in? The entrance hall has been completely rebuilt. There is a proper cloakroom now, and I'm pleased to say that leaving your coat and your bag there costs you nothing. We used to charge for it, and it always felt wrong. You will also see a ticket desk with a real person behind it - we looked seriously at machines and decided against them - and guided tours, which run at weekends only, I'm afraid, rather than every hour as several of you have asked.",
  "F|And the change I care about most? Well, we do have longer opening hours, that's true - an extra hour on four evenings a week. And we have a lift at last, although, and this is my one regret, it still doesn't reach the top gallery. But the thing I am proudest of is this. From this month, every Sunday, admission to this museum is completely free, for everybody. A city museum should belong to the city.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Now let me take you round, gallery by gallery, so you know what to expect.",
  "F|The Egyptian gallery first. I know several of you have asked whether we have brought new material out of store for it. We haven't - every single object in there has been on display before. What has changed is where it is. It used to be up on the second floor, at the end of a long corridor, and half our visitors never found it at all. It is now on the ground floor, immediately to your right as you come in.",
  "F|The costume gallery. It is exactly the same size as it always was, whatever the newspaper printed last week. The difference there is the light. Textiles fade, and the damage cannot be undone, so we have taken out the strong lighting and kept the whole room considerably darker than before.",
  "F|The painting gallery was the great argument of the entire project. The architects wanted white walls and modern spotlights. We fought them, and we won. The deep red silk on the walls, the gold cornices, that extraordinary painted ceiling - all of it stays exactly as it was in eighteen ninety.",
  "F|The children's room, which used to be a rather sad corner behind the stairs, has taken over the old library next to it as well, so it is now twice the size it was. Several parents have asked me whether it has a door of its own, so that pushchairs needn't come through the main hall. It doesn't, and one day I hope we can change that.",
  "F|The sculpture court is entirely new, and I want to say how it came about. We did not raise the money in small sums, and the city did not pay for it either. Every som of the cost was given by one woman, a student here fifty years ago, who has asked us not to put her name on the wall.",
  "F|And the roof terrace - the part all of you have seen in the photographs. I am sorry to disappoint you this evening. The floor surface failed its safety test in June, and it will not be open to the public until October.",
  "F|Right. The doors are open, the coffee is hot, and the building is yours again.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two chemistry students, Timur and Madina, discussing their water-quality testing project. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Madina, before we start on the results, the tutor wants a paragraph on how we chose the topic in the first place. What do we say?",
  "F|The honest thing, Timur. It wasn't Professor Karimov's lecture, much as I enjoyed it - that came weeks afterwards.",
  "M|And it wasn't your laboratory job either, although everybody assumes it was.",
  "F|No. It was that piece in the local paper in September, the one claiming our river was the dirtiest in the region. I read it on the bus and thought, well, is that actually true? Nobody in the article had measured anything at all.",
  "M|So we decided to measure it ourselves. Right, I'll write that up tonight.",
  "F|Now, the kits. We have to be open about what went wrong there.",
  "M|We do. Though not the delivery - people keep telling me they came late, and they didn't. They arrived two days early, if anything.",
  "F|And nothing was broken. One box had been sat on somewhere, but every bottle inside it was fine.",
  "M|The problem was the test strips themselves. I dipped three strips into the same sample, one after another, and got three different readings for nitrate. Not slightly different - wildly different.",
  "F|Which is why we ended up buying a second brand halfway through the term. That has to go in the report.",
  "M|Agreed. And that is exactly what the tutor seized on when we saw her.",
  "F|It is. Although I honestly expected her to tell us to cut the number of sites. Six felt ambitious to both of us.",
  "M|She didn't, though. She was quite firm that six was fine, and she wasn't bothered about the time of day either, which surprised me - I thought she'd want everything at nine in the morning.",
  "F|Me too. No, her one instruction was about repetition. Every single test, at every site, has to be done three times over, and we report the average of the three.",
  "M|Three times each. It triples the work, but after those nitrate strips we can hardly argue.",
  "F|No, we can't. So - what worries you most about what's left to do?",
  "M|Not the writing, oddly enough. We've got the structure, and I rather enjoy writing.",
  "F|And the presentation is only ten minutes. I get nervous standing up, but ten minutes is ten minutes.",
  "M|What frightens me is the middle part - making sense of the numbers. Six sites, four chemicals, three repeats, over eight weeks. That is a spreadsheet the size of a wall, and neither of us has done proper statistics.",
  "F|That's exactly my fear as well. Working out what the results actually mean will be far and away the hardest part of this. We should book a session with the statistics adviser.",
  "M|Let's do that this week.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|All right - site by site, then. What do we say about the canal?",
  "M|Well, the bacteria there were low, and the oxygen was better than I expected. I did wonder whether the rain would push the readings around, but they were the same week after week, wet or dry. The one thing that stood out was zinc, and a trace of copper as well - not dangerous levels, but definitely present, at every single visit.",
  "F|Small quantities of metal at the canal. The old boatyard, presumably. And the boating lake?",
  "M|Ah, the lake. Nothing metallic there at all, but the bacterial count was off the scale. Higher than anywhere else we tested, by a very long way.",
  "F|The ducks, I imagine, and all the bread people throw in. Right - the stream behind the factory.",
  "M|This is the one nobody believes. We went there expecting the worst, didn't we?",
  "F|We did. The fence made it awkward to get down to the water, but we managed it safely enough. And it was the pleasant surprise of the entire project. Every reading came back low. That stream is in far better condition than either of us predicted.",
  "M|Which we should say plainly, even though it spoils the story. Now, the fountain - the one in the university square.",
  "F|The fountain is unfinished business. My phosphate readings there make no sense whatsoever, and then I dropped one of the sample bottles on the way back to the lab.",
  "M|So we go back next Tuesday and do the whole set again properly. We can't report anything until we have.",
  "F|Yes - the fountain has to be redone. The reservoir was the opposite. Beautifully dull.",
  "M|Wasn't it just? Every reading, every week, comfortably inside the official limits. It passed every standard there is.",
  "F|Which is what you would hope, since half the city drinks it. And finally the well, out at the village.",
  "M|The nitrates there were high, and they climbed sharply in April, right after the farmers spread fertiliser. There are fields on three sides of that well.",
  "F|So, pollution from agriculture at the village well. That's all six.",
  "M|And you didn't fall in once.",
  "F|Very nearly, at the canal. Come on - statistics adviser.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of timekeeping. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Every one of you glanced at a clock before you sat down, without giving it a second thought. Today I want to make you think about it, by going back to the beginning.",
  "F|The oldest method of telling the time needs no equipment whatsoever: you follow the shadow of the sun. Push a stick upright into the ground, watch the shadow travel round it, and you have divided your day into parts. The Egyptians refined that stick into the sundial, a proper instrument with marked hours. But the sundial has two obvious weaknesses. It tells you nothing at night, and it tells you nothing on a dull, cloudy day either.",
  "F|So people looked for something that would keep running whatever the sky was doing, and what they found was water. A water clock is beautifully simple. You fill a vessel, and you allow the water to escape at a steady rate through a small hole in the bottom. Marks on the inside tell you how much time has gone by. The Egyptians had them, the Chinese had them, and the Greeks put them to a use I find wonderfully practical. In the law courts of Athens a water clock stood beside the speaker, and when the water ran out, he had to sit down. It was there to limit the length of speeches - and politicians have been complaining about it ever since.",
  "F|Now, the mechanical clock. It appears in Europe about seven hundred years ago, and it is worth asking who wanted it, because the answer is not kings and not merchants. The first mechanical clocks were built in monasteries. Monks had to pray at fixed hours through the day and through the night, and getting a man out of bed at the right moment in the dark was a genuine engineering problem. These early machines were driven by weights, hanging on a rope, falling very slowly and turning a wheel. And here is the detail that surprises people: they had no face and no hands at all. Nobody looked at them. Their entire job was to strike, so the community learned the hour from a bell. They were also, by our standards, dreadful. A good one might gain or lose fifteen minutes in a single day.",
  "F|The great leap forward comes from an observation, and the story may even be true. Galileo, sitting in the cathedral at Pisa, is said to have watched a lamp swinging on its long chain, and timed the swings against his own pulse. Wide swing or narrow swing, the time was the same. That regularity is the principle of the pendulum, and in sixteen fifty-six the Dutch scientist Christiaan Huygens turned the principle into a machine and built the first pendulum clock. The improvement was extraordinary. Almost overnight, the error fell from a quarter of an hour a day to a few seconds a day.",
  "F|And yet the pendulum clock failed completely in the one place where accuracy was worth a fortune, and that was at sea. To find your longitude you must know exactly what time it is back at home, and a pendulum cannot swing evenly on a ship, because of the constant motion of the vessel - the roll, the pitch, the endless rise and fall. The problem was finally solved in the eighteenth century by an English carpenter, John Harrison, who spent forty years building marine chronometers driven by springs instead of a pendulum. His famous test came on a voyage to Jamaica. After eighty-one days at sea, his instrument was wrong by a matter of seconds.",
  "F|By the nineteenth century, accuracy had stopped being a private matter. Every town kept its own local time, and nobody minded until the railways arrived - because a timetable is meaningless if noon in one town is twelve minutes later than noon in the next. The railway companies imposed a single standard time across whole countries, and they were able to do it because the time signal travelled out along the telegraph, on the wires running beside the tracks, arriving everywhere at the same instant.",
  "F|The twentieth century moved the whole problem into physics. A quartz clock contains a tiny crystal, and when an electric current passes through it, the crystal vibrates tens of thousands of times every second with remarkable steadiness. Count those vibrations and you have a clock accurate enough for a wristwatch that costs almost nothing. Then, after nineteen fifty, came the atomic clock, which counts the vibrations of atoms themselves, and which will lose roughly one second in millions of years.",
  "F|Which brings me to the strangest part of the story. That absurd accuracy is not a laboratory luxury; you depend on it every time you find your way to an unfamiliar address. The positioning system in your phone works by timing radio signals from satellites, and each of those satellites carries several atomic clocks on board. An error of one millionth of a second puts you three hundred metres away from where you are actually standing. Two thousand years after Athens, we are still measuring time in order to answer a thoroughly practical question.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock5-s1.wav" $s1
Render "mock5-s2.wav" $s2
Render "mock5-s3.wav" $s3
Render "mock5-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
