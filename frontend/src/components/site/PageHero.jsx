/*
 * Page heroes (build 52). Prefix PH_ / FR_PageHero / FRI_. Styles: src/styles/page-hero.css (ph-).
 *
 *  FR_PageHero  replaces the base shared hero (PageHero) on every page that used it (team, portals, portal pages, blog,
 *               services, products, careers, privacy …). Same props, same H1 text, crumbs, intro and CTAs; adds a
 *               per-page colour grade, a word-by-word headline reveal and an animated art panel chosen by the path.
 *  FRI_Hero     replaces the industries hub hero (IN_HubHero): sector-group "carousel in orbit" + honest stats
 *               (case studies split into client and illustrative, so the hero never overstates).
 * All motion is CSS (transform/opacity only) and stops under prefers-reduced-motion. Art is aria-hidden.
 */
import * as ee from 'react';
import { HeroH1 } from '../../app/shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { useLazy } from '../../app/data/useLazy.js';
import { fullNow } from '../../app/full.js';
import { navPath } from '../../app/nav.jsx';
import { PORTALS } from '../../app/data/site.jsx';
import { BR_Panel, panelLogo } from '../../app/shared/PanelMark.jsx';
import { FRK_Emblem, FRK_I, FRK_SamLogo, FRK_V, FRK_VKEYS, frkReduce, frkV } from './FrKit.jsx';
import { friUse } from './I18n.jsx';
import { MKA_Art, MKA_Logo } from './MarketplaceArt.jsx';

const PH_THEMES = {
  portals: { a: "#F0457E", b: "#FF9F43", c: "#1B0B3A", k: "Research communities", art: "portals" },
  portal: { a: "#FF6B6B", b: "#FFB020", c: "#22093A", k: "Research panel", art: "portal" },
  blog: { a: "#7C4DFF", b: "#22D3EE", c: "#0B0B3D", k: "Guides & insights", art: "blog" },
  team: { a: "#12C9A0", b: "#1E5BFF", c: "#04233A", k: "Our people", art: "team" },
  careers: { a: "#2EE6A6", b: "#F4C152", c: "#062B26", k: "Careers", art: "careers" },
  services: { a: "#1E5BFF", b: "#F0457E", c: "#090D3F", k: "Four teams", art: "services" },
  products: { a: "#2F6BFF", b: "#7B4DFF", c: "#070B3A", k: "Products", art: "products" },
  privacy: { a: "#0F9D74", b: "#22D3EE", c: "#05212F", k: "Trust & privacy", art: "privacy" },
  base: { a: "#1E5BFF", b: "#22D3EE", c: "#070B3A", k: "Frequent Research", art: "base" },
};
function phTheme() {
  const p = navPath();
  if (/^\/portals\/./.test(p)) return "portal";
  if (/^\/portals/.test(p)) return "portals";
  if (/^\/blog/.test(p)) return "blog";
  if (/^\/our-team/.test(p)) return "team";
  if (/^\/careers/.test(p)) return "careers";
  if (/^\/services/.test(p)) return "services";
  if (/^\/products/.test(p)) return "products";
  if (/privacy|cookie|terms|data-protection|research-ethics/.test(p)) return "privacy";
  return "base";
}
/* headline: words rise in one by one; the last word gets the gradient */
function PH_Title({ text, icon }) {
  const words = String(text || "").split(" ");
  /* build 58: in another language the headline is shown as one piece, so it can be translated as a whole sentence */
  const fri = friUse();
  if (fri.lang !== "en")
    return (
      <HeroH1 className="ph-h1">
        {icon && (
          <span className="page-hero__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="ph-one">{text}</span>
      </HeroH1>
    );
  return (
    <HeroH1 className="ph-h1">
      {icon && (
        <span className="page-hero__icon" aria-hidden="true">
          {icon}
        </span>
      )}
      <span className="frk-sr">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className={"ph-w" + (i === words.length - 1 ? " ph-w--last" : "")} style={{ "--i": i }}>
            {w}{" "}
          </span>
        ))}
      </span>
    </HeroH1>
  );
}

/* ── arts ─────────────────────────────────────────────────────────────────────────────── */
function PH_ArtPortals() {
  const R = PORTALS;
  return (
    <div className="ph-art ph-portals" aria-hidden="true">
      <span className="ph-portals__core">
        <FRK_Emblem size={90} />
      </span>
      <span className="ph-portals__ring ph-portals__ring--1" />
      <span className="ph-portals__ring ph-portals__ring--2" />
      <div className="ph-portals__orbit">
        {R.map((p, k) => (
          <span key={p.slug} className="ph-portals__sat" style={{ "--k": k, "--n": R.length }}>
            <span className="ph-portals__plate"><BR_Panel p={p} size="sm" src={panelLogo(p)} /></span>
          </span>
        ))}
      </div>
      {Array.from({ length: 10 }, (_, k) => (
        <i key={k} className="ph-portals__dot" style={{ "--k": k }} />
      ))}
      {["Consumers", "Professionals", "Teens", "HCPs"].map((t, k) => (
        <em key={t} className="ph-portals__tag" style={{ "--k": k }}>
          + {t}
        </em>
      ))}
    </div>
  );
}
function PH_ArtBlog() {
  /* build 74: the blog posts (over a megabyte) come with the rest of the site, not with the home page */
  const BLOG_POSTS = useLazy("blog-posts", () => import("../../app/data/blogPosts.jsx").then((m) => m.BLOG_POSTS), () => fullNow()?.BLOG_POSTS);
  const P = BLOG_POSTS ? BLOG_POSTS.slice(0, 4) : [];
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (frkReduce() || P.length < 2) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % P.length), 3200);
    return () => clearInterval(t);
  }, [P.length]);
  return (
    <div className="ph-art ph-blog" aria-hidden="true">
      {P.map((p, k) => {
        const d = (k - i + P.length) % P.length;
        const v = frkV(p.vertical);
        return (
          <span key={p.slug} className="ph-blog__card" style={{ "--d": d, "--v1": v.c1, "--v2": v.c2 }}>
            <span className="ph-blog__cover">
              <FRK_I n={v.ic} s={26} />
            </span>
            <small>{v.name}</small>
            <b>{p.title.split(":")[0]}</b>
            <i />
            <i />
            <em>{p.readTime ? p.readTime + " min read" : "Guide"}</em>
          </span>
        );
      })}
      <span className="ph-blog__pen">
        <FRK_I n="file" s={18} /> Writing the next guide<i />
      </span>
    </div>
  );
}
function PH_ArtTeam() {
  const roles = [
    ["Researchers", "market-research"],
    ["Marketers", "digital-marketing"],
    ["Engineers", "it-development"],
    ["Finance", "accounts-finance"],
  ];
  return (
    <div className="ph-art ph-team" aria-hidden="true">
      <span className="ph-team__core">
        <b>One</b>
        <small>team</small>
      </span>
      {roles.map(([t, w], k) => {
        const v = FRK_V[w];
        return (
          <span key={t} className="ph-team__node" style={{ "--k": k, "--v1": v.c1, "--v2": v.c2 }}>
            <span>
              <FRK_I n={v.ic} s={22} />
            </span>
            <em>{t}</em>
          </span>
        );
      })}
      <svg className="ph-team__links" viewBox="0 0 400 400">
        <circle cx="200" cy="200" r="130" />
        <circle cx="200" cy="200" r="80" />
      </svg>
    </div>
  );
}
function PH_ArtCareers() {
  return (
    <div className="ph-art ph-careers" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((k) => (
        <span key={k} className="ph-careers__step" style={{ "--k": k }}>
          <i />
        </span>
      ))}
      <span className="ph-careers__climber">
        <FRK_I n="rocket" s={30} />
      </span>
      {["Learn", "Build", "Lead"].map((t, k) => (
        <em key={t} className="ph-careers__tag" style={{ "--k": k }}>
          {t}
        </em>
      ))}
    </div>
  );
}
function PH_ArtServices() {
  return (
    <div className="ph-art ph-svc" aria-hidden="true">
      <div className="ph-svc__cube">
        {FRK_VKEYS.map((k, i) => {
          const v = FRK_V[k];
          return (
            <span key={k} className="ph-svc__face" style={{ "--i": i, "--v1": v.c1, "--v2": v.c2 }}>
              <FRK_I n={v.ic} s={34} />
              <b>{v.name}</b>
            </span>
          );
        })}
      </div>
      <span className="ph-svc__shadow" />
    </div>
  );
}
function PH_ArtProducts() {
  return (
    <div className="ph-art ph-prod" aria-hidden="true">
      <span className="ph-prod__card ph-prod__card--1">
        <FRK_SamLogo h={30} label="Sampledge" />
        <i />
        <i />
        <i />
      </span>
      <span className="ph-prod__card ph-prod__card--2"><MKA_Logo h={22} tone="dark" /></span>
      <span className="ph-prod__globe"><MKA_Art small /></span>
    </div>
  );
}
function PH_ArtPrivacy() {
  return (
    <div className="ph-art ph-priv" aria-hidden="true">
      {[0, 1, 2].map((k) => (
        <span key={k} className="ph-priv__ring" style={{ "--k": k }} />
      ))}
      <span className="ph-priv__shield">
        <FRK_I n="shield" s={64} sw={1.4} />
        <span className="ph-priv__lock">
          <FRK_I n="lock" s={26} sw={2} />
        </span>
      </span>
      {["Consent", "Encryption", "ISO 27001", "GDPR-aligned"].map((t, k) => (
        <em key={t} className="ph-priv__tag" style={{ "--k": k }}>
          <FRK_I n="check" s={12} sw={3} /> {t}
        </em>
      ))}
    </div>
  );
}
function PH_ArtBase() {
  return (
    <div className="ph-art ph-base" aria-hidden="true">
      <FRK_Emblem size={150} spin />
    </div>
  );
}
const PH_ARTS = { portals: PH_ArtPortals, portal: PH_ArtPortals, blog: PH_ArtBlog, team: PH_ArtTeam, careers: PH_ArtCareers, services: PH_ArtServices, products: PH_ArtProducts, privacy: PH_ArtPrivacy, base: PH_ArtBase };

function FR_PageHero({ title, intro, tone, crumbs = [], children, icon }) {
  const key = phTheme();
  const t = PH_THEMES[key];
  const Art = PH_ARTS[t.art] || PH_ArtBase;
  ;
  return (
    <section className={"page-hero ph ph--" + key + (tone ? " tone-" + tone : "")} style={{ "--pa": t.a, "--pb": t.b, "--pc": t.c }}>
      <div className="ph__bg" aria-hidden="true">
        <i />
        <i />
        <span className="ph__noise" />
      </div>
      <div className="container ph__in">
        <div className="ph__copy">
          {crumbs.length > 0 && (
            <nav className="crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              {crumbs.map((o) => (
                <span key={o.label}>{o.to ? <Link to={o.to}>{o.label}</Link> : <span aria-current="page">{o.label}</span>}</span>
              ))}
            </nav>
          )}
          <span className="ph__kick">
            <i aria-hidden="true" />
            {t.k}
          </span>
          <PH_Title text={title} icon={icon} />
          {intro && <p className="page-hero__intro ph__intro">{intro}</p>}
          {children}
        </div>
        <Art />
      </div>
    </section>
  );
}

/* ── industries hub hero ──────────────────────────────────────────────────────────────── */

export { FR_PageHero };
