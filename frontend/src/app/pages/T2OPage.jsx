import * as ee from 'react';
import { PortalHero829 } from '../../design82/Portal829.jsx';
import { Panel83Css, TeenGuide83, Consent83, Quality83, Compare83, Faq83, faqAll } from '../../design83/Panel83.jsx';
import { Link } from 'react-router-dom';
import { PORTALS } from '../data/site.jsx';
import { RC_I, RC_P, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { BR_IMG } from '../shared/Brand.jsx';
import { FaqList, PanelMark } from './VerticalPage.jsx';
import { rcScrollTo } from './DLPage.jsx';

const T2O_BOOK = "https://panels.frequentresearch.com/";
const T2O_FEAS = "/lets-talk?type=audience";
const T2O_TRUST = [
  ["users", "Consumer Voices", "Reach people across everyday categories and experiences."],
  ["brief", "Business Professionals", "Connect with professionals and decision-makers relevant to research."],
  ["star", "Teen Panel, 13–17", "Teens join with a parent or guardian’s permission and get age-appropriate surveys."],
  ["clipboard", "Research Participation", "Take part in surveys across a range of market-research topics."],
  [
    "gift",
    "Rewarded Opinions",
    "Eligible participation can earn rewards under the applicable survey and reward terms.",
  ],
];
const T2O_CONS = [
  "Age",
  "Gender",
  "Location",
  "Household",
  "Employment",
  "Lifestyle",
  "Product ownership",
  "Purchase behaviour",
  "Brand usage",
  "Technology usage",
  "Category interests",
];
const T2O_BIZ = [
  "Job title",
  "Seniority",
  "Department",
  "Industry",
  "Company size",
  "Professional responsibilities",
  "Procurement involvement",
  "Product / service usage",
  "Technology adoption",
  "Decision-making responsibility",
];
const T2O_JOURNEY = [
  ["userplus", "Join"],
  ["shield", "Verify"],
  ["clipboard", "Complete Profile"],
  ["mail", "Receive Eligible Opportunities"],
  ["chat2", "Participate"],
  ["award", "Earn Eligible Rewards"],
  ["gift", "Redeem"],
];
const T2O_STEPS = [
  ["userplus", "Sign Up Free", "Create an account using an active email address and a valid contact number."],
  ["shield", "Verify Your Account", "Verify your email and complete the applicable contact verification process."],
  [
    "clipboard",
    "Complete Your Profile",
    "Provide relevant profile information so available research opportunities can be matched more effectively.",
  ],
  [
    "monitor",
    "Participate in Surveys",
    "Access eligible surveys through your dashboard, email invitations or other available notifications, on supported desktop, tablet or mobile devices.",
  ],
  [
    "gift",
    "Claim Eligible Rewards",
    "Once you meet the applicable redemption threshold and requirements, request redemption using the reward methods available in your country and account.",
  ],
];
const T2O_WHY = [
  ["tag", "Free to Join", "There is no membership fee to register."],
  [
    "mobile",
    "Participate on Supported Devices",
    "Access available surveys from desktop, tablet or mobile devices where supported.",
  ],
  [
    "grid",
    "Research Topics Across Categories",
    "Research opportunities can cover a broad range of consumer and business topics.",
  ],
  [
    "target",
    "Profile-Matched Opportunities",
    "A complete and current profile can help match you with relevant research opportunities.",
  ],
  ["sliders", "Flexible Participation", "You choose whether to take part in available eligible studies."],
  [
    "award",
    "Rewards for Eligible Participation",
    "Eligible completed participation can qualify for rewards under the applicable survey terms.",
  ],
];
const T2O_TOPICS = [
  ["cart", "Shopping Habits"],
  ["mobile", "Technology & Apps"],
  ["food", "Food & Lifestyle"],
  ["plane", "Travel"],
  ["tv", "Entertainment"],
  ["msg", "Consumer Opinion"],
  ["brief", "Business & Workplace"],
];
const T2O_MATCH = [
  ["user", "Your Profile"],
  ["filter", "Research Criteria"],
  ["check", "Eligibility"],
  ["mail", "Survey Invitation"],
  ["chat2", "Participation"],
  ["gift", "Reward"],
];
const T2O_FACTORS = [
  "Profile information",
  "Current study requirements",
  "Survey availability",
  "Quotas",
  "Eligibility",
  "Timing",
  "Geographic or professional criteria",
];
const T2O_PROFILE = [
  "Demographics",
  "Employment",
  "Professional information",
  "Consumer preferences",
  "Product ownership",
  "Technology usage",
  "Category interests",
];
const T2O_QPIPE = ["Registration", "Verification", "Profiling", "Screening", "Survey Quality Checks", "Review"];
const T2O_LAYERS = [
  ["shield", "Account Verification"],
  ["lock", "Bot & Fraud Prevention"],
  ["eye", "Attention & Quality Checks"],
  ["copy", "Duplicate & Fraud Detection"],
  ["refresh", "Response Consistency"],
  ["pulse", "Ongoing Quality Monitoring"],
];
const T2O_READY = [
  "Structured recruitment",
  "Profile development",
  "Respondent verification",
  "Quality screening",
  "Duplicate prevention",
  "Ongoing profile maintenance",
  "Participation monitoring",
  "Survey-level quality checks",
];
const T2O_RWVARY = [
  "Country",
  "Account",
  "Survey",
  "Reward method",
  "Applicable terms",
  "Minimum redemption threshold",
];
const T2O_VALUE = [
  [
    "users",
    "Consumer Research",
    "Potential audiences can include",
    ["Consumers", "Shoppers", "Product users", "Category users", "Brand users", "Technology users"],
  ],
  [
    "brief",
    "Business Research",
    "Potential audiences can include",
    [
      "Business professionals",
      "Managers",
      "Senior professionals",
      "Decision-makers",
      "Functional specialists",
      "Industry professionals",
    ],
  ],
  [
    "layers",
    "Research Support",
    "Turn2Opinion can support",
    [
      "Online surveys",
      "Consumer research",
      "B2B research",
      "Market understanding",
      "Product research",
      "Brand research",
      "Customer research",
      "Professional research",
    ],
  ],
];
const T2O_PILLARS = [
  ["users", "Research Community", "Consumer and business audiences in one research ecosystem."],
  ["clipboard", "Structured Profiling", "Profile information helps support audience matching."],
  ["shield", "Quality Controls", "Multiple checks can be applied throughout recruitment and survey participation."],
  [
    "sliders",
    "Flexible Research Support",
    "Consumer and B2B audiences can be approached depending on project requirements.",
  ],
  [
    "globe",
    "Research Experience",
    "Turn2Opinion operates within Frequent Research's broader market-research ecosystem.",
  ],
  ["heart", "Member-Focused Experience", "Clear participation, survey access and reward processes."],
];
function T2O_Join({ p, cls = "btn btn--primary btn--lg", children }) {
  return (
    <a className={cls} href={p.joinUrl} target="_blank" rel="noopener noreferrer">
      {children || "Join Turn2Opinion Free"} <span aria-hidden="true">↗</span>
      <span className="sr-only">{" (opens in a new tab)"}</span>
    </a>
  );
}
function T2O_Page({ p }) {
  const Faq = FaqList,
    Logo = PanelMark;
  const [active, setActive] = ee.useState("t2o-overview");
  const others = PORTALS.filter((x) => x.slug !== p.slug);
  const L = Object.fromEntries((p.links || []).map((x) => [x.label, x.href]));
  const nav = [
    ["t2o-overview", "Overview"],
    ["t2o-teen", "Teen Panel"],
    ["t2o-how", "How It Works"],
    ["t2o-quality", "Quality"],
    ["t2o-consent", "Consent"],
    ["t2o-privacy", "Privacy"],
    ["t2o-rewards", "Rewards"],
    ["t2o-researchers", "For Researchers"],
    ["t2o-faq", "FAQ"],
  ];
  const faqs = [
    {
      q: "Is Turn2Opinion free to join?",
      a: "Yes. Registration and membership are free.",
    },
    {
      q: "Who can join Turn2Opinion?",
      a: "Consumers and business professionals aged 18 or over who meet the registration requirements, including a valid email address and contact number, and teens aged 13 to 17 through the Teen panel with a parent or guardian’s permission. Some surveys are only open to certain profiles, such as job role or location.",
    },
    {
      q: "How do I get more survey opportunities?",
      a: "Keep your profile accurate and current. Survey invitations depend on eligibility, study requirements, quotas and availability.",
    },
    {
      q: "How are rewards provided?",
      a: "Once you meet the applicable redemption threshold, you can request your available reward. Methods can include PayPal, gift vouchers including Amazon, or direct account transfer where available.",
    },
    {
      q: "Is every survey guaranteed to provide a reward?",
      a: "No. Reward eligibility depends on the specific study and its requirements. Rewards apply to eligible, completed participation.",
    },
    {
      q: "Why am I sometimes screened out of a survey?",
      a: "Each research study looks for specific participants and uses eligibility and quota criteria. If your answers do not match the criteria, or a quota is already full, the survey may end early.",
    },
    {
      q: "Can I update my profile?",
      a: "Yes. You can update your profile information from your account. Some account fields may have restrictions.",
    },
    {
      q: "Why do I receive profile questions repeatedly?",
      a: "Profile information may need to be updated or reconfirmed so that research matching and quality stay current.",
    },
    {
      q: "What happens if a survey is already closed?",
      a: "Studies may close once the required number of participants or quotas has been reached. Closed surveys can no longer be completed.",
    },
    {
      q: "Can I delete my account?",
      a: "You can request account deletion, subject to applicable legal and operational requirements. See the Privacy Policy and Terms & Conditions for details, or contact support.",
    },
    {
      q: "What should I do if I experience a technical problem?",
      a: "Contact the support team at support@turn2opinion.com with a short description of the issue.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/portals/turn2opinion";
    const title = "Turn2Opinion | Consumer, Business & Teen Research Panel";
    const desc =
      "Join Turn2Opinion free: a consumer, business and teen (13–17, with parent permission) research panel. Take part in market research surveys and earn rewards.";
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
    const tm = setTimeout(() => {
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
        "@type": "Organization",
        name: "Frequent Research",
        url: "https://www.frequentresearch.com/",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Turn2Opinion",
        url: p.url,
        publisher: {
          "@type": "Organization",
          name: "Frequent Research",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          ["Home", "/"],
          ["Turn2Opinion", "/portals/turn2opinion"],
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
        mainEntity: faqAll(p, faqs).map((f) => ({
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
      clearTimeout(tm);
      added.forEach((x) => (x.restore ? x.restore() : x.remove()));
      if (io) io.disconnect();
    };
  }, []);
  const [jRef, jIn] = RC_useInView(0.25);
  const [sRef, sIn] = RC_useInView(0.2);
  const [mRef, mIn] = RC_useInView(0.25);
  const [qRef, qIn] = RC_useInView(0.25);
  const Ext = ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} <span aria-hidden="true">↗</span>
    </a>
  );
  return (
    <div className="mho t2o rc">
      <Panel83Css />
      <PortalHero829 p={p} Logo={Logo} join={<T2O_Join p={p} />} extra={<Link className="btn btn--ghost btn--lg mho-btn-ghost" to={T2O_FEAS}>Researchers: Request Feasibility</Link>} />
      <nav className="rc-subnav od-subnav mho-subnav" aria-label="On this page">
        <div className="container rc-subnav__in">
          {nav.map(([id, t]) => (
            <a key={id} href={"#" + id} className={active === id ? "is-on" : ""} onClick={rcScrollTo(id)}>
              {t}
            </a>
          ))}
        </div>
      </nav>
      <section className="t2o-trust" aria-labelledby="t2o-trust-h">
        <div className="container">
          <h2 id="t2o-trust-h" className="t2o-trust__h">
            Built for Consumer, Business & Teen Research
          </h2>
          <ul>
            {T2O_TRUST.map(([ic, t, d]) => (
              <li key={t}>
                <span>
                  <RC_I n={RC_P[ic] ? ic : "check"} s={20} />
                </span>
                <div>
                  <strong>{t}</strong>
                  <em>{d}</em>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mho-sec" id="t2o-overview">
        <div className="container mho-split">
          <div>
            <span className="mho-k">What is Turn2Opinion?</span>
            <h2>Your Opinion Has a Role in Better Research</h2>
            <p className="mho-lead">
              Turn2Opinion is an online research community operated by Frequent Research. Organisations run research to
              understand consumers and businesses, and members help by sharing their opinions in surveys.
            </p>
            <p className="mho-lead">
              Your profile helps match you with relevant studies, participation is always voluntary, and eligible
              participation can earn rewards.
            </p>
          </div>
          <ol className="t2o-eco">
            {[
              ["chat2", "Members share opinions"],
              ["search", "Organisations conduct research"],
              ["clipboard", "Profiles help match studies"],
              ["mail", "Members may receive relevant invitations"],
              ["sliders", "Participation is voluntary"],
              ["gift", "Eligible participation may be rewarded"],
            ].map(([ic, t], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "check"} s={18} />
                </span>
                {t}
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <TeenGuide83 p={p} />
      <section className="mho-sec mho-sec--soft">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Two research audiences</span>
            <h2>Consumer Research and Business Research</h2>
            <p>
              Turn2Opinion supports both. Profile information helps match members with studies; not every member will
              qualify for every study.
            </p>
          </div>
          <div className="t2o-paths">
            <div className="t2o-path t2o-path--c">
              <div className="t2o-path__h">
                <span>
                  <RC_I n="users" s={22} />
                </span>
                <div>
                  <h3>Consumer Panel</h3>
                  <em>Example profile dimensions</em>
                </div>
              </div>
              <ul>
                {T2O_CONS.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="t2o-path__mid" aria-hidden="true">
              <span>Turn2Opinion</span>
            </div>
            <div className="t2o-path t2o-path--b">
              <div className="t2o-path__h">
                <span>
                  <RC_I n="brief" s={22} />
                </span>
                <div>
                  <h3>Business Panel</h3>
                  <em>Example profile dimensions</em>
                </div>
              </div>
              <ul>
                {T2O_BIZ.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="mho-sec" id="t2o-how">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">How it works</span>
            <h2>From Free Sign-Up to Reward Redemption</h2>
          </div>
          <ol className={"t2o-journey" + (jIn ? " is-in" : "")} ref={jRef} aria-label="Member journey">
            {T2O_JOURNEY.map(([ic, t], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span className="t2o-journey__ic">
                  <RC_I n={RC_P[ic] ? ic : "check"} s={20} />
                </span>
                <strong>{t}</strong>
              </li>
            ))}
          </ol>
          <ol className={"mho-steps t2o-steps" + (sIn ? " is-in" : "")} ref={sRef}>
            {T2O_STEPS.map(([ic, t, d], i) => (
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
          <p className="mho-note t2o-c">
            Not every survey invitation leads to a reward, and the number of surveys varies. Rewards apply to eligible,
            completed participation.
          </p>
          <div className="mho-ctas mho-ctas--c">
            <T2O_Join p={p} cls="btn btn--primary" />
          </div>
        </div>
      </section>
      <section className="mho-sec mho-sec--ink">
        <div className="container">
          <div className="mho-head mho-head--light">
            <span className="mho-k">Why join</span>
            <h2>Why Join Turn2Opinion?</h2>
          </div>
          <ul className="t2o-why">
            {T2O_WHY.map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 3,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "check"} s={22} />
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="mho-sec">
        <div className="container mho-split">
          <div>
            <span className="mho-k">Research topics</span>
            <h2>Research Topics Can Cover Many Parts of Everyday Life and Work</h2>
            <p className="mho-lead">
              Studies vary by client and project. These are examples of topics our members are invited to share opinions
              on.
            </p>
          </div>
          <ul className="t2o-topics">
            {T2O_TOPICS.map(([ic, t], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <RC_I n={RC_P[ic] ? ic : "tag"} s={20} />
                {t}
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="mho-sec mho-sec--soft" id="t2o-matching">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Survey matching</span>
            <h2>How Survey Matching Works</h2>
            <p>
              Turn2Opinion uses profile information and survey-specific eligibility requirements to decide which
              opportunities may be relevant to you.
            </p>
          </div>
          <ol className={"t2o-match" + (mIn ? " is-in" : "")} ref={mRef}>
            {T2O_MATCH.map(([ic, t], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "check"} s={20} />
                </span>
                {t}
              </li>
            ))}
          </ol>
          <div className="t2o-mp">
            <div className="t2o-factors">
              <h3>The number of invitations you receive can vary with:</h3>
              <ul>
                {T2O_FACTORS.map((x) => (
                  <li key={x}>
                    <RC_I n="sliders" s={14} />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mho-note">We never promise a fixed number of surveys.</p>
            </div>
            <div className="t2o-profile">
              <div className="t2o-profile__ring" aria-hidden="true">
                <svg viewBox="0 0 200 200">
                  {T2O_PROFILE.map((_, i) => {
                    const a0 = (i / 7) * Math.PI * 2 - Math.PI / 2,
                      a1 = ((i + 1) / 7) * Math.PI * 2 - Math.PI / 2 - 0.06,
                      r = 80;
                    return (
                      <path
                        key={i}
                        d={`M${100 + r * Math.cos(a0)} ${100 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${100 + r * Math.cos(a1)} ${100 + r * Math.sin(a1)}`}
                        className="t2o-profile__seg"
                        style={{
                          "--i": i,
                        }}
                      />
                    );
                  })}
                  <circle cx="100" cy="88" r="16" className="t2o-profile__u" />
                  <path d="M76 128a24 22 0 0 1 48 0" className="t2o-profile__u" />
                </svg>
              </div>
              <div>
                <h3>Keep Your Profile Up to Date</h3>
                <p>
                  Keeping your profile information current can help improve matching with relevant research
                  opportunities.
                </p>
                <ul className="t2o-chips">
                  {T2O_PROFILE.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mho-sec" id="t2o-quality">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Respondent quality</span>
            <h2>Built Around Respondent Quality</h2>
            <p>
              Quality matters to members and researchers alike. Checks can be applied at several stages, from
              registration to the review of survey responses.
            </p>
          </div>
          <Quality83 p={p} bare />
          <div className="t2o-q">
            <div>
              <h3>Multiple Layers of Quality Protection</h3>
              <ul className="t2o-layers">
                {T2O_LAYERS.map(([ic, t], i) => (
                  <li
                    key={t}
                    style={{
                      "--i": i,
                    }}
                  >
                    <span>
                      <RC_I n={RC_P[ic] ? ic : "shield"} s={18} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mho-note">
                Includes digital identity and duplicate detection, bot and fraud prevention, and technical quality
                checks where applicable. No process can guarantee perfect data quality.
              </p>
            </div>
            <div className="t2o-ready">
              <h3>Designed for Research-Ready Respondents</h3>
              <ul>
                {T2O_READY.map((x) => (
                  <li key={x}>
                    <RC_I n="check" s={14} />
                    {x}
                  </li>
                ))}
              </ul>
              <p className="mho-note">
                {"Read how profiling and quality scoring work in the "}
                <Ext href={L["Profiling & Quality Score"]}>Profiling & Quality Score</Ext>
                {" guide."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <Consent83 p={p} />
      <section className="mho-sec mho-sec--ink" id="t2o-privacy">
        <div className="container t2o-priv">
          <div>
            <span className="mho-k mho-k--light">Your data & privacy</span>
            <h2>Your Data Matters</h2>
            <ul className="t2o-priv__list">
              {[
                "Participation is voluntary.",
                "Personal information is handled according to the applicable Privacy Policy.",
                "Profile information may be used to match you with research opportunities.",
                "Research participation may involve third-party research clients or partners, as described in the Privacy Policy.",
                "Please review the applicable privacy notices before taking part.",
                "You can contact support about privacy requests.",
                "You can request account deletion, subject to applicable legal and operational requirements.",
              ].map((x) => (
                <li key={x}>
                  <RC_I n="check" s={15} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <nav className="t2o-priv__links" aria-label="Turn2Opinion policies and member help">
            <h3>Policies & member help</h3>
            <ul>
              <li>
                <Ext href={L["Privacy Policy"]}>Privacy Policy</Ext>
              </li>
              <li>
                <Ext href={L["GDPR Compliance"]}>GDPR Compliance</Ext>
              </li>
              <li>
                <Ext href={L["Profiling & Quality Score"]}>Profiling & Quality Score</Ext>
              </li>
              <li>
                <Ext href={L["Member FAQ"]}>Member FAQ</Ext>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <a href={"mailto:" + p.support}>{p.support}</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="mho-sec mho-sec--soft" id="t2o-rewards">
        <div className="container mho-rw">
          <div className="mho-rw__main">
            <span className="mho-k">Rewards</span>
            <h2>How Rewards Work</h2>
            <p className="mho-lead">
              Members may earn rewards through eligible survey participation. Once you meet the applicable redemption
              threshold, you can request your available reward.
            </p>
            <ul className="mho-pay t2o-pay">
              {[
                ["PayPal", "wallet"],
                ["Gift vouchers, including Amazon", "gift"],
                ["Direct account transfer (where available)", "landmark"],
              ].map(([t, ic], i) => (
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
              Rewards are for research participation, not employment or income. No particular amount of rewards is
              guaranteed.
            </p>
          </div>
          <div className="mho-rw__side">
            <h3>Reward availability may vary by</h3>
            <ul className="t2o-vary">
              {T2O_RWVARY.map((x, i) => (
                <li
                  key={x}
                  style={{
                    "--i": i,
                  }}
                >
                  {x}
                </li>
              ))}
            </ul>
            <p className="mho-note mho-note--light">Not every reward method is available to every member.</p>
          </div>
        </div>
      </section>
      <section className="mho-sec mho-sec--ink" id="t2o-researchers">
        <div className="container">
          <div className="t2o-res__top">
            <div>
              <span className="mho-k mho-k--light">For researchers, brands & agencies</span>
              <h2>For Researchers, Brands & Agencies</h2>
              <p className="mho-lead mho-lead--light">
                Need to reach consumers, business professionals or decision-makers? Turn2Opinion gives access to an
                online research community that can support consumer and business research recruitment, subject to
                project requirements and feasibility.
              </p>
            </div>
            <div className="mho-ctas">
              <Link className="btn btn--light btn--lg" to={T2O_FEAS}>
                Request Audience Feasibility
              </Link>
              <a className="btn btn--outline-light btn--lg" href={T2O_BOOK} target="_blank" rel="noopener noreferrer">
                {"View Panel Book "}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
          <div className="t2o-value">
            {T2O_VALUE.map(([ic, t, k, xs], i) => (
              <RC_Reveal
                key={t}
                className="t2o-value__c"
                style={{
                  "--i": i,
                }}
              >
                <span className="t2o-value__ic">
                  <RC_I n={ic} s={22} />
                </span>
                <h3>{t}</h3>
                <em>{k}</em>
                <ul>
                  {xs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </RC_Reveal>
            ))}
          </div>
          <h3 className="t2o-sub">Why Turn2Opinion?</h3>
          <ul className="t2o-pillars">
            {T2O_PILLARS.map(([ic, t, d]) => (
              <li key={t}>
                <RC_I n={RC_P[ic] ? ic : "check"} s={18} />
                <div>
                  <strong>{t}</strong>
                  <em>{d}</em>
                </div>
              </li>
            ))}
          </ul>
          <div className="t2o-spec">
            <div>
              <h3>Looking for a Specific Audience?</h3>
              <p>
                Tell us about your target audience, geography, sample requirements and research objectives. Our team can
                review feasibility based on the available research community and project criteria. Global research
                reach, subject to audience and project feasibility.
              </p>
            </div>
            <Link className="btn btn--light" to={T2O_FEAS}>
              Request Audience Feasibility
            </Link>
          </div>
        </div>
      </section>
      <section className="mho-sec" id="t2o-about">
        <div className="container t2o-who">
          <div className="t2o-who__logo" aria-hidden="true">
            <img src={BR_IMG.lockup} alt="" width="900" height="364" />
          </div>
          <div>
            <span className="mho-k">Who we are</span>
            <h2>Turn2Opinion by Frequent Research</h2>
            <p className="mho-lead">
              {
                "Turn2Opinion is an online consumer and business research community operated by Frequent Research, a brand of Fieldwork Solutions Private Limited. It is part of Frequent Research's broader market research ecosystem, alongside its "
              }
              <Link to="/services/market-research/consumer-panel">Consumer Panel</Link>
              {", "}
              <Link to="/services/market-research/business-panel">Business Panel</Link>
              {" and "}
              <Link to="/services/market-research/healthcare-panel">Healthcare Panel</Link>
              {" services."}
            </p>
            <p className="mho-note">
              {"Learn more "}
              <Link to="/about-us">about Frequent Research</Link>
              {" or explore our "}
              <Link to="/services/market-research/online-data-collection">online data collection</Link>
              {" and "}
              <Link to="/services/market-research/quantitative-research">quantitative research</Link>
              {" services."}
            </p>
          </div>
        </div>
      </section>
      <Faq83 p={p} Faq={Faq} general={faqs} after={
            <p className="mho-note">
              {"More answers in the "}
              <Ext href={L["Member FAQ"]}>Member FAQ</Ext>
              {". Technical problem? Email "}
              <a href={"mailto:" + p.support}>{p.support}</a>.
            </p>
          } />
      <Compare83 p={p} />
      <section className="mho-sec">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Frequent Research panels</span>
            <h2>Explore Our Other Research Communities</h2>
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
      <section className="mho-cta t2o-cta">
        <div className="container mho-cta__in">
          <h2>Your Opinion Can Help Shape Better Decisions</h2>
          <p>
            Join Turn2Opinion for free and take part in market research opportunities that match your profile and
            interests.
          </p>
          <div className="mho-ctas mho-ctas--c">
            <T2O_Join p={p} cls="btn btn--light btn--lg" />
            <a className="btn btn--outline-light btn--lg" href="#t2o-overview" onClick={rcScrollTo("t2o-overview")}>
              About Turn2Opinion
            </a>
          </div>
          <p className="t2o-cta__res">
            {"Need respondents? "}
            <Link to={T2O_FEAS}>Request Feasibility</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

export { T2O_Page };
