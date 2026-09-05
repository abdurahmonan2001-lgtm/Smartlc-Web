// Mirrors a lead row into the office Google Sheet ("SMART LC — Leads") via an
// Apps Script web app. The CRM stays the system of record — this is a
// convenience view for the office, so any failure is logged and swallowed.
//
// Row shape (must match the sheet's header order):
//   [Sana (Toshkent), Ism, Telefon (yozilgan), Telefon (profil), Maqsad,
//    Manzil qulaymi?, Kanal, Reklama, CRM, Lead ID]
//
// Env: GSHEET_WEBAPP_URL (the deployed Apps Script /exec URL), GSHEET_SECRET.
import { env } from './_session.js'

export const tashkentNow = () =>
  new Date(Date.now() + 5 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 16)

export async function sheetAppend(row) {
  const url = env('GSHEET_WEBAPP_URL')
  const secret = env('GSHEET_SECRET')
  if (!url || !secret) return
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, row }),
      redirect: 'follow',            // script.google.com 302s to the result
    })
  } catch (e) {
    console.error('sheet append failed:', e.message)
  }
}
