import { useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import Spotlight from '../components/Spotlight.jsx'
import { Reveal } from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { why } from '../content.js'

// Scatter positions for the "usual way" (messy) state.
const MESS = [[-6, -8, -9], [4, 6, 7], [-3, 10, -5], [8, -4, 11], [-8, 3, 6], [5, -9, -12]]

export default function Why() {
  const [on, setOn] = useState(true)
  const items = on ? why.after : why.before
  return (
    <section id="why" className={`why ${on ? 'is-on' : 'is-off'}`}>
      <div className="why-bg" aria-hidden="true" />
      <SectionHeading kicker={why.kicker} title={why.title} accent={why.accent} sub={why.sub} />
      <div className="switch-row">
        <span className={!on ? 'cur' : ''}>The usual patchwork</span>
        <button className={`switch ${on ? 'on' : ''}`} role="switch" aria-checked={on} onClick={() => setOn(!on)} aria-label="Toggle between the usual way and SampTrek">
          <motion.span layout className="knob" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
        </button>
        <span className={on ? 'cur grad-text' : ''}>With SampTrek</span>
      </div>
      <LayoutGroup>
        <div className={`compare ${on ? 'ordered' : 'messy'}`}>
          {items.map((it, i) => {
            const [x, y, r] = MESS[i % MESS.length]
            return (
              <motion.div key={i} layout className="cmp-card"
                animate={on ? { x: 0, y: 0, rotate: 0, filter: 'grayscale(0)' } : { x, y, rotate: r, filter: 'grayscale(1)' }}
                transition={{ type: 'spring', stiffness: 160, damping: 18, delay: i * 0.04 }}>
                <span className="cmp-icon"><Icon name={on ? 'CircleCheck' : 'X'} size={18} /></span>
                <b>{it.t}</b>
                <span>{it.d}</span>
              </motion.div>
            )
          })}
        </div>
      </LayoutGroup>
      <div className="pillars">
        {why.pillars.map((p, i) => (
          <Reveal key={p.n} delay={(i % 3) * 0.1}>
            <Spotlight className="pillar">
              <span className="pillar-n">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Spotlight>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
