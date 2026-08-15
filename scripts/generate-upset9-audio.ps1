# Generates the four Upper-Inter Set 9 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman phoning the organiser of a weekend craft fair to book a stall. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Maplebridge Craft Fair, good morning. Anvar speaking.",
  "F|Oh, hello. I make handmade candles, and a friend who had a stall with you last year suggested I apply. Could I book a stall for this summer's fair?",
  "M|Of course - we always like new makers. Let me open a booking form. Could I take your name first?",
  "F|Yes, it's Farida Karimova.",
  "M|Would you spell the surname for me? I want it right on the stall sign.",
  "F|K, A, R, I, M, O, V, A. Karimova.",
  "M|K, A, R, I, M, O, V, A. Lovely. And what is it you sell? You said candles?",
  "F|That's right - handmade candles. I make them from local beeswax, so they're completely natural.",
  "M|Handmade candles, made from local beeswax - I'll put exactly that in the fair programme. Now, the fair runs over one weekend this year, the twenty-first and twenty-second of June. Did you want both days?",
  "F|Just one day to start with, I think. The Saturday, ideally - I imagine that's the busier day.",
  "M|It is, and I'm afraid that's the problem: the Saturday stalls sold out weeks ago. I still have space on the Sunday, though.",
  "F|Hmm. Sunday... yes, all right, let's say the Sunday only. Better than missing the fair altogether.",
  "M|Sunday it is. Now, stall size. The standard stall is two metres wide, but with candles you'll want room for display stands, I'd have thought.",
  "F|I was wondering about that. What's the next size up?",
  "M|Three metres. Honestly, for your first fair I'd go for that - the extra metre makes a real difference when people crowd round.",
  "F|Fine - let's make it three metres, then.",
  "M|Three metres, noted. Now, the cost. That size is two hundred thousand som - oh, hold on, no, I'm looking at the corner stalls. A standard three-metre stall is one hundred and eighty thousand som for the day, and that includes a table and two chairs.",
  "F|One hundred and eighty thousand - fine, that's less than I feared.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Now, I melt wax on site for little demonstrations, so I'd need power at the stall. Is that possible?",
  "M|It is, in the courtyard. An electricity socket is an extra twenty-five thousand som, and you must book it in advance - we can't add sockets on the morning of the fair.",
  "F|Twenty-five thousand - please add that to my booking, then. And where exactly would my stall be?",
  "M|Candle makers usually do best outside, and I've got one courtyard stall left, right beside the fountain. People always stop there for photographs, so you'd get plenty of passing trade.",
  "F|Beside the fountain - perfect, I'll take it.",
  "M|Now, what to bring. The table and chairs are provided, remember, so no furniture. What you do need to bring is a banner for the front of the stall, with your business name on it - we used to print signs for everyone, but the costs got silly.",
  "F|A banner - I'll have one made this month. Anything else I should know?",
  "M|One rule to remember: nobody may sell food or drink without a licence, so keep strictly to the candles. And there's one piece of paperwork - before the fair you must email us a copy of your insurance certificate. Public liability - most craft insurance includes it as standard.",
  "F|My insurance certificate - no problem, I renewed it only last month. And what time should I arrive on the day?",
  "M|Setting up starts early. Arrive by eight forty-five - no, wait, I'm reading the indoor list. You're in the courtyard, so arrive by eight fifteen, because the gates shut to cars at nine, and you'll want everything unloaded well before that.",
  "F|Eight fifteen, understood. Thank you so much - you've been really helpful. See you in June!",
  "M|We look forward to it. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
    "P|5"
)

$s2 = @(
  "M|Part two. You will hear a guide welcoming visitors to a restored watermill beside a river. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good morning, everyone, and welcome to Alderford Mill. I'm Tom, one of the volunteer guides, and before we go inside I'll give you a little background and a few practical points.",
  "M|There has been a mill on this spot beside the river for at least four hundred years, grinding flour for all the villages around. People sometimes assume it shut down because of the great flood of 1928 - the water did reach the first floor, and you can still see the mark on the staircase wall - but the mill was repaired and worked for years afterwards. Others imagine the last miller simply retired with nobody to follow him. In fact he stayed on, grinding animal feed, well into his seventies. What really finished the mill as a business was the flour itself: the big steam-driven roller mills in the cities could produce whiter flour at half the price, and by the 1950s no bakery would pay extra for stone-ground. The wheel stopped turning in 1957.",
  "M|The restoration took our trust nearly twelve years. You might expect that a national heritage grant paid for it - we certainly expected so, but our applications were turned down twice. Local companies were generous with materials - the timber yard, the ironworks - yet materials were never the main cost. In the end, almost all the money came from ordinary people: thousands of small public donations, collected over a decade, jar by jar and envelope by envelope. This building belongs, quite literally, to the people who visit it.",
  "M|Now, we do grind flour again, every week, and yes, you can buy it. Let me clear up two rumours at once. A supermarket chain did approach us, and we said no; a local bakery asked as well, but we simply cannot produce the quantity they need. So our flour is sold only here at the mill itself, in the little shop by the entrance - and when the week's sacks are gone, they're gone.",
  "M|One more thing before we set off. Out in the yard, please keep to the marked route, because delivery vehicles come through. Bags can be left in the lockers in the office if you'd find the stairs easier without them - that's entirely up to you. But the rule I must insist on is this: please do not touch any of the machinery, even when it looks perfectly still. Parts of the mill can begin moving without warning when the water is let through, and the gearing is quite capable of taking a finger.",
  "M|Before we begin the tour, please look at questions fifteen to twenty.",
  "P|8",
  "M|Now, let me tell you what you'll see, in the order we'll visit.",
  "M|We start outside with the waterwheel itself. The original wheel rotted away decades ago, so the one you see today is a faithful copy, rebuilt by our carpenters using oak grown here on the estate - the same trees the first millwrights would have used.",
  "M|Inside, on the ground floor, are the millstones. Ours were lost during the years the mill stood empty, so the pair working today came from another mill - a mill at Denholm, thirty miles downriver, that was demolished for a road scheme. Its stones have found a second life here.",
  "M|Above them is the sack hoist, the wooden lift that raises the grain to the top floor. I'm afraid you'll see it standing silent: one of its bearings failed in the spring, and it will be repaired later this year, once the new part has been cast.",
  "M|Next to the stones you'll find the drying kiln, where damp grain was dried before grinding. And here is something remarkable: the kiln is the only original part of the mill still in place - every tile and every timber is exactly where it stood four centuries ago. Everything else around you is restoration.",
  "M|Out on the riverbank is the sluice gate, which controls the water reaching the wheel. At two o'clock, and again at four, visitors can operate the sluice gate themselves, under our supervision - children especially love bringing the wheel to life.",
  "M|And finally, the miller's cottage beside the gate. We no longer show it as a house; it is used for school workshops, so if you hear flour being ground by hand, and a great deal of laughter, that will be year four from Alderford Primary.",
  "M|Right - follow me, and mind the step at the door.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
    "P|5"
)

$s3 = @(
  "M|Part three. You will hear two chemistry students, Jasur and Madina, discussing their project on recycling batteries. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Right, Madina - the introduction. We need a sentence on why we chose battery recycling. Should I say the idea came out of Professor Aliyeva's lecture on metals?",
  "F|We could, but it wouldn't really be true, would it? The lecture came weeks later. And people keep assuming it's because of my weekend job at the electronics shop, but honestly, that had nothing to do with it either. What actually started it was that news report - the fire at the waste depot outside town, the one caused by old batteries thrown in with ordinary rubbish. That report was the start of everything.",
  "M|The fire it is, then - it makes a strong opening. Now, the aim. We should state clearly which metal we're trying to recover. When we planned this, we talked about cobalt first, didn't we, because it's the most valuable.",
  "F|We did, but separating cobalt needs equipment our lab simply doesn't have. And nickel would have been straightforward - too straightforward, the tutor said, nothing new to show. So we settled on lithium. Recovering lithium is the focus, and the first paragraph should say so.",
  "M|Agreed. Now, the honesty section. The write-up has to mention what went wrong in the first run - which was my fault.",
  "F|You mean the temperature? You were so worried about the mixture overheating.",
  "M|I watched the temperature like a hawk, actually - it never rose above forty degrees. And I know you thought I'd muddled the labels on two of the samples, but I checked the photographs afterwards, and the labels were right. No - the real mistake was the acid. I misread the instructions and made the solution at double the concentration it should have been. Twice as strong. That's why the first set of readings was useless.",
  "F|Well, it's a common mistake, and at least we caught it early. Now, the discussion section. Every method has a weakness - what do we admit is the biggest problem with ours?",
  "M|Cost isn't the issue - citric acid is about the cheapest chemical there is. And ours is certainly safer than the industrial process - nothing we use is especially dangerous. For me the weakness is time. The separation stage alone took four days. Nobody could run a recycling plant at that speed.",
  "F|I agree completely - the method is just too slow, and we should say so plainly. On the brighter side, the results graph. I finished it last night. I was expecting our recovery figures to look amateurish, and there is one little bump on the curve, nothing dramatic. But the surprising thing is how close our numbers are to the figures in the published journal paper - almost the same curve.",
  "F|Oh, and I saw the tutor about the presentation. You keep worrying we'll run over time - she wasn't worried about the timing at all. Fifteen minutes is plenty, she said. What she really wants is a comparison: our low-temperature method set against the furnace process industry uses - costs, energy, recovery rates, side by side. She said comparing the two methods should be the heart of the talk.",
  "M|Then that's how we'll build it.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|We should also write something about collecting the used batteries, because that was harder than the chemistry. Which problems do we actually mention?",
  "M|Not the shops - I expected them to refuse, and in fact every shop we asked agreed to keep a collection box. And we can't complain about the numbers: three hundred batteries in a fortnight is far more than we needed.",
  "F|True. The real trouble was the state they arrived in. So many were damaged - split cases, leaking fluid - we had to handle them with gloves and reject a quarter of them.",
  "M|That was the worst, definitely. And the other thing was what people put in the boxes. We asked for the small lithium ones, and half of what we got was car batteries and old phone chargers - just the wrong type entirely.",
  "F|Yes - the damaged ones and the wrong ones. Those two problems go in the report. The cleaner moving one of our boxes into the store room was annoying, but we got it back within the week - hardly worth a sentence.",
  "M|Agreed. Last thing: the next stage. What do we actually change? I still wonder about running the acid bath hotter, to speed the whole thing up.",
  "F|The safety office would never allow it, and heating defeats the point of a low-temperature method. And before you suggest it - no, we're not crushing the batteries any finer either. The dust was exactly what made the risk assessment so difficult last time.",
  "M|Fair enough. Then I'd argue for a filtering step between the two baths. Half our problems came from solids getting through, and a simple filter would remove them.",
  "F|Yes - let's add the filter. And the other change is discipline, really: this time every measurement gets repeated three times, and we record the average. One reading on its own proved nothing last term.",
  "M|The filter, and everything measured three times - I'll write those down now. What about the acid itself? Someone in the seminar suggested switching to sulphuric.",
  "F|No. Citric acid works, it's safe, and changing it now would mean starting the whole project again. The acid stays as it is.",
  "M|Agreed. Coffee, then - and I'll draft the aim tonight.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
    "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of the spice trade. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good afternoon. Open your kitchen cupboard tonight and you will find, sitting quietly in little jars, the substances that once moved fleets, built cities and redrew the map of the world. Pepper. Cinnamon. Cloves. Nutmeg. Today I want to trace how the trade in these spices shaped several thousand years of history.",
  "M|Let us start with the plants themselves, because their geography explains everything that follows. Pepper grows on a climbing vine, and for most of history it came from one region only: the wet forests of south-west India. Cinnamon is stranger still. It is not a seed or a fruit but the dried bark of a tropical tree, peeled away in strips that curl as they dry, and it came chiefly from the island we now call Sri Lanka. Rarest of all were cloves and nutmeg, which grew on a handful of tiny volcanic islands in eastern Indonesia and, for thousands of years, nowhere else on earth. A plant that grows in only one place, and is wanted everywhere, is a recipe for extraordinary trade - and extraordinary profit.",
  "M|For centuries that trade was controlled by Arab merchants, who carried the spices by ship and by camel caravan to the markets of the Mediterranean. They understood something very modern: protect your supplier. Asked where cinnamon came from, they told magnificent stories - of deep gorges filled with snakes, and of giant birds that guarded the spice and built their nests from its branches, so that collecting it was mortally dangerous. The stories kept customers impressed, prices high, and rivals at home.",
  "M|The Romans, typically, went and looked for themselves. Roman ships learned to ride the monsoon winds from Egypt across to the coast of India, and pepper flowed into the empire in astonishing quantities - the city of Rome had warehouses built specially to hold it. But the trade ran one way. India wanted little that Rome could make, so the ships went out loaded with silver, and one Roman writer grumbled that the empire's silver was draining away to the east, spent on nothing more solid than flavour.",
  "M|In medieval Europe, spices became something stranger: a form of money, and a language of power. Every sack of pepper that reached Europe had passed through many hands, and each pair of hands had taken its profit, so by the time it was sold in Paris or London, pepper was precious enough to be counted out corn by corn and left in wills. In several cities tenants could legally use it to pay rent - a respectable landlord accepted a pound of peppercorns as readily as coins. You may have heard, by the way, that medieval cooks used spices to disguise the taste of meat that had gone bad. It is a myth, and the economics kill it: anyone rich enough to buy pepper could buy fresh meat every day of the week. Spices were served for the opposite reason - not to hide anything, but to display wealth, laid on thickly at feasts precisely because everyone at the table knew what they cost.",
  "M|The final winner in this chain of middlemen was Venice. That city's merchants controlled the Mediterranean end of the route, buying in Egypt and selling to the rest of Europe at prices they set themselves, and on that monopoly Venice grew into the richest city of its age. Which explains, of course, why other nations began looking for a way around it - literally.",
  "M|In 1498, after a voyage of ten months, Portuguese ships reached India by a sea route around the southern tip of Africa, cutting out every middleman at a stroke. The price of pepper in Lisbon fell to a fifth of what Venice charged, and the centre of European wealth began its long swing from the Mediterranean to the Atlantic. A century later the Dutch went further still: they seized the tiny islands where nutmeg grew, and enforced their monopoly without mercy, destroying trees on any island they could not guard. So seriously did they take it that in 1667 they traded away their colony on the island of Manhattan to the English in exchange for one more nutmeg island - and at the time, most observers thought the Dutch had much the better of the bargain.",
  "M|But no monopoly lasts forever. In the 1770s a Frenchman with the magnificent name of Pierre Poivre - which means Peter Pepper - slipped into the Dutch islands and carried away live seedlings, which were replanted in French colonies in the Indian Ocean. Within a generation, cloves and nutmeg were growing on plantations across the tropics, from Zanzibar to the Caribbean, and the prices that had built empires quietly collapsed.",
  "M|Which brings us to the present, and a last irony. The spice that once traded ounce for ounce with precious metal is now among the cheapest things in your kitchen, and the geography has shifted one final time: the largest producer of pepper today is neither India nor Indonesia but Vietnam, a country that barely grew it a century ago. The map of the spice trade was redrawn one last time - not by empires, but by ordinary farming.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset9-s1.wav" $s1
Render "upset9-s2.wav" $s2
Render "upset9-s3.wav" $s3
Render "upset9-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
