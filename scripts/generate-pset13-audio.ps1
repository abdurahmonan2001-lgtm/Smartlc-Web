# Generates the four Practice Set 13 listening recordings with Windows TTS.
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
  "M|Part one. You will hear a woman telephoning a campsite to book a pitch for a family holiday. First, you have some time to look at questions one to five.",
  "P|8",
  "M|Now listen carefully and answer questions one to five.",
  "M|Willow Bank Campsite, good morning.",
  "F|Good morning. I'd like to book a pitch for a tent, if you have anything left in August.",
  "M|I should think so. Just so you can picture us - we're right on the edge of the village, with the footpath to the river running along the bottom of the site. Can I take your name?",
  "F|Yes, it's Dilnoza Tursunova.",
  "M|Could you spell the surname for me?",
  "F|Certainly. T, U, R, S, U, N, O, V, A. Tursunova.",
  "M|Thank you. Now, we have two camping fields. The meadow is the bigger one, up near the road, and I'll be honest, it gets noisy in the evenings because that's where the large groups go. The orchard field is smaller and much quieter - families nearly always prefer it.",
  "F|The orchard field, definitely. We have a small child with us.",
  "M|The orchard it is. And which dates were you thinking of?",
  "F|We were hoping to arrive on Friday the fifth of August.",
  "M|Ah. The fifth is the weekend of the village show, and the orchard is fully booked already. I could do the Friday after, the twelfth.",
  "F|Friday the twelfth is fine. Three nights, so we'd leave on the Monday.",
  "M|Three nights in the orchard. Now, the price. Our standard rate this year is ninety thousand som a night, but that's the meadow. The orchard pitches are the older ones, so they are seventy-five thousand a night, and that covers two adults and one child.",
  "F|Seventy-five thousand a night. That's very reasonable.",
  "M|If you want electricity, a hook-up is twenty thousand som a night on top, though for a tent you probably won't need it.",
  "F|No, we'll manage without.",
  "M|And you can bring one car per pitch and park it beside the tent, so you won't be carrying everything across the field.",
  "M|Before you hear the rest of the conversation, you have some time to look at questions six to ten.",
  "P|8",
  "M|Now listen and answer questions six to ten.",
  "F|Is there anything I ought to bring that people usually forget?",
  "M|There is. The ground in the orchard is very stony, so do bring a mallet for the tent pegs. People turn up with pegs and nothing to knock them in with, and then they borrow ours all week.",
  "F|A mallet. Noted.",
  "M|And there's one rule I have to mention. We allow no barbecues anywhere on the site - the hedges are far too dry in summer. We've built two fire pits by the washroom, and you're very welcome to cook on those.",
  "F|No barbecues, fire pits by the washroom. Understood. Is there anywhere to buy food?",
  "M|There's a small shop by the gate. It sells milk and bread, and a few tins; for anything more interesting you'd want the supermarket in town. The shop stays open until eight in the evening.",
  "F|Milk and bread, open until eight. And how would we get into town without taking the car?",
  "M|There's a bus stop outside the post office, about ten minutes' walk from our gate.",
  "F|Perfect. What time may we arrive?",
  "M|Any time after two in the afternoon. We used to say twelve, but we need the mornings to clean the pitches. And do try to be here before ten, because the gate is locked at ten at night.",
  "F|After two, and here before ten. Right.",
  "M|As for payment, we don't take a deposit at all, so there's nothing to pay today. You settle up by card when you arrive - we stopped taking cash last season.",
  "F|By card on arrival. And will I get anything in writing?",
  "M|You will. We used to post a booking letter out, but it never arrived in time, so now everything goes by text. Your confirmation will reach you as a text within the hour.",
  "F|Wonderful. Thank you very much indeed.",
  "M|That is the end of part one.",
  "P|5"
)

$s2 = @(
  "M|Part two. You will hear a heritage officer speaking at the launch of a new town heritage trail. First, you have some time to look at questions eleven to fourteen.",
  "P|8",
  "M|Now listen carefully and answer questions eleven to fourteen.",
  "F|Good evening, everyone, and thank you for coming out on such a wet night to open the Northgate Heritage Trail.",
  "F|People keep asking me whose idea this was, and I am always pleased to correct them. It was not the museum. My colleagues there have done an enormous amount of the research, and I could not have written a word of the guide without them, but the idea was not theirs. Nor was it the walking club, although they walked every step of the route for us last spring and told us where the mud was. The trail began as a class project at Northgate Primary: a group of nine-year-olds drew a map of the buildings they thought a stranger ought to see, and it was so good that the council simply built the trail around it.",
  "F|Money, then, since somebody always asks. We did apply to the national heritage fund, and I will be honest with you, we were turned down twice. The shops along the high street paid for the printed maps, which was generous of them. But the trail itself - the posts, the signs, the repairs to the stonework - was paid for by the people of this town. The concerts, the winter fair and that extraordinary sponsored walk together raised more than three quarters of what we needed.",
  "F|Now, this town has had guided walks before, and you may be wondering what makes this one different. It is not the length, and it is not the leaflet. What is new is that eleven of our twenty markers stand in front of nothing at all. Wherever a building has been pulled down, we have put up a post carrying a picture of what used to stand there. This trail is as much about what the town has lost as about what it has kept.",
  "F|One practical warning. The printed map tells you to begin at the museum, and we shall be correcting that in the next edition, because the museum does not open until eleven and half of you will want to set off long before that. Begin at the market square instead - the first marker is beside the old water pump - and you will reach the museum at about the right time for coffee.",
  "M|Before you hear the rest of the talk, you have some time to look at questions fifteen to twenty.",
  "P|8",
  "F|Let me say a word about six of the places the trail will take you past.",
  "F|The old mill is the obvious landmark, and everybody photographs it. Do read the post beside it, though, because the building you are looking at is not the medieval one. That burned down in nineteen eleven, and what you see went up two years later on the same walls, which is why the windows are the wrong shape.",
  "F|The tannery yard is immediately behind it, and visitors expect a ruin. In fact a firm of joiners has worked in those buildings since the nineteen fifties, and if you go on a weekday they will wave at you through the doorway. It is a working yard, and it always has been.",
  "F|Then the ferry steps, down at the water. They are hard to imagine now. Before the bridge was built, every person, cart and animal crossing this river came down that one narrow gap in the wall, and for three hundred years it was the busiest few square metres in the town.",
  "F|The almshouses on Chapel Lane are the prettiest thing on the route, and I must ask you to remember that they are somebody's home. Eight families live behind those doors, so please admire the front from the pavement and do not go through the gate.",
  "F|The ropewalk is the one I would not miss: a long narrow shed where rope was twisted by hand, three hundred feet of it. Every other ropewalk in the region has been demolished, so this is the only one left standing anywhere in the county.",
  "F|And finally the ice house, which is my favourite, because nobody knew it was there. When the contractors were digging out the foundations for the new car park, a machine went straight through the roof of it, and we found a brick chamber nobody had opened since the eighteen nineties.",
  "F|Right. The rain has stopped, so let us go and look at the first post.",
  "M|That is the end of part two.",
  "P|5"
)

$s3 = @(
  "M|Part three. You will hear two environmental science students, Sherzod and Gulnora, discussing a survey of a river. First, you have some time to look at questions twenty-one to twenty-six.",
  "P|8",
  "M|Now listen carefully and answer questions twenty-one to twenty-six.",
  "M|Gulnora, before we write the introduction - why did we settle on the Kelesh in the end? Doctor Rahimova is bound to ask.",
  "F|She is, and it was not her suggestion, whatever she remembers. She wanted us on the canal, because of the easy access. And it was not the stream behind the halls of residence either - I know you liked that one, but it is two metres wide and we would have finished in a day.",
  "M|So what do we write?",
  "F|The truth. There is a survey of the Kelesh from ten years ago, the same three reaches, more or less the same methods. Nobody else in our year can set their results against anything at all. That is the whole value of it.",
  "M|Agreed, the comparison is the point. Right - the first visit. What do we put down as the thing that took us by surprise?",
  "F|The litter, obviously. No, wait, that is not honest. I expected the litter, and it was worse in the old photographs than it is now.",
  "M|The anglers did not surprise me either, whatever you say. What I could not get over was how far down the water was. The old maps show the channel full to the top of the shingle, and we were walking about on dry stones a metre below that.",
  "F|Three dry summers, that is what that is. Put it down: the water level was far lower than the earlier record led us to expect.",
  "M|Now, water quality. The chemistry kits are all sitting in the store - nitrate, phosphate, the lot.",
  "F|They are, and they would tell us exactly what the river was like at eleven o'clock on a Tuesday morning. That is all they would tell us. And before you suggest the data logger, there is one for the whole department and the third-years have it until June.",
  "M|So we do the invertebrates.",
  "F|We do the invertebrates. The mayflies and the shrimps are either living in that gravel or they are not, and what is living in the gravel tells you what the water has been like for months, not for a morning.",
  "M|Fine. My worry is the sampling itself. Not identifying the creatures - the charts are good enough for that. And the weather can do what it likes, frankly, we will be standing in waders anyway. It is simply getting down to the water. Two of the three reaches are behind fences and the middle one runs through a farm.",
  "F|Which means writing to the landowner and waiting. Yes, that is the real obstacle, not the science.",
  "M|What did Doctor Rahimova say when you saw her?",
  "F|She was unusually blunt. She did not mind us working on our own - she said a joint project with the geography group would only cause arguments - and she was not worried about repeat visits either, because once per site is enough for a module this size. What she said was that six sites is student ambition, not science. Do three, she said, and do them properly.",
  "M|Three it is. One last thing before the break - the old study. The species list is the obvious thing to lift from it, though half the names have changed since then.",
  "F|And the maps in it are hopeless. Hand drawn, no grid references, which is precisely why the sites were so hard to find.",
  "M|But those photographs. You can see the bank at every reach, and how much of it has fallen into the river since.",
  "F|The photographs are worth more than the rest of that report put together. That is what I would say in the review.",
  "M|Before you hear the rest of the discussion, you have some time to look at questions twenty-seven to thirty.",
  "P|8",
  "M|Now listen and answer questions twenty-seven to thirty.",
  "F|So in the review we also have to say what was wrong with the old survey.",
  "M|There is plenty. Although it was published, at least - it sits in the departmental library, so we cannot complain about that. And they took samples enough, three replicates at every point, which is more than we are doing.",
  "F|The equipment was perfectly good as well, from the description. Standard nets, standard sieve. Two things, though, and they are both serious. Everything was collected in one August. A river in August is not the river in March, and they drew conclusions about the whole year from a fortnight of summer.",
  "M|That is the big one. And the second is the site descriptions. Downstream of the mill is not a location. Without a single grid reference we have spent two weekends guessing where they stood.",
  "F|Those two go in the review, then. Now, jobs before the next visit.",
  "M|The waders first. The store has plenty, we collect them on the morning, so that is not a job.",
  "F|And I am not checking a forecast a fortnight ahead, it will only be wrong. Two real things, then. I will write to the farmer today, because if he says no we need time to move the middle reach somewhere else.",
  "M|And I will book the minibus. There is one department vehicle and the field course takes it every Thursday, so if I leave it we will be carrying nets on the public bus.",
  "F|Charts we already have - the library set is perfectly good, so do not buy anything.",
  "M|Letter and minibus. See you Thursday.",
  "M|That is the end of part three.",
  "P|5"
)

$s4 = @(
  "M|Part four. You will hear part of a lecture about the history of clocks. First, you have some time to look at questions thirty-one to forty.",
  "P|8",
  "M|Now listen carefully and answer questions thirty-one to forty.",
  "F|Good morning. Last week we discussed the calendar, which divides up the year. This week we go the other way, and divide up the day: the history of clocks.",
  "F|For most of human history the sun did the work. The Egyptians raised tall stone obelisks in their squares, and the citizens told the time by watching the shadow move across the paving around them. The device we now call the sundial is simply that idea made portable. It has one obvious weakness, and the ancient world felt it keenly: on a cloudy day, or at night, it tells you nothing whatsoever.",
  "F|The answer was to measure something that keeps flowing whatever the sky is doing, and the oldest solution is water. In a water clock, water escapes through a small hole in a bowl at a steady rate, and the level that is left records how much time has gone. The Greeks used them in their law courts, where each speaker was allowed a fixed quantity of water and not a drop more. Water clocks were the best instruments in the world for something like three thousand years, and they still had one great fault: they froze, they clogged, and they had to be refilled by hand.",
  "F|The mechanical clock appears in Europe at the end of the thirteenth century, and it is worth asking who wanted it. The answer is the monasteries. The monks had to gather at fixed hours for prayer, seven times a day and once in the night, and getting that right in winter, in darkness, with no sun to consult, was a genuine problem. The escapement, the little mechanism that lets a wheel turn one tooth at a time, was invented to solve it.",
  "F|Notice what those first clocks did not have. No face, no hands, and no numbers: they were machines for ringing a bell, and the community heard the time rather than reading it. That is why the word clock itself comes to us from an old word meaning bell. Dials with hands were added only later, when people began to want the time for themselves rather than for the community.",
  "F|Those medieval machines were also spectacularly inaccurate, losing or gaining a quarter of an hour in a day, which nobody much minded. Accuracy arrives suddenly in sixteen fifty-six, when the Dutch scientist Christiaan Huygens applied the pendulum to a clock. A swinging weight takes the same time to swing whatever else is happening, and the effect was extraordinary. Error fell from about fifteen minutes a day to about fifteen seconds a day, a hundredfold improvement in a single step, and for the first time it made sense to put a minute hand on a dial.",
  "F|The pendulum, though, is useless on a moving ship, and that mattered enormously, because a navigator who knows the exact time can work out how far east or west he has sailed. Ships were being lost for want of it. In seventeen fourteen the British parliament offered a prize of twenty thousand pounds for a method of finding longitude at sea, and a Yorkshire carpenter, John Harrison, spent forty years of his life on the problem. His fourth machine, a watch the size of a dinner plate, went to the Caribbean in seventeen sixty-one and came back having lost five seconds in eighty-one days.",
  "F|Now, until the middle of the nineteenth century every town still kept its own time, set by its own noon, and nobody found that inconvenient, because nobody could travel faster than a horse. What ended it was the railways. A timetable is impossible if Bristol is eleven minutes behind London, and within a few years the whole of Britain had been forced onto one standard time, with the rest of the industrial world following.",
  "F|The twentieth century took the escapement out altogether. In nineteen twenty-seven engineers found that a small crystal of quartz, given an electric current, vibrates tens of thousands of times a second and always at the same rate, and that is what is ticking in almost every watch and wall clock sold today. Then in nineteen fifty-five came the atomic clock, which counts the vibrations of the caesium atom and is accurate to a second in millions of years.",
  "F|And that accuracy is not a curiosity. The navigation system in your telephone works by comparing signals from atomic clocks carried in satellites overhead, and an error of one millionth of a second would put you on the wrong street. Next week: the measurement of temperature.",
  "M|That is the end of part four. You now have some time to check your answers."
)

Render "pset13-s1.wav" $s1
Render "pset13-s2.wav" $s2
Render "pset13-s3.wav" $s3
Render "pset13-s4.wav" $s4
$synth.Dispose()
Get-ChildItem $out | Select-Object Name, @{n="MB";e={[math]::Round($_.Length/1MB,1)}}
