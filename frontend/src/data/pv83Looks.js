/*
 * Build 83: the design generator of the page-video studio (Kunal, 16 Nov: "separate attractive attention seeking video
 * template for each and every web page … different colour grading, colour composition, colour contrast, colour palette
 * … resonate with particular country aesthetic for each and every panel country").
 *
 * A "look" is a recipe: palette, local pattern (motif), screen frame, layout, fonts, how the highlights are drawn, the
 * colour grading of the picture, the 3D icon tiles, the illustration and the music. pv83Look(page, n) picks one for a
 * page; the n-th page of the list gets the n-th combination, stepping through every list with a different stride, so
 * no two pages share the same recipe. Country pages take their palette from their flag and their pattern from their
 * country (data/pv83Countries.js); the three panels of one country differ in frame, layout, illustration and grading.
 * Anything can be overridden per page in the super admin (Page videos › Design), or by an imported template file.
 */
import { PV83_BY_ISO, PV83_PANELS } from './pv83Countries.js';

/* ---- colour helpers ---- */
const hex = (h) => { h = String(h || "#000").replace("#", ""); if (h.length === 3) h = h.replace(/./g, "$&$&"); const n = parseInt(h.slice(0, 6), 16) || 0; return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
const toHex = (r) => "#" + r.map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0")).join("");
const mix = (a, b, t) => { const x = hex(a), y = hex(b); return toHex(x.map((v, i) => v + (y[i] - v) * t)); };
const lum = (c) => { const [r, g, b] = hex(c).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const sat = (c) => { const [r, g, b] = hex(c); const mx = Math.max(r, g, b), mn = Math.min(r, g, b); return mx ? (mx - mn) / mx : 0; };
/* a colour light enough to read on the dark background */
const lift = (c, bg) => { let x = c, i = 0; while (i++ < 8 && lum(x) < 0.32) x = mix(x, "#ffffff", 0.18); return x; };

/* ---- 32 palettes: bg, bg2 (theatre), a, a2 (accents), p1, p2 (poster), ink of the poster ---- */
const PAL = (id, n, bg, bg2, a, a2, p1, p2, pink, light = true) => ({ id, n, bg, bg2, a, a2, p1, p2, pink, light });
const PV83_PALETTES = [
  PAL("ember", "Ember sunset", "#0B0F2E", "#1B2A7A", "#FFB57A", "#FF5E62", "#FFF1E3", "#FFD6BA", "#3A0E1E"),
  PAL("lagoon", "Lagoon", "#03161F", "#0B4F63", "#3FE0D0", "#1A8CFF", "#E6FBFA", "#B9F0EC", "#063B45"),
  PAL("orchid", "Orchid night", "#140A26", "#3F1A6B", "#E58BFF", "#7C4DFF", "#F7ECFF", "#E2CCFF", "#2B0E4A"),
  PAL("saffron", "Saffron dusk", "#1A0E05", "#5B2A0B", "#FFB000", "#FF6B2C", "#FFF6DD", "#FFE1A3", "#4A2205"),
  PAL("mint", "Mint circuit", "#04150F", "#0E4A36", "#5CF2A8", "#00C2FF", "#E9FFF5", "#BFF5DC", "#053325"),
  PAL("cobalt", "Cobalt pop", "#050B2B", "#1532A8", "#FFD23F", "#3D7BFF", "#EEF3FF", "#C9D7FF", "#0C1D63"),
  PAL("rose", "Rose quartz", "#1C0A14", "#5A1A3A", "#FF8FB1", "#FF4D6D", "#FFF0F4", "#FFD0DD", "#4D0D24"),
  PAL("aurora", "Aurora", "#030A1C", "#123A5E", "#7CFFCB", "#B57BFF", "#EAF7FF", "#C6E9FF", "#0B2A44"),
  PAL("copper", "Copper & teal", "#081417", "#173F45", "#FF9F5A", "#2EC4B6", "#FFF4EA", "#FFDDC2", "#0E3236"),
  PAL("plum", "Plum & lime", "#14071C", "#3A1052", "#C6F432", "#FF5CA8", "#F8FFE3", "#E8FFA8", "#2C0A40"),
  PAL("ocean", "Deep ocean", "#020C1B", "#0A2A55", "#5AC8FA", "#FFC371", "#EAF6FF", "#C2E4FF", "#082246"),
  PAL("forest", "Forest gold", "#07140B", "#16422A", "#F4C95D", "#7BD389", "#F7FBEA", "#E3F2C6", "#0E2E1A"),
  PAL("magma", "Magma", "#160505", "#4D0E0E", "#FF7A18", "#FFD200", "#FFF3E6", "#FFD9B8", "#3F0A0A"),
  PAL("ice", "Ice blue", "#06111F", "#1D3B66", "#9BE7FF", "#FFFFFF", "#F3FBFF", "#D3F1FF", "#0F2A4D"),
  PAL("candy", "Candy pop", "#1A0828", "#4B1574", "#FF6FD8", "#3BE8B0", "#FFF0FB", "#FFD3F2", "#3D0C5E"),
  PAL("sand", "Desert sand", "#17110A", "#4A3519", "#E9B872", "#D96C3A", "#FFF8EC", "#F3E0BF", "#3B2A12"),
  PAL("royal", "Royal violet", "#0A0726", "#2A1C78", "#FFC94A", "#8F6BFF", "#F2EEFF", "#DCD3FF", "#1E145C"),
  PAL("neon", "Neon city", "#05030F", "#1A0B3D", "#00F0FF", "#FF2E97", "#EAFBFF", "#C8F6FF", "#11072E", false),
  PAL("terracotta", "Terracotta", "#1A0C08", "#5C2A1A", "#FF8C61", "#FFD29D", "#FFF3EC", "#FFD9C6", "#47200F"),
  PAL("slate", "Slate & coral", "#0C1117", "#27333F", "#FF6F61", "#7FB7BE", "#F3F6F8", "#D6E1E6", "#1C2731"),
  PAL("jade", "Jade & red", "#041510", "#0C3F31", "#FF4C4C", "#2FD3A1", "#ECFFF8", "#C5F4E3", "#0A3326"),
  PAL("berry", "Berry", "#170614", "#4F1240", "#FF5DA2", "#FFB86B", "#FFF0F7", "#FFD1E6", "#410D35"),
  PAL("sky", "Sky high", "#04122B", "#1652A8", "#7FD1FF", "#FFE066", "#EEF8FF", "#CBEBFF", "#0D2E66"),
  PAL("lava", "Lava lamp", "#12051F", "#481268", "#FF9E00", "#FF4ECD", "#FFF4E6", "#FFE0B3", "#380D52"),
  PAL("sage", "Sage", "#0B1310", "#2B4237", "#C9E4CA", "#F2A65A", "#F4FAF4", "#DCEFDC", "#1F332A"),
  PAL("cyber", "Cyber lime", "#060A07", "#16301B", "#B6FF3B", "#00D1FF", "#F4FFE6", "#DDFFB3", "#0E2412", false),
  PAL("blush", "Blush gold", "#1A1012", "#4A2A30", "#F7C59F", "#E56B6F", "#FFF6F0", "#FBE0D0", "#3B1F24"),
  PAL("indigo", "Indigo silk", "#070A22", "#24307A", "#A5B4FC", "#F472B6", "#EEF0FF", "#D5DBFF", "#1A2266"),
  PAL("tropic", "Tropic", "#03140F", "#0B4A3C", "#FFD166", "#06D6A0", "#F0FFF9", "#C9F7E7", "#063B2F"),
  PAL("garnet", "Garnet", "#160509", "#4E0F1E", "#FF6B6B", "#FFD93D", "#FFF0F0", "#FFD4D4", "#3E0B17"),
  PAL("steel", "Steel & amber", "#0A0D12", "#2A3340", "#FFB238", "#8FA3BF", "#F5F7FA", "#DCE3EC", "#1F2733"),
  PAL("lilac", "Lilac haze", "#110B1E", "#3A2B5E", "#CDB4FF", "#7DE2D1", "#F7F2FF", "#E6DBFF", "#2C2048"),
];
/* each service family starts from its own colours */
const FAM_PAL = { mr: ["ember", "cobalt", "saffron", "sky", "royal", "copper", "ocean", "sand"], dm: ["candy", "berry", "lava", "neon", "rose", "plum", "orchid", "blush"], it: ["mint", "cyber", "aurora", "lagoon", "indigo", "ice", "steel", "jade"], af: ["forest", "tropic", "sage", "terracotta", "garnet", "slate", "magma", "lilac"], fr: PV83_PALETTES.map((p) => p.id) };

/* a palette from a country's flag: the most colourful flag colour leads, the next one supports */
function flagPalette(c, panel) {
  const cols = c.flag.filter((x) => sat(x) > 0.25);
  const lead = cols[0] || c.flag[0], sup = cols[1] || cols[0] || "#FFC27A";
  const shift = panel === "b2b" ? 0.86 : panel === "hc" ? 0.8 : 0.9;
  const bg = mix(lead, "#050816", shift), bg2 = mix(sup === lead ? lead : sup, "#0B1033", panel === "hc" ? 0.62 : 0.7);
  return PAL("flag-" + c.iso.toLowerCase(), c.name + " flag", bg, bg2, lift(panel === "b2b" ? sup : lead, bg), lift(panel === "b2b" ? lead : sup, bg), mix(lead, "#FFFFFF", 0.9), mix(sup, "#FFFFFF", 0.78), mix(lead, "#0B0B1A", 0.72));
}

/* ---- 34 local patterns: a small SVG tile, drawn in the design's accent colours ---- */
const svg = (w, h, body) => `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}' viewBox='0 0 ${w} ${h}'>${body}</svg>`;
const M = {
  seigaiha: (a, b) => svg(60, 30, [0, 30, 60].map((x) => `<g fill='none' stroke='${a}' stroke-width='2'><circle cx='${x}' cy='30' r='28'/><circle cx='${x}' cy='30' r='20' stroke='${b}'/><circle cx='${x}' cy='30' r='12'/></g>`).join("") + [15, 45].map((x) => `<g fill='none' stroke='${b}' stroke-width='2'><circle cx='${x}' cy='15' r='12'/></g>`).join("")),
  lattice: (a, b) => svg(48, 48, `<path d='M0 12h12V0M36 0v12h12M0 36h12v12M36 48V36h12M12 12h24v24H12z' fill='none' stroke='${a}' stroke-width='3'/><path d='M18 18h12v12H18z' fill='none' stroke='${b}' stroke-width='2'/>`),
  mandala: (a, b) => svg(80, 80, `<g transform='translate(40 40)' fill='none' stroke='${a}' stroke-width='1.6'>${Array.from({ length: 12 }, (_, i) => `<path transform='rotate(${i * 30})' d='M0 -6 C 8 -16 8 -26 0 -34 C -8 -26 -8 -16 0 -6Z'/>`).join("")}<circle r='5' fill='${b}' stroke='none'/><circle r='37' stroke='${b}' stroke-dasharray='2 5'/></g>`),
  girih: (a, b) => svg(56, 56, `<g fill='none' stroke='${a}' stroke-width='2'><path d='M28 4l7 17 17 7-17 7-7 17-7-17-17-7 17-7z'/><path d='M28 14l4 10 10 4-10 4-4 10-4-10-10-4 10-4z' stroke='${b}'/></g><path d='M0 0l8 8M56 0l-8 8M0 56l8-8M56 56l-8-8' stroke='${b}' stroke-width='2'/>`),
  kente: (a, b) => svg(48, 48, `<rect width='24' height='24' fill='${a}' opacity='.55'/><rect x='24' y='24' width='24' height='24' fill='${b}' opacity='.55'/><path d='M0 6h24M0 12h24M0 18h24M30 0v24M36 0v24M42 0v24M24 30h24M24 36h24M24 42h24M6 24v24M12 24v24M18 24v24' stroke='${b}' stroke-width='2'/>`),
  papel: (a, b) => svg(60, 44, `<path d='M0 0h60v26l-10 8-10-8-10 8-10-8-10 8-10-8z' fill='${a}' opacity='.5'/><circle cx='15' cy='12' r='4' fill='${b}'/><circle cx='45' cy='12' r='4' fill='${b}'/><path d='M30 6l4 6-4 6-4-6z' fill='${b}'/>`),
  azulejo: (a, b) => svg(56, 56, `<rect x='2' y='2' width='52' height='52' fill='none' stroke='${a}' stroke-width='2'/><path d='M28 6c6 10 12 16 22 22-10 6-16 12-22 22-6-10-12-16-22-22 10-6 16-12 22-22z' fill='none' stroke='${a}' stroke-width='2'/><circle cx='28' cy='28' r='6' fill='${b}'/><path d='M2 2l10 10M54 2L44 12M2 54l10-10M54 54L44 44' stroke='${b}' stroke-width='2'/>`),
  aurora: (a, b) => svg(120, 60, `<path d='M0 40 C 30 10 60 60 120 25' fill='none' stroke='${a}' stroke-width='3' opacity='.8'/><path d='M0 52 C 40 22 70 66 120 38' fill='none' stroke='${b}' stroke-width='2' opacity='.7'/><circle cx='20' cy='10' r='1.6' fill='#fff'/><circle cx='86' cy='8' r='1.2' fill='#fff'/><circle cx='60' cy='20' r='1' fill='#fff'/>`),
  tartan: (a, b) => svg(40, 40, `<rect width='40' height='40' fill='${a}' opacity='.18'/><path d='M0 10h40M0 30h40M10 0v40M30 0v40' stroke='${a}' stroke-width='6' opacity='.45'/><path d='M0 20h40M20 0v40' stroke='${b}' stroke-width='2'/>`),
  bauhaus: (a, b) => svg(64, 64, `<circle cx='16' cy='16' r='12' fill='${a}' opacity='.7'/><rect x='36' y='4' width='24' height='24' fill='none' stroke='${b}' stroke-width='3'/><path d='M4 60L28 36v24z' fill='${b}' opacity='.7'/><path d='M36 60a24 24 0 0 1 24-24v24z' fill='${a}' opacity='.5'/>`),
  nouveau: (a, b) => svg(80, 40, `<path d='M0 20 C 20 0 40 40 60 20 S 80 0 80 20' fill='none' stroke='${a}' stroke-width='2'/><path d='M0 30 C 20 10 40 50 60 30' fill='none' stroke='${b}' stroke-width='1.5' opacity='.8'/><circle cx='60' cy='20' r='3' fill='${b}'/>`),
  mosaic: (a, b) => svg(30, 30, `<rect x='1' y='1' width='13' height='13' rx='2' fill='${a}' opacity='.55'/><rect x='16' y='1' width='13' height='13' rx='2' fill='${b}' opacity='.4'/><rect x='1' y='16' width='13' height='13' rx='2' fill='${b}' opacity='.35'/><rect x='16' y='16' width='13' height='13' rx='2' fill='${a}' opacity='.25'/>`),
  folk: (a, b) => svg(48, 48, `<path d='M24 4l10 10-10 10-10-10z' fill='${a}' opacity='.75'/><path d='M24 24l10 10-10 10-10-10z' fill='none' stroke='${b}' stroke-width='2'/><path d='M4 24h8M36 24h8M24 0v4M24 44v4' stroke='${a}' stroke-width='3'/><circle cx='8' cy='8' r='2' fill='${b}'/><circle cx='40' cy='40' r='2' fill='${b}'/>`),
  iznik: (a, b) => svg(60, 60, `<circle cx='30' cy='30' r='22' fill='none' stroke='${a}' stroke-width='2'/><path d='M30 14c6 6 6 14 0 20-6-6-6-14 0-20zM30 46c-6-6-6-14 0-20 6 6 6 14 0 20z' fill='${b}' opacity='.8'/><circle cx='0' cy='0' r='8' fill='${a}' opacity='.5'/><circle cx='60' cy='60' r='8' fill='${a}' opacity='.5'/>`),
  batik: (a, b) => svg(40, 40, `<g fill='none' stroke='${a}' stroke-width='2'><ellipse cx='20' cy='9' rx='6' ry='9'/><ellipse cx='20' cy='31' rx='6' ry='9'/><ellipse cx='9' cy='20' rx='9' ry='6'/><ellipse cx='31' cy='20' rx='9' ry='6'/></g><circle cx='20' cy='20' r='3' fill='${b}'/>`),
  andean: (a, b) => svg(48, 24, `<path d='M0 24V16h8V8h8V0h16v8h8v8h8v8' fill='none' stroke='${a}' stroke-width='3'/><path d='M20 24v-8h8v8' fill='${b}' opacity='.7'/>`),
  carnival: (a, b) => svg(60, 60, `<path d='M10 50c8-20 20-30 40-40' stroke='${a}' stroke-width='3' fill='none'/><circle cx='12' cy='12' r='4' fill='${b}'/><rect x='40' y='40' width='8' height='4' transform='rotate(30 44 42)' fill='${a}'/><path d='M44 14l3 6 6 1-5 4 1 6-5-3-5 3 1-6-5-4 6-1z' fill='${b}' opacity='.8'/>`),
  dots: (a, b) => svg(36, 36, `<circle cx='6' cy='6' r='3' fill='${a}'/><circle cx='18' cy='6' r='2' fill='${b}'/><circle cx='30' cy='6' r='3' fill='${a}' opacity='.6'/><circle cx='12' cy='18' r='2.4' fill='${b}' opacity='.8'/><circle cx='24' cy='18' r='3' fill='${a}' opacity='.8'/><circle cx='6' cy='30' r='2' fill='${b}'/><circle cx='18' cy='30' r='3' fill='${a}' opacity='.7'/><circle cx='30' cy='30' r='2' fill='${b}' opacity='.6'/>`),
  koru: (a, b) => svg(60, 60, `<path d='M30 54c-14 0-22-10-22-22S18 8 30 8s18 8 18 18-8 14-14 14-10-4-10-9 4-7 7-7' fill='none' stroke='${a}' stroke-width='3' stroke-linecap='round'/><circle cx='31' cy='31' r='2.5' fill='${b}'/>`),
  stars: (a, b) => svg(50, 50, `<path d='M12 4l2.4 5 5.6.8-4 3.9 1 5.5-5-2.6-5 2.6 1-5.5-4-3.9 5.6-.8z' fill='${a}'/><path d='M0 34h50M0 42h50' stroke='${b}' stroke-width='3' opacity='.5'/><path d='M37 16l1.6 3.4 3.7.5-2.7 2.6.7 3.7-3.3-1.8-3.3 1.8.7-3.7-2.7-2.6 3.7-.5z' fill='${b}'/>`),
  maple: (a, b) => svg(60, 60, `<path d='M30 8l4 10 8-4-2 10 10 2-8 8 2 6-10-2v10h-4V38l-10 2 2-6-8-8 10-2-2-10 8 4z' fill='${a}' opacity='.6'/><circle cx='8' cy='52' r='1.6' fill='${b}'/><circle cx='52' cy='10' r='1.6' fill='${b}'/>`),
  swiss: (a, b) => svg(40, 40, `<path d='M16 8h8v8h8v8h-8v8h-8v-8H8v-8h8z' fill='${a}' opacity='.55'/><path d='M0 40L40 0' stroke='${b}' stroke-width='1' opacity='.4'/>`),
  temple: (a, b) => svg(60, 50, `<path d='M30 4l20 14H10z' fill='none' stroke='${a}' stroke-width='2'/><path d='M14 18h32l8 10H6z' fill='none' stroke='${a}' stroke-width='2'/><path d='M16 28v16M44 28v16M30 28v16' stroke='${b}' stroke-width='2'/><path d='M30 0v4' stroke='${b}' stroke-width='2'/>`),
  dancheong: (a, b) => svg(48, 48, `<circle cx='24' cy='24' r='14' fill='none' stroke='${a}' stroke-width='3'/><path d='M24 10a7 7 0 0 1 0 14 7 7 0 0 0 0 14' fill='none' stroke='${b}' stroke-width='3'/><path d='M0 0h10M38 48h10' stroke='${a}' stroke-width='3'/>`),
  hexgrid: (a, b) => svg(56, 48, `<path d='M14 2h28l14 22-14 22H14L0 24z' fill='none' stroke='${a}' stroke-width='2'/><circle cx='28' cy='24' r='3' fill='${b}'/>`),
  papyrus: (a, b) => svg(48, 48, `<path d='M24 44V20M24 20c-6-10-14-12-18-10M24 20c6-10 14-12 18-10M24 20c0-10 0-14 0-16' fill='none' stroke='${a}' stroke-width='2'/><path d='M0 46h48' stroke='${b}' stroke-width='3' stroke-dasharray='6 4'/>`),
  /* for the other pages */
  circuit: (a, b) => svg(60, 60, `<path d='M0 15h20l10 10h30M15 60V40l10-10M45 0v15l-10 10' fill='none' stroke='${a}' stroke-width='2'/><circle cx='20' cy='15' r='3' fill='${b}'/><circle cx='25' cy='30' r='3' fill='${b}'/><circle cx='35' cy='25' r='3' fill='${b}'/>`),
  grid: (a, b) => svg(40, 40, `<path d='M40 0H0v40' fill='none' stroke='${a}' stroke-width='1' opacity='.7'/><circle cx='0' cy='0' r='2' fill='${b}'/>`),
  confetti: (a, b) => svg(70, 70, `<rect x='8' y='10' width='10' height='4' rx='2' transform='rotate(25 13 12)' fill='${a}'/><rect x='46' y='20' width='10' height='4' rx='2' transform='rotate(-30 51 22)' fill='${b}'/><circle cx='30' cy='46' r='3' fill='${a}'/><path d='M56 52l4 6-7 1z' fill='${b}'/><circle cx='12' cy='58' r='2' fill='${b}'/>`),
  waves: (a, b) => svg(80, 24, `<path d='M0 12 Q 10 2 20 12 T 40 12 T 60 12 T 80 12' fill='none' stroke='${a}' stroke-width='2'/><path d='M0 20 Q 10 10 20 20 T 40 20 T 60 20 T 80 20' fill='none' stroke='${b}' stroke-width='1.5' opacity='.7'/>`),
  rings: (a, b) => svg(64, 64, `<circle cx='32' cy='32' r='26' fill='none' stroke='${a}' stroke-width='1.5'/><circle cx='32' cy='32' r='16' fill='none' stroke='${b}' stroke-width='1.5'/><circle cx='32' cy='32' r='5' fill='${a}'/>`),
  diagonal: (a, b) => svg(24, 24, `<path d='M0 24L24 0' stroke='${a}' stroke-width='2'/><path d='M-6 6L6 -6M18 30L30 18' stroke='${b}' stroke-width='2'/>`),
  bokeh: (a, b) => svg(120, 120, `<circle cx='24' cy='30' r='18' fill='${a}' opacity='.35'/><circle cx='90' cy='24' r='10' fill='${b}' opacity='.4'/><circle cx='70' cy='86' r='24' fill='${a}' opacity='.22'/><circle cx='20' cy='96' r='8' fill='${b}' opacity='.45'/>`),
  bars: (a, b) => svg(48, 48, `<rect x='4' y='28' width='8' height='16' rx='2' fill='${a}' opacity='.6'/><rect x='16' y='18' width='8' height='26' rx='2' fill='${b}' opacity='.6'/><rect x='28' y='8' width='8' height='36' rx='2' fill='${a}' opacity='.45'/>`),
};
const PV83_MOTIFS = Object.keys(M);
const MOTIF_NAMES = { seigaiha: "Japanese waves (seigaiha)", lattice: "Window lattice", mandala: "Mandala", girih: "Arabesque star (girih)", kente: "Kente weave", papel: "Papel picado", azulejo: "Azulejo tiles", aurora: "Nordic aurora", tartan: "Tartan", bauhaus: "Bauhaus shapes", nouveau: "Art nouveau curves", mosaic: "Mosaic", folk: "Folk embroidery", iznik: "Iznik tulips", batik: "Batik (kawung)", andean: "Andean steps", carnival: "Carnival", dots: "Dot painting", koru: "Koru spiral", stars: "Stars & stripes", maple: "Maple leaves", swiss: "Swiss crosses", temple: "Temple roofs", dancheong: "Taeguk & dancheong", hexgrid: "Hex grid", papyrus: "Papyrus & lotus", circuit: "Circuit", grid: "Blueprint grid", confetti: "Confetti", waves: "Waves", rings: "Rings", diagonal: "Diagonal lines", bokeh: "Bokeh lights", bars: "Rising bars" };
const FAM_MOTIF = { mr: ["bars", "rings", "grid", "bokeh", "dots", "waves"], dm: ["confetti", "bokeh", "waves", "diagonal", "carnival", "rings"], it: ["circuit", "hexgrid", "grid", "diagonal", "lattice", "rings"], af: ["grid", "mosaic", "bars", "swiss", "diagonal", "waves"], fr: PV83_MOTIFS.slice(26) };
const pv83MotifUrl = (id, a, b) => { const f = M[id] || M.bokeh; return "url(\"data:image/svg+xml," + encodeURIComponent(f(a, b)) + "\")"; };

/* ---- the other parts of a recipe ---- */
const PV83_FRAMES = [["glass", "Glass card"], ["postcard", "Postcard with stamp"], ["polaroid", "Instant photo"], ["tv", "Retro TV"], ["boarding", "Boarding pass"], ["gallery", "Gallery frame"], ["neon", "Neon sign"], ["tilt", "3D tilted screen"], ["phone", "Phone in hand"], ["billboard", "Billboard"]];
const PV83_LAYOUTS = [["right", "Words left, video right"], ["left", "Video left, words right"], ["stack", "Big video on top"], ["tilt", "Words left, video in 3D"]];
const PV83_FONTS = [["manrope", "Manrope (clean)"], ["unbounded", "Unbounded (wide)"], ["serif", "Instrument Serif (editorial)"], ["mono", "JetBrains Mono (tech)"], ["inter", "Inter (modern)"]];
const PV83_POINTS = [["bars", "Numbered with bars"], ["chips", "Chips"], ["timeline", "Timeline"], ["tiles", "3D tiles"]];
const PV83_GRADES = [["warm", "Warm film"], ["teal", "Teal & orange"], ["duo", "Duotone"], ["mono", "Mono tint"], ["vivid", "Vivid"], ["fade", "Faded matte"], ["noir", "Noir with accent"], ["pastel", "Pastel"]];
const PV83_ILLUS = [["tiles", "3D icon tiles"], ["orbit", "Orbiting icons"], ["flag", "Waving flag"], ["globe", "Spinning globe"], ["stats", "Live numbers"], ["photo", "Graded photo"]];
const PV83_MOODS = [["bright", "Bright pop"], ["calm", "Calm ambient"], ["drive", "Upbeat drive"], ["epic", "Epic swell"]];

/* icons that fit each kind of page (lucide-react names) */
const ICONS = {
  mr: ["ChartBar", "Users", "ClipboardList", "Search", "Globe", "Target", "ChartPie", "Mic", "Microscope", "Lightbulb"],
  dm: ["Megaphone", "TrendingUp", "Search", "Mail", "MessageCircle", "ThumbsUp", "Target", "Sparkles", "Video", "Rocket"],
  it: ["Code", "Cloud", "Smartphone", "Shield", "Bot", "Database", "Server", "Cpu", "Workflow", "Monitor"],
  af: ["Calculator", "Receipt", "Wallet", "Coins", "Landmark", "PiggyBank", "Banknote", "Percent", "Scale", "ChartLine"],
  fr: ["Sparkles", "Globe", "Award", "Users", "Rocket", "Star", "Handshake", "Lightbulb", "Compass", "Heart"],
  product: ["Layers", "Workflow", "Rocket", "Sparkles", "Gauge", "Bot", "Database", "Zap"],
  portal: ["Gift", "Star", "Smile", "Coins", "Users", "MessageCircle"],
  legal: ["Lock", "ShieldCheck", "Scale", "FileText", "Fingerprint", "BadgeCheck"],
  blog: ["BookOpen", "Newspaper", "Lightbulb", "PenTool", "Sparkles", "FileText"],
  industry: ["Factory", "Store", "Truck", "Hospital", "GraduationCap", "Landmark", "Plane", "Utensils"],
  downloads: ["Download", "FileText", "BookOpen", "Package", "BadgeCheck", "QrCode"],
  gov: ["Landmark", "Vote", "Flag", "Users", "ClipboardCheck", "Scale"],
};
/* words in a path or name that call for a particular icon */
const HINT = [[/survey|question|online-data/, "ClipboardList"], [/panel|consumer/, "Users"], [/health|hcp|patient|care/, "HeartPulse"], [/cati|voice|interview/, "Headphones"], [/qualitative|focus/, "MessageCircle"], [/quant|analytics|data|dashboard/, "ChartPie"], [/report|insight|mis/, "FileText"], [/seo|search/, "Search"], [/ads|ppc|performance/, "Target"], [/social|influencer/, "ThumbsUp"], [/content|blog/, "PenTool"], [/email/, "Mail"], [/whatsapp|chat/, "MessageCircle"], [/video/, "Video"], [/e-commerce|shop/, "ShoppingCart"], [/web|landing|website/, "Monitor"], [/mobile|app/, "Smartphone"], [/cloud|devops/, "Cloud"], [/security|cyber|privacy|protect/, "ShieldCheck"], [/ai|automation|bot/, "Bot"], [/test|qa/, "BadgeCheck"], [/api|integration/, "Workflow"], [/crm|erp|saas/, "Layers"], [/ui|ux|design/, "Palette"], [/tax|gst|tds|itr/, "Receipt"], [/payroll/, "Wallet"], [/budget|forecast|invest/, "TrendingUp"], [/audit|compliance|due-diligence/, "Scale"], [/cfo|corporate|finance/, "Landmark"], [/account|book/, "Calculator"], [/career/, "Briefcase"], [/team/, "Users"], [/gallery/, "Camera"], [/journey/, "Compass"], [/reach/, "Globe"], [/connect|qr/, "QrCode"], [/review|rate/, "Star"], [/talk|contact/, "MessageCircle"], [/esomar/, "BadgeCheck"], [/government/, "Landmark"]];

const hash = (s) => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const pick = (list, i) => list[((i % list.length) + list.length) % list.length];

/* the recipe for one page. n = the page's place in the list (a fresh combination for every page) */
function pv83Look(page, n, over) {
  const p = page || {}, i = Number.isFinite(n) ? n : hash(p.path || "/") % 997, h = hash(p.path || "/");
  const fam = p.fam || "fr";
  const c = p.country ? PV83_BY_ISO[p.country] : null;
  const K = p.panel ? PV83_PANELS[p.panel] : null;
  const panelI = { b2c: 0, b2b: 1, hc: 2 }[p.panel] || 0;
  let pal;
  if (c) pal = flagPalette(c, p.panel);
  else { const ids = p.kind === "product" || p.kind === "portal" || p.kind === "main" || p.kind === "legal" || p.kind === "blog" || p.kind === "industry" || p.kind === "gov" ? FAM_PAL.fr : FAM_PAL[fam] || FAM_PAL.fr; pal = PV83_PALETTES.find((x) => x.id === pick(ids, i * 5 + (h % 3))) || PV83_PALETTES[0]; }
  if (p.colors && p.colors.length >= 2 && !c) pal = { ...pal, id: pal.id + "-own", a: lift(p.colors[0], pal.bg), a2: lift(p.colors[1], pal.bg) };
  const motif = c ? c.motif : pick(FAM_MOTIF[fam] || FAM_MOTIF.fr, i * 3 + (h % 5));
  const frame = c ? pick(["postcard", "boarding", "tv", "polaroid", "gallery", "glass", "neon"], panelI * 2 + (h % 5)) : pick(PV83_FRAMES, i * 7 + (h % 4))[0];
  const layout = c ? pick(["right", "tilt", "left", "right"], panelI + (h % 3)) : pick(PV83_LAYOUTS, i * 3 + (h % 2))[0];
  const font = c ? pick(["unbounded", "manrope", "serif", "inter"], panelI + (h % 3)) : pick(PV83_FONTS, i * 11 + (h % 3))[0];
  const points = c ? pick(["bars", "tiles", "timeline", "chips"], panelI + (h % 2)) : pick(PV83_POINTS, i * 5 + (h % 2))[0];
  const grade = pick(PV83_GRADES, i * 13 + (c ? panelI * 3 : 0) + (h % 3))[0];
  const illus = c ? pick(["flag", "stats", "globe", "flag"], panelI + (h % 2)) : p.kind === "main" && /reach|journey/.test(p.path) ? "globe" : pick(["tiles", "orbit", "tiles", "photo", "orbit", "stats"], i * 7 + (h % 3));
  const mood = c ? pick(["bright", "drive", "calm"], panelI) : pick(PV83_MOODS, i * 3 + (h % 2))[0];
  const set = K ? K.icons : ICONS[p.kind] || ICONS[fam] || ICONS.fr;
  const hinted = HINT.filter(([re]) => re.test(String(p.path || "") + " " + String(p.name || "").toLowerCase())).map(([, ic]) => ic);
  const icons = [...new Set([...hinted, ...[0, 1, 2, 3, 4].map((k) => pick(set, i + k * 3 + (h % 4)))])].slice(0, 5);
  const look = { palette: pal.id, pal, motif, frame, layout, font, points, grade, illus, mood, icons, tilt: ((h % 9) - 4) * 0.8, seed: h % 100000, scale: c ? c.scale : pick(["major", "lydian", "dorian", "penta", "minor"], i + (h % 5)), country: c ? c.iso : "", panel: p.panel || "" };
  return applyOver(look, over);
}
/* apply the admin's (or an imported template's) choices on top of a recipe */
function applyOver(look, over) {
  if (!over || typeof over !== "object") return look;
  const o = { ...look };
  for (const k of ["motif", "frame", "layout", "font", "points", "grade", "illus", "mood", "scale"]) if (over[k]) o[k] = String(over[k]);
  if (Array.isArray(over.icons) && over.icons.length) o.icons = over.icons.map(String).slice(0, 6);
  if (over.palette && PV83_PALETTES.find((x) => x.id === over.palette)) { o.palette = over.palette; o.pal = PV83_PALETTES.find((x) => x.id === over.palette); }
  if (over.colors && typeof over.colors === "object") { const c = over.colors; o.pal = { ...o.pal, id: "custom", n: "Custom colours", ...Object.fromEntries(["bg", "bg2", "a", "a2", "p1", "p2", "pink"].filter((k) => /^#[0-9a-f]{3,8}$/i.test(String(c[k] || ""))).map((k) => [k, c[k]])) }; o.palette = "custom"; }
  if (over.country && PV83_BY_ISO[over.country]) o.country = over.country;
  if (Number.isFinite(+over.tilt)) o.tilt = +over.tilt;
  if (Number.isFinite(+over.seed)) o.seed = +over.seed;
  return o;
}

export { lum as pv83Lum, MOTIF_NAMES, PV83_FONTS, PV83_FRAMES, PV83_GRADES, PV83_ILLUS, PV83_LAYOUTS, PV83_MOODS, PV83_MOTIFS, PV83_PALETTES, PV83_POINTS, applyOver as pv83ApplyOver, hash as pv83Hash, mix as pv83Mix, pv83Look, pv83MotifUrl };
