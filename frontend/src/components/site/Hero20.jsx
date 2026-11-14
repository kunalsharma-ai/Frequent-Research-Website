/*
 * Build 65 update 20 — home hero, "All services" slide visual (Kunal: the planets still looked dull). HZ_All20,
 * "the growth engine room": your brief (a card that writes itself) sits in the middle and fires data pulses into
 * four live engine screens: Market Research counts responses, Digital Marketing pops notifications, IT & Development
 * types code and deploys, Accounts & Finance stacks coins. A spotlight walks the screens in turn while a big growth
 * arrow draws itself behind them. Transform/opacity loops only. Styles hero20.css (hz20-).
 */
import * as ee from 'react';
import { FRK_I } from './FrKit.jsx';
import { FRL_FR } from './Logos13.jsx';
import { HZ_TC, hzProds, hzSvc } from './Hero63.jsx';
import { AB17_IMG } from '../../data/ab17Img.jsx';
import { PR5_Logo } from './PR5Logo.jsx';

const HZ20_K = { "market-research": "mr", "digital-marketing": "dm", "it-development": "it", "accounts-finance": "af" };
const HZ20_POS = [
  [20, 17],
  [80, 17],
  [20, 58],
  [80, 58],
];
const HZ20_C = { x: 50, y: 38 };
function HZ20_Widget({ k }) {
  if (k === "mr")
    return (
      <div className="hz20-w hz20-w--mr">
        <div className="hz20-bars">
          {[0.55, 0.8, 0.45, 0.95, 0.7].map((h, j) => (
            <i key={j} style={{ "--h": h, "--j": j }} />
          ))}
        </div>
        <span className="hz20-live">
          <i /> responses coming in
        </span>
      </div>
    );
  if (k === "dm")
    return (
      <div className="hz20-w hz20-w--dm">
        {["New lead from search", "Ad clicks are rising", "Post shared 1.2k times"].map((t, j) => (
          <span key={j} className="hz20-note" style={{ "--j": j }}>
            <FRK_I n={["target", "rocket", "spark"][j]} s={11} /> {t}
          </span>
        ))}
        <span className="hz20-hearts">
          {[0, 1, 2].map((j) => (
            <i key={j} style={{ "--j": j }}>♥</i>
          ))}
        </span>
      </div>
    );
  if (k === "it")
    return (
      <div className="hz20-w hz20-w--it">
        {[0.8, 0.55, 0.7].map((w, j) => (
          <i key={j} className="hz20-code" style={{ "--w": w, "--j": j }} />
        ))}
        <span className="hz20-prog">
          <i />
        </span>
        <span className="hz20-ok">
          <FRK_I n="check" s={10} /> Live
        </span>
      </div>
    );
  return (
    <div className="hz20-w hz20-w--af">
      <span className="hz20-coins">
        {[0, 1, 2, 3].map((j) => (
          <i key={j} style={{ "--j": j }} />
        ))}
      </span>
      <span className="hz20-ledger">
        {[0, 1, 2].map((j) => (
          <b key={j} style={{ "--j": j }}>
            <FRK_I n="check" s={9} />
          </b>
        ))}
      </span>
    </div>
  );
}
function HZ_All20({ verts, total, nC }) {
  const P = hzProds();
  const img = (slug) => AB17_IMG[HZ20_K[slug]];
  return (
    <div className="hzv hz20" aria-hidden="true">
      <div className="hz20-sky">
        <span className="hz20-beam" />
        <span className="hz20-grow">
          <span className="hz20-grow__in">
            <svg viewBox="0 0 100 60" preserveAspectRatio="none">
              <defs>
                <linearGradient id="hz20g" x1="0" x2="1">
                  <stop offset="0" stopColor="#9FE7DC" stopOpacity="0" />
                  <stop offset=".5" stopColor="#B9A8FF" />
                  <stop offset="1" stopColor="#FFC27A" />
                </linearGradient>
              </defs>
              <path d="M0 56 C 18 54, 26 46, 38 44 S 58 40, 66 28 S 84 12, 98 4" fill="none" stroke="url(#hz20g)" strokeWidth="1.6" vectorEffect="non-scaling-stroke" />
              <path d="M0 56 C 18 54, 26 46, 38 44 S 58 40, 66 28 S 84 12, 98 4 L 98 60 L 0 60 Z" fill="url(#hz20g)" opacity=".08" />
            </svg>
          </span>
        </span>
      </div>
      <div className="hz20-up">
        <span className="hz20-up__shaft">
          {[0, 1, 2].map((j) => (
            <i key={j} style={{ "--j": j }} />
          ))}
        </span>
        <span className="hz20-up__badge">
          <FRK_I n="arrow" s={13} /> Real growth
        </span>
      </div>
      <div className="hz20-wires">
        {HZ20_POS.map(([x, y], k) => {
          const dx = x - HZ20_C.x,
            dy = y - HZ20_C.y,
            len = Math.hypot(dx, dy),
            a = (Math.atan2(dy, dx) * 180) / Math.PI;
          return (
            <span key={k} className="hz20-wire" style={{ "--len": len, "--a": a + "deg", "--k": k, "--c": HZ_TC[k] }}>
              <i />
              <i />
            </span>
          );
        })}
      </div>
      <div className="hz20-deck">
        {verts.slice(0, 4).map((v, k) => {
          const key = HZ20_K[v.slug];
          return (
            <div key={v.slug} className={"hz20-scr hz20-scr--" + key} style={{ "--x": HZ20_POS[k][0], "--y": HZ20_POS[k][1], "--k": k, "--c": HZ_TC[k] }}>
              <span className="hz20-scr__glow" />
              <span className="hz20-scr__top">
                <span className="hz20-scr__img" style={{ backgroundImage: "url(" + img(v.slug) + ")" }} />
                <span className="hz20-scr__t">
                  <b>{v.name}</b>
                  <em>{hzSvc(v).length} services</em>
                </span>
                <span className="hz20-scr__dot" />
              </span>
              <HZ20_Widget k={key} />
            </div>
          );
        })}
        <div className="hz20-brief">
          <span className="hz20-brief__ring" />
          <span className="hz20-brief__head">
            <span className="hz20-brief__logo"><FRL_FR kind="icon" tilt={0} rich /></span>
            <span>
              <b>Your brief</b>
              <em>to 4 engines</em>
            </span>
          </span>
          {[0.92, 0.7, 0.84].map((w, j) => (
            <i key={j} className="hz20-brief__line" style={{ "--w": w, "--j": j }} />
          ))}
          <span className="hz20-brief__stamp">
            <FRK_I n="spark" s={11} /> Sent to all 4
          </span>
        </div>
      </div>
      <div className="hzx-bar hz20-bar">
        <span>
          <b>{total || 67}</b> services
        </span>
        <span>
          <b>{nC}</b> countries
        </span>
        <span className="hzx-bar__p">
          {P.map((p, k) => (
            <span key={p.id} style={{ "--k": k }}>
              <PR5_Logo p={p} v="mark" still />
            </span>
          ))}
          <b>{P.length || 7}</b> products
        </span>
      </div>
    </div>
  );
}

export { HZ_All20 };
