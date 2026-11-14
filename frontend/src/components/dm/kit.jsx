/*
 * Digital Marketing section kit — reusable, data-driven sections for service pages
 * (Social Media Advertising, Content Marketing, Performance Marketing, Lead Generation, ...).
 * Depends on src/components/dm/shared.jsx. Styles: src/styles/dm-kit.css (prefix `dk-`).
 *
 * Rules baked in: no team-member details, no numbers presented as results, every animated
 * visual has a text equivalent, prefers-reduced-motion respected (via ppR + CSS).
 */
import * as ee from 'react';
import { HeroH1 } from '../../app/shared/HeroH1.jsx';
import { INDUSTRIES } from '../../app/data/industries.jsx';
import { DK_PARENT_DM, PP_Count, PP_Head, PpI, PpL, ppGo, ppIn, ppR } from './shared.jsx';

/* Generic section shell with in-view flag. tone: "light" | "off" | "dark" */
function DK_Sec({ id, tone = "light", className = "", children, label }) {
  const [ref, v] = ppIn(0.18);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} ${className}` + (v ? " is-in" : "")} aria-labelledby={label}>
      <div className="container">{typeof children === "function" ? children(v) : children}</div>
    </section>
  );
}

/* ── HERO ─────────────────────────────────────────────────────────────── */
function DK_Hero({ id, crumb, kicker, title, tag, lead, primary, secondary, secondaryTo = "/lets-talk?type=quote", secondaryGo, trust, dark, children, parent = DK_PARENT_DM }) {
  return (
    <section className={"dk-hero" + (dark ? " dk-hero--dark" : "")} aria-labelledby={id}>
      <div className="dk-hero__bg" aria-hidden="true">
        <i className="dk-hero__grid" />
        <i className="dk-hero__glow" />
      </div>
      <div className="container dk-hero__in">
        <div>
          <nav className="crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL>
            <span>
              <PpL to={parent[1]}>{parent[0]}</PpL>
            </span>
            <span>
              <span aria-current="page">{crumb}</span>
            </span>
          </nav>
          <span className={"pp-kick" + (dark ? " pp-kick--light" : "")}>{kicker}</span>
          <HeroH1 id={id}>{title}</HeroH1>
          {tag && <p className="dk-hero__tag">{tag}</p>}
          <p className="dk-hero__lead">{lead}</p>
          <div className="pp-ctas">
            <a href={"#" + primary[1]} onClick={ppGo(primary[1])} className="btn btn--lg pp-btn">
              {primary[0]} <span aria-hidden="true">→</span>
            </a>
            {secondaryGo ? (
              <a href={"#" + secondaryGo} onClick={ppGo(secondaryGo)} className={"btn btn--lg " + (dark ? "pp-btn-ghost" : "sm-btn-outline")}>
                {secondary}
              </a>
            ) : (
              <PpL to={secondaryTo} className={"btn btn--lg " + (dark ? "pp-btn-ghost" : "sm-btn-outline")}>
                {secondary || "Request a Quote"}
              </PpL>
            )}
          </div>
          {trust && (
            <ul className="sm-trust dk-trust">
              {trust.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="dk-hero__vis">{children}</div>
      </div>
    </section>
  );
}

/* Orbit visual: centre label + nodes on a ring, with signals moving out and back.
   nodes: [label, icon, tip?][] — tips appear on hover/focus and are listed for screen readers. */
function DK_Orbit({ center, sub, nodes, dark, children }) {
  const R = 40;
  const [tip, setTip] = ee.useState(-1);
  return (
    <div className={"dk-orb" + (dark ? " dk-orb--dark" : "")}>
      <div className="dk-orb__box">
        <svg className="dk-orb__lines" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r={R} className="ring" />
          {nodes.map((_, k) => {
            const a = (k / nodes.length) * 2 * Math.PI - Math.PI / 2;
            const x = 50 + R * Math.cos(a),
              y = 50 + R * Math.sin(a);
            return (
              <g key={k}>
                <line x1="50" y1="50" x2={x} y2={y} />
                <circle r="1.1" className="out">
                  <animateMotion dur="3s" begin={-(k * 0.37) + "s"} repeatCount="indefinite" path={`M${x} ${y} L50 50`} />
                </circle>
                <circle r="0.9" className="back">
                  <animateMotion dur="3s" begin={-(k * 0.37 + 1.5) + "s"} repeatCount="indefinite" path={`M50 50 L${x} ${y}`} />
                </circle>
              </g>
            );
          })}
        </svg>
        <div className="dk-orb__core" aria-live="polite">
          {tip >= 0 && nodes[tip][2] ? (
            <p>{nodes[tip][2]}</p>
          ) : (
            <>
              {sub && <small>{sub}</small>}
              <b>{center}</b>
            </>
          )}
        </div>
        <ul className="dk-orb__nodes">
          {nodes.map(([t, ic, d], k) => {
            const a = (k / nodes.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <li key={t} style={{ left: 50 + R * Math.cos(a) + "%", top: 50 + R * Math.sin(a) + "%", "--k": k }}>
                <button type="button" onMouseEnter={() => setTip(k)} onMouseLeave={() => setTip(-1)} onFocus={() => setTip(k)} onBlur={() => setTip(-1)}>
                  <span>
                    <PpI n={ic} s={14} />
                  </span>
                  {t}
                  {d && <em className="pp-sr">: {d}</em>}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {children}
    </div>
  );
}

/* Rotating card ticker (hero micro-interaction). items: [title, icon, text][] */

/* Three-column stream visual: inputs → core → outputs (used in heroes and engines). */
function DK_Streams({ inputs, core, coreSub, outputs, dark, steps }) {
  return (
    <div className={"dk-str" + (dark ? " dk-str--dark" : "")}>
      <ul className="dk-str__in">
        {inputs.map(([t, ic], k) => (
          <li key={t} style={{ "--k": k }}>
            <PpI n={ic} s={14} />
            {t}
          </li>
        ))}
      </ul>
      <svg className="dk-str__w dk-str__w--l" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {inputs.map((_, k) => {
          const y = ((k + 0.5) / inputs.length) * 100;
          return <path key={k} d={`M0 ${y} C 50 ${y}, 50 50, 100 50`} style={{ "--k": k }} />;
        })}
      </svg>
      <div className="dk-str__core">
        <small>{coreSub}</small>
        <b>{core}</b>
        {steps && (
          <ol>
            {steps.map((s, k) => (
              <li key={s} style={{ "--k": k }}>
                {s}
              </li>
            ))}
          </ol>
        )}
      </div>
      <svg className="dk-str__w dk-str__w--r" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {outputs.map((_, k) => {
          const y = ((k + 0.5) / outputs.length) * 100;
          return <path key={k} d={`M0 50 C 50 50, 50 ${y}, 100 ${y}`} style={{ "--k": k }} />;
        })}
      </svg>
      <ul className="dk-str__out">
        {outputs.map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── STATEMENT + FLOW ─────────────────────────────────────────────────── */
/* Big editorial statement followed by an animated chain. */
function DK_Statement({ id, quote, flow, tone = "off" }) {
  return (
    <DK_Sec tone={tone} className="dk-stmt" label={id}>
      <p className="dk-stmt__q" id={id}>
        {quote}
      </p>
      {flow && (
        <ol className="dk-chip-flow">
          {flow.map((t, k) => (
            <li key={t} style={{ "--k": k }}>
              {t}
            </li>
          ))}
        </ol>
      )}
    </DK_Sec>
  );
}

/* Problem cards. items: [title, text, icon][] ; optional closing line */
function DK_Problems({ id, kicker, title, sub, items, closing }) {
  return (
    <DK_Sec tone="light" className="pp-prob dk-prob" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center />
      <div className="dk-prob__grid pp-swipe">
        {items.map(([t, d, ic], k) => (
          <article key={t} className="pp-prob__c dk-prob__c" style={{ "--k": k }}>
            <span className="pp-prob__n">{String(k + 1).padStart(2, "0")}</span>
            <span className="dk-prob__ic">
              <PpI n={ic} s={18} />
            </span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      {closing && <p className="dk-prob__close">{closing}</p>}
    </DK_Sec>
  );
}

/* Leaky journey: leaks are "repaired" as the visitor scrolls through the section.
   stages: string[] ; leaks: [label, text][] (one per gap) ; final: string */
function DK_Leak({ id, kicker, title, sub, stages, leaks, final, closing }) {
  const ref = ee.useRef(null);
  const [p, setP] = ee.useState(ppR() ? 1 : 0);
  ee.useEffect(() => {
    if (ppR()) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const b = el.getBoundingClientRect(),
          vh = window.innerHeight;
        setP((x) => Math.max(x, Math.max(0, Math.min(1, (vh * 0.75 - b.top) / (b.height * 0.9)))));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  const fixed = Math.floor(p * (leaks.length + 1));
  const done = p > 0.97;
  return (
    <section className="dk-sec dk-sec--dark dk-leak" aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} light center />
        <div ref={ref} className={"dk-leak__in" + (done ? " is-done" : "")}>
          <ol className="dk-leak__stages">
            {stages.map((s, k) => (
              <li key={s} style={{ "--w": 100 - (k * 55) / stages.length + "%" }}>
                <b>{s}</b>
                {k < leaks.length && (
                  <span className={"dk-leak__hole" + (k < fixed ? " is-fixed" : "")}>
                    <i aria-hidden="true">{k < fixed ? "✓" : ""}</i>
                    <strong>{leaks[k][0]}</strong>
                    <em>{leaks[k][1]}</em>
                  </span>
                )}
              </li>
            ))}
          </ol>
          <div className="dk-leak__final">
            <span>{done ? final : closing}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Vertical/horizontal system flow with question per step. steps: [title, question, icon][] */

/* Engine: inputs → process loop → outputs. The signature visual for several pages. */
function DK_Engine({ id, kicker, title, sub, name, inputs, process, outputs, tone = "dark" }) {
  const [on, setOn] = ee.useState(0);
  const [ref, v] = ppIn(0.3);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const t = setInterval(() => setOn((x) => (x + 1) % process.length), 1600);
    return () => clearInterval(t);
  }, [v, process.length]);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dk-eng` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center />
        <div className="dk-eng__in">
          <div className="dk-eng__col">
            <h3>Inputs</h3>
            <ul>
              {inputs.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="dk-eng__core">
            <b>{name}</b>
            <ol>
              {process.map((t, k) => (
                <li key={t} className={k === on ? "is-on" : ""}>
                  {t}
                </li>
              ))}
            </ol>
            <i className="dk-eng__spin" aria-hidden="true" />
          </div>
          <div className="dk-eng__col dk-eng__col--out">
            <h3>Outputs</h3>
            <ul>
              {outputs.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Research → … flow with a question per step, presented as a ladder with side card. steps: [title, question][] */
function DK_Ladder({ id, kicker, title, sub, steps, note, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  return (
    <DK_Sec tone={tone} className="sm-aud dk-lad" label={id}>
      <div className="sm-aud__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <div className="sm-aud__card" key={on} aria-live="polite">
            <span>
              Step {on + 1} / {steps.length}
            </span>
            <h3>{steps[on][0]}</h3>
            <p>{steps[on][1]}</p>
          </div>
          {note && <p className="dk-note">{note}</p>}
        </div>
        <ol className="sm-aud__stack">
          {steps.map(([t], k) => (
            <li key={t} style={{ "--k": k }}>
              <button type="button" className={on === k ? "is-on" : ""} aria-pressed={on === k} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
                <span>{String(k + 1).padStart(2, "0")}</span>
                {t}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </DK_Sec>
  );
}

/* Funnel stages, each with a description and item chips. stages: [title, text, items[]][] */
function DK_Funnel({ id, kicker, title, sub, stages, tone = "dark" }) {
  return (
    <DK_Sec tone={tone} className="dk-fun" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center />
      <ol className="dk-fun__row">
        {stages.map(([t, d, items], k) => (
          <li key={t} style={{ "--k": k, "--h": 100 - k * 12 }}>
            <span className="dk-fun__bar" aria-hidden="true" />
            <em>{String(k + 1).padStart(2, "0")}</em>
            <h3>{t}</h3>
            {d && <p>{d}</p>}
            <div>
              {items.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </DK_Sec>
  );
}

/* Old vs modern model + optional shift cards. */

/* AI + human two-column section. */

/* Card grid. items: [title, text, icon, tag?, link?][] */
function DK_Cards({ id, kicker, title, sub, items, cols = 3, tone = "light", center }) {
  return (
    <DK_Sec tone={tone} className="dk-cardsec" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center={center} />
      <div className={`dk-cards dk-cards--${cols} pp-swipe`}>
        {items.map(([t, d, ic, tag, to], k) => (
          <article key={t} className="dk-card" style={{ "--k": k }} tabIndex={0}>
            {tag && <em className={"sm-tag sm-tag--" + tag.toLowerCase()}>{tag}</em>}
            <span>
              <PpI n={ic} s={18} />
            </span>
            <h3>{t}</h3>
            <p>{d}</p>
            {to && (
              <PpL to={to} className="dk-card__link">
                Learn more →
              </PpL>
            )}
          </article>
        ))}
      </div>
    </DK_Sec>
  );
}

/* Two (or three) column comparison with a centre message. cols: [title, items[], tone("a"|"b"|"c")][] */
function DK_Compare({ id, kicker, title, sub, cols, center, after, tone = "dark" }) {
  return (
    <DK_Sec tone={tone} className="dk-cmp" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center />
      <div className={"dk-cmp__in dk-cmp__in--" + cols.length}>
        {cols.map(([t, items, c], k) => (
          <div key={t} className={"dk-cmp__col dk-cmp__col--" + c} style={{ "--k": k }}>
            <h3>{t}</h3>
            <ul>
              {items.map((x, j) => (
                <li key={x} style={{ "--j": j }}>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {center && <p className="dk-cmp__mid">{center}</p>}
      {after}
    </DK_Sec>
  );
}

/* Animated horizontal chain of numbered steps. */
function DK_Flow({ id, kicker, title, sub, steps, tone = "light", after, highlightFrom }) {
  return (
    <DK_Sec tone={tone} className="dk-flow" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
      <ol className="sm-ads__flow dk-flow__row" style={{ "--n": Math.min(steps.length, 10) }}>
        {steps.map((t, k) => (
          <li key={t} style={{ "--k": k }} className={highlightFrom != null && k >= highlightFrom ? "is-hl" : ""}>
            <span>{String(k + 1).padStart(2, "0")}</span>
            {t}
          </li>
        ))}
      </ol>
      {after}
    </DK_Sec>
  );
}

/* Circular learning loop (scroll-lit). steps: [title, icon][] */

/* Measurement layers with gauges. layers: [title, items[], icon][] */

/* Monthly report: four questions + abstract dashboard (shapes only, no figures). */
function DK_Report({ id, kicker = "Reporting", title, sub, questions, panels, next, dashTitle }) {
  const [ref, v] = ppIn(0.25);
  const P = {
    trend: (
      <svg viewBox="0 0 200 80" preserveAspectRatio="none">
        <path className="gr" d="M0 20 H200 M0 40 H200 M0 60 H200" />
        <path className="ar" d="M0 70 C 30 66, 50 58, 80 52 S 130 36, 160 26 S 190 14, 200 12 L200 80 L0 80Z" />
        <path className="ln" pathLength="100" d="M0 70 C 30 66, 50 58, 80 52 S 130 36, 160 26 S 190 14, 200 12" />
      </svg>
    ),
    bars: (
      <div className="pp-dash__bars">
        {[48, 76, 36, 62, 54].map((h, k) => (
          <i key={k} style={{ "--h": h + "%", "--k": k }} />
        ))}
      </div>
    ),
    hbars: (
      <div className="sm-dash__hb">
        {[["A", 78], ["B", 56], ["C", 40]].map(([t, w], k) => (
          <span key={t}>
            <small>Segment {t}</small>
            <i style={{ "--w": w + "%", "--k": k }} />
          </span>
        ))}
      </div>
    ),
    funnel: (
      <div className="pp-dash__fun">
        {[100, 70, 44, 24].map((w, k) => (
          <i key={k} style={{ "--w": w + "%", "--k": k }} />
        ))}
      </div>
    ),
    combo: (
      <svg viewBox="0 0 200 80" preserveAspectRatio="none">
        {[14, 34, 54, 74, 94, 114, 134, 154, 174].map((x, k) => (
          <rect key={x} x={x} width="12" y={80 - (24 + ((k * 7) % 20))} height={24 + ((k * 7) % 20)} className="sp" style={{ "--k": k }} />
        ))}
        <path className="ln2" pathLength="100" d="M20 66 L40 58 L60 60 L80 46 L100 40 L120 42 L140 30 L160 26 L180 18" />
      </svg>
    ),
    list: (
      <div className="sm-dash__top">
        {["Next test", "Budget shift", "Creative refresh"].map((t, k) => (
          <span key={t}>
            <b>{k + 1}</b>
            {t}
          </span>
        ))}
      </div>
    ),
  };
  return (
    <section ref={ref} className={"pp-rep sm-rep" + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container pp-rep__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <ol className="sm-rep__q">
            {questions.map((x, k) => {
              const [q, a] = Array.isArray(x) ? x : [x, null];
              return (
                <li key={q} style={{ "--k": k }}>
                  <b>{q}</b>
                  {a && <span>{a}</span>}
                </li>
              );
            })}
          </ol>
        </div>
        <div className="pp-dash" role="img" aria-label={`${dashTitle} layout showing ${panels.map((x) => x[0].toLowerCase()).join(", ")}. Shapes only, no figures.`}>
          <div className="pp-dash__top">
            <i />
            <i />
            <i />
            <b>{dashTitle}</b>
          </div>
          <div className="pp-dash__g sm-dash__g">
            {panels.map(([t, kind]) => (
              <div className="pp-dash__p" key={t}>
                <span>{t}</span>
                {P[kind]}
              </div>
            ))}
          </div>
          {next && (
            <div className="pp-dash__foot">
              <span>
                <PpI n="bulb" s={14} />
                {next}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Audit checklist with scanning beam. */
function DK_Audit({ id, kicker, title, sub, items, cta, countLabel = ["areas reviewed across", "your current setup"], formId, after }) {
  const [ref, v] = ppIn(0.3);
  const [n, setN] = ee.useState(ppR() ? items.length : 0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setN(i);
      if (i >= items.length) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, [v]);
  return (
    <section ref={ref} className={"pp-aud" + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container pp-aud__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} light s={sub} />
          <div className="pp-aud__count">
            <b>
              <PP_Count to={items.length} v={v} />
            </b>
            <span>
              {countLabel[0]}
              <br />
              {countLabel[1]}
            </span>
          </div>
          <a href={"#" + formId} onClick={ppGo(formId)} className="btn btn--lg pp-btn">
            {cta} <span aria-hidden="true">→</span>
          </a>
          {after}
        </div>
        <div className="pp-aud__scan">
          <i className="pp-aud__beam" aria-hidden="true" />
          <ul>
            {items.map((t, k) => (
              <li key={t} className={k < n ? "is-ok" : ""}>
                <span aria-hidden="true">
                  <PpI n="check" s={12} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Process cycle with auto-advancing highlight + mid-page CTA. steps: [title, text][] */

/* Converging inputs → one output ("We understand the person behind ..."). */

/* Short "trust" section with principle chips. */
function DK_Principles({ id, kicker, title, sub, items, tone = "off" }) {
  return (
    <DK_Sec tone={tone} className="dk-prin" label={id}>
      <div className="dk-prin__in">
        <div className="dk-prin__ic" aria-hidden="true">
          <PpI n="shield" s={36} />
        </div>
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <ul>
            {items.map((t) => (
              <li key={t}>
                <PpI n="check" s={13} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Engagement journey (no results claimed). steps: [title, text, icon][] */

/* Tools grouped by category, plus authoritative external documentation links. */

/* Related services + research links + optional guide link. */

/* Closing statement + final CTA. */
function DK_Final({ id, sig, sigText, title, text, buttons, formId, foot, to2 = "/lets-talk?type=quote", to3 }) {
  return (
    <section className="pp-final" aria-labelledby={id}>
      <div className="pp-final__bg" aria-hidden="true">
        {Array.from({ length: 16 }, (_, k) => (
          <i key={k} style={{ "--k": k }} />
        ))}
      </div>
      <div className="container pp-final__in">
        {sig && <p className="sm-final__sig">{sig}</p>}
        {sigText && <p className="dk-final__sigtext">{sigText}</p>}
        <h2 id={id}>{title}</h2>
        <p>{text}</p>
        <div className="pp-ctas pp-ctas--c">
          <a href={"#" + formId} onClick={ppGo(formId)} className="btn btn--lg pp-btn">
            {buttons[0]} <span aria-hidden="true">→</span>
          </a>
          <PpL to={to2} className="btn btn--lg pp-btn-ghost">
            {buttons[1] || "Request a Quote"}
          </PpL>
          {buttons[2] && to3 && (
            <PpL to={to3} className="btn btn--lg pp-btn-ghost">
              {buttons[2]}
            </PpL>
          )}
        </div>
        {foot && <small>{foot}</small>}
      </div>
    </section>
  );
}

/* Budget allocation demo: choose the deciding factor; bars re-order. Shapes only — no percentages. */
function DK_Budget({ id, kicker, title, sub, rows, factors }) {
  const [f, setF] = ee.useState(0);
  const [ref, v] = ppIn(0.3);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const t = setInterval(() => setF((x) => (x + 1) % factors.length), 2600);
    return () => clearInterval(t);
  }, [v, factors.length]);
  const shape = factors[f][1];
  return (
    <section ref={ref} className={"sm-ab dk-bud" + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container sm-ab__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <div className="sm-ab__metrics" role="group" aria-label="Choose what drives the allocation">
            {factors.map(([t], k) => (
              <button key={t} type="button" className={f === k ? "is-on" : ""} aria-pressed={f === k} onClick={() => setF(k)}>
                {t}
              </button>
            ))}
          </div>
          <p className="dk-note">The leading option rarely receives the entire budget — testing and learning still need room.</p>
        </div>
        <div className="sm-ab__board" aria-hidden="true">
          <div className="sm-ab__top">
            <b>Budget allocation</b>
            <span>Driven by: {factors[f][0]}</span>
          </div>
          {rows.map(([t, ic], k) => (
            <div key={t} className={"sm-ab__row" + (shape[k] === Math.max(...shape) ? " is-win" : "")}>
              <span className="sm-ab__thumb">
                <PpI n={ic} s={16} />
              </span>
              <span className="sm-ab__name">{t}</span>
              <i className="sm-ab__bar">
                <em style={{ width: v ? shape[k] + "%" : 0 }} />
              </i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Creative/variable testing board. variants: [letter, label, icon][] ; metrics: string[] */
function DK_Test({ id, kicker, title, sub, variants, metrics, process, tone }) {
  const [ref, v] = ppIn(0.3);
  const [m, setM] = ee.useState(0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const t = setInterval(() => setM((x) => (x + 1) % metrics.length), 2400);
    return () => clearInterval(t);
  }, [v, metrics.length]);
  const shapes = metrics.map((_, i) => variants.map((_, k) => 34 + ((k * 23 + i * 31) % 52)));
  const sh = shapes[m];
  const win = sh.indexOf(Math.max(...sh));
  return (
    <section ref={ref} className={"sm-ab" + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container sm-ab__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <div className="sm-ab__metrics" role="group" aria-label="Choose the metric to judge by">
            {metrics.map((t, k) => (
              <button key={t} type="button" className={m === k ? "is-on" : ""} aria-pressed={m === k} onClick={() => setM(k)}>
                {t}
              </button>
            ))}
          </div>
          {process && (
            <ol className="dk-chip-flow dk-chip-flow--sm">
              {process.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  {t}
                </li>
              ))}
            </ol>
          )}
        </div>
        <div className="sm-ab__board" aria-hidden="true">
          <div className="sm-ab__top">
            <b>Test board</b>
            <span>Judged on: {metrics[m]}</span>
          </div>
          {variants.map(([l, t, ic], k) => (
            <div key={l} className={"sm-ab__row" + (k === win ? " is-win" : "")}>
              <span className="sm-ab__thumb">
                <PpI n={ic} s={16} />
                <b>{l}</b>
              </span>
              <span className="sm-ab__name">{t}</span>
              <i className="sm-ab__bar">
                <em style={{ width: v ? sh[k] + "%" : 0 }} />
              </i>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Tabbed layers (e.g. audience targeting). layers: [title, icon, items[], note?][] */
function DK_Tabs({ id, kicker, title, sub, layers, note, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const L = layers[on];
  return (
    <DK_Sec tone={tone} className="dk-tabs" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} />
      <div className="dk-tabs__in">
        <div className="dk-tabs__list" role="tablist" aria-label={title}>
          {layers.map(([t, ic], k) => (
            <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
              <span>
                <PpI n={ic} s={16} />
              </span>
              {t}
            </button>
          ))}
        </div>
        <div className="dk-tabs__pane" role="tabpanel" key={on}>
          <h3>{L[0]}</h3>
          <div>
            {L[2].map((x, k) => (
              <span key={x} style={{ "--k": k }}>
                {x}
              </span>
            ))}
          </div>
          {L[3] && <p>{L[3]}</p>}
        </div>
      </div>
      {note && <p className="dk-note">{note}</p>}
    </DK_Sec>
  );
}

/* Retargeting / branching journey: main path, with a "no action" branch that loops back. */
function DK_Branch({ id, kicker, title, sub, main, branch, rejoin, note, tone = "light" }) {
  return (
    <DK_Sec tone={tone} className="dk-br" label={id}>
      <div className="dk-br__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          {note && <p className="dk-note">{note}</p>}
        </div>
        <div className="dk-br__vis">
          <ol className="dk-br__main">
            {main.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
          <ol className="dk-br__loop">
            {branch.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
          <span className="dk-br__rejoin">↺ {rejoin}</span>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Matrix table with animated rows. head: string[] ; rows: string[][] */
function DK_Matrix({ id, kicker, title, sub, head, rows, tone = "off", note }) {
  return (
    <DK_Sec tone={tone} className="dk-mx" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} />
      <div className="dk-mx__wrap">
        <table className="dk-mx__t">
          <thead>
            <tr>
              {head.map((h) => (
                <th key={h} scope="col">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, k) => (
              <tr key={k} style={{ "--k": k }}>
                {r.map((c, j) => (j === 0 ? <th key={j} scope="row">{c}</th> : <td key={j}>{c}</td>))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <p className="dk-note">{note}</p>}
    </DK_Sec>
  );
}

/* Timeline of touchpoints connected by a line (attribution / B2B journey). points: [title, sub?][] */

/* Equation-style brand moment: a + b + c = result */
function DK_Equation({ id, kicker, title, sub, parts, result, tone = "off" }) {
  return (
    <DK_Sec tone={tone} className="dk-eq" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center />
      <div className="dk-eq__row">
        {parts.map((t, k) => (
          <ee.Fragment key={t}>
            {k > 0 && (
              <i aria-hidden="true" className="dk-eq__op">
                +
              </i>
            )}
            <span style={{ "--k": k }}>{t}</span>
          </ee.Fragment>
        ))}
        <i aria-hidden="true" className="dk-eq__op">
          =
        </i>
        <b>{result}</b>
      </div>
    </DK_Sec>
  );
}

/* Chip cloud with optional follow-on flow. */
function DK_Chips({ id, kicker, title, sub, items, flow, tone = "light", note }) {
  return (
    <DK_Sec tone={tone} className="dk-chips" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
      <div className="dk-chips__row">
        {items.map(([t, ic], k) => (
          <span key={t} style={{ "--k": k }}>
            {ic && <PpI n={ic} s={14} />}
            {t}
          </span>
        ))}
      </div>
      {flow && (
        <ol className="dk-chip-flow">
          {flow.map((t, k) => (
            <li key={t} style={{ "--k": k }}>
              {t}
            </li>
          ))}
        </ol>
      )}
      {note && <p className="dk-note">{note}</p>}
    </DK_Sec>
  );
}

/* Section: text on one side, interactive orbit on the other. nodes: [label, icon, tip][] */
function DK_OrbitSec({ id, kicker, title, sub, center, centerSub, nodes, tone = "light", note, list = true }) {
  return (
    <DK_Sec tone={tone} className="dk-os" label={id}>
      <div className="dk-os__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          {list && (
            <ul className="dk-os__list">
              {nodes.map(([t, , d]) => (
                <li key={t}>
                  <b>{t}</b>
                  {d ? <> — {d}</> : null}
                </li>
              ))}
            </ul>
          )}
          {note && <p className="dk-note">{note}</p>}
        </div>
        <DK_Orbit center={center} sub={centerSub} nodes={nodes} dark={tone === "dark"} />
      </div>
    </DK_Sec>
  );
}

/* Shared constants */
const DK_BUDGET = ["Not decided", "Under ₹50,000", "₹50,000–₹2 lakh", "₹2–5 lakh", "₹5 lakh+"];

/* Interactive industry selector: pick an industry, see typical use cases, link to its page.
   items: [label, industrySlug, uses[]][] — uses are generic examples, not claims of past work. */
function DK_UseCases({ id, kicker = "Industries", title, sub, items, note, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const all = INDUSTRIES;
  const it = items[on];
  const ind = all.find((x) => x.slug === it[1]);
  return (
    <DK_Sec tone={tone} className="dk-uc" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center />
      <div className="dk-uc__in">
        <div className="dk-uc__chips" role="tablist" aria-label="Choose an industry">
          {items.map(([t], k) => (
            <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
              {t}
            </button>
          ))}
        </div>
        <div className="dk-uc__pane" role="tabpanel" key={on}>
          <small>Typical use cases</small>
          <h3>{it[0]}</h3>
          <ul>
            {it[2].map((u, k) => (
              <li key={u} style={{ "--k": k }}>
                <PpI n="check" s={13} />
                {u}
              </li>
            ))}
          </ul>
          {ind && (
            <PpL to={`/industries-case-studies/${ind.slug}`} className="dk-card__link">
              Explore {ind.name} →
            </PpL>
          )}
        </div>
      </div>
      {note && <p className="dk-note dk-uc__note">{note}</p>}
    </DK_Sec>
  );
}

export { DK_Audit, DK_BUDGET, DK_Branch, DK_Budget, DK_Cards, DK_Chips, DK_Compare, DK_Engine, DK_Equation, DK_Final, DK_Flow, DK_Funnel, DK_Hero, DK_Ladder, DK_Leak, DK_Matrix, DK_OrbitSec, DK_Principles, DK_Problems, DK_Report, DK_Sec, DK_Statement, DK_Streams, DK_Tabs, DK_Test, DK_UseCases };
