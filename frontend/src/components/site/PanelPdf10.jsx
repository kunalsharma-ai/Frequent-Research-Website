/*
 * Build 65 update 11 — region and entire panel books (PDF). Prefix pb10 / PB10P_.
 *   pb10Book10(key, scope, entries, lead)
 *     key     b2c | b2b | hcp | caregivers | patients
 *     scope   a PB10_REG region or PB10_ALL (entire panel)
 *     entries the index rows of the countries in it
 * Design ("panel atlas"): an HD cover drawn on canvas — a deep sky in the region colours with a wall of waving flags in
 * perspective — the round Frequent Research emblem as a stamp, and KPI tiles; an at-a-glance page; the market ranking
 * with flags; (entire panel) the region split; the combined profile as chart cards (3D pie, people pictogram, 3D columns,
 * bars) with percentages and whole numbers; then one page per country graded in its own flag colours, with its waving
 * flag, currency coin, capital, languages and its key profiles; and a closing page. The round emblem is the watermark on
 * every page. Country PDFs (pp5PanelBook) are not changed. Only figures from the panel workbooks are used.
 */
import { frPdf } from '../../app/pdf.js';
import { FRK_EMBLEM, FRK_LOGO_FULL, frkFile, frkImg, frkPdfText } from './FrKit.jsx';
import { frpDate } from './Pdfs.jsx';
import { PC5_CAT, PC5_KINDS, PC5_MODEL_NOTE, pc5FlagUrl, pc5Flags, pc5Hex, pc5Meta, pc5Mix, pc5Num, pc5Pal, pc5Rgb, pc5Whole } from '../../data/PanelCountries65.jsx';
import { pc5Tables } from '../../pages/PanelCountry65.jsx';
import { PB10_REG, pb10Agg, pb10IsHc, pb10LoadMany, pb10Name, pb10PanelT, pb10Who } from '../../pages/PanelBooks10.jsx';
import { pp5Canvas, pp5Coin, pp5FlagPng, pp5Fonts, pp5Icon, pp5Load } from './PanelPdf65.jsx';

const pb10Img = {};
async function pb10FlagImg(iso) {
  if (pb10Img[iso] !== undefined) return pb10Img[iso];
  const f = await pc5Flags();
  if (!f || !f[iso]) return (pb10Img[iso] = null);
  try {
    const svg = f[iso].replace("<svg", '<svg width="600" height="400" preserveAspectRatio="none"');
    return (pb10Img[iso] = await pp5Load(pc5FlagUrl(svg)));
  } catch (e) {
    return (pb10Img[iso] = null);
  }
}
/* a waving flag on a solid background (JPEG keeps the file small): drawn in thin vertical slices with a sine offset and
   cloth shading, a pole-side shadow and a soft gloss */
function pb10Wave(im, w, h, bg, phase = 0) {
  const [c, x] = pp5Canvas(w, h);
  x.fillStyle = bg;
  x.fillRect(0, 0, w, h);
  const fw = w * 0.86,
    fh = fw * 0.62,
    ox = (w - fw) / 2,
    oy = (h - fh) / 2,
    A = fh * 0.06,
    sl = 3;
  x.save();
  x.shadowColor = "rgba(0,0,0,.45)";
  x.shadowBlur = w * 0.04;
  x.shadowOffsetY = h * 0.03;
  x.fillStyle = "rgba(0,0,0,.25)";
  x.fillRect(ox + 4, oy + 8, fw - 8, fh - 6);
  x.restore();
  for (let i = 0; i < fw; i += sl) {
    const t = i / fw;
    const dy = Math.sin(t * Math.PI * 2.2 + phase) * A * (0.25 + t * 0.75);
    x.drawImage(im, (t * im.width) | 0, 0, Math.max(1, ((sl / fw) * im.width) | 0) + 1, im.height, ox + i, oy + dy, sl + 0.6, fh);
    const s = Math.cos(t * Math.PI * 2.2 + phase);
    x.fillStyle = s > 0 ? `rgba(255,255,255,${(s * 0.16).toFixed(3)})` : `rgba(0,0,0,${(-s * 0.22).toFixed(3)})`;
    x.fillRect(ox + i, oy + dy, sl + 0.6, fh);
  }
  const g = x.createLinearGradient(0, oy, 0, oy + fh);
  g.addColorStop(0, "rgba(255,255,255,.18)");
  g.addColorStop(0.4, "rgba(255,255,255,0)");
  g.addColorStop(1, "rgba(0,0,0,.12)");
  x.fillStyle = g;
  x.fillRect(ox, oy - A, fw, fh + 2 * A);
  return c.toDataURL("image/jpeg", 0.86);
}
/* the HD cover art: a deep sky graded in the scope colours with a perspective wall of waving flags */
async function pb10CoverArt(entries, c1, c2) {
  const Wc = 1240,
    Hc = 1754;
  const [c, x] = pp5Canvas(Wc, Hc);
  const g = x.createLinearGradient(0, 0, 0, Hc);
  g.addColorStop(0, pc5Mix(c1, "#060A22", 0.72));
  g.addColorStop(0.55, "#070B24");
  g.addColorStop(1, "#04061A");
  x.fillStyle = g;
  x.fillRect(0, 0, Wc, Hc);
  const glow = (cx, cy, r, col, a) => {
    const rg = x.createRadialGradient(cx, cy, 0, cx, cy, r);
    rg.addColorStop(0, col + a);
    rg.addColorStop(1, col + "00");
    x.fillStyle = rg;
    x.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  };
  glow(Wc * 0.15, Hc * 0.18, 700, c1, "88");
  glow(Wc * 0.9, Hc * 0.35, 650, c2, "66");
  glow(Wc * 0.5, Hc * 0.95, 800, c1, "44");
  /* stars */
  for (let i = 0; i < 160; i++) {
    x.fillStyle = `rgba(255,255,255,${(0.15 + ((i * 37) % 60) / 100).toFixed(2)})`;
    x.beginPath();
    x.arc((i * 733) % Wc, (i * 419) % (Hc * 0.6), (i % 3) + 0.6, 0, Math.PI * 2);
    x.fill();
  }
  /* perspective floor grid */
  x.strokeStyle = "rgba(160,180,255,.13)";
  x.lineWidth = 1.4;
  const hy = Hc * 0.6;
  for (let i = -14; i <= 14; i++) {
    x.beginPath();
    x.moveTo(Wc / 2 + i * 18, hy);
    x.lineTo(Wc / 2 + i * 190, Hc);
    x.stroke();
  }
  for (let k = 0; k < 14; k++) {
    const y = hy + Math.pow(k / 13, 2) * (Hc - hy);
    x.beginPath();
    x.moveTo(0, y);
    x.lineTo(Wc, y);
    x.stroke();
  }
  /* the flag wall: rows recede into the distance (smaller, dimmer, higher) */
  const ims = (await Promise.all(entries.map((e) => pb10FlagImg(e.iso)))).filter(Boolean);
  if (ims.length) {
    const rows = ims.length > 30 ? 5 : ims.length > 12 ? 4 : 3;
    let k = 0;
    for (let r = rows - 1; r >= 0; r--) {
      const s = 0.52 + (r / (rows - 1 || 1)) * 0.48;
      const fw = 210 * s,
        fh = fw * 0.66;
      const y = Hc * 0.62 + r * 118 * s - (rows - 1 - r) * 40;
      const perRow = Math.ceil(Wc / (fw * 1.08)) + 1;
      const off = (r % 2) * fw * 0.5;
      for (let i = 0; i < perRow; i++) {
        const im = ims[k++ % ims.length];
        const fx = i * fw * 1.08 - off;
        x.globalAlpha = 0.35 + s * 0.65;
        const A = fh * 0.07;
        for (let j = 0; j < fw; j += 3) {
          const t = j / fw;
          const dy = Math.sin(t * Math.PI * 2 + i + r) * A;
          x.drawImage(im, (t * im.width) | 0, 0, Math.max(1, ((3 / fw) * im.width) | 0) + 1, im.height, fx + j, y + dy, 3.6, fh);
          const sh = Math.cos(t * Math.PI * 2 + i + r);
          x.fillStyle = sh > 0 ? `rgba(255,255,255,${(sh * 0.14).toFixed(3)})` : `rgba(0,0,0,${(-sh * 0.24).toFixed(3)})`;
          x.fillRect(fx + j, y + dy, 3.6, fh);
        }
      }
    }
    x.globalAlpha = 1;
    /* fade the wall into the night at the top and bottom */
    const f1 = x.createLinearGradient(0, Hc * 0.5, 0, Hc * 0.66);
    f1.addColorStop(0, "rgba(7,11,36,1)");
    f1.addColorStop(1, "rgba(7,11,36,0)");
    x.fillStyle = f1;
    x.fillRect(0, Hc * 0.5, Wc, Hc * 0.16);
    const f2 = x.createLinearGradient(0, Hc * 0.86, 0, Hc);
    f2.addColorStop(0, "rgba(4,6,26,0)");
    f2.addColorStop(1, "rgba(4,6,26,.96)");
    x.fillStyle = f2;
    x.fillRect(0, Hc * 0.86, Wc, Hc * 0.14);
  }
  return c.toDataURL("image/jpeg", 0.88);
}

async function pb10Book10(key, sc, entries0, lead) {
  const dt = await frPdf(); /* build 72: jsPDF loads on the first download */
  const hc = pb10IsHc(key);
  const b2b = key === "b2b";
  const who = pb10Who(key);
  const panelT = pb10PanelT(key);
  const scopeName = pb10Name(sc);
  const KL = sc.r ? `${sc.r} ${panelT.toLowerCase()} book` : `Entire ${panelT.toLowerCase()} book`;
  const entries = [...entries0].sort((a, b) => (b.panel || 0) - (a.panel || 0));
  const [fonts, emb, full, books, cover] = await Promise.all([
    pp5Fonts(),
    frkImg(FRK_EMBLEM),
    frkImg(FRK_LOGO_FULL).catch(() => null),
    pb10LoadMany(key, entries),
    pb10CoverArt(entries, sc.c1, sc.c2).catch(() => null),
  ]);
  const byslug = Object.fromEntries(books.map((b) => [b.slug, b]));
  const agg = pb10Agg(books);
  const doc = new dt({ unit: "mm", format: "a4", compress: true });
  let F = "helvetica",
    FX = "helvetica",
    FXs = "bold";
  if (fonts && fonts.r) {
    try {
      doc.addFileToVFS("Inter-R.ttf", fonts.r);
      doc.addFont("Inter-R.ttf", "Inter", "normal");
      doc.addFileToVFS("Inter-B.ttf", fonts.b);
      doc.addFont("Inter-B.ttf", "Inter", "bold");
      doc.addFileToVFS("Inter-X.ttf", fonts.x);
      doc.addFont("Inter-X.ttf", "InterX", "normal");
      F = "Inter";
      FX = "InterX";
      FXs = "normal";
    } catch (e) {
      F = FX = "helvetica";
      FXs = "bold";
    }
  }
  const uni = F === "Inter";
  const T = (s) => {
    const t = String(s == null ? "" : s)
      .replace(/د\.إ/g, "AED ")
      .replace(/ر\.ق/g, "QAR ")
      .replace(/ر\.س/g, "SAR ")
      .replace(/﷼/g, "SAR ")
      .replace(/៛/g, "KHR ");
    if (!uni) return frkPdfText(t);
    return t
      .replace(/[‘’‛]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/ /g, " ")
      .replace(/[^ -~ -ɏ̀-ͯЀ-џḀ-ỿ -⁯₠-⃀℀-™−฿]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };
  const W = 210,
    H = 297,
    M = 14,
    CW = W - 2 * M;
  const R = (h) => pc5Rgb(h);
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const WH = [255, 255, 255],
    NAVY = [11, 20, 55],
    NIGHT = [7, 11, 36],
    INK = [27, 33, 61],
    MUT = [92, 101, 128],
    LINE = [226, 230, 240],
    SOFT = [244, 246, 252];
  const S1 = R(sc.c1),
    S2 = R(sc.c2);
  const font = (f, s, col) => {
    doc.setFont(f === "x" ? FX : F, f === "x" ? FXs : f === "b" ? "bold" : "normal");
    doc.setFontSize(s);
    if (col) doc.setTextColor(...col);
  };
  const op = (o, fn) => {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: o }));
    fn();
    doc.restoreGraphicsState();
  };
  const grad = (x, y, w, h, c1, c2, steps = 40, vertical = false) => {
    for (let i = 0; i < steps; i++) {
      doc.setFillColor(...mix(c1, c2, i / (steps - 1)));
      if (vertical) doc.rect(x, y + (h * i) / steps, w, h / steps + 0.25, "F");
      else doc.rect(x + (w * i) / steps, y, w / steps + 0.25, h, "F");
    }
  };
  const poly = (pts, col) => {
    doc.setFillColor(...col);
    const rel = pts.slice(1).map((p, k) => [p[0] - pts[k][0], p[1] - pts[k][1]]);
    doc.lines(rel, pts[0][0], pts[0][1], [1, 1], "F", true);
  };
  const icon = (n, x, y, s, col) => {
    const d = pp5Icon(n, pc5Hex(col));
    if (d) doc.addImage(d, "PNG", x, y, s, s, "ic-" + n + col.join("-"), "FAST");
  };
  const fit = (s, w) => {
    const t = T(s);
    if (doc.getTextWidth(t) <= w) return t;
    let u = t;
    while (u.length > 3 && doc.getTextWidth(u + "…") > w) u = u.slice(0, -1);
    return u.trimEnd() + "…";
  };
  const pct = (v) => (Math.round(v * 10) / 10).toLocaleString("en-US") + "%";
  const num = (n) => pc5Num(Math.round(n || 0));
  const embH = (w) => w * (emb.h / emb.w);
  const watermark = () => op(0.05, () => doc.addImage(emb.data, "PNG", (W - 120) / 2, (H - embH(120)) / 2 + 8, 120, embH(120), "pb10-emb", "FAST"));
  const st = { y: 0 };
  let pageTheme = { a: S1, b: S2, label: scopeName, flag: null };
  const header = () => {
    const { a, b, label } = pageTheme;
    grad(0, 0, W, 3, a, b, 30);
    font("x", 8.2, NAVY);
    doc.text("FREQUENT RESEARCH", M, 11);
    font("r", 6.8, MUT);
    doc.text(T(KL), M, 15);
    doc.setFillColor(...mix(a, WH, 0.86));
    const lw = Math.min(80, doc.getTextWidth(T(label)) + 12);
    doc.roundedRect(W - M - lw, 7, lw, 9, 4.5, 4.5, "F");
    font("b", 7.2, mix(a, NAVY, 0.45));
    doc.text(fit(label, lw - 8), W - M - lw / 2, 12.7, { align: "center" });
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(M, 19, W - M, 19);
    return 26;
  };
  const footer = (i, n) => {
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(M, H - 15, W - M, H - 15);
    font("r", 6.4, MUT);
    doc.text("Frequent Research Fieldwork Solutions Pvt. Ltd.  |  info@frequentresearch.com  |  +91 81782 00573  |  www.frequentresearch.com", M, H - 10.6);
    if (lead && lead.first) doc.text(T(`Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? ", " + lead.company : ""} on ${frpDate()}`), M, H - 6.8);
    doc.setFillColor(...S1);
    doc.roundedRect(W - M - 18, H - 13.8, 18, 6.6, 3.3, 3.3, "F");
    font("b", 7, WH);
    doc.text(`${i} / ${n}`, W - M - 9, H - 9.5, { align: "center" });
  };
  const plain = [];
  const newPage = (theme, opts = {}) => {
    doc.addPage();
    if (theme) pageTheme = theme;
    if (opts.dark) {
      plain.push(doc.getNumberOfPages());
      return;
    }
    grad(0, 0, W, H, mix(pageTheme.a, WH, 0.955), mix(pageTheme.b, WH, 0.97), 30, true);
    watermark();
    st.y = header();
  };
  const need = (h) => {
    if (st.y + h > H - 20) {
      newPage();
      return true;
    }
    return false;
  };
  const toc = [];
  const mark = (t) => toc.push([t, doc.getNumberOfPages()]);

  /* ── 1 cover ── */
  if (cover) doc.addImage(cover, "JPEG", 0, 0, W, H, "pb10-cover", "FAST");
  else grad(0, 0, W, H, mix(S1, NIGHT, 0.7), NIGHT, 60, true);
  plain.push(1);
  if (full) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M, 13, 56, 29, 4, 4, "F");
    doc.addImage(full.data, "PNG", M + 3, 15, 50, 50 * (full.h / full.w), "pb10-full", "FAST");
  }
  /* emblem stamp */
  doc.setFillColor(255, 255, 255);
  doc.circle(W - M - 15, 28, 15.5, "F");
  doc.setDrawColor(...S2);
  doc.setLineWidth(1.1);
  doc.circle(W - M - 15, 28, 17.2, "S");
  doc.setLineDashPattern([0.8, 1.2], 0);
  doc.circle(W - M - 15, 28, 19.4, "S");
  doc.setLineDashPattern([], 0);
  doc.addImage(emb.data, "PNG", W - M - 26.5, 17, 23, embH(23), "pb10-emb", "FAST");
  /* title */
  font("b", 9, mix(S2, WH, 0.4));
  doc.text(T(`${panelT.toUpperCase()}  ·  ${sc.r ? "REGION BOOK" : "ENTIRE PANEL BOOK"}`), M, 66);
  grad(M, 69.5, 46, 1.4, S1, S2, 20);
  const big = T(sc.r ? sc.r : "The whole panel");
  font("x", big.length > 14 ? 38 : 50, WH);
  let cy = 90;
  doc.splitTextToSize(big, CW).slice(0, 2).forEach((l) => {
    doc.text(l, M, cy);
    cy += big.length > 14 ? 15 : 18;
  });
  font("r", 11.5, [220, 228, 252]);
  const sub = sc.r ? `${entries.length} countries, ${num(entries.reduce((a, e) => a + (e.panel || 0), 0))} profiled ${who}. ${sc.line}` : `${entries.length} countries in ${new Set(entries.map((e) => e.region)).size} regions, ${num(entries.reduce((a, e) => a + (e.panel || 0), 0))} profiled ${who}.`;
  doc.splitTextToSize(T(sub), CW - 20).slice(0, 3).forEach((l) => {
    doc.text(l, M, cy);
    cy += 6;
  });
  /* KPI tiles */
  const tot = entries.reduce((a, e) => a + (e.panel || 0), 0);
  const kp = [
    ["users", num(tot), `profiled ${who}`],
    ["globe", String(entries.length), sc.r ? "countries" : `countries · ${new Set(entries.map((e) => e.region)).size} regions`],
    ["pie", String(agg.length), "combined profiles"],
    ["flag", entries[0] ? entries[0].name : "-", "largest market"],
  ];
  const kw = (CW - 9) / 4,
    ky = cy + 6;
  kp.forEach(([ic, v, l], i) => {
    const x = M + i * (kw + 3);
    op(0.14, () => {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, ky, kw, 30, 3.5, 3.5, "F");
    });
    grad(x, ky, kw, 1.6, S1, S2, 12);
    icon(ic, x + 4, ky + 5, 6, mix(S2, WH, 0.3));
    font("x", v.length > 9 ? 11 : 15, WH);
    doc.text(fit(v, kw - 8), x + 4, ky + 20);
    font("r", 6.6, [200, 210, 240]);
    doc.text(fit(l, kw - 8), x + 4, ky + 25.5);
  });
  font("b", 7.6, WH);
  doc.text("ISO 20252:2019   ·   ISO 9001:2015   ·   ISO/IEC 27001:2013   ·   ESOMAR member", W / 2, H - 22, { align: "center" });
  font("r", 7.2, [196, 206, 240]);
  doc.text(T(`Edition ${frpDate()}${lead && lead.first ? `  ·  Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? ", " + lead.company : ""}` : ""}`), M, H - 11);
  font("b", 7.4, mix(S2, WH, 0.4));
  doc.text("www.frequentresearch.com", W - M, H - 11, { align: "right" });

  /* ── 2 at a glance + contents (contents filled at the end) ── */
  newPage();
  const tocPage = doc.getNumberOfPages();
  mark("At a glance");
  font("b", 8, S1);
  doc.text("AT A GLANCE", M, st.y);
  font("x", 22, NAVY);
  doc.text(T(`${scopeName}: ${panelT.toLowerCase()}`), M, st.y + 10);
  st.y += 18;
  /* a ribbon of every flag in the scope */
  const ribH = 9,
    ribW = ribH * 1.5,
    perRow = Math.floor((CW + 2) / (ribW + 2));
  for (let i = 0; i < entries.length; i++) {
    const fl = await pp5FlagPng(entries[i].iso).catch(() => null);
    const x = M + (i % perRow) * (ribW + 2),
      y = st.y + Math.floor(i / perRow) * (ribH + 2);
    doc.setFillColor(...LINE);
    doc.roundedRect(x - 0.3, y - 0.3, ribW + 0.6, ribH + 0.6, 1, 1, "F");
    if (fl) doc.addImage(fl, "JPEG", x, y, ribW, ribH, "pb10f-" + entries[i].iso, "FAST");
  }
  st.y += Math.ceil(entries.length / perRow) * (ribH + 2) + 6;
  /* key numbers */
  const gl = [
    ["users", num(tot), `profiled ${who}`, S1],
    ["globe", String(entries.length), "countries", S2],
    ["stack", num(entries.reduce((a, e) => a + (e.tables || 0), 0)), "country profile tables", mix(S1, S2, 0.5)],
    ["pie", String(agg.length), "combined profiles in this book", mix(S1, NAVY, 0.3)],
  ];
  const gw = (CW - 6) / 2;
  gl.forEach(([ic, v, l, col], i) => {
    const x = M + (i % 2) * (gw + 6),
      y = st.y + Math.floor(i / 2) * 26;
    doc.setFillColor(...SOFT);
    doc.roundedRect(x, y, gw, 22, 4, 4, "F");
    doc.setFillColor(...col);
    doc.circle(x + 11, y + 11, 7, "F");
    icon(ic, x + 7, y + 7, 8, WH);
    font("x", 16, NAVY);
    doc.text(T(v), x + 22, y + 11);
    font("r", 7.6, MUT);
    doc.text(fit(l, gw - 26), x + 22, y + 16.5);
  });
  st.y += 56;
  /* contents placeholder box */
  font("b", 8, S1);
  doc.text("INSIDE THIS BOOK", M, st.y);
  const tocY = st.y + 4;
  st.y += 4;
  /* methodology note */
  const noteY = H - 52;
  doc.setFillColor(...mix(S1, WH, 0.92));
  doc.roundedRect(M, noteY, CW, 30, 4, 4, "F");
  icon("spark", M + 5, noteY + 5, 6, mix(S1, NAVY, 0.3));
  font("b", 8, NAVY);
  doc.text("How to read this book", M + 14, noteY + 9);
  font("r", 7, INK);
  doc.text(doc.splitTextToSize(T(PC5_MODEL_NOTE + " Combined profiles add up the whole numbers of the countries that share the same profile; the percentage is of their combined panel."), CW - 20), M + 14, noteY + 14);

  /* ── 3 market by market ── */
  newPage();
  mark("Market by market");
  const band = (no, t, d, ic, col1 = S1, col2 = S2) => {
    need(30);
    const y = st.y;
    grad(M, y, CW, 22, mix(col1, NAVY, 0.35), mix(col2, NAVY, 0.2), 40);
    op(0.18, () => {
      doc.setFillColor(255, 255, 255);
      doc.circle(M + CW - 12, y + 4, 16, "F");
    });
    font("x", 22, mix(col2, WH, 0.35));
    doc.text(String(no).padStart(2, "0"), M + 6, y + 14.5);
    icon(ic, M + 22, y + 6.5, 9, WH);
    font("x", 13, WH);
    doc.text(fit(t, CW - 50), M + 35, y + 10.5);
    font("r", 7.4, [214, 222, 250]);
    doc.text(fit(d, CW - 50), M + 35, y + 16.2);
    st.y = y + 30;
  };
  band(1, "Market by market", `${entries.length} countries ranked by profiled ${who}, with each country's share of the ${sc.r ? "region" : "panel"}.`, "stack");
  const maxP = entries[0] ? entries[0].panel || 1 : 1;
  for (let i = 0; i < entries.length; i++) {
    const e = entries[i];
    need(9);
    const y = st.y;
    const p = pc5Pal(e.iso);
    const a = R(p.a),
      b = R(p.b);
    if (i % 2 === 0) {
      doc.setFillColor(...SOFT);
      doc.rect(M, y - 1, CW, 8, "F");
    }
    font("b", 7.4, MUT);
    doc.text(String(i + 1), M + 5, y + 4.4, { align: "center" });
    const fl = await pp5FlagPng(e.iso).catch(() => null);
    if (fl) doc.addImage(fl, "JPEG", M + 10, y + 0.6, 8, 5.6, "pb10f-" + e.iso, "FAST");
    font("b", 8, INK);
    doc.text(fit(e.name, 40), M + 21, y + 4.6);
    const bx = M + 64,
      bw = CW - 64 - 40,
      w = Math.max(0.8, ((e.panel || 0) / maxP) * bw);
    doc.setFillColor(...LINE);
    doc.roundedRect(bx, y + 1.6, bw, 3.6, 1.8, 1.8, "F");
    grad(bx, y + 1.6, w, 3.6, a, b, 16);
    font("b", 8, NAVY);
    doc.text(num(e.panel), W - M - 16, y + 4.6, { align: "right" });
    font("r", 6.8, MUT);
    doc.text(pct(((e.panel || 0) / (tot || 1)) * 100), W - M - 1, y + 4.6, { align: "right" });
    st.y += 8;
  }
  st.y += 4;

  /* ── 4 regions (entire panel) ── */
  const RG = PB10_REG.map((r) => ({ ...r, L: entries.filter((e) => e.region === r.r) }))
    .filter((r) => r.L.length)
    .map((r) => ({ ...r, n: r.L.reduce((a, e) => a + (e.panel || 0), 0) }));
  const arc = (cx, cy, r0, r1, a0, a1, col) => {
    const seg = Math.max(2, Math.ceil(((a1 - a0) * 180) / Math.PI / 4));
    const pts = [];
    for (let k = 0; k <= seg; k++) {
      const an = a0 + ((a1 - a0) * k) / seg;
      pts.push([cx + r1 * Math.cos(an), cy + r1 * Math.sin(an)]);
    }
    for (let k = seg; k >= 0; k--) {
      const an = a0 + ((a1 - a0) * k) / seg;
      pts.push([cx + r0 * Math.cos(an), cy + r0 * Math.sin(an)]);
    }
    poly(pts, col);
  };
  const donut3d = (parts, cx, cy, r, inner = 0.56, depth = 2.6) => {
    const t = parts.reduce((a, p) => a + p[0], 0) || 1;
    let a0 = -Math.PI / 2;
    parts.forEach(([v, col]) => {
      const a1 = a0 + (v / t) * Math.PI * 2;
      arc(cx, cy + depth, r * inner, r, a0, a1, mix(col, NAVY, 0.4));
      a0 = a1;
    });
    a0 = -Math.PI / 2;
    parts.forEach(([v, col]) => {
      const a1 = a0 + (v / t) * Math.PI * 2;
      arc(cx, cy, r * inner, r, a0, a1, col);
      a0 = a1;
    });
    op(0.2, () => arc(cx, cy, r * 0.84, r, Math.PI * 1.05, Math.PI * 1.55, WH));
  };
  if (!sc.r && RG.length > 1) {
    newPage();
    mark("Region by region");
    band(2, "Region by region", `${RG.length} regions; every region also has its own book and page.`, "globe");
    const cx = M + 34,
      cy = st.y + 32;
    donut3d(RG.map((r) => [r.n, R(r.c1)]), cx, cy, 28);
    font("x", 11, NAVY);
    doc.text(num(tot), cx, cy + 1, { align: "center" });
    font("r", 6, MUT);
    doc.text(T(who), cx, cy + 5, { align: "center" });
    let ly = st.y + 6;
    RG.forEach((r) => {
      const x = M + 76;
      doc.setFillColor(...R(r.c1));
      doc.roundedRect(x, ly, 4, 12, 2, 2, "F");
      font("b", 9.5, NAVY);
      doc.text(T(r.r), x + 8, ly + 5);
      font("r", 7.2, MUT);
      doc.text(T(`${r.L.length} countries · ${num(r.n)} ${who}`), x + 8, ly + 10);
      font("x", 12, R(r.c1));
      doc.text(pct((r.n / (tot || 1)) * 100), W - M, ly + 8, { align: "right" });
      ly += 15;
    });
    st.y = Math.max(cy + 40, ly + 6);
  }

  /* ── 5 combined profile ── */
  const SER = (a, b) => [a, b, mix(a, WH, 0.45), mix(b, WH, 0.45), mix(a, NAVY, 0.4), mix(b, NAVY, 0.4), mix(a, b, 0.5), mix(mix(a, b, 0.5), WH, 0.5)];
  const card = (x, y, w, h, t, ic, a, b, foot) => {
    op(0.5, () => {
      doc.setFillColor(...mix(NAVY, WH, 0.86));
      doc.roundedRect(x + 0.6, y + 1.2, w, h, 4, 4, "F");
    });
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.25);
    doc.roundedRect(x, y, w, h, 4, 4, "FD");
    grad(x + 4, y, w - 8, 1.2, a, b, 16);
    doc.setFillColor(...mix(a, WH, 0.85));
    doc.circle(x + 8.5, y + 8.5, 4.6, "F");
    icon(ic, x + 5.6, y + 5.6, 5.8, mix(a, NAVY, 0.25));
    font("b", 8.6, NAVY);
    const tl = doc.splitTextToSize(T(t), w - 20).slice(0, 2);
    doc.text(tl, x + 15, y + 7.6 + (tl.length > 1 ? -1.6 : 1.4));
    if (foot) {
      font("r", 5.8, MUT);
      doc.text(fit(foot, w - 10), x + 5, y + h - 3.2);
    }
  };
  const insight = (rows, x, y, w, a) => {
    const top = rows.reduce((m, r) => (r[1] > m[1] ? r : m), rows[0]);
    doc.setFillColor(...mix(a, WH, 0.9));
    doc.roundedRect(x, y, w, 7, 3.5, 3.5, "F");
    icon("spark", x + 2, y + 1.2, 4.6, mix(a, NAVY, 0.3));
    font("r", 6.6, INK);
    doc.text(fit(`Largest group: ${top[0]}  ·  ${pct(top[1])}  ·  ${num(top[2])}`, w - 10), x + 8, y + 4.7);
  };
  const vizOf = (x) => {
    const r = x.rows,
      whole = pc5Whole(r);
    if (x.cat === "gender" && r.length <= 3) return "pict";
    if ((x.cat === "age" || x.cat === "parents" || x.cat === "csize") && r.length <= 9) return "cols";
    if (whole && r.length <= 6) return "donut";
    return "bars";
  };
  const barRows = (x) => {
    const r = [...x.rows].sort((a, b) => b[1] - a[1]);
    return r.length > 14 ? r.slice(0, 14) : r;
  };
  const vizH = (x, v, w) => (v === "pict" ? 30 : v === "cols" ? 46 : v === "donut" ? Math.max(38, x.rows.length * 8 + 4) : barRows(x).length * (w > 120 ? 6.2 : 7.4) + 2);
  const drawPict = (rows, x, y, w, a, b) => {
    const tot2 = rows.reduce((s, r) => s + r[1], 0) || 1;
    const cols = SER(a, b);
    const cells = [];
    let acc = 0;
    rows.forEach((r, i) => {
      const k = Math.round(((acc + r[1]) / tot2) * 20) - Math.round((acc / tot2) * 20);
      acc += r[1];
      for (let j = 0; j < k; j++) cells.push(i);
    });
    const cw = Math.min(5.6, (w * 0.56) / 10);
    cells.forEach((ci, i) => {
      const px = x + (i % 10) * cw + cw / 2,
        py = y + Math.floor(i / 10) * 13;
      const col = cols[ci];
      doc.setFillColor(...col);
      doc.circle(px, py + 1.8, cw * 0.24, "F");
      if (ci === 1) poly([[px, py + 3.4], [px + cw * 0.4, py + 10.2], [px - cw * 0.4, py + 10.2]], col);
      else doc.roundedRect(px - cw * 0.27, py + 3.4, cw * 0.54, 6.8, 1, 1, "F");
    });
    let ly = y + 5;
    rows.forEach((r, i) => {
      const lx = x + w * 0.62;
      doc.setFillColor(...cols[i]);
      doc.roundedRect(lx, ly - 3, 3.4, 3.4, 0.9, 0.9, "F");
      font("x", 11, NAVY);
      doc.text(pct(r[1]), lx + 5.5, ly);
      font("r", 6.2, MUT);
      doc.text(fit(`${r[0]} · ${num(r[2])}`, w * 0.38 - 7), lx + 5.5, ly + 4);
      ly += 10.5;
    });
  };
  const drawCols = (rows, x, y, w, a, b) => {
    const n = rows.length,
      max = Math.max(...rows.map((r) => r[1])) || 1,
      baseY = y + 34,
      slot = w / n,
      bw = Math.min(13, slot * 0.56),
      d = 2;
    doc.setFillColor(...LINE);
    doc.rect(x, baseY, w, 0.6, "F");
    rows.forEach((r, i) => {
      const h = Math.max(1, (r[1] / max) * 24);
      const bx = x + i * slot + (slot - bw) / 2;
      const col = mix(a, b, n > 1 ? i / (n - 1) : 0);
      poly([[bx + bw, baseY - h], [bx + bw + d, baseY - h - d * 0.7], [bx + bw + d, baseY - d * 0.7], [bx + bw, baseY]], mix(col, NAVY, 0.35));
      poly([[bx, baseY - h], [bx + d, baseY - h - d * 0.7], [bx + bw + d, baseY - h - d * 0.7], [bx + bw, baseY - h]], mix(col, WH, 0.35));
      grad(bx, baseY - h, bw, h, mix(col, WH, 0.15), col, 10, true);
      font("b", 6.6, NAVY);
      doc.text(pct(r[1]), bx + bw / 2, baseY - h - 4.4, { align: "center" });
      font("r", 5, MUT);
      doc.text(num(r[2]), bx + bw / 2, baseY - h - 1.6, { align: "center" });
      font("r", n > 7 ? 5.4 : 6, MUT);
      doc.text(doc.splitTextToSize(T(r[0]), slot - 1).slice(0, 2), bx + bw / 2, baseY + 3.4, { align: "center" });
    });
  };
  const drawDonut = (rows, x, y, w, a, b) => {
    const cols = SER(a, b);
    const r = 15;
    donut3d(rows.map((row, i) => [row[1], cols[i % cols.length]]), x + r + 2, y + r + 2, r);
    const top = rows.reduce((m, q) => (q[1] > m[1] ? q : m), rows[0]);
    font("x", 8, NAVY);
    doc.text(pct(top[1]), x + r + 2, y + r + 3.4, { align: "center" });
    let ly = y + 4;
    const lx = x + 2 * r + 9;
    rows.forEach((row, i) => {
      doc.setFillColor(...cols[i % cols.length]);
      doc.roundedRect(lx, ly - 2.8, 3, 3, 0.8, 0.8, "F");
      font("r", 6.8, INK);
      doc.text(fit(row[0], w - (lx - x) - 22), lx + 4.6, ly);
      font("b", 7, NAVY);
      doc.text(pct(row[1]), x + w, ly, { align: "right" });
      font("r", 5.4, MUT);
      doc.text(num(row[2]), x + w, ly + 3.2, { align: "right" });
      ly += 8;
    });
  };
  const drawBars = (x0, x, y, w, a, b) => {
    const rows = barRows(x0);
    const max = rows[0] ? rows[0][1] || 1 : 1;
    const rh = w > 120 ? 6.2 : 7.4;
    const lw = w * 0.42,
      bw = w - lw - 26;
    rows.forEach((r, i) => {
      const yy = y + i * rh;
      font("r", 6.6, INK);
      doc.text(fit(r[0], lw - 2), x, yy + 3.4);
      doc.setFillColor(...SOFT);
      doc.roundedRect(x + lw, yy + 0.8, bw, 3.6, 1.8, 1.8, "F");
      grad(x + lw, yy + 0.8, Math.max(1, (r[1] / max) * bw), 3.6, i === 0 ? a : mix(a, WH, 0.25), b, 12);
      font("b", 6.8, NAVY);
      doc.text(pct(r[1]), x + w - 11, yy + 3.6, { align: "right" });
      font("r", 5.4, MUT);
      doc.text(num(r[2]), x + w, yy + 3.6, { align: "right" });
    });
  };
  const draw = (x, v, px, py, pw, a, b) => (v === "pict" ? drawPict(x.rows, px, py, pw, a, b) : v === "cols" ? drawCols(x.rows, px, py, pw, a, b) : v === "donut" ? drawDonut(x.rows, px, py, pw, a, b) : drawBars(x, px, py, pw, a, b));
  const flow = (list, a, b, footFn) => {
    const G = 6,
      HW = (CW - G) / 2;
    let pending = null;
    const put = (x, v, cx, y, w, h) => {
      card(cx, y, w, h, x.t + (v === "bars" && x.rows.length > barRows(x).length ? ` (top ${barRows(x).length} of ${x.rows.length})` : ""), x.ic || (PC5_CAT[x.cat] || PC5_CAT.other).ic || "pie", a, b, footFn ? footFn(x) : "");
      draw(x, v, cx + 5, y + 15, w - 10, a, b);
      insight(x.rows, cx + 5, y + h - 12 - (footFn ? 4 : 0), w - 10, a);
    };
    list.forEach((x) => {
      const v = vizOf(x);
      const wide = v === "bars" && (x.rows.length > 9 || x.rows.some((r) => String(r[0]).length > 34));
      const w = wide ? CW : HW;
      const h = 15 + vizH(x, v, w - 10) + 12 + (footFn ? 4 : 0);
      if (wide) {
        if (pending) {
          st.y = pending.y + pending.h + 5;
          pending = null;
        }
        need(h);
        put(x, v, M, st.y, w, h);
        st.y += h + 5;
        return;
      }
      if (pending) {
        if (pending.y + h <= H - 20) {
          put(x, v, M + HW + G, pending.y, HW, h);
          st.y = pending.y + Math.max(pending.h, h) + 5;
          pending = null;
          return;
        }
        st.y = pending.y + pending.h + 5;
        pending = null;
      }
      need(h);
      put(x, v, M, st.y, HW, h);
      pending = { y: st.y, h };
    });
    if (pending) st.y = pending.y + pending.h + 5;
  };
  if (agg.length) {
    newPage({ a: S1, b: S2, label: scopeName + " · combined profile" });
    mark("Combined profile");
    const groups = [...new Set(agg.map((x) => x.group))];
    groups.forEach((g, gi) => {
      const list = agg.filter((x) => x.group === g);
      if (gi && st.y > 150) newPage();
      band(gi + (sc.r ? 2 : 3), g || "Combined profile", `${list.length} profiles added up across ${scopeName}.`, "pie");
      flow(list, S1, S2, (x) => `Base: ${num(x.base)} ${who} in ${x.countries} countries`);
    });
  }

  /* ── 6 country pages, each graded in its own flag colours ── */
  const PRI = b2b ? ["gender", "csize", "industry", "dept", "role"] : hc ? ["gender", "age", "other"] : ["gender", "age", "education", "occupation", "marital", "lifestage"];
  const countryPage = async (e) => {
    const bk = byslug[e.slug];
    const p = pc5Pal(e.iso);
    const meta = pc5Meta(e.iso);
    const a = R(p.a),
      b = R(p.b),
      deep = R(p.deep);
    newPage({ a, b, label: `${e.name} · ${e.region}` });
    /* hero band with the waving flag */
    const y0 = st.y - 2;
    grad(M, y0, CW, 58, mix(deep, NIGHT, 0.2), mix(a, NAVY, 0.35), 50);
    op(0.25, () => {
      doc.setFillColor(...b);
      doc.circle(M + CW - 10, y0 + 6, 26, "F");
    });
    const im = await pb10FlagImg(e.iso);
    if (im) {
      const bgHex = pc5Hex(mix(mix(deep, NIGHT, 0.2), mix(a, NAVY, 0.35), 0.75));
      const wav = pb10Wave(im, 520, 380, bgHex, (e.slug.length % 5) * 0.7);
      doc.addImage(wav, "JPEG", M + CW - 70, y0 + 3, 66, 48, "pb10w-" + e.iso, "FAST");
    }
    font("b", 7.6, mix(R(p.ta), WH, 0.3));
    doc.text(T(`${e.region}  ·  ${panelT}`).toUpperCase(), M + 7, y0 + 11);
    font("x", e.name.length > 16 ? 20 : 26, WH);
    doc.text(fit(e.name, CW - 80), M + 7, y0 + 24);
    font("x", 18, WH);
    doc.text(num(e.panel), M + 7, y0 + 38);
    font("r", 7.6, [214, 222, 250]);
    doc.text(T(`profiled ${who}  ·  ${pct(((e.panel || 0) / (tot || 1)) * 100)} of the ${sc.r ? "region" : "panel"}  ·  rank ${entries.indexOf(e) + 1} of ${entries.length}`), M + 7, y0 + 44);
    /* fact chips */
    const facts = [];
    if (meta.cap) facts.push(["landmark", meta.cap]);
    if (meta.lang) facts.push(["lang", meta.lang]);
    let fx = M + 7;
    facts.forEach(([ic, v]) => {
      const t = fit(v, 46);
      font("b", 6.6, WH);
      const fw = doc.getTextWidth(t) + 11;
      op(0.18, () => {
        doc.setFillColor(255, 255, 255);
        doc.roundedRect(fx, y0 + 47.5, fw, 6.4, 3.2, 3.2, "F");
      });
      icon(ic, fx + 1.6, y0 + 48.4, 4.6, WH);
      doc.text(t, fx + 7.2, y0 + 51.9);
      fx += fw + 3;
    });
    if (meta.cur) {
      doc.addImage(pp5Coin(meta.cur[1], p.a, p.b), "PNG", fx + 1, y0 + 45.6, 10, 10, "pb10c-" + e.iso, "FAST");
      font("b", 6.6, WH);
      doc.text(T(meta.cur[0]), fx + 12.5, y0 + 51.9);
    }
    st.y = y0 + 64;
    if (!bk) {
      font("r", 8, MUT);
      doc.text("This country's profile tables could not be loaded for this book; see its own panel book.", M, st.y + 4);
      st.y += 12;
      return;
    }
    const ts = pc5Tables({ ...bk, kind: bk.kind === "hc" ? "hc" : bk.kind }).filter((x) => x.rows.length >= 2);
    const pick = [];
    PRI.forEach((c) => {
      const x = ts.find((y) => y.cat === c && !pick.includes(y));
      if (x && pick.length < 3) pick.push(x);
    });
    ts.forEach((x) => pick.length < 3 && !pick.includes(x) && x.cat !== "region" && x.cat !== "ethnicity" && pick.push(x));
    const small = pick.map((x) => ({ ...x, rows: x.rows.length > 7 ? [...x.rows].sort((m, n) => n[1] - m[1]).slice(0, 7) : x.rows }));
    flow(small, a, b);
    font("r", 6.6, MUT);
    need(10);
    doc.text(T(`${ts.length} profile tables for ${e.name} are in its own panel book: frequentresearch.com/downloads/${PC5_KINDS[hc ? "hc" : key].sec}/${e.slug}`), M, st.y + 2);
    st.y += 6;
  };
  let chap = sc.r ? 3 : 4;
  if (sc.r) {
    mark("Country by country");
    for (const e of entries) await countryPage(e);
  } else {
    for (const r of RG) {
      /* region divider */
      newPage({ a: R(r.c1), b: R(r.c2), label: r.r }, { dark: true });
      grad(0, 0, W, H, mix(R(r.c1), NIGHT, 0.7), NIGHT, 70, true);
      op(0.35, () => {
        doc.setFillColor(...R(r.c2));
        doc.circle(W * 0.85, H * 0.2, 60, "F");
      });
      op(0.06, () => doc.addImage(emb.data, "PNG", (W - 150) / 2, (H - embH(150)) / 2, 150, embH(150), "pb10-emb", "FAST"));
      mark(r.r);
      font("x", 60, mix(R(r.c2), WH, 0.2));
      doc.text(String(chap++).padStart(2, "0"), M, 70);
      font("b", 9, mix(R(r.c2), WH, 0.4));
      doc.text(T(`${r.code}  ·  REGION`), M, 86);
      font("x", 34, WH);
      doc.text(doc.splitTextToSize(T(r.r), CW).slice(0, 2), M, 102);
      font("r", 11, [220, 228, 252]);
      doc.text(T(`${r.L.length} countries  ·  ${num(r.n)} profiled ${who}  ·  ${pct((r.n / (tot || 1)) * 100)} of the panel`), M, 128);
      doc.text(T(r.line), M, 135);
      const fw2 = 24,
        fh2 = 16,
        per2 = 6;
      for (let i = 0; i < r.L.length; i++) {
        const fl = await pp5FlagPng(r.L[i].iso).catch(() => null);
        const x = M + (i % per2) * (fw2 + 6),
          y = 150 + Math.floor(i / per2) * (fh2 + 10);
        if (y > H - 30) break;
        if (fl) {
          doc.setFillColor(255, 255, 255);
          doc.roundedRect(x - 0.6, y - 0.6, fw2 + 1.2, fh2 + 1.2, 1.4, 1.4, "F");
          doc.addImage(fl, "JPEG", x, y, fw2, fh2, "pb10f-" + r.L[i].iso, "FAST");
        }
        font("r", 6.2, [200, 210, 240]);
        doc.text(fit(r.L[i].name, fw2 + 4), x, y + fh2 + 4.5);
      }
      for (const e of r.L) await countryPage(e);
    }
  }

  /* ── closing page ── */
  newPage(null, { dark: true });
  grad(0, 0, W, H, mix(S1, NIGHT, 0.65), NIGHT, 70, true);
  op(0.07, () => doc.addImage(emb.data, "PNG", (W - 160) / 2, 60, 160, embH(160), "pb10-emb", "FAST"));
  mark("Plan a study");
  font("b", 9, mix(S2, WH, 0.35));
  doc.text("PLAN A STUDY", M, 60);
  font("x", 28, WH);
  doc.text(doc.splitTextToSize(T(`Field your next study ${sc.r ? "across " + sc.r : "in any of our " + entries.length + " countries"}`), CW), M, 74);
  font("r", 11, [220, 228, 252]);
  doc.text("Feasibility, quotes and timelines within one working day.", M, 104);
  const pts = ["Verified, profiled respondents with quality checks at every step", "Multi-country studies run by one project team", "Percentages and whole numbers for every profile, ready for planning", "ISO 20252, ISO 9001 and ISO/IEC 27001 certified; ESOMAR member"];
  pts.forEach((t, i) => {
    doc.setFillColor(...S2);
    doc.circle(M + 2.5, 120 + i * 11 - 1.4, 2.5, "F");
    icon("check", M + 0.6, 120 + i * 11 - 3.3, 3.8, NAVY);
    font("r", 10, WH);
    doc.text(T(t), M + 9, 120 + i * 11);
  });
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(M, 175, CW, 34, 5, 5, "F");
  font("b", 10, NAVY);
  doc.text("info@frequentresearch.com", M + 8, 188);
  doc.text("+91 81782 00573 (call / WhatsApp)", M + 8, 196);
  font("b", 10, S1);
  doc.text("www.frequentresearch.com/lets-talk", M + 8, 204);
  if (full) doc.addImage(full.data, "PNG", W - M - 52, 180, 46, 46 * (full.h / full.w), "pb10-full", "FAST");
  font("r", 7, [190, 200, 235]);
  doc.text(doc.splitTextToSize(T(PC5_MODEL_NOTE), CW), M, 232);

  /* ── contents, footers ── */
  doc.setPage(tocPage);
  if (sc.r && entries.length > 1) {
    const top = entries.slice(0, 6);
    const rest = entries.slice(6).reduce((a, e) => a + (e.panel || 0), 0);
    const cols = [S1, S2, mix(S1, NAVY, 0.35), mix(S2, S1, 0.5), mix(S2, NAVY, 0.3), mix(S1, WH, 0.45), [190, 198, 222]];
    const parts = top.map((e, i) => [e.panel || 0, cols[i], e.name]);
    if (rest > 0) parts.push([rest, cols[6], `${entries.length - 6} more countries`]);
    const dy = tocY + toc.slice(1).length * 7.4 + 10;
    if (dy + 66 < H - 56) {
      font("b", 8, S1);
      doc.text("SHARE OF THE REGION", M, dy);
      const cx = M + 32,
        cy = dy + 32;
      donut3d(parts.map((x) => [x[0], x[1]]), cx, cy, 26);
      font("x", 10, NAVY);
      doc.text(num(tot), cx, cy + 1, { align: "center" });
      font("r", 5.8, MUT);
      doc.text(T(who), cx, cy + 5, { align: "center" });
      parts.forEach(([v, col, nm], i) => {
        const lx = M + 72 + (i % 2) * ((CW - 72) / 2),
          ly = dy + 12 + Math.floor(i / 2) * 11;
        doc.setFillColor(...col);
        doc.roundedRect(lx, ly - 3.4, 4.2, 4.2, 1, 1, "F");
        font("b", 7.6, NAVY);
        doc.text(fit(nm, (CW - 72) / 2 - 10), lx + 6.4, ly);
        font("r", 6.8, MUT);
        doc.text(T(`${pct((v / (tot || 1)) * 100)}  ·  ${num(v)}`), lx + 6.4, ly + 4);
      });
    }
  }
  let ty = tocY + 3;
  const tocL = toc.slice(1);
  const twoCol = tocL.length > 8;
  tocL.forEach(([t, pg], i) => {
    const x = M + (twoCol && i >= Math.ceil(tocL.length / 2) ? CW / 2 + 3 : 0);
    const yy = ty + (twoCol ? i % Math.ceil(tocL.length / 2) : i) * 7.4;
    const cw2 = twoCol ? CW / 2 - 3 : CW;
    doc.setFillColor(...(i % 2 ? SOFT : mix(S1, WH, 0.93)));
    doc.roundedRect(x, yy, cw2, 6.2, 3.1, 3.1, "F");
    font("b", 7.4, NAVY);
    doc.text(fit(t, cw2 - 22), x + 4, yy + 4.2);
    font("b", 7.4, S1);
    doc.text(String(pg), x + cw2 - 4, yy + 4.2, { align: "right" });
  });
  const n = doc.getNumberOfPages();
  for (let i = 2; i <= n; i++) {
    if (plain.includes(i)) continue;
    doc.setPage(i);
    footer(i, n);
  }
  const fname = `Frequent Research - ${sc.r ? sc.r : "Entire"} ${panelT} Book.pdf`;
  doc.setProperties({ title: T(`${scopeName} ${panelT} book`), subject: T(KL), author: "Frequent Research", creator: "frequentresearch.com" });
  doc.save(frkFile(fname));
  return "ok";
}

export { pb10Book10 };
