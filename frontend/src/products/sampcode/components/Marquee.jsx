import { marquee } from '../content.js';
import './Marquee.css';

function Row({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className={`mq-row${reverse ? ' rev' : ''}`}>
      <div className="mq-track">
        {doubled.map((t, i) => (
          <span key={i} className="mq-item" aria-hidden={i >= items.length}>
            <i className="mq-gem" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const half = Math.ceil(marquee.length / 2);
  return (
    <section className="mq" aria-label="Capabilities">
      <Row items={marquee.slice(0, half)} />
      <Row items={marquee.slice(half)} reverse />
    </section>
  );
}
