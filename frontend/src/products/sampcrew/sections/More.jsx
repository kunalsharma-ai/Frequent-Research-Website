import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  mobileCopy, differentiators, comparison, securityLayers, securityNote, themePresets, integrations,
  audiences, gallery, finalCta, footnote, links, screens,
} from '../content.js';
import { Reveal, SectionHead, Tilt, Phone, BrowserFrame, Magnetic } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import logo from '../assets/brand/sampcrew-logo-dark.svg';
import icon from '../assets/brand/sampcrew-icon-static.webp'; // static mark; the animated SVG is used in the logo

export function Mobile() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [160, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -140]);
  const phones = [
    { src: screens.mAttendance, alt: 'SampCrew app: attendance', y: y1, cls: 'p-left' },
    { src: screens.mHome, alt: 'SampCrew app: home with today, approvals, leave and notifications', y: y2, cls: 'p-mid' },
    { src: screens.mLeave, alt: 'SampCrew app: leave balances and requests', y: y3, cls: 'p-right' },
  ];
  return (
    <section className="mobile" id="mobile" ref={ref}>
      <div className="wrap mobile-grid">
        <div className="phones">
          <div className="phones-halo" aria-hidden="true" />
          {phones.map((p) => (
            <motion.div key={p.cls} className={`phone-pos ${p.cls}`} style={reduce ? undefined : { y: p.y }}>
              <Phone src={p.src} alt={p.alt} />
            </motion.div>
          ))}
        </div>
        <div>
          <SectionHead kicker={mobileCopy.kicker} title={mobileCopy.title} text={mobileCopy.text} />
          <div className="m-feats">
            {mobileCopy.features.map((f, i) => (
              <Reveal key={f.t} delay={i * 0.06} className="m-feat">
                <b>{f.t}</b>
                <span>{f.d}</span>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="store-row">
            <span className="store">
              <Icon name="phone" size={18} /> iOS
            </span>
            <span className="store">
              <Icon name="phone" size={18} /> Android
            </span>
            <span className="store">
              <Icon name="globe" size={18} /> Web
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Different() {
  return (
    <section className="different" id="different">
      <div className="wrap">
        <SectionHead
          align="center"
          kicker="Why SampCrew"
          title={<>Not another HR tool. <em className="grad-text">A different kind of system.</em></>}
          text="Six things that set SampCrew apart from the patchwork most teams live with today."
        />
        <div className="diff-grid">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={(i % 3) * 0.08}>
              <Tilt className="diff-card" max={7}>
                <span className="diff-num">0{i + 1}</span>
                <span className="diff-ic">
                  <Icon name={d.icon} size={26} />
                </span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal className="compare-wrap" y={40}>
          <div className="compare" role="table" aria-label="Typical HR stack compared with SampCrew">
            <div className="c-row c-head" role="row">
              <span role="columnheader" />
              <span role="columnheader">{comparison.cols[0]}</span>
              <span role="columnheader" className="us">
                <img src={icon} alt="" width="22" height="22" /> {comparison.cols[1]}
              </span>
            </div>
            {comparison.rows.map((r, i) => (
              <motion.div
                className="c-row"
                role="row"
                key={r[0]}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5% 0px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <span role="rowheader">{r[0]}</span>
                <span role="cell" className="them">
                  <Icon name="x" size={14} stroke={2.4} /> {r[1]}
                </span>
                <span role="cell" className="us">
                  <Icon name="check" size={14} stroke={2.6} /> {r[2]}
                </span>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Security({ onZoom }) {
  return (
    <section className="security" id="security">
      <div className="wrap security-grid">
        <div className="shield-stage" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`s-ring s${i}`} />
          ))}
          <span className="s-core">
            <Icon name="shield" size={54} stroke={1.4} />
          </span>
          {securityLayers.slice(0, 6).map((l, i) => (
            <span key={l.t} className="s-tag" style={{ '--a': `${i * 60}deg` }}>
              {l.t}
            </span>
          ))}
        </div>
        <div>
          <SectionHead
            kicker="Security & trust"
            title={<>Enterprise-grade, <em className="grad-text">from the database up.</em></>}
            text="Isolation is enforced inside the database, not just in the app. Every sensitive action is recorded, and you decide who gets in."
          />
          <div className="sec-list">
            {securityLayers.map((l, i) => (
              <Reveal key={l.t} delay={i * 0.04} className="sec-item">
                <Icon name="lock" size={16} />
                <div>
                  <b>{l.t}</b>
                  <span>{l.d}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" className="muted small">
            {securityNote}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Pick a preset and watch a mini SampCrew re-theme itself. */
export function Themes() {
  const [t, setT] = useState(themePresets[0]);
  const [dark, setDark] = useState(true);
  return (
    <section className="themes">
      <div className="wrap themes-grid">
        <div>
          <SectionHead
            kicker="Make it yours"
            title={<>Thirteen moods. <em className="grad-text">Your colours.</em></>}
            text="Every person picks a theme, light or dark, their own colours, density and motion. It follows them from the web to the phone."
          />
          <div className="swatches" role="radiogroup" aria-label="Theme preset">
            {themePresets.map((p) => (
              <button
                key={p.name}
                role="radio"
                aria-checked={p.name === t.name}
                className={`swatch ${p.name === t.name ? 'on' : ''}`}
                style={{ '--a': p.a, '--b': p.b }}
                onClick={() => setT(p)}
              >
                <i />
                <span>{p.name}</span>
              </button>
            ))}
          </div>
          <div className="mode-toggle" role="group" aria-label="Light or dark">
            <button className={!dark ? 'on' : ''} onClick={() => setDark(false)} aria-pressed={!dark}>
              <Icon name="sun" size={16} /> Light
            </button>
            <button className={dark ? 'on' : ''} onClick={() => setDark(true)} aria-pressed={dark}>
              <Icon name="eye" size={16} /> Dark
            </button>
          </div>
        </div>
        <Reveal y={40}>
          <div className={`mini-app ${dark ? 'dark' : 'light'}`} style={{ '--a': t.a, '--b': t.b, '--bg': dark ? t.bg : '#F6F5FB' }}>
            <aside>
              <span className="ma-logo" />
              {['Home', 'People', 'Attendance', 'Leave', 'Payroll', 'Hiring'].map((x, i) => (
                <span key={x} className={i === 0 ? 'on' : ''}>
                  {x}
                </span>
              ))}
            </aside>
            <main>
              <div className="ma-top">
                <b>Good morning, Aarav</b>
                <span className="ma-btn">SampCrew IQ</span>
              </div>
              <div className="ma-kpis">
                {[
                  ['20', 'Employees'],
                  ['100%', 'Attendance'],
                  ['2', 'Open roles'],
                  ['₹1.6M', 'Payroll'],
                ].map(([k, v], i) => (
                  <div key={v} className={`k k${i}`}>
                    <b>{k}</b>
                    <small>{v}</small>
                  </div>
                ))}
              </div>
              <div className="ma-chart">
                <svg viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
                  <defs>
                    <linearGradient id="maFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0" stopColor="var(--a)" stopOpacity=".55" />
                      <stop offset="1" stopColor="var(--a)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 70 C40 66 60 50 90 52 S150 30 180 34 S240 14 300 10 V90 H0Z" fill="url(#maFill)" />
                  <path d="M0 70 C40 66 60 50 90 52 S150 30 180 34 S240 14 300 10" fill="none" stroke="var(--a)" strokeWidth="2.5" />
                </svg>
                <div className="donut" />
              </div>
            </main>
          </div>
          <p className="muted small center">{t.name} · {dark ? 'dark' : 'light'} mode</p>
        </Reveal>
      </div>
    </section>
  );
}

export function Integrations() {
  const all = integrations.live;
  return (
    <section className="integrations">
      <div className="wrap integ-grid">
        <div className="integ-orbit" aria-hidden="true">
          <div className="io-core">
            <img src={icon} alt="" width="70" height="70" />
          </div>
          <div className="io-ring o1">
            {all.slice(0, 6).map((n, i) => (
              <span key={n} style={{ '--a': `${i * 60}deg` }}>
                <em>{n}</em>
              </span>
            ))}
          </div>
          <div className="io-ring o2">
            {all.slice(6).map((n, i) => (
              <span key={n} style={{ '--a': `${i * 60 + 30}deg` }}>
                <em>{n}</em>
              </span>
            ))}
          </div>
        </div>
        <div>
          <SectionHead
            kicker="Connected"
            title={<>Plays well with <em className="grad-text">the rest of your stack.</em></>}
            text="Read-only API keys, an OpenAPI 3.1 spec, HMAC-signed webhooks with retries, Slack steps in workflows, single sign-on and SCIM provisioning."
          />
          <div className="pill-cloud">
            {integrations.live.map((n) => (
              <span key={n} className="pill live">
                <i /> {n}
              </span>
            ))}
            {integrations.planned.map((n) => (
              <span key={n} className="pill planned">
                {n} <small>planned</small>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Audiences() {
  const [a, setA] = useState(audiences[0].id);
  const cur = audiences.find((x) => x.id === a);
  const reduce = useReducedMotion();
  return (
    <section className="audiences">
      <div className="wrap">
        <SectionHead align="center" kicker="Built for" title={<>One platform, <em className="grad-text">every seat at the table.</em></>} />
        <div className="aud-tabs" role="tablist" aria-label="Who SampCrew is for">
          {audiences.map((x) => (
            <button key={x.id} role="tab" aria-selected={x.id === a} className={x.id === a ? 'on' : ''} onClick={() => setA(x.id)}>
              {x.id === a && <motion.span layoutId="aud-pill" className="aud-pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="aud-label">{x.name}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={cur.id}
            className="aud-panel"
            role="tabpanel"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
          >
            <p className="aud-text">{cur.text}</p>
            <BrowserFrame src={screens[cur.img]} alt={`SampCrew for ${cur.name}`} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export function Gallery({ onZoom }) {
  const track = useRef(null);
  const nudge = (d) => track.current?.scrollBy({ left: d * track.current.clientWidth * 0.7, behavior: 'smooth' });
  return (
    <section className="gallery" id="gallery">
      <div className="wrap gallery-head">
        <SectionHead kicker="Gallery" title={<>The real product, <em className="grad-text">in HD.</em></>} />
        <div className="g-nav">
          <button onClick={() => nudge(-1)} aria-label="Previous screens">
            <Icon name="arrow" size={18} style={{ transform: 'rotate(180deg)' }} />
          </button>
          <button onClick={() => nudge(1)} aria-label="Next screens">
            <Icon name="arrow" size={18} />
          </button>
        </div>
      </div>
      <div className="g-track" ref={track} tabIndex={0} aria-label="Product screenshots, scroll sideways">
        {gallery.map((g) => (
          <figure key={g.img} className="g-item">
            <button onClick={() => onZoom?.(g.img, g.cap)} aria-label={`Enlarge: ${g.cap}`}>
              <img src={screens[g.img]} alt={g.cap} loading="lazy" decoding="async" />
            </button>
            <figcaption>{g.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FinalCta() {
  return (
    <section className="final">
      <div className="final-orbs" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="wrap final-inner">
        <Reveal as="h2" className="h1">
          {finalCta.title}
        </Reveal>
        <Reveal as="p" className="lead" delay={0.1}>
          {finalCta.text}
        </Reveal>
        <Reveal className="hero-ctas center" delay={0.2}>
          <Magnetic className="btn-primary lg" href={links.demo}>
            {finalCta.primary} <Icon name="arrow" size={18} />
          </Magnetic>
          <Magnetic className="btn-ghost lg" href={links.contact}>
            {finalCta.secondary}
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot-inner">
        <img src={logo} alt="SampCrew, People, simplified, by Sampledge" width="220" height="58" />
        <nav aria-label="Footer">
          <a href="#platform">Platform</a>
          <a href="#intelligence">Intelligence</a>
          <a href="#mobile">Mobile</a>
          <a href="#different">Why SampCrew</a>
          <a href="#security">Security</a>
          <a href={links.sampledge}>Sampledge</a>
        </nav>
        <p className="muted small">{footnote}</p>
        <p className="muted small">© {new Date().getFullYear()} Sampledge. SampCrew is a product of Sampledge.</p>
      </div>
    </footer>
  );
}

export function Lightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={item.cap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.figure initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 26 }} onClick={(e) => e.stopPropagation()}>
            <img src={screens[item.img]} alt={item.cap} />
            <figcaption>{item.cap}</figcaption>
          </motion.figure>
          <button className="lb-close" onClick={onClose} aria-label="Close" autoFocus>
            <Icon name="x" size={22} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
