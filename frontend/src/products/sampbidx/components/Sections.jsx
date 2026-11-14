import { useEffect, useRef, useState } from 'react';
import { ICONS } from '../icons.js';
import { ArrowRight, Check, Minus, X, MoveHorizontal, Sparkle } from 'lucide-react';
import {
  NAV, CONFIG, TICKER, FEATURES, COMPARE, SECURITY, MOBILE, THEMES, ADMIN, GALLERY, CTA, FOOTER, shots,
} from '../content.js';
import { useSpotlight } from '../hooks.js';
import logoDark from '../assets/brand/sampbidx-logo-dark.svg';
import iconSvg from '../assets/brand/sampbidx-icon.svg';
import iconPng from '../assets/brand/sampbidx-icon-512.png';

const Icon = ({ name, size = 22 }) => {
  const C = ICONS[name] || Sparkle;
  return <C size={size} strokeWidth={2} aria-hidden="true" />;
};

/* ── Nav ─────────────────────────────────────────────────────────── */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const bar = useRef(null);
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 20);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div className="scroll-bar" ref={bar} aria-hidden="true" />
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="wrap nav-in">
          <a href="#top" aria-label="SampBidx by Sampledge, back to top"><img className="nav-logo" src={logoDark} alt="SampBidx — Bid smart. Win more. by Sampledge" width="253" height="64" /></a>
          <nav className="nav-links" aria-label="Sections">{NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}</nav>
          <a className="btn btn-hot" href={CONFIG.demoUrl}>Book a demo</a>
        </div>
      </header>
    </>
  );
}

/* ── Ticker ──────────────────────────────────────────────────────── */
export function Ticker() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="ticker" aria-label="What SampBidx covers">
      <div className="ticker-track">
        {items.map((t, i) => <span className="ticker-item" key={i} aria-hidden={i >= TICKER.length}>{t}<Sparkle size={18} /></span>)}
      </div>
    </div>
  );
}

/* ── Bento features ──────────────────────────────────────────────── */
function FeatureCard({ f, i }) {
  const ref = useSpotlight();
  return (
    <article ref={ref} className={`card ${f.size} ${f.align || ''} t-${f.tone} rv`} style={{ '--d': `${(i % 3) * 0.08}s` }}>
      <span className="ic"><Icon name={f.icon} /></span>
      <h3>{f.title}</h3>
      <p>{f.body}</p>
      {f.img && <div className="shot"><img src={shots[f.img]} alt={`SampBidx: ${f.title}`} loading="lazy" width="1600" height="1000" /></div>}
    </article>
  );
}
export function Features() {
  return (
    <section className="section" id="features">
      <div className="wrap">
        <div className="head center rv">
          <span className="eyebrow">Everything a bid needs</span>
          <h2 className="h2">One platform. <span className="alt grad-warm">Every step of the quote.</span></h2>
          <p className="lede">Pricing, people, vendors, documents and follow-up live together, so nothing is copied between a spreadsheet, an inbox and a CRM.</p>
        </div>
        <div className="bento">{FEATURES.map((f, i) => <FeatureCard key={f.title} f={f} i={i} />)}</div>
      </div>
    </section>
  );
}

/* ── Compare ─────────────────────────────────────────────────────── */
const Mark = ({ v }) => (
  <span className={`mark m${v}`} role="img" aria-label={['Not there', 'Partly, or with set-up', 'Built in'][v]}>
    {v === 2 ? <Check size={17} strokeWidth={3} /> : v === 1 ? <Minus size={16} strokeWidth={3} /> : <X size={15} />}
  </span>
);
export function Compare() {
  return (
    <section className="section" id="compare">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">Why SampBidx</span>
          <h2 className="h2">{COMPARE.title[0]} <span className="alt grad-warm">{COMPARE.title[1]}</span></h2>
          <p className="lede">{COMPARE.sub}</p>
        </div>
        <div className="cmp-wrap rv">
          <table className="cmp">
            <thead>
              <tr>
                <th scope="col">Capability</th>
                <th scope="col">{COMPARE.cols[0]}</th>
                <th scope="col">{COMPARE.cols[1]}</th>
                <th scope="col" className="us"><img src={iconSvg} alt="" width="34" height="34" />{COMPARE.cols[2]}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.rows.map((r) => (
                <tr key={r.label}>
                  <td>{r.label}</td>
                  <td><Mark v={r.v[0]} /></td>
                  <td><Mark v={r.v[1]} /></td>
                  <td className="us"><Mark v={r.v[2]} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="cmp-legend">
          <span><Mark v={2} /> Built in</span>
          <span><Mark v={1} /> Partly, or with set-up</span>
          <span><Mark v={0} /> Not there</span>
          <span style={{ flexBasis: '100%' }}>{COMPARE.footnote}</span>
        </div>
        <div className="pillars">
          {COMPARE.pillars.map((p, i) => (
            <div className="pillar rv" key={p.title} style={{ '--d': `${i * 0.08}s` }}>
              <Icon name={p.icon} size={28} />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Security ────────────────────────────────────────────────────── */
export function Security() {
  return (
    <section className="section" id="security" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec rv">
          <svg className="shield" viewBox="0 0 200 200" aria-hidden="true">
            <defs><linearGradient id="shg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0BC5FF" /><stop offset="1" stopColor="#7B4DFF" /></linearGradient></defs>
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx="100" cy="100" r={30 + i * 22} fill="none" stroke="url(#shg)" strokeWidth="1.5" strokeDasharray="4 8" opacity={1 - i * 0.2}>
                <animateTransform attributeName="transform" type="rotate" from={`0 100 100`} to={`${i % 2 ? -360 : 360} 100 100`} dur={`${20 + i * 8}s`} repeatCount="indefinite" />
              </circle>
            ))}
            <path d="M100 62l30 12v24c0 20-13 34-30 40-17-6-30-20-30-40V74z" fill="url(#shg)" opacity=".9" />
            <path d="M88 100l9 9 17-19" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="eyebrow" style={{ color: 'var(--cyan)' }}>Security</span>
          <h2 className="h2" style={{ maxWidth: '14ch' }}>{SECURITY.title}</h2>
          <p className="lede">{SECURITY.sub}</p>
          <div className="sec-grid">
            {SECURITY.items.map((s) => (
              <div className="sec-item" key={s.title}>
                <span className="ic"><Icon name={s.icon} size={20} /></span>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Mobile ──────────────────────────────────────────────────────── */
export function Mobile() {
  return (
    <section className="section" id="mobile">
      <div className="wrap mob">
        <div className="rv">
          <span className="eyebrow">iOS · Android</span>
          <h2 className="h2">{MOBILE.title[0]} <span className="alt grad-warm">{MOBILE.title[1]}</span></h2>
          <p className="lede">{MOBILE.sub}</p>
          <div className="mob-points">{MOBILE.points.map((p) => <div key={p.text}><Icon name={p.icon} />{p.text}</div>)}</div>
        </div>
        <div className="phones rv" style={{ '--d': '.15s' }}>
          <span className="ring" aria-hidden="true" /><span className="ring" aria-hidden="true" />
          <div className="notif" aria-hidden="true">
            <img src={iconPng} alt="" width="28" height="28" />
            <div><b>Approval needed</b>APAC IT Decision Makers · $9,757</div>
          </div>
          <div className="phone p1"><img src={shots.mBids} alt="SampBidx mobile: list of bids with status" loading="lazy" /></div>
          <div className="phone p2"><img src={shots.mApprove} alt="SampBidx mobile: approve or reject a bid" loading="lazy" /></div>
          <div className="phone p3"><img src={shots.mStatus} alt="SampBidx mobile: bid detail with countries and prices" loading="lazy" /></div>
        </div>
      </div>
    </section>
  );
}

/* ── Themes (before / after slider) ──────────────────────────────── */
export function Themes() {
  const [pos, setPos] = useState(55);
  const box = useRef(null);
  const drag = useRef(false);
  const fromEvent = (e) => {
    const r = box.current.getBoundingClientRect();
    setPos(Math.max(2, Math.min(98, ((e.clientX - r.left) / r.width) * 100)));
  };
  return (
    <section className="section" id="themes">
      <div className="wrap themes">
        <div className="head center rv" style={{ marginBottom: 0 }}>
          <span className="eyebrow">Theme Studio</span>
          <h2 className="h2">{THEMES.title[0]} <span className="alt grad-cool">{THEMES.title[1]}</span></h2>
          <p className="lede">{THEMES.sub}</p>
        </div>
        <div
          ref={box} className="slider rv" style={{ '--pos': `${pos}%` }}
          onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); fromEvent(e); }}
          onPointerMove={(e) => drag.current && fromEvent(e)}
          onPointerUp={() => { drag.current = false; }}
        >
          <img src={shots.dashLight} alt="SampBidx dashboard in the light Platinum Clarity theme" loading="lazy" />
          <img className="top" src={shots.dash} alt="SampBidx dashboard in the dark Obsidian theme" loading="lazy" />
          <span className="lbl l">Dark</span><span className="lbl r">Light</span>
          <div className="handle">
            <button
              type="button" aria-label="Compare dark and light themes. Use left and right arrow keys."
              onKeyDown={(e) => { if (e.key === 'ArrowLeft') setPos((p) => Math.max(2, p - 5)); if (e.key === 'ArrowRight') setPos((p) => Math.min(98, p + 5)); }}
            ><MoveHorizontal size={22} /></button>
          </div>
        </div>
        <div className="styles rv">{THEMES.styles.map((s) => <span key={s}>{s}</span>)}</div>
      </div>
    </section>
  );
}

/* ── Super Admin tabs ────────────────────────────────────────────── */
export function Admin() {
  const [tab, setTab] = useState(ADMIN.tabs[0].key);
  const cur = ADMIN.tabs.find((t) => t.key === tab);
  useEffect(() => {
    const id = setInterval(() => setTab((k) => ADMIN.tabs[(ADMIN.tabs.findIndex((t) => t.key === k) + 1) % ADMIN.tabs.length].key), 6000);
    return () => clearInterval(id);
  }, [tab]);
  return (
    <section className="section" id="admin">
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">Super Admin</span>
          <h2 className="h2">{ADMIN.title[0]} <span className="alt grad-cool">{ADMIN.title[1]}</span></h2>
          <p className="lede">{ADMIN.sub}</p>
        </div>
        <div className="tabs" role="tablist" aria-label="Super Admin screens">
          {ADMIN.tabs.map((t) => (
            <button key={t.key} role="tab" id={`tab-${t.key}`} aria-selected={tab === t.key} aria-controls="admin-panel" className="tab" onClick={() => setTab(t.key)}>{t.label}</button>
          ))}
        </div>
        <div className="admin-shot" id="admin-panel" role="tabpanel" aria-labelledby={`tab-${tab}`}>
          <div className="browser" key={tab}>
            <div className="browser-bar"><i /><i /><i /><span>app.sampbidx.com/app/super-admin</span></div>
            <img src={shots[tab]} alt={`SampBidx Super Admin: ${cur.label}`} loading="lazy" width="1600" height="1000" />
          </div>
        </div>
        <p className="admin-cap">{cur.caption}</p>
      </div>
    </section>
  );
}

/* ── Gallery + lightbox ──────────────────────────────────────────── */
export function Gallery() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    if (!open) return;
    const k = (e) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open]);
  const items = [...GALLERY, ...GALLERY];
  return (
    <section className="section" id="gallery" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="head center rv">
          <span className="eyebrow">Inside the product</span>
          <h2 className="h2">Take a <span className="alt grad-warm">closer look.</span></h2>
        </div>
      </div>
      <div className="gallery">
        <div className="g-track">
          {items.map((g, i) => (
            <button key={i} className="g-item" onClick={() => setOpen(g)} tabIndex={i >= GALLERY.length ? -1 : 0} aria-hidden={i >= GALLERY.length}>
              <img src={shots[g.img]} alt={`SampBidx: ${g.label}`} loading="lazy" width="1600" height="1000" />
              <span>{g.label}</span>
            </button>
          ))}
        </div>
      </div>
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={open.label} onClick={() => setOpen(null)}>
          <button className="btn btn-ghost x" onClick={() => setOpen(null)} aria-label="Close"><X size={18} /></button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={shots[open.img]} alt={`SampBidx: ${open.label}`} />
            <figcaption>{open.label}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}

/* ── Final CTA + footer ──────────────────────────────────────────── */
export function FinalCta() {
  return (
    <section className="cta" id="contact">
      <div className="cta-orb" aria-hidden="true" />
      <div className="wrap rv">
        <img className="cta-icon" src={iconSvg} alt="" width="180" height="180" />
        <h2><span>{CTA.title[0]}</span><span className="grad-warm">{CTA.title[1]}</span></h2>
        <p className="lede">{CTA.sub}</p>
        <div className="hero-cta">
          <a className="btn btn-hot" href={CONFIG.demoUrl}>{CTA.primary} <ArrowRight size={18} /></a>
          <a className="btn btn-ghost" href={CONFIG.signInUrl}>{CTA.secondary}</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <img src={logoDark} alt="SampBidx by Sampledge" width="253" height="64" />
        <p>{FOOTER.line} © {new Date().getFullYear()} Sampledge. {FOOTER.small}</p>
      </div>
    </footer>
  );
}

/* ── Soft glow that follows the pointer ──────────────────────────── */
export function CursorGlow() {
  const ref = useRef(null);
  useEffect(() => {
    const m = (e) => { if (ref.current) ref.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; };
    window.addEventListener('pointermove', m);
    return () => window.removeEventListener('pointermove', m);
  }, []);
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />;
}
