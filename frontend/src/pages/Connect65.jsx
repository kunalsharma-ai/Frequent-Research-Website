/*
 * QR & Connect (build 65 r2, "scan studio"). Prefix CQ5_. Styles: src/styles/connect65.css (cq5-). Route /connect.
 * Data stays in src/pages/Connect.jsx (FRQ_SOCIAL, FRQ_PROFILES, FRQ_SAMPLEDGE, FRQ_DIRECT) so the footer widget and
 * this page can never disagree. Build 65 adds Sampledge on X (https://x.com/SampledgeX, public/images/qr/sampledge-x.png,
 * made and decode-checked by tools/qr/make_qr_b65.py).
 *
 * Layout: a hero where a phone scans codes while channel bubbles orbit a network; a search box and channel filters;
 * a brand switcher; the brand spotlight (logo links to the website, big website code with a scan beam) beside a wall
 * of viewfinder QR tiles (QR always visible and scannable from the screen; corners lock on and a beam sweeps on
 * hover). "All codes" mode shows every code at once, filtered by the search or a channel. Direct lines close the page.
 */
import * as ee from 'react';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { FRK_I, FRK_LOGO_MFR, FRK_LOGO_MHO, FRK_LOGO_SAM_WHITE, FRK_LOGO_T2O } from '../components/site/FrKit.jsx';
import { K5_Count, K5_Sec, K5_Words, k5Reduce, k5Sfx } from '../components/site/Kit65.jsx';
import { FRL_Plate } from '../components/site/Logos13.jsx';
import { FRQ_DIRECT, FRQ_Icon, FRQ_PCOL, FRQ_PROFILES, FRQ_SAMPLEDGE, FRQ_SOCIAL, cqHost, frqFile } from './Connect.jsx';

const CQ5_FR_SITE = { k: "web", name: "Official website", handle: "frequentresearch.com", url: "https://www.frequentresearch.com/", qr: "__QR:site-frequentresearch__" };
const cq5Brands = () => {
  const prof = (id) => FRQ_PROFILES.find((p) => p.id === id);
  const panel = (id, logo) => {
    const p = prof(id);
    return { id, name: p.name, who: p.who, tag: p.tag, c1: p.c1, c2: p.c2, logo, site: p.site, siteQr: p.siteQr, links: p.links };
  };
  const samLinks = FRQ_SAMPLEDGE.links.filter((l) => l.k !== "web");
  return [
    { id: "fr", name: "Frequent Research", who: "Market research, digital marketing, IT and finance services", tag: "Insights you can act on.", c1: "#1E6BFF", c2: "#22D3EE", logo: "__IMG:brand/fr-emblem-sm__", site: CQ5_FR_SITE.url, siteQr: CQ5_FR_SITE.qr, links: FRQ_SOCIAL },
    panel("mho", FRK_LOGO_MHO),
    panel("t2o", FRK_LOGO_T2O),
    panel("mfr", FRK_LOGO_MFR),
    { id: "sam", name: "Sampledge", who: FRQ_SAMPLEDGE.what, tag: "Research operations, simplified.", c1: "#7B4DFF", c2: "#22D3EE", logo: FRK_LOGO_SAM_WHITE, dark: true, site: FRQ_SAMPLEDGE.site, siteQr: "__QR:product-sampledge__", links: samLinks, fresh: "x" },
  ];
};


const CQ5_KINDS = [
  ["all", "All"],
  ["youtube", "YouTube"],
  ["instagram", "Instagram"],
  ["linkedin", "LinkedIn"],
  ["facebook", "Facebook"],
  ["x", "X"],
  ["threads", "Threads"],
  ["whatsapp", "WhatsApp"],
];

function CQ5_Tile({ t, brand, i, fresh }) {
  const [c1] = FRQ_PCOL[t.k] || ["#2F6BFF"];
  const label = t.k === "whatsapp" && !/WhatsApp/.test(t.name) ? `${brand} WhatsApp support` : t.name;
  return (
    <li className={"cq5-tile" + (fresh ? " is-new" : "")} style={{ "--k": c1, "--i": i }}>
      <div className="cq5-tile__top">
        <span className="cq5-tile__ic">
          <FRQ_Icon k={t.k} s={16} />
        </span>
        <span className="cq5-tile__t">
          <b>{label}</b>
          <small>{t.handle}</small>
        </span>
        {fresh ? <em className="cq5-new">New</em> : null}
      </div>
      <a className="cq5-vf" href={t.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${brand} ${label} (opens in a new tab)`} onClick={() => k5Sfx(t.k === "whatsapp" ? "whatsapp" : "tap")}>
        <img src={t.qr} width="150" height="150" alt={`QR code for ${brand} ${label}: ${t.url}`} loading="lazy" decoding="async" />
        <i className="cq5-vf__c cq5-vf__c--a" aria-hidden="true" />
        <i className="cq5-vf__c cq5-vf__c--b" aria-hidden="true" />
        <i className="cq5-vf__c cq5-vf__c--c" aria-hidden="true" />
        <i className="cq5-vf__c cq5-vf__c--d" aria-hidden="true" />
        <i className="cq5-vf__beam" aria-hidden="true" />
      </a>
      <div className="cq5-tile__act">
        <a href={t.url} target="_blank" rel="noopener noreferrer" onClick={() => k5Sfx(t.k === "whatsapp" ? "whatsapp" : "tap")}>
          {t.k === "whatsapp" ? "Chat" : "Open"} <FRK_I n="arrow" s={13} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href={t.qr} download={frqFile(brand + " " + label)} aria-label={`Download the ${brand} ${label} QR code`}>
          <FRK_I n="down" s={14} /> QR
        </a>
      </div>
    </li>
  );
}

/* hero: a phone scans a code; channel bubbles sit on a slowly turning network */
function CQ5_Scanner({ brands }) {
  const codes = brands.map((b) => [b.name, b.siteQr]);
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (k5Reduce()) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % codes.length), 2800);
    return () => clearInterval(t);
  }, [codes.length]);
  const bubbles = ["youtube", "instagram", "linkedin", "facebook", "x", "threads", "whatsapp", "pinterest"];
  return (
    <div className="cq5-scan" aria-hidden="true">
      <svg className="cq5-scan__net" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="168" />
        <circle cx="200" cy="200" r="118" />
        {bubbles.map((k, n) => {
          const a = (n / bubbles.length) * Math.PI * 2;
          return <line key={k} x1="200" y1="200" x2={200 + 168 * Math.cos(a)} y2={200 + 168 * Math.sin(a)} />;
        })}
      </svg>
      <div className="cq5-scan__ring">
        {bubbles.map((k, n) => (
          <span key={k} className="cq5-scan__b" style={{ "--a": (n / bubbles.length) * 360 + "deg", "--k": (FRQ_PCOL[k] || ["#2F6BFF"])[0] }}>
            <span>
              <FRQ_Icon k={k} s={18} />
            </span>
          </span>
        ))}
      </div>
      <div className="cq5-phone">
        <span className="cq5-phone__notch" />
        <div className="cq5-phone__scr">
          <span className="cq5-phone__qr" key={i}>
            <img src={codes[i][1]} alt="" width="120" height="120" decoding="async" />
          </span>
          <i className="cq5-phone__laser" />
          <b key={"b" + i}>{codes[i][0]}</b>
          <small>
            <FRK_I n="check" s={12} /> Code found
          </small>
        </div>
      </div>
    </div>
  );
}

function CQ5_Spot({ b }) {
  return (
    <aside className="cq5-spot" style={{ "--b1": b.c1, "--b2": b.c2 }}>
      <a className={"cq5-spot__logo" + (b.dark ? " is-dark" : "")} href={b.site} target="_blank" rel="noopener noreferrer" aria-label={`${b.name} website (opens in a new tab)`}>
        {/^(fr|mho|t2o|mfr)$/.test(b.id) ? <FRL_Plate k={b.id} h={b.id === "fr" ? 64 : 40} alt={`${b.name} logo`} /> : <img src={b.logo} alt={`${b.name} logo`} loading="lazy" decoding="async" />}
      </a>
      <h3 id="cq5-stage-h">{b.name}</h3>
      <p className="cq5-spot__tag">{b.tag}</p>
      <p className="cq5-spot__who">{b.who}</p>
      <a className="cq5-vf cq5-vf--big" href={b.site} target="_blank" rel="noopener noreferrer" aria-label={`Open the ${b.name} website (opens in a new tab)`}>
        <img src={b.siteQr} width="190" height="190" alt={`QR code for the ${b.name} website: ${b.site}`} loading="lazy" decoding="async" />
        <i className="cq5-vf__c cq5-vf__c--a" aria-hidden="true" />
        <i className="cq5-vf__c cq5-vf__c--b" aria-hidden="true" />
        <i className="cq5-vf__c cq5-vf__c--c" aria-hidden="true" />
        <i className="cq5-vf__c cq5-vf__c--d" aria-hidden="true" />
        <i className="cq5-vf__beam is-auto" aria-hidden="true" />
      </a>
      <small className="cq5-spot__host">Scan for {cqHost(b.site)}</small>
      <div className="cq5-spot__act">
        <a className="cq5-btn" href={b.site} target="_blank" rel="noopener noreferrer" onClick={() => k5Sfx("tap")}>
          Visit website <FRK_I n="arrow" s={14} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a className="cq5-btn cq5-btn--line" href={b.siteQr} download={frqFile(b.name + " website")}>
          <FRK_I n="down" s={14} /> Website QR
        </a>
      </div>
    </aside>
  );
}

function CQ5_Page() {
  dmMeta("/connect", "QR & Connect | Frequent Research, Panel & Sampledge QR Codes", "Scan to follow Frequent Research, MyHealthOpinions, Turn2Opinion, MyFrequentRewards and Sampledge (now on X) on YouTube, Instagram, Threads, LinkedIn, Facebook and X, or get WhatsApp support.");
  usePageMeta("QR & Connect", "Scan to follow Frequent Research, our research panels and Sampledge, or get WhatsApp support.");
  const brands = ee.useMemo(cq5Brands, []);
  const [on, setOn] = ee.useState(0);
  const [mode, setMode] = ee.useState("brand");
  const [kind, setKind] = ee.useState("all");
  const [q, setQ] = ee.useState("");
  const total = brands.reduce((n, x) => n + x.links.length + 1, 0) + FRQ_DIRECT.length;
  const b = brands[on];
  const ql = q.trim().toLowerCase();
  const match = (br, l) => (kind === "all" || l.k === kind) && (!ql || (br.name + " " + l.name + " " + l.handle + " " + l.k).toLowerCase().includes(ql));
  const filtering = kind !== "all" || !!ql;
  const showAll = mode === "all" || filtering;
  const pickBrand = (n) => {
    setOn(n);
    setMode("brand");
    setKind("all");
    setQ("");
    k5Sfx("flip");
  };
  const found = showAll ? brands.map((br) => ({ br, ls: br.links.filter((l) => match(br, l)) })).filter((x) => x.ls.length) : [];
  return (
    <div className="cq5">
      <section className="cq5-hero" aria-labelledby="cq5-h1">
        <div className="container cq5-hero__in">
          <div className="cq5-hero__copy">
            <nav className="cq5-crumbs" aria-label="Breadcrumb">
              <HmLink to="/">Home</HmLink>
              <HmLink to="/about-us">About Us</HmLink>
              <span aria-current="page">QR &amp; Connect</span>
            </nav>
            <span className="cq5-kick">
              <FRK_I n="grid" s={14} /> QR &amp; Connect
            </span>
            <K5_Words id="cq5-h1" className="cq5-h1" text="Scan. Follow. *Stay connected.*" />
            <p className="cq5-lead">Every official channel of Frequent Research, our three research panels and Sampledge in one place. Point your phone camera at any code, or tap it to open.</p>
            <button
              type="button"
              className="cq5-news"
              onClick={() => {
                pickBrand(brands.length - 1);
                setTimeout(() => {
                  const el = document.getElementById("cq5-wall");
                  el && el.scrollIntoView({ behavior: k5Reduce() ? "auto" : "smooth", block: "start" });
                }, 40);
              }}
            >
              <em>New</em> Sampledge is now on X <FRK_I n="arrow" s={13} />
            </button>
            <ul className="cq5-stats">
              <li>
                <b>
                  <K5_Count to={total} />
                </b>
                <span>codes</span>
              </li>
              <li>
                <b>
                  <K5_Count to={brands.length} />
                </b>
                <span>brands</span>
              </li>
              <li>
                <b>1</b>
                <span>WhatsApp for all</span>
              </li>
            </ul>
          </div>
          <CQ5_Scanner brands={brands} />
        </div>
      </section>

      <div className="cq5-tools" id="cq5-wall">
        <div className="container">
          <div className="cq5-brands" role="tablist" aria-label="Brands">
            {brands.map((x, n) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={mode === "brand" && !filtering && on === n}
                className={"cq5-brandtab" + (mode === "brand" && !filtering && on === n ? " is-on" : "")}
                style={{ "--b1": x.c1, "--b2": x.c2 }}
                onClick={() => pickBrand(n)}
              >
                <span className={"cq5-brandtab__logo" + (x.dark ? " is-dark" : "")}>
                  {/^(fr|mho|t2o|mfr)$/.test(x.id) ? <FRL_Plate k={x.id === "fr" ? "icon" : x.id} h={30} calm flat /> : <img src={x.logo} alt="" loading="lazy" decoding="async" />}
                </span>
                <span>
                  <b>{x.name}</b>
                  <small>{x.links.length + 1} codes</small>
                </span>
              </button>
            ))}
            <button type="button" role="tab" aria-selected={mode === "all" && !filtering} className={"cq5-brandtab cq5-brandtab--all" + (mode === "all" && !filtering ? " is-on" : "")} onClick={() => (setMode("all"), k5Sfx("flip"))}>
              <span className="cq5-brandtab__logo">
                <FRK_I n="grid" s={20} />
              </span>
              <span>
                <b>All codes</b>
                <small>{total} codes</small>
              </span>
            </button>
          </div>
          <div className="cq5-find">
            <label className="cq5-search">
              <FRK_I n="lens" s={16} />
              <span className="sr-only">Search channels</span>
              <input type="search" value={q} placeholder="Search a brand or channel, e.g. YouTube" onChange={(e) => setQ(e.target.value)} />
            </label>
            <div className="cq5-kinds" role="group" aria-label="Filter by channel">
              {CQ5_KINDS.map(([k, t]) => (
                <button key={k} type="button" aria-pressed={kind === k} className={kind === k ? "is-on" : ""} onClick={() => setKind(k)}>
                  {k !== "all" ? <FRQ_Icon k={k} s={13} /> : null}
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <K5_Sec className="cq5-main" aria-labelledby={showAll ? "cq5-all-h" : "cq5-stage-h"}>
        <div className="container">
          {showAll ? (
            <div className="cq5-all" key={"all" + kind + ql}>
              <h2 id="cq5-all-h" className="cq5-h2">
                {filtering ? "Matching codes" : "Every code"}
              </h2>
              {found.length ? (
                found.map(({ br, ls }) => (
                  <div key={br.id} className="cq5-all__grp" style={{ "--b1": br.c1, "--b2": br.c2 }}>
                    <h3>
                      <span className={"cq5-brandtab__logo" + (br.dark ? " is-dark" : "")}>
                        {/^(fr|mho|t2o|mfr)$/.test(br.id) ? <FRL_Plate k={br.id === "fr" ? "icon" : br.id} h={30} calm flat /> : <img src={br.logo} alt="" loading="lazy" decoding="async" />}
                      </span>
                      {br.name}
                    </h3>
                    <ul className="cq5-wall">
                      {ls.map((l, n) => (
                        <CQ5_Tile key={l.k + l.url} t={l} brand={br.name} i={n} fresh={br.fresh === l.k} />
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p className="cq5-empty">No channel matches “{q}”. Try another name, or clear the search.</p>
              )}
            </div>
          ) : (
            <div className="cq5-stage" key={b.id} style={{ "--b1": b.c1, "--b2": b.c2 }}>
              <CQ5_Spot b={b} />
              <ul className="cq5-wall" aria-labelledby="cq5-stage-h">
                {b.links.map((l, n) => (
                  <CQ5_Tile key={l.k + l.url} t={l} brand={b.name} i={n} fresh={b.fresh === l.k} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </K5_Sec>

      <K5_Sec className="cq5-direct" aria-labelledby="cq5-direct-h">
        <div className="container">
          <span className="k5-eyebrow cq5-eb">
            <FRK_I n="spark" s={14} /> Talk to us
          </span>
          <h2 id="cq5-direct-h" className="cq5-h2 cq5-h2--light">
            Direct lines
          </h2>
          <p className="cq5-direct__p">One WhatsApp number, +91 81782 00573, supports every panel and Sampledge.</p>
          <ul className="cq5-lines">
            {FRQ_DIRECT.map((d, n) => (
              <li key={d.k} className="cq5-line" style={{ "--c1": d.c1, "--c2": d.c2, "--i": n }}>
                <span className="cq5-line__ic" aria-hidden="true">
                  <FRK_I n={d.ic} s={24} />
                </span>
                <b>{d.name}</b>
                <small>{d.sub}</small>
                <span className="cq5-vf cq5-vf--line">
                  <img src={d.qr} width="130" height="130" alt={`QR code: ${d.name}, ${d.url}`} loading="lazy" decoding="async" />
                  <i className="cq5-vf__c cq5-vf__c--a" aria-hidden="true" />
                  <i className="cq5-vf__c cq5-vf__c--b" aria-hidden="true" />
                  <i className="cq5-vf__c cq5-vf__c--c" aria-hidden="true" />
                  <i className="cq5-vf__c cq5-vf__c--d" aria-hidden="true" />
                </span>
                <div className="cq5-line__act">
                  <a href={d.url} target="_blank" rel="noopener noreferrer" onClick={() => k5Sfx(d.k === "whatsapp" ? "whatsapp" : "tap")}>
                    {d.cta} <FRK_I n="arrow" s={13} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a href={d.qr} download={frqFile(d.name)} aria-label={`Download the ${d.name} QR code`}>
                    <FRK_I n="down" s={14} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
          <p className="cq5-note">
            <FRK_I n="shield" s={15} /> Every code was generated from the official links and checked with a QR decoder before publishing.
          </p>
        </div>
      </K5_Sec>
    </div>
  );
}

export { CQ5_Page };
