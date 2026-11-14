/*
 * Blog covers (build 51) — FRB_Cover replaces the shared dark-blue cover template (BV_Cover) for every post that has
 * no real photograph (post.image still wins). Each cover is generated from the post itself, so it is unique and
 * needs no image files:
 *   palette  ← the post's service world (FRK_V) with a per-post hue shift; ~40% of posts use a light scheme
 *   motif    ← the post's service (code window, phone, shield, cloud, funnel, chat, play, envelope, search, coins,
 *              donut, globe, people, gears), seeded by the slug so values and positions differ per post
 *   headline ← the post's primary keyword (falls back to the title)
 * Animations are CSS-only, run while the cover is on screen and stop for prefers-reduced-motion.
 * Prefix FRB_. Styles: src/styles/blog-cover.css (frb-).
 */
import * as ee from 'react';
import { FRK_EMBLEM_SM, frkHash, frkV } from './FrKit.jsx';

const FRB_MOTIF_RULES = [
  [/cyber|security/, "shield"],
  [/cloud|devops/, "cloud"],
  [/mobile-app/, "phone"],
  [/testing|qa|website|software|web-app|api|saas|ecommerce-dev|maintenance|ui-ux/, "code"],
  [/ai-|automation|erp|crm|business-app/, "gears"],
  [/analytics|dashboard|reporting|audit|data-/, "donut"],
  [/it-consult/, "gears"],
  [/account|tax|gst|tds|payroll|invest|cfo|financ|book|itr/, "coins"],
  [/lead|performance|landing|cro|consult/, "funnel"],
  [/social|whatsapp|influencer|reputation/, "chat"],
  [/video/, "play"],
  [/email/, "mail"],
  [/seo|google-ads|ppc|content/, "search"],
  [/healthcare|consumer|b2b|panel|qualitative|cati|offline/, "people"],
];
function frbMotif(post) {
  const key = (post.service || "") + " " + post.slug;
  const hit = FRB_MOTIF_RULES.find(([re]) => re.test(key));
  if (hit) return hit[1];
  return { "market-research": "globe", "digital-marketing": "funnel", "it-development": "code", "accounts-finance": "coins" }[post.vertical] || "globe";
}
function frbRng(seed) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s ^ (s >>> 15), 2246822507) + 0x9e3779b9) >>> 0;
    s ^= s >>> 13;
    return (s >>> 0) / 4294967296;
  };
}
const frbCap = (s) => (s || "").replace(/^./, (c) => c.toUpperCase());
function frbWrap(s, n) {
  const out = [];
  let cur = "";
  (s || "").split(/\s+/).forEach((w) => {
    if ((cur + " " + w).trim().length > n && cur) {
      out.push(cur);
      cur = w;
    } else cur = (cur + " " + w).trim();
  });
  if (cur) out.push(cur);
  return out;
}
/* each motif draws inside a 460×420 box */
function FRB_Motif({ m, r, c1, c2, ink, panel }) {
  const vals = Array.from({ length: 7 }, () => 0.25 + r() * 0.75);
  if (m === "code") {
    const lines = Array.from({ length: 7 }, () => [20 + Math.floor(r() * 3) * 22, 80 + r() * 220]);
    return (
      <g>
        <rect className="frb-float" x="20" y="40" width="420" height="300" rx="22" fill={panel} stroke={c2} strokeOpacity=".35" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={50 + i * 22} cy="70" r="7" fill={["#FF6B6B", "#FFC24A", "#2EE6A6"][i]} />
        ))}
        {lines.map(([x, w], i) => (
          <rect key={i} className="frb-type" style={{ "--d": i * 0.35 + "s", "--w": w + "px" }} x={50 + x} y={104 + i * 30} width={w} height="12" rx="6" fill={i % 3 === 0 ? c2 : i % 3 === 1 ? c1 : ink} opacity={i % 3 === 2 ? 0.35 : 0.9} />
        ))}
        <rect className="frb-blink" x={50 + lines[6][0] + lines[6][1] + 8} y="284" width="10" height="16" fill={c2} />
        <g className="frb-bob" transform="translate(330 270)">
          <rect width="120" height="90" rx="18" fill={c1} />
          <path d="M38 34l-14 12 14 12M82 34l14 12-14 12M66 28l-12 36" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
    );
  }
  if (m === "phone") {
    return (
      <g>
        <rect className="frb-float" x="150" y="20" width="190" height="380" rx="34" fill={panel} stroke={c2} strokeOpacity=".5" strokeWidth="3" />
        <rect x="215" y="36" width="60" height="10" rx="5" fill={ink} opacity=".3" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={i} className="frb-pop" style={{ "--d": i * 0.15 + "s" }} x={172 + (i % 2) * 76} y={70 + Math.floor(i / 2) * 82} width="66" height="66" rx="16" fill={i % 2 ? c1 : c2} opacity={0.5 + vals[i] * 0.5} />
        ))}
        <rect x="172" y="320" width="146" height="54" rx="16" fill={c1} />
        <circle className="frb-pulse" cx="70" cy="140" r="34" fill={c2} opacity=".85" />
        <circle className="frb-pulse" style={{ "--d": "1s" }} cx="410" cy="300" r="24" fill={c1} opacity=".85" />
      </g>
    );
  }
  if (m === "shield") {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <circle key={i} className="frb-ripple" style={{ "--d": i * 1.2 + "s" }} cx="230" cy="210" r="120" fill="none" stroke={c2} strokeWidth="3" />
        ))}
        <path className="frb-float" d="M230 50l130 46v92c0 84-58 146-130 176-72-30-130-92-130-176V96z" fill={c1} />
        <path d="M230 82l100 36v70c0 64-44 112-100 136z" fill="#fff" opacity=".18" />
        <path className="frb-draw" d="M180 210l36 36 70-80" fill="none" stroke="#fff" strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" />
        {vals.slice(0, 5).map((v, i) => (
          <rect key={i} x={20 + i * 22} y={380 - v * 60} width="12" height={v * 60} rx="6" fill={c2} opacity=".7" />
        ))}
      </g>
    );
  }
  if (m === "cloud") {
    return (
      <g>
        <path className="frb-float" d="M120 230a70 70 0 0 1 40-126 100 100 0 0 1 190 26 64 64 0 0 1-10 128H140a64 64 0 0 1-20-28z" fill={c1} />
        <path d="M150 210a50 50 0 0 1 30-86" stroke="#fff" strokeOpacity=".35" strokeWidth="10" fill="none" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${130 + i * 90} 300)`}>
            <path className="frb-flow" style={{ "--d": i * 0.4 + "s" }} d="M30 0v40" stroke={c2} strokeWidth="5" strokeDasharray="8 10" />
            <rect y="44" width="60" height="70" rx="12" fill={panel} stroke={c2} strokeOpacity=".5" />
            <circle cx="16" cy="66" r="5" fill={c2} className="frb-blink" style={{ "--d": i * 0.3 + "s" }} />
            <rect x="26" y="62" width="24" height="8" rx="4" fill={ink} opacity=".35" />
            <rect x="10" y="84" width="40" height="8" rx="4" fill={ink} opacity=".2" />
          </g>
        ))}
      </g>
    );
  }
  if (m === "gears") {
    const gear = (cx, cy, R, n, cls, fill) => {
      const pts = [];
      for (let i = 0; i < n * 2; i++) {
        const a = (i / (n * 2)) * Math.PI * 2,
          rr = i % 2 ? R : R * 0.82;
        pts.push((cx + Math.cos(a) * rr).toFixed(1) + "," + (cy + Math.sin(a) * rr).toFixed(1));
      }
      return (
        <g className={cls} style={{ transformOrigin: `${cx}px ${cy}px` }}>
          <polygon points={pts.join(" ")} fill={fill} />
          <circle cx={cx} cy={cy} r={R * 0.34} fill={panel} />
        </g>
      );
    };
    return (
      <g>
        {gear(170, 190, 110, 12, "frb-spin", c1)}
        {gear(330, 290, 74, 9, "frb-spin-r", c2)}
        {gear(340, 110, 44, 7, "frb-spin-r", ink)}
        <circle className="frb-pulse" cx="170" cy="190" r="16" fill={c2} />
      </g>
    );
  }
  if (m === "donut") {
    let a0 = -Math.PI / 2;
    const total = vals.slice(0, 4).reduce((s, v) => s + v, 0);
    const arcs = vals.slice(0, 4).map((v, i) => {
      const a1 = a0 + (v / total) * Math.PI * 2;
      const p = (a) => [150 + Math.cos(a) * 110, 200 + Math.sin(a) * 110].map((x) => x.toFixed(1)).join(" ");
      const d = `M${p(a0)} A110 110 0 ${a1 - a0 > Math.PI ? 1 : 0} 1 ${p(a1)}`;
      a0 = a1;
      return <path key={i} className="frb-draw" style={{ "--d": i * 0.25 + "s" }} d={d} stroke={[c1, c2, ink, "#FFC24A"][i]} strokeOpacity={i === 2 ? 0.4 : 1} strokeWidth="44" fill="none" />;
    });
    return (
      <g>
        <g className="frb-float">{arcs}</g>
        <text x="150" y="214" textAnchor="middle" fill={ink} style={{ font: "800 40px var(--display,system-ui)" }}>
          {Math.round((vals[0] / total) * 100)}%
        </text>
        {vals.slice(0, 5).map((v, i) => (
          <rect key={i} className="frb-grow" style={{ "--d": i * 0.12 + "s" }} x={310 + i * 28} y={330 - v * 200} width="18" height={v * 200} rx="9" fill={i % 2 ? c2 : c1} />
        ))}
        <path className="frb-draw" d={"M300 " + (300 - vals[0] * 150) + vals.slice(1, 6).map((v, i) => ` L${328 + i * 28} ${300 - v * 150}`).join("")} stroke={ink} strokeWidth="4" fill="none" strokeLinejoin="round" opacity=".6" />
      </g>
    );
  }
  if (m === "funnel") {
    return (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <path key={i} className="frb-slide" style={{ "--d": i * 0.15 + "s" }} d={`M${60 + i * 40} ${60 + i * 80}h${340 - i * 80}l-24 70h${-(292 - i * 80)}z`} fill={i % 2 ? c2 : c1} opacity={1 - i * 0.12} />
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <circle key={i} className="frb-drop" style={{ "--d": i * 0.45 + "s" }} cx={140 + r() * 180} cy="30" r={6 + r() * 6} fill={i % 2 ? c2 : "#FFD166"} />
        ))}
        <g className="frb-bob" transform="translate(208 400)">
          <circle r="22" fill="#FFD166" />
          <path d="M-8 0l6 6 11-12" stroke="#5B3A00" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>
      </g>
    );
  }
  if (m === "chat") {
    return (
      <g>
        <g className="frb-bob">
          <rect x="40" y="60" width="250" height="110" rx="30" fill={c1} />
          <path d="M80 170l-10 34 40-34z" fill={c1} />
          {[0, 1, 2].map((i) => (
            <circle key={i} className="frb-dot" style={{ "--d": i * 0.2 + "s" }} cx={120 + i * 46} cy="115" r="12" fill="#fff" />
          ))}
        </g>
        <g className="frb-bob" style={{ "--d": "1.2s" }}>
          <rect x="170" y="210" width="250" height="100" rx="30" fill={panel} stroke={c2} strokeOpacity=".5" strokeWidth="2" />
          <path d="M380 310l12 30-40-30z" fill={panel} />
          <rect x="200" y="240" width="160" height="12" rx="6" fill={ink} opacity=".4" />
          <rect x="200" y="266" width="110" height="12" rx="6" fill={c2} />
        </g>
        {[0, 1, 2].map((i) => (
          <path key={i} className="frb-heart" style={{ "--d": i * 0.8 + "s" }} transform={`translate(${60 + i * 50} ${330 + (i % 2) * 20}) scale(1.6)`} d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill={i === 1 ? "#FFD166" : c2} />
        ))}
      </g>
    );
  }
  if (m === "play") {
    return (
      <g>
        <rect className="frb-float" x="30" y="60" width="400" height="250" rx="26" fill={panel} stroke={c2} strokeOpacity=".4" />
        <circle className="frb-pulse" cx="230" cy="185" r="56" fill={c1} />
        <path d="M214 158v54l46-27z" fill="#fff" />
        <rect x="60" y="282" width="340" height="8" rx="4" fill={ink} opacity=".2" />
        <rect className="frb-prog" x="60" y="282" width="340" height="8" rx="4" fill={c2} />
        {vals.slice(0, 6).map((v, i) => (
          <rect key={i} className="frb-eq" style={{ "--d": i * 0.12 + "s" }} x={90 + i * 50} y={400 - v * 60} width="24" height={v * 60} rx="8" fill={i % 2 ? c1 : c2} />
        ))}
      </g>
    );
  }
  if (m === "mail") {
    return (
      <g>
        <g className="frb-float">
          <rect x="60" y="100" width="340" height="220" rx="22" fill={panel} stroke={c2} strokeOpacity=".5" strokeWidth="2" />
          <path d="M60 120l170 120 170-120" stroke={c1} strokeWidth="10" fill="none" strokeLinejoin="round" />
        </g>
        <g className="frb-fly">
          <path d="M330 40l90 30-50 20-10 40-14-36z" fill={c2} />
        </g>
        <g className="frb-pop" style={{ "--d": ".4s" }} transform="translate(360 290)">
          <circle r="34" fill="#FFD166" />
          <text y="12" textAnchor="middle" fill="#5B3A00" style={{ font: "900 32px var(--display,system-ui)" }}>
            {1 + Math.floor(r() * 9)}
          </text>
        </g>
      </g>
    );
  }
  if (m === "search") {
    return (
      <g>
        <rect x="20" y="40" width="420" height="64" rx="32" fill={panel} stroke={c2} strokeOpacity=".5" strokeWidth="2" />
        <circle cx="60" cy="72" r="14" fill="none" stroke={c1} strokeWidth="5" />
        <rect className="frb-type" style={{ "--w": "220px" }} x="90" y="66" width="220" height="12" rx="6" fill={ink} opacity=".45" />
        {[0, 1, 2].map((i) => (
          <g key={i} className="frb-slide" style={{ "--d": 0.3 + i * 0.2 + "s" }} transform={`translate(20 ${130 + i * 86})`}>
            <rect width="420" height="70" rx="18" fill={i === 0 ? c1 : panel} opacity={i === 0 ? 1 : 0.9} />
            <text x="24" y="44" fill={i === 0 ? "#fff" : ink} style={{ font: "900 26px var(--display,system-ui)" }}>
              #{i + 1}
            </text>
            <rect x="80" y="22" width={200 - i * 40} height="10" rx="5" fill={i === 0 ? "#fff" : ink} opacity=".6" />
            <rect x="80" y="40" width={260 - i * 30} height="8" rx="4" fill={i === 0 ? "#fff" : ink} opacity=".3" />
          </g>
        ))}
        <path className="frb-draw" d="M300 400l40-30 30 14 50-50" stroke={c2} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }
  if (m === "coins") {
    return (
      <g>
        {[0, 1, 2].map((s) => (
          <g key={s} transform={`translate(${60 + s * 120} 0)`}>
            {Array.from({ length: 2 + Math.round(vals[s] * 5) }, (_, i) => (
              <g key={i} className="frb-stack" style={{ "--d": s * 0.2 + i * 0.08 + "s" }}>
                <ellipse cx="50" cy={380 - i * 26} rx="50" ry="16" fill={s === 1 ? c2 : c1} />
                <ellipse cx="50" cy={372 - i * 26} rx="50" ry="16" fill={s === 1 ? c2 : c1} opacity=".75" stroke="#fff" strokeOpacity=".3" />
              </g>
            ))}
          </g>
        ))}
        <g className="frb-bob" transform="translate(360 90)">
          <circle r="58" fill="#FFD166" />
          <circle r="44" fill="none" stroke="#B88400" strokeWidth="4" strokeDasharray="6 6" className="frb-spin" style={{ transformOrigin: "0 0" }} />
          <text y="18" textAnchor="middle" fill="#6B4C00" style={{ font: "900 52px var(--display,system-ui)" }}>
            ₹
          </text>
        </g>
        <path className="frb-draw" d="M40 180l80-40 70 30 90-80" stroke={ink} strokeOpacity=".5" strokeWidth="5" fill="none" strokeLinecap="round" />
      </g>
    );
  }
  if (m === "people") {
    return (
      <g>
        {Array.from({ length: 12 }, (_, i) => {
          const x = 40 + (i % 4) * 100,
            y = 50 + Math.floor(i / 4) * 120,
            on = vals[i % 7] > 0.55;
          return (
            <g key={i} className={on ? "frb-pop" : ""} style={{ "--d": i * 0.1 + "s" }} transform={`translate(${x} ${y})`}>
              <circle cx="40" cy="30" r="22" fill={on ? c1 : ink} opacity={on ? 1 : 0.2} />
              <path d="M6 100a34 34 0 0 1 68 0z" fill={on ? c2 : ink} opacity={on ? 0.9 : 0.15} />
            </g>
          );
        })}
      </g>
    );
  }
  /* globe */
  return (
    <g>
      <g className="frb-float">
        <circle cx="230" cy="210" r="150" fill={c1} opacity=".18" />
        <circle cx="230" cy="210" r="150" fill="none" stroke={c2} strokeOpacity=".5" strokeWidth="2" />
        <ellipse cx="230" cy="210" rx="60" ry="150" fill="none" stroke={c2} strokeOpacity=".35" strokeWidth="2" />
        <ellipse cx="230" cy="210" rx="150" ry="50" fill="none" stroke={c2} strokeOpacity=".35" strokeWidth="2" />
        <path d="M80 210h300M230 60v300" stroke={c2} strokeOpacity=".25" strokeWidth="2" />
      </g>
      {Array.from({ length: 6 }, (_, i) => {
        const a = r() * Math.PI * 2,
          rr = 40 + r() * 100;
        return <circle key={i} className="frb-pulse" style={{ "--d": i * 0.5 + "s" }} cx={230 + Math.cos(a) * rr} cy={210 + Math.sin(a) * rr * 0.8} r="9" fill={i % 2 ? "#FFD166" : c2} />;
      })}
      <g className="frb-orbit" style={{ transformOrigin: "230px 210px" }}>
        <circle cx="230" cy="40" r="16" fill={c2} />
      </g>
      <g className="frb-bob" transform="translate(340 300)">
        <circle r="40" fill={panel} stroke={c1} strokeWidth="8" />
        <path d="M28 28l30 30" stroke={c1} strokeWidth="12" strokeLinecap="round" />
      </g>
    </g>
  );
}

function FRB_Cover({ post, size = "md", label = true }) {
  const seed = frkHash(post.slug || post.title);
  const r = frbRng(seed);
  const v = frkV(post.vertical);
  const m = frbMotif(post);
  const light = r() < 0.4;
  const mirror = size !== "hero" && size !== "lg" && r() < 0.35;
  const hue = Math.round(r() * 36 - 18);
  const id = "frb" + seed.toString(36);
  const ink = light ? v.deep : "#FFFFFF";
  const panel = light ? "#FFFFFF" : "rgba(255,255,255,.08)";
  const kw = frbCap(post.primaryKeyword || post.title);
  const lines = frbWrap(kw, size === "sm" ? 16 : 13).slice(0, 3);
  const big = lines.length < 3 && kw.length < 34;
  const ref = ee.useRef(null);
  const [on, setOn] = ee.useState(false);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setOn(true);
      return undefined;
    }
    const io2 = new IntersectionObserver((es) => setOn(es[0].isIntersecting), { threshold: 0.1 });
    io2.observe(el);
    return () => io2.disconnect();
  }, []);
  /* wide cards (sm) use the full 1200 width; larger sizes are often cropped to ~1.45:1, so keep a safe area */
  const wide = size === "sm";
  const tx = wide ? (mirror ? 640 : 70) : 150;
  const mx = wide ? (mirror ? 90 : 680) : 600;
  const bgA = light ? v.soft : v.deep;
  const bgB = light ? "#FFFFFF" : "#050A30";
  const shape = Math.floor(r() * 3);
  return (
    <svg
      ref={ref}
      className={`bcover bcover--${size} frb frb--${m} frb--${light ? "light" : "dark"}${on ? " is-on" : ""}`}
      viewBox="0 0 1200 630"
      role="img"
      aria-label={`Cover illustration for “${post.title}”`}
      preserveAspectRatio="xMidYMid slice"
      style={{ "--h": hue + "deg" }}
    >
      <defs>
        <linearGradient id={id + "b"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={bgA} />
          <stop offset="1" stopColor={bgB} />
        </linearGradient>
        <radialGradient id={id + "g1"} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor={v.c1} stopOpacity={light ? 0.35 : 0.7} />
          <stop offset="1" stopColor={v.c1} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id + "g2"} cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor={v.c2} stopOpacity={light ? 0.35 : 0.55} />
          <stop offset="1" stopColor={v.c2} stopOpacity="0" />
        </radialGradient>
        <pattern id={id + "p"} width="30" height="30" patternUnits="userSpaceOnUse" patternTransform={shape === 2 ? "rotate(30)" : undefined}>
          {shape === 0 ? <circle cx="3" cy="3" r="1.6" fill={ink} opacity=".12" /> : shape === 1 ? <path d="M30 0H0V30" fill="none" stroke={ink} strokeOpacity=".07" /> : <path d="M0 0v30" stroke={ink} strokeOpacity=".06" strokeWidth="3" />}
        </pattern>
      </defs>
      <rect width="1200" height="630" fill={`url(#${id}b)`} />
      <g className="frb-hue">
        <circle className="frb-blob" cx={mirror ? 300 : 900} cy="260" r="380" fill={`url(#${id}g1)`} />
        <circle className="frb-blob frb-blob--2" cx={mirror ? 1000 : 160} cy="560" r="300" fill={`url(#${id}g2)`} />
      </g>
      <rect width="1200" height="630" fill={`url(#${id}p)`} />
      <g transform={`translate(${mx} 100)`} className="frb-motif">
        <FRB_Motif m={m} r={r} c1={v.c1} c2={v.c2} ink={ink} panel={panel} />
      </g>
      <g transform={`translate(${tx} ${big ? 190 : 160})`}>
        {label && (
          <g>
            <rect width={v.name.length * 13 + 56} height="46" rx="23" fill={light ? "#fff" : "rgba(255,255,255,.12)"} stroke={v.c1} strokeOpacity=".4" />
            <circle cx="24" cy="23" r="8" fill={v.c2} />
            <text x="42" y="30" fill={light ? v.ink : "#fff"} style={{ font: "700 20px var(--display,system-ui)", letterSpacing: ".04em" }}>
              {v.name}
            </text>
          </g>
        )}
        {lines.map((t, i) => (
          <text key={i} x="0" y={(label ? 120 : 70) + i * (big ? 74 : 62)} fill={ink} style={{ font: `800 ${big ? 66 : 54}px var(--display,system-ui)`, letterSpacing: "-.02em" }}>
            {t}
          </text>
        ))}
        <rect className="frb-bar" x="0" y={(label ? 120 : 70) + (lines.length - 1) * (big ? 74 : 62) + 34} width="120" height="8" rx="4" fill={v.c2} />
      </g>
      <g transform={`translate(${mirror ? 1080 : 1110} 540)`} opacity={light ? 0.5 : 0.35}>
        <circle r="34" fill="none" stroke={ink} strokeOpacity=".5" strokeWidth="2" strokeDasharray="4 6" className="frb-spin" style={{ transformOrigin: "0 0" }} />
        <image href={FRK_EMBLEM_SM} x="-26" y="-26" width="52" height="52" />
      </g>
    </svg>
  );
}

/* build 74: the blog cover (picture, or the drawn cover) lives here so the home page does not load every blog post */
function BlogCover({ post, size = "md", label = true }) {
  if (post.image)
    return (
      <img
        className={`bcover bcover--${size}`}
        src={post.image}
        srcSet={post.imageSrcset}
        sizes="(max-width: 900px) 100vw, 1200px"
        alt={post.imageAlt || post.title}
        loading={size === "hero" ? "eager" : "lazy"}
        decoding="async"
        width="1200"
        height="630"
      />
    );
  return <FRB_Cover post={post} size={size} label={label} />;
}
export { FRB_Cover, BlogCover };
