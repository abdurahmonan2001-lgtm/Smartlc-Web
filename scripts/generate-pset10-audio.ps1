# Generates the four Practice Set 10 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a sports centre to become a member. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good morning, Riverbank Sports Centre.",
  "F|Good morning. I'd like to join the centre - can I do that over the phone?",
  "M|You certainly can. I'll take your details now, and you finish everything at the desk the first time you come in. Can I start with your name?",
  "F|Yes, it's Shahzoda Ergasheva.",
  "M|And how do you spell the surname?",
  "F|E, R, G, A, S, H, E, V, A. Ergasheva.",
  "M|Thank you. Now, we have three kinds of membership. Bronze gives you the gym only. Silver is the gym, the pool and all the classes. Gold is everything in Silver, plus the tennis courts and the climbing wall.",
  "F|I don't play tennis, and I certainly don't climb. But I do want to swim, and I'd like to try some of the classes.",
  "M|Then Silver is the one for you. Gold would just be money you never use.",
  "F|Silver, then.",
  "M|Right. Gold is two hundred and forty thousand som a month... sorry, I'm reading the wrong column - that's the Gold price. Silver is one hundred and eighty thousand a month.",
  "F|One hundred and eighty. Is there a joining fee on top of that?",
  "M|Not at the moment. We dropped it in the spring and we haven't brought it back.",
  "F|Good. When can I start?",
  "M|Memberships always begin on a Monday. The first of April is a Monday... no, hold on, the first is a public holiday and we're closed. So your membership will start on Monday the third of April.",
  "F|Monday the third. That's fine.",
  "M|Before you use the gym you need an induction - somebody shows you the machines and takes you through the safety side. We have slots on Wednesday and Thursday evenings this week. Wednesday is already full, I'm afraid, so shall I put you down for Thursday at six?",
  "F|Thursday at six. Yes, please.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|Is there anything I should bring with me on Thursday?",
  "M|Two things. We make your membership card while you wait, so bring a passport-sized photo. We used to take the picture here, but the camera broke and nobody has replaced it.",
  "F|A photo. All right.",
  "M|And bring a padlock for the lockers. The changing rooms are perfectly safe, but the lockers have no locks of their own - people kept losing the keys, so we took them all off.",
  "F|A padlock. Anything else? Do I need to bring a towel?",
  "M|Towels you can hire at the desk for a few thousand som, so that one is up to you.",
  "F|And the classes - are they all included?",
  "M|All of them are included with Silver, and on top of that every member gets one specialist class a week free. This term it's yoga, on Tuesday evenings. It was pilates last term, and it will probably change again in September.",
  "F|Yoga. I'll try that.",
  "M|Oh - do you drive?",
  "F|I do, yes.",
  "M|Then ask at reception for a parking permit. Members park free in the car park behind the building, but only if the permit is showing in the windscreen. Without it you will be charged like everybody else.",
  "F|A permit. I'll ask on Thursday.",
  "M|Do. And the last thing is the timetable. We used to print a booklet every term, but the classes change too often, so now everything lives on our app. Download it, log in with your membership number, and you can book a class or cancel it up to an hour before it starts.",
  "F|On the app. That's much easier. Thank you very much.",
  "M|You're welcome. We'll see you on Thursday.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a council officer explaining changes to the recycling collections in a town. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out. I work in the waste and recycling team at the council, and from the first of next month the way we collect your recycling changes completely. Let me explain why, and then exactly what you need to do.",
  "F|Most people assume we are doing this because of new national targets. There are new targets, and we will meet them, but they are not the reason - we were already close to them. Nor is it because of complaints, although I have read plenty of those. The honest answer is money. At the moment you put everything recyclable into one green bin, we take it to a plant, and machines and people separate it there. That sorting now costs us more than the material is worth, and the price has doubled in four years. If you sort it at home, the material is cleaner, it sells for more, and we stop paying twice for the same job.",
  "F|So, what arrives at your door. Every household will get a set of three stacking boxes: paper and card in the blue one, glass and tins in the black one, and food waste in the small brown one with a lid. We did look at a larger wheeled bin with compartments inside it, but the crews say those are unusable in narrow streets. And we decided against handing out sacks, because they blow around and the foxes get into them. Three boxes, and they stack, so they take up about the space of a bicycle wheel.",
  "F|Now, what goes in them. Drinks cartons - the ones with a plastic lining - we have taken those for years, so nothing changes there. Garden waste stays exactly as it is, and I will come back to that. But from next month we can, at last, accept plastic film: carrier bags, the wrapping from a pack of vegetables, bread bags. There is a new machine at the plant that handles it. Rinse it, dry it, and put it in the blue box with the paper.",
  "F|And if we miss you? It happens, and I would much rather you told us straight away. Please telephone the depot on the same day - the number is on the leaflet. I know the website has a reporting form, and I would love to say use it, but I will be honest with you: it goes into a queue that somebody looks at once a week, and by then your box has been standing outside for six days. Telephone us, and we will normally come back within twenty-four hours. Please do not simply leave the boxes out until the following week, because that is how a street ends up covered in wet paper.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Right. Let me take the materials one at a time, because each has its own arrangement, and this is where people go wrong.",
  "F|Food waste first. This is the big change: the brown box will be emptied every single week, even though the other two boxes are fortnightly. Food waste smells, and a fortnight in August is a fortnight too long. Every week, without exception.",
  "F|Garden waste. Grass, hedge clippings, prunings. That is not part of the free service and never has been. It is a separate subscription: you book it online, you pay for the year, and a brown wheeled bin is delivered. Please book before the end of March, because we cap the number of subscriptions and last year we ran out.",
  "F|Electrical items - kettles, toasters, hairdryers, cables. We do not collect those at all, from anywhere. You have to bring them to the depot on Mill Lane yourself. I am sorry; there is no doorstep service and I cannot invent one.",
  "F|Textiles - clothes, curtains, shoes tied together in pairs. Until this year our own crews took those, but we have handed the whole textile collection to a charity, and their van now does the round on the first Saturday of the month. Same bags, different vehicle, and the money goes to them.",
  "F|Cardboard. We will take as much as you can produce, and with all the deliveries these days that is a great deal. The one thing I ask is that you flatten it. An unflattened box fills the blue container in seconds, and then the crew has to stand in the street breaking it up by hand.",
  "F|And finally batteries - please listen carefully to this one. Batteries must never go in any of the three boxes. They are crushed inside the vehicle, and a crushed battery starts a fire. We lost a lorry to one last year. Put them in a clear bag and hand the bag to the crew, or drop them at the supermarket.",
  "F|All of this is on the leaflet, and I am happy to take questions now.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two biology students, Bekzod and Feruza, planning an experiment on plant growth. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Bekzod, the project form. Question one: how did you come to choose this topic?",
  "M|Honestly? The documentary. That programme about the vertical farm in Rotterdam, with the racks of lettuce under pink light. I watched it twice and I wanted to know why pink.",
  "F|Then write that down. I was going to put Professor Karimov's lecture on photosynthesis, but the lecture was in November and we had chosen the topic in October, so that would simply be untrue.",
  "M|And it was not your grandmother's greenhouse either, whatever you tell people.",
  "F|Ha. No. The documentary, then. Next question: what is wrong with the research that already exists?",
  "M|I read eleven papers. My first thought was that the growing periods were too short, but they were not - most ran four or five weeks, which is plenty for a seedling. And the equipment was not out of date either; nearly all of them used modern panels.",
  "F|So where is the gap?",
  "M|Species. Nearly every study I read was done on lettuce. Lettuce, lettuce, lettuce. Nobody knows whether the same light does the same thing to anything else.",
  "F|That is our justification, then. Which brings us to the plant. I had assumed basil.",
  "M|Basil takes three weeks just to germinate reliably, and we have six weeks in total. Beans I did think about, but a bean plant is half a metre tall by week four and our boxes are thirty centimetres deep.",
  "F|Radishes, then. Fast, small, and you get a root and leaves to measure.",
  "M|Radishes it is. Now, what do we actually measure?",
  "F|You are going to say height.",
  "M|Well, it is the obvious one.",
  "F|It is the obvious one and it is useless. A seedling stretches towards weak light, so under the dimmest lamp you get the tallest plants and the least growth. Height would tell us the opposite of the truth.",
  "M|Fair enough. Leaf colour, then?",
  "F|Too subjective, unless we photograph everything under identical conditions, which we cannot. No - we dry the seedlings in the oven and weigh them. Dry weight is the standard measure of how much a plant has actually built.",
  "M|Dry weight as the main measurement. Agreed.",
  "F|Right. And I saw Doctor Nazarov on Monday about the design. He said he does not mind how many replicates we run, and he is not worried about what time of day we water them. But he was absolutely firm about one thing: we must grow a set of plants under ordinary white light as well.",
  "M|Because otherwise there is nothing to compare the colours against.",
  "F|Exactly. A white-light group, same boxes, same everything.",
  "M|Fine. That is a fourth box, which brings me to the thing that actually worries me. Not the seeds - radishes germinate in anything. It is the temperature. Lamps give off heat, and different lamps give off different amounts of it.",
  "F|That is my worry too. If the red box runs two degrees warmer than the blue one, we will never know whether we measured light or heat. We need a thermometer in every box and we will have to check them daily.",
  "M|Agreed.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So which colours are we actually comparing?",
  "M|Blue has to be in. Every paper starts with blue - it is the one wavelength everybody agrees drives leaf growth.",
  "F|Blue, yes. And red. The vertical farms use red and blue together, and the pink light in that documentary was exactly this mixture. If we test red against blue we can say something about why.",
  "M|Blue and red, then, plus the white control. What about green? I have read that plants reflect most of it straight back.",
  "F|Which is precisely why it would waste six weeks. And before you suggest yellow - the lab has only two yellow panels and one of them flickers.",
  "M|Blue and red it is.",
  "F|Good. Now, jobs, before we can plant anything.",
  "M|The boxes. We have to build them ourselves - four wooden boxes, lined with foil, one lamp in each. Nobody is going to build those for us and they will take a full weekend.",
  "F|You build the boxes, then. And I will write the risk assessment. The lab will not give us a bench until the form is signed, and Doctor Nazarov says it takes a week to come back, so that has to go in first.",
  "M|What about the seeds?",
  "F|Already in the store cupboard. The department buys radish seed by the kilo for the first-years, so we simply take a packet.",
  "M|And scales? We need something accurate to a milligram.",
  "F|The technicians have a balance we can book by the hour, so there is no need to buy anything. And we do not need the greenhouse at all - the whole point is that our boxes are sealed.",
  "M|Right. Boxes and risk assessment this week.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of cheese. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we finished with the history of bread. Today, something that usually sits beside it on the table: cheese.",
  "F|Nobody invented cheese. It was almost certainly an accident, and the accident is easy to reconstruct. Early herders carried milk in bags made from the stomach of a calf or a lamb, because a stomach is watertight and comes free with the animal. The lining of that stomach contains an enzyme, rennet, which makes milk separate into solid curds and watery whey. After a day's walk in the sun, the traveller who opened the bag found not milk but soft white lumps - and then discovered that the lumps kept for weeks, where the milk would have kept for hours.",
  "F|That is a story, of course, and stories are not evidence. The evidence comes from pottery. Archaeologists working in Poland have found fragments of clay sieves, pierced with small holes, dating from about seven thousand years ago. Chemical analysis of the residue trapped in the clay showed milk fat, and holes of that size are exactly what you need for draining curds. Those sieves are the oldest firm proof of cheese-making anywhere in the world.",
  "F|The ancient world took cheese entirely for granted. It appears on Sumerian clay tablets, it is shown being made in Egyptian tomb paintings, and the first cheese in European literature belongs to the Cyclops in Homer. But it was Rome that organised it. A large Roman farm had a room set aside for the purpose, with its own drainage and its own presses, and Roman writers on agriculture left instructions detailed enough to follow today. Every legionary received a daily ration of cheese, with his bread and his sour wine, which meant that wherever the army marched, cheese-making marched with it. A great many European cheeses begin with a Roman garrison.",
  "F|The Middle Ages moved the craft indoors, into the monasteries. Monks had time, they had written records, and they had a long horizon: they could afford to leave a cheese alone for two years and write down what happened to it. Many of the varieties we still eat were developed and named in monasteries, and it was the monks who first treated ripening as a controlled process rather than an accident. In the mountains, meanwhile, cheese solved a transport problem. A whole summer of milk from a high pasture could not be carried down the mountain as milk, but turned into enormous wheels weighing forty kilograms or more it could - and it would keep until spring.",
  "F|Cheese also acquired law. In fourteen eleven the king of France granted the villagers of Roquefort the sole right to ripen their cheese in the caves beneath the village, where a particular mould grows in the cold, damp air. That charter is the ancestor of every protected-name scheme in Europe today.",
  "F|The nineteenth century industrialised almost everything, and cheese was no exception. In eighteen fifty-one an American dairy farmer, Jesse Williams, collected the milk of several neighbouring herds and made cheese from all of it in one building: the first cheese factory in the world, in New York state. Within thirty years the factory had very largely replaced the farm kitchen across the United States and much of Europe. Two other changes mattered as much. Louis Pasteur showed that gentle heating killed the bacteria that spoiled milk and made people ill, and pasteurisation gave cheesemakers, for the first time, a predictable raw material. And the railway, with ice, allowed a soft cheese to travel a thousand kilometres and arrive worth selling.",
  "F|The twentieth century took out the last of the guesswork. Cheesemakers had always depended on whatever wild organisms happened to be living in the milk, which is why a good batch and a ruined batch could come from the same herd; from the nineteen twenties they began adding starter cultures grown in a laboratory instead. And in nineteen ninety came a quieter revolution. Rennet, which for eight thousand years had been taken from the stomachs of young calves, could now be produced instead by microbes in a fermentation tank. Most of the world's cheese today is made with rennet from microbes, and no calf is involved at any point.",
  "F|So we end with more than two thousand named varieties, an industry worth billions, and a product that began when somebody's lunch went wrong. Next week: yoghurt.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset10-s1.wav" $s1
Render "pset10-s2.wav" $s2
Render "pset10-s3.wav" $s3
Render "pset10-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
