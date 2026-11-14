/*
 * Build 80: the story of every service hero. hero = the moving centre piece (heroes80.jsx), beats = the cards that appear
 * round it (kit80.jsx). at: tl / tr = top cards, mr = right card, b1 / b2 = speech bubbles, t1 = notice, chip = the happy end.
 * grade = the colour mood of the whole hero (deep, noir, duo); pal = main, second, spark colours.
 */
export const SPECS = {
  /* ---------------------------------------------------------------- Market Research */
  "business-panel": {
    grade: "deep", pal: ["#1d4ed8", "#38bdf8", "#f59e0b"],
    hero: { t: "grid", q: "IT decision makers · 500+ employees", people: [["CTO", "Fintech · 2,400 staff", "GB"], ["Sales Head", "Retail · 300 staff", ""], ["IT Director", "Telecom · 9,000 staff", "US"], ["Marketing VP", "FMCG · 1,200 staff", ""], ["CIO", "Banking · 15,000 staff", "IN"], ["HR Lead", "Pharma · 800 staff", ""]] },
    beats: [
      { t: "stat", at: "tr", h: "Verified B2B profiles", v: "1.2M", d: "▲ 18%", s: "C-suite to managers, 40+ industries", spark: 1 },
      { t: "bars", at: "tl", h: "Matched by industry", rows: [["Tech", 0.82], ["Finance", 0.64], ["Health", 0.48]] },
      { t: "bubble", at: "b1", x: "Job title verified ✓" },
      { t: "chip", at: "chip", x: "312 decision makers ready" },
    ],
  },
  cati: {
    grade: "noir", pal: ["#7c3aed", "#22d3ee", "#facc15"],
    hero: { t: "call", title: "CATI · Station 07", rows: [["+91 98•• •• 421", "IN"], ["+44 77•• •• 019", "GB"], ["+1 415 ••• •• 88", "US"]] },
    beats: [
      { t: "stat", at: "tr", h: "Completes today", v: "486", d: "▲ on target", live: 1, spark: 1 },
      { t: "rings", at: "tl", h: "Quota", rows: [["Male", 0.86], ["Female", 0.74], ["35+", 0.62]] },
      { t: "bubble", at: "b1", x: "“Sure, I have five minutes.”" },
      { t: "chip", at: "chip", x: "Every call quality-checked" },
    ],
  },
  "data-processing-and-analytics": {
    grade: "deep", pal: ["#0e7490", "#2dd4bf", "#f472b6"],
    hero: { t: "pipe", dirty: ["25yrs", "N/A", "Mumbai ", "??", "yes!!", "2,5", "f", "—"], cols: ["Age", "City", "Score"], clean: [["25", "Mumbai", "8.4"], ["31", "Delhi", "7.9"], ["44", "Pune", "9.1"], ["28", "Chennai", "8.0"]] },
    beats: [
      { t: "list", at: "tl", h: "Quality checks", rows: ["Duplicates removed", "Speeders flagged", "Open ends coded"] },
      { t: "stat", at: "tr", h: "Clean records", v: "99.7%", d: "▲ ready", s: "Weighted to census", spark: 1 },
      { t: "toast", at: "t1", b: "SPSS · Excel · R", x: "tables exported" },
      { t: "chip", at: "chip", x: "Analysis-ready data" },
    ],
  },
  "healthcare-panel": {
    grade: "deep", pal: ["#be123c", "#38bdf8", "#34d399"],
    hero: { t: "pulse", roles: [["Cardiologist", "US"], ["Oncologist", "DE"], ["GP", "GB"], ["Pharmacist", "IN"], ["Nurse", "AU"], ["Patient", "JP"]] },
    beats: [
      { t: "stat", at: "tr", h: "Verified HCPs", v: "650K", d: "▲ 32 specialties", s: "License-checked doctors and nurses", spark: 1 },
      { t: "tags", at: "tl", h: "Specialties live", rows: ["Cardiology", "Oncology", "Diabetes", "Neurology", "Rare disease"] },
      { t: "bubble", at: "b1", x: "License number verified ✓" },
      { t: "chip", at: "chip", x: "Compliant, consented, verified" },
    ],
  },
  "offline-data-collection": {
    grade: "duo", pal: ["#b45309", "#0f766e", "#fde047"],
    hero: { t: "map", label: "Field team · 40 cities", pins: [["Delhi", 30, 22], ["Lucknow", 48, 30], ["Kolkata", 78, 46], ["Mumbai", 18, 60], ["Pune", 26, 70], ["Chennai", 58, 86]] },
    beats: [
      { t: "stat", at: "tr", h: "Face-to-face interviews", v: "8,400", d: "▲ today 312", live: 1, spark: 1 },
      { t: "list", at: "tl", h: "In the field", rows: ["GPS-tagged visits", "Audio back-checks", "Tablet (CAPI) entry"] },
      { t: "bubble", at: "b1", x: "Interview 23 of 40 ✓" },
      { t: "chip", at: "chip", x: "Field audit passed" },
    ],
  },
  "online-data-collection": {
    grade: "deep", pal: ["#4338ca", "#06b6d4", "#a3e635"],
    hero: { t: "form", title: "survey.frequentresearch.com", q: "Which brand did you buy last?", opts: ["Brand A", "Brand B", "Brand C"], pick: 1 },
    beats: [
      { t: "stat", at: "tr", h: "Responses", v: "3,960", d: "▲ live", live: 1, s: "Desktop, mobile and tablet", spark: 1 },
      { t: "bars", at: "tl", h: "Devices", rows: [["Mobile", 0.68], ["Desktop", 0.26], ["Tablet", 0.06]] },
      { t: "toast", at: "t1", b: "0 bots", x: "fraud checks passed" },
      { t: "chip", at: "chip", x: "Fieldwork closed in 4 days" },
    ],
  },
  "qualitative-research": {
    grade: "noir", pal: ["#c2410c", "#f472b6", "#fde68a"],
    hero: { t: "talk", people: [["Riya", "“I trust the bigger pack.”", "IN"], ["Tom", "“The price feels fair.”", "GB"], ["Sara", "“I saw it on Instagram.”", "US"], ["Ken", "“The smell sold it.”", "JP"]], notes: ["Trust", "Price", "Social proof", "Sensory"] },
    beats: [
      { t: "tags", at: "tl", h: "Methods", rows: ["Focus groups", "In-depth interviews", "Diaries", "Ethnography"] },
      { t: "stat", at: "tr", h: "Themes found", v: "4", d: "from 18 sessions", s: "Each one backed by real quotes" },
      { t: "chip", at: "chip", x: "The ‘why’ behind the numbers" },
    ],
  },
  "quantitative-research": {
    grade: "deep", pal: ["#1e40af", "#22d3ee", "#facc15"],
    hero: { t: "chart", title: "Purchase intent by concept", groups: [["A", 0.48, 0.38], ["B", 0.82, 0.55], ["C", 0.6, 0.5], ["D", 0.36, 0.3]], win: 1, foot: "n = 1,000 · 95% confidence" },
    beats: [
      { t: "stat", at: "tr", h: "Sample", v: "n = 1,000", d: "±3.1%", s: "Nationally representative" },
      { t: "list", at: "tl", h: "Analysis", rows: ["Significance testing", "Driver analysis", "Segmentation"] },
      { t: "toast", at: "t1", b: "Concept B", x: "wins with 82%" },
      { t: "chip", at: "chip", x: "Numbers you can decide on" },
    ],
  },
  "reporting-and-insights": {
    grade: "duo", pal: ["#6d28d9", "#ec4899", "#fde047"],
    hero: { t: "deck", slides: [["Market share", "pie"], ["Brand growth", "line"], ["What to do next", "bars"]] },
    beats: [
      { t: "list", at: "tl", h: "Your report", rows: ["Executive summary", "Clear charts", "Next steps"] },
      { t: "stat", at: "tr", h: "Insights delivered", v: "24", d: "in 1 deck", s: "PowerPoint, PDF and dashboard" },
      { t: "bubble", at: "b1", x: "“Now we know what to do.”" },
      { t: "chip", at: "chip", x: "Debrief booked" },
    ],
  },
  "research-consultancy": {
    grade: "noir", pal: ["#0f766e", "#a78bfa", "#fbbf24"],
    hero: { t: "path", steps: ["Business question", "Hypotheses", "Right method", "Clear decision"] },
    beats: [
      { t: "tags", at: "tl", h: "We advise on", rows: ["Market entry", "Pricing", "Brand", "Customer experience"] },
      { t: "stat", at: "tr", h: "Research spend saved", v: "32%", d: "▼ waste", s: "Right method the first time", spark: 2 },
      { t: "chip", at: "chip", x: "Decision made with confidence" },
    ],
  },
  "research-design-cycle": {
    grade: "deep", pal: ["#0891b2", "#818cf8", "#f472b6"],
    hero: { t: "cycle", core: "Now", steps: ["Understand", "Design", "Sample", "Collect", "Process", "Analyze", "Deliver"] },
    beats: [
      { t: "stat", at: "tr", h: "Project status", v: "On time", d: "● live", live: 1, s: "One team from brief to debrief" },
      { t: "list", at: "tl", h: "Every step", rows: ["Owned by one team", "Checked for quality", "Shared with you"] },
      { t: "chip", at: "chip", x: "Insights delivered" },
    ],
  },
  /* ---------------------------------------------------------------- Digital Marketing */
  "b2b-digital-marketing": {
    grade: "deep", pal: ["#1e3a8a", "#6366f1", "#f97316"],
    hero: { t: "target", accounts: [["Infosys", "IT services"], ["HDFC", "Banking"], ["Tata Motors", "Auto"], ["Siemens", "Industrial"], ["Zoho", "SaaS"], ["Cipla", "Pharma"]] },
    beats: [
      { t: "stat", at: "tr", h: "Sales pipeline", v: "₹4.8 Cr", d: "▲ 3.2x", s: "From 60 target accounts", spark: 1 },
      { t: "bars", at: "tl", h: "Buying committee reached", rows: [["CXO", 0.72], ["Finance", 0.58], ["IT", 0.84]] },
      { t: "toast", at: "t1", i: "in", b: "Demo booked", x: "with Siemens" },
      { t: "chip", at: "chip", x: "Qualified meetings every week" },
    ],
  },
  "content-marketing": {
    grade: "duo", pal: ["#be185d", "#7c3aed", "#fde047"],
    hero: { t: "kanban", cols: ["Idea", "Writing", "Live"], cards: [["Buyer's guide", "Blog"], ["How it works", "Video"], ["10 myths", "Carousel"], ["Case study", "PDF"]] },
    beats: [
      { t: "stat", at: "tr", h: "Organic visits", v: "48.2K", d: "▲ 162%", s: "From content published this quarter", spark: 1 },
      { t: "tags", at: "tl", h: "This month", rows: ["8 blogs", "4 videos", "12 posts", "1 e-book"] },
      { t: "bubble", at: "b1", x: "“Saved this guide!”" },
      { t: "chip", at: "chip", x: "Content that ranks and converts" },
    ],
  },
  "digital-analytics-and-reporting": {
    grade: "deep", pal: ["#0369a1", "#22d3ee", "#a3e635"],
    hero: { t: "dash", title: "Marketing dashboard", kpis: [["Sessions", "128K", "▲ 22%"], ["Leads", "1,940", "▲ 31%"], ["CPL", "₹412", "▼ 18%"]] },
    beats: [
      { t: "list", at: "tl", h: "Tracking set up", rows: ["GA4 + Tag Manager", "Conversions mapped", "Looker Studio report"] },
      { t: "stat", at: "tr", h: "Best channel", v: "Search", d: "41% of leads", s: "Budget moved to what works" },
      { t: "chip", at: "chip", x: "One clear monthly report" },
    ],
  },
  "digital-marketing-audit": {
    grade: "noir", pal: ["#dc2626", "#f59e0b", "#22c55e"],
    hero: { t: "scan", from: "54", to: "92", issues: [["Slow pages", 18, 34], ["Broken tracking", 62, 52], ["Weak CTA", 30, 74]] },
    beats: [
      { t: "list", at: "tl", h: "We check", rows: ["SEO and site speed", "Ads and tracking", "Social and content"] },
      { t: "stat", at: "tr", h: "Quick wins found", v: "27", d: "▲ fix first", s: "Ranked by impact and effort" },
      { t: "toast", at: "t1", b: "Report", x: "ready in 7 days" },
      { t: "chip", at: "chip", x: "Clear 90-day action plan" },
    ],
  },
  "digital-marketing-consulting": {
    grade: "deep", pal: ["#4338ca", "#a78bfa", "#fbbf24"],
    hero: { t: "chess", moves: ["Find the best channel", "Shift the budget", "Scale what works"] },
    beats: [
      { t: "stat", at: "tr", h: "Marketing ROI", v: "4.1x", d: "▲ from 1.6x", spark: 1 },
      { t: "tags", at: "tl", h: "We plan", rows: ["Positioning", "Channels", "Budget", "Team"] },
      { t: "bubble", at: "b1", x: "“Finally, a plan we trust.”" },
      { t: "chip", at: "chip", x: "Strategy your team can run" },
    ],
  },
  "e-commerce-marketing": {
    grade: "duo", pal: ["#ea580c", "#db2777", "#fde047"],
    hero: { t: "cart", items: [["Sneakers", "₹2,499", 20], ["Watch", "₹4,999", 200], ["Headphones", "₹3,299", 280], ["Backpack", "₹1,799", 140]] },
    beats: [
      { t: "stat", at: "tr", h: "Store revenue", v: "₹38.6L", d: "▲ 2.4x", s: "Shopping ads, email and retargeting", spark: 1 },
      { t: "bars", at: "tl", h: "Sales by channel", rows: [["Google", 0.46], ["Meta", 0.34], ["Email", 0.2]] },
      { t: "toast", at: "t1", i: "₹", b: "New order", x: "#10482 · ₹4,999" },
      { t: "chip", at: "chip", x: "ROAS 6.2x this month" },
    ],
  },
  "email-marketing": {
    grade: "deep", pal: ["#0f766e", "#38bdf8", "#facc15"],
    hero: { t: "mail", from: "Your Brand", subject: "Your 20% off ends tonight" },
    beats: [
      { t: "rings", at: "tl", h: "Campaign", rows: [["Delivered", 0.99], ["Opened", 0.46], ["Clicked", 0.12]] },
      { t: "stat", at: "tr", h: "Revenue from email", v: "₹6.4L", d: "▲ 38%", s: "Welcome, cart and win-back flows", spark: 1 },
      { t: "toast", at: "t1", b: "Inbox", x: "not spam ✓" },
      { t: "chip", at: "chip", x: "Emails people want to open" },
    ],
  },
  "google-ads-ppc": {
    grade: "deep", pal: ["#1d4ed8", "#34d399", "#fbbf24"],
    hero: { t: "ads", q: "market research company india", url: "yourbrand.com", title: "Market Research Experts | 55+ Markets", kws: [["market research india", "₹42"], ["survey company", "₹31"], ["consumer insights", "₹27"]] },
    beats: [
      { t: "stat", at: "tr", h: "Cost per lead", v: "₹412", d: "▼ 36%", s: "Smarter bids, negative keywords", spark: 2 },
      { t: "bars", at: "tl", h: "Quality score", rows: [["Ad", 0.9, "9/10"], ["Landing", 0.8, "8/10"], ["CTR", 0.7, "7/10"]] },
      { t: "chip", at: "chip", x: "More leads, same budget" },
    ],
  },
  "influencer-marketing": {
    grade: "noir", pal: ["#c026d3", "#fb7185", "#fde047"],
    hero: { t: "creators", people: [["Aisha", "@aisha.eats", "820K", "IN"], ["Leo", "@leo.fit", "1.2M", "BR"], ["Mina", "@minastyle", "460K", "KR"]] },
    beats: [
      { t: "stat", at: "tr", h: "Campaign reach", v: "4.6M", d: "▲ 12 creators", s: "Real fans, checked for fake followers", spark: 1 },
      { t: "list", at: "tl", h: "We handle", rows: ["Finding the right creators", "Briefs and contracts", "Tracking every sale"] },
      { t: "bubble", at: "b1", r: 1, x: "“Code AISHA20 worked!”" },
      { t: "chip", at: "chip", x: "Creators your buyers trust" },
    ],
  },
  "landing-page-and-cro": {
    grade: "deep", pal: ["#7c3aed", "#22d3ee", "#4ade80"],
    hero: { t: "ab", a: "Request a callback", b: "Get your free plan" },
    beats: [
      { t: "stat", at: "tr", h: "Conversion rate", v: "8.6%", d: "▲ from 4.2%", s: "Same traffic, twice the leads", spark: 1 },
      { t: "list", at: "tl", h: "What we test", rows: ["Headline", "Form length", "Button and proof"] },
      { t: "chip", at: "chip", x: "Version B wins: +105% leads" },
    ],
  },
  "lead-generation": {
    grade: "noir", pal: ["#e11d48", "#3b82f6", "#facc15"],
    hero: { t: "magnet", leads: [["Neha Sharma", "Marketing Head · Pune", "Hot"], ["David Lee", "Founder · Singapore", "Warm"], ["Arjun Rao", "CFO · Bengaluru", "Hot"], ["Emma Clark", "Ops Manager · London", "New"]] },
    beats: [
      { t: "stat", at: "tr", h: "Qualified leads", v: "1,284", d: "▲ this month", s: "Scored before they reach sales", spark: 1 },
      { t: "bars", at: "tl", h: "Lead sources", rows: [["Search", 0.44], ["LinkedIn", 0.32], ["Social", 0.24]] },
      { t: "toast", at: "t1", i: "✓", b: "Sent to CRM", x: "in 2 minutes" },
      { t: "chip", at: "chip", x: "Sales calendar full" },
    ],
  },
  "marketing-automation": {
    grade: "deep", pal: ["#0e7490", "#a855f7", "#fbbf24"],
    hero: { t: "flow", nodes: [["Form filled", "▶"], ["Wait 1 day", "1d"], ["Opened email?", "?"], ["WhatsApp offer", "✉"], ["Sales call", "☎"]] },
    beats: [
      { t: "stat", at: "tr", h: "Hours saved", v: "120", d: "▲ every month", s: "Follow-ups run on their own", spark: 1 },
      { t: "tags", at: "tl", h: "Tools we set up", rows: ["HubSpot", "Zoho", "Mailchimp", "WATI"] },
      { t: "chip", at: "chip", x: "Every lead followed up" },
    ],
  },
  "online-reputation-management": {
    grade: "deep", pal: ["#b45309", "#f59e0b", "#4ade80"],
    hero: { t: "stars", from: "3.6", to: "4.8", reviews: [["Priya", 5, "Super quick delivery!"], ["Rahul", 5, "They fixed my issue the same day."], ["Anna", 4, "Great service, will buy again."]] },
    beats: [
      { t: "stat", at: "tr", h: "Average rating", v: "4.8 ★", d: "▲ from 3.6", s: "More happy customers asked to review", spark: 1 },
      { t: "list", at: "tl", h: "Every day", rows: ["Reviews watched", "Replies within 24 h", "Bad news handled"] },
      { t: "bubble", at: "b1", r: 1, x: "“Thanks for the quick reply!”" },
      { t: "chip", at: "chip", x: "Trusted on Google" },
    ],
  },
  "performance-marketing": {
    grade: "noir", pal: ["#ea580c", "#facc15", "#22d3ee"],
    hero: { t: "rocket", meter: ["ROAS", "5.8x"] },
    beats: [
      { t: "stat", at: "tr", h: "Revenue from ads", v: "₹1.2 Cr", d: "▲ 4.1x", s: "Paid only on what performs", spark: 1 },
      { t: "bars", at: "tl", h: "Spend that pays", rows: [["Google", 0.52], ["Meta", 0.36], ["YouTube", 0.12]] },
      { t: "chip", at: "chip", x: "Cost per sale down 42%" },
    ],
  },
  "seo-services": {
    grade: "deep", pal: ["#15803d", "#22d3ee", "#fde047"],
    hero: { t: "serp", q: "best market research company", me: "Frequent Research · Market research in 55+ markets", rows: ["Top 10 research firms 2026 – blog", "Market research guide – wiki", "Survey tools compared", "Research agency directory", "Market research jobs"] },
    beats: [
      { t: "stat", at: "tr", h: "Organic traffic", v: "62.4K", d: "▲ 248%", s: "No paid clicks needed", spark: 1 },
      { t: "list", at: "tl", h: "We fix", rows: ["Technical SEO", "Keywords and content", "Links and local SEO"] },
      { t: "toast", at: "t1", b: "#1", x: "on Google" },
      { t: "chip", at: "chip", x: "Page 1 for 140 keywords" },
    ],
  },
  "social-media-advertising": {
    grade: "noir", pal: ["#2563eb", "#ec4899", "#fde047"],
    hero: { t: "adphone", brand: "Urban Brew", offer: "Buy 1 Get 1", aud: ["Age 22-34", "Coffee lovers", "Mumbai", "Lookalike 1%"] },
    beats: [
      { t: "stat", at: "tr", h: "Click-through rate", v: "3.8%", d: "▲ 2x average", spark: 1 },
      { t: "bars", at: "tl", h: "Budget by platform", rows: [["Instagram", 0.5], ["Facebook", 0.3], ["LinkedIn", 0.2]] },
      { t: "toast", at: "t1", i: "♥", b: "+620", x: "new customers" },
      { t: "chip", at: "chip", x: "Ads that sell, not just reach" },
    ],
  },
  "video-marketing": {
    grade: "noir", pal: ["#dc2626", "#f97316", "#fde047"],
    hero: { t: "video", title: "How we make your product shine", chapters: ["Hook", "Story", "Demo", "Call to action"] },
    beats: [
      { t: "stat", at: "tr", h: "Views", v: "1.8M", d: "▲ 64% watch time", spark: 1 },
      { t: "tags", at: "tl", h: "We make", rows: ["Ads", "Reels", "Explainers", "Testimonials"] },
      { t: "bubble", at: "b1", r: 1, x: "“Watched it 3 times!”" },
      { t: "chip", at: "chip", x: "Videos people finish" },
    ],
  },
  "whatsapp-marketing": {
    grade: "deep", pal: ["#15803d", "#25d366", "#facc15"],
    hero: { t: "chat", name: "Your Store", msgs: [["me", "Hi Riya! Your favourite kurta is back in stock."], ["me", "20% off for you till Sunday."], ["them", "Yes please! Size M?"], ["me", "Done ✓ Pay here: pay.link/482"], ["them", "Paid! Thank you"]] },
    beats: [
      { t: "rings", at: "tl", h: "Broadcast", rows: [["Read", 0.94], ["Replied", 0.41], ["Bought", 0.18]] },
      { t: "stat", at: "tr", h: "Sales from WhatsApp", v: "₹9.2L", d: "▲ this month", s: "Official API, green-tick ready", spark: 1 },
      { t: "chip", at: "chip", x: "98% messages read" },
    ],
  },
  /* ---------------------------------------------------------------- IT & Development */
  "ai-and-automation-solutions": {
    grade: "noir", pal: ["#7c3aed", "#22d3ee", "#f472b6"], fx: "stars",
    hero: { t: "neural", ins: ["Invoices", "Emails", "Tickets"], outs: ["Data extracted", "Reply drafted", "Routed to team"] },
    beats: [
      { t: "stat", at: "tr", h: "Manual work removed", v: "70%", d: "▲ hours back", s: "AI agents, chatbots and document AI", spark: 1 },
      { t: "tags", at: "tl", h: "Built with", rows: ["LLMs", "RAG search", "OCR", "Workflows"] },
      { t: "chip", at: "chip", x: "Your data stays private" },
    ],
  },
  "api-development-and-integration": {
    grade: "deep", pal: ["#0369a1", "#a3e635", "#f472b6"], fx: "lines",
    hero: { t: "api", a: "Your app", b: "Payments · CRM · ERP", code: ['{', '  "order": 10482,', '  "status": "paid",', '  "synced": true', '}'] },
    beats: [
      { t: "stat", at: "tr", h: "API response", v: "84 ms", d: "▼ fast", s: "REST, GraphQL and webhooks", spark: 2 },
      { t: "list", at: "tl", h: "Connected", rows: ["Razorpay and Stripe", "Salesforce and Zoho", "Tally and SAP"] },
      { t: "chip", at: "chip", x: "Systems in sync, no re-typing" },
    ],
  },
  "application-maintenance-and-support": {
    grade: "deep", pal: ["#0f766e", "#38bdf8", "#facc15"],
    hero: { t: "tickets", rows: [["#2041", "Login slow on mobile", "Priority high"], ["#2042", "Report export fails", "Priority medium"], ["#2043", "Add GST field to invoice", "Change request"]] },
    beats: [
      { t: "stat", at: "tr", h: "Fixed within SLA", v: "98.6%", d: "▲ this quarter", spark: 1 },
      { t: "list", at: "tl", h: "We look after", rows: ["Bug fixes", "Updates and patches", "Small new features"] },
      { t: "chip", at: "chip", x: "Your app keeps running" },
    ],
  },
  "cloud-and-devops-services": {
    grade: "deep", pal: ["#1d4ed8", "#38bdf8", "#4ade80"],
    hero: { t: "pipeline", steps: ["Build", "Test", "Deploy"] },
    beats: [
      { t: "stat", at: "tr", h: "Cloud bill", v: "-38%", d: "▼ saved", s: "Right-sized AWS, Azure and GCP", spark: 2 },
      { t: "tags", at: "tl", h: "We set up", rows: ["CI/CD", "Docker", "Kubernetes", "Monitoring"] },
      { t: "toast", at: "t1", b: "Deployed", x: "in 6 minutes" },
      { t: "chip", at: "chip", x: "Release daily, sleep well" },
    ],
  },
  "crm-development": {
    grade: "duo", pal: ["#0e7490", "#7c3aed", "#fde047"],
    hero: { t: "kanban", cols: ["Lead", "Proposal", "Won"], cards: [["Acme Retail", "₹4.2L"], ["Nova Labs", "₹1.8L"], ["Zen Foods", "₹7.5L"], ["Orbit Travel", "₹2.6L"]] },
    beats: [
      { t: "stat", at: "tr", h: "Deals won", v: "₹16.1L", d: "▲ this month", s: "Every lead and follow-up in one place", spark: 1 },
      { t: "list", at: "tl", h: "Your CRM", rows: ["Built for your sales steps", "WhatsApp and email inside", "Reports for managers"] },
      { t: "toast", at: "t1", i: "✓", b: "Deal won", x: "Zen Foods" },
      { t: "chip", at: "chip", x: "No lead forgotten" },
    ],
  },
  "custom-business-applications": {
    grade: "deep", pal: ["#4f46e5", "#22d3ee", "#f59e0b"],
    hero: { t: "blocks", mods: [["Orders", 220], ["Inventory", 160], ["Billing", 40], ["Approvals", 280], ["Reports", 190]] },
    beats: [
      { t: "stat", at: "tr", h: "Spreadsheets replaced", v: "14", d: "▲ one app", s: "Made for how your team works", spark: 1 },
      { t: "tags", at: "tl", h: "Works on", rows: ["Web", "Mobile", "Tablet", "Offline"] },
      { t: "chip", at: "chip", x: "Launched in 10 weeks" },
    ],
  },
  "custom-software-development": {
    grade: "noir", pal: ["#16a34a", "#22d3ee", "#facc15"], fx: "lines",
    hero: { t: "code", file: "orders.service.ts", lines: [["import { db } from './db';", "k"], ["", ""], ["export async function placeOrder(o) {", "f"], ["  const total = price(o.items);", "x"], ["  await db.orders.insert({ ...o, total });", "x"], ["  notify(o.customer, 'Order placed');", "s"], ["  return { ok: true, total };", "k"], ["}", "f"]] },
    beats: [
      { t: "list", at: "tl", h: "How we build", rows: ["Two-week sprints", "Code reviews", "Tested before release"] },
      { t: "stat", at: "tr", h: "Sprint demo", v: "Every 2 weeks", s: "You see progress, not promises" },
      { t: "chip", at: "chip", x: "You own all the code" },
    ],
  },
  "cybersecurity-services": {
    grade: "noir", pal: ["#dc2626", "#22d3ee", "#4ade80"], fx: "lines",
    hero: { t: "shield" },
    beats: [
      { t: "stat", at: "tr", h: "Threats blocked", v: "12,480", d: "● live", live: 1, s: "Firewall, endpoint and email", spark: 1 },
      { t: "list", at: "tl", h: "We protect", rows: ["Penetration testing", "24x7 monitoring", "ISO 27001 ready"] },
      { t: "toast", at: "t1", b: "0", x: "breaches this year" },
      { t: "chip", at: "chip", x: "Safe data, calm team" },
    ],
  },
  "data-analytics-and-dashboard-development": {
    grade: "deep", pal: ["#6d28d9", "#38bdf8", "#facc15"],
    hero: { t: "dash", title: "Sales command centre", kpis: [["Revenue", "₹2.4 Cr", "▲ 12%"], ["Orders", "8,214", "▲ 9%"], ["Margin", "31%", "▲ 2 pts"]] },
    beats: [
      { t: "tags", at: "tl", h: "Built in", rows: ["Power BI", "Tableau", "Looker", "Custom"] },
      { t: "stat", at: "tr", h: "Data sources joined", v: "9", d: "▲ auto refresh", s: "ERP, CRM, sheets and ads" },
      { t: "chip", at: "chip", x: "One truth for every meeting" },
    ],
  },
  "e-commerce-development": {
    grade: "duo", pal: ["#be123c", "#7c3aed", "#facc15"],
    hero: { t: "checkout", total: ["₹4,999", "₹4,999"] },
    beats: [
      { t: "stat", at: "tr", h: "Checkout success", v: "96%", d: "▲ from 71%", s: "Fast, mobile-first store", spark: 1 },
      { t: "tags", at: "tl", h: "Built on", rows: ["Shopify", "WooCommerce", "Headless", "Custom"] },
      { t: "toast", at: "t1", i: "₹", b: "Order #10482", x: "confirmed" },
      { t: "chip", at: "chip", x: "Store ready to sell" },
    ],
  },
  "erp-development": {
    grade: "deep", pal: ["#b45309", "#0ea5e9", "#fde047"],
    hero: { t: "gears", mods: ["Finance", "Inventory", "HR", "Sales"] },
    beats: [
      { t: "stat", at: "tr", h: "Month-end close", v: "2 days", d: "▼ from 9", s: "All departments on one system", spark: 2 },
      { t: "list", at: "tl", h: "Connected", rows: ["Purchase to payment", "Stock to sale", "Hire to payroll"] },
      { t: "chip", at: "chip", x: "One system, whole business" },
    ],
  },
  "it-consulting": {
    grade: "noir", pal: ["#0f766e", "#818cf8", "#fbbf24"],
    hero: { t: "roadmap", steps: [["Q1", "Audit and plan"], ["Q2", "Quick wins"], ["Q3", "New platform"], ["Q4", "Scale up"]] },
    beats: [
      { t: "stat", at: "tr", h: "IT cost", v: "-24%", d: "▼ year one", s: "Clear plan, right tools", spark: 2 },
      { t: "tags", at: "tl", h: "We advise on", rows: ["Cloud", "Security", "Software choice", "Teams"] },
      { t: "chip", at: "chip", x: "Technology that fits your goals" },
    ],
  },
  "mobile-app-development": {
    grade: "duo", pal: ["#2563eb", "#db2777", "#fde047"],
    hero: { t: "devices", rating: "4.8", screens: [["Welcome", "a"], ["Your orders", "b"], ["Checkout", "c"]] },
    beats: [
      { t: "stat", at: "tr", h: "Downloads", v: "250K", d: "▲ first year", spark: 1 },
      { t: "tags", at: "tl", h: "Built for", rows: ["iOS", "Android", "Flutter", "React Native"] },
      { t: "bubble", at: "b1", r: 1, x: "“So easy to use!” ★★★★★" },
      { t: "chip", at: "chip", x: "Live on both stores" },
    ],
  },
  "saas-development": {
    grade: "deep", pal: ["#4338ca", "#06b6d4", "#f472b6"],
    hero: { t: "stack", layers: ["Database", "Secure API", "Billing & plans", "Your product"] },
    beats: [
      { t: "stat", at: "tr", h: "Monthly recurring revenue", v: "$48K", d: "▲ 18% MoM", spark: 1 },
      { t: "list", at: "tl", h: "Ready from day one", rows: ["Multi-tenant", "Subscriptions", "Usage analytics"] },
      { t: "toast", at: "t1", b: "+38", x: "new sign-ups today" },
      { t: "chip", at: "chip", x: "Built to scale to millions" },
    ],
  },
  "software-testing-and-qa": {
    grade: "noir", pal: ["#15803d", "#f43f5e", "#a3e635"],
    hero: { t: "tests", rows: ["Login works on all browsers", "Checkout handles 1,000 users", "Invoice totals are correct", "App works offline", "Data is encrypted"] },
    beats: [
      { t: "stat", at: "tr", h: "Bugs caught before launch", v: "312", d: "▲ 0 in production", spark: 1 },
      { t: "tags", at: "tl", h: "Testing", rows: ["Manual", "Automated", "Load", "Security"] },
      { t: "chip", at: "chip", x: "Release with confidence" },
    ],
  },
  "ui-ux-design": {
    grade: "duo", pal: ["#6d28d9", "#ec4899", "#fde047"],
    hero: { t: "wire", title: "Banking made simple" },
    beats: [
      { t: "list", at: "tl", h: "Design steps", rows: ["User research", "Wireframes", "Clickable prototype"] },
      { t: "stat", at: "tr", h: "Task success", v: "94%", d: "▲ from 61%", s: "Tested with real users", spark: 1 },
      { t: "bubble", at: "b1", r: 1, x: "“I found it in 2 taps.”" },
      { t: "chip", at: "chip", x: "Design system handed over" },
    ],
  },
  "web-application-development": {
    grade: "deep", pal: ["#0284c7", "#8b5cf6", "#34d399"],
    hero: { t: "app", title: "Shipments", rows: [["SH-2201", "Mumbai → Dubai", "In transit"], ["SH-2202", "Delhi → London", "Delivered"], ["SH-2203", "Pune → Singapore", "Booked"], ["SH-2204", "Chennai → Sydney", "Booked"]] },
    beats: [
      { t: "stat", at: "tr", h: "Daily users", v: "3,200", d: "▲ no downtime", spark: 1 },
      { t: "tags", at: "tl", h: "Stack", rows: ["React", "Node.js", "PostgreSQL", "AWS"] },
      { t: "chip", at: "chip", x: "Fast, secure, yours" },
    ],
  },
  "website-development": {
    grade: "duo", pal: ["#ea580c", "#2563eb", "#fde047"],
    hero: { t: "site", url: "yourbrand.com", title: "We help you grow" },
    beats: [
      { t: "rings", at: "tl", h: "PageSpeed", rows: [["Speed", 0.98], ["SEO", 1], ["Access", 0.99]] },
      { t: "stat", at: "tr", h: "Enquiries from site", v: "+180%", d: "▲ in 3 months", spark: 1 },
      { t: "chip", at: "chip", x: "Live in 4 weeks" },
    ],
  },
  "website-maintenance-and-support": {
    grade: "deep", pal: ["#047857", "#22d3ee", "#facc15"],
    hero: { t: "status", checks: [["Daily backup", "02:00 · done"], ["Plugins updated", "12 of 12"], ["Security scan", "clean"]] },
    beats: [
      { t: "stat", at: "tr", h: "Uptime", v: "99.98%", d: "● live", live: 1, spark: 1 },
      { t: "list", at: "tl", h: "Every month", rows: ["Content changes", "Speed check", "Monthly report"] },
      { t: "chip", at: "chip", x: "Your site, always fresh" },
    ],
  },
  /* ---------------------------------------------------------------- Accounts & Finance */
  "accounting-and-bookkeeping-services": {
    grade: "deep", pal: ["#065f46", "#d4a017", "#34d399"],
    hero: { t: "ledger", dr: [["Rent", "₹45,000"], ["Salaries", "₹3,20,000"], ["Software", "₹18,500"], ["Travel", "₹22,300"]], cr: [["Sales", "₹3,60,000"], ["Services", "₹38,000"], ["Interest", "₹7,800"]] },
    beats: [
      { t: "stat", at: "tr", h: "Books closed", v: "5th", d: "every month", s: "Tally, Zoho Books or QuickBooks", spark: 1 },
      { t: "list", at: "tl", h: "Every month", rows: ["Bank reconciled", "Bills and invoices posted", "Ledgers scrutinised"] },
      { t: "chip", at: "chip", x: "Clean books, every month" },
    ],
  },
  "accounting-and-finance-consulting": {
    grade: "noir", pal: ["#92400e", "#fbbf24", "#60a5fa"],
    hero: { t: "compass", dirs: ["Growth", "Cash", "Cost", "Risk"] },
    beats: [
      { t: "stat", at: "tr", h: "Cash freed up", v: "₹62L", d: "▲ in 6 months", s: "Better credit terms and controls", spark: 1 },
      { t: "tags", at: "tl", h: "We advise on", rows: ["Costing", "Controls", "Pricing", "Systems"] },
      { t: "chip", at: "chip", x: "Clear direction for the CFO desk" },
    ],
  },
  "audit-and-compliance-support": {
    grade: "deep", pal: ["#1e3a8a", "#e2b65c", "#22c55e"],
    hero: { t: "audit", title: "Statutory audit FY 2025-26", rows: ["Fixed asset register", "Bank and cash", "Receivables confirmed", "GST and TDS returns", "Payroll and PF"], verdict: "Opinion: true and fair ✓" },
    beats: [
      { t: "list", at: "tl", h: "Audit ready", rows: ["Schedules prepared", "Queries answered", "ROC filings on time"] },
      { t: "stat", at: "tr", h: "Audit observations", v: "0", d: "▼ from 14", s: "Fixed before the auditor arrives" },
      { t: "chip", at: "chip", x: "Compliance calendar on track" },
    ],
  },
  "budgeting-and-financial-forecasting": {
    grade: "deep", pal: ["#0f766e", "#a3e635", "#fbbf24"],
    hero: { t: "forecast", title: "Revenue forecast", months: ["Apr", "Jun", "Aug", "Oct", "Dec", "Feb"] },
    beats: [
      { t: "stat", at: "tr", h: "Forecast accuracy", v: "96%", d: "▲ rolling 12 months", spark: 1 },
      { t: "bars", at: "tl", h: "Budget vs actual", rows: [["Sales", 0.98, "98%"], ["Costs", 0.91, "91%"], ["Capex", 0.74, "74%"]] },
      { t: "toast", at: "t1", b: "Best case", x: "₹14.2 Cr" },
      { t: "chip", at: "chip", x: "No surprises at year end" },
    ],
  },
  "business-finance-services": {
    grade: "duo", pal: ["#1e40af", "#ca8a04", "#4ade80"],
    hero: { t: "bank", amount: "₹1.5 Cr" },
    beats: [
      { t: "list", at: "tl", h: "We arrange", rows: ["Working capital limits", "Term loans", "Invoice discounting"] },
      { t: "stat", at: "tr", h: "Interest saved", v: "1.8%", d: "▼ lower rate", s: "Strong file, better terms", spark: 2 },
      { t: "chip", at: "chip", x: "Funds in 21 days" },
    ],
  },
  "corporate-finance-advisory": {
    grade: "noir", pal: ["#7c2d12", "#0ea5e9", "#fcd34d"],
    hero: { t: "merge", a: "Acme Industries", b: "Nova Tech", value: "₹240 Cr" },
    beats: [
      { t: "tags", at: "tl", h: "We advise on", rows: ["Valuation", "M&A", "Fund raising", "Restructuring"] },
      { t: "stat", at: "tr", h: "Valuation uplift", v: "+28%", d: "▲ vs first offer", spark: 1 },
      { t: "chip", at: "chip", x: "Deal closed on your terms" },
    ],
  },
  "due-diligence-and-financial-analysis": {
    grade: "deep", pal: ["#334155", "#38bdf8", "#f43f5e"],
    hero: { t: "dataroom", flag: 3, folders: ["Financials", "Tax", "Contracts", "Related parties", "HR", "Assets"] },
    beats: [
      { t: "stat", at: "tr", h: "Red flags found", v: "3", d: "before you sign", s: "Each one priced into the deal" },
      { t: "list", at: "tl", h: "We review", rows: ["Quality of earnings", "Debt and liabilities", "Tax exposure"] },
      { t: "chip", at: "chip", x: "Invest with eyes open" },
    ],
  },
  "financial-planning-and-advisory": {
    grade: "duo", pal: ["#0f766e", "#7c3aed", "#fde68a"],
    hero: { t: "goals", goals: [["Child's education", "2032", "₹40L"], ["New home", "2035", "₹1.2 Cr"], ["Retire at 55", "2048", "₹6 Cr"]] },
    beats: [
      { t: "stat", at: "tr", h: "Plan on track", v: "92%", d: "▲ goals funded", spark: 1 },
      { t: "list", at: "tl", h: "Your plan", rows: ["Cash flow and budget", "Insurance cover", "Will and nominees"] },
      { t: "chip", at: "chip", x: "Every goal has a plan" },
    ],
  },
  "income-tax-and-itr-filing": {
    grade: "deep", pal: ["#1d4ed8", "#f59e0b", "#22c55e"],
    hero: { t: "doc", v: "form", title: "ITR-2 · AY 2026-27", sub: "PAN ABCDE1234F", rows: [["Salary income", "₹18,40,000"], ["Capital gains", "₹2,10,000"], ["Deductions 80C/80D", "– ₹2,25,000"], ["Tax paid (TDS)", "₹3,62,000"]], total: ["Refund due", "₹41,200"], stamp: "e-FILED ✓" },
    beats: [
      { t: "list", at: "tl", h: "We check", rows: ["Form 16 and AIS match", "Every deduction claimed", "Notices answered"] },
      { t: "stat", at: "tr", h: "Refund", v: "₹41,200", d: "▲ in 18 days", spark: 1 },
      { t: "chip", at: "chip", x: "Filed before the deadline" },
    ],
  },
  "investment-planning": {
    grade: "noir", pal: ["#b45309", "#22c55e", "#60a5fa"],
    hero: { t: "coins", mix: [["Equity", "55%"], ["Debt", "30%"], ["Gold", "10%"], ["Cash", "5%"]] },
    beats: [
      { t: "stat", at: "tr", h: "Portfolio value", v: "₹84.6L", d: "▲ 13.2% a year", s: "Diversified, reviewed every quarter", spark: 1 },
      { t: "tags", at: "tl", h: "We plan with", rows: ["Mutual funds", "Bonds", "NPS", "Gold"] },
      { t: "chip", at: "chip", x: "Risk matched to your goals" },
    ],
  },
  "mis-and-financial-reporting": {
    grade: "deep", pal: ["#4338ca", "#22d3ee", "#facc15"],
    hero: { t: "pnl", month: "October 2026", rows: [["Revenue", "₹2.84 Cr", "₹2.60 Cr", "+9%", 1], ["Direct costs", "₹1.12 Cr", "₹1.05 Cr", "+7%", 0], ["Overheads", "₹62 L", "₹68 L", "–9%", 1], ["EBITDA", "₹1.10 Cr", "₹0.87 Cr", "+26%", 1]] },
    beats: [
      { t: "list", at: "tl", h: "Your MIS pack", rows: ["P&L by branch", "Cash flow and debtors", "KPIs on one page"] },
      { t: "stat", at: "tr", h: "Delivered by", v: "7th", d: "every month", spark: 1 },
      { t: "chip", at: "chip", x: "Decide on facts, not guesses" },
    ],
  },
  "payroll-services": {
    grade: "deep", pal: ["#0f766e", "#e2b65c", "#4ade80"],
    hero: { t: "doc", v: "slip", title: "Payslip · October 2026", sub: "EMP-0241 · Riya Sharma", rows: [["Basic + HRA", "₹68,000"], ["Allowances", "₹12,500"], ["PF and ESI", "– ₹8,160"], ["Income tax (TDS)", "– ₹6,420"]], total: ["Net pay", "₹65,920"], stamp: "PAID ✓" },
    beats: [
      { t: "stat", at: "tr", h: "Employees paid", v: "1,240", d: "on the 1st", spark: 1 },
      { t: "list", at: "tl", h: "Every month", rows: ["Salaries processed", "PF, ESI, PT filed", "Payslips sent"] },
      { t: "chip", at: "chip", x: "Right pay, right day" },
    ],
  },
  "startup-and-sme-accounting": {
    grade: "duo", pal: ["#15803d", "#ca8a04", "#a3e635"],
    hero: { t: "sprout", leaves: ["Company set up", "GST registered", "Books started", "First payroll", "Investor-ready"] },
    beats: [
      { t: "stat", at: "tr", h: "Fixed monthly fee", v: "₹9,999", s: "Books, GST, TDS and payroll" },
      { t: "tags", at: "tl", h: "For", rows: ["Startups", "Shops", "Agencies", "D2C brands"] },
      { t: "chip", at: "chip", x: "Grow without paperwork worry" },
    ],
  },
  "tax-planning-and-advisory": {
    grade: "noir", pal: ["#be185d", "#fbbf24", "#4ade80"],
    hero: { t: "piggy", saved: "₹2.8L" },
    beats: [
      { t: "bars", at: "tl", h: "Saved through", rows: [["80C / 80D", 0.42, "₹1.2L"], ["HRA and NPS", 0.34, "₹0.9L"], ["Business set-up", 0.24, "₹0.7L"]] },
      { t: "stat", at: "tr", h: "Effective tax rate", v: "18.4%", d: "▼ from 26%", s: "Fully within the law", spark: 2 },
      { t: "chip", at: "chip", x: "Pay what you owe, not more" },
    ],
  },
  "tds-services": {
    grade: "deep", pal: ["#1e3a8a", "#d4a017", "#22c55e"],
    hero: { t: "doc", v: "cert", title: "Form 16A · TDS certificate", sub: "TAN DELA12345B · Q2", rows: [["Deductee", "Acme Services LLP"], ["Section", "194J · 10%"], ["Amount paid", "₹4,80,000"], ["TDS deposited", "₹48,000"]], total: ["Challan verified", "BSR 0510308"], stamp: "TRACES ✓" },
    beats: [
      { t: "list", at: "tl", h: "Every quarter", rows: ["TDS worked out", "Challans paid by 7th", "24Q / 26Q filed"] },
      { t: "stat", at: "tr", h: "Late fees and interest", v: "₹0", d: "▼ this year", spark: 2 },
      { t: "chip", at: "chip", x: "Certificates issued on time" },
    ],
  },
  "virtual-cfo-services": {
    grade: "noir", pal: ["#1e3a8a", "#fbbf24", "#34d399"],
    hero: { t: "cockpit", dials: [["Cash runway", "18 mo", 50], ["Gross margin", "42%", 20], ["Burn vs plan", "–12%", -30]] },
    beats: [
      { t: "list", at: "tl", h: "Your CFO desk", rows: ["Monthly board pack", "Cash and fund planning", "Investor and bank talks"] },
      { t: "stat", at: "tr", h: "Cost of a full-time CFO", v: "–70%", d: "▼ saved", s: "Senior advice, part-time fee", spark: 2 },
      { t: "chip", at: "chip", x: "A CFO in your corner" },
    ],
  },
};
