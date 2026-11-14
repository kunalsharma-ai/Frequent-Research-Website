/*
 * Build 80 centre pieces, set 3 (technology pieces). Styles: k80c.css (.h80-*).
 */
import * as ee from 'react';
import { n_ } from './kit80.jsx';

/* AI: documents go in, the network lights up layer by layer, answers come out */
function Neural({ ins, outs }) {
  const L = [3, 5, 5, 2];
  return (
    <div className="h80-nn">
      <div className="h80-nn__in">{ins.map((t, i) => <p key={t} style={{ "--i": i }}>{t}</p>)}</div>
      <div className="h80-nn__net">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {L.slice(0, -1).flatMap((n, l) => n_(n).flatMap((a) => n_(L[l + 1]).map((b) => (
            <line key={l + "-" + a + "-" + b} x1={l * 33.3} y1={((a + 0.5) * 100) / n} x2={(l + 1) * 33.3} y2={((b + 0.5) * 100) / L[l + 1]} style={{ "--l": l }} />
          ))))}
        </svg>
        {L.flatMap((n, l) => n_(n).map((a) => <i key={l + "." + a} style={{ "--x": l * 33.3 + "%", "--y": ((a + 0.5) * 100) / n + "%", "--l": l }} />))}
      </div>
      <div className="h80-nn__out">{outs.map((t, i) => <p key={t} style={{ "--i": i }}><b>✓</b>{t}</p>)}</div>
    </div>
  );
}

/* API: two systems talk; requests go right, answers come back */
function Api({ a, b, code }) {
  return (
    <div className="h80-api">
      <div className="h80-api__sys"><i /><b>{a}</b></div>
      <div className="h80-api__wire">
        {n_(3).map((i) => <span key={i} className="h80-api__pk" style={{ "--i": i }}>GET</span>)}
        {n_(3).map((i) => <span key={"r" + i} className="h80-api__pk h80-api__pk--r" style={{ "--i": i }}>200</span>)}
      </div>
      <div className="h80-api__sys h80-api__sys--b"><i /><b>{b}</b></div>
      <pre className="h80-api__code">{code.map((l, i) => <span key={i} style={{ "--i": i }}>{l}</span>)}</pre>
    </div>
  );
}

/* support tickets: each one goes open → in progress → fixed, inside the time promised */
function Tickets({ rows }) {
  return (
    <div className="h80-tix">
      <p className="h80-tix__h"><b>Support desk</b><span>SLA 4 h</span></p>
      {rows.map(([id, t, p], i) => (
        <div key={id} className="h80-tix__r" style={{ "--i": i }}>
          <span className="h80-tix__id">{id}</span><p><b>{t}</b><small>{p}</small></p>
          <em className="h80-st"><b>Open</b><b>Working</b><b>✓ Fixed</b></em>
        </div>
      ))}
    </div>
  );
}

/* CI/CD: code moves through build, test, deploy; servers scale up in the cloud */
function Pipeline({ steps }) {
  return (
    <div className="h80-ci">
      <div className="h80-ci__cloud"><i className="h80-ci__puff" />{n_(4).map((i) => <i key={i} className="h80-ci__srv" style={{ "--i": i }}><b /><b /></i>)}</div>
      <div className="h80-ci__steps">
        {steps.map((t, i) => <p key={t} style={{ "--i": i }}><b>{i + 1}</b>{t}<em>✓</em></p>)}
        <i className="h80-ci__run" />
      </div>
    </div>
  );
}

/* building blocks: modules drop in and lock together into one app */
function Blocks({ mods }) {
  return (
    <div className="h80-blk">
      {mods.map(([t, h], i) => <p key={t} className="h80-blk__b" style={{ "--i": i, "--h": h }}><b>{t}</b></p>)}
      <p className="h80-blk__base">Your business app</p>
    </div>
  );
}

/* code editor: lines type themselves, the run passes */
function Code({ file, lines }) {
  return (
    <div className="h80-code">
      <p className="h80-form__bar h80-code__bar"><i /><i /><i /><span>{file}</span></p>
      <pre>{lines.map(([t, k], i) => <span key={i} className={"h80-code__l is-" + (k || "x")} style={{ "--i": i }}><em>{i + 1}</em>{t}</span>)}</pre>
      <p className="h80-code__run"><b>▶ Run</b><span>✓ All checks passed · 0.8 s</span></p>
    </div>
  );
}

/* shield: attacks fly in and bounce off, the lock stays shut */
function Shield() {
  return (
    <div className="h80-sh">
      <i className="h80-sh__wave" /><i className="h80-sh__wave h80-sh__wave--2" />
      <div className="h80-sh__s"><i className="h80-sh__lock" /></div>
      {n_(6).map((i) => <i key={i} className="h80-sh__hit" style={{ "--a": i * 60 + 20 + "deg", "--i": i }} />)}
    </div>
  );
}

/* checkout: card details fill in, pay is pressed, the order is confirmed */
function Checkout({ total }) {
  return (
    <div className="h80-co">
      <div className="h80-co__card"><i className="h80-co__chip" /><b>•••• •••• •••• 4821</b><span>RIYA SHARMA</span><i className="h80-co__logo" /></div>
      <div className="h80-co__box">
        <p className="h80-co__row"><span>Subtotal</span><b>{total[0]}</b></p>
        <p className="h80-co__row"><span>Shipping</span><b>Free</b></p>
        <p className="h80-co__row h80-co__tot"><span>Total</span><b>{total[1]}</b></p>
        <p className="h80-co__pay"><span>Pay {total[1]}</span><span>✓ Paid</span></p>
        <p className="h80-co__ways"><i>UPI</i><i>Card</i><i>COD</i></p>
      </div>
    </div>
  );
}

/* ERP: gears for each department turn together */
function Gears({ mods }) {
  return (
    <div className="h80-gr">
      {mods.map((t, i) => (
        <div key={t} className={"h80-gr__g h80-gr__g--" + i}><i /><b>{t}</b></div>
      ))}
    </div>
  );
}

/* roadmap: quarters along a road; milestones light up as the marker moves */
function Roadmap({ steps }) {
  return (
    <div className="h80-rm">
      <svg className="h80-rm__road" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M6 90 C 30 90, 20 64, 46 62 S 70 36, 52 26 S 70 8, 94 8" /><path className="is-on" pathLength="1" d="M6 90 C 30 90, 20 64, 46 62 S 70 36, 52 26 S 70 8, 94 8" /></svg>
      {steps.map(([q, t], i) => (
        <p key={q} className="h80-rm__m" style={{ "--i": i, "--x": [6, 46, 52, 94][i] + "%", "--y": [90, 62, 26, 8][i] + "%" }}><b>{q}</b><span>{t}</span></p>
      ))}
    </div>
  );
}

/* mobile app: screens swap inside the phone, the store rating appears */
function Devices({ screens, rating }) {
  return (
    <div className="h80-dev">
      <div className="h80-phone h80-dev__ph">
        <div className="h80-phone__scr">
          {screens.map(([t, k], i) => (
            <div key={t} className={"h80-dev__s h80-dev__s--" + k} style={{ "--i": i }}>
              <p className="h80-dev__t">{t}</p>
              <i className="h80-dev__hero" />
              <div className="h80-dev__rows">{n_(3).map((j) => <i key={j} />)}</div>
              <p className="h80-dev__btn">Continue</p>
            </div>
          ))}
          <p className="h80-dev__nav">{n_(4).map((j) => <i key={j} />)}</p>
        </div>
      </div>
      <p className="h80-dev__store"><b>{rating}</b><span>★★★★★</span><small>App Store · Google Play</small></p>
    </div>
  );
}

/* SaaS stack: layers of the product rise and lock, users stream in on top */
function Stack({ layers }) {
  return (
    <div className="h80-stk">
      {layers.map((t, i) => <div key={t} className="h80-stk__l" style={{ "--i": i, "--n": layers.length }}><b>{t}</b></div>)}
      {n_(6).map((i) => <i key={i} className="h80-stk__u" style={{ "--i": i }} />)}
    </div>
  );
}

/* tests: the list runs, every test turns green, one bug is caught and squashed */
function Tests({ rows }) {
  return (
    <div className="h80-qa">
      <p className="h80-qa__h"><b>Test run #482</b><span><i /></span></p>
      {rows.map((t, i) => <p key={t} className="h80-qa__r" style={{ "--i": i }}><em className="h80-qa__st"><b>…</b><b>✓</b></em>{t}</p>)}
      <div className="h80-qa__bug"><i /><b>Bug caught</b></div>
    </div>
  );
}

/* UI/UX: a grey wireframe turns into the finished design */
function Wire({ title }) {
  return (
    <div className="h80-ux">
      <div className="h80-ux__f h80-ux__f--w"><i className="h80-ux__nav" /><i className="h80-ux__hero" /><i className="h80-ux__l" /><i className="h80-ux__l h80-ux__l--s" /><div className="h80-ux__cards"><i /><i /><i /></div></div>
      <div className="h80-ux__f h80-ux__f--d"><i className="h80-ux__nav" /><div className="h80-ux__hero"><b>{title}</b><span>Get started</span></div><i className="h80-ux__l" /><i className="h80-ux__l h80-ux__l--s" /><div className="h80-ux__cards"><i /><i /><i /></div></div>
      <i className="h80-ux__wipe" />
      <p className="h80-ux__sw">{["#6d28d9", "#ec4899", "#f59e0b", "#0ea5e9"].map((c) => <i key={c} style={{ background: c }} />)}</p>
    </div>
  );
}

/* web app: sidebar app where new records slide into the table */
function App({ title, rows }) {
  return (
    <div className="h80-app">
      <p className="h80-form__bar"><i /><i /><i /><span>app.yourcompany.com</span></p>
      <div className="h80-app__body">
        <div className="h80-app__side">{n_(5).map((i) => <i key={i} className={i === 1 ? "is-on" : ""} />)}</div>
        <div className="h80-app__main">
          <p className="h80-app__t"><b>{title}</b><span>+ New</span></p>
          {rows.map(([a, b, c], i) => <p key={a} className="h80-app__r" style={{ "--i": i }}><b>{a}</b><span>{b}</span><em>{c}</em></p>)}
        </div>
      </div>
    </div>
  );
}

/* website build: the page assembles block by block, then goes live */
function Site({ url, title }) {
  return (
    <div className="h80-site">
      <p className="h80-form__bar"><i /><i /><i /><span>{url}</span></p>
      <div className="h80-site__pg">
        <p className="h80-site__nav" style={{ "--i": 0 }}><b>Brand</b><i /><i /><i /></p>
        <div className="h80-site__hero" style={{ "--i": 1 }}><b>{title}</b><span>Book a call</span></div>
        <div className="h80-site__cards" style={{ "--i": 2 }}><i /><i /><i /></div>
        <p className="h80-site__foot" style={{ "--i": 3 }} />
      </div>
      <p className="h80-site__live"><i className="c80-live" /> Live · loads in 0.9 s</p>
    </div>
  );
}

/* uptime monitor: green bars march, a backup and an update tick off */
function Status({ checks }) {
  return (
    <div className="h80-up">
      <p className="h80-up__h"><b>All systems normal</b><span>99.98% uptime</span></p>
      <div className="h80-up__bars">{n_(30).map((i) => <i key={i} className={i === 11 ? "is-warn" : ""} style={{ "--i": i }} />)}</div>
      {checks.map(([t, s], i) => <p key={t} className="h80-up__c" style={{ "--i": i }}><b>✓</b><span>{t}</span><small>{s}</small></p>)}
    </div>
  );
}

export const HEROES_C = { neural: Neural, api: Api, tickets: Tickets, pipeline: Pipeline, blocks: Blocks, code: Code, shield: Shield, checkout: Checkout, gears: Gears, roadmap: Roadmap, devices: Devices, stack: Stack, tests: Tests, wire: Wire, app: App, site: Site, status: Status };
export { ee };
