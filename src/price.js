// The monthly course price shown on the site (CEO, 24 Oct 2026): 700 000 until
// 31 October 2026, 800 000 from 1 November 2026 (midnight, Tashkent). The
// switch happens by itself — no deploy needed on the day. Billing itself is
// the admin app's (src/price.js there).
export const PRICE_RISE = new Date('2026-11-01T00:00:00+05:00')
export const priceText = (now = Date.now()) => (now >= PRICE_RISE.getTime() ? '800 000' : '700 000')
