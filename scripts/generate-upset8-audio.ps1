# Generates the four Upper-Inter Set 8 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a man phoning an airport parking company to book a space for his car while he is away on a long trip. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good morning, Ashford Airport Parking, Katie speaking. How can I help?",
  "M|Oh, hello. I'm flying out of Ashford at the end of next month, and I'd like to book long-stay parking for the whole trip, please.",
  "F|Of course, we can do all of that over the phone. Let me open a booking form. Could I take your full name first?",
  "M|Yes, it's Rustam Mirzaev.",
  "F|Could you spell the surname for me?",
  "M|Certainly. It's M, I, R, Z, A, E, V. Mirzaev.",
  "F|M, I, R, Z, A, E, V. Lovely, thank you. And the vehicle you'll be leaving with us - what do you drive?",
  "M|It's a Toyota - the estate model, so it's quite a long car, if that matters.",
  "F|Not at all, the spaces are a generous size. And the colour?",
  "M|Silver.",
  "F|A silver Toyota estate, noted. Now, when would you like to drop the car off?",
  "M|We fly on the twenty-second of October - oh, hang on, no. I'm mixing that up with my brother's wedding. Our flight is on the twenty-fourth. Sorry about that.",
  "F|No problem at all - the twenty-fourth of October. Morning or afternoon?",
  "M|Early morning. The flight leaves at a quarter past nine, so I'd want to drop the car off at about six.",
  "F|That's fine, the site is staffed day and night. And how long will you be away?",
  "M|Sixteen days... actually, make that seventeen. We land very late on the final evening, so I won't collect the car until the following morning.",
  "F|Seventeen days, very wise - the extra day costs almost nothing. Now, which car park... For those dates our East car park is completely full, I'm afraid - it's half term, you see. But there's plenty of space in the Meadow car park.",
  "M|The Meadow car park. Is that far from the terminal?",
  "F|A little further out, but the shuttle bus runs every twelve minutes, day and night, and the journey to the terminal only takes eight minutes.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "M|That sounds easy enough. So what will seventeen days cost me?",
  "F|If you paid at the gate it would be a hundred and ten pounds, but as you're booking in advance you get the online price, which is ninety-four pounds - and that includes the booking fee, so there's nothing on top.",
  "M|Ninety-four, lovely. Do I pay now?",
  "F|Yes, we take the full amount at the time of booking, by card.",
  "M|Fine. Are there any extras I should know about?",
  "F|Well, while the car is with us, a lot of customers have it cleaned, so it's ready when they land. A wash is twenty-five pounds, and the full valet, inside and out, is forty.",
  "M|The valet's a bit much, but yes, let's have a wash - coming home to a clean car would be a treat.",
  "F|A wash it is. And just so you know, the site is fully fenced, there's CCTV on every row, and there are patrols right through the night, so the car will be in safe hands.",
  "M|Good to hear. Now, how do I actually find you on the day?",
  "F|You'll be coming down the motorway, yes? Normally we tell drivers to leave at junction nine, but the slip road there is closed for roadworks all autumn, so leave at junction eight instead, and then just follow the airport signs - we're signposted from the roundabout.",
  "M|Junction eight, follow the signs. And will I get some sort of confirmation?",
  "F|Yes. We'd normally email it, but our email system is being replaced this week, so I'll send your booking reference by text instead - it usually arrives within the hour. Nothing comes in the post these days, I'm afraid.",
  "M|A text is perfect. Thank you so much, you've been really helpful.",
  "F|You're very welcome, Mr Mirzaev. Have a wonderful trip.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a volunteer from a mountain rescue team talking to visitors at the team's open day. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome to Hollowdale Mountain Rescue. I'm Carol, one of the volunteers, and I'll be showing you round the base this morning. Before we set off, let me tell you a little about who we are.",
  "F|People always ask how somebody ends up doing this. In my case, my brother-in-law had been on the team for years and kept inviting me to open days just like this one, and I'd also seen the team in a television documentary. But what actually brought me in was rather less comfortable. Eight years ago I slipped on wet rock up on Crag Fell and broke my ankle, and it was this team that found me and carried me down in the dark. I applied to join a month after the plaster came off.",
  "F|Now, if any of you are thinking of volunteering, let me be honest about the training. People imagine a couple of weekend courses and then straight out on rescues. In fact it takes a good eighteen months before a new member can go out on a call, and that surprises almost everybody. Yes, there's first aid in there, but that's only one part of it - most of your time is spent out on the hill, practising ropework and navigation in genuinely horrible weather.",
  "F|And what do we actually get called out for? Everyone imagines climbers falling from the crags, and sadly that does happen, but it's rare - a handful of times a year. Flooding gives us the odd busy weekend too. But the great majority of our call-outs are walkers who have lost their way - usually late in the day, and often with a phone battery that died an hour earlier.",
  "F|One more thing before we walk round, because it always surprises people: the money. We receive no regular government funding at all - not a penny. Local companies are very good to us - the garage services our vehicles at cost, and the outdoor shop in town gives us discounts on kit - but nearly all of our running costs are covered by donations from the public: collecting tins, sponsored walks, and gifts people leave us in their wills, which brings me to the tour.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|So, let me tell you what you'll see as we go round, starting with the control room, just behind me. This is where every rescue is coordinated, and it was completely refitted only last month - new screens and brand-new mapping software - so you're seeing it at its best. Do peer in, but please don't touch the desks.",
  "F|Out in the yard is our response vehicle, the big red one everybody photographs. A vehicle like that costs more than this building, and we could never have raised the money ourselves. It was paid for by a single legacy: a walker who loved these hills all her life left the team a gift in her will, and the vehicle carries her initials on the door.",
  "F|Next to it you'll find the drone team. The drone has transformed the way we search - it covers a hillside in minutes. I'm sorry to say we cannot fly it for you today, because the wind is well above the safety limit, but the operators will happily talk you through the cameras and show you the footage from last month's search.",
  "F|Inside the equipment store, do have a look at the folding stretcher. It was designed by one of our own volunteers - he's an engineer in his day job - and teams right across the country now carry versions of it. He's here today, and he's very happy to be asked about it.",
  "F|Then there are the search dogs, who are of course everybody's favourites. Be patient with them this morning, they're working. But at two o'clock the dogs and their handlers will give a full demonstration on the field, finding a volunteer we've hidden somewhere - the children usually enjoy that more than anything.",
  "F|And finally the radio room, at the end of the corridor. It doesn't look like much, I admit, but the main set in there has been in service for over thirty years - it is the oldest equipment we still use, and it has outlasted three of its fancy modern replacements.",
  "F|Right - follow me, stay behind the ropes in the yard, and ask as many questions as you like.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two media students, Jasur and Madina, discussing the audience figures for their podcast. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Right, Madina, I've printed out the download figures for all ten episodes. If we're presenting this analysis on Friday, we need to agree what the numbers actually mean.",
  "F|Then let's start at the beginning, Jasur. Episode one - ninety-two listeners. Our worst ever.",
  "M|I always blamed the sound quality. That echo from the seminar room was embarrassing.",
  "F|But episode two sounded exactly the same, and it got three times the audience. So the sound can't be the real reason.",
  "M|Fair point. We also put it out on a Friday evening, which everyone says is the worst possible moment.",
  "F|Maybe, but look at the graph. We let it run to fifty-five minutes, and half the audience had gone by minute twenty. Honestly, it was far too long, and I think we both know that was the real problem.",
  "M|Agreed - put that in the report. Now, the audience data. Anything jump out at you?",
  "F|One thing genuinely amazed me. I'd always assumed our listeners would be students on this campus. But the location report shows nearly a third are listening from abroad - Germany, Canada, Japan of all places.",
  "M|More surprising than the age figures? The average listener is twenty-nine.",
  "F|That's older than I'd guessed, but only slightly - and we already knew most people don't reach the end of an episode. No, it's the overseas listeners that really surprised me.",
  "M|Noted. Now, episode four. The interview. I need to own up about that one in the report.",
  "F|The cafe was noisy, to be fair to you.",
  "M|Actually no - we moved to the library annexe, remember, it was quiet as a church. And we promoted it exactly like every other episode. The real problem was me: I edited the whole thing in a rush, the night before we published. There's a nine-second silence in the middle where I meant to make a cut.",
  "F|Well, admitting it is the honest thing to do. Then there's the opposite mystery - episode six. Four times our usual downloads in one week.",
  "M|My first thought was the new cover artwork.",
  "F|But we changed the artwork two episodes earlier, so that doesn't fit. And the topic was nothing special.",
  "M|No. What fits is the date. That travel blogger - the one with two hundred thousand subscribers - put a link to us in her newsletter on the Tuesday, and the spike begins that same afternoon.",
  "F|One mention, four times the audience. That's worth a paragraph on its own.",
  "M|Definitely. What about your survey? Anything useful?",
  "F|Over a hundred people filled it in, which is plenty, and the questions seemed to work - nobody misread them as far as I can tell. What bothers me is this: in the survey, people insist they love long, detailed episodes. But the platform shows most of them switching off before half way. What people say and what they actually do are two different things.",
  "M|That contradiction might be our most interesting finding. Which reminds me - I showed the draft to Dr Whitmore yesterday.",
  "F|And? Did she want more charts? She always wants more charts.",
  "M|That's the strange thing - she said we already have plenty of charts. And she told me not to bother comparing the different platforms; she called it a distraction. Her advice was to pick the single most interesting trend and explain it properly - cause, evidence, conclusion - instead of skating over ten things at once.",
  "F|One trend, examined properly. All right, that's our structure.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, decisions. What do we actually change for next term?",
  "M|First, a regular day. Every Tuesday, without fail. The figures show our regulars come back weekly, and at the moment we publish whenever the editing happens to be finished.",
  "F|Agreed - that's decision one. And after everything we said about episode one, the length has to come down. Twenty-five minutes, maximum.",
  "M|Decision two, then. Should we invite more guests? People did like the interviews.",
  "F|After the episode four experience? Booking guests took us weeks. Let's not - at least for now.",
  "M|Fine. And I asked about the university studio - it's block-booked by the film course all term, so that's not happening either.",
  "F|Someone also suggested a question-and-answer section, reading out listeners' messages on air.",
  "M|Nice idea for next year, but it only works once the audience is bigger. Right - promotion. The station manager has offered us a ten-minute interview on student radio this Thursday.",
  "F|Take it. Radio listeners are exactly our audience.",
  "M|Booked, then. I also wondered about making a video trailer.",
  "F|With whose editing skills? Neither of us can cut video, and it would swallow a whole week.",
  "M|True. Posters around campus?",
  "F|The union charges for the noticeboards now - twenty pounds a week. Not on our budget.",
  "M|Then the last idea: the competition. A book token for the best listener question, and we read the winner out on air.",
  "F|Yes, let's run the competition - it costs almost nothing and it gives people a reason to write in.",
  "M|So: the radio interview and the competition. And I'll email all our old guests tonight as well.",
  "F|We emailed them last month, Jasur. Twice in six weeks looks desperate.",
  "M|You're right, forget that. Friday it is, then. I'll bring the printouts.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of tunnels. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good afternoon. Today I want to talk about a kind of structure we hardly notice until we are inside one: the tunnel. Bridges get the photographs; tunnels get forgotten. Yet people have been digging through the earth for at least five thousand years, and how they did it is, in miniature, the story of engineering itself.",
  "F|Let us start at the very beginning. Some of the earliest tunnels we know of were mines. At several sites in northern Europe, prehistoric people sank pits deep into the chalk and then opened narrow galleries out sideways, working by the light of small lamps with picks made of antler, to reach flint - the hard stone they needed for their axes and knives. Crawling through those galleries today, archaeologists still find the miners' tools lying exactly where they were dropped.",
  "F|In ancient Persia, tunnelling answered a different need: thirst. Engineers dug long underground channels, sloping so gently that the flow never raced and never stalled, and these channels carried water from the base of the hills out to farmland on the desert plain. Because the channel ran below the surface, hardly any of that water was lost to the sun. And here is the remarkable thing: many of these channels are still working after more than two thousand years. There are villages today whose drinking water arrives through a tunnel dug before the Roman Empire existed.",
  "F|The Romans themselves drove tunnels for roads and, above all, for their aqueducts, and their method was patient and precise. Digging from both ends at once, they checked their line by digging vertical shafts down from the surface at regular intervals. From each shaft they could take measurements, correct the direction of the digging, and haul out the broken rock.",
  "F|Jump forward now to the seventeen hundreds, and to Britain's canals. A canal cannot climb a hill, so the canal companies cut tunnels straight through them, some more than a mile long, dug by hand. Most canal tunnels had no path for the horses that pulled the boats, so the horse was unharnessed and led over the top. And the boat? Inside the tunnel, boats were moved by men lying on the deck and pushing with their legs against the walls, step by step in the dark - a slow, exhausting technique known as legging.",
  "F|The nineteenth century then took on the problem that had defeated everyone: soft ground under water. The answer came with the Thames Tunnel in London, begun in 1825 - the first tunnel ever built under a major river. The engineer, Marc Brunel, protected his workers with an iron shield, a great frame of cells that was pushed forward inch by inch while bricklayers sealed the tunnel behind it. Brunel said he had copied the idea from a worm that bores through ships' timbers, lining its hole as it goes. Even with the shield, the river broke in more than once, and work was stopped several times by flooding - on one occasion for seven whole years. When the tunnel finally opened in 1843, it opened not to traffic but as a tourist attraction: visitors paid a penny each to walk beneath the river. Later it was sold to a railway company, and trains still run through Brunel's tunnel today.",
  "F|It was the railways, in fact, that drove tunnelling harder than anything before. To cross the Alps in the eighteen hundreds, engineers faced kilometres of solid rock, far beyond what hand labour could manage. The breakthrough was drills powered by compressed air, which could bite into the rock face many times faster than any man with a hammer. Progress remained brutal all the same: deep inside the mountain, workers suffered from heat and dust, and the great Alpine tunnels cost many lives.",
  "F|Today the work belongs to machines. A modern tunnel boring machine is a moving factory: at the front, a rotating head studded with steel discs grinds away the rock, while further back the same machine fits the concrete lining behind itself, ring by ring, so that it leaves a finished tube as it goes. Some machines are more than one hundred metres long, with crews who eat and rest on board without coming to the surface. It was machines like these that created the world's longest rail tunnel, which runs for fifty-seven kilometres beneath the Swiss Alps.",
  "F|And tomorrow? Two directions seem clear. First, cities have realised that space at street level is far too valuable to waste, so they are moving power lines and other cables underground, along with railways and even rivers. Second, engineers are studying an idea that sounds like science fiction but is already being tested: sending goods between cities through narrow tunnels, in small automatic wagons, taking thousands of lorries off the roads above. If that happens, the oldest engineering trick we have - digging a hole and following it - may turn out to be one of the newest.",
  "M|That is the end of part four. You now have some time to check your answers.",
  "P|5"
)

Render "upset8-s1.wav" $s1
Render "upset8-s2.wav" $s2
Render "upset8-s3.wav" $s3
Render "upset8-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
