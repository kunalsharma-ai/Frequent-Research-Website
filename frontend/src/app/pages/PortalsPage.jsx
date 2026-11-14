import * as ee from 'react';
import { Link } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { PORTALS } from '../data/site.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { PanelMark } from './VerticalPage.jsx';
import { PANELS_URL, portalJoinUrl } from './PortalPage.jsx';
import { usePageMeta } from '../SiteApp.jsx';

function PortalsPage() {
  usePageMeta(
    "Our Research Panels",
    "Turn2Opinion, MyFrequentRewards and MyHealthOpinions: Frequent Research’s consumer, business and healthcare research panels.",
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
          "Three communities, run by Frequent Research, where consumers, business professionals, healthcare professionals, patients and caregivers share their opinions and get rewarded for it.",
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
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2>How our panels protect quality</h2>
          </div>
          <div className="reasons">
            <div className="reason">
              <h3>Verified sign-ups</h3>
              <p>Email and phone verification, and professional verification for healthcare members.</p>
            </div>
            <div className="reason">
              <h3>Detailed profiling</h3>
              <p>Members complete profile surveys so invitations reach the right people.</p>
            </div>
            <div className="reason">
              <h3>Quality scoring</h3>
              <p>Response behaviour is scored, and low-quality or duplicate members are removed.</p>
            </div>
            <div className="reason">
              <h3>Fair rewards</h3>
              <p>Clear thresholds and reliable payouts keep members engaged and honest.</p>
            </div>
            <div className="reason">
              <h3>Privacy & consent</h3>
              <p>Members choose what they share, and data is used only for research.</p>
            </div>
            <div className="reason">
              <h3>One company behind it</h3>
              <p>All three panels are run by Frequent Research Fieldwork Solutions Pvt. Ltd.</p>
            </div>
          </div>
        </div>
      </section>
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
