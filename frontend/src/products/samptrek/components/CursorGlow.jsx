import { useEffect, useRef } from 'react'

// Soft colour light that follows the mouse (desktop only, hidden for reduced motion).
export default function CursorGlow() {
  const ref = useRef(null)
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y, raf
    const move = (e) => { x = e.clientX; y = e.clientY }
    const loop = () => {
      cx += (x - cx) * 0.12; cy += (y - cy) * 0.12
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 300}px, ${cy - 300}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    addEventListener('pointermove', move); loop()
    return () => { removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])
  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}
