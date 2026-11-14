import { useCallback, useState } from 'react'
import Hero from './sections/Hero.jsx'
import Marquee from './sections/Marquee.jsx'
import Journey from './sections/Journey.jsx'
import Showcase from './sections/Showcase.jsx'
import ScreenWall from './sections/ScreenWall.jsx'
import Features from './sections/Features.jsx'
import GlobeSection from './sections/GlobeSection.jsx'
import Why from './sections/Why.jsx'
import Mobile from './sections/Mobile.jsx'
import Trust from './sections/Trust.jsx'
import CTA from './sections/CTA.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import CursorGlow from './components/CursorGlow.jsx'
import Lightbox from './components/Lightbox.jsx'

// Page order. Remove or reorder sections here.
export default function App() {
  const [zoom, setZoom] = useState(null)
  const close = useCallback(() => setZoom(null), [])
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <div className="noise" aria-hidden="true" />
      <main>
        <Hero />
        <Marquee />
        <Journey />
        <Showcase onZoom={setZoom} />
        <ScreenWall onZoom={setZoom} />
        <Features />
        <GlobeSection />
        <Why />
        <Mobile />
        <Trust />
        <CTA />
      </main>
      <Lightbox item={zoom} onClose={close} />
    </>
  )
}
