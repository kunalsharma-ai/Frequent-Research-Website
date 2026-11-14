import { useEffect, useState } from 'react';
import { Mail, Sparkles, Check } from 'lucide-react';
import { SPECS_DEMO as D } from '../content.js';
import { reducedMotion, useInView } from '../hooks.js';

const HIGHLIGHT = /(US n=\d+|Germany n=\d+|Japan n=\d+|LOI \d+ min|IR \d+%|IT decision makers|questionnaire programming|translation into German and Japanese|feasibility|turnaround)/gi;

function marked(text) {
  return text.split(HIGHLIGHT).map((part, i) => (i % 2 ? <mark key={i}>{part}</mark> : part));
}

const money = (v) => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

export default function SpecsDemo() {
  const [ref, seen] = useInView({ threshold: 0.25 });
  const full = D.email.length;
  const STEPS = 1 + D.fields.length + D.markets.length + D.extras.length + D.questions.length + 1;
  const [n, setN] = useState(full);
  const [step, setStep] = useState(STEPS);
  const [scanKey, setScanKey] = useState(0);

  useEffect(() => {
    if (!seen || reducedMotion()) return;
    let cancelled = false; const timers = [];
    const wait = (ms) => new Promise((r) => timers.push(setTimeout(r, ms)));
    (async () => {
      while (!cancelled) {
        setStep(0); setN(0);
        for (let i = 0; i <= full && !cancelled; i += 2) { setN(i); await wait(14); }
        setN(full); await wait(250);
        setScanKey((k) => k + 1); await wait(900);
        for (let s = 1; s <= STEPS && !cancelled; s++) { setStep(s); await wait(s <= D.fields.length + 1 ? 260 : 480); }
        await wait(6500);
      }
    })();
    return () => { cancelled = true; timers.forEach(clearTimeout); };
  }, [seen]);

  const fStart = 1, mStart = fStart + D.fields.length, xStart = mStart + D.markets.length, qStart = xStart + D.extras.length, done = STEPS;
  const lines = [
    ...D.markets.map((m, i) => ({ on: step >= mStart + i, amount: m.n * m.cpi })),
    ...D.extras.map((x, i) => ({ on: step >= xStart + i, amount: x.amount })),
  ];
  const total = lines.filter((l) => l.on).reduce((a, l) => a + l.amount, 0);

  return (
    <section className="section" id="specs" ref={ref}>
      <div className="wrap">
        <div className="head rv">
          <span className="eyebrow">Specs to bid</span>
          <h2 className="h2">{D.title[0]} <span className="alt grad-warm">{D.title[1]}</span></h2>
          <p className="lede">{D.sub}</p>
        </div>
        <div className="specs rv" style={{ '--d': '.1s' }}>
          <div className="panel">
            <div className="panel-h"><Mail size={14} /> Client email · RFQ-0042</div>
            <div className="email">{marked(D.email.slice(0, n))}{n < full && <span className="cur" />}</div>
            <div key={scanKey} className={`scan ${scanKey ? 'go' : ''}`} aria-hidden="true" />
          </div>
          <div className="panel">
            <div className="panel-h"><Sparkles size={14} /> Bid draft <span className="tag">{step >= done ? 'Ready to check' : 'Drafting…'}</span></div>
            <div className="chips">
              {D.fields.map((f, i) => <span key={f.k} className={`chip ${step >= fStart + i ? 'on' : ''}`}><b>{f.k}</b>{f.v}</span>)}
            </div>
            <div className="lines">
              {D.markets.map((m, i) => (
                <div key={m.code} className={`line ${step >= mStart + i ? 'on' : ''}`}>
                  <span className="cc">{m.code}</span>
                  <span className="nm">{m.name}<small>n={m.n} · panel sample</small></span>
                  <span className="cpi">CPI ${m.cpi.toFixed(2)}</span>
                  <span className="amt">{money(m.n * m.cpi)}</span>
                </div>
              ))}
              {D.extras.map((x, i) => (
                <div key={x.name} className={`line svc ${step >= xStart + i ? 'on' : ''}`}>
                  <span className="cc">+</span>
                  <span className="nm">{x.name}</span>
                  <span className="cpi">fixed</span>
                  <span className="amt">{money(x.amount)}</span>
                </div>
              ))}
            </div>
            <div className="total"><span>Bid total · margin checked</span><strong className="grad-warm">{money(total)}</strong></div>
            <div className="qa">
              {D.questions.map((q, i) => (
                <div key={q.q} className={step >= qStart + i ? 'on' : ''}><b>{q.q}</b><span>{q.a}</span></div>
              ))}
            </div>
            <div className="confirm">
              <span className={`ok ${step >= done ? 'on' : ''}`}><Check size={16} /> Yes, the draft is right</span>
            </div>
            <p className="demo-note">{D.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
