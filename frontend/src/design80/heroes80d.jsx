/*
 * Build 80 centre pieces, set 4 (finance pieces). Styles: k80d.css (.h80-*).
 */
import * as ee from 'react';
import { n_ } from './kit80.jsx';

/* ledger: entries write themselves on both pages, the scale balances */
function Ledger({ dr, cr }) {
  return (
    <div className="h80-led">
      <div className="h80-led__book">
        {[["Debit", dr], ["Credit", cr]].map(([h, rows], p) => (
          <div key={h} className={"h80-led__pg h80-led__pg--" + p}>
            <p className="h80-led__h">{h}</p>
            {rows.map(([a, b], i) => <p key={a} className="h80-led__r" style={{ "--i": i + p * 0.5 }}><span>{a}</span><b>{b}</b></p>)}
          </div>
        ))}
      </div>
      <div className="h80-led__bal"><i className="h80-led__beam"><b /><b /></i><i className="h80-led__post" /><span>Balanced ✓</span></div>
    </div>
  );
}

/* compass: the needle searches and settles on the right direction */
function Compass({ dirs }) {
  return (
    <div className="h80-cmp">
      <div className="h80-cmp__dial">
        {n_(24).map((i) => <i key={i} className="h80-cmp__tick" style={{ "--a": i * 15 + "deg" }} />)}
        {dirs.map((t, i) => <b key={t} className="h80-cmp__d" style={{ "--a": i * 90 + "deg" }}>{t}</b>)}
        <i className="h80-cmp__needle" /><i className="h80-cmp__hub" />
      </div>
    </div>
  );
}

/* audit: a magnifier moves over the papers, each line gets its tick */
function Audit({ title, rows, verdict }) {
  return (
    <div className="h80-aud">
      <div className="h80-aud__paper h80-aud__paper--back" /><div className="h80-aud__paper h80-aud__paper--mid" />
      <div className="h80-aud__paper">
        <p className="h80-aud__t">{title}</p>
        {rows.map((t, i) => <p key={t} className="h80-aud__r" style={{ "--i": i }}><span>{t}</span><em>✓</em></p>)}
        <p className="h80-aud__v">{verdict}</p>
      </div>
      <i className="h80-aud__lens" />
    </div>
  );
}

/* forecast: actuals draw, then the forecast range fans out ahead */
function Forecast({ title, months }) {
  return (
    <div className="h80-fc">
      <p className="h80-fc__t">{title}<span><i /> Actual <i className="is-f" /> Forecast</span></p>
      <svg className="h80-fc__g" viewBox="0 0 300 140" preserveAspectRatio="none">
        <path className="h80-fc__cone" d="M150 70 L300 18 L300 92 Z" />
        <path className="h80-fc__act" pathLength="1" d="M0 112 L30 104 L60 108 L90 90 L120 84 L150 70" />
        <path className="h80-fc__fut" pathLength="1" d="M150 70 L180 62 L210 56 L240 48 L270 44 L300 36" />
      </svg>
      <p className="h80-fc__m">{months.map((m) => <span key={m}>{m}</span>)}</p>
    </div>
  );
}

/* bank: money flows from the bank to the business; the loan is approved */
function Bank({ amount }) {
  return (
    <div className="h80-bank">
      <div className="h80-bank__b"><i className="h80-bank__roof" />{n_(4).map((i) => <i key={i} className="h80-bank__col" />)}<i className="h80-bank__base" /><b>BANK</b></div>
      <div className="h80-bank__flow">{n_(5).map((i) => <i key={i} style={{ "--i": i }}>₹</i>)}</div>
      <div className="h80-bank__biz"><i /><b>Your business</b></div>
      <p className="h80-bank__ok"><small>Working capital</small><b>{amount}</b><span>✓ Approved</span></p>
    </div>
  );
}

/* deal: two companies move together and merge; the value appears */
function Merge({ a, b, value }) {
  return (
    <div className="h80-mrg">
      <p className="h80-mrg__c h80-mrg__c--a"><b>{a}</b></p>
      <p className="h80-mrg__c h80-mrg__c--b"><b>{b}</b></p>
      <p className="h80-mrg__v"><small>Deal value</small><b>{value}</b></p>
      <i className="h80-mrg__flash" />
    </div>
  );
}

/* data room: folders open one by one; each gets a tick, one gets a red flag */
function DataRoom({ folders, flag }) {
  return (
    <div className="h80-dr">
      <p className="h80-dr__h"><b>Data room</b><span>Secure · 256-bit</span></p>
      <div className="h80-dr__grid">
        {folders.map((t, i) => (
          <div key={t} className={"h80-dr__f" + (i === flag ? " is-flag" : "")} style={{ "--i": i }}>
            <i className="h80-dr__ico" /><span>{t}</span><em>{i === flag ? "!" : "✓"}</em>
          </div>
        ))}
      </div>
    </div>
  );
}

/* goals: life goals on a line; the savings jar fills and each goal is reached */
function Goals({ goals }) {
  return (
    <div className="h80-gl">
      <div className="h80-gl__jar"><i className="h80-gl__fill" /><b>Savings</b></div>
      <div className="h80-gl__list">
        {goals.map(([t, y, a], i) => (
          <p key={t} className="h80-gl__g" style={{ "--i": i }}><b>{y}</b><span>{t}</span><small>{a}</small><em>✓</em></p>
        ))}
      </div>
    </div>
  );
}

/* a paper form: fields fill line by line, then the stamp lands */
function Doc({ v, title, sub, rows, total, stamp }) {
  return (
    <div className={"h80-doc h80-doc--" + v}>
      <div className="h80-doc__p">
        <p className="h80-doc__t"><b>{title}</b><span>{sub}</span></p>
        {rows.map(([a, b], i) => <p key={a} className="h80-doc__r" style={{ "--i": i }}><span>{a}</span><b>{b}</b></p>)}
        <p className="h80-doc__tot"><span>{total[0]}</span><b>{total[1]}</b></p>
        <span className="h80-doc__stamp">{stamp}</span>
        {v === "cert" ? <i className="h80-doc__seal" /> : null}
      </div>
    </div>
  );
}

/* investments: coin stacks grow and the portfolio ring fills */
function Coins({ mix }) {
  return (
    <div className="h80-inv">
      <div className="h80-inv__stacks">
        {[3, 5, 7, 9].map((n, s) => (
          <div key={s} className="h80-inv__st" style={{ "--s": s }}>
            {n_(n).map((i) => <i key={i} style={{ "--i": i }} />)}
            <small>{2026 + s * 5}</small>
          </div>
        ))}
      </div>
      <div className="h80-inv__mix">
        <div className="h80-inv__ring" />
        <p>{mix.map(([t, v], i) => <span key={t} style={{ "--i": i }}><i />{t} {v}</span>)}</p>
      </div>
    </div>
  );
}

/* P&L: the monthly statement fills, variances light up green and red */
function Pnl({ month, rows }) {
  return (
    <div className="h80-pnl">
      <p className="h80-pnl__h"><b>Profit &amp; loss</b><span>{month}</span></p>
      <p className="h80-pnl__th"><span /><b>Actual</b><b>Budget</b><b>Var.</b></p>
      {rows.map(([t, a, b, v, g], i) => (
        <p key={t} className={"h80-pnl__r" + (i === rows.length - 1 ? " is-tot" : "")} style={{ "--i": i }}><span>{t}</span><b>{a}</b><b>{b}</b><em className={g ? "is-g" : "is-r"}>{v}</em></p>
      ))}
    </div>
  );
}

/* sprout: a plant grows out of a coin; each leaf is a job done for the young business */
function Sprout({ leaves }) {
  return (
    <div className="h80-spr">
      <i className="h80-spr__pot" /><i className="h80-spr__coin">₹</i>
      <i className="h80-spr__stem" />
      {leaves.map((t, i) => <p key={t} className={"h80-spr__leaf h80-spr__leaf--" + (i % 2 ? "r" : "l")} style={{ "--i": i }}><i /><span>{t}</span></p>)}
    </div>
  );
}

/* piggy bank: coins drop in and the tax saved counts up */
function Piggy({ saved }) {
  return (
    <div className="h80-pig">
      {n_(4).map((i) => <i key={i} className="h80-pig__coin" style={{ "--i": i }}>₹</i>)}
      <div className="h80-pig__body"><i className="h80-pig__slot" /><i className="h80-pig__ear" /><i className="h80-pig__eye" /><i className="h80-pig__snout" /><i className="h80-pig__leg" /><i className="h80-pig__leg h80-pig__leg--2" /></div>
      <p className="h80-pig__saved"><small>Tax saved</small><b>{saved}</b></p>
    </div>
  );
}

/* CFO cockpit: three dials settle on healthy numbers */
function Cockpit({ dials }) {
  return (
    <div className="h80-ckp">
      {dials.map(([t, v, a], i) => (
        <div key={t} className="h80-ckp__d" style={{ "--i": i, "--a": a + "deg" }}>
          <div className="h80-ckp__face"><i className="h80-ckp__arc" /><i className="h80-ckp__n" /><i className="h80-ckp__hub" /></div>
          <b>{v}</b><small>{t}</small>
        </div>
      ))}
    </div>
  );
}

export const HEROES_D = { ledger: Ledger, compass: Compass, audit: Audit, forecast: Forecast, bank: Bank, merge: Merge, dataroom: DataRoom, goals: Goals, doc: Doc, coins: Coins, pnl: Pnl, sprout: Sprout, piggy: Piggy, cockpit: Cockpit };
export { ee };
