# Generates the four Practice Set 3 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman phoning a hotel to book a conference room for a business event. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good afternoon, Rosewood Hotel, events desk. How can I help you?",
  "F|Oh, good afternoon. I'd like to book a conference room for a company training day, please.",
  "M|Certainly. We have two rooms for daytime business events, so I'm sure we can help. Could I have the name of the company first?",
  "F|Yes, it's Kellaway Solutions. Kellaway - that's K, E, double L, A, W, A, Y.",
  "M|K, E, double L, A, W, A, Y. Kellaway Solutions, lovely. And what sort of event is it?",
  "F|It's a one-day training workshop, for our sales staff.",
  "M|A training workshop, fine. And when would you like to come?",
  "F|We were hoping for Thursday the fifth of November.",
  "M|The fifth... let me just check the diary. Ah, I'm sorry - the fifth is already taken, there's a wedding fair in the hotel that whole day. The following Thursday is completely free, though. That's the twelfth.",
  "F|Thursday the twelfth of November. Yes, that would still work for us.",
  "M|The twelfth it is. And how many guests will you be bringing?",
  "F|Well, we told people forty when we announced it, but another five have signed up since then, so you'd better put down forty-five.",
  "M|Forty-five, noted. Now, the room. For that number I'd recommend the Cedar Room. Our other room, the Willow Room, only seats thirty, so it would be far too small for you. The Cedar Room takes up to sixty.",
  "F|The Cedar Room, then. And can you arrange the seating for us?",
  "M|Of course. Some companies ask for a boardroom style, everyone around one long table, but with forty-five people that isn't possible. For training days we set the room out in a theatre style - rows of chairs all facing the front.",
  "F|Theatre style is exactly what we want, yes.",
  "M|Good. And I should say, the room comes with a projector, a screen and two microphones - those are all included, there's no extra charge for equipment.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|That's very helpful. And what will all this cost?",
  "M|Well, there are two rates. For a half day - that's any four hours - it's five hundred thousand som. But you'll want the room from morning until evening, I imagine, and the full-day rate is eight hundred and fifty thousand som.",
  "F|Eight hundred and fifty for the whole day. That's within our budget. Does the price include any refreshments?",
  "M|Coffee in the morning, yes, and it's served with biscuits. People always hope for cake, I'm afraid there isn't any, but the biscuits are baked here in the hotel. All of that is included in the room price.",
  "F|Very good. And could you do lunch as well?",
  "M|We can certainly do lunch, but that's charged separately - it isn't part of the room rate. When the weather's kind we serve it out on the terrace. If it rains, we simply move everybody inside to the restaurant.",
  "F|Lunch on the terrace in November - well, we can hope! Now, what do I need to do to confirm the booking?",
  "M|Two things. First there's a deposit - twenty per cent of the room rate - and we'd need that this week to hold the date for you. And then we'll need the final list of your guests, with their names, one week before the event.",
  "F|Shall I post the list to you?",
  "M|Oh, please don't post it - printed things have a way of going missing here. Send it by email, to the events address on our website.",
  "F|By email, fine. And on the day itself, when we arrive, who should we ask for?",
  "M|Come straight to the front desk and ask for the events manager. That's me, as it happens, so I'll be expecting you.",
  "F|Perfect. Thank you so much for your help.",
  "M|My pleasure. We'll see you on the twelfth. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the volunteer coordinator at the City Zoo giving a briefing to a group of new volunteers. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone, and welcome to the City Zoo. I'm the volunteer coordinator, and by the end of this morning you'll know exactly where you fit in. First, let me deal with the question I've been asked a dozen times already: why are we taking on so many new volunteers this year?",
  "F|Some of you have heard that our visitor numbers have shot up. They haven't, actually - last year was almost identical to the year before. And no, none of our paid keepers have left us either; the team is the same as ever, I'm glad to say. The real reason is much happier. In July we open a completely new section of the zoo - the children's farm, down by the lake - and a new area simply cannot run without extra pairs of hands.",
  "F|Now, before any of you starts work, there is one thing everybody in this room has to do. It isn't the first-aid course - that's only for the teams who handle animals, and it comes later. And it isn't the training videos; those are on the website if you're curious, but nobody will check whether you've watched them. What you must each do is spend one full day alongside an experienced volunteer, following them everywhere, before you're given any duties of your own. We find people learn more in that one day than in a week of lectures.",
  "F|Uniforms. You each get two polo shirts and a fleece, and there's nothing to pay - not a deposit, not a penny, and when you leave us the uniform is yours to keep. What you do need to do is collect it from the volunteers' office - that's the green door behind the gift shop. Please don't ask at the main gate; they don't keep them there.",
  "F|And one more piece of housekeeping. I'm often asked what volunteers get free. I have to be honest: meals in the staff canteen are discounted, but not free, and I'm afraid we can't give free tickets to your families - I wish we could. What every volunteer can use free of charge is the staff car park, next to the west entrance. Just show your badge at the barrier.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Right - let me tell you about the six teams you can join, and a little about each one.",
  "F|First, the education team, who work with school groups in the classroom by the aquarium. It's wonderful work, but be aware of the timing: schools don't visit over the summer, so this team won't begin until the school year starts in September - later than everyone else. If you want to be busy immediately, it isn't the team for you.",
  "F|The tour guides take the public round the zoo twice a day. You get a route and a script to learn, and the animals do most of the entertaining. But you'll be talking to thirty or forty people at a time, out in the open, so we do ask that you're comfortable addressing a large group. If the idea makes your knees knock, choose something else.",
  "F|The information desk team sits in the entrance hall, answering questions and handing out maps. I want to be frank: this is where we are shortest of people. It is the team that needs more new volunteers than any other, so if you genuinely don't mind where you serve, please, put yourself down for the desk.",
  "F|The gardening team looks after the planting right across the site. You'll be outside in all weathers, and for that reason it's the one team that gets extra kit from us - proper waterproof jackets and rubber boots, in your size, on your first morning.",
  "F|The animal kitchen team prepares the feeds - chopping fruit, weighing out grain, labelling every bucket. The animals eat before the visitors arrive, which means the kitchen starts at seven in the morning, a good two hours before any other team. If you're not an early riser, think carefully.",
  "F|And finally the events team, who help with birthday parties, evening openings and our big summer festival. Because those events involve contracts and safety plans, this is the one team you'll never run on your own: it always works under the direction of our paid events officer, and you'll be assisting her rather than organising things yourselves.",
  "F|So - have a think over coffee, and come and give me your first and second choices before you leave. Thank you.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two physics students, Karim and Dilnoza, discussing the report on their pendulum experiment. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Dilnoza, we should sort out the introduction first. The report has to say why we picked the pendulum experiment, and I can't remember what we agreed.",
  "F|Well, let's be honest about it, Karim. It wasn't because of the lectures - Dr Aliyeva didn't cover pendulum theory until two weeks after we'd started.",
  "M|True. And she actually suggested we do the springs experiment, didn't she? So we can't claim it was her idea.",
  "F|No. The real reason was the equipment. A pendulum needs a string, a weight, a ruler and a stopwatch - that's everything. We could set it up in an afternoon and repeat it as often as we liked. None of the other experiments were that simple.",
  "M|Right, so the introduction says we chose it because the apparatus was so simple. Now, the first timing session - we have to describe what went wrong.",
  "F|That was embarrassing. People will assume the stopwatch was broken, but it was fine - we tested it against your phone afterwards.",
  "M|And the string never stretched either; I checked the length before and after, and it hadn't moved. No - the mistake was ours. We were timing one swing at a time, starting and stopping the watch for a single swing.",
  "F|Which is hopeless, because the error on one swing is huge. Once we started timing twenty swings together and dividing by twenty, the numbers settled down immediately.",
  "M|We should be open about that in the report - it shows why the method matters. Now, the meeting with Dr Aliyeva. What did she actually tell us to change?",
  "F|Not the weight - I asked about using a heavier one and she said it makes no difference to the timing at all. And she was happy with how we measured the string.",
  "M|Her one instruction was about the swing itself, wasn't it? Keep the angle small - under about ten degrees - because the formula only works for small swings. Ours were far too wide at the start.",
  "F|Yes - keep the swing angle small. That goes in the method section. And then there's the result that surprised us.",
  "M|The weight thing. I still find it strange. We doubled the mass on the end of the string and the time for each swing didn't change at all. I was sure a heavier bob would swing more slowly.",
  "F|So was I - that's the point of putting it in. It surprised us, and it confirms the theory. Now, the aim. The report needs one clear aim at the top. Is it comparing our two ways of timing?",
  "M|No, that was just a check along the way. The whole point of the experiment - the reason the formula matters - is that it lets you calculate the acceleration due to gravity. That's our aim: to measure g with a pendulum.",
  "F|Agreed. To measure the acceleration due to gravity. And the draft itself - which part worries you?",
  "M|Not the method - that reads well. And the diagrams are fine; your drawing of the setup is clearer than the one in the textbook.",
  "F|The weak part is the error analysis. At the moment it's two sentences. We say our answer is close to nine point eight, but we never say how confident we are, or where the uncertainty comes from.",
  "M|You're right - the error section needs the most work of anything. Let's plan it now.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, which sources of error do we actually discuss? There's a list of candidates. Air resistance?",
  "M|I'd leave it out. The bob is small and slow - Dr Aliyeva said air resistance is negligible at our speeds, and we've no way to measure it anyway.",
  "F|Agreed. Temperature? The room did warm up over the afternoon.",
  "M|By two degrees. It does nothing to a steel bob on a cotton string. Leave it out. But reaction time - that we keep. Every time we start and stop the stopwatch, our thumbs add a fraction of a second, and we can actually estimate the size of that.",
  "F|Yes, reaction time goes in. And the other one I want is the length. The formula needs the length from the pivot to the centre of the bob, and finding the exact centre of that brass cylinder was guesswork. That could be two or three millimetres either way.",
  "M|So: reaction time, and the difficulty of measuring the string's true length. Those two, and we can put a number on each. Now - anything we should add to the report before we hand it in?",
  "F|I thought about photographs of the apparatus, but the handbook says diagrams are preferred, so there's no point.",
  "M|And the comparison with the accepted value of g is already written - it's in the conclusion. The references are done too; I finished those on Sunday.",
  "F|So, two additions. First, a graph - length on one axis, the square of the period on the other. It should be a straight line, and the slope gives us g. It makes the whole argument visible.",
  "M|Lovely. And second, the raw numbers. At the moment we only show averages, and the marker can't check anything. A table of every timing we took goes in the appendix.",
  "F|The graph and the table of raw measurements, then. That's Saturday taken care of.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of coffee. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Most of you, I suspect, are holding a cup of the very substance this lecture is about, so let us give it some overdue attention: coffee, and how it conquered the world.",
  "F|The story begins in Africa. Coffee trees first grew wild in the highlands of Ethiopia, and nobody planted them - they were simply part of the forest. How people discovered what the berries could do, we honestly don't know, but the legend is too good not to tell. A young herder, the story goes, noticed that his goats became strangely lively after eating the red berries from a certain tree - skipping about, refusing to sleep - and when he tried the berries himself, he understood why. What we can say with confidence is that in the earliest period nobody brewed anything: the beans were chewed, sometimes pressed with fat into a ball, a portable food for travellers rather than a drink.",
  "F|Coffee as we know it - roasted, ground and brewed with hot water - appears in the fifteenth century, across the Red Sea in Yemen. And its first devoted users were religious men: the monks of Yemen drank it to stay awake during their night prayers, hour after hour of chanting that sleep would otherwise have interrupted. From Yemen the trade spread, and for two centuries virtually every exported bean passed through one place - the port of Mocha, a name that has been attached to coffee ever since.",
  "F|From Arabia the drink travelled north to Istanbul, and in the seventeenth century it reached Europe, where it created a completely new institution: the coffee house. In London these were nicknamed penny universities, and the name was earned. For the price of a single cup - one penny - a man could sit all evening and join hours of conversation with merchants, writers and scientists at the next table. Serious business was done there too: Lloyd's, the insurance market that still exists today, began as a coffee house where ship owners gathered. Not everyone was pleased. Rulers across Europe and the Ottoman Empire distrusted the coffee houses, and some tried to close them, because rooms full of alert, talkative citizens seemed to breed political criticism - and occasionally they were right.",
  "F|Now, for a long time Arabia guarded its treasure. Exporting a live plant or a fertile seed was forbidden. But no monopoly lasts. The Dutch obtained smuggled plants and grew them in their colony on the island of Java, which is why an old nickname for coffee is java. And in seventeen twenty-three came the most romantic episode in the whole story: a French naval officer carried a single seedling across the Atlantic to the Caribbean. The voyage went badly - storms, a becalmed ship, drinking water measured out by the cup - and he famously kept the plant alive by sharing his own ration of water with it. From that one seedling, much of the coffee of the Americas descends. The consequences were enormous. Within a century coffee had become Brazil's main export, and plantations replaced large areas of forest - a transformation of the landscape whose effects are still visible today.",
  "F|The nineteenth century turned coffee from a craft into an industry. Roasting, which every household had once done for itself in a pan over the fire, moved into the factory, and companies began selling coffee ready-roasted under brand names. Freshness became the great problem, and the solution was packaging: ground coffee stayed fresh when it was sealed in tins, and later in vacuum packs. Even decaffeinated coffee owes its existence to this industrial age - and to an accident. A German merchant received a cargo of beans that had been soaked in seawater during a storm. Rather than throw them away, he had them tested, and found the soaking had drawn out most of the caffeine while much of the flavour survived. From that ruined shipment came a process, and a whole new product.",
  "F|And today? Coffee is grown right around the tropics, and almost all of it belongs to two species. Arabica, the original Ethiopian plant, is prized for its flavour and fetches the higher price. Robusta is hardier and cheaper, and, as its drinkers know, it contains more caffeine - roughly twice as much. But the plant is fussy about climate, arabica especially, and here the story meets our own century's problem. As the world warms, the old plantations are becoming too hot, and growers are moving up the mountainsides, planting at higher altitudes where the cool conditions the tree loves still survive. The plant that began in the Ethiopian highlands is, in a sense, climbing back up the hills. Next week, we'll look at tea - coffee's great rival. Thank you.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset3-s1.wav" $s1
Render "pset3-s2.wav" $s2
Render "pset3-s3.wav" $s3
Render "pset3-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
