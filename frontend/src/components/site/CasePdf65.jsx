/* ===== 15-point case study PDFs (build 65, cx5) =====
   cx5CasePdf(cs, ind, lead)   one case study, every page watermarked with the round Frequent Research emblem
   cx5SectorPack(slug, lead)   every case study of an industry in one document
   Each industry gets its own palette (in5Look) and heading typeface by industry group (serif / mono / sans), so
   sectors do not look alike. Charts use only the case's own facts: sample sizes from its scope, team mix from its
   services, markets, and an indicative phase split of its stated timeline (labelled as such). */
import { findIndustry } from '../../app/data/industries.jsx';
import { FRK_V, frkFile, frkMix, frkPdf } from './FrKit.jsx';
import { frpCerts, frpContact, frpDate, frpPhases } from './Pdfs.jsx';
import { fp5Checks } from './Pdfs65.jsx';
import { in5Look, in5Prof } from '../../data/Industries65.jsx';
import { CX5_FACTORS, cx5Build } from '../../data/CaseFactors65.jsx';
import { csxSvcVertical } from '../../pages/CaseStudy.jsx';
import { countryName, loadCases } from '../../app/pages/IndustriesPages.jsx';

function cx5Hex(h, s, l) {
  s /= 100;
  l /= 100;
  const k = (n) => (n + h / 30) % 12,
    a = s * Math.min(l, 1 - l),
    f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));
  return "#" + [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, "0")).join("");
}
const cx5Font = (style) => (style === "serif" ? "times" : style === "mono" ? "courier" : "helvetica");

/* numbered section band in the industry's typeface */
function cx5Band(P, n, title, font) {
  P.need(26);
  P.st.y += 5;
  const y = P.st.y;
  P.doc.setFillColor(...frkMix(P.A, [255, 255, 255], 0.9));
  P.doc.roundedRect(P.M, y, P.CW, 13, 3, 3, "F");
  P.grad(P.M, y, 15, 13, P.A, P.A2, 10);
  P.doc.setFont(font, "bold");
  P.doc.setFontSize(12);
  P.doc.setTextColor(255, 255, 255);
  P.doc.text(String(n).padStart(2, "0"), P.M + 7.5, y + 8.6, { align: "center" });
  P.doc.setFontSize(font === "times" ? 14.5 : 13);
  P.doc.setTextColor(...P.NAVY);
  P.doc.text(P.T(title), P.M + 20, y + 8.8);
  P.st.y += 19;
}
function cx5Lead(P, t) {
  if (!t) return;
  P.para(t, { size: 10, lh: 5.1 });
  P.st.y += 2;
}
function cx5Kv(P, rows) {
  rows.forEach(([k, v], i) => {
    const lines = P.doc.splitTextToSize(P.T(v || "-"), P.CW - 52);
    const h = Math.max(7, lines.length * 4.4 + 3);
    P.need(h);
    if (i % 2 === 0) {
      P.doc.setFillColor(...frkMix(P.A, [255, 255, 255], 0.94));
      P.doc.rect(P.M, P.st.y - 4.6, P.CW, h, "F");
    }
    P.doc.setFont("helvetica", "bold");
    P.doc.setFontSize(8.2);
    P.doc.setTextColor(...P.A);
    P.doc.text(P.T(k).toUpperCase(), P.M + 3, P.st.y);
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(9.2);
    P.doc.setTextColor(...P.INK);
    P.doc.text(lines, P.M + 50, P.st.y);
    P.st.y += h;
  });
  P.st.y += 3;
}
function cx5Bullets(P, items, mark) {
  items.forEach((t, i) => {
    const lines = P.doc.splitTextToSize(P.T(t), P.CW - 12);
    P.need(lines.length * 4.6 + 3);
    if (mark === "num") {
      P.doc.setFillColor(...P.A);
      P.doc.circle(P.M + 3, P.st.y - 1.4, 3, "F");
      P.doc.setFont("helvetica", "bold");
      P.doc.setFontSize(7.5);
      P.doc.setTextColor(255, 255, 255);
      P.doc.text(String(i + 1), P.M + 3, P.st.y - 0.3, { align: "center" });
    } else {
      P.doc.setFillColor(...(i % 2 ? P.A2 : P.A));
      P.doc.roundedRect(P.M + 1, P.st.y - 3.2, 3.2, 3.2, 0.8, 0.8, "F");
    }
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(9.4);
    P.doc.setTextColor(...P.INK);
    P.doc.text(lines, P.M + 9, P.st.y);
    P.st.y += lines.length * 4.6 + 2;
  });
  P.st.y += 1;
}
/* cards for findings / impact */
function cx5Cards(P, items, label) {
  items.forEach((t, i) => {
    const lines = P.doc.splitTextToSize(P.T(t), P.CW - 30);
    const h = lines.length * 4.6 + 9;
    P.need(h + 3);
    const y = P.st.y;
    P.doc.setFillColor(255, 255, 255);
    P.doc.setDrawColor(...frkMix(P.A, [255, 255, 255], 0.6));
    P.doc.roundedRect(P.M, y, P.CW, h, 3, 3, "FD");
    P.grad(P.M, y, 18, h, P.A, P.A2, 10, true);
    P.doc.setFont("helvetica", "bold");
    P.doc.setFontSize(15);
    P.doc.setTextColor(255, 255, 255);
    P.doc.text(String(i + 1), P.M + 9, y + h / 2 + 2.2, { align: "center" });
    P.doc.setFontSize(7);
    P.doc.setTextColor(...P.A);
    P.doc.text(P.T(label).toUpperCase(), P.M + 23, y + 5.2);
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(9.6);
    P.doc.setTextColor(...P.NAVY);
    P.doc.text(lines, P.M + 23, y + 10);
    P.st.y += h + 3;
  });
}
function cx5Quote(P, t, font) {
  if (!t) return;
  P.doc.setFont(font === "courier" ? "courier" : "times", "bolditalic");
  P.doc.setFontSize(11.5);
  const lines = P.doc.splitTextToSize(P.T("“" + t + "”"), P.CW - 20);
  const h = lines.length * 5.4 + 10;
  P.need(h + 2);
  const y = P.st.y;
  P.doc.setFillColor(...frkMix(P.A2, [255, 255, 255], 0.85));
  P.doc.roundedRect(P.M, y, P.CW, h, 3, 3, "F");
  P.doc.setFillColor(...P.A2);
  P.doc.rect(P.M, y, 2, h, "F");
  P.doc.setFont(font === "courier" ? "courier" : "times", "bolditalic");
  P.doc.setFontSize(11.5);
  P.doc.setTextColor(...frkMix(P.A, [0, 0, 0], 0.35));
  P.doc.text(lines, P.M + 9, y + 8);
  P.st.y += h + 3;
}
/* horizontal process diagram: boxes joined by arrows */
function cx5Flow(P, steps) {
  const n = steps.length,
    gap = 5,
    w = (P.CW - gap * (n - 1)) / n,
    h = 20;
  P.need(h + 6);
  const y = P.st.y;
  steps.forEach((s, i) => {
    const x = P.M + i * (w + gap);
    P.doc.setFillColor(...frkMix(i % 2 ? P.A2 : P.A, [255, 255, 255], i === 0 || i === n - 1 ? 0.15 : 0.85));
    P.doc.roundedRect(x, y, w, h, 2.5, 2.5, "F");
    P.doc.setFont("helvetica", "bold");
    P.doc.setFontSize(7.6);
    P.doc.setTextColor(...(i === 0 || i === n - 1 ? [255, 255, 255] : P.NAVY));
    P.doc.text(P.doc.splitTextToSize(P.T(s), w - 4).slice(0, 3), x + w / 2, y + 7, { align: "center" });
    if (i < n - 1) {
      P.doc.setFillColor(...P.A);
      const ax = x + w + 0.6;
      P.doc.triangle(ax, y + h / 2 - 2.2, ax, y + h / 2 + 2.2, ax + 3.8, y + h / 2, "F");
    }
  });
  P.st.y += h + 6;
}
function cx5Gantt(P, cs) {
  const ph = frpPhases(cs);
  const labW = 40,
    bw = P.CW - labW - 4;
  let acc = 0;
  ph.steps.forEach((s, i) => {
    P.need(8);
    const y = P.st.y;
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(8.4);
    P.doc.setTextColor(...P.INK);
    P.doc.text(P.T(s), P.M, y);
    P.doc.setFillColor(236, 239, 247);
    P.doc.roundedRect(P.M + labW, y - 3.4, bw, 4.2, 1.5, 1.5, "F");
    P.grad(P.M + labW + bw * acc, y - 3.4, Math.max(2, bw * ph.share[i]), 4.2, P.A, P.A2, 8);
    acc += ph.share[i];
    P.st.y += 7;
  });
  P.para(ph.total ? `Indicative split of the ${ph.total}-${ph.unit} timeline.` : "Indicative phasing.", { size: 7.6, color: P.MUTED, lh: 4 });
  P.st.y += 2;
}

function cx5CaseBody(P, cs, ind, font) {
  const B = cx5Build(cs, ind);
  const f = B.f;
  const mix = {};
  (cs.services || []).forEach((s) => {
    const v = /data collection|capi|cati|panel|survey|research/i.test(s) ? "market-research" : csxSvcVertical(s);
    mix[v] = (mix[v] || 0) + 1;
  });
  CX5_FACTORS.forEach(([k, t], i) => {
    const x = f[k];
    cx5Band(P, i + 1, t, font);
    if (x.label) P.para(x.label, { bold: true, size: 9.4, color: P.A });
    cx5Lead(P, x.lead);
    if (k === "overview") cx5Bullets(P, x.items || []);
    if (k === "client") {
      cx5Kv(P, x.kv);
      const mk = Object.keys(mix);
      if (mk.length) {
        P.para("Team mix on this engagement (services by team)", { bold: true, size: 8.6, color: P.MUTED });
        P.donut(
          mk.map((v) => [FRK_V[v].name, mix[v]]),
          { title: (cs.services || []).length + " services" }
        );
      }
    }
    if (k === "objectives") cx5Bullets(P, x.items, "num");
    if (k === "audience") {
      if (x.bars) {
        P.para("Sample composition (from the project scope)", { bold: true, size: 8.6, color: P.MUTED });
        if (x.bars.length > 1) P.donut(x.bars.map(([n, l]) => [l + " (" + n.toLocaleString("en-IN") + ")", n]), { title: "Sample" });
        else P.bars(x.bars.map(([n, l]) => [l, n]), { max: x.bars[0][0] * 1.05, unit: "" });
      }
      if (x.chips) {
        P.para(x.chipsLabel, { bold: true, size: 8.6, color: P.MUTED });
        P.chips(x.chips);
      }
    }
    if (k === "geo") {
      if (x.flags && x.flags.length) P.chips(x.flags.map((m) => countryName(m)), { color: P.A2 });
      if (x.geo && x.geo.length) P.tiles(x.geo.map(([n, l]) => [l, n.toLocaleString("en-IN")]), { cols: Math.min(4, x.geo.length), h: 16 });
    }
    if (k === "method") {
      cx5Flow(P, x.steps.slice(0, 6));
      if (x.sub) cx5Lead(P, x.sub);
      if (x.chips) P.chips(x.chips, { color: P.A2 });
    }
    if (k === "sampling") {
      cx5Bullets(P, x.items);
      if (x.kv) P.tiles(x.kv.slice(0, 4), { cols: Math.min(4, x.kv.length), h: 16 });
    }
    if (k === "collection") {
      cx5Bullets(P, x.items);
      if (x.kv) P.tiles(x.kv.slice(0, 4), { cols: Math.min(4, x.kv.length), h: 16 });
      if (x.methods.length) P.chips(x.methods);
      cx5Gantt(P, cs);
    }
    if (k === "quality") fp5Checks(P, x.items);
    if (k === "analysis") fp5Checks(P, x.items);
    if (k === "findings") {
      cx5Cards(P, x.items, "Finding");
      cx5Quote(P, x.quote, font);
    }
    if (k === "recs") {
      if (x.note) P.para(x.note, { bold: true, size: 8.6, color: P.MUTED });
      cx5Bullets(P, x.items, "num");
    }
    if (k === "impact") {
      cx5Cards(P, x.items, "Impact");
      if (x.note) P.para(x.note, { size: 8, color: P.MUTED, lh: 4.2 });
    }
    if (k === "next") {
      P.para("Deliverables", { bold: true, size: 9.2, color: P.NAVY });
      fp5Checks(P, x.items);
      P.para("Next steps", { bold: true, size: 9.2, color: P.NAVY });
      cx5Bullets(P, x.next, "num");
    }
  });
  return B;
}

async function cx5CasePdf(cs, ind, lead) {
  const L = in5Look(ind.slug);
  const font = cx5Font(L.style);
  const P = await frkPdf({ title: cs.title, kind: ind.name + " case study", lead, accent: cx5Hex(L.h, 72, 42), accent2: cx5Hex((L.h + 38) % 360, 80, 55) });
  P.cover({
    eyebrow: `${ind.name} · ${cs.verified === false ? "Illustrative engagement" : "Case study"} · 15-point format`,
    big: cs.title,
    sub: (cs.client || "").replace(/^Illustrative · /, "") + (cs.region ? " · " + cs.region : ""),
    meta: [
      ["Scope", cs.scope || "-"],
      ["Timeline", cs.timeline || "-"],
      ["Markets", (cs.markets || []).map((c) => countryName(c)).join(", ") || "-"],
    ],
  });
  P.startBody();
  P.h2("In this case study", "Every Frequent Research case study follows the same 15 points");
  P.tiles(
    CX5_FACTORS.map(([, t], i) => [String(i + 1).padStart(2, "0"), t]),
    { cols: 3, h: 14 }
  );
  if (cs.verified === false) P.para("Illustrative engagement: a representative scenario showing how Frequent Research approaches this kind of work in this sector. It does not describe a specific client, and outcomes are described qualitatively.", { size: 8.4, color: P.MUTED, lh: 4.4 });
  cx5CaseBody(P, cs, ind, font);
  frpCerts(P);
  frpContact(P, "Planning something similar?", "www.frequentresearch.com/lets-talk?type=feasibility");
  return P.finish(frkFile(`Frequent Research - ${ind.name} - ${cs.title}`.replace(/[\\/:*?"<>|]/g, "").slice(0, 120) + ".pdf"));
}

async function cx5SectorPack(slug, lead) {
  const ind = findIndustry(slug);
  const cases = await loadCases(slug);
  const L = in5Look(slug);
  const font = cx5Font(L.style);
  const Pr = in5Prof(slug);
  const P = await frkPdf({ title: ind.name + " case studies", kind: "Case study pack", lead, accent: cx5Hex(L.h, 72, 42), accent2: cx5Hex((L.h + 38) % 360, 80, 55) });
  P.cover({
    eyebrow: "Frequent Research · Industry case study pack",
    big: ind.name,
    sub: Pr[0] || ind.blurb,
    meta: [
      ["Case studies", String(cases.length)],
      ["Format", "15 points each"],
      ["Edition", frpDate()],
    ],
  });
  P.startBody();
  P.h2("The industry at a glance");
  cx5Lead(P, Pr[0]);
  cx5Bullets(P, Pr[1]);
  P.h2("Who we research");
  P.chips(Pr[2]);
  P.h2("Questions we answer");
  cx5Bullets(P, Pr[3], "num");
  P.h2("Case studies in this pack");
  cx5Bullets(
    P,
    cases.map((c) => c.title + (c.verified === false ? " (illustrative)" : "")),
    "num"
  );
  cases.forEach((cs, i) => {
    P.newPage();
    P.para(`CASE STUDY ${String(i + 1).padStart(2, "0")} OF ${cases.length}${cs.verified === false ? "  ·  ILLUSTRATIVE ENGAGEMENT" : ""}`, { bold: true, size: 8, color: P.A });
    P.doc.setFont(font, "bold");
    P.para(cs.title, { bold: true, size: 15, color: P.NAVY, lh: 6.6 });
    P.para((cs.client || "").replace(/^Illustrative · /, "") + (cs.region ? " · " + cs.region : ""), { size: 9.4, color: P.MUTED });
    cx5CaseBody(P, cs, ind, font);
  });
  frpCerts(P);
  frpContact(P, `Plan your next ${ind.name.toLowerCase()} project`, "www.frequentresearch.com/lets-talk?type=feasibility");
  return P.finish(frkFile(`Frequent Research - ${ind.name} Case Studies.pdf`));
}

export { cx5CasePdf, cx5SectorPack };
