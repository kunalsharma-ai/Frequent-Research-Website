/*
 * Build 80: the moving pictures of the four platforms and of Sampledge products, used on the home page slides and on
 * each platform page. Same kit as the service heroes (kit80.jsx), framed in a box (.c80box). Styles: k80d.css (.h80-hub*).
 */
import * as ee from 'react';
import { makeScene, n_ } from './kit80.jsx';

/* hub: the platform in the middle, its services around it light up one by one and send work to the centre */
function Hub({ k, core, sub, items }) {
  const n = items.length;
  return (
    <div className={"h80-hub h80-hub--" + k} style={{ "--n": n }}>
      <i className="h80-hub__ring" /><i className="h80-hub__ring h80-hub__ring--2" /><i className="h80-hub__run" />
      <div className="h80-hub__core">
        {k === "mr" ? <><i className="c80-panel__land" /><i className="c80-panel__shine" /></> : null}
        {k === "dm" ? n_(3).map((i) => <i key={i} className="h80-hub__wave" style={{ "--i": i }} />) : null}
        {k === "it" ? <i className="h80-hub__code">{"</>"}</i> : null}
        {k === "af" ? <i className="h80-hub__coin">₹</i> : null}
        <p className="h80-hub__lab"><b>{core}</b><small>{sub}</small></p>
      </div>
      {items.map((t, i) => (
        <span key={t} className="h80-hub__it" style={{ "--a": (i * 360) / n + "deg", "--i": i }}><b>{t}</b></span>
      ))}
      {n_(4).map((i) => <i key={i} className="h80-hub__pk" style={{ "--a": i * 90 + 45 + "deg", "--i": i }} />)}
    </div>
  );
}

/* Sampledge: the product cards deal round one after another, each showing what it does */
function Prods({ list }) {
  return (
    <div className="h80-pr" style={{ "--n": list.length }}>
      {list.map((p, i) => (
        <div key={p.id} className="h80-pr__c" style={{ "--i": i, "--pc": p.c1 }}>
          <p className="h80-pr__top"><i>{(p.short || p.name).slice(0, 1)}</i><b>{p.short || p.name}</b></p>
          <p className="h80-pr__tag">{p.tag}</p>
          <div className="h80-pr__ui">{n_(3).map((j) => <i key={j} style={{ "--v": [0.8, 0.55, 0.7][j] }} />)}</div>
        </div>
      ))}
      <p className="h80-pr__dots">{list.map((p, i) => <i key={p.id} style={{ "--i": i, "--pc": p.c1 }} />)}</p>
    </div>
  );
}

const PLAT = {
  mr: {
    pal: ["#0f9c8f", "#22d3ee", "#facc15"],
    hero: { t: "hub", k: "mr", core: "55+", sub: "markets", items: ["Online surveys", "CATI", "Focus groups", "B2B panel", "Healthcare", "Data processing", "Reporting", "Consumer panel"] },
    beats: [
      { t: "stat", at: "tl", h: "Answers collected", v: "2.4M", d: "▲ this year", live: 1, spark: 1 },
      { t: "rings", at: "tr", h: "Quality", rows: [["Verified", 0.98], ["On time", 0.96], ["Repeat", 0.9]] },
      { t: "chip", at: "chip", x: "Insights you can act on" },
    ],
  },
  dm: {
    pal: ["#e11d74", "#ff7a1a", "#ffd23f"],
    hero: { t: "hub", k: "dm", core: "4.1x", sub: "average ROI", items: ["SEO", "Google Ads", "Social media", "Email", "WhatsApp", "Influencers", "Video", "Analytics"] },
    beats: [
      { t: "stat", at: "tl", h: "Leads this month", v: "1,284", d: "▲ 62%", spark: 1 },
      { t: "bars", at: "tr", h: "Best channels", rows: [["Search", 0.44], ["Social", 0.32], ["Email", 0.24]] },
      { t: "chip", at: "chip", x: "Growth you can measure" },
    ],
  },
  it: {
    pal: ["#4f46e5", "#22d3ee", "#a3e635"],
    hero: { t: "hub", k: "it", core: "120+", sub: "apps shipped", items: ["Web apps", "Mobile apps", "AI", "Cloud", "Security", "ERP", "CRM", "Testing"] },
    beats: [
      { t: "stat", at: "tl", h: "Uptime", v: "99.98%", d: "● live", live: 1, spark: 1 },
      { t: "tags", at: "tr", h: "Built with", rows: ["React", "Node", "Flutter", "AWS"] },
      { t: "chip", at: "chip", x: "Secure, fast, built to scale" },
    ],
  },
  af: {
    pal: ["#b8862b", "#1e3a8a", "#22c55e"],
    hero: { t: "hub", k: "af", core: "100%", sub: "on-time filing", items: ["Bookkeeping", "GST", "Income tax", "TDS", "Payroll", "Audit", "MIS", "Virtual CFO"] },
    beats: [
      { t: "stat", at: "tl", h: "Returns filed", v: "8,600", d: "▲ 0 penalties", spark: 1 },
      { t: "list", at: "tr", h: "Every month", rows: ["Books closed", "Taxes paid", "MIS shared"] },
      { t: "chip", at: "chip", x: "Numbers you can trust" },
    ],
  },
};
const SCENES = {};
for (const [k, s] of Object.entries(PLAT)) SCENES[k] = makeScene({ ...s, cls: "c80k--box" }, Hub);

/* one platform picture; "on" = only build the moving parts while its slide is showing */
export function Plat80({ k, on = true }) {
  const S = SCENES[k];
  if (!S) return null;
  const p = PLAT[k].pal;
  return <div className="c80box" style={{ "--a": p[0], "--b": p[1], "--c": p[2] }} aria-hidden="true">{on ? <S /> : null}</div>;
}
export const HAS_PLAT80 = (k) => !!SCENES[k];

/* Sampledge products picture */
export function Prods80({ list }) {
  const S = ee.useMemo(() => makeScene({
    cls: "c80k--box c80k--prods", fx: "stars",
    hero: { t: "prods", list },
    beats: [
      { t: "stat", at: "tl", h: "Sampledge products", v: String(list.length), d: "▲ one login", s: "Research, sales, tax and people tools" },
      { t: "tags", at: "tr", h: "Try free", rows: list.slice(0, 4).map((p) => p.short || p.name) },
      { t: "chip", at: "chip", x: "Built by researchers, for teams" },
    ],
  }, Prods), [list]);
  return <div className="c80box" style={{ "--a": "#6d28d9", "--b": "#22d3ee", "--c": "#facc15" }} aria-hidden="true"><S /></div>;
}

/* All services page: the four teams around the 67 services */
export const AllSvc80 = makeScene({
  hero: { t: "hub", k: "all", core: "67", sub: "services", items: ["Market Research", "Digital Marketing", "IT & Development", "Accounts & Finance"] },
  fx: "stars",
  beats: [
    { t: "stat", at: "tr", h: "Clients served", v: "2,000+", d: "▲ since 2015", s: "Research, marketing, technology and finance", spark: 1 },
    { t: "list", at: "tl", h: "One partner", rows: ["One point of contact", "Teams that work together", "Clear monthly reports"] },
    { t: "bubble", at: "b1", r: 1, x: "“One team for everything.”" },
    { t: "chip", at: "chip", x: "Tell us your goal, we build the mix" },
  ],
}, Hub);
