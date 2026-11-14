import * as ee from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { useJsonLd } from '../home/HeroParts.jsx';
import { PageHero } from '../shared/CoreParts.jsx';
import { RichText } from './BlogPostPage.jsx';
import { COMPANY, LEGAL_PAGES } from './PrivacyPage.jsx';
import { NotFoundPage, usePageMeta } from '../SiteApp.jsx';

const findLegalPage = (t) => LEGAL_PAGES.find((e) => e.slug === t),
  legalSlug = (t) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
function LegalPage({ slugOverride }) {
  const e = useParams(),
    a = findLegalPage(slugOverride || e.policy);
  usePageMeta((a == null ? undefined : a.title) || "Not found", a == null ? undefined : a.summary);
  useJsonLd(
    `policy-${a == null ? undefined : a.slug}`,
    a && {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `${a.title} | Frequent Research`,
      description: a.summary,
      dateModified: COMPANY.updated,
      publisher: {
        "@type": "Organization",
        name: COMPANY.company,
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${location.origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Privacy & Research Ethics",
            item: `${location.origin}/privacy-data-protection`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: a.title,
          },
        ],
      },
    },
  );
  return a ? (
    <>
      {l.jsx(PageHero, {
        icon: a.icon,
        title: a.title,
        intro: a.intro,
        crumbs: [
          {
            label: "Privacy & Research Ethics",
            to: "/privacy-data-protection",
          },
          {
            label: a.title,
          },
        ],
        children: (
          <p className="policy-updated">
            {"Last updated: "}
            {COMPANY.updated}
          </p>
        ),
      })}
      <section className="section">
        <div className="container policy">
          <aside className="policy__side">
            <nav className="policy__nav" aria-label="Policies">
              <h2>Policies</h2>
              <NavLink to="/privacy-data-protection" end={true}>
                Overview
              </NavLink>
              {LEGAL_PAGES.map((n) => (
                <NavLink to={`/${n.slug}`} key={n.slug}>
                  <span aria-hidden="true">{n.icon}</span> {n.title}
                </NavLink>
              ))}
            </nav>
            <nav className="toc" aria-label="On this page">
              <h2>On this page</h2>
              <ol>
                {a.sections.map((n) => (
                  <li key={n.h}>
                    <a href={`#${legalSlug(n.h)}`}>{n.h}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="article policy__body">
            {a.sections.map((n, s) => {
              var i, o;
              return (
                <section id={legalSlug(n.h)} key={n.h}>
                  <h2>
                    <span>{String(s + 1).padStart(2, "0")}</span>
                    {n.h}
                  </h2>
                  {(i = n.p) == null
                    ? undefined
                    : i.map((r, c) => (
                        <p key={c}>
                          {l.jsx(RichText, {
                            text: r,
                          })}
                        </p>
                      ))}
                  {n.list && (
                    <ul className="ticks">
                      {n.list.map((r) => (
                        <li key={r}>
                          {l.jsx(RichText, {
                            text: r,
                          })}
                        </li>
                      ))}
                    </ul>
                  )}
                  {n.table && (
                    <div className="policy__table" role="table">
                      {n.table.map(([r, c]) => (
                        <div role="row" key={r}>
                          <strong role="cell">{r}</strong>
                          <span role="cell">{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {(o = n.after) == null
                    ? undefined
                    : o.map((r, c) => (
                        <p key={`a${c}`}>
                          {l.jsx(RichText, {
                            text: r,
                          })}
                        </p>
                      ))}
                </section>
              );
            })}
            <div className="policy__contact">
              <h2>Questions?</h2>
              <p>
                {COMPANY.company}
                <br />
                {COMPANY.address}
                <br />
                {"Email: "}
                <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </p>
              <Link className="btn btn--primary" to="/lets-talk">
                Contact our team
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  ) : (
    <NotFoundPage />
  );
}

export { LegalPage };
