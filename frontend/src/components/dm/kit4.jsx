/*
 * Section kit, part 4 — research-led modules for the Digital Marketing section
 * ("Research Before Reach" repositioning). Prefix RL_ ; styles in src/styles/dm-kit4.css (prefix rl-).
 *
 * Content rules: research is described as a capability that CAN inform an engagement where needed —
 * never as a compulsory step. No invented metrics, results, clients or proprietary-technology claims.
 */
import * as ee from 'react';
import { usePageMeta } from '../../app/SiteApp.jsx';
import { DM_Faq, DM_Strip, PP_Head, PpI, PpL, dmMeta, dmSchema, ppDm, ppIn, ppR } from './shared.jsx';
import { DK_Cards, DK_Final, DK_Hero, DK_Problems, DK_Sec, DK_Statement, DK_Tabs } from './kit.jsx';
import { DK_Guide } from './kit2.jsx';

/* Shared: The Frequent Research Intelligence-to-Impact Framework (stage names + icons).
   Text is supplied per service. Described as "our approach" — not a registered or proprietary methodology. */
const RL_LOOP = [
  ["Understand", "users"],
  ["Discover", "search"],
  ["Define", "target"],
  ["Activate", "rocket"],
  ["Measure", "bars"],
  ["Learn", "bulb"],
  ["Improve", "sliders"],
  ["Grow", "trend"],
];
/* Build loop stages from 8 service-specific texts. */
const rlLoop = (texts) => RL_LOOP.map(([t, ic], k) => [t, ic, texts[k]]);

/* Auto-advancing index that pauses once the visitor interacts. */
function rlCycle(n, ms, v) {
  const [on, setOn] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || hold || ppR()) return;
    const i = setInterval(() => setOn((x) => (x + 1) % n), ms);
    return () => clearInterval(i);
  }, [v, hold, n, ms]);
  return [on, (k) => (setHold(true), setOn(k))];
}

/* HERO VISUAL — a service-specific path with a research layer feeding in.
   nodes: [title, icon, sub][] ; research: string[] */

/* Conventional vs Frequent Research chains. conv, fr: string[] */
function RL_Versus({ id, kicker = "Same goal. Different starting point.", title, sub, conv, fr, convLabel = "Conventional campaign approach", frLabel = "Frequent Research approach", note, tone = "light" }) {
  const [ref, v] = ppIn(0.25);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rl-vs` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <div className="rl-vs__lane rl-vs__lane--a">
          <h3>{convLabel}</h3>
          <ol>
            {conv.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <div className="rl-vs__lane rl-vs__lane--b">
          <h3>{frLabel}</h3>
          <ol>
            {fr.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
          <span className="rl-vs__back" aria-hidden="true">
            ↺ Learning feeds the next cycle
          </span>
        </div>
        {note && <p className="rl-vs__note">{note}</p>}
      </div>
    </section>
  );
}

/* The Frequent Research Difference — ten service-specific answers. items: [label, icon, text][] */
const RL_DIFF_Q = [
  ["What a conventional provider usually does", "flag"],
  ["What we do differently", "compass"],
  ["Where data and AI improve it", "search"],
  ["Additional business value", "trend"],
  ["Before execution", "clipboard"],
  ["After execution", "refresh"],
  ["How it connects with other channels", "layers"],
  ["How AI improves the process", "bulb"],
  ["What stays human-led", "users"],
  ["The larger business objective", "target"],
];
/* answers: 10 strings in RL_DIFF_Q order */
function RL_Diff({ id, kicker = "The Frequent Research Difference", title, sub, answers, tone = "off" }) {
  const [on, setOn] = ee.useState(1);
  return (
    <DK_Sec tone={tone} className="rl-df" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center />
      <div className="rl-df__in">
        <ol className="rl-df__qs" role="tablist" aria-label="The Frequent Research Difference">
          {RL_DIFF_Q.map(([q, ic], k) => (
            <li key={q} role="presentation">
              <button type="button" role="tab" aria-selected={on === k} className={(on === k ? "is-on " : "") + (k === 0 ? "is-conv" : "")} onClick={() => setOn(k)}>
                <em>{String(k + 1).padStart(2, "0")}</em>
                <PpI n={ic} s={14} />
                {q}
              </button>
            </li>
          ))}
        </ol>
        <div className={"rl-df__a" + (on === 0 ? " is-conv" : "")} role="tabpanel" key={on} aria-live="polite">
          <small>{RL_DIFF_Q[on][0]}</small>
          <p>{answers[on]}</p>
          <div className="rl-df__nav">
            <button type="button" onClick={() => setOn((on + 9) % 10)} aria-label="Previous answer">
              ←
            </button>
            <span>
              {on + 1} / 10
            </span>
            <button type="button" onClick={() => setOn((on + 1) % 10)} aria-label="Next answer">
              →
            </button>
          </div>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Where Frequent Research adds more — execution vs + insight layer, with a toggle.
   layers: [name, icon, execution, insight][] */
function RL_Layers({ id, kicker = "Where Frequent Research adds more", title, sub, layers, tone = "light" }) {
  const [ref, v] = ppIn(0.3);
  const [plus, setPlus] = ee.useState(false);
  const [touched, setTouched] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || touched) return;
    const t = setTimeout(() => setPlus(true), ppR() ? 0 : 900);
    return () => clearTimeout(t);
  }, [v, touched]);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rl-ly` + (plus ? " is-plus" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center />
        <div className="rl-ly__sw">
          <span>Execution only</span>
          <button
            type="button"
            role="switch"
            aria-checked={plus}
            aria-label="Add the insight layer"
            onClick={() => {
              setTouched(true);
              setPlus((p) => !p);
            }}
          >
            <i />
          </button>
          <span>+ Insight layer</span>
        </div>
        <ul className="rl-ly__rows">
          {layers.map(([t, ic, a, b], k) => (
            <li key={t} style={{ "--k": k }}>
              <b>
                <PpI n={ic} s={15} />
                {t}
              </b>
              <span className="rl-ly__a">{a}</span>
              <span className="rl-ly__b" aria-hidden={!plus}>
                <em>+</em> {b}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Beyond the Campaign — connections with a reason. links: [title, why, to, "research"|"digital"|"data"][] */
function RL_Beyond({ id, kicker = "Related services", title = "Beyond the Campaign", sub, center, links, tone = "dark" }) {
  return (
    <DK_Sec tone={tone} className="rl-by" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="rl-by__hub" aria-hidden="true">
        <span>{center}</span>
      </div>
      <ul className="rl-by__grid">
        {links.map(([t, why, to, kind], k) => (
          <li key={t} style={{ "--k": k }} className={"rl-by__c rl-by__c--" + kind}>
            <small>{kind === "research" ? "Research" : kind === "data" ? "Data & analytics" : kind === "it" ? "IT & Development" : "Digital"}</small>
            <b>{t}</b>
            <p>{why}</p>
            {to && (
              <PpL to={to} className="rl-by__l">
                Explore <span aria-hidden="true">→</span>
                <span className="pp-sr"> {t}</span>
              </PpL>
            )}
          </li>
        ))}
      </ul>
    </DK_Sec>
  );
}

/* Four-tier measurement with an objective selector.
   tiers: 4 arrays of metric names (activity, behaviour, conversion, business)
   objectives: [label, tierIndexes[], note][] */
const RL_TIERS = [
  ["Activity", "Is it being seen?", "megaphone"],
  ["Behaviour", "What do people do next?", "users"],
  ["Conversion", "Do they take a meaningful action?", "target"],
  ["Business", "Does it matter to the business?", "trend"],
];
function RL_Metrics({ id, title = "Measure What Matters — at Every Level", sub, tiers, objectives, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const O = objectives[on];
  return (
    <DK_Sec tone={tone} className="rl-mt" label={id}>
      <PP_Head k="Measurement" id={id} t={title} s={sub || "The right KPI depends on the objective. Choose one to see which levels matter most."} center />
      <div className="rl-mt__obj" role="tablist" aria-label="Choose an objective">
        {objectives.map(([t], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            {t}
          </button>
        ))}
      </div>
      <ol className="rl-mt__stairs" role="tabpanel" aria-live="polite">
        {RL_TIERS.map(([t, q, ic], k) => (
          <li key={t} className={O[1].includes(k) ? "is-on" : ""} style={{ "--k": k }}>
            <span className="rl-mt__h">
              <PpI n={ic} s={15} />
              <b>{t}</b>
              <small>{q}</small>
            </span>
            <span className="rl-mt__m">
              {tiers[k].map((m) => (
                <i key={m}>{m}</i>
              ))}
            </span>
          </li>
        ))}
      </ol>
      <p className="rl-mt__note" key={on}>
        <PpI n="bulb" s={14} /> {O[2]}
      </p>
    </DK_Sec>
  );
}

/* Clickable circular loop with a detail pane. stages: [title, icon, text][] */
function RL_Loop({ id, kicker = "The Intelligence-to-Impact Framework", title, sub, stages, center = "Insight to activation", tone = "dark" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(stages.length, 2600, v);
  const n = stages.length;
  const R = 41;
  const S = stages[on];
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rl-lp` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container rl-lp__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <div className="rl-lp__pane" key={on} aria-live="polite">
            <small>
              {String(on + 1).padStart(2, "0")} · {S[0]}
            </small>
            <p>{S[2]}</p>
          </div>
        </div>
        <div className="rl-lp__ring" style={{ "--p": (on + 1) / n }}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r={R} className="tr" />
            <circle cx="50" cy="50" r={R} className="pr" pathLength="100" />
          </svg>
          <div className="rl-lp__core" aria-hidden="true">
            <PpI n="refresh" s={18} />
            <b>{center}</b>
          </div>
          <ol>
            {stages.map(([t, ic], k) => {
              const a = (k / n) * 2 * Math.PI - Math.PI / 2;
              return (
                <li key={t} style={{ left: 50 + R * Math.cos(a) + "%", top: 50 + R * Math.sin(a) + "%" }}>
                  <button type="button" className={(on === k ? "is-on " : "") + (k < on ? "is-done" : "")} aria-pressed={on === k} onClick={() => pick(k)}>
                    <span>
                      <PpI n={ic} s={14} />
                    </span>
                    <b>{t}</b>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Three intelligence layers (Research · Data · AI) around "Better marketing decisions". layers: [title, text][] x3 */

/* Business-system chain: marketing connected to the rest of the business. nodes: [title, icon, text][] */

/* Service ecosystem explorer: filter services by business goal. goals: [label, slugs[]][] ; services: [title, slug, icon, usp][] */
function RL_Services({ id, kicker = "Our digital marketing services", title, sub, goals, services, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  const G = goals[on];
  return (
    <DK_Sec tone={tone} className="rl-sv" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center />
      <div className="rl-sv__goals" role="tablist" aria-label="Filter services by goal">
        {goals.map(([t], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            {t}
          </button>
        ))}
      </div>
      <ul className="rl-sv__grid" aria-live="polite">
        {services.map(([t, s, ic, u], k) => {
          const hit = !G[1] || G[1].includes(s);
          return (
            <li key={s} className={hit ? "is-hit" : "is-dim"} style={{ "--k": k }}>
              <PpL to={ppDm(s)} className="rl-sv__c">
                <span>
                  <PpI n={ic} s={16} />
                </span>
                <b>{t}</b>
                <small>{u}</small>
              </PpL>
            </li>
          );
        })}
      </ul>
    </DK_Sec>
  );
}

/* "What happened vs why" — data observations, what data can and can't answer, and how research/analysis explains why.
   items: [observation, icon, dataShows, dataCantSay, howWeExplain, nextAction][] */
function RL_Why({ id, kicker = "Data + context", title = "Data Tells You What Happened. Context Explains Why.", sub, items, tone = "dark" }) {
  const [on, setOn] = ee.useState(0);
  const I = items[on];
  return (
    <DK_Sec tone={tone} className="rl-wy" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub || "Choose an observation."} center light={tone === "dark"} />
      <div className="rl-wy__obs" role="tablist" aria-label="Observations">
        {items.map(([t, ic], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            <PpI n={ic} s={14} />
            {t}
          </button>
        ))}
      </div>
      <ol className="rl-wy__steps" role="tabpanel" key={on} aria-live="polite">
        {[
          ["What the data shows", I[2], "bars"],
          ["What it can't tell you", I[3], "help"],
          ["How we find out why", I[4], "search"],
          ["Possible next action", I[5], "arrow"],
        ].map(([h, t, ic], k) => (
          <li key={h} style={{ "--k": k }} className={"rl-wy__s rl-wy__s--" + k}>
            <small>
              <PpI n={ic} s={13} /> {h}
            </small>
            <p>{t}</p>
          </li>
        ))}
      </ol>
      <p className="rl-wy__note">Typical observations — not client data.</p>
    </DK_Sec>
  );
}

/* ── Build 32 additions ─────────────────────────────────────────────────────────────── */

/* AI-Assisted layer + Human-Led decision layer, joined by the decision chain.
   ai: [title, text][] ; human: [title, text][] ; chain: 6 short service-specific labels (optional) */
const RL_CHAIN = ["Data", "AI assistance", "Human interpretation", "Business decision", "Action", "Measurement"];
function RL_AiLayer({ id, title = "AI-Assisted. Human-Led.", sub, ai, human, chain = RL_CHAIN, tone = "dark" }) {
  const [ref, v] = ppIn(0.25);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rl-ai` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k="AI-Assisted. Human-Led." id={id} t={title} s={sub || "AI accelerates the work. Human judgement makes the decision."} center light={tone === "dark"} />
        <ol className="rl-ai__chain" aria-label="From data to decision">
          {chain.map((t, k) => (
            <li key={t} style={{ "--k": k }} className={k === 1 ? "is-ai" : k === 2 || k === 3 ? "is-hu" : ""}>
              <span>{String(k + 1).padStart(2, "0")}</span>
              {t}
            </li>
          ))}
        </ol>
        <div className="rl-ai__in">
          <div className="rl-ai__col rl-ai__col--ai">
            <h3>
              <PpI n="bulb" s={16} /> Where AI assists
            </h3>
            <ul>
              {ai.map(([t, d], k) => (
                <li key={t} style={{ "--k": k }}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rl-ai__col rl-ai__col--hu">
            <h3>
              <PpI n="users" s={16} /> What stays human-led
            </h3>
            <ul>
              {human.map(([t, d], k) => (
                <li key={t} style={{ "--k": k }}>
                  <b>{t}</b>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Optimisation as a learning system. steps: [title, serviceSpecificExample][] (7 steps) */
function RL_Learn({ id, kicker = "Optimisation", title, sub, steps, tone = "light" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(steps.length, 2200, v);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rl-ln2` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center />
        <div className="rl-ln2__old" aria-label="Traditional view">
          <small>Traditional view</small>
          <span>Campaign</span>
          <i aria-hidden="true">→</i>
          <span>Result</span>
        </div>
        <div className="rl-ln2__new">
          <small>Learning system</small>
          <ol>
            {steps.map(([t], k) => (
              <li key={t} className={(on === k ? "is-on " : "") + (k < on ? "is-done" : "")}>
                <button type="button" onClick={() => pick(k)} aria-pressed={on === k}>
                  {t}
                </button>
              </li>
            ))}
          </ol>
          <span className="rl-ln2__arc" aria-hidden="true">
            ↺ Each cycle starts smarter than the last
          </span>
        </div>
        <p className="rl-ln2__pane" key={on} aria-live="polite">
          <b>{steps[on][0]}:</b> {steps[on][1]}
        </p>
      </div>
    </section>
  );
}

/* Marketing as a source of business intelligence. signals: [whatMarketingReveals, icon, informs[]][] */
const RL_AREAS = ["Product", "Sales", "Customer experience", "Content", "Positioning", "Market strategy"];
function RL_Intel({ id, kicker = "Business value", title = "Marketing as a Source of Business Intelligence", sub, signals, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const S = signals[on];
  return (
    <DK_Sec tone={tone} className="rl-bi" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub || "Campaign data is also evidence about your market. Select a signal to see which parts of the business it can inform."} center />
      <div className="rl-bi__in">
        <ul className="rl-bi__sig" role="tablist" aria-label="Signals marketing can reveal">
          {signals.map(([t, ic], k) => (
            <li key={t} role="presentation">
              <button type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
                <PpI n={ic} s={15} />
                {t}
              </button>
            </li>
          ))}
        </ul>
        <div className="rl-bi__mid" aria-hidden="true">
          <span>Insight</span>
        </div>
        <ul className="rl-bi__areas" role="tabpanel" aria-live="polite">
          {RL_AREAS.map((a) => (
            <li key={a} className={S[2].includes(a) ? "is-on" : ""}>
              {a}
              <span className="pp-sr">{S[2].includes(a) ? " — informed by this signal" : ""}</span>
            </li>
          ))}
        </ul>
      </div>
    </DK_Sec>
  );
}

/* Beyond the channel: one customer journey across many touchpoints. steps: [touchpoint, icon][] */
function RL_Journey({ id, kicker = "Beyond the channel", title = "Marketing Doesn't Happen Inside One Channel.", sub, steps, tone = "light" }) {
  const [ref, v] = ppIn(0.25);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rl-jy` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub || "A customer may meet you in many places before they act. The channels have to work as one journey."} center />
        <ol className="rl-jy__path">
          {steps.map(([t, ic], k) => (
            <li key={t} style={{ "--k": k }}>
              <span>
                <PpI n={ic} s={15} />
              </span>
              <b>{t}</b>
            </li>
          ))}
        </ol>
        <p className="rl-jy__one">
          <PpI n="users" s={15} /> One customer journey
        </p>
      </div>
    </section>
  );
}

/* Landing: one digital ecosystem. stages: [stage, question, services:[title, slug][]][] */

/* ── RL_Page: the shared research-led service page structure (no case-study section).
   01 Hero · 02 Business problem · 03 Perspective (versus + difference) · 04 Intelligence layer ·
   05 How it works (framework + service visuals) · 06 Capabilities · 07/08 AI-assisted + human-led ·
   09 Measurement · 10 Optimisation · 11 Business value · 12 Why FR · 13 Related · 14 FAQ · 15 Final CTA + form */
function RL_Page({ c }) {
  usePageMeta(c.maTitle, c.desc);
  dmMeta(c.url, c.title, c.desc);
  dmSchema(c.key, { path: c.url, crumb: c.crumb, name: c.name, serviceType: c.serviceType, description: c.schemaDesc, faq: c.faq });
  const P = c.pfx;
  const formId = c.formId;
  return (
    <div className={"pp sm dk rl " + (c.cls || P)}>
      <DK_Hero
        id={P + "-h1"}
        dark={c.hero.dark}
        crumb={c.crumb}
        kicker={c.hero.kicker}
        title={c.hero.h1}
        tag={c.hero.tag}
        lead={c.hero.lead}
        primary={[c.hero.cta, formId]}
        secondary={c.hero.cta2 || "Request a Quote"}
        secondaryTo={c.hero.cta2To || "/lets-talk?type=quote"}
        trust={c.hero.trust}
      >
        {c.hero.vis}
      </DK_Hero>
      {c.statement && <DK_Statement id={P + "-stmt"} tone={c.hero.dark ? "light" : "off"} quote={c.statement[0]} flow={c.statement[1]} />}
      {c.caps && <DM_Strip label={c.name + " capabilities"} caps={c.caps} />}
      {c.problem && <DK_Problems id={P + "-prob-h"} kicker="The business problem" title={c.problem.title} sub={c.problem.sub} items={c.problem.items} />}
      {c.problemNode}
      <RL_Versus id={P + "-vs-h"} kicker={c.versus.kicker || "Same goal. Different starting point."} title={c.versus.title} sub={c.versus.sub} conv={c.versus.conv} fr={c.versus.fr} note={c.versus.note} />
      <RL_Diff id={P + "-diff-h"} kicker={c.diff.kicker} title={c.diff.title} sub={c.diff.sub} answers={c.diff.answers} />
      <RL_Layers id={P + "-ly-h"} kicker={c.layers.kicker || "Intelligence layer"} title={c.layers.title} sub={c.layers.sub || "Switch the insight layer on and off to see what changes."} layers={c.layers.rows} />
      {c.before}
      <RL_Loop id={P + "-loop-h"} title={c.loop.title} sub={c.loop.sub || "Select a stage — or watch the framework run."} center={c.loop.center} stages={c.loop.stages || rlLoop(c.loop.texts)} />
      {c.visuals}
      <DK_Tabs id={P + "-cap-h"} kicker="Capabilities" title={c.capabilities.title} sub={c.capabilities.sub || "Select a capability."} layers={c.capabilities.layers} note={c.capabilities.note} />
      {c.after}
      <RL_AiLayer id={P + "-ai-h"} title={c.ai.title} sub={c.ai.sub} ai={c.ai.ai} human={c.ai.human} chain={c.ai.chain} />
      <RL_Metrics id={P + "-mt-h"} title={c.metrics.title} sub={c.metrics.sub} tiers={c.metrics.tiers} objectives={c.metrics.objectives} />
      <RL_Learn id={P + "-opt-h"} title={c.learn.title} sub={c.learn.sub} steps={c.learn.steps} />
      <RL_Intel id={P + "-bi-h"} title={c.intel.title} sub={c.intel.sub} signals={c.intel.signals} />
      {c.journey && <RL_Journey id={P + "-jy-h"} title={c.journey.title} sub={c.journey.sub} steps={c.journey.steps} />}
      <DK_Cards id={P + "-why-h"} tone="off" kicker={c.why.kicker || "Why Frequent Research"} title={c.why.title} sub={c.why.sub} cols={3} items={c.why.items} />
      <RL_Beyond id={P + "-rel-h"} title={c.related.title} sub={c.related.sub} center={c.related.center || c.crumb} links={c.related.links} />
      <DM_Faq id={P + "-faq"} title={c.faqTitle || c.name + ": Frequently Asked Questions"} items={c.faq} aside={c.faqAside} />
      {c.guide && <DK_Guide id={P + "-gd-h"} title={c.guide.title} cover={c.guide.cover} topics={c.guide.topics} to={c.guide.to} />}
      <DK_Final id={P + "-final-h"} sig={c.final.sig} sigText={c.final.sigText} title={c.final.title} text={c.final.text} buttons={[c.hero.cta, c.hero.cta2 || "Request a Quote"]} to2={c.hero.cta2To || "/lets-talk?type=quote"} formId={formId} />
      {c.formNode}
    </div>
  );
}

export { RL_AiLayer, RL_Beyond, RL_Loop, RL_Page, RL_Services, RL_Why, rlCycle };
