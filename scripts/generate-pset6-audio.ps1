# Generates the four Practice Set 6 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a health centre to register as a new patient. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Riverside Health Centre, good morning. Reception speaking.",
  "F|Oh, good morning. I've just moved into the area and I'd like to register with a doctor here. Is that something I can do over the telephone?",
  "M|It is - I can take all your details now, and then you only have to come in once, for your first appointment. Are you registered with another practice at the moment?",
  "F|No. I was with a surgery in my old town, but I've left there completely - I gave them my new address before I moved.",
  "M|That makes it much simpler. Right, let me open a record for you. Can I take your full name?",
  "F|Yes, it's Mohira Sattorova.",
  "M|And could you spell the surname for me?",
  "F|Of course. It's S, A, T, T, O, R, O, V, A - double T in the middle. Sattorova.",
  "M|Double T, thank you. People usually get that wrong. And your address here in town?",
  "F|It's on Wells Road. Number twenty-five... no, I'm sorry, twenty-seven. Twenty-five is the flat I looked at first and didn't take.",
  "M|Twenty-seven Wells Road. And can I ask what you do for a living? We only ask because it helps us offer you appointment times that actually suit you.",
  "F|Well, I used to drive a delivery van, but I'm a chef now, at the hotel on the square. That's exactly why the times matter - I start at four in the afternoon and I finish very late, so mornings are far better for me.",
  "M|A chef. I'll put a note on the record that you need morning appointments wherever possible. Now, everybody who registers has to come in once, in person, and bring a document that proves who you are.",
  "F|I've got my driving licence somewhere in a box.",
  "M|Ah - I'm afraid we can't accept that any more. The rules changed last year, because so many people had the old address on theirs. It needs to be your passport.",
  "F|My passport. That's easy enough, I know where that is.",
  "M|Lovely. And finally for this part, a health question for the record. Do you have any long-term conditions we should know about?",
  "F|Just one. I have asthma - I've had it since I was a child, and I use an inhaler most days.",
  "M|Asthma. Thank you, I'll add that now, and the nurse will go through it with you properly.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "M|Right. The last thing is to book your new-patient health check. Every new patient sees one of our nurses before they see a doctor. I can put you in on Wednesday morning.",
  "F|Wednesday is difficult, I'm afraid. Wednesday is my busiest day at the hotel - I do the lunch service as well.",
  "M|Then let me try the other clinic. There's a nurse clinic all Thursday morning, and there are still gaps in it.",
  "F|Thursday morning would be perfect.",
  "M|Good. The earliest one is half past eight, or I could do a quarter to nine.",
  "F|Eight forty-five, please. Half past eight is a little tight for the bus.",
  "M|Eight forty-five it is. Now, one important thing: please don't eat anything at all that morning. The nurse does a blood test at the first appointment, and it has to be done before you've had breakfast.",
  "F|No breakfast. I'll survive.",
  "M|You will. And do bring a list of the medicines you are taking at the moment, with the doses. You don't need the old prescriptions themselves, just the list.",
  "F|A list of my medicines, with the doses. Right, I'll write that out.",
  "M|Perfect. Oh, and how would you like your reminder? We used to post letters out, but half of them arrived after the appointment, so now we send a text the day before instead. Is your mobile the best number for that?",
  "F|Yes, a text is ideal. I always have my phone on me at work.",
  "M|Then that's everything. Thursday, eight forty-five, nothing to eat beforehand, and please bring your passport and the list.",
  "F|Thank you so much. Goodbye.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a transport officer from Marston Town Council talking to residents about a new cycle-hire scheme. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out. I'm here to talk about the Greenway cycle-hire scheme, which opens across Marston next month.",
  "F|Let me start with why we are doing it, because I get this wrong-footed at every meeting. Almost everybody assumes the point is to take cars out of the town centre. It isn't - traffic in the centre has been falling for six years without any help from us. And I know the shops hope it will bring more tourists in; it may well do, and we'd be delighted, but no council spends this kind of money on a hope. The real reason is much narrower. Our travel survey found that the single biggest block of car journeys in Marston is people driving one or two miles to the railway station, because the first bus of the day arrives after the London train has gone. The station car park is full by twenty past seven every weekday. So the scheme exists, first and foremost, to get people to the railway station without a car.",
  "F|Now, who paid for it. The town council's contribution was the paving and the electrical work for the docking points, which is not nothing, but it isn't the bikes. We did apply for a regional transport grant - twice, in fact - and we were turned down both times, which was a bleak fortnight in our office. What rescued the scheme was that fourteen local businesses each agreed to sponsor a stand and the bikes that sit in it, in return for their name on the frame. So the bikes themselves were bought by local companies.",
  "F|We ran a six-month trial in the north of the town, and I want to tell you what it taught us. We had braced ourselves for vandalism - every scheme in the country warns you about it - and we lost precisely one bike, which turned up in a hedge. Pleasing, but not a surprise, because the newer schemes all report the same thing. Night-time use was low, again as we predicted. What genuinely astonished us was the distance. We designed this scheme for short hops of a mile or so, and the average journey turned out to be more than four miles. People are riding to the next village and back.",
  "F|And the complaints. A handful of people found the saddles uncomfortable, and we've changed the design. The app was criticised in the first fortnight and has been rewritten since. But the complaint that filled my inbox, over and over, in that first month, was people arriving at a stand and finding every single space already taken, so they couldn't leave the bike and get to work. We now move bikes between stands twice a day in a van.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Let me take you round the six stands, one by one, because they are not at all alike.",
  "F|The railway station stand is the reason the scheme exists, and it behaves exactly as we hoped: nine out of ten journeys that begin there begin between seven and nine in the morning. It is, overwhelmingly, a stand for people on their way to work.",
  "F|The market square stand is the giant. We keep forty bikes there, and no other stand in the town holds even half that number, because the square is where people begin almost every journey that isn't a commute.",
  "F|The hospital stand is a special case. The whole stand - the racks, the bikes, the lighting - was paid for by the engineering firm out on the ring road, as a gift to the hospital staff. It cost them a great deal and they have asked for nothing except a small plaque.",
  "F|The university campus stand sits at the top of a very steep hill, and in the trial the ordinary bikes simply came down and never went back up. So that is the one stand in Marston where every single bike is electric.",
  "F|The leisure centre stand is, I'm sorry to say, shut at the moment, and will be until the autumn, because the new swimming pool is being built directly on top of it. Please don't cycle down there expecting to leave a bike.",
  "F|And the Hill Park stand is in the wrong place. It sits fifty metres inside the gates where nobody walking past can see it, and it takes about a third of the traffic we expected. So in March it moves out to the corner by the bus stop, where people will actually find it.",
  "F|Right. There are leaflets at the back, and I'll take questions now.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two biology students, Nodira and Timur, discussing a bird survey they are carrying out. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Timur, we have to write the introduction today. The first thing it asks is how the project came about.",
  "M|Everyone assumes the nature reserve asked us to do it. They didn't - the warden only rang us in October, weeks after we'd chosen the topic.",
  "F|And it certainly wasn't because I'd counted birds at school. I did, but that was gulls on a beach, I was fourteen, and I hated every minute of it. No - it was Doctor Rashidova. She said in the very first tutorial that nobody had counted the marsh for six years, and neither of us could stop thinking about it.",
  "M|So we credit our tutor. Fair enough. Now, the practice count - do we admit how badly it went?",
  "F|We have to, it's in the method. Though let's be accurate about why. The wind wasn't the problem; it was a still, bright morning. And we weren't late - we were at the hide before it was properly light.",
  "M|It was the calls. Half the birds we never saw at all, we only heard them, and neither of us could put a name to the sounds. We wrote down warbler, question mark, eleven times.",
  "F|Exactly. That's what we say: we couldn't identify birds from their calls. It's why we've both been doing an hour of recordings every night since.",
  "M|Right. And then the tutor's comments on the plan. She was quite hard on us.",
  "F|She was, though not about the things I expected. I thought she'd say four counting points was too few, and she didn't - she said four was plenty for a marsh that size. She actually liked the weather column.",
  "M|What she objected to was the timing. We had it down for August, and she pointed out that the summer visitors have already gone by then, so we'd be counting an empty marsh and calling it a result. May, she said, and only May.",
  "F|May it is. So, recording. We printed those lovely paper sheets.",
  "M|Which lasted one morning. Paper in a marsh is hopeless - by nine o'clock the ink had run and the sheets were soft.",
  "F|And the app is out, isn't it? It looks perfect until you're standing there with no signal at all, and the cold empties the battery in about forty minutes.",
  "M|So we speak our counts into a small voice recorder, and type them up in the afternoon. It's the only thing that works in the rain.",
  "F|Agreed. Now, the section on error - what's the biggest threat to our numbers?",
  "M|The reeds hide things, obviously. But that only means we miss birds; it makes the count too low, and everyone's count is too low, so it doesn't really distort the comparison.",
  "F|And it isn't the two of us disagreeing either - we've trained together all autumn, and in the last three practice counts our totals were within two of each other.",
  "M|No. What frightens me is a flock going round the pool, landing at the far end, and the two of us writing it down as a second flock. Counting the same birds twice would wreck everything, and it's very easy to do.",
  "F|Then that's what the section says. Finally - what happens to the results?",
  "M|I'd love to do a talk at the primary school. But that's for the summer, if there's time, and it isn't part of the project.",
  "F|And the warden asked for a poster for the visitor centre. I had to say no, honestly - we won't have time before the deadline.",
  "M|So the results go to the national bird database, which is what Doctor Rashidova wants anyway. Our numbers join thirty years of records for the same marsh, and that's the whole point of doing it properly.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Now, we can't report on everything. Which birds do we actually write up?",
  "M|Not the geese, whatever the warden says. Everybody counts the geese, and the county figures are published every winter anyway - we'd be adding nothing.",
  "F|Agreed. And the herons are a lovely idea, but there are two pairs on the whole marsh. You can't say anything meaningful about two pairs.",
  "M|What about the swifts? I like the swifts.",
  "F|They're over the village, not the marsh, and they've left by the end of the survey. It doesn't work.",
  "M|Then it's the kingfishers, which is what the reserve actually wants - they've had no numbers at all since the flood, and the warden asked us directly.",
  "F|Kingfishers, yes. And the warblers, surely? The reed beds hold at least four species, and now that we're recording everything we can separate them by call afterwards. That's the one place where our method adds something new.",
  "M|Kingfishers and warblers, then. Right - jobs before the May count.",
  "F|The permit. To count anywhere beyond the hide we have to apply to the reserve in writing, and they take ten working days over it.",
  "M|I'll send that this week. And we need the tide times - I keep forgetting this is a tidal marsh.",
  "F|That's the other one, yes. On a high tide the pools flood and the birds simply move off to the fields, so we have to check the tide table and pick low-tide mornings.",
  "M|Fine. Not the telescope, though - the department has already lent us one.",
  "F|And no more paper sheets, obviously. What about asking Sanjar to come as a third counter?",
  "M|Doctor Rashidova won't have it. She says an untrained observer would make the numbers worse, not better.",
  "F|Then it's the permit and the tide table. I'll do the tides tonight.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of fireworks. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we followed the history of glass. Today I want to look at something that has been used to celebrate almost everything, for almost two thousand years: the firework.",
  "F|Like a great many useful things, gunpowder was found by people looking for something else entirely. Chinese alchemists spent centuries mixing minerals in search of a medicine that would give long life, and what they eventually produced was a powder that exploded. But the firework is actually older than the powder. Long before anyone had mixed anything, people in China had noticed that a piece of green bamboo thrown on a fire will burst with a very loud bang, because the air trapped inside the sections expands until the wood splits. That bang was the first firework, and it had a purpose: the noise was believed to drive away evil spirits, which is why bamboo was thrown on the fire at the New Year and at weddings. When the powder arrived, it simply made the bang bigger and more reliable. By about the year one thousand the recipe had settled into the mixture we still use: saltpetre, charcoal and sulphur, ground fine and packed into a paper tube. And, inevitably, within a century the same tubes were being tied to arrows and fired at people.",
  "F|Gunpowder travelled west along the trade routes in the thirteenth century, and Europe learned about it from travellers' reports before it ever saw a firework. The first European account was written by an English monk, Roger Bacon, who described the recipe carefully and then, being sensible, wrote part of it in code. For the next three hundred years the powder belonged to two very different trades: soldiers, and the men who staged celebrations. Early European displays were put on to mark military victories and royal weddings, which is a habit we have never really lost.",
  "F|The great technical advance came from Italy. Until the fifteen hundreds a firework was something that burned on the ground; Italian makers built the first shell that rose into the sky, a ball of powder fired out of a short metal mortar, with a slower-burning fuse that made it burst at the top of its climb. Everything in a modern display descends from that idea. In England, meanwhile, the whole business was run by a royal official called the Fire Master, who was, on the evidence, extremely well paid and moderately often blown up.",
  "F|Now, colour - and here is the thing my students never believe. For most of its history the firework had almost no colour at all. Before the eighteen hundreds a display was orange, yellow and white, and that was the whole palette. Real colour arrived in the eighteen thirties, when Italian makers began adding metal salts to the powder, each of which burns with its own colour: copper for blue, strontium for red, barium for green. The chemistry was borrowed straight from the laboratory, and it turned a display of sparks into a display of colours. Shape came next, and shape came from Japan. Japanese makers spent the nineteenth century perfecting the round shell, which bursts as a near-perfect sphere from every angle - the design that was perfected in Japan is still the standard shell in every professional display in the world.",
  "F|If you cut one of those shells open, you would find it packed with small pellets, each about the size of a marble, and each one a firework in miniature. Those pellets are called stars, and the pattern you see in the sky is simply the pattern in which the stars were packed. A ring of stars gives you a ring; stars in two colours give you a shell that changes colour as it opens. The maker is, in effect, painting inside a ball in the dark.",
  "F|Finally, where the craft is going. The largest shells made today are more than a metre across and weigh more than the person carrying them, which is why they are moved with a trolley. Since the nineteen nineties nothing is lit by hand: a computer fires the display, and each shell is lit by an electric fuse, so a thousand shells can be timed to music to a hundredth of a second. And there is real pressure for change, because of the smoke, the noise, and the distress caused to animals for miles around. That has led to two interesting experiments: drone displays, which are silent and reusable, and shells that are lifted out of the tube by compressed air instead of by gunpowder, which removes the smoke of the launch entirely.",
  "F|So the firework has come a long way from a stick of bamboo on a fire - though the purpose, I would argue, has not changed at all. Next week, the history of the mirror.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset6-s1.wav" $s1
Render "pset6-s2.wav" $s2
Render "pset6-s3.wav" $s3
Render "pset6-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
