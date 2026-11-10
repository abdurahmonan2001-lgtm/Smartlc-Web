// Drawing helpers for the Writing Task 1 redraws of days 13–94
// (draw-writing-days.mjs), in the style of draw-mock-writing.mjs (mocks 3–12):
// white background, Arial, navy / green / red / sand series, light grid.
// Plain SVG strings, no dependencies. Each chart helper also returns the plain
// text the AI marker gets instead of the picture.
export const INK = "#000", AXIS = "#333", GRID = "#eee", LABEL = "#555";
export const SERIES = [
  { c: "#1d3a6b", dash: "" },
  { c: "#009472", dash: "7 4" },
  { c: "#c0392b", dash: "2 4" },
  { c: "#8e44ad", dash: "10 3 2 3" },
  { c: "#b7791f", dash: "" },
  { c: "#5a6470", dash: "4 3" },
  { c: "#2b8cbe", dash: "1 3" },
  { c: "#7a3b2e", dash: "12 4" },
];
export const FILLS = ["#1d3a6b", "#7fb8a6", "#c0392b", "#d8b26e", "#8e44ad", "#9aa5b1", "#2b8cbe", "#7a3b2e", "#e7a1b0", "#4d7c0f"];
export const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
export const r1 = (n) => Math.round(n * 10) / 10;
export const svg = (body, w = 660, h = 420) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" font-family="Arial, sans-serif">\n  <rect width="${w}" height="${h}" fill="#ffffff"/>\n${body}\n</svg>\n`;
export const title = (t, x, y = 24, size = 14) => `  <text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="bold" fill="${INK}">${esc(t)}</text>`;
const fmt = (v) => (typeof v === "number" ? v.toLocaleString("en-GB") : String(v));
const lines = (s) => String(s).split("\n");
const textLines = (x, y, s, { size = 11, anchor = "middle", lh = 13, fill = INK, bold = false } = {}) =>
  lines(s).map((l, j) => `<text x="${r1(x)}" y="${r1(y + j * lh)}" text-anchor="${anchor}" font-size="${size}" fill="${fill}"${bold ? ' font-weight="bold"' : ""}>${esc(l)}</text>`).join("");

// A legend of line or box keys, centred, wrapping onto more rows if needed.
export function legend(items, y, kind = "line", width = 660) {
  const w = items.map((it) => 46 + it.label.length * 6.4);
  const rows = [[]];
  let used = 0;
  items.forEach((it, i) => {
    if (used + w[i] > width - 40 && rows.at(-1).length) { rows.push([]); used = 0; }
    rows.at(-1).push(i); used += w[i];
  });
  return rows.map((row, ri) => {
    const total = row.reduce((a, i) => a + w[i], 0);
    let x = (width - total) / 2;
    const yy = y + ri * 18;
    return row.map((i) => {
      const it = items[i];
      const key = kind === "line"
        ? `<line x1="${r1(x)}" y1="${yy}" x2="${r1(x + 26)}" y2="${yy}" stroke="${it.c}" stroke-width="2.5"${it.dash ? ` stroke-dasharray="${it.dash}"` : ""}/>`
        : `<rect x="${r1(x + 6)}" y="${yy - 6}" width="14" height="12" fill="${it.c}" stroke="#333" stroke-width="0.6"/>`;
      const out = `    ${key}<text x="${r1(x + 31)}" y="${yy + 4}" font-size="12" fill="${INK}">${esc(it.label)}</text>`;
      x += w[i];
      return out;
    }).join("\n");
  }).join("\n");
}

const legendRows = (n, width = 660, labels = []) => {
  let rows = 1, used = 0;
  labels.forEach((l) => { const w = 46 + l.length * 6.4; if (used + w > width - 40 && used) { rows++; used = 0; } used += w; });
  return n > 1 ? rows : 0;
};

function yGrid({ x0, x1, Y, min, max, step }) {
  const g = [];
  for (let v = min; v <= max + 1e-9; v = Math.round((v + step) * 1e6) / 1e6)
    g.push(`    ${v !== min ? `<line x1="${x0}" y1="${r1(Y(v))}" x2="${x1}" y2="${r1(Y(v))}" stroke="${GRID}"/>` : ""}<text x="${x0 - 8}" y="${r1(Y(v) + 4)}" text-anchor="end">${fmt(v)}</text>`);
  return `  <g font-size="11" fill="${LABEL}">\n${g.join("\n")}\n  </g>`;
}

// Line graph. xs: x labels; series: [{label, values (null = no point)}].
export function lineGraph({ heading, unit, xUnit, xs, series, min = 0, max, step, width = 660, height = 420, markers = true, xEvery = 1 }) {
  const lr = legendRows(series.length, width, series.map((s) => s.label));
  const x0 = 76, x1 = width - 40, y1 = 52 + lr * 18 + 14, y0 = height - (xUnit ? 62 : 48);
  const X = (i) => x0 + (x1 - x0) * i / Math.max(1, xs.length - 1);
  const Y = (v) => y0 - (y0 - y1) * (v - min) / (max - min);
  const body = series.map((s, i) => {
    const st = SERIES[i % SERIES.length];
    const pts = s.values.map((v, k) => (v == null ? null : `${r1(X(k))},${r1(Y(v))}`)).filter(Boolean).join(" ");
    const marks = markers ? s.values.map((v, k) => (v == null ? "" : `<circle cx="${r1(X(k))}" cy="${r1(Y(v))}" r="3" fill="${st.c}"/>`)).join("") : "";
    return `  <polyline points="${pts}" fill="none" stroke="${st.c}" stroke-width="2.5"${st.dash ? ` stroke-dasharray="${st.dash}"` : ""}/>${marks}`;
  });
  return [
    heading ? title(heading, width / 2) : "",
    yGrid({ x0, x1, Y, min, max, step }),
    `  <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 12}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <g font-size="11" fill="${LABEL}" text-anchor="middle">\n    ${xs.map((x, i) => (i % xEvery ? "" : textLines(X(i), y0 + 18, x, { size: 11, fill: LABEL }))).join("")}\n  </g>`,
    xUnit ? `  <text x="${(x0 + x1) / 2}" y="${y0 + 44}" font-size="11" fill="${LABEL}" text-anchor="middle">${esc(xUnit)}</text>` : "",
    unit ? `  <text x="${x0 - 54}" y="${(y0 + y1) / 2}" font-size="11" fill="${LABEL}" transform="rotate(-90 ${x0 - 54} ${(y0 + y1) / 2})" text-anchor="middle">${esc(unit)}</text>` : "",
    ...body,
    series.length > 1 ? `  <g>\n${legend(series.map((s, i) => ({ label: s.label, ...SERIES[i % SERIES.length] })), 46, "line", width)}\n  </g>` : "",
  ].filter(Boolean).join("\n");
}

// Vertical grouped (or stacked) bar chart.
export function barChart({ heading, unit, xUnit, cats, series, min = 0, max, step, width = 660, height = 420, stacked = false, labels = false }) {
  const lr = legendRows(series.length, width, series.map((s) => s.label));
  const maxLines = Math.max(...cats.map((c) => lines(c).length));
  const x0 = 80, x1 = width - 30, y1 = 52 + lr * 18 + 14, y0 = height - 30 - maxLines * 13 - (xUnit ? 18 : 0);
  const Y = (v) => y0 - (y0 - y1) * (v - min) / (max - min);
  const slot = (x1 - x0) / cats.length;
  const n = stacked ? 1 : series.length;
  const bw = Math.min(34, (slot - 14) / n);
  const bars = cats.map((c, i) => {
    const left = x0 + slot * i + (slot - bw * n) / 2;
    let base = min;
    const rects = series.map((s, k) => {
      const v = s.values[i];
      if (v == null) return "";
      const lo = stacked ? base : min, hi = stacked ? base + v : v;
      if (stacked) base += v;
      const x = stacked ? left : left + bw * k;
      const r = `<rect x="${r1(x)}" y="${r1(Y(hi))}" width="${r1(bw)}" height="${r1(Y(lo) - Y(hi))}" fill="${FILLS[k % FILLS.length]}" stroke="#333" stroke-width="0.6"/>`;
      const t = labels && !stacked ? `<text x="${r1(x + bw / 2)}" y="${r1(Y(hi) - 4)}" text-anchor="middle" font-size="9.5" fill="${LABEL}">${fmt(v)}</text>` : "";
      return r + t;
    }).join("");
    return `    ${rects}${textLines(x0 + slot * i + slot / 2, y0 + 16, c, { size: 11 })}`;
  });
  return [
    heading ? title(heading, width / 2) : "",
    yGrid({ x0, x1, Y, min, max, step }),
    `  <line x1="${x0}" y1="${y0}" x2="${x1}" y2="${y0}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <line x1="${x0}" y1="${y0}" x2="${x0}" y2="${y1 - 12}" stroke="${AXIS}" stroke-width="1.5"/>`,
    `  <g fill="${INK}">\n${bars.join("\n")}\n  </g>`,
    xUnit ? `  <text x="${(x0 + x1) / 2}" y="${height - 10}" font-size="11" fill="${LABEL}" text-anchor="middle">${esc(xUnit)}</text>` : "",
    unit ? `  <text x="${x0 - 56}" y="${(y0 + y1) / 2}" font-size="11" fill="${LABEL}" transform="rotate(-90 ${x0 - 56} ${(y0 + y1) / 2})" text-anchor="middle">${esc(unit)}</text>` : "",
    series.length > 1 ? `  <g>\n${legend(series.map((s, k) => ({ label: s.label, c: FILLS[k % FILLS.length] })), 46, "box", width)}\n  </g>` : "",
  ].filter(Boolean).join("\n");
}

// Horizontal grouped bar chart.
export function hBarChart({ heading, unit, cats, series, min = 0, max, step, width = 660, height = 420, labelW = 150, stacked = false, labels = false }) {
  const lr = legendRows(series.length, width, series.map((s) => s.label));
  const x0 = labelW, x1 = width - 40, y0 = 52 + lr * 18 + 10, y1 = height - (unit ? 46 : 30);
  const X = (v) => x0 + (x1 - x0) * (v - min) / (max - min);
  const slot = (y1 - y0) / cats.length, n = stacked ? 1 : series.length, bh = Math.min(18, (slot - 6) / n);
  const grid = [];
  for (let v = min; v <= max + 1e-9; v = Math.round((v + step) * 1e6) / 1e6)
    grid.push(`    <line x1="${r1(X(v))}" y1="${y0}" x2="${r1(X(v))}" y2="${y1}" stroke="${v !== min ? GRID : AXIS}"${v !== min ? "" : ' stroke-width="1.5"'}/><text x="${r1(X(v))}" y="${y1 + 15}" text-anchor="middle">${fmt(v)}</text>`);
  const bars = cats.map((c, i) => {
    const top = y0 + slot * i + (slot - bh * n) / 2;
    let base = min;
    const rects = series.map((s, k) => {
      const v = s.values[i];
      if (v == null) return "";
      const lo = stacked ? base : min, hi = stacked ? base + v : v;
      if (stacked) base += v;
      const y = stacked ? top : top + bh * k;
      const t = labels && !stacked ? `<text x="${r1(X(hi) + 4)}" y="${r1(y + bh / 2 + 3.5)}" font-size="9.5" fill="${LABEL}">${fmt(v)}</text>` : "";
      return `<rect x="${r1(X(lo))}" y="${r1(y)}" width="${r1(X(hi) - X(lo))}" height="${r1(bh)}" fill="${FILLS[k % FILLS.length]}" stroke="#333" stroke-width="0.6"/>${t}`;
    }).join("");
    const ls = lines(c);
    return `    ${rects}${textLines(x0 - 8, y0 + slot * i + slot / 2 + 4 - (ls.length - 1) * 6.5, c, { size: 11.5, anchor: "end" })}`;
  });
  return [
    heading ? title(heading, width / 2) : "",
    `  <g font-size="11" fill="${LABEL}">\n${grid.join("\n")}\n  </g>`,
    `  <g fill="${INK}">\n${bars.join("\n")}\n  </g>`,
    unit ? `  <text x="${(x0 + x1) / 2}" y="${height - 12}" font-size="11" fill="${LABEL}" text-anchor="middle">${esc(unit)}</text>` : "",
    series.length > 1 ? `  <g>\n${legend(series.map((s, k) => ({ label: s.label, c: FILLS[k % FILLS.length] })), 46, "box", width)}\n  </g>` : "",
  ].filter(Boolean).join("\n");
}

// One pie, labels outside. slices: [{label, v}]; suffix "%" by default.
export function pie({ cx, cy, r, slices, heading, suffix = "%", size = 11 }) {
  let a = -Math.PI / 2;
  const total = slices.reduce((s, x) => s + x.v, 0);
  const parts = slices.map((s, i) => {
    const da = 2 * Math.PI * s.v / total, b = a + da, mid = a + da / 2;
    const p = (ang) => `${r1(cx + r * Math.cos(ang))},${r1(cy + r * Math.sin(ang))}`;
    const large = da > Math.PI ? 1 : 0;
    const lx = cx + (r + 14) * Math.cos(mid), ly = cy + (r + 14) * Math.sin(mid);
    const anchor = Math.cos(mid) > 0.2 ? "start" : Math.cos(mid) < -0.2 ? "end" : "middle";
    const path = da >= 2 * Math.PI - 1e-6
      ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${FILLS[(s.ci ?? i) % FILLS.length]}"/>`
      : `<path d="M${cx},${cy} L${p(a)} A${r},${r} 0 ${large} 1 ${p(b)} Z" fill="${FILLS[(s.ci ?? i) % FILLS.length]}" stroke="#fff" stroke-width="1.5"/>`;
    const lab = s.hideLabel ? "" : `<text x="${r1(lx)}" y="${r1(ly + 4 + (Math.sin(mid) > 0.9 ? 6 : 0))}" text-anchor="${anchor}" font-size="${size}" fill="${INK}">${esc((s.short ?? s.label) + ": " + fmt(s.v) + suffix)}</text>`;
    a = b;
    return `  ${path}\n  ${lab}`;
  });
  return [heading ? textLines(cx, cy - r - 30, heading, { size: 13, bold: true }) : "", ...parts].filter(Boolean).join("\n");
}

// Several pies side by side (or in a grid), each [{heading, slices}].
// A shared legend keeps long category names off the pies.
export function pies({ heading, charts, cols, width = 680, r = 70, suffix = "%", legendKeys }) {
  cols = cols || charts.length;
  const rows = Math.ceil(charts.length / cols);
  const cellW = width / cols, cellH = 2 * r + 110;
  const top = heading ? 40 : 10;
  const height = top + rows * cellH + (legendKeys ? 40 + Math.ceil(legendKeys.length / 4) * 18 : 10);
  const parts = charts.map((ch, i) => {
    const cx = cellW * (i % cols) + cellW / 2, cy = top + Math.floor(i / cols) * cellH + r + 55;
    return pie({ cx: r1(cx), cy: r1(cy), r, heading: ch.heading, suffix,
      slices: ch.slices.map((s) => ({ ...s, ci: legendKeys ? legendKeys.indexOf(s.label) : undefined, short: legendKeys ? "" : undefined })).map((s) => (legendKeys ? { ...s, label: "", short: "" } : s)),
      size: 11 }).replace(/>: /g, ">");
  });
  const key = legendKeys ? `  <g>\n${legend(legendKeys.map((l, k) => ({ label: l, c: FILLS[k % FILLS.length] })), height - 22 - (Math.ceil(legendKeys.length / 4) - 1) * 18, "box", width)}\n  </g>` : "";
  return { body: [heading ? title(heading, width / 2) : "", ...parts, key].filter(Boolean).join("\n"), width, height };
}

// A table: head = column headings, rows = arrays (first cell = row label).
export function table({ heading, head, rows, colW, width, rowH = 30, note, size = 12 }) {
  colW = colW || head.map((h, i) => (i === 0 ? 170 : 110));
  width = width || colW.reduce((a, b) => a + b, 0) + 40;
  const x0 = (width - colW.reduce((a, b) => a + b, 0)) / 2, y0 = heading ? 44 + (lines(heading).length - 1) * 16 : 16;
  const headLines = Math.max(...head.map((h) => lines(h).length));
  const hh = rowH + (headLines - 1) * 14;
  const rowLines = rows.map((r) => Math.max(...r.map((c) => lines(c).length)));
  const height = y0 + hh + rowLines.reduce((a, n) => a + rowH + (n - 1) * 14, 0) + (note ? 34 : 16);
  const out = [];
  if (heading) out.push(textLines(width / 2, 24, heading, { size: 14, bold: true, lh: 16 }));
  let x = x0;
  colW.forEach((w, i) => {
    out.push(`  <rect x="${r1(x)}" y="${y0}" width="${w}" height="${hh}" fill="#e8eef3" stroke="#333" stroke-width="0.8"/>`);
    const ls = lines(head[i]);
    out.push("  " + textLines(x + w / 2, y0 + hh / 2 + 4 - (ls.length - 1) * 7, head[i], { size, bold: true, lh: 14 }));
    x += w;
  });
  let y = y0 + hh;
  rows.forEach((row, ri) => {
    const h = rowH + (rowLines[ri] - 1) * 14;
    let xx = x0;
    row.forEach((c, i) => {
      out.push(`  <rect x="${r1(xx)}" y="${r1(y)}" width="${colW[i]}" height="${h}" fill="${ri % 2 ? "#fafafa" : "#fff"}" stroke="#333" stroke-width="0.8"/>`);
      const ls = lines(fmt(c));
      out.push("  " + textLines(i === 0 ? xx + 10 : xx + colW[i] / 2, y + h / 2 + 4 - (ls.length - 1) * 7, fmt(c), { size, anchor: i === 0 ? "start" : "middle", bold: i === 0, lh: 14 }));
      xx += colW[i];
    });
    y += h;
  });
  if (note) out.push(`  <text x="${r1(x0)}" y="${r1(y + 20)}" font-size="11" fill="${LABEL}">${esc(note)}</text>`);
  return { body: out.join("\n"), width, height };
}

// A labelled box (maps, plans, process diagrams).
export const box = (x, y, w, h, label, { fill = "#fff", size = 11, rot = false, stroke = "#333", dash = "" } = {}) => {
  const cx = x + w / 2, cy = y + h / 2;
  const ls = lines(label || "");
  const txt = label ? ls.map((l, i) => `<text x="${r1(cx)}" y="${r1(cy + 4 + (i - (ls.length - 1) / 2) * (size + 2))}" text-anchor="middle" font-size="${size}"${rot ? ` transform="rotate(-90 ${r1(cx)} ${r1(cy)})"` : ""}>${esc(l)}</text>`).join("") : "";
  return `    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" stroke="${stroke}" stroke-width="1.2"${dash ? ` stroke-dasharray="${dash}"` : ""}/>${txt}`;
};
export const label = (x, y, s, opts = {}) => "    " + textLines(x, y, s, opts);
export const ARROW_DEFS = `  <defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#333"/></marker></defs>`;
export const arrow = (x1, y1, x2, y2, { dash = "" } = {}) => `    <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="1.4" marker-end="url(#ah)"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
export const path = (d, { fill = "none", stroke = "#333", width = 1.4, dash = "" } = {}) => `    <path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;

// Plain-text summaries of chart data for the AI marker.
export const seriesText = (xs, series, unit = "") =>
  series.map((s) => `${s.label}: ${s.values.map((v, i) => (v == null ? null : `${lines(xs[i]).join(" ")} ${fmt(v)}${unit}`)).filter(Boolean).join(", ")}`).join(". ") + ".";
export const catText = (cats, series, unit = "") =>
  cats.map((c, i) => `${lines(c).join(" ")}: ${series.map((s) => (series.length > 1 ? `${s.label} ` : "") + (s.values[i] == null ? "n/a" : fmt(s.values[i]) + unit)).join(", ")}`).join("; ") + ".";
export const tableText = (head, rows) =>
  rows.map((r) => `${lines(r[0]).join(" ")}: ` + r.slice(1).map((c, i) => `${lines(head[i + 1]).join(" ")} ${lines(fmt(c)).join(" ")}`).join(", ")).join("; ") + ".";
