import { MessagesSquare, ShieldCheck, IndianRupee, Layers, FlaskConical, Lock, Sparkles } from 'lucide-react';

const Icons = { MessagesSquare, ShieldCheck, IndianRupee, Layers, FlaskConical, Lock };
import { DIFFERENTIATORS, STACK } from '../content/content';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import { useInView } from '../hooks/useInView';
import { spotlightHandlers } from '../components/Spotlight';
import icon from '../assets/brand/talk2tax-icon.svg';

/** Scattered tools collapse into one Talk2Tax core when the section comes into view. */
function Collapse() {
  const [ref, inView] = useInView({ threshold: 0.45 });
  return (
    <div ref={ref} className={`collapse ${inView ? 'is-merged' : ''}`} aria-label="Eight separate tools become one Talk2Tax">
      <svg className="collapse-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {STACK.scattered.map((_, i) => {
          const a = (i / STACK.scattered.length) * Math.PI * 2;
          return <line key={i} x1="50" y1="50" x2={50 + Math.cos(a) * 36} y2={50 + Math.sin(a) * 38} style={{ '--i': i }} />;
        })}
      </svg>
      {STACK.scattered.map((t, i) => {
        const a = (i / STACK.scattered.length) * Math.PI * 2;
        return (
          <span key={t} className="collapse-chip" style={{ '--x': `${(Math.cos(a) * 36).toFixed(2)}cqw`, '--y': `${(Math.sin(a) * 38).toFixed(2)}cqh`, '--i': i }}>
            {t}
          </span>
        );
      })}
      <div className="collapse-core">
        <img src={icon} alt="" />
        <b>Talk2Tax</b>
        <small>one ledger</small>
      </div>
    </div>
  );
}

export default function Difference() {
  return (
    <section className="section diff" id="different">
      <div className="container">
        <SectionHeader
          index="07"
          eyebrow="Why Talk2Tax"
          title="Stop stitching tools together."
          accent="Start talking to one."
          lead="Most small and growing businesses run finance on a patchwork: books in one place, GST in another, payroll elsewhere, forecasts in spreadsheets. Talk2Tax puts it on one ledger and lets you ask it questions."
        />

        <div className="diff-top">
          <Collapse />
          <Reveal className="compare" variant="right">
            <div className="compare-head">
              <span>What you need</span>
              <span>The usual way</span>
              <span className="is-t2t">With Talk2Tax</span>
            </div>
            {STACK.rows.map((r, i) => (
              <div className="compare-row" key={r.need} style={{ '--i': i }}>
                <span className="compare-need">{r.need}</span>
                <span className="compare-usual">{r.usual}</span>
                <span className="compare-t2t">{r.t2t}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="diff-grid">
          {DIFFERENTIATORS.map((d, i) => {
            const Icon = Icons[d.icon] || Sparkles;
            return (
              <Reveal key={d.title} className="diff-card spotlight" delay={i * 70} {...spotlightHandlers()}>
                <span className="diff-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="diff-icon">
                  <Icon size={24} aria-hidden="true" />
                </span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
