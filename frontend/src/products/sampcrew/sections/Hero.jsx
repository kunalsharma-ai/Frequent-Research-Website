import { lazy, Suspense, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { hero, links, screens } from '../content.js';
import { Rotator, Magnetic, BrowserFrame } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';

const HeroScene = lazy(() => import('../three/HeroScene.jsx'));

const ease = [0.16, 1, 0.3, 1];
const word = {
  hidden: { y: '110%', rotate: 6, opacity: 0 },
  show: (i) => ({ y: '0%', rotate: 0, opacity: 1, transition: { duration: 1.1, delay: 0.25 + i * 0.12, ease } }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  const stage = useRef(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'end start'] });
  const rotX = useTransform(scrollYProgress, [0, 0.45], [32, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.45], [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 0.45], [60, 0]);
  const chipY = useTransform(scrollYProgress, [0, 1], [60, -120]);

  return (
    <header className="hero" id="top">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <div className="hero-veil" aria-hidden="true" />

      <div className="hero-inner wrap">
        <motion.p className="eyebrow" initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <span className="pulse" />
          {hero.eyebrow}
        </motion.p>

        <h1 className="hero-title">
          <span className="line">
            <motion.span className="w" custom={0} variants={word} initial={reduce ? false : 'hidden'} animate="show">
              {hero.titleA}
            </motion.span>
          </span>
          <span className="line">
            <motion.span className="w" custom={1} variants={word} initial={reduce ? false : 'hidden'} animate="show">
              <span className="grad-text italic">{hero.titleB}</span>
            </motion.span>
          </span>
        </h1>

        <motion.p className="hero-rot" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
          {hero.rotatingPrefix} <Rotator words={hero.rotating} />
        </motion.p>

        <motion.p className="hero-sub" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9, ease }}>
          {hero.sub}
        </motion.p>

        <motion.div className="hero-ctas" initial={reduce ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.9, ease }}>
          <Magnetic className="btn-primary" href={links.demo}>
            {hero.primary} <Icon name="arrow" size={18} />
          </Magnetic>
          <Magnetic className="btn-ghost" href="#platform">
            <span className="play">
              <Icon name="play" size={12} />
            </span>
            {hero.secondary}
          </Magnetic>
        </motion.div>

        <div className="scroll-cue" aria-hidden="true">
          <span />
        </div>
      </div>

      <div className="hero-stage wrap" ref={stage}>
        <motion.div className="hero-shot" style={reduce ? undefined : { rotateX: rotX, scale, y }}>
          <BrowserFrame src={screens.home} alt="SampCrew Home dashboard with live workforce KPIs, workforce overview chart and department breakdown" eager />
          <div className="shot-glow" aria-hidden="true" />
        </motion.div>
        {hero.chips.map((c, i) => (
          <motion.div
            key={c.k}
            className={`float-chip tone-${c.tone} c${i}`}
            style={reduce ? undefined : { y: chipY }}
            initial={reduce ? false : { opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.8, ease }}
          >
            <b>{c.k}</b>
            <span>{c.v}</span>
          </motion.div>
        ))}
      </div>
    </header>
  );
}
