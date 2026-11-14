import * as ee from 'react';
import * as l from 'react/jsx-runtime';
import { BriefcaseIcon, INDUSTRY_ICONS } from '../icons/industryIcons.jsx';

function useInView(t = 0.3) {
  const e = ee.useRef(null),
    [a, n] = ee.useState(false);
  ee.useEffect(() => {
    const s = e.current;
    if (!s) return;
    if (!("IntersectionObserver" in window)) {
      n(true);
      return;
    }
    const i = new IntersectionObserver(
      ([o]) => {
        if (o.isIntersecting) {
          n(true);
          i.disconnect();
        }
      },
      {
        threshold: t,
      },
    );
    i.observe(s);
    return () => i.disconnect();
  }, [t]);
  return [e, a];
}
const prefersReducedMotion = () => {
  var t;
  return (
    typeof window < "u" &&
    ((t = window.matchMedia) == null ? undefined : t.call(window, "(prefers-reduced-motion: reduce)").matches)
  );
};
function useJsonLd(t, e) {
  ee.useEffect(() => {
    if (!e) return;
    const a = document.createElement("script");
    a.type = "application/ld+json";
    a.id = `ld-${t}`;
    a.textContent = JSON.stringify(e);
    document.head.appendChild(a);
    return () => a.remove();
  }, [t]);
}
function IndustryIcon({ name, size = 24, className = "" }) {
  const n = INDUSTRY_ICONS[name] || BriefcaseIcon;
  return l.jsx(n, {
    size,
    strokeWidth: 1.75,
    className,
    "aria-hidden": "true",
    focusable: "false",
  });
}

export { IndustryIcon, prefersReducedMotion, useInView, useJsonLd };
