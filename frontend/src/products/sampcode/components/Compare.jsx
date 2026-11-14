import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { X, Check } from 'lucide-react';
import { compare } from '../content.js';
import { Reveal, SectionHead } from './ui.jsx';
import icon from '../assets/brand/sampcode-icon.svg';
import './Compare.css';

// Where each scattered tool starts (percent of the stage), before it is pulled into SampCode.
const SPOTS = [
  [-38, -34], [30, -38], [-46, 6], [42, 2], [-30, 38], [32, 36], [-6, -46], [4, 46], [46, -20],
];

function Chip({ label, spot, progress, i }) {
  const x = useTransform(progress, [0, 1], [`${spot[0] * 9}%`, '0%']);
  const y = useTransform(progress, [0, 1], [`${spot[1] * 4}%`, '0%']);
  const rotate = useTransform(progress, [0, 1], [(i % 2 ? 1 : -1) * (6 + i), 0]);
  const opacity = useTransform(progress, [0, 0.75, 0.95], [1, 1, 0]);
  const scale = useTransform(progress, [0, 1], [1, 0.4]);
  return (
    <motion.span className="cp-chip" style={{ x, y, rotate, opacity, scale }}>
      <X size={13} /> {label}
    </motion.span>
  );
}

export default function Compare() {
  const stage = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start 85%', 'center 45%'] });
  const logoScale = useTransform(scrollYProgress, [0.55, 1], [0.4, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0.5, 0.9], [0, 1]);
  const ring = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  return (
    <section id="compare" className="section cp">
      <div className="wrap">
        <SectionHead kicker={compare.kicker} title={compare.title} sub={compare.sub} center />

        <div className="cp-stage" ref={stage} aria-hidden="true">
          {!reduce ? compare.scattered.map((s, i) => <Chip key={s} label={s} spot={SPOTS[i % SPOTS.length]} progress={scrollYProgress} i={i} />) : null}
          <motion.div className="cp-logo" style={reduce ? undefined : { scale: logoScale, opacity: logoOpacity }}>
            <motion.span className="cp-ring" style={{ opacity: ring, scale: ring }} />
            <img src={icon} alt="" />
            <b>SampCode</b>
          </motion.div>
        </div>

        <Reveal className="cp-table" role="table" aria-label="The usual stack compared with SampCode">
          <div className="cp-row cp-headrow" role="row">
            <span role="columnheader">What you need</span>
            <span role="columnheader">The usual way</span>
            <span role="columnheader" className="cp-ours-h">
              With SampCode
            </span>
          </div>
          {compare.rows.map((r, i) => (
            <motion.div
              key={r.need}
              className="cp-row"
              role="row"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span role="cell" className="cp-need">
                {r.need}
              </span>
              <span role="cell" className="cp-usual">
                <X size={15} /> {r.usual}
              </span>
              <span role="cell" className="cp-ours">
                <Check size={15} /> {r.ours}
              </span>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
