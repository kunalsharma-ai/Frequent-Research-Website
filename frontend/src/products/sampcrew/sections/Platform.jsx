import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { modules, screens } from '../content.js';
import { SectionHead, BrowserFrame } from '../components/ui.jsx';
import Icon from '../components/Icon.jsx';
import icon from '../assets/brand/sampcrew-icon-static.webp'; // static mark; the animated SVG is used in the logo

/**
 * "Platform orbit": every module sits on a ring around the SampCrew mark.
 * Pick one (or let it auto-advance) to bring its screen and proof points forward.
 */
export default function Platform({ onZoom }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { margin: '-30% 0px' });
  const reduce = useReducedMotion();
  const m = modules[active];

  useEffect(() => {
    if (paused || !inView || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % modules.length), 5200);
    return () => clearTimeout(t);
  }, [active, paused, inView, reduce]);

  const step = 360 / modules.length;

  const onKey = (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % modules.length);
      setPaused(true);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a - 1 + modules.length) % modules.length);
      setPaused(true);
    }
  };

  return (
    <section className="platform" id="platform" ref={ref} style={{ '--accent': m.color }}>
      <div className="wrap">
        <SectionHead
          kicker="The platform"
          title={<>Ten modules. <em className="grad-text">One heartbeat.</em></>}
          text="Pick a module from the orbit. Every screen you see is the real product, running on a demo workspace."
        />
        <div className="platform-grid">
          <div className="orbit-wrap">
            <div className="orbit" style={{ '--rot': `${-active * step}deg` }} role="tablist" aria-label="SampCrew modules" onKeyDown={onKey}>
              <div className="orbit-ring r1" />
              <div className="orbit-ring r2" />
              <div className="orbit-core">
                <img src={icon} alt="" width="96" height="96" />
              </div>
              {modules.map((mod, i) => (
                <button
                  key={mod.id}
                  role="tab"
                  aria-selected={i === active}
                  tabIndex={i === active ? 0 : -1}
                  className={`orbit-node ${i === active ? 'on' : ''}`}
                  style={{ '--a': `${i * step}deg`, '--c': mod.color }}
                  onClick={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                >
                  <span className="node-in">
                    <Icon name={mod.icon} size={20} />
                    <small>{mod.name}</small>
                  </span>
                </button>
              ))}
            </div>
            <div className="orbit-bar" aria-hidden="true">
              <span key={`${active}-${paused}`} className={paused || reduce ? 'still' : ''} />
            </div>
          </div>

          <div className="platform-detail" role="tabpanel" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={reduce ? undefined : { opacity: 0, y: -16, filter: 'blur(8px)' }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="mod-tag" style={{ color: m.color }}>
                  <Icon name={m.icon} size={16} /> {m.name}
                </span>
                <h3 className="h3">{m.title}</h3>
                <p className="body">{m.text}</p>
                <ul className="ticks">
                  {m.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" size={16} stroke={2.4} />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="detail-shot">
                  <BrowserFrame src={screens[m.img]} alt={`${m.name} screen in SampCrew`} onClick={() => onZoom?.(m.img, m.name)} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
