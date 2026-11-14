/*
 * Sampledge product detail (build 68). Prefix PR5_D. Source: the seven product websites supplied by Kunal on 2026-11-06.
 * Used by the home page and menu product switcher (src/components/site/Sampledge8.jsx): story, the problems each
 * product fixes ([problem, how it is fixed, icon]), outcomes ([title, detail]) and links to other products ([id, how]).
 */
const PR5_D = {
  sampcode: {
    story: "SampCode puts survey programming, QA, hosting, fieldwork, data quality and analysis on the same survey definition, so nothing is copied between systems and nothing gets lost on the way.",
    pains: [
      ["Errors found by respondents, not before launch", "The logic check runs on every save and the QA Laboratory sends simulated respondents down every route before publishing.", "code"],
      ["One tool per fieldwork mode", "The same survey runs online, in the offline CAPI app and on CATI call lists, into one dataset.", "route"],
      ["Bad completes rejected without a reason", "Every complete gets a 0–100 quality score with plain-language reasons, and low scores go to a review queue.", "shield"],
    ],
    outs: [
      ["Nothing goes live broken", "Publishing stays locked until the logic check passes."],
      ["Every complete is scored", "Reviewers see why points were taken off, decide, and the vendor gets the right outcome."],
      ["Answers the same day", "Crosstabs with significance, rim weighting, MaxDiff and conjoint next to your data."],
    ],
    links: [
      ["samptrek", "SampCode redirects and callbacks connect to SampTrek projects through the SampTrek adapter."],
      ["sampaudience", "Order an audience from a SampCode survey's Distribute tab with SampAudience."],
    ],
  },
  sampbidx: {
    story: "SampBidx turns a client's RFQ into a priced, approved, ready-to-send proposal: CPI for every market from your own rate cards, vendor costs and margins, approvals and follow-ups, on web and mobile.",
    pains: [
      ["Bids priced in spreadsheets", "Rate cards for 246 countries by LOI and incidence band price every market, versioned so an old bid keeps its price.", "grid"],
      ["Approvals chased by email", "An approval matrix by value, margin and price floor sends a push to the approver's phone.", "shield"],
      ["Follow-ups forgotten", "Follow-up sequences run until the client replies, and stop on a reply, opt-out, bounce or closed bid.", "clock"],
    ],
    outs: [
      ["Minutes, not afternoons", "A pasted brief becomes a priced draft with client questions already answered."],
      ["Margin you can defend", "Floors, margins and approvals are checked on every line before a proposal leaves."],
      ["Global from day one", "Every market, currency and tax rate, and an app approvers carry in their pocket."],
    ],
    links: [
      ["samptrek", "Won bids arrive in SampTrek automatically and prefill a new project."],
    ],
  },
  samptrek: {
    story: "SampTrek is the trail itself: every checkpoint of a research project, from the won bid through gate security, quotas and live fieldwork to reconciliation and invoices, hands its data to the next.",
    pains: [
      ["Redirects in one tool, quotas in a spreadsheet", "A hybrid redirect engine with 8 statuses and quota cells enforced at the door work in one project.", "route"],
      ["Pace watched by hand", "Fieldwork autopilot tracks pace per market and vendor and pauses or closes links before you overspend.", "target"],
      ["Completes retyped into invoices", "Invoices come straight from reconciled completes and sync to Zoho Books, Xero, QuickBooks or Tally.", "ledger"],
    ],
    outs: [
      ["One project, every market", "Run Germany, the UK and the US as one project with per-market overrides."],
      ["Trouble spotted early", "Alerts when a project, market or vendor falls behind, with quota reallocation suggestions."],
      ["Money that matches fieldwork", "Client invoices, vendor bills, tax and FX from the same records."],
    ],
    links: [
      ["sampbidx", "Bids won in SampBidx arrive through a signed webhook and prefill the project."],
      ["sampaudience", "A SampTrek project tab sends targets and quota cells to SampAudience and shows fieldwork live."],
      ["sampcode", "SampCode surveys connect to SampTrek projects through the SampTrek adapter."],
    ],
  },
  sampaudience: {
    story: "SampAudience turns a research brief into the right respondents. Feasibility, AI audience matching, quotas, launch, batching and routing run in one engine, under one request ID.",
    pains: [
      ["Audience specs lost in email", "Write who you need in plain words and SampAudience turns it into exact profile criteria with live counts.", "search"],
      ["Feasibility promised before it is checked", "Country by country: eligible, reachable, estimated completes and shortfall, before anyone commits to a number.", "globe"],
      ["Screen-outs that dead-end", "Routing offers screened-out respondents another survey they qualify for.", "users"],
    ],
    outs: [
      ["A person approves every launch", "No invitation is sent without a supply approver saying yes."],
      ["Quotas that fill evenly", "Timed batches per country inside send windows, throttled by pace."],
      ["Outcomes back automatically", "Completes, screen-outs and over-quotas flow back, signed and audited."],
    ],
    links: [
      ["samptrek", "SampTrek projects send targets and quota cells from a dedicated tab."],
      ["sampcode", "Order an audience right from a SampCode survey's Distribute tab."],
    ],
  },
  sampforce: {
    story: "In SampForce the same record carries the charge the whole way, from first click to renewal: one timeline, one data model, one place to look for CRM, outreach, automation, AI agents and quotes.",
    pains: [
      ["A relay race between sales apps", "CRM, sequences, automation, quotes and customer success share one timeline per customer.", "layers"],
      ["Forecasts nobody can explain", "Every score, forecast and suggestion lists the signals and records behind it.", "chart"],
      ["AI that changes data on its own", "Copilot reads straight away, and anything that changes data waits for your approval.", "shield"],
    ],
    outs: [
      ["Deals that keep moving", "Deal health scored hourly, with the reasons written out."],
      ["The winning offer, fast", "Quick Bid Studio, quotes, proposals and contracts in one place."],
      ["Accounts that grow", "Customer success and a client portal on the same record."],
    ],
    links: [
      ["sampbidx", "SampForce handles the revenue pipeline; SampBidx prices research bids."],
    ],
  },
  talk2tax: {
    story: "Talk2Tax keeps your ledger, prepares India GST, TDS and payroll from it, and lets you ask anything about your business. Every figure it shows can be traced to the record that made it.",
    pains: [
      ["Questions that wait for month end", "Ask by text or voice and get answers with the records behind them.", "search"],
      ["GST and TDS prepared in separate tools", "GSTR-1, GSTR-3B, ITC set-off, TDS / TCS and e-invoicing come from the same ledger.", "ledger"],
      ["Decisions made without a forecast", "A cash-flow forecast and digital twin test what-if scenarios before you commit.", "chart"],
    ],
    outs: [
      ["Books that answer back", "A double-entry ledger you can question in plain words."],
      ["India compliance built in", "A compliance calendar for GST, TDS and payroll."],
      ["Every number traceable", "A full audit trail from report to record."],
    ],
    links: [
      ["sampcrew", "SampCrew runs HR and payroll; Talk2Tax keeps the books."],
    ],
  },
  sampcrew: {
    story: "SampCrew lets you hire, pay, schedule, grow and understand your entire workforce in one intelligent platform. Web, iOS and Android, one source of truth.",
    pains: [
      ["Payroll nobody can explain", "Payroll runs with a reason for every rupee, two-person approval and a frozen record after finalise.", "ledger"],
      ["Attendance that does not add up", "Biometric devices, rosters, swaps and overtime flow into payroll, with a live view of who is in today.", "calendar"],
      ["Resignations that come as a surprise", "Insights show attrition risk before it becomes a resignation.", "chart"],
    ],
    outs: [
      ["One source of truth", "Core HR, leave, payroll and recruitment on the same record."],
      ["HR in every pocket", "Leave, payslips, approvals and Ask HR on iOS and Android."],
      ["Answers with receipts", "Ask your workforce anything and see where each answer came from."],
    ],
    links: [
      ["talk2tax", "Talk2Tax keeps the books; SampCrew runs HR and payroll."],
    ],
  },
};

export { PR5_D };
