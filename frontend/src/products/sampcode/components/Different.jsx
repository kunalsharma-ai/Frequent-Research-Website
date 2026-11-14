import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Lock, Unlock, Globe, Tablet, Phone, Mail, KeyRound, Sparkles } from 'lucide-react';
import { different } from '../content.js';
import { Reveal, SectionHead } from './ui.jsx';
import './Different.css';

/* ---------- Mini live demos inside the cards ---------- */

function ChangeSet() {
  const lines = [
    ['ctx', '<page id="P2" title="Brands">'],
    ['del', '  <single id="MAIN" text="Main brand?">'],
    ['add', '  <single id="MAIN" text="Which brand do you buy most often?"'],
    ['add', '          condition="not selected(AWARE, 99)">'],
    ['add', '  <scale id="NPS" min="0" max="10" nps="true"/>'],
    ['ctx', '</page>'],
  ];
  return (
    <div className="demo-cs" aria-hidden="true">
      <div className="cs-head">
        <Sparkles size={14} /> AI change set · 3 additions, 1 removal
      </div>
      <pre>
        {lines.map(([k, t], i) => (
          <span key={i} className={`cs-line ${k}`} style={{ animationDelay: `${0.3 + i * 0.35}s` }}>
            <b>{k === 'add' ? '+' : k === 'del' ? '−' : ' '}</b>
            {t}
          </span>
        ))}
      </pre>
      <div className="cs-actions">
        <span className="cs-btn ghost">Discard</span>
        <span className="cs-btn go">Accept change set</span>
      </div>
    </div>
  );
}

function LogicCheck() {
  const items = ['Routing', 'Piping', 'Quotas', 'Terminations', 'Translations'];
  return (
    <div className="demo-logic" aria-hidden="true">
      {items.map((t, i) => (
        <div key={t} className="lg-row" style={{ animationDelay: `${0.3 + i * 0.45}s` }}>
          <span className="lg-tick">
            <Check size={12} strokeWidth={3} />
          </span>
          {t}
          <span className="lg-ok">OK</span>
        </div>
      ))}
      <div className="lg-publish">
        <span className="lk lk-closed">
          <Lock size={14} />
        </span>
        <span className="lk lk-open">
          <Unlock size={14} />
        </span>
        Publish
      </div>
    </div>
  );
}

function Redirect() {
  const outs = [
    ['Complete', '#B8F35A', 40],
    ['Screen-out', '#FFB547', 85],
    ['Over quota', '#FF7AB6', 130],
    ['Quality fail', '#A78BFA', 175],
  ];
  return (
    <svg className="demo-redirect" viewBox="0 0 320 210" aria-hidden="true">
      <defs>
        <linearGradient id="rdg" x1="0" x2="1">
          <stop offset="0" stopColor="#22D3EE" />
          <stop offset="1" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <path id="rd-in" d="M20 107 C 60 107, 70 107, 110 107" stroke="url(#rdg)" strokeWidth="1.5" fill="none" strokeDasharray="4 5" />
      <rect x="110" y="84" width="60" height="46" rx="12" fill="rgba(99,102,241,.18)" stroke="#6366F1" />
      <text x="140" y="112" textAnchor="middle" fill="#EEF0FF" fontSize="11" fontFamily="JetBrains Mono, monospace">survey</text>
      <circle cx="16" cy="107" r="7" fill="#22D3EE" />
      {outs.map(([label, color, y], i) => (
        <g key={label}>
          <path id={`rd-o${i}`} d={`M170 107 C 205 107, 205 ${y}, 240 ${y}`} stroke={color} strokeOpacity=".55" strokeWidth="1.5" fill="none" />
          <rect x="240" y={y - 12} width="74" height="24" rx="12" fill="rgba(255,255,255,.04)" stroke={color} strokeOpacity=".7" />
          <text x="277" y={y + 4} textAnchor="middle" fill={color} fontSize="9.5" fontFamily="Inter, sans-serif" fontWeight="600">
            {label}
          </text>
          <circle r="4" fill={color}>
            <animateMotion dur="2.6s" begin={`${i * 0.65}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath href={`#rd-o${i}`} />
            </animateMotion>
          </circle>
        </g>
      ))}
      <circle r="4" fill="#7EE8FA">
        <animateMotion dur="0.65s" repeatCount="indefinite">
          <mpath href="#rd-in" />
        </animateMotion>
      </circle>
      <text x="16" y="135" textAnchor="middle" fill="#8189AD" fontSize="9" fontFamily="Inter, sans-serif">
        vendor
      </text>
    </svg>
  );
}

function Score() {
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? 92 : 0);
  useEffect(() => {
    if (reduce) return;
    let raf, start;
    const loop = (t) => {
      start ??= t;
      const k = ((t - start) % 6000) / 6000;
      const e = k < 0.5 ? 1 - Math.pow(1 - k * 2, 3) : 1;
      setV(Math.round(e * 92));
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);
  const C = 2 * Math.PI * 62;
  return (
    <div className="demo-score" aria-hidden="true">
      <svg viewBox="0 0 160 160">
        <defs>
          <linearGradient id="scg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#B8F35A" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
        <circle cx="80" cy="80" r="62" stroke="rgba(255,255,255,.07)" strokeWidth="12" fill="none" />
        <circle cx="80" cy="80" r="62" stroke="url(#scg)" strokeWidth="12" fill="none" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - v / 100)} transform="rotate(-90 80 80)" />
        <text x="80" y="88" textAnchor="middle" fill="#fff" fontSize="38" fontWeight="700" fontFamily="Unbounded Variable, sans-serif">
          {v}
        </text>
        <text x="80" y="108" textAnchor="middle" fill="#8189AD" fontSize="10" fontFamily="Inter, sans-serif">
          quality score
        </text>
      </svg>
      <ul>
        <li>
          <span className="pen">−0</span> Answer speed normal
        </li>
        <li>
          <span className="pen">−0</span> Open ends look human
        </li>
        <li className="warn">
          <span className="pen">−5</span> Short open-end answer
        </li>
        <li>
          <span className="pen">−0</span> Network not anonymous
        </li>
      </ul>
    </div>
  );
}

function Modes() {
  const icons = [Globe, Tablet, Phone, Mail];
  return (
    <div className="demo-modes" aria-hidden="true">
      <div className="dm-core">
        <span>1</span>
        <small>survey</small>
      </div>
      <div className="dm-orbit">
        {icons.map((I, i) => (
          <span key={i} className="dm-sat" style={{ '--i': i }}>
            <I size={18} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Keys() {
  const names = ['Claude', 'Twilio', 'Deepgram', 'IPinfo', 'Stripe', 'S3'];
  return (
    <div className="demo-keys" aria-hidden="true">
      {names.map((n, i) => (
        <span key={n} className="dk-chip" style={{ animationDelay: `${i * 0.5}s` }}>
          <KeyRound size={13} /> {n}
        </span>
      ))}
    </div>
  );
}

function Research() {
  const bars = [
    ['Price', 82],
    ['Taste', 64],
    ['Brand', 41],
    ['Health', 28],
    ['Pack', 12],
  ];
  return (
    <div className="demo-research" aria-hidden="true">
      <div className="dr-panel">
        <div className="dr-title">MaxDiff · share of preference</div>
        {bars.map(([l, v], i) => (
          <div key={l} className="dr-bar">
            <span>{l}</span>
            <i>
              <motion.b initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: false }} transition={{ duration: 1.2, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} />
            </i>
          </div>
        ))}
      </div>
      <div className="dr-panel dr-eye">
        <div className="dr-title">Eye tracking · heat map</div>
        <div className="dr-heat">
          <i style={{ left: '30%', top: '35%', '--s': 1 }} />
          <i style={{ left: '62%', top: '30%', '--s': 0.7 }} />
          <i style={{ left: '48%', top: '68%', '--s': 0.55 }} />
        </div>
        <div className="dr-tag">experimental</div>
      </div>
    </div>
  );
}

function Admin() {
  const rows = [
    ['Northwind Foods', 'Enterprise', [1, 1, 1, 1]],
    ['Brightway Retail', 'Growth', [1, 1, 0, 1]],
    ['Metro Transit', 'Starter', [1, 0, 0, 0]],
  ];
  const cols = ['Studio', 'CAPI', 'CATI', 'Mobile'];
  return (
    <div className="demo-admin" aria-hidden="true">
      <div className="da-row da-head">
        <span>Organization</span>
        <span>Plan</span>
        {cols.map((c) => (
          <span key={c}>{c}</span>
        ))}
      </div>
      {rows.map(([org, plan, on], r) => (
        <div key={org} className="da-row">
          <span className="da-org">{org}</span>
          <span className="da-plan">{plan}</span>
          {on.map((v, c) => (
            <span key={c}>
              <i className={`da-sw${v ? ' on' : ''}${r === 1 && c === 2 ? ' flip' : ''}`} />
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

const DEMOS = { changeset: ChangeSet, logic: LogicCheck, redirect: Redirect, score: Score, modes: Modes, keys: Keys, research: Research, admin: Admin };

function Card({ card, index }) {
  const Demo = DEMOS[card.demo];
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Reveal delay={(index % 3) * 0.08} className={`df-card ${card.size || ''} d-${card.demo}`} onMouseMove={onMove}>
      <div className="df-demo">{Demo ? <Demo /> : null}</div>
      <div className="df-text">
        <h3>{card.title}</h3>
        <p>{card.body}</p>
      </div>
    </Reveal>
  );
}

export default function Different() {
  return (
    <section id="different" className="section df">
      <div className="df-aurora" aria-hidden="true" />
      <div className="wrap">
        <SectionHead kicker={different.kicker} title={different.title} sub={different.sub} center />
        <div className="df-grid">
          {different.cards.map((c, i) => (
            <Card key={c.title} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
