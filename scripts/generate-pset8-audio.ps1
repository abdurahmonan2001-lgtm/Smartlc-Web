# Generates the four Practice Set 8 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a man telephoning an adult learning centre to enrol on an evening course. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good evening, Northgate Adult Learning Centre, Malika speaking.",
  "M|Oh, good evening. I saw your leaflet in the library - I'd like to enrol on the furniture restoration course, if there are still places on it.",
  "F|There are, yes. Two left, in fact, so you've timed that well. It runs for ten weeks, one class a week, and it's the same tutor all the way through. Shall I take your details and put you down?",
  "M|Yes, please do.",
  "F|Right. Can I have your name?",
  "M|It's Jasur Karimov.",
  "F|And could you spell the surname for me?",
  "M|Of course. K, A, R, I, M, O, V. Karimov.",
  "F|Thank you. Now, the evening. We used to run this class on Tuesdays, and quite a few people still think we do, but the tutor teaches at the technical college on Tuesday evenings now, so we moved it. It's Thursday evenings this year, from half past six until nine.",
  "M|Thursday. That actually suits me better.",
  "F|Good. As for the start, the first class was going to be the eleventh of September, but the workshop is being rewired that week, so we've put the whole course back. It now begins on the eighteenth of September and finishes just before the winter holiday.",
  "M|The eighteenth of September. Fine.",
  "F|And do note where to come, because people get this wrong every single term. Most evening classes are in the main building, but ours isn't. We are in the Cedar Workshop, which is the long, low brick building behind the main block. Follow the path past the bins and you'll see the sign on the door.",
  "M|The Cedar Workshop, behind the main building. And what does the course cost?",
  "F|It's three hundred and twenty thousand som for the whole ten weeks. It was two hundred and eighty last year, I'm afraid, but the price of materials has gone up and we've had to pass some of that on.",
  "M|Three hundred and twenty. Do you want a deposit from me now, over the phone?",
  "F|No, no deposit. You pay the full amount at the first class, in cash or by card, whichever is easier for you. And I should say there are never more than twelve students in the workshop, so nobody gets ignored.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "M|Is there anything I need to bring with me?",
  "F|There is one thing, and it matters, because we start work in the first hour. Everybody brings an old chair to restore. A table is far too big for our benches and a cupboard is simply impossible, so please, a chair - and the older and more broken it is, the more you'll learn.",
  "M|An old chair. I've got three in the garage.",
  "F|Perfect. We supply absolutely everything else - the tools, the wood, the glue and the varnish are all included in the fee, so there is nothing else to buy. Oh, but do bring an apron, or at the very least old clothes. Stripping varnish is filthy work and the dust gets into everything.",
  "M|An apron. Right, I'll find one.",
  "F|We also ask everyone to tie long hair back, and no open shoes in the workshop at all - that's a safety rule and the tutor is very strict about it. Now, one more question: are you a student anywhere?",
  "M|I am, actually. I'm at the technical institute during the day.",
  "F|Then bring your student card along to the first class and you'll get ten per cent off the fee. We offer the same to pensioners, but it's the student discount people always forget to claim.",
  "M|That's very useful, thank you. Is there anywhere to park?",
  "F|Not on the site itself, no - the yard is full of the tutors' vans by six o'clock. But there's a multi-storey car park in Mill Street, just opposite the gate, and it's free after six in the evening. Whatever you do, don't leave a car on Bridge Road. They are extremely quick with the tickets there.",
  "M|Mill Street. Got it.",
  "F|And the last thing is your confirmation. We e-mail most of our students, but the workshop list goes out by post, because it has a map of the site and a materials sheet folded in with it. So watch for it in the post - it should reach you within about a week.",
  "M|By post. Lovely. Thank you very much indeed.",
  "F|You're very welcome. We'll see you on the eighteenth.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the secretary of a community allotment site talking to a group of new plot holders. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everybody, and welcome to Larkfield Allotments. You have all just been given a plot, so this half hour is about how the site works and what our rules actually mean in practice.",
  "F|A word first about where we are, because there are three stories and only one of them is true. People often assume the site was once part of the big house garden up the hill. It wasn't, although that old wall at the top does belong to the house. Others have been told it was the school playing field; the playing field is on the far side of the road and always has been. In fact this long strip of ground belonged to the railway. It was the embankment side, left over when the line was straightened in the nineteen thirties, and the railway rented it out to its own workers for vegetables. When the line closed, the council took it on, and we have been growing here ever since.",
  "F|Next, the waiting list, because your friends will ask you about it. I won't pretend it is short. Four years ago people were waiting three years for a plot, which was frankly indefensible, so we divided the largest plots and nearly doubled the number of tenancies. The wait now is about eighteen months. One or two of you waited only six months, which is very unusual, and I'd rather you didn't mention that too loudly to your neighbours.",
  "F|Now, losing a plot. The rent is due in March and hardly anybody forgets it - in ten years I have taken back exactly one plot for unpaid rent. Bonfires cause endless argument, but nobody has ever lost a tenancy over one. What we do take plots back for, about six a year and it always upsets me, is simple neglect: a plot that has not been dug or planted for an entire season, when two hundred people are waiting for it. We write to you twice before we act, so it never comes as a surprise.",
  "F|And the change this year, which several of you have already heard about, is bonfires. From April there is no burning on the site at any time, for any reason. The committee vote was very close, the argument in the shed afterwards went on for two hours, and I am still getting letters about it. By comparison, the new fee structure and the longer opening hours at the shop passed without a murmur.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Right. Let me take you round the site in order, because the rules are not the same in every part of it.",
  "F|We start at the top field, above the path. That is where the very biggest plots used to be, and that is where the division I mentioned happened: every plot up there has been cut into two. So if your number is in the eighties, you have half a plot, a shared water butt and a really excellent hedge.",
  "F|Below that are the lower plots, along the ditch. That is the best soil on the whole site and everybody wants to be there, but I have to be honest with new tenants: they flood after heavy rain, twice most winters, and anything you leave lying on the ground in December will float away.",
  "F|Beyond the lower plots is the orchard, and the orchard is nobody's plot. Those trees belong to the whole site. We prune them together in February, we pick together in September, and the fruit is shared out at the gate on the last Sunday of the month.",
  "F|Coming back up the path you pass the store hut, where the tools and the seed potatoes live. The store hut is shut at the moment. The roof came off in the January gales and the insurers are still arguing with the builder, so it stays locked until the repairs are finished. Ask me if you need a spade in the meantime.",
  "F|Next to it is the pond, which the children from the primary school helped us to dig. Please keep out of it this summer: it is being surveyed for wildlife, and a group from the university is counting frogs and dragonflies there every fortnight until the autumn.",
  "F|And finally the car park, which is the one thing on this site that nobody complains about. It was resurfaced last year with money from the garden centre out on the ring road. They paid for the entire job in exchange for a small sign on the gate, and we were very glad of it.",
  "F|Two rules that apply everywhere, and then I'll let you go. Nobody on the site after dark, please, and dogs on a lead at all times.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two geography students, Dilshod and Sabina, discussing a traffic count for their project. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Sabina, we need to write the introduction to the traffic project. How do we explain why we picked the topic?",
  "F|Honestly? Because the residents' association asked us to. They wrote to the department in October saying they wanted evidence about the junction before the council consultation, and we said yes.",
  "M|That's true. I was going to write that it came out of Doctor Yusupov's lecture on air quality, but that would be inventing things - the lecture was in November. And it certainly wasn't the data from last year's group; we couldn't even open their files.",
  "F|Then we write what actually happened. A community request is a perfectly respectable reason. Now - the pilot count on Saturday. That did not go well.",
  "M|It didn't. The weather was fine, so we can't blame that, and the corner we stood on was near enough to the junction to see everything clearly. The problem was us. Your total was four hundred and six and mine was three hundred and sixty-one, for the same fifteen minutes.",
  "F|Forty-five vehicles apart. That's the thing we have to fix before we do anything else, and the fix is a proper agreement about what counts as what.",
  "M|Agreed. Now, how long do we count for? I still quite like the idea of one long stretch - four hours, straight through, one Tuesday morning.",
  "F|But then all we know about is Tuesday morning. The residents are complaining about the school run and about the evening. I'd rather do one hour at three separate times - early morning, the middle of the day and the evening peak - and repeat that on two days.",
  "M|Three separate hours. Yes, that's better evidence. And a whole Saturday would just tell us about the supermarket.",
  "F|Exactly. Now, the tutor. I showed her the pilot sheet on Monday and she made one change. She wasn't bothered about the length of the count and she said the site was fine, but she wants us to record the direction of every vehicle as well as the type - so, northbound or southbound, not just a tick in a box.",
  "M|That doubles the columns, but I can see why. Half the argument is about the rat run, and you can't show a rat run without direction.",
  "F|Right. My worry is something else, though. There are roadworks starting on the bridge next month, and if they close a lane the traffic through our junction will be nothing like normal.",
  "M|Ah. So we count before the roadworks begin, or we admit in the report that the figures are affected.",
  "F|Before, if we possibly can. And for the write-up, the useful thing is the comparison. The council did a count at the same junction five years ago and the figures are public.",
  "M|That's much better than comparing with the national average, which I was going to do. Five years of change at the same spot - that's an actual finding.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, categories. We obviously count cars and lorries, but what do we separate out beyond that?",
  "M|Buses were my first thought.",
  "F|But we already know the buses. There are six an hour and they run to a timetable - we can copy that off the internet. It would be a wasted column.",
  "M|Fair enough. Bicycles, then. The residents' letter is half about cycling, and nobody has ever counted them here.",
  "F|Bicycles, definitely. And the other one has to be delivery vans. The whole complaint is that the street has filled up with deliveries since the warehouse opened, and if we don't count them separately we can't test that at all.",
  "M|Bicycles and delivery vans it is. Motorcycles?",
  "F|There are about three an hour. Not worth a column - they can go in with cars. And I'd leave taxis out too; at a distance you simply cannot tell a taxi from an ordinary car, and a category we can't apply reliably is worse than no category.",
  "M|Agreed. Right - what still has to happen before Thursday?",
  "F|Safety first. The department won't let us stand at a roadside without high-visibility jackets, and they're kept in the equipment store, so somebody has to go and sign for them.",
  "M|I'll do that tomorrow. Do we need to tell the police we're there?",
  "F|No - I checked. We're on the pavement and we're not stopping anybody, so no permission is needed. And the standing place is sorted; we chose it during the pilot.",
  "M|Then the other job is the recording sheets. The new ones with the direction columns only exist on my laptop, and there's no power at the junction, so we can't use the tablet.",
  "F|Then print them - plenty of spares, and on thick paper in case it rains. High-visibility jackets and printed sheets, and we're ready.",
  "M|I'll print them tonight. See you Thursday.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of salt. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we looked at the spice trade. Today I want to talk about a substance that is far cheaper and was once far more important: salt.",
  "F|Start with why it mattered so much. The human body cannot store salt in any quantity, so it has to be taken in regularly, and a diet built on grain and vegetables simply does not supply enough. That is the biological reason. The economic reason is bigger. Before refrigeration, salt was the only reliable way of keeping food through the winter, and above all of preserving fish. A barrel of salted herring could travel a thousand miles and feed a city in February. Take salt away from medieval Europe and the whole food system collapses.",
  "F|So how was it made? The oldest method is the simplest. Sea water was let into shallow ponds near the coast and left there until it dried out under the sun and the wind, leaving a crust that could be raked up. It costs almost nothing and it is still done today. The alternative was to mine it. At Hallstatt in Austria, rock salt was being cut out of the mountain from about a thousand years before Christ, and the mines there have given archaeologists an extraordinary gift, because salt preserves whatever it touches. The miners' clothing, their wooden tools, their leather bags - all of it came out of the rock looking almost new after three thousand years.",
  "F|The most technically impressive producers, though, were the Chinese. In Sichuan, salt was not dug but pumped: engineers reached brine hundreds of metres down using drills and casings made of bamboo, and they were doing this two thousand years before anybody in Europe drilled a comparable well. Those same wells often produced natural gas, which the Chinese piped off and burned to boil the brine dry - an industrial system, complete, and very early.",
  "F|Now, salt and government. Because everybody needs salt and only some places produce it, salt travels, and because it travels it can be taxed. Roman soldiers were given a special allowance to buy it, and that allowance is where the English word salary comes from. One of the oldest roads in Italy, the Via Salaria, was built to carry salt inland from the coastal pans. Across the Sahara the same trade ran on an even grander scale: slabs of salt cut in the desert were loaded onto camels and carried south for hundreds of miles, and in some markets they were exchanged for gold by weight.",
  "F|Taxation is where salt enters political history. In France, the salt tax was so heavy, and so unequal from province to province, that a whole criminal economy grew up around avoiding it: thousands of smugglers were arrested every year, and resentment of the tax is one of the grievances that fed the Revolution. The most famous example is more recent. In nineteen thirty, protesting against the British monopoly in India, Gandhi walked for twenty-four days to the sea and made salt from the water in front of the world's press. He was arrested; the point was made.",
  "F|Finally, the modern picture, which surprises most people. In the nineteenth century salt stopped being mainly a food and became a raw material for the chemical industry: it was the starting point for making soda, and soda is needed for glass, for soap and for paper. That change is what turned salt from a luxury into a bulk commodity. Then, from the nineteen twenties, small amounts of iodine were added to table salt in many countries, which almost eliminated a widespread disease of the thyroid. And today, in cold countries, the largest single use of salt is not in food at all: far more of it is spread on the roads each winter than is ever eaten.",
  "F|Two thousand years of preserving, taxing and rebelling - over a mineral we now buy without noticing the price. Next week, sugar.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset8-s1.wav" $s1
Render "pset8-s2.wav" $s2
Render "pset8-s3.wav" $s3
Render "pset8-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
