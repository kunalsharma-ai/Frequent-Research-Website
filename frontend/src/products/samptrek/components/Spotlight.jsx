// Card wrapper that tracks the mouse so CSS can draw a moving light and a 3D tilt.
export default function Spotlight({ as: Tag = 'div', className = '', tilt = 6, children, style, ...rest }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
    const el = e.currentTarget
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    el.style.setProperty('--rx', `${(0.5 - py) * tilt}deg`)
    el.style.setProperty('--ry', `${(px - 0.5) * tilt}deg`)
  }
  const onLeave = (e) => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }
  return (
    <Tag className={`spotlight ${className}`} onPointerMove={onMove} onPointerLeave={onLeave} style={style} {...rest}>
      {children}
    </Tag>
  )
}
