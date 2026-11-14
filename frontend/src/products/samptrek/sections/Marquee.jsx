import { marquee } from '../content.js'

// Two counter-scrolling ribbons of capabilities, tilted for energy.
export default function Marquee() {
  const row = (items, k) => (
    <div className="marquee-track" key={k}>
      {[...items, ...items].map((t, i) => (
        <span key={i} className="marquee-item"><i className="spark" aria-hidden="true">✦</i>{t}</span>
      ))}
    </div>
  )
  const half = Math.ceil(marquee.length / 2)
  return (
    <section className="marquee" aria-label="Capabilities">
      <div className="marquee-band band-a">{row(marquee.slice(0, half), 'a')}</div>
      <div className="marquee-band band-b">{row(marquee.slice(half), 'b')}</div>
    </section>
  )
}
