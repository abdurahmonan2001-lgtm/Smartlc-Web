# Generates the four Mock Test 10 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman phoning a cafe about a part-time job that has been advertised. First, you have some time to look at questions one to five.",
  "P|6",
  "M|Now listen carefully and answer questions one to five.",
  "M|The Willow Cafe, good morning.",
  "F|Oh, hello. I'm calling about the part-time job - I saw your advertisement in the local newspaper this week. Is the position still open?",
  "M|It is indeed. Are you a student?",
  "F|Yes, at the college. Could you tell me a little about the work?",
  "M|Of course. It's mainly serving customers at the tables - taking orders, carrying food out. But we're a small team, so there's also some help needed in the kitchen. Washing up, simple preparation, that kind of thing.",
  "F|That's fine, I've done kitchen work before. And which days would it be?",
  "M|We need someone for the busy evenings at the end of the week. So that's Friday and Sunday - oh, wait, no, what am I saying. We stopped opening on Sundays back in January. Friday and Saturday, those are the evenings.",
  "F|Friday and Saturday. And what are the hours exactly?",
  "M|You'd start at six in the evening. We close the doors to customers at ten, but there's clearing and cleaning to do after that, so the shift officially ends at eleven o'clock. That's the time to put in your diary.",
  "F|Six until eleven, fine. And could I ask about the pay?",
  "M|Certainly. For your first two weeks - that's a trial period - it's twenty-five thousand som an hour. After the trial you go onto the normal rate, which is twenty-eight thousand.",
  "F|Twenty-eight once the trial's finished. That seems fair.",
  "M|And there's one other thing people like: you get a free meal on every shift. The cook makes dinner for the staff at half past five, before things get busy.",
  "F|Oh, lovely.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "F|Do I need to buy a uniform?",
  "M|Not really. You wear your own black trousers and a white shirt - most people have those already. And we provide an apron, a green one with the cafe's name on the front.",
  "F|An apron from you, good. And do the staff keep their tips?",
  "M|There's a jar by the till, and at the end of the night the tips are shared equally among everyone working - kitchen included. It usually adds a little extra.",
  "F|That sounds fair. So what's the next step? Should I come in for an interview?",
  "M|Yes. You'll need to speak to the manager. His name is Mr Rashidov - shall I spell that for you? R - A - S - H - I - D - O - V. Rashidov.",
  "F|R - A - S - H - I - D - O - V. Got it.",
  "M|He's holding interviews on Tuesday the seventeenth of March... oh, hold on. No, I'm looking at the wrong week - he's away at a food fair then. It'll be the following Tuesday, the twenty-fourth of March. From two o'clock onwards.",
  "F|Tuesday the twenty-fourth. Do I need to bring anything with me?",
  "M|Don't worry about preparing a CV - we have our own application form you can fill in here. But do bring a reference, a letter from a previous employer - anyone you've worked for before.",
  "F|A reference, fine - my old supervisor will write one. And where do I go when I arrive? The cafe itself?",
  "M|We're closed on Tuesday afternoons, so the front door will be locked. Come round to the side door - it's the one right next to the bakery - and just knock.",
  "F|The side door by the bakery. Wonderful. Thank you so much for your help.",
  "M|You're very welcome. Good luck with the interview.",
  "M|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear the organiser of the Greenvale Walking Festival describing this year's programme to a public meeting. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone - lovely to see so many of you here. As chair of the organising committee, my job tonight is to tell you what's happening at this year's Greenvale Walking Festival.",
  "F|Now, people always ask what's new this year, so let me clear a few things up. The walks will still leave from different points around the town - we tried a single meeting place two years ago and, frankly, it was chaos, so we won't be repeating that. Our evening walks, which many of you enjoyed last summer, continue exactly as before. The real change is the size of the festival itself: for the first time it will run for ten days instead of seven, which lets us cover two full weekends. We think that's the biggest step forward since the festival began.",
  "F|Next, registration. In past years you could put your name down at the library, but the staff there simply can't manage it any more. And although the festival website shows every walk, with times, maps and photographs, you can't actually sign up online - we're not quite that modern yet. So, to book your place on any walk, please call in at the tourist office on Market Street. They have the full list and they take bookings every day.",
  "F|A word about what to bring. Good shoes, obviously. The longer walks include a food stop, so you needn't carry lunch, and the long-range forecast is dry, so waterproofs shouldn't be necessary. But whichever walk you choose, you must bring something to drink. Once you leave town there is almost nowhere to fill a bottle, and we've had people taken ill in previous years.",
  "F|Finally, money. Every walker pays a small fee, and you deserve to know where it goes. Last year the fees paid for repairing the footpaths up on the ridge - you'll notice the difference. The new visitors' map some of you have seen was paid for by the town council, not by us. This year, everything we raise will buy new signposts for the whole network of paths; the old ones have almost rusted away.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|So let me take you through the six walks on this year's programme.",
  "F|We open with the Riverside Walk. It's level the whole way and follows a smooth, paved path beside the water, which means it's fully suitable for wheelchair users - and for pushchairs, come to that. Everyone can join this one.",
  "F|Then there's the Castle Walk, up to the old ruins. This year it will be led by a historian from the town museum, who'll stop at a dozen places along the way to explain what you're actually looking at. I've heard him speak - don't miss it.",
  "F|The Sunrise Walk is our most unusual offering. It leaves the hilltop car park at five in the morning, in the dark, and you watch the dawn from the summit. One warning: if the evening forecast is for cloud or rain, the walk simply won't take place - there's no sense climbing in the dark to see nothing - so do check the festival phone line the night before.",
  "F|The Orchard Walk is a gentle afternoon route through the fruit farms, and it ends with a proper meal: soup, fresh bread and fruit from the orchard itself, all included in your fee. Come hungry, is my advice.",
  "F|The Valley Walk is completely new - we have never been able to offer it before, because it crosses private farmland. This year, for the first time, the farmer has kindly opened his gates to us. None of the committee has even walked it yet - you'll be the very first.",
  "F|And finally the Ridge Walk, our longest and, I'd say, our most beautiful. Be aware that it's the only walk that doesn't bring you back to where you started: it finishes in the village of Elmford, on the far side of the hills, and a special bus brings walkers back to town at five o'clock.",
  "F|Right - now let me say a little about the closing ceremony...",
  "M|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two students, Timur and Zarina, planning a study of university students' reading habits. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Zarina, before we plan anything else - the proposal form asks why we chose the topic. Reading habits. Was it because your own reading changed when you started university? Mine certainly did.",
  "F|Honestly, no - I read much the same as I did at school. What actually started it was a national report I came across, about how little university students read for pleasure. The figures genuinely shocked me, and I wanted to know whether our university looks the same. We can ask the librarian for borrowing data later, but the idea came straight from that report.",
  "M|Fine, that goes on the form. Now - who do we study? I wondered about just first-years, since the change from school is interesting. Or literature students - they read more than anybody.",
  "F|But that's exactly the problem - literature students have to read, so it tells us nothing about choice. And first-years are only part of the picture. If we want a true answer, we should include students from every department, and from every year.",
  "M|You're right. All departments it is. Next - how do we actually collect the data? The obvious method is an online questionnaire.",
  "F|Obvious, but weak. People exaggerate on questionnaires - everyone claims to read more than they do. And proper face-to-face interviews would take weeks we don't have. What I'd like is for people to keep a reading diary: a short entry every day, for two weeks, recording what they actually read.",
  "M|A diary - yes. It measures behaviour, not memory. Let's do that. Though I do have one worry. Two weeks is a long time, and people start these things full of enthusiasm and then simply stop writing. If half our participants give up before the end, we're left with nothing.",
  "F|A fair concern - so the entries must be very short, a minute a day at most. Now, I should report on the pilot study. Five people kept the diary last week, and it taught us something odd: three of them listened to audiobooks during the week but never wrote them down. They didn't think listening counted as reading. So I've rewritten our definition - reading now covers any book, whether on paper, on a screen, or listened to.",
  "M|Good catch - that would have distorted everything. And what did the tutor say when you showed her the plan?",
  "F|She was positive, mostly. She said the research question is already narrow enough, and that there's no hurry to start collecting data. Her one firm instruction was to read more of the earlier studies first - she says half of what we're planning has been tried before, and we should learn from it.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Right - the diary itself. What goes on the page?",
  "M|I originally wanted a daily word count - the number of words each person read.",
  "F|Timur, nobody is going to count words every day. It's far too much effort, and they'd only guess anyway.",
  "M|Agreed - drop it. But one thing we do need in every entry is the format: whether the text was on paper, on a screen, or audio. That's the heart of the whole study.",
  "F|Absolutely - that's in. And I'd add a rating for enjoyment. Just a simple one-to-five scale for each thing they read. It costs them two seconds and gives us a whole extra dimension.",
  "M|Yes, let's include that too. What about a weekly summary page, where they look back over the week?",
  "F|If they're writing every day, a summary adds nothing - it's just more work for them. And definitely no list of recommended books at the back. We'd be changing the very habits we're trying to measure.",
  "M|True on both counts. Now, the practical steps before the study starts. The big one is the ethics committee - we can't collect a single diary until they approve the study, and they only meet once a month. The form has to be submitted this week.",
  "F|I'll draft it tonight and you can check it tomorrow. And I think we should hold a short training session for all the participants - ten minutes, showing them exactly how to fill in a diary page. In the pilot, everybody invented their own system, and comparing the diaries afterwards was a nightmare.",
  "M|Good idea - first week, before anyone starts. The librarian can wait until we have results to show her; there's no point meeting her yet. And for recruiting, let's go through the lecturers rather than advertising on social media - we need every department, remember, not just the people who follow us.",
  "F|Agreed. And no rewards, I'm afraid - we simply haven't the budget for gifts. People will have to do it for science.",
  "M|For science, then. To the library?",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about how scientists monitor volcanoes. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. Today I want to look at one of the most practical branches of the earth sciences: the monitoring of volcanoes. Why does it matter? Around eight hundred million people - roughly one person in ten on this planet - live within a hundred kilometres of an active volcano. And here is the encouraging part: unlike earthquakes, which strike without notice, volcanoes almost always give warnings before they erupt. Monitoring is the science of reading those warnings in time.",
  "M|The first and oldest family of signals is earthquakes. As magma - molten rock - forces its way upwards, it has to break the solid rock around it, and every crack produces a small earthquake. These are usually far too weak for anyone to feel, but they are detected by instruments called seismometers, planted in networks across the volcano's slopes. And the pattern matters as much as the events themselves. Alongside the individual snaps and cracks, instruments sometimes record a continuous, rhythmic shaking known as tremor - and this is a signal of a different order, because tremor tells us that magma is not merely present but actually moving. Just as important, swarms of tiny earthquakes typically become more frequent in the days before an eruption, which is why seismic networks are the backbone of every warning system in the world.",
  "M|The second family of signals concerns the shape of the mountain itself. Magma rising into a volcano has to occupy space, and the pressure makes the ground above it swell, rather like a loaf rising in the oven. On the mountain, this is measured by GPS receivers, which record their own position hour by hour, and by tiltmeters, which sense the slightest change in slope. From orbit, satellites use radar, comparing repeated images of the same slopes to map movement across the whole mountain at once. The precision is astonishing: changes of just a few millimetres can be detected from space.",
  "M|Third, gases. Magma at depth holds gases dissolved under great pressure, and as it rises they escape - often long before the magma itself arrives at the surface. The most useful gas to measure is sulphur dioxide, because fresh magma releases it in large and recognisable quantities. Instruments are carried up to the crater rim by scientists, flown through the plume on aircraft, and increasingly mounted on drones, which can hover in places where no person could safely stand. Rising gas output generally means rising magma. But watch for the opposite as well: a sudden fall in gas may mean the vent has become blocked - and a blocked volcano is a dangerous volcano, because pressure then builds towards an explosion.",
  "M|There are further signs, subtler but still valuable. Thermal cameras record a rise in the surface temperature of the ground as heat works its way upwards: crater lakes warm, and snow begins to melt in telltale patterns. Volcanoes also leave chemical fingerprints in the landscape. The level of water in local wells can rise or fall in the months before an eruption, and its chemistry can change as volcanic gases dissolve into it underground.",
  "M|Now, no single signal, on its own, means an eruption is coming. The skill lies in combining them, and that is the work of a volcano observatory, where every data stream - the earthquakes, the ground movement, the gas, the temperature, the water - arrives in one room, and scientists weigh them together, day and night. Their judgements are published as alert levels on a simple colour scale, from green up to red - a language designed especially for aviation, because drifting volcanic ash can destroy a jet engine from a hundred kilometres away.",
  "M|Does all this actually save lives? Emphatically, yes. The classic case is Mount Pinatubo in the Philippines, in nineteen ninety-one. Monitoring teams read the warning signs - the swarms of earthquakes, the swelling ground, the surging gas - and forecast the great eruption days in advance. The authorities moved tens of thousands of people out of the danger zone, and thousands of lives were saved by what is still the most successful volcanic forecast in history. That, ultimately, is what those quiet instruments on the mountainside are for.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock10-s1.wav" $s1
Render "mock10-s2.wav" $s2
Render "mock10-s3.wav" $s3
Render "mock10-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
