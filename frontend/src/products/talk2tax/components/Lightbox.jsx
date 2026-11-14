import { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

/** Full-screen view of a screenshot with keyboard navigation (Esc, ←, →). */
export default function Lightbox({ list, index, onClose, onIndex }) {
  const closeRef = useRef(null);
  const item = index != null ? list[index] : null;

  useEffect(() => {
    if (!item) return undefined;
    const prevFocus = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onIndex((index + 1) % list.length);
      if (e.key === 'ArrowLeft') onIndex((index - 1 + list.length) % list.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      prevFocus?.focus?.();
    };
  }, [item, index, list.length, onClose, onIndex]);

  if (!item) return null;
  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <div className="lightbox-body" onClick={(e) => e.stopPropagation()}>
        <img src={item.src} alt={`${item.title}: ${item.caption}`} className={item.mobile ? 'is-mobile' : ''} />
        <div className="lightbox-caption">
          <span className="lightbox-group">{item.group}</span>
          <strong>{item.title}</strong>
          <span>{item.caption}</span>
          <span className="lightbox-count">
            {index + 1} / {list.length}
          </span>
        </div>
        <button ref={closeRef} className="lightbox-btn lightbox-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
        <button className="lightbox-btn lightbox-prev" onClick={() => onIndex((index - 1 + list.length) % list.length)} aria-label="Previous screen">
          <ChevronLeft size={22} />
        </button>
        <button className="lightbox-btn lightbox-next" onClick={() => onIndex((index + 1) % list.length)} aria-label="Next screen">
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
}
