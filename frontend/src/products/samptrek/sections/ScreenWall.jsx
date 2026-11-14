import { screens } from '../content.js'
import Icon from '../components/Icon.jsx'

// A tilted, endlessly drifting wall of real screens (dark + light themes).
const ROW_A = [
  ['insightPanels', 'Health radar, global coverage, revenue vs cost, supplier performance'],
  ['commandCenterDark', 'Command center in dark mode'],
  ['crosstabs', 'Crosstabs of gate and prescreen answers'],
  ['marketsFinance', 'Markets map, revenue to profit waterfall, reconciliation and invoicing tiles'],
]
const ROW_B = [
  ['projectDark', 'Project page in dark mode'],
  ['uniqueLinks', 'Unique single-use links by vendor and market'],
  ['themeStudio', 'Theme Studio with live preview'],
  ['integrations', 'Integrations set up from Settings'],
]

export default function ScreenWall({ onZoom }) {
  const row = (items, dir) => (
    <div className={`wall-row ${dir}`}>
      <div className="wall-track">
        {[...items, ...items].map(([k, alt], i) => (
          <button key={i} className="wall-card" onClick={() => onZoom?.({ src: screens[k], alt })} aria-label={`Enlarge: ${alt}`} tabIndex={i >= items.length ? -1 : 0}>
            <img src={screens[k]} alt="" loading="lazy" decoding="async" />
            <span className="wall-cap">{alt}<Icon name="Maximize2" size={13} /></span>
          </button>
        ))}
      </div>
    </div>
  )
  return (
    <section className="wall" aria-label="More product screens">
      <div className="wall-tilt">
        {row(ROW_A, 'left')}
        {row(ROW_B, 'right')}
      </div>
    </section>
  )
}
