/* Build 65 update 8: new country page hero (animated, flag-graded) and the download at the bottom behind the form. */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { FRK_EMBLEM_SM } from '../components/site/FrKit.jsx';
import { FRG_Gate } from '../components/site/Gate.jsx';
import { PC5_I, PC5_KINDS, pc5FlagUrl, pc5Num, pc5Pct } from '../data/PanelCountries65.jsx';
import { PC5_Motto, pc5Scroll, pc5Top } from './PanelCountry65.jsx';

function PC8_Letters({ text, id }) {
  const words = String(text).split(" ");
  let k = 0;
  return (
    <HeroH1 id={id} className="pc8-name" aria-label={text}>
      {words.map((w, wi) => (
        <span key={wi} className="pc8-name__w" aria-hidden="true">
          {[...w].map((c) => {
            const i = k++;
            return <span key={i} className="pc8-name__c" style={{ "--i": i }}>{c}</span>;
          })}
        </span>
      ))}
    </HeroH1>
  );
}

function PC8_Orb({ iso, flags, name, chips }) {
  const src = flags && flags[iso] ? pc5FlagUrl(flags[iso]) : "";
  return (
    <div className="pc8-orb" role="img" aria-label={"Flag of " + name}>
      <span className="pc8-orb__glow" aria-hidden="true" />
      <span className="pc8-orb__ring pc8-orb__ring--a" aria-hidden="true"><i /></span>
      <span className="pc8-orb__ring pc8-orb__ring--b" aria-hidden="true"><i /></span>
      <span className="pc8-orb__ball" aria-hidden="true">
        <span className="pc8-orb__flag" style={{ backgroundImage: src ? `url("${src}")` : "none" }} />
        <span className="pc8-orb__flag pc8-orb__flag--2" style={{ backgroundImage: src ? `url("${src}")` : "none" }} />
        <span className="pc8-orb__lat" />
        <span className="pc8-orb__shade" />
      </span>
      <img className="pc8-orb__mark" src={FRK_EMBLEM_SM} alt="" width="54" height="54" aria-hidden="true" />
      {chips.map((c, i) => (
        <span key={i} className={"pc8-chip pc8-chip--" + i}>
          <b>{c[0]}</b>
          <small>{c[1]}</small>
        </span>
      ))}
    </div>
  );
}

function PC8_Ticker({ tables }) {
  const items = tables
    .slice(0, 14)
    .map((x) => {
      const top = pc5Top(x.rows);
      return top ? [x.t, top[0], top[1], top[2]] : null;
    })
    .filter(Boolean);
  if (items.length < 3) return null;
  const row = (dup) =>
    items.map((x, i) => (
      <li key={(dup ? "d" : "") + i} aria-hidden={dup ? "true" : undefined}>
        <small>{x[0]}</small>
        <b>{x[1]}</b>
        <span>
          {pc5Pct(x[2])}
          {typeof x[3] === "number" ? " · " + pc5Num(x[3]) : ""}
        </span>
      </li>
    ));
  return (
    <div className="pc8-tick" aria-label="Largest group in each profile">
      <ul className="pc8-tick__row">
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}

function PC8_Hero({ kind, entry, meta, flags, tables, onGet }) {
  const K = PC5_KINDS[kind];
  const sub = kind === "b2b" ? "Business decision makers" : kind === "hc" ? "Healthcare professionals, caregivers & patients" : "Real consumers";
  const words =
    kind === "b2b"
      ? ["by company size.", "by revenue in " + (meta.cur ? meta.cur[0] : "local currency") + ".", "by sector.", "by department.", "by job title."]
      : kind === "hc"
      ? ["as healthcare professionals.", "as caregivers.", "as patients.", "by specialty and setting."]
      : ["by age and gender.", "by income in " + (meta.cur ? meta.cur[0] : "local currency") + ".", "by where they live.", "by what they buy.", "by what they love."];
  const chips = [
    [entry.panel ? pc5Num(entry.panel) : "Soon", kind === "hc" ? "healthcare members" : "profiled " + K.who],
    [kind === "hc" ? entry.segN || 3 : tables.length || "—", kind === "hc" ? "healthcare panels" : "profile tables"],
    [meta.cur ? meta.cur[1] : "¤", meta.cur ? meta.cur[2] : "local currency"],
  ];
  return (
    <section className="pc8-hero" aria-labelledby="pc5-h1">
      <div className="pc8-hero__bg" aria-hidden="true">
        <i className="pc8-band pc8-band--a" />
        <i className="pc8-band pc8-band--b" />
        <i className="pc8-band pc8-band--c" />
        <span className="pc8-hero__grid" />
      </div>
      <div className="container pc8-hero__in">
        <div className="pc8-hero__copy">
          <nav className="pc5-crumbs pc8-crumbs" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink>
            <HmLink to="/downloads">Downloads</HmLink>
            <HmLink to={"/downloads/" + K.sec}>{K.t} books</HmLink>
            <span aria-current="page">{entry.name}</span>
          </nav>
          <span className="pc8-kick">
            <PC5_I n={K.icon} s={14} /> {K.t} · {entry.region}
          </span>
          <PC8_Letters id="pc5-h1" text={entry.name} />
          <p className="pc8-sub">{sub} of {entry.name}, profiled by Frequent Research.</p>
          <PC5_Motto words={words} />
          <ul className="pc8-facts">
            {meta.cap ? (
              <li><PC5_I n="landmark" s={16} /><span><small>Capital</small>{meta.cap}</span></li>
            ) : null}
            {meta.cur ? (
              <li><span className="pc8-facts__sym" aria-hidden="true">{meta.cur[1]}</span><span><small>Currency</small>{meta.cur[2]} ({meta.cur[0]})</span></li>
            ) : null}
            {meta.lang ? (
              <li><PC5_I n="lang" s={16} /><span><small>Languages</small>{meta.lang}</span></li>
            ) : null}
          </ul>
          <div className="pc8-cta">
            <a className="pc8-btn pc8-btn--solid" href="#pc5-tour" onClick={(e) => (e.preventDefault(), pc5Scroll(document.getElementById("pc5-tour") ? "pc5-tour" : "pc5-get"))}>
              Explore the panel <PC5_I n="arrow" s={16} />
            </a>
            <button type="button" className="pc8-btn pc8-btn--ghost" onClick={onGet}>
              <PC5_I n="down" s={16} /> Get the panel book
            </button>
          </div>
        </div>
        <PC8_Orb iso={entry.iso} flags={flags} name={entry.name} chips={chips} />
      </div>
      <PC8_Ticker tables={tables} />
    </section>
  );
}

/* bottom: book summary on the left, the form on the right; the PDF opens only after the form, every time */
function PC8_Get({ kind, entry, flags, meta, label, seg, segs, setSeg, spec, world }) {
  const [n, setN] = ee.useState(0);
  return (
    <section className="pc8-get" id="pc5-get" aria-labelledby="pc8-get-h">
      <div className="pc8-get__bg" aria-hidden="true" />
      <div className="container">
        <div className="pc8-get__head">
          <span className="pc5-eb"><PC5_I n="down" s={14} /> Panel book PDF</span>
          <h2 id="pc8-get-h" className="pc5-h2">Get the {entry.name} {label}</h2>
          <p>
            Every table on this page in one PDF graded in the {entry.name} flag colours, with percentages and whole numbers, charts and the panel size.
            Fill in your details below and it opens in your browser. The form is asked for every download.
          </p>
          {kind === "hc" && segs ? (
            <div className="pc5-get__segs pc8-get__segs" role="group" aria-label="Choose the panel book">
              {segs.map((x, i) => (
                <button key={x.k} type="button" aria-pressed={x.k === seg.k} className={x.k === seg.k ? "is-on" : ""} onClick={() => setSeg(i)}>
                  <PC5_I n={x.ic} s={15} /> {x.t}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        {spec ? (
          <FRG_Gate
            key={spec.key + "|" + n}
            inline
            world={world}
            kind={spec.kind}
            title={spec.title}
            sub={entry.region}
            flag={entry.iso}
            icon={kind === "b2b" ? "building" : kind === "hc" ? "heart" : "users"}
            resource={{ type: "panel-book", key: spec.key, title: spec.title }}
            extra={{ doc: spec.key }}
            onUnlock={spec.run}
            onClose={() => setN((v) => v + 1)}
          />
        ) : (
          <div className="pc5-loadbox" aria-busy="true"><i /><i /><i /></div>
        )}
      </div>
    </section>
  );
}

export { PC8_Get, PC8_Hero };
