import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import RespondentFlow from '../components/RespondentFlow.jsx'
import Counter from '../components/Counter.jsx'
import Icon from '../components/Icon.jsx'
import useMedia from '../hooks/useMedia.js'
import { hero, links, screens } from '../content.js'

const LAYERS = [
  { img: screens.monitor, alt: 'Fieldwork monitor' },
  { img: screens.analytics, alt: 'Analytics dashboard' },
  { img: screens.commandCenter, alt: 'SampTrek command center' },
]

function Rotator({ words }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2200)
    return () => clearInterval(t)
  }, [words.length, reduce])
  return (
    <span className="rotator" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="rotator-word grad-text"
          initial={{ y: '90%', opacity: 0, rotateX: -70, filter: 'blur(6px)' }}
          animate={{ y: '0%', opacity: 1, rotateX: 0, filter: 'blur(0px)' }}
          exit={{ y: '-90%', opacity: 0, rotateX: 70, filter: 'blur(6px)' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Layer({ i, img, alt, spread, opacity }) {
  const z = useTransform(spread, (s) => i * 120 * s)
  return (
    <motion.div className={`slab slab-${i}`} style={{ z, opacity }}>
      <div className="slab-face"><img src={img} alt={alt} draggable="false" /></div>
      <div className="slab-edge slab-edge-b" />
      <div className="slab-edge slab-edge-r" />
    </motion.div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const desktop = useMedia('(min-width: 1000px)', true)
  const reduce = useReducedMotion()
  const scrolly = desktop && !reduce
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.4 })
  const zero = useMotionValue(0)
  const prog = scrolly ? p : zero

  // mouse parallax
  const mx = useSpring(0, { stiffness: 60, damping: 18 }), my = useSpring(0, { stiffness: 60, damping: 18 })
  useEffect(() => {
    if (reduce) return
    const on = (e) => { mx.set(e.clientX / innerWidth - 0.5); my.set(e.clientY / innerHeight - 0.5) }
    addEventListener('pointermove', on)
    return () => removeEventListener('pointermove', on)
  }, [reduce])

  const flat = useTransform(prog, [0.05, 0.72], [0, 1], { clamp: true })
  const rotateX = useTransform([flat, my], ([f, y]) => (1 - f) * (54 - y * 10))
  const rotateZ = useTransform([flat, mx], ([f, x]) => (1 - f) * (-40 + x * 12))
  const spread = useTransform([flat], ([f]) => 1 - f)
  const x = useTransform(flat, [0, 1], desktop ? ['23vw', '0vw'] : ['0vw', '0vw'])
  const y = useTransform(flat, [0, 1], desktop ? ['4vh', '-3vh'] : ['0vh', '0vh'])
  const scale = useTransform(flat, [0, 1], desktop ? [0.6, 0.86] : [0.92, 1])
  const lowerOpacity = useTransform(flat, [0.55, 0.9], [1, 0])
  const textOpacity = useTransform(prog, [0, 0.28], [1, 0])
  const textY = useTransform(prog, [0, 0.28], [0, -90])
  const checkZ = useTransform(spread, (s) => 240 * s + 40)
  const capOpacity = useTransform(prog, [0.7, 0.88], [0, 1])
  const capY = useTransform(prog, [0.7, 0.88], [30, 0])

  return (
    <section id="top" ref={ref} className={`hero ${scrolly ? 'hero-scrolly' : ''}`}>
      <div className="hero-stage">
        <div className="aurora" aria-hidden="true"><i className="a1" /><i className="a2" /><i className="a3" /><i className="a4" /></div>
        <div className="grid-floor" aria-hidden="true" />
        <RespondentFlow target={desktop ? [0.72, 0.52] : [0.5, 0.78]} density={desktop ? 1 : 0.6} />

        <motion.div className="hero-copy" style={scrolly ? { opacity: textOpacity, y: textY } : undefined}>
          <motion.span className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}>
            <span className="eyebrow-pill">NEW</span>{hero.eyebrow}
          </motion.span>
          <h1 className="h1">
            <motion.span className="line" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>{hero.titleStart}</motion.span>
            <motion.span className="line" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}><Rotator words={hero.rotating} /></motion.span>
            <motion.span className="line on-track" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
              <span className="serif-accent">{hero.titleEnd}</span>
              <svg className="trail-underline" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true">
                <defs><linearGradient id="tu" x1="0" x2="1"><stop offset="0" stopColor="#FEE440" /><stop offset=".5" stopColor="#F15BB5" /><stop offset="1" stopColor="#9B5DE5" /></linearGradient></defs>
                <motion.path d="M4 26 C 70 6, 120 38, 190 20 S 320 8, 396 22" fill="none" stroke="url(#tu)" strokeWidth="5" strokeLinecap="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 1.4, ease: 'easeInOut' }} />
              </svg>
            </motion.span>
          </h1>
          <motion.p className="hero-sub" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9 }}>{hero.sub}</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.9 }}>
            <a className="btn btn-primary btn-lg" href={links.demo}><span>{hero.primary}</span><Icon name="ArrowRight" size={18} /></a>
            <a className="btn btn-glass btn-lg" href="#journey"><Icon name="Play" size={16} /><span>{hero.secondary}</span></a>
          </motion.div>
          <motion.ul className="hero-facts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
            {hero.facts.map((f) => (
              <li key={f.label}><Counter className="fact-num" to={f.value} suffix={f.suffix} /><span>{f.label}</span></li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div className="stack-wrap" style={{ x, y, scale }}>
          <motion.div className="stack" style={{ rotateX, rotateZ }}
            initial={{ opacity: 0, y: 120 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}>
            {LAYERS.map((l, i) => (
              <Layer key={i} i={i} img={l.img} alt={l.alt} spread={spread} opacity={i < 2 ? lowerOpacity : undefined} />
            ))}
            <motion.div className="stack-check" style={{ opacity: lowerOpacity, z: checkZ }} aria-hidden="true">
              <Icon name="Check" size={44} strokeWidth={3.2} />
            </motion.div>
          </motion.div>
          {hero.chips.map((c, i) => (
            <motion.div key={c.title} className={`float-chip chip-${i} tone-${c.tone}`} style={scrolly ? { opacity: textOpacity } : undefined}
              initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 + i * 0.25, type: 'spring', stiffness: 180, damping: 16 }}>
              <span className="chip-dot" /><b>{c.title}</b><small>{c.text}</small>
            </motion.div>
          ))}
        </motion.div>

        {scrolly && (
          <motion.div className="hero-caption" style={{ opacity: capOpacity, y: capY }}>
            <span className="kicker"><span className="kicker-dot" />Live command center</span>
            <p>Lifecycle ring, AI copilot, revenue, completes, Gantt and Kanban. One screen.</p>
          </motion.div>
        )}
        {scrolly && <motion.div className="scroll-hint" style={{ opacity: textOpacity }} aria-hidden="true"><span />Scroll to unfold</motion.div>}
      </div>
    </section>
  )
}
