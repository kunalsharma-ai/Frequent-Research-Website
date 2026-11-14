import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { tour } from '../content.js';
import { BrowserFrame, SectionHead } from './ui.jsx';
import './Tour.css';

const DURATION = 6000;

export default function Tour() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const box = useRef(null);
  const inView = useInView(box, { amount: 0.4 });
  const reduce = useReducedMotion();
  const tab = tour.tabs[i];
  const playing = inView && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = setTimeout(() => setI((n) => (n + 1) % tour.tabs.length), DURATION);
    return () => clearTimeout(id);
  }, [i, playing]);

  // 3D tilt following the pointer.
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--rx', `${-y * 6}deg`);
    e.currentTarget.style.setProperty('--ry', `${x * 8}deg`);
  };
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
    setPaused(false);
  };

  return (
    <section id="tour" className="section tour">
      <div className="wrap">
        <SectionHead kicker={tour.kicker} title={tour.title} sub={tour.sub} center />
        <div className="tour-tabs" role="tablist" aria-label="Product screens">
          {tour.tabs.map((t, n) => (
            <button key={t.id} role="tab" aria-selected={n === i} className={n === i ? 'on' : ''} onClick={() => setI(n)}>
              {t.label}
              {n === i ? (
                <span className="tour-progress" aria-hidden="true">
                  <span key={`${i}-${playing}`} style={{ animationDuration: `${DURATION}ms`, animationPlayState: playing ? 'running' : 'paused' }} />
                </span>
              ) : null}
            </button>
          ))}
        </div>
        <div className="tour-stage" ref={box} onMouseMove={onMove} onMouseEnter={() => setPaused(true)} onMouseLeave={onLeave}>
          <div className="tour-tilt">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 30, scale: 0.98, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, scale: 1.01, filter: 'blur(12px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <BrowserFrame image={tab.image} url={`app.sampcode.com/${tab.id}`} />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.p key={tab.id} className="tour-caption" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <span>{String(i + 1).padStart(2, '0')}</span> {tab.caption}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
