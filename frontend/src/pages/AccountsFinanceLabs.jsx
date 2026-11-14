/*
 * Accounts & Finance — build 63 interactive labs. Prefix AGL_ (components) / ag* (pure helpers). Styles: src/styles/af63.css.
 *
 * Every lab is an illustration with its assumptions on screen. Calculations are deterministic and kept in pure functions
 * (agRunway, agNpv, agIrr, agPayback, agFpa, agDebtEq) so they can be unit-tested (scripts/aftest.js):
 *   13-week runway   closing(w) = closing(w-1) + inflow - outflow, starting from the opening balance (no clamping).
 *   NPV              -I + Σ CF_t / (1+r)^t, t = 1…horizon, year-end timing convention; r = 0 needs no special case.
 *   IRR              bisection on NPV(r) = 0 over (-99.99 %, 1000 %]; not shown without one sign change in the series
 *                    (no IRR / multiple IRRs possible) or when no root lies in the range.
 *   Simple payback   first year in which cumulative undiscounted cash flow reaches zero, interpolated within that year.
 *   FP&A scenario    index units only (starting cash 100, monthly revenue 100, costs 85); revenue growth reached
 *                    linearly by month 12, costs scaled, collections delayed by d/30 months (interpolated).
 * No lab shows rupee results that could be read as a forecast for the visitor's business, except where the visitor
 * enters the figures themselves (runway, debt/equity, NPV).
 */
import * as ee from 'react';
import { React_Frag } from '../components/dm/ixkit.jsx';
import { AF_FORM, AF_I, agPick } from './AccountsFinance.jsx';

/* ---------- formatting ---------- */
function agInr(n, dec) {
  if (n == null || !isFinite(n)) return "—";
  const d = dec || 0;
  const s = Math.abs(n).toLocaleString("en-IN", { maximumFractionDigits: d, minimumFractionDigits: d });
  return (n < 0 ? "−" : "") + "₹" + s;
}
const agPct = (r, d) => (r == null || !isFinite(r) ? "—" : (r * 100).toFixed(d == null ? 1 : d) + "%");
function agNum(v) {
  const s = String(v == null ? "" : v).replace(/[,\s₹]/g, "");
  if (s === "" || s === "-") return NaN;
  return Number(s);
}
/* "a, b and c" — lower-cases the first letter unless it starts an acronym (P&L, GST, MIS…) */
function agList(xs) {
  const lc = (t) => (/^[A-Z][a-z]/.test(t) ? t.charAt(0).toLowerCase() + t.slice(1) : t);
  const a = (xs || []).map(lc);
  if (a.length < 2) return a.join("");
  return a.slice(0, -1).join(", ") + " and " + a[a.length - 1];
}

/* ---------- pure calculators ---------- */
function agRunway(start, inflow, outflow, weeks) {
  const n = weeks || 13;
  const net = inflow - outflow;
  const rows = [];
  let c = start,
    neg = 0;
  for (let w = 1; w <= n; w++) {
    c = c + net;
    rows.push(c);
    if (c < 0 && !neg) neg = w;
  }
  return { net, rows, neg };
}
function agNpv(inv, rate, cfs) {
  let v = -inv;
  for (let t = 1; t <= cfs.length; t++) v += cfs[t - 1] / Math.pow(1 + rate, t);
  return v;
}
function agIrr(inv, cfs) {
  const s = [-inv].concat(cfs);
  if (!(s.some((x) => x < 0) && s.some((x) => x > 0))) return { ok: false, why: "none" };
  let ch = 0,
    prev = 0;
  for (const x of s) {
    if (!x) continue;
    const sg = Math.sign(x);
    if (prev && sg !== prev) ch++;
    prev = sg;
  }
  if (ch > 1) return { ok: false, why: "multi" };
  const f = (r) => s.reduce((a, x, t) => a + x / Math.pow(1 + r, t), 0);
  let lo = -0.9999,
    hi = 10,
    flo = f(lo),
    fhi = f(hi);
  if (!isFinite(flo) || !isFinite(fhi) || flo * fhi > 0) return { ok: false, why: "range" };
  for (let i = 0; i < 300; i++) {
    const m = (lo + hi) / 2,
      fm = f(m);
    if (Math.abs(fm) < 1e-7 || hi - lo < 1e-10) return { ok: true, r: m };
    if (flo * fm < 0) {
      hi = m;
      fhi = fm;
    } else {
      lo = m;
      flo = fm;
    }
  }
  return { ok: true, r: (lo + hi) / 2 };
}
function agPayback(inv, cfs) {
  if (inv <= 0) return { ok: true, y: 0 };
  let cum = -inv;
  for (let t = 1; t <= cfs.length; t++) {
    const before = cum;
    cum += cfs[t - 1];
    if (before < 0 && cum >= 0) return { ok: true, y: t - 1 + -before / cfs[t - 1] };
  }
  return { ok: false };
}
function agFpa(g, c, d) {
  const R = (m) => (m <= 0 ? 100 : 100 * (1 + ((g / 100) * Math.min(m, 12)) / 12));
  const lag = d / 30;
  const recv = (m) => {
    const x = m - lag,
      lo = Math.floor(x),
      fr = x - lo;
    return R(lo) * (1 - fr) + R(lo + 1) * fr;
  };
  const C = 85 * (1 + c / 100);
  let cash = 100;
  const out = [];
  for (let m = 1; m <= 12; m++) {
    cash += recv(m) - C;
    out.push(cash);
  }
  return out;
}
function agDebtEq(total, debtPct, rate, eqRet) {
  const debt = (total * debtPct) / 100,
    eq = total - debt;
  return { debt, eq, interest: (debt * rate) / 100, eqAmt: (eq * eqRet) / 100 };
}

/* ---------- shared bits ---------- */
function AGL_Note({ children }) {
  return (
    <p className="agl-note">
      <AF_I n="flag" s={14} />
      <span>{children}</span>
    </p>
  );
}
function AGL_Cta({ label, detail }) {
  return (
    <a className="ag-btn ag-btn--ac" href={"#" + AF_FORM} onClick={agPick(detail || {})}>
      {label} <AF_I n="arrow" s={16} />
    </a>
  );
}
function AGL_Range({ id, label, min, max, step, value, onChange, fmt, hint }) {
  return (
    <div className="agl-range">
      <label htmlFor={id}>
        <span>{label}</span>
        <output htmlFor={id}>{fmt ? fmt(value) : value}</output>
      </label>
      <input id={id} type="range" min={min} max={max} step={step || 1} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ "--p": ((value - min) / (max - min)) * 100 + "%" }} />
      <span className="agl-range__ends" aria-hidden="true">
        <i>{fmt ? fmt(min) : min}</i>
        <i>{fmt ? fmt(max) : max}</i>
      </span>
      {hint && <small>{hint}</small>}
    </div>
  );
}
function AGL_Money({ id, label, value, onChange, hint, min, max }) {
  const n = agNum(value);
  const bad = isNaN(n) ? "Enter an amount in rupees." : min != null && n < min ? `Enter at least ${agInr(min)}.` : max != null && n > max ? `Enter at most ${agInr(max)}.` : "";
  return (
    <div className={"agl-money" + (bad ? " is-bad" : "")}>
      <label htmlFor={id}>{label}</label>
      <span className="agl-money__box">
        <i aria-hidden="true">₹</i>
        <input id={id} inputMode="numeric" value={value} onChange={(e) => onChange(e.target.value.replace(/[^\d,]/g, ""))} onBlur={() => !isNaN(n) && onChange(Math.round(n).toLocaleString("en-IN"))} aria-invalid={!!bad} aria-describedby={id + "-m"} />
      </span>
      <small id={id + "-m"} className={bad ? "is-err" : ""}>{bad || hint}</small>
    </div>
  );
}

/* ============ Virtual CFO — 13-week cash runway ============ */
const AGL_RW0 = { s: "25,00,000", i: "4,00,000", o: "3,50,000" };
function AGL_Runway({ g }) {
  const L = g.lab;
  const [v, setV] = ee.useState(AGL_RW0);
  const [wk, setWk] = ee.useState(13);
  const [tbl, setTbl] = ee.useState(false);
  const s = agNum(v.s),
    i = agNum(v.i),
    o = agNum(v.o);
  const ok = [s, i, o].every((x) => !isNaN(x)) && i >= 0 && o >= 0;
  const r = ok ? agRunway(s, i, o, 13) : null;
  const max = r ? Math.max(1, ...r.rows.map(Math.abs), Math.abs(s)) : 1;
  const obs = !r ? "Enter all three amounts to see the outlook." : r.neg ? `In this simplified model the closing cash balance turns negative in week ${r.neg}.` : r.net > 0 ? "In this simplified model the cash balance increases each week." : r.net < 0 ? "In this simplified model the cash balance decreases each week but stays positive for all 13 weeks." : "In this simplified model the cash balance stays flat.";
  const set = (k) => (x) => setV((p) => ({ ...p, [k]: x }));
  const sel = r ? r.rows[wk - 1] : null;
  return (
    <div className="agl agl-rw">
      <div className="agl-rw__in">
        <AGL_Money id="rw-s" label="Starting cash balance" value={v.s} onChange={set("s")} hint="Cash available at the start of week 1." min={0} max={1e12} />
        <AGL_Money id="rw-i" label="Weekly cash inflows" value={v.i} onChange={set("i")} hint="Expected cash receipts — not accounting revenue." min={0} max={1e12} />
        <AGL_Money id="rw-o" label="Weekly cash outflows" value={v.o} onChange={set("o")} hint="Expected cash payments." min={0} max={1e12} />
        <button type="button" className="ag-btn ag-btn--ghost agl-reset" onClick={() => (setV(AGL_RW0), setWk(13))}>
          Reset example
        </button>
      </div>
      <div className="agl-rw__out">
        <div className="agl-kpis" aria-live="polite">
          <span><em>Starting cash</em><b>{ok ? agInr(s) : "—"}</b></span>
          <span><em>Weekly net movement</em><b className={r && r.net < 0 ? "is-neg" : ""}>{r ? agInr(r.net) : "—"}</b></span>
          <span><em>Week 4 closing</em><b className={r && r.rows[3] < 0 ? "is-neg" : ""}>{r ? agInr(r.rows[3]) : "—"}</b></span>
          <span><em>Week 8 closing</em><b className={r && r.rows[7] < 0 ? "is-neg" : ""}>{r ? agInr(r.rows[7]) : "—"}</b></span>
          <span><em>Week 13 closing</em><b className={r && r.rows[12] < 0 ? "is-neg" : ""}>{r ? agInr(r.rows[12]) : "—"}</b></span>
          <span><em>First negative week</em><b className={r && r.neg ? "is-neg" : ""}>{r ? (r.neg ? "Week " + r.neg : "None in 13 weeks") : "—"}</b></span>
        </div>
        <div className="agl-rw__chart" role="group" aria-label="Closing cash by week — select a week to inspect it">
          <i className="agl-rw__zero" aria-hidden="true" />
          {(r ? r.rows : Array(13).fill(0)).map((c, k) => (
            <button key={k} type="button" className={"agl-rw__bar" + (c < 0 ? " is-neg" : "") + (wk === k + 1 ? " is-on" : "")} style={{ "--h": Math.min(1, Math.abs(c) / max) }} onClick={() => setWk(k + 1)} onFocus={() => setWk(k + 1)} aria-pressed={wk === k + 1} aria-label={`Week ${k + 1}: closing cash ${r ? agInr(c) : "not available"}`}>
              <i />
              <span aria-hidden="true">W{k + 1}</span>
            </button>
          ))}
        </div>
        <p className="agl-rw__sel" aria-live="polite">
          {r ? (
            <>
              Week {wk} closing cash: <b className={sel < 0 ? "is-neg" : ""}>{agInr(sel)}</b> <span className="agl-tag">Illustrative example</span>
            </>
          ) : (
            "—"
          )}
        </p>
        <p className="agl-obs" aria-live="polite"><AF_I n="lens" s={16} />{obs}</p>
        <button type="button" className="agl-link" aria-expanded={tbl} aria-controls="rw-tbl" onClick={() => setTbl((x) => !x)}>
          {tbl ? "Hide the weekly table" : "Show the weekly table"}
        </button>
        <div id="rw-tbl" className={"agl-tbl" + (tbl ? "" : " is-off")}>
          <table>
            <caption>Illustrative 13-week closing cash</caption>
            <thead><tr><th scope="col">Week</th><th scope="col">Inflows</th><th scope="col">Outflows</th><th scope="col">Closing cash</th></tr></thead>
            <tbody>
              {(r ? r.rows : []).map((c, k) => (
                <tr key={k}><th scope="row">{k + 1}</th><td>{agInr(i)}</td><td>{agInr(o)}</td><td className={c < 0 ? "is-neg" : ""}>{agInr(c)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AGL_Note>{L.note} The model uses the same inflow and outflow every week and ignores seasonality, taxes, financing, credit terms and one-off payments.</AGL_Note>
      <AGL_Cta label={L.cta} detail={{ areas: ["Cash-flow oversight", "Rolling 13-week cash forecast"] }} />
    </div>
  );
}

/* ============ Corporate Finance — Debt vs Equity lab ============ */
const AGL_DE0 = { t: "1,00,00,000", d: 60, r: 12, e: 18 };
function AGL_DebtEq({ g }) {
  const L = g.lab;
  const [v, setV] = ee.useState(AGL_DE0);
  const t = agNum(v.t);
  const ok = !isNaN(t) && t > 0 && t <= 1e13;
  const x = ok ? agDebtEq(t, v.d, v.r, v.e) : null;
  const set = (k) => (y) => setV((p) => ({ ...p, [k]: y }));
  return (
    <div className="agl agl-de">
      <div className="agl-de__in">
        <AGL_Money id="de-t" label="How much capital is required?" value={v.t} onChange={set("t")} hint="Total funding requirement." min={1} max={1e13} />
        <AGL_Range id="de-d" label="Percentage funded through debt" min={0} max={100} value={v.d} onChange={set("d")} fmt={(n) => n + "%"} hint={`Equity share: ${100 - v.d}%`} />
        <AGL_Range id="de-r" label="Illustrative annual interest rate" min={0} max={30} step={0.5} value={v.r} onChange={set("r")} fmt={(n) => n + "%"} />
        <AGL_Range id="de-e" label="Illustrative annual equity-return assumption" min={0} max={40} step={0.5} value={v.e} onChange={set("e")} fmt={(n) => n + "%"} hint="A modelling input you choose — not a promised or guaranteed investor return." />
        <button type="button" className="ag-btn ag-btn--ghost agl-reset" onClick={() => setV(AGL_DE0)}>Reset example</button>
      </div>
      <div className="agl-de__out" aria-live="polite">
        <div className="agl-de__bar" aria-hidden="true">
          <span className="agl-de__d" style={{ flexBasis: v.d + "%" }}>{v.d >= 12 && <b>Debt {v.d}%</b>}</span>
          <span className="agl-de__e" style={{ flexBasis: 100 - v.d + "%" }}>{100 - v.d >= 12 && <b>Equity {100 - v.d}%</b>}</span>
        </div>
        <dl className="agl-de__dl">
          <div><dt>Total funding requirement</dt><dd>{ok ? agInr(t) : "—"}</dd></div>
          <div><dt>Debt-funded amount</dt><dd>{x ? agInr(x.debt) : "—"}</dd></div>
          <div><dt>Equity-funded amount</dt><dd>{x ? agInr(x.eq) : "—"}</dd></div>
          <div><dt>Debt / equity funding mix</dt><dd>{v.d}% / {100 - v.d}%</dd></div>
          <div className="is-d"><dt>Illustrative annual debt interest</dt><dd>{x ? agInr(x.interest) : "—"}</dd><small>A contractual obligation under typical loan terms.</small></div>
          <div className="is-e"><dt>Illustrative annual equity-return assumption amount</dt><dd>{x ? agInr(x.eqAmt) : "—"}</dd><small>Your chosen return assumption — not a payment obligation, and not directly comparable to interest.</small></div>
        </dl>
        <p className="agl-obs">
          <AF_I n="lens" s={16} />
          {x
            ? `With this illustrative mix, debt accounts for ${v.d}% of the funding requirement and equity for ${100 - v.d}%. The debt component produces an estimated annual interest amount of ${agInr(x.interest)} at ${v.r}%. The equity figure of ${agInr(x.eqAmt)} represents your chosen ${v.e}% return assumption, not a guaranteed payment. Ownership dilution isn't calculated here because it depends on valuation.`
            : "Enter a funding requirement to compare the two routes."}
        </p>
      </div>
      <AGL_Note>{L.note} The lower figure does not decide the better structure — debt adds repayment obligations and equity changes ownership.</AGL_Note>
      <AGL_Cta label={L.cta} detail={{ areas: ["Capital structure analysis"] }} />
    </div>
  );
}

/* ============ Investment Planning — opportunity comparator ============ */
/* illustrative annual cash flows (₹), years 1–10, editable per opportunity */
const AG_OPPS = [
  { k: "A", n: "Opportunity A — Steady Cash Flow", cf: [260000, 260000, 260000, 260000, 260000, 260000, 260000, 260000, 260000, 260000] },
  { k: "B", n: "Opportunity B — Gradual Growth", cf: [120000, 170000, 230000, 300000, 370000, 420000, 460000, 480000, 490000, 500000] },
  { k: "C", n: "Opportunity C — Delayed Payback", cf: [0, 0, 300000, 450000, 520000, 560000, 580000, 590000, 600000, 600000] },
];
const AGL_NPV0 = { inv: "10,00,000", r: 12, h: 5 };
function AGL_Npv({ g }) {
  const L = g.lab;
  const [v, setV] = ee.useState(AGL_NPV0);
  const [sel, setSel] = ee.useState(0);
  const [cfs, setCfs] = ee.useState(() => AG_OPPS.map((o) => o.cf.map((x) => x.toLocaleString("en-IN"))));
  const inv = agNum(v.inv);
  const ok = !isNaN(inv) && inv >= 0 && inv <= 1e13;
  const nums = (k) => cfs[k].slice(0, v.h).map((x) => {
    const n = agNum(x);
    return isNaN(n) ? 0 : n;
  });
  const res = AG_OPPS.map((o, k) => {
    const c = nums(k);
    return { npv: ok ? agNpv(inv, v.r / 100, c) : NaN, irr: ok ? agIrr(inv, c) : { ok: false, why: "none" }, pb: ok ? agPayback(inv, c) : { ok: false }, c };
  });
  const irrTxt = (x) => (x.ok ? agPct(x.r) : x.why === "multi" ? "Not shown — multiple IRRs possible" : x.why === "range" ? "No IRR in the tested range" : "Not meaningful for these cash flows");
  const pbTxt = (x) => (x.ok ? x.y.toFixed(1) + " years" : "Not recovered within the analysis period");
  const cur = res[sel];
  let cum = ok ? -inv : 0;
  const cumRows = cur.c.map((c) => (cum += c));
  const mx = Math.max(1, ok ? inv : 1, ...cur.c.map(Math.abs), ...cumRows.map(Math.abs));
  const setCf = (j, val) => setCfs((p) => p.map((row, k) => (k === sel ? row.map((x, i) => (i === j ? val.replace(/[^\d,-]/g, "") : x)) : row)));
  return (
    <div className="agl agl-npv">
      <div className="agl-npv__ctl">
        <AGL_Money id="np-i" label="Initial investment" value={v.inv} onChange={(x) => setV((p) => ({ ...p, inv: x }))} hint="Paid at the start (year 0)." min={0} max={1e13} />
        <AGL_Range id="np-r" label="Discount rate" min={0} max={40} step={0.5} value={v.r} onChange={(x) => setV((p) => ({ ...p, r: x }))} fmt={(n) => n + "%"} hint="An illustrative modelling assumption — choose it for the purpose of the analysis." />
        <AGL_Range id="np-h" label="Analysis period" min={1} max={10} value={v.h} onChange={(x) => setV((p) => ({ ...p, h: x }))} fmt={(n) => n + (n === 1 ? " year" : " years")} />
        <button type="button" className="ag-btn ag-btn--ghost agl-reset" onClick={() => (setV(AGL_NPV0), setSel(0), setCfs(AG_OPPS.map((o) => o.cf.map((x) => x.toLocaleString("en-IN")))))}>Reset example</button>
      </div>
      <div className="agl-npv__main">
        <div className="agl-seg" role="radiogroup" aria-label="Opportunity">
          {AG_OPPS.map((o, k) => (
            <button key={o.k} type="button" role="radio" aria-checked={sel === k} className={sel === k ? "is-on" : ""} onClick={() => setSel(k)}>
              <b>{o.k}</b>
              <span>{o.n.replace(/^Opportunity [A-C] — /, "")}</span>
            </button>
          ))}
        </div>
        <div className="agl-npv__chart" aria-hidden="true">
          <i className="agl-npv__zero" />
          {[-1].concat(cur.c.map((_, j) => j)).map((j) => {
            const val = j < 0 ? (ok ? -inv : 0) : cur.c[j];
            const cu = j < 0 ? (ok ? -inv : 0) : cumRows[j];
            return (
              <span key={j} className="agl-npv__col">
                <i className={"agl-npv__b" + (val < 0 ? " is-neg" : "")} style={{ "--h": Math.abs(val) / mx }} />
                <s className={"agl-npv__cum" + (cu < 0 ? " is-neg" : "")} style={{ "--y": cu / mx }} />
                <em>Y{j + 1}</em>
              </span>
            );
          })}
        </div>
        <p className="agl-legend" aria-hidden="true"><span className="b">Annual cash flow</span><span className="c">Cumulative position</span></p>
        <fieldset className="agl-cf">
          <legend>Annual cash flows for {AG_OPPS[sel].n} (illustrative, editable)</legend>
          {cfs[sel].slice(0, v.h).map((x, j) => (
            <label key={j}>
              <span>Year {j + 1}</span>
              <input inputMode="numeric" value={x} onChange={(e) => setCf(j, e.target.value)} aria-label={`Year ${j + 1} cash flow, rupees`} />
            </label>
          ))}
        </fieldset>
        <div className="agl-tbl agl-npv__tbl">
          <table>
            <caption>Comparison under the selected assumptions (illustrative)</caption>
            <thead><tr><th scope="col">Opportunity</th><th scope="col">NPV</th><th scope="col">IRR</th><th scope="col">Simple payback</th></tr></thead>
            <tbody>
              {AG_OPPS.map((o, k) => (
                <tr key={o.k} className={sel === k ? "is-on" : ""}>
                  <th scope="row">{o.n}</th>
                  <td className={res[k].npv < 0 ? "is-neg" : ""}>{agInr(res[k].npv)}</td>
                  <td>{irrTxt(res[k].irr)}</td>
                  <td>{pbTxt(res[k].pb)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="agl-obs" aria-live="polite">
          <AF_I n="lens" s={16} />
          {ok
            ? `Under the selected assumptions, ${AG_OPPS[sel].n.replace(/ — .*/, "")} has an estimated NPV of ${agInr(cur.npv)} over ${v.h} ${v.h === 1 ? "year" : "years"} using a ${v.r}% discount rate${cur.npv < 0 ? " — negative under these assumptions" : ""}. Its simple payback period is ${pbTxt(cur.pb).toLowerCase()}. These outputs are sensitive to the timing and size of future cash flows.`
            : "Enter an initial investment to compare the opportunities."}
        </p>
      </div>
      <AGL_Note>{L.note} Timing convention: the initial investment is at year 0 and each annual cash flow at the end of its year. No metric on its own decides whether to invest.</AGL_Note>
      <AGL_Cta label={L.cta} detail={{ areas: ["Investment feasibility analysis"] }} />
    </div>
  );
}

/* ============ Financial Planning & Advisory — "What if the numbers change?" ============ */
function AGL_Fpa({ g }) {
  const L = g.lab;
  const [v, setV] = ee.useState({ g: 10, c: 0, d: 0 });
  const base = agFpa(0, 0, 0),
    adj = agFpa(v.g, v.c, v.d);
  const lo = Math.min(...adj),
    loM = adj.indexOf(lo) + 1;
  const all = base.concat(adj, [100]);
  const mn = Math.min(0, ...all),
    mx = Math.max(...all);
  const pt = (arr) => arr.map((y, k) => `${((k + 1) / 12) * 100},${100 - ((y - mn) / (mx - mn || 1)) * 100}`);
  const start = `0,${100 - ((100 - mn) / (mx - mn || 1)) * 100}`;
  const diff = adj[11] - base[11];
  const set = (k) => (x) => setV((p) => ({ ...p, [k]: x }));
  return (
    <div className="agl agl-fpa">
      <div className="agl-fpa__ctl">
        <AGL_Range id="fp-g" label="Revenue growth assumption" min={-20} max={30} value={v.g} onChange={set("g")} fmt={(n) => (n > 0 ? "+" : "") + n + "%"} hint="Change in monthly revenue, reached gradually by month 12." />
        <AGL_Range id="fp-c" label="Operating cost change" min={-10} max={20} value={v.c} onChange={set("c")} fmt={(n) => (n > 0 ? "+" : "") + n + "%"} />
        <AGL_Range id="fp-d" label="Payment collection delay" min={0} max={60} step={15} value={v.d} onChange={set("d")} fmt={(n) => n + " days"} />
        <button type="button" className="ag-btn ag-btn--ghost agl-reset" onClick={() => setV({ g: 10, c: 0, d: 0 })}>Reset</button>
      </div>
      <div className="agl-fpa__out">
        <svg className="agl-fpa__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {[25, 50, 75].map((y) => <line key={y} x1="0" x2="100" y1={y} y2={y} />)}
          <polyline className="b" points={[start].concat(pt(base)).join(" ")} />
          <polyline className="a" points={[start].concat(pt(adj)).join(" ")} />
        </svg>
        <p className="agl-legend" aria-hidden="true"><span className="b">Illustrative baseline</span><span className="a">Adjusted scenario</span></p>
        <div className="agl-kpis" aria-live="polite">
          <span><em>Projected cash index · month 12</em><b>{adj[11].toFixed(0)}</b></span>
          <span><em>Baseline · month 12</em><b>{base[11].toFixed(0)}</b></span>
          <span><em>Scenario comparison</em><b className={diff < 0 ? "is-neg" : ""}>{(diff > 0 ? "+" : "") + diff.toFixed(0)} points</b></span>
          <span><em>Lowest point</em><b className={lo < 0 ? "is-neg" : ""}>{lo.toFixed(0)} in month {loM}</b></span>
        </div>
        <div className="agl-tbl">
          <table>
            <caption>Projected cash index by quarter (illustrative units, not rupees)</caption>
            <thead><tr><th scope="col">Month</th><th scope="col">Baseline</th><th scope="col">Adjusted</th></tr></thead>
            <tbody>{[3, 6, 9, 12].map((m) => <tr key={m}><th scope="row">{m}</th><td>{base[m - 1].toFixed(0)}</td><td>{adj[m - 1].toFixed(0)}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
      <AGL_Note>Assumptions: starting cash index 100, monthly revenue 100 and monthly costs 85 in the baseline; revenue growth is reached gradually by month 12; collections are delayed by the chosen number of days. Index units, not rupees — this does not represent a forecast for your business.</AGL_Note>
      <AGL_Cta label="Discuss Financial Planning" detail={{ areas: ["Financial modeling", "Cash-flow planning and management"] }} />
    </div>
  );
}

/* ============ Budgeting — three possible scenarios (relative, no figures) ============ */
function AGL_Futures({ g }) {
  const L = g.lab;
  const [v, setV] = ee.useState({ r: 0, c: 0, t: "Unchanged collections" });
  const net = 100 * (1 + v.r / 100) - 85 * (1 + v.c / 100); /* baseline 15 */
  const lift = Math.max(-1, Math.min(1, (net - 15) / 25));
  const tim = v.t === "Faster collections" ? -1 : v.t === "Slower collections" ? 1 : 0;
  const end = (k) => 50 - (lift * 26 + k * 16 - tim * 5);
  const path = (k) => `M0 70 C 22 70, 30 ${62 - k * 2}, 40 58 S 70 ${end(k) + 6}, 100 ${Math.max(6, Math.min(94, end(k)))}`;
  const S = [["Conservative", -1, "c"], ["Base", 0, "b"], ["Optimistic", 1, "o"]];
  const word = (n, up, dn) => (n > 0 ? up : n < 0 ? dn : "unchanged");
  const changes = [
    v.r ? `Revenue ${word(v.r, "higher", "lower")} than the starting position by ${Math.abs(v.r)}%` : "Revenue as in the starting position",
    v.c ? `Operating costs ${word(v.c, "higher", "lower")} by ${Math.abs(v.c)}%` : "Operating costs as in the starting position",
    tim ? (tim < 0 ? "Cash receipts arrive earlier" : "Cash receipts arrive later") : "Cash receipts arrive as usual",
    net > 15 ? "The gap between revenue and costs widens" : net < 15 ? "The gap between revenue and costs narrows" : "The gap between revenue and costs is unchanged",
  ];
  return (
    <div className="agl agl-fut">
      <div className="agl-fut__ctl">
        <AGL_Range id="fu-r" label="Revenue assumption" min={-20} max={20} value={v.r} onChange={(x) => setV((p) => ({ ...p, r: x }))} fmt={(n) => (n > 0 ? "+" : "") + n + "%"} hint="Illustrative range −20% to +20%." />
        <AGL_Range id="fu-c" label="Operating cost assumption" min={-10} max={20} value={v.c} onChange={(x) => setV((p) => ({ ...p, c: x }))} fmt={(n) => (n > 0 ? "+" : "") + n + "%"} hint="Illustrative range −10% to +20%." />
        <fieldset className="agl-radio">
          <legend>Collection timing</legend>
          {["Faster collections", "Unchanged collections", "Slower collections"].map((t) => (
            <label key={t} className={v.t === t ? "is-on" : ""}>
              <input type="radio" name="fu-t" value={t} checked={v.t === t} onChange={() => setV((p) => ({ ...p, t }))} />
              {t}
            </label>
          ))}
        </fieldset>
        <button type="button" className="ag-btn ag-btn--ghost agl-reset" onClick={() => setV({ r: 0, c: 0, t: "Unchanged collections" })}>Reset</button>
      </div>
      <div className="agl-fut__out">
        <svg className="agl-fut__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {[20, 40, 60, 80].map((x) => <line key={x} x1={x} x2={x} y1="4" y2="96" />)}
          {S.map(([n, k, c]) => <path key={n} className={"agl-fut__p agl-fut__p--" + c} d={path(k)} />)}
        </svg>
        <ul className="agl-fut__lbl" aria-hidden="true">{S.map(([n, k, c]) => <li key={n} className={"is-" + c} style={{ "--y": Math.max(6, Math.min(94, end(k))) + "%" }}>{n}</li>)}</ul>
        <div className="agl-fut__timing" aria-hidden="true">
          <em>Cash timing</em>
          <span style={{ transform: `translateX(${tim * 18}%)` }}>{[0, 1, 2, 3, 4].map((k) => <i key={k} />)}</span>
        </div>
        <div className="agl-fut__cards">
          {L.cards.map(([t, p], k) => (
            <div key={t} className={"agl-fut__card is-" + "cbo"[k]}>
              <b>{t}</b>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <div className="agl-sum" aria-live="polite">
          <h4>Your scenario assumptions</h4>
          <ul>
            <li>Revenue assumption: <b>{(v.r > 0 ? "+" : "") + v.r}%</b></li>
            <li>Operating-cost assumption: <b>{(v.c > 0 ? "+" : "") + v.c}%</b></li>
            <li>Collection timing: <b>{v.t}</b></li>
          </ul>
          <p>Main changes from the starting position: {changes.join("; ")}.</p>
        </div>
      </div>
      <AGL_Note>An illustrative concept, shown as relative direction only — no rupee amounts, profits or balances are calculated, and it does not predict your business's results.</AGL_Note>
      <AGL_Cta label={L.cta} detail={{ areas: ["Scenario planning"] }} />
    </div>
  );
}

/* ============ Audit — the audit-ready checklist ============ */
const AGL_ST = [["ok", "Reviewed"], ["att", "Needs attention"], ["na", "Not applicable"]];
function AGL_Audit({ g }) {
  const L = g.lab;
  const [st, setSt] = ee.useState({});
  const [open, setOpen] = ee.useState(() => L.groups.map((_, k) => k === 0));
  const [only, setOnly] = ee.useState(false);
  const all = [];
  L.groups.forEach(([gn, items], gi) => items.forEach((t, ii) => all.push([gi + "-" + ii, t, gn])));
  const n = (s) => all.filter(([k]) => st[k] === s).length;
  const done = all.filter(([k]) => st[k]).length;
  const out = all.filter(([k]) => st[k] === "att" || !st[k]);
  return (
    <div className="agl agl-audit">
      <div className="agl-audit__head">
        <div className="agl-audit__prog" aria-live="polite">
          <span className="agl-tag">Your sample checklist status</span>
          <b>{done} of {all.length} items marked</b>
          <i aria-hidden="true"><s style={{ transform: `scaleX(${done / all.length})` }} /></i>
          <small>{n("ok")} reviewed · {n("att")} need attention · {n("na")} not applicable · {all.length - done} not marked</small>
        </div>
        <div className="agl-audit__btns">
          <button type="button" className="agl-link" onClick={() => setOpen(L.groups.map(() => true))}>Expand all</button>
          <button type="button" className="agl-link" onClick={() => setOpen(L.groups.map(() => false))}>Collapse all</button>
          <button type="button" className="agl-link" aria-pressed={only} onClick={() => setOnly((x) => !x)}>{only ? "Show the full checklist" : "View outstanding items"}</button>
          <button type="button" className="ag-btn ag-btn--ghost agl-reset" onClick={() => (setSt({}), setOnly(false))}>Reset checklist</button>
        </div>
      </div>
      {only ? (
        <div className="agl-audit__out">
          <h4>Outstanding items ({out.length})</h4>
          {out.length ? (
            <ul>{out.map(([k, t, gn]) => <li key={k}><span className={"agl-dot is-" + (st[k] || "none")} />{t}<small>{gn} · {st[k] === "att" ? "Needs attention" : "Not marked yet"}</small></li>)}</ul>
          ) : (
            <p>No outstanding items in your sample checklist.</p>
          )}
        </div>
      ) : (
        <div className="agl-audit__groups">
          {L.groups.map(([gn, items], gi) => {
            const id = "aud-g" + gi;
            const marked = items.filter((_, ii) => st[gi + "-" + ii]).length;
            return (
              <section key={gn} className={"agl-audit__g" + (open[gi] ? " is-open" : "")} aria-labelledby={id + "-h"}>
                <h4 id={id + "-h"}>
                  <button type="button" aria-expanded={!!open[gi]} aria-controls={id} onClick={() => setOpen((p) => p.map((x, k) => (k === gi ? !x : x)))}>
                    <span className="agl-audit__l">{"ABCDE"[gi]}</span>
                    {gn}
                    <small>{marked}/{items.length}</small>
                    <AF_I n="arrow" s={14} />
                  </button>
                </h4>
                <ul id={id} className={open[gi] ? "" : "is-off"}>
                  {items.map((t, ii) => {
                    const k = gi + "-" + ii;
                    return (
                      <li key={k} className={"is-" + (st[k] || "none")}>
                        <span className="agl-audit__t">{t}</span>
                        <span className="agl-audit__s" role="radiogroup" aria-label={t}>
                          {AGL_ST.map(([s, lab]) => (
                            <button key={s} type="button" role="radio" aria-checked={st[k] === s} className={"is-" + s + (st[k] === s ? " is-on" : "")} onClick={() => setSt((p) => ({ ...p, [k]: p[k] === s ? undefined : s }))}>
                              <AF_I n={s === "ok" ? "tick" : s === "att" ? "flag" : "cross"} s={13} />
                              {lab}
                            </button>
                          ))}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}
      <AGL_Note>{L.note} Items are illustrative and not every item applies to every business.</AGL_Note>
      <AGL_Cta label={L.cta} detail={{ areas: ["Audit readiness"] }} />
    </div>
  );
}

/* ============ Generic explorer (Funding Readiness Blueprint, Month-End Close Studio) ============ */
function AGL_Explorer({ g }) {
  const L = g.lab;
  const [on, setOn] = ee.useState(0);
  const it = L.items[on];
  const key = (e) => {
    const n = L.items.length;
    const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (map[e.key]) {
      e.preventDefault();
      const i = (on + map[e.key] + n) % n;
      setOn(i);
      const b = e.currentTarget.querySelectorAll("button")[i];
      b && b.focus();
    }
  };
  const studio = L.variant === "studio";
  return (
    <div className={"agl agl-ex" + (studio ? " agl-ex--studio" : " agl-ex--bp")}>
      <div className="agl-ex__map" onKeyDown={key}>
        {!studio && (
          <div className="agl-ex__core" aria-hidden="true">
            <AF_I n="doc" s={30} />
            <b>Business finance file</b>
          </div>
        )}
        {!studio && (
          <svg className="agl-ex__lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {L.items.map((_, k) => {
              const a = (k / L.items.length) * Math.PI * 2 - Math.PI / 2;
              return <line key={k} x1="50" y1="50" x2={50 + Math.cos(a) * 38} y2={50 + Math.sin(a) * 38} className={k === on ? "is-on" : ""} />;
            })}
          </svg>
        )}
        {L.items.map(([t, ic], k) => (
          <button key={t} type="button" className={"agl-ex__node agl-ex__node--" + k + (k === on ? " is-on" : "")} aria-pressed={k === on} onClick={() => setOn(k)} style={studio ? undefined : { "--a": (k / L.items.length) * 360 - 90 + "deg" }}>
            <span className="agl-ex__ic"><AF_I n={ic} s={20} /></span>
            <span className="agl-ex__n">{studio ? "Stage " + (k + 1) : String(k + 1).padStart(2, "0")}</span>
            <b>{t}</b>
          </button>
        ))}
      </div>
      <div className="agl-ex__panel" aria-live="polite">
        <span className="agl-tag">{L.status}</span>
        <h4>
          <span>{String(on + 1).padStart(2, "0")}</span>
          {it[0]}
        </h4>
        <p>{it[2]}</p>
        <p className="agl-ex__lt">Illustrative checklist — the type of information that may be reviewed:</p>
        <ul>{it[3].map((x) => <li key={x}><AF_I n="check" s={15} />{x}</li>)}</ul>
        <AGL_Cta label={L.cta} detail={{ areas: [it[0]] }} />
      </div>
      {L.note && <AGL_Note>{L.note}</AGL_Note>}
    </div>
  );
}

/* ============ MIS — explore a management report ============ */
function AGL_RepViz({ k }) {
  const bars = (arr, cls) => arr.map((h, i) => <i key={i} className={cls} style={{ "--h": h, "--i": i }} />);
  if (k === 0)
    return (
      <div className="agl-rv agl-rv--trend">
        <svg viewBox="0 0 120 60" preserveAspectRatio="none"><path className="l" d="M0 48 C 14 44, 22 40, 34 38 S 56 28, 66 30 S 90 18, 120 12" /><path className="f" d="M0 48 C 14 44, 22 40, 34 38 S 56 28, 66 30 S 90 18, 120 12 V60 H0Z" /></svg>
        <div className="agl-rv__cats">{["Category A", "Category B", "Category C"].map((t, i) => <span key={t}><b style={{ "--w": [0.62, 0.44, 0.28][i] }} />{t}</span>)}</div>
      </div>
    );
  if (k === 1)
    return (
      <div className="agl-rv agl-rv--profit">
        <div className="agl-rv__pair">{[0, 1, 2, 3, 4, 5].map((i) => <span key={i}><i className="r" style={{ "--h": [0.6, 0.66, 0.62, 0.72, 0.78, 0.82][i] }} /><i className="c" style={{ "--h": [0.5, 0.52, 0.55, 0.58, 0.6, 0.62][i] }} /></span>)}</div>
        <div className="agl-rv__gauge"><b>Margin</b><i /></div>
      </div>
    );
  if (k === 2) return <div className="agl-rv agl-rv--cash"><div className="agl-rv__io">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <span key={i}><i className="in" style={{ "--h": [0.5, 0.7, 0.4, 0.8, 0.6, 0.75, 0.55, 0.7][i] }} /><i className="out" style={{ "--h": [0.4, 0.45, 0.6, 0.5, 0.55, 0.5, 0.65, 0.45][i] }} /></span>)}</div><p className="agl-legend"><span className="b">Inflows</span><span className="a">Outflows</span></p></div>;
  if (k === 3) return <div className="agl-rv agl-rv--bva"><div className="agl-rv__pair">{[0, 1, 2, 3, 4, 5].map((i) => <span key={i}><i className="bud" style={{ "--h": [0.6, 0.62, 0.64, 0.66, 0.68, 0.7][i] }} /><i className="act" style={{ "--h": [0.58, 0.66, 0.6, 0.52, 0.7, 0.74][i] }} /></span>)}</div><span className="agl-rv__var">Variance to review</span><p className="agl-legend"><span className="b">Budget</span><span className="a">Actual</span></p></div>;
  if (k === 4)
    return (
      <div className="agl-rv agl-rv--wc">
        {["Receivables", "Inventory", "Payables", "Cash"].map((t, i) => <span key={t} className={"agl-rv__n agl-rv__n--" + i}>{t}</span>)}
        <svg viewBox="0 0 100 60" preserveAspectRatio="none"><path d="M18 14 L50 30 L82 14 M50 30 L50 50" /></svg>
      </div>
    );
  return (
    <div className="agl-rv agl-rv--exec">
      <div className="agl-rv__doc"><b>Executive summary</b>{["Key observations", "Agreed KPIs", "Variance highlights", "Management commentary"].map((t) => <p key={t}><em>{t}</em><i /><i /></p>)}</div>
    </div>
  );
}
function AGL_Report({ g }) {
  const L = g.lab;
  const [on, setOn] = ee.useState(0);
  return (
    <div className="agl agl-rep">
      <div className="agl-rep__nav" role="tablist" aria-label="Reporting views" aria-orientation="vertical">
        {L.items.map(([t], k) => (
          <button key={t} type="button" role="tab" id={"rep-t" + k} aria-selected={on === k} aria-controls="rep-p" tabIndex={on === k ? 0 : -1} className={on === k ? "is-on" : ""} onClick={() => setOn(k)} onKeyDown={(e) => {
            const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
            if (!d) return;
            e.preventDefault();
            const i = (on + d + L.items.length) % L.items.length;
            setOn(i);
            const b = document.getElementById("rep-t" + i);
            b && b.focus();
          }}>
            <span>{String(k + 1).padStart(2, "0")}</span>
            {t}
          </button>
        ))}
      </div>
      <div className="agl-rep__view" role="tabpanel" id="rep-p" aria-labelledby={"rep-t" + on}>
        <div className="agl-rep__top">
          <b>{L.items[on][0]}</b>
          <span className="agl-tag">Illustrative report view</span>
        </div>
        <AGL_RepViz k={on} />
        <p>{L.items[on][1]}</p>
        <AGL_Cta label={L.cta} detail={{ areas: [L.items[on][0] + " reporting"] }} />
      </div>
      <AGL_Note>Sample visuals with no real figures. The page is not connected to your accounting system.</AGL_Note>
    </div>
  );
}

/* ============ Due Diligence — financial evidence explorer ============ */
function AGL_Evidence({ g }) {
  const L = g.lab;
  const [on, setOn] = ee.useState(0);
  const [t, p, viz, lim] = L.items[on];
  let vis;
  if (viz === "bridge")
    vis = (
      <div className="agl-dd__bridge">
        <span className="a"><i />Reported earnings</span>
        <span className="b"><i />Potential normalisation adjustments</span>
        <span className="c"><i />Adjusted earnings analysis</span>
      </div>
    );
  else if (viz === "trend")
    vis = (
      <div className="agl-dd__trend">
        <svg viewBox="0 0 120 50" preserveAspectRatio="none"><path d="M0 40 L20 34 L40 36 L60 24 L80 26 L100 14 L120 16" /><circle cx="60" cy="24" r="3" /></svg>
        <ul><li>Reported trend</li><li>Period comparison</li><li className="is-y">Items requiring follow-up</li></ul>
      </div>
    );
  else if (viz.startsWith("formula:")) vis = <div className="agl-dd__f"><code>{viz.slice(8)}</code><span className="agl-tag">Simplified relationship</span></div>;
  else if (viz === "flow")
    vis = (
      <div className="agl-dd__flow">
        <span>Earnings</span>
        <AF_I n="arrow" s={18} />
        <span>Working-capital movement</span>
        <AF_I n="arrow" s={18} />
        <span>Operating cash-flow pattern</span>
      </div>
    );
  else vis = <ul className="agl-dd__list">{viz.slice(5).split("|").map((x) => <li key={x}><AF_I n="check" s={15} />{x}</li>)}</ul>;
  return (
    <div className="agl agl-dd">
      <div className="agl-dd__nav" role="tablist" aria-label="Evidence categories">
        {L.items.map(([n], k) => (
          <button key={n} type="button" role="tab" aria-selected={on === k} aria-controls="dd-p" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            <span>{"0" + (k + 1)}</span>
            {n}
          </button>
        ))}
      </div>
      <div className="agl-dd__main" role="tabpanel" id="dd-p" aria-live="polite">
        <span className="agl-tag">Illustrative educational example</span>
        <h4>{t}</h4>
        <p>{p}</p>
        {vis}
      </div>
      <div className="agl-dd__sum">
        <b>Selected: {t}</b>
        <p>{lim}</p>
      </div>
      <AGL_Note>{L.note}</AGL_Note>
      <AGL_Cta label={L.cta} detail={{ areas: [t] }} />
    </div>
  );
}

/* ============ Consulting — finance workflow lab ============ */
function AGL_Workflow({ g }) {
  const L = g.lab;
  const [on, setOn] = ee.useState(0);
  const [imp, setImp] = ee.useState(false);
  const it = L.items[on];
  const n = L.items.length;
  return (
    <div className={"agl agl-wf" + (imp ? " is-imp" : "")}>
      <div className="agl-wf__sel" role="tablist" aria-label="Workflow stages">
        {L.items.map(([t], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} aria-controls="wf-p" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            <span>{k + 1}</span>
            {t}
          </button>
        ))}
      </div>
      <div className="agl-wf__map" aria-hidden="true">
        <div className="agl-wf__track">
          {L.items.map(([t], k) => (
            <React_Frag key={t}>
              <span className={"agl-wf__node" + (k === on ? " is-on" : k === on - 1 ? " is-up" : k === on + 1 ? " is-down" : "")}>
                <b>{k + 1}</b>
                <em>{t}</em>
              </span>
              {k < n - 1 && <i className={"agl-wf__link" + (k === on - 1 || k === on ? " is-on" : "")} />}
            </React_Frag>
          ))}
        </div>
        <div className="agl-wf__imp">{L.improve.map((x, k) => <span key={x} style={{ "--k": k }}>{x}</span>)}</div>
      </div>
      <div className="agl-wf__panel" id="wf-p" role="tabpanel" aria-live="polite">
        <span className="agl-tag">Stage {on + 1} of {n}</span>
        <h4>{it[0]}</h4>
        <p>{it[1]}</p>
        <p className="agl-wf__ex"><b>What to examine</b> (illustrative)</p>
        <ul>{it[2].map((x) => <li key={x}><AF_I n="lens" s={14} />{x}</li>)}</ul>
        <p className="agl-wf__ud">
          {on > 0 && <span>Upstream: {L.items[on - 1][0]}</span>}
          {on < n - 1 && <span>Downstream: {L.items[on + 1][0]}</span>}
        </p>
        {imp && (
          <div className="agl-wf__ops">
            <b>Possible improvement areas</b>
            <ul>{L.improve.map((x) => <li key={x}><AF_I n="spark" s={14} />{x}</li>)}</ul>
            <small>Possible areas to explore — not a statement that your business has these problems.</small>
          </div>
        )}
      </div>
      <div className="agl-wf__ctl">
        <label className="agl-switch">
          <input type="checkbox" checked={imp} onChange={(e) => setImp(e.target.checked)} />
          <span aria-hidden="true" />
          Show improvement opportunities
        </label>
        <button type="button" className="ag-btn ag-btn--ghost agl-reset" onClick={() => (setOn(0), setImp(false))}>Reset workflow</button>
      </div>
      <AGL_Note>{L.note}</AGL_Note>
      <AGL_Cta label={L.cta} detail={{ areas: ["Accounting process consulting"] }} />
    </div>
  );
}
/* React_Frag comes from src/components/dm/ixkit.jsx */

/* ============ Guided brief (Business Finance, Startup & SME, MIS, Budgeting) ============ */
function AGL_Brief({ g }) {
  const B = g.brief;
  const [step, setStep] = ee.useState(0);
  const [ans, setAns] = ee.useState(() => B.steps.map(([, multi]) => (multi ? [] : "")));
  const [err, setErr] = ee.useState("");
  const n = B.steps.length;
  const done = step >= n;
  const pick = (i, o) => {
    setErr("");
    setAns((p) => p.map((a, k) => (k !== i ? a : B.steps[i][1] ? (a.includes(o) ? a.filter((x) => x !== o) : a.concat(o)) : o)));
  };
  const next = () => {
    const a = ans[step];
    if (!a || (Array.isArray(a) && !a.length)) return setErr("Please choose an option to continue.");
    setStep((s) => s + 1);
  };
  const val = (i) => (Array.isArray(ans[i]) ? agList(ans[i]) : agList([ans[i]]));
  const summary = B.tpl.replace(/\{(\d)\}/g, (m, i) => val(+i));
  return (
    <div className="agl agl-brief">
      <ol className="agl-brief__steps" aria-label="Progress">
        {B.steps.map(([q], k) => (
          <li key={q} className={(k === step ? "is-on " : "") + (k < step ? "is-done" : "")} aria-current={k === step ? "step" : undefined}>
            <span>{k < step ? <AF_I n="tick" s={13} /> : k + 1}</span>
            <em>Step {k + 1}</em>
          </li>
        ))}
        <li className={done ? "is-on" : ""} aria-current={done ? "step" : undefined}>
          <span>{done ? <AF_I n="doc" s={13} /> : n + 1}</span>
          <em>Brief</em>
        </li>
      </ol>
      {!done ? (
        <fieldset className="agl-brief__q" key={step}>
          <legend>
            <span>Question {step + 1} of {n}</span>
            {B.steps[step][0]}
            {B.steps[step][1] && <small> · choose any that apply</small>}
          </legend>
          <div className="agl-brief__opts">
            {B.steps[step][2].map((o) => {
              const on = B.steps[step][1] ? ans[step].includes(o) : ans[step] === o;
              return (
                <button key={o} type="button" className={"agl-chip" + (on ? " is-on" : "")} aria-pressed={on} onClick={() => pick(step, o)}>
                  {on && <AF_I n="tick" s={13} />}
                  {o}
                </button>
              );
            })}
          </div>
          {err && <p className="agl-err" role="alert">{err}</p>}
          <div className="agl-brief__nav">
            {step > 0 && <button type="button" className="agl-link" onClick={() => setStep((s) => s - 1)}>← Back</button>}
            <button type="button" className="ag-btn ag-btn--ac" onClick={next}>{step === n - 1 ? "Create my brief" : "Continue"} <AF_I n="arrow" s={15} /></button>
          </div>
        </fieldset>
      ) : (
        <div className="agl-brief__res" aria-live="polite">
          <span className="agl-tag">{B.title}</span>
          <p className="agl-brief__sum">“{summary}”</p>
          <p className="agl-brief__next"><b>{B.next.split(":")[0]}:</b>{B.next.split(":").slice(1).join(":")}</p>
          <div className="agl-brief__nav">
            <button type="button" className="agl-link" onClick={() => setStep(0)}>Edit answers</button>
            <button type="button" className="agl-link" onClick={() => (setAns(B.steps.map(([, m]) => (m ? [] : ""))), setStep(0))}>Start again</button>
            <AGL_Cta label={B.cta} detail={{ note: B.title + ": " + summary, areas: [] }} />
          </div>
        </div>
      )}
      {B.note && <AGL_Note>{B.note}</AGL_Note>}
    </div>
  );
}

/* ============ ITR — document checklist ============ */
function AGL_Docs({ g }) {
  const D = g.docs;
  const [sel, setSel] = ee.useState(() => D.groups.filter((x) => x[4]).map((x) => x[0]));
  const [show, setShow] = ee.useState(false);
  const tog = (k, fixed) => !fixed && setSel((p) => (p.includes(k) ? p.filter((x) => x !== k) : p.concat(k)));
  const list = D.groups.filter((x) => sel.includes(x[0]));
  return (
    <div className="agl agl-docs">
      <div className="agl-docs__pick" role="group" aria-label="What applies to you">
        {D.groups.map(([k, t, ic, , fixed]) => (
          <button key={k} type="button" className={"agl-docs__t" + (sel.includes(k) ? " is-on" : "") + (fixed ? " is-fixed" : "")} aria-pressed={sel.includes(k)} onClick={() => tog(k, fixed)} aria-disabled={fixed || undefined}>
            <span><AF_I n={ic} s={20} /></span>
            <b>{t}</b>
            <small>{fixed ? "Always needed" : sel.includes(k) ? "Applies to me" : "Tap if it applies"}</small>
          </button>
        ))}
      </div>
      <button type="button" className="ag-btn ag-btn--ac" aria-expanded={show} aria-controls="itr-list" onClick={() => setShow(true)}>
        {D.btn} <AF_I n="arrow" s={15} />
      </button>
      <div id="itr-list" className={"agl-docs__list" + (show ? "" : " is-off")} aria-live="polite">
        <h4>Your document checklist <span className="agl-tag">Based on your selections</span></h4>
        {list.map(([k, t, , items]) => (
          <div key={k}>
            <b>{t}</b>
            <ul>{items.map((x) => <li key={x}><span className="agl-box" aria-hidden="true" />{x}</li>)}</ul>
          </div>
        ))}
        <p className="agl-docs__f">The final checklist varies by income type, taxpayer status and assessment year, and is confirmed after we understand your situation.</p>
      </div>
      <AGL_Note>{D.note}</AGL_Note>
    </div>
  );
}

/* registry used by the page (AccountsFinance.jsx) */
const AGL_LABS = { runway: AGL_Runway, debteq: AGL_DebtEq, npv: AGL_Npv, fpa: AGL_Fpa, futures: AGL_Futures, audit: AGL_Audit, explorer: AGL_Explorer, report: AGL_Report, evidence: AGL_Evidence, workflow: AGL_Workflow };

export { AGL_Brief, AGL_Docs, AGL_LABS };
