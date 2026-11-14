import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import Spotlight from '../components/Spotlight.jsx'
import Icon from '../components/Icon.jsx'
import Demo from '../components/Demos.jsx'
import { features } from '../content.js'

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features-bg" aria-hidden="true" />
      <SectionHeading kicker={features.kicker} title={features.title} accent={features.accent} />
      <div className="bento">
        {features.items.map((f, i) => (
          <motion.div key={f.title} className={`bento-cell size-${f.size}`}
            initial={{ opacity: 0, y: 60, rotateX: 18 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.9, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}>
            <Spotlight className={`bento-card grade-${f.grade}`} tilt={4}>
              <div className="bento-head">
                <span className="bento-icon"><Icon name={f.icon} size={20} /></span>
                <h3>{f.title}</h3>
              </div>
              <p>{f.text}</p>
              <Demo kind={f.demo} />
            </Spotlight>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
