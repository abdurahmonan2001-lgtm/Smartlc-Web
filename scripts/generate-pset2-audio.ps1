# Generates the four Practice Set 2 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a swimming pool to arrange lessons for her daughter. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good afternoon, Oakford Pool. How can I help you?",
  "F|Oh, good afternoon. I'd like to enrol my daughter for swimming lessons, please. You do run classes for children, don't you?",
  "M|We certainly do. There are three groups - beginners, improvers, and the swim squad for the stronger ones. Has your daughter had lessons before?",
  "F|No, never. She can splash about, but she's had no proper teaching at all, so it would be the beginners class.",
  "M|The beginners class, lovely. Let me open a form. Can I take her name first?",
  "F|Yes, it's Amina Ismailova.",
  "M|Could you spell the surname for me?",
  "F|Of course. It's I, S, M, A, I, L, O, V, A. Ismailova.",
  "M|I, S, M, A, I, L, O, V, A. Got it. And how old is she?",
  "F|She's six. Well - she'll be seven next month, actually, but she's six now.",
  "M|Then I'll put six on the form - we always go by the age on the day the course starts. Now, days. The children's beginners classes run at the weekend, on Saturday and Sunday afternoons. I have to tell you, though, the Saturday group filled up weeks ago, so I'm afraid it would have to be the Sunday one.",
  "F|That's fine - Sunday is actually easier for us anyway.",
  "M|Sunday it is. Now, the time. The pool opens to the public at four o'clock, but the class itself begins at four fifteen. For the very first lesson, do try to arrive ten minutes early, so she can be shown where everything is.",
  "F|Four fifteen, arrive early the first time. And how long does each lesson last?",
  "M|Forty-five minutes in the water. That's really as long as small children can concentrate.",
  "F|And when does the course actually start?",
  "M|Let me check. The new term begins on the fifteenth of March - oh, hang on, no, forgive me. The fifteenth is the adult course. The children start one week later, on the twenty-second of March.",
  "F|The twenty-second. Let me write that down.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|And what will the course cost me?",
  "M|It's two hundred and fifty thousand som for the whole term. That includes her entry to the pool each week, so you don't pay anything at the door. And if you ever sign up a second child, they get ten per cent off.",
  "F|Two hundred and fifty for the term. That's reasonable. Does she need any special equipment?",
  "M|Very little. We provide the floats and all the other equipment the children use in the water. The one thing she must bring is a swimming cap - that's a hygiene rule here, no cap, no lesson, I'm afraid. Goggles are up to you; some children like them, some don't.",
  "F|A cap. I'll buy one this week. Is there anything I need to fill in?",
  "M|Yes, one thing. Before her first lesson we need a medical form from a parent - it just asks about allergies, skin conditions, that kind of thing. You can download it from our website, or pick one up at the desk.",
  "F|A medical form, fine. Anything else I should know?",
  "M|One practical thing, yes. When you come, don't go to the main door on the high street - it's being rebuilt at the moment and it's all boarded up. Walk round to the side entrance instead; it's clearly signposted.",
  "F|Use the side entrance. Right. And will you send me something confirming all of this?",
  "M|Of course. We used to post booking letters out, but everything goes by email now - it's instant, and nothing gets lost. Could I take your address?",
  "F|Yes, it's amina dot mum at postbox dot com.",
  "M|Perfect. The confirmation will be with you this afternoon, and we'll see Amina on the twenty-second.",
  "F|Wonderful. Thank you so much for your help. Goodbye.",
  "M|Goodbye now.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear the head librarian of the Westbrook Public Library talking to a residents' meeting about the library's new services. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming. A lot has changed at Westbrook Library this year, so let me take you through it.",
  "F|First, opening hours, because that's what our survey asked about. The single most common request was for earlier openings on weekday mornings, and I'm sorry to say we simply can't staff them - eight o'clock starts are beyond us. We also looked again at late opening on Friday evenings. We actually tried that a few years ago, and so few people came that the lighting cost more than the books we lent. But here is what we can do, and I'm delighted about it: from the first of next month, the library will open on Sunday afternoons, from two until six. That's the first time in its history.",
  "F|Second, your membership card is changing. Now, let me calm two worries straight away. The new card is not online-only - you can still get it at the desk from a real human being - and it doesn't cost a single som more than the old one. What is new is much better than that: the new card works at every library in the city. All twelve branches, one card. You can borrow a book here in Westbrook and return it across town.",
  "F|Third, we're starting a home delivery service. When we announced it, people assumed it was for our older members, and certainly many older people will use it. But I want to be clear: it isn't about age at all. The service is for anybody, young or old, who is unable to get to the library - because of illness, disability, or because they're caring for someone at home. A volunteer driver will bring books every two weeks and collect the previous ones.",
  "F|And that brings me to volunteers, because we need more of you. Not for repairing damaged books - those go away to a professional bindery. And our own staff will keep running the little ones' story sessions, don't worry. Where we genuinely need help is with our beginners' computer classes. If you can show another adult how to send an email or fill in a form online, and you can spare one hour a week, please come and talk to me afterwards.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Now, let me walk you round the building, room by room, so you know what's where.",
  "F|The computer room first. We've installed twelve new machines, and they've been so popular that turning up and hoping is no longer realistic. So we've introduced a booking system: you reserve your hour in advance, at the desk or online, up to a week ahead. Booked users always take priority.",
  "F|The local history collection - our maps, our old photographs, the parish records. For years it lived on the top floor, where, let's be honest, nobody ever found it. It has now moved down to the ground floor, right next to the newspaper area, and the difference in visitors has been immediate.",
  "F|Storytime for the under-fives still happens every Saturday morning, as it has for twenty years. What's changed is who runs it. It's now in the hands of a wonderful team of volunteers - most of them retired teachers - and the children absolutely love them.",
  "F|The study pods - those are the small glass rooms along the back wall, if you haven't seen them. You can book one by the hour, and here's the arrangement: the first hour costs nothing, and after that there's a small hourly charge. For most people, the free hour is all they ever need.",
  "F|The cafe by the entrance. Everyone assumes the council paid for it. In fact, the council didn't contribute one som - the whole thing was funded by local businesses. Eight firms from the high street put up the money between them, and I think they deserve our thanks.",
  "F|And finally, upstairs, the media room. Music, films, games consoles, recording software. I'll be honest with you about its purpose: it has been designed for teenagers, twelve to eighteen, and it is deliberately their space, not ours. If you're over twenty, admire it from the doorway.",
  "F|The lift, I'm sorry to say, is still out of action until the spring, so do ask staff if the stairs are difficult. There are leaflets with all the new opening hours at the desk. Thank you.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two psychology students, Nodira and Jasur, discussing the questionnaire they are preparing about mobile phone use. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "F|Jasur, before we get into the questions, I need to write the background section. How did we actually settle on phone use as the topic?",
  "M|Do you remember? Doctor Aliyeva suggested sleep patterns at first, and neither of us was keen.",
  "F|And it wasn't that newspaper survey either - I only found that article afterwards, when we were searching the literature.",
  "M|No. It was that evening in the cafe when we compared our own screen-time figures. Six hours a day. Both of us.",
  "F|We honestly didn't believe our own phones. That was the moment - we were so shocked we decided to study it. Right, that goes in the background.",
  "M|Good. Now, the pilot version. We should be honest about what went wrong with it.",
  "F|Go on - you ran it with your cousins.",
  "M|I did, and here's the thing. Nobody said it was too long - ten minutes, they said that was fine. And nobody minded the personal questions either, which surprised me. The real trouble was the wording. I asked, do you often check your phone in lectures, and two of them stopped and asked me what often meant. Once a day? Once an hour? The same question was being read in completely different ways.",
  "F|So the answers weren't comparable. That's the main thing we fix. Now - how do we actually give this thing out? I did wonder about printing copies and handing them out in lectures.",
  "M|We'd spend the whole budget on paper, and then someone has to type five hundred answer sheets into a spreadsheet. Interviews would give us richer answers, but with just two of us, we'd manage twenty people at most.",
  "F|Whereas the online form does the counting for us the moment someone presses submit. All right, online it is.",
  "M|Agreed. Now, the tutor. When we showed her the draft, what did you note down?",
  "F|Honestly, I expected her to tell us to recruit more first-years, because our sample is so top-heavy. She didn't mention it. Her one firm instruction was to include people who aren't students at all - her point was that otherwise we can only draw conclusions about students, when our title says young people.",
  "M|So we need non-students. Fine. There's one more weakness we have to admit in the write-up - self-reporting.",
  "F|Because people don't tell the truth?",
  "M|Not quite - it's better than that. In every published study I found, people report less phone use than the phone's own records show. They're not lying; they genuinely don't notice how often they pick the thing up. People underestimate, consistently.",
  "F|So how do we check whether our numbers are any good? Running the survey again a month later only tells us it's consistent, not that it's true.",
  "M|And sitting in the library watching people is creepy and slow. No - my plan is this. We ask a small group of volunteers, say twenty, to open the screen-time settings on their phones and share the weekly figure with us. Then we compare what the phone recorded with what they claimed on the form.",
  "F|A proper accuracy check. I like it.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Right, the new sections. We said we'd add two. Money is a dead end, isn't it - nobody has any idea what they spend on apps.",
  "M|A dead end, agreed. And I've already cut the navigation questions - how people use maps interested nobody, including me, frankly.",
  "F|The phone-free zones idea I did like - whether people want them in libraries and restaurants. But the questionnaire is already at the length limit.",
  "M|So it goes. Which leaves the two we actually add. First, the section on using phones while studying - whether people can read for half an hour without checking. That's the one the tutor said was the most original.",
  "F|And second, the night section: whether people wake up and check their phones during the night, and whether the phone sleeps in the bedroom. Those two go in.",
  "M|Done. Now, jobs before Thursday. The consent statement comes first - the current one is copied from an old handout, and it never even tells people their answers are anonymous. It has to be rewritten from scratch.",
  "F|I'll rewrite it tonight. And we agreed the new draft gets tested on five people from our class before Thursday - a mini pilot, just to catch any wording problems we've missed.",
  "M|Yes, you take three, I'll take two. And remember she told us not to email her drafts - she wants to see it at the Thursday meeting, on paper.",
  "F|No emailing, then. And no room to book, since it's all online, and posters can wait until we actually launch. Consent statement and the five classmates - that's the week.",
  "M|That's the week. Coffee?",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of ice cream. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Today's lecture is about something you all know very well, and know nothing about: ice cream. It has a longer and stranger history than almost any food in the freezer.",
  "F|Let me start with a correction to the popular story. Frozen desserts are far, far older than ice cream itself. More than a thousand years ago, in the cities of Tang dynasty China, cooks were already serving a chilled delicacy made from milk that had been mixed with rice, then packed into snow to freeze. It wasn't ice cream as we know it, but milk, frozen and sweetened, was on aristocratic tables in China a millennium before Europe managed it. Further west, in Persia, there was a different tradition: elegant fruit drinks, flavoured with rose water and cherries, that were cooled with snow - real mountain snow, carried down from the peaks by runners and stored through the summer in deep, cleverly ventilated ice houses. The Roman emperors, incidentally, had the same appetite: they too sent runners to the mountains to fetch ice for flavoured desserts, and paid handsomely for it.",
  "F|Now to Europe. The first true flavoured water ices - what the Italians call sorbetto - were made in Italy in the sixteenth century, in the kitchens of Florence and Naples. According to the famous story, the taste then travelled to France after a royal wedding, when an Italian bride married a French king and brought her cooks and their recipes with her. I have to tell you that historians can find no menu, no letter, no bill to support this - it is probably a legend - but legends usually point at a truth, and the truth is that Italian confectioners did carry the craft north. What happened next tells you everything about the economics of luxury. For many years the recipes were kept secret by the cooks at the royal courts. A man who knew how to freeze cream was a valuable man, and he did not publish. The essential trick, when it finally leaked out, was chemistry: if you mix ice with salt, the melting mixture becomes far colder than ice alone - cold enough to freeze a bowl of sweetened cream packed inside it. That one discovery is the foundation of every ice cream ever made.",
  "F|The nineteenth century turned this aristocratic secret into everybody's treat, and two humble inventions did the work. The first came in eighteen forty-three, when an American named Nancy Johnson patented a hand-turned churn - a wooden bucket of ice and salt with a metal container inside, and a paddle, turned by a crank, that scraped and stirred the cream as it froze. Smooth ice cream, in twenty minutes, in any kitchen. The second was not a machine but a trade. Ice itself became an industry: in winter, ice was cut from frozen lakes in great blocks, and stored right through the summer in buildings insulated with straw - tons of it, packed between the blocks so thickly that the ice lasted until autumn. Cheap ice meant cheap ice cream. In the growing cities, Italian street sellers - famous in London, where the children called their wares hokey pokey - made ice cream part of ordinary city life, a penny a lick, for the first time in history.",
  "F|Two more dates. In nineteen oh four, at the world's fair in Saint Louis, an ice cream stall ran out of dishes, and a neighbouring stall - selling thin waffles - began rolling them into holders. Whether or not that story is exactly true, it was the fair that made the cone popular, and it remains ice cream's perfect container: you eat the packaging. And then the twentieth century completed the journey. Ice cream made in factories, sold everywhere, kept in the home, depended on one technology above all - the spread of electricity, which put a freezer first in every shop and then in every kitchen, and quietly killed the ice trade in a generation.",
  "F|Today ice cream is a global industry worth tens of billions of dollars, and the biggest eaters may surprise you: per person, the world champions are New Zealand and the United States, with Australia close behind. And it remains a serious business of the senses. Before a new flavour reaches a single shop, the big producers test it on panels of trained tasters - professionals who can tell you, spoonful by spoonful, whether the vanilla is Madagascan and whether the texture will survive a supermarket freezer. From frozen rice in Tang China to the laboratory taste panel: that is the thousand-year journey of ice cream. Next week, the history of chocolate. Thank you.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset2-s1.wav" $s1
Render "pset2-s2.wav" $s2
Render "pset2-s3.wav" $s3
Render "pset2-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
