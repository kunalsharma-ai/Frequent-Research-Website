/* Build 79: the small live pictures of the four platforms (a poll, result pop-ups, a terminal, a ledger), used by the
 * platform heroes and the home hero slides. Styles: ph79.css (.p79-orn); colours from the world class (.p79--mr …). */
import * as ee from 'react';

/* ---------- hero ornaments, one per world ---------- */
export function Poll() {
  const rows = [["Brand A", 46], ["Brand B", 31], ["Brand C", 15], ["Other", 8]];
  return (
    <div className="p79-orn p79-poll" aria-hidden="true">
      <p className="p79-poll__h"><span className="d79-live" /> Live survey · n = 2,418</p>
      <p className="p79-poll__q">Which brand do you trust most?</p>
      {rows.map(([t, v], i) => (
        <div key={t} className="p79-poll__row" style={{ "--v": v + "%", "--i": i }}>
          <span>{t}</span><b>{v}%</b><i />
        </div>
      ))}
      <p className="p79-poll__f">Quality checked · 3.1% removed</p>
    </div>
  );
}
export function Pops() {
  const pops = [["+248%", "organic clicks"], ["5.2×", "return on ad spend"], ["12.4k", "new followers"], ["-38%", "cost per lead"]];
  return (
    <div className="p79-orn p79-pops" aria-hidden="true">
      {pops.map(([a, b], i) => (
        <span key={a} className={"p79-pop p79-pop--" + i}><b>{a}</b>{b}</span>
      ))}
    </div>
  );
}
export function Terminal() {
  const lines = ["$ fr new client-portal --stack react,node", "✔ design system ready", "✔ 42 tests passed", "$ fr deploy --env production", "✔ live in 38s · 99.99% uptime"];
  return (
    <div className="p79-orn p79-term" aria-hidden="true">
      <p className="p79-term__bar"><i /><i /><i /><span>~/frequent-research</span></p>
      {lines.map((l, i) => <p key={i} className={"p79-term__l" + (l.startsWith("✔") ? " is-ok" : "")} style={{ "--i": i, "--n": l.length }}><span>{l}</span></p>)}
    </div>
  );
}
export function Ledger() {
  const rows = [["Revenue", "₹ 48,20,000"], ["GST filed", "On time"], ["Payroll", "32 staff"], ["Net profit", "₹ 9,64,000"]];
  return (
    <div className="p79-orn p79-ledger" aria-hidden="true">
      <p className="p79-ledger__h">Monthly close · October</p>
      {rows.map(([a, b], i) => <p key={a} className="p79-ledger__r" style={{ "--i": i }}><span>{a}</span><b>{b}</b></p>)}
      <span className="p79-ledger__stamp">Balanced</span>
    </div>
  );
}
