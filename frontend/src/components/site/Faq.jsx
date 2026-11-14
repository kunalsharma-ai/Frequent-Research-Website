/*
 * FAQs (build 51) — one accessible accordion, a different visual treatment per service world. Prefix FQ_ / FR_Faq*.
 * Styles: src/styles/faq.css (fq-).
 *
 *  FR_FaqList({ items, id?, world? })  items: [[q, a]] or [{ q, a }]. Used by the base accordion (FaqList) on market
 *                                       research / finance service pages, portals, industries, blog posts, government.
 *  FR_Faq({ id, title, items, aside })  full section (head + art + list). DM_Faq (shared.jsx) delegates here, so every
 *                                       digital marketing, IT, hub and Sampledge FAQ uses it.
 *
 * Worlds: mr (insight cards), dm (chat bubbles), it (terminal), af (ledger), plus calm variants for non-service
 * pages (gov, panel, blog, ind, sam, base). Answers stay in the DOM when closed (visibility hidden), so prerendered
 * HTML still contains every answer; the FAQPage JSON-LD on each page is unchanged.
 */
import * as ee from 'react';
import { navPath } from '../../app/nav.jsx';
import { PpL } from '../dm/shared.jsx';
import { FRK_I, FRK_V, FRK_VKEYS, frkNorm, frkUid, frkVFromPath } from './FrKit.jsx';
import { FRL_Mark } from './Logos13.jsx';

const FQ_NEUTRAL = {
  gov: { c1: "#1D3FAE", c2: "#F59E0B", ic: "shield", label: "Government research" },
  panel: { c1: "#E8436F", c2: "#FFB020", ic: "heart", label: "Panel member help" },
  blog: { c1: "#3B2BD9", c2: "#22D3EE", ic: "file", label: "Reader questions" },
  ind: { c1: "#0E7490", c2: "#34D399", ic: "grid", label: "Industry questions" },
  sam: { c1: "#2F6BFF", c2: "#7B4DFF", ic: "grid", label: "Sampledge" },
  base: { c1: "#1E5BFF", c2: "#7C4DFF", ic: "info", label: "Good to know" },
};
const FQ_WORLD_LABEL = { mr: "Research answers", dm: "Marketing answers", it: "Tech answers", af: "Finance answers" };
const fqPath = () => navPath();
function fqWorld(p) {
  const path = p || fqPath();
  const v = frkVFromPath(path);
  if (v) return FRK_V[v].k;
  if (/\/products\/sampledge/.test(path)) return "sam";
  if (/government-opinion-research/.test(path)) return "gov";
  if (/\/portals/.test(path)) return "panel";
  if (/\/blog\//.test(path)) return "blog";
  if (/industries-case-studies/.test(path)) return "ind";
  return "base";
}
function fqVars(w) {
  const vk = FRK_VKEYS.find((k) => FRK_V[k].k === w);
  if (vk) {
    const v = FRK_V[vk];
    return { c1: v.c1, c2: v.c2, ic: v.ic, label: FQ_WORLD_LABEL[w] };
  }
  return FQ_NEUTRAL[w] || FQ_NEUTRAL.base;
}
const fqNorm = (items) => (items || []).map((x) => (Array.isArray(x) ? { q: x[0], a: x[1] } : { q: x.q, a: x.a })).filter((x) => x.q);
const fqText = (a) => (typeof a === "string" ? a : "");
/* first sentence for the "in short" line (verbatim), rest of the answer after it */
function fqSplit(a) {
  const s = fqText(a);
  const m = /^(.{25,220}?[.!?])\s+(.+)$/s.exec(s);
  return m ? [m[1], m[2]] : [s, ""];
}
const fqSentences = (a) => fqText(a).split(/(?<=[.!?])\s+(?=[A-Z0-9“"(])/).filter(Boolean);

function FQ_Answer({ w, a }) {
  if (typeof a !== "string") return <div className="fq-a__plain">{a}</div>;
  if (w === "it") {
    const lines = fqSentences(a);
    return (
      <div className="fq-term" aria-label="Answer">
        {lines.map((t, i) => (
          <p key={i}>
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {t}
          </p>
        ))}
      </div>
    );
  }
  if (w === "dm") {
    return (
      <div className="fq-bubble">
        <span className="fq-bubble__av" aria-hidden="true">
          <FRL_Mark s={30} />
        </span>
        <p>{a}</p>
      </div>
    );
  }
  if (w === "af") {
    const [lead, rest] = fqSplit(a);
    return (
      <div className="fq-receipt">
        <p className="fq-receipt__lead">{lead}</p>
        {rest && <p>{rest}</p>}
        <span className="fq-receipt__stamp" aria-hidden="true">
          Answered
        </span>
      </div>
    );
  }
  if (w === "mr") {
    const [lead, rest] = fqSplit(a);
    return (
      <div className="fq-insight">
        {rest ? (
          <>
            <p className="fq-insight__lead">
              <b>In short</b>
              {lead}
            </p>
            <p>{rest}</p>
          </>
        ) : (
          <p>{lead}</p>
        )}
      </div>
    );
  }
  return <p className="fq-a__p">{a}</p>;
}

function FR_FaqList({ items, id, world, help = true }) {
  const list = fqNorm(items);
  const uid = ee.useMemo(() => id || frkUid("fq"), [id]);
  const w = world || fqWorld();
  const vars = fqVars(w);
  const [open, setOpen] = ee.useState(() => new Set([0]));
  const [q, setQ] = ee.useState("");
  const shown = ee.useMemo(() => {
    const n = frkNorm(q.trim());
    return list.map((x, i) => [x, i]).filter(([x]) => !n || frkNorm(x.q + " " + fqText(x.a)).includes(n));
  }, [q, items]);
  if (!list.length) return null;
  const all = open.size >= list.length;
  const toggle = (i) =>
    setOpen((s) => {
      const nx = new Set(s);
      if (nx.has(i)) nx.delete(i);
      else nx.add(i);
      return nx;
    });
  return (
    <div className={"fq fq--" + w} style={{ "--q1": vars.c1, "--q2": vars.c2 }}>
      <div className="fq-bar">
        <span className="fq-bar__count">
          <FRK_I n={vars.ic} s={16} />
          <b>{list.length}</b> {list.length === 1 ? "question" : "questions"}
        </span>
        {list.length > 5 && (
          <label className="fq-bar__search">
            <FRK_I n="lens" s={15} />
            <span className="frk-sr">Filter questions</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter questions…" />
          </label>
        )}
        {list.length > 2 && (
          <button type="button" className="fq-bar__all" onClick={() => setOpen(all ? new Set() : new Set(list.map((_, i) => i)))}>
            {all ? "Collapse all" : "Expand all"}
          </button>
        )}
      </div>
      <ul className="fq-list">
        {shown.map(([x, i], k) => {
          const on = open.has(i);
          return (
            <li key={x.q} className={"fq-item" + (on ? " is-open" : "")} style={{ "--i": k }}>
              <h3 className="fq-q">
                <button type="button" aria-expanded={on} aria-controls={uid + "-a" + i} id={uid + "-q" + i} onClick={() => toggle(i)}>
                  <span className="fq-n" aria-hidden="true">
                    {w === "it" ? "$" : w === "af" ? "#" + String(i + 1).padStart(2, "0") : String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="fq-t">{x.q}</span>
                  <span className="fq-x" aria-hidden="true" />
                </button>
              </h3>
              <div className="fq-a" id={uid + "-a" + i} role="region" aria-labelledby={uid + "-q" + i}>
                <div className="fq-a__in">
                  <FQ_Answer w={w} a={x.a} />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {help && (
        <p className="fq-help">
          <b>Still curious?</b>
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("fr-open-chat"))}>
            <FRK_I n="chat" s={14} /> Ask the assistant
          </button>
          <PpL to="/lets-talk">Talk to a specialist →</PpL>
        </p>
      )}
      {!shown.length && (
        <p className="fq-none">
          No question matches “{q}”.{" "}
          <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("fr-open-chat"))}>
            Ask our assistant instead
          </button>
        </p>
      )}
    </div>
  );
}

/* left-column art: an animated question mark in the world's colours with orbiting chips */
function FQ_Art({ w, n }) {
  const vars = fqVars(w);
  return (
    <div className={"fq-art fq-art--" + w} style={{ "--q1": vars.c1, "--q2": vars.c2 }} aria-hidden="true">
      <span className="fq-art__ring" />
      <span className="fq-art__ring fq-art__ring--2" />
      <span className="fq-art__mark">?</span>
      {[0, 1, 2].map((k) => (
        <span key={k} className="fq-art__chip" style={{ "--k": k }}>
          <FRK_I n={[vars.ic, "chat", "check"][k]} s={16} />
        </span>
      ))}
      <span className="fq-art__n">
        <b>{n}</b>
        answers
      </span>
    </div>
  );
}

function FR_Faq({ id, title, items, aside }) {
  const w = fqWorld();
  const vars = fqVars(w);
  const n = fqNorm(items).length;
  return (
    <section className={"fq-sec fq-sec--" + w} aria-labelledby={id} style={{ "--q1": vars.c1, "--q2": vars.c2 }}>
      <div className="container fq-sec__in">
        <div className="fq-sec__head">
          <span className="fq-kick">
            <FRK_I n={vars.ic} s={14} /> FAQ · {vars.label}
          </span>
          <h2 id={id}>{title}</h2>
          {aside && <p className="fq-sec__aside">{aside}</p>}
          <FQ_Art w={w} n={n} />
          <div className="fq-sec__help">
            <b>Didn't find it?</b>
            <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("fr-open-chat"))}>
              <FRK_I n="chat" s={16} /> Ask the assistant
            </button>
            <PpL to="/lets-talk">
              Talk to a specialist <FRK_I n="arrow" s={14} />
            </PpL>
          </div>
        </div>
        <FR_FaqList items={items} id={id + "-l"} world={w} help={false} />
      </div>
    </section>
  );
}

export { FR_Faq, FR_FaqList };
