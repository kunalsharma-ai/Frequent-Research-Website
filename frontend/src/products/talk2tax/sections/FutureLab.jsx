import { useMemo, useState } from 'react';
import { TrendingDown, Clock, Factory, RotateCcw } from 'lucide-react';
import { screen } from '../content/screens';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import ScreenFrame from '../components/ScreenFrame';

/*
 * A small interactive illustration of the digital twin. It uses fixed demo figures and a
 * deliberately simple model; the product's twin runs on the organisation's posted books.
 * Units are lakh rupees.
 */
const DEMO = { cash: 14.56, revenue: 8.4, grossMargin: 0.715, overheads: 5.2, floor: 12 };
const MONTHS = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

const PRESETS = [
  { label: 'Sales fall 30% for 6 months, customers 15 days slower', icon: TrendingDown, v: { drop: 30, months: 6, delay: 15 } },
  { label: 'Customers pay 30 days later for 6 months', icon: Clock, v: { drop: 0, months: 6, delay: 30 } },
  { label: 'Operations stop for a month', icon: Factory, v: { drop: 100, months: 1, delay: 0 } },
];

function simulate({ drop, months, delay }) {
  let cash = DEMO.cash;
  let carried = 0;
  const out = [];
  for (let t = 0; t < 12; t += 1) {
    const shocked = t < months;
    const revenue = DEMO.revenue * (shocked ? 1 - drop / 100 : 1);
    const late = shocked ? Math.min(1, delay / 30) : 0;
    const receipts = revenue * (1 - late) + carried;
    carried = revenue * late;
    const spend = revenue * (1 - DEMO.grossMargin) + DEMO.overheads;
    cash += receipts - spend;
    out.push(cash);
  }
  return out;
}

const W = 640;
const H = 280;
const PAD = { l: 44, r: 16, t: 18, b: 30 };

function chart(base, scen) {
  const all = [...base, ...scen, DEMO.floor, DEMO.cash];
  const lo = Math.floor(Math.min(...all) - 1);
  const hi = Math.ceil(Math.max(...all) + 1);
  const x = (i) => PAD.l + (i / 11) * (W - PAD.l - PAD.r);
  const y = (v) => PAD.t + (1 - (v - lo) / (hi - lo)) * (H - PAD.t - PAD.b);
  const line = (arr) => arr.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const area = (arr) => `${line(arr)} L${x(11).toFixed(1)},${(H - PAD.b).toFixed(1)} L${x(0).toFixed(1)},${(H - PAD.b).toFixed(1)} Z`;
  const ticks = [];
  const step = Math.max(1, Math.round((hi - lo) / 5));
  for (let v = Math.ceil(lo); v <= hi; v += step) ticks.push(v);
  return { x, y, line, area, ticks, lo, hi };
}

const lakh = (v) => `₹${v.toFixed(2)}L`;

export default function FutureLab({ reducedMotion, onOpen }) {
  const [v, setV] = useState(PRESETS[0].v);
  const base = useMemo(() => simulate({ drop: 0, months: 0, delay: 0 }), []);
  const scen = useMemo(() => simulate(v), [v]);
  const c = chart(base, scen);
  const lowest = Math.min(...scen);
  const lowIdx = scen.indexOf(lowest);
  const below = scen.filter((s) => s < DEMO.floor).length;
  const verdict = below === 0 ? 'Gets through without breaking the floor' : `Below the ₹${DEMO.floor}L minimum for ${below} month${below > 1 ? 's' : ''}`;

  const slider = (key, label, min, max, unit) => (
    <label className="sim-slider">
      <span>
        {label} <b>{v[key]}{unit}</b>
      </span>
      <input type="range" min={min} max={max} value={v[key]} onChange={(e) => setV((s) => ({ ...s, [key]: Number(e.target.value) }))} />
    </label>
  );

  return (
    <section className="section future" id="future">
      <div className="future-stars" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          index="05"
          eyebrow="Future lab"
          title="Rehearse tomorrow"
          accent="before it happens."
          lead="Talk2Tax keeps a digital twin of your business. Test a loan, a hire, a price change or a disaster on your own figures, take it through a war room for approval, and remember what you decided."
        />

        <Reveal className="sim" variant="zoom">
          <div className="sim-controls">
            <p className="sim-title">Try a shock</p>
            <div className="sim-presets">
              {PRESETS.map((p) => {
                const Icon = p.icon;
                const on = p.v.drop === v.drop && p.v.months === v.months && p.v.delay === v.delay;
                return (
                  <button key={p.label} className={`sim-preset ${on ? 'is-on' : ''}`} onClick={() => setV(p.v)} aria-pressed={on}>
                    <Icon size={16} aria-hidden="true" /> {p.label}
                  </button>
                );
              })}
            </div>
            {slider('drop', 'Sales lost', 0, 100, '%')}
            {slider('months', 'For how many months', 1, 12, '')}
            {slider('delay', 'Customers pay later by', 0, 60, ' days')}
            <button className="sim-reset" onClick={() => setV({ drop: 0, months: 1, delay: 0 })}>
              <RotateCcw size={14} aria-hidden="true" /> No shock
            </button>
          </div>

          <div className="sim-output">
            <div className="sim-kpis" aria-live="polite">
              <div>
                <small>Lowest cash</small>
                <b className={lowest < DEMO.floor ? 'is-bad' : 'is-good'}>{lakh(lowest)}</b>
                <span>in {MONTHS[lowIdx]}</span>
              </div>
              <div>
                <small>After 12 months</small>
                <b>{lakh(scen[11])}</b>
                <span>vs {lakh(base[11])} with no shock</span>
              </div>
              <div className={`sim-verdict ${below ? 'is-bad' : 'is-good'}`}>{verdict}</div>
            </div>
            <svg className={`sim-chart ${reducedMotion ? 'no-anim' : ''}`} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Cash over 12 months. ${verdict}. Lowest ${lakh(lowest)} in ${MONTHS[lowIdx]}.`}>
              <defs>
                <linearGradient id="simArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#A78BFA" stopOpacity=".45" />
                  <stop offset="1" stopColor="#A78BFA" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="simLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#5EEAD4" />
                  <stop offset=".5" stopColor="#818CF8" />
                  <stop offset="1" stopColor="#F0ABFC" />
                </linearGradient>
              </defs>
              {c.ticks.map((t) => (
                <g key={t}>
                  <line x1={PAD.l} x2={W - PAD.r} y1={c.y(t)} y2={c.y(t)} className="sim-grid" />
                  <text x={PAD.l - 8} y={c.y(t) + 4} className="sim-axis" textAnchor="end">
                    {t}L
                  </text>
                </g>
              ))}
              {MONTHS.map((m, i) => (
                <text key={m} x={c.x(i)} y={H - 8} className="sim-axis" textAnchor="middle">
                  {m}
                </text>
              ))}
              <line x1={PAD.l} x2={W - PAD.r} y1={c.y(DEMO.floor)} y2={c.y(DEMO.floor)} className="sim-floor" />
              <text x={W - PAD.r} y={c.y(DEMO.floor) - 6} className="sim-floor-label" textAnchor="end">
                Minimum balance ₹{DEMO.floor}L
              </text>
              <path d={c.area(scen)} fill="url(#simArea)" className="sim-path" />
              <path d={c.line(base)} className="sim-base sim-path" />
              <path d={c.line(scen)} className="sim-line sim-path" />
              <circle cx={c.x(lowIdx)} cy={c.y(lowest)} r="6" className={`sim-dot ${lowest < DEMO.floor ? 'is-bad' : ''}`} />
            </svg>
            <p className="sim-legend">
              <span className="lg-base">No shock</span>
              <span className="lg-scen">With your shock</span>
              <span className="sim-note">Illustration on demo figures. In Talk2Tax the twin runs on your own posted books.</span>
            </p>
          </div>
        </Reveal>

        <div className="future-bento">
          <Reveal className="fb-a">
            <ScreenFrame screen={screen('virtual-cfo')} tilt reducedMotion={reducedMotion} onOpen={onOpen} />
          </Reveal>
          <Reveal className="fb-b" delay={80}>
            <ScreenFrame screen={screen('war-room')} onOpen={onOpen} reducedMotion={reducedMotion} />
          </Reveal>
          <Reveal className="fb-c" delay={140}>
            <ScreenFrame screen={screen('disaster-simulation')} onOpen={onOpen} reducedMotion={reducedMotion} />
          </Reveal>
          <Reveal className="fb-d" delay={200}>
            <ScreenFrame screen={screen('decision-memory')} onOpen={onOpen} reducedMotion={reducedMotion} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
