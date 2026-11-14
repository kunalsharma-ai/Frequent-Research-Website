import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { SCREENS, SCREEN_GROUPS } from '../content/screens';
import SectionHeader from '../components/SectionHeader';

/** Filterable, swipeable strip of every product screen. Clicking one opens the lightbox. */
export default function Gallery({ onOpenList }) {
  const [group, setGroup] = useState('All');
  const stripRef = useRef(null);
  const list = useMemo(() => Object.values(SCREENS).filter((s) => group === 'All' || s.group === group), [group]);

  const scroll = (dir) => {
    const el = stripRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  };

  return (
    <section className="section gallery" id="gallery">
      <div className="container">
        <SectionHeader
          index="09"
          eyebrow="The real thing"
          title="Real screens."
          accent="No mock-ups."
          lead={`${Object.keys(SCREENS).length} screens from the working product, using a demo organisation with synthetic data. Click any screen to see it full size.`}
        />
        <div className="gallery-bar">
          <div className="gallery-filters" role="group" aria-label="Filter screens">
            {SCREEN_GROUPS.map((g) => (
              <button key={g} className={`chip ${g === group ? 'is-on' : ''}`} aria-pressed={g === group} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>
          <div className="gallery-arrows">
            <button onClick={() => scroll(-1)} aria-label="Scroll screens left">
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Scroll screens right">
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
      <div className="gallery-strip" ref={stripRef} tabIndex={0} aria-label="Product screens">
        {list.map((s, i) => (
          <button key={s.key} className={`gallery-item ${s.mobile ? 'is-mobile' : ''}`} onClick={() => onOpenList(list, i)} aria-label={`Enlarge: ${s.title}`}>
            <img src={s.src} alt={`${s.title}: ${s.caption}`} loading="lazy" />
            <span className="gallery-cap">
              <small>{s.group}</small>
              <strong>{s.title}</strong>
              <span>{s.caption}</span>
            </span>
            <Maximize2 className="gallery-zoom" size={16} aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
