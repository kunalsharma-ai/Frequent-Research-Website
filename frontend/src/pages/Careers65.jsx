/*
 * Careers (build 65 r2 redesign) — /careers. Prefix CR5_. Styles: src/styles/careers65.css (cr5-).
 * "Career launchpad": an orbit hero with the six teams circling "you", a typing ambition line, an animated perks bento,
 * a team explorer with a day-in-the-life timeline, a growth road that draws itself, a four-step application track,
 * a life-at-work ribbon and FAQs. No team photos. The application form is the existing CR_Apply (POST /api/careers with
 * the resume; departments from CR_DEPTS), unchanged — only its frame is restyled.
 * Colours follow the site palette (navy, royal blue, violet) with one calm accent per team.
 */
import * as ee from 'react';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { CR_Apply } from '../app/pages/CRPage.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { K5_Count, K5_I, K5_Rv, K5_Sec, K5_Tilt, K5_Words, k5Reduce, k5Sfx } from '../components/site/Kit65.jsx';

const CR5_TEAMS = [
  { k: "mr", t: "Market Research", ic: "mr", c1: "#2F6BFF", c2: "#5B8CFF", line: "Design studies, run fieldwork across 55+ markets and turn data into insight.", roles: ["Research executive", "Project manager", "Data analyst", "Fieldwork coordinator"], day: [["Morning", "Brief a new study with the client team"], ["Afternoon", "Check quotas and data quality from the field"], ["Evening", "Shape the findings into a clear story"]] },
  { k: "dm", t: "Digital Marketing", ic: "dm", c1: "#C8577E", c2: "#E08AA6", line: "Plan campaigns, create content and grow brands on search, social and beyond.", roles: ["SEO specialist", "Performance marketer", "Content creator", "Social media executive"], day: [["Morning", "Read yesterday's campaign numbers"], ["Afternoon", "Write, design and schedule new content"], ["Evening", "Test a new idea on a small budget"]] },
  { k: "it", t: "IT & Development", ic: "it", c1: "#6D4AFF", c2: "#9C86FF", line: "Build websites, apps, SaaS and the Sampledge products, and keep them running.", roles: ["Front-end developer", "Back-end developer", "QA engineer", "UI/UX designer"], day: [["Morning", "Stand-up and pick the next task"], ["Afternoon", "Build, review and test the feature"], ["Evening", "Ship it and watch it work"]] },
  { k: "af", t: "Accounts & Finance", ic: "af", c1: "#0E9C88", c2: "#3FC1AE", line: "Keep clients' books, GST, TDS and payroll accurate, on time and audit-ready.", roles: ["Accounts executive", "GST & TDS associate", "Payroll executive", "MIS analyst"], day: [["Morning", "Reconcile accounts and bank entries"], ["Afternoon", "Prepare GST, TDS or payroll filings"], ["Evening", "Send a clear MIS to the client"]] },
  { k: "pm", t: "Project Management", ic: "kanban", c1: "#2A9BD6", c2: "#63BCE8", line: "Keep projects on scope, on time and on budget across every team.", roles: ["Project coordinator", "Project manager", "Operations executive"], day: [["Morning", "Plan the day's deliveries with each team"], ["Afternoon", "Unblock issues and update clients"], ["Evening", "Close the day's checklist"]] },
  { k: "sales", t: "Sales & Business Development", ic: "handshake", c1: "#D99A2B", c2: "#E8B866", line: "Build client relationships, write proposals and open new markets.", roles: ["Business development executive", "Bid manager", "Account manager"], day: [["Morning", "Research prospects and plan outreach"], ["Afternoon", "Meet clients and scope their needs"], ["Evening", "Write the proposal that wins it"]] },
];
const CR5_WANT = ["understand markets.", "grow brands.", "build software.", "balance the books.", "lead projects.", "win new clients."];
const CR5_WHY = [
  ["layers", "Four disciplines, one office", "Work next to researchers, marketers, engineers and accountants, and learn how a whole business fits together."],
  ["rocket", "Responsibility early", "Own real client work from your first months, with a lead who has your back."],
  ["globe", "Global projects", "Projects for clients and respondents in 55+ markets, from New Delhi."],
  ["grad", "Learning that sticks", "Mentoring, on-the-job training and room to try new tools and methods."],
  ["chart", "Growth you can see", "A clear path from learning to leading, reviewed with you."],
  ["heart", "We celebrate together", "Diwali, Independence Day, birthdays and Fun Day Fridays."],
];
const CR5_PATH = [
  ["Learn", "Training, shadowing and your first projects", "grad"],
  ["Contribute", "Deliver your part of client work with confidence", "check"],
  ["Own", "Take full responsibility for projects and clients", "target"],
  ["Lead", "Guide a team, a service or a new idea", "star"],
];
const CR5_STEPS = [
  ["Choose your team", "Pick the team that fits your skills and your experience level.", "layers"],
  ["Tell us about you", "Name, contact details, location and notice period. Two minutes.", "id"],
  ["Send your resume", "Attach your CV (PDF or Word). LinkedIn or portfolio optional.", "doc"],
  ["We review and reach out", "We read every application and contact you if there's a fit. Strong profiles stay on file.", "mail"],
];
const CR5_LIFE = ["Diwali", "Independence Day", "Fun Day Friday", "Birthdays", "Awards & appreciation", "Team lunches", "Learning sessions"];
const CR5_FAQ = [
  ["Do you hire freshers?", "Yes. Choose “Fresher” in the application. Several teams train graduates on the job."],
  ["Are there open roles right now?", "We are not advertising specific openings at the moment, but we review every application and keep strong profiles on file for new roles."],
  ["Where is the work based?", "Our office is in Mangolpur Kalan, New Delhi. Tell us your location and preferences in the form."],
  ["What should my resume include?", "Your experience, skills, tools you use and one or two pieces of work you're proud of. Keep it to two pages if you can."],
  ["Can I apply by email instead?", "Yes. Send your CV to info@frequentresearch.com with the team you're interested in."],
];

/* "I want to …" — types each ambition, then deletes it */
function CR5_Typer() {
  const [txt, setTxt] = ee.useState(CR5_WANT[0]);
  ee.useEffect(() => {
    if (k5Reduce()) return undefined;
    let i = 0,
      n = CR5_WANT[0].length,
      dir = -1,
      hold = 26,
      t;
    const tick = () => {
      const w = CR5_WANT[i];
      if (hold > 0) hold--;
      else {
        n += dir;
        if (n <= 0) {
          i = (i + 1) % CR5_WANT.length;
          dir = 1;
          n = 0;
        } else if (n >= CR5_WANT[i].length) {
          dir = -1;
          hold = 26;
        }
      }
      setTxt(CR5_WANT[i].slice(0, Math.max(0, n)) || "");
      t = setTimeout(tick, dir > 0 ? 70 : 38);
    };
    t = setTimeout(tick, 1200);
    return () => clearTimeout(t);
  }, []);
  return (
    <p className="cr5-want">
      I want to <b>{txt}</b>
      <i className="cr5-want__caret" aria-hidden="true" />
      <span className="k5-sr">I want to {CR5_WANT.join(", ")}</span>
    </p>
  );
}

/* hero visual: "you" at the centre, the six teams orbiting on two rings */
function CR5_Orbit() {
  return (
    <div className="cr5-orbit" aria-hidden="true">
      <span className="cr5-orbit__ring cr5-orbit__ring--a" />
      <span className="cr5-orbit__ring cr5-orbit__ring--b" />
      <span className="cr5-orbit__core">
        <K5_I n="rocket" s={30} />
        <b>You</b>
      </span>
      <div className="cr5-orbit__spin cr5-orbit__spin--a">
        {CR5_TEAMS.slice(0, 3).map((t, i) => (
          <span key={t.k} className="cr5-planet" style={{ "--a": i * 120 + "deg", "--c1": t.c1, "--c2": t.c2 }}>
            <span className="cr5-planet__in">
              <K5_I n={t.ic} s={18} />
              <em>{t.t.split(" ")[0]}</em>
            </span>
          </span>
        ))}
      </div>
      <div className="cr5-orbit__spin cr5-orbit__spin--b">
        {CR5_TEAMS.slice(3).map((t, i) => (
          <span key={t.k} className="cr5-planet" style={{ "--a": i * 120 + 60 + "deg", "--c1": t.c1, "--c2": t.c2 }}>
            <span className="cr5-planet__in">
              <K5_I n={t.ic} s={18} />
              <em>{t.k === "sales" ? "Sales" : t.t.split(" ")[0]}</em>
            </span>
          </span>
        ))}
      </div>
      {Array.from({ length: 18 }, (_, i) => (
        <i key={i} className="cr5-orbit__star" style={{ "--i": i, left: ((i * 43) % 100) + "%", top: ((i * 61) % 100) + "%" }} />
      ))}
    </div>
  );
}

function CR5_Hero({ go }) {
  return (
    <section className="cr5-hero" aria-labelledby="cr5-h1">
      <div className="container cr5-hero__in">
        <div className="cr5-hero__copy">
          <nav className="cr5-crumbs" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink>
            <span aria-current="page">Careers</span>
          </nav>
          <span className="cr5-kick">
            <K5_I n="spark" s={14} /> Careers at Frequent Research
          </span>
          <K5_Words id="cr5-h1" className="cr5-h1" text="Build a career *that keeps growing.*" />
          <CR5_Typer />
          <p className="cr5-lead">Research markets, grow brands, build software or manage finances for clients around the world. Learn fast, own real work and grow across four disciplines.</p>
          <div className="cr5-hero__cta">
            <a href="#cr-apply" className="k5-btn cr5-btn-hot" onClick={go("cr-apply")}>
              Apply now <K5_I n="arrow" s={16} />
            </a>
            <a href="#cr5-teams" className="k5-btn cr5-btn-line" onClick={go("cr5-teams")}>
              Find your team
            </a>
          </div>
          <ul className="cr5-hero__facts">
            <li>
              <b>
                <K5_Count to={6} />
              </b>
              teams
            </li>
            <li>
              <b>
                <K5_Count to={55} suffix="+" />
              </b>
              markets
            </li>
            <li>
              <b>
                <K5_Count to={4} />
              </b>
              steps to apply
            </li>
          </ul>
        </div>
        <CR5_Orbit />
      </div>
      <svg className="cr5-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40 C 240 80 480 0 720 40 S 1200 80 1440 40 V80 H0Z" />
      </svg>
    </section>
  );
}

function CR5_Why() {
  return (
    <K5_Sec className="cr5-why" aria-labelledby="cr5-why-h" id="cr-why">
      <div className="container">
        <K5_Rv a="up" className="cr5-head">
          <span className="k5-eyebrow">
            <K5_I n="heart" s={14} /> Why people stay
          </span>
          <h2 id="cr5-why-h" className="cr5-h2">
            Six reasons <span className="cr5-serif">you'll like it here</span>
          </h2>
        </K5_Rv>
        <ul className="cr5-bento">
          {CR5_WHY.map(([ic, t, d], i) => (
            <K5_Rv as="li" key={t} a={["flip", "zoom", "up"][i % 3]} d={i} className={"cr5-bento__c cr5-bento__c--" + i}>
              <K5_Tilt max={6} className="cr5-bento__in">
                <span className="cr5-bento__ic">
                  <i />
                  <K5_I n={ic} s={22} />
                </span>
                <span className="cr5-bento__no">{String(i + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{d}</p>
                {i === 5 ? (
                  <HmLink to="/gallery" className="cr5-bento__link">
                    See the gallery <K5_I n="arrow" s={14} />
                  </HmLink>
                ) : null}
              </K5_Tilt>
            </K5_Rv>
          ))}
        </ul>
      </div>
    </K5_Sec>
  );
}

function CR5_Teams({ pick }) {
  const [on, setOn] = ee.useState(0);
  const T = CR5_TEAMS[on];
  return (
    <K5_Sec className="cr5-teams" aria-labelledby="cr5-teams-h" id="cr5-teams">
      <div className="container">
        <K5_Rv a="up" className="cr5-head">
          <span className="k5-eyebrow">
            <K5_I n="users" s={14} /> Find your team
          </span>
          <h2 id="cr5-teams-h" className="cr5-h2">
            Six teams. <span className="cr5-serif">Pick the one that fits.</span>
          </h2>
        </K5_Rv>
        <div className="cr5-explore" style={{ "--c1": T.c1, "--c2": T.c2 }}>
          <div className="cr5-explore__tabs" role="tablist" aria-label="Teams">
            {CR5_TEAMS.map((t, i) => (
              <button
                key={t.k}
                type="button"
                role="tab"
                id={"cr5-tab-" + t.k}
                aria-selected={on === i}
                aria-controls="cr5-team-panel"
                tabIndex={on === i ? 0 : -1}
                className={on === i ? "is-on" : ""}
                style={{ "--c1": t.c1, "--c2": t.c2 }}
                onClick={() => {
                  setOn(i);
                  k5Sfx("tap");
                }}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const n = (on + (e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1) + CR5_TEAMS.length) % CR5_TEAMS.length;
                  setOn(n);
                  const b = document.getElementById("cr5-tab-" + CR5_TEAMS[n].k);
                  b && b.focus();
                }}
              >
                <span className="cr5-explore__tic">
                  <K5_I n={t.ic} s={18} />
                </span>
                {t.t}
                <K5_I n="arrow" s={14} />
              </button>
            ))}
          </div>
          <div className="cr5-explore__panel" role="tabpanel" id="cr5-team-panel" aria-labelledby={"cr5-tab-" + T.k} key={T.k}>
            <div className="cr5-explore__top">
              <span className="cr5-explore__big">
                <K5_I n={T.ic} s={34} />
              </span>
              <div>
                <h3>{T.t}</h3>
                <p>{T.line}</p>
              </div>
            </div>
            <div className="cr5-day">
              <h4>A day in the team</h4>
              <ol>
                {T.day.map(([w, d], i) => (
                  <li key={w} style={{ "--i": i }}>
                    <b>{w}</b>
                    <span>{d}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="cr5-roles">
              <h4>Roles we hire for</h4>
              <ul>
                {T.roles.map((r, i) => (
                  <li key={r} style={{ "--i": i }}>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <button type="button" className="k5-btn cr5-btn-team" onClick={() => pick(T.t)}>
              Apply to {T.t} <K5_I n="arrow" s={16} />
            </button>
          </div>
        </div>
      </div>
    </K5_Sec>
  );
}

/* growth road: the path draws as it scrolls into view and a marker travels along it */
function CR5_Path() {
  return (
    <K5_Sec className="cr5-path" aria-labelledby="cr5-path-h">
      <div className="container">
        <K5_Rv a="up" className="cr5-head cr5-head--light">
          <span className="k5-eyebrow">
            <K5_I n="chart" s={14} /> How you grow
          </span>
          <h2 id="cr5-path-h" className="cr5-h2">
            From your first day <span className="cr5-serif">to leading a team.</span>
          </h2>
        </K5_Rv>
        <div className="cr5-road">
          <svg className="cr5-road__svg" viewBox="0 0 1000 220" preserveAspectRatio="none" aria-hidden="true">
            <path className="cr5-road__base" d="M20 190 C 200 190, 220 120, 360 120 S 560 60, 680 60 S 880 20, 980 20" />
            <path className="cr5-road__line" d="M20 190 C 200 190, 220 120, 360 120 S 560 60, 680 60 S 880 20, 980 20" />
          </svg>
          <ol className="cr5-road__stops">
            {CR5_PATH.map(([t, d, ic], i) => (
              <li key={t} style={{ "--i": i }}>
                <span className="cr5-road__pin">
                  <K5_I n={ic} s={20} />
                </span>
                <b>
                  <em>0{i + 1}</em> {t}
                </b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </K5_Sec>
  );
}

function CR5_Process({ go }) {
  return (
    <K5_Sec className="cr5-proc" aria-labelledby="cr5-proc-h">
      <div className="container">
        <K5_Rv a="up" className="cr5-head">
          <span className="k5-eyebrow">
            <K5_I n="check" s={14} /> Apply in four steps
          </span>
          <h2 id="cr5-proc-h" className="cr5-h2">
            Simple, quick <span className="cr5-serif">and read by a person.</span>
          </h2>
        </K5_Rv>
        <ol className="cr5-track">
          {CR5_STEPS.map(([t, d, ic], i) => (
            <li key={t} style={{ "--i": i }}>
              <span className="cr5-track__n">
                <K5_I n={ic} s={20} />
                <em>{i + 1}</em>
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <div className="cr5-proc__cta">
          <a href="#cr-apply" className="k5-btn cr5-btn-hot" onClick={go("cr-apply")}>
            Start my application <K5_I n="arrow" s={16} />
          </a>
        </div>
      </div>
    </K5_Sec>
  );
}

function CR5_Life() {
  const row = [...CR5_LIFE, ...CR5_LIFE];
  return (
    <section className="cr5-life" aria-label="Life at Frequent Research">
      <div className="cr5-life__row">
        {row.map((t, i) => (
          <span key={i} aria-hidden={i >= CR5_LIFE.length ? "true" : undefined}>
            <K5_I n="heart" s={14} /> {t}
          </span>
        ))}
      </div>
      <HmLink to="/gallery" className="cr5-life__go">
        Life at Frequent Research: see the gallery <K5_I n="arrow" s={14} />
      </HmLink>
    </section>
  );
}

function CR5_Faq() {
  const [o, setO] = ee.useState(0);
  return (
    <K5_Sec className="cr5-faq" aria-labelledby="cr5-faq-h">
      <div className="container cr5-faq__in">
        <K5_Rv a="left" className="cr5-head">
          <span className="k5-eyebrow">
            <K5_I n="book" s={14} /> Questions
          </span>
          <h2 id="cr5-faq-h" className="cr5-h2">
            Before <span className="cr5-serif">you apply</span>
          </h2>
          <p className="cr5-faq__mail">
            Something else? Write to <a href="mailto:info@frequentresearch.com">info@frequentresearch.com</a>
          </p>
        </K5_Rv>
        <div className="cr5-faq__list">
          {CR5_FAQ.map(([q, a], i) => (
            <div key={q} className={"cr5-qa" + (o === i ? " is-open" : "")}>
              <h3>
                <button type="button" aria-expanded={o === i} aria-controls={"cr5-qa-" + i} onClick={() => setO(o === i ? -1 : i)}>
                  {q}
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div className="cr5-qa__a" id={"cr5-qa-" + i} role="region">
                <p>{a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </K5_Sec>
  );
}

function CR5_Page() {
  dmMeta("/careers", "Careers | Jobs in Market Research, Digital Marketing, IT & Finance — Frequent Research", "Build your career at Frequent Research in New Delhi: market research, digital marketing, IT & development, accounts & finance, project management and business development. Simple application.");
  const [dept, setDept] = ee.useState("");
  const go = (id) => (e) => {
    e && e.preventDefault();
    const el = document.getElementById(id);
    el && el.scrollIntoView({ behavior: k5Reduce() ? "auto" : "smooth", block: "start" });
  };
  const pick = (t) => {
    setDept(t);
    setTimeout(() => go("cr-apply")(), 30);
  };
  return (
    <div className="cr5">
      <CR5_Hero go={go} />
      <CR5_Why />
      <CR5_Teams pick={pick} />
      <CR5_Path />
      <CR5_Process go={go} />
      <CR5_Life />
      <div className="cr5-apply"><CR_Apply dept={dept} setDept={setDept} /></div>
      <CR5_Faq />
    </div>
  );
}

export { CR5_Page };
