import * as ee from 'react';
import { ServicesHero79 } from '../../design79/SvcHero79.jsx';
import { Link } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { VERTICALS } from '../data/site.jsx';
import { prefersReducedMotion } from '../home/HeroParts.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { usePageMeta } from '../SiteApp.jsx';

import { SERVICE_COUNT } from '../data/serviceBits.jsx';
function ServicesExplorer() {
  const [t, e] = ee.useState(0),
    [a, n] = ee.useState(false),
    [s, i] = ee.useState(0),
    o = ee.useRef(null),
    r = VERTICALS[t],
    c = (d) => {
      const u = o.current;
      if (!u) return;
      const p = u.querySelector(".svc-card"),
        g = p ? p.getBoundingClientRect().width + 20 : 300,
        A = u.scrollLeft + u.clientWidth >= u.scrollWidth - 4;
      if (d > 0 && A)
        u.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      else
        u.scrollBy({
          left: d * g,
          behavior: "smooth",
        });
    };
  ee.useEffect(() => {
    const d = o.current;
    if (!d) return;
    d.scrollTo({
      left: 0,
    });
    const u = () => i(d.scrollLeft / Math.max(1, d.scrollWidth - d.clientWidth));
    u();
    d.addEventListener("scroll", u, {
      passive: true,
    });
    return () => d.removeEventListener("scroll", u);
  }, [t]);
  ee.useEffect(() => {
    if (a || prefersReducedMotion()) return;
    const d = setInterval(() => c(1), 3800);
    return () => clearInterval(d);
  }, [a, t]);
  return (
    <div
      className={`carousel tone-${r.color}`}
      onMouseEnter={() => n(true)}
      onMouseLeave={() => n(false)}
      onFocus={() => n(true)}
      onBlur={() => n(false)}
    >
      <div className="carousel__top">
        <div className="tabs" role="tablist" aria-label="Choose a service area">
          {VERTICALS.map((d, u) => (
            <button
              role="tab"
              aria-selected={u === t}
              className={`tab tone-${d.color} ${u === t ? "is-active" : ""}`}
              onClick={() => e(u)}
              key={d.slug}
            >
              <span aria-hidden="true">{d.icon}</span> {d.name}
              <span className="tab__count">{d.services.length}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="carousel__intro">{r.intro}</p>
      <div className="carousel__track" ref={o} role="tabpanel" aria-label={`${r.name} services`}>
        {r.services.map((d, u) => (
          <article className="svc-card" key={d.slug}>
            <span className="svc-card__index" aria-hidden="true">
              {String(u + 1).padStart(2, "0")}/{r.services.length}
            </span>
            <h3>{d.name}</h3>
            <p>{d.summary}</p>
            <ul>
              {d.includes.slice(0, 3).map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <Link
              to={`/services/${r.slug}/${d.slug}`}
              className="svc-card__link"
              aria-label={`Learn more about ${d.name}`}
            >
              Learn more
            </Link>
          </article>
        ))}
      </div>
      <div className="carousel__foot">
        <div className="carousel__bar">
          <span
            style={{
              width: `${Math.max(8, s * 100)}%`,
            }}
          />
        </div>
        <div className="carousel__nav">
          <button className="round" onClick={() => c(-1)} aria-label="Previous services">
            ‹
          </button>
          <button className="round" onClick={() => c(1)} aria-label="Next services">
            ›
          </button>
        </div>
        <Link to={`/services/${r.slug}`} className="btn btn--ghost">
          {"See all "}
          {r.name}
          {" services"}
        </Link>
      </div>
    </div>
  );
}
function ServicesPage() {
  usePageMeta(
    "Services",
    "Market research, digital marketing, IT & development and accounts & finance services from Frequent Research.",
  );
  return (
    <>
      <ServicesHero79 count={SERVICE_COUNT} />
      <section className="section">
        <div className="container">{l.jsx(ServicesExplorer, {})}</div>
      </section>
      {VERTICALS.map((t, e) => (
        <section className={`section ${e % 2 ? "" : "section--tint"}`} key={t.slug}>
          <div className={`container vlist tone-${t.color}`}>
            <div className="vlist__head">
              <span className="pillar__icon" aria-hidden="true">
                {t.icon}
              </span>
              <h2>{t.name}</h2>
              <p>{t.intro}</p>
              <Link className="btn btn--tone" to={`/services/${t.slug}`}>
                {t.name}
                {" overview"}
              </Link>
            </div>
            <ul className="vlist__items">
              {t.services.map((a) => (
                <li key={a.slug}>
                  <Link to={`/services/${t.slug}/${a.slug}`}>
                    <strong>{a.name}</strong>
                    <span>{a.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
      {l.jsx(CtaSection, {})}
    </>
  );
}

export { SERVICE_COUNT, ServicesPage };
