import { motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import PhoneFrame from '../components/PhoneFrame.jsx'
import Icon from '../components/Icon.jsx'
import { mobile, screens } from '../content.js'

export default function Mobile() {
  return (
    <section id="mobile" className="mobile">
      <div className="mobile-bg" aria-hidden="true" />
      <div className="mobile-grid">
        <div>
          <SectionHeading kicker={mobile.kicker} title={mobile.title} accent={mobile.accent} sub={mobile.sub} align="left" />
          <ul className="mobile-bullets">
            {mobile.bullets.map((b) => <li key={b}><Icon name="CircleCheck" size={18} />{b}</li>)}
          </ul>
        </div>
        <div className="phones">
          <motion.div className="phone-a" initial={{ opacity: 0, y: 80, rotate: -10 }} whileInView={{ opacity: 1, y: 0, rotate: -7 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
            <PhoneFrame src={screens.phoneCommand} alt="SampTrek command center on a phone" />
          </motion.div>
          <motion.div className="phone-b" initial={{ opacity: 0, y: 120, rotate: 12 }} whileInView={{ opacity: 1, y: 0, rotate: 6 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}>
            <PhoneFrame src={screens.phoneProject} alt="A multi-country project on a phone" />
          </motion.div>
          {mobile.toasts.map((t, i) => (
            <motion.div key={t.text} className={`toast toast-${i} tone-${t.tone}`}
              initial={{ opacity: 0, scale: 0.5, y: 20 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.35, type: 'spring', stiffness: 220, damping: 16 }}>
              <span className="toast-dot" />{t.text}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
