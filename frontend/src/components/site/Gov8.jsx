/* Build 65 update 8: Government & opinion poll research home section (replaces the base gov-home block). */
import * as ee from 'react';
import { useLazy } from '../../app/data/useLazy.js';
import { GOV_SERVICES, GOV_STATS } from '../../app/data/govFacts.jsx';
import { PpL } from '../dm/shared.jsx';

const GV8_PINS = ["dl", "up", "mh", "wb", "tn", "ka", "gj", "rj", "br", "or", "as", "tg"];
const GV8_POLL = [["Service access", 72], ["Speed of delivery", 58], ["Fairness", 66]];

function GV8_Map() {
  const ref = ee.useRef(null);
  /* build 74: the map's shapes (170 KB) load on their own, after the first screen */
  const INDIA_MAP = useLazy("india-map", () => import("../../app/data/mapIndia.jsx").then((m) => m.INDIA_MAP)) || {};
  const [pins, setPins] = ee.useState([]);
  ee.useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const out = [];
    GV8_PINS.forEach((id, i) => {
      const p = svg.querySelector('[data-id="' + id + '"]');
      if (!p || !p.getBBox) return;
      const b = p.getBBox();
      out.push({ id, x: b.x + b.width / 2, y: b.y + b.height / 2, d: (i % 6) * 0.45 });
    });
    setPins(out);
  }, [INDIA_MAP.locations]);
  const locs = INDIA_MAP.locations || [];
  return (
    <svg ref={ref} className="gv8-map__svg" viewBox={INDIA_MAP.viewBox || "0 0 612 696"} role="img" aria-label="Map of India with Frequent Research field coverage">
      <defs>
        <radialGradient id="gv8pin"><stop offset="0" stopColor="#FFC27A" stopOpacity=".95" /><stop offset="1" stopColor="#FFC27A" stopOpacity="0" /></radialGradient>
        <linearGradient id="gv8land" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2F6BFF" stopOpacity=".34" /><stop offset="1" stopColor="#6D4AFF" stopOpacity=".26" /></linearGradient>
      </defs>
      <g className="gv8-map__land">
        {locs.map((s) => <path key={s.id} data-id={s.id} d={s.path} className={GV8_PINS.includes(s.id) ? "is-on" : ""}><title>{s.name}</title></path>)}
      </g>
      <g className="gv8-map__pins" aria-hidden="true">
        {pins.map((p) => (
          <g key={p.id} transform={"translate(" + p.x + " " + p.y + ")"}>
            <circle className="gv8-pin__halo" r="22" fill="url(#gv8pin)" style={{ animationDelay: p.d + "s" }} />
            <circle className="gv8-pin__ring" r="9" style={{ animationDelay: p.d + "s" }} />
            <circle className="gv8-pin__dot" r="4.2" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function GV8_Home() {
  const m = Object.values(GOV_STATS);
  const types = GOV_SERVICES.slice(0, 8);
  return (
    <section className="gv8" aria-labelledby="gov-home">
      <div className="gv8__glow gv8__glow--a" aria-hidden="true" />
      <div className="gv8__glow gv8__glow--b" aria-hidden="true" />
      <div className="container gv8__in">
        <div className="gv8__grid">
          <div className="gv8__copy">
            <p className="gv8__kick"><span className="gv8__live" aria-hidden="true" />Government &amp; Opinion Poll Research</p>
            <h2 id="gov-home">Government &amp; opinion poll research built for <em>decisions that matter</em></h2>
            <p className="gv8__text">From large-scale citizen surveys to public opinion research, beneficiary studies and policy evaluation, Frequent Research helps organisations collect structured, reliable insights from diverse populations across markets and geographies.</p>
            <ul className="gv8__modes" aria-label="Research modes">
              {["CAPI", "CATI", "Online", "Face to face", "Mixed mode"].map((x) => <li key={x}>{x}</li>)}
            </ul>
            <div className="gv8__ctas">
              <PpL to="/government-opinion-research#brief" className="gv8-btn gv8-btn--solid">Discuss Your Research Requirement</PpL>
              <PpL to="/government-opinion-research" className="gv8-btn gv8-btn--ghost">Explore Government Research <span aria-hidden="true">→</span></PpL>
            </div>
          </div>
          <div className="gv8-map">
            <div className="gv8-map__orbit" aria-hidden="true" />
            <GV8_Map />
            <div className="gv8-poll" aria-hidden="true">
              <p className="gv8-poll__h"><span className="gv8__live" />Citizen pulse <small>illustrative</small></p>
              {GV8_POLL.map(([t, v], i) => (
                <div key={t} className="gv8-poll__row">
                  <span>{t}</span><b>{v}%</b>
                  <i><s style={{ "--v": v / 100, animationDelay: i * 0.35 + "s" }} /></i>
                </div>
              ))}
            </div>
            <p className="gv8-map__credit">Map: @svg-maps/india by Victor Cazanave, CC BY 4.0</p>
          </div>
        </div>
        <div className="gv8-stats">
          {m.map((a, i) => (
            <div key={a.label} className="gv8-stat" style={{ "--i": i }}>
              <b>{a.value}</b><span>{a.label}</span>
            </div>
          ))}
        </div>
        <div className="gv8-types">
          {types.map((a, i) => (
            <PpL key={a.t} to="/government-opinion-research" className="gv8-type" style={{ "--i": i }}>
              <span className="gv8-type__n">{String(i + 1).padStart(2, "0")}</span>
              <b>{a.t}</b>
              <span className="gv8-type__m">{a.method}</span>
              <span className="gv8-type__go" aria-hidden="true">→</span>
            </PpL>
          ))}
        </div>
      </div>
    </section>
  );
}

export { GV8_Home };
