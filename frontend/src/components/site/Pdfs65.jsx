/*
 * Build 65 downloads: separate healthcare panel books (HCPs, caregivers, patients) and one quality-process
 * document per service. Prefix FP5_ / fp5. Built on frkPdf (FrKit.jsx), so every page carries the round
 * Frequent Research emblem watermark, the branded header and the "Prepared for" footer.
 * Content rule: describes how we work and who we can reach. No invented statistics; feasibility for any
 * specific audience is always confirmed per project.
 */
import { PORTALS, VERTICALS } from '../../app/data/site.jsx';
import { frkFile, frkMix, frkPdf } from './FrKit.jsx';
import { frpCerts, frpContact, frpDate } from './Pdfs.jsx';
import { qp5Book } from './QualityPdf65.jsx';
import { SQ7_DOCS } from '../../data/ServiceQuality65.jsx';
import { sq7Book } from './ServiceQualityPdf65.jsx';

/* numbered flow diagram: steps [[title, text, gate?]] */
function fp5Flow(P, steps) {
  const R = 4.6;
  steps.forEach(([t, d, gate], i) => {
    const lines = P.doc.splitTextToSize(P.T(d), P.CW - 24);
    const gl = gate ? P.doc.splitTextToSize(P.T("Quality gate: " + gate), P.CW - 30) : [];
    const h = 8 + lines.length * 4.3 + (gl.length ? gl.length * 4 + 5 : 0);
    P.need(h + 2);
    const y = P.st.y;
    if (i < steps.length - 1) {
      P.doc.setDrawColor(...frkMix(P.A, [255, 255, 255], 0.55));
      P.doc.setLineWidth(0.6);
      P.doc.line(P.M + R, y + R * 2, P.M + R, y + h + 2);
    }
    P.doc.setFillColor(...P.A);
    P.doc.circle(P.M + R, y + R, R, "F");
    P.doc.setFont("helvetica", "bold");
    P.doc.setFontSize(9);
    P.doc.setTextColor(255, 255, 255);
    P.doc.text(String(i + 1), P.M + R, y + R + 1.2, { align: "center" });
    P.doc.setFontSize(11);
    P.doc.setTextColor(...P.NAVY);
    P.doc.text(P.T(t), P.M + 14, y + 4.6);
    P.doc.setFont("helvetica", "normal");
    P.doc.setFontSize(8.9);
    P.doc.setTextColor(...P.INK);
    P.doc.text(lines, P.M + 14, y + 9.6);
    if (gl.length) {
      const gy = y + 9.6 + lines.length * 4.3;
      P.doc.setFillColor(...frkMix(P.A2, [255, 255, 255], 0.86));
      P.doc.roundedRect(P.M + 14, gy - 1.5, P.CW - 16, gl.length * 4 + 3.4, 1.5, 1.5, "F");
      P.doc.setFont("helvetica", "bold");
      P.doc.setFontSize(8.2);
      P.doc.setTextColor(...frkMix(P.A, [0, 0, 0], 0.25));
      P.doc.text(gl, P.M + 17, gy + 2.2);
    }
    P.st.y += h + 2;
  });
  P.st.y += 2;
}

/* two-column checklist with ticks */
function fp5Checks(P, list) {
  const colW = (P.CW - 6) / 2;
  for (let i = 0; i < list.length; i += 2) {
    const a = P.doc.splitTextToSize(P.T(list[i]), colW - 9),
      b = list[i + 1] ? P.doc.splitTextToSize(P.T(list[i + 1]), colW - 9) : [];
    const h = Math.max(a.length, b.length) * 4.2 + 4;
    P.need(h);
    [a, b].forEach((ls, k) => {
      if (!ls.length) return;
      const x = P.M + k * (colW + 6);
      P.doc.setFillColor(...frkMix(P.A, [255, 255, 255], 0.88));
      P.doc.roundedRect(x, P.st.y - 3.4, 5, 5, 1.2, 1.2, "F");
      P.doc.setDrawColor(...P.A);
      P.doc.setLineWidth(0.7);
      P.doc.line(x + 1.2, P.st.y - 0.9, x + 2.2, P.st.y + 0.2);
      P.doc.line(x + 2.2, P.st.y + 0.2, x + 4, P.st.y - 2.3);
      P.doc.setFont("helvetica", "normal");
      P.doc.setFontSize(8.8);
      P.doc.setTextColor(...P.INK);
      P.doc.text(ls, x + 7.5, P.st.y);
    });
    P.st.y += h;
  }
  P.st.y += 2;
}

/* ── healthcare panel books ─────────────────────────────────────────────────────────── */
const FP5_HC = {
  hcp: {
    title: "Healthcare Professionals Panel Book",
    short: "Healthcare professionals",
    accent: ["#0E7490", "#22D3EE"],
    big: "Healthcare professionals",
    sub: "Verified physicians, specialists, nurses, pharmacists and allied healthcare professionals for quantitative and qualitative healthcare research.",
    who: ["Physicians & specialists", "General practitioners", "Hospital-based doctors", "Nurses", "Pharmacists", "Allied healthcare professionals"],
    specialties: ["Cardiology", "Oncology", "Endocrinology & diabetes", "Neurology", "Psychiatry", "Dermatology", "Pulmonology", "Gastroenterology", "Rheumatology", "Paediatrics", "Obstetrics & gynaecology", "Ophthalmology", "Orthopaedics", "Nephrology", "Infectious diseases", "Dentistry"],
    profile: [
      ["Specialty & sub-specialty", "Primary and secondary specialty, so studies reach the right experts."],
      ["Experience", "Years in practice and career stage."],
      ["Practice setting", "Hospital, clinic, private practice, academic or retail pharmacy."],
      ["Role in treatment", "Treating, prescribing, recommending or dispensing role."],
      ["Patient mix", "The patient groups a professional sees, used for screening."],
      ["Geography", "Country, region and city tier."],
    ],
    studies: ["Attitude, awareness & usage (AAU) studies", "Message and concept testing", "Product and device feedback", "In-depth interviews (IDIs)", "Online discussions & bulletin boards", "Conjoint and choice studies", "Treatment-pathway mapping", "Advisory-style expert sessions"],
    care: [
      ["Verification", "Healthcare professionals complete a verification step before they can take HCP studies."],
      ["Honoraria", "Fair honoraria that respect a professional's time and expertise."],
      ["Short, relevant studies", "Screening by specialty and setting keeps studies relevant and the drop-out low."],
      ["Confidentiality", "Professional details are used only for research and never shared for marketing."],
    ],
    cta: "Request HCP feasibility",
    file: "Healthcare Professionals Panel Book",
  },
  caregivers: {
    title: "Caregivers Panel Book",
    short: "Caregivers",
    accent: ["#C2410C", "#FBBF24"],
    big: "Caregivers",
    sub: "People who care for a family member or loved one, sharing the day-to-day reality of care, support services, products and treatments.",
    who: ["Parents of children with health needs", "Adult children caring for elderly parents", "Spouses & partners", "Caregivers of people with chronic conditions", "Caregivers of people with disabilities", "Paid & family home-care helpers"],
    specialties: ["Elderly care & ageing", "Dementia & memory care", "Cancer care", "Diabetes management", "Heart & stroke recovery", "Mobility & disability", "Child development & special needs", "Mental health support", "Post-surgery recovery", "Palliative care"],
    profile: [
      ["Relationship", "Who they care for: child, parent, spouse or other relative."],
      ["Condition cared for", "The condition or need behind the caregiving, shared with consent."],
      ["Care intensity", "Hours and type of daily support provided."],
      ["Care setting", "Home care, assisted living or alongside hospital care."],
      ["Decision role", "Who chooses products, providers and services."],
      ["Geography", "Country, region and city tier."],
    ],
    studies: ["Caregiver journey mapping", "Burden & support needs studies", "Home-care product feedback", "Pharmacy & medication-management experience", "Digital health & app usability", "Service and helpline evaluation", "In-depth interviews", "Online diaries & communities"],
    care: [
      ["Respect for time", "Short studies scheduled around caregiving responsibilities."],
      ["Sensitive topics", "Questions written with care, with the option to skip anything personal."],
      ["Privacy", "Health details about the person cared for are kept confidential."],
      ["Rewards", "Members are rewarded for every completed study."],
    ],
    cta: "Request caregiver feasibility",
    file: "Caregivers Panel Book",
  },
  patients: {
    title: "Patients Panel Book",
    short: "Patients",
    accent: ["#7C3AED", "#F472B6"],
    big: "Patients",
    sub: "People living with health conditions who choose to share their experience of diagnosis, treatment, care and everyday life.",
    who: ["People living with chronic conditions", "Recently diagnosed patients", "People on long-term treatment", "Patients managing lifestyle conditions", "People with rare conditions (feasibility per study)", "Patients recovering from surgery"],
    specialties: ["Diabetes", "Hypertension & heart health", "Asthma & COPD", "Cancer", "Arthritis & joint pain", "Thyroid conditions", "Skin conditions", "Mental health & wellbeing", "Women's health", "Digestive health", "Kidney health", "Eye health"],
    profile: [
      ["Condition", "Conditions members choose to share, with consent."],
      ["Treatment stage", "Newly diagnosed, on treatment, switching or in remission."],
      ["Treatment type", "Medication, devices, therapy or lifestyle management."],
      ["Care touchpoints", "Doctors, hospitals, pharmacies and apps they use."],
      ["Demographics", "Age, gender, household and income."],
      ["Geography", "Country, region and city tier."],
    ],
    studies: ["Patient journey research", "Treatment experience & satisfaction", "Unmet needs studies", "Medical device usability", "Pharmacy & adherence studies", "Health app & telemedicine feedback", "In-depth interviews", "Online communities & diaries"],
    care: [
      ["Consent first", "Health information is shared only with explicit consent and can be updated anytime."],
      ["Confidential", "Answers are reported in aggregate and never linked to a member's identity for clients."],
      ["Gentle design", "Sensitive questions are optional and written in plain, respectful language."],
      ["Rewards", "Members are rewarded for their time on every completed study."],
    ],
    cta: "Request patient feasibility",
    file: "Patients Panel Book",
  },
};

async function fp5Health(k, lead) {
  const B = FP5_HC[k];
  const mho = PORTALS.find((r) => r.slug === "myhealthopinions") || {};
  const P = await frkPdf({ title: B.title, kind: "Healthcare panel book", lead, accent: B.accent[0], accent2: B.accent[1] });
  P.cover({
    eyebrow: "MyHealthOpinions by Frequent Research · Healthcare panel book",
    big: B.big,
    sub: B.sub,
    meta: [
      ["Panel", mho.name || "MyHealthOpinions"],
      ["Audience", B.short],
      ["Edition", frpDate()],
    ],
  });
  P.startBody();
  P.h2("About this panel", "Part of MyHealthOpinions, our healthcare research community");
  if (mho.intro) P.para(mho.intro, { size: 9.6, lh: 4.9 });
  P.st.y += 2;
  P.h2("Who is in it");
  P.chips(B.who);
  P.h2(k === "hcp" ? "Specialties we are asked for most" : k === "caregivers" ? "Care areas" : "Condition areas", "Typical requests. Feasibility for every audience is confirmed per project before fieldwork.");
  P.chips(B.specialties, { color: P.A2 });
  P.h2("How members are profiled", "The attributes we screen and target on");
  P.tiles(B.profile, { cols: 2, h: 20 });
  P.h2("How members join", "Every member goes through the same steps");
  fp5Flow(
    P,
    (mho.steps || []).map((s) => [s.t, s.d])
  );
  P.h2("Studies this panel supports");
  fp5Checks(P, B.studies);
  P.h2("How we look after members");
  P.tiles(B.care, { cols: 2, h: 20 });
  if (mho.topics) {
    P.h2("Research topics");
    P.chips(mho.topics, { color: P.A2 });
  }
  frpCerts(P);
  frpContact(P, B.cta, "www.frequentresearch.com/lets-talk?type=audience");
  return P.finish(frkFile("Frequent Research - " + B.file + ".pdf"));
}

/* ── quality process, one per service ───────────────────────────────────────────────── */
const FP5_Q = {
  "digital-marketing": {
    accent: ["#DB2777", "#F59E0B"],
    big: "Digital Marketing quality process",
    sub: "How we keep campaigns accurate, brand-safe and accountable, from the first audit to the monthly report.",
    principles: [
      ["Measure before we spend", "Tracking, pixels and conversion goals are verified before any budget goes live."],
      ["Brand-safe by default", "Every creative, keyword list and placement is checked against your brand rules."],
      ["Test, don't guess", "Changes are made through structured tests, with results recorded."],
      ["Plain reporting", "Reports tie spend to leads and sales, in language anyone can read."],
    ],
    gates: ["Access, tracking and analytics audited; gaps listed before planning", "Strategy, budget and targets approved by you in writing", "Two-person check of ads, links, UTMs, landing pages and budgets before launch", "Weekly review of search terms, placements and spend pacing", "Numbers reconciled between ad platforms and analytics before reporting"],
    checks: ["Conversion tracking tested end to end", "UTM naming convention on every link", "Negative keyword and placement exclusion lists", "Landing page speed and mobile checks", "Ad copy proofread and policy-checked", "Budget caps and alerts set on every account", "Creative approvals recorded", "Monthly data reconciliation", "Access reviewed when team members change", "Client owns all ad and analytics accounts"],
  },
  "it-development": {
    accent: ["#7C3AED", "#22D3EE"],
    big: "IT & Development quality process",
    sub: "How we design, build, test and release software that is secure, maintainable and does what was agreed.",
    principles: [
      ["Agreed before built", "Requirements, designs and acceptance criteria are signed off before development starts."],
      ["Reviewed code", "No code reaches the main branch without a second developer's review."],
      ["Tested at every layer", "Unit, integration and user-acceptance testing before each release."],
      ["Secure by design", "Security checks and least-privilege access are part of every sprint."],
    ],
    gates: ["Requirements and acceptance criteria documented and approved", "Wireframes, UI and architecture reviewed before build", "Peer code review and automated tests on every change", "QA test cycle and user-acceptance sign-off on staging", "Release checklist, backups and rollback plan before go-live", "Post-launch monitoring and a support window"],
    checks: ["Version control with protected main branch", "Coding standards and linting", "Automated unit and integration tests", "Security checks for common web vulnerabilities", "Staging environment that mirrors production", "Performance and mobile testing", "Accessibility checks on key journeys", "Documented deployment and rollback steps", "Backups verified before each release", "Handover documentation and source code ownership"],
  },
  "accounts-finance": {
    accent: ["#0F9D74", "#F4C152"],
    big: "Accounts & Finance quality process",
    sub: "How we keep books accurate, filings on time and financial data confidential.",
    principles: [
      ["Maker and checker", "Every entry, reconciliation and return is prepared by one person and reviewed by another."],
      ["Deadlines first", "A compliance calendar tracks every statutory due date for each client."],
      ["Documented", "Working papers and supporting documents are kept for every figure we report."],
      ["Confidential", "Financial data is handled under our information-security controls."],
    ],
    gates: ["Client onboarding: documents, access and scope confirmed", "Monthly bookkeeping prepared and reviewed by a second accountant", "Bank, ledger and tax reconciliations completed before closing", "Returns and filings reviewed and approved by you before submission", "MIS and reports checked against the books before they are shared"],
    checks: ["Maker-checker review on all entries", "Monthly bank reconciliation", "GST and TDS reconciliation before filing", "Compliance calendar with reminders", "Client approval before every filing", "Supporting documents stored for every entry", "Restricted, role-based access to client data", "Variance review on monthly MIS", "Year-end closing checklist", "Change log for every adjustment"],
  },
};

async function fp5Quality(slug, lead) {
  if (slug === "market-research") return qp5Book(lead);
  if (SQ7_DOCS[slug]) return sq7Book(slug, lead);
  const Q = FP5_Q[slug];
  const v = VERTICALS.find((x) => x.slug === slug) || { name: slug, process: [] };
  const P = await frkPdf({ title: v.name + " quality process", kind: "Quality process", lead, accent: Q.accent[0], accent2: Q.accent[1] });
  P.cover({
    eyebrow: "Frequent Research · " + v.name,
    big: Q.big,
    sub: Q.sub,
    meta: [
      ["Process steps", String((v.process || []).length)],
      ["Quality checks", String(Q.checks.length)],
      ["Edition", frpDate()],
    ],
  });
  P.startBody();
  P.h2("Our quality principles");
  P.tiles(Q.principles, { cols: 2, h: 22 });
  P.h2("How every project runs", "Each step ends with a quality gate before the next one starts");
  fp5Flow(
    P,
    (v.process || []).map((s, i) => [s.t, s.d, Q.gates[Math.min(i, Q.gates.length - 1)]])
  );
  P.h2("Quality checklist", "Checks applied on every " + v.name + " engagement");
  fp5Checks(P, Q.checks);
  frpCerts(P);
  frpContact(P, "Questions about how we work?", "www.frequentresearch.com/lets-talk");
  return P.finish(frkFile("Frequent Research - " + v.name.replace(/&/g, "and") + " Quality Process.pdf"));
}

export { fp5Checks, fp5Health, fp5Quality };
