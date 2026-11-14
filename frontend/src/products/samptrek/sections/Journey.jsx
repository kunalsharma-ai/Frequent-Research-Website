import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import Spotlight from '../components/Spotlight.jsx'
import Icon from '../components/Icon.jsx'
import useMedia from '../hooks/useMedia.js'
import { journey } from '../content.js'

// The "trek": a winding trail that draws itself as you scroll, with a glowing
// hiker at its tip and eight checkpoints of the research project lifecycle.
export default function Journey() {
  const wrap = useRef(null)
  const path = useRef(null)
  const [hiker, setHiker] = useState({ x: 0, y: 0 })
  const [reached, setReached] = useState(-1)
  const wide = useMedia('(min-width: 860px)', true)
  const n = journey.stops.length
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start 70%', 'end 70%'] })
  const prog = useSpring(scrollYProgress, { stiffness: 80, damping: 22 })

  // Path in a 100 x (n*100) box: a smooth snake through each row's centre.
  const H = n * 100
  const d = wide
    ? Array.from({ length: n }, (_, i) => {
        const y = i * 100 + 50, x = i % 2 === 0 ? 38 : 62
        if (i === 0) return `M50 0 C 50 25, ${x} 25, ${x} ${y}`
        const py = (i - 1) * 100 + 50
        return `C ${x === 38 ? 62 : 38} ${py + 50}, ${x} ${y - 50}, ${x} ${y}`
      }).join(' ') + ` C ${n % 2 ? 62 : 38} ${H - 25}, 50 ${H - 25}, 50 ${H}`
    : `M50 0 L50 ${H}`

  useMotionValueEvent(prog, 'change', (v) => {
    const el = path.current; if (!el) return
    const L = el.getTotalLength(), pt = el.getPointAtLength(Math.max(0, Math.min(1, v)) * L)
    setHiker({ x: pt.x, y: pt.y })
    setReached(Math.floor(v * n - 0.15))
  })
  useEffect(() => { prog.set(scrollYProgress.get()) }, [wide])

  return (
    <section id="journey" className="journey">
      <div className="journey-bg" aria-hidden="true" />
      <SectionHeading kicker={journey.kicker} title={journey.title} accent={journey.accent} sub={journey.sub} />
      <div ref={wrap} className={`trail ${wide ? 'trail-wide' : 'trail-narrow'}`} style={{ '--rows': n }}>
        <div className="trail-layer">
        <svg className="trail-svg" viewBox={`0 0 100 ${H}`} preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="trailGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#FEE440" /><stop offset=".35" stopColor="#F15BB5" />
              <stop offset=".7" stopColor="#9B5DE5" /><stop offset="1" stopColor="#0BC5FF" />
            </linearGradient>
          </defs>
          <path d={d} className="trail-ghost" vectorEffect="non-scaling-stroke" />
          <motion.path ref={path} d={d} className="trail-live" stroke="url(#trailGrad)" vectorEffect="non-scaling-stroke" style={{ pathLength: prog }} />
        </svg>
        <div className="hiker" style={{ left: `${hiker.x}%`, top: `${(hiker.y / H) * 100}%` }} aria-hidden="true"><span /></div>
        {journey.stops.map((s, i) => (
          <span key={'n' + i} className={`node ${i <= reached ? 'is-reached' : ''}`} aria-hidden="true"
            style={{ '--c': s.color, left: wide ? `${i % 2 === 0 ? 38 : 62}%` : '50%', top: `${((i * 100 + 50) / H) * 100}%` }} />
        ))}
        </div>
        {journey.stops.map((s, i) => (
          <div key={s.title} className={`stop ${i % 2 ? 'right' : 'left'} ${i <= reached ? 'is-reached' : ''}`} style={{ '--c': s.color, gridRow: i + 1 }}>
            <motion.div initial={{ opacity: 0, x: wide ? (i % 2 ? 60 : -60) : 30, rotateY: wide ? (i % 2 ? -25 : 25) : 0 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }} viewport={{ once: true, margin: '-15% 0px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }} className="stop-motion">
              <Spotlight className="stop-card">
                <span className="stop-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="stop-icon"><Icon name={s.icon} size={24} /></span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Spotlight>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
