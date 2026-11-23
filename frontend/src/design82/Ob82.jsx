/*
 * Build 82.3 (Kunal, 12 Nov): links to the two onboarding forms, so a new client or a new vendor can find them and
 * fill in their details (second pass: HD 3D art on each card, colourful heading). Two animated cards (client: royal/violet, vendor: teal/gold), each with the steps of its
 * form lighting up in turn, the time it takes, "secure" and a button that opens the portal in a new tab.
 * Shown on the home page (before the blog), on Let's Talk and on Scan & Connect, and as two footer links.
 * The addresses can be changed in the super admin (data key "onboarding-links"). Styles: x82.css (.ob82*).
 */
import * as ee from 'react';
import { RC_I, RC_useInView } from '../app/shared/Reveal.jsx';
import { cmsData } from '../app/cms.jsx';

const OB82_DEF = {
  client: {
    show: true, // build 82.9: No = the client card and footer link disappear from the whole website
    url: "https://newclient.frequentresearch.com",
    kicker: "New client",
    title: "Start your client onboarding",
    text: "Share your company, billing and contact details once, upload your KYC documents and sign your service agreement online.",
    button: "Start client onboarding",
    time: "About 10 minutes",
    steps: ["Company", "Address & Tax", "Contacts", "Commercial", "Documents", "Review & Terms", "Sign Agreement"],
  },
  vendor: {
    show: true, // build 82.9: No = the vendor card and footer link disappear from the whole website
    url: "https://vendors.frequentresearch.com",
    kicker: "New vendor or partner",
    title: "Register as a vendor",
    text: "Tell us what you provide and where, add your tax, bank and capability details, and sign your vendor agreement online.",
    button: "Start vendor registration",
    time: "About 12 minutes",
    steps: ["Profile", "Capabilities", "Address & Tax", "Contacts", "Bank & Payment", "Documents", "Review & Terms", "Sign Agreement"],
  },
};
const OB82 = cmsData("onboarding-links", OB82_DEF);
// build 82.9 (Kunal, 21 Nov): each form can be taken off the whole website in the super admin (show: No)
const ob82On = (k) => !!(OB82[k] && OB82[k].show !== false && OB82[k].url);
const ob82Host = (u) => {
  try {
    return new URL(u).host;
  } catch (e) {
    return u;
  }
};

function OB82_Card({ kind, d, run }) {
  const st = Array.isArray(d.steps) ? d.steps : [];
  return (
    <article className={"ob82-card ob82-card--" + kind}>
      <span className="ob82-card__glow" aria-hidden="true" />
      <span className="ob82-card__ring" aria-hidden="true" />
      <img className="ob82-card__art" src={kind === "client" ? "__IMG:d82/client__" : "__IMG:d82/vendor__"} alt="" width="220" height="220" loading="lazy" decoding="async" />
      <div className="ob82-card__top">
        <span className="ob82-card__ic" aria-hidden="true">
          <RC_I n={kind === "client" ? "users" : "box"} s={26} />
        </span>
        <span className="ob82-card__k">{d.kicker}</span>
      </div>
      <h3>{d.title}</h3>
      <p>{d.text}</p>
      <ol className={"ob82-steps" + (run ? " is-run" : "")} style={{ "--n": st.length }} aria-label={st.length + " steps"}>
        {st.map((s, i) => (
          <li key={s} style={{ "--i": i }}>
            <b>{i + 1}</b>
            <span>{s}</span>
          </li>
        ))}
      </ol>
      <ul className="ob82-facts">
        <li>
          <RC_I n="clock" s={14} />
          {d.time}
        </li>
        <li>
          <RC_I n="shield" s={14} />
          Secure &amp; encrypted
        </li>
        <li>
          <RC_I n="file" s={14} />
          Agreement signed online
        </li>
      </ul>
      <a className="ob82-btn" href={d.url} target="_blank" rel="noopener">
        <span>{d.button}</span>
        <RC_I n="arrow" s={18} />
        <span className="ob82-sr"> (opens in a new tab)</span>
      </a>
      <small className="ob82-card__host">{ob82Host(d.url)}</small>
    </article>
  );
}

function OB82_Section({ id = "onboarding", tight }) {
  const [ref, v] = RC_useInView(0.15);
  const kinds = ["client", "vendor"].filter(ob82On);
  if (!kinds.length) return null;
  return (
    <section ref={ref} id={id} className={"ob82" + (v ? " is-in" : "") + (tight ? " ob82--tight" : "")} aria-labelledby={id + "-h"}>
      <div className="ob82__bg" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container ob82__in">
        <div className="ob82__head">
          <span className="ob82__k">
            <RC_I n="rocket" s={15} />
            Working with us for the first time?
          </span>
          <h2 id={id + "-h"}>
            Start working with <span className="ob82__grad">Frequent Research</span>
          </h2>
          <p>
            {kinds.length === 2 ? "New clients and new vendors complete" : kinds[0] === "client" ? "New clients complete" : "New vendors complete"} their details in one secure online form. It takes a few minutes, and our
            team picks it up straight away.
          </p>
        </div>
        <div className="ob82__grid" style={kinds.length === 1 ? { gridTemplateColumns: "minmax(0,1fr)", maxWidth: 640, marginInline: "auto" } : undefined}>
          {kinds.map((k) => (
            <OB82_Card key={k} kind={k} d={OB82[k]} run={v} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { OB82, OB82_DEF, OB82_Section, ob82On };
