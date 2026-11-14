/*
 * Super admin, build 78.1: every page's content in the panel. The index (scripts/site-index.cjs, written at build
 * time into /data/site-index*) lists each page's sections with every text, number, picture and link; here they are
 * shown section by section and changed with the same text / image / link maps as "Edit on the page"
 * (src/app/cms.jsx applies them on the website). Removing a text = replacing it with nothing.
 */
import * as ee from 'react';
import { AdmBtn, AdmUploadBtn } from './Fields.jsx';

const DEMO = typeof window !== "undefined" && !!window.__FR_ADMIN_DEMO;
const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();
const slug = (s) => norm(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);

let LIST = null;
const FILES = new Map();
function loadSiteIndex() {
  if (!LIST) {
    LIST = (DEMO && window.__FR_SITE_INDEX
      ? Promise.resolve(window.__FR_SITE_INDEX.list)
      : fetch("/data/site-index.json", { cache: "no-cache" }).then((r) => (r.ok ? r.json() : null))
    ).catch(() => null).then((j) => {
      if (!j || !Array.isArray(j.pages)) return null;
      const by = new Map(j.pages.map((p) => [p.path, p]));
      return { ...j, by };
    });
  }
  return LIST;
}
function loadFile(file) {
  if (!FILES.has(file)) {
    FILES.set(file, DEMO && window.__FR_SITE_INDEX
      ? Promise.resolve(window.__FR_SITE_INDEX.files[file] || null)
      : fetch("/data/site-index/" + file, { cache: "no-cache" }).then((r) => (r.ok ? r.json() : null)).catch(() => null));
  }
  return FILES.get(file);
}
// the content of one page ("*" = header and footer)
async function loadPageIndex(path) {
  const l = await loadSiteIndex();
  if (!l) return null;
  if (path === "*") return l.shared ? loadFile(l.shared) : null;
  const p = l.by.get(path === "/" ? "/" : path.replace(/\/+$/, ""));
  return p ? loadFile(p.file) : null;
}
function usePageIndex(path) {
  const [r, setR] = ee.useState(undefined);
  ee.useEffect(() => { let dead = false; setR(undefined); loadPageIndex(path).then((x) => { if (!dead) setR(x || null); }); return () => { dead = true; }; }, [path]);
  return r; // undefined = loading, null = no index (quick build without PRERENDER)
}
// the index section for a section of the live page (same rule as findSection in src/app/cms78.jsx)
function indexSection(idx, sig) {
  if (!idx) return null;
  const [i, h] = String(sig).split("|");
  return (h && idx.sections.find((s) => s.sig.split("|")[1] === h)) || idx.sections.find((s) => s.sig.split("|")[0] === i) || null;
}

/* ---- the edit maps ---------------------------------------------------------------------------------------------- */
// texts: { "old": "new" } (every page) or { "/path": { "old": "new" } } (that page). images / links: { from: to }.
function textNow(maps, path, orig) {
  const pg = path !== "*" && maps.texts[path];
  if (pg && typeof pg === "object" && typeof pg[orig] === "string") return { to: pg[orig], where: "page" };
  if (typeof maps.texts[orig] === "string") return { to: maps.texts[orig], where: "all" };
  return null;
}
function setText(maps, path, orig, to) {
  const t = { ...maps.texts };
  const global = path === "*" || (typeof t[orig] === "string" && !(t[path] && typeof t[path] === "object" && orig in t[path]));
  if (global) {
    if (to == null || norm(to) === orig) delete t[orig]; else t[orig] = to;
  } else {
    const pg = { ...(t[path] && typeof t[path] === "object" ? t[path] : {}) };
    if (to == null || norm(to) === orig) delete pg[orig]; else pg[orig] = to;
    if (Object.keys(pg).length) t[path] = pg; else delete t[path];
  }
  return { ...maps, texts: t };
}
function setMap(maps, key, from, to) {
  const m = { ...maps[key] };
  if (to && to !== from) m[from] = to; else delete m[from];
  return { ...maps, [key]: m };
}

const SHOW = 40;
function TextRow({ orig, now, onChange }) {
  const val = now ? now.to : orig;
  const removed = now && now.to === "";
  const long = orig.length > 90;
  return (
    <div className={"adm78-txt" + (now ? " is-changed" : "") + (removed ? " is-removed" : "")}>
      {long
        ? <textarea className="adm-in" rows={Math.min(8, Math.ceil(orig.length / 90))} value={val} onChange={(e) => onChange(e.target.value)} aria-label={"Text: " + orig.slice(0, 60)} />
        : <input className="adm-in" value={val} onChange={(e) => onChange(e.target.value)} aria-label={"Text: " + orig.slice(0, 60)} />}
      <div className="adm78-txt__a">
        {now && <small className="adm-muted">{removed ? "Removed" : now.where === "all" ? "Changed on every page" : "Changed"} · was “{orig.length > 60 ? orig.slice(0, 60) + "…" : orig}”</small>}
        {!removed && <AdmBtn small kind="ghost" onClick={() => onChange("")}>Remove</AdmBtn>}
        {now && <AdmBtn small kind="ghost" onClick={() => onChange(null)}>Put back</AdmBtn>}
      </div>
    </div>
  );
}
function SectionContent({ sec, path, maps, onMaps }) {
  const [all, setAll] = ee.useState(false);
  const [q, setQ] = ee.useState("");
  if (!sec) return <p className="adm-muted">The content of this section was not found in the page list. Use “Edit its texts, pictures and links”.</p>;
  const texts = sec.texts.filter((t) => !q || t.toLowerCase().includes(q.toLowerCase()));
  const shown = all || q ? texts : texts.slice(0, SHOW);
  return (
    <div className="adm78-content">
      {sec.texts.length > 0 && <>
        <div className="adm78-content__h"><b>Texts and numbers ({sec.texts.length})</b>{sec.texts.length > 12 && <input className="adm-in adm-in--auto" placeholder="Find a text…" value={q} onChange={(e) => setQ(e.target.value)} />}</div>
        {shown.map((t) => <TextRow key={t} orig={t} now={textNow(maps, path, t)} onChange={(v) => onMaps(setText(maps, path, t, v))} />)}
        {!all && !q && texts.length > SHOW && <AdmBtn small onClick={() => setAll(true)}>Show all {texts.length} texts</AdmBtn>}
      </>}
      {sec.images.length > 0 && <>
        <div className="adm78-content__h"><b>Pictures ({sec.images.length})</b></div>
        <div className="adm78-imgs">
          {sec.images.map((im) => {
            const to = maps.images[im.src];
            return (
              <div key={im.src} className={"adm78-img" + (to ? " is-changed" : "")}>
                <img src={to || im.src} alt={im.alt} loading="lazy" />
                <small title={im.src}>{im.alt || im.src.split("/").pop().slice(0, 40)}</small>
                <div className="adm-row">
                  <AdmUploadBtn folder="site" onDone={(u) => onMaps(setMap(maps, "images", im.src, u))}>Replace</AdmUploadBtn>
                  {to && <AdmBtn small kind="ghost" onClick={() => onMaps(setMap(maps, "images", im.src, ""))}>Put back</AdmBtn>}
                </div>
              </div>
            );
          })}
        </div>
      </>}
      {sec.links.length > 0 && <>
        <div className="adm78-content__h"><b>Links and buttons ({sec.links.length})</b></div>
        {sec.links.map((l) => {
          const to = maps.links[l.href];
          return (
            <div key={l.href + "\u0001" + l.text} className={"adm78-link" + (to ? " is-changed" : "")}>
              <span>{l.text || "(picture or icon)"}</span>
              <input className="adm-in" value={to || l.href} onChange={(e) => onMaps(setMap(maps, "links", l.href, e.target.value.trim()))} aria-label={"Link: " + (l.text || l.href)} />
              {to && <AdmBtn small kind="ghost" onClick={() => onMaps(setMap(maps, "links", l.href, ""))}>Put back</AdmBtn>}
            </div>
          );
        })}
      </>}
      <p className="adm-muted adm78-content__note">A link change applies everywhere that link is used. To add something to this section, add a new section after it.</p>
    </div>
  );
}

export { SectionContent as AdmSectionContent, indexSection as admIndexSection, loadSiteIndex as admLoadSiteIndex, usePageIndex as admUsePageIndex, slug as admSlug };
