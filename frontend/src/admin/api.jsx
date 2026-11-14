/*
 * Super admin panel (build 67): talking to the API. Every call goes to /api/v1/… with the session token from the
 * sign-in (sessionStorage "fr-adm", 12 hours, 2 hours idle). A 401 sends the admin back to the sign-in screen.
 * Build 78.3: a 403 asking for the authenticator code opens the confirm box and tries again.
 */
const TOKEN = "fr-adm";
const tok = () => { try { return sessionStorage.getItem(TOKEN) || ""; } catch (e) { return ""; } };
const setTok = (t) => { try { t ? sessionStorage.setItem(TOKEN, t) : sessionStorage.removeItem(TOKEN); } catch (e) {} };
let onOut = () => {};
const admOnSignOut = (f) => { onOut = f; };
// build 78.3: sensitive actions ask for the authenticator code again (the server answers 403 { stepUp: true })
let askCode = async () => null;
const admOnStepUp = (f) => { askCode = f; };

async function admApi(path, opts = {}) {
  const h = { Accept: "application/json", ...(opts.headers || {}) };
  if (tok()) h.Authorization = "Bearer " + tok();
  let body = opts.body;
  if (body !== undefined && !(body instanceof Blob) && !(body instanceof ArrayBuffer) && typeof body !== "string") { body = JSON.stringify(body); h["Content-Type"] = "application/json"; }
  let r;
  try { r = await fetch("/api/v1" + path, { method: opts.method || (body !== undefined ? "POST" : "GET"), headers: h, body }); }
  catch (e) { throw new Error("The server cannot be reached. Check your connection and try again."); }
  if (r.status === 401 && !/^\/admin\/(login|setup|step-up|account\/password)/.test(path)) { setTok(""); onOut(); throw new Error("Please sign in again."); }
  if (r.status === 403 && !opts.again) {
    const j = await r.clone().json().catch(() => ({}));
    if (j.stepUp) {
      const code = await askCode(j.error);
      if (!code) throw new Error("Not confirmed. Nothing was changed.");
      await admApi("/admin/step-up", { body: { code } });
      return admApi(path, { ...opts, again: true });
    }
  }
  if (opts.raw) { if (!r.ok) { const j = await r.json().catch(() => ({})); throw new Error(j.error || "Download failed (" + r.status + ")"); } return r; }
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.ok === false) { const e = new Error(j.error || "Something went wrong (" + r.status + ")"); e.status = r.status; e.body = j; throw e; }
  // a change that needs approval was saved as a draft: the panel shows a notice
  if (j.draft === true && typeof window !== "undefined") window.dispatchEvent(new CustomEvent("adm-draft", { detail: j }));
  return j;
}

// GET /admin/content/:key -> data or undefined
const admGet = async (key) => { const j = await admApi("/admin/content/" + encodeURIComponent(key)); return j.set ? j.data : undefined; };
const admPut = (key, data) => admApi("/admin/content/" + encodeURIComponent(key), { method: "PUT", body: { data } });
const admDel = (key) => admApi("/admin/content/" + encodeURIComponent(key), { method: "DELETE" });

// build 78.3: big JPG / PNG photos are made smaller in the browser before upload (WebP, at most 2400 px wide)
async function admOptimise(file) {
  try {
    if (!/^image\/(jpeg|png)$/.test(file.type) || file.size < 300 * 1024 || typeof createImageBitmap !== "function") return file;
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 2400 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise((ok) => c.toBlob(ok, "image/webp", 0.86));
    if (!blob || blob.type !== "image/webp" || blob.size >= file.size * 0.9) return file;
    return new File([blob], String(file.name || "image").replace(/\.[a-z0-9]+$/i, "") + ".webp", { type: "image/webp" });
  } catch (e) { return file; }
}
// upload one file to the media library -> { id, url, name }
async function admUpload(file, folder = "misc", { optimise = true, alt = "" } = {}) {
  if (optimise) file = await admOptimise(file);
  const q = new URLSearchParams({ name: file.name || "file", folder, ...(alt ? { alt } : {}) });
  return admApi("/admin/files?" + q, { method: "POST", body: file, headers: { "Content-Type": file.type || "application/octet-stream" } });
}
// replace a file: same id and address, so every page that shows it gets the new one
async function admReplace(id, file, { optimise = true } = {}) {
  if (optimise) file = await admOptimise(file);
  return admApi("/admin/files/" + id + "?" + new URLSearchParams({ name: file.name || "file" }), { method: "PUT", body: file, headers: { "Content-Type": file.type || "application/octet-stream" } });
}

// build 78.3: who is signed in and what they may do (GET /admin/me), loaded once per sign-in
let meP = null;
const admMe = (fresh) => { if (fresh || !meP) meP = admApi("/admin/me").catch((e) => { meP = null; throw e; }); return meP; };
const admForget = () => { meP = null; };
// the same check as the server's, for showing and hiding buttons (the server checks again on every request)
function admCan(me, module, action, { key, path } = {}) {
  if (!me || !me.user) return false;
  if (me.user.role === "super") return true;
  if (((me.perms || {})[module] || []).includes(action)) return true;
  const match = (pat, p) => pat === "*" || pat === p || (pat.endsWith("/*") && (p === pat.slice(0, -2) || p.startsWith(pat.slice(0, -1))));
  return (me.grants || []).some((g) => g.module === module && (g.actions || []).includes(action) && (key === undefined || !(g.keys || []).length || g.keys.includes(key)) && (path === undefined || !(g.paths || []).length || g.paths.some((x) => match(x, path))));
}

// download something that needs the admin token (CSV export, careers CVs)
async function admDownload(path, name) {
  const r = await admApi(path, { raw: true });
  const blob = await r.blob();
  const u = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = u; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 4000);
}

const admWhen = (d) => { if (!d) return ""; const t = new Date(d); return isNaN(t) ? String(d) : t.toLocaleString(undefined, { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); };
const admNum = (n) => (n == null ? "0" : Number(n).toLocaleString());
const admClone = (x) => (x === undefined ? undefined : JSON.parse(JSON.stringify(x)));
const admSame = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export { admApi, admCan, admClone, admDel, admDownload, admForget, admGet, admMe, admNum, admOnSignOut, admOnStepUp, admOptimise, admPut, admReplace, admSame, admUpload, admWhen, setTok as admSetToken, tok as admToken };
