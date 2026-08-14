# Generates the four Upper-Inter Set 10 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a man phoning the organiser of a local quiz league to register a new team. First, you have some time to look at questions one to five.",
  "P|6",
  "M|Now listen carefully and answer questions one to five.",
  "F|Riverside Quiz League, Dilfuza speaking.",
  "M|Oh, hello. Some colleagues and I would like to enter a team in your quiz league this season. Could you tell me how it all works?",
  "F|With pleasure. The league meets in the back room of the Anchor cafe, on Bridge Street - we have the whole room to ourselves.",
  "M|The Anchor, I know it. And which evening do you play?",
  "F|For years the quiz was on Tuesdays, but the cafe started a book club on that night, so this season we meet every other Wednesday.",
  "M|Every other Wednesday - that suits us well. And what time do things start?",
  "F|We used to begin at eight, but people were forever drifting in late, so now everything starts at seven forty-five sharp. Oh, and on your first night, do arrive fifteen minutes early - there are registration cards to fill in.",
  "M|Noted. Now, we need a team name, I suppose. We thought we might call ourselves The Champions.",
  "F|Ah - I'm afraid there has been a team called The Champions in this league for years, and they would never forgive me. You'll need something different.",
  "M|They beat us to it! All right - we spend our lunch breaks watching the birds on the office roof, so let's be The Magpies.",
  "F|The Magpies - lovely, and nobody has that one. Now I need a captain, the main contact for the team.",
  "M|That will be me. My name is Timur Ergashev.",
  "F|Could you spell the surname for me?",
  "M|Of course. It's E, R, G, A, S, H, E, V. Ergashev.",
  "F|E, R, G, A, S, H, E, V. Thank you. And how should I get hold of you - shall I simply ring?",
  "M|Hmm - I'm in meetings most of the day, so calls often go unanswered, I'm afraid. A text is much better - I always answer those in the end.",
  "F|By text, then - I've made a note.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "M|Now, how many players are we allowed?",
  "F|Teams can be any size up to a maximum of six. Bring four or five by all means, but six is the absolute limit - bigger tables just shout over one another.",
  "M|Six at most - fine, there are five of us anyway. And what does it cost to play?",
  "F|There's no yearly charge. Each team pays an entry fee on the night. It was thirty thousand som last season, but we've brought it down, so now it's twenty-five thousand som per team, per evening.",
  "M|Twenty-five a night - very reasonable. Is there anything to win?",
  "F|There is. Half of all the entry money goes to the winning team at the end of the evening; the rest pays for the quizmaster and the equipment.",
  "M|Even better. And when does the new season begin?",
  "F|We had planned to open on the twenty-fifth of September, but that turns out to be a public holiday and the cafe will be closed, so the first night is now the second of October.",
  "M|The second of October - I'll tell the others. What sort of questions should we expect?",
  "F|Eight rounds of ten questions - general knowledge mostly. But every evening has its special rounds too: there's always a music round and a sport round, and this season we're adding a cinema round as well, because so many teams asked for one.",
  "M|A cinema round - our designer will be delighted; she watches everything. Anything else we should know?",
  "F|Just the one rule we're strict about: no phones at the table during the rounds. Keep them in a bag or a pocket - any team caught looking at a screen loses ten points.",
  "M|Fair enough - we'll survive without them. Thank you so much; you've been very helpful.",
  "F|A pleasure. We'll see The Magpies on the second of October.",
  "M|That is the end of part one."
)

$s2 = @(
  "M|Part two. You will hear the curator of a historic ship museum welcoming visitors and describing the vessel. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome aboard the Meridian. I'm the ship's curator, and before you set off around the decks, let me tell you a little about the old lady you're standing on.",
  "F|Visitors often assume the Meridian began life as a passenger liner, because of her elegant lines, and others guess she was a naval training ship, since our volunteers wear rather naval-looking uniforms. In fact she was built in 1891 as a cargo steamer, and for nearly forty years she carried wool from Australia to Europe - thousands of bales on every voyage, packed so tightly the crew joked that not even a mouse could travel as a passenger.",
  "F|Her working life ended in the 1960s, when her owners, a shipping company, sold her to be broken up for scrap. The city council was asked to save her, but decided the cost was far too high. Rescue came instead from a group of former sailors, men who had served aboard her; they raised the money themselves and bought her back a week before the breakers were due to begin.",
  "F|Now, we like to offer something new each season, and I should be clear about what is new. You may have heard that visitors can climb the rigging - I'm sorry, but that remains a job for our trained staff only. And you have always been welcome to hold the ship's wheel, so that's nothing new either. What is new is this: for the first time, you can sleep on board. Once a month we sling the crew hammocks for an overnight stay, and I warn you, the first three dates sold out within a week.",
  "F|A few practical points before we move. Unlike most museums, we positively want you to touch things - feel the ropes, work the pumps, knock on the hull. There is only one place where you must keep to the marked route, and that's the lower hold, where the floor is uneven. But I do have one firm request for everybody: the ship's ladders are steep and the decks can be slippery, so please - flat shoes. Every accident we have ever had on board involved somebody in heels.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Let me take you round the ship, area by area, in the order you'll come to them.",
  "F|We begin at the stern, with the captain's cabin. It's a small miracle of survival: when the ship was sold, the captain's family took the contents home and kept them for sixty years, then gave everything back to us. So almost every piece of furniture in that cabin is original - the desk, the bunk, even the barometer on the wall.",
  "F|Next door is the galley, the ship's kitchen. Twice a day, at eleven and at two, one of our volunteers lights the old stove and bakes ship's biscuit to the original recipe. Do try a piece - it's harder than the deck, but the smell alone is worth the visit.",
  "F|Below, down the wide staircase, is the cargo hold, where the wool was once stowed. A space that size is far too good to leave empty, so we use it for temporary exhibitions - each show stays for a few months at a time. At the moment it's photographs of harbour life; in the spring, ship models take over.",
  "F|Forward of the hold you'll find the crew's quarters. Sadly, nothing original survived there - the space was gutted in the years the ship served as a floating warehouse. But a stack of photographs taken on board in 1902 turned up in a family album, and the whole space was rebuilt using those old photographs, down to the position of the last hook.",
  "F|I'm afraid the chart room will be a disappointment today. A leak appeared in its roof last month, and workmen are in there now putting it right, so you can only look in from the doorway. It will be open again by the summer.",
  "F|And finally, my own favourite: the engine room, four decks of polished steel and brass. The ladders down are narrow and the lighting is dim, so the engine room can only be visited with a guide - tours leave from beside the funnel every half hour, and I promise you the climb down is worth it.",
  "F|Right - enjoy the old lady, and do come and find me on deck if you have questions.",
  "M|That is the end of part two."
)

$s3 = @(
  "M|Part three. You will hear two linguistics students, Aziza and Bekzod, planning a survey of local slang. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Right, Bekzod - the proposal form first. It asks why we chose local slang. Shall I mention that lecture on dialects we both went to?",
  "M|The lecture was interesting, but honestly it wasn't the reason. It really started at my grandmother's birthday dinner. My cousins were chatting away, and she leaned over and whispered that she couldn't understand half the words they were using - and everyone at that table was speaking the same language. I haven't stopped thinking about it since.",
  "F|That's a far better opening than a lecture. I did read an article about slang last month, but your story is where the project actually began, so let's write that.",
  "M|Agreed. Next question: what exactly are we trying to find out? If we just collect words, we're making a dictionary, not doing a survey.",
  "F|Quite. Counting how many slang words people use would be endless, and we can't possibly prove in one term that slang is dying out. What we can measure is how people of different ages feel about slang - whether they enjoy it, whether it irritates them, whether they think it harms the language. Attitudes, across the generations - that we can actually measure.",
  "M|Good - that's a question with an answer. Now, I should own up about my pilot questionnaire before you read it.",
  "F|Go on.",
  "M|The questions themselves were fine - nobody found them embarrassing, and I wrote every answer down word for word. The problem is who I asked. Every single person was a student on our course. Twenty people, all the same age, all studying linguistics - as a sample it tells us almost nothing.",
  "F|Well, that's what pilots are for. So for the real survey, how do we collect the data? I first imagined an online form.",
  "M|Online is easy for us, but think who it leaves out - my grandmother has never opened a browser in her life. And I did wonder about recording people's conversations in cafes, but recording strangers without permission? The ethics committee would refuse in a heartbeat.",
  "F|They would. So we do it the slow way: we sit down with people and talk - face-to-face interviews, with the questions in front of us. Everyone can take part that way, whatever their age.",
  "M|Agreed. Now - the word list. You showed the draft to your neighbours, didn't you?",
  "F|I did, the teenagers next door. And before you ask - none of the words shocked them, and the list isn't too long either; it fits on a single page. The real trouble is that they laughed at half of it. Words I thought were current apparently went out of fashion years ago - so many of the words on our list are already outdated.",
  "M|Then the interviews will refresh the list - we'll ask people for the words they actually use now. Oh - did you see the tutor about the proposal?",
  "F|Yesterday. She was happy with the reading list, and she certainly doesn't want us rushing out to collect data yet. Her one firm piece of advice was about the area we cover: the whole city is far too big for a single term, she said - we should narrow it to a single district and do it properly.",
  "M|That makes sense. The old town, then - both our families are from there.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, within the district - who exactly do we interview? We can't stop everyone in the street. I wondered about the market traders; they talk to hundreds of people a day.",
  "M|They do, but I once tried interviewing a stallholder for another project - a lovely man with no time at all. Traders are working; we'd get two minutes at most. What about schoolteachers?",
  "F|Teachers hear teenage slang all day, but at work they're so careful about language - I think they'd tell us what they feel they ought to say, not what they really think.",
  "M|True. For the older generation, though - the retirement club by the park meets every Thursday. My neighbour goes. They'd have time, they'd enjoy the visit, and their memories of the old slang would be gold.",
  "F|The retired people, definitely - that's settled. And I want the taxi drivers. My uncle drives a cab, and he says it's like a small theatre of the whole city - every age, every district, talking all day long. Drivers hear everything, and between fares they've time to talk to us.",
  "M|Retired people and taxi drivers - a strong pair. University staff would be the easiest to reach, of course, but they're practically the same crowd as my pilot - far too close to home.",
  "M|So - what must we actually prepare before the first interview?",
  "F|First, the consent form - the ethics office won't let us near a single interviewee without one. I'll draft it tonight from the department template.",
  "M|And the questions themselves. My pilot list took forty minutes to get through - nobody will give us forty minutes of their life. Before we start we cut it down - fifteen minutes at the very most.",
  "F|Those two first, then. Should we prepare an information leaflet about the project as well?",
  "M|The tutor said the consent form already explains everything, so a leaflet would only repeat it - let's not.",
  "F|Fine. And the department's voice recorder - shall I book it?",
  "M|I'd rather you didn't. The moment a recorder appears on the table, people stop talking naturally. We'll take notes instead.",
  "F|Notes it is. And thank-you gifts? Somebody in the seminar gives every participant chocolate.",
  "M|Mm - I think gifts would make it feel like a transaction. A warm thank-you and a copy of the results will mean far more.",
  "F|Consent form and the shorter question list, then - and I'll book us in at the retirement club for Thursday.",
  "M|That is the end of part three."
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of gardens. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. Today I want to trace the history of an art form we walk straight past every day - the garden. Gardening is among the oldest of all human arts, older than writing, and a garden, wherever you find one, is always the same thing: a piece of nature arranged by people to please people.",
  "M|But the first gardens were not made to be admired. They were practical spaces. They supplied food, and in hot lands they supplied shade - a leafy tree beside a house was worth as much as an extra room. Beauty arrived later, as a guest, and then stayed on as the owner.",
  "M|Our earliest detailed pictures of gardens come from ancient Egypt, and nearly all of them are paintings inside tombs - the Egyptians loved their gardens so much that they wanted them in the next world too. The paintings show walled gardens of surprising formality: straight rows of fruit trees, vines trained on frames, and at the centre rectangular pools full of fish and waterfowl. In a desert country, water on display was wealth on display.",
  "M|It was in Persia, though, that the garden became an idea. The classic Persian garden was enclosed on every side and divided into four equal sections by crossing channels of water, with a pavilion or a fountain at the point where they met. To step inside was to leave the dust of the road for an image of heaven - and that is no loose comparison, because our word paradise comes from an ancient Persian term meaning a walled enclosure. The four-part design proved astonishingly durable: it travelled with Persian influence eastwards into India and westwards into Spain, and you can still walk through it today.",
  "M|The Romans made the garden domestic. A Roman town house turned its back on the noisy street and faced inwards, onto a small courtyard garden with columns all around. And where space ran out, illusion took over: courtyard walls were painted with images of birds among branches, so that a pocket-sized garden appeared to stretch away into an endless orchard.",
  "M|When Rome fell, the garden retreated behind monastery walls, and became a working space once more. Monastery gardens grew vegetables for the table, of course, but above all they grew herbs, because the monks grew herbs chiefly to make medicine. For centuries, the monastery garden was the closest thing most of Europe had to a pharmacy.",
  "M|With the Renaissance, the garden stepped forward as a work of art in its own right. The great Italian gardens of the period were laid out with strict geometry - clipped hedges, straight avenues, terraces descending a hillside in measured steps. This was the garden as architecture, built from living material.",
  "M|France carried that logic to its extreme. At Versailles the garden became an instrument of state: avenues running further than the eye can follow, fountains by the hundred, whole woods clipped into patterns. Every line of it was designed to express the king's power, and a visitor was meant to walk away feeling suitably small.",
  "M|The eighteenth-century English reaction swept all of that away. English designers set out to copy nature itself: rolling lawns, scattered clumps of trees, winding lakes that looked as though they had always been there. One problem remained - farm animals, which would wander in and eat the view. A fence would destroy the illusion of open country. The answer was a hidden ditch, deep enough to stop the cattle but invisible from the house, so that the lawn appeared to flow without a break into the fields beyond. Visitors coming upon it suddenly were said to cry ha-ha - and that, believe it or not, is what the device is still called.",
  "M|The nineteenth century finally opened the garden gate to everyone. In the crowded industrial cities, reformers argued that green space was not a luxury but a necessity, and town councils laid out public parks quite deliberately to improve the health of their residents - free to enter, open to all, the countryside delivered to the factory's doorstep.",
  "M|And the story has not ended. Today's community gardens, raising vegetables on rooftops and empty building plots, have in a sense returned the garden to where it began: a practical space, feeding the people who tend it. The first gardeners, I suspect, would approve.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset10-s1.wav" $s1
Render "upset10-s2.wav" $s2
Render "upset10-s3.wav" $s3
Render "upset10-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
