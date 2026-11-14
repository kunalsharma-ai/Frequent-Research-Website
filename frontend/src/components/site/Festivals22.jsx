/* Build 65 update 22b — one animated scene for every festival day in the celebrations calendar.
 *
 * Kunal: "I want different type of animation for each special festival day". Every festival (category "Festival (India)"
 * or "Global Festival / Holiday") carries "scene": "<id>" in public/data/celebrations.json (set by
 * tools/celebrations/make_celebrations.py, editable in the super admin panel). CB22_Card uses CB22_FEST[scene] for the
 * artwork, colour grade and particles; days without a scene keep their motif (CB22_ART). viewBox 0 0 120 120.
 * Loops animate transform and opacity only (classes cb22a-* and fa22-* in celebrate22.css).
 */
import * as ee from 'react';
import { CB22_ART, cb22IconNodes } from './Celebrate22.jsx';
import { CB22_ICONS } from '../../data/Icons22.jsx';

/* small building blocks */
const fa22Moon = (cx, cy, r, c = "#FFF2CF") => (
  <>
    <circle className="cb22a-glow" cx={cx} cy={cy} r={r * 1.7} fill={c} opacity=".16" />
    <circle cx={cx} cy={cy} r={r} fill={c} />
    <circle cx={cx - r * 0.35} cy={cy - r * 0.15} r={r * 0.2} fill="#000" opacity=".06" />
    <circle cx={cx + r * 0.3} cy={cy + r * 0.35} r={r * 0.13} fill="#000" opacity=".06" />
  </>
);
const fa22Diya = (x, y, s = 1, k = 0, lit = true) => (
  <g key={"d" + x + y}>
    <path d={`M${x - 14 * s} ${y}c${3 * s} ${8 * s} ${25 * s} ${8 * s} ${28 * s} 0z`} fill="var(--c2)" />
    {lit ? <path className={k < 0 ? "cb22a-flame" : "cb22a-flame fa22-light"} style={{ "--k": k }} d={`M${x} ${y - 15 * s}c${4 * s} ${5 * s} ${5 * s} ${9 * s} ${2 * s} ${13 * s}-${1 * s} ${2 * s}-${3 * s} ${2 * s}-${4 * s} 0-${3 * s}-${4 * s}-${2 * s}-${8 * s} ${2 * s}-${13 * s}z`} fill="var(--c1)" /> : null}
  </g>
);
const fa22Rays = (cx, cy, r1, r2, n, c, cls = "fa22-rays") => (
  <g className={cls} style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px` }}>
    {Array.from({ length: n }, (_, i) => {
      const a = (i * 2 * Math.PI) / n;
      return <path key={i} d={`M${(cx + r1 * Math.cos(a)).toFixed(1)} ${(cy + r1 * Math.sin(a)).toFixed(1)}L${(cx + r2 * Math.cos(a)).toFixed(1)} ${(cy + r2 * Math.sin(a)).toFixed(1)}`} stroke={c} strokeWidth="2" strokeLinecap="round" opacity=".7" />;
    })}
  </g>
);
const fa22Petals = (cx, cy, r, n, rx, ry, fill, cls, k = 0) => (
  <g className={cls} style={{ transformBox: "view-box", transformOrigin: `${cx}px ${cy}px`, "--k": k }}>
    {Array.from({ length: n }, (_, i) => (
      <ellipse key={i} cx={cx} cy={cy - r} rx={rx} ry={ry} fill={typeof fill === "function" ? fill(i) : fill} transform={`rotate(${(i * 360) / n} ${cx} ${cy})`} />
    ))}
  </g>
);
const fa22Water = (y, c = "var(--c2)") => (
  <>
    <clipPath id={"fa22w" + y}>
      <rect x="6" y={y} width="108" height="60" rx="10" />
    </clipPath>
    <g clipPath={`url(#fa22w${y})`}>
      <path className="cb22a-wave" d={`M-60 ${y + 4}c15-6 30-6 45 0s30 6 45 0 30-6 45 0 30 6 45 0 30-6 45 0 30 6 45 0V${y + 60}H-60z`} fill={c} opacity=".55" />
      <path className="cb22a-wave cb22a-wave--2" d={`M-60 ${y + 10}c15-5 30-5 45 0s30 5 45 0 30-5 45 0 30 5 45 0 30-5 45 0 30 5 45 0V${y + 60}H-60z`} fill={c} opacity=".8" />
    </g>
  </>
);
const fa22Flag = (x, y, w, h, stripes, extra) => (
  <>
    <path d={`M${x} ${y - 4}v${h + 40}`} stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
    <g className="cb22a-flag">
      {stripes.map((c, i) => (
        <rect key={i} x={x + 1} y={y + (i * h) / stripes.length} width={w} height={h / stripes.length + 0.4} fill={c} />
      ))}
      {extra}
    </g>
  </>
);
const fa22Dome = (x, y, w, c) => <path d={`M${x} ${y}c0-${w * 0.7} ${w * 0.5}-${w * 0.8} ${w / 2}-${w * 1.1}c0 ${w * 0.3} ${w / 2} ${w * 0.4} ${w / 2} ${w * 1.1}z`} fill={c} />;

/* ── the scenes ─────────────────────────────────────────────────────────────────────── */
const CB22_FEST = {
  /* ── Diwali week: six different days ── */
  dhanteras: {
    pal: ["#FFC27A", "#D99A2B", "#C8577E"],
    fx: { g: ["coin", "spark"], k: "fall", n: 14 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="70" r="34" fill="var(--c1)" opacity=".2" />
        <path d="M36 62c-2 26 50 26 48 0z" fill="var(--c2)" />
        <path d="M40 62h40l-4-8H44z" fill="var(--c1)" />
        <path d="M46 54c0-8 28-8 28 0" fill="none" stroke="var(--c1)" strokeWidth="3" />
        <path d="M44 72h32" stroke="var(--c3)" strokeWidth="3" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <g key={i} className="cb22a-drop" style={{ animationDelay: i * 0.85 + "s" }}>
            <circle cx={50 + i * 10} cy="34" r="6" fill="var(--c1)" stroke="#7a5414" strokeWidth="1" />
          </g>
        ))}
        <path className="cb22a-twinkle" d="M88 30l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="#fff" />
      </>
    ),
  },
  "choti-diwali": {
    pal: ["#FFC27A", "#C8577E", "#D99A2B"],
    fx: { g: ["ember", "dot"], k: "rise", n: 14 },
    art: () => (
      <>
        <path d="M14 84h92" stroke="var(--c3)" strokeWidth="2" opacity=".6" />
        {[0, 1, 2, 3, 4].map((i) => fa22Diya(22 + i * 19, 80 - (i % 2) * 4, 0.62, i))}
        {fa22Petals(60, 44, 16, 8, 5, 9, (i) => (i % 2 ? "var(--c2)" : "var(--c1)"), "cb22a-spin-slow")}
        <circle cx="60" cy="44" r="6" fill="var(--c3)" />
      </>
    ),
  },
  diwali: {
    pal: ["#FFC27A", "#D99A2B", "#C8577E"],
    fx: { g: ["burst", "ember"], k: "burst", n: 12 },
    art: () => (
      <>
        {[
          [30, 30, 14, "var(--c3)"],
          [92, 26, 12, "var(--c1)"],
        ].map(([x, y, r, c], i) => (
          <g key={i} className="cb22a-pop" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${x}px ${y}px` }}>
            {Array.from({ length: 10 }, (_, j) => {
              const a = (j * Math.PI) / 5;
              return <path key={j} d={`M${(x + r * 0.3 * Math.cos(a)).toFixed(1)} ${(y + r * 0.3 * Math.sin(a)).toFixed(1)}L${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}`} stroke={c} strokeWidth="2" strokeLinecap="round" />;
            })}
          </g>
        ))}
        {fa22Petals(60, 74, 13, 8, 6, 12, "var(--c3)", "fa22-breath")}
        <circle className="cb22a-glow" cx="60" cy="54" r="24" fill="var(--c1)" opacity=".3" />
        {fa22Diya(60, 72, 1.3, -1)}
      </>
    ),
  },
  "diwali-holiday": {
    pal: ["#C8577E", "#FFC27A", "#6D4AFF"],
    fx: { g: ["flower", "dot"], k: "fall", n: 12 },
    art: () => (
      <>
        {fa22Petals(60, 60, 34, 12, 6, 12, (i) => (i % 2 ? "var(--c1)" : "var(--c3)"), "cb22a-spin-slow")}
        {fa22Petals(60, 60, 20, 8, 6, 10, "var(--c2)", "fa22-spin-rev")}
        <circle cx="60" cy="60" r="11" fill="#fff" />
        <circle className="cb22a-breathe" cx="60" cy="60" r="6" fill="var(--c1)" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} className="cb22a-blink" style={{ "--k": i }} cx={60 + 46 * Math.cos(i * 1.571 + 0.785)} cy={60 + 46 * Math.sin(i * 1.571 + 0.785)} r="3" fill="var(--c2)" />
        ))}
      </>
    ),
  },
  govardhan: {
    pal: ["#0E9C88", "#9FE7DC", "#FFC27A"],
    fx: { g: ["drop", "dot"], k: "fall", n: 18 },
    art: () => (
      <>
        <g className="fa22-float">
          <path d="M20 54c10-26 26-34 40-34s30 8 40 34z" fill="var(--c1)" />
          <path d="M32 44c8-4 14-2 20 2M64 34c8-2 14 0 18 6" stroke="var(--c2)" strokeWidth="2" fill="none" />
          <circle cx="44" cy="40" r="3" fill="var(--c3)" />
          <circle cx="76" cy="44" r="3" fill="var(--c3)" />
        </g>
        <path d="M60 56v28" stroke="var(--c3)" strokeWidth="4" strokeLinecap="round" />
        <path d="M52 92c0-6 4-10 8-10s8 4 8 10z" fill="var(--c3)" />
        <path d="M14 98h92" stroke="var(--c2)" strokeWidth="2" opacity=".5" />
      </>
    ),
  },
  "bhai-dooj": {
    pal: ["#C8577E", "#FFC27A", "#D99A2B"],
    fx: { g: ["heart", "spark"], k: "rise", n: 12 },
    art: () => (
      <>
        <ellipse cx="60" cy="74" rx="40" ry="14" fill="var(--c3)" />
        <ellipse cx="60" cy="71" rx="34" ry="10" fill="var(--c1)" opacity=".85" />
        {fa22Diya(46, 70, 0.7, -1)}
        <circle cx="68" cy="68" r="4" fill="#d2324a" />
        <circle cx="78" cy="70" r="4" fill="#fff" />
        <circle cx="74" cy="64" r="3" fill="var(--c2)" />
        <path className="cb22a-beat" d="M60 40s-12-8-12-16a6 6 0 0 1 12-2 6 6 0 0 1 12 2c0 8-12 16-12 16z" fill="var(--c1)" />
      </>
    ),
  },
  /* ── winter and spring festivals ── */
  lohri: {
    pal: ["#FFC27A", "#C8577E", "#D99A2B"],
    fx: { g: ["dot", "ember"], k: "rise", n: 16 },
    art: () => (
      <>
        <g className="cb22a-flame">
          <path d="M48 30c14 16 16 28 8 40H40c-8-12-4-24 8-40z" fill="var(--c2)" />
          <path d="M48 44c7 9 8 16 4 26h-8c-4-10-3-17 4-26z" fill="var(--c1)" />
        </g>
        <path d="M28 86l40-12M28 74l40 12" stroke="#8a5a2b" strokeWidth="7" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} className="fa22-popcorn" style={{ "--k": i }} cx={34 + i * 9} cy="66" r="3" fill="#fff8e6" />
        ))}
        <g className="fa22-shake" style={{ transformBox: "view-box", transformOrigin: "92px 80px" }}>
          <rect x="80" y="66" width="24" height="28" rx="6" fill="var(--c3)" />
          <path d="M80 72h24M80 88h24M84 66l16 28M100 66L84 94" stroke="#fff" strokeOpacity=".6" strokeWidth="1.4" />
        </g>
      </>
    ),
  },
  "makar-sankranti": {
    pal: ["#FFC27A", "#9FE7DC", "#2F6BFF"],
    fx: { g: ["kite", "dot"], k: "sway", n: 9 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="92" cy="28" r="12" fill="var(--c1)" opacity=".6" />
        <circle cx="92" cy="28" r="8" fill="var(--c1)" />
        <path d="M58 72C70 92 90 98 112 104" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="3 3" />
        <g className="cb22a-sway">
          <path d="M50 18l24 28-24 28-24-28z" fill="var(--c3)" />
          <path d="M50 18l24 28H50z" fill="var(--c1)" />
          <path d="M50 18v56M26 46h48" stroke="#fff" strokeWidth="1.6" opacity=".7" />
          <path d="M50 74c-4 8 4 12 0 20" fill="none" stroke="var(--c2)" strokeWidth="1.6" />
        </g>
        <g className="cb22a-sway" style={{ animationDelay: "-1.4s" }}>
          <path d="M28 50l10 12-10 14-10-14z" fill="var(--c2)" />
        </g>
      </>
    ),
  },
  "vasant-panchami": {
    pal: ["#FFD34D", "#FFC27A", "#2F6BFF"],
    fx: { g: ["note", "flower"], k: "drift", n: 12 },
    art: () => (
      <>
        <circle cx="34" cy="84" r="16" fill="var(--c2)" />
        <circle cx="86" cy="36" r="12" fill="var(--c2)" />
        <path d="M44 76L80 42" stroke="#8a5a2b" strokeWidth="6" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} className="fa22-string" style={{ "--k": i }} d={`M${30 + i * 3} ${80 - i * 3}L${84 + i * 1} ${34 - i * 1}`} stroke="#fff" strokeOpacity=".7" strokeWidth=".8" />
        ))}
        {[0, 1, 2].map((i) => (
          <g key={i} className="cb22a-sway" style={{ animationDelay: -i * 0.8 + "s", transformBox: "view-box", transformOrigin: `${16 + i * 10}px 112px` }}>
            <path d={`M${16 + i * 10} 112V${92 - i * 4}`} stroke="#5aa34a" strokeWidth="1.6" />
            <circle cx={16 + i * 10} cy={90 - i * 4} r="4" fill="var(--c1)" />
          </g>
        ))}
      </>
    ),
  },
  "shab-e-barat": {
    pal: ["#D99A2B", "#9FE7DC", "#6D4AFF"],
    fx: { g: ["star5", "dot"], k: "twinkle", n: 18 },
    art: () => (
      <>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={22 + i * 17} y={66 - (i === 2 ? 12 : i % 2 ? 6 : 0)} width="9" height={30 + (i === 2 ? 12 : i % 2 ? 6 : 0)} rx="2" fill="#fff3d6" />
            <path className="cb22a-flame fa22-light" style={{ "--k": i }} d={`M${26.5 + i * 17} ${54 - (i === 2 ? 12 : i % 2 ? 6 : 0)}c3 4 3 7 0 10-3-3-3-6 0-10z`} fill="var(--c1)" />
          </g>
        ))}
        <path d="M14 96h92" stroke="var(--c2)" strokeOpacity=".5" strokeWidth="2" />
      </>
    ),
  },
  "maha-shivaratri": {
    pal: ["#9FE7DC", "#2F6BFF", "#D99A2B"],
    fx: { g: ["smoke", "dot"], k: "rise", n: 10 },
    art: () => (
      <>
        <path d="M80 26a14 14 0 1 0 6 22 11 11 0 1 1-6-22z" fill="var(--c1)" className="cb22a-rock" />
        <path d="M54 18v86" stroke="#e2e8f0" strokeWidth="4" strokeLinecap="round" />
        <path d="M54 22c-12 0-14 14-14 22M54 22c12 0 14 14 14 22M40 44l-2-6M68 44l2-6M54 18l-4-8h8z" stroke="#e2e8f0" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <g className="fa22-shake" style={{ transformBox: "view-box", transformOrigin: "54px 64px" }}>
          <path d="M44 56l20 16M64 56L44 72" stroke="var(--c3)" strokeWidth="1" />
          <path d="M44 56h20l-10 8zM44 72h20l-10-8z" fill="var(--c3)" />
        </g>
      </>
    ),
  },
  "presidents-day": {
    pal: ["#2F6BFF", "#FFFFFF", "#C8577E"],
    fx: { g: ["star5", "confetti"], k: "fall", n: 14 },
    art: () => fa22Flag(22, 22, 78, 50, ["#B22234", "#fff", "#B22234", "#fff", "#B22234", "#fff", "#B22234"], <rect x="23" y="22" width="32" height="28" fill="#3C3B6E" />),
  },
  "chinese-new-year": {
    pal: ["#C8577E", "#D99A2B", "#FFC27A"],
    fx: { g: ["lamp", "ember"], k: "rise", n: 12 },
    art: () => (
      <>
        {[
          [38, 18, 1],
          [72, 8, 1.25],
          [96, 30, 0.85],
        ].map(([x, y, s], i) => (
          <g key={i} className="cb22a-swing" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${x}px ${y}px` }}>
            <path d={`M${x} ${y}v${12 * s}`} stroke="var(--c2)" strokeWidth="1.4" />
            <ellipse cx={x} cy={y + 34 * s} rx={16 * s} ry={20 * s} fill="#d2324a" />
            <path d={`M${x - 16 * s} ${y + 34 * s}h${32 * s}M${x} ${y + 14 * s}v${40 * s}`} stroke="var(--c2)" strokeWidth="1.2" opacity=".7" />
            <rect x={x - 7 * s} y={y + 12 * s} width={14 * s} height={4 * s} rx="1" fill="var(--c2)" />
            <rect x={x - 7 * s} y={y + 52 * s} width={14 * s} height={4 * s} rx="1" fill="var(--c2)" />
          </g>
        ))}
      </>
    ),
  },
  "ash-wednesday": {
    pal: ["#9FE7DC", "#94a3b8", "#6D4AFF"],
    fx: { g: ["smoke", "dot"], k: "drift", n: 10 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="56" r="34" fill="var(--c2)" opacity=".15" />
        <path d="M54 18h12v24h22v12H66v50H54V54H32V42h22z" fill="#e2e8f0" />
        <path className="fa22-breath" d="M50 46c4-4 16-4 20 0-2 6-18 6-20 0z" fill="#475569" opacity=".7" />
      </>
    ),
  },
  "ramadan-begins": {
    pal: ["#D99A2B", "#9FE7DC", "#6D4AFF"],
    fx: { g: ["star5", "dot"], k: "twinkle", n: 16 },
    art: () => (
      <>
        <path className="cb22a-rock" d="M58 20a32 32 0 1 0 0 62 26 26 0 1 1 0-62z" fill="var(--c1)" />
        {[0, 1].map((i) => (
          <g key={i} className="cb22a-swing" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${84 + i * 16}px 14px` }}>
            <path d={`M${84 + i * 16} 14v${18 + i * 12}`} stroke="var(--c1)" strokeWidth="1.2" />
            <path d={`M${78 + i * 16} ${32 + i * 12}h12l3 6v12l-6 6-6-6-6-6V${38 + i * 12}z`} fill="var(--c3)" />
            <rect className="cb22a-blink" x={81 + i * 16} y={40 + i * 12} width="6" height="8" rx="2" fill="var(--c1)" />
          </g>
        ))}
      </>
    ),
  },
  "holika-dahan": {
    pal: ["#FFC27A", "#D99A2B", "#C8577E"],
    fx: { g: ["ember", "spark"], k: "rise", n: 18 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="64" r="34" fill="var(--c1)" opacity=".22" />
        <g className="cb22a-flame">
          <path d="M60 24c16 18 20 32 10 46H50C40 56 46 42 60 24z" fill="var(--c3)" />
          <path d="M60 38c10 12 12 20 6 32H54c-6-12-4-20 6-32z" fill="var(--c1)" />
          <path d="M60 52c4 6 5 10 2 18h-4c-3-8-2-12 2-18z" fill="#fff" opacity=".85" />
        </g>
        <path d="M34 92l52-14M34 78l52 14" stroke="#8a5a2b" strokeWidth="8" strokeLinecap="round" />
      </>
    ),
  },
  holi: {
    pal: ["#C8577E", "#FFC27A", "#6D4AFF"],
    fx: { g: ["powder", "dot"], k: "burst", n: 16 },
    art: () => (
      <>
        {[
          [40, 46, 20, "var(--c1)"],
          [78, 40, 18, "var(--c2)"],
          [62, 74, 22, "var(--c3)"],
          [34, 80, 12, "#9FE7DC"],
          [88, 78, 13, "var(--c2)"],
        ].map(([x, y, r, c], i) => (
          <g key={i} className="cb22a-puff" style={{ "--k": i }}>
            <circle cx={x} cy={y} r={r} fill={c} opacity=".85" />
            <circle cx={x + r * 0.7} cy={y - r * 0.6} r={r * 0.35} fill={c} opacity=".7" />
          </g>
        ))}
      </>
    ),
  },
  "st-patricks": {
    pal: ["#0E9C88", "#9FE7DC", "#D99A2B"],
    fx: { g: ["clover", "coin"], k: "fall", n: 14 },
    art: () => (
      <>
        <g className="cb22a-spin-slow" style={{ transformBox: "view-box", transformOrigin: "60px 54px" }}>
          {[0, 120, 240].map((a) => (
            <g key={a} transform={`rotate(${a} 60 54)`}>
              <path d="M60 54c-4-10-18-12-18-24a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 12-14 14-18 24z" fill="var(--c1)" />
            </g>
          ))}
        </g>
        <path d="M60 58c2 16 6 26 14 34" stroke="var(--c1)" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle className="cb22a-twinkle" cx="94" cy="88" r="6" fill="var(--c3)" />
      </>
    ),
  },
  ugadi: {
    pal: ["#5aa34a", "#FFC27A", "#D99A2B"],
    fx: { g: ["leaf", "flower"], k: "fall", n: 12 },
    art: () => (
      <>
        <path d="M10 22h100" stroke="var(--c2)" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <path key={i} className="cb22a-swing" style={{ "--k": i }} d={`M${16 + i * 14.5} 22c-5 8-4 18 0 24 4-6 5-16 0-24z`} fill={i % 2 ? "var(--c1)" : "#3e8a3a"} />
        ))}
        <path d="M44 70c-4 20 36 20 32 0z" fill="var(--c3)" />
        <rect x="46" y="62" width="28" height="8" rx="3" fill="var(--c2)" />
        <circle className="cb22a-breathe" cx="60" cy="56" r="7" fill="var(--c1)" />
      </>
    ),
  },
  "eid-ul-fitr": {
    pal: ["#D99A2B", "#0E9C88", "#9FE7DC"],
    fx: { g: ["star5", "spark"], k: "twinkle", n: 18 },
    art: () => (
      <>
        <path className="cb22a-rock" d="M86 14a16 16 0 1 0 0 30 13 13 0 1 1 0-30z" fill="var(--c1)" />
        <path className="cb22a-twinkle" d="M104 34l1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5 4-1.5z" fill="#fff" />
        {fa22Dome(36, 70, 48, "var(--c2)")}
        <rect x="32" y="70" width="56" height="30" fill="var(--c2)" />
        <path d="M54 100V86a6 6 0 0 1 12 0v14z" fill="#0B1437" />
        <rect x="20" y="44" width="7" height="56" fill="var(--c3)" />
        <rect x="93" y="44" width="7" height="56" fill="var(--c3)" />
        <path d="M20 44l3.5-8 3.5 8zM93 44l3.5-8 3.5 8z" fill="var(--c1)" />
        <rect className="cb22a-blink" x="44" y="78" width="5" height="7" rx="2" fill="var(--c1)" />
        <rect className="cb22a-blink" style={{ "--k": 2 }} x="71" y="78" width="5" height="7" rx="2" fill="var(--c1)" />
      </>
    ),
  },
  "ram-navami": {
    pal: ["#FFC27A", "#D99A2B", "#C8577E"],
    fx: { g: ["spark", "dot"], k: "rise", n: 12 },
    art: () => (
      <>
        <g className="fa22-sunrise">
          <circle cx="60" cy="84" r="22" fill="var(--c1)" />
          {fa22Rays(60, 84, 26, 36, 14, "var(--c1)")}
        </g>
        <path d="M14 100h92" stroke="var(--c2)" strokeWidth="2" />
        <path d="M30 22c22 10 22 50 0 60" fill="none" stroke="var(--c2)" strokeWidth="4" strokeLinecap="round" />
        <path d="M30 22v60" stroke="#fff" strokeWidth="1" />
        <g className="fa22-shoot">
          <path d="M30 52h56" stroke="#fff" strokeWidth="2" />
          <path d="M86 52l-8-4v8z" fill="var(--c3)" />
        </g>
      </>
    ),
  },
  "palm-sunday": {
    pal: ["#5aa34a", "#9FE7DC", "#FFC27A"],
    fx: { g: ["leaf", "dot"], k: "drift", n: 10 },
    art: () => (
      <>
        {[-30, 0, 30].map((a, i) => (
          <g key={i} className="cb22a-sway" style={{ animationDelay: -i * 0.7 + "s", transformBox: "view-box", transformOrigin: "60px 104px" }}>
            <g transform={`rotate(${a} 60 104)`}>
              <path d="M60 104V24" stroke="var(--c1)" strokeWidth="2" />
              {Array.from({ length: 7 }, (_, j) => (
                <path key={j} d={`M60 ${32 + j * 10}l-14 6M60 ${32 + j * 10}l14 6`} stroke="var(--c1)" strokeWidth="3" strokeLinecap="round" />
              ))}
            </g>
          </g>
        ))}
      </>
    ),
  },
  "mahavir-jayanti": {
    pal: ["#FFC27A", "#D99A2B", "#C8577E"],
    fx: { g: ["flower", "dot"], k: "fall", n: 10 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="58" r="40" fill="var(--c1)" opacity=".15" />
        <path d="M40 104V58c0-6 8-6 8 0V40c0-6 8-6 8 0v-4c0-6 8-6 8 0v4c0-6 8-6 8 0v24c4-8 12-6 10 0l-8 18c-4 10-10 22-18 22z" fill="var(--c1)" />
        <g className="cb22a-spin" style={{ transformBox: "view-box", transformOrigin: "60px 72px", animationDuration: "12s" }}>
          <circle cx="60" cy="72" r="10" fill="none" stroke="var(--c3)" strokeWidth="2" />
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M60 72l${(10 * Math.cos((i * Math.PI) / 6)).toFixed(1)} ${(10 * Math.sin((i * Math.PI) / 6)).toFixed(1)}`} stroke="var(--c3)" strokeWidth="1.2" />
          ))}
        </g>
      </>
    ),
  },
  "hanuman-jayanti": {
    pal: ["#FF8A3D", "#D99A2B", "#FFC27A"],
    fx: { g: ["spark", "ember"], k: "rise", n: 14 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="56" r="40" fill="var(--c1)" opacity=".2" />
        <g className="fa22-clash" style={{ transformBox: "view-box", transformOrigin: "60px 104px" }}>
          <path d="M58 104V54h4v50z" fill="var(--c2)" />
          <ellipse cx="60" cy="40" rx="18" ry="22" fill="var(--c1)" />
          <path d="M42 40h36M44 30h32M44 50h32" stroke="var(--c2)" strokeWidth="2.5" />
          <path d="M60 18v-6" stroke="var(--c2)" strokeWidth="4" strokeLinecap="round" />
        </g>
      </>
    ),
  },
  "good-friday": {
    pal: ["#9FE7DC", "#2F6BFF", "#FFC27A"],
    fx: { g: ["dot", "spark"], k: "twinkle", n: 10 },
    art: () => (
      <>
        {fa22Rays(60, 50, 22, 44, 18, "var(--c3)")}
        <path d="M55 16h10v24h20v10H65v54H55V50H35V40h20z" fill="#e2e8f0" />
        <path d="M30 104c10-8 50-8 60 0z" fill="var(--c2)" opacity=".5" />
      </>
    ),
  },
  "easter-sunday": {
    pal: ["#FFC27A", "#C8577E", "#9FE7DC"],
    fx: { g: ["flower", "dot"], k: "fall", n: 12 },
    art: () => (
      <>
        {fa22Rays(60, 64, 30, 44, 16, "var(--c1)")}
        <path d="M38 66c0 20 10 32 22 32s22-12 22-32z" fill="#fff" />
        <path d="M38 66l6-6 6 6 6-6 6 6 6-6 6 6 6-6 4 6" fill="none" stroke="var(--c2)" strokeWidth="2" />
        <g className="fa22-lid" style={{ transformBox: "view-box", transformOrigin: "38px 62px" }}>
          <path d="M38 62c0-22 10-36 22-36s22 14 22 36l-4-4-6 4-6-4-6 4-6-4-6 4-6-4z" fill="#fff" />
          <path d="M44 44h32" stroke="var(--c3)" strokeWidth="3" />
        </g>
        <circle className="cb22a-twinkle" cx="60" cy="76" r="5" fill="var(--c1)" />
      </>
    ),
  },
  "easter-monday": {
    pal: ["#9FE7DC", "#C8577E", "#FFC27A"],
    fx: { g: ["egg", "flower"], k: "fall", n: 10 },
    art: () => (
      <>
        <path d="M10 98h100" stroke="#5aa34a" strokeWidth="3" />
        <g className="fa22-hop">
          <ellipse cx="60" cy="80" rx="16" ry="14" fill="#f8fafc" />
          <circle cx="72" cy="64" r="9" fill="#f8fafc" />
          <ellipse cx="70" cy="46" rx="3.5" ry="11" fill="#f8fafc" />
          <ellipse cx="78" cy="48" rx="3.5" ry="11" fill="#f8fafc" transform="rotate(14 78 48)" />
          <ellipse cx="70" cy="46" rx="1.5" ry="7" fill="var(--c2)" />
          <circle cx="75" cy="63" r="1.4" fill="#0B1437" />
          <circle cx="44" cy="78" r="5" fill="#fff" />
        </g>
        {[
          [24, 92, "var(--c1)"],
          [96, 92, "var(--c2)"],
        ].map(([x, y, c], i) => (
          <ellipse key={i} className="cb22a-hop" style={{ "--k": i }} cx={x} cy={y} rx="6" ry="8" fill={c} />
        ))}
      </>
    ),
  },
  "orthodox-easter": {
    pal: ["#d2324a", "#D99A2B", "#FFC27A"],
    fx: { g: ["egg", "spark"], k: "rise", n: 10 },
    art: () => (
      <>
        <path d="M30 86c0 10 60 10 60 0z" fill="var(--c2)" />
        {[
          [44, 72, -12],
          [60, 68, 0],
          [76, 72, 12],
        ].map(([x, y, r], i) => (
          <g key={i} className="cb22a-hop" style={{ "--k": i }}>
            <ellipse cx={x} cy={y} rx="9" ry="12" fill="var(--c1)" transform={`rotate(${r} ${x} ${y})`} />
            <path d={`M${x - 8} ${y}h16`} stroke="var(--c3)" strokeWidth="1.6" transform={`rotate(${r} ${x} ${y})`} />
          </g>
        ))}
        <rect x="57" y="22" width="6" height="30" rx="2" fill="#fff3d6" />
        <path className="cb22a-flame" d="M60 10c4 5 4 8 0 12-4-4-4-7 0-12z" fill="var(--c3)" />
      </>
    ),
  },
  songkran: {
    pal: ["#9FE7DC", "#2F6BFF", "#FFC27A"],
    fx: { g: ["drop", "bubble"], k: "burst", n: 16 },
    art: () => (
      <>
        <path d="M30 64h60l-6 26H36z" fill="var(--c3)" />
        <ellipse cx="60" cy="64" rx="30" ry="6" fill="var(--c2)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} className="fa22-splash" style={{ "--k": i, transformBox: "view-box", transformOrigin: "60px 62px" }} d={`M60 62c${-20 + i * 10} -18 ${-24 + i * 12} -30 ${-28 + i * 14} -38`} stroke="var(--c1)" strokeWidth="3" fill="none" strokeLinecap="round" />
        ))}
      </>
    ),
  },
  baisakhi: {
    pal: ["#D99A2B", "#FFC27A", "#0E9C88"],
    fx: { g: ["feather", "dot"], k: "sway", n: 9 },
    art: () => (
      <>
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} className="cb22a-sway" style={{ animationDelay: -i * 0.5 + "s", transformBox: "view-box", transformOrigin: `${26 + i * 9}px 104px` }}>
            <path d={`M${26 + i * 9} 104V${44 + (i % 2) * 8}`} stroke="var(--c1)" strokeWidth="2" />
            <ellipse cx={26 + i * 9} cy={40 + (i % 2) * 8} rx="4" ry="12" fill="var(--c1)" />
          </g>
        ))}
        <g className="fa22-shake" style={{ transformBox: "view-box", transformOrigin: "88px 74px" }}>
          <rect x="72" y="58" width="32" height="34" rx="8" fill="var(--c3)" />
          <path d="M72 64h32M72 86h32M76 58l24 34M100 58L76 92" stroke="#fff" strokeOpacity=".6" strokeWidth="1.4" />
        </g>
      </>
    ),
  },
  "pohela-boishakh": {
    pal: ["#d2324a", "#FFFFFF", "#FFC27A"],
    fx: { g: ["flower", "dot"], k: "fall", n: 12 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="58" r="40" fill="var(--c3)" opacity=".2" />
        {fa22Petals(60, 58, 28, 10, 7, 14, (i) => (i % 2 ? "var(--c1)" : "var(--c2)"), "cb22a-spin-slow")}
        <circle cx="60" cy="58" r="16" fill="var(--c3)" />
        <path d="M52 56a3 3 0 1 0 6 0M62 56a3 3 0 1 0 6 0M54 64c4 4 8 4 12 0" stroke="#0B1437" strokeWidth="2" fill="none" />
      </>
    ),
  },
  "akshaya-tritiya": {
    pal: ["#D99A2B", "#FFC27A", "#C8577E"],
    fx: { g: ["spark", "coin"], k: "twinkle", n: 14 },
    art: () => (
      <>
        <path d="M30 40c0 30 60 30 60 0" fill="none" stroke="var(--c1)" strokeWidth="5" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} className="cb22a-blink" style={{ "--k": i }} cx={30 + i * 10} cy={40 + Math.sin((i / 6) * Math.PI) * 22} r="4" fill="var(--c2)" />
        ))}
        <path d="M60 64l8 10-8 12-8-12z" fill="var(--c3)" />
        <rect x="34" y="88" width="22" height="10" rx="2" fill="var(--c1)" />
        <rect x="62" y="88" width="22" height="10" rx="2" fill="var(--c1)" />
        <rect x="48" y="80" width="22" height="10" rx="2" fill="var(--c2)" className="fa22-float" />
      </>
    ),
  },
  "buddha-purnima": {
    pal: ["#FFC27A", "#0E9C88", "#D99A2B"],
    fx: { g: ["petal", "dot"], k: "fall", n: 12 },
    art: () => (
      <>
        {fa22Moon(60, 46, 26)}
        <g className="cb22a-spin" style={{ transformBox: "view-box", transformOrigin: "60px 46px", animationDuration: "16s" }}>
          <circle cx="60" cy="46" r="14" fill="none" stroke="var(--c3)" strokeWidth="2" />
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={`M60 46l${(14 * Math.cos((i * Math.PI) / 4)).toFixed(1)} ${(14 * Math.sin((i * Math.PI) / 4)).toFixed(1)}`} stroke="var(--c3)" strokeWidth="1.6" />
          ))}
          <circle cx="60" cy="46" r="3" fill="var(--c3)" />
        </g>
        <g className="cb22a-sway" style={{ transformBox: "view-box", transformOrigin: "60px 104px" }}>
          <path d="M60 104c-14-6-20-18-12-28 4 6 12 6 12 0 0 6 8 6 12 0 8 10 2 22-12 28z" fill="var(--c2)" />
        </g>
      </>
    ),
  },
  "mothers-day": {
    pal: ["#C8577E", "#FFC27A", "#9FE7DC"],
    fx: { g: ["heart", "petal"], k: "rise", n: 12 },
    art: () => (
      <>
        {[
          [44, 40, "var(--c1)"],
          [60, 30, "var(--c2)"],
          [76, 40, "var(--c1)"],
        ].map(([x, y, c], i) => (
          <g key={i} className="cb22a-sway" style={{ animationDelay: -i * 0.6 + "s", transformBox: "view-box", transformOrigin: "60px 90px" }}>
            <path d={`M60 90L${x} ${y + 10}`} stroke="#5aa34a" strokeWidth="2.4" />
            <path d={`M${x - 8} ${y}c0 10 4 14 8 14s8-4 8-14l-4 4-4-6-4 6z`} fill={c} />
          </g>
        ))}
        <path d="M46 84h28l-6 22H52z" fill="var(--c3)" />
        <path className="cb22a-beat" d="M60 100s-6-4-6-8a3 3 0 0 1 6-1 3 3 0 0 1 6 1c0 4-6 8-6 8z" fill="var(--c1)" />
      </>
    ),
  },
  "ascension-day": {
    pal: ["#9FE7DC", "#FFC27A", "#2F6BFF"],
    fx: { g: ["spark", "dot"], k: "rise", n: 14 },
    art: () => (
      <>
        {fa22Rays(60, 34, 14, 40, 16, "var(--c2)")}
        <circle cx="60" cy="34" r="10" fill="var(--c2)" />
        <g className="fa22-float">
          <path d="M20 84a12 12 0 0 1 14-12 16 16 0 0 1 30-2 12 12 0 0 1 16 4 10 10 0 0 1 20 10z" fill="#fff" opacity=".95" />
        </g>
        <g className="fa22-float" style={{ animationDelay: "-1.5s" }}>
          <path d="M14 100a8 8 0 0 1 10-8 10 10 0 0 1 20 0 8 8 0 0 1 8 8z" fill="#fff" opacity=".7" />
        </g>
      </>
    ),
  },
  pentecost: {
    pal: ["#FFC27A", "#C8577E", "#9FE7DC"],
    fx: { g: ["ember", "spark"], k: "rise", n: 14 },
    art: () => (
      <>
        {[30, 50, 70, 90].map((x, i) => (
          <path key={i} className="cb22a-flame fa22-light" style={{ "--k": i }} d={`M${x} ${68 - (i % 2) * 8}c6 8 7 14 3 20h-6c-4-6-3-12 3-20z`} fill={i % 2 ? "var(--c2)" : "var(--c1)"} />
        ))}
        <g className="cb22a-glide">
          <path d="M40 36c8-3 18-3 26 1l16-4-6 8c4 4 2 10-4 11-14 3-26-4-32-16z" fill="#fff" />
          <path className="cb22a-wing" d="M54 34C51 22 58 12 72 8c-2 12-6 20-18 26z" fill="var(--c3)" />
        </g>
      </>
    ),
  },
  "memorial-day": {
    pal: ["#d2324a", "#2F6BFF", "#FFFFFF"],
    fx: { g: ["petal", "dot"], k: "fall", n: 10 },
    art: () => (
      <>
        {[30, 60, 90].map((x, i) => (
          <g key={i} className="cb22a-sway" style={{ animationDelay: -i * 0.8 + "s", transformBox: "view-box", transformOrigin: `${x}px 104px` }}>
            <path d={`M${x} 104V${54 + (i % 2) * 10}`} stroke="#3e8a3a" strokeWidth="2.4" />
            {fa22Petals(x, 50 + (i % 2) * 10, 7, 4, 7, 8, "var(--c1)", "")}
            <circle cx={x} cy={50 + (i % 2) * 10} r="4" fill="#111" />
          </g>
        ))}
      </>
    ),
  },
  "eid-al-adha": {
    pal: ["#0E9C88", "#D99A2B", "#9FE7DC"],
    fx: { g: ["star5", "dot"], k: "twinkle", n: 16 },
    art: () => (
      <>
        <g className="fa22-sunrise">
          <circle cx="60" cy="96" r="30" fill="var(--c2)" opacity=".75" />
          {fa22Rays(60, 96, 34, 46, 16, "var(--c2)")}
        </g>
        <rect x="22" y="40" width="9" height="66" fill="var(--c1)" />
        <rect x="89" y="40" width="9" height="66" fill="var(--c1)" />
        <path d="M22 40l4.5-10 4.5 10zM89 40l4.5-10 4.5 10z" fill="var(--c3)" />
        {fa22Dome(40, 80, 40, "var(--c1)")}
        <rect x="38" y="80" width="44" height="26" fill="var(--c1)" />
        <path className="cb22a-rock" d="M64 14a10 10 0 1 0 0 18 8 8 0 1 1 0-18z" fill="var(--c3)" />
      </>
    ),
  },
  "islamic-new-year": {
    pal: ["#9FE7DC", "#D99A2B", "#6D4AFF"],
    fx: { g: ["star5", "dot"], k: "twinkle", n: 18 },
    art: () => (
      <>
        <g className="fa22-sunrise">
          <path d="M60 30a30 30 0 1 0 0 60 24 24 0 1 1 0-60z" fill="var(--c2)" />
        </g>
        <rect x="70" y="20" width="34" height="40" rx="5" fill="#fff" />
        <rect x="70" y="20" width="34" height="11" rx="5" fill="var(--c3)" />
        <path className="fa22-page" d="M72 33h30v25H72z" fill="#f1f5f9" />
        <path d="M78 42h18M78 49h12" stroke="#94a3b8" strokeWidth="2" />
      </>
    ),
  },
  "dragon-boat": {
    pal: ["#0E9C88", "#d2324a", "#D99A2B"],
    fx: { g: ["drop", "dot"], k: "burst", n: 12 },
    art: () => (
      <>
        {fa22Water(76, "var(--c1)")}
        <g className="cb22a-bob">
          <path d="M16 70h84l-8 10H24z" fill="var(--c2)" />
          <path d="M100 70c6-10 2-20-6-22l2 8-6-2 6 10z" fill="var(--c3)" />
          <path d="M16 70c-4-4-4-8 0-10" stroke="var(--c3)" strokeWidth="3" fill="none" />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <circle cx={32 + i * 16} cy="62" r="4" fill="#fde68a" />
              <path className="fa22-row" style={{ transformBox: "view-box", transformOrigin: `${32 + i * 16}px 66px` }} d={`M${32 + i * 16} 66l-6 18`} stroke="#fde68a" strokeWidth="2.4" strokeLinecap="round" />
            </g>
          ))}
        </g>
      </>
    ),
  },
  muharram: {
    pal: ["#9FE7DC", "#94a3b8", "#2F6BFF"],
    fx: { g: ["dot", "smoke"], k: "drift", n: 8 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="50" r="30" fill="var(--c1)" opacity=".15" />
        <rect x="52" y="52" width="16" height="44" rx="3" fill="#e2e8f0" />
        <path className="cb22a-flame" d="M60 26c7 9 8 15 4 22-2 3-6 3-8 0-4-7-3-13 4-22z" fill="#fde68a" />
        <path d="M36 100h48" stroke="var(--c2)" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  "independence-day-usa": {
    pal: ["#2F6BFF", "#d2324a", "#FFFFFF"],
    fx: { g: ["burst", "star5"], k: "burst", n: 12 },
    art: () => (
      <>
        {fa22Flag(18, 52, 64, 40, ["#B22234", "#fff", "#B22234", "#fff", "#B22234"], <rect x="19" y="52" width="26" height="22" fill="#3C3B6E" />)}
        {[
          [88, 28, 14, "var(--c2)"],
          [100, 60, 10, "var(--c1)"],
        ].map(([x, y, r, c], i) => (
          <g key={i} className="cb22a-pop" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${x}px ${y}px` }}>
            {Array.from({ length: 10 }, (_, j) => {
              const a = (j * Math.PI) / 5;
              return <path key={j} d={`M${(x + r * 0.3 * Math.cos(a)).toFixed(1)} ${(y + r * 0.3 * Math.sin(a)).toFixed(1)}L${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}`} stroke={c} strokeWidth="2" strokeLinecap="round" />;
            })}
          </g>
        ))}
      </>
    ),
  },
  "bastille-day": {
    pal: ["#2F6BFF", "#FFFFFF", "#d2324a"],
    fx: { g: ["burst", "confetti"], k: "burst", n: 12 },
    art: () => (
      <>
        <path d="M60 10l4 20h-8zM54 30h12l4 26H50zM48 56h24l8 22H40zM40 78h40l10 26H72c-4-12-20-12-24 0H30z" fill="#e2e8f0" />
        <path d="M44 66h32M36 90h48" stroke="#0B1437" strokeWidth="1.5" opacity=".4" />
        {[
          [24, 28, "var(--c1)"],
          [96, 34, "var(--c3)"],
        ].map(([x, y, c], i) => (
          <g key={i} className="cb22a-pop" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${x}px ${y}px` }}>
            {Array.from({ length: 10 }, (_, j) => {
              const a = (j * Math.PI) / 5;
              return <path key={j} d={`M${(x + 4 * Math.cos(a)).toFixed(1)} ${(y + 4 * Math.sin(a)).toFixed(1)}L${(x + 13 * Math.cos(a)).toFixed(1)} ${(y + 13 * Math.sin(a)).toFixed(1)}`} stroke={c} strokeWidth="2" strokeLinecap="round" />;
            })}
          </g>
        ))}
      </>
    ),
  },
  "rath-yatra": {
    pal: ["#d2324a", "#FFC27A", "#D99A2B"],
    fx: { g: ["flower", "dot"], k: "fall", n: 12 },
    art: () => (
      <>
        <g className="fa22-float">
          <path d="M60 10l3 8h-6z" fill="var(--c2)" />
          <path d="M44 18h32l-6 16H50z" fill="var(--c1)" />
          <path d="M40 34h40l-4 18H44z" fill="var(--c2)" />
          <rect x="34" y="52" width="52" height="22" rx="3" fill="var(--c1)" />
          <path d="M34 60h52" stroke="var(--c3)" strokeWidth="2" />
          <path d="M60 10v-4l8 3-8 3" fill="var(--c3)" />
        </g>
        {[42, 78].map((x) => (
          <g key={x} className="fa22-roll" style={{ transformBox: "view-box", transformOrigin: `${x}px 86px` }}>
            <circle cx={x} cy="86" r="13" fill="none" stroke="var(--c3)" strokeWidth="3" />
            {Array.from({ length: 8 }, (_, i) => (
              <path key={i} d={`M${x} 86l${(13 * Math.cos((i * Math.PI) / 4)).toFixed(1)} ${(13 * Math.sin((i * Math.PI) / 4)).toFixed(1)}`} stroke="var(--c3)" strokeWidth="1.6" />
            ))}
          </g>
        ))}
      </>
    ),
  },
  "guru-purnima": {
    pal: ["#FFF2CF", "#D99A2B", "#2F6BFF"],
    fx: { g: ["spark", "dot"], k: "twinkle", n: 14 },
    art: () => (
      <>
        {fa22Moon(60, 40, 24)}
        <path d="M30 96c0-14 14-22 30-22s30 8 30 22z" fill="var(--c3)" opacity=".85" />
        <path d="M44 80c-4-10 6-16 16-16s20 6 16 16" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="2" />
        <path d="M40 92h40" stroke="var(--c2)" strokeWidth="3" />
        {fa22Diya(60, 92, 0.7, -1)}
      </>
    ),
  },
  onam: {
    pal: ["#FFC27A", "#C8577E", "#0E9C88"],
    fx: { g: ["flower", "petal"], k: "fall", n: 14 },
    art: () => (
      <>
        <circle cx="60" cy="60" r="46" fill="var(--c3)" opacity=".7" />
        {fa22Petals(60, 60, 34, 16, 5, 10, (i) => (i % 2 ? "var(--c1)" : "#fde68a"), "cb22a-spin-slow")}
        {fa22Petals(60, 60, 22, 12, 5, 8, "var(--c2)", "fa22-spin-rev")}
        {fa22Petals(60, 60, 11, 8, 4, 6, "#fff", "cb22a-spin-slow")}
        <circle cx="60" cy="60" r="5" fill="var(--c1)" />
      </>
    ),
  },
  "raksha-bandhan": {
    pal: ["#C8577E", "#FFC27A", "#D99A2B"],
    fx: { g: ["spark", "heart"], k: "rise", n: 12 },
    art: () => (
      <>
        <path className="fa22-thread" d="M6 64c20-6 34-6 54-4s34 2 54-4" stroke="var(--c1)" strokeWidth="3" fill="none" />
        <path d="M6 70c20-6 34-6 54-4s34 2 54-4" stroke="var(--c3)" strokeWidth="2" fill="none" />
        {fa22Petals(60, 62, 18, 12, 5, 10, (i) => (i % 2 ? "var(--c2)" : "var(--c1)"), "cb22a-spin-slow")}
        <circle cx="60" cy="62" r="11" fill="var(--c3)" />
        <circle className="cb22a-twinkle" cx="60" cy="62" r="5" fill="#fff" />
      </>
    ),
  },
  janmashtami: {
    pal: ["#2F6BFF", "#0E9C88", "#D99A2B"],
    fx: { g: ["note", "feather"], k: "drift", n: 12 },
    art: () => (
      <>
        <g className="cb22a-swing" style={{ transformBox: "view-box", transformOrigin: "84px 6px" }}>
          <path d="M84 6v20" stroke="var(--c3)" strokeWidth="1.4" />
          <path d="M72 30c0-6 24-6 24 0 4 16-4 22-12 22s-16-6-12-22z" fill="#c2410c" />
          <path d="M72 30h24" stroke="#fff" strokeWidth="3" />
        </g>
        <path d="M14 92L74 56" stroke="var(--c3)" strokeWidth="5" strokeLinecap="round" />
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={30 + i * 10} cy={82 - i * 6} r="1.6" fill="#0B1437" />
        ))}
        <g className="cb22a-sway" style={{ transformBox: "view-box", transformOrigin: "28px 104px" }}>
          <path d="M28 104C24 80 30 60 40 44" stroke="var(--c2)" strokeWidth="1.6" fill="none" />
          <ellipse cx="42" cy="40" rx="8" ry="12" fill="var(--c2)" transform="rotate(30 42 40)" />
          <ellipse cx="42" cy="40" rx="4" ry="6" fill="var(--c1)" transform="rotate(30 42 40)" />
          <circle cx="42" cy="40" r="2" fill="#0B1437" />
        </g>
      </>
    ),
  },
  "labor-day": {
    pal: ["#D99A2B", "#2F6BFF", "#9FE7DC"],
    fx: { g: ["spark", "dot"], k: "rise", n: 10 },
    art: () => (
      <>
        <path d="M26 66a34 30 0 0 1 68 0z" fill="var(--c1)" />
        <rect x="18" y="64" width="84" height="10" rx="4" fill="var(--c1)" />
        <path d="M60 36v28" stroke="#fff" strokeOpacity=".5" strokeWidth="4" />
        <g className="fa22-clash" style={{ transformBox: "view-box", transformOrigin: "40px 104px" }}>
          <path d="M40 104V80" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          <rect x="30" y="74" width="20" height="9" rx="2" fill="#cbd5e1" />
        </g>
        <g className="cb22a-spin" style={{ transformBox: "view-box", transformOrigin: "84px 92px" }}>
          <circle cx="84" cy="92" r="9" fill="none" stroke="var(--c2)" strokeWidth="4" strokeDasharray="4 3" />
        </g>
      </>
    ),
  },
  "rosh-hashanah": {
    pal: ["#D99A2B", "#9FE7DC", "#FFC27A"],
    fx: { g: ["note", "dot"], k: "drift", n: 10 },
    art: () => (
      <>
        <path d="M18 80c10 6 30 6 48-6 14-10 22-28 36-36l4 6c-12 8-18 26-34 38-18 12-40 12-54 4z" fill="var(--c3)" />
        <path d="M100 38l8 4" stroke="#7a5414" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <path key={i} className="cb22a-halo" style={{ animationDelay: i * 0.8 + "s" }} d={`M${10 - i * 0} ${66}a${10 + i * 6} ${14 + i * 6} 0 0 0 0 ${24}`} stroke="var(--c2)" strokeWidth="2" fill="none" />
        ))}
      </>
    ),
  },
  "rosh-hashanah-honey": {
    pal: ["#D99A2B", "#d2324a", "#FFC27A"],
    fx: { g: ["drop", "dot"], k: "fall", n: 10 },
    art: () => (
      <>
        <circle cx="44" cy="74" r="20" fill="var(--c2)" />
        <path d="M44 54c0-6 2-10 6-12" stroke="#5aa34a" strokeWidth="3" fill="none" />
        <ellipse cx="54" cy="44" rx="6" ry="3" fill="#5aa34a" />
        <rect x="68" y="54" width="30" height="40" rx="8" fill="var(--c1)" opacity=".9" />
        <rect x="70" y="48" width="26" height="8" rx="3" fill="#8a5a2b" />
        <path className="fa22-drip" d="M80 56c0 6 4 6 4 12 0 2-2 3-2 3s-2-1-2-3z" fill="var(--c3)" />
      </>
    ),
  },
  "ganesh-chaturthi": {
    pal: ["#FF8A3D", "#FFC27A", "#d2324a"],
    fx: { g: ["flower", "spark"], k: "fall", n: 14 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="56" r="42" fill="var(--c2)" opacity=".2" />
        <g className="fa22-ears" style={{ transformBox: "view-box", transformOrigin: "60px 56px" }}>
          <path d="M42 46c-18-6-26 8-22 22 4 12 18 12 24 4z" fill="var(--c1)" opacity=".85" />
          <path d="M78 46c18-6 26 8 22 22-4 12-18 12-24 4z" fill="var(--c1)" opacity=".85" />
        </g>
        <path d="M60 22l14 8v8H46v-8z" fill="var(--c3)" />
        <path d="M60 14l4 8h-8z" fill="var(--c2)" />
        <circle cx="60" cy="54" r="18" fill="var(--c1)" />
        <circle cx="53" cy="50" r="2" fill="#0B1437" />
        <circle cx="67" cy="50" r="2" fill="#0B1437" />
        <path d="M58 40h4" stroke="var(--c3)" strokeWidth="3" strokeLinecap="round" />
        <g className="fa22-trunk" style={{ transformBox: "view-box", transformOrigin: "60px 62px" }}>
          <path d="M60 60c-2 14 4 24 12 26 6 2 8-4 4-6-6-2-8-8-8-20z" fill="var(--c1)" />
        </g>
        <path d="M66 70l6 8" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        <path d="M34 98c4-8 48-8 52 0z" fill="var(--c3)" />
      </>
    ),
  },
  "vishwakarma-puja": {
    pal: ["#2F6BFF", "#D99A2B", "#9FE7DC"],
    fx: { g: ["spark", "bit"], k: "rise", n: 12 },
    art: () => (
      <>
        {[
          [44, 54, 22, 10, "cb22a-spin"],
          [80, 76, 15, 8, "fa22-spin-rev"],
        ].map(([x, y, r, n, cls], i) => (
          <g key={i} className={cls} style={{ transformBox: "view-box", transformOrigin: `${x}px ${y}px`, animationDuration: "8s" }}>
            <circle cx={x} cy={y} r={r} fill={i ? "var(--c3)" : "var(--c1)"} />
            {Array.from({ length: n }, (_, j) => (
              <rect key={j} x={x - 3.5} y={y - r - 6} width="7" height="8" rx="1.5" fill={i ? "var(--c3)" : "var(--c1)"} transform={`rotate(${(j * 360) / n} ${x} ${y})`} />
            ))}
            <circle cx={x} cy={y} r={r * 0.38} fill="#0B1437" />
          </g>
        ))}
        <g className="fa22-clash" style={{ transformBox: "view-box", transformOrigin: "96px 40px" }}>
          <path d="M96 40l-12-14" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          <rect x="74" y="14" width="18" height="10" rx="2" fill="var(--c2)" transform="rotate(-40 83 19)" />
        </g>
      </>
    ),
  },
  "anant-chaturdashi": {
    pal: ["#FF8A3D", "#9FE7DC", "#FFC27A"],
    fx: { g: ["flower", "drop"], k: "fall", n: 12 },
    art: () => (
      <>
        <g className="fa22-float" style={{ animationDuration: "3.6s" }}>
          <path d="M60 30l12 7v7H48v-7z" fill="var(--c3)" />
          <circle cx="60" cy="54" r="14" fill="var(--c1)" />
          <path d="M44 48c-10-2-14 6-10 14 4 6 10 4 12 0zM76 48c10-2 14 6 10 14-4 6-10 4-12 0z" fill="var(--c1)" opacity=".85" />
          <path d="M60 58c-2 10 2 16 8 18" stroke="var(--c1)" strokeWidth="6" fill="none" strokeLinecap="round" />
        </g>
        {fa22Water(70, "var(--c2)")}
      </>
    ),
  },
  "saudi-national-day": {
    pal: ["#0E9C88", "#FFFFFF", "#D99A2B"],
    fx: { g: ["confetti", "star5"], k: "fall", n: 14 },
    art: () => (
      <>
        <g className="cb22a-sway" style={{ transformBox: "view-box", transformOrigin: "60px 104px" }}>
          <path d="M60 104c-2-24 0-44 2-58" stroke="#8a5a2b" strokeWidth="6" fill="none" strokeLinecap="round" />
          {[-70, -35, 0, 35, 70, 110, -110].map((a, i) => (
            <path key={i} d="M62 46c-6-14-20-18-30-14 10 2 20 6 30 14z" fill="var(--c1)" transform={`rotate(${a} 62 46)`} />
          ))}
        </g>
        <path d="M24 92l72-24M96 92L24 68" stroke="var(--c2)" strokeWidth="2.4" opacity=".6" />
      </>
    ),
  },
  "mid-autumn": {
    pal: ["#FFF2CF", "#D99A2B", "#C8577E"],
    fx: { g: ["lamp", "dot"], k: "rise", n: 10 },
    art: () => (
      <>
        {fa22Moon(66, 40, 26)}
        <circle cx="40" cy="84" r="20" fill="var(--c2)" />
        <circle cx="40" cy="84" r="14" fill="none" stroke="#7a5414" strokeWidth="1.6" />
        {fa22Petals(40, 84, 17, 12, 3, 3, "#7a5414", "")}
        <path d="M40 76v16M32 84h16" stroke="#7a5414" strokeWidth="1.6" />
        <g className="fa22-float">
          <ellipse cx="92" cy="86" rx="9" ry="11" fill="var(--c3)" />
          <rect x="88" y="74" width="8" height="3" fill="var(--c2)" />
        </g>
      </>
    ),
  },
  "german-unity-day": {
    pal: ["#FFC27A", "#d2324a", "#111111"],
    fx: { g: ["confetti", "dot"], k: "fall", n: 16 },
    art: () => (
      <>
        <rect x="18" y="38" width="84" height="10" fill="#e2e8f0" />
        <rect x="16" y="32" width="88" height="7" fill="#cbd5e1" />
        {[22, 38, 54, 70, 86].map((x) => (
          <rect key={x} x={x} y="48" width="8" height="50" fill="#e2e8f0" />
        ))}
        <path d="M54 32l6-10 6 10z" fill="#cbd5e1" />
        <g className="cb22a-flag" style={{ transformOrigin: "0 50%" }}>
          <rect x="34" y="102" width="52" height="5" fill="#111" />
          <rect x="34" y="107" width="52" height="5" fill="#d2324a" />
          <rect x="34" y="112" width="52" height="5" fill="#FFC27A" />
        </g>
      </>
    ),
  },
  "sharad-navratri": {
    pal: ["#C8577E", "#FFC27A", "#6D4AFF"],
    fx: { g: ["spark", "flower"], k: "twinkle", n: 14 },
    art: () => (
      <>
        <g className="fa22-clash" style={{ transformBox: "view-box", transformOrigin: "40px 104px" }}>
          <path d="M40 104L58 34" stroke="var(--c1)" strokeWidth="6" strokeLinecap="round" />
          <path d="M44 88l4-14M50 64l4-14" stroke="#fde68a" strokeWidth="6" />
        </g>
        <g className="fa22-clash fa22-clash--r" style={{ transformBox: "view-box", transformOrigin: "80px 104px" }}>
          <path d="M80 104L62 34" stroke="var(--c3)" strokeWidth="6" strokeLinecap="round" />
          <path d="M76 88l-4-14M70 64l-4-14" stroke="#fde68a" strokeWidth="6" />
        </g>
        <circle className="cb22a-twinkle" cx="60" cy="30" r="6" fill="#fff" />
      </>
    ),
  },
  "durga-puja": {
    pal: ["#d2324a", "#FFC27A", "#D99A2B"],
    fx: { g: ["smoke", "ember"], k: "rise", n: 12 },
    art: () => (
      <>
        <path className="cb22a-breathe" d="M18 52c16-22 68-22 84 0-16 22-68 22-84 0z" fill="#fff" />
        <circle cx="60" cy="52" r="14" fill="var(--c1)" />
        <circle cx="60" cy="52" r="7" fill="#111" />
        <circle cx="64" cy="48" r="2.5" fill="#fff" />
        <path d="M54 30c2-6 10-6 12 0-2 4-10 4-12 0z" fill="var(--c1)" />
        <path d="M18 52c16-22 68-22 84 0" stroke="#111" strokeWidth="3" fill="none" />
        <circle cx="60" cy="88" r="6" fill="var(--c1)" />
        <path d="M30 96h60" stroke="var(--c3)" strokeWidth="3" strokeLinecap="round" />
      </>
    ),
  },
  "durga-puja-dhak": {
    pal: ["#d2324a", "#FFFFFF", "#D99A2B"],
    fx: { g: ["feather", "dot"], k: "sway", n: 10 },
    art: () => (
      <>
        <g className="fa22-shake" style={{ transformBox: "view-box", transformOrigin: "60px 70px" }}>
          <ellipse cx="60" cy="70" rx="28" ry="22" fill="var(--c3)" />
          <ellipse cx="34" cy="70" rx="6" ry="22" fill="#f8fafc" />
          <ellipse cx="86" cy="70" rx="6" ry="22" fill="#f8fafc" />
          <path d="M36 52l48 36M36 88l48-36" stroke="#7a5414" strokeWidth="1.4" />
        </g>
        {[44, 60, 76].map((x, i) => (
          <g key={x} className="cb22a-sway" style={{ animationDelay: -i * 0.5 + "s", transformBox: "view-box", transformOrigin: `${x}px 48px` }}>
            <path d={`M${x} 48V24`} stroke="#cbd5e1" strokeWidth="1.4" />
            <ellipse cx={x} cy="20" rx="5" ry="12" fill="#fff" />
          </g>
        ))}
      </>
    ),
  },
  "durga-ashtami": {
    pal: ["#FFFFFF", "#C8577E", "#D99A2B"],
    fx: { g: ["flower", "spark"], k: "fall", n: 12 },
    art: () => (
      <>
        <path d="M40 74c-6-22 6-44 26-46 16 0 24 12 20 26-4 12-16 20-28 30-6 6-14 4-18-10z" fill="#f8fafc" />
        <path d="M58 40c8 0 14 6 12 14M48 54c6-4 14-2 18 4" stroke="var(--c2)" strokeWidth="2.4" fill="none" />
        <path d="M44 82l-8 14 12-6z" fill="#f8fafc" />
        {[0, 1, 2].map((i) => (
          <path key={i} className="cb22a-halo" style={{ animationDelay: i * 0.9 + "s" }} d="M88 40a14 14 0 0 1 0 28" stroke="var(--c3)" strokeWidth="2.4" fill="none" />
        ))}
      </>
    ),
  },
  dussehra: {
    pal: ["#FFC27A", "#d2324a", "#D99A2B"],
    fx: { g: ["ember", "spark"], k: "rise", n: 18 },
    art: () => (
      <>
        <path d="M80 32l8-8 8 8-2 10h-12z" fill="var(--c3)" />
        <rect x="80" y="42" width="16" height="44" rx="3" fill="var(--c2)" />
        <path d="M80 54h-8M96 54h8M84 86v14M92 86v14" stroke="var(--c2)" strokeWidth="5" strokeLinecap="round" />
        <g className="cb22a-flame" style={{ transformOrigin: "50% 100%" }}>
          <path d="M88 40c10 10 12 22 6 34H82c-6-12-4-24 6-34z" fill="var(--c1)" opacity=".85" />
        </g>
        <path d="M16 30c18 10 18 50 0 60" fill="none" stroke="var(--c3)" strokeWidth="4" strokeLinecap="round" />
        <g className="fa22-shoot">
          <path d="M16 60h50" stroke="#fff" strokeWidth="2" />
          <path d="M66 60l-8-4v8z" fill="var(--c1)" />
          <circle cx="68" cy="60" r="3" fill="var(--c1)" />
        </g>
      </>
    ),
  },
  "thanksgiving-canada": {
    pal: ["#d2324a", "#FFC27A", "#D99A2B"],
    fx: { g: ["maple", "leaf"], k: "fall", n: 14 },
    art: () => (
      <g className="cb22a-sway" style={{ transformBox: "view-box", transformOrigin: "60px 104px" }}>
        <path d="M60 14l8 16 12-5-4 18 16-2-6 12 10 8-18 4 2 16-20-12-20 12 2-16-18-4 10-8-6-12 16 2-4-18 12 5z" fill="var(--c1)" />
        <path d="M60 50v54" stroke="var(--c1)" strokeWidth="4" strokeLinecap="round" />
      </g>
    ),
  },
  "sharad-purnima": {
    pal: ["#FFF2CF", "#9FE7DC", "#D99A2B"],
    fx: { g: ["spark", "dot"], k: "twinkle", n: 16 },
    art: () => (
      <>
        {fa22Moon(60, 36, 24)}
        {[0, 1, 2].map((i) => (
          <path key={i} className="fa22-beam" style={{ "--k": i }} d={`M${54 + i * 6} 60L${44 + i * 16} 84`} stroke="var(--c1)" strokeWidth="2" opacity=".6" />
        ))}
        <path d="M34 86c0 16 52 16 52 0z" fill="var(--c2)" />
        <ellipse cx="60" cy="86" rx="26" ry="5" fill="#fff8e6" />
        <path className="cb22a-twinkle" d="M58 84h4" stroke="var(--c3)" strokeWidth="3" />
      </>
    ),
  },
  "valmiki-jayanti": {
    pal: ["#FFC27A", "#D99A2B", "#2F6BFF"],
    fx: { g: ["letter", "spark"], k: "drift", n: 10 },
    art: () => (
      <>
        <rect x="24" y="40" width="64" height="58" rx="4" fill="#fdf4e3" />
        <rect x="18" y="34" width="10" height="70" rx="5" fill="var(--c2)" />
        <rect x="84" y="34" width="10" height="70" rx="5" fill="var(--c2)" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} className="fa22-light" style={{ "--k": i }} d={`M34 ${54 + i * 10}h${40 - i * 6}`} stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        ))}
        <g className="fa22-write">
          <path d="M64 86L98 22c4 6 2 14-4 20z" fill="var(--c1)" />
          <path d="M64 86l4-10" stroke="#0B1437" strokeWidth="2" />
        </g>
      </>
    ),
  },
  "karwa-chauth": {
    pal: ["#FFF2CF", "#C8577E", "#D99A2B"],
    fx: { g: ["star5", "dot"], k: "twinkle", n: 16 },
    art: () => (
      <>
        {fa22Moon(60, 46, 18)}
        <circle cx="60" cy="46" r="30" fill="none" stroke="var(--c3)" strokeWidth="4" />
        {Array.from({ length: 7 }, (_, i) =>
          Array.from({ length: 7 }, (_, j) => (Math.hypot(i - 3, j - 3) < 3.4 ? <circle key={i + "-" + j} cx={42 + i * 6} cy={28 + j * 6} r=".9" fill="#7a5414" opacity=".5" /> : null))
        )}
        <path d="M30 46h-8" stroke="var(--c3)" strokeWidth="4" strokeLinecap="round" />
        {fa22Diya(60, 96, 0.9, -1)}
      </>
    ),
  },
  "ahoi-ashtami": {
    pal: ["#9FE7DC", "#FFC27A", "#C8577E"],
    fx: { g: ["star5", "dot"], k: "twinkle", n: 20 },
    art: () => (
      <>
        {[
          [30, 30],
          [52, 22],
          [74, 34],
          [92, 24],
          [62, 48],
        ].map(([x, y], i) => (
          <path key={i} className="fa22-light" style={{ "--k": i }} d={`M${x} ${y - 6}l1.8 4.2 4.2 1.8-4.2 1.8-1.8 4.2-1.8-4.2-4.2-1.8 4.2-1.8z`} fill="#fff" />
        ))}
        <path d="M30 30L52 22 74 34 92 24M74 34L62 48" stroke="#fff" strokeOpacity=".3" strokeWidth="1" />
        <path d="M44 74c-4 22 36 22 32 0z" fill="var(--c3)" />
        <rect x="46" y="66" width="28" height="8" rx="3" fill="var(--c2)" />
        <circle className="cb22a-breathe" cx="60" cy="86" r="5" fill="var(--c2)" />
      </>
    ),
  },
  "dia-de-muertos": {
    pal: ["#FF8A3D", "#C8577E", "#6D4AFF"],
    fx: { g: ["flower", "dot"], k: "fall", n: 14 },
    art: () => (
      <>
        <path d="M8 18h104" stroke="#fff" strokeOpacity=".5" />
        {["var(--c1)", "var(--c2)", "var(--c3)", "#9FE7DC", "var(--c1)"].map((c, i) => (
          <path key={i} className="cb22a-swing" style={{ "--k": i }} d={`M${12 + i * 20} 18h18v16l-3-3-3 3-3-3-3 3-3-3-3 3z`} fill={c} />
        ))}
        {[36, 60, 84].map((x, i) => (
          <g key={x}>
            {fa22Petals(x, 76 - (i % 2) * 6, 7, 10, 3.5, 7, "var(--c1)", i % 2 ? "fa22-spin-rev" : "cb22a-spin-slow")}
            <circle cx={x} cy={76 - (i % 2) * 6} r="4" fill="#c2410c" />
          </g>
        ))}
        <rect x="56" y="94" width="8" height="12" rx="2" fill="#fff3d6" />
      </>
    ),
  },
  "chhath-puja": {
    pal: ["#FF8A3D", "#FFC27A", "#2F6BFF"],
    fx: { g: ["dot", "spark"], k: "drift", n: 10 },
    art: () => (
      <>
        <g className="fa22-sunrise">
          <circle cx="60" cy="64" r="22" fill="var(--c1)" />
          {fa22Rays(60, 64, 26, 36, 14, "var(--c2)")}
        </g>
        {fa22Water(70, "var(--c3)")}
        <g className="cb22a-bob">
          <path d="M36 74h48l-6 12H42z" fill="#d6a85c" />
          <circle cx="50" cy="72" r="4" fill="var(--c2)" />
          <circle cx="62" cy="71" r="4" fill="#5aa34a" />
          <circle cx="72" cy="72" r="4" fill="var(--c1)" />
        </g>
      </>
    ),
  },
  "guru-nanak-jayanti": {
    pal: ["#FFC27A", "#2F6BFF", "#D99A2B"],
    fx: { g: ["spark", "ember"], k: "rise", n: 12 },
    art: () => (
      <>
        <circle className="cb22a-glow" cx="60" cy="56" r="40" fill="var(--c1)" opacity=".2" />
        <g className="fa22-breath">
          <path d="M60 16l5 8-2 52h-6l-2-52z" fill="var(--c2)" />
          <circle cx="60" cy="56" r="16" fill="none" stroke="var(--c2)" strokeWidth="5" />
          <path d="M40 40c-14 12-10 34 8 44M80 40c14 12 10 34-8 44" stroke="var(--c2)" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
        {[0, 1, 2, 3].map((i) => fa22Diya(30 + i * 20, 104, 0.5, i))}
      </>
    ),
  },
  "orthodox-christmas": {
    pal: ["#D99A2B", "#9FE7DC", "#2F6BFF"],
    fx: { g: ["snow", "dot"], k: "fall", n: 20 },
    art: () => (
      <>
        <path className="cb22a-twinkle" d="M60 6l3 10 10 3-10 3-3 10-3-10-10-3 10-3z" fill="var(--c1)" />
        {fa22Rays(60, 19, 10, 22, 8, "var(--c1)", "cb22a-spin-slow")}
        {[
          [30, 18],
          [60, 26],
          [90, 18],
        ].map(([x, w], i) => (
          <g key={i}>
            <path d={`M${x - w / 2} ${74 - (i === 1 ? 12 : 0)}c0-12 ${w / 2}-14 ${w / 2}-22 0 8 ${w / 2} 10 ${w / 2} 22z`} fill={i === 1 ? "var(--c1)" : "var(--c3)"} />
            <rect x={x - w / 2} y={74 - (i === 1 ? 12 : 0)} width={w} height={34 + (i === 1 ? 12 : 0)} fill="#e2e8f0" />
          </g>
        ))}
        <rect x="56" y="88" width="8" height="20" rx="4" fill="#0B1437" />
      </>
    ),
  },
  christmas: {
    pal: ["#0E9C88", "#D99A2B", "#C8577E"],
    fx: { g: ["snow", "dot"], k: "fall", n: 22 },
    art: () => (
      <>
        <path d="M60 22L84 56H72L92 84H28l20-28H36z" fill="var(--c1)" />
        <rect x="54" y="84" width="12" height="12" rx="2" fill="#8a5a2b" />
        {[
          [52, 48, "var(--c3)"],
          [68, 62, "var(--c2)"],
          [46, 72, "var(--c2)"],
          [74, 78, "var(--c3)"],
          [60, 66, "#fff"],
        ].map(([x, y, c], i) => (
          <circle key={i} className="cb22a-blink" style={{ "--k": i }} cx={x} cy={y} r="3.4" fill={c} />
        ))}
        <path className="cb22a-twinkle cb22a-spin" d="M60 8l3.5 8.5 9 1-7 5.5 2.5 8.5L60 26l-8 5.5 2.5-8.5-7-5.5 9-1z" fill="var(--c2)" />
        <rect x="80" y="86" width="16" height="12" rx="2" fill="var(--c3)" className="cb22a-hop" />
      </>
    ),
  },
  "boxing-day": {
    pal: ["#C8577E", "#D99A2B", "#9FE7DC"],
    fx: { g: ["gift", "confetti"], k: "fall", n: 12 },
    art: () => (
      <>
        <rect x="24" y="64" width="34" height="34" rx="3" fill="var(--c1)" />
        <path d="M41 64v34M24 80h34" stroke="var(--c2)" strokeWidth="4" />
        <rect x="64" y="72" width="30" height="26" rx="3" fill="var(--c3)" />
        <path d="M79 72v26" stroke="var(--c1)" strokeWidth="4" />
        <g className="fa22-lid" style={{ transformBox: "view-box", transformOrigin: "62px 68px" }}>
          <rect x="62" y="62" width="34" height="9" rx="2" fill="var(--c3)" />
          <path d="M79 62c-6-10-14-6-10 0M79 62c6-10 14-6 10 0" stroke="var(--c1)" strokeWidth="3" fill="none" />
        </g>
        <circle className="cb22a-twinkle" cx="80" cy="54" r="5" fill="#fff" />
      </>
    ),
  },
  "new-years-day": {
    pal: ["#D99A2B", "#C8577E", "#9FE7DC"],
    fx: { g: ["confetti", "star5"], k: "fall", n: 20 },
    art: () => (
      <>
        <text x="60" y="72" textAnchor="middle" fontSize="34" fontWeight="900" fill="var(--c1)" fontFamily="system-ui,sans-serif" className="fa22-breath">
          {new Date().getFullYear() > 2026 ? new Date().getFullYear() : 2026}
        </text>
        {[
          [24, 30, "var(--c2)"],
          [96, 28, "var(--c3)"],
          [60, 96, "var(--c1)"],
        ].map(([x, y, c], i) => (
          <g key={i} className="cb22a-pop" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${x}px ${y}px` }}>
            {Array.from({ length: 8 }, (_, j) => {
              const a = (j * Math.PI) / 4;
              return <path key={j} d={`M${(x + 3 * Math.cos(a)).toFixed(1)} ${(y + 3 * Math.sin(a)).toFixed(1)}L${(x + 11 * Math.cos(a)).toFixed(1)} ${(y + 11 * Math.sin(a)).toFixed(1)}`} stroke={c} strokeWidth="2" strokeLinecap="round" />;
            })}
          </g>
        ))}
      </>
    ),
  },
  "new-years-eve": {
    pal: ["#D99A2B", "#9FE7DC", "#6D4AFF"],
    fx: { g: ["bubble", "spark"], k: "rise", n: 16 },
    art: () => (
      <>
        <circle cx="60" cy="56" r="36" fill="#f8fafc" />
        <circle cx="60" cy="56" r="36" fill="none" stroke="var(--c1)" strokeWidth="4" />
        {Array.from({ length: 12 }, (_, i) => (
          <path key={i} d={`M${(60 + 30 * Math.cos((i * Math.PI) / 6)).toFixed(1)} ${(56 + 30 * Math.sin((i * Math.PI) / 6)).toFixed(1)}L${(60 + 34 * Math.cos((i * Math.PI) / 6)).toFixed(1)} ${(56 + 34 * Math.sin((i * Math.PI) / 6)).toFixed(1)}`} stroke="#0B1437" strokeWidth={i % 3 ? 1.2 : 2.6} />
        ))}
        <path d="M60 56V32" stroke="#0B1437" strokeWidth="4" strokeLinecap="round" />
        <g className="fa22-tick" style={{ transformBox: "view-box", transformOrigin: "60px 56px" }}>
          <path d="M60 56V26" stroke="var(--c3)" strokeWidth="2" strokeLinecap="round" />
        </g>
        <circle cx="60" cy="56" r="3.5" fill="var(--c1)" />
      </>
    ),
  },
  halloween: {
    pal: ["#FFC27A", "#6D4AFF", "#D99A2B"],
    fx: { g: ["bat", "dot"], k: "fly", n: 9 },
    art: () => (
      <>
        <path d="M60 30c-2-6 0-10 6-12" stroke="#0E9C88" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="44" cy="64" rx="18" ry="30" fill="var(--c1)" />
        <ellipse cx="76" cy="64" rx="18" ry="30" fill="var(--c1)" />
        <ellipse cx="60" cy="64" rx="18" ry="32" fill="var(--c3)" />
        <g className="cb22a-blink">
          <path d="M44 56l8-8 8 8zM68 56l8-8 8 8z" fill="#3a1f00" />
          <path d="M40 74c10 10 30 10 40 0l-6 2-4-4-4 4-4-4-4 4-4-4-4 4z" fill="#3a1f00" />
        </g>
      </>
    ),
  },
  "valentines-day": {
    pal: ["#C8577E", "#FFC27A", "#6D4AFF"],
    fx: { g: ["heart", "dot"], k: "rise", n: 16 },
    art: () => (
      <>
        <path className="cb22a-beat" d="M60 96S22 72 22 46a19 19 0 0 1 38-6 19 19 0 0 1 38 6c0 26-38 50-38 50z" fill="var(--c1)" />
        <g className="fa22-shoot" style={{ animationDuration: "2.4s" }}>
          <path d="M10 70l100-36" stroke="var(--c2)" strokeWidth="2.4" />
          <path d="M110 34l-10 0 4 8z" fill="var(--c2)" />
          <path d="M10 70l6-8M10 70l8 2" stroke="var(--c2)" strokeWidth="2" />
        </g>
      </>
    ),
  },
};

/* national days and Tsunami Day get their own scenes too */
Object.assign(CB22_FEST, {
  "republic-day": { pal: ["#FF9933", "#FFFFFF", "#138808"], fx: { g: ["confetti", "petal"], k: "fall", n: 20 }, art: () => CB22_ART.tricolour() },
  "independence-day-india": {
    pal: ["#FF9933", "#FFFFFF", "#138808"],
    fx: { g: ["kite", "confetti"], k: "sway", n: 12 },
    art: () => (
      <>
        {[
          [36, 30, "#FF9933", 0],
          [84, 22, "#138808", 1],
          [64, 56, "#FFFFFF", 2],
        ].map(([x, y, c, i]) => (
          <g key={i} className="cb22a-sway" style={{ animationDelay: -i * 0.9 + "s", transformBox: "view-box", transformOrigin: `${x}px ${y + 40}px` }}>
            <path d={`M${x} ${y - 14}l12 14-12 16-12-16z`} fill={c} />
            <circle cx={x} cy={y} r="3" fill="#000080" />
            <path d={`M${x} ${y + 16}c-3 6 3 10 0 16`} stroke={c} strokeWidth="1.4" fill="none" />
            <path d={`M${x} ${y + 16}L${60 + i * 6} 112`} stroke="#fff" strokeOpacity=".35" strokeWidth=".8" />
          </g>
        ))}
      </>
    ),
  },
  "tsunami-day": { pal: ["#9FE7DC", "#2F6BFF", "#0E9C88"], fx: { g: ["wave", "dot"], k: "drift", n: 14 }, art: () => CB22_ART.waves() },
});

/* ── the other days: each has its own subject icon (ev.icon = [main, accent]) and its own mix (ev.anim) ── */
const CB22_PALS = [
  ["#2F6BFF", "#9FE7DC", "#6D4AFF"],
  ["#0E9C88", "#9FE7DC", "#D99A2B"],
  ["#C8577E", "#FFC27A", "#6D4AFF"],
  ["#D99A2B", "#FFC27A", "#0E9C88"],
  ["#6D4AFF", "#C8577E", "#9FE7DC"],
  ["#9FE7DC", "#2F6BFF", "#FFC27A"],
  ["#FFC27A", "#C8577E", "#2F6BFF"],
  ["#2F6BFF", "#D99A2B", "#C8577E"],
];
const CB22_FXK = ["rise", "fall", "drift", "twinkle", "burst", "fly", "sway"];
const CB22_MOVES = ["float", "swing", "beat", "flip", "bounce", "wobble", "tilt", "zoom", "orbit", "shake", "drift", "rock"];
const CB22_BACKS = ["rays", "ripples", "orbits", "hex", "burst", "petals", "radar", "pixels", "lines", "spiral"];
const fa22VB = { transformBox: "view-box", transformOrigin: "60px 60px" };
function CB22_Back({ k }) {
  switch (k) {
    case "rays":
      return fa22Rays(60, 60, 20, 56, 18, "var(--c2)");
    case "ripples":
      return (
        <>
          {[0, 1, 2].map((i) => (
            <circle key={i} className="cb22a-halo" style={{ animationDelay: i * 0.95 + "s" }} cx="60" cy="60" r="40" fill="none" stroke="var(--c2)" strokeWidth="2" />
          ))}
        </>
      );
    case "orbits":
      return (
        <>
          <g className="cb22a-spin-slow" style={fa22VB}>
            <ellipse cx="60" cy="60" rx="48" ry="20" fill="none" stroke="var(--c2)" strokeOpacity=".55" strokeDasharray="3 5" transform="rotate(-25 60 60)" />
            <circle cx="104" cy="40" r="3.5" fill="var(--c2)" />
          </g>
          <g className="fa22-spin-rev" style={{ ...fa22VB, animationDuration: "18s" }}>
            <ellipse cx="60" cy="60" rx="20" ry="48" fill="none" stroke="var(--c3)" strokeOpacity=".5" strokeDasharray="2 6" transform="rotate(30 60 60)" />
            <circle cx="70" cy="14" r="3" fill="var(--c3)" />
          </g>
        </>
      );
    case "hex":
      return (
        <>
          {Array.from({ length: 30 }, (_, i) => {
            const c = i % 6,
              r = Math.floor(i / 6),
              x = 16 + c * 18 + (r % 2) * 9,
              y = 18 + r * 16;
            return <path key={i} className="fa22-light" style={{ "--k": (i * 7) % 10 }} d={`M${x} ${y - 7}l6 3.5v7l-6 3.5-6-3.5v-7z`} fill="none" stroke="var(--c2)" strokeOpacity=".55" strokeWidth="1" />;
          })}
        </>
      );
    case "burst":
      return (
        <g className="fa22-rays" style={{ ...fa22VB, animationDuration: "40s" }}>
          {Array.from({ length: 16 }, (_, i) => (
            <path key={i} d="M60 60L56 6h8z" fill={i % 2 ? "var(--c2)" : "var(--c3)"} opacity=".22" transform={`rotate(${i * 22.5} 60 60)`} />
          ))}
        </g>
      );
    case "petals":
      return fa22Petals(60, 60, 40, 14, 5, 11, (i) => (i % 2 ? "var(--c2)" : "var(--c3)"), "cb22a-spin-slow");
    case "radar":
      return (
        <>
          {[16, 30, 44].map((r) => (
            <circle key={r} cx="60" cy="60" r={r} fill="none" stroke="var(--c2)" strokeOpacity=".4" />
          ))}
          <g className="cb22a-spin" style={{ ...fa22VB, animationDuration: "4s" }}>
            <path d="M60 60L60 14A46 46 0 0 1 98 34z" fill="var(--c2)" opacity=".28" />
          </g>
        </>
      );
    case "pixels":
      return (
        <>
          {Array.from({ length: 36 }, (_, i) => (
            <rect key={i} className="fa22-light" style={{ "--k": (i * 5) % 9 }} x={15 + (i % 6) * 16} y={15 + Math.floor(i / 6) * 16} width="9" height="9" rx="2" fill={i % 3 ? "var(--c2)" : "var(--c3)"} opacity=".4" />
          ))}
        </>
      );
    case "lines":
      return (
        <g className="fa22-slide">
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M${-40 + i * 14} 120L${0 + i * 14} 0`} stroke={i % 2 ? "var(--c2)" : "var(--c3)"} strokeOpacity=".35" strokeWidth="3" />
          ))}
        </g>
      );
    default:
      return (
        <g className="cb22a-spin-slow" style={fa22VB}>
          {Array.from({ length: 26 }, (_, i) => {
            const a = i * 0.62,
              r = 8 + i * 1.7;
            return <circle key={i} cx={(60 + r * Math.cos(a)).toFixed(1)} cy={(60 + r * Math.sin(a)).toFixed(1)} r={1.2 + i * 0.07} fill={i % 2 ? "var(--c2)" : "var(--c3)"} opacity=".6" />;
          })}
        </g>
      );
  }
}
function CB22_IconArt({ ev }) {
  const a = ev.anim || {};
  const mv = CB22_MOVES[(a.move || 0) % CB22_MOVES.length];
  const bk = CB22_BACKS[(a.back || 0) % CB22_BACKS.length];
  const acc = ev.icon[1] && CB22_ICONS[ev.icon[1]] ? ev.icon[1] : null;
  const rev = ((a.move || 0) + (a.back || 0)) % 2;
  return (
    <>
      <clipPath id="cb22-ic">
        <circle cx="60" cy="60" r="52" />
      </clipPath>
      <g clipPath="url(#cb22-ic)">
        <CB22_Back k={bk} />
      </g>
      <circle className="cb22a-glow" cx="60" cy="60" r="30" fill="var(--c1)" opacity=".22" />
      <g className={"fa22m fa22m--" + mv}>
        <g transform="translate(29 29) scale(2.6)" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="var(--c1)" strokeWidth="3.6" opacity=".5" style={{ color: "var(--c1)" }}>
            {cb22IconNodes(ev.icon[0])}
          </g>
          <g stroke="#fff" strokeWidth="1.7" style={{ color: "#fff" }}>
            {cb22IconNodes(ev.icon[0])}
          </g>
        </g>
      </g>
      {acc ? (
        <g className={"fa22-orbit" + (rev ? " fa22-orbit--r" : "")} style={fa22VB}>
          <circle cx="60" cy="9" r="11" fill="var(--c3)" stroke="#0B1437" strokeOpacity=".4" />
          <g transform="translate(52.5 1.5) scale(.625)" fill="none" stroke="#0B1437" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#0B1437" }}>
            {cb22IconNodes(acc)}
          </g>
        </g>
      ) : null}
    </>
  );
}

export { CB22_FEST, CB22_FXK, CB22_IconArt, CB22_PALS };
