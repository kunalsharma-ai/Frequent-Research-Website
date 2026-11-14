import { useCallback, useState } from 'react';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import AskShowcase from './sections/AskShowcase';
import PlatformStack from './sections/PlatformStack';
import IndiaCompliance from './sections/IndiaCompliance';
import AiTrust from './sections/AiTrust';
import FutureLab from './sections/FutureLab';
import Capabilities from './sections/Capabilities';
import Difference from './sections/Difference';
import { Stats, GlobalSecurity } from './sections/Proof';
import Gallery from './sections/Gallery';
import { FinalCta } from './sections/FinalCta';
import Lightbox from './components/Lightbox';
import ScrollProgress from './components/ScrollProgress';
import { useReducedMotion } from './hooks/useReducedMotion';

export default function App() {
  const reducedMotion = useReducedMotion();
  const [box, setBox] = useState({ list: [], index: null });

  const openOne = useCallback((s) => setBox({ list: [s], index: 0 }), []);
  const openList = useCallback((list, index) => setBox({ list, index }), []);
  const close = useCallback(() => setBox((b) => ({ ...b, index: null })), []);
  const setIndex = useCallback((index) => setBox((b) => ({ ...b, index })), []);

  return (
    <div className={`page ${reducedMotion ? 'reduced-motion' : ''}`}>
      <a className="skip-link" href="#ask">
        Skip to content
      </a>
      <ScrollProgress />
      <div className="noise" aria-hidden="true" />
      <main>
        <Hero reducedMotion={reducedMotion} />
        <Marquee />
        <AskShowcase reducedMotion={reducedMotion} onOpen={openOne} />
        <PlatformStack reducedMotion={reducedMotion} />
        <IndiaCompliance reducedMotion={reducedMotion} onOpen={openOne} />
        <AiTrust reducedMotion={reducedMotion} onOpen={openOne} />
        <FutureLab reducedMotion={reducedMotion} onOpen={openOne} />
        <Stats reducedMotion={reducedMotion} />
        <Capabilities />
        <Difference />
        <GlobalSecurity reducedMotion={reducedMotion} onOpen={openOne} />
        <Gallery onOpenList={openList} />
        <FinalCta />
      </main>
      <Lightbox list={box.list} index={box.index} onClose={close} onIndex={setIndex} />
    </div>
  );
}
