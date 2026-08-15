# Generates the four Practice Set 18 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a photography studio to book a portrait session. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good morning, Bright Room Photography, Green Lane. How can I help you?",
  "F|Oh, hello. I'd like to book a portrait session, if you have anything free next month.",
  "M|I'm sure we can find you something. Let me open the diary. Could I take your name first?",
  "F|It's Dilnoza Ergasheva.",
  "M|And how do you spell the surname?",
  "F|Of course. It's E, R, G, A, S, H, E, V, A. Ergasheva.",
  "M|Thank you. Now, which session did you have in mind? We run a newborn session, which is only for babies under three months, and we run a family session.",
  "F|Well, my youngest is four now, so it would be all of us together - two adults and three children.",
  "M|Then it's the family session you want. The newborn one wouldn't suit you at all.",
  "F|The family session, then.",
  "M|Right. Which dates were you thinking of?",
  "F|A Saturday in May, if that's possible.",
  "M|Let's see. I could do Saturday the ninth... no, I do apologise, ignore that - the ninth is a wedding and the studio is closed to the public. The first Saturday I can offer you is the sixteenth of May.",
  "F|Saturday the sixteenth. That works for us.",
  "M|Good. The session starts at eleven in the morning and it lasts about ninety minutes - a little longer with children, usually.",
  "F|And which room would we be in?",
  "M|Normally the family sessions are held in the Willow Studio at the back, but we're rebuilding the backdrop wall in there this month, so you'll be in the Orchard Studio instead. That's on the first floor, and honestly the daylight is far better up there.",
  "F|The Orchard Studio, first floor. And how much is it?",
  "M|The family session was four hundred thousand som when we advertised it in the winter, but we've reduced it for the spring, so you'll pay three hundred and twenty thousand.",
  "F|Three hundred and twenty. Do you want a deposit today?",
  "M|No deposit at all. You settle the whole amount on the day, at the desk.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|And what do we actually get for that?",
  "M|All the digital files, and a set of prints. It used to be twenty prints, but people told us they only ever framed a handful of them, so the package now includes twelve printed photographs, and you choose which twelve.",
  "F|Twelve prints. That's plenty for us. Is there anything we should know about what to wear?",
  "M|Yes, and hardly anyone thinks about it. Plain colours photograph beautifully. What you want to avoid is anything with a strong pattern - stripes and small checks in particular do very strange things to the camera.",
  "F|No pattern. Understood.",
  "M|The other thing people ask about is getting here. Green Lane itself is permit holders only, so please don't leave the car on the street. There is free parking behind the building - come through the archway and you'll see it.",
  "F|Free parking at the back. Good.",
  "M|Oh, and one more thing, since you said you were flexible. Saturday is our busiest day, so there's no reduction then. But anyone who books on a Wednesday gets ten per cent off the whole session.",
  "F|A Wednesday. Hmm... no, the children are at school. We'll keep the Saturday.",
  "M|Of course. Now, we do send a reminder. We used to post a card, but half of them never arrived, so we send a text now, two days beforehand. Is your mobile the best number?",
  "F|It is, yes.",
  "M|Lovely. I'll put the booking through, and the text will reach you on the Thursday.",
  "F|Thank you very much indeed. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the officer in charge of a new wildlife pond speaking to residents at a park meeting. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out on such a cold night. I'm the project officer for the new wildlife pond in Ashgrove Park, and I want to tell you where the money went and what happens next.",
  "F|First, why we built it at all. There's a story going round that the pond was the idea of a wildlife charity, and it's quite true that the county wildlife trust advised us and still does - but they came in afterwards, once the digging had started. There was also a very good school competition, and one of the winning drawings is on the noticeboard by the gate. The real reason, though, was far less romantic. The bottom corner of the park, where the football pitch is, flooded four winters in a row and the pitch was unplayable from October to March. An engineer told us that the cheapest cure was not a drain but a pond - somewhere for all that water to go.",
  "F|Now, money. The town council owns the park and gave us the land and a good deal of staff time, but not a penny in cash, and I want to be straight with you about that. Local businesses have been generous with plants and benches, and we are grateful to them. But the money that actually built the pond, ninety per cent of it, came from a national lottery grant, and without that none of this would have happened.",
  "F|What surprised us? Well, the volunteers were wonderful, though we did expect that - this is a park with a very active friends group. The liner was expensive, but the quotation was accurate, so there was no surprise there either. What genuinely astonished every one of us was the speed of the wildlife. We filled the pond in April and expected a quiet first summer. By June we had dragonflies, by August there were frogs, and this spring a pair of herons. Nobody on the team predicted anything like that.",
  "F|One request before we go on. There are three things people always ask me about. Feeding the ducks is fine, in small amounts, with the proper food we sell at the kiosk. Walking on the grass is fine too - it is a park, after all. The one thing we do ask, and I'm afraid we have to insist on it, is that you keep your dog on a lead anywhere near the water. A dog in a wildlife pond in May will undo a year of work in ten minutes.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right. Let me take you round the site, area by area.",
  "F|The main pond first, the big one in the middle. It should have taken eight weeks. It took seven months. We hit clay, then a Victorian drain that nobody had recorded, then the wettest autumn for years, and the contractors were on site far longer than any of us had planned. That is where the contingency budget went.",
  "F|Beside it is the shallow pool, which is really just a wide muddy edge, and it is my favourite thing in the whole park. We put it in for tadpoles. What we got, last June, was a great crested newt - a protected species that had not been recorded anywhere in this district for thirty years. Nobody expected that, least of all me.",
  "F|Then the boardwalk, which crosses the reeds on the north side. We had no money left for it whatsoever, and it would still be a line on a plan if the timber company on Mill Road had not offered to pay for the whole structure. Their name is on the small plaque at the entrance to it, and I think they have earned it.",
  "F|The wildflower meadow, on the slope above the pond, is entirely in the hands of the friends group. They sowed it, they cut it every September, and they rake the cuttings off by hand. The council does nothing up there and neither do I. From start to finish it is looked after by volunteers.",
  "F|The bird hide is the one thing I have to apologise for this evening. The frame is up, but the roof and the viewing screens are not, so it stays locked and no visitor has been inside it yet. We hope to open it before the summer, but I am not going to promise you a date tonight.",
  "F|And finally the picnic area, by the eastern gate. Some of you will remember what stood there before: the old staff car park, twenty spaces of cracked tarmac. We lifted every slab of it, and there are now eight tables and a small orchard where the cars used to stand.",
  "F|Right - the tea is at the back, and I'll take questions for as long as you like.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two architecture students, Bakhtiyor and Kamola, planning a study of light in university study spaces. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Kamola, the proposal form. Box one: why did we choose this topic?",
  "F|Do you want the official answer or the true one?",
  "M|The true one. Doctor Umarov's lecture on lighting design? Half the group will put that.",
  "F|And it would be dishonest, because we had chosen the topic a fortnight before that lecture. It wasn't the newspaper piece either, the one about screens and sleep. It was that basement room in the old library where I revised all last winter. Three hours in there and I could not hold a single sentence in my head. I came out convinced the room was doing it, and I wanted to find out whether I was right.",
  "M|That's what we write, then. Now, the reading. There is a great deal of it.",
  "F|There is, and it's better than you said. The sample sizes weren't small - some of those studies had hundreds of participants. And they didn't ignore artificial light at all; several of them measured nothing else. My objection is different. Almost everything published is about offices. People sitting at the same desk doing paid work for eight hours. Nobody has looked properly at the rooms where students actually study.",
  "M|Agreed, and that's our gap. Right - where do we measure? I still like the idea of the science library.",
  "F|One room tells us nothing, though. We need contrast. The new learning centre has four study rooms on four sides of the building, same furniture, same lamps, completely different windows. If we take our readings in all four, we can compare them properly. And I'd leave the lecture theatres out - nobody chooses to revise in one.",
  "M|The four rooms of the learning centre, then. And what do we measure with? There's a free app that uses the phone camera.",
  "F|I tried it. Two phones side by side gave readings forty per cent apart. And a decent meter costs more than our whole budget, so buying one is out. But the physics department lends its light meters to project students - I checked on Monday. We borrow one of theirs, and it's calibrated.",
  "M|Borrow the physics meter. Good. Now, our supervisor.",
  "F|I saw her on Tuesday. She was relaxed about most of it. She doesn't mind us using a single building, and she said absolutely not to paying our volunteers - apparently that needs a separate approval. But she was immovable on one point: every reading has to be taken at fixed times of day, the same three times in every room, or daylight will simply swamp our results.",
  "M|Fixed times. That's fair. And I suppose that's what worries me, actually. Not the volunteers - there are two hundred students in that building every afternoon. It's the sky. If we get a week of cloud, our daylight rooms won't look like daylight rooms at all.",
  "F|That's exactly my fear too. The weather could ruin the whole comparison. We'll have to record the conditions outside every single time and hope for a mixed fortnight.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So what exactly are we recording in each room?",
  "M|The obvious one is the brightness at desk level. That's the number the meter gives us, that's what the standards are written in, and it goes straight into the comparison.",
  "F|Brightness at desk level, agreed. And alongside it I want the amount of daylight coming through the windows, measured separately with the blinds up and the lamps switched off. Without that we can't tell a bright room from a well-lit one.",
  "M|Daylight through the windows as well. Fine. What about the colour of the light? Warm against cool - there's a lot written about it.",
  "F|There is, but our meter doesn't measure colour, and I'm not adding an instrument we haven't got.",
  "M|Glare from the screens, then. That's what people complain about.",
  "F|Complain about, yes, but you cannot measure glare with the equipment we have - it's a judgement, not a reading. Leave it. And before you ask, room temperature is a different project altogether.",
  "M|All right, two measurements. Now, jobs before the pilot week.",
  "F|The rooms first, surely?",
  "M|No need. The learning centre rooms can't be booked at all - they're open access, you just walk in. So there's nothing to reserve.",
  "F|True. Then the consent form. We can't ask anyone anything until they've signed one, and the ethics office wants to see our wording first.",
  "M|You write the consent form, then, and I'll go and collect the light meter from physics. They'll only hold it for a week, so it has to be this Friday.",
  "F|Perfect. The posters can wait - we don't need to recruit anyone until the pilot is finished.",
  "M|And last year's data isn't worth analysing; it was taken with the phone app.",
  "F|Then that's the two of us sorted. Consent form and meter, and we meet on Monday.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of the calendar. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we looked at how societies measured the hour. Today I want to look at the longer unit: the year, and the extraordinary trouble people have taken to keep a calendar in step with the sky.",
  "F|The trouble begins with the moon, because the moon is the obvious clock. It is large, it is public, and it changes shape on a fixed schedule, so almost every early calendar followed the phases of the moon. The difficulty is arithmetic. A lunar month is roughly twenty-nine and a half days, so twelve of them come to three hundred and fifty-four days, which leaves a lunar year about eleven days short of the true solar year. Eleven days does not sound like much, but it accumulates: after three years your calendar is more than a month adrift, and the harvest festival is arriving before the harvest. The seasons, in effect, slide backwards through the calendar.",
  "F|The early solution was to patch the calendar by hand. In Babylon, and in many other states, a whole extra month was simply inserted whenever a ruler issued a decree - which meant that nobody more than a few months ahead could say what date a future day would carry.",
  "F|The first people to escape the moon altogether were the Egyptians. They abandoned the lunar month and counted a plain three hundred and sixty-five days: twelve months of thirty days, plus five extra days at the end of the year. Their year was anchored to two events that arrived together, the flooding of the Nile and the return of the star Sirius to the dawn sky. It was an elegant system with one flaw. The true year is about a quarter of a day longer than three hundred and sixty-five days, and the Egyptians added no leap day, so their calendar slipped steadily through the seasons, taking some fourteen hundred years to come back to where it started. Historians call it the wandering year.",
  "F|Rome inherited a lunar calendar and made a political instrument of it. The college of priests decided when extra days should be added, and since terms of office ran by the calendar, the priests were widely accused of taking bribes to lengthen a friend's year in office or shorten an enemy's. By the middle of the first century before our era the Roman calendar was some three months out of step with the seasons.",
  "F|Julius Caesar ended this. He was advised by Sosigenes, a Greek astronomer from Alexandria, who told him two things. First, the immediate mess had to be cleared: the year we call forty-six before our era was stretched to four hundred and forty-five days, the longest year in recorded history, to put the seasons back where they belonged. Second, the moon had to be given up completely. The Julian calendar that followed had three hundred and sixty-five days, with one extra day added every fourth year.",
  "F|That was very nearly right, and nearly right is a dangerous thing in a calendar. The Julian year was about eleven minutes longer than the true solar year, which sounds trivial and amounts to a full day every hundred and twenty-eight years. Over fourteen centuries the error grew to ten days, and by the fifteen hundreds the spring equinox, which the church had fixed at the twenty-first of March, was falling on the eleventh. That mattered because it disturbed the date of Easter, which is calculated from the equinox, and the church had been arguing about the date of Easter for a thousand years.",
  "F|The correction came in fifteen eighty-two from Pope Gregory the Thirteenth. His astronomers did two things. They deleted ten days from that October, so that the fourth was followed immediately by the fifteenth. And they repaired the leap year rule for the future: a century year is a leap year only if it can be divided by four hundred. So sixteen hundred was a leap year and two thousand was a leap year, but seventeen hundred, eighteen hundred and nineteen hundred were not.",
  "F|Getting the world to accept the new calendar took another three hundred and forty years. Catholic countries changed within a year or two. Protestant and Orthodox ones refused, because the reform came from Rome, and the delay was expensive: for centuries a merchant crossing Europe changed the date as well as the currency. Britain and its colonies held out until seventeen fifty-two, when eleven days had to be deleted. Russia kept the old calendar right through the First World War and adopted the new one only after the revolution, which is why the October rising is now commemorated in November.",
  "F|One last piece of the calendar has no astronomy in it whatsoever, and that is the week. Nothing in the sky takes seven days to do anything. Our week descends from Babylonian astronomers, who named its days after the seven planets they could see with the naked eye, and the names survived every reform that followed. And the modern calendar? The second is now defined by atomic clocks rather than by the earth, and a leap second is added, very occasionally, when the earth is running slow. Meanwhile every proposal to redesign the calendar into equal months has failed, defeated by the one thing no reformer can shift: the unbroken seven-day week.",
  "F|Next week we turn to the measurement of longitude.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset18-s1.wav" $s1
Render "pset18-s2.wav" $s2
Render "pset18-s3.wav" $s3
Render "pset18-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
