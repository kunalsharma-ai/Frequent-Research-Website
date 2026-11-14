/*
 * Products — Sampledge family presentation (build 55). Prefix FRX_. Styles: src/styles/products.css (frx-).
 *
 * Both products carry the same Sampledge icon (FRK_SamLogo) with a sub-title:
 *   Sampledge — Project Management Tool   /products/sampledge                    (base product data name: "Sampledge")
 *   Sampledge — SampAudience  /products/panel-audience-marketplace   (name patched to "SampAudience" in build 65;
 *                                                                                 URL unchanged on purpose — see README)
 *  FRX_MenuProducts   Products mega-menu (replaces the base PRODUCTS.map cards)
 *  FRX_HomeProducts   home section "Technology built for research & audience intelligence" (replaces the base section)
 *  frxTitle(product)  heading text used on /products cards
 * Content (taglines, intros, capability lists) comes from the base product data `PRODUCTS`, so it stays in one place.
 */
import * as ee from 'react';
import { PRODUCTS } from '../../app/data/products.jsx';
import { PpL } from '../dm/shared.jsx';
import { SAM_HERO } from '../../data/samHero.jsx';
import { FRK_I, FRK_SamLogo, frkIn } from './FrKit.jsx';
import { PR5_LIST } from '../../data/Sampledge65.jsx';
import { SX8_Home, SX8_Menu } from './Sampledge8.jsx';
import { PR5_Logo } from './PR5Logo.jsx';

const FRX_SUB = { sampledge: "Project Management Tool", "panel-audience-marketplace": "SampAudience" };
const FRX_TONE = { sampledge: "pm", "panel-audience-marketplace": "diy" };
const frxTitle = (p) => (p && FRX_SUB[p.slug] ? `Sampledge — ${FRX_SUB[p.slug]}` : p ? p.name : "");
const frxProducts = () => (Array.isArray(PRODUCTS) ? PRODUCTS : []);

/* the shared lockup: Sampledge icon + wordmark + sub-title pill */
function FRX_Lockup({ slug, h = 26, tone = "light", sub = true }) {
  return (
    <span className={"frx-lock frx-lock--" + FRX_TONE[slug] + " frx-lock--" + tone}>
      <FRK_SamLogo h={h} tone={tone} label={frxTitle({ slug, name: "Sampledge" })} />
      {sub && <em className="frx-lock__sub">{FRX_SUB[slug]}</em>}
    </span>
  );
}

/* build 57 — new menu scenes: a quota ring that fills while project dots orbit (project management) and audience chips
   dropping into a funnel that prints a "feasible" ticket (DIY marketplace) */
function FRX_MiniPM() {
  return (
    <span className="frx-mini frx-mini--pm2" aria-hidden="true">
      <svg viewBox="0 0 80 80" className="frx-ring">
        <circle cx="40" cy="40" r="28" className="frx-ring__bg" />
        <circle cx="40" cy="40" r="28" className="frx-ring__fg" pathLength="100" />
      </svg>
      <b className="frx-ring__t">
        <FRK_I n="check" s={16} sw={3} />
      </b>
      {[0, 1, 2].map((i) => (
        <i key={i} className="frx-ring__dot" style={{ "--i": i }} />
      ))}
    </span>
  );
}
function FRX_MiniDIY() {
  return (
    <span className="frx-mini frx-mini--diy2" aria-hidden="true">
      {["#22D3EE", "#FFD166", "#FF6B8B"].map((c, i) => (
        <i key={c} className="frx-drop" style={{ "--c": c, "--i": i }} />
      ))}
      <span className="frx-funnel" />
      <b className="frx-ticket">
        <FRK_I n="check" s={10} sw={3} /> feasible
      </b>
    </span>
  );
}

function FRX_MenuProducts() {
  /* update 8: seven equal Sampledge products (Sampledge8.jsx) */
  return <SX8_Menu />;
  return (
    <>
      {frxProducts().map((p) => (
        <PpL key={p.slug} to={`/products/${p.slug}`} className={"mega__product frx-menu frx-menu--" + FRX_TONE[p.slug]}>
          {FRX_TONE[p.slug] === "pm" ? <FRX_MiniPM /> : <FRX_MiniDIY />}
          <span className="frx-menu__body">
            <FRX_Lockup slug={p.slug} h={22} tone="dark" />
            <span className="frx-menu__tag">{p.tagline}</span>
          </span>
          <span className="frx-menu__go" aria-hidden="true">
            <FRK_I n="arrow" s={16} />
          </span>
        </PpL>
      ))}
      <div className="mega__product frx-menu frx-menu--sx">
          <span className="frx-sx__head">
            <strong>All {PR5_LIST.length} Sampledge products</strong>
            <PpL to="/products">See them side by side →</PpL>
          </span>
          <span className="frx-sx__grid">
            {PR5_LIST.map((p) => (
              <PpL key={p.id} to={"/products/" + p.id} className="frx-sx__it" style={{ "--p1": p.c1, "--p2": p.c2 }}>
                <PR5_Logo p={p} v="mark" still />
                <span>
                  <b>{p.short}</b>
                  <small>{p.cat}</small>
                </span>
              </PpL>
            ))}
          </span>
        </div>
    </>
  );
}

/* home section: one Sampledge core, two tools */
/* build 57 — home stages. Project management: the real Sampledge screen as the base layer of a 3D stack, with
   module cards (Quotas · Suppliers · Fieldwork · Invoices) lifting off in turn and a progress ring. DIY marketplace:
   audience chips (consumer · B2B · healthcare) fall into a glowing funnel that prints a "Feasibility ready" ticket. */
const FRX_MODS = [
  ["Quotas", "target"],
  ["Suppliers", "users"],
  ["Fieldwork", "globe"],
  ["Invoices", "file"],
];
function FRX_PMStage() {
  const shot = SAM_HERO.pm;
  return (
    <div className="frx-stage frx-stage--pm2" aria-hidden="true">
      <div className="frx-stack">
        <div className="frx-stack__base">
          {shot && <img src={shot[0]} width={shot[1]} height={shot[2]} alt="" loading="lazy" decoding="async" />}
        </div>
        {FRX_MODS.map(([t, ic], i) => (
          <span key={t} className="frx-mod" style={{ "--i": i }}>
            <span>
              <FRK_I n={ic} s={16} />
            </span>
            {t}
            <i />
          </span>
        ))}
      </div>
      <span className="frx-prog">
        <svg viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="24" className="frx-prog__bg" />
          <circle cx="30" cy="30" r="24" className="frx-prog__fg" pathLength="100" />
        </svg>
        <FRK_I n="layers" s={18} />
      </span>
    </div>
  );
}
const FRX_AUD = [
  ["Consumer", "users", "#22D3EE"],
  ["B2B", "brief", "#FFD166"],
  ["Healthcare", "heart", "#FF6B8B"],
];
function FRX_DIYStage() {
  return (
    <div className="frx-stage frx-stage--diy2" aria-hidden="true">
      {FRX_AUD.map(([t, ic, c], i) => (
        <span key={t} className="frx-fall" style={{ "--c": c, "--i": i }}>
          <FRK_I n={ic} s={14} /> {t}
        </span>
      ))}
      <span className="frx-bigfunnel">
        <i />
      </span>
      <span className="frx-out">
        <FRK_I n="check" s={16} sw={3} /> Feasibility ready
      </span>
      <span className="frx-filters">
        {["Location", "Job role", "Specialty"].map((t, i) => (
          <em key={t} style={{ "--i": i }}>
            {t}
          </em>
        ))}
      </span>
    </div>
  );
}

function FRX_Card({ p, i, inV }) {
  const t = FRX_TONE[p.slug];
  const lists = Object.entries(p.sections || {});
  const pts = (lists[0] ? lists[0][1] : []).slice(0, 4);
  return (
    <article className={"frx-card frx-card--" + t + (inV ? " is-in" : "")} style={{ "--d": i * 0.15 + "s" }}>
      {t === "pm" ? <FRX_PMStage /> : <FRX_DIYStage />}
      <div className="frx-card__body">
        <h3 className="frx-card__h">
          <FRX_Lockup slug={p.slug} h={30} />
        </h3>
        <p className="frx-card__tag">{p.tagline}</p>
        <p className="frx-card__intro">{p.intro}</p>
        {pts.length > 0 && (
          <ul className="frx-card__pts" aria-label={lists[0][0]}>
            {pts.map((x, k) => (
              <li key={x} style={{ "--k": k }}>
                <FRK_I n="check" s={13} sw={3} /> {x}
              </li>
            ))}
          </ul>
        )}
        <div className="frx-card__cta">
          <PpL className="frx-btn frx-btn--solid" to={`/products/${p.slug}`}>
            Explore {FRX_SUB[p.slug]} <FRK_I n="arrow" s={16} />
          </PpL>
          <PpL className="frx-btn frx-btn--ghost" to={`/lets-talk?type=${t === "pm" ? "demo" : "audience"}`}>
            {p.cta}
          </PpL>
        </div>
      </div>
    </article>
  );
}

function FRX_HomeProducts() {
  /* update 8: the seven-product switcher (Sampledge8.jsx) replaces this section */
  return <SX8_Home />;
  const [ref, inV] = frkIn(0.15);
  const list = frxProducts();
  return (
    <section ref={ref} className={"frx" + (inV ? " is-in" : "")} aria-labelledby="prod-title">
      <div className="frx__bg" aria-hidden="true">
        <i />
        <i />
        <span className="frx__beams" />
      </div>
      <div className="container">
        <header className="frx__head">
          <span className="frx__kick">
            <i aria-hidden="true" /> Built in-house by our research team
          </span>
          <h2 id="prod-title">
            Technology built for research <em>&amp; audience intelligence</em>
          </h2>
          <div className="frx__core" aria-hidden="true">
            <span className="frx__ring" />
            <span className="frx__ring frx__ring--2" />
            <FRK_SamLogo h={54} word={false} label="Sampledge" />
          </div>
          <p>One Sampledge family, two tools — run your research projects, or build your own audience.</p>
        </header>
        <div className="frx__duo">
          {list.map((p, i) => (
            <FRX_Card key={p.slug} p={p} i={i} inV={inV} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { FRX_HomeProducts, FRX_Lockup, FRX_MenuProducts };
