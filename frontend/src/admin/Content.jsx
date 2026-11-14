/*
 * Super admin panel: the website's content. Every editor opens with what the site shows today (the built-in content
 * plus earlier admin changes), so nothing starts blank; "Save" publishes, "Undo my changes" goes back to the code's
 * content. Lists (team, testimonials, blog posts …) save only what changed, item by item (see app/cms.jsx cmsList).
 */
import * as ee from 'react';
import { CMS_DEFAULTS, CMS_IDS } from '../app/cms.jsx';
import { useAdmImportTarget } from './Import.jsx';
import { admApi, admClone, admDel, admGet, admPut, admSame, admWhen } from './api.jsx';
import { AdmBtn, AdmCard, AdmField, AdmStatus, AdmUploadBtn, AdmValue, admIsObj, admTitleOf, blankLike } from './Fields.jsx';

const isObj = admIsObj;
const merge = (a, b) => { if (!isObj(a) || !isObj(b)) return b; const o = { ...a }; for (const k of Object.keys(b)) o[k] = isObj(a[k]) && isObj(b[k]) ? merge(a[k], b[k]) : b[k]; return o; };
// the changed parts of b compared with a (objects: field by field; anything else: whole value)
const diff = (a, b) => { if (!isObj(a) || !isObj(b)) return admSame(a, b) ? undefined : b; const o = {}; for (const k of Object.keys(b)) { const d = diff(a[k], b[k]); if (d !== undefined) o[k] = d; } return Object.keys(o).length ? o : undefined; };

function SaveBar({ dirty, onSave, onReset, onUndo, msg, note }) {
  return (
    <div className="adm-save">
      <AdmBtn kind="primary" onClick={onSave} disabled={!dirty}>Save and publish</AdmBtn>
      {onReset && <AdmBtn onClick={onReset} disabled={!dirty}>Discard edits</AdmBtn>}
      {onUndo && <AdmBtn kind="ghost" onClick={onUndo}>Back to the original content</AdmBtn>}
      <AdmStatus s={msg} />
      {note && <small className="adm-muted">{note}</small>}
    </div>
  );
}

/* ---------------------------------------------------------------- one object (contact, careers, A&F services) */
function ObjectEditor({ ckey, title, intro, folder = "misc", base }) {
  const def = base !== undefined ? base : CMS_DEFAULTS[ckey];
  const [saved, setSaved] = ee.useState(undefined);
  const [val, setVal] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const load = async () => { const o = await admGet(ckey); setSaved(o); setVal(admClone(o === undefined ? def : merge(def, o))); };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, [ckey]);
  // build 78.4: Import from a file (JSON object, or the first row of a sheet) fills the fields; Save makes it live
  useAdmImportTarget(val ? { label: title, folder, object: true, replace: false, sample: isObj(val) ? Object.fromEntries(Object.entries(val).filter(([, x]) => !isObj(x))) : {}, verb: "Fill in the fields",
    apply: (items) => { const o = items[0]; if (!isObj(o)) throw new Error("Nothing to put in."); setVal((v) => merge(v, o)); return { message: "Fields filled in. Check them, then press Save." }; } } : null, [ckey, !!val]);
  if (!val) return <section className="adm-sec"><h1>{title}</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const cur = saved === undefined ? def : merge(def, saved);
  const save = async () => { try { await admPut(ckey, diff(def, val) || {}); setMsg({ ok: "Saved. The website shows it on the next page load." }); await load(); } catch (e) { setMsg({ err: e.message }); } };
  const undo = async () => { if (!confirm("Remove every change to " + title + " and show the original content again?")) return; await admDel(ckey); setMsg({ ok: "Back to the original content." }); await load(); };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>{title}</h1></header>
      {intro && <p className="adm-muted">{intro}</p>}
      <div className="adm-panel"><AdmValue value={val} onChange={setVal} folder={folder} /></div>
      <SaveBar dirty={!admSame(val, cur)} onSave={save} onReset={() => setVal(admClone(cur))} onUndo={saved !== undefined ? undo : null} msg={msg} />
    </section>
  );
}

/* ---------------------------------------------------------------- lists: team, testimonials, blog posts … */
function ListEditor({ ckey, title, intro, folder = "misc", photos }) {
  const def = CMS_DEFAULTS[ckey] || [];
  const idKey = CMS_IDS[ckey] || "id";
  const id = (x) => (x && x[idKey] != null ? String(x[idKey]) : "");
  const defIds = new Set(def.map(id));
  const [items, setItems] = ee.useState(null); // [{ v, hidden }]
  const [orig, setOrig] = ee.useState(null);
  const [ph, setPh] = ee.useState(null), [phOrig, setPhOrig] = ee.useState(null);
  const [q, setQ] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const load = async () => {
    const o = (await admGet(ckey)) || {};
    const hide = new Set((o.hide || []).map(String)), edit = o.edit || {};
    let list = def.map((x) => ({ v: admClone(isObj(edit[id(x)]) ? merge(x, edit[id(x)]) : x), hidden: hide.has(id(x)) }));
    list = list.concat((o.add || []).filter(isObj).map((x) => ({ v: admClone(x), hidden: hide.has(id(x)), added: true })));
    if (Array.isArray(o.order) && o.order.length) { const pos = new Map(o.order.map((k, i) => [String(k), i])); list = list.map((x, i) => [x, pos.has(id(x.v)) ? pos.get(id(x.v)) : 1e6 + i]).sort((a, b) => a[1] - b[1]).map((x) => x[0]); }
    setItems(list); setOrig(admClone(list));
    if (photos) { const p = merge(CMS_DEFAULTS[photos] || {}, (await admGet(photos)) || {}); setPh(p); setPhOrig(admClone(p)); }
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, [ckey]);
  // build 78.4: Import from a file: sheet rows or a Word document become new items (or replace the list); Save makes it live
  const sample = def[0] || (items && items[0] && items[0].v) || { [idKey]: "", title: "", description: "" };
  useAdmImportTarget(items ? { label: title, folder, sample, blank: () => blankLike(sample),
    apply: (rows, mode) => {
      const slug = (s) => String(s || "").toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60);
      const fresh = rows.filter(isObj).map((v, i) => { v = { ...v }; if (!v[idKey]) v[idKey] = idKey === "name" ? v.title || "Item " + (i + 1) : slug(v.title || v.name || v.heading) || "item-" + Date.now().toString(36) + i; return { v, hidden: false, added: true }; });
      if (!fresh.length) throw new Error("No rows to add.");
      setItems((cur) => {
        const have = new Set(cur.map((x) => id(x.v)));
        const add = fresh.map((x) => (have.has(id(x.v)) ? { ...x, v: { ...x.v, [idKey]: id(x.v) + "-" + Date.now().toString(36).slice(-3) } } : x));
        return mode === "replace" ? [...add, ...cur.filter((x) => !x.added).map((x) => ({ ...x, hidden: true }))] : [...add, ...cur];
      });
      return { message: `${fresh.length} item${fresh.length === 1 ? "" : "s"} added at the top${mode === "replace" ? " (the old ones are hidden)" : ""}. Check them, then press Save.` };
    } } : null, [ckey, !!items]);
  if (!items) return <section className="adm-sec"><h1>{title}</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const upd = (i, patch) => setItems(items.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const move = (i, d) => { const n = [...items]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; setItems(n); };
  const add = () => {
    const name = prompt("Name or title of the new item:");
    if (!name) return;
    const v = blankLike(def[0] || {});
    const slug = name.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 60) || "item-" + Date.now();
    v[idKey] = idKey === "name" ? name : slug;
    if ("name" in v && idKey !== "name") v.name = name;
    if ("title" in v) v.title = name;
    setItems([{ v, hidden: false, added: true, open: true }, ...items]);
  };
  const save = async () => {
    const edit = {}, addL = [], hide = [];
    const dmap = new Map(def.map((x) => [id(x), x]));
    for (const it of items) {
      const k = id(it.v);
      // build 78: a hidden item the admin added (e.g. an AI draft) is kept, hidden, instead of being dropped
      if (it.hidden) { if (dmap.has(k) || it.added) hide.push(k); if (it.added && !dmap.has(k)) addL.push(it.v); continue; }
      if (dmap.has(k) && !it.added) { const d = diff(dmap.get(k), it.v); if (d) edit[k] = d; }
      else addL.push(it.v);
    }
    const ids = items.filter((x) => !x.hidden).map((x) => id(x.v));
    const natural = [...def.map(id).filter((k) => ids.includes(k)), ...addL.map(id).filter((k) => ids.includes(k))];
    const data = { edit, add: addL, hide };
    if (!admSame(ids, natural)) data.order = ids;
    try {
      await admPut(ckey, data);
      if (photos && !admSame(ph, phOrig)) await admPut(photos, diff(CMS_DEFAULTS[photos] || {}, ph) || {});
      setMsg({ ok: "Saved. The website shows it on the next page load." }); await load();
    } catch (e) { setMsg({ err: e.message }); }
  };
  const undo = async () => { if (!confirm("Remove every change to " + title + " and show the original list again?")) return; await admDel(ckey); if (photos) await admDel(photos); setMsg({ ok: "Back to the original list." }); await load(); };
  const shown = items.map((x, i) => [x, i]).filter(([x]) => !q || JSON.stringify(x.v).toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>{title}</h1><AdmBtn kind="primary" onClick={add}>+ Add new</AdmBtn></header>
      {intro && <p className="adm-muted">{intro}</p>}
      <div className="adm-filters"><input className="adm-in" placeholder={"Search " + items.length + " items…"} value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="adm-items">
        {shown.map(([x, i]) => (
          <AdmCard key={id(x.v) + ":" + i} open={!!x.open} cls={x.hidden ? "is-hidden" : ""}
            title={admTitleOf(x.v, i)} sub={(x.hidden ? "Hidden · " : "") + (x.added ? "Added by admin" : defIds.has(id(x.v)) ? "" : "")}
            actions={<>
              <AdmBtn small kind="ghost" title="Move up" onClick={() => move(i, -1)}>↑</AdmBtn>
              <AdmBtn small kind="ghost" title="Move down" onClick={() => move(i, 1)}>↓</AdmBtn>
              <AdmBtn small onClick={() => upd(i, { hidden: !x.hidden })}>{x.hidden ? "Show" : "Hide"}</AdmBtn>
              {x.added && <AdmBtn small kind="danger" onClick={() => setItems(items.filter((_, j) => j !== i))}>Delete</AdmBtn>}
            </>}>
            {photos && ph && <AdmField label="Photo"><AdmValue k="photo" value={ph[id(x.v)] || ""} folder={folder} onChange={(u) => setPh({ ...ph, [id(x.v)]: u })} /></AdmField>}
            <AdmValue value={x.v} folder={folder} onChange={(v) => upd(i, { v })} />
          </AdmCard>
        ))}
      </div>
      <SaveBar dirty={!admSame(items.map(({ v, hidden }) => [v, hidden]), (orig || []).map(({ v, hidden }) => [v, hidden])) || (photos && !admSame(ph, phOrig))} onSave={save} onReset={() => { setItems(admClone(orig)); setPh(admClone(phOrig)); }} onUndo={undo} msg={msg} />
    </section>
  );
}

/* ---------------------------------------------------------------- site settings */
const SWITCHES = [
  ["whatsapp.show", "WhatsApp button (bottom right)"],
  ["chat.show", "Chat assistant button (bottom right)"],
  ["chat.live", "Live chat: visitors can ask for a specialist and you answer in Admin › Live chat"],
  ["reviewsButton.show", "Rate & review button (bottom right)"],
  ["videosButton.show", "Videos button (bottom left)"],
  ["celebrations.show", "Celebration banner on the home page"],
];
const getp = (o, p) => p.split(".").reduce((a, k) => (a && typeof a === "object" ? a[k] : undefined), o);
const setp = (o, p, v) => { const n = admClone(o || {}); const ks = p.split("."); let a = n; ks.slice(0, -1).forEach((k) => { a[k] = isObj(a[k]) ? a[k] : {}; a = a[k]; }); a[ks[ks.length - 1]] = v; return n; };

function Settings() {
  const [s, setS] = ee.useState(null), [s0, setS0] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const load = async () => { const v = (await admGet("settings")) || {}; setS(v); setS0(admClone(v)); };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);
  if (!s) return <section className="adm-sec"><h1>Site settings</h1><p className="adm-muted">Loading…</p></section>;
  const save = async () => { try { await admPut("settings", s); setMsg({ ok: "Saved." }); await load(); } catch (e) { setMsg({ err: e.message }); } };
  const txt = (p, l, help, ph) => <AdmField label={l} help={help}><textarea className="adm-in adm-ta" rows={3} value={getp(s, p) || ""} placeholder={ph} onChange={(e) => setS(setp(s, p, e.target.value))} /></AdmField>;
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Site settings</h1></header>
      <div className="adm-panel"><h2>Show or hide</h2>
        {SWITCHES.map(([p, l]) => <label className="adm-sw adm-sw--row" key={p}><input type="checkbox" checked={getp(s, p) !== false} onChange={(e) => setS(setp(s, p, e.target.checked))} /><span>{l}</span></label>)}
      </div>
      <div className="adm-panel"><h2>Chat texts</h2>
        {txt("chat.greeting", "Chat greeting (first message in the chat window)", "Empty = the built-in greeting.", "Hi there! I'm the Frequent Research assistant…")}
        {txt("chat.handoff", "Message after a visitor asks for a specialist", "{name} and {email} are filled in. Empty = the built-in message.", "Thanks, {name}! A specialist has your message…")}
      </div>
      <SaveBar dirty={!admSame(s, s0)} onSave={save} onReset={() => setS(admClone(s0))} msg={msg} note="WhatsApp number and message, email, phone and social links: Admin › Contact details." />
    </section>
  );
}

/* ---------------------------------------------------------------- panel numbers (data files) */
const PB_KINDS = [["b2c", "Consumer"], ["b2b", "Business (B2B)"], ["hcp", "Healthcare professionals"], ["caregivers", "Caregivers"], ["patients", "Patients"]];
const pbFile = (kind, slug) => `panel-books/${/^(b2c|b2b)$/.test(kind) ? kind : "hc/" + kind}/${slug}.json`;
const pbSlug = (s) => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// a panel book: the admin's copy if there is one, else the website's file
const pbRead = async (file) => { const o = await admGet("data:" + file).catch(() => undefined); if (o !== undefined && o !== null) return o; const r = await fetch("/data/" + file, { cache: "no-store" }); if (!r.ok) throw new Error("Not found: " + file); return r.json(); };
function Panels() {
  const [ix, setIx] = ee.useState(null);
  const [file, setFile] = ee.useState("panel-books/index.json");
  const [msg, setMsg] = ee.useState(null);
  const [add, setAdd] = ee.useState(null), [n, setN] = ee.useState(0);
  ee.useEffect(() => { pbRead("panel-books/index.json").then(setIx).catch((e) => setMsg({ err: e.message })); }, [n]);
  const books = ix ? Object.entries(ix).flatMap(([kind, list]) => (Array.isArray(list) ? list.map((c) => ({ kind, ...c })) : [])) : [];
  const cur = books.find((b) => pbFile(b.kind, b.slug) === file);
  const addCountry = async () => {
    try {
      const { kind, name, iso, region, from } = add;
      const slug = pbSlug(name);
      if (!slug || !/^[A-Za-z]{2}$/.test(iso || "")) throw new Error("Enter the country name and its 2-letter code (e.g. NZ).");
      if ((ix[kind] || []).some((c) => c.slug === slug)) throw new Error(name + " is already in this panel.");
      const tpl = (ix[kind] || []).find((c) => c.slug === from) || (ix[kind] || [])[0];
      if (!tpl) throw new Error("Choose a country to copy the tables from.");
      const book = admClone(await pbRead(pbFile(kind, tpl.slug)));
      Object.assign(book, { name, slug, iso: iso.toUpperCase(), region: region || tpl.region });
      const entry = { ...tpl, name, slug, iso: iso.toUpperCase(), region: region || tpl.region };
      const nix = admClone(ix); nix[kind] = [...(nix[kind] || []), entry].sort((a, b) => a.name.localeCompare(b.name));
      await admPut("data:" + pbFile(kind, slug), book);
      await admPut("data:panel-books/index.json", nix);
      setIx(nix); setAdd(null); setFile(pbFile(kind, slug));
      setMsg({ ok: name + " added with the tables of " + tpl.name + ". Now change its numbers below; it is on the website from the next page load." });
    } catch (e) { setMsg({ err: e.message }); }
  };
  const removeCountry = async () => {
    if (!cur || !confirm("Remove " + cur.name + " from the " + cur.kind.toUpperCase() + " panel? Its page and PDF disappear from the website. Its numbers are kept, so it can be added back from Earlier versions.")) return;
    try {
      const nix = admClone(ix); nix[cur.kind] = (nix[cur.kind] || []).filter((c) => c.slug !== cur.slug);
      await admPut("data:panel-books/index.json", nix);
      setIx(nix); setFile("panel-books/index.json"); setMsg({ ok: cur.name + " removed from the " + cur.kind.toUpperCase() + " panel." });
    } catch (e) { setMsg({ err: e.message }); }
  };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Panel numbers</h1><AdmBtn kind="primary" onClick={() => setAdd(add ? null : { kind: "b2c", name: "", iso: "", region: "", from: "" })}>+ Add a country</AdmBtn></header>
      <p className="adm-muted">Every panel book: consumer, business, healthcare professionals, caregivers and patients, for every country. Open a country to change its panel size, profiles, categories and percentages (every table of its page and PDF); add a country to any panel, or remove one.</p>
      {add && ix && <div className="adm-panel adm-obj">
        <div className="adm-f"><span className="adm-f__l">Panel</span><div className="adm-f__v"><select className="adm-in" value={add.kind} onChange={(e) => setAdd({ ...add, kind: e.target.value, from: "" })}>{PB_KINDS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></div></div>
        <div className="adm-f"><span className="adm-f__l">Country name</span><div className="adm-f__v"><input className="adm-in" value={add.name} onChange={(e) => setAdd({ ...add, name: e.target.value })} placeholder="New Zealand" /></div></div>
        <div className="adm-f"><span className="adm-f__l">2-letter country code (for the flag)</span><div className="adm-f__v"><input className="adm-in adm-in--num" maxLength={2} value={add.iso} onChange={(e) => setAdd({ ...add, iso: e.target.value })} placeholder="NZ" /></div></div>
        <div className="adm-f"><span className="adm-f__l">Region</span><div className="adm-f__v"><input className="adm-in" list="adm-pb-regions" value={add.region} onChange={(e) => setAdd({ ...add, region: e.target.value })} placeholder="Asia Pacific" /><datalist id="adm-pb-regions">{[...new Set(books.map((b) => b.region).filter(Boolean))].map((r) => <option key={r} value={r} />)}</datalist></div></div>
        <div className="adm-f"><span className="adm-f__l">Start from the tables of</span><div className="adm-f__v"><select className="adm-in" value={add.from} onChange={(e) => setAdd({ ...add, from: e.target.value })}><option value="">(first country)</option>{(ix[add.kind] || []).map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}</select></div></div>
        <div className="adm-row"><AdmBtn kind="primary" onClick={addCountry}>Add the country</AdmBtn><AdmBtn onClick={() => setAdd(null)}>Cancel</AdmBtn></div>
      </div>}
      <div className="adm-filters">
        <select className="adm-in" value={file} onChange={(e) => setFile(e.target.value)}>
          <option value="panel-books/index.json">All countries: panel size per country</option>
          {books.map((b) => <option key={b.kind + b.slug} value={pbFile(b.kind, b.slug)}>{b.kind.toUpperCase()} · {b.name} ({(b.panel || 0).toLocaleString()})</option>)}
        </select>
        {cur && <AdmBtn small kind="danger" onClick={removeCountry}>Remove this country</AdmBtn>}
      </div>
      <AdmStatus s={msg} />
      <DataFile key={file + n} file={file} onSaved={() => file === "panel-books/index.json" && setN((x) => x + 1)} />
    </section>
  );
}
function DataFile({ file, intro, onSaved }) {
  const key = "data:" + file;
  const [def, setDef] = ee.useState(null), [saved, setSaved] = ee.useState(undefined), [val, setVal] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const load = async () => {
    const o = await admGet(key);
    // a file made in the admin (a new country) has no website copy: its first saved version is the original
    const d = await fetch("/data/" + file, { cache: "no-store" }).then((r) => (r.ok ? r.json() : o !== undefined && o !== null ? admClone(o) : Promise.reject(new Error("This file is not on the website (" + r.status + ")."))));
    setDef(d); setSaved(o); setVal(admClone(o === undefined ? d : o));
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, [file]);
  if (!val) return <><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></>;
  const cur = saved === undefined ? def : saved;
  const save = async () => { try { await admPut(key, val); setMsg({ ok: "Saved. Pages and PDFs use the new numbers from the next page load." }); await load(); if (onSaved) onSaved(); } catch (e) { setMsg({ err: e.message }); } };
  const undo = async () => { if (!confirm("Go back to the original numbers in this file?")) return; await admDel(key); await load(); setMsg({ ok: "Back to the original." }); };
  return (
    <>
      {intro && <p className="adm-muted">{intro}</p>}
      <div className="adm-panel"><AdmValue value={val} onChange={setVal} /></div>
      <SaveBar dirty={!admSame(val, cur)} onSave={save} onReset={() => setVal(admClone(cur))} onUndo={saved !== undefined ? undo : null} msg={msg} />
    </>
  );
}

/* ---------------------------------------------------------------- celebration calendar */
function Celebrations() {
  const now = new Date().getFullYear();
  const [year, setYear] = ee.useState(now);
  const [cal, setCal] = ee.useState(null), [orig, setOrig] = ee.useState(null), [fromAdmin, setFromAdmin] = ee.useState(false);
  const [q, setQ] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const load = async () => {
    setCal(null); setMsg(null);
    const a = await admGet("celebrations:" + year);
    let c = a;
    if (!c) c = await fetch(`/data/celebrations-${year}.json`, { cache: "no-store" }).then((r) => (r.ok ? r.json() : { version: 1, timezone: "Asia/Kolkata", events: [] })).catch(() => ({ version: 1, events: [] }));
    setFromAdmin(!!a); setCal(c); setOrig(admClone(c));
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, [year]);
  const save = async () => { try { await admApi("/admin/celebrations?year=" + year, { method: "PUT", body: cal }); setMsg({ ok: "Saved: " + cal.events.length + " days in " + year + "." }); await load(); } catch (e) { setMsg({ err: e.message }); } };
  const undo = async () => { if (!confirm("Use the built-in " + year + " calendar again?")) return; await admDel("celebrations:" + year); await load(); };
  const addDay = () => setCal({ ...cal, events: [{ date: year + "-01-01", name: "New day", message: "", motif: "", flags: [], show: true }, ...cal.events] });
  const ev = cal ? cal.events.map((e, i) => [e, i]).filter(([e]) => !q || JSON.stringify(e).toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Celebration calendar</h1>
        <select className="adm-in adm-in--auto" value={year} onChange={(e) => setYear(+e.target.value)}>{[now - 1, now, now + 1, now + 2, now + 3, now + 4].map((y) => <option key={y}>{y}</option>)}</select>
        <AdmBtn kind="primary" onClick={addDay} disabled={!cal}>+ Add a day</AdmBtn>
      </header>
      <p className="adm-muted">The home-page banner shows the day's celebration. Only real dates: check each one before saving. {fromAdmin ? "This year uses your saved calendar." : "This year uses the calendar the website ships with."}</p>
      {!cal ? <p className="adm-muted">Loading…</p> : (
        <>
          <div className="adm-filters"><input className="adm-in" placeholder={"Search " + cal.events.length + " days…"} value={q} onChange={(e) => setQ(e.target.value)} />
            <label className="adm-sw"><input type="checkbox" checked={cal.enabled !== false} onChange={(e) => setCal({ ...cal, enabled: e.target.checked })} /><span>Banner on</span></label></div>
          <div className="adm-items">
            {ev.slice(0, 400).map(([e, i]) => (
              <AdmCard key={i} title={e.date + " · " + e.name} sub={e.region || ""} actions={<AdmBtn small kind="danger" onClick={() => setCal({ ...cal, events: cal.events.filter((_, j) => j !== i) })}>Remove</AdmBtn>}>
                <AdmValue value={e} onChange={(v) => setCal({ ...cal, events: cal.events.map((x, j) => (j === i ? v : x)) })} />
              </AdmCard>
            ))}
            {ev.length > 400 && <p className="adm-muted">Showing 400 of {ev.length}: search to find others.</p>}
          </div>
          <SaveBar dirty={!admSame(cal, orig)} onSave={save} onReset={() => setCal(admClone(orig))} onUndo={fromAdmin ? undo : null} msg={msg} />
        </>
      )}
    </section>
  );
}

/* ---------------------------------------------------------------- gallery */
const G_SECTIONS = [["festivals", "Festivals"], ["awards", "Awards"], ["birthdays", "Birthdays"]];
function Gallery() {
  const [g, setG] = ee.useState(null), [orig, setOrig] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const load = async () => { const j = await admApi("/gallery"); const v = { items: j.items || [] }; setG(v); setOrig(admClone(v)); };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);
  if (!g) return <section className="adm-sec"><h1>Gallery</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const add = (section, type, url = "") => setG({ items: [{ id: "g" + Date.now().toString(36), section, type, url, thumb: "", title: "", caption: "", album: "", person: "", date: new Date().toISOString().slice(0, 10), featured: false, show: true }, ...g.items] });
  const save = async () => {
    const items = g.items.map((x) => { const o = {}; for (const [k, v] of Object.entries(x)) if (v !== "" && v != null) o[k] = v; return o; });
    try { await admApi("/admin/gallery", { method: "PUT", body: { items } }); setMsg({ ok: "Saved: " + items.length + " items." }); await load(); } catch (e) { setMsg({ err: e.message }); }
  };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Gallery</h1></header>
      <p className="adm-muted">Photos and videos on the Gallery page, in three sections. Upload a photo, or paste an https:// link (a video link from YouTube or a direct .mp4).</p>
      <div className="adm-row">
        {G_SECTIONS.map(([k, l]) => <span key={k} className="adm-row">
          <AdmUploadBtn folder="gallery" onDone={(u) => add(k, "photo", u)}>+ {l} photo</AdmUploadBtn>
          <AdmBtn small onClick={() => add(k, "video")}>+ {l} video</AdmBtn>
        </span>)}
      </div>
      {G_SECTIONS.map(([k, l]) => (
        <div className="adm-panel" key={k}><h2>{l} ({g.items.filter((x) => x.section === k).length})</h2>
          <div className="adm-items">
            {g.items.map((x, i) => [x, i]).filter(([x]) => x.section === k).map(([x, i]) => (
              <AdmCard key={x.id || i} title={x.title || x.caption || x.url || "New item"} sub={x.type + (x.show === false ? " · hidden" : "")} actions={<AdmBtn small kind="danger" onClick={() => setG({ items: g.items.filter((_, j) => j !== i) })}>Remove</AdmBtn>}>
                <AdmValue value={x} folder="gallery" onChange={(v) => setG({ items: g.items.map((y, j) => (j === i ? v : y)) })} />
              </AdmCard>
            ))}
          </div>
        </div>
      ))}
      <SaveBar dirty={!admSame(g, orig)} onSave={save} onReset={() => setG(admClone(orig))} msg={msg} />
    </section>
  );
}

/* ---------------------------------------------------------------- PDFs */
function Pdfs() {
  const [map, setMap] = ee.useState(null), [orig, setOrig] = ee.useState(null);
  const [names, setNames] = ee.useState([]);
  const [msg, setMsg] = ee.useState(null);
  const load = async () => { const m = (await admGet("pdfs")) || {}; setMap(m); setOrig(admClone(m)); };
  ee.useEffect(() => {
    load().catch((e) => setMsg({ err: e.message }));
    // names visitors downloaded (from the download forms), to pick from
    admApi("/admin/leads?limit=500").then((j) => setNames([...new Set(j.leads.map((l) => l.resource || l.title).filter(Boolean))].sort())).catch(() => {});
  }, []);
  if (!map) return <section className="adm-sec"><h1>PDF documents</h1><p className="adm-muted">Loading…</p></section>;
  const rows = Object.entries(map);
  const save = async () => { try { await admPut("pdfs", map); setMsg({ ok: "Saved." }); await load(); } catch (e) { setMsg({ err: e.message }); } };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>PDF documents</h1></header>
      <p className="adm-muted">Every PDF on the website (brochures, panel books, case studies, quality documents) is made from the website's content, so changes to that content show in the PDFs too. To use your own file for a download instead, add its file name (as visitors receive it, e.g. "Frequent Research - India Consumer Panel Book.pdf") and upload the PDF.</p>
      <datalist id="adm-pdf-names">{names.map((n) => <option key={n} value={n} />)}</datalist>
      <div className="adm-panel">
        {rows.map(([n, u], i) => (
          <div className="adm-row adm-pdfrow" key={i}>
            <input className="adm-in" list="adm-pdf-names" value={n} onChange={(e) => { const m = {}; rows.forEach(([a, b], j) => { m[j === i ? e.target.value : a] = b; }); setMap(m); }} placeholder="File name.pdf" />
            {u ? <a href={u} target="_blank" rel="noreferrer">Open PDF</a> : <em>No file yet</em>}
            <AdmUploadBtn accept="application/pdf" folder="pdfs" onDone={(url) => setMap({ ...map, [n]: url })}>{u ? "Replace file" : "Upload PDF"}</AdmUploadBtn>
            <AdmBtn small kind="danger" onClick={() => { const m = { ...map }; delete m[n]; setMap(m); }}>Remove</AdmBtn>
          </div>
        ))}
        <AdmBtn onClick={() => setMap({ ...map, ["New document " + (rows.length + 1) + ".pdf"]: "" })}>+ Add a PDF</AdmBtn>
      </div>
      <SaveBar dirty={!admSame(map, orig)} onSave={save} onReset={() => setMap(admClone(orig))} msg={msg} />
    </section>
  );
}

export { Celebrations as AdmCelebrations, DataFile as AdmDataFile, Gallery as AdmGallery, ListEditor as AdmListEditor, ObjectEditor as AdmObjectEditor, Panels as AdmPanels, Pdfs as AdmPdfs, Settings as AdmSettings };
