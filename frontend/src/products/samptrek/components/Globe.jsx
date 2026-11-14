import { useEffect, useRef } from 'react'

// A 3D dotted globe drawn on canvas: rotating, draggable, with glowing market
// pins and arcs that carry pulses between markets. No libraries, no map keys.
// Pins are approximate city coordinates [lat, lon].
const MARKETS = [
  { n: 'United States', c: [40.7, -74] }, { n: 'United Kingdom', c: [51.5, -0.1] },
  { n: 'Germany', quiet: true, c: [52.5, 13.4] }, { n: 'France', quiet: true, c: [48.9, 2.35] },
  { n: 'India', c: [28.6, 77.2] }, { n: 'Japan', c: [35.7, 139.7] },
  { n: 'Brazil', c: [-23.5, -46.6] }, { n: 'Australia', c: [-33.9, 151.2] },
  { n: 'UAE', c: [25.2, 55.3] }, { n: 'Canada', quiet: true, c: [43.7, -79.4] },
  { n: 'Singapore', quiet: true, c: [1.35, 103.8] }, { n: 'South Africa', c: [-26.2, 28] },
]
const ARCS = [[1, 0], [2, 4], [4, 5], [0, 6], [3, 8], [8, 10], [10, 7], [2, 1], [9, 1], [4, 11], [5, 7]]
const COLORS = ['#FEE440', '#F15BB5', '#9B5DE5', '#0BC5FF', '#5BF5A0']

// Very rough land mask so the dots suggest continents (lat/lon boxes).
const LAND = [
  [15, 72, -168, -52], [7, 20, -105, -77], [-56, 12, -82, -34], [36, 71, -10, 40], [-35, 37, -18, 52],
  [12, 42, 35, 60], [5, 55, 60, 145], [55, 75, 40, 180], [-45, -10, 112, 154], [60, 83, -73, -12], [-10, 6, 95, 141], [30, 46, 128, 146],
]
const isLand = (lat, lon) => LAND.some(([a, b, c, d]) => lat >= a && lat <= b && lon >= c && lon <= d)

export default function Globe() {
  const ref = useRef(null)
  useEffect(() => {
    const cvs = ref.current, ctx = cvs.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, dpr, R, raf, rot = -0.6, tilt = 0.32, drag = null, vel = 0.0022, visible = true
    const pts = []
    const N = 4200
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963
      const x = Math.cos(th) * r, z = Math.sin(th) * r
      const lat = Math.asin(y) * 180 / Math.PI, lon = Math.atan2(x, z) * 180 / Math.PI
      pts.push({ x, y, z, land: isLand(lat, lon) })
    }
    const ll = ([lat, lon]) => {
      const la = lat * Math.PI / 180, lo = lon * Math.PI / 180
      return { x: Math.cos(la) * Math.sin(lo), y: Math.sin(la), z: Math.cos(la) * Math.cos(lo) }
    }
    const mk = MARKETS.map((m) => ({ ...m, v: ll(m.c) }))
    const pulses = ARCS.map((a, i) => ({ a, t: Math.random(), s: 0.003 + Math.random() * 0.003, col: COLORS[i % COLORS.length] }))
    const proj = (p) => {
      const cr = Math.cos(rot), sr = Math.sin(rot)
      let x = p.x * cr + p.z * sr, z = -p.x * sr + p.z * cr, y = p.y
      const ct = Math.cos(tilt), st = Math.sin(tilt)
      const y2 = y * ct - z * st, z2 = y * st + z * ct
      return { X: w / 2 + x * R, Y: h / 2 - y2 * R, z: z2 }
    }
    const slerp = (a, b, t) => {
      const d = Math.acos(Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z)))
      const s = Math.sin(d) || 1, k1 = Math.sin((1 - t) * d) / s, k2 = Math.sin(t * d) / s
      const lift = 1 + Math.sin(Math.PI * t) * 0.18 * d
      return { x: (a.x * k1 + b.x * k2) * lift, y: (a.y * k1 + b.y * k2) * lift, z: (a.z * k1 + b.z * k2) * lift }
    }
    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); w = cvs.clientWidth; h = cvs.clientHeight
      cvs.width = w * dpr; cvs.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      R = Math.min(w, h) * 0.40
    }
    const draw = (now) => {
      if (!drag && !reduce) rot += vel
      ctx.clearRect(0, 0, w, h)
      // atmosphere
      const g = ctx.createRadialGradient(w / 2, h / 2, R * 0.85, w / 2, h / 2, R * 1.22)
      g.addColorStop(0, 'rgba(123,77,255,0.35)'); g.addColorStop(0.5, 'rgba(11,197,255,0.10)'); g.addColorStop(1, 'rgba(11,197,255,0)')
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(w / 2, h / 2, R * 1.22, 0, 6.28); ctx.fill()
      const body = ctx.createRadialGradient(w / 2 - R * 0.35, h / 2 - R * 0.4, R * 0.1, w / 2, h / 2, R)
      body.addColorStop(0, 'rgba(60,40,140,0.55)'); body.addColorStop(1, 'rgba(10,6,32,0.9)')
      ctx.fillStyle = body; ctx.beginPath(); ctx.arc(w / 2, h / 2, R, 0, 6.28); ctx.fill()
      for (const p of pts) {
        const q = proj(p); if (q.z < 0) continue
        const a = 0.15 + q.z * 0.85
        ctx.globalAlpha = p.land ? Math.min(1, a * 1.15) : a * 0.3
        ctx.fillStyle = p.land ? (q.X < w / 2 ? '#B59CFF' : '#7FE3FF') : '#6B5BA8'
        const s = p.land ? 2.2 : 1.1
        ctx.fillRect(q.X - s / 2, q.Y - s / 2, s, s)
      }
      ctx.globalAlpha = 1
      // arcs + pulses
      for (const pu of pulses) {
        const A = mk[pu.a[0]].v, B = mk[pu.a[1]].v
        ctx.beginPath(); let started = false
        for (let i = 0; i <= 40; i++) {
          const q = proj(slerp(A, B, i / 40))
          if (q.z < -0.05) { started = false; continue }
          if (!started) { ctx.moveTo(q.X, q.Y); started = true } else ctx.lineTo(q.X, q.Y)
        }
        ctx.strokeStyle = pu.col; ctx.globalAlpha = 0.35; ctx.lineWidth = 1.2; ctx.stroke()
        if (!reduce) pu.t = (pu.t + pu.s) % 1
        const q = proj(slerp(A, B, pu.t))
        if (q.z > -0.05) {
          ctx.globalAlpha = 1; ctx.fillStyle = pu.col; ctx.shadowColor = pu.col; ctx.shadowBlur = 14
          ctx.beginPath(); ctx.arc(q.X, q.Y, 2.6, 0, 6.28); ctx.fill(); ctx.shadowBlur = 0
        }
      }
      // pins
      mk.forEach((m, i) => {
        const q = proj(m.v); if (q.z < 0.02) return
        const col = COLORS[i % COLORS.length], pulse = reduce ? 0.5 : (now * 0.001 + i * 0.37) % 1
        ctx.globalAlpha = (1 - pulse) * q.z; ctx.strokeStyle = col; ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.arc(q.X, q.Y, 4 + pulse * 16, 0, 6.28); ctx.stroke()
        ctx.globalAlpha = q.z; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(q.X, q.Y, 3.4, 0, 6.28); ctx.fill()
        if (q.z > 0.45 && w > 420 && !m.quiet) {
          ctx.font = '600 12px Inter, system-ui, sans-serif'; ctx.fillStyle = '#F3EEFF'; ctx.globalAlpha = (q.z - 0.45) * 1.8
          ctx.fillText(m.n, q.X + 9, q.Y - 8)
        }
      })
      ctx.globalAlpha = 1
      if (visible) raf = requestAnimationFrame(draw)
    }
    const down = (e) => { drag = { x: e.clientX, y: e.clientY, r: rot, t: tilt }; cvs.setPointerCapture(e.pointerId) }
    const move = (e) => { if (!drag) return; rot = drag.r + (e.clientX - drag.x) * 0.006; tilt = Math.max(-0.9, Math.min(0.9, drag.t + (e.clientY - drag.y) * 0.004)) }
    const up = () => { drag = null }
    cvs.addEventListener('pointerdown', down); cvs.addEventListener('pointermove', move); cvs.addEventListener('pointerup', up); cvs.addEventListener('pointercancel', up)
    resize(); raf = requestAnimationFrame(draw)
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw) } })
    io.observe(cvs); addEventListener('resize', resize)
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="globe-canvas" aria-label="Rotating globe showing research markets connected by SampTrek" role="img" />
}
