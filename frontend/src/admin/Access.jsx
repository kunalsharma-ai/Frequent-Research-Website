/*
 * Build 78.3: who may do what in the admin panel.
 *   Sign-in (email + password, then the authenticator code), the one-time setup page (/admin/setup?t=…) for the first
 *   Super Admin, invitations and resets, the confirm-with-code box for sensitive actions, Admins (invite, roles, access to
 *   particular items and pages, suspend, reset, sessions, activity), Roles (rights per area), Approvals (draft → review →
 *   publish, with the change shown side by side), My account, the overview cards and SEO per page.
 * The server checks every right again on every request (backend/src/lib/access.js); hiding a button here is only a
 * convenience.
 */
import * as ee from 'react';
import { admApi, admCan, admGet, admMe, admNum, admPut, admSetToken, admWhen } from './api.jsx';
import { AdmBtn, AdmCard, AdmField, AdmImage, AdmStatus } from './Fields.jsx';
import { admLoadSiteIndex } from './SiteContent.jsx';
import { qrSvg } from './qr.js';
import { Camera, Clock, Fingerprint, KeyRound, Laptop, LogOut, ShieldCheck, Smartphone, Trash2 } from 'lucide-react';
import { AdmCount, AdmFace, AdmLogo, AdmPalettes, AdmScene, admMakePhoto, admSfx, useAdmTheme } from './Look.jsx';

const DEMO = typeof window !== "undefined" && !!window.__FR_ADMIN_DEMO;
const err = (e) => ({ err: e.message || String(e) });
const STATUS_L = { active: "Active", invited: "Invitation sent", suspended: "Suspended", deactivated: "Deactivated" };
const ACTION_L = { view: "View", create: "Create", edit: "Edit", delete: "Delete", publish: "Publish", approve: "Approve", export: "Export", manage: "Manage", configure: "Configure" };
const DRAFT_L = { draft: "Draft (not sent)", submitted: "Waiting for review", under_review: "Under review", approved: "Approved, not published yet", rejected: "Sent back", published: "Published", archived: "Archived" };
const download = (name, text) => { const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); };
const copy = (t) => { try { navigator.clipboard.writeText(t); } catch (e) {} };

function useAsync(fn, deps) {
  const [st, setSt] = ee.useState({ data: null, err: null, loading: true });
  const [n, setN] = ee.useState(0);
  ee.useEffect(() => {
    let dead = false;
    setSt((s) => ({ ...s, loading: true }));
    Promise.resolve().then(fn).then((data) => !dead && setSt({ data, err: null, loading: false }), (e) => !dead && setSt({ data: null, err: e.message, loading: false }));
    return () => { dead = true; };
  }, [...deps, n]);
  return [st, () => setN((x) => x + 1)];
}

/* ---- password strength (the server's rule: 12+ characters, three kinds of characters, not a common password) ---- */
function pwCheck(pw, email = "") {
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(pw)).length;
  const name = String(email).split("@")[0].toLowerCase();
  const rules = [
    [pw.length >= 12, "At least 12 characters"],
    [kinds >= 3, "Three of: small letters, capital letters, digits, symbols"],
    [!name || name.length < 4 || !pw.toLowerCase().includes(name), "Not your email name"],
  ];
  const score = Math.min(4, (pw.length >= 12) + (pw.length >= 16) + (kinds >= 3) + (kinds === 4));
  return { rules, ok: rules.every((r) => r[0]), score };
}
function PwMeter({ pw, email }) {
  const c = pwCheck(pw, email);
  return (
    <div className="adm783-pw">
      <div className="adm783-pw__bar" data-score={pw ? c.score : 0}><i /><i /><i /><i /></div>
      <ul>{c.rules.map(([ok, t]) => <li key={t} className={ok ? "is-ok" : ""}>{ok ? "✓" : "○"} {t}</li>)}</ul>
    </div>
  );
}

/* ---- sign-in ------------------------------------------------------------------------------------------------------ */
function Login({ onIn }) {
  useAdmTheme();
  const [email, setEmail] = ee.useState("");
  const [pw, setPw] = ee.useState("");
  const [ticket, setTicket] = ee.useState("");
  const [codeV, setCode] = ee.useState("");
  const [useRc, setUseRc] = ee.useState(false);
  const [msg, setMsg] = ee.useState(null);
  const [busy, setBusy] = ee.useState(false);
  const first = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try { const j = await admApi("/admin/login", { body: { email, password: pw } }); setTicket(j.ticket); setPw(""); }
    catch (x) { setMsg({ err: x.status === 404 ? "The admin service is not running on this server." : x.message }); }
    setBusy(false);
  };
  const second = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try {
      const j = await admApi("/admin/login/mfa", { body: useRc ? { ticket, recovery: codeV.trim() } : { ticket, code: codeV.replace(/\s/g, "") } });
      admSetToken(j.token); onIn(j);
    } catch (x) { setMsg(err(x)); if (/took too long/.test(x.message)) setTicket(""); }
    setBusy(false);
  };
  return (
    <main className="adm-login">
      <AdmScene />
      {!ticket ? (
        <form onSubmit={first} className="adm-login__box">
          <div className="adm783-brand"><AdmLogo size={64} big /><b>Frequent Research</b></div>
          <h1>Welcome back</h1>
          <AdmField label="Official email"><input className="adm-in" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} autoFocus required /></AdmField>
          <AdmField label="Password"><input className="adm-in" type="password" autoComplete="current-password" value={pw} onChange={(e) => setPw(e.target.value)} required /></AdmField>
          <AdmBtn kind="primary" type="submit" disabled={busy || !pw || !email}>{busy ? "Checking…" : "Continue"}</AdmBtn>
          <AdmStatus s={msg} />
          <p className="adm-muted">There is no sign-up. Your Super Admin sends you an invitation by email. After 5 wrong passwords the account waits 15 minutes.</p>
        </form>
      ) : (
        <form onSubmit={second} className="adm-login__box">
          <div className="adm783-brand"><AdmLogo size={48} /><b>Step 2 of 2</b></div>
          <h1>{useRc ? "Use a recovery code" : "Code from your authenticator"}</h1>
          {useRc
            ? <AdmField label="Recovery code" help="One of the 10 codes you saved when you set up the account. Each works once."><input className="adm-in" value={codeV} onChange={(e) => setCode(e.target.value)} placeholder="ab12c-3de45" autoFocus required /></AdmField>
            : <AdmField label="6-digit code"><input className="adm-in adm783-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9 ]{6,7}" maxLength={7} value={codeV} onChange={(e) => setCode(e.target.value)} autoFocus required /></AdmField>}
          <AdmBtn kind="primary" type="submit" disabled={busy || !codeV}>{busy ? "Signing in…" : "Sign in"}</AdmBtn>
          <AdmStatus s={msg} />
          <p className="adm-row"><AdmBtn kind="ghost" small onClick={() => { setUseRc(!useRc); setCode(""); setMsg(null); }}>{useRc ? "Use the authenticator code" : "Lost your phone? Use a recovery code"}</AdmBtn><AdmBtn kind="ghost" small onClick={() => { setTicket(""); setCode(""); setMsg(null); }}>Start again</AdmBtn></p>
          <p className="adm-muted">No phone and no recovery codes? Ask your Super Admin to reset your access.</p>
        </form>
      )}
    </main>
  );
}

/* ---- the one-time setup link: password, authenticator, recovery codes ----------------------------------------------- */
function setupToken() {
  const q = DEMO ? (location.hash.split("?")[1] || "") : location.search.slice(1);
  return new URLSearchParams(q).get("t") || "";
}
function Setup() {
  useAdmTheme();
  const t = setupToken();
  const [info] = useAsync(() => (t ? admApi("/admin/setup/" + encodeURIComponent(t)) : Promise.reject(new Error("This page needs the link from your email."))), [t]);
  const [pw, setPw] = ee.useState("");
  const [pw2, setPw2] = ee.useState("");
  const [mfa, setMfa] = ee.useState(null);
  const [codeV, setCode] = ee.useState("");
  const [done, setDone] = ee.useState(null);
  const [saved, setSaved] = ee.useState(false);
  const [msg, setMsg] = ee.useState(null);
  const [busy, setBusy] = ee.useState(false);
  const i = info.data;
  const c = pwCheck(pw, i && i.email);
  const step1 = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try { setMfa(await admApi(`/admin/setup/${encodeURIComponent(t)}/password`, { body: { password: pw } })); } catch (x) { setMsg(err(x)); }
    setBusy(false);
  };
  const step2 = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try { const j = await admApi(`/admin/setup/${encodeURIComponent(t)}/mfa`, { body: { code: codeV.replace(/\s/g, "") } }); setDone(j); } catch (x) { setMsg(err(x)); }
    setBusy(false);
  };
  const finish = () => { admSetToken(done.token); location.href = DEMO ? "#/admin" : "/admin"; if (DEMO) location.reload(); };
  return (
    <main className="adm-login">
      <AdmScene />
      <div className="adm-login__box adm783-setup">
        <div className="adm783-brand"><AdmLogo size={56} big /><b>Frequent Research admin</b></div>
        {info.loading && <p className="adm-muted">Checking your link…</p>}
        {info.err && <><h1>This link does not work</h1><p className="adm-status is-err">{info.err}</p><p className="adm-muted">Links work once and expire (24 hours for the first Super Admin, 72 hours for invitations). Ask your Super Admin to send a new one.</p></>}
        {i && !mfa && !done && (
          <form onSubmit={step1}>
            <p className="adm783-steps"><b>1 Password</b> · 2 Authenticator · 3 Recovery codes</p>
            <h1>{i.kind === "reset" ? "Reset your access" : "Welcome, " + (i.name || i.email)}</h1>
            <p className="adm-muted">Account: <b>{i.email}</b>. Choose a password only you know. A password manager can make one for you.</p>
            <AdmField label="New password"><input className="adm-in" type="password" autoComplete="new-password" value={pw} onChange={(e) => setPw(e.target.value)} autoFocus required /></AdmField>
            <PwMeter pw={pw} email={i.email} />
            <AdmField label="Type it again"><input className="adm-in" type="password" autoComplete="new-password" value={pw2} onChange={(e) => setPw2(e.target.value)} required /></AdmField>
            {pw2 && pw2 !== pw && <p className="adm-status is-err">The two passwords are not the same.</p>}
            <AdmBtn kind="primary" type="submit" disabled={busy || !c.ok || pw !== pw2}>{busy ? "Saving…" : "Next: authenticator"}</AdmBtn>
            <AdmStatus s={msg} />
          </form>
        )}
        {mfa && !done && (
          <form onSubmit={step2}>
            <p className="adm783-steps">1 Password · <b>2 Authenticator</b> · 3 Recovery codes</p>
            <h1>Connect your authenticator app</h1>
            <p className="adm-muted">Open Google Authenticator, Microsoft Authenticator, 1Password or another authenticator app, add an account and scan this code.</p>
            <div className="adm783-qr" dangerouslySetInnerHTML={{ __html: qrSvg(mfa.otpauth, { size: 220 }) }} />
            <details><summary>Cannot scan? Type this key</summary><p><code className="adm783-key">{mfa.secret.replace(/(.{4})/g, "$1 ").trim()}</code> <AdmBtn small onClick={() => copy(mfa.secret)}>Copy</AdmBtn></p><p className="adm-muted">Type: time-based, 6 digits, every 30 seconds.</p></details>
            <AdmField label="The 6-digit code the app shows now"><input className="adm-in adm783-code" inputMode="numeric" autoComplete="one-time-code" maxLength={7} value={codeV} onChange={(e) => setCode(e.target.value)} required /></AdmField>
            <AdmBtn kind="primary" type="submit" disabled={busy || codeV.replace(/\s/g, "").length !== 6}>{busy ? "Checking…" : "Next: recovery codes"}</AdmBtn>
            <AdmStatus s={msg} />
          </form>
        )}
        {done && (
          <div>
            <p className="adm783-steps">1 Password · 2 Authenticator · <b>3 Recovery codes</b></p>
            <h1>Save your recovery codes</h1>
            <p className="adm-muted">If you lose your phone, each of these codes signs you in once. Keep them somewhere safe (a password manager or a printed copy). They are shown only now.</p>
            <ol className="adm783-rc">{done.recovery.map((x) => <li key={x}><code>{x}</code></li>)}</ol>
            <p className="adm-row"><AdmBtn onClick={() => download("frequent-research-admin-recovery-codes.txt", "Frequent Research admin recovery codes for " + i.email + "\n\n" + done.recovery.join("\n") + "\n\nEach code works once.\n")}>Download as a text file</AdmBtn><AdmBtn onClick={() => copy(done.recovery.join("\n"))}>Copy</AdmBtn></p>
            <label className="adm-sw adm-sw--row"><input type="checkbox" checked={saved} onChange={(e) => setSaved(e.target.checked)} /> I saved my recovery codes</label>
            <AdmBtn kind="primary" disabled={!saved} onClick={finish}>Open the admin panel</AdmBtn>
          </div>
        )}
      </div>
    </main>
  );
}

/* ---- confirm with the authenticator (sensitive actions) ------------------------------------------------------------ */
function StepUpBox({ ask, onDone }) {
  const [v, setV] = ee.useState("");
  if (!ask) return null;
  const submit = (e) => { e.preventDefault(); onDone(v.replace(/\s/g, "")); setV(""); };
  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-labelledby="adm783-su">
      <form className="adm-modal__box adm783-su" onSubmit={submit}>
        <h2 id="adm783-su">Confirm it is you</h2>
        <p className="adm-muted">{ask.msg || "Please confirm with the code from your authenticator app."} This is needed for admins and roles, exports, CVs and other sensitive actions, and lasts 10 minutes.</p>
        <AdmField label="6-digit code"><input className="adm-in adm783-code" inputMode="numeric" autoComplete="one-time-code" maxLength={7} value={v} onChange={(e) => setV(e.target.value)} autoFocus required /></AdmField>
        <div className="adm-row"><AdmBtn kind="primary" type="submit" disabled={v.replace(/\s/g, "").length !== 6}>Confirm</AdmBtn><AdmBtn kind="ghost" onClick={() => { onDone(null); setV(""); }}>Cancel</AdmBtn></div>
      </form>
    </div>
  );
}

/* ---- access to particular items and pages ------------------------------------------------------------------------ */
let KEYS_P = null;
const contentKeys = () => (KEYS_P = KEYS_P || admApi("/admin/content").then((j) => j.keys).catch(() => []));
function Grants({ value, onChange, modules }) {
  const [keys, setKeys] = ee.useState([]);
  ee.useEffect(() => { contentKeys().then(setKeys); }, []);
  const list = value || [];
  const set = (i, patch) => onChange(list.map((g, j) => (j === i ? { ...g, ...patch } : g)));
  const mods = Object.entries(modules || {});
  return (
    <div className="adm783-grants">
      {!list.length && <p className="adm-muted">No extra access. The role decides everything.</p>}
      {list.map((g, i) => {
        const M = (modules || {})[g.module] || { actions: [] };
        const mk = keys.filter((k) => k.module === g.module);
        return (
          <div key={i} className="adm783-grant">
            <div className="adm-row">
              <select className="adm-in adm-in--auto" value={g.module} onChange={(e) => set(i, { module: e.target.value, actions: [], keys: [], paths: [] })} aria-label="Area">{mods.map(([id, m]) => <option key={id} value={id}>{m.label}</option>)}</select>
              <AdmBtn small kind="danger" onClick={() => onChange(list.filter((_, j) => j !== i))}>Remove</AdmBtn>
            </div>
            <div className="adm783-acts">{M.actions.map((a) => <label key={a} className="adm-sw"><input type="checkbox" checked={(g.actions || []).includes(a)} onChange={(e) => set(i, { actions: e.target.checked ? [...(g.actions || []), a] : (g.actions || []).filter((x) => x !== a) })} /> {ACTION_L[a]}</label>)}</div>
            {mk.length > 0 && (
              <AdmField label="Only these items (leave all unticked for the whole area)">
                <div className="adm783-keys">{mk.map((k) => <label key={k.key} className="adm-sw"><input type="checkbox" checked={(g.keys || []).includes(k.key)} onChange={(e) => set(i, { keys: e.target.checked ? [...(g.keys || []), k.key] : (g.keys || []).filter((x) => x !== k.key) })} /> {k.label.split(":")[0].slice(0, 60)}</label>)}</div>
              </AdmField>
            )}
            {M.paths && (
              <AdmField label="Only these pages (one address per line; empty = every page)" help="Examples: /about-us · /blog/* (every blog post) · /services/market-research/* · * (all pages)">
                <textarea className="adm-in adm-ta" rows={3} value={(g.paths || []).join("\n")} onChange={(e) => set(i, { paths: e.target.value.split(/\n+/).map((x) => x.trim()).filter(Boolean) })} placeholder="/blog/*" />
              </AdmField>
            )}
            <AdmField label="Why (for the activity log)"><input className="adm-in" value={g.note || ""} onChange={(e) => set(i, { note: e.target.value })} placeholder="e.g. writes the November blog posts" /></AdmField>
          </div>
        );
      })}
      <AdmBtn small onClick={() => onChange([...list, { module: "pages", actions: ["view", "edit"], keys: [], paths: [], note: "" }])}>+ Give access to a particular area, item or page</AdmBtn>
    </div>
  );
}

/* ---- admins -------------------------------------------------------------------------------------------------------- */
function LinkBox({ link }) {
  if (!link) return null;
  return <div className="adm783-link"><p><b>Email is not set up on the server</b>, so send this one-time link to the person yourself, privately (it works once):</p><code>{link}</code><AdmBtn small onClick={() => copy(link)}>Copy link</AdmBtn></div>;
}
function Invite({ roles, modules, me, onClose, onDone }) {
  const [f, setF] = ee.useState({ name: "", email: "", mobile: "", department: "", designation: "", role: "viewer", grants: [] });
  const [msg, setMsg] = ee.useState(null);
  const [res, setRes] = ee.useState(null);
  const [busy, setBusy] = ee.useState(false);
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = async (e) => {
    e.preventDefault(); setBusy(true); setMsg(null);
    try { const j = await admApi("/admin/users", { body: f }); setRes(j); onDone(); } catch (x) { setMsg(err(x)); }
    setBusy(false);
  };
  const r = roles.find((x) => x.id === f.role);
  return (
    <div className="adm-modal" role="dialog" aria-modal="true" aria-labelledby="adm783-inv">
      <form className="adm-modal__box" onSubmit={send}>
        <h2 id="adm783-inv">Invite an admin</h2>
        {res ? (<>
          <p className="adm-status">{res.note}</p>
          <LinkBox link={res.link} />
          <AdmBtn kind="primary" onClick={onClose}>Done</AdmBtn>
        </>) : (<>
          <div className="adm-grid">
            <AdmField label="Full name"><input className="adm-in" value={f.name} onChange={on("name")} required autoFocus /></AdmField>
            <AdmField label="Official email"><input className="adm-in" type="email" value={f.email} onChange={on("email")} required placeholder="name@frequentresearch.com" /></AdmField>
            <AdmField label="Mobile"><input className="adm-in" value={f.mobile} onChange={on("mobile")} placeholder="+91 …" /></AdmField>
            <AdmField label="Department"><input className="adm-in" value={f.department} onChange={on("department")} /></AdmField>
            <AdmField label="Designation"><input className="adm-in" value={f.designation} onChange={on("designation")} /></AdmField>
            <AdmField label="Role"><select className="adm-in" value={f.role} onChange={on("role")}>{roles.filter((x) => x.id !== "super" || me.user.role === "super").map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></AdmField>
          </div>
          {r && <p className="adm-muted">{r.note}</p>}
          <AdmCard title="Extra access to particular items or pages" sub="optional: e.g. only the blog pages, or only the Team list">
            <Grants value={f.grants} onChange={(g) => setF({ ...f, grants: g })} modules={modules} />
          </AdmCard>
          <p className="adm-muted">They get an email with a one-time link (72 hours) to set a password and their authenticator app. Nobody, not even you, sees their password.</p>
          <div className="adm-row"><AdmBtn kind="primary" type="submit" disabled={busy}>{busy ? "Sending…" : "Send invitation"}</AdmBtn><AdmBtn kind="ghost" onClick={onClose}>Cancel</AdmBtn></div>
          <AdmStatus s={msg} />
        </>)}
      </form>
    </div>
  );
}
function UserDrawer({ id, roles, modules, me, onChange, onClose, go }) {
  const [st, reload] = useAsync(() => admApi("/admin/users?limit=500").then((j) => j.users.find((u) => u.id === id)), [id]);
  const [sess, reloadSess] = useAsync(() => admApi(`/admin/users/${id}/sessions`).then((j) => j.sessions), [id]);
  const [log] = useAsync(() => (admCan(me, "activity", "view") ? admApi("/admin/audit?limit=30&actor=" + encodeURIComponent(id)).then((j) => j.rows) : []), [id]);
  const [f, setF] = ee.useState(null);
  const [msg, setMsg] = ee.useState(null);
  const [link, setLink] = ee.useState("");
  const u = st.data;
  ee.useEffect(() => { if (u) setF({ name: u.name, mobile: u.mobile, department: u.department, designation: u.designation, role: u.role, grants: u.grants || [] }); }, [u && u.id, u && u.role, u && JSON.stringify(u.grants)]);
  if (!u || !f) return <aside className="adm-drawer"><p className="adm-muted">{st.err || "Loading…"}</p></aside>;
  const manage = admCan(me, "users", "manage"), edit = admCan(me, "users", "edit");
  const save = async (body) => { setMsg(null); try { await admApi("/admin/users/" + id, { method: "PATCH", body }); setMsg({ ok: "Saved." }); reload(); onChange(); } catch (x) { setMsg(err(x)); } };
  const act = async (a, ask) => {
    if (ask && !confirm(ask)) return;
    setMsg(null); setLink("");
    try { const j = await admApi(`/admin/users/${id}/${a}`, { body: {} }); setMsg({ ok: { resend: j.emailed ? "Invitation sent again." : "New invitation link made.", suspend: "Suspended and signed out everywhere.", deactivate: "Deactivated and signed out everywhere.", reactivate: j.link || j.emailed ? "A new setup link was made." : "Active again.", "revoke-sessions": `Signed out of ${j.sessions || 0} session(s).`, reset: "Password and authenticator removed; a new setup link was made." }[a] }); if (j.link) setLink(j.link); reload(); reloadSess(); onChange(); } catch (x) { setMsg(err(x)); }
  };
  const self = u.id === me.user.id;
  const on = (k) => (e) => setF({ ...f, [k]: e.target.value });
  return (
    <aside className="adm-drawer adm783-drawer" aria-label="Admin details">
      <header><h2>{u.name}</h2><AdmBtn kind="ghost" onClick={onClose}>Close ✕</AdmBtn></header>
      <p className="adm-muted">{u.email} · <span className={"adm-pill adm783-st--" + u.status}>{STATUS_L[u.status] || u.status}</span> · {u.mfa ? "Authenticator on" : "No authenticator yet"} · last sign-in {u.lastLogin ? admWhen(u.lastLogin) : "never"}</p>
      <p className="adm-muted">Invited by {u.by || "—"} on {admWhen(u.created)}{u.invited ? ` · link expires ${admWhen(u.invited.exp)}` : ""}{u.mfa ? ` · ${u.recoveryLeft} recovery codes left` : ""}</p>
      <AdmStatus s={msg} />
      <LinkBox link={link} />
      <h3>Details</h3>
      <div className="adm-grid">
        <AdmField label="Name"><input className="adm-in" value={f.name} onChange={on("name")} disabled={!edit} /></AdmField>
        <AdmField label="Mobile"><input className="adm-in" value={f.mobile} onChange={on("mobile")} disabled={!edit} /></AdmField>
        <AdmField label="Department"><input className="adm-in" value={f.department} onChange={on("department")} disabled={!edit} /></AdmField>
        <AdmField label="Designation"><input className="adm-in" value={f.designation} onChange={on("designation")} disabled={!edit} /></AdmField>
      </div>
      {edit && <AdmBtn small onClick={() => save({ name: f.name, mobile: f.mobile, department: f.department, designation: f.designation })}>Save details</AdmBtn>}
      <h3>Role and access</h3>
      <AdmField label="Role"><select className="adm-in" value={f.role} onChange={on("role")} disabled={!manage || self}>{roles.filter((x) => x.id !== "super" || me.user.role === "super").map((x) => <option key={x.id} value={x.id}>{x.name}</option>)}</select></AdmField>
      {(roles.find((x) => x.id === f.role) || {}).note && <p className="adm-muted">{roles.find((x) => x.id === f.role).note}</p>}
      {f.role !== "super" && <Grants value={f.grants} onChange={(g) => setF({ ...f, grants: g })} modules={modules} />}
      {manage && <AdmBtn kind="primary" onClick={() => save({ role: f.role, grants: f.grants })}>Save role and access</AdmBtn>}
      {!self && edit && (<>
        <h3>Account</h3>
        <div className="adm-row adm783-acts">
          {u.status === "invited" && admCan(me, "users", "create") && <AdmBtn small onClick={() => act("resend")}>Send the invitation again</AdmBtn>}
          {u.status === "active" && <AdmBtn small onClick={() => act("suspend", `Suspend ${u.name}? They are signed out at once and cannot sign in until reactivated.`)}>Suspend</AdmBtn>}
          {["suspended", "deactivated"].includes(u.status) && <AdmBtn small onClick={() => act("reactivate")}>Reactivate</AdmBtn>}
          <AdmBtn small onClick={() => act("revoke-sessions", `Sign ${u.name} out of every device?`)}>Sign out everywhere</AdmBtn>
          <AdmBtn small onClick={() => act("reset", `Reset ${u.name}'s access? Their password and authenticator are removed and they get a new setup link. Use this when they lost their phone or password.`)}>Reset access (lost phone / password)</AdmBtn>
          {u.status !== "deactivated" && admCan(me, "users", "delete") && <AdmBtn small kind="danger" onClick={() => act("deactivate", `Deactivate ${u.name}? Use this when they leave. Their history stays in the activity log.`)}>Deactivate</AdmBtn>}
        </div>
      </>)}
      <h3>Sessions</h3>
      <div className="adm-table"><table><thead><tr><th>Started</th><th>Last used</th><th>Device</th><th></th></tr></thead><tbody>
        {(sess.data || []).map((s) => <tr key={s.id + s.created}><td>{admWhen(s.created)}</td><td>{admWhen(s.last)}</td><td className="adm-clip">{s.ua}</td><td>{s.revoked ? "ended" : "open"}</td></tr>)}
        {sess.data && !sess.data.length && <tr><td colSpan={4} className="adm-muted">No sessions.</td></tr>}
      </tbody></table></div>
      {log.data && log.data.length > 0 && (<>
        <h3>Recent activity <AdmBtn small kind="ghost" onClick={() => go && go("activity")}>Full log →</AdmBtn></h3>
        <ul className="adm783-log">{log.data.map((r) => <li key={r.id}><small>{admWhen(r.at)}</small> {r.action.replace(/-/g, " ")} <b>{r.target}</b></li>)}</ul>
      </>)}
    </aside>
  );
}
function Users({ go }) {
  const [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const [f, setF] = ee.useState({ q: "", role: "", status: "" });
  const [skip, setSkip] = ee.useState(0);
  const qs = new URLSearchParams(Object.entries({ ...f, skip, limit: 50 }).filter(([, v]) => v !== "")).toString();
  const [st, reload] = useAsync(() => admApi("/admin/users?" + qs), [qs]);
  const [rs] = useAsync(() => admApi("/admin/roles"), []);
  const [open, setOpen] = ee.useState(null);
  const [inv, setInv] = ee.useState(false);
  const roles = (rs.data && rs.data.roles) || [];
  const rn = (id) => (roles.find((r) => r.id === id) || {}).name || id;
  const on = (k) => (e) => { setSkip(0); setF({ ...f, [k]: e.target.value }); };
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Admins</h1>{me && admCan(me, "users", "create") && <AdmBtn kind="primary" onClick={() => setInv(true)}>+ Invite an admin</AdmBtn>}</header>
      <p className="adm-muted">Give each person a role, and if needed access to particular items or pages only. Every change is in the activity log. Sensitive actions ask for your authenticator code.</p>
      <div className="adm-filters">
        <input className="adm-in" placeholder="Search name, email, department…" value={f.q} onChange={on("q")} />
        <select className="adm-in adm-in--auto" value={f.role} onChange={on("role")}><option value="">All roles</option>{roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}</select>
        <select className="adm-in adm-in--auto" value={f.status} onChange={on("status")}><option value="">Any status</option>{Object.entries(STATUS_L).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
      </div>
      {st.err && <AdmStatus s={{ err: st.err }} />}
      <div className="adm-table"><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Department</th><th>Status</th><th>Last sign-in</th></tr></thead><tbody>
        {(st.data ? st.data.users : []).map((u) => (
          <tr key={u.id} className={open === u.id ? "is-on" : ""} onClick={() => setOpen(u.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen(u.id)}>
            <td><span className="adm784-who"><AdmFace user={u} size={34} /><span><b>{u.name}</b>{u.designation && <small className="adm783-sub">{u.designation}</small>}</span></span></td><td>{u.email}</td><td>{rn(u.role)}{u.grants.length ? <small className="adm783-sub">+{u.grants.length} extra</small> : null}</td><td>{u.department}</td>
            <td><span className={"adm-pill adm783-st--" + u.status}>{STATUS_L[u.status] || u.status}</span></td><td>{u.lastLogin ? admWhen(u.lastLogin) : "never"}</td>
          </tr>
        ))}
        {st.data && !st.data.users.length && <tr><td colSpan={6} className="adm-muted">No admins match.</td></tr>}
      </tbody></table></div>
      {st.data && <div className="adm-pager"><span>{admNum(st.data.total)} admins</span><AdmBtn small disabled={!skip} onClick={() => setSkip(Math.max(0, skip - 50))}>← Back</AdmBtn><AdmBtn small disabled={skip + 50 >= st.data.total} onClick={() => setSkip(skip + 50)}>More →</AdmBtn></div>}
      {inv && me && rs.data && <Invite roles={roles} modules={rs.data.modules} me={me} onClose={() => setInv(false)} onDone={reload} />}
      {open && me && rs.data && <UserDrawer id={open} roles={roles} modules={rs.data.modules} me={me} onChange={reload} onClose={() => setOpen(null)} go={go} />}
    </section>
  );
}

/* ---- roles ---------------------------------------------------------------------------------------------------------- */
function RoleCard({ r, data, canEdit, onSaved }) {
  const [p, setP] = ee.useState(r.perms);
  const [name, setName] = ee.useState(r.name);
  const [note, setNote] = ee.useState(r.note);
  const [msg, setMsg] = ee.useState(null);
  const ro = r.id === "super" || !canEdit;
  const toggle = (m, a) => { const cur = p[m] || []; setP({ ...p, [m]: cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a] }); };
  const save = async () => { setMsg(null); try { await admApi("/admin/roles/" + r.id, { method: "PUT", body: { name, note, perms: p } }); setMsg({ ok: "Saved. It applies at once to everyone with this role." }); onSaved(); } catch (x) { setMsg(err(x)); } };
  const reset = async () => { if (!confirm(r.builtIn ? "Put this role back to its standard rights?" : "Remove this role?")) return; try { await admApi("/admin/roles/" + r.id, { method: "DELETE" }); onSaved(); } catch (x) { setMsg(err(x)); } };
  return (
    <AdmCard title={r.name} sub={`${r.users} admin${r.users === 1 ? "" : "s"}${r.changed ? " · changed" : ""}${r.builtIn ? "" : " · your own role"}`}>
      {r.id === "super" ? <p className="adm-muted">The Super Admin always has every right. Keep this role for one or two people.</p> : (<>
        <div className="adm-grid"><AdmField label="Name"><input className="adm-in" value={name} onChange={(e) => setName(e.target.value)} disabled={ro} /></AdmField><AdmField label="What it is for"><input className="adm-in" value={note} onChange={(e) => setNote(e.target.value)} disabled={ro} /></AdmField></div>
      </>)}
      <div className="adm-table adm783-matrix"><table><thead><tr><th>Area</th>{data.actions.map((a) => <th key={a}>{ACTION_L[a]}</th>)}</tr></thead><tbody>
        {Object.entries(data.modules).map(([m, M]) => (
          <tr key={m}><td>{M.label}</td>{data.actions.map((a) => <td key={a}>{M.actions.includes(a) ? <input type="checkbox" aria-label={M.label + ": " + ACTION_L[a]} checked={r.id === "super" || (p[m] || []).includes(a)} disabled={ro} onChange={() => toggle(m, a)} /> : ""}</td>)}</tr>
        ))}
      </tbody></table></div>
      {!ro && <div className="adm-row"><AdmBtn kind="primary" onClick={save}>Save role</AdmBtn>{(r.changed || !r.builtIn) && <AdmBtn kind="ghost" onClick={reset}>{r.builtIn ? "Back to standard" : "Remove role"}</AdmBtn>}</div>}
      <AdmStatus s={msg} />
    </AdmCard>
  );
}
function Roles() {
  const [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const [st, reload] = useAsync(() => admApi("/admin/roles"), []);
  const [nid, setNid] = ee.useState("");
  const canEdit = me && admCan(me, "users", "manage");
  const add = async () => { const id = nid.trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"); if (!id) return; try { await admApi("/admin/roles/" + id, { method: "PUT", body: { name: nid.trim(), perms: { dashboard: ["view"] } } }); setNid(""); reload(); } catch (x) { alert(x.message); } };
  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>Roles & rights</h1></header>
      <p className="adm-muted">A role is a set of rights per area. View = see it, Create / Edit / Delete = make changes (they go to approval), Publish = put changes live, Approve = check other people's changes, Export = download lists, Manage = assign and organise, Configure = connections. For one person only, use Admins › extra access.</p>
      {st.err && <AdmStatus s={{ err: st.err }} />}
      {st.data && st.data.roles.map((r) => <RoleCard key={r.id + (r.changed ? "c" : "")} r={r} data={st.data} canEdit={canEdit} onSaved={reload} />)}
      {canEdit && <div className="adm-row"><input className="adm-in adm-in--auto" placeholder="New role name, e.g. Blog writer" value={nid} onChange={(e) => setNid(e.target.value)} /><AdmBtn onClick={add} disabled={!nid.trim()}>+ Add a role</AdmBtn></div>}
    </section>
  );
}

/* ---- approvals ---------------------------------------------------------------------------------------------------- */
const pretty = (v) => (v === null || v === undefined ? "(nothing)" : typeof v === "string" ? v : JSON.stringify(v, null, 2));
function changes(live, proposed) {
  const isO = (x) => x && typeof x === "object" && !Array.isArray(x);
  if (Array.isArray(live) || Array.isArray(proposed)) {
    const a = Array.isArray(live) ? live : [], b = Array.isArray(proposed) ? proposed : [], out = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) out.push([`Item ${i + 1}`, a[i], b[i]]);
    return out;
  }
  if (isO(live) || isO(proposed)) {
    const a = isO(live) ? live : {}, b = isO(proposed) ? proposed : {}, out = [];
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) if (JSON.stringify(a[k]) !== JSON.stringify(b[k])) out.push([k === "*" ? "Every page" : k, a[k], b[k]]);
    return out;
  }
  return JSON.stringify(live) === JSON.stringify(proposed) ? [] : [["Value", live, proposed]];
}
function ApprovalDrawer({ id, onChange, onClose }) {
  const [st, reload] = useAsync(() => admApi("/admin/approvals/" + id), [id]);
  const [note, setNote] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const d = st.data;
  if (!d) return <aside className="adm-drawer"><p className="adm-muted">{st.err || "Loading…"}</p></aside>;
  const it = d.item;
  const act = async (a, body = {}) => {
    setMsg(null);
    try { await admApi(`/admin/approvals/${id}/${a}`, { body: { note, ...body } }); setMsg({ ok: "Done: " + (DRAFT_L[{ submit: "submitted", withdraw: "draft", review: "under_review", approve: body.publish ? "published" : "approved", reject: "rejected", publish: "published", archive: "archived" }[a]] || a) + "." }); setNote(""); reload(); onChange(); }
    catch (x) { if (x.body && x.body.conflict && confirm(x.message)) return act(a, { ...body, force: true }); setMsg(err(x)); }
  };
  const diff = changes(d.live, d.proposed);
  const open = !["published", "archived"].includes(it.status);
  return (
    <aside className="adm-drawer adm783-drawer adm783-wide" aria-label="Change details">
      <header><h2>{it.label}</h2><AdmBtn kind="ghost" onClick={onClose}>Close ✕</AdmBtn></header>
      <p className="adm-muted">{it.moduleLabel} · by {it.author} · {admWhen(it.updated)} · <b>{DRAFT_L[it.status]}</b>{it.reviewer ? " · reviewer " + it.reviewer : ""}</p>
      {it.paths.length > 0 && <p className="adm-muted">Pages: {it.paths.map((p) => <code key={p}>{p === "*" ? "every page" : p}</code>)}</p>}
      {it.note && <p className="adm-status is-err">Note: {it.note}</p>}
      {it.conflict && <p className="adm-status is-err">The live version changed after this draft was made.{it.paths.length ? " Only this draft's pages will change." : " Publishing will replace those changes."}</p>}
      <h3>What changes ({diff.length})</h3>
      <div className="adm783-diff">
        {diff.slice(0, 80).map(([k, a, b]) => (
          <div key={k} className="adm783-diff__row"><b>{k}</b><div className="adm783-diff__cols"><div><small>Now on the site</small><pre className="is-old">{pretty(a)}</pre></div><div><small>Proposed</small><pre className="is-new">{pretty(b)}</pre></div></div></div>
        ))}
        {!diff.length && <p className="adm-muted">No difference with the live version.</p>}
        {diff.length > 80 && <p className="adm-muted">…and {diff.length - 80} more.</p>}
      </div>
      {open && (<>
        <AdmField label="Note (needed when you send it back)"><textarea className="adm-in adm-ta" rows={2} value={note} onChange={(e) => setNote(e.target.value)} /></AdmField>
        <div className="adm-row adm783-acts">
          {it.canApprove && it.status === "submitted" && <AdmBtn small onClick={() => act("review")}>Start review</AdmBtn>}
          {it.canApprove && ["submitted", "under_review"].includes(it.status) && <AdmBtn small kind="primary" onClick={() => act("approve")}>Approve</AdmBtn>}
          {it.canApprove && it.canPublish && ["submitted", "under_review"].includes(it.status) && <AdmBtn small kind="primary" onClick={() => act("approve", { publish: true })}>Approve and publish</AdmBtn>}
          {it.canPublish && it.status === "approved" && <AdmBtn small kind="primary" onClick={() => act("publish")}>Publish</AdmBtn>}
          {it.canApprove && ["submitted", "under_review", "approved"].includes(it.status) && <AdmBtn small kind="danger" disabled={!note.trim()} onClick={() => act("reject")}>Send back</AdmBtn>}
          {it.mine && ["draft", "rejected"].includes(it.status) && <AdmBtn small kind="primary" onClick={() => act("submit")}>Send for approval</AdmBtn>}
          {it.mine && ["submitted", "under_review"].includes(it.status) && <AdmBtn small onClick={() => act("withdraw")}>Take back</AdmBtn>}
          <AdmBtn small kind="ghost" onClick={() => confirm("Archive this change? It will not be published.") && act("archive")}>Archive</AdmBtn>
        </div>
        {it.mine && !it.canApprove && <p className="adm-muted">You cannot approve your own change: a colleague with the Approve right does that.</p>}
      </>)}
      <AdmStatus s={msg} />
      <h3>History</h3>
      <ul className="adm783-log">{(it.history || []).slice().reverse().map((h, i) => <li key={i}><small>{admWhen(h.at)}</small> {h.by}: <b>{DRAFT_L[h.status] || h.status}</b>{h.note ? " — " + h.note : ""}</li>)}</ul>
    </aside>
  );
}
function Approvals() {
  const [tab, setTab] = ee.useState("todo");
  const [st, reload] = useAsync(() => admApi("/admin/approvals?status=" + (tab === "all" ? "all" : "open")).then((j) => j.items), [tab]);
  const [open, setOpen] = ee.useState(null);
  const items = (st.data || []).filter((x) => (tab === "todo" ? !x.mine && ((x.canApprove && ["submitted", "under_review"].includes(x.status)) || (x.canPublish && x.status === "approved")) : tab === "mine" ? x.mine : true));
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Approvals</h1></header>
      <p className="adm-muted">Changes by admins without the Publish right wait here. The approver sees the change next to what is live, approves (and publishes) or sends it back with a note. Every published version can be rolled back from All content › history.</p>
      <div className="adm-seg" role="tablist">
        {[["todo", "Waiting for me"], ["mine", "My changes"], ["all", "All"]].map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? "is-on" : ""} onClick={() => setTab(k)}>{l}</button>)}
      </div>
      {st.err && <AdmStatus s={{ err: st.err }} />}
      <div className="adm-table"><table><thead><tr><th>Changed</th><th>What</th><th>Pages</th><th>By</th><th>Status</th></tr></thead><tbody>
        {items.map((x) => (
          <tr key={x.id} className={open === x.id ? "is-on" : ""} onClick={() => setOpen(x.id)} tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setOpen(x.id)}>
            <td>{admWhen(x.updated)}</td><td><b>{String(x.label || x.key || "Change").split(":")[0].slice(0, 70)}</b><small className="adm783-sub">{x.moduleLabel}</small></td><td className="adm-clip">{(x.paths || []).slice(0, 3).join(", ")}{(x.paths || []).length > 3 ? " …" : ""}</td><td>{x.author}</td>
            <td><span className={"adm-pill adm783-d--" + x.status}>{DRAFT_L[x.status]}</span></td>
          </tr>
        ))}
        {st.data && !items.length && <tr><td colSpan={5} className="adm-muted">{tab === "todo" ? "Nothing is waiting for you." : "No changes."}</td></tr>}
      </tbody></table></div>
      {open && <ApprovalDrawer id={open} onChange={reload} onClose={() => setOpen(null)} />}
    </section>
  );
}

/* ---- my account --------------------------------------------------------------------------------------------------- */
function Account() {
  const [me, reloadMe] = useAsync(() => admMe(true), []);
  const [sess, reloadSess] = useAsync(() => admApi("/admin/account/sessions").then((j) => j.sessions), []);
  const [pw, setPw] = ee.useState({ current: "", password: "", password2: "", code: "" });
  const [msg, setMsg] = ee.useState(null);
  const [rc, setRc] = ee.useState(null);
  const [ph, setPh] = ee.useState(null);
  const m = me.data;
  if (!m) return <section className="adm-sec"><p className="adm-muted">{me.err || "Loading…"}</p></section>;
  const u = m.user;
  const change = async (e) => {
    e.preventDefault(); setMsg(null);
    try { const j = await admApi("/admin/account/password", { body: { current: pw.current, password: pw.password, code: pw.code.replace(/\s/g, "") } }); setMsg({ ok: `Password changed. ${j.otherSessionsClosed} other session(s) were signed out.` }); setPw({ current: "", password: "", password2: "", code: "" }); reloadSess(); }
    catch (x) { setMsg(err(x)); }
  };
  const c = pwCheck(pw.password, u.email);
  const on = (k) => (e) => setPw({ ...pw, [k]: e.target.value });
  const ini = String(u.name || u.email).split(/\s+/).slice(0, 2).map((x) => x[0]).join("").toUpperCase();
  const areas = Object.entries(m.perms).filter(([, a]) => a.length);
  const sCount = (sess.data || []).length;
  return (
    <section className="adm-sec adm784-acc">
      <div className="adm784-profile">
        <div className="adm784-profile__bg" aria-hidden="true"><i /><i /></div>
        <div className="adm784-avatar">
          <AdmFace user={u} size={88} />
          <label className="adm784-avatar__cam" title={u.photo ? "Change my photo" : "Add my photo"}>
            <Camera size={16} aria-hidden="true" /><span className="adm-sr">{u.photo ? "Change my photo" : "Add my photo"}</span>
            <input type="file" accept="image/*" onChange={async (e) => {
              const f = e.target.files && e.target.files[0]; e.target.value = ""; if (!f) return;
              setPh({ busy: true });
              try { const photo = await admMakePhoto(f); await admApi("/admin/account/photo", { method: "PUT", body: { photo } }); setPh({ ok: "Photo saved" }); reloadMe(); window.dispatchEvent(new Event("adm-me")); admSfx("ok"); }
              catch (x) { setPh({ err: x.message }); }
            }} />
          </label>
          {ph && ph.busy && <span className="adm784-avatar__busy" aria-live="polite">Saving…</span>}
        </div>
        <div className="adm784-profile__txt">
          <h1>{u.name}</h1>
          <p>{u.designation || "Admin"}{u.department ? " · " + u.department : ""}</p>
          <p className="adm784-phototip">{ph && ph.err ? <span className="is-err">{ph.err}</span> : ph && ph.ok ? ph.ok : u.photo ? "Your photo shows in the menu, on the dashboard and in the admins list." : "Add your photo: press the camera on your picture."}
            {u.photo && <button type="button" onClick={async () => { try { await admApi("/admin/account/photo", { method: "DELETE" }); setPh({ ok: "Photo removed" }); reloadMe(); window.dispatchEvent(new Event("adm-me")); } catch (x) { setPh({ err: x.message }); } }}><Trash2 size={13} aria-hidden="true" /> Remove photo</button>}</p>
          <p className="adm784-chips"><span className="adm784-chip adm784-chip--role">{m.roleName}</span>{m.grants.length > 0 && <span className="adm784-chip">+ {m.grants.length} extra access</span>}<span className="adm784-chip">{u.email}</span></p>
        </div>
      </div>
      <div className="adm784-sec">
        <div className="adm784-sec__c is-ok"><ShieldCheck size={22} aria-hidden="true" /><b>Authenticator on</b><small>Codes from your phone at every sign-in</small></div>
        <div className={"adm784-sec__c " + (u.recoveryLeft >= 4 ? "is-ok" : "is-warn")}><KeyRound size={22} aria-hidden="true" /><b>{u.recoveryLeft} recovery codes left</b><small>{u.recoveryLeft >= 4 ? "Keep them somewhere safe" : "Make new ones below"}</small></div>
        <div className="adm784-sec__c"><Laptop size={22} aria-hidden="true" /><b>{sCount} active session{sCount === 1 ? "" : "s"}</b><small>Sign out the ones you do not know</small></div>
        <div className="adm784-sec__c"><Clock size={22} aria-hidden="true" /><b>Signed in until {new Date(m.sessionExpires).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</b><small>Or after 2 hours without use</small></div>
      </div>
      <h2>My colours</h2>
      <p className="adm-muted">Pick the colours of your whole admin panel. Saved with your account, so they follow you to every computer. Light or dark: the switch at the bottom of the menu.</p>
      <AdmPalettes />
      <h2>What I can do</h2>
      <div className="adm784-rights">
        {areas.map(([k, a], i) => <div key={k} className="adm784-right" style={{ "--i": i }}><b>{(m.modules[k] || {}).label || k}</b><span>{a.map((x) => <i key={x}>{ACTION_L[x]}</i>)}</span></div>)}
        {m.grants.map((g, i) => <div key={"g" + i} className="adm784-right adm784-right--x" style={{ "--i": areas.length + i }}><b>{(m.modules[g.module] || {}).label}</b><span>{g.actions.map((x) => <i key={x}>{ACTION_L[x]}</i>)}</span><small>{g.keys.length ? "only " + g.keys.join(", ") : ""}{g.paths.length ? " pages " + g.paths.join(", ") : ""}</small></div>)}
      </div>
      <div className="adm784-cols adm784-cols--2">
        <div className="adm784-card">
          <h3><Fingerprint size={16} aria-hidden="true" /> Change my password</h3>
          <form onSubmit={change} className="adm783-form">
            <AdmField label="Current password"><input className="adm-in" type="password" autoComplete="current-password" value={pw.current} onChange={on("current")} required /></AdmField>
            <AdmField label="New password"><input className="adm-in" type="password" autoComplete="new-password" value={pw.password} onChange={on("password")} required /></AdmField>
            <PwMeter pw={pw.password} email={u.email} />
            <AdmField label="New password again"><input className="adm-in" type="password" autoComplete="new-password" value={pw.password2} onChange={on("password2")} required /></AdmField>
            <AdmField label="Code from your authenticator"><input className="adm-in adm783-code" inputMode="numeric" autoComplete="one-time-code" maxLength={7} value={pw.code} onChange={on("code")} required /></AdmField>
            <AdmBtn kind="primary" type="submit" disabled={!c.ok || pw.password !== pw.password2 || !pw.current}>Change password</AdmBtn>
          </form>
          <AdmStatus s={msg} />
        </div>
        <div className="adm784-card">
          <h3><KeyRound size={16} aria-hidden="true" /> Recovery codes</h3>
          <p className="adm-muted">If you lose your phone, each code signs you in once. New codes replace the old ones.</p>
          <AdmBtn onClick={async () => { try { const j = await admApi("/admin/account/recovery-codes", { body: {} }); setRc(j.recovery); reloadMe(); } catch (x) { setMsg(err(x)); } }}>Make new recovery codes</AdmBtn>
          {rc && <><ol className="adm783-rc">{rc.map((x) => <li key={x}><code>{x}</code></li>)}</ol><AdmBtn small onClick={() => download("frequent-research-admin-recovery-codes.txt", rc.join("\n") + "\n")}>Download</AdmBtn></>}
          <h3><Smartphone size={16} aria-hidden="true" /> Where I am signed in</h3>
          <ul className="adm784-sess">
            {(sess.data || []).map((x) => <li key={x.id}><Laptop size={18} aria-hidden="true" /><p><b>{/Mobile|Android|iPhone/.test(x.ua) ? "Phone" : "Computer"}{x.current ? " · this one" : ""}</b><small>{admWhen(x.last)} · since {admWhen(x.created)}</small></p>{!x.current && <AdmBtn small onClick={async () => { await admApi(`/admin/account/sessions/${x.id}/revoke`, { body: {} }); reloadSess(); }}><LogOut size={14} aria-hidden="true" /> Sign out</AdmBtn>}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---- overview cards (top of the dashboard) -------------------------------------------------------------------------- */
function Overview({ go }) {
  const [st] = useAsync(() => admApi("/admin/overview"), []);
  const [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const d = st.data;
  if (!d) return null;
  const c = d.content || {};
  const waiting = (c.submitted || 0) + (c.under_review || 0) + (c.approved || 0);
  const K = ({ n, l, to }) => <button type="button" className="adm-kpi adm783-kpi" onClick={() => to && go(to)}><b><AdmCount n={n} /></b><span>{l}</span></button>;
  return (
    <div className="adm783-ov">
      {me && <p className="adm783-hello">Hello {me.user.name.split(" ")[0]} · {me.roleName}</p>}
      <div className="adm-kpis">
        {d.admins && <K n={d.admins.active} l={`admins active${d.admins.invited ? ` · ${d.admins.invited} invited` : ""}${d.admins.suspended ? ` · ${d.admins.suspended} suspended` : ""}`} to="users" />}
        <K n={waiting} l="changes waiting for approval" to="approvals" />
        <K n={(c.draft || 0) + (c.rejected || 0)} l="drafts and sent-back changes" to="approvals" />
        <K n={c.published} l="items changed from the original" to="content" />
        {d.pages && d.pages.custom > 0 && <K n={d.pages.custom} l="new pages" to="new-pages" />}
        {d.enquiries && <K n={d.enquiries.week} l={`enquiries this week · ${d.enquiries.open} new`} to="leads" />}
        {d.enquiries && d.enquiries.mine > 0 && <K n={d.enquiries.mine} l="leads assigned to me" to="leads" />}
        {d.careers && <K n={d.careers.week} l={`job applications this week · ${d.careers.open} new`} to="leads" />}
      </div>
      {d.recent && d.recent.length > 0 && (
        <details className="adm783-recent"><summary>Recent activity</summary>
          <ul className="adm783-log">{d.recent.map((r, i) => <li key={i}><small>{admWhen(r.at)}</small> {(r.actor && (r.actor.name || r.actor.email)) || "—"}: {r.action.replace(/-/g, " ")} <b>{r.target}</b></li>)}</ul>
        </details>
      )}
    </div>
  );
}

/* ---- SEO per page --------------------------------------------------------------------------------------------------- */
const SEO_F = [
  ["title", "Page title (browser tab and Google)", 60], ["description", "Meta description (Google snippet)", 160], ["keywords", "Keywords (comma separated)", 0],
  ["canonical", "Canonical address (only if another address is the main one)", 0], ["ogTitle", "Title when shared (Facebook, LinkedIn, WhatsApp)", 70], ["ogDescription", "Text when shared", 200],
];
function Seo() {
  const [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const [data, setData] = ee.useState(null);
  const [pages, setPages] = ee.useState([]);
  const [q, setQ] = ee.useState("");
  const [path, setPath] = ee.useState("/");
  const [msg, setMsg] = ee.useState(null);
  ee.useEffect(() => {
    admGet("seo").then((d) => setData(d && typeof d === "object" ? d : {})).catch((e) => setMsg(err(e)));
    Promise.all([admLoadSiteIndex(), admGet("custom-pages").catch(() => [])]).then(([ix, custom]) => {
      const l = ix ? ix.pages.map((p) => ({ path: p.path, title: p.title })) : [];
      for (const c of Array.isArray(custom) ? custom : []) if (c && c.path && !l.some((x) => x.path === c.path)) l.push({ path: c.path, title: c.title || c.path });
      setPages(l);
    });
  }, []);
  if (!data) return <section className="adm-sec"><p className="adm-muted">Loading…</p><AdmStatus s={msg} /></section>;
  const s = data[path] || {};
  const set = (k, v) => { const n = { ...s, [k]: v }; for (const x of Object.keys(n)) if (n[x] === "" || n[x] === false) delete n[x]; const d = { ...data }; if (Object.keys(n).length) d[path] = n; else delete d[path]; setData(d); };
  const mayPath = (p) => !me || admCan(me, "seo", "edit", { key: "seo", path: p });
  const shown = pages.filter((p) => !q || (p.path + " " + p.title).toLowerCase().includes(q.toLowerCase())).slice(0, 200);
  const cur = pages.find((p) => p.path === path);
  let schemaBad = "";
  if (s.schema) { try { JSON.parse(s.schema); } catch (e) { schemaBad = "This is not valid JSON-LD yet."; } }
  const redirects = Array.isArray(data._redirects) ? data._redirects : [];
  const setR = (l) => setData({ ...data, _redirects: l });
  const save = async () => { setMsg(null); try { const j = await admPut("seo", data); setMsg({ ok: j.draft ? "Sent for approval." : "Saved. It shows on the site at the next page load." }); } catch (x) { setMsg(err(x)); } };
  return (
    <section className="adm-sec adm-sec--wide">
      <header className="adm-sec__h"><h1>SEO</h1><AdmBtn kind="primary" onClick={save} disabled={!!schemaBad}>Save</AdmBtn></header>
      <p className="adm-muted">Title, description, sharing card, schema and no-index per page, and redirects from old addresses. Empty fields keep what the page has now. The sitemap (sitemap.xml) and robots.txt are made at every release from all pages; a page set to "no-index" tells search engines not to list it.</p>
      <AdmStatus s={msg} />
      <div className="adm-cols adm-cols--side">
        <div className="adm783-plist">
          <input className="adm-in" placeholder={`Search ${pages.length} pages…`} value={q} onChange={(e) => setQ(e.target.value)} />
          <ul>{shown.map((p) => <li key={p.path}><button type="button" className={(p.path === path ? "is-on " : "") + (data[p.path] ? "is-set" : "")} onClick={() => setPath(p.path)} disabled={!mayPath(p.path)}><b>{p.path}</b><small>{p.title}</small></button></li>)}</ul>
          <div className="adm-row"><input className="adm-in" placeholder="/another-address" onKeyDown={(e) => { if (e.key === "Enter" && e.target.value.startsWith("/")) { setPath(e.target.value.trim().toLowerCase()); e.target.value = ""; } }} /></div>
        </div>
        <div>
          <h2><code>{path}</code></h2>
          {cur && <p className="adm-muted">Now: {cur.title}</p>}
          {!mayPath(path) && <p className="adm-status is-err">You do not have access to this page's SEO.</p>}
          {SEO_F.map(([k, l, max]) => (
            <AdmField key={k} label={l} help={max ? `${(s[k] || "").length} / ${max} characters` : undefined}>
              {k === "description" || k === "ogDescription" ? <textarea className="adm-in adm-ta" rows={2} value={s[k] || ""} onChange={(e) => set(k, e.target.value)} /> : <input className="adm-in" value={s[k] || ""} onChange={(e) => set(k, e.target.value)} placeholder={k === "title" && cur ? cur.title : k === "canonical" ? "https://www.frequentresearch.com" + path : ""} />}
            </AdmField>
          ))}
          <AdmField label="Picture when shared (1200 × 630)"><AdmImage value={s.ogImage || ""} onChange={(v) => set("ogImage", v)} folder="site" /></AdmField>
          <AdmField label="Schema (JSON-LD, optional)" help={schemaBad || 'e.g. {"@context":"https://schema.org","@type":"Service","name":"CATI interviews"}'}><textarea className="adm-in adm-ta adm-code" rows={5} value={s.schema || ""} onChange={(e) => set("schema", e.target.value)} /></AdmField>
          <label className="adm-sw adm-sw--row"><input type="checkbox" checked={!!s.noindex} onChange={(e) => set("noindex", e.target.checked)} /> Hide this page from search engines (no-index)</label>
          <div className="adm783-serp" aria-label="Google preview"><small>{"frequentresearch.com" + (path === "/" ? "" : path)}</small><b>{s.title || (cur && cur.title) || "Frequent Research"}</b><span>{s.description || "The page's own description."}</span></div>
        </div>
      </div>
      {me && admCan(me, "seo", "edit", { key: "seo" }) && (
        <AdmCard title="Redirects" sub={`${redirects.length} old address${redirects.length === 1 ? "" : "es"} sent to a new one`}>
          <p className="adm-muted">When a page moves, send the old address to the new one, so links and Google results keep working.</p>
          {redirects.map((r, i) => (
            <div key={i} className="adm-row"><input className="adm-in" placeholder="/old-address" value={r.from || ""} onChange={(e) => setR(redirects.map((x, j) => (j === i ? { ...x, from: e.target.value } : x)))} /><span>→</span><input className="adm-in" placeholder="/new-address" value={r.to || ""} onChange={(e) => setR(redirects.map((x, j) => (j === i ? { ...x, to: e.target.value } : x)))} /><AdmBtn small kind="danger" onClick={() => setR(redirects.filter((_, j) => j !== i))}>Remove</AdmBtn></div>
          ))}
          <AdmBtn small onClick={() => setR([...redirects, { from: "", to: "" }])}>+ Add a redirect</AdmBtn>
        </AdmCard>
      )}
    </section>
  );
}

export { Account as AdmAccount, Approvals as AdmApprovals, Login as AdmLogin, Overview as AdmOverview, Roles as AdmRoles, Seo as AdmSeo, Setup as AdmSetup, StepUpBox as AdmStepUpBox, Users as AdmUsers };
