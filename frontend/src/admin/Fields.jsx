/*
 * Super admin panel: form pieces. <AdmValue> edits any value the site uses (text, number, yes/no, picture, PDF, list,
 * table, group of fields) and shows every field, so nothing is hidden and nothing starts blank.
 */
import * as ee from 'react';
import { admUpload } from './api.jsx';

const LONG = /^(text|d|desc|description|quote|message|intro|body|summary|sub|p|a|answer|note|bio|caption|card|problem|solution|lede|copy|content)$/i;
const IMGKEY = /(photo|img|image|logo|thumb|icon|avatar|picture|poster|cover|badge|src)$/i;
const isImgUrl = (v) => typeof v === "string" && (/\.(png|jpe?g|webp|svg|gif|avif)(\?|#|$)/i.test(v) || /^\/api\/v1\/files\//.test(v) || /^data:image\//.test(v));
const isPdfUrl = (v) => typeof v === "string" && /\.pdf(\?|#|$)/i.test(v);
const WORDS = { li: "LinkedIn", liCompany: "LinkedIn is a company page", img: "Picture", imgs: "Pictures", src: "Picture address", href: "Link", url: "Address", cta: "Button", ctaHref: "Button link", desc: "Description", faq: "FAQs", faqs: "FAQs", id: "Id (in the address)", slug: "Address name", wa: "WhatsApp", waMsg: "WhatsApp first message", tel: "Phone", alt: "Picture description", h1: "Main heading", kicker: "Small heading", sub: "Subtitle", n: "Number", k: "Label", v: "Value" };
const label = (k) => WORDS[k] || String(k).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]+/g, " ").replace(/^./, (c) => c.toUpperCase());
const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);

function AdmBtn({ kind = "", small, ...p }) {
  return <button type="button" className={"adm-btn" + (kind ? " adm-btn--" + kind : "") + (small ? " adm-btn--sm" : "")} {...p} />;
}

function AdmUploadBtn({ accept = "image/*", folder = "misc", onDone, children = "Upload", small = true }) {
  const ref = ee.useRef(null);
  const [busy, setBusy] = ee.useState(false);
  const [err, setErr] = ee.useState("");
  const pick = async (e) => {
    const f = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!f) return;
    setBusy(true); setErr("");
    try { const r = await admUpload(f, folder); onDone(r.url, r); } catch (x) { setErr(x.message); }
    setBusy(false);
  };
  return (
    <span className="adm-up">
      <input ref={ref} type="file" accept={accept} hidden onChange={pick} />
      <AdmBtn small={small} onClick={() => ref.current.click()} disabled={busy}>{busy ? "Uploading…" : children}</AdmBtn>
      {err && <em className="adm-err">{err}</em>}
    </span>
  );
}

function AdmImage({ value, onChange, folder }) {
  return (
    <div className="adm-img">
      <span className="adm-img__pv">{value ? <img src={value} alt="" loading="lazy" /> : <i>No picture</i>}</span>
      <div className="adm-img__ctl">
        <input className="adm-in" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="https://… or upload" />
        <AdmUploadBtn folder={folder} onDone={(u) => onChange(u)}>Upload picture</AdmUploadBtn>
      </div>
    </div>
  );
}

function AdmText({ value, onChange, long, placeholder }) {
  const v = value == null ? "" : String(value);
  if (long || v.length > 90 || v.includes("\n")) return <textarea className="adm-in adm-ta" rows={Math.min(12, Math.max(2, Math.ceil(v.length / 90)))} value={v} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
  return <input className="adm-in" value={v} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />;
}

// an empty item shaped like an example item (for "Add")
function blankLike(x) {
  if (Array.isArray(x)) return [];
  if (isObj(x)) { const o = {}; for (const k of Object.keys(x)) o[k] = blankLike(x[k]); return o; }
  if (typeof x === "number") return 0;
  if (typeof x === "boolean") return false;
  return x === null ? null : "";
}

// a table: list of rows that are lists of plain values (panel books: [label, %, count])
function AdmGrid({ value, onChange }) {
  const cols = Math.max(...value.map((r) => r.length), 1);
  const set = (i, j, v) => { const n = value.map((r) => [...r]); n[i][j] = typeof value[i][j] === "number" ? (v === "" ? 0 : Number(v)) : v; onChange(n); };
  return (
    <div className="adm-grid">
      <table><tbody>
        {value.map((r, i) => (
          <tr key={i}>
            {Array.from({ length: cols }, (_, j) => <td key={j}><input className="adm-in" type={typeof r[j] === "number" ? "number" : "text"} step="any" value={r[j] == null ? "" : r[j]} onChange={(e) => set(i, j, e.target.value)} /></td>)}
            <td><AdmBtn small kind="ghost" title="Remove row" onClick={() => onChange(value.filter((_, k) => k !== i))}>✕</AdmBtn></td>
          </tr>
        ))}
      </tbody></table>
      <AdmBtn small onClick={() => onChange([...value, value.length ? blankLike(value[0]).map((x, j) => (typeof value[0][j] === "number" ? 0 : "")) : [""]])}>+ Add row</AdmBtn>
    </div>
  );
}

function AdmValue({ k = "", value, onChange, folder = "misc", depth = 0, hint }) {
  if (typeof value === "boolean") return <label className="adm-sw"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} /><span>{value ? "Yes" : "No"}</span></label>;
  if (typeof value === "number") return <input className="adm-in adm-in--num" type="number" step="any" value={value} onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))} />;
  if (value == null || typeof value === "string") {
    if (isImgUrl(value) || (IMGKEY.test(k) && (!value || isImgUrl(value)))) return <AdmImage value={value || ""} onChange={onChange} folder={folder} />;
    if (isPdfUrl(value)) return <div className="adm-row"><AdmText value={value} onChange={onChange} /><AdmUploadBtn accept="application/pdf" folder="pdfs" onDone={(u) => onChange(u)}>Upload PDF</AdmUploadBtn></div>;
    return <AdmText value={value} onChange={onChange} long={LONG.test(k)} placeholder={hint} />;
  }
  if (Array.isArray(value)) {
    if (value.length && value.every((r) => Array.isArray(r) && r.every((c) => c == null || typeof c !== "object"))) return <AdmGrid value={value} onChange={onChange} />;
    const prim = value.every((x) => x == null || typeof x !== "object");
    const add = () => onChange([...value, value.length ? blankLike(value[value.length - 1]) : ""]);
    const move = (i, d) => { const n = [...value]; const j = i + d; if (j < 0 || j >= n.length) return; [n[i], n[j]] = [n[j], n[i]]; onChange(n); };
    return (
      <div className={"adm-list" + (prim ? " adm-list--prim" : "")}>
        {value.map((x, i) => (
          <div className="adm-list__it" key={i}>
            <div className="adm-list__body">
              {prim ? <AdmValue k={k} value={x} folder={folder} depth={depth + 1} onChange={(v) => { const n = [...value]; n[i] = v; onChange(n); }} />
                : <AdmCard title={titleOf(x, i)} depth={depth + 1}><AdmValue k={k} value={x} folder={folder} depth={depth + 1} onChange={(v) => { const n = [...value]; n[i] = v; onChange(n); }} /></AdmCard>}
            </div>
            <div className="adm-list__ctl">
              <AdmBtn small kind="ghost" title="Move up" onClick={() => move(i, -1)}>↑</AdmBtn>
              <AdmBtn small kind="ghost" title="Move down" onClick={() => move(i, 1)}>↓</AdmBtn>
              <AdmBtn small kind="ghost" title="Remove" onClick={() => onChange(value.filter((_, j) => j !== i))}>✕</AdmBtn>
            </div>
          </div>
        ))}
        <AdmBtn small onClick={add}>+ Add</AdmBtn>
      </div>
    );
  }
  if (isObj(value)) {
    return (
      <div className="adm-obj">
        {Object.keys(value).map((key) => (
          <div className="adm-f" key={key}>
            <span className="adm-f__l">{label(key)}</span>
            <div className="adm-f__v"><AdmValue k={key} value={value[key]} folder={folder} depth={depth + 1} onChange={(v) => onChange({ ...value, [key]: v })} /></div>
          </div>
        ))}
      </div>
    );
  }
  return <code>{String(value)}</code>;
}

const titleOf = (x, i) => (isObj(x) ? x.name || x.title || x.t || x.q || x.label || x.code || x.slug || x.id || x.key || x.date || "Item " + (i + 1) : "Item " + (i + 1));

function AdmCard({ title, sub, open: open0 = false, depth = 0, actions, children, cls = "" }) {
  const [open, setOpen] = ee.useState(open0);
  return (
    <div className={"adm-card" + (open ? " is-open" : "") + (depth ? " adm-card--in" : "") + (cls ? " " + cls : "")}>
      <div className="adm-card__h">
        <button type="button" className="adm-card__t" onClick={() => setOpen(!open)} aria-expanded={open}>
          <span className="adm-card__chev">{open ? "▾" : "▸"}</span>
          <span><b>{String(title)}</b>{sub && <small>{sub}</small>}</span>
        </button>
        {actions && <div className="adm-card__a">{actions}</div>}
      </div>
      {open && <div className="adm-card__b">{children}</div>}
    </div>
  );
}

function AdmField({ label: l, help, children }) {
  return (
    <label className="adm-f adm-f--col">
      <span className="adm-f__l">{l}</span>
      {children}
      {help && <small className="adm-f__h">{help}</small>}
    </label>
  );
}

// "Saved" / error line under a form
function AdmStatus({ s }) {
  // build 78.3: a soft sound for done / problem (when sounds are on)
  ee.useEffect(() => { if (s) import("./Look.jsx").then((m) => m.admSfx(s.err ? "err" : "ok")).catch(() => {}); }, [s && (s.err || s.ok)]);
  if (!s) return null;
  return <p className={"adm-status" + (s.err ? " is-err" : "")} role="status">{s.err || s.ok}</p>;
}

export { AdmBtn, AdmCard, AdmField, AdmImage, AdmStatus, AdmText, AdmUploadBtn, AdmValue, blankLike, isObj as admIsObj, label as admLabel, titleOf as admTitleOf };
