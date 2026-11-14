import * as ee from 'react';
import { Link } from 'react-router-dom';

const HM_V = {
  "market-research": {
    c: "#1E5BFF",
    lt: "#5B8CFF",
    ic: "search",
    short: "Research",
  },
  "digital-marketing": {
    c: "#0E9C88",
    lt: "#6EE0CE",
    ic: "trend",
    short: "Digital",
  },
  "it-development": {
    c: "#5A3FE0",
    lt: "#A8B6FF",
    ic: "cpu",
    short: "Technology",
  },
  "accounts-finance": {
    c: "#B4862A",
    lt: "#F0D98F",
    ic: "pie",
    short: "Finance",
  },
};
const hmV = (slug) => HM_V[slug] || HM_V["market-research"];
const hmReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
const HmLink = (p) => <Link {...p} />;
function HM_Head({ k, t, i, light, center, id }) {
  return (
    <div className={"hm-head" + (light ? " hm-head--light" : "") + (center ? " hm-head--center" : "")}>
      {k && <span className="hm-kicker">{k}</span>}
      <h2 id={id}>{t}</h2>
      {i && <p>{i}</p>}
    </div>
  );
}

export { HM_Head, HmLink, hmReduce, hmV };
