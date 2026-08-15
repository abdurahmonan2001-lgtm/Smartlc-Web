# Generates the four Mock Test 4 listening recordings with Windows TTS.
# Same conventions as Mocks 1-3: "F|"/"M|" pick the voice, "P|<seconds>" is
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
  "M|Part one. You will hear a woman phoning a bus company's lost property office about a bag she left on a bus. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Greenline Buses, lost property office. How can I help?",
  "F|Oh, hello. I left a bag on one of your buses yesterday evening, and I'm hoping someone has handed it in.",
  "M|Let me fill in a report and we'll check for you. Could I take your name first?",
  "F|Yes, it's Malika Nurmatova.",
  "M|Could you spell the surname for me?",
  "F|Of course. N, U, R, M, A, T, O, V, A. Nurmatova.",
  "M|Thank you. And a phone number we can reach you on during the day?",
  "F|It's oh seven four five, six three two, one one eight.",
  "M|Oh seven four five, six three two, one one eight. Lovely. Now, which bus were you on? Do you remember the route number?",
  "F|I always mix up the thirty-five and the fifty-three, but it was definitely the fifty-three - the one that goes towards the city centre. The thirty-five goes the other way entirely.",
  "M|The fifty-three, towards the centre. And that was yesterday, you said - so Tuesday?",
  "F|No, hold on - yesterday was Wednesday, wasn't it? Yes, Wednesday. On Tuesday I cycled to work.",
  "M|Wednesday it is. And roughly what time?",
  "F|About half past five in the evening. I'd just finished work.",
  "M|Good. Now, the bag itself. Can you describe it for me?",
  "F|It's a canvas bag, the kind with a shoulder strap. Not black - grey. A light grey.",
  "M|A grey canvas bag with a shoulder strap. Noted.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|And what was inside the bag? Anything valuable?",
  "F|Unfortunately, yes - my laptop. And some library books, which are due back on Friday, of all things. At least my purse was in my coat pocket.",
  "M|A laptop and some library books. Is there anything that would help us identify the bag - any special features?",
  "F|Oh, yes, actually. There's a small keyring attached to the handle. It's shaped like a dolphin - my daughter chose it.",
  "M|A keyring on the handle - that's very helpful. Now, if the bag has been handed in, you'll need to collect it in person. We used to keep everything at the central station, but that office closed last year. All items now go to our depot on Milton Street.",
  "F|Milton Street - I know it, near the bridge.",
  "M|That's the one. The lost property office there is open from half past eight in the morning until four in the afternoon, Monday to Saturday.",
  "F|Do I need to bring anything with me?",
  "M|Some form of identification - a passport or a driving licence is ideal. We can't release items without it.",
  "F|Of course. And is there a charge?",
  "M|There is a small handling fee, I'm afraid. It was five thousand som for years, but it went up in January - it's ten thousand now, and the office takes cash only.",
  "F|Ten thousand, in cash. That's fine. Thank you so much for your help.",
  "M|You're welcome. We'll call you as soon as we've checked the shelves. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the volunteer coordinator of the Ashford Park Summer Music Festival briefing this year's volunteers. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening everyone, and thank you for giving up an evening for this briefing. I'll keep it short, because I know some of you have buses to catch.",
  "F|First - what's new this year. You may have seen rumours online about a second stage. I'm sorry to disappoint you: that idea has been postponed until next year at the earliest. And no, we are not moving anywhere - Ashford Park has been our home for nine years and it stays that way. What has changed is the length. For the first time, the festival will run for three days instead of two - which is exactly why we've recruited more volunteers than ever before.",
  "F|Now, your T-shirts. In previous years we posted them out to you, and every single year a few went missing in the mail. So there's a new system: you collect your T-shirt in person from the volunteers' tent, which is just behind the main gate. Please don't queue at the gate itself - that's where visitors collect their wristbands, and the stewards there won't have your shirts.",
  "F|Food. Those of you who volunteered before will remember getting half price at the food stalls. That arrangement has gone - and it's been replaced with something better. Every shift now comes with a voucher for a free hot meal at any stall on the site. You're welcome to bring your own food if you prefer, but honestly, you won't need to.",
  "F|One serious point before the jobs. If you feel unwell during a shift - too much sun, or simply worn out - please don't take yourself off to the first-aid tent; we keep that clear for visitors and real emergencies. And don't ring the festival office either, because during the day nobody is sitting next to that phone. The right thing to do is simple: tell your team leader. Every leader carries a radio, and they will sort you out within minutes.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right - the jobs themselves. Let me take the six teams one by one, because each has its own character.",
  "F|The car park team. I'll be honest with you: your day begins before everyone else's. The gates open to vehicles at eight, which means the team meets at seven sharp, while the grass is still wet. Bring a warm jumper and you'll be fine.",
  "F|The information desk. We save this one for volunteers who speak more than one language. We get visitors from right across the region and beyond, and last year the desk handled questions in five different languages in a single afternoon.",
  "F|The main stage crew. You'll be helping the professionals move equipment between acts - amplifiers, drum kits, cases of cable. It's real lifting, and some of it is genuinely heavy, so please only choose this team if you're comfortable with that.",
  "F|The children's area. Volunteers there don't run it themselves - it's led by a qualified childcare professional, who is in charge at all times. Your job is to assist her: hand out the paint, read the occasional story, and count the scissors back in at the end.",
  "F|The recycling team. Last year, frankly, we didn't give them enough people, and by Sunday evening they were exhausted. So this year we've doubled the number of helpers on that team. It's cheerful work, and you're outdoors all day.",
  "F|And finally, the campsite team. Campers mostly arrive after five o'clock, once they've finished work, so nearly all the campsite jobs happen in the evening - guiding people to their pitches, sorting out lost bookings, and keeping the noise friendly. If you're not a morning person, that is the team for you.",
  "F|Right - the team lists are on the board by the door. Come and find your name, and thank you again.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two architecture students, Timur and Zarina, discussing their scale-model assignment. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Zarina, we need to settle this today - which building are we actually modelling?",
  "F|Well, my first idea was the railway station, Timur. I love that roofline. But it's a working station - we'd never get permission to measure inside.",
  "M|True. And the tutor kept mentioning the city museum.",
  "F|She did, but half the class had the same conversation with her - three groups have chosen the museum already. Ours would just disappear among them.",
  "M|Which leaves my favourite: the covered market. All that nineteenth-century iron and glass.",
  "F|Honestly, it's the most interesting of the three anyway. The market it is.",
  "M|Good. Now, scale. I ran some quick numbers. At one to fifty, the model comes out at over a metre long - it won't fit on the display tables.",
  "F|And one to two hundred has the opposite problem - the ironwork detail simply vanishes at that size. All the arches would turn into smudges.",
  "M|So, one to one hundred. Big enough for the detail, small enough for the table.",
  "F|Agreed. Now - bad news about my photographs from Saturday.",
  "M|Oh no. Was the light wrong? You went quite late.",
  "F|The light was perfect, actually, and I could get as close as I wanted. The problem is the building itself - the entire front is covered in scaffolding. They're repairing the stonework. Every photo looks like a birdcage.",
  "M|Ah. When does it come down?",
  "F|The notice says the end of the month. I'll go back then.",
  "M|All right. Materials. I priced a few options this morning. Cardboard is basically free, but it warps the moment you paint it.",
  "F|And balsa wood cuts beautifully, but did you see the price? For the amount we'd need, it's half my monthly budget - and it takes forever to cut cleanly.",
  "M|Which is why I asked at the workshop. They give foam board to second-year students free of charge - whole sheets of it. Firm, flat, and it takes paint well.",
  "F|Foam board it is, then. Now, the sketch plans - we should be honest about those at the tutorial.",
  "M|I know what you're going to say. We paced out the distances instead of measuring properly.",
  "F|Exactly. The drawings look complete, and nothing important is missing - but half the measurements are simply wrong. The south wall came out two metres longer than the north. We need to borrow the laser measure and do the whole survey again.",
  "M|Agreed. Speaking of the tutorial - is there anything we should actually ask her for? Not an extension; we're more or less on schedule.",
  "F|No, the deadline's fine. And the display spaces were allocated last week, so there's nothing to gain there. But think about the ironwork arches - we'll never cut those cleanly by hand. We should ask for access to the laser cutter. Second years are allowed to use it with supervision.",
  "M|Good idea. That's our one request, then.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Let's decide what actually goes into the model. The glass roof, obviously - it's the whole point of the building.",
  "M|Obviously. And I'd add the fountain in the square outside. It costs us almost nothing to make, and it gives the whole model a sense of scale.",
  "F|Yes, I like that. What about the clock tower?",
  "M|Technically it's a separate building - it isn't part of the market at all. Leave it out.",
  "F|Fine. The iron gates? They're beautiful.",
  "M|They are, but at one to one hundred they'd be impossibly fiddly to cut, even with the laser. Reluctantly - no.",
  "F|And I assume we're not building the market stalls inside, since nobody can see the interior anyway.",
  "M|Exactly. The roof and the fountain, then.",
  "F|Right, last thing - what has to be done before the next tutorial? The materials are sorted, aren't they?",
  "M|Done - I ordered the foam board yesterday; it arrives on Friday. The base, though - we should build that this week. It's simple work, and everything else sits on top of it.",
  "F|Agreed, the base gets built. Photographs will have to wait for the scaffolding, and there's no point revising the drawings until we've done the laser survey.",
  "M|True on both. What about the project diary? She checks it first, every single time.",
  "F|I'll update the diary tonight - we're three weeks behind on entries.",
  "M|Perfect. Base and diary before Tuesday, then. Coffee?",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about beavers and their effect on rivers and landscapes. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we looked at how human engineers reshape rivers. Today I want to introduce you to an engineer that was reshaping rivers several million years before we existed: the beaver.",
  "F|Let's begin with the animal itself. The beaver is Europe's largest rodent - a full-grown adult can weigh about thirty kilos, roughly the weight of a ten-year-old child. Two features make it unmistakable. First, the teeth. A beaver's front teeth never stop growing - they can't afford to, because the animal wears them down daily by felling trees. And they are hardened with iron, taken from the diet and built into the enamel; it is the iron that gives beaver teeth their striking orange colour. Second, the fur - which, as we'll see, was very nearly the animal's undoing. Beaver fur is astonishingly dense, with tens of thousands of hairs packed into every square centimetre, and the layers trap so much air that the coat is effectively waterproof. A beaver can spend a quarter of an hour under freezing water and come out dry at the skin.",
  "F|Now, the famous behaviour: the dam. Why does a slow, short-sighted animal go to such enormous trouble to block a stream? Watch one work and you see the method: it drags branches into the current, weighs them down with stones, and seals every gap with mud, packed firmly into place with its front paws. The water backs up, and a pond forms. That pond is the whole point, because in the middle of it the family builds its home - a great rounded mound of sticks called a lodge. The entrances to the lodge lie hidden below the surface of the pond, which means that predators - wolves, foxes, wandering dogs - simply cannot reach the family inside. The pond is a moat, and the deeper the water, the safer the household. It is also a larder: the beavers anchor a pile of fresh branches in the cold water beside the lodge, and that store is what feeds the family right through the winter, when ice seals the pond shut.",
  "F|So much for the beaver. What does all of this do to the river? More, probably, than any other animal on earth apart from ourselves. First, consider water flow. A beaver dam is deliberately leaky, and it acts as a brake on the whole stream. After heavy rain, water is held back and released slowly, so there is far less flooding downstream - villages below beaver country consistently record smaller floods. And the same brake works in reverse: in a drought summer, the stored water seeps out gradually and keeps the streams flowing when neighbouring valleys have run dry.",
  "F|Second, water quality. A beaver pond is a settling tank. Rain washes soil and fertiliser off the surrounding land and into the stream, and in the still water of the pond that sediment sinks quietly to the bottom instead of travelling on. Measure the water entering a beaver pond and the water leaving it, and the difference is striking: what flows out is consistently cleaner.",
  "F|Third - and this is why ecologists become so enthusiastic - wildlife. A new beaver pond fills with life at astonishing speed. Insects arrive first, then fish, and then birds - herons, ducks, kingfishers, all drawn to the new wetland. Even destruction is productive here: the trees the rising water drowns remain standing, and dead trees in water are precious real estate - woodpeckers drill their nesting holes into the soft trunks, and a dozen other species move in after them. For all of this, biologists call the beaver a keystone species. Like the keystone of an arch, remove it, and a whole structure of other lives comes down with it.",
  "F|Finally, beavers and people - a relationship that has been mostly tragic. For centuries the beaver was hunted relentlessly across Europe: for its fur, which made the finest hats money could buy; for its meat; and for a substance from its glands that was long prized as medicine. By about nineteen hundred, only a few scattered colonies survived on the whole continent. The recovery, though, is one of conservation's great success stories. Protected, and then deliberately reintroduced, the beaver has now returned to more than twenty-five European countries, including some that had not seen one for four hundred years. But an engineer that ignores planning permission will always make enemies. Beavers do not consult maps: their dams flood whatever happens to lie upstream, and where that is a road, or valuable farmland, the old conflict flares up again. The challenge of the next century is not to remove this engineer, but to decide where we can give it room to work.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock4-s1.wav" $s1
Render "mock4-s2.wav" $s2
Render "mock4-s3.wav" $s3
Render "mock4-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
