# Generates the four Upper-Inter Set 4 listening recordings with Windows TTS.
# Same conventions as Mock 1 and 2: "F|"/"M|" pick the voice, "P|<seconds>" is
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
    "M|You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and answer the questions. All the recordings will be played once only. The test is in four parts. Now turn to part one.",
    "P|3",
  "M|Part one. You will hear a woman phoning an allotment site about renting a garden plot. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Fieldgate Allotments, good morning.",
  "F|Good morning. There is a notice on your gate saying you have plots free this year. I live in the flats opposite, and I have wanted a garden for as long as I can remember.",
  "M|Then you have rung at the right moment - two plots came free last month. Let me take a few details. Your name first, please.",
  "F|It is Sevara Nazarova.",
  "M|Nazarova. Could you spell the surname for me? I write everything into the book by hand, and my spelling is a disgrace.",
  "F|Of course. N, A, Z, A, R, O, V, A. Nazarova.",
  "M|N, A, Z, A, R, O, V, A. Thank you. And have you had an allotment before?",
  "F|Never. I have only ever grown a few herbs in pots on a balcony.",
  "M|In that case I would not give you a full plot. People take a full plot in the spring, full of enthusiasm, and by August the weeds are taller than they are. I would suggest a half plot to begin with - you can always ask for a full one next year.",
  "F|A half plot sounds a great deal more sensible, yes.",
  "M|Good. Now, which one. The plot beside the gate is the one everybody asks for, but I am afraid that has already gone - a family took it a fortnight ago. I can offer you plot nineteen, which is at the far end, next to the hedge. It is a longer walk from the car, but it gets the sun all afternoon.",
  "F|Plot nineteen, next to the hedge. That is fine by me. How big is it?",
  "M|A half plot is a hundred and twenty-five square metres. Believe me, that is quite enough digging for a first year.",
  "F|And what does it cost?",
  "M|The rent is forty-five thousand som a year. It was thirty-five until the winter, but the water charges went up and the committee raised it in January.",
  "F|Forty-five thousand a year. That is less than I feared.",
  "M|There is a deposit as well, twenty thousand som. That is not really a charge - the twenty thousand is returned as soon as you give the key back, whenever you decide to give up the plot.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Is there water on the site? I cannot carry buckets from home.",
  "M|There are taps along the main path, so you are never more than thirty metres from one. Hosepipes are not permitted, though - watering cans only. Forty families sharing one supply, you understand.",
  "F|That is fair enough. Are there other rules I ought to know about?",
  "M|A few, but only one that people forget. Dogs are welcome if they are on a lead, and there is no problem at all with sheds - most plots have one already. The rule that gets broken is about burning rubbish. Bonfires are not allowed at any time, because the smoke blows straight into the houses behind us and we hear about it for a week.",
  "F|No bonfires. Understood. What about the soil - will I have to buy something to improve it?",
  "M|Not in your first year. The council collects garden waste from the town and turns it into compost, and every spring each tenant gets a free load of compost delivered to the plot. Some people buy manure from the farm up the road as well, but that is entirely up to you.",
  "F|A free load, wonderful. And is there anything I need to bring myself?",
  "M|Your own tools, I am afraid. We used to keep a shared set in the office, but half of them walked off, so everyone brings their own tools now. There is a locked store beside the office if you would rather not carry a spade home every time.",
  "F|I will borrow my father's spade to start with. Is there anything happening on the site where I could meet the other gardeners?",
  "M|Yes, do come to the open day for new tenants. It was going to be the sixth of April, but that fell in the school holidays and half the committee would have been away, so we moved it - it is now Saturday the thirteenth of April, at ten o'clock. There is tea, and a great deal of advice you did not ask for.",
  "F|The thirteenth. I will write it in my diary. And how do I actually sign up?",
  "M|I will send you the agreement and a copy of the site rules. We email most things these days, but the agreement has to be signed, so it goes out by post - it should reach you in two or three days. Sign both copies and bring one with you to the open day.",
  "F|By post, right. Thank you, you have been very kind.",
  "M|A pleasure. Welcome to Fieldgate.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
    "P|5"
)

$s2 = @(
  "M|Part two. You will hear a guide talking to visitors at an open-air museum of village life. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good morning everyone, and welcome to Fieldgate Green, our open-air museum of village life. Before I let you loose on the site, a little history and a few practical points.",
  "M|People often assume that a wealthy family left us this estate, and I am asked at least once a week whether the university started us off as a research project. Neither story is true, though both would have been easier. Fifty years ago a new road was planned through three villages north of here, and the buildings in its path were to be demolished. A group of local people campaigned to rescue buildings that were about to be pulled down, raised the money themselves, took the houses apart beam by beam, and rebuilt them on this field. Everything you will walk through today was saved by neighbours with no money and a great deal of stubbornness.",
  "M|Now, what is new this season, because regular visitors always ask. Our ticket prices are exactly what they were last year, family tickets included, so no change there. We did look seriously at opening in the evenings through the summer, and I am sorry to say we could not find the staff, so that will have to wait another year. The real change is transport. From this April a bus runs from the railway station to our gate every hour, which means that for the first time you can reach us without a car.",
  "M|A word about how to behave here, and it is not the usual list. Unlike most museums, we want you to touch things. Pick up the tools, sit on the chairs, open the cupboards, turn the handle of the butter churn. And you are welcome to walk anywhere on the grass, including all the way round the pond. The one thing we do ask is that you keep food and drink outside the buildings - the floors are three hundred years old and jam is forever. There is a picnic field beside the car park.",
  "M|Finally, how to see the place. There is a guided tour at twelve, which is very good but only covers half the site in the hour available. The horse and cart is a delight and the children will demand it, but it goes round the outside of the village and stops at nothing. If you want to see everything, follow the numbered path - it begins at this gate and takes you past every building in order, and it takes about ninety minutes at a gentle pace.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "M|Now listen and answer questions fifteen to twenty.",
  "M|Let me say a word about each building, in the order the path will take you.",
  "M|You begin at the farmhouse, the largest building we ever moved. Almost nothing inside it was bought. When word went round the district that we were furnishing the house, families arrived with what was in their own attics - beds, plates, a clock, a wedding photograph, a child's boots - so everything you see inside was given by local families. Some of them still come back at Christmas to look at their grandmother's chair.",
  "M|Beyond the farmhouse is the water mill, and the mill is not a museum piece. Every Wednesday we open the sluice, the wheel turns, we grind wheat into flour, and you can buy a bag of it at the ticket office on your way out. It sells out most weeks, so if you want some, buy it before you walk round rather than after.",
  "M|Next along the path stands the blacksmith's forge, and I have to be honest with you about that one. Three winters ago a spark from the chimney caught the thatch, and the forge burned down in an hour. What stands there now was rebuilt, using the original drawings and, wherever we could rescue them, the original tools. It is a copy, but an exact one.",
  "M|Then the village school, which on weekdays is the busiest place we have. Classes from the town come and spend a morning there being taught exactly as children were in 1900 - the hard benches, the slates, the times tables chanted aloud. If you visit on a school day, do look through the window, but please do not open the door.",
  "M|I am sorry to say the village shop is shut this month. The roof is being repaired - every tile is coming off and going back on - and while the scaffolding is up nobody can go inside. You can still look through the window at the jars and the scales, which is some consolation.",
  "M|And at the end of the path, the great barn. People always ask which of our buildings was the most expensive to move, and after fifty years the records are too muddled to say. The barn, though, is the exception to everything I have told you this morning. Every other building here arrived on a lorry in numbered pieces from somewhere else. The barn did not - it has stood on this spot since 1780, and the museum was quite literally built around it.",
  "M|Right. The path starts here, the tea room is by the pond, and I shall be at the forge until four if you have questions.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
    "P|5"
)

$s3 = @(
  "M|Part three. You will hear two geography students, Timur and Gulnora, discussing the measurements they have collected for a glacier study. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Timur, before we write the introduction - remind me why you settled on the Falkner Glacier. There are three others in the same valley system.",
  "M|Two reasons that are true but are not the reason, and one that is. Yes, we can get to it and back in a day, which is convenient, and yes, our tutor did fieldwork on it years ago, which is why she likes the topic. But I chose it because people have been measuring the end of that glacier since 1892. Every year, in the same way, by the same club. A hundred and thirty years of numbers. You simply cannot get that anywhere else in the region.",
  "F|Agreed, that is the argument. Although the earliest records worried me when I started reading them.",
  "M|Missing years?",
  "F|That is what I assumed, but no - every single year is there, which is remarkable in itself. And the units are always stated, some in feet, some in metres, but always stated. The real problem is that the marker they measured from was moved twice, once in 1911 and again in 1954, and nobody wrote down exactly where it went. So a distance from 1905 and a distance from 1960 are not measuring the same thing at all.",
  "M|That is going to need a paragraph of its own. Now, the satellite data.",
  "F|Do we even need them? They only start in 1979, so they do not fill any of the gaps.",
  "M|We need them for a different reason. They are less precise than a tape measure on the ground, I admit that, and they cover none of the early period. But they give us something no field visit ever did. You can see the whole surface of the glacier dropping, year after year, even in the years when the front barely moved. The glacier was thinning long before it started retreating quickly, and only the satellites show that.",
  "F|All right, that is worth two figures then. And speaking of the retreat - the thing that genuinely surprised me was the pause.",
  "M|Go on.",
  "F|I had assumed the retreat simply accelerated, with the fastest loss in the nineteen-nineties. It did not. Look at the middle of the record: between about 1965 and 1975 the front barely moved at all. Ten years of almost nothing, and then it began again, faster than before. Nobody warns you about that in the textbooks.",
  "M|Which brings us to the graph. Do we start it at 1892 or at 1950?",
  "F|All of it, obviously - the length of the record is the whole point of choosing this glacier. And one line, please, not a separate line for every season. The thing we must add is the uncertainty. Some of those early points could be ten metres out in either direction, and if we draw one neat thin line the reader will never know that. Error bars on every point.",
  "M|Fine, error bars. And what did she actually say about the draft? I was braced for a lecture about using too few sources.",
  "F|That is the surprise. She said the reading list was fine, and she rather liked the background section, which I had been ready to cut. Her one real criticism was the method. She said a reader cannot tell how the measurements were made - who took them, with what instrument, standing where - and until we explain that, the numbers mean nothing at all.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So in the reliability section, which weaknesses do we actually flag? We cannot list ten, or it looks as though the data are worthless. The equipment, for a start?",
  "M|I would leave the equipment out of it. A steel tape in 1900 measures a distance just as well as a steel tape today. And the same goes for the people - they were trained surveyors, they knew what they were doing, so I am not going to question the observers.",
  "F|Agreed on both. For me it is the marker. Two moves, badly recorded, and every distance before 1954 becomes shaky.",
  "M|That is the serious one, yes. And the other is when in the year they went. Some of those measurements were taken in June and some in late September, and the front of a glacier can move thirty metres between those two dates. Comparing a June figure with a September figure tells you almost nothing.",
  "F|The marker and the season, then. Those two. What about the weather - there are notes about storms and deep snow?",
  "M|Mentioned, but it never stopped anyone measuring, and it does not bias the result in one direction. I would not call it a source of error.",
  "F|Right. So what has to be done before Thursday?",
  "M|I will do the conversions. There are about twenty points in feet from the American survey, and until every figure is in metres the graph is meaningless. Two hours, maybe.",
  "F|Good. And I will go to the county archive on Wednesday morning. The club's original field notebooks are kept there, and with any luck they say precisely where the marker was moved to.",
  "M|That is worth an hour of anybody's time. Do we need to sign out the GPS unit as well?",
  "F|Not this term - we are not going back to the glacier, so there is no point borrowing it now.",
  "M|And I am not redrawing the map, it is perfectly clear as it is. Somebody in the seminar suggested interviewing the old mountain guide in the village, which is a lovely idea, but he is away until May.",
  "F|Two jobs each week is plenty. See you Thursday.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
    "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of mirrors. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good afternoon. You looked into one this morning without a thought, and you will look into several more before you go to bed tonight. The mirror is so ordinary an object that it takes an effort to remember that, for almost the whole of human history, a clear reflection was a luxury - and a rather disappointing one at that.",
  "M|Let us begin before glass. The earliest known mirrors were not made of glass at all, but of obsidian - a natural volcanic glass, black and extremely hard, which takes a very high polish. Pieces cut and polished for exactly this purpose have been excavated in Anatolia, in what is now Turkey, and the oldest of them are about eight thousand years old. Hold one and you see yourself dimly, as though looking into dark water.",
  "M|After obsidian came metal. In Egypt and in China, mirrors were discs of bronze or copper, often beautifully decorated on the back, held in the hand or set upon a stand. They had two great drawbacks. The image was dark and slightly yellowish, so colours were never true; and the surface tarnished in damp air, which meant that a metal mirror needed constant polishing to be of any use at all. Your reflection, in other words, was a household chore.",
  "M|Glass mirrors did exist in the Roman world - small ones, backed with a layer of lead - but the technique was lost in Europe for centuries, and it was Venice that recovered it. By the thirteenth century the glassworks of Venice were famous across the Mediterranean, and the authorities then took a decision that shaped the whole industry: the furnaces were moved out of the city onto the island of Murano. The official reason was the danger of fire, and it was a genuine danger, in a city built of wood around open flames. But the move had a second consequence which the republic did not mind at all. On an island, craftsmen can be watched. Glassmakers were forbidden to leave Venetian territory, and those who tried could expect to be pursued.",
  "M|The Venetian secret was a way of coating flat glass. A sheet of tin foil was laid out and covered with mercury; the two metals combine into a soft, bright paste, and when a clean sheet of glass was pressed down onto it, the reflecting layer bonded to the glass. The results were extraordinary - bright, true, almost modern in quality. But the process took a month for a single mirror, and mercury is a poison which the body absorbs through the skin and the lungs. The men who made these beautiful objects suffered severe poisoning: trembling hands, ruined teeth, failing memory. And the price matched the difficulty. In the seventeenth century a large Venetian mirror could cost more than a painting by a well-known artist.",
  "M|Such a monopoly could not last for ever, and it was broken by France. The finance minister of the French king sent agents to Murano who quietly persuaded a group of Venetian craftsmen to come to Paris, with offers of money, houses, and workshops of their own. Venice was furious; the men went anyway. Within a few years France was making mirrors on its own account, and the king announced the fact to Europe in the most direct manner available to him, by lining an entire gallery at his palace at Versailles with them - a room of mirrors that visitors still queue to walk through.",
  "M|The mirror became an everyday object thanks to chemistry, and the decisive year is 1835. The German chemist Justus von Liebig published a method of depositing a thin film of silver onto glass directly out of a chemical solution - no tin, no mercury, no month of dangerous labour. It was quick, it was safe, and it was cheap, and within a single generation there was a mirror in almost every home in industrial Europe. Shopkeepers then discovered what architects have exploited ever since: hang mirrors along the wall of a small room and it appears twice its real size. Today, incidentally, the coating is usually not silver but aluminium, sprayed onto the glass inside a vacuum chamber, a layer only a few atoms thick.",
  "M|I want to finish with two fields in which the mirror stopped being furniture and became an instrument. The first is astronomy. The earliest telescopes gathered their light with a lens, but a large lens sags under its own weight and bends different colours by different amounts. A curved mirror does neither, and every serious telescope built in the past two centuries collects its light with a mirror rather than a lens. The largest instruments now under construction do not even use one piece of glass: their mirrors are assembled from dozens of separate segments, each adjusted by computer many times a second.",
  "M|The second is psychology. If you want to know whether an animal recognises itself, you place a mark on its body where it can only be seen in a reflection - a spot of dye on the forehead, say - and then you watch what it does in front of a mirror. An animal that touches the mark on its own body, rather than the mark in the glass, appears to understand that the image is itself. Great apes do this. So do dolphins, elephants and, remarkably, magpies. Most other species treat the reflection as a stranger, and some will attack it for weeks. A sheet of glass with a metal coating turns out to be one of the simplest tests we possess of what a mind knows about itself.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset4-s1.wav" $s1
Render "upset4-s2.wav" $s2
Render "upset4-s3.wav" $s3
Render "upset4-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
