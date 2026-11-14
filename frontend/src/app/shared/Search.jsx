import * as ee from 'react';
import { createRoot } from 'react-dom/client';
import { navGo, navHref, navPath } from '../nav.jsx';
import { PORTALS, VERTICALS } from '../data/site.jsx';
import { PRODUCTS } from '../data/products.jsx';
import { INDUSTRIES, SERVICE_GUIDES } from '../data/industries.jsx';
import { RC_I } from './Reveal.jsx';

const SR_PAGES = [
  ["Home", "/", "Market research, digital marketing, technology and finance under one roof."],
  ["About Us", "/about-us", "Our story, mission, vision and values."],
  ["Our Team", "/our-team", "Meet the people behind every project."],
  ["Services", "/services", "All service areas and specialist services."],
  [
    "Government Research",
    "/government-opinion-research",
    "Opinion research and evaluation for government and public bodies.",
  ],
  ["Industries & Case Studies", "/industries-case-studies", "Sectors we serve and how we deliver."],
  ["Products", "/products", "Seven Sampledge products: SampCode, SampBidx, SampTrek, SampAudience, SampForce, Talk2Tax and SampCrew."],
  ["Portals", "/portals", "Our research panel communities."],
  ["Blog", "/blog", "Guides and insights from our teams."],
  ["Downloads", "/downloads", "Brochures and company documents."],
  ["Careers", "/careers", "Join our research, marketing, technology and finance teams."],
  ["Let's Talk", "/lets-talk", "Contact us, request a quote or feasibility."],
  ["Privacy Policy", "/privacy-policy", "How we collect and protect personal information."],
];
let SR_INDEX = null;
function srIndex() {
  if (SR_INDEX) return SR_INDEX;
  const out = [];
  const add = (k, t, to, d, x) =>
    out.push({
      k,
      t,
      to,
      d: d || "",
      hay: (t + " " + (d || "") + " " + (x || "")).toLowerCase(),
      tl: t.toLowerCase(),
    });
  SR_PAGES.forEach(([t, to, d]) => add("Pages", t, to, d));
  try {
    VERTICALS.forEach((v) => {
      add("Services", v.name, `/services/${v.slug}`, v.intro || v.card);
      v.services.forEach((s) =>
        add(
          "Services",
          s.name,
          `/services/${v.slug}/${s.slug}`,
          s.summary,
          (s.includes || []).join(" ") + " " + v.name,
        ),
      );
    });
  } catch (e) {}
  try {
    INDUSTRIES.forEach((i) =>
      add("Industries", i.name, `/industries-case-studies/${i.slug}`, i.blurb, (i.topics || []).join(" ")),
    );
  } catch (e) {}
  try {
    PORTALS.forEach((p) => add("Panels & products", p.name, `/portals/${p.slug}`, p.tagline || p.audience, p.audience));
  } catch (e) {}
  try {
    PRODUCTS.forEach((p) => add("Panels & products", p.name, `/products/${p.slug}`, p.tagline, p.intro));
  } catch (e) {}
  try {
    SERVICE_GUIDES.forEach((p) => add("Articles", p.title, `/blog/${p.slug}`, p.description, (p.keywords || []).join(" ")));
  } catch (e) {}
  SR_INDEX = out;
  return out;
}
function srSearch(q) {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const res = [];
  srIndex().forEach((it) => {
    if (!terms.every((t) => it.hay.includes(t))) return;
    let s = 0;
    terms.forEach((t) => {
      if (it.tl.startsWith(t)) s += 6;
      else if (it.tl.includes(t)) s += 4;
      else s += 1;
    });
    if (it.tl === q.toLowerCase().trim()) s += 10;
    if (it.k === "Articles") s -= 1;
    res.push([s, it]);
  });
  res.sort((a, b) => b[0] - a[0]);
  return res.slice(0, 14).map((r) => r[1]);
}
function srMark(text, q) {
  const terms = q
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 1);
  if (!terms.length) return text;
  const re = new RegExp("(" + terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")", "ig");
  return text.split(re).map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : p));
}
const SR_SUGGEST = [
  ["Consumer Panel", "/services/market-research/consumer-panel"],
  ["Business Panel", "/services/market-research/business-panel"],
  ["Online Data Collection", "/services/market-research/online-data-collection"],
  ["Research Consultancy", "/services/market-research/research-consultancy"],
  ["Healthcare Panel", "/services/market-research/healthcare-panel"],
  ["Request a quote", "/lets-talk?type=quote"],
];
function SR_Overlay({ onClose }) {
  const [q, setQ] = ee.useState("");
  const [act, setAct] = ee.useState(0);
  const inp = ee.useRef(null);
  const list = ee.useRef(null);
  const results = ee.useMemo(() => srSearch(q), [q]);
  const flat = q.trim()
    ? results
    : SR_SUGGEST.map(([t, to]) => ({
        t,
        to,
        k: "Popular",
        d: "",
      }));
  ee.useEffect(() => {
    setAct(0);
  }, [q]);
  ee.useEffect(() => {
    const prev = document.activeElement;
    const ov = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setTimeout(() => inp.current && inp.current.focus(), 30);
    return () => {
      document.body.style.overflow = ov;
      if (prev && prev.focus) prev.focus();
    };
  }, []);
  ee.useEffect(() => {
    const el = list.current && list.current.querySelector('[aria-selected="true"]');
    if (el)
      el.scrollIntoView({
        block: "nearest",
      });
  }, [act]);
  const go = (to) => {
    const scrim = document.querySelector(".drawer__scrim");
    if (scrim) scrim.click();
    onClose();
    if (to === navPath()) window.scrollTo(0, 0);
    else navGo(to);
  };
  const onKey = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setAct((a) => Math.min(flat.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAct((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && flat[act]) {
      e.preventDefault();
      go(flat[act].to);
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (inp.current) inp.current.focus();
    }
  };
  let lastK = null;
  return (
    <div className="sr" role="dialog" aria-modal="true" aria-label="Search the site" onKeyDown={onKey}>
      <button className="sr__scrim" aria-label="Close search" tabIndex="-1" onClick={onClose} />
      <div className="sr__box">
        <div className="sr__bar">
          <RC_I n="search" s={20} />
          <input
            ref={inp}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services, panels, industries, articles…"
            role="combobox"
            aria-expanded="true"
            aria-controls="sr-list"
            aria-activedescendant={flat[act] ? "sr-opt-" + act : undefined}
            aria-autocomplete="list"
          />
          <button className="sr__close" onClick={onClose} aria-label="Close search">
            <kbd>Esc</kbd>
          </button>
        </div>
        <div className="sr__body" ref={list}>
          {q.trim() && !results.length && (
            <div className="sr__empty">
              <strong>No results for “{q}”</strong>
              <span>
                {"Try a broader term, or "}
                <a
                  href={navHref("/lets-talk")}
                  onClick={(e) => {
                    e.preventDefault();
                    go("/lets-talk");
                  }}
                >
                  ask our team
                </a>
                .
              </span>
            </div>
          )}
          <ul id="sr-list" role="listbox" aria-label="Search results">
            {flat.map((it, i) => {
              const head = it.k !== lastK ? (lastK = it.k) : null;
              return ee.createElement(
                ee.Fragment,
                {
                  key: it.to + i,
                },
                head && (
                  <li className="sr__group" role="presentation">
                    {head}
                  </li>
                ),
                <li
                  id={"sr-opt-" + i}
                  role="option"
                  aria-selected={act === i}
                  className={"sr__item" + (act === i ? " is-act" : "")}
                  onMouseEnter={() => setAct(i)}
                  onClick={() => go(it.to)}
                >
                  <span className={"sr__ic sr__ic--" + (it.k || "").split(" ")[0].toLowerCase()}>
                    <RC_I
                      n={
                        {
                          Pages: "file",
                          Services: "layers",
                          Industries: "factory",
                          Articles: "bookopen",
                          Popular: "trend",
                        }[it.k] || "box"
                      }
                      s={16}
                    />
                  </span>
                  <span className="sr__txt">
                    <strong>{srMark(it.t, q)}</strong>
                    {it.d && <small>{srMark(it.d.length > 110 ? it.d.slice(0, 108) + "\u2026" : it.d, q)}</small>}
                  </span>
                  <RC_I n="arrow" s={15} className="sr__go" />
                </li>,
              );
            })}
          </ul>
        </div>
        <div className="sr__foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            {" to move"}
          </span>
          <span>
            <kbd>Enter</kbd>
            {" to open"}
          </span>
          <span>
            <kbd>Esc</kbd>
            {" to close"}
          </span>
        </div>
      </div>
    </div>
  );
}
const SR_STATE = {
  root: null,
  host: null,
  open: false,
};
function srOpen() {
  if (SR_STATE.open) return;
  if (!SR_STATE.host) {
    SR_STATE.host = document.createElement("div");
    SR_STATE.host.className = "sr-host";
    document.body.appendChild(SR_STATE.host);
    SR_STATE.root = createRoot(SR_STATE.host);
  }
  SR_STATE.open = true;
  SR_STATE.root.render(<SR_Overlay onClose={srClose} />);
}
function srClose() {
  if (!SR_STATE.open) return;
  SR_STATE.open = false;
  SR_STATE.root.render(null);
}
function SR_NavItem({ mobile }) {
  if (mobile)
    return (
      <div className="drawer__item">
        <button className="drawer__link sr-drawer" onClick={srOpen}>
          <RC_I n="search" s={18} />
          Search
        </button>
      </div>
    );
  return (
    <div className="nav__item">
      <button
        className="nav__link sr-btn"
        onClick={srOpen}
        aria-label="Search the site (Ctrl+K)"
        title="Search (Ctrl+K)"
      >
        <RC_I n="search" s={17} />
        <span>Search</span>
      </button>
    </div>
  );
}

export { SR_NavItem, SR_STATE, srClose, srOpen };
