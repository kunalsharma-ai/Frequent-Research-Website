import * as ee from 'react';
import { HeroDemote } from '../shared/HeroH1.jsx';
import { PlatformHero79 } from '../../design79/PlatformHero79.jsx';
import { Link, useParams } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { PORTALS } from '../data/site.jsx';
import { findVertical } from '../data/products.jsx';
import { SERVICE_GUIDES } from '../data/industries.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { BR_MASK } from '../shared/Brand.jsx';
import { NotFoundPage, usePageMeta } from '../SiteApp.jsx';
import { DMH_Page } from '../../pages/DigitalMarketingHub.jsx';
import { ITH_Page } from '../../pages/ItDevelopmentHub.jsx';
import { MRH_Page } from '../../pages/MarketResearchHub.jsx';
import { FR_FaqList } from '../../components/site/Faq.jsx';
import { BR_Panel, PANEL_LOGOS, PanelMark, panelLogo } from '../shared/PanelMark.jsx';
import { AFH_Page } from '../../pages/AccountsFinanceHub.jsx';

function PanelsSection({ only, title = "Powered by our own research panels", text }) {
  const n = only ? PORTALS.filter((s) => only.includes(s.slug)) : PORTALS;
  return (
    <div className="pstrip">
      <div className="pstrip__head">
        <h3>{title}</h3>
        <p>
          {text || "We recruit from our own communities, so we know who our respondents are and how they were verified."}
        </p>
      </div>
      <div className="pstrip__list">
        {n.map((s) => (
          <Link to={`/portals/${s.slug}`} className={`pstrip__item tone-${s.accent}`} key={s.slug}>
            <PanelMark p={s} size="sm" />
            <span>
              <strong className="sr-only">{s.name}</strong>
              <small>{s.audience}</small>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
const findGuide = (t, e) => SERVICE_GUIDES.find((a) => a.service && a.service === e) || SERVICE_GUIDES.find((a) => a.vertical === t && !a.service);
const VerticalPage = ee.lazy(() => Promise.resolve(VERTICAL_PAGE_MODULE));
function FaqList({ items }) {
  return <FR_FaqList items={items} />;
}
function WhyUs({ v, serviceName }) {
  return (
    <section className="section why" aria-labelledby={`why-${v.slug}`}>
      <div className={`container tone-${v.color}`}>
        <div className="why__head">
          <h2 id={`why-${v.slug}`}>Why clients choose Frequent Research{serviceName ? ` for ${serviceName}` : ""}</h2>
          <p>
            {serviceName
              ? `When you choose us for ${serviceName}, you get the full strength of our ${v.name} team and the rest of the company behind it.`
              : `Six reasons businesses trust our ${v.name} team.`}
          </p>
        </div>
        <div className="why__grid">
          {v.whyChoose.map((a, n) => (
            <div className="why__card" key={a.t}>
              <span className="why__icon" aria-hidden="true">
                {["◆", "◎", "✦", "▲", "●", "■"][n % 6]}
              </span>
              <h3>{a.t}</h3>
              <p>{a.d}</p>
            </div>
          ))}
        </div>
        <ul className="why__benefits">
          {v.benefits.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <Link to="/lets-talk?type=quote" className="btn btn--tone">
          Discuss your requirement
        </Link>
      </div>
    </section>
  );
}
function TeamCaption({ v, compact = false }) {
  return (
    <div className={`teamcap tone-${v.color} ${compact ? "teamcap--compact" : ""}`}>
      <div className="teamcap__head">
        <span className="teamcap__icon" aria-hidden="true">
          {v.icon}
        </span>
        <div>
          <h3>{compact ? "The team behind your project" : `${v.name} team`}</h3>
          <p>{v.team.summary}</p>
        </div>
      </div>
      <div className="teamcap__cols">
        <div>
          <h4>Who's on the team</h4>
          <ul>
            {v.team.roles.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Core capabilities</h4>
          <ul>
            {v.team.skills.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Tools we use</h4>
          <div className="teamcap__tools">
            {v.team.tools.map((a) => (
              <span key={a}>{a}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function GuideLink({ vertical, service, label }) {
  const n = findGuide(vertical, service);
  return n ? (
    <Link to={`/blog/${n.slug}`} className="guide-card">
      <span className="guide-card__kicker">
        {n.service ? "In-depth guide" : "Complete guide"}
        {" · Blogs"}
      </span>
      <strong>{n.title}</strong>
      <span className="guide-card__cta">
        {label || "Read the guide"}
        {" →"}
      </span>
    </Link>
  ) : null;
}
const VERTICAL_FORM_KEY = {
  "market-research": "feasibility",
  "digital-marketing": "digital",
  "it-development": "it",
  "accounts-finance": "finance",
};
/* build 79 (Kunal, 9 Nov): the new animated hero on top; the page's own hero is hidden (design79/s79.css, h79-swap) */
function VerticalPageH79() {
  const { vertical } = useParams(),
    v = findVertical(vertical);
  return (
    <>
      {v && PH79_ON.has(v.slug) ? <PlatformHero79 v={v} /> : null}
      {v && PH79_ON.has(v.slug) ? <HeroDemote><VerticalPageBody /></HeroDemote> : <VerticalPageBody />}
    </>
  );
}
const PH79_ON = new Set(["market-research", "digital-marketing", "it-development", "accounts-finance"]);
function VerticalPageBody() {
  const { vertical } = useParams(),
    e = findVertical(vertical);
  if (e && vertical === "digital-marketing") {
    usePageMeta(`${e.name} Services`, e.intro);
    return <DMH_Page a={e} />;
  }
  if (e && vertical === "it-development") {
    return <ITH_Page a={e} />;
  }
  if (e && vertical === "market-research") {
    return <MRH_Page a={e} />;
  }
  if (e && vertical === "accounts-finance") {
    return <AFH_Page a={e} />;
  }
  usePageMeta(e ? `${e.name} Services` : "Not found", e == null ? undefined : e.intro);
  return e ? (
    <>
      {l.jsx(PageHero, {
        tone: e.color,
        icon: e.icon,
        title: `${e.name} services`,
        intro: e.intro,
        crumbs: [
          {
            label: "Services",
            to: "/services",
          },
          {
            label: e.name,
          },
        ],
        children: (
          <div className="page-hero__ctas">
            <Link className="btn btn--light btn--lg" to={`/lets-talk?type=${VERTICAL_FORM_KEY[e.slug]}`}>
              {e.slug === "market-research" ? "Request Research Feasibility" : "Book a free consultation"}
            </Link>
            <Link className="btn btn--outline-light btn--lg" to="/lets-talk?type=quote">
              Request a Quote
            </Link>
          </div>
        ),
      })}
      <section className="section">
        <div className="container split">
          <h2 className="split__title">{e.headline}</h2>
          <div className="split__body">
            <p className="lead">{e.problem}</p>
            <p>{e.solution}</p>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <h2>
              {"All "}
              {e.name}
              {" services"}
            </h2>
            <p>
              {e.services.length}
              {" services, each with its own team and process."}
            </p>
          </div>
          <div className={`svc-grid tone-${e.color}`}>
            {e.services.map((a) => (
              <Link to={`/services/${e.slug}/${a.slug}`} className="svc-card svc-card--grid" key={a.slug}>
                <h3>{a.name}</h3>
                <p>{a.summary}</p>
                <ul>
                  {a.includes.slice(0, 3).map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <span className="svc-card__link">Learn more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          {l.jsx(GuideLink, {
            vertical: e.slug,
            label: `Read our complete ${e.name} guide`,
          })}
        </div>
      </section>
      <WhyUs v={e} />
      {e.slug === "market-research" && (
        <section className="section section--strip">
          <div className="container">
            <PanelsSection />
          </div>
        </section>
      )}
      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <h2>
              {"Meet the "}
              {e.name}
              {" team"}
            </h2>
            <p>
              {"The people and skills behind every "}
              {e.name.toLowerCase()}
              {" project."}
            </p>
          </div>
          {l.jsx(TeamCaption, {
            v: e,
          })}
          <Link to="/our-team" className="btn btn--ghost">
            See our whole team
          </Link>
        </div>
      </section>
      {l.jsx(ProcessSection, {
        v: e,
      })}
      <section className="section">
        <div className="container split">
          <h2 className="split__title">Frequently asked questions</h2>
          <div className="split__body">
            {l.jsx(FaqList, {
              items: e.faqs,
            })}
          </div>
        </div>
      </section>
      {l.jsx(CtaSection, {
        primary: {
          to: `/lets-talk?type=${VERTICAL_FORM_KEY[e.slug]}`,
          label: "Discuss your requirement",
        },
      })}
    </>
  ) : (
    <NotFoundPage />
  );
}
function ProcessSection({ v }) {
  return (
    <section className="section">
      <div className={`container tone-${v.color}`}>
        <div className="section__head">
          <h2>How we work</h2>
        </div>
        <ol className="process">
          {v.process.map((e, a) => (
            <li key={e.t}>
              <span className="process__n">{a + 1}</span>
              <h3>{e.t}</h3>
              <p>{e.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
const VERTICAL_PAGE_MODULE = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      Process: ProcessSection,
      default: VerticalPageH79,
    },
    Symbol.toStringTag,
    {
      value: "Module",
    },
  ),
);
export { BR_Panel, FaqList, GuideLink, PANEL_LOGOS, PanelMark, PanelsSection, ProcessSection, TeamCaption, VerticalPage, WhyUs, panelLogo };
