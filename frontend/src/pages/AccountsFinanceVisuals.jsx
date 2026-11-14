/*
 * Accounts & Finance — build 63 hero visuals, one per creative concept. Prefix AGV_. Styles: src/styles/af63.css (agv-).
 * Each visual is a fixed-ratio stage (container-query units, nothing positioned outside it, so it can never overlap the
 * headline) built from layered HTML/SVG with restrained CSS 3D depth. All motion is transform / opacity loops; values
 * shown are illustrative and labelled as such by the hero caption. Decorative visuals are aria-hidden; the Tax Planning
 * observatory is interactive (buttons with a live description).
 */
import * as ee from 'react';
import { AF_I } from './AccountsFinance.jsx';

const agvRows = (n) => Array.from({ length: n }, (_, k) => k);

/* 1 · Bookkeeping — The Living Ledger */
function AGV_Ledger() {
  const rows = [["Sales · INV-2041", "Categorized"], ["Supplier bill · 3318", "Matched"], ["Card · Travel", "Review required"], ["Bank fee", "Matched"], ["Monthly close", "Report prepared"]];
  return (
    <div className="agv agv-ledger" aria-hidden="true">
      <div className="agv-3d">
        <div className="agv-ledger__docs">
          {["Invoice", "Receipt", "Bill", "Statement"].map((t, k) => (
            <span key={t} className="agv-paper" style={{ "--k": k }}>
              <b>{t}</b>
              <i />
              <i />
            </span>
          ))}
        </div>
        <div className="agv-ledger__book">
          <div className="agv-ledger__h">
            <b>General ledger</b>
            <span>Workspace</span>
          </div>
          {rows.map(([t, s], k) => (
            <p key={t} className={"agv-ledger__r is-" + k} style={{ "--k": k }}>
              <span>{t}</span>
              <i />
              <em className={"agv-chip agv-chip--" + (s === "Review required" ? "w" : s === "Report prepared" ? "r" : "ok")}>{s}</em>
            </p>
          ))}
        </div>
        <div className="agv-ledger__bank">
          <b>Bank</b>
          {[0, 1, 2, 3].map((k) => (
            <i key={k} style={{ "--k": k }} />
          ))}
        </div>
        <svg className="agv-ledger__links" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M84 40 C 74 40, 72 38, 64 37" />
          <path d="M84 50 C 74 50, 72 47, 64 46" />
          <path d="M84 60 C 74 60, 72 64, 64 64" />
        </svg>
        <div className="agv-ledger__chart">
          <em>Monthly view</em>
          {[0.45, 0.62, 0.5, 0.72, 0.66, 0.84].map((h, k) => (
            <i key={k} style={{ "--h": h, "--k": k }} />
          ))}
        </div>
        <div className="agv-ledger__ar">
          <span className="a">AR</span>
          <span className="p">AP</span>
        </div>
        <div className="agv-orbit">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

/* 2 · Tax Planning — The Decision Observatory (interactive) */
function AGV_Observatory({ g }) {
  const paths = g.hero.paths;
  const [on, setOn] = ee.useState(-1);
  const n = paths.length;
  const pos = (k) => {
    const a = (k / n) * Math.PI * 2 - Math.PI / 2;
    return [50 + Math.cos(a) * 38, 50 + Math.sin(a) * 38];
  };
  const cur = on >= 0 ? paths[on] : null;
  return (
    <div className="agv agv-obs">
      <div className="agv-obs__field">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="agv-obs__svg" aria-hidden="true">
          {[14, 24, 34, 44].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} />
          ))}
          {paths.map((_, k) => {
            const [x, y] = pos(k);
            return <path key={k} className={k === on ? "is-on" : ""} d={`M50 50 Q ${50 + (x - 50) * 0.35 + (k % 2 ? 8 : -8)} ${50 + (y - 50) * 0.35 + (k % 2 ? -6 : 6)} ${x} ${y}`} />;
          })}
        </svg>
        <div className="agv-obs__compass" aria-hidden="true">
          <i />
          <b>Decision point</b>
        </div>
        {paths.map(([t], k) => {
          const [x, y] = pos(k);
          return (
            <button key={t} type="button" className={"agv-obs__node" + (k === on ? " is-on" : "")} style={{ left: x + "%", top: y + "%" }} aria-pressed={k === on} onClick={() => setOn(k === on ? -1 : k)}>
              <span>{String(k + 1).padStart(2, "0")}</span>
              {t}
            </button>
          );
        })}
      </div>
      <div className="agv-obs__panel" aria-live="polite">
        {cur ? (
          <>
            <b>{cur[0]}</b>
            <p>{cur[1]}</p>
          </>
        ) : (
          <>
            <b>Scenario comparison</b>
            <p>Choose a pathway to see the questions it raises. Assumptions defined · options under review · planning summary.</p>
          </>
        )}
        <span className="agl-tag">Illustrative</span>
      </div>
    </div>
  );
}

/* 3 · ITR — The Return Journey */
function AGV_Journey() {
  const docs = ["Form 16", "Interest income", "AIS · Form 26AS", "Deductions", "Capital gains"];
  const path = ["Documents", "Review", "Computation", "Return preparation", "Client review"];
  return (
    <div className="agv agv-jr" aria-hidden="true">
      <div className="agv-3d">
        <div className="agv-jr__stack">
          {docs.map((t, k) => (
            <span key={t} className="agv-paper agv-jr__doc" style={{ "--k": k }}>
              <b>{t}</b>
              <i />
              <i />
            </span>
          ))}
        </div>
        <div className="agv-jr__ws">
          <b>Review workspace</b>
          {["Salary", "Other income", "Tax statements", "Deductions"].map((t, k) => (
            <p key={t} style={{ "--k": k }}>
              <i />
              {t}
            </p>
          ))}
        </div>
        <div className="agv-jr__ret">
          <span className="agv-jr__ay">Assessment year · illustrative</span>
          <b>Return preview</b>
          {[0, 1, 2].map((k) => (
            <i key={k} />
          ))}
          <em>Prepared for client review</em>
        </div>
        <svg className="agv-jr__links" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M30 30 C 38 30, 38 40, 44 40" />
          <path d="M30 55 C 38 55, 38 50, 44 50" />
          <path d="M70 45 C 74 45, 74 40, 78 40" />
        </svg>
      </div>
      <ol className="agv-jr__path">
        {path.map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* 4 · GST — The reconciliation engine */
function AGV_Gst() {
  return (
    <div className="agv agv-gst" aria-hidden="true">
      <div className="agv-gst__grid" />
      <span className="agv-gst__tag">Workflow preview</span>
      <div className="agv-gst__col agv-gst__col--a">
        <em>Purchase register</em>
        {[1042, 1043, 1044, 1045].map((n, k) => (
          <span key={n} className={k === 3 ? "is-x" : ""}>
            INV-{n}
          </span>
        ))}
      </div>
      <div className="agv-gst__col agv-gst__col--b">
        <em>GSTR-2B</em>
        {[1042, 1043, 1044].map((n) => (
          <span key={n}>INV-{n}</span>
        ))}
        <span className="is-miss">INV-1045 · not reflected</span>
      </div>
      <div className="agv-gst__col agv-gst__col--c">
        <em>Return preparation</em>
        <span>GSTR-1</span>
        <span>GSTR-3B</span>
        <span>Reconciliation summary</span>
      </div>
      <svg className="agv-gst__links" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M31 ${33 + k * 12} L 41 ${33 + k * 12}`} />
        ))}
        <path className="is-x" d="M31 69 L 41 69" />
        <path d="M66 45 L 74 40" />
      </svg>
      {[0, 1, 2].map((k) => (
        <i key={k} className="agv-gst__dot" style={{ "--k": k, top: 33 + k * 12 + "%" }} />
      ))}
      <div className="agv-gst__status">
        <b>Illustrative reconciliation</b>
        <span className="ok">3 matched</span>
        <span className="x">1 item to review</span>
      </div>
    </div>
  );
}

/* 5 · TDS — The quarterly compliance control room */
function AGV_Tds() {
  const Q = [["Q1", "24Q"], ["Q2", "26Q"], ["Q3", "27Q"], ["Q4", "Quarterly records"]];
  const steps = [["Deduction record", "DR-0418"], ["Challan reference", "CH-0092"], ["Quarterly return", "26Q · Q2"], ["Certificate workflow", "Form 16A"]];
  return (
    <div className="agv agv-tds" aria-hidden="true">
      <div className="agv-tds__q">
        {Q.map(([a, b], k) => (
          <span key={a} style={{ "--k": k }}>
            <b>{a}</b>
            <em>{b}</em>
          </span>
        ))}
      </div>
      <div className="agv-3d">
        <div className="agv-tds__path">
          {steps.map(([t, id], k) => (
            <div key={t} className="agv-tds__card" style={{ "--k": k }}>
              <code>{id}</code>
              <b>{t}</b>
              <i />
            </div>
          ))}
          <i className="agv-tds__pulse" />
        </div>
      </div>
      <div className="agv-tds__status">
        <span className="agl-tag">Illustrative workflow</span>
        {["Challan mapping", "Return data review", "Certificate workflow"].map((t, k) => (
          <p key={t} style={{ "--k": k }}>
            <i />
            {t}
          </p>
        ))}
      </div>
      <div className="agv-tds__labels">
        {["Deduction Records", "Challans", "Quarterly Statements", "Form 16 / 16A", "TRACES Workflow"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* 6 · Payroll — The monthly payroll rhythm */
function AGV_Payroll() {
  const st = ["Employee information", "Attendance & leave", "Gross salary", "PF · ESI · PT · TDS", "Net pay", "Payslip & reports"];
  return (
    <div className="agv agv-pay" aria-hidden="true">
      <div className="agv-pay__ring">
        <i className="agv-pay__track" />
        <i className="agv-pay__runner" />
        {st.map((t, k) => (
          <span key={t} className="agv-pay__st" style={{ "--a": (k / st.length) * 360 + "deg", "--k": k }}>
            <b>{k + 1}</b>
            <em>{t}</em>
          </span>
        ))}
      </div>
      <div className="agv-pay__slip">
        <div className="agv-pay__sh">
          <span className="agv-pay__av" />
          <b>Payslip</b>
          <em>Confidential</em>
        </div>
        {["Gross", "PF · ESI · PT", "TDS"].map((t, k) => (
          <p key={t}>
            <span>{t}</span>
            <i style={{ "--w": [0.9, 0.36, 0.22][k] }} />
          </p>
        ))}
        <div className="agv-pay__net">
          <span>Net pay</span>
          <i />
        </div>
      </div>
      {[0, 1, 2, 3].map((k) => (
        <span key={k} className={"agv-pay__p agv-pay__p--" + k}>
          <i />
        </span>
      ))}
      <span className="agv-pay__lbl">Monthly payroll cycle</span>
    </div>
  );
}

/* 7 · FP&A — The scenario horizon */
function AGV_Foresight() {
  return (
    <div className="agv agv-fs" aria-hidden="true">
      <svg className="agv-fs__svg" viewBox="0 0 200 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="agvFsBand" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#8C83FF" stopOpacity=".38" />
            <stop offset="1" stopColor="#8C83FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80, 100].map((y) => (
          <line key={y} className="grid" x1="0" x2="200" y1={y} y2={y} />
        ))}
        <line className="now" x1="96" x2="96" y1="6" y2="114" />
        <path className="band" d="M96 62 C 130 40, 160 24, 200 14 L 200 96 C 160 90, 130 80, 96 62 Z" fill="url(#agvFsBand)" />
        <path className="hist" d="M0 88 C 18 84, 30 80, 44 76 S 70 66, 96 62" />
        <path className="sc sc--g" d="M96 62 C 130 44, 160 26, 200 14" />
        <path className="sc sc--b" d="M96 62 C 130 56, 160 50, 200 44" />
        <path className="sc sc--d" d="M96 62 C 130 70, 160 82, 200 94" />
        <path className="cash" d="M0 104 C 30 100, 60 98, 96 96 S 150 90, 200 82" />
        <circle className="dot" cx="96" cy="62" r="3" />
      </svg>
      <span className="agv-fs__l agv-fs__l--g">Growth case</span>
      <span className="agv-fs__l agv-fs__l--b">Base case</span>
      <span className="agv-fs__l agv-fs__l--d">Downside case</span>
      <span className="agv-fs__now">Today</span>
      <span className="agv-fs__cash">Cash-flow projection</span>
      <div className="agv-fs__bva">
        <em>Budget vs actual</em>
        {[0, 1, 2, 3].map((k) => (
          <span key={k}>
            <i className="b" style={{ "--h": [0.6, 0.7, 0.66, 0.74][k] }} />
            <i className="a" style={{ "--h": [0.56, 0.74, 0.6, 0.7][k] }} />
          </span>
        ))}
      </div>
      <span className="agv-fs__dec">Decision point</span>
    </div>
  );
}

/* 8 · Business Finance — The documentation blueprint */
function AGV_Blueprint() {
  const sheets = ["Funding Requirements", "Financial Statements", "Cash-Flow Assessment", "Existing Debt Obligations", "Financial Projections", "Documentation Checklist"];
  return (
    <div className="agv agv-bp" aria-hidden="true">
      <div className="agv-bp__grid" />
      <div className="agv-3d">
        {sheets.map((t, k) => (
          <span key={t} className={"agv-bp__sheet agv-bp__sheet--" + k} style={{ "--k": k }}>
            <code>{"FR-0" + (k + 1)}</code>
            <b>{t}</b>
            <i />
            <i />
          </span>
        ))}
        <div className="agv-bp__file">
          <code>FILE · 00</code>
          <b>Financial readiness file</b>
          <i />
          <i />
          <i />
        </div>
      </div>
      <svg className="agv-bp__trace" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="6" y="8" width="88" height="70" rx="1" />
        <path d="M30 43 H 40 M 60 43 H 70 M 50 22 V 30 M 50 56 V 64" />
      </svg>
      <ol className="agv-bp__path">
        {["Review", "Identify gaps", "Organise", "Validate"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* 9 · Startup & SME — The founder's desk */
function AGV_Founder() {
  return (
    <div className="agv agv-fd" aria-hidden="true">
      <div className="agv-3d">
        <div className="agv-fd__led agv-fd__m" style={{ "--k": 0 }}>
          <b>General ledger</b>
          {agvRows(5).map((k) => (
            <p key={k}>
              <i />
              <i />
            </p>
          ))}
        </div>
        <div className="agv-fd__rec agv-fd__m" style={{ "--k": 1 }}>
          <b>Bank reconciliation</b>
          <p>
            <i />
            <em>Matched</em>
          </p>
          <p>
            <i />
            <em>Matched</em>
          </p>
          <p>
            <i />
            <em className="w">Query</em>
          </p>
        </div>
        <div className="agv-fd__exp agv-fd__m" style={{ "--k": 2 }}>
          <b>Expenses</b>
          <span className="agv-fd__donut" />
        </div>
        <div className="agv-fd__close agv-fd__m" style={{ "--k": 3 }}>
          <b>Month-end close</b>
          {["Transactions organised", "Bank records reconciled", "Expenses categorised", "Reports prepared"].map((t, k) => (
            <p key={t} style={{ "--k": k }}>
              <span className="agv-fd__tick" />
              {t}
            </p>
          ))}
        </div>
        <div className="agv-fd__dash agv-fd__m" style={{ "--k": 4 }}>
          <b>Founder dashboard</b>
          <div>
            {[0.4, 0.6, 0.5, 0.78, 0.7].map((h, k) => (
              <i key={k} style={{ "--h": h }} />
            ))}
          </div>
        </div>
        <div className="agv-fd__rep agv-fd__m" style={{ "--k": 5 }}>
          <b>Monthly report</b>
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

/* 10 · MIS — The signal composition */
function AGV_Signal() {
  return (
    <div className="agv agv-sig" aria-hidden="true">
      <svg className="agv-sig__waves" viewBox="0 0 200 120" preserveAspectRatio="none">
        {[0, 1, 2].map((k) => (
          <path key={k} d={`M0 ${70 + k * 10} C 30 ${50 + k * 10}, 50 ${92 + k * 6}, 80 ${70 + k * 8} S 140 ${46 + k * 8}, 200 ${62 + k * 10}`} />
        ))}
      </svg>
      <div className="agv-3d">
        <div className="agv-sig__main">
          <b>Performance overview</b>
          <svg viewBox="0 0 120 50" preserveAspectRatio="none">
            <path className="rev" d="M0 42 C 16 38, 24 30, 36 32 S 58 20, 72 22 S 98 10, 120 8" />
            <path className="cost" d="M0 46 C 20 44, 40 40, 60 38 S 100 32, 120 30" />
            <circle cx="72" cy="22" r="2.6" />
          </svg>
          <span className="agv-sig__var">Variance · review</span>
        </div>
        <div className="agv-sig__kpi">
          {["Revenue", "Margin", "Cash", "DSO"].map((t, k) => (
            <span key={t} style={{ "--k": k }}>
              <em>{t}</em>
              <svg viewBox="0 0 40 12" preserveAspectRatio="none">
                <path d={["M0 10 L10 8 L20 9 L30 4 L40 2", "M0 6 L10 7 L20 5 L30 6 L40 4", "M0 8 L10 6 L20 7 L30 3 L40 5", "M0 4 L10 5 L20 7 L30 6 L40 8"][k]} />
              </svg>
            </span>
          ))}
        </div>
        <div className="agv-sig__bva">
          <em>Budget vs actual</em>
          {[0, 1, 2, 3, 4].map((k) => (
            <span key={k}>
              <i className="b" style={{ "--h": [0.6, 0.64, 0.68, 0.7, 0.74][k] }} />
              <i className="a" style={{ "--h": [0.58, 0.7, 0.62, 0.52, 0.76][k] }} />
            </span>
          ))}
        </div>
        <div className="agv-sig__cash">
          <em>Cash flow</em>
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <i key={k} className={k % 3 === 2 ? "n" : ""} style={{ "--h": [0.5, 0.7, 0.35, 0.8, 0.6, 0.4][k] }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* 11 · Budgeting — The three futures map */
function AGV_Futures() {
  const cps = ["Revenue assumptions", "Operating expenses", "Cash requirements", "Department budgets", "Review points", "Forecast updates"];
  return (
    <div className="agv agv-fu" aria-hidden="true">
      <svg className="agv-fu__svg" viewBox="0 0 200 130" preserveAspectRatio="none">
        {[30, 60, 90, 120, 150, 180].map((x) => (
          <line key={x} className="grid" x1={x} x2={x} y1="8" y2="122" />
        ))}
        <path className="base0" d="M6 92 C 30 92, 46 86, 66 80" />
        <path className="br br--c" d="M66 80 C 100 84, 140 92, 196 100" />
        <path className="br br--b" d="M66 80 C 100 74, 140 66, 196 58" />
        <path className="br br--o" d="M66 80 C 100 62, 140 38, 196 18" />
        {[[30, 89], [66, 80], [110, 70], [150, 64], [110, 86], [150, 46]].map(([x, y], k) => (
          <circle key={k} className="cp" cx={x} cy={y} r="2.6" style={{ "--k": k }} />
        ))}
      </svg>
      <span className="agv-fu__l agv-fu__l--o">Optimistic</span>
      <span className="agv-fu__l agv-fu__l--b">Base</span>
      <span className="agv-fu__l agv-fu__l--c">Conservative</span>
      <ul className="agv-fu__cps">
        {cps.map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ul>
      <div className="agv-fu__time">
        {["Now", "Q1", "Q2", "Q3", "Q4"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* 12 · Audit — The evidence trail */
function AGV_Archive() {
  return (
    <div className="agv agv-ar" aria-hidden="true">
      <div className="agv-3d">
        <div className="agv-ar__folder">
          {["Schedules", "Reconciliations", "Evidence", "Controls"].map((t, k) => (
            <span key={t} className="agv-ar__tab" style={{ "--k": k }}>
              {t}
            </span>
          ))}
          <div className="agv-ar__body">
            <b>Evidence index</b>
            {["Financial schedules", "Reconciliation review", "Supporting evidence", "Control documentation", "Open items", "Review status"].map((t, k) => (
              <p key={t} style={{ "--k": k }}>
                <code>{"E-" + String(k + 1).padStart(2, "0")}</code>
                {t}
                <i className={k === 4 ? "is-w" : ""} />
              </p>
            ))}
          </div>
        </div>
        <div className="agv-ar__cal">
          <b>Compliance calendar</b>
          <div>
            {agvRows(14).map((k) => (
              <i key={k} className={k === 4 || k === 9 ? "is-on" : k === 12 ? "is-w" : ""} />
            ))}
          </div>
        </div>
        <div className="agv-ar__doc">
          <b>Reconciliation</b>
          <i />
          <i />
          <s>Reviewed</s>
        </div>
      </div>
      <ol className="agv-ar__trail">
        {["Collected", "Reviewed", "Gap identified", "Action tracked"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* 13 · Virtual CFO — The executive finance cockpit */
function AGV_Cockpit() {
  const wk = [52, 58, 49, 63, 57, 66, 60, 71, 65, 74, 69, 78, 72];
  return (
    <div className="agv agv-ck" aria-hidden="true">
      <div className="agv-ck__run">
        <div className="agv-ck__rh">
          <b>Cash runway</b>
          <span>13-week cash view</span>
        </div>
        <div className="agv-ck__bars">
          {wk.map((h, k) => (
            <i key={k} style={{ "--h": h / 100, "--k": k }} />
          ))}
        </div>
        <svg viewBox="0 0 130 40" preserveAspectRatio="none" className="agv-ck__line">
          <path d="M0 30 C 20 26, 30 28, 45 22 S 80 16, 95 12 S 120 8, 130 6" />
        </svg>
      </div>
      <div className="agv-ck__trend">
        <em>Revenue vs cost</em>
        <svg viewBox="0 0 60 30" preserveAspectRatio="none">
          <path className="r" d="M0 24 L15 20 L30 18 L45 12 L60 8" />
          <path className="c" d="M0 26 L15 24 L30 22 L45 20 L60 18" />
        </svg>
      </div>
      <div className="agv-ck__wc">
        <em>Working capital</em>
        <span className="agv-ck__g" />
      </div>
      <div className="agv-ck__kpi">
        {["Margin", "DSO", "Burn", "Runway"].map((t, k) => (
          <span key={t} style={{ "--k": k }}>
            {t}
          </span>
        ))}
      </div>
      <div className="agv-ck__note">
        <b>CFO review · action</b>
        <p>Collections to chase · supplier terms to review</p>
        <i />
      </div>
    </div>
  );
}

/* 14 · Corporate Finance — The capital structure map */
function AGV_Capital() {
  return (
    <div className="agv agv-cap" aria-hidden="true">
      <svg className="agv-cap__svg" viewBox="0 0 200 140" preserveAspectRatio="none">
        <path className="l l--a" d="M100 40 L 40 92" />
        <path className="l l--b" d="M100 40 L 100 96" />
        <path className="l l--c" d="M100 40 L 160 92" />
        <path className="alt" d="M40 92 C 70 112, 130 112, 160 92" />
      </svg>
      <div className="agv-cap__obj">
        <em>Corporate objective</em>
        <b>Fund the next phase</b>
      </div>
      {[["Internal funds", "a"], ["Debt", "b"], ["Equity", "c"]].map(([t, c]) => (
        <span key={t} className={"agv-cap__src agv-cap__src--" + c}>
          {t}
        </span>
      ))}
      <i className="agv-cap__mark" />
      <div className="agv-cap__alloc">
        <em>Capital allocation · illustrative</em>
        <div>
          <i style={{ flexBasis: "22%" }} />
          <i style={{ flexBasis: "48%" }} />
          <i style={{ flexBasis: "30%" }} />
        </div>
      </div>
      <div className="agv-cap__case">
        <b>Investment case</b>
        {["NPV", "IRR", "Payback"].map((t, k) => (
          <p key={t}>
            <em>{t}</em>
            <i style={{ "--w": [0.7, 0.5, 0.35][k] }} />
          </p>
        ))}
      </div>
    </div>
  );
}

/* 15 · Investment Planning — The opportunity observatory */
function AGV_Observe() {
  return (
    <div className="agv agv-ob" aria-hidden="true">
      <div className="agv-ob__inst">
        {[0, 1, 2, 3].map((k) => (
          <i key={k} className={"agv-ob__ring agv-ob__ring--" + k} />
        ))}
        <i className="agv-ob__ticks" />
        <i className="agv-ob__sweep" />
        <div className="agv-ob__core">
          <em>Investment question</em>
          <b>Which opportunity?</b>
        </div>
        {["A", "B", "C"].map((t, k) => (
          <span key={t} className={"agv-ob__op agv-ob__op--" + k}>
            {t}
          </span>
        ))}
        <i className="agv-ob__focus" />
      </div>
      {[["Capital required", "a"], ["Cash-flow timeline", "b"], ["Risk · sensitivity", "c"]].map(([t, c]) => (
        <span key={t} className={"agv-ob__ann agv-ob__ann--" + c}>
          {t}
        </span>
      ))}
      <div className="agv-ob__metrics">
        {["NPV", "IRR", "Payback"].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* 16 · Due Diligence — The financial evidence board */
function AGV_Evidence() {
  return (
    <div className="agv agv-ev" aria-hidden="true">
      <div className="agv-3d">
        <div className="agv-ev__wp agv-ev__wp--a">
          <code>WP-01</code>
          <b>Revenue bridge</b>
          <svg viewBox="0 0 80 30" preserveAspectRatio="none">
            <path d="M0 24 L16 20 L32 22 L48 12 L64 14 L80 6" />
          </svg>
        </div>
        <div className="agv-ev__wp agv-ev__wp--b">
          <code>WP-02</code>
          <b>Normalisation review</b>
          <div className="agv-ev__br">
            <i style={{ "--h": 0.8 }} />
            <i className="adj" style={{ "--h": 0.22 }} />
            <i style={{ "--h": 0.62 }} />
          </div>
        </div>
        <div className="agv-ev__wp agv-ev__wp--c">
          <code>WP-03</code>
          <b>Cash-flow check</b>
          <i />
          <i />
        </div>
        <span className="agv-ev__note agv-ev__note--a">Working capital</span>
        <span className="agv-ev__note agv-ev__note--b">Debt-like item?</span>
        <span className="agv-ev__note agv-ev__note--c">Ref · DR-114</span>
        <i className="agv-ev__mark agv-ev__mark--a" />
        <i className="agv-ev__mark agv-ev__mark--b" />
      </div>
      <svg className="agv-ev__red" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M18 30 C 30 40, 40 40, 52 34" />
        <path d="M60 62 C 70 70, 80 66, 86 56" />
      </svg>
      <span className="agv-ev__tag">Transaction review</span>
    </div>
  );
}

/* 17 · Consulting — The finance workflow blueprint */
function AGV_Studio() {
  const st = ["Source documents", "Transaction processing", "General ledger", "Reconciliation", "Financial reporting", "Management review"];
  return (
    <div className="agv agv-st" aria-hidden="true">
      <div className="agv-st__map">
        {st.map((t, k) => (
          <span key={t} className={"agv-st__n agv-st__n--" + k} style={{ "--k": k }}>
            <b>{k + 1}</b>
            {t}
          </span>
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="agv-st__lines">
          <path d="M18 22 H 82 V 66 H 18" />
          <path className="hot" d="M18 22 H 82 V 66 H 18" />
        </svg>
        <i className="agv-st__run" />
        <span className="agv-st__neck">
          <i className="b">Bottleneck</i>
          <i className="g">Improved</i>
        </span>
      </div>
      <div className="agv-st__fix">
        <div>
          <em>Friction</em>
          {["Process gaps", "Approval bottlenecks", "Repetitive manual tasks", "Reporting delays"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <AF_I n="arrow" s={18} />
        <div>
          <em>Improvement</em>
          {["Documented workflows", "Defined responsibilities", "Practical controls", "Recommendations"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const AGV = { ledger: AGV_Ledger, observatory: AGV_Observatory, journey: AGV_Journey, gst: AGV_Gst, tds: AGV_Tds, payroll: AGV_Payroll, foresight: AGV_Foresight, blueprint: AGV_Blueprint, founder: AGV_Founder, signal: AGV_Signal, futures: AGV_Futures, archive: AGV_Archive, cockpit: AGV_Cockpit, capital: AGV_Capital, observe: AGV_Observe, evidence: AGV_Evidence, studio: AGV_Studio };

export { AGV };
