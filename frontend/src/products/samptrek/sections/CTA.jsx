import { motion } from 'framer-motion'
import icon from '../assets/brand/samptrek-icon.svg'
import Icon from '../components/Icon.jsx'
import { WordsUp } from '../components/Reveal.jsx'
import { cta, links } from '../content.js'

export default function CTA() {
  return (
    <section className="cta" id="contact">
      <div className="cta-bg" aria-hidden="true"><i /><i /><i /></div>
      <motion.div className="cta-badge" initial={{ opacity: 0, scale: 0.6, rotate: -20 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
        <span className="cta-ring" />
        <img src={icon} alt="SampTrek icon" />
      </motion.div>
      <h2 className="h2 cta-title"><WordsUp text={cta.title} /> <span className="serif-accent"><WordsUp text={cta.accent} delay={0.3} /></span></h2>
      <p className="lede">{cta.sub}</p>
      <div className="hero-actions center">
        <a className="btn btn-primary btn-lg" href={links.demo}><span>{cta.primary}</span><Icon name="ArrowRight" size={18} /></a>
        <a className="btn btn-glass btn-lg" href={links.signIn}><span>{cta.secondary}</span></a>
      </div>
    </section>
  )
}
