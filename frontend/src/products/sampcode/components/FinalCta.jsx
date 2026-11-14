import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cta, site } from '../content.js';
import { Reveal, WordsIn } from './ui.jsx';
import logo from '../assets/brand/sampcode-logo-dark.svg';
import './FinalCta.css';

export default function FinalCta() {
  return (
    <section className="section fc">
      <div className="fc-beams" aria-hidden="true">
        {Array.from({ length: 7 }).map((_, i) => (
          <i key={i} style={{ '--i': i }} />
        ))}
      </div>
      <div className="wrap fc-inner">
        <Reveal>
          <img className="fc-logo" src={logo} alt={`${site.productName} by ${site.company}`} width="472" height="128" />
        </Reveal>
        <h2 className="h-display fc-title">
          <WordsIn text={cta.title} />
        </h2>
        <Reveal delay={0.2}>
          <p className="lead">{cta.sub}</p>
        </Reveal>
        <Reveal delay={0.3} className="fc-ctas">
          <a className="btn btn-primary" href={site.demoUrl}>
            {cta.primary} <ArrowRight size={18} />
          </a>
          <a className="btn" href={site.contactUrl}>
            {cta.secondary} <ArrowUpRight size={18} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
