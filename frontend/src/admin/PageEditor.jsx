/*
 * Super admin panel: "Edit on the page". The website opens inside the panel; click any text, picture or link to change
 * it. Changes are saved as texts / images / links (src/app/cms.jsx swaps them in on every visit), for every page or
 * only for this page. The list under the page shows every change, each with Undo.
 */
import * as ee from 'react';
import { admGet, admPut } from './api.jsx';
import { AdmBtn, AdmField, AdmImage, AdmStatus } from './Fields.jsx';

const norm = (s) => String(s || "").replace(/\s+/g, " ").trim();
const MODES = [["text", "Text"], ["image", "Pictures"], ["link", "Links"], ["browse", "Browse"]];

function PageEditor() {
  const frame = ee.useRef(null);
  // build 78: Pages & sections opens this editor on the page it was showing
  const [init] = ee.useState(() => { try { const p = sessionStorage.getItem("adm-edit-path"); sessionStorage.removeItem("adm-edit-path"); return p && p.startsWith("/") ? p : "/"; } catch (e) { return "/"; } });
  const [path, setPath] = ee.useState(init);
  const [addr, setAddr] = ee.useState(init);
  const [mode, setMode] = ee.useState("text");
  const [maps, setMaps] = ee.useState(null);
  const [dlg, setDlg] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const [nonce, setNonce] = ee.useState(0);
  const modeRef = ee.useRef(mode);
  modeRef.current = mode;

  const load = async () => {
    const [t, i, l] = await Promise.all([admGet("texts"), admGet("images"), admGet("links")]);
    setMaps({ texts: t || {}, images: i || {}, links: l || {} });
  };
  ee.useEffect(() => { load().catch((e) => setMsg({ err: e.message })); }, []);

  // hook clicks inside the site (same origin)
  const onFrameLoad = () => {
    const w = frame.current && frame.current.contentWindow;
    if (!w) return;
    const d = w.document;
    try { setPath(w.location.pathname); setAddr(w.location.pathname); } catch (e) { return; }
    // React Router changes pages without loading the frame again
    const sync = () => { try { setPath(w.location.pathname); setAddr(w.location.pathname); } catch (e) {} };
    w.addEventListener("popstate", sync); w.addEventListener("fr-nav", sync);
    const st = d.createElement("style");
    st.textContent = "html.adm-pick *{cursor:crosshair!important}.adm-hl{outline:2px dashed #2F6BFF!important;outline-offset:2px!important}.adm-hl-img{outline:3px solid #D99A2B!important}.adm-hl-a{outline:2px solid #0E9C88!important}";
    d.head.appendChild(st);
    let last = null;
    const target = (e) => {
      const m = modeRef.current;
      if (m === "image") return e.target.closest("img");
      if (m === "link") return e.target.closest("a[href]");
      if (m === "text") return e.target.closest("p,h1,h2,h3,h4,h5,h6,span,a,li,button,label,small,b,strong,em,i,td,th,dt,dd,figcaption,blockquote,div");
      return null;
    };
    d.addEventListener("mouseover", (e) => {
      d.documentElement.classList.toggle("adm-pick", modeRef.current !== "browse");
      if (last) last.classList.remove("adm-hl", "adm-hl-img", "adm-hl-a");
      last = target(e);
      if (last) last.classList.add(modeRef.current === "image" ? "adm-hl-img" : modeRef.current === "link" ? "adm-hl-a" : "adm-hl");
    }, true);
    d.addEventListener("click", (e) => {
      const m = modeRef.current;
      if (m === "browse") return;
      const el = target(e);
      if (!el) return;
      e.preventDefault(); e.stopPropagation();
      if (m === "image") return setDlg({ kind: "image", src: el.getAttribute("src"), alt: el.getAttribute("alt") || "" });
      if (m === "link") return setDlg({ kind: "link", href: el.getAttribute("href"), text: norm(el.textContent).slice(0, 80) });
      // the text node under the pointer (the original text, also when it was changed before)
      let node = null;
      const r = d.caretRangeFromPoint ? d.caretRangeFromPoint(e.clientX, e.clientY) : null;
      if (r && r.startContainer && r.startContainer.nodeType === 3 && el.contains(r.startContainer)) node = r.startContainer;
      if (!node) for (let n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim()) { node = n; break; }
      if (!node) { const tw = d.createTreeWalker(el, 4); for (let n = tw.nextNode(); n; n = tw.nextNode()) if (n.nodeValue.trim()) { node = n; break; } }
      if (!node) {
        const ph = el.getAttribute && (el.getAttribute("placeholder") || el.getAttribute("aria-label"));
        if (ph) return setDlg({ kind: "text", orig: norm(ph), now: norm(ph) });
        return;
      }
      const orig = norm(node.__cmsOrig != null ? node.__cmsOrig : node.nodeValue);
      setDlg({ kind: "text", orig, now: norm(node.nodeValue) });
    }, true);
  };

  const curText = (orig) => { if (!maps) return null; const pg = maps.texts[path]; if (pg && typeof pg === "object" && pg[orig] != null) return { to: pg[orig], page: true }; if (typeof maps.texts[orig] === "string") return { to: maps.texts[orig], page: false }; return null; };

  const saveText = async (orig, to, pageOnly) => {
    const t = JSON.parse(JSON.stringify(maps.texts));
    if (typeof t[orig] === "string") delete t[orig];
    if (t[path] && typeof t[path] === "object") { delete t[path][orig]; if (!Object.keys(t[path]).length) delete t[path]; }
    if (to != null && norm(to) !== orig) { if (pageOnly) { t[path] = t[path] && typeof t[path] === "object" ? t[path] : {}; t[path][orig] = to; } else t[orig] = to; }
    await admPut("texts", t);
    setMaps({ ...maps, texts: t });
  };
  const saveMap = async (key, from, to) => {
    const m = { ...maps[key] };
    if (to && to !== from) m[from] = to; else delete m[from];
    await admPut(key, m);
    setMaps({ ...maps, [key]: m });
  };
  const done = (text) => { setDlg(null); setMsg({ ok: text }); setNonce((n) => n + 1); try { frame.current.contentWindow.localStorage.removeItem("fr-cms"); } catch (e) {} };

  const go = (e) => { e.preventDefault(); const p = addr.startsWith("/") ? addr : "/" + addr; setPath(p); setNonce((n) => n + 1); };

  const changes = maps ? [
    ...Object.entries(maps.texts).flatMap(([k, v]) => (typeof v === "string" ? [["texts", k, v, "every page"]] : v && typeof v === "object" ? Object.entries(v).map(([a, b]) => ["texts", a, b, k, k]) : [])),
    ...Object.entries(maps.images).map(([k, v]) => ["images", k, v, "every page"]),
    ...Object.entries(maps.links).map(([k, v]) => ["links", k, v, "every page"]),
  ] : [];
  const undo = async ([kind, from, , , page]) => {
    if (kind === "texts") {
      const t = JSON.parse(JSON.stringify(maps.texts));
      if (page) { delete t[page][from]; if (!Object.keys(t[page]).length) delete t[page]; } else delete t[from];
      await admPut("texts", t); setMaps({ ...maps, texts: t });
    } else await saveMap(kind, from, "");
    setMsg({ ok: "Undone." }); setNonce((n) => n + 1);
  };

  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>Edit on the page</h1></header>
      <p className="adm-muted">Open any page, choose what to change, then click it. Text: every sentence, heading, button, number and form label. Pictures: any photo, logo or image. Links: any button or link, also PDF downloads. Use Browse to move around the site normally.</p>
      {!window.__FR_ADMIN_DEMO && <div className="adm-pe__bar">
        <form onSubmit={go} className="adm-row"><input className="adm-in" value={addr} onChange={(e) => setAddr(e.target.value)} aria-label="Page address" /><AdmBtn type="submit">Open</AdmBtn></form>
        <div className="adm-seg" role="group" aria-label="What to change">{MODES.map(([k, l]) => <button key={k} type="button" className={mode === k ? "is-on" : ""} onClick={() => setMode(k)}>{l}</button>)}</div>
        <a className="adm-btn adm-btn--ghost" href={path} target="_blank" rel="noreferrer">Open in a new tab ↗</a>
      </div>}
      <AdmStatus s={msg} />
      {window.__FR_ADMIN_DEMO ? <DemoNote onAdd={async (a, b) => { await saveText(a, b, false); setMsg({ ok: "Saved. On the real server the new text is live on the website at once." }); }} /> : (
        <div className="adm-pe">
          <iframe ref={frame} key={nonce + path} src={path} title="Website" onLoad={onFrameLoad} />
        </div>
      )}

      {dlg && (
        <div className="adm-modal" role="dialog" aria-modal="true" aria-label="Change">
          <div className="adm-modal__box">
            {dlg.kind === "text" && <TextDlg dlg={dlg} cur={curText(dlg.orig)} path={path} onCancel={() => setDlg(null)} onSave={async (to, pageOnly) => { try { await saveText(dlg.orig, to, pageOnly); done("Saved. The new text is live."); } catch (e) { setMsg({ err: e.message }); } }} />}
            {dlg.kind === "image" && <MapDlg title="Change this picture" from={dlg.src} cur={maps.images[dlg.src]} image onCancel={() => setDlg(null)} onSave={async (to) => { try { await saveMap("images", dlg.src, to); done("Saved. The new picture is live."); } catch (e) { setMsg({ err: e.message }); } }} />}
            {dlg.kind === "link" && <MapDlg title={"Change where “" + dlg.text + "” goes"} from={dlg.href} cur={maps.links[dlg.href]} onCancel={() => setDlg(null)} onSave={async (to) => { try { await saveMap("links", dlg.href, to); done("Saved. The link is live."); } catch (e) { setMsg({ err: e.message }); } }} />}
          </div>
        </div>
      )}

      <div className="adm-panel"><h2>All changes made here ({changes.length})</h2>
        {!changes.length ? <p className="adm-muted">No changes yet.</p> : (
          <div className="adm-table"><table><thead><tr><th>What</th><th>Original</th><th>Shown instead</th><th>Where</th><th /></tr></thead><tbody>
            {changes.map((c, i) => <tr key={i}><td>{{ texts: "Text", images: "Picture", links: "Link" }[c[0]]}</td>
              <td className="adm-clip">{c[0] === "images" ? <img className="adm-thumb" src={c[1]} alt="" /> : c[1]}</td>
              <td className="adm-clip">{c[0] === "images" ? <img className="adm-thumb" src={c[2]} alt="" /> : c[2]}</td>
              <td>{c[3]}</td><td><AdmBtn small onClick={() => undo(c)}>Undo</AdmBtn></td></tr>)}
          </tbody></table></div>
        )}
      </div>
    </section>
  );
}

// the one-file demo cannot show the website inside the admin (browsers block that for files opened from disk)
function DemoNote({ onAdd }) {
  const [a, setA] = ee.useState("We turn questions into growth.");
  const [b, setB] = ee.useState("");
  return (
    <div className="adm-panel">
      <h2>In this demo</h2>
      <p>On the server, the website opens right here: choose Text, Pictures or Links, click anything on the page and type what it should say or show instead (see admin-edit-on-page.png in the build67 folder). A file opened from your computer cannot show the website inside the admin, so here you can try a text change with this form instead.</p>
      <label className="adm-f adm-f--col"><span className="adm-f__l">Text on the website now</span><input className="adm-in" value={a} onChange={(e) => setA(e.target.value)} /></label>
      <label className="adm-f adm-f--col"><span className="adm-f__l">Show instead</span><input className="adm-in" value={b} onChange={(e) => setB(e.target.value)} placeholder="Type the new text" /></label>
      <div className="adm-row"><AdmBtn kind="primary" disabled={!a || !b} onClick={() => { onAdd(a.trim(), b.trim()); setB(""); }}>Save</AdmBtn></div>
    </div>
  );
}

function TextDlg({ dlg, cur, path, onSave, onCancel }) {
  const [to, setTo] = ee.useState(cur ? cur.to : dlg.orig);
  const [pageOnly, setPageOnly] = ee.useState(cur ? cur.page : false);
  return (
    <>
      <h2>Change this text</h2>
      <AdmField label="Original text (from the website's code)"><p className="adm-orig">{dlg.orig}</p></AdmField>
      <AdmField label="Show instead"><textarea className="adm-in adm-ta" rows={Math.min(10, Math.max(3, Math.ceil(to.length / 70)))} value={to} onChange={(e) => setTo(e.target.value)} autoFocus /></AdmField>
      <label className="adm-sw adm-sw--row"><input type="radio" checked={!pageOnly} onChange={() => setPageOnly(false)} /><span>On every page where this text appears</span></label>
      <label className="adm-sw adm-sw--row"><input type="radio" checked={pageOnly} onChange={() => setPageOnly(true)} /><span>Only on this page ({path})</span></label>
      <div className="adm-row">
        <AdmBtn kind="primary" onClick={() => onSave(to, pageOnly)}>Save</AdmBtn>
        {cur && <AdmBtn onClick={() => onSave(null, pageOnly)}>Back to the original</AdmBtn>}
        <AdmBtn kind="ghost" onClick={onCancel}>Cancel</AdmBtn>
      </div>
    </>
  );
}

function MapDlg({ title, from, cur, image, onSave, onCancel }) {
  const [to, setTo] = ee.useState(cur || "");
  return (
    <>
      <h2>{title}</h2>
      <AdmField label="Now">{image ? <img className="adm-thumb adm-thumb--lg" src={from} alt="" /> : <p className="adm-orig">{from}</p>}</AdmField>
      <AdmField label={image ? "New picture" : "New address (a page like /lets-talk, a full https:// link, or an uploaded PDF)"}>{image ? <AdmImage value={to} onChange={setTo} folder="site" /> : <input className="adm-in" value={to} onChange={(e) => setTo(e.target.value)} placeholder={from} autoFocus />}</AdmField>
      <div className="adm-row">
        <AdmBtn kind="primary" onClick={() => onSave(to)} disabled={!to}>Save</AdmBtn>
        {cur && <AdmBtn onClick={() => onSave("")}>Back to the original</AdmBtn>}
        <AdmBtn kind="ghost" onClick={onCancel}>Cancel</AdmBtn>
      </div>
    </>
  );
}

export { PageEditor as AdmPageEditor };
