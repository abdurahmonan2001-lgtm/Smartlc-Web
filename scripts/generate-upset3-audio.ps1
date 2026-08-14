# Generates the four Upper-Inter Set 3 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a man phoning a language exchange club to ask about becoming a member. First, you have some time to look at questions one to five.",
  "P|6",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good evening, Riverside Language Exchange Club, Gulnora speaking.",
  "M|Oh, hello. I saw a poster about your club in the central library, and I'd like to find out about joining.",
  "F|Of course - you're very welcome. We're always glad of new members. Let me take a few details first. What's your name?",
  "M|It's Bekzod Nazarov.",
  "F|Could you spell the surname for me? I want it right on the membership list.",
  "M|Certainly. N, A, Z, A, R, O, V. Nazarov.",
  "F|N, A, Z, A, R, O, V. Lovely. And a phone number, in case a meeting ever has to be cancelled?",
  "M|My mobile is oh seven seven eight, two four five, five six one.",
  "F|Let me read that back. Oh seven seven eight, two four five, five two one?",
  "M|Not quite - it ends five six one. Six, not two.",
  "F|Five six one. Got it, thank you. Now, which languages do you speak already?",
  "M|Uzbek is my first language, and I speak fluent Russian as well - I use it at the office every day.",
  "F|That's very useful for us - several members are looking for practice in both. And which language are you hoping to practise yourself?",
  "M|Well, when I saw the poster I thought about English, but honestly my English is already reasonable. The real gap is German. My company has just opened an office in Berlin, and I'll need it for my job - I'll be talking to the people there every week.",
  "F|German it is - and you're in luck, we have three native German speakers at the moment. How would you describe your level? Complete beginner?",
  "M|Not quite a beginner. I studied it at school for four years. I've forgotten a lot, but some of it is still there. Let's say intermediate.",
  "F|Intermediate - honestly, that's the easiest level to find partners for. Now, let me tell you how the club works. For years we met on Tuesdays, but the room we used stopped being available, so since January we meet every Thursday evening instead.",
  "M|Thursday. That actually suits me better.",
  "F|Good. We run from half past six until half past eight, though people often stay talking long after that.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|6",
  "M|Now listen and answer questions six to ten.",
  "M|And where exactly do you meet?",
  "F|Upstairs at the Compass Cafe, on Bridge Street - do you know it? There's a big brass compass hanging over the door, you can't miss it. The upstairs room is ours for the whole evening.",
  "M|The Compass Cafe - yes, I walk past it on my way home. And is there a fee?",
  "F|There is, but it's modest. For a full year it's a hundred and twenty thousand som. If you'd rather try us out first, you can pay for six months - that's seventy thousand - and the price includes tea and coffee at every meeting.",
  "M|I'll start with the six months, I think. Seventy thousand. Do I pay at the first meeting?",
  "F|Actually your first visit is completely free - come along, join in, and decide afterwards. If you do join, we make you a membership card, so bring a photograph with you - passport size - for the card.",
  "M|A photograph, fine - I've got some at home. And is it just conversation every week, or is there anything else?",
  "F|Mostly conversation - we sit in pairs and swap languages halfway through the evening. But once a month we do something social. We used to run a film night, but the cafe's screen broke last year, so these days it's a quiz night at a local restaurant - questions in three or four languages. It gets very noisy and very competitive.",
  "M|A quiz night - that sounds fun. So how do I actually sign up?",
  "F|People used to just email me, but messages kept getting lost, so now everything goes through the club's website. There's a short form - your name, your languages - it takes two minutes, and you get a confirmation straight back.",
  "M|On the website. Perfect - I'll do it tonight. Thank you, you've been really helpful.",
  "F|My pleasure, Bekzod. See you on Thursday!",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a harbour officer explaining changes being made to the local ferry services. First, you have some time to look at questions eleven to fourteen.",
  "P|6",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "M|Good morning, everyone. I'm the passenger services officer here at Millhaven Harbour, and I've been asked to explain the changes you'll see on the ferries from next month. There's been a lot of guessing in the local paper, so let me give you the facts.",
  "M|First, why is the timetable changing at all? Some people assume it's because passenger numbers have grown - in fact, numbers have been steady for the last five years. Others think the boats themselves are wearing out, but our fleet is modern - the newest vessel only joined us last summer. The real reason is this: from the first of next month, engineers will begin strengthening the harbour wall, which has stood since the eighteen nineties, and sections of the harbour will have to close one after another while they work. Every service is affected in some way, and the new timetable is built around that project.",
  "M|Now, the car ferry across the bay. Its berth stays where it has always been, and the number of crossings each day is not changing either. But the vehicle loading ramp sits right where the engineers need to work, so it will be out of action for about three months - and that means the car ferry will carry foot passengers only. If you have to take a vehicle across, the road bridge upriver is the way round while the work lasts.",
  "M|Tickets next, because the system has just changed. You can still pay on board, and you can still queue at the harbour office - prices there are exactly what they were. What's new is the mobile app: book through the new app and you pay fifteen per cent less than at the office, on every route, at any time of day.",
  "M|One more practical point: bicycles. Space in the cycle racks is limited to eight bikes per crossing, and even outside the rush hour they fill up quickly. Turning up early no longer guarantees anything, I'm afraid - cyclists should reserve a space before they travel. It's free to do, on the app or by phone, and it means nobody is left standing on the quay with a bike.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "M|Right - let me run through the services one by one, in the order they appear on the timetable board.",
  "M|The Grayton ferry first. Nothing changes about the boats or the pier, but we know commuters found the old timetable frustrating, so from next month it runs every twenty minutes instead of every forty, all day, seven days a week.",
  "M|The Bell Island ferry keeps its familiar timetable, but not its familiar boats. From the spring the route will be operated by two larger vessels, each carrying nearly twice as many passengers as the old ones - so no more being left behind on summer weekends.",
  "M|The river taxi has been run by the harbour authority itself ever since it started. That's coming to an end: from May, a local company, Blue Oar, will take over, with the same crews and, I'm assured, the same fares for at least a year.",
  "M|The harbour tour is changing shape. It used to turn back at the lighthouse; it now continues around the old fort before returning, so it now lasts ninety minutes rather than an hour. Ticket prices, I should stress, stay exactly as they were.",
  "M|The Denholm ferry is directly affected by the engineering work, because its berth is one of the sections being rebuilt. So for the whole of this season it will leave from the East Pier instead - that's the pier beside the fish market, about five minutes' walk from its usual spot.",
  "M|And finally the night ferry. It has never attracted many passengers between autumn and spring, and with the works going on we can't justify it, so it will not run between November and March. It returns, as normal, at the start of April.",
  "M|Full details of all these changes are on the harbour website, and printed timetables are available from the office. Thank you very much - and I'm happy to take questions at the end.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two psychology students, Aziza and Timur, designing an experiment on a memory technique known as chunking. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|6",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Aziza - the proposal form wants a sentence on why we chose chunking. Was it that video I sent you, the memory champion memorising a pack of cards in a minute?",
  "F|The video was fun, Timur, but no. For me it was the demonstration our lecturer did in class. She read out fourteen digits and nobody could repeat them - then she grouped the same digits into two dates and a phone code, and suddenly the whole room could do it. I couldn't stop thinking about that. The articles she gave us afterwards just confirmed it was a real effect.",
  "M|Fair enough - that's a better opening than my video. Now, materials. I still half want to use lists of short words. Or letter strings - some of the classic studies used letters.",
  "F|Words carry meaning, though - people build little stories out of them, and that's a different strategy from chunking. And letters are risky too, because people spot initials and abbreviations in them. If grouping is the only strategy we want available, sequences of digits are cleaner. Everyone knows digits, and on their own they mean nothing.",
  "M|Agreed - digits it is. Who do we test them on, though? That's my next worry.",
  "F|Mine too, but for a different reason. Some people have read the memory training books - they chunk everything automatically, without being asked. I'm not worried about people getting bored, because the whole task lasts ten minutes. And if someone tells a friend about it afterwards, it hardly matters - the digits change for every participant anyway. The real risk is people who already know the techniques.",
  "M|Right, we'll ask about that when they sign up. Now, presentation. Simplest option: I just read the numbers aloud.",
  "F|Your pace would drift, though - nobody reads at the same speed twice, and the groups have to be treated identically. Printed cards are worse: people glance back at them. If we show the digits on a screen for one second each, every single participant gets exactly the same timing.",
  "M|On a screen, then - I'll program that this week. Oh, and I spoke to the tutor yesterday. The ethics form is already dealt with - he signed it last week - and we don't need to book a laboratory, the ordinary seminar room is fine. But he was very firm about one thing: before the real experiment starts, we must run a practice version on three or four volunteers, to catch any problems with the instructions.",
  "F|Sensible. Then let's divide the jobs. Finding participants can wait until the task actually works, and the room's already booked. My next job is the instruction sheet - wording it so that both groups hear exactly the same thing, apart from the one sentence about grouping.",
  "M|Perfect.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|6",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "M|So - who do we recruit, and who do we keep out? Someone in the seminar said we should exclude anyone under eighteen.",
  "F|Not necessary - everyone on the volunteer list is an adult already. And your worry about close friends taking part - I've thought about it, and as long as the instructions are read from the script, friends are fine.",
  "M|What about people who've taken part in studies before? Our list is full of them.",
  "F|Doesn't matter - none of those studies involved memory. But there is one group I'd rule out, and you mentioned them yourself once: chess players.",
  "M|I did - there's a whole literature on it. Strong players chunk positions automatically, they've done it for years, and apparently the habit spills over into numbers too. Chess players are out.",
  "F|And psychology students, obviously - half of them have covered chunking in lectures, and the other half would guess the aim of the study within a minute. So those two groups go on the exclusion list, and nobody else.",
  "M|Agreed. Last thing - what do we record from each person, apart from the score itself?",
  "F|Someone suggested reaction times, but that needs special software, and speed isn't our question. Occupation tells us nothing either. And age - the whole list is between eighteen and twenty-five, so it would be a column of nearly identical numbers. What I do want is a difficulty rating - one to seven, straight after the task - because if the chunking group finds the task easier, that supports the whole idea.",
  "M|Good. And we need the strategy question - did you group the digits deliberately, yes or no. Without it, we can't tell whether people in the control group started chunking on their own.",
  "F|Exactly. The rating and the strategy question - just those two, then. Come on, let's write up the design while it's fresh.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of perfume. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Today I want to trace the history of something invisible - perfume. It has been traded like gold, taxed like wine, and at times worshipped like a god; and the story begins with the word itself. Perfume comes from the Latin per fumum - literally, through smoke. That is no accident, because the earliest perfumes were not liquids in bottles at all. They were incense - fragrant resins and woods burned in temples, their smoke rising as a religious offering. Scent, for the first civilisations, was a way of speaking to the gods.",
  "F|The industry, though, is far older than most people imagine. Some years ago, archaeologists working on the island of Cyprus uncovered what may be the world's oldest perfume factory - a workshop about four thousand years old, complete with stills, mixing bowls and storage jars, on a scale that suggests production for trade, not private pleasure.",
  "F|In Egypt, perfume moved from the temple to the dinner table. Paintings show that banquet guests wore cones of scented fat on their heads. As the evening went on, the warmth of the room melted the cone, and the perfume ran slowly down through the wearer's hair. It sounds unpleasant; to the Egyptians it was the height of elegance. And from Mesopotamia comes a remarkable detail: clay tablets record a perfume maker named Tapputi, a woman who distilled flowers and oils for a king - and who is, as far as we know, the first chemist recorded anywhere in history.",
  "F|The next great advance came from the Islamic world. Arab chemists perfected distillation - the technique of passing steam through flower petals so that it carries the scent away, to be collected drop by drop. With it they created rose water, which was traded from Spain all the way to China, and their books describe hundreds of recipes. Europe learned of these pleasures largely through war: returning crusaders carried these scents into Europe, along with a taste for the luxuries of the East. Centuries later came a milestone with a curious name - Hungary Water, the first alcohol-based perfume made in Europe, prepared, the story says, for an elderly queen, and sold for two hundred years afterwards as a cure for almost everything.",
  "F|Now to France, and to the small southern town of Grasse, which would become the capital of the perfume world. Grasse began not with perfume but with gloves. In the sixteenth century it was a leather town, and its speciality was fine gloves - but the tanning process left the leather smelling dreadful, so the makers began scenting their gloves with local flowers. In time, the scent became more profitable than the leather. The hills around the town filled with flowers grown for the factories - jasmine and roses, picked before dawn, while the cool air still held their oils. A skilled picker could gather thousands of blossoms in a morning.",
  "F|The next revolution took place not in a field but in a laboratory. In the eighteen eighties, chemists produced the first artificial scent ingredients in the laboratory - molecules that smelled of new-mown hay, of vanilla, of flowers that never grew anywhere. Perfumers were horrified, then curious, then converted; almost every great perfume of the last century blends natural oils with these invented notes.",
  "F|So how does a perfumer actually work today? Not, mostly, with the nose pressed to a bottle. Perfumers judge a new blend on thin strips of paper, dipped and waved beneath the nose, hour after hour, because the strips show how a scent changes as it dries. And change it does - a perfume is built in layers, which the trade calls notes. The top notes are the bright ones you smell first, and they fade within minutes; the deepest notes can last on the skin for many hours. The most famous of those deep notes is musk - once taken from a small Asian deer, which was hunted close to extinction for it. Today, I'm glad to say, musk is made synthetically, and the deer is protected.",
  "F|I'll finish with a number. For decades, textbooks said the human nose could tell apart about ten thousand smells. Recent research suggests the true figure may be as high as a trillion. Whatever the exact number, one thing is clear: the invisible art I've been describing this morning has a larger canvas than anyone imagined.",
  "M|That is the end of part four. You now have some time to check your answers.",
  "P|5"
)

Render "upset3-s1.wav" $s1
Render "upset3-s2.wav" $s2
Render "upset3-s3.wav" $s3
Render "upset3-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
