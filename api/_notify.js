// Telegram notification for the office.
//
// A candidate who has just finished the placement test is the warmest a lead
// ever gets, but the Admin app's Daily Tasks card only refreshes hourly — so
// without this a result can sit unseen for an hour. This pings a Telegram chat
// the moment one lands.
//
// Env (set on Vercel, never committed):
//   TELEGRAM_BOT_TOKEN  from @BotFather
//   TELEGRAM_CHAT_ID    numeric id of the person, group or channel to notify;
//                       several ids may be given separated by commas
//
// Notifying must NEVER cost the candidate their result: every failure here is
// logged and swallowed, and the caller does not await the outcome.
import { env } from './_session.js'

const API = 'https://api.telegram.org'

// Telegram's HTML parse mode only needs these three escaped, and escaping the
// candidate's own name is what stops a stray "<" in a submitted field from
// breaking the whole message.
const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')

export async function telegramSend(html) {
  const token = env('TELEGRAM_BOT_TOKEN')
  const chats = env('TELEGRAM_CHAT_ID').split(',').map(s => s.trim()).filter(Boolean)
  if (!token || !chats.length) return { ok: false, reason: 'not configured' }

  const results = await Promise.all(chats.map(async chat_id => {
    try {
      // A hung Telegram call must not hold the function open.
      const ac = new AbortController()
      const timer = setTimeout(() => ac.abort(), 8000)
      const r = await fetch(`${API}/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id,
          text: html,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
        }),
        signal: ac.signal,
      }).finally(() => clearTimeout(timer))
      if (!r.ok) {
        // Telegram explains refusals in the body ("chat not found", "bot was
        // blocked"), which is the difference between a typo'd id and a real
        // outage - worth having in the log.
        console.error('telegram sendMessage failed', chat_id, r.status, await r.text().catch(() => ''))
        return false
      }
      return true
    } catch (e) {
      console.error('telegram sendMessage threw', chat_id, e)
      return false
    }
  }))
  return { ok: results.some(Boolean) }
}

// The message the office actually reads. Scores are shown as "got/total" so a
// number is meaningful without opening the app; the writing answer itself is
// deliberately left out - it belongs in the Tests screen, not a chat.
export function placementMessage(row, totals) {
  const line = []
  line.push('📝 <b>New placement test</b>')
  line.push('')
  line.push(`<b>${esc(row.full_name)}</b>${row.age ? `, ${esc(row.age)}` : ''}`)
  line.push(`📞 ${esc(row.phone)}`)
  line.push('')
  line.push(`Level: <b>${esc(row.level)}</b>`)
  line.push(`Grammar: ${row.grammar_score}/${totals.grammar}`)
  line.push(`Reading: ${row.reading_score}/${totals.reading}`)
  // A candidate who wrote an essay that could not be graded and one who wrote
  // nothing both stored a null score, so both used to read "not submitted" —
  // which is how a broken grader stayed invisible while real essays went
  // unmarked. Say which it is, and ask for a human when one is needed.
  if (row.writing_score != null) line.push(`Writing: ${row.writing_score}/10`)
  else if (row.writing_answer && row.writing_answer.trim()) {
    line.push('⚠️ <b>Writing: SUBMITTED BUT NOT GRADED</b>')
    line.push('<i>Automatic grading failed — mark this one by hand.</i>')
  } else line.push('Writing: not submitted')
  line.push('')
  line.push('<i>Open the Admin app → Tests to process.</i>')
  return line.join('\n')
}
