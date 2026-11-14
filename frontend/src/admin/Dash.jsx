/*
 * Build 78.4: the admin home (dashboard). An animated welcome banner with the Frequent Research logo and a small 3D
 * scene, quick actions, number cards with icons and trends, a visits chart and a leads chart (separate charts: different
 * scales), top lists, what is waiting for approval and a live activity feed. Only /admin; the website is not touched.
 * Data: /admin/overview (what this admin may see) and /admin/stats (visits, leads, chats, reviews).
 */
import * as ee from 'react';
import { Activity, ArrowUpRight, Briefcase, CircleCheck, Eye, FileClock, Globe, Inbox, ListChecks, Megaphone, MessageCircle, PenLine, Search, Star, TrendingUp, UserPlus, Users } from 'lucide-react';
import { admApi, admCan, admMe, admNum, admWhen } from './api.jsx';
import { AdmCount, AdmLogo } from './Look.jsx';

const DEMO = typeof window !== "undefined" && !!window.__FR_ADMIN_DEMO;
const KIND = { enquiry: "Enquiries", download: "Downloads", "case-study-download": "Case study downloads", "resource-download": "Resource downloads", careers: "Job applications", chat: "Live chats" };
const ACT = { login: "signed in", "login-failed": "failed to sign in", "create-content": "created", "update-content": "changed", "delete-content": "reset", "restore-content": "restored an earlier version of", "upload-file": "uploaded", "delete-file": "deleted", "update-lead": "updated a lead", "admin-invited": "invited", "approval-approve": "approved", "approval-approve+publish": "approved and published", "approval-publish": "published", "approval-reject": "sent back", "draft-submitted": "sent for approval", "replace-file": "replaced", "edit-file": "edited" };
const greet = () => { const h = new Date().getHours(); return h < 5 ? "Working late" : h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening"; };
const initials = (s) => String(s || "?").split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((x) => x[0].toUpperCase()).join("");

function useData(fn, deps, every = 0) {
  const [d, setD] = ee.useState(null);
  ee.useEffect(() => {
    let dead = false;
    const run = () => fn().then((x) => !dead && setD(x)).catch(() => {});
    run();
    const t = every ? setInterval(run, every) : 0;
    return () => { dead = true; clearInterval(t); };
  }, deps);
  return d;
}

/* ---- a small line under each number: the trend in the period ---- */
function Spark({ values }) {
  if (!values || values.length < 2) return null;
  const max = Math.max(1, ...values), w = 120, h = 30;
  const pts = values.map((v, i) => [(i / (values.length - 1)) * w, h - 3 - (v / max) * (h - 6)]);
  const d = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" ");
  return <svg className="adm784-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true"><path d={d + ` L${w} ${h} L0 ${h} Z`} className="adm784-spark__a" /><path d={d} className="adm784-spark__l" /></svg>;
}
function trend(values) {
  if (!values || values.length < 4) return null;
  const half = Math.floor(values.length / 2), a = values.slice(0, half).reduce((x, y) => x + y, 0), b = values.slice(half).reduce((x, y) => x + y, 0);
  if (!a && !b) return null;
  return a ? Math.round(((b - a) / a) * 100) : 100;
}

function Kpi({ icon: I, n, label, sub, to, go, spark, i = 0 }) {
  const t = trend(spark);
  return (
    <button type="button" className="adm784-kpi" style={{ "--i": i }} onClick={() => to && go(to)}>
      <span className="adm784-kpi__ic" aria-hidden="true"><I size={20} strokeWidth={2} /></span>
      <b><AdmCount n={n} /></b>
      <span className="adm784-kpi__l">{label}</span>
      {sub && <small>{sub}</small>}
      {t !== null && <em className={t >= 0 ? "is-up" : "is-down"}>{t >= 0 ? "▲" : "▼"} {Math.abs(t)}% <span>vs first half</span></em>}
      <Spark values={spark} />
      <ArrowUpRight className="adm784-kpi__go" size={16} aria-hidden="true" />
    </button>
  );
}

/* ---- one-series charts with a hover read-out (no dual axis: visits and leads are two charts) ---- */
function AreaChart({ series, field, label, unit }) {
  const [hov, setHov] = ee.useState(null);
  const W = 640, H = 200, P = { l: 34, r: 8, t: 12, b: 22 };
  const vals = series.map((d) => d[field] || 0), max = Math.max(1, ...vals);
  const nice = Math.pow(10, Math.floor(Math.log10(max))), top = Math.max(4, Math.ceil(max / nice) * nice);
  const x = (i) => P.l + (series.length < 2 ? 0 : (i / (series.length - 1)) * (W - P.l - P.r));
  const y = (v) => H - P.b - (v / top) * (H - P.t - P.b);
  const line = vals.map((v, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(v).toFixed(1)).join(" ");
  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); const px = ((e.clientX - r.left) / r.width) * W; const i = Math.round(((px - P.l) / (W - P.l - P.r)) * (series.length - 1)); setHov(Math.max(0, Math.min(series.length - 1, i))); };
  const h = hov === null ? null : series[hov];
  return (
    <figure className="adm784-chart">
      <figcaption><b>{label}</b><span>{admNum(vals.reduce((a, b) => a + b, 0))} {unit} in {series.length} days</span></figcaption>
      <div className="adm784-chart__box">
        <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${label} per day`} onMouseMove={move} onMouseLeave={() => setHov(null)}>
          <defs><linearGradient id={"g-" + field} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--mood)" stopOpacity=".32" /><stop offset="1" stopColor="var(--mood)" stopOpacity="0" /></linearGradient></defs>
          {[0, 0.25, 0.5, 0.75, 1].map((k) => <g key={k}><line x1={P.l} x2={W - P.r} y1={y(top * k)} y2={y(top * k)} className="adm784-grid" /><text x={P.l - 6} y={y(top * k) + 4} className="adm784-ax" textAnchor="end">{admNum(Math.round(top * k))}</text></g>)}
          {series.length > 1 && <path d={line + ` L${x(series.length - 1)} ${H - P.b} L${x(0)} ${H - P.b} Z`} fill={`url(#g-${field})`} className="adm784-area" />}
          <path d={line} className="adm784-line" pathLength="1" />
          {[0, Math.floor((series.length - 1) / 2), series.length - 1].map((i) => series[i] && <text key={i} x={x(i)} y={H - 4} className="adm784-ax" textAnchor={i === 0 ? "start" : i === series.length - 1 ? "end" : "middle"}>{series[i].day.slice(5)}</text>)}
          {h && <g><line x1={x(hov)} x2={x(hov)} y1={P.t} y2={H - P.b} className="adm784-cross" /><circle cx={x(hov)} cy={y(vals[hov])} r="5" className="adm784-dot" /></g>}
        </svg>
        {h && <div className="adm784-tip" style={{ left: (x(hov) / W) * 100 + "%" }}><b>{admNum(vals[hov])}</b> {unit}<small>{h.day}</small></div>}
      </div>
    </figure>
  );
}
function BarChart({ series, field, label, unit }) {
  const [hov, setHov] = ee.useState(null);
  const vals = series.map((d) => d[field] || 0), max = Math.max(1, ...vals);
  return (
    <figure className="adm784-chart">
      <figcaption><b>{label}</b><span>{admNum(vals.reduce((a, b) => a + b, 0))} {unit} in {series.length} days</span></figcaption>
      <div className="adm784-bars" role="img" aria-label={`${label} per day`} onMouseLeave={() => setHov(null)}>
        {series.map((d, i) => (
          <span key={d.day} className={"adm784-bar" + (hov === i ? " is-on" : "")} onMouseEnter={() => setHov(i)} style={{ "--h": (vals[i] / max) * 100 + "%", "--i": i }}>
            <i />
            {hov === i && <span className="adm784-tip adm784-tip--bar"><b>{vals[i]}</b> {unit}<small>{d.day}</small></span>}
          </span>
        ))}
      </div>
    </figure>
  );
}
function Rank({ title, icon: I, rows, empty }) {
  const max = Math.max(1, ...rows.map((r) => r[1]));
  return (
    <div className="adm784-card">
      <h3><I size={16} aria-hidden="true" /> {title}</h3>
      {!rows.length ? <p className="adm-muted">{empty}</p> : (
        <ol className="adm784-rank">{rows.slice(0, 6).map(([k, n], i) => <li key={k} style={{ "--w": (n / max) * 100 + "%", "--i": i }}><span title={k}>{k}</span><b>{admNum(n)}</b><i aria-hidden="true" /></li>)}</ol>
      )}
    </div>
  );
}

/* ---- the welcome banner ---- */
const ROT = (o, s) => [
  o && o.content && (o.content.submitted || 0) + (o.content.under_review || 0) ? `${(o.content.submitted || 0) + (o.content.under_review || 0)} change(s) wait for approval` : "",
  o && o.enquiries ? `${o.enquiries.week} enquiries came in this week` : "",
  o && o.careers ? `${o.careers.week} job applications this week` : "",
  s ? `${admNum(s.visits.total)} page views in the last 30 days` : "",
  o && o.enquiries && o.enquiries.mine ? `${o.enquiries.mine} lead(s) are assigned to you` : "",
  "Everything you change is saved with its history",
].filter(Boolean).sort((a, b) => (/^0 /.test(a) ? 1 : 0) - (/^0 /.test(b) ? 1 : 0));
function Hero({ me, ov, st, go }) {
  const lines = ROT(ov, st);
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => { const t = setInterval(() => setI((x) => x + 1), 3200); return () => clearInterval(t); }, []);
  const first = me ? me.user.name.split(" ")[0] : "";
  const acts = [
    me && admCan(me, "users", "create") && ["users", "Invite an admin", UserPlus],
    ["approvals", "Approvals", ListChecks],
    me && (admCan(me, "enquiries", "view") || admCan(me, "careers", "view")) && ["leads", "Leads", Inbox],
    me && admCan(me, "pages", "view") && ["pages", "Edit pages", PenLine],
    me && admCan(me, "seo", "view") && ["seo", "SEO", Search],
    me && admCan(me, "marketing", "view") && ["newsletters", "Newsletters", Megaphone],
  ].filter(Boolean).slice(0, 5);
  return (
    <section className="adm784-hero">
      <div className="adm784-hero__bg" aria-hidden="true"><i /><i /><i /><span className="adm784-grid3d" /></div>
      <div className="adm784-hero__txt">
        <p className="adm784-hero__k">{new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" })}{me ? " · " + me.roleName : ""}</p>
        <h1>{greet()}{first ? "," : ""} <span className="adm784-hero__name">{first}</span></h1>
        <p className="adm784-hero__rot" aria-live="polite"><span key={i}>{lines[i % lines.length]}</span></p>
        <div className="adm784-hero__acts">
          {acts.map(([id, l, I]) => <button key={id} type="button" onClick={() => go(id)}><I size={16} aria-hidden="true" />{l}</button>)}
          {!DEMO && <a href="/" target="_blank" rel="noreferrer"><Globe size={16} aria-hidden="true" />View site</a>}
        </div>
      </div>
      <div className="adm784-hero__art" aria-hidden="true">
        <div className="adm784-orbit">
          <span className="adm784-orbit__ring" /><span className="adm784-orbit__ring adm784-orbit__ring--2" /><span className="adm784-orbit__ring adm784-orbit__ring--3" />
          <span className="adm784-orbit__sat"><Users size={16} /></span><span className="adm784-orbit__sat adm784-orbit__sat--2"><Inbox size={16} /></span><span className="adm784-orbit__sat adm784-orbit__sat--3"><TrendingUp size={16} /></span>
        </div>
        <span className="adm784-orbit__core"><AdmLogo size={86} big /></span>
      </div>
    </section>
  );
}

function Home({ go }) {
  const [me, setMe] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const [days, setDays] = ee.useState(30);
  const ov = useData(() => admApi("/admin/overview"), [], 60000);
  const canStats = !!me;
  const st = useData(() => (canStats ? admApi("/admin/stats?days=" + days) : Promise.resolve(null)), [days, canStats], 60000);
  const ap = useData(() => admApi("/admin/approvals?status=open").then((j) => j.items), [], 60000);
  const series = st ? st.series : [];
  const sp = (f) => series.map((d) => d[f] || 0);
  const waiting = (ap || []).filter((x) => !x.mine && ((x.canApprove && ["submitted", "under_review"].includes(x.status)) || (x.canPublish && x.status === "approved")));
  const c = (ov && ov.content) || {};
  return (
    <div className="adm784">
      <Hero me={me} ov={ov} st={st} go={go} />
      <div className="adm784-kpis">
        {st && <Kpi i={0} icon={Eye} n={st.visits.total} label="page views" sub={`${admNum(st.visits.today)} today`} to="visits" go={go} spark={sp("visits")} />}
        {ov && ov.enquiries && <Kpi i={1} icon={Inbox} n={ov.enquiries.week} label="enquiries this week" sub={`${ov.enquiries.open} new · ${ov.enquiries.mine} assigned to you`} to="leads" go={go} spark={sp("leads")} />}
        <Kpi i={2} icon={FileClock} n={(c.submitted || 0) + (c.under_review || 0) + (c.approved || 0)} label="changes waiting" sub={`${(c.draft || 0) + (c.rejected || 0)} drafts or sent back`} to="approvals" go={go} />
        {ov && ov.admins && <Kpi i={3} icon={Users} n={ov.admins.active} label="admins active" sub={`${ov.admins.invited} invited · ${ov.admins.suspended} suspended`} to="users" go={go} />}
        {ov && ov.careers && <Kpi i={4} icon={Briefcase} n={ov.careers.week} label="job applications this week" sub={`${ov.careers.open} new`} to="leads" go={go} />}
        {st && <Kpi i={5} icon={MessageCircle} n={st.chats.open} label="open chats" sub={`${admNum(st.chats.total)} in all`} to="chat" go={go} />}
        {st && <Kpi i={6} icon={Star} n={st.reviews.pending || 0} label="reviews to approve" sub={`${admNum(st.reviews.published || 0)} published`} to="reviews" go={go} />}
      </div>
      {st && (
        <section className="adm784-card adm784-charts">
          <header><h2><Activity size={18} aria-hidden="true" /> Traffic and leads</h2>
            <div className="adm784-range" role="group" aria-label="Period">{[7, 30, 90].map((d) => <button key={d} type="button" className={days === d ? "is-on" : ""} onClick={() => setDays(d)}>{d} days</button>)}</div>
          </header>
          <div className="adm784-charts__g">
            <AreaChart series={series} field="visits" label="Page views" unit="page views" />
            <BarChart series={series} field="leads" label="Leads" unit="leads" />
          </div>
        </section>
      )}
      <div className="adm784-cols">
        {st && <Rank title="Most visited pages" icon={Eye} rows={st.visits.pages.map((p) => [p.path, p.n])} empty="No visits yet." />}
        {st && <Rank title="Leads by type" icon={Inbox} rows={st.leads.byKind.map((p) => [KIND[p.kind] || p.kind, p.n])} empty="No leads in this period." />}
        {st && <Rank title="Where visitors came from" icon={Globe} rows={st.visits.referrers.map((p) => [p.ref, p.n])} empty="No referring sites yet." />}
      </div>
      <div className="adm784-cols adm784-cols--2">
        <div className="adm784-card">
          <h3><ListChecks size={16} aria-hidden="true" /> Waiting for you</h3>
          {!waiting.length ? <p className="adm784-empty"><CircleCheck size={28} aria-hidden="true" /><span>All clear. Nothing waits for your approval.</span></p> : (
            <ul className="adm784-wait">{waiting.slice(0, 5).map((x) => <li key={x.id}><button type="button" onClick={() => go("approvals")}><b>{String(x.label || x.key || "Change").split(":")[0].slice(0, 46)}</b><small>{x.author} · {admWhen(x.updated)}</small></button></li>)}</ul>
          )}
        </div>
        {ov && ov.recent && (
          <div className="adm784-card adm784-feedcard">
            <h3><Activity size={16} aria-hidden="true" /> Live activity</h3>
            <ul className="adm784-feed">{ov.recent.slice(0, 8).map((r, i) => {
              const who = (r.actor && (r.actor.name || r.actor.email)) || "Visitor";
              return <li key={i} style={{ "--i": i }}><span className="adm784-av" data-c={who.length % 4}>{initials(who)}</span><p><b>{who}</b> {ACT[r.action] || r.action.replace(/-/g, " ")} <em>{String(r.target || "").slice(0, 60)}</em><small>{admWhen(r.at)}</small></p></li>;
            })}</ul>
            <button type="button" className="adm784-more" onClick={() => go("activity")}>Full activity log <ArrowUpRight size={14} aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </div>
  );
}

export { Home as AdmHome };
