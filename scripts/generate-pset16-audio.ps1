# Generates the four Practice Set 16 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a cleaning company to arrange a clean for her flat. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Sunrise Home Services, good morning. How can I help?",
  "F|Oh, good morning. I'd like to book a clean for my flat, if that's possible this month.",
  "M|It should be. Let me open the diary. Can I take your name first?",
  "F|It's Malika Yusupova.",
  "M|Could you spell the surname for me?",
  "F|Of course. It's Y, U, S, U, P, O, V, A. Yusupova.",
  "M|Thank you. And the address?",
  "F|Flat six, fourteen Cedar Road - no, I do apologise, that's my mother's. Mine is flat six, fourteen Willow Road, the block behind the post office.",
  "M|Fourteen Willow Road, flat six. Now, what sort of clean are you after? Our usual booking is the standard weekly visit - two hours, floors and surfaces.",
  "F|That's what I thought I wanted, but I'm leaving the flat at the end of the month and the landlord inspects everything. I need the cupboards emptied, the skirting boards, all of it.",
  "M|Then what you want is a deep clean. It takes much longer, but it's what people book when they move out, and it's the only one the landlords accept.",
  "F|A deep clean, then.",
  "M|And which day would suit you?",
  "F|The first Saturday I'm free is the nineteenth of April.",
  "M|The nineteenth... I'm afraid both teams are out on the nineteenth. I could offer you Saturday the twenty-sixth of April.",
  "F|The twenty-sixth is fine, actually - I don't hand the keys back until the thirtieth.",
  "M|Saturday the twenty-sixth it is. Now, the team normally starts at nine, but they have a second job across town that afternoon, so they'd come to you at half past eight. Is that too early?",
  "F|Half past eight is fine. I'm up at seven anyway.",
  "M|Good. There will be three of them, and for a two-bedroom flat they'll be with you about five hours.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|And what is it going to cost me?",
  "M|We charge by the hour for a deep clean. The standard rate is a hundred thousand som an hour, but there's a discount for anything booked more than two weeks ahead, so for you it comes to ninety thousand an hour.",
  "F|Ninety thousand an hour. And does that include everything?",
  "M|Everything except the oven. The oven is charged separately, because it needs a different chemical and it takes a good hour on its own. The floors, the kitchen surfaces, the bathrooms and the insides of the cupboards are all included in the hourly rate.",
  "F|Add the oven, please. The landlord will certainly look inside it.",
  "M|Noted. Now, will you be at home to let the team in?",
  "F|That's the difficulty - I'll be at work all day. I could leave a key with my neighbour, she's always in.",
  "M|A key with the neighbour is perfectly normal, we do it all the time. Just tell us her flat number the day before.",
  "F|I will.",
  "M|And there are two things we ask you to do before we arrive. The first is this: please move any furniture away from the walls if you possibly can. Our insurance doesn't let the team shift heavy items themselves.",
  "F|I'll move the furniture on the Friday evening.",
  "M|Perfect. The second is a question, really - is there anything we should know about the products we use? Some customers ask us for unscented ones.",
  "F|Yes, actually - please tell them nothing perfumed at all. I have an allergy, and strong sprays set it off within minutes.",
  "M|I'll put that in capital letters at the top of the job sheet. Payment is by bank transfer after the visit, and I'll send you a confirmation by text message this afternoon.",
  "F|That's very kind. Thank you. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the organiser of a town's winter street market talking to residents about this year's plans. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out on such a cold night. I'm going to tell you what we are planning for this year's winter street market, and then take questions.",
  "F|The first thing everybody asks is where. For the last three years we have used the main square, and I know that is what most of you would like. Unfortunately the square is being dug up in November - new water pipes - and it will be fenced off until the spring. Our second thought was the riverside path, which is lovely at night, but the fire officer went down and measured it, and it is simply too narrow for stalls and crowds together. So this year the market moves to the station car park. It is bigger than the square, it is flat, it is already lit, and the buses stop at the door.",
  "F|Next, how long we open for. Last year we ran continuously for three weeks, and by the end of it our volunteers were exhausted and half the stalls stood empty on weekday mornings. Several of you have written to me suggesting we open for the whole of December, which I am afraid is far beyond us. So this year we are doing four weekends - Friday, Saturday and Sunday, four times over, finishing the weekend before the New Year holiday. Fewer days, and a fuller market on each of them.",
  "F|Now, the stalls, and there is one important change. The fee is exactly the same as last year, before anybody asks, and we are still providing the lighting and the power free of charge. What is new is who may take a stall. Last year more than half of them were traders who tour the country doing markets, selling the same goods you can buy anywhere, and local people who applied were turned away. From this year, every stallholder must live or work in the district. It will be a smaller market and, I think, a much better one.",
  "F|And what worries me? Not the volunteers - we have ninety already, more than we have ever had. Not the shopping centre either; they are lending us their storage and taking nothing for it. What keeps me awake at night is ice. That car park drains badly, it freezes hard overnight, and one bad fall would close us down. So we have bought two tonnes of grit, and we will be out spreading it at six every morning.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right. Let me take you through the market itself, area by area, so you know what is going where.",
  "F|The food stalls first. They were beside the main entrance last year and the smoke blew straight into the queue, which people complained about all season, so we have listened: this year the food is at the far end, by the old ticket office, well away from everything else.",
  "F|Next to the food, the craft tents. These take the place of the antiques fair, which, I have to say, nobody enjoyed - the stallholders complained about the cold and the public walked straight past it. Craft was what people asked for in the survey, by a very long way.",
  "F|In the middle we will have the ice rink, and I want to be clear about this: not a som of the town's money has gone into it. The whole thing, rink, barriers and skates, has been paid for by the builders' merchant on Station Road, who have supported this market since the very beginning.",
  "F|Beside the rink, the music stage. The stalls all close at eight, but the stage carries on until ten every evening, so if you have come for the choirs and the brass bands, come to us late rather than early.",
  "F|Then the children's workshop, which is in the heated tent - making decorations, mostly, and it is free. Please note, though, that places are limited and it must be booked in advance on the website. We cannot take children at the door, and last year that caused a great deal of upset.",
  "F|And finally the park-and-ride bus from the sports ground. It will run, but I will be honest with you: it is the one part of the market we have struggled to staff. We need eight more helpers for the stops at either end, and if anyone here can spare a Saturday morning, please come and see me afterwards.",
  "F|The map is on the table by the door. Thank you all for coming.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two geography students, Sanjar and Dildora, planning a study of shade in their town centre. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Dildora, we ought to write the introduction. Why shadows?",
  "F|The honest answer, Sanjar, or the impressive one?",
  "M|The honest one. Doctor Rashidov's lecture on climate adaptation? That's what half the class will put.",
  "F|But the lecture came afterwards - we'd already chosen. And it wasn't the council's request either; that only arrived last month. It was last summer. Forty-one degrees for nine days, and I stood in the market square watching about sixty people squeezed into one narrow strip of shade beside the wall, while three-quarters of the square lay empty and burning.",
  "M|That goes in, then. Now the literature review. There's plenty written on urban heat.",
  "F|There is, and it isn't old - most of it is from the last five years, so we can't complain about that. And it isn't only from hot countries either; a lot of it is northern European. The weakness is somewhere else. Almost all of it is computer modelling - they build a three-dimensional model of a city and calculate where the shadows will fall. Hardly anybody goes out and watches what people actually do with the shade once it is there.",
  "M|That's our gap. So where do we do the fieldwork? The university courtyard is convenient.",
  "F|Convenient and useless - it's in shadow all day, so there's nothing to compare. And the bus station has a roof over the whole of it.",
  "M|The market square, then.",
  "F|The market square. Open on three sides, hard surface, plenty of people, and the shade moves right across it in the course of a day.",
  "M|Agreed. And what do we actually record? I'd assumed the temperature of the paving.",
  "F|We'll take some readings, but the department's thermometer goes back after a week, so it can't be the main thing. And the width of each shadow is pure geometry - we can calculate that from the building heights without leaving the room. What nobody has is the behaviour. The main measurement is where people choose to sit - how many in the sun, how many in the shade, and how that shifts hour by hour.",
  "M|Good. I saw the tutor yesterday, by the way.",
  "F|And?",
  "M|Two things I expected and one I didn't. She says we don't need permission from the market office, because the square is public land - I'd assumed we would. And she wasn't worried about numbers; two hundred observations is plenty, she said. But she was absolutely firm that every round of measurements has to be on the same day of the week. Saturday to Saturday, or the crowd sizes won't be comparable.",
  "F|Same weekday. That's fair. And my worry is the sky.",
  "M|Cloud.",
  "F|Cloud. If we get a run of grey days there are no shadows at all, and we only have six weeks.",
  "M|That frightens me more than anything else, too. We'll build in spare dates.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So how are we going to collect it? Somebody in the seminar suggested a drone.",
  "M|Beautiful pictures, and completely impossible - you need a licence to fly one over the town centre and the application takes months. Forget the drone.",
  "F|Then the two I keep coming back to. A hand-held infrared thermometer, pointed at the paving - that gives us the surface temperature in a second, sun and shade, as many readings as we like.",
  "M|Yes, that's in. And the second?",
  "F|Time-lapse photographs. If we can get a camera into an upstairs window above the square, one frame every thirty seconds, we can count exactly where people are all day without standing there ourselves.",
  "M|Much less intrusive, too. What about the light meter?",
  "F|The department's one is broken, and in any case it measures brightness, not shade. Leave it. And I don't want a questionnaire either - nobody stops to answer questions in forty degrees.",
  "M|Fair enough. Right - what has to happen before the fieldwork starts?",
  "F|The camera, first of all.",
  "M|The department only has two and everybody wants them in June, so I'll reserve one on Monday morning.",
  "F|Do. And I'll write to the shop above the square - the bookshop on the corner - and ask whether we can put a camera in their upstairs window. Without that there is no time-lapse at all.",
  "M|That's the one that could sink us. What about a plan of the square?",
  "F|Already done - the council's website has one with all the building heights marked on it, I downloaded it last night. And don't buy memory cards, whatever you do; the camera comes with two.",
  "M|Right. Camera, window, and we meet on Friday.",
  "F|Friday it is.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of wool. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we finished with cotton. Today I want to take the other great natural fibre, and one that is a good deal older: wool.",
  "F|Sheep were among the very first animals people domesticated, somewhere in the Near East about eleven thousand years ago. But they were not kept for wool. They were kept for meat, milk and skins, and if you had seen an early domestic sheep you would not have thought of a jumper. Its coat was coarse and hairy, rather like a goat's, and underneath that outer coat there was a short, soft undercoat of down. That undercoat is the ancestor of everything we now call wool.",
  "F|What happened next took a very long time indeed. Generation by generation, farmers kept the animals with the softest and most plentiful undercoat, until, after several thousand years, they had produced a sheep whose fleece was almost all undercoat and which grew all year round instead of being shed in the spring. That last change is easy to miss and it matters enormously. A wild sheep loses its coat by itself; a modern sheep cannot. Wool had become a crop that has to be harvested.",
  "F|At first it was harvested by hand. Shepherds simply pulled the loose fleece off the animal in early summer, and in a few places that is still done today. The tool we associate with the job appeared around one thousand BC, when iron became common: iron shears, two blades joined by a spring, and if you saw a pair from a Roman farm you would recognise them instantly, because the design has hardly changed since.",
  "F|Then the fleece has to be turned into thread, and for most of history that was done with a spindle - a weighted stick that is set spinning, drawing the fibres out and twisting them together as it turns. It is portable, it costs almost nothing, and women spun with one while walking, minding children or watching animals. The spinning wheel, which does the same job a great deal faster, came to Europe from Asia in the thirteenth century, and it multiplied the amount of thread a single worker could produce.",
  "F|Now, the medieval period, where wool stops being a craft and becomes an economy. English wool was famous across Europe for its fineness, and most of it left the country raw, shipped across to Flanders, where the weaving towns turned it into cloth and sold it back at several times the price. The English crown noticed. A tax on every sack of wool leaving the country became the most dependable income the kings had, and it paid, more or less directly, for their wars in France. You can still see how seriously this was taken: the Lord Chancellor of England sits, to this day, on a large cushion stuffed with wool. And the monasteries, particularly in the north, ran flocks of many thousands of sheep and shipped the fleeces themselves.",
  "F|Spain, meanwhile, had something better. The merino sheep, whose fleece is finer than anything grown in northern Europe, was effectively a state secret: for a long period, taking a merino out of Spain was punishable by death. The monopoly ended in the eighteenth century and the breed travelled - to Saxony, to South Africa and, at the very end of that century, to Australia, where it did extraordinarily well. By nineteen hundred Australia had more sheep than any other country on earth, and wool was its principal export.",
  "F|Let me say a word about the fibre itself, because the way it behaves explains its history. Put a wool fibre under a microscope and you will see that it is covered along its whole length with tiny scales, like roof tiles. When wool is washed in hot water those scales open and lock into one another, which is why a jumper shrinks in the machine, and also why felt exists at all. The fibre is not straight, either; it has a natural wave, called the crimp, and the crimp traps air, which is what makes wool warm. It will absorb a third of its own weight in water before it feels damp, and it is remarkably difficult to set on fire, which is why wool is still specified where synthetic fibres are not allowed.",
  "F|And that brings us to the present. Wool lost the clothing market in the nineteen fifties, when cheap synthetic fibres arrived, and the price has never fully recovered. But the industry has found other work for it. Wool is sold for carpets, for mattresses, for cleaning up oil spills at sea - it soaks up oil and repels water - and, increasingly, it is pressed into thick sheets and fitted between the walls and roofs of houses as insulation. Eleven thousand years after the first sheep was penned, the fibre is still finding new employers. Next week: silk.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset16-s1.wav" $s1
Render "pset16-s2.wav" $s2
Render "pset16-s3.wav" $s3
Render "pset16-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
