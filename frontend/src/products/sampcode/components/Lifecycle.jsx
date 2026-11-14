import { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Check } from 'lucide-react';
import { lifecycle } from '../content.js';
import { BrowserFrame, Reveal, SectionHead } from './ui.jsx';
import './Lifecycle.css';

export default function Lifecycle() {
  const track = useRef(null);
  const [active, setActive] = useState(0);
  const n = lifecycle.stages.length;
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999)))));
  const stage = lifecycle.stages[active];

  const goTo = (i) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (span * (i + 0.5)) / n, behavior: 'smooth' });
  };

  return (
    <section id="lifecycle" className="section lc" style={{ '--accent': stage.accent }}>
      <div className="wrap">
        <SectionHead kicker={lifecycle.kicker} title={lifecycle.title} sub={lifecycle.sub} />
      </div>

      {/* Desktop: sticky scroll story */}
      <div className="lc-track" ref={track} style={{ height: `${n * 80 + 20}vh` }}>
        <div className="lc-sticky">
          <div className="lc-glow" aria-hidden="true" />
          <div className="wrap lc-grid">
            <ol className="lc-steps">
              {lifecycle.stages.map((s, i) => (
                <li key={s.id} className={i === active ? 'on' : i < active ? 'done' : ''} style={{ '--c': s.accent }}>
                  <button onClick={() => goTo(i)} aria-current={i === active ? 'step' : undefined}>
                    <span className="lc-num">{s.step}</span>
                    <span className="lc-name">{s.name}</span>
                  </button>
                  <AnimatePresence initial={false}>
                    {i === active ? (
                      <motion.div
                        className="lc-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <h3>{s.title}</h3>
                        <p>{s.body}</p>
                        <ul>
                          {s.points.map((p) => (
                            <li key={p}>
                              <Check size={15} /> {p}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              ))}
            </ol>
            <div className="lc-visual">
              <div className="lc-counter" aria-hidden="true">
                <span key={stage.step} className="lc-big">
                  {stage.step}
                </span>
                <span className="lc-of">/ 0{n}</span>
              </div>
              <div className="lc-frame">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={stage.id}
                    className="lc-shot"
                    initial={{ clipPath: 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)', rotateY: -12, scale: 0.94 }}
                    animate={{ clipPath: 'polygon(-50% 50%, 50% -50%, 150% 50%, 50% 150%)', rotateY: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04, filter: 'blur(10px)' }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <BrowserFrame image={stage.image} url={`app.sampcode.com/${stage.id}`} />
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="lc-bar" aria-hidden="true">
                {lifecycle.stages.map((s, i) => (
                  <i key={s.id} className={i <= active ? 'on' : ''} style={{ '--c': s.accent }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="wrap lc-mobile">
        {lifecycle.stages.map((s) => (
          <Reveal key={s.id} className="lc-card" style={{ '--c': s.accent }}>
            <span className="lc-num">{s.step}</span>
            <h3>
              <span className="lc-name">{s.name}</span>
              {s.title}
            </h3>
            <p>{s.body}</p>
            <BrowserFrame image={s.image} url={`app.sampcode.com/${s.id}`} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
