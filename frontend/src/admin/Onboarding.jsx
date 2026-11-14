/*
 * Build 82: New client onboarding and New vendor onboarding in the super admin (backend/src/routes/onboarding.js).
 * One section per portal, four tabs:
 *   Submissions  every client / vendor that went through the portal (or was added here): search, filter, CSV; open one to
 *                see and change every single detail (company, addresses, tax, contacts, bank, capabilities, extra
 *                fields), its MSAs / agreements and expiry dates, documents (download, add, rename, delete), status,
 *                owner, tags, notes and the full history of who changed what. Any detail can be added or removed.
 *   Renewals     every agreement with its expiry, soonest first (due in 30 days, expired, renewed)
 *   Form fields  the form itself: hide, rename, make required / optional, new choices, help texts, extra fields of any
 *                type on any step, documents asked, step titles, the POC list and a notice. The portal reads it when it opens.
 *   Connect      how the portal sends its submissions here, and the addresses to put in its settings
 * Rights: module "onboarding" (view, create, edit, delete, export, configure); the server checks every call again.
 */
import * as ee from 'react';
import { admApi, admCan, admClone, admDownload, admMe, admNum, admSame, admWhen } from './api.jsx';
import { AdmBtn, AdmCard, AdmField, AdmStatus, admLabel, blankLike } from './Fields.jsx';
import ADM82_CSS from '../styles/admin82.css?inline';

if (typeof document !== "undefined" && !document.getElementById("adm82-css")) { const st = document.createElement("style"); st.id = "adm82-css"; st.textContent = ADM82_CSS; document.head.appendChild(st); }

const NAME = { client: "New client onboarding", vendor: "New vendor onboarding" };
const WHO = { client: "client", vendor: "vendor" };
const STATUS_TXT = { new: "New", "in-review": "In review", approved: "Approved", active: "Active", "on-hold": "On hold", rejected: "Rejected", expired: "Expired", archived: "Archived" };
const TYPES = { sample: "Sample", fieldwork: "Fieldwork", freelance: "Freelance", tech: "Tech" };
const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
const norm = (p) => p.replace(/\.\d+(?=\.|$)/g, ".*");
const fmtBytes = (n) => (n > 1048576 ? (n / 1048576).toFixed(1) + " MB" : Math.max(1, Math.round((n || 0) / 1024)) + " KB");

function useLoad(fn, deps) {
  const [st, setSt] = ee.useState({ loading: true, data: null, err: "" });
  const run = ee.useCallback(() => fn().then((data) => setSt({ loading: false, data, err: "" })).catch((e) => setSt((s) => ({ ...s, loading: false, err: e.message }))), deps);
  ee.useEffect(() => { run(); }, [run]);
  return [st, run];
}
// the form set-up and the list of built-in fields, once per kind
const catCache = {};
const loadForm = (kind, fresh) => { if (fresh || !catCache[kind]) catCache[kind] = admApi("/admin/onboarding-forms/" + kind).catch((e) => { delete catCache[kind]; throw e; }); return catCache[kind]; };

/* ================================================================== section */
function Onboarding({ kind }) {
  const [tab, setTab] = ee.useState("list");
  const [open, setOpen] = ee.useState(null);
  const [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  ee.useEffect(() => { setOpen(null); setTab("list"); }, [kind]);
  const can = (a) => admCan(me, "onboarding", a);
  const tabs = [["list", "Submissions"], ["renewals", "Renewals"], ["form", "Form fields"], ["connect", "Connect the portal"]];
  if (open) return <Record kind={kind} id={open} can={can} onClose={() => setOpen(null)} onOpen={setOpen} />;
  return (
    <section className="adm-sec ob82">
      <header className="adm-sec__h"><h1>{NAME[kind]}</h1></header>
      <div className="ob82-tabs" role="tablist">
        {tabs.map(([id, l]) => <button key={id} role="tab" aria-selected={tab === id} className={tab === id ? "is-on" : ""} onClick={() => setTab(id)}>{l}</button>)}
      </div>
      {tab === "list" && <List kind={kind} can={can} onOpen={setOpen} />}
      {tab === "renewals" && <Renewals kind={kind} onOpen={setOpen} />}
      {tab === "form" && <FormSetup kind={kind} can={can} />}
      {tab === "connect" && <Connect kind={kind} />}
    </section>
  );
}

/* ================================================================== list */
function List({ kind, can, onOpen }) {
  const [f, setF] = ee.useState({ q: "", status: "", poc: "", expiring: "" });
  const [skip, setSkip] = ee.useState(0);
  const [adding, setAdding] = ee.useState(false);
  const qs = new URLSearchParams(Object.entries({ kind, ...f, skip, limit: 50 }).filter(([, v]) => v !== "" && v != null)).toString();
  const [st, reload] = useLoad(() => admApi("/admin/onboarding?" + qs), [qs]);
  const [msg, setMsg] = ee.useState(null);
  const d = st.data;
  const set = (k) => (e) => { setSkip(0); setF({ ...f, [k]: e.target.value }); };
  const exp = () => admDownload("/admin/onboarding?format=csv&" + new URLSearchParams(Object.entries({ kind, ...f }).filter(([, v]) => v)).toString(), kind + "-onboarding.csv").catch((e) => setMsg({ err: e.message }));
  const total = d ? Object.values(d.counts || {}).reduce((a, b) => a + b, 0) : 0;
  return (
    <>
      {d && (
        <div className="adm-kpis ob82-kpis">
          <button className="adm-kpi" onClick={() => setF({ ...f, status: "" })}><small>All {WHO[kind]}s</small><b>{admNum(total)}</b><em>received or added</em></button>
          <button className="adm-kpi" onClick={() => setF({ ...f, status: "new" })}><small>New, not looked at</small><b>{admNum(d.counts.new || 0)}</b><em>status New</em></button>
          <button className="adm-kpi" onClick={() => setF({ ...f, status: "active" })}><small>Active</small><b>{admNum((d.counts.active || 0) + (d.counts.approved || 0))}</b><em>approved or active</em></button>
          <button className="adm-kpi" onClick={() => setF({ ...f, expiring: "30" })}><small>Agreements expiring</small><b>{admNum(d.expiring30)}</b><em>in the next 30 days</em></button>
        </div>
      )}
      <div className="adm-filters">
        <input className="adm-in" placeholder={`Search ${WHO[kind]} name, reference, email, GSTIN / PAN / tax ID, POC, MSA number…`} value={f.q} onChange={set("q")} />
        <select className="adm-in adm-in--auto" value={f.status} onChange={set("status")} aria-label="Status"><option value="">Any status</option>{Object.entries(STATUS_TXT).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
        <input className="adm-in adm-in--auto" placeholder="POC" value={f.poc} onChange={set("poc")} aria-label="POC" />
        <select className="adm-in adm-in--auto" value={f.expiring} onChange={set("expiring")} aria-label="Expiring"><option value="">Any expiry</option><option value="30">Expiring in 30 days</option><option value="90">Expiring in 90 days</option></select>
        {can("export") && <AdmBtn onClick={exp}>Export CSV (every field)</AdmBtn>}
        {can("create") && <AdmBtn kind="primary" onClick={() => setAdding(true)}>+ Add {WHO[kind]}</AdmBtn>}
      </div>
      <AdmStatus s={msg || (st.err ? { err: st.err } : null)} />
      <div className="adm-table"><table><thead><tr><th>Received</th><th>Reference</th><th>{kind === "vendor" ? "Vendor" : "Client"}</th>{kind === "vendor" && <th>Type</th>}<th>Country</th><th>POC</th><th>Agreements</th><th>Next expiry</th><th>Docs</th><th>Status</th></tr></thead><tbody>
        {(d ? d.rows : []).map((r) => (
          <tr key={r.id} className={r.status === "new" ? "is-new" : ""} onClick={() => onOpen(r.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(r.id)}>
            <td>{admWhen(r.received)}</td><td><code>{r.id}</code>{r.source === "admin" && <small className="ob82-src">added here</small>}</td>
            <td><b>{r.company || "—"}</b>{r.trade && r.trade !== r.company && <small className="ob82-sub">{r.trade}</small>}</td>
            {kind === "vendor" && <td>{(r.types || []).map((t) => TYPES[t] || t).join(", ")}</td>}
            <td>{r.country}</td><td>{r.poc || "—"}</td><td>{r.agreementCount}</td><td><Expiry iso={r.nextExpiry} /></td><td>{r.files}</td>
            <td><span className={"adm-pill ob82-st ob82-st--" + r.status}>{STATUS_TXT[r.status] || r.status}</span></td>
          </tr>
        ))}
        {d && !d.rows.length && <tr><td colSpan={10} className="adm-muted">{total ? "Nothing matches." : `No ${WHO[kind]}s yet. They appear here as soon as one completes the onboarding portal (see Connect the portal), or add one with + Add.`}</td></tr>}
      </tbody></table></div>
      {d && <div className="adm-pager"><span>{admNum(d.total)} {WHO[kind]}s</span><AdmBtn small disabled={!skip} onClick={() => setSkip(Math.max(0, skip - 50))}>← Newer</AdmBtn><AdmBtn small disabled={skip + 50 >= d.total} onClick={() => setSkip(skip + 50)}>Older →</AdmBtn></div>}
      {adding && <AddNew kind={kind} onClose={() => setAdding(false)} onDone={(id) => { setAdding(false); reload(); onOpen(id); }} />}
    </>
  );
}

function Expiry({ iso }) {
  if (!iso) return <span className="adm-muted">—</span>;
  const left = Math.round((Date.parse(iso) - Date.parse(new Date().toISOString().slice(0, 10))) / 864e5);
  return <span className={"ob82-exp" + (left < 0 ? " is-past" : left <= 30 ? " is-due" : "")} title={left < 0 ? `${-left} days ago` : `in ${left} days`}>{iso}</span>;
}

function AddNew({ kind, onClose, onDone }) {
  const [name, setName] = ee.useState("");
  const [country, setCountry] = ee.useState("IN");
  const [email, setEmail] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const go = async () => {
    try {
      const r = await admApi("/admin/onboarding", { body: { kind, data: { region: country === "IN" ? "IN" : "INTL", company: { legalName: name, country }, sign: { email }, address: { registered: { country }, billing: { country } } } } });
      onDone(r.id);
    } catch (e) { setMsg({ err: e.message }); }
  };
  return (
    <div className="adm-modal" role="dialog" aria-label={"Add a " + WHO[kind]}>
      <div className="adm-modal__box">
        <h2>Add a {WHO[kind]} by hand</h2>
        <p className="adm-muted">Starts a record with every field of the {NAME[kind].toLowerCase()} form, empty. Fill in the rest, add the signed agreement and documents on the next screen.</p>
        <AdmField label="Legal name"><input className="adm-in" value={name} onChange={(e) => setName(e.target.value)} autoFocus /></AdmField>
        <AdmField label="Country code (IN, US, GB …)"><input className="adm-in" value={country} maxLength={2} onChange={(e) => setCountry(e.target.value.toUpperCase())} /></AdmField>
        <AdmField label="Signatory email (optional)"><input className="adm-in" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></AdmField>
        <AdmStatus s={msg} />
        <div className="adm-row"><AdmBtn kind="primary" onClick={go} disabled={!name.trim()}>Add</AdmBtn><AdmBtn kind="ghost" onClick={onClose}>Cancel</AdmBtn></div>
      </div>
    </div>
  );
}

/* ================================================================== one submission */
const GROUPS = {
  client: [["Company & POC", ["poc", "region", "company"]], ["Address", ["address"]], ["Tax registration", ["tax"]], ["Contacts", ["contacts"]], ["Commercial", ["commercial"]], ["Extra fields (added in Form fields)", ["extra"]], ["Terms & signature", ["terms", "sign"]]],
  vendor: [["Profile & POC", ["poc", "types", "region", "company"]], ["Capabilities", ["caps"]], ["Address", ["address"]], ["Tax registration", ["tax"]], ["Contacts", ["contacts"]], ["Bank & payment", ["commercial"]], ["Extra fields (added in Form fields)", ["extra"]], ["Terms & signature", ["terms", "sign"]]],
};
const SKIP_TOP = new Set(["agreements", "ref", "extraMeta"]);
// names for the groups and the details the portal adds on its own (the form's fields come from the catalogue)
const MORE_LABELS = {
  poc: "Frequent Research POC", "poc.name": "POC name", region: "India or outside India", types: "Vendor types", company: "Company", address: "Addresses & phone", tax: "Tax registration",
  contacts: "Contacts", "contacts.management": "Management contacts", "contacts.references": "References", caps: "Capabilities", commercial: "Commercial terms", "commercial.bank": "Bank account",
  extra: "Extra fields", terms: "Terms accepted", sign: "Signature", "sign.signedAtIso": "Signed at", "sign.tz": "Signer's time zone", "sign.consent": "Agreed to sign electronically",
  "address.phoneCode": "Office phone country", "contacts.management.*.phoneCode": "Phone country", "terms.viewed": "Read the terms", "terms.acceptedAt": "Terms accepted at",
  submittedAt: "Submitted at", renewalOf: "Renews agreement", meta: "Signing record", client: "Client name on the MSA", vendor: "Vendor name on the agreement", kind: "Kind", "company.customServices": "Services in their own words",
};

function Record({ kind, id, can, onClose }) {
  const [st, reload] = useLoad(() => admApi("/admin/onboarding/" + encodeURIComponent(id)).then((j) => j.item), [id]);
  const [form, setForm] = ee.useState(null);
  const [data, setData] = ee.useState(null);
  const [meta, setMeta] = ee.useState(null);
  const [tab, setTab] = ee.useState("details");
  const [msg, setMsg] = ee.useState(null);
  const [busy, setBusy] = ee.useState(false);
  const it = st.data;
  ee.useEffect(() => { loadForm(kind).then(setForm).catch(() => {}); }, [kind]);
  ee.useEffect(() => { if (it) { setData(admClone(it.data)); setMeta({ status: it.status, tags: (it.tags || []).join(", "), owner: it.owner || "" }); } }, [it]);
  if (st.err) return <section className="adm-sec"><AdmBtn kind="ghost" onClick={onClose}>← Back</AdmBtn><AdmStatus s={{ err: st.err }} /></section>;
  if (!it || !data || !meta) return <section className="adm-sec"><p className="adm-muted">Loading…</p></section>;
  const edit = can("edit");
  const dirty = !admSame(data, it.data) || meta.status !== it.status || meta.owner !== (it.owner || "") || meta.tags !== (it.tags || []).join(", ");
  const labels = new Map(((form && form.catalogue.fields) || []).map((f) => [f.path, f.label]));
  const extraLabels = new Map([...((form && form.config.custom) || []), ...(data.extraMeta || [])].map((c) => [c.id, c.label]));
  const labelOf = (path, key) => {
    if (path.startsWith("extra.") && path.split(".").length === 2) return extraLabels.get(key) || admLabel(key);
    return labels.get(path) || labels.get(norm(path)) || MORE_LABELS[path] || MORE_LABELS[norm(path)] || admLabel(key);
  };
  const save = async () => {
    setBusy(true); setMsg(null);
    try {
      const r = await admApi("/admin/onboarding/" + encodeURIComponent(id), { method: "PUT", body: { data, status: meta.status, owner: meta.owner, tags: meta.tags.split(",").map((t) => t.trim()).filter(Boolean) } });
      setMsg({ ok: r.unchanged ? "Nothing to save." : `Saved${r.changes ? ` (${r.changes} detail${r.changes > 1 ? "s" : ""} changed, see History)` : ""}.` });
      reload();
    } catch (e) { setMsg({ err: e.message }); }
    setBusy(false);
  };
  const del = async () => {
    if (!confirm(`Delete ${it.company || id} with all its details and ${it.files.length} document(s)? This cannot be undone.`)) return;
    try { await admApi("/admin/onboarding/" + encodeURIComponent(id), { method: "DELETE" }); onClose(); } catch (e) { setMsg({ err: e.message }); }
  };
  const json = () => { const b = new Blob([JSON.stringify({ ...it, data }, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(b); a.download = id + ".json"; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 3000); };
  const used = new Set(GROUPS[kind].flatMap(([, ks]) => ks));
  const other = Object.keys(data).filter((k) => !used.has(k) && !SKIP_TOP.has(k));
  const email = (data.sign && data.sign.email) || it.email;
  const tabs = [["details", "All details"], ["agreements", `MSAs & agreements (${(data.agreements || []).length})`], ["docs", `Documents (${it.files.length})`], ["notes", `Notes (${it.notes.length})`], ["history", "History"]];
  return (
    <section className="adm-sec ob82">
      <header className="adm-sec__h ob82-rh">
        <AdmBtn kind="ghost" onClick={() => { if (!dirty || confirm("Leave without saving your changes?")) onClose(); }}>← {NAME[kind]}</AdmBtn>
        <div className="ob82-rh__t"><h1>{(data.company && data.company.legalName) || id}</h1>
          <p className="adm-muted"><code>{id}</code> · {it.source === "admin" ? "added in the admin" : "from the portal"} {admWhen(it.received)} · updated {admWhen(it.updated)}{data.poc && (data.poc.name || data.poc.custom) ? ` · POC ${data.poc.name || data.poc.custom}` : ""}</p></div>
      </header>
      <div className="ob82-bar">
        <AdmField label="Status"><select className="adm-in" disabled={!edit} value={meta.status} onChange={(e) => setMeta({ ...meta, status: e.target.value })}>{Object.entries(STATUS_TXT).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></AdmField>
        <AdmField label="Owner at Frequent Research"><input className="adm-in" disabled={!edit} value={meta.owner} onChange={(e) => setMeta({ ...meta, owner: e.target.value })} placeholder="Who looks after this account" /></AdmField>
        <AdmField label="Tags (comma separated)"><input className="adm-in" disabled={!edit} value={meta.tags} onChange={(e) => setMeta({ ...meta, tags: e.target.value })} placeholder="key account, India …" /></AdmField>
        <div className="ob82-bar__a">
          {edit && <AdmBtn kind="primary" onClick={save} disabled={!dirty || busy}>{busy ? "Saving…" : dirty ? "Save changes" : "Saved"}</AdmBtn>}
          {dirty && <AdmBtn kind="ghost" onClick={() => { setData(admClone(it.data)); setMeta({ status: it.status, tags: (it.tags || []).join(", "), owner: it.owner || "" }); }}>Undo changes</AdmBtn>}
          {email && <a className="adm-btn" href={"mailto:" + email}>Email signatory</a>}
          <AdmBtn onClick={json}>Download JSON</AdmBtn>
          {can("delete") && <AdmBtn kind="danger" onClick={del}>Delete</AdmBtn>}
        </div>
      </div>
      <AdmStatus s={msg} />
      <div className="ob82-tabs" role="tablist">{tabs.map(([t, l]) => <button key={t} role="tab" aria-selected={tab === t} className={tab === t ? "is-on" : ""} onClick={() => setTab(t)}>{l}</button>)}</div>
      {tab === "details" && (
        <div className="ob82-groups">
          <p className="adm-muted">Every detail the {WHO[kind]} gave, field by field. Change any value, add or remove contacts, references and list entries, or add a detail of your own with “+ Add a detail”. Press Save changes when done.</p>
          {GROUPS[kind].map(([g, keys], gi) => (
            <AdmCard key={g} title={g} sub={keys.filter((k) => data[k] !== undefined).map((k) => countLeaves(data[k])).reduce((a, b) => a + b, 0) + " details"} open={gi === 0}>
              {keys.map((k) => (data[k] === undefined
                ? (edit && k === "extra" ? <AdmBtn key={k} small onClick={() => setData({ ...data, extra: {} })}>+ Start extra fields</AdmBtn> : null)
                : <div className="adm-f ob82-top" key={k}><span className="adm-f__l">{labelOf(k, k)}</span><div className="adm-f__v"><Val path={k} k={k} value={data[k]} edit={edit} labelOf={labelOf} onChange={(v) => setData({ ...data, [k]: v })} /></div></div>))}
            </AdmCard>
          ))}
          {other.length > 0 && (
            <AdmCard title="Other details sent by the portal" sub={other.join(", ")}>
              {other.map((k) => <div className="adm-f ob82-top" key={k}><span className="adm-f__l">{labelOf(k, k)}</span><div className="adm-f__v"><Val path={k} k={k} value={data[k]} edit={edit} labelOf={labelOf} onChange={(v) => setData({ ...data, [k]: v })} onRemove={edit ? () => { const n = { ...data }; delete n[k]; setData(n); } : null} /></div></div>)}
            </AdmCard>
          )}
          {edit && <AddDetail onAdd={(k, v) => setData({ ...data, [k]: v })} taken={Object.keys(data)} top />}
        </div>
      )}
      {tab === "agreements" && <Agreements kind={kind} data={data} edit={edit} setData={setData} form={form} files={it.files} id={id} />}
      {tab === "docs" && <Docs id={id} item={it} edit={edit} reload={reload} setMsg={setMsg} />}
      {tab === "notes" && <Notes id={id} item={it} edit={edit} reload={reload} />}
      {tab === "history" && <History item={it} labelOf={labelOf} />}
      {dirty && <div className="ob82-float"><span>Unsaved changes</span><AdmBtn kind="primary" onClick={save} disabled={busy}>Save changes</AdmBtn></div>}
    </section>
  );
}

const countLeaves = (v) => (Array.isArray(v) ? v.reduce((a, x) => a + countLeaves(x), 0) : isObj(v) ? Object.values(v).reduce((a, x) => a + countLeaves(x), 0) : 1);
const show = (v) => (v === true ? "Yes" : v === false ? "No" : v == null || v === "" ? "—" : String(v));

// any value, with its path (so every field gets its form label); objects get "+ Add a detail" and ✕ per detail
function Val({ path, k, value, edit, onChange, labelOf, onRemove }) {
  const rm = onRemove ? <AdmBtn small kind="ghost" title="Remove this detail" onClick={onRemove}>✕</AdmBtn> : null;
  if (typeof value === "boolean") return <span className="ob82-v">{edit ? <label className="adm-sw"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /><span>{value ? "Yes" : "No"}</span></label> : show(value)}{rm}</span>;
  if (typeof value === "number") return <span className="ob82-v">{edit ? <input className="adm-in adm-in--num" type="number" step="any" value={value} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} /> : show(value)}{rm}</span>;
  if (value == null || typeof value === "string") {
    const long = (value || "").length > 90 || /notes|about|description|customTerms|facilities/.test(k);
    if (!edit) return <span className="ob82-v ob82-ro">{show(value)}</span>;
    return <span className="ob82-v">{long ? <textarea className="adm-in adm-ta" rows={3} value={value || ""} onChange={(e) => onChange(e.target.value)} /> : <input className="adm-in" value={value || ""} onChange={(e) => onChange(e.target.value)} />}{rm}</span>;
  }
  if (Array.isArray(value)) {
    const prim = value.every((x) => x == null || typeof x !== "object");
    if (prim) {
      if (!edit) return <span className="ob82-v ob82-ro">{value.length ? value.map(show).join(", ") : "—"}</span>;
      return (
        <div className="ob82-chips">
          {value.map((x, i) => <span className="ob82-chip" key={i}><input className="adm-in" value={x == null ? "" : String(x)} onChange={(e) => { const n = [...value]; n[i] = e.target.value; onChange(n); }} /><button type="button" title="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</button></span>)}
          <AdmBtn small onClick={() => onChange([...value, ""])}>+ Add</AdmBtn>{rm}
        </div>
      );
    }
    return (
      <div className="adm-list">
        {value.map((x, i) => (
          <AdmCard key={i} depth={1} title={(isObj(x) && (x.name || x.company || x.title || x.label || x.ref)) || `${labelOf(path, k)} ${i + 1}`} open={value.length <= 2}
            actions={edit ? <AdmBtn small kind="ghost" title="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</AdmBtn> : null}>
            <Val path={`${path}.${i}`} k={k} value={x} edit={edit} labelOf={labelOf} onChange={(v) => { const n = [...value]; n[i] = v; onChange(n); }} />
          </AdmCard>
        ))}
        {edit && <AdmBtn small onClick={() => onChange([...value, value.length ? blankLike(value[value.length - 1]) : {}])}>+ Add another</AdmBtn>}
        {rm}
      </div>
    );
  }
  if (isObj(value)) {
    const keys = Object.keys(value);
    return (
      <div className="adm-obj ob82-obj">
        {!keys.length && <span className="adm-muted">Nothing yet.</span>}
        {keys.map((key) => (
          <div className="adm-f" key={key}>
            <span className="adm-f__l">{labelOf(`${path}.${key}`, key)}</span>
            <div className="adm-f__v"><Val path={`${path}.${key}`} k={key} value={value[key]} edit={edit} labelOf={labelOf} onChange={(v) => onChange({ ...value, [key]: v })}
              onRemove={edit ? () => { const n = { ...value }; delete n[key]; onChange(n); } : null} /></div>
          </div>
        ))}
        {edit && <AddDetail onAdd={(nk, v) => onChange({ ...value, [nk]: v })} taken={keys} />}
        {rm}
      </div>
    );
  }
  return <code>{String(value)}</code>;
}

function AddDetail({ onAdd, taken, top }) {
  const [open, setOpen] = ee.useState(false);
  const [name, setName] = ee.useState("");
  const [type, setType] = ee.useState("text");
  if (!open) return <AdmBtn small onClick={() => setOpen(true)}>{top ? "+ Add a new group of details" : "+ Add a detail"}</AdmBtn>;
  const key = name.trim().replace(/[^\p{L}\p{N} _-]/gu, "").replace(/\s+(\p{L})/gu, (_, c) => c.toUpperCase()).replace(/\s/g, "").replace(/^./, (c) => c.toLowerCase()).slice(0, 60);
  const add = () => { if (!key || taken.includes(key)) return; onAdd(key, type === "yes/no" ? false : type === "number" ? 0 : type === "list" ? [] : type === "group" ? {} : ""); setOpen(false); setName(""); };
  return (
    <div className="ob82-add">
      <input className="adm-in" placeholder="Name of the detail, e.g. Credit limit" value={name} onChange={(e) => setName(e.target.value)} autoFocus onKeyDown={(e) => e.key === "Enter" && add()} />
      <select className="adm-in adm-in--auto" value={type} onChange={(e) => setType(e.target.value)}>{(top ? ["group", "text", "list"] : ["text", "number", "yes/no", "list", "group"]).map((t) => <option key={t}>{t}</option>)}</select>
      <AdmBtn small kind="primary" onClick={add} disabled={!key || taken.includes(key)}>Add</AdmBtn><AdmBtn small kind="ghost" onClick={() => setOpen(false)}>Cancel</AdmBtn>
      {key && taken.includes(key) && <em className="adm-err">Already there.</em>}
    </div>
  );
}

/* ---- MSAs / agreements */
function Agreements({ kind, data, edit, setData, form, files }) {
  const ag = data.agreements || [];
  const practices = (form && form.catalogue.practices) || {};
  const codes = kind === "vendor" ? ["SP", "FW", "FL", "TS"] : ["MR", "DM", "IT", "AF"];
  const set = (i, k, v) => { const n = ag.map((a) => ({ ...a })); n[i][k] = v; if (k === "code") n[i].title = n[i].title || practices[v] || v; setData({ ...data, agreements: n }); };
  const add = () => {
    const y = new Date().getFullYear(), e = new Date(Date.now() + 364 * 864e5).toISOString().slice(0, 10);
    setData({ ...data, agreements: [...ag, { code: codes[0], practice: codes[0].toLowerCase(), title: practices[codes[0]] || codes[0], ref: `FR-${codes[0]}-${y}-` + Math.random().toString(36).slice(2, 8).toUpperCase(), effective: new Date().toISOString().slice(0, 10), expiryISO: e, expiry: e, renewalNoticeISO: "", services: [] }] });
  };
  return (
    <div className="ob82-ag">
      <p className="adm-muted">Each signed {kind === "vendor" ? "vendor agreement" : "MSA"} with its reference and dates. Change an expiry date here when an agreement is extended, or add one signed outside the portal (then add its PDF under Documents). Renewal emails are sent by the portal server or SampBidx from the dates they hold: change the date there too if you change it here.</p>
      <div className="adm-table"><table><thead><tr><th>Type</th><th>Title</th><th>Agreement no.</th><th>Effective</th><th>Expires</th><th>Renewal notice</th><th>Services</th><th>Renewed by</th><th>PDF</th>{edit && <th />}</tr></thead><tbody>
        {ag.map((a, i) => {
          const pdf = files.find((f) => f.field === "agreement_" + a.code);
          return (
            <tr key={i} className="ob82-noclick">
              <td>{edit ? <select className="adm-in adm-in--auto" value={a.code || ""} onChange={(e) => set(i, "code", e.target.value)}>{[...new Set([...codes, a.code].filter(Boolean))].map((c) => <option key={c} value={c}>{c}</option>)}</select> : a.code}</td>
              <td>{edit ? <input className="adm-in" value={a.title || ""} onChange={(e) => set(i, "title", e.target.value)} /> : a.title}</td>
              <td>{edit ? <input className="adm-in" value={a.ref || ""} onChange={(e) => set(i, "ref", e.target.value)} /> : <code>{a.ref}</code>}</td>
              <td>{edit ? <input className="adm-in" value={a.effective || ""} onChange={(e) => set(i, "effective", e.target.value)} /> : a.effective}</td>
              <td>{edit ? <input className="adm-in" type="date" value={a.expiryISO || ""} onChange={(e) => set(i, "expiryISO", e.target.value)} /> : <Expiry iso={a.expiryISO} />}</td>
              <td>{edit ? <input className="adm-in" type="date" value={a.renewalNoticeISO || ""} onChange={(e) => set(i, "renewalNoticeISO", e.target.value)} /> : a.renewalNoticeISO}</td>
              <td>{edit ? <input className="adm-in" value={(a.services || []).join(", ")} onChange={(e) => set(i, "services", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} /> : (a.services || []).join(", ")}</td>
              <td>{a.renewedBy || "—"}</td>
              <td>{pdf ? <AdmBtn small onClick={() => admDownload(`/admin/onboarding/${encodeURIComponent(data.ref)}/files/${pdf.id}`, pdf.name)}>Download</AdmBtn> : <span className="adm-muted">—</span>}</td>
              {edit && <td><AdmBtn small kind="ghost" title="Remove" onClick={() => setData({ ...data, agreements: ag.filter((_, j) => j !== i) })}>✕</AdmBtn></td>}
            </tr>
          );
        })}
        {!ag.length && <tr><td colSpan={10} className="adm-muted">No agreements yet.</td></tr>}
      </tbody></table></div>
      {edit && <AdmBtn onClick={add}>+ Add an agreement</AdmBtn>}
      {edit && <p className="adm-muted">Save changes (at the top) to keep agreement changes.</p>}
    </div>
  );
}

/* ---- documents */
function Docs({ id, item, edit, reload, setMsg }) {
  const ref = ee.useRef(null);
  const [label, setLabel] = ee.useState("");
  const [busy, setBusy] = ee.useState(false);
  const [names, setNames] = ee.useState({});
  const base = "/admin/onboarding/" + encodeURIComponent(id) + "/files";
  const up = async (e) => {
    const f = e.target.files && e.target.files[0]; e.target.value = "";
    if (!f) return;
    setBusy(true);
    try { await admApi(`${base}?${new URLSearchParams({ name: f.name, label: label || f.name })}`, { method: "POST", body: f, headers: { "Content-Type": f.type || "application/octet-stream" } }); setLabel(""); setMsg({ ok: "Document added." }); reload(); } catch (x) { setMsg({ err: x.message }); }
    setBusy(false);
  };
  const del = async (f) => { if (!confirm(`Delete ${f.name}?`)) return; try { await admApi(`${base}/${f.id}`, { method: "DELETE" }); reload(); } catch (x) { setMsg({ err: x.message }); } };
  const rename = async () => { try { await admApi("/admin/onboarding/" + encodeURIComponent(id), { method: "PUT", body: { fileLabels: Object.entries(names).map(([fid, l]) => ({ id: fid, label: l })) } }); setNames({}); setMsg({ ok: "Names saved." }); reload(); } catch (x) { setMsg({ err: x.message }); } };
  const view = async (f) => { const r = await admApi(`${base}/${f.id}?inline=1`, { raw: true }); const u = URL.createObjectURL(await r.blob()); window.open(u, "_blank", "noopener"); setTimeout(() => URL.revokeObjectURL(u), 60000); };
  return (
    <div className="ob82-docs">
      <p className="adm-muted">Signed agreements, the signature, the logo and every KYC / capability document. Each one keeps the SHA-256 fingerprint that is printed in the agreement, so you can prove it is the same file.</p>
      <div className="adm-table"><table><thead><tr><th>Document</th><th>File</th><th>Size</th><th>Added</th><th>SHA-256</th><th /></tr></thead><tbody>
        {item.files.map((f) => (
          <tr key={f.id} className="ob82-noclick">
            <td>{edit ? <input className="adm-in" value={names[f.id] ?? f.label} onChange={(e) => setNames({ ...names, [f.id]: e.target.value })} /> : f.label}</td>
            <td>{f.name}</td><td>{fmtBytes(f.size)}</td><td>{admWhen(f.at)}<small className="ob82-sub">{f.by}</small></td><td><code className="ob82-sha" title={f.sha256}>{(f.sha256 || "").slice(0, 12)}…</code></td>
            <td className="ob82-nowrap">{/^(application\/pdf|image\/)/.test(f.type || "") && <AdmBtn small onClick={() => view(f).catch((x) => setMsg({ err: x.message }))}>View</AdmBtn>}<AdmBtn small onClick={() => admDownload(`${base}/${f.id}`, f.name).catch((x) => setMsg({ err: x.message }))}>Download</AdmBtn>{edit && <AdmBtn small kind="ghost" onClick={() => del(f)}>✕</AdmBtn>}</td>
          </tr>
        ))}
        {!item.files.length && <tr><td colSpan={6} className="adm-muted">No documents.</td></tr>}
      </tbody></table></div>
      {Object.keys(names).length > 0 && <AdmBtn kind="primary" onClick={rename}>Save document names</AdmBtn>}
      {item.missingFiles.length > 0 && <div className="adm-panel"><h3>Kept on the portal server only</h3><p className="adm-muted">These files were too big to send. Their fingerprints are here; the files are in the portal server's data folder ({id}).</p><ul>{item.missingFiles.map((m, i) => <li key={i}>{m.field}: {m.name} ({fmtBytes(m.size)}) <code>{(m.sha256 || "").slice(0, 12)}…</code></li>)}</ul></div>}
      {edit && (
        <div className="ob82-add">
          <input className="adm-in" placeholder="Name of the document, e.g. Countersigned MSA" value={label} onChange={(e) => setLabel(e.target.value)} />
          <input ref={ref} type="file" hidden onChange={up} accept=".pdf,image/*,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.zip" />
          <AdmBtn kind="primary" disabled={busy} onClick={() => ref.current.click()}>{busy ? "Uploading…" : "+ Add a document"}</AdmBtn>
        </div>
      )}
    </div>
  );
}

function Notes({ id, item, edit, reload }) {
  const [text, setText] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const add = async () => { try { await admApi(`/admin/onboarding/${encodeURIComponent(id)}/notes`, { body: { text } }); setText(""); reload(); } catch (e) { setMsg({ err: e.message }); } };
  const del = async (n) => { if (!confirm("Delete this note?")) return; await admApi(`/admin/onboarding/${encodeURIComponent(id)}/notes/${n.id}`, { method: "DELETE" }); reload(); };
  return (
    <div className="ob82-notes">
      {edit && <><textarea className="adm-in adm-ta" rows={3} placeholder="Internal note: calls, follow-ups, credit checks … (never shown to the client or vendor)" value={text} onChange={(e) => setText(e.target.value)} /><AdmBtn kind="primary" disabled={!text.trim()} onClick={add}>Add note</AdmBtn></>}
      <AdmStatus s={msg} />
      <ul className="ob82-tl">{[...item.notes].reverse().map((n) => <li key={n.id}><b>{(n.by && (n.by.name || n.by.email)) || "admin"}</b> <small>{admWhen(n.at)}</small><p>{n.text}</p>{edit && <AdmBtn small kind="ghost" onClick={() => del(n)}>Delete</AdmBtn>}</li>)}</ul>
      {!item.notes.length && <p className="adm-muted">No notes yet.</p>}
    </div>
  );
}

function History({ item, labelOf }) {
  return (
    <ul className="ob82-tl">
      {[...item.history].reverse().map((h, i) => (
        <li key={i}><b>{(h.by && (h.by.name || h.by.email)) || "—"}</b> <small>{admWhen(h.at)}</small><p>{h.action}</p>
          {h.changes && h.changes.length > 0 && <details><summary>{h.changes.length} detail{h.changes.length > 1 ? "s" : ""} changed</summary><ul>{h.changes.map((c) => <li key={c}>{labelOf(c, c.split(".").pop())} <code>{c}</code></li>)}</ul></details>}
        </li>
      ))}
    </ul>
  );
}

/* ================================================================== renewals */
function Renewals({ kind, onOpen }) {
  const [days, setDays] = ee.useState(90);
  const [st] = useLoad(() => admApi(`/admin/onboarding-renewals?kind=${kind}&days=${days}`).then((j) => j.rows), [kind, days]);
  const rows = st.data || [];
  return (
    <>
      <div className="adm-filters"><select className="adm-in adm-in--auto" value={days} onChange={(e) => setDays(+e.target.value)}>{[30, 90, 180, 365, 3650].map((d) => <option key={d} value={d}>{d === 3650 ? "Every agreement" : `Expiring in the next ${d} days (and expired)`}</option>)}</select></div>
      <AdmStatus s={st.err ? { err: st.err } : null} />
      <div className="adm-table"><table><thead><tr><th>Expires</th><th>Days left</th><th>{kind === "vendor" ? "Vendor" : "Client"}</th><th>Agreement</th><th>No.</th><th>POC</th><th>Signatory email</th><th>State</th></tr></thead><tbody>
        {rows.map((r) => (
          <tr key={r.ref + r.id} onClick={() => onOpen(r.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && onOpen(r.id)}>
            <td><Expiry iso={r.expiryISO} /></td><td>{r.daysLeft}</td><td><b>{r.company}</b></td><td>{r.title}</td><td><code>{r.ref}</code></td><td>{r.poc}</td><td>{r.email}</td>
            <td><span className={"adm-pill ob82-rn ob82-rn--" + r.state}>{{ ok: "Valid", due: "Due soon", expired: "Expired", renewed: "Renewed" }[r.state]}</span></td>
          </tr>
        ))}
        {!st.loading && !rows.length && <tr><td colSpan={8} className="adm-muted">No agreements in this period.</td></tr>}
      </tbody></table></div>
    </>
  );
}

/* ================================================================== form set-up */
const REQ = [["", "As built"], ["yes", "Required"], ["no", "Optional"]];
const optLines = (o) => (o || []).map((x) => (typeof x === "string" ? x : x.value === x.label ? x.value : `${x.value} | ${x.label}`)).join("\n");
const parseLines = (t) => t.split("\n").map((l) => l.trim()).filter(Boolean).map((l) => { const [v, ...rest] = l.split("|"); return rest.length ? { value: v.trim(), label: rest.join("|").trim() } : l; });

function FormSetup({ kind, can }) {
  const [st, setSt] = ee.useState(null);
  const [cfg, setCfg] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const [q, setQ] = ee.useState("");
  const [busy, setBusy] = ee.useState(false);
  ee.useEffect(() => { loadForm(kind, true).then((j) => { setSt(j); setCfg(admClone(j.config)); }).catch((e) => setMsg({ err: e.message })); }, [kind]);
  if (!st || !cfg) return <><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></>;
  const ed = can("configure");
  const cat = st.catalogue;
  const locked = new Set(cat.locked);
  const dirty = !admSame(cfg, st.config);
  const fld = (p) => cfg.fields[p] || {};
  const setF = (p, k, v) => { const o = { ...fld(p) }; if (v === "" || v === undefined || v === null) delete o[k]; else o[k] = v; const fields = { ...cfg.fields }; if (Object.keys(o).filter((x) => x !== "step").length) fields[p] = o; else delete fields[p]; setCfg({ ...cfg, fields }); };
  const doc = (id) => cfg.docs[id] || {};
  const setD = (id, k, v) => { const o = { ...doc(id) }; if (v === "" || v === undefined) delete o[k]; else o[k] = v; const docs = { ...cfg.docs }; if (Object.keys(o).length) docs[id] = o; else delete docs[id]; setCfg({ ...cfg, docs }); };
  const setStep = (i, k, v) => { const steps = { ...cfg.steps }; const o = { ...(steps[i] || {}) }; if (v) o[k] = v; else delete o[k]; if (Object.keys(o).length) steps[i] = o; else delete steps[i]; setCfg({ ...cfg, steps }); };
  const setC = (i, k, v) => { const custom = cfg.custom.map((c) => ({ ...c })); custom[i][k] = v; setCfg({ ...cfg, custom }); };
  const moveC = (i, d) => { const c = [...cfg.custom]; const j = i + d; if (j < 0 || j >= c.length) return; [c[i], c[j]] = [c[j], c[i]]; setCfg({ ...cfg, custom: c }); };
  const save = async () => {
    setBusy(true);
    try { const r = await admApi("/admin/onboarding-forms/" + kind, { method: "PUT", body: { config: cfg } }); const j = await loadForm(kind, true); setSt(j); setCfg(admClone(j.config)); setMsg({ ok: `Saved (version ${r.config.version}). The ${WHO[kind]} portal shows it to the next person who opens the form (within a minute).` }); }
    catch (e) { setMsg({ err: e.message }); }
    setBusy(false);
  };
  const ql = q.trim().toLowerCase();
  const changed = Object.keys(cfg.fields).length + Object.keys(cfg.docs).length + cfg.custom.length + Object.keys(cfg.steps).length;
  return (
    <div className="ob82-form">
      <p className="adm-muted">Change the {NAME[kind].toLowerCase()} form without touching its files. Hide a field, rename it, make it required or optional, change its choices and help text, add fields of your own on any step, choose which documents are asked for, rename the steps and keep the list of POCs. Fields marked 🔒 drive the agreement and can be renamed only. {changed ? `${changed} change${changed > 1 ? "s" : ""} from the built-in form.` : "The form is as built."}</p>
      {!ed && <p className="adm-status">You can look at the set-up; changing it needs the Configure right on onboarding.</p>}
      <div className="ob82-bar ob82-bar--sticky">
        <input className="adm-in" placeholder="Find a field…" value={q} onChange={(e) => setQ(e.target.value)} />
        {ed && <AdmBtn kind="primary" onClick={save} disabled={!dirty || busy}>{busy ? "Saving…" : dirty ? "Save the form" : "Saved"}</AdmBtn>}
        {dirty && <AdmBtn kind="ghost" onClick={() => setCfg(admClone(st.config))}>Undo changes</AdmBtn>}
      </div>
      <AdmStatus s={msg} />

      <AdmCard title="Notice at the top of the form" sub={cfg.notice ? "on" : "none"}>
        <textarea className="adm-in adm-ta" rows={2} disabled={!ed} placeholder="e.g. Our offices are closed on 14 November: onboarding is checked the next working day." value={cfg.notice || ""} onChange={(e) => setCfg({ ...cfg, notice: e.target.value })} />
      </AdmCard>

      <AdmCard title="Your Frequent Research contacts (POCs)" sub={`${(cfg.pocs || []).length} people · the first question of the form`}>
        <p className="adm-muted">The people a {WHO[kind]} can pick as the one who shared the form. The id is used in personal links: <code>?poc=kunal</code>. The email (never shown on the form) is for your own reference.</p>
        {(cfg.pocs || []).map((p, i) => (
          <div className="ob82-add" key={i}>
            <input className="adm-in" disabled={!ed} placeholder="Name" value={p.name} onChange={(e) => { const pocs = cfg.pocs.map((x) => ({ ...x })); pocs[i].name = e.target.value; if (!p.id || p.id === p.name.toLowerCase().split(" ")[0]) pocs[i].id = e.target.value.toLowerCase().split(" ")[0].replace(/[^a-z0-9-]/g, ""); setCfg({ ...cfg, pocs }); }} />
            <input className="adm-in adm-in--auto" disabled={!ed} placeholder="link id" value={p.id} onChange={(e) => { const pocs = cfg.pocs.map((x) => ({ ...x })); pocs[i].id = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""); setCfg({ ...cfg, pocs }); }} />
            <input className="adm-in" disabled={!ed} placeholder="email (optional)" value={p.email || ""} onChange={(e) => { const pocs = cfg.pocs.map((x) => ({ ...x })); pocs[i].email = e.target.value; setCfg({ ...cfg, pocs }); }} />
            {ed && <AdmBtn small kind="ghost" onClick={() => setCfg({ ...cfg, pocs: cfg.pocs.filter((_, j) => j !== i) })}>✕</AdmBtn>}
          </div>
        ))}
        {ed && <AdmBtn small onClick={() => setCfg({ ...cfg, pocs: [...(cfg.pocs || []), { id: "", name: "", email: "" }] })}>+ Add a POC</AdmBtn>}
      </AdmCard>

      {cat.steps.map((s, si) => {
        const rows = cat.fields.filter((f) => f.step === si && (!ql || (f.label + " " + f.path + " " + (fld(f.path).label || "")).toLowerCase().includes(ql)));
        const extra = cfg.custom.map((c, i) => [c, i]).filter(([c]) => c.step === si);
        const changes = cat.fields.filter((f) => f.step === si && cfg.fields[f.path]).length + extra.length;
        if (ql && !rows.length) return null;
        return (
          <AdmCard key={si} title={`Step ${si + 1}: ${(cfg.steps[si] && cfg.steps[si].title) || s.title}`} sub={`${cat.fields.filter((f) => f.step === si).length} fields${changes ? ` · ${changes} changed / added` : ""}`} open={!!ql}>
            <div className="ob82-steptxt">
              <AdmField label="Step title"><input className="adm-in" disabled={!ed} placeholder={s.title} value={(cfg.steps[si] && cfg.steps[si].title) || ""} onChange={(e) => setStep(si, "title", e.target.value)} /></AdmField>
              <AdmField label="Step description"><input className="adm-in" disabled={!ed} placeholder={s.desc} value={(cfg.steps[si] && cfg.steps[si].desc) || ""} onChange={(e) => setStep(si, "desc", e.target.value)} /></AdmField>
            </div>
            {rows.length > 0 && (
              <div className="adm-table ob82-ft"><table><thead><tr><th>Field</th><th>Show</th><th>Required</th><th>Label on the form</th><th>Placeholder / hint / help</th><th>Choices (one per line, value | label)</th></tr></thead><tbody>
                {rows.map((f) => {
                  const o = fld(f.path), lk = locked.has(f.path);
                  return (
                    <tr key={f.path} className={"ob82-noclick" + (o.hidden ? " is-off" : "")}>
                      <td><b>{f.label}</b>{lk && " 🔒"}<small className="ob82-sub"><code>{f.path}</code> · {f.type}</small>{f.note && <small className="ob82-sub">{f.note}</small>}</td>
                      <td><input type="checkbox" aria-label="Show" disabled={!ed || lk} checked={!o.hidden} onChange={(e) => setF(f.path, "hidden", e.target.checked ? undefined : true)} /></td>
                      <td><select className="adm-in adm-in--auto" disabled={!ed} value={o.required === true ? "yes" : o.required === false ? "no" : ""} onChange={(e) => setF(f.path, "required", e.target.value === "yes" ? true : e.target.value === "no" && !lk ? false : undefined)}>{REQ.filter(([v]) => !(lk && v === "no")).map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></td>
                      <td><input className="adm-in" disabled={!ed} placeholder="as built" value={o.label || ""} onChange={(e) => setF(f.path, "label", e.target.value)} /></td>
                      <td className="ob82-stack">
                        {["text", "email", "phone", "textarea", "date"].includes(f.type) && <input className="adm-in" disabled={!ed} placeholder="placeholder" value={o.placeholder || ""} onChange={(e) => setF(f.path, "placeholder", e.target.value)} />}
                        <input className="adm-in" disabled={!ed} placeholder="hint under the field" value={o.hint || ""} onChange={(e) => setF(f.path, "hint", e.target.value)} />
                        <input className="adm-in" disabled={!ed} placeholder="ⓘ help text" value={o.info || ""} onChange={(e) => setF(f.path, "info", e.target.value)} />
                      </td>
                      <td>{["select", "choice", "multiselect"].includes(f.type) ? <textarea className="adm-in adm-ta" rows={2} disabled={!ed} placeholder="as built" value={optLines(o.options)} onChange={(e) => setF(f.path, "options", e.target.value.trim() ? parseLines(e.target.value) : undefined)} /> : <span className="adm-muted">—</span>}</td>
                    </tr>
                  );
                })}
              </tbody></table></div>
            )}
            <h3 className="ob82-h3">Extra fields on this step</h3>
            {!extra.length && <p className="adm-muted">None. Extra fields appear at the end of the step, in the same design as the others, and their answers are saved with the submission (Extra fields).</p>}
            {extra.map(([c, i]) => (
              <div className={"ob82-cf" + (c.hidden ? " is-off" : "")} key={i}>
                <div className="ob82-cf__row">
                  <AdmField label="Label"><input className="adm-in" disabled={!ed} value={c.label} onChange={(e) => setC(i, "label", e.target.value)} /></AdmField>
                  <AdmField label="Type"><select className="adm-in" disabled={!ed} value={c.type} onChange={(e) => setC(i, "type", e.target.value)}>{cat.customTypes.map((t) => <option key={t} value={t}>{t}</option>)}</select></AdmField>
                  <AdmField label="Step"><select className="adm-in" disabled={!ed} value={c.step} onChange={(e) => setC(i, "step", +e.target.value)}>{cat.steps.slice(0, -1).map((s2, k) => <option key={k} value={k}>{k + 1}. {s2.title}</option>)}</select></AdmField>
                  <AdmField label="Id (saved as)"><input className="adm-in" disabled={!ed} value={c.id} onChange={(e) => setC(i, "id", e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ""))} /></AdmField>
                </div>
                <div className="ob82-cf__row">
                  <AdmField label="Section heading (optional)"><input className="adm-in" disabled={!ed} value={c.section || ""} onChange={(e) => setC(i, "section", e.target.value)} /></AdmField>
                  {c.type !== "file" && c.type !== "checkbox" && <AdmField label="Placeholder"><input className="adm-in" disabled={!ed} value={c.placeholder || ""} onChange={(e) => setC(i, "placeholder", e.target.value)} /></AdmField>}
                  <AdmField label="Hint"><input className="adm-in" disabled={!ed} value={c.hint || ""} onChange={(e) => setC(i, "hint", e.target.value)} /></AdmField>
                  {["select", "multiselect", "radio"].includes(c.type) && <AdmField label="Choices (one per line)"><textarea className="adm-in adm-ta" rows={3} disabled={!ed} value={optLines(c.options)} onChange={(e) => setC(i, "options", parseLines(e.target.value))} /></AdmField>}
                </div>
                <div className="ob82-cf__row ob82-cf__ctl">
                  <label className="adm-sw"><input type="checkbox" disabled={!ed} checked={!!c.required} onChange={(e) => setC(i, "required", e.target.checked)} /><span>Required</span></label>
                  <label className="adm-sw"><input type="checkbox" disabled={!ed} checked={!c.hidden} onChange={(e) => setC(i, "hidden", !e.target.checked)} /><span>Shown</span></label>
                  {ed && <><AdmBtn small kind="ghost" onClick={() => moveC(i, -1)}>↑</AdmBtn><AdmBtn small kind="ghost" onClick={() => moveC(i, 1)}>↓</AdmBtn><AdmBtn small kind="danger" onClick={() => setCfg({ ...cfg, custom: cfg.custom.filter((_, j) => j !== i) })}>Remove field</AdmBtn></>}
                </div>
              </div>
            ))}
            {ed && si < cat.steps.length - 1 && <AdmBtn small onClick={() => { const n = cfg.custom.length + 1; let id = "field" + n; while (cfg.custom.some((c) => c.id === id)) id += "x"; setCfg({ ...cfg, custom: [...cfg.custom, { id, type: "text", step: si, label: "New field", required: false, hidden: false, placeholder: "", hint: "", section: "" }] }); }}>+ Add a field to this step</AdmBtn>}
            {si === cat.steps.findIndex((x) => x.title === "Documents") && (
              <>
                <h3 className="ob82-h3">Documents asked for</h3>
                <p className="adm-muted">Which documents the portal asks for depends on the country, the type of company{kind === "vendor" ? " and the vendor types" : ""}. Here you can switch one off, make it required or optional, and rename it. To ask for a new document, add an extra field of type “file” on this step.</p>
                <div className="adm-table ob82-ft"><table><thead><tr><th>Document</th><th>Ask for it</th><th>Required</th><th>Name on the form</th><th>Hint</th></tr></thead><tbody>
                  {cat.docs.map((d) => { const o = doc(d.id); return (
                    <tr key={d.id} className={"ob82-noclick" + (o.hidden ? " is-off" : "")}>
                      <td><b>{d.label}</b><small className="ob82-sub"><code>{d.id}</code></small></td>
                      <td><input type="checkbox" disabled={!ed} checked={!o.hidden} onChange={(e) => setD(d.id, "hidden", e.target.checked ? undefined : true)} /></td>
                      <td><select className="adm-in adm-in--auto" disabled={!ed} value={o.required === true ? "yes" : o.required === false ? "no" : ""} onChange={(e) => setD(d.id, "required", e.target.value === "yes" ? true : e.target.value === "no" ? false : undefined)}>{REQ.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></td>
                      <td><input className="adm-in" disabled={!ed} placeholder="as built" value={o.label || ""} onChange={(e) => setD(d.id, "label", e.target.value)} /></td>
                      <td><input className="adm-in" disabled={!ed} placeholder="as built" value={o.hint || ""} onChange={(e) => setD(d.id, "hint", e.target.value)} /></td>
                    </tr>); })}
                </tbody></table></div>
              </>
            )}
          </AdmCard>
        );
      })}
      {dirty && ed && <div className="ob82-float"><span>Form changes not saved</span><AdmBtn kind="primary" onClick={save} disabled={busy}>Save the form</AdmBtn></div>}
    </div>
  );
}

/* ================================================================== connect */
function Connect({ kind }) {
  const origin = typeof location !== "undefined" && /^https?:/.test(location.origin) ? location.origin : "https://www.frequentresearch.com";
  const portal = kind === "vendor" ? "onboarding-portals/vendor (vendors.frequentresearch.com)" : "onboarding-portals/client (newclient.frequentresearch.com)";
  return (
    <div className="adm-panel ob82-connect">
      <h2>How the {WHO[kind]} portal sends its submissions here</h2>
      <ol>
        <li>Make a long random secret (for example <code>openssl rand -hex 32</code>) and save it as <b>ONBOARDING_SECRET</b> in System › Connections & keys (group “Onboarding portals”). Both portals may use the same secret.</li>
        <li>In the portal backend's <code>.env</code> ({portal}) set:
          <pre>{`WEBSITE_API=${origin}/api/v1\nWEBSITE_SECRET=<the same secret>`}</pre>
          and restart it. SampBidx forwarding keeps working as before (SAMPBIDX_URL / SAMPBIDX_SECRET stay as they are).</li>
        <li>Every completed form now arrives here within seconds, with its signed {kind === "vendor" ? "agreements" : "MSAs"} and documents. If the website is down, the portal keeps it and tries again (backend <code>GET /api/admin/website-queue</code>).</li>
        <li>The portal reads the form set-up (Form fields) from <code>{origin}/api/v1/onboarding/form/{kind}</code> through its own backend, and keeps the last copy if the website cannot be reached.</li>
        <li>Older submissions: on the portal server run <code>npm run cli -- send-website --all</code> to send every stored submission here once (the same reference is never stored twice).</li>
      </ol>
      <p className="adm-muted">Full steps: docs/go-live/16-ONBOARDING-PORTALS.md.</p>
    </div>
  );
}

export { Onboarding as AdmOnboarding };
