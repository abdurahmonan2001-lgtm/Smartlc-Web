// Website registration → CRM lead.
//
// RegisterPage.jsx has POSTed here since launch, but this file never existed —
// every website registration returned 404 and vanished. Now the submission
// becomes a CRM lead via `crm_lead_create` (deduplicated by phone inside the
// RPC, landing in the 'unsorted' Inbox for triage), carrying whatever ad
// attribution the browser arrived with (fbclid / UTM), so a website lead that
// came from an Instagram ad is priced back to the exact ad in
// `crm_ad_performance` — same as an instant-form lead.
//
// The office also gets the same instant Telegram ping the placement test
// sends, because a fresh registration is warmest in the first minutes.
//
// Env (already set for the placement endpoints):
//   SUPABASE_URL / VITE_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
//   TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID (optional — failures are swallowed)

import { env } from './_session.js'
import { telegramSend } from './_notify.js'
import { sheetAppend, tashkentNow } from './_sheet.js'

const esc = s => String(s ?? '')
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' })

  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {})

  const name = String(b.name || '').trim()
  const digits = String(b.phone || '').replace(/\D/g, '')
  if (name.length < 2 || digits.replace(/^998/, '').length !== 9) {
    return res.status(400).json({ error: 'name and a 9-digit phone are required' })
  }
  const age = Number(b.age) || null

  const url = (env('SUPABASE_URL') || env('VITE_SUPABASE_URL')).replace(/\/+$/, '')
  const key = env('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) return res.status(500).json({ error: 'not configured' })

  // Attribution captured by the browser (RegisterPage sends what it has; all
  // optional). utm_content carries the ad name on properly-tagged links.
  const utm = b.utm && typeof b.utm === 'object' ? b.utm : {}
  const meta = {}
  if (b.fbclid) meta.fbclid = String(b.fbclid)
  // Injected by Meta's dynamic URL parameters ({{ad.id}} …) and carried
  // through sessionStorage — this is what lights up the per-ad report for
  // website leads.
  if (b.ad_id) meta.ad_id = String(b.ad_id)
  if (b.adset_id) meta.adset_id = String(b.adset_id)
  if (b.campaign_id) meta.campaign_id = String(b.campaign_id)

  try {
    const r = await fetch(`${url}/rest/v1/rpc/crm_lead_create`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        p_agent: null,                        // unassigned → Inbox triage
        p_phone: `+998${digits.replace(/^998/, '')}`,
        p_contact_name: name,
        p_student_age: age,
        p_source: 'website',
        p_note: [
          'Website registration form.',
          age ? `Age: ${age}` : null,
          b.lang ? `Site language: ${b.lang}` : null,
        ].filter(Boolean).join('\n'),
        p_intake_channel: 'website_form',
        p_utm: utm,
        p_meta: meta,
        p_landing_page: b.landing_page ? String(b.landing_page).slice(0, 500) : null,
        p_referrer: b.referrer ? String(b.referrer).slice(0, 500) : null,
      }),
    })
    if (!r.ok) throw new Error(`crm_lead_create → ${r.status} ${await r.text()}`)
    const leadId = await r.json().catch(() => null)

    // Fire-and-forget: a Telegram hiccup must never cost the visitor their
    // confirmation screen.
    // AWAITED, deliberately. This was fire-and-forget, which on Vercel means
    // the runtime can freeze the function the moment the response is sent and
    // kill the request mid-flight — so registration alerts arrived or not
    // depending on timing, while placement-test alerts (which do await) were
    // always reliable. A failure is still swallowed below; only the dropped
    // notifications are fixed here.
    await telegramSend([
      '🟢 <b>New website registration</b>',
      '',
      `<b>${esc(name)}</b>${age ? `, ${age}` : ''}`,
      `📞 +998 ${digits.replace(/^998/, '')}`,
      '',
      '<i>Open the Admin app → Sales CRM → Inbox to take it.</i>',
    ].join('\n')).catch(() => {})

    // Mirror to the office Google Sheet (awaited — serverless freezes after
    // the response — but never fatal).
    await sheetAppend([
      tashkentNow(),
      name,
      `+998${digits.replace(/^998/, '')}`,
      '',
      age ? `Yosh: ${age}` : '',
      '',
      'Website',
      utm.utm_content || meta.ad_id || '',
      'CRMda ✓',
      String(leadId || ''),
    ])

    return res.status(200).json({ ok: true, id: leadId })
  } catch (err) {
    console.error('website lead create failed:', err)
    return res.status(500).json({ error: 'could not save' })
  }
}
