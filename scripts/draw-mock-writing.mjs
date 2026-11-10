// Draws the Task 1 visuals of Mock Tests 3–12 as clean SVGs, in the style of
// day1.svg / day2.svg (redrawn for Mocks 1–2 from the same data).
//
// Why: the extraction script (extract-writing-bank.mjs) kept the LARGEST image
// of each Word file, which for most days is the collection's logo, so these
// mocks showed a logo instead of the chart. The data below is read from each
// day's own chart in "0 - FULL ORDER/WORD"; the drawings are new, without the
// source site's watermark. Each figure also returns a plain-text description
// of its data, stored as `data` in writing-bank.json, so the AI marker can
// check a report's figures (it cannot see the picture).
//
//   node scripts/draw-mock-writing.mjs
import fs from "node:fs";
import path from "node:path";

const OUT = path.join(import.meta.dirname, "..", "public", "practice-img", "writing");
const BANK = path.join(import.meta.dirname, "..", "src", "practice", "writing-bank.json");
const W = 660, H = 420;
const INK = "#000", AXIS = "#333", GRID = "#eee", LABEL = "#555";
const SERIES = [
  { c: "#1d3a6b", dash: "" },
  { c: "#009472", dash: "7 4" },
  { c: "#c0392b", dash: "2 4" },
  { c: "#8e44ad", dash: "10 3 2 3" },
];
const FILLS = ["#1d3a6b", "#7fb8a6", "#c0392b", "#d8b26e", "#8e44ad", "#9aa5b1"];
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const svg = (body, w = W, h = H) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" font-family="Arial, sans-serif">\n  <rect width="${w}" height="${h}" fill="#ffffff"/>\n${body}\n</svg>\n`;
const title = (t, x = W / 2, y = 24) => `  <text x="${x}" y="${y}" text-anchor="middle" font-size="14" font-weight="bold" fill="${INK}">${esc(t)}</text>`;
const r1 = (n) => Math.round(n * 10) / 10;

// A legend row of line or box keys, centred.
function legend(items, y, kind = "line") {
  const widths = items.map((it) => 50 + it.label.length * 6.6);
  let x = (W - widths.reduce((a, b) => a + b, 0)) / 2;
  return items.map((it, i) => {
    const key = kind === "line"
      ? `<line x1="${r1(x)}" y1="${y}" x2="${r1(x + 26)}" y2="${y}" stroke="${it.c}" stroke-width="2.5"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""}/>`
      : `<rect x="${r1(x + 6)}" y="${y - 6}" width="14" height="12" fill="${it.c}" stroke="#333" stroke-width="0.6"/>`;
    const out = `    ${key}<text x="${r1(x + 31)}" y="${y + 4}" font-size="12" fill="${INK}">${esc(it.label)}</text>`;
    x += widths[i];
    return out;
  }).join("\n");
}

// Line graph. xs: category labels; series: [{label, values (null = no point)}].
function lineGraph({ heading, unit, xs, series, max, step, x0 = 70, x1 = 610, y0 = 350, y1 = 70, legendY = 44, markers = false }) {
  const X = (i) => x0 + (x1 - x0) * i / (xs.length - 1);
  const Y = (v) => y0 - (y0 - y1) * v / max;
  const grid = [];
  for (let v = 0; v <= max; v += step) {
    grid.push(`    ${v ? `<line x1="${x0}" y1="${r1(Y(v))}" x2="${x1}" y2="${r1(Y(v))}" stroke="${GRID}"/>` : ""}<text x="${x0 - 10}" y="${r1(Y(v) + 4)}" text-anchor="end">${v.toLocaleString("en-GB")}</text>`);
  }
  const lines = series.map((s, i) => {
    const st = SERIES[i];
    const pts = s.values.map((v, k) => (v == null ? null : `${r1(X(k))},${r1(Y(v))}`)).filter(Boolean).join(" ");
    const marks = markers ? s.values.map((v, k) => (v == null ? "" : `<circle cx="${r1(X(k))}" cy="${r1(Y(v))}" r="3" fill="${st.c}"/>`)).join("") : "";
    return `  <polyline points="${pts}" fill="none" stroke="${st.c}" stroke-width="2.5"${st.dash ? ` stroke-dasharray="${st.dash}"` : ""}/>${marks}`;
  });
  return [
    title(heading),
    `  <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 15}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <g font-size="11" fill="${LABEL}">\n${grid.join("\n")}\n  </g>`,
    `  <g font-size="11" fill="${LABEL}" text-anchor="middle">\n    ${xs.map((x, i) => `<text x="${r1(X(i))}" y="${y0 + 18}">${esc(x)}</text>`).join("")}\n  </g>`,
    unit ? `  <text x="${x0 - 50}" y="${(y0 + y1) / 2}" font-size="11" fill="${LABEL}" transform="rotate(-90 ${x0 - 50} ${(y0 + y1) / 2})" text-anchor="middle">${esc(unit)}</text>` : "",
    ...lines,
    `  <g>\n${legend(series.map((s, i) => ({ label: s.label, ...SERIES[i] })), legendY)}\n  </g>`,
  ].filter(Boolean).join("\n");
}

// Vertical grouped bar chart.
function barChart({ heading, unit, cats, series, max, step, x0 = 80, x1 = 620, y0 = 340, y1 = 70 }) {
  const Y = (v) => y0 - (y0 - y1) * v / max;
  const slot = (x1 - x0) / cats.length, bw = Math.min(26, (slot - 24) / series.length);
  const grid = [];
  for (let v = 0; v <= max; v += step) grid.push(`    ${v ? `<line x1="${x0}" y1="${r1(Y(v))}" x2="${x1}" y2="${r1(Y(v))}" stroke="${GRID}"/>` : ""}<text x="${x0 - 10}" y="${r1(Y(v) + 4)}" text-anchor="end">${v}</text>`);
  const bars = cats.map((c, i) => {
    const left = x0 + slot * i + (slot - bw * series.length) / 2;
    const rects = series.map((s, k) => `<rect x="${r1(left + bw * k)}" y="${r1(Y(s.values[i]))}" width="${r1(bw)}" height="${r1(y0 - Y(s.values[i]))}" fill="${FILLS[k]}" stroke="#333" stroke-width="0.6"/>`).join("");
    const words = c.split("\n");
    const lbl = words.map((w, j) => `<text x="${r1(x0 + slot * i + slot / 2)}" y="${y0 + 16 + j * 13}" text-anchor="middle">${esc(w)}</text>`).join("");
    return `    ${rects}${lbl}`;
  });
  return [
    title(heading),
    `  <g font-size="11" fill="${LABEL}">\n${grid.join("\n")}\n  </g>`,
    `  <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 15}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <g font-size="11" fill="${INK}">\n${bars.join("\n")}\n  </g>`,
    unit ? `  <text x="${x0 - 52}" y="${(y0 + y1) / 2}" font-size="11" fill="${LABEL}" transform="rotate(-90 ${x0 - 52} ${(y0 + y1) / 2})" text-anchor="middle">${esc(unit)}</text>` : "",
    `  <g>\n${legend(series.map((s, k) => ({ label: s.label, c: FILLS[k] })), 44, "box")}\n  </g>`,
  ].filter(Boolean).join("\n");
}

// Horizontal grouped bar chart.
function hBarChart({ heading, unit, cats, series, max, step, x0 = 130, x1 = 600, y0 = 70, y1 = 360 }) {
  const X = (v) => x0 + (x1 - x0) * v / max;
  const slot = (y1 - y0) / cats.length, bh = 15;
  const grid = [];
  for (let v = 0; v <= max; v += step) grid.push(`    <line x1="${r1(X(v))}" y1="${y0}" x2="${r1(X(v))}" y2="${y1}" stroke="${v ? GRID : AXIS}"${v ? "" : ' stroke-width="1.5"'}/><text x="${r1(X(v))}" y="${y1 + 16}" text-anchor="middle">${v}</text>`);
  const bars = cats.map((c, i) => {
    const top = y0 + slot * i + (slot - bh * series.length) / 2;
    const rects = series.map((s, k) => `<rect x="${x0}" y="${r1(top + bh * k)}" width="${r1(X(s.values[i]) - x0)}" height="${bh}" fill="${FILLS[k]}" stroke="#333" stroke-width="0.6"/>`).join("");
    return `    ${rects}<text x="${x0 - 10}" y="${r1(y0 + slot * i + slot / 2 + 4)}" text-anchor="end">${esc(c)}</text>`;
  });
  return [
    title(heading),
    `  <g font-size="11" fill="${LABEL}">\n${grid.join("\n")}\n  </g>`,
    `  <g font-size="12" fill="${INK}">\n${bars.join("\n")}\n  </g>`,
    unit ? `  <text x="${(x0 + x1) / 2}" y="${y1 + 36}" font-size="11" fill="${LABEL}" text-anchor="middle">${esc(unit)}</text>` : "",
    `  <g>\n${legend(series.map((s, k) => ({ label: s.label, c: FILLS[k] })), 44, "box")}\n  </g>`,
  ].filter(Boolean).join("\n");
}

// Pie chart with outside labels.
function pie({ cx, cy, r, slices, heading, hx }) {
  let a = -Math.PI / 2;
  const total = slices.reduce((s, x) => s + x.v, 0);
  const parts = slices.map((s, i) => {
    const da = 2 * Math.PI * s.v / total, b = a + da, mid = a + da / 2;
    const p = (ang, rr = r) => `${r1(cx + rr * Math.cos(ang))},${r1(cy + rr * Math.sin(ang))}`;
    const large = da > Math.PI ? 1 : 0;
    const lx = cx + (r + 16) * Math.cos(mid), ly = cy + (r + 16) * Math.sin(mid);
    const anchor = Math.cos(mid) > 0.15 ? "start" : Math.cos(mid) < -0.15 ? "end" : "middle";
    const out = `  <path d="M${cx},${cy} L${p(a)} A${r},${r} 0 ${large} 1 ${p(b)} Z" fill="${FILLS[i]}" stroke="#fff" stroke-width="1.5"/>\n  <text x="${r1(lx)}" y="${r1(ly + 4)}" text-anchor="${anchor}" font-size="11.5" fill="${INK}">${esc(s.label)}: ${s.v}%</text>`;
    a = b;
    return out;
  });
  return [heading ? `  <text x="${hx ?? cx}" y="${cy - r - 26}" text-anchor="middle" font-size="13" font-weight="bold" fill="${INK}">${esc(heading)}</text>` : "", ...parts].filter(Boolean).join("\n");
}

// Floor-plan / map helpers: a labelled box.
const room = (x, y, w, h, label, { fill = "#fff", size = 11, rot = false } = {}) => {
  const cx = x + w / 2, cy = y + h / 2;
  const lines = String(label).split("\n");
  const txt = lines.map((l, i) => `<text x="${r1(cx)}" y="${r1(cy + 4 + (i - (lines.length - 1) / 2) * (size + 2))}" text-anchor="middle" font-size="${size}"${rot ? ` transform="rotate(-90 ${r1(cx)} ${r1(cy)})"` : ""}>${esc(l)}</text>`).join("");
  return `    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="#333" stroke-width="1.2"/>${label ? txt : ""}`;
};

const FIG = {};

// ── Mock 3: theatre plans, 2010 and 2012 ──────────────────────────────
FIG[3] = () => {
  const plan = (ox, year, after) => {
    const g = [`  <text x="${ox + 130}" y="52" text-anchor="middle" font-size="14" font-weight="bold">${year}</text>`, `  <g fill="${INK}">`];
    if (!after) {
      g.push(room(ox, 70, 50, 70, "Storage", { size: 10 }));
      g.push(room(ox + 50, 70, 210, 50, "Dressing room"));
      g.push(room(ox + 50, 120, 210, 75, "Stage"));
      g.push(room(ox + 50, 195, 210, 140, "Auditorium", { fill: "#f2f2f2" }));
      g.push(room(ox + 50, 335, 70, 35, "Admin\noffice", { size: 10 }));
      g.push(room(ox + 50, 370, 70, 35, "Ticket\noffice", { size: 10 }));
      g.push(room(ox + 205, 370, 55, 35, "Café", { size: 10 }));
      g.push(`    <rect x="${ox + 120}" y="335" width="140" height="70" fill="none" stroke="#333" stroke-width="1.2"/><text x="${ox + 160}" y="370" text-anchor="middle" font-size="10">Foyer</text>`);
    } else {
      g.push(room(ox, 70, 50, 70, "Dressing\nroom", { size: 10 }));
      g.push(room(ox, 140, 50, 40, "Showers", { size: 10 }));
      g.push(room(ox + 50, 70, 210, 22, "Corridor", { size: 10 }));
      g.push(room(ox + 50, 92, 210, 103, "Stage"));
      g.push(room(ox + 260, 70, 34, 70, "Storage", { size: 10, rot: true }));
      g.push(room(ox + 50, 195, 210, 140, "Auditorium", { fill: "#f2f2f2" }));
      g.push(room(ox, 280, 50, 55, "Admin\noffice", { size: 10 }));
      g.push(room(ox, 335, 225, 70, "Restaurant", { fill: "#fafafa" }));
      g.push(room(ox + 225, 335, 35, 70, "Ticket\noffice", { size: 9 }));
    }
    g.push(`    <text x="${ox + 160}" y="420" text-anchor="middle" font-size="10">▲ Main door</text>`);
    g.push("  </g>");
    return g.join("\n");
  };
  return {
    svg: svg([title("A small theatre in 2010 and in 2012"), plan(30, "2010", false), plan(350, "2012", true)].join("\n"), 680, 430),
    data: "Plans of a theatre. 2010: storage room top left; dressing room behind the stage; stage; auditorium; at the front, beside the main door, an admin office, a ticket office and a small café, with a foyer. 2012: the dressing room has moved to the left of the stage and is smaller, with new showers beneath it; a corridor runs behind the stage, which has been enlarged backwards into the old dressing-room space; storage has moved to the top right; the auditorium is unchanged; the admin office has moved to the left side next to the auditorium; the café and foyer have been replaced by a large restaurant across the front; the ticket office has moved to the right of the main door.",
  };
};

// ── Mock 4: cinema attendance by age, 1984–2003 ───────────────────────
FIG[4] = () => {
  const xs = ["1984", "1987", "1990", "1993", "1996", "1999", "2003"];
  const series = [
    { label: "7–14", values: [10, 14, 12, 16, 19, 30, 38] },
    { label: "15–24", values: [16, 24, 27, 33, 44, 50, 52] },
    { label: "25–35", values: [4, 7, 9, 11, 15, 22, 32] },
    { label: "35 and over", values: [1, 2, 2, 3, 4, 6, 10] },
  ];
  return {
    svg: svg(lineGraph({ heading: "People going to the cinema once a month or more, by age group (%)", xs, series, max: 60, step: 10 })),
    data: "Line graph, % of each age group going to the cinema once a month or more. 7–14: " + series[0].values.map((v, i) => `${xs[i]} ${v}%`).join(", ") + ". 15–24: " + series[1].values.map((v, i) => `${xs[i]} ${v}%`).join(", ") + ". 25–35: " + series[2].values.map((v, i) => `${xs[i]} ${v}%`).join(", ") + ". 35 and over: " + series[3].values.map((v, i) => `${xs[i]} ${v}%`).join(", ") + ". 15–24 highest throughout; 35 and over lowest; all groups rose.",
  };
};

// ── Mock 5: higher education qualifications by sex, 2001 ─────────────
FIG[5] = () => {
  const cats = ["Japan", "United States", "Switzerland", "Britain", "Germany"];
  const series = [{ label: "Females", values: [25, 40, 35, 35, 45] }, { label: "Males", values: [30, 35, 45, 35, 35] }];
  return {
    svg: svg(hBarChart({ heading: "Adults with higher education qualifications, 2001 (%)", unit: "Percentage", cats, series, max: 50, step: 5 })),
    data: "Bar chart, % of males and females with higher education qualifications, 2001. " + cats.map((c, i) => `${c}: females ${series[0].values[i]}%, males ${series[1].values[i]}%`).join("; ") + ".",
  };
};

// ── Mock 6: pineapples, growing and products ─────────────────────────
FIG[6] = () => {
  const box = (x, y, w, h, t) => room(x, y, w, h, t, { fill: "#f6f8f7", size: 11 });
  const arrow = (x1, y1, x2, y2) => `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="1.4" marker-end="url(#ah)"/>`;
  const body = [
    `  <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#333"/></marker></defs>`,
    title("Growing pineapples and making pineapple products"),
    `  <text x="20" y="54" font-size="12" font-weight="bold">Stage 1: Growing (23–30°C)</text>`,
    `  <g fill="${INK}">`,
    box(20, 64, 120, 46, "Crown planted\n26 cm apart"),
    arrow(140, 87, 175, 87),
    box(175, 64, 120, 46, "Grows for\n7 months"),
    arrow(295, 87, 330, 87),
    box(330, 64, 140, 46, "Sprayed with\nethylene"),
    arrow(470, 87, 505, 87),
    box(505, 64, 135, 46, "5 months: fruit ready\n(30 cm, 2 kg)"),
    `    <text x="20" y="140" font-size="12" font-weight="bold">Stage 2: Processing</text>`,
    box(245, 150, 170, 40, "Harvested and washed"),
    arrow(330, 190, 120, 228), arrow(330, 190, 330, 228), arrow(330, 190, 540, 228),
    box(40, 228, 160, 40, "Top removed, peeled"), box(250, 228, 160, 40, "Top removed, peeled"), box(460, 228, 160, 40, "Coated with wax"),
    arrow(120, 268, 120, 290), arrow(330, 268, 330, 290), arrow(540, 268, 540, 290),
    box(40, 290, 160, 40, "Cut; put in extractor"), box(250, 290, 160, 40, "Sliced into rings\nand chunks"), box(460, 290, 160, 40, "Packed in crates"),
    arrow(120, 330, 120, 352), arrow(330, 330, 330, 352), arrow(540, 330, 540, 352),
    box(40, 352, 160, 40, "JUICE (cartons)"), box(250, 352, 160, 40, "CANNED FRUIT"), box(460, 352, 160, 40, "EXPORTED by ship"),
    "  </g>",
  ].join("\n");
  return {
    svg: svg(body, 660, 410),
    data: "Process diagram. Growing at 23–30°C: crowns planted 26 cm apart; plants grow for 7 months; sprayed with ethylene; fruit ready 5 months later, about 30 cm and 2 kg. Processing: fruit harvested and washed, then three routes: (1) top removed and peeled, cut and put in an extractor to make juice in cartons; (2) top removed and peeled, sliced into rings and chunks and canned; (3) coated with wax, packed in crates and exported by ship.",
  };
};

// ── Mock 7: migration to the UK (line graph + pie) ───────────────────
FIG[7] = () => {
  const xs = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008"];
  const series = [
    { label: "4 or more years", values: [150, 148, 148, 147, 147, 150, 150, 150, 150] },
    { label: "Up to 2 years", values: [150, 148, 175, 200, 250, 247, 250, 246, 250] },
    { label: "2 to 4 years", values: [60, 50, 60, 50, 58, 50, 58, 68, 100] },
  ];
  const graph = lineGraph({ heading: "Intended length of stay of immigrants to the UK, 2000–2008 (thousands)", xs, series, max: 300, step: 50, x0: 60, x1: 370, y0: 360, y1: 90, legendY: 52, markers: true });
  const pieBody = pie({ cx: 560, cy: 255, r: 62, heading: "Reasons for migration, 2008", slices: [
    { label: "Work", v: 38 }, { label: "Study", v: 32 }, { label: "Family", v: 16 }, { label: "Other", v: 7 }, { label: "No reason", v: 7 } ] });
  return {
    svg: svg([graph, pieBody].join("\n"), 710, 400),
    data: "Line graph, number of immigrants to the UK (thousands) by intended length of stay. 4 or more years: about 150 every year 2000–2008 (flat). Up to 2 years: 150 (2000), 148 (2001), 175 (2002), 200 (2003), 250 (2004), then about 250 to 2008. 2 to 4 years: 60 (2000), 50 (2001), 60, 50, 58, 50, 58 (2006), 68 (2007), 100 (2008). Pie chart, reasons for migration 2008: work 38%, study 32%, accompany/join family 16%, other 7%, no reason stated 7%.",
  };
};

// ── Mock 8: Japanese salaries and television prices, 1970–2000 ───────
FIG[8] = () => {
  const xs = ["1970", "1975", "1980", "1985", "1990", "1995", "2000"];
  const series = [
    { label: "Black and white TV price", values: [110, 65, 38, 33, 28, 23, 21] },
    { label: "Colour TV price", values: [null, null, 90, 65, 56, 51, 47] },
    { label: "Average monthly salary", values: [19, 20, 22, 23, 26, 33, 67] },
  ];
  return {
    svg: svg(lineGraph({ heading: "Average monthly salary and television prices in Japan, 1970–2000", unit: "Thousands of yen", xs, series, max: 120, step: 20, markers: true })),
    data: "Line graph, thousands of yen. Black and white TV price: 110 (1970), 65 (1975), 38 (1980), 33 (1985), 28 (1990), 23 (1995), 21 (2000). Colour TV price (first sold in the late 1970s): 90 (1980), 65 (1985), 56 (1990), 51 (1995), 47 (2000). Average monthly salary: 19 (1970), 20, 22 (1980), 23, 26 (1990), 33 (1995), 67 (2000). Salary overtook the black and white TV price between 1990 and 1995, and the colour TV price at the very end of the 1990s.",
  };
};

// ── Mock 9: one company's donations, 2012–2014 ───────────────────────
FIG[9] = () => {
  const cats = ["Social\nwelfare", "Education", "Environment", "Health", "Wildlife", "Arts"];
  const series = [
    { label: "2012", values: [22.3, 8.3, 8.3, 6, 3, 3] },
    { label: "2013", values: [18, 6, 5, 7.3, 4, 3] },
    { label: "2014", values: [24, 8.3, 6.7, 9.2, 5, 4] },
  ];
  return {
    svg: svg(barChart({ heading: "Donations by one company to six types of charity, 2012–2014", unit: "Thousands of dollars", cats, series, max: 30, step: 5 })),
    data: "Bar chart, thousands of dollars donated (2012 / 2013 / 2014). " + cats.map((c, i) => `${c.replace("\n", " ")}: ${series.map((s) => s.values[i]).join(" / ")}`).join("; ") + ".",
  };
};

// ── Mock 10: a small museum and its surroundings, 1990 and 2010 ──────
FIG[10] = () => {
  const EX = "#cfcfcf";
  const site = (ox, year, after) => {
    const g = [`  <text x="${ox + 140}" y="52" text-anchor="middle" font-size="14" font-weight="bold">${year}</text>`, `  <g fill="${INK}">`,
      `    <rect x="${ox}" y="62" width="280" height="320" fill="#fff" stroke="#333" stroke-width="1.2"/>`,
      room(ox, 62, 280, 34, "Garden", { fill: "#eef5ee" }),
      room(ox, 96, 50, 34, "Restaurant", { size: 9 }),
      room(ox, 130, 50, 100, "", { fill: EX }),
      room(ox + 50, 96, 50, 34, "", { fill: EX }),
      room(ox + 100, 96, 40, 50, "", { fill: EX }),
      `    <text x="${ox + 120}" y="${after ? 170 : 175}" text-anchor="middle" font-size="10" transform="rotate(-90 ${ox + 120} 172)">Entrance</text>`,
      room(ox + 50, 230, 120, 40, "Shop", { size: 10 }),
      room(ox, 380, 280, 22, "Main road", { fill: "#f0f0f0", size: 10 }),
    ];
    if (!after) {
      g.push(room(ox + 50, 130, 50, 100, "", { fill: "#fff" }));
      g.push(room(ox + 160, 96, 120, 174, "Car park", { fill: "#fafafa" }));
      g.push(room(ox + 10, 290, 120, 70, "Cottage", { size: 11 }));
      g.push(room(ox + 160, 290, 120, 90, "Garden", { fill: "#eef5ee" }));
    } else {
      g.push(room(ox + 50, 130, 50, 100, "", { fill: EX }));
      g.push(room(ox + 160, 96, 120, 174, "Car park", { fill: "#fafafa" }));
      g.push(room(ox + 10, 290, 120, 70, "Café", { size: 11 }));
      g.push(room(ox + 160, 290, 120, 90, "Car park", { fill: "#fafafa" }));
    }
    g.push("  </g>");
    return g.join("\n");
  };
  const key = `  <rect x="250" y="412" width="22" height="13" fill="${EX}" stroke="#333" stroke-width="0.8"/><text x="280" y="423" font-size="12">Exhibition rooms</text>`;
  return {
    svg: svg([title("A small museum and its surroundings, 1990 and 2010"), site(30, "1990", false), site(370, "2010", true), key].join("\n"), 680, 435),
    data: "Two maps of a museum site beside a main road. 1990: garden along the top; restaurant top left; exhibition rooms in an L-shape on the left and top, with an open area in the middle; entrance in the centre; shop below; car park on the right; a cottage at the front left; a second garden at the front right. 2010: the open area in the middle has become another exhibition room; the restaurant, entrance, shop, top garden and right-hand car park are unchanged; the cottage has become a café; the front garden has been replaced by a second car park.",
  };
};

// ── Mock 11: help with children, Australian mothers and fathers, 2013 ─
FIG[11] = () => {
  const cats = ["Dressing", "Homework", "Playing games", "Getting ready\nfor bed"];
  const series = [
    { label: "Mother", values: [70, 60, 24, 46] },
    { label: "Father", values: [20, 30, 70, 50] },
    { label: "Both", values: [5, 9, 6, 2] },
  ];
  return {
    svg: svg(barChart({ heading: "Who helped children with four activities, Australia, 2013 (%)", unit: "Percentage of time", cats, series, max: 100, step: 20 })),
    data: "Bar chart, % of time spent helping children (mother / father / both). " + cats.map((c, i) => `${c.replace("\n", " ")}: ${series.map((s) => s.values[i] + "%").join(" / ")}`).join("; ") + ".",
  };
};

// ── Mock 12: museum visitors through the day, summer and winter 2003 ──
FIG[12] = () => {
  const xs = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  const series = [
    { label: "Summer", values: [0, 650, 1300, 1500, 1300, 1150, 900, 800, 400, 0] },
    { label: "Winter", values: [0, 400, 350, 600, 400, 200, 0, 0, 0, 0] },
  ];
  return {
    svg: svg(lineGraph({ heading: "Average number of visitors to a museum by time of day, 2003", unit: "Visitors", xs, series, max: 1600, step: 200, markers: true })),
    data: "Line graph, average visitors by hour, 2003. Summer: 0 at 9:00, 650 at 10:00, 1,300 at 11:00, peak 1,500 at 12:00, 1,300 at 13:00, 1,150 at 14:00, 900 at 15:00, 800 at 16:00, 400 at 17:00, 0 at 18:00. Winter: 0 at 9:00, 400 at 10:00, 350 at 11:00, peak 600 at 12:00, 400 at 13:00, 200 at 14:00, 0 from 15:00 (the museum is empty in the afternoon).",
  };
};

// Task 1 wording as IELTS phrases it (the extracted text had typos, missing
// line breaks and, for day 4, no subject).
const RUBRIC = "\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.";
const T1 = {
  3: "The plans below show a small theatre in 2010 and the same theatre in 2012.",
  4: "The graph below shows the percentage of people in four age groups who went to the cinema once a month or more between 1984 and 2003.",
  5: "The chart below shows the percentages of males and females with higher education qualifications in five countries in 2001.",
  6: "The diagram below shows the process of growing pineapples and preparing pineapple products.",
  7: "The graph below shows how long people who moved to the UK between 2000 and 2008 intended to stay, and the pie chart shows their reasons for migrating in 2008.",
  8: "The graph below shows the average monthly salary in Japan from 1970 to 2000, and the prices of black and white televisions and colour televisions over the same period.",
  9: "The chart below shows the donations given to six different types of charity by one company from 2012 to 2014.",
  10: "The maps below show the changes made to a small museum and its surroundings between 1990 and 2010.",
  11: "The chart below compares the percentage of time Australian mothers and fathers spent helping their children with four activities in 2013.",
  12: "The graph below shows the average number of visitors to a museum at different times of the day in summer and in winter in 2003.",
};

const bank = JSON.parse(fs.readFileSync(BANK, "utf8"));
for (const [day, make] of Object.entries(FIG)) {
  const { svg: s, data } = make();
  fs.writeFileSync(path.join(OUT, `day${day}.svg`), s);
  const d = bank.find((x) => x.day === +day);
  d.image = `/practice-img/writing/day${day}.svg`;
  d.t1 = T1[day] + RUBRIC;
  d.data = data;
  console.log(`day${day}.svg`, s.length, "bytes");
}
fs.writeFileSync(BANK, JSON.stringify(bank, null, 1));
