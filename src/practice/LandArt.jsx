// The landscape behind a stretch of the course map, drawn as layered country
// in the unit's own colour -- far ranges pale, near hills deeper -- with one
// landmark for what the unit teaches: a cinema for "Fame", a lighthouse for
// "Holidays", an observatory for "Science" (CEO, 11 Nov 2026: the sticker
// props were "a bit childish … the higher the level the more complex and
// beautiful the design should be, but it should not turn into noise").
//
// The level sets how much is drawn (tierOf):
//   1 Beginner            two soft hills and a sun
//   2 Elementary          + a third hill and a cloud
//   3 Pre-Intermediate    + a line of trees and the landmark
//   4 Intermediate        + mountains behind, haze between the layers
//   5 Upper-Intermediate  + a glowing sun, birds, lit windows, a fourth range
//   6 IELTS Foundation    + golden-hour light, fine contour lines, long clouds
//   7 IELTS Proficiency   + a pale aurora and the first stars
// Everything is one colour family per unit, so more detail reads as depth,
// not clutter.
//
// Shared by the Student App (src/LandArt.jsx, the course islands) and the
// website (src/practice/LandArt.jsx, the practice road and lesson pages).
// Change both together. Ridges are drawn from the absolute x, so two units
// side by side on the website's road join without a step.

export const TIERS = {
  'Beginner': 1, 'Elementary': 2, 'Pre-Intermediate': 3, 'Intermediate': 4,
  'Upper-Intermediate': 5, 'IELTS Foundation': 6, 'IELTS Proficiency': 7,
}
export const tierOf = (level) => TIERS[level] || 4

const f1 = (v) => Math.round(v * 10) / 10
function hash(str) {
  let h = 2166136261
  const s = String(str)
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return Math.abs(h)
}
const rnd = (s, n) => (hash(`${s}:${n}`) % 10007) / 10007

/** a → b by t, for #rrggbb colours. */
export function mix(a, b, t) {
  const p = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16))
  const A = p(a), B = p(b)
  return `#${A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('')}`
}

// ── Landmarks: silhouettes standing on y = 0, about 100 wide and 60–90 high.
// One fill (the ridge they stand on, a shade deeper) and, from tier 5, warm
// lit windows -- never a second colour scheme.
const win = (light, rects) => light && rects.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} rx=".6" fill={light} />)
const pineAt = (x, h, c) => <path key={`p${x}`} fill={c} d={`M${x} ${-h} L${x + h * .32} 0 H${x - h * .32}Z`} />

const LANDMARKS = {
  village: (c, l) => <g fill={c}>
    <path d="M-46 0 V-20 L-34 -32 L-22 -20 V0Z M-24 0 V-30 L-8 -46 L8 -30 V0Z M6 0 V-18 L18 -29 L30 -18 V0Z" />
    <rect x="-2" y="-46" width="5" height="12" /><circle cx="42" cy="-18" r="11" /><rect x="40.5" y="-9" width="3" height="9" />
    {win(l, [[-12, -22, 4, 5], [-2, -22, 4, 5], [-38, -15, 4, 4], [14, -13, 4, 4]])}
  </g>,
  school: (c, l) => <g fill={c}>
    <rect x="-34" y="-28" width="68" height="28" /><path d="M-40 -28 L0 -48 L40 -28Z" />
    <rect x="-7" y="-66" width="14" height="20" /><path d="M-10 -66 L0 -80 L10 -66Z" />
    {win(l, [[-26, -20, 7, 8], [-12, -20, 7, 8], [5, -20, 7, 8], [19, -20, 7, 8], [-3, -60, 6, 6]])}
  </g>,
  boutiques: (c, l) => <g fill={c}>
    <rect x="-48" y="-36" width="30" height="36" /><rect x="-15" y="-48" width="30" height="48" /><rect x="18" y="-32" width="30" height="32" />
    <path d="M-50 -24 h34 v4 q-4 5 -8.5 0 q-4 5 -8.5 0 q-4 5 -8.5 0 q-4 5 -8.5 0Z M-17 -32 h34 v4 q-4 5 -8.5 0 q-4 5 -8.5 0 q-4 5 -8.5 0 q-4 5 -8.5 0Z M16 -20 h34 v4 q-4 5 -8.5 0 q-4 5 -8.5 0 q-4 5 -8.5 0 q-4 5 -8.5 0Z" />
    {win(l, [[-42, -16, 18, 10], [-9, -24, 18, 14], [24, -12, 18, 9]])}
  </g>,
  market: (c, l) => <g fill={c}>
    {[-36, 0, 36].map((x, i) => <g key={x} transform={`translate(${x} 0)`}>
      <rect x="-15" y="-20" width="30" height="20" /><path d={`M-18 -20 L0 ${-40 - i % 2 * 6} L18 -20Z`} />
      <rect x="-1" y={-46 - i % 2 * 6} width="2" height="8" />
    </g>)}
    {win(l, [[-46, -14, 20, 5], [-10, -14, 20, 5], [26, -14, 20, 5]])}
  </g>,
  skyline: (c, l) => <g fill={c}>
    <rect x="-50" y="-34" width="16" height="34" /><rect x="-32" y="-62" width="18" height="62" /><rect x="-12" y="-46" width="16" height="46" />
    <rect x="6" y="-84" width="18" height="84" /><rect x="14" y="-96" width="2" height="12" /><rect x="26" y="-52" width="14" height="52" /><rect x="42" y="-30" width="12" height="30" />
    {win(l, [[-28, -56, 3, 3], [-21, -48, 3, 3], [-28, -40, 3, 3], [10, -76, 3, 3], [17, -66, 3, 3], [10, -56, 3, 3], [17, -44, 3, 3], [29, -44, 3, 3], [-8, -38, 3, 3]])}
  </g>,
  forest: (c) => <g>{[-44, -30, -14, 0, 16, 32, 46].map((x, i) => pineAt(x, [34, 52, 40, 70, 46, 58, 36][i], c))}</g>,
  tower: (c, l) => <g fill={c}>
    <path d="M-14 0 L-2 -86 H2 L14 0 H8 L0 -62 L-8 0Z" /><rect x="-10" y="-30" width="20" height="2.5" /><rect x="-6" y="-56" width="12" height="2.5" />
    <circle cx="0" cy="-90" r="4" /><path d="M18 -40 a16 16 0 0 1 22 -14 L30 -40Z" /><rect x="27" y="-40" width="3" height="40" />
    <rect x="-46" y="-22" width="28" height="22" /><rect x="34" y="-14" width="18" height="14" />
    {l && <circle cx="0" cy="-90" r="2.2" fill={l} />}
    {win(l, [[-40, -16, 5, 5], [-30, -16, 5, 5]])}
  </g>,
  stadium: (c, l) => <g fill={c}>
    <path d="M-50 0 V-20 Q0 -42 50 -20 V0Z" />
    {[-44, 44].map((x) => <g key={x}><rect x={x - 1} y="-62" width="2.5" height="42" /><rect x={x - 6} y="-68" width="13" height="7" rx="1.5" /></g>)}
    {l && [-44, 44].map((x) => <path key={x} d={`M${x - 5} -61 L${x * .3 - 14} -26 H${x * .3 + 14}Z`} fill={l} opacity=".25" />)}
    {win(l, [[-36, -14, 72, 3]])}
  </g>,
  lighthouse: (c, l) => <g fill={c}>
    <path d="M-9 0 L-6 -60 H6 L9 0Z" /><rect x="-8" y="-70" width="16" height="10" /><path d="M-10 -70 L0 -80 L10 -70Z" />
    <rect x="-20" y="-12" width="14" height="12" /><path d="M-22 -12 L-13 -20 L-4 -12Z" />
    <path d="M26 -6 H52 L48 0 H30Z" /><path d="M38 -8 V-40 L52 -10Z M36 -10 L36 -34 L24 -10Z" />
    {l && <><rect x="-5" y="-68" width="10" height="6" fill={l} /><path d="M5 -66 L60 -80 V-54Z" fill={l} opacity=".22" /></>}
  </g>,
  peaks: (c) => <g fill={c}>
    <path d="M-56 0 L-20 -54 L-6 -36 L14 -78 L56 0Z" />
    <path d="M14 -78 V-96" stroke={c} strokeWidth="2" /><path d="M14 -96 L28 -91 L14 -86Z" />
  </g>,
  cinema: (c, l) => <g fill={c}>
    <rect x="-40" y="-40" width="80" height="40" /><path d="M-44 -40 H44 L40 -50 H-40Z" />
    <rect x="-26" y="-64" width="52" height="16" rx="2" /><rect x="-2" y="-74" width="4" height="10" />
    {l && <><rect x="-22" y="-60" width="44" height="8" rx="1" fill={l} /><path d="M-30 -70 L-60 -110 L-48 -112Z M30 -70 L60 -110 L48 -112Z" fill={l} opacity=".2" /></>}
    {win(l, [[-30, -30, 12, 18], [-6, -30, 12, 18], [18, -30, 12, 18]])}
  </g>,
  museum: (c, l) => <g fill={c}>
    <path d="M-46 -40 L0 -62 L46 -40Z" /><rect x="-44" y="-40" width="88" height="5" />
    {[-36, -20, -4, 12, 28].map((x) => <rect key={x} x={x} y="-34" width="7" height="30" />)}
    <rect x="-48" y="-5" width="96" height="5" />
    {l && <circle cx="0" cy="-48" r="4" fill={l} />}
  </g>,
  gazebo: (c, l) => <g fill={c}>
    <path d="M-26 -40 Q0 -66 26 -40Z" /><rect x="-26" y="-42" width="52" height="4" />
    {[-22, -8, 6, 20].map((x) => <rect key={x} x={x} y="-38" width="2.5" height="32" />)}<rect x="-30" y="-6" width="60" height="6" />
    <circle cx="44" cy="-34" r="20" /><circle cx="32" cy="-24" r="12" /><rect x="42" y="-16" width="4" height="16" />
    <rect x="-1" y="-74" width="2" height="10" />
    {l && <circle cx="0" cy="-22" r="3" fill={l} />}
  </g>,
  bank: (c, l) => <g fill={c}>
    <rect x="-40" y="-40" width="80" height="40" /><path d="M-24 -40 A24 24 0 0 1 24 -40Z" /><rect x="-1" y="-74" width="2" height="12" />
    {[-32, -18, 12, 26].map((x) => <rect key={x} x={x} y="-34" width="6" height="30" fill={l || c} opacity={l ? .35 : 1} />)}
    {win(l, [[-6, -26, 12, 26]])}
  </g>,
  clocktower: (c, l) => <g fill={c}>
    <rect x="-9" y="-80" width="18" height="80" /><path d="M-12 -80 L0 -98 L12 -80Z" />
    <path d="M-48 0 V-24 L-38 -36 L-28 -24 V0Z M-26 0 V-32 L-17 -42 L-10 -32 V0Z M12 0 V-30 L22 -42 L32 -30 V0Z M34 0 V-20 L42 -30 L50 -20 V0Z" />
    {l ? <circle cx="0" cy="-64" r="5" fill={l} /> : <circle cx="0" cy="-64" r="5" fill="#ffffff" opacity=".4" />}
    {win(l, [[-40, -18, 4, 5], [-20, -24, 4, 5], [19, -22, 4, 5], [40, -14, 4, 4]])}
  </g>,
  observatory: (c, l) => <g fill={c}>
    <rect x="-30" y="-30" width="60" height="30" /><path d="M-26 -30 A26 26 0 0 1 26 -30Z" />
    <path d="M6 -52 L30 -76 L34 -72 L10 -48Z" />
    <rect x="34" y="-18" width="22" height="18" /><rect x="-56" y="-14" width="22" height="14" />
    {l && <rect x="-2" y="-54" width="5" height="22" fill={l} opacity=".7" />}
    {win(l, [[-20, -20, 6, 6], [14, -20, 6, 6], [40, -12, 4, 4]])}
  </g>,
  pavilion: (c, l) => <g fill={c}>
    <path d="M-36 -34 Q0 -50 36 -34 L32 -30 H-32Z" />{[-28, -10, 8, 26].map((x) => <rect key={x} x={x} y="-30" width="3" height="26" />)}
    <rect x="-38" y="-4" width="76" height="4" />
    <circle cx="-50" cy="-26" r="14" /><rect x="-51.5" y="-14" width="3" height="14" /><circle cx="52" cy="-22" r="12" /><rect x="50.5" y="-12" width="3" height="12" />
    {l && <rect x="-26" y="-24" width="52" height="3" fill={l} opacity=".7" />}
  </g>,
  pagoda: (c, l) => <g fill={c}>
    {[0, 1, 2, 3].map((k) => <g key={k}>
      <path d={`M${-34 + k * 6} ${-12 - k * 20} Q0 ${-22 - k * 20} ${34 - k * 6} ${-12 - k * 20} L${28 - k * 6} ${-8 - k * 20} H${-28 + k * 6}Z`} />
      <rect x={-20 + k * 4} y={-8 - k * 20} width={40 - k * 8} height="8" />
    </g>)}
    <rect x="-1" y="-104" width="2" height="16" /><rect x="-24" y="-8" width="48" height="8" />
    {win(l, [[-6, -6, 12, 6], [-4, -26, 8, 5], [-3, -46, 6, 5]])}
  </g>,
  fairycastle: (c, l) => <g fill={c}>
    <rect x="-30" y="-30" width="60" height="30" />
    {[[-30, 14, 56], [-6, 12, 74], [18, 14, 60]].map(([x, w, h]) => <g key={x}><rect x={x} y={-h} width={w} height={h} /><path d={`M${x - 3} ${-h} L${x + w / 2} ${-h - 24} L${x + w + 3} ${-h}Z`} /></g>)}
    <path d="M0 -98 V-110 L10 -106 L0 -102" />
    {win(l, [[-25, -44, 4, 6], [-2, -60, 4, 7], [23, -46, 4, 6], [-4, -14, 8, 14]])}
  </g>,
  camp: (c, l) => <g fill={c}>
    <path d="M-44 0 L-24 -30 L-4 0Z" /><path d="M2 0 L18 -24 L34 0Z" />
    <rect x="40" y="-28" width="3" height="28" /><path d="M36 -28 H56 L60 -24 L56 -20 H36Z" />
    {l && <><path d="M-24 0 L-20 -10 L-16 0Z M-6 2 Q-2 -10 2 2Z" fill={l} /></>}
  </g>,
  windmill: (c, l) => <g fill={c}>
    <path d="M-10 0 L-6 -52 H6 L10 0Z" /><path d="M-8 -52 L0 -62 L8 -52Z" />
    <g transform="translate(0 -56) rotate(18)">{[0, 90, 180, 270].map((a) => <rect key={a} x="-2" y="-40" width="8" height="38" transform={`rotate(${a})`} />)}</g>
    <path d="M-50 0 Q-30 -10 -14 0Z M14 0 Q34 -12 52 0Z" />
    {win(l, [[-2, -30, 4, 6]])}
  </g>,
  boathouse: (c, l) => <g fill={c}>
    <rect x="-24" y="-22" width="36" height="22" /><path d="M-28 -22 L-6 -38 L16 -22Z" /><rect x="12" y="-3" width="40" height="3" />
    {[18, 30, 42].map((x) => <rect key={x} x={x} y="0" width="2" height="8" />)}
    <path d="M-60 2 Q-50 -2 -40 2Z" />
    {win(l, [[-14, -14, 6, 6], [0, -14, 6, 6]])}
  </g>,
  oasis: (c, l) => <g fill={c}>
    <rect x="-22" y="-26" width="44" height="26" /><path d="M-16 -26 A16 16 0 0 1 16 -26Z" /><rect x="-1" y="-48" width="2" height="8" />
    {[[-40, 1], [40, -1]].map(([x, s]) => <g key={x} transform={`translate(${x} 0) scale(${s} 1)`}>
      <path d="M0 0 Q4 -24 -2 -44" stroke={c} strokeWidth="3.5" fill="none" />
      <path d="M-2 -44 Q-18 -50 -26 -38 Q-12 -44 -2 -42Z M-2 -44 Q12 -54 24 -42 Q10 -46 -2 -42Z M-2 -44 Q-6 -58 -18 -60 Q-8 -52 -2 -43Z" />
    </g>)}
    {win(l, [[-5, -16, 10, 16]])}
  </g>,
  ruins: (c) => <g fill={c}>
    <rect x="-40" y="-26" width="12" height="26" /><rect x="-22" y="-44" width="14" height="44" /><path d="M-26 -44 H-4 V-48 H-26Z" />
    <rect x="2" y="-34" width="12" height="34" /><rect x="20" y="-16" width="20" height="16" />
    {pineAt(48, 30, c)}{pineAt(-50, 24, c)}
  </g>,
  barn: (c, l) => <g fill={c}>
    <path d="M-34 0 V-28 L-20 -42 H4 L18 -28 V0Z" /><rect x="22" y="-50" width="16" height="50" /><path d="M22 -50 A8 8 0 0 1 38 -50Z" />
    <circle cx="-48" cy="-20" r="13" /><rect x="-49.5" y="-10" width="3" height="10" />
    {win(l, [[-14, -18, 12, 18]])}
  </g>,
  volcano: (c) => <g fill={c}>
    <path d="M-60 0 L-16 -60 H16 L60 0Z" />
    <circle cx="-4" cy="-72" r="7" opacity=".45" /><circle cx="6" cy="-86" r="9" opacity=".3" /><circle cx="-2" cy="-102" r="11" opacity=".18" />
  </g>,
  castle: (c, l) => <g fill={c}>
    <rect x="-44" y="-40" width="88" height="40" />
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x={-44 + i * 11.4} y="-46" width="7" height="6" />)}
    {[-50, 38].map((x) => <g key={x}><rect x={x} y="-70" width="16" height="70" /><path d={`M${x - 3} -70 L${x + 8} -90 L${x + 19} -70Z`} /></g>)}
    <rect x="-10" y="-88" width="20" height="48" /><path d="M-13 -88 L0 -110 L13 -88Z" /><path d="M0 -110 V-122 L11 -118 L0 -114" />
    {win(l, [[-7, -14, 14, 14], [-46, -56, 4, 7], [42, -56, 4, 7], [-3, -76, 6, 8]])}
  </g>,
  summit: (c, l) => <g fill={c}>
    <path d="M-64 0 L-24 -50 L-10 -40 L8 -96 L64 0Z" />
    <path d="M8 -96 V-118" stroke={c} strokeWidth="2.2" /><path d="M8 -118 L24 -112 L8 -106Z" />
    {l && <path d="M8 -96 L-4 -70 L4 -74 L10 -66 L18 -76 Z" fill="#ffffff" opacity=".5" />}
  </g>,
}

// Which landmark a region gets, by the region's name (CourseRegion.jsx).
const LANDMARK_OF = {
  'Hometown': 'village', 'School Hill': 'school', 'Style Street': 'boutiques', 'Food Market': 'market',
  'Downtown': 'skyline', 'Wild Woods': 'forest', 'Digital Valley': 'tower', 'Sports Park': 'stadium',
  'Holiday Coast': 'lighthouse', 'Adventure Peaks': 'peaks', 'Film Studio': 'cinema', 'Art Quarter': 'museum',
  'Heart Garden': 'gazebo', 'Career Heights': 'skyline', 'Money Market': 'bank', 'Mystery Lane': 'clocktower',
  'Science Lab': 'observatory', 'Wellness Garden': 'pavilion', 'Culture Square': 'pagoda', 'Story Land': 'fairycastle',
  'Trailhead': 'camp', 'Sunny Meadow': 'windmill', 'Whispering Woods': 'forest', 'Crystal Lake': 'boathouse',
  'Golden Dunes': 'oasis', 'Coral Coast': 'lighthouse', 'Jungle Ruins': 'ruins', 'Autumn Hills': 'barn',
  'Frost Peaks': 'peaks', 'Ember Valley': 'volcano', 'Mid-term Castle': 'castle', 'Final Summit': 'summit',
}
export const landmarkOf = (regionName) => LANDMARK_OF[regionName] || null

/** One stretch of land, x0..x1 in the caller's coordinates, 0..height.
 *  `landmarkAt` places the region's landmark on a hill: the second-nearest,
 *  or `landmarkBack` ranges further back (the website's road runs across the
 *  near hills, so its landmarks stand behind it). Returns a <g> for the
 *  caller's <svg>. */
export function Landscape({ x0 = 0, x1, height: h, tone, name, tier = 4, seed = 'land', horizon = .42, ground = .8, landmarkAt = null, landmarkScale = 1, landmarkBack = 0 }) {
  const n = tier <= 1 ? 2 : tier <= 3 ? 3 : tier <= 5 ? 4 : 5
  const id = `la${hash(`${seed}|${x0}|${x1}|${h}`)}`
  const W = x1 - x0
  // Far layers pale, near ones deeper; a wider range at the higher tiers.
  const [far, near] = tier <= 3 ? [.86, .62] : tier <= 5 ? [.88, .48] : [.86, .4]
  const col = (k) => mix(tone, '#ffffff', far + (near - far) * (n === 1 ? 1 : k / (n - 1)))
  const base = (k) => h * (horizon + (ground - horizon) * (n === 1 ? 1 : k / (n - 1)))
  const peaky = (k) => tier >= 4 && k === 0
  const amp = (k) => (peaky(k) ? h * (.1 + .016 * tier) : h * (.055 - k * .006))
  const ridge = (k, x) => {
    const shape = peaky(k)
      ? .72 * Math.pow(Math.abs(Math.sin(x / 170 + k * 1.7 + .4)), 1.4) + .28 * Math.abs(Math.sin(x / 63 + k))
      : .5 + .5 * (.62 * Math.sin(x / (230 + k * 40) + k * 2.1) + .38 * Math.sin(x / (96 + k * 13) + k * .9))
    return base(k) - amp(k) * shape
  }
  const fill = (k) => {
    let d = `M${f1(x0)} ${h}`
    for (let x = x0; x <= x1 + 7; x += 8) { const xx = Math.min(x, x1); d += ` L${f1(xx)} ${f1(ridge(k, xx))}` }
    return `${d} L${f1(x1)} ${h}Z`
  }
  const line = (k, dy) => {
    let d = ''
    for (let x = x0; x <= x1 + 7; x += 8) { const xx = Math.min(x, x1); d += `${d ? ' L' : 'M'}${f1(xx)} ${f1(ridge(k, xx) + dy)}` }
    return d
  }

  const skyTop = tier >= 6 ? mix(tone, '#ffffff', .74) : mix(tone, '#ffffff', .8)
  const skyLow = tier >= 6 ? mix('#ffe7c2', '#ffffff', .25) : mix(tone, '#ffffff', .96)
  const sx = x0 + W * (.22 + rnd(seed, 1) * .56), sy = h * horizon * .5
  const light = tier >= 5 ? '#fff1c1' : null
  const lmName = landmarkOf(name)
  const lmK = Math.max(0, n - 2 - landmarkBack)

  // Trees on the second-nearest hill and, from tier 4, a few on the nearest:
  // placed on a fixed grid of the absolute x so neighbours agree.
  const trees = []
  if (tier >= 3) {
    const step = 44
    for (let gx = Math.ceil(x0 / step) * step; gx < x1; gx += step) {
      if (rnd('tree', gx) > .42) continue
      if (landmarkAt != null && Math.abs(gx - landmarkAt) < 70 * landmarkScale) continue
      const th = 10 + rnd('th', gx) * (6 + tier * 2)
      trees.push(<g key={`t${gx}`} transform={`translate(${f1(gx)} ${f1(ridge(lmK, gx) + 3)})`}>{pineAt(0, th, mix(col(lmK), tone, .18))}</g>)
    }
  }
  if (tier >= 4) {
    const step = 110
    for (let gx = Math.ceil(x0 / step) * step + 37; gx < x1; gx += step) {
      if (rnd('ftree', gx) > .34) continue
      const th = 22 + rnd('fth', gx) * (8 + tier * 2)
      trees.push(<g key={`f${gx}`} transform={`translate(${f1(gx)} ${f1(ridge(n - 1, gx) + 4)})`}>{pineAt(0, th, mix(col(n - 1), tone, .16))}</g>)
    }
  }

  return (
    <g>
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} /><stop offset={horizon + .1} stopColor={skyLow} />
        </linearGradient>
        <radialGradient id={`${id}g`}>
          <stop offset="0" stopColor={tier >= 6 ? '#fff4d6' : '#ffffff'} stopOpacity=".95" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}m`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0" /><stop offset=".5" stopColor="#ffffff" stopOpacity={tier >= 6 ? .26 : .36} /><stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        {tier >= 7 && (
          <linearGradient id={`${id}a`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#5eead4" stopOpacity="0" /><stop offset=".5" stopColor="#5eead4" stopOpacity=".35" /><stop offset="1" stopColor={tone} stopOpacity="0" />
          </linearGradient>
        )}
      </defs>

      <rect x={x0 - .5} y="0" width={W + 1} height={h} fill={`url(#${id}s)`} />
      {tier >= 7 && <>
        <path d={`M${f1(x0)} ${f1(h * .1)} Q${f1(x0 + W * .3)} ${f1(h * .02)} ${f1(x0 + W * .55)} ${f1(h * .12)} T${f1(x1)} ${f1(h * .08)} V${f1(h * .16)} Q${f1(x0 + W * .6)} ${f1(h * .2)} ${f1(x0 + W * .3)} ${f1(h * .14)} T${f1(x0)} ${f1(h * .18)}Z`} fill={`url(#${id}a)`} />
        {Array.from({ length: Math.round(W / 60) }, (_, i) => (
          <circle key={i} cx={f1(x0 + rnd(seed, 200 + i) * W)} cy={f1(h * (.03 + rnd(seed, 300 + i) * .22))} r={f1(.7 + rnd(seed, 400 + i))} fill="#ffffff" opacity=".85" />
        ))}
      </>}
      {/* The sun: a soft disc low down; from tier 5 a wide glow around it. */}
      {tier >= 5 && <circle cx={f1(sx)} cy={f1(sy)} r={f1(h * .3)} fill={`url(#${id}g)`} />}
      <circle cx={f1(sx)} cy={f1(sy)} r={f1(h * (.045 + tier * .004))} fill={tier >= 6 ? '#fff6dc' : '#ffffff'} opacity={tier >= 5 ? .95 : .6} />
      {/* Clouds: puffs at the lower tiers, long streaks at the top ones. */}
      {tier >= 2 && tier <= 5 && Array.from({ length: W > 500 ? 2 : 1 }, (_, i) => {
        const cx = x0 + W * (.15 + rnd(seed, 10 + i) * .7), cy = h * (.1 + rnd(seed, 20 + i) * .14)
        return <g key={i} fill="#ffffff" opacity=".75">
          <ellipse cx={f1(cx)} cy={f1(cy)} rx="22" ry="8" /><ellipse cx={f1(cx - 9)} cy={f1(cy - 5)} rx="10" ry="8" /><ellipse cx={f1(cx + 8)} cy={f1(cy - 7)} rx="12" ry="10" />
        </g>
      })}
      {tier >= 6 && Array.from({ length: W > 500 ? 3 : 2 }, (_, i) => (
        <rect key={i} x={f1(x0 + W * (.05 + rnd(seed, 30 + i) * .6))} y={f1(h * (.12 + rnd(seed, 40 + i) * .16))} width={f1(W * (.18 + rnd(seed, 50 + i) * .18))} height="3.5" rx="1.75" fill="#ffffff" opacity=".6" />
      ))}
      {tier >= 5 && [0, 1, 2].map((i) => {
        const bx = sx + 40 + i * 16 + rnd(seed, 60 + i) * 10, by = sy - 14 + rnd(seed, 70 + i) * 18
        return <path key={i} d={`M${f1(bx - 5)} ${f1(by - 2)} Q${f1(bx - 2)} ${f1(by - 4)} ${f1(bx)} ${f1(by)} Q${f1(bx + 2)} ${f1(by - 4)} ${f1(bx + 5)} ${f1(by - 2)}`} fill="none" stroke={mix(tone, '#ffffff', .45)} strokeWidth="1.3" strokeLinecap="round" />
      })}

      {/* The ranges, far to near, haze between them from tier 4. */}
      {Array.from({ length: n }, (_, k) => (
        <g key={k}>
          <path d={fill(k)} fill={col(k)} />
          {tier >= 6 && k === 0 && [7, 15].map((dy) => <path key={dy} d={line(0, dy)} fill="none" stroke="#ffffff" strokeOpacity=".32" strokeWidth="1.1" />)}
          {tier >= 5 && <path d={line(k, 0)} fill="none" stroke="#ffffff" strokeOpacity=".45" strokeWidth="1.2" />}
          {tier >= 4 && k < n - 1 && <rect x={x0} y={f1(base(k) - 6)} width={W} height={f1(h * .09)} fill={`url(#${id}m)`} />}
          {k === lmK && lmName && landmarkAt != null && (
            <g transform={`translate(${f1(landmarkAt)} ${f1(ridge(k, landmarkAt) + 3)}) scale(${f1(landmarkScale * (.82 + tier * .05))})`}>
              {LANDMARKS[lmName](mix(col(k), tone, .3), light)}
            </g>
          )}
          {k === lmK && trees.filter((t) => String(t.key).startsWith('t'))}
          {k === n - 1 && trees.filter((t) => String(t.key).startsWith('f'))}
        </g>
      ))}
    </g>
  )
}
