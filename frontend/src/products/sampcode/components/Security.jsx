import { KeyRound, Users, ShieldCheck, ScrollText, Webhook, Globe2, LockKeyhole, Cloud, Shield } from 'lucide-react';

// Icon names used in content.js → components. Add here when you add a new icon name.
const Icons = { KeyRound, Users, ShieldCheck, ScrollText, Webhook, Globe2, LockKeyhole, Cloud, Shield };
import { security } from '../content.js';
import { Reveal, SectionHead } from './ui.jsx';
import './Security.css';

function Vault() {
  const faces = ['KeyRound', 'ShieldCheck', 'ScrollText', 'LockKeyhole', 'Globe2', 'Webhook'];
  return (
    <div className="vault" aria-hidden="true">
      <div className="vault-cube">
        {faces.map((f, i) => {
          const I = Icons[f] || Icons.Shield;
          return (
            <div key={f} className={`vault-face f${i}`}>
              <I size={54} strokeWidth={1.4} />
            </div>
          );
        })}
      </div>
      <div className="vault-shadow" />
    </div>
  );
}

export default function Security() {
  return (
    <section id="security" className="section sec">
      <div className="wrap">
        <div className="sec-top">
          <SectionHead kicker={security.kicker} title={security.title} />
          <Vault />
        </div>
        <div className="sec-grid">
          {security.items.map((it, i) => {
            const I = Icons[it.icon] || Icons.Shield;
            return (
              <Reveal key={it.title} delay={(i % 4) * 0.07} className="sec-item">
                <span className="sec-icon">
                  <I size={20} />
                </span>
                <h3>{it.title}</h3>
                <p>{it.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
