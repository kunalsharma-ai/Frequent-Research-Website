/*
 * Super admin, build 83: "Page videos" with every page of the website and a design of its own for each (Kunal, 16 Nov).
 *
 * - Every page (data/sitePages83.js: main pages, 67 services, products, portals, downloads, 148 panel-country pages,
 *   industries, blog posts, legal pages) is in the list, grouped and searchable, with a live preview of its design.
 * - Design: "Studio 83" (generated per page, data/pv83Looks.js) with every part adjustable (palette, local pattern,
 *   frame, layout, fonts, highlights, colour grading, illustration, icons, music) and "Shuffle"; or a classic build-70
 *   design.
 * - Video: a YouTube or Vimeo link, a direct .mp4/.webm address, or an uploaded MP4/WebM; or none, and the page plays its
 *   own animated video. Cover: the designed cover, the YouTube picture or an uploaded picture.
 * - Import video template: a template file (.json, exported here or written by hand), a video file (MP4/WebM) or a
 *   cover picture for the open page, or an Excel/CSV list of pages and video links. Export: every page's design and
 *   video as one .json file.
 * Saved under "page-videos" as before ({ edit, add, hide }) plus "studio" ({ packs, sound, classic }).
 * The build-70 editor is kept as "Page videos (classic list)" (admin/PageVideos.jsx).
 */
import * as ee from 'react';
import { CMS_DEFAULTS } from '../app/cms.jsx';
import { admClone, admDel, admGet, admPut, admSame, admUpload } from './api.jsx';
import { AdmBtn, AdmCard, AdmField, AdmStatus, AdmUploadBtn, admIsObj } from './Fields.jsx';
import { admReadFile } from './Import.jsx';
import { PV_TEMPLATES } from '../data/PageVideos69.jsx';
import { PV83_ALL, pv83Video } from '../data/PageVideos83.js';
import { MOTIF_NAMES, PV83_FONTS, PV83_FRAMES, PV83_GRADES, PV83_ILLUS, PV83_LAYOUTS, PV83_MOODS, PV83_MOTIFS, PV83_PALETTES, PV83_POINTS } from '../data/pv83Looks.js';
import { PV83_ICON_NAMES, PV83_Window } from '../components/site/PageVideo83.jsx';
import './css83.js';

const isObj = admIsObj;
const merge = (a, b) => { if (!isObj(a) || !isObj(b)) return b; const o = { ...a }; for (const k of Object.keys(b)) o[k] = isObj(a[k]) && isObj(b[k]) ? merge(a[k], b[k]) : b[k]; return o; };
const diff = (a, b) => { if (!isObj(a) || !isObj(b)) return admSame(a, b) ? undefined : b; const o = {}; for (const k of Object.keys(b)) { const d = diff(a[k], b[k]); if (d !== undefined) o[k] = d; } return Object.keys(o).length ? o : undefined; };
const BLANK = { id: "", page: "", path: "/", match: "exact", section: "", url: "", template: "x83", classic: "spotlight", eyebrow: "", title: "", em: "", lede: "", points: [], cta: { label: "", to: "" }, n: 0, num: 1, group: "Added pages", kind: "main", fam: "fr", country: "", panel: "", source: "auto", cover: "design", coverUrl: "", look: {}, sound: true };
const PER = 40;
const norm = (p) => (String(p || "/").split(/[?#]/)[0].replace(/\/+$/, "") || "/").toLowerCase();
const download = (name, text) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "application/json" })); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); };

function Txt({ value, onChange, ph, long }) {
  return long ? <textarea className="adm-in" rows={3} value={value || ""} placeholder={ph} onChange={(e) => onChange(e.target.value)} />
    : <input className="adm-in" value={value || ""} placeholder={ph} onChange={(e) => onChange(e.target.value)} />;
}
const Sel = ({ value, onChange, opts, auto = "Automatic (generated)" }) => (
  <select className="adm-in" value={value || ""} onChange={(e) => onChange(e.target.value)}>
    {auto ? <option value="">{auto}</option> : null}
    {opts.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
  </select>
);
const videoLabel = (v) => (!v ? "Animated video" : v.kind === "yt" ? "YouTube" : v.kind === "vimeo" ? "Vimeo" : "MP4 video");

/* the live preview: the real window, inline and scaled down */
function Preview({ v, full, setFull, packs }) {
  const e = { ...v, packs, video: v.source === "motion" ? null : pv83Video(v.url) };
  const box = ee.useRef(null), [k, setK] = ee.useState(0.6);
  ee.useEffect(() => {
    const el = box.current; if (!el || typeof ResizeObserver === "undefined") return undefined;
    const ro = new ResizeObserver(() => setK(el.clientWidth / 1280)); ro.observe(el); return () => ro.disconnect();
  }, []);
  return (
    <>
      <div className="adm83-pv" ref={box} style={{ "--k": k }}><div className="adm83-pv__in"><PV83_Window inline list={[e]} onClose={() => {}} /></div></div>
      {full ? <PV83_Window list={[e]} onClose={() => setFull(false)} /> : null}
    </>
  );
}

function Design({ v, set, packs }) {
  const L = isObj(v.look) ? v.look : {};
  const up = (k, x) => { const o = { ...L, [k]: x }; if (x === "" || x == null || (Array.isArray(x) && !x.length)) delete o[k]; set({ ...v, look: o }); };
  const pickR = (l) => l[Math.floor(Math.random() * l.length)];
  const shuffle = () => set({ ...v, template: "x83", look: { ...(L.pack ? { pack: L.pack } : {}), palette: v.country ? "" : pickR(PV83_PALETTES).id, motif: v.country ? "" : pickR(PV83_MOTIFS), frame: pickR(PV83_FRAMES)[0], layout: pickR(PV83_LAYOUTS)[0], font: pickR(PV83_FONTS)[0], points: pickR(PV83_POINTS)[0], grade: pickR(PV83_GRADES)[0], illus: pickR(PV83_ILLUS)[0], mood: pickR(PV83_MOODS)[0], seed: Math.floor(Math.random() * 99999) } });
  const colors = isObj(L.colors) ? L.colors : {};
  return (
    <AdmCard title="Design" sub={v.template === "x83" ? "Studio 83" + (Object.keys(L).length ? " · adjusted" : " · generated for this page") : "Classic: " + ((PV_TEMPLATES.find((t) => t[0] === v.template) || [, v.template])[1])} open>
      <div className="adm-row">
        <select className="adm-in adm-in--auto" value={v.template === "x83" ? "x83" : v.template} onChange={(e) => set({ ...v, template: e.target.value })}>
          <option value="x83">Studio 83: this page's own design (recommended)</option>
          <optgroup label="Classic designs (build 70, YouTube only)">{PV_TEMPLATES.map(([id, n]) => <option key={id} value={id}>{n}</option>)}</optgroup>
        </select>
        <AdmBtn small kind="primary" onClick={shuffle}>🎲 Shuffle design</AdmBtn>
        <AdmBtn small onClick={() => set({ ...v, template: "x83", look: {} })}>Reset to generated</AdmBtn>
      </div>
      {v.template === "x83" ? (
        <div className="adm83-grid">
          {packs.length ? <AdmField label="Imported template"><Sel value={L.pack} onChange={(x) => up("pack", x)} opts={packs.map((p) => [p.id, p.name || p.id])} auto="None" /></AdmField> : null}
          <AdmField label="Colour palette" help={v.country ? "Country pages use their flag's colours unless you pick one." : ""}><Sel value={L.palette} onChange={(x) => up("palette", x)} opts={PV83_PALETTES.map((p) => [p.id, p.n])} /></AdmField>
          <AdmField label="Local pattern"><Sel value={L.motif} onChange={(x) => up("motif", x)} opts={PV83_MOTIFS.map((m) => [m, MOTIF_NAMES[m] || m])} /></AdmField>
          <AdmField label="Frame"><Sel value={L.frame} onChange={(x) => up("frame", x)} opts={PV83_FRAMES} /></AdmField>
          <AdmField label="Layout"><Sel value={L.layout} onChange={(x) => up("layout", x)} opts={PV83_LAYOUTS} /></AdmField>
          <AdmField label="Fonts"><Sel value={L.font} onChange={(x) => up("font", x)} opts={PV83_FONTS} /></AdmField>
          <AdmField label="Highlights"><Sel value={L.points} onChange={(x) => up("points", x)} opts={PV83_POINTS} /></AdmField>
          <AdmField label="Colour grading"><Sel value={L.grade} onChange={(x) => up("grade", x)} opts={PV83_GRADES} /></AdmField>
          <AdmField label="Illustration"><Sel value={L.illus} onChange={(x) => up("illus", x)} opts={PV83_ILLUS} /></AdmField>
          <AdmField label="Music of the animated video"><Sel value={L.mood} onChange={(x) => up("mood", x)} opts={PV83_MOODS} /></AdmField>
          <AdmField label="Icons" help="Up to 5, comma separated (first = the big one).">
            <input className="adm-in" list="adm83-icons" value={(L.icons || []).join(", ")} placeholder="Automatic" onChange={(e) => up("icons", e.target.value.split(/\s*,\s*/).filter(Boolean))} />
          </AdmField>
          <AdmField label="Own colours" help="Optional: overrides the palette.">
            <span className="adm-row">{[["bg", "Background"], ["a", "Accent"], ["a2", "Accent 2"], ["p1", "Cover"]].map(([k, l]) => (
              <label key={k} className="adm83-col"><input type="color" value={colors[k] || "#000000"} onChange={(e) => up("colors", { ...colors, [k]: e.target.value })} /><small>{l}</small></label>
            ))}{Object.keys(colors).length ? <AdmBtn small kind="ghost" onClick={() => up("colors", null)}>Clear</AdmBtn> : null}</span>
          </AdmField>
        </div>
      ) : <p className="adm-muted">Classic designs show YouTube videos only; pages with an MP4, Vimeo or no video use Studio 83.</p>}
    </AdmCard>
  );
}

function One({ v, set, packs, onPack }) {
  const [full, setFull] = ee.useState(false);
  const up = (k, x) => set({ ...v, [k]: x });
  const vid = pv83Video(v.url);
  return (
    <div className="adm83-one">
      <Preview v={v} full={full} setFull={setFull} packs={packs} />
      <div className="adm-row"><AdmBtn small kind="primary" onClick={() => setFull(true)}>▶ Full-screen preview</AdmBtn><a className="adm-btn adm-btn--sm adm-btn--ghost" href={v.path} target="_blank" rel="noreferrer">View page ↗</a><AdmBtn small onClick={() => onPack(v)}>Save this design as a template</AdmBtn></div>
      <AdmCard title="Video" sub={videoLabel(v.source === "motion" ? null : vid) + (v.url && !vid ? " · link not recognised" : "")} open>
        <AdmField label="Video link or file" help="A YouTube or Vimeo link, a direct .mp4 / .webm address, or upload a video file (MP4 or WebM). Leave empty for the page's animated video.">
          <div className="adm-row"><Txt value={v.url} onChange={(x) => up("url", x.trim())} ph="https://youtu.be/… · https://vimeo.com/… · https://…/film.mp4" />
            <AdmUploadBtn accept="video/mp4,video/webm" folder="videos" onDone={(u) => up("url", u)}>Upload video</AdmUploadBtn></div>
          {v.url && !vid ? <em className="adm-err">This is not a YouTube, Vimeo or MP4/WebM link.</em> : null}
        </AdmField>
        <AdmField label="What plays">
          <select className="adm-in" value={v.source || "auto"} onChange={(e) => up("source", e.target.value)}>
            <option value="auto">This page's video; else its parent page's video; else the animated video</option>
            <option value="own">This page's video; else the animated video</option>
            <option value="motion">Always the animated video</option>
          </select>
        </AdmField>
        <AdmField label="Cover">
          <div className="adm-row">
            <select className="adm-in adm-in--auto" value={v.cover || "design"} onChange={(e) => up("cover", e.target.value)}>
              <option value="design">Designed cover (this page's design)</option><option value="thumb">YouTube picture</option><option value="image">My own picture</option>
            </select>
            {v.cover === "image" ? <><Txt value={v.coverUrl} onChange={(x) => up("coverUrl", x.trim())} ph="https://… or upload" /><AdmUploadBtn folder="videos" onDone={(u) => up("coverUrl", u)}>Upload picture</AdmUploadBtn></> : null}
          </div>
        </AdmField>
        <AdmField label="Sound"><label className="adm-sw"><input type="checkbox" checked={v.sound !== false} onChange={(e) => up("sound", e.target.checked)} /><span>The animated video starts with its music on</span></label></AdmField>
      </AdmCard>
      <Design v={v} set={set} packs={packs} />
      <AdmCard title="Texts" sub={[v.eyebrow, v.title, v.em].filter(Boolean).join(" · ")}>
        <AdmField label="Small label"><Txt value={v.eyebrow} onChange={(x) => up("eyebrow", x)} /></AdmField>
        <AdmField label="Headline"><Txt value={v.title} onChange={(x) => up("title", x)} /></AdmField>
        <AdmField label="Headline, highlighted part"><Txt value={v.em} onChange={(x) => up("em", x)} /></AdmField>
        <AdmField label="Short text"><Txt long value={v.lede} onChange={(x) => up("lede", x)} /></AdmField>
        <AdmField label="Highlights" help="One per line. “2015 · text” shows 2015 as its label.">
          <textarea className="adm-in" rows={4} value={(v.points || []).join("\n")} onChange={(e) => up("points", e.target.value.split("\n"))} onBlur={(e) => up("points", e.target.value.split("\n").map((s) => s.trim()).filter(Boolean))} />
        </AdmField>
        <AdmField label="Button text"><Txt value={v.cta && v.cta.label} onChange={(x) => up("cta", { ...(v.cta || {}), label: x })} /></AdmField>
        <AdmField label="Button link"><Txt value={v.cta && v.cta.to} onChange={(x) => up("cta", { ...(v.cta || {}), to: x.trim() })} ph="/lets-talk" /></AdmField>
        <AdmField label="Number on the cover"><input className="adm-in adm-in--num" type="number" min="1" max="99" value={v.num || 1} onChange={(e) => up("num", +e.target.value || 1)} /></AdmField>
      </AdmCard>
      <AdmCard title="Which page" sub={v.path + (v.match === "prefix" ? " and the pages under it" : "") + (v.section ? " · section " + v.section : "")}>
        <AdmField label="Page name (for you)"><Txt value={v.page} onChange={(x) => up("page", x)} /></AdmField>
        <AdmField label="Page address"><Txt value={v.path} onChange={(x) => up("path", x.trim())} ph="/" /></AdmField>
        <AdmField label="Also its sub-pages"><label className="adm-sw"><input type="checkbox" checked={v.match === "prefix"} onChange={(e) => up("match", e.target.checked ? "prefix" : "exact")} /><span>Pages under this address without their own entry use this one</span></label></AdmField>
        <AdmField label="Section of the page" help="Optional CSS selector of a heading: while that section is on screen, the button plays this entry."><Txt value={v.section} onChange={(x) => up("section", x.trim())} ph="(whole page)" /></AdmField>
      </AdmCard>
    </div>
  );
}

function PageVideos83() {
  const def = CMS_DEFAULTS["page-videos"] && CMS_DEFAULTS["page-videos"].length >= PV83_ALL.length ? CMS_DEFAULTS["page-videos"] : PV83_ALL;
  const ids = ee.useMemo(() => new Set(def.map((x) => x.id)), [def]);
  const [items, setItems] = ee.useState(null), [orig, setOrig] = ee.useState(null), [saved, setSaved] = ee.useState(undefined);
  const [studio, setStudio] = ee.useState({}), [studio0, setStudio0] = ee.useState({});
  const [q, setQ] = ee.useState(""), [grp, setGrp] = ee.useState(""), [flt, setFlt] = ee.useState(""), [page, setPage] = ee.useState(1), [open, setOpen] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const fileRef = ee.useRef(null);
  const load = async () => {
    const o = (await admGet("page-videos")) || undefined;
    setSaved(o);
    const s = o || {};
    const hide = new Set((s.hide || []).map(String)), edit = s.edit || {};
    const list = def.map((x) => ({ v: admClone(isObj(edit[x.id]) ? merge(x, edit[x.id]) : x), hidden: hide.has(x.id) }))
      .concat((s.add || []).filter(isObj).map((x) => ({ v: admClone(merge(BLANK, x)), hidden: hide.has(String(x.id)), added: true })));
    setItems(list); setOrig(admClone(list));
    const st = isObj(s.studio) ? s.studio : {}; setStudio(admClone(st)); setStudio0(admClone(st));
    const want = new URLSearchParams(location.search).get("page");
    if (want) { const it = list.find((x) => norm(x.v.path) === norm(want)); if (it) { setOpen(it.v.id); setQ(it.v.path); } }
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);
  if (!items) return <section className="adm-sec"><h1>Page videos</h1><AdmStatus s={msg} /><p className="adm-muted">Loading every page…</p></section>;
  const packs = Array.isArray(studio.packs) ? studio.packs.filter(isObj) : [];
  const upd = (id, patch) => setItems((cur) => cur.map((x) => (x.v.id === id ? { ...x, ...patch } : x)));
  const groups = [...new Set(items.map((x) => x.v.group || "Other"))];
  const shown = items.filter((x) => (!grp || (x.v.group || "Other") === grp)
    && (!flt || (flt === "video" ? pv83Video(x.v.url) : flt === "motion" ? !pv83Video(x.v.url) : flt === "custom" ? Object.keys(x.v.look || {}).length : flt === "hidden" ? x.hidden : true))
    && (!q || (x.v.page + " " + x.v.path + " " + x.v.title).toLowerCase().includes(q.toLowerCase())));
  const add = () => {
    const name = prompt("Name of the page (for example: Our Team):"); if (!name) return;
    const path = prompt("Its address on the site (for example /our-team):", "/") || "/";
    const id = "add-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40) + "-" + Date.now().toString(36);
    setItems([{ v: { ...admClone(BLANK), id, page: name, path: path.trim(), title: name, n: Math.floor(Math.random() * 900) }, hidden: false, added: true }, ...items]); setOpen(id); setGrp(""); setQ("");
  };
  const savePack = (v) => {
    const name = prompt("Name of the template:", v.page + " design"); if (!name) return;
    const id = "t" + Date.now().toString(36);
    setStudio({ ...studio, packs: [...packs, { id, name, look: admClone(v.look || {}), from: v.path }] });
    setMsg({ ok: "Template “" + name + "” kept. Pick it under Design › Imported template on any page, then Save." });
  };
  /* Import video template */
  const importFile = async (f) => {
    const ext = (f.name.toLowerCase().match(/\.([a-z0-9]+)$/) || [])[1] || "";
    const cur = open && items.find((x) => x.v.id === open);
    try {
      if (/^video\//.test(f.type) || ["mp4", "webm", "m4v"].includes(ext)) {
        if (!cur) throw new Error("Open a page first: the video is set for the open page.");
        setMsg({ ok: "Uploading " + f.name + "…" });
        const r = await admUpload(f, "videos", { optimise: false });
        upd(cur.v.id, { v: { ...cur.v, url: r.url, source: "own" } }); setMsg({ ok: "Video uploaded and set for " + cur.v.page + ". Press Save to publish." }); return;
      }
      if (/^image\//.test(f.type)) {
        if (!cur) throw new Error("Open a page first: the picture becomes the open page's cover.");
        const r = await admUpload(f, "videos");
        upd(cur.v.id, { v: { ...cur.v, cover: "image", coverUrl: r.url } }); setMsg({ ok: "Cover picture set for " + cur.v.page + ". Press Save to publish." }); return;
      }
      if (ext === "json") {
        const j = JSON.parse(await f.text());
        const newPacks = [].concat(j.packs || (j.look ? [j] : Array.isArray(j) ? j.filter((x) => x && x.look) : [])).filter(isObj).map((p, i) => ({ id: String(p.id || "t" + Date.now().toString(36) + i), name: String(p.name || "Imported template " + (i + 1)), look: isObj(p.look) ? p.look : {} }));
        const entries = Array.isArray(j.entries) ? j.entries.filter(isObj) : [];
        let n = 0;
        if (entries.length) setItems((list) => list.map((x) => { const e = entries.find((y) => norm(y.path) === norm(x.v.path) && !y.section === !x.v.section); if (!e) return x; n++; const { id, n: _n, num, ...rest } = e; void id; void _n; void num; return { ...x, v: merge(x.v, rest) }; }));
        if (newPacks.length) setStudio((s) => ({ ...s, packs: [...(Array.isArray(s.packs) ? s.packs : []).filter((p) => !newPacks.some((q2) => q2.id === p.id)), ...newPacks] }));
        if (newPacks.length === 1 && cur) upd(cur.v.id, { v: { ...cur.v, template: "x83", look: { ...(cur.v.look || {}), pack: newPacks[0].id } } });
        setMsg({ ok: `${newPacks.length} template${newPacks.length === 1 ? "" : "s"} imported${entries.length ? `, ${entries.length} page${entries.length === 1 ? "" : "s"} in the file` : ""}${newPacks.length === 1 && cur ? ", applied to " + cur.v.page : ""}. Press Save to publish.` }); return;
      }
      const r = await admReadFile(f);
      if (r.kind === "table") {
        const col = (re) => r.cols.find((c) => re.test(c.toLowerCase())) || "";
        const cp = col(/path|address|url of page|page url|page/), cv = r.cols.find((c) => c !== cp && /video|youtube|link/.test(c.toLowerCase())) || "";
        if (!cp || !cv) throw new Error("The sheet needs a column with the page address (e.g. “Page”) and one with the video link (e.g. “Video link”).");
        const map = new Map(r.items.map((row) => [norm(String(row[cp]).replace(/^https?:\/\/[^/]+/i, "")), String(row[cv] || "").trim()]).filter(([p, u]) => p && u));
        let n = 0;
        setItems((list) => list.map((x) => (map.has(norm(x.v.path)) && !x.v.section ? (n++, { ...x, v: { ...x.v, url: map.get(norm(x.v.path)) } }) : x)));
        setMsg({ ok: map.size + " video links read from " + f.name + ". Check them, then press Save." }); return;
      }
      throw new Error("Use a template file (.json), a video (MP4/WebM), a picture, or an Excel/CSV list of pages and video links.");
    } catch (e) { setMsg({ err: e.message }); }
  };
  const exportAll = () => download("frequent-research-page-video-templates.json", JSON.stringify({ kind: "fr-page-video-templates", version: 83, exported: new Date().toISOString(), packs, entries: items.filter((x) => !x.hidden).map((x) => { const { n, ...v } = x.v; void n; return v; }) }, null, 1));
  const bad = items.filter((x) => !x.hidden && x.v.url && !pv83Video(x.v.url));
  const save = async () => {
    if (bad.length) { setMsg({ err: "Fix the video link for: " + bad.slice(0, 6).map((x) => x.v.page).join(", ") }); return; }
    const edit = {}, addL = [], hide = [];
    const dmap = new Map(def.map((x) => [x.id, x]));
    for (const it of items) {
      const v = { ...it.v, points: (it.v.points || []).map((s) => String(s).trim()).filter(Boolean) };
      if (it.hidden) { hide.push(v.id); if (!dmap.has(v.id)) addL.push(v); continue; }
      if (dmap.has(v.id) && !it.added) { const d = diff(dmap.get(v.id), v); if (d) edit[v.id] = d; } else addL.push(v);
    }
    try { await admPut("page-videos", { edit, add: addL, hide, studio }); setMsg({ ok: "Saved. Every page shows its design and video from the next page load." }); await load(); }
    catch (e) { setMsg({ err: e.message }); }
  };
  const undo = async () => { if (!confirm("Remove every change to the page videos and use the generated designs again?")) return; await admDel("page-videos"); setMsg({ ok: "Back to the built-in list." }); await load(); };
  const dirty = !admSame(items, orig) || !admSame(studio, studio0);
  const withVideo = items.filter((x) => !x.hidden && pv83Video(x.v.url)).length;
  const pageList = shown.slice(0, page * PER);
  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>Page videos</h1>
        <span className="adm-row">
          <AdmBtn kind="primary" onClick={() => fileRef.current && fileRef.current.click()}>⬆ Import video template</AdmBtn>
          <AdmBtn onClick={exportAll}>⬇ Export templates</AdmBtn>
          <AdmBtn onClick={add}>+ Add a page</AdmBtn>
          <input ref={fileRef} type="file" hidden accept=".json,video/mp4,video/webm,image/*,.xlsx,.csv" onChange={(e) => { const f = e.target.files && e.target.files[0]; e.target.value = ""; if (f) importFile(f); }} />
        </span>
      </header>
      <p className="adm-muted">Every page of the website ({items.length}) with its own design. The red YouTube button on a page opens that page's window: its words, highlights and buttons beside a framed video. Paste or upload a video for a page, or leave it empty and the page plays its own animated video (about 20 seconds, with music). {withVideo} pages have a video of their own. Import video template takes a template file (.json), a video or a cover picture for the open page, or an Excel/CSV list of pages and video links.</p>
      <datalist id="adm83-icons">{PV83_ICON_NAMES.map((n) => <option key={n} value={n} />)}</datalist>
      <div className="adm-filters adm-row">
        <input className="adm-in" placeholder={"Search " + items.length + " pages…"} value={q} onChange={(e) => (setQ(e.target.value), setPage(1))} />
        <select className="adm-in adm-in--auto" value={grp} onChange={(e) => (setGrp(e.target.value), setPage(1))}><option value="">All groups</option>{groups.map((g) => <option key={g} value={g}>{g} ({items.filter((x) => (x.v.group || "Other") === g).length})</option>)}</select>
        <select className="adm-in adm-in--auto" value={flt} onChange={(e) => (setFlt(e.target.value), setPage(1))}><option value="">Every page</option><option value="video">With a video</option><option value="motion">Animated video only</option><option value="custom">Design adjusted</option><option value="hidden">Hidden</option></select>
        <label className="adm-sw"><input type="checkbox" checked={studio.classic === true} onChange={(e) => setStudio({ ...studio, classic: e.target.checked })} /><span>Pages that had a classic design keep it (YouTube only)</span></label>
      </div>
      {packs.length ? <div className="adm-panel adm-row"><b>Templates:</b>{packs.map((p) => <span key={p.id} className="adm83-pack">{p.name}<button type="button" title="Remove" onClick={() => setStudio({ ...studio, packs: packs.filter((x) => x.id !== p.id) })}>✕</button></span>)}</div> : null}
      <div className="adm-items">
        {pageList.map((x) => (
          <AdmCard key={x.v.id + (open === x.v.id ? ":open" : "")} open={open === x.v.id} cls={x.hidden ? "is-hidden" : ""}
            title={(pv83Video(x.v.url) ? "▶ " : "✦ ") + (x.v.page || x.v.path)}
            sub={(x.hidden ? "Hidden · " : "") + x.v.path + " · " + (x.v.group || "") + " · " + videoLabel(pv83Video(x.v.url)) + (Object.keys(x.v.look || {}).length ? " · design adjusted" : "")}
            actions={<>
              <AdmBtn small onClick={() => setOpen(open === x.v.id ? null : x.v.id)}>{open === x.v.id ? "Close" : "Edit"}</AdmBtn>
              <AdmBtn small onClick={() => upd(x.v.id, { hidden: !x.hidden })}>{x.hidden ? "Show" : "Hide"}</AdmBtn>
              {x.added && !ids.has(x.v.id) && <AdmBtn small kind="danger" onClick={() => setItems(items.filter((y) => y !== x))}>Delete</AdmBtn>}
            </>}>
            <One v={x.v} set={(v) => upd(x.v.id, { v })} packs={packs} onPack={savePack} />
          </AdmCard>
        ))}
      </div>
      {shown.length > pageList.length ? <div className="adm-row"><AdmBtn onClick={() => setPage(page + 1)}>Show more ({shown.length - pageList.length} left)</AdmBtn></div> : null}
      <div className="adm-save">
        <AdmBtn kind="primary" onClick={save} disabled={!dirty}>Save and publish</AdmBtn>
        <AdmBtn onClick={() => { setItems(admClone(orig)); setStudio(admClone(studio0)); }} disabled={!dirty}>Discard edits</AdmBtn>
        {saved !== undefined && <AdmBtn kind="ghost" onClick={undo}>Back to the original list</AdmBtn>}
        <AdmStatus s={msg} />
      </div>
    </section>
  );
}

export { PageVideos83 as AdmPageVideos83 };
