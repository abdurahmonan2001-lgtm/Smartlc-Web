# Generates the four Practice Set 19 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a community centre to ask about a language exchange group. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Riverside Community Centre, good morning.",
  "F|Good morning. I saw a poster in the library about a language exchange group that meets at your centre. Could you tell me a little more about it?",
  "M|Of course - it's one of our most popular groups. It runs every week during term time, and the idea is that you practise a language with somebody who grew up speaking it, and they practise yours. Were you thinking of joining?",
  "F|I'd like to, yes.",
  "M|Then let me take a few details. Could I have your name first?",
  "F|It's Aziza Karimova.",
  "M|And could you spell the surname for me?",
  "F|Certainly. It's K, A, R, I, M, O, V, A. Karimova.",
  "M|Thank you. Now, which languages do you speak already?",
  "F|Uzbek and Russian at home, and my English is fluent - I did my degree here.",
  "M|Very useful indeed. And which language would you like to practise with us?",
  "F|Well, I did French at school for four years, so I nearly put that... but honestly it's Japanese I need. My company has an office in Osaka and I'm hoping to transfer there next year.",
  "M|Japanese. Let me just check we can match you... yes, we have two Japanese speakers in the group at the moment, so that's fine.",
  "F|Wonderful. And when does it meet?",
  "M|The group used to meet on a Tuesday, but the hall was double-booked all last term and people got fed up, so we moved it. It's every Thursday now.",
  "F|Thursday. That actually suits me better.",
  "M|Good. And we start at six thirty. I should say, a few people arrive at six for coffee and a chat, but the session itself begins at six thirty and runs for two hours.",
  "F|Six thirty. And whereabouts in the building is it held?",
  "M|It was in the Oak Room, just by the entrance, but that's been given to the children's club this year. The language exchange is in the Willow Room now, up on the first floor.",
  "F|The Willow Room, first floor. Right.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|And what does it cost to join?",
  "M|It was seventy-five thousand som a term when we started, but the council gives us a small grant now, so it has come down to sixty thousand som per term. That covers twelve sessions.",
  "F|Sixty thousand. That's very reasonable. And how big is the group?",
  "M|About sixteen people, and everybody works in pairs, so nobody sits at the back listening.",
  "F|Good. Is there anything I need to bring the first time?",
  "M|Nothing complicated. People often turn up with a dictionary, but you really won't need one - your partner is the dictionary. Do bring a notebook, though. Everyone says the same thing afterwards: you forget half of what you learn unless you write it down as you go.",
  "F|A notebook. I can do that.",
  "M|Oh, and there's one small tradition I should warn you about. We stop halfway through for refreshments, and the members take turns to bring cakes. The centre provides the tea and coffee, so it really is just the cakes.",
  "F|I think I can manage that once a term.",
  "M|And there's one event outside term time, which I'd recommend. In July we hold a picnic beside the river - families are welcome, and everybody brings food from their own country. It's the best evening of the year, honestly.",
  "F|A picnic in July. Lovely. So how do I sign up?",
  "M|We used to post out a paper form, and half of them never came back. Now everything is done on the centre's website - there's a short form under Groups and Classes. Fill that in and the coordinator will email you within a day or two.",
  "F|The website. And who is the coordinator?",
  "M|Her name is Gulbahor - sorry, no, wait, Gulbahor took over the choir in September. The language exchange coordinator is Malika. Ask for Malika at reception if you have any trouble with the form.",
  "F|That's very helpful. Thank you.",
  "M|You're very welcome. We'll see you on Thursday.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a woman from a local energy advice service speaking at a neighbourhood meeting. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out on a cold night - which is, I suppose, exactly the point. I'm from Green Doorstep, the free energy advice service for this neighbourhood.",
  "F|People always ask first how we are paid for, usually because they are waiting for me to sell them something. I'm not. We did apply to a national research fund two years ago, and I'm sorry to say we were turned down. And no, there is no subscription - some advice services do charge residents a small annual fee, but we don't and we never have. Every penny of our funding comes from the borough council, out of its climate budget, and it is agreed until at least 2029.",
  "F|Now, the mistake I see most often. It isn't leaving the heating on too long. It isn't the thermostat either - people worry far too much about the thermostat. The commonest mistake, by a long way, is buying equipment before improving the building: a beautiful new heat pump bolted onto a house that leaks heat from every window and door. Fix the building first. The equipment is the last step, not the first.",
  "F|If you want us to look at your own home, we do free visits. Please don't telephone the office - there is one phone, and it is usually in my pocket while I'm out on a visit. And I know some of you have tried the online form; it has been broken since the website changed, and I do apologise for that. The way that actually works is to come and find us at the library: we are there every Wednesday morning, nine until twelve, with the diary open in front of us.",
  "F|And the one thing I would most like you to borrow from us. We lend all sorts of equipment, but the star of the collection is a thermal camera. You point it at your own wall and you see the heat pouring out - round the letterbox, under the front door, up the side of the chimney breast. Nothing I say tonight will convince you half as fast as ten minutes with that camera. There is a waiting list, but it moves quickly.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Let me take you through the measures themselves, in the order I would normally suggest them.",
  "F|Draught-proofing comes first. Strips round the doors and the window frames, a brush on the letterbox, something in the gaps under the floorboards. It costs very little, and the important thing about it is that you do not need us, and you do not need a contractor: two people can fit the whole lot themselves in a weekend.",
  "F|Loft insulation next. Nearly every house on these streets has some already, put in during the nineteen eighties, and that is why so many people tell me they have done it. Go up and measure it. The old standard was five centimetres; the standard now is thirty. In almost every loft I visit the insulation is there but far too thin.",
  "F|Solid wall insulation is the big one round here, because these houses are Victorian and have no cavity. It is also the expensive one. There are grants, and they are generous, but I must be honest with you about the process: nobody gets an offer of a grant until a surveyor has been out and looked at the walls. The survey is free and takes about an hour.",
  "F|Now, smart thermostats. I am not against them at all. But I am asked about them constantly, and the honest answer is that a clever control system on a cold, leaky house saves you very little. Deal with the walls, then buy the thermostat. In that order it pays for itself; in the other order it doesn't.",
  "F|Solar panels. The reason so many have appeared on these roofs in the last few years is quite simply the price: the panels themselves now cost roughly a fifth of what they cost ten years ago. That fall is the whole story, and it is why we no longer argue about whether they are worth it.",
  "F|And finally heat pumps. They work, they work in this climate, and they work in old houses - I have one myself. But do go into it with your eyes open: a heat pump runs at a lower temperature than a gas boiler, so in most houses on these streets you will need bigger radiators fitted at the same time. Budget for that from the start and you will not be disappointed.",
  "F|Right. Forms at the back, the camera list is on the table by the door, and I will stay as long as anybody has questions.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two geography students, Doniyor and Zebo, discussing a long record of rainfall measurements. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Zebo, before we start on the analysis - when the tutor asks why we picked this project, what do we actually say?",
  "F|The truth. Not that Professor Iskandarov recommended it, because he didn't - he wanted us to do the river project. And not because the data were already digitised either; they weren't, and typing them up has been half our work. It was the notebook.",
  "M|The notebook. Found in a box in the university archive when they cleared out the old geography store.",
  "F|A hundred and twenty-two years of daily rainfall for one station in this town, in seven different handwritings. Nobody had opened it since 1998.",
  "M|That's the answer, then. Now, the early years. There are gaps, obviously - three weeks missing in 1911, a few days here and there.",
  "F|Those don't worry me. A gap you can flag and skip. And the units are consistent all the way through - inches until 1961 and millimetres afterwards, but it always says which at the top of the page. The real problem with the first forty years is that the gauge was not in the same place. It stood in the vicarage garden until 1934, and then it moved to the school field, three hundred metres away and eleven metres higher up.",
  "M|And a move like that puts a step in the record that looks exactly like a change in the climate.",
  "F|Exactly. That is the thing we have to correct for before we say anything at all.",
  "M|Agreed. There's something else bothering me about the daily totals, though.",
  "F|Snow.",
  "M|Snow. Go on.",
  "F|Well, for the whole of the early period the observer recorded snow as a depth - so many centimetres lying in the gauge - rather than melting it and measuring the water. And snow of a given depth can hold anything from a tenth to a third of that in water, depending on how cold it was when it fell.",
  "M|So every winter month in the first half of the record is uncertain.",
  "F|Uncertain, yes. Not useless. But we have to say so.",
  "M|Fine. Now, how do we test our corrections? I did wonder about the national gridded dataset.",
  "F|It only starts in 1961, so it can't help us with the move, which is the bit that matters. And I asked at the farm museum about private records - there is a farmer's diary, but he measured rainfall in buckets, more or less. No. The airport station is eight kilometres away and it has continuous data from 1948. We overlap with it for seventy years. That is our comparison.",
  "M|The airport it is. And the tutor - did you ask her how she wants the results presented?",
  "F|I did. She doesn't want a table of annual totals; she says nobody can read one and nobody ever does. And she was quite firm that maps are pointless when you have a single station.",
  "M|Which leaves the graph.",
  "F|A graph of ten-year running averages. That is exactly what she asked for, and I think she's right - it shows the shape.",
  "M|And the shape is the interesting part, isn't it? The total for the year has hardly moved in a hundred and twenty years. That surprised me, but it isn't the story.",
  "F|No. The story is that the rain arrives differently now. The number of days with more than twenty-five millimetres has gone up by about half since the nineteen twenties. The same water, in fewer and heavier days.",
  "M|That's the finding. That's what we lead with.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Right - jobs to do before Thursday's tutorial.",
  "M|I'll photograph the notebook pages. Oh - actually, no. The library has already scanned every one of them at high resolution and put them on the shared drive. So that's done.",
  "F|One less job. What about the water company? You wanted to write to them.",
  "M|I did, but I've looked into it - their records only go back to 1974 and they charge for access. Leave it.",
  "F|Agreed. And should we try to track down anybody who took the readings?",
  "M|I tried. The last surviving observer died in 2016. There's nobody left to ask.",
  "F|A pity. So, the two things I think we really must do are these. First, the old maps. We need to fix exactly where the gauge stood in the vicarage garden, and the 1901 town plan in the local studies room shows every outbuilding.",
  "M|Old maps, yes - that's essential for the site correction. I'll go on Tuesday morning.",
  "F|And second, a first version of the graph. Even a rough one, drawn by hand. She will ask for it, and if we turn up with a picture the whole conversation is different.",
  "M|Old maps and a first graph. Done. Now - the limitations section. There's a lot we could put in it.",
  "F|There is, but be careful. The site move and the snow both belong in the methods section, not the limitations - we are correcting for them, so they are not weaknesses any more.",
  "M|Fair enough. And the missing years aren't worth a paragraph - three weeks in 1911 is nothing.",
  "F|So what does go in? Two things, I think. One: the readings were taken by at least seven different people over the years, and every observer reads a gauge slightly differently. We cannot correct for that.",
  "M|True. Nobody can.",
  "F|And two - this is the big one - it is one gauge in one town. We cannot say anything about the region from a single location, and we must not pretend otherwise.",
  "M|Different observers, and only one site. Yes, those are the honest ones.",
  "F|Right. Tuesday for the maps, and I'll draft the graph tonight.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of the violin. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good afternoon. Last week we traced the harp. Today, the violin - an instrument that reached a kind of perfection within about sixty years of being invented, and has resisted improvement ever since.",
  "F|First, where the bow comes from. Plucked strings are ancient and worldwide, but drawing a bow across a string appears to be a Central Asian idea, and it travelled west along the trade routes, entering Europe through Byzantium and through Muslim Spain. By the eleventh century Europe had bowed instruments of its own, and the important medieval one - the ancestor every tutor mentions - is the fiddle, a flat-backed instrument held against the chest or the shoulder and played by professional musicians all over Europe for four hundred years.",
  "F|The violin proper appears in the workshops of northern Italy in the middle of the sixteenth century. Milan and Brescia both matter, but the city that matters most is Cremona, where Andrea Amati was working by about fifteen fifty. Amati settled the shape once and for all: four strings, the waisted body, the f-shaped soundholes, the arched top and back. And it was a commercial success almost immediately - one of his largest early orders, thirty-eight instruments in a single commission, came from the court of the king of France.",
  "F|A word about materials, because they are not arbitrary. The front, or belly, is spruce: light, stiff, and it carries sound very quickly along the grain. The back, the sides and the neck are maple, which is heavier and harder and reflects sound rather than absorbing it. That combination has not changed in four hundred and fifty years.",
  "F|Then there is the varnish, which has generated more argument than any other topic in the history of the instrument. For two centuries people have claimed that the Cremonese makers had a secret recipe, lost when the last of them died. Chemical analysis has now shown the ingredients to be perfectly ordinary oils and resins of the period. What the analysis cannot settle is how much the coating contributes to the sound at all.",
  "F|A second explanation for the greatness of those instruments looks at the wood rather than the coating. The seventeenth century was unusually cold in Europe - what climate historians call the Little Ice Age. Alpine trees growing through those decades grew very slowly, which produced unusually narrow rings and therefore denser, more even timber. Whether that is why Stradivari's instruments sound as they do is unproved, but the wood is measurably different from modern wood.",
  "F|Antonio Stradivari, by the way, worked in Cremona for seventy years and made perhaps eleven hundred instruments, of which around six hundred survive. His finest period is usually put between seventeen hundred and seventeen twenty.",
  "F|Now, a point that students often miss: almost every old Italian violin you hear today has been rebuilt. Between about seventeen eighty and eighteen thirty, as concert halls grew larger and orchestras louder, players wanted more volume. So the neck was lengthened and tilted back, which raised the tension on the strings considerably; the fingerboard was extended; the bar inside the belly was made heavier. A Stradivari violin in its original state would sound quiet and sweet, and no modern audience has ever heard one.",
  "F|Two accessories completed the modern instrument. Around eighteen twenty the composer Louis Spohr introduced the chin rest, which freed the player's left hand from the job of holding the instrument up and made the highest positions practical. And the bow was redesigned by Francois Tourte in Paris in the seventeen eighties: he used a dense Brazilian wood, and he gave the stick an inward curve, so that the pressure stays even from one end of the stroke to the other.",
  "F|Finally, the violin became cheap. Through the nineteenth century the workshops of Mirecourt in France and Markneukirchen in Germany turned out instruments in tens of thousands, using division of labour, and the price fell far enough for ordinary schoolchildren to own one. That is the reason the violin is now the standard folk instrument from Ireland to India.",
  "F|Next week: what happened when the instrument met the recording microphone.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset19-s1.wav" $s1
Render "pset19-s2.wav" $s2
Render "pset19-s3.wav" $s3
Render "pset19-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
