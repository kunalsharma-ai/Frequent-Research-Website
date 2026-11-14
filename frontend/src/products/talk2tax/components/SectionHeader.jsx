import Reveal from './Reveal';

/** Shared section heading: small numbered eyebrow, big title with an accent phrase, and a lead paragraph. */
export default function SectionHeader({ index, eyebrow, title, accent, lead, align = 'left', id }) {
  return (
    <header className={`section-header align-${align}`}>
      <Reveal className="eyebrow">
        {index && <span className="eyebrow-index">{index}</span>}
        <span>{eyebrow}</span>
      </Reveal>
      <Reveal as="h2" delay={80} className="section-title" id={id}>
        {title} {accent && <em className="accent-serif">{accent}</em>}
      </Reveal>
      {lead && (
        <Reveal as="p" delay={160} className="section-lead">
          {lead}
        </Reveal>
      )}
    </header>
  );
}
