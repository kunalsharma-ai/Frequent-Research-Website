/*
 * Country panel book PDF (build 65, update 3). Prefix PP5_ / pp5. Built in the browser with the bundled jsPDF (`dt`).
 *   pp5PanelBook(book, lead)   book = public/data/panel-books/<b2c|b2b>/<slug>.json (or a healthcare segment book)
 * Design: every book is graded in its own flag colours (pc5Pal) — a full-bleed cover with the HD flag as a tilted
 * card, flag-colour ribbons, the panel size and capital / currency / language cards; an "at a glance" dashboard;
 * chapter bands; and one card per table with the chart that suits it (people pictogram, 3D pie, 3D columns with the
 * currency coin, bars, stacked ribbon, tiles, skyline) plus a one-line insight. The round Frequent Research emblem is
 * the watermark on every page. Text uses Inter (public/data/pdf-fonts.json, OFL) so local currency symbols print;
 * Arabic / Khmer currency signs are written as ISO codes because the PDF font has no Arabic or Khmer letters.
 * Only figures from the panel workbook are used.
 */
import { frPdf } from '../../app/pdf.js';
import { FRK_EMBLEM, FRK_LOGO_FULL, frkFile, frkImg, frkPdfText } from './FrKit.jsx';
import { frpDate } from './Pdfs.jsx';
import { PC5_CAT, PC5_HC_SEG, PC5_P, pc5FlagUrl, pc5Flags, pc5Hex, pc5Meta, pc5Mix, pc5Num, pc5Pal, pc5Rgb, pc5SecIc, pc5Whole } from '../../data/PanelCountries65.jsx';
import { PC5_CH, pc5HcGroups, pc5HcIc, pc5Tables, pc5Top } from '../../pages/PanelCountry65.jsx';

let pp5FontP = null;
const pp5Fonts = () =>
  pp5FontP ||
  (pp5FontP = fetch("/data/pdf-fonts.json")
    .then((r) => (r.ok ? r.json() : null))
    .catch(() => null));
const pp5Cache = {};
const pp5Canvas = (w, h) => {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return [c, c.getContext("2d")];
};
const pp5Load = (src) =>
  new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = rej;
    im.src = src;
  });
async function pp5FlagPng(iso) {
  const k = "flag-" + iso;
  if (pp5Cache[k]) return pp5Cache[k];
  const f = await pc5Flags();
  if (!f || !f[iso]) return null;
  const svg = f[iso].replace("<svg", '<svg width="1200" height="900" preserveAspectRatio="none"');
  const im = await pp5Load(pc5FlagUrl(svg));
  const [c, x] = pp5Canvas(1200, 900);
  x.drawImage(im, 0, 0, 1200, 900);
  return (pp5Cache[k] = c.toDataURL("image/jpeg", 0.9));
}
function pp5Icon(n, hex, sw = 1.9) {
  const k = "ic-" + n + hex + sw;
  if (pp5Cache[k]) return pp5Cache[k];
  const [c, x] = pp5Canvas(144, 144);
  x.scale(6, 6);
  x.strokeStyle = hex;
  x.lineWidth = sw;
  x.lineCap = "round";
  x.lineJoin = "round";
  try {
    x.stroke(new Path2D(PC5_P[n] || PC5_P.spark));
  } catch (e) {
    /* Path2D unsupported: no icon */
  }
  return (pp5Cache[k] = c.toDataURL("image/png"));
}
/* a 3D coin with the currency sign, drawn with the browser's own fonts (covers every script) */
function pp5Coin(sym, a, b) {
  const k = "coin-" + sym + a + b;
  if (pp5Cache[k]) return pp5Cache[k];
  const S = 320;
  const [c, x] = pp5Canvas(S, S);
  x.fillStyle = pc5Mix(a, "#000000", 0.45);
  x.beginPath();
  x.ellipse(S / 2, S / 2 + 14, S / 2 - 14, S / 2 - 20, 0, 0, Math.PI * 2);
  x.fill();
  const g = x.createRadialGradient(S * 0.36, S * 0.3, 10, S / 2, S / 2, S / 2);
  g.addColorStop(0, pc5Mix(a, "#FFFFFF", 0.45));
  g.addColorStop(0.55, a);
  g.addColorStop(1, pc5Mix(a, "#000000", 0.3));
  x.fillStyle = g;
  x.beginPath();
  x.ellipse(S / 2, S / 2, S / 2 - 14, S / 2 - 20, 0, 0, Math.PI * 2);
  x.fill();
  x.strokeStyle = pc5Mix(b, "#FFFFFF", 0.35);
  x.lineWidth = 10;
  x.beginPath();
  x.ellipse(S / 2, S / 2, S / 2 - 36, S / 2 - 42, 0, 0, Math.PI * 2);
  x.stroke();
  x.fillStyle = "#FFFFFF";
  x.textAlign = "center";
  x.textBaseline = "middle";
  let fs = 150;
  x.font = `800 ${fs}px Inter, "Segoe UI", "Noto Sans", "Noto Sans Arabic", "Noto Sans Khmer", Arial, sans-serif`;
  while (x.measureText(sym).width > S * 0.56 && fs > 40) {
    fs -= 8;
    x.font = `800 ${fs}px Inter, "Segoe UI", "Noto Sans", Arial, sans-serif`;
  }
  x.shadowColor = "rgba(0,0,0,.35)";
  x.shadowOffsetY = 6;
  x.shadowBlur = 8;
  x.fillText(sym, S / 2, S / 2 + 6);
  x.shadowColor = "transparent";
  x.fillStyle = "rgba(255,255,255,.22)";
  x.beginPath();
  x.ellipse(S * 0.38, S * 0.28, S * 0.2, S * 0.09, -0.5, 0, Math.PI * 2);
  x.fill();
  return (pp5Cache[k] = c.toDataURL("image/png"));
}

const PP5_NAVY = [11, 20, 55],
  PP5_INK = [27, 33, 61],
  PP5_MUT = [92, 101, 128],
  PP5_LINE = [226, 230, 240];

async function pp5PanelBook(book, lead) {
  const dt = await frPdf(); /* build 72: jsPDF loads on the first download */
  const kind = book.kind;
  const b2b = kind === "b2b",
    hc = kind === "hc";
  const KL = hc ? (book.segT || "Healthcare") + " panel book" : b2b ? "Business professional panel book" : "Consumer panel book";
  const who = hc ? (PC5_HC_SEG.find((s) => s.k === book.seg) || {}).who || "members" : b2b ? "professionals" : "consumers";
  const iso = book.iso;
  const meta = pc5Meta(iso);
  const pal = pc5Pal(iso);
  const [fonts, emb, full, flag] = await Promise.all([pp5Fonts(), frkImg(FRK_EMBLEM), frkImg(FRK_LOGO_FULL).catch(() => null), pp5FlagPng(iso).catch(() => null)]);
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
  const curMap = { "د.إ": "AED ", "ر.ق": "QAR ", "ر.س": "SAR ", "﷼": iso === "IR" ? "IRR " : "SAR ", "៛": "KHR " };
  const T = (s) => {
    let t = String(s == null ? "" : s);
    for (const [k, v] of Object.entries(curMap)) t = t.split(k).join(v);
    if (!uni) return frkPdfText(t);
    return t
      .replace(/[‘’‛]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/ /g, " ")
      .replace(/[^ -~ -ɏ̀-ͯЀ-џḀ-ỿ -⁯₠-⃀℀-™−฿]/g, "")
      .replace(/\s{2,}/g, " ")
      .trim();
  };
  const W = 210,
    H = 297,
    M = 14,
    CW = W - 2 * M,
    G = 6,
    HW = (CW - G) / 2;
  const R = (h) => pc5Rgb(h);
  const A = R(pal.a),
    B = R(pal.b),
    C3 = R(pal.c),
    DEEP = R(pal.deep),
    IA = R(pal.ia),
    IB = R(pal.ib),
    TA = R(pal.ta),
    TB = R(pal.tb);
  const mix = (a, b, t) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
  const WH = [255, 255, 255];
  const SER = [A, B, C3, mix(A, WH, 0.45), mix(B, WH, 0.45), mix(A, PP5_NAVY, 0.45), mix(B, PP5_NAVY, 0.45), mix(C3, WH, 0.5), mix(C3, PP5_NAVY, 0.4)];
  const BAND = IA; /* dark flag shade: white text is always readable on it */
  const st = { y: 0, page: 1 };
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
  const poly = (pts, col, style = "F") => {
    doc.setFillColor(...col);
    const rel = pts.slice(1).map((p, k) => [p[0] - pts[k][0], p[1] - pts[k][1]]);
    doc.lines(rel, pts[0][0], pts[0][1], [1, 1], style, true);
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
  /* update 8: whole numbers beside every percentage */
  const nn = (r) => (r && typeof r[2] === "number" ? pc5Num(r[2]) : "");
  const numL = (r, xr, y, size = 5.8, col) => {
    const t = nn(r);
    if (!t) return;
    font("r", size, col || PP5_MUT);
    doc.text(t, xr, y, { align: "right" });
  };
  const watermark = () => op(0.055, () => doc.addImage(emb.data, "PNG", (W - 128) / 2, (H - 128 * (emb.h / emb.w)) / 2 + 6, 128, 128 * (emb.h / emb.w), "pp5-emb", "FAST"));
  const header = () => {
    /* update 9: soft flag-graded header wash with three flag-colour stripes */
    grad(0, 0, W, 22, mix(A, WH, 0.9), WH, 24, true);
    const sw = W / 3;
    [A, B, C3].forEach((c, i) => {
      doc.setFillColor(...c);
      doc.rect(i * sw, 0, sw + 0.2, 2.4, "F");
    });
    if (flag) {
      doc.setFillColor(...mix(PP5_LINE, PP5_NAVY, 0.3));
      doc.roundedRect(M - 0.5, 7.5, 13, 10, 1, 1, "F");
      doc.addImage(flag, "JPEG", M, 8, 12, 9, "pp5-flag", "FAST");
    }
    font("x", 8.5, PP5_NAVY);
    doc.text("FREQUENT RESEARCH", M + 15, 11.6);
    font("r", 6.8, PP5_MUT);
    doc.text(T(`${book.name} · ${KL}`), M + 15, 15.4);
    font("b", 7, IA);
    doc.text(T(book.region || "").toUpperCase(), W - M, 11.6, { align: "right" });
    font("r", 6.8, PP5_MUT);
    doc.text("frequentresearch.com", W - M, 15.4, { align: "right" });
    doc.setDrawColor(...PP5_LINE);
    doc.setLineWidth(0.3);
    doc.line(M, 20, W - M, 20);
    return 28;
  };
  const footer = (i, n) => {
    doc.setDrawColor(...PP5_LINE);
    doc.setLineWidth(0.3);
    doc.line(M, H - 15, W - M, H - 15);
    font("r", 6.6, PP5_MUT);
    doc.text("Frequent Research Fieldwork Solutions Pvt. Ltd.  |  info@frequentresearch.com  |  +91 81782 00573  |  www.frequentresearch.com", M, H - 10.6);
    if (lead && lead.first) doc.text(T(`Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? ", " + lead.company : ""} on ${frpDate()}`), M, H - 6.8);
    doc.setFillColor(...BAND);
    doc.roundedRect(W - M - 16, H - 13.6, 16, 6.4, 3.2, 3.2, "F");
    font("b", 7.2, WH);
    doc.text(`${i} / ${n}`, W - M - 8, H - 9.4, { align: "center" });
  };
  const newPage = () => {
    doc.addPage();
    st.page++;
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

  /* ── cover (update 9: full-bleed flag hero, round emblem badge, KPI tiles in the flag colours) ── */
  const FH = W * 0.75;
  grad(0, 0, W, H, mix(DEEP, PP5_NAVY, 0.15), [6, 9, 26], 90, true);
  if (flag) doc.addImage(flag, "JPEG", 0, 0, W, FH, "pp5-flagbig", "FAST");
  /* fade the flag into the deep colour, and darken the top for the logo */
  for (let i = 0; i < 30; i++) {
    const y0 = FH * 0.38 + (FH * 0.62 * i) / 30;
    op(Math.min(1, (i / 29) * 1.05), () => {
      doc.setFillColor(...mix(DEEP, [6, 9, 26], 0.15));
      doc.rect(0, y0, W, (FH * 0.62) / 30 + 0.4, "F");
    });
  }
  op(0.28, () => {
    doc.setFillColor(6, 9, 26);
    doc.rect(0, 0, W, 50, "F");
  });
  /* flag-colour light streaks */
  op(0.75, () => poly([[0, 170], [W, 160], [W, 162.2], [0, 172.2]], A));
  op(0.6, () => poly([[0, 173.2], [W, 163.2], [W, 164.8], [0, 174.8]], B));
  op(0.45, () => poly([[0, 175.8], [W, 165.8], [W, 166.9], [0, 176.9]], C3));
  if (full) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M, 12, 58, 30, 4, 4, "F");
    doc.addImage(full.data, "PNG", M + 3, 14, 52, 52 * (full.h / full.w), "pp5-full", "FAST");
  }
  /* round emblem badge */
  doc.setFillColor(255, 255, 255);
  doc.circle(W - M - 14, 27, 15, "F");
  doc.setDrawColor(...A);
  doc.setLineWidth(1.2);
  doc.circle(W - M - 14, 27, 16.4, "S");
  doc.addImage(emb.data, "PNG", W - M - 25, 16, 22, 22 * (emb.h / emb.w), "pp5-emb", "FAST");
  /* title block */
  doc.setFillColor(...A);
  doc.roundedRect(M, 104, 4, 30, 2, 2, "F");
  font("b", 9.5, mix(TA, WH, 0.35));
  doc.text(T(`${KL} · ${book.region || ""}`).toUpperCase(), M + 9, 110);
  font("x", book.name.length > 14 ? 36 : 48, WH);
  let cy = book.name.length > 14 ? 125 : 130;
  doc.splitTextToSize(T(book.name), CW - 10).slice(0, 2).forEach((l) => {
    doc.text(l, M + 9, cy);
    cy += book.name.length > 14 ? 14 : 17;
  });
  font("r", 11, [222, 228, 250]);
  const subl = hc ? `Our ${book.name} ${String(book.segT || "healthcare").toLowerCase()} panel, profile by profile.` : b2b ? `Our ${book.name} business professional panel: company size, revenue, sectors, departments and job titles.` : `Our ${book.name} consumer panel: who they are, what they earn, where they live and what they buy.`;
  doc.splitTextToSize(T(subl), CW - 10).slice(0, 2).forEach((l) => {
    doc.text(l, M + 9, cy);
    cy += 5.6;
  });
  /* KPI tiles */
  const nT = pc5Tables({ ...book, kind }).length;
  const kp9 = [
    ["users", book.panel ? pc5Num(book.panel) : "On request", `profiled ${who}`, A],
    ["layers", String(nT), "profile tables, % and numbers", B],
    ["coin", meta.cur ? meta.cur[0] : "-", meta.cur ? meta.cur[2] : "local currency", C3],
  ];
  const kw9 = (CW - 8) / 3,
    ky9 = 182;
  kp9.forEach(([ic, v, l, col], i) => {
    const x = M + i * (kw9 + 4);
    op(0.12, () => {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, ky9, kw9, 38, 4, 4, "F");
    });
    doc.setFillColor(...col);
    doc.roundedRect(x, ky9, kw9, 2.4, 1.2, 1.2, "F");
    if (ic === "coin" && meta.cur) doc.addImage(pp5Coin(meta.cur[1], pal.a, pal.b), "PNG", x + 5, ky9 + 7, 12, 12, "pp5-coin", "FAST");
    else {
      doc.setFillColor(...mix(col, PP5_NAVY, 0.2));
      doc.roundedRect(x + 5, ky9 + 7, 12, 12, 3, 3, "F");
      icon(ic, x + 7.5, ky9 + 9.5, 7, WH);
    }
    font("x", v.length > 9 ? 14 : 18, WH);
    doc.text(fit(v, kw9 - 10), x + 5, ky9 + 28);
    font("r", 7.4, [200, 210, 240]);
    doc.text(fit(l, kw9 - 10), x + 5, ky9 + 33.5);
  });
  /* facts row */
  const facts = [];
  if (meta.cap) facts.push(["landmark", "Capital", meta.cap]);
  if (meta.lang) facts.push(["lang", "Languages", meta.lang]);
  facts.push(["globe", "Region", book.region || ""]);
  let fx0 = M;
  facts.forEach(([ic, k, v]) => {
    icon(ic, fx0, 229, 7, mix(TA, WH, 0.3));
    font("b", 6.6, [170, 182, 225]);
    doc.text(T(k).toUpperCase(), fx0 + 9, 231.6);
    font("b", 9, WH);
    const vv = fit(v, 50);
    doc.text(vv, fx0 + 9, 236.4);
    fx0 += Math.max(40, doc.getTextWidth(vv) + 22);
  });
  /* ISO strip */
  op(0.1, () => {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M, H - 46, CW, 20, 4, 4, "F");
  });
  font("b", 8, WH);
  doc.text("ISO 20252:2019   ·   ISO 9001:2015   ·   ISO/IEC 27001:2013   ·   ESOMAR member", W / 2, H - 34.5, { align: "center" });
  font("r", 7, [190, 200, 235]);
  doc.text("Figures are modelled panel estimates for planning and feasibility; each study is confirmed by our team.", W / 2, H - 29.5, { align: "center" });
  font("r", 7.6, [196, 206, 240]);
  doc.text(T(`Edition ${frpDate()}${lead && lead.first ? `  ·  Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? ", " + lead.company : ""}` : ""}`), M, H - 12);
  font("b", 7.6, mix(TA, WH, 0.4));
  doc.text("www.frequentresearch.com", W - M, H - 12, { align: "right" });

  /* ── tables ── */
  const tables = pc5Tables({ ...book, kind });
  const cur = meta.cur ? meta.cur[1] : "";

  /* chart sizing */
  const vizType = (x) => {
    const r = x.rows;
    switch (x.cat) {
      case "gender":
        return r.length <= 3 ? "pict" : "donut";
      case "age":
      case "parents":
        return r.length <= 10 ? "cols" : "bars";
      case "pincome":
      case "hincome":
      case "revenue":
        return r.length <= 12 ? "colsc" : "bars";
      case "marital":
      case "home":
      case "industry":
        return pc5Whole(r) && r.length <= 7 ? "donut" : "bars";
      case "csize":
        return r.length <= 10 ? "sky" : "bars";
      case "ethnicity":
        return pc5Whole(r) && r.length <= 9 ? "ribbon" : "bars";
      case "house":
        return "tiles";
      default:
        return "bars";
    }
  };
  const isFull = (x, v) => v === "colsc" || v === "sky" || (v === "cols" && x.rows.length > 6) || v === "ribbon" || (v === "bars" && (x.rows.length > 14 || x.rows.some((r) => String(r[0]).length > 42))) || (v === "tiles" && x.rows.length > 9);
  const barLines = (rows, lw) => {
    font("r", 7.4);
    return rows.map((r) => Math.min(2, doc.splitTextToSize(T(r[0]), lw).length));
  };
  const vizH = (x, v, w) => {
    const n = x.rows.length;
    if (v === "pict") return 30;
    if (v === "donut") {
      font("r", 7.4);
      const lw = w - 39 - 13;
      return Math.max(40, x.rows.reduce((a, r) => a + (doc.splitTextToSize(T(r[0]), lw).length > 1 || typeof r[2] === "number" ? 8.4 : 5.4), 0) + 6);
    }
    if (v === "cols" || v === "colsc" || v === "sky") return 56;
    if (v === "tiles") {
      const per = w > 120 ? 4 : 3;
      return Math.ceil(n / per) * 14 + 2;
    }
    if (v === "ribbon") {
      const two = w > 120;
      const ls = barLines([...x.rows].sort((a, b) => b[1] - a[1]), two ? (w - 14) / 2 - 40 : w - 40);
      if (!two) return 14 + ls.reduce((a, b) => a + b * 4.2 + 1.2, 0);
      const h1 = ls.slice(0, Math.ceil(n / 2)).reduce((a, b) => a + b * 4.2 + 1.2, 0);
      return 14 + h1;
    }
    /* bars */
    const two = w > 120 && n > 14;
    const cw = two ? (w - 8) / 2 : w;
    const lw = cw * 0.46;
    const ls = barLines([...x.rows].sort((a, b) => b[1] - a[1]), lw);
    const rowsH = ls.map((l) => (l > 1 ? 7.6 : 5.2));
    if (!two) return rowsH.reduce((a, b) => a + b, 0) + 2;
    const half = Math.ceil(n / 2);
    return Math.max(rowsH.slice(0, half).reduce((a, b) => a + b, 0), rowsH.slice(half).reduce((a, b) => a + b, 0)) + 2;
  };
  const CARD_H = 12 + 8 + 4; /* header + insight + padding */

  /* charts */
  const drawPict = (rows, x, y, w) => {
    const tot = rows.reduce((a, r) => a + r[1], 0) || 1;
    const cells = [];
    let acc = 0;
    rows.forEach((r, i) => {
      const k = Math.round(((acc + r[1]) / tot) * 20) - Math.round((acc / tot) * 20);
      acc += r[1];
      for (let j = 0; j < k; j++) cells.push(i);
    });
    const per = 10,
      cw = Math.min(6.2, (w * 0.62) / per);
    cells.forEach((ci, i) => {
      const px = x + (i % per) * cw + cw / 2,
        py = y + Math.floor(i / per) * 13 + 2;
      const col = SER[ci % SER.length];
      doc.setFillColor(...col);
      doc.circle(px, py + 1.6, cw * 0.24, "F");
      if (ci === 1) poly([[px, py + 3.4], [px + cw * 0.42, py + 10.4], [px - cw * 0.42, py + 10.4]], col);
      else doc.roundedRect(px - cw * 0.28, py + 3.4, cw * 0.56, 7, 1, 1, "F");
    });
    let ly = y + 6;
    rows.forEach((r, i) => {
      const lx = x + w * 0.66;
      doc.setFillColor(...SER[i % SER.length]);
      doc.roundedRect(lx, ly - 3.2, 3.6, 3.6, 0.9, 0.9, "F");
      font("x", 12, PP5_NAVY);
      doc.text(pct(r[1]), lx + 6, ly);
      const pw0 = doc.getTextWidth(pct(r[1]));
      if (nn(r)) {
        font("r", 6.6, PP5_MUT);
        doc.text(nn(r), lx + 8 + pw0, ly);
      }
      font("r", 7.4, PP5_MUT);
      doc.text(fit(r[0], w * 0.34 - 6), lx + 6, ly + 4.2);
      ly += 12;
    });
  };
  const arc = (cx, cy, r0, r1, a0, a1, col) => {
    const seg = Math.max(2, Math.ceil(((a1 - a0) * 180) / Math.PI / 5));
    const pts = [];
    for (let k = 0; k <= seg; k++) {
      const a = a0 + ((a1 - a0) * k) / seg;
      pts.push([cx + r1 * Math.cos(a), cy + r1 * Math.sin(a)]);
    }
    for (let k = seg; k >= 0; k--) {
      const a = a0 + ((a1 - a0) * k) / seg;
      pts.push([cx + r0 * Math.cos(a), cy + r0 * Math.sin(a)]);
    }
    poly(pts, col);
  };
  const drawDonut = (rows, x, y, w) => {
    const tot = rows.reduce((a, r) => a + r[1], 0) || 1;
    const r = 15,
      cx = x + r + 2,
      cyy = y + r + 3;
    /* 3D: thickness below, then the face */
    let a0 = -Math.PI / 2;
    rows.forEach((row, i) => {
      const a1 = a0 + (row[1] / tot) * Math.PI * 2;
      arc(cx, cyy + 2.2, r * 0.56, r, a0, a1, mix(SER[i % SER.length], PP5_NAVY, 0.35));
      a0 = a1;
    });
    a0 = -Math.PI / 2;
    rows.forEach((row, i) => {
      const a1 = a0 + (row[1] / tot) * Math.PI * 2;
      arc(cx, cyy, r * 0.56, r, a0, a1, SER[i % SER.length]);
      a0 = a1;
    });
    op(0.18, () => arc(cx, cyy, r * 0.82, r, Math.PI * 1.05, Math.PI * 1.6, WH));
    const top = pc5Top(rows);
    font("x", 8.6, PP5_NAVY);
    doc.text(pct(top[1]), cx, cyy + 1.4, { align: "center" });
    let ly = y + 5;
    const lx = x + 2 * r + 9;
    rows.forEach((row, i) => {
      doc.setFillColor(...SER[i % SER.length]);
      doc.roundedRect(lx, ly - 2.9, 3.2, 3.2, 0.8, 0.8, "F");
      font("r", 7.4, PP5_INK);
      const ls = doc.splitTextToSize(T(row[0]), w - (lx - x) - 13);
      if (ls.length > 2) ls[1] = fit(ls[1] + " …", w - (lx - x) - 13);
      doc.text(ls.slice(0, 2), lx + 5, ly);
      font("b", 7.6, PP5_NAVY);
      doc.text(pct(row[1]), x + w - 1, ly, { align: "right" });
      numL(row, x + w - 1, ly + 3.3, 5.4);
      ly += ls.length > 1 || nn(row) ? 8.4 : 5.4;
    });
  };
  const box3d = (x, y, w, h, col, d = 2.2) => {
    poly([[x + w, y], [x + w + d, y - d * 0.7], [x + w + d, y + h - d * 0.7], [x + w, y + h]], mix(col, PP5_NAVY, 0.35));
    poly([[x, y], [x + d, y - d * 0.7], [x + w + d, y - d * 0.7], [x + w, y]], mix(col, WH, 0.35));
    doc.setFillColor(...col);
    doc.rect(x, y, w, h, "F");
  };
  const drawCols = (rows, x, y, w, coin) => {
    const n = rows.length;
    const max = Math.max(...rows.map((r) => r[1])) || 1;
    const baseY = y + 40;
    const slot = (w - 4) / n;
    const bw = Math.min(14, slot * 0.58);
    doc.setDrawColor(...PP5_LINE);
    doc.setLineWidth(0.3);
    doc.line(x, baseY, x + w, baseY);
    rows.forEach((r, i) => {
      const h = Math.max(1.2, (r[1] / max) * 30);
      const bx = x + 2 + i * slot + (slot - bw) / 2;
      box3d(bx, baseY - h, bw, h, i === rows.indexOf(pc5Top(rows)) ? A : mix(A, B, n > 1 ? i / (n - 1) : 0));
      font("b", 7.2, PP5_NAVY);
      doc.text(pct(r[1]), bx + bw / 2, baseY - h - 3, { align: "center" });
      if (nn(r)) {
        font("r", 5.4, PP5_MUT);
        doc.text(nn(r), bx + bw / 2, baseY - h - 6.2, { align: "center" });
      }
      font("r", n > 7 ? 5.8 : 6.6, PP5_MUT);
      const ll = doc.splitTextToSize(T(r[0]), slot - 1).slice(0, 3);
      doc.text(ll, bx + bw / 2, baseY + 3.6, { align: "center" });
    });
    if (coin && meta.cur) doc.addImage(pp5Coin(meta.cur[1], pal.a, pal.b), "PNG", x + w - 12, y - 1, 11, 11, "pp5-coin", "FAST");
  };
  const drawSky = (rows, x, y, w) => {
    const n = rows.length;
    const max = Math.max(...rows.map((r) => r[1])) || 1;
    const baseY = y + 40;
    const slot = (w - 4) / n;
    const bw = Math.min(16, slot * 0.66);
    rows.forEach((r, i) => {
      const h = 6 + (r[1] / max) * 26;
      const bx = x + 2 + i * slot + (slot - bw) / 2;
      const col = SER[i % 3];
      box3d(bx, baseY - h, bw, h, mix(col, PP5_NAVY, 0.1), 2.6);
      doc.setFillColor(255, 255, 255);
      for (let wy = baseY - h + 2.5; wy < baseY - 2.5; wy += 3.4)
        for (let wx = bx + 1.6; wx < bx + bw - 2; wx += 3) {
          op(0.55, () => doc.rect(wx, wy, 1.3, 1.6, "F"));
        }
      font("b", 7.2, PP5_NAVY);
      doc.text(pct(r[1]), bx + bw / 2, baseY - h - 3.4, { align: "center" });
      if (nn(r)) {
        font("r", 5.4, PP5_MUT);
        doc.text(nn(r), bx + bw / 2, baseY - h - 6.6, { align: "center" });
      }
      font("r", 6, PP5_MUT);
      doc.text(doc.splitTextToSize(T(r[0]), slot - 1).slice(0, 3), bx + bw / 2, baseY + 3.6, { align: "center" });
    });
    doc.setFillColor(...PP5_LINE);
    doc.rect(x, baseY, w, 0.8, "F");
  };
  const drawBars = (rows0, x, y, w) => {
    const rows = [...rows0].sort((a, b) => b[1] - a[1]);
    const n = rows.length;
    const two = w > 120 && n > 14;
    const cw = two ? (w - 8) / 2 : w;
    const lw = cw * 0.46;
    const max = rows[0][1] || 1;
    const half = two ? Math.ceil(n / 2) : n;
    let yy = y + 3.6,
      col = 0;
    rows.forEach((r, i) => {
      if (two && i === half) {
        col = 1;
        yy = y + 3.6;
      }
      const cx0 = x + col * (cw + 8);
      font("r", 7.4, PP5_INK);
      const ls = doc.splitTextToSize(T(r[0]), lw).slice(0, 2);
      if (doc.splitTextToSize(T(r[0]), lw).length > 2) ls[1] = fit(ls[1] + " …", lw);
      doc.text(ls, cx0, yy);
      const bx = cx0 + lw + 2,
        bw = cw - lw - 16;
      doc.setFillColor(238, 241, 248);
      doc.roundedRect(bx, yy - 2.7, bw, 3, 1.5, 1.5, "F");
      const ww = Math.max(1.2, (bw * r[1]) / max);
      grad(bx, yy - 2.7, ww, 3, i === 0 ? IA : A, i === 0 ? A : B, Math.max(2, Math.round(ww / 2.5)));
      if (nn(r)) {
        font("r", 5.6);
        const tw = doc.getTextWidth(nn(r));
        if (bx + ww + 1.5 + tw <= bx + bw) {
          font("r", 5.6, PP5_MUT);
          doc.text(nn(r), bx + ww + 1.5, yy - 0.4);
        } else if (ww > tw + 3) {
          font("b", 5.6, WH);
          doc.text(nn(r), bx + ww - 1.2, yy - 0.4, { align: "right" });
        }
      }
      font("b", 7.4, PP5_NAVY);
      doc.text(pct(r[1]), cx0 + cw, yy, { align: "right" });
      yy += ls.length > 1 ? 7.6 : 5.2;
    });
  };
  const drawRibbon = (rows0, x, y, w) => {
    const rows = [...rows0].sort((a, b) => b[1] - a[1]);
    const tot = rows.reduce((a, r) => a + r[1], 0) || 1;
    let bx = x;
    rows.forEach((r, i) => {
      const ww = (w * r[1]) / tot;
      doc.setFillColor(...SER[i % SER.length]);
      doc.rect(bx, y + 1, ww, 7, "F");
      bx += ww;
    });
    op(0.2, () => {
      doc.setFillColor(255, 255, 255);
      doc.rect(x, y + 1, w, 2.2, "F");
    });
    const two = w > 120;
    const n = rows.length;
    const half = two ? Math.ceil(n / 2) : n;
    const cw = two ? (w - 14) / 2 : w;
    let yy = y + 15,
      col = 0;
    rows.forEach((r, i) => {
      if (two && i === half) {
        col = 1;
        yy = y + 15;
      }
      const lx = x + col * (cw + 14);
      doc.setFillColor(...SER[i % SER.length]);
      doc.roundedRect(lx, yy - 2.9, 3.2, 3.2, 0.8, 0.8, "F");
      font("r", 7.4, PP5_INK);
      const ls = doc.splitTextToSize(T(r[0]), cw - 40).slice(0, 2);
      doc.text(ls, lx + 5, yy);
      font("b", 7.6, PP5_NAVY);
      doc.text(pct(r[1]), lx + cw, yy, { align: "right" });
      numL(r, lx + cw - 2.4 - doc.getTextWidth(pct(r[1])), yy);
      yy += ls.length * 4.2 + 1.2;
    });
  };
  const drawTiles = (rows0, x, y, w) => {
    const rows = [...rows0].sort((a, b) => b[1] - a[1]);
    const per = w > 120 ? 4 : 3;
    const gap = 2.4,
      tw = (w - gap * (per - 1)) / per;
    const max = rows[0][1] || 1;
    rows.forEach((r, i) => {
      const tx = x + (i % per) * (tw + gap),
        ty = y + Math.floor(i / per) * 14;
      const col = mix(WH, A, 0.12 + (r[1] / max) * 0.5);
      doc.setFillColor(...col);
      doc.roundedRect(tx, ty, tw, 12, 2, 2, "F");
      const dark = r[1] / max > 0.62;
      font("x", 9, dark ? WH : PP5_NAVY);
      doc.text(pct(r[1]), tx + 2.5, ty + 5);
      numL(r, tx + tw - 2, ty + 5, 5.8, dark ? WH : PP5_MUT);
      font("r", 6.4, dark ? WH : PP5_INK);
      doc.text(fit(r[0], tw - 5), tx + 2.5, ty + 9.6);
    });
  };
  const viz = (x, v, X, Y, w) => {
    if (v === "pict") return drawPict(x.rows, X, Y, w);
    if (v === "donut") return drawDonut(x.rows, X, Y, w);
    if (v === "cols") return drawCols(x.rows, X, Y, w, false);
    if (v === "colsc") return drawCols(x.rows, X, Y, w, true);
    if (v === "sky") return drawSky(x.rows, X, Y, w);
    if (v === "ribbon") return drawRibbon(x.rows, X, Y, w);
    if (v === "tiles") return drawTiles(x.rows, X, Y, w);
    return drawBars(x.rows, X, Y, w);
  };
  const card = (x, X, Y, w, h, v) => {
    const c = x.ic ? { ...(PC5_CAT[x.cat] || PC5_CAT.other), ic: x.ic } : PC5_CAT[x.cat] || PC5_CAT.other;
    op(0.5, () => {
      doc.setFillColor(...mix(PP5_LINE, PP5_NAVY, 0.1));
      doc.roundedRect(X + 0.8, Y + 1.2, w, h, 3, 3, "F");
    });
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...PP5_LINE);
    doc.setLineWidth(0.3);
    doc.roundedRect(X, Y, w, h, 3, 3, "FD");
    doc.setFillColor(...A);
    doc.roundedRect(X, Y, 1.6, h, 0.8, 0.8, "F");
    doc.setFillColor(...mix(WH, A, 0.14));
    doc.roundedRect(X + 4, Y + 3.4, 8, 8, 2, 2, "F");
    icon(c.ic, X + 5.2, Y + 4.6, 5.6, IA);
    font("x", 9.2, PP5_NAVY);
    doc.text(fit(x.t, w - 36), X + 14.5, Y + 8.6);
    font("r", 6.6, PP5_MUT);
    doc.text(`${x.rows.length} groups`, X + w - 4, Y + 8.6, { align: "right" });
    viz(x, v, X + 5, Y + 15, w - 10);
    const top = pc5Top(x.rows);
    const iy = Y + h - 5;
    doc.setFillColor(...mix(WH, B, 0.1));
    doc.roundedRect(X + 4, iy - 3.8, w - 8, 5.6, 2.8, 2.8, "F");
    font("b", 6.8, IB);
    doc.text(fit(`Largest group: ${top[0]} at ${pct(top[1])}${nn(top) ? " (" + nn(top) + ")" : ""}`, w - 14), X + 7, iy);
  };
  /* two-column masonry flow: half cards fill the shorter column; a half card
     with nothing beside it (next card is full width, or it is the last one) is
     widened so no page is left with an empty half */
  const flow = (list) => {
    const items = list.map((x) => {
      const v = vizType(x);
      const full = isFull(x, v);
      return { x, v, full, h: CARD_H + vizH(x, v, (full ? CW : HW) - 10) };
    });
    const BOT = H - 20;
    let cy = [st.y, st.y];
    const fresh = () => {
      newPage();
      cy = [st.y, st.y];
    };
    items.forEach((it, i) => {
      const nx = items[i + 1];
      if (!it.full) {
        let c = cy[0] <= cy[1] + 0.5 ? 0 : 1;
        if (cy[c] + it.h > BOT) {
          fresh();
          c = 0;
        }
        const alone = cy[1 - c] <= cy[c] + 0.5 && (!nx || nx.full);
        if (alone) {
          it.full = true;
          it.h = CARD_H + vizH(it.x, it.v, CW - 10);
        } else {
          card(it.x, M + c * (HW + G), cy[c], HW, it.h, it.v);
          cy[c] += it.h + 5;
          return;
        }
      }
      let y = Math.max(cy[0], cy[1]);
      if (y + it.h > BOT) {
        fresh();
        y = st.y;
      }
      card(it.x, M, y, CW, it.h, it.v);
      cy = [y + it.h + 5, y + it.h + 5];
    });
    st.y = Math.max(cy[0], cy[1]);
  };
  const band = (n, t, d, ic) => {
    need(40);
    st.y += 2;
    const y = st.y;
    grad(M, y, CW, 22, BAND, mix(BAND, B, 0.35), 40);
    op(0.14, () => {
      doc.setFillColor(255, 255, 255);
      doc.circle(M + CW - 10, y + 4, 18, "F");
    });
    font("x", 22, mix(BAND, WH, 0.35));
    doc.text(String(n).padStart(2, "0"), M + 6, y + 15);
    icon(ic, M + 22, y + 6.5, 9, WH);
    font("x", 13.5, WH);
    doc.text(T(t), M + 35, y + 10.6);
    font("r", 8, mix(WH, BAND, 0.18));
    doc.text(fit(d, CW - 44), M + 35, y + 16.4);
    st.y += 28;
  };

  /* ── at a glance ── */
  newPage();
  font("b", 8, IA);
  doc.text("AT A GLANCE", M, st.y);
  font("x", 22, PP5_NAVY);
  doc.text(T(`${book.name} in numbers`), M, st.y + 9);
  st.y += 16;
  const kpis = [
    [hc ? "users" : b2b ? "brief" : "people", book.panel ? pc5Num(book.panel) : "-", `profiled ${who}`],
    ["layers", String(tables.length), "profile tables in this book"],
    ["globe", book.region || "-", "region"],
    ["wallet", meta.cur ? meta.cur[0] : "-", meta.cur ? meta.cur[2] : "currency"],
  ];
  const kw = (CW - 9) / 4;
  kpis.forEach(([ic, v, l], i) => {
    const x = M + i * (kw + 3),
      y = st.y;
    i === 0 ? grad(x, y, kw, 30, BAND, A, 30) : (doc.setFillColor(...mix(WH, A, 0.08)), doc.roundedRect(x, y, kw, 30, 3, 3, "F"));
    if (i === 0) {
      doc.setFillColor(...BAND);
    }
    if (i === 3 && meta.cur) doc.addImage(pp5Coin(meta.cur[1], pal.a, pal.b), "PNG", x + 3, y + 3, 10, 10, "pp5-coin", "FAST");
    else icon(ic, x + 4, y + 4, 7.5, i === 0 ? WH : IA);
    font("x", v.length > 9 ? 11 : 15, i === 0 ? WH : PP5_NAVY);
    doc.text(fit(v, kw - 8), x + 4, y + 21);
    font("r", 6.8, i === 0 ? mix(WH, BAND, 0.15) : PP5_MUT);
    doc.text(fit(l, kw - 8), x + 4, y + 26.5);
  });
  st.y += 38;
  /* highlight cards: gender + age (or company size) */
  const g1 = tables.find((x) => x.cat === "gender");
  const g2 = tables.find((x) => (b2b ? x.cat === "csize" : x.cat === "age"));
  const hl = [g1, g2].filter(Boolean);
  if (hl.length) {
    const its = hl.map((x) => {
      const v = vizType(x);
      return { x, v, h: CARD_H + vizH(x, v, HW - 10) };
    });
    const h = Math.max(...its.map((i) => i.h));
    its.forEach((it, k) => card(it.x, M + k * (HW + G), st.y, HW, h, it.v));
    st.y += h + 8;
  }
  /* things to know */
  const facts2 = [];
  const add = (cat, text) => {
    const x = tables.find((y) => y.cat === cat);
    if (!x) return;
    const t = pc5Top(x.rows);
    facts2.push([PC5_CAT[cat].ic, text(t[0], pct(t[1]), x)]);
  };
  if (b2b) {
    add("csize", (l, p) => `The largest company-size band is ${l} (${p}).`);
    add("revenue", (l, p) => `Most common company revenue: ${l} (${p}).`);
    const secs = [...new Set(tables.filter((x) => x.group).map((x) => x.group))];
    if (secs.length) facts2.push(["layers", `${secs.length} sector ${secs.length === 1 ? "section" : "sections"}: ${secs.join(", ")}.`]);
    tables
      .filter((x) => x.cat === "industry")
      .slice(0, 2)
      .forEach((x) => {
        const t = pc5Top(x.rows);
        facts2.push(["pie", `${x.group ? x.group + ": " : ""}${t[0]} is the largest industry (${pct(t[1])}).`]);
      });
  } else if (hc) {
    add("age", (l, p) => `The largest age group is ${l} (${p}).`);
    add("region", (l, p) => `The most represented area is ${l} (${p}).`);
    /* the opening table of each later chapter */
    pc5HcGroups(tables)
      .slice(1)
      .filter((g) => !/income/i.test(g.t))
      .forEach((g) => {
        const x = g.list[0];
        const t = pc5Top(x.rows);
        facts2.push([pc5HcIc(g.t), `${x.t}: the largest group is ${t[0]} (${pct(t[1])}).`]);
      });
  } else {
    add("age", (l, p) => `The largest age group is ${l} (${p}).`);
    add("region", (l, p) => `The most represented area is ${l} (${p}).`);
    add("occupation", (l, p) => `Most common occupation: ${l} (${p}).`);
    add("pincome", (l, p) => `Most common personal income band: ${l} (${p}).`);
    add("tech", (l, p) => `Largest technology group: ${l} (${p}).`);
  }
  if (facts2.length) {
    need(14 + facts2.length * 9);
    font("x", 12, PP5_NAVY);
    doc.text("Things to know", M, st.y);
    st.y += 6;
    facts2.slice(0, 6).forEach(([ic, t], i) => {
      const y = st.y;
      doc.setFillColor(...(i % 2 ? WH : mix(WH, A, 0.06)));
      doc.roundedRect(M, y, CW, 8, 2, 2, "F");
      doc.setFillColor(...mix(WH, A, 0.16));
      doc.circle(M + 5, y + 4, 3, "F");
      icon(ic, M + 2.8, y + 1.8, 4.4, IA);
      font("r", 8.2, PP5_INK);
      doc.text(fit(t, CW - 14), M + 11, y + 5.3);
      st.y += 9;
    });
    st.y += 3;
  }
  font("r", 7.4, PP5_MUT);
  const how = `How to read this book: every figure is the share of the ${book.name} panel in each group. The distributions are modelled estimates for planning and feasibility, built from public demographic${hc ? ", health-system" : ""} and market patterns; they are not a count of individual panel members. Each table is its own distribution; some tables allow more than one answer, so they can add up to more than 100%. Feasibility for a specific audience is confirmed for each project.${meta.note ? " " + meta.note : ""}`;
  doc.splitTextToSize(T(how), CW).forEach((l) => {
    need(4.2);
    doc.text(l, M, st.y);
    st.y += 4;
  });

  /* ── chapters ── */
  newPage();
  if (b2b) {
    band(1, "Who they are and where they work", "Gender, company size, company revenue and region of the professionals on this panel.", "factory");
    flow(tables.filter((x) => !x.group));
    const groups = [];
    tables
      .filter((x) => x.group)
      .forEach((x) => {
        let g = groups.find((y) => y.gi === x.gi);
        if (!g) groups.push((g = { gi: x.gi, t: x.group, list: [] }));
        g.list.push(x);
      });
    groups.forEach((g, i) => {
      if (st.y > 60) newPage();
      band(i + 2, g.t, `${g.list.length} tables: industry mix, departments and job titles.`, pc5SecIc(g.t));
      flow(g.list);
    });
  } else if (hc) {
    pc5HcGroups(tables).forEach((g, i) => {
      if (i && st.y > 150) newPage();
      band(i + 1, g.t, `${g.list.length} ${g.list.length === 1 ? "table" : "tables"}: ${g.list.slice(0, 3).map((x) => x.t).join(", ")}${g.list.length > 3 ? " and more" : ""}.`, pc5HcIc(g.t));
      flow(g.list);
    });
  } else {
    let n = 0;
    PC5_CH.forEach(([k, t, ic, d]) => {
      const list = tables.filter((x) => (PC5_CAT[x.cat] || PC5_CAT.other).ch === k);
      if (!list.length) return;
      n++;
      if (n > 1 && st.y > 150) newPage();
      band(n, t, d, ic);
      flow(list);
    });
  }

  /* ── closing ── */
  need(70);
  st.y += 4;
  const y = st.y;
  grad(M, y, CW, 52, mix(DEEP, PP5_NAVY, 0.2), BAND, 40);
  if (flag) {
    op(0.3, () => doc.addImage(flag, "JPEG", M + CW - 58, y + 6, 52, 39, "pp5-flag", "FAST"));
  }
  font("b", 8, TA);
  doc.text("PLAN A STUDY", M + 8, y + 11);
  font("x", 16, WH);
  doc.text(T(`Field your next study in ${book.name}`), M + 8, y + 20);
  font("r", 9, [214, 222, 250]);
  doc.text("Feasibility, quotes and timelines within one working day.", M + 8, y + 27);
  doc.text("info@frequentresearch.com   |   +91 81782 00573 (call / WhatsApp)", M + 8, y + 34);
  font("b", 9, TB);
  doc.text("www.frequentresearch.com/lets-talk", M + 8, y + 42);
  st.y = y + 60;

  const n = doc.getNumberOfPages();
  for (let i = 2; i <= n; i++) {
    doc.setPage(i);
    footer(i, n);
  }
  const fname = `Frequent Research - ${book.name} ${hc ? book.segT || "Healthcare" : b2b ? "Business Professional" : "Consumer"} Panel Book.pdf`;
  doc.setProperties({ title: T(`${book.name} ${KL}`), subject: T(KL), author: "Frequent Research", creator: "frequentresearch.com" });
  doc.save(frkFile(fname));
  return "ok";
}

export { pp5Cache, pp5Canvas, pp5Coin, pp5FlagPng, pp5Fonts, pp5Icon, pp5Load, pp5PanelBook };
