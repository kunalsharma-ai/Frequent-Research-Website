/*
 * Build 65 update 21 — About Us, redesigned again (Kunal, 2 November 2026: "completely fresh, unique design approach
 * which never seen before … highlight mission, vision, core capabilities for all services … present it very clearly").
 * Prefix AB21_, styles about21.css (ab21-). Reuses the About17 helpers (AB17_Sec, AB17_Head, AB17_I, AB17_IMG, AB17_T,
 * ab17Svc …) and the HD flags (pc5UseFlags) and dotted world map from Industries & Case Studies.
 *
 *  AB21_Hero    "the holo table": a tilted 3D world map made of light, with HD flag pins standing up from the countries we
 *               work in, a beacon on our New Delhi head office, the four engines floating above it, and a kinetic headline
 *  AB21_Who     who we are in one colourful sentence, four fact tiles and a ribbon of years with a comet running it
 *  AB21_MV      mission and vision as two big 3D cards with spinning emblems, plus our five values
 *  AB21_Table   core capabilities as a periodic table: every service of all four engines, numbered, colour-coded,
 *               filterable, each one linked to its page
 *  then the question path, ISO cards, our universe of communities and products, a flag river to Our reach, and the CTA
 * Loops move transform / opacity only and pause off screen (.is-vis on AB17_Sec).
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { pc5FlagUrl, pc5UseFlags } from '../data/PanelCountries65.jsx';
import { AB17_Cta, AB17_Galaxy, AB17_Head, AB17_I, AB17_IMG, AB17_Path, AB17_Sec, AB17_T, AB17_Trust, ab17Reduce, ab17Snd, ab17Svc, ab17Total, ab17V } from './About17.jsx';
import { AB18_FlagRiver } from './About18.jsx';
import { IN18_MAP } from '../data/Map18.jsx';

const AB21_PINS = ["US", "CA", "MX", "BR", "AR", "GB", "FR", "DE", "ES", "IT", "SE", "AE", "SA", "ZA", "KE", "IN", "SG", "JP", "AU", "CN"];
const AB21_YEARS = [
  ["2015", "Market research and digital marketing begin"],
  ["2017", "Formally established; Turn2Opinion and MyFrequentRewards"],
  ["2018", "MyHealthOpinions for healthcare voices"],
  ["2020", "Sampledge and IT & Development"],
  ["2022", "Accounts & Finance joins"],
  ["2023", "The Sampledge product family grows to seven"],
];
const AB21_VALUES = [
  ["check", "Accuracy", "Verified people, checked data, honest numbers."],
  ["bolt", "Speed", "Fast starts and clear timelines."],
  ["lock", "Ethics", "ISO-certified privacy and security."],
  ["handshake", "Partnership", "One owner for your whole brief."],
  ["spark", "Curiosity", "We ask the next question too."],
];
const ab21Cands = (name) => {
  const w = name.replace(/[^A-Za-z0-9 &]/g, " ").split(/\s+/).filter((x) => x && !/^(and|&|of|the|for|to|services?)$/i.test(x));
  const a = w[0] || "Xx", b = w[1] || "", c = w[2] || "";
  return [a[0] + (b[0] || a[1] || ""), c ? a[0] + c[0] : "", b ? b[0] + (c[0] || b[1] || "") : "", a.slice(0, 2), b ? a[0] + b[1] : "", a[0] + (a[2] || "")].filter((x) => x && x.length === 2);
};
const ab21Fmt = (s) => s[0].toUpperCase() + s[1].toLowerCase();
const ab21Syms = (list) => {
  const used = new Set();
  return list.map((nm) => {
    const c = ab21Cands(nm).map(ab21Fmt);
    let s = c.find((x) => !used.has(x));
    for (let i = 2; !s; i++) if (!used.has(c[0] + i)) s = c[0] + i;
    used.add(s);
    return s;
  });
};
const ab21Flag = (flags, iso) => (flags && flags[iso] ? pc5FlagUrl(flags[iso]) : "");

function AB21_Hero() {
  const flags = pc5UseFlags();
  const pos = IN18_MAP;
  const words = ["researchers", "marketers", "engineers", "accountants", "one team"];
  const [w, setW] = ee.useState(0);
  ee.useEffect(() => {
    if (ab17Reduce()) return undefined;
    const t = setInterval(() => setW((x) => (x + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <AB17_Sec className="ab21-hero" aria-labelledby="ab21-h1">
      <div className="ab21-hero__sky" aria-hidden="true">
        <i className="ab21-grade ab21-grade--a" />
        <i className="ab21-grade ab21-grade--b" />
        <i className="ab21-grade ab21-grade--c" />
        <i className="ab21-stars" />
      </div>
      <div className="container ab21-hero__in">
        <div className="ab21-hero__copy">
          <nav className="ab21-crumb" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink> / <span>About Us</span>
          </nav>
          <span className="ab21-eye">
            <i /> About Frequent Research · since 2015
          </span>
          <HeroH1 id="ab21-h1" className="ab21-h1">
            <span className="ab21-h1__a">We turn</span>
            <span className="ab21-h1__b">questions</span>
            <span className="ab21-h1__c">into growth.</span>
          </HeroH1>
          <p className="ab21-we">
            We are{" "}
            <span className="ab21-we__box">
              <b key={w}>{words[w]}</b>
            </span>
          </p>
          <p className="ab21-lede">One accountable team for market research, digital marketing, IT & development and accounts & finance, with our own panels in 55 countries and seven Sampledge products.</p>
          <div className="ab21-ctas">
            <a className="ab21-btn ab21-btn--a" href="#ab21-mv" onClick={(e) => (e.preventDefault(), document.getElementById("ab21-mv") && document.getElementById("ab21-mv").scrollIntoView({ behavior: "smooth" }))}>
              Our mission and vision <AB17_I n="arrow" s={16} />
            </a>
            <HmLink to="/lets-talk" className="ab21-btn">
              Talk to us
            </HmLink>
          </div>
        </div>
        <div className="ab21-stage" aria-hidden="true">
          <div className="ab21-table">
            <div className="ab21-table__disc">
              <img className="ab21-table__map" src="__IMG:in18/world-dots__" alt="" decoding="async" />
              <i className="ab21-table__scan" />
              <i className="ab21-table__rim" />
              {AB21_PINS.filter((c) => pos[c]).map((c, k) => (
                <span key={c} className={"ab21-pin" + (c === "IN" ? " ab21-pin--hq" : "")} style={{ left: pos[c][0] + "%", top: pos[c][1] + "%", "--k": k }}>
                  <span className="ab21-pin__up">
                    {c === "IN" ? (
                      <span className="ab21-hq">
                        <AB17_I n="pin" s={12} /> Head office · New Delhi
                      </span>
                    ) : null}
                    <span className="ab21-pin__flag">{ab21Flag(flags, c) ? <img src={ab21Flag(flags, c)} alt="" /> : null}</span>
                    <i className="ab21-pin__stick" />
                  </span>
                  <i className="ab21-pin__dot" />
                  {c === "IN" ? (
                    <>
                      <i className="ab21-pin__ring" />
                      <i className="ab21-pin__ring ab21-pin__ring--2" />
                    </>
                  ) : null}
                </span>
              ))}
            </div>
          </div>
          {AB17_T.map((t, k) => (
            <span key={t.key} className={"ab21-eng ab21-eng--" + k} style={{ ...ab17V(t), "--k": k }}>
              <img src={AB17_IMG[t.key]} alt="" decoding="async" />
              <b>{t.verb}</b>
              <small>{t.name}</small>
            </span>
          ))}
          <span className="ab21-chip ab21-chip--a">
            <b>55</b> countries
          </span>
          <span className="ab21-chip ab21-chip--b">
            <b>{ab17Total()}</b> services
          </span>
        </div>
      </div>
    </AB17_Sec>
  );
}

function AB21_Who() {
  const facts = [
    ["clock", "2015", "the year we started"],
    ["globe", "55", "countries with our own panels"],
    ["layers", String(ab17Total()), "services in four engines"],
    ["star", "3", "ISO certifications"],
  ];
  return (
    <AB17_Sec className="ab21-who" aria-labelledby="ab21-who-h">
      <div className="container">
        <span className="ab17-kick">Who we are</span>
        <h2 id="ab21-who-h" className="ab21-say">
          One accountable team that <span className="ab21-w ab21-w--mr">researches</span>, <span className="ab21-w ab21-w--dm">markets</span>, <span className="ab21-w ab21-w--it">builds</span> and <span className="ab21-w ab21-w--af">balances</span> for brands in <span className="ab21-w ab21-w--gl">55 countries</span>.
        </h2>
        <div className="ab21-facts">
          {facts.map(([ic, n, t], k) => (
            <div key={t} className="ab21-fact" style={{ "--k": k }}>
              <span className="ab21-fact__ic">
                <AB17_I n={ic} s={20} />
              </span>
              <b>{n}</b>
              <small>{t}</small>
            </div>
          ))}
        </div>
        <ol className="ab21-years">
          <i className="ab21-years__line" aria-hidden="true">
            <b />
          </i>
          {AB21_YEARS.map(([y, t], k) => (
            <li key={y} style={{ "--k": k }}>
              <b>{y}</b>
              <span>{t}</span>
            </li>
          ))}
        </ol>
        <p className="ab21-more">
          <HmLink to="/our-journey">
            Read the whole story in Our Journey <AB17_I n="arrow" s={15} />
          </HmLink>
        </p>
      </div>
    </AB17_Sec>
  );
}

function AB21_MV() {
  const cards = [
    ["m", "Our mission", "target", "Give every business, wherever it works, answers it can trust and the tools to act on them: research, marketing, technology and finance from one accountable team.", [["spark", "Evidence before every big decision"], ["handshake", "One brief, one owner, one standard"], ["chart", "Results measured and reported honestly"]]],
    ["v", "Our vision", "globe", "Be the most trusted single partner for growing businesses in 55 countries, where every campaign, product and plan starts with a real voice and ends with a real number.", [["globe", "Every market within reach"], ["layers", "Every engine under one roof"], ["users", "Every client a long-term partner"]]],
  ];
  return (
    <AB17_Sec className="ab21-mv" id="ab21-mv" aria-labelledby="ab21-mv-h">
      <div className="container">
        <AB17_Head id="ab21-mv-h" kick="Mission & vision" title="Why we exist," em="and where we're headed." center />
        <div className="ab21-mv__pair">
          {cards.map(([k, h, ic, q, pil], n) => (
            <article key={k} className={"ab21-card ab21-card--" + k} style={{ "--n": n }}>
              <img className="ab21-card__img" src={n ? AB17_IMG.hero : AB17_IMG.mr} alt="" decoding="async" />
              <span className="ab21-card__em" aria-hidden="true">
                <i className="ab21-card__ring" />
                <i className="ab21-card__ring ab21-card__ring--b" />
                <AB17_I n={ic} s={34} />
              </span>
              <span className="ab21-card__tag">{n ? "Where we're going" : "What we do it for"}</span>
              <h3>{h}</h3>
              <p>{q}</p>
              <ul>
                {pil.map(([pic, t]) => (
                  <li key={t}>
                    <span>
                      <AB17_I n={pic} s={15} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="ab21-values" aria-label="Our values">
          {AB21_VALUES.map(([ic, t, d], k) => (
            <div key={t} className="ab21-val" style={{ "--k": k }}>
              <span>
                <AB17_I n={ic} s={18} />
              </span>
              <b>{t}</b>
              <small>{d}</small>
            </div>
          ))}
        </div>
      </div>
    </AB17_Sec>
  );
}

function AB21_Table() {
  const [f, setF] = ee.useState("all");
  let n = 0;
  const groups = AB17_T.map((t) => ({ t, S: ab17Svc(t.k).map((s) => ({ ...s, n: ++n })) }));
  const syms = ab21Syms(groups.flatMap((g) => g.S.map((s) => s.name)));
  return (
    <AB17_Sec className={"ab21-tab" + (f !== "all" ? " is-f" : "")} aria-labelledby="ab21-tab-h">
      <div className="container">
        <AB17_Head id="ab21-tab-h" kick="Core capabilities" title={"The periodic table of growth:"} em={n + " services, four engines."} sub="Every capability we offer, numbered and colour-coded by engine. Pick an engine to light it up, or open any element to see the service." center />
        <div className="ab21-filter" role="group" aria-label="Show engine">
          <button type="button" className={f === "all" ? "is-on" : ""} aria-pressed={f === "all"} onClick={() => (setF("all"), ab17Snd("tab"))}>
            All {n}
          </button>
          {AB17_T.map((t) => (
            <button key={t.key} type="button" style={ab17V(t)} className={f === t.key ? "is-on" : ""} aria-pressed={f === t.key} onClick={() => (setF(t.key), ab17Snd("tab"))}>
              <i />
              {t.name}
            </button>
          ))}
        </div>
        <div className="ab21-ptab">
          <i className="ab21-ptab__sweep" aria-hidden="true" />
          {groups.map(({ t, S }) => (
            <div key={t.key} className={"ab21-grp" + (f !== "all" && f !== t.key ? " is-dim" : f === t.key ? " is-lit" : "")} style={ab17V(t)}>
              <HmLink to={"/services/" + t.k} className="ab21-grp__head">
                <img src={AB17_IMG[t.key]} alt="" decoding="async" />
                <span>
                  <b>{t.name}</b>
                  <small>
                    {S.length} services · {t.tag}
                  </small>
                </span>
                <AB17_I n="arrow" s={16} />
              </HmLink>
              <div className="ab21-els">
                {S.map((s, j) => (
                  <HmLink key={s.slug} to={"/services/" + t.k + "/" + s.slug} className="ab21-el" style={{ "--j": j }} title={s.name}>
                    <small>{s.n}</small>
                    <b>{syms[s.n - 1]}</b>
                    <span>{s.name}</span>
                  </HmLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AB17_Sec>
  );
}

function AB21_Reach() {
  const flags = pc5UseFlags();
  return (
    <AB17_Sec className="ab21-reach" aria-labelledby="ab21-reach-h">
      <div className="container ab21-reach__in">
        <div>
          <span className="ab17-kick">Our reach</span>
          <h2 id="ab21-reach-h" className="ab17-h2">
            55 countries. <em>Five regions. One standard.</em>
          </h2>
          <p className="ab17-sub">Consumers, business professionals and healthcare professionals, profiled by sector, industry, department and 1,108 job titles.</p>
          <HmLink to="/our-reach" className="ab21-btn ab21-btn--a">
            Explore Our reach <AB17_I n="arrow" s={16} />
          </HmLink>
        </div>
      </div>
      <AB18_FlagRiver flags={flags} />
    </AB17_Sec>
  );
}

function AB21_Page() {
  dmMeta("/about-us", "About Us | We turn questions into growth — Frequent Research", "Frequent Research is one accountable team for market research, digital marketing, IT & development and accounts & finance, with its own panels in 55 countries and seven Sampledge products, since 2015.");
  return (
    <div className="ab17 ab21">
      <AB21_Hero />
      <AB21_Who />
      <AB21_MV />
      <AB21_Table />
      <AB17_Path />
      <AB17_Trust />
      <AB21_Reach />
      <AB17_Galaxy />
      <AB17_Cta />
    </div>
  );
}

export { AB21_Page };
