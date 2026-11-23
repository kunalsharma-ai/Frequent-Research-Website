/*
 * Build 65 update 19 — "Our reach", its own page in the About menu (/our-reach), like Our Journey (Kunal, 1 Nov 2026:
 * "completely new web page for our reach, not About us"). Prefix RC19_, styles reach19.css (rc19-).
 * Chapters: hero (3D flag globe in rings, rotating audience word) · chapter rail · 01 regions (five 3D region portals)
 * · 02 countries (dotted atlas + flag wall with region filter) · 03 sectors & industries · 04 departments · 05 job titles
 * · closing call to action. Data: R18_DATA, IN18_MAP, INDUSTRIES / INDUSTRY_GROUPS; reuses AB18_ (About18.jsx) and IN6_Atlas (Industries18.jsx).
 * Loops move transform / opacity only and pause off screen (AB17_Sec / .is-vis).
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { INDUSTRIES, INDUSTRY_GROUPS } from '../app/data/industries.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { K5_I } from '../components/site/Kit65.jsx';
import { pc5FlagUrl, pc5UseFlags } from '../data/PanelCountries65.jsx';
import { AB17_Sec, ab17Reduce, ab17Snd } from './About17.jsx';
import { R18_DATA } from '../data/Reach18.jsx';
import { AB18_Depts, AB18_FlagRiver, AB18_Globe, AB18_REG, AB18_Sectors, AB18_TitleRiver, AB18_Titles } from './About18.jsx';
import { IN6_Atlas } from './Industries18.jsx';

const RC19_WORDS = ["shoppers", "doctors", "CFOs", "farmers", "engineers", "nurses", "gamers", "plant managers", "patients", "IT buyers"];
const rc19D = () => R18_DATA;
const rc19Flags = () => pc5UseFlags();
const rc19Src = (flags, iso) => (flags && flags[iso] ? pc5FlagUrl(flags[iso]) : "");
const rc19Reg = (r) => AB18_REG[r] || { c1: "#2F6BFF", c2: "#8FB0FF", ic: "globe", short: r };
const rc19Fmt = (n) => (n || 0).toLocaleString("en-US");

function RC19_Word() {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (ab17Reduce()) return undefined;
    const t = setInterval(() => !document.hidden && setI((v) => (v + 1) % RC19_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="rc19-word" aria-live="off">
      <span key={i} className="rc19-word__in">
        {RC19_WORDS[i]}
      </span>
    </span>
  );
}

function RC19_Hero() {
  const D = rc19D();
  const flags = rc19Flags();
  const all = D.regions.flatMap(([name, cs]) => cs.map((c) => [...c, name]));
  const nHc = all.filter((c) => c[3]).length;
  return (
    <section className="rc19-hero" aria-labelledby="rc19-h1">
      <div className="rc19-hero__sky" aria-hidden="true">
        <i className="ab17-aur ab17-aur--a" />
        <i className="ab17-aur ab17-aur--b" />
        <i className="ab17-aur ab17-aur--c" />
        <i className="rc19-stars" />
      </div>
      <div className="container rc19-hero__in">
        <div className="rc19-hero__copy">
          <nav className="ab17-crumb" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink> <span aria-hidden="true">/</span> <HmLink to="/about-us">About</HmLink> <span aria-hidden="true">/</span> Our reach
          </nav>
          <span className="rc19-badge">
            <i /> Our reach · {all.length} countries · {D.regions.length} regions
          </span>
          <HeroH1 id="rc19-h1" className="rc19-h1">
            <span className="rc19-h1__a">Wherever your</span>
            <span className="rc19-h1__b">
              <RC19_Word />
            </span>
            <span className="rc19-h1__c">
              are, <em>we're already there.</em>
            </span>
          </HeroH1>
          <p className="rc19-lead">
            Our own panels of consumers, business professionals, teens (with parental consent) and healthcare professionals span {all.length} countries in five regions, profiled by sector, industry, department and {rc19Fmt(D.titles)} job titles.
          </p>
          <div className="ab17-ctas">
            <a href="#rc19-c1" className="ab17-btn ab17-btn--glow">
              Explore our reach <K5_I n="arrow" s={16} />
            </a>
            <HmLink to="/downloads/consumer-panel-books" className="ab17-btn ab17-btn--glass">
              <K5_I n="doc" s={16} /> Panel books
            </HmLink>
          </div>
        </div>
        <div className="rc19-stage" aria-hidden="true">
          <i className="rc19-ring rc19-ring--1" />
          <i className="rc19-ring rc19-ring--2" />
          <i className="rc19-ring rc19-ring--3" />
          <AB18_Globe countries={all} flags={flags} reg={null} />
          <span className="rc19-chip rc19-chip--a">
            <b>{all.length}</b> countries
          </span>
          <span className="rc19-chip rc19-chip--b">
            <b>{nHc}</b> with healthcare panels
          </span>
          <span className="rc19-chip rc19-chip--c">
            <b>{rc19Fmt(D.titles)}</b> job titles
          </span>
          <span className="rc19-chip rc19-chip--d">
            <b>{D.departments.length}</b> departments
          </span>
        </div>
      </div>
      <AB18_FlagRiver flags={flags} />
    </section>
  );
}

const RC19_CH = [
  ["rc19-c1", "01", "Regions", "globe"],
  ["rc19-c2", "02", "Countries", "flag"],
  ["rc19-c3", "03", "Sectors & industries", "layers"],
  ["rc19-c4", "04", "Departments", "kanban"],
  ["rc19-c5", "05", "Job titles", "id"],
];
function RC19_Rail() {
  const [on, setOn] = ee.useState(RC19_CH[0][0]);
  ee.useEffect(() => {
    if (!window.IntersectionObserver) return undefined;
    const io = new IntersectionObserver((en) => en.forEach((e) => e.isIntersecting && setOn(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    RC19_CH.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <nav className="rc19-rail" aria-label="Chapters">
      <div className="container rc19-rail__in">
        {RC19_CH.map(([id, n, t, ic]) => (
          <a key={id} href={"#" + id} onClick={go(id)} className={on === id ? "is-on" : ""} aria-current={on === id ? "true" : undefined}>
            <em>{n}</em>
            <K5_I n={ic} s={15} /> {t}
          </a>
        ))}
      </div>
    </nav>
  );
}

function RC19_Head({ n, kick, title, em, sub, dark }) {
  return (
    <div className={"rc19-head" + (dark ? " rc19-head--dk" : "")}>
      <span className="rc19-head__n" aria-hidden="true">
        {n}
      </span>
      <div>
        <span className="ab17-kick">{kick}</span>
        <h2 className="ab17-h2">
          {title} <em>{em}</em>
        </h2>
        {sub ? <p className="ab17-sub">{sub}</p> : null}
      </div>
    </div>
  );
}

function RC19_Regions({ onPick }) {
  const D = rc19D();
  const flags = rc19Flags();
  const total = D.regions.reduce((a, [, cs]) => a + cs.length, 0) || 1;
  return (
    <AB17_Sec className="rc19-c1" id="rc19-c1" aria-labelledby="rc19-c1-h">
      <div className="container">
        <RC19_Head n="01" kick="Regions" title={D.regions.length + " regions."} em="One standard everywhere." sub="Pick a region to see its countries on the map below." />
        <div className="rc19-portals">
          {D.regions.map(([r, cs], i) => {
            const m = rc19Reg(r);
            const pct = Math.round((cs.length / total) * 100);
            return (
              <button key={r} type="button" className="rc19-portal" style={{ "--c1": m.c1, "--c2": m.c2, "--i": i, "--p": pct }} onClick={() => onPick(r)}>
                <span className="rc19-portal__glow" aria-hidden="true" />
                <span className="rc19-portal__top">
                  <span className="rc19-portal__ic">
                    <K5_I n={m.ic} s={22} />
                  </span>
                  <span className="rc19-portal__pct">
                    <b>{pct}%</b> of our countries
                  </span>
                </span>
                <b className="rc19-portal__n">{cs.length}</b>
                <span className="rc19-portal__t">{r}</span>
                <span className="rc19-portal__fan" aria-hidden="true">
                  {cs.slice(0, 6).map((c, j) => (rc19Src(flags, c[1]) ? <img key={c[1]} src={rc19Src(flags, c[1])} alt="" style={{ "--j": j }} /> : null))}
                </span>
                <span className="rc19-portal__list">{cs.map((c) => c[0]).join(" · ")}</span>
                <span className="rc19-portal__go">
                  See on the map <K5_I n="arrow" s={14} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </AB17_Sec>
  );
}

function RC19_Countries({ reg, setReg }) {
  const D = rc19D();
  const flags = rc19Flags();
  const all = D.regions.flatMap(([name, cs]) => cs.map((c) => [...c, name]));
  const shown = reg ? all.filter((c) => c[4] === reg) : all;
  const markets = {};
  all.forEach((c) => (markets[c[1]] = { iso: c[1], n: c[3] ? 2 : 1 }));
  const pick = (r) => {
    setReg(r === reg ? null : r);
    ab17Snd("tab");
  };
  return (
    <AB17_Sec className="rc19-c2" id="rc19-c2" aria-labelledby="rc19-c2-h">
      <div className="rc19-c2__sky" aria-hidden="true">
        <i className="ab17-aur ab17-aur--a" />
        <i className="ab17-aur ab17-aur--b" />
      </div>
      <div className="container">
        <RC19_Head n="02" kick="Countries" title={all.length + " countries."} em="Every flag is our own panel." sub="Lines run from India, where we're based. Brighter markers have healthcare panels too. Open any country for its panel book." dark />
        <div className="rc19-tabs" role="tablist" aria-label="Regions">
          <button type="button" role="tab" aria-selected={!reg} className={"rc19-tab" + (!reg ? " is-on" : "")} style={{ "--c1": "#2F6BFF", "--c2": "#6D4AFF" }} onClick={() => pick(null)}>
            <K5_I n="globe" s={15} /> All <em>{all.length}</em>
          </button>
          {D.regions.map(([r, cs]) => {
            const m = rc19Reg(r);
            return (
              <button key={r} type="button" role="tab" aria-selected={reg === r} className={"rc19-tab" + (reg === r ? " is-on" : "")} style={{ "--c1": m.c1, "--c2": m.c2 }} onClick={() => pick(r)}>
                <K5_I n={m.ic} s={15} /> {r} <em>{cs.length}</em>
              </button>
            );
          })}
        </div>
        <div className="rc19-map"><IN6_Atlas markets={markets} active={reg} flags={flags} onPick={pick} /></div>
        <ul className="rc19-wall" key={reg || "all"}>
          {shown.map((c, i) => {
            const m = rc19Reg(c[4]);
            const src = rc19Src(flags, c[1]);
            return (
              <li key={c[1]} style={{ "--i": Math.min(i, 30), "--c1": m.c1, "--c2": m.c2 }}>
                <HmLink to={"/downloads/consumer-panel-books/" + c[2]} className="rc19-fc">
                  <span className="rc19-fc__f">{src ? <img src={src} alt="" decoding="async" /> : null}</span>
                  <b>{c[0]}</b>
                  <small>{m.short || c[4]}</small>
                  {c[3] ? <i className="rc19-fc__hc">+ Healthcare</i> : null}
                </HmLink>
              </li>
            );
          })}
        </ul>
      </div>
    </AB17_Sec>
  );
}

function RC19_Cta() {
  return (
    <AB17_Sec className="rc19-cta">
      <div className="container rc19-cta__in">
        <span className="rc19-cta__orb" aria-hidden="true">
          <K5_I n="globe" s={40} />
        </span>
        <h2 className="ab17-h2">
          Need a market <em>we didn't list?</em>
        </h2>
        <p className="ab17-sub">Tell us the country, the audience and the job titles. We'll confirm feasibility within one working day, with partner panels where we need them.</p>
        <div className="ab17-ctas ab17-ctas--c">
          <HmLink to="/lets-talk?type=feasibility" className="ab17-btn ab17-btn--glow">
            Check feasibility <K5_I n="arrow" s={16} />
          </HmLink>
          <HmLink to="/our-journey" className="ab17-btn ab17-btn--glass">
            Our journey
          </HmLink>
        </div>
      </div>
    </AB17_Sec>
  );
}

function RC19_Page() {
  dmMeta("/our-reach", "Our Reach | 55 countries, 5 regions, 58 industries, 1,108 job titles — Frequent Research", "Frequent Research's own panels reach consumers, business professionals, teens (with parental consent) and healthcare professionals in 55 countries across five regions, profiled by 8 sectors, 58 industries, 34 departments and 1,108 job titles.");
  const D = rc19D();
  const [reg, setReg] = ee.useState(null);
  const nI = INDUSTRIES.length;
  const nS = INDUSTRY_GROUPS.length;
  const pickFromPortal = (r) => {
    setReg(r);
    const el = document.getElementById("rc19-c2");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div className="ab17 rc19">
      <RC19_Hero />
      <RC19_Rail />
      <RC19_Regions onPick={pickFromPortal} />
      <RC19_Countries reg={reg} setReg={setReg} />
      <AB17_Sec className="rc19-c3" id="rc19-c3">
        <div className="container">
          <RC19_Head n="03" kick="Sectors & industries" title={nS + " sectors."} em={nI + " industries."} sub="From farms and factories to studios and stock exchanges. Pick any industry to read its case studies." />
          <AB18_Sectors />
        </div>
      </AB17_Sec>
      <AB17_Sec className="rc19-c4" id="rc19-c4">
        <div className="container">
          <RC19_Head n="04" kick="Departments" title="Every department," em="from the boardroom to the warehouse." sub={"The " + D.departments.length + " departments our business professional panel is profiled by, in every country."} />
          <AB18_Depts />
        </div>
      </AB17_Sec>
      <AB17_Sec className="rc19-c5" id="rc19-c5">
        <AB18_TitleRiver />
        <div className="container">
          <RC19_Head n="05" kick="Job titles" title={rc19Fmt(D.titles) + " job titles."} em="Find yours." sub="Pick an audience and a job family, or search any title: farm owners, plant managers, cabinet secretaries, surgeons, chief financial officers." />
          <AB18_Titles />
        </div>
      </AB17_Sec>
      <RC19_Cta />
    </div>
  );
}

export { RC19_Page };
