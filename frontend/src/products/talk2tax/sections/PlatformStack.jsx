import { useRef } from 'react';
import { Check } from 'lucide-react';
import { LAYERS } from '../content/content';
import { screen } from '../content/screens';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import { useScrollProgress } from '../hooks/useScrollProgress';

/**
 * The platform as an exploded 3D stack of glass plates, one per layer. Scrolling through the
 * section pulls the plates apart and lights them up one by one. On small screens and for
 * reduced motion it becomes a simple list of cards.
 */
export default function PlatformStack({ reducedMotion }) {
  const trackRef = useRef(null);
  const progress = useScrollProgress(trackRef, !reducedMotion);
  const n = LAYERS.length;
  const active = reducedMotion ? n - 1 : Math.min(n - 1, Math.floor(progress * n * 0.999));
  const spread = reducedMotion ? 1 : Math.min(1, progress * 2.2);
  const layer = LAYERS[active];

  return (
    <section className="section platform" id="platform">
      <div className="container">
        <SectionHeader
          index="02"
          eyebrow="One platform"
          title="Seven layers. One ledger."
          accent="Zero copy-paste."
          lead="Everything in Talk2Tax sits on the same double-entry books, so tax, payroll, planning and AI never disagree about a number."
        />
      </div>

      <div className={`stack-track ${reducedMotion ? 'is-static' : ''}`} ref={trackRef} style={{ '--layers': n }}>
        <div className="stack-sticky">
          <div className="container stack-layout">
            <div className="stack-scene" aria-hidden="true" style={{ '--spread': spread }}>
              <div className="stack-tower">
                {LAYERS.map((l, i) => (
                  <div
                    key={l.id}
                    className={`stack-plate ${i === active ? 'is-active' : ''} ${i < active ? 'is-below' : ''} ${i > active ? 'is-above' : ''}`}
                    style={{ '--i': i, '--c': l.color }}
                  >
                    <img src={screen(l.screen)?.src} alt="" loading="lazy" />
                    <span className="plate-label">{l.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stack-info" aria-live="polite">
              <ol className="stack-index" aria-label="Layers">
                {LAYERS.map((l, i) => (
                  <li key={l.id} className={i === active ? 'is-active' : ''} style={{ '--c': l.color }}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {l.name}
                  </li>
                ))}
              </ol>
              <div className="stack-card" key={layer.id} style={{ '--c': layer.color }}>
                <p className="stack-kicker">{layer.kicker}</p>
                <h3>{layer.name}</h3>
                <p>{layer.blurb}</p>
                <ul>
                  {layer.items.map((it) => (
                    <li key={it}>
                      <Check size={16} aria-hidden="true" /> {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small screens: plain cards */}
      <div className="container stack-cards">
        {LAYERS.map((l, i) => (
          <Reveal key={l.id} className="stack-card is-mobile" style={{ '--c': l.color }} delay={i * 40}>
            <img src={screen(l.screen)?.src} alt={`${l.name}: ${screen(l.screen)?.title}`} loading="lazy" />
            <p className="stack-kicker">
              {String(i + 1).padStart(2, '0')} · {l.kicker}
            </p>
            <h3>{l.name}</h3>
            <p>{l.blurb}</p>
            <ul>
              {l.items.map((it) => (
                <li key={it}>
                  <Check size={16} aria-hidden="true" /> {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
