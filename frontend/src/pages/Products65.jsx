/*
 * Products (build 65). Prefix PR5_. Styles: src/styles/products65.css (pr5-).
 *   /products              PR5_Page     hero with the Sampledge family orbit, sticky product rail, one full section per
 *                                       product (SampCode, SampBidx, SampTrek, SampAudience, SampForce, Talk2Tax, SampCrew), platform
 *                                       cards for the two existing product pages and a pricing hand-off.
 *   /products/:product     PR5_Product  a single product (ids from PR5_LIST); any other slug falls back to the base
 *                                       product page (ProductPage), so /products/panel-audience-marketplace keeps working.
 * Product content comes from src/data/Sampledge65.jsx. No prices are shown: every pricing button opens PR5_PRICING.
 * Every product badge links to the Sampledge website.
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { useParams, useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../app/SiteApp.jsx';
import { PpL, ppGo } from '../components/dm/shared.jsx';
import { FRK_SamLogo } from '../components/site/FrKit.jsx';
import { K5_I, K5_Rv, K5_Sec, K5_Words, k5Sfx } from '../components/site/Kit65.jsx';
import { PR5_LIST, PR5_OWN_SITE, PR5_OLD, PR5_PRICING, PR5_SITE, pr5ById } from '../data/Sampledge65.jsx';
import { PZ_Site } from '../products/_shell/ProductSite.jsx';
import { SX19_Nudge } from '../components/site/Nudge19.jsx';
import { PR5_Faq, PR5_Flow, PR5_Logo, PR5_Ribbon, PR5_Stage } from './ProductsX65.jsx';
import { ProductPage } from '../app/pages/ProductsPages.jsx';

const PR5_DEMO_MSG = (p) => `/lets-talk?type=demo&product=${encodeURIComponent(p.name)}`;
const pr5Style = (p) => ({ "--p1": p.c1, "--p2": p.c2, "--p3": p.c3 || p.c1 });

/* animated product screen, one scene per product kind */
function PR5_Demo({ p }) {
  const d = p.demo || {};
  let body = null;
  if (d.kind === "builder")
    body = (
      <div className="pr5-scr__list">
        {d.rows.map((r, i) => (
          <span key={r} className={"pr5-q" + (r.startsWith("Logic") ? " pr5-q--logic" : "")} style={{ "--i": i }}>
            <i />
            {r}
          </span>
        ))}
        <span className="pr5-live" style={{ "--i": d.rows.length }}>
          <K5_I n="check" s={14} sw={3} /> Survey live
        </span>
      </div>
    );
  else if (d.kind === "pipeline")
    body = (
      <div className="pr5-kan">
        {d.cols.map((c, i) => (
          <div key={c} className="pr5-kan__col">
            <b>{c}</b>
            {Array.from({ length: 3 - (i === 3 ? 2 : i % 2) }, (_, k) => (
              <i key={k} style={{ "--i": i * 3 + k }} />
            ))}
          </div>
        ))}
        <span className="pr5-kan__mover" aria-hidden="true" />
      </div>
    );
  else if (d.kind === "gantt")
    body = (
      <div className="pr5-gantt">
        {d.rows.map(([t, a, w], i) => (
          <div key={t} className="pr5-gantt__row">
            <span>{t}</span>
            <em>
              <i style={{ "--a": a + "%", "--w": w + "%", "--i": i }} />
            </em>
          </div>
        ))}
        <span className="pr5-gantt__now" aria-hidden="true" />
      </div>
    );
  else if (d.kind === "audience")
    body = (
      <div className="pr5-aud">
        <div className="pr5-aud__chips">
          {d.chips.map((c, i) => (
            <span key={c} style={{ "--i": i }}>
              {c}
            </span>
          ))}
        </div>
        <div className="pr5-aud__rows">
          {[
            ["Consumer", 72],
            ["B2B", 54],
            ["Healthcare", 38],
          ].map(([t, w], i) => (
            <span key={t}>
              <b>{t}</b>
              <em>
                <i style={{ "--i": i, width: w + "%" }} />
              </em>
            </span>
          ))}
        </div>
        <div className="pr5-aud__meter">
          <span>Feasibility</span>
          <em>
            <i />
          </em>
          <b>
            <K5_I n="check" s={13} sw={3} /> Ready
          </b>
        </div>
      </div>
    );
  else if (d.kind === "ledger")
    body = (
      <div className="pr5-led">
        <div className="pr5-led__bars">
          {[46, 62, 38, 74, 58, 86].map((h, i) => (
            <i key={i} style={{ "--h": h + "%", "--i": i }} />
          ))}
        </div>
        <ul>
          {[
            ["Invoices raised", "42"],
            ["Reconciled", "98%"],
            ["GST tasks", "On track"],
          ].map(([a, b], i) => (
            <li key={a} style={{ "--i": i }}>
              <span>{a}</span>
              <b>{b}</b>
            </li>
          ))}
        </ul>
      </div>
    );
  else if (d.kind === "hr")
    body = (
      <div className="pr5-hr">
        <div className="pr5-hr__org">
          <i className="pr5-hr__boss" />
          <span>
            {[0, 1, 2].map((k) => (
              <i key={k} style={{ "--i": k }} />
            ))}
          </span>
        </div>
        <div className="pr5-hr__cal">
          {Array.from({ length: 14 }, (_, k) => (
            <i key={k} className={k % 5 === 3 ? "is-leave" : k % 7 > 4 ? "is-off" : ""} style={{ "--i": k }} />
          ))}
        </div>
      </div>
    );
  return (
    <div className={"pr5-scr pr5-scr--" + (d.kind || "x")} role="img" aria-label={`Illustration of the ${p.short} workspace`}>
      <div className="pr5-scr__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{p.short.toLowerCase()}.sampledge</span>
      </div>
      <div className="pr5-scr__body" aria-hidden="true">
        {body}
      </div>
    </div>
  );
}

/* product badge: always opens the Sampledge website */
function PR5_Badge({ p, big }) {
  /* seven logos on one page: each one animates while pointed at (keeps the long page smooth) */
  const [on, setOn] = ee.useState(false);
  return (
    <a className={"pr5-badge pr5-badge--logo" + (big ? " pr5-badge--big" : "")} href={p.site || PR5_SITE} target="_blank" rel="noopener noreferrer" style={pr5Style(p)} aria-label={`${p.name} on the Sampledge website (opens in a new tab)`} onMouseEnter={() => setOn(true)} onMouseLeave={() => setOn(false)} onFocus={() => setOn(true)} onBlur={() => setOn(false)}>
      <PR5_Logo p={p} h={big ? 78 : 58} still={!on} />
    </a>
  );
}

function PR5_Feats({ p }) {
  const [on, setOn] = ee.useState(0);
  const g = (p.feats || [])[on] || (p.feats || [])[0];
  // build 78: a product added in the admin may have no feature groups yet
  if (!g || !Array.isArray(g[1])) return null;
  return (
    <div className="pr5-feats">
      <div className="pr5-feats__tabs" role="tablist" aria-label={`${p.short} feature groups`}>
        {p.feats.map(([t], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => (setOn(k), k5Sfx("tap"))}>
            <span>{String(k + 1).padStart(2, "0")}</span>
            {t}
          </button>
        ))}
      </div>
      <ul className="pr5-feats__list" role="tabpanel" key={on} aria-label={g[0]}>
        {g[1].map((x, i) => (
          <li key={x} style={{ "--i": i }}>
            <K5_I n="check" s={14} sw={3} /> {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PR5_Sec({ p, i, solo }) {
  const flip = i % 2 === 1;
  return (
    <K5_Sec className={"pr5-sec pr5-sec--" + p.id + (flip ? " pr5-sec--flip" : "") + (solo ? " pr5-sec--solo" : "")} id={"pr5-" + p.id} style={pr5Style(p)} aria-labelledby={"pr5-h-" + p.id}>
      <div className="pr5-sec__glow" aria-hidden="true" />
      <div className="container pr5-sec__in">
        <div className="pr5-sec__txt">
          <K5_Rv a="up" className="pr5-sec__top">
            <PR5_Badge p={p} />
            <span className="pr5-sec__cat">
              <em>{p.group}</em>
              {p.cat}
            </span>
          </K5_Rv>
          {solo ? (
            <HeroH1 id={"pr5-h-" + p.id} className="pr5-sec__h">
              <span className="sr-only">{p.name}: </span>
              {p.tag || p.head}
              <small>{p.head}</small>
            </HeroH1>
          ) : (
            <h2 id={"pr5-h-" + p.id} className="pr5-sec__h">
              <span className="sr-only">{p.name}: </span>
              {p.tag || p.head}
              <small>{p.head}</small>
            </h2>
          )}
          <K5_Rv a="up" d={1} as="p" className="pr5-sec__pos">
            {p.pos}
          </K5_Rv>
          <K5_Rv a="up" d={2} className="pr5-who">
            <b>Built for</b>
            <span>
              {p.who.map((w) => (
                <em key={w}>{w}</em>
              ))}
            </span>
          </K5_Rv>
          <div className="pr5-sec__ctas">
            {solo ? (
              <a className="pr5-btn pr5-btn--solid" href={p.site || PR5_SITE} target="_blank" rel="noopener noreferrer" onClick={() => k5Sfx("tap")}>
                {p.short} on sampledge.com <K5_I n="arrow" s={16} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <PpL className="pr5-btn pr5-btn--solid" to={"/products/" + p.id}>
                Open the {p.short} page <K5_I n="arrow" s={16} />
              </PpL>
            )}
            <PpL className="pr5-btn pr5-btn--line" to={PR5_DEMO_MSG(p)}>
              Request a demo
            </PpL>
            <a className="pr5-btn pr5-btn--text" href={PR5_PRICING} target="_blank" rel="noopener noreferrer">
              Pricing on sampledge.com
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
        <K5_Rv a={flip ? "left" : "right"} className="pr5-sec__vis">
          <PR5_Stage p={p} />
          <span className="pr5-sec__pain">
            <s>{p.pain}</s>
            <K5_I n="arrow" s={14} />
            <b>{p.short}</b>
          </span>
        </K5_Rv>
      </div>
      <PR5_Deep p={p} />
    </K5_Sec>
  );
}

function PR5_Deep({ p }) {
  return (
  <div className="container pr5-sec__deep">
    <K5_Rv a="up">
      <PR5_Flow p={p} />
    </K5_Rv>
    <K5_Rv a="flip">
      <PR5_Feats p={p} />
    </K5_Rv>
    {(p.quality || p.planned || p.note) && (
      <div className="pr5-extra">
        {p.quality && (
          <K5_Rv a="up" d={1} className="pr5-extra__card">
            <h3>
              <K5_I n="shield" s={18} /> Quality controls
            </h3>
            <ul>
              {p.quality.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </K5_Rv>
        )}
        {p.planned && (
          <K5_Rv a="up" d={2} className="pr5-extra__card pr5-extra__card--plan">
            <h3>
              <K5_I n="spark" s={18} /> Planned AI-assisted features
            </h3>
            <ul>
              {p.planned.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <small>On the roadmap; not yet available.</small>
          </K5_Rv>
        )}
        {p.note && (
          <K5_Rv a="up" d={3} className="pr5-extra__card pr5-extra__card--note">
            <h3>
              <K5_I n="eye" s={18} /> Good to know
            </h3>
            <p>{p.note}</p>
          </K5_Rv>
        )}
      </div>
    )}
  </div>
  );
}

function PR5_Rail({ list }) {
  const [cur, setCur] = ee.useState(list[0] && list[0].id);
  ee.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur(e.target.id.slice(4))),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    list.forEach((p) => {
      const el = document.getElementById("pr5-" + p.id);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="pr5-rail" aria-label="Sampledge products">
      <div className="container pr5-rail__in">
        {list.map((p) => (
          <a key={p.id} href={"#pr5-" + p.id} onClick={ppGo("pr5-" + p.id)} className={cur === p.id ? "is-on" : ""} style={pr5Style(p)} aria-current={cur === p.id ? "true" : undefined}>
            <PR5_Logo p={p} v="mark" still h={22} />
            {p.short}
          </a>
        ))}
      </div>
    </nav>
  );
}

function PR5_Hero() {
  const n = PR5_LIST.length;
  return (
    <section className="pr5-hero" aria-labelledby="pr5-hero-h">
      <div className="pr5-hero__bg" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container pr5-hero__in">
        <div>
          <nav className="pr5-crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL> <span aria-hidden="true">/</span> <span aria-current="page">Products</span>
          </nav>
          <span className="k5-eyebrow pr5-eb">
            <K5_I n="layers" s={14} /> The Sampledge product family
          </span>
          <K5_Words as="h1" id="pr5-hero-h" className="pr5-hero__h" text={`${n} products. *One* connected ecosystem.`} />
          <p className="pr5-hero__p">Sampledge builds software for research operations and for running a business: survey programming, research bidding, research projects and fieldwork, research audiences, revenue and sales, accounting and tax, and HR. Each product has its own section below, and its own full page.</p>
          <div className="pr5-hero__groups">
            {["Market research solutions", "Business management solutions"].map((g) => (
              <div key={g} className="pr5-grp">
                <b>{g}</b>
                <span>
                  {PR5_LIST.filter((p) => p.group === g).map((p) => (
                    <a key={p.id} href={"#pr5-" + p.id} onClick={ppGo("pr5-" + p.id)} style={pr5Style(p)}>
                      {p.short}
                    </a>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="pr5-orbit" aria-hidden="true">
          <a className="pr5-orbit__core" href={PR5_SITE} target="_blank" rel="noopener noreferrer" tabIndex={-1}>
            <FRK_SamLogo h={58} tone="dark" word={false} />
          </a>
          <div className="pr5-orbit__ring">
            {PR5_LIST.map((p, k) => (
              <span key={p.id} className="pr5-orbit__it" style={{ ...pr5Style(p), "--a": (360 / n) * k + "deg" }}>
                <span>
                  <PR5_Logo p={p} v="mark" h={50} still />
                  <em>{p.short}</em>
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <PR5_Ribbon />
    </section>
  );
}

/* the two long-standing product pages stay one click away */

function PR5_PriceBand() {
  return (
    <K5_Sec className="pr5-price" aria-labelledby="pr5-price-h">
      <div className="container pr5-price__in">
        <span className="pr5-price__coin" aria-hidden="true">
          <K5_I n="coin" s={34} />
        </span>
        <div>
          <h2 id="pr5-price-h">Looking for prices?</h2>
          <p>Plans and prices for every Sampledge product are published on the Sampledge website, so they are always current.</p>
        </div>
        <a className="pr5-btn pr5-btn--solid" href={PR5_PRICING} target="_blank" rel="noopener noreferrer" onClick={() => k5Sfx("tap")}>
          See pricing on sampledge.com <K5_I n="arrow" s={16} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </K5_Sec>
  );
}

function PR5_Page() {
  const [sp] = useSearchParams();
  const want = sp.get("p");
  ee.useEffect(() => {
    if (!want) return undefined;
    const t = setTimeout(() => ppGo("pr5-" + want)(), 350);
    return () => clearTimeout(t);
  }, [want]);
  usePageMeta("Products", "Sampledge products: SampCode survey programming, SampBidx research bidding, SampTrek research projects and fieldwork, SampAudience research audiences, SampForce revenue platform, Talk2Tax accounting and tax, and SampCrew HR and workforce.");
  return (
    <div className="pr5">
      <PR5_Hero />
      <PR5_Rail list={PR5_LIST} />
      {PR5_LIST.map((p, i) => (
        <PR5_Sec key={p.id} p={p} i={i} />
      ))}
      <PR5_PriceBand />
    </div>
  );
}

function PR5_Product() {
  const { product } = useParams();
  /* build 68: the old product addresses open the product that replaced them */
  const id = PR5_OLD[product] || product;
  ee.useEffect(() => {
    if (id !== product) try { history.replaceState(history.state, "", location.href.replace("/products/" + product, "/products/" + id)); } catch (e) {}
  }, [id, product]);
  const p = pr5ById(id);
  return p && !PR5_OWN_SITE.has(p.id) ? (
    <PR5_One p={p} key={p.id} />
  ) : p ? (
    <>
      <PR5_Full p={p} key={p.id} />
      <SX19_Nudge p={p} key={"n" + p.id} />
    </>
  ) : (
    <ProductPage />
  );
}
/* build 68: the product's own website (src/products/<id>), then questions and the rest of the family.
   The children of PZ_Site are the readable copy for search engines; visitors see the product site. */
function PR5_Full({ p }) {
  usePageMeta(p.name + ": " + p.tag, p.pos);
  const others = PR5_LIST.filter((x) => x.id !== p.id);
  return (
    <div className={"pr5 pr5--full pr5--" + p.id} style={pr5Style(p)}>
      <PZ_Site slug={p.id}>
        <HeroH1>
          {p.name}: {p.tag}
        </HeroH1>
        <p>{p.head}</p>
        <p>{p.pos}</p>
        {p.feats.map(([g, items]) => (
          <section key={g}>
            <h2>{g}</h2>
            <ul>
              {items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </section>
        ))}
        <p>
          <PpL to={PR5_DEMO_MSG(p)}>Book a demo of {p.name}</PpL>
        </p>
      </PZ_Site>
      <K5_Sec className="pr5-askband" style={pr5Style(p)} aria-label={p.short + " questions"}>
        <div className="container">
          <PR5_Faq p={p} />
        </div>
      </K5_Sec>
      <K5_Sec className="pr5-more" aria-labelledby="pr5-more-h">
        <div className="container">
          <h2 id="pr5-more-h" className="pr5-h2">
            More from Sampledge
          </h2>
          <div className="pr5-more__grid">
            {others.map((x, k) => (
              <K5_Rv key={x.id} a="zoom" d={k} className="pr5-more__card" style={pr5Style(x)}>
                <PR5_Logo p={x} v="mark" still h={46} />
                <b>{x.short}</b>
                <span>{x.cat}</span>
                <small>{x.tag}</small>
                <PpL to={"/products/" + x.id} aria-label={`${x.name}: ${x.cat}`} />
              </K5_Rv>
            ))}
          </div>
        </div>
      </K5_Sec>
    </div>
  );
}
function PR5_OneHero({ p }) {
  return (
    <section className={"pr5-oh pr5-oh--" + p.id} style={pr5Style(p)} aria-labelledby={"pr5-h-" + p.id}>
      <div className="pr5-oh__bg" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="pr5-oh__grid" />
      </div>
      <div className="container pr5-oh__in">
        <div className="pr5-oh__txt">
          <nav className="pr5-crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL> <span aria-hidden="true">/</span> <PpL to="/products">Products</PpL> <span aria-hidden="true">/</span> <span aria-current="page">{p.short}</span>
          </nav>
          <a className="pr5-oh__logo" href={p.site || PR5_SITE} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on the Sampledge website (opens in a new tab)`}>
            <PR5_Logo p={p} tone="dark" h={96} />
          </a>
          <span className="pr5-oh__cat">
            <em>{p.group}</em> {p.cat}
          </span>
          <HeroH1 id={"pr5-h-" + p.id} className="pr5-oh__h">
            <span className="sr-only">{p.name}: </span>
            <K5_Words as="span" text={pr5Ink(p.tag || p.head)} />
          </HeroH1>
          <p className="pr5-oh__sub">{p.head}</p>
          <p className="pr5-oh__pos">{p.pos}</p>
          <div className="pr5-sec__ctas">
            <a className="pr5-btn pr5-btn--solid" href={p.site || PR5_SITE} target="_blank" rel="noopener noreferrer" onClick={() => k5Sfx("tap")}>
              {p.short} on sampledge.com <K5_I n="arrow" s={16} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <PpL className="pr5-btn pr5-btn--glass" to={PR5_DEMO_MSG(p)}>
              Request a demo
            </PpL>
            <a className="pr5-btn pr5-btn--text pr5-btn--onDark" href={PR5_PRICING} target="_blank" rel="noopener noreferrer">
              Pricing on sampledge.com
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
        <div className="pr5-oh__vis">
          <PR5_Stage p={p} />
        </div>
      </div>
      <div className="container pr5-oh__who">
        <b>Built for</b>
        <span>
          {p.who.map((w, i) => (
            <em key={w} style={{ "--i": i }}>
              {w}
            </em>
          ))}
        </span>
      </div>
      <nav className="pr5-oh__sw" aria-label="Other Sampledge products">
        <div className="container">
          {PR5_LIST.map((x) => (
            <PpL key={x.id} to={"/products/" + x.id} className={x.id === p.id ? "is-on" : ""} aria-current={x.id === p.id ? "page" : undefined} style={pr5Style(x)}>
              <PR5_Logo p={x} v="mark" still h={24} />
              {x.short}
            </PpL>
          ))}
        </div>
      </nav>
    </section>
  );
}
/* last word of a tagline gets the product gradient */
const pr5Ink = (t) => {
  const w = String(t).replace(/\.$/, "").split(" ");
  const k = w.length > 3 ? 2 : 1;
  return w.slice(0, -k).join(" ") + " *" + w.slice(-k).join(" ") + ".*";
};
function PR5_One({ p }) {
  usePageMeta(p.name, p.pos);
  const others = PR5_LIST.filter((x) => x.id !== p.id);
  return (
    <div className={"pr5 pr5--one pr5--" + p.id} style={pr5Style(p)}>
      <PR5_OneHero p={p} />
      <K5_Sec className={"pr5-sec pr5-sec--solo pr5-sec--" + p.id} style={pr5Style(p)} aria-label={p.short + " in detail"}>
        <div className="pr5-sec__glow" aria-hidden="true" />
        <PR5_Deep p={p} />
      </K5_Sec>
      <K5_Sec className="pr5-askband" style={pr5Style(p)} aria-label={p.short + " questions"}>
        <div className="container">
          <PR5_Faq p={p} />
        </div>
      </K5_Sec>
      <K5_Sec className="pr5-more" aria-labelledby="pr5-more-h">
        <div className="container">
          <h2 id="pr5-more-h" className="pr5-h2">
            More from Sampledge
          </h2>
          <div className="pr5-more__grid">
            {others.map((x, k) => (
              <K5_Rv key={x.id} a="zoom" d={k} className="pr5-more__card" style={pr5Style(x)}>
                <PR5_Logo p={x} v="mark" still h={46} />
                <b>{x.short}</b>
                <span>{x.cat}</span>
                <small>{x.tag}</small>
                <PpL to={"/products/" + x.id} aria-label={`${x.name}: ${x.cat}`} />
              </K5_Rv>
            ))}
          </div>
        </div>
      </K5_Sec>
      <PR5_PriceBand />
    </div>
  );
}

export { PR5_Demo, PR5_Page, PR5_Product, pr5Style };
