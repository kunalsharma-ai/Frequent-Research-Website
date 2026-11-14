import * as ee from 'react';
import { Link, useParams } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { PORTALS } from '../data/site.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { FaqList, PanelMark } from './VerticalPage.jsx';
import { MFR_Page } from './MFRPage.jsx';
import { T2O_Page } from './T2OPage.jsx';
import { MHO_Page } from './MHOPage.jsx';
import { NotFoundPage, usePageMeta } from '../SiteApp.jsx';

const PANELS_URL = "https://panels.frequentresearch.com/",
  findPortal = (t) => PORTALS.find((e) => e.slug === t),
  portalJoinUrl = (t) => t.joinUrl || t.url || null;
function PortalPage() {
  const { portal } = useParams(),
    e = findPortal(portal);
  if ((usePageMeta(e ? `${e.name}: ${e.audience}` : "Not found", e == null ? undefined : e.intro), !e))
    return <NotFoundPage />;
  if (e.slug === "myhealthopinions") return <MHO_Page p={e} key={e.slug} />;
  if (e.slug === "turn2opinion") return <T2O_Page p={e} key={e.slug} />;
  if (e.slug === "myfrequentrewards") return <MFR_Page p={e} key={e.slug} />;
  const a = portalJoinUrl(e),
    n = ({ cls }) =>
      a ? (
        <a className={cls} href={a} target="_blank" rel="noopener noreferrer">
          {"Join "}
          {e.name}
          {" free ↗"}
        </a>
      ) : (
        <Link className={cls} to="/lets-talk?type=panel">
          Register your interest
        </Link>
      ),
    s = PORTALS.filter((i) => i.slug !== e.slug);
  return (
    <>
      {l.jsxs(PageHero, {
        tone: e.accent,
        title: e.name,
        intro: e.intro,
        crumbs: [
          {
            label: "Portals",
            to: "/portals",
          },
          {
            label: e.name,
          },
        ],
        children: [
          <div className="portal-hero__brand">
            <PanelMark p={e} size="hero" />
            <span>{e.audience}</span>
          </div>,
          <div className="page-hero__ctas">
            {l.jsx(n, {
              cls: "btn btn--light btn--lg",
            })}
            <Link className="btn btn--outline-light btn--lg" to="/lets-talk?type=audience">
              Researchers: request feasibility
            </Link>
          </div>,
          <ul className="page-hero__chips">
            {e.audiences.map((i) => (
              <li key={i}>
                {"✓ "}
                {i}
              </li>
            ))}
          </ul>,
        ],
      })}
      <section className="section">
        <div className="container split">
          <h2 className="split__title">{e.tagline}</h2>
          <div className="split__body">
            <p className="lead">
              Every survey you take helps a real organisation make a better decision, and you are rewarded for your
              time.
            </p>
            <div className="topics">
              {e.topics.map((i) => (
                <span className="chip" key={i}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className={`container tone-${e.accent}`}>
          <div className="section__head">
            <h2>How it works</h2>
            <p>From free sign-up to your first reward.</p>
          </div>
          <ol className="process">
            {e.steps.map((i, o) => (
              <li key={i.t}>
                <span className="process__n">{o + 1}</span>
                <h3>{i.t}</h3>
                <p>{i.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className={`container tone-${e.accent}`}>
          <div className="section__head">
            <h2>
              {"Why members choose "}
              {e.name}
            </h2>
          </div>
          <div className="why__grid">
            {e.features.map((i, o) => (
              <div className="why__card" key={i.t}>
                <span className="why__icon" aria-hidden="true">
                  {["◆", "◎", "✦", "▲", "●", "■"][o % 6]}
                </span>
                <h3>{i.t}</h3>
                <p>{i.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className={`container rewards tone-${e.accent}`}>
          <div>
            <h2>How you get rewarded</h2>
            <p className="muted">Reward methods available to members:</p>
            <ul className="rewards__list">
              {e.rewards.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            {l.jsx(n, {
              cls: "btn btn--tone btn--lg",
            })}
          </div>
          <div className="rewards__card">
            <PanelMark p={e} size="lg" />
            <strong className="sr-only">{e.name}</strong>
            <span>{e.audience}</span>
            {e.support && <a href={`mailto:${e.support}`}>{e.support}</a>}
            {e.url && (
              <a href={e.url} target="_blank" rel="noopener noreferrer">
                {e.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                {" ↗"}
              </a>
            )}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <h2 className="split__title">
            {e.name}
            {" FAQs"}
          </h2>
          <div className="split__body">
            {l.jsx(FaqList, {
              items: e.faqs,
            })}
            {e.links.length > 0 && (
              <div className="portal-links">
                {e.links.map((i) => (
                  <a href={i.href} target="_blank" rel="noopener noreferrer" key={i.href}>
                    {i.label}
                    {" ↗"}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container split">
          <h2 className="split__title">For researchers & brands</h2>
          <div className="split__body">
            <p className="lead">
              {"Need to reach "}
              {e.audiences.slice(0, 2).join(" or ").toLowerCase()}
              {"? We recruit directly from "}
              {e.name}.
            </p>
            <div className="page-hero__ctas">
              <Link className="btn btn--primary" to="/lets-talk?type=audience">
                Request audience feasibility
              </Link>
              <a className="btn btn--ghost" href={PANELS_URL} target="_blank" rel="noopener noreferrer">
                View panel book ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2>Our other panels</h2>
          </div>
          <div className="portal-mini">
            {s.map((i) => (
              <Link to={`/portals/${i.slug}`} className={`pstrip__item tone-${i.accent}`} key={i.slug}>
                <PanelMark p={i} size="sm" />
                <span>
                  <strong className="sr-only">{i.name}</strong>
                  <small>{i.audience}</small>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {l.jsx(CtaSection, {
        title: `Join ${e.name} today`,
        text: "Free membership, fair rewards and surveys that fit you.",
        primary: a
          ? {
              to: `/portals/${e.slug}`,
              label: `About ${e.name}`,
            }
          : {
              to: "/lets-talk?type=panel",
              label: "Register interest",
            },
        secondary: {
          to: "/portals",
          label: "See all panels",
        },
      })}
    </>
  );
}

export { PANELS_URL, PortalPage, portalJoinUrl };
