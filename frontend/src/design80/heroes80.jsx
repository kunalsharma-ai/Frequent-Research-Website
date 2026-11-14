/*
 * Build 80 centre pieces. Each one is a small moving story; the words come from the service's spec (specs80.js).
 * Styles: c80.css (.h80-*). The piece fills its box (.c80k-hero, a size container), so units are cqw / cqh / cqmin.
 */
import * as ee from 'react';
import { Fl, n_ } from './kit80.jsx';

/* people tiles: a search runs and the right profiles light up, one by one */
function Grid({ q, people }) {
  return (
    <div className="h80-grid">
      <p className="h80-grid__q"><span>⌕</span>{q}<i /></p>
      <div className="h80-grid__tiles">
        {people.map(([t, s, c], i) => (
          <div key={i} className={"h80-grid__tile" + (c ? " is-hit" : "")} style={{ "--i": i, "--h": i * 40 }}>
            <b className="h80-av" style={{ "--h": i * 40 }}>{c && c.length === 2 ? <Fl c={c} /> : null}</b>
            <p><b>{t}</b><span>{s}</span></p>
            {c ? <em>✓</em> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

/* call desk: numbers dial, connect, finish; the voice wave moves */
function Call({ title, rows }) {
  return (
    <div className="h80-call">
      <div className="h80-call__head">
        <i className="h80-call__set"><svg viewBox="0 0 24 24"><path d="M4 13a8 8 0 0 1 16 0v4a2 2 0 0 1-2 2h-1v-6h3M4 13v4a2 2 0 0 0 2 2h1v-6H4" /></svg></i>
        <p><b>{title}</b><span>On call · 02:41</span></p>
        <i className="h80-call__rec">● REC</i>
      </div>
      <div className="h80-call__wave">{n_(28).map((i) => <i key={i} style={{ "--i": i, "--s": 0.3 + ((i * 37) % 10) / 13 }} />)}</div>
      {rows.map(([n, c], i) => (
        <p key={i} className="h80-call__row" style={{ "--i": i }}>
          <Fl c={c} /><span>{n}</span>
          <em className="h80-st"><b>Dialling…</b><b>Connected</b><b>✓ Complete</b></em>
        </p>
      ))}
    </div>
  );
}

/* messy answers go into the cleaning machine and come out as a clean table */
function Pipe({ dirty, clean, cols }) {
  return (
    <div className="h80-pipe">
      <div className="h80-pipe__in">{dirty.map((t, i) => <span key={i} style={{ "--i": i }}>{t}</span>)}</div>
      <div className="h80-pipe__box"><i className="h80-gear" /><i className="h80-gear h80-gear--2" /><small>clean · code · weight</small></div>
      <div className="h80-pipe__belt">{n_(6).map((i) => <i key={i} style={{ "--i": i }} />)}</div>
      <div className="h80-pipe__out">
        <p className="h80-pipe__th">{cols.map((c) => <b key={c}>{c}</b>)}</p>
        {clean.map((r, i) => <p key={i} className="h80-pipe__tr" style={{ "--i": i }}>{r.map((c, k) => <span key={k}>{c}</span>)}</p>)}
      </div>
    </div>
  );
}

/* heartbeat: the pulse line runs, specialists light up around it */
function Pulse({ roles }) {
  return (
    <div className="h80-pulse">
      <div className="h80-pulse__core"><i className="h80-pulse__cross" /><i className="h80-pulse__wave" /><i className="h80-pulse__wave h80-pulse__wave--2" /></div>
      <svg className="h80-pulse__ecg" viewBox="0 0 300 80" preserveAspectRatio="none"><path pathLength="1" d="M0 40 H70 L82 40 L90 16 L100 66 L110 6 L120 56 L128 40 H180 L190 40 L196 28 L204 52 L212 40 H300" /></svg>
      {roles.map(([t, c], i) => (
        <span key={t} className="h80-pulse__role" style={{ "--a": (i * 360) / roles.length + "deg", "--i": i }}>
          <b className="h80-av" style={{ "--h": 150 + i * 30 }}><Fl c={c} /></b><small>{t}</small>
        </span>
      ))}
    </div>
  );
}

/* field map: a tilted map, interviewers' pins drop city by city, routes draw between them */
function Map({ pins, label }) {
  return (
    <div className="h80-map">
      <div className="h80-map__plane">
        <svg className="h80-map__routes" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path pathLength="1" d={"M" + pins.map(([, x, y]) => x + " " + y).join(" L")} />
        </svg>
        {pins.map(([t, x, y], i) => (
          <span key={t} className="h80-map__pin" style={{ "--x": x + "%", "--y": y + "%", "--i": i }}>
            <i /><small>{t}</small>
          </span>
        ))}
      </div>
      <p className="h80-map__tab"><b>{label}</b><span><i /></span></p>
    </div>
  );
}

/* a survey fills itself: options are picked, the score is set, it is sent and counted */
function Form({ title, q, opts, pick }) {
  return (
    <div className="h80-form">
      <p className="h80-form__bar"><i /><i /><i /><span>{title}</span></p>
      <div className="h80-form__body">
        <p className="h80-form__prog"><i /></p>
        <p className="h80-form__q">{q}</p>
        {opts.map((t, i) => <p key={t} className={"h80-form__opt" + (i === pick ? " is-pick" : "")}><i />{t}</p>)}
        <p className="h80-form__nps">{n_(11).map((i) => <i key={i} className={i === 9 ? "is-pick" : ""}>{i}</i>)}</p>
        <p className="h80-form__send">Submit →</p>
      </div>
      <i className="h80-form__cursor" />
      <b className="h80-form__plus">+1 response</b>
    </div>
  );
}

/* group discussion: four faces on a video call speak in turn, their words become theme notes */
function Talk({ people, notes }) {
  return (
    <div className="h80-talk">
      <div className="h80-talk__tiles">
        {people.map(([t, q, c], i) => (
          <div key={t} className="h80-talk__tile" style={{ "--i": i, "--h": 200 + i * 45 }}>
            <b className="h80-av h80-av--lg" style={{ "--h": 200 + i * 45 }}><Fl c={c} /></b>
            <small>{t}</small>
            <p className="h80-talk__say">{q}</p>
          </div>
        ))}
      </div>
      <p className="h80-talk__notes">{notes.map((t, i) => <span key={t} style={{ "--i": i }}>{t}</span>)}</p>
    </div>
  );
}

/* a chart builds bar by bar, the winning bar gets its significance star */
function Chart({ title, groups, win, foot }) {
  return (
    <div className="h80-chart">
      <p className="h80-chart__t">{title}</p>
      <div className="h80-chart__plot">
        {[0, 1, 2, 3].map((i) => <i key={i} className="h80-chart__gl" style={{ "--i": i }} />)}
        {groups.map(([t, a, b], i) => (
          <div key={t} className="h80-chart__g" style={{ "--i": i }}>
            <i className="h80-chart__b" style={{ "--v": a }} /><i className="h80-chart__b h80-chart__b--2" style={{ "--v": b }} />
            {i === win ? <em className="h80-chart__star">★ sig.</em> : null}
            <small>{t}</small>
          </div>
        ))}
      </div>
      <p className="h80-chart__foot">{foot}</p>
    </div>
  );
}

/* a report deck: slides fly in one after another, each with its own chart */
function Deck({ slides }) {
  return (
    <div className="h80-deck">
      {slides.map(([t, k], i) => (
        <div key={t} className={"h80-deck__s h80-deck__s--" + k} style={{ "--i": i }}>
          <p className="h80-deck__t"><b>{t}</b><span>{i + 1}/{slides.length}</span></p>
          <div className="h80-deck__vis">
            {k === "bars" ? n_(5).map((j) => <i key={j} style={{ "--v": [0.5, 0.8, 0.62, 0.95, 0.7][j] }} />) : null}
            {k === "pie" ? <i className="h80-deck__pie" /> : null}
            {k === "line" ? <svg viewBox="0 0 100 40" preserveAspectRatio="none"><path pathLength="1" d="M0 34 L20 28 L40 30 L60 16 L80 18 L100 4" /></svg> : null}
          </div>
          <p className="h80-deck__k">→ Key takeaway</p>
        </div>
      ))}
    </div>
  );
}

/* a thinking path: question → … → decision, drawn step by step, the bulb lights at the end */
function Path({ steps }) {
  return (
    <div className="h80-path">
      <svg className="h80-path__line" viewBox="0 0 100 100" preserveAspectRatio="none"><path pathLength="1" d="M10 86 C 30 86, 20 60, 40 60 S 52 34, 70 34 S 86 12, 90 12" /></svg>
      {steps.map((t, i) => (
        <p key={t} className="h80-path__n" style={{ "--i": i, "--x": [10, 40, 70, 90][i] + "%", "--y": [86, 60, 34, 12][i] + "%" }}><b>{i + 1}</b><span>{t}</span></p>
      ))}
      <i className="h80-path__bulb"><b /></i>
    </div>
  );
}

/* the research cycle: a light runs round the steps, each lights up as it passes */
function Cycle({ steps, core }) {
  const n = steps.length;
  return (
    <div className="h80-cyc" style={{ "--n": n }}>
      <i className="h80-cyc__ring" /><i className="h80-cyc__run" />
      <p className="h80-cyc__core"><small>{core}</small>{steps.map((t, i) => <b key={t} style={{ "--i": i }}>{t}</b>)}</p>
      {steps.map((t, i) => (
        <span key={t} className="h80-cyc__n" style={{ "--a": (i * 360) / n + "deg", "--i": i }}><i>{i + 1}</i><small>{t}</small></span>
      ))}
    </div>
  );
}

export const HEROES = { grid: Grid, call: Call, pipe: Pipe, pulse: Pulse, map: Map, form: Form, talk: Talk, chart: Chart, deck: Deck, path: Path, cycle: Cycle };
