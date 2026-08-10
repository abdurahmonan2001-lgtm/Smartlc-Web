# Generates the four Mock Test 6 listening recordings with Windows TTS.
# Same conventions as Mocks 1-5: "F|"/"M|" pick the voice, "P|<seconds>" is
# a silent question-preview pause; post-2020 announcer format throughout.
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
  "M|Part one. You will hear a woman phoning a taxi company to book an airport transfer for her family. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Comet Cars, good morning. How can I help you?",
  "F|Good morning. I'd like to book a car to take my family to the airport, please.",
  "M|Certainly. Could I take your name first?",
  "F|Yes, it's Nilufar Rustamova.",
  "M|And how do you spell the surname?",
  "F|R, U, S, T, A, M, O, V, A. Rustamova.",
  "M|Rustamova, thank you. And how many of you will be travelling?",
  "F|There are five of us altogether - two adults and three children.",
  "M|Five passengers, two adults and three children. Now, what date is the journey?",
  "F|It's the twelfth of August - oh, sorry, no, that's last summer's booking on the screen in front of me. The flight is on the twenty-second of August.",
  "M|The twenty-second. And what time does the flight leave?",
  "F|It departs at nine fifteen in the morning, from Terminal 2.",
  "M|Nine fifteen from Terminal two. Normally for a nine fifteen flight I'd send the car at six o'clock, which gives you three hours. But with three children and August traffic on the airport road, I'd rather give you a bit more room. Let's make it half past five.",
  "F|Half past five in the morning. Painful, but sensible.",
  "M|And where should the driver collect you from?",
  "F|Fourteen Maple Street.",
  "M|Could you spell the street for me? Is it M, A, P, E, L?",
  "F|No, Maple like the tree. M, A, P, L, E. Maple Street. It's the block opposite the small park, so the driver won't miss it.",
  "M|Fourteen Maple Street, opposite the small park. I have that.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "M|Now, the vehicle. With five of you and your luggage, a standard car simply won't do - it's far too small for a family your size. What I'd send you is a minivan. It seats seven, and there's room for six suitcases in the back.",
  "F|A minivan sounds right. We'll have four large cases and a couple of bags.",
  "M|That will fit easily. As for the price, the standard car is a hundred and twenty thousand som, but as I say, that's not an option for you. The minivan to the airport is a hundred and eighty thousand som.",
  "F|A hundred and eighty. Does that go up for the luggage, or for the early hour?",
  "M|Neither. It's a fixed price, and luggage is included, so there's nothing extra to pay for the cases.",
  "F|Good. One more thing - our youngest is three. Do you have anything for her?",
  "M|We do. The driver will fit a child seat, and there's no charge for that at all - we provide it free.",
  "F|Wonderful. And can I pay by card?",
  "M|You pay the driver directly, and honestly I'd suggest cash. The card machines in the cars work most of the time, but they're often unreliable, and the last thing you want at half past five in the morning is a machine that won't connect.",
  "F|Cash to the driver, then. And could you book the return as well? We land on the tenth of September.",
  "M|Of course. Your driver will be waiting inside the building - not out at the taxi rank, and not by the exit doors, because people miss each other there every day. He'll stand beside the escalator in the arrivals hall, holding a card with your name on it.",
  "F|Beside the escalator. Got it. And will I get anything in writing?",
  "M|We used to telephone people the night before, and we still email the invoice afterwards, but the reminder itself now goes by text. You'll get a text the evening before each journey with the driver's name and his mobile number.",
  "F|A text the evening before. That's everything, I think. Thank you very much.",
  "M|Our pleasure. Safe travels.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the manager of the Oakfield Sports Centre talking about its new facilities and changes to its opening arrangements. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming to our reopening evening. I'm Ruth, the manager here at Oakfield, and I'd like to explain what we've done to the building and what changes from next week.",
  "F|Let me start with the closure, because I know four weeks without a sports centre was frustrating. There were stories going round that we'd been flooded. It's true we had water across the lower floor two winters ago, but all of that was repaired long before June. Somebody else told me we were fitting a new heating system for the pool - that project is on the list for next year, not this one. The real reason we shut is much duller: the changing rooms. They were the original ones from the nineteen-eighties, the pipework was failing, and taking them out and building new ones meant closing the whole building while the work was done.",
  "F|Now the good news. Upstairs, where the old storeroom was, we have a new fitness studio - mirrors along one wall, a sprung wooden floor, and far better ventilation than the old hall. Two things people keep asking me about it. First, no, it isn't only for members; anyone can pay at the desk and come in, exactly as before. Second, I'm sorry to say you can't hire it for parties or private events - our insurance doesn't allow that. But here is the offer I want you to remember: for the whole of the first month, every single class in that studio is completely free. Come to all of them if you like.",
  "F|Opening hours. Saturday evenings stay exactly as they are, closing at nine, and I'm afraid Sunday morning is still not happening - we can't staff it. What has changed is the start of the day. Monday to Friday we always used to open at seven; from next week the doors open at half past five in the morning, for everyone who wants to swim or train before work.",
  "F|And booking a class. Until now you've either rung reception or come to the desk, and on Monday mornings that queue has been out of the door. From next week, all class bookings move to our new phone app - search for Oakfield Leisure and you'll find it. The website will still show you the timetable, of course, but the actual booking has to be done in the app from now on.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Right. Let me take you round the facilities themselves, one at a time, because each has its own news.",
  "F|The swimming pool first. Physically it's unchanged - same six lanes, same water, same slightly grumpy lifeguards. What has changed is the pricing. Between ten in the morning and three in the afternoon, when the pool is practically empty, a swim now costs half the usual price. So if you can come mid-morning, you'll pay considerably less than the people who come at six.",
  "F|The gym. The machines in there were fifteen years old and held together mostly by hope. Every one of them has been taken out and replaced - the treadmills, the bikes, the rowing machines, the whole weights section. There is nothing in that room now that was there in May.",
  "F|The climbing wall. Our old wall was popular with experienced climbers, and one or two of them have already told me what they think of the new one. But the new wall is deliberately different: the routes are gentle, the holds are large and obvious, and there's an instructor on the mat every evening. It has been built for people who have never climbed before, and that is exactly who we hope to see on it.",
  "F|The cafe. Please don't go upstairs looking for it - it isn't there any more. It's now on the ground floor, in the corner by the main entrance, where the old office used to be. Same staff, same cakes, much better view.",
  "F|The tennis courts, I'm sorry to say, you can't use at the moment. The surface is being relaid and the whole area is fenced off. Give us three weeks and they'll be back exactly as they were.",
  "F|And the sauna. This is the one part of the building that isn't ready. The tiling is finished, but we're still waiting for the equipment to arrive, so it won't open with everything else - we're aiming for November. Keep an eye on the noticeboard by the door.",
  "F|That's everything from me. There's tea at the back, and I'll be here for another half hour if you have questions.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear a business student called Madina discussing her marketing survey of the campus cafe with her tutor. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Come in, Madina. Right - the customer survey. Before we look at your questions, remind me how you ended up choosing the campus cafe.",
  "F|Well, you did mention it once in a seminar, but that wasn't really the reason. And I should admit I hardly ever eat there myself - I bring sandwiches from home. What actually happened was that the manager, Bekzod, came to our marketing society in March and said he had no idea what his customers wanted, and could a student find out. I put my hand up.",
  "M|So the request came from him. That's the best possible start - you have a client who wants the answers.",
  "M|Good. Now, collecting the answers. What's your plan?",
  "F|My first idea was to stand near the door and interview people as they left.",
  "M|Mm. Thirty seconds after buying a coffee, with a queue behind them, people will tell you anything to get away.",
  "F|That's what I decided too. So then I thought about paper forms left on the tables.",
  "M|Cheaper. And then you spend a week typing three hundred of them into a spreadsheet, half with coffee spilt on them.",
  "F|Which leaves the option I actually prefer. I put a small printed code on every table, people scan it with their phone, and it opens the form online. The answers come straight in, already in a spreadsheet.",
  "M|The code on the table. Yes - that's the one. It costs almost nothing and the data arrives clean.",
  "M|Now, your draft questions. I read them last night.",
  "F|Be honest.",
  "M|They're not too long, and there's nothing intrusive - you don't ask anybody's age or income. My problem is the wording. Question four asks how much people enjoy the new seating area. You've decided the answer before the customer opens their mouth. Question seven asks whether they agree the coffee is good value - the same fault. You're pushing people towards the reply you want.",
  "F|Ah. Leading questions.",
  "M|Every one of those has to be rewritten neutrally, or your results are worthless.",
  "F|Understood. Next problem - who should I be asking? I was thinking of limiting it to students.",
  "M|Why?",
  "F|Because it's a student cafe, mostly.",
  "M|Mostly, yes, but not entirely. Think about who Bekzod serves.",
  "F|So students and university staff, then? The lecturers do come in.",
  "M|Wider than that, even. There are people from the offices across the road, and parents waiting at the sports centre. If somebody buys something in that cafe, their opinion counts. Anyone who uses it.",
  "F|Right - anyone who uses the cafe. Now, to get enough responses I'd like to offer a prize. A fifty thousand som voucher, drawn at random.",
  "M|The money isn't the issue - fifty thousand is nothing. And it's perfectly permitted; the department runs prize draws all the time. What worries me is who a prize brings in. The ones who chase a voucher tend to be a single crowd, the younger students with time on their hands - and your sample will look nothing like the cafe's real customers.",
  "F|So the prize distorts who answers.",
  "M|That's my concern, yes.",
  "M|And before this goes out to anybody - what's your final step?",
  "F|Show it to Bekzod, I suppose, so that he's happy with it?",
  "M|He'll see it eventually, but he's a cafe manager, not a market researcher - his approval tells you nothing about whether the questions work. And translating it into other languages, which I know you were considering, can wait for version two.",
  "F|So what should I do?",
  "M|Take ten people - your flatmates, the students sitting near you - and watch them fill it in in front of you. You will find three questions nobody understands. Test it small, first.",
  "F|A trial run with about ten people. Understood.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So which topics have to be in the survey? I have five on my list. Opening hours.",
  "M|Fixed by the university, and Bekzod can't change them however many people complain. That just wastes a question.",
  "F|Prices, then.",
  "M|Ask anyone whether food is too expensive and you know the answer before you print the form. It tells him nothing he can use.",
  "F|What about how comfortable the seating is?",
  "M|The furniture was replaced in January, and it won't be replaced again this decade.",
  "F|Then that leaves the queues, and the food choice.",
  "M|The queues, absolutely. How long people wait is the complaint I hear most often, and it's the one thing he could fix by changing his staffing. That goes in. And on food, don't ask a general question - ask specifically about the vegetarian dishes. He's been trying to decide for a year whether to expand that part of the menu, and your survey could settle it.",
  "F|So the length of the queues, and the choice of vegetarian dishes. Those two definitely go in.",
  "M|Those are your two. Now - what happens between today and next Friday?",
  "F|I was going to design the posters advertising the survey.",
  "M|Not yet. You'd be advertising a survey that doesn't exist. And there's nothing to write up either, since you have no data.",
  "F|Fair enough. I do need to sit down with Bekzod, though. I want his permission for the codes on the tables, and I'd like to hear what he thinks he's getting wrong.",
  "M|Yes. Meet him properly, with a notebook - that's your priority. And do one more thing that costs you nothing. Take a lunch hour, buy a tea, sit in the corner and watch. Count the queue, time how long people wait, see who comes through the door.",
  "F|A lunchtime just observing. That feels lazy.",
  "M|It isn't lazy, it's research. An hour of watching will tell you what to ask.",
  "F|So next week: meet the manager, and spend a lunchtime observing. Should I interview the staff as well?",
  "M|Later, if at all. Two things is plenty for one week.",
  "F|Right. Thank you.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of chocolate. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good afternoon. Today I want to trace the history of a product that almost everybody in this room has eaten this week without a second thought: chocolate.",
  "F|We start in the rainforests of Central America, because that is where the cacao tree grows, and the tree is a demanding neighbour. It will only live where the temperature stays high all year round; it needs shade, since in the wild it grows in the shadow of taller forest trees; and it needs a great deal of rain. Heat, shade and heavy rainfall - remove any one of the three and the tree simply fails. That is why cacao is still confined to a narrow belt on either side of the equator.",
  "F|The fruit is a pod about the size of a small melon, and inside are thirty or forty beans in a white pulp. A raw bean tastes of nothing you would recognise. Three steps change that. The beans are heaped up and left to ferment for several days, and it is during fermentation that the chocolate flavour is created. They are then spread out and dried, traditionally in the sun. And finally they are ground into a thick, dark paste.",
  "F|What the Maya, and later the Aztec peoples, did with that paste was not to eat it. The idea of a solid bar lay three thousand years in the future. They mixed the paste with water and poured it from one tall vessel into another to raise a foam - in other words, they whipped it into a drink. And bitter is exactly the right word: there was no sugar in it at all, and most modern visitors would put the cup down after one mouthful. It was flavoured instead with chilli, which gave it heat, and with vanilla, which grew in the very same forests.",
  "F|The beans had a second life, too. In the Aztec empire, cacao beans circulated as money. We have surviving price lists: so many beans for a turkey, so many for a day of a labourer's work. They were valuable enough to be used as money, and, inevitably, people made false ones out of clay.",
  "F|Now, Europe. Chocolate travelled back on Spanish ships and reached Spain in the sixteenth century, where the court disliked it intensely at first - far too bitter for European mouths. The solution was obvious and it changed the product permanently: they added sugar. Cinnamon came in too, and they took to serving it warm, but sugar is the change that mattered.",
  "F|From Spain the fashion spread. By the sixteen hundreds London, Paris and Amsterdam all had chocolate houses - fashionable rooms where wealthy men sat for hours, drank the stuff hot, read the newspapers and gambled. And note who was drinking it: the rich, and only the rich. The reason was not the cost of making it. Governments had found a luxury they could charge for, and the import taxes on cocoa were so heavy that they kept the price beyond the reach of ordinary people for two centuries.",
  "F|Which brings us to the technology that turned a drink into a bar. Three dates will do.",
  "F|Eighteen twenty-eight. A Dutch chemist named Van Houten built a press that squeezed the roasted bean hard enough to force out its fat, and that fat is cocoa butter. Roughly half the weight of a bean is butter, and separating it out left a dry cake behind, which could be milled into a fine powder. That is the cocoa powder we still buy today, and its virtue is that it mixes easily into hot water or milk.",
  "F|Eighteen forty-seven. An English firm in Bristol took the cocoa butter that the press produced, added it back to cocoa powder and sugar, and found that the mixture could be poured into a mould and left to set hard. The result was the first solid chocolate bar sold to the public. Chocolate was now something you carried in a pocket rather than something you drank.",
  "F|Eighteen seventy-five. In Switzerland, after years of failures - because fresh milk ruined every attempt - the answer turned out to be milk that had been dried into a powder. Using dried milk, Swiss makers produced the first successful milk chocolate and built a national industry on it.",
  "F|One more Swiss contribution, and it concerns texture. Early bars were unpleasantly gritty on the tongue. Rodolphe Lindt found that if the warm liquid chocolate is stirred, and stirred again - for hours, in some factories for as long as three days - the solid particles are worn down until nothing can be felt, and the chocolate becomes perfectly smooth. The process is called conching, after the shell shape of the original machine.",
  "F|And so to the industry today, which has moved a long way from Central America. Something like seventy per cent of the world's beans are now grown in West Africa - Ivory Coast and Ghana above all - on millions of very small family farms.",
  "F|The supply chain is extraordinarily tangled. Beans are bought by traders, shipped and blended in bulk, which means a single bar in your bag may contain beans from several different countries, and the company selling it often cannot tell you which ones.",
  "F|And that leads to the problem we shall spend next week on. Of everything you hand over at the counter, the growers themselves receive only a small share of the final price - a few per cent, in most estimates - while the bulk of the money stays with the manufacturers and the retailers.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock6-s1.wav" $s1
Render "mock6-s2.wav" $s2
Render "mock6-s3.wav" $s3
Render "mock6-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
