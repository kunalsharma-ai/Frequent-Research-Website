/*
 * Build 83: gallery tools in the super admin (Kunal, 16 Nov: photo alignment on the website).
 *  - GalleryLook: per photo, what stays in view when the website crops it (focus: top, face, centre, bottom, left,
 *    right, or a point you click on the preview) and whether to show the whole photo instead (fit: contain). The
 *    preview shows the photo in the three shapes the website uses.
 *  - GalleryBulk: upload many photos at once into one section (each becomes its own item, in the order chosen).
 * The website reads `focus`, `fit` and `ratio` (width / height, measured here) in pages/Gallery25.jsx with
 * styles/gallery83.css.
 */
import * as ee from 'react';
import { admUpload } from './api.jsx';
import { AdmBtn } from './Fields.jsx';
import './css83.js';

const FOCUS = [["", "Auto (faces)"], ["top", "Top"], ["face", "Upper third"], ["center", "Centre"], ["bottom", "Bottom"], ["left", "Left"], ["right", "Right"]];
const pos = (f) => ({ top: "50% 12%", bottom: "50% 88%", left: "15% 50%", right: "85% 50%", center: "50% 50%", face: "50% 28%" }[f] || (/^\d{1,3}% \d{1,3}%$/.test(f || "") ? f : "50% 32%"));

function GalleryLook({ x, onChange }) {
  if (!x || x.type !== "photo" || !x.url) return null;
  const set = (k, v) => { const o = { ...x, [k]: v }; if (!v) delete o[k]; onChange(o); };
  const click = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    set("focus", Math.round(((e.clientX - r.left) / r.width) * 100) + "% " + Math.round(((e.clientY - r.top) / r.height) * 100) + "%");
  };
  return (
    <div className="adm83-gl">
      <div className="adm83-gl__pv" title="Click the photo to choose what stays in view">
        {[["Wide", 16 / 9], ["Photo", 4 / 3], ["Tall", 3 / 4]].map(([l, r]) => (
          <figure key={l} style={{ aspectRatio: r }} onClick={click}>
            <img src={x.url} alt="" style={{ objectPosition: pos(x.focus), objectFit: x.fit === "contain" ? "contain" : "cover" }}
              onLoad={(e) => { const im = e.currentTarget; if (im.naturalWidth && !x.ratio) set("ratio", Math.round((im.naturalWidth / im.naturalHeight) * 1000) / 1000); }} />
            <figcaption>{l}</figcaption>
          </figure>
        ))}
      </div>
      <div className="adm83-gl__ctl">
        <label>Keep in view
          <select className="adm-in adm-in--auto" value={FOCUS.some(([k]) => k === (x.focus || "")) ? x.focus || "" : "custom"} onChange={(e) => set("focus", e.target.value === "custom" ? x.focus : e.target.value)}>
            {FOCUS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            {!FOCUS.some(([k]) => k === (x.focus || "")) ? <option value="custom">Point {x.focus}</option> : null}
          </select>
        </label>
        <label className="adm-sw"><input type="checkbox" checked={x.fit === "contain"} onChange={(e) => set("fit", e.target.checked ? "contain" : "")} /><span>Show the whole photo (no cropping)</span></label>
        <small className="adm-muted">Tip: click a spot on the preview to keep it in view.</small>
      </div>
    </div>
  );
}

function GalleryBulk({ sections, onAdd }) {
  const [sec, setSec] = ee.useState(sections[0][0]);
  const [busy, setBusy] = ee.useState(""), [err, setErr] = ee.useState("");
  const ref = ee.useRef(null);
  const pick = async (e) => {
    const list = [...(e.target.files || [])]; e.target.value = "";
    if (!list.length) return;
    setErr(""); const out = [];
    for (let i = 0; i < list.length; i++) {
      setBusy(`Uploading ${i + 1} of ${list.length}…`);
      try {
        const f = list[i];
        const ratio = await new Promise((ok) => { const u = URL.createObjectURL(f), im = new Image(); im.onload = () => { ok(im.naturalWidth / im.naturalHeight); URL.revokeObjectURL(u); }; im.onerror = () => ok(0); im.src = u; });
        const r = await admUpload(f, "gallery");
        out.push({ url: r.url, ratio: ratio ? Math.round(ratio * 1000) / 1000 : undefined, title: f.name.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").slice(0, 120) });
      } catch (x) { setErr((p) => p + list[i].name + ": " + x.message + " "); }
    }
    setBusy("");
    if (out.length) onAdd(sec, out);
  };
  return (
    <div className="adm-row adm83-bulk">
      <b>Many photos at once:</b>
      <select className="adm-in adm-in--auto" value={sec} onChange={(e) => setSec(e.target.value)}>{sections.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select>
      <AdmBtn small kind="primary" disabled={!!busy} onClick={() => ref.current && ref.current.click()}>{busy || "Choose photos"}</AdmBtn>
      <input ref={ref} type="file" accept="image/*" multiple hidden onChange={pick} />
      {err ? <em className="adm-err">{err}</em> : null}
    </div>
  );
}

export { GalleryBulk as AdmGalleryBulk, GalleryLook as AdmGalleryLook };
