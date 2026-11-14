import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, CheckCircle2, Clock3, Trophy, Inbox } from 'lucide-react';
import { HERO, CONFIG, shots } from '../content.js';
import { reducedMotion, useCountUp, useInView } from '../hooks.js';
import { pzRaf, pzCancel } from '../../_shell/pzRaf.js';

/** Living background: drifting colour fields from the logo palette plus a field of rising sparks. */
function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    let w = 0, h = 0, dpr = 1, raf, t = 0, mx = 0.5, my = 0.3;
    const orbs = [
      { c: [252, 211, 77], r: 0.42, sx: 0.00021, sy: 0.00017, ox: 0.2, oy: 0.25 },
      { c: [249, 115, 22], r: 0.48, sx: 0.00016, sy: 0.00023, ox: 0.75, oy: 0.2 },
      { c: [225, 29, 72], r: 0.45, sx: 0.00019, sy: 0.00014, ox: 0.6, oy: 0.65 },
      { c: [123, 77, 255], r: 0.55, sx: 0.00013, sy: 0.0002, ox: 0.3, oy: 0.7 },
      { c: [11, 197, 255], r: 0.35, sx: 0.00024, sy: 0.00012, ox: 0.88, oy: 0.55 },
    ];
    const N = 90;
    const sparks = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), v: 0.0004 + Math.random() * 0.0012, s: 0.6 + Math.random() * 1.8, hue: Math.random() }));
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const onMove = (e) => { mx = e.clientX / window.innerWidth; my = e.clientY / window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    const still = reducedMotion();
    const frame = () => {
      t += 16;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#0c0816'; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      const m = Math.max(w, h);
      orbs.forEach((o, i) => {
        const x = (o.ox + Math.sin(t * o.sx + i) * 0.12 + (mx - 0.5) * 0.06 * (i % 2 ? 1 : -1)) * w;
        const y = (o.oy + Math.cos(t * o.sy + i * 2) * 0.1 + (my - 0.3) * 0.05) * h * 0.8;
        const g = ctx.createRadialGradient(x, y, 0, x, y, o.r * m);
        g.addColorStop(0, `rgba(${o.c},0.30)`); g.addColorStop(0.5, `rgba(${o.c},0.08)`); g.addColorStop(1, `rgba(${o.c},0)`);
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      });
      // vignette towards the bottom so the section blends into the page
      ctx.globalCompositeOperation = 'source-over';
      const v = ctx.createLinearGradient(0, h * 0.55, 0, h);
      v.addColorStop(0, 'rgba(12,8,22,0)'); v.addColorStop(1, 'rgba(12,8,22,1)');
      ctx.fillStyle = v; ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      sparks.forEach((p) => {
        p.y -= p.v; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        const x = p.x * w + Math.sin(t * 0.001 + p.hue * 10) * 12, y = p.y * h;
        const col = p.hue < 0.4 ? '252,211,77' : p.hue < 0.75 ? '249,115,22' : '11,197,255';
        ctx.fillStyle = `rgba(${col},${0.35 + 0.5 * Math.sin(t * 0.003 + p.hue * 20) ** 2})`;
        ctx.beginPath(); ctx.arc(x, y, p.s, 0, 6.283); ctx.fill();
      });
      if (!still) raf = pzRaf(frame);
    };
    frame();
    return () => { pzCancel(raf); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); };
  }, []);
  return <canvas ref={ref} className="hero-canvas" aria-hidden="true" />;
}

/** Types, holds, then deletes each phrase in turn. */
function Typer({ words }) {
  const [i, setI] = useState(0);
  const [n, setN] = useState(words[0].length);
  const [dir, setDir] = useState(-1);
  useEffect(() => {
    if (reducedMotion()) return;
    const word = words[i];
    let delay = dir > 0 ? 55 : 28;
    if (dir > 0 && n === word.length) delay = 1900;
    if (dir < 0 && n === word.length) delay = 1900;
    const id = setTimeout(() => {
      if (dir < 0) {
        if (n === 0) { setI((i + 1) % words.length); setDir(1); } else setN(n - 1);
      } else if (n === word.length) setDir(-1);
      else setN(n + 1);
    }, delay);
    return () => clearTimeout(id);
  }, [i, n, dir]);
  const word = words[i];
  return (
    <span className="typer" aria-live="off">
      {/* build 80: every phrase sits invisibly in the same cell, so the line keeps the height of the longest one and
          the text below never jumps while a phrase types or wraps */}
      {words.map((w) => <span key={w} className="typer-room" aria-hidden="true">{w}</span>)}
      <span className="typer-live"><span className="grad-warm">{word.slice(0, n)}</span><span className="caret" aria-hidden="true" /></span>
    </span>
  );
}

function Stat({ value, label, start }) {
  const v = useCountUp(value, start);
  return <div><strong>{v}</strong><span>{label}</span></div>;
}

export default function Hero() {
  const stage = useRef(null);
  const [statsRef, seen] = useInView({ threshold: 0.4 });
  useEffect(() => {
    const el = stage.current;
    if (!el || reducedMotion()) return;
    let raf;
    const base = { x: 14, y: 0 };
    const set = (rx, ry) => { el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`; };
    set(base.x, base.y);
    const onMove = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = e.clientX / window.innerWidth - 0.5, y = e.clientY / window.innerHeight - 0.5;
        set(base.x - y * 8, x * 12);
      });
    };
    const onScroll = () => {
      const p = Math.min(1, window.scrollY / 700);
      base.x = 14 * (1 - p);
      set(base.x, 0);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('scroll', onScroll); };
  }, []);

  return (
    <section className="hero" id="top">
      <HeroCanvas />
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-copy">
          <span className="pill"><b>New</b> {HERO.eyebrow}</span>
          <h1>
            <span className="l1">{HERO.lines[0]}</span>
            <span className="l2"><Typer words={HERO.rotating} /></span>
            <span className="l3 grad-warm">{HERO.lines[1]}</span>
          </h1>
          <p className="lede">{HERO.sub}</p>
          <div className="hero-cta">
            <a className="btn btn-hot" href={CONFIG.demoUrl}>{HERO.primary} <ArrowRight size={18} /></a>
            <a className="btn btn-ghost" href="#how"><Play size={16} /> {HERO.secondary}</a>
          </div>
          <div className="hero-stats" ref={statsRef}>
            {HERO.stats.map((s) => <Stat key={s.label} {...s} start={seen} />)}
          </div>
        </div>

        <div className="stage">
          <div className="stage-inner" ref={stage}>
            <div className="tiles t-left" aria-hidden="true"><i /><i /><i /></div>
            <div className="tiles t-right" aria-hidden="true"><i /><i /><i /></div>
            <div className="browser">
              <div className="browser-bar"><i /><i /><i /><span>app.sampbidx.com/app</span></div>
              <img src={shots.dash} alt="SampBidx bidding dashboard with the bid lifecycle from RFQ capture to win, and bid statistics" width="1600" height="1000" />
            </div>
            <div className="float-card fc-1">
              <span className="k"><Inbox size={13} /> New RFQ</span>
              <span className="v">Northwind Insights</span>
              <span style={{ color: 'var(--muted)' }}>US · DE · JP · n=650</span>
            </div>
            <div className="float-card fc-2">
              <span className="k">CPI · US · LOI 15 · IR 30%</span>
              <span className="big grad-warm">$6.35</span>
            </div>
            <div className="float-card fc-3">
              <span className="k"><span className="dot" /> Commercial review</span>
              <span className="v" style={{ display: 'flex', alignItems: 'center', gap: 6 }}><CheckCircle2 size={16} color="#34d399" /> Approved on mobile</span>
            </div>
            <div className="float-card fc-4">
              <span className="k"><Trophy size={13} /> Bid won</span>
              <span className="big" style={{ color: 'var(--amber)' }}>€5,050</span>
              <span style={{ color: 'var(--muted)', display: 'flex', gap: 6, alignItems: 'center' }}><Clock3 size={13} /> project created</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
