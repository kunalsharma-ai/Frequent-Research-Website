/*
 * V4 kit (build 44) — shared shells for the eight rethought IT & Development pages
 * (IT Consulting, Application Maintenance & Support, Cloud & DevOps, AI & Automation, Data Analytics & Dashboards,
 *  Software Testing & QA, Cybersecurity, Website Maintenance & Support).
 * Only page chrome lives here (hero variants, editorial statements, numbered pillars, sector tags, technology lines,
 * closing call-to-action, related-service rail). Every page draws its own signature visuals in its page file, so no two
 * pages share the same diagram. States and shapes only — never invented numbers, clients, certifications or results.
 * Motion: CSS + IntersectionObserver (ppIn); static under prefers-reduced-motion. Styles: src/styles/it-v44.css (v4-).
 */
import * as ee from 'react';
import { HeroH1 } from '../../app/shared/HeroH1.jsx';
import { DK_PARENT_IT, PpL, ppGo, ppIn, ppIt } from './shared.jsx';
import { IX_I, ixCycle } from './ixkit.jsx';

/* hero — variant: "split" (copy left, visual right) | "stack" (centred copy, wide visual below) | "dark" (split on navy) */
function V4_Hero({ id, crumb, variant = "split", kicker, h1, lead, cta, cta2, cta3, points, children, cls = "" }) {
  const go = (x) => (x && x[1] && x[1].charAt(0) !== "/" ? ppGo(x[1]) : undefined);
  const Btn = ({ x, c }) =>
    x[1].charAt(0) === "/" ? (
      <PpL to={x[1]} className={c}>
        {x[0]}
      </PpL>
    ) : (
      <a href={"#" + x[1]} onClick={go(x)} className={c}>
        {x[0]}
      </a>
    );
  return (
    <section className={"v4-hero v4-hero--" + variant + " " + cls} aria-labelledby={id}>
      <div className="v4-hero__bg" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container v4-hero__in">
        <div className="v4-hero__copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL>
            <span>
              <PpL to={DK_PARENT_IT[1]}>{DK_PARENT_IT[0]}</PpL>
            </span>
            <span>
              <span aria-current="page">{crumb}</span>
            </span>
          </nav>
          <span className="v4-hero__kick">{kicker}</span>
          <HeroH1 id={id}>{h1}</HeroH1>
          <p className="v4-hero__lead">{lead}</p>
          <div className="v4-hero__ctas">
            <Btn x={cta} c="btn btn--lg pp-btn" />
            {cta2 && <Btn x={cta2} c="btn btn--lg v4-btn-line" />}
            {cta3 && (
              <a className="v4-hero__text" href={"#" + cta3[1]} onClick={ppGo(cta3[1])}>
                {cta3[0]} <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
          {points && (
            <ul className="v4-hero__pts">
              {points.map((p, k) => (
                <li key={p} style={{ "--k": k }}>
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="v4-hero__vis">{children}</div>
      </div>
    </section>
  );
}

/* editorial statement — large type, accent rule, optional chips that light up in sequence */
function V4_Statement({ kicker, text, accent, sub, chips, tone = "light", id }) {
  const [ref, v] = ppIn(0.35);
  const parts = accent && text.includes(accent) ? text.split(accent) : null;
  return (
    <section ref={ref} className={"v4-say v4-say--" + tone + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container v4-say__in">
        {kicker && <span className="v4-say__k">{kicker}</span>}
        <h2 id={id} className="v4-say__t">
          {parts ? (
            <>
              {parts[0]}
              <em>{accent}</em>
              {parts[1]}
            </>
          ) : (
            text
          )}
        </h2>
        {sub && <p className="v4-say__s">{sub}</p>}
        {chips && (
          <ul className="v4-say__chips">
            {chips.map((c, k) => (
              <li key={c} style={{ "--k": k }}>
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* numbered pillars — editorial two-column list with oversized numerals (Why Frequent Research) */
function V4_Numbered({ items, lead }) {
  const [ref, v] = ppIn(0.15);
  return (
    <div ref={ref} className={"v4-num" + (v ? " is-in" : "")}>
      {lead && <p className="v4-num__lead">{lead}</p>}
      <ol className="v4-num__list">
        {items.map(([t, d], k) => (
          <li key={t} style={{ "--k": k }}>
            <span aria-hidden="true">{String(k + 1).padStart(2, "0")}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* "X, not Y" pairs — typographic principles strip */
function V4_Duo({ items }) {
  const [ref, v] = ppIn(0.2);
  return (
    <ul ref={ref} className={"v4-duo" + (v ? " is-in" : "")}>
      {items.map(([yes, no, d], k) => (
        <li key={yes} style={{ "--k": k }}>
          <p>
            <b>{yes}</b> <s>{no}</s>
          </p>
          {d && <span>{d}</span>}
        </li>
      ))}
    </ul>
  );
}

/* sector tags — compact "sector → priorities" matrix linked to the existing industry pages */
function V4_Tags({ items, note }) {
  return (
    <>
      <ul className="v4-tags">
        {items.map(([t, ic, d, slug]) => (
          <li key={t}>
            <PpL to={"/industries-case-studies" + (slug ? "/" + slug : "")}>
              <span className="v4-tags__ic">
                <IX_I n={ic} s={16} />
              </span>
              <b>{t}</b>
              <span className="v4-tags__d">{d}</span>
            </PpL>
          </li>
        ))}
      </ul>
      {note && <p className="ix-note">{note}</p>}
    </>
  );
}

/* technology line — grouped by role, not a logo wall */
function V4_TechLine({ groups, note }) {
  return (
    <div className="v4-tech">
      <dl>
        {groups.map(([t, list]) => (
          <div key={t}>
            <dt>{t}</dt>
            <dd>
              {list.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      {note && <p className="ix-note">{note}</p>}
    </div>
  );
}

/* closing call-to-action — variant "split" (navy, checklist right) | "light" (white, ruled) */
function V4_Close({ id, kicker, title, text, cta, cta2, checks, variant = "split" }) {
  return (
    <section className={"v4-close v4-close--" + variant} aria-labelledby={id}>
      <div className="container v4-close__in">
        <div>
          {kicker && <span className="v4-close__k">{kicker}</span>}
          <h2 id={id}>{title}</h2>
          <p>{text}</p>
          <div className="v4-close__ctas">
            <a href={"#" + cta[1]} onClick={ppGo(cta[1])} className="btn btn--lg pp-btn">
              {cta[0]} <span aria-hidden="true">→</span>
            </a>
            {cta2 && (
              <PpL to={cta2[1]} className="btn btn--lg v4-btn-line">
                {cta2[0]}
              </PpL>
            )}
          </div>
        </div>
        {checks && (
          <ul className="v4-close__checks">
            {checks.map((c) => (
              <li key={c}>
                <IX_I n="check" s={16} />
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* related services — horizontal rail of linked service names */
function V4_Rail({ id, title, items }) {
  return (
    <section className="v4-rail" aria-labelledby={id}>
      <div className="container">
        <h2 id={id}>{title}</h2>
        <ul>
          {items.map(([t, slug, why]) => (
            <li key={t}>
              <PpL to={slug ? ppIt(slug) : "/services/it-development"}>
                <b>{t}</b>
                <span>{why}</span>
              </PpL>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* small helper: selected-index state that also auto-advances while visible (until the visitor interacts) */
function v4Pick(n, v, ms) {
  const [held, setHeld] = ee.useState(false);
  const [i, setI] = ixCycle(n, v, ms, held);
  const pick = (k) => {
    setHeld(true);
    setI(k);
  };
  return [i, pick, held];
}

export { V4_Close, V4_Duo, V4_Hero, V4_Numbered, V4_Rail, V4_Statement, V4_Tags, V4_TechLine, v4Pick };
