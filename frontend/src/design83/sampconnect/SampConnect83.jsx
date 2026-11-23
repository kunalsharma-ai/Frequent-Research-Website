/*
 * Build 83.2 (Kunal, 22 Nov 2026): SampConnect page, redesigned.
 * The hero carries over the SampConnect showcase's hero: the 3D globe with dotted continents, city arcs and orbit
 * (ScGlobe.js, three.js, loaded after the page), aurora, perspective grid floor, greetings in six languages,
 * word-by-word headline, serif gradient line and the rotating verb. Every section below has its own moving visual:
 * the app window rising on scroll, gold and violet tapes, a bento of live mini scenes, a mock call with live captions,
 * an offline queue that syncs, a channel orbit, a Connect ID network, fanned module cards, an assistant that answers.
 * Content and screenshots come from the showcase (sc-data.js). One H1 (HeroH1). Reduced motion stops every loop.
 */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { HeroH1 } from '../../app/shared/HeroH1.jsx';
import { usePageMeta } from '../../app/SiteApp.jsx';
import css from './sc83.css?inline';
import serifUrl from './fonts/instrument-serif-latin-400-italic.woff2';
import { ScMark, ScLogo } from './ScMark.jsx';
import { SX19_Nudge } from '../../components/site/Nudge19.jsx';
import { PR5_SITE } from '../../data/Sampledge65.jsx';
import {
  SC, SC_IMG, SC_STATS, SC_WHY, SC_TOUR, SC_CALLS, SC_SYNC, SC_CHANNELS, SC_NET, SC_IDS, SC_MODS, SC_AI, SC_AI_DEMO,
  SC_SEC, SC_HOW, SC_USES, SC_CMP_COLS, SC_CMP, SC_CMP_NOTE, SC_ALL, SC_SOON, SC_MOBILE, SC_VERBS, SC_TAPE, SC_BUBBLES,
  SC_MOD_COL, SC_CAPTION,
} from './sc-data.js';

const FONT = `@font-face{font-family:"SC Serif";src:url(${serifUrl}) format("woff2");font-style:italic;font-weight:400;font-display:swap}`;

const P = {
  server: 'M4 4h16v6H4zM4 14h16v6H4zM8 7h.01M8 17h.01', shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  wifi: 'M2 8.5a15 15 0 0 1 20 0M5 12a10 10 0 0 1 14 0M8.5 15.5a5 5 0 0 1 7 0M12 19h.01', globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18',
  inbox: 'M3 13h5l2 3h4l2-3h5M5 5h14l2 8v6H3v-6z', layers: 'M12 3 2 8l10 5 10-5-10-5ZM2 13l10 5 10-5M2 17l10 5 10-5',
  brush: 'M14 4l6 6-8 8H6v-6zM4 20h4', chat: 'M4 5h16v11H9l-5 4z', home: 'M3 11l9-7 9 7v9H3zM9 20v-6h6v6',
  calendar: 'M4 5h16v15H4zM4 9h16M8 3v4M16 3v4', file: 'M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5', check: 'M5 12.5l4.5 4.5L19 7',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2', video: 'M3 6h12v12H3zM15 10l6-3v10l-6-3', image: 'M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15 9h.01',
  captions: 'M3 5h18v14H3zM7 11h4M7 15h7M14 11h3', rec: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z', user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3 6',
  grid: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z', key: 'M14 10a4 4 0 1 0-1.2 2.8L20 20M17 17l2-2', lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01', card: 'M3 6h18v12H3zM3 10h18', code: 'M8 8l-5 4 5 4M16 8l5 4-5 4',
  folder: 'M3 6h6l2 2h10v11H3z', spark: 'M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z',
  arrow: 'M5 12h14M13 6l6 6-6 6', play: 'M8 5v14l11-7z', x: 'M6 6l12 12M18 6 6 18', dot: 'M12 12h.01',
  phone: 'M7 2h10v20H7zM10 18h4', approve: 'M3 4h18v16H3zM8 12l3 3 5-6', sync: 'M20 11a8 8 0 0 0-14.3-4.9L4 8M4 4v4h4M4 13a8 8 0 0 0 14.3 4.9L20 16M20 20v-4h-4',
  wifiOff: 'M2 8.5a15 15 0 0 1 6-3M22 8.5a15 15 0 0 0-8.5-3.9M5 12a10 10 0 0 1 4-2M19 12a10 10 0 0 0-2-1.3M8.5 15.5a5 5 0 0 1 7 0M3 3l18 18',
};
function I({ n, s = 18 }) {
  return (
    <svg className="sc-ic" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={P[n] || P.dot} />
    </svg>
  );
}
const still = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
function useOn(margin = '0px 0px -12% 0px') {
  const ref = ee.useRef(null);
  const [on, setOn] = ee.useState(false);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setOn(true);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (setOn(true), io.disconnect())), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, on];
}
function Sec({ id, cls = '', kick, title, lead, soon, children, center }) {
  const [ref, on] = useOn();
  return (
    <section ref={ref} id={id} className={'sc-sec ' + cls + (on ? ' is-on' : '')} aria-labelledby={id + '-h'}>
      <div className="container">
        <header className={'sc-head' + (center ? ' sc-head--c' : '')}>
          <span className="sc-kick"><i aria-hidden="true" />{kick}{soon ? <em className="sc-soon">Coming soon</em> : null}</span>
          <h2 id={id + '-h'}>{title}</h2>
          {lead ? <p>{lead}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
// real pixel sizes, so the browser keeps the right space before each screenshot loads (no layout shift)
const SC_DIMS = new Map([[SC_IMG.home, [1600, 1111]], [SC_IMG.analytics, [1600, 1111]], [SC_IMG.mOffline, [900, 625]], [SC_IMG.themesGrid, [1400, 984]], [SC_IMG.themes, [1400, 1724]]]);
function Frame({ src, alt, url = 'app.sampconnect.yourcompany.com', eager, cls = '' }) {
  const [w, h] = SC_DIMS.get(src) || [1600, 1000];
  return (
    <figure className={'sc-frame ' + cls}>
      <span className="sc-frame__bar" aria-hidden="true"><i /><i /><i /><span>{url}</span></span>
      <img src={src} width={w} height={h} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchpriority={eager ? 'high' : undefined} />
    </figure>
  );
}
function Phone({ src, alt, eager }) {
  return (
    <figure className="sc-phone">
      <span className="sc-phone__island" aria-hidden="true" />
      <img src={src} width="520" height="872" alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </figure>
  );
}
function Tape({ items, tone = 'gold', rev }) {
  const all = [...items, ...items];
  return (
    <div className={'sc-tape sc-tape--' + tone} aria-hidden="true">
      <div className={'sc-tape__track' + (rev ? ' is-rev' : '')}>
        {all.map((x, i) => <span key={i}>{x}<svg width="18" height="18" viewBox="0 0 24 24"><path d={P.spark} fill="currentColor" /></svg></span>)}
      </div>
    </div>
  );
}

/* ---------- hero: the showcase globe ---------- */
function Rotator() {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (still()) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % SC_VERBS.length), 1900);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="sc-rot" aria-hidden="true">
      {SC_VERBS.map((w, k) => <b key={w} className={k === i ? 'is-on' : k === (i + SC_VERBS.length - 1) % SC_VERBS.length ? 'is-out' : ''}>{w}.</b>)}
    </span>
  );
}
function Globe() {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    let stop, gone = false, t1, t2;
    const go = () => {
      if (gone || !ref.current) return;
      import('./ScGlobe.js').then((m) => { if (!gone && ref.current) stop = m.mount(ref.current, { reduced: still(), lite: window.innerWidth < 760 }); }).catch(() => {});
    };
    // after the page has loaded and gone quiet, or at once on the first touch, scroll or pointer move
    const kick = () => { clearTimeout(t1); off(); go(); };
    const ev = ['pointermove', 'pointerdown', 'scroll', 'keydown', 'touchstart'];
    const off = () => ev.forEach((e) => window.removeEventListener(e, kick));
    ev.forEach((e) => window.addEventListener(e, kick, { passive: true, once: true }));
    const later = () => { t1 = setTimeout(() => (window.requestIdleCallback ? requestIdleCallback(kick, { timeout: 1500 }) : kick()), 2200); };
    if (document.readyState === 'complete') later(); else { t2 = () => later(); window.addEventListener('load', t2, { once: true }); }
    return () => { gone = true; off(); clearTimeout(t1); t2 && window.removeEventListener('load', t2); stop && stop(); };
  }, []);
  return (
    <div className="sc-globe" ref={ref} aria-hidden="true">
      <span className="sc-planet"><i /><i /><i /></span>
    </div>
  );
}
const W = ({ children, d, cls = '' }) => <span className="sc-w"><span className={cls} style={{ '--d': d + 's' }}>{children}</span></span>;
function Hero() {
  return (
    <section className="sc-hero" aria-labelledby="sc-h1">
      <div className="sc-aurora" aria-hidden="true"><span /><span /><span /></div>
      <div className="sc-floor" aria-hidden="true" />
      <div className="sc-hero__globe">
        <Globe />
        {SC_BUBBLES.map(([t, l, x, y, d]) => <span key={l} lang={l} className="sc-bub" aria-hidden="true" style={{ left: x, top: y, '--d': d + 's' }}><span>{t}</span></span>)}
        <span className="sc-hcard sc-hcard--ai" aria-hidden="true"><i><I n="spark" s={16} /></i><span><b>Catch me up</b><small>2 decisions · 3 action items</small></span></span>
      </div>
      <div className="container sc-hero__in">
        <div className="sc-hero__copy">
          <nav className="sc-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/products">Products</Link><span aria-hidden="true">/</span><span aria-current="page">SampConnect</span>
          </nav>
          <div className="sc-hero__brand">
            <ScLogo h={36} dark />
          </div>
          <p className="sc-kicker"><span>New</span> A Sampledge product · the workspace for global research teams</p>
          <HeroH1 id="sc-h1" className="sc-h1">
            <span className="sr-only">SampConnect: </span>
            <W d={0.15}>Every</W> <W d={0.25}>conversation.</W><br />
            <W d={0.35}>Every</W> <W d={0.45}>country.</W><br />
            <W d={0.6} cls="sc-serif">On servers you own.</W>
          </HeroH1>
          <p className="sc-hero__sub">
            SampConnect brings your team, clients and research partners into one private workspace to <Rotator /><span className="sr-only">chat, meet, approve, translate, sync and connect.</span>
            <br className="sc-hide-sm" /> Chat, video, AI and approvals, self-hosted from end to end and built for the Sampledge suite.
          </p>
          <div className="sc-cta">
            <Link className="sc-btn sc-btn--gold" to={SC.demo}>Book a live demo <I n="arrow" s={17} /></Link>
            <a className="sc-btn sc-btn--ghost" href="#sc-tour"><span className="sc-play"><I n="play" s={11} /></span>Take the tour</a>
          </div>
          <ul className="sc-trust" aria-label="Highlights">
            <li><I n="server" s={16} /> Self-hosted video &amp; AI</li>
            <li><I n="wifiOff" s={16} /> Works offline</li>
            <li><I n="phone" s={16} /> Web, iPhone &amp; Android</li>
          </ul>
        </div>
      </div>
      <a href="#sc-reveal" className="sc-cue" aria-label="Scroll down"><span /></a>
    </section>
  );
}

/* ---------- the app window rises out of the hero as you scroll ---------- */
function Count({ v, on }) {
  const m = /^(\d+)(.*)$/.exec(v);
  const [n, setN] = ee.useState(m ? 0 : v);
  ee.useEffect(() => {
    if (!m || !on) return undefined;
    const to = +m[1];
    if (still() || !to) { setN(to); return undefined; }
    let raf; const t0 = performance.now();
    const f = (t) => { const k = Math.min(1, (t - t0) / 1400); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [on]); // eslint-disable-line react-hooks/exhaustive-deps
  return <>{m ? n + m[2] : v}</>;
}
function Reveal() {
  const ref = ee.useRef(null);
  const [sref, on] = useOn('0px 0px -5% 0px');
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || still()) { el && el.style.setProperty('--p', 1); return undefined; }
    let raf = 0;
    const f = () => { raf = 0; const r = el.getBoundingClientRect(), vh = window.innerHeight; const p = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.9))); el.style.setProperty('--p', p.toFixed(3)); };
    const on2 = () => { if (!raf) raf = requestAnimationFrame(f); };
    f(); window.addEventListener('scroll', on2, { passive: true }); window.addEventListener('resize', on2);
    return () => { window.removeEventListener('scroll', on2); window.removeEventListener('resize', on2); cancelAnimationFrame(raf); };
  }, []);
  return (
    <section className="sc-reveal" id="sc-reveal" ref={ref} aria-label="SampConnect at a glance">
      <div className="container">
        <div className="sc-reveal__stage">
          <div className="sc-reveal__screen"><Frame src={SC_IMG.home} alt="SampConnect home dashboard for a demo research company" /></div>
          <div className="sc-reveal__phone"><Phone src={SC_MOBILE[0][0]} alt="SampConnect messages on a phone" /></div>
          <span className="sc-fc sc-fc--a"><i style={{ background: '#F5B83D' }}><I n="approve" s={18} /></i><span><b>Budget approved</b><small>Project Atlas · $12,400</small></span></span>
          <span className="sc-fc sc-fc--b"><i style={{ background: '#8FE0B6' }}><I n="sync" s={18} /></i><span><b>Synced on 3 devices</b><small>3 queued messages delivered</small></span></span>
          <span className="sc-fc sc-fc--c"><i style={{ background: '#C4B5FD' }}><I n="spark" s={18} /></i><span><b>Catch me up</b><small>2 decisions · 3 action items</small></span></span>
        </div>
        <ul className={'sc-stats' + (on ? ' is-on' : '')} ref={sref}>
          {SC_STATS.map(([n, t], i) => <li key={t} style={{ '--i': i }}><b><Count v={n} on={on} /></b><span>{t}</span></li>)}
        </ul>
      </div>
    </section>
  );
}

/* ---------- why: a bento of live mini scenes ---------- */
function Mini({ k }) {
  switch (k) {
    case 'server': return <span className="sc-mini sc-mini--rack">{[0, 1, 2].map((i) => <i key={i}><b /><b /><em /></i>)}</span>;
    case 'shield': return <span className="sc-mini sc-mini--shield"><svg viewBox="0 0 24 24" width="64" height="64"><path d={P.shield} /><path d={P.check} /></svg><i /></span>;
    case 'wifi': return <span className="sc-mini sc-mini--queue"><I n="phone" s={26} /><span><i /><i /><i /></span><I n="server" s={26} /></span>;
    case 'globe': return <span className="sc-mini sc-mini--net">{[0, 1, 2, 3, 4].map((i) => <i key={i} style={{ '--i': i }} />)}<b /></span>;
    case 'inbox': return <span className="sc-mini sc-mini--inbox">{SC_CHANNELS.slice(0, 6).map((c, i) => <i key={c} style={{ '--i': i }}>{c[0]}</i>)}<b><I n="inbox" s={18} /></b></span>;
    case 'layers': return <span className="sc-mini sc-mini--mods">{Object.values(SC_MOD_COL).map((c, i) => <i key={c} style={{ '--c': c, '--i': i }} />)}<b><ScMark s={30} tile /></b></span>;
    case 'brush': return <span className="sc-mini sc-mini--pal">{['#0F6B4F', '#F5B83D', '#7DD3FC', '#C4B5FD', '#FF8A7A'].map((c, i) => <i key={c} style={{ '--c': c, '--i': i }} />)}</span>;
    default: return null;
  }
}

/* ---------- product tour ---------- */
function Tour() {
  const [k, setK] = ee.useState(0);
  const [s, setS] = ee.useState(0);
  const list = ee.useRef(null);
  const pick = (n) => { setK(n); setS(0); };
  const key = (e, i) => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + SC_TOUR.length) % SC_TOUR.length;
    pick(n);
    const b = list.current && list.current.querySelectorAll('[role=tab]')[n];
    b && b.focus();
  };
  return (
    <div className="sc-tour">
      <div className="sc-tour__list" role="tablist" aria-orientation="vertical" ref={list}>
        {SC_TOUR.map(([ic, h, tt], i) => (
          <button key={h} type="button" role="tab" id={'sc-tt-' + i} aria-controls={'sc-tp-' + i} aria-selected={i === k} tabIndex={i === k ? 0 : -1} className={i === k ? 'is-on' : ''} onClick={() => pick(i)} onKeyDown={(e) => key(e, i)}>
            <span className="sc-tour__n"><I n={ic} s={18} /></span>
            <span><small>{String(i + 1).padStart(2, '0')} · {h}</small><b>{tt}</b></span>
          </button>
        ))}
      </div>
      {SC_TOUR.map(([, h, tt, d, tags, shots], i) => (
        <div key={h} role="tabpanel" id={'sc-tp-' + i} aria-labelledby={'sc-tt-' + i} hidden={i !== k} className="sc-tour__panel">
          {i === k ? <Frame src={shots[Math.min(s, shots.length - 1)]} alt={h + ' in SampConnect'} cls="sc-frame--glow" /> : null}
          <div className="sc-tour__copy">
            <h3>{tt}</h3>
            <p>{d}</p>
            <ul className="sc-tags">{tags.map((x) => <li key={x}>{x}</li>)}</ul>
            {shots.length > 1 ? (
              <div className="sc-dots" role="group" aria-label="More screens">
                {shots.map((_, n) => <button key={n} type="button" aria-label={'Screen ' + (n + 1) + ' of ' + shots.length} aria-pressed={n === s} className={n === s ? 'is-on' : ''} onClick={() => setS(n)} />)}
              </div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------- a live call with captions ---------- */
function Call() {
  return (
    <div className="sc-call">
      <Frame src={SC_IMG.callCaptions} alt="A SampConnect video call with live captions translated from German" cls="sc-frame--glow" />
      <span className="sc-call__rec" aria-hidden="true"><i /> {SC_CAPTION.rec}</span>
      <span className="sc-call__srv" aria-hidden="true"><I n="server" s={14} /> Your media server</span>
      <div className="sc-call__cap" aria-hidden="true">
        <small><b>{SC_CAPTION.lang}</b>{SC_CAPTION.who}</small>
        <span className="sc-type">{SC_CAPTION.said}</span>
        <span className="sc-type sc-type--2">{SC_CAPTION.en}</span>
      </div>
      <div className="sc-mins" aria-hidden="true">
        <b><I n="file" s={15} /> Minutes · #q4-tracker</b>
        <small>Generated from the call transcript</small>
        {['Attendees', 'Agenda', 'Summary', 'Decisions', 'Action items'].map((x, i) => <span key={x} style={{ '--i': i }}><em>{x}</em><i /></span>)}
        <p><span>PDF</span><span>Word</span><span>Chat export</span></p>
      </div>
    </div>
  );
}

/* ---------- offline queue that syncs ---------- */
function Offline() {
  return (
    <div className="sc-off">
      <div className="sc-off__scene" aria-hidden="true">
        <img className="sc-off__img" src={SC_IMG.mOffline} width="900" height="625" alt="" loading="lazy" decoding="async" />
        <div className="sc-off__wire"><i /><i /><i /></div>
        <span className="sc-off__srv"><I n="server" s={30} /><small>Your server</small></span>
        <span className="sc-off__state"><b className="s1"><I n="wifiOff" s={14} /> Offline · 3 queued</b><b className="s2"><I n="sync" s={14} /> Reconnecting…</b><b className="s3"><I n="check" s={14} /> Delivered · in sync</b></span>
      </div>
      <Frame src={SC_IMG.sync} alt="The Sync Center showing queued and sent items" cls="sc-off__frame" />
    </div>
  );
}

/* ---------- client channels orbiting one inbox ---------- */
function Orbit() {
  const a = SC_CHANNELS.slice(0, 6), b = SC_CHANNELS.slice(6);
  return (
    <div className="sc-orb" aria-hidden="true">
      <span className="sc-orb__ring sc-orb__ring--1">{a.map((c, i) => <i key={c} style={{ '--a': (i * 60) + 'deg' }}><b>{c}</b></i>)}</span>
      <span className="sc-orb__ring sc-orb__ring--2">{b.map((c, i) => <i key={c} style={{ '--a': (i * 60 + 30) + 'deg' }}><b>{c}</b></i>)}</span>
      <span className="sc-orb__core"><I n="inbox" s={30} /><small>Client Inbox</small></span>
    </div>
  );
}

/* ---------- Connect ID network ---------- */
function Net() {
  const pts = [[50, 12], [88, 32], [86, 74], [50, 90], [13, 72], [12, 30]];
  return (
    <div className="sc-net" aria-hidden="true">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        {pts.map(([x, y], i) => <line key={i} x1="50" y1="52" x2={x} y2={y} style={{ '--i': i }} />)}
        {pts.map(([x, y], i) => { const [x2, y2] = pts[(i + 1) % pts.length]; return <line key={'r' + i} className="is-ring" x1={x} y1={y} x2={x2} y2={y2} />; })}
      </svg>
      <span className="sc-net__me"><ScMark s={34} tile /><small>@you</small></span>
      {SC_IDS.map(([id, org], i) => (
        <span key={id} className="sc-net__n" style={{ left: pts[i][0] + '%', top: pts[i][1] + '%', '--i': i, '--c': Object.values(SC_MOD_COL)[i] }}>
          <b>{id[1].toUpperCase()}</b><span>{id}<small>{org}</small></span>
        </span>
      ))}
    </div>
  );
}

/* ---------- the assistant answers ---------- */
function Ai({ on }) {
  const sec = [['Decisions', '#8FE0B6', SC_AI_DEMO.dec], ['Action items', '#F5B83D', SC_AI_DEMO.act], ['Open questions', '#FF8A7A', SC_AI_DEMO.open]];
  return (
    <div className={'sc-ai' + (on ? ' is-on' : '')}>
      <p className="sc-ai__h"><i><I n="spark" s={15} /></i> Assistant <small><I n="lock" s={12} /> On your model server</small></p>
      <p className="sc-ai__q">{SC_AI_DEMO.q}</p>
      <span className="sc-ai__typing" aria-hidden="true"><i /><i /><i /></span>
      <div className="sc-ai__a">
        {sec.map(([h, c, xs], i) => (
          <div key={h} style={{ '--c': c, '--i': i }}><small>{h}</small><ul>{xs.map((x) => <li key={x}>{x}</li>)}</ul></div>
        ))}
        <p className="sc-ai__src">{['Priya · 10:42', 'Video call transcript', 'Aarav · Yesterday'].map((x) => <span key={x}>{x}</span>)}</p>
      </div>
    </div>
  );
}

/* ---------- everything inside ---------- */
function AllCaps() {
  const groups = ['All', ...Object.keys(SC_ALL)];
  const [g, setG] = ee.useState('All');
  const items = g === 'All' ? Object.values(SC_ALL).flat() : SC_ALL[g];
  return (
    <>
      <div className="sc-filter" role="group" aria-label="Filter capabilities">
        {groups.map((x) => <button key={x} type="button" aria-pressed={g === x} className={g === x ? 'is-on' : ''} onClick={() => setG(x)}>{x}</button>)}
      </div>
      <ul className="sc-caps" aria-live="polite">
        {items.map((x) => <li key={x}><I n="check" s={13} />{x}{SC_SOON.has(x) ? <em>Soon</em> : null}</li>)}
      </ul>
    </>
  );
}
const Cell = ({ v }) => (v === true ? <span className="sc-yes"><I n="check" s={16} /><span className="sr-only">Yes</span></span> : v === false ? <span className="sc-no"><I n="x" s={14} /><span className="sr-only">No</span></span> : <span className="sc-part">{v}</span>);

function AiSec() {
  const [ref, on] = useOn('0px 0px -20% 0px');
  return (
    <div className="sc-split" ref={ref}>
      <div>
        <ul className="sc-chips">{SC_AI.map((x, i) => <li key={x} style={{ '--i': i }}>{x}</li>)}</ul>
        <Frame src={SC_IMG.ai} alt="The private AI assistant answering with links to source messages" />
      </div>
      <Ai on={on} />
    </div>
  );
}

const SC_NUDGE = { id: 'sampconnect', short: 'SampConnect', site: PR5_SITE, c1: '#0F6B4F', c2: '#F5B83D', c3: '#8FE0B6', logo: <ScLogo h={44} dark /> };

export function SampConnect83() {
  usePageMeta('SampConnect: ' + SC.tag, SC.desc);
  ee.useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="sc83">
      <style data-fr-own="">{FONT + css}</style>
      <Hero />
      {/* build 83.3 (Kunal): the same scroll pop-up as the other Sampledge products, to sampledge.com */}
      <SX19_Nudge p={SC_NUDGE} />
      <nav className="sc-sub" aria-label="On this page">
        <div className="container">
          {[['sc-why', 'Why SampConnect'], ['sc-tour', 'Product tour'], ['sc-calls', 'Calls'], ['sc-offline', 'Offline'], ['sc-modules', 'Sampledge modules'], ['sc-ai', 'Private AI'], ['sc-how', 'How it works'], ['sc-compare', 'Compare'], ['sc-all', 'Everything inside']].map(([id, t]) => <a key={id} href={'#' + id}>{t}</a>)}
        </div>
      </nav>
      <Reveal />
      <Tape items={SC_TAPE} />

      <Sec id="sc-why" kick="Why SampConnect" title={<>Seven things nobody else puts <em>in one place.</em></>} lead="Chat, video, AI, offline sync, a network and the Sampledge suite, on servers you own and in your own brand.">
        <ol className="sc-bento">
          {SC_WHY.map(([ic, k, t, d, soon], i) => (
            <li key={k} style={{ '--i': i }} className={'sc-bento__' + ic}>
              <Mini k={ic} />
              <span className="sc-bento__n">{String(i + 1).padStart(2, '0')}</span>
              <small>{k}{soon ? <em className="sc-soon">Coming soon</em> : null}</small>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </Sec>

      <Sec id="sc-tour" cls="sc-sec--deep" kick="Product tour" title={<>One workspace. <em>Every way your team works.</em></>} lead="Every screen below is SampConnect as it ships today, in a fictional demo workspace.">
        <Tour />
      </Sec>

      <Sec id="sc-calls" cls="sc-sec--glow" kick="Calls & meetings" center title={<>Video meetings that <em>never leave your building.</em></>} lead="Your own media server, your own speech-to-text, your own recordings. Branded backgrounds, live captions in many languages, and minutes ready before the coffee gets cold.">
        <Call />
        <ul className="sc-feats">
          {SC_CALLS.map(([ic, t, d], i) => <li key={t} style={{ '--i': i }}><span><I n={ic} s={20} /></span><b>{t}</b><small>{d}</small></li>)}
        </ul>
      </Sec>

      <Sec id="sc-offline" kick="Offline-first, full sync" title={<>Keeps working when <em>the network doesn’t.</em></>} lead="Fieldwork happens on trains, in basements and across time zones. SampConnect saves every message and action on the device first, then delivers it the moment you reconnect, live on web, phone and every signed-in device.">
        <div className="sc-split sc-split--rev">
          <ul className="sc-ticks">{SC_SYNC.map((x, i) => <li key={x} style={{ '--i': i }}><I n="check" s={16} />{x}</li>)}<li className="sc-ok"><i /> Online. Everything in sync.</li></ul>
          <Offline />
        </div>
      </Sec>

      <Tape items={SC_CHANNELS} tone="violet" rev />

      <Sec id="sc-inbox" cls="sc-sec--violet" kick="Client Inbox" soon title={<>Meet clients <em>wherever they already chat.</em></>} lead="Clients message you on 12 channels. Your team answers all of it from one shared inbox, with assignment, handoff, SLAs and a supervisor dashboard.">
        <div className="sc-split">
          <Orbit />
          <div className="sc-stack">
            <Frame src={SC_IMG.inbox} alt="The shared Client Inbox with conversations from several messaging channels" />
            <Frame src={SC_IMG.inboxSup} alt="The supervisor dashboard of the Client Inbox" />
          </div>
        </div>
      </Sec>

      <Sec id="sc-network" cls="sc-sec--violet2" kick="SampConnect Network" soon title={<>Your professional world, <em>beyond your own company.</em></>} lead="Everyone gets a Connect ID. Find partners, suppliers and clients in other organizations, send connection requests, invite people who are not on SampConnect yet, post status updates with replies, follow people and grow communities.">
        <div className="sc-split">
          <div>
            <ul className="sc-ticks">{SC_NET.map((x, i) => <li key={x} style={{ '--i': i }}><I n="check" s={16} />{x}</li>)}</ul>
            <Frame src={SC_IMG.network} alt="The SampConnect Network with status updates and connection requests" />
          </div>
          <Net />
        </div>
      </Sec>

      <Sec id="sc-modules" cls="sc-sec--amber" kick="Built for the Sampledge suite" center title={<>Seven modules. <em>One conversation.</em></>} lead="Projects, sample, scripting, bids, CRM, people and finance each get their own channels, live cards, alerts, tasks and approvals inside SampConnect.">
        <ul className="sc-fan">
          {SC_MODS.map(([id, n, c, d], i) => (
            <li key={id} style={{ '--i': i, '--k': i - 3, '--c': SC_MOD_COL[id] }}>
              <Link to={'/products/' + id}><i><ScMark s={22} tile /></i><small>{c}</small><b>{n}</b><span>{d}</span><em>Open {n} <I n="arrow" s={14} /></em></Link>
            </li>
          ))}
        </ul>
      </Sec>

      <Sec id="sc-ai" cls="sc-sec--ai" kick="Private AI assistant" title={<>An assistant that <em>never phones home.</em></>} lead="SampConnect’s assistant runs on your own model server. It summarises threads and calls, answers questions with links to the source messages, translates, drafts replies and ranks what needs you, without a single word leaving your infrastructure.">
        <AiSec />
      </Sec>

      <Sec id="sc-brand" kick="Make it yours" title={<>20 chat themes. Five app themes. <em>Your brand on top.</em></>} lead="Everyone picks the conversation backdrop they love, from Skyline Office to Blueprint, synced across their devices. Admins can set organization rules, and white-label the whole app.">
        <div className="sc-brand">
          <Frame src={SC_IMG.themesGrid} alt="The gallery of 20 chat themes" cls="sc-brand__a" />
          <Frame src={SC_IMG.branding} alt="White-label settings: app name, logo, colours and sign-in page" url="connect.northwind-research.com" cls="sc-brand__b" />
          <span className="sc-brand__sw" aria-hidden="true">{['#0F6B4F', '#1E3A8A', '#7C2D12', '#4C1D95', '#0F172A'].map((c) => <i key={c} style={{ background: c }} />)}<small>5 app themes</small></span>
        </div>
      </Sec>

      <Sec id="sc-mobile" cls="sc-sec--deep" kick="iPhone & Android" center title={<>The whole workspace, <em>in your pocket.</em></>} lead="Chat, calls, meetings, tasks, approvals, the AI assistant and administration on iPhone and Android, with single sign-on, two-step verification and full offline sync.">
        <ul className="sc-phones">{SC_MOBILE.map(([src, t], i) => <li key={t} style={{ '--i': i, '--k': i - 2 }}><Phone src={src} alt={'SampConnect phone app: ' + t} /><span>{t}</span></li>)}</ul>
      </Sec>

      <Sec id="sc-trust" kick="Security & administration" title={<>Enterprise controls, <em>without the enterprise cloud.</em></>}>
        <ul className="sc-grid3">
          {SC_SEC.map(([ic, t, d], i) => <li key={t} style={{ '--i': i }}><span><I n={ic} s={20} /></span><b>{t}</b><small>{d}</small></li>)}
        </ul>
        <div className="sc-split sc-split--top">
          <div className="sc-note">
            <h3>Every integration, configured in-app</h3>
            <p>Email, push, calls, AI, speech-to-text, storage and SSO settings are stored encrypted in your database and tested with one click. No config files to hand-edit.</p>
          </div>
          <Frame src={SC_IMG.integrations} alt="Integration settings stored encrypted, each with a test button" />
        </div>
      </Sec>

      <Sec id="sc-how" cls="sc-sec--deep" kick="How it works" title={<>From your servers to <em>every conversation.</em></>} lead="Six steps take a company from installation to a branded, connected workspace for the whole team.">
        <ol className="sc-how">
          {SC_HOW.map(([ic, t, d], i) => (
            <li key={t} style={{ '--i': i }}><span className="sc-how__n"><I n={ic} s={20} /><small>{i + 1}</small></span><b>{t}</b><small>{d}</small></li>
          ))}
        </ol>
        <h3 className="sc-sub-h">Who it is for</h3>
        <ul className="sc-uses">
          {SC_USES.map(([t, d], i) => <li key={t} style={{ '--i': i }}><b>{t}</b><span>{d}</span></li>)}
        </ul>
      </Sec>

      <Sec id="sc-compare" kick="How we’re different" title={<>Other tools do one part well. <em>SampConnect does it all, on your terms.</em></>} lead="Most teams stitch together a cloud chat suite, a video-meeting app and a business messaging app, then send their data to three different vendors. Here is how SampConnect compares.">
        <div className="sc-tbl">
          <table>
            <thead><tr><th scope="col">Capability</th>{SC_CMP_COLS.map((c, i) => <th scope="col" key={c} className={i ? '' : 'is-sc'}>{c}</th>)}</tr></thead>
            <tbody>{SC_CMP.map(([f, v]) => <tr key={f}><th scope="row">{f}</th>{v.map((x, i) => <td key={i} className={i ? '' : 'is-sc'}><Cell v={x} /></td>)}</tr>)}</tbody>
          </table>
        </div>
        <p className="sc-fine">{SC_CMP_NOTE}</p>
      </Sec>

      <Sec id="sc-all" cls="sc-sec--deep" kick="Everything inside" title={<>88+ capabilities. <em>One workspace.</em></>}>
        <AllCaps />
      </Sec>

      <section className="sc-final" aria-labelledby="sc-final-h">
        <div className="sc-aurora" aria-hidden="true"><span /><span /><span /></div>
        <span className="sc-planet sc-planet--final" aria-hidden="true"><i /><i /><i /></span>
        <div className="container sc-final__in">
          <ScMark s={72} tile />
          <h2 id="sc-final-h">Bring every conversation <em className="sc-serif">home.</em></h2>
          <p>See SampConnect running on your own servers, in your own brand, with your own data. We’ll set up a live workspace for your team.</p>
          <div className="sc-cta">
            <Link className="sc-btn sc-btn--gold" to={SC.demo}>Book a live demo <I n="arrow" s={17} /></Link>
            <Link className="sc-btn sc-btn--ghost" to="/products">All Sampledge products</Link>
          </div>
          <p className="sc-fine">SampConnect is a Sampledge product. Screens shown use a fictional demo workspace.</p>
        </div>
      </section>
    </div>
  );
}
