import Hero from './components/Hero.jsx';
import SpecsDemo from './components/SpecsDemo.jsx';
import Journey from './components/Journey.jsx';
import Globe from './components/Globe.jsx';
import { Ticker, Features, Compare, Security, Mobile, Themes, Admin, Gallery, FinalCta, CursorGlow } from './components/Sections.jsx';
import { useReveal } from './hooks.js';

export default function App() {
  useReveal();
  return (
    <>
      <CursorGlow />
      <main>
        <Hero />
        <Ticker />
        <SpecsDemo />
        <Journey />
        <Features />
        <Globe />
        <Compare />
        <Security />
        <Mobile />
        <Themes />
        <Admin />
        <Gallery />
        <FinalCta />
      </main>
    </>
  );
}
