/*
 * One brochure per service (build 65, update 7). Prefix sv7 / SV7_.
 *   sv7Find(v, s)             the vertical and service records from the services data (`aa`)
 *   sv7Brochure(v, s, lead)   the service brochure PDF: cover, what is included, the problem and our approach, how we
 *                             work, the service's own quality controls (ServiceQuality65 data; market research uses the
 *                             respondent-quality pillars), why Frequent Research, FAQs, related services, contact
 *   SV7_Band                  the download band shown above the footer on every service page and service hub
 *                             (/services/:vertical and /services/:vertical/:service), behind the download form
 * Styles: src/styles/servicequality65.css (sv7-).
 */
import * as ee from 'react';
import { useLocation } from 'react-router-dom';
import { VERTICALS } from '../../app/data/site.jsx';
import { HmLink } from '../../app/shared/HomeShared.jsx';
import { FRK_EMBLEM_SM, FRK_V } from './FrKit.jsx';
import { FRG_Gate } from './Gate.jsx';
import { frpBrochure, frpDate } from './Pdfs.jsx';
import { fp5Quality } from './Pdfs65.jsx';
import { QP5_PILLARS } from '../../data/Quality65.jsx';
import { QP5_I } from '../../pages/Quality65.jsx';
import { SQ7_DOCS } from '../../data/ServiceQuality65.jsx';
import { sq7Slug } from '../../pages/ServiceQuality65.jsx';
import { SQP_INK, SQP_TX, SQP_WH, sq7Doc, sq7OrbitPng } from './ServiceQualityPdf65.jsx';

const SV7_IC = { "market-research": "search", "digital-marketing": "funnel", "it-development": "cpu", "accounts-finance": "receipt" };
const sv7Find = (vs, ss) => {
  const v = VERTICALS.find((x) => x.slug === vs);
  if (!v) return null;
  const s = ss ? (v.services || []).find((x) => x.slug === ss) : null;
  return { v, s };
};
const sv7VName = (vs) => (vs === "accounts-finance" ? "Accounts & Finance" : (FRK_V[vs] || {}).name || vs);
/* the quality-process standard written for this service, if any */
const sv7Std = (vs, s) => {
  const d = SQ7_DOCS[vs];
  if (!d || !s) return null;
  const sec = d.secs.find((x) => x.items.length && !x.items.some((i) => i.qc));
  return sec ? sec.items.find((i) => sq7Slug(i.t) === s.slug) || null : null;
};

async function sv7Brochure(vs, ss, lead) {
  const f = sv7Find(vs, ss);
  if (!f || !f.s) throw new Error("This service could not be found.");
  const { v, s } = f;
  const V = FRK_V[vs] || FRK_V["market-research"];
  const vn = sv7VName(vs);
  const P = await sq7Doc({ c1: V.c1, c2: V.c2, deep: V.deep, headL: s.name + " brochure", headR: vn + " · Service brochure", lead });
  const { doc, T, W, H, M, CW, HW, A, B, D, AI, st, mix, font, op, grad, icon, lines, para, watermark, newPage, need, band, card, badge, note, text, ticks, ticksH } = P;
  const std = sv7Std(vs, s);
  const stdUl = std ? (std.blocks.find((b) => b.type === "ul") || { items: [] }).items : [];
  const proc = v.process || [];

  /* ── cover ── */
  watermark();
  grad(0, 0, W, H, mix(D, [4, 8, 24], 0.55), D, 90, true);
  op(0.55, () => grad(0, 190, W, 107, D, mix(D, [4, 8, 24], 0.6), 40, true));
  doc.addImage(sq7OrbitPng(V.c1, V.c2, Math.max(3, proc.length), SV7_IC[vs] || "spark"), "PNG", 84, 22, 132, 132, "sqp-orb-sv-" + vs, "FAST");
  op(0.08, () => doc.addImage(P.emb.data, "PNG", -30, 150, 140, 140 * (P.emb.h / P.emb.w), "sqp-emb", "FAST"));
  if (P.full) {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(M, 14, 60, 31, 4, 4, "F");
    doc.addImage(P.full.data, "PNG", M + 3, 16, 54, 54 * (P.full.h / P.full.w), "sqp-full", "FAST");
  }
  font("b", 9, mix(B, SQP_WH, 0.25));
  doc.text(T(vn.toUpperCase() + " · SERVICE BROCHURE"), M, 160);
  font("x", s.name.length > 22 ? 28 : 34, SQP_WH);
  let cy = 174;
  lines(s.name, CW).slice(0, 2).forEach((l) => {
    doc.text(l, M, cy);
    cy += s.name.length > 22 ? 11.5 : 13.5;
  });
  font("b", 12, mix(B, SQP_WH, 0.3));
  lines(s.summary, CW).slice(0, 2).forEach((l) => {
    doc.text(l, M, cy + 1);
    cy += 6;
  });
  font("r", 9, [214, 222, 244]);
  cy += para(v.intro || v.card || "", M, cy + 6, 160, 4.5) + 8;
  /* what's included chips */
  font("b", 7.6);
  let x = M,
    y = Math.max(cy + 4, 236);
  (s.includes || []).forEach((t) => {
    const w = doc.getTextWidth(T(t)) + 10;
    if (x + w > W - M) {
      x = M;
      y += 8;
    }
    op(0.14, () => {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x, y, w, 6.2, 3.1, 3.1, "F");
    });
    doc.setFillColor(...B);
    doc.circle(x + 3.2, y + 3.1, 1, "F");
    doc.setTextColor(255, 255, 255);
    doc.text(T(t), x + 5.6, y + 4.3);
    x += w + 3;
  });
  font("r", 7, [170, 184, 220]);
  doc.text("ISO 20252:2019  |  ISO 9001:2015  |  ISO/IEC 27001:2013  |  ESOMAR member", M, 286);
  doc.text(T("Edition " + frpDate() + (lead && lead.first ? "  ·  Prepared for " + lead.first + (lead.last ? " " + lead.last : "") : "")), W - M, 286, { align: "right" });

  /* ── what is included ── */
  newPage();
  band("What " + s.name + " includes", s.summary, "layers");
  {
    const inc = s.includes || [];
    const ch = 30;
    for (let i = 0; i < inc.length; i += 2) {
      need(ch + 5);
      inc.slice(i, i + 2).forEach((t, j) => {
        const cx2 = M + j * (HW + 6);
        card(cx2, st.y, HW, ch, mix(A, B, (i + j) / Math.max(1, inc.length - 1)));
        badge(cx2 + 6, st.y + 5, ["target", "layers", "chart", "check", "spark", "eye"][(i + j) % 6], A, 11);
        font("x", 18, mix(A, SQP_WH, 0.7));
        doc.text(String(i + j + 1).padStart(2, "0"), cx2 + HW - 5, st.y + 12, { align: "right" });
        font("x", 10, SQP_INK);
        doc.text(lines(t, HW - 14).slice(0, 2), cx2 + 6, st.y + 22);
      });
      st.y += ch + 5;
    }
  }
  /* problem and approach */
  if (v.problem || v.solution) {
    band("The challenge, and how we solve it", "", "target");
    const items = [
      ["The challenge", v.problem, "eye", mix(A, SQP_INK, 0.2)],
      ["Our approach", v.solution, "spark", A],
    ].filter((x) => x[1]);
    font("r", 8.4);
    const hs = items.map((it) => 18 + lines(it[1], HW - 12).length * 4.3);
    const h = Math.max(...hs);
    need(h + 5);
    items.forEach(([t, d2, ic, col], j) => {
      const cx2 = M + j * (HW + 6);
      card(cx2, st.y, HW, h, col);
      badge(cx2 + 6, st.y + 5, ic, col, 9);
      font("x", 10, SQP_INK);
      doc.text(T(t), cx2 + 18, st.y + 11);
      font("r", 8.4, SQP_TX);
      doc.text(lines(d2, HW - 12), cx2 + 6, st.y + 20, { lineHeightFactor: 4.3 / (8.4 * 0.3528) });
    });
    st.y += h + 6;
    if (v.scenario) note("Example: " + v.scenario);
  }
  /* how we work */
  if (proc.length) {
    if (st.y > 170) newPage();
    band("How we work", `${proc.length} steps, each closed by a quality check before the next one starts.`, "arrow");
    const n = proc.length;
    const cw = (CW - (n - 1) * 3) / n;
    font("r", 7.4);
    font("x", 8.4);
    const tl = proc.map((p) => lines(p.t, cw - 6).length);
    const tmax = Math.max(...tl);
    font("r", 7.4);
    const h = 24 + (tmax - 1) * 3.8 + Math.max(...proc.map((p) => lines(p.d, cw - 6).length)) * 3.6;
    need(h + 6);
    doc.setDrawColor(...mix(SQP_WH, A, 0.35));
    doc.setLineWidth(1.2);
    doc.line(M + cw / 2, st.y + 8, M + CW - cw / 2, st.y + 8);
    proc.forEach((p, i) => {
      const px = M + i * (cw + 3);
      doc.setFillColor(...mix(A, B, i / Math.max(1, n - 1)));
      doc.circle(px + cw / 2, st.y + 8, 6, "F");
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(1);
      doc.circle(px + cw / 2, st.y + 8, 6, "S");
      font("x", 10, SQP_WH);
      doc.text(String(i + 1), px + cw / 2, st.y + 11.4, { align: "center" });
      doc.setFillColor(...mix(SQP_WH, A, 0.06));
      doc.roundedRect(px, st.y + 17, cw, h - 17, 2.5, 2.5, "F");
      font("x", 8.4, SQP_INK);
      doc.text(lines(p.t, cw - 6), px + 3, st.y + 23);
      font("r", 7.4, SQP_TX);
      doc.text(lines(p.d, cw - 6), px + 3, st.y + 28 + (tmax - 1) * 3.8);
    });
    st.y += h + 6;
  }
  /* quality controls for this service */
  {
    let list = stdUl,
      intro = std ? (std.blocks.find((b) => b.type === "p" && !/:$/.test(b.t)) || {}).t : "";
    if (!list.length && vs === "market-research") {
      list = QP5_PILLARS.map((p) => p.t + ": " + p.d);
      intro = "Every study runs on verified respondents from our own panels, checked at recruitment, during the survey and before delivery.";
    }
    if (list.length) {
      const hh = ticksH(list, CW, 2, 7.8);
      if (st.y + 40 + hh > H - 20) newPage();
      band("Quality controls for " + s.name, "", "shield");
      if (intro) text(intro, 8.6);
      st.y += ticks(list, M, st.y + 1, CW, 2, 7.8) + 5;
      const q = vs === "market-research" ? "market-research" : vs;
      note(`Read the full ${vn.toLowerCase()} quality process at www.frequentresearch.com/downloads/quality-process/${q}`);
    }
  }
  /* why us */
  if ((v.benefits || []).length) {
    const hh = ticksH(v.benefits, CW, 2, 8);
    if (st.y + 40 + hh > H - 20) newPage();
    band("Why Frequent Research", "", "star");
    st.y += ticks(v.benefits, M, st.y, CW, 2, 8) + 5;
  }
  /* faqs */
  if ((v.faqs || []).length) {
    if (st.y > 200) newPage();
    band("Questions we are often asked", "", "book");
    v.faqs.forEach((q) => {
      font("r", 8.2);
      const al = lines(q.a, CW - 14);
      const h = 11 + al.length * 4.1;
      need(h + 3);
      doc.setFillColor(...mix(SQP_WH, A, 0.05));
      doc.roundedRect(M, st.y, CW, h, 2.5, 2.5, "F");
      doc.setFillColor(...A);
      doc.roundedRect(M, st.y, 1.4, h, 0.7, 0.7, "F");
      font("b", 8.8, SQP_INK);
      doc.text(lines(q.q, CW - 14)[0], M + 6, st.y + 6);
      font("r", 8.2, SQP_TX);
      doc.text(al, M + 6, st.y + 11, { lineHeightFactor: 4.1 / (8.2 * 0.3528) });
      st.y += h + 3;
    });
  }
  /* related services */
  {
    const rel = (v.services || []).filter((x) => x.slug !== s.slug);
    if (rel.length) {
      need(30);
      st.y += 3;
      font("x", 11, SQP_INK);
      doc.text(T(`More ${vn} services`), M, st.y + 3);
      st.y += 8;
      font("b", 7.4);
      let x2 = M,
        y2 = st.y;
      rel.forEach((r) => {
        const w = doc.getTextWidth(T(r.name)) + 8;
        if (x2 + w > W - M) {
          x2 = M;
          y2 += 7.6;
        }
        doc.setFillColor(...mix(SQP_WH, A, 0.1));
        doc.roundedRect(x2, y2, w, 6, 3, 3, "F");
        doc.setTextColor(...AI);
        doc.text(T(r.name), x2 + 4, y2 + 4.1);
        x2 += w + 2.4;
      });
      st.y = y2 + 11;
    }
  }
  P.closing(`Start your ${s.name} project`, "Tell us what you need. We reply within one working day with a plan and a quote.", `www.frequentresearch.com/services/${vs}/${s.slug}`);
  return P.finish(`Frequent Research - ${s.name.replace(/&/g, "and").replace(/\//g, "-")} Brochure.pdf`, s.name + " brochure", "Service brochure");
}

/* ── the download band above the footer on service pages ─────────────────────────── */
function SV7_Band() {
  const loc = useLocation();
  const m = /^\/services\/([^/]+)(?:\/([^/]+))?\/?$/.exec(loc.pathname || "");
  const f = m ? sv7Find(m[1], m[2]) : null;
  const [gate, setGate] = ee.useState(null);
  if (!f || (m[2] && !f.s)) return null;
  const vs = m[1];
  const V = FRK_V[vs] || FRK_V["market-research"];
  const vn = sv7VName(vs);
  const s = f.s;
  const title = s ? s.name + " brochure" : vn + " brochure";
  const getBro = () =>
    setGate({
      kind: "Service brochure",
      title,
      key: "brochure-" + vs + (s ? "-" + s.slug : ""),
      run: (lead) => (s ? sv7Brochure(vs, s.slug, lead) : frpBrochure(vs, lead)),
    });
  const getQ = () => setGate({ kind: "Quality process", title: vn + " quality process", key: "quality-" + vs, run: (lead) => fp5Quality(vs, lead) });
  return (
    <>
    <section className="sv7-band" style={{ "--s1": V.c1, "--s2": V.c2, "--sdeep": V.deep }} aria-labelledby="sv7-band-h">
      <div className="container sv7-band__in">
        <div className="sv7-band__book" aria-hidden="true">
          <span className="sv7-band__spine" />
          <span className="sv7-band__front">
            <img src={FRK_EMBLEM_SM} alt="" className="sv7-band__wm" loading="lazy" decoding="async" />
            <QP5_I n={SV7_IC[vs] || "doc"} s={30} />
            <b>{s ? s.name : vn}</b>
            <small>{s ? vn : "Service brochure"}</small>
            <em>
              <i />
              <i />
              <i />
            </em>
          </span>
        </div>
        <div className="sv7-band__copy">
          <span className="sv7-band__kick">
            <QP5_I n="doc" s={14} /> Download PDF
          </span>
          <h2 id="sv7-band-h">{s ? `Take the ${s.name} brochure with you` : `Take the ${vn} brochure with you`}</h2>
          <p>{s ? `${s.summary} What is included, how we work, the quality checks we run and answers to common questions, in one branded PDF.` : `${v_card(f.v)} Every service, how we work and why clients choose us, in one branded PDF.`}</p>
          <div className="sv7-band__cta">
            <button type="button" className="sv7-btn sv7-btn--main" onClick={getBro}>
              <QP5_I n="down" s={16} /> Download the {s ? "service" : vn} brochure
            </button>
            <button type="button" className="sv7-btn" onClick={getQ}>
              <QP5_I n="shield" s={16} /> Quality process PDF
            </button>
            <HmLink to={"/downloads/quality-process/" + vs} className="sv7-btn sv7-btn--link">
              Read the quality process <QP5_I n="arrow" s={14} />
            </HmLink>
          </div>
          <small>You'll be asked for your details for each download.</small>
        </div>
      </div>
    </section>
      {gate && (
        <FRG_Gate
          world={vs}
          kind={gate.kind}
          title={gate.title}
          sub={vn}
          icon={gate.kind === "Quality process" ? "shield" : "file"}
          resource={{ type: gate.kind === "Quality process" ? "quality-process" : "brochure", key: gate.key, title: gate.title }}
          extra={{ doc: gate.key }}
          onUnlock={gate.run}
          onClose={() => setGate(null)}
        />
      )}
    </>
  );
}
const v_card = (v) => v.card || v.headline || "";

export { SV7_Band, sv7Brochure };
