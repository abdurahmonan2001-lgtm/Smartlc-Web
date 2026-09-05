// Finding the line of a passage or transcript where an answer is given.
//
// Two problems make this less trivial than indexOf.
//
// First, an authored quote and the text it came from differ in ways neither is
// wrong about: curly quotes against straight ones, an en dash against a
// hyphen, a line break where the passage wraps. So the search runs over a
// normalised copy, and an index map carries the result back to positions in
// the ORIGINAL text — which is what has to be highlighted.
//
// Second, the two halves of the library were authored to different
// conventions. The mock papers quote bare:
//     "pilfering became dramatically more difficult"
// while the practice listening sets wrap the quote in narration:
//     the receptionist says: "the clinic is closed on Mondays"
// Measured across the library, taking the raw string alone finds 100% of mock
// evidence and only 40% of practice listening evidence. So when the whole
// string is not present, the quoted part inside it is tried instead.

const CH = { '‘': "'", '’': "'", '‚': "'", '‛': "'", '“': '"', '”': '"', '„': '"', '–': '-', '—': '-', '−': '-' }

/** Lower-cased, punctuation-levelled copy of `text`, plus map[i] -> index in text. */
function normalise(text) {
  let norm = ''
  const map = []
  let lastWasSpace = false
  for (let i = 0; i < text.length; i++) {
    const raw = text[i]
    const c = CH[raw] ?? raw
    if (/\s/.test(c)) {
      // A run of any whitespace becomes one space, so a quote spanning a line
      // break in the source still matches.
      if (lastWasSpace || norm === '') continue
      norm += ' '
      map.push(i)
      lastWasSpace = true
      continue
    }
    lastWasSpace = false
    norm += c.toLowerCase()
    map.push(i)
  }
  return { norm, map }
}

const flatten = (s) => normalise(String(s ?? '')).norm.trim()

/** The quoted runs inside a string, longest first — the narration case. */
function quotedParts(s) {
  const out = []
  for (const m of String(s ?? '').matchAll(/[“"']([^“”"']{12,})[”"']/g)) out.push(m[1])
  return out.sort((a, b) => b.length - a.length)
}

/**
 * Where `evidence` sits inside `text`.
 * Returns {start, end} as indices into `text`, or null if it cannot be found.
 */
export function locateEvidence(text, evidence) {
  if (!text || !evidence) return null
  const { norm, map } = normalise(text)
  const tryOne = (needle) => {
    const n = flatten(needle)
    // Very short needles match by accident all over a passage.
    if (n.length < 12) return null
    const at = norm.indexOf(n)
    if (at < 0) return null
    const start = map[at]
    const end = (map[at + n.length - 1] ?? map[map.length - 1]) + 1
    return { start, end }
  }
  return tryOne(evidence) || quotedParts(evidence).map(tryOne).find(Boolean) || null
}

/**
 * Splits `text` into parts for rendering, marking every span that some
 * question's evidence points at.
 *
 * `items` is [{n, evidence}]. Returns [{text, ns}] where `ns` is the list of
 * question numbers whose evidence covers that span (empty for plain text).
 * Overlapping evidence is merged rather than nested, so two questions answered
 * by the same sentence produce one highlight labelled with both numbers.
 */
export function markEvidence(text, items) {
  const src = String(text ?? '')
  if (!src) return []
  const spans = []
  for (const it of items || []) {
    const at = locateEvidence(src, it.evidence)
    if (at) spans.push({ ...at, n: it.n })
  }
  if (!spans.length) return [{ text: src, ns: [] }]

  spans.sort((a, b) => a.start - b.start || a.end - b.end)
  const merged = []
  for (const s of spans) {
    const last = merged[merged.length - 1]
    if (last && s.start <= last.end) {
      last.end = Math.max(last.end, s.end)
      if (!last.ns.includes(s.n)) last.ns.push(s.n)
    } else {
      merged.push({ start: s.start, end: s.end, ns: [s.n] })
    }
  }

  const out = []
  let cursor = 0
  for (const m of merged) {
    if (m.start > cursor) out.push({ text: src.slice(cursor, m.start), ns: [] })
    out.push({ text: src.slice(m.start, m.end), ns: m.ns.sort((a, b) => a - b) })
    cursor = m.end
  }
  if (cursor < src.length) out.push({ text: src.slice(cursor), ns: [] })
  return out
}
