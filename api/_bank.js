// SERVER-ONLY question bank. Vercel skips underscore-prefixed files, so this
// never becomes a public endpoint and the answer key never reaches a browser.
// The client receives questions stripped of `answer` (see placement-start.js)
// and all scoring happens in placement-submit.js.

export const GRAMMAR = [
  { id:1,  q:"____ you interested in sport?", options:["Be","Am","Is","Are"], answer:"Are" },
  { id:2,  q:"My ____ is a writer and his books are very popular.", options:["aunt","uncle","sister","mother"], answer:"uncle" },
  { id:3,  q:"Paul is very ____. He's very good at art.", options:["honest","friendly","polite","creative"], answer:"creative" },
  { id:4,  q:"We live in the city centre and our house ____ have a big garden.", options:["doesn't","isn't","aren't","don't"], answer:"doesn't" },
  { id:5,  q:"I ____ arrive at school before nine o'clock.", options:["has to","have to","doesn't have to","haven't to"], answer:"have to" },
  { id:6,  q:"The beach was very crowded ____ Monday.", options:["in","on","at","to"], answer:"on" },
  { id:7,  q:"You ____ eat all that cake! It isn't good for you.", options:["don't","may not","shouldn't","will not"], answer:"shouldn't" },
  { id:8,  q:"Cathy ____ a game on her computer at the moment.", options:["plays","is playing","to play","play"], answer:"is playing" },
  { id:9,  q:"There ____ a lot of people outside the school. What's the problem?", options:["are","is","be","am"], answer:"are" },
  { id:10, q:"____ you like to come out with us tonight?", options:["Do","Would","Are","Will"], answer:"Would" },
  { id:11, q:"How ____ time have we got to do this exercise?", options:["long","many","much","quick"], answer:"much" },
  { id:12, q:"Turn ____ and you'll see the museum on the left.", options:["on the right","rightly","by the right","right"], answer:"right" },
  { id:13, q:"Don't forget to get ____ the bus at Station Road.", options:["out","off","over","down"], answer:"off" },
  { id:14, q:"Tom got the ____ marks in the class for his homework.", options:["worse","worst","baddest","most bad"], answer:"worst" },
  { id:15, q:"There wasn't ____ milk for breakfast this morning so I had toast and orange juice.", options:["a","some","the","any"], answer:"any" },
  { id:16, q:"My sister ____ speak French when she was only six years old.", options:["was","should","could","had"], answer:"could" },
  { id:17, q:"Did you ____ shopping after school yesterday?", options:["went","goed","going","go"], answer:"go" },
  { id:18, q:"I ____ five emails before school today.", options:["sent","sended","did send","was send"], answer:"sent" },
  { id:19, q:"Our teacher speaks English to us ____ so that we can understand her.", options:["slow","slower","more slow","slowly"], answer:"slowly" },
  { id:20, q:"Quick – get the food inside! It ____ any moment.", options:["rains","is raining","is going to rain","can rain"], answer:"is going to rain" },
  { id:21, q:"I ____ the new Batman film yet. Is it any good?", options:["haven't seen","didn't see","don't see","am not seen"], answer:"haven't seen" },
  { id:22, q:"I hope you ____ a good time at the moment in Greece! Phone soon.", options:["are having","have","have had","had"], answer:"are having" },
  { id:23, q:"I wanted to see Harry. How long ago ____ ?", options:["he left","has he left","did he leave","could he leave"], answer:"did he leave" },
  { id:24, q:"Do students in your country have to stand ____ when the teacher arrives?", options:["on","at","in","up"], answer:"up" },
  { id:25, q:"Which train ____ for when I saw you on the platform on Sunday?", options:["did you wait","were you waiting","have you waited","are you waiting"], answer:"were you waiting" },
  { id:26, q:"You ____ hurry as we've still got twenty minutes before the film starts.", options:["mustn't","can't","may not","needn't"], answer:"needn't" },
  { id:27, q:"That car is ____ dangerous to drive.", options:["too","enough","not enough","the worst"], answer:"too" },
  { id:28, q:"I ____ you in the café at about 4.30 and we can discuss our plans then, OK?", options:["'ll see","am going to see","am seeing","see"], answer:"'ll see" },
  { id:29, q:"My father has been a pilot ____ twenty years and he still loves his job.", options:["since","for","until","by"], answer:"for" },
  { id:30, q:"I really enjoy ____ new languages and I'd like to learn Italian soon.", options:["to learn","learning","learn","learned"], answer:"learning" },
  { id:31, q:"If we ____ in the countryside, we'd have much better views than we do now.", options:["lived","were live","would live","live"], answer:"lived" },
  { id:32, q:"I wish Joe ____ to Hawaii on holiday. They're talking about an eruption there on the news.", options:["doesn't go","didn't go","hasn't gone","hadn't gone"], answer:"hadn't gone" },
  { id:33, q:"Could I possibly ____ some money for the bus fare home? I've lost my bag.", options:["lend","owe","borrow","need"], answer:"borrow" },
  { id:34, q:"Sam asked me if I ____ a lift home after the concert.", options:["had wanted","wanted","would want","want"], answer:"wanted" },
  { id:35, q:"People say that an avalanche ____ by loud noises in the area but I don't know if that's true.", options:["causes","has caused","is causing","is caused"], answer:"is caused" },
  { id:36, q:"Look at the news! Three cars ____ in a bad accident on the motorway at Dartford.", options:["are involving","involve","have involved","have been involved"], answer:"have been involved" },
  { id:37, q:"I ____ for arriving so late but I was caught up in a traffic jam in the town centre.", options:["sorry","regret","apologise","afraid"], answer:"apologise" },
  { id:38, q:"Look out for a petrol station because I think we're going to run ____ of petrol soon.", options:["down","out","off","through"], answer:"out" },
  { id:39, q:"It was great to see you at the party. I didn't realize how long ____ since we last met.", options:["it had been","it was been","it was being","it is been"], answer:"it had been" },
  { id:40, q:"The girls ____ to each other since the film started.", options:["talked","were talking","are talking","have been talking"], answer:"have been talking" },
  { id:41, q:"By the time I hand in this project, I ____ on it for three weeks!", options:["'ll be working","'ll have been working","have worked","'ll work"], answer:"'ll have been working" },
  { id:42, q:"Jonah's just fallen down the steps outside and there's ____ everywhere.", options:["bone","blood","skin","cut"], answer:"blood" },
  { id:43, q:"I really wish people ____ dump litter in front of our house. We have to clear it up every day.", options:["won't","wouldn't","haven't","don't"], answer:"wouldn't" },
  { id:44, q:"You should be very proud ____ what you've achieved over the last year.", options:["of","on","to","for"], answer:"of" },
  { id:45, q:"____ people know this but our school is being inspected today.", options:["Little","Any","None","Few"], answer:"Few" },
  { id:46, q:"That's the office ____ my dad works.", options:["who","where","that","which"], answer:"where" },
  { id:47, q:"The studio lights went out while the footballer ____ .", options:["had been interviewed","was interviewed","was being interviewed","was interviewing"], answer:"was being interviewed" },
  { id:48, q:"Last Tuesday the company told Ruth that they'd emailed her the job details the ____ day.", options:["last","before","previous","earlier"], answer:"previous" },
  { id:49, q:"I must remember ____ Ed to take notes for me while I'm away next week.", options:["ask","to ask","asking","for asking"], answer:"to ask" },
  { id:50, q:"If I'd gone to the sales yesterday, I ____ one of those cheap bags before they sold out.", options:["could have bought","had bought","would buy","bought"], answer:"could have bought" },
]

export const READING_PASSAGE = `An unusual job!

Have you seen a football match recently? If you have, I'm sure that you heard lots of comments about the referee as well as about the players! Referees have a very difficult job. They have to make quick and important decisions in the middle of a fast-moving game. And, of course, there are thousands of people shouting at them too. The crowd is never happy when the ref sends off their favourite player. Also, in football today there still isn't the same technology as there is in other sports, like tennis. The job can get even more difficult when you're a woman who is refereeing a men's match!

There is no reason why there should not be the same number of male and female referees in the sport today. However, the number of female refs is still very low – particularly at the highest levels of professional football. This is something that one woman, Pat Dunn, who died in 1999, would have been very sad about.

Pat was the first woman in the UK to referee a men's football match but she wasn't allowed to do this for a long time. Pat was a strong supporter of women's rights in sport and became President of the Ladies' Football Association in 1969. Then she decided to train to be a referee. For a long time the Football Association refused to give her a certificate although she had passed the exams. But Pat continued fighting and she finally got permission in 1976. The next month she became famous when she refereed her first official FA game. Pat became a very good and successful referee and even saved a footballer's life. She helped him when he was injured during a match!

Today there are some famous female referees, like Bibiana Steinhaus from Germany who has just refereed the final of the Women's Football World Cup. Bibiana decided to become a referee at the age of sixteen and later was the first female referee in the German men's professional league. But there are only a few like her.

Football is still mainly a men's game – both for players and referees. But for how long?`

export const READING = [
  { id:1,  q:"The article is from a magazine.", options:["True","False"], answer:"True" },
  { id:2,  q:"The writer says that women are better referees than men.", options:["True","False"], answer:"False" },
  { id:3,  q:"Pat Dunn is still alive today.", options:["True","False"], answer:"False" },
  { id:4,  q:"Pat didn't get her referee certificate immediately.", options:["True","False"], answer:"True" },
  { id:5,  q:"Bibiana Steinhaus played in a football final.", options:["True","False"], answer:"False" },
  { id:6,  q:"Referees have a difficult job because …", options:["they need to run fast.","the players shout at them.","they have to think quickly."], answer:"they have to think quickly." },
  { id:7,  q:"In the sport of tennis …", options:["they use more technology.","there are more women players.","there are bigger crowds."], answer:"they use more technology." },
  { id:8,  q:"Who was Pat Dunn?", options:["A woman football player.","A nurse at football matches.","An important member of the Ladies' Football Association."], answer:"An important member of the Ladies' Football Association." },
  { id:9,  q:"When was the first female referee in the UK appointed?", options:["1969","1976","1999"], answer:"1976" },
  { id:10, q:"Bibiana Steinhaus …", options:["wanted to be a referee when she was a teenager.","recently refereed a men's football final.","plays in the top women's league."], answer:"wanted to be a referee when she was a teenager." },
]

export const WRITING_PROMPT = "Imagine you went to your capital city on a day trip. Write an email to your friend telling him/her about the day. Include information about the journey there, the people you went with, what you did and what you bought."

// ── Scoring (server-side authority) ─────────────────────────────────────────
// Weighted composite: grammar 70% · reading 15% · writing 15%. A skipped or
// ungradable writing is EXCLUDED (its weight folds into grammar) so a missing
// section never drags a candidate down. Bands follow the official Oxford
// Solutions scoring for this question bank, with Beginner reserved for scores
// at or barely above the 4-option guessing floor (~25%).
export function determineLevel(grammarPct, readingPct, writingPct) {
  const hasWriting = writingPct != null
  const gW = hasWriting ? 0.70 : 0.85
  const wW = hasWriting ? 0.15 : 0
  const composite = Math.round(100 * (grammarPct * gW + readingPct * 0.15 + (writingPct || 0) * wW))
  let level
  if (composite >= 88)      level = 'IELTS Foundation'
  else if (composite >= 76) level = 'Upper-Intermediate'
  else if (composite >= 62) level = 'Intermediate'
  else if (composite >= 44) level = 'Pre-Intermediate'
  else if (composite >= 32) level = 'Elementary'
  else                      level = 'Beginner'
  if (level === 'IELTS Foundation' && (!hasWriting || writingPct < 0.7)) level = 'Upper-Intermediate'
  return { level, composite }
}
