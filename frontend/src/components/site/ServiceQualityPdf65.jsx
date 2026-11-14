/*
 * PDFs for the service quality processes and the per-service brochures (build 65, update 7). Prefix sq7 / SQP_.
 * Same design family as the panel books and the market research quality PDF: Inter font, round-logo watermark on every
 * page, colour band header in the service colours, page pills, numbered chapter bands, a graphic for every chapter.
 *   sq7Doc(opts)            shared page kit (cover helpers, header/footer, bands, cards, chips, notes)
 *   sq7Book(slug, lead)     the Digital Marketing / IT & Development / Accounts & Finance quality process
 *   sv7Brochure(v, s, lead) one service's brochure (ServicePdf65.jsx), content from the services data + quality standards
 * Content: src/data/ServiceQuality65.jsx, the same text as the web pages.
 */
import { frPdf } from '../../app/pdf.js';
import { FRK_EMBLEM, FRK_LOGO_FULL, FRK_V, frkFile, frkImg, frkPdfText } from './FrKit.jsx';
import { frpDate } from './Pdfs.jsx';
import { pc5Rgb } from '../../data/PanelCountries65.jsx';
import { pp5Cache, pp5Canvas, pp5Fonts } from './PanelPdf65.jsx';
import { qp5Ic } from '../../pages/Quality65.jsx';
import { qppHex, qppIcon } from './QualityPdf65.jsx';
import { SQ7_DOCS } from '../../data/ServiceQuality65.jsx';
import { SQ7_META, SQ7_PIC, sq7Count, sq7Kind, sq7Lead, sq7SecIc, sq7Tail } from '../../pages/ServiceQuality65.jsx';

const SQP_INK = [16, 27, 54],
  SQP_TX = [58, 70, 98],
  SQP_MUT = [100, 116, 139],
  SQP_LINE = [222, 229, 240],
  SQP_WH = [255, 255, 255];

async function sq7Doc({ c1, c2, deep, headL, headR, lead }) {
  const dt = await frPdf(); /* build 72: jsPDF loads on the first download */
  const [fonts, emb, full] = await Promise.all([pp5Fonts(), frkImg(FRK_EMBLEM), frkImg(FRK_LOGO_FULL).catch(() => null)]);
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
    const t = String(s == null ? "" : s);
    if (!uni) return frkPdfText(t);
    return t
      .replace(/[‘’]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(/[^ -~ -ɏ–—•…·−₹€£]/g, "")
      .trim();
  };
  const W = 210,
    H = 297,
    M = 14,
    CW = W - 2 * M,
    G = 6,
    HW = (CW - G) / 2;
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
  const A = pc5Rgb(c1),
    B = pc5Rgb(c2),
    D = pc5Rgb(deep);
  /* text-safe shades of the service colours */
  const AI = mix(A, SQP_INK, 0.25),
    BI = mix(B, SQP_INK, 0.45);
  const st = { y: 0 };
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
  const grad = (x, y, w, h, k1, k2, steps = 40, vertical = false) => {
    for (let i = 0; i < steps; i++) {
      doc.setFillColor(...mix(k1, k2, i / (steps - 1)));
      if (vertical) doc.rect(x, y + (h * i) / steps, w, h / steps + 0.25, "F");
      else doc.rect(x + (w * i) / steps, y, w / steps + 0.25, h, "F");
    }
  };
  const icon = (n, x, y, s, col) => doc.addImage(qppIcon(n, qppHex(col)), "PNG", x, y, s, s, "qic-" + n + col.join("-"), "FAST");
  const lines = (s, w) => doc.splitTextToSize(T(s), w);
  const para = (s, x, y, w, lh = 4.6) => {
    const l = lines(s, w);
    doc.text(l, x, y, { lineHeightFactor: lh / (doc.getFontSize() * 0.3528) });
    return l.length * lh;
  };
  const embH = 128 * (emb.h / emb.w);
  const watermark = () => op(0.05, () => doc.addImage(emb.data, "PNG", (W - 128) / 2, (H - embH) / 2 + 6, 128, embH, "sqp-emb", "FAST"));
  const header = () => {
    grad(0, 0, W, 2.4, A, B, 30);
    doc.addImage(emb.data, "PNG", M, 7, 10, 10 * (emb.h / emb.w), "sqp-emb", "FAST");
    font("x", 8.5, SQP_INK);
    doc.text("FREQUENT RESEARCH", M + 13, 11.6);
    font("r", 6.8, SQP_MUT);
    doc.text(T(headL), M + 13, 15.4);
    font("b", 7, AI);
    doc.text(T(headR).toUpperCase(), W - M, 11.6, { align: "right" });
    font("r", 6.8, SQP_MUT);
    doc.text("frequentresearch.com", W - M, 15.4, { align: "right" });
    doc.setDrawColor(...SQP_LINE);
    doc.setLineWidth(0.3);
    doc.line(M, 20, W - M, 20);
    return 28;
  };
  const footer = (i, n) => {
    doc.setDrawColor(...SQP_LINE);
    doc.setLineWidth(0.3);
    doc.line(M, H - 15, W - M, H - 15);
    font("r", 6.6, SQP_MUT);
    doc.text("Frequent Research Fieldwork Solutions Pvt. Ltd.  |  info@frequentresearch.com  |  +91 81782 00573  |  www.frequentresearch.com", M, H - 10.6);
    if (lead && lead.first) doc.text(T(`Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? ", " + lead.company : ""} on ${frpDate()}`), M, H - 6.8);
    grad(W - M - 16, H - 13.6, 16, 6.4, A, mix(A, B, 0.6), 16);
    font("b", 7.2, SQP_WH);
    doc.text(`${i} / ${n}`, W - M - 8, H - 9.4, { align: "center" });
  };
  const newPage = () => {
    doc.addPage();
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
  let chap = 0;
  const band = (t, d, ic, minRoom = 60) => {
    need(minRoom);
    chap++;
    const y = st.y;
    grad(M, y, CW, 24, D, mix(D, A, 0.55), 40);
    op(0.16, () => {
      doc.setFillColor(255, 255, 255);
      doc.circle(M + CW - 12, y + 2, 20, "F");
    });
    doc.setFillColor(...B);
    doc.rect(M, y + 22.6, CW * 0.42, 1.4, "F");
    font("x", 20, mix(B, SQP_WH, 0.35));
    doc.text(String(chap).padStart(2, "0"), M + 6, y + 15.5);
    icon(ic, M + 22, y + 7, 9, SQP_WH);
    font("x", 12.5, SQP_WH);
    doc.text(lines(t, CW - 45)[0], M + 35, y + 11);
    let rest = "";
    if (d) {
      font("r", 7.6, mix(SQP_WH, D, 0.2));
      const dl = lines(d, CW - 45);
      if (dl.length === 1) doc.text(dl[0], M + 35, y + 17);
      else rest = d;
    }
    st.y = y + 31;
    if (rest) text(rest, 8.6);
  };
  const card = (x, y, w, h, accent = A) => {
    op(0.45, () => {
      doc.setFillColor(...mix(SQP_LINE, SQP_INK, 0.1));
      doc.roundedRect(x + 0.8, y + 1.2, w, h, 3, 3, "F");
    });
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...SQP_LINE);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, w, h, 3, 3, "FD");
    doc.setFillColor(...accent);
    doc.roundedRect(x, y, 1.6, h, 0.8, 0.8, "F");
  };
  const badge = (x, y, ic, col, s = 9) => {
    grad(x, y, s, s, col, mix(col, B, 0.5), 10);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.8);
    doc.roundedRect(x - 0.4, y - 0.4, s + 0.8, s + 0.8, 2.4, 2.4, "S");
    icon(ic, x + s * 0.18, y + s * 0.18, s * 0.64, SQP_WH);
  };
  const letter = (x, y, t, s = 9) => {
    grad(x, y, s, s, A, mix(A, B, 0.5), 10);
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.8);
    doc.roundedRect(x - 0.4, y - 0.4, s + 0.8, s + 0.8, 2.4, 2.4, "S");
    font("x", s * 0.95, SQP_WH);
    doc.text(T(t), x + s / 2, y + s * 0.68, { align: "center" });
  };
  const note = (s) => {
    font("r", 7.4, SQP_TX);
    const l = lines(s, CW - 14);
    need(l.length * 3.8 + 8);
    doc.setFillColor(...mix(SQP_WH, A, 0.05));
    doc.setDrawColor(...mix(SQP_LINE, A, 0.3));
    doc.setLineDashPattern([1, 1], 0);
    doc.roundedRect(M, st.y, CW, l.length * 3.8 + 4.5, 2, 2, "FD");
    doc.setLineDashPattern([], 0);
    icon("spark", M + 3, st.y + 2.2, 3.6, AI);
    doc.text(l, M + 9, st.y + 4.8);
    st.y += l.length * 3.8 + 9;
  };
  const text = (s, size = 8.6, col = SQP_TX, w = CW, x = M) => {
    font("r", size, col);
    const l = lines(s, w);
    need(l.length * 4.4 + 2);
    doc.text(l, x, st.y + 3, { lineHeightFactor: 4.4 / (size * 0.3528) });
    st.y += l.length * 4.4 + 2;
  };
  /* checklist in two columns, each item with a tick; returns the height used */
  const ticks = (list, x, y, w, cols = 2, size = 7.6) => {
    const cw = (w - (cols - 1) * 4) / cols;
    font("r", size);
    const hs = list.map((t) => Math.max(1, lines(t, cw - 7).length) * 3.6 + 2.6);
    const per = Math.ceil(list.length / cols);
    let maxH = 0;
    for (let c = 0; c < cols; c++) {
      let yy = y;
      list.slice(c * per, (c + 1) * per).forEach((t, j) => {
        const i = c * per + j;
        doc.setFillColor(...mix(SQP_WH, A, 0.07));
        doc.roundedRect(x + c * (cw + 4), yy, cw, hs[i] - 0.8, 1.6, 1.6, "F");
        doc.setFillColor(...A);
        doc.circle(x + c * (cw + 4) + 3, yy + 2.9, 1.5, "F");
        icon("check", x + c * (cw + 4) + 1.9, yy + 1.8, 2.2, SQP_WH);
        font("r", size, SQP_INK);
        doc.text(lines(t, cw - 7), x + c * (cw + 4) + 6, yy + 3.7, { lineHeightFactor: 3.6 / (size * 0.3528) });
        yy += hs[i];
      });
      maxH = Math.max(maxH, yy - y);
    }
    return maxH;
  };
  const ticksH = (list, w, cols = 2, size = 7.6) => {
    const cw = (w - (cols - 1) * 4) / cols;
    font("r", size);
    const hs = list.map((t) => Math.max(1, lines(t, cw - 7).length) * 3.6 + 2.6);
    const per = Math.ceil(list.length / cols);
    let m = 0;
    for (let c = 0; c < cols; c++) m = Math.max(m, hs.slice(c * per, (c + 1) * per).reduce((a, b) => a + b, 0));
    return m;
  };
  const closing = (title, sub, url) => {
    need(62);
    st.y += 4;
    const y = st.y;
    grad(M, y, CW, 50, D, mix(D, A, 0.6), 40);
    op(0.14, () => doc.addImage(emb.data, "PNG", M + CW - 52, y + 2, 46, 46 * (emb.h / emb.w), "sqp-emb", "FAST"));
    font("b", 8, mix(B, SQP_WH, 0.3));
    doc.text("WORK WITH US", M + 8, y + 11);
    font("x", 15, SQP_WH);
    doc.text(T(title), M + 8, y + 20);
    font("r", 9, [222, 228, 248]);
    doc.text(lines(sub, CW - 70), M + 8, y + 27);
    doc.text("info@frequentresearch.com   |   +91 81782 00573 (call / WhatsApp)", M + 8, y + 36);
    font("b", 9, mix(B, SQP_WH, 0.3));
    doc.text(T(url), M + 8, y + 43);
    st.y = y + 58;
  };
  const finish = (fname, title, subject) => {
    const n = doc.getNumberOfPages();
    for (let i = 2; i <= n; i++) {
      doc.setPage(i);
      footer(i, n);
    }
    doc.setProperties({ title: T(title), subject: T(subject), author: "Frequent Research", creator: "frequentresearch.com" });
    doc.save(frkFile(fname));
    return "ok";
  };
  return { doc, T, W, H, M, CW, G, HW, A, B, D, AI, BI, emb, full, st, mix, font, op, grad, icon, lines, para, watermark, newPage, need, band, card, badge, letter, note, text, ticks, ticksH, closing, finish };
}

/* cover art: orbit of stage numbers round the service icon, drawn once per colour */
function sq7OrbitPng(c1, c2, n, ic) {
  const k = "sq7orb-" + c1 + c2 + n + ic;
  if (pp5Cache[k]) return pp5Cache[k];
  const S = 900;
  const [c, x] = pp5Canvas(S, S);
  const cx = S / 2,
    cy = S / 2;
  const g = x.createRadialGradient(cx - 80, cy - 90, 20, cx, cy, 200);
  g.addColorStop(0, "#ffffff");
  g.addColorStop(0.18, c1);
  g.addColorStop(1, c2);
  [380, 300].forEach((r, i) => {
    x.beginPath();
    x.arc(cx, cy, r, 0, Math.PI * 2);
    x.strokeStyle = "rgba(255,255,255," + (i ? 0.28 : 0.14) + ")";
    x.lineWidth = 3;
    if (i) x.setLineDash([10, 14]);
    x.stroke();
    x.setLineDash([]);
  });
  x.beginPath();
  x.arc(cx, cy, 170, 0, Math.PI * 2);
  x.fillStyle = g;
  x.shadowColor = c1;
  x.shadowBlur = 80;
  x.fill();
  x.shadowBlur = 0;
  for (let i = 0; i < n; i++) {
    const a = -Math.PI / 2 + (i * Math.PI * 2) / n;
    const px = cx + 300 * Math.cos(a),
      py = cy + 300 * Math.sin(a);
    x.beginPath();
    x.arc(px, py, 38, 0, Math.PI * 2);
    const gg = x.createLinearGradient(px - 38, py - 38, px + 38, py + 38);
    gg.addColorStop(0, c1);
    gg.addColorStop(1, c2);
    x.fillStyle = gg;
    x.fill();
    x.lineWidth = 8;
    x.strokeStyle = "rgba(255,255,255,.18)";
    x.stroke();
    x.fillStyle = "#fff";
    x.font = "800 34px Inter, Arial, sans-serif";
    x.textAlign = "center";
    x.textBaseline = "middle";
    x.fillText(String(i + 1), px, py + 1);
  }
  try {
    const p = new Path2D(qp5Ic(ic));
    x.save();
    x.translate(cx - 96, cy - 96);
    x.scale(8, 8);
    x.strokeStyle = "#fff";
    x.lineWidth = 1.6;
    x.lineCap = "round";
    x.lineJoin = "round";
    x.stroke(p);
    x.restore();
  } catch (e) {}
  return (pp5Cache[k] = c.toDataURL("image/png"));
}

async function sq7Book(k, lead) {
  const d = SQ7_DOCS[k];
  const V = FRK_V[k];
  const M0 = SQ7_META[k];
  const nm = k === "accounts-finance" ? "Accounts & Finance" : V.name;
  const P = await sq7Doc({ c1: V.c1, c2: V.c2, deep: V.deep, headL: nm + " quality process", headR: nm + " · Quality process", lead });
  const { doc, T, W, H, M, CW, HW, A, B, D, AI, st, mix, font, op, grad, icon, lines, para, watermark, newPage, need, band, card, badge, letter, note, text, ticks, ticksH } = P;
  const cnt = sq7Count(d);
  const stg = (d.secs.find((s) => s.items.some((i) => i.qc)) || { items: [] }).items;

  /* ── cover ── */
  watermark();
  grad(0, 0, W, H, mix(D, [4, 8, 24], 0.55), D, 90, true);
  op(0.55, () => grad(0, 190, W, 107, D, mix(D, [4, 8, 24], 0.6), 40, true));
  doc.addImage(sq7OrbitPng(V.c1, V.c2, stg.length, M0.ic), "PNG", 78, 18, 140, 140, "sqp-orb-" + k, "FAST");
  op(0.08, () => doc.addImage(P.emb.data, "PNG", -30, 150, 140, 140 * (P.emb.h / P.emb.w), "sqp-emb", "FAST"));
  if (P.full) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M, 14, 60, 31, 4, 4, "F");
    doc.addImage(P.full.data, "PNG", M + 3, 16, 54, 54 * (P.full.h / P.full.w), "sqp-full", "FAST");
  }
  font("b", 9, mix(B, SQP_WH, 0.25));
  doc.text(T(nm.toUpperCase() + " · QUALITY PROCESS"), M, 158);
  const hp = M0.h.split("*");
  font("x", 31, SQP_WH);
  let cy = 172;
  lines(hp[0].trim(), 180).forEach((l) => {
    doc.text(l, M, cy);
    cy += 12.5;
  });
  font("x", 31, mix(B, SQP_WH, 0.25));
  lines((hp[1] || "").trim(), 180).forEach((l) => {
    doc.text(l, M, cy);
    cy += 12.5;
  });
  font("b", 11, mix(B, SQP_WH, 0.45));
  doc.text(lines(d.sub, CW)[0], M, cy + 1);
  font("r", 9, [214, 222, 244]);
  para(d.intro[0], M, cy + 9, 150, 4.5);
  [
    [cnt.pr, "quality principles"],
    [cnt.stages, "framework stages"],
    [cnt.std, "service standards"],
    [cnt.checks, "documented checks"],
  ].forEach(([n, l], i) => {
    const x = M + i * 46,
      y = 252;
    op(0.12, () => {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, 42, 18, 3, 3, "F");
    });
    doc.setDrawColor(...mix(B, D, 0.4));
    doc.roundedRect(x, y, 42, 18, 3, 3, "S");
    font("x", 16, SQP_WH);
    doc.text(String(n), x + 4, y + 10);
    font("r", 6.8, [190, 200, 230]);
    doc.text(l, x + 4, y + 15);
  });
  font("r", 7, [170, 184, 220]);
  doc.text("ISO 20252:2019  |  ISO 9001:2015  |  ISO/IEC 27001:2013  |  ESOMAR member", M, 286);
  doc.text(T("Edition " + frpDate() + (lead && lead.first ? "  ·  Prepared for " + lead.first + (lead.last ? " " + lead.last : "") : "")), W - M, 286, { align: "right" });

  /* ── introduction + contents ── */
  newPage();
  font("b", 8, AI);
  doc.text("INTRODUCTION", M, st.y);
  font("x", 20, SQP_INK);
  doc.text(T(d.title), M, st.y + 9);
  st.y += 16;
  d.intro.slice(1).forEach((p) => {
    text(p, 9, SQP_TX);
    st.y += 1.5;
  });
  st.y += 4;
  font("x", 12, SQP_INK);
  doc.text("In this document", M, st.y + 3);
  st.y += 8;
  d.secs.forEach((s, i) => {
    const col = i % 2,
      row = Math.floor(i / 2);
    const x = M + col * (HW + 6),
      y = st.y + row * 13;
    doc.setFillColor(...mix(SQP_WH, A, 0.06));
    doc.roundedRect(x, y, HW, 11, 2.5, 2.5, "F");
    font("x", 11, mix(A, SQP_WH, 0.25));
    doc.text(String(s.n).padStart(2, "0"), x + 4, y + 7.4);
    icon(sq7SecIc(s.t), x + 15, y + 3, 5, AI);
    font("b", 7.8, SQP_INK);
    doc.text(lines(s.t, HW - 26)[0], x + 22, y + 6.8);
  });
  st.y += Math.ceil(d.secs.length / 2) * 13 + 4;

  /* ── chapters ── */
  const lead1 = (s) => sq7Lead(s.blocks);
  d.secs.forEach((s, si) => {
    const kind = sq7Kind(s, si === d.secs.length - 1);
    const L = lead1(s);
    if (["stages", "standards"].includes(kind) || st.y > 170) newPage();
    band(s.t, L[0] || "", sq7SecIc(s.t), kind === "cycle" ? 130 : 90);
    L.slice(1).forEach((p) => text(p, 8.6));
    if (L.length > 1) st.y += 2;
    if (kind === "principles") {
      s.blocks
        .find((b) => b.type === "kv")
        .items.forEach(([k2, v], i) => {
          font("r", 8.2);
          const l = lines(v, CW - 28);
          const h = 13 + l.length * 4;
          need(h + 4);
          card(M, st.y, CW, h);
          badge(M + 5, st.y + 4, SQ7_PIC[i % SQ7_PIC.length], A, 11);
          font("x", 6.8, SQP_MUT);
          doc.text("PRINCIPLE " + String(i + 1).padStart(2, "0"), M + 20, st.y + 6.5);
          font("x", 10, SQP_INK);
          doc.text(T(k2), M + 20, st.y + 11.4);
          font("r", 8.2, SQP_TX);
          doc.text(l, M + 20, st.y + 16.2);
          st.y += h + 4;
        });
    } else if (kind === "stages") {
      s.items.forEach((it, i) => {
        const ps = it.blocks.filter((b) => b.type === "p").map((b) => b.t);
        const ul = (it.blocks.find((b) => b.type === "ul") || { items: [] }).items;
        font("r", 8);
        const pl = lines(ps[0] || "", CW - 26);
        const th = ul.length ? ticksH(ul, CW - 24) : 0;
        font("r", 7.6);
        const ql = it.qc ? lines(it.qc, CW - 62) : [];
        const after = ps.slice(1).filter((p) => !/:$/.test(p));
        font("r", 7.4);
        const al = after.length ? lines(after.join(" "), CW - 26) : [];
        const h = 15 + pl.length * 4 + (th ? th + 3 : 0) + (al.length ? al.length * 3.7 + 2 : 0) + (ql.length ? ql.length * 3.7 + 9 : 0) + 3;
        need(h + 5);
        const y = st.y;
        card(M, y, CW, h);
        grad(M + 5, y + 4, 12, 12, A, mix(A, B, 0.5), 10);
        font("x", 11, SQP_WH);
        doc.text(String(it.k), M + 11, y + 12, { align: "center" });
        font("x", 6.6, SQP_MUT);
        doc.text(`STAGE ${it.k} OF ${s.items.length}`, M + 21, y + 7.6);
        font("x", 10.5, SQP_INK);
        doc.text(T(it.t), M + 21, y + 13);
        let yy = y + 18.5;
        font("r", 8, SQP_TX);
        doc.text(pl, M + 21, yy);
        yy += pl.length * 4;
        if (ul.length) {
          yy += ticks(ul, M + 21, yy - 1, CW - 24) + 2;
        }
        if (al.length) {
          font("r", 7.4, SQP_MUT);
          doc.text(al, M + 21, yy + 2);
          yy += al.length * 3.7 + 2;
        }
        if (ql.length) {
          const qh = ql.length * 3.7 + 6;
          grad(M + 21, yy, CW - 24, qh, D, mix(D, A, 0.5), 20);
          icon("shield", M + 24, yy + qh / 2 - 2.5, 5, SQP_WH);
          font("b", 6.4, mix(B, SQP_WH, 0.4));
          doc.text("QUALITY GATE", M + 31, yy + 4.4);
          font("b", 7.6, SQP_WH);
          doc.text(ql, M + 54, yy + 4.4);
        }
        st.y += h + 5;
      });
    } else if (kind === "standards") {
      s.items.forEach((it) => {
        const ps = it.blocks.filter((b) => b.type === "p" && !/:$/.test(b.t)).map((b) => b.t);
        const ul = (it.blocks.find((b) => b.type === "ul") || { items: [] }).items;
        font("r", 7.8);
        const pl = lines(ps[0] || "", CW - 24);
        const rest = ps.slice(1);
        font("r", 7.3);
        const rl = rest.length ? lines(rest.join(" "), CW - 24) : [];
        const th = ul.length ? ticksH(ul, CW - 22, 2, 7.3) : 0;
        const h = 14 + pl.length * 3.8 + (th ? th + 2 : 0) + (rl.length ? rl.length * 3.6 + 2 : 0) + 2;
        need(h + 4);
        const y = st.y;
        card(M, y, CW, h, B);
        letter(M + 5, y + 4, it.k, 10);
        font("x", 10, SQP_INK);
        doc.text(T(it.t), M + 19, y + 9.6);
        font("r", 6.6, SQP_MUT);
        doc.text(`${ul.length} quality controls`, M + CW - 4, y + 9.6, { align: "right" });
        font("r", 7.8, SQP_TX);
        doc.text(pl, M + 19, y + 15);
        let yy = y + 15 + pl.length * 3.8;
        if (ul.length) yy += ticks(ul, M + 19, yy - 1.5, CW - 22, 2, 7.3) + 1;
        if (rl.length) {
          font("r", 7.3, SQP_MUT);
          doc.text(rl, M + 19, yy + 2);
        }
        st.y += h + 4;
      });
    } else if (kind === "ladder") {
      const kv = s.blocks.find((b) => b.type === "kv").items;
      kv.forEach(([k2, v], i) => {
        const w = CW - (kv.length - 1 - i) * 10;
        const x = M + CW - w;
        font("r", 8);
        const l = lines(v, w - 24);
        const h = 11 + l.length * 4;
        need(h + 4);
        card(x, st.y, w, h, mix(A, B, i / Math.max(1, kv.length - 1)));
        doc.setFillColor(...mix(A, B, i / Math.max(1, kv.length - 1)));
        doc.circle(x + 10, st.y + h / 2, 5, "F");
        font("x", 10, SQP_WH);
        doc.text(String(i + 1), x + 10, st.y + h / 2 + 1.6, { align: "center" });
        font("x", 9.6, SQP_INK);
        doc.text(T(k2), x + 19, st.y + 7.4);
        font("r", 8, SQP_TX);
        doc.text(l, x + 19, st.y + 12.4);
        st.y += h + 4;
      });
    } else if (kind === "cycle") {
      const ol = s.blocks.find((b) => b.type === "ol").items;
      const R = 34;
      font("r", 7.6);
      const rows = ol.map(([k2, v]) => lines(v, CW - 96).length);
      const listH = rows.reduce((a, r) => a + 7 + r * 3.6, 0);
      need(Math.max(2 * R + 16, listH) + 6);
      const y0 = st.y,
        cx = M + R + 8,
        cyy = y0 + R + 8;
      doc.setDrawColor(...mix(SQP_WH, A, 0.25));
      doc.setLineWidth(3);
      doc.circle(cx, cyy, R, "S");
      doc.setFillColor(...mix(SQP_WH, A, 0.08));
      doc.circle(cx, cyy, R - 12, "F");
      icon(sq7SecIc(s.t), cx - 6, cyy - 9, 12, AI);
      font("x", 7, AI);
      doc.text(`${ol.length}-STEP CYCLE`, cx, cyy + 9, { align: "center" });
      ol.forEach((_, i) => {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / ol.length;
        const px = cx + R * Math.cos(a),
          py = cyy + R * Math.sin(a);
        doc.setFillColor(...mix(A, B, i / ol.length));
        doc.circle(px, py, 5, "F");
        doc.setDrawColor(255, 255, 255);
        doc.setLineWidth(0.8);
        doc.circle(px, py, 5, "S");
        font("x", 8.5, SQP_WH);
        doc.text(String(i + 1), px, py + 1.4, { align: "center" });
      });
      let yy = y0;
      const lx = M + 2 * R + 22,
        lw = CW - (lx - M);
      ol.forEach(([k2, v], i) => {
        const h = 6 + rows[i] * 3.6;
        doc.setFillColor(...(i % 2 ? SQP_WH : mix(SQP_WH, A, 0.05)));
        doc.roundedRect(lx, yy, lw, h, 2, 2, "F");
        font("x", 8.6, mix(A, B, i / ol.length));
        doc.text(String(i + 1).padStart(2, "0"), lx + 3, yy + 5);
        font("b", 8.2, SQP_INK);
        doc.text(T(k2), lx + 12, yy + 5);
        font("r", 7.6, SQP_TX);
        doc.text(lines(v, CW - 96), lx + 12, yy + 9);
        yy += h + 1;
      });
      st.y = Math.max(cyy + R + 10, yy) + 4;
    } else if (kind === "groups") {
      const groups = [];
      s.blocks.forEach((b) => {
        if (b.type === "h") groups.push({ t: b.t, items: [] });
        else if (b.type === "ul" && groups.length) groups[groups.length - 1].items.push(...b.items);
      });
      for (let i = 0; i < groups.length; i += 2) {
        const pair = groups.slice(i, i + 2);
        const hs = pair.map((g) => 14 + ticksH(g.items, HW - 10, 1, 7.4));
        const h = Math.max(...hs);
        need(h + 5);
        pair.forEach((g, j) => {
          const x = M + j * (HW + 6);
          card(x, st.y, HW, h, mix(A, B, (i + j) / Math.max(1, groups.length - 1)));
          badge(x + 5, st.y + 3.5, ["check", "chart", "clock", "shield", "eye", "coin"][(i + j) % 6], A, 8);
          font("x", 9.4, SQP_INK);
          doc.text(lines(g.t, HW - 34)[0], x + 16, st.y + 9);
          font("r", 6.4, SQP_MUT);
          doc.text(`${g.items.length} measures`, x + HW - 4, st.y + 9, { align: "right" });
          ticks(g.items, x + 5, st.y + 13, HW - 10, 1, 7.4);
        });
        st.y += h + 5;
      }
    } else {
      const ul = s.blocks.filter((b) => b.type === "ul").flatMap((b) => b.items);
      if (ul.length) {
        const h = ticksH(ul, CW, 2, 7.8);
        if (h < 230) need(h + 4);
        st.y += ticks(ul, M, st.y, CW, 2, 7.8) + 4;
      }
      if (kind === "commit" && d.tag) {
        font("r", 10);
        const tl = lines(d.tag.replace(/^Frequent Research\s*[–-]\s*/, ""), CW - 34);
        const h = 16 + tl.length * 5;
        need(h + 6);
        grad(M, st.y, CW, h, D, mix(D, A, 0.6), 40);
        icon("shield", M + 7, st.y + h / 2 - 5, 10, SQP_WH);
        font("b", 10, SQP_WH);
        doc.text(tl, M + 24, st.y + 10);
        font("b", 6.6, mix(B, SQP_WH, 0.4));
        doc.text("FREQUENT RESEARCH", M + 24, st.y + h - 5);
        st.y += h + 6;
      }
    }
    const tail = sq7Tail(s.blocks);
    if (tail.length && L.length !== s.blocks.length && kind !== "commit") note(tail.join(" "));
    st.y += 2;
  });
  P.closing(`Talk to our ${nm.toLowerCase()} team`, "Questions about how we work, or a project to scope? We reply within one working day.", "www.frequentresearch.com/services/" + k);
  return P.finish("Frequent Research - " + nm.replace(/&/g, "and") + " Quality Process.pdf", nm + " quality process", "Quality process");
}

export { SQP_INK, SQP_TX, SQP_WH, sq7Book, sq7Doc, sq7OrbitPng };
