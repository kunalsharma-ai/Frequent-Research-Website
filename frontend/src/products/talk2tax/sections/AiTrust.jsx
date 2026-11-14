import { Gauge, ListChecks, ShieldAlert, Hand, Power, ScrollText } from 'lucide-react';
import { AI_TRUST } from '../content/content';
import { screen } from '../content/screens';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import ScreenFrame from '../components/ScreenFrame';
import { spotlightHandlers } from '../components/Spotlight';

const ICONS = [Gauge, ListChecks, ShieldAlert, Hand, Power, ScrollText];

export default function AiTrust({ reducedMotion, onOpen }) {
  return (
    <section className="section ai" id="ai">
      <div className="container">
        <SectionHeader
          index="04"
          eyebrow="Relax"
          title="AI that does the legwork"
          accent="and never goes rogue."
          lead="Four AI agents prepare work for you: answers, collection reminders, bank matches and month-end entries. Each one runs at a fixed action level, inside checks, with a person in charge."
        />

        <div className="ai-layout">
          <Reveal className="ladder" aria-label="AI action levels">
            <p className="ladder-title">Action levels, fixed in code</p>
            {[...AI_TRUST.levels].reverse().map((l) => (
              <div key={l.level} className={`ladder-step ${l.level >= 3 ? 'is-locked' : ''}`} style={{ '--l': l.level }}>
                <span className="ladder-num">L{l.level}</span>
                <span className="ladder-text">
                  <b>{l.name}</b>
                  <small>{l.who}</small>
                </span>
              </div>
            ))}
          </Reveal>
          <div className="ai-screens">
            <Reveal variant="right">
              <ScreenFrame screen={screen('ai-control-center')} tilt reducedMotion={reducedMotion} onOpen={onOpen} />
            </Reveal>
            <div className="ai-screens-row">
              <Reveal delay={100}>
                <ScreenFrame screen={screen('collections')} onOpen={onOpen} reducedMotion={reducedMotion} />
              </Reveal>
              <Reveal delay={180}>
                <ScreenFrame screen={screen('ai-reconciliation')} onOpen={onOpen} reducedMotion={reducedMotion} />
              </Reveal>
            </div>
          </div>
        </div>

        <div className="pillars">
          {AI_TRUST.pillars.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={p.title} className="pillar spotlight" delay={i * 70} {...spotlightHandlers()}>
                <span className="pillar-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
