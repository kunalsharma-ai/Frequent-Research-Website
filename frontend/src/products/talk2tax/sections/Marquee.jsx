import { MARQUEE } from '../content/content';

/** Two rows of capabilities sliding in opposite directions. Static (wrapping) for reduced motion. */
export default function Marquee() {
  return (
    <section className="marquee" aria-label="Everything inside Talk2Tax">
      {MARQUEE.map((row, r) => (
        <div className={`marquee-row ${r % 2 ? 'reverse' : ''}`} key={r}>
          <div className="marquee-track">
            {[...row, ...row].map((item, i) => (
              <span className="marquee-item" key={`${item}-${i}`} aria-hidden={i >= row.length}>
                <i aria-hidden="true">✦</i>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
