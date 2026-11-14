import { Info } from 'lucide-react';
import { INDIA } from '../content/content';
import { screen } from '../content/screens';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import ScreenFrame from '../components/ScreenFrame';
import { spotlightHandlers } from '../components/Spotlight';

function Orbit() {
  const inner = INDIA.orbit.slice(0, 6);
  const outer = INDIA.orbit.slice(6);
  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit-core">
        <span className="orbit-rupee">₹</span>
        <span className="orbit-core-label">One ledger</span>
      </div>
      <div className="orbit-ring r1">
        {inner.map((t, i) => (
          <span key={t} className="orbit-chip" style={{ '--a': `${(360 / inner.length) * i}deg` }}>
            <b>{t}</b>
          </span>
        ))}
      </div>
      <div className="orbit-ring r2">
        {outer.map((t, i) => (
          <span key={t} className="orbit-chip" style={{ '--a': `${(360 / outer.length) * i + 30}deg` }}>
            <b>{t}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function MonthStrip() {
  const due = new Map(INDIA.calendar.map((d) => [d.day, d]));
  return (
    <div className="month" aria-label="A typical month of Indian statutory due dates">
      <div className="month-head">
        <span>Your month, mapped</span>
        <small>Typical monthly due dates</small>
      </div>
      <div className="month-grid">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
          const hit = due.get(d);
          return (
            <span key={d} className={`month-day ${hit ? `is-due k-${hit.kind}` : ''}`} style={{ '--d': d }}>
              {d}
              {hit && <em>{hit.label}</em>}
            </span>
          );
        })}
      </div>
      <ul className="month-legend">
        {INDIA.calendar.map((d) => (
          <li key={d.day} className={`k-${d.kind}`}>
            <b>{d.day}</b> {d.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function IndiaCompliance({ reducedMotion, onOpen }) {
  return (
    <section className="section india" id="india">
      <div className="india-glow" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          index="03"
          eyebrow="File"
          title="India compliance,"
          accent="built into the books."
          lead="GST, TDS, TCS, payroll, e-invoices and e-way bills are prepared from the same posted entries you report from, so the return always agrees with the ledger."
        />

        <div className="india-hero">
          <Reveal variant="zoom">
            <Orbit />
          </Reveal>
          <Reveal delay={120}>
            <MonthStrip />
          </Reveal>
        </div>

        <div className="india-cards">
          {INDIA.cards.map((c, i) => (
            <Reveal key={c.title} className="india-card spotlight" delay={i * 90} {...spotlightHandlers()}>
              <ScreenFrame screen={screen(c.screen)} onOpen={onOpen} reducedMotion={reducedMotion} label={false} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="honesty">
          <Info size={16} aria-hidden="true" /> {INDIA.honesty}
        </Reveal>
      </div>
    </section>
  );
}
