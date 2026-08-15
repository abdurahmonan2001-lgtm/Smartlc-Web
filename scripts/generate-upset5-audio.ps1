# Generates the four Upper-Inter Set 5 listening recordings with Windows TTS.
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
    "M|You will hear a number of different recordings and you will have to answer questions on what you hear. There will be time for you to read the instructions and answer the questions. All the recordings will be played once only. The test is in four parts. Now turn to part one.",
    "P|3",
  "M|Part one. You will hear a man phoning a music school to book a course of guitar lessons. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "F|Good afternoon, Northgate Music School. How can I help you?",
  "M|Oh, hello. I'd like to book a course of guitar lessons, please. My sister did a singing course with you last year and she hasn't stopped talking about it.",
  "F|That's lovely to hear. Now, we teach three kinds of guitar here - electric, classical and acoustic. Which are you interested in?",
  "M|I did think about electric for a while, but we live in a small flat and the neighbours would never forgive me. No - it's acoustic guitar I'd like to learn.",
  "F|Acoustic, lovely. And would that be the group course or individual lessons? I should warn you that the beginners' group is already full for this term - there's a waiting list, I'm afraid.",
  "M|Individual lessons, please. I'd rather go at my own pace anyway.",
  "F|Fine. Let me take your details. Could I have your name?",
  "M|Yes, it's Timur Ergashev.",
  "F|Would you mind spelling the surname for me?",
  "M|Not at all. It's E, R, G, A, S, H, E, V. Ergashev.",
  "F|E, R, G, A, S, H, E, V. Thank you. And a contact number, in case the teacher ever needs to reach you?",
  "M|My mobile is best. It's oh seven seven one, four eight six, two five three.",
  "F|Oh seven seven one, four eight six, two five three. Got it. Now, which day of the week would suit you?",
  "M|Tuesday evenings would be perfect, if that's possible.",
  "F|Ah, Tuesday is the one evening I can't offer you, I'm afraid - the guitar teacher doesn't work on Tuesdays. He does have space on Wednesday evenings, though.",
  "M|Let me think... yes, Wednesday is fine. I finish work at six.",
  "F|Wednesday it is. He has two slots free at the moment. There's seven thirty - oh, wait, no, I'm sorry, a new student took that one just this morning. The other slot is a quarter to seven. Six forty-five.",
  "M|Six forty-five suits me even better, actually - straight after work.",
  "F|Then six forty-five is yours.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Now, the autumn term. Lessons run in blocks of ten weeks, and your first one would be Wednesday the seventeenth of September.",
  "M|The seventeenth of September. I'll put that in my phone.",
  "F|Do. Each lesson lasts forty-five minutes - we find a full hour is too long for complete beginners.",
  "M|Fair enough. And what will the term cost me?",
  "F|Individual lessons are seven hundred thousand som for the ten weeks - oh, hang on, forgive me, that's the price with one of our guitars included. Do you have your own instrument?",
  "M|I do - my uncle passed his old guitar on to me.",
  "F|Then for you it's six hundred and fifty thousand som for the term.",
  "M|Six hundred and fifty. That seems fair. Does it include anything else?",
  "F|It does. Before your lesson you can use a practice room here free of charge - most students arrive early to warm up. What it doesn't cover is the music books; you'll need to buy those yourself from the shop next door.",
  "M|A practice room would be wonderful - as I said, our flat is small. Is there anything I should bring to the first lesson?",
  "F|Your guitar, of course, and please bring a notebook. The teacher writes out chords for you every week, and loose sheets of paper always get lost.",
  "M|A notebook, right. And how do I confirm the booking?",
  "F|Just pay for the term within three days, by card or bank transfer. As soon as your payment arrives, we send the receipt by text - we stopped posting paper receipts last year, because hardly anyone wanted them.",
  "M|By text is perfect. Oh, one last thing - where do I go when I arrive?",
  "F|Wait at reception on the ground floor, and the teacher will come down and collect you.",
  "M|Wonderful. Thank you so much for your help.",
  "F|Thank you, Timur. We'll see you on the seventeenth.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
    "P|5"
)

$s2 = @(
  "M|Part two. You will hear the director of the city planetarium talking on local radio about the planetarium's new season. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning, everyone. I'm the director of the City Planetarium, and I'm here to tell you about our new season, which opens next Friday evening.",
  "F|First, let me clear something up, because I keep hearing theories about why we've been shut since June. Some people say the summer storm damaged the roof - well, the storm did lift a few panels, but that was mended in a single weekend. Others heard we were putting in new seating; that really is planned, but not until next year. The truth is more exciting: we have spent the whole summer installing a completely new star projector. The old one served us faithfully for thirty years; the new machine shows twice as many stars, and planets so sharp you'll want to reach out and touch them.",
  "F|Somebody asked me this week whether some wealthy donor paid for it all. Sadly not - every som came from your ticket money, saved patiently over ten years, so in a real sense the projector belongs to all of you.",
  "F|A word about tickets. Prices haven't changed, and they're exactly the same at the weekend as on a weekday. But do note one thing: the box office closes at five o'clock, so for the evening shows tickets can only be bought on the planetarium website. Print them at home, or simply show your phone at the door.",
  "F|Now, the season itself. For families we have a brand-new show called The Bear Who Stole the Moon. It's aimed at children of six and over - a little too intense for the very youngest, we think. Our own education team wrote the script, but the reason everybody is talking about it is the voice: the story is narrated by one of the country's best-known television actors. I'm not allowed to say who until Friday, but you'll recognise the voice in the first sentence.",
  "F|People often ask how they can get involved with the planetarium. We're lucky with our telescope evenings - those are always led by qualified astronomers - and the school tours have a full team of guides already. Where we genuinely need volunteers is the shop. If you could spare a Saturday morning to sell star maps and model rockets, please do email us.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|21",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Let me finish with a quick tour of the building, because a few things have changed while we were closed.",
  "F|Start with the exhibition area. For twenty years it lived upstairs, next to the office, where frankly half our visitors never found it. It has now moved down to the ground floor, right beside the entrance, so from Friday you'll walk straight into it.",
  "F|Out on the observatory terrace we keep our two large telescopes, and it's open on every clear evening this season. Space out there is tight, though - only fifteen people fit around the telescopes - so you must book your place in advance, either online or by phone.",
  "F|Then there's our Thursday lecture series. This year's talks go deeper than ever - black holes, the mathematics of orbits - and honestly, they are written for adults. We ask parents not to bring anyone under sixteen; for young people we run plenty of daytime events instead.",
  "F|The cafe has had some good news. For years it shut at five o'clock, just as evening visitors arrived hoping for a hot drink. From this season it stays open until nine, every day the planetarium is open.",
  "F|The children's activity room has been completely refitted over the summer. Everything in it is new - touch tables where you can steer a comet, a model rocket you can climb inside, and a whole wall of moon photographs.",
  "F|And one last piece of news, for the drivers. You no longer pay to use the car park. The ticket machines have gone; parking is now free for all visitors, though the spaces do fill up quickly on show nights.",
  "F|That's everything from me. Clear skies, and see you on Friday.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
    "P|5"
)

$s3 = @(
  "M|Part three. You will hear two sociology students, Aziz and Madina, discussing the problem of bias in the interviews for their research project. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|So, Madina, the tutor wants a whole section in our report about interview bias. Before we write it, remind me why you pushed for interviews in the first place. Was it the response rate? Everyone says nobody fills in questionnaires any more.",
  "F|Actually the class got a perfectly good response rate with questionnaires last year, so no, that wasn't it. And the tutor didn't steer us either - she just approved what we proposed. The reason was the answers themselves. A questionnaire gives you ticks in boxes; when you sit down with a person, you get reasons and stories - the why behind the tick. I wanted that depth.",
  "M|And we got it - along with problems we didn't expect. I'll admit the biggest one from my side. When I listened back to my recordings, I kept hearing myself say things like, don't you agree that working from home is lonely? I was pushing every person towards the answer I expected.",
  "F|You weren't alone - I caught one or two of those in mine. But yes, yours were leading questions, and we have to name that honestly in the report.",
  "M|The other thing is who we talked to. Recruiting our friends was quick to arrange, I know, but...",
  "F|But it changed what people said. My flatmate admitted afterwards that she'd softened her answers because she knows me. Friends tell you what they think you want to hear - the answers were shaped by the relationship. That's the real cost, not the time.",
  "M|Agreed. Was there anything that genuinely surprised you when you went through the recordings?",
  "F|Honestly? How often I interrupted. I counted eleven interruptions in one twenty-minute interview. The sound quality was fine, and I did ask every question on the list - but I hardly let anyone finish a sentence.",
  "M|Into the bias section it goes, then. Now - where should the next interviews happen? I still think the university is easiest for us.",
  "F|Easiest for us, but think how it feels for them. People sit in a seminar room as if it's an exam. And going to people's homes means hours of travel, and the hosts feel they have to look after you. The public library rents out small meeting rooms - quiet, central, and it doesn't belong to either side. Let's book one of those.",
  "M|The library room it is. And when you showed the tutor our draft, what was her main advice? I keep expecting her to demand more interviews.",
  "F|No - she says our numbers are fine for a student project, and she doesn't want the topic changed either. Her main point was that we should set our findings beside the published research. If our results differ wildly from the big national surveys, that's a warning that our method, not the world, is what's unusual.",
  "M|That's a good discipline. Right, let's get practical.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So, the next round of interviews. What do we actually change about the way we ask our questions?",
  "M|First proposal: we write every question on a card and read each one out word for word, like a script.",
  "F|I tried that in the pilot, remember - I sounded like a robot, and people froze. The tutor said natural wording is fine once the questions have been tested. What matters far more is the order. In my interviews the money question came first; in yours it came last, after people had already complained about loneliness. No wonder we got different answers.",
  "M|So we ask the questions in the same order every time, for every single person. Agreed. Should we also explain the full aim of the project before we start?",
  "F|Careful - if we announce that we're studying attitudes to working from home, people will start performing opinions for us. A one-line description is enough. What we should promise, right at the start, is that no names will appear anywhere in the report. People relax completely when they hear that - anonymity changes what they're willing to say.",
  "M|Then that's our second change - we promise anonymity at the start of every interview. What about both of us sitting in on each one? Two sets of ears.",
  "F|And two interviewers staring at one nervous person? No - it doubles the pressure, and it halves the number of interviews we can do. One interviewer each, as before.",
  "M|Fair enough. Now, the next stage. Can I be honest about what worries me? So far every single participant has been a student. If the project is about working from home, we need office workers, parents, older people - and we don't know any. Finding participants outside the university is going to be genuinely hard.",
  "F|It is, and that's the first thing I'd flag. I'm not worried about the room - the library is booked for the whole of November. My worry is the typing. Transcribing one hour of talk took me nearly four hours, and we're planning twelve more interviews.",
  "M|The transcription, yes - that's the other big one. The analysis itself doesn't scare me: we built the coding sheet together, so we mostly agree on what the answers mean. And the interviews are short anyway - about twenty-five minutes on average.",
  "F|So: strangers and typing. Those are our two mountains. Let's put a plan for each of them in the report.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
    "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of chess. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Good morning. This week we are looking at the history of games, and I want to give today's lecture to the most studied game of them all: chess. Perhaps sixty million people play it regularly, yet very few of them could tell you where it comes from - and its story crosses more borders than almost any object I can think of.",
  "M|The earliest form of the game that we can identify with confidence appeared in northern India, at some point before the sixth century. It was called chaturanga, and the name is revealing: it described the four parts of an army of that period - foot soldiers, horsemen, chariots and elephants - and each of the four became a different piece on the board. From its very first day, then, chess was a picture of war. I should add that the early game was not always the pure contest of skill we know today: in some versions, players threw dice to decide which piece they were allowed to move.",
  "M|From India the game travelled to Persia, and it was in Persia that it picked up habits we still keep. Persian players called out a warning - shah! - whenever the king was under attack, shah being simply the Persian word for king. And when the king could no longer escape, the phrase was shah mat: the king is helpless. Say those two words quickly, and you can hear our modern word checkmate.",
  "M|The Arab conquest of Persia in the seventh century swept the game into a far larger world. Arab players wrote the first books of chess problems, and carried the board along their trade routes, west across North Africa and, early in the eighth century, up into Spain. From Spain the game seeped slowly into the rest of Europe; carved pieces found by archaeologists show that chess was being played from Scandinavia to Italy by about the year one thousand.",
  "M|Europe, though, rebuilt the game in its own image. The pieces were renamed to match a medieval court. The Persian vizier, the king's adviser - a weak piece that crept one square at a time - was transformed into the queen. The elephant became the bishop, and the chariot became the castle, or rook. Then, at the end of the fifteenth century, came the greatest change of all: the queen was given the long, sweeping moves she has today. The effect was dramatic. A cautious game of slow manoeuvres suddenly became much faster, with real attacks possible from the opening moves. Some players sneered at the new rules; within fifty years, almost nobody played the old ones. And it is worth noting that when the printing press reached England, one of the first books printed there was about chess - a sign of how deeply the game had settled into European life.",
  "M|Let me jump forward to the modern era. In the eighteenth and nineteenth centuries, the true home of chess was the coffee houses of Paris and London, where for the price of a drink anyone could sit and watch the strongest players alive. The first international tournament was organised in London in 1851, and it was won, to general surprise, by a mathematics teacher from Germany - a quiet man who had taken up serious competition only a few years before.",
  "M|Those long Victorian games created a problem you might not expect: time. Some tournament games dragged on for more than ten hours, with one player thinking for an hour over a single move. The answer was the chess clock. The first versions were nothing more than sandglasses; later came the familiar mechanical clock with its two faces, and today's games are timed to the second. Chess without a clock is now almost unthinkable.",
  "M|The twentieth century turned the game into a profession, and world championship matches came to be followed like sporting finals. Then, in 1997, came a moment many had said was impossible: a computer defeated the reigning world champion in a full match. Some commentators announced the death of chess. The opposite happened - people played more than ever, and online platforms now host more games in a single day than the whole nineteenth century managed.",
  "M|I want to finish with the question that fascinates psychologists: what exactly is inside a chess master's head? Show a master a position from a real game for five seconds, and the master can usually rebuild it almost perfectly, while a beginner places five or six pieces correctly. Show both of them a board of randomly scattered pieces, however, and the master is hardly better than the beginner. The conclusion has become famous: masters do not photograph the board piece by piece. They read it in familiar patterns, in the same way that you are reading this sentence in whole words rather than single letters. Chess, which began as a model of the battlefield, has ended as one of our best models of the human mind.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "upset5-s1.wav" $s1
Render "upset5-s2.wav" $s2
Render "upset5-s3.wav" $s3
Render "upset5-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
