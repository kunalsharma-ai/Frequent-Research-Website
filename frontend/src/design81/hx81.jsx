/*
 * Build 81 (Kunal, 12 Nov): the home hero slides each get their own, completely different moving picture, and they must
 * not lag. Market Research = a research lab (survey, people, lens, results), Digital Marketing = a campaign going live
 * on a phone (likes, leads, growth line), IT & Development = code becoming an app (editor, browser, deploy), Accounts &
 * Finance = a ledger desk (invoice, GST stamp, coin stacks, donut), Sampledge = a universe where every product is a
 * planet orbiting the Sampledge sun.
 *
 * Speed rules: only the slide that is showing is built (HomeHero79 mounts one at a time); everything moves with
 * transform / opacity only (no blur filters, no backdrop-filter, no WebGL); each picture is a size container, so all
 * sizes are cqw and the picture scales as one piece on phones and desktops without anything overlapping.
 * Styles: hx81.css (.x81*).
 */
import * as ee from 'react';
import { Link } from 'react-router-dom';

const n_ = (n) => Array.from({ length: n }, (_, i) => i);
const d = (ms) => ({ "--d": ms + "ms" });

/* ------------------------------------------------------------------ Market Research: the research lab */
function MR() {
  const opts = [["Brand A", 0.34], ["Brand B", 0.52], ["Brand C", 0.14]];
  const people = ["#0f9c8f", "#0891b2", "#f59e0b", "#2f6bff", "#e11d74", "#14b8a6", "#7c3aed"];
  return (
    <div className="x81 x81--mr">
      <i className="x81-mr__dots" />
      <div className="x81-card x81-mr__q x81-pop" style={d(80)}>
        <p className="x81-mr__qh"><b>Q3</b> Which brand would you choose?</p>
        {opts.map(([t, v], i) => (
          <p key={t} className={"x81-mr__opt" + (i === 1 ? " is-pick" : "")} style={{ "--v": v, "--i": i }}>
            <i className="x81-mr__box" /><span>{t}</span><i className="x81-mr__bar" /><em>{Math.round(v * 100)}%</em>
          </p>
        ))}
      </div>
      <div className="x81-mr__crowd">
        {people.map((c, i) => <i key={i} className="x81-mr__man" style={{ "--c": c, "--i": i }} />)}
        <span className="x81-mr__lens"><i /></span>
      </div>
      <div className="x81-card x81-mr__chart x81-pop" style={d(260)}>
        <p className="x81-cap">Purchase intent by market</p>
        <div className="x81-mr__cols">
          {[0.55, 0.8, 0.42, 0.95, 0.68].map((v, i) => <i key={i} style={{ "--v": v, "--i": i }} />)}
        </div>
        <p className="x81-mr__axis"><span>IN</span><span>US</span><span>UK</span><span>AE</span><span>SG</span></p>
      </div>
      <p className="x81-chip x81-mr__n x81-pop" style={d(420)}><i className="x81-live" />n = 2,400 · 55+ markets</p>
      <p className="x81-mr__note x81-pop" style={d(900)}><b>Insight</b>Brand B leads with 18–34s. Launch there first.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ Digital Marketing: a campaign going live */
const Heart = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.7 1.3 5.3 3.2 1.6-1.9 3.1-3.2 5.3-3.2 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21Z" fill="currentColor" /></svg>;
const Thumb = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 10h4v11H2zM8 21h9.3c1 0 1.8-.7 2-1.6l1.6-7.2c.3-1.3-.7-2.5-2-2.5H14l.8-4.3c.2-1.2-.7-2.4-2-2.4L8 9.6z" fill="currentColor" /></svg>;
const Star = () => <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="currentColor" /></svg>;
function DM() {
  const react = [Heart, Thumb, Heart, Star, Heart, Thumb];
  return (
    <div className="x81 x81--dm">
      <i className="x81-dm__sun" />
      <svg className="x81-dm__curve" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">
        <path className="x81-dm__area" d="M0 190 C70 180 110 150 160 140 S260 90 300 60 S370 20 400 12 L400 200 L0 200Z" />
        <path className="x81-dm__line" pathLength="1" d="M0 190 C70 180 110 150 160 140 S260 90 300 60 S370 20 400 12" />
      </svg>
      <div className="x81-dm__phone x81-pop" style={d(60)}>
        <p className="x81-dm__bar"><i /><b>yourbrand</b><span>Sponsored</span></p>
        <div className="x81-dm__post"><b>New launch</b><span>Shop the drop →</span><i className="x81-dm__burst"><Heart /></i></div>
        <p className="x81-dm__acts"><Heart /><Thumb /><Star /><em>12.4k</em></p>
        <p className="x81-dm__cta">Shop now</p>
      </div>
      <div className="x81-dm__float">
        {react.map((I, i) => <i key={i} className="x81-dm__r" style={{ "--i": i }}><I /></i>)}
      </div>
      <p className="x81-card x81-dm__toast x81-pop" style={d(500)}><i className="x81-dm__ic">+</i><span><b>+128 new leads</b><small>from Instagram · today</small></span></p>
      <div className="x81-card x81-dm__roi x81-pop" style={d(320)}><p className="x81-cap">Return on ad spend</p><b>4.1x</b><small>▲ 62% this month</small></div>
      <p className="x81-dm__pills">{["Google Ads", "Instagram", "SEO", "Email", "WhatsApp"].map((t, i) => <span key={t} className="x81-pop" style={d(650 + i * 90)}>{t}</span>)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ IT & Development: code becomes an app */
function IT() {
  const code = [[["k", 18], ["f", 30], ["p", 22]], [["p", 14], ["s", 44]], [["k", 12], ["f", 26], ["p", 30]], [["s", 52]], [["p", 20], ["k", 16], ["f", 22]], [["p", 10]]];
  return (
    <div className="x81 x81--it">
      <i className="x81-it__grid" />
      <div className="x81-it__ed x81-pop" style={d(40)}>
        <p className="x81-win"><i /><i /><i /><b>app.jsx</b></p>
        <div className="x81-it__code">
          {code.map((row, r) => (
            <p key={r} className="x81-it__ln" style={{ "--r": r }}>
              <em>{r + 1}</em>
              {row.map(([t, w], j) => <i key={j} className={"x81-it__tk x81-it__tk--" + t} style={{ "--w": w }} />)}
            </p>
          ))}
          <i className="x81-it__caret" />
        </div>
      </div>
      <i className="x81-it__pipe"><i /></i>
      <div className="x81-it__web x81-pop" style={d(200)}>
        <p className="x81-win x81-win--lt"><i /><i /><i /><b>yourapp.com</b></p>
        <div className="x81-it__app">
          <i className="x81-it__nav" />
          <i className="x81-it__side" />
          <i className="x81-it__hero" />
          {n_(3).map((i) => <i key={i} className="x81-it__blk" style={{ "--i": i }} />)}
          <svg className="x81-it__spark" viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M0 26 L18 20 L34 22 L52 12 L70 15 L86 6 L100 4" /></svg>
        </div>
      </div>
      <div className="x81-it__term x81-pop" style={d(380)}>
        <p><span className="x81-it__pr">$</span> npm run deploy</p>
        <p className="x81-it__ok">✓ Tests passed · 248</p>
        <p className="x81-it__ok x81-it__ok--2">✓ Live on cloud · 1.2 s</p>
      </div>
      <div className="x81-it__rack x81-pop" style={d(520)}>
        {n_(3).map((i) => <p key={i}><i style={{ "--i": i }} /><i style={{ "--i": i + 1.5 }} /><span /></p>)}
      </div>
      <p className="x81-chip x81-it__up x81-pop" style={d(700)}><i className="x81-live x81-live--ok" />99.98% uptime</p>
    </div>
  );
}

/* ------------------------------------------------------------------ Accounts & Finance: the ledger desk */
function AF() {
  const rows = [["Consulting fees", "₹ 1,20,000"], ["Software licence", "₹ 48,500"], ["Support (12 mo)", "₹ 36,000"]];
  const segs = [[0.42, "#b8862b"], [0.28, "#1e3a8a"], [0.18, "#22c55e"], [0.12, "#e2b65c"]];
  let acc = 0;
  return (
    <div className="x81 x81--af">
      <i className="x81-af__lines" />
      <div className="x81-af__inv x81-pop" style={d(40)}>
        <p className="x81-af__ih"><b>TAX INVOICE</b><span>No. FR/2026/1142</span></p>
        {rows.map(([a, b], i) => <p key={a} className="x81-af__row" style={{ "--i": i }}><span>{a}</span><b>{b}</b></p>)}
        <p className="x81-af__row x81-af__row--gst" style={{ "--i": 3 }}><span>GST 18%</span><b>₹ 36,810</b></p>
        <p className="x81-af__tot"><span>Total</span><b>₹ 2,41,310</b></p>
        <p className="x81-af__stamp">GST FILED <i>✓</i></p>
      </div>
      <div className="x81-card x81-af__donut x81-pop" style={d(240)}>
        <svg viewBox="0 0 42 42" aria-hidden="true">
          {segs.map(([v, c], i) => {
            const off = 25 - acc * 100;
            acc += v;
            return <circle key={i} className="x81-af__seg" cx="21" cy="21" r="15.915" fill="none" stroke={c} strokeWidth="6" strokeDasharray={`${v * 100 - 1.2} ${100 - v * 100 + 1.2}`} strokeDashoffset={off} style={{ "--i": i }} />;
          })}
        </svg>
        <p><b>₹ 8.6L</b><small>saved in tax</small></p>
      </div>
      <div className="x81-af__coins">
        {[3, 5, 4, 7].map((h, i) => (
          <p key={i} className="x81-af__stack" style={{ "--h": h, "--i": i }}>
            {n_(h).map((j) => <i key={j} style={{ "--j": j }} />)}
          </p>
        ))}
      </div>
      <p className="x81-card x81-af__cal x81-pop" style={d(560)}><b>20</b><span><strong>GSTR-3B</strong><small>filed on time ✓</small></span></p>
      <p className="x81-chip x81-af__chip x81-pop" style={d(760)}>Books closed · Taxes paid · MIS shared</p>
    </div>
  );
}

/* ------------------------------------------------------------------ Sampledge: the universe of products */
const ORBITS = [
  { r: 22, s: 14, a: [20, 200] },
  { r: 32, s: 22, a: [110, 290] },
  { r: 42, s: 30, a: [0, 120, 240] },
];
function SX({ list = [] }) {
  let k = 0;
  return (
    <div className="x81 x81--sx">
      <i className="x81-sx__stars" />
      <i className="x81-sx__stars x81-sx__stars--2" />
      <i className="x81-sx__neb" />
      <i className="x81-sx__comet" />
      <div className="x81-sx__sys">
        <div className="x81-sx__sunhold"><p className="x81-sx__sun"><i /><b>Sampledge</b><small>{list.length} products</small></p></div>
        {ORBITS.map((o, oi) => (
          <div key={oi} className="x81-sx__orbit" style={{ "--r": o.r, "--s": o.s + "s" }}>
            {o.a.map((a) => {
              const p = list[k++];
              if (!p) return null;
              return (
                <div key={p.id} className="x81-sx__arm" style={{ "--a": a + "deg" }}>
                  <div className="x81-sx__hold">
                    <div className="x81-sx__spin">
                      <Link to={"/products/" + p.id} tabIndex={-1} className={"x81-sx__pl" + ((k % 3) === 1 ? " has-ring" : "")} style={{ "--pc": p.c1, "--sz": [5.4, 6.4, 7.4][oi] }}>
                        <i className="x81-sx__ball" />
                        <b>{p.short || p.name}</b>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p className="x81-sx__lab x81-pop" style={d(500)}>One login · one universe of tools</p>
    </div>
  );
}

export const SCENES81 = { mr: MR, dm: DM, it: IT, af: AF, sx: SX };
export function Scene81({ k, list }) {
  const S = SCENES81[k];
  return S ? <div className="x81-wrap" aria-hidden="true"><S list={list} /></div> : null;
}
