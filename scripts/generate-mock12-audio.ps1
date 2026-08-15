# Generates the four Mock Test 12 listening recordings with Windows TTS.
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
    "M|You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and answer the questions. All the recordings will be played once only. The test is in four parts. Now turn to part one.",
    "P|3",
  "M|Part one. You will hear a man phoning a removals company to ask for a quote for moving house. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good morning, Greenway Removals. How can I help you?",
  "M|Good morning. We're moving house next month and I'd like a quote, please.",
  "F|Of course. Can I take your name first?",
  "M|Yes, it's Anvar Rakhimov.",
  "F|Could you spell the surname for me?",
  "M|Certainly. R - A - K - H - I - M - O - V. Rakhimov.",
  "F|Thank you, Mr Rakhimov. And where are you moving from?",
  "M|It's a flat at fourteen Willow Street. Willow, like the tree - W - I - L - L - O - W.",
  "F|Fourteen Willow Street. Is there a lift in the building?",
  "M|That's the difficulty, I'm afraid. We're on the third floor and there's no lift at all. Everything has to come down the stairs.",
  "F|I'll note that - third floor, no lift. And where are you moving to?",
  "M|To a house in the Parkfield district, on the other side of the river.",
  "F|Parkfield, lovely. And which date did you have in mind?",
  "M|We were hoping for Thursday the second of October.",
  "F|Let me look... ah, I'm sorry. That whole week is fully booked - everybody moves at the end of the month. I could offer you the Thursday after, the ninth of October.",
  "M|Thursday the ninth. Yes, that still works for us.",
  "F|Wonderful. Now, boxes. How big is the flat?",
  "M|Two bedrooms. A friend said thirty boxes would be plenty, but we have an awful lot of books.",
  "F|With books I'd say more. For a two-bedroom flat we deliver about forty-five, and you only pay for the ones you use - anything you don't open, we take back.",
  "M|Forty-five delivered, and I pay for what we use. That seems fair.",
  "F|Is there anything unusually large or heavy?",
  "M|There is. We have a piano. It's an upright, not a grand, but it's still terribly heavy.",
  "F|A piano, down three flights. That means two extra staff on the day - we won't attempt it with the standard crew.",
  "M|Two extra men for the piano. I understand.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|So what is all this going to cost?",
  "F|For a move of that size on a weekday, the price is eight hundred thousand som, and the fuel is included - no extra charge for the distance. Had you wanted the Saturday, it would have been nine hundred and fifty thousand.",
  "M|Eight hundred thousand on a weekday. We'll stay with the Thursday, then.",
  "F|Sensible. And there's no deposit to pay - some firms ask for one, we never have. You simply pay the crew on the day, cash or card.",
  "M|No deposit at all. Good. What about insurance - is everything covered?",
  "F|Everything in the boxes is covered, and the furniture as well. Mirrors and glassware are fine too, as long as our team packs them. The only thing we cannot insure is plants - they get knocked about so easily in a van that we've stopped trying.",
  "M|So plants aren't covered. I'll carry those in my own car.",
  "F|Do that. Now, we give you the boxes free, and protective blankets as well - those go round the furniture and the piano. The one thing you buy yourself is the tape.",
  "M|Boxes and blankets from you, tape from me. And what time would the crew arrive?",
  "F|The van leaves the depot at eight, so they'll be with you at half past eight in the morning. And they'll phone you thirty minutes before they arrive, so you get a little warning.",
  "M|Half past eight, with a call half an hour before. Is there anything you need from me?",
  "F|One thing, and please don't forget it. Could you send us some photos of the staircase? With a piano coming down, the team likes to see the corners in advance.",
  "M|Photos of the staircase. I'll take them this evening and email them across.",
  "F|Thank you, Mr Rakhimov. I'll put the ninth of October in the diary.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a member of staff welcoming visitors to the Harbourside Aquarium. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning everyone, and welcome to the Harbourside Aquarium. Before I let you through, a little about the place and about today.",
  "F|People always ask about this building. Standing here on the old docks, most visitors guess it was the city's fish market. There was one, but it stood two streets away and was pulled down years ago. Others assume this was the ferry terminal. The ferries did leave from the quay outside, though from a wooden shed, not from here. In fact this brick hall was a power station, generating electricity for the whole harbour for sixty years. When it closed, the tanks went in where the machinery had stood.",
  "F|Now, what is new this year? Many of you have come for the touch pool, where children stroke the rays - that has been here since the day we opened. The underwater tunnel is what people ask about most, and I must disappoint you: it is drawn and designed, but it will not be built for another two years. What is genuinely new, from this month, is that we stay open on Friday evenings until nine o'clock. The tanks are lit quite differently after dark, and that is the best time to see them.",
  "F|Two requests before you set off. You may walk round in any order - there is no fixed route, whatever the arrows on the floor suggest. And you may keep your bags; the lockers are there if you want one, but nobody will make you use them. The single rule I do ask you to keep is this: please switch off the flash on your cameras and phones. Photograph as much as you wish, but a flash frightens the fish, and in one or two tanks it genuinely harms them.",
  "F|People often ask how they can support us, because we are a charity and receive nothing from the city. The gift shop by the exit helps, of course, and every purchase is welcome. Membership is good value if you live locally, and lets you come as often as you like. But what really keeps this place alive is our adoption scheme. For a small sum each month you adopt one of our animals - a turtle, a penguin, whichever you fall in love with - and that steady, year-round income pays for the food and the veterinary care. Adopting an animal is far and away the most useful thing you can do for us.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right. Let me take you through the six areas you'll be seeing today.",
  "F|We begin with the Coral Reef Hall, straight ahead of you. It was paid for by a university research grant, and the architecture is nothing to write home about. But every year, when we ask visitors what they enjoyed most, the Coral Reef Hall comes top of the list - more people choose it than choose all the other areas put together.",
  "F|Next to it is the jellyfish gallery. Do give your eyes a moment when you walk in, because we keep the lighting very low in there. Jellyfish show up best against a black background, and strong light distresses them. Visitors sometimes think we are saving electricity. We are not.",
  "F|Then comes the seahorse nursery, and there is real excitement in there this week. A batch of young seahorses hatched on Sunday morning, and if you look at the small tank on the left you'll see them, each no bigger than your fingernail.",
  "F|Upstairs you'll find the otter enclosure. Do come back at eleven o'clock or at three if you can. Between meals the otters sleep in a heap and there is very little to look at, but at feeding time they are quite wonderful, and a keeper talks you through what they're doing.",
  "F|The penguin pool is next, and it is the one part of the aquarium I'm a little embarrassed about. The colony has grown faster than we expected and the pool is now simply too small. Work begins in the spring to double it, so if you come back next summer you will find it twice the size it is today.",
  "F|And finally the turtle rescue centre, where we look after turtles injured out at sea. I'm sorry to say you won't get in there today - or rather, not this morning. The vet is operating and the doors stay shut until one o'clock. Do come back this afternoon.",
  "F|Right. Tickets scanned, and off you go.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two students, Timur and Zarina, planning a questionnaire about tourism in their city. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Zarina, the form asks us to say how we chose the topic. Shall I put down Doctor Karimova's lecture on the tourist economy? We were both at that one.",
  "F|We were, but that isn't where it came from, Timur. It was that piece in the city newspaper - the figures showing visitor numbers had doubled in three years. I read it on the bus and thought, nobody has actually asked those people anything.",
  "M|True. And tourism wasn't on the tutor's list at all - we had it approved separately, remember. Fine, the newspaper report goes on the form.",
  "F|Now, our first draft. I read it again last night, and we have to be honest about it.",
  "M|There are only twelve questions, so I don't think length is the problem.",
  "F|No, twelve is about right. And nothing in it is intrusive - we never ask anyone's income or age. The trouble is that the questions don't mean anything precise. Did you enjoy your visit? What did you think of the city? You could answer those in a hundred ways, and we'd learn nothing we could count.",
  "M|Guilty. They're far too vague, that's the word. Every question must be sharp enough that two people understand it the same way.",
  "F|Which brings us to the open questions. There are five of them at the moment.",
  "M|Part of me wants to cut every one and keep it all to tick boxes. Much quicker to analyse.",
  "F|Too severe. The best thing in the pilot came out of an open question - somebody wrote three sentences about the lack of signposting, and no tick box would have found that. But five is too many, and at the beginning they make people give up before the numbers.",
  "M|So we keep one open question, right at the very end, after everything else. Something like, is there anything else you'd like to tell us.",
  "F|Exactly. One, and last.",
  "M|Now, the interviewing. I still like the railway station - hundreds of people arriving all day.",
  "F|Permission wouldn't be the problem; my cousin works there and says they're used to student surveys. It isn't the noise either - there are quiet corners. My worry is different. Everybody at the station arrived by train. We'd miss the ones who drive in, the coach parties, the people who fly - and we'd describe a single kind of visitor and call it the whole picture.",
  "M|Fair enough. It skews the sample before we even start.",
  "F|And before anything goes out, we must test the wording on somebody.",
  "M|My family would do it. My brother would be brutal, which is what you want.",
  "F|They would, but they know the city too well - they'd read our meaning into a bad question instead of tripping over it. And the hostel guests are the people we're studying; I won't waste real visitors on a rough draft. Let's use our own group - twenty of them in Wednesday's seminar, ten minutes at the end. They've all designed questionnaires themselves.",
  "M|Our classmates, then. And the proposal itself - what does she insist on?",
  "F|I asked her after the seminar. She wasn't worried about a timetable - we'd learn the timing by doing it. And there's nothing to spend money on, so no budget. But she was firm on one point: the proposal must include some of the actual questions, written out word for word. She can't judge a questionnaire from a description of it.",
  "M|Sample questions in the proposal. Understood.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, which visitors do we interview? We can't do all of them.",
  "M|Business travellers first, surely. The hotels are full of them.",
  "F|Full of them, and every one in a hurry. I tried last summer; they won't stop. And local residents aren't visitors at all - interesting, but a different study.",
  "M|All right. Tour groups, then? They're easy to find at the monuments.",
  "F|Easy, but the guide answers for everybody and you get one opinion repeated fifteen times. I'd far rather have the people who come for the day from the towns round about - Chirchik, Angren. Nobody counts them and they're a huge part of the numbers.",
  "M|Day-trippers from nearby. Yes, a genuine gap. And I'd put the foreign backpackers alongside them. They stay longest, see the most, and will happily talk to you for half an hour.",
  "F|The backpackers and the day-trippers, then. Two very different groups, which is what we want.",
  "M|And how do we actually get the questionnaire to people?",
  "F|Standing in the main square with a clipboard is the traditional answer.",
  "M|In August? We'd melt. And people crossing a square are going somewhere - they don't stop.",
  "F|Agreed, cross it off. What about putting it on the university website?",
  "M|Nobody visiting the city is going to look at our website. That's for us, not for them. The museums might work, though - a pile of forms on the desk.",
  "F|The museums said no last year - they won't have paper on the desks any more. But the tourist information office on Market Street is happy to take them; the manager will keep a stack beside the map stand. Everybody who's lost walks in there.",
  "M|The information office, then. And the second one?",
  "F|Email, through the hotels. Three have agreed to send our link to guests after they check out. It reaches people who really did stay here, and they answer at home when they've time.",
  "M|Emails through the hotels, and forms at the information office. That's our two.",
  "F|Then we can start writing the proposal.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about pearls. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. Today we're looking at the only gemstone made by a living animal: the pearl.",
  "M|Pearls are produced by molluscs - oysters above all, but mussels too, in the sea and in fresh water. The process begins when something gets inside the shell that has no business being there. Now, almost everybody here was taught that this something is a grain of sand. It is a charming story, and it is false. Sand washes in and out of a shell all day and the animal ignores it. What actually starts a natural pearl, in the great majority of cases, is a parasite - a small worm that bores through the shell and lodges in the soft tissue.",
  "M|The mollusc cannot remove the intruder, so it seals it away. It coats the object, layer upon layer, with the substance that lines its own shell. That substance is nacre - N, A, C, R, E - the material we also call mother-of-pearl. A single pearl may carry many thousands of these layers, each one astonishingly thin.",
  "M|That layering explains the pearl's most famous quality. Light does not simply bounce off the outside; it passes into the upper layers and is reflected back from different depths, so the returning rays interfere with one another. The result is that deep, shifting glow we call the lustre, which no painted bead has ever imitated.",
  "M|One further point before we leave nature. The nacre follows the shape of whatever it covers, and parasites are not round. Natural pearls are usually lumpy, pear-shaped or plainly irregular; a perfectly round natural pearl is extraordinarily rare, which explains the prices I am about to mention.",
  "M|Now, history. Pearls are among the very oldest gems used by human beings, for a simple reason. A diamond in the ground looks like a dull pebble; it must be cut and polished before anyone would wear it. A pearl comes out of the shell finished - no cutting, no polishing, nothing to be done to it at all.",
  "M|In ancient Rome, pearls carried a particular meaning. They were admired, certainly, but above all they were worn as a display of wealth. To appear at dinner in pearls announced, without a word, how rich your family was - and at times the authorities passed laws restricting who could wear them.",
  "M|Obtaining them was another matter. Until a century ago every pearl was collected by divers, who went down by hand with no equipment at all, on a single held breath - forty seconds, a minute - again and again through the day. It was frequently fatal; men died of drowning, of lung damage, of sharks. And thousands of shells might be opened before a single pearl was found.",
  "M|Which brings us to the change that transformed the business. The idea of persuading a mollusc to produce a pearl on demand is an old one, but the method that worked was perfected in Japan, at around nineteen hundred, by a man called Kokichi Mikimoto, the son of a noodle seller.",
  "M|The technique is deceptively simple. A trained worker opens the shell a few millimetres and inserts two things: a small bead, usually cut and rounded from freshwater shell, and a piece of tissue taken from another mollusc. Then nothing further is done. The animal treats that bead exactly as it would treat a parasite, and coats it, layer after layer, with nacre.",
  "M|It is not quick. The mollusc goes back into the water in a net, and a pearl of a size worth selling takes roughly two years to build up enough nacre. But the effect on supply was total: virtually every pearl sold anywhere in the world today has come from a farm.",
  "M|So how do you tell the two apart? From the outside, you cannot: the surface of a cultured pearl is nacre and so is the surface of a natural one, and no jeweller's eye can separate them. The answer is to look inside, and for that a laboratory takes an X-ray. On the film the cultured pearl shows a solid round bead at its centre, while the natural one shows nothing but those onion-like layers going all the way down.",
  "M|Once identified, a pearl is judged on four qualities: its size, its shape, its colour and the condition of its surface - and the fewer the marks, the higher the price.",
  "M|Finally, the industry today. Pearl farming is a fragile business, because molluscs are demanding tenants. Above all they need exceptionally clean water. These animals filter the sea for their food, so whatever is in it passes through them, and pollution a fish would shrug off will kill an oyster bed outright. That is why the farms sit in remote bays.",
  "M|The greater threat now is temperature. The seas are warming, and warm water stresses the molluscs, encourages disease and, in a bad year, kills an entire harvest. Several traditional farming regions already produce less than they did.",
  "M|And I'll close from an unexpected direction. Nacre is chemically mostly chalk - a soft, feeble mineral - and yet it is some three thousand times tougher than chalk, purely because of the way those layers are stacked and glued. Materials engineers have taken note. By copying that layered architecture they are designing far tougher glass, for windscreens, for phone screens, for aircraft windows.",
  "M|That is the end of part four. You now have some time to check your answers.",
  "P|5"
)

Render "mock12-s1.wav" $s1
Render "mock12-s2.wav" $s2
Render "mock12-s3.wav" $s3
Render "mock12-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
