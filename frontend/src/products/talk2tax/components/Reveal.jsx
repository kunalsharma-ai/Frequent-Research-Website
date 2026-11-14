import { useInView } from '../hooks/useInView';

/** Fades and lifts its children into place when scrolled into view. `delay` is in ms. */
export default function Reveal({ as: Tag = 'div', delay = 0, variant = 'up', className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, ...rest.style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
