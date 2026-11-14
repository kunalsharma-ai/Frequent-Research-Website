/*
 * Branded PDF documents (build 51). Prefix FRP_ / frp. Built in the browser with the bundled jsPDF through frkPdf
 * (src/components/site/FrKit.jsx): every page carries the round Frequent Research emblem as a watermark, a branded
 * header and a footer with page numbers and "Prepared for <name>, <company> on <date>".
 *
 *   frpBrochure(vertical, lead)     service brochure from the site's own service data (base `aa`)
 *   frpPanelBook(book, lead)        country panel book (B2C or B2B) from public/data/panel-books/<kind>/<slug>.json
 *   frpCaseStudy(cs, industry, lead) case study, with its project facts, phases and markets drawn as charts
 * Content rule: only text and figures that are already on the website or in the supplied panel workbooks.
 */
import { PORTALS, VERTICALS } from '../../app/data/site.jsx';
import { PRODUCTS } from '../../app/data/products.jsx';
import { ES_QA } from '../../pages/Esomar37.jsx';
import { frkFile, frkHex, frkMix, frkPdf, frkV } from './FrKit.jsx';
import { OJ_MILES } from '../../pages/OurJourney.jsx';

const frpFmt = (n) => (n == null ? "-" : Math.round(n).toLocaleString("en-IN"));
const frpDate = () => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

async function frpBrochure(vslug, lead) {
  const v = VERTICALS.find((x) => x.slug === vslug);
  if (!v) throw new Error("Brochure content not found.");
  const W = frkV(vslug);
  const P = await frkPdf({ title: v.name + " brochure", kind: "Service brochure", lead, accent: W.c1, accent2: W.c2 });
  P.cover({
    eyebrow: v.name + " · Service brochure",
    big: v.headline || v.name,
    sub: v.intro,
    meta: [
      ["Services", String((v.services || []).length)],
      ["Approach", (v.flow || []).join(" > ")],
      ["Edition", frpDate()],
    ],
  });
  P.startBody();
  P.h2("Why it matters");
  if (v.problem) P.para(v.problem);
  P.st.y += 2;
  if (v.solution) {
    P.need(26);
    const y0 = P.st.y;
    const lines = P.doc.splitTextToSize(P.T(v.solution), P.CW - 16);
    const hh = lines.length * 5 + 12;
    P.doc.setFillColor(...frkMix(P.A, [255, 255, 255], 0.9));
    P.doc.roundedRect(P.M, y0, P.CW, hh, 3, 3, "F");
    P.grad(P.M, y0, 2, hh, P.A, P.A2, 8, true);
    P.doc.setFont("helvetica", "bold");
    P.doc.setFontSize(8);
    P.doc.setTextColor(...P.A);
    P.doc.text("OUR ANSWER", P.M + 7, y0 + 6.5);
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(10);
    P.doc.setTextColor(...P.INK);
    P.doc.text(lines, P.M + 7, y0 + 12);
    P.st.y = y0 + hh + 6;
  }
  if (v.benefits && v.benefits.length) {
    P.h2("What you can count on");
    v.benefits.forEach((b) => {
      P.need(7);
      P.doc.setFillColor(...P.A);
      P.doc.circle(P.M + 2, P.st.y - 1.4, 1.3, "F");
      P.para(b, { x: P.M + 6, width: P.CW - 6, lh: 5.2 });
      P.st.y += 0.6;
    });
  }
  if (v.process && v.process.length) {
    P.h2("How we work", `${v.process.length} steps from brief to result`);
    const n = v.process.length,
      gap = 2.5,
      cols = Math.min(4, n),
      w = (P.CW - gap * (cols - 1)) / cols,
      h = 30;
    for (let r = 0; r < Math.ceil(n / cols); r++) {
      P.need(h + 4);
      const y = P.st.y;
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        if (i >= n) break;
        const s = v.process[i],
          x = P.M + c * (w + gap);
        P.doc.setFillColor(...frkMix(P.A, [255, 255, 255], 0.93));
        P.doc.roundedRect(x, y, w, h, 2.5, 2.5, "F");
        P.doc.setFillColor(...frkMix(P.A, P.A2, i / Math.max(1, n - 1)));
        P.doc.circle(x + 6.5, y + 7, 4, "F");
        P.doc.setFont("helvetica", "bold");
        P.doc.setFontSize(8.5);
        P.doc.setTextColor(255, 255, 255);
        P.doc.text(String(i + 1), x + 6.5, y + 8.3, { align: "center" });
        P.doc.setTextColor(...P.NAVY);
        P.doc.setFontSize(9.5);
        P.doc.text(P.T(s.t), x + 12.5, y + 8.3);
        P.doc.setFont("helvetica", "normal");
        P.doc.setFontSize(7.8);
        P.doc.setTextColor(...P.MUTED);
        P.doc.text(P.doc.splitTextToSize(P.T(s.d), w - 6).slice(0, 4), x + 3.5, y + 15);
      }
      P.st.y += h + gap;
    }
    P.st.y += 3;
  }
  P.h2("Our " + v.name.toLowerCase() + " services", `${(v.services || []).length} services, each with its own page on frequentresearch.com`);
  (v.services || []).forEach((s, i) => {
    const sum = P.doc.splitTextToSize(P.T(s.summary || ""), P.CW - 14);
    const inc = (s.includes || []).slice(0, 5).join("  |  ");
    const incl = P.doc.splitTextToSize(P.T(inc), P.CW - 14);
    const h = 9 + sum.length * 4.4 + (inc ? incl.length * 4 + 2 : 0);
    P.need(h + 3);
    const y = P.st.y;
    P.doc.setDrawColor(...P.LINE);
    P.doc.setFillColor(255, 255, 255);
    P.doc.roundedRect(P.M, y, P.CW, h, 2.2, 2.2, "FD");
    P.doc.setFillColor(...frkMix(P.A, P.A2, (i % 6) / 5));
    P.doc.roundedRect(P.M + 3, y + 3.2, 6, 6, 1.5, 1.5, "F");
    P.doc.setFont("helvetica", "bold");
    P.doc.setFontSize(7);
    P.doc.setTextColor(255, 255, 255);
    P.doc.text(String(i + 1).padStart(2, "0"), P.M + 6, y + 7.3, { align: "center" });
    P.doc.setFontSize(10.5);
    P.doc.setTextColor(...P.NAVY);
    P.doc.text(P.T(s.name), P.M + 12, y + 7.3);
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(8.6);
    P.doc.setTextColor(...P.INK);
    P.doc.text(sum, P.M + 12, y + 12.4);
    if (inc) {
      P.doc.setFontSize(7.6);
      P.doc.setTextColor(...P.A);
      P.doc.text(incl, P.M + 12, y + 12.6 + sum.length * 4.4);
    }
    P.st.y += h + 2.5;
  });
  if (v.whyChoose && v.whyChoose.length) {
    P.h2("Why clients choose Frequent Research");
    const cols = 2,
      gap = 3,
      w = (P.CW - gap) / cols;
    for (let i = 0; i < v.whyChoose.length; i += cols) {
      const pair = v.whyChoose.slice(i, i + cols);
      const hs = pair.map((x) => 11 + P.doc.splitTextToSize(P.T(x.d), w - 8).length * 4.2);
      const h = Math.max(...hs);
      P.need(h + 3);
      pair.forEach((x, k) => {
        const xx = P.M + k * (w + gap),
          y = P.st.y;
        P.doc.setFillColor(...frkMix(P.A2, [255, 255, 255], 0.88));
        P.doc.roundedRect(xx, y, w, h, 2.5, 2.5, "F");
        P.doc.setFont("helvetica", "bold");
        P.doc.setFontSize(9.5);
        P.doc.setTextColor(...P.NAVY);
        P.doc.text(P.T(x.t), xx + 4, y + 7);
        P.doc.setFont("helvetica", "normal");
        P.doc.setFontSize(8.2);
        P.doc.setTextColor(...P.INK);
        P.doc.text(P.doc.splitTextToSize(P.T(x.d), w - 8), xx + 4, y + 12);
      });
      P.st.y += h + gap;
    }
  }
  if (v.team) {
    P.h2("The team behind the work", v.team.summary);
    if (v.team.roles) P.chips(v.team.roles);
    if (v.team.tools) {
      P.para("Tools we use", { bold: true, size: 9, color: P.NAVY });
      P.st.y += 1;
      P.chips(v.team.tools, { color: P.A2 });
    }
  }
  if (v.timeline) {
    P.h2("Typical timelines");
    P.para(v.timeline + ".");
  }
  if (v.faqs && v.faqs.length) {
    P.h2("Questions clients ask");
    v.faqs.slice(0, 5).forEach((f) => {
      P.para("Q. " + f.q, { bold: true, size: 9.6, color: P.NAVY });
      P.para(f.a, { size: 9, color: P.INK, lh: 4.6 });
      P.st.y += 2;
    });
  }
  frpContact(P, `Talk to our ${v.name.toLowerCase()} team`, `www.frequentresearch.com/services/${v.slug}`);
  return P.finish(frkFile(`Frequent Research - ${v.name} Brochure.pdf`));
}

function frpContact(P, title, url) {
  P.need(40);
  P.st.y += 4;
  const y = P.st.y,
    h = 34;
  P.grad(P.M, y, P.CW, h, P.NAVY, frkMix(P.A, P.NAVY, 0.3), 40);
  P.doc.setFont("helvetica", "bold");
  P.doc.setFontSize(14);
  P.doc.setTextColor(255, 255, 255);
  P.doc.text(P.T(title), P.M + 7, y + 11);
  P.doc.setFont("helvetica", "normal");
  P.doc.setFontSize(9.5);
  P.doc.setTextColor(210, 220, 255);
  P.doc.text("info@frequentresearch.com   |   +91 81782 00573 (call / WhatsApp)", P.M + 7, y + 19);
  P.doc.text("Mangolpur Kalan, New Delhi - 110085, India", P.M + 7, y + 24.5);
  P.doc.setTextColor(...P.A2);
  P.doc.setFont("helvetica", "bold");
  P.doc.text(P.T(url), P.M + 7, y + 30);
  P.st.y += h + 4;
}

/* ── country panel book ──────────────────────────────────────────────────────────────── */
async function frpPanelBook(book, lead) {
  const b2b = book.kind === "b2b";
  const A = b2b ? ["#7C4DFF", "#22D3EE"] : ["#1E5BFF", "#2EE6A6"];
  const P = await frkPdf({ title: `${book.name} ${b2b ? "B2B" : "consumer"} panel book`, kind: b2b ? "B2B panel book" : "Consumer panel book", lead, accent: A[0], accent2: A[1] });
  const groups = book.groups || [];
  const tables = groups.reduce((s, g) => s + g.tables.length, 0);
  P.cover({
    eyebrow: `${book.region} · ${b2b ? "Business (B2B)" : "Consumer (B2C)"} panel book`,
    big: book.name,
    sub: b2b ? `Profile of our ${book.name} business panel: company size, revenue and ${groups.some((g) => g.title) ? "sector-by-sector department and job-title distributions" : "audience composition"}.` : `Profile of our ${book.name} consumer panel: demographics, income, household, technology, money, media, lifestyle and consumer categories.`,
    meta: [
      [b2b ? "Profiled professionals" : "Profiled consumers", frpFmt(book.panel)],
      ["Profile tables", String(tables)],
      ["Edition", frpDate()],
    ],
  });
  P.startBody();
  P.h2("At a glance");
  const first = groups[0] ? groups[0].tables : [];
  const pick = (re) => first.find((t) => re.test(t.title));
  const gender = pick(/gender|category/i);
  const tiles = [[b2b ? "Panel size" : "Consumer panel", frpFmt(book.panel)], ["Region", book.region], ["Tables in this book", String(tables)]];
  if (gender && gender.rows.length >= 2) tiles.push(["Gender split", gender.rows.map((r) => `${r[0]} ${Math.round(r[1])}%`).join(" / ")]);
  P.tiles(tiles, { cols: tiles.length === 4 ? 4 : 3 });
  P.para(`Figures are the share of profiled ${b2b ? "panel members" : "panellists"} in each category, taken from the ${book.name} panel profile. Each table is its own distribution. Feasibility for a specific audience is always confirmed per project.`, { size: 8.4, color: P.MUTED, lh: 4.4 });
  P.st.y += 2;
  let sec = 0;
  groups.forEach((g) => {
    if (g.title) {
      sec++;
      /* section divider band */
      P.need(30);
      P.st.y += 4;
      const y = P.st.y;
      P.grad(P.M, y, P.CW, 16, frkHex(A[0]), frkHex(A[1]), 40);
      P.doc.setFont("helvetica", "bold");
      P.doc.setFontSize(8);
      P.doc.setTextColor(255, 255, 255);
      P.doc.text(`SECTOR ${String(sec).padStart(2, "0")}`, P.M + 5, y + 6);
      P.doc.setFontSize(13);
      P.doc.text(P.T(g.title), P.M + 5, y + 12.6);
      P.doc.setFont("helvetica", "normal");
      P.doc.setFontSize(8);
      P.doc.text(`${g.tables.length} tables`, P.W - P.M - 5, y + 12.6, { align: "right" });
      P.st.y += 24;
    }
    g.tables.forEach((t) => {
      const rows = t.rows.filter((r) => r[1] > 0);
      if (!rows.length) return;
      const asDonut = rows.length <= 6 && /gender|marital|married|home|own|category|status|type/i.test(t.title + " " + rows.map((r) => r[0]).join(" ")) && rows.length >= 2;
      P.h2(t.title);
      if (asDonut) P.donut(rows.map((r) => [r[0], r[1]]), { title: "" });
      else P.bars(rows, { max: Math.max(...rows.map((r) => r[1])) * 1.08 });
    });
  });
  frpContact(P, `Plan a study in ${book.name}`, "www.frequentresearch.com/lets-talk?type=feasibility");
  return P.finish(frkFile(`Frequent Research - ${book.name} ${b2b ? "B2B" : "Consumer"} Panel Book.pdf`));
}

/* ── case study ──────────────────────────────────────────────────────────────────────── */
const frpPhases = (cs) => {
  const m = /(\d+)\s*(week|month)/i.exec(cs.timeline || "");
  const unit = m ? (m[2].toLowerCase().startsWith("month") ? "month" : "week") : null;
  const total = m ? +m[1] : null;
  const methods = (cs.services || []).join(" ").toLowerCase();
  const research = /research|panel|survey|data collection|cati|capi|interview|qualitative|quantitative/.test(methods);
  const steps = research ? ["Brief & design", "Sampling & set-up", "Fieldwork", "Analysis", "Reporting"] : ["Discovery", "Plan & design", "Build / execute", "Test & refine", "Launch & handover"];
  const share = research ? [0.15, 0.15, 0.4, 0.15, 0.15] : [0.15, 0.2, 0.4, 0.15, 0.1];
  return { steps, share, total, unit };
};

/* ── build 52: the "More documents" are generated in the browser too (no email step) ───────────────────────────────
 * Company brochure, quality process and healthcare panel book, written only from content already on the website
 * (service data `aa`, panels `Ri`, products `PRODUCTS`, the ESOMAR 37 answers `ES_QA`, Our Journey `OJ_MILES`/`OJ_QUALITY`). */
const FRP_CERTS = [
  ["ISO 20252:2019", "Market, opinion & social research"],
  ["ISO 9001:2015", "Quality management systems"],
  ["ISO/IEC 27001:2013", "Information security management"],
  ["ESOMAR", "Corporate member"],
];
/* ESOMAR 37 answer blocks → PDF paragraphs, bullets, steps and figures */
function frpCerts(P) {
  P.h2("Certified and accountable");
  P.tiles(FRP_CERTS, { cols: 2, h: 17 });
}

async function frpCompany(lead) {
  const V = VERTICALS;
  const P = await frkPdf({ title: "All services brochure", kind: "All services brochure", lead, accent: "#1E5BFF", accent2: "#22D3EE" });
  P.cover({
    eyebrow: "Frequent Research · All services brochure",
    big: "Insights. Analytics. Growth.",
    sub: "A research-led partner for market research, digital marketing, IT & development and finance & accounts — with our own research communities.",
    meta: [
      ["Teams", String(V.length || 4)],
      ["Services", String(V.reduce((s, v) => s + (v.services || []).length, 0))],
      ["Edition", frpDate()],
    ],
  });
  P.startBody();
  const intro = ES_QA[0] && ES_QA[0].a.find(([t]) => t === "p");
  P.h2("Who we are");
  P.para("Frequent Research Fieldwork Solutions Pvt. Ltd. helps businesses understand better, build smarter, grow faster and manage with confidence.");
  if (intro) P.para(intro[1], { size: 9.4, lh: 4.8 });
  P.h2("Four teams, one partner", "Each team has its own page and services on frequentresearch.com");
  V.forEach((v) => {
    const W2 = frkV(v.slug);
    P.need(30);
    const y = P.st.y,
      lines = P.doc.splitTextToSize(P.T(v.card || v.intro || ""), P.CW - 18).slice(0, 4),
      h = 14 + lines.length * 4.3;
    P.doc.setFillColor(...frkMix(frkHex(W2.c1), [255, 255, 255], 0.92));
    P.doc.roundedRect(P.M, y, P.CW, h, 2.5, 2.5, "F");
    P.grad(P.M, y, 2.2, h, frkHex(W2.c1), frkHex(W2.c2), 8, true);
    P.doc.setFont("helvetica", "bold");
    P.doc.setFontSize(11);
    P.doc.setTextColor(...P.NAVY);
    P.doc.text(P.T(v.name), P.M + 7, y + 7.5);
    P.doc.setFontSize(8);
    P.doc.setTextColor(...frkHex(W2.c1));
    P.doc.text(`${(v.services || []).length} services  |  ${(v.flow || []).join(" > ")}`, P.W - P.M - 4, y + 7.5, { align: "right" });
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(8.8);
    P.doc.setTextColor(...P.INK);
    P.doc.text(lines, P.M + 7, y + 13);
    P.st.y += h + 3;
  });
  const R = PORTALS;
  if (R.length) {
    P.h2("Our research communities", "Panels run by Frequent Research");
    R.forEach((r) => {
      P.para(r.name + " — " + r.audience, { bold: true, size: 10, color: P.NAVY });
      P.para(r.intro, { size: 9, lh: 4.6 });
      if (r.audiences) P.chips(r.audiences, { color: P.A2 });
      P.st.y += 1;
    });
  }
  const K = PRODUCTS;
  if (K.length) {
    P.h2("Products");
    K.forEach((k) => {
      P.para(k.name + " — " + k.tagline, { bold: true, size: 10, color: P.NAVY });
      P.para(k.intro, { size: 9, lh: 4.6 });
      P.st.y += 1;
    });
  }
  P.h2("Our journey");
  OJ_MILES.forEach((m) => {
    P.para(m.y + " · " + m.t, { bold: true, size: 9.6, color: P.NAVY });
    P.para(m.d, { size: 9, lh: 4.6 });
    P.st.y += 1;
  });
  frpCerts(P);
  frpContact(P, "Let's talk about your next project", "www.frequentresearch.com/lets-talk");
  return P.finish(frkFile("Frequent Research - All Services Brochure.pdf"));
}

export { frpBrochure, frpCerts, frpCompany, frpContact, frpDate, frpPanelBook, frpPhases };
