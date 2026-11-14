/*
 * Super admin: "Page videos" (build 70). One YouTube video per page for the red YouTube button, each page in its own
 * design (components/site/PageVideo69.jsx). Saved like the other lists (app/cms.jsx cmsList "page-videos"): only the
 * changes to the built-in list, plus pages the admin added.
 */
import * as ee from 'react';
import { CMS_DEFAULTS } from '../app/cms.jsx';
import { admClone, admDel, admGet, admPut, admSame } from './api.jsx';
import { AdmBtn, AdmCard, AdmField, AdmStatus, admIsObj } from './Fields.jsx';
import { PV_TEMPLATES } from '../data/PageVideos69.jsx';
import { pvYt } from '../components/site/PageVideo69.jsx';

const isObj = admIsObj;
const merge = (a, b) => { if (!isObj(a) || !isObj(b)) return b; const o = { ...a }; for (const k of Object.keys(b)) o[k] = isObj(a[k]) && isObj(b[k]) ? merge(a[k], b[k]) : b[k]; return o; };
const diff = (a, b) => { if (!isObj(a) || !isObj(b)) return admSame(a, b) ? undefined : b; const o = {}; for (const k of Object.keys(b)) { const d = diff(a[k], b[k]); if (d !== undefined) o[k] = d; } return Object.keys(o).length ? o : undefined; };
const BLANK = { id: "", page: "", path: "/", match: "exact", section: "", url: "", template: "spotlight", eyebrow: "", title: "", em: "", lede: "", points: [], cta: { label: "", to: "" } };

function Txt({ value, onChange, ph, long }) {
  return long
    ? <textarea className="adm-in" rows={3} value={value || ""} placeholder={ph} onChange={(e) => onChange(e.target.value)} />
    : <input className="adm-in" value={value || ""} placeholder={ph} onChange={(e) => onChange(e.target.value)} />;
}

function One({ v, set }) {
  const yt = pvYt(v.url);
  const up = (k, x) => set({ ...v, [k]: x });
  return (
    <div className="adm-pv">
      <div className="adm-pv__top">
        <div className="adm-pv__thumb">
          {yt ? <img src={"https://i.ytimg.com/vi/" + yt.id + "/mqdefault.jpg"} alt="" onError={(e) => (e.currentTarget.style.visibility = "hidden")} /> : <span>No video yet</span>}
        </div>
        <div className="adm-pv__main">
          <AdmField label="YouTube link" help="Paste the video's link as YouTube gives it (youtu.be/…, youtube.com/watch?v=…, or a Shorts link).">
            <Txt value={v.url} onChange={(x) => up("url", x.trim())} ph="https://youtu.be/…" />
            {v.url && !yt ? <em className="adm-err">This is not a YouTube video link.</em> : null}
            {yt ? <small className="adm-muted">Video {yt.id}{yt.tall ? " · upright (Shorts)" : ""}{yt.start ? " · starts at " + yt.start + " s" : ""} · <a href={"https://youtu.be/" + yt.id} target="_blank" rel="noreferrer">open on YouTube ↗</a></small> : null}
          </AdmField>
          <AdmField label="Design">
            <select className="adm-in" value={v.template} onChange={(e) => up("template", e.target.value)}>
              {PV_TEMPLATES.map(([id, n, d]) => <option key={id} value={id}>{n}: {d}</option>)}
            </select>
          </AdmField>
        </div>
      </div>
      <AdmCard title="Texts in the video window" sub={[v.eyebrow, v.title, v.em].filter(Boolean).join(" · ")}>
        <AdmField label="Small label"><Txt value={v.eyebrow} onChange={(x) => up("eyebrow", x)} ph="e.g. Our journey" /></AdmField>
        <AdmField label="Headline"><Txt value={v.title} onChange={(x) => up("title", x)} /></AdmField>
        <AdmField label="Headline, highlighted part" help="Shown in the design's accent colour after the headline."><Txt value={v.em} onChange={(x) => up("em", x)} /></AdmField>
        <AdmField label="Short text"><Txt long value={v.lede} onChange={(x) => up("lede", x)} /></AdmField>
        <AdmField label="Highlights" help="One per line. A line like “2015 · Market research” shows 2015 as its label.">
          <textarea className="adm-in" rows={4} value={(v.points || []).join("\n")} onChange={(e) => up("points", e.target.value.split("\n"))} onBlur={(e) => up("points", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
        </AdmField>
        <AdmField label="Button text"><Txt value={v.cta && v.cta.label} onChange={(x) => up("cta", { ...(v.cta || {}), label: x })} ph="e.g. Talk to our team" /></AdmField>
        <AdmField label="Button link" help="A page of this site (/lets-talk) or a full https:// address."><Txt value={v.cta && v.cta.to} onChange={(x) => up("cta", { ...(v.cta || {}), to: x.trim() })} ph="/lets-talk" /></AdmField>
      </AdmCard>
      <AdmCard title="Which page" sub={v.path + (v.match === "prefix" ? " and every page under it" : "") + (v.section ? " · section " + v.section : "")}>
        <AdmField label="Page name (for you)"><Txt value={v.page} onChange={(x) => up("page", x)} /></AdmField>
        <AdmField label="Page address" help="The part after the domain, e.g. /our-journey."><Txt value={v.path} onChange={(x) => up("path", x.trim())} ph="/" /></AdmField>
        <AdmField label="Also its sub-pages">
          <label className="adm-sw"><input type="checkbox" checked={v.match === "prefix"} onChange={(e) => up("match", e.target.checked ? "prefix" : "exact")} /><span>Use this video on every page under this address too (unless that page has its own)</span></label>
        </AdmField>
        <AdmField label="Section of the page" help="Optional, for two videos on one page: a CSS selector of a heading in that section (e.g. #ab21-mv-h). While the section is on screen, the button plays this video.">
          <Txt value={v.section} onChange={(x) => up("section", x.trim())} ph="(whole page)" />
        </AdmField>
      </AdmCard>
    </div>
  );
}

function PageVideos() {
  const def = CMS_DEFAULTS["page-videos"] || [];
  const ids = new Set(def.map((x) => x.id));
  const [items, setItems] = ee.useState(null), [orig, setOrig] = ee.useState(null), [saved, setSaved] = ee.useState(undefined);
  const [q, setQ] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const load = async () => {
    const o = (await admGet("page-videos")) || undefined;
    setSaved(o);
    const s = o || {};
    const hide = new Set((s.hide || []).map(String)), edit = s.edit || {};
    const list = def.map((x) => ({ v: admClone(isObj(edit[x.id]) ? merge(x, edit[x.id]) : x), hidden: hide.has(x.id) }))
      .concat((s.add || []).filter(isObj).map((x) => ({ v: admClone(merge(BLANK, x)), hidden: hide.has(String(x.id)), added: true })));
    setItems(list); setOrig(admClone(list));
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);
  if (!items) return <section className="adm-sec"><h1>Page videos</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const upd = (i, patch) => setItems(items.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const add = () => {
    const page = prompt("Name of the page (for example: Our Team):");
    if (!page) return;
    const path = prompt("Its address on the site (the part after the domain, for example /our-team):", "/") || "/";
    const id = page.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 50) + "-" + Date.now().toString(36);
    setItems([{ v: { ...admClone(BLANK), id, page, path: path.trim(), title: page }, hidden: false, added: true }, ...items]);
  };
  const bad = items.filter((x) => !x.hidden && x.v.url && !pvYt(x.v.url));
  const save = async () => {
    if (bad.length) { setMsg({ err: "Fix the YouTube link for: " + bad.map((x) => x.v.page).join(", ") }); return; }
    const edit = {}, addL = [], hide = [];
    const dmap = new Map(def.map((x) => [x.id, x]));
    for (const it of items) {
      const v = { ...it.v, points: (it.v.points || []).map((s) => String(s).trim()).filter(Boolean) };
      if (it.hidden) { hide.push(v.id); if (!dmap.has(v.id)) addL.push(v); continue; }
      if (dmap.has(v.id) && !it.added) { const d = diff(dmap.get(v.id), v); if (d) edit[v.id] = d; }
      else addL.push(v);
    }
    try { await admPut("page-videos", { edit, add: addL, hide }); setMsg({ ok: "Saved. Each page shows its video from the next page load." }); await load(); }
    catch (e) { setMsg({ err: e.message }); }
  };
  const undo = async () => { if (!confirm("Remove every change to the page videos and use the built-in list again?")) return; await admDel("page-videos"); setMsg({ ok: "Back to the built-in list." }); await load(); };
  const withVideo = items.filter((x) => !x.hidden && pvYt(x.v.url)).length;
  const shown = items.map((x, i) => [x, i]).filter(([x]) => !q || JSON.stringify(x.v).toLowerCase().includes(q.toLowerCase()));
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Page videos</h1><AdmBtn kind="primary" onClick={add}>+ Add a page</AdmBtn></header>
      <p className="adm-muted">The red YouTube button on every page plays that page's own video, in that page's own design. Paste a YouTube link for a page and pick a design. A page with no video of its own plays its parent page's video (for example a service page plays its service area's video), and otherwise the home video. {withVideo} of {items.filter((x) => !x.hidden).length} pages have a video.</p>
      <div className="adm-filters"><input className="adm-in" placeholder={"Search " + items.length + " pages…"} value={q} onChange={(e) => setQ(e.target.value)} /></div>
      <div className="adm-items">
        {shown.map(([x, i]) => (
          <AdmCard key={x.v.id + ":" + i} open={!!x.added && !x.v.url} cls={x.hidden ? "is-hidden" : ""}
            title={(pvYt(x.v.url) ? "▶ " : "○ ") + (x.v.page || x.v.path)}
            sub={(x.hidden ? "Hidden · " : "") + x.v.path + " · " + ((PV_TEMPLATES.find((t) => t[0] === x.v.template) || [, "Spotlight"])[1]) + (pvYt(x.v.url) ? "" : " · no video yet")}
            actions={<>
              <a className="adm-btn adm-btn--sm adm-btn--ghost" href={x.v.path} target="_blank" rel="noreferrer">View page ↗</a>
              <AdmBtn small onClick={() => upd(i, { hidden: !x.hidden })}>{x.hidden ? "Show" : "Hide"}</AdmBtn>
              {x.added && !ids.has(x.v.id) && <AdmBtn small kind="danger" onClick={() => setItems(items.filter((_, j) => j !== i))}>Delete</AdmBtn>}
            </>}>
            <One v={x.v} set={(v) => upd(i, { v })} />
          </AdmCard>
        ))}
      </div>
      <div className="adm-save">
        <AdmBtn kind="primary" onClick={save} disabled={admSame(items, orig)}>Save and publish</AdmBtn>
        <AdmBtn onClick={() => setItems(admClone(orig))} disabled={admSame(items, orig)}>Discard edits</AdmBtn>
        {saved !== undefined && <AdmBtn kind="ghost" onClick={undo}>Back to the original list</AdmBtn>}
        <AdmStatus s={msg} />
      </div>
    </section>
  );
}

export { PageVideos as AdmPageVideos };
