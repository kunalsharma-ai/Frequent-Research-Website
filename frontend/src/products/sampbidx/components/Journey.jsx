import { useEffect, useRef, useState } from 'react';
import { JOURNEY, shots } from '../content.js';

function Browser({ img, alt, url }) {
  return (
    <div className="browser">
      <div className="browser-bar"><i /><i /><i /><span>{url}</span></div>
      <img src={shots[img]} alt={alt} loading="lazy" width="1600" height="1000" />
    </div>
  );
}

export default function Journey() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); }),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" id="how">
      <div className="wrap">
        <div className="head center rv">
          <span className="eyebrow">How a bid moves</span>
          <h2 className="h2">From the first email <span className="alt grad-warm">to a won project.</span></h2>
          <p className="lede">Six stages, one record. Everyone sees the same bid, the same numbers and the same history, from the person pricing it to the director approving it.</p>
        </div>
        <div className="journey">
          <div className="j-steps">
            {JOURNEY.map((s, i) => (
              <div key={s.key} ref={(el) => (refs.current[i] = el)} data-i={i} className={`j-step ${active === i ? 'active' : ''}`}>
                <span className="j-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
                <div className="j-tags">{s.tags.map((t) => <span key={t}>{t}</span>)}</div>
                <div className="j-shot-m"><Browser img={s.img} alt={`SampBidx: ${s.title}`} url={`app.sampbidx.com · ${s.title.toLowerCase()}`} /></div>
              </div>
            ))}
          </div>
          <div className="j-visual" aria-hidden="true">
            {JOURNEY.map((s, i) => (
              <div key={s.key} className={`j-frame ${i < active ? 'past' : i > active ? 'next' : ''}`}>
                <Browser img={s.img} alt="" url={`app.sampbidx.com · ${s.title.toLowerCase()}`} />
              </div>
            ))}
            <div className="j-progress">{JOURNEY.map((s, i) => <i key={s.key} className={i <= active ? 'on' : ''} />)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
