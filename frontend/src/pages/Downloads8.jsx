/* Build 65 update 8: Downloads hub, six shelves as a dark bento with a different live visual on each tile */
import * as ee from 'react';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { K5_I } from '../components/site/Kit65.jsx';
import { DL5_SECS } from './Downloads65.jsx';
import { pc5Num } from '../data/PanelCountries65.jsx';

const DL8_AREA = { "consumer-panel-books": "c", "business-panel-books": "b", "healthcare-panel-books": "h", "quality-process": "q", "service-brochures": "s", "industries-case-studies": "i" };

function DL8_Vis({ k }) {
  if (k === "consumer-panel-books")
    return (
      <span className="dl8-v dl8-v--people" aria-hidden="true">
        {Array.from({ length: 36 }, (_, i) => (
          <i key={i} style={{ "--d": ((i * 37) % 23) * 0.18 + "s" }} />
        ))}
      </span>
    );
  if (k === "business-panel-books")
    return (
      <span className="dl8-v dl8-v--city" aria-hidden="true">
        {[46, 72, 58, 90, 64, 80, 52, 68, 40, 76].map((h, i) => (
          <i key={i} style={{ "--h": h / 100, "--d": i * 0.12 + "s" }} />
        ))}
      </span>
    );
  if (k === "healthcare-panel-books")
    return (
      <span className="dl8-v dl8-v--pulse" aria-hidden="true">
        <svg viewBox="0 0 300 80" preserveAspectRatio="none">
          <path d="M0 44 H70 l10 -18 l12 40 l14 -56 l12 46 l8 -12 H170 l8 -10 l10 22 l10 -12 H300" />
        </svg>
        <span className="dl8-v__scan" />
      </span>
    );
  if (k === "quality-process")
    return (
      <span className="dl8-v dl8-v--shield" aria-hidden="true">
        <span className="dl8-v__ring"><i /><i /><i /><i /></span>
        <K5_I n="shield" s={44} />
      </span>
    );
  if (k === "service-brochures")
    return (
      <span className="dl8-v dl8-v--fan" aria-hidden="true">
        {["#2F6BFF", "#C8577E", "#6D4AFF", "#0E9C88"].map((c, i) => (
          <i key={i} style={{ "--c": c, "--i": i }} />
        ))}
      </span>
    );
  return (
    <span className="dl8-v dl8-v--tiles" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        <i key={i} style={{ "--d": ((i * 7) % 24) * 0.15 + "s" }} />
      ))}
    </span>
  );
}

function DL8_Shelves({ ix, n }) {
  const sum = (a) => (a || []).reduce((t, c) => t + (c.panel || 0), 0);
  const fmt = (v) => pc5Num(v);
  const stat = {
    "consumer-panel-books": ix && ix.b2c ? [ix.b2c.length + " countries", fmt(sum(ix.b2c)) + " profiled consumers"] : ["…", ""],
    "business-panel-books": ix && ix.b2b ? [ix.b2b.length + " countries", fmt(sum(ix.b2b)) + " profiled professionals"] : ["…", ""],
    "healthcare-panel-books": ix && ix.hcp ? [ix.hcp.length + " countries", "Healthcare professionals, caregivers & patients"] : ["3 panels", "Healthcare professionals, caregivers & patients"],
    "quality-process": [n["quality-process"] + " services", "Market research, digital, IT, finance"],
    "service-brochures": [n["service-brochures"] + " brochures", "All services plus one per service"],
    "industries-case-studies": [n["industries-case-studies"] + " industries", "Sector overviews and case studies"],
  };
  return (
    <section className="dl8" aria-labelledby="dl8-h">
      <div className="container">
        <div className="dl8__head">
          <span className="dl8__kick"><K5_I n="layers" s={14} /> Choose a section</span>
          <h2 id="dl8-h">Six shelves. <em>Pick yours.</em></h2>
          <p>Every document opens as a branded PDF after a short form, asked again for each download.</p>
        </div>
        <div className="dl8__grid">
          {DL5_SECS.map((s, i) => (
            <HmLink key={s.k} to={"/downloads/" + s.k} className={"dl8-t dl8-t--" + DL8_AREA[s.k]} style={{ "--c": s.c, "--c2": s.c2, "--i": i }} aria-label={`${s.t}: ${s.d}`}>
              <span className="dl8-t__glow" aria-hidden="true" />
              <DL8_Vis k={s.k} />
              <span className="dl8-t__top">
                <span className="dl8-t__ic"><K5_I n={s.ic} s={20} /></span>
                <span className="dl8-t__n">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <span className="dl8-t__body">
                <b>{s.t}</b>
                <span className="dl8-t__d">{s.d}</span>
                <span className="dl8-t__stat">
                  <strong>{stat[s.k][0]}</strong>
                  {stat[s.k][1] ? <small>{stat[s.k][1]}</small> : null}
                </span>
              </span>
              <span className="dl8-t__go" aria-hidden="true"><K5_I n="arrow" s={16} /></span>
            </HmLink>
          ))}
        </div>
      </div>
    </section>
  );
}

export { DL8_Shelves };
