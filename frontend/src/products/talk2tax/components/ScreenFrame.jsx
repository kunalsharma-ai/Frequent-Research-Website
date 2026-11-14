import { useRef } from 'react';

/**
 * A product screenshot in a glassy browser frame. With `tilt`, the frame leans toward the
 * pointer in 3D and a light glare follows it (disabled for reduced motion via CSS + prop).
 */
export default function ScreenFrame({ screen, tilt = false, reducedMotion = false, onOpen, className = '', eager = false, label = true }) {
  const ref = useRef(null);
  if (!screen) return null;

  const onMove = (e) => {
    if (!tilt || reducedMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty('--rx', `${(0.5 - y) * 8}deg`);
    ref.current.style.setProperty('--ry', `${(x - 0.5) * 10}deg`);
    ref.current.style.setProperty('--gx', `${x * 100}%`);
    ref.current.style.setProperty('--gy', `${y * 100}%`);
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty('--rx', '0deg');
    ref.current.style.setProperty('--ry', '0deg');
  };

  const Wrapper = onOpen ? 'button' : 'div';
  return (
    <figure className={`screen-frame ${tilt ? 'is-tilt' : ''} ${screen.mobile ? 'is-mobile' : ''} ${className}`}>
      <Wrapper
        ref={ref}
        className="screen-frame-inner"
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        {...(onOpen ? { type: 'button', onClick: () => onOpen(screen), 'aria-label': `Enlarge: ${screen.title}` } : {})}
      >
        {!screen.mobile && (
          <span className="screen-chrome" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="screen-url">app.talk2tax · {screen.title}</span>
          </span>
        )}
        <img src={screen.src} alt={`${screen.title}: ${screen.caption}`} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <span className="screen-glare" aria-hidden="true" />
      </Wrapper>
      {label && (
        <figcaption>
          <strong>{screen.title}</strong> {screen.caption}
        </figcaption>
      )}
    </figure>
  );
}
