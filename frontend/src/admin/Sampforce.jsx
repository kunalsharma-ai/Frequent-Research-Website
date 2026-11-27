/*
 * Super admin › System › Sampforce: the connection to the Sampforce sales app.
 * Sampforce PULLS every lead, enquiry, download form, chat lead, contact and review with an API key made here
 * (backend/src/routes/sampforce.js, guide docs/go-live/29-SAMPFORCE-API.md), and RECEIVES each new one on a signed
 * webhook when SAMPFORCE_WEBHOOK_URL and SAMPFORCE_WEBHOOK_SECRET are saved in Connections & keys.
 */
import * as ee from 'react';
import { admApi, admCan, admMe, admWhen } from './api.jsx';
import { AdmBtn, AdmField, AdmStatus } from './Fields.jsx';
import { admUseLoad } from './Inbox.jsx';

const PILL = { sent: "won", pending: "pending", sending: "pending", failed: "lost" };

function NewKey({ scopes, defaults, onMade }) {
  const [name, setName] = ee.useState("Sampforce production");
  const [pick, setPick] = ee.useState(defaults);
  const [ips, setIps] = ee.useState("");
  const [days, setDays] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  const make = async () => {
    try {
      const r = await admApi("/admin/sampforce/keys", { body: { name, scopes: pick, ips, expiresDays: +days || 0 } });
      setMsg(null); onMade(r);
    } catch (e) { setMsg({ err: e.message }); }
  };
  return (
    <div className="adm-panel">
      <h3>Make an API key for Sampforce</h3>
      <AdmField label="Name" help="So you know later which system uses it, e.g. Sampforce production, Sampforce test."><input className="adm-in" value={name} onChange={(e) => setName(e.target.value)} /></AdmField>
      <fieldset className="adm-f adm-f--col"><legend className="adm-f__l">Rights</legend>
        {Object.entries(scopes).map(([k, l]) => (
          <label key={k} className="adm-row"><input type="checkbox" checked={pick.includes(k)} onChange={(e) => setPick(e.target.checked ? [...pick, k] : pick.filter((x) => x !== k))} /> <code>{k}</code> <span className="adm-muted">{l}</span></label>
        ))}
      </fieldset>
      <AdmField label="Only from these IP addresses (optional)" help="Comma separated, e.g. 203.0.113.10. Empty = any address."><input className="adm-in" value={ips} onChange={(e) => setIps(e.target.value)} /></AdmField>
      <AdmField label="Expires after (days, optional)" help="Empty = never. You can revoke a key at any time."><input className="adm-in adm-in--auto" inputMode="numeric" value={days} onChange={(e) => setDays(e.target.value.replace(/\D/g, ""))} /></AdmField>
      <AdmBtn kind="primary" disabled={!pick.length || name.trim().length < 2} onClick={make}>Make key</AdmBtn>
      <AdmStatus s={msg} />
    </div>
  );
}

function Sampforce() {
  const [st, reload] = admUseLoad(() => admApi("/admin/sampforce"), [], 30000);
  const [me, setMe] = ee.useState(null);
  const [made, setMade] = ee.useState(null);
  const [adding, setAdding] = ee.useState(false);
  const [since, setSince] = ee.useState("");
  const [msg, setMsg] = ee.useState(null);
  ee.useEffect(() => { admMe().then(setMe).catch(() => {}); }, []);
  const d = st.data;
  if (!d) return <section className="adm-sec"><h1>Sampforce</h1>{st.err ? <AdmStatus s={{ err: st.err }} /> : <p className="adm-muted">Loading…</p>}</section>;
  const edit = admCan(me, "integrations", "configure");
  const act = async (fn, ok) => { try { const r = await fn(); setMsg({ ok: typeof ok === "function" ? ok(r) : ok }); } catch (e) { setMsg({ err: e.message }); } reload(); };
  const copy = (t) => { try { navigator.clipboard.writeText(t); setMsg({ ok: "Copied." }); } catch (e) {} };
  const live = d.keys.filter((k) => !k.revoked);
  const curl = `curl -H "Authorization: Bearer sfk_…" "${d.baseUrl}/leads?since=2026-11-01&limit=100"`;
  return (
    <section className="adm-sec">
      <header className="adm-sec__h"><h1>Sampforce</h1></header>
      <p className="adm-muted">Every lead and enquiry from the website goes to Sampforce, your sales app: every enquiry form, download form, case study and resource download, live chat lead, newsletter sign-up and review that shows in this panel. Sampforce can <b>pull</b> them with an API key made below, and <b>receive</b> each new one at once on its webhook. Careers applications stay with HR unless a key gets the <code>careers:read</code> right. Developer guide: docs/go-live/29-SAMPFORCE-API.md.</p>

      <div className="adm-table"><table><tbody>
        <tr><td>API address</td><td colSpan={2}><code>{d.baseUrl}</code> <AdmBtn small onClick={() => copy(d.baseUrl)}>Copy</AdmBtn></td></tr>
        <tr><td>API keys</td><td><span className={"adm-pill " + (live.length ? "adm-pill--won" : "adm-pill--lost")}>{live.length ? live.length + " active" : "None yet"}</span></td><td className="adm-muted">Sampforce sends the key in the header Authorization: Bearer sfk_…</td></tr>
        <tr><td>Webhook (push)</td><td><span className={"adm-pill " + (d.webhook.ready ? "adm-pill--won" : "adm-pill--lost")}>{d.webhook.ready ? "Connected" : "Not connected"}</span></td><td className="adm-muted">{d.webhook.ready ? d.webhook.url + " · events: " + d.webhook.events.join(", ") : "Optional. Save SAMPFORCE_WEBHOOK_URL and SAMPFORCE_WEBHOOK_SECRET in System › Connections & keys."}</td></tr>
      </tbody></table></div>
      <AdmStatus s={msg} />

      {made && (
        <div className="adm-panel">
          <h3>New key: copy it now</h3>
          <p className="adm-muted">This is the only time the key is shown. Give it to the Sampforce developers through a safe channel (not by plain email).</p>
          <p><code style={{ wordBreak: "break-all" }}>{made.key}</code> <AdmBtn small kind="primary" onClick={() => copy(made.key)}>Copy key</AdmBtn></p>
          <AdmBtn small onClick={() => setMade(null)}>I saved it</AdmBtn>
        </div>
      )}

      <h2>API keys</h2>
      <div className="adm-table"><table><thead><tr><th>Name</th><th>Key</th><th>Rights</th><th>Made</th><th>Last used</th><th>Status</th><th></th></tr></thead><tbody>
        {d.keys.map((k) => (
          <tr key={k.id}><td>{k.name}</td><td><code>{k.prefix}…</code></td><td className="adm-clip">{k.scopes.join(", ")}{k.ips.length ? " · IPs: " + k.ips.join(", ") : ""}</td><td>{admWhen(k.created)}<br /><small className="adm-muted">{k.by}</small></td><td>{k.lastUsed ? admWhen(k.lastUsed) : "Never"}</td>
            <td><span className={"adm-pill " + (k.revoked ? "adm-pill--lost" : "adm-pill--won")}>{k.revoked ? "Revoked" : k.expires ? "Until " + admWhen(k.expires) : "Active"}</span></td>
            <td>{edit && !k.revoked && <AdmBtn small kind="danger" onClick={() => confirm("Revoke " + k.name + "? Sampforce stops getting leads with this key at once.") && act(() => admApi("/admin/sampforce/keys/" + k.id, { method: "DELETE" }), "Key revoked.")}>Revoke</AdmBtn>}</td></tr>
        ))}
        {!d.keys.length && <tr><td colSpan={7} className="adm-muted">No keys yet.</td></tr>}
      </tbody></table></div>
      {edit && (adding ? <NewKey scopes={d.scopes} defaults={d.defaultScopes} onMade={(r) => { setMade(r); setAdding(false); reload(); }} /> : <p><AdmBtn kind="primary" onClick={() => setAdding(true)}>+ Make an API key</AdmBtn></p>)}
      <p className="adm-muted">Try it: <code>{curl}</code></p>

      <h2>Webhook deliveries</h2>
      <p className="adm-muted">Each new lead is sent to Sampforce as it arrives, signed with the webhook secret. A delivery that fails is tried again (after 1 minute, 5, 15 minutes, 1, 3, 6 and 12 hours); after 8 tries it shows as failed. Kept 30 days.
        {" "}Waiting: {d.outbox.pending || 0} · Sent: {d.outbox.sent || 0} · Failed: {d.outbox.failed || 0}</p>
      {edit && (
        <div className="adm-row">
          <AdmBtn disabled={!d.webhook.ready} onClick={() => act(() => admApi("/admin/sampforce/test", { body: {} }), "Sampforce answered the test.")}>Send a test</AdmBtn>
          <AdmBtn disabled={!d.outbox.failed} onClick={() => act(() => admApi("/admin/sampforce/outbox/retry", { body: {} }), (r) => r.queued + " sent again.")}>Send failed ones again</AdmBtn>
          <span className="adm-row"><input className="adm-in adm-in--auto" type="date" value={since} onChange={(e) => setSince(e.target.value)} aria-label="Send older leads from this date" />
            <AdmBtn disabled={!d.webhook.ready} onClick={() => confirm("Send every lead " + (since ? "since " + since : "ever received") + " to Sampforce again?") && act(() => admApi("/admin/sampforce/backfill", { body: { since } }), (r) => r.queued + " leads queued for Sampforce." + (r.more ? " More are left: run it again with a later date." : ""))}>Send older leads</AdmBtn></span>
        </div>
      )}
      <div className="adm-table"><table><thead><tr><th>When</th><th>Event</th><th>Item</th><th>Status</th><th>Tries</th><th>Answer</th><th></th></tr></thead><tbody>
        {d.recent.map((r) => (
          <tr key={r.id} className={r.status === "failed" ? "is-warn" : ""}><td>{admWhen(r.created)}</td><td><code>{r.event}</code></td><td><code>{r.ref}</code></td><td><span className={"adm-pill adm-pill--" + (PILL[r.status] || "new")}>{r.status}</span>{r.nextAt && <small className="adm-muted"> next {admWhen(r.nextAt)}</small>}</td><td>{r.tries}</td><td className="adm-clip" title={r.lastError}>{r.lastError || r.lastCode || ""}</td>
            <td>{edit && r.status !== "sent" && <AdmBtn small onClick={() => act(() => admApi("/admin/sampforce/outbox/retry", { body: { id: r.id } }), "Sent again.")}>Send again</AdmBtn>}</td></tr>
        ))}
        {!d.recent.length && <tr><td colSpan={7} className="adm-muted">Nothing sent yet.</td></tr>}
      </tbody></table></div>
    </section>
  );
}

export { Sampforce as AdmSampforce };
