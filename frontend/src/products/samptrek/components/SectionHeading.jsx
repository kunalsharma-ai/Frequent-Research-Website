import { Reveal, WordsUp } from './Reveal.jsx'

export default function SectionHeading({ kicker, title, accent, sub, align = 'center', tone }) {
  return (
    <header className={`section-heading align-${align} ${tone ? 'tone-' + tone : ''}`}>
      {kicker && (
        <Reveal y={16} blur={0}>
          <span className="kicker"><span className="kicker-dot" />{kicker}</span>
        </Reveal>
      )}
      <h2 className="h2">
        <WordsUp text={title} />{' '}
        {accent && <span className="serif-accent"><WordsUp text={accent} delay={0.25} /></span>}
      </h2>
      {sub && (
        <Reveal delay={0.2} y={20}>
          <p className="lede">{sub}</p>
        </Reveal>
      )}
    </header>
  )
}
