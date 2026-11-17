/*
 * Super admin, build 78: pages and sections. Any existing page: hide or restyle its sections and add new ones at any
 * place; new pages built from sections at any address and put in any menu; header and footer menus; logos; card
 * designs; forms (fields, emails, who gets alerted); legal pages; case studies per industry.
 * The website reads all of it from /api/v1/site (app/cms78.jsx, app/cmsBlocks.jsx). Nothing here changes the website's
 * code, so "Back to the original" always restores the page exactly as it was.
 */
import * as ee from 'react';
import { CMS_BLOCK_TYPES, cmsBlockType } from '../app/cmsBlockTypes.js';
import { admApi, admClone, admGet, admPut, admSame } from './api.jsx';
import { AdmBtn, AdmCard, AdmField, AdmImage, AdmStatus, AdmUploadBtn, AdmValue, admIsObj } from './Fields.jsx';
import { AdmListEditor, AdmObjectEditor } from './Content.jsx';
import { AdmSectionContent, admIndexSection, admLoadSiteIndex, admUsePageIndex } from './SiteContent.jsx';

const isObj = admIsObj;
const DEMO = typeof window !== "undefined" && !!window.__FR_ADMIN_DEMO;
const uid = () => "b" + Math.random().toString(36).slice(2, 9);
const normPath = (p) => "/" + String(p || "").trim().replace(/^https?:\/\/[^/]+/i, "").replace(/[?#].*$/, "").replace(/^\/+|\/+$/g, "").toLowerCase().replace(/[^a-z0-9/_-]+/g, "-");

/* ---- the website's pages, grouped as in the menus ------------------------------------------------------------------ */
function useSitePages() {
  const [pages, setPages] = ee.useState(null);
  ee.useEffect(() => {
    let dead = false;
    Promise.all([
      import("../app/data/site.jsx").catch(() => ({})),
      import("../data/Sampledge65.jsx").catch(() => ({})),
      import("../app/data/industries.jsx").catch(() => ({})),
      import("../app/pages/PrivacyPage.jsx").catch(() => ({})),
      admGet("custom-pages").catch(() => []),
      admLoadSiteIndex(),
      import("../data/sitePages83.js").catch(() => ({})),
    ]).then(([site, prod, ind, legal, custom, index, sp83]) => {
      if (dead) return;
      const g = [];
      g.push(["Header & footer", [["*", "Header and footer (every page)"]]]);
      g.push(["Main pages", [["/", "Home"], ["/about-us", "About us"], ["/our-journey", "Our journey"], ["/our-reach", "Our reach"], ["/connect", "QR connect"], ["/rates-reviews", "Rates & reviews"], ["/our-team", "Our team"], ["/gallery", "Gallery"], ["/careers", "Careers"], ["/lets-talk", "Let's talk"], ["/esomar-37", "ESOMAR 37"]]]);
      for (const v of site.VERTICALS || []) g.push([v.name, [["/services/" + v.slug, v.name + " (overview)"], ...(v.services || []).map((s) => ["/services/" + v.slug + "/" + s.slug, s.name])]]);
      g.push(["Government research", [["/government-opinion-research", "Government & opinion research"], ["/government-opinion-research/case-study", "Government case study"]]]);
      g.push(["Products", [["/products", "All products"], ...(prod.PR5_LIST || []).map((p) => ["/products/" + p.id, p.name])]]);
      g.push(["Portals", [["/portals", "All portals"], ...(site.PORTALS || []).map((p) => ["/portals/" + p.slug, p.name])]]);
      g.push(["Downloads", [["/downloads", "Downloads"], ["/downloads/consumer-panel-books", "Consumer panel books"], ["/downloads/business-panel-books", "Business panel books"], ["/downloads/healthcare-panel-books", "Healthcare panel books"], ["/downloads/quality-process", "Quality process"], ["/downloads/quality-process/market-research", "Quality: market research"], ["/downloads/quality-process/digital-marketing", "Quality: digital marketing"], ["/downloads/quality-process/it-development", "Quality: IT development"], ["/downloads/quality-process/accounts-finance", "Quality: accounts & finance"], ["/downloads/service-brochures", "Brochures"]]]);
      g.push(["Industries & case studies", [["/industries-case-studies", "All industries"], ...(ind.INDUSTRIES || []).map((x) => ["/industries-case-studies/" + x.slug, x.name])]]);
      g.push(["Blog", [["/blog", "Blog"]]]);
      g.push(["Legal", [["/privacy-data-protection", "Privacy & data protection"], ...(legal.LEGAL_PAGES || []).map((x) => ["/" + x.slug, x.title])]]);
      // every other page of the website (the build's page list): blog posts, sub-pages, country pages…
      if (index && index.pages) {
        const known = new Set(g.flatMap(([, l]) => l.map((x) => x[0])));
        const other = [];
        const nameOf = (p) => String(p.title || p.path).split(/\s+[|·–—]\s+/)[0].trim() || p.path;
        for (const p of index.pages) {
          if (known.has(p.path)) continue;
          const grp = p.path.startsWith("/blog/") ? g.find((x) => x[0] === "Blog")
            : p.path.startsWith("/services/") ? g.find(([, l]) => l[0] && l[0][0] === p.path.split("/").slice(0, 3).join("/"))
            : p.path.startsWith("/industries-case-studies/") ? g.find((x) => x[0] === "Industries & case studies")
            : p.path.startsWith("/downloads/") ? g.find((x) => x[0] === "Downloads")
            : p.path.startsWith("/products/") ? g.find((x) => x[0] === "Products")
            : p.path.startsWith("/portals/") ? g.find((x) => x[0] === "Portals")
            : p.path.startsWith("/government-opinion-research") ? g.find((x) => x[0] === "Government research") : null;
          (grp ? grp[1] : other).push([p.path, nameOf(p)]);
        }
        if (other.length) g.push(["Other pages", other.sort((a, b) => a[0].localeCompare(b[0]))]);
      }
      // build 83: every page of the site from data/sitePages83.js (panel countries, blog posts, case-study industries …),
      // also when the build's page list is not there
      try {
        const known = new Set(g.flatMap(([, l]) => l.map((x) => x[0])));
        for (const p of sp83.sp83Pages ? sp83.sp83Pages() : []) {
          if (known.has(p.path)) continue;
          known.add(p.path);
          let grp = g.find((x) => x[0] === p.group);
          if (!grp) { grp = [p.group, []]; g.push(grp); }
          grp[1].push([p.path, p.name]);
        }
      } catch (e) {}
      const c = Array.isArray(custom) ? custom.filter(isObj) : [];
      if (c.length) g.push(["New pages (made here)", c.map((x) => [x.path, x.title || x.path])]);
      setPages(g);
    });
    return () => { dead = true; };
  }, []);
  return pages;
}
const allPaths = (groups) => (groups || []).flatMap(([, l]) => l.map((x) => x[0]));

/* ---- one field of a section ------------------------------------------------------------------------------------------ */
function LinkInput({ value, onChange }) {
  return <input className="adm-in" list="adm-paths" value={value || ""} placeholder="/lets-talk or https://…" onChange={(e) => onChange(e.target.value)} />;
}
function FieldInput({ f, value, onChange }) {
  const [name, label, kind, extra] = f;
  void name;
  switch (kind) {
    case "area": return <textarea className="adm-in adm-ta" rows={Math.min(14, Math.max(3, String(value || "").split("\n").length + 1))} value={value || ""} onChange={(e) => onChange(e.target.value)} />;
    case "html": return <textarea className="adm-in adm-ta adm-code" rows={10} value={value || ""} onChange={(e) => onChange(e.target.value)} />;
    case "image": return <AdmImage value={value || ""} onChange={onChange} folder="site" />;
    case "link": return <LinkInput value={value} onChange={onChange} />;
    case "file": return <div className="adm-row"><input className="adm-in" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="/api/v1/files/… or https://…" /><AdmUploadBtn accept="application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip" folder="pdfs" onDone={(u) => onChange(u)}>Upload file</AdmUploadBtn></div>;
    case "number": return <input className="adm-in adm-in--num" type="number" value={value ?? ""} onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))} />;
    case "bool": return <label className="adm-sw"><input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} /><span>{value ? "Yes" : "No"}</span></label>;
    case "select": return <select className="adm-in adm-in--auto" value={value || extra[0]} onChange={(e) => onChange(e.target.value)}>{extra.map((o) => <option key={o} value={o}>{o}</option>)}</select>;
    case "lines": return <textarea className="adm-in adm-ta" rows={Math.max(3, (Array.isArray(value) ? value.length : 0) + 1)} value={Array.isArray(value) ? value.join("\n") : value || ""} onChange={(e) => onChange(e.target.value.split("\n"))} placeholder="One per line" />;
    case "list": {
      const items = Array.isArray(value) ? value : [];
      const set = (i, v) => onChange(items.map((x, j) => (j === i ? v : x)));
      const move = (i, d) => { const n = [...items]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; onChange(n); };
      return (
        <div className="adm-list">
          {items.map((it, i) => (
            <div className="adm-list__it" key={i}>
              <div className="adm-list__body">
                <AdmCard depth={1} title={(isObj(it) && (it.title || it.name || it.q || it.label || it.value || it.caption || it.alt)) || label + " " + (i + 1)} open={!it || Object.values(it).every((x) => !x)}>
                  <div className="adm-obj">{extra.map((sf) => <div className="adm-f" key={sf[0]}><span className="adm-f__l">{sf[1]}</span><div className="adm-f__v"><FieldInput f={sf} value={isObj(it) ? it[sf[0]] : ""} onChange={(v) => set(i, { ...(isObj(it) ? it : {}), [sf[0]]: v })} /></div></div>)}</div>
                </AdmCard>
              </div>
              <div className="adm-list__ctl">
                <AdmBtn small kind="ghost" title="Move up" onClick={() => move(i, -1)}>↑</AdmBtn>
                <AdmBtn small kind="ghost" title="Move down" onClick={() => move(i, 1)}>↓</AdmBtn>
                <AdmBtn small kind="ghost" title="Remove" onClick={() => onChange(items.filter((_, j) => j !== i))}>✕</AdmBtn>
              </div>
            </div>
          ))}
          <AdmBtn small onClick={() => onChange([...items, {}])}>+ Add</AdmBtn>
        </div>
      );
    }
    default: return <input className="adm-in" value={value || ""} onChange={(e) => onChange(e.target.value)} />;
  }
}

/* ---- a list of sections (new page, or new sections on an existing page) ------------------------------------------------ */
function AiFill({ block, onFill }) {
  const [busy, setBusy] = ee.useState(false), [err, setErr] = ee.useState("");
  const run = async () => {
    const brief = prompt("What should this section say? (the AI assistant writes a first draft you can edit)");
    if (!brief) return;
    setBusy(true); setErr("");
    try {
      const r = await admApi("/admin/ai/write", { body: { kind: "section", brief: brief + "\nSection type: " + block.type } });
      const d = r.data || {};
      const items = (d.items || []).map((x) => ({ title: x.t, text: x.d, q: x.t, a: x.d, value: x.t, label: x.d, name: x.t }));
      onFill({ ...block, eyebrow: d.kicker || block.eyebrow, heading: d.heading || block.heading, text: d.intro || block.text, button: d.buttonLabel || block.button, link: d.buttonLink || block.link, ...(items.length && cmsBlockType(block.type).fields.some((f) => f[0] === "items" && f[2] === "list") ? { items } : {}), ...(block.type === "checklist" && d.items ? { items: d.items.map((x) => x.t) } : {}) });
    } catch (e) { setErr(e.message); }
    setBusy(false);
  };
  return <span className="adm-up"><AdmBtn small onClick={run} disabled={busy}>{busy ? "Writing…" : "✨ Write with AI"}</AdmBtn>{err && <em className="adm-err">{err}</em>}</span>;
}
function BlockEditor({ b, onChange }) {
  const t = cmsBlockType(b.type);
  if (!t) return <p className="adm-muted">Unknown section type “{b.type}”.</p>;
  return (
    <div className="adm-obj">
      <div className="adm-row adm-row--end"><AiFill block={b} onFill={onChange} /></div>
      {t.fields.map((f) => (
        <div className="adm-f" key={f[0]}><span className="adm-f__l">{f[1]}</span><div className="adm-f__v"><FieldInput f={f} value={b[f[0]]} onChange={(v) => onChange({ ...b, [f[0]]: v })} /></div></div>
      ))}
      <div className="adm-f"><span className="adm-f__l">Anchor (for links like #pricing)</span><div className="adm-f__v"><input className="adm-in" value={b.anchor || ""} onChange={(e) => onChange({ ...b, anchor: e.target.value.replace(/[^\w-]/g, "") })} /></div></div>
    </div>
  );
}
function AddBlock({ onAdd, label = "+ Add a section" }) {
  const [t, setT] = ee.useState("");
  return (
    <div className="adm-row">
      <select className="adm-in adm-in--auto" value={t} onChange={(e) => setT(e.target.value)} aria-label="Kind of section">
        <option value="">Choose the kind of section…</option>
        {CMS_BLOCK_TYPES.map((x) => <option key={x.type} value={x.type}>{x.name}</option>)}
      </select>
      <AdmBtn kind="primary" disabled={!t} onClick={() => { onAdd({ id: uid(), type: t, show: true }); setT(""); }}>{label}</AdmBtn>
    </div>
  );
}
function BlockList({ blocks, onChange, positions }) {
  const set = (i, v) => onChange(blocks.map((x, j) => (j === i ? v : x)));
  const move = (i, d) => { const n = [...blocks]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; onChange(n); };
  return (
    <div className="adm-items">
      {blocks.map((b, i) => (
        <AdmCard key={b.id || i} open={!!b._open} cls={b.show === false ? "is-hidden" : ""}
          title={(cmsBlockType(b.type) || { name: b.type }).name + (b.heading ? ": " + b.heading : "")}
          sub={(b.show === false ? "Hidden · " : "") + (positions ? positionName(b.at, positions) : "")}
          actions={<>
            <AdmBtn small kind="ghost" title="Move up" onClick={() => move(i, -1)}>↑</AdmBtn>
            <AdmBtn small kind="ghost" title="Move down" onClick={() => move(i, 1)}>↓</AdmBtn>
            <AdmBtn small onClick={() => set(i, { ...b, show: b.show === false })}>{b.show === false ? "Show" : "Hide"}</AdmBtn>
            <AdmBtn small onClick={() => onChange([...blocks.slice(0, i + 1), { ...admClone(b), id: uid() }, ...blocks.slice(i + 1)])}>Copy</AdmBtn>
            <AdmBtn small kind="danger" onClick={() => confirm("Delete this section?") && onChange(blocks.filter((_, j) => j !== i))}>Delete</AdmBtn>
          </>}>
          {positions && (
            <AdmField label="Where on the page">
              <select className="adm-in" value={b.at || "end"} onChange={(e) => set(i, { ...b, at: e.target.value })}>
                {positions.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </AdmField>
          )}
          <BlockEditor b={b} onChange={(v) => set(i, v)} />
        </AdmCard>
      ))}
    </div>
  );
}
const positionName = (at, positions) => { const p = positions.find((x) => x[0] === (at || "end")); return p ? p[1] : at; };
const clean = (blocks) => blocks.map(({ _open, ...b }) => b);

/* ---- scan a page in a hidden frame: its sections and forms --------------------------------------------------------- */
function useScan(path, what = "sections") {
  const [res, setRes] = ee.useState(null);
  const [n, setN] = ee.useState(0);
  ee.useEffect(() => {
    if (DEMO || !path) { setRes(DEMO ? { demo: true } : null); return; }
    setRes(null);
    const f = document.createElement("iframe");
    f.className = "adm-scan"; f.setAttribute("aria-hidden", "true"); f.tabIndex = -1;
    f.src = path;
    let tries = 0, done = false, t = 0;
    const poll = () => {
      if (done) return;
      try {
        const api = f.contentWindow && f.contentWindow.__frCms78;
        const d = f.contentWindow.document;
        const ready = api && d.getElementById("main") && !d.querySelector(".page-loading");
        if (ready && tries > 6) {
          const r = api[what]();
          if ((r && r.length) || tries > 40) { done = true; setRes({ list: r || [] }); f.remove(); return; }
        }
      } catch (e) {}
      if (++tries > 60) { done = true; setRes({ list: [], err: "The page did not answer. Open it once in a new tab and try again." }); f.remove(); return; }
      t = setTimeout(poll, 250);
    };
    f.onload = () => { t = setTimeout(poll, 400); };
    document.body.appendChild(f);
    return () => { done = true; clearTimeout(t); f.remove(); };
  }, [path, n, what]);
  return [res, () => setN((x) => x + 1)];
}

/* ======================================================================================== Pages and sections */
const STYLE_FIELDS = [["bg", "Background (colour or gradient)", "#F1F4FC or linear-gradient(135deg,#0B1437,#2F6BFF)"], ["color", "Text colour", "#0B1437"], ["align", "Text align", "left / center"], ["padTop", "Space above", "40px"], ["padBottom", "Space below", "40px"], ["radius", "Rounded corners", "24px"], ["maxWidth", "Maximum width", "1100px"]];
const SWATCHES = ["#0B1437", "#2F6BFF", "#6D4AFF", "#0E9C88", "#F1F4FC", "#FFFFFF", "#FFC27A", "linear-gradient(135deg,#0B1437,#2F6BFF 60%,#6D4AFF)"];

const isMap = (x) => (isObj(x) ? x : {});
function PageDetail({ path, name, go }) {
  const shared = path === "*";
  const [blocksAll, setBlocksAll] = ee.useState(null), [secAll, setSecAll] = ee.useState(null);
  const [blocks, setBlocks] = ee.useState([]), [conf, setConf] = ee.useState({});
  const [maps, setMaps] = ee.useState(null);
  const [orig, setOrig] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const [scan, rescan] = useScan(shared ? "" : path, "sections");
  const idx = admUsePageIndex(path);
  const load = async () => {
    const [b, s, t, i, l] = await Promise.all([admGet("page-blocks"), admGet("page-sections"), admGet("texts"), admGet("images"), admGet("links")]);
    const ba = isObj(b) ? b : {}, sa = isObj(s) ? s : {};
    setBlocksAll(ba); setSecAll(sa);
    const bl = Array.isArray(ba[path]) ? ba[path] : [], c = isObj(sa[path]) ? sa[path] : {};
    const m = { texts: isMap(t), images: isMap(i), links: isMap(l) };
    setBlocks(admClone(bl)); setConf(admClone(c)); setMaps(admClone(m)); setOrig(admClone([bl, c, m]));
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, [path]);
  if (!orig || !maps) return <p className="adm-muted">Loading…</p>;
  // the live page's sections; the build's page list when the page cannot be read (offline demo, slow page)
  const live = (scan && scan.list) || [];
  const fromIdx = idx ? idx.sections.map((s) => ({ sig: s.sig, i: +s.sig.split("|")[0], title: s.title })) : [];
  const secs = shared ? fromIdx : live.length ? live : fromIdx;
  const hide = new Set(conf.hide || []);
  const style = isObj(conf.style) ? conf.style : {};
  const positions = [["start", "At the top of the page"], ...secs.flatMap((s) => [["before:" + s.sig, "Before “" + (s.title || "section " + (s.i + 1)) + "”"], ["after:" + s.sig, "After “" + (s.title || "section " + (s.i + 1)) + "”"]]), ["end", "At the end of the page"]];
  for (const b of blocks) if (b.at && !positions.some((p) => p[0] === b.at)) positions.push([b.at, "Saved place (" + b.at.replace(/^(after|before):\d+\|/, "$1 ") + ")"]);
  const setStyle = (sig, k, v) => { const st = { ...style, [sig]: { ...(style[sig] || {}), [k]: v } }; if (!v) delete st[sig][k]; if (!Object.keys(st[sig]).length) delete st[sig]; setConf({ ...conf, style: st }); };
  const toggle = (sig) => { const h = new Set(hide); h.has(sig) ? h.delete(sig) : h.add(sig); setConf({ ...conf, hide: [...h] }); };
  const mapsDirty = !admSame(maps, orig[2]);
  const dirty = mapsDirty || !admSame([clean(blocks), conf], [clean(orig[0]), orig[1]]);
  const changed = (sec) => sec && (sec.texts.some((t) => textChanged(maps, path, t)) || sec.images.some((x) => maps.images[x.src]) || sec.links.some((x) => maps.links[x.href]));
  const save = async () => {
    try {
      const jobs = [];
      if (mapsDirty) for (const k of ["texts", "images", "links"]) if (!admSame(maps[k], orig[2][k])) jobs.push(admPut(k, maps[k]));
      if (!shared) {
        const nb = { ...blocksAll }, ns = { ...secAll };
        const bl = clean(blocks);
        if (bl.length) nb[path] = bl; else delete nb[path];
        const c = { ...conf }; if (!(c.hide || []).length) delete c.hide; if (!Object.keys(c.style || {}).length) delete c.style; if (!c.css) delete c.css;
        if (Object.keys(c).length) ns[path] = c; else delete ns[path];
        if (!admSame(bl, clean(orig[0]))) jobs.push(admPut("page-blocks", nb));
        if (!admSame(c, orig[1])) jobs.push(admPut("page-sections", ns));
      }
      await Promise.all(jobs);
      setMsg({ ok: "Saved. The website shows it on the next page load." }); await load(); if (!shared) rescan();
    } catch (e) { setMsg({ err: e.message }); }
  };
  const content = (s) => <AdmSectionContent sec={admIndexSection(idx, s.sig)} path={path} maps={maps} onMaps={setMaps} />;
  return (
    <div className="adm78-page">
      <header className="adm-sec__h"><h2>{name} <small className="adm-muted">{shared ? "on every page" : path}</small></h2>
        {!shared && <div className="adm-row">
          <a className="adm-btn" href={path} target="_blank" rel="noreferrer">Open the page ↗</a>
          <AdmBtn onClick={() => { try { sessionStorage.setItem("adm-edit-path", path); } catch (e) {} go("edit"); }}>Edit on the page</AdmBtn>
        </div>}
      </header>

      <div className="adm-panel">
        <h3>{shared ? "Header and footer" : "The page's sections"} ({secs.length})</h3>
        <p className="adm-muted">{shared
          ? "Every text, link and picture of the menu bar and the footer, shown on every page. Change or remove any of them; the menus themselves are under Header & footer menus."
          : "Every section of this page as the website shows it, with all its texts, numbers, pictures and links. Open a section to change or remove anything in it, hide the whole section, give it new colours or spacing, or add a new section next to it."}</p>
        {idx === null && !live.length && scan && (scan.demo || scan.err) && <p className="adm-muted">The list of this page's content is made when the website is built with search-engine pages (PRERENDER=1). {scan.err}</p>}
        {!secs.length && (idx === undefined || (!scan && !shared)) && <p className="adm-muted">Reading the page…</p>}
        <ol className="adm78-secs">
          {secs.map((s) => {
            const st = style[s.sig] || {};
            const isec = admIndexSection(idx, s.sig);
            const sub = [hide.has(s.sig) ? "Hidden on the website" : "", Object.keys(st).length ? "Restyled" : "", changed(isec) ? "Content changed" : "", isec ? isec.texts.length + " texts · " + isec.images.length + " pictures · " + isec.links.length + " links" : ""].filter(Boolean).join(" · ");
            return (
              <li key={s.sig} className={hide.has(s.sig) ? "is-hidden" : ""}>
                <AdmCard title={(shared ? "" : (s.i + 1) + ". ") + (s.title || "(section without a heading)")} sub={sub}
                  actions={shared ? null : <>
                    <AdmBtn small onClick={() => toggle(s.sig)}>{hide.has(s.sig) ? "Show" : "Hide"}</AdmBtn>
                    <AdmBtn small onClick={() => setBlocks([...blocks, { id: uid(), type: "text", show: true, at: "after:" + s.sig, _open: true }])}>+ Section after</AdmBtn>
                  </>}>
                  {content(s)}
                  {!shared && <details className="adm78-style">
                    <summary>Colours and spacing of this section</summary>
                    <div className="adm-obj">
                      {STYLE_FIELDS.map(([k, l, ph]) => (
                        <div className="adm-f" key={k}><span className="adm-f__l">{l}</span>
                          <div className="adm-f__v">
                            <input className="adm-in" value={st[k] || ""} placeholder={ph} onChange={(e) => setStyle(s.sig, k, e.target.value)} />
                            {(k === "bg" || k === "color") && <div className="adm78-sw">{SWATCHES.filter((c) => k === "bg" || !c.startsWith("linear")).map((c) => <button key={c} type="button" title={c} style={{ background: c }} onClick={() => setStyle(s.sig, k, c)} />)}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </details>}
                </AdmCard>
              </li>
            );
          })}
        </ol>
        {!shared && !!live.length && <AdmBtn small kind="ghost" onClick={rescan}>Read the page again</AdmBtn>}
      </div>

      {!shared && <div className="adm-panel">
        <h3>New sections on this page ({blocks.length})</h3>
        <p className="adm-muted">Sections you add appear in the site's colours and fonts, in light and dark mode, on phones and desktops.</p>
        <BlockList blocks={blocks} onChange={setBlocks} positions={positions} />
        <AddBlock onAdd={(b) => setBlocks([...blocks, { ...b, at: "end", _open: true }])} />
      </div>}

      {!shared && <details className="adm-panel">
        <summary><b>Advanced: own CSS for this page</b></summary>
        <p className="adm-muted">For designers. Applies to this page only. Scripts and HTML are not allowed.</p>
        <textarea className="adm-in adm-ta adm-code" rows={8} value={conf.css || ""} onChange={(e) => setConf({ ...conf, css: e.target.value })} placeholder=".my-class{ color:#2F6BFF }" />
      </details>}

      <div className="adm-save">
        <AdmBtn kind="primary" onClick={save} disabled={!dirty}>Save and publish</AdmBtn>
        <AdmBtn onClick={() => { setBlocks(admClone(orig[0])); setConf(admClone(orig[1])); setMaps(admClone(orig[2])); }} disabled={!dirty}>Discard edits</AdmBtn>
        <AdmStatus s={msg} />
      </div>
    </div>
  );
}
const textChanged = (maps, path, t) => { const pg = maps.texts[path]; return (isObj(pg) && typeof pg[t] === "string") || typeof maps.texts[t] === "string"; };

function Pages({ go }) {
  const groups = useSitePages();
  // build 83: "All website pages" opens a page here with ?page=/address
  const [sel, setSel] = ee.useState(() => { try { const p = new URLSearchParams(location.search).get("page"); return p ? [p, p] : null; } catch (e) { return null; } });
  const [q, setQ] = ee.useState("");
  if (!groups) return <section className="adm-sec"><h1>Pages & sections</h1><p className="adm-muted">Loading…</p></section>;
  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>Pages & sections</h1><AdmBtn kind="primary" onClick={() => go("new-pages")}>+ New page</AdmBtn></header>
      <p className="adm-muted">Every page of the website ({allPaths(groups).length}), grouped as in the menus. Open one to see all of its content section by section: change or remove any text, number, picture or link, hide or restyle a section, or add new sections (text, pictures, cards, numbers, FAQs, video, forms, plans, tables…) anywhere on the page.</p>
      <div className="adm-cols adm-cols--side">
        <div className="adm78-map">
          <input className="adm-in" placeholder="Find a page…" value={q} onChange={(e) => setQ(e.target.value)} />
          {groups.map(([g, list]) => {
            const l = list.filter(([p, n]) => !q || (p + n).toLowerCase().includes(q.toLowerCase()));
            if (!l.length) return null;
            return (
              <details key={g} open={(!!q && l.length < 60) || g === "Main pages" || g === "Header & footer"}>
                <summary>{g} <small>({l.length})</small></summary>
                <ul>{l.map(([p, n]) => <li key={p}><button type="button" className={sel && sel[0] === p ? "is-on" : ""} onClick={() => setSel([p, n])}>{n}<small>{p}</small></button></li>)}</ul>
              </details>
            );
          })}
        </div>
        <div>{sel ? <PageDetail key={sel[0]} path={sel[0]} name={sel[1]} go={go} /> : <p className="adm-muted adm78-pick">← Choose a page.</p>}</div>
      </div>
      <PathList groups={groups} />
    </section>
  );
}
const PathList = ({ groups }) => <datalist id="adm-paths">{allPaths(groups).filter((p) => p !== "*").map((p) => <option key={p} value={p} />)}</datalist>;

/* ======================================================================================== New pages */
const MENUS = [
  ["menu-main", "Main menu bar", (p) => ({ to: p.path, label: p.menuLabel || p.title })],
  ["menu-about", "About menu", (p) => ({ to: p.path, t: p.menuLabel || p.title, d: p.description || "" })],
  ["menu-downloads", "Downloads menu", (p) => ({ k: p.path.replace(/^\//, "").replace(/\//g, "-"), to: p.path, t: p.menuLabel || p.title })],
  ["footer-company", "Footer: Company", (p) => ({ to: p.path, t: p.menuLabel || p.title })],
  ["footer-start", "Footer: Get started", (p) => ({ to: p.path, t: p.menuLabel || p.title })],
  ["footer-legal", "Footer: legal links", (p) => ({ to: p.path, t: p.menuLabel || p.title })],
];
const SVC_MENUS = [["market-research", "Market Research"], ["digital-marketing", "Digital Marketing"], ["it-development", "IT & Development"], ["accounts-finance", "Accounts & Finance"]];

// put a page in a menu or take it out (the menu lists keep the admin's other changes)
async function setInMenus(page, wanted, oldPath) {
  for (const [key, , make] of MENUS) {
    const o = (await admGet(key)) || {};
    const add = (Array.isArray(o.add) ? o.add : []).filter((x) => !(isObj(x) && (x.to === page.path || (oldPath && x.to === oldPath))));
    if (wanted.includes(key)) add.push(make(page));
    if (!admSame(add, o.add || [])) await admPut(key, { ...o, add });
  }
  const m = (await admGet("menus")) || {};
  let ch = false;
  for (const [slug] of SVC_MENUS) {
    const k = "services:" + slug;
    const l = (Array.isArray(m[k]) ? m[k] : []).filter((x) => !(isObj(x) && (x.to === page.path || (oldPath && x.to === oldPath))));
    if (wanted.includes(k)) l.push({ name: page.menuLabel || page.title, to: page.path, desc: page.description || "" });
    if (!admSame(l, m[k] || [])) { m[k] = l; ch = true; }
  }
  if (ch) await admPut("menus", m);
}

function NewPages() {
  const groups = useSitePages();
  const [list, setList] = ee.useState(null), [orig, setOrig] = ee.useState(null);
  const [menus, setMenus] = ee.useState({});
  const [msg, setMsg] = ee.useState(null);
  const load = async () => {
    const l = (await admGet("custom-pages")) || [];
    const arr = Array.isArray(l) ? l.filter(isObj) : [];
    setList(admClone(arr).map((p) => ({ ...p, _was: p.path }))); setOrig(admClone(arr));
    // which menus each page is in
    const inM = {};
    for (const [key] of MENUS) { const o = (await admGet(key)) || {}; for (const x of o.add || []) if (isObj(x) && x.to) (inM[x.to] ||= []).push(key); }
    const m = (await admGet("menus")) || {};
    for (const [k, l2] of Object.entries(m)) for (const x of Array.isArray(l2) ? l2 : []) if (isObj(x) && x.to) (inM[x.to] ||= []).push(k);
    setMenus(inM);
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);
  if (!list) return <section className="adm-sec"><h1>New pages</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const mine = new Set(orig.map((x) => x.path));
  const taken = new Set(allPaths(groups).filter((p) => !mine.has(p)));
  const upd = (i, v) => setList(list.map((x, j) => (j === i ? v : x)));
  const add = () => {
    const title = prompt("Title of the new page:");
    if (!title) return;
    let path = normPath("/" + title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
    if (taken.has(path) || list.some((x) => x.path === path)) path = path + "-2";
    setList([{ path, title, description: "", show: true, menuIn: [], blocks: [{ id: uid(), type: "hero", heading: title, design: "gradient", show: true }, { id: uid(), type: "text", show: true }], _open: true }, ...list]);
  };
  const save = async () => {
    for (const p of list) {
      if (!/^\/[a-z0-9][a-z0-9/_-]*$/.test(p.path)) return setMsg({ err: "“" + (p.title || p.path) + "”: the address must start with / and use a-z, 0-9 and -." });
      if (taken.has(p.path)) return setMsg({ err: "“" + p.path + "” is already a page of the website. Choose another address, or add sections to that page under Pages & sections." });
    }
    if (new Set(list.map((p) => p.path)).size !== list.length) return setMsg({ err: "Two new pages have the same address." });
    try {
      const out = list.map(({ _open, menuIn, _was, ...p }) => ({ ...p, blocks: clean(p.blocks || []) }));
      await admPut("custom-pages", out);
      // menus: what was ticked, and a page that moved to a new address moves in its menus too
      for (const p of list) {
        const moved = p._was && p._was !== p.path;
        if (Array.isArray(p.menuIn) || moved) await setInMenus(p, Array.isArray(p.menuIn) ? p.menuIn : menus[p._was] || [], moved ? p._was : null);
      }
      for (const o of orig) if (!list.some((p) => p.path === o.path)) await setInMenus(o, []);
      setMsg({ ok: "Saved. The pages are live; menus show them on the next page load." }); await load();
    } catch (e) { setMsg({ err: e.message }); }
  };
  const dirty = !admSame(list.map(({ _open, _was, menuIn, ...p }) => p), orig) || list.some((p) => Array.isArray(p.menuIn));
  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>New pages</h1><AdmBtn kind="primary" onClick={add}>+ New page</AdmBtn></header>
      <p className="adm-muted">Build a page from sections at any address (for example /offers/diwali) and put it in any menu: header, About, Downloads, a service area's menu or the footer. It uses the site's own header, footer, colours and dark mode.</p>
      <div className="adm-items">
        {list.map((p, i) => {
          const inM = Array.isArray(p.menuIn) ? p.menuIn : menus[p._was || p.path] || [];
          const setM = (k, on) => upd(i, { ...p, menuIn: on ? [...new Set([...inM, k])] : inM.filter((x) => x !== k) });
          return (
            <AdmCard key={i} open={!!p._open} cls={p.show === false ? "is-hidden" : ""} title={p.title || p.path} sub={p.path + (p.show === false ? " · Hidden" : "") + (inM.length ? " · In " + inM.length + " menu(s)" : "")}
              actions={<>
                <a className="adm-btn adm-btn--sm" href={p.path} target="_blank" rel="noreferrer">Open ↗</a>
                <AdmBtn small onClick={() => upd(i, { ...p, show: p.show === false })}>{p.show === false ? "Show" : "Hide"}</AdmBtn>
                <AdmBtn small kind="danger" onClick={() => confirm("Delete the page " + p.path + "?") && setList(list.filter((_, j) => j !== i))}>Delete</AdmBtn>
              </>}>
              <div className="adm-obj">
                <div className="adm-f"><span className="adm-f__l">Title</span><div className="adm-f__v"><input className="adm-in" value={p.title || ""} onChange={(e) => upd(i, { ...p, title: e.target.value })} /></div></div>
                <div className="adm-f"><span className="adm-f__l">Address</span><div className="adm-f__v"><input className="adm-in" value={p.path} onChange={(e) => upd(i, { ...p, path: normPath(e.target.value) })} />{taken.has(p.path) && <em className="adm-err">This address is already a page.</em>}</div></div>
                <div className="adm-f"><span className="adm-f__l">Description (Google, and under the title)</span><div className="adm-f__v"><textarea className="adm-in adm-ta" rows={2} value={p.description || ""} onChange={(e) => upd(i, { ...p, description: e.target.value })} /></div></div>
                <div className="adm-f"><span className="adm-f__l">Title in Google (optional)</span><div className="adm-f__v"><input className="adm-in" value={p.seoTitle || ""} onChange={(e) => upd(i, { ...p, seoTitle: e.target.value })} /></div></div>
                <div className="adm-f"><span className="adm-f__l">Name in the menu (optional)</span><div className="adm-f__v"><input className="adm-in" value={p.menuLabel || ""} onChange={(e) => upd(i, { ...p, menuLabel: e.target.value })} /></div></div>
                <div className="adm-f"><span className="adm-f__l">Show in these menus</span><div className="adm-f__v adm78-checks">
                  {MENUS.map(([k, l]) => <label key={k} className="adm-sw"><input type="checkbox" checked={inM.includes(k)} onChange={(e) => setM(k, e.target.checked)} /><span>{l}</span></label>)}
                  {SVC_MENUS.map(([s, l]) => <label key={s} className="adm-sw"><input type="checkbox" checked={inM.includes("services:" + s)} onChange={(e) => setM("services:" + s, e.target.checked)} /><span>Services menu: {l}</span></label>)}
                </div></div>
              </div>
              <h3>Sections</h3>
              <BlockList blocks={p.blocks || []} onChange={(b) => upd(i, { ...p, blocks: b })} />
              <AddBlock onAdd={(b) => upd(i, { ...p, blocks: [...(p.blocks || []), { ...b, _open: true }] })} />
            </AdmCard>
          );
        })}
        {!list.length && <p className="adm-muted">No new pages yet.</p>}
      </div>
      <div className="adm-save">
        <AdmBtn kind="primary" onClick={save} disabled={!dirty}>Save and publish</AdmBtn>
        <AdmBtn onClick={() => setList(admClone(orig).map((p) => ({ ...p, _was: p.path })))} disabled={!dirty}>Discard edits</AdmBtn>
        <AdmStatus s={msg} />
      </div>
      <PathList groups={groups} />
    </section>
  );
}

/* ======================================================================================== Header & footer menus */
const MENU_TABS = [
  ["menu-main", "Main menu bar", "The items along the top of every page. Items with a dropdown (About, Services, Downloads…) keep their dropdown."],
  ["menu-about", "About menu", "The About dropdown: name (t), description (d) and address (to)."],
  ["menu-downloads", "Downloads menu", "The Downloads dropdown. For a new item give an address (to)."],
  ["footer-company", "Footer: Company", ""],
  ["footer-start", "Footer: Get started", ""],
  ["footer-legal", "Footer: legal", ""],
  ["services", "Service menus", "Extra links under each service area, in the Services dropdown, the phone menu and the footer."],
];
function ServiceMenus() {
  const [m, setM] = ee.useState(null), [orig, setOrig] = ee.useState(null), [msg, setMsg] = ee.useState(null);
  const load = async () => { const o = (await admGet("menus")) || {}; setM(admClone(o)); setOrig(admClone(o)); };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);
  if (!m) return <p className="adm-muted">Loading…</p>;
  const ITEM = [["name", "Name", "text"], ["to", "Address", "link"], ["desc", "Short description", "text"], ["show", "Show", "bool"]];
  return (
    <>
      {SVC_MENUS.map(([s, l]) => (
        <div className="adm-panel" key={s}><h3>{l}</h3>
          <FieldInput f={["items", "Link", "list", ITEM]} value={m["services:" + s] || []} onChange={(v) => setM({ ...m, ["services:" + s]: v.map((x) => ({ show: true, ...x })) })} />
        </div>
      ))}
      <div className="adm-save">
        <AdmBtn kind="primary" disabled={admSame(m, orig)} onClick={async () => { try { await admPut("menus", m); setMsg({ ok: "Saved." }); await load(); } catch (e) { setMsg({ err: e.message }); } }}>Save and publish</AdmBtn>
        <AdmStatus s={msg} />
      </div>
    </>
  );
}
function Menus() {
  const [tab, setTab] = ee.useState("menu-main");
  const t = MENU_TABS.find((x) => x[0] === tab);
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Header & footer menus</h1></header>
      <p className="adm-muted">Rename, hide, reorder or add menu items. A new page can also be put in a menu from New pages. Changes show on the next page load.</p>
      <div className="adm-seg adm78-tabs" role="tablist">{MENU_TABS.map(([k, l]) => <button key={k} type="button" role="tab" aria-selected={tab === k} className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>{l}</button>)}</div>
      {tab === "services" ? <ServiceMenus /> : <AdmListEditor key={tab} ckey={tab} title={t[1]} intro={t[2]} />}
    </section>
  );
}

/* ======================================================================================== Logos */
// the logo as the website draws it now (the original artwork; an uploaded logo replaces it)
function LogoNow({ k, mods }) {
  if (!mods) return null;
  const { L, P } = mods;
  let el = null;
  try {
    if (k === "header") el = <span className="adm78-logo"><L.FRL_FR kind="head" calm tilt={0} /></span>;
    else if (k === "footer") el = <span className="adm78-logo adm78-logo--dark"><L.FRL_FR kind="full" calm dark /></span>;
    else if (k === "favicon") el = <span className="adm78-logo"><img src="/favicon.png" alt="" width="40" height="40" /></span>;
    else if (k.startsWith("portal:")) el = <span className="adm78-logo"><L.FRL_Plate k={k.slice(7)} h={48} calm /></span>;
    else if (k.startsWith("product:")) { const pr = (P.PR5_LIST || []).find((x) => x.id === k.slice(8)); if (pr && P.PR5_Logo) el = <span className="adm78-logo"><P.PR5_Logo p={pr} v="mark" still /></span>; }
  } catch (e) { el = null; }
  return el ? <div className="adm78-logonow"><small className="adm-muted">On the website now:</small>{el}</div> : <small className="adm-muted">On the website now: the animated drawn logo</small>;
}
function Logos() {
  const [L, setL] = ee.useState(null), [orig, setOrig] = ee.useState(null), [msg, setMsg] = ee.useState(null);
  const [spots, setSpots] = ee.useState([]), [mods, setMods] = ee.useState(null);
  const load = async () => { const o = (await admGet("logos")) || {}; setL(admClone(o)); setOrig(admClone(o)); };
  ee.useEffect(() => {
    load().catch((e) => setMsg({ err: e.message }));
    Promise.all([import("../app/data/site.jsx").catch(() => ({})), import("../data/Sampledge65.jsx").catch(() => ({})), import("../components/site/Logos13.jsx").catch(() => ({})), import("../components/site/PR5Logo.jsx").catch(() => ({}))]).then(([s, p, lg, pl]) => {
      setSpots([
        ["header", "Header logo (every page)"], ["footer", "Footer logo"], ["favicon", "Browser tab icon (favicon, square PNG)"], ["sampledge", "Sampledge orb logo (products page)"],
        ...(s.PORTALS || []).map((x) => ["portal:" + x.slug, "Portal: " + x.name]),
        ...(p.PR5_LIST || []).map((x) => ["product:" + x.id, "Product: " + x.name]),
      ]);
      if (lg.FRL_FR) setMods({ L: lg, P: { ...pl, PR5_LIST: p.PR5_LIST } });
    });
  }, []);
  if (!L) return <section className="adm-sec"><h1>Logos</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Logos</h1></header>
      <p className="adm-muted">Every logo on the website, as it shows now. Upload a new one to replace it; remove the upload and the original logo comes back. Use SVG or a transparent PNG; it is scaled to the same size as the original. Certification logos are under Certifications, the email logo under Email templates.</p>
      <div className="adm-panel adm-obj">
        {spots.map(([k, l]) => <div className="adm-f" key={k}><span className="adm-f__l">{l}</span><div className="adm-f__v">{!L[k] && <LogoNow k={k} mods={mods} />}<AdmImage value={L[k] || ""} folder="logos" onChange={(v) => { const n = { ...L }; if (v) n[k] = v; else delete n[k]; setL(n); }} /></div></div>)}
      </div>
      <div className="adm-save">
        <AdmBtn kind="primary" disabled={admSame(L, orig)} onClick={async () => { try { await admPut("logos", L); setMsg({ ok: "Saved. The new logos show on the next page load." }); await load(); } catch (e) { setMsg({ err: e.message }); } }}>Save and publish</AdmBtn>
        <AdmStatus s={msg} />
      </div>
    </section>
  );
}

/* ======================================================================================== Card designs */
const BLOG_TPL = [["default", "As built (default)"], ["glass", "Glass"], ["minimal", "Minimal"], ["bordered", "Bold border"], ["horizontal", "Picture left"], ["overlay", "Text over picture"], ["magazine", "Magazine grid"], ["navy", "Navy"]];
const CASE_TPL = [["default", "Tickets (default)"], ["cards", "Card grid"], ["glass", "Glass"], ["minimal", "Minimal list"], ["bordered", "Bold border"], ["navy", "Navy"]];
function CardDesigns() {
  const [t, setT] = ee.useState(null), [orig, setOrig] = ee.useState(null), [msg, setMsg] = ee.useState(null), [posts, setPosts] = ee.useState([]);
  const load = async () => { const o = (await admGet("card-templates")) || {}; setT(admClone(o)); setOrig(admClone(o)); };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); import("../app/data/blogPosts.jsx").then((m) => setPosts(m.BLOG_POSTS || [])).catch(() => {}); }, []);
  if (!t) return <section className="adm-sec"><h1>Card designs</h1><p className="adm-muted">Loading…</p></section>;
  const per = isObj(t.posts) ? t.posts : {};
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Blog & case study card designs</h1></header>
      <p className="adm-muted">Pick how the cards on the blog page and the case study lists look. One post can also get its own design. Designers can add their own design with CSS.</p>
      <div className="adm-panel adm-obj">
        <div className="adm-f"><span className="adm-f__l">Blog cards</span><div className="adm-f__v"><div className="adm78-tpls">{BLOG_TPL.map(([k, l]) => <button type="button" key={k} className={"adm78-tpl t-" + k + ((t.blog || "default") === k ? " is-on" : "")} onClick={() => setT({ ...t, blog: k })}><i aria-hidden="true"><b /><s /><s /></i>{l}</button>)}</div></div></div>
        <div className="adm-f"><span className="adm-f__l">Case study cards</span><div className="adm-f__v"><div className="adm78-tpls">{CASE_TPL.map(([k, l]) => <button type="button" key={k} className={"adm78-tpl t-" + k + ((t.cases || "default") === k ? " is-on" : "")} onClick={() => setT({ ...t, cases: k })}><i aria-hidden="true"><b /><s /><s /></i>{l}</button>)}</div></div></div>
      </div>
      <div className="adm-panel">
        <h3>One post, its own design</h3>
        <div className="adm-table"><table><tbody>
          {Object.entries(per).map(([s, v]) => <tr key={s}><td>{(posts.find((p) => p.slug === s) || { title: s }).title}</td><td><select className="adm-in adm-in--auto" value={v} onChange={(e) => setT({ ...t, posts: { ...per, [s]: e.target.value } })}>{BLOG_TPL.filter((x) => x[0] !== "default" && x[0] !== "magazine").map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></td><td><AdmBtn small kind="ghost" onClick={() => { const n = { ...per }; delete n[s]; setT({ ...t, posts: n }); }}>✕</AdmBtn></td></tr>)}
        </tbody></table></div>
        <select className="adm-in" value="" onChange={(e) => e.target.value && setT({ ...t, posts: { ...per, [e.target.value]: "glass" } })}><option value="">+ Give a post its own design…</option>{posts.filter((p) => !per[p.slug]).map((p) => <option key={p.slug} value={p.slug}>{p.title}</option>)}</select>
      </div>
      <details className="adm-panel">
        <summary><b>Your own design (CSS)</b></summary>
        <p className="adm-muted">Write CSS for a new design and pick its name above with the same words, e.g. <code>html[data-cms-blog=mine] .bcard{"{…}"}</code> or <code>.bcard[data-cms-card=mine]{"{…}"}</code>. Blog cards are <code>.bcard</code>, case study cards <code>.in6-tik</code>.</p>
        <div className="adm-row"><input className="adm-in" placeholder="Name of your design (a-z)" value={t.ownName || ""} onChange={(e) => setT({ ...t, ownName: e.target.value.replace(/[^a-z0-9-]/g, "") })} />{t.ownName && <><AdmBtn small onClick={() => setT({ ...t, blog: t.ownName })}>Use for blog</AdmBtn><AdmBtn small onClick={() => setT({ ...t, cases: t.ownName })}>Use for case studies</AdmBtn></>}</div>
        <textarea className="adm-in adm-ta adm-code" rows={10} value={t.css || ""} onChange={(e) => setT({ ...t, css: e.target.value })} />
      </details>
      <div className="adm-save">
        <AdmBtn kind="primary" disabled={admSame(t, orig)} onClick={async () => { try { await admPut("card-templates", t); setMsg({ ok: "Saved." }); await load(); } catch (e) { setMsg({ err: e.message }); } }}>Save and publish</AdmBtn>
        <a className="adm-btn adm-btn--ghost" href="/blog" target="_blank" rel="noreferrer">See the blog ↗</a>
        <AdmStatus s={msg} />
      </div>
    </section>
  );
}

/* ======================================================================================== Forms */
const FORM_LIST = [
  ["lets-talk", "Let's talk (contact page)", "/lets-talk"],
  ["mr-enquiry", "Market Research service pages", "/services/market-research/research-consultancy"],
  ["dm-enquiry", "Digital Marketing service pages", "/services/digital-marketing"],
  ["it-enquiry", "IT & Development service pages", "/services/it-development"],
  ["af-enquiry", "Accounts & Finance service pages", "/services/accounts-finance"],
  ["gov-brief", "Government research brief", "/government-opinion-research"],
  ["download", "Download forms (brochures, quality process)", "/downloads"],
  ["panel-download", "Panel book download", "/downloads/consumer-panel-books/india"],
  ["case-study", "Case study download", "/industries-case-studies"],
  ["careers", "Careers application (goes to SampCrew too)", "/careers"],
  ["chat", "Live chat start", "/"],
  ["review", "Rate & review", "/rates-reviews"],
  ["newsletter", "Newsletter sign-up", ""],
];
const FIELD_ITEM = [["label", "Label", "text"], ["type", "Type", "select", ["text", "textarea", "email", "tel", "number", "date", "url", "select", "checkbox"]], ["options", "Choices (select, one per line)", "lines"], ["required", "Required", "bool"], ["placeholder", "Placeholder", "text"]];
function FormDetail({ fkey, path, conf, mail, onConf, onMail, templates, stats }) {
  const [scan, rescan] = useScan(path, "forms");
  const found = ((scan && scan.list) || []).filter((f) => f.key === fkey);
  const fields = [...new Set(found.flatMap((f) => f.fields))];
  const hide = new Set(conf.hide || []), labels = isObj(conf.labels) ? conf.labels : {};
  return (
    <div className="adm-obj">
      <p className="adm-muted">{stats ? `${stats.submissions} submissions from ${stats.people} people.` : "No submissions yet."}</p>
      <h3>Fields on the website</h3>
      {path ? (
        <>
          {!scan && <p className="adm-muted">Reading the form…</p>}
          {scan && scan.demo && <p className="adm-muted">On the real server the form's fields are listed here, to hide or rename.</p>}
          {scan && !scan.demo && !fields.length && <p className="adm-muted">This form opens after a click or shows its fields step by step, so they cannot be listed here. Type a field's label below, as the website shows it, to hide or rename it. <AdmBtn small onClick={rescan}>Read again</AdmBtn></p>}
          {!!fields.length && <div className="adm-table"><table><thead><tr><th>Field</th><th>Show</th><th>New label</th></tr></thead><tbody>
            {fields.map((f) => <tr key={f} className={hide.has(f) ? "is-hidden" : ""}><td>{f}</td>
              <td><input type="checkbox" checked={!hide.has(f)} onChange={(e) => { const h = new Set(hide); e.target.checked ? h.delete(f) : h.add(f); onConf({ ...conf, hide: [...h] }); }} aria-label={"Show " + f} /></td>
              <td><input className="adm-in" value={labels[f] || ""} placeholder={f} onChange={(e) => { const n = { ...labels, [f]: e.target.value }; if (!e.target.value) delete n[f]; onConf({ ...conf, labels: n }); }} /></td></tr>)}
          </tbody></table></div>}
          <div className="adm-f"><span className="adm-f__l">Hide these fields (labels, one per line)</span><div className="adm-f__v"><FieldInput f={["hide", "", "lines"]} value={conf.hide || []} onChange={(v) => onConf({ ...conf, hide: v.map((x) => x.trim()).filter((x, i, a) => x || i === a.length - 1) })} /></div></div>
          <div className="adm-f"><span className="adm-f__l">Rename fields</span><div className="adm-f__v"><FieldInput f={["labels", "Field", "list", [["from", "Label on the website", "text"], ["to", "New label", "text"]]]} value={Object.entries(labels).map(([from, to]) => ({ from, to }))} onChange={(v) => onConf({ ...conf, labels: Object.fromEntries(v.map((x) => [x.from || "", x.to || ""]).filter(([a]) => a !== undefined)) })} /></div></div>
          <p className="adm-muted">Required fields and the email field cannot be hidden, so every lead can still be answered.</p>
        </>
      ) : <p className="adm-muted">The newsletter sign-up asks for name, email and consent.</p>}
      <h3>Extra fields</h3>
      <FieldInput f={["add", "Field", "list", FIELD_ITEM]} value={conf.add || []} onChange={(v) => onConf({ ...conf, add: v })} />
      <h3>Emails for this form</h3>
      <div className="adm-f"><span className="adm-f__l">Send the instant reply</span><div className="adm-f__v"><label className="adm-sw"><input type="checkbox" checked={mail.autoReply !== false} onChange={(e) => onMail({ ...mail, autoReply: e.target.checked })} /><span>{mail.autoReply !== false ? "Yes" : "No"}</span></label></div></div>
      <div className="adm-f"><span className="adm-f__l">Reply template</span><div className="adm-f__v"><select className="adm-in" value={mail.replyTemplate || ""} onChange={(e) => onMail({ ...mail, replyTemplate: e.target.value })}><option value="">Automatic (by form and service)</option>{templates.map((t) => <option key={t.id} value={t.id}>{t.name || t.id}</option>)}</select></div></div>
      <div className="adm-f"><span className="adm-f__l">Also alert (emails, comma separated)</span><div className="adm-f__v"><input className="adm-in" value={mail.notify || ""} placeholder="sales@frequentresearch.com, …" onChange={(e) => onMail({ ...mail, notify: e.target.value })} /></div></div>
    </div>
  );
}
function Forms({ go }) {
  const [forms, setForms] = ee.useState(null), [mail, setMail] = ee.useState(null), [orig, setOrig] = ee.useState(null);
  const [templates, setTemplates] = ee.useState([]), [stats, setStats] = ee.useState({}), [msg, setMsg] = ee.useState(null);
  const load = async () => {
    const [f, m] = await Promise.all([admGet("forms"), admGet("forms-mail")]);
    const fo = isObj(f) ? f : {}, mo = isObj(m) ? m : {};
    setForms(admClone(fo)); setMail(admClone(mo)); setOrig(admClone([fo, mo]));
  };
  ee.useEffect(() => {
    load().catch((e) => setMsg({ err: e.message }));
    admApi("/admin/mail/templates").then((j) => setTemplates(j.templates || [])).catch(() => {});
    admApi("/admin/marketing/stats").then((j) => setStats(Object.fromEntries((j.forms || []).map((x) => [x.form, x])))).catch(() => {});
  }, []);
  if (!forms) return <section className="adm-sec"><h1>Forms</h1><AdmStatus s={msg} /><p className="adm-muted">Loading…</p></section>;
  const fc = isObj(forms.forms) ? forms.forms : {};
  const extraKeys = Object.keys(fc).concat(Object.keys(mail)).filter((k) => !FORM_LIST.some((x) => x[0] === k));
  const list = [...FORM_LIST, ...[...new Set(extraKeys)].map((k) => [k, k.replace(/^other:/, "Form on "), k.startsWith("other:") ? k.slice(6) : ""])];
  const dirty = !admSame([forms, mail], orig);
  const save = async () => {
    try {
      const m = {};
      for (const [k, v] of Object.entries(mail)) { const o = { ...v }; if (o.notify) o.notify = String(o.notify).split(/[\s,;]+/).filter(Boolean).join(", "); if (Object.values(o).some((x) => x !== "" && x != null)) m[k] = o; }
      const fo = admClone(forms);
      for (const c of Object.values(isObj(fo.forms) ? fo.forms : {})) {
        if (Array.isArray(c.hide)) c.hide = c.hide.map((x) => String(x).trim()).filter(Boolean);
        if (isObj(c.labels)) c.labels = Object.fromEntries(Object.entries(c.labels).filter(([a, b]) => a.trim() && String(b).trim()));
        if (Array.isArray(c.add)) c.add = c.add.filter((x) => isObj(x) && x.label);
      }
      await Promise.all([admPut("forms", fo), admPut("forms-mail", m)]);
      setMsg({ ok: "Saved. Forms change on the next page load; emails follow at once." }); await load();
    } catch (e) { setMsg({ err: e.message }); }
  };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Forms</h1><AdmBtn onClick={() => go("leads")}>See every submission →</AdmBtn></header>
      <p className="adm-muted">Every form on the website. Add fields, hide or rename fields, choose the email each form sends and who in the team is alerted. Answers to extra fields are saved with the lead and shown in Leads.</p>
      <div className="adm-items">
        {list.map(([k, name, path]) => (
          <AdmCard key={k} title={name} sub={(stats[k] ? stats[k].people + " people · " : "") + ((fc[k] && (fc[k].add || []).length) ? fc[k].add.length + " extra field(s)" : "")}>
            {<FormDetail fkey={k} path={path} conf={fc[k] || {}} mail={mail[k] || {}} templates={templates} stats={stats[k]}
              onConf={(c) => setForms({ ...forms, forms: { ...fc, [k]: c } })} onMail={(m) => setMail({ ...mail, [k]: m })} />}
          </AdmCard>
        ))}
      </div>
      <div className="adm-save">
        <AdmBtn kind="primary" onClick={save} disabled={!dirty}>Save and publish</AdmBtn>
        <AdmBtn onClick={() => { setForms(admClone(orig[0])); setMail(admClone(orig[1])); }} disabled={!dirty}>Discard edits</AdmBtn>
        <AdmStatus s={msg} />
      </div>
    </section>
  );
}

/* ======================================================================================== Legal pages */
function Legal() {
  return (
    <>
      <AdmListEditor ckey="legal" title="Legal & policies" intro="Privacy policy, cookie policy, terms, data protection and research ethics: every heading, paragraph and list. Links are written [text](/address). A new policy page can be made under New pages and put in the footer's legal menu." />
      <AdmObjectEditor ckey="legal-company" title="Company details on the legal pages" intro="Shown at the top and bottom of every policy. Change “Updated” when a policy changes." />
    </>
  );
}

/* ======================================================================================== Case studies */
function Cases() {
  const [inds, setInds] = ee.useState(null), [sel, setSel] = ee.useState(""), [builtIn, setBuiltIn] = ee.useState(null);
  const [all, setAll] = ee.useState(null), [items, setItems] = ee.useState(null), [orig, setOrig] = ee.useState(null), [msg, setMsg] = ee.useState(null);
  const [mod, setMod] = ee.useState(null);
  ee.useEffect(() => {
    import("../app/data/industries.jsx").then((m) => setInds(m.INDUSTRIES || [])).catch(() => setInds([]));
    import("../app/pages/IndustriesPages.jsx").then(setMod).catch(() => {});
    admGet("cases").then((c) => setAll(isObj(c) ? c : {})).catch((e) => setMsg({ err: e.message }));
  }, []);
  ee.useEffect(() => {
    if (!sel || !mod || !all) return;
    setItems(null);
    mod.loadBuiltinCases(sel).then((b) => {
      setBuiltIn(b);
      const o = isObj(all[sel]) ? all[sel] : {};
      const hide = new Set(o.hide || []), edit = isObj(o.edit) ? o.edit : {};
      const l = [...b.map((x) => ({ v: admClone({ ...x, ...(edit[x.slug] || {}) }), hidden: hide.has(x.slug) })), ...(o.add || []).map((x) => ({ v: admClone(x), hidden: hide.has(x.slug), added: true }))];
      setItems(l); setOrig(admClone(l));
    });
  }, [sel, mod, all]);
  const save = async () => {
    const edit = {}, add = [], hide = [];
    const bmap = new Map(builtIn.map((x) => [x.slug, x]));
    for (const it of items) {
      if (it.hidden) { hide.push(it.v.slug); if (it.added) add.push(it.v); continue; }
      if (bmap.has(it.v.slug) && !it.added) { const b = bmap.get(it.v.slug); const d = {}; for (const k of Object.keys(it.v)) if (!admSame(b[k], it.v[k])) d[k] = it.v[k]; if (Object.keys(d).length) edit[it.v.slug] = d; }
      else add.push(it.v);
    }
    const n = { ...all, [sel]: { edit, add, hide } };
    try { await admPut("cases", n); setAll(n); setMsg({ ok: "Saved. The industry page shows it on the next load." }); } catch (e) { setMsg({ err: e.message }); }
  };
  const addNew = (data) => {
    const v = builtIn && builtIn[0] ? Object.fromEntries(Object.keys(builtIn[0]).map((k) => [k, Array.isArray(builtIn[0][k]) ? [] : typeof builtIn[0][k] === "number" ? 0 : typeof builtIn[0][k] === "boolean" ? false : isObj(builtIn[0][k]) ? {} : ""])) : { slug: "", title: "", client: "", challenge: "", approach: "", outcome: "" };
    const o = { ...v, ...data, verified: false };
    if (!o.slug) o.slug = String(o.title || "case-" + Date.now()).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 70);
    setItems([{ v: o, hidden: false, added: true, open: true }, ...items]);
  };
  const ai = async () => {
    const brief = prompt("What is the case study about? (industry, method, markets, result)");
    if (!brief) return;
    setMsg({ ok: "Writing…" });
    try { const r = await admApi("/admin/ai/write", { body: { kind: "case-study", brief: brief + "\nIndustry: " + (inds.find((x) => x.slug === sel) || {}).name } }); addNew(r.data || {}); setMsg({ ok: "Draft added at the top. Check it, then save." }); }
    catch (e) { setMsg({ err: e.message }); }
  };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Case studies</h1></header>
      <p className="adm-muted">Choose an industry to edit, hide or add its case studies. New case studies are marked “Illustrative” unless you tick Verified (only with the client's permission).</p>
      <select className="adm-in" value={sel} onChange={(e) => setSel(e.target.value)}><option value="">Choose an industry…</option>{(inds || []).map((x) => <option key={x.slug} value={x.slug}>{x.name}{all && all[x.slug] ? " (changed)" : ""}</option>)}</select>
      <AdmStatus s={msg} />
      {sel && !items && <p className="adm-muted">Loading…</p>}
      {sel && items && (
        <>
          <div className="adm-row"><AdmBtn kind="primary" onClick={() => { const t = prompt("Title of the new case study:"); if (t) addNew({ title: t }); }}>+ Add case study</AdmBtn><AdmBtn onClick={ai}>✨ Write one with AI</AdmBtn></div>
          <div className="adm-items">
            {items.map((it, i) => (
              <AdmCard key={it.v.slug + i} open={!!it.open} cls={it.hidden ? "is-hidden" : ""} title={it.v.title || it.v.slug} sub={(it.hidden ? "Hidden · " : "") + (it.added ? "Added by admin" : "")}
                actions={<><AdmBtn small onClick={() => setItems(items.map((x, j) => (j === i ? { ...x, hidden: !x.hidden } : x)))}>{it.hidden ? "Show" : "Hide"}</AdmBtn>{it.added && <AdmBtn small kind="danger" onClick={() => setItems(items.filter((_, j) => j !== i))}>Delete</AdmBtn>}</>}>
                <CaseFields v={it.v} onChange={(v) => setItems(items.map((x, j) => (j === i ? { ...x, v } : x)))} />
              </AdmCard>
            ))}
          </div>
          <div className="adm-save"><AdmBtn kind="primary" disabled={admSame(items, orig)} onClick={save}>Save and publish</AdmBtn><AdmBtn disabled={admSame(items, orig)} onClick={() => setItems(admClone(orig))}>Discard edits</AdmBtn></div>
        </>
      )}
    </section>
  );
}
const CaseFields = ({ v, onChange }) => <AdmValue value={v} onChange={onChange} folder="site" />;

export { Cases as AdmCases, CardDesigns as AdmCardDesigns, Forms as AdmForms, Legal as AdmLegal, Logos as AdmLogos, Menus as AdmMenus, NewPages as AdmNewPages, Pages as AdmPages, FieldInput as AdmFieldInput };
