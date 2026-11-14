import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import Lifecycle from './components/Lifecycle.jsx';
import Different from './components/Different.jsx';
import Tour from './components/Tour.jsx';
import QualityDemo from './components/QualityDemo.jsx';
import Modes from './components/Modes.jsx';
import Compare from './components/Compare.jsx';
import MobileApp from './components/MobileApp.jsx';
import Security from './components/Security.jsx';
import FinalCta from './components/FinalCta.jsx';

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const glow = useRef(null);

  // Soft light that follows the pointer on desktop.
  useEffect(() => {
    const el = glow.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;
    let x = 0, y = 0, raf = 0;
    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        raf = 0;
      });
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);

  return (
    <div className="sc-root">
      <a className="skip-link" href="#main">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="cursor-glow" ref={glow} aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
      <main id="main">
        <Hero />
        <Marquee />
        <Lifecycle />
        <Different />
        <Tour />
        <QualityDemo />
        <Modes />
        <Compare />
        <MobileApp />
        <Security />
        <FinalCta />
      </main>
    </div>
  );
}
