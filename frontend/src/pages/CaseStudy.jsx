/*
 * Case study page (build 51) — /industries-case-studies/:industry/:caseSlug. Prefix CSX_. Styles: src/styles/case-study.css (cs5-).
 * Replaces the stage-1 IN_Case view. Data comes from the base case files (loadCases) plus, for the 22 sectors that had none,
 * the illustrative cases in src/data/CasesExtra*.jsx (labelled "Illustrative engagement" everywhere).
 *
 * Layout: hero in the case's service colours with the round Frequent Research emblem as a watermark and a 3D
 * "case file"; a four-step story rail (challenge → approach → outcome → learning); a sticky project snapshot; a
 * "project at a glance" board with charts drawn only from the case's own facts (phase timeline from the stated
 * timeline, service mix by team, markets); related cases; and a gated PDF download (FRG_Gate → frpCaseStudy,
 * POST /api/case-study-download).
 */
const CSX_RULES = [
  ["accounts-finance", /(account|bookkeep|gst|tds|tax|payroll|audit|mis &|cfo|budget|valuation|financial model|due diligence|year-end|corporate finance|finance consult|business finance|reconcil)/i],
  ["it-development", /(develop|software|application|app\b|api|crm|erp|cloud|devops|cyber|ai &|automation solution|ui\/ux|dashboards|testing|website)/i],
  ["digital-marketing", /(seo|ads|ppc|social|content|lead gen|marketing|influencer|video|email|whatsapp|reputation|cro|performance|landing)/i],
  ["market-research", /(research|panel|survey|data collection|sampling|reporting & insights|consultancy|government|data processing|market sizing|insight)/i],
];
const csxSvcVertical = (s) => (CSX_RULES.find(([, re]) => re.test(s)) || ["market-research"])[0];
function csxVertical(cs) {
  const c = {};
  (cs.services || []).forEach((s) => {
    const v = csxSvcVertical(s);
    c[v] = (c[v] || 0) + 1;
  });
  const first = (cs.services || [])[0];
  const best = Object.keys(c).sort((a, b) => c[b] - c[a] || (first && csxSvcVertical(first) === a ? -1 : 1))[0];
  return best || "market-research";
}


/* phase bars derived from the stated timeline (shares are an indicative split, labelled as such) */

export { csxSvcVertical, csxVertical };
