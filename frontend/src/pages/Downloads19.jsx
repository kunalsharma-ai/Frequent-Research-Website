/*
 * Build 65 update 19 — Downloads, section 6 "Industries & case studies" redesigned (Kunal: the old hero and the pill
 * lists looked dull). DL19_Hero: a turning 3D ring of case-study PDF covers, a kinetic headline and facts.
 * DL19_Library: one glass shelf per sector; every industry is a book whose spine opens the industry page and whose
 * download button takes its case-study pack (through the usual download form). Styles downloads19.css (dl19-).
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { IndustryIcon } from '../app/home/HeroParts.jsx';
import { INDUSTRIES, INDUSTRY_GROUPS } from '../app/data/industries.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { K5_I } from '../components/site/Kit65.jsx';
import { ab17Snd } from './About17.jsx';
import { IN6_GRP } from './Industries18.jsx';

const dl19Grp = (key) => IN6_GRP[key] || { c: "#2F6BFF", c2: "#8FB0FF", ic: "layers" };

function DL19_Hero() {
  const X = INDUSTRIES;
  const pick = X.filter((_, i) => i % 6 === 2).slice(0, 10);
  return (
    <section className="dl19-hero ab17" aria-labelledby="dl19-h1">
      <div className="dl19-hero__sky" aria-hidden="true">
        <i className="ab17-aur ab17-aur--a" />
        <i className="ab17-aur ab17-aur--b" />
        <i className="dl19-hero__grid" />
      </div>
      <div className="container dl19-hero__in">
        <div className="dl19-hero__copy">
          <nav className="dl5-crumbs" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink>
            <HmLink to="/downloads">Downloads</HmLink>
            <span aria-current="page">Industries & case studies</span>
          </nav>
          <span className="dl19-badge">
            <K5_I n="book" s={14} /> Section 6 of 6 · the case study library
          </span>
          <HeroH1 id="dl19-h1" className="dl19-h1">
            <span>{(X.length || 58) * 10} case studies.</span>
            <span>
              <em>Take the proof home.</em>
            </span>
          </HeroH1>
          <p className="dl19-lead">Pick a sector, pull an industry off the shelf and download its case studies as one branded PDF. Every study follows the same 15 points, from the client's challenge to the business impact.</p>
          <div className="dl19-ctas">
            <a href="#dl19-lib" className="ab17-btn ab17-btn--glow">
              Browse the library <K5_I n="arrow" s={16} />
            </a>
            <HmLink to="/industries-case-studies" className="ab17-btn ab17-btn--glass">
              Read them online
            </HmLink>
          </div>
          <ul className="dl19-facts">
            <li>
              <b>{X.length || 58}</b> industries
            </li>
            <li>
              <b>{INDUSTRY_GROUPS.length}</b> sectors
            </li>
            <li>
              <b>15</b> points each
            </li>
            <li>
              <b>PDF</b> instant download
            </li>
          </ul>
        </div>
        <div className="dl19-ring" aria-hidden="true">
          <i className="dl19-ring__floor" />
          <div className="dl19-ring__spin">
            {pick.map((x, i) => {
              const L = dl19Grp(x.group);
              return (
                <span key={x.slug} className="dl19-cover" style={{ transform: "rotateY(" + i * (360 / pick.length) + "deg) translateZ(var(--rz))", "--c": L.c, "--c2": L.c2 }}>
                  <span className="dl19-cover__top">
                    <span className="dl19-cover__logo">FR</span>
                    <small>Case studies</small>
                  </span>
                  <span className="dl19-cover__ic">
                    <IndustryIcon name={x.icon} size={28} />
                  </span>
                  <b>{x.name}</b>
                  <span className="dl19-cover__bars">
                    <i />
                    <i />
                    <i />
                  </span>
                  <em>PDF · 10 studies</em>
                </span>
              );
            })}
          </div>
          <span className="dl19-ring__pdf">
            <K5_I n="doc" s={30} />
            <b>PDF</b>
          </span>
        </div>
      </div>
    </section>
  );
}

function DL19_Library({ onPack }) {
  const G = INDUSTRY_GROUPS;
  const X = INDUSTRIES;
  const [g, setG] = ee.useState("all");
  const shelves = G.filter((x) => g === "all" || x.key === g);
  return (
    <div className="ab17 dl19-libw"><div className="container dl19-lib" id="dl19-lib">
      <div className="dl19-lib__top">
        <div>
          <span className="ab17-kick">The library</span>
          <h2 className="ab17-h2">
            {G.length} shelves. <em>{X.length} books.</em>
          </h2>
          <p className="ab17-sub">Hover a book to pull it out. The spine opens the industry; the download button gets its case-study pack.</p>
        </div>
        <div className="dl19-filter" role="toolbar" aria-label="Sectors">
          <button type="button" className={g === "all" ? "is-on" : ""} aria-pressed={g === "all"} onClick={() => setG("all")} style={{ "--c": "#2F6BFF" }}>
            All sectors
          </button>
          {G.map((x) => (
            <button key={x.key} type="button" className={g === x.key ? "is-on" : ""} aria-pressed={g === x.key} onClick={() => (setG(x.key), ab17Snd("tab"))} style={{ "--c": dl19Grp(x.key).c }}>
              {x.name}
            </button>
          ))}
        </div>
      </div>
      {shelves.map((sg, si) => {
        const L = dl19Grp(sg.key);
        const books = X.filter((x) => x.group === sg.key);
        return (
          <section key={sg.key} className="dl19-shelf" style={{ "--c": L.c, "--c2": L.c2, "--si": si }} aria-label={sg.name}>
            <header className="dl19-shelf__h">
              <span className="dl19-shelf__ic">
                <K5_I n={L.ic} s={18} />
              </span>
              <b>{sg.name}</b>
              <em>{books.length} industries</em>
            </header>
            <ul className="dl19-books">
              {books.map((x, i) => (
                <li key={x.slug} className="dl19-book" style={{ "--i": i, "--h": 170 + ((i * 37) % 50) + "px", "--t": (i % 3) * 12 + "%" }}>
                  <HmLink to={"/industries-case-studies/" + x.slug} className="dl19-book__spine" title={"Open " + x.name}>
                    <span className="dl19-book__ic">
                      <IndustryIcon name={x.icon} size={18} />
                    </span>
                    <span className="dl19-book__t">{x.name}</span>
                    <span className="dl19-book__n">10</span>
                  </HmLink>
                  {onPack ? (
                    <button type="button" className="dl19-book__dl" onClick={() => onPack(x)} aria-label={"Download the " + x.name + " case study pack"}>
                      <K5_I n="doc" s={14} />
                      <span>PDF</span>
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
            <i className="dl19-shelf__board" aria-hidden="true" />
          </section>
        );
      })}
    </div>
    </div>
  );
}

export { DL19_Hero, DL19_Library };
