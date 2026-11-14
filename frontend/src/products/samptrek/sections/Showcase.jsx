import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import BrowserFrame from '../components/BrowserFrame.jsx'
import Icon from '../components/Icon.jsx'
import { showcase, screens } from '../content.js'

const DURATION = 6500

// Auto-playing product tour: tabs on the left, a live browser window on the right.
export default function Showcase({ onZoom }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { margin: '-20% 0px' })
  const reduce = useReducedMotion()
  const tabs = showcase.tabs
  const t = tabs[i]
  const running = inView && !paused && !reduce

  useEffect(() => {
    if (!running) return
    const id = setTimeout(() => setI((v) => (v + 1) % tabs.length), DURATION)
    return () => clearTimeout(id)
  }, [i, running, tabs.length])

  return (
    <section id="product" className="showcase" ref={ref}>
      <div className="showcase-bg" aria-hidden="true" />
      <SectionHeading kicker={showcase.kicker} title={showcase.title} accent={showcase.accent} sub={showcase.sub} />
      <div className="showcase-grid" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
        <div className="tabs" role="tablist" aria-label="Product screens">
          {tabs.map((tab, k) => (
            <button key={tab.id} role="tab" aria-selected={k === i} className={`tab ${k === i ? 'active' : ''}`} onClick={() => setI(k)}>
              <span className="tab-icon"><Icon name={tab.icon} size={18} /></span>
              <span className="tab-label">{tab.label}</span>
              {k === i && <span className="tab-progress" key={`${i}-${running}`} style={{ animationDuration: `${DURATION}ms`, animationPlayState: running ? 'running' : 'paused' }} />}
            </button>
          ))}
        </div>
        <div className="showcase-stage">
          <BrowserFrame url={`app.samptrek.com/${t.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.button
                key={t.id}
                className="shot-btn"
                onClick={() => onZoom?.({ src: screens[t.img], alt: t.alt })}
                aria-label={`Enlarge: ${t.alt}`}
                initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0 round 12px)', scale: 1.04 }}
                animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0 round 12px)', scale: 1 }}
                exit={{ opacity: 0, scale: 0.98, filter: 'blur(6px)' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <img src={screens[t.img]} alt={t.alt} loading="lazy" decoding="async" />
                <span className="zoom-hint"><Icon name="Maximize2" size={14} />Click to enlarge</span>
              </motion.button>
            </AnimatePresence>
          </BrowserFrame>
          <AnimatePresence mode="wait">
            <motion.div key={t.id} className="showcase-copy" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
              <h3>{t.title}</h3>
              <ul>{t.points.map((p) => <li key={p}><Icon name="CircleCheck" size={18} />{p}</li>)}</ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
