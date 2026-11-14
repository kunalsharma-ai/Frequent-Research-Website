import { lazy, Suspense, useEffect, useState } from 'react';
import { ArrowRight, Play, Sparkles, Mic } from 'lucide-react';
import { HERO } from '../content/content';
import { SITE, linkOr } from '../content/site';
import Typewriter from '../components/Typewriter';

const HeroScene = lazy(() => import('../components/HeroScene'));

function Rotator({ words, reducedMotion }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reducedMotion) return undefined;
    const id = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(id);
  }, [words.length, reducedMotion]);
  return (
    <span className="rotator" aria-live="off">
      <span className="sr-only">{words.join(', ')}</span>
      {words.map((w, idx) => (
        <span key={w} aria-hidden="true" className={`rotator-word ${idx === i ? 'is-active' : ''} ${idx === (i - 1 + words.length) % words.length ? 'is-leaving' : ''}`}>
          {w}
        </span>
      ))}
    </span>
  );
}

function HeroChat({ reducedMotion }) {
  const [step, setStep] = useState(reducedMotion ? 3 : 0);
  useEffect(() => {
    if (reducedMotion) return undefined;
    const t = setTimeout(() => setStep(1), 900);
    return () => clearTimeout(t);
  }, [reducedMotion]);
  const [q, a] = HERO.chat;
  return (
    <div className="hero-chat" aria-label="Example conversation with Talk2Tax">
      <div className={`chat-bubble chat-you ${step >= 1 ? 'is-in' : ''}`}>
        <span className="chat-avatar you" aria-hidden="true">
          <Mic size={14} />
        </span>
        <Typewriter text={q.text} start={step >= 1} reducedMotion={reducedMotion} onDone={() => setTimeout(() => setStep((s) => Math.max(s, 2)), 450)} />
      </div>
      <div className={`chat-bubble chat-t2t ${step >= 2 ? 'is-in' : ''}`}>
        <span className="chat-avatar t2t" aria-hidden="true">
          <Sparkles size={14} />
        </span>
        <div>
          {step >= 2 && <Typewriter text={a.text} speed={14} start reducedMotion={reducedMotion} onDone={() => setStep(3)} />}
          <div className={`chat-sources ${step >= 3 ? 'is-in' : ''}`}>
            <span>Looked at</span>
            {a.sources.map((s) => (
              <em key={s}>{s}</em>
            ))}
          </div>
        </div>
      </div>
      <p className="chat-note">Demo organisation, synthetic data</p>
    </div>
  );
}

export default function Hero({ reducedMotion }) {
  return (
    <section className="hero" id="top">
      <div className="hero-aurora" aria-hidden="true">
        <span className="blob b1" />
        <span className="blob b2" />
        <span className="blob b3" />
      </div>
      <div className="hero-grid-floor" aria-hidden="true" />

      <div className="hero-inner container">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="pulse-dot" aria-hidden="true" />
            {HERO.eyebrow}
          </p>
          <h1 className="hero-title">
            <span className="hero-line l1">{HERO.lines[0]}</span>
            <span className="hero-line l2">
              {HERO.lines[1]} <Rotator words={HERO.rotating} reducedMotion={reducedMotion} />
            </span>
          </h1>
          <p className="hero-sub">{HERO.sub}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href={linkOr(SITE.demoUrl)}>
              Book a demo <ArrowRight size={18} />
            </a>
            <a className="btn btn-ghost" href="#ask">
              <Play size={16} /> See it answer
            </a>
          </div>
          <ul className="hero-chips">
            {HERO.chips.map((c, i) => (
              <li key={c} style={{ '--i': i }}>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <Suspense fallback={<div className="hero-scene" />}>
            <HeroScene reducedMotion={reducedMotion} />
          </Suspense>
          <HeroChat reducedMotion={reducedMotion} />
          <div className="hero-float f1" aria-hidden="true">
            <span className="float-label">GSTR-3B</span>
            <span className="float-value">Ready to review</span>
          </div>
          <div className="hero-float f2" aria-hidden="true">
            <span className="float-label">Audit trail</span>
            <span className="float-value">Chain verified ✓</span>
          </div>
        </div>
      </div>

      <div className="hero-tagline" aria-hidden="true">
        <span>Talk.</span>
        <span>File.</span>
        <span>Relax.</span>
      </div>
      <a className="scroll-cue" href="#ask" aria-label="Scroll to the next section">
        <span />
      </a>
    </section>
  );
}
