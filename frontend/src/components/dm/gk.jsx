import { HeroH1 } from '../../app/shared/HeroH1.jsx';
/*
 * Growth kit (build 34) — the Digital Marketing "Digital Growth, Built Around the Business" identity.
 * Prefix GX_ ; styles in src/styles/dm-gk.css (prefix gx-).
 * Rules: content is never hidden waiting for an animation (motion only adds emphasis), every interactive
 * visual is keyboard-usable, reduced motion is respected, no invented numbers, no example boxes,
 * no market-research positioning, no team details.
 */
const GX_MOTTO = ["Turn attention into action.", "Turn data into better decisions."];

/* Auto-cycling index that pauses when the user interacts. Returns [index, pick]. */
function gxCycle(n, ms, active) {
  const [i, setI] = ee.useState(0);
  const [held, setHeld] = ee.useState(false);
  ee.useEffect(() => {
    if (!active || held || ppR()) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [active, held, n, ms]);
  return [i, (k) => { setHeld(true); setI(k); }];
}
const gxRing = (n, r = 40, start = -90, cx = 50, cy = 50) =>
  Array.from({ length: n }, (_, k) => {
    const a = ((start + (360 / n) * k) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  });

/* Section shell. look adds a page-specific background treatment. */
function GX_Sec({ id, tone = "light", look = "", className = "", children }) {
  const [ref, v] = ppIn(0.08);
  return (
    <section ref={ref} className={`gx-sec gx-sec--${tone} ${look ? "gx-look-" + look : ""} ${className}` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">{typeof children === "function" ? children(v) : children}</div>
    </section>
  );
}
function GX_Head({ id, k, t, s, center, light }) {
  return (
    <div className={"gx-head" + (center ? " gx-head--c" : "") + (light ? " gx-head--l" : "")}>
      {k && <span className="gx-kick">{k}</span>}
      <h2 id={id}>{t}</h2>
      {s && <p>{s}</p>}
    </div>
  );
}

/* Hero with composition variants: split | rev | center | dark */
function GX_Hero({ id, crumb, parent = DK_PARENT_DM, kicker, h1, tag, lead, cta, cta2, layout = "split", vis, chips }) {
  return (
    <section className={"gx-hero gx-hero--" + layout} aria-labelledby={id}>
      <div className="gx-hero__bg" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container gx-hero__in">
        <div className="gx-hero__txt">
          <nav className="crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL>
            <span>
              <PpL to={parent[1]}>{parent[0]}</PpL>
            </span>
            <span>
              <span aria-current="page">{crumb}</span>
            </span>
          </nav>
          <span className="gx-kick">{kicker}</span>
          <HeroH1 id={id}>{h1}</HeroH1>
          {tag && <p className="gx-hero__tag">{tag}</p>}
          <p className="gx-hero__lead">{lead}</p>
          <div className="gx-ctas">
            <a href={"#" + cta[1]} onClick={ppGo(cta[1])} className="btn btn--lg pp-btn">
              {cta[0]} <span aria-hidden="true">→</span>
            </a>
            {cta2 &&
              (cta2[2] ? (
                <a href={"#" + cta2[1]} onClick={ppGo(cta2[1])} className="btn btn--lg gx-btn-ghost">
                  {cta2[0]}
                </a>
              ) : (
                <PpL to={cta2[1]} className="btn btn--lg gx-btn-ghost">
                  {cta2[0]}
                </PpL>
              ))}
          </div>
          {chips && (
            <ul className="gx-hero__chips">
              {chips.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="gx-hero__vis">{vis}</div>
      </div>
    </section>
  );
}

/* Strategist statements — one highlighted at a time; all readable. */
function GX_Say({ id, lines, tone = "off", label = "Point of view" }) {
  const [ref, v] = ppIn(0.3);
  const [on, pick] = gxCycle(lines.length, 3200, v);
  return (
    <section ref={ref} className={"gx-say gx-sec--" + tone + (v ? " is-in" : "")} aria-label={label}>
      <div className="container">
        <ol className="gx-say__list">
          {lines.map((t, k) => (
            <li key={t} className={k === on ? "is-on" : ""}>
              <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
                {t}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* The Frequent Research Advantage — three looks: "flip" (generic → FR rows), "pillars" (statement + pillars), "tabs". */
function GX_Advantage({ id, title, sub, rows, look = "flip", statement, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  return (
    <GX_Sec id={id} tone={tone} className={"gx-adv gx-adv--" + look}>
      <GX_Head id={id} k="The Frequent Research advantage" t={title} s={sub} center={look !== "pillars"} light={tone === "dark"} />
      {look === "flip" && (
        <div className="gx-adv__flip">
          <div className="gx-adv__hd" aria-hidden="true">
            <span>Typical approach</span>
            <span>Frequent Research approach</span>
          </div>
          {rows.map(([g, f, why], k) => (
            <div key={f} className="gx-adv__row" style={{ "--k": k }}>
              <p className="gx-adv__g">{g}</p>
              <span className="gx-adv__arr" aria-hidden="true">→</span>
              <div className="gx-adv__f">
                <b>{f}</b>
                <small>{why}</small>
              </div>
            </div>
          ))}
        </div>
      )}
      {look === "pillars" && (
        <div className="gx-adv__pil">
          <p className="gx-adv__stmt">{statement}</p>
          <ul>
            {rows.map(([ic, f, why], k) => (
              <li key={f} style={{ "--k": k }}>
                <span>
                  <PpI n={ic} s={18} />
                </span>
                <b>{f}</b>
                <small>{why}</small>
              </li>
            ))}
          </ul>
        </div>
      )}
      {look === "tabs" && (
        <div className="gx-adv__tabs">
          <div role="tablist" aria-label={title}>
            {rows.map(([t], k) => (
              <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                {t}
              </button>
            ))}
          </div>
          <div className="gx-adv__pane" role="tabpanel" key={on}>
            <b>{rows[on][1]}</b>
            <p>{rows[on][2]}</p>
          </div>
        </div>
      )}
    </GX_Sec>
  );
}

/* "What this changes for your business" — six looks. items: [title, text, icon][] */
function GX_Value({ id, title = "What This Changes for Your Business", sub, items, look = "tiles", tone = "off", k = "Business value" }) {
  const [ref, v] = ppIn(0.2);
  const [on, pick] = gxCycle(items.length, 2600, v);
  return (
    <section ref={ref} className={`gx-sec gx-sec--${tone} gx-val gx-val--${look}` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <GX_Head id={id} k={k} t={title} s={sub} center light={tone === "dark"} />
        <ol className="gx-val__set">
          {items.map(([t, d, ic], i) => (
            <li key={t} className={i === on ? "is-on" : ""} style={{ "--k": i, "--n": items.length }}>
              <button type="button" onClick={() => pick(i)} onMouseEnter={() => pick(i)} aria-pressed={i === on}>
                <span className="gx-val__ic">
                  <PpI n={ic} s={18} />
                </span>
                <b>{t}</b>
                <small>{d}</small>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* AI-assisted, human-led — compact split used where a page needs the principle stated plainly. */
function GX_AiPair({ ai, human }) {
  return (
    <div className="gx-aip">
      <div>
        <small>
          <PpI n="cpu" s={13} /> AI assists
        </small>
        <ul>
          {ai.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div>
        <small>
          <PpI n="user" s={13} /> People decide
        </small>
        <ul>
          {human.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* Related services as a compact connected rail. links: [title, why, slug][] */
function GX_Next({ id, title = "Where This Connects Next", sub, links, tone = "light" }) {
  return (
    <GX_Sec id={id} tone={tone} className="gx-next">
      <GX_Head id={id} k="Connected services" t={title} s={sub} />
      <ul className="gx-next__rail">
        {links.map(([t, why, slug], k) => (
          <li key={t} style={{ "--k": k }}>
            <PpL to={ppDm(slug)}>
              <b>{t}</b>
              <small>{why}</small>
              <span aria-hidden="true">→</span>
            </PpL>
          </li>
        ))}
      </ul>
    </GX_Sec>
  );
}

/* Closing: marketing that learns. */
function GX_Close({ id, title, text, loop, cta, formId, alt }) {
  return (
    <section className="gx-close" aria-labelledby={id}>
      <div className="container gx-close__in">
        <span className="gx-kick gx-kick--l">{GX_MOTTO.join(" ")}</span>
        <h2 id={id}>{title}</h2>
        <p>{text}</p>
        {loop && (
          <ol className="gx-close__loop">
            {loop.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        )}
        <div className="gx-ctas gx-ctas--c">
          <a href={"#" + formId} onClick={ppGo(formId)} className="btn btn--lg pp-btn">
            {cta} <span aria-hidden="true">→</span>
          </a>
          {alt && (
            <PpL to={alt[1]} className="btn btn--lg pp-btn-ghost">
              {alt[0]}
            </PpL>
          )}
        </div>
      </div>
    </section>
  );
}

/* Page metadata + schema in one call. */
function gxMeta(key, c) {
  Ma(c.maTitle, c.desc);
  dmMeta(c.url, c.title, c.desc);
  dmSchema(key, { path: c.url, crumb: c.crumb, name: c.name, serviceType: c.serviceType, description: c.schemaDesc, faq: c.faq });
}
