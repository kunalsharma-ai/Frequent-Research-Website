/*
 * Super admin › Pages › Page video component (build 82.4 "Video web component", renamed in build 82.5, Kunal 13 Nov).
 * Every page of the website with its video (URL, title, description, template, icon, poster, on/off, custom fields)
 * and, new in 82.5, the page's OWN video template: a design made for that page (layout, animated scene, 3D object,
 * colours, icons, flags and the page's words) that the ready-made player draws. Backend: routes/pageVideos.js.
 * The website shows it with one line: <script src="/api/v1/page-videos/player.js" defer></script><fr-page-video></fr-page-video>
 * Developer guide: docs/go-live/19-PAGE-VIDEO-COMPONENT.md. pagevideo-player.js is a copy of
 * backend/src/public/fr-page-video.js (the same file; the backend test checks they match).
 */
import * as ee from 'react';
import { admApi, admCan, admDownload, admMe } from './api.jsx';
import { AdmBtn, AdmField, AdmStatus } from './Fields.jsx';
import './pagevideo-player.js';

const PER = 50;
const FIELD_TYPES = [["text", "Short text"], ["textarea", "Long text"], ["url", "Link"], ["image", "Picture link"], ["number", "Number"], ["select", "Choice list"], ["toggle", "Yes / no"], ["date", "Date"], ["color", "Colour"]];
const ytId = (u) => { const m = /(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/.exec(u || ""); return m ? m[1] : ""; };
const enc = encodeURIComponent;

// a small CSV reader (quotes, commas and new lines inside quotes)
function parseCsv(text) {
  const rows = []; let row = [], cell = "", q = false;
  const s = String(text || "").replace(/^﻿/, "");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q) { if (c === '"') { if (s[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += c; continue; }
    if (c === '"') q = true; else if (c === ",") { row.push(cell); cell = ""; } else if (c === "\n" || c === "\r") { if (c === "\r" && s[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; } else cell += c;
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  const head = (rows.shift() || []).map((h) => h.trim());
  return rows.filter((r) => r.some((x) => x.trim() !== "")).map((r) => Object.fromEntries(head.map((h, i) => [h, (r[i] || "").trim()])));
}

const CSS = `
.wv{--wv-b:rgba(47,107,255,.16)}
.wv-stats{display:flex;flex-wrap:wrap;gap:10px;margin:0 0 16px}
.wv-stat{flex:1 1 150px;padding:14px 16px;border-radius:14px;background:var(--adm-card,#fff);border:1px solid var(--wv-b)}
.wv-stat b{display:block;font-size:1.5rem;line-height:1.1}
.wv-stat span{font-size:.82rem;opacity:.75}
.wv-tabs{display:flex;gap:6px;flex-wrap:wrap;margin:0 0 16px;border-bottom:1px solid var(--wv-b)}
.wv-tabs button{border:0;background:none;padding:10px 14px;font:inherit;font-weight:600;cursor:pointer;border-bottom:3px solid transparent;color:inherit;opacity:.7}
.wv-tabs button[aria-selected=true]{opacity:1;border-bottom-color:currentColor}
.wv-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 12px}
.wv-bar .adm-in{flex:1 1 220px;min-width:0}
.wv-row td{vertical-align:top}
.wv-row.is-open td{background:rgba(47,107,255,.06)}
.wv-path{font-family:ui-monospace,Menlo,monospace;font-size:.85rem;word-break:break-all}
.wv-muted{opacity:.65;font-size:.82rem}
.wv-pill{display:inline-block;padding:2px 9px;border-radius:999px;font-size:.75rem;font-weight:700;background:rgba(16,185,129,.14);color:#047857}
.wv-pill.is-off{background:rgba(148,163,184,.2);color:inherit}
.wv-pill.is-none{background:none;border:1px dashed rgba(148,163,184,.6);color:inherit;opacity:.7}
.wv-ed{display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,420px);gap:18px;padding:14px 4px}
.wv-ed__grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:4px 14px}
.wv-ed__pv{border-radius:12px;overflow:hidden;background:#0b1437;aspect-ratio:16/9;display:grid;place-items:center;color:#fff;font-size:.85rem}
.wv-ed__pv img{width:100%;height:100%;object-fit:cover}
.wv-ed h4{margin:14px 0 6px;font-size:.95rem}
.wv-pager{display:flex;gap:8px;align-items:center;justify-content:flex-end;margin:10px 0}
.wv-list{display:grid;gap:8px}
.wv-li{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr)) auto;gap:8px;align-items:end;padding:10px;border-radius:12px;border:1px solid var(--wv-b)}
.wv-code{position:relative;margin:8px 0 16px}
.wv-code pre{margin:0;padding:14px 16px;border-radius:12px;background:#0b1437;color:#e2e8f0;font-size:.8rem;line-height:1.55;overflow:auto;white-space:pre}
.wv-code .adm-btn{position:absolute;top:8px;right:8px}
.wv-ep td:first-child{white-space:nowrap;font-weight:700}
.wv-pvbox{position:relative;overflow:hidden;border-radius:14px}
.wv-pvbox > div{position:absolute;left:0;top:0}
.wv-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.wv-card{border:1px solid var(--wv-b);border-radius:16px;padding:8px;background:var(--adm-card,#fff);cursor:pointer;text-align:left;font:inherit;color:inherit;content-visibility:auto;contain-intrinsic-size:300px 260px}
.wv-card:hover,.wv-card:focus-visible{border-color:#2F6BFF;box-shadow:0 8px 24px -12px rgba(47,107,255,.6)}
.wv-card h5{margin:8px 4px 2px;font-size:.9rem;line-height:1.3}
.wv-card .wv-muted{margin:0 4px}
.wv-tags{display:flex;flex-wrap:wrap;gap:4px;margin:6px 4px 2px}
.wv-tags span{font-size:.7rem;padding:2px 7px;border-radius:999px;background:rgba(47,107,255,.1)}
.wv-te{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(320px,1fr);gap:20px;align-items:start;padding:14px;border:1px solid var(--wv-b);border-radius:16px;margin:0 0 18px;background:var(--adm-card,#fff)}
.wv-te__pv{position:sticky;top:12px;display:grid;gap:10px}
.wv-phone{width:300px;max-width:100%;margin:0 auto;border:8px solid #111827;border-radius:30px;overflow:hidden;background:#f1f5f9}
.wv-cols{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:4px 12px}
.wv-icons{display:flex;flex-wrap:wrap;gap:6px;max-height:190px;overflow:auto;padding:4px;border:1px solid var(--wv-b);border-radius:10px}
.wv-icons button{width:38px;height:38px;border-radius:10px;border:1px solid var(--wv-b);background:none;display:grid;place-items:center;cursor:pointer;color:inherit}
.wv-icons button[aria-pressed=true]{background:#2F6BFF;color:#fff;border-color:#2F6BFF}
.wv-icons svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.wv-check{display:flex;align-items:center;gap:8px;margin:6px 0 10px;font-size:.9rem}
.wv-warn{padding:8px 12px;border-radius:10px;background:rgba(245,158,11,.14);font-size:.85rem}
@media (max-width:1100px){.wv-te{grid-template-columns:1fr}.wv-te__pv{position:static}}
@media (max-width:900px){.wv-ed{grid-template-columns:1fr}}
`;

function Copy({ text }) {
  const [ok, set] = ee.useState(false);
  return <AdmBtn small onClick={() => { try { navigator.clipboard.writeText(text); set(true); setTimeout(() => set(false), 1500); } catch (e) { /* no clipboard */ } }}>{ok ? "Copied" : "Copy"}</AdmBtn>;
}
function Code({ children }) { return <div className="wv-code"><pre>{children}</pre><Copy text={children} /></div>; }

function FieldInput({ f, value, onChange }) {
  const v = value === undefined || value === null ? "" : value;
  if (f.type === "textarea") return <textarea className="adm-in" rows={3} value={v} onChange={(e) => onChange(e.target.value)} />;
  if (f.type === "toggle") return <select className="adm-in" value={v === true || v === "true" ? "true" : v === false || v === "false" ? "false" : ""} onChange={(e) => onChange(e.target.value === "" ? "" : e.target.value === "true")}><option value="">(not set)</option><option value="true">Yes</option><option value="false">No</option></select>;
  if (f.type === "select") return <select className="adm-in" value={v} onChange={(e) => onChange(e.target.value)}><option value="">(not set)</option>{(f.options || []).map((o) => <option key={o} value={o}>{o}</option>)}</select>;
  const type = { number: "number", date: "date", color: "color", url: "url", image: "url" }[f.type] || "text";
  return <input className="adm-in" type={type} value={v} placeholder={f.type === "url" || f.type === "image" ? "https://" : ""} onChange={(e) => onChange(f.type === "number" ? (e.target.value === "" ? "" : Number(e.target.value)) : e.target.value)} />;
}

function Editor({ row, settings, canEdit, canDelete, onSaved, onTemplate }) {
  const [tpl, setTpl] = ee.useState(null);
  ee.useEffect(() => { admApi("/admin/page-videos/templates/item?path=" + enc(row.path)).then((r) => setTpl(r.template)).catch(() => {}); }, [row.path]);
  const blank = { url: "", title: "", description: "", template: "page", icon: (settings.icons[0] || {}).id || "", poster: "" };
  const [v, setV] = ee.useState({ ...blank, ...(row.video || {}) });
  const [custom, setCustom] = ee.useState({ ...(row.custom || {}) });
  const [on, setOn] = ee.useState(row.video ? !!row.enabled : true);
  const [st, setSt] = ee.useState(null);
  const [busy, setBusy] = ee.useState(false);
  const up = (k, x) => setV((o) => ({ ...o, [k]: x }));
  const save = async () => {
    setBusy(true); setSt(null);
    try { await admApi("/admin/page-videos/item?path=" + enc(row.path), { method: "PUT", body: { video: v, custom, enabled: on } }); setSt({ ok: "Saved. The website shows it within a minute." }); onSaved(); }
    catch (e) { setSt({ err: e.message }); } finally { setBusy(false); }
  };
  const remove = async () => {
    if (!window.confirm("Remove the video of " + row.path + "? The page stays in the list.")) return;
    setBusy(true);
    try { await admApi("/admin/page-videos/item?path=" + enc(row.path), { method: "DELETE" }); setSt({ ok: "Video removed." }); onSaved(); }
    catch (e) { setSt({ err: e.message }); } finally { setBusy(false); }
  };
  const yt = ytId(v.url);
  const iconIsUrl = /^(https?:\/\/|\/)/.test(v.icon || "");
  return (
    <div className="wv-ed">
      <div>
        <div className="wv-ed__grid">
          <AdmField label="Page URL" help="The page the video is shown on."><input className="adm-in" value={row.path} readOnly /></AdmField>
          <AdmField label="Video URL" help="YouTube, Vimeo or any https:// video link (or an uploaded file)."><input className="adm-in" value={v.url} placeholder="https://youtu.be/…" onChange={(e) => up("url", e.target.value.trim())} disabled={!canEdit} /></AdmField>
          <AdmField label="Video title"><input className="adm-in" value={v.title} onChange={(e) => up("title", e.target.value)} disabled={!canEdit} /></AdmField>
          <AdmField label="Video template" help="“This page's own design” is drawn by the ready-made player. The other ids are for your developers' own component.">
            <select className="adm-in" value={v.template} onChange={(e) => up("template", e.target.value)} disabled={!canEdit}>{settings.templates.map((t) => <option key={t.id} value={t.id}>{t.label} ({t.id})</option>)}</select>
          </AdmField>
          <AdmField label="Video icon" help="Pick one, or choose “Own picture link” and paste an https:// address.">
            <select className="adm-in" value={iconIsUrl ? "__url" : v.icon || ""} onChange={(e) => up("icon", e.target.value === "__url" ? "https://" : e.target.value)} disabled={!canEdit}>
              <option value="">(no icon)</option>{settings.icons.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}<option value="__url">Own picture link…</option>
            </select>
            {iconIsUrl ? <input className="adm-in" value={v.icon} onChange={(e) => up("icon", e.target.value.trim())} disabled={!canEdit} /> : null}
          </AdmField>
          <AdmField label="Poster picture (optional)" help="Shown before the video plays."><input className="adm-in" value={v.poster || ""} placeholder="https://" onChange={(e) => up("poster", e.target.value.trim())} disabled={!canEdit} /></AdmField>
          <AdmField label="Show on the website">
            <select className="adm-in" value={on ? "1" : "0"} onChange={(e) => setOn(e.target.value === "1")} disabled={!canEdit}><option value="1">Yes, published</option><option value="0">No, hidden</option></select>
          </AdmField>
        </div>
        <AdmField label="Video description"><textarea className="adm-in" rows={3} value={v.description} onChange={(e) => up("description", e.target.value)} disabled={!canEdit} /></AdmField>
        {settings.fields.length ? <h4>Custom fields</h4> : <p className="wv-muted">Need more details for the video? Add custom fields in the “Generic templates, icons & custom fields” tab.</p>}
        <div className="wv-ed__grid">
          {settings.fields.map((f) => (
            <AdmField key={f.key} label={f.label + (f.required ? " *" : "")} help={(f.help ? f.help + " · " : "") + "key: " + f.key}>
              <FieldInput f={f} value={custom[f.key]} onChange={(x) => setCustom((o) => ({ ...o, [f.key]: x }))} />
            </AdmField>
          ))}
        </div>
        <div className="wv-bar" style={{ marginTop: 12 }}>
          {canEdit ? <AdmBtn kind="primary" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save"}</AdmBtn> : null}
          {canDelete && row.video ? <AdmBtn onClick={remove} disabled={busy}>Remove video</AdmBtn> : null}
          <a className="adm-btn adm-btn--sm" href={row.path} target="_blank" rel="noreferrer">Open the page ↗</a>
          <a className="adm-btn adm-btn--sm" href={"/api/v1/page-videos?page=" + enc(row.path)} target="_blank" rel="noreferrer">What the website gets ↗</a>
        </div>
        <AdmStatus s={st} />
      </div>
      <div>
        {tpl ? <Preview template={tpl} video={v.url ? { ...v, page: row.path, custom } : null} /> : <div className="wv-ed__pv"><span>Loading the design…</span></div>}
        <p className="wv-muted">How it looks on the page (this page's own design{tpl && tpl.edited ? ", changed by an admin" : ""}).</p>
        <AdmBtn small onClick={() => onTemplate(row.path)}>Change this page's design</AdmBtn>
        <p className="wv-muted">{row.pageTitle}</p>
        {row.updatedAt ? <p className="wv-muted">Last saved {new Date(row.updatedAt).toLocaleString()}{row.updatedBy && row.updatedBy.name ? " by " + row.updatedBy.name : ""}</p> : null}
      </div>
    </div>
  );
}

function PagesTab({ settings, perms, onCount, onTemplate }) {
  const [q, setQ] = ee.useState("");
  const [has, setHas] = ee.useState("");
  const [skip, setSkip] = ee.useState(0);
  const [data, setData] = ee.useState(null);
  const [open, setOpen] = ee.useState("");
  const [st, setSt] = ee.useState(null);
  const [newPath, setNewPath] = ee.useState("");
  const file = ee.useRef(null);
  const load = ee.useCallback(async () => {
    try { const d = await admApi(`/admin/page-videos?limit=${PER}&skip=${skip}&q=${enc(q)}&has=${has}`); setData(d); onCount(d); }
    catch (e) { setSt({ err: e.message }); }
  }, [q, has, skip]);
  ee.useEffect(() => { const t = setTimeout(load, q ? 250 : 0); return () => clearTimeout(t); }, [load]);
  const importFile = async (f) => {
    if (!f) return;
    try {
      const text = await f.text();
      let rows = [];
      if (/\.json$/i.test(f.name)) { const j = JSON.parse(text); rows = Array.isArray(j) ? j : j.rows || j.videos || []; }
      else rows = parseCsv(text);
      if (!rows.length) throw new Error("No rows found in the file.");
      const r = await admApi("/admin/page-videos/import", { body: { rows } });
      setSt(r.errors.length ? { err: `Saved ${r.saved} pages. ${r.errors.length} rows were skipped: ` + r.errors.slice(0, 5).map((e) => `row ${e.row}${e.path ? " (" + e.path + ")" : ""}: ${e.error}`).join("; ") } : { ok: `Saved ${r.saved} pages.` });
      load();
    } catch (e) { setSt({ err: e.message }); }
    if (file.current) file.current.value = "";
  };
  const addPage = async () => {
    const p = newPath.trim(); if (!p) return;
    try { const r = await admApi("/admin/page-videos/pages", { body: { pages: [{ path: p }] } }); setSt({ ok: r.added ? "Page added to the list." : "That page is already in the list." }); setNewPath(""); setQ(p.replace(/^https?:\/\/[^/]+/, "")); }
    catch (e) { setSt({ err: e.message }); }
  };
  const rows = (data && data.rows) || [];
  return (
    <div>
      <div className="wv-bar">
        <input className="adm-in" type="search" placeholder="Search page URL, page name or video…" value={q} onChange={(e) => { setQ(e.target.value); setSkip(0); }} aria-label="Search pages" />
        <select className="adm-in" style={{ flex: "0 0 auto", width: "auto" }} value={has} onChange={(e) => { setHas(e.target.value); setSkip(0); }} aria-label="Filter">
          <option value="">All pages</option><option value="with">With a video</option><option value="without">Without a video</option>
        </select>
        <AdmBtn small onClick={() => admDownload("/admin/page-videos/export", "page-videos.csv").catch((e) => setSt({ err: e.message }))}>Export CSV</AdmBtn>
        {perms.create ? <><AdmBtn small onClick={() => file.current && file.current.click()}>Import CSV / JSON</AdmBtn><input ref={file} type="file" accept=".csv,.json,text/csv,application/json" hidden onChange={(e) => importFile(e.target.files[0])} /></> : null}
      </div>
      {perms.create ? (
        <div className="wv-bar">
          <input className="adm-in" placeholder="Add a new page URL (e.g. /new-landing-page)" value={newPath} onChange={(e) => setNewPath(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPage()} aria-label="New page URL" />
          <AdmBtn small onClick={addPage}>Add page</AdmBtn>
        </div>
      ) : null}
      <AdmStatus s={st} />
      {!data ? <p className="wv-muted">Loading the pages…</p> : (
        <>
          <p className="wv-muted">{data.total} page{data.total === 1 ? "" : "s"}{q || has ? " match" : ""}. Click a page to add or change its video. Tip: Export CSV, fill the sheet, then Import it to do many pages at once.</p>
          <div className="adm-table"><table><thead><tr><th>Page URL</th><th>Video</th><th>Template</th><th>Status</th></tr></thead><tbody>
            {rows.map((r) => (
              <ee.Fragment key={r.path}>
                <tr className={"wv-row" + (open === r.path ? " is-open" : "")} onClick={() => setOpen(open === r.path ? "" : r.path)} style={{ cursor: "pointer" }}>
                  <td><div className="wv-path">{r.path}</div><div className="wv-muted">{(r.pageTitle || "").replace(/\s*\|\s*Frequent Research\s*$/, "")}{r.added ? " · added by an admin" : ""}</div></td>
                  <td>{r.video && r.video.url ? <><div>{r.video.title || "(no title)"}</div><div className="wv-muted wv-path">{r.video.url}</div></> : <span className="wv-muted">No video</span>}</td>
                  <td>{r.video ? (r.video.template === "page" ? "Page's own design" : r.video.template) : ""}</td>
                  <td>{r.video && r.video.url ? <span className={"wv-pill" + (r.enabled ? "" : " is-off")}>{r.enabled ? "Live" : "Hidden"}</span> : <span className="wv-pill is-none">Empty</span>}</td>
                </tr>
                {open === r.path ? <tr><td colSpan={4}><Editor key={r.path} row={r} settings={settings} canEdit={perms.edit} canDelete={perms.delete} onSaved={load} onTemplate={onTemplate} /></td></tr> : null}
              </ee.Fragment>
            ))}
          </tbody></table></div>
          <div className="wv-pager">
            <span className="wv-muted">{data.total ? skip + 1 : 0}–{Math.min(skip + PER, data.total)} of {data.total}</span>
            <AdmBtn small disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - PER))}>‹ Previous</AdmBtn>
            <AdmBtn small disabled={skip + PER >= data.total} onClick={() => setSkip(skip + PER)}>Next ›</AdmBtn>
          </div>
        </>
      )}
    </div>
  );
}

function ListEd({ title, help, items, setItems, cols, add }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h3 style={{ margin: "0 0 4px" }}>{title}</h3>
      <p className="wv-muted" style={{ marginTop: 0 }}>{help}</p>
      <div className="wv-list">
        {items.map((it, i) => (
          <div className="wv-li" key={i}>
            {cols.map(([k, l, render]) => <AdmField key={k} label={l}>{render ? render(it, (x) => setItems(items.map((o, j) => (j === i ? { ...o, [k]: x } : o)))) : <input className="adm-in" value={it[k] || ""} onChange={(e) => setItems(items.map((o, j) => (j === i ? { ...o, [k]: e.target.value } : o)))} />}</AdmField>)}
            <div style={{ display: "flex", gap: 4 }}>
              <AdmBtn small disabled={i === 0} onClick={() => { const a = items.slice(); [a[i - 1], a[i]] = [a[i], a[i - 1]]; setItems(a); }} aria-label="Move up">↑</AdmBtn>
              <AdmBtn small onClick={() => setItems(items.filter((_, j) => j !== i))}>Remove</AdmBtn>
            </div>
          </div>
        ))}
      </div>
      <AdmBtn small onClick={() => setItems([...items, add()])} style={{ marginTop: 8 }}>+ Add</AdmBtn>
    </div>
  );
}

function SettingsTab({ settings, perms, onSaved }) {
  const [s, setS] = ee.useState(settings);
  const [st, setSt] = ee.useState(null);
  ee.useEffect(() => setS(settings), [settings]);
  const save = async () => {
    setSt(null);
    const fields = s.fields.map((f) => ({ ...f, options: typeof f.options === "string" ? f.options.split(",").map((x) => x.trim()).filter(Boolean) : f.options || [] }));
    try { const r = await admApi("/admin/page-videos/settings", { method: "PUT", body: { settings: { ...s, fields } } }); setSt({ ok: "Saved." }); onSaved(r.settings); }
    catch (e) { setSt({ err: e.message }); }
  };
  return (
    <div>
      <ListEd title="Custom fields" help="Extra details for every page's video (a custom field ctaText changes the play button's words). The key is the name your developers read (custom.<key>): letters, numbers, - or _." items={s.fields} setItems={(fields) => setS({ ...s, fields })} add={() => ({ key: "", label: "", type: "text", options: [], required: false, help: "" })}
        cols={[["label", "Label"], ["key", "Key"], ["type", "Type", (it, set) => <select className="adm-in" value={it.type} onChange={(e) => set(e.target.value)}>{FIELD_TYPES.map(([id, l]) => <option key={id} value={id}>{l}</option>)}</select>],
          ["options", "Choices (comma separated)", (it, set) => <input className="adm-in" disabled={it.type !== "select"} value={Array.isArray(it.options) ? it.options.join(", ") : it.options || ""} onChange={(e) => set(e.target.value)} />],
          ["required", "Required", (it, set) => <select className="adm-in" value={it.required ? "1" : ""} onChange={(e) => set(!!e.target.value)}><option value="">No</option><option value="1">Yes</option></select>], ["help", "Help text"]]} />
      <ListEd title="Generic template ids" help="Only for a component your developers build themselves: the id it receives in video.template. The ready-made player always draws the page's own design (tab “Page designs”)." items={s.templates} setItems={(templates) => setS({ ...s, templates })} add={() => ({ id: "", label: "" })} cols={[["id", "Id"], ["label", "Name"]]} />
      <ListEd title="Video icons" help="Icons to choose from. Give an id your component maps to an icon, or a picture link (https://)." items={s.icons} setItems={(icons) => setS({ ...s, icons })} add={() => ({ id: "", label: "", url: "" })} cols={[["id", "Id"], ["label", "Name"], ["url", "Picture link (optional)"]]} />
      {perms.publish ? <AdmBtn kind="primary" onClick={save}>Save templates, icons & fields</AdmBtn> : <p className="wv-muted">Only admins who may publish pages can change these.</p>}
      <AdmStatus s={st} />
    </div>
  );
}

// the ready-made player, drawn at desktop size (960 px) and scaled to the space it has
function Preview({ template, video, width = 960 }) {
  const box = ee.useRef(null), host = ee.useRef(null), elRef = ee.useRef(null);
  const [w, setW] = ee.useState(0);
  const [hh, setHh] = ee.useState(0);
  ee.useEffect(() => {
    const el = document.createElement("fr-page-video");
    el.setAttribute("always", ""); el.style.margin = "0";
    host.current.appendChild(el); elRef.current = el;
    const ro = new ResizeObserver(() => { if (box.current) setW(box.current.clientWidth); if (host.current) setHh(host.current.offsetHeight); });
    ro.observe(box.current); ro.observe(host.current);
    return () => { ro.disconnect(); el.remove(); };
  }, []);
  ee.useEffect(() => { if (elRef.current && template) elRef.current.data = { ok: true, page: template.page, template, video: video && video.url ? video : null }; }, [template, video]);
  const sc = w ? Math.min(1, w / width) : 0.3;
  const h = hh || (width < 640 ? 640 : Math.round((width * 9) / 16)); // build 82.6: showcase designs are taller than 16:9
  return <div ref={box} className="wv-pvbox" style={{ height: Math.round(h * sc) + "px" }}><div ref={host} style={{ width: width + "px", transform: `scale(${sc})`, transformOrigin: "0 0" }} /></div>;
}
// phone size: the player's own one-column layout
function PhonePreview({ template, video }) {
  const host = ee.useRef(null), elRef = ee.useRef(null);
  ee.useEffect(() => { const el = document.createElement("fr-page-video"); el.setAttribute("always", ""); el.style.margin = "0"; host.current.appendChild(el); elRef.current = el; return () => el.remove(); }, []);
  ee.useEffect(() => { if (elRef.current && template) elRef.current.data = { ok: true, page: template.page, template, video: video && video.url ? video : null }; }, [template, video]);
  return <div className="wv-phone"><div ref={host} style={{ padding: 12 }} /></div>;
}

function IconPick({ value, onChange, all, disabled }) {
  const P = (window.FrPageVideo && window.FrPageVideo.icons) || {};
  const toggle = (id) => onChange(value.includes(id) ? value.filter((x) => x !== id) : value.length >= 6 ? value : [...value, id]);
  return (
    <div className="wv-icons" role="group" aria-label="Icons (up to 6)">
      {all.map((id) => (
        <button key={id} type="button" title={id} aria-label={id} aria-pressed={value.includes(id)} disabled={disabled} onClick={() => toggle(id)}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={P[id] || ""} /></svg>
        </button>
      ))}
    </div>
  );
}

const PALETTE = [["bg1", "Background 1"], ["bg2", "Background 2"], ["ink", "Headline"], ["muted", "Text"], ["accent", "Accent"], ["accent2", "Accent 2"], ["glow", "Glow"]];

function TemplateEditor({ path, perms, onClose, onSaved }) {
  const [d, setD] = ee.useState(null);
  const [t, setT] = ee.useState(null);
  const [st, setSt] = ee.useState(null);
  const [busy, setBusy] = ee.useState(false);
  const [warn, setWarn] = ee.useState("");
  const load = () => admApi("/admin/page-videos/templates/item?path=" + enc(path)).then((r) => { setD(r); setT(r.template); setWarn(r.warning || ""); }).catch((e) => setSt({ err: e.message }));
  ee.useEffect(() => { setD(null); setT(null); setSt(null); load(); }, [path]);
  if (!t) return <div className="wv-te"><p className="wv-muted">Loading the design of {path}…</p><AdmStatus s={st} /></div>;
  const o = d.options;
  const can = perms.edit;
  const up = (k, x) => setT((p) => ({ ...p, [k]: x }));
  const upPal = (k, x) => setT((p) => ({ ...p, palette: { ...p.palette, [k]: x } }));
  const sel = (k, list, label) => (
    <AdmField label={label}><select className="adm-in" value={t[k]} disabled={!can} onChange={(e) => up(k, e.target.value)}>{list.map((x) => <option key={x.id || x} value={x.id || x}>{x.label || x}</option>)}</select></AdmField>
  );
  const save = async () => {
    setBusy(true); setSt(null);
    const body = { layout: t.layout, scene: t.scene, object: t.object, motion: t.motion, palette: t.palette, name: t.name, kicker: t.kicker, headline: t.headline, subline: t.subline || "", tagline: t.tagline, points: t.points, stat: t.stat && (t.stat.value || t.stat.label) ? t.stat : null, icons: t.icons, flags: t.flags, cta: t.cta, image: t.image || "", imageAlt: t.imageAlt || "", frame: t.frame || "glass", prop: t.prop || "none", em: t.em || "", screenText: t.screenText || "", chips: (t.chips || []).filter((x) => x && x.trim()), subscribe: t.subscribe !== false, link: t.link && t.link.label && t.link.to ? t.link : null };
    try { const r = await admApi("/admin/page-videos/templates/item?path=" + enc(path), { method: "PUT", body }); setT(r.template); setWarn(r.warning || ""); setSt({ ok: "Saved. The page shows the new design within a minute." }); onSaved(); }
    catch (e) { setSt({ err: e.message }); } finally { setBusy(false); }
  };
  const reset = async () => {
    if (!window.confirm("Go back to the generated design of " + path + "? Your changes to this design are removed.")) return;
    setBusy(true);
    try { const r = await admApi("/admin/page-videos/templates/item?path=" + enc(path), { method: "DELETE" }); setT(r.template); setWarn(""); setSt({ ok: "Back to the generated design." }); onSaved(); }
    catch (e) { setSt({ err: e.message }); } finally { setBusy(false); }
  };
  return (
    <div className="wv-te">
      <div>
        <div className="wv-bar" style={{ justifyContent: "space-between" }}>
          <div><b>{d.pageTitle ? d.pageTitle.split(" | ")[0] : path}</b><div className="wv-muted wv-path">{path} · design {t.id}{t.edited ? " · changed by an admin" : " · generated for this page"}</div></div>
          <AdmBtn small onClick={onClose}>Close</AdmBtn>
        </div>
        <h4>Look</h4>
        <div className="wv-cols">
          {sel("layout", o.layouts, "Layout")}
          {/^showcase/.test(t.layout) && o.frames ? sel("frame", o.frames, "Frame around the video") : null}
          {/^showcase/.test(t.layout) && o.props ? sel("prop", o.props, "Live card beside the video") : null}
          {sel("scene", o.scenes, "Animated scene")}
          {sel("object", o.objects, "3D object")}
          {sel("motion", o.motions.map((m) => ({ id: m, label: { calm: "Calm", lively: "Lively", bold: "Bold" }[m] || m })), "Movement")}
          <AdmField label="Tone"><select className="adm-in" value={t.palette.tone} disabled={!can} onChange={(e) => upPal("tone", e.target.value)}><option value="dark">Dark</option><option value="light">Light</option></select></AdmField>
        </div>
        <h4>Colours</h4>
        <div className="wv-cols">
          {PALETTE.map(([k, l]) => <AdmField key={k} label={l}><input className="adm-in" type="color" value={t.palette[k]} disabled={!can} onChange={(e) => upPal(k, e.target.value)} /></AdmField>)}
        </div>
        {warn ? <p className="wv-warn">{warn}</p> : null}
        <h4>Words</h4>
        <div className="wv-ed__grid">
          <AdmField label="Small label above the headline"><input className="adm-in" value={t.kicker} disabled={!can} onChange={(e) => up("kicker", e.target.value)} /></AdmField>
          <AdmField label="Headline"><input className="adm-in" value={t.headline} disabled={!can} onChange={(e) => up("headline", e.target.value)} /></AdmField>
          <AdmField label="Italic second line (e.g. Get rewarded.)"><input className="adm-in" value={t.em || ""} disabled={!can} onChange={(e) => up("em", e.target.value)} /></AdmField>
          <AdmField label="Big words on the video screen" help="Empty: the start of the headline."><input className="adm-in" value={t.screenText || ""} disabled={!can} onChange={(e) => up("screenText", e.target.value)} /></AdmField>
          <AdmField label="Button words"><input className="adm-in" value={(t.link && t.link.label) || ""} placeholder="e.g. Join Turn2Opinion" disabled={!can} onChange={(e) => up("link", { label: e.target.value, to: (t.link && t.link.to) || "" })} /></AdmField>
          <AdmField label="Button link" help="A page of the site (/lets-talk) or https://…"><input className="adm-in" value={(t.link && t.link.to) || ""} placeholder="/lets-talk" disabled={!can} onChange={(e) => up("link", { label: (t.link && t.link.label) || "", to: e.target.value.trim() })} /></AdmField>
          <AdmField label="Line under the headline (older layouts)"><input className="adm-in" value={t.subline || ""} disabled={!can} onChange={(e) => up("subline", e.target.value)} /></AdmField>
          <AdmField label="Play button words"><input className="adm-in" value={t.cta} disabled={!can} onChange={(e) => up("cta", e.target.value)} /></AdmField>
          <AdmField label="Big number"><input className="adm-in" value={(t.stat && t.stat.value) || ""} placeholder="e.g. 55+" disabled={!can} onChange={(e) => up("stat", { value: e.target.value, label: (t.stat && t.stat.label) || "" })} /></AdmField>
          <AdmField label="Words beside the number"><input className="adm-in" value={(t.stat && t.stat.label) || ""} placeholder="e.g. markets" disabled={!can} onChange={(e) => up("stat", { value: (t.stat && t.stat.value) || "", label: e.target.value })} /></AdmField>
        </div>
        <AdmField label="Short description"><textarea className="adm-in" rows={2} value={t.tagline} disabled={!can} onChange={(e) => up("tagline", e.target.value)} /></AdmField>
        <AdmField label="Small tags on the video screen (one per line, up to 3)"><textarea className="adm-in" rows={2} value={(t.chips || []).join("\n")} disabled={!can} onChange={(e) => up("chips", e.target.value.split("\n").slice(0, 3))} /></AdmField>
        <label className="wv-check"><input type="checkbox" checked={t.subscribe !== false} disabled={!can} onChange={(e) => up("subscribe", e.target.checked)} /> Show the YouTube Subscribe button</label>
        <AdmField label="Steps / key points (one per line; 3 are shown)"><textarea className="adm-in" rows={3} value={(t.points || []).join("\n")} disabled={!can} onChange={(e) => up("points", e.target.value.split("\n").slice(0, 4))} /></AdmField>
        <h4>Icons (up to 6) and flags</h4>
        <IconPick value={t.icons || []} onChange={(x) => up("icons", x)} all={o.icons} disabled={!can} />
        <div className="wv-ed__grid" style={{ marginTop: 8 }}>
          <AdmField label="Country flags" help="Two-letter codes, comma separated (IN, US, GB…). Empty: no flags."><input className="adm-in" value={(t.flags || []).join(", ")} disabled={!can} onChange={(e) => up("flags", e.target.value.toUpperCase().split(/[,\s]+/).filter(Boolean))} /></AdmField>
          <AdmField label="HD picture (optional)" help="https:// link or an uploaded file (/api/v1/files/…). Empty: the YouTube picture of the video."><input className="adm-in" value={t.image || ""} placeholder="https://" disabled={!can} onChange={(e) => up("image", e.target.value.trim())} /></AdmField>
          <AdmField label="Picture description (alt text)"><input className="adm-in" value={t.imageAlt || ""} disabled={!can} onChange={(e) => up("imageAlt", e.target.value)} /></AdmField>
        </div>
        <div className="wv-bar" style={{ marginTop: 12 }}>
          {can ? <AdmBtn kind="primary" onClick={save} disabled={busy}>{busy ? "Saving…" : "Save design"}</AdmBtn> : <span className="wv-muted">You can look; changing designs needs the right to edit pages.</span>}
          {can && t.edited ? <AdmBtn onClick={reset} disabled={busy}>Back to the generated design</AdmBtn> : null}
          <a className="adm-btn adm-btn--sm" href={"/api/v1/page-videos?page=" + enc(path)} target="_blank" rel="noreferrer">What the website gets ↗</a>
        </div>
        <AdmStatus s={st} />
      </div>
      <div className="wv-te__pv">
        <Preview template={t} video={d.video} />
        <p className="wv-muted">Computer · live preview{d.video ? "" : " (no video yet: the play button is greyed out on the site until a video is added)"}</p>
        <PhonePreview template={t} video={d.video} />
        <p className="wv-muted" style={{ textAlign: "center" }}>Phone</p>
      </div>
    </div>
  );
}

function TemplatesTab({ perms, focus, setFocus }) {
  const PER_T = 24;
  const [q, setQ] = ee.useState("");
  const [f, setF] = ee.useState({ layout: "", frame: "", prop: "", scene: "", object: "", family: "", edited: "" });
  const [skip, setSkip] = ee.useState(0);
  const [data, setData] = ee.useState(null);
  const [st, setSt] = ee.useState(null);
  const load = ee.useCallback(async () => {
    const qs = Object.entries(f).filter(([, v]) => v).map(([k, v]) => `&${k}=${enc(v)}`).join("");
    try { setData(await admApi(`/admin/page-videos/templates?limit=${PER_T}&skip=${skip}&q=${enc(q)}${qs}`)); } catch (e) { setSt({ err: e.message }); }
  }, [q, f, skip]);
  ee.useEffect(() => { const t = setTimeout(load, q ? 250 : 0); return () => clearTimeout(t); }, [load]);
  const o = data && data.options;
  const FAM = [["service", "Services"], ["case", "Case studies"], ["industry", "Industries"], ["panel-book", "Panel books"], ["blog", "Blog"], ["download", "Downloads"], ["product", "Products"], ["portal", "Panels"], ["company", "Company pages"], ["trust", "Trust & privacy"], ["gov", "Government"], ["brand", "Home"]];
  const pick = (k, list, label) => <select className="adm-in" style={{ flex: "0 0 auto", width: "auto" }} aria-label={label} value={f[k]} onChange={(e) => { setF({ ...f, [k]: e.target.value }); setSkip(0); }}><option value="">{label}: all</option>{list.map((x) => <option key={x.id || x[0]} value={x.id || x[0]}>{x.label || x[1]}</option>)}</select>;
  return (
    <div>
      <p className="wv-muted">Every page has a video design of its own, made from the page itself (build 82.6: the showcase style, words beside a framed video): its words and steps, its topic's frame, live card, colours, icons, 3D object and animation, and its countries' flags. No two pages share a design. Open one to change anything; “Back to the generated design” undoes it.</p>
      {focus ? <TemplateEditor key={focus} path={focus} perms={perms} onClose={() => setFocus("")} onSaved={load} /> : null}
      <div className="wv-bar">
        <input className="adm-in" type="search" placeholder="Search page URL, headline or label…" value={q} onChange={(e) => { setQ(e.target.value); setSkip(0); }} aria-label="Search designs" />
        {pick("family", FAM, "Kind of page")}
        {o ? pick("layout", o.layouts, "Layout") : null}
        {o && o.frames ? pick("frame", o.frames, "Frame") : null}
        {o && o.props ? pick("prop", o.props, "Live card") : null}
        {o ? pick("scene", o.scenes, "Scene") : null}
        {o ? pick("object", o.objects, "3D object") : null}
        <select className="adm-in" style={{ flex: "0 0 auto", width: "auto" }} aria-label="Changed" value={f.edited} onChange={(e) => { setF({ ...f, edited: e.target.value }); setSkip(0); }}><option value="">Generated and changed</option><option value="yes">Changed by an admin</option></select>
      </div>
      <AdmStatus s={st} />
      {!data ? <p className="wv-muted">Loading the designs…</p> : (
        <>
          <p className="wv-muted">{data.total} design{data.total === 1 ? "" : "s"} · {data.edited} changed by an admin</p>
          <div className="wv-grid">
            {data.rows.map((t) => (
              <div key={t.page} className="wv-card" role="button" tabIndex={0} onClick={() => { setFocus(t.page); window.scrollTo({ top: 0, behavior: "smooth" }); }} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFocus(t.page); } }} aria-label={"Open the design of " + t.page}>
                <Preview template={t} video={null} />
                <h5>{t.headline}</h5>
                <p className="wv-muted wv-path">{t.page}</p>
                <div className="wv-tags"><span>{t.layout}</span><span>{t.scene}</span><span>{t.object}</span><span>{t.palette.tone}</span>{t.edited ? <span>changed</span> : null}</div>
              </div>
            ))}
          </div>
          <div className="wv-pager">
            <span className="wv-muted">{data.total ? skip + 1 : 0}–{Math.min(skip + PER_T, data.total)} of {data.total}</span>
            <AdmBtn small disabled={skip === 0} onClick={() => setSkip(Math.max(0, skip - PER_T))}>‹ Previous</AdmBtn>
            <AdmBtn small disabled={skip + PER_T >= data.total} onClick={() => setSkip(skip + PER_T)}>Next ›</AdmBtn>
          </div>
        </>
      )}
    </div>
  );
}

function IntegrationTab({ settings }) {
  const origin = typeof location !== "undefined" ? location.origin : "https://www.frequentresearch.com";
  const base = origin + "/api/v1";
  const [page, setPage] = ee.useState("/about-us");
  const [out, setOut] = ee.useState("");
  const tryIt = async () => { try { const r = await fetch(base + "/page-videos?page=" + enc(page)); setOut(JSON.stringify(await r.json(), null, 2)); } catch (e) { setOut(e.message); } };
  const fields = settings.fields.map((f) => `      ${JSON.stringify(f.key)}: …   // ${f.label} (${f.type})`).join("\n");
  const EP = [
    ["GET", "/page-videos/player.js", "Public. The ready-made player. Add it once; <fr-page-video> then shows the page's video in its own design."],
    ["GET", "/page-videos?page=/about-us", "Public. One page: { ok, page, video, template } (video is null when the page has none or it is hidden)."],
    ["GET", "/page-videos", "Public. Every page that has a live video: { ok, count, videos: [ … ] }."],
    ["GET", "/page-videos/templates", "Public. Every page's design (summary); ?page=/x for one design in full."],
    ["GET", "/page-videos/config", "Public. Generic template ids, icons, custom fields, layouts, scenes and 3D objects."],
    ["GET", "/admin/page-videos", "Admin. All pages with their videos (q, has=with|without, skip, limit)."],
    ["GET / PUT / DELETE", "/admin/page-videos/item?path=/about-us", "Admin. Read, save or remove one page's video."],
    ["GET", "/admin/page-videos/templates", "Admin. Every page's design (q, layout, scene, object, family, edited=yes, skip, limit)."],
    ["GET / PUT / DELETE", "/admin/page-videos/templates/item?path=/about-us", "Admin. Read or change one page's design; DELETE = back to the generated design."],
    ["POST", "/admin/page-videos/import", "Admin. Save many pages: { rows: [ { path, url, title, … } ] }."],
    ["GET", "/admin/page-videos/export", "Admin. Everything as a CSV sheet (?as=json for JSON)."],
    ["GET / PUT", "/admin/page-videos/settings", "Admin. Generic template ids, icons and custom fields."],
    ["POST", "/admin/page-videos/pages", "Admin. Add new page URLs (they get a design of their own at once)."],
  ];
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>1. Connect the website (one time, two lines)</h3>
      <p>Put these two lines on the page template where the video should appear (for example after the first section). The player shows the video of the page it is on, in that page's own design. When a page has no video yet, nothing is shown.</p>
      <Code>{`<script src="/api/v1/page-videos/player.js" defer></script>
<fr-page-video></fr-page-video>`}</Code>
      <p className="wv-muted">Other options: <code>{'<fr-page-video page="/about-us">'}</code> shows another page's video; <code>always</code> shows the design before a video is added; <code>api="https://www.frequentresearch.com/api/v1/page-videos"</code> when the script is loaded from another site. The old address <code>/api/v1/web-videos</code> still answers the same.</p>
      <h3>2. Endpoints ({base})</h3>
      <div className="adm-table wv-ep"><table><thead><tr><th>Method</th><th>Endpoint</th><th>What it does</th></tr></thead><tbody>
        {EP.map(([m, p, d]) => <tr key={m + p}><td>{m}</td><td className="wv-path">{p}</td><td>{d}</td></tr>)}
      </tbody></table></div>
      <h3>3. What the website receives</h3>
      <Code>{`GET ${base}/page-videos?page=/about-us

{
  "ok": true,
  "page": "/about-us",
  "video": {
    "page": "/about-us",
    "url": "https://www.youtube.com/watch?v=…",
    "title": "…",
    "description": "…",
    "template": "page",
    "icon": "${(settings.icons[0] || {}).id || "play"}",
    "poster": "",
    "custom": {
${fields || "      // your custom fields appear here"}
    },
    "updatedAt": "2026-11-13T10:00:00.000Z"
  },
  "template": {
    "id": "pv-about-us", "layout": "cinema", "scene": "stars", "object": "globe", "motion": "lively",
    "palette": { "tone": "dark", "bg1": "#0b1b2d", "bg2": "#301268", "ink": "#ffffff", "muted": "#c3d1df", "accent": "#3678f2", "accent2": "#f14e4b", "glow": "#d456fb" },
    "kicker": "Frequent Research", "headline": "We turn questions into growth.", "subline": "", "tagline": "…",
    "points": ["…", "…"], "stat": { "value": "55", "label": "countries" },
    "icons": ["users", "globe", "handshake"], "flags": [], "cta": "Meet us on video", "image": "", "imageAlt": ""
  }
}`}</Code>
      <h3>4. Your own component instead (optional)</h3>
      <p className="wv-muted">If your developers prefer their own component, they read the same answer and draw it themselves (always with textContent, never innerHTML).</p>
      <Code>{`class FrVideo extends HTMLElement {
  async connectedCallback() {
    const page = this.getAttribute("page") || location.pathname;
    const r = await fetch("/api/v1/page-videos?page=" + encodeURIComponent(page));
    const { video, template } = await r.json();
    if (!video) { this.hidden = true; return; }      // no video on this page
    // video.url, video.title, video.description, video.custom.<key>
    // template.layout, template.palette.accent, template.icons … (the page's own design)
  }
}
customElements.define("fr-video", FrVideo);`}</Code>
      <h3>Try it</h3>
      <div className="wv-bar"><input className="adm-in" value={page} onChange={(e) => setPage(e.target.value)} aria-label="Page URL" /><AdmBtn small onClick={tryIt}>Get this page's video and design</AdmBtn></div>
      {out ? <div className="wv-code"><pre>{out}</pre></div> : null}
    </div>
  );
}

function WebVideos() {
  const [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const perms = { view: admCan(me, "pages", "view"), edit: admCan(me, "pages", "edit"), create: admCan(me, "pages", "create"), delete: admCan(me, "pages", "delete"), publish: admCan(me, "pages", "publish") };
  const [tab, setTab] = ee.useState("pages");
  const [focus, setFocus] = ee.useState("");
  const [settings, setSettings] = ee.useState(null);
  const [count, setCount] = ee.useState(null);
  const [err, setErr] = ee.useState(null);
  ee.useEffect(() => { admApi("/admin/page-videos/settings").then((r) => setSettings(r.settings)).catch((e) => setErr({ err: e.message })); }, []);
  const openTemplate = (p) => { setFocus(p); setTab("designs"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const TABS = [["pages", "Pages & videos"], ["designs", "Page designs (995 templates)"], ["settings", "Generic templates, icons & custom fields"], ["api", "Connect the website & API"]];
  return (
    <section className="adm-sec wv">
      <style>{CSS}</style>
      <header className="adm-sec__h"><h1>Page video component</h1></header>
      <p className="wv-muted">Every page of the website with its video and a video design made for that page. Change a video, its words or its design here: the website shows it within a minute, without changing the website code.</p>
      {count ? (
        <div className="wv-stats">
          <div className="wv-stat"><b>{count.pages}</b><span>website pages, each with its own design</span></div>
          <div className="wv-stat"><b>{count.withVideo}</b><span>pages with a video</span></div>
          <div className="wv-stat"><b>{Math.max(0, count.pages - count.withVideo)}</b><span>pages still without a video</span></div>
          <div className="wv-stat"><b>{settings ? settings.fields.length : "…"}</b><span>custom fields</span></div>
        </div>
      ) : null}
      <div className="wv-tabs" role="tablist">{TABS.map(([id, l]) => <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{l}</button>)}</div>
      <AdmStatus s={err} />
      {!settings ? <p className="wv-muted">Loading…</p> : tab === "pages" ? <PagesTab settings={settings} perms={perms} onCount={setCount} onTemplate={openTemplate} /> : tab === "designs" ? <TemplatesTab perms={perms} focus={focus} setFocus={setFocus} /> : tab === "settings" ? <SettingsTab settings={settings} perms={perms} onSaved={setSettings} /> : <IntegrationTab settings={settings} />}
    </section>
  );
}

export { WebVideos as AdmWebVideos, parseCsv as wvParseCsv };
