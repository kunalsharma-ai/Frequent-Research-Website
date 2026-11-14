import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Hero from './sections/Hero.jsx';
import { Marquee, Converge, Stats } from './sections/Story.jsx';
import Platform from './sections/Platform.jsx';
import { Universe, IQ, Explain, Bids } from './sections/Intelligence.jsx';
import { Mobile, Different, Security, Themes, Integrations, Audiences, Gallery, FinalCta, Lightbox } from './sections/More.jsx';
import CursorGlow from './components/CursorGlow.jsx';

export default function App() {
  const [zoom, setZoom] = useState(null);
  const onZoom = useCallback((img, cap) => setZoom({ img, cap }), []);

  useEffect(() => {
    if (!zoom) return;
    const k = (e) => e.key === 'Escape' && setZoom(null);
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [zoom]);

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip" href="#platform">Skip to content</a>
      <div className="bg-aurora" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <CursorGlow />
      <Hero />
      <main>
        <Marquee />
        <Converge />
        <Stats />
        <Platform onZoom={onZoom} />
        <Universe onZoom={onZoom} />
        <IQ />
        <Explain onZoom={onZoom} />
        <Bids onZoom={onZoom} />
        <Mobile />
        <Different />
        <Themes />
        <Security onZoom={onZoom} />
        <Integrations />
        <Audiences />
        <Gallery onZoom={onZoom} />
        <FinalCta />
      </main>
      <Lightbox item={zoom} onClose={() => setZoom(null)} />
    </MotionConfig>
  );
}
