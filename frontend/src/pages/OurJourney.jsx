/*
 * Our Journey (build 65 redesign) — /our-journey, in the About menu. Prefix OJ_ (data, read by Pdfs.jsx) / OJ5_ (page).
 * Styles: src/styles/journey65.css (oj5-).
 * Dates as confirmed by Frequent Research for build 65:
 *   2015  Market Research and Digital Marketing start
 *   2017  formally established (incorporated 26 September 2017); Turn2Opinion and MyFrequentRewards launch
 *   2018  MyHealthOpinions launches
 *   2020  Sampledge launches; IT & Development services launch
 *   2022  Accounts & Finance services launch
 *   2023  SampAudience and the other Sampledge products launch
 * The page tells the story of all four teams and the products — not only research.
 *
 *  OJ5_Hero      warp tunnel of years + the big "years we have completed" clock (K5_Countdown "hero")
 *  OJ5_Lanes     one lane per service / product line, each bar growing from its launch year to today
 *  OJ5_Chapters  one chapter per milestone, each with its own colour grade, illustration and "what it meant" for clients
 *  OJ5_Sky       products and communities as a constellation, each linked to its own website
 *  OJ5_Today     where the four teams are today, and what comes next
 */
import * as ee from 'react';
import { VERTICALS } from '../app/data/site.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { FRK_LOGO_MFR, FRK_LOGO_MHO, FRK_LOGO_T2O, FRK_SamLogo } from '../components/site/FrKit.jsx';
import { K5_Count, K5_Countdown, K5_Field, K5_I, K5_Rv, K5_Sec, K5_Words, k5Reduce, k5Tilt, k5UseIn } from '../components/site/Kit65.jsx';
import { PR5_LIST, PR5_SITE } from '../data/Sampledge65.jsx';
import { FRL_Plate } from '../components/site/Logos13.jsx';
import { PR5_Logo } from '../components/site/PR5Logo.jsx';

const OJ_MILES = [
  {
    y: "2015",
    t: "Research and digital marketing begin",
    ic: "rocket",
    c: ["#22D3EE", "#2563EB"],
    teams: ["mr", "dm"],
    d: "Frequent Research starts with two crafts that still sit at its core: market research fieldwork — recruiting verified consumers across international markets — and digital marketing, used from day one to reach, recruit and engage the right people online.",
    meant: ["Clients get verified consumer respondents for online studies", "Digital campaigns recruit and re-engage panel members", "Research and marketing learn from each other from the very first project"],
    stats: [["2", "founding services"], ["20+", "markets reached (reported)"]],
  },
  {
    y: "2017",
    t: "Formally established · two panels launch",
    ic: "flag",
    c: ["#8B5CF6", "#2563EB"],
    teams: ["mr", "dm"],
    d: "Frequent Research Fieldwork Solutions Private Limited is incorporated on 26 September 2017, and two proprietary research communities launch: Turn2Opinion and MyFrequentRewards, for consumers and business professionals.",
    meant: ["Our own panels: more control over respondent quality", "B2B professionals joined consumers in our sample", "Marketing grows the communities; research keeps them engaged"],
    stats: [["26 Sep", "2017 incorporation"], ["2", "panels launched"]],
    logos: ["t2o", "mfr"],
  },
  {
    y: "2018",
    t: "Dedicated healthcare research",
    ic: "heart",
    c: ["#F43F5E", "#FB923C"],
    teams: ["mr"],
    d: "MyHealthOpinions launches: a community for doctors, nurses and other healthcare professionals, patients and caregivers — opening specialist healthcare research for pharmaceutical, medical-device and health-service clients.",
    meant: ["Verified healthcare professionals for medical research", "Patient and caregiver voices for health brands", "Telephone (CATI) fieldwork for hard-to-reach audiences"],
    stats: [["3", "proprietary communities"], ["HCP", "patients & caregivers"]],
    logos: ["mho"],
  },
  {
    y: "2020",
    t: "Sampledge and IT & Development launch",
    ic: "code",
    c: ["#7C3AED", "#10B981"],
    teams: ["it"],
    d: "Our engineers turn years of research operations into software: Sampledge launches as our technology platform for research operations, and the IT & Development team opens to clients — websites, custom software, web and mobile apps, SaaS, CRM and ERP.",
    meant: ["Research operations managed in one platform", "Clients can now build their websites, apps and SaaS with us", "Technology that we use ourselves before we sell it"],
    stats: [["Sampledge", "platform launched"], ["IT", "services open to clients"]],
    logos: ["sam"],
  },
  {
    y: "2022",
    t: "Accounts & Finance services launch",
    ic: "coin",
    c: ["#059669", "#F59E0B"],
    teams: ["af"],
    d: "The fourth team joins: accounting and bookkeeping, GST, TDS, income tax, payroll, MIS reporting, budgeting and virtual-CFO support — so growing businesses can keep their numbers as well-managed as their research, marketing and technology.",
    meant: ["Compliance calendars for GST, TDS and payroll", "Monthly MIS that founders can act on", "One partner from insight to financial control"],
    stats: [["4", "expert teams"], ["17", "finance services today"]],
  },
  {
    y: "2023",
    t: "SampAudience and the Sampledge product family",
    ic: "layers",
    c: ["#13B8FF", "#7548FF"],
    teams: ["it", "mr"],
    d: "Sampledge grows into a family of seven products: SampAudience for research audiences, SampCode for survey programming, SampBidx for bidding, SampTrek for research projects, SampForce for sales, Talk2Tax for accounting and SampCrew for HR.",
    meant: ["Self-serve audience sourcing for agencies and brands", "Software for sales, finance and HR teams too", "A connected ecosystem built by our IT team"],
    stats: [["7", "Sampledge products"], ["B2B · B2C · HC", "audiences in SampAudience"]],
    logos: ["sam"],
  },
  {
    y: "Today",
    t: "Four teams, one growth engine",
    ic: "target",
    c: ["#2563EB", "#DB2777"],
    teams: ["mr", "dm", "it", "af"],
    d: "Market Research, Digital Marketing, IT & Development and Accounts & Finance work side by side, with Sampledge and three research communities alongside. Next: deeper B2B and healthcare reach, smarter products, and measurable value in every engagement.",
    meant: ["One point of contact for research, marketing, technology and finance", "ISO 20252, 9001 and 27001 processes across teams", "Clients across 55+ research markets"],
    stats: [["67", "specialist services"], ["55+", "research markets"]],
  },
];
const OJ_PANELS = {
  t2o: { name: "Turn2Opinion", img: FRK_LOGO_T2O, url: "https://www.turn2opinion.com/", slug: "turn2opinion", d: "Online research community for business professionals and consumers: profiling, survey participation and engagement.", y: "2017" },
  mfr: { name: "MyFrequentRewards", img: FRK_LOGO_MFR, url: "https://www.myfrequentrewards.com/", slug: "myfrequentrewards", d: "Survey opportunities and rewards for consumers and professionals who share their opinions.", y: "2017" },
  mho: { name: "MyHealthOpinions", img: FRK_LOGO_MHO, url: "https://www.myhealthopinions.com/", slug: "myhealthopinions", d: "Healthcare research community for doctors, nurses, other healthcare professionals, patients and caregivers.", y: "2018" },
};

const OJ5_TEAMS = {
  mr: { n: "Market Research", c1: "#2563EB", c2: "#06B6D4", ic: "mr", to: "/services/market-research" },
  dm: { n: "Digital Marketing", c1: "#DB2777", c2: "#F97316", ic: "dm", to: "/services/digital-marketing" },
  it: { n: "IT & Development", c1: "#7C3AED", c2: "#10B981", ic: "it", to: "/services/it-development" },
  af: { n: "Accounts & Finance", c1: "#059669", c2: "#F59E0B", ic: "af", to: "/services/accounts-finance" },
};
const OJ5_LANES = [
  ["Market Research", 2015, "#2563EB", "#06B6D4", "mr", "/services/market-research"],
  ["Digital Marketing", 2015, "#DB2777", "#F97316", "dm", "/services/digital-marketing"],
  ["Research communities", 2017, "#F43F5E", "#FB923C", "users", "/portals"],
  ["IT & Development", 2020, "#7C3AED", "#10B981", "it", "/services/it-development"],
  ["Sampledge", 2020, "#13B8FF", "#7548FF", "layers", "/products"],
  ["Accounts & Finance", 2022, "#059669", "#F59E0B", "af", "/services/accounts-finance"],
];
const OJ5_Y0 = 2015;

/* ── hero ─────────────────────────────────────────────────────────────────────────── */
function OJ5_Hero() {
  const years = ["2015", "2017", "2018", "2020", "2022", "2023", "Today"];
  return (
    <section className="oj5-hero" aria-labelledby="oj5-h1">
      <div className="oj5-warp" aria-hidden="true">
        {years.map((y, i) => (
          <span key={y} className="oj5-warp__ring" style={{ "--i": i }}>
            <b>{y}</b>
          </span>
        ))}
        <i className="oj5-warp__core" />
      </div>
      <K5_Field colors={["#FDE68A", "#F9A8D4", "#7DD3FC"]} n={40} link={90} />
      <div className="container oj5-hero__in">
        <nav className="oj5-crumbs" aria-label="Breadcrumb">
          <HmLink to="/">Home</HmLink>
          <HmLink to="/about-us">About Us</HmLink>
          <span aria-current="page">Our Journey</span>
        </nav>
        <span className="oj5-kick">
          <K5_I n="clock" s={14} /> 2015 → today · four teams · seven products
        </span>
        <K5_Words id="oj5-h1" className="oj5-h1" text="From one research desk to *four expert teams* and a family of products." />
        <p className="oj5-lead">Research and digital marketing in 2015. Our own panels in 2017. Healthcare in 2018. Technology and Sampledge in 2020. Finance in 2022. A product ecosystem in 2023. Here is how every chapter connects.</p>
        <div className="oj5-board">
          <div className="oj5-board__head">
            <b>Years we have completed</b>
            <span>
              <i /> live
            </span>
          </div>
          <K5_Countdown variant="hero" />
        </div>
      </div>
    </section>
  );
}

/* ── service lanes ────────────────────────────────────────────────────────────────── */
function OJ5_Lanes() {
  const now = new Date().getFullYear();
  const span = now - OJ5_Y0 + 1;
  const ticks = Array.from({ length: span }, (_, i) => OJ5_Y0 + i);
  const [ref, v] = k5UseIn();
  return (
    <K5_Sec className="oj5-lanes" aria-labelledby="oj5-lanes-h">
      <div className="container">
        <K5_Rv a="up">
          <span className="k5-eyebrow">
            <K5_I n="layers" s={14} /> How the teams grew
          </span>
        </K5_Rv>
        <K5_Rv a="up" d={1}>
          <h2 id="oj5-lanes-h" className="oj5-h2">
            Six lines of work. <span className="oj5-serif">One growing company.</span>
          </h2>
        </K5_Rv>
        <K5_Rv a="up" d={2}>
          <p className="oj5-sub">Each bar starts in the year that team or product line launched and runs to today. Hover a bar to see where it leads.</p>
        </K5_Rv>
        <div ref={ref} className={"oj5-lanes__chart" + (v ? " is-in" : "")} style={{ "--span": span }}>
          <div className="oj5-lanes__ticks" aria-hidden="true">
            {ticks.map((y) => (
              <span key={y} className={[2015, 2017, 2018, 2020, 2022, 2023].includes(y) ? "is-key" : ""}>
                {y}
              </span>
            ))}
          </div>
          <ul>
            {OJ5_LANES.map(([n, y, c1, c2, ic, to], i) => (
              <li key={n} style={{ "--s": y - OJ5_Y0, "--c1": c1, "--c2": c2, "--i": i }}>
                <span className="oj5-lane__name">
                  <K5_I n={ic} s={16} /> {n}
                </span>
                <span className="oj5-lane__track">
                  <HmLink to={to} className="oj5-lane__bar" aria-label={`${n}: since ${y}`}>
                    <b>since {y}</b>
                    <i className="oj5-lane__spark" aria-hidden="true" />
                  </HmLink>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── chapters ─────────────────────────────────────────────────────────────────────── */
function OJ5_Art({ m, i }) {
  const kind = ["globe", "charter", "pulse", "code", "coins", "orbit", "four"][i] || "globe";
  if (kind === "globe")
    return (
      <div className="oj5-art oj5-art--globe" aria-hidden="true">
        <span className="oj5-globe">
          <i />
          <i />
          <i />
        </span>
        {Array.from({ length: 14 }, (_, k) => (
          <b key={k} className="oj5-pin" style={{ "--k": k }} />
        ))}
        <span className="oj5-art__chip oj5-art__chip--a">Survey invite sent</span>
        <span className="oj5-art__chip oj5-art__chip--b">Ad → sign-up</span>
      </div>
    );
  if (kind === "charter")
    return (
      <div className="oj5-art oj5-art--charter" aria-hidden="true">
        <div className="oj5-cert">
          <span className="oj5-cert__seal">
            <K5_I n="shield" s={28} />
          </span>
          <small>Incorporated</small>
          <b>26 · 09 · 2017</b>
          <i />
          <i />
          <span className="oj5-cert__stamp">Pvt. Ltd.</span>
        </div>
        <div className="oj5-logos">
          {["t2o", "mfr"].map((k, j) => (
            <span key={k} style={{ "--j": j }}>
              <FRL_Plate k={k} h={40} alt={OJ_PANELS[k].name} />
            </span>
          ))}
        </div>
      </div>
    );
  if (kind === "pulse")
    return (
      <div className="oj5-art oj5-art--pulse" aria-hidden="true">
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="oj5-ecg">
          <path d="M0 55 L60 55 L75 30 L90 80 L105 15 L120 70 L135 55 L190 55 L200 45 L210 62 L220 55 L300 55" />
        </svg>
        <span className="oj5-heart">
          <K5_I n="heart" s={44} />
        </span>
        {["Doctors", "Nurses", "Patients", "Caregivers"].map((t, j) => (
          <span key={t} className="oj5-role" style={{ "--j": j }}>
            {t}
          </span>
        ))}
        <span className="oj5-art__logo oj5-art__logo--plate"><FRL_Plate k="mho" h={34} /></span>
      </div>
    );
  if (kind === "code")
    return (
      <div className="oj5-art oj5-art--code" aria-hidden="true">
        <div className="oj5-term">
          <span>
            <i />
            <i />
            <i />
          </span>
          {["$ create sampledge", "✓ projects · vendors · bids", "$ deploy client-site", "✓ web · apps · SaaS · CRM"].map((l, j) => (
            <code key={j} style={{ "--j": j }}>
              {l}
            </code>
          ))}
        </div>
        <span className="oj5-art__sam">
          <FRK_SamLogo tone="light" h={30} />
        </span>
      </div>
    );
  if (kind === "coins")
    return (
      <div className="oj5-art oj5-art--coins" aria-hidden="true">
        <div className="oj5-cal">
          {["GST", "TDS", "Payroll", "MIS", "ITR", "Audit"].map((t, j) => (
            <span key={t} style={{ "--j": j }}>
              <b>{t}</b>
              <i>✓</i>
            </span>
          ))}
        </div>
        <div className="oj5-coin">
          <span>₹</span>
        </div>
      </div>
    );
  if (kind === "orbit")
    return (
      <div className="oj5-art oj5-art--orbit" aria-hidden="true">
        <span className="oj5-orb__core">
          <FRK_SamLogo tone="light" h={26} word={false} />
        </span>
        <span className="oj5-orb__ring">
          {PR5_LIST.map((p, j) => (
            <span key={p.id} className="oj5-orb__p oj5-orb__p--lg" style={{ "--j": j, "--c1": p.c1, "--c2": p.c2 }}>
              <span>
                <PR5_Logo p={p} v="mark" still />
              </span>
            </span>
          ))}
        </span>
      </div>
    );
  return (
    <div className="oj5-art oj5-art--four" aria-hidden="true">
      {Object.values(OJ5_TEAMS).map((t, j) => (
        <span key={t.n} style={{ "--j": j, "--c1": t.c1, "--c2": t.c2 }}>
          <K5_I n={t.ic} s={28} />
          <b>{t.n}</b>
        </span>
      ))}
      <i className="oj5-four__core">FR</i>
    </div>
  );
}
function OJ5_Chapter({ m, i }) {
  return (
    <K5_Sec as="article" className={"oj5-ch oj5-ch--" + i + (i % 2 ? " is-alt" : "")} style={{ "--c1": m.c[0], "--c2": m.c[1] }} aria-labelledby={"oj5-ch-" + i} id={"y" + m.y.toLowerCase()}>
      <span className="oj5-ch__year" aria-hidden="true">
        {m.y}
      </span>
      <div className="container oj5-ch__in">
        <div className="oj5-ch__copy">
          <K5_Rv a="up" className="oj5-ch__tag">
            <span className="oj5-ch__ic">
              <K5_I n={m.ic} s={20} />
            </span>
            <b>{m.y}</b>
            {m.teams.map((t) => (
              <HmLink key={t} to={OJ5_TEAMS[t].to} className="oj5-tchip" style={{ "--c1": OJ5_TEAMS[t].c1, "--c2": OJ5_TEAMS[t].c2 }}>
                {OJ5_TEAMS[t].n}
              </HmLink>
            ))}
          </K5_Rv>
          <K5_Rv a="up" d={1}>
            <h3 id={"oj5-ch-" + i}>{m.t}</h3>
          </K5_Rv>
          <K5_Rv a="up" d={2}>
            <p>{m.d}</p>
          </K5_Rv>
          <K5_Rv a="up" d={3} className="oj5-meant">
            <small>What it meant for clients</small>
            <ul>
              {m.meant.map((x, j) => (
                <li key={x} style={{ "--j": j }}>
                  <K5_I n="check" s={15} /> {x}
                </li>
              ))}
            </ul>
          </K5_Rv>
          <K5_Rv a="up" d={4} className="oj5-stats">
            {m.stats.map(([a, b]) => (
              <span key={b}>
                <b>{a}</b>
                <small>{b}</small>
              </span>
            ))}
          </K5_Rv>
        </div>
        <K5_Rv a={i % 2 ? "left" : "right"} d={1} className="oj5-ch__art">
          <OJ5_Art m={m} i={i} />
        </K5_Rv>
      </div>
    </K5_Sec>
  );
}
function OJ5_Chapters() {
  const [act, setAct] = ee.useState(0);
  ee.useEffect(() => {
    const els = OJ_MILES.map((m) => document.getElementById("y" + m.y.toLowerCase())).filter(Boolean);
    if (!els.length || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setAct(els.indexOf(e.target))),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  const go = (y) => (e) => {
    e.preventDefault();
    const el = document.getElementById("y" + y.toLowerCase());
    el && el.scrollIntoView({ behavior: k5Reduce() ? "auto" : "smooth", block: "start" });
  };
  return (
    <div className="oj5-chs">
      <nav className="oj5-rail" aria-label="Jump to a year" style={{ "--act": act, "--n": OJ_MILES.length }}>
        <span className="oj5-rail__fill" aria-hidden="true" />
        {OJ_MILES.map((m, i) => (
          <a key={m.y} href={"#y" + m.y.toLowerCase()} onClick={go(m.y)} className={i === act ? "is-on" : i < act ? "is-past" : ""} style={{ "--c1": m.c[0] }}>
            <i />
            <span>{m.y}</span>
          </a>
        ))}
      </nav>
      {OJ_MILES.map((m, i) => (
        <OJ5_Chapter key={m.y} m={m} i={i} />
      ))}
    </div>
  );
}

/* ── products & communities ───────────────────────────────────────────────────────── */
function OJ5_Sky() {
  return (
    <K5_Sec className="oj5-sky" aria-labelledby="oj5-sky-h">
      <div className="oj5-sky__stars" aria-hidden="true" />
      <div className="container">
        <K5_Rv a="up">
          <span className="k5-eyebrow oj5-eb-light">
            <K5_I n="spark" s={14} /> What we built along the way
          </span>
        </K5_Rv>
        <K5_Rv a="up" d={1}>
          <h2 id="oj5-sky-h" className="oj5-h2 oj5-h2--light">
            Three communities. <span className="k5-ink">Seven Sampledge products.</span>
          </h2>
        </K5_Rv>
        <div className="oj5-sky__grid">
          {Object.values(OJ_PANELS).map((p, i) => (
            <K5_Rv key={p.slug} a="flip" d={i} className="oj5-star oj5-star--panel">
              <a href={p.url} target="_blank" rel="noopener noreferrer" data-sfx="panel" {...k5Tilt(10)}>
                <span className="oj5-star__y">{p.y}</span>
                <span className="oj5-star__logo">
                  <FRL_Plate k={p.slug} h={44} alt={p.name + " logo"} />
                </span>
                <b>{p.name}</b>
                <small>{p.d}</small>
                <span className="oj5-star__go">
                  Visit website <K5_I n="arrow" s={14} />
                </span>
                <span className="frk-sr"> (opens in a new tab)</span>
              </a>
            </K5_Rv>
          ))}
          {PR5_LIST.map((p, i) => (
            <K5_Rv key={p.id} a="flip" d={i + 3} className="oj5-star" style={{ "--c1": p.c1, "--c2": p.c2 }}>
              <HmLink to={"/products/" + p.id} {...k5Tilt(10)}>
                <span className="oj5-star__y">{p.id === "sampaudience" ? "2023" : "2020–23"}</span>
                <span className="oj5-star__ic oj5-star__ic--lg">
                  <PR5_Logo p={p} v="mark" />
                </span>
                <b>{p.name}</b>
                <small>{p.cat}</small>
                <span className="oj5-star__go">
                  Explore <K5_I n="arrow" s={14} />
                </span>
              </HmLink>
            </K5_Rv>
          ))}
        </div>
        <K5_Rv a="up" className="oj5-sky__sam">
          <a href={PR5_SITE} target="_blank" rel="noopener noreferrer" aria-label="Sampledge website (opens in a new tab)">
            <FRK_SamLogo tone="light" h={36} />
          </a>
          <span>Every Sampledge product is built by our IT &amp; Development team and used in our own operations.</span>
        </K5_Rv>
      </div>
    </K5_Sec>
  );
}

/* ── today & next ─────────────────────────────────────────────────────────────────── */
function OJ5_Today() {
  const svc = (k) => (VERTICALS.find((x) => x.slug === k) || { services: [] }).services.length;
  const next = [
    ["mr", "Deeper B2B and healthcare reach in more markets"],
    ["dm", "Growth programmes measured against revenue"],
    ["it", "Smarter Sampledge products and AI-assisted workflows"],
    ["af", "Virtual-CFO support for more growing businesses"],
  ];
  return (
    <K5_Sec className="oj5-today" aria-labelledby="oj5-today-h">
      <div className="container">
        <K5_Rv a="up">
          <span className="k5-eyebrow">
            <K5_I n="target" s={14} /> Where we are · where we're heading
          </span>
        </K5_Rv>
        <K5_Rv a="up" d={1}>
          <h2 id="oj5-today-h" className="oj5-h2">
            Four teams today. <span className="oj5-serif">One direction tomorrow.</span>
          </h2>
        </K5_Rv>
        <div className="oj5-today__grid">
          {Object.entries(OJ5_TEAMS).map(([k, t], i) => (
            <K5_Rv key={k} a="zoom" d={i} className="oj5-team" style={{ "--c1": t.c1, "--c2": t.c2 }}>
              <HmLink to={t.to}>
                <span className="oj5-team__ic">
                  <K5_I n={t.ic} s={26} />
                </span>
                <b>{t.n}</b>
                <span className="oj5-team__n">
                  <K5_Count to={svc("" + { mr: "market-research", dm: "digital-marketing", it: "it-development", af: "accounts-finance" }[k])} /> services
                </span>
                <small>
                  <K5_I n="arrow" s={14} /> Next: {next[i][1]}
                </small>
              </HmLink>
            </K5_Rv>
          ))}
        </div>
        <K5_Rv a="up" className="oj5-cta">
          <div>
            <b>Write the next chapter with us.</b>
            <span>Research, marketing, technology or finance — start with one conversation.</span>
          </div>
          <HmLink to="/lets-talk" className="k5-btn k5-btn--glow">
            Let's talk <K5_I n="arrow" s={16} />
          </HmLink>
        </K5_Rv>
      </div>
    </K5_Sec>
  );
}

function OJ_Page() {
  dmMeta("/our-journey", "Our Journey 2015–today | Research, Marketing, IT, Finance & Sampledge — Frequent Research", "From market research and digital marketing in 2015 to incorporation in 2017, our own panels, healthcare research, Sampledge and IT in 2020, Accounts & Finance in 2022 and the Sampledge product family in 2023.");
  return (
    <div className="oj5">
      <OJ5_Hero />
      <OJ5_Lanes />
      <OJ5_Chapters />
      <OJ5_Sky />
      <OJ5_Today />
    </div>
  );
}

export { OJ_MILES, OJ_Page };
