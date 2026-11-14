import { useEffect, useState } from 'react';

/** Types `text` out character by character. Shows it whole for reduced motion. */
export default function Typewriter({ text, speed = 18, start = true, reducedMotion, onDone, className = '' }) {
  const [count, setCount] = useState(reducedMotion ? text.length : 0);
  useEffect(() => {
    if (reducedMotion) {
      setCount(text.length);
      onDone?.();
      return undefined;
    }
    setCount(0);
    if (!start) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) {
        clearInterval(id);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, start, reducedMotion, speed]);
  const done = count >= text.length;
  return (
    <span className={`typewriter ${done ? 'is-done' : ''} ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        {!done && <span className="caret" />}
      </span>
    </span>
  );
}
