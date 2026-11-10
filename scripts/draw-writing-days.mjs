// Draws the Task 1 visuals of the writing practice papers, days 13–94, as
// clean SVGs (user, 10 Nov 2026) — the same job draw-mock-writing.mjs did for
// the mocks. extract-writing-bank.mjs kept the largest image of each Word file,
// which for most days is the collection's logo, so these papers showed a logo
// instead of the chart. The figures below are read from each day's own chart
// in "0 - FULL ORDER/WORD" (the user's bank); where the source picture has a
// typo, the day's model essay settles it. The tasks themselves are the real
// IELTS ones and stay as they are. Each figure also returns a plain-text
// description stored as `data` in writing-bank.json for the AI marker, which
// cannot see pictures. Values read off a graph are approximate.
//
//   node scripts/draw-writing-days.mjs
import fs from "node:fs";
import path from "node:path";
import {
  svg, title, lineGraph, barChart, hBarChart, pie, pies, table, box, label, arrow, path as stroke, ARROW_DEFS,
  seriesText, catText, tableText, FILLS, esc, r1,
} from "./writing-draw-lib.mjs";

const OUT = path.join(import.meta.dirname, "..", "public", "practice-img", "writing");
const BANK = path.join(import.meta.dirname, "..", "src", "practice", "writing-bank.json");

const FIG = {};

// Shorthands: a whole chart from its data, with the marker's text built in.
const L = (o) => ({ svg: svg(lineGraph(o), o.width, o.height), data: `Line graph${o.unit ? `, ${o.unit}` : ""}. ` + seriesText(o.xs, o.series, o.suffix || "") + (o.note ? " " + o.note : "") });
const B = (o) => ({ svg: svg(barChart(o), o.width, o.height), data: `${o.stacked ? "Stacked bar" : "Bar"} chart${o.unit ? `, ${o.unit}` : ""}. ` + catText(o.cats, o.series, o.suffix || "") + (o.note ? " " + o.note : "") });
const HB = (o) => ({ svg: svg(hBarChart(o), o.width, o.height), data: `Bar chart${o.unit ? `, ${o.unit}` : ""}. ` + catText(o.cats, o.series, o.suffix || "") + (o.note ? " " + o.note : "") });
const T = (o) => { const t = table(o); return { svg: svg(t.body, t.width, t.height), data: `Table${o.heading ? ` (${o.heading.replace(/\n/g, " ")})` : ""}. ` + tableText(o.head, o.rows) + (o.note ? " " + o.note : "") }; };
const years = (a, b, step = 1) => Array.from({ length: Math.floor((b - a) / step) + 1 }, (_, i) => String(a + i * step));

// ── Day 14: motor vehicles per 1,000 inhabitants, 1990 and 2000 ─────────
// (The source table has stray digits in two cells — "135 80" and "80 12";
// the model essay gives Brazil 135 and Romania 80.)
FIG[14] = () => T({
  heading: "Motor vehicles per 1,000 inhabitants",
  head: ["Country", "1990", "2000"],
  rows: [["Bahamas", 235, 187], ["Brazil", 55, 135], ["Cambodia", 1, 1], ["Chile", 68, 88], ["Jordan", 50, 157], ["Luxembourg", 548, 728], ["New Zealand", 531, 557], ["Romania", 68, 80]],
  colW: [200, 140, 140],
});

// ── Day 15: types of magazine sold, 1975 / 1995 / 2015 ──────────────────
FIG[15] = () => B({
  heading: "Magazines sold by the company, by type (%)", unit: "Percentage", suffix: "%",
  cats: ["Sports", "Food", "Fashion", "Health", "Others"],
  series: [{ label: "1975", values: [32, 10, 22, 26, 26] }, { label: "1995", values: [36, 22, 16, 20, 32] }, { label: "2015", values: [42, 10, 5, 20, 26] }],
  max: 45, step: 5,
});

// ── Day 16: investment funds in the US, 1988–2014 ───────────────────────
FIG[16] = () => L({
  heading: "Investment funds in the US (millions of US dollars)", unit: "Millions of US dollars",
  xs: years(1988, 2014, 2),
  series: [
    { label: "Property", values: [50, 58, 52, 75, 60, 62, 70, 82, 105, 90, 115, 150, 178, 190] },
    { label: "Gold", values: [100, 110, 65, 122, 128, 100, 117, 123, 152, 187, 300, 350, 450, 380] },
    { label: "Fine art", values: [80, 85, 65, 80, 92, 52, 108, 65, 175, 100, 150, 200, 302, 332] },
    { label: "Company shares", values: [40, 50, 92, 72, 155, 162, 168, 172, 200, 215, 222, 230, 248, 252] },
  ],
  max: 500, step: 50,
});

// ── Day 17: females per 100 males, six areas, 1995 and 2005 ─────────────
FIG[17] = () => T({
  heading: "Females per 100 males",
  head: ["", "Africa", "Asia", "Europe", "North\nAmerica", "Central\nAmerica", "Oceania"],
  rows: [["1995", 97.8, 105.3, 89.4, 100.1, 100, 103.9], ["2005", 99.2, 104.9, 92.8, 96.9, 97.5, 99.8]],
  colW: [80, 90, 90, 90, 95, 95, 90],
});

// ── Day 18: annual pay, doctors and other workers, 2004 ─────────────────
FIG[18] = () => HB({
  heading: "Annual pay for doctors and other workers in seven countries, 2004", unit: "Thousands of US dollars",
  cats: ["France", "Italy", "Czech Republic", "Germany", "Finland", "Switzerland", "The US"],
  series: [{ label: "Other workers", values: [30, 20, 20, 20, 25, 40, 45] }, { label: "Doctors", values: [70, 60, 63, 62, 50, 70, 120] }],
  max: 140, step: 20, height: 440,
});

// ── Day 19: fruit production, 1970–2010 ─────────────────────────────────
FIG[19] = () => L({
  heading: "Fruit production in four countries (millions of tonnes)", unit: "Millions of tonnes",
  xs: years(1970, 2010, 10),
  series: [
    { label: "Spain", values: [5.6, 6.1, 5.6, 5.35, 5.1] },
    { label: "Turkey", values: [1.95, 2.5, 2.75, 3.25, 3.55] },
    { label: "France", values: [1.2, 1.5, 2.2, 1.8, 2.75] },
    { label: "Germany", values: [2.5, 2, 1.5, 1.5, 1.3] },
  ],
  max: 7, step: 1,
});

// ── Day 20: secondary school teachers' salaries, 2009 ───────────────────
// (The source's middle heading is garbled — "Salary per year (US$"; the
// model essay reads it as the average salary.)
FIG[20] = () => T({
  heading: "Secondary/high school teachers' salaries, 2009",
  head: ["Country", "Starting\nsalary (US$)", "Average\nsalary (US$)", "Maximum\nsalary (US$)", "Years to reach\ntop salary"],
  rows: [["Australia", 34600, 48000, 48000, 9], ["Denmark", 47000, 54000, 54000, 8], ["Luxembourg", 80000, 112000, 139000, 30], ["Korea", 30500, 52600, 84500, 37], ["Japan", 28000, 49000, 62400, 34]],
  colW: [130, 120, 120, 120, 130],
});

// ── Day 21: volunteers and paid workers in a town's sports sector, 2015 ──
FIG[21] = () => B({
  heading: "Volunteers and paid workers in the sports sector of an Australian town, 2015", unit: "Number of people",
  cats: ["Coaching", "Referees", "Therapists", "Other sections"],
  series: [{ label: "Volunteer", values: [74, 32, 45, 58] }, { label: "Paid", values: [45, 39, 41, 48] }],
  max: 90, step: 10,
});

// ── Day 22: sorting waste for recycling ─────────────────────────────────
FIG[22] = () => {
  const xs = [190, 300, 410, 520, 630].map((x) => x - 40);
  const names = ["Shredder", "Primary air\nclassifier", "Magnetic\nseparator", "Trommel\nscreen", "Secondary air\nclassifier"];
  const outs = [null, "Shredded paper\nand plastic", "Steel cans\nand iron", "Glass, food,\nnon-ferrous metals", "Aluminium, wood,\nrubber, plastic"];
  const ends = [null, "Compactor", "Collector", "Collector", "Collector"];
  const body = [ARROW_DEFS, title("How waste is sorted for recycling", 340), `  <g fill="#000">`,
    label(70, 120, "Glass, food,\nsteel cans, iron,\nnon-ferrous metals,\nwood, aluminium", { size: 11 }),
    stroke("M130,150 L660,150"),
    arrow(130, 150, 145, 150),
    ...xs.map((x, i) => box(x - 22, 128, 44, 22, "") + label(x, 98, names[i], { size: 11 })),
    ...xs.slice(0, 4).map((x, i) => arrow(x + 22, 139, xs[i + 1] - 22, 139)),
    ...xs.map((x, i) => (outs[i] ? arrow(x, 152, x, 182) + label(x, 200, outs[i], { size: 11 }) + arrow(x, 236, x, 300) + stroke(`M${x - 22},312 L${x - 22},336 L${x + 22},336 L${x + 22},312`) + `<ellipse cx="${x}" cy="312" rx="20" ry="6" fill="#fff" stroke="#333" stroke-width="1.2"/>` + label(x, 356, ends[i], { size: 11 }) : "")),
    "  </g>"].join("\n");
  return {
    svg: svg(body, 680, 380),
    data: "Process diagram, sorting mixed waste (glass, food, steel cans, iron, non-ferrous metals, wood, aluminium) on a conveyor through five machines in turn: shredder; primary air classifier, which removes shredded paper and plastic to a compactor; magnetic separator, which removes steel cans and iron to a collector; trommel screen, which removes glass, food and non-ferrous metals to a collector; secondary air classifier, which removes aluminium, wood, rubber and plastic to a collector.",
  };
};

// ── Day 24: CO2 emissions of five regions, 2000–2040 (from 2020: forecast)
FIG[24] = () => L({
  heading: "CO2 emissions of five regions, 2000–2040 (forecast from 2020)", unit: "Millions of metric tonnes",
  xs: years(2000, 2040, 5),
  series: [
    { label: "Region 1", values: [8, 8.6, 9.2, 8.4, 7.5, 7.5, 7.3, 7.15, 7] },
    { label: "Region 2", values: [6, 6.25, 5.9, 5.7, 6, 6.3, 6.1, 5.8, 6] },
    { label: "Region 3", values: [4, 3.1, 4, 4.8, 4.8, 4.8, 4.8, 5, 6] },
    { label: "Region 4", values: [2.7, 2.7, 2.7, 3.3, 4, 3.9, 4, 4.5, 5] },
    { label: "Region 5", values: [1, 1.75, 1.5, 1.15, 0.8, 1.3, 1.6, 1.3, 1.3] },
  ],
  max: 10, step: 2, note: "Figures after 2020 are predictions. Region 5 fluctuates between about 0.8 and 1.75 throughout.",
});

// ── Day 28: annual rice production, four countries ──────────────────────
FIG[28] = () => B({
  heading: "Annual rice production", unit: "Million tonnes", xUnit: "Country",
  cats: ["A", "B", "C", "D"],
  series: [{ label: "1995", values: [45, 36, 5, 2.5] }, { label: "2005", values: [47, 47, 7, 2.5] }, { label: "2015", values: [50, 42, 5, 5] }],
  max: 50, step: 10,
});

// ── Day 29: annual milk production, 1990 / 2000 / 2010 ──────────────────
// (The source writes Tanzania's 2000 and 2010 figures in Indian grouping,
// "1,42,000" and "1,55,000".)
FIG[29] = () => T({
  heading: "Annual milk production (litres)",
  head: ["Country", "1990", "2000", "2010"],
  rows: [["Netherlands", 11262000, 11155000, 11466000], ["Australia", 11246000, 11105000, 9165000], ["Tanzania", 87000, 142000, 155000], ["Guatemala", 26000, 55000, 84000]],
  colW: [150, 130, 130, 130],
});

// ── Day 30: UK fuel production, 1981–2000 ───────────────────────────────
FIG[30] = () => L({
  heading: "Production levels of the main fuels in the UK, 1981–2000",
  xs: years(1981, 2000), xEvery: 1,
  series: [
    { label: "Petroleum", values: [90, 104, 118, 136, 138, 139, 138, 125, 110, 100, 100, 105, 118, 133, 137, 140, 143, 140, 150, 145] },
    { label: "Coal", values: [80, 78, 75, 33, 47, 60, 60, 60, 60, 55, 55, 46, 44, 36, 40, 37, 37, 36, 35, 36] },
    { label: "Natural gas", values: [36, 35, 37, 39, 38, 41, 40, 40, 43, 45, 46, 52, 62, 72, 73, 80, 82, 87, 92, 101] },
  ],
  max: 160, step: 20, markers: false, width: 700,
});

// Two charts one above the other in one picture.
const stack = (parts, width = 660) => {
  let y = 0;
  const body = parts.map(({ body: b, height }) => { const g = `  <g transform="translate(0,${y})">\n${b}\n  </g>`; y += height; return g; }).join("\n");
  return svg(body, width, y);
};

// ── Day 32: water use by sector in four countries (%) ───────────────────
FIG[32] = () => T({
  heading: "Water use for different purposes (%)",
  head: ["Country", "Domestic use", "Industry", "Agriculture"],
  rows: [["Egypt", "8%", "10%", "82%"], ["Saudi Arabia", "6%", "30%", "64%"], ["New Zealand", "10%", "46%", "44%"], ["Canada", "20%", "70%", "10%"]],
  colW: [160, 130, 130, 130],
});

// ── Day 33: men and women aged 60–64 in employment, 1970 and 2000 ───────
FIG[33] = () => {
  const cats = ["Belgium", "USA", "Japan", "Australia"];
  const men = [{ label: "1970", values: [79, 73, 85, 76] }, { label: "2000", values: [19, 55, 74, 47] }];
  const women = [{ label: "1970", values: [8, 36, 43, 16] }, { label: "2000", values: [7, 39, 40, 18] }];
  const o = { cats, max: 100, step: 10, height: 290, labelW: 110, labels: true };
  return {
    svg: stack([
      { body: hBarChart({ ...o, heading: "Men aged 60–64 in employment (%)", series: men }), height: 290 },
      { body: hBarChart({ ...o, heading: "Women aged 60–64 in employment (%)", series: women, unit: "Percentage" }), height: 300 },
    ]),
    data: "Two bar charts, % aged 60–64 in employment (1970 / 2000). Men: " + cats.map((c, i) => `${c} ${men[0].values[i]}% / ${men[1].values[i]}%`).join("; ") + ". Women: " + cats.map((c, i) => `${c} ${women[0].values[i]}% / ${women[1].values[i]}%`).join("; ") + ".",
  };
};

// ── Day 34: people taking part in four sports, 1985–2005 ────────────────
FIG[34] = () => L({
  heading: "Number of people taking part in four sports, 1985–2005",
  xs: years(1985, 2005, 5),
  series: [
    { label: "Basketball", values: [80, 77, 83, 84, 80] },
    { label: "Tennis", values: [150, 175, 200, 210, 220] },
    { label: "Badminton", values: [55, 45, 50, 50, 50] },
    { label: "Rugby", values: [240, 210, 200, 150, 50] },
  ],
  max: 300, step: 50,
});

// ── Day 35: first-year students rating college resources "very good" ───
FIG[35] = () => T({
  heading: "First-year students who rated the resources\nprovided by their college “very good” (%)",
  head: ["", "Pre-course\ninformation", "Teaching", "Tutor", "Resources\n(print)", "Other\nresources"],
  rows: [["Economics", "59%", "95%", "90%", "81%", "60%"], ["Law", "72%", "62%", "76%", "70%", "80%"], ["Commerce", "95%", "95%", "93%", "85%", "81%"]],
  colW: [120, 105, 95, 90, 100, 100],
});

// ── Day 36: olive oil production ────────────────────────────────────────
FIG[36] = () => {
  const step = (n, x, y, w, h, name, note) => box(x, y, w, h, "", { fill: "#f6f8f7" }) +
    `<circle cx="${x + 14}" cy="${y + 14}" r="10" fill="#1d3a6b"/><text x="${x + 14}" y="${y + 18}" text-anchor="middle" font-size="11" font-weight="bold" fill="#fff">${n}</text>` +
    label(x + w / 2 + 8, y + 20, name, { size: 12, bold: true }) + (note ? label(x + w / 2, y + 38, note, { size: 10.5, fill: "#333" }) : "");
  const body = [ARROW_DEFS, title("Olive oil production", 340), `  <g fill="#000">`,
    step(1, 520, 50, 150, 70, "Collecting\nthe olives", ""), label(595, 104, "(raked from the trees)", { size: 10.5 }),
    arrow(518, 85, 482, 85),
    step(2, 330, 50, 150, 70, "Storing", ""), label(405, 90, "in a vat\n2 to 3 days", { size: 10.5 }),
    arrow(328, 85, 292, 85),
    step(3, 140, 50, 150, 70, "Washing", ""), label(215, 90, "with cool water", { size: 10.5 }),
    arrow(138, 85, 105, 85), stroke("M105,85 L60,85 L60,150"), arrow(60, 140, 60, 158),
    step(4, 10, 160, 170, 80, "Crushing", ""), label(95, 200, "by hammers;\nmakes olive paste", { size: 10.5 }),
    arrow(95, 242, 95, 272), label(95, 288, "Olive stones → container", { size: 10.5 }),
    arrow(182, 200, 262, 200), label(222, 192, "olive paste", { size: 10 }),
    step(5, 265, 160, 190, 80, "Pressing and\nfiltering", ""), label(360, 222, "hydraulic press and filters", { size: 10.5 }),
    arrow(457, 200, 512, 200), label(485, 192, "oil", { size: 10 }),
    step(6, 515, 160, 155, 80, "Spinning and\nseparating", ""), label(592, 222, "in a centrifuge", { size: 10.5 }),
    arrow(592, 242, 592, 272), label(592, 288, "Water removed", { size: 10.5 }),
    stroke("M535,242 L535,330"), arrow(535, 330, 457, 330), label(495, 322, "oil", { size: 10 }),
    step(7, 265, 300, 190, 60, "Bottling", ""),
    arrow(263, 330, 182, 330),
    step(8, 10, 300, 170, 60, "Transporting\nto store", ""), label(95, 352, "by lorry", { size: 10.5 }),
    "  </g>"].join("\n");
  return {
    svg: svg(body, 680, 380),
    data: "Process diagram, olive oil production in eight stages: 1 collecting the olives (raked from the trees); 2 storing them in a vat for 2 to 3 days; 3 washing with cool water; 4 crushing by hammers into olive paste, with the olive stones removed into a container; 5 pressing (hydraulic press) and filtering the paste; 6 spinning and separating the oil in a centrifuge, with water removed; 7 bottling the oil; 8 transporting it to the store by lorry.",
  };
};

// ── Day 37: five a day by sex and age, UK 2006 ──────────────────────────
// (The source mislabels the fifth group "19-24" and the last "75"; the model
// essay gives 55–64, 65–74 and 75+.)
FIG[37] = () => B({
  heading: "Males and females eating five or more portions of fruit and vegetables a day, UK 2006", unit: "% of age group", suffix: "%", xUnit: "Age group",
  cats: ["19–24", "25–34", "35–44", "45–54", "55–64", "65–74", "75+"],
  series: [{ label: "Males", values: [15, 20, 22, 22, 32, 27, 25] }, { label: "Females", values: [16, 22, 25, 27, 34.5, 29.5, 25.3] }],
  max: 40, step: 5, width: 700,
});

// ── Day 38: enquiries to a Tourist Information Office, Jan–Jun 2011 ─────
FIG[38] = () => L({
  heading: "Enquiries to the Tourist Information Office, January–June 2011", unit: "Number of enquiries",
  xs: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  series: [
    { label: "In person", values: [380, 640, 830, 910, 1110, 1140] },
    { label: "By telephone", values: [800, 750, 790, 790, 940, 1060] },
    { label: "By email/letter", values: [600, 565, 560, 460, 400, 210] },
  ],
  max: 1400, step: 200,
});

// ── Day 41: international travellers by region, 1990–2005 (millions) ────
// (The source has two typos that the totals settle: America 1990 is 80.5,
// not 680.5, and Asia 2000 is 117.4, not 117.44; "Middle West" is the
// Middle East.)
FIG[41] = () => T({
  heading: "International travellers by region (millions)",
  head: ["Region", "1990", "1995", "2000", "2005"],
  rows: [["Africa", 18.2, 20.8, 26.9, 28.7], ["America", 80.5, 112.5, 118.2, 113.2], ["Asia and the Pacific", 60.2, 80.3, 117.4, 135.8], ["Europe", 280.2, 390.3, 393.2, 400.2], ["Middle East", 9.8, 11.3, 13.5, 15.8], ["Total", 448.9, 615.2, 669.2, 693.7]],
  colW: [190, 105, 105, 105, 105],
});

// ── Day 42: Australians speaking four first languages, 1986–2011 ────────
FIG[42] = () => L({
  heading: "People in Australia with Chinese, Arabic, Italian or Greek as their first language", unit: "Number of people",
  xs: years(1986, 2011, 5),
  series: [
    { label: "Chinese", values: [110000, 158000, 207000, 255000, 302000, 350000] },
    { label: "Arabic", values: [50000, 70000, 90000, 110000, 130000, 150000] },
    { label: "Italian", values: [152000, 140000, 130000, 118000, 107000, 107000] },
    { label: "Greek", values: [228000, 218000, 209000, 200000, 190000, 181000] },
  ],
  max: 400000, step: 100000,
});

// ── Day 44: temperatures and rainy days, Brisbane and Canberra ──────────
FIG[44] = () => {
  const xs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const temps = [
    { label: "Brisbane maximum", values: [28, 30, 25, 21, 23, 21, 21, 22, 24, 27, 28, 29] },
    { label: "Canberra maximum", values: [27, 27, 24, 19, 16, 12, 11, 13, 16, 20, 24, 27] },
    { label: "Brisbane minimum", values: [21, 20, 19, 17, 13, 11, 10, 10, 13, 17, 18, 20] },
    { label: "Canberra minimum", values: [13, 13, 11, 7, 3, 1, 1, 2, 3, 6, 9, 12] },
  ];
  const rain = [{ label: "Brisbane", values: [13, 14, 14, 12, 10, 7, 7, 7, 7, 8, 10, 12] }, { label: "Canberra", values: [7, 7, 8, 7, 7, 10, 10, 10, 8, 10, 7, 7] }];
  return {
    svg: stack([
      { body: lineGraph({ heading: "Average daily temperatures in two Australian cities", unit: "°C", xs, series: temps, max: 35, step: 5, height: 330 }), height: 330 },
      { body: barChart({ heading: "Average number of days with rainfall in two Australian cities", unit: "Days with rainfall", xs, cats: xs, series: rain, max: 16, step: 2, height: 300 }), height: 300 },
    ]),
    data: "Line graph, average daily temperatures (°C) by month, Jan–Dec. " + seriesText(xs, temps) + " Bar chart, average number of days with rainfall by month. " + seriesText(xs, rain),
  };
};

// ── Day 45: where people born in and outside Australia lived, 1950 and 2010
FIG[45] = () => {
  const cats = ["People born\nin Australia", "People born\noutside Australia"];
  const y1950 = [{ label: "Cities", values: [50, 60] }, { label: "Towns", values: [20, 12] }, { label: "Rural areas", values: [30, 40] }];
  const y2010 = [{ label: "Cities", values: [65, 80] }, { label: "Towns", values: [15, 10] }, { label: "Rural areas", values: [15, 5] }];
  const half = (heading, series) => barChart({ heading, unit: "Percentage", cats, series, max: 80, step: 20, width: 340, height: 360 });
  return {
    svg: svg(`  <g>\n${half("1950", y1950)}\n  </g>\n  <g transform="translate(340,0)">\n${half("2010", y2010)}\n  </g>`, 680, 360),
    data: "Two bar charts, % of people born in Australia and born outside Australia living in cities, towns and rural areas. 1950: " + catText(cats, y1950, "%") + " 2010: " + catText(cats, y2010, "%"),
  };
};

// ── Day 46: unemployment in the UK, the rest of Europe and Japan ────────
FIG[46] = () => L({
  heading: "Unemployment rates in the UK, the rest of Europe and Japan, 1993–2007", unit: "Percentage", suffix: "%",
  xs: years(1993, 2007, 2),
  series: [
    { label: "UK", values: [11, 9, 8, 6.5, 5, 5, 5, 6] },
    { label: "EU", values: [9, 11, 11.5, 10, 9, 8.5, 8.6, 7.6] },
    { label: "Japan", values: [2, 3, 3, 3, 5, 6, 5, 4] },
  ],
  max: 14, step: 2,
});

// ── Day 47: Harckley Hall, income and expenditure over three years ──────
FIG[47] = () => T({
  heading: "Harckley Hall: income and expenditure",
  head: ["", "Year 1", "Year 2", "Year 3"],
  rows: [
    ["Income from hiring rooms", "£34,000", "£35,000", "£32,000"], ["Income from the café", "£3,500", "£3,000", "£4,000"],
    ["Funding from local council", "£22,000", "£22,000", "£21,000"], ["Funding from other sources", "£24,000", "£25,000", "£27,000"],
    ["Total income", "£83,500", "£85,000", "£84,000"], ["Expenditure", "£56,000", "£60,000", "£62,000"], ["Profit", "£27,500", "£25,000", "£22,000"],
  ],
  colW: [240, 110, 110, 110],
});

// ── Day 48: activities of males and females aged 18–20, one month in 2015 ─
FIG[48] = () => B({
  heading: "Males and females aged 18–20 doing different activities (%)", unit: "Percentage", suffix: "%",
  cats: ["Basketball", "Cycling", "Football", "Swimming", "Hockey"],
  series: [{ label: "Males", values: [33, 36, 52, 20, 12] }, { label: "Females", values: [12, 40, 15, 35, 4.5] }],
  max: 60, step: 10,
});

// ── Day 49: banana prices, 1994–2004 ────────────────────────────────────
FIG[49] = () => L({
  heading: "Banana prices, 1994 to 2004", unit: "US$ per kilogram",
  xs: years(1994, 2004),
  series: [
    { label: "Japan", values: [1.88, 2.85, 2, 1.89, 2.02, 2.24, 2.07, 1.6, 2.1, 2.19, 2.57] },
    { label: "France", values: [1.67, 1.67, 1.68, 1.68, 1.55, 1.75, 1.31, 1.78, 1.62, 1, 1.58] },
    { label: "Germany", values: [1.4, 1.25, 1.52, 1.49, 1.35, 1.54, 1.23, 1.43, 1.21, 1.19, 1.19] },
    { label: "USA", values: [0.79, 1.16, 1.16, 1.02, 1.16, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1] },
  ],
  max: 3, step: 0.5,
});

// A pie whose slices carry only their value; a shared key (pieKey) names them.
// values[i] goes with key i, so the colours match across pies; 0 = no slice.
const keyedPie = (cx, cy, r, heading, values, suffix = "%") =>
  pie({ cx, cy, r, heading, suffix, slices: values.map((v, i) => ({ label: "", short: "", v, ci: i })).filter((s) => s.v > 0) }).replace(/>: /g, ">");
// The key under the pies: up to three per column, two or three columns.
const pieKey = (keys, y, width = 680) => {
  const cols = keys.length > 6 ? 3 : 2, colW = (width - 80) / cols, per = Math.ceil(keys.length / cols);
  return [`  <g>`, ...keys.map((k, i) => {
    const x = 40 + Math.floor(i / per) * colW, yy = y + (i % per) * 20;
    return `    <rect x="${r1(x)}" y="${yy}" width="14" height="12" fill="${FILLS[i % FILLS.length]}" stroke="#333" stroke-width="0.6"/><text x="${r1(x + 22)}" y="${yy + 10}" font-size="12">${esc(k)}</text>`;
  }), `  </g>`].join("\n");
};

// Labels only every `every` years, blanks between (long yearly series).
const sparse = (a, b, every) => years(a, b).map((y, i, all) => (i % every === 0 || i === all.length - 1 ? y : ""));

// ── Day 51: men and women aged 60–64 in employment, 1970 and 2020 ───────
// (The chart and the model essay give 1970 and 2020; the task line said
// 2000 and is corrected to match — see T1FIX.)
FIG[51] = () => {
  const cats = ["Belgium", "USA", "Japan", "Indonesia"];
  const a = [{ label: "Men", values: [79, 86, 75.5, 84] }, { label: "Women", values: [63, 78, 56, 65] }];
  const b = [{ label: "Men", values: [53, 79, 63, 72] }, { label: "Women", values: [7.5, 45, 47, 50] }];
  return {
    svg: stack([
      { body: barChart({ heading: "1970", unit: "Percentage employed", cats, series: a, min: 50, max: 90, step: 10, height: 290 }), height: 290 },
      { body: barChart({ heading: "2020", unit: "Percentage employed", cats, series: b, max: 80, step: 20, height: 290 }), height: 290 },
    ]),
    data: "Two bar charts, % of men and women aged 60–64 in employment. 1970: " + catText(cats, a, "%") + " 2020: " + catText(cats, b, "%"),
  };
};

// ── Day 53: Australian exports to four countries, 1990–2012 (%) ─────────
FIG[53] = () => {
  const xs = sparse(1990, 2012, 5);
  const series = [
    { label: "Japan", values: [25, 26, 24.5, 23.4, 23.4, 22.3, 20.4, 18.8, 18.7, 17.9, 17.9, 17.9, 17, 16.3, 17, 18.3, 17.5, 16.9, 20, 16.9, 17.1, 17.4, 17] },
    { label: "US", values: [11.3, 11.3, 10.2, 9, 9, 9, 7.7, 7.3, 7.6, 10, 10, 10, 10, 9, 8.5, 7.7, 7.6, 7.3, 6.8, 5.9, 5, 4.8, 5.7] },
    { label: "China", values: [2.5, 2.7, 3.1, 3.5, 3.9, 3.8, 4.4, 4.2, 4.4, 5.1, 5.8, 6.3, 7.5, 8.8, 10.6, 12.2, 13.8, 14.2, 20.8, 24, 25.5, 26.8, 28] },
    { label: "India", values: [1.6, 1.6, 1.8, 1.8, 1.8, 1.9, 2, 2.2, 2.4, 2.2, 2.4, 2.6, 3.6, 4.8, 5.3, 5.9, 6.2, 7.1, 8.1, 7.9, 6.4, 5.1, 4.9] },
  ];
  return {
    svg: svg(lineGraph({ heading: "Australian exports to four countries, 1990–2012 (%)", unit: "Percentage of exports", xs, series, max: 30, step: 5, markers: false })),
    data: "Line graph, % of Australian exports going to each country. " + seriesText(years(1990, 2012), series, "%"),
  };
};

// ── Day 54: teaching hours per teacher per year, 2001 ───────────────────
FIG[54] = () => B({
  heading: "Teaching hours per year done by each teacher in four countries, 2001", unit: "Hours per year",
  cats: ["Japan", "Spain", "Ireland", "USA"],
  series: [{ label: "Primary", values: [600, 600, 600, 875] }, { label: "Lower secondary", values: [600, 600, 800, 1070] }, { label: "Upper secondary", values: [670, 970, 760, 1105] }],
  max: 1200, step: 200,
});

// ── Day 55: a modern landfill for household waste ───────────────────────
FIG[55] = () => {
  const ROCK = "#9aa0a6";
  // A pit cross-section at (x, y), w wide; lined = clay + synthetic lining + pipes + tank.
  const pit = (x, y, w, { lined, waste, cover }) => {
    const d = 90, inner = 22, g = [];
    g.push(`    <path d="M${x},${y} L${x + 40},${y} L${x + 40},${y + d} L${x + w - 40},${y + d} L${x + w - 40},${y} L${x + w},${y} L${x + w},${y + d + 40} L${x},${y + d + 40} Z" fill="${ROCK}" stroke="#333" stroke-width="1.2"/>`);
    if (lined) {
      g.push(`    <path d="M${x + 40},${y} L${x + 40},${y + d} L${x + w - 40},${y + d} L${x + w - 40},${y} L${x + w - 40 - inner},${y} L${x + w - 40 - inner},${y + d - inner} L${x + 40 + inner},${y + d - inner} L${x + 40 + inner},${y} Z" fill="#d8b26e" stroke="#333" stroke-width="1"/>`);
      g.push(`    <path d="M${x + 40 + inner - 6},${y} L${x + 40 + inner - 6},${y + d - inner + 6} L${x + w - 40 - inner + 6},${y + d - inner + 6} L${x + w - 40 - inner + 6},${y}" fill="none" stroke="#111" stroke-width="5"/>`);
      const cx = x + w / 2;
      for (let i = -3; i <= 2; i++) g.push(`    <circle cx="${cx + i * 11 + 5}" cy="${y + d - inner - 4}" r="5" fill="#fff" stroke="#333"/>`);
      g.push(`    <rect x="${cx - 10}" y="${y + d - 6}" width="20" height="18" fill="#fff" stroke="#333"/>`);
    }
    if (waste) {
      const top = cover ? y + 12 : y - 8;
      const heap = cover ? "" : ` Q${x + w / 2},${y - 40} ${x + w - 62},${top}`;
      g.push(`    <path d="M${x + 62},${y + d - 32} L${x + 62},${top}${heap} L${x + w - 62},${top} L${x + w - 62},${y + d - 32} Z" fill="#c9c3b5" stroke="#333"/>`);
    }
    if (cover) g.push(`    <rect x="${x + 40}" y="${y - 2}" width="${w - 80}" height="14" fill="#d8b26e" stroke="#333"/>`);
    return g.join("\n");
  };
  const body = [ARROW_DEFS, title("Design of a modern landfill for household waste", 340), `  <g fill="#000">`,
    label(340, 50, "Construction", { size: 13, bold: true }),
    pit(30, 80, 250, {}), label(155, 70, "Man-made hole in natural rock", { size: 10.5 }),
    pit(400, 80, 250, { lined: true }),
    label(525, 70, "Lined with clay and a synthetic lining;", { size: 10.5 }), label(525, 228, "drainage pipes along the bottom, drainage tank below", { size: 10.5 }),
    label(160, 262, "Use", { size: 13, bold: true }), label(520, 262, "Closure", { size: 13, bold: true }),
    label(155, 280, "Lorries tip household waste into the pit", { size: 10.5 }),
    pit(30, 330, 250, { lined: true, waste: true }), label(155, 478, "Waste liquid drains into the tank", { size: 10.5 }),
    pit(400, 330, 250, { lined: true, waste: true, cover: true }),
    stroke("M500,342 L500,306 L430,306", { width: 5, stroke: "#777" }), label(422, 310, "Gases", { size: 10.5, anchor: "end" }),
    label(525, 478, "Waste under a clay cover; a pipe lets the gases out", { size: 10.5 }),
    "  </g>"].join("\n");
  return {
    svg: svg(body, 680, 490),
    data: "Diagram of a modern landfill in three stages. Construction: a man-made hole is dug in natural rock, then lined with clay and a synthetic lining, with drainage pipes along the bottom and a drainage tank beneath. Use: lorries tip household waste into the lined pit; waste liquid drains through the pipes into the tank. Closure: the full pit is sealed with a clay cover, and a pipe running down into the waste carries the gases out.",
  };
};

// ── Day 57: an industrial site now and the plan for new housing ─────────
FIG[57] = () => {
  const frame = (oy, head) => [label(20, oy + 14, head, { size: 12, bold: true, anchor: "start" }),
    `    <rect x="40" y="${oy + 24}" width="560" height="236" fill="#fff" stroke="#333" stroke-width="1.4"/>`,
    `    <rect x="80" y="${oy + 50}" width="470" height="180" fill="#fafafa" stroke="#333" stroke-width="1.2"/>`,
    label(330, oy + 42, "Chimney Road", { size: 11 }), label(330, oy + 250, "Swallow Street", { size: 11 }),
    label(60, oy + 140, "Toe\nLane", { size: 11 }), label(575, oy + 140, "Pie\nWalk", { size: 11 }),
    `    <g font-size="10"><text x="640" y="${oy + 50}" text-anchor="middle">N</text><line x1="640" y1="${oy + 54}" x2="640" y2="${oy + 90}" stroke="#333"/><line x1="620" y1="${oy + 72}" x2="660" y2="${oy + 72}" stroke="#333"/></g>`];
  const now = [...frame(10, "Industrial site now"),
    box(250, 60, 120, 40, "Entrance and\nreception", { size: 10.5 }),
    `    <ellipse cx="135" cy="125" rx="40" ry="26" fill="#fff" stroke="#333" stroke-width="1.2"/>`, label(135, 129, "Parking", { size: 11 }),
    label(300, 132, "Yard", { size: 11 }),
    box(480, 100, 60, 115, "Factory", { size: 11 }),
    box(110, 180, 90, 34, "Storage", { size: 11 }),
    ...[0, 1, 2, 3].map((i) => box(270 + i * 50, 150, 50, 22, "Office", { size: 9.5 })),
    box(270, 190, 50, 22, "Office", { size: 9.5 }), box(320, 190, 50, 22, "Office", { size: 9.5 }), box(370, 190, 100, 22, "Canteen", { size: 9.5 })];
  const plan = [...frame(290, "Development plan: new housing"),
    box(95, 345, 80, 150, "3-bedroom\nhouse\n\n\n4-bedroom\nhouse", { size: 10 }),
    `    <text x="190" y="420" font-size="9.5" text-anchor="middle" transform="rotate(-90 190 420)">Private road</text>`,
    ...[0, 1, 2].map((i) => box(205 + i * 75, 345, 75, 45, "2-bedroom\nhouse", { size: 9.5 })),
    box(205, 395, 225, 24, "Communal gardens", { size: 10, fill: "#eef5ee" }),
    `    <text x="445" y="420" font-size="9.5" text-anchor="middle" transform="rotate(-90 445 420)">Private road</text>`,
    label(318, 438, "Private road", { size: 10 }),
    box(240, 450, 160, 34, "Parking garages", { size: 10.5 }),
    box(470, 345, 70, 150, "Parking\narea\n\n\nApartment", { size: 10 })];
  return {
    svg: svg([`  <g fill="#000">`, ...now, ...plan, "  </g>"].join("\n"), 680, 545),
    data: "Two plans of a site bounded by Chimney Road (north), Swallow Street (south), Toe Lane (west) and Pie Walk (east). Now (industrial): entrance and reception at the north; a yard in the middle; a round parking area in the west; storage in the south-west; a block of six offices and a canteen in the centre-south; a factory along the east side. Plan (new housing): a 3-bedroom and a 4-bedroom house along the west side; three 2-bedroom houses in the north centre, with communal gardens (with trees) in front of them; private roads on either side and across the south of the gardens; parking garages in the south centre; a parking area and an apartment block along the east side where the factory was.",
  };
};

// ── Day 58: how working adults spent the day, 1958 and 2008 ─────────────
FIG[58] = () => {
  const keys = ["Sleeping", "Travelling to work", "Working", "Relaxing at home", "Going out (with friends/family)", "Other (e.g. hobbies/playing sport)"];
  const a = [32, 2, 33, 8, 19, 6], b = [25, 8, 42, 13, 6, 6];
  return {
    svg: svg([title("Percentage of the day spent on different activities", 340), keyedPie(175, 200, 95, "1958", a), keyedPie(505, 200, 95, "2008", b), pieKey(keys, 348)].join("\n"), 680, 420),
    data: "Two pie charts, % of the day working adults spent on each activity. 1958: " + keys.map((k, i) => `${k} ${a[i]}%`).join(", ") + ". 2008: " + keys.map((k, i) => `${k} ${b[i]}%`).join(", ") + ".",
  };
};

// ── Day 59: UK population eating the recommended fruit and veg, 2002–2010 ─
FIG[59] = () => B({
  heading: "UK population eating the recommended daily amount of fruit and vegetables (%)", unit: "Percentage", suffix: "%", labels: true,
  cats: ["2002", "2006", "2010"],
  series: [{ label: "Men", values: [22, 28, 24] }, { label: "Women", values: [25, 32, 27] }, { label: "Children", values: [11, 16, 14] }],
  max: 40, step: 5,
});

// ── Day 60: overseas visitors to the UK by purpose, 1989–2009 ───────────
FIG[60] = () => {
  const series = [
    { label: "Holiday", values: [6.5, 6.6, 6.7, 6.8, 7.1, 7.6, 8.1, 8.5, 9, 9.5, 9, 8.7, 8.4, 8.1, 7.8, 7.5, 7.8, 8.1, 8.4, 8.7, 9] },
    { label: "Business", values: [5.3, 5.1, 4.7, 4, 4, 4.6, 5, 5.4, 5.9, 6.3, 6.8, 7, 7, 6.9, 6.9, 7, 7.3, 7.7, 8.1, 7.6, 7] },
    { label: "Visiting friends or relatives", values: [3.6, 3.7, 3.8, 4, 4.1, 4.2, 4.5, 4.8, 5.1, 5.4, 5.7, 6, 6.3, 6.6, 6.9, 7, 7, 6.8, 6.6, 6.4, 6.2] },
  ];
  return {
    svg: svg(lineGraph({ heading: "Overseas visitors to the UK by purpose of visit, 1989–2009", unit: "Millions of visitors", xs: sparse(1989, 2009, 5), series, max: 10, step: 2, markers: false })),
    data: "Line graph, millions of overseas visitors to the UK. " + seriesText(years(1989, 2009), series),
  };
};

// Two tables side by side in one picture.
const twoTables = (a, b, gap = 20) => {
  const ta = table(a), tb = table(b);
  const width = ta.width + tb.width + gap, height = Math.max(ta.height, tb.height);
  return { svg: svg(`  <g>\n${ta.body}\n  </g>\n  <g transform="translate(${ta.width + gap},0)">\n${tb.body}\n  </g>`, width, height), data: "" };
};

// ── Day 61: exchange students between Europe and Australia, 2007 and 2009
FIG[61] = () => {
  const head = ["Country", "2007", "2009"];
  const toAus = [["France", 61, 60], ["Sweden", 32, 42], ["United Kingdom", 31, 25], ["Germany", 27, 63], ["The Netherlands", 36, 26], ["Total", 186, 226]];
  const toEur = [["France", 37, 58], ["Sweden", 33, 27], ["United Kingdom", 32, 23], ["Germany", 18, 26], ["The Netherlands", 32, 18], ["Total", 152, 152]];
  const t = twoTables({ heading: "From universities in Europe\nto Australia", head, rows: toAus, colW: [150, 70, 70] }, { heading: "From universities in Australia\nto Europe", head, rows: toEur, colW: [150, 70, 70] });
  t.data = "Two tables, number of exchange students. From Europe to Australia: " + tableText(head, toAus) + " From Australia to Europe: " + tableText(head, toEur);
  return t;
};

// ── Day 62: reasons for absence from work, 2000 / 2005 / 2010 ───────────
FIG[62] = () => B({
  heading: "Reasons people gave for not going to work (%)", unit: "Percentage", suffix: "%",
  cats: ["Illness", "Stress", "Personal needs\n(appointments,\netc.)", "Family\nresponsibilities", "Unexpected problems\n(transport,\nweather, etc.)"],
  series: [{ label: "2000", values: [44, 6, 13.7, 27, 8.3] }, { label: "2005", values: [40, 4.2, 20, 25.7, 14] }, { label: "2010", values: [35, 12.5, 23, 25.7, 13] }],
  max: 45, step: 5, width: 700,
});

// ── Day 63: a school in 1985 and now ────────────────────────────────────
FIG[63] = () => {
  const FIELD = "#e3efe0";
  const site = (ox, after) => {
    const g = [`    <rect x="${ox}" y="40" width="300" height="350" fill="#fff" stroke="#333" stroke-width="1.4"/>`,
      `    <line x1="${ox}" y1="56" x2="${ox + 300}" y2="56" stroke="#333" stroke-dasharray="6 4"/>`,
      label(ox + (after ? 36 : 70), 72, "Entrance", { size: 10.5 }), label(ox + (after ? 282 : 255), 72, "Exit", { size: 10.5 }),
      box(ox + 10, 84, 34, 70, "Office", { size: 10 })];
    if (!after) {
      g.push(stroke(`M${ox + 60},76 L${ox + 60},160 L${ox + 250},160 L${ox + 250},76`, { dash: "5 4" }));
      g.push(box(ox + 80, 90, 150, 50, "Car park", { size: 11 }));
      g.push(label(ox + 155, 156, "Road", { size: 11 }));
      g.push(box(ox + 92, 175, 54, 18, "Car park", { size: 9.5 }));
      g.push(box(ox + 10, 170, 50, 120, "Library", { size: 10.5 }));
      g.push(box(ox + 75, 205, 80, 50, "Classrooms", { size: 10.5 }));
      g.push(box(ox + 185, 200, 105, 50, "Classroom\nblock\n(2 storeys)", { size: 10 }));
      g.push(box(ox + 10, 290, 280, 90, "Playing fields", { size: 11, fill: FIELD }));
    } else {
      g.push(`    <path d="M${ox + 60},62 A95,90 0 0 0 ${ox + 250},62" fill="none" stroke="#333" stroke-width="1.2"/>`);
      g.push(`    <path d="M${ox + 95},62 A60,55 0 0 0 ${ox + 215},62 Z" fill="#fff" stroke="#333" stroke-width="1.2"/>`);
      g.push(label(ox + 155, 92, "Car park", { size: 11 }), label(ox + 155, 140, "Road", { size: 11 }));
      g.push(box(ox + 10, 165, 50, 90, "Learning\nResources\nCentre\n\nComputer\nroom", { size: 9 }));
      g.push(label(ox + 165, 205, "Trees", { size: 10 }));
      g.push(box(ox + 195, 185, 95, 50, "Classroom\nblock\n(3 storeys)", { size: 10 }));
      g.push(box(ox + 10, 265, 140, 34, "Classrooms", { size: 10.5 }), box(ox + 195, 250, 95, 40, "Classrooms", { size: 10.5 }));
      g.push(box(ox + 10, 310, 70, 45, "Pool", { size: 10.5 }), box(ox + 80, 310, 70, 45, "Fitness\ncentre", { size: 10 }));
      g.push(box(ox + 160, 305, 130, 75, "Playing fields", { size: 11, fill: FIELD }));
    }
    return g.join("\n");
  };
  return {
    svg: svg([`  <g fill="#000">`, site(30, false), site(350, true),
      label(180, 412, "School in 1985\n(school population: 1,500 students)", { size: 12, bold: true, lh: 16 }),
      label(500, 412, "School now\n(school population: 2,300 students)", { size: 12, bold: true, lh: 16 }), "  </g>"].join("\n"), 680, 450),
    data: "Two plans of a school. 1985 (1,500 students): entrance and exit off the road at the top; a looping road round a central car park; an office and a library on the left; a small second car park; a classroom building in the middle and a two-storey classroom block on the right; large playing fields across the whole bottom half. Now (2,300 students): the road curves round a larger semicircular car park; the office stays; the library has become a Learning Resources Centre with a computer room; the small car park has gone and trees stand in the middle; the classroom block on the right is now three storeys; two new classroom buildings; a pool and a fitness centre in the bottom left; the playing fields are much smaller, in the bottom right only.",
  };
};

// ── Day 64: forest industry production, 1980–2000 (million tonnes) ──────
FIG[64] = () => {
  const xs = ["1980", "", "1985", "", "1990", "", "1995", "", "2000"];
  const series = [
    { label: "Pulp", values: [5.5, 2.5, 7, 7.5, 8, 8, 8.3, 8.2, 9.8] },
    { label: "Timber", values: [4.8, 7, 10, 8, 8, 7.5, 6.5, 8.2, 7.5] },
    { label: "Paper", values: [4, 5, 6, 6.5, 7, 7.5, 9, 8, 12] },
  ];
  const at = ["1980", "1982.5", "1985", "1987.5", "1990", "1992.5", "1995", "1997.5", "2000"];
  return {
    svg: svg(lineGraph({ heading: "Forest industry production, 1980–2000", unit: "Million tonnes", xs, series, max: 14, step: 2 })),
    data: "Line graph, production in million tonnes (points every two and a half years). " + seriesText(at, series),
  };
};

// ── Day 65: what makes a good manager — ratings 1–5 in three surveys ────
FIG[65] = () => B({
  heading: "Factors that make managers good at their jobs (rated 1–5)", unit: "Rating (1–5)",
  cats: ["Responsibility", "Good\ncommunication", "Transparency", "Empathy", "Vision"],
  series: [{ label: "2010", values: [5, 4, 3, 1, 2] }, { label: "2015", values: [4, 4, 4, 3, 3] }, { label: "2020", values: [5, 5, 3, 4, 4] }],
  max: 6, step: 1,
});

// ── Day 66: people in five types of work, one region of Australia ───────
FIG[66] = () => B({
  heading: "Number of people in five types of work, 2001 and 2008", unit: "Number of people",
  cats: ["Sales", "Accounting", "Computing", "Nursing", "Farming"],
  series: [{ label: "2001", values: [153000, 66000, 58000, 58000, 29000] }, { label: "2008", values: [165000, 58000, 80000, 62000, 19000] }],
  max: 180000, step: 20000,
});

// ── Day 67: overseas visitors to three areas, 1987–2007 (thousands) ─────
FIG[67] = () => {
  const xs = ["1987", "", "1992", "", "1997", "", "2002", "", "2007"];
  const at = ["1987", "1989.5", "1992", "1994.5", "1997", "1999.5", "2002", "2004.5", "2007"];
  const series = [
    { label: "The coast", values: [40, 37.5, 35, 45.5, 48.5, 60, 63, 65.5, 75] },
    { label: "The mountains", values: [20, 28.5, 24, 20, 30, 35, 30, 32, 35] },
    { label: "The lakes", values: [10, 20, 25, 35, 40, 50, 75, 61, 49.5] },
  ];
  return {
    svg: svg(lineGraph({ heading: "Overseas visitors to three areas in a European country, 1987–2007", unit: "Thousands of visitors", xs, series, max: 80, step: 10 })),
    data: "Line graph, thousands of overseas visitors (points every two and a half years). " + seriesText(at, series),
  };
};

// ── Day 68: how recycled paper is made ──────────────────────────────────
FIG[68] = () => {
  const stage = (n, y, name) => `    <rect x="20" y="${y}" width="110" height="82" fill="#e8eef3" stroke="#333" stroke-width="1"/>` + label(75, y + 36, `${n}. ${name}`, { size: 12, bold: true });
  const step = (x, y, w, t) => box(x, y, w, 52, t, { fill: "#f6f8f7", size: 10.5 });
  const body = [ARROW_DEFS, title("How recycled paper is made", 340), `  <g fill="#000">`,
    stage(1, 44, "Making\npulp"), step(150, 59, 160, "Used paper carried\non a conveyor belt"), arrow(312, 85, 350, 85), step(352, 59, 300, "Dropped into a tank of water and\nchemicals: unfiltered pulp"),
    arrow(502, 113, 502, 145),
    stage(2, 136, "Filtering"), step(352, 147, 300, "Pulp filtered through a sieve\ninto a tank: filtered pulp"), arrow(350, 173, 312, 173), step(150, 147, 160, "Ink drained off"),
    arrow(502, 201, 502, 233),
    stage(3, 228, "Cleaning"), step(352, 235, 300, "Washed with water and soap,\nwith air pumped in"), arrow(350, 261, 312, 261), step(150, 235, 160, "Then water and\nchemicals: cleaned pulp"),
    arrow(230, 289, 230, 321),
    stage(4, 320, "Making\npaper"), step(150, 323, 210, "Spread on a conveyor belt;\nwater drained"), arrow(362, 349, 400, 349), step(402, 323, 140, "Dried by\nheated rollers"), arrow(544, 349, 570, 349), step(572, 323, 90, "Recycled\npaper"),
    "  </g>"].join("\n");
  return {
    svg: svg(body, 680, 410),
    data: "Process diagram, recycled paper in four stages. 1 Making pulp: used paper is carried on a conveyor belt into a tank of water and chemicals, making unfiltered pulp. 2 Filtering: the pulp is filtered through a sieve into a tank and the ink is drained off, leaving filtered pulp. 3 Cleaning: the pulp is washed with water and soap while air is pumped in, then treated with water and chemicals, giving cleaned pulp. 4 Making paper: the pulp is spread on a conveyor belt, the water drains away, heated rollers dry it, and it comes out as rolls of recycled paper.",
  };
};

// ── Day 69: people going to the cinema on each day of the week (%) ──────
FIG[69] = () => B({
  heading: "People going to the cinema in a European country on different days (%)", unit: "Percentage", suffix: "%",
  cats: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  series: [{ label: "2003", values: [10, 20, 15.5, 17.5, 30, 40, 30] }, { label: "2005", values: [14, 17, 14.2, 13.3, 30, 45, 34] }, { label: "2007", values: [12.5, 18.5, 8.5, 19, 30, 42, 31.7] }],
  max: 50, step: 5,
});

// ── Day 70: temporary migrant workers, 2003 and 2006 ────────────────────
FIG[70] = () => T({
  heading: "Temporary migrant workers, 2003 and 2006",
  head: ["Country", "2003", "2006", "Per 1,000 people\nin 2006"],
  rows: [["Australia", 152000, 219000, 10.7], ["New Zealand", 65000, 87000, 21.1], ["United Kingdom", 137000, 266000, 4.4], ["United States", 577000, 678000, 2.3]],
  colW: [170, 120, 120, 140],
});

// ── Day 71: average house prices in three countries, 1997–2014 ──────────
FIG[71] = () => {
  const series = [
    { label: "Country A", values: [150, 170, 190, 195, 300, 400, 535, 495, 470, 455, 500, 550, 600, 605, 607, 608, 600, 620] },
    { label: "Country B", values: [135, 190, 220, 250, 270, 300, 310, 320, 375, 310, 280, 270, 375, 470, 500, 510, 490, 488] },
    { label: "Country C", values: [105, 120, 130, 140, 150, 160, 170, 180, 195, 210, 230, 150, 250, 268, 278, 290, 300, 280] },
  ];
  return {
    svg: svg(lineGraph({ heading: "Average house price, 1997–2014", unit: "Thousands of US dollars", xs: years(1997, 2014).map((y, i) => (i % 2 ? "" : y)), series, max: 750, step: 250 })),
    data: "Line graph, average house price in thousands of dollars ($k). " + seriesText(years(1997, 2014), series, "k"),
  };
};

// ── Day 72: a city in 1950 and now ──────────────────────────────────────
FIG[72] = () => {
  const ROAD = (d) => `    <path d="${d}" fill="none" stroke="#333" stroke-width="5"/><path d="${d}" fill="none" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 4"/>`;
  const RIVER = (d) => `    <path d="${d}" fill="none" stroke="#2b8cbe" stroke-width="2.5"/>`;
  const BIZ = "#c9d6e8", RES = "#f1e7c9";
  const compass = (x, y) => `    <g font-size="10"><text x="${x}" y="${y - 22}" text-anchor="middle">N</text><line x1="${x}" y1="${y - 18}" x2="${x}" y2="${y + 18}" stroke="#333"/><line x1="${x - 18}" y1="${y}" x2="${x + 18}" y2="${y}" stroke="#333"/></g>`;
  const gov = (x, y, w = 20) => `    <rect x="${x}" y="${y}" width="${w}" height="10" fill="#fff" stroke="#111" stroke-width="2"/>`;
  const bridge = (x, y) => `    <rect x="${x - 4}" y="${y}" width="8" height="26" fill="#111"/>`;
  const airport = (x, y) => box(x, y, 60, 50, "Airport", { size: 10 });
  const then = [`    <rect x="10" y="40" width="320" height="230" fill="#fff" stroke="#333" stroke-width="1.4"/>`, compass(295, 75),
    `    <path d="M120,150 C110,110 135,85 165,90 C200,80 215,110 205,150 Z" fill="${RES}" stroke="#333"/>`,
    `    <ellipse cx="160" cy="145" rx="28" ry="22" fill="${BIZ}" stroke="#333"/>`,
    ROAD("M10,150 L330,150"), ROAD("M160,270 L160,140 C165,110 190,80 215,40"),
    RIVER("M10,240 C40,225 50,170 70,195 C90,215 120,175 160,200 C200,215 240,185 260,200 C280,210 300,190 330,205"),
    bridge(160, 186), gov(170, 222), airport(260, 205), label(40, 233, "River", { size: 10.5, anchor: "start" })];
  const now = [`    <rect x="350" y="40" width="320" height="230" fill="#fff" stroke="#333" stroke-width="1.4"/>`, compass(640, 75),
    `    <path d="M430,70 C470,40 560,45 590,80 C620,120 605,170 590,190 C600,230 560,268 510,268 C450,268 425,230 435,190 C410,150 415,100 430,70 Z" fill="${RES}" stroke="#333"/>`,
    `    <ellipse cx="505" cy="120" rx="38" ry="28" fill="${BIZ}" stroke="#333"/>`, `    <ellipse cx="505" cy="205" rx="32" ry="24" fill="${BIZ}" stroke="#333"/>`,
    `    <path d="M435,170 C460,150 480,165 505,160 C535,152 560,165 575,170 C565,190 535,185 505,188 C480,190 455,195 435,170 Z" fill="#bfe0ef" stroke="#2b8cbe"/>`,
    label(465, 176, "Lake", { size: 10 }), label(545, 176, "Lake", { size: 10 }),
    RIVER("M350,225 C380,215 400,180 435,172"), RIVER("M575,172 C600,180 610,200 640,195 C650,200 655,230 668,245"),
    `    <rect x="602" y="190" width="10" height="14" fill="#fff" stroke="#111" stroke-width="1.5"/>`, label(625, 186, "Dam", { size: 10 }),
    ROAD("M350,140 L670,150"), ROAD("M505,270 L505,120 C510,90 530,60 550,40"), ROAD("M350,245 L510,245 L585,150"),
    bridge(505, 160), gov(495, 212), gov(490, 255, 30), airport(605, 205), label(372, 240, "River", { size: 10.5 })];
  const key = [`  <g font-size="11">`, `    <rect x="40" y="290" width="22" height="12" fill="${BIZ}" stroke="#333"/><text x="68" y="300">Business district</text>`,
    `    <rect x="190" y="290" width="22" height="12" fill="${RES}" stroke="#333"/><text x="218" y="300">Residential area</text>`,
    gov(340, 291) + `<text x="368" y="300">Government building</text>`,
    `    <path d="M500,296 L530,296" stroke="#333" stroke-width="5"/><path d="M500,296 L530,296" stroke="#fff" stroke-width="2.5" stroke-dasharray="6 4"/><text x="536" y="300">Major road</text>`,
    `    <rect x="612" y="288" width="8" height="16" fill="#111"/><text x="626" y="300">Bridge</text>`, `  </g>`];
  return {
    svg: svg([`  <g fill="#000">`, ...then, ...now, ...key,
      `    <rect x="14" y="44" width="215" height="20" fill="#fff" opacity="0.9"/><rect x="354" y="44" width="215" height="20" fill="#fff" opacity="0.9"/>`,
      label(20, 58, "City, 1950 — population 20,000", { size: 12, bold: true, anchor: "start" }), label(360, 58, "City, now — population 200,000", { size: 12, bold: true, anchor: "start" }),
      "  </g>"].join("\n"), 680, 320),
    data: "Two maps of a city. 1950 (population 20,000): a small business district with a residential area around its north side, where two major roads cross north of a river; the north–south road crosses the river by a bridge; a government building just south of the river; an airport in the east. Now (population 200,000): a dam in the east has turned the river through the centre into a lake; the residential area surrounds the whole city on both sides of the lake; a second business district south of the lake, with a government building; the north–south road continues across the lake by the bridge; a new road runs along the south-west and diagonally north-east across the lake; a large new government building in the south; the airport is unchanged.",
  };
};

// ── Day 73: two plans for a conference room ─────────────────────────────
FIG[73] = () => {
  const chairs = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="8" fill="#fff" stroke="#333"/>`).join("");
  const room = (ox, plan) => {
    const g = [`    <rect x="${ox}" y="40" width="300" height="330" fill="#fff" stroke="#333" stroke-width="1.6"/>`, label(ox + 262, 62, "entrance", { size: 10.5 }), `    <line x1="${ox + 225}" y1="40" x2="${ox + 285}" y2="28" stroke="#333"/>`];
    if (plan === "A") {
      g.push(`    <circle cx="${ox + 70}" cy="74" r="8" fill="#9aa0a6" stroke="#333"/>`, box(ox + 50, 86, 44, 32, "Podium", { size: 9.5 }), box(ox + 130, 90, 100, 18, "Whiteboard", { size: 10 }));
      g.push(box(ox + 40, 150, 32, 100, ""), "    " + chairs([[ox + 22, 170], [ox + 22, 200], [ox + 22, 230]]));
      g.push(box(ox + 225, 150, 32, 100, ""), "    " + chairs([[ox + 275, 170], [ox + 275, 200], [ox + 275, 230]]));
      g.push(box(ox + 85, 265, 130, 32, ""), "    " + chairs([[ox + 105, 315], [ox + 135, 315], [ox + 165, 315], [ox + 195, 315]]));
      g.push(box(ox + 55, 335, 190, 33, "Morning tea", { size: 12 }));
    } else {
      g.push(box(ox, 50, 110, 26, "Morning tea", { size: 11 }));
      g.push(box(ox + 95, 98, 110, 18, "Whiteboard", { size: 10 }), `    <circle cx="${ox + 150}" cy="132" r="8" fill="#9aa0a6" stroke="#333"/>`, box(ox + 130, 142, 44, 32, ""));
      g.push(box(ox + 45, 180, 32, 100, ""), "    " + chairs([[ox + 27, 200], [ox + 27, 230], [ox + 27, 260], [ox + 95, 200], [ox + 95, 230], [ox + 95, 260]]));
      g.push(box(ox + 225, 180, 32, 100, ""), "    " + chairs([[ox + 207, 200], [ox + 207, 230], [ox + 207, 260], [ox + 275, 200], [ox + 275, 230], [ox + 275, 260]]));
      g.push("    " + chairs([[ox + 120, 300], [ox + 150, 300], [ox + 180, 300]]), box(ox + 100, 315, 100, 30, ""), "    " + chairs([[ox + 120, 360], [ox + 150, 360], [ox + 180, 360]]));
    }
    g.push(label(ox + 150, 395, `Plan ${plan}`, { size: 13, bold: true }));
    return g.join("\n");
  };
  return {
    svg: svg([`  <g fill="#000">`, room(30, "A"), room(350, "B"), "  </g>"].join("\n"), 680, 410),
    data: "Two plans for a conference room, entrance in the top-right corner. Plan A: a podium (with the speaker's chair) top left and a whiteboard top centre; two tables with three chairs each along the left and right sides; one table with four chairs at the bottom centre; the morning tea table along the bottom wall. Total 10 seats. Plan B: morning tea in the top-left corner; the whiteboard top centre with the podium below it in the middle of the room; two tables on the left and right with six chairs each (three on each side); one table at the bottom with three chairs on each side. Total 18 seats.",
  };
};

// ── Day 74: average retirement age by sex, six countries, 2003 ──────────
FIG[74] = () => T({
  heading: "Average retirement age, 2003",
  head: ["Country", "Men\n(years)", "Men\n(months)", "Women\n(years)", "Women\n(months)"],
  rows: [["Australia", 64, 1, 63, 5], ["United States", 65, 6, 64, 2], ["Japan", 67, 4, 66, 9], ["Italy", 67, 4, 66, 9], ["France", 57, 4, 56, 9], ["Korea", 68, 8, 67, 2]],
  colW: [160, 100, 100, 100, 100],
});

// ── Day 75: Liverton Docks in 1980 and now ──────────────────────────────
FIG[75] = () => {
  const WATER = "#bfe0ef";
  const bank = (oy, h) => `    <rect x="30" y="${oy}" width="560" height="${h}" fill="#fff" stroke="#333" stroke-width="1.2"/>`;
  const then = [label(30, 52, "1980", { size: 13, bold: true, anchor: "start" }), bank(60, 70), `    <rect x="30" y="130" width="560" height="70" fill="${WATER}" stroke="#333"/>`, bank(200, 70),
    box(60, 75, 110, 40, "Warehouse"), label(240, 100, "Crane", { size: 11 }), box(310, 75, 110, 40, "Warehouse"), label(490, 100, "Crane", { size: 11 }),
    label(120, 162, "Ship", { size: 11 }), label(250, 162, "Ship", { size: 11 }), label(400, 162, "Ship", { size: 11 }), label(180, 186, "Ship", { size: 11 }), label(330, 186, "Ship", { size: 11 }),
    label(100, 240, "Crane", { size: 11 }), box(220, 215, 110, 40, "Warehouse"), label(450, 240, "to the coast →", { size: 11 }),
    label(625, 170, "← River", { size: 11 })];
  const now = [label(30, 302, "Now", { size: 13, bold: true, anchor: "start" }), bank(310, 70), `    <rect x="30" y="380" width="560" height="70" fill="${WATER}" stroke="#333"/>`, bank(450, 70),
    box(60, 322, 110, 44, "Education centre (1)", { size: 10.5 }), box(190, 322, 110, 44, "Sailing club (2)", { size: 10.5 }), box(320, 322, 120, 44, "Kids' playground", { size: 10.5 }),
    label(160, 420, "Ship Museum", { size: 12, bold: true }),
    box(470, 380, 18, 70, "Bridge", { size: 9, rot: true }), `    <rect x="500" y="380" width="12" height="70" fill="#5a6470" stroke="#333"/>`, label(520, 334, "Flood barrier", { size: 10.5 }), arrow(520, 340, 508, 378),
    `    <rect x="40" y="456" width="440" height="8" fill="#eee" stroke="#777"/>`, label(260, 463, "River walk", { size: 9 }),
    box(50, 470, 110, 40, "Hotel (1)", { size: 10.5 }), box(230, 470, 120, 40, "Apartments (2)", { size: 10.5 }), box(370, 470, 70, 40, "Parking", { size: 10.5 }), label(510, 495, "to the coast →", { size: 11 }),
    label(625, 420, "← River", { size: 11 }),
    label(310, 545, "(1) replaces an old building     (2) newly built", { size: 11 })];
  return {
    svg: svg([ARROW_DEFS, `  <g fill="#000">`, ...then, ...now, "  </g>"].join("\n"), 680, 560),
    data: "Two maps of Liverton Docks on a river that flows west, towards the coast in the east. 1980: a working dock — warehouses and cranes on both banks (two warehouses and two cranes on the north bank, one crane and one warehouse on the south bank) and several cargo ships on the river. Now: no warehouses, cranes or cargo ships. North bank: an education centre (replacing a warehouse), a new sailing club and a kids' playground. River: a ship museum, a new bridge and a flood barrier to the east. South bank: a river walk along the water, a hotel (replacing the crane area), new apartments and a car park.",
  };
};

// ── Day 76: opinions on a new theatre, club members and the public, 2012 ─
// (The source writes two cells in words — "sixty four%" and "ten%".)
FIG[76] = () => {
  const groups = [["Facilities", ["72%", "26%", "2%"], ["64%", "24%", "8%"]], ["Information", ["54%", "30%", "16%"], ["66%", "20%", "14%"]], ["Quality", ["88%", "10%", "2%"], ["53%", "40%", "7%"]]];
  const head = ["", "Excellent", "Satisfied", "Poor"];
  const rows = groups.flatMap(([g, a, b]) => [[`${g}: club members`, ...a], [`${g}: general public`, ...b]]);
  const t = table({ heading: "Opinions of club members and the general public on the new theatre, 2012", head, rows, colW: [240, 110, 110, 110] });
  return { svg: svg(t.body, t.width, t.height), data: "Table, % rating the new theatre. " + tableText(head, rows) };
};

// ── Day 77: Australian men and women in work by age group, 1984–2014 ────
FIG[77] = () => {
  const cats = ["1984", "2001", "2014"];
  const men = [{ label: "15–19", values: [62, 60, 52] }, { label: "35–44", values: [80, 80, 80] }, { label: "60–64", values: [40, 42, 62] }];
  const women = [{ label: "15–19", values: [60, 60, 60] }, { label: "35–44", values: [58, 70, 80] }, { label: "60–64", values: [10, 20, 42] }];
  const o = { cats, unit: "Percentage", max: 90, step: 10, height: 290 };
  return {
    svg: stack([{ body: barChart({ ...o, heading: "Men in employment by age group (%)", series: men }), height: 290 }, { body: barChart({ ...o, heading: "Women in employment by age group (%)", series: women }), height: 290 }]),
    data: "Two bar charts, % of Australian men and women in three age groups who were employed. Men: " + catText(cats, men, "%") + " Women: " + catText(cats, women, "%"),
  };
};

// ── Day 79: water use by sector in Sydney, 1997 and 2007 ────────────────
FIG[79] = () => {
  const keys = ["Building industry", "Household use", "Manufacturing", "Food industry", "Service industry"];
  const a = [5, 19, 15, 48, 13], b = [2, 21, 11, 41, 25];
  return {
    svg: svg([title("Percentage of total water use in Sydney", 340), keyedPie(175, 190, 95, "1997", a), keyedPie(505, 190, 95, "2007", b), pieKey(keys, 340)].join("\n"), 680, 410),
    data: "Two pie charts, % of total water use in Sydney by sector. 1997: " + keys.map((k, i) => `${k} ${a[i]}%`).join(", ") + ". 2007: " + keys.map((k, i) => `${k} ${b[i]}%`).join(", ") + ".",
  };
};

// ── Day 80: making soft cheese ──────────────────────────────────────────
FIG[80] = () => {
  const tank = (x, name, cond) => box(x, 150, 92, 58, name, { fill: "#f6f8f7", size: 11 }) + (cond ? label(x + 46, 228, cond, { size: 10.5 }) : "");
  const body = [ARROW_DEFS, title("Process for making soft cheese", 340), `  <g fill="#000">`,
    label(52, 70, "Water + milk", { size: 11 }), arrow(52, 78, 52, 146),
    tank(6, "Mixing", "(mixer)"), arrow(100, 179, 120, 179),
    tank(122, "Cooling", "5°C\n(2 hours)"), arrow(216, 179, 236, 179),
    label(226, 112, "Salt", { size: 11 }), arrow(226, 118, 226, 172),
    tank(238, "Fermentation", "37°C (6 hours)\nheated and mixed"), arrow(332, 179, 352, 179),
    tank(354, "Evaporation", "100°C\n(8 hours)"), arrow(400, 148, 400, 108), label(400, 100, "Steam", { size: 11 }),
    arrow(448, 179, 470, 179), box(472, 160, 46, 38, "Filter", { size: 10.5 }),
    arrow(495, 200, 495, 260), label(495, 276, "Waste water", { size: 11 }),
    arrow(520, 179, 546, 179),
    box(548, 120, 112, 118, "Soft cheese", { fill: "#fff7e0", size: 12 }), label(604, 110, "Cooling", { size: 11, bold: true }), label(604, 258, "5°C (8 hours)", { size: 10.5 }),
    label(340, 310, "The liquid becomes a thicker mixture at each stage.", { size: 11, fill: "#555" }),
    "  </g>"].join("\n");
  return {
    svg: svg(body, 680, 330),
    data: "Process diagram, making soft cheese: water and milk go into a tank and are mixed; the mixture is cooled to 5°C for 2 hours; salt is added; it ferments at 37°C for 6 hours while heated and mixed; evaporation at 100°C for 8 hours releases steam; it passes through a filter, which removes waste water; finally it is cooled at 5°C for 8 hours, giving soft cheese. The liquid turns into a thicker mixture along the way.",
  };
};

// ── Day 81: government spending on roads and transport, 1990–2005 (%) ───
FIG[81] = () => B({
  heading: "Percentage of government spending on roads and transport", unit: "Percentage", suffix: "%",
  cats: ["Italy", "Portugal", "UK", "USA"],
  series: [{ label: "1990", values: [20, 27, 11, 13.2] }, { label: "1995", values: [16, 20, 13, 12.2] }, { label: "2000", values: [12.5, 17.2, 6.5, 14.3] }, { label: "2005", values: [13.5, 15.8, 7.3, 12.5] }],
  max: 30, step: 5,
});

// ── Day 82: one building's ground floor, 1958 to now ────────────────────
FIG[82] = () => {
  const plan = (ox, years, use, rooms) => [label(ox + 100, 30, `${years}\n${use}`, { size: 11, bold: true, lh: 14 }),
    `    <rect x="${ox}" y="50" width="200" height="250" fill="#fff" stroke="#333" stroke-width="1.4"/>`, ...rooms.map(([x, y, w, h, t]) => box(ox + x, 50 + y, w, h, t, { size: 10 })),
    label(ox + 100, 318, "Entrance", { size: 11 })];
  const body = [`  <g fill="#000">`,
    ...plan(15, "1958–1984", "office", [[0, 0, 70, 75, "Meeting\nroom"], [130, 0, 70, 75, "Kitchen"], [0, 110, 65, 32, "Assistant's\noffice"], [0, 155, 65, 32, "Secretary's\noffice"], [130, 105, 70, 90, "Manager\noffice"], [0, 215, 65, 35, "Toilet"], [135, 215, 65, 35, "Reception\narea"]]),
    ...plan(240, "1985–2000", "apartment", [[0, 0, 70, 95, "Living\nroom"], [130, 0, 70, 75, "Kitchen"], [130, 105, 70, 65, "Bedroom 1"], [0, 155, 70, 95, "Bathroom\nand shower"], [130, 170, 70, 80, "Bedroom 2"]]),
    ...plan(465, "2001–present", "flower shop", [[0, 0, 65, 50, "Gift cards"], [130, 0, 70, 75, "Kitchen"], [130, 105, 70, 72, "Office"], [0, 180, 65, 70, "Play area"]]),
    label(510, 170, "Flowers", { size: 10.5 }), label(630, 260, "Flowers", { size: 10.5 }),
    "  </g>"].join("\n");
  return {
    svg: svg(body, 680, 330),
    data: "Three plans of the same ground floor, entrance at the bottom. 1958–1984, an office: meeting room top left, kitchen top right, assistant's and secretary's offices on the left, manager's office on the right, toilet bottom left, reception area bottom right. 1985–2000, an apartment: living room top left, kitchen top right, bedroom 1 and bedroom 2 on the right, bathroom and shower bottom left. 2001–present, a flower shop: gift cards top left, kitchen top right, an office on the right, a play area bottom left, and flowers on display down the left side and at the bottom right.",
  };
};

// ── Day 85: reservoir levels in six Australian cities, October 2009 and 2010
FIG[85] = () => B({
  heading: "Water levels in reservoirs (% of maximum)", unit: "Percentage", suffix: "%",
  cats: ["Darwin", "Sydney", "Melbourne", "Brisbane", "Perth", "Canberra"],
  series: [{ label: "Oct 2009", values: [45, 77, 22.5, 56.5, 39.5, 75.5] }, { label: "Oct 2010", values: [25, 80.5, 40, 56.5, 70, 99] }],
  max: 120, step: 20,
});

// ── Day 86: lawyers choosing jobs in different fields, 2001 and 2016 ─────
FIG[86] = () => T({
  heading: "Lawyers choosing jobs in different fields (%)",
  head: ["Field", "2001\nmale", "2001\nfemale", "2016\nmale", "2016\nfemale"],
  rows: [["Private lawyer", "15%", "17%", "19%", "21%"], ["Business", "14%", "14%", "14%", "21%"], ["Government", "45%", "41%", "38%", "42%"], ["Others", "26%", "28%", "29%", "16%"]],
  colW: [170, 100, 100, 100, 100],
});

// ── Day 87: global demand for textile fibres, 1980–2015 (million tons) ───
FIG[87] = () => L({
  heading: "Total fibre demand (million tons)", unit: "Million tons",
  xs: years(1980, 2015, 5),
  series: [
    { label: "Polyester", values: [5, 7.5, 12, 19.5, 33, 49, 58, 69] },
    { label: "Cotton", values: [14, 18, 18.5, 20, 25, 26.5, 28.5, 32] },
    { label: "Cellulosic", values: [2.5, 3, 3, 2.5, 3.5, 6, 7.5, 9] },
    { label: "Wool", values: [3, 3, 4, 4.8, 4, 2, 1.8, 1.5] },
  ],
  max: 80, step: 10,
});

// ── Day 90: businesses using social media, by size, 2012–2016 (%) ───────
FIG[90] = () => B({
  heading: "Businesses that have a social media presence (%)", unit: "Percentage", suffix: "%",
  cats: ["Small business", "Medium business", "Large business"],
  series: [{ label: "2012", values: [27, 32, 78] }, { label: "2013", values: [30, 48, 78] }, { label: "2014", values: [35, 49, 77] }, { label: "2015", values: [30, 30, 53] }, { label: "2016", values: [49, 53, 79] }],
  max: 90, step: 10,
});

// ── Day 91: Australia's workforce by place of birth, and unemployment ───
FIG[91] = () => {
  const keys = ["Born in Australia", "NESC (born in non-English-speaking countries)", "ESC (born in English-speaking countries other than Australia)"];
  const shares = [76, 14, 10];
  const xs = years(1993, 2003).map((y, i) => (i % 2 ? "" : y));
  const series = [
    { label: "NESC", values: [7.2, 6, 5.6, 5.1, 4.6, 3.2, 3.8, 3.1, 3.4, 3.4, 3.2] },
    { label: "Australia", values: [4, 3.3, 2.6, 3.1, 3.1, 2.9, 2.7, 2.3, 2.4, 2.1, 1.95] },
    { label: "ESC", values: [3.5, 3.1, 2.5, 2.75, 2.6, 2.5, 2.5, 1.75, 2.15, 1.75, 1.05] },
  ];
  const top = [title("Workforce in Australia by place of birth, 2003", 340), keyedPie(170, 150, 85, "", shares),
    ...keys.map((k, i) => `    <rect x="300" y="${105 + i * 26}" width="14" height="12" fill="${FILLS[i]}" stroke="#333" stroke-width="0.6"/><text x="322" y="${115 + i * 26}" font-size="11.5">${esc(k)}</text>`)].join("\n");
  return {
    svg: stack([{ body: top, height: 270 }, { body: lineGraph({ heading: "Unemployment in Australia by place of birth, 1993–2003", unit: "Percentage of group", xs, series, max: 8, step: 2, height: 330 }), height: 330 }], 680),
    data: `Pie chart, Australia's workforce by place of birth, 2003: born in Australia ${shares[0]}%, born in non-English-speaking countries (NESC) ${shares[1]}%, born in other English-speaking countries (ESC) ${shares[2]}%. Line graph, unemployment rate (% of each group). ` + seriesText(years(1993, 2003), series, "%"),
  };
};

// ── Day 92: an industrial area now and as a housing area in the future ──
// (The source misspells "Parking" and "Storage".)
FIG[92] = () => {
  const frame = (oy, head) => [label(70, oy + 120, head, { size: 12, bold: true, lh: 15 }),
    `    <rect x="150" y="${oy}" width="440" height="230" fill="#fff" stroke="#333" stroke-width="1.4"/>`,
    `    <rect x="185" y="${oy + 26}" width="370" height="178" fill="#fafafa" stroke="#333" stroke-width="1.2"/>`,
    label(370, oy + 18, "Main road", { size: 11, bold: true }), label(370, oy + 222, "Main road", { size: 11, bold: true }),
    `    <text x="168" y="${oy + 115}" font-size="10.5" font-weight="bold" text-anchor="middle" transform="rotate(-90 168 ${oy + 115})">Main road</text>`,
    `    <text x="572" y="${oy + 115}" font-size="10.5" font-weight="bold" text-anchor="middle" transform="rotate(-90 572 ${oy + 115})">Main road</text>`];
  const now = [...frame(20, "Now:\nindustrial area"),
    box(300, 46, 66, 46, "Entrance\nand\nreception", { size: 9.5 }), box(200, 90, 50, 32, "Parking", { size: 10 }), box(200, 140, 50, 40, "Storage", { size: 10 }),
    ...[0, 1, 2, 3].map((i) => box(262 + i * 46, 160, 46, 20, "Office", { size: 9 })), box(262, 180, 46, 20, "Office", { size: 9 }), box(308, 180, 46, 20, "Office", { size: 9 }), box(354, 180, 92, 20, "Canteen", { size: 9 }),
    box(485, 90, 55, 100, "Factory", { size: 10 })];
  const fut = [...frame(270, "Future:\narea for\nhouses"),
    box(200, 345, 50, 50, "3-bedroom\nhouse", { size: 8.5 }), box(200, 395, 50, 55, "4-bedroom\nhouse", { size: 8.5 }),
    ...[0, 1, 2].map((i) => box(268 + i * 58, 296, 58, 34, "2-bedroom\nhouse", { size: 8.5 })), box(268, 330, 174, 18, "Communal gardens", { size: 9, fill: "#eef5ee" }),
    box(290, 420, 120, 30, "Parking garages", { size: 9.5 }), box(470, 320, 60, 40, "Parking\narea", { size: 9 }), box(470, 360, 60, 80, "Apartments", { size: 9 })];
  const compass = `    <g font-size="11"><text x="650" y="40" text-anchor="middle">N</text><line x1="650" y1="46" x2="650" y2="110" stroke="#333"/><line x1="622" y1="78" x2="678" y2="78" stroke="#333"/><text x="616" y="82" text-anchor="end">W</text><text x="684" y="82">E</text><text x="650" y="124" text-anchor="middle">S</text></g>`;
  return {
    svg: svg([`  <g fill="#000">`, ...now, ...fut, compass, "  </g>"].join("\n"), 700, 520),
    data: "Two plans of an area surrounded by main roads. Now (industrial area): entrance and reception at the north; parking and storage on the west side; a block of six offices and a canteen in the centre-south; a factory on the east side. Future (area for houses): a 3-bedroom and a 4-bedroom house on the west side; three 2-bedroom houses along the north, with communal gardens in front of them; parking garages in the south centre; a parking area and an apartment block on the east side where the factory was.",
  };
};

// ── Day 93: Europeans of different ages going to a gym, 1990–2010 (%) ───
FIG[93] = () => {
  const series = [
    { label: "18–24", values: [7, 9, 11, 12.5, 13.5, 15, 17, 20, 25, 30, 33, 37, 42, 46, 49, 52, 58, 57, 51, 54, 58.5] },
    { label: "25–34", values: [8, 12, 15.5, 16, 17, 18.5, 20.5, 24, 28, 31, 32, 33.5, 35, 36, 37.5, 40, 42.5, 44, 45, 44.5, 49.5] },
    { label: "35–44", values: [4, 5.5, 7, 8, 9.5, 10.5, 11, 11.5, 12, 13.5, 15, 16.5, 19.5, 20.5, 21.5, 22.5, 23, 27, 31, 35.5, 39.5] },
    { label: "45 and over", values: [3, 3.5, 4, 4.5, 5, 6, 7.5, 7.5, 8, 9, 9, 10, 10, 10, 10, 10.5, 12, 13, 14.5, 18, 22.5] },
  ];
  return {
    svg: svg(lineGraph({ heading: "People going to a gym once a month or more, by age group, 1990–2010 (%)", unit: "Percentage", xs: years(1990, 2010).map((y, i) => (i % 4 ? "" : y)), series, max: 60, step: 10, markers: false })),
    data: "Line graph, % of each European age group going to a gym once a month or more. " + seriesText(years(1990, 2010), series, "%"),
  };
};

// ── Day 94: Pancha village in 2005 and 2015 ─────────────────────────────
FIG[94] = () => {
  const house = (x, y, extra = "") => `    <path d="M${x - 16},${y} L${x},${y - 10} L${x + 16},${y} Z" fill="#333"/><rect x="${x - 13}" y="${y}" width="26" height="14" fill="#cfcfcf" stroke="#333"/>` + extra;
  const aerial = (x, y) => `<path d="M${x + 16},${y + 2} l6,-8 m-3,4 l5,2" stroke="#333" stroke-width="1.2" fill="none"/>`;
  const dish = (x, y) => `<path d="M${x + 15},${y - 6} a6,6 0 0 0 8,8 z" fill="#777"/>`;
  const temple = (x, y, s = 1) => `    <path d="M${x - 18 * s},${y} L${x},${y - 10 * s} L${x + 18 * s},${y} Z" fill="#c0392b"/><rect x="${x - 13 * s}" y="${y}" width="${26 * s}" height="${14 * s}" fill="#7a3b2e"/>`;
  const stall = (x, y) => `<rect x="${x}" y="${y}" width="12" height="12" fill="#555"/>`;
  const map = (ox, after) => {
    const g = [`    <rect x="${ox}" y="40" width="310" height="330" fill="#fff" stroke="#333" stroke-width="1.4"/>`,
      `    <path d="M${ox + 205},262 C${ox + 250},256 ${ox + 290},266 ${ox + 310},262 L${ox + 310},370 L${ox + 160},370 C${ox + 160},330 ${ox + 175},280 ${ox + 205},262 Z" fill="#f4efe6" stroke="#999"/>`,
      label(ox + 255, 330, "Pagoda", { size: 12, bold: true })];
    if (!after) {
      g.push(`    <path d="M${ox + 95},40 C${ox + 110},150 ${ox + 100},260 ${ox + 140},370" fill="none" stroke="#333" stroke-width="1"/><path d="M${ox + 110},40 C${ox + 125},150 ${ox + 115},260 ${ox + 155},370" fill="none" stroke="#333" stroke-width="1"/>`);
      g.push(label(ox + 125, 130, "path", { size: 9.5, fill: "#555" }));
      [70, 105, 140, 175, 210].forEach((y, i) => g.push(house(ox + 40, y, i < 4 ? aerial(ox + 40, y) : "")));
      [170, 200, 230].forEach((y, i) => g.push(house(ox + 180, y, i < 2 ? aerial(ox + 180, y) : "")));
      g.push(`    ${[[0, 0], [16, 0], [4, 16], [22, 22], [8, 32]].map(([a, b]) => stall(ox + 25 + a, 270 + b)).join("")}`, label(ox + 70, 300, "Market", { size: 11, bold: true, anchor: "start" }));
      g.push(box(ox + 200, 46, 104, 80, "", { fill: "#fff" }), label(ox + 252, 92, "Primary\nschool", { size: 11, bold: true }));
      g.push(temple(ox + 235, 292), temple(ox + 210, 335, 1.2));
    } else {
      g.push(`    <path d="M${ox + 120},40 C${ox + 135},150 ${ox + 125},260 ${ox + 165},370 L${ox + 205},370 C${ox + 165},260 ${ox + 175},150 ${ox + 160},40 Z" fill="#333"/>`);
      g.push(`    <path d="M${ox + 140},44 C${ox + 154},150 ${ox + 146},260 ${ox + 185},368" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 6"/>`, label(ox + 105, 60, "road", { size: 9.5, fill: "#555" }));
      g.push(`    <path d="M${ox + 105},40 C${ox + 120},150 ${ox + 110},260 ${ox + 150},370" fill="none" stroke="#777" stroke-dasharray="3 3"/>`);
      [70, 105, 140, 175, 210].forEach((y, i) => g.push(house(ox + 40, y, i < 4 ? dish(ox + 40, y) : "")));
      g.push(house(ox + 225, 190, dish(ox + 225, 190)));
      g.push(`    ${[0, 1, 2, 3].flatMap((a) => [0, 1].map((b) => stall(ox + 18 + a * 15, 250 + b * 15))).join("")}`, label(ox + 85, 268, "Market", { size: 11, bold: true, anchor: "start" }));
      g.push(`    <path d="M${ox + 30},345 L${ox + 38},300 L${ox + 46},345 M${ox + 55},345 L${ox + 63},300 L${ox + 71},345" fill="none" stroke="#333" stroke-width="1.5"/>`, label(ox + 50, 362, "towers", { size: 9.5, fill: "#555" }));
      g.push(box(ox + 200, 46, 104, 80, "", { fill: "#fff" }), label(ox + 252, 82, "Primary and\nsecondary\nschool", { size: 10.5, bold: true }));
      g.push(`    <rect x="${ox + 205}" y="215" width="28" height="16" fill="none" stroke="#333" stroke-dasharray="3 2"/><rect x="${ox + 245}" y="232" width="28" height="16" fill="none" stroke="#333" stroke-dasharray="3 2"/>`);
      g.push(temple(ox + 235, 292), temple(ox + 282, 284, 0.8), temple(ox + 220, 345));
    }
    g.push(label(ox + 155, 392, after ? "2015" : "2005", { size: 13, bold: true }));
    return g.join("\n");
  };
  return {
    svg: svg([`  <g fill="#000">`, map(20, false), map(350, true), "  </g>"].join("\n"), 680, 405),
    data: "Two maps of Pancha village. 2005: a narrow path runs north–south through the village; a row of five houses on the west side (four with TV aerials) and three houses in the centre; a small market of scattered stalls in the south-west; a primary school (two buildings) in the north-east; a pagoda with two temples in the south-east. 2015: the path has become a wide paved road with traffic, fenced on its west side; the five western houses now have satellite dishes; the market has more stalls in neat rows; two communication towers stand in the south-west; the school has grown into a primary and secondary school; only one house remains in the centre, and two plots there are marked out (dashed) for new buildings; the pagoda now has three temples.",
  };
};

// ── Days that already showed their real chart, under another site's
// watermark: redrawn the same way, so every day has a clean picture. ────

// ── Day 13: class sizes in primary schools, four Australian states, 2010 ─
// (The source key misspells "students" three times.)
FIG[13] = () => {
  const keys = ["20 students or fewer", "21–25 students", "26–30 students", "More than 30 students"];
  const states = [["New South Wales", [26, 37, 33, 4]], ["South Australia", [36, 33, 28, 4]], ["Australian Capital Territory", [38, 51, 10, 1]], ["Western Australia", [26, 42, 27, 5]]];
  const pos = [[170, 160], [510, 160], [170, 400], [510, 400]];
  return {
    svg: svg([title("Class sizes in primary schools in four Australian states, 2010", 340), ...states.map(([n, v], i) => keyedPie(pos[i][0], pos[i][1], 72, n, v)), pieKey(keys, 510)].join("\n"), 680, 560),
    data: "Four pie charts, % of primary school classes by size, 2010 (20 or fewer / 21–25 / 26–30 / more than 30). " + states.map(([n, v]) => `${n}: ${v.join("% / ")}%`).join("; ") + ".",
  };
};

// ── Day 23: salaries of five UK professions, and their working hours ────
FIG[23] = () => {
  const cats = ["Police", "Nurse", "Teacher", "Firefighter", "Underground\ndriver"];
  const series = [{ label: "Salary when started", values: [23000, 15500, 32500, 40500, 49000] }, { label: "Salary after three years", values: [23500, 18500, 34500, 43000, 51500] }];
  const head = ["Profession", "Average working\nhours per week"];
  const rows = [["Police", 40], ["Nurse", 38], ["Teacher", 55], ["Firefighter", 55], ["Underground driver", 36]];
  const t = table({ head, rows, colW: [180, 150] });
  return {
    svg: stack([{ body: barChart({ heading: "Salaries of five professions in the UK (£)", unit: "Salary (£)", cats, series, max: 60000, step: 10000, height: 330 }), height: 330 }, { body: `  <g transform="translate(${(660 - t.width) / 2},0)">\n${t.body}\n  </g>`, height: t.height }]),
    data: "Bar chart, salaries in pounds (when started / after three years). " + catText(cats, series) + " Table, average working hours per week: " + rows.map(([p, h]) => `${p} ${h}`).join(", ") + ".",
  };
};

// ── Day 25: UK spending on three categories by age group, 2004 (%) ──────
FIG[25] = () => B({
  heading: "Spending on three categories by age group, UK 2004 (% of total spending)", unit: "% of total spending", suffix: "%",
  cats: ["Under 30", "31–45", "46–60", "61–75", "76+"],
  series: [{ label: "Food and drink", values: [6, 13, 17, 20, 23] }, { label: "Restaurants and hotels", values: [14, 12, 12, 2, 7] }, { label: "Entertainment", values: [7, 8, 14, 23, 13] }],
  max: 25, step: 5,
});

// ── Day 26: the design plan for a new town ──────────────────────────────
FIG[26] = () => {
  const H = (x, y, w = 40, h = 34) => box(x, y, w, h, "H", { size: 12 });
  const hatch = (x, y, w, h, t) => `    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#hatch)" stroke="#333"/>` + label(x + w / 2, y + h / 2 + 4, t, { size: 12, bold: true });
  const rec = (x, y) => `    <rect x="${x}" y="${y}" width="14" height="18" fill="#7fb8a6" stroke="#333"/>`;
  const body = [`  <defs><pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke="#aaa" stroke-width="2"/></pattern></defs>`,
    title("Design plan for a new town", 260), `  <g fill="#000">`,
    `    <rect x="30" y="40" width="460" height="460" fill="#fff" stroke="#333" stroke-width="1.4"/>`,
    stroke("M30,40 L490,500", { dash: "6 4" }), stroke("M490,40 L30,500", { dash: "6 4" }),
    `    <rect x="242" y="40" width="36" height="460" fill="#eee" stroke="#333"/>`, `    <rect x="30" y="252" width="460" height="36" fill="#eee" stroke="#333"/>`,
    `    <ellipse cx="260" cy="270" rx="150" ry="170" fill="none" stroke="#333" stroke-dasharray="6 4"/><ellipse cx="260" cy="270" rx="120" ry="140" fill="none" stroke="#333" stroke-dasharray="6 4"/>`,
    label(260, 116, "Ring road", { size: 10 }), label(260, 210, "R", { size: 11 }), label(200, 270, "R", { size: 11 }),
    hatch(110, 50, 110, 50, "Industry"), hatch(300, 430, 120, 60, "Industry"),
    H(50, 120), H(50, 190), H(160, 140), H(190, 200), H(300, 140), H(330, 200), H(410, 120, 45, 70), H(420, 200, 45, 60), H(300, 60), H(360, 55),
    H(50, 310), H(60, 380), H(170, 305), H(310, 320), H(170, 430), H(220, 450, 30, 34),
    label(225, 238, "B", { size: 12, bold: true }), label(300, 238, "P", { size: 12, bold: true }), label(300, 310, "B", { size: 12, bold: true }), label(222, 310, "P", { size: 12, bold: true }),
    rec(340, 240), rec(250, 320), rec(250, 345), rec(250, 370), rec(250, 410),
    "  </g>",
    `  <g font-size="12"><text x="510" y="150">H = Housing</text><text x="510" y="170">R = Roads</text><text x="510" y="190">Ring road (dashed)</text><rect x="510" y="200" width="14" height="10" fill="url(#hatch)" stroke="#333"/><text x="530" y="210">Industry</text><text x="510" y="230">P = Parking</text><text x="510" y="250">B = Bus stand</text><rect x="510" y="260" width="14" height="10" fill="#7fb8a6" stroke="#333"/><text x="530" y="270">Recreational area</text>`,
    `    <text x="580" y="400" text-anchor="middle">N</text><line x1="580" y1="406" x2="580" y2="460" stroke="#333"/><line x1="553" y1="433" x2="607" y2="433" stroke="#333"/><text x="545" y="437" text-anchor="end">W</text><text x="613" y="437">E</text><text x="580" y="474" text-anchor="middle">S</text></g>`].join("\n");
  return {
    svg: svg(body, 660, 510),
    data: "Plan of a proposed town. Two main roads cross at the centre, dividing the town into four quarters, with two diagonal roads running from the corners and two ring roads circling the centre. Housing (H) is spread through all four quarters, both inside and outside the ring roads. Industry is in two areas on the edge: one at the top (north-west) and one in the bottom right (south-east). Bus stands (B) and parking (P) are beside the central crossroads. Recreational areas are close to the centre, mainly south of it along the north–south road, with one to the east.",
  };
};

// ── Day 27: ages of UK visitors to Spain, 1983 and 2003 ─────────────────
// (The source key says "34 - 54"; the groups run 25–34, then 35–54.)
FIG[27] = () => {
  const keys = ["0–15 years", "16–24 years", "25–34 years", "35–54 years", "55+ years"];
  const a = [10, 4, 20, 50, 16], b = [12, 15, 12, 35, 26];
  return {
    svg: svg([title("Age of visitors from the UK to Spain", 340), keyedPie(175, 190, 100, "1983", a), keyedPie(505, 190, 100, "2003", b), pieKey(keys, 345)].join("\n"), 680, 410),
    data: "Two pie charts, % of UK visitors to Spain by age group. 1983: " + keys.map((k, i) => `${k} ${a[i]}%`).join(", ") + ". 2003: " + keys.map((k, i) => `${k} ${b[i]}%`).join(", ") + ".",
  };
};

// ── Day 31: typical Japanese and American offices ───────────────────────
FIG[31] = () => {
  const chair = (x, y) => `<circle cx="${x}" cy="${y}" r="7" fill="#fff" stroke="#111" stroke-width="2"/>`;
  const jp = [`    <rect x="20" y="50" width="310" height="300" fill="#fff" stroke="#333" stroke-width="1.6"/>`, label(175, 44, "Windows", { size: 10.5 }),
    "    " + chair(175, 72), box(120, 82, 110, 26, "Department manager", { size: 10 })];
  [40, 180].forEach((ox) => {
    jp.push("    " + chair(ox + 55, 135), box(ox, 145, 110, 24, "Section manager", { size: 10 }));
    for (let r = 0; r < 3; r++) jp.push(box(ox, 169 + r * 34, 55, 34, ""), box(ox + 55, 169 + r * 34, 55, 34, ""), "    " + chair(ox - 12, 186 + r * 34) + chair(ox + 122, 186 + r * 34));
  });
  jp.push(label(175, 375, "Typical Japanese office", { size: 12, bold: true }));
  const us = [`    <rect x="350" y="50" width="320" height="300" fill="#fff" stroke="#333" stroke-width="1.6"/>`,
    `    <text x="345" y="200" font-size="10.5" text-anchor="middle" transform="rotate(-90 345 200)">Windows</text>`, `    <text x="680" y="200" font-size="10.5" text-anchor="middle" transform="rotate(-90 680 200)">Windows</text>`,
    ...["Copier", "Storage", "Conference\nroom", "Conference\nroom"].map((t, i) => box(352, 52 + i * 74, 80, 74, t, { size: 10.5 })),
    ...[0, 1, 2, 3, 4].flatMap((r) => [0, 1].map((c) => box(448 + c * 55, 60 + r * 57, 42, 42, "") + "    " + chair(469 + c * 55, 88 + r * 57))),
    box(570, 52, 98, 80, "Section\nmanager", { size: 10.5 }), box(570, 132, 98, 80, "Section\nmanager", { size: 10.5 }), box(570, 212, 98, 136, "Department\nmanager", { size: 10.5 }),
    label(510, 375, "Typical American office", { size: 12, bold: true })];
  return {
    svg: svg([`  <g fill="#000">`, ...jp, ...us, "  </g>"].join("\n"), 690, 390),
    data: "Two office plans. Typical Japanese office: one open room with windows along the top; the department manager's desk at the front facing the room; two groups of six desks pushed together, each with a section manager's desk at its head and three staff on each side, so everyone works together in the open. Typical American office: closed rooms along the left wall (copier room, storage room, two conference rooms); ten separate cubicles, each with one chair, in two columns in the middle; private offices on the right for two section managers and a larger one for the department manager; windows on the left and right walls.",
  };
};

// ── Day 39: water used and income from six products, 2004 ──────────────
FIG[39] = () => {
  const keys = ["Vegetables", "Cereal", "Lime", "Fruits", "Rice", "Dandelion"];
  const a = [46, 12, 8, 28, 3, 3], b = [31, 12, 8, 40, 1, 8];
  return {
    svg: svg([title("Water used for six products, and the income from them, 2004", 340), keyedPie(175, 190, 95, "Water used (%)", a), keyedPie(505, 190, 95, "Total income (%)", b), pieKey(keys, 340)].join("\n"), 680, 410),
    data: "Two pie charts, 2004. % of water used: " + keys.map((k, i) => `${k} ${a[i]}%`).join(", ") + ". % of total income: " + keys.map((k, i) => `${k} ${b[i]}%`).join(", ") + ".",
  };
};

// ── Day 40: UK people eating five portions a day, 2001–2008 (%) ─────────
FIG[40] = () => B({
  heading: "People eating five portions of fruit and vegetables per day (%)", unit: "Percentage", suffix: "%",
  cats: years(2001, 2008),
  series: [{ label: "Men", values: [18, 19, 18, 21, 25, 27, 26, 25] }, { label: "Women", values: [22, 24.5, 27.5, 30, 33, 36.5, 32.5, 30] }, { label: "Children", values: [13.5, 14, 13.5, 26, 28.5, 22.5, 25, 23.5] }],
  max: 40, step: 10,
});

// ── Day 43: male and female workers by sector, countries A and B (%) ────
// (The source labels women in services in country B 49%; the slices and the
// model essay give 88%.)
FIG[43] = () => {
  const keys = ["Industry", "Agriculture", "Services"];
  const groups = [["Male workers, country A", [15, 29, 56]], ["Female workers, country A", [8, 43, 49]], ["Male workers, country B", [32, 3, 65]], ["Female workers, country B", [11, 1, 88]]];
  const pos = [[170, 120], [510, 120], [170, 355], [510, 355]];
  return {
    svg: svg([...groups.map(([n, v], i) => keyedPie(pos[i][0], pos[i][1], 72, n, v)), pieKey(keys, 465)].join("\n"), 680, 520),
    data: "Four pie charts, % of workers by sector (industry / agriculture / services). " + groups.map(([n, v]) => `${n}: ${v.join("% / ")}%`).join("; ") + ".",
  };
};

// ── Day 50: tourists at an Australian holiday resort ────────────────────
FIG[50] = () => {
  const keys = ["Asia", "Europe", "US", "Other"];
  const shares = [10, 37, 35, 18];
  const head = ["", "Asian\ntourists", "European\ntourists", "American\ntourists", "Tourists from\nother regions"];
  const rows = [["Average length\nof stay", "7 days", "16 days", "14 days", "10 days"], ["Most popular\naccommodation", "5-star hotel", "Camping or\ncaravan", "4-star hotel", "Camping or\ncaravan"], ["Main activity", "Sightseeing", "Swimming/\nsunbathing", "Sightseeing", "Surfing"]];
  const t = table({ head, rows, colW: [130, 110, 130, 110, 130] });
  const top = [title("Tourists by region of origin (%)", 340), keyedPie(260, 150, 95, "", shares), ...keys.map((k, i) => `    <rect x="400" y="${90 + i * 24}" width="14" height="12" fill="${FILLS[i]}" stroke="#333" stroke-width="0.6"/><text x="422" y="${100 + i * 24}" font-size="12">${esc(k)}</text>`)].join("\n");
  return {
    svg: stack([{ body: top, height: 270 }, { body: `  <g transform="translate(${(680 - t.width) / 2},0)">\n${t.body}\n  </g>`, height: t.height }], 680),
    data: `Pie chart, tourists at the resort by region of origin: Asia ${shares[0]}%, Europe ${shares[1]}%, US ${shares[2]}%, other ${shares[3]}%. Table: ` + tableText(head, rows),
  };
};

// ── Day 52: the cost of water in five Australian cities ─────────────────
// (The source headings say "Usage change"; it is the usage charge.)
FIG[52] = () => T({
  heading: "The cost of water in five Australian cities",
  head: ["City", "Usage charge\nper kilolitre\n(up to 125 kL)", "Usage charge\nper kilolitre\n(over 125 kL)", "Average bill\nper household"],
  rows: [["Adelaide", "$0.42", "$1.00", "$312"], ["Brisbane", "$0.81", "$0.84", "$310"], ["Melbourne", "$0.78", "$0.78", "$253"], ["Perth", "$0.42", "$1.50", "$332"], ["Sydney", "$0.98", "$0.98", "$319"]],
  colW: [140, 150, 150, 140],
});

// ── Day 56: workers absent through illness, five countries, 1991–2001 ───
FIG[56] = () => L({
  heading: "Workers absent for a day or more through illness (%)", unit: "Percentage of workers", suffix: "%",
  xs: years(1991, 2001),
  series: [
    { label: "Netherlands", values: [4.8, 5.55, 5.4, 5.1, 4.8, 4.2, 4.7, 4.9, 5.05, 5.25, 5.4] },
    { label: "France", values: [5.05, 5.15, 4.15, 4.05, 3.6, 3.2, 3.15, 3.12, 3.1, 3.08, 3.05] },
    { label: "Sweden", values: [3, 3.18, 3, 3.15, 3, 3.25, 3.6, 3.95, 4.4, 4.55, 4.63] },
    { label: "UK", values: [2.12, 2.25, 2.37, 2.25, 2.37, 2.18, 2.37, 2.25, 2.32, 2.18, 2.37] },
    { label: "Germany", values: [1.87, 1.78, 1.7, 1.78, 1.7, 1.78, 1.7, 1.82, 1.7, 1.78, 1.7] },
  ],
  max: 6, step: 1,
});

// ── Day 83: tourists' transport in one country, 1989–2009 (%) ───────────
FIG[83] = () => L({
  heading: "Tourists who used different types of transport in a particular country, 1989–2009 (%)", unit: "% of tourists", suffix: "%",
  xs: years(1989, 2009, 5),
  series: [
    { label: "Car", values: [48, 56, 62, 57, 51.5] }, { label: "Rail", values: [34, 38, 45, 52, 58] }, { label: "Air", values: [38, 31.5, 28, 24.5, 21.5] },
    { label: "Coach", values: [8, 12, 15, 22, 25.5] }, { label: "Ferry", values: [3, 7, 8, 12, 8] },
  ],
  max: 70, step: 10,
});

// ── Day 84: producing smoked fish ───────────────────────────────────────
FIG[84] = () => {
  const rows = [
    ["Caught in\na net", "Brought in\nby boat", "Landed\nat port", "Frozen"],
    ["Washed in\nfresh water", "Cut open", "Soaked in salt water\n+ yellow colouring", "Smoked"],
    ["Packed\nin boxes", "Frozen\nat 0°C", "Cold store", "Distribution", "Fish store"],
  ];
  const out = [ARROW_DEFS, title("Producing smoked fish", 340), `  <g fill="#000">`];
  const W = 120, Hh = 50, gap = 36;
  const xs = (n, w = W, g = gap) => { const total = n * w + (n - 1) * g; const x0 = (680 - total) / 2; return Array.from({ length: n }, (_, i) => x0 + i * (w + g)); };
  rows.forEach((r, ri) => {
    const w = ri === 2 ? 110 : W, g = ri === 2 ? 20 : gap;
    const y = 50 + ri * 110, X = xs(r.length, w, g);
    // Row 2 runs right to left, like the source.
    const order = ri === 1 ? [...r].reverse() : r;
    order.forEach((t, i) => out.push(box(r1(X[i]), y, w, Hh, t, { fill: "#f6f8f7", size: 10.5 })));
    for (let i = 0; i < r.length - 1; i++) out.push(ri === 1 ? arrow(r1(X[i + 1] - 2), y + 25, r1(X[i] + w + 2), y + 25) : arrow(r1(X[i] + w + 2), y + 25, r1(X[i + 1] - 2), y + 25));
  });
  const X0 = xs(4), X2 = xs(5, 110, 20);
  out.push(label(r1(X0[3] + W / 2 + 8), 134, "Thawed", { size: 10.5, fill: "#333", anchor: "start" }), arrow(r1(X0[3] + W / 2), 102, r1(X0[3] + W / 2), 158));
  out.push(stroke(`M${r1(X0[0] + W / 2)},212 L${r1(X0[0] + W / 2)},238 L${r1(X2[0] + 55)},238`), arrow(r1(X2[0] + 55), 238, r1(X2[0] + 55), 268));
  out.push("  </g>");
  return {
    svg: svg(out.join("\n"), 680, 340),
    data: "Process diagram, producing smoked fish: fish are caught in a net, brought in by boat and landed at the port, then frozen; later they are thawed, washed in fresh water, cut open, soaked in salt water with yellow colouring, and smoked; the smoked fish are packed in boxes, frozen at 0°C, kept in a cold store, then distributed by lorry to fish stores.",
  };
};

// ── Day 88: a bus company's punctuality and complaints, 1999–2003 ───────
FIG[88] = () => {
  const cats = years(1999, 2003);
  const onTime = [{ label: "Actual", values: [85, 82.3, 84.4, 84.2, 85] }, { label: "Target", values: [86, 86, 85, 85, 84.6] }];
  const complaints = [{ label: "Complaints", values: [71, 104, 94, 112, 124] }];
  return {
    svg: stack([
      { body: barChart({ heading: "Services arriving on time, actual and target (%)", unit: "Percentage", cats, series: onTime, min: 80, max: 87, step: 1, height: 300 }), height: 300 },
      { body: barChart({ heading: "Number of complaints (per thousand passenger journeys)", unit: "Complaints", cats, series: complaints, max: 140, step: 20, height: 280 }), height: 280 },
    ]),
    data: "Bar chart, % of services arriving on time (actual / target): " + cats.map((c, i) => `${c} ${onTime[0].values[i]}% / ${onTime[1].values[i]}%`).join("; ") + ". Bar chart, complaints per thousand passenger journeys: " + cats.map((c, i) => `${c} ${complaints[0].values[i]}`).join(", ") + ". The target was met only in 2003.",
  };
};

// ── Day 89: the world's top three producers of four dairy products, 2012 ─
// (In the source the four groups are drawn to different scales; here each
// keeps its own axis.)
FIG[89] = () => {
  const groups = [["Milk", ["EU", "India", "United States"], [142970, 127000, 90038], 160000, 40000], ["Cheese", ["EU", "United States", "Brazil"], [7120, 4925, 700], 8000, 2000],
    ["Butter", ["India", "EU", "United States"], [7500, 2040, 810], 8000, 2000], ["Milk powder", ["China", "New Zealand", "EU"], [1200, 1110, 770], 1400, 200]];
  const parts = groups.map(([name, cats, v, max, step]) => ({ body: hBarChart({ heading: name, cats, series: [{ label: name, values: v }], max, step, height: 150, labelW: 140, labels: true }), height: 150 }));
  const note = { body: label(340, 18, "Figures in MT (metric tons; 1 MT = 1,000 kg). EU = European Union.", { size: 11, fill: "#555" }), height: 30 };
  return {
    svg: stack([{ body: title("Dairy production: top three world producers, 2012", 330), height: 30 }, ...parts, note], 660),
    data: "Four bar charts, dairy production by the top three producers, 2012 (metric tons, as shown). " + groups.map(([n, c, v]) => `${n}: ` + c.map((x, i) => `${x} ${v[i].toLocaleString("en-GB")}`).join(", ")).join("; ") + ".",
  };
};

// ── Run ─────────────────────────────────────────────────────────────────
// Task 1 wording is the real IELTS task and stays; only plain slips are
// fixed: the rubric glued to the first sentence ("2014.Summarise"), and a
// year that contradicts the chart.
const T1FIX = {
  51: (t) => t.replace("in 1970 and 2000", "in 1970 and 2020"),
};
const tidy = (t) => t.replace(/([^\n])\s*(Summarise the information)/, "$1\n\n$2");

const bank = JSON.parse(fs.readFileSync(BANK, "utf8"));
let n = 0;
for (const [day, make] of Object.entries(FIG)) {
  const { svg: s, data } = make();
  fs.writeFileSync(path.join(OUT, `day${day}.svg`), s);
  const d = bank.find((x) => x.day === +day);
  d.image = `/practice-img/writing/day${day}.svg`;
  d.t1 = tidy((T1FIX[day] || ((t) => t))(d.t1));
  d.data = data;
  n++;
}
fs.writeFileSync(BANK, JSON.stringify(bank, null, 1));
console.log(`${n} visuals drawn`);
