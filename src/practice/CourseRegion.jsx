// The landscape behind one unit of the practice trail -- copied from the
// Student App (src/CourseRegion.jsx), so a unit looks the same on the website
// as on the course map the student already knows (CEO, 11 Nov 2026). Change
// both together. Website additions: a unit may carry a `topic` that picks
// its landscape (IELTS Foundation's own unit names say little), and a few
// more topic words.
//
// The landscape behind one chapter of the course map.
//
// Each unit is a region drawn from what it teaches -- "Food" is a market,
// "In the city" is downtown, "Going wild" is wild woods -- with the mid-term
// as a castle on the way and the final as a summit at the end. The
// Introduction is the trailhead the journey starts from. Courses without
// units (Beginner, IELTS) walk a fixed run of landscapes instead -- meadow,
// woods, lake, dunes, coast, jungle, autumn hills, frozen peaks, ember valley
// -- since they have no topic to draw from.
//
// Kept deliberately soft: pale ground and scenery mostly along the margins.
// The lesson cards are the bright, busy thing on the map, and scenery that
// competes with them makes both harder to read.
//
// Each region's top edge is a gentle wave that laps over the region above, so
// the map reads as one continuous land rather than stacked coloured boxes.

const WAVE = 14

function hash(str) {
  let h = 2166136261
  const s = String(str)
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return Math.abs(h)
}
const rnd = (s, n) => (hash(`${s}:${n}`) % 10007) / 10007
const f1 = (v) => Math.round(v * 10) / 10

// ── Scenery pieces, drawn around (0,0) at roughly 30px ──────────────────────
const bush = (a, b) => <><circle cx="-7" cy="0" r="8" fill={a} /><circle cx="5" cy="-4" r="10" fill={b} /><circle cx="13" cy="2" r="6" fill={a} /></>
const flower = (petal) => <>
  <path d="M0 12 V0" stroke="#6aa86b" strokeWidth="1.6" />
  {[0, 72, 144, 216, 288].map(a => <circle key={a} cx={f1(Math.cos(a * Math.PI / 180) * 4)} cy={f1(Math.sin(a * Math.PI / 180) * 4 - 2)} r="3" fill={petal} />)}
  <circle cx="0" cy="-2" r="2.2" fill="#fde68a" />
</>
const pine = (c, h = 30) => <path fill={c} d={`M0 ${-h} L${h * .3} ${-h * .45} L${h * .15} ${-h * .45} L${h * .38} 0 L${-h * .38} 0 L${-h * .15} ${-h * .45} L${-h * .3} ${-h * .45}Z`} />
const pond = () => <>
  <ellipse cx="0" cy="0" rx="18" ry="7" fill="#a7d4f1" />
  <path d="M-9 -1 h7 M3 2 h7" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity=".8" />
</>
const reeds = () => <g stroke="#6aa88a" strokeWidth="1.8" strokeLinecap="round" fill="none">
  <path d="M-4 8 Q-5 -4 -8 -12" /><path d="M0 8 V-14" /><path d="M4 8 Q5 -2 9 -10" />
  <ellipse cx="0" cy="-12" rx="1.6" ry="4" fill="#9a6b46" stroke="none" />
</g>
const cactus = () => <g fill="#7bb36f">
  <rect x="-4" y="-22" width="8" height="30" rx="4" />
  <path d="M-4 -6 h-6 a3 3 0 0 1 -3 -3 v-7 a3 3 0 0 1 6 0 v4 h3Z" />
  <path d="M4 -10 h5 a3 3 0 0 0 3 -3 v-5 a3 3 0 0 0 -6 0 v2 h-2Z" />
</g>
const dune = () => <path d="M-22 6 Q-6 -12 12 2 Q18 -4 24 6Z" fill="#efd08f" />
const palm = () => <>
  <path d="M0 10 Q3 -6 -2 -20" stroke="#b8865b" strokeWidth="3.2" fill="none" strokeLinecap="round" />
  <g fill="#4fae8a">
    <path d="M-2 -20 Q-14 -24 -20 -14 Q-10 -20 -2 -18Z" /><path d="M-2 -20 Q10 -26 18 -16 Q8 -21 -2 -18Z" />
    <path d="M-2 -20 Q-8 -30 -16 -30 Q-8 -26 -2 -19Z" /><path d="M-2 -20 Q6 -32 14 -30 Q4 -27 -2 -19Z" />
  </g>
</>
const waves = () => <g stroke="#8fd6cf" strokeWidth="1.8" fill="none" strokeLinecap="round">
  <path d="M-16 0 q4 -4 8 0 t8 0 t8 0 t8 0" /><path d="M-10 8 q4 -4 8 0 t8 0 t8 0" />
</g>
const leaf = (c) => <g fill={c}>
  <path d="M0 12 Q-18 -2 -6 -20 Q4 -6 0 12Z" /><path d="M2 12 Q20 0 14 -16 Q4 -4 2 12Z" />
</g>
const ruin = () => <g fill="#bcbaa6">
  <rect x="-14" y="-6" width="12" height="14" rx="1.5" /><rect x="0" y="-16" width="12" height="24" rx="1.5" />
  <rect x="-14" y="-6" width="12" height="3" fill="#a9a792" /><rect x="0" y="-16" width="12" height="3" fill="#a9a792" />
</g>
const tree = (c) => <>
  <rect x="-1.8" y="-4" width="3.6" height="14" fill="#8a5a3c" />
  <circle cx="0" cy="-10" r="11" fill={c} /><circle cx="-6" cy="-5" r="6" fill={c} />
</>
const peak = () => <>
  <path d="M-22 8 L0 -22 L22 8Z" fill="#b9c9de" />
  <path d="M-8 -11 L0 -22 L8 -11 L4 -8 L0 -12 L-4 -8Z" fill="#fff" />
</>
const flake = () => <g stroke="#a9bfdc" strokeWidth="1.5" strokeLinecap="round">
  <path d="M0 -7 V7 M-6 -3.5 L6 3.5 M-6 3.5 L6 -3.5" />
</g>
const rock = () => <>
  <path d="M-16 8 L-12 -6 L-2 -12 L10 -8 L16 8Z" fill="#b39498" />
  <path d="M-1 -10 L-4 -4 L1 0 L-2 6" stroke="#f97316" strokeWidth="1.6" fill="none" strokeLinecap="round" />
</>
const volcano = () => <>
  <path d="M-24 8 L-6 -16 H6 L24 8Z" fill="#a98488" />
  <path d="M-6 -16 Q0 -10 6 -16" fill="#fb923c" />
  <circle cx="-2" cy="-24" r="4" fill="#d9c3c5" opacity=".8" /><circle cx="4" cy="-32" r="5" fill="#d9c3c5" opacity=".6" />
</>
const flag = (c) => <><path d="M0 10 V-16" stroke="#7c7591" strokeWidth="2" /><path d="M0 -16 L14 -12 L0 -8Z" fill={c} /></>
const star = (c) => <path fill={c} d="M0 -9 L2.6 -2.8 L9 -2.6 L4 1.4 L5.6 8 L0 4.2 L-5.6 8 L-4 1.4 L-9 -2.6 L-2.6 -2.8Z" />

// [name, top colour, bottom colour, banner colour, road colour, pieces]
const signpost = () => <>
  <rect x="-1.5" y="-14" width="3" height="24" fill="#8a5a3c" />
  <path d="M-12 -14 H8 L12 -10 L8 -6 H-12Z" fill="#c08a5a" /><path d="M12 -2 H-8 L-12 2 L-8 6 H12Z" fill="#b07a4c" />
</>
const tent = () => <>
  <path d="M-16 8 L0 -16 L16 8Z" fill="#e8835a" /><path d="M0 -16 L16 8 H0Z" fill="#cf6b44" />
  <path d="M-4 8 L0 -2 L4 8Z" fill="#7a3a22" />
</>
const campfire = () => <>
  <path d="M-8 6 L8 2 M-8 2 L8 6" stroke="#8a5a3c" strokeWidth="2.6" strokeLinecap="round" />
  <path d="M0 2 Q-6 -4 -1 -12 Q0 -6 3 -8 Q6 -2 0 2Z" fill="#fb923c" /><path d="M0 2 Q-2 -3 0 -6 Q2 -3 0 2Z" fill="#fde047" />
</>

// Index = unit number: the Introduction unit (0) is the trailhead the journey
// starts from, Units 1-9 the regions after it.
const BIOMES = [
  { name: 'Trailhead',        bg: ['#f1f3e0', '#e4e9c8'], banner: '#6d7a32', road: '#f6eccf', pieces: [signpost, tent, campfire] },
  { name: 'Sunny Meadow',     bg: ['#e6f5d9', '#d3edc1'], banner: '#3f8a3a', road: '#f1e2b4', pieces: [() => bush('#a9d68c', '#8cc56c'), () => flower('#f9a8d4'), () => flower('#c4b5fd'), () => bush('#b6dd9a', '#97c97a')] },
  { name: 'Whispering Woods', bg: ['#d8eedc', '#c2e3ca'], banner: '#2f6f4e', road: '#e8dcb8', pieces: [() => pine('#5fa77a', 32), () => pine('#3f8a5e', 26), () => <><g transform="translate(-8 0)">{pine('#4f9a6c', 24)}</g><g transform="translate(9 4)">{pine('#3f8a5e', 30)}</g></>] },
  { name: 'Crystal Lake',     bg: ['#ddf0fb', '#c8e5f6'], banner: '#2f6fa8', road: '#eadfc4', pieces: [pond, reeds, () => <><g transform="translate(0 4)">{pond()}</g><g transform="translate(16 -2)">{reeds()}</g></>] },
  { name: 'Golden Dunes',     bg: ['#fcf1d6', '#f7e3b5'], banner: '#b07a1e', road: '#fffaf0', pieces: [cactus, dune, () => <><g transform="translate(-4 4)">{dune()}</g><g transform="translate(10 -2) scale(.7)">{cactus()}</g></>] },
  { name: 'Coral Coast',      bg: ['#d9f4f2', '#c1eae6'], banner: '#1f8a83', road: '#fbf0d6', pieces: [palm, waves, () => <><circle cx="0" cy="0" r="5" fill="#fca5a5" /><circle cx="9" cy="3" r="3.5" fill="#fdba74" /></>] },
  { name: 'Jungle Ruins',     bg: ['#d6efd2', '#c0e4ba'], banner: '#3d7b3a', road: '#e6dcbc', pieces: [() => leaf('#4ea865'), ruin, () => leaf('#62b876')] },
  { name: 'Autumn Hills',     bg: ['#fcead9', '#f7d8bc'], banner: '#c0572a', road: '#fff6ea', pieces: [() => tree('#f08a4b'), () => tree('#e2b13c'), () => tree('#d9663b')] },
  { name: 'Frost Peaks',      bg: ['#ecf2f9', '#dde7f3'], banner: '#3d5f8f', road: '#ffffff', pieces: [peak, flake, () => <><g transform="translate(-6 0) scale(.8)">{peak()}</g><g transform="translate(14 -14) scale(.7)">{flake()}</g></>] },
  { name: 'Ember Valley',     bg: ['#f8e3e3', '#efcfd1'], banner: '#9a3b3f', road: '#fdf0e6', pieces: [rock, volcano, rock] },
]
const CASTLE = { name: 'Mid-term Castle', bg: ['#ebe7f7', '#dcd5f1'], banner: '#5b4b9e', road: '#f3eefc', pieces: [() => flag('#a78bfa'), () => flag('#f472b6')] }
const SUMMIT = { name: 'Final Summit',    bg: ['#f6efd6', '#ece0b9'], banner: '#9a7413', road: '#fffbee', pieces: [() => star('#f5c542'), () => flag('#f59e0b')] }

// ── Topic landscapes ────────────────────────────────────────────────────────
// A unit's region is drawn from what the unit TEACHES, not from where it falls
// in the course: "Food" is a market, "In the city" is downtown. (An earlier
// version walked a fixed journey -- meadow, woods, lake, dunes -- which put
// Food in a desert and the city on a beach.)

const house = (wall, roof) => <>
  <path d="M-12 8 V-4 L0 -14 L12 -4 V8Z" fill={wall} />
  <path d="M-15 -3 L0 -16 L15 -3" fill="none" stroke={roof} strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round" />
  <rect x="-3" y="0" width="6" height="8" fill={roof} /><rect x="4" y="-4" width="5" height="5" fill="#ffe08a" />
</>
const fence = () => <g fill="#e9dcc3">{[-12, -4, 4, 12].map(x => <path key={x} d={`M${x - 2} 8 V-2 L${x} -5 L${x + 2} -2 V8Z`} />)}<rect x="-15" y="0" width="30" height="2" /></g>
const books = () => <>
  <rect x="-13" y="2" width="26" height="6" rx="1" fill="#e85d5d" /><rect x="-11" y="-4" width="22" height="6" rx="1" fill="#4f8fd6" />
  <rect x="-12" y="-10" width="24" height="6" rx="1" fill="#f2b440" /><rect x="7" y="-9" width="2" height="4" fill="#fff" opacity=".6" />
</>
const pencil = () => <g transform="rotate(-35)">
  <rect x="-3" y="-14" width="6" height="20" fill="#f5c542" /><path d="M-3 6 L0 12 L3 6Z" fill="#f3d3a8" /><path d="M-1 10 L0 12 L1 10Z" fill="#374151" />
  <rect x="-3" y="-17" width="6" height="3" fill="#f472b6" />
</g>
const apple = (c = '#e5484d') => <>
  <circle cx="-3.5" cy="0" r="7" fill={c} /><circle cx="3.5" cy="0" r="7" fill={c} />
  <path d="M0 -6 Q1 -11 3 -12" stroke="#7a4a2a" strokeWidth="1.6" fill="none" /><path d="M1 -9 Q6 -12 8 -8 Q4 -7 1 -9Z" fill="#3fa34d" />
</>
const block = () => <><rect x="-9" y="-9" width="18" height="18" rx="2.5" fill="#7c6cf0" /><text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff" fontFamily="sans-serif">A</text></>
const tshirt = (c) => <path fill={c} d="M-6 -12 L-14 -8 L-11 -1 L-8 -3 V10 H8 V-3 L11 -1 L14 -8 L6 -12 Q0 -8 -6 -12Z" />
const dress = (c) => <>
  <path d="M0 -16 V-13 M-9 -9 L0 -13 L9 -9" stroke="#8a8f99" strokeWidth="1.4" fill="none" strokeLinecap="round" />
  <path d="M-5 -9 H5 L4 -3 L11 10 H-11 L-4 -3Z" fill={c} />
</>
const bag = (c) => <>
  <path d="M-5 -6 V-9 A5 5 0 0 1 5 -9 V-6" fill="none" stroke="#7a3a22" strokeWidth="1.6" />
  <path d="M-10 -6 H10 L8 10 H-8Z" fill={c} />
</>
const tag = () => <><path d="M-10 -6 H6 L12 0 L6 6 H-10Z" fill="#fbbf24" /><circle cx="6" cy="0" r="1.8" fill="#fff" /><path d="M-6 -1 H1 M-6 2 H-1" stroke="#9a6b0c" strokeWidth="1.2" /></>
const carrot = () => <><path d="M-4 -6 L4 -6 L0 12Z" fill="#f97316" /><path d="M0 -6 Q-5 -14 -7 -12 M0 -6 Q0 -15 2 -14 M0 -6 Q5 -13 7 -11" stroke="#3fa34d" strokeWidth="2" fill="none" strokeLinecap="round" /></>
const cupcake = () => <>
  <path d="M-8 0 H8 L6 10 H-6Z" fill="#f2a6c2" /><circle cx="-5" cy="-2" r="5" fill="#fff4e6" /><circle cx="5" cy="-2" r="5" fill="#fff4e6" />
  <circle cx="0" cy="-6" r="6" fill="#fff4e6" /><circle cx="0" cy="-13" r="2.5" fill="#e5484d" />
</>
const pear = () => <><circle cx="0" cy="4" r="8" fill="#b5cf4b" /><circle cx="0" cy="-5" r="5" fill="#b5cf4b" /><path d="M0 -10 V-13" stroke="#7a4a2a" strokeWidth="1.6" /></>
const building = (c) => <>
  <rect x="-9" y="-20" width="18" height="28" fill={c} />
  {[-15, -9, -3, 3].map(y => [-5, 1].map(x => <rect key={`${x}${y}`} x={x} y={y} width="4" height="3.5" fill="#fde68a" opacity=".85" />))}
</>
const lamp = () => <><rect x="-1" y="-14" width="2" height="24" fill="#5b6478" /><path d="M-5 -14 H5 L3 -19 H-3Z" fill="#5b6478" /><circle cx="0" cy="-12" r="6" fill="#fde68a" opacity=".45" /></>
const traffic = () => <><rect x="-1" y="0" width="2" height="10" fill="#5b6478" /><rect x="-5" y="-17" width="10" height="18" rx="2.5" fill="#3b4252" />
  <circle cx="0" cy="-13" r="2.2" fill="#ef4444" /><circle cx="0" cy="-8" r="2.2" fill="#f5c542" /><circle cx="0" cy="-3" r="2.2" fill="#22c55e" /></>
const paw = (c = '#7a5a3c') => <g fill={c} opacity=".7"><ellipse cx="0" cy="3" rx="5" ry="4" /><circle cx="-6" cy="-3" r="2.2" /><circle cx="-2" cy="-7" r="2.2" /><circle cx="3" cy="-7" r="2.2" /><circle cx="7" cy="-3" r="2.2" /></g>
const globe = () => <><circle r="11" fill="#5aa9e6" /><path d="M-7 -6 Q-2 -9 1 -5 Q-1 -1 -5 0 Q-9 -2 -7 -6Z M2 2 Q7 0 8 5 Q4 9 1 6Z" fill="#59b36a" /></>
const phone = () => <><rect x="-7" y="-13" width="14" height="24" rx="3" fill="#2d3748" /><rect x="-5" y="-10" width="10" height="17" rx="1.5" fill="#67e8f9" /><rect x="-3" y="-7" width="6" height="2" rx="1" fill="#fff" /><rect x="-3" y="-3" width="4" height="2" rx="1" fill="#fff" /></>
const laptop = () => <><rect x="-11" y="-11" width="22" height="15" rx="2" fill="#2d3748" /><rect x="-9" y="-9" width="18" height="11" fill="#7dd3fc" /><path d="M-14 5 H14 L12 8 H-12Z" fill="#94a3b8" /></>
const wifi = () => <g fill="none" stroke="#0ea5b7" strokeWidth="2.2" strokeLinecap="round"><path d="M-10 -3 Q0 -12 10 -3" /><path d="M-6 1 Q0 -5 6 1" /><circle cx="0" cy="5" r="1.5" fill="#0ea5b7" /></g>
const chat = (c = '#ffffff') => <><path d="M-11 -9 H11 Q13 -9 13 -7 V3 Q13 5 11 5 H-2 L-7 10 V5 H-11 Q-13 5 -13 3 V-7 Q-13 -9 -11 -9Z" fill={c} />{[-5, 0, 5].map(x => <circle key={x} cx={x} cy="-2" r="1.6" fill="#94a3b8" />)}</>
const envelope = () => <><rect x="-11" y="-7" width="22" height="15" rx="1.5" fill="#fff" /><path d="M-11 -7 L0 2 L11 -7" fill="none" stroke="#f59e0b" strokeWidth="1.6" /></>
const ball = () => <><circle r="9" fill="#fff" stroke="#cbd5e1" strokeWidth=".8" /><path d="M0 -3.5 L3.3 -1 L2 3 H-2 L-3.3 -1Z" fill="#1f2937" /></>
const dumbbell = () => <><rect x="-10" y="-1.5" width="20" height="3" fill="#64748b" /><rect x="-14" y="-7" width="5" height="14" rx="1.5" fill="#334155" /><rect x="9" y="-7" width="5" height="14" rx="1.5" fill="#334155" /></>
const trophy = () => <><path d="M-8 -12 H8 V-6 A8 8 0 0 1 -8 -6Z" fill="#f5c542" /><path d="M-8 -10 H-12 V-7 A4 4 0 0 0 -8 -4 M8 -10 H12 V-7 A4 4 0 0 1 8 -4" fill="none" stroke="#f5c542" strokeWidth="2" />
  <rect x="-1.5" y="1" width="3" height="5" fill="#d9a520" /><rect x="-6" y="6" width="12" height="3" rx="1" fill="#b7791f" /></>
const medal = () => <><path d="M-6 -14 L-1 -3 M6 -14 L1 -3" stroke="#3b82f6" strokeWidth="3.5" /><circle cx="0" cy="3" r="7" fill="#f5c542" /><circle cx="0" cy="3" r="4" fill="none" stroke="#d9a520" strokeWidth="1.2" /></>
const suitcase = () => <><path d="M-4 -10 V-13 H4 V-10" fill="none" stroke="#7a3a22" strokeWidth="1.8" /><rect x="-11" y="-10" width="22" height="18" rx="2.5" fill="#e8835a" /><path d="M-5 -10 V8 M5 -10 V8" stroke="#f6c3a8" strokeWidth="2" /></>
const plane = () => <g fill="#ffffff" transform="rotate(-20)"><path d="M-12 0 Q-12 -2 -9 -2 H8 Q12 -1.6 13 0 Q12 1.6 8 2 H-9 Q-12 2 -12 0Z" /><path d="M-2 -1.5 L-7 -10 H-4 L4 -1.5Z M-2 1.5 L-7 10 H-4 L4 1.5Z" /></g>
const compass = () => <><circle r="10" fill="#fff" stroke="#b07a1e" strokeWidth="2" /><path d="M0 -7 L3 0 L0 7 L-3 0Z" fill="#ef4444" /><path d="M0 0 L3 0 L0 7 L-3 0Z" fill="#64748b" /></>
const clapper = () => <><rect x="-11" y="-4" width="22" height="13" rx="1.5" fill="#2d3748" /><g transform="rotate(-14 -11 -4)"><rect x="-11" y="-9" width="22" height="5" fill="#f5f5f4" />{[0, 1, 2].map(i => <path key={i} d={`M${-9 + i * 7} -9 h3 l-2.5 5 h-3Z`} fill="#2d3748" />)}</g></>
const reel = () => <><circle r="10" fill="#475569" />{[0, 72, 144, 216, 288].map(a => <circle key={a} cx={f1(Math.cos(a * Math.PI / 180) * 5.5)} cy={f1(Math.sin(a * Math.PI / 180) * 5.5)} r="2.2" fill="#e2e8f0" />)}<circle r="1.6" fill="#e2e8f0" /></>
const popcorn = () => <><path d="M-8 -3 H8 L6 10 H-6Z" fill="#fff" /><path d="M-5 -3 L-4 10 M0 -3 V10 M5 -3 L4 10" stroke="#ef4444" strokeWidth="2.2" />
  {[-6, -2, 2, 6, -3, 3].map((x, i) => <circle key={i} cx={x} cy={i < 4 ? -4 : -8} r="3.2" fill="#fff4cc" />)}</>
const palette = () => <><path d="M0 -11 C10 -11 13 -3 11 2 C9 6 4 3 3 7 C2 11 -2 11 -6 9 C-12 6 -12 -11 0 -11Z" fill="#f3e4c8" />
  <circle cx="-5" cy="-5" r="2.2" fill="#ef4444" /><circle cx="1" cy="-7" r="2.2" fill="#3b82f6" /><circle cx="6" cy="-3" r="2.2" fill="#22c55e" /><circle cx="-6" cy="2" r="2.2" fill="#f5c542" /></>
const brush = () => <g transform="rotate(35)"><rect x="-1.5" y="-14" width="3" height="16" fill="#8a5a3c" /><rect x="-2" y="2" width="4" height="3" fill="#94a3b8" /><path d="M-2.5 5 H2.5 L0 12Z" fill="#7c3aed" /></g>
const frame = () => <><rect x="-12" y="-10" width="24" height="18" fill="#c08a4a" /><rect x="-9" y="-7" width="18" height="12" fill="#dbeafe" /><path d="M-9 5 L-3 -2 L1 2 L4 -1 L9 5Z" fill="#59b36a" /><circle cx="5" cy="-4" r="1.8" fill="#f5c542" /></>
const note = (c = '#7c3aed') => <><circle cx="-4" cy="6" r="3.5" fill={c} /><rect x="-1.2" y="-10" width="1.8" height="16" fill={c} /><path d="M0.6 -10 Q7 -8 6 -2 Q5 -6 0.6 -6Z" fill={c} /></>
const heart = (c = '#f43f5e') => <path fill={c} d="M0 9 C-14 0 -11 -12 0 -5 C11 -12 14 0 0 9Z" />
const smiley = () => <><circle r="10" fill="#fcd34d" /><circle cx="-3.5" cy="-2.5" r="1.4" fill="#7a4a10" /><circle cx="3.5" cy="-2.5" r="1.4" fill="#7a4a10" /><path d="M-5 2.5 Q0 7 5 2.5" fill="none" stroke="#7a4a10" strokeWidth="1.6" strokeLinecap="round" /></>
const briefcase = () => <><path d="M-4 -8 V-11 H4 V-8" fill="none" stroke="#3b2f2a" strokeWidth="1.8" /><rect x="-12" y="-8" width="24" height="16" rx="2" fill="#7a5a3c" /><rect x="-12" y="-2" width="24" height="2" fill="#5e4430" /></>
const chartUp = () => <><rect x="-11" y="0" width="5" height="8" fill="#60a5fa" /><rect x="-3" y="-5" width="5" height="13" fill="#3b82f6" /><rect x="5" y="-10" width="5" height="18" fill="#1d4ed8" /><path d="M-12 -6 L-2 -12 L8 -16" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" /></>
const coins = () => <>{[0, 1, 2].map(k => <g key={k}><ellipse cx="0" cy={6 - k * 4 + 1.5} rx="9" ry="3" fill="#b7791f" /><ellipse cx="0" cy={6 - k * 4} rx="9" ry="3" fill="#fcd34d" /></g>)}</>
const banknote = () => <><rect x="-13" y="-7" width="26" height="14" rx="2" fill="#86c98a" /><circle r="4" fill="#5aa65f" /><rect x="-10" y="-4" width="3" height="8" rx="1" fill="#5aa65f" /></>
const piggy = () => <><ellipse cx="0" cy="0" rx="12" ry="9" fill="#f9a8c4" /><circle cx="11" cy="-1" r="3.5" fill="#f48fb1" /><path d="M-4 -8 L-1 -13 L2 -8Z" fill="#f48fb1" /><rect x="-7" y="7" width="3" height="4" fill="#f48fb1" /><rect x="4" y="7" width="3" height="4" fill="#f48fb1" /><circle cx="4" cy="-3" r="1.2" fill="#7a2a4a" /><rect x="-3" y="-9" width="6" height="1.6" fill="#7a2a4a" /></>
const magnifier = () => <><circle cx="-2" cy="-2" r="8" fill="#dbeafe" stroke="#475569" strokeWidth="3" /><path d="M4 4 L11 11" stroke="#475569" strokeWidth="4" strokeLinecap="round" /></>
const footprints = () => <g fill="#6b7280" opacity=".55"><ellipse cx="-5" cy="4" rx="3" ry="5" /><ellipse cx="5" cy="-6" rx="3" ry="5" /></g>
const fingerprint = () => <g fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" opacity=".75">{[3, 6, 9].map(r => <path key={r} d={`M${-r} 4 A${r} ${r + 2} 0 0 1 ${r} 4`} />)}<path d="M0 -1 V8" /></g>
const question = () => <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="800" fill="#6366f1" opacity=".65" fontFamily="sans-serif">?</text>
const flask = () => <><path d="M-4 -12 H4 M-3 -12 V-4 L-10 9 H10 L3 -4 V-12" fill="#e0f2fe" stroke="#64748b" strokeWidth="1.6" strokeLinejoin="round" /><path d="M-7 4 H7 L9 8.5 H-9Z" fill="#22c55e" /></>
const atom = () => <g fill="none" stroke="#3b82f6" strokeWidth="1.6"><ellipse rx="12" ry="4.5" /><ellipse rx="12" ry="4.5" transform="rotate(60)" /><ellipse rx="12" ry="4.5" transform="rotate(-60)" /><circle r="2.5" fill="#ef4444" stroke="none" /></g>
const bulb = () => <><circle cx="0" cy="-3" r="8" fill="#fde68a" /><rect x="-4" y="4" width="8" height="5" rx="1" fill="#94a3b8" /><path d="M-2 -3 L0 0 L2 -3" fill="none" stroke="#d97706" strokeWidth="1.3" /></>
const plus = () => <path fill="#ef4444" d="M-3 -10 H3 V-3 H10 V3 H3 V10 H-3 V3 H-10 V-3 H-3Z" />
const pill = () => <g transform="rotate(-35)"><rect x="-10" y="-4" width="20" height="8" rx="4" fill="#fff" /><path d="M0 -4 H6 A4 4 0 0 1 6 4 H0Z" fill="#60a5fa" /></g>
const lantern = () => <><path d="M0 -16 V-12" stroke="#7a3a22" strokeWidth="1.4" /><rect x="-5" y="-12" width="10" height="2.5" rx="1" fill="#b45309" /><ellipse cx="0" cy="-2" rx="8" ry="9" fill="#ef4444" /><rect x="-5" y="6" width="10" height="2.5" rx="1" fill="#b45309" /><circle cx="0" cy="-2" r="11" fill="#fca5a5" opacity=".3" /></>
const bunting = () => <><path d="M-16 -8 Q0 -2 16 -8" fill="none" stroke="#8a8f99" strokeWidth="1" />{[['#ef4444', -12], ['#f5c542', -4], ['#3b82f6', 4], ['#22c55e', 12]].map(([c, x]) => <path key={x} d={`M${x - 3.5} ${-6.5 + Math.abs(x) * .12} H${x + 3.5} L${x} ${2 + Math.abs(x) * .1}Z`} fill={c} />)}</>
const openBook = () => <><path d="M0 -6 Q-7 -10 -14 -7 V8 Q-7 5 0 8Z" fill="#fff" /><path d="M0 -6 Q7 -10 14 -7 V8 Q7 5 0 8Z" fill="#f1f5f9" /><path d="M0 -6 V8" stroke="#94a3b8" strokeWidth="1" /><path d="M-11 -3 H-3 M-11 1 H-3 M3 -3 H11 M3 1 H11" stroke="#cbd5e1" strokeWidth="1" /></>
const moon = () => <path d="M3 -11 A11 11 0 1 0 11 5 A8.5 8.5 0 1 1 3 -11Z" fill="#fde68a" />
const quill = () => <g transform="rotate(30)"><path d="M0 -14 Q7 -4 1 10 L-1 10 Q-6 -4 0 -14Z" fill="#c4b5fd" /><path d="M0 -10 V12" stroke="#6d28d9" strokeWidth="1" /></g>

// [name, top colour, bottom colour, banner colour, pieces]
const THEMES = {
  home:      { name: 'Hometown',         bg: ['#f4f1e1', '#e7e9cd'], banner: '#7a6a2e', pieces: [() => house('#f6e3c4', '#c0563a'), () => tree('#5fa67a'), fence, () => house('#e8eef6', '#4f7fc0'), () => flower('#f9a8d4')] },
  school:    { name: 'School Hill',      bg: ['#e8effb', '#d7e3f6'], banner: '#2f5fa8', pieces: [books, pencil, () => apple(), block] },
  fashion:   { name: 'Style Street',     bg: ['#fbe8f0', '#f3d5e3'], banner: '#b0447a', pieces: [() => tshirt('#7c9cf0'), () => dress('#f472b6'), () => bag('#e2553a'), tag] },
  food:      { name: 'Food Market',      bg: ['#fdefdf', '#f8dcc0'], banner: '#c0572a', pieces: [() => apple(), carrot, cupcake, pear, () => apple('#f59e0b')] },
  city:      { name: 'Downtown',         bg: ['#eceaf6', '#dcdaee'], banner: '#4b4a8e', pieces: [() => building('#a5a3d6'), lamp, traffic, () => building('#c4b5e6')] },
  wild:      { name: 'Wild Woods',       bg: ['#e0f2dc', '#c9e6c4'], banner: '#2f7a46', pieces: [() => tree('#4f9a6c'), () => paw(), () => leaf('#4ea865'), () => pine('#3f8a5e', 28), globe] },
  tech:      { name: 'Digital Valley',   bg: ['#e0f4f8', '#cbe9f0'], banner: '#0e7490', pieces: [phone, laptop, wifi, () => chat(), envelope] },
  sport:     { name: 'Sports Park',      bg: ['#def4ea', '#c7eadb'], banner: '#1f8a5c', pieces: [ball, dumbbell, trophy, medal] },
  travel:    { name: 'Holiday Coast',    bg: ['#dff3f6', '#f3e6c8'], banner: '#1f7f9a', pieces: [palm, suitcase, plane, compass, waves] },
  adventure: { name: 'Adventure Peaks',  bg: ['#e4eff1', '#d0e1e5'], banner: '#3d6d78', pieces: [peak, tent, compass, () => flag('#ef4444')] },
  screen:    { name: 'Film Studio',      bg: ['#efe7f7', '#e0d3ef'], banner: '#6b3fa0', pieces: [clapper, reel, () => star('#f5c542'), popcorn] },
  arts:      { name: 'Art Quarter',      bg: ['#fcf0e2', '#f4e0c9'], banner: '#a8562a', pieces: [palette, brush, frame, () => note()] },
  feelings:  { name: 'Heart Garden',     bg: ['#fde9ec', '#f8d6dc'], banner: '#c0394f', pieces: [() => heart(), smiley, () => chat('#ffffff'), () => heart('#f9a8d4')] },
  work:      { name: 'Career Heights',   bg: ['#e9eef7', '#d8e1f0'], banner: '#3b5b92', pieces: [briefcase, chartUp, () => star('#f5c542'), trophy] },
  money:     { name: 'Money Market',     bg: ['#fcf4d8', '#f5e4b2'], banner: '#9a6b0c', pieces: [coins, banknote, piggy, tag] },
  crime:     { name: 'Mystery Lane',     bg: ['#e8e9f1', '#d5d7e5'], banner: '#3f4270', pieces: [magnifier, footprints, fingerprint, question] },
  science:   { name: 'Science Lab',      bg: ['#e6f1fb', '#d3e6f8'], banner: '#2563a8', pieces: [flask, atom, bulb] },
  health:    { name: 'Wellness Garden',  bg: ['#e2f5ee', '#cdeee1'], banner: '#1f8a6a', pieces: [() => heart('#ef4444'), plus, pill, () => apple()] },
  culture:   { name: 'Culture Square',   bg: ['#fdede2', '#f7dac8'], banner: '#b4472a', pieces: [lantern, bunting, globe] },
  stories:   { name: 'Story Land',       bg: ['#ece8f8', '#ddd6f2'], banner: '#5b4bb0', pieces: [openBook, moon, quill, () => star('#fde68a')] },
}

// Every Solutions unit, by name, to the landscape of what it teaches.
const UNIT_THEME = {
  'family and friends': 'home', 'school days': 'school', 'style': 'fashion', 'food': 'food',
  'in the city': 'city', 'going wild': 'wild', 'digital world': 'tech', 'be active!': 'sport',
  'home sweet home!': 'home',
  'feelings': 'feelings', 'adventure': 'adventure', 'on screen': 'screen', 'our planet': 'wild',
  'ambition': 'work', 'tourism': 'travel', 'money': 'money', 'crime': 'crime', 'science': 'science',
  'generations': 'home', 'leisure time': 'sport', 'the human body': 'health', 'home': 'home',
  'technology': 'tech', 'high flyers': 'work', 'artists': 'arts', 'messages': 'tech', 'journeys': 'travel',
  'fame': 'screen', 'problems': 'feelings', 'customs and culture': 'culture', 'holidays and tourism': 'travel',
  'relationships': 'feelings', 'health': 'health', 'tall stories': 'stories', 'change the world': 'wild',
  'consumerism': 'fashion',
}
// For a title not in the table -- a renamed unit, a new course -- the nearest
// subject by keyword, so it still lands somewhere that fits.
const THEME_WORDS = [
  [/famil|friend|home|hous|generation|relativ/i, 'home'], [/school|study|learn|class|educat/i, 'school'],
  [/style|fashion|cloth|consum|shop/i, 'fashion'], [/food|eat|cook|drink|meal/i, 'food'], [/city|town|urban/i, 'city'],
  [/wild|animal|nature|planet|environ|world/i, 'wild'], [/digital|tech|comput|internet|message|media/i, 'tech'],
  [/sport|active|leisure|hobb|fitness/i, 'sport'], [/travel|touris|holiday|journey|trip/i, 'travel'],
  [/adventure|explor/i, 'adventure'], [/screen|film|cinema|fame|celebr/i, 'screen'], [/art|music|paint/i, 'arts'],
  [/feel|emotion|relationship|problem/i, 'feelings'], [/ambition|job|work|career|flyer/i, 'work'],
  [/money|price|cost|budget/i, 'money'], [/crime|police|mystery/i, 'crime'], [/scien|invent|experiment/i, 'science'],
  [/health|body|medic|illness/i, 'health'], [/custom|culture|tradition|histor|past/i, 'culture'], [/stor|tale|book|read/i, 'stories'],
  [/mind|behav|psych/i, 'feelings'], [/law|right|govern/i, 'crime'], [/environ|climate/i, 'wild'],
]
function themeOf(title) {
  if (!title) return null
  const key = UNIT_THEME[title.trim().toLowerCase()] || THEME_WORDS.find(([re]) => re.test(title))?.[1]
  return key ? THEMES[key] : null
}

function biomeFor(chapter) {
  // A unit with a name gets the landscape of its topic. The Introduction
  // keeps the trailhead the journey starts from, and courses without units
  // (Beginner, IELTS) keep the journey regions in order.
  if (chapter.kind === 'unit' && chapter.no !== 0) {
    const t = themeOf(chapter.topic) || themeOf(chapter.title)
    if (t) return t
  }
  if (chapter.kind === 'exam') return chapter.final ? SUMMIT : CASTLE
  return BIOMES[chapter.no % BIOMES.length]
}

// The castle the exam card stands in front of.
export function Castle({ cx, by, final }) {
  const wall = final ? '#d8c58f' : '#c9c1e4', dark = final ? '#b9a466' : '#ab9fd6', roof = final ? '#e0a422' : '#7c66c9'
  const tower = (x, w, h) => <>
    <rect x={x - w / 2} y={by - h} width={w} height={h} fill={wall} />
    {[0, 1, 2].map(i => <rect key={i} x={x - w / 2 + i * (w / 3) + 1} y={by - h - 5} width={w / 3 - 2.5} height="6" fill={wall} />)}
    <path d={`M${x - w / 2 - 3} ${by - h - 5} L${x} ${by - h - 24} L${x + w / 2 + 3} ${by - h - 5}Z`} fill={roof} />
    <path d={`M${x} ${by - h - 24} V${by - h - 36}`} stroke="#7c7591" strokeWidth="1.5" />
    <path d={`M${x} ${by - h - 36} L${x + 11} ${by - h - 32} L${x} ${by - h - 28}Z`} fill={final ? '#f59e0b' : '#f472b6'} />
  </>
  return <g>
    <rect x={cx - 70} y={by - 56} width="140" height="56" fill={dark} />
    {Array.from({ length: 9 }, (_, i) => <rect key={i} x={cx - 70 + i * 16} y={by - 62} width="10" height="7" fill={dark} />)}
    {tower(cx - 78, 30, 92)}
    {tower(cx + 78, 30, 92)}
    {tower(cx, 40, 118)}
    <path d={`M${cx - 11} ${by} V${by - 20} A11 11 0 0 1 ${cx + 11} ${by - 20} V${by}Z`} fill={final ? '#7a6424' : '#4b3d86'} />
    {final && [-40, 0, 40].map((dx, i) => <g key={i} transform={`translate(${cx + dx} ${by - 150 - (i === 1 ? 14 : 0)})`}>{star('#f5c542')}</g>)}
  </g>
}

// What a chapter is called in running text: "Unit 3", "the Introduction",
// "Part 2".
const chapterName = (c) => c.kind === 'part' ? `Part ${c.no}` : c.no === 0 ? 'Introduction' : `Unit ${c.no}`

// The ribbon at the top of a chapter: the unit's name from the book, where it
// sits on the journey, and how much of it is done.
export function ChapterBanner({ chapter, width }) {
  const b = biomeFor(chapter)
  const locked = chapter.state === 'locked'
  const firstU = chapter.units[0], lastU = chapter.units[chapter.units.length - 1]
  const first = firstU?.label || firstU?.order, last = lastU?.label || lastU?.order
  const range = first === last ? `Lesson ${first}` : `Lessons ${first}–${last}`
  const kicker = chapter.kind === 'exam'
    ? b.name
    : chapter.kind === 'unit' && chapter.no === 0 ? `Start · ${b.name}` : `${chapterName(chapter)} · ${b.name}`
  const line = chapter.kind === 'exam'
    ? (chapter.final ? 'Final exam · the whole level' : 'Mid-term exam · Units 1–5')
    : (chapter.title || range)
  const pct = chapter.total ? chapter.done / chapter.total : 0
  return (
    <div style={{ width: Math.min(300, width - 24), margin:'0 auto', borderRadius:'16px', padding:'10px 14px',
      display:'flex', alignItems:'center', gap:'12px', fontFamily:"'DM Sans',sans-serif",
      background: locked ? 'var(--surface-3)' : b.banner, color: locked ? 'var(--ink-3)' : '#fff',
      boxShadow: locked ? 'inset 0 0 0 1px var(--line)' : `0 8px 18px -8px ${b.banner}`,
      border: locked ? 'none' : '1.5px solid rgba(255,255,255,.35)' }}>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:'10px', fontWeight:'800', letterSpacing:'.1em', textTransform:'uppercase', opacity:.85 }}>{kicker}</div>
        <div style={{ fontSize:'14px', fontWeight:'800', marginTop:'2px', fontFamily:"'Plus Jakarta Sans',sans-serif",
          whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{line}</div>
      </div>
      {chapter.kind === 'unit' && (
        <div style={{ textAlign:'right', flexShrink:0 }}>
          <div style={{ fontSize:'13px', fontWeight:'800' }}>{chapter.done}/{chapter.total}</div>
          <div style={{ width:'46px', height:'5px', borderRadius:'3px', marginTop:'4px',
            background: locked ? 'var(--line)' : 'rgba(255,255,255,.25)' }}>
            <div style={{ width:`${pct * 100}%`, height:'100%', borderRadius:'3px', background: locked ? 'var(--ink-3)' : '#fff' }} />
          </div>
        </div>
      )}
      {locked && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" style={{ flexShrink:0 }}>
          <rect x="4" y="11" width="16" height="10" rx="2.5" /><path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      )}
    </div>
  )
}

// The reward at the end of a unit: shut until every lesson in it is done,
// then open and glowing. It says how far away it is, which is the point --
// "2 lessons to go" is a goal for this week; "lesson 14 of 40" is not.
export function Chest({ chapter }) {
  const open = chapter.state === 'done'
  const left = chapter.total - chapter.done
  const locked = chapter.state === 'locked'
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'4px', fontFamily:"'DM Sans',sans-serif" }}>
      <svg width="52" height="44" viewBox="-26 -26 52 44" aria-hidden="true"
        style={{ filter: locked ? 'grayscale(1)' : 'none', opacity: locked ? .5 : 1, overflow:'visible' }}>
        {open && <circle cx="0" cy="-4" r="24" fill="#fde68a" opacity=".55" />}
        {open && [-14, 0, 14].map((x, i) => <path key={i} d={`M${x} -18 l1.6 3.4 3.6.4 -2.7 2.4.8 3.6 -3.3 -1.8 -3.3 1.8.8 -3.6 -2.7 -2.4 3.6 -.4z`} fill="#fbbf24" />)}
        <rect x="-18" y="-4" width="36" height="20" rx="3" fill="#b4691f" />
        <rect x="-18" y="2" width="36" height="3" fill="#8a4b12" />
        {open
          ? <path d="M-18 -4 L-14 -16 H14 L18 -4Z" fill="#c9792a" />
          : <path d="M-18 -4 Q-18 -14 -8 -14 H8 Q18 -14 18 -4Z" fill="#c9792a" />}
        {open && <rect x="-14" y="-6" width="28" height="4" fill="#fde047" />}
        <rect x="-3.5" y="-3" width="7" height="8" rx="1.5" fill="#fcd34d" stroke="#8a4b12" strokeWidth=".8" />
      </svg>
      <div style={{ fontSize:'11px', fontWeight:'800', padding:'3px 9px', borderRadius:'10px', whiteSpace:'nowrap',
        background: open ? '#fef3c7' : 'var(--surface)', color: open ? '#92400e' : 'var(--ink-2)',
        boxShadow:'0 1px 3px rgba(0,0,0,.08)' }}>
        {open ? `${chapterName(chapter)} complete` : locked ? `${chapterName(chapter)} reward` : `${left} lesson${left === 1 ? '' : 's'} to open`}
      </div>
    </div>
  )
}

// Four-point glint of light, scattered sparingly over a region.
const Sparkle = ({ x, y, r = 3, o = 1 }) => (
  <path opacity={o} fill="#ffffff" d={`M${x} ${y - r} Q${x} ${y} ${x + r} ${y} Q${x} ${y} ${x} ${y + r} Q${x} ${y} ${x - r} ${y} Q${x} ${y} ${x} ${y - r}Z`} />
)

// A bank of terrain down one edge of a region: its inner contour flows
// through a point every ~90px, smoothed through midpoints so it has no cusps.
function bankPath(side, width, h, seed, n, reach, sway) {
  const pts = []
  for (let y = -30, i = 0; y <= h + 90; y += 90, i++) pts.push([reach + (rnd(seed, n + i) - .5) * sway, y])
  const X = (x) => f1(side === 'left' ? x : width - x)
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const edge = side === 'left' ? -2 : width + 2
  let d = `M${edge} ${pts[0][1]} L${X(pts[0][0])} ${pts[0][1]}`
  for (let i = 1; i < pts.length - 1; i++) {
    const m = mid(pts[i], pts[i + 1])
    d += ` Q${X(pts[i][0])} ${f1(pts[i][1])} ${X(m[0])} ${f1(m[1])}`
  }
  const last = pts[pts.length - 1]
  return `${d} L${X(last[0])} ${last[1]} L${edge} ${last[1]}Z`
}

export default function CourseRegion({ chapter, width, height, first = false, seed = 0, children }) {
  const biome = biomeFor(chapter)
  const muted = chapter.state === 'locked'
  const [top, bottom] = biome.bg
  const tint = biome.banner
  const id = `rg${seed}`
  const h = height + WAVE
  const wave = first
    ? `M0 0 H${width} V${h} H0Z`
    : `M0 ${WAVE} Q${f1(width * .25)} 0 ${f1(width * .5)} ${WAVE * .6} T${width} ${WAVE * .4} V${h} H0Z`
  const rim = first ? null : `M0 ${WAVE} Q${f1(width * .25)} 0 ${f1(width * .5)} ${WAVE * .6} T${width} ${WAVE * .4}`

  // Props sit ON the banks, larger and fewer than a pattern would place them,
  // each with a soft contact shadow, and now and then a small companion beside
  // it -- a cluster reads as a placed scene, a grid reads as wallpaper.
  const props = []
  for (let y = 70, row = 0; y < height - 30; y += 118, row++) {
    const side = (row + seed) % 2 ? 'right' : 'left'
    const k = 1.3 + rnd(seed, 300 + row) * .45
    const inset = 20 + rnd(seed, 320 + row) * 10
    const x = side === 'left' ? inset : width - inset
    const yy = y + rnd(seed, 340 + row) * 30 + WAVE
    const p = biome.pieces[hash(`${seed}p${row}`) % biome.pieces.length]
    props.push(
      <g key={`p${row}`}>
        <ellipse cx={f1(x)} cy={f1(yy + 11 * k)} rx={f1(13 * k)} ry={f1(3.2 * k)} fill="#0b1324" opacity=".1" />
        <g transform={`translate(${f1(x)} ${f1(yy)}) scale(${f1(k)})`}>{p()}</g>
      </g>,
    )
    if (rnd(seed, 360 + row) > .45) {
      const q = biome.pieces[hash(`${seed}q${row}`) % biome.pieces.length]
      const qx = side === 'left' ? x + 30 : x - 30, qy = yy + 26
      props.push(
        <g key={`q${row}`}>
          <ellipse cx={f1(qx)} cy={f1(qy + 8)} rx="9" ry="2.4" fill="#0b1324" opacity=".08" />
          <g transform={`translate(${f1(qx)} ${f1(qy)}) scale(.78)`}>{q()}</g>
        </g>,
      )
    }
  }

  // A faint scatter of the theme's colour, so the ground has grain.
  const specks = Array.from({ length: Math.round(height / 9) }, (_, i) => (
    <circle key={i} cx={f1(rnd(seed, 500 + i) * width)} cy={f1(WAVE + rnd(seed, 900 + i) * height)}
      r={f1(.7 + rnd(seed, 1300 + i) * 1.3)} fill={tint} opacity={f1(.05 + rnd(seed, 1700 + i) * .08)} />
  ))

  return (
    // Colour treatment lives in CourseMap's stylesheet, so the dark theme and
    // the locked state can be combined rather than one overriding the other.
    <svg className={`slc-region${muted ? ' slc-region-muted' : ''}`} width={width} height={h} aria-hidden="true"
      style={{ position:'absolute', left:0, top:-WAVE, display:'block', overflow:'visible' }}>
      <defs>
        <linearGradient id={`${id}g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} />
        </linearGradient>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={tint} stopOpacity=".3" /><stop offset="1" stopColor={tint} stopOpacity=".12" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="1" y1="0" x2="0" y2="0">
          <stop offset="0" stopColor={tint} stopOpacity=".3" /><stop offset="1" stopColor={tint} stopOpacity=".12" />
        </linearGradient>
        <radialGradient id={`${id}s`}>
          <stop offset="0" stopColor="#ffffff" stopOpacity=".55" /><stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`${id}c`}><path d={wave} /></clipPath>
        {/* Props are drawn in plain, full colours; this softens them toward
            the region's own pastel so they belong to the scene instead of
            sitting on it like stickers. */}
        <filter id={`${id}f`} colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values=".62" />
          <feComponentTransfer>
            <feFuncR type="linear" slope=".9" intercept=".08" />
            <feFuncG type="linear" slope=".9" intercept=".08" />
            <feFuncB type="linear" slope=".9" intercept=".08" />
          </feComponentTransfer>
        </filter>
      </defs>

      <path d={wave} fill={`url(#${id}g)`} />
      <g clipPath={`url(#${id}c)`}>
        {/* Light pooling down the middle, where the road and the cards are. */}
        {Array.from({ length: Math.max(1, Math.round(height / 320)) }, (_, i) => (
          <ellipse key={i} cx={f1(width * (.35 + rnd(seed, 40 + i) * .3))} cy={f1(WAVE + (i + .5) * (height / Math.max(1, Math.round(height / 320))))}
            rx={f1(width * .42)} ry="150" fill={`url(#${id}s)`} />
        ))}
        {specks}
        {/* Two layers of bank on each side: a far, wider wash and a nearer,
            deeper band. Depth without drawing a horizon. */}
        <path d={bankPath('left', width, h, seed, 10, 74, 34)} fill={`url(#${id}l)`} opacity=".55" />
        <path d={bankPath('right', width, h, seed, 30, 74, 34)} fill={`url(#${id}r)`} opacity=".55" />
        <path d={bankPath('left', width, h, seed, 50, 46, 26)} fill={`url(#${id}l)`} />
        <path d={bankPath('right', width, h, seed, 70, 46, 26)} fill={`url(#${id}r)`} />
        {/* A rim of light along each bank's edge, as if lit from the road. */}
        <path d={bankPath('left', width, h, seed, 50, 46, 26)} fill="none" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.6" />
        <path d={bankPath('right', width, h, seed, 70, 46, 26)} fill="none" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.6" />
        <g filter={`url(#${id}f)`}>{props}</g>
        {[0, 1, 2].map(i => (
          <Sparkle key={i} x={f1(width * (.2 + rnd(seed, 80 + i) * .6))} y={f1(WAVE + 30 + rnd(seed, 90 + i) * (height - 60))}
            r={f1(2 + rnd(seed, 95 + i) * 1.5)} o={.75} />
        ))}
      </g>
      {/* A soft rim where this region meets the one above. */}
      {rim && <path d={rim} fill="none" stroke={tint} strokeOpacity=".22" strokeWidth="3" />}
      {children}
    </svg>
  )
}

// The landscape a unit gets, for anything else dressed in its colours (the
// website's lesson page header).
export const regionOf = (chapter) => biomeFor(chapter)
