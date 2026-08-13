# Generates the four Practice Set 1 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman phoning a dental clinic to register as a new patient and book her first appointment. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Good afternoon, Pearl Dental Clinic. How can I help you?",
  "F|Oh, hello. I've just moved to this part of the city, and I'd like to register as a new patient, please.",
  "M|Of course, we can do that over the phone. Now, we have two branches - although I should say straight away that the Green Street branch isn't taking new patients at the moment, so you'd be registered with us here at Riverside. Is that all right?",
  "F|Riverside is actually better for me - it's closer to where I work.",
  "M|Lovely. Let me take some details, then. Could I have your full name?",
  "F|Yes, it's Malika Yuldasheva.",
  "M|Could you spell the surname for me?",
  "F|Of course. It's Y, U, L, D, A, S, H, E, V, A. Yuldasheva.",
  "M|Y, U, L, D, A, S, H, E, V, A. Thank you. And your date of birth?",
  "F|The twenty-first of March, nineteen ninety-eight.",
  "M|Sorry - did you say the twelfth?",
  "F|No, the twenty-first. Two one.",
  "M|The twenty-first of March, got it. And your address?",
  "F|It's flat three, fifteen Linden Avenue.",
  "M|Linden... is that the turning just beside the park?",
  "F|That's the one. Number fifteen - people often write thirteen, but it's fifteen.",
  "M|Fifteen. Fine. Now, we also ask for your occupation - it's just for our records.",
  "F|I'm a nurse. I work at the city hospital.",
  "M|A nurse, thank you. And one last thing for the form - how did you hear about us? Was it the website, or perhaps our advertisement in the paper?",
  "F|Neither, actually. A colleague of mine is a patient here, and she recommended you.",
  "M|A recommendation - always nice to hear. Right, that's the registration details done.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|Could you tell me about the fees? I believe there's a charge for registering.",
  "M|There is. The registration fee is one hundred thousand som - oh, forgive me, no, that's the rate for a whole family. For one adult it's eighty thousand, and that does include your first X-ray, so it's better value than it sounds.",
  "F|Eighty thousand, with the X-ray included. That's fine. And a normal check-up after that?",
  "M|A standard check-up is one hundred and fifty thousand som.",
  "F|All right. Could I book my first appointment now? Mornings are best for me.",
  "M|Let me look at the diary. We could see you on Monday morning - ah, no, I'm so sorry, the clinic is closed on Mondays. What about Thursday morning?",
  "F|Thursday works. What times do you have?",
  "M|There's a quarter past eleven... no, wait, that's just been taken. I can offer you ten thirty.",
  "F|Ten thirty on Thursday. Perfect.",
  "M|Do arrive about ten minutes early, if you can - there's a short medical form to complete when you first come in.",
  "F|Will do. Is there anything I should bring with me?",
  "M|Just one thing, and it's important: a list of any medication you take regularly. The dentist needs to see it before any treatment.",
  "F|A list of my medication. Fine. Oh - and is there anywhere to park?",
  "M|Yes, there are free spaces behind the building. The entrance to the car park is in Cherry Lane, not on the main road.",
  "F|Behind the building, off Cherry Lane. Great.",
  "M|And finally, we send every patient a reminder the day before their visit. We used to telephone, but people rarely answer numbers they don't know - so it comes by email now. Could I take your email address?",
  "F|Of course, it's...",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a transport officer explaining changes that are being made to the city bus network. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming. My name's Dilbar Rasulova, I'm a transport officer with the city council, and I'm here to walk you through the changes we're making to the bus network over the coming year.",
  "F|Let me start with the obvious question: why change anything at all? Some people assume it's about congestion in the city centre. In fact, since the tram line opened, traffic in the centre is actually moving better than it has for years. Others have suggested our vehicles are simply worn out - but more than half the fleet is under five years old. The real issue is this: over the last decade, tens of thousands of people have moved into the new housing districts on the eastern side of the city, and the buses still follow routes that were drawn up twenty years ago, when those districts were empty fields. Whole neighbourhoods are effectively without a service, and that is what we are putting right.",
  "F|Now, night services. There's been a persistent rumour that night buses are being cut to save money, and I want to deal with that directly. The truth is the opposite: the number of night buses will go up, not down. At the moment four routes run after midnight; from next year there will be seven.",
  "F|Ticketing is changing too. From January, you will no longer be able to pay the driver in cash. I know some passengers will find that hard at first, but counting coins at the door is the single biggest cause of delay at stops. You'll still be able to pay by bank card, just by touching it on the reader, and of course the transport app continues exactly as before.",
  "F|One more general point. Where should you go for information as the changes come in? The notices at bus stops will be replaced in stages, so I'm afraid some of them will be out of date for a while, and the free newspaper only prints a short summary once a month. The one place that is always current is the city website - everything is updated there the moment a change is confirmed, so please make that your first stop.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "M|Now listen and answer questions fifteen to twenty.",
  "F|Right - let me go through the routes that are affected, one by one.",
  "F|First, route four. There was a lot of talk in the spring about route four being withdrawn altogether, and I'm glad to say that is not happening - it stays. But it will not look quite the same: in the city centre, it currently crawls along Market Street, which is being pedestrianised, so within the centre the buses will follow a completely different route, going around by the ring road and approaching the square from the north. Outside the centre, nothing changes.",
  "F|Route nine is our busiest route, and frankly it has been overcrowded for years. From March it will simply run more often - every eight minutes during the day instead of every fifteen. Same vehicles, same stops, just far more of them.",
  "F|Route twelve. At the moment it terminates at the stadium, which made sense when the stadium was the edge of the city. It isn't any more. The route is being extended past the retail park to a brand-new terminus at the exhibition centre, adding about ten minutes to the full journey.",
  "F|Route seventeen has the opposite problem - it stops too often. In places the stops are barely two hundred metres apart, and the end-to-end journey is painfully slow. We're removing roughly a third of the stops along the route, so it will call at fewer places but get you there considerably faster.",
  "F|Route twenty-three is the one I'm most excited about. It has been chosen as the first route in the city to be operated entirely by the new electric buses. They're quieter, they're smoother, and there are no exhaust fumes at all. If the trial goes well, other routes will follow.",
  "F|And finally route thirty-one, which serves the central market. The traders there start work at dawn, and they have told us for years that the first bus arrives too late to be any use. We've listened: from March the first departure will be at five in the morning instead of six. The rest of the timetable is unchanged.",
  "F|That's everything for tonight - thank you, and I'm happy to take questions over coffee.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two geology students, Sardor and Zilola, planning their coastal field trip. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Zilola, we need to get this field trip plan to Dr Amirova by Friday. Shall we start with why we picked Redgate Cliffs? She'll want a justification.",
  "F|Sure. And let's be honest about it - it's not the easiest place to get to. The bus only goes as far as the village, and it's a forty-minute walk after that.",
  "M|True. And it's not because of Dr Amirova either - I know she did her doctorate research on this coast, but that was at Whitesand Cove, further along.",
  "F|Exactly. The real reason is the rockfall in February. A huge section of the cliff face came down, and it's exposed completely fresh rock - beds that nobody has been able to examine before. That's a genuine opportunity, and it won't last; the sea will weather it within a couple of years.",
  "M|Agreed - the fresh exposure goes in the plan as our main reason. Now, transport. I assumed we'd book the university minibus.",
  "F|I tried. It's already reserved that whole week - the biology students have it for their wetland survey. And the train is no good either: the coastal line is closed for engineering work until the summer.",
  "M|So that leaves driving. Your brother's car?",
  "F|He's agreed, as long as we pay for the fuel. So yes - we go by car.",
  "M|Fine by me. Now, there's a departmental requirement before any coastal fieldwork, isn't there? I thought we needed the landowner's written permission.",
  "F|Not at Redgate - the shore below the high-water mark is public, so there's no permission to get. And the university insurance already covers field trips, so we don't buy anything extra. What we do have to do is attend the safety briefing. It runs every Wednesday at four, and Dr Amirova won't sign our plan until we've been.",
  "M|Then let's go this Wednesday. Speaking of safety - did you read the geology society's page about the site?",
  "F|I did. And it surprised me. You'd think the big danger would be rocks coming off that new cliff face, and they do warn about it, and about the slippery boulders near the point. But they're very clear about the greatest risk: the tide comes in across the flats faster than a person can walk, and the beach below the cliffs gets completely cut off two hours before high water. People have had to be rescued there.",
  "M|So we plan the whole visit around low tide. Right - recording. I was going to print paper forms, like we did at the quarry.",
  "F|Paper was a disaster at the quarry, Sardor - half the sheets got soaked. And typing readings into our phones is fiddly with cold fingers. The department will lend us a field tablet, the waterproof one, and the logging software is already on it.",
  "M|You're right - the tablet it is. Last thing on this list: what exactly does Dr Amirova want from us for the assessment? I assumed a set of labelled photographs.",
  "F|Photos are encouraged, but they're not what's marked. And we're definitely not bringing back rock samples - the site's protected, you can't remove anything. What she requires is a scale drawing of the cliff face, with every bed measured and labelled. That's the assessed piece of work.",
  "M|A scale drawing. OK, noted.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|Let's sort out equipment. What do we need from the department store room?",
  "M|Well, not a camera tripod - you've got that little folding one, haven't you?",
  "F|Yes, mine's fine for what we need. But we can't measure the dip of the beds without a clinometer, and neither of us owns one - that we borrow.",
  "M|Agreed, the clinometer. And after that rockfall I'm not standing under that cliff without head protection. Hard hats are the other thing - the department has a whole shelf of them.",
  "F|Good - clinometer and hard hats from the store room. What about a measuring tape? Oh wait - you've got your father's thirty-metre one.",
  "M|I do, it's in my room. And sample bags we simply don't need, since nothing leaves the site.",
  "F|Right. Now, jobs to do before we leave. The tide timetable?",
  "M|Already dealt with - Dr Amirova's assistant checked it when she approved our week, and she's emailed it to us. But I do want a proper geological map of the coast, the survey one. You can download it from the library service - shall I do that tonight?",
  "F|Yes, do. And I'll sort out the first-aid kit - ours needs restocking, so I'll buy plasters and bandages and pack it properly this weekend.",
  "M|Good. Do we need to email the coastguard, by the way? Someone in the year above said you have to notify them.",
  "F|Not for a daytime visit - the department office does that automatically when they file our plan. And there's nothing to print, either, now we're using the tablet.",
  "M|So: you pack the first-aid kit, I download the map. Wednesday, safety briefing. I'll start the risk assessment form tonight.",
  "F|Deal. Redgate Cliffs, here we come.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of soap and cleanliness. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. This week we've been looking at the chemistry of everyday substances, and today I want to talk about one of the oldest manufactured products in human history: soap. It's something you used this morning without thinking - and yet its story runs through four and a half thousand years of technology, trade, medicine and even advertising.",
  "F|Let's begin at the beginning. The oldest soap recipe we know of is written on a Babylonian clay tablet that is about four and a half thousand years old. And the recipe is essentially the one humanity used ever after: you boil animal fat together with ash - the ash taken from burned wood. The alkali in the ash reacts with the fat, and the result is a crude but genuine soap. What's interesting is what it was for. This early soap wasn't used on the body at all. It was used for washing wool, to strip out the grease before the fibres were dyed. Soap, in other words, began its life as an industrial product, not a personal one.",
  "F|The Romans, famously enthusiastic bathers, mostly did without it. A Roman at the baths would cover his skin with olive oil and then remove the oil, and the dirt with it, using a curved metal scraper. And I should stress that Roman baths were social centres quite as much as places for washing - business was done there, gossip was exchanged there. Cleanliness was a public activity.",
  "F|Moving into the Middle Ages, soap-making became a specialist craft, concentrated in particular cities - Aleppo in Syria, and later Marseille in France, both of which gave their names to famous soaps. The key improvement was in the ingredients: the finest soaps replaced animal fat with olive oil, which produced a harder, whiter, altogether more pleasant bar. But good soap remained expensive, and in England the government made it more expensive still. Soap was taxed so heavily, for a century and a half, that it became a luxury - something an ordinary family used sparingly, if at all. Soap boilers worked under official supervision, and the tax was not finally abolished until the eighteen fifties.",
  "F|And there was another obstacle to cleanliness, stranger to modern ears: fear. For several centuries many European doctors actively warned their patients against bathing. Water, they believed, entered the body through the pores of the skin, carrying disease with it. A layer of grime was considered protective. So people cleaned themselves by changing their linen shirts rather than by washing - visible white linen was the badge of a clean person.",
  "F|Everything changed in the nineteenth century, and it changed for two reasons: chemistry and medicine. First, chemistry. Soap needs alkali, and for thousands of years alkali had come from ashes, which were scarce and variable. Then French and British chemists worked out how to manufacture soda on an industrial scale from common salt - ordinary salt, available in unlimited quantities. The price of soap's key ingredient collapsed. Second, medicine. Doctors finally demonstrated what we now take for granted: that washing the hands prevents the spread of infection. In Vienna, a physician insisted that the doctors on his maternity wards wash their hands before examining patients, and deaths on those wards fell sharply, almost at once. When the germ theory of disease was accepted a generation later, soap stopped being a cosmetic and became an instrument of public health.",
  "F|Cheap soap plus a health message created an enormous market, and that market created something else: modern advertising. Soap was among the very first products in the world to be sold under a brand name - wrapped, stamped and promoted with posters, jingles and celebrity endorsements. Some of the biggest consumer companies on earth today began as nineteenth-century soap firms.",
  "F|The twentieth century brought the final twist. During the First World War, fats were desperately needed for food, and soap-makers ran short of raw material. Chemists responded by building cleaning molecules from other sources, and the first synthetic detergents were developed in Germany. Detergents behave like soap but tolerate hard water far better, and they conquered the laundry. In fact, most of what we call soap today - shower gels, liquid hand washes - is technically detergent, not soap at all.",
  "F|And the story is not over. Our own century has begun to ask whether we can be too clean. The skin carries a permanent population of helpful bacteria, which crowd out harmful organisms, and there is growing evidence that the overuse of antibacterial products damages these allies. Four and a half thousand years after that clay tablet, we are still learning what washing really does.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset1-s1.wav" $s1
Render "pset1-s2.wav" $s2
Render "pset1-s3.wav" $s3
Render "pset1-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
