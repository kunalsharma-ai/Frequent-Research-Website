import * as ee from 'react';
import { useParams } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { PRODUCTS } from '../data/products.jsx';
import { CtaSection, EnquiryForm, PageHero } from '../shared/CoreParts.jsx';
import { MK_Page } from './MKPage.jsx';
import { NotFoundPage, usePageMeta } from '../SiteApp.jsx';
import { SAM_Page } from '../../pages/Sampledge.jsx';

function ProductPage() {
  const { product } = useParams(),
    e = PRODUCTS.find((s) => s.slug === product);
  if ((usePageMeta((e == null ? undefined : e.name) || "Not found", e == null ? undefined : e.intro), !e))
    return <NotFoundPage />;
  if (e.slug === "panel-audience-marketplace") return <MK_Page />;
  if (e.slug === "sampledge") return <SAM_Page />;
  const a = e.slug === "sampledge",
    n = a ? "research" : "digital";
  return (
    <>
      {l.jsx(PageHero, {
        tone: n,
        title: e.name,
        intro: `${e.tagline} ${e.intro}`,
        crumbs: [
          {
            label: "Products",
            to: "/products",
          },
          {
            label: e.name,
          },
        ],
        children: (
          <div className="page-hero__ctas">
            <a className="btn btn--light btn--lg" href="#enquire">
              {e.cta}
            </a>
          </div>
        ),
      })}
      <section className="section">
        <div className={`container feature-grid tone-${n}`}>
          {Object.entries(e.sections).map(([s, i]) => (
            <div className="feature" key={s}>
              <h2>{s}</h2>
              {s === "How it works" ? (
                <ol className="steps">
                  {i.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ol>
              ) : (
                <ul className="ticks">
                  {i.map((o) => (
                    <li key={o}>{o}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="section section--tint" id="enquire">
        <div className="container enquire">
          <div className="enquire__intro">
            <h2>{e.cta}</h2>
            <p>
              {a
                ? "See Sampledge with your own project in mind. Demos take about 30 minutes."
                : "Tell us your audience, markets and sample size. We will confirm feasibility and cost, usually within one working day."}
            </p>
          </div>
          <div className="card-form">
            {l.jsx(EnquiryForm, {
              type: a ? "demo" : "audience",
              compact: true,
            })}
          </div>
        </div>
      </section>
      {l.jsx(CtaSection, {})}
    </>
  );
}

export { ProductPage };
