import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Icon from './Icon.jsx'

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    if (!item) return
    const k = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', k)
    document.body.style.overflow = 'hidden'
    return () => { removeEventListener('keydown', k); document.body.style.overflow = '' }
  }, [item, onClose])
  return (
    <AnimatePresence>
      {item && (
        <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt} onClick={onClose}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.figure initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 24 }} onClick={(e) => e.stopPropagation()}>
            <img src={item.src} alt={item.alt} />
            <figcaption>{item.alt}</figcaption>
          </motion.figure>
          <button className="lightbox-close" onClick={onClose} aria-label="Close"><Icon name="X" size={22} /></button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
