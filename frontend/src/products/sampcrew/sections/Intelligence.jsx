import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { universeCopy, iqCopy, payrollLines, attendanceModes, screens } from '../content.js';
import { Reveal, SectionHead, Tilt, BrowserFrame } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';

const UniverseScene = lazy(() => import('../three/UniverseScene.jsx'));

const inr = (n) => (n < 0 ? '−' : '') + '₹' + Math.abs(n).toLocaleString('en-IN');

export function Universe({ onZoom }) {
  return (
    <section className="universe" id="intelligence">
      <div className="wrap universe-grid">
        <div>
          <SectionHead kicker={universeCopy.kicker} title={universeCopy.title} text={universeCopy.text} />
          <Reveal delay={0.2}>
            <ul className="ticks two">
              {universeCopy.bullets.map((b) => (
                <li key={b}>
                  <Icon name="check" size={16} stroke={2.4} />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.3} className="mini-shots">
            {['universe', 'globe', 'skills', 'scenario'].map((k) => (
              <button key={k} className="mini-shot" onClick={() => onZoom?.(k, 'Workforce Universe')} aria-label={`Enlarge ${k} screen`}>
                <img src={screens[k]} alt="" loading="lazy" />
              </button>
            ))}
          </Reveal>
        </div>
        <Reveal className="universe-stage" y={40}>
          <Suspense fallback={<div className="universe-canvas" />}>
            <UniverseScene />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}

/* Typed-out conversation that plays once when it scrolls into view. */
export function IQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-25% 0px' });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? iqCopy.conversation.length : 0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    if (!inView || reduce) return;
    if (shown >= iqCopy.conversation.length) return;
    const msg = iqCopy.conversation[shown];
    if (msg.who === 'you') {
      let k = 0;
      const t = setInterval(() => {
        k++;
        setTyped(msg.text.slice(0, k));
        if (k >= msg.text.length) {
          clearInterval(t);
          setTimeout(() => {
            setTyped('');
            setShown((s) => s + 1);
          }, 380);
        }
      }, 38);
      return () => clearInterval(t);
    }
    const t = setTimeout(() => setShown((s) => s + 1), 1300);
    return () => clearTimeout(t);
  }, [inView, shown, reduce]);

  const thinking = inView && !reduce && shown < iqCopy.conversation.length && iqCopy.conversation[shown].who === 'iq';

  return (
    <section className="iq">
      <div className="wrap iq-grid">
        <Reveal className="iq-window" y={40}>
          <div ref={ref} className="iq-panel">
            <div className="iq-head">
              <span className="iq-badge">
                <Icon name="spark" size={16} />
              </span>
              <div>
                <b>SampCrew IQ</b>
                <small>Answers from your workspace, within your access</small>
              </div>
              <kbd>Ctrl J</kbd>
            </div>
            <div className="iq-body">
              {iqCopy.conversation.slice(0, shown).map((m, i) => (
                <motion.div
                  key={i}
                  className={`bubble ${m.who}`}
                  initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <p>{m.text}</p>
                  {m.source && (
                    <span className="src">
                      <Icon name="doc" size={12} /> {m.source}
                    </span>
                  )}
                </motion.div>
              ))}
              {thinking && (
                <div className="bubble iq thinking" aria-label="IQ is thinking">
                  <i />
                  <i />
                  <i />
                </div>
              )}
            </div>
            <div className="iq-input">
              <span>{typed || <em>Ask about people, pay, hiring…</em>}</span>
              <span className="caret" />
              <button tabIndex={-1} aria-hidden="true">
                <Icon name="arrow" size={16} />
              </button>
            </div>
          </div>
        </Reveal>
        <div>
          <SectionHead kicker={iqCopy.kicker} title={iqCopy.title} text={iqCopy.text} />
          <div className="guard-grid">
            {iqCopy.guard.map((g, i) => (
              <Reveal key={g} delay={0.1 + i * 0.06} className="guard">
                <Icon name={['eye', 'lock', 'doc', 'bolt'][i]} size={18} />
                <span>{g}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Payroll: hover any line to see why it is there. Attendance: four ways to punch. */
export function Explain({ onZoom }) {
  const [hot, setHot] = useState(2);
  const net = useMemo(() => payrollLines.reduce((a, l) => a + l.amount, 0), []);
  return (
    <section className="explain">
      <div className="wrap">
        <SectionHead
          align="center"
          kicker="Explainable by design"
          title={<>Every number <em className="grad-text">tells you why.</em></>}
          text="SampCrew never hands you a figure without the reason behind it. Hover a line on the payslip."
        />
        <div className="explain-grid">
          <Reveal className="payslip-card" y={40}>
            <Tilt className="glass pad" max={5}>
              <div className="ps-head">
                <div>
                  <small>Payslip · October 2026</small>
                  <b>Arjun Kulkarni</b>
                </div>
                <span className="chip-ok">Finalised · frozen</span>
              </div>
              <ul className="ps-lines">
                {payrollLines.map((l, i) => (
                  <li key={l.label} className={i === hot ? 'hot' : ''} onPointerEnter={() => setHot(i)} onFocus={() => setHot(i)} tabIndex={0}>
                    <span>{l.label}</span>
                    <b className={l.amount < 0 ? 'neg' : ''}>{inr(l.amount)}</b>
                  </li>
                ))}
              </ul>
              <div className="ps-why" aria-live="polite">
                <Icon name="spark" size={16} />
                <motion.span key={hot} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }}>
                  <b>Why: </b>
                  {payrollLines[hot].why}
                </motion.span>
              </div>
              <div className="ps-net">
                <span>Net pay</span>
                <b className="grad-text">{inr(net)}</b>
              </div>
              <small className="muted">Illustrative figures from a demo workspace.</small>
            </Tilt>
          </Reveal>

          <div className="attend">
            <Reveal>
              <h3 className="h3">Attendance from every door.</h3>
              <p className="body">Raw punches are kept exactly as they arrived. The engine explains how each one became a day, a late mark or overtime.</p>
            </Reveal>
            <div className="attend-modes">
              {attendanceModes.map((a, i) => (
                <Reveal key={a.name} delay={i * 0.08}>
                  <Tilt className="mode glass" max={10}>
                    <span className="mode-ic">
                      <Icon name={a.icon} size={22} />
                    </span>
                    <b>{a.name}</b>
                    <small>{a.note}</small>
                  </Tilt>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <BrowserFrame src={screens.roster} alt="Shift roster in SampCrew" onClick={() => onZoom?.('roster', 'Shift roster')} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Live staffing-bid calculator: the maths SampCrew does for recruiters, in miniature. */
export function Bids({ onZoom }) {
  const [heads, setHeads] = useState(12);
  const [pay, setPay] = useState(28000);
  const [markup, setMarkup] = useState(18);
  const [months, setMonths] = useState(12);
  const loaded = pay * 1.13; // illustrative statutory + overhead load
  const bill = loaded * (1 + markup / 100);
  const monthly = bill * heads;
  const margin = (bill - loaded) * heads;
  const value = monthly * months;
  const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
  const belowCard = markup < 12;

  return (
    <section className="bids">
      <div className="wrap bids-grid">
        <div>
          <SectionHead
            kicker="Staffing bids · unique to SampCrew"
            title={<>Price the deal <em className="grad-text">while you talk.</em></>}
            text="Recruiters build Quick or Advanced Bids with live, exact cost, margin and contract value. Finance approves, the client receives a branded PDF and accepts online. Try the maths."
          />
          <Reveal delay={0.2}>
            <BrowserFrame src={screens.bid} alt="Staffing bid detail in SampCrew" onClick={() => onZoom?.('bid', 'Staffing bid')} />
          </Reveal>
        </div>
        <Reveal y={40}>
          <div className="calc glass pad">
            <div className="calc-head">
              <b>Quick Bid</b>
              <span className={`chip-ok ${belowCard ? 'warn' : ''}`}>{belowCard ? 'Below client rate card' : 'Within rate card'}</span>
            </div>
            <Slider label="Headcount" value={heads} min={1} max={60} onChange={setHeads} out={`${heads} people`} />
            <Slider label="Monthly pay per person" value={pay} min={15000} max={90000} step={500} onChange={setPay} out={fmt(pay)} />
            <Slider label="Markup" value={markup} min={5} max={40} onChange={setMarkup} out={`${markup}%`} />
            <Slider label="Contract length" value={months} min={1} max={36} onChange={setMonths} out={`${months} months`} />
            <div className="calc-out">
              <div>
                <small>Bill rate / person</small>
                <b>{fmt(bill)}</b>
              </div>
              <div>
                <small>Monthly margin</small>
                <b className="ok">{fmt(margin)}</b>
              </div>
              <div className="wide">
                <small>Contract value</small>
                <b className="grad-text big">{fmt(value)}</b>
              </div>
            </div>
            <div className="calc-flow">
              {['Draft', 'Finance approval', 'PDF sent', 'Client accepts online'].map((s, i) => (
                <span key={s} style={{ '--d': `${i * 0.6}s` }}>
                  {s}
                </span>
              ))}
            </div>
            <small className="muted">Illustration only. In SampCrew, loads, fees and rates come from your templates and client rate cards.</small>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Slider({ label, value, min, max, step = 1, onChange, out }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="slider">
      <span className="sl-top">
        <span>{label}</span>
        <output>{out}</output>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ '--p': `${pct}%` }} />
    </label>
  );
}
