import * as ee from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { PORTALS, VERTICALS } from './data/site.jsx';
import { SR_NavItem } from './shared/Search.jsx';
import { FRS_HeadToggle } from '../components/site/Floaters.jsx';
import { FRL_Lockup, FRL_Plate, HD14_Sky } from '../components/site/Logos13.jsx';
import { FRT_Toggle } from '../components/site/Theme.jsx';
import { FRI_Switch } from '../components/site/I18n.jsx';
import { FRX_MenuProducts } from '../components/site/Products.jsx';
import { DL5_SECS as DL5_BUILTIN } from '../data/dl5Secs.jsx';
import { cmsList } from './cms.jsx';
import { cmsMenuExtra } from './cms78.jsx';

/* build 78: every menu can be changed in the super admin (Header & footer menus): rename, hide, reorder and add items.
   Added items are plain links in the same style as the built-in ones. */
const DL5_SECS = cmsList("menu-downloads", DL5_BUILTIN, "k");
const dlTo = (item) => item.to || "/downloads/" + item.k;
const svcExtra = (slug) => cmsMenuExtra("services:" + slug);

function SiteLogo({ light = false }) {
  return <FRL_Lockup light={light} />;
}
const NAV_ITEMS = cmsList("menu-main", [
  {
    to: "/",
    label: "Home",
    end: true,
  },
  {
    to: "/about-us",
    label: "About",
    menu: "about",
  },
  {
    to: "/services",
    label: "Services",
    menu: "services",
  },
  {
    to: "/government-opinion-research",
    label: "Government Research",
    highlight: true,
  },
  {
    to: "/products",
    label: "Products",
    menu: "products",
  },
  {
    to: "/portals",
    label: "Portals",
    menu: "portals",
  },
  {
    to: "/blog",
    label: "Blogs",
  },
  {
    to: "/downloads",
    label: "Downloads",
    menu: "downloads",
  },
], "to");
const ABOUT_MENU = cmsList("menu-about", [
  {
    to: "/about-us",
    t: "About Us",
    d: "Our story, vision, mission and values.",
  },
  {
    to: "/our-journey",
    t: "Our Journey",
    d: "2015 to today: panels, healthcare, IT and more.",
  },
  {
    to: "/our-reach",
    t: "Our Reach",
    d: "55 countries, 5 regions, 58 industries, 1,108 job titles.",
  },
  {
    to: "/connect",
    t: "QR & Connect",
    d: "Scan to follow us, our panels and Sampledge.",
  },
  {
    to: "/rates-reviews",
    t: "Our Rates & Reviews",
    d: "Client ratings and reviews for every service.",
  },
  {
    to: "/our-team",
    t: "Our Team",
    d: "Meet the people behind every project.",
  },
  {
    to: "/gallery",
    t: "Gallery",
    d: "Festivals, awards and birthdays.",
  },
  {
    to: "/careers",
    t: "Careers",
    d: "Join our research, marketing, tech and finance teams.",
  },
], "to");
function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = ee.useState(false),
    [openMenu, setOpenMenu] = ee.useState(null),
    [scrolled, setScrolled] = ee.useState(false),
    [drawerSection, setDrawerSection] = ee.useState(null),
    { pathname, search } = useLocation();
  ee.useEffect(() => {
    setDrawerOpen(false);
    setOpenMenu(null);
    setDrawerSection(null);
  }, [pathname, search]);
  ee.useEffect(() => {
    const item = () => setScrolled(window.scrollY > 8);
    item();
    window.addEventListener("scroll", item, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", item);
  }, []);
  ee.useEffect(() => {
    document.body.classList.toggle("no-scroll", drawerOpen);
    const item = (sub) => {
      if (sub.key === "Escape") {
        setDrawerOpen(false);
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", item);
    return () => window.removeEventListener("keydown", item);
  }, [drawerOpen]);
  return (
    <>
      <header
        className={`header hd14 ${scrolled ? "is-scrolled" : ""} ${openMenu ? "has-menu" : ""}`}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <HD14_Sky />
        <div className="header__bar container">
          <Link to="/" aria-label="Frequent Research home" className="header__logo">
            <SiteLogo />
          </Link>
          <nav className="nav" aria-label="Main">
            {[
              NAV_ITEMS.map((item) => (
                <div
                  className={"nav__item" + (openMenu && openMenu === item.menu ? " is-open" : "")}
                  onMouseEnter={() => setOpenMenu(item.menu || null)}
                  key={item.to}
                >
                  {/^https?:/.test(item.to) ? (
                    <a href={item.to} target="_blank" rel="noopener noreferrer" className={`nav__link ${item.highlight ? "nav__link--hl" : ""}`}>
                      {item.label}
                    </a>
                  ) : (
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={`nav__link ${item.highlight ? "nav__link--hl" : ""}`}
                    onFocus={() => setOpenMenu(item.menu || null)}
                    onClick={() => setOpenMenu(null)}
                  >
                    {item.label}
                    {item.menu && <span className="caret" aria-hidden="true" />}
                  </NavLink>
                  )}
                </div>
              )),
              <SR_NavItem key="search" />,
            ]}
          </nav>
          <div className="header__actions">
            <FRS_HeadToggle />
            <FRT_Toggle />
            <FRI_Switch />
            <Link to="/lets-talk" className="btn btn--primary">
              Let's Talk
            </Link>
            <button
              className={`burger ${drawerOpen ? "is-open" : ""}`}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              aria-controls="mobile-menu"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        {openMenu === "services" && (
          <div className="mega" role="region" aria-label="Services menu">
            <div className="container mega__grid">
              {VERTICALS.map((item) => (
                <div className={`mega__col tone-${item.color}`} key={item.slug}>
                  <Link to={`/services/${item.slug}`} className="mega__head">
                    <span className="mega__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                  <ul>
                    {item.services.map((sub) => (
                      <li key={sub.slug}>
                        <Link to={`/services/${item.slug}/${sub.slug}`}>{sub.name}</Link>
                      </li>
                    ))}
                    {svcExtra(item.slug).map((sub) => (
                      <li key={"x" + (sub.to || sub.href)}>
                        <Link to={sub.to || sub.href}>{sub.name || sub.t || sub.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        {["products", "about", "portals", "downloads"].includes(openMenu) && (
          <div className="mega mega--small" role="region" aria-label={`${openMenu} menu`}>
            <div className="container mega__products">
              {openMenu === "portals" ? (
                PORTALS.map((item) => (
                  <Link
                    to={`/portals/${item.slug}`}
                    className={`mega__product mega__portal tone-${item.accent}`}
                    key={item.slug}
                  >
                    <FRL_Plate k={item.slug} h={34} alt={`${item.name} logo`} className="mega__logo14" />
                    <span>{item.audience}</span>
                  </Link>
                ))
              ) : openMenu === "products" ? (
                <FRX_MenuProducts />
              ) : openMenu === "downloads" ? (
                DL5_SECS.map((item, setScrolled) => (
                  <Link to={dlTo(item)} className="mega__product mega__dl" key={item.k}>
                    <strong>
                      <span aria-hidden="true">{item.emo}</span> {item.t}
                    </strong>
                    <span>{item.d}</span>
                  </Link>
                ))
              ) : (
                ABOUT_MENU.map((item) => (
                  <Link to={item.to} className="mega__product" key={item.to}>
                    <strong>{item.t}</strong>
                    <span>{item.d}</span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </header>
      <div
        id="mobile-menu"
        className={`drawer ${drawerOpen ? "is-open" : ""}`}
        aria-hidden={!drawerOpen}
        inert={drawerOpen ? undefined : ""}
      >
        <nav aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <div className="drawer__item" key={item.to}>
              {item.menu === "services" ? (
                <>
                  <button
                    className="drawer__link"
                    onClick={() => setDrawerSection(drawerSection === "svc" ? null : "svc")}
                    aria-expanded={drawerSection === "svc"}
                  >
                    {"Services "}
                    <span className="caret" />
                  </button>
                  {drawerSection === "svc" && (
                    <div className="drawer__sub">
                      <Link to="/services">All services</Link>
                      {VERTICALS.map((sub) => (
                        <details className={`tone-${sub.color}`} key={sub.slug}>
                          <summary>
                            {sub.icon} {sub.name}
                          </summary>
                          <Link to={`/services/${sub.slug}`}>Overview</Link>
                          {sub.services.map((service) => (
                            <Link to={`/services/${sub.slug}/${service.slug}`} key={service.slug}>
                              {service.name}
                            </Link>
                          ))}
                          {svcExtra(sub.slug).map((x) => (
                            <Link to={x.to || x.href} key={"x" + (x.to || x.href)}>
                              {x.name || x.t || x.label}
                            </Link>
                          ))}
                        </details>
                      ))}
                    </div>
                  )}
                </>
              ) : item.menu === "portals" ? (
                <>
                  <NavLink to="/portals" end={true} className="drawer__link">
                    Portals
                  </NavLink>
                  <div className="drawer__sub">
                    {PORTALS.map((sub) => (
                      <Link to={`/portals/${sub.slug}`} className="drawer__portal" key={sub.slug}>
                        <FRL_Plate k={sub.slug} h={26} flat={true} className="drawer__logo14" />
                        <span>{sub.name}</span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : item.menu === "about" ? (
                <>
                  {ABOUT_MENU.map((sub) => (
                    <NavLink to={sub.to} className="drawer__link" key={sub.to}>
                      {sub.t}
                    </NavLink>
                  ))}
                </>
              ) : item.menu === "downloads" ? (
                <>
                  <NavLink to="/downloads" end={true} className="drawer__link">
                    Downloads
                  </NavLink>
                  <div className="drawer__sub">
                    {DL5_SECS.map((sub) => (
                      <Link to={dlTo(sub)} key={sub.k}>
                        {sub.t}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <NavLink to={item.to} end={item.end} className="drawer__link">
                  {item.label}
                </NavLink>
              )}
            </div>
          ))}
          <SR_NavItem mobile={true} />
          <Link to="/lets-talk" className="btn btn--primary btn--block">
            Let's Talk
          </Link>
        </nav>
      </div>
      {drawerOpen && <button className="drawer__scrim" aria-label="Close menu" onClick={() => setDrawerOpen(false)} />}
      {openMenu && <div className="mega__scrim" aria-hidden="true" onMouseEnter={() => setOpenMenu(null)} />}
    </>
  );
}

export { SiteHeader };
