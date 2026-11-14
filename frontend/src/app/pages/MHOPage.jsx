import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { PORTALS } from '../data/site.jsx';
import { RC_I, RC_P, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, PanelMark } from './VerticalPage.jsx';
import { rcScrollTo } from './DLPage.jsx';

const MHO_JOIN = "https://www.myhealthopinions.com/";
const MHO_BOOK = "https://panels.frequentresearch.com/";
const MHO_FEAS = "/lets-talk?type=audience";
const MHO_TOPICS = [
  ["pill", "Treatments & Therapies"],
  ["steth", "Medical Devices"],
  ["route", "Patient Journeys"],
  ["heart", "Caregiving"],
  ["hospital", "Hospital & Clinic Experience"],
  ["leaf", "Health & Wellness"],
];
const MHO_STEPS = [
  ["userplus", "Register", "Sign up free and tell us whether you are a healthcare professional, patient or caregiver."],
  [
    "shield",
    "Verify",
    "Healthcare professionals complete an appropriate verification step so studies can reach relevant professionals.",
  ],
  [
    "clipboard",
    "Complete Your Health Profile",
    "Share relevant specialty, experience or other information you are comfortable providing for research matching.",
  ],
  [
    "chat2",
    "Join Relevant Studies",
    "Take part in online surveys, interviews, discussions or other research activities that match your profile.",
  ],
  [
    "gift",
    "Receive Honoraria & Rewards",
    "Eligible participants receive applicable rewards or honoraria for their participation.",
  ],
];
const MHO_WHY = [
  [
    "hospital",
    "Built for Healthcare",
    "Studies designed for healthcare professionals, patients and caregivers rather than generic consumer-only research.",
  ],
  [
    "award",
    "Verified Professionals",
    "Appropriate professional verification helps research reach relevant healthcare audiences.",
  ],
  [
    "lock",
    "Privacy First",
    "Information provided for research participation is handled according to the platform's privacy practices and applicable requirements.",
  ],
  [
    "clock",
    "Respect for Your Time",
    "Eligible research participation may include applicable rewards or honoraria according to the study.",
  ],
];
const MHO_PAY = [
  ["PayPal", "wallet"],
  ["UPI", "mobile"],
  ["Wire Transfer", "landmark"],
  ["Amazon Gift Card", "gift"],
];
const MHO_NOTIFY = [
  ["monitor", "Account Dashboard", "Track eligible surveys and rewards."],
  ["phone", "SMS", "Receive survey alerts where this notification option is available."],
  ["msg", "WhatsApp", "Receive notifications through WhatsApp where available and appropriately consented."],
  ["mail", "Email", "Receive detailed research invitations by email."],
];
const MHO_GROUPS = [
  [
    "clinical",
    "Clinical & Nursing",
    "steth",
    [
      "Medical Specialist",
      "Clinical Specialist",
      "Nursing Specialist",
      "Nurse Practitioner",
      "Licensed Practical Nurse",
      "Nursing Assistant",
      "Therapist",
    ],
  ],
  ["pharmacy", "Pharmacy", "pill", ["Pharmacy Department Specialist"]],
  [
    "hospital",
    "Hospital & Operations",
    "hospital",
    [
      "Radiology Department",
      "Operation Theatre Complex",
      "Central Sterile Supply Department",
      "Medical Record Department Specialist",
      "Purchasing Department Specialist",
      "Maintenance Department Specialist",
      "Security Department Specialist",
      "Dietary Specialist",
      "Personnel Department Specialist",
      "Top Level Management Department Specialist",
    ],
  ],
  [
    "allied",
    "Allied, Support & Technical",
    "layers",
    [
      "Paramedical Specialist",
      "Physical Medicine & Rehabilitation",
      "Technical Specialist",
      "Support Specialist",
      "Non-Medical Specialist",
      "Non Professional Services",
    ],
  ],
];
const MHO_SPEC = [
  ["Cancer", "ribbon"],
  ["Allergy & Immunology", "leaf"],
  ["Psychology", "bulb"],
  ["Blood Circulation", "pulse"],
  ["Musculoskeletal", "bone"],
  ["Bariatric Surgery", "scalpel"],
  ["Skin, Nails & Hair Disorders", "smile"],
  ["Digestive System", "food"],
  ["Eye, Ear, Nose & Throat", "eye"],
  ["Other Specialties", "plus"],
];
const MHO_PC = [
  "Treatment experiences",
  "Patient journeys",
  "Care experiences",
  "Healthcare access",
  "Hospital and clinic experiences",
  "Medical products and devices",
  "Health and wellness experiences",
];
const MHO_QFLOW = ["Profile", "Verification", "Targeting", "Study Matching", "Participation", "Quality Monitoring"];
const MHO_USE = {
  "Healthcare Professionals": [
    "Treatment and therapy research",
    "Medical device research",
    "Clinical experience",
    "Professional decision-making",
    "Healthcare service research",
    "Product and concept research",
  ],
  Patients: [
    "Patient journeys",
    "Treatment experiences",
    "Healthcare access",
    "Product experiences",
    "Care experiences",
  ],
  Caregivers: ["Caregiving journeys", "Treatment support", "Healthcare experiences", "Care coordination"],
};
function MHO_Join({ cls = "btn btn--primary btn--lg", children }) {
  return (
    <a className={cls} href={MHO_JOIN} target="_blank" rel="noopener noreferrer">
      {children || "Join MyHealthOpinions Free"} <span aria-hidden="true">↗</span>
      <span className="sr-only">{" (opens in a new tab)"}</span>
    </a>
  );
}
function MHO_HeroArt() {
  const [ref, v] = RC_useInView(0.2);
  const N = [
    ["Physician", 90, 80, "steth"],
    ["Nurse", 330, 64, "heart"],
    ["Pharmacist", 440, 200, "pill"],
    ["Patient", 330, 348, "user"],
    ["Caregiver", 90, 332, "users"],
  ];
  return (
    <div className={"mho-art" + (v ? " is-in" : "")} ref={ref}>
      <svg
        viewBox="0 0 540 440"
        className="mho-art__svg"
        role="img"
        aria-label="Illustration: physicians, nurses, pharmacists, patients and caregivers connect to research, which turns their experience into healthcare insight"
      >
        <defs>
          {ee.createElement(
            "radialGradient",
            {
              id: "mhoHub",
              cx: ".4",
              cy: ".35",
              r: ".8",
            },
            <stop offset="0" stopColor="#1E5BFF" />,
            <stop offset="1" stopColor="#0B22A8" />,
          )}
        </defs>
        <circle cx="250" cy="210" r="168" className="mho-art__orbit" />
        <circle cx="250" cy="210" r="118" className="mho-art__orbit mho-art__orbit--in" />
        {N.map(([t, x, y], i) => (
          <path
            key={t}
            d={`M${x} ${y} Q ${(x + 250) / 2 + (i % 2 ? 30 : -30)} ${(y + 210) / 2} 250 210`}
            className="mho-art__link"
            style={{
              "--i": i,
            }}
          />
        ))}
        {N.map(([t, x, y], i) => (
          <circle
            key={"d" + t}
            r="4"
            className="mho-art__dot"
            style={{
              offsetPath: `path('M${x} ${y} Q ${(x + 250) / 2 + (i % 2 ? 30 : -30)} ${(y + 210) / 2} 250 210')`,
              "--i": i,
            }}
          />
        ))}
        <g className="mho-art__hub">
          <circle cx="250" cy="210" r="62" fill="url(#mhoHub)" />
          <circle cx="250" cy="210" r="62" className="mho-art__pulse" />
          <path
            d="M218 214h14l7-16 9 30 8-22 5 8h22"
            fill="none"
            stroke="#fff"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mho-art__ecg"
          />
          <text x="250" y="246" textAnchor="middle" className="mho-art__hubt">
            Research
          </text>
        </g>
        {N.map(([t, x, y, ic], i) => (
          <g
            key={"n" + t}
            className="mho-art__node"
            style={{
              "--i": i,
            }}
          >
            <circle cx={x} cy={y} r="34" className="mho-art__nc" />
            <g transform={`translate(${x - 12} ${y - 14})`} className="mho-art__ic">
              {(RC_P[ic] || []).map((d, k) =>
                typeof d === "string" ? <path key={k} d={d} /> : <circle key={k} cx={d[1]} cy={d[2]} r={d[3]} />,
              )}
            </g>
            <rect x={x - 46} y={y + 40} width="92" height="24" rx="12" className="mho-art__tag" />
            <text x={x} y={y + 56} textAnchor="middle" className="mho-art__tt">
              {t}
            </text>
          </g>
        ))}
      </svg>
      <div className="mho-art__card mho-art__card--a" aria-hidden="true">
        <RC_I n="clipboard" s={16} />
        <span>Online survey</span>
      </div>
      <div className="mho-art__card mho-art__card--b" aria-hidden="true">
        <RC_I n="chat2" s={16} />
        <span>Interview</span>
      </div>
      <div className="mho-art__card mho-art__card--c" aria-hidden="true">
        <RC_I n="bulb" s={16} />
        <span>Healthcare insight</span>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}
function MHO_Categories() {
  const [g, setG] = ee.useState("all");
  const [q, setQ] = ee.useState("");
  const list = MHO_GROUPS.flatMap(([k, , ic, xs]) => xs.map((x) => [k, ic, x])).filter(
    ([k, , x]) => (g === "all" || g === k) && x.toLowerCase().includes(q.trim().toLowerCase()),
  );
  return (
    <div className="mho-cat">
      <div className="mho-cat__bar">
        <div className="mho-cat__tabs" role="group" aria-label="Filter professional categories">
          {[["all", "All areas", "grid"], ...MHO_GROUPS.map(([k, t, ic]) => [k, t, ic])].map(([k, t, ic]) => (
            <button
              key={k}
              type="button"
              aria-pressed={g === k}
              className={g === k ? "is-on" : ""}
              onClick={() => setG(k)}
            >
              <RC_I n={ic} s={15} />
              {t}
            </button>
          ))}
        </div>
        <label className="mho-search">
          <RC_I n="search" s={16} />
          <span className="sr-only">Search professional categories</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search categories" />
        </label>
      </div>
      <p className="mho-cat__count" aria-live="polite">
        {list.length} {list.length === 1 ? "category" : "categories"}
        {" shown"}
      </p>
      <ul className="mho-cat__list">
        {list.map(([k, ic, x], i) => (
          <li
            key={x}
            className={"mho-cat__i mho-cat__i--" + k}
            style={{
              "--i": i % 12,
            }}
          >
            <span>
              <RC_I n={ic} s={16} />
            </span>
            {x}
          </li>
        ))}
        {!list.length && <li className="mho-cat__none">No categories match “{q}”.</li>}
      </ul>
    </div>
  );
}
function MHO_Specialties() {
  const [q, setQ] = ee.useState("");
  const xs = MHO_SPEC.filter(([t]) => t.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div className="mho-spec">
      <label className="mho-search mho-search--light">
        <RC_I n="search" s={16} />
        <span className="sr-only">Search specialties</span>
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search specialties" />
      </label>
      <ul className="mho-spec__grid">
        {xs.map(([t, ic], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span className="mho-spec__ic">
              <RC_I n={RC_P[ic] ? ic : "plus"} s={22} />
            </span>
            <strong>{t}</strong>
          </li>
        ))}
        {!xs.length && <li className="mho-cat__none">No specialties match “{q}”.</li>}
      </ul>
    </div>
  );
}
function MHO_UseCases() {
  const keys = Object.keys(MHO_USE);
  const [sel, setSel] = ee.useState(0);
  const refs = ee.useRef([]);
  const onKey = (e) => {
    let n = null;
    if (e.key === "ArrowRight") n = (sel + 1) % keys.length;
    if (e.key === "ArrowLeft") n = (sel - 1 + keys.length) % keys.length;
    if (n !== null) {
      e.preventDefault();
      setSel(n);
      if (refs.current[n]) refs.current[n].focus();
    }
  };
  return (
    <div className="mho-use">
      <div className="mho-use__tabs" role="tablist" aria-label="Research use cases by audience" onKeyDown={onKey}>
        {keys.map((k, i) => (
          <button
            key={k}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            id={"mho-ut-" + i}
            aria-selected={sel === i}
            aria-controls="mho-up"
            tabIndex={sel === i ? 0 : -1}
            className={sel === i ? "is-on" : ""}
            onClick={() => setSel(i)}
          >
            {k}
          </button>
        ))}
      </div>
      <ul className="mho-use__list" role="tabpanel" id="mho-up" aria-labelledby={"mho-ut-" + sel} key={sel}>
        {MHO_USE[keys[sel]].map((x, i) => (
          <li
            key={x}
            style={{
              "--i": i,
            }}
          >
            <RC_I n="check" s={14} />
            {x}
          </li>
        ))}
      </ul>
      <p className="mho-note">Study topics vary. Not every study covers every topic.</p>
    </div>
  );
}
function MHO_Page({ p }) {
  const Faq = FaqList,
    Logo = PanelMark;
  const [active, setActive] = ee.useState("mho-overview");
  const others = PORTALS.filter((x) => x.slug !== p.slug);
  const nav = [
    ["mho-overview", "Overview"],
    ["mho-how", "How It Works"],
    ["mho-community", "Community"],
    ["mho-rewards", "Rewards"],
    ["mho-categories", "Healthcare Categories"],
    ["mho-specialties", "Specialties"],
    ["mho-researchers", "For Researchers"],
    ["mho-faq", "FAQs"],
  ];
  const faqs = [
    {
      q: "Who can join MyHealthOpinions?",
      a: "Healthcare professionals, patients and caregivers may be eligible to join, depending on the platform's participation criteria and the studies available.",
    },
    {
      q: "Why do healthcare professionals need verification?",
      a: "Verification helps confirm relevant professional information, so healthcare research can reach appropriately profiled participants.",
    },
    {
      q: "Is my health information safe?",
      a: "Information provided for research participation is handled according to the platform's privacy practices and applicable requirements. Please read the Privacy Policy for details of how information is collected, used and protected.",
    },
    {
      q: "Do I have to answer every survey?",
      a: "No. Participation is optional, and invitations depend on your profile and study eligibility.",
    },
    {
      q: "How do rewards work?",
      a: "Eligible participants may receive applicable incentives or honoraria according to the study and the payment options available to them.",
    },
    {
      q: "Will I receive surveys regularly?",
      a: "Invitations depend on your profile, eligibility and current research demand, so the number of invitations varies.",
    },
    {
      q: "Can patients and caregivers participate?",
      a: "Yes, where they meet the eligibility requirements of relevant studies.",
    },
    {
      q: "How can researchers reach the panel?",
      a: "Researchers can request audience feasibility through our contact form or view the healthcare panel book.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/portals/myhealthopinions";
    const title = "Healthcare Research Panel for HCPs | MyHealthOpinions";
    const desc =
      "Join MyHealthOpinions, a healthcare research panel for professionals, patients and caregivers sharing experiences through relevant research studies.";
    const added = [];
    const meta = (attr, key, val) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      const prev = el ? el.getAttribute("content") : null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        added.push(el);
      } else
        added.push({
          restore: () => el.setAttribute("content", prev),
        });
      el.setAttribute("content", val);
    };
    const t = setTimeout(() => {
      document.title = title;
      meta("name", "description", desc);
    }, 0);
    meta("property", "og:title", title);
    meta("property", "og:description", desc);
    meta("property", "og:url", url);
    meta("property", "og:type", "website");
    meta("name", "twitter:card", "summary");
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", desc);
    const can = document.createElement("link");
    can.rel = "canonical";
    can.href = url;
    document.head.appendChild(can);
    added.push(can);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description: desc,
        url,
        isPartOf: {
          "@type": "WebSite",
          name: "Frequent Research",
          url: "https://www.frequentresearch.com/",
        },
        about: {
          "@type": "Organization",
          name: "MyHealthOpinions",
          url: MHO_JOIN,
          parentOrganization: {
            "@type": "Organization",
            name: "Frequent Research",
            url: "https://www.frequentresearch.com/",
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          ["Home", "/"],
          ["Portals", "/portals"],
          ["MyHealthOpinions", "/portals/myhealthopinions"],
        ].map(([name, pth], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          item: "https://www.frequentresearch.com" + pth,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ]);
    document.head.appendChild(ld);
    added.push(ld);
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        {
          rootMargin: "-45% 0px -50% 0px",
        },
      );
      nav.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }
    return () => {
      clearTimeout(t);
      added.forEach((x) => (x.restore ? x.restore() : x.remove()));
      if (io) io.disconnect();
    };
  }, []);
  const [stepRef, stepIn] = RC_useInView(0.25);
  const [qRef, qIn] = RC_useInView(0.25);
  return (
    <div className="mho rc">
      <section className="mho-hero">
        <div className="container mho-hero__in">
          <div className="mho-hero__copy">
            <nav className="crumbs mho-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to="/portals">Portals</Link>
              </span>
              <span>
                <span aria-current="page">MyHealthOpinions</span>
              </span>
            </nav>
            <div className="mho-brand">
              <Logo p={p} size="md" />
              <span className="mho-brand__by">by Frequent Research</span>
            </div>
            <HeroH1>Healthcare Professionals, Patients & Caregivers Research Panel</HeroH1>
            <p className="mho-hero__lead">
              MyHealthOpinions is Frequent Research's healthcare research panel for healthcare professionals, patients
              and caregivers. Members share their experience of treatments, products and care, helping healthcare
              organisations understand real needs while being rewarded for eligible research participation.
            </p>
            <div className="mho-ctas">
              <MHO_Join />
              <Link className="btn btn--ghost btn--lg mho-btn-ghost" to={MHO_FEAS}>
                Researchers: Request Feasibility
              </Link>
            </div>
            <ul className="mho-chips" aria-label="Who can join">
              {p.audiences.map((a, i) => (
                <li key={a}>
                  <RC_I n={["steth", "pill", "user", "users"][i] || "check"} s={15} />
                  {a
                    .replace("Physicians & specialists", "Physicians & Specialists")
                    .replace("Nurses, pharmacists & allied HCPs", "Nurses, Pharmacists & Allied HCPs")}
                </li>
              ))}
            </ul>
          </div>
          <MHO_HeroArt />
        </div>
      </section>
      <nav className="rc-subnav od-subnav mho-subnav" aria-label="On this page">
        <div className="container rc-subnav__in">
          {nav.map(([id, t]) => (
            <a key={id} href={"#" + id} className={active === id ? "is-on" : ""} onClick={rcScrollTo(id)}>
              {t}
            </a>
          ))}
        </div>
      </nav>
      <section className="mho-sec" id="mho-overview">
        <div className="container mho-split">
          <div>
            <span className="mho-k">Healthcare research community</span>
            <h2>Your Experience Can Improve Healthcare for Everyone</h2>
            <p className="mho-lead">
              Every study gives healthcare professionals, patients and caregivers an opportunity to share experiences
              that help organisations understand real needs and make better-informed decisions.
            </p>
            <p className="mho-note">
              Research topics vary by study. Members are invited only to studies that match their profile.
            </p>
          </div>
          <ul className="mho-topics">
            {MHO_TOPICS.map(([ic, t], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "heart"} s={22} />
                </span>
                <strong>{t}</strong>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="mho-sec mho-sec--soft" id="mho-how">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Member journey</span>
            <h2>How It Works</h2>
            <p>From free sign-up to research participation and rewards.</p>
          </div>
          <ol className={"mho-steps" + (stepIn ? " is-in" : "")} ref={stepRef}>
            {MHO_STEPS.map(([ic, t, d], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span className="mho-steps__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="mho-steps__ic">
                  <RC_I n={RC_P[ic] ? ic : "check"} s={22} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <div className="mho-ctas mho-ctas--c">
            <MHO_Join cls="btn btn--primary" />
          </div>
        </div>
      </section>
      <section className="mho-sec mho-sec--ink">
        <div className="container">
          <div className="mho-head mho-head--light">
            <span className="mho-k">Why join</span>
            <h2>Why Members Choose MyHealthOpinions</h2>
          </div>
          <ul className="mho-why">
            {MHO_WHY.map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "shield"} s={24} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </ul>
          <p className="mho-why__note">
            {"See the "}
            <Link to="/privacy-policy">Privacy Policy</Link>
            {
              " for how information is collected, used and protected. Participation does not provide medical advice, diagnosis or treatment."
            }
          </p>
        </div>
      </section>
      <section className="mho-sec" id="mho-community">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Our healthcare research community</span>
            <h2>One Community, Three Perspectives</h2>
            <p>
              Professionals bring clinical and operational expertise. Patients and caregivers bring lived experience.
              Together they give healthcare research a fuller picture.
            </p>
          </div>
          <div className="mho-tri">
            {[
              [
                "steth",
                "Healthcare professionals",
                "Clinical, nursing, pharmacy, allied health, administrative and specialist roles.",
              ],
              [
                "user",
                "Patients",
                "People living with health conditions, sharing experiences of treatment and care where relevant to a study.",
              ],
              [
                "users",
                "Caregivers",
                "Family members and others who support patients, sharing the caregiving perspective.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className="mho-tri__c"
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={ic} s={26} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </div>
          <ol className="mho-eco" aria-label="Healthcare professional ecosystem">
            {["Clinical", "Nursing", "Pharmacy", "Allied Health", "Administration", "Support"].map((t, i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                {t}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mho-sec mho-sec--soft" id="mho-rewards">
        <div className="container mho-rw">
          <div className="mho-rw__main">
            <span className="mho-k">Rewards</span>
            <h2>Get Rewarded Your Way</h2>
            <p className="mho-lead">
              Eligible research participants may receive incentives or honoraria through available payment methods
              appropriate to the study and participant.
            </p>
            <ul className="mho-pay">
              {MHO_PAY.map(([t, ic], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>
                    <RC_I n={RC_P[ic] ? ic : "wallet"} s={22} />
                  </span>
                  {t}
                </RC_Reveal>
              ))}
            </ul>
            <p className="mho-note">
              Payment methods may vary by country, study and participant. Rewards apply to eligible, completed
              participation.
            </p>
            <div className="mho-benefit">
              <span className="mho-benefit__k">Participant benefits</span>
              <div>
                <RC_I n="file" s={20} />
                <span>
                  <strong>Medical Report</strong>
                  <em>Where offered as part of a study, separate from payment methods.</em>
                </span>
              </div>
            </div>
          </div>
          <div className="mho-rw__side">
            <h3>Never Miss a Survey Opportunity</h3>
            <p>
              Choose the notification method that works best for you and stay updated when a research opportunity
              matching your profile becomes available.
            </p>
            <ul className="mho-notify">
              {MHO_NOTIFY.map(([ic, t, d], i) => (
                <li
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span className="mho-notify__ic">
                    <RC_I n={RC_P[ic] ? ic : "msg"} s={18} />
                    <i aria-hidden="true" />
                  </span>
                  <div>
                    <strong>{t}</strong>
                    <em>{d}</em>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mho-note mho-note--light">
              Available notification options may vary by member, study and region.
            </p>
          </div>
        </div>
      </section>
      <section className="mho-sec" id="mho-categories">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Healthcare community</span>
            <h2>Professionals We Work With</h2>
            <p>
              Our healthcare research community includes professionals across clinical, nursing, pharmacy, allied
              health, administrative and specialist roles, alongside patients and caregivers where relevant to the
              study.
            </p>
          </div>
          <MHO_Categories />
        </div>
      </section>
      <section className="mho-sec mho-sec--teal" id="mho-specialties">
        <div className="container mho-split mho-split--spec">
          <div>
            <span className="mho-k mho-k--light">Areas of expertise</span>
            <h2>Healthcare Specialties We Cover</h2>
            <p className="mho-lead mho-lead--light">
              Reach research audiences across medical and healthcare specialties, helping research teams target relevant
              professionals and patient communities.
            </p>
            <p className="mho-note mho-note--light">
              An audience taxonomy for research targeting, not medical information.
            </p>
          </div>
          <MHO_Specialties />
        </div>
      </section>
      <section className="mho-sec">
        <div className="container mho-split mho-pc">
          <div className="mho-pc__art" aria-hidden="true">
            <svg viewBox="0 0 360 280">
              <circle cx="120" cy="140" r="96" className="mho-pc__c1" />
              <circle cx="240" cy="140" r="96" className="mho-pc__c2" />
              <g transform="translate(120 126)">
                <circle cy="-22" r="22" className="mho-pc__p" />
                <path d="M-40 46a40 40 0 0 1 80 0" className="mho-pc__p" />
              </g>
              <g transform="translate(240 126)">
                <circle cy="-22" r="22" className="mho-pc__q" />
                <path d="M-40 46a40 40 0 0 1 80 0" className="mho-pc__q" />
              </g>
              <path d="M180 132c-6-8-18-4-14 6 3 6 14 14 14 14s11-8 14-14c4-10-8-14-14-6z" className="mho-pc__h" />
              <text x="120" y="216" textAnchor="middle" className="mho-pc__t">
                Patient
              </text>
              <text x="240" y="216" textAnchor="middle" className="mho-pc__t">
                Caregiver
              </text>
            </svg>
          </div>
          <div>
            <span className="mho-k">Lived experience</span>
            <h2>Patients & Caregivers Matter Too</h2>
            <p className="mho-lead">
              Healthcare decisions are shaped not only by professionals, but also by people living with health
              conditions and those supporting them. Where appropriate, MyHealthOpinions connects research studies with
              relevant patients and caregivers.
            </p>
            <ul className="mho-ticks">
              {MHO_PC.map((t) => (
                <li key={t}>
                  <RC_I n="check" s={14} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mho-note">
              {
                "You will never be asked to share health information publicly. Anything you share is for research and handled under the "
              }
              <Link to="/privacy-policy">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
      <section className="mho-sec mho-sec--soft">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Research quality</span>
            <h2>Quality You Can Trust</h2>
            <p>How the panel supports relevant audience recruitment.</p>
          </div>
          <ol className={"mho-qflow" + (qIn ? " is-in" : "")} ref={qRef}>
            {MHO_QFLOW.map((t, i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <ul className="mho-qual">
            {[
              [
                "userplus",
                "Verified Recruitment",
                "Participants are recruited through appropriate panel recruitment and verification processes.",
              ],
              [
                "target",
                "Audience Targeting",
                "Research audiences can be profiled using relevant demographic, professional, specialty, experience and study-specific criteria.",
              ],
              [
                "shield",
                "Quality Monitoring",
                "Quality processes can include profile review, fraud detection, duplicate detection and response-quality monitoring where appropriate.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "shield"} s={22} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="mho-sec mho-sec--ink" id="mho-researchers">
        <div className="container mho-res">
          <div>
            <span className="mho-k mho-k--light">For researchers & brands</span>
            <h2>Need Healthcare Research Participants?</h2>
            <p className="mho-lead mho-lead--light">
              Reach relevant healthcare professionals, patients and caregivers through MyHealthOpinions for healthcare
              research studies.
            </p>
            <ul className="mho-res__aud">
              {[
                "Physicians & Specialists",
                "Nurses",
                "Pharmacists",
                "Allied HCPs",
                "Healthcare Administrators",
                "Patients",
                "Caregivers",
                "Specialised healthcare audiences",
              ].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className="mho-ctas">
              <Link className="btn btn--light btn--lg" to={MHO_FEAS}>
                Request Audience Feasibility
              </Link>
              <a className="btn btn--outline-light btn--lg" href={MHO_BOOK} target="_blank" rel="noopener noreferrer">
                {"View Healthcare Panel Book "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
            <p className="mho-note mho-note--light">
              {"Learn more about our "}
              <Link to="/services/market-research/healthcare-panel">Healthcare Panel</Link>
              {" service."}
            </p>
          </div>
          <div className="mho-res__use">
            <h3>Research use cases</h3>
            <MHO_UseCases />
          </div>
        </div>
      </section>
      <section className="section section--tint" id="mho-faq">
        <div className="container split">
          <h2 className="split__title">MyHealthOpinions: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
            <p className="mho-note">
              {"Read the "}
              <Link to="/privacy-policy">Privacy Policy</Link>
              {", "}
              <Link to="/cookie-policy">Cookie Policy</Link>
              {", "}
              <Link to="/terms-conditions">Terms & Conditions</Link>
              {" and "}
              <Link to="/data-protection">Data Protection</Link>
              {" information."}
            </p>
          </div>
        </div>
      </section>
      <section className="mho-sec">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Frequent Research panels</span>
            <h2>Explore Our Other Research Panels</h2>
          </div>
          <div className="mho-other">
            {others.map((o) => (
              <Link key={o.slug} to={`/portals/${o.slug}`} className={"mho-other__c mho-other__c--" + o.slug}>
                <Logo p={o} size="md" />
                <span className="mho-other__a">{o.audience}</span>
                <span className="mho-other__t">{o.tagline}</span>
                <span className="mho-other__go">
                  {"Visit panel page "}
                  <RC_I n="arrow" s={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="mho-cta">
        <div className="container mho-cta__in">
          <h2>Join Our Healthcare Community</h2>
          <p>
            Share your healthcare experience, take part in relevant research and receive applicable rewards for eligible
            participation.
          </p>
          <div className="mho-ctas mho-ctas--c">
            <MHO_Join cls="btn btn--light btn--lg" />
            <Link className="btn btn--outline-light btn--lg" to={MHO_FEAS}>
              Researchers: Request Feasibility
            </Link>
          </div>
          <ul className="mho-cta__links">
            <li>
              <a href={MHO_JOIN} target="_blank" rel="noopener noreferrer">
                myhealthopinions.com ↗
              </a>
            </li>
            <li>
              <a href={MHO_BOOK} target="_blank" rel="noopener noreferrer">
                Healthcare Panel Book ↗
              </a>
            </li>
            <li>
              <Link to="/about-us">About Frequent Research</Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export { MHO_Page };
