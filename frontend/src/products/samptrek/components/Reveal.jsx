import { motion } from 'framer-motion'

// Fades/slides children in when they scroll into view.
export function Reveal({ children, delay = 0, y = 40, x = 0, scale = 1, blur = 8, className, as = 'div', once = true, ...rest }) {
  const M = motion[as] || motion.div
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, x, scale, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </M>
  )
}

// Splits a heading into words that rise in one after another.
// (The in-view trigger sits on the outer span: the words start clipped by
// their masks, so they could never report being "in view" themselves.)
export function WordsUp({ text, className, delay = 0, stagger = 0.06 }) {
  const words = text.split(' ')
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      style={{ display: 'inline' }}
    >
      <span style={{ position: 'absolute', width: 1, height: 1, margin: -1, padding: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap', border: 0 }}>{text}</span>
      {words.map((w, i) => (
        <span key={i} className="word-mask" aria-hidden="true">
          <motion.span
            className="word"
            variants={{ hidden: { y: '110%', rotate: 6 }, show: { y: '0%', rotate: 0 } }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </motion.span>
  )
}
