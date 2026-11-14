/* Admin demo (build 67): a pretend backend that runs inside the one-file admin demo, so the super admin panel can be
 * tried without a server. It answers the same /api/v1 calls as backend/src/routes with the same shapes, filled with
 * SAMPLE data (made-up leads, visits, chats and reviews, clearly marked). Changes are kept in this browser only
 * (localStorage "fr-admin-demo"); "Reset demo" in the yellow bar starts again. Nothing reaches the real website. */
(function () {
  window.__FR_ADMIN_DEMO = 1;
  var KEY = "fr-admin-demo", DAY = 864e5, NOW = Date.now();
  var KEYS = {
    settings: "Site settings: contacts, WhatsApp, live chat, social links, header, footer, logos", numbers: "Numbers shown on the site: panel sizes, countries, projects, years",
    texts: "Text changes: any sentence on the website and what it should say instead", pages: "Page titles and descriptions (SEO) per address",
    team: "Team members and photos (Our team page)", testimonials: "Client testimonials", blogs: "Blog posts: new posts and changes to existing ones",
    pricing: "Prices and plans", "af-services": "Accounts & Finance services: prices, plans, offers and every text on those pages",
    pdfs: "PDF downloads replaced by an uploaded file", panels: "Panel books: panel numbers per country", forms: "Form fields: labels, choices, required fields, thank-you messages",
    logos: "Client and brand logos", banners: "Announcement bar and pop-ups", gallery: "Gallery photos and videos", contact: "Company name, email, phone, WhatsApp number and message, address, social links",
    images: "Picture changes: any picture on the website and the uploaded one that replaces it", links: "Link changes: any link (also PDF downloads) and where it should go instead",
    "team-photos": "Team photos (one per team member)", certifications: "Certifications and memberships", downloads: "Downloads list", careers: "Careers: open roles and hiring text",
    portals: "Panel portals (MyFrequentRewards, MyHealthOpinions, Turn2Opinion)", celebrations: "Celebration calendar (every year)", notes: "Private notes for the admin team",
  };
  var PRIVATE = { celebrations: 1, notes: 1 };

  // ---- sample data (same every time: seeded random) ----
  var seed = 7; function rnd() { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; }
  function pick(a) { return a[Math.floor(rnd() * a.length)]; }
  function iso(t) { return new Date(t).toISOString(); }
  function sample() {
    var first = ["Aarav", "Priya", "James", "Sofia", "Rahul", "Emma", "Kenji", "Fatima", "Lucas", "Ananya", "Daniel", "Mei", "Omar", "Chloe", "Vikram", "Hannah"];
    var last = ["Sample", "Demo", "Example", "Test"];
    var comp = ["Sample Foods Ltd", "Demo Pharma Inc", "Example Retail Co", "Test Motors GmbH", "Sample Bank plc", "Demo Telecom", "Example Labs"];
    var country = ["India", "United States", "United Kingdom", "Germany", "Singapore", "UAE", "Australia", "Japan", "Brazil"];
    var kinds = [["enquiry", 14], ["resource-download", 12], ["case-study-download", 6], ["careers", 3], ["chat", 3]];
    var services = ["Market Research", "Digital Marketing", "IT & Development", "Accounts & Finance"];
    var res = ["Consumer panel book: India", "Business panel book: United States", "Healthcare panel book: Germany", "Quality process: Market research", "Service brochure: SEO services", "Company profile"];
    var cases = ["Case study: FMCG brand tracking in 12 countries", "Case study: Hospital patient experience survey", "Case study: B2B IT decision makers"];
    var st = ["new", "new", "new", "contacted", "qualified", "won", "lost"];
    var leads = [], n = 0;
    kinds.forEach(function (k) {
      for (var i = 0; i < k[1]; i++) {
        var f = pick(first), l = pick(last), t = NOW - Math.floor(rnd() * 29 * DAY) - Math.floor(rnd() * DAY);
        var d = { id: "l_demo" + (++n), at: iso(t), kind: k[0], status: pick(st), first: f, last: l, name: f + " " + l, email: (f + "." + l).toLowerCase() + "@example.com", company: pick(comp), country: pick(country), countryCode: "+91", phone: { country: "IN", number: "98" + Math.floor(10000000 + rnd() * 89999999) }, consent: true, page: "/" };
        if (k[0] === "enquiry") { d.type = "Enquiry"; d.service = pick(services); d.timeline = pick(["This month", "1-3 months", "Exploring"]); d.message = "SAMPLE: We would like a proposal for a " + d.service.toLowerCase() + " project."; d.page = "/lets-talk"; }
        if (k[0] === "resource-download") { d.type = "Download"; d.resource = pick(res); d.designation = pick(["Insights Manager", "Marketing Head", "Procurement Lead"]); d.page = "/downloads"; }
        if (k[0] === "case-study-download") { d.type = "Case study"; d.resource = pick(cases); d.page = "/industries-case-studies"; }
        if (k[0] === "careers") { d.type = "Careers"; d.department = pick(["Market Research", "Digital Marketing", "IT"]); d.experience = pick(["1-3 years", "3-5 years"]); d.message = "SAMPLE: I would like to apply."; d.cv = { id: "f_democv" + n, name: f + "-" + l + "-CV.pdf", size: 120000, type: "application/pdf" }; d.page = "/careers"; }
        if (k[0] === "chat") { d.type = "Chat"; d.message = "SAMPLE: Do you have a panel of doctors in Germany?"; }
        if (d.status !== "new" && rnd() < 0.5) d.note = "SAMPLE note: called on " + new Date(t + DAY).toDateString();
        leads.push(d);
      }
    });
    var paths = ["/", "/", "/", "/services/market-research", "/services/digital-marketing", "/services/it-development", "/services/accounts-finance", "/about-us", "/lets-talk", "/downloads", "/blog", "/our-team", "/careers", "/panel-books/b2c/india", "/our-reach", "/products"];
    var refs = ["", "", "", "google.com", "google.com", "linkedin.com", "bing.com", "facebook.com", "chatgpt.com"];
    var visits = [];
    for (var dd = 29; dd >= 0; dd--) {
      var count = 40 + Math.floor(rnd() * 50) + (dd < 10 ? 25 : 0);
      for (var j = 0; j < count; j++) { var at = NOW - dd * DAY - Math.floor(rnd() * DAY * (dd ? 1 : 0.4)); visits.push({ at: iso(at), day: iso(at).slice(0, 10), path: pick(paths), ref: pick(refs), ip: "v" + Math.floor(rnd() * 900), mobile: rnd() < 0.55, lang: pick(["en", "en", "en", "hi", "de"]) }); }
    }
    visits.sort(function (a, b) { return a.at < b.at ? 1 : -1; });
    function chat(id, name, email, status, msgs, ago) {
      var t = NOW - ago, m = msgs.map(function (x, i) { return { i: i, from: x[0], text: x[1], at: iso(t + i * 60e3) }; });
      return { id: id, status: status, name: name, email: email, phone: "", country: "India", page: "/services/market-research", transcript: [{ from: "visitor", text: "Hi" }, { from: "bot", text: "Hello! How can I help?" }], messages: m, lead: "", unread: status === "open" ? 1 : 0, started: iso(t), updated: m[m.length - 1].at };
    }
    var chats = [
      chat("c_demo1", "Priya Sample", "priya.sample@example.com", "open", [["visitor", "SAMPLE: Do you have a panel of doctors in Germany?"], ["bot", "Thanks, Priya! A specialist has your message and will answer here, or by email within one working day."]], 40 * 60e3),
      chat("c_demo2", "James Demo", "james.demo@example.com", "open", [["visitor", "SAMPLE: What is your turnaround for a 1,000 complete consumer survey in India?"], ["bot", "Thanks, James! A specialist has your message."], ["agent", "Hi James, usually 7 to 10 working days. Can you share the target audience?"], ["visitor", "SAMPLE: Adults 18-45 in metro cities."]], 3 * 3600e3),
      chat("c_demo3", "Mei Example", "mei.example@example.com", "closed", [["visitor", "SAMPLE: Can I download the quality process PDF?"], ["agent", "Yes: Downloads > Quality process. Happy to help!"]], 2 * DAY),
    ];
    function rv(id, f, l, comp, rating, text, status, ago, svc) { return { id: id, status: status, first: f, last: l, email: f.toLowerCase() + "@example.com", phone: "", countryCode: "", company: comp, designation: "Research Manager", country: "IN", services: svc, rating: rating, review: text, date: iso(NOW - ago), page: "/rates-reviews" }; }
    var reviews = [
      rv("r_demo1", "Ananya", "Sample", "Sample Foods Ltd", 5, "SAMPLE REVIEW (demo only): Quick fieldwork and clear reporting.", "pending", 5 * 3600e3, ["market-research"]),
      rv("r_demo2", "Daniel", "Demo", "Demo Telecom", 4, "SAMPLE REVIEW (demo only): Good SEO results in three months.", "pending", 26 * 3600e3, ["digital-marketing"]),
      rv("r_demo3", "Kenji", "Example", "Example Labs", 5, "SAMPLE REVIEW (demo only): The team rebuilt our website on time.", "published", 6 * DAY, ["it-development"]),
      rv("r_demo4", "Chloe", "Test", "Test Motors GmbH", 3, "SAMPLE REVIEW (demo only): Fine, but the first draft needed changes.", "hidden", 12 * DAY, ["market-research"]),
    ];
    var audit = [
      { id: "a3", at: iso(NOW - 2 * 3600e3), action: "update-lead", target: leads[0].id, detail: { status: "contacted" }, ip: "demo", ua: "Demo browser" },
      { id: "a2", at: iso(NOW - 3 * 3600e3), action: "login", target: "admin", detail: {}, ip: "demo", ua: "Demo browser" },
      { id: "a1", at: iso(NOW - 3.1 * 3600e3), action: "login-failed", target: "admin", detail: {}, ip: "demo", ua: "Demo browser" },
    ];
    return { leads: leads, visits: visits, chats: chats, reviews: reviews, audit: audit, content: {}, history: {}, files: [] };
  }

  var db;
  try { db = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { db = null; }
  if (!db || !db.leads) db = sample();
  var blobs = {}; // uploaded files live in memory only (too big for browser storage)
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) {} }
  window.__FR_ADMIN_DEMO_RESET = function () { try { localStorage.removeItem(KEY); sessionStorage.removeItem("fr-adm"); } catch (e) {} location.reload(); };

  function J(o, st) { return new Response(JSON.stringify(o), { status: st || 200, headers: { "Content-Type": "application/json" } }); }
  function log(action, target, detail) { db.audit.unshift({ id: "a" + Date.now() + Math.random().toString(36).slice(2, 5), at: iso(Date.now()), action: action, target: target, detail: detail || {}, ip: "demo", ua: navigator.userAgent.slice(0, 120) }); }
  function has(s, q) { return String(s == null ? "" : typeof s === "object" ? JSON.stringify(s) : s).toLowerCase().indexOf(q) >= 0; }
  function putContent(k, data) {
    var old = db.content[k], now = iso(Date.now());
    if (old) (db.history[k] = db.history[k] || []).unshift({ at: old.updated, data: old.data, replaced: now });
    db.content[k] = { data: data, updated: now, size: JSON.stringify(data).length };
    log(old ? "update-content" : "create-content", k, { size: JSON.stringify(data).length });
  }
  function csv(rows) {
    var cols = ["at", "kind", "status", "type", "name", "email", "company", "designation", "country", "service", "timeline", "department", "message", "resource", "page", "note", "id"];
    var c = function (v) { v = v == null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v); if (/^[=+\-@]/.test(v)) v = "'" + v; return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    return "﻿" + cols.join(",") + "\n" + rows.map(function (r) { return cols.map(function (k) { return c(r[k]); }).join(","); }).join("\n");
  }
  function stats(days) {
    var since = NOW - days * DAY, today = new Date(); today.setUTCHours(0, 0, 0, 0);
    var vs = db.visits.filter(function (v) { return Date.parse(v.at) >= since; }), ls = db.leads.filter(function (l) { return Date.parse(l.at) >= since; });
    var count = function (arr, f) { var m = {}; arr.forEach(function (x) { var k = f(x); if (k) m[k] = (m[k] || 0) + 1; }); return Object.keys(m).map(function (k) { return [k, m[k]]; }).sort(function (a, b) { return b[1] - a[1]; }); };
    var series = [];
    for (var t = Date.now() - (days - 1) * DAY; t <= Date.now(); t += DAY) {
      var k = iso(t).slice(0, 10), dv = vs.filter(function (v) { return v.day === k; }), people = {};
      dv.forEach(function (v) { people[v.ip] = 1; });
      series.push({ day: k, visits: dv.length, visitors: Object.keys(people).length, leads: ls.filter(function (l) { return l.at.slice(0, 10) === k; }).length });
    }
    var rc = {}; db.reviews.forEach(function (r) { rc[r.status] = (rc[r.status] || 0) + 1; });
    return { ok: true, days: days, series: series,
      visits: { total: vs.length, today: vs.filter(function (v) { return Date.parse(v.at) >= +today; }).length, pages: count(vs, function (v) { return v.path; }).slice(0, 50).map(function (x) { return { path: x[0], n: x[1] }; }), referrers: count(vs, function (v) { return v.ref; }).slice(0, 20).map(function (x) { return { ref: x[0], n: x[1] }; }) },
      leads: { total: db.leads.length, unread: db.leads.filter(function (l) { return !l.status || l.status === "new"; }).length, byKind: count(ls, function (l) { return l.kind; }).map(function (x) { return { kind: x[0], n: x[1] }; }), resources: count(ls.filter(function (l) { return l.kind !== "enquiry"; }), function (l) { return l.resource || l.title || l.kind; }).slice(0, 20).map(function (x) { return { name: x[0], n: x[1] }; }) },
      reviews: rc, chats: { open: db.chats.filter(function (c) { return c.status === "open"; }).length, total: db.chats.length } };
  }
  function brief(c) { var o = {}; for (var k in c) if (k !== "messages" && k !== "transcript") o[k] = c[k]; o.count = c.messages.length; o.last = c.messages[c.messages.length - 1] || null; return o; }
  function site() {
    var content = {}, files = {};
    Object.keys(db.content).forEach(function (k) { if (k.indexOf("data:") === 0) files[k.slice(5)] = Date.parse(db.content[k].updated); else if (!PRIVATE[k.split(":")[0]] && k !== "gallery") content[k] = db.content[k].data; });
    return { ok: true, updated: null, content: content, dataFiles: files };
  }

  async function handle(method, path, q, body, headers) {
    var m, admin = path.indexOf("/admin/") === 0 && !/^\/admin\/(login|setup)/.test(path);
    if (admin && !(headers.Authorization || headers.authorization)) return J({ ok: false, error: "Please sign in again." }, 401);
    // build 78.3: personal accounts. Demo sign-in: demo@frequentresearch.com, password "demo", any 6-digit code.
    var ACTS = ["view", "create", "edit", "delete", "publish", "approve", "export", "manage", "configure"];
    var KEYS = [["PUBLIC_URL",0,"Site"],["MAIL_PROVIDER",0,"Email"],["MAIL_FROM",0,"Email"],["MAIL_REPLY_TO",0,"Email"],["MAIL_NOTIFY",0,"Email"],["SMTP_HOST",0,"Email"],["SMTP_PORT",0,"Email"],["SMTP_SECURE",0,"Email"],["SMTP_USER",0,"Email"],["SMTP_PASS",1,"Email"],["RESEND_API_KEY",1,"Email"],["SENDGRID_API_KEY",1,"Email"],["BREVO_API_KEY",1,"Email"],["MAIL_PER_MINUTE",0,"Email"],["ANTHROPIC_API_KEY",1,"AI"],["AI_MODEL",0,"AI"],["FB_PAGE_ID",0,"Social media"],["FB_PAGE_TOKEN",1,"Social media"],["IG_USER_ID",0,"Social media"],["IG_TOKEN",1,"Social media"],["LINKEDIN_AUTHOR_URN",0,"Social media"],["LINKEDIN_TOKEN",1,"Social media"],["X_API_KEY",1,"Social media"],["X_API_SECRET",1,"Social media"],["X_ACCESS_TOKEN",1,"Social media"],["X_ACCESS_SECRET",1,"Social media"],["SOCIAL_WEBHOOK",1,"Social media"],["SAMPCREW_API_URL",0,"SampCrew"],["SAMPCREW_API_KEY",1,"SampCrew"],["SAMPCREW_WEBHOOK_SECRET",1,"SampCrew"],["LEAD_WEBHOOK",1,"CRM"],["ONBOARDING_SECRET",1,"Onboarding portals"]].map(function (r) { return { key: r[0], secret: !!r[1], group: r[2], set: r[0] === "PUBLIC_URL", source: r[0] === "PUBLIC_URL" ? "server" : "", value: r[0] === "PUBLIC_URL" ? "https://www.frequentresearch.com" : "", hint: "", at: null, by: "", broken: false }; });
    var MODS = { dashboard: ["view"], onboarding: ["view", "create", "edit", "delete", "export", "configure"], pages: ["view", "create", "edit", "delete", "publish", "approve"], menus: ["view", "edit", "publish", "approve"], seo: ["view", "edit", "publish", "approve"], legal: ["view", "edit", "publish", "approve"], blog: ["view", "create", "edit", "delete", "publish", "approve"], company: ["view", "create", "edit", "delete", "publish", "approve"], products: ["view", "create", "edit", "delete", "publish", "approve"], panels: ["view", "create", "edit", "delete", "publish", "approve"], forms: ["view", "edit", "publish", "approve"], enquiries: ["view", "edit", "delete", "export", "manage"], careers: ["view", "edit", "delete", "export"], marketing: ["view", "create", "edit", "delete", "publish", "export"], media: ["view", "create", "edit", "delete"], settings: ["view", "edit", "publish", "approve"], integrations: ["view", "configure"], activity: ["view", "export"], users: ["view", "create", "edit", "delete", "manage"] };
    var LBL = { dashboard: "Dashboard", onboarding: "Client & vendor onboarding", pages: "Pages, sections & page texts", menus: "Header, footer menus & logos", seo: "SEO: titles, descriptions, redirects", legal: "Legal & policies", blog: "Blogs, case studies & card designs", company: "Company: team, testimonials, certifications, associations, careers page, gallery, contact", products: "Products, portals, downloads, PDFs, prices", panels: "Panel books & panel numbers", forms: "Forms & their fields", enquiries: "Enquiries, RFQs, downloads, live chat, reviews", careers: "Careers applications, CVs & SampCrew", marketing: "Contacts, emails, newsletters, social media, AI", media: "Media library", settings: "Site settings, banners, celebrations", integrations: "Connections & API keys", activity: "Activity log & visits", users: "Admins, roles & permissions" };
    var modules = {}; Object.keys(MODS).forEach(function (k) { modules[k] = { label: LBL[k], actions: MODS[k], paths: k === "pages" || k === "seo" }; });
    var pk = function (o) { var r = {}; Object.keys(o).forEach(function (k) { r[k] = o[k] === "*" ? MODS[k] : o[k]; }); return r; };
    var ROLES = [
      { id: "super", name: "Super Admin", note: "Everything, including admins, roles and approvals.", perms: MODS, builtIn: true },
      { id: "website", name: "Website Admin", note: "Pages, menus, SEO, legal pages and forms. Publishes website changes.", perms: pk({ dashboard: "*", pages: "*", menus: "*", seo: "*", legal: "*", forms: "*", media: ["view", "create", "edit"] }), builtIn: true },
      { id: "content", name: "Content Admin", note: "Writes blogs, case studies, team, testimonials, products and page texts. Changes go to approval.", perms: pk({ dashboard: "*", blog: ["view", "create", "edit"], company: ["view", "create", "edit"], products: ["view", "create", "edit"], pages: ["view", "edit"], media: ["view", "create", "edit"] }), builtIn: true },
      { id: "marketing", name: "Marketing Admin", note: "Contacts, emails, newsletters, social media and the AI writer.", perms: pk({ dashboard: "*", marketing: "*", blog: ["view", "create", "edit"], seo: ["view"], enquiries: ["view"], media: ["view", "create"] }), builtIn: true },
      { id: "hr", name: "HR Admin", note: "Careers applications and CVs, SampCrew, the careers page and team members.", perms: pk({ dashboard: "*", careers: "*", company: ["view", "edit"], media: ["view", "create"] }), builtIn: true },
      { id: "business", name: "Business Admin", note: "Enquiries and RFQs, live chat, reviews, panel books, products and prices.", perms: pk({ dashboard: "*", enquiries: "*", panels: "*", products: "*", forms: ["view"], marketing: ["view"], media: ["view", "create"] }), builtIn: true },
      { id: "it", name: "IT Admin", note: "Connections and keys, media library, site settings, activity log.", perms: pk({ dashboard: "*", integrations: "*", media: "*", settings: ["view", "edit"], activity: "*", users: ["view"] }), builtIn: true },
      { id: "viewer", name: "Viewer", note: "Looks only. No personal data.", perms: pk({ dashboard: "*", pages: ["view"], menus: ["view"], seo: ["view"], legal: ["view"], blog: ["view"], company: ["view"], products: ["view"], panels: ["view"], forms: ["view"] }), builtIn: true },
    ];
    db.admins = db.admins || [
      { id: "u_demo", email: "demo@frequentresearch.com", name: "Demo Super Admin", mobile: "", department: "Management", designation: "Director", role: "super", grants: [], status: "active", mfa: true, created: iso(NOW - 30 * DAY), by: "server setup", lastLogin: iso(NOW - 3 * 3600e3), invited: null, recoveryLeft: 10 },
      { id: "u_s1", email: "riya.sample@frequentresearch.com", name: "Riya (sample)", mobile: "", department: "Content", designation: "Writer", role: "viewer", grants: [{ module: "pages", actions: ["view", "edit"], keys: [], paths: ["/blog/*"], note: "writes the blog posts" }], status: "active", mfa: true, created: iso(NOW - 9 * DAY), by: "demo@frequentresearch.com", lastLogin: iso(NOW - DAY), invited: null, recoveryLeft: 10 },
      { id: "u_s2", email: "arjun.sample@frequentresearch.com", name: "Arjun (sample)", mobile: "", department: "Sales", designation: "Business manager", role: "business", grants: [], status: "invited", mfa: false, created: iso(NOW - DAY), by: "demo@frequentresearch.com", lastLogin: null, invited: { exp: iso(NOW + 2 * DAY), kind: "invite" }, recoveryLeft: 0 },
    ];
    db.drafts = db.drafts || [{ id: "d_s1", key: "texts", label: KEYS.texts, module: "pages", moduleLabel: LBL.pages, author: "Riya (sample)", authorEmail: "riya.sample@frequentresearch.com", status: "submitted", created: iso(NOW - 5 * 3600e3), updated: iso(NOW - 5 * 3600e3), paths: ["/blog/what-is-cati"], note: "", reviewer: "", mine: false, canApprove: true, canPublish: true, data: { "/blog/what-is-cati": { "What is CATI?": "What is CATI (computer-assisted telephone interviewing)?" } }, history: [{ at: iso(NOW - 5 * 3600e3), by: "riya.sample@frequentresearch.com", status: "submitted", note: "created" }] }];
    if (path === "/admin/login") {
      var b = JSON.parse(body || "{}");
      var ok = String(b.email || "").trim().toLowerCase() === "demo@frequentresearch.com" && b.password === "demo";
      log(ok ? "login" : "login-failed", b.email || ""); save();
      return ok ? J({ ok: true, mfa: true, ticket: "demo-ticket" }) : J({ ok: false, error: "Wrong email or password. In the demo: demo@frequentresearch.com / demo." }, 401);
    }
    if (path === "/admin/login/mfa") return J({ ok: true, token: "demo." + Date.now(), expires: iso(Date.now() + 12 * 3600e3), user: db.admins[0] });
    if (path === "/admin/logout" || path === "/admin/step-up") return J({ ok: true });
    if (path === "/admin/me") return J({ ok: true, user: db.admins[0], roleName: "Super Admin", perms: MODS, grants: [], modules: modules, stepUp: true, sessionExpires: iso(Date.now() + 12 * 3600e3), mail: false });
    if (path === "/admin/overview") return J({ ok: true, admins: { total: db.admins.length, active: db.admins.filter(function (u) { return u.status === "active"; }).length, invited: db.admins.filter(function (u) { return u.status === "invited"; }).length, suspended: 0, deactivated: 0 }, content: { submitted: db.drafts.filter(function (d) { return d.status === "submitted"; }).length, published: Object.keys(db.content).length }, pages: { custom: 0 }, enquiries: { week: db.leads.filter(function (l) { return l.kind !== "careers" && Date.parse(l.at) > NOW - 7 * DAY; }).length, open: db.leads.filter(function (l) { return l.kind !== "careers" && (!l.status || l.status === "new"); }).length, mine: 0 }, careers: { week: db.leads.filter(function (l) { return l.kind === "careers" && Date.parse(l.at) > NOW - 7 * DAY; }).length, open: 0 }, recent: db.audit.slice(0, 10).map(function (r) { return { at: r.at, action: r.action, target: r.target, actor: { name: "Demo Super Admin" } }; }) });
    if (path === "/admin/roles") return J({ ok: true, actions: ACTS, modules: modules, roles: ROLES.map(function (r) { return { id: r.id, name: r.name, note: r.note, perms: r.perms, builtIn: true, changed: false, users: db.admins.filter(function (u) { return u.role === r.id; }).length }; }) });
    if (/^\/admin\/roles\//.test(path)) return J({ ok: false, error: "In the demo the roles cannot be changed." }, 400);
    if (path === "/admin/users" && method === "GET") {
      var uq = (q.get("q") || "").toLowerCase(), us = db.admins.filter(function (u) { return (!uq || has(u.name, uq) || has(u.email, uq)) && (!q.get("role") || u.role === q.get("role")) && (!q.get("status") || u.status === q.get("status")); });
      return J({ ok: true, total: us.length, users: us });
    }
    if (path === "/admin/users") {
      var ub = JSON.parse(body || "{}");
      if (!/@frequentresearch\.com$/i.test(ub.email || "")) return J({ ok: false, error: "Admins must use an official email (frequentresearch.com)." }, 400);
      var nu = { id: "u_" + Date.now(), email: ub.email.toLowerCase(), name: ub.name, mobile: ub.mobile || "", department: ub.department || "", designation: ub.designation || "", role: ub.role || "viewer", grants: ub.grants || [], status: "invited", mfa: false, created: iso(Date.now()), by: "demo@frequentresearch.com", lastLogin: null, invited: { exp: iso(Date.now() + 3 * DAY), kind: "invite" }, recoveryLeft: 0 };
      db.admins.push(nu); log("admin-invited", nu.email); save();
      return J({ ok: true, user: nu, emailed: false, link: location.href.split("#")[0] + "#/admin/setup?t=demo-link", note: "Demo: no email is sent. On the live server the person gets an email with this one-time link." });
    }
    if ((m = /^\/admin\/users\/([^/]+)\/sessions$/.exec(path))) return J({ ok: true, sessions: [{ id: "s1", created: iso(NOW - 3 * 3600e3), last: iso(NOW - 600e3), exp: iso(NOW + 9 * 3600e3), revoked: false, ua: "Demo browser" }] });
    if ((m = /^\/admin\/users\/([^/]+)(?:\/([a-z-]+))?$/.exec(path))) {
      var au = db.admins.find(function (u) { return u.id === m[1]; }); if (!au) return J({ ok: false }, 404);
      var ab = JSON.parse(body || "{}");
      if (method === "PATCH") ["name", "mobile", "department", "designation", "role", "grants"].forEach(function (k) { if (ab[k] !== undefined) au[k] = ab[k]; });
      else if (m[2] === "suspend") au.status = "suspended"; else if (m[2] === "deactivate") au.status = "deactivated"; else if (m[2] === "reactivate") au.status = "active";
      log("admin-" + (m[2] || "changed"), au.email); save();
      return J({ ok: true, user: au, sessions: 1, link: m[2] === "reset" || m[2] === "resend" ? location.href.split("#")[0] + "#/admin/setup?t=demo-link" : undefined });
    }
    if (path === "/admin/approvals") return J({ ok: true, items: db.drafts.filter(function (d) { return q.get("status") === "all" || ["published", "archived"].indexOf(d.status) < 0; }) });
    if ((m = /^\/admin\/approvals\/([^/]+)(?:\/([a-z]+))?$/.exec(path))) {
      var dd = db.drafts.find(function (d) { return d.id === m[1]; }); if (!dd) return J({ ok: false }, 404);
      if (!m[2]) { var live = (db.content[dd.key] || {}).data || {}, pv = {}; dd.paths.forEach(function (p) { pv[p] = live[p] === undefined ? null : live[p]; }); return J({ ok: true, item: dd, proposed: dd.data, live: pv, base: pv }); }
      var db2 = JSON.parse(body || "{}"), to = { submit: "submitted", withdraw: "draft", review: "under_review", approve: db2.publish ? "published" : "approved", reject: "rejected", publish: "published", archive: "archived" }[m[2]];
      if (m[2] === "reject" && !db2.note) return J({ ok: false, error: "Say what should change (a short note for the author)." }, 400);
      if (to === "published") { var cur = (db.content[dd.key] || {}).data || {}; Object.keys(dd.data).forEach(function (k) { cur[k] = dd.data[k]; }); db.content[dd.key] = { data: cur, updated: iso(Date.now()), history: [] }; }
      dd.status = to; dd.updated = iso(Date.now()); dd.reviewer = "Demo Super Admin"; dd.history.push({ at: dd.updated, by: "demo@frequentresearch.com", status: to, note: db2.note || "" });
      log("approval-" + m[2], dd.key); save(); return J({ ok: true, status: to });
    }
    if (path === "/admin/account/sessions") return J({ ok: true, sessions: [{ id: "s1", created: iso(NOW - 3 * 3600e3), last: iso(Date.now()), exp: iso(NOW + 9 * 3600e3), ua: navigator.userAgent.slice(0, 120), current: true }] });
    if (path === "/admin/account/photo") { if (method === "PUT") db.admins[0].photo = JSON.parse(body || "{}").photo || ""; else delete db.admins[0].photo; save(); return J({ ok: true, photo: db.admins[0].photo || "" }); }
    if (path === "/admin/account/prefs") { var pb = JSON.parse(body || "{}"); db.admins[0].prefs = Object.assign({}, db.admins[0].prefs || {}, pb); save(); return J({ ok: true }); }
    if (path === "/admin/system") return J({ ok: true, version: "78.5.0", node: "v24 (demo)", uptime: 3 * 86400 + 5 * 3600, db: true, dbMs: 2, memoryMb: 96, counts: { leads: db.leads ? db.leads.length : 0, contacts: db.contacts ? db.contacts.length : 0, reviews: 12, chats: 3, visits: 2090, content: 18, admin_users: db.admins.length }, at: new Date().toISOString() });
    if (path === "/admin/account/password") return J({ ok: false, error: "In the demo the password cannot be changed." }, 400);
    if (path === "/admin/account/recovery-codes") return J({ ok: true, recovery: ["demo1-00001", "demo2-00002", "demo3-00003", "demo4-00004", "demo5-00005", "demo6-00006", "demo7-00007", "demo8-00008", "demo9-00009", "demo0-00010"] });
    if (/^\/admin\/setup\//.test(path)) return J({ ok: false, error: "Setup links work on the live server only." }, 404);
    if (path === "/admin/leads/assignees") return J({ ok: true, canAssign: true, admins: db.admins.filter(function (u) { return u.status === "active"; }).map(function (u) { return { id: u.id, name: u.name, email: u.email }; }) });
    if (path === "/admin/stats") return J(stats(Math.min(400, Math.max(1, +q.get("days") || 30))));
    if (path === "/admin/audit") {
      var aq = (q.get("q") || "").toLowerCase(), rows = db.audit.filter(function (r) { return !aq || has(r.action, aq) || has(r.target, aq); });
      var sk = +q.get("skip") || 0, li = +q.get("limit") || 100;
      return J({ ok: true, total: rows.length, rows: rows.slice(sk, sk + li) });
    }
    if (path === "/admin/visits") {
      var vd = +q.get("days") || 7, vr = db.visits.filter(function (v) { return Date.parse(v.at) >= NOW - vd * DAY && (!q.get("path") || v.path === q.get("path")); });
      return J({ ok: true, total: vr.length, visits: vr.slice(+q.get("skip") || 0, (+q.get("skip") || 0) + (+q.get("limit") || 100)) });
    }
    if (path === "/admin/leads") {
      var lq = (q.get("q") || "").toLowerCase(), from = Date.parse(q.get("from")), to = Date.parse(q.get("to"));
      var lr = db.leads.filter(function (l) {
        if (q.get("kind") && l.kind !== q.get("kind")) return false;
        if (q.get("status") && (q.get("status") === "new" ? !(l.status === "new" || !l.status) : l.status !== q.get("status"))) return false;
        var t = Date.parse(l.at); if (from && t < from) return false; if (to && t > to + DAY - 1) return false;
        return !lq || ["email", "name", "company", "message", "phone", "country", "service", "resource"].some(function (k) { return has(l[k], lq); });
      }).sort(function (a, b) { return a.at < b.at ? 1 : -1; });
      if (q.get("format") === "csv") { log("export-leads", "leads", { rows: lr.length }); save(); return new Response(csv(lr), { status: 200, headers: { "Content-Type": "text/csv" } }); }
      var kinds = {}; db.leads.forEach(function (l) { kinds[l.kind] = 1; });
      var s2 = +q.get("skip") || 0, l2 = +q.get("limit") || 100;
      return J({ ok: true, total: lr.length, kinds: Object.keys(kinds), leads: lr.slice(s2, s2 + l2) });
    }
    if ((m = /^\/admin\/leads\/([^/]+)$/.exec(path))) {
      var li2 = db.leads.findIndex(function (l) { return l.id === m[1]; });
      if (li2 < 0) return J({ ok: false }, 404);
      if (method === "GET") return J({ ok: true, lead: db.leads[li2] });
      if (method === "DELETE") { db.leads.splice(li2, 1); log("delete-lead", m[1]); save(); return J({ ok: true }); }
      var pb = JSON.parse(body || "{}"), set = {};
      if (pb.status != null) set.status = pb.status; if (typeof pb.note === "string") set.note = pb.note.slice(0, 2000);
      if (pb.category != null) set.category = pb.category;
      if (pb.assignee != null) { var asg = (db.admins || []).find(function (u) { return u.id === pb.assignee; }); set.assignee = asg ? asg.id : null; set.assigneeName = asg ? asg.name : ""; }
      Object.assign(db.leads[li2], set); log("update-lead", m[1], set); save(); return J({ ok: true });
    }
    if (path === "/admin/reviews") {
      var rq = (q.get("q") || "").toLowerCase();
      return J({ ok: true, reviews: db.reviews.filter(function (r) { return (!q.get("status") || r.status === q.get("status")) && (!rq || ["first", "last", "email", "company", "review"].some(function (k) { return has(r[k], rq); })); }) });
    }
    if ((m = /^\/admin\/reviews\/([^/]+)$/.exec(path))) {
      var ri = db.reviews.findIndex(function (r) { return r.id === m[1]; }); if (ri < 0) return J({ ok: false }, 404);
      var rb = JSON.parse(body || "{}");
      if (method === "PATCH") { ["first", "last", "company", "designation", "review", "reply", "country", "rating", "services"].forEach(function (k) { if (rb[k] != null) db.reviews[ri][k] = rb[k]; }); log("edit-review", m[1]); }
      else if (rb.action === "delete") { db.reviews.splice(ri, 1); log("delete-review", m[1]); }
      else { db.reviews[ri].status = rb.action === "publish" ? "published" : "hidden"; log(rb.action + "-review", m[1]); }
      save(); return J({ ok: true });
    }
    if (path === "/admin/chats") return J({ ok: true, chats: db.chats.filter(function (c) { return !q.get("status") || c.status === q.get("status"); }).sort(function (a, b) { return a.updated < b.updated ? 1 : -1; }).map(brief) });
    if ((m = /^\/admin\/chats\/(?!export$)([^/]+)(?:\/(reply|close|reopen))?$/.exec(path))) {
      var c = db.chats.find(function (x) { return x.id === m[1]; }); if (!c) return J({ ok: false }, 404);
      if (!m[2]) { c.unread = 0; save(); return J({ ok: true, chat: c }); }
      if (m[2] === "reply") {
        var text = String(JSON.parse(body || "{}").text || "").trim(); if (!text) return J({ ok: false, error: "Write a reply" }, 400);
        var msg = { i: c.messages.length, from: "agent", text: text, at: iso(Date.now()) };
        c.messages.push(msg); c.updated = msg.at; c.status = "open"; log("chat-reply", c.id, { chars: text.length }); save(); return J({ ok: true, message: msg });
      }
      c.status = m[2] === "close" ? "closed" : "open"; c.updated = iso(Date.now()); log("chat-" + m[2], c.id); save(); return J({ ok: true });
    }
    if (path === "/admin/content") {
      var ks = {}; Object.keys(KEYS).concat(Object.keys(db.content)).forEach(function (k) { ks[k] = 1; });
      return J({ ok: true, keys: Object.keys(ks).sort().map(function (k) { var d = db.content[k]; return { key: k, label: KEYS[k] || KEYS[k.split(":")[0]] || "", public: !PRIVATE[k.split(":")[0]], set: !!d, updated: d ? d.updated : null, size: d ? d.size : 0 }; }) });
    }
    if ((m = /^\/admin\/content\/([^/]+)(?:\/history(?:\/(\d+)(\/restore)?)?)?$/.exec(path))) {
      var k = decodeURIComponent(m[1]), hist = db.history[k] || [];
      if (/\/history/.test(path)) {
        if (m[2] == null) return J({ ok: true, versions: hist.map(function (h, i) { return { n: i, at: h.at, replaced: h.replaced, deleted: !!h.deleted }; }) });
        var v = hist[+m[2]]; if (!v) return J({ ok: false }, 404);
        if (!m[3]) return J({ ok: true, data: v.data, at: v.at });
        putContent(k, v.data); log("restore-content", k); save(); return J({ ok: true });
      }
      if (method === "GET") { var d = db.content[k]; return J({ ok: true, key: k, set: !!d, data: d ? d.data : null, updated: d ? d.updated : null }); }
      if (method === "PUT") { putContent(k, JSON.parse(body || "{}").data); save(); return J({ ok: true, key: k }); }
      if (method === "DELETE") { var o = db.content[k]; if (o) { (db.history[k] = db.history[k] || []).unshift({ at: o.updated, data: o.data, replaced: iso(Date.now()), deleted: true }); delete db.content[k]; log("delete-content", k); save(); } return J({ ok: true }); }
    }
    if (path === "/admin/celebrations") { var y = q.get("year"), cb = JSON.parse(body || "{}"); putContent(y ? "celebrations:" + y : "celebrations", cb); save(); return J({ ok: true, year: y || null, events: (cb.events || []).length }); }
    if (path === "/admin/gallery") { var g = JSON.parse(body || "{}"); putContent("gallery", { version: 1, updated: iso(Date.now()).slice(0, 10), items: g.items || [] }); save(); return J({ ok: true, items: (g.items || []).length }); }
    if (path === "/gallery") return J(db.content.gallery ? db.content.gallery.data : { version: 1, items: [] });
    if (path === "/celebrations") { var cy = db.content["celebrations:" + q.get("year")] || db.content.celebrations; return cy ? J(cy.data) : J({ ok: false }, 404); }
    if (path === "/site") return J(site());
    if ((m = /^\/content\/(.+)$/.exec(path))) { var cc = db.content[decodeURIComponent(m[1])]; return cc ? J({ ok: true, data: cc.data }) : J({ ok: false }, 404); }
    if (path === "/admin/files" && method === "POST") {
      var id = "f_" + Date.now().toString(36), name = q.get("name") || "file", type = (headers["Content-Type"] || "application/octet-stream");
      var blob = body instanceof Blob ? body : new Blob([body], { type: type });
      blobs[id] = blob; var url = URL.createObjectURL(blob);
      db.files.unshift({ id: id, name: name, size: blob.size, at: iso(Date.now()), type: type, folder: q.get("folder") || "misc", public: true, url: url, demo: true });
      log("upload-file", name, { size: blob.size }); save();
      return J({ ok: true, id: id, url: url, name: name, size: blob.size, type: type }, 201);
    }
    if (path === "/admin/files") {
      var fq = (q.get("q") || "").toLowerCase(), cvs = db.leads.filter(function (l) { return l.cv; }).map(function (l) { return { id: l.cv.id, name: l.cv.name, size: l.cv.size, at: l.at, type: l.cv.type, folder: "careers-cv", public: false, url: null }; });
      var all = db.files.filter(function (f) { return blobs[f.id]; }).concat(cvs);
      return J({ ok: true, files: all.filter(function (f) { return (!q.get("folder") || f.folder === q.get("folder")) && (!fq || has(f.name, fq)); }) });
    }
    if ((m = /^\/admin\/files\/([^/]+)$/.exec(path))) {
      if (method === "DELETE") { db.files = db.files.filter(function (f) { return f.id !== m[1]; }); delete blobs[m[1]]; log("delete-file", m[1]); save(); return J({ ok: true }); }
      var ff = db.files.find(function (f) { return f.id === m[1]; });
      if (method === "PATCH" && ff) { var fb = JSON.parse(body || "{}"); if (fb.alt !== undefined) ff.alt = String(fb.alt).slice(0, 200); log("edit-file", ff.name); save(); return J({ ok: true, url: ff.url }); }
      if (method === "PUT" && ff) { var nb = body instanceof Blob ? body : new Blob([body]); blobs[ff.id] = nb; ff.url = URL.createObjectURL(nb); ff.size = nb.size; ff.type = headers["Content-Type"] || ff.type; log("replace-file", ff.name); save(); return J({ ok: true, id: ff.id, url: ff.url, name: ff.name, size: nb.size, type: ff.type }); }
      if (blobs[m[1]]) return new Response(blobs[m[1]], { status: 200 });
      return new Response("SAMPLE CV (demo only). On the real server this is the applicant's uploaded file.", { status: 200, headers: { "Content-Type": "text/plain" } });
    }
    if (path === "/track") return new Response(null, { status: 204 });
    // ---- build 78: contacts, emails, automations, newsletters, social media, AI, connections (sample data) ----
    var MAIL = window.__FR_DEMO_MAIL || { templates: [], designs: [], automations: [], previews: {} };
    var mailSt = { provider: "off", ready: false, from: "", replyTo: "", notify: [], perMinute: 60 };
    if (!db.contacts) {
      var byEmail = {};
      db.leads.forEach(function (l) { var c = byEmail[l.email] || (byEmail[l.email] = { id: l.email, name: l.name, company: l.company, country: l.country, forms: [], services: [], tags: [], leads: 0, subscribed: rnd() < 0.6, created: l.at, last: l.at }); c.leads++; if (c.forms.indexOf(l.kind) < 0) c.forms.push(l.kind); if (l.service && c.services.indexOf(l.service) < 0) c.services.push(l.service); if (l.at > c.last) c.last = l.at; });
      db.contacts = Object.keys(byEmail).map(function (k) { return byEmail[k]; });
      db.campaigns = []; db.social = []; db.queue = [];
    }
    function cdata(k, d) { return db.content[k] ? db.content[k].data : d; }
    if (path === "/admin/marketing/stats") {
      var fm = {}; db.leads.forEach(function (l) { var f = l.formKey || l.kind, o = fm[f] || (fm[f] = { form: f, submissions: 0, people: {} }); o.submissions++; o.people[l.email] = 1; });
      var sv = {}; db.contacts.forEach(function (c) { c.services.forEach(function (x) { sv[x] = (sv[x] || 0) + 1; }); });
      return J({ ok: true, mail: mailSt, contacts: { total: db.contacts.length, subscribed: db.contacts.filter(function (c) { return c.subscribed; }).length, byForm: [], byService: Object.keys(sv).map(function (k) { return { service: k, n: sv[k] }; }), byCountry: [] }, forms: Object.keys(fm).map(function (k) { return { form: k, submissions: fm[k].submissions, people: Object.keys(fm[k].people).length }; }), queue: { sent: 0, queued: db.queue.length }, opened: 0, campaigns: db.campaigns });
    }
    if (path === "/admin/contacts" && method === "GET") {
      var cq = (q.get("q") || "").toLowerCase(), cr = db.contacts.filter(function (c) { return (!cq || has(c, cq)) && (!q.get("form") || c.forms.indexOf(q.get("form")) >= 0) && (!q.get("subscribed") || (q.get("subscribed") === "yes") === !!c.subscribed); });
      if (q.get("format") === "csv") return new Response(cr.map(function (c) { return [c.id, c.name, c.company, c.country, c.subscribed].join(","); }).join("\n"), { headers: { "Content-Type": "text/csv" } });
      var cs = +q.get("skip") || 0; return J({ ok: true, total: cr.length, contacts: cr.slice(cs, cs + (+q.get("limit") || 50)) });
    }
    if (path === "/admin/contacts/import") { var ib = JSON.parse(body || "{}"); (ib.rows || []).forEach(function (r) { if (!db.contacts.some(function (c) { return c.id === r.email; })) db.contacts.unshift({ id: String(r.email).toLowerCase(), name: r.name || "", company: r.company || "", country: r.country || "", forms: ["import"], services: [], tags: [], leads: 0, subscribed: !!ib.subscribed, created: iso(Date.now()), last: iso(Date.now()) }); }); save(); return J({ ok: true, imported: (ib.rows || []).length }); }
    if ((m = /^\/admin\/contacts\/([^/]+)$/.exec(path))) { var ce = decodeURIComponent(m[1]); if (method === "DELETE") db.contacts = db.contacts.filter(function (c) { return c.id !== ce; }); else { var cb2 = JSON.parse(body || "{}"); db.contacts.forEach(function (c) { if (c.id === ce) Object.assign(c, cb2); }); } save(); return J({ ok: true }); }
    function templates() { var own = cdata("mail-templates", []), out = MAIL.templates.map(function (t) { var o = own.find(function (x) { return x.id === t.id; }); return o ? Object.assign({}, t, o, { builtIn: true }) : t; }); own.forEach(function (o) { if (!out.some(function (t) { return t.id === o.id; })) out.push(o); }); return out; }
    if (path === "/admin/mail/templates") { if (method === "PUT") { var tb = JSON.parse(body || "{}"); putContent("mail-templates", tb.templates); if (tb.settings) putContent("mail-settings", tb.settings); save(); return J({ ok: true }); } return J({ ok: true, templates: templates(), designs: MAIL.designs, mail: mailSt, settings: cdata("mail-settings", {}) }); }
    if (path === "/admin/mail/preview") { var pt = JSON.parse(body || "{}").template || {}, pv = MAIL.previews[pt.id] || MAIL.previews["reply-enquiry"] || { subject: "", html: "" }; return J({ ok: true, subject: pv.subject, html: pv.html.replace("<body", '<body data-demo="1"') + '<p style="font:12px Arial;color:#7A86A8;text-align:center">Demo: the saved design is shown. On the real server the preview follows every edit as you type.</p>' }); }
    if (path === "/admin/mail/test") return J({ ok: false, error: "Email is not connected in the demo." }, 503);
    if (path === "/admin/mail/automations") { if (method === "PUT") { putContent("mail-automations", JSON.parse(body || "{}").automations); save(); return J({ ok: true }); } var sa = cdata("mail-automations", []); return J({ ok: true, mail: mailSt, automations: MAIL.automations.map(function (a) { var o = sa.find(function (x) { return x.id === a.id; }); return Object.assign({ builtIn: true }, a, o || {}); }).concat(sa.filter(function (x) { return !MAIL.automations.some(function (a) { return a.id === x.id; }); })) }); }
    if (path === "/admin/mail/queue") return J({ ok: true, mail: mailSt, rows: db.queue });
    if (path === "/admin/mail/queue/retry") return J({ ok: true, n: 0 });
    if (path === "/admin/campaigns") { if (method === "POST") { var nc = Object.assign({ id: "cm_" + Date.now().toString(36), status: "draft", created: iso(Date.now()), stats: {} }, JSON.parse(body || "{}")); db.campaigns.unshift(nc); save(); return J({ ok: true, id: nc.id }); } return J({ ok: true, campaigns: db.campaigns }); }
    if ((m = /^\/admin\/campaigns\/([^/]+)(?:\/(count|send|cancel))?$/.exec(path))) {
      if (m[2] === "count") return J({ ok: true, n: db.contacts.filter(function (c) { return c.subscribed; }).length });
      var cm = db.campaigns.find(function (x) { return x.id === m[1]; });
      if (method === "DELETE") { db.campaigns = db.campaigns.filter(function (x) { return x.id !== m[1]; }); save(); return J({ ok: true }); }
      if (!cm) return J({ ok: false }, 404);
      if (method === "PUT") { Object.assign(cm, JSON.parse(body || "{}")); save(); return J({ ok: true }); }
      if (m[2] === "send") { var sb = JSON.parse(body || "{}"); if (sb.at) { cm.status = "scheduled"; cm.sendAt = sb.at; save(); return J({ ok: true, scheduled: sb.at }); } var n2 = db.contacts.filter(function (c) { return c.subscribed; }).length; cm.status = "sending"; cm.stats = { queued: n2 }; save(); return J({ ok: true, audience: n2, mailReady: false }); }
      if (m[2] === "cancel") { cm.status = "cancelled"; save(); return J({ ok: true, removed: 0 }); }
    }
    var socialOff = { facebook: false, instagram: false, linkedin: false, x: false, webhook: false };
    if (path === "/admin/social/status") return J({ ok: true, platforms: socialOff, ai: false });
    if (path === "/admin/social/posts") {
      if (method === "POST") { var spb = JSON.parse(body || "{}"), sp = { id: "sp_" + Date.now().toString(36), text: spb.text, link: spb.link, image: spb.image, platforms: spb.platforms || [], at: spb.at, created: iso(Date.now()), status: spb.now ? "failed" : spb.at ? "scheduled" : "draft" }; if (spb.now) { sp.results = {}; sp.platforms.forEach(function (x) { sp.results[x] = { ok: false, error: "not connected (demo)" }; }); } db.social.unshift(sp); save(); return J(Object.assign({ ok: true, id: sp.id }, spb.now ? { status: "failed", results: sp.results } : {})); }
      return J({ ok: true, posts: db.social, platforms: socialOff });
    }
    if ((m = /^\/admin\/social\/posts\/([^/]+)(?:\/(approve|publish))?$/.exec(path))) { if (method === "DELETE") db.social = db.social.filter(function (x) { return x.id !== m[1]; }); save(); return m[2] === "publish" ? J({ ok: true, status: "failed", results: {} }) : J({ ok: true }); }
    if (path === "/admin/social/autopilot") { if (method === "PUT") { putContent("social-autopilot", JSON.parse(body || "{}")); save(); return J({ ok: true }); } return J({ ok: true, autopilot: cdata("social-autopilot", { on: false, approve: true, everyDays: 2, hour: 11, platforms: [], themes: "" }), ai: false }); }
    if (path === "/admin/ai/kinds") return J({ ok: true, ready: false, model: "claude-opus-5-5", kinds: {} });
    if (path === "/admin/ai/write" || path === "/admin/social/autopilot/run") return J({ ok: false, error: "The AI assistant is not connected in the demo. On the real server add ANTHROPIC_API_KEY to the .env file." }, 503);
    if (path === "/admin/integrations/keys" && method === "PUT") { var vv = (JSON.parse(body || "{}").values) || {}; Object.keys(vv).forEach(function (k) { var row = KEYS.filter(function (x) { return x.key === k; })[0]; if (!row) return; if (vv[k] === null) { row.set = false; row.source = ""; row.value = ""; row.hint = ""; row.at = null; row.by = ""; } else { row.set = true; row.source = "database"; row.value = row.secret ? "" : vv[k]; row.hint = row.secret && vv[k].length > 8 ? "\u2026" + vv[k].slice(-4) : ""; row.at = new Date().toISOString(); row.by = "demo@frequentresearch.com"; } }); return J({ ok: true, keys: KEYS }); }
    if (path === "/admin/integrations") return J({ ok: true, canSave: true, publicUrl: "https://www.frequentresearch.com", mail: mailSt, ai: { ready: false, model: "claude-opus-5-5" }, social: socialOff, sampcrew: { ready: false, webhook: false, url: "" }, leadWebhook: false, keys: KEYS });
    if ((m = /^\/admin\/integrations\/sampcrew\/send\//.exec(path))) return J({ ok: false, error: "SampCrew is not connected in the demo." }, 503);
    if ((m = /^\/admin\/chats\/(?:([^/]+)\/)?export$/.exec(path))) {
      var ex = db.chats.filter(function (c) { return !m[1] || c.id === m[1]; });
      return new Response(ex.map(function (c) { return "Conversation " + c.id + "\nVisitor: " + c.name + " <" + c.email + ">\n" + c.messages.map(function (x) { return x.at + "  " + x.from + ": " + x.text; }).join("\n"); }).join("\n\n"), { headers: { "Content-Type": "text/plain" } });
    }

    // build 82: client & vendor onboarding (sample records from scripts/admin-demo-onboarding.json)
      // build 82.5: Page video component (Pages > Page video component). /page-videos and the old /web-videos answer the same
      path = path.replace(/^\/(admin\/)?page-videos/, "/$1web-videos");
      if (path.indexOf("/admin/web-videos") === 0 || path.indexOf("/web-videos") === 0) {
        var me = { id: "u_demo", email: "demo@frequentresearch.com", name: "Demo Super Admin" };
        db.wv = db.wv || {}; db.wvSet = db.wvSet || { templates: [{ id: "default", label: "Default player" }, { id: "card", label: "Card with title and description" }, { id: "hero", label: "Large hero video" }, { id: "floating", label: "Floating button with pop-up" }, { id: "inline", label: "Inline in the page" }, { id: "modal", label: "Opens in a pop-up" }], icons: [{ id: "play", label: "Play" }, { id: "youtube", label: "YouTube" }, { id: "film", label: "Film" }, { id: "camera", label: "Camera" }, { id: "info", label: "Info" }], fields: [] };
        db.wvPages = db.wvPages || [];
        var np = function (x) { x = String(x || "").trim(); try { if (/^https?:\/\//.test(x)) x = new URL(x).pathname; } catch (e) {} x = x.split("#")[0].split("?")[0]; if (x.charAt(0) !== "/") x = "/" + x; if (x.length > 1) x = x.replace(/\/$/, ""); return x; };
        var idx = (window.__FR_SITE_INDEX && window.__FR_SITE_INDEX.list && window.__FR_SITE_INDEX.list.pages) || [];
        var allP = function () { var mp = {}; idx.forEach(function (p) { mp[p.path] = { path: p.path, title: p.title || "" }; }); db.wvPages.forEach(function (p) { if (!mp[p.path]) mp[p.path] = { path: p.path, title: p.title || "", added: true }; }); Object.keys(db.wv).forEach(function (k) { if (!mp[k]) mp[k] = { path: k, title: "", added: true }; }); return mp; };
        var pubV = function (d) { return { page: d.path, url: d.video.url, title: d.video.title, description: d.video.description, template: d.video.template, icon: d.video.icon, poster: d.video.poster || "", custom: d.custom || {}, updatedAt: d.updatedAt }; };
        var saveOne = function (pth, b) { var v = b.video || b; if (v.url && !/^(https?:\/\/|\/)/.test(v.url)) return "The video URL must start with https://"; db.wv[pth] = { path: pth, video: { url: v.url || "", title: v.title || "", description: v.description || "", template: v.template || "page", icon: v.icon || "", poster: v.poster || "" }, custom: b.custom || {}, enabled: b.enabled === undefined ? true : !!b.enabled, updatedAt: iso(Date.now()), updatedBy: me }; return ""; };
        // every page's own design (backend/src/data/page-video-templates.json, embedded by make-admin-demo.cjs)
        var PV = window.__FR_PV || { templates: {}, options: { layouts: [], scenes: [], objects: [], icons: [], motions: [] } };
        db.pvt = db.pvt || {};
        if (!db.wvSet.templates.some(function (t) { return t.id === "page"; })) db.wvSet.templates.unshift({ id: "page", label: "This page's own design (ready-made player)" });
        var clone = function (o) { return JSON.parse(JSON.stringify(o)); };
        var genT = function (pth, title) { var g = PV.templates[pth]; if (g) return clone(g); var ks = Object.keys(PV.templates), b = clone(PV.templates[ks[Math.abs(pth.split("").reduce(function (h, c) { return (h * 31 + c.charCodeAt(0)) | 0; }, 7)) % ks.length]] || {}); b.id = "pv-" + pth.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase(); b.page = pth; b.name = b.headline = title || pth; b.kicker = "Frequent Research"; b.points = []; b.stat = null; return b; };
        var mergeT = function (b, pt) { if (!pt) return b; var t = Object.assign({}, b, pt); if (pt.palette) t.palette = Object.assign({}, b.palette, pt.palette); t.edited = true; return t; };
        var tplOf = function (pth, title) { var o = db.pvt[pth]; return mergeT(genT(pth, title), o && o.patch); };
        var warnOf = function (t) { var L = function (h) { h = (h || "#000").replace("#", ""); var c = [0, 2, 4].map(function (i) { var v = parseInt(h.substr(i, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }; var cr = function (a, b) { var x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }; var p = t.palette || {}, w = Math.min(cr(p.ink, p.bg1), cr(p.ink, p.bg2)); return w < 4.5 ? "The text colour is hard to read on this background (contrast " + w.toFixed(1) + ":1; aim for 4.5:1 or more)." : ""; };
        if (path === "/web-videos/templates") { if (q.get("page") !== null) { var tp = np(q.get("page")); return J({ ok: true, page: tp, template: tplOf(tp, (allP()[tp] || {}).title) }); } var mpT = allP(); return J({ ok: true, count: Object.keys(mpT).length, templates: Object.keys(mpT).map(function (k) { var t = tplOf(k, mpT[k].title); return { page: k, id: t.id, name: t.name, layout: t.layout, frame: t.frame, prop: t.prop, scene: t.scene, object: t.object, edited: !!t.edited }; }) }); }
        if (path === "/admin/web-videos/templates") {
          var mpA = allP(), qa = (q.get("q") || "").toLowerCase().trim();
          var rowsA = Object.keys(mpA).map(function (k) { var o = db.pvt[k], t = tplOf(k, mpA[k].title); t.pageTitle = mpA[k].title; t.updatedAt = o ? o.updatedAt : null; t.updatedBy = o ? o.updatedBy : null; return t; });
          if (qa) rowsA = rowsA.filter(function (r) { return (r.page + " " + r.pageTitle + " " + r.headline + " " + r.kicker).toLowerCase().indexOf(qa) >= 0; });
          ["layout", "frame", "prop", "scene", "object", "family"].forEach(function (k) { if (q.get(k)) rowsA = rowsA.filter(function (r) { return r[k] === q.get(k); }); });
          if (q.get("edited") === "yes") rowsA = rowsA.filter(function (r) { return r.edited; });
          rowsA.sort(function (a, b) { return a.page === "/" ? -1 : b.page === "/" ? 1 : a.page < b.page ? -1 : 1; });
          var skA = +q.get("skip") || 0, liA = +q.get("limit") || 24;
          return J({ ok: true, total: rowsA.length, edited: Object.keys(db.pvt).length, options: PV.options, rows: rowsA.slice(skA, skA + liA) });
        }
        if (path === "/admin/web-videos/templates/item") {
          var tip = np(q.get("path")), ttl = (allP()[tip] || {}).title || "", base = genT(tip, ttl);
          if (method === "PUT") {
            var tb = JSON.parse(body || "{}"); tb = tb.template || tb; var pt = {};
            Object.keys(tb).forEach(function (k) { if (["id", "page", "family", "line", "edited", "pageTitle", "updatedAt", "updatedBy"].indexOf(k) >= 0) return; if (k === "palette") { var pl = {}; Object.keys(tb.palette || {}).forEach(function (c) { if (!/^#[0-9a-f]{6}$/i.test(tb.palette[c]) && c !== "tone") return; if (base.palette[c] !== tb.palette[c]) pl[c] = tb.palette[c]; }); if (Object.keys(pl).length) pt.palette = pl; } else if (JSON.stringify(base[k]) !== JSON.stringify(tb[k])) pt[k] = tb[k]; });
            if (Object.keys(pt).length) db.pvt[tip] = { patch: pt, updatedAt: iso(Date.now()), updatedBy: me }; else delete db.pvt[tip];
            save(); log("page-video.template", tip, { fields: Object.keys(pt) }); var nt = tplOf(tip, ttl); return J({ ok: true, template: nt, warning: warnOf(nt) });
          }
          if (method === "DELETE") { delete db.pvt[tip]; save(); log("page-video.template.reset", tip, {}); return J({ ok: true, template: base }); }
          var dv = db.wv[tip], tt = tplOf(tip, ttl);
          return J({ ok: true, path: tip, pageTitle: ttl, template: tt, generated: base, changes: db.pvt[tip] ? db.pvt[tip].patch : null, video: dv && dv.enabled && dv.video.url ? pubV(dv) : null, options: PV.options, warning: warnOf(tt) });
        }
        if (path === "/web-videos/config") return J({ ok: true, templates: db.wvSet.templates, icons: db.wvSet.icons, fields: db.wvSet.fields, design: PV.options });
        if (path === "/web-videos") {
          if (q.get("page") !== null) { var d0 = db.wv[np(q.get("page"))]; return J({ ok: true, page: np(q.get("page")), video: d0 && d0.enabled && d0.video.url ? pubV(d0) : null, template: tplOf(np(q.get("page")), (allP()[np(q.get("page"))] || {}).title) }); }
          var live = Object.keys(db.wv).map(function (k) { return db.wv[k]; }).filter(function (d) { return d.enabled && d.video.url; });
          return J({ ok: true, count: live.length, videos: live.map(pubV) });
        }
        if (path === "/admin/web-videos/settings") {
          if (method === "PUT") { var sb = JSON.parse(body || "{}"); db.wvSet = sb.settings || sb; save(); log("page-video.settings", "config", {}); return J({ ok: true, settings: db.wvSet }); }
          return J({ ok: true, settings: db.wvSet });
        }
        if (path === "/admin/web-videos/item") {
          var ip = np(q.get("path"));
          if (method === "PUT") { var er = saveOne(ip, JSON.parse(body || "{}")); if (er) return J({ ok: false, error: er }, 400); save(); log("page-video.save", ip, {}); return J({ ok: true, entry: db.wv[ip] }); }
          if (method === "DELETE") { delete db.wv[ip]; save(); return J({ ok: true }); }
          return J({ ok: true, path: ip, entry: db.wv[ip] || null, settings: db.wvSet });
        }
        if (path === "/admin/web-videos/import") {
          var rows = (JSON.parse(body || "{}").rows || []), n = 0, errs = [];
          rows.forEach(function (r, i) { var rp = r.path || r.page || r.pageUrl; if (!rp) { errs.push({ row: i + 1, error: "No page URL" }); return; } var cu = {}; db.wvSet.fields.forEach(function (f) { if (r[f.key] !== undefined) cu[f.key] = r[f.key]; }); var e2 = saveOne(np(rp), { video: { url: r.url, title: r.title, description: r.description, template: r.template, icon: r.icon, poster: r.poster }, custom: cu, enabled: !/^(false|0|no|off)$/i.test(String(r.enabled || "")) }); if (e2) errs.push({ row: i + 1, path: rp, error: e2 }); else n++; });
          save(); return J({ ok: true, saved: n, errors: errs });
        }
        if (path === "/admin/web-videos/pages") { var mp0 = allP(), added = 0; (JSON.parse(body || "{}").pages || []).forEach(function (p) { var pp = np(typeof p === "string" ? p : p.path); if (!mp0[pp]) { db.wvPages.push({ path: pp, title: p.title || "" }); mp0[pp] = 1; added++; } }); save(); return J({ ok: true, added: added }); }
        if (path === "/admin/web-videos/export") {
          var keys = db.wvSet.fields.map(function (f) { return f.key; }), cols = ["path", "pageTitle", "url", "title", "description", "template", "icon", "poster", "enabled"].concat(keys), mp1 = allP();
          var cc = function (v) { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
          var txt = "﻿" + cols.join(",") + "\n" + Object.keys(mp1).sort().map(function (k) { var d = db.wv[k], v = d ? d.video : {}, c = d ? d.custom : {}; var o = { path: k, pageTitle: mp1[k].title, url: v.url, title: v.title, description: v.description, template: v.template, icon: v.icon, poster: v.poster, enabled: d ? String(d.enabled) : "" }; keys.forEach(function (kk) { o[kk] = c[kk]; }); return cols.map(function (cn) { return cc(o[cn]); }).join(","); }).join("\n");
          return new Response(txt, { status: 200, headers: { "Content-Type": "text/csv" } });
        }
        if (path === "/admin/web-videos") {
          var mp2 = allP(), qq = (q.get("q") || "").toLowerCase(), has = q.get("has") || "";
          var all = Object.keys(mp2).map(function (k) { var d = db.wv[k]; return { path: k, pageTitle: mp2[k].title, added: !!mp2[k].added, video: d ? d.video : null, custom: d ? d.custom : {}, enabled: d ? d.enabled : false, updatedAt: d ? d.updatedAt : null, updatedBy: d ? d.updatedBy : null }; });
          if (qq) all = all.filter(function (r) { return (r.path + " " + r.pageTitle + " " + (r.video ? r.video.title + " " + r.video.url : "")).toLowerCase().indexOf(qq) >= 0; });
          if (has === "with") all = all.filter(function (r) { return r.video && r.video.url; }); if (has === "without") all = all.filter(function (r) { return !(r.video && r.video.url); });
          all.sort(function (a, b) { return a.path === "/" ? -1 : b.path === "/" ? 1 : a.path < b.path ? -1 : 1; });
          var sk = +q.get("skip") || 0, lim = +q.get("limit") || 100;
          return J({ ok: true, total: all.length, pages: Object.keys(mp2).length, withVideo: Object.keys(db.wv).filter(function (k) { return db.wv[k].video.url; }).length, rows: all.slice(sk, sk + lim) });
        }
      }
    if (/^\/admin\/onboarding/.test(path)) {
      var OBD = window.__FR_DEMO_OB || { forms: {}, records: [] };
      if (!db.ob) { db.ob = JSON.parse(JSON.stringify(OBD.records)); db.obForms = {}; save(); }
      var obSum = function (r) { var d = r.data || {}, ag = d.agreements || [], ex = ag.map(function (a) { return a && a.expiryISO; }).filter(function (x) { return /^\d{4}-\d{2}-\d{2}$/.test(x || ""); }).sort();
        r.company = (d.company || {}).legalName || ""; r.trade = (d.company || {}).tradeName || ""; r.country = (d.company || {}).country || ""; r.region = d.region || "";
        r.poc = (d.poc && (d.poc.name || d.poc.custom || d.poc.id)) || ""; r.email = ((d.sign && d.sign.email) || "").toLowerCase();
        if (r.kind === "client") r.services = ((d.company || {}).services || []).slice(0, 60); else r.types = d.types || [];
        r.agreementCount = ag.length; r.nextExpiry = ex[0] || ""; r.lastExpiry = ex[ex.length - 1] || ""; };
      var flat = function (v, pre, out) { out = out || []; if (v && typeof v === "object") { var ks = Object.keys(v); if (!ks.length) out.push([pre, ""]); ks.forEach(function (k) { flat(v[k], pre ? pre + "." + k : k, out); }); } else if (pre) out.push([pre, v]); return out; };
      var changed = function (a, b) { var A = {}, B = {}, o = []; flat(a || {}).forEach(function (x) { A[x[0]] = JSON.stringify(x[1]); }); flat(b || {}).forEach(function (x) { B[x[0]] = JSON.stringify(x[1]); }); Object.keys(B).forEach(function (k) { if (A[k] !== B[k]) o.push(k); }); Object.keys(A).forEach(function (k) { if (!(k in B)) o.push(k); }); return o; };
      var me = { id: "u_demo", email: "demo@frequentresearch.com", name: "Demo Super Admin" };
      var row = function (r) { var o = {}; ["id", "kind", "status", "source", "received", "updated", "tags", "owner", "company", "trade", "country", "region", "poc", "email", "types", "services", "agreementCount", "nextExpiry", "lastExpiry"].forEach(function (k) { o[k] = r[k]; }); return o; };
      var STS = ["new", "in-review", "approved", "active", "on-hold", "rejected", "expired", "archived"];
      if ((m = /^\/admin\/onboarding-forms\/(client|vendor)$/.exec(path))) {
        var fm = OBD.forms[m[1]] || { config: {}, catalogue: {} };
        if (method === "PUT") { var nc = JSON.parse(body || "{}").config || {}; var old = db.obForms[m[1]] || fm.config || {}; nc.version = (old.version || 0) + 1; nc.updated = iso(Date.now()); db.obForms[m[1]] = nc; log("onboarding-form", m[1], {}); save(); return J({ ok: true, config: nc }); }
        return J({ ok: true, config: db.obForms[m[1]] || fm.config, catalogue: fm.catalogue });
      }
      if (path === "/admin/onboarding-renewals") {
        var until = iso(Date.now() + Math.min(3650, +q.get("days") || 365) * DAY).slice(0, 10), td = iso(Date.now()).slice(0, 10), rr = [];
        db.ob.filter(function (r) { return !q.get("kind") || r.kind === q.get("kind"); }).forEach(function (r) { ((r.data || {}).agreements || []).forEach(function (a) {
          if (!a || !a.expiryISO || a.expiryISO > until) return; var left = Math.round((Date.parse(a.expiryISO) - Date.parse(td)) / DAY);
          rr.push({ id: r.id, kind: r.kind, status: r.status, company: r.company, poc: r.poc, email: r.email, code: a.code, title: a.title || a.code, ref: a.ref, effective: a.effective, expiryISO: a.expiryISO, daysLeft: left, renewedBy: a.renewedBy || "", state: a.renewedBy ? "renewed" : left < 0 ? "expired" : left <= 30 ? "due" : "ok" }); }); });
        rr.sort(function (a, b) { return a.expiryISO < b.expiryISO ? -1 : 1; }); return J({ ok: true, rows: rr });
      }
      if (path === "/admin/onboarding" && method === "GET") {
        var oq = (q.get("q") || "").toLowerCase(), soon = iso(Date.now() + 30 * DAY).slice(0, 10), tday = iso(Date.now()).slice(0, 10);
        var all = db.ob.filter(function (r) { return !q.get("kind") || r.kind === q.get("kind"); });
        var rows = all.filter(function (r) { var ex = q.get("expiring"); return (!q.get("status") || r.status === q.get("status")) && (!q.get("poc") || has(r.poc, q.get("poc").toLowerCase())) && (!q.get("country") || r.country === q.get("country")) && (!oq || has(r.data, oq) || has(r.id, oq))
          && (!ex || (ex === "30" && r.nextExpiry && r.nextExpiry <= soon && r.nextExpiry >= tday) || (ex === "past" && r.nextExpiry && r.nextExpiry < tday) || (ex !== "30" && ex !== "past" && /^\d+$/.test(ex) && r.nextExpiry && r.nextExpiry <= iso(Date.now() + ex * DAY).slice(0, 10))); });
        rows.sort(function (a, b) { return a.received < b.received ? 1 : -1; });
        if (q.get("format") === "csv") return new Response(csv(rows.map(function (r) { var o = row(r); delete o.services; delete o.types; flat(r.data).forEach(function (x) { o[x[0]] = x[1]; }); return o; })), { headers: { "Content-Type": "text/csv" } });
        var counts = {}; all.forEach(function (r) { counts[r.status] = (counts[r.status] || 0) + 1; });
        return J({ ok: true, total: rows.length, rows: rows.map(function (r) { var o = row(r); o.files = (r.files || []).length; o.notes = (r.notes || []).length; return o; }), counts: counts, expiring30: all.filter(function (r) { return r.nextExpiry && r.nextExpiry >= tday && r.nextExpiry <= soon; }).length, statuses: STS });
      }
      if (path === "/admin/onboarding" && method === "POST") {
        var nb = JSON.parse(body || "{}"), nk = nb.kind === "vendor" ? "vendor" : "client";
        if (!nb.data || !nb.data.company || !nb.data.company.legalName) return J({ ok: false, error: "Enter the legal name." }, 422);
        var nid = (nk === "vendor" ? "FR-VEN-" : "FR-MSA-") + new Date().getFullYear() + "-" + Math.random().toString(36).slice(2, 10).toUpperCase();
        var base = JSON.parse(JSON.stringify(((OBD.forms[nk] || {}).catalogue || {}).empty || {}));
        var nr = { id: nid, kind: nk, status: STS.indexOf(nb.status) >= 0 ? nb.status : "new", source: "admin", received: iso(Date.now()), updated: iso(Date.now()), tags: [], owner: "", data: Object.assign(base, nb.data, { ref: nid }), files: [], missingFiles: [], notes: [], history: [{ at: iso(Date.now()), by: me, action: "added in the admin" }] };
        obSum(nr); db.ob.unshift(nr); log("onboarding-add", nid, {}); save(); return J({ ok: true, id: nid, item: row(nr) });
      }
      if ((m = /^\/admin\/onboarding\/([^/]+)(?:\/(notes|files)(?:\/([^/]+))?)?$/.exec(path))) {
        var rec = db.ob.find(function (r) { return r.id === decodeURIComponent(m[1]); }); if (!rec) return J({ ok: false, error: "Not found" }, 404);
        var now = iso(Date.now());
        if (m[2] === "notes") {
          if (method === "POST") { var tx = (JSON.parse(body || "{}").text || "").trim(); if (!tx) return J({ ok: false, error: "Write a note first." }, 400); var nn = { id: Math.random().toString(16).slice(2, 12), at: now, by: me, text: tx }; rec.notes.push(nn); rec.updated = now; save(); return J({ ok: true, note: nn }); }
          if (method === "DELETE") { rec.notes = rec.notes.filter(function (n) { return n.id !== m[3]; }); save(); return J({ ok: true }); }
        }
        if (m[2] === "files") {
          if (method === "POST") { var fl = { id: Math.random().toString(16).slice(2, 14) + "demo0000000", field: "upload", label: q.get("label") || q.get("name") || "File", name: q.get("name") || "file", type: (body && body.type) || "application/octet-stream", size: (body && body.size) || 0, sha256: "demo (file stays in this browser only)", at: now, by: "Demo Super Admin" }; rec.files.push(fl); rec.history.push({ at: now, by: me, action: "file added: " + fl.label }); save(); return J({ ok: true, file: fl }); }
          var ff = (rec.files || []).find(function (f) { return f.id === m[3]; }); if (!ff) return J({ ok: false, error: "Not found" }, 404);
          if (method === "DELETE") { rec.files = rec.files.filter(function (f) { return f !== ff; }); rec.history.push({ at: now, by: me, action: "file deleted: " + ff.label }); save(); return J({ ok: true }); }
          var esc = function (t) { return String(t).replace(/[\\()]/g, "").replace(/[^\x20-\x7e]/g, "-"); };
          var st = "BT /F1 20 Tf 60 760 Td (" + esc(ff.label) + ") Tj /F1 12 Tf 0 -30 Td (" + esc(rec.company) + " - " + esc(rec.id) + ") Tj 0 -24 Td (SAMPLE: in the demo the real file is not included.) Tj ET";
          var objs = ["<< /Type /Catalog /Pages 2 0 R >>", "<< /Type /Pages /Kids [3 0 R] /Count 1 >>", "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>", "<< /Length " + st.length + " >>\nstream\n" + st + "\nendstream", "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"];
          var pdf = "%PDF-1.4\n", offs = []; objs.forEach(function (o, i) { offs.push(pdf.length); pdf += (i + 1) + " 0 obj\n" + o + "\nendobj\n"; });
          var xr = pdf.length; pdf += "xref\n0 6\n0000000000 65535 f \n" + offs.map(function (x) { return ("000000000" + x).slice(-10) + " 00000 n \n"; }).join("") + "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xr + "\n%%EOF";
          return new Response(new Blob([pdf], { type: "application/pdf" }), { headers: { "Content-Type": "application/pdf" } });
        }
        if (!m[2] && method === "GET") return J({ ok: true, item: Object.assign(row(rec), { data: rec.data, files: rec.files || [], missingFiles: rec.missingFiles || [], notes: rec.notes || [], history: (rec.history || []).slice(-200) }) });
        if (!m[2] && method === "DELETE") { db.ob = db.ob.filter(function (r) { return r !== rec; }); log("onboarding-delete", rec.id, {}); save(); return J({ ok: true }); }
        if (!m[2] && method === "PUT") {
          var pb2 = JSON.parse(body || "{}"), hist = [];
          if (pb2.data) { if (!pb2.data.company || !pb2.data.company.legalName) return J({ ok: false, error: "The legal name cannot be empty." }, 422); var ch = changed(rec.data, pb2.data); if (ch.length) { pb2.data.ref = rec.id; rec.data = pb2.data; obSum(rec); hist.push({ at: now, by: me, action: "edited", changes: ch.slice(0, 300) }); } }
          if (pb2.status !== undefined && pb2.status !== rec.status) { hist.push({ at: now, by: me, action: "status " + rec.status + " → " + pb2.status }); rec.status = pb2.status; }
          if (Array.isArray(pb2.tags)) rec.tags = pb2.tags.filter(Boolean);
          if (pb2.owner !== undefined) rec.owner = pb2.owner;
          if (Array.isArray(pb2.fileLabels)) pb2.fileLabels.forEach(function (x) { var f = rec.files.find(function (y) { return y.id === x.id; }); if (f && x.label) f.label = x.label; });
          rec.updated = now; rec.history = rec.history.concat(hist); log("onboarding-edit", rec.id, {}); save();
          return J({ ok: true, changes: hist.reduce(function (n, h) { return n + (h.changes ? h.changes.length : 0); }, 0) });
        }
      }
    }
    return J({ ok: false, error: "Not in the demo" }, 404);
  }

  var realFetch = window.fetch;
  window.fetch = function (u, o) {
    var s = typeof u === "string" ? u : (u && u.url) || "";
    var mm = /(?:^|\/)api(?:\/v1)?(\/[^?#]*)(?:\?([^#]*))?/.exec(s);
    if (!mm || /^https?:/.test(s) && s.indexOf(location.host) < 0) return realFetch.apply(this, arguments);
    o = o || {};
    var h = {}; var hh = o.headers || {}; if (hh instanceof Headers) hh.forEach(function (v, k) { h[k] = v; }); else for (var k in hh) h[k] = hh[k];
    return new Promise(function (r) { setTimeout(r, 120); }).then(function () { return handle((o.method || "GET").toUpperCase(), mm[1], new URLSearchParams(mm[2] || ""), o.body, h); });
  };
  if (navigator.sendBeacon) navigator.sendBeacon = function () { return true; };

  // the yellow demo bar
  document.addEventListener("DOMContentLoaded", function () {
    var bar = document.createElement("div");
    bar.setAttribute("role", "note");
    bar.style.cssText = "position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:2147483000;background:#FFC27A;color:#0B1437;font:600 13px/1.4 Inter,system-ui,sans-serif;padding:8px 12px;border-radius:12px;box-shadow:0 10px 30px rgba(11,20,55,.3);display:flex;gap:10px;align-items:center;max-width:calc(100% - 24px)";
    bar.innerHTML = '<span>Demo with SAMPLE data. Sign in with demo@frequentresearch.com / demo and any 6-digit code. Changes stay in this browser and never reach the website.</span>';
    var b = document.createElement("button"); b.textContent = "Reset demo"; b.style.cssText = "border:0;border-radius:8px;background:#0B1437;color:#fff;font:600 12px Inter,system-ui,sans-serif;padding:6px 10px;cursor:pointer;white-space:nowrap";
    b.onclick = function () { if (confirm("Start the demo again with the original sample data?")) window.__FR_ADMIN_DEMO_RESET(); };
    bar.appendChild(b); document.body.appendChild(bar);
  });
})();
