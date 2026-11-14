import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useSpring, useTransform } from 'framer-motion';
import { quality } from '../content.js';
import { SectionHead } from './ui.jsx';
import './QualityDemo.css';

function verdict(score, threshold) {
  if (score >= threshold) return { label: 'Accepted automatically', cls: 'ok' };
  if (score >= 30) return { label: 'Sent to the review queue', cls: 'review' };
  return { label: 'Review queue · likely reject', cls: 'bad' };
}

export default function QualityDemo() {
  const [on, setOn] = useState(['straightline']);
  const total = quality.signals.filter((s) => on.includes(s.id)).reduce((a, s) => a + s.penalty, 0);
  const score = Math.max(0, 100 - total);
  const spring = useSpring(score, { stiffness: 80, damping: 16 });
  const shown = useTransform(spring, (v) => Math.round(v));
  const C = 2 * Math.PI * 120;
  const offset = useTransform(spring, (x) => C * (1 - x / 100));
  const [num, setNum] = useState(score);
  useEffect(() => {
    spring.set(score);
  }, [score, spring]);
  useEffect(() => shown.on('change', setNum), [shown]);
  const v = verdict(score, quality.threshold);
  const hue = num >= quality.threshold ? 'var(--lime)' : num >= 30 ? 'var(--amber)' : 'var(--coral)';

  return (
    <section id="quality" className="section qd">
      <div className="wrap qd-grid">
        <div>
          <SectionHead kicker={quality.kicker} title={quality.title} sub={quality.sub} />
          <div className="qd-signals" role="group" aria-label="Fraud signals">
            {quality.signals.map((s) => {
              const active = on.includes(s.id);
              return (
                <button key={s.id} className={active ? 'on' : ''} aria-pressed={active} onClick={() => setOn((o) => (active ? o.filter((x) => x !== s.id) : [...o, s.id]))}>
                  <span className="qd-switch" aria-hidden="true">
                    <i />
                  </span>
                  <span className="qd-label">
                    <strong>{s.label}</strong>
                    <small>{s.detail}</small>
                  </span>
                  <span className="qd-pen">−{s.penalty}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="qd-meter" style={{ '--hue': hue }}>
          <div className="qd-ring">
            <svg viewBox="0 0 280 280" aria-hidden="true">
              <circle cx="140" cy="140" r="120" className="track" />
              <circle cx="140" cy="140" r="120" className="tick" style={{ strokeDasharray: `2 ${(C - 120) / 60}` }} />
              <motion.circle cx="140" cy="140" r="120" className="val" strokeDasharray={C} style={{ strokeDashoffset: offset }} />
              <circle cx="140" cy="140" r="120" className="thr" strokeDasharray={`3 ${C}`} strokeDashoffset={-C * (quality.threshold / 100)} />
            </svg>
            <div className="qd-num" aria-live="polite">
              <span>{num}</span>
              <small>quality score</small>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={v.cls} className={`qd-verdict ${v.cls}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {v.label}
            </motion.div>
          </AnimatePresence>
          <p className="qd-note">Review threshold set to {quality.threshold}. Illustration of the built-in checks; each survey can add its own.</p>
        </div>
      </div>
    </section>
  );
}
