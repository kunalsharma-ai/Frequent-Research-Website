import { useEffect, useRef } from 'react'

// Hero background: twinkling stars + "respondents" (coloured sparks) streaming in
// from the edges along curves into the SampTrek stack, where they are routed.
// Colours = respondent statuses: complete, terminate, overquota, quality.
const STATUS = ['#5BF5A0', '#5BF5A0', '#5BF5A0', '#FF5C8A', '#FEE440', '#0BC5FF', '#C77DFF']

export default function RespondentFlow({ target = [0.7, 0.5], density = 1 }) {
  const ref = useRef(null)
  useEffect(() => {
    const cvs = ref.current, ctx = cvs.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, raf, stars = [], parts = [], visible = true
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2)
      w = cvs.clientWidth; h = cvs.clientHeight
      cvs.width = w * dpr; cvs.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const n = Math.round((w * h) / 9000 * density)
      stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.3 + 0.2, p: Math.random() * 6.28, s: 0.5 + Math.random() * 1.5 }))
    }
    const spawn = () => {
      const side = Math.random()
      let x, y
      if (side < 0.45) { x = -20; y = Math.random() * h }
      else if (side < 0.75) { x = Math.random() * w * 0.6; y = h + 20 }
      else { x = Math.random() * w * 0.6; y = -20 }
      const tx = w * target[0] + (Math.random() - 0.5) * 60, ty = h * target[1] + (Math.random() - 0.5) * 40
      const cx = (x + tx) / 2 + (Math.random() - 0.5) * w * 0.4, cy = (y + ty) / 2 + (Math.random() - 0.5) * h * 0.6
      parts.push({ x0: x, y0: y, cx, cy, tx, ty, t: 0, v: 0.0025 + Math.random() * 0.004, c: STATUS[(Math.random() * STATUS.length) | 0], trail: [] })
    }
    const bez = (a, b, c, t) => (1 - t) * (1 - t) * a + 2 * (1 - t) * t * b + t * t * c
    let last = performance.now()
    const draw = (now) => {
      const dt = Math.min(50, now - last); last = now
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        const a = reduce ? 0.6 : 0.35 + 0.65 * Math.abs(Math.sin(s.p + now * 0.0006 * s.s))
        ctx.globalAlpha = a; ctx.fillStyle = '#E9E3FF'
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.28); ctx.fill()
      }
      if (!reduce) {
        if (parts.length < 70 * density && Math.random() < 0.35) spawn()
        ctx.globalCompositeOperation = 'lighter'
        parts = parts.filter((p) => {
          p.t += p.v * (dt / 16)
          const x = bez(p.x0, p.cx, p.tx, p.t), y = bez(p.y0, p.cy, p.ty, p.t)
          p.trail.push([x, y]); if (p.trail.length > 18) p.trail.shift()
          ctx.lineWidth = 1.6
          for (let i = 1; i < p.trail.length; i++) {
            ctx.globalAlpha = (i / p.trail.length) * 0.55 * (1 - p.t * 0.6)
            ctx.strokeStyle = p.c
            ctx.beginPath(); ctx.moveTo(p.trail[i - 1][0], p.trail[i - 1][1]); ctx.lineTo(p.trail[i][0], p.trail[i][1]); ctx.stroke()
          }
          ctx.globalAlpha = 1 - p.t * 0.5; ctx.fillStyle = p.c
          ctx.beginPath(); ctx.arc(x, y, 2.1, 0, 6.28); ctx.fill()
          return p.t < 1
        })
        ctx.globalCompositeOperation = 'source-over'
      }
      ctx.globalAlpha = 1
      if (visible) raf = requestAnimationFrame(draw)
    }
    resize(); raf = requestAnimationFrame(draw)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(draw) } })
    io.observe(cvs)
    addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', resize) }
  }, [target[0], target[1], density])
  return <canvas ref={ref} className="flow-canvas" aria-hidden="true" />
}
