/*
 * Site footer (build 51 redesign) — replaces the base footer (HM). Prefix FT_. Styles: src/styles/footer.css (ft-).
 * Same links and data as before (services from `aa`, products `PRODUCTS`, panels `Ri`, contact `Ct`, certifications `TrustBadges`,
 * social `SOC_Follow`), plus "Our Journey" and the animated Sampledge logo. Each service column carries its own
 * colour world; a constellation of drifting nodes sits behind everything.
 */
import * as ee from 'react';
import { useLocation } from 'react-router-dom';
import { BRAND_LINE, CONTACT, PORTALS, VERTICALS, whatsappUrl } from '../../app/data/site.jsx';
import { PRODUCTS, TrustBadges } from '../../app/data/products.jsx';
import { BR_Panel, panelLogo } from '../../app/shared/PanelMark.jsx';
import { PpL } from '../dm/shared.jsx';
import { FRK_I, frkIn, frkV, frkVStyle } from './FrKit.jsx';
import { SX8_FootList } from './Sampledge8.jsx';
import { FRS_Toggle } from './Floaters.jsx';
import { FRL_FR } from './Logos13.jsx';
import { useFullPart } from '../../app/full.js';
import { FRQ_Follow } from '../../pages/Connect.jsx';
import { cmsList } from '../../app/cms.jsx';
import { OB82 } from '../../design82/Ob82.jsx';
import { cmsLogo, cmsMenuExtra } from '../../app/cms78.jsx';

/* build 78: the footer's link lists can be changed in the super admin (Header & footer menus) */
const pair = (l) => l.map(([to, t]) => ({ to, t }));
const FT_COMPANY = cmsList("footer-company", pair([
  ["/about-us", "About Us"],
  ["/our-journey", "Our Journey"],
  ["/our-reach", "Our Reach"],
  ["/rates-reviews", "Our Rates & Reviews"],
  ["/our-team", "Our Team"],
  ["/government-opinion-research", "Government & Opinion Research"],
  ["/industries-case-studies", "Industries & Case Studies"],
  ["/privacy-data-protection", "Privacy & Research Ethics"],
  ["/esomar-37", "ESOMAR 37"],
  ["/connect", "Scan & Connect"],
  ["/gallery", "Gallery"],
  ["/blog", "Blog"],
  ["/careers", "Careers"],
]), "to");
const FT_START = cmsList("footer-start", pair([
  ["/downloads", "Downloads & panel books"],
  ["/lets-talk?type=quote", "Request a Quote"],
  ["/lets-talk?type=feasibility", "Request Research Feasibility"],
  ["/lets-talk?type=audience", "Request Audience Feasibility"],
  ["/lets-talk?type=demo", "Request a Sampledge Demo"],
  [OB82.client.url, "New client onboarding"],
  [OB82.vendor.url, "New vendor onboarding"],
]), "to");
const FT_LEGAL = cmsList("footer-legal", pair([
  ["/privacy-policy", "Privacy Policy"],
  ["/cookie-policy", "Cookie Policy"],
  ["/terms-conditions", "Terms & Conditions"],
  ["/data-protection", "Data Protection"],
  ["/research-ethics", "Research Ethics"],
]), "to");

/* build 74: the brochure band above the footer on service pages comes with the rest of the site (full.jsx) */
function FT_Band() {
  const loc = useLocation();
  const B = useFullPart("SV7_Band", /^\/services\//.test(loc.pathname || ""));
  return B ? <B /> : null;
}
function FR_Footer() {
  const verts = VERTICALS;
  const prods = PRODUCTS;
  const panels = PORTALS;
  const C = CONTACT;
  const wa = whatsappUrl();
  const [ref, v] = frkIn(0.05);
  return (
    <>
    <FT_Band />
    <footer ref={ref} className={"ft" + (v ? " is-in" : "")}>
      <div className="ft__bg" aria-hidden="true">
        <svg className="ft__net" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice">
          {Array.from({ length: 26 }, (_, i) => {
            const x = (i * 197) % 1200,
              y = (i * 113) % 600;
            const x2 = ((i + 3) * 197) % 1200,
              y2 = ((i + 3) * 113) % 600;
            return (
              <g key={i} style={{ "--i": i }}>
                <line x1={x} y1={y} x2={x2} y2={y2} />
                <circle cx={x} cy={y} r={i % 4 === 0 ? 3.2 : 1.8} />
              </g>
            );
          })}
        </svg>
        <i className="ft__aur ft__aur--1" />
        <i className="ft__aur ft__aur--2" />
      </div>
      <div className="container">
        <div className="ft-cta">
          <div className="ft-cta__t">
            <span className="ft-kick">One partner · four teams</span>
            <h2>
              Ready when you are. <em>Tell us what's next.</em>
            </h2>
          </div>
          <div className="ft-cta__worlds">
            {verts.map((t) => (
              <PpL key={t.slug} to={`/services/${t.slug}`} className="ft-world" style={frkVStyle(t.slug)}>
                <span>
                  <FRK_I n={frkV(t.slug).ic} s={18} />
                </span>
                {t.name}
                <FRK_I n="arrow" s={15} />
              </PpL>
            ))}
            <PpL to="/lets-talk" className="ft-world ft-world--talk">
              <span>
                <FRK_I n="chat" s={18} />
              </span>
              Let's talk
              <FRK_I n="arrow" s={15} />
            </PpL>
          </div>
        </div>

        <div className="ft-top">
          <div className="ft-brand">
            <PpL to="/" className="ft-brand__logo" aria-label="Frequent Research home">
              <span className="frl-headfull ft19-logo">
                  {cmsLogo("footer") ? <img className="cms-logo cms-logo--footer" src={cmsLogo("footer")} alt="Frequent Research" /> : <FRL_FR kind="full" rich dark />}
                </span>
            </PpL>
            <p className="ft-brand__line">{BRAND_LINE}</p>
            <p>Helping businesses understand better, build smarter, grow faster and manage with confidence.</p>
            <ul className="ft-contact">
              <li>
                <a href={`mailto:${C.email}`}>
                  <FRK_I n="mail" s={16} /> {C.email}
                </a>
              </li>
              <li>
                <a href={`tel:${C.phone.replace(/\s/g, "")}`}>
                  <FRK_I n="phone" s={16} /> {C.phone}
                </a>
              </li>
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <FRK_I n="whatsapp" s={16} /> WhatsApp Support
                </a>
              </li>
              <li>
                <span>
                  <FRK_I n="map" s={16} /> {C.address}
                </span>
              </li>
            </ul>
          </div>
          {verts.map((t) => (
            <nav key={t.slug} className="ft-col" style={frkVStyle(t.slug)} aria-label={t.name}>
              <h3>
                <PpL to={`/services/${t.slug}`}>
                  <i aria-hidden="true" />
                  {t.name}
                </PpL>
              </h3>
              <ul>
                {t.services.slice(0, 7).map((e) => (
                  <li key={e.slug}>
                    <PpL to={`/services/${t.slug}/${e.slug}`}>{e.name}</PpL>
                  </li>
                ))}
                {cmsMenuExtra("services:" + t.slug).map((e) => (
                  <li key={"x" + (e.to || e.href)}>
                    <PpL to={e.to || e.href}>{e.name || e.t || e.label}</PpL>
                  </li>
                ))}
                <li>
                  <PpL to={`/services/${t.slug}`} className="ft-more">
                    All {t.services.length} services <FRK_I n="arrow" s={13} />
                  </PpL>
                </li>
              </ul>
            </nav>
          ))}
        </div>

        <div className="ft-mid">
          <nav className="ft-col ft-col--plain" aria-label="Company">
            <h3>Company</h3>
            <ul>
              {FT_COMPANY.map(({ to, t }) => (
                <li key={to}>
                  {/^https?:/.test(to) ? (
                    <a className="ft-onb" href={to} target="_blank" rel="noopener">
                      {t}
                    </a>
                  ) : (
                    <PpL to={to}>{t}</PpL>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="ft-col ft-col--plain">
            <h3>Products</h3>
            <SX8_FootList />
            <h3 className="ft-sub">Research panels</h3>
            <div className="ft-panels">
              {panels.map((t) => (
                <PpL key={t.slug} to={`/portals/${t.slug}`} className="ft-panel" aria-label={t.name}>
                  <BR_Panel p={t} size="foot" src={panelLogo(t)} />
                </PpL>
              ))}
            </div>
          </div>
          <nav className="ft-col ft-col--plain" aria-label="Get started">
            <h3>Get started</h3>
            <ul>
              {FT_START.map(({ to, t }) => (
                <li key={to}>
                  <PpL to={to}>{t}</PpL>
                </li>
              ))}
            </ul>
            <button type="button" className="ft-rate" onClick={() => window.dispatchEvent(new CustomEvent("fr-open-review"))}>
              <FRK_I n="star" s={16} /> Rate &amp; review us
            </button>
          </nav>
          <div className="ft-col ft-col--plain ft-follow"><FRQ_Follow /></div>
        </div>

        <div className="ft-trust">
          <div>
            <h3>Certified &amp; accountable</h3>
            <p>Certified management systems for market research, quality and information security, and a corporate member of ESOMAR.</p>
          </div>
          <TrustBadges dark={true} withEsomar={true} />
        </div>

        {/* build 57: giant outlined wordmark; a gradient "ink" sweeps through the letters and a light beam scans across */}
        <div className="ft-mega" aria-hidden="true">
          <span className="ft-mega__outline">FrequentResearch</span>
          <span className="ft-mega__fill">FrequentResearch</span>
          <span className="ft-mega__beam" />
        </div>
        <div className="ft-bottom">
          <span>
            © {new Date().getFullYear()} {C.name}, a brand of {C.legalName}. All rights reserved.
          </span>
          <FRS_Toggle />
          <span className="ft-legal">
            {FT_LEGAL.map(({ to, t }) => (
              <PpL key={to} to={to}>
                {t}
              </PpL>
            ))}
          </span>
        </div>
      </div>
    </footer>
    </>
  );
}

export { FR_Footer };
