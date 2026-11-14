/*
 * Super admin panel: what comes in from visitors. Dashboard, Leads (every form, download, careers application and chat),
 * Live chat (answer visitors in their chat window) and Reviews.
 */
import * as ee from 'react';
import { admApi, admDownload, admNum, admWhen } from './api.jsx';
import { AdmBtn, AdmField, AdmStatus, admLabel } from './Fields.jsx';

const KIND = { enquiry: "Enquiry", download: "Download", "case-study-download": "Case study download", "resource-download": "Resource download", careers: "Careers application", chat: "Live chat" };
const STATUS = ["new", "contacted", "qualified", "won", "lost", "spam"];
// build 78.3: the type of request, and who follows it up
const CATEGORY = { service: "Service enquiry", rfq: "RFQ / quote", partnership: "Partnership", contact: "General contact", download: "Download", chat: "Live chat", careers: "Job application", other: "Other" };
let ASSIGNEES = {};
const assignees = (kind) => (ASSIGNEES[kind] = ASSIGNEES[kind] || admApi("/admin/leads/assignees?kind=" + (kind === "careers" ? "careers" : "")).catch(() => ({ admins: [], canAssign: false })));

function useLoad(fn, deps, every = 0) {
  const [st, setSt] = ee.useState({ loading: true, data: null, err: "" });
  const run = ee.useCallback(() => fn().then((data) => setSt({ loading: false, data, err: "" })).catch((e) => setSt((s) => ({ ...s, loading: false, err: e.message }))), deps);
  ee.useEffect(() => { run(); if (!every) return; const t = setInterval(run, every); return () => clearInterval(t); }, [run]);
  return [st, run];
}

/* ---------------------------------------------------------------- dashboard */
function Bars({ series }) {
  const max = Math.max(1, ...series.map((d) => d.visits));
  const maxL = Math.max(1, ...series.map((d) => d.leads));
  return (
    <div className="adm-bars" role="img" aria-label="Visits and leads per day">
      {series.map((d) => (
        <div className="adm-bars__d" key={d.day} title={`${d.day}: ${d.visits} page views, ${d.visitors} visitors, ${d.leads} leads`}>
          <span className="adm-bars__v" style={{ height: (d.visits / max) * 100 + "%" }} />
          <span className="adm-bars__l" style={{ height: (d.leads / maxL) * 40 + "%" }} />
        </div>
      ))}
    </div>
  );
}

function Dashboard({ go }) {
  const [days, setDays] = ee.useState(30);
  const [st] = useLoad(() => admApi("/admin/stats?days=" + days), [days], 60000);
  const s = st.data;
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Dashboard</h1>
        <select className="adm-in adm-in--auto" value={days} onChange={(e) => setDays(+e.target.value)} aria-label="Period">
          {[7, 30, 90, 365].map((d) => <option key={d} value={d}>Last {d} days</option>)}
        </select>
      </header>
      {st.err && <AdmStatus s={{ err: st.err }} />}
      {!s ? <p className="adm-muted">Loading…</p> : (
        <>
          <div className="adm-kpis">
            <button className="adm-kpi" onClick={() => go("visits")}><small>Page views today</small><b>{admNum(s.visits.today)}</b><em>{admNum(s.visits.total)} in {days} days</em></button>
            <button className="adm-kpi" onClick={() => go("leads")}><small>Leads waiting</small><b>{admNum(s.leads.unread)}</b><em>{admNum(s.leads.total)} leads in all</em></button>
            <button className="adm-kpi" onClick={() => go("chat")}><small>Open chats</small><b>{admNum(s.chats.open)}</b><em>{admNum(s.chats.total)} chats in all</em></button>
            <button className="adm-kpi" onClick={() => go("reviews")}><small>Reviews to approve</small><b>{admNum(s.reviews.pending || 0)}</b><em>{admNum(s.reviews.published || 0)} published</em></button>
          </div>
          <div className="adm-panel"><h2>Visits and leads per day</h2><Bars series={s.series} /><p className="adm-legend"><i className="v" /> page views <i className="l" /> leads</p></div>
          <div className="adm-cols">
            <div className="adm-panel"><h2>Most visited pages</h2><Rank rows={s.visits.pages.map((p) => [p.path, p.n])} empty="No visits yet." /></div>
            <div className="adm-panel"><h2>Where visitors came from</h2><Rank rows={s.visits.referrers.map((p) => [p.ref, p.n])} empty="No referring sites yet." /></div>
            <div className="adm-panel"><h2>Leads by type</h2><Rank rows={s.leads.byKind.map((p) => [KIND[p.kind] || p.kind, p.n])} empty="No leads in this period." /></div>
            <div className="adm-panel"><h2>Most requested downloads</h2><Rank rows={s.leads.resources.map((p) => [p.name, p.n])} empty="No downloads in this period." /></div>
          </div>
        </>
      )}
    </section>
  );
}
const Rank = ({ rows, empty }) => (!rows.length ? <p className="adm-muted">{empty}</p> : <ol className="adm-rank">{rows.map(([a, n], i) => <li key={i}><span>{String(a)}</span><b>{admNum(n)}</b></li>)}</ol>);

/* ---------------------------------------------------------------- visits */
function Visits() {
  const [days, setDays] = ee.useState(7);
  const [st] = useLoad(() => admApi("/admin/visits?days=" + days + "&limit=500"), [days], 30000);
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Visits</h1>
        <select className="adm-in adm-in--auto" value={days} onChange={(e) => setDays(+e.target.value)}>{[1, 7, 30, 90].map((d) => <option key={d} value={d}>Last {d} days</option>)}</select>
      </header>
      <p className="adm-muted">Every page view, newest first (no cookies; visitors are counted by an anonymous code). {st.data && admNum(st.data.total) + " page views."}</p>
      <div className="adm-table"><table><thead><tr><th>When</th><th>Page</th><th>From</th><th>Device</th><th>Visitor</th></tr></thead><tbody>
        {(st.data ? st.data.visits : []).map((v, i) => <tr key={i}><td>{admWhen(v.at)}</td><td><a href={v.path} target="_blank" rel="noreferrer">{v.path}</a></td><td>{v.ref || "—"}</td><td>{v.mobile ? "Phone" : "Computer"}</td><td><code>{v.ip}</code></td></tr>)}
      </tbody></table></div>
    </section>
  );
}

/* ---------------------------------------------------------------- leads */
const SKIP_F = new Set(["id", "kind", "status", "at", "note", "updated", "ip", "ua", "cv", "extra", "hr", "mail"]);
function LeadDetail({ id, onChange, onClose }) {
  const [st, reload] = useLoad(() => admApi("/admin/leads/" + id).then((j) => j.lead), [id]);
  const [note, setNote] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const l = st.data;
  const [who, setWho] = ee.useState(null);
  ee.useEffect(() => { if (l) setNote(l.note || ""); }, [l && l.id]);
  ee.useEffect(() => { if (l) assignees(l.kind).then(setWho); }, [l && l.kind]);
  if (!l) return <aside className="adm-drawer"><p className="adm-muted">Loading…</p></aside>;
  const save = async (patch) => { try { await admApi("/admin/leads/" + id, { method: "PATCH", body: patch }); setMsg({ ok: "Saved." }); reload(); onChange(); } catch (e) { setMsg({ err: e.message }); } };
  const del = async () => { if (!confirm("Delete this lead for good?")) return; await admApi("/admin/leads/" + id, { method: "DELETE" }); onChange(); onClose(); };
  const show = (v) => (v == null || v === "" ? "—" : typeof v === "object" ? JSON.stringify(v, null, 1) : String(v));
  return (
    <aside className="adm-drawer" aria-label="Lead details">
      <header><h2>{l.name || [l.first, l.last].filter(Boolean).join(" ") || l.email}</h2><AdmBtn kind="ghost" onClick={onClose}>Close ✕</AdmBtn></header>
      <p className="adm-muted">{KIND[l.kind] || l.kind} · {admWhen(l.at)}</p>
      <div className="adm-row">
        <AdmField label="Status"><select className="adm-in" value={l.status || "new"} onChange={(e) => save({ status: e.target.value })}>{STATUS.map((s) => <option key={s} value={s}>{admLabel(s)}</option>)}</select></AdmField>
        <AdmField label="Type"><select className="adm-in" value={l.category || ""} onChange={(e) => save({ category: e.target.value })}>{!l.category && <option value="">—</option>}{Object.entries(CATEGORY).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></AdmField>
        {who && (who.canAssign
          ? <AdmField label="Assigned to"><select className="adm-in" value={l.assignee || ""} onChange={(e) => save({ assignee: e.target.value })}><option value="">Nobody yet</option>{who.admins.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}</select></AdmField>
          : <AdmField label="Assigned to"><span className="adm-in">{l.assigneeName || "Nobody yet"}</span></AdmField>)}
      </div>
      <AdmField label="Your note"><textarea className="adm-in adm-ta" rows={3} value={note || ""} onChange={(e) => setNote(e.target.value)} /></AdmField>
      <div className="adm-row"><AdmBtn kind="primary" onClick={() => save({ note })}>Save note</AdmBtn>{l.email && <a className="adm-btn" href={"mailto:" + l.email}>Email {l.email}</a>}{l.phone && <a className="adm-btn" href={"tel:" + (l.countryCode || "") + l.phone}>Call</a>}</div>
      <AdmStatus s={msg} />
      {l.cv && <p><AdmBtn kind="primary" onClick={() => admDownload("/admin/files/" + l.cv.id, l.cv.name)}>Download CV ({l.cv.name})</AdmBtn></p>}
      {l.kind === "careers" && (
        <div className="adm-panel">
          <h3>SampCrew (HR)</h3>
          <p className="adm-muted">{l.hr ? (l.hr.ok ? "Sent to SampCrew" + (l.hr.id ? " as " + l.hr.id : "") + " on " + admWhen(l.hr.sent) + "." : "Not sent: " + (l.hr.error || "SampCrew did not answer") + ".") + (l.hr.stage ? " Stage: " + l.hr.stage + (l.hr.note ? " (" + l.hr.note + ")" : "") + "." : "") : "Not sent yet."}</p>
          <AdmBtn small onClick={async () => { try { await admApi("/admin/integrations/sampcrew/send/" + id, { body: {} }); setMsg({ ok: "Sent to SampCrew." }); } catch (e) { setMsg({ err: e.message }); } reload(); }}>{l.hr && l.hr.ok ? "Send again" : "Send to SampCrew"}</AdmBtn>
        </div>
      )}
      {l.extra && typeof l.extra === "object" && Object.keys(l.extra).length > 0 && (<>
        <h3>Extra form fields</h3>
        <dl className="adm-dl">{Object.entries(l.extra).map(([k, v]) => <ee.Fragment key={k}><dt>{k}</dt><dd><pre>{show(v)}</pre></dd></ee.Fragment>)}</dl>
      </>)}
      <h3>Everything they sent</h3>
      <dl className="adm-dl">
        {Object.keys(l).filter((k) => !SKIP_F.has(k)).map((k) => <ee.Fragment key={k}><dt>{admLabel(k)}</dt><dd>{k === "page" && l[k] ? <a href={l[k]} target="_blank" rel="noreferrer">{l[k]}</a> : <pre>{show(l[k])}</pre>}</dd></ee.Fragment>)}
        <dt>Browser</dt><dd><pre>{show(l.ua)}</pre></dd>
        <dt>Lead id</dt><dd><code>{l.id}</code></dd>
      </dl>
      <AdmBtn kind="danger" onClick={del}>Delete lead</AdmBtn>
    </aside>
  );
}

function Leads() {
  const [f, setF] = ee.useState({ kind: "", status: "", category: "", assignee: "", q: "", from: "", to: "" });
  const [skip, setSkip] = ee.useState(0);
  const [open, setOpen] = ee.useState(null);
  const qs = new URLSearchParams(Object.entries({ ...f, skip, limit: 50 }).filter(([, v]) => v !== "" && v != null)).toString();
  const [st, reload] = useLoad(() => admApi("/admin/leads?" + qs), [qs], 30000);
  const d = st.data;
  const set = (k) => (e) => { setSkip(0); setF({ ...f, [k]: e.target.value }); };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Leads</h1><AdmBtn onClick={() => admDownload("/admin/leads?format=csv&" + new URLSearchParams(Object.entries(f).filter(([, v]) => v)).toString(), "leads.csv")}>Export CSV</AdmBtn></header>
      <div className="adm-filters">
        <input className="adm-in" placeholder="Search name, email, company, message…" value={f.q} onChange={set("q")} />
        <select className="adm-in adm-in--auto" value={f.kind} onChange={set("kind")}><option value="">All types</option>{Object.entries(KIND).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <select className="adm-in adm-in--auto" value={f.category} onChange={set("category")}><option value="">Any request type</option>{Object.entries(CATEGORY).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <select className="adm-in adm-in--auto" value={f.assignee} onChange={set("assignee")}><option value="">Anyone</option><option value="me">Assigned to me</option><option value="none">Not assigned</option></select>
        <select className="adm-in adm-in--auto" value={f.status} onChange={set("status")}><option value="">Any status</option>{STATUS.map((s) => <option key={s} value={s}>{admLabel(s)}</option>)}</select>
        <input className="adm-in adm-in--auto" type="date" value={f.from} onChange={set("from")} aria-label="From" />
        <input className="adm-in adm-in--auto" type="date" value={f.to} onChange={set("to")} aria-label="To" />
      </div>
      {st.err && <AdmStatus s={{ err: st.err }} />}
      <div className="adm-table"><table><thead><tr><th>Received</th><th>Type</th><th>Name</th><th>Email</th><th>Company</th><th>Country</th><th>About</th><th>Assigned</th><th>Status</th></tr></thead><tbody>
        {(d ? d.leads : []).map((l) => (
          <tr key={l.id} className={(open === l.id ? "is-on " : "") + (!l.status || l.status === "new" ? "is-new" : "")} onClick={() => setOpen(l.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen(l.id)}>
            <td>{admWhen(l.at)}</td><td>{CATEGORY[l.category] || KIND[l.kind] || l.kind}</td><td>{l.name || [l.first, l.last].filter(Boolean).join(" ")}</td><td>{l.email}</td><td>{l.company}</td><td>{l.country}</td>
            <td className="adm-clip">{l.resource || l.title || l.service || l.department || l.type || l.message}</td><td>{l.assigneeName || "—"}</td><td><span className={"adm-pill adm-pill--" + (l.status || "new")}>{admLabel(l.status || "new")}</span></td>
          </tr>
        ))}
        {d && !d.leads.length && <tr><td colSpan={9} className="adm-muted">No leads match.</td></tr>}
      </tbody></table></div>
      {d && <div className="adm-pager"><span>{admNum(d.total)} leads</span><AdmBtn small disabled={!skip} onClick={() => setSkip(Math.max(0, skip - 50))}>← Newer</AdmBtn><AdmBtn small disabled={skip + 50 >= d.total} onClick={() => setSkip(skip + 50)}>Older →</AdmBtn></div>}
      {open && <LeadDetail id={open} onChange={reload} onClose={() => setOpen(null)} />}
    </section>
  );
}

/* ---------------------------------------------------------------- live chat */
function Chat() {
  const [status, setStatus] = ee.useState("open");
  const [list, reloadList] = useLoad(() => admApi("/admin/chats" + (status ? "?status=" + status : "")).then((j) => j.chats), [status], 8000);
  const [cur, setCur] = ee.useState(null);
  const [chat, reload] = useLoad(() => (cur ? admApi("/admin/chats/" + cur).then((j) => j.chat) : Promise.resolve(null)), [cur], 5000);
  const [text, setText] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const end = ee.useRef(null);
  const c = chat.data;
  ee.useEffect(() => { end.current && end.current.scrollIntoView({ block: "end" }); }, [c && c.messages.length]);
  const send = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    try { await admApi(`/admin/chats/${cur}/reply`, { body: { text } }); setText(""); setMsg(null); reload(); reloadList(); } catch (x) { setMsg({ err: x.message }); }
  };
  const act = async (a) => { await admApi(`/admin/chats/${cur}/${a}`, { body: {} }); reload(); reloadList(); };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Live chat</h1>
        <div className="adm-row">
          <select className="adm-in adm-in--auto" value={status} onChange={(e) => setStatus(e.target.value)}><option value="open">Open</option><option value="closed">Closed</option><option value="">All</option></select>
          <AdmBtn onClick={() => admDownload("/admin/chats/export?format=csv", "live-chats.csv").catch((e) => setMsg({ err: e.message }))}>Download all (CSV)</AdmBtn>
          <AdmBtn onClick={() => admDownload("/admin/chats/export?format=txt", "live-chats.txt").catch((e) => setMsg({ err: e.message }))}>Download all (text)</AdmBtn>
        </div>
      </header>
      <p className="adm-muted">Visitors who ask the website chat for a specialist appear here. Your reply shows in their chat window within a few seconds (and they also have your answer by email if you send one).</p>
      <div className="adm-chat">
        <ul className="adm-chat__list">
          {(list.data || []).map((x) => (
            <li key={x.id}><button className={cur === x.id ? "is-on" : ""} onClick={() => setCur(x.id)}>
              <b>{x.name || x.email}</b>{x.unread > 0 && <em className="adm-dot">{x.unread}</em>}
              <small>{x.last ? x.last.text.slice(0, 70) : ""}</small><small>{admWhen(x.updated)}</small>
            </button></li>
          ))}
          {list.data && !list.data.length && <li className="adm-muted">No chats.</li>}
        </ul>
        <div className="adm-chat__main">
          {!c ? <p className="adm-muted">Choose a conversation.</p> : (
            <>
              <header className="adm-chat__h"><div><b>{c.name}</b> · <a href={"mailto:" + c.email}>{c.email}</a>{c.phone && " · " + c.phone}{c.country && " · " + c.country}<br /><small>Started {admWhen(c.started)} on <a href={c.page} target="_blank" rel="noreferrer">{c.page}</a></small></div>
                <div className="adm-row">
                  <AdmBtn small onClick={() => admDownload(`/admin/chats/${cur}/export?format=txt`, "chat-" + cur + ".txt")}>Download</AdmBtn>
                  {c.status === "open" ? <AdmBtn small onClick={() => act("close")}>Close chat</AdmBtn> : <AdmBtn small onClick={() => act("reopen")}>Reopen</AdmBtn>}
                </div>
              </header>
              {c.transcript && c.transcript.length > 0 && <details className="adm-chat__tr"><summary>What they asked the assistant before ({c.transcript.length} messages)</summary>{c.transcript.map((m, i) => <p key={i} className={"adm-msg adm-msg--" + m.from}>{m.text}</p>)}</details>}
              <div className="adm-chat__msgs">
                {c.messages.map((m) => <p key={m.i} className={"adm-msg adm-msg--" + m.from}><span>{m.text}</span><small>{m.from === "agent" ? "You" : m.from === "bot" ? "Assistant" : c.name} · {admWhen(m.at)}</small></p>)}
                <span ref={end} />
              </div>
              <form className="adm-chat__send" onSubmit={send}>
                <textarea className="adm-in adm-ta" rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder={"Reply to " + (c.name || "the visitor") + "…"} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) send(e); }} />
                <AdmBtn kind="primary" type="submit">Send</AdmBtn>
              </form>
              <AdmStatus s={msg} />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- reviews */
const SVC = { "market-research": "Market Research", "digital-marketing": "Digital Marketing", "it-development": "IT Development", "accounts-finance": "Accounts & Finance" };
function ReviewCard({ r, reload }) {
  const [ed, setEd] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const act = async (action) => { if (action === "delete" && !confirm("Delete this review for good?")) return; try { await admApi("/admin/reviews/" + r.id, { body: { action } }); reload(); } catch (e) { setMsg({ err: e.message }); } };
  const save = async () => { try { await admApi("/admin/reviews/" + r.id, { method: "PATCH", body: ed }); setEd(null); setMsg({ ok: "Saved." }); reload(); } catch (e) { setMsg({ err: e.message }); } };
  const f = (k, long) => <AdmField label={admLabel(k)}>{long ? <textarea className="adm-in adm-ta" rows={4} value={ed[k] || ""} onChange={(e) => setEd({ ...ed, [k]: e.target.value })} /> : <input className="adm-in" value={ed[k] == null ? "" : ed[k]} onChange={(e) => setEd({ ...ed, [k]: k === "rating" ? +e.target.value : e.target.value })} />}</AdmField>;
  return (
    <article className={"adm-rv adm-rv--" + r.status}>
      <header><b>{"★".repeat(r.rating)}<span>{"★".repeat(5 - r.rating)}</span></b><span className={"adm-pill adm-pill--" + r.status}>{admLabel(r.status)}</span><small>{admWhen(r.date)}</small></header>
      {!ed ? (
        <>
          <blockquote>{r.review}</blockquote>
          {r.reply && <p className="adm-rv__reply"><b>Your reply:</b> {r.reply}</p>}
          <p><b>{r.first} {r.last}</b>{r.designation && ", " + r.designation}{r.company && " · " + r.company} · {r.country} · {(r.services || []).map((s) => SVC[s] || s).join(", ")}</p>
          <p className="adm-muted">{r.email}{r.phone && " · " + (r.countryCode || "") + " " + r.phone} · from <a href={r.page} target="_blank" rel="noreferrer">{r.page || "—"}</a></p>
          <div className="adm-row">
            {r.status !== "published" && <AdmBtn kind="primary" small onClick={() => act("publish")}>Publish</AdmBtn>}
            {r.status !== "hidden" && <AdmBtn small onClick={() => act("hide")}>Hide</AdmBtn>}
            <AdmBtn small onClick={() => setEd({ first: r.first, last: r.last, company: r.company, designation: r.designation, country: r.country, rating: r.rating, review: r.review, reply: r.reply || "" })}>Edit or reply</AdmBtn>
            <AdmBtn small kind="danger" onClick={() => act("delete")}>Delete</AdmBtn>
          </div>
        </>
      ) : (
        <div className="adm-form">
          <div className="adm-row">{f("first")}{f("last")}{f("rating")}</div>
          <div className="adm-row">{f("company")}{f("designation")}{f("country")}</div>
          {f("review", true)}{f("reply", true)}
          <div className="adm-row"><AdmBtn kind="primary" onClick={save}>Save</AdmBtn><AdmBtn onClick={() => setEd(null)}>Cancel</AdmBtn></div>
        </div>
      )}
      <AdmStatus s={msg} />
    </article>
  );
}
function Reviews() {
  const [status, setStatus] = ee.useState("pending");
  const [q, setQ] = ee.useState("");
  const [st, reload] = useLoad(() => admApi("/admin/reviews?" + new URLSearchParams({ status, q })).then((j) => j.reviews), [status, q], 30000);
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Reviews</h1></header>
      <div className="adm-filters">
        <select className="adm-in adm-in--auto" value={status} onChange={(e) => setStatus(e.target.value)}><option value="pending">Waiting for approval</option><option value="published">Published</option><option value="hidden">Hidden</option><option value="">All</option></select>
        <input className="adm-in" placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {st.err && <AdmStatus s={{ err: st.err }} />}
      <div className="adm-rvs">{(st.data || []).map((r) => <ReviewCard key={r.id} r={r} reload={reload} />)}{st.data && !st.data.length && <p className="adm-muted">No reviews here.</p>}</div>
    </section>
  );
}

export { Chat as AdmChat, Dashboard as AdmDashboard, Leads as AdmLeads, Reviews as AdmReviews, Visits as AdmVisits, useLoad as admUseLoad };
