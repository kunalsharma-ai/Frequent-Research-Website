import Globe from '../components/Globe.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { Reveal } from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { globe } from '../content.js'

export default function GlobeSection() {
  return (
    <section className="globe-section" aria-labelledby="globe-h">
      <div className="globe-bg" aria-hidden="true" />
      <div className="globe-grid">
        <div className="globe-copy">
          <SectionHeading kicker={globe.kicker} title={globe.title} accent={globe.accent} sub={globe.sub} align="left" />
          <div className="globe-points">
            {globe.points.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="gp">
                <span className="gp-icon"><Icon name={p.icon} size={20} /></span>
                <div><b>{p.title}</b><span>{p.text}</span></div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="globe-holder" scale={0.85} y={0}>
          <Globe />
          <span className="globe-hint">Drag to spin</span>
        </Reveal>
      </div>
    </section>
  )
}
