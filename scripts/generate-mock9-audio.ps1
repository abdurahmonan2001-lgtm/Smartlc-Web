# Generates the four Mock Test 9 listening recordings with Windows TTS.
# Same conventions as Mocks 1-2 and 8: "F|"/"M|" pick the voice, "P|<seconds>"
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
  "M|Part one. You will hear a woman phoning a furniture store to arrange the delivery of her order. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Orion Furniture, deliveries department. How can I help?",
  "F|Good morning. I ordered some furniture from you last week, and I'd like to arrange the delivery, please.",
  "M|Of course. Could I take your name first?",
  "F|Yes, it's Malika Nazarova.",
  "M|And how do you spell the surname?",
  "F|N, A, Z, A, R, O, V, A. Nazarova.",
  "M|Thank you, Mrs Nazarova. Do you have your order number there? It should be printed at the top of the receipt.",
  "F|I do, somewhere. Here it is. Four seven eight five. Sorry, I should explain - there are two numbers on the paper, and the short one, three three one, is the branch code. The order number is four seven eight five.",
  "M|Four seven eight five, that's the one. Right, I have it on the screen. That's a grey sofa, and a dining table?",
  "F|Not a dining table, no - it's the coffee table, the small round one. My husband did want the dining table, but we decided the room was too small for it.",
  "M|My apologies, you're quite right - coffee table. So, a grey sofa and a coffee table. And the delivery address?",
  "F|Flat nine, sixteen Cherry Street.",
  "M|Could you spell the street for me? Is that Cherry, like the fruit?",
  "F|That's it - C, H, E, R, R, Y. And it's very easy to find, because it's directly opposite the primary school.",
  "M|Opposite the primary school. Noted. And which floor is flat nine on?",
  "F|The fourth. But please don't worry about that - there's a lift in the building, so your men won't have to carry anything up the stairs.",
  "M|That is always good to hear. Thank you.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|So when could you deliver?",
  "M|Let me look at next week for you. We have space on Monday, though I should warn you Monday is always our worst day for delays. Wednesday is completely full.",
  "F|What about Friday? Friday would suit me best.",
  "M|Ah - Friday, oh, sorry, no, we don't go out to your district on Fridays at all. For Cherry Street we deliver on Tuesdays only, and mornings only in that district.",
  "F|Tuesday morning it is, then.",
  "M|Tuesday, lovely. Now, we have two morning slots. Eight until ten, or ten until midday.",
  "F|The early one is no good for me, I take my son to school. Let's say between ten o'clock and midday.",
  "M|Ten till midday. And I should mention the delivery charge. Delivery is free for any order over two million som.",
  "F|Oh - is mine over that?",
  "M|Just under, I'm afraid, so there is a small charge. Normally it would be a hundred thousand som, but as your street is close to our warehouse it comes down to eighty thousand. You pay the driver on the day, in cash.",
  "F|Eighty thousand, to the driver. That's fine. And one more thing - can you take the old sofa away?",
  "M|We can, and this month it's free of charge. In the past we simply took old furniture to the tip, but everything we collect now is recycled - the frame, the foam, the fabric, all of it.",
  "F|Recycled - even better. And how will I know when they're coming?",
  "M|The driver leaves the warehouse at about half past eight, and he'll send you a text - not a phone call, a text - roughly twenty minutes before he arrives.",
  "F|A text. Perfect. Thank you very much for your help.",
  "M|My pleasure. See you on Tuesday.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a parks officer talking to local residents about planned improvements to Northbrook Park. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening everyone, and thank you for coming out tonight. I'm the parks officer for this area, and I'm here to explain what we plan to do with Northbrook Park over the next two years.",
  "F|Let me start with why this is happening now. As many of you know, the park will be a hundred years old the year after next, and yes, we do intend to mark that. But the anniversary is not what set this off. Nor is it - as a letter in the local paper suggested last month - some instruction from central government telling councils to spend money before the end of a budget year. What actually started it was you. Eighteen months ago we posted a questionnaire to every household within a mile of the park, and we had more than two thousand replies. Every item in this plan comes out of the answers you gave us.",
  "F|Now, timing. We had originally hoped to begin in March, and I know that date is still on some of the posters. The tender process took far longer than we expected, so March became impossible. July was then discussed, and the contractors quite rightly pointed out that July is when the park is busiest, with the children off school. So the machinery moves in at the beginning of September, and the main work will run through the autumn and the winter.",
  "F|The question I am asked most often is whether we are closing the park. We are not. I know some people expected it to shut completely for a year, and others have heard that it would open at weekends only. Neither is true. The park stays open every day, exactly as it is now. What will happen is that we fence off whichever area is being worked on, move the fences along as the work moves, and put up signs showing you the way round.",
  "F|And the money. There is a contribution from local businesses, and the city council is paying for the design work and for my time. But the great majority of the cost, close to eighty per cent of it, comes from the national lottery fund. We heard in June that our application had been successful.",
  "F|Before I describe the plans in detail, please look at questions fifteen to twenty.",
  "P|8",
  "F|Right. Let me take you round the park area by area, and tell you what changes.",
  "F|We'll start where you start: the main entrance, the big iron gates on Northbrook Road. The gates themselves are fine, so they stay. But the space around them is grey and dull, and we have commissioned an artist - a sculptor who grew up two streets from here - to redesign that whole entrance area, with stone seating and a mosaic floor. It will look nothing like it does today.",
  "F|Next, the playground. This was far and away the biggest complaint in the survey, and no wonder, because most of that equipment went in when I was at school. We did look at repairing it, but the frames are simply worn out. So everything comes out, and a completely new playground goes in.",
  "F|Then the path around the lake. The surface there is actually perfectly sound, so we are leaving it alone. The problem is that from October to March nobody walks it after four in the afternoon, because you cannot see your own feet. So we are putting in new lighting the whole way round - low columns, warm light, nothing that will disturb the birds.",
  "F|The rose garden is a happier story. It doesn't need rebuilding; it needs hands. From next spring it will be looked after by volunteers. The gardening club has already offered, and we will supply the tools and the training.",
  "F|The cafe, now. It's popular, and on a Sunday afternoon there is nowhere to sit. Several of you asked for longer opening hours, and I'm sorry to say that isn't in this plan. What we are doing instead is extending the building, roughly doubling the space inside, with a new terrace facing the lake.",
  "F|And the sports courts at the far end. They stay exactly where they are - moving them was discussed and rejected, because that corner is the only flat ground we have. But the tarmac dates from the nineteen eighties, it's cracked, and it is dangerous in the wet. It is being dug up and given a new all-weather surface.",
  "F|That is the plan. There are drawings on the tables at the back, and I'll take questions in a moment.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two engineering students, Timur and Zarina, discussing their model-bridge project. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Timur, we have to write the introduction today. Why did we choose a truss design in the first place? Shall I put that Dr Ismailova suggested it?",
  "M|She didn't, though. All she said was that we should choose something we could actually build. No, be honest: it was the field trip. That old railway bridge we walked across in the second week - I stood underneath it looking up at all those triangles and I couldn't stop thinking about it. I came back and told you we had to build a truss.",
  "F|You did. All right, I'll write that. It certainly wasn't because the sums looked easy - a truss has more joints to calculate than anything else on the list.",
  "M|Far more. Right, materials. Do we say balsa wood?",
  "F|We considered balsa, and half the class used it, but it was out of stock at the model shop that week. And we ruled out card almost straight away, because it goes soft. In the end we built the whole thing out of bamboo skewers - the sort you cook kebabs on.",
  "M|Cheap, and surprisingly strong. Good. Now, the first test. That's the painful part.",
  "F|It is, but we have to describe it properly. The bridge collapsed at four kilograms, when our calculations said it should hold fifteen.",
  "M|And the design was sound - we went back over every figure afterwards and the maths was right. What went wrong was the assembly. We were in a hurry and we didn't put enough glue into the joints. They came apart one after another, and the members themselves never even bent.",
  "F|Agreed, it was the joints. And we added the weights slowly, exactly as the instructions said, so nobody can blame us for that either.",
  "M|Then the second bridge. What surprised us there?",
  "F|Well, it held eleven kilograms, which is still under our fifteen, so it didn't beat the calculation. And it broke in a completely different place from the first one - in the deck, not at the end joints.",
  "M|Yes, but the thing neither of us expected was what it did before it broke. The whole structure tilted. The left side dropped a good two centimetres while the right side stayed where it was. We hadn't thought about sideways movement at all.",
  "F|That's true, we hadn't. The leaning was the real surprise. Right - and time. What took the longest?",
  "M|The calculations felt endless.",
  "F|They took two evenings, Timur. Whereas we lost the best part of three days doing nothing whatsoever while the glue set. Twelve hours a stage, and there were four stages.",
  "M|You're right, it was the glue drying. The trips to the shop were nothing, twenty minutes on the bus. All right, and the tutor's comment on the draft report?",
  "F|She was happy with the calculations, and she didn't ask for more photographs - she said there were plenty already. Her one real criticism was that we only show the bridge that worked. She wants the unsuccessful designs in there too - the first collapse, the sketches we abandoned - because that is where the learning is.",
  "M|Fine. More failure, then.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Before we finish, the self-assessment. What actually went well?",
  "M|The drawings, I'd say. They looked professional.",
  "F|They looked lovely, but two of the dimensions on them were wrong, so I can't call that accuracy. I wouldn't claim it. What did work was the way we split the job. You did the modelling and the calculations, I did the building and the testing, and neither of us ever sat around waiting for the other one.",
  "M|That's fair. The division of the work was good. And the budget?",
  "F|We went over it. Not by much, but we did go over.",
  "M|We did. What about the glue - shall we put that down as a success?",
  "F|Honestly, no. It's strong, but it cost us three days. I can't write that down as something that went well.",
  "M|All right. Then my second one is the weight. Six hundred and forty grams for a one-metre span - that's lighter than anything else in the class, and strength against weight is what the competition scores.",
  "F|Yes, put the weight down. Lightness was our best result. Now, the competition bridge. What do we change?",
  "M|The middle of the span, definitely. Both models gave way near the centre, so we add a vertical member and a second diagonal there.",
  "F|Agreed. And I want every joint tested before it goes anywhere near the bridge - glue two pieces together, hang a weight on them, see if they hold. Ten minutes a joint, and we would have caught that first failure before the test.",
  "M|Good idea. Not a new glue, though - the one we have is fine, we just have to allow for the drying time.",
  "F|And I'm not making it shorter. The competition span is fixed at a metre anyway.",
  "M|And painting it would only add weight. So: reinforce the centre, and test the joints first.",
  "F|Perfect. I'll start typing.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about how whales communicate. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good afternoon. Today we are going to look at how whales communicate, and I want to begin not with the animals themselves but with the water they live in.",
  "M|If you dive down in the open sea, the first thing you notice is that the light goes. Even in clear tropical water, light fades within metres, and below a certain depth there is simply nothing to see. So for an animal that spends its whole life down there, vision is of very limited use. Sound, on the other hand, behaves beautifully. It travels roughly five times faster in water than it does in air - about fifteen hundred metres a second - and it carries much further before it fades away. And the lower the sound, the further it goes. The very deepest calls, at the bottom of human hearing and below it, can in the right conditions carry right across an entire ocean. An animal off the coast of Africa may in principle be heard by another off the coast of Brazil.",
  "M|Let us turn to the most famous example of all: the song of the humpback whale. Recordings of it were released on a record in the nineteen seventies and sold in enormous numbers, and they probably did more for the protection of whales than any scientific paper ever has.",
  "M|Several things about this song are worth noting. First, who sings it. Nobody has ever recorded a female humpback singing. The song is produced only by the male whales, and since the singing peaks in the breeding season, the assumption has always been that it is connected with breeding - either attracting females or signalling to other males, and the argument about which of those continues to this day.",
  "M|Second, the structure. This is not random noise. A short unit of sound is repeated to make a phrase; the phrases are repeated in a fixed order, forming what researchers call themes; and the themes then follow one another in the same sequence every time. Having reached the end, the animal returns to the beginning and starts again, and a single performance can continue, with no real break, for many hours.",
  "M|Third, and this is the part students find hardest to believe: at any given moment, all the singers in one region are performing the same version of the song. Not similar versions - the same one. And that version changes. Over a season small alterations creep in, everybody adopts them, and after a few years the song is unrecognisable.",
  "M|Better still, we can watch those changes travel. In the South Pacific, new versions of the song usually appear first near Australia, and then spread east - reaching French Polynesia a year or two later, having passed from population to population along the way. It is, as far as we know, the largest example of cultural transmission in any animal apart from ourselves.",
  "M|Humpbacks are not the only talkers. Sperm whales, which hunt in deep water using echolocation, exchange short patterns of clicks - three clicks, a pause, two more - and these little patterns, which are known as codas, identify the family and the wider clan an animal belongs to. Orcas go further still. Each family group, each pod, uses its own set of calls - its own dialect, in effect - and the calves learn it from their mothers, which is why related pods sound alike and distant ones do not.",
  "M|Now, the difficulty. The sea has become a noisy place. Measurements taken at the same deep-water sites show that background noise in the busy shipping lanes has grown steadily since the nineteen sixties, roughly doubling every decade for much of that time. And the trouble is not simply that it is loud. The sound of a ship's engines and propellers sits in the low frequencies - precisely the frequencies that the large whales depend on for their long-distance calls. Their voices and our engines occupy the same acoustic space. There is evidence that the animals are adapting: some now call louder, some shift the pitch of their calls, and some simply stop and wait for a quieter moment. Whether that is enough, we do not yet know.",
  "M|Finally, a word about method, because this has changed completely within my own career. Identifying individual animals used to depend entirely on photographs. When a humpback dives it lifts its tail clear of the water, and the pattern of black and white markings on the tail is different in every animal, so it works rather like a fingerprint. That is still done, and there are catalogues of tens of thousands of individuals. But listening no longer requires a boat at all. The oceans are now recorded day and night by networks of hydrophones - underwater microphones, anchored to the sea floor, sending back years of continuous sound. No human being could ever listen to all of it, so computer programs sort through the recordings automatically, picking out the calls and classifying them. We now have far more data than we can yet explain.",
  "M|That is the end of part four. You now have some time to check your answers.",
  "P|5"
)

Render "mock9-s1.wav" $s1
Render "mock9-s2.wav" $s2
Render "mock9-s3.wav" $s3
Render "mock9-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
