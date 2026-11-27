/*
 * Super admin panel: media library, activity log and "All content" (every saved item as data, with its history).
 */
import * as ee from 'react';
import { admApi, admCountry, admDel, admGet, admNum, admPut, admReplace, admWhen } from './api.jsx';
import { AdmBtn, AdmStatus, AdmUploadBtn } from './Fields.jsx';
import { admUseLoad } from './Inbox.jsx';

const FOLDERS = ["misc", "team", "logos", "gallery", "pdfs", "site", "blog", "careers"];

function Files() {
  const [folder, setFolder] = ee.useState("");
  const [q, setQ] = ee.useState("");
  const [st, reload] = admUseLoad(() => admApi("/admin/files?" + new URLSearchParams({ folder, q })).then((j) => j.files), [folder, q]);
  const [up, setUp] = ee.useState("misc");
  const [msg, setMsg] = ee.useState(null);
  const copy = (u) => { const full = location.origin + u; navigator.clipboard && navigator.clipboard.writeText(full); setMsg({ ok: "Copied: " + full }); };
  const saveAlt = async (f, alt) => { try { await admApi("/admin/files/" + f.id, { method: "PATCH", body: { alt } }); setMsg({ ok: "Alt text saved for " + f.name + ". It shows on every page that uses this picture." }); reload(); } catch (e) { setMsg({ err: e.message }); } };
  const replace = async (f, file) => { if (!confirm("Replace " + f.name + " with " + file.name + "? Every page that uses it shows the new file.")) return; try { await admReplace(f.id, file); setMsg({ ok: "Replaced. The address stays the same." }); reload(); } catch (e) { setMsg({ err: e.message }); } };
  const del = async (f) => { if (!confirm("Delete " + f.name + "? Pages that use it will show nothing there.")) return; await admApi("/admin/files/" + f.id, { method: "DELETE" }); reload(); };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Files</h1>
        <select className="adm-in adm-in--auto" value={up} onChange={(e) => setUp(e.target.value)} aria-label="Upload into folder">{FOLDERS.map((f) => <option key={f}>{f}</option>)}</select>
        <AdmUploadBtn accept="image/*,application/pdf,video/mp4,video/webm" folder={up} small={false} onDone={() => { setMsg({ ok: "Uploaded." }); reload(); }}>Upload a file</AdmUploadBtn>
      </header>
      <p className="adm-muted">Pictures, logos, PDFs and videos you uploaded (and careers CVs, which only HR and the Super Admin can open). Big photos are made smaller (WebP) when you upload them. Write alt text so search engines and screen readers know what a picture shows. Copy a file's address to use it anywhere.</p>
      <div className="adm-filters">
        <select className="adm-in adm-in--auto" value={folder} onChange={(e) => setFolder(e.target.value)}><option value="">All folders</option>{FOLDERS.map((f) => <option key={f}>{f}</option>)}</select>
        <input className="adm-in" placeholder="Search by name…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <AdmStatus s={msg} />
      <div className="adm-files">
        {(st.data || []).map((f) => (
          <figure key={f.id} className="adm-file">
            {/^image\//.test(f.type) && f.public ? <img src={f.url} alt="" loading="lazy" /> : <span className="adm-file__ic">{(f.type || "").split("/")[1] || "file"}</span>}
            <figcaption><b title={f.name}>{f.name}</b><small>{f.folder} · {(f.size / 1024).toFixed(0)} KB · {admWhen(f.at)}</small>
              {f.public && <input className="adm-in adm783-alt" defaultValue={f.alt || ""} placeholder={/^image\//.test(f.type) ? "Alt text: what the picture shows" : "Description"} aria-label={"Alt text for " + f.name} onBlur={(e) => e.target.value !== (f.alt || "") && saveAlt(f, e.target.value)} />}
              <span className="adm-row">{f.public ? <AdmBtn small onClick={() => copy(f.url)}>Copy address</AdmBtn> : <em>Private</em>}
                {f.public && <label className="adm-btn adm-btn--sm">Replace<input type="file" hidden accept={f.type} onChange={(e) => e.target.files[0] && replace(f, e.target.files[0])} /></label>}
                <AdmBtn small kind="danger" onClick={() => del(f)}>Delete</AdmBtn></span>
            </figcaption>
          </figure>
        ))}
        {st.data && !st.data.length && <p className="adm-muted">No files yet.</p>}
      </div>
    </section>
  );
}

const ACT = { login: "Signed in", "login-failed": "Wrong password", "create-content": "Created", "update-content": "Changed", "delete-content": "Removed changes to", "restore-content": "Restored", "upload-file": "Uploaded", "delete-file": "Deleted file", "update-lead": "Updated lead", "delete-lead": "Deleted lead", "export-leads": "Exported leads", "publish-review": "Published review", "hide-review": "Hid review", "delete-review": "Deleted review", "edit-review": "Edited review", "chat-reply": "Replied in chat", "chat-close": "Closed chat", "chat-reopen": "Reopened chat" };
function Activity() {
  const [q, setQ] = ee.useState("");
  const [skip, setSkip] = ee.useState(0);
  const [st] = admUseLoad(() => admApi("/admin/audit?" + new URLSearchParams({ q, skip, limit: 100 })), [q, skip], 30000);
  const d = st.data;
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Activity</h1></header>
      <p className="adm-muted">Every change made in this panel and every sign-in, newest first (kept for 3 years).</p>
      <div className="adm-filters"><input className="adm-in" placeholder="Search…" value={q} onChange={(e) => { setSkip(0); setQ(e.target.value); }} /></div>
      <div className="adm-table"><table><thead><tr><th>When</th><th>What</th><th>Item</th><th>Details</th><th>IP address</th><th>Country</th><th>Device</th></tr></thead><tbody>
        {(d ? d.rows : []).map((r) => <tr key={r.id} className={r.action === "login-failed" ? "is-warn" : ""}><td>{admWhen(r.at)}</td><td>{ACT[r.action] || r.action}</td><td className="adm-clip">{r.target}</td><td className="adm-clip"><code>{r.detail && Object.keys(r.detail).length ? JSON.stringify(r.detail) : ""}</code></td><td><code>{r.ipAddress || "—"}</code></td><td>{admCountry(r.country)}</td><td className="adm-clip" title={r.ua}>{r.ip}</td></tr>)}
      </tbody></table></div>
      {d && <div className="adm-pager"><span>{admNum(d.total)} entries</span><AdmBtn small disabled={!skip} onClick={() => setSkip(Math.max(0, skip - 100))}>← Newer</AdmBtn><AdmBtn small disabled={skip + 100 >= d.total} onClick={() => setSkip(skip + 100)}>Older →</AdmBtn></div>}
    </section>
  );
}

function AllContent() {
  const [st, reload] = admUseLoad(() => admApi("/admin/content").then((j) => j.keys), []);
  const [cur, setCur] = ee.useState(null);
  const [text, setText] = ee.useState("");
  const [hist, setHist] = ee.useState([]);
  const [msg, setMsg] = ee.useState(null);
  const open = async (k) => {
    setCur(k); setMsg(null);
    const v = await admGet(k);
    setText(v === undefined ? "" : JSON.stringify(v, null, 2));
    setHist((await admApi("/admin/content/" + encodeURIComponent(k) + "/history")).versions);
  };
  const save = async () => { let v; try { v = JSON.parse(text); } catch (e) { return setMsg({ err: "This is not valid JSON: " + e.message }); } try { await admPut(cur, v); setMsg({ ok: "Saved." }); reload(); open(cur); } catch (e) { setMsg({ err: e.message }); } };
  const restore = async (n) => { if (!confirm("Put this earlier version back?")) return; await admApi(`/admin/content/${encodeURIComponent(cur)}/history/${n}/restore`, { body: {} }); setMsg({ ok: "Restored." }); open(cur); reload(); };
  const view = async (n) => { const j = await admApi(`/admin/content/${encodeURIComponent(cur)}/history/${n}`); setText(JSON.stringify(j.data, null, 2)); setMsg({ ok: "Showing the version from " + admWhen(j.at) + ". Save to use it." }); };
  const del = async () => { if (!confirm("Remove all changes saved under " + cur + "? The website shows its original content again.")) return; await admDel(cur); setMsg({ ok: "Removed." }); reload(); open(cur); };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>All content</h1></header>
      <p className="adm-muted">Everything saved in this panel, as data. For experts: the other sections edit the same items with forms. Every save keeps the earlier version, so any change can be undone.</p>
      <div className="adm-cols adm-cols--side">
        <ul className="adm-keys">
          {(st.data || []).map((k) => <li key={k.key}><button className={cur === k.key ? "is-on" : ""} onClick={() => open(k.key)}><b>{k.key}</b><small>{k.set ? "Changed " + admWhen(k.updated) : "Not changed"}{k.public ? "" : " · private"}</small>{k.label && <small>{k.label}</small>}</button></li>)}
        </ul>
        <div>
          {!cur ? <p className="adm-muted">Choose an item.</p> : (
            <>
              <h2>{cur}</h2>
              <textarea className="adm-in adm-code" rows={24} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} placeholder="Not changed: the website shows its original content." />
              <div className="adm-row"><AdmBtn kind="primary" onClick={save}>Save</AdmBtn><AdmBtn kind="danger" onClick={del}>Remove changes</AdmBtn></div>
              <AdmStatus s={msg} />
              <h3>Earlier versions</h3>
              {!hist.length ? <p className="adm-muted">None yet.</p> : <ul className="adm-hist">{hist.map((h) => <li key={h.n}>{admWhen(h.at)}{h.deleted ? " (before it was removed)" : ""} <AdmBtn small onClick={() => view(h.n)}>View</AdmBtn> <AdmBtn small onClick={() => restore(h.n)}>Restore</AdmBtn></li>)}</ul>}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export { Activity as AdmActivity, AllContent as AdmAllContent, Files as AdmFiles };
