import * as ee from 'react';
import { PortalHero829 } from '../../design82/Portal829.jsx';
import { Panel83Css, TeenGuide83, Consent83, Quality83, Compare83, Faq83, faqAll } from '../../design83/Panel83.jsx';
import { Link } from 'react-router-dom';
import { PORTALS } from '../data/site.jsx';
import { RC_I, RC_P, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, PanelMark } from './VerticalPage.jsx';
import { rcScrollTo } from './DLPage.jsx';

const MFR_BOOK = "https://panels.frequentresearch.com/";
const MFR_FEAS = "/lets-talk?type=audience";
const MFR_STRIP = [
  ["users", "Consumers"],
  ["brief", "Business professionals"],
  ["star", "Teens 13–17, with parent permission"],
  ["clipboard", "Market research participants"],
  ["target", "Profile-matched survey invitations"],
  ["award", "Reward-based participation"],
];
const MFR_CORE = [
  ["user", "Profile"],
  ["target", "Match"],
  ["chat2", "Participate"],
  ["award", "Earn"],
  ["gift", "Redeem"],
];
const MFR_STEPS = [
  ["userplus", "Register Free", "Create your account through the registration process using an active email address."],
  ["shield", "Verify", "Confirm your account through the verification process."],
  [
    "clipboard",
    "Complete Your Profile",
    "Provide relevant profile information so the platform can identify studies that may match your characteristics and interests.",
  ],
  ["mail", "Participate", "Receive eligible research invitations and take part in available surveys."],
  [
    "gift",
    "Redeem Rewards",
    "Once the applicable redemption requirements are met, request your eligible reward through the available redemption options.",
  ],
];
const MFR_CONS = [
  "Age",
  "Gender",
  "Location",
  "Household characteristics",
  "Employment",
  "Lifestyle",
  "Product ownership",
  "Purchase behaviour",
  "Brand usage",
  "Technology usage",
  "Consumer preferences",
];
const MFR_BIZ = [
  "Job title",
  "Seniority",
  "Department",
  "Industry",
  "Company characteristics",
  "Professional responsibilities",
  "Technology involvement",
  "Purchasing / decision-making responsibilities",
];
const MFR_TOPICS = [
  ["cart", "Shopping"],
  ["mobile", "Technology & Apps"],
  ["food", "Food & Lifestyle"],
  ["plane", "Travel"],
  ["tv", "Entertainment"],
  ["msg", "Consumer Opinions"],
  ["megaphone", "Brands & Advertising"],
  ["box", "Products & Services"],
  ["brief", "Business & Workplace"],
];
const MFR_RW = [
  "Take part in eligible research.",
  "Earn reward points according to the applicable study.",
  "Track your balance in your account.",
  "Reach the applicable redemption threshold.",
  "Submit a redemption request.",
  "Receive your eligible reward through an available method.",
];
const MFR_PAY = [
  ["PayPal", "wallet"],
  ["UPI", "mobile"],
  ["Bank transfer", "landmark"],
  ["Gift vouchers", "gift"],
];
const MFR_CLAIM = [
  ["chat2", "Earn", "Take part in eligible studies."],
  ["bars", "Track", "Monitor your available reward balance."],
  ["check", "Check", "Confirm the applicable redemption requirements are met."],
  ["send", "Claim", "Submit your reward request."],
  ["gift", "Receive", "Receive your eligible reward after account and participation checks."],
];
const MFR_WHY = [
  ["tag", "Free Membership", "Joining the community does not require a membership fee."],
  ["target", "Relevant Research Opportunities", "Survey invitations are matched using available profile information."],
  ["user", "One Account", "Access available research opportunities through one member account."],
  ["sliders", "Flexible Participation", "Take part when eligible research opportunities are available."],
  [
    "wallet",
    "Multiple Reward Options",
    "Available redemption methods may include PayPal, UPI, bank transfer and gift vouchers, depending on eligibility and country.",
  ],
  [
    "lock",
    "Privacy-Conscious Research",
    "Personal information is handled according to the applicable Privacy Policy and research requirements.",
  ],
];
const MFR_QPIPE = [
  "Registration",
  "Profile Validation",
  "Eligibility Screening",
  "Participation Quality Checks",
  "Research Completion",
  "Ongoing Profile Maintenance",
];
const MFR_QPRAC = [
  "Email verification",
  "Duplicate detection",
  "Profile consistency checks",
  "Attention checks",
  "Open-ended response quality checks",
  "Participation monitoring",
  "Fraud and automation prevention",
  "Inactive member management",
  "Profile updates",
  "Research eligibility screening",
];
const MFR_CTOP = [
  "Products",
  "Brands",
  "Shopping",
  "Technology",
  "Lifestyle",
  "Food",
  "Travel",
  "Entertainment",
  "Services",
];
const MFR_BTOP = [
  "Industry",
  "Technology",
  "Procurement",
  "Finance",
  "Healthcare",
  "Business services",
  "Workplace",
  "Professional products & services",
];
const MFR_RFEAT = [
  "Consumer audiences",
  "Business professionals",
  "Profile-based targeting",
  "Research feasibility",
  "Survey recruitment",
  "Participant engagement",
  "Quality-focused panel management",
];
const MFR_PPIPE = [
  "Recruitment",
  "Verification",
  "Profiling",
  "Screening",
  "Quality Monitoring",
  "Ongoing Panel Management",
];
const MFR_PMGMT = [
  "Comprehensive profile information",
  "Regular profile updates",
  "Eligibility screening",
  "Duplicate detection",
  "Participation monitoring",
  "Response-quality checks",
  "Inactive member management",
  "Ongoing panel cultivation",
];
const MFR_RFLOW = [
  "Define target audience",
  "Request feasibility",
  "Confirm research requirements",
  "Recruit eligible participants",
  "Conduct research",
  "Apply quality controls",
  "Complete fieldwork",
];
function MFR_Join({ p, cls = "btn btn--primary btn--lg", children }) {
  return (
    <a className={cls} href={p.joinUrl} target="_blank" rel="noopener noreferrer">
      {children || "Join MyFrequentRewards free"} <span aria-hidden="true">↗</span>
      <span className="sr-only">{" (opens in a new tab)"}</span>
    </a>
  );
}
function MFR_Page({ p }) {
  const Faq = FaqList,
    Logo = PanelMark;
  const [active, setActive] = ee.useState("mfr-overview");
  const others = PORTALS.filter((x) => x.slug !== p.slug);
  const nav = [
    ["mfr-overview", "Overview"],
    ["mfr-teen", "Teen Panel"],
    ["mfr-how", "How It Works"],
    ["mfr-rewards", "Rewards"],
    ["mfr-quality", "Quality"],
    ["mfr-consent", "Consent"],
    ["mfr-privacy", "Privacy"],
    ["mfr-researchers", "For Researchers"],
    ["mfr-faq", "FAQ"],
  ];
  const faqs = [
    {
      q: "How do I join MyFrequentRewards?",
      a: "Register free with an active email address, confirm your account through the verification process, then complete your profile so relevant studies can be identified for you.",
    },
    {
      q: "Is membership free?",
      a: "Yes. Membership is free, subject to the applicable terms.",
    },
    {
      q: "How do I receive survey invitations?",
      a: "Invitations are based on your profile and the research opportunities available. When a study may match your profile, you can receive an invitation by email or see it in your account.",
    },
    {
      q: "Do I need to log in every day?",
      a: "No. Invitations can arrive by email, and available opportunities are shown in your account. The number of invitations varies, so there is no fixed daily schedule.",
    },
    {
      q: "How much can I earn?",
      a: "There is no fixed amount. Rewards vary by study, eligibility, survey length, complexity and the research sponsor's requirements.",
    },
    {
      q: "When can I redeem rewards?",
      a: "You can request redemption once the applicable requirements, including the minimum redemption threshold, are met. You can view the requirements that apply to you in your account.",
    },
    {
      q: "Which reward methods are available?",
      a: "Methods may include PayPal, UPI, bank transfer and gift vouchers. Availability varies by country, account eligibility and the applicable programme requirements.",
    },
    {
      q: "Why did I not qualify for a survey?",
      a: "Each study targets specific participants. If your profile or screening answers do not match the study's requirements, the survey may end early.",
    },
    {
      q: "Why do some surveys close quickly?",
      a: "Studies use quotas. Once a quota is full, the survey can close before everyone who was invited has taken part.",
    },
    {
      q: "How can I update my profile?",
      a: "Sign in to your account and update your profile sections. Keeping them current helps match you with relevant studies.",
    },
    {
      q: "Can I delete my account?",
      a: "Yes, you can request account deletion. See the Privacy Policy for your rights, or contact support for help with the request.",
    },
    {
      q: "How can I contact support?",
      a: "Email support@myfrequentrewards.com.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/portals/myfrequentrewards";
    const title = "MyFrequentRewards | Consumer, Business & Teen Research Panel";
    const desc =
      "Join MyFrequentRewards, Frequent Research's consumer, business and teen (13–17, with parent permission) research community. Take part in studies and earn rewards.";
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
        name: "MyFrequentRewards",
        url: p.url,
        publisher: {
          "@type": "Organization",
          name: "Frequent Research",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: title,
        description: desc,
        url,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          ["Home", "/"],
          ["Portals", "/portals"],
          ["MyFrequentRewards", "/portals/myfrequentrewards"],
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
  const [cRef, cIn] = RC_useInView(0.25);
  const [sRef, sIn] = RC_useInView(0.2);
  const [kRef, kIn] = RC_useInView(0.25);
  const [qRef, qIn] = RC_useInView(0.25);
  const [pRef, pIn] = RC_useInView(0.25);
  const [fRef, fIn] = RC_useInView(0.2);
  return (
    <div className="mho t2o mfr rc">
      <Panel83Css />
      <PortalHero829 p={p} Logo={Logo} join={<MFR_Join p={p} />} extra={<Link className="btn btn--ghost btn--lg mho-btn-ghost" to={MFR_FEAS}>Researchers: Request feasibility</Link>} />
      <nav className="rc-subnav od-subnav mho-subnav" aria-label="On this page">
        <div className="container rc-subnav__in">
          {nav.map(([id, t]) => (
            <a key={id} href={"#" + id} className={active === id ? "is-on" : ""} onClick={rcScrollTo(id)}>
              {t}
            </a>
          ))}
        </div>
      </nav>
      <section className="mfr-strip" aria-label="Who MyFrequentRewards is for">
        <div className="container">
          <ul>
            {MFR_STRIP.map(([ic, t]) => (
              <li key={t}>
                <RC_I n={RC_P[ic] ? ic : "check"} s={18} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="mho-sec" id="mfr-overview">
        <div className="container">
          <div className="mho-split">
            <div>
              <span className="mho-k">What is MyFrequentRewards?</span>
              <h2>A Research Community Built Around Your Opinions</h2>
            </div>
            <div>
              <p className="mho-lead">
                MyFrequentRewards is Frequent Research's online consumer and business research community. Members create
                a profile, and that profile helps match them with relevant studies.
              </p>
              <p className="mho-lead">
                Research invitations can arrive by email or appear in your account. Participation is always voluntary,
                eligible survey participation earns reward points, and rewards can be redeemed once the applicable
                requirements are met.
              </p>
            </div>
          </div>
          <ol
            className={"mfr-core" + (cIn ? " is-in" : "")}
            ref={cRef}
            aria-label="Profile, match, participate, earn, redeem"
          >
            {MFR_CORE.map(([ic, t], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span className="mfr-core__ic">
                  <RC_I n={ic} s={26} />
                </span>
                <strong>{t}</strong>
                <em>{String(i + 1).padStart(2, "0")}</em>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <TeenGuide83 p={p} />
      <section className="mho-sec mho-sec--soft" id="mfr-how">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Member journey</span>
            <h2>How It Works</h2>
          </div>
          <ol className={"mho-steps mfr-steps" + (sIn ? " is-in" : "")} ref={sRef}>
            {MFR_STEPS.map(([ic, t, d], i) => (
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
            <MFR_Join p={p} cls="btn btn--primary" />
          </div>
        </div>
      </section>
      <section className="mho-sec" id="mfr-matching">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Profile matching</span>
            <h2>Better Profiles Help Match You With Relevant Research</h2>
            <p>
              Profile information helps identify studies that may suit you. A complete profile does not guarantee
              invitations, because every study has its own requirements.
            </p>
          </div>
          <div className="mfr-match">
            <div className="mfr-match__col">
              <h3>
                <RC_I n="users" s={18} />
                Consumer profile
              </h3>
              <ul>
                {MFR_CONS.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <h3 className="mfr-match__h2">
                <RC_I n="brief" s={18} />
                Business profile
              </h3>
              <ul>
                {MFR_BIZ.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="mfr-match__engine" aria-hidden="true">
              <svg viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" className="mfr-eng__o" />
                <circle cx="80" cy="80" r="50" className="mfr-eng__m" />
                <circle cx="80" cy="80" r="32" className="mfr-eng__c" />
                <path d="M66 80l10 10 20-22" className="mfr-eng__t" />
              </svg>
              <strong>Matching</strong>
              <em>profile × study criteria</em>
            </div>
            <div className="mfr-match__out">
              <span className="mfr-match__k">Research opportunity</span>
              <div className="mfr-inv">
                <RC_I n="mail" s={20} />
                <div>
                  <strong>Invitation to a relevant study</strong>
                  <em>When your profile meets the study's criteria</em>
                </div>
              </div>
              <p className="mho-note">Invitations also depend on quotas, timing and survey availability.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="mho-sec mho-sec--soft">
        <div className="container mho-split">
          <div>
            <span className="mho-k">Example research topics</span>
            <h2>Research Topics You May Encounter</h2>
            <p className="mho-lead">
              These are examples of the kinds of topics studies can cover. They are not a list of currently active
              surveys.
            </p>
          </div>
          <ul className="t2o-topics mfr-topics">
            {MFR_TOPICS.map(([ic, t], i) => (
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
      <section className="mho-sec" id="mfr-rewards">
        <div className="container mho-rw mfr-rw">
          <div className="mho-rw__main">
            <span className="mho-k">Rewards</span>
            <h2>How Rewards Work</h2>
            <ol className="mfr-rwsteps">
              {MFR_RW.map((x, i) => (
                <li key={x}>
                  <span>{i + 1}</span>
                  {x}
                </li>
              ))}
            </ol>
          </div>
          <div className="mfr-rw__side">
            <h3>Redemption methods</h3>
            <ul className="mfr-pay">
              {MFR_PAY.map(([t, ic]) => (
                <li key={t}>
                  <span>
                    <RC_I n={RC_P[ic] ? ic : "wallet"} s={20} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <p className="mfr-thr">
              <RC_I n="flag" s={16} />
              <span>
                <strong>Minimum redemption threshold applies.</strong>
                {" You can view the requirements that apply to you in your account."}
              </span>
            </p>
            <p className="mho-note">
              Available redemption methods may vary by country, account eligibility and applicable programme
              requirements.
            </p>
          </div>
        </div>
      </section>
      <section className="mho-sec mho-sec--ink mfr-claimsec">
        <div className="container">
          <div className="mho-head mho-head--light">
            <span className="mho-k">Reward claim journey</span>
            <h2>From Participation to Reward</h2>
          </div>
          <ol className={"mfr-claim" + (kIn ? " is-in" : "")} ref={kRef}>
            {MFR_CLAIM.map(([ic, t, d], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span className="mfr-claim__ic">
                  <RC_I n={RC_P[ic] ? ic : "check"} s={22} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="mho-sec">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Why join</span>
            <h2>Why Members Choose MyFrequentRewards</h2>
          </div>
          <ul className="mfr-why">
            {MFR_WHY.map(([ic, t, d], i) => (
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
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="mho-sec mho-sec--soft" id="mfr-quality">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">Research quality</span>
            <h2>Built for Reliable Research Participation</h2>
            <p>Quality checks protect the value of every member's opinion and the research that depends on it.</p>
          </div>
          <Quality83 p={p} bare />
          <ul className="mfr-prac">
            {MFR_QPRAC.map((x) => (
              <li key={x}>
                <RC_I n="check" s={14} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Consent83 p={p} />
      <section className="mho-sec mho-sec--ink" id="mfr-privacy">
        <div className="container t2o-priv">
          <div>
            <span className="mho-k mho-k--light">Your data & privacy</span>
            <h2>Your Data & Privacy Matter</h2>
            <ul className="t2o-priv__list">
              {[
                "Participation in research is voluntary.",
                "Personal information is handled according to the applicable Privacy Policy.",
                "You can request access, correction or deletion where applicable.",
                "Data may be used for research participation, matching, administration and other purposes described in the applicable policy.",
                "Third-party research programmes may have their own privacy terms.",
                "Cookies and similar technologies may be used as described in the Cookie Policy.",
                "Privacy rights can vary depending on your jurisdiction.",
              ].map((x) => (
                <li key={x}>
                  <RC_I n="check" s={15} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <nav className="t2o-priv__links" aria-label="Policies and support">
            <h3>Policies & support</h3>
            <ul>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookie-policy">Cookie Policy</Link>
              </li>
              <li>
                <Link to="/data-protection">GDPR / Data Protection</Link>
              </li>
              <li>
                <Link to="/terms-conditions">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/lets-talk">Contact</Link>
              </li>
              <li>
                <a href={"mailto:" + p.support}>{p.support}</a>
              </li>
            </ul>
          </nav>
        </div>
      </section>
      <section className="mho-sec">
        <div className="container">
          <div className="mho-head">
            <span className="mho-k">A global research community</span>
            <h2>Two Communities. One Research Platform.</h2>
            <p>
              MyFrequentRewards brings consumers and business professionals together in one worldwide research
              community, and now welcomes teens aged 13 to 17 with a parent or guardian’s permission. These are audience categories, not a guarantee of study availability.
            </p>
          </div>
          <div className="mfr-two">
            <div className="mfr-two__c">
              <span className="mfr-two__ic">
                <RC_I n="users" s={24} />
              </span>
              <h3>Consumer Research</h3>
              <p>For people who share opinions about:</p>
              <ul>
                {MFR_CTOP.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <MFR_Join p={p} cls="btn btn--primary">
                Join as a Consumer
              </MFR_Join>
            </div>
            <div className="mfr-two__link" aria-hidden="true">
              <span />
              <RC_I n="globe" s={26} />
              <span />
            </div>
            <div className="mfr-two__c mfr-two__c--b">
              <span className="mfr-two__ic">
                <RC_I n="brief" s={24} />
              </span>
              <h3>Business Research</h3>
              <p>For professionals who may take part in research related to:</p>
              <ul>
                {MFR_BTOP.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <MFR_Join p={p} cls="btn btn--primary">
                Join as a Business Professional
              </MFR_Join>
            </div>
          </div>
        </div>
      </section>
      <section className="mfr-res" id="mfr-researchers" aria-labelledby="mfr-res-h">
        <div className="container">
          <div className="mfr-res__top">
            <div>
              <span className="mho-k mho-k--light">For researchers & brands</span>
              <h2 id="mfr-res-h">For Researchers, Brands & Organizations</h2>
              <p className="mho-lead mho-lead--light">
                Need to reach consumers, business professionals or teens (with parental consent) for your next research project? Frequent Research can
                help assess audience feasibility and connect research teams with relevant panel communities.
              </p>
              <ul className="mfr-res__feat">
                {MFR_RFEAT.map((x) => (
                  <li key={x}>
                    <RC_I n="check" s={14} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mfr-res__cta">
              <Link className="btn btn--light btn--lg" to={MFR_FEAS}>
                Request audience feasibility
              </Link>
              <a className="btn btn--outline-light btn--lg" href={MFR_BOOK} target="_blank" rel="noopener noreferrer">
                {"View panel book "}
                <span aria-hidden="true">↗</span>
              </a>
              <p>
                {"Learn about our "}
                <Link to="/services/market-research/consumer-panel">Consumer Panel</Link>
                {" and "}
                <Link to="/services/market-research/business-panel">Business Panel</Link>
                {" services."}
              </p>
            </div>
          </div>
          <div className="mfr-res__grid">
            <div>
              <h3>Panel Quality & Participant Management</h3>
              <p>Structured participant management and quality controls support research integrity.</p>
              <ol className={"mfr-ppipe" + (pIn ? " is-in" : "")} ref={pRef}>
                {MFR_PPIPE.map((t, i) => (
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
              <ul className="mfr-pm">
                {MFR_PMGMT.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>How Researchers Work With the Panel</h3>
              <ol className={"mfr-rflow" + (fIn ? " is-in" : "")} ref={fRef}>
                {MFR_RFLOW.map((t, i) => (
                  <li
                    key={t}
                    style={{
                      "--i": i,
                    }}
                  >
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {t}
                  </li>
                ))}
              </ol>
              <p className="mfr-res__note">
                {"Related services: "}
                <Link to="/services/market-research/online-data-collection">Online Data Collection</Link>
                {", "}
                <Link to="/services/market-research/quantitative-research">Quantitative Research</Link>
                {", "}
                <Link to="/services/market-research/qualitative-research">Qualitative Research</Link>
                {", "}
                <Link to="/services/market-research/cati">CATI</Link>
                {", "}
                <Link to="/services/market-research/data-processing-and-analytics">Data Processing & Analytics</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Faq83 p={p} Faq={Faq} general={faqs} after={
            <p className="mho-note">
              {"Questions about your account? Email "}
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
      <section className="mho-cta mfr-cta">
        <div className="container mho-cta__in">
          <h2>Ready to Share Your Opinion?</h2>
          <p>Join MyFrequentRewards and become part of Frequent Research's consumer and business research community.</p>
          <div className="mho-ctas mho-ctas--c">
            <MFR_Join p={p} cls="btn btn--light btn--lg" />
          </div>
          <p className="t2o-cta__res">
            {"Researchers: "}
            <Link to={MFR_FEAS}>Request audience feasibility</Link>
          </p>
          <p className="mfr-cta__s">
            {"MyFrequentRewards \xB7 Consumer, Business & Teen Research Panel \xB7 "}
            <a href={"mailto:" + p.support}>{p.support}</a>
          </p>
        </div>
      </section>
    </div>
  );
}

export { MFR_Page };
