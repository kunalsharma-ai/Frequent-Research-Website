import { useEffect, useState } from 'react';
import { MessageCircle, Sparkles } from 'lucide-react';
import { ASKS } from '../content/content';
import { screen } from '../content/screens';
import SectionHeader from '../components/SectionHeader';
import ScreenFrame from '../components/ScreenFrame';
import Typewriter from '../components/Typewriter';
import { useInView } from '../hooks/useInView';

/** "Ask anything": pick a question, watch the answer type out, see the real screen behind it. */
export default function AskShowcase({ reducedMotion, onOpen }) {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.3, once: false });
  const ask = ASKS[active];

  // Gently cycle through the questions while in view, until the visitor picks one.
  useEffect(() => {
    if (reducedMotion || touched || !inView) return undefined;
    const id = setTimeout(() => setActive((v) => (v + 1) % ASKS.length), 9000);
    return () => clearTimeout(id);
  }, [active, touched, inView, reducedMotion]);

  const pick = (i) => {
    setTouched(true);
    setActive(i);
  };

  return (
    <section className="section ask" id="ask">
      <div className="container">
        <SectionHeader
          index="01"
          eyebrow="Talk"
          title="Ask your books anything."
          accent="Get answers with receipts."
          lead="Type it or say it. Talk2Tax reads your posted ledger, works the figures out with tested rules, and tells you which reports it looked at."
        />
        <div className="ask-layout" ref={ref}>
          <div className="ask-questions" role="tablist" aria-label="Example questions">
            {ASKS.map((a, i) => (
              <button
                key={a.q}
                role="tab"
                id={`ask-tab-${i}`}
                aria-selected={i === active}
                aria-controls="ask-panel"
                className={`ask-q ${i === active ? 'is-active' : ''}`}
                onClick={() => pick(i)}
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>
                  <small>{a.tag}</small>
                  {a.q}
                </span>
                {i === active && !touched && !reducedMotion && <span className="ask-timer" aria-hidden="true" key={active} />}
              </button>
            ))}
          </div>

          <div className="ask-panel" id="ask-panel" role="tabpanel" aria-labelledby={`ask-tab-${active}`}>
            <div className="ask-answer" key={active}>
              <div className="ask-you">{ask.q}</div>
              <div className="ask-t2t">
                <span className="chat-avatar t2t" aria-hidden="true">
                  <Sparkles size={14} />
                </span>
                <div>
                  <Typewriter text={ask.a} speed={12} reducedMotion={reducedMotion} />
                  <div className="chat-sources is-in">
                    <span>Looked at</span>
                    {ask.sources.map((s) => (
                      <em key={s}>{s}</em>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="ask-screen" key={`s-${active}`}>
              <ScreenFrame screen={screen(ask.screen)} tilt reducedMotion={reducedMotion} onOpen={onOpen} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
