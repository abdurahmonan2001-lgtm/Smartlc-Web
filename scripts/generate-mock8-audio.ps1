# Generates the four Mock Test 8 listening recordings with Windows TTS.
# Same conventions as Mocks 1-2: "F|"/"M|" pick the voice, "P|<seconds>" is
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
  "M|Part one. You will hear a woman phoning an agency about renting a holiday cottage. First, you have some time to look at questions one to five.",
  "P|20",
  "M|Now listen carefully and answer questions one to five.",
  "M|Hollowdale Holiday Cottages, good morning.",
  "F|Oh, good morning. I'm ringing about renting one of your cottages in August, for my family.",
  "M|Certainly. Let me take a few details. Could I have your name, please?",
  "F|Yes, it's Kamola Rahimova.",
  "M|Could you spell the surname for me?",
  "F|Of course. R, A, H, I, M, O, V, A. Rahimova.",
  "M|Thank you. And how many of you will there be?",
  "F|Six altogether. My husband and me, our three children, and my mother.",
  "M|Six, right. Then I'd suggest Heron Cottage. Swallow Cottage is charming, but it only sleeps four. Heron sleeps six very comfortably.",
  "F|Heron - as in the bird?",
  "M|Exactly, like the tall grey bird. It stands on its own, about three kilometres from the village of Askwell. A very quiet lane, and wonderful walking country all around.",
  "F|That sounds perfect. Now, dates. We were hoping to arrive on Friday the twelfth of August.",
  "M|Let me check... ah, I'm sorry, the cottage is already booked that week. It's free from Friday the nineteenth, though.",
  "F|The nineteenth... yes, we can manage that.",
  "M|And how long would you like to stay?",
  "F|Just the one week - seven nights, Friday to Friday.",
  "M|Seven nights, lovely. Now, the rent. You may have seen five hundred and eighty pounds on our website, but I'm afraid prices went up in April. For August it's six hundred and forty pounds for the week - and that does include all your electricity.",
  "F|Six hundred and forty. All right, that's fine.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|20",
  "M|Now listen and answer questions six to ten.",
  "F|Do you need any money from us now?",
  "M|We ask for a deposit of one hundred and fifty pounds to hold the booking. It's fully refundable - we return it within a week of your departure, provided nothing is damaged.",
  "F|That's fair. And is the cottage warm in the evenings? My mother feels the cold.",
  "M|Very cosy. There's a wood burner in the sitting room, and we leave a big basket of logs for you - no charge for those.",
  "F|Lovely. What should we bring with us?",
  "M|Very little. All the beds are made up when you arrive, and the kitchen has everything. The one thing guests must bring is their own towels - we stopped providing those.",
  "F|Towels, I'll note that down. Oh - and we have a dog. Is that a problem?",
  "M|Not at all, one dog is allowed. We simply ask that it's kept off the furniture.",
  "F|Of course. Is there somewhere nearby to buy food?",
  "M|There's a very good shop in Askwell. It used to shut on Sundays, but the new owners changed all that - it opens on Sundays now and closes on Mondays instead. So don't arrive planning to do your shopping on a Monday.",
  "F|Closed on Mondays - got it. And how do we actually find the cottage?",
  "M|Now this is important, because the satnav sends everyone the wrong way. It tells you to turn at the church - ignore it. Carry straight on through the village, and turn left just after the bridge. The cottage is right at the end of the lane.",
  "F|Left just after the bridge. Wonderful. Thank you so much for your help.",
  "M|A pleasure. I'll email the booking form to you today. Goodbye.",
  "M|That is the end of part one. You now have half a minute to check your answers.",
    "P|5"
)

$s2 = @(
  "M|Part two. You will hear a guide talking to a group of visitors at the start of a tour of a recycling centre. First, you have some time to look at questions eleven to fourteen.",
  "P|20",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good morning everyone, and welcome to the Greenvale Recycling Centre. Before we set off around the site, let me tell you a little about where you're standing.",
  "F|Visitors always ask about this enormous curved roof. Most people guess the building was a bus depot - it does have that look - and there was in fact a street market held on the open ground here for a few years after the original business closed. But the truth is that this site was built over a century ago as a brick factory. Millions of bricks left this yard, and some of them are probably in your own houses.",
  "F|Now, some practical points before we move. You're welcome to keep your bags and cameras with you - there's no need to leave anything here. You'll notice yellow lines painted on the floor in some of the halls; those only matter for our forklift drivers, and we won't be entering those areas anyway. But the one rule that applies to absolutely everyone, staff and visitors alike: you must wear the high-visibility vest we're handing out now, and keep it on until we're back at this door.",
  "F|People sometimes ask about the fire they heard about - that was nearly ten years ago, in the old storage shed, and we've had nothing since. And although the papers say recycling centres can't find workers, our team has actually grown this year. No - our real difficulty came last month, when our brand-new sorting machine broke down three times in a fortnight. The engineers assure me it is behaving itself today.",
  "F|One more thing before we walk, because I'm always asked how the public can help us. It isn't by recycling more types of things - we already take almost everything. And to be fair, most people do put their waste in the correct containers these days. The single most useful thing you can do at home is to wash out your jars, cans and trays before they go in the bin. One dirty container can spoil an entire bale of clean material.",
  "F|Before we walk round, please look at questions fifteen to twenty.",
  "P|8",
  "F|Right - let me tell you what actually happens to each material here, and then you'll see it all close up.",
  "F|We'll start with glass. For years we loaded our glass onto ships and sent it overseas, but not any more. These days it's crushed here into a coarse sand, and that goes into road surfaces - the bypass you drove in on this morning contains last year's bottles.",
  "F|Paper and cardboard, on the other hand, do still leave the country. No mill in this region can cope with our volumes, so it's pressed into bales and sent abroad for processing.",
  "F|Food waste is my favourite part of the tour. It goes into those tall sealed green tanks you can see, where bacteria digest it and give off gas - and we burn that gas to produce energy. Enough, in fact, to run this entire site, with plenty left over for several hundred homes.",
  "F|Garden waste stays even closer to home. We turn it into compost right here on the site - you'll see the long steaming rows in a few minutes, and I promise you'll smell them first.",
  "F|Metal cans are our moneymaker. We sell them to a local business - a metals firm just ten minutes up the road - and they melt them down for new products. People imagine we keep metal in a warehouse waiting for better prices. We never store anything; it's usually gone within the week.",
  "F|And finally, electrical items - kettles, radios, laptops. These never go anywhere near the crusher. They go straight to our repair workshop, where a team of volunteers fixes them up so they can be used again, and about half of everything that comes in gets a second life.",
  "F|The one thing we cannot take here, I'm afraid, is mattresses - the council website will tell you who accepts those.",
  "F|Right - vests on, everyone? Then follow me.",
  "M|That is the end of part two. You now have half a minute to check your answers.",
    "P|5"
)

$s3 = @(
  "M|Part three. You will hear a nursing student called Madina discussing her hospital placement with her supervisor. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|21",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Come in, Madina, sit down. So - we're halfway through your placement, which makes it a good moment to look back. Let's start at the beginning. The surgical ward. Was it your friend Zarina who talked you into that? She was with us last year.",
  "F|Actually, Zarina tried to talk me out of it - she found the ward exhausting. And it's certainly not for convenience; I spend forty minutes on the bus each way. No, the honest reason is that I'd worked in a clinic and in a care home, but I'd never done anything surgical at all. It was the one gap, and I wanted it filled.",
  "M|A very good reason. Thinking back to your first week - what was hardest? Learning everyone's names? The early starts?",
  "F|The names came surprisingly quickly, and the shifts haven't troubled me yet - ask me again when nights begin. What really defeated me at first was the electronic record system. Every ward seems to use it differently, and nobody had shown us anything before we arrived. I was still struggling with it in my second week.",
  "M|Hold that thought - I want to come back to it later. Now, my own observations. Your time management is coming along - not perfect yet, but improving. Emergencies - you're still learning, which is entirely normal at this stage. But what has genuinely impressed me is the way you talk with the elderly patients. You get answers from them that some qualified staff can't.",
  "F|Thank you. My grandmother lived with us for years - perhaps that's why.",
  "M|Now, your case notes. I read Tuesday's.",
  "F|Too much?",
  "M|Far too much. You record everything - what matters and what doesn't, all at the same length. Selection is the skill, Madina.",
  "F|I know. I'm so frightened of leaving out the one important thing that I write down all of it.",
  "M|Understandable, but a note nobody has time to read helps nobody. Now - the medication assessment is in three weeks. How are you feeling about it?",
  "F|Honestly? The drug calculations don't scare me - maths has always been my strong point, and the number of drugs is manageable. It's being watched that gets me. The moment someone stands beside me with a checklist, my hands stop working.",
  "M|Everyone says exactly that, and it fades with practice - we'll run two mock assessments first. And your reflective journal. I read last month's entries. The length is fine, and please don't start filling it with academic references - it isn't an essay. What I want is different: every entry should finish with what you would do differently next time. That is the whole point of reflection.",
  "F|All right. I can do that.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions twenty-seven to thirty.",
  "P|20",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "M|Let's talk about the programme itself. Which parts have actually taught you the most? You went into theatre, didn't you?",
  "F|I did, and watching the operation was thrilling - but standing at the back for three hours, I can't honestly say I learned much. And meeting patients' families I found more stressful than instructive.",
  "M|What about the skills laboratory?",
  "F|It might help if the sessions actually ran - two of mine were cancelled. No, for me it's two things. The weekly tutorials, definitely - having a protected hour to ask all the questions you can't ask on the ward.",
  "M|I'd agree - the tutorials work.",
  "F|And shadowing Nurse Carter for two days. Watching an experienced nurse plan and run a whole shift taught me more than any lecture I've had.",
  "M|Every student who's done it says the same. Agreed - we'll record those as the two real strengths.",
  "M|Now, the faculty has asked us for suggestions for next year's programme. What shall we put forward? Some students have asked for a longer induction.",
  "F|I don't think a longer induction helps - you can't absorb it all in advance anyway. And smaller groups sound lovely, but there aren't enough supervisors as it is.",
  "M|Agreed on both counts. What about your troubles with the computer?",
  "F|That's my first suggestion: train students on the electronic records before the placement starts, not in week three when we've already made every possible mistake.",
  "M|I'll put that at the top of the list. Anything else?",
  "F|Yes. Every ward runs differently, and you waste days working out its routines by trial and error. A short written guide to the ward's routines - where things are kept, how handover works, who to call - would have saved me so much time.",
  "M|A ward handbook. Good - those are our two proposals, then. Someone also suggested more night shifts for students, but I feel nights should wait until the final year.",
  "F|Definitely.",
  "M|Right - same time next week, Madina.",
  "M|That is the end of part three. You now have half a minute to check your answers.",
    "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of silk and the silk trade. First, you have some time to look at questions thirty-one to forty.",
  "P|30",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "M|Today I want to talk about a fabric that, for roughly two thousand years, was worth more than its weight in gold - silk.",
  "M|Let's begin with what silk actually is. The fibre comes from the cocoon of a caterpillar - the larva of a moth that feeds on the leaves of the mulberry tree. When the caterpillar is ready to transform, it spins a protective case around itself from a single continuous strand, and it is that strand we weave.",
  "M|How anyone discovered that this little case could become cloth is lost to history, but China preserves a famous legend. An empress, the story goes, was sitting in her garden when a cocoon dropped from a mulberry branch into her cup of hot tea. As she lifted it out, the softened casing began to unravel between her fingers - and kept unravelling. That detail, at least, is quite accurate: unwound with care, a single cocoon yields an unbroken length of thread approaching one kilometre.",
  "M|Whatever the true origin, the Chinese learned to raise the moths, feed the caterpillars, and reel and weave the fibre. And then they did something remarkable: for centuries, they told nobody. The entire method was treated as a state secret, guarded as closely as any military plan. Under the old laws, anyone who revealed the process to a foreigner, or tried to carry the moths out of the country, could be punished by death.",
  "M|The cloth itself, of course, was for sale, and carrying it westwards created the most famous trade network in history: the Silk Road. Not a single road at all, in reality, but a web of routes threading through high mountain passes and wide deserts. No merchant travelled the whole distance; goods moved in stages, passed from trader to trader, carried by caravans of camels. Silk flowed west, towards Persia and Rome. And coming east into China, in exchange, came glass, horses and, above all, silver. Nor was it only goods that moved. Ideas travelled the same paths - Buddhism entered China with the caravans, carried by merchants and travelling monks.",
  "M|A secret so valuable could not last forever. The story goes that around the year five hundred and fifty, two monks who had spent years in the East arrived at Constantinople with a proposal for the emperor. They went back, and they smuggled out silkworm eggs - hiding them, tradition says, inside their hollow walking canes. However decorated the tale has become, silk production really did begin at Constantinople at about that time. From there, over the following centuries, the craft spread into Europe - first to Italy, whose weaving towns grew rich on it, and later to France, where the city of Lyon became the centre of the European trade.",
  "M|The nineteenth century brought the industry's great crisis. A disease of the silkworms swept through the rearing houses of Europe, killing the caterpillars in their millions, and European production never fully recovered. Then, in the twentieth century, came competition of an entirely new kind: chemists learned to make artificial fibres - above all nylon - which could imitate silk at a fraction of the price. Stockings, parachutes, linings: one by one, silk's markets were taken from it.",
  "M|And yet silk did not disappear. It simply returned to being what it had been at the start - a luxury. Today the world's largest producer is, once again, China, which grows the great majority of the global supply. And the fibre has quietly found new work far from fashion. Because silk is strong, fine, and readily accepted by the human body, surgeons have long used silk stitches for closing wounds, and researchers are now testing silk structures for repairing nerves and even skin.",
  "M|A caterpillar's cocoon, an empress's teacup, and two monks with hollow canes - and behind them all, one of the longest commercial secrets ever kept. That is where we will stop today.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "mock8-s1.wav" $s1
Render "mock8-s2.wav" $s2
Render "mock8-s3.wav" $s3
Render "mock8-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
