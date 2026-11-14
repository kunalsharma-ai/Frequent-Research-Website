import {
  BookOpenCheck, Landmark, Receipt, Users, Building2, Wallet, LineChart, BellRing, Mic, Bot, FileSpreadsheet, Palette, Network, Workflow, UserCog,
} from 'lucide-react';
import { screen } from '../content/screens';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import { spotlightHandlers } from '../components/Spotlight';

const TILES = [
  { icon: BookOpenCheck, title: 'Ledger you can trust', text: 'Live balance check, period locks, reversals, and a hash-chained audit trail with a verify button.', screen: 'audit-trail', size: 'wide', hue: 170 },
  { icon: Landmark, title: 'Banking', text: 'Import statements, match lines to receipts and payments, reconcile with issues flagged.', hue: 190 },
  { icon: Receipt, title: 'Sales and purchases', text: 'Invoices, bills, credit notes, receipts, payments, approvals and expense claims.', hue: 205 },
  { icon: Mic, title: 'Voice copilot', text: 'Speak a question, hear the answer read aloud. Actions are confirmed on screen only.', screen: 'voice-assistant', size: 'wide', hue: 250 },
  { icon: Users, title: 'Payroll India', text: 'Salary structures with history, pay runs, payslips, dues and payments.', hue: 215 },
  { icon: Building2, title: 'Groups', text: 'Consolidation, non-controlling interests and intercompany charges.', hue: 265 },
  { icon: Wallet, title: 'Assets, loans, accruals', text: 'Depreciation, disposals, EMIs, prepaids and deferred revenue posted monthly.', hue: 280 },
  { icon: LineChart, title: 'Dashboards from words', text: 'Describe the board view you want; Talk2Tax builds it on approved metrics.', screen: 'ai-dashboards', size: 'wide', hue: 230 },
  { icon: BellRing, title: 'Alerts', text: 'Duplicate bills, overdue customers and budget overruns with the evidence attached.', hue: 330 },
  { icon: Bot, title: 'Agents', text: 'Collections, reconciliation and month-end close agents that prepare work for approval.', hue: 300 },
  { icon: FileSpreadsheet, title: 'Exports', text: 'Any report to CSV, Excel or PDF, plus Schedule III, UK and IFRS statements.', hue: 160 },
  { icon: Palette, title: 'Invoice designer', text: 'Country presets, themes, palettes, HTML templates and drawn or typed e-signatures.', screen: 'invoice-template', size: 'wide', hue: 185 },
  { icon: UserCog, title: 'Roles that fit', text: 'Owners, admins, accountants, viewers and employees, who see only their own expense claims. Invitations by link.', hue: 175 },
  { icon: Network, title: 'Trace any figure', text: 'From a report line down to the invoice, payment or journal that made it.', hue: 240 },
  { icon: Workflow, title: 'Automations', text: 'Triggers, schedules, webhooks, emails and a task queue. Policies in plain words become rules.', screen: 'policy-studio', size: 'wide', hue: 200 },
];

export default function Capabilities() {
  return (
    <section className="section caps" id="capabilities">
      <div className="container">
        <SectionHeader
          index="06"
          eyebrow="Everything inside"
          title="Fifteen reasons to close"
          accent="the other tabs."
          lead="A short tour of what a finance team gets on day one. Every tile is a working part of the product, not a roadmap slide."
        />
        <div className="bento">
          {TILES.map((t, i) => {
            const Icon = t.icon;
            const s = t.screen ? screen(t.screen) : null;
            return (
              <Reveal key={t.title} className={`tile spotlight ${t.size ? `tile-${t.size}` : ''}`} delay={(i % 4) * 70} style={{ '--h': t.hue }} {...spotlightHandlers()}>
                <span className="tile-icon">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                {s && (
                  <div className="tile-shot">
                    <img src={s.src} alt={`${s.title}: ${s.caption}`} loading="lazy" />
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
