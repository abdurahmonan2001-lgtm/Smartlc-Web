# Generates the four Practice Set 9 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a community hall to book it for a party. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Hillside Community Hall, good morning.",
  "F|Good morning. I'm ringing to ask about hiring the hall for a private party. Is there someone I can speak to?",
  "M|That's me, I do all the bookings. Let me open the diary. Can I start with your name?",
  "F|Yes, it's Dilnoza Ismoilova.",
  "M|And how do you spell the surname?",
  "F|It's I, S, M, O, I, L, O, V, A. Ismoilova.",
  "M|Thank you. Now, what kind of party is it? A birthday, I imagine - that's most of our weekend bookings.",
  "F|Everybody assumes that. No, it's a retirement party. My mother leaves the hospital at the end of May, after thirty-one years there, and we want to surprise her.",
  "M|A retirement party. How nice. And which date were you hoping for?",
  "F|We had thought about Saturday the sixteenth of May.",
  "M|Let me check... ah, I'm sorry, the sixteenth has gone - there's a wedding reception in the main room all day. The Saturday after that is free, so that would be the twenty-third.",
  "F|Saturday the twenty-third of May. That works even better, actually, because her last day is the twenty-second.",
  "M|The twenty-third it is. Now, we have three rooms. The one people ask for is the Oak Room, but I have to warn you it's being redecorated all through May, so it won't be available. I'd put you in the Willow Room instead - and honestly it's the largest of the three, so with a hundred guests you'd want it anyway.",
  "F|The Willow Room. Fine. What time could we have it?",
  "M|Evening bookings run from six in the evening until eleven, and everyone has to be out of the building by midnight. That's a condition of our lease, I'm afraid, and we do enforce it.",
  "F|Six until eleven is plenty. And the room holds how many?",
  "M|A hundred and fifty seated. You said about a hundred guests, so there'll be room to move.",
  "F|Good. And what does it cost?",
  "M|The standard charge is two hundred thousand som for the evening. But if you live in the district, there's a residents' rate, and it comes down to one hundred and eighty thousand.",
  "F|We live two streets away, so one hundred and eighty thousand. Is anything included in that?",
  "M|Tables, chairs, the kitchen and the car park are all included - there's no extra charge for any of them.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|There'll be some speeches. Is there anywhere for people to stand?",
  "M|There is. We keep a set of platforms in the store cupboard, and the caretaker will put up a small stage for you at no charge at all. People usually have it at the far end, under the windows.",
  "F|A small stage would be perfect. Do you provide any food?",
  "M|No, and I should be clear about that, because people are often caught out. We provide no food or drink whatsoever. You arrange your own catering - there's a list of local firms on our website, but you're free to use anyone you like, or to bring everything yourselves.",
  "F|So we sort out the catering. Understood. My brother's band want to play for an hour or so.",
  "M|That's allowed, but there's a rule about it. Recorded music is fine at any time up to eleven. For live music after ten in the evening you need a licence, and you have to apply to the council at least a month beforehand. It costs very little, but leave it too late and you won't get it.",
  "F|A licence for live music after ten. I'll apply this week.",
  "M|Sensible. Now, payment. There's no charge for cancelling, but I do need a deposit against damage - fifty thousand som. We check the room on the Monday morning and, assuming all is well, it goes back to you within a week.",
  "F|Fifty thousand as a deposit. And the hire charge itself?",
  "M|By bank transfer, at least seven days before the party. We don't take cash on the night any more.",
  "F|Right. And who lets us in on the evening?",
  "M|The caretaker. He opens the hall at half past five so you can decorate, he stays in the building all evening, and he locks up after you leave. His name's Anvar and he's extremely helpful.",
  "F|That's everything, I think. Thank you very much.",
  "M|My pleasure. I'll send the booking form today.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a project officer talking to a local group about a new footpath along the river. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out on such a wet night. I'm the project officer for the river footpath, and I want to tell you how it came about, how it was paid for, and what we're asking of you now that it's open.",
  "F|People are generous about who gets the credit. The walking club is usually named first, and it's true they've campaigned for years for better access - though for other routes, not this one. Others point to the open-space survey the council carried out three years ago, which certainly helped later on. But the honest answer is that this path began with a class of eleven-year-olds at Marsh Lane School. They walked the riverbank for a geography project, mapped every blocked gate and broken fence, and sent the council a report with photographs. Nobody could quite bring themselves to file it, and here we are.",
  "F|Money next, because I'm always asked. Local businesses were generous - the builders' merchant gave us the timber and two firms paid for the benches and the signboards between them. Nearly six hundred households gave something as well, which mattered more for morale than for the accounts. But let me be straightforward: the great bulk of it, about eighty per cent of the total, came from a national lottery grant, and without that award there would be no path at all.",
  "F|We were also slower than we promised, and I'd rather explain why than pretend otherwise. Yes, the spring was wet, and we lost days to it. There was also a fortnight when we simply could not trace the owner of one small field, which sounds worse than it was - it was settled with a phone call in the end. What actually cost us five months was wildlife. A colony of water voles was found in the bank just above the weir. They're a protected species, everything stopped, and we could not touch that stretch until the ecologists had surveyed it and moved them safely upstream.",
  "F|And now the path is open, we do ask one thing of you above all. Dogs are welcome, on a lead near the meadow but loose elsewhere, so that's not it. The new planting will look after itself, and you're welcome to walk on the banks. The request is this: after heavy rain, please stay off the path altogether for a day or two. The surface is bound gravel and it is soft when it's saturated - a single wet weekend of boots can undo two months of work, and we haven't the budget to lay it twice.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "F|Let me take you along the route, west to east, and tell you what you'll find.",
  "F|You start at the iron bridge. Everyone assumes it has always been there, but it hasn't. It was brought here from another site - it spanned a stream on the old railway ten miles north, and when that line was lifted the engineers took the bridge apart, numbered every piece and rebuilt it here over the mill stream. It's a hundred and forty years old and good for another hundred.",
  "F|Two hundred metres on you come to the weir. Stand still there for ten minutes at dawn and you'll understand why we put a bench on it. It is far and away the best place on the river to watch birds - kingfishers most mornings, herons, and in winter the whole pool fills with ducks. Bring binoculars and patience.",
  "F|Beyond the weir is the old mill, or what's left of it. We couldn't afford to restore the building, so we did the next best thing: the information boards there were written entirely by children, the same school that started all this. They interviewed two former mill workers, and I'd say their boards are better than anything we would have produced.",
  "F|Then the path crosses the meadow, and here I have to disappoint you slightly. The meadow is closed to the public every winter, from November to March. It floods, for one thing, and it's also where the ground-nesting birds settle. The path takes a signed detour along the lane in those months.",
  "F|After the meadow comes the boatyard stretch, which is the part I'm proudest of. It's level, it's three metres wide and it's tarred rather than gravelled, so it has a surface that wheelchairs can use - and pushchairs, and anyone unsteady on their feet. Two families told me it is the first riverside walk they have been able to do together.",
  "F|And the path ends at the picnic area by the boathouse, with its tables and its little shelter. That was paid for by a single donor, a woman who grew up in the cottages behind it and asked us not to name her. She sat with the plans for an hour and then wrote a cheque for the lot.",
  "F|That's the route. Do come and walk it - and do tell us what needs fixing.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two psychology students, Rustam and Nigora, planning a study using sleep diaries. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Nigora, before we write anything, we need the first section of the form - why we chose sleep.",
  "F|Do you want the polite answer or the true one?",
  "M|The true one. We can make it sound academic afterwards.",
  "F|Then it's me. Everyone will assume it was Doctor Rahimov's suggestion, because he does sleep research and he supervises half the year, but he had nothing to do with it. And it wasn't that documentary you keep quoting either.",
  "M|The documentary was excellent.",
  "F|It was, and it's irrelevant. Last January I stopped sleeping properly for three weeks during the exams. Four hours a night, and by the end I couldn't hold an argument together on paper. That's why we're doing this, and I think we should say so.",
  "M|Agreed - it's a better opening than anything invented. Now, the literature. I read six of the papers.",
  "F|Seven for me. And the samples were bigger than you'd think - a couple had over four hundred people, so we can't complain about numbers. Nor about length: most of them ran for two or three weeks, which is respectable.",
  "M|So what's the gap?",
  "F|Almost all of them asked people at the end of the study how they had slept during it. That's the flaw. They depended on what people remembered, and memory for sleep is famously bad - you can't accurately recall in April how many times you woke in February.",
  "M|Which a daily diary fixes. Right, that's our justification. Now, the practical question: how do people fill it in? I assumed an app.",
  "F|I thought so too, and then I read the guidance. If you ask someone to pick up a phone within a minute of waking, you have changed the very thing you're measuring - the light, the notifications, the temptation to scroll. We hand out paper. A small booklet, one page a day, and a pencil.",
  "M|Paper it is. Old-fashioned but clean. And what did the tutor say when you showed her the draft?",
  "F|She liked it, with one condition. She was not particularly bothered about caffeine - she said we can ask, but it's a whole study in itself - and she didn't push us to run it for longer. What she insisted on was a measure of daytime alertness. Her point was that sleep on its own tells you nothing; you need to know how people function the following day, or there's no outcome to explain.",
  "M|A daily alertness rating. Fair enough. And what worries you most about actually running it?",
  "F|Honestly? Not finding people - we'll get sixty from the first-year lectures. And I'm not too anxious about dishonesty either; people have no reason to lie to us. It's that they'll simply forget. A diary is easy to fill in for four days and impossible on day nine, and a diary with holes in it is worth very little.",
  "M|That's my fear as well. So we send a reminder message every morning at eight.",
  "F|Yes. And it follows that the entry has to be made as soon as they wake, before anything else. Not at lunchtime, when the night has blurred, and certainly not the following bedtime.",
  "M|Straight after waking. I'll put that in bold on page one.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So what exactly goes on the morning page? It has to fit on half a side.",
  "M|Bedtime, surely.",
  "F|That's on the evening page - they fill that in before they go to sleep, so it isn't a morning item at all. The morning page is for what only they can tell us about the night. First, how many times they woke.",
  "M|Number of wakings, agreed. That's the one thing no device on the market gets right.",
  "F|And second, how they feel on waking. A simple five-point scale, from terrible to excellent. It sounds soft, but it's the measure that actually predicts the rest of the day.",
  "M|Mood on waking. Good. What about food? I wanted to know what they ate the evening before.",
  "F|Too much. It's a different study, and it turns a two-minute page into a ten-minute chore. Same with exercise - we'd have to define what counts as exercise, and we'd argue about it for a fortnight.",
  "M|Fine. Two items only. Now, jobs before we start. There's a lot.",
  "F|There is, but most of it isn't ours. The department office prints the booklets once we hand over the final design, so that's not a job. And we don't need a room for the briefing - I'm doing that by email with a video attached.",
  "M|And ethics?",
  "F|Already covered. Doctor Rahimov holds a blanket approval for the whole module, so there's no separate application. What we do have to write, and write carefully, is the instruction sheet. If people don't understand the alertness scale, the data is meaningless.",
  "M|I'll draft the instruction sheet this weekend. And I think we should test the diary on friends first - four or five people, three days, just to see where they get stuck.",
  "F|A small pilot with friends. Yes, that's essential. Nothing survives contact with a real user.",
  "M|Instruction sheet and pilot, then. We meet on Friday.",
  "F|Friday.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of bread. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we followed the history of salt. Today I want to look at the food that salt was mostly used to season: bread. And I want to begin much earlier than most people expect.",
  "F|Until recently, everyone taught that bread came after farming - that people first grew grain, and then, some centuries later, thought of baking it. That order is now wrong. At a site in the Jordanian desert, archaeologists found burnt crumbs of a flat bread in a stone fireplace, and those crumbs are about fourteen thousand years old. Under the microscope, the flour turned out to be a mixture of wild grains and the ground roots of a marsh plant, a kind of rush that grew by the water. So bread was being baked at least four thousand years before anybody planted a field. Bread did not follow farming. If anything, the appetite for bread may have helped to cause it.",
  "F|The next great chapter belongs to Egypt, and it concerns a loaf that rises. The Egyptians discovered, presumably by accident, that dough left standing for a day swells and lightens instead of spoiling. The cause, though they had no way of knowing it, was wild yeast drifting in the air of the bakery and settling on the wet flour. What they did understand was how to keep a good one going: bakers kept back a piece of yesterday's dough and stirred it into today's, which is exactly what a sourdough baker does now. Bread also became a form of money in Egypt. The workers who built the pyramids were not slaves and they were not paid in coin; they were paid in rations, and the standard ration was bread and beer, both made from the same grain.",
  "F|In Greece, baking turned into a paid occupation for the first time, with professional bakers selling to households that had stopped baking for themselves. Rome then industrialised the whole business. Roman bakers were organised into a guild, with its own rules, its own privileges and a legal duty to keep the city supplied. Behind them stood the mills, and the largest Roman mills were driven by water, turning great stones day and night on the edge of the city. And in Rome bread became politics: free bread was handed out to the citizens of the city, month after month, and any emperor who let that supply fail could expect a riot within the week.",
  "F|Move forward to medieval Europe and bread divides along the lines of class. Fine white bread, made from wheat and sifted through cloth, was eaten by the rich. The poor ate rye, or barley, or a mixture of whatever the year had produced, and their loaves were dark, dense and sour. Bread was furniture as well as food: a thick slice of stale bread, three days old, served as a plate, soaking up the juices of the meal, and it was eaten at the end or given to the poor at the gate. Because bread mattered so much, it was regulated more strictly than any other food. Laws fixed the weight and the price of every loaf, and inspectors weighed them in the market. Bakers who were found short were pilloried, and it is from this that we get the practice of adding an extra loaf to every twelve - the safest way to avoid punishment was to give more than the law required.",
  "F|Now, the machines. For thousands of years flour was ground between stones, which crushed the whole grain together. In eighteen thirty-four a Swiss engineer patented the roller mill, and within fifty years it had spread everywhere. Rollers made white flour cheap for the first time in history, which sounds like progress, and in one way it was. But the rollers also removed the germ and the bran, and with them most of the vitamins, so that by nineteen hundred the cheapest bread was the least nourishing bread - a problem governments eventually solved by adding the vitamins back. The second machine arrived in nineteen twenty-eight, when an American inventor sold the first machine for slicing bread, an idea bakers had rejected for years on the grounds that a cut loaf would go stale. And in nineteen sixty-one, British researchers at Chorleywood found that very intense mixing could cut the making of a loaf to about three hours, which is why most supermarket bread now exists.",
  "F|And the reaction to all that speed is the bread revival of the last twenty years: slow fermentation, sourdough, small bakeries, and a great deal of argument about gluten. Fourteen thousand years on, we are still arguing about how long to let the dough stand. Next week: the history of the cooking pot.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset9-s1.wav" $s1
Render "pset9-s2.wav" $s2
Render "pset9-s3.wav" $s3
Render "pset9-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
