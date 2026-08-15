# Generates the four Upper-Inter Set 13 listening recordings with Windows TTS.
# Same conventions as the mock scripts: "F|"/"M|" pick the voice, "P|<seconds>"
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
  "M|Part one. You will hear a man telephoning an adult education centre to enrol in a weekend first-aid course. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Hillcrest Adult Education Centre, good morning.",
  "M|Oh, hello. I'm calling about the weekend first-aid course. My sister took it last year and she hasn't stopped recommending it. Are there still places?",
  "F|Let me just check... yes, we have a few places left. Shall I take your details and book you in?",
  "M|Yes, please. My name is Rustam Karimov.",
  "F|Could you spell the surname for me?",
  "M|Of course. It's K, A, R, I, M, O, V. Karimov.",
  "F|K, A, R, I, M, O, V. Thank you. Now, the next course runs on Saturday the eleventh of October... oh, I do apologise - no. The October course is completely full, and has been for a week. The next date with places is Saturday the eighth of November. Would that suit you?",
  "M|The eighth of November... let me think. I'm away at the very end of November, but the eighth is fine, yes.",
  "F|Lovely. Now, the timing changed this year, so ignore anything your sister told you. The course used to begin at ten, but people found the day too rushed, so it now starts at nine thirty. And we ask everyone to arrive by nine fifteen to register, because there are forms to sign.",
  "M|Nine thirty, arrive by nine fifteen. And where exactly is the course held? In your main building?",
  "F|Not in the main building, no. The course takes place in the Maple Building - that's the low white building directly opposite the fire station. If you can find the fire station, you can't miss us.",
  "M|Opposite the fire station - easy. And what does the course cost?",
  "F|The standard fee is three hundred and fifty thousand som, and that includes a printed manual, which is yours to keep. If you're a student, or over sixty-five, the reduced fee is two hundred and fifty thousand.",
  "M|I'm neither, I'm afraid, so the full fee it is.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|Is there anything special I should wear on the day?",
  "F|Nothing formal - rather the opposite. Comfortable trousers are the main thing, because some of the practice is done kneeling on the floor, and you'll be doing chest compressions on a training dummy. Anything tight or smart would just get in the way.",
  "M|Comfortable trousers, noted. What about food? Is there a lunch break?",
  "F|There's a full hour at midday. We ask everyone to bring a packed lunch, because the nearest shops are a good fifteen-minute walk away. Tea and coffee are provided free all day, so there's no need for a flask.",
  "M|A packed lunch, fine. And do I get a certificate at the end?",
  "F|You do, provided you pass the short assessment - nearly everyone does. The certificate is valid for three years. After that you'd need a refresher course, which takes just half a day.",
  "M|Three years - better than I expected. Is there a deadline for booking?",
  "F|There is, and it matters. The trainer has to order the manuals in advance, so we need bookings by the Wednesday before the course. People often assume the Friday is fine, but by then it's too late.",
  "M|By the Wednesday, understood. And how do I pay?",
  "F|Payment is by card on the centre's website - there's a link on the course page. We can't take cash on the day any more, so do pay when you book, or the place isn't held.",
  "M|I'll do it tonight, then. Thank you very much - you've been really helpful.",
  "F|You're very welcome. We'll see you on the eighth of November.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
    "P|5"
)

$s2 = @(
  "M|Part two. You will hear a guide at a coastal shipwreck museum talking to a group of visitors. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome to the Salthaven Shipwreck Museum. I'm one of the volunteer guides here, and before we set off round the building I'd like to tell you a little about the place and how today will work.",
  "F|First, the building itself, because people always ask. Visitors usually guess it was the lifeboat station, because of the old stone slipway at the side, but the lifeboat house actually stood further along the shore, where the car park is now. Others assume boats were built here - there was a boatbuilder, but his workshop was across the harbour. In fact, this building itself was a store: for nearly a hundred years, barrels of salted fish stood here from floor to ceiling, waiting for the wagons that carried them inland. When the fishing trade collapsed, the building stood empty for decades until the museum rescued it.",
  "F|Now, what's on today. Our short film about the wreck of the Meridian runs every hour in the little cinema, just as it does every day of the year. I'm sometimes asked whether visitors can handle objects from the collection - I'm afraid that's something we arrange for school groups only. But today you are luckier than most: at three o'clock we have a talk by one of the divers who has actually explored the wreck of the Meridian, and he'll take questions afterwards. Do stay for it if you possibly can.",
  "F|A quick word about photography. You may take photographs almost everywhere - in the entrance hall, in the galleries, with flash or without, because our lighting is designed to cope. The one exception is the Textile Room, where the flags and the sailors' clothing are so easily damaged by light that we allow no photography at all in there. Everywhere else, please snap away.",
  "F|And one recommendation before we start. At the end of the afternoon most people drift towards the shop, and the harbour wall outside makes a pleasant stroll. But whatever you do, do finish your visit on the viewing platform on the roof. On a clear day you can see the Blackrock reef, which sank half the ships whose remains fill this museum, and the whole collection suddenly makes sense.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Right - let me walk you through the six main things you'll see, in the order you'll meet them.",
  "F|We begin in the Cargo Gallery, which holds goods recovered from the seabed - pottery, tools, coins, even shoes. Unusually for a museum, everything on the long central table can be picked up: children are welcome to touch the objects there, turn the coins over, feel the weight of a pulley block. Everything in the glass cases, though, stays behind glass.",
  "F|Beyond it is the Storm Gallery, which tells the story of the great gale of 1859. I'm sorry to say the Storm Gallery is closed for a few weeks - January's storms, rather fittingly, drove water through the roof, and the repairs are taking longer than promised. It will reopen in the spring.",
  "F|At the foot of the stairs hangs the great ship's bell from the Meridian herself. We didn't excavate it, and we certainly didn't buy it: it was found by a local fisherman, whose nets brought it up about ten years ago, and he handed it straight to the museum the same afternoon. It still rings, though we only allow that once a year.",
  "F|Upstairs you'll find the diving suit - the heavy, brass-helmeted kind. It belonged to Edgar Voss, who explored the deep wrecks off this coast in the nineteen fifties, and after his death his family gave the suit to the museum, together with all his notebooks. We're very proud of that case.",
  "F|Next to it stands the figurehead - the carved oak figure of a woman that once rode the bow of a merchant ship. People often assume we bought it at some grand auction abroad. In fact it has been in Salthaven since before the museum existed, and as it was carved around 1690, it is the oldest object we have.",
  "F|And finally, the model ships - forty of them, all built by one retired harbour pilot. At the moment they're squeezed into a corridor, which does them no justice at all, so they will move to a much larger room upstairs in the summer. One of the models appeared briefly in a television series, by the way - not, whatever anyone tells you, in a famous film.",
  "F|Right - if you're all ready, follow me into the Cargo Gallery.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
    "P|5"
)

$s3 = @(
  "M|Part three. You will hear two environmental science students, Jasur and Madina, discussing their project on microplastics in a local river. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Right, Madina, the introduction. We need a line on why we chose microplastics in the first place. Was it that documentary everyone was talking about last term?",
  "F|Everyone assumes that, Jasur, but I still haven't actually seen it. No - it was a news report that started it, for me. Plastic fibres had been found in fish from our own river - the one we cross every morning - and suddenly it wasn't a problem happening in some distant ocean. The visiting lecturer's talk came weeks later. It was useful, but we'd already decided by then.",
  "M|Fair enough - the news report goes in the introduction. Now, the sampling sites. I still half wish we'd used the road bridge - the current there is the strongest on the whole stretch.",
  "F|On paper it's ideal, but there's simply no safe way down to the water - the bank is almost vertical, and the tutor refused point blank. And the stretch beside the shopping centre is out as well: last year's group covered it thoroughly, so we'd be adding nothing. That's why we sample downstream of the water treatment works - treated water still carries fibres, and nobody has ever measured that stretch.",
  "M|Agreed, and it gives the project a clear question. Now, the pilot session. The report has to be honest about what went wrong.",
  "F|It does. The wind was a nuisance - it kept rolling litter along the bank - but none of it went anywhere near the bottles, so I wouldn't call it serious. And you did drop a filter in the current...",
  "M|One filter, and we had spares - we lost five minutes at most. No, the real problem showed up later, under the microscope. Half the fibres on the pilot filters were bright blue - exactly the colour of our fleece jackets. Our own clothes were shedding fibres into the samples the entire time.",
  "F|Which is embarrassing, but apparently even professional teams get caught by it - it's the classic error in this field. We agree that's the serious one, then. Now, you showed the tutor our site plan. I was convinced she'd ask for extra sites - I'd even drafted an argument for five.",
  "M|And I was braced for the opposite - being told to cut down to a single site. She said neither, in the end: keep the three sites, but sample them every week instead of once a month. In her words, frequency tells you more than coverage.",
  "F|Every week - there go our Saturdays. Still, the pilot results make it feel worth it. Can I say what genuinely surprised me? It wasn't the colours, striking as they were.",
  "M|Go on - because for me, I never expected fibres to be the commonest thing we found. I'd assumed fragments - bits of bottles and bags - would dominate, and they came a distant second.",
  "F|That's exactly what I was going to say. All the reading emphasises fragments, and our filters are covered in fibres instead. We should make that the headline finding.",
  "M|Agreed. One more thing: identifying what the particles are actually made of. Colour and shape only get us so far.",
  "F|We can manage most of it ourselves. The drying oven just needs booking a day ahead, and your camera clips onto the microscope, so the photography is covered. The one thing we can't do alone is the polymer analysis - students aren't allowed to run that instrument without a training certificate. So we'll ask the technician to run the spectrometer for us. She's already said yes, provided we prepare the filters properly.",
  "M|Perfect. That goes in the plan, then.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "M|So - contamination. How do we make sure the blue fleece disaster never happens again? Someone in the seminar suggested rinsing the bottles in river water before we start.",
  "F|The field handbook actually warns against that - rinsing can wash particles into the bottle before the sample even exists. Clothing matters far more. From now on we wear cotton from head to foot - no fleece, no waterproof jackets, nothing synthetic anywhere near the water.",
  "M|Agreed - cotton it is, however cold it gets. I also priced up metal sampling containers, because our plastic bottles could themselves shed particles. But a proper set costs more than our entire budget, so that's out.",
  "F|Sadly, yes. What we can afford is proper controls. We open a bottle of pure water at every site, leave it standing open while we work, then analyse it exactly like a real sample. If fibres appear in that bottle, we know they came from us or from the air - not from the river.",
  "M|Blank controls at every site - that's our strongest defence, honestly. I did also wonder about always standing upwind of the equipment while we work.",
  "F|I thought about that too, but the wind down in that valley swings round every five minutes - we'd spend the whole session walking in circles. Let's not bother.",
  "M|Dropped. Last item, then: the poster for the department showcase. I assumed we'd start with a big map of the three sites.",
  "F|Actually, I'd leave the map out altogether. Everyone in the department knows the river, and a map would swallow a third of the poster. What people will queue up to see is the photographs taken through the microscope - the fibres look like bright coloured threads. They're genuinely beautiful.",
  "M|The photos go in, definitely. What about the full table of raw measurements?",
  "F|That belongs in the appendix of the written report. On a poster it's just a wall of numbers - nobody reads it. But I do want one more panel: we should compare our numbers with the published study of the Aldera River. It's the only comparable dataset, and the comparison is what makes our results mean anything.",
  "M|A comparison panel - good. And should we add advice for visitors, about cutting their own plastic waste?",
  "F|The tutor was firm about that: findings, not campaigning. So no advice section. The microscope photographs and the river comparison - those are our two additions, and that's the poster full.",
  "M|Done. I'll book the microscope for Monday morning.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
    "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of natural dyes. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. Today I want to talk about colour - or, more exactly, about how human beings put colour into cloth for most of history, using nothing but plants, minerals and a few unlucky animals. Until the middle of the nineteenth century, every coloured garment on earth owed its shade to a natural dye, and the story of those dyes is a story of trade, of secrecy, and of one very famous accident.",
  "M|Dyeing is far older than written history. Pieces of dyed cloth found in South America are at least six thousand years old, and some still show clear traces of blue and red. But the early dyers faced a stubborn problem: most colours made from plants fade rapidly when exposed to sunlight. A tunic that left the workshop glowing scarlet could be a tired pink by the end of a single summer. The answer was found remarkably early. Before dyeing, the cloth was soaked in substances called mordants, usually metal salts, and these bind the colour permanently into the fibre. With the right mordant, in fact, one and the same plant could be made to give several different shades.",
  "M|Let me take three famous colours in turn. Blue, almost everywhere in the world, came from the indigo plant. Indigo is a strange dye: the blue does not exist ready-made in the plant, and it will not dissolve in plain water. To release the colour, dyers had to ferment the leaves of the plant in a warm vat, sometimes for days, producing an evil-smelling yellowish liquid. Cloth lifted from that vat is not blue at all - the colour appears only as the cloth meets the air, a change that must have looked very close to magic.",
  "M|Red came from the crushed root of the madder plant, which was grown in fields across Europe and Asia. Madder was cheap, it was plentiful, and it was wonderfully stable - stable enough to colour soldiers' uniforms for several centuries, which is why so many European armies marched to war dressed in red.",
  "M|And then there was purple. True purple was produced in the ancient city of Tyre, on the eastern Mediterranean coast, and it was made not from a plant at all but from sea snails. Each snail yielded a single drop of dye, so tens of thousands of snails were needed to colour a single robe. Purple cloth therefore cost far more than its weight in gold, and in Rome the colour was eventually reserved for royalty alone; wearing it without permission could be punished as treason.",
  "M|Colour, in other words, was wealth, and dyes travelled as treasure. Along the Silk Road, dyestuffs were among the most valuable cargoes a merchant could carry - worth more, weight for weight, than the silk itself. And when Spanish ships reached Central America in the sixteenth century, they found a red finer than any madder: cochineal, made from the dried insects that live on cactus plants. It took roughly seventy thousand of them to produce half a kilogram of dye, but the colour was magnificent, and Europe paid whatever Spain asked. The Spanish crown understood exactly what it possessed, and kept the true source of cochineal a secret for almost two centuries; many European buyers remained quite sure that the mysterious red grains were seeds.",
  "M|This entire world ended suddenly, and it ended by accident. In 1856, an eighteen-year-old chemistry student in London named William Perkin spent his Easter holiday trying to make the medicine quinine, which was urgently needed for the treatment of malaria. The experiment failed completely. But at the bottom of his flask Perkin noticed a dark sludge, made from coal tar, and when he dissolved it, the liquid turned a brilliant purple. He called the new colour mauve. Queen Victoria wore a mauve gown, fashionable London followed her, and the teenage Perkin became a wealthy man. Chemists across Europe began pulling colour after colour out of coal tar, and within fifty years synthetic colours had replaced natural dyes almost completely, from the fashion houses of Paris to the smallest village market.",
  "M|And yet the story has a final twist, because natural dyes are now quietly coming back. Part of the reason is environmental: the waste from synthetic dye factories can pollute rivers, and in some textile regions it visibly does - there are places where, it is said, you can predict next season's fashionable colour from the colour of the water. Growing dye plants, by contrast, can support small farms, and the colours they give have a softness that chemists still struggle to copy. The craft that Perkin's flask made obsolete may yet have a future after all.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset13-s1.wav" $s1
Render "upset13-s2.wav" $s2
Render "upset13-s3.wav" $s3
Render "upset13-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
