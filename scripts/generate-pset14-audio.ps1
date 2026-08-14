# Generates the four Practice Set 14 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a bus company to report an item she has lost. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Hillcrest Bus Company, lost property office. Good morning.",
  "F|Good morning. I left a bag on one of your buses yesterday evening, and I'm hoping somebody has handed it in.",
  "M|Very possibly. Let me open a report form and take the details. Can I start with your name?",
  "F|Yes, it's Dilnoza Yusupova.",
  "M|Could you spell the surname for me?",
  "F|Of course. Y, U, S, U, P, O, V, A. Yusupova.",
  "M|Thank you. And a mobile number I can reach you on?",
  "F|It's nine three, four four, one two six.",
  "M|Nine three, four four, one two six. Now, which bus were you travelling on?",
  "F|The one that goes out to Silk Road Park. I always take the thirty-eight... no, I'm sorry, that's the morning one from the station. In the evenings I catch the sixty-three.",
  "M|The sixty-three, going out to the park. And which evening was this?",
  "F|Yesterday.",
  "M|So that would be Tuesday the eleventh of April.",
  "F|No, it can't have been Tuesday - I worked late on Tuesday and didn't take the bus at all. It was Wednesday. Wednesday the twelfth.",
  "M|Wednesday the twelfth of April. Do you know roughly what time?",
  "F|Between five and six in the evening. I got on outside the hospital.",
  "M|That's helpful. Now, what exactly did you lose?",
  "F|A rucksack. Quite a big one, the sort you'd take walking for the day.",
  "M|A rucksack. And what colour is it?",
  "F|Dark blue. No - hold on, I'm describing the one I had before. It's green. Definitely green, with a grey strap and a small pocket on the front.",
  "M|Green with a grey strap. I have that.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "M|And whereabouts on the bus did you leave it?",
  "F|That's what I keep asking myself. I thought at first I'd pushed it under the seat, but I remember now - the bus was full, so I put it up on the luggage rack by the middle door. Then I got off in a hurry.",
  "M|On the luggage rack. That's actually encouraging; bags left up there are usually spotted by the cleaners. Was there anything of real value inside? We handle those reports rather differently.",
  "F|Yes, there was. My camera. That's the thing I really want back - it's an old one and worth very little, but all my photographs from the summer are still on it.",
  "M|A camera. Noted. And can you describe anything else in the bag, so that we can be certain it is yours when it turns up?",
  "F|A water bottle, a notebook and a set of keys. House keys, on a red ring.",
  "M|A set of keys. Good. That is exactly the kind of detail that identifies a bag.",
  "F|So what happens now?",
  "M|Everything handed in during the day goes to our depot overnight and is logged the following morning, so I should know by tomorrow. We keep unclaimed items for six weeks, and after that they go to charity.",
  "F|And if you do find it, can I come and collect it?",
  "M|You can. All lost property is handed over at the ticket office at Hillcrest station, any weekday between nine and five. Do bring a document with a photograph on it, because we aren't allowed to release anything without one.",
  "F|And if I can't get there?",
  "M|Then we can post it to you. There is a charge, though. It used to be fifteen thousand som, but the price went up in January, so it's twenty-five thousand now, whatever the size of the parcel.",
  "F|Twenty-five thousand. I'd rather collect it, I think.",
  "M|Very sensible. I'll send you a text with your report number this morning, and you'll hear from us tomorrow either way.",
  "F|Thank you very much indeed. Goodbye.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the coordinator of a volunteer lifeguard scheme speaking at a public meeting. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out on such a wet night. I coordinate the volunteer lifeguard scheme, and I'm here to explain what we do and, I hope, to sign a few of you up.",
  "F|People are often surprised by how the scheme began. Because we work closely with the town council now, most people assume the council created us; in fact the council refused the idea twice before it changed its mind. Others remember the accident at the harbour two summers ago and assume that was the starting point - but we were already patrolling by then; what the accident changed was our funding. The scheme actually began with a group from the winter swimming club, who were in the water all year anyway and got tired of being the only people on the beach who knew what to do.",
  "F|Now, what does a volunteer lifeguard actually do? Newcomers picture dramatic rescues, and I won't pretend those never happen. But if you look at our logbooks, the swim to somebody in difficulty is rare, and treating cuts and stings, though we do plenty of that, is not the bulk of it either. Nine shifts out of ten consist of walking up and down telling people things: that the tide is coming in behind that sandbank, that the water by the wall is deeper than it looks, that an inflatable boat is a bad idea in an offshore wind. Almost everything we do is warning people before anything goes wrong.",
  "F|If you would like to join, there is one hurdle you have to clear yourself. You do not need a first-aid certificate - we teach you all of that, and we teach it properly, over six weekends. You do not have to be eighteen, either; we take volunteers from sixteen with a parent's signature. What you do have to do, before anything else, is the swim test: four hundred metres in under nine minutes, in open water, not a heated pool. That is the one thing we cannot be flexible about.",
  "F|And our difficulties? Equipment, I'm glad to say, is not one of them - a local firm replaced all our boards and radios last year. Nor is the standard of applicants; we get plenty of strong swimmers. Our problem is the calendar. Everybody wants the summer Saturday shifts, and almost nobody is free on a Tuesday afternoon, which is precisely when the schools are out and the water is warm. Filling the weekday rota is the hardest thing I do.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Right. Let me take you round the six places we cover, because they are not at all alike.",
  "F|Harbour Beach first, the one everybody knows. It looks like the safest water in the district, and on a calm day it is - but at low tide the channel empties past the point and the pull along the shore there is strong enough to carry an adult swimmer out. Two of our four rescues last season happened at that spot, on the ebb tide.",
  "F|Mill Lake is quite different: shallow, warm and slow. That is why we hold all our beginner sessions there. Every volunteer in this room did their first eight weekends at Mill Lake, learning boards and casualty handling before going anywhere near the sea.",
  "F|The river at Foxbridge is off the list this season, I'm afraid. The old landing steps were undermined in the spring floods, and until the engineers have rebuilt them nobody is going in or out of the water there, so we have suspended patrols until the work is finished.",
  "F|Blackstone Reservoir is our newest responsibility. The water company opened it for swimming in April, and we agreed to cover it from the first weekend, which is why you may not have heard us mention it before this year.",
  "F|Sandy Cove is the busy one. It appears in every guidebook to the coast, and on a hot weekend two thirds of the cars in the car park have come from other regions, some of them a three-hour drive away. That matters to us, because visitors do not know the beach, and people who do not know a beach take risks that local families never would.",
  "F|And finally the canal basin, right in the middle of town. We simply do not have the people to staff it every day, so we cover it on Saturdays and Sundays only, from May to September, and rely on signs for the rest of the week.",
  "F|Right. Application forms are on the table by the door, and I shall be here for another half hour.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two students, Umid and Sevara, planning an audit of food waste in their university canteen. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Sevara, the project form wants a paragraph on why we chose food waste. What do we say?",
  "F|The honest thing, I hope. Not that documentary everybody watched - half the class will write that, and anyway we'd already chosen by the time it was shown.",
  "M|And not Doctor Ergashev either. He suggested we look at recycling in the halls of residence, remember, and we said no.",
  "F|We did. It came from my job. I work three evenings a week in the canteen, and I am the person who empties the trays into the bin at the end of service. When you have watched that much good food go into a bin twice a week, you stop being able to ignore it.",
  "M|That's the paragraph, then. Now, the reading. I found nine or ten studies of canteen waste.",
  "F|So did I, and they are better than I expected in some ways. The sample sizes were reasonable, and most of them are recent - the oldest was from twenty nineteen. My objection is what they measured. Almost all of them weighed what the kitchen threw out, the trimmings and the unserved portions, and simply left out the food that diners scraped off their own plates.",
  "M|Which is the half that interests us. Agreed - that is the gap we say we are filling. So, how do we collect our data? I quite liked the idea of photographing every tray as it comes back to the counter.",
  "F|I thought about that too, but you'd need everybody's consent for the photographs, and a camera fixed where it doesn't get in the staff's way. It's a month of paperwork for something we can do with a set of scales.",
  "M|And a questionnaire? Ask diners to record what they left?",
  "F|People underestimate their own waste enormously - every study says so. No, we weigh the bins ourselves, after every service. It's dull, it's physical, and it's the only number nobody can argue with.",
  "M|Weighing it is. Now, the catering manager. She has signed the permission form already, but she rang me yesterday.",
  "F|Is she worried about the extra work? Or the hygiene rules - I did wonder whether we'd need certificates to handle the bins.",
  "M|Neither, in the end. The staff time is nothing, twenty minutes a day, and she says our gloves and aprons cover the hygiene side. What she wants is an agreement about publication. She's afraid of a headline in the student paper, so she asked to see the figures before anybody else does.",
  "F|That seems fair enough. We'll write it into the form. Now, timing. Doctor Ergashev was very clear when I saw him on Monday.",
  "M|Let me guess: he wants the weekend services in as well.",
  "F|No, he doesn't mind about the weekends either way, and he certainly isn't asking us to compare ourselves with another university. His point was that one week of data is nearly worthless on its own, so we have to run the whole thing again later in the term, after the canteen has made its changes. Two rounds, not one.",
  "M|Two audit weeks. That's more work, but he's right - otherwise we have a photograph, not a study. Now, what worries me is something else entirely. The scales are fine, and I think we have enough time.",
  "F|You mean people behaving differently because we're standing there with a clipboard.",
  "M|Exactly. If the kitchen serves smaller portions in our audit week because they know we're counting, our figures mean nothing at all.",
  "F|It frightens me too. I think we say as little as possible about what we are measuring, and weigh at the same times every day so it becomes ordinary.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So what goes into the audit and what stays out? Plate waste is in, obviously.",
  "M|Obviously - that's the whole point of the study. What people leave on their plates goes on the first line of the form.",
  "F|Then there's the preparation waste. I know you wanted to leave the peelings and the trimmings out.",
  "M|I did, because they aren't avoidable, are they? Nobody eats a carrot top.",
  "F|But the thickness of the peel is a choice, and so is what the kitchen does with the stalks. Two of the studies found preparation waste was a quarter of the total. If we leave it out we can't compare our numbers with theirs.",
  "M|All right, you've convinced me. Peelings and trimmings go in as our second category. What about the store room - the tins and packets that go past their date?",
  "F|I asked. The manager won't open the stock records to us, so we would only be guessing. Out.",
  "M|And drinks? All that coffee poured down the sink?",
  "F|Liquids can't go on the same scales, and the sink isn't a bin. Leave it. And packaging is not food, whatever the environment society says.",
  "M|Two categories then. Right - jobs before the audit week starts.",
  "F|The scales. The laboratory lends them out, but there's a booking list, and if we don't put our name down this week we'll be weighing four hundred meals on my bathroom scales.",
  "M|I'll book them tomorrow morning. And I'll do the bin labels as well - we need every bin marked and numbered, or the kitchen staff will tip everything into the nearest one and our two categories become one.",
  "F|Labels, yes. Both of those before the week starts. The questionnaire for diners can wait, can't it?",
  "M|Easily - that's for the second round, if we do one at all. And I don't think we need to train anybody else to help; there are only two services a day.",
  "F|Agreed. Scales and labels this week, then.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of rubber. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we followed the history of glass. Today I want to look at a material that is younger as an industry but far older as an invention: rubber.",
  "F|Rubber begins in Central America, and it begins at least three thousand years ago. The peoples of the region cut the bark of a local tree and collected the white liquid, the latex, that ran out of it. On its own that latex dries into a weak, sticky film. Their discovery, and it is a genuine piece of chemistry, was that if you stir the latex together with the juice of a vine that grew nearby, the mixture stiffens into a solid, springy lump. What they made from those lumps were balls, and the balls were not toys. They were used in a ceremonial game played on stone courts in front of large crowds, a game with religious meaning and, in some cities, serious consequences for the losing side.",
  "F|Europeans met the material when Columbus and those who followed him saw those balls bouncing, and were astonished; nothing in Europe behaved like that. But for two centuries rubber remained a curiosity in cabinets. It was the French scientist Charles-Marie de La Condamine who, in seventeen thirty-six, sent proper samples and a description back from the Amazon to Paris, and scientific interest begins there. The English name arrived a little later, and by accident. Joseph Priestley noticed that a small cube of the stuff would rub out pencil marks on paper, sold it in his local shop for exactly that purpose, and the material has been called rubber in English ever since.",
  "F|Useful, though, it was not. Raw rubber has a temperature problem that defeated everybody who tried to make anything from it: it turns soft and sticky in summer heat, and in winter it goes hard and brittle and cracks. A famous early business in Massachusetts sold hundreds of pairs of rubber overshoes one autumn and had them all returned as melted lumps the following August.",
  "F|Two men solved it. The first solution was partial: in the eighteen twenties Charles Macintosh discovered that rubber dissolved in a solvent could be spread between two layers of cloth, giving a waterproof fabric that is still, of course, called a macintosh. The full solution came in eighteen thirty-nine, when Charles Goodyear, after years of failure and debt, heated a mixture of rubber and sulphur - and found that the result stayed elastic in the heat and flexible in the cold. That process, vulcanisation, is the single fact that turns rubber from a curiosity into an industry, and every rubber object around you today depends on it.",
  "F|The demand that followed came from transport. In eighteen eighty-eight John Boyd Dunlop, a vet in Belfast, wrapped an air-filled rubber tube around the wheels of his son's tricycle to give the boy a smoother ride on the cobbles, and the pneumatic tyre was born, just in time for the bicycle craze and then the motor car.",
  "F|All of this rubber still came from wild trees in the Amazon, tapped by workers under conditions that were often close to slavery, and the trade made the river city of Manaus briefly one of the richest places on earth. That monopoly ended in eighteen seventy-six, when Henry Wickham shipped seventy thousand seeds out of Brazil to a botanical garden in London. The seedlings raised there were sent on to Ceylon, Singapore and Malaya, and within thirty years plantations in Asia, with their neat rows and their trained tappers, were producing rubber far more cheaply than the Amazon ever had.",
  "F|The next turning point was war. When Japan took the plantations of south-east Asia in nineteen forty-two, the United States lost nine tenths of its supply overnight and poured money into laboratories, so that synthetic rubber, made from oil, went from a laboratory product to a national industry in about three years.",
  "F|And today? Synthetic rubber dominates by volume, but roughly half of all the rubber the world uses is still natural, cut from trees by hand, because no laboratory has matched its resistance to heat and tearing. Most of that natural rubber goes into tyres for lorries and aircraft. Which leaves the industry with an obvious worry: almost every rubber tree on earth descends from one shipment of seeds, and a plantation of near-identical trees is exactly what a disease likes best. Next week we shall look at the history of paper.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset14-s1.wav" $s1
Render "pset14-s2.wav" $s2
Render "pset14-s3.wav" $s3
Render "pset14-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
