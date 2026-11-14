import { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

/** Counts up to `value` once visible. Jumps straight to the value for reduced motion. */
export default function Counter({ value, suffix = '', reducedMotion, duration = 1400 }) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const [n, setN] = useState(reducedMotion ? value : 0);
  useEffect(() => {
    if (!inView) return undefined;
    if (reducedMotion || value === 0) {
      setN(value);
      return undefined;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reducedMotion, duration]);
  return (
    <span ref={ref} className="counter" role="img" aria-label={`${value}${suffix}`}>
      {n}
      {suffix}
    </span>
  );
}
