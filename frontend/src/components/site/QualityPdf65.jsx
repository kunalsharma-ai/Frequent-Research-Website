/*
 * Market research quality process PDF (build 65, update 4). Prefix qp5 / QPP_. Same design family as the country panel
 * books (PanelPdf65.jsx): Inter font, round-logo watermark on every page, colour band header, page pills, chapter bands
 * and a graphic for every part. Palette from the quality brief: midnight navy, deep ocean, electric cyan, teal, royal
 * blue and gold. Content: src/data/Quality65.jsx (the same text as the web page). Demo figures are labelled as demo.
 *   qp5Book(lead)
 */
import { frPdf } from '../../app/pdf.js';
import { FRK_EMBLEM, FRK_LOGO_FULL, FRK_LOGO_MFR, FRK_LOGO_MHO, FRK_LOGO_T2O, frkFile, frkImg, frkPdfText } from './FrKit.jsx';
import { frpDate } from './Pdfs.jsx';
import { pc5Rgb } from '../../data/PanelCountries65.jsx';
import { pp5Cache, pp5Canvas, pp5Fonts } from './PanelPdf65.jsx';
import { QP5_B2B, QP5_B2C, QP5_BANDS, QP5_FACTORS, QP5_FAQ, QP5_FLAG_NOTE, QP5_FLOW, QP5_HC, QP5_HERO, QP5_HISTORY, QP5_JOURNEY, QP5_OUTCOMES, QP5_PANELS, QP5_PILLARS, QP5_PIPE, QP5_POINTS, QP5_PRIVACY, QP5_REPORT, QP5_REWARDS, QP5_RING, QP5_SCORE_NOTE, QP5_SHIELD, QP5_WALLET } from '../../data/Quality65.jsx';
import { qp5Band, qp5Ic } from '../../pages/Quality65.jsx';

const QPP_NAVY = [7, 21, 46],
  QPP_OCEAN = [11, 36, 71],
  QPP_CY = [0, 217, 255],
  QPP_TEAL = [0, 191, 166],
  QPP_ROYAL = [65, 105, 225],
  QPP_GOLD = [244, 185, 66],
  QPP_ROSE = [200, 87, 126],
  QPP_INK = [16, 27, 54],
  QPP_TX = [58, 70, 98],
  QPP_MUT = [100, 116, 139],
  QPP_LINE = [222, 229, 240],
  QPP_WH = [255, 255, 255];
const qppHex = (c) => "#" + c.map((v) => v.toString(16).padStart(2, "0")).join("");
function qppIcon(n, hex) {
  const k = "qic-" + n + hex;
  if (pp5Cache[k]) return pp5Cache[k];
  const [c, x] = pp5Canvas(144, 144);
  x.scale(6, 6);
  x.strokeStyle = hex;
  x.lineWidth = 1.9;
  x.lineCap = "round";
  x.lineJoin = "round";
  try {
    x.stroke(new Path2D(qp5Ic(n)));
  } catch (e) {}
  return (pp5Cache[k] = c.toDataURL("image/png"));
}
/* the observatory globe for the cover, drawn once on a canvas */
function qppGlobe() {
  if (pp5Cache.qglobe) return pp5Cache.qglobe;
  const S = 900;
  const [c, x] = pp5Canvas(S, S);
  const cx = S / 2,
    cy = S / 2,
    R = S * 0.36;
  const g = x.createRadialGradient(cx - R * 0.3, cy - R * 0.4, 20, cx, cy, R * 1.35);
  g.addColorStop(0, "rgba(64,120,255,.55)");
  g.addColorStop(0.6, "rgba(10,40,90,.25)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  x.fillStyle = g;
  x.beginPath();
  x.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
  x.fill();
  x.strokeStyle = "rgba(0,217,255,.35)";
  x.lineWidth = 2;
  [1.18, 1.38].forEach((k, i) => {
    x.beginPath();
    x.ellipse(cx, cy, R * k, R * k * 0.3, -0.25 + i * 0.5, 0, Math.PI * 2);
    x.stroke();
  });
  const N = 420,
    P = [];
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2,
      r = Math.sqrt(1 - y * y),
      th = i * 2.39996;
    const X = Math.cos(th) * r,
      Z = Math.sin(th) * r;
    const t = 0.32,
      Y = y * Math.cos(t) - Z * Math.sin(t),
      Z2 = y * Math.sin(t) + Z * Math.cos(t);
    const s = 1 / (1.9 - Z2 * 0.6);
    P.push([cx + X * R * s * 1.4, cy + Y * R * s * 1.4, Z2]);
  }
  const hubs = [
    [P[60], "#4C8DFF"],
    [P[230], "#9B7BFF"],
    [P[330], "#22D3B6"],
  ];
  for (let i = 0; i < 120; i++) {
    const p = P[(i * 37) % N],
      h = hubs[i % 3];
    if (p[2] < -0.1) continue;
    x.strokeStyle = h[1] + "55";
    x.lineWidth = 1.4;
    x.beginPath();
    x.moveTo(p[0], p[1]);
    x.quadraticCurveTo((p[0] + h[0][0]) / 2, (p[1] + h[0][1]) / 2 - 30, h[0][0], h[0][1]);
    x.stroke();
  }
  P.forEach(([px, py, z]) => {
    x.fillStyle = z > 0 ? `rgba(170,225,255,${0.4 + z * 0.55})` : `rgba(120,150,220,${0.15 + (z + 1) * 0.1})`;
    x.beginPath();
    x.arc(px, py, z > 0 ? 2.4 + z * 2.4 : 1.6, 0, Math.PI * 2);
    x.fill();
  });
  hubs.forEach(([p, col]) => {
    x.strokeStyle = col;
    x.lineWidth = 3;
    [22, 40].forEach((r, i) => {
      x.globalAlpha = 0.7 - i * 0.35;
      x.beginPath();
      x.arc(p[0], p[1], r, 0, Math.PI * 2);
      x.stroke();
    });
    x.globalAlpha = 1;
    x.fillStyle = col;
    x.beginPath();
    x.arc(p[0], p[1], 14, 0, Math.PI * 2);
    x.fill();
    x.fillStyle = "#fff";
    x.beginPath();
    x.arc(p[0], p[1], 5, 0, Math.PI * 2);
    x.fill();
  });
  return (pp5Cache.qglobe = c.toDataURL("image/png"));
}
/* glowing shield for the checkpoint page */
function qppShield() {
  if (pp5Cache.qshield) return pp5Cache.qshield;
  const S = 600;
  const [c, x] = pp5Canvas(S, S);
  x.translate(S / 2, S / 2);
  const g = x.createRadialGradient(0, 0, 10, 0, 0, S / 2);
  g.addColorStop(0, "rgba(0,217,255,.35)");
  g.addColorStop(1, "rgba(0,217,255,0)");
  x.fillStyle = g;
  x.fillRect(-S / 2, -S / 2, S, S);
  const sh = (k) => {
    x.beginPath();
    x.moveTo(0, -150 * k);
    x.lineTo(115 * k, -108 * k);
    x.lineTo(115 * k, -20 * k);
    x.bezierCurveTo(115 * k, 70 * k, 60 * k, 130 * k, 0, 160 * k);
    x.bezierCurveTo(-60 * k, 130 * k, -115 * k, 70 * k, -115 * k, -20 * k);
    x.lineTo(-115 * k, -108 * k);
    x.closePath();
  };
  const lg = x.createLinearGradient(-115, -150, 115, 160);
  lg.addColorStop(0, "#00D9FF");
  lg.addColorStop(1, "#4169E1");
  x.shadowColor = "rgba(0,217,255,.8)";
  x.shadowBlur = 40;
  sh(1);
  x.fillStyle = lg;
  x.fill();
  x.shadowBlur = 0;
  sh(0.74);
  x.fillStyle = "rgba(7,21,46,.35)";
  x.fill();
  x.strokeStyle = "#fff";
  x.lineWidth = 22;
  x.lineCap = "round";
  x.lineJoin = "round";
  x.beginPath();
  x.moveTo(-48, 0);
  x.lineTo(-12, 36);
  x.lineTo(56, -40);
  x.stroke();
  return (pp5Cache.qshield = c.toDataURL("image/png"));
}

async function qp5Book(lead) {
  const dt = await frPdf(); /* build 72: jsPDF loads on the first download */
  const [fonts, emb, full, t2o, mfr, mho] = await Promise.all([pp5Fonts(), frkImg(FRK_EMBLEM), frkImg(FRK_LOGO_FULL).catch(() => null), frkImg(FRK_LOGO_T2O).catch(() => null), frkImg(FRK_LOGO_MFR).catch(() => null), frkImg(FRK_LOGO_MHO).catch(() => null)]);
  const LOGO = { t2o, mfr, mho };
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
      .replace(/≠/g, "is not")
      .replace(/[^ -~ -ɏ–—•…·−]/g, "")
      .trim();
  };
  const W = 210,
    H = 297,
    M = 14,
    CW = W - 2 * M,
    G = 6,
    HW = (CW - G) / 2;
  const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
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
  const grad = (x, y, w, h, c1, c2, steps = 40, vertical = false) => {
    for (let i = 0; i < steps; i++) {
      doc.setFillColor(...mix(c1, c2, i / (steps - 1)));
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
  const watermark = () => op(0.05, () => doc.addImage(emb.data, "PNG", (W - 128) / 2, (H - 128 * (emb.h / emb.w)) / 2 + 6, 128, 128 * (emb.h / emb.w), "qpp-emb", "FAST"));
  const header = () => {
    grad(0, 0, W, 2.4, QPP_CY, QPP_ROYAL, 30);
    doc.setFillColor(...QPP_GOLD);
    doc.rect(W - 40, 0, 40, 2.4, "F");
    doc.addImage(emb.data, "PNG", M, 7, 10, 10 * (emb.h / emb.w), "qpp-emb", "FAST");
    font("x", 8.5, QPP_INK);
    doc.text("FREQUENT RESEARCH", M + 13, 11.6);
    font("r", 6.8, QPP_MUT);
    doc.text("Market research quality process", M + 13, 15.4);
    font("b", 7, QPP_ROYAL);
    doc.text("TURN2OPINION · MYFREQUENTREWARDS · MYHEALTHOPINIONS", W - M, 11.6, { align: "right" });
    font("r", 6.8, QPP_MUT);
    doc.text("frequentresearch.com", W - M, 15.4, { align: "right" });
    doc.setDrawColor(...QPP_LINE);
    doc.setLineWidth(0.3);
    doc.line(M, 20, W - M, 20);
    return 28;
  };
  const footer = (i, n) => {
    doc.setDrawColor(...QPP_LINE);
    doc.setLineWidth(0.3);
    doc.line(M, H - 15, W - M, H - 15);
    font("r", 6.6, QPP_MUT);
    doc.text("Frequent Research Fieldwork Solutions Pvt. Ltd.  |  info@frequentresearch.com  |  +91 81782 00573  |  www.frequentresearch.com", M, H - 10.6);
    if (lead && lead.first) doc.text(T(`Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? ", " + lead.company : ""} on ${frpDate()}`), M, H - 6.8);
    grad(W - M - 16, H - 13.6, 16, 6.4, QPP_ROYAL, QPP_TEAL, 16);
    font("b", 7.2, QPP_WH);
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
  /* chapter band */
  let chap = 0;
  const band = (t, d, ic) => {
    need(110);
    chap++;
    const y = st.y;
    grad(M, y, CW, 24, QPP_NAVY, QPP_OCEAN, 40);
    op(0.5, () => grad(M + CW * 0.55, y, CW * 0.45, 24, QPP_OCEAN, mix(QPP_ROYAL, QPP_NAVY, 0.3), 30));
    doc.setFillColor(...QPP_CY);
    doc.rect(M, y + 22.6, CW * 0.5, 1.4, "F");
    doc.setFillColor(...QPP_GOLD);
    doc.rect(M + CW * 0.5, y + 22.6, CW * 0.18, 1.4, "F");
    font("x", 20, mix(QPP_CY, QPP_WH, 0.2));
    doc.text(String(chap).padStart(2, "0"), M + 6, y + 15.5);
    icon(ic, M + 22, y + 7, 9, QPP_WH);
    font("x", 13, QPP_WH);
    doc.text(T(t), M + 35, y + 11);
    font("r", 7.6, [190, 208, 236]);
    doc.text(lines(d, CW - 45)[0], M + 35, y + 17);
    st.y = y + 31;
  };
  const sub = (t) => {
    need(46);
    font("x", 10.5, QPP_INK);
    doc.text(T(t), M, st.y + 4);
    doc.setFillColor(...QPP_TEAL);
    doc.rect(M, st.y + 6.5, 12, 1, "F");
    st.y += 12;
  };
  const card = (x, y, w, h, accent = QPP_ROYAL) => {
    op(0.45, () => {
      doc.setFillColor(...mix(QPP_LINE, QPP_NAVY, 0.1));
      doc.roundedRect(x + 0.8, y + 1.2, w, h, 3, 3, "F");
    });
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(...QPP_LINE);
    doc.setLineWidth(0.3);
    doc.roundedRect(x, y, w, h, 3, 3, "FD");
    doc.setFillColor(...accent);
    doc.roundedRect(x, y, 1.6, h, 0.8, 0.8, "F");
  };
  const badge = (x, y, ic, col, s = 9) => {
    doc.setFillColor(...col);
    doc.roundedRect(x, y, s, s, 2.2, 2.2, "F");
    op(0.25, () => {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, s, s * 0.45, 2.2, 2.2, "F");
    });
    icon(ic, x + s * 0.18, y + s * 0.18, s * 0.64, QPP_WH);
  };
  const demo = (x, y) => {
    font("b", 5.8, [122, 74, 0]);
    const w = doc.getTextWidth("DEMO DATA") + 5;
    doc.setFillColor(255, 228, 168);
    doc.roundedRect(x - w, y - 3.3, w, 4.6, 2.3, 2.3, "F");
    doc.text("DEMO DATA", x - w / 2, y, { align: "center" });
  };
  const note = (s) => {
    font("r", 7, QPP_MUT);
    const l = lines(s, CW - 12);
    need(l.length * 3.6 + 7);
    doc.setFillColor(240, 246, 255);
    doc.setDrawColor(...mix(QPP_LINE, QPP_ROYAL, 0.3));
    doc.setLineDashPattern([1, 1], 0);
    doc.roundedRect(M, st.y, CW, l.length * 3.6 + 4, 2, 2, "FD");
    doc.setLineDashPattern([], 0);
    doc.text(l, M + 6, st.y + 4.6);
    st.y += l.length * 3.6 + 9;
  };
  const chips = (list, col = QPP_ROYAL) => {
    font("b", 7.2);
    let x = M,
      y = st.y;
    list.forEach((t) => {
      const w = doc.getTextWidth(T(t)) + 8;
      if (x + w > W - M) {
        x = M;
        y += 7.4;
      }
      doc.setFillColor(...mix(col, QPP_WH, 0.88));
      doc.roundedRect(x, y, w, 5.8, 2.9, 2.9, "F");
      doc.setTextColor(...mix(col, QPP_NAVY, 0.35));
      doc.text(T(t), x + 4, y + 4);
      x += w + 2.4;
    });
    st.y = y + 10;
  };
  const numList = (list, x, y, w, col = QPP_TEAL, cols = 2) => {
    const cw = (w - (cols - 1) * 4) / cols;
    const per = Math.ceil(list.length / cols);
    list.forEach((t, i) => {
      const c = Math.floor(i / per),
        r = i % per;
      const px = x + c * (cw + 4),
        py = y + r * 7.4;
      doc.setFillColor(...mix(col, QPP_WH, 0.85));
      doc.roundedRect(px, py, cw, 6.2, 1.6, 1.6, "F");
      font("x", 7, mix(col, QPP_NAVY, 0.3));
      doc.text(String(i + 1).padStart(2, "0"), px + 2.4, py + 4.3);
      font("b", 7.3, QPP_INK);
      doc.text(lines(t, cw - 12)[0], px + 9, py + 4.3);
    });
    return per * 7.4;
  };

  /* ── cover ── */
  watermark();
  grad(0, 0, W, H, [5, 14, 34], QPP_OCEAN, 90, true);
  op(0.5, () => grad(0, 180, W, 117, QPP_OCEAN, [5, 14, 34], 40, true));
  doc.addImage(qppGlobe(), "PNG", 70, 16, 150, 150, "qpp-globe", "FAST");
  op(0.08, () => doc.addImage(emb.data, "PNG", -30, 150, 140, 140 * (emb.h / emb.w), "qpp-emb", "FAST"));
  if (full) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M, 14, 60, 31, 4, 4, "F");
    doc.addImage(full.data, "PNG", M + 3, 16, 54, 54 * (full.h / full.w), "qpp-full", "FAST");
  }
  font("b", 9, QPP_TEAL);
  doc.text("MARKET RESEARCH · QUALITY PROCESS", M, 150);
  font("x", 34, QPP_WH);
  doc.text("Research quality", M, 166);
  doc.text("starts with", M, 179);
  font("x", 34, QPP_CY);
  doc.text("real people.", M, 192);
  font("r", 11.5, QPP_GOLD);
  doc.text(T(QP5_HERO.sub), M, 203);
  font("r", 9.2, [200, 214, 240]);
  para(QP5_HERO.d, M, 212, 130, 4.6);
  /* stat chips */
  const stats = [
    ["3", "specialised panels"],
    ["12", "journey stages"],
    ["18", "quality checkpoints"],
    ["5", "quality pillars"],
  ];
  stats.forEach(([n, l], i) => {
    const x = M + i * 46,
      y = 238;
    op(0.12, () => {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, 42, 18, 3, 3, "F");
    });
    doc.setDrawColor(...mix(QPP_CY, QPP_NAVY, 0.5));
    doc.roundedRect(x, y, 42, 18, 3, 3, "S");
    font("x", 16, QPP_WH);
    doc.text(n, x + 4, y + 10);
    font("r", 6.8, [170, 190, 225]);
    doc.text(l, x + 4, y + 15);
  });
  /* panel logos */
  [t2o, mfr, mho].forEach((im, i) => {
    if (!im) return;
    const x = M + i * 61,
      y = 263;
    doc.setFillColor(...[[232, 240, 255], [255, 240, 224], [255, 233, 240]][i]);
    doc.roundedRect(x, y, 56, 13, 3, 3, "F");
    const h = 8,
      w = Math.min(48, h * (im.w / im.h));
    doc.addImage(im.data, "PNG", x + (56 - w) / 2, y + (13 - h * (w / (h * (im.w / im.h)))) / 2, w, h * (w / (h * (im.w / im.h))), "qpp-l" + i, "FAST");
  });
  font("r", 7, [150, 170, 210]);
  doc.text("ISO 20252:2019  |  ISO 9001:2015  |  ISO/IEC 27001:2013  |  ESOMAR member", M, 286);
  doc.text("Edition " + frpDate(), W - M, 286, { align: "right" });

  /* ── 1 philosophy ── */
  newPage();
  band("Our quality philosophy", "Quality is not a final check. It is built into every stage.", "shield");
  {
    const y0 = st.y;
    doc.addImage(qppShield(), "PNG", M - 4, y0 - 4, 70, 70, "qpp-shield", "FAST");
    font("x", 12, QPP_INK);
    doc.text("Five pillars,", M + 70, y0 + 10);
    doc.text("one framework", M + 70, y0 + 16);
    font("r", 8.6, QPP_TX);
    para("Every respondent passes through recruitment, verification, profiling, monitoring and data review. Each pillar adds a layer, so no single check carries the whole load.", M + 70, y0 + 24, CW - 72);
    st.y = y0 + 66;
    const cols = [QPP_ROYAL, [109, 74, 255], QPP_TEAL, QPP_GOLD, QPP_OCEAN];
    QP5_PILLARS.forEach((p, i) => {
      font("r", 8);
      const l1 = lines(p.d, CW - 26),
        l2 = lines(p.more, CW - 26);
      const h = 12 + (l1.length + l2.length) * 4 + 3;
      need(h + 4);
      card(M, st.y, CW, h, cols[i]);
      badge(M + 5, st.y + 4, p.ic, cols[i], 11);
      font("x", 6.8, QPP_MUT);
      doc.text("PILLAR " + String(i + 1).padStart(2, "0"), M + 20, st.y + 6.5);
      font("x", 10, QPP_INK);
      doc.text(T(p.t), M + 20, st.y + 11.6);
      font("b", 8, QPP_TX);
      doc.text(l1, M + 20, st.y + 16.8);
      font("r", 7.8, QPP_MUT);
      doc.text(l2, M + 20, st.y + 16.8 + l1.length * 4);
      st.y += h + 4;
    });
  }

  /* ── 2 panels ── */
  band("Three-panel ecosystem", "Three research communities. Specialised audience expertise.", "users");
  {
    const cw = (CW - 2 * 5) / 3;
    const h = 96;
    need(h + 4);
    QP5_PANELS.forEach((p, i) => {
      const x = M + i * (cw + 5),
        y = st.y,
        col = pc5Rgb(p.c);
      card(x, y, cw, h, col);
      doc.setFillColor(...col);
      doc.roundedRect(x, y, cw, 2.4, 1.2, 1.2, "F");
      const im = LOGO[p.k];
      if (im) {
        const lh = 9,
          lw = Math.min(cw - 14, lh * (im.w / im.h));
        doc.addImage(im.data, "PNG", x + 6, y + 7, lw, lw / (im.w / im.h), "qpp-pl" + i, "FAST");
      }
      font("b", 6.8, QPP_WH);
      const bw = doc.getTextWidth(T(p.aud)) + 6;
      doc.setFillColor(...col);
      doc.roundedRect(x + 6, y + 20, bw, 5, 2.5, 2.5, "F");
      doc.text(T(p.aud), x + 9, y + 23.4);
      font("r", 7.6, QPP_TX);
      const dl = lines(p.d, cw - 12);
      doc.text(dl, x + 6, y + 31);
      let yy = y + 33 + dl.length * 3.7;
      p.pts.forEach((t) => {
        icon("check", x + 6, yy - 2.6, 3.2, col);
        font("b", 7.2, QPP_INK);
        doc.text(T(t), x + 10.5, yy);
        yy += 5;
      });
      font("b", 6.8, col);
      doc.text(p.url.replace("https://", ""), x + 6, y + h - 4);
    });
    st.y += h + 8;
  }

  /* ── 3 journey ── */
  band("Respondent journey", "From recruitment to research-ready respondents, in twelve stages.", "arrow");
  {
    const per = 6,
      cw = (CW - 8) / 2,
      rh = 21;
    need(per * rh + 4);
    const y0 = st.y;
    for (let c = 0; c < 2; c++) {
      const x = M + c * (cw + 8);
      doc.setDrawColor(...mix(QPP_CY, QPP_WH, 0.4));
      doc.setLineWidth(1.2);
      doc.line(x + 6, y0 + 6, x + 6, y0 + (per - 1) * rh + 6);
    }
    QP5_JOURNEY.forEach((s, i) => {
      const c = Math.floor(i / per),
        r = i % per;
      const x = M + c * (cw + 8),
        y = y0 + r * rh;
      const col = mix(QPP_ROYAL, QPP_TEAL, i / 11);
      doc.setFillColor(...col);
      doc.circle(x + 6, y + 6, 5.4, "F");
      icon(s.ic, x + 3.3, y + 3.3, 5.4, QPP_WH);
      font("x", 6.6, QPP_TEAL);
      doc.text("STAGE " + String(i + 1).padStart(2, "0"), x + 15, y + 4);
      font("x", 9.4, QPP_INK);
      doc.text(T(s.t), x + 15, y + 9);
      font("r", 7.4, QPP_TX);
      doc.text(lines(s.d, cw - 18).slice(0, 2), x + 15, y + 13.4);
    });
    st.y = y0 + per * rh + 2;
  }

  /* ── 4 audiences ── */
  band("Recruitment by audience", "B2B professionals, consumers and healthcare audiences, each qualified in their own way.", "people");
  sub("B2B: " + QP5_B2B.h);
  font("r", 8.2, QPP_TX);
  need(16);
  st.y += para(QP5_B2B.d, M, st.y, CW) + 2;
  need(50);
  st.y += numList(QP5_B2B.steps, M, st.y, CW, QPP_ROYAL, 2) + 4;
  {
    /* role wheel */
    const R = QP5_B2B.roles;
    const h = 74;
    need(h + 4);
    const cx = M + 36,
      cy = st.y + h / 2;
    doc.setDrawColor(...QPP_LINE);
    doc.setLineDashPattern([1, 1.5], 0);
    doc.circle(cx, cy, 28, "S");
    doc.setLineDashPattern([], 0);
    R.forEach((r, i) => {
      const a = (i / R.length) * Math.PI * 2 - Math.PI / 2;
      const px = cx + Math.cos(a) * 28,
        py = cy + Math.sin(a) * 28;
      doc.setDrawColor(...mix(QPP_ROYAL, QPP_WH, 0.6));
      doc.line(cx, cy, px, py);
      badge(px - 4.5, py - 4.5, r.ic, mix(QPP_ROYAL, QPP_TEAL, i / 7), 9);
    });
    doc.setFillColor(...QPP_OCEAN);
    doc.circle(cx, cy, 10, "F");
    font("x", 8, QPP_WH);
    doc.text("B2B", cx, cy + 1.4, { align: "center" });
    const tx = M + 76,
      tw = (CW - 76 - 4) / 2;
    R.forEach((r, i) => {
      const c = i % 2,
        rr = Math.floor(i / 2);
      const x = tx + c * (tw + 4),
        y = st.y + rr * 18.4;
      font("x", 8, QPP_INK);
      doc.text(T(r.t), x, y + 4);
      font("r", 6.8, QPP_MUT);
      doc.text(lines(r.a.join(" · "), tw).slice(0, 2), x, y + 8.4);
    });
    st.y += h + 2;
    note(QP5_B2B.note);
  }
  sub("B2C: " + QP5_B2C.h);
  font("r", 8.2, QPP_TX);
  need(16);
  st.y += para(QP5_B2C.d, M, st.y, CW) + 2;
  need(50);
  st.y += numList(QP5_B2C.steps, M, st.y, CW, [109, 74, 255], 2) + 4;
  need(14);
  chips(
    QP5_B2C.cards.map((c) => c[0]),
    [109, 74, 255]
  );
  note(QP5_B2C.note);
  sub("Healthcare: specialised recruitment for healthcare research");
  {
    const cw = (CW - 10) / 3;
    const hs = QP5_HC.map((x) => {
      font("r", 7.2);
      return 24 + lines(x.d, cw - 10).length * 3.6 + x.pts.length * 4.6 + lines(x.note, cw - 10).length * 3.4 + 6;
    });
    const h = Math.max(...hs);
    need(h + 4);
    QP5_HC.forEach((x, i) => {
      const px = M + i * (cw + 5),
        y = st.y;
      const col = [QPP_TEAL, QPP_ROSE, QPP_GOLD][i];
      doc.setFillColor(...mix(QPP_NAVY, QPP_OCEAN, 0.5));
      doc.roundedRect(px, y, cw, h, 3, 3, "F");
      doc.setFillColor(...col);
      doc.roundedRect(px, y, cw, 2.2, 1.1, 1.1, "F");
      badge(px + 5, y + 6, x.ic, col, 10);
      font("x", 9.6, QPP_WH);
      doc.text(T(x.t), px + 18, y + 12.6);
      font("r", 7.2, [195, 210, 236]);
      const dl = lines(x.d, cw - 10);
      doc.text(dl, px + 5, y + 22);
      let yy = y + 24 + dl.length * 3.6;
      x.pts.forEach((t) => {
        doc.setFillColor(...col);
        doc.circle(px + 6.4, yy - 1.1, 0.9, "F");
        font("b", 6.9, QPP_WH);
        doc.text(lines(t, cw - 14)[0], px + 9, yy);
        yy += 4.6;
      });
      font("r", 6.4, [150, 170, 205]);
      doc.text(lines(x.note, cw - 10), px + 5, yy + 2);
    });
    st.y += h + 6;
  }

  /* ── 5 shield ── */
  band("Multi-layer validation", "Eighteen checkpoints. One objective: reliable research participation.", "shield");
  {
    const stages = [];
    QP5_SHIELD.forEach((s) => {
      const k = s[1].split(" · ")[0];
      if (!stages.includes(k)) stages.push(k);
    });
    /* radial diagram */
    const h = 70;
    need(h + 4);
    const cx = W / 2,
      cy = st.y + h / 2;
    doc.addImage(qppShield(), "PNG", cx - 22, cy - 22, 44, 44, "qpp-shield", "FAST");
    QP5_SHIELD.forEach((s, i) => {
      const a = (i / 18) * Math.PI * 2 - Math.PI / 2;
      const px = cx + Math.cos(a) * 32,
        py = cy + Math.sin(a) * 32;
      doc.setDrawColor(...mix(QPP_CY, QPP_WH, 0.5));
      doc.setLineWidth(0.3);
      doc.line(cx + Math.cos(a) * 20, cy + Math.sin(a) * 20, px, py);
      doc.setFillColor(...QPP_NAVY);
      doc.circle(px, py, 3.6, "F");
      font("x", 5.6, QPP_CY);
      doc.text(String(i + 1), px, py + 1.9, { align: "center" });
      font("b", 6.2, QPP_INK);
      const lx = cx + Math.cos(a) * 38;
      doc.text(T(s[0]), lx, py + 1.6, { align: Math.cos(a) > 0.15 ? "left" : Math.cos(a) < -0.15 ? "right" : "center" });
    });
    st.y += h + 6;
    /* table */
    const cols = [8, 46, 26, 54, 48];
    const hdr = ["#", "Checkpoint", "Stage", "What it does", "Risk it helps identify"];
    need(10);
    let x = M;
    doc.setFillColor(...QPP_NAVY);
    doc.roundedRect(M, st.y, CW, 7, 1.6, 1.6, "F");
    font("x", 6.8, QPP_WH);
    hdr.forEach((t, i) => {
      doc.text(t, x + 2, st.y + 4.8);
      x += cols[i];
    });
    st.y += 8;
    QP5_SHIELD.forEach((s, i) => {
      font("r", 6.8);
      const cells = [String(i + 1).padStart(2, "0"), s[0], s[1], s[2], s[3]].map((t, k) => lines(t, cols[k] - 4));
      const rh = Math.max(...cells.map((c) => c.length)) * 3.3 + 3;
      need(rh + 1);
      if (i % 2 === 0) {
        doc.setFillColor(243, 248, 255);
        doc.rect(M, st.y, CW, rh, "F");
      }
      let xx = M;
      cells.forEach((c, k) => {
        font(k === 1 ? "b" : "r", 6.8, k === 0 ? QPP_TEAL : k === 1 ? QPP_INK : QPP_TX);
        doc.text(c, xx + 2, st.y + 3.6);
        xx += cols[k];
      });
      st.y += rh;
    });
    st.y += 6;
  }

  /* ── 6 score ── */
  band("Respondent quality scoring", "Quality is evaluated through participation history, on an illustrative 0–200 scale.", "chart");
  {
    const h = 66;
    need(h + 4);
    const cx = M + 44,
      cy = st.y + 46,
      R = 34;
    const arcPts = (from, to, r) => {
      const out = [];
      for (let k = 0; k <= 24; k++) {
        const d = from + ((to - from) * k) / 24;
        const a = Math.PI - (d / 200) * Math.PI;
        out.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]);
      }
      return out;
    };
    QP5_BANDS.forEach((b) => {
      const o = arcPts(b[0], b[1] + (b[1] === 200 ? 0 : 1), R),
        inn = arcPts(b[0], b[1] + (b[1] === 200 ? 0 : 1), R - 9).reverse();
      const pts = o.concat(inn);
      doc.setFillColor(...pc5Rgb(b[3]));
      const rel = pts.slice(1).map((p, k) => [p[0] - pts[k][0], p[1] - pts[k][1]]);
      doc.lines(rel, pts[0][0], pts[0][1], [1, 1], "F", true);
    });
    const v = 152,
      a = Math.PI - (v / 200) * Math.PI;
    doc.setDrawColor(...QPP_INK);
    doc.setLineWidth(1.4);
    doc.line(cx, cy, cx + (R - 12) * Math.cos(a), cy - (R - 12) * Math.sin(a));
    doc.setFillColor(...QPP_INK);
    doc.circle(cx, cy, 2.4, "F");
    font("x", 16, QPP_INK);
    doc.text(String(v), cx, cy - 8, { align: "center" });
    font("b", 6.6, pc5Rgb(qp5Band(v)[3]));
    doc.text(T(qp5Band(v)[2]), cx, cy + 7, { align: "center" });
    font("r", 6.2, QPP_MUT);
    doc.text("0", cx - R + 2, cy + 4);
    doc.text("200", cx + R - 5, cy + 4);
    /* bands list */
    let yy = st.y + 6;
    QP5_BANDS.forEach((b) => {
      doc.setFillColor(...pc5Rgb(b[3]));
      doc.roundedRect(M + 92, yy - 3, 4, 4, 1, 1, "F");
      font("x", 8, QPP_INK);
      doc.text(`${b[0]}–${b[1]}`, M + 99, yy);
      font("r", 8, QPP_TX);
      doc.text(T(b[2]), M + 117, yy);
      yy += 7.4;
    });
    font("r", 6.6, QPP_MUT);
    doc.text("Illustrative bands: example respondent shown at 152.", M + 92, yy + 2);
    st.y += h;
  }
  sub("Illustrative factor weights");
  {
    const mx = 35,
      bw = CW - 80;
    need(QP5_FACTORS.length * 7 + 4);
    QP5_FACTORS.forEach(([t, v, ic], i) => {
      const y = st.y + i * 7;
      badge(M, y - 1, ic, mix(QPP_ROYAL, QPP_TEAL, i / 7), 5.4);
      font("b", 7.6, QPP_INK);
      doc.text(T(t), M + 8, y + 3);
      doc.setFillColor(238, 242, 250);
      doc.roundedRect(M + 62, y, bw, 3.6, 1.8, 1.8, "F");
      grad(M + 62, y, (bw * v) / mx, 3.6, QPP_ROYAL, QPP_TEAL, 20);
      font("x", 7.6, QPP_INK);
      doc.text("up to " + v, W - M, y + 3, { align: "right" });
    });
    st.y += QP5_FACTORS.length * 7 + 4;
  }
  {
    need(30);
    const y = st.y;
    QP5_POINTS.forEach(([t, d, ic], i) => {
      const x = M + i * (HW + G);
      card(x, y, HW, 24, i ? QPP_GOLD : QPP_ROYAL);
      badge(x + 5, y + 5, ic, i ? QPP_GOLD : QPP_ROYAL, 9);
      font("x", 9.4, QPP_INK);
      doc.text(T(t), x + 17, y + 10.4);
      font("r", 7.4, QPP_TX);
      doc.text(lines(d, HW - 12).slice(0, 2), x + 5, y + 18);
    });
    doc.setFillColor(...QPP_ROSE);
    doc.circle(W / 2, y + 12, 5, "F");
    font("x", 6.4, QPP_WH);
    doc.text("NOT", W / 2, y + 12.4, { align: "center" });
    doc.text("SAME", W / 2, y + 14.8, { align: "center" });
    st.y += 30;
  }
  note(QP5_SCORE_NOTE + " Completing a survey does not add a fixed number of quality points.");

  /* ── 7 history + pipeline ── */
  band("History and validation", "Evaluated over time, and checked before, during and after every survey.", "eye");
  {
    const h = 52;
    need(h + 6);
    const y0 = st.y,
      cw = CW * 0.58;
    card(M, y0, cw, h, QPP_TEAL);
    font("x", 8.6, QPP_INK);
    doc.text("Illustrative quality trend", M + 5, y0 + 7);
    demo(M + cw - 4, y0 + 7);
    const Tr = QP5_HISTORY.trend,
      gx = M + 8,
      gy = y0 + 12,
      gw = cw - 14,
      gh = 32;
    [50, 100, 150].forEach((g) => {
      doc.setDrawColor(...QPP_LINE);
      doc.line(gx, gy + gh - (g / 200) * gh, gx + gw, gy + gh - (g / 200) * gh);
    });
    const pts = Tr.map((v, i) => [gx + (i / (Tr.length - 1)) * gw, gy + gh - (v / 200) * gh]);
    op(0.18, () => {
      const poly = pts.concat([
        [gx + gw, gy + gh],
        [gx, gy + gh],
      ]);
      doc.setFillColor(...QPP_TEAL);
      doc.lines(
        poly.slice(1).map((p, k) => [p[0] - poly[k][0], p[1] - poly[k][1]]),
        poly[0][0],
        poly[0][1],
        [1, 1],
        "F",
        true
      );
    });
    doc.setDrawColor(...QPP_TEAL);
    doc.setLineWidth(0.9);
    pts.slice(1).forEach((p, k) => doc.line(pts[k][0], pts[k][1], p[0], p[1]));
    pts.forEach((p, k) => {
      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(...QPP_ROYAL);
      doc.setLineWidth(0.5);
      doc.circle(p[0], p[1], 1, "FD");
      font("r", 5.4, QPP_MUT);
      doc.text(QP5_HISTORY.months[k], p[0], gy + gh + 4, { align: "center" });
    });
    const x2 = M + cw + 5,
      w2 = CW - cw - 5;
    card(x2, y0, w2, h, QPP_GOLD);
    font("x", 8.6, QPP_INK);
    doc.text("Participation timeline", x2 + 5, y0 + 7);
    QP5_HISTORY.events.forEach(([t, s, d], i) => {
      const y = y0 + 14 + i * 7.6;
      doc.setFillColor(...(s === "ok" ? QPP_TEAL : QPP_GOLD));
      doc.circle(x2 + 6, y - 1, 1.4, "F");
      font("b", 6.8, QPP_INK);
      doc.text(T(t), x2 + 9.5, y);
      font("r", 5.8, QPP_MUT);
      doc.text(lines(d, w2 - 14)[0], x2 + 9.5, y + 3);
    });
    st.y = y0 + h + 6;
    chips(QP5_HISTORY.indicators, QPP_TEAL);
  }
  {
    const cw = (CW - 10) / 3;
    const h = 46;
    need(h + 30);
    const y0 = st.y;
    grad(M + 10, y0 + 9, CW - 20, 1.6, QPP_CY, QPP_TEAL, 30);
    QP5_PIPE.forEach((s, i) => {
      const x = M + i * (cw + 5);
      doc.setFillColor(...mix(QPP_NAVY, QPP_OCEAN, 0.4));
      doc.roundedRect(x, y0, cw, h, 3, 3, "F");
      badge(x + 5, y0 + 4, s.ic, [QPP_CY, QPP_ROYAL, QPP_TEAL][i], 10);
      font("x", 9.4, QPP_WH);
      doc.text(T(s.t), x + 18, y0 + 10.6);
      s.pts.forEach((p, k) => {
        doc.setFillColor(...QPP_CY);
        doc.circle(x + 6.4, y0 + 19.6 + k * 5.4, 0.9, "F");
        font("r", 7.2, [205, 218, 240]);
        doc.text(T(p), x + 9, y0 + 20.6 + k * 5.4);
      });
    });
    st.y = y0 + h + 5;
    QP5_OUTCOMES.forEach(([t, d, c], i) => {
      const x = M + i * (cw + 5),
        col = pc5Rgb(c);
      doc.setFillColor(...mix(col, QPP_WH, 0.86));
      doc.roundedRect(x, st.y, cw, 18, 3, 3, "F");
      doc.setFillColor(...col);
      doc.roundedRect(x, st.y, cw, 1.8, 0.9, 0.9, "F");
      font("x", 8.6, mix(col, QPP_NAVY, 0.35));
      doc.text(T(t), x + 4, st.y + 7);
      font("r", 6.6, QPP_TX);
      doc.text(lines(d, cw - 8).slice(0, 2), x + 4, st.y + 11.4);
    });
    st.y += 24;
    note(QP5_FLAG_NOTE);
  }

  /* ── 8 rewards + reporting ── */
  band("Rewards and reporting", "Transparent rewards for genuine participation, reconciled reporting for clients.", "gift");
  {
    need(60);
    const y0 = st.y,
      lw = CW * 0.48;
    numList(QP5_REWARDS, M, y0, lw, QPP_GOLD, 1);
    const x = M + lw + 6,
      w = CW - lw - 6;
    grad(x, y0, w, 34, QPP_OCEAN, QPP_ROYAL, 40);
    op(0.18, () => {
      doc.setFillColor(...QPP_GOLD);
      doc.circle(x + w - 13, y0 + 13, 10, "F");
    });
    font("r", 7, [190, 208, 255]);
    doc.text("Reward balance", x + 6, y0 + 8);
    demo(x + w - 5, y0 + 8);
    font("x", 18, QPP_WH);
    doc.text("1,200", x + 6, y0 + 19);
    font("r", 7.4, [190, 208, 255]);
    doc.text("points", x + 31, y0 + 19);
    doc.setFillColor(255, 255, 255);
    op(0.2, () => doc.roundedRect(x + 6, y0 + 24, w - 12, 2.6, 1.3, 1.3, "F"));
    grad(x + 6, y0 + 24, (w - 12) * 0.68, 2.6, QPP_GOLD, QPP_CY, 20);
    font("r", 6, [190, 208, 255]);
    doc.text("Example progress towards a redemption threshold", x + 6, y0 + 30.5);
    let yy = y0 + 39;
    QP5_WALLET.rows.forEach(([t, a, s]) => {
      doc.setFillColor(246, 249, 253);
      doc.roundedRect(x, yy - 4, w, 6.6, 1.6, 1.6, "F");
      font("r", 6.6, QPP_TX);
      doc.text(T(t), x + 3, yy);
      font("x", 7, a.startsWith("-") ? QPP_ROSE : QPP_TEAL);
      doc.text(T(a), x + w - 30, yy, { align: "right" });
      font("r", 6, QPP_MUT);
      doc.text(T(s), x + w - 3, yy, { align: "right" });
      yy += 7.6;
    });
    st.y = Math.max(y0 + QP5_REWARDS.length * 7.4, yy) + 4;
    note(QP5_WALLET.note);
  }
  sub("Client quality reporting");
  {
    const h = 56;
    need(h + 4);
    const y0 = st.y,
      cw = CW * 0.56;
    card(M, y0, cw, h, QPP_ROYAL);
    font("x", 8.6, QPP_INK);
    doc.text("Fieldwork funnel", M + 5, y0 + 7);
    demo(M + cw - 4, y0 + 7);
    const Fn = QP5_REPORT.funnel,
      mx = Fn[0][1];
    Fn.forEach(([t, v], i) => {
      const w = Math.max(0.46, v / mx) * (cw - 14);
      const x = M + 7 + (cw - 14 - w) / 2,
        y = y0 + 12 + i * 8.4;
      grad(x, y, w, 6.6, mix(QPP_ROYAL, QPP_TEAL, i / 5), mix(QPP_TEAL, QPP_ROYAL, i / 5), 24);
      font("b", 6.8, QPP_WH);
      doc.text(T(t), x + 3, y + 4.5);
      font("x", 7.4, QPP_WH);
      doc.text(v.toLocaleString("en-US"), x + w - 3, y + 4.6, { align: "right" });
    });
    const x2 = M + cw + 5,
      w2 = CW - cw - 5;
    card(x2, y0, w2, h, QPP_GOLD);
    font("x", 8.6, QPP_INK);
    doc.text("Outcome mix", x2 + 5, y0 + 7);
    demo(x2 + w2 - 4, y0 + 7);
    const cx = x2 + 20,
      cy = y0 + 32,
      cols = [QPP_ROYAL, [154, 166, 199], QPP_TEAL, QPP_GOLD];
    let a0 = -Math.PI / 2;
    QP5_REPORT.mix.forEach(([t, v], i) => {
      const a1 = a0 + (v / 100) * Math.PI * 2;
      const pts = [];
      for (let k = 0; k <= 20; k++) pts.push([cx + 14 * Math.cos(a0 + ((a1 - a0) * k) / 20), cy + 14 * Math.sin(a0 + ((a1 - a0) * k) / 20)]);
      for (let k = 20; k >= 0; k--) pts.push([cx + 8 * Math.cos(a0 + ((a1 - a0) * k) / 20), cy + 8 * Math.sin(a0 + ((a1 - a0) * k) / 20)]);
      doc.setFillColor(...cols[i]);
      doc.lines(
        pts.slice(1).map((p, k) => [p[0] - pts[k][0], p[1] - pts[k][1]]),
        pts[0][0],
        pts[0][1],
        [1, 1],
        "F",
        true
      );
      a0 = a1;
      doc.roundedRect(x2 + 40, y0 + 18 + i * 7, 3.4, 3.4, 0.8, 0.8, "F");
      font("r", 7, QPP_TX);
      doc.text(T(t), x2 + 46, y0 + 20.8 + i * 7);
      font("x", 7.2, QPP_INK);
      doc.text(v + "%", x2 + w2 - 4, y0 + 20.8 + i * 7, { align: "right" });
    });
    st.y = y0 + h + 6;
    chips(QP5_REPORT.cats, QPP_ROYAL);
    note(QP5_REPORT.note);
  }

  /* ── 9 privacy + improvement ── */
  band("Privacy, security and improvement", "Respecting respondent privacy. Improving quality through continuous evaluation.", "lock");
  {
    need(30);
    const y0 = st.y,
      sw = CW / 4;
    grad(M + sw / 2, y0 + 8, CW - sw, 1.4, QPP_CY, QPP_GOLD, 30);
    QP5_FLOW.forEach((t, i) => {
      const x = M + i * sw + sw / 2;
      doc.setFillColor(...mix(QPP_CY, QPP_TEAL, i / 3));
      doc.roundedRect(x - 8, y0, 16, 16, 4, 4, "F");
      icon(["user", "layers", "lock", "chart"][i], x - 5, y0 + 3, 10, QPP_NAVY);
      font("x", 7.8, QPP_INK);
      doc.text(T(t), x, y0 + 22, { align: "center" });
    });
    st.y = y0 + 28;
    const cw = (CW - 8) / 3;
    const rows = Math.ceil(QP5_PRIVACY.length / 3);
    need(rows * 18 + 4);
    QP5_PRIVACY.forEach(([t, d, ic], i) => {
      const x = M + (i % 3) * (cw + 4),
        y = st.y + Math.floor(i / 3) * 18;
      card(x, y, cw, 15.6, QPP_TEAL);
      badge(x + 4, y + 3.4, ic, QPP_OCEAN, 8);
      font("x", 7.8, QPP_INK);
      doc.text(lines(t, cw - 18)[0], x + 15, y + 7);
      font("r", 6.4, QPP_TX);
      doc.text(lines(d, cw - 18).slice(0, 2), x + 15, y + 10.6);
    });
    st.y += rows * 18 + 4;
  }
  sub("Continuous improvement cycle");
  {
    const h = 70;
    need(h + 4);
    const cx = M + 38,
      cy = st.y + h / 2,
      R = 27;
    QP5_RING.forEach(([t, d, ic], i) => {
      const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
      const b = ((i + 1) / 8) * Math.PI * 2 - Math.PI / 2;
      doc.setDrawColor(...mix(QPP_ROYAL, QPP_TEAL, i / 7));
      doc.setLineWidth(2.2);
      for (let k = 0; k < 6; k++) {
        const s0 = a + ((b - a) * k) / 6 + 0.08,
          s1 = a + ((b - a) * (k + 1)) / 6 - 0.02;
        if (k < 5) doc.line(cx + R * Math.cos(s0), cy + R * Math.sin(s0), cx + R * Math.cos(s1), cy + R * Math.sin(s1));
      }
      badge(cx + R * Math.cos(a) - 4.5, cy + R * Math.sin(a) - 4.5, ic, mix(QPP_ROYAL, QPP_TEAL, i / 7), 9);
    });
    doc.setFillColor(...QPP_NAVY);
    doc.circle(cx, cy, 11, "F");
    font("x", 6.4, QPP_CY);
    doc.text("QUALITY", cx, cy - 0.4, { align: "center" });
    doc.text("CYCLE", cx, cy + 2.8, { align: "center" });
    const tx = M + 78,
      tw = (CW - 78 - 4) / 2;
    QP5_RING.forEach(([t, d], i) => {
      const x = tx + (i % 2) * (tw + 4),
        y = st.y + 4 + Math.floor(i / 2) * 16.6;
      font("x", 6.6, QPP_TEAL);
      doc.text(String(i + 1).padStart(2, "0"), x, y + 3);
      font("x", 8, QPP_INK);
      doc.text(T(t), x + 6, y + 3);
      font("r", 6.8, QPP_TX);
      doc.text(lines(d, tw - 6).slice(0, 2), x + 6, y + 7);
    });
    st.y += h + 2;
  }

  /* ── 10 FAQ ── */
  band("Frequently asked questions", "Quality and recruitment, answered in plain words.", "doc");
  {
    const cw = HW;
    let col = 0,
      ys = [st.y, st.y];
    QP5_FAQ.forEach(([q, a], i) => {
      font("b", 7.8);
      const ql = lines(q, cw - 12);
      font("r", 7);
      const al = lines(a, cw - 8);
      const h = ql.length * 3.8 + al.length * 3.3 + 8;
      col = ys[0] <= ys[1] ? 0 : 1;
      if (ys[col] + h > H - 20) {
        const other = 1 - col;
        if (ys[other] + h <= H - 20) col = other;
        else {
          newPage();
          ys = [st.y, st.y];
          col = 0;
        }
      }
      const x = M + col * (cw + G),
        y = ys[col];
      doc.setFillColor(...(i % 2 ? [247, 250, 255] : [241, 251, 249]));
      doc.roundedRect(x, y, cw, h - 2, 2.4, 2.4, "F");
      doc.setFillColor(...(i % 2 ? QPP_ROYAL : QPP_TEAL));
      doc.circle(x + 4.4, y + 4.2, 2.4, "F");
      font("x", 6.2, QPP_WH);
      doc.text("Q", x + 4.4, y + 5.2, { align: "center" });
      font("b", 7.8, QPP_INK);
      doc.text(ql, x + 9, y + 5);
      font("r", 7, QPP_TX);
      doc.text(al, x + 4, y + 5 + ql.length * 3.8 + 1.4);
      ys[col] = y + h;
    });
    st.y = Math.max(...ys) + 4;
  }

  /* closing */
  need(48);
  {
    const y = st.y;
    grad(M, y, CW, 42, QPP_NAVY, QPP_OCEAN, 50);
    op(0.22, () => {
      doc.setFillColor(...QPP_CY);
      doc.circle(W - M - 27, y + 21, 18, "F");
    });
    doc.addImage(qppShield(), "PNG", W - M - 46, y + 2, 38, 38, "qpp-shield", "FAST");
    font("b", 7.4, QPP_TEAL);
    doc.text("LET'S TALK", M + 8, y + 9);
    font("x", 13.5, QPP_WH);
    doc.text(lines("Confidence in research begins with confidence in your sample.", CW - 60), M + 8, y + 16);
    font("r", 8, [200, 214, 240]);
    doc.text("info@frequentresearch.com  |  +91 81782 00573 (call / WhatsApp)", M + 8, y + 31);
    font("b", 8, QPP_GOLD);
    doc.text("www.frequentresearch.com/lets-talk", M + 8, y + 37);
    st.y += 48;
  }

  const n = doc.getNumberOfPages();
  for (let i = 2; i <= n; i++) {
    doc.setPage(i);
    footer(i, n);
  }
  doc.save(frkFile("Frequent Research - Market Research Quality Process.pdf"));
}

export { qp5Book, qppHex, qppIcon };
