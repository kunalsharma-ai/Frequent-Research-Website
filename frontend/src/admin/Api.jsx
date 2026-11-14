/* Build 78.5: every Frequent Research API inside the super admin (System › API).
 *   - live status: API and database up, version, answer time, documents per collection (GET /admin/system)
 *   - every endpoint, grouped and searchable, with what it does and the right it needs (same list as
 *     docs/go-live/15-API-REFERENCE.md; the server checks the rights again on every call)
 *   - "Try it": send a request with your own session (your rights apply, the authenticator code is asked when needed),
 *     see the answer, copy it as curl (the token is never put in the copy)
 * Calls that change data ask "Are you sure?" first. Keep this list in step with backend/src/routes. */
import * as ee from 'react';
import { Activity, CheckCircle2, ChevronRight, Copy, Database, Play, Search, Server, ShieldCheck, XCircle } from 'lucide-react';
import { admApi, admCan, admMe, admNum } from './api.jsx';
import { AdmBtn } from './Fields.jsx';

const DEMO = typeof window !== "undefined" && !!window.__FR_ADMIN_DEMO;
// [method, path, what, right ("public" | "signed" | "area action"), MFA?, sample body]
const API = [
  ["Website (public)", "#0E9C88", [
    ["GET", "/captcha", "CAPTCHA challenge for forms and reviews", "public"],
    ["POST", "/enquiry", "Let's Talk, service forms, RFQs, government brief", "public", 0, { name: "", email: "", company: "", message: "", captcha: {} }],
    ["POST", "/download", "Download form", "public"], ["POST", "/resource-download", "Resource download form", "public"], ["POST", "/case-study-download", "Case study download form", "public"],
    ["POST", "/careers", "Job application (multipart with the CV)", "public"],
    ["POST", "/newsletter", "Newsletter sign-up", "public", 0, { email: "" }],
    ["GET", "/reviews", "Published reviews", "public"], ["GET", "/reviews/summary", "Review score and count", "public"], ["POST", "/reviews", "New review", "public"],
    ["POST", "/chat/start", "Hand the chat to a person", "public"], ["POST", "/chat/:id/message", "Live chat message", "public"], ["GET", "/chat/:id/messages", "Live chat messages (?token=&since=)", "public"],
    ["GET", "/site", "Every published admin change (loaded once per visit)", "public"],
    ["GET", "/content/:key", "One public content piece", "public"], ["GET", "/celebrations", "Festival banners (?year=)", "public"], ["GET", "/gallery", "Gallery", "public"],
    ["GET", "/files/:id/:name", "Public uploaded file", "public"], ["POST", "/track", "Page view (no cookies)", "public", 0, { path: "/", ref: "" }],
    ["GET", "/mail/unsubscribe", "Unsubscribe page (signed link)", "public"], ["GET", "/mail/o/:id.gif", "Email open pixel", "public"],
    ["GET", "/onboarding/form/:kind", "Onboarding form set-up for the client / vendor portal", "public"],
    ["POST", "/integrations/onboarding/:kind", "An onboarding portal delivers a submission (signed)", "public"],
    ["POST", "/integrations/sampcrew/webhook", "SampCrew sends a candidate's stage (signed)", "public"], ["GET", "/integrations/sampcrew/cv/:id", "SampCrew downloads a CV (signed link)", "public"],
  ]],
  ["Account and access", "#1C47C9", [
    ["GET", "/admin/me", "Me: user, role, rights, extra access", "signed"],
    ["POST", "/admin/step-up", "Confirm with the authenticator code", "signed", 0, { code: "" }],
    ["GET", "/admin/account/sessions", "My sessions", "signed"], ["POST", "/admin/account/sessions/:id/revoke", "Sign out one of my sessions", "signed"],
    ["POST", "/admin/account/password", "Change my password", "signed", 0, { current: "", password: "", code: "" }],
    ["POST", "/admin/account/recovery-codes", "New recovery codes", "signed", 1],
    ["PUT", "/admin/account/photo", "My photo (data:image/webp;base64,…)", "signed", 0, { photo: "" }], ["DELETE", "/admin/account/photo", "Remove my photo", "signed"],
    ["PUT", "/admin/account/prefs", "My colour palette and light/dark", "signed", 0, { palette: "ocean", theme: "light" }],
    ["GET", "/admin/users", "Admins", "users view"], ["POST", "/admin/users", "Invite an admin", "users create", 1, { name: "", email: "", role: "viewer" }],
    ["PATCH", "/admin/users/:id", "Change an admin's details, role, extra access", "users edit", 1, { role: "" }],
    ["POST", "/admin/users/:id/suspend", "Suspend (also reactivate, deactivate, reset, resend, revoke-sessions)", "users edit", 1],
    ["GET", "/admin/users/:id/sessions", "Someone's sessions", "users view"],
    ["GET", "/admin/roles", "Roles and rights", "signed"], ["PUT", "/admin/roles/:id", "Change or add a role", "users manage", 1], ["DELETE", "/admin/roles/:id", "Delete a role", "users manage", 1],
    ["GET", "/admin/approvals", "Changes waiting (?status=open|all)", "signed"], ["GET", "/admin/approvals/:id", "One change with the live version", "signed"],
    ["POST", "/admin/approvals/:id/approve", "Approve (also submit, withdraw, review, reject, publish, archive)", "signed", 0, { note: "" }],
  ]],
  ["Dashboard and activity", "#2F6BFF", [
    ["GET", "/admin/overview", "Admins, approvals, new enquiries, recent activity", "signed"],
    ["GET", "/admin/stats", "Page views, leads per day, top pages, referrers (?days=30)", "dashboard view"],
    ["GET", "/admin/visits", "Visits", "activity view"], ["GET", "/admin/audit", "Activity log (?q=&actor=&action=)", "activity view"],
    ["GET", "/admin/system", "API and database status, version, documents per collection", "integrations view"],
  ]],
  ["Content, pages, SEO and media", "#6D4AFF", [
    ["GET", "/admin/content", "Every content key with its label", "signed"],
    ["GET", "/admin/content/:key", "Read a content key (e.g. seo, texts, team, blogs)", "signed"],
    ["PUT", "/admin/content/:key", "Save a content key (live, or a draft for approval)", "signed", 0, { data: {} }],
    ["DELETE", "/admin/content/:key", "Back to the original content", "signed"],
    ["GET", "/admin/content/:key/history", "Earlier versions", "signed"], ["POST", "/admin/content/:key/history/:n/restore", "Put an earlier version back", "signed"],
    ["GET", "/admin/files", "Media library", "media view"], ["POST", "/admin/files", "Upload (raw file, ?name=&folder=&alt=)", "media create"],
    ["PATCH", "/admin/files/:id", "Alt text or name", "media edit", 0, { alt: "" }], ["PUT", "/admin/files/:id", "Replace a file (same address)", "media edit"], ["DELETE", "/admin/files/:id", "Delete a file", "media delete"],
    ["PUT", "/admin/celebrations", "Festival calendar", "settings publish"], ["PUT", "/admin/gallery", "Gallery", "company publish"],
  ]],
  ["Client & vendor onboarding", "#E07A2E", [
    ["GET", "/admin/onboarding", "Submissions (?kind=client|vendor&q=&status=&poc=&expiring=&format=csv)", "onboarding view"],
    ["GET", "/admin/onboarding/:id", "One submission with every detail, documents, notes and history", "onboarding view"],
    ["POST", "/admin/onboarding", "Add a client or vendor by hand", "onboarding create", 0, { kind: "client", data: { company: { legalName: "" } } }],
    ["PUT", "/admin/onboarding/:id", "Change details, status, tags, owner", "onboarding edit", 0, { status: "approved" }],
    ["DELETE", "/admin/onboarding/:id", "Delete a submission and its documents", "onboarding delete", 1],
    ["POST", "/admin/onboarding/:id/notes", "Internal note", "onboarding edit", 0, { text: "" }],
    ["POST", "/admin/onboarding/:id/files", "Add a document (the file as the body, ?name=&label=)", "onboarding edit"],
    ["GET", "/admin/onboarding/:id/files/:fid", "Download a document or signed agreement", "onboarding view"],
    ["DELETE", "/admin/onboarding/:id/files/:fid", "Delete a document", "onboarding edit"],
    ["GET", "/admin/onboarding-renewals", "Every agreement with its expiry (?kind=&days=)", "onboarding view"],
    ["GET", "/admin/onboarding-forms/:kind", "Form set-up and the list of built-in fields", "onboarding view"],
    ["PUT", "/admin/onboarding-forms/:kind", "Save the form set-up (fields, extra fields, documents, steps, POCs)", "onboarding configure", 0, { config: {} }],
  ]],
  ["Page video component (build 82.5; /web-videos/… answers the same)", "#2F6BFF", [
    ["GET", "/page-videos?page=/about-us", "Public: one page's video and its own design (video null = none)", "public"],
    ["GET", "/page-videos", "Public: every page with a live video", "public"],
    ["GET", "/page-videos/templates", "Public: every page's design (?page=/x for one in full)", "public"],
    ["GET", "/page-videos/config", "Public: generic template ids, icons, custom fields, layouts, scenes, 3D objects", "public"],
    ["GET", "/page-videos/player.js", "Public: the ready-made player (<fr-page-video>)", "public"],
    ["GET", "/admin/page-videos", "All website pages with their videos (?q=&has=with|without&skip=&limit=)", "pages view"],
    ["GET", "/admin/page-videos/item?path=/about-us", "One page's video", "pages view"],
    ["PUT", "/admin/page-videos/item?path=/about-us", "Save one page's video", "pages edit", 0, { video: { url: "https://youtu.be/…", title: "", description: "", template: "page", icon: "play", poster: "" }, custom: {}, enabled: true }],
    ["DELETE", "/admin/page-videos/item?path=/about-us", "Remove one page's video", "pages delete"],
    ["GET", "/admin/page-videos/templates", "Every page's design (?q=&layout=&scene=&object=&family=&edited=yes&skip=&limit=)", "pages view"],
    ["GET", "/admin/page-videos/templates/item?path=/about-us", "One page's design, the generated one and the admin's changes", "pages view"],
    ["PUT", "/admin/page-videos/templates/item?path=/about-us", "Change one page's design", "pages edit", 0, { layout: "orbit", palette: { accent: "#ff5500" }, headline: "Who we are" }],
    ["DELETE", "/admin/page-videos/templates/item?path=/about-us", "Back to the generated design", "pages edit"],
    ["POST", "/admin/page-videos/import", "Save many pages from rows (CSV / JSON)", "pages create", 0, { rows: [{ path: "/about-us", url: "https://youtu.be/…", title: "" }] }],
    ["GET", "/admin/page-videos/export", "Everything as CSV (?as=json for JSON)", "pages view"],
    ["GET", "/admin/page-videos/settings", "Generic template ids, icons and custom fields", "pages view"],
    ["PUT", "/admin/page-videos/settings", "Save generic template ids, icons and custom fields", "pages publish", 0, { settings: { templates: [{ id: "page", label: "This page's own design" }], icons: [{ id: "play", label: "Play" }], fields: [{ key: "ctaText", label: "Button text", type: "text" }] } }],
    ["POST", "/admin/page-videos/pages", "Add new page URLs to the list", "pages create", 0, { pages: [{ path: "/new-page", title: "" }] }],
  ]],

  ["Leads, chats and reviews", "#0E9C88", [
    ["GET", "/admin/leads", "Leads (?kind=&category=&status=&assignee=&q=&from=&to=&format=csv)", "enquiries view"],
    ["GET", "/admin/leads/assignees", "Colleagues a lead can go to", "enquiries view"],
    ["GET", "/admin/leads/:id", "One lead", "enquiries view"], ["PATCH", "/admin/leads/:id", "Status, note, type, assign", "enquiries edit", 0, { status: "contacted", note: "" }], ["DELETE", "/admin/leads/:id", "Delete a lead", "enquiries delete"],
    ["GET", "/admin/chats", "Live chats", "enquiries view"], ["GET", "/admin/chats/:id", "One chat", "enquiries view"], ["POST", "/admin/chats/:id/reply", "Reply (also close, reopen)", "enquiries edit", 0, { text: "" }],
    ["GET", "/admin/chats/export", "Download every chat (?format=csv|json|txt)", "enquiries export", 1],
    ["GET", "/admin/reviews", "Reviews", "enquiries view"], ["PATCH", "/admin/reviews/:id", "Publish, hide, edit, reply", "enquiries edit"],
  ]],
  ["Marketing, AI and social media", "#C8577E", [
    ["GET", "/admin/marketing/stats", "Contacts and email numbers", "marketing view"],
    ["GET", "/admin/contacts", "Contacts (?q=&format=csv)", "marketing view"], ["POST", "/admin/contacts/import", "Import contacts", "marketing create", 1, { rows: [{ email: "", name: "" }], subscribed: false }],
    ["PATCH", "/admin/contacts/:email", "Change a contact", "marketing edit"], ["DELETE", "/admin/contacts/:email", "Delete a contact", "marketing delete"],
    ["GET", "/admin/mail/templates", "Email templates", "marketing view"], ["PUT", "/admin/mail/templates", "Save email templates", "marketing edit"],
    ["POST", "/admin/mail/preview", "Preview an email", "marketing view"], ["POST", "/admin/mail/test", "Send a test email", "marketing edit"],
    ["GET", "/admin/mail/automations", "Automatic emails", "marketing view"], ["PUT", "/admin/mail/automations", "Save automatic emails", "marketing publish"],
    ["GET", "/admin/mail/queue", "Sending queue", "marketing view"], ["POST", "/admin/mail/queue/retry", "Retry failed emails", "marketing publish"],
    ["GET", "/admin/campaigns", "Newsletters", "marketing view"], ["POST", "/admin/campaigns", "New newsletter", "marketing create"], ["POST", "/admin/campaigns/:id/send", "Send (also cancel, count)", "marketing publish"],
    ["GET", "/admin/social/status", "Which platforms are connected", "marketing view"], ["GET", "/admin/social/posts", "Social posts", "marketing view"],
    ["POST", "/admin/social/posts", "New social post", "marketing create"], ["POST", "/admin/social/posts/:id/publish", "Post now (also approve)", "marketing publish"],
    ["GET", "/admin/social/autopilot", "AI social media manager settings", "marketing view"], ["PUT", "/admin/social/autopilot", "Save autopilot", "marketing publish"],
    ["GET", "/admin/ai/kinds", "What the AI writer can write", "marketing edit"],
    ["POST", "/admin/ai/write", "Draft with AI", "marketing edit", 0, { kind: "blog", brief: "", tone: "", length: "" }],
  ]],
  ["Connections and keys", "#4A5FB0", [
    ["GET", "/admin/integrations", "What is connected; every key (secrets: last 4 characters)", "integrations view"],
    ["PUT", "/admin/integrations/keys", "Save keys (encrypted); null removes", "integrations configure", 1, { values: { AI_MODEL: "claude-opus-5-5" } }],
    ["POST", "/admin/integrations/sampcrew/send/:id", "Send an application to SampCrew again", "careers edit"],
  ]],
];
const ALL = API.flatMap(([g, c, rows]) => rows.map(([m, p, what, right, mfa, body]) => ({ g, c, m, p, what, right, mfa: !!mfa, body })));
const BASE = (typeof location !== "undefined" ? location.origin : "https://www.frequentresearch.com") + "/api/v1";

function useMe() { const [me, setMe] = ee.useState(null); ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []); return me; }
const allowed = (me, right) => right === "public" || right === "signed" || (!!me && admCan(me, ...right.split(" ")));

function Status() {
  const [s, setS] = ee.useState(null), [err, setErr] = ee.useState("");
  const load = () => admApi("/admin/system").then((x) => { setS(x); setErr(""); }).catch((e) => setErr(e.message));
  ee.useEffect(() => { load(); const t = setInterval(load, 30000); return () => clearInterval(t); }, []);
  const up = s && s.db;
  const t = s ? s.uptime : 0, upFor = t > 86400 ? Math.floor(t / 86400) + " d " + Math.floor((t % 86400) / 3600) + " h" : t > 3600 ? Math.floor(t / 3600) + " h " + Math.floor((t % 3600) / 60) + " min" : Math.floor(t / 60) + " min";
  return (
    <div className="adm785-status">
      <div className={"adm785-pulse" + (up ? " is-up" : err ? " is-down" : "")}><Server size={22} aria-hidden="true" /><b>{err ? "Cannot read the status" : !s ? "Checking…" : up ? "API and database are up" : "Database not answering"}</b><small>{err || (s ? `${DEMO ? "Demo · " : ""}version ${s.version} · ${s.node} · running ${upFor}` : "")}</small></div>
      {s && <div className="adm785-st"><Database size={18} aria-hidden="true" /><b>{s.dbMs} ms</b><small>database answer</small></div>}
      {s && <div className="adm785-st"><Activity size={18} aria-hidden="true" /><b>{s.memoryMb} MB</b><small>memory</small></div>}
      {s && <div className="adm785-st"><ShieldCheck size={18} aria-hidden="true" /><b>{ALL.length}</b><small>endpoints</small></div>}
      {s && s.counts && <div className="adm785-counts">{Object.entries(s.counts).filter(([, n]) => n != null).map(([k, n]) => <span key={k}><b>{admNum(n)}</b>{k.replace(/^files\.files$/, "files").replace(/_/g, " ")}</span>)}</div>}
    </div>
  );
}

function TryIt({ e }) {
  const params = [...e.p.matchAll(/:(\w+)/g)].map((x) => x[1]);
  const [pv, setPv] = ee.useState({}), [q, setQ] = ee.useState(""), [body, setBody] = ee.useState(e.body ? JSON.stringify(e.body, null, 2) : e.m === "GET" || e.m === "DELETE" ? "" : "{}");
  const [out, setOut] = ee.useState(null), [busy, setBusy] = ee.useState(false);
  const path = e.p.replace(/:(\w+)/g, (_, k) => encodeURIComponent(pv[k] || ":" + k)) + (q ? (q.startsWith("?") ? q : "?" + q) : "");
  const send = async () => {
    if (params.some((k) => !pv[k])) return setOut({ status: "—", err: "Fill in " + params.filter((k) => !pv[k]).join(", ") + " first." });
    let b;
    if (body.trim()) { try { b = JSON.parse(body); } catch (x) { return setOut({ status: "—", err: "The body is not valid JSON: " + x.message }); } }
    if (e.m !== "GET" && !confirm(`${e.m} ${path}\n\nThis talks to the real website and may change real data. Send it?`)) return;
    setBusy(true); const t0 = performance.now();
    try {
      let j, status = 200;
      if (e.right === "public") { const r = await fetch("/api/v1" + path, { method: e.m, headers: b ? { "Content-Type": "application/json" } : {}, body: b ? JSON.stringify(b) : undefined }); status = r.status; const ct = r.headers.get("content-type") || ""; j = ct.includes("json") ? await r.json() : { note: "Not JSON: " + (ct || "no type") + ", " + (r.headers.get("content-length") || "?") + " bytes" }; }
      else if (/format=(csv|txt)/.test(q)) { const r = await admApi(path, { method: e.m, raw: true }); j = { note: "A download: " + (r.headers.get("content-type") || "") }; }
      else j = await admApi(path, { method: e.m, body: b });
      setOut({ status, ms: Math.round(performance.now() - t0), json: j });
    } catch (x) { setOut({ status: x.status || "error", ms: Math.round(performance.now() - t0), err: x.message, json: x.body }); }
    finally { setBusy(false); }
  };
  const curl = `curl -X ${e.m} "${BASE}${path}"` + (e.right !== "public" ? ` -H "Authorization: Bearer <TOKEN>"` : "") + (body.trim() && e.m !== "GET" ? ` -H "Content-Type: application/json" -d '${body.replace(/\s+/g, " ").replace(/'/g, "'\\''")}'` : "");
  return (
    <div className="adm785-try">
      {params.length > 0 && <div className="adm785-params">{params.map((k) => <label key={k}><span>{k}</span><input className="adm-in" value={pv[k] || ""} onChange={(x) => setPv({ ...pv, [k]: x.target.value })} placeholder={k === "key" ? "e.g. team" : k} /></label>)}</div>}
      <label className="adm785-q"><span>Query (optional)</span><input className="adm-in" value={q} onChange={(x) => setQ(x.target.value)} placeholder="e.g. status=new&limit=5" /></label>
      {e.m !== "GET" && e.m !== "DELETE" && <label className="adm785-q"><span>Body (JSON)</span><textarea className="adm-in" rows={Math.min(10, Math.max(3, body.split("\n").length))} value={body} onChange={(x) => setBody(x.target.value)} spellCheck="false" /></label>}
      <div className="adm-row">
        <AdmBtn kind="primary" onClick={send} disabled={busy}><Play size={14} aria-hidden="true" /> {busy ? "Sending…" : "Send"}</AdmBtn>
        <AdmBtn onClick={() => navigator.clipboard && navigator.clipboard.writeText(curl)}><Copy size={14} aria-hidden="true" /> Copy as curl</AdmBtn>
        <code className="adm785-path">{e.m} /api/v1{path}</code>
      </div>
      {out && (
        <div className={"adm785-out" + (out.err ? " is-err" : "")}>
          <p>{out.err ? <XCircle size={16} aria-hidden="true" /> : <CheckCircle2 size={16} aria-hidden="true" />} <b>{out.status}</b>{out.ms != null && <span>{out.ms} ms</span>}{out.err && <span>{out.err}</span>}</p>
          {out.json !== undefined && <pre>{JSON.stringify(out.json, null, 2).slice(0, 20000)}</pre>}
        </div>
      )}
    </div>
  );
}

function Apis() {
  const me = useMe();
  const [q, setQ] = ee.useState(""), [m, setM] = ee.useState(""), [mine, setMine] = ee.useState(false), [open, setOpen] = ee.useState(null);
  const ql = q.toLowerCase();
  const rows = ALL.filter((e) => (!m || e.m === m) && (!ql || (e.p + " " + e.what + " " + e.g).toLowerCase().includes(ql)) && (!mine || allowed(me, e.right)));
  const groups = API.map(([g, c]) => [g, c, rows.filter((e) => e.g === g)]).filter(([, , r]) => r.length);
  return (
    <section className="adm-sec adm785">
      <header className="adm-sec__h"><h1>API</h1></header>
      <p className="adm-muted">Every Frequent Research API in one place: the website, this admin panel and outside services (SampCrew) all use these. Try any of them with your own sign-in: your rights apply and the server checks them again. Base address <code>{BASE}</code>. Full guide for developers: docs/go-live/15-API-REFERENCE.md.</p>
      <Status />
      <div className="adm-filters adm785-filters">
        <label className="adm785-search"><Search size={16} aria-hidden="true" /><input className="adm-in" placeholder={`Search ${ALL.length} endpoints…`} value={q} onChange={(e) => setQ(e.target.value)} /></label>
        <div className="adm-seg" role="group" aria-label="Method">{["", "GET", "POST", "PUT", "PATCH", "DELETE"].map((x) => <button key={x} type="button" className={m === x ? "is-on" : ""} onClick={() => setM(x)}>{x || "All"}</button>)}</div>
        <label className="adm785-mine"><input type="checkbox" checked={mine} onChange={(e) => setMine(e.target.checked)} /> Only what I may use</label>
      </div>
      {groups.map(([g, c, r]) => (
        <div key={g} className="adm785-g" style={{ "--gc": c }}>
          <h2><i aria-hidden="true" />{g}<small>{r.length}</small></h2>
          <ul>{r.map((e) => {
            const k = e.m + " " + e.p, ok = allowed(me, e.right), isOpen = open === k;
            return (
              <li key={k} className={isOpen ? "is-open" : ""}>
                <button type="button" className="adm785-row" onClick={() => setOpen(isOpen ? null : k)} aria-expanded={isOpen}>
                  <span className={"adm785-m adm785-m--" + e.m.toLowerCase()}>{e.m}</span>
                  <code>{e.p}</code>
                  <span className="adm785-what">{e.what}</span>
                  <span className={"adm785-right" + (ok ? "" : " is-no")} title={ok ? "You may use this" : "Your role does not include this"}>{e.right === "public" ? "public" : e.right === "signed" ? "any admin" : e.right}{e.mfa ? " · code" : ""}</span>
                  <ChevronRight size={16} className="adm785-chev" aria-hidden="true" />
                </button>
                {isOpen && <TryIt e={e} />}
              </li>
            );
          })}</ul>
        </div>
      ))}
      {!groups.length && <p className="adm-muted">No endpoint matches.</p>}
    </section>
  );
}

export { Apis as AdmApis };
