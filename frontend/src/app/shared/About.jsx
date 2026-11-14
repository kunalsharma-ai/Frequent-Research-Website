import * as ee from 'react';

const abReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
const ABH_P = [
  {
    k: "research",
    t: "Research",
    d: "Understand better",
    to: "/services/market-research",
    c: "#5B8CFF",
    rgb: [91, 140, 255],
  },
  {
    k: "digital",
    t: "Digital",
    d: "Grow faster",
    to: "/services/digital-marketing",
    c: "#6EE0CE",
    rgb: [110, 224, 206],
  },
  {
    k: "tech",
    t: "Technology",
    d: "Build smarter",
    to: "/services/it-development",
    c: "#A8B6FF",
    rgb: [168, 182, 255],
  },
  {
    k: "finance",
    t: "Finance",
    d: "Manage with confidence",
    to: "/services/accounts-finance",
    c: "#F0D98F",
    rgb: [240, 217, 143],
  },
];
function ABH_BgSilk() {
  const lines = [];
  ABH_P.forEach((p, i) => {
    const y0 = 110 + i * 125;
    for (let j = 0; j < 6; j++) {
      const o = (j - 2.5) * 1.3,
        yc = 300 + (i - 1.5) * 5 + o * 1.6,
        y2 = 336 + (i - 1.5) * 12 + o * 2.4,
        ys = y0 + o * 7;
      lines.push({
        i,
        j,
        d: `M1520 ${ys} C1290 ${ys} 1190 ${yc} 1010 ${yc} S 720 ${yc + 26} 470 ${y2} S 120 ${y2 - 14} -80 ${y2 + 6}`,
      });
    }
  });
  const rm = abReduce();
  return (
    <div className="abh-bg abh-silk" aria-hidden="true">
      <svg className="abh-silk__static" viewBox="0 0 1440 600" preserveAspectRatio="xMaxYMid slice">
        <defs>
          {ABH_P.map((p) =>
            ee.createElement(
              "linearGradient",
              {
                key: p.k,
                id: "abhS-" + p.k,
                x1: "0",
                y1: "0",
                x2: "1",
                y2: "0",
              },
              <stop offset="0" stopColor={p.c} stopOpacity="0" />,
              <stop offset=".45" stopColor={p.c} stopOpacity=".55" />,
              <stop offset="1" stopColor={p.c} stopOpacity=".9" />,
            ),
          )}
          {ee.createElement(
            "radialGradient",
            {
              id: "abhSJ",
              cx: "50%",
              cy: "50%",
              r: "50%",
            },
            <stop offset="0" stopColor="#fff" stopOpacity=".9" />,
            <stop offset=".25" stopColor="#9DB8FF" stopOpacity=".45" />,
            <stop offset="1" stopColor="#3A6BFF" stopOpacity="0" />,
          )}
        </defs>
        {lines.map((l) => (
          <path
            key={l.i + "-" + l.j}
            d={l.d}
            className="abh-silk__line"
            stroke={`url(#abhS-${ABH_P[l.i].k})`}
            strokeOpacity={0.35 + (l.j % 3) * 0.15}
          />
        ))}
        <circle cx="1010" cy="300" r="90" fill="url(#abhSJ)" />
        {ABH_P.map((p, i) => (
          <g
            key={p.k}
            className="abh-silk__tag"
            transform={`translate(1300 ${Math.round(110 + i * 125 + (300 - (110 + i * 125)) * 0.12 - 24)})`}
          >
            <rect
              x="-6"
              y="-14"
              width={p.t.length * 8.4 + 26}
              height="26"
              rx="13"
              fill="#07104Fcc"
              stroke={p.c}
              strokeOpacity=".6"
            />
            <circle cx="8" cy="-1" r="4" fill={p.c} />
            <text x="18" y="4" fill="#E7ECFF">
              {p.t}
            </text>
          </g>
        ))}
      </svg>
      {!rm && (
        <svg className="abh-silk__live" viewBox="0 0 1440 600" preserveAspectRatio="xMaxYMid slice">
          {lines
            .filter((l) => l.j === 1 || l.j === 4)
            .map((l) => (
              <circle key={l.i + "-" + l.j} r="2.6" fill={ABH_P[l.i].c}>
                {ee.createElement("animateMotion", {
                  dur: "7s",
                  begin: -(l.j * 0.7 + l.i * 1.3) + "s",
                  repeatCount: "indefinite",
                  path: l.d,
                  keyPoints: "1;0",
                  keyTimes: "0;1",
                  calcMode: "linear",
                })}
              </circle>
            ))}
        </svg>
      )}
    </div>
  );
}

export { ABH_BgSilk };
