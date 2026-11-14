/*
 * Build 82.3 (Kunal, 12 Nov): "Independent standards behind every project" redesigned. The three ISO certificates
 * and the two memberships orbit a glowing shield (they stay upright while the ring turns); a spotlight card on the
 * left turns through them on its own (5 s each, progress bar), and the matching badge on the ring lights up with a
 * gold halo. Pointer on the section pauses it; any chip or badge can be picked. Third pass (Kunal 13 Nov: "all logos
 * moving"): faster orbit and every badge bobs (the sliding logo ribbon was removed again at his request). Styles: x82.css (.c82*).
 */
import * as ee from 'react';
import { RC_I, RC_useInView } from '../app/shared/Reveal.jsx';
import { CERTIFICATIONS } from '../app/data/products.jsx';
import { ASSOCIATIONS, BR_IMG } from '../app/shared/Brand.jsx';
import { useAuto82 } from './auto82.jsx';

const C82_DESC = {
  "ISO 20252:2019": "The international standard for how research is planned, fielded, processed and reported.",
  "ISO 9001:2015": "Documented, audited processes that keep quality consistent across every service.",
  "ISO/IEC 27001:2013": "Information-security controls that protect client, respondent and project data.",
};
const C82_SHORT = {
  "ISO 20252:2019": "Market, Opinion & Social Research",
  "ISO 9001:2015": "Quality Management",
  "ISO/IEC 27001:2013": "Information Security Management",
};
const C82_IC = ["layers", "check", "shield", "globe", "award"];

function c82Items() {
  const certs = CERTIFICATIONS.map((c) => ({
    k: c.code,
    kind: "Certified",
    code: c.code,
    t: C82_SHORT[c.code] || c.title,
    d: C82_DESC[c.code] || "",
    art: <img src={c.logo || (c.file && !String(c.file).startsWith("/badges/") ? c.file : "") || BR_IMG[c.code.includes("27001") ? "iso-27001" : c.code.includes("20252") ? "iso-20252" : "iso-9001"]} alt="" width="96" height="96" />,
  }));
  const assoc = ASSOCIATIONS.map((a) => ({
    k: a.id,
    kind: "Member",
    code: a.id === "esomar" ? "ESOMAR member" : a.id === "msme" ? "MSME registered" : a.name,
    t: a.id === "esomar" ? "Global research association" : a.id === "msme" ? "Micro, Small & Medium Enterprise" : a.name,
    d: a.text || "",
    art: <img src={a.logo || BR_IMG[a.id]} alt="" width="130" height="62" />,
    wide: true,
  }));
  return certs.concat(assoc);
}

function CA82_Section() {
  const [ref, v] = RC_useInView(0.2);
  const items = c82Items();
  const n = items.length;
  const [k, setK] = ee.useState(0);
  const auto = useAuto82(n, k, setK, v, 5000);
  const it = items[k] || items[0];
  return (
    <section ref={ref} className={"c82" + (v ? " is-in" : "")} aria-labelledby="ca-title">
      <div className="c82__bg" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container c82__in">
        <div className="c82__copy">
          <span className="c82__k">
            <RC_I n="shield" s={15} />
            Certified & accountable
          </span>
          <h2 id="ca-title">Independent standards behind every project</h2>
          <p className="c82__lede">
            Our quality, research and information-security processes are certified and audited, and we are a corporate
            member of the global research association.
          </p>
          <div className="c82-spot" key={it.k} aria-live="polite">
            <span className={"c82-spot__ok" + (it.kind === "Member" ? " is-mem" : "")}>
              <RC_I n={it.kind === "Member" ? "globe" : "check"} s={13} />
              {it.kind}
            </span>
            <strong className="c82-spot__code">{it.code}</strong>
            <span className="c82-spot__t">{it.t}</span>
            <p>{it.d}</p>
            {auto.run ? <i className="c82-spot__bar" key={"b" + k} style={{ "--ms": auto.ms + "ms" }} aria-hidden="true" /> : null}
          </div>
          <div className="c82-chips" role="tablist" aria-label="Certificates and memberships" {...auto.bind}>
            {items.map((x, j) => (
              <button key={x.k} type="button" role="tab" aria-selected={j === k} className={"c82-chip" + (j === k ? " is-on" : "")} onClick={() => setK(j)}>
                <RC_I n={C82_IC[j] || "award"} s={14} />
                {x.code}
              </button>
            ))}
          </div>
        </div>
        <div className="c82-orbit" style={{ "--n": n }} aria-hidden="true" {...{ inert: "" }}>
          <span className="c82-orbit__ring" />
          <span className="c82-orbit__ring c82-orbit__ring--2" />
          <div className="c82-core">
            <span className="c82-core__glow" />
            <svg viewBox="0 0 64 72" className="c82-core__shield">
              <defs>
                <linearGradient id="c82sh" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFE7A3" />
                  <stop offset=".55" stopColor="#F2C45A" />
                  <stop offset="1" stopColor="#C98A1E" />
                </linearGradient>
              </defs>
              <path d="M32 2 60 12v22c0 18-12 30-28 36C16 64 4 52 4 34V12z" fill="url(#c82sh)" />
              <path d="m20 36 8 8 17-18" fill="none" stroke="#3a2502" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <b>Certified</b>
            <small>&amp; audited</small>
          </div>
          <div className="c82-orbit__spin">
            {items.map((x, j) => (
              <div key={x.k} className="c82-sat" style={{ "--a": (360 / n) * j + "deg" }}>
                <div className="c82-sat__up">
                  <div className={"c82-sat__b" + (j === k ? " is-on" : "") + (x.wide ? " is-wide" : "")}>{x.art}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { CA82_Section };
