import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, animate } from 'framer-motion';

/** Fade-and-rise on first view. */
export function Reveal({ children, delay = 0, y = 28, className = '', as = 'div', ...rest }) {
  const reduce = useReducedMotion();
  const M = motion[as] || motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </M>
  );
}

/** Section heading with a mono kicker and a serif title. */
export function SectionHead({ kicker, title, text, align = 'left', id }) {
  return (
    <div className={`section-head ${align}`} id={id}>
      <Reveal>
        <span className="kicker">
          <i />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08} as="h2" className="h2">
        {title}
      </Reveal>
      {text && (
        <Reveal delay={0.16} as="p" className="lead">
          {text}
        </Reveal>
      )}
    </div>
  );
}

/** Card that tilts toward the pointer and lights a spotlight under it. */
export function Tilt({ children, className = '', max = 8, style, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${px * 100}%`);
    el.style.setProperty('--my', `${py * 100}%`);
    if (!reduce) el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = '';
  };
  return (
    <div ref={ref} className={`tilt ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} style={style} {...rest}>
      {children}
    </div>
  );
}

/** Counts up from 0 when scrolled into view. */
export function Counter({ to, suffix = '', duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const reduce = useReducedMotion();
  const [v, setV] = useState(reduce ? to : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to, duration, reduce]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/** A browser window around a product screenshot. */
export function BrowserFrame({ src, alt, url = 'app.sampcrew.com', className = '', eager = false, onClick }) {
  return (
    <figure className={`browser ${className}`}>
      <div className="browser-bar">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="url">
          <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 11V8a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor" />
          </svg>
          {url}
        </span>
      </div>
      {onClick ? (
        <button className="browser-shot" onClick={onClick} aria-label={`Enlarge: ${alt}`}>
          <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        </button>
      ) : (
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
      )}
    </figure>
  );
}

/** A phone around a mobile screenshot. */
export function Phone({ src, alt, className = '', style }) {
  return (
    <figure className={`phone ${className}`} style={style}>
      <div className="phone-notch" />
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </figure>
  );
}

/** Words that cycle with a vertical flip. */
export function Rotator({ words, interval = 2200 }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval, reduce]);
  return (
    <span className="rotator" aria-live="polite">
      {words.map((w, k) => (
        <span key={w} className={k === i ? 'on' : k === (i - 1 + words.length) % words.length ? 'off' : ''} aria-hidden={k !== i}>
          {w}
        </span>
      ))}
      <span className="rotator-size" aria-hidden="true">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
    </span>
  );
}

/** Magnetic button: drifts toward the pointer. */
export function Magnetic({ children, className = '', href, onClick, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const move = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
  };
  const leave = () => {
    ref.current.style.transform = '';
  };
  const Tag = href ? 'a' : 'button';
  return (
    <Tag ref={ref} className={`btn ${className}`} href={href} onClick={onClick} onPointerMove={move} onPointerLeave={leave} {...rest}>
      {children}
    </Tag>
  );
}
