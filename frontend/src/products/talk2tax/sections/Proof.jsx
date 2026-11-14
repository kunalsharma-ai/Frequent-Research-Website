import { STATS, GLOBAL } from '../content/content';
import { screen } from '../content/screens';
import Counter from '../components/Counter';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import ScreenFrame from '../components/ScreenFrame';
import { ShieldCheck, Globe2 } from 'lucide-react';

export function Stats({ reducedMotion }) {
  return (
    <section className="stats" aria-label="Talk2Tax by the numbers">
      <div className="container stats-grid">
        {STATS.map((s, i) => (
          <Reveal key={s.label} className="stat" delay={i * 60}>
            <span className="stat-value">
              <Counter value={s.value} suffix={s.suffix} reducedMotion={reducedMotion} />
            </span>
            <span className="stat-label">{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function GlobalSecurity({ reducedMotion, onOpen }) {
  return (
    <section className="section global" id="global">
      <div className="container">
        <SectionHeader
          index="08"
          eyebrow="Global and secure"
          title="Born in India."
          accent="Built for the world."
          lead="India has the full tax module. Six more countries have starter modules with their standard sales-tax rates, every country gets the accounting core, and you choose the region your data lives in."
        />
        <div className="global-layout">
          <Reveal className="globe-card">
            <div className="globe" aria-hidden="true">
              <span className="globe-sphere" />
              <span className="globe-ring" />
              <span className="globe-ring r2" />
            </div>
            <h3>
              <Globe2 size={20} aria-hidden="true" /> 8 country modules
            </h3>
            <ul className="country-list">
              {GLOBAL.countries.map((c) => (
                <li key={c.code} className={`lvl-${c.level.split(' ')[0].toLowerCase()}`}>
                  <span className="country-code">{c.code}</span>
                  <span>{c.name}</span>
                  <em>{c.level}</em>
                </li>
              ))}
            </ul>
            <p className="globe-foot">Multi-currency with exchange rates and revaluation · English and हिन्दी · regional number and date formats</p>
          </Reveal>
          <div className="security-col">
            <Reveal className="security-card" delay={100}>
              <h3>
                <ShieldCheck size={20} aria-hidden="true" /> Security in the database, not just the app
              </h3>
              <ul>
                {GLOBAL.security.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180}>
              <ScreenFrame screen={screen('multi-currency')} onOpen={onOpen} reducedMotion={reducedMotion} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
