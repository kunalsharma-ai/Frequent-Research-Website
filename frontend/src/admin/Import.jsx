/* Build 78.4: "Import from a file" in every section of the admin.
 * Any file goes in; it is turned into what the section needs, shown first, and only used when you press the button:
 *   Excel (.xlsx), CSV / TSV, JSON          -> rows: matched to the section's fields (team, testimonials, products, contacts …)
 *   Word (.docx), Markdown, text, HTML      -> a new item (title from the first heading, text and sections from the rest)
 *   pictures (JPG, PNG, BMP, AVIF, GIF …)   -> WebP (max 2400 px) in the media library, address to copy
 *   PDF, video, MP3, Word/Excel/PowerPoint, ZIP -> stored as is in the media library (documents are sent as downloads)
 * Nothing is saved until you press Save in the section (and it goes through approval like any other change).
 * A section offers its fields with useAdmImportTarget({ label, sample, apply }) (see Content.jsx, Marketing.jsx). */
import * as ee from 'react';
import { createPortal } from 'react-dom';
import { unzipSync, strFromU8 } from 'fflate';
import { FileUp, UploadCloud, X } from 'lucide-react';
import { admUpload } from './api.jsx';
import { AdmBtn, AdmStatus } from './Fields.jsx';

/* ---- which section is open, and what it accepts ---- */
let target = null;
const subs = new Set();
function useAdmImportTarget(t, deps) {
  ee.useEffect(() => { target = t; subs.forEach((f) => f()); return () => { if (target === t) { target = null; subs.forEach((f) => f()); } }; }, deps);
}

/* ---- readers ---- */
const ext = (n) => (String(n).toLowerCase().match(/\.([a-z0-9]+)$/) || [])[1] || "";
function parseCsv(text) {
  const sep = (text.split("\n")[0].match(/\t/g) || []).length > (text.split("\n")[0].match(/[,;]/g) || []).length ? "\t" : (text.split("\n")[0].match(/;/g) || []).length > (text.split("\n")[0].match(/,/g) || []).length ? ";" : ",";
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') q = false; else cell += c; continue; }
    if (c === '"') q = true; else if (c === sep) { row.push(cell); cell = ""; } else if (c === "\n" || c === "\r") { if (c === "\r" && text[i + 1] === "\n") i++; row.push(cell); rows.push(row); row = []; cell = ""; } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => String(x).trim()));
}
const xml = (s) => new DOMParser().parseFromString(s, "application/xml");
function parseXlsx(buf) {
  const z = unzipSync(new Uint8Array(buf));
  // build 83: phonetic guides (<rPh>) are not part of the cell's text, and Excel's _xHHHH_ escapes are decoded
  const unx = (s) => String(s).replace(/_x([0-9a-f]{4})_/gi, (m, h) => { const c = parseInt(h, 16); return c === 13 ? "" : String.fromCharCode(c); });
  const shared = z["xl/sharedStrings.xml"] ? [...xml(strFromU8(z["xl/sharedStrings.xml"])).getElementsByTagName("si")].map((si) => unx([...si.getElementsByTagName("t")].filter((t) => !(t.parentNode && t.parentNode.nodeName === "rPh")).map((t) => t.textContent).join(""))) : [];
  const sheetName = Object.keys(z).filter((k) => /^xl\/worksheets\/sheet\d+\.xml$/.test(k)).sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)))[0];
  if (!sheetName) throw new Error("This Excel file has no sheet.");
  const col = (ref) => { let n = 0; for (const ch of ref.replace(/\d+/g, "")) n = n * 26 + ch.charCodeAt(0) - 64; return n - 1; };
  const out = [];
  for (const r of xml(strFromU8(z[sheetName])).getElementsByTagName("row")) {
    const row = [];
    for (const c of r.getElementsByTagName("c")) {
      const t = c.getAttribute("t"), v = c.getElementsByTagName("v")[0], is = c.getElementsByTagName("is")[0];
      row[col(c.getAttribute("r") || "A")] = t === "s" ? shared[+(v && v.textContent)] || "" : t === "inlineStr" ? (is ? unx(is.textContent) : "") : v ? v.textContent : "";
    }
    out.push(Array.from(row, (x) => (x == null ? "" : x)));
  }
  return out.filter((r) => r.some((x) => String(x).trim()));
}
function parseDocx(buf) {
  const z = unzipSync(new Uint8Array(buf));
  if (!z["word/document.xml"]) throw new Error("This Word file cannot be read.");
  const d = xml(strFromU8(z["word/document.xml"]));
  const W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main";
  return [...d.getElementsByTagNameNS(W, "p")].map((p) => {
    const st = p.getElementsByTagNameNS(W, "pStyle")[0], s = st ? st.getAttributeNS(W, "val") || st.getAttribute("w:val") || "" : "";
    const text = [...p.getElementsByTagNameNS(W, "t")].map((t) => t.textContent).join("").trim();
    const lvl = /^(Heading|Title)(\d?)/i.exec(s); const list = !!p.getElementsByTagNameNS(W, "numPr")[0];
    return { text, h: lvl ? (/title/i.test(lvl[1]) ? 1 : +lvl[2] || 2) : 0, list };
  }).filter((x) => x.text);
}
const textBlocks = (t, html) => {
  if (html) { const doc = new DOMParser().parseFromString(t, "text/html"); return [...doc.body.querySelectorAll("h1,h2,h3,h4,p,li")].map((e) => ({ text: e.textContent.trim(), h: /^H(\d)/.test(e.tagName) ? +e.tagName[1] : 0, list: e.tagName === "LI" })).filter((x) => x.text); }
  return t.split(/\r?\n/).map((l) => { const m = /^(#{1,4})\s+(.*)$/.exec(l); const li = /^\s*[-*•]\s+(.*)$/.exec(l); return { text: (m ? m[2] : li ? li[1] : l).trim(), h: m ? m[1].length : 0, list: !!li }; }).filter((x) => x.text);
};
const rowsToObjects = (rows) => { const head = rows[0].map((h, i) => String(h || "Column " + (i + 1)).trim()); return { cols: head, items: rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] == null ? "" : String(r[i]).trim()]))) }; };

async function admReadFile(file) {
  const e = ext(file.name), t = file.type || "";
  if (e === "xlsx" || /spreadsheetml/.test(t)) return { kind: "table", ...rowsToObjects(parseXlsx(await file.arrayBuffer())), from: "Excel" };
  if (["csv", "tsv"].includes(e) || t === "text/csv") return { kind: "table", ...rowsToObjects(parseCsv(await file.text())), from: "CSV" };
  if (e === "json" || t === "application/json") {
    const j = JSON.parse(await file.text());
    const arr = Array.isArray(j) ? j : Array.isArray(j.items) ? j.items : Array.isArray(j.rows) ? j.rows : null;
    if (arr) return { kind: "table", cols: [...new Set(arr.flatMap((x) => (x && typeof x === "object" ? Object.keys(x) : [])))], items: arr.filter((x) => x && typeof x === "object"), from: "JSON", raw: true };
    return { kind: "object", value: j, from: "JSON" };
  }
  if (e === "docx" || /wordprocessingml/.test(t)) return { kind: "text", blocks: parseDocx(await file.arrayBuffer()), from: "Word", keep: true };
  if (["md", "markdown", "txt"].includes(e) || t === "text/plain" || t === "text/markdown") return { kind: "text", blocks: textBlocks(await file.text()), from: e === "txt" ? "Text" : "Markdown" };
  if (["html", "htm"].includes(e) || t === "text/html") return { kind: "text", blocks: textBlocks(await file.text(), true), from: "HTML" };
  if (/^image\//.test(t) || ["bmp", "tif", "tiff", "heic", "heif", "avif", "jpg", "jpeg", "png", "gif", "webp", "svg"].includes(e)) return { kind: "media", sub: "image", from: "Picture" };
  if (/^video\//.test(t) || ["mp4", "webm", "mov", "m4v"].includes(e)) return { kind: "media", sub: "video", from: "Video" };
  return { kind: "media", sub: "file", from: (e || "file").toUpperCase() };
}

// pictures become WebP (max 2400 px); files the media library cannot keep are explained
const MIME = { docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation", csv: "text/csv", txt: "text/plain", zip: "application/zip", mp3: "audio/mpeg", pdf: "application/pdf", mp4: "video/mp4", webm: "video/webm" };
async function toWebp(file) {
  if (/^image\/(svg|gif|webp)/.test(file.type)) return file;
  const bmp = await createImageBitmap(file).catch(() => null);
  if (!bmp) throw new Error(`${file.name}: this picture format cannot be opened in the browser. Please save it as JPG or PNG first.`);
  const k = Math.min(1, 2400 / Math.max(bmp.width, bmp.height)), c = document.createElement("canvas");
  c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k); c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
  const blob = await new Promise((ok) => c.toBlob(ok, "image/webp", 0.86));
  return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".webp", { type: "image/webp" });
}
async function storeFile(file, folder) {
  const e = ext(file.name);
  if (/^image\//.test(file.type) || ["bmp", "tif", "tiff", "heic", "heif", "avif"].includes(e)) file = await toWebp(file);
  else if (MIME[e] && file.type !== MIME[e]) file = new File([file], file.name, { type: MIME[e] });
  else if (e === "mov") throw new Error(`${file.name}: MOV videos must be saved as MP4 first (on a Mac: File › Export).`);
  else if (!MIME[e] && !/^(image|video)\//.test(file.type)) throw new Error(`${file.name}: this kind of file cannot be kept. Use a picture, PDF, MP4, MP3, Word, Excel, PowerPoint, CSV, TXT or ZIP.`);
  return admUpload(file, folder, { optimise: false });
}

/* ---- turning rows / text into the section's items ---- */
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");
const ALIAS = { name: ["fullname", "title", "person"], title: ["name", "heading", "headline"], description: ["desc", "summary", "about", "text", "body"], email: ["mail", "emailaddress"], image: ["photo", "picture", "img", "logo"], url: ["link", "website", "href"] };
function guess(field, cols) {
  const f = norm(field), c = cols.map(norm);
  let i = c.indexOf(f); if (i >= 0) return cols[i];
  for (const a of ALIAS[f] || []) { i = c.indexOf(a); if (i >= 0) return cols[i]; }
  i = c.findIndex((x) => x.includes(f) || (f.length > 3 && f.includes(x) && x.length > 2)); return i >= 0 ? cols[i] : "";
}
const cast = (proto, v) => (Array.isArray(proto) ? (typeof v === "string" ? v.split(/\s*[;|\n]\s*/).filter(Boolean) : Array.isArray(v) ? v : []) : typeof proto === "number" ? (Number(String(v).replace(/[^\d.-]/g, "")) || 0) : typeof proto === "boolean" ? /^(1|yes|true|y)$/i.test(String(v)) : v == null ? "" : typeof v === "object" ? v : String(v));
function fromText(blocks, sample) {
  const first = blocks.find((b) => b.h) || blocks[0], rest = blocks.filter((b) => b !== first);
  const v = {};
  const strs = Object.keys(sample || {}).filter((k) => typeof sample[k] === "string");
  const tk = ["title", "name", "heading", "h"].find((k) => k in (sample || {})) || strs[0] || "title";
  v[tk] = first ? first.text : "";
  if (sample && Array.isArray(sample.sections)) {
    const secs = []; let cur = null;
    for (const b of rest) { if (b.h) { cur = { h: b.text, p: [], list: [] }; secs.push(cur); } else { if (!cur) { cur = { h: "", p: [], list: [] }; secs.push(cur); } (b.list ? cur.list : cur.p).push(b.text); } }
    v.sections = secs;
    const d = rest.find((b) => !b.h); if ("description" in sample && d) v.description = d.text.slice(0, 300);
  } else {
    const long = ["text", "body", "description", "quote", "content", "p", "summary", "bio"].find((k) => k in (sample || {})) || strs.find((k) => k !== tk) || "text";
    v[long] = Array.isArray(sample && sample[long]) ? rest.map((b) => b.text) : rest.map((b) => (b.list ? "• " : "") + b.text).join("\n\n");
  }
  return v;
}

/* ---- the window ---- */
function ImportBox({ onClose, folder = "misc" }) {
  const t = target;
  const [files, setFiles] = ee.useState([]), [read, setRead] = ee.useState(null), [map, setMap] = ee.useState({}), [mode, setMode] = ee.useState("add");
  const [msg, setMsg] = ee.useState(null), [busy, setBusy] = ee.useState(false), [done, setDone] = ee.useState([]), [over, setOver] = ee.useState(false);
  const [opt, setOpt] = ee.useState({}); // build 83: a section's own import choices (t.options), e.g. the service of a testimonials file
  const fields = t && t.sample ? Object.keys(t.sample).filter((k) => !/^_/.test(k)) : t && t.fields ? t.fields : [];
  const pick = async (list) => {
    list = [...list]; if (!list.length) return;
    setFiles(list); setRead(null); setMsg(null); setDone([]);
    try {
      const r = await admReadFile(list[0]);
      if (list.length > 1 || r.kind === "media") { setRead({ kind: "media", from: list.length > 1 ? list.length + " files" : r.from }); return; }
      setRead(r);
      if (r.kind === "table") setMap(Object.fromEntries(fields.map((f) => [f, ((t && t.guess) || guess)(f, r.cols)]))); // build 83: a section can match columns its own way
    } catch (e) { setMsg({ err: "This file cannot be read: " + e.message }); }
  };
  const items = !read ? [] : read.kind === "table" ? read.items.map((row) => {
    if (!t || !fields.length) return row;
    const v = t.sample ? JSON.parse(JSON.stringify(t.blank ? t.blank() : {})) : {};
    for (const f of fields) if (map[f]) v[f] = cast(t.sample ? t.sample[f] : "", row[map[f]]);
    return v;
  }).filter((v) => Object.values(v).some((x) => (Array.isArray(x) ? x.length : String(x || "").trim()))) : read.kind === "text" ? [fromText(read.blocks, t && t.sample)] : read.kind === "object" ? [read.value] : [];
  const apply = async () => {
    setBusy(true); setMsg(null);
    try {
      const r = await t.apply(items, mode, read.kind, opt);
      setMsg({ ok: (r && r.message) || `${items.length} item${items.length === 1 ? "" : "s"} added. Check them, then press Save.` }); setTimeout(onClose, 1400);
    } catch (e) { setMsg({ err: e.message }); } finally { setBusy(false); }
  };
  const upload = async () => {
    setBusy(true); setMsg(null); const out = [];
    for (const f of files) { try { const r = await storeFile(f, folder); out.push({ name: r.name || f.name, url: r.url }); } catch (e) { out.push({ name: f.name, err: e.message }); } }
    setDone(out); setBusy(false);
  };
  const canApply = t && t.apply && read && read.kind !== "media" && (read.kind !== "object" || t.object) && items.length;
  return (
    <div className="adm-modal adm784-imp" role="dialog" aria-modal="true" aria-labelledby="adm784-imp-h" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="adm-modal__box">
        <button type="button" className="adm784-imp__x" onClick={onClose} aria-label="Close"><X size={18} /></button>
        <h2 id="adm784-imp-h"><FileUp size={20} aria-hidden="true" /> Import from a file{t ? " into " + t.label : ""}</h2>
        <p className="adm-muted">{t ? "Excel, CSV or JSON rows become items; Word, Markdown or text becomes a new item; pictures and documents go to the media library." : "Pictures (made WebP), PDF, video, sound and documents go to the media library; you get the address to use anywhere."} Nothing goes live until you press Save.</p>
        <label className={"adm784-imp__drop" + (over ? " is-over" : "")} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); pick(e.dataTransfer.files); }}>
          <UploadCloud size={34} aria-hidden="true" />
          <b>{files.length ? files.map((f) => f.name).join(", ").slice(0, 120) : "Drop a file here, or choose one"}</b>
          <small>{read ? "Read as " + read.from : "Any file: .xlsx .csv .json .docx .md .txt .html, pictures, PDF, video, MP3, ZIP"}</small>
          <input type="file" multiple onChange={(e) => { pick(e.target.files); e.target.value = ""; }} />
        </label>
        <AdmStatus s={msg} />
        {read && read.kind === "table" && t && fields.length > 0 && (
          <div className="adm784-imp__map">
            <h3>Match the columns</h3>
            <div className="adm784-imp__grid">{fields.map((f) => <label key={f}><span>{f === "id" || f === "slug" ? f + " (made by itself if empty)" : f}</span><select className="adm-in" value={map[f] || ""} onChange={(e) => setMap({ ...map, [f]: e.target.value })}><option value="">(leave empty)</option>{read.cols.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>)}</div>
          </div>
        )}
        {read && read.kind === "table" && t && Array.isArray(t.options) && t.options.length > 0 && (
          <div className="adm784-imp__map">
            <div className="adm784-imp__grid">{t.options.map((o) => <label key={o.key}><span>{o.label}</span><select className="adm-in" value={opt[o.key] || ""} onChange={(e) => setOpt({ ...opt, [o.key]: e.target.value })}>{o.choices.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>)}</div>
          </div>
        )}
        {read && read.kind !== "media" && (
          <div className="adm784-imp__pre">
            <h3>Preview: {items.length} item{items.length === 1 ? "" : "s"}</h3>
            <pre>{JSON.stringify(items.slice(0, 3), null, 2).slice(0, 2400)}{items.length > 3 ? "\n…" : ""}</pre>
          </div>
        )}
        {read && read.kind === "media" && !done.length && <p className="adm-muted">These files will be stored in the media library{files.some((f) => /^image\//.test(f.type)) ? "; pictures are made WebP (max 2400 px)" : ""}.</p>}
        {done.length > 0 && <ul className="adm784-imp__done">{done.map((d) => <li key={d.name}>{d.err ? <span className="is-err">{d.err}</span> : <><b>{d.name}</b><code>{d.url}</code><button type="button" onClick={() => navigator.clipboard && navigator.clipboard.writeText(d.url)}>Copy address</button></>}</li>)}</ul>}
        <div className="adm-row">
          {canApply ? <>
            {read.kind === "table" && t.replace !== false && <select className="adm-in adm-in--auto" value={mode} onChange={(e) => setMode(e.target.value)}><option value="add">Add to the list</option><option value="replace">Replace the list</option></select>}
            <AdmBtn kind="primary" disabled={busy} onClick={apply}>{busy ? "Working…" : t.verb || "Put into " + t.label}</AdmBtn>
          </> : null}
          {files.length > 0 && !done.length && (!canApply || read.kind === "media") && <AdmBtn kind={canApply ? "" : "primary"} disabled={busy} onClick={upload}>{busy ? "Uploading…" : "Store in the media library"}</AdmBtn>}
          {files.length > 0 && canApply && read.keep && <AdmBtn disabled={busy} onClick={upload}>Also keep the file</AdmBtn>}
          <AdmBtn kind="ghost" onClick={onClose}>{done.length ? "Done" : "Cancel"}</AdmBtn>
        </div>
      </div>
    </div>
  );
}

function AdmImportButton() {
  const [open, setOpen] = ee.useState(false), [, tick] = ee.useState(0);
  ee.useEffect(() => { const f = () => tick((x) => x + 1); subs.add(f); return () => subs.delete(f); }, []);
  return (<>
    <button type="button" className="adm784-impbtn" onClick={() => setOpen(true)}><FileUp size={16} aria-hidden="true" /> Import from a file</button>
    {open && createPortal(<ImportBox onClose={() => setOpen(false)} folder={(target && target.folder) || "misc"} />, document.querySelector(".adm") || document.body)}
  </>);
}

export { AdmImportButton, admReadFile, useAdmImportTarget };
