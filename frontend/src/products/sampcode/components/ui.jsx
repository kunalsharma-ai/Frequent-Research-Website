import { motion, useReducedMotion } from 'framer-motion';
import { screens, screenAlt } from '../assets/screens/index.js';

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({ children, delay = 0, y = 32, as = 'div', className, style, ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Splits a heading into words that rise in one after another. */
export function WordsIn({ text, className, delay = 0, stagger = 0.06 }) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'top', paddingBottom: '0.08em' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            initial={reduce ? false : { y: '105%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionHead({ kicker, title, sub, center = false, titleClass }) {
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      <Reveal>
        <span className="kicker">{kicker}</span>
      </Reveal>
      <h2 className={`h-display ${titleClass || ''}`}>
        <WordsIn text={title} />
      </h2>
      {sub ? (
        <Reveal delay={0.15}>
          <p className="lead">{sub}</p>
        </Reveal>
      ) : null}
    </div>
  );
}

export function BrowserFrame({ image, url = 'app.sampcode.com', className = '', style, eager = false }) {
  return (
    <div className={`browser ${className}`} style={style}>
      <div className="browser-bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="browser-url">{url}</span>
      </div>
      <img src={screens[image]} alt={screenAlt[image] || ''} loading={eager ? 'eager' : 'lazy'} decoding="async" width="1920" height="1200" />
    </div>
  );
}

export function PhoneFrame({ image, children, className = '', style }) {
  return (
    <div className={`phone ${className}`} style={style}>
      <div className="phone-screen">{image ? <img src={screens[image]} alt={screenAlt[image] || ''} loading="lazy" decoding="async" /> : children}</div>
    </div>
  );
}
