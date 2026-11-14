import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, FlaskConical, ShieldCheck, Send, Sparkles } from 'lucide-react';
import { hero, site } from '../content.js';
import { BrowserFrame } from './ui.jsx';
import icon from '../assets/brand/sampcode-icon.svg';
import './Hero.css';

const WORD_STYLE = ['w-outline', 'w-warm', 'w-serif'];

function Letters({ word, delay, className }) {
  const reduce = useReducedMotion();
  return (
    <span className={`hero-word ${className}`} aria-hidden="true">
      {word.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="hero-letter"
          initial={reduce ? false : { opacity: 0, y: '0.6em', rotateX: -90, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function Rotator({ items }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % items.length), 2600);
    return () => clearInterval(id);
  }, [items.length, reduce]);
  return (
    <span className="rotator">
      <AnimatePresence initial={false}>
        <motion.span
          key={i}
          className="rotator-item grad-text"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const badges = [
  { cls: 'b1', icon: CheckCircle2, color: 'var(--lime)', title: 'Logic check', text: 'Ready to publish · 0 errors' },
  { cls: 'b2', icon: FlaskConical, color: 'var(--cyan)', title: 'QA lab', text: '500 simulated respondents · 100% coverage' },
  { cls: 'b3', icon: ShieldCheck, color: 'var(--lilac)', title: 'Quality score', text: 'Every complete scored 0–100' },
  { cls: 'b4', icon: Send, color: 'var(--pink)', title: 'Complete', text: 'Redirected to vendor + S2S callback' },
];

export default function Hero() {
  const canvas = useRef(null);
  const stage = useRef(null);
  const [webgl, setWebgl] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!canvas.current) return;
    let dispose = null;
    let cancelled = false;
    const compact = window.innerWidth < 760;
    // three.js loads in its own chunk so the text paints first.
    import('../three/heroScene.js').then(({ createHeroScene }) => {
      if (cancelled || !canvas.current) return;
      dispose = createHeroScene(canvas.current, { reducedMotion: !!reduce, compact });
      if (!dispose) setWebgl(false);
    });
    return () => {
      cancelled = true;
      if (dispose) dispose();
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: stage, offset: ['start end', 'center center'] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const rotateX = useTransform(p, [0, 1], [34, 0]);
  const scale = useTransform(p, [0, 1], [0.86, 1]);
  const y = useTransform(p, [0, 1], [60, 0]);
  const badgeY = useTransform(p, [0, 1], [80, 0]);

  return (
    <section id="top" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="orb" style={{ width: 620, height: 620, left: '-12%', top: '-10%', background: '#1e3a8a' }} />
        <div className="orb" style={{ width: 560, height: 560, right: '-8%', top: '10%', background: '#5b21b6' }} />
        <div className="orb" style={{ width: 420, height: 420, left: '30%', top: '55%', background: '#0e7490', opacity: 0.35 }} />
        <div className="bg-grid" />
      </div>
      <canvas ref={canvas} className="hero-canvas" aria-hidden="true" />
      {!webgl ? <img className="hero-fallback" src={icon} alt="" aria-hidden="true" /> : null}

      <div className="wrap hero-copy">
        <motion.a
          href="#lifecycle"
          className="hero-eyebrow"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="dot" /> {hero.eyebrow} <ArrowRight size={15} />
        </motion.a>

        <h1 className="hero-title">
          <span className="sr-only">{site.productName}: {hero.words.join(' ')}</span>
          {hero.words.map((w, i) => (
            <Letters key={w} word={w} delay={0.25 + i * 0.32} className={WORD_STYLE[i % 3]} />
          ))}
        </h1>

        <motion.p className="hero-lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}>
          {hero.lead} <Rotator items={hero.rotating} />
        </motion.p>
        <motion.p className="hero-sub" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}>
          {hero.sub}
        </motion.p>
        <motion.div className="hero-ctas" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.8 }}>
          <a className="btn btn-primary" href={site.demoUrl}>
            {hero.primaryCta} <ArrowRight size={18} />
          </a>
          <a className="btn" href="#tour">
            <span className="play">
              <Play size={12} fill="currentColor" />
            </span>
            {hero.secondaryCta}
          </a>
        </motion.div>
        <motion.ul className="hero-chips" initial="h" animate="s" variants={{ s: { transition: { staggerChildren: 0.07, delayChildren: 1.9 } } }}>
          {hero.chips.map((c) => (
            <motion.li key={c} variants={{ h: { opacity: 0, y: 12, scale: 0.9 }, s: { opacity: 1, y: 0, scale: 1 } }}>
              <Sparkles size={13} /> {c}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <div className="hero-stage wrap" ref={stage}>
        <motion.div className="hero-screen" style={reduce ? undefined : { rotateX, scale, y }}>
          <BrowserFrame image="dashboard" url="app.sampcode.com/dashboard" eager />
          <div className="hero-screen-shine" aria-hidden="true" />
        </motion.div>
        {badges.map((b, i) => (
          <motion.div
            key={b.cls}
            className={`hero-badge ${b.cls}`}
            style={reduce ? undefined : { y: badgeY }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="hb-icon" style={{ color: b.color, boxShadow: `0 0 24px -4px ${b.color}` }}>
              <b.icon size={18} />
            </span>
            <span>
              <strong>{b.title}</strong>
              <small>{b.text}</small>
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
