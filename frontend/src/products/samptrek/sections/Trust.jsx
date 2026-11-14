import { Reveal } from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { trust } from '../content.js'

export default function Trust() {
  return (
    <section className="trust" aria-label="Security">
      <div className="trust-row">
        {trust.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.06} className="trust-item" y={20}>
            <span className="trust-icon"><Icon name={t.icon} size={22} /></span>
            <b>{t.title}</b><span>{t.text}</span>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
