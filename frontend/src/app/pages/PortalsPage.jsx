import * as ee from 'react';
import { Link } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { PORTALS } from '../data/site.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { PanelMark } from './VerticalPage.jsx';
import { PANELS_URL, portalJoinUrl } from './PortalPage.jsx';
import { usePageMeta } from '../SiteApp.jsx';
import { Panel83Css, Consent83, Quality83, Compare83 } from '../../design83/Panel83.jsx';

const FR83 = { slug: 'portals', name: 'Frequent Research' };

function PortalsPage() {
  usePageMeta(
    "Our Research Panels",
    "Turn2Opinion, MyFrequentRewards and MyHealthOpinions: research panels for consumers, professionals, teens 13–17 (with a parent’s permission) and healthcare.",
  );
  return (
    <>
      {l.jsx(PageHero, {
        title: "Our research panels",
        crumbs: [
          {
            label: "Portals",
          },
        ],
        intro:
          "Three communities, run by Frequent Research, where consumers, business professionals, teens (13 to 17, with a parent’s permission), healthcare professionals, patients and caregivers share their opinions and get rewarded for it.",
        children: (
          <div className="page-hero__ctas">
            <a className="btn btn--light btn--lg" href="#panels">
              Join a panel
            </a>
            <Link className="btn btn--outline-light btn--lg" to="/lets-talk?type=audience">
              I need respondents
            </Link>
          </div>
        ),
      })}
      <section className="section" id="panels">
        <div className="container">
          <div className="section__head">
            <h2>Choose your community</h2>
            <p>Membership is free. Pick the panel that fits you best.</p>
          </div>
          <div className="portal-grid">
            {PORTALS.map((t) => {
              const e = portalJoinUrl(t);
              return (
                <article className={`portal-card tone-${t.accent}`} key={t.slug}>
                  <div className="portal-card__top portal-card__top--logo">
                    <PanelMark p={t} size="md" />
                    <div>
                      <h3 className="sr-only">{t.name}</h3>
                      <p className="portal-card__aud">{t.audience}</p>
                    </div>
                  </div>
                  <p className="portal-card__tag">{t.tagline}</p>
                  <ul className="portal-card__who">
                    {t.audiences.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                  <div className="portal-card__rewards">
                    <span>Rewards:</span> {t.rewards.join(" · ")}
                  </div>
                  <div className="portal-card__ctas">
                    <Link className="btn btn--tone" to={`/portals/${t.slug}`}>
                      {"Explore "}
                      {t.name}
                    </Link>
                    {e ? (
                      <a className="btn btn--ghost" href={e} target="_blank" rel="noopener noreferrer">
                        Join free ↗
                      </a>
                    ) : (
                      <Link className="btn btn--ghost" to="/lets-talk?type=panel">
                        Register interest
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Panel83Css />
      <Compare83 p={FR83} />
      <Consent83 p={FR83} />
      <section className="section section--tint">
        <div className="container split">
          <h2 className="split__title">For researchers and brands</h2>
          <div className="split__body">
            <p className="lead">
              Our panels give agencies and brands direct access to profiled consumer, B2B and healthcare audiences.
            </p>
            <p>
              Because we run our own communities, we control recruitment, profiling, verification and quality scoring,
              and can give honest feasibility fast.
            </p>
            <div className="page-hero__ctas">
              <Link className="btn btn--primary" to="/lets-talk?type=audience">
                Request audience feasibility
              </Link>
              <Link className="btn btn--ghost" to="/products/panel-audience-marketplace">
                SampAudience
              </Link>
              <a className="btn btn--ghost" href={PANELS_URL} target="_blank" rel="noopener noreferrer">
                View panel book ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <Quality83 p={FR83} />
      {l.jsx(CtaSection, {
        title: "Need respondents for your next study?",
        primary: {
          to: "/lets-talk?type=audience",
          label: "Request Audience Feasibility",
        },
      })}
    </>
  );
}

export { PortalsPage };
