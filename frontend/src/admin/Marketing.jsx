/*
 * Super admin, build 78: people and marketing. Contacts (everyone who sent a form, with consent), email templates with
 * animated designs, automations (instant replies, team alerts, follow-ups, welcome, monthly newsletter), newsletters,
 * social media (one-click post to every platform, calendar, AI manager), the AI writer and the connections overview.
 * Server side: backend/src/routes/marketing.js, social.js, integrations.js. Keys: docs/go-live/12-MARKETING-AND-KEYS.md.
 */
import * as ee from 'react';
import { KeyRound, Lock, ShieldCheck } from 'lucide-react';
import { admApi, admCan, admMe, admClone, admDownload, admGet, admNum, admPut, admSame, admWhen } from './api.jsx';
import { AdmBtn, AdmCard, AdmField, AdmImage, AdmStatus, AdmValue, blankLike } from './Fields.jsx';
import { admUseLoad as useLoad } from './Inbox.jsx';
import { useAdmImportTarget } from './Import.jsx';
import { AdmFieldInput as FieldInput } from './Builder.jsx';

const Kpi = ({ n, l }) => <div className="adm-kpi"><b>{n}</b><span>{l}</span></div>;
const NotReady = ({ what, keys, go }) => (
  <p className="adm-status is-err adm78-warn">{what} is not connected yet, so nothing is sent: add {keys} to the server's .env file and restart the backend. {go && <a href="#" onClick={(e) => { e.preventDefault(); go("keys"); }}>See Connections & keys</a>}</p>
);

/* ======================================================================================== Contacts */
function parseCsv(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; }
    else if (c === '"') q = true;
    else if (c === "," || c === ";" || c === "\t") { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [h, ...body] = rows.filter((r) => r.some((x) => x.trim()));
  if (!h) return [];
  const keys = h.map((x) => x.trim().toLowerCase().replace(/^e-?mail.*/, "email").replace(/^(full )?name$/, "name"));
  return body.map((r) => Object.fromEntries(keys.map((k, i) => [k, (r[i] || "").trim()]))).filter((r) => r.email);
}
function Contacts({ go }) {
  const [f, setF] = ee.useState({ q: "", form: "", subscribed: "" });
  const [skip, setSkip] = ee.useState(0);
  const qs = new URLSearchParams(Object.entries({ ...f, skip, limit: 50 }).filter(([, v]) => v !== "")).toString();
  const [st, reload] = useLoad(() => admApi("/admin/contacts?" + qs), [qs]);
  const [stats, reloadStats] = useLoad(() => admApi("/admin/marketing/stats"), []);
  const [msg, setMsg] = ee.useState(null);
  const s = stats.data;
  const d = st.data;
  const set = (k) => (e) => { setSkip(0); setF({ ...f, [k]: e.target.value }); };
  const imp = async (e) => {
    const file = e.target.files && e.target.files[0]; e.target.value = "";
    if (!file) return;
    const rows = parseCsv(await file.text());
    if (!rows.length) return setMsg({ err: "No rows with an email column were found." });
    const sub = confirm(rows.length + " contacts found. Did every one of them agree to receive your newsletter? OK = yes, add them as subscribers. Cancel = add them without subscribing.");
    try { const r = await admApi("/admin/contacts/import", { body: { rows, subscribed: sub } }); setMsg({ ok: admNum(r.imported) + " contacts imported." }); reload(); reloadStats(); } catch (x) { setMsg({ err: x.message }); }
  };
  // build 78.4: Import from a file (Excel, CSV, JSON) in the banner
  useAdmImportTarget({ label: "Contacts", sample: { email: "", name: "", company: "", country: "", tags: "" }, replace: false, verb: "Import these contacts",
    apply: async (rows) => {
      rows = rows.filter((r) => /@/.test(r.email || ""));
      if (!rows.length) throw new Error("No rows with an email address. Match the email column first.");
      const sub = confirm(rows.length + " contacts found. Did every one of them agree to receive your newsletter? OK = yes, add them as subscribers. Cancel = add them without subscribing.");
      const r = await admApi("/admin/contacts/import", { body: { rows, subscribed: sub } }); reload(); reloadStats();
      return { message: admNum(r.imported) + " contacts imported." };
    } }, []);
  const patch = async (c, body) => { try { await admApi("/admin/contacts/" + encodeURIComponent(c.id), { method: "PATCH", body }); reload(); reloadStats(); } catch (x) { setMsg({ err: x.message }); } };
  const del = async (c) => { if (!confirm("Delete " + c.id + " from the contacts (their leads stay)?")) return; await admApi("/admin/contacts/" + encodeURIComponent(c.id), { method: "DELETE" }); reload(); reloadStats(); };
  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>Contacts & form counts</h1>
        <div className="adm-row">
          <AdmBtn onClick={() => admDownload("/admin/contacts?format=csv&" + new URLSearchParams(Object.entries(f).filter(([, v]) => v)).toString(), "contacts.csv")}>Export CSV</AdmBtn>
          <label className="adm-btn">Import CSV<input type="file" accept=".csv,text/csv,.txt" hidden onChange={imp} /></label>
        </div>
      </header>
      <p className="adm-muted">Everyone who sent a form, downloaded something, started a chat or signed up for the newsletter, once per email address. Only people who ticked consent get newsletters and follow-ups.</p>
      <AdmStatus s={msg} />
      {s && <div className="adm-kpis"><Kpi n={admNum(s.contacts.total)} l="Contacts" /><Kpi n={admNum(s.contacts.subscribed)} l="Subscribed" /><Kpi n={admNum((s.queue || {}).sent)} l="Emails sent" /><Kpi n={admNum(s.opened)} l="Emails opened" /><Kpi n={admNum((s.queue || {}).queued)} l="Waiting to send" /></div>}
      {s && !s.mail.ready && <NotReady what="Email" keys="MAIL_FROM and an email provider (SMTP_HOST… or RESEND_API_KEY, SENDGRID_API_KEY, BREVO_API_KEY)" go={go} />}
      {s && (
        <div className="adm-cols">
          <div className="adm-panel"><h3>People per form</h3>
            <div className="adm-table"><table><thead><tr><th>Form</th><th>People</th><th>Submissions</th></tr></thead><tbody>
              {(s.forms || []).map((x) => <tr key={x.form} onClick={() => { setSkip(0); setF({ ...f, form: x.form }); }} className={f.form === x.form ? "is-on" : ""}><td>{x.form}</td><td>{admNum(x.people)}</td><td>{admNum(x.submissions)}</td></tr>)}
              {!(s.forms || []).length && <tr><td colSpan={3} className="adm-muted">No forms sent yet.</td></tr>}
            </tbody></table></div>
          </div>
          <div className="adm-panel"><h3>Interested in</h3>
            <ol className="adm-rank">{(s.contacts.byService || []).slice(0, 12).map((x) => <li key={x.service}><span>{x.service}</span><b>{admNum(x.n)}</b></li>)}</ol>
            {!(s.contacts.byService || []).length && <p className="adm-muted">Nothing yet.</p>}
          </div>
        </div>
      )}
      <div className="adm-filters">
        <input className="adm-in" placeholder="Search email, name, company, country…" value={f.q} onChange={set("q")} />
        <select className="adm-in adm-in--auto" value={f.form} onChange={set("form")}><option value="">Every form</option>{((s && s.forms) || []).map((x) => <option key={x.form} value={x.form}>{x.form}</option>)}</select>
        <select className="adm-in adm-in--auto" value={f.subscribed} onChange={set("subscribed")}><option value="">Everyone</option><option value="yes">Subscribed</option><option value="no">Not subscribed</option></select>
      </div>
      <div className="adm-table"><table><thead><tr><th>Email</th><th>Name</th><th>Company</th><th>Country</th><th>Forms</th><th>Leads</th><th>Last</th><th>Newsletter</th><th /></tr></thead><tbody>
        {(d ? d.contacts : []).map((c) => (
          <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.company}</td><td>{c.country}</td><td className="adm-clip">{(c.forms || []).join(", ")}</td><td>{c.leads || 0}</td><td>{admWhen(c.last)}</td>
            <td><label className="adm-sw"><input type="checkbox" checked={!!c.subscribed} onChange={(e) => patch(c, { subscribed: e.target.checked })} /><span>{c.subscribed ? "Yes" : "No"}</span></label></td>
            <td><AdmBtn small kind="ghost" onClick={() => del(c)} title="Delete">✕</AdmBtn></td></tr>
        ))}
        {d && !d.contacts.length && <tr><td colSpan={9} className="adm-muted">No contacts match.</td></tr>}
      </tbody></table></div>
      {d && <div className="adm-pager"><span>{admNum(d.total)} contacts</span><AdmBtn small disabled={!skip} onClick={() => setSkip(Math.max(0, skip - 50))}>← Newer</AdmBtn><AdmBtn small disabled={skip + 50 >= d.total} onClick={() => setSkip(skip + 50)}>Older →</AdmBtn></div>}
    </section>
  );
}

/* ======================================================================================== Email templates */
const TPL_FIELDS = [["name", "Name (only you see it)", "text"], ["subject", "Subject", "text"], ["preheader", "Preview line (after the subject in the inbox)", "text"], ["design", "Design", "select"], ["accent", "Colour", "select", ["royal", "violet", "teal", "gold", "rose", "navy"]], ["kicker", "Small line above the heading", "text"], ["heading", "Heading", "text"], ["image", "Picture under the header (optional)", "image"], ["body", "Text (blank line = new paragraph, **bold**, - bullet)", "area"], ["highlights", "Highlight cards", "list", [["t", "Title", "text"], ["d", "Text", "text"], ["url", "Link", "link"]]], ["button", "Button", "button"], ["footer", "Footer line", "text"]];
const VARS = "{{first}} first name · {{name}} · {{email}} · {{company}} · {{service}} · {{resource}} · {{title}} · {{page}} · {{message}}";
function Preview({ tpl }) {
  const [p, setP] = ee.useState(null), [err, setErr] = ee.useState("");
  ee.useEffect(() => {
    const t = setTimeout(() => admApi("/admin/mail/preview", { body: { template: tpl } }).then((r) => { setP(r); setErr(""); }).catch((e) => setErr(e.message)), 350);
    return () => clearTimeout(t);
  }, [JSON.stringify(tpl)]);
  if (err) return <p className="adm-status is-err">{err}</p>;
  if (!p) return <p className="adm-muted">Preview…</p>;
  return <div className="adm78-mail"><p><b>Subject:</b> {p.subject}</p><iframe title="Email preview" srcDoc={p.html} sandbox="" /></div>;
}
function Emails({ go }) {
  const [d, setD] = ee.useState(null), [list, setList] = ee.useState(null), [orig, setOrig] = ee.useState(null), [settings, setSettings] = ee.useState({});
  const [cur, setCur] = ee.useState(null), [msg, setMsg] = ee.useState(null), [to, setTo] = ee.useState("");
  const load = async () => { const j = await admApi("/admin/mail/templates"); setD(j); setList(admClone(j.templates)); setOrig(admClone(j.templates)); setSettings(j.settings || {}); };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);
  if (!list) return <section className="adm-sec"><h1>Email templates</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const i = list.findIndex((t) => t.id === cur);
  const t = i >= 0 ? list[i] : null;
  const upd = (v) => setList(list.map((x, j) => (j === i ? v : x)));
  const add = (from) => {
    const name = prompt("Name of the new template:", from ? from.name + " (copy)" : "");
    if (!name) return;
    let id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "tpl";
    while (list.some((x) => x.id === id)) id += "-2";
    const n = from ? { ...admClone(from), id, name, builtIn: false } : { id, name, design: "spotlight", subject: "", preheader: "", kicker: "Frequent Research", heading: "Hello {{first}}", body: "", image: "", button: { label: "Talk to our team", url: "/lets-talk" }, highlights: [], footer: "", accent: "royal" };
    setList([...list, n]); setCur(id);
  };
  const save = async () => { try { await admApi("/admin/mail/templates", { method: "PUT", body: { templates: list, settings } }); setMsg({ ok: "Saved. Every email from now on uses it." }); await load(); } catch (e) { setMsg({ err: e.message }); } };
  const test = async () => { try { await admApi("/admin/mail/test", { body: { template: t, to } }); setMsg({ ok: "Test sent to " + to + "." }); } catch (e) { setMsg({ err: e.message }); } };
  const ai = async () => {
    const brief = prompt("What should this email say? (who gets it, why, what you want them to do)");
    if (!brief) return;
    setMsg({ ok: "Writing…" });
    try { const r = await admApi("/admin/ai/write", { body: { kind: /newsletter/.test(t.id) ? "newsletter" : "email", brief } }); const x = r.data || {}; upd({ ...t, ...Object.fromEntries(Object.entries(x).filter(([, v]) => v != null && v !== "")) }); setMsg({ ok: "Draft written. Check it, then save." }); }
    catch (e) { setMsg({ err: e.message }); }
  };
  const dirty = !admSame([list, settings], [orig, d.settings || {}]);
  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>Email templates</h1><AdmBtn kind="primary" onClick={() => add(null)}>+ New template</AdmBtn></header>
      <p className="adm-muted">The emails the website sends by itself: one reply per form and service, follow-ups, the welcome email and newsletters. Ten animated designs in the site's colours (the animation plays in Apple Mail, iOS, Outlook.com and most phones; Gmail shows the still design). Words in double braces are filled in per person: {VARS}.</p>
      {!d.mail.ready && <NotReady what="Email" keys="MAIL_FROM and an email provider" go={go} />}
      <div className="adm-cols adm-cols--side">
        <div className="adm78-map">
          {list.map((x) => <button key={x.id} type="button" className={cur === x.id ? "is-on" : ""} onClick={() => setCur(x.id)}>{x.name || x.id}<small>{x.id}{x.builtIn ? "" : " · yours"}</small></button>)}
          <div className="adm-panel"><h3>Logo in emails</h3><AdmImage value={settings.logo || ""} folder="logos" onChange={(v) => setSettings({ ...settings, logo: v })} /><small className="adm-muted">PNG, about 300 × 80. Empty = the Frequent Research name in text.</small></div>
        </div>
        <div>
          {!t ? <p className="adm-muted adm78-pick">← Choose a template.</p> : (
            <div className="adm78-mailgrid">
              <div className="adm-panel adm-obj adm78-stack">
                <div className="adm-row adm-row--end"><AdmBtn small onClick={ai}>✨ Write with AI</AdmBtn><AdmBtn small onClick={() => add(t)}>Copy</AdmBtn>{!t.builtIn && <AdmBtn small kind="danger" onClick={() => { if (confirm("Delete this template?")) { setList(list.filter((x) => x.id !== t.id)); setCur(null); } }}>Delete</AdmBtn>}</div>
                {TPL_FIELDS.map(([k, l, kind, extra]) => (
                  <div className="adm-f" key={k}><span className="adm-f__l">{l}</span><div className="adm-f__v">
                    {kind === "select" && k === "design" ? <select className="adm-in" value={t.design} onChange={(e) => upd({ ...t, design: e.target.value })}>{(d.designs || []).map((x) => <option key={x.id || x} value={x.id || x}>{x.name || x.id || x}</option>)}</select>
                      : kind === "button" ? <div className="adm-row"><input className="adm-in" placeholder="Button text" value={(t.button || {}).label || ""} onChange={(e) => upd({ ...t, button: { ...(t.button || {}), label: e.target.value } })} /><input className="adm-in" placeholder="/lets-talk" value={(t.button || {}).url || ""} onChange={(e) => upd({ ...t, button: { ...(t.button || {}), url: e.target.value } })} /></div>
                      : <FieldInput f={[k, l, kind, extra]} value={t[k]} onChange={(v) => upd({ ...t, [k]: v })} />}
                  </div></div>
                ))}
                <div className="adm-row"><input className="adm-in" type="email" placeholder="your@email.com" value={to} onChange={(e) => setTo(e.target.value)} /><AdmBtn onClick={test} disabled={!to}>Send me a test</AdmBtn></div>
              </div>
              <Preview tpl={t} />
            </div>
          )}
        </div>
      </div>
      <div className="adm-save"><AdmBtn kind="primary" onClick={save} disabled={!dirty}>Save and publish</AdmBtn><AdmBtn onClick={() => { setList(admClone(orig)); setSettings(d.settings || {}); }} disabled={!dirty}>Discard edits</AdmBtn><AdmStatus s={msg} /></div>
    </section>
  );
}

/* ======================================================================================== Automations */
const LEAD_KINDS = [["enquiry", "Enquiries"], ["download", "Downloads"], ["resource-download", "Resource downloads"], ["case-study-download", "Case study downloads"], ["careers", "Careers"], ["chat", "Live chat"]];
function Automations({ go }) {
  const [list, setList] = ee.useState(null), [orig, setOrig] = ee.useState(null), [tpls, setTpls] = ee.useState([]), [mail, setMail] = ee.useState(null), [msg, setMsg] = ee.useState(null);
  const load = async () => { const j = await admApi("/admin/mail/automations"); setList(admClone(j.automations)); setOrig(admClone(j.automations)); setMail(j.mail); };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); admApi("/admin/mail/templates").then((j) => setTpls(j.templates || [])).catch(() => {}); }, []);
  if (!list) return <section className="adm-sec"><h1>Email automations</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const upd = (i, v) => setList(list.map((x, j) => (j === i ? v : x)));
  const add = () => { const name = prompt("Name of the automation:"); if (!name) return; let id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 50) || "auto"; while (list.some((x) => x.id === id)) id += "-2"; setList([...list, { id, name, on: false, trigger: { type: "lead", kinds: [], match: "" }, audience: "person", marketing: true, steps: [{ days: 0, template: tpls[0] ? tpls[0].id : "" }], _open: true }]); };
  const save = async () => { try { await admApi("/admin/mail/automations", { method: "PUT", body: { automations: list.map(({ _open, ...a }) => a) } }); setMsg({ ok: "Saved. It works from the next form, sign-up or date." }); await load(); } catch (e) { setMsg({ err: e.message }); } };
  const TplSel = ({ v, on }) => <select className="adm-in adm-in--auto" value={v} onChange={(e) => on(e.target.value)}><option value="auto">Automatic (follows the form and service)</option>{tpls.map((t) => <option key={t.id} value={t.id}>{t.name || t.id}</option>)}</select>;
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Email automations</h1><AdmBtn kind="primary" onClick={add}>+ New automation</AdmBtn></header>
      <p className="adm-muted">What happens by itself: the instant reply to every form, the team alert, follow-ups after a few days, the welcome email and the monthly newsletter. Marketing emails go only to people who ticked consent, and every one has an unsubscribe link.</p>
      {mail && !mail.ready && <NotReady what="Email" keys="MAIL_FROM and an email provider" go={go} />}
      <div className="adm-items">
        {list.map((a, i) => (
          <AdmCard key={a.id} open={!!a._open} title={a.name || a.id} sub={(a.on ? "On" : "Off") + " · " + ({ lead: "after a form", subscribe: "after a newsletter sign-up", schedule: "on a date" }[a.trigger.type] || "") + " · " + a.steps.length + " email(s)"}
            actions={<><label className="adm-sw"><input type="checkbox" checked={!!a.on} onChange={(e) => upd(i, { ...a, on: e.target.checked })} /><span>{a.on ? "On" : "Off"}</span></label>{!a.builtIn && <AdmBtn small kind="danger" onClick={() => confirm("Delete this automation?") && setList(list.filter((_, j) => j !== i))}>Delete</AdmBtn>}</>}>
            <div className="adm-obj">
              <div className="adm-f"><span className="adm-f__l">Name</span><div className="adm-f__v"><input className="adm-in" value={a.name || ""} onChange={(e) => upd(i, { ...a, name: e.target.value })} /></div></div>
              <div className="adm-f"><span className="adm-f__l">Starts</span><div className="adm-f__v"><select className="adm-in adm-in--auto" value={a.trigger.type} onChange={(e) => upd(i, { ...a, trigger: { ...a.trigger, type: e.target.value } })}><option value="lead">When someone sends a form</option><option value="subscribe">When someone signs up for the newsletter</option><option value="schedule">On a date (newsletter)</option></select></div></div>
              {a.trigger.type === "lead" && <>
                <div className="adm-f"><span className="adm-f__l">Which forms</span><div className="adm-f__v adm78-checks">{LEAD_KINDS.map(([k, l]) => <label key={k} className="adm-sw"><input type="checkbox" checked={(a.trigger.kinds || []).includes(k)} onChange={(e) => upd(i, { ...a, trigger: { ...a.trigger, kinds: e.target.checked ? [...(a.trigger.kinds || []), k] : (a.trigger.kinds || []).filter((x) => x !== k) } })} /><span>{l}</span></label>)}<small className="adm-muted">None ticked = every form.</small></div></div>
                <div className="adm-f"><span className="adm-f__l">Only when the form, service or page contains</span><div className="adm-f__v"><input className="adm-in" value={a.trigger.match || ""} placeholder="e.g. panel, SEO, mr-enquiry (empty = all)" onChange={(e) => upd(i, { ...a, trigger: { ...a.trigger, match: e.target.value } })} /></div></div>
              </>}
              {a.trigger.type === "schedule" && <div className="adm-f"><span className="adm-f__l">When</span><div className="adm-f__v adm-row">
                <select className="adm-in adm-in--auto" value={a.trigger.every || "month"} onChange={(e) => upd(i, { ...a, trigger: { ...a.trigger, every: e.target.value } })}><option value="month">Every month</option><option value="week">Every week</option></select>
                {(a.trigger.every || "month") === "month" ? <label>day <input className="adm-in adm-in--num" type="number" min="1" max="28" value={a.trigger.day || 1} onChange={(e) => upd(i, { ...a, trigger: { ...a.trigger, day: +e.target.value } })} /></label> : <label>weekday (0 Sun – 6 Sat) <input className="adm-in adm-in--num" type="number" min="0" max="6" value={a.trigger.day ?? 1} onChange={(e) => upd(i, { ...a, trigger: { ...a.trigger, day: +e.target.value } })} /></label>}
                <label>hour (India time) <input className="adm-in adm-in--num" type="number" min="0" max="23" value={a.trigger.hour ?? 10} onChange={(e) => upd(i, { ...a, trigger: { ...a.trigger, hour: +e.target.value } })} /></label>
              </div></div>}
              <div className="adm-f"><span className="adm-f__l">Sent to</span><div className="adm-f__v"><select className="adm-in adm-in--auto" value={a.audience || "person"} onChange={(e) => upd(i, { ...a, audience: e.target.value })}><option value="person">The person</option><option value="team">The team (MAIL_NOTIFY and the form's addresses)</option>{a.trigger.type === "schedule" && <option value="segment">Every subscriber</option>}</select></div></div>
              <div className="adm-f"><span className="adm-f__l">Marketing email (needs consent, has unsubscribe)</span><div className="adm-f__v"><label className="adm-sw"><input type="checkbox" checked={!!a.marketing} onChange={(e) => upd(i, { ...a, marketing: e.target.checked })} /><span>{a.marketing ? "Yes" : "No"}</span></label></div></div>
              <div className="adm-f"><span className="adm-f__l">Emails</span><div className="adm-f__v">
                {a.steps.map((s, k) => (
                  <div className="adm-row" key={k}>
                    <label>after <input className="adm-in adm-in--num" type="number" min="0" max="365" value={s.days} onChange={(e) => upd(i, { ...a, steps: a.steps.map((x, j) => (j === k ? { ...x, days: +e.target.value } : x)) })} /> days</label>
                    <TplSel v={s.template} on={(v) => upd(i, { ...a, steps: a.steps.map((x, j) => (j === k ? { ...x, template: v } : x)) })} />
                    <AdmBtn small kind="ghost" onClick={() => upd(i, { ...a, steps: a.steps.filter((_, j) => j !== k) })} disabled={a.steps.length < 2}>✕</AdmBtn>
                  </div>
                ))}
                <AdmBtn small onClick={() => upd(i, { ...a, steps: [...a.steps, { days: (a.steps.at(-1) || { days: 0 }).days + 3, template: tpls[0] ? tpls[0].id : "auto" }] })}>+ Add an email</AdmBtn>
              </div></div>
            </div>
          </AdmCard>
        ))}
      </div>
      <div className="adm-save"><AdmBtn kind="primary" onClick={save} disabled={admSame(list.map(({ _open, ...a }) => a), orig)}>Save and publish</AdmBtn><AdmBtn onClick={() => setList(admClone(orig))}>Discard edits</AdmBtn><AdmStatus s={msg} /></div>
    </section>
  );
}

/* ======================================================================================== Newsletters */
function Campaigns({ go }) {
  const [st, reload] = useLoad(() => admApi("/admin/campaigns"), [], 20000);
  const [tpls, setTpls] = ee.useState([]), [stats, setStats] = ee.useState(null), [msg, setMsg] = ee.useState(null);
  const [draft, setDraft] = ee.useState(null), [count, setCount] = ee.useState(null);
  const [queue, reloadQ] = useLoad(() => admApi("/admin/mail/queue?limit=50"), []);
  ee.useEffect(() => { admApi("/admin/mail/templates").then((j) => setTpls(j.templates || [])).catch(() => {}); admApi("/admin/marketing/stats").then(setStats).catch(() => {}); }, []);
  ee.useEffect(() => { if (!draft) return; const t = setTimeout(() => admApi("/admin/campaigns/x/count", { body: { segment: draft.segment } }).then((j) => setCount(j.n)).catch(() => {}), 300); return () => clearTimeout(t); }, [draft && JSON.stringify(draft.segment)]);
  const segList = (k, v) => setDraft({ ...draft, segment: { ...draft.segment, [k]: v.split(",").map((x) => x.trim()).filter(Boolean) } });
  const create = async (sendNow, at) => {
    try {
      const j = draft.id ? (await admApi("/admin/campaigns/" + draft.id, { method: "PUT", body: draft }), { id: draft.id }) : await admApi("/admin/campaigns", { body: draft });
      if (sendNow || at) {
        if (!confirm(at ? "Schedule this newsletter for " + new Date(at).toLocaleString() + "?" : "Send this newsletter now to " + admNum(count) + " subscribers? This cannot be undone.")) { setMsg({ ok: "Saved as a draft." }); setDraft(null); reload(); return; }
        const r = await admApi("/admin/campaigns/" + j.id + "/send", { body: at ? { at } : {} });
        setMsg({ ok: r.scheduled ? "Scheduled." : "Sending to " + admNum(r.audience) + " subscribers" + (r.mailReady ? "." : " as soon as an email provider is connected.") });
      } else setMsg({ ok: "Saved as a draft." });
      setDraft(null); reload(); reloadQ();
    } catch (e) { setMsg({ err: e.message }); }
  };
  const forms = ((stats && stats.forms) || []).map((x) => x.form);
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Newsletters</h1><AdmBtn kind="primary" onClick={() => { setDraft({ name: "", template: "newsletter-monthly", segment: {} }); setCount(null); }}>+ New newsletter</AdmBtn></header>
      <p className="adm-muted">Send a newsletter to every subscriber or to one group (people who sent a certain form, asked about a service, from a country, or with a tag). The monthly newsletter can also go out by itself: Email automations. Edit the email itself under Email templates.</p>
      {stats && !stats.mail.ready && <NotReady what="Email" keys="MAIL_FROM and an email provider" go={go} />}
      <AdmStatus s={msg} />
      {draft && (
        <div className="adm-panel adm-obj">
          <h3>{draft.id ? "Edit newsletter" : "New newsletter"}</h3>
          <AdmField label="Name (only you see it)"><input className="adm-in" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="November newsletter" /></AdmField>
          <AdmField label="Email template"><select className="adm-in" value={draft.template} onChange={(e) => setDraft({ ...draft, template: e.target.value })}>{tpls.map((t) => <option key={t.id} value={t.id}>{t.name || t.id}</option>)}</select></AdmField>
          <AdmField label="Only people who sent these forms (comma separated, empty = everyone)" help={forms.length ? "Forms: " + forms.join(", ") : ""}><input className="adm-in" value={(draft.segment.forms || []).join(", ")} onChange={(e) => segList("forms", e.target.value)} /></AdmField>
          <AdmField label="Only people interested in (service words, comma separated)"><input className="adm-in" value={(draft.segment.services || []).join(", ")} onChange={(e) => segList("services", e.target.value)} placeholder="panel, SEO, GST" /></AdmField>
          <AdmField label="Only these countries"><input className="adm-in" value={(draft.segment.countries || []).join(", ")} onChange={(e) => segList("countries", e.target.value)} placeholder="India, United States" /></AdmField>
          <AdmField label="Only these tags"><input className="adm-in" value={(draft.segment.tags || []).join(", ")} onChange={(e) => segList("tags", e.target.value)} /></AdmField>
          <p><b>{count == null ? "…" : admNum(count)}</b> subscribers will get it.</p>
          <div className="adm-row">
            <AdmBtn onClick={() => create(false)}>Save draft</AdmBtn>
            <AdmBtn kind="primary" onClick={() => create(true)} disabled={!count}>Send now</AdmBtn>
            <input className="adm-in adm-in--auto" type="datetime-local" value={draft.at || ""} onChange={(e) => setDraft({ ...draft, at: e.target.value })} aria-label="Send at" />
            <AdmBtn onClick={() => create(false, new Date(draft.at).toISOString())} disabled={!draft.at}>Schedule</AdmBtn>
            <AdmBtn kind="ghost" onClick={() => setDraft(null)}>Cancel</AdmBtn>
          </div>
        </div>
      )}
      <div className="adm-table"><table><thead><tr><th>Newsletter</th><th>Template</th><th>Status</th><th>Queued</th><th>Sent</th><th>Opened</th><th>Failed</th><th /></tr></thead><tbody>
        {((st.data && st.data.campaigns) || []).map((c) => (
          <tr key={c.id}><td>{c.name}<br /><small className="adm-muted">{admWhen(c.created)}{c.sendAt ? " · for " + admWhen(c.sendAt) : ""}</small></td><td>{c.template}</td><td><span className="adm-pill">{c.status}</span></td>
            <td>{admNum(c.stats.queued)}</td><td>{admNum(c.stats.sent)}</td><td>{admNum(c.stats.opened)}</td><td>{admNum(c.stats.failed)}</td>
            <td className="adm-row">
              {["draft", "scheduled"].includes(c.status) && <AdmBtn small onClick={() => { setDraft({ id: c.id, name: c.name, template: c.template, segment: c.segment || {} }); setCount(null); }}>Edit</AdmBtn>}
              {["sending", "scheduled"].includes(c.status) && <AdmBtn small onClick={async () => { if (confirm("Stop this newsletter? Emails not yet sent are removed.")) { await admApi("/admin/campaigns/" + c.id + "/cancel", { body: {} }); reload(); } }}>Stop</AdmBtn>}
              <AdmBtn small kind="ghost" onClick={async () => { if (confirm("Delete this newsletter?")) { await admApi("/admin/campaigns/" + c.id, { method: "DELETE" }); reload(); } }}>✕</AdmBtn>
            </td></tr>
        ))}
        {st.data && !st.data.campaigns.length && <tr><td colSpan={8} className="adm-muted">No newsletters yet.</td></tr>}
      </tbody></table></div>
      <details className="adm-panel">
        <summary><b>Email log (last 50)</b></summary>
        <div className="adm-row"><AdmBtn small onClick={async () => { const r = await admApi("/admin/mail/queue/retry", { body: {} }); setMsg({ ok: admNum(r.n) + " failed emails will be tried again." }); reloadQ(); }}>Try failed emails again</AdmBtn></div>
        <div className="adm-table"><table><thead><tr><th>When</th><th>To</th><th>Template</th><th>Status</th><th>Note</th></tr></thead><tbody>
          {((queue.data && queue.data.rows) || []).map((r) => <tr key={r.id}><td>{admWhen(r.sent || r.sendAt || r.created)}</td><td>{r.to}</td><td>{r.template}</td><td>{r.status}{r.opened ? " · opened" : ""}</td><td className="adm-clip">{r.error || r.reason || ""}</td></tr>)}
        </tbody></table></div>
      </details>
    </section>
  );
}

/* ======================================================================================== Social media */
const PLAT = [["facebook", "Facebook"], ["instagram", "Instagram"], ["linkedin", "LinkedIn"], ["x", "X (Twitter)"], ["webhook", "Other (Buffer, Zapier, Make…)"]];
const PLAT_KEYS = { facebook: "FB_PAGE_ID and FB_PAGE_TOKEN", instagram: "IG_USER_ID and IG_TOKEN", linkedin: "LINKEDIN_AUTHOR_URN and LINKEDIN_TOKEN", x: "X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN and X_ACCESS_SECRET", webhook: "SOCIAL_WEBHOOK" };
function Social({ go }) {
  const [status, setStatus] = ee.useState(null);
  const [st, reload] = useLoad(() => admApi("/admin/social/posts"), [], 30000);
  const [post, setPost] = ee.useState({ text: "", link: "", image: "", platforms: [], at: "" });
  const [ap, setAp] = ee.useState(null), [apOrig, setApOrig] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null), [busy, setBusy] = ee.useState(false), [tab, setTab] = ee.useState("post");
  ee.useEffect(() => {
    admApi("/admin/social/status").then(setStatus).catch((e) => setMsg({ err: e.message }));
    admApi("/admin/social/autopilot").then((j) => { setAp(j.autopilot); setApOrig(admClone(j.autopilot)); }).catch(() => {});
  }, []);
  const on = status ? status.platforms : {};
  const ready = PLAT.filter(([k]) => on[k]).map(([k]) => k);
  const send = async (now) => {
    setBusy(true);
    try {
      const r = await admApi("/admin/social/posts", { body: { ...post, at: post.at ? new Date(post.at).toISOString() : undefined, now } });
      if (now) { const bad = Object.entries(r.results || {}).filter(([, v]) => !v.ok); setMsg(bad.length ? { err: "Posted to " + (Object.keys(r.results || {}).length - bad.length) + "; not posted: " + bad.map(([k, v]) => k + " (" + v.error + ")").join(", ") } : { ok: "Posted everywhere." }); }
      else setMsg({ ok: post.at ? "Scheduled." : "Saved as a draft." });
      setPost({ text: "", link: "", image: "", platforms: post.platforms, at: "" }); reload();
    } catch (e) { setMsg({ err: e.message }); }
    setBusy(false);
  };
  const aiPost = async () => {
    const brief = prompt("What is the post about? (a new blog post, a panel book, an event, a service…)");
    if (!brief) return;
    setBusy(true);
    try { const r = await admApi("/admin/ai/write", { body: { kind: "social", brief, platforms: post.platforms.length ? post.platforms : ready } }); const ps = (r.data && r.data.posts) || []; if (ps[0]) setPost({ ...post, text: ps[0].text + (ps[0].hashtags && ps[0].hashtags.length ? "\n\n" + ps[0].hashtags.map((h) => (h.startsWith("#") ? h : "#" + h)).join(" ") : ""), perPlatform: Object.fromEntries(ps.map((p) => [String(p.platform).toLowerCase().replace(/^twitter.*|^x.*/, "x"), p.text + (p.hashtags && p.hashtags.length ? "\n\n" + p.hashtags.map((h) => (h.startsWith("#") ? h : "#" + h)).join(" ") : "")])) }); setMsg({ ok: "Draft written for each platform. Check it, then post." }); }
    catch (e) { setMsg({ err: e.message }); }
    setBusy(false);
  };
  const posts = (st.data && st.data.posts) || [];
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Social media</h1></header>
      <p className="adm-muted">Write once and post to every connected platform in one click, schedule posts, or let the AI social media manager plan and write posts for you (you approve them first, unless you switch that off).</p>
      <div className="adm78-plats">{PLAT.map(([k, l]) => <span key={k} className={"adm-pill " + (on[k] ? "adm-pill--won" : "adm-pill--lost")} title={on[k] ? "Connected" : "Needs " + PLAT_KEYS[k]}>{on[k] ? "✓" : "✕"} {l}</span>)}<a href="#" onClick={(e) => { e.preventDefault(); go("keys"); }}>How to connect</a></div>
      <AdmStatus s={msg} />
      <div className="adm-seg adm78-tabs">{[["post", "New post"], ["list", "Calendar & posts (" + posts.length + ")"], ["auto", "AI social media manager"]].map(([k, l]) => <button key={k} type="button" className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>{l}</button>)}</div>
      {tab === "post" && (
        <div className="adm-panel adm-obj">
          <AdmField label="Post"><textarea className="adm-in adm-ta" rows={6} value={post.text} onChange={(e) => setPost({ ...post, text: e.target.value })} placeholder="Write the post…" /></AdmField>
          <small className="adm-muted">{post.text.length} characters{post.text.length > 280 ? " · X shows only 280; a shorter version is sent there if you write one below" : ""}</small>
          <AdmField label="Link (page of the website or any address)"><input className="adm-in" value={post.link} onChange={(e) => setPost({ ...post, link: e.target.value })} placeholder="/blog/… or https://…" /></AdmField>
          <AdmField label="Picture (needed for Instagram)"><AdmImage value={post.image} folder="site" onChange={(v) => setPost({ ...post, image: v })} /></AdmField>
          <AdmField label="Post to"><div className="adm78-checks">{PLAT.map(([k, l]) => <label key={k} className="adm-sw"><input type="checkbox" checked={post.platforms.includes(k)} onChange={(e) => setPost({ ...post, platforms: e.target.checked ? [...post.platforms, k] : post.platforms.filter((x) => x !== k) })} /><span>{l}{!on[k] ? " (not connected)" : ""}</span></label>)}<AdmBtn small onClick={() => setPost({ ...post, platforms: ready })}>All connected</AdmBtn></div></AdmField>
          {post.platforms.length > 1 && <details><summary>A different text per platform (optional)</summary>{post.platforms.map((p) => <AdmField key={p} label={(PLAT.find((x) => x[0] === p) || [p, p])[1]}><textarea className="adm-in adm-ta" rows={3} value={(post.perPlatform || {})[p] || ""} onChange={(e) => setPost({ ...post, perPlatform: { ...(post.perPlatform || {}), [p]: e.target.value } })} /></AdmField>)}</details>}
          <div className="adm-row">
            <AdmBtn onClick={aiPost} disabled={busy}>✨ Write with AI</AdmBtn>
            <AdmBtn kind="primary" onClick={() => send(true)} disabled={busy || !post.text.trim() || !post.platforms.length}>{busy ? "Working…" : "Post now"}</AdmBtn>
            <input className="adm-in adm-in--auto" type="datetime-local" value={post.at} onChange={(e) => setPost({ ...post, at: e.target.value })} aria-label="Post at" />
            <AdmBtn onClick={() => send(false)} disabled={busy || !post.text.trim() || !post.platforms.length}>{post.at ? "Schedule" : "Save draft"}</AdmBtn>
          </div>
        </div>
      )}
      {tab === "list" && (
        <div className="adm-table"><table><thead><tr><th>When</th><th>Post</th><th>Platforms</th><th>Status</th><th /></tr></thead><tbody>
          {posts.map((p) => (
            <tr key={p.id}><td>{admWhen(p.posted || p.at || p.created)}</td><td className="adm-clip" title={p.text}>{p.text}</td><td>{p.platforms.join(", ")}</td>
              <td><span className={"adm-pill adm-pill--" + ({ posted: "won", failed: "lost", partial: "pending", approval: "pending" }[p.status] || "new")}>{p.status === "approval" ? "waiting for you" : p.status}</span>{p.results && Object.entries(p.results).filter(([, v]) => !v.ok).map(([k, v]) => <small key={k} className="adm-err"><br />{k}: {v.error}</small>)}</td>
              <td className="adm-row">
                {p.status === "approval" && <AdmBtn small kind="primary" onClick={async () => { await admApi("/admin/social/posts/" + p.id + "/approve", { body: {} }); reload(); }}>Approve</AdmBtn>}
                {p.status !== "posted" && <AdmBtn small onClick={async () => { try { const r = await admApi("/admin/social/posts/" + p.id + "/publish", { body: {} }); setMsg(r.status === "posted" ? { ok: "Posted." } : { err: "Not everything was posted; see the post." }); } catch (e) { setMsg({ err: e.message }); } reload(); }}>Post now</AdmBtn>}
                <AdmBtn small kind="ghost" onClick={async () => { if (confirm("Delete this post from the list? (Posts already on a platform stay there.)")) { await admApi("/admin/social/posts/" + p.id, { method: "DELETE" }); reload(); } }}>✕</AdmBtn>
              </td></tr>
          ))}
          {!posts.length && <tr><td colSpan={5} className="adm-muted">No posts yet.</td></tr>}
        </tbody></table></div>
      )}
      {tab === "auto" && ap && (
        <div className="adm-panel adm-obj">
          {status && !status.ai && <NotReady what="The AI assistant" keys="ANTHROPIC_API_KEY" go={go} />}
          <p className="adm-muted">The manager plans posts that promote the website, the panels and portals, services, products, blog posts and downloads, writes each one for its platform and schedules it. Ads and video scripts are written in the AI assistant (ads are not bought automatically).</p>
          <AdmField label="On"><label className="adm-sw"><input type="checkbox" checked={!!ap.on} onChange={(e) => setAp({ ...ap, on: e.target.checked })} /><span>{ap.on ? "Plans new posts by itself" : "Off"}</span></label></AdmField>
          <AdmField label="I approve every post first"><label className="adm-sw"><input type="checkbox" checked={ap.approve !== false} onChange={(e) => setAp({ ...ap, approve: e.target.checked })} /><span>{ap.approve !== false ? "Yes (recommended)" : "No, post by itself"}</span></label></AdmField>
          <AdmField label="One post every … days"><input className="adm-in adm-in--num" type="number" min="1" max="14" value={ap.everyDays || 2} onChange={(e) => setAp({ ...ap, everyDays: +e.target.value })} /></AdmField>
          <AdmField label="At (hour, India time)"><input className="adm-in adm-in--num" type="number" min="0" max="23" value={ap.hour ?? 11} onChange={(e) => setAp({ ...ap, hour: +e.target.value })} /></AdmField>
          <AdmField label="Platforms"><div className="adm78-checks">{PLAT.map(([k, l]) => <label key={k} className="adm-sw"><input type="checkbox" checked={(ap.platforms || []).includes(k)} onChange={(e) => setAp({ ...ap, platforms: e.target.checked ? [...(ap.platforms || []), k] : (ap.platforms || []).filter((x) => x !== k) })} /><span>{l}</span></label>)}</div></AdmField>
          <AdmField label="Topics and tone (optional)"><textarea className="adm-in adm-ta" rows={3} value={ap.themes || ""} onChange={(e) => setAp({ ...ap, themes: e.target.value })} placeholder="e.g. healthcare panel in India, new SampCrew product, Diwali greetings; friendly and expert" /></AdmField>
          <div className="adm-row">
            <AdmBtn kind="primary" disabled={admSame(ap, apOrig)} onClick={async () => { try { await admApi("/admin/social/autopilot", { method: "PUT", body: ap }); setApOrig(admClone(ap)); setMsg({ ok: "Saved." }); } catch (e) { setMsg({ err: e.message }); } }}>Save</AdmBtn>
            <AdmBtn disabled={busy} onClick={async () => { setBusy(true); try { const r = await admApi("/admin/social/autopilot/run", { body: { days: 14 } }); setMsg({ ok: admNum(r.drafted) + " posts planned for the next 14 days. See Calendar & posts." }); reload(); } catch (e) { setMsg({ err: e.message }); } setBusy(false); }}>{busy ? "Planning…" : "Plan the next 2 weeks now"}</AdmBtn>
          </div>
        </div>
      )}
    </section>
  );
}

/* ======================================================================================== AI assistant */
const AI_LIST = [["blog", "Blog post"], ["case-study", "Case study"], ["email", "Email"], ["newsletter", "Newsletter"], ["social", "Social media posts"], ["social-plan", "Social media calendar"], ["ad", "Ads (Google, Meta, LinkedIn)"], ["video-script", "Video / reel script"], ["section", "Website section"], ["rewrite", "Improve a text"]];
function Ai({ go }) {
  const [info, setInfo] = ee.useState(null);
  const [f, setF] = ee.useState({ kind: "blog", brief: "", tone: "", length: "" });
  const [out, setOut] = ee.useState(null), [busy, setBusy] = ee.useState(false), [msg, setMsg] = ee.useState(null);
  const [extra, setExtra] = ee.useState({ vertical: "market-research", industry: "" });
  const [inds, setInds] = ee.useState([]);
  ee.useEffect(() => { admApi("/admin/ai/kinds").then(setInfo).catch((e) => setMsg({ err: e.message })); import("../app/data/industries.jsx").then((m) => setInds(m.INDUSTRIES || [])).catch(() => {}); }, []);
  const run = async () => { setBusy(true); setMsg(null); try { const r = await admApi("/admin/ai/write", { body: f }); setOut(r.data); } catch (e) { setMsg({ err: e.message }); } setBusy(false); };
  // save the draft where it belongs (hidden until you check it, for blog posts)
  const saveBlog = async () => {
    const m = await import("../app/data/blogPosts.jsx");
    const ex = (m.BLOG_POSTS || [])[0] || {};
    const base = blankLike(Object.fromEntries(Object.entries(ex).filter(([k]) => !["words", "readTime"].includes(k))));
    const today = new Date().toISOString().slice(0, 10);
    const post = { ...base, ...out, vertical: extra.vertical, date: today, updated: today };
    if ("published" in base) post.published = today;
    const o = (await admGet("blogs")) || {};
    if ((o.add || []).some((x) => x.slug === post.slug) || (m.BLOG_POSTS || []).some((x) => x.slug === post.slug)) post.slug += "-" + Date.now().toString(36);
    await admPut("blogs", { ...o, add: [post, ...(o.add || [])], hide: [...new Set([...(o.hide || []), post.slug])] });
    setMsg({ ok: "Saved under Blog posts as a hidden draft (“" + post.title + "”). Open it there, check it, then click Show and save to publish." });
  };
  const saveCase = async () => {
    if (!extra.industry) return setMsg({ err: "Choose the industry first." });
    const all = (await admGet("cases")) || {};
    const o = all[extra.industry] || {};
    const c = { ...out, verified: false, markets: ["IN"] };
    await admPut("cases", { ...all, [extra.industry]: { ...o, add: [c, ...(o.add || [])], hide: [...new Set([...(o.hide || []), c.slug])] } });
    setMsg({ ok: "Saved under Case studies (" + extra.industry + ") as a hidden draft. Check it there, then Show and save." });
  };
  const toSocial = async () => { for (const p of out.posts || []) await admApi("/admin/social/posts", { body: { text: p.text + (p.hashtags && p.hashtags.length ? "\n\n" + p.hashtags.map((h) => (h.startsWith("#") ? h : "#" + h)).join(" ") : ""), link: p.link || "", platforms: p.platforms || [String(p.platform || "").toLowerCase()].filter((x) => PLAT.some((y) => y[0] === x)), at: p.day != null ? new Date(Date.now() + p.day * 86400e3).toISOString() : undefined } }).catch(() => {}); setMsg({ ok: "Added to Social media › Calendar & posts." }); };
  const toTemplate = async () => {
    const j = await admApi("/admin/mail/templates");
    const id = "ai-" + Date.now().toString(36);
    await admApi("/admin/mail/templates", { method: "PUT", body: { templates: [...j.templates, { id, name: "AI: " + (out.subject || "email"), design: f.kind === "newsletter" ? "editorial" : "spotlight", accent: "royal", image: "", footer: "", ...out }], settings: j.settings } });
    setMsg({ ok: "Saved as a new email template (" + id + ")." });
  };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>AI assistant</h1></header>
      <p className="adm-muted">Writes blog posts, case studies, emails, newsletters, social posts and calendars, ad copy and video scripts in the Frequent Research style. Everything it writes is a draft for you to check: it never publishes by itself, and facts, numbers and client names must be checked before publishing.{info && info.model ? " Model: " + info.model + "." : ""}</p>
      {info && !info.ready && <NotReady what="The AI assistant" keys="ANTHROPIC_API_KEY" go={go} />}
      <div className="adm-panel adm-obj">
        <AdmField label="What to write"><select className="adm-in" value={f.kind} onChange={(e) => { setF({ ...f, kind: e.target.value }); setOut(null); }}>{AI_LIST.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></AdmField>
        <AdmField label="Brief" help="Topic, audience, key points, keywords, the page or product to promote. For “Improve a text”, paste the text."><textarea className="adm-in adm-ta" rows={6} value={f.brief} onChange={(e) => setF({ ...f, brief: e.target.value })} /></AdmField>
        <div className="adm-row">
          <input className="adm-in" placeholder="Tone (optional): expert, friendly…" value={f.tone} onChange={(e) => setF({ ...f, tone: e.target.value })} />
          <input className="adm-in" placeholder="Length (optional): 1,500 words…" value={f.length} onChange={(e) => setF({ ...f, length: e.target.value })} />
        </div>
        <AdmBtn kind="primary" onClick={run} disabled={busy || !f.brief.trim()}>{busy ? "Writing… (up to a minute)" : "✨ Write"}</AdmBtn>
        <AdmStatus s={msg} />
      </div>
      {out && (
        <div className="adm-panel">
          <h3>Draft</h3>
          <AdmValue value={out} onChange={setOut} />
          <div className="adm-row">
            {f.kind === "blog" && <><select className="adm-in adm-in--auto" value={extra.vertical} onChange={(e) => setExtra({ ...extra, vertical: e.target.value })}>{[["market-research", "Market Research"], ["digital-marketing", "Digital Marketing"], ["it-development", "IT & Development"], ["accounts-finance", "Accounts & Finance"]].map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select><AdmBtn kind="primary" onClick={() => saveBlog().catch((e) => setMsg({ err: e.message }))}>Save as blog post draft</AdmBtn></>}
            {f.kind === "case-study" && <><select className="adm-in adm-in--auto" value={extra.industry} onChange={(e) => setExtra({ ...extra, industry: e.target.value })}><option value="">Industry…</option>{inds.map((x) => <option key={x.slug} value={x.slug}>{x.name}</option>)}</select><AdmBtn kind="primary" onClick={() => saveCase().catch((e) => setMsg({ err: e.message }))}>Save as case study draft</AdmBtn></>}
            {(f.kind === "social" || f.kind === "social-plan") && <AdmBtn kind="primary" onClick={() => toSocial().catch((e) => setMsg({ err: e.message }))}>Add to the social calendar</AdmBtn>}
            {(f.kind === "email" || f.kind === "newsletter") && <AdmBtn kind="primary" onClick={() => toTemplate().catch((e) => setMsg({ err: e.message }))}>Save as email template</AdmBtn>}
            <AdmBtn onClick={() => { navigator.clipboard && navigator.clipboard.writeText(JSON.stringify(out, null, 2)); setMsg({ ok: "Copied." }); }}>Copy</AdmBtn>
          </div>
        </div>
      )}
    </section>
  );
}

/* ======================================================================================== Connections & keys */
const KEY_HELP = {
  PUBLIC_URL: "The site address used in emails (https://www.frequentresearch.com)",
  MAIL_PROVIDER: "smtp, resend, sendgrid or brevo (found by itself from the keys below)", MAIL_FROM: "Sender, e.g. Frequent Research <hello@frequentresearch.com>", MAIL_REPLY_TO: "Where replies go", MAIL_NOTIFY: "Team addresses alerted about every lead (comma separated)",
  SMTP_HOST: "e.g. smtp.office365.com or smtp.gmail.com", SMTP_PORT: "587 or 465", SMTP_USER: "Mailbox user", SMTP_PASS: "Mailbox or app password",
  RESEND_API_KEY: "Resend.com key (instead of SMTP)", SENDGRID_API_KEY: "SendGrid key (instead of SMTP)", BREVO_API_KEY: "Brevo key (instead of SMTP)",
  ANTHROPIC_API_KEY: "Claude API key from console.anthropic.com: AI assistant and AI social media manager", AI_MODEL: "Optional: another Claude model",
  FB_PAGE_ID: "Facebook page id", FB_PAGE_TOKEN: "Facebook page access token (long-lived)", IG_USER_ID: "Instagram business account id", IG_TOKEN: "Instagram Graph API token",
  LINKEDIN_AUTHOR_URN: "urn:li:organization:… of the company page", LINKEDIN_TOKEN: "LinkedIn token with w_organization_social",
  X_API_KEY: "X app key", X_API_SECRET: "X app secret", X_ACCESS_TOKEN: "X access token (read and write)", X_ACCESS_SECRET: "X access token secret",
  SOCIAL_WEBHOOK: "Optional: https address of Buffer, Zapier or Make for other platforms", SAMPCREW_API_URL: "SampCrew API address (https)", SAMPCREW_API_KEY: "SampCrew API key", SAMPCREW_WEBHOOK_SECRET: "Shared secret for SampCrew stage updates", LEAD_WEBHOOK: "Optional: CRM address that gets every lead", SMTP_SECURE: "1 for port 465 (usually found by itself)", MAIL_PER_MINUTE: "Sending speed limit (default 60 a minute)",
};
function KeyRow({ k, edit, onSave }) {
  const [open, setOpen] = ee.useState(false), [v, setV] = ee.useState(""), [show, setShow] = ee.useState(false), [busy, setBusy] = ee.useState(false), [msg, setMsg] = ee.useState(null);
  const save = async (val) => {
    setBusy(true); setMsg(null);
    try { await onSave({ [k.key]: val }); setOpen(false); setV(""); setMsg({ ok: val === null ? "Removed" : "Saved" }); } catch (e) { setMsg({ err: e.message }); } finally { setBusy(false); }
  };
  const tag = k.broken ? ["lost", "Cannot be read"] : k.source === "database" ? ["won", "Saved in the panel"] : k.source === "server" ? ["new", "From the server .env"] : ["", "Not set"];
  return (
    <li className={"adm784-key" + (open ? " is-open" : "")}>
      <div className="adm784-key__top">
        <span className="adm784-key__ic" aria-hidden="true">{k.secret ? <Lock size={15} /> : <KeyRound size={15} />}</span>
        <div className="adm784-key__t"><code>{k.key}</code><small>{KEY_HELP[k.key] || ""}</small></div>
        <span className="adm784-key__val">{k.secret ? (k.hint ? "••••••" + k.hint.slice(1) : k.set ? "••••••" : "") : k.value}</span>
        <span className={"adm-pill" + (tag[0] ? " adm-pill--" + tag[0] : "")}>{tag[1]}</span>
        {edit && <span className="adm784-key__act">
          <AdmBtn onClick={() => { setOpen(!open); setMsg(null); setV(k.secret ? "" : k.value || ""); }}>{open ? "Cancel" : k.set ? "Change" : "Add"}</AdmBtn>
          {k.source === "database" && !open && <AdmBtn kind="ghost" onClick={() => { if (window.confirm(`Remove ${k.key} from the panel?` + (k.source === "database" ? " The server .env value (if any) is used again." : ""))) save(null); }}>Remove</AdmBtn>}
        </span>}
      </div>
      {open && (
        <form className="adm784-key__form" onSubmit={(e) => { e.preventDefault(); if (v.trim()) save(v); }}>
          <input className="adm-in" type={k.secret && !show ? "password" : "text"} value={v} onChange={(e) => setV(e.target.value)} placeholder={k.secret ? "Paste the new " + k.key : k.key} autoComplete="off" spellCheck="false" autoFocus />
          {k.secret && <button type="button" className="adm784-key__eye" onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>}
          <AdmBtn kind="primary" type="submit" disabled={busy || !v.trim()}>{busy ? "Saving…" : "Save"}</AdmBtn>
        </form>
      )}
      {msg && <AdmStatus s={msg} />}
      {k.at && <small className="adm784-key__by">Saved {admWhen(k.at)}{k.by ? " by " + k.by : ""}</small>}
    </li>
  );
}
function Keys() {
  const [st, reload] = useLoad(() => admApi("/admin/integrations"), []);
  const [keys, setKeys] = ee.useState(null), [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const d = st.data;
  if (!d) return <section className="adm-sec"><h1>Connections & keys</h1>{st.err ? <AdmStatus s={{ err: st.err }} /> : <p className="adm-muted">Loading…</p>}</section>;
  const list = keys || d.keys;
  const edit = admCan(me, "integrations", "configure") && d.canSave !== false;
  const onSave = async (values) => { const r = await admApi("/admin/integrations/keys", { method: "PUT", body: { values } }); setKeys(r.keys); if (reload) reload(); };
  const groups = [...new Set(list.map((k) => k.group || "Other"))];
  const Row = ({ l, ok, note }) => <tr><td>{l}</td><td><span className={"adm-pill " + (ok ? "adm-pill--won" : "adm-pill--lost")}>{ok ? "Connected" : "Not connected"}</span></td><td className="adm-muted">{note}</td></tr>;
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Connections & keys</h1></header>
      <p className="adm-muted">Type each key here: it is saved in the database, secrets encrypted (AES-256), and works at once, no restart. A key saved here wins over the same name in the server's .env file; Remove goes back to the .env value. Secrets are never shown again, only their last 4 characters. Saving asks for your authenticator code. Step-by-step help for every key: go-live guide 12-MARKETING-AND-KEYS.md.</p>
      {d.canSave === false && <AdmStatus s={{ err: "Keys cannot be saved yet: the server needs KEYS_SECRET (or REVIEW_SECRET) in its .env. It encrypts the saved keys." }} />}
      <div className="adm-table"><table><tbody>
        <Row l="Email" ok={d.mail.ready} note={d.mail.ready ? "Provider: " + d.mail.provider + (d.mail.from ? " · from " + d.mail.from : "") : "Needs MAIL_FROM and SMTP_… or RESEND_API_KEY / SENDGRID_API_KEY / BREVO_API_KEY"} />
        <Row l="AI assistant" ok={d.ai.ready} note={d.ai.ready ? "Model " + d.ai.model : "Needs ANTHROPIC_API_KEY"} />
        {PLAT.map(([k, l]) => <Row key={k} l={l} ok={!!d.social[k]} note={d.social[k] ? "" : "Needs " + PLAT_KEYS[k]} />)}
        <Row l="SampCrew (careers to HR)" ok={d.sampcrew.ready} note={d.sampcrew.ready ? d.sampcrew.url + (d.sampcrew.webhook ? " · stage updates on" : " · add SAMPCREW_WEBHOOK_SECRET for stage updates") : "Needs SAMPCREW_API_URL and SAMPCREW_API_KEY"} />
        <Row l="CRM webhook (every lead)" ok={d.leadWebhook} note="Optional: LEAD_WEBHOOK" />
      </tbody></table></div>
      <p className="adm-muted">SampCrew sends stage updates to <code>{(d.publicUrl || "") + "/api/v1/integrations/sampcrew/webhook"}</code> signed with SAMPCREW_WEBHOOK_SECRET (header X-SampCrew-Signature).</p>
      {groups.map((g) => (
        <div key={g} className="adm784-card adm784-keys">
          <h3><ShieldCheck size={16} aria-hidden="true" /> {g}</h3>
          <ul>{list.filter((k) => (k.group || "Other") === g).map((k) => <KeyRow key={k.key} k={k} edit={edit} onSave={onSave} />)}</ul>
        </div>
      ))}
    </section>
  );
}

export { Ai as AdmAi, Automations as AdmAutomations, Campaigns as AdmCampaigns, Contacts as AdmContacts, Emails as AdmEmails, Keys as AdmKeys, Social as AdmSocial };
