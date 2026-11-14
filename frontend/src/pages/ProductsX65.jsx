/*
 * Sampledge product kit (build 65 update 6). Prefix PR5_ (styles: src/styles/products65x.css, pr5-).
 *   PR5_Logo    the product's own Sampledge logo, inline (src/data/SampledgeLogos65.jsx). v="logo" (full lock-up,
 *               light and dark versions follow the site theme unless tone is set) or v="mark" (symbol only).
 *               still: the logo's own reduced-motion look, for small and repeated placements (menus, rails, cards).
 *   PR5_Stage   each product's 3D stage: the tilted product screen (PR5_Demo) with floating, product-specific objects
 *   PR5_Flow    each product's workflow, drawn in its own metaphor (SampCode terminal, SampBidx sealed envelopes, SampTrek
 *               metro line, SampAudience boarding pass, SampForce moving deal card, Talk2Tax receipt, SampCrew lifecycle ring)
 *   PR5_Faq     the product's questions and answers from the Sampledge website
 *   PR5_Ribbon  moving ribbon of all seven logos
 * Every looping animation here moves only transform or opacity (build 65 update 5 rule).
 */
import * as ee from 'react';
import { PR5_Logo } from '../components/site/PR5Logo.jsx';
import { PR5_LIST } from '../data/Sampledge65.jsx';
import { PR5_Demo, pr5Style } from './Products65.jsx';

const PR5_FLOATS = {
  sampcode: [["⚡", 86, 6, "bolt"], ["{ skip: Q5 }", -6, 22, "chip"], ["✓ Logic OK", 74, 78, "ok"], ["● LIVE", -2, 80, "live"], ["Q12 · Matrix", 82, 40, "chip"]],
  sampbidx: [["RFQ #204", -8, 14, "env"], ["Lot 03", 84, 8, "tag"], ["Feasible ✓", 80, 70, "ok"], ["WON", -4, 76, "stamp"], ["Due Fri", 88, 42, "chip"]],
  samptrek: [["Quota 82%", -6, 18, "ring"], ["Supplier A · 412", 76, 6, "chip"], ["IR 34% · LOI 12m", 78, 78, "chip"], ["Reconciled ✓", -4, 80, "ok"]],
  sampaudience: [["B2B · IT DMs", -8, 12, "chip"], ["🇺🇸 🇬🇧 🇮🇳", 82, 6, "chip"], ["n = 300 ready", 76, 80, "ok"], ["", -2, 70, "people"]],
  sampforce: [["Lead score 86", -6, 16, "chip"], ["Proposal sent", 80, 8, "chip"], ["Won ✓", 82, 74, "ok"], ["Follow-up 10:30", -4, 78, "chip"]],
  talk2tax: [["INV-0042", -6, 12, "receipt"], ["GST ✓", 84, 10, "ok"], ["Reconciled 98%", 78, 76, "chip"], ["", -4, 50, "scale"]],
  sampcrew: [["Leave approved ✓", -8, 14, "ok"], ["", 84, 4, "faces"], ["09:02 checked in", 76, 80, "chip"], ["Offer letter", -4, 78, "chip"]],
};
function PR5_Float({ f, i }) {
  const [t, x, y, k] = f;
  let body = t;
  if (k === "people")
    body = (
      <span className="pr5-ppl">
        {Array.from({ length: 12 }, (_, j) => (
          <i key={j} style={{ "--j": j }} />
        ))}
      </span>
    );
  else if (k === "faces")
    body = (
      <span className="pr5-faces">
        {["AK", "RS", "MJ", "PN"].map((n, j) => (
          <i key={n} style={{ "--j": j }}>
            {n}
          </i>
        ))}
      </span>
    );
  else if (k === "scale")
    body = (
      <span className="pr5-scale">
        <i className="pr5-scale__beam">
          <b />
          <b />
        </i>
        <i className="pr5-scale__post" />
      </span>
    );
  else if (k === "ring")
    body = (
      <>
        <span className="pr5-ringm">
          <svg viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15" />
            <circle cx="18" cy="18" r="15" className="pr5-ringm__v" />
          </svg>
        </span>
        {t}
      </>
    );
  else if (k === "env")
    body = (
      <>
        <span className="pr5-envm" />
        {t}
      </>
    );
  else if (k === "receipt")
    body = (
      <>
        <span className="pr5-rcm">
          <i />
          <i />
          <i />
        </span>
        {t}
      </>
    );
  return (
    <span className={"pr5-fl pr5-fl--" + k} style={{ "--x": x + "%", "--y": y + "%", "--i": i }}>
      <span>{body}</span>
    </span>
  );
}
function PR5_Stage({ p }) {
  return (
    <div className={"pr5-stage pr5-stage--" + p.id} style={pr5Style(p)}>
      <div className="pr5-stage__floor" aria-hidden="true" />
      <div className="pr5-stage__halo" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="pr5-stage__dev">
        <PR5_Demo p={p} />
      </div>
      <div className="pr5-stage__fl" aria-hidden="true">
        {(PR5_FLOATS[p.id] || []).map((f, i) => (
          <PR5_Float key={i} f={f} i={i} />
        ))}
      </div>
      <span className="pr5-stage__mark" aria-hidden="true">
        <PR5_Logo p={p} v="mark" still />
      </span>
    </div>
  );
}

/* ── workflows, one metaphor per product ─────────────────────────────────────────────── */
const PR5_FLOW_INTRO = {
  sampcode: "From first question to final chart, every step runs on the same survey.",
  sampbidx: "Each RFQ is a sealed envelope until your team opens, prices and answers it.",
  samptrek: "Eight stations on one line. Every project rides the same trail, from won bid to paid invoice.",
  sampaudience: "Your audience gets a boarding pass. Nine stages under one request ID, from brief to outcomes.",
  sampforce: "One deal card, moving left to right until it lands in Won.",
  talk2tax: "Every transaction prints its own receipt, all the way to the report.",
  sampcrew: "The employee lifecycle as one ring that keeps turning: hire, onboard, attend, pay, grow, understand.",
};
function PR5_Flow({ p }) {
  const f = p.flow || [];
  const id = p.id;
  let body;
  if (id === "sampcode")
    body = (
      <div className="pr5-term" role="list">
        <div className="pr5-term__bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>sampcode — build</span>
        </div>
        {f.map((s, i) => (
          <div key={s} role="listitem" className="pr5-term__ln" style={{ "--i": i }}>
            <span className="pr5-term__p" aria-hidden="true">
              $
            </span>
            <code>sampcode {s.toLowerCase().replace(/\s+/g, "-")}</code>
            <b>{i === f.length - 1 ? "● running" : "✓ " + s}</b>
          </div>
        ))}
        <span className="pr5-term__cur" aria-hidden="true" />
      </div>
    );
  else if (id === "sampbidx")
    body = (
      <ol className="pr5-envs">
        {f.map((s, i) => (
          <li key={s} className="pr5-env" style={{ "--i": i }}>
            <span className="pr5-env__flap" aria-hidden="true" />
            <span className="pr5-env__seal" aria-hidden="true">
              {i + 1}
            </span>
            <span className="pr5-env__card">
              <small>Lot {String(i + 1).padStart(2, "0")}</small>
              <b>{s}</b>
            </span>
          </li>
        ))}
      </ol>
    );
  else if (id === "samptrek")
    body = (
      <div className="pr5-metro">
        <span className="pr5-metro__line" aria-hidden="true">
          <i className="pr5-metro__train" />
        </span>
        <ol>
          {f.map((s, i) => (
            <li key={s} style={{ "--i": i }} className={i % 2 ? "is-dn" : ""}>
              <i aria-hidden="true" />
              <b>{s}</b>
              <small>Stop {i + 1}</small>
            </li>
          ))}
        </ol>
      </div>
    );
  else if (id === "sampaudience")
    body = (
      <div className="pr5-pass">
        <div className="pr5-pass__main">
          <small>Boarding pass · SampAudience</small>
          <div className="pr5-pass__route">
            <b>BRIEF</b>
            <span aria-hidden="true">
              <i />
            </span>
            <b>LIVE</b>
          </div>
          <ol>
            {f.map((s, i) => (
              <li key={s} style={{ "--i": i }}>
                <em>{String(i + 1).padStart(2, "0")}</em>
                {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="pr5-pass__stub" aria-hidden="true">
          <small>Gate</small>
          <b>{f.length}</b>
          <span className="pr5-pass__bars">
            {Array.from({ length: 18 }, (_, j) => (
              <i key={j} style={{ "--w": 1 + ((j * 7) % 4) }} />
            ))}
          </span>
        </div>
      </div>
    );
  else if (id === "sampforce")
    body = (
      <div className="pr5-board" style={{ "--n": f.length }}>
        <ol>
          {f.map((s, i) => (
            <li key={s} style={{ "--i": i }}>
              <b>{s}</b>
              <i />
              <i />
            </li>
          ))}
        </ol>
        <span className="pr5-board__card" aria-hidden="true">
          <b>Acme Ltd</b>
          <small>Deal · 3 seats</small>
        </span>
      </div>
    );
  else if (id === "talk2tax")
    body = (
      <div className="pr5-rcpt">
        <div className="pr5-rcpt__paper">
          <b className="pr5-rcpt__h">TALK2TAX · RECEIPT</b>
          <small>Workflow #0042</small>
          <ul>
            {f.map((s, i) => (
              <li key={s} style={{ "--i": i }}>
                <span>
                  {String(i + 1).padStart(2, "0")} {s}
                </span>
                <b>✓</b>
              </li>
            ))}
          </ul>
          <p className="pr5-rcpt__tot">
            <span>Status</span>
            <b>Books in order</b>
          </p>
        </div>
      </div>
    );
  else
    body = (
      <div className="pr5-life" style={{ "--n": f.length }}>
        <span className="pr5-life__spin" aria-hidden="true" />
        <span className="pr5-life__core">
          <PR5_Logo p={p} v="mark" still />
        </span>
        <ol>
          {f.map((s, i) => (
            <li key={s} style={{ "--i": i }}>
              <span>
                <em>{i + 1}</em>
                {s}
              </span>
            </li>
          ))}
        </ol>
      </div>
    );
  return (
    <div className={"pr5-flow pr5-flow--" + id}>
      <div className="pr5-flow__head">
        <h3>How {p.short} works</h3>
        <p>{PR5_FLOW_INTRO[id]}</p>
      </div>
      {body}
    </div>
  );
}

function PR5_Faq({ p }) {
  if (!p.faq) return null;
  return (
    <div className="pr5-faq">
      <h3>{p.short}: questions and answers</h3>
      {p.faq.map(([q, a], i) => (
        <details key={q} className="pr5-faq__it" style={{ "--i": i }} open={i === 0}>
          <summary>
            <span>{q}</span>
            <i aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

function PR5_Ribbon({ tone = "dark" }) {
  const row = PR5_LIST.concat(PR5_LIST);
  return (
    <div className={"pr5-ribbon pr5-ribbon--" + tone} aria-hidden="true">
      <div className="pr5-ribbon__track">
        {row.map((p, i) => (
          <span key={i} className="pr5-ribbon__it">
            <PR5_Logo p={p} still tone={tone} h={44} />
          </span>
        ))}
      </div>
    </div>
  );
}

export { PR5_Faq, PR5_Flow, PR5_Logo, PR5_Ribbon, PR5_Stage };
