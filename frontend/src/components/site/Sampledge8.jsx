/*
 * Sampledge products — build 65 update 8. Prefix SX8_ / sx8. Styles: src/styles/sampledge8.css (class prefix sx8-).
 *
 * Kunal's brief (2026-10-31): the seven Sampledge products are shown as equals, each with its own logo, never on a white
 * box and never as the old "Sampledge — Project Management Tool" / "Sampledge — DIY Marketplace" pair (SampTrek and
 * SampAudience replaced them).
 *   SX8_Menu    Products mega-menu: seven equal tiles (logo mark, name, category, tagline) on a dark glass panel.
 *   SX8_Home    home section that replaces "Technology built for research": a product switcher modelled on the
 *               "Join our research panels" switcher — one tab per product (with a soft sound), and per product its own
 *               animated scene, story, problems it fixes, workflow, outcomes and the products it works with.
 *   SX8_Scene   the seven scenes (survey builder, bid board, project timeline, audience radar, sales pipeline, ledger,
 *               people hub). CSS-only loops on transform/opacity; paused off screen by Perf65 and for reduced motion.
 * Content: PR5_LIST / PR5_X (Sampledge65.jsx) and PR5_D (SampledgeDetails65.jsx, from the Sampledge website build).
 */
import { useAuto82, A82Bar } from '../../design82/auto82.jsx';
import { ScMark } from '../../design83/sampconnect/ScMark.jsx';
import { ScSpot } from '../../design83/sampconnect/ScSpot.jsx';
import * as ee from 'react';
import { PpL } from '../dm/shared.jsx';
import { FRK_I, FRK_SamLogo, frkIn } from './FrKit.jsx';
import { PR5_LIST, PR5_SITE } from '../../data/Sampledge65.jsx';
import { PR5_D } from '../../data/SampledgeDetails65.jsx';
import { frsPlay } from './Floaters.jsx';
import { PR5_Logo } from './PR5Logo.jsx';

const sx8List = () => PR5_LIST;
const sx8D = (id) => PR5_D[id] || {};
const sx8Vars = (p) => ({ "--p1": p.c1, "--p2": p.c2, "--p3": p.c3 || p.c1 });
const sx8Tick = () => {
  try {
    frsPlay("tab");
  } catch (e) {}
};
/* "Every RFQ answered on time." -> ["Every RFQ answered", "on time."] so the end of the line can carry the gradient */
function sx8Split(t) {
  const w = String(t || "").split(" ");
  const k = Math.max(1, w.length - 2);
  return [w.slice(0, k).join(" "), w.slice(k).join(" ")];
}
const SX8_IC = { sampcode: "spark", sampbidx: "file", samptrek: "layers", sampaudience: "target", sampforce: "bars", talk2tax: "coin", sampcrew: "users" };

/* ---------- menu ---------- */
function SX8_Menu() {
  /* update 10: a lit Sampledge panel on the left (the seven marks circling the core) + seven equal product cards */
  const L = sx8List();
  return (
    <div className="sx8-menu sx9-menu">
      <div className="sx9-feat">
        <span className="sx9-feat__aura" aria-hidden="true" />
        <span className="sx8-menu__k">
          <FRK_I n="layers" s={14} /> Sampledge · {L.length} products
        </span>
        <div className="sx9-orb" aria-hidden="true">
          <span className="sx9-orb__ring">
            {L.map((p, i) => (
              <span key={p.id} className="sx9-orb__it" style={{ ...sx8Vars(p), "--i": i, "--n": L.length }}>
                <span>
                  <PR5_Logo p={p} v="mark" still />
                </span>
              </span>
            ))}
          </span>
          <span className="sx9-orb__core">
            <FRK_SamLogo h={30} word={false} tone="dark" />
          </span>
        </div>
        <strong className="sx9-feat__t">
          One ecosystem. <em>Seven ways to work smarter.</em>
        </strong>
        <PpL to="/products" className="sx9-feat__cta">
          Compare all products <FRK_I n="arrow" s={14} />
        </PpL>
      </div>
      <ul className="sx9-grid">
        {L.map((p, i) => (
          <li key={p.id} style={{ ...sx8Vars(p), "--i": i }}>
            <PpL to={"/products/" + p.id} className="sx9-pc">
              <span className="sx9-pc__tile" aria-hidden="true">
                <PR5_Logo p={p} v="mark" still />
              </span>
              <span className="sx9-pc__txt">
                <b>{p.short}</b>
                <small>{p.cat}</small>
                <em>{p.tag}</em>
              </span>
              <span className="sx9-pc__go" aria-hidden="true">
                <FRK_I n="arrow" s={14} />
              </span>
            </PpL>
          </li>
        ))}
        <li style={{ "--i": L.length }} className="sx9-grid__more sx9-grid__sc">
          <PpL to="/products/sampconnect" className="sx9-pc sx9-pc--more sx9-pc--sc">
            <span className="sx9-pc__tile" aria-hidden="true">
              <ScMark s={26} />
            </span>
            <span className="sx9-pc__txt">
              <b>SampConnect <i className="sx9-new">New</i></b>
              <small>Private workspace for research teams</small>
              <em>Chat, video, AI and approvals on your own servers.</em>
            </span>
            <span className="sx9-pc__go" aria-hidden="true">
              <FRK_I n="arrow" s={14} />
            </span>
          </PpL>
        </li>
      </ul>
    </div>
  );
}

/* ---------- scenes ---------- */
function SX8_Zapx() {
  return (
    <div className="sx8-sc sx8-sc--sampcode">
      <div className="sx8z-doc">
        <small>Questionnaire.docx</small>
        {["Q1  Which brand do you use most?", "Q2  Rate each attribute", "Q3  How likely to recommend?", "IF Q1 = None → skip to Q5"].map((t, i) => (
          <span key={i} className={i === 3 ? "is-logic" : ""} style={{ "--i": i }}>
            {t}
          </span>
        ))}
      </div>
      <span className="sx8z-bolt" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M13 2 4 14h7l-1 8 9-12h-7z" />
        </svg>
      </span>
      <div className="sx8z-phone">
        <span className="sx8z-phone__bar">
          <i className="sx8-live" /> Live · Q3 / 12
        </span>
        <b>How likely are you to recommend us?</b>
        <span className="sx8z-scale">
          {Array.from({ length: 11 }, (_, n) => (
            <i key={n} style={{ "--n": n }}>
              {n}
            </i>
          ))}
        </span>
        <span className="sx8z-opts">
          {["Very likely", "Somewhat likely", "Not sure"].map((t, i) => (
            <i key={t} style={{ "--i": i }}>
              {t}
            </i>
          ))}
        </span>
        <span className="sx8z-prog">
          <i />
        </span>
      </div>
      <span className="sx8-chip sx8-chip--ok sx8z-ok">
        <FRK_I n="check" s={12} sw={3} /> Logic OK
      </span>
      <span className="sx8-chip sx8z-lang">EN · FR · DE · हिं</span>
    </div>
  );
}
function SX8_Bidzo() {
  const cols = ["RFQ in", "Feasibility", "Proposal", "Won"];
  return (
    <div className="sx8-sc sx8-sc--sampbidx">
      <div className="sx8b-board">
        {cols.map((c, i) => (
          <div key={c} className="sx8b-col" style={{ "--i": i }}>
            <small>{c}</small>
            <i />
            <i />
          </div>
        ))}
        <span className="sx8b-card">
          <b>RFQ #204</b>
          <small>B2B · 6 markets · n=1,200</small>
        </span>
      </div>
      <span className="sx8b-env" aria-hidden="true">
        <FRK_I n="mail" s={22} />
      </span>
      <span className="sx8-chip sx8b-due">
        <FRK_I n="clock" s={12} /> Due Friday
      </span>
      <span className="sx8b-stamp">WON</span>
      <div className="sx8b-cost">
        <span>
          Cost <b>₹ 4.2L</b>
        </span>
        <span>
          Margin <b>32%</b>
        </span>
      </div>
    </div>
  );
}
function SX8_Projexa() {
  const rows = [
    ["Setup", 0, 22],
    ["Soft launch", 18, 16],
    ["Fieldwork", 30, 46],
    ["Validate", 66, 18],
    ["Report", 80, 18],
  ];
  return (
    <div className="sx8-sc sx8-sc--samptrek">
      <div className="sx8p-gantt">
        <small>Project · Brand tracker W3</small>
        {rows.map(([t, x, w], i) => (
          <span key={t} className="sx8p-row" style={{ "--i": i }}>
            <em>{t}</em>
            <span className="sx8p-lane">
              <i style={{ left: x + "%", width: w + "%" }} />
            </span>
          </span>
        ))}
        <span className="sx8p-now" />
      </div>
      <div className="sx8p-quotas">
        {[
          ["Quota", 82],
          ["IR", 34],
          ["LOI", 12],
        ].map(([t, v], i) => (
          <span key={t} className="sx8p-q" style={{ "--i": i }}>
            <span className="sx8p-q__ring">
              <i />
            </span>
            <b>{t === "LOI" ? v + "m" : v + "%"}</b>
            <small>{t}</small>
          </span>
        ))}
      </div>
      <span className="sx8-chip sx8-chip--ok sx8p-ok">
        <FRK_I n="check" s={12} sw={3} /> Reconciled
      </span>
    </div>
  );
}
function SX8_Sampleon() {
  const dots = [
    [24, 30],
    [70, 22],
    [62, 70],
    [30, 66],
    [48, 40],
    [80, 50],
    [18, 48],
    [52, 84],
  ];
  return (
    <div className="sx8-sc sx8-sc--sampaudience">
      <div className="sx8s-radar">
        <i className="sx8s-ring sx8s-ring--a" />
        <i className="sx8s-ring sx8s-ring--b" />
        <i className="sx8s-sweep" />
        {dots.map(([x, y], i) => (
          <span key={i} className="sx8s-dot" style={{ left: x + "%", top: y + "%", "--i": i }}>
            <FRK_I n="user" s={11} />
          </span>
        ))}
      </div>
      <div className="sx8s-filters">
        {["Country · 3", "B2B · IT decision-makers", "Company size 250+", "LOI 12 min"].map((t, i) => (
          <span key={t} style={{ "--i": i }}>
            {t}
          </span>
        ))}
      </div>
      <span className="sx8s-ticket">
        <FRK_I n="check" s={13} sw={3} /> Feasibility requested
      </span>
    </div>
  );
}
function SX8_Dealflow() {
  const st = ["Lead", "Qualified", "Proposal", "Won"];
  return (
    <div className="sx8-sc sx8-sc--sampforce">
      <div className="sx8d-pipe">
        {st.map((t, i) => (
          <span key={t} className="sx8d-st" style={{ "--i": i }}>
            <small>{t}</small>
          </span>
        ))}
        {[0, 1, 2].map((i) => (
          <span key={i} className="sx8d-deal" style={{ "--i": i }}>
            <i />
          </span>
        ))}
      </div>
      <div className="sx8d-chart">
        {[38, 52, 46, 64, 72, 88].map((h, i) => (
          <i key={i} style={{ "--h": h / 100, "--i": i }} />
        ))}
        <small>Forecast · this quarter</small>
      </div>
      <span className="sx8-chip sx8d-score">Lead score 86</span>
      <span className="sx8-chip sx8-chip--ok sx8d-won">
        <FRK_I n="check" s={12} sw={3} /> Deal won
      </span>
    </div>
  );
}
function SX8_Talk2tax() {
  return (
    <div className="sx8-sc sx8-sc--talk2tax">
      <div className="sx8t-inv">
        <div className="sx8t-inv__paper">
          <b>INVOICE · INV-0042</b>
          {["Research services", "Panel incentives", "GST 18%"].map((t, i) => (
            <span key={t} style={{ "--i": i }}>
              {t}
              <i />
            </span>
          ))}
          <strong>Total paid</strong>
        </div>
      </div>
      <div className="sx8t-scale" aria-hidden="true">
        <span className="sx8t-scale__post" />
        <span className="sx8t-scale__arm">
          <i className="sx8t-pan sx8t-pan--l" />
          <i className="sx8t-pan sx8t-pan--r" />
        </span>
      </div>
      <span className="sx8t-coin">₹</span>
      <span className="sx8-chip sx8-chip--ok sx8t-ok">
        <FRK_I n="check" s={12} sw={3} /> Reconciled
      </span>
      <span className="sx8-chip sx8t-gst">GST · TDS on track</span>
    </div>
  );
}
function SX8_Crew() {
  return (
    <div className="sx8-sc sx8-sc--sampcrew">
      <div className="sx8c-org">
        <span className="sx8c-av sx8c-av--top" style={{ "--i": 0 }}>
          <FRK_I n="user" s={16} />
        </span>
        <span className="sx8c-lines" />
        {[1, 2, 3].map((i) => (
          <span key={i} className={"sx8c-av sx8c-av--" + i} style={{ "--i": i }}>
            <FRK_I n="user" s={14} />
          </span>
        ))}
      </div>
      <div className="sx8c-cal">
        <small>Leave · November</small>
        <span className="sx8c-cal__g">
          {Array.from({ length: 21 }, (_, i) => (
            <i key={i} className={[4, 11, 12, 17].includes(i) ? "is-off" : ""} style={{ "--i": i }} />
          ))}
        </span>
      </div>
      <span className="sx8c-clock" aria-hidden="true">
        <i />
      </span>
      <span className="sx8-chip sx8-chip--ok sx8c-ok">
        <FRK_I n="check" s={12} sw={3} /> Leave approved
      </span>
      <span className="sx8-chip sx8c-in">09:02 · checked in</span>
    </div>
  );
}
function SX8_Scene({ id }) {
  const S = { sampcode: SX8_Zapx, sampbidx: SX8_Bidzo, samptrek: SX8_Projexa, sampaudience: SX8_Sampleon, sampforce: SX8_Dealflow, talk2tax: SX8_Talk2tax, sampcrew: SX8_Crew }[id];
  return S ? <S /> : null;
}

/* ---------- home switcher ---------- */
function SX8_Home() {
  const L = sx8List();
  const [k, setK] = ee.useState(0);
  const [ref, inV] = frkIn(0.12);
  const tabs = ee.useRef([]);
  /* build 82.3: turns to the next product on its own */
  const auto = useAuto82(L.length, k, setK, inV, 6500);
  if (!L.length) return null;
  const p = L[k];
  const D = sx8D(p.id);
  const pick = (i) => {
    if (i === k) return;
    setK(i);
    sx8Tick();
  };
  const onKey = (e) => {
    const map = { ArrowRight: 1, ArrowLeft: -1 };
    let i = null;
    if (e.key in map) i = (k + map[e.key] + L.length) % L.length;
    else if (e.key === "Home") i = 0;
    else if (e.key === "End") i = L.length - 1;
    if (i == null) return;
    e.preventDefault();
    pick(i);
    tabs.current[i] && tabs.current[i].focus();
  };
  const [h1, h2] = sx8Split(p.tag || p.head);
  const by = (id) => L.find((x) => x.id === id);
  return (
    <section ref={ref} className={"sx8" + (inV ? " is-in" : "")} style={sx8Vars(p)} aria-labelledby="sx8-h">
      <div className="sx8__bg" aria-hidden="true">
        <i />
        <i />
        <span className="sx8__grid" />
      </div>
      <div className="container">
        <header className="sx8__head">
          <span className="sx8__kick">
            <i className="sx8-live" /> Built in-house by Sampledge
          </span>
          <h2 id="sx8-h">
            Seven products. <em>One connected ecosystem.</em>
          </h2>
          <p>Survey programming, bidding, research projects, sample, sales, finance and HR: each product built for one job, all designed to work together.</p>
        </header>
        <div className="sx8-tabs" role="tablist" aria-label="Sampledge products" onKeyDown={onKey} style={{ "--n": L.length, "--i": k }} {...auto.bind}>
          <span className="sx8-tabs__pill" aria-hidden="true" />
          {L.map((q, i) => (
            <button
              key={q.id}
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={"sx8-tab-" + q.id}
              aria-selected={i === k}
              aria-controls="sx8-panel"
              tabIndex={i === k ? 0 : -1}
              className={i === k ? "is-on" : ""}
              style={sx8Vars(q)}
              onClick={() => pick(i)}
            >
              <span className="sx8-tabs__mk" aria-hidden="true">
                <PR5_Logo p={q} v="mark" still />
              </span>
              <span className="sx8-tabs__t">{q.short}</span>
              {i === k ? <A82Bar run={auto.run} ms={auto.ms} k={k} /> : null}
            </button>
          ))}
        </div>
        <div className="sx8__stage" key={p.id} role="tabpanel" id="sx8-panel" aria-labelledby={"sx8-tab-" + p.id}>
          <div className="sx8__copy">
            <span className="sx8__logo">
              <PR5_Logo p={p} tone="dark" h={54} />
            </span>
            <span className="sx8__cat">
              <FRK_I n={SX8_IC[p.id] || "layers"} s={13} /> {p.cat}
            </span>
            <h3>
              {h1} <em>{h2}</em>
            </h3>
            <p className="sx8__story">{D.story || p.pos}</p>
            {D.pains && D.pains.length > 0 && (
              <span className="sx8-fix__h">What it fixes</span>
            )}
            {D.pains && D.pains.length > 0 && (
              <ul className="sx8-fix" aria-label="Problems it solves">
                {D.pains.slice(0, 3).map(([pain], i) => (
                  <li key={pain} style={{ "--i": i }}>
                    <span className="sx8-fix__x" aria-hidden="true">
                      <FRK_I n="arrow" s={11} sw={2.6} />
                    </span>
                    {pain}
                  </li>
                ))}
              </ul>
            )}
            <ol className="sx8-flow" aria-label="How it works">
              {(p.flow || []).map((f, i) => (
                <li key={f} style={{ "--i": i }}>
                  <b>{i + 1}</b>
                  {f}
                </li>
              ))}
            </ol>
            <div className="sx8__ctas">
              <PpL to={"/products/" + p.id} className="sx8-btn sx8-btn--solid">
                Explore {p.short} <FRK_I n="arrow" s={16} />
              </PpL>
              <a className="sx8-btn sx8-btn--glass" href={p.site || PR5_SITE} target="_blank" rel="noopener noreferrer">
                Visit on sampledge.com <span className="frk-sr">(opens in a new tab)</span>
              </a>
            </div>
          </div>
          <div className="sx8__vis">
            <div className="sx8-screen" aria-hidden="true">
              <span className="sx8-screen__bar">
                <i />
                <i />
                <i />
                <em>{p.short.toLowerCase()}.sampledge.com</em>
              </span>
              <SX8_Scene id={p.id} />
            </div>
            {D.outs && D.outs.length > 0 && (
              <ul className="sx8-outs">
                {D.outs.slice(0, 3).map(([t, d], i) => (
                  <li key={t} style={{ "--i": i }} title={d}>
                    <FRK_I n={["rocket", "shield", "bars"][i]} s={15} />
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {D.links && D.links.length > 0 && (
          <div className="sx8-links">
            <span>Works with</span>
            {D.links.map(([id, how]) => {
              const q = by(id);
              if (!q) return null;
              return (
                <button key={id} type="button" className="sx8-links__it" style={sx8Vars(q)} title={how} onClick={() => pick(L.indexOf(q))}>
                  <PR5_Logo p={q} v="mark" still />
                  {q.short}
                </button>
              );
            })}
          </div>
        )}
        <ScSpot />
      </div>
    </section>
  );
}

/* ---------- footer list ---------- */
function SX8_FootList() {
  return (
    <ul className="ft-prods sx8-ft">
      {sx8List().map((p) => (
        <li key={p.id} style={sx8Vars(p)}>
          <PpL to={"/products/" + p.id} className="sx8-ft__a">
            <PR5_Logo p={p} v="mark" still />
            <span>
              <b>{p.short}</b>
              <small>{p.cat}</small>
            </span>
          </PpL>
        </li>
      ))}
      <li className="sx8-ft--sc">
        <PpL to="/products/sampconnect" className="sx8-ft__a">
          <ScMark s={30} tile />
          <span>
            <b>SampConnect</b>
            <small>Private workspace for research teams</small>
          </span>
        </PpL>
      </li>
    </ul>
  );
}

export { SX8_FootList, SX8_Home, SX8_Menu, sx8List, sx8Vars };
