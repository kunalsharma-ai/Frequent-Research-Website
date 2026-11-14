/*
 * Build 80 kit: one service story = a moving centre piece (the "hero", heroes80.jsx) + story cards that appear around it
 * (beats). Each service gets its own spec (specs80.js): its own centre piece and content, colours and mood.
 * Styles: c80.css (.c80k-*). Only transform / opacity move.
 */
import * as ee from 'react';
import FLAGS from '../assets/images/flags/flags-sprite.json';

export const n_ = (k) => Array.from({ length: k }, (_, i) => i);
export function Fl({ c }) {
  const i = FLAGS.order.indexOf(c);
  return i < 0 ? null : <i className="s79-flag" style={{ "--fx": i % FLAGS.cols, "--fy": Math.floor(i / FLAGS.cols) }} />;
}

/* a story card. at = where it sits (tl, tr, mr, b1, b2, t1, chip) */
function Beat({ b, i }) {
  const cls = "c80k-at--" + b.at;
  const st = { "--i": i };
  if (b.t === "bubble") return <p className={"c80-bubble c80k-say " + (b.r ? "c80-bubble--r " : "") + cls} style={st}>{b.x}</p>;
  if (b.t === "toast") return <p className={"c80-toast c80k-say " + cls} style={st}>{b.i ? <span className="c80k-ti">{b.i}</span> : null}<b>{b.b}</b> {b.x}</p>;
  if (b.t === "chip") return <p className={"c80-chip " + cls}>✓ {b.x}</p>;
  return (
    <div className={"c80-card c80k-card " + cls} style={st}>
      <p className="c80-card__h">{b.live ? <span className="c80-live" /> : null}{b.h}</p>
      {b.t === "stat" ? (
        <>
          <p className="c80k-big"><b>{b.v}</b>{b.d ? <span>{b.d}</span> : null}</p>
          {b.s ? <p className="c80k-sub">{b.s}</p> : null}
          {b.spark ? <svg className="c80k-spark" viewBox="0 0 120 34" preserveAspectRatio="none"><path d={b.spark === 2 ? "M0 8 L15 10 L30 9 L45 16 L60 14 L75 21 L90 20 L105 27 L120 30" : "M0 30 L15 27 L30 28 L45 20 L60 22 L75 13 L90 15 L105 6 L120 3"} pathLength="1" /></svg> : null}
        </>
      ) : null}
      {b.t === "bars" ? b.rows.map(([t, v, l], k) => (
        <p key={t} className="c80k-bar" style={{ "--v": v, "--k": k }}><span>{t}</span><i><b /></i><em>{l || Math.round(v * 100) + "%"}</em></p>
      )) : null}
      {b.t === "rings" ? (
        <div className="c80k-rings">
          {b.rows.map(([t, v], k) => (
            <div key={t} className="c80k-ring" style={{ "--v": v, "--k": k }}>
              <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" pathLength="100" /><circle className="is-on" cx="18" cy="18" r="15" pathLength="100" /></svg>
              <span>{Math.round(v * 100)}%</span><small>{t}</small>
            </div>
          ))}
        </div>
      ) : null}
      {b.t === "list" ? (
        <ul className="c80k-list">{b.rows.map((t, k) => <li key={t} style={{ "--k": k }}><i>✓</i>{t}</li>)}</ul>
      ) : null}
      {b.t === "tags" ? (
        <p className="c80k-tags">{b.rows.map((t, k) => <span key={t} style={{ "--k": k }}>{t}</span>)}</p>
      ) : null}
    </div>
  );
}

export function makeScene(spec, Hero) {
  function Scene() {
    return (
      <div className={"c80 c80k c80k--" + spec.hero.t + (spec.cls ? " " + spec.cls : "")}>
        {spec.fx !== "none" ? <i className={"c80k-fx c80k-fx--" + (spec.fx || "dots")} /> : null}
        <i className="c80k-glow" />
        <div className="c80k-hero"><Hero {...spec.hero} /></div>
        {spec.beats.map((b, i) => <Beat key={i} b={b} i={i} />)}
      </div>
    );
  }
  Scene.displayName = "Scene80";
  return Scene;
}
