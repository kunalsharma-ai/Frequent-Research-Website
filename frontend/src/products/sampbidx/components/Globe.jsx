import { useEffect, useRef, useState } from 'react';
import markets from '../data/markets.json';
import { GLOBAL } from '../content.js';
import { reducedMotion, useCountUp, useInView } from '../hooks.js';

const RAD = Math.PI / 180;
const vec = (lat, lng) => [Math.cos(lat * RAD) * Math.sin(lng * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lng * RAD)];
const NAMES = new Intl.DisplayNames(['en'], { type: 'region' });

/** A dotted 3D globe drawn on canvas. Drag to spin. Arcs show a bid being priced across markets. */
function GlobeCanvas({ onPick }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; const ctx = c.getContext('2d');
    let size = 0, dpr = 1, raf, rotY = -0.6, rotX = 0.35, vel = 0.0022, dragging = false, lastX = 0, lastY = 0, t = 0;
    const N = 1600; const dots = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
      dots.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    const mk = markets.map(([code, cap, lat, lng]) => ({ code, cap, v: vec(lat, lng), ph: Math.random() * 6 }));
    let arcs = []; let nextArc = 0;
    const newBid = () => {
      const from = mk[Math.floor(Math.random() * mk.length)];
      const picks = [...mk].sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 3)).filter((m) => m !== from);
      arcs = picks.map((to, i) => ({ a: from.v, b: to.v, born: t + i * 12, to }));
      onPick?.(picks.map((p) => p.code));
    };
    const resize = () => { dpr = Math.min(2, window.devicePixelRatio || 1); size = c.clientWidth; c.width = c.height = size * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const rotate = ([x, y, z]) => {
      const cy = Math.cos(rotY), sy = Math.sin(rotY), cx = Math.cos(rotX), sx = Math.sin(rotX);
      const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
      const y2 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
      return [x1, y2, z2];
    };
    const proj = (p, R, cx, cy) => [cx + p[0] * R, cy - p[1] * R, p[2]];
    const slerp = (a, b, f) => {
      const d = Math.acos(Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])) || 1e-6, s = Math.sin(d);
      const k1 = Math.sin((1 - f) * d) / s, k2 = Math.sin(f * d) / s, lift = 1 + Math.sin(f * Math.PI) * d * 0.22;
      return [(a[0] * k1 + b[0] * k2) * lift, (a[1] * k1 + b[1] * k2) * lift, (a[2] * k1 + b[2] * k2) * lift];
    };
    const draw = () => {
      t++;
      if (!dragging) rotY += vel;
      const R = size * 0.42, cx = size / 2, cy = size / 2;
      ctx.clearRect(0, 0, size, size);
      // sphere body
      const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.1, cx, cy, R);
      g.addColorStop(0, 'rgba(47,107,255,0.28)'); g.addColorStop(0.7, 'rgba(60,30,120,0.18)'); g.addColorStop(1, 'rgba(123,77,255,0.35)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.fill();
      ctx.strokeStyle = 'rgba(11,197,255,0.35)'; ctx.lineWidth = 1; ctx.stroke();
      // dots
      for (const d of dots) {
        const p = rotate(d); if (p[2] < -0.05) continue;
        const [x, y] = proj(p, R, cx, cy);
        ctx.fillStyle = `rgba(190,170,255,${0.08 + p[2] * 0.4})`;
        ctx.fillRect(x - 0.8, y - 0.8, 1.6, 1.6);
      }
      // markets
      for (const m of mk) {
        const p = rotate(m.v); if (p[2] < 0) continue;
        const [x, y] = proj(p, R, cx, cy);
        const pulse = (Math.sin(t * 0.05 + m.ph) + 1) / 2;
        ctx.fillStyle = `rgba(252,211,77,${0.5 + p[2] * 0.5})`;
        ctx.beginPath(); ctx.arc(x, y, 2.2, 0, 6.283); ctx.fill();
        ctx.strokeStyle = `rgba(249,115,22,${(1 - pulse) * 0.6 * p[2]})`;
        ctx.beginPath(); ctx.arc(x, y, 2 + pulse * 8, 0, 6.283); ctx.stroke();
      }
      // arcs
      if (t > nextArc) { newBid(); nextArc = t + 260; }
      for (const a of arcs) {
        const age = t - a.born; if (age < 0) continue;
        const f = Math.min(1, age / 70), fade = t > nextArc - 40 ? (nextArc - t) / 40 : 1;
        ctx.lineWidth = 2; ctx.lineCap = 'round';
        let prev = null;
        for (let s = 0; s <= 40; s++) {
          const q = (s / 40) * f; const p = rotate(slerp(a.a, a.b, q));
          const pt = proj(p, R, cx, cy);
          if (prev && p[2] > -0.1 && prev[2] > -0.1) {
            ctx.strokeStyle = `rgba(${s / 40 > 0.5 ? '225,29,72' : '252,211,77'},${0.85 * fade})`;
            ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(pt[0], pt[1]); ctx.stroke();
          }
          prev = pt;
        }
        if (f === 1) {
          const p = rotate(a.b); if (p[2] > 0) {
            const [x, y] = proj(p, R, cx, cy);
            ctx.fillStyle = `rgba(255,255,255,${fade})`; ctx.beginPath(); ctx.arc(x, y, 3.4, 0, 6.283); ctx.fill();
            ctx.font = '600 11px "JetBrains Mono", monospace'; ctx.fillStyle = `rgba(247,242,255,${0.9 * fade})`;
            ctx.fillText(a.to.code, x + 7, y - 6);
          }
        }
      }
      raf = onScreen ? requestAnimationFrame(draw) : 0;
    };
    /* build 72 (FR): the globe stops drawing while it is off screen */
    let onScreen = true;
    const io = new IntersectionObserver(([e]) => { const was = onScreen; onScreen = e.isIntersecting; if (onScreen && !was && !raf && vel) raf = requestAnimationFrame(draw); });
    io.observe(c);
    const down = (e) => { dragging = true; lastX = e.clientX; lastY = e.clientY; c.setPointerCapture?.(e.pointerId); };
    const move = (e) => { if (!dragging) return; const dx = e.clientX - lastX, dy = e.clientY - lastY; rotY += dx * 0.008; rotX = Math.max(-1, Math.min(1, rotX + dy * 0.006)); vel = Math.max(-0.02, Math.min(0.02, dx * 0.0006)) || 0.0022; lastX = e.clientX; lastY = e.clientY; };
    const up = () => { dragging = false; if (Math.abs(vel) < 0.0022) vel = 0.0022 * Math.sign(vel || 1); };
    resize();
    window.addEventListener('resize', resize);
    c.addEventListener('pointerdown', down); window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
    if (reducedMotion()) { vel = 0; t = 1; draw(); cancelAnimationFrame(raf); } else draw();
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, []);
  return <canvas ref={ref} aria-label="Spinning globe with markets marked; drag to turn it" role="img" />;
}

function Stat({ value, label, start }) {
  const v = useCountUp(value, start, 1800);
  return <div><strong>{v}</strong><span>{label}</span></div>;
}

export default function Globe() {
  const [ref, seen] = useInView({ threshold: 0.3 });
  const [picked, setPicked] = useState([]);
  return (
    <section className="section" id="global" ref={ref}>
      <div className="wrap global">
        <div className="rv">
          <span className="eyebrow">Global by design</span>
          <h2 className="h2">{GLOBAL.title[0]} <span className="alt grad-cool">{GLOBAL.title[1]}</span></h2>
          <p className="lede">{GLOBAL.sub}</p>
          <div className="g-stats">{GLOBAL.stats.map((s) => <Stat key={s.label} {...s} start={seen} />)}</div>
          <div className="market-feed" aria-live="polite">
            <span className="dot" />
            {picked.length ? <span>Pricing <b>{picked.length} markets</b>: {picked.map((c) => { try { return NAMES.of(c); } catch { return c; } }).join(', ')}</span> : <span>Pricing markets…</span>}
          </div>
        </div>
        <div className="globe-box rv" style={{ '--d': '.15s' }}>
          <div className="halo" />
          <GlobeCanvas onPick={setPicked} />
          <span className="globe-hint">Drag to spin</span>
        </div>
      </div>
    </section>
  );
}
