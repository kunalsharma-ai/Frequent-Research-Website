import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Check, Apple, Smartphone } from 'lucide-react';
import { mobile } from '../content.js';
import { PhoneFrame, Reveal, SectionHead } from './ui.jsx';
import './MobileApp.css';

export default function MobileApp() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y2 = useTransform(scrollYProgress, [0, 1], [160, -40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const r = useTransform(scrollYProgress, [0, 1], [8, -8]);
  const rNeg = useTransform(r, (x) => -x);
  const ys = [y1, y2, y3];
  const rots = [r, 0, rNeg];

  return (
    <section id="mobile" className="section mob" ref={ref}>
      <div className="wrap mob-grid">
        <div>
          <SectionHead kicker={mobile.kicker} title={mobile.title} sub={mobile.body} />
          <Reveal as="ul" className="mob-points" delay={0.2}>
            {mobile.points.map((p) => (
              <li key={p}>
                <Check size={16} /> {p}
              </li>
            ))}
          </Reveal>
          <Reveal className="mob-stores" delay={0.3}>
            <span>
              <Smartphone size={18} /> Android
            </span>
            <span>
              <Apple size={18} /> iOS
            </span>
          </Reveal>
        </div>
        <div className="mob-phones">
          {mobile.images.map((img, i) => (
            <motion.div key={img} className={`mob-phone p${i}`} style={reduce ? undefined : { y: ys[i], rotate: rots[i] }}>
              <PhoneFrame image={img} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
