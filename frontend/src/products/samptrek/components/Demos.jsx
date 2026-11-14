import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Icon from './Icon.jsx'
import icon from '../assets/brand/samptrek-icon-512.png'

// Small live animations shown inside the feature cards.
// Each is self-contained; pick one with <Demo kind="quota" />.

function useTick(ms, n) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % n), ms)
    return () => clearInterval(t)
  }, [ms, n, reduce])
  return i
}

const STATUSES = [
  ['Complete', '#5BF5A0'], ['Terminate', '#FF5C8A'], ['Overquota', '#FEE440'], ['Quota full', '#FFB86B'],
  ['Quality', '#C77DFF'], ['Duplicate', '#0BC5FF'], ['Security', '#F15BB5'], ['Partial', '#A3B1FF'],
]

function Redirect() {
  const order = [0, 1, 0, 2, 0, 4, 0, 5, 3, 0, 6, 7]
  const k = useTick(1100, order.length)
  const s = order[k]
  return (
    <div className="demo-redirect">
      <svg viewBox="0 0 420 180" className="redir-svg" aria-hidden="true">
        {STATUSES.map(([, c], i) => {
          const y = 14 + i * 21.5
          return <path key={i} d={`M60 90 C 180 90, 200 ${y}, 300 ${y}`} stroke={c} strokeOpacity={i === s ? 0.95 : 0.16} strokeWidth={i === s ? 2.4 : 1.2} fill="none" />
        })}
        <circle r="5" fill={STATUSES[s][1]} key={k}>
          <animateMotion dur="0.9s" fill="freeze" path={`M60 90 C 180 90, 200 ${14 + s * 21.5}, 300 ${14 + s * 21.5}`} />
        </circle>
        <circle cx="48" cy="90" r="16" fill="#1d1340" stroke="#C77DFF" />
        <text x="48" y="95" textAnchor="middle" fontSize="13" fill="#fff" fontFamily="JetBrains Mono, monospace">UID</text>
      </svg>
      <div className="redir-pills">
        {STATUSES.map(([n, c], i) => (
          <span key={n} className={`pill ${i === s ? 'on' : ''}`} style={{ '--c': c }}>{n}</span>
        ))}
      </div>
      <div className="redir-rule"><code>vendor+country › vendor › country › project › client › org</code></div>
    </div>
  )
}

function Quota() {
  const cells = [['DE · 18–24', 62], ['DE · 25–34', 100], ['UK · Mobile', 84], ['US · Female', 47], ['US · Male', 71]]
  return (
    <div className="demo-quota">
      {cells.map(([n, v], i) => (
        <div className="q-row" key={n}>
          <span className="q-name">{n}</span>
          <span className="q-bar"><i style={{ '--v': `${v}%`, animationDelay: `${i * 0.25}s` }} className={v >= 100 ? 'full' : ''} /></span>
          <span className={`q-val ${v >= 100 ? 'full' : ''}`}>{v >= 100 ? <><Icon name="Lock" size={12} />Full</> : `${v}%`}</span>
        </div>
      ))}
      <div className="q-note"><Icon name="ShieldCheck" size={14} />Entry stopped before the survey</div>
    </div>
  )
}

function Links() {
  const keys = ['k7Qx2mPa9F', 'Zr4tLw8sQe', 'b9VnE3yHcu', 'Tq6dA1oXkm', 'm2JpW7rGzb']
  const k = useTick(1300, keys.length + 1)
  return (
    <div className="demo-links">
      {keys.map((key, i) => (
        <div key={key} className={`lk ${i < k ? 'used' : ''}`}>
          <code>…/s/{key}</code>
          <span className="lk-state">{i < k ? 'Used' : 'Unused'}</span>
        </div>
      ))}
    </div>
  )
}

function Shield() {
  const steps = ['Human check', 'Gate survey', 'Prescreener', 'Browser checks', 'Duplicate check']
  const k = useTick(700, steps.length + 3)
  return (
    <div className="demo-shield">
      <div className="shield-icon"><Icon name="ShieldCheck" size={54} strokeWidth={1.6} /><i className="scan" /></div>
      <ul>{steps.map((s, i) => <li key={s} className={i < k ? 'ok' : ''}><span><Icon name="Check" size={12} strokeWidth={3} /></span>{s}</li>)}</ul>
    </div>
  )
}

function Autopilot() {
  const k = useTick(4200, 2)
  return (
    <div className="demo-auto">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
        <defs><linearGradient id="ag" x1="0" x2="1"><stop offset="0" stopColor="#5BF5A0" /><stop offset="1" stopColor="#0BC5FF" /></linearGradient></defs>
        {[30, 65, 100].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="rgba(255,255,255,.07)" />)}
        <path d="M0 130 L400 18" stroke="rgba(255,255,255,.35)" strokeDasharray="5 6" fill="none" />
        <path key={k} className="auto-line" d="M0 130 C 60 120, 90 96, 140 92 S 220 96, 250 104 S 300 96, 330 70 S 380 34, 400 26" stroke="url(#ag)" strokeWidth="3" fill="none" />
        <circle cx="250" cy="104" r="6" className="auto-alert" key={'c' + k} />
      </svg>
      <div className="auto-legend"><span><i className="l1" />Completes</span><span><i className="l2" />Target pace</span></div>
      <motion.div key={'p' + k} className="auto-pill" initial={{ opacity: 0, scale: 0.6, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 1.6, type: 'spring' }}>
        <Icon name="Pause" size={13} />Autopilot paused Vendor B · UK
      </motion.div>
      <motion.div key={'r' + k} className="auto-pill alt" initial={{ opacity: 0, scale: 0.6, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 2.4, type: 'spring' }}>
        <Icon name="Zap" size={13} />Move 20 completes to Vendor A
      </motion.div>
    </div>
  )
}

function Copilot() {
  const qs = ['Which live projects are behind pace?', 'Summarise this week’s completes by vendor', 'Which invoices are still unpaid?']
  const k = useTick(4200, qs.length)
  const q = qs[k]
  return (
    <div className="demo-copilot">
      <div className="cp-wave" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />)}</div>
      <div className="cp-input"><Icon name="Mic" size={16} /><span className="typing" key={q} style={{ '--n': q.length }}>{q}</span><Icon name="Send" size={15} /></div>
      <div className="cp-confirm"><Icon name="CircleCheck" size={14} />Actions run only after you confirm</div>
    </div>
  )
}

function Ledger() {
  const books = ['Zoho Books', 'Xero', 'QuickBooks', 'Tally Prime']
  return (
    <div className="demo-ledger">
      <div className="orbit">
        <img src={icon} alt="" className="orbit-core" />
        <div className="orbit-ring">
          {books.map((b, i) => <span key={b} className="orbit-item" style={{ '--a': `${i * 90}deg` }}><b>{b}</b></span>)}
        </div>
      </div>
      <div className="ledger-flow"><span>Reconcile</span><i /><span>Invoice</span><i /><span>Sync</span></div>
    </div>
  )
}

function Score() {
  const [v, setV] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) { setV(92); return }
    let raf, t0
    const run = (t) => { t0 ??= t; const p = Math.min(1, (t - t0) / 1800); setV(Math.round(92 * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(run) }
    raf = requestAnimationFrame(run)
    return () => cancelAnimationFrame(raf)
  }, [reduce])
  const g = v >= 85 ? 'A' : v >= 70 ? 'B' : v >= 55 ? 'C' : 'D'
  return (
    <div className="demo-score">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs><linearGradient id="sg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#FEE440" /><stop offset="1" stopColor="#F15BB5" /></linearGradient></defs>
        <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,.1)" strokeWidth="10" fill="none" />
        <circle cx="60" cy="60" r="50" stroke="url(#sg)" strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={`${(v / 100) * 314} 314`} transform="rotate(-90 60 60)" />
      </svg>
      <div className="score-val"><b>{g}</b><span>{v}/100</span></div>
      <div className="score-tags"><span>On-time delivery</span><span>Low rejections</span><span>Capacity: DE, UK</span></div>
    </div>
  )
}

function Portals() {
  const msgs = [
    ['vendor', 'Panel Alpha', 'Disputing 3 rejected IDs'],
    ['staff', 'Project team', 'Reviewed: 2 approved'],
    ['client', 'Acme Insights', 'Uploaded the final questionnaire'],
  ]
  const k = useTick(1500, msgs.length + 2)
  return (
    <div className="demo-portals">
      <AnimatePresence>
        {msgs.slice(0, Math.min(k + 1, msgs.length)).map(([who, n, t]) => (
          <motion.div key={t} className={`bubble ${who}`} initial={{ opacity: 0, y: 14, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}>
            <b>{n}</b>{t}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function Api() {
  const code = `POST /your-webhook
X-Signature: sha256=…
{
  "type": "respondent.completed",
  "project": "PRX10001",
  "market": "DE",
  "vendor": "Panel Alpha",
  "status": "COMPLETE"
}`
  const [n, setN] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) { setN(code.length); return }
    const t = setInterval(() => setN((v) => (v >= code.length + 40 ? 0 : v + 2)), 40)
    return () => clearInterval(t)
  }, [reduce])
  const shown = code.slice(0, n)
  const html = shown
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/("[^"]*")(\s*:)/g, '<span class="k">$1</span>$2')
    .replace(/: ("[^"]*")/g, ': <span class="s">$1</span>')
    .replace(/^(POST)/, '<span class="m">$1</span>')
  return (
    <div className="demo-api">
      <div className="api-tabs"><span className="on">Example webhook</span><span>OpenAPI</span><span>API keys</span></div>
      <pre><code dangerouslySetInnerHTML={{ __html: html + '<i class="caret"></i>' }} /></pre>
    </div>
  )
}

function Theme() {
  const themes = [
    ['Neon', '#7B4DFF', '#F15BB5', '#0f0a2a'], ['Sunrise', '#FF8A3D', '#FEE440', '#2a1206'],
    ['Ocean', '#0BC5FF', '#2F6BFF', '#04162a'], ['Mint', '#2BD99F', '#B7F34A', '#05211a'],
  ]
  const k = useTick(1800, themes.length)
  const [n, a, b, bg] = themes[k]
  return (
    <div className="demo-theme" style={{ '--ta': a, '--tb': b, '--tbg': bg }}>
      <div className="mini-app">
        <div className="mini-side"><i /><i /><i /><i /></div>
        <div className="mini-main">
          <div className="mini-head"><span className="mini-brand">Your brand</span><span className="mini-btn" /></div>
          <div className="mini-cards"><i /><i /><i /></div>
          <div className="mini-chart">{[40, 70, 55, 90, 65, 80].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        </div>
      </div>
      <div className="theme-name">{n} theme · your-domain.com</div>
    </div>
  )
}

function Privacy() {
  const k = useTick(500, 10)
  const code = '482915'
  return (
    <div className="demo-privacy">
      <div className="sso"><span>G</span><span>M</span><span>Z</span></div>
      <div className="otp">{code.split('').map((c, i) => <b key={i} className={i < k ? 'on' : ''}>{i < k ? c : ''}</b>)}</div>
      <div className="priv-tags"><span>Audit log</span><span>Retention</span><span>Erasure</span></div>
    </div>
  )
}

const MAP = { redirect: Redirect, quota: Quota, links: Links, shield: Shield, autopilot: Autopilot, copilot: Copilot, ledger: Ledger, score: Score, portals: Portals, api: Api, theme: Theme, privacy: Privacy }

export default function Demo({ kind }) {
  const C = MAP[kind]
  return C ? <div className="demo" aria-hidden="true"><C /></div> : null
}
