/**
 * Generates on-brand SVG cover art for each project + the hero, with zero
 * external dependencies or paid APIs. Crimson-black tactical theme.
 *
 * Run:  node scripts/generate-art.mjs
 * Output: public/images/*.svg
 *
 * To swap in real AI art later, just replace the generated files with your own
 * (keep the same filenames) — nothing else needs to change.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "images");
mkdirSync(OUT, { recursive: true });

const BG = "#0a0708";
const CRIMSON = "#e11d34";
const BRIGHT = "#ff3350";

/** Shared defs: glow filter + faint grid pattern + vignette gradient. */
function defs(id, glowX, glowY) {
  return `
  <defs>
    <radialGradient id="glow-${id}" cx="${glowX}%" cy="${glowY}%" r="60%">
      <stop offset="0%" stop-color="${CRIMSON}" stop-opacity="0.55"/>
      <stop offset="45%" stop-color="${CRIMSON}" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="${CRIMSON}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade-${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${BG}" stop-opacity="0.9"/>
    </linearGradient>
    <pattern id="grid-${id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <filter id="blur-${id}"><feGaussianBlur stdDeviation="6"/></filter>
  </defs>`;
}

/** Tactical corner ticks. */
function frame(w, h) {
  const m = 26,
    s = 22,
    c = "#ffffff",
    o = 0.25;
  const L = (x1, y1, x2, y2) =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-opacity="${o}" stroke-width="2"/>`;
  return [
    L(m, m, m + s, m), L(m, m, m, m + s),
    L(w - m, m, w - m - s, m), L(w - m, m, w - m, m + s),
    L(m, h - m, m + s, h - m), L(m, h - m, m, h - m - s),
    L(w - m, h - m, w - m - s, h - m), L(w - m, h - m, w - m, h - m - s),
  ].join("");
}

function label(text, w, h) {
  return `<text x="${w / 2}" y="${h - 40}" text-anchor="middle"
    font-family="ui-monospace, monospace" font-size="20" letter-spacing="6"
    fill="#ffffff" fill-opacity="0.55">${text}</text>`;
}

function wrap(id, w, h, glowX, glowY, body, tag) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
  ${defs(id, glowX, glowY)}
  <rect width="${w}" height="${h}" fill="${BG}"/>
  <rect width="${w}" height="${h}" fill="url(#grid-${id})"/>
  <rect width="${w}" height="${h}" fill="url(#glow-${id})"/>
  ${body}
  <rect width="${w}" height="${h}" fill="url(#fade-${id})"/>
  ${frame(w, h)}
  ${tag ? label(tag, w, h) : ""}
</svg>`;
}

const W = 1200, H = 675;
const cx = W / 2, cy = H / 2 - 20;

/* ---- Motifs --------------------------------------------------------- */

// Achilles: glowing orb + concentric HUD rings + crosshair
const achilles = (() => {
  const rings = [70, 120, 175, 235]
    .map(
      (r, i) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${CRIMSON}" stroke-opacity="${0.5 - i * 0.1}" stroke-width="${i === 0 ? 2 : 1}" ${i === 2 ? `stroke-dasharray="6 10"` : ""}/>`,
    )
    .join("");
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    const r1 = 235, r2 = 250;
    return `<line x1="${cx + Math.cos(a) * r1}" y1="${cy + Math.sin(a) * r1}" x2="${cx + Math.cos(a) * r2}" y2="${cy + Math.sin(a) * r2}" stroke="${CRIMSON}" stroke-opacity="0.4" stroke-width="2"/>`;
  }).join("");
  return wrap(
    "a", W, H, 50, 30,
    `<circle cx="${cx}" cy="${cy}" r="46" fill="${BRIGHT}" filter="url(#blur-a)" opacity="0.8"/>
     <circle cx="${cx}" cy="${cy}" r="30" fill="#fff" opacity="0.9"/>
     <circle cx="${cx}" cy="${cy}" r="46" fill="none" stroke="${BRIGHT}" stroke-width="2"/>
     ${rings}${ticks}
     <line x1="${cx - 300}" y1="${cy}" x2="${cx + 300}" y2="${cy}" stroke="#fff" stroke-opacity="0.07"/>
     <line x1="${cx}" y1="${cy - 220}" x2="${cx}" y2="${cy + 220}" stroke="#fff" stroke-opacity="0.07"/>`,
    "ACHILLES // AI ASSISTANT",
  );
})();

// Pneumonia: paired lung arcs + scan nodes + scan line
const lung = (() => {
  const node = (x, y, r = 5) =>
    `<circle cx="${x}" cy="${y}" r="${r}" fill="${BRIGHT}" opacity="0.9"/>`;
  const lungPath = (dir) => {
    const s = dir;
    return `<path d="M ${cx} ${cy - 110}
      C ${cx + s * 20} ${cy - 60}, ${cx + s * 130} ${cy - 70}, ${cx + s * 120} ${cy + 30}
      C ${cx + s * 115} ${cy + 110}, ${cx + s * 40} ${cy + 130}, ${cx + s * 20} ${cy + 70}
      C ${cx + s * 12} ${cy + 30}, ${cx + s * 12} ${cy - 30}, ${cx} ${cy - 110} Z"
      fill="none" stroke="${CRIMSON}" stroke-opacity="0.7" stroke-width="2"/>`;
  };
  const nodes = [
    [cx - 70, cy - 10], [cx + 70, cy - 10], [cx - 55, cy + 50],
    [cx + 60, cy + 45], [cx - 80, cy + 20], [cx + 85, cy + 10],
  ].map(([x, y]) => node(x, y)).join("");
  return wrap(
    "l", W, H, 50, 35,
    `${lungPath(-1)}${lungPath(1)}
     <line x1="${cx}" y1="${cy - 140}" x2="${cx}" y2="${cy + 150}" stroke="${CRIMSON}" stroke-opacity="0.5" stroke-width="2"/>
     ${nodes}
     <rect x="${cx - 200}" y="${cy + 100}" width="400" height="2" fill="${BRIGHT}" opacity="0.5"/>`,
    "RESNET50 // CHEST X-RAY",
  );
})();

// VS Code copilot: code brackets + retrieval graph
const vscode = (() => {
  const bracket = (x, flip) =>
    `<path d="M ${x} ${cy - 90} q ${flip * -40} 0 ${flip * -40} 45 q 0 45 ${flip * -40} 45 q ${flip * 40} 0 ${flip * 40} 45 q 0 45 0 45"
      fill="none" stroke="${CRIMSON}" stroke-opacity="0.7" stroke-width="3" stroke-linecap="round"/>`;
  const pts = [
    [cx, cy - 30], [cx - 90, cy + 30], [cx + 90, cy + 20],
    [cx - 30, cy + 90], [cx + 50, cy + 80],
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 4], [3, 4]]
    .map(
      ([a, b]) =>
        `<line x1="${pts[a][0]}" y1="${pts[a][1]}" x2="${pts[b][0]}" y2="${pts[b][1]}" stroke="${CRIMSON}" stroke-opacity="0.4" stroke-width="1.5"/>`,
    )
    .join("");
  const nodes = pts
    .map(
      ([x, y], i) =>
        `<circle cx="${x}" cy="${y}" r="${i === 0 ? 9 : 6}" fill="${i === 0 ? "#fff" : BRIGHT}"/>`,
    )
    .join("");
  return wrap(
    "v", W, H, 50, 35,
    `${bracket(cx - 170, 1)}${bracket(cx + 170, -1)}${edges}${nodes}`,
    "RAG COPILOT // VS CODE",
  );
})();

// CodeMate: terminal window + chat bubble
const codemate = (() => {
  const tw = 420, th = 230, tx = cx - tw / 2, ty = cy - th / 2;
  const lines = [0, 1, 2, 3]
    .map(
      (i) =>
        `<rect x="${tx + 24}" y="${ty + 70 + i * 30}" width="${[260, 180, 300, 140][i]}" height="8" rx="4" fill="#fff" fill-opacity="${0.18 - i * 0.02}"/>`,
    )
    .join("");
  return wrap(
    "c", W, H, 45, 35,
    `<rect x="${tx}" y="${ty}" width="${tw}" height="${th}" rx="14" fill="#140e10" stroke="${CRIMSON}" stroke-opacity="0.5"/>
     <rect x="${tx}" y="${ty}" width="${tw}" height="40" rx="14" fill="#1a1316"/>
     <circle cx="${tx + 24}" cy="${ty + 20}" r="5" fill="${CRIMSON}"/>
     <circle cx="${tx + 44}" cy="${ty + 20}" r="5" fill="#fff" fill-opacity="0.3"/>
     <circle cx="${tx + 64}" cy="${ty + 20}" r="5" fill="#fff" fill-opacity="0.3"/>
     <text x="${tx + 24}" y="${ty + 66}" font-family="ui-monospace,monospace" font-size="16" fill="${BRIGHT}">&gt; explain</text>
     ${lines}
     <g transform="translate(${tx + tw - 40}, ${ty + th - 30})">
       <rect x="0" y="0" width="120" height="64" rx="14" fill="${CRIMSON}" opacity="0.9"/>
       <rect x="14" y="18" width="70" height="7" rx="3" fill="#fff" fill-opacity="0.8"/>
       <rect x="14" y="34" width="48" height="7" rx="3" fill="#fff" fill-opacity="0.6"/>
     </g>`,
    "LLM ASSISTANT // MEMORY",
  );
})();

// Meeting scheduler: calendar grid + nodes
const scheduler = (() => {
  const gw = 360, gh = 230, gx = cx - gw / 2, gy = cy - gh / 2;
  let cells = "";
  const cols = 6, rows = 4, cwid = gw / cols, chei = (gh - 40) / rows;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const hot = (r === 1 && c === 2) || (r === 2 && c === 4);
      cells += `<rect x="${gx + c * cwid + 4}" y="${gy + 40 + r * chei + 4}" width="${cwid - 8}" height="${chei - 8}" rx="5"
        fill="${hot ? CRIMSON : "#ffffff"}" fill-opacity="${hot ? 0.85 : 0.06}"/>`;
    }
  return wrap(
    "s", W, H, 50, 35,
    `<rect x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="14" fill="#140e10" stroke="${CRIMSON}" stroke-opacity="0.5"/>
     <rect x="${gx}" y="${gy}" width="${gw}" height="34" rx="14" fill="#1a1316"/>
     <circle cx="${gx + 24}" cy="${gy + 17}" r="6" fill="${BRIGHT}"/>
     <circle cx="${gx + 46}" cy="${gy + 17}" r="6" fill="#fff" fill-opacity="0.3"/>
     ${cells}
     <line x1="${gx + 2.5 * cwid + 4}" y1="${gy + 40 + 1.5 * chei}" x2="${gx + 4.5 * cwid}" y2="${gy + 40 + 2.5 * chei}" stroke="${BRIGHT}" stroke-width="2" stroke-dasharray="4 4"/>`,
    "NLP // MEETING SCHEDULER",
  );
})();

// Hero: wide field
const hero = (() => {
  const HW = 1600, HH = 900;
  const hx = HW / 2 + 250, hy = HH / 2 - 120;
  const nodes = Array.from({ length: 26 }, (_, i) => {
    const a = (i / 26) * Math.PI * 2;
    const r = 180 + (i % 5) * 60;
    const x = hx + Math.cos(a) * r * 0.9;
    const y = hy + Math.sin(a) * r * 0.55;
    return `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${2 + (i % 3)}" fill="${i % 4 === 0 ? BRIGHT : "#fff"}" fill-opacity="${0.25 + (i % 4) * 0.15}"/>`;
  }).join("");
  const rings = [160, 260, 360]
    .map(
      (r, i) =>
        `<ellipse cx="${hx}" cy="${hy}" rx="${r}" ry="${r * 0.6}" fill="none" stroke="${CRIMSON}" stroke-opacity="${0.35 - i * 0.1}" stroke-width="1.5" ${i === 1 ? `stroke-dasharray="4 12"` : ""}/>`,
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${HW} ${HH}" width="${HW}" height="${HH}" role="img">
  ${defs("h", 78, 18)}
  <rect width="${HW}" height="${HH}" fill="${BG}"/>
  <rect width="${HW}" height="${HH}" fill="url(#grid-h)"/>
  <rect width="${HW}" height="${HH}" fill="url(#glow-h)"/>
  ${rings}${nodes}
  <circle cx="${hx}" cy="${hy}" r="60" fill="${BRIGHT}" filter="url(#blur-h)" opacity="0.6"/>
  <circle cx="${hx}" cy="${hy}" r="22" fill="#fff" opacity="0.9"/>
</svg>`;
})();

const files = {
  "hero.svg": hero,
  "cover-achilles.svg": achilles,
  "cover-lung-care.svg": lung,
  "cover-vscode-copilot.svg": vscode,
  "cover-codemate.svg": codemate,
  "cover-meeting-scheduler.svg": scheduler,
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(join(OUT, name), svg.trim());
  console.log("wrote", name);
}
console.log("Done →", OUT);
