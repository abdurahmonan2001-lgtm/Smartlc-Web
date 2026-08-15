# Generates the four Mock Test 3 listening recordings with Windows TTS.
# Same conventions as Mocks 1-2: "F|"/"M|" pick the voice, "P|<seconds>" is
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
  "M|Part one. You will hear a man phoning a fitness centre about becoming a member. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good morning, Silverdale Fitness Centre. How can I help you?",
  "M|Oh, hello. I'd like to become a member, please. A friend of mine trains with you and he never stops talking about the place.",
  "F|That's lovely to hear. I can set most of it up over the phone. Could I take your name first?",
  "M|Of course. It's Timur Rakhimov. Shall I spell the surname? R, A, K, H, I, M, O, V. Rakhimov.",
  "F|R, A, K, H, I, M, O, V. Got it. Now, we have three kinds of membership: standard, family, and student. Shall I put you down as standard?",
  "M|Actually, I'm studying at Halton College, so student, please.",
  "F|Student it is. I should mention you'll need to show a valid college card - we check it when you join and again each time you renew.",
  "M|No problem, I always carry it. And how much will I be paying?",
  "F|Well, the standard rate is two hundred thousand som a month, but on the student membership you pay one hundred and sixty thousand.",
  "M|One hundred and sixty. That's better than I expected. Is there a joining fee on top of that?",
  "F|Normally there is, yes - but it's being waived during September as a welcome offer. So this month you pay nothing at all to join.",
  "M|Perfect timing, then. When could I actually start?",
  "M|Could we say the first of September?",
  "F|Ah, unfortunately not the first - the whole centre is closed that day for staff training. Could we make it the day after, the second?",
  "M|The second of September. Yes, that's fine.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|And what are your opening hours? I usually train quite late.",
  "F|On weekdays we're open from six thirty in the morning right through to ten at night. Weekends are a little shorter - we close at eight in the evening.",
  "M|Eight at weekends. That still works. Are any classes included in the membership?",
  "F|Two of them are completely free for members. There's yoga on Tuesday and Thursday evenings. And the second one used to be Zumba, but our instructor moved abroad in the spring, so it's boxing now, on Saturday mornings.",
  "M|Yoga and boxing - I'll certainly try the boxing. And the swimming pool?",
  "F|The pool is included as well, as often as you like. The one thing that isn't covered is the sauna. There's a separate charge for that, each visit.",
  "M|Fair enough. Is there anything I need to bring when I first come in?",
  "F|Yes, please bring your passport - we need it to make up your membership card. And your college card too, of course, for the discount.",
  "M|Passport and college card. Anything else I should know?",
  "F|One nice thing: every new member receives a sports bag with the centre's logo on it. You'll be given yours at your first visit.",
  "M|Oh, very nice. And how long does the membership card take?",
  "F|It's normally a week, but September is a quiet month, so at the moment it's five days. You collect it from reception - we don't post cards out any more.",
  "M|Five days, from reception. Wonderful. Thank you so much for your help.",
  "F|You're very welcome, Timur. We'll see you on the second.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a council officer telling local residents about a new cycle-hire scheme for the city centre. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming. My name is Carol Denning, I work in the transport department at Halton City Council, and I'm here to tell you about CityRide, the cycle-hire scheme we're launching at the end of this month.",
  "F|Now, whenever I present this scheme, people assume we're doing it to bring in more visitors, and the newspapers love to talk about the health benefits. Both of those are welcome, of course - but neither is the reason the council is paying for this. The number of cars entering the centre has grown by a third in ten years, and the scheme's real purpose is to cut that traffic. Every short car trip that becomes a bike trip means a little more space on our roads.",
  "F|So, how do you join? People keep telephoning the council offices to sign up, and I'm afraid the staff there can only turn you away - it isn't something we can do at the counter. And although every docking station has a card reader, that reader is only for unlocking a bike once you're already a member. To register, you download the CityRide application onto your phone. It takes about five minutes, and you only ever do it once.",
  "F|A word about helmets. Legally, adult riders don't have to wear one, and I'm afraid you won't be able to rent helmets at the stations either. But we would much rather you wore one, so here's the good news: everyone who registers during the scheme's first year will be sent a helmet completely free of charge.",
  "F|And we're already thinking about where the scheme goes next. There's been a loud campaign for a station at the football stadium, but the ground is only busy on match days, so that made no sense. Others suggest the airport - honestly, it's twelve kilometres away, far too far for these bikes. What we will do, next year, is extend the scheme to the university. The students have been asking for it since the day we announced.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Now, if you'd all look at the map of the city centre, I'll show you where the docking stations will be. Find the bridge at the top of the map, where Station Road crosses the river.",
  "F|Coming over the bridge into the centre, the main docking station - the largest one, with fifty bikes - will be on your right, in the open space directly in front of the Town Hall. That's where most journeys will start and finish.",
  "F|Next, the repair workshop, where our mechanics will check every bicycle once a month. Carry on down Station Road, all the way to the bottom of the map, and you'll find it beside the Railway Station - just to the left of the station entrance as you face it.",
  "F|If you have any trouble registering, come and see us at the registration point. That's on High Street: walking along from Station Road, it's on the south side of the street, directly opposite the Museum. There'll be someone there every weekday until Christmas.",
  "F|We'll also have twenty electric bicycles - very popular, I suspect. They get a docking station of their own, on the north side of High Street, right at the entrance to the Park, where the park path meets the street.",
  "F|One station will have a roof over it, for anyone who'd rather not unlock a wet bicycle. That covered station stands in the middle of Market Square, between the stalls.",
  "F|And finally, one more station is planned, but it won't open until next spring. It will stand on the riverbank to the west of the bridge, right beside the walking path, so that you'll be able to ride along the river itself.",
  "F|Right - I'll take questions in a moment, but first, the mayor has asked me to remind you that the first thirty minutes of every journey will be free for the whole of the opening month.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two marine biology students, Aisha and Daniel, planning a field trip with advice from their tutor. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Aisha, we need to settle where we're actually going. I still think Merrick Sands has the greatest variety of species - we'd have a longer list by lunchtime.",
  "F|It does, Daniel, and it's easier to reach too - the bus stops practically on the beach. But think about what Dr Novak said: students from our department have been recording at Culver Point every autumn for nine years. If we go there, we can set our figures against all that earlier data. That's worth far more than a longer species list.",
  "M|Hmm. When you put it like that - fine, Culver Point it is.",
  "F|Good. Now, the date. It really has to be the third week of October.",
  "M|Why - is that when the field centre has room for us?",
  "F|The centre actually has space all month. No, it's the tides. That week has the lowest tides of the whole season, so the lower shore is exposed for about two hours. Any other week and we'd be sampling in ankle-deep water.",
  "M|Right. And Dr Novak's here all term, so her diary isn't a problem either.",
  "M|Are you worried about the weather at all? October can be rough out there.",
  "F|Not really - the long-range forecast is settled, and a bit of rain never stopped fieldwork. And before you ask, the hostel at the field centre is cheap, so the money side is fine too. What genuinely worries me is the equipment. The quadrats, the buckets, the balance - we carry every bit of it down the cliff path ourselves, and that's forty minutes each way.",
  "M|We'll survive. Two trips if we have to.",
  "F|Now, identification. How are we naming what we find? The department's printed guide?",
  "M|I had a look at it - it's twenty years old and half the names have changed since then. And sending photographs off to an expert would take weeks, we'd miss the deadline. But the city museum produces an identification app, and it stores everything on the phone itself, so it doesn't matter that there's no signal at the shore. Dr Novak rates it, so let's use that.",
  "F|The app it is. Speaking of Dr Novak - she was very firm about one thing, wasn't she?",
  "M|The risk assessment. She said she simply won't sign off the trip until the complete form has been submitted - hazards, tide times, emergency contacts, all of it. She did also tell us to stay back from the cliff edge, but the form is the thing she absolutely insists on.",
  "F|I'll draft it tonight, then. One more thing - what actually happens to our results afterwards? You wanted them in the national shore survey, didn't you?",
  "M|I did, and I asked about it. The national scheme only accepts records checked by a professional, so ours don't qualify. And the department blog is really just for photos. What Dr Novak wants is for our numbers to be set against the records from previous years at Culver Point. That comparison is the whole point of the project.",
  "F|Compared with the past data. Agreed.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Let's list what still has to happen before we leave.",
  "M|The minibus - oh, wait, no. Dr Novak booked that herself last week, remember? Cross it off.",
  "F|And she said she'd telephone the warden of the field centre personally, so that isn't ours either. But the tide-safety video is - the department won't let anyone onto the shore who hasn't watched it, and that means both of us.",
  "M|Agreed - let's watch it together tomorrow after the lecture. And we should print the recording sheets ourselves. Fifty copies at least - they always get soaked or blow away.",
  "F|Yes, the printing is definitely ours. What about waterproof notebooks? People swear by them.",
  "M|I checked the price - twelve thousand som each. Ordinary paper inside plastic sleeves does the same job for nothing.",
  "F|Then no notebooks. So it's the video, and the sheets. Now, the last big thing: what exactly do we measure in each quadrat?",
  "M|Go on - you've clearly decided.",
  "F|Two things, in every single quadrat, no exceptions. We count the number of different species - everything we can see - and we estimate the percentage of seaweed cover.",
  "M|Not the water temperature?",
  "F|Only once for the whole site, when we arrive. Not quadrat by quadrat - it barely changes across the shore.",
  "M|And last year's group measured the biggest shellfish in every square, didn't they?",
  "F|They did, and Dr Novak says it told them almost nothing, so we're dropping it. And before you suggest the rock pools - most quadrats won't even contain one, so measuring depth just isn't practical.",
  "M|Fine. Species count and seaweed cover. Let's get the plan written up.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of glass. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Glass feels like a modern material - the towers of our cities are wrapped in it from pavement to roof - and yet its story begins long before human beings had made anything at all. Nature made glass first. When volcanic lava cools very quickly, it hardens into obsidian: a natural glass, black and shining. Obsidian breaks with an edge sharper than any metal, and prehistoric peoples treasured it. They shaped it into knives, and traded those blades across enormous distances, hundreds of kilometres from any volcano.",
  "F|The first people to make glass for themselves lived in Mesopotamia and Egypt, more than four thousand years ago. Their recipe has, in essence, never changed: they melted sand together with the ashes of certain plants, at temperatures their ordinary fires could barely reach. Because it was so difficult to produce, early glass was a luxury. The oldest objects we have found are small beads, worn as jewellery and buried with their owners - at that time, glass was valued as highly as precious stones.",
  "F|The great turning point came about two thousand years ago, in the Roman world, with the invention of glassblowing. A worker gathers a lump of molten glass on the end of a hollow iron pipe and blows down it, inflating the glass like a soap bubble, and that bubble can be shaped into almost anything in a matter of minutes. The consequences were enormous. A bottle that had once taken days to make could now be produced before your eyes; prices fell and fell, and glass became, for the first time, an everyday material. The Romans were also the first people to fit glass into windows - small, cloudy panes, but a revolution in how buildings could be lit.",
  "F|Let us jump forward to the Middle Ages, and to Venice. By the thirteenth century, Venice was the centre of luxury glass for the whole of Europe, and in the year twelve ninety-one the city made a remarkable decision: every glass furnace was moved out of the city itself and onto the island of Murano. The official reason was the danger of fires - Venice was a city built largely of wood, and glass furnaces burned day and night. But the move had a second advantage: it kept the trade's secrets in one small place. Craftsmen on Murano were forbidden to leave, and those who did were pursued across Europe. The island's most famous products were fine drinking goblets of astonishing thinness, and flat mirrors - which for more than a century no other city in the world knew how to make.",
  "F|Now to the modern age, and to a problem that had defeated glassmakers for centuries: how to make truly flat window glass cheaply. The answer arrived in the nineteen fifties, and it is called the float process. Molten glass is poured onto a bath of liquid tin, and because the glass floats on the metal, it spreads out into a sheet that is perfectly flat on both sides, with no grinding and no polishing. Nearly every window in every modern building is made this way.",
  "F|And today, glass may be at its most remarkable when it is almost invisible. Optical fibres - threads of glass finer than a human hair - now carry most of the world's information beneath the oceans, as tiny flashes of light. And the material points towards a greener future too, because glass has one property that almost nothing else we manufacture can match: it can be recycled endlessly, melted down and reformed again and again, with no loss of quality. The bottle you recycle this week can become a new bottle next month, and another one after that, for ever.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock3-s1.wav" $s1
Render "mock3-s2.wav" $s2
Render "mock3-s3.wav" $s3
Render "mock3-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
