# Generates the four Upper-Inter Set 2 listening recordings with Windows TTS.
# Same conventions as the mocks: "F|"/"M|" pick the voice, "P|<seconds>" is a
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
  "M|Part one. You will hear a man telephoning a bakery to order a birthday cake for his daughter. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good morning, the Honeycomb Bakery.",
  "M|Good morning. My neighbour had one of your cakes at the weekend and it was extraordinary, so I'd like to order a birthday cake for my daughter, if I may.",
  "F|How kind of her to pass the name on. Certainly - let me open an order form. Could I take your name first?",
  "M|Yes, it's Farrukh Rahimov.",
  "F|Could you spell the surname for me? I'd rather write it down correctly.",
  "M|Of course. R, A, H, I, M, O, V. Rahimov.",
  "F|R, A, H, I, M, O, V. Thank you. And when would you like to collect it?",
  "M|Her party is on Monday the eighteenth of August, so I thought I'd come in that morning.",
  "F|Ah - I'm sorry, the eighteenth is a public holiday this year, and the shop is closed all day. Could you take it the day before? That's Sunday the nineteenth.",
  "M|The nineteenth... let me think. We're decorating the house on the Sunday anyway, so the morning of the nineteenth would actually be ideal.",
  "F|Sunday the nineteenth of August, noted. And how old is your daughter? I only ask because of the candles.",
  "M|She'll be twelve. Everybody guesses fourteen, because she's so tall, but she is twelve.",
  "F|Twelve, lovely. And roughly how many people will be eating the cake?",
  "M|About twenty guests, I think, though my sister may bring the cousins.",
  "F|Then I wouldn't take the small size, because the small only feeds fifteen. The medium feeds up to twenty-five people, so there would be a slice or two left over. The large one is really for weddings.",
  "M|The medium sounds right.",
  "F|And what flavour? Chocolate is far and away our most popular cake.",
  "M|Not chocolate, sadly - she's the one person in our family who doesn't like it. Could you do a lemon sponge?",
  "F|We can, and it's my own favourite. With a raspberry filling, perhaps? Lemon and raspberry is a beautiful combination.",
  "M|A raspberry filling, yes. That sounds perfect.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|Now, the icing. What colours does she like?",
  "M|Pink, I suppose - oh, no, wait. That was two years ago; she'd be horrified now. Purple, please - purple and white.",
  "F|Purple and white, very smart. And shall we put something on the top? A sugar flower is popular, or we can pipe a large number twelve.",
  "M|Neither, I think. She rides every Sunday and talks about nothing else. Could you make a horse out of sugar?",
  "F|A horse. Our decorator will enjoy herself. And a message across the top?",
  "M|Nothing complicated. Just, Happy Birthday Madina.",
  "F|Madina - what a lovely name. And do remember that the number-shaped candles are provided free with every children's cake, so there's no need to buy any.",
  "M|That's useful, thank you. Now, what will all this come to?",
  "F|Let me add it up. A large cake with a sugar model would be four hundred and fifty thousand som, but your medium comes to three hundred and eighty thousand som, and that includes the box.",
  "M|Three hundred and eighty. Fine. Do I pay the whole amount now?",
  "F|No - we ask for a deposit of one hundred thousand som today, over the telephone, and you settle the rest when you pick the cake up.",
  "M|Understood. And is there any chance you could deliver it?",
  "F|Not in August, I'm afraid. Our driver is away for the whole month, so every cake has to be collected during August.",
  "M|I'll collect it, then. What time do you open on a Sunday?",
  "F|The shop opens at nine, but the decorators are often still finishing the celebration cakes at that hour, so I'd say any time after nine thirty. Ask for me at the counter and I'll bring it out myself.",
  "M|Any time after nine thirty. Thank you - she is going to be delighted.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the manager of a recently reopened heritage tram line welcoming a group of visitors. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good morning, everyone, and welcome to the Riverbank Heritage Tramway. Before we get on board, let me tell you a little about how this line came back to life, and one or two practical things you'll need to know.",
  "M|Trams ran along this valley from eighteen ninety-eight until nineteen fifty-nine. People often assume the line closed because nobody was using it, but that isn't true at all - the trams were full right up to the final week, and the ticket receipts prove it. Others blame the flood of nineteen fifty-two, which is closer, but the flood damaged the track for one winter only, and the service was running again by the spring. The real explanation is duller: the council worked out that buses were far cheaper for it to run, and that was the end of the argument. The rails were tarred over within a year.",
  "M|Bringing it back took a very long time and a great deal of money. Our local firms were generous - the timber yard gave us the timber for the shelters and a paint company supplied every litre of paint, which we're extremely grateful for - and of course ticket money now keeps the trams running day to day. But the restoration itself, all four years of it, was paid for by a grant from the national heritage fund, and without that award none of you would be standing here.",
  "M|Now, a question I'm asked constantly is who actually drives these things. There are a couple of retired professional drivers among us, and they're worth their weight in gold, but almost all our crews are ordinary volunteers - a student, two schoolteachers, a dentist. They train here at the depot for six months before they're allowed to take a tram out with passengers on board.",
  "M|And tickets. Our website is being rebuilt after a crash last month, so you can't buy online at present, and the ticket office at the depot has a queue halfway down the yard on a Sunday. So the simplest thing is to buy your ticket on the tram itself. The conductor will come round once we're moving, and he takes cards as well as cash.",
  "M|Before we set off, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "M|Let me take you along the line, place by place, in the order we'll meet them.",
  "M|We start here at the depot, which is a working workshop - lathes turning, welding, a tram in pieces over the inspection pit. For that reason I can't let you wander round it on your own, and the only way to see inside is on one of our guided tours, which run at eleven and at two.",
  "M|Our first stop is Market Square. Do get off there on the way back if you can, because the shelter now holds a display of old photographs of the line - the opening ceremony in eighteen ninety-eight, the water lapping at the rails in the flood, and the very last tram pulling away in nineteen fifty-nine with half the town waving at it.",
  "M|Next comes Park Gates. We did hope to rebuild that shelter from its original ironwork, but when we dug the pieces out of the store the corrosion had eaten straight through them, so it's entirely new. I should add that the garden centre next door paid for every bit of it, and asked for nothing in return except that we keep the roses.",
  "M|After Park Gates the track swings down to the riverside section. It was closed all last winter while we replaced the sleepers, and I know some of you were turned away - but it reopened in April and it is running perfectly today. The drivers slow right down along there, deliberately, because the views across to the hills are the best on the whole line. Have your cameras ready.",
  "M|Then we go through the tunnel. It's short, it's dark, and it's a favourite with children, who shriek all the way through. It was cut in eighteen ninety-eight, a year before the first tram ran, which makes it older than the depot, older than every carriage we own - it's the oldest structure anywhere on the line.",
  "M|And finally the terminus, where we turn round. The old waiting room there has been converted into a tea room, run entirely by our volunteers - the same people who drive the trams bake the cakes, which tells you something about them. The soup is excellent and the walnut cake disappears by two o'clock.",
  "M|Right. Mind the step, hold the rail, and let's get you on board.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two engineering students, Jasur and Kamola, discussing the wind-tunnel test of their model footbridge. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Kamola, before we write the introduction - remind me how we ended up testing a footbridge. Was it because Dr Aliyeva said it would be a straightforward structure?",
  "F|Quite the opposite, Jasur. She warned us that bridge aerodynamics was one of the harder topics we could pick. No, it came from the storm in October. The new footbridge by the stadium was shut for two whole days, and nobody could tell me why a brand-new bridge should have to close in a bit of wind. That's where the whole project started.",
  "M|Good - that's a better opening than anything I'd written. Now, the model itself. We should describe how it was made, because we changed our minds twice.",
  "F|We did. Laser-cut wood first, which we dropped because thin wood warps as soon as the humidity changes. Then aluminium, which would have been ideal, except the workshop had a three-week queue and we had four weeks in total.",
  "M|So we printed it. It's three 3-D printed sections, glued end to end, with the deck and the parapet printed together.",
  "F|Right. And then the first session in the tunnel, which we have to write up honestly.",
  "M|Must we? It was a disaster.",
  "F|It was informative. Let's be accurate about it, though. The sensors were fine - we checked all six against the reference block afterwards and they were reading correctly. The fan was fine too; it reached full speed in about forty seconds, exactly as the technician said it would. The problem was that one of the clips holding the base vibrated loose at around twelve metres per second, and the model worked itself free of the mounting. We lost the run, not the equipment.",
  "M|True. And the smoke test in the second half of the session was genuinely useful.",
  "F|It was. The photographs are dramatic, I agree, and one of them will look wonderful on the front page - but that isn't the value of it. The smoke let us see exactly where the airflow separated from the deck, about a third of the way back, and turned into that churning wake behind it. No sensor would have told us that.",
  "M|Agreed. Now, one thing that worries me for the discussion section. Our numbers will not be the numbers the real bridge produces.",
  "F|They won't, and we should say so ourselves rather than wait for the examiner. The plastic isn't the issue - we scaled the stiffness properly. The tunnel is the issue.",
  "M|Exactly - the airflow in the tunnel is smoother than natural wind, one steady stream, whereas the wind at the stadium site arrives in gusts off the car park. So our figures will be tidier than reality.",
  "F|Put that in as a limitation. And what did Dr Aliyeva actually ask for in the results chapter? I assumed she'd want the whole thing repeated at higher speeds.",
  "M|That's what I expected too, but no. She was quite specific: she wants a results chapter in which we compare our measurements with the published figures for decks of a similar shape. Nothing else was compulsory.",
  "F|Comparison it is. That's a day in the library, then.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, what are we actually changing on the model before Friday? Let's keep the list short.",
  "M|The mounting, obviously.",
  "F|Not us, though - the technician has already made a new clamp for it, machined from a solid block. It was waiting in the tray this morning, so that one's out of our hands. What I do want to add is the handrails. Dr Aliyeva was firm about it: handrails change the flow over a deck far more than people expect, and our deck is bare.",
  "M|Fair enough, handrails go on. And I want to reprint the deck as a single piece. Those two glued joints flex under load - you can see the ripple in the smoke footage - and the real bridge has nothing of the kind.",
  "F|Yes, that's worth the printer time. What about smoothing the surface? The print lines are quite rough.",
  "M|Honestly, at our scale the surface finish makes almost no measurable difference. I checked the tables. And before you ask, I'm not making it lighter either - we're not measuring weight, we're measuring pressure.",
  "F|Agreed. Handrails and a one-piece deck, then, and nothing else. Now, before we write the report itself?",
  "M|Well, I've booked us an extra session in the tunnel - Friday afternoon, two hours, which is enough for one clean run with the new deck.",
  "F|Perfect. I did email that consulting engineer, by the way, the one who worked on the stadium bridge. She's abroad until the middle of next month, so we can't speak to her in time.",
  "M|Shame. Should we recalculate the wind speeds as well?",
  "F|No need - the conversion was checked twice and the technician agreed with it. But there is one thing we both have to do: read the case study Dr Aliyeva keeps recommending, about the famous bridge that tore itself apart in the wind in nineteen forty. It's twenty pages, and apparently everything we're measuring is in there.",
  "M|I'll read it tonight. And no, we're not sending our data to the other group before we've written our own chapter.",
  "F|Certainly not. Friday, then.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of the calendar. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. Today I want to look at an invention so familiar that we forget it is an invention at all: the calendar. Every calendar is an attempt to solve one awkward problem - the sky does not divide neatly. The day, the month and the year are set by three separate motions that refuse to fit inside one another, and the whole history of the calendar is the history of people trying to force them to.",
  "M|The earliest calendars followed the moon, and you can see why. The phases are impossible to miss: anyone can look up and say that the moon is new, or half, or full. Some archaeologists argue that the notched bones found at prehistoric sites across Europe and Africa are early tallies of those cycles, scratched night by night - the evidence is debated, but the idea is plausible enough.",
  "M|The trouble with the moon is arithmetic. Twelve lunar months come to about three hundred and fifty-four days, so a lunar year is roughly eleven days shorter than the solar year. Do nothing about that and your festivals drift backwards through the seasons - a spring festival slides into winter within a decade, and a harvest festival arrives before the harvest.",
  "M|Egypt shows us a different approach, because Egypt had a natural clock. The entire economy hung on one event each year, the flood of the Nile, which fertilised the fields. Egyptian astronomers noticed that the flood arrived at about the time when the bright star Sirius reappeared in the dawn sky after weeks of invisibility, and they used that reappearance to mark the new year. Their calendar abandoned the moon altogether: twelve months of exactly thirty days, plus five extra festival days at the end, giving a year of three hundred and sixty-five days. Simple, regular, and far ahead of its time.",
  "M|Rome, by contrast, made an enormous mess. The early Roman year began in March, with the return of the fighting season, and it had only ten months - which is why our ninth, tenth, eleventh and twelfth months still carry names meaning seventh, eighth, ninth and tenth. Two more months were added later, but the real problem was political. Priests and officials had the power to insert extra days when they thought it necessary, and they used it shamelessly: they would stretch a year to keep their allies in power for a few more months, and cut one short when their opponents held office. After generations of that, the Roman calendar had wandered about three months ahead of the seasons. Farmers ignored it entirely and went by the stars.",
  "M|Julius Caesar ended the chaos in a single stroke. Advised by an astronomer from Alexandria, he abolished the lunar year and fixed the length at three hundred and sixty-five days, with one extra day added every four years to absorb the leftover quarter. To bring the calendar back into line with the sun, the year we call forty-six before Christ was given four hundred and forty-five days - the longest year in recorded history, and known ever since as the year of confusion.",
  "M|Caesar's calendar was very good, but not perfect. It assumed the year was eleven minutes longer than it truly is, and eleven minutes a year adds up to a full day every hundred and twenty-eight years. Century by century the calendar crept forwards, and by the fifteen eighties it had drifted ten days - enough that it was unsettling the date of Easter, which is calculated from the spring equinox. In fifteen eighty-two Pope Gregory acted: ten days were simply deleted from October, so that the fourth was followed by the fifteenth, and a new leap-year rule was introduced to stop the drift returning.",
  "M|Adoption, though, was slow and deeply political. Catholic countries changed at once; Protestant and Orthodox ones refused for a long time. Britain and its colonies waited until seventeen fifty-two, by which point they had to delete eleven days rather than ten. Russia held out until nineteen seventeen, which is why its October revolution is commemorated in November.",
  "M|And today? The Gregorian calendar has effectively won. Whatever else a country observes, it is the calendar used everywhere for trade - for shipping dates, contracts, timetables, interest payments. Yet the older systems have not died. Hundreds of millions of people still consult a lunar or a luni-solar calendar to set the dates of their festivals: the fasts, the new years, the harvest feasts. So most of us now live under two calendars at once - one for business, one for belonging - which is, when you think about it, a very old compromise indeed.",
  "M|That is the end of part four. You now have some time to check your answers.",
  "P|5"
)

Render "upset2-s1.wav" $s1
Render "upset2-s2.wav" $s2
Render "upset2-s3.wav" $s3
Render "upset2-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
