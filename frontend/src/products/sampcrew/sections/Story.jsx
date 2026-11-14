import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { marquee, scattered, stats } from '../content.js';
import { Counter, Reveal } from '../components/ui.jsx';
import icon from '../assets/brand/sampcrew-icon-static.webp'; // static mark; the animated SVG is used in the logo

export function Marquee() {
  const half = Math.ceil(marquee.length / 2);
  const rows = [marquee.slice(0, half), marquee.slice(half)];
  return (
    <section className="marquee" aria-label="Capabilities">
      {rows.map((row, r) => (
        <div className={`marquee-row ${r ? 'rev' : ''}`} key={r}>
          <div className="marquee-track">
            {[...row, ...row].map((m, i) => (
              <span key={i} className="mq-item" aria-hidden={i >= row.length}>
                <i style={{ '--h': `${(i * 37) % 360}` }} />
                {m}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* Scroll-pinned story: a dozen scattered tools collapse into one SampCrew core. */
export function Converge() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  /* build 80: tighter timing so a headline is always on screen while the tools gather (no empty screens) */
  const pull = useTransform(scrollYProgress, [0.12, 0.52], [1, 0]);
  const coreScale = useTransform(scrollYProgress, [0.25, 0.6], [0.4, 1]);
  const coreOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const t1 = useTransform(scrollYProgress, [0, 0.04, 0.36, 0.46], [0.5, 1, 1, 0]);
  const t2 = useTransform(scrollYProgress, [0.42, 0.54, 1], [0, 1, 1]);
  const ringRotate = useTransform(scrollYProgress, [0.5, 1], [0, 180]);

  return (
    <section className="converge" ref={ref}>
      <div className="converge-sticky">
        <div className="converge-stage">
          {scattered.map((s, i) => {
            const a = (i / scattered.length) * Math.PI * 2 + 0.3;
            const rx = Math.cos(a) * (36 + (i % 3) * 7);
            const ry = Math.sin(a) * (30 + (i % 2) * 8);
            return <Shard key={s} label={s} rx={rx} ry={ry} pull={pull} i={i} reduce={reduce} />;
          })}
          <motion.div className="converge-core" style={reduce ? undefined : { scale: coreScale, opacity: coreOpacity }}>
            <motion.div className="core-ring" style={reduce ? undefined : { rotate: ringRotate }} />
            <img src={icon} alt="" width="120" height="120" />
          </motion.div>
          <motion.div className="converge-copy a" style={reduce ? { opacity: 0 } : { opacity: t1 }}>
            <span className="kicker"><i />The old way</span>
            <h2 className="h2">Twelve tools.<br />One tired HR team.</h2>
            <p className="lead">Spreadsheets, inboxes, device software and payroll workbooks that never quite agree.</p>
          </motion.div>
          <motion.div className="converge-copy b" style={reduce ? { opacity: 1 } : { opacity: t2 }}>
            <span className="kicker"><i />The SampCrew way</span>
            <h2 className="h2">
              One <em className="grad-text">living system</em>
              <br />for your whole crew.
            </h2>
            <p className="lead">Every module shares one record, one set of permissions and one audit trail.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Shard({ label, rx, ry, pull, i, reduce }) {
  const x = useTransform(pull, (p) => `${rx * p}vw`);
  const y = useTransform(pull, (p) => `${ry * p}vh`);
  const r = useTransform(pull, (p) => `${(i % 2 ? 1 : -1) * 14 * p}deg`);
  const o = useTransform(pull, [0, 0.15, 1], [0, 1, 1]);
  const s = useTransform(pull, [0, 1], [0.3, 1]);
  return (
    <motion.span className="shard" style={reduce ? { display: 'none' } : { x, y, rotate: r, opacity: o, scale: s, '--h': (i * 47) % 360 }}>
      {label}
    </motion.span>
  );
}

export function Stats() {
  return (
    <section className="stats wrap" aria-label="SampCrew in numbers">
      {stats.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.08} className="stat">
          <b className="grad-text">
            <Counter to={s.n} suffix={s.suffix} />
          </b>
          <span>{s.label}</span>
        </Reveal>
      ))}
    </section>
  );
}
