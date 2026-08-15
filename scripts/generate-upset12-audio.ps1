# Generates the four Upper-Inter Set 12 listening recordings with Windows TTS.
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
    "M|You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and answer the questions. All the recordings will be played once only. The test is in four parts. Now turn to part one.",
    "P|3",
  "M|Part one. You will hear a businessman telephoning a language agency about hiring an interpreter for a business meeting. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good morning, Bridgeway Language Services.",
  "M|Good morning. I need to hire an interpreter for a business meeting next month.",
  "F|Certainly. We are open Monday to Saturday, nine a.m. to six p.m., so there is plenty of time to sort out the details. Could I start with your name?",
  "M|Yes, of course. It is Rustam Mirzaev.",
  "F|And how do you spell the surname? I would rather not guess.",
  "M|M, I, R, Z, A, E, V. Mirzaev.",
  "F|M, I, R, Z, A, E, V. Thank you. And which company are you calling from?",
  "M|We export textiles to Europe, mainly cotton fabric for clothing manufacturers.",
  "F|Textiles, right. Now, the important question: which language do you need?",
  "M|That is slightly complicated, actually. The group we are dealing with has its head office in Berlin, so when we started I assumed we would need German. But the people flying out to see us are all from the factory in Milan, and they have asked to work in their own language. So it will have to be Italian.",
  "F|Italian, noted. And what sort of meeting is it? That matters, because our interpreters specialise.",
  "M|Two halves. We will be discussing the contract in the morning, and taking them round the factory in the afternoon, so she needs technical vocabulary as well as the legal side.",
  "F|Understood. And which date were you thinking of?",
  "M|We were hoping for the sixteenth of October.",
  "F|Let me look at the diary. Ah - I am sorry, our Italian interpreter is at a conference on the sixteenth, and she is our only one. She is free on Friday the eighteenth, though. Would that work?",
  "M|The eighteenth... yes. Actually that suits us better, because our director is travelling that first week. Let us say the eighteenth.",
  "F|The eighteenth of October. And how many visitors will there be?",
  "M|Three of them are coming - two engineers and a buyer.",
  "F|Three, thank you. And what time does the meeting begin?",
  "M|Their flight lands at eight, so there is time to get into the city. The meeting starts at half past nine, and we would expect the contract discussion to run until about one.",
  "F|Nine thirty, then. I will put her down for the whole day.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "M|Can I ask about the cost? I have no idea what this sort of thing comes to.",
  "F|Our standard rate is three hundred thousand som per hour, with a minimum of two hours. But for a meeting plus a factory visit you would be better with the full-day rate, which is two million som and works out considerably cheaper.",
  "M|The full day, then. Is there anything to pay now?",
  "F|Yes - we ask for a deposit of twenty per cent when you book, and the rest afterwards.",
  "M|Twenty per cent, fine. Does she need anything from us in advance?",
  "F|Two things. First, send us the programme, because she will translate the agenda beforehand, so that both sides are reading the same document when they sit down.",
  "F|And second - this is the one people forget - please send us a list of technical terms your industry uses. Fabric names, machine parts, anything unusual. An hour of preparation saves a great deal of confusion in the room.",
  "M|A list of terms. I will ask our production manager to put one together.",
  "F|Perfect. Now, where should she meet the visitors? At your office?",
  "M|I was going to say the hotel, but they will not have checked in by then.",
  "F|In that case she should meet them at the airport and travel in with them. It is much better - they can ask her small questions in the car, and everyone arrives having already spoken to her.",
  "M|At the airport, then. And how do we pay? Can I bring cash on the day?",
  "F|We stopped taking cash a few years ago, I am afraid. Payment is by bank transfer within five days of the invoice, and the invoice goes out the morning after the meeting.",
  "M|Bank transfer, no problem. One last thing - what if the visit is postponed? These things happen.",
  "F|Then just let us know. Cancellation is free of charge up to forty-eight hours in advance. After that we have to charge for the day, because she will have turned other work down.",
  "M|That is very reasonable. Thank you for your help.",
  "F|My pleasure. I will send the confirmation within the hour.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear an archivist talking to visitors on the open day of the city archives. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome to the city archives. I have worked here for eleven years, and open day is my favourite day of the year, because for once the building is full of people who did not come to look up a will.",
  "F|Let me begin with the building itself, since visitors always ask why the archives are out here rather than in the centre. We were housed in the town hall for eighty years, and I will admit we had outgrown the rooms - we were stacking boxes in corridors by the end. But we managed, and we would probably have stayed if it were not for one night in February, when a burst main flooded the basement. We lost some very fine nineteenth-century ledgers, and within a year we had moved here. And no, before anyone asks, the town hall was not sold; it is still there, doing what it always did.",
  "F|Now, what surprises visitors most about this place? People expect me to say the age of the documents - and we do have items from the fifteenth century - or the speed of the service, which honestly depends on how far into the store the box has been put. But no. The thing that astonishes people is the money, or rather the absence of it. Anyone at all may walk in, order up original documents, and read them all day, and there is no charge whatsoever. Not a membership, not a daily fee, nothing. These are public records, and they belong to you.",
  "F|There is one formality, though, and I would hate anyone to be turned away tomorrow. Before you can use the reading room for the first time, you must show us proof of identity - a passport or a driving licence - and we make you a reader's card, which takes about four minutes. You do not need to book a desk, whatever the internet says, and the lockers are there if you want them but nobody insists. Just bring that document.",
  "F|And a word about what is coming, because this year is a big one for us. The roof, I am glad to say, is finished - that was last summer, and it took most of our reserves. There is a rumour going round that we are buying a large private photograph collection, and I would love that to be true, but it is not, at least not this year. What we are actually doing, and what the grant is paying for, is putting the whole newspaper collection on the internet, page by page, going back to 1841.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Right - let me take you through the different parts of the archive, in the order you will see them on the tour.",
  "F|We start with the photograph collection, which is the one everybody wants to see. People assume it came to us from one great family, and it did not: there are pictures here from several hundred different donors, some of them handed in at the front desk in a carrier bag. It is currently being sorted and catalogued by a wonderful team of volunteers, who come in every Tuesday and have so far worked through about a third of it.",
  "F|Next door is the map room. Now, if you asked me what the archive's greatest treasure is, I would take you in there and show you a hand-drawn plan of the city made in 1584 - which is, by a comfortable margin, the oldest item anywhere in the archive. It is displayed in very low light, so give your eyes a moment.",
  "F|Then the newspaper archive. The originals are far too fragile to be handled now, and we simply do not let anyone touch them. But that is no longer a problem, because the whole run can be searched on screens in the building - type in a family name and you will get every mention of it since the eighteen forties, in a couple of seconds.",
  "F|After that we look in on the sound recordings, and I should warn you that this part is a bit of a squeeze. The listening booths are wedged into a corner of the corridor, which is nobody's idea of good design. That is being put right at last: the recordings will move to a different room soon - a proper listening suite on the first floor, opening in the spring.",
  "F|Then we come to the family history room, and here you will have to forgive the crowd. More than half of everyone who comes through our doors is tracing an ancestor, so it is the busiest part of the archive - on a Saturday morning every seat is taken by nine o'clock, and there is a queue at the microfilm readers.",
  "F|And finally the conservation studio, where documents are repaired. I am afraid this is the one place I cannot simply walk you into, because there are scalpels, chemicals and irreplaceable papers spread out on the benches, so it can only be visited by appointment - but our conservator has kindly agreed to stand in the doorway today and answer questions.",
  "F|Right. Coats on - the corridors are cold - and we will begin.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two students, Bekzod and Sabina, discussing an audio guide they are designing for a local museum. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Sabina, we should write the first section of the proposal - why we chose this project at all. What do we say?",
  "F|Well, the honest answer is the right one. It was not that the museum came to us - we wrote to them, remember, and waited three weeks for a reply. And it was not that there was nothing else on offer; there were two other projects, and the river survey was probably easier.",
  "M|So what do we put?",
  "F|That it builds on what we can already do. We already know how to edit sound from last year, so we are not starting from nothing - we spent a whole term learning that software, and this is the first chance to use it properly.",
  "M|Good, that is much stronger. Now, the visitor research - the next section, and the best thing we have done.",
  "M|We followed forty-one visitors and timed them. And almost everyone stopped listening after about four minutes, which none of us expected. They did not take the headphones off, they just stopped paying attention and started walking.",
  "F|Four minutes. That is brutal, given that the current recordings are nine minutes each.",
  "M|Three of the older visitors complained that the headphones were uncomfortable, but only three. And people did ask about the building, but they asked about everything.",
  "F|Fine - four minutes is our headline. So, the script. Who writes it?",
  "M|I assumed we would split it, half each. Or one of us does all of it, for a consistent voice.",
  "F|Either would work, honestly, and we can decide that later. The thing we do have to settle now is different: a curator has to check it for accuracy before anything is recorded. We cannot put dates and names into a museum's own guide and get them wrong.",
  "M|No, agreed. I will ask which curator and how long they need. And the voices - have you thought about that? A professional actor would be wonderful.",
  "F|A professional actor would be four hundred thousand som an hour, which is our entire budget twice over.",
  "M|Then here is my suggestion: the drama students would do it for a credit. Two of them were genuinely keen - they want recordings for their portfolios.",
  "F|Perfect. The museum staff offered, but the education officer is the only one with time, and one voice for twenty stops would be very flat.",
  "M|Right. Now the part I am worried about - the technology.",
  "F|The players are fine, are they not? The department lends them out for nothing.",
  "M|The players are fine, and the batteries last a full day, I checked. It is the phones, because half the visitors will want to use their own.",
  "F|Ah - and there is almost no signal in the stone galleries. I could not even send a message in the weaving room.",
  "M|Exactly. So anything phone-based has to be downloaded at the entrance.",
  "F|I will add that. And what did our tutor say when you showed her the outline?",
  "M|She liked it. She said the testing plan was obvious - we had already put that in - and she quite liked the music idea, which was ours anyway. Her one real piece of advice was about length: she told us to cut the number of stops. Twelve, maximum.",
  "F|Twelve. That hurts, but she is right.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "M|So if we are down to twelve stops, we have to decide what actually goes in. What are we certain about?",
  "F|For me the interviews with the former workers are the best material we have. The woman describing the noise on her first morning is worth ten information panels.",
  "M|Completely agree, they are in. What about a children's version?",
  "F|I would love one, but that is a second script, a second recording, and a second set of files. Not this year.",
  "M|Fair. Then can I make the case for sound effects again?",
  "F|Go on.",
  "M|The weaving room is silent and empty. If we lay machine noise under the commentary, quietly, people hear what the room was like.",
  "F|All right, let's keep the sound effects - but quietly, and not under the interviews. Now, what about a map on the screen, and the quiz at the end?",
  "M|The map duplicates the paper plan they hand out at the door, and the quiz felt like homework when we tried it on my sister. Both out.",
  "F|Agreed. Right - what are we each doing next week? I want us to arrive with things finished, not started.",
  "M|The big one is timing. We cannot write a word of script until we know how long people take to get from stop to stop - so we have to time the walk between the rooms, with a stopwatch.",
  "F|That is you, then, since you have Tuesday free. And I will contact the drama department on Monday, to find out who is available and when they can record.",
  "M|Good. What about visiting the guide at the transport museum?",
  "F|Worth doing, but not next week - it is a whole day. And the extra funding application is not open until March, so there is no point drafting it now.",
  "M|Agreed. Timing and the drama department, then. See you Tuesday.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of locks and keys. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good afternoon. Today I want to talk about a piece of technology that most of you used twice before you got here this morning, and have almost certainly never thought about: the lock, and its inseparable companion, the key.",
  "M|Let us start at the beginning. The oldest lock we know of was found in the ruins of an Assyrian palace, and it is roughly four thousand years old. It was built almost entirely from wood, which is one reason so few early examples survive - wood rots, while the iron and bronze of later centuries stay in the ground for us to dig up.",
  "M|The mechanism, though, is one you already own. A wooden bolt held the door shut, and above the bolt sat a row of holes. As the door closed, the pins dropped into place by gravity, falling into those holes and fixing the bolt so that it could not be slid back by hand. Nothing pushed them; they simply fell.",
  "M|The key was not the small object in your pocket. It was a heavy bar with pegs standing along it, arranged to match the pattern of the pins - you pushed it into the hollow bolt, lifted the pins clear, and slid the bolt aside. Such keys were large enough to be carried over the shoulder, and carrying one in public announced that you had property worth locking.",
  "M|Now, the Romans changed the material, and the material changed everything else. Working in metal rather than wood, they could make the mechanism far smaller, and the key smaller still. Roman keys were small enough to be worn on the body, and the wealthy wore their keys as rings on the finger - which tells you that by then a key was jewellery and an advertisement as much as a tool.",
  "M|The Romans also contributed a second principle, one still in use. Inside the lock they set fixed obstacles, shaped so that a key of the wrong outline would strike them and stop before it could turn. In English these obstacles are known as wards. The warded lock is cheap, it is charming, and it is not remotely secure - you will find one on an old wardrobe, and a determined child can open it with a bent wire.",
  "M|Medieval Europe took the craft in two directions at once. Locksmiths competed as much in decoration as in security, and their locks were carved, gilded and worked into the shapes of animals and faces. But they also relied on deception, and my favourite example is this: a false keyhole to mislead a thief, sitting proudly in the middle of the plate, while the real one hid behind a sliding panel. Important chests went further still, requiring several keys turned in a fixed order, so that no single official could open the box alone.",
  "M|Then, in the eighteenth century, lock-making became a public competition between inventors. In 1778 Robert Barron patented a lock with levers cut to different depths, so that every lever had to be raised by exactly the right amount - lifting one too far was as fatal as not lifting it far enough. That single idea is the ancestor of most serious locks made since.",
  "M|Six years later Joseph Bramah made the contest theatrical. He put one of his locks in his shop window and offered a cash prize to anyone who could open it. The challenge stood unbeaten for sixty-seven years, until an American locksmith finally picked it at the Great Exhibition in London, and even he needed more than fifty hours spread over a fortnight.",
  "M|In 1818 Jeremiah Chubb added an idea nobody had had before: a lock that told tales. If a wrong key or a pick was used, his detector jammed the mechanism and left it jammed, so that the lock warned the owner that a wrong key had been tried. Until then, a burglar who failed at a lock left nothing behind at all.",
  "M|The decisive step, though, came in 1848, when Linus Yale and his son developed the pin cylinder lock in the United States. Its genius lay less in the lock than in the key: a small flat key that could be cut by machine, identically, cheaply, in thousands. Inside, a row of spring-loaded pins of different lengths must all rise to exactly the same line before the cylinder can turn - and that is, almost unchanged, the lock on your front door tonight.",
  "M|Since then most of the change has been about who holds the key rather than how the lock works. Hotels replaced metal keys with plastic cards, and cards with telephones, so that a key can now be issued before a guest arrives and cancelled the moment they leave.",
  "M|And yet the people who test these systems for a living make the same weary point every year. The lock is rarely the thing that fails. The weakest part of any system is the user - the key under the mat, the entry code that is never changed, the fire door propped open with a chair because the lock is inconvenient. Four thousand years of engineering, and the problem is still us.",
  "M|That is the end of part four. You now have some time to check your answers.",
  "P|5"
)

Render "upset12-s1.wav" $s1
Render "upset12-s2.wav" $s2
Render "upset12-s3.wav" $s3
Render "upset12-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
