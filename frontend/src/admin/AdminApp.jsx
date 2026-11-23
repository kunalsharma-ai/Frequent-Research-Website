/*
 * Super admin panel (build 67), on the website at /admin. Build 78.3: personal accounts (email + password + authenticator),
 * made by invitation; the first Super Admin is made on the server (npm run admin -- create-super-admin). Each admin
 * sees only the sections their role and extra access allow (GET /admin/me); the server checks every request again.
 * Sections: /admin/<section>. The panel only talks to /api/v1/admin/… (backend/src/routes), so the website's files are
 * never touched: every change is stored in MongoDB and the site picks it up on the next page load (src/app/cms.jsx).
 */
import * as ee from 'react';
import { admApi, admCan, admForget, admMe, admOnSignOut, admOnStepUp, admSetToken, admToken } from './api.jsx';
import { AdmAccount, AdmApprovals, AdmLogin, AdmRoles, AdmSeo, AdmSetup, AdmStepUpBox, AdmUsers } from './Access.jsx';
import { AdmBtn } from './Fields.jsx';
import { AdmChat, AdmDashboard, AdmLeads, AdmReviews, AdmVisits } from './Inbox.jsx';
import { AdmCelebrations, AdmGallery, AdmListEditor, AdmObjectEditor, AdmPanels, AdmPdfs, AdmSettings } from './Content.jsx';
import { AdmPageEditor } from './PageEditor.jsx';
import { AdmPageVideos } from './PageVideos.jsx';
import { AdmActivity, AdmAllContent, AdmFiles } from './System.jsx';
import { AdmCardDesigns, AdmCases, AdmForms, AdmLegal, AdmLogos, AdmMenus, AdmNewPages, AdmPages } from './Builder.jsx';
import { AdmAi, AdmAutomations, AdmCampaigns, AdmContacts, AdmEmails, AdmKeys, AdmSocial } from './Marketing.jsx';
import ADM78_CSS from '../styles/admin78.css?inline';
import ADM783_CSS from '../styles/admin783.css?inline';
import { AdmHome } from './Dash.jsx';
import { AdmAreaHero } from './Areas.jsx';
import { AdmApis } from './Api.jsx';
import { AdmOnboarding } from './Onboarding.jsx';
import { OB82_DEF } from '../design82/Ob82.jsx';
import { AdmWebVideos } from './WebVideos.jsx';
import { AdmFace, AdmLogo, AdmSwitches, admApplyPrefs, admMood, admSfx, useAdmPalette, useAdmTheme } from './Look.jsx';

if (typeof document !== "undefined" && !document.getElementById("adm78-css")) { const st = document.createElement("style"); st.id = "adm78-css"; st.textContent = ADM78_CSS + "\n" + ADM783_CSS; document.head.appendChild(st); }

const NAV = [
  ["Overview", [["", "Dashboard", "◧"], ["visits", "Visits", "◷"], ["activity", "Activity", "☰"]]],
  // build 82: the two onboarding portals (every submission, MSAs / agreements, documents, renewals, the form fields)
  ["Onboarding", [["client-onboarding", "New client onboarding", "🤝"], ["vendor-onboarding", "New vendor onboarding", "🏭"]]],
  ["Inbox", [["leads", "Leads", "✉"], ["contacts", "Contacts & form counts", "◉"], ["chat", "Live chat", "💬"], ["reviews", "Reviews", "★"]]],
  // build 78: pages, sections and menus
  ["Pages", [
    ["pages", "Pages & sections", "▦"], ["page-videos", "Page video component", "🎬"], ["new-pages", "New pages", "＋"], ["menus", "Header & footer menus", "☰"], ["edit", "Edit on the page", "✎"],
    ["logos", "Logos", "◈"], ["legal", "Legal & policies", "§"], ["seo", "SEO & redirects", "⌕"],
  ]],
  ["Website content", [
    ["settings", "Site settings", "⚙"], ["contact", "Contact & WhatsApp", "☎"],
    ["team", "Team", "👥"], ["leadership", "Leadership messages", "🎙"], ["home-stats", "Home page numbers", "🔢"], ["design79", "Hero texts (home & platforms)", "✦"], ["testimonials", "Client testimonials", "❝"], ["blogs", "Blog posts", "✍"], ["cards", "Card designs", "▭"], ["cases", "Case studies", "▤"],
    ["products", "Products", "◆"], ["portals", "Panel portals", "◎"], ["careers", "Careers", "💼"], ["downloads", "Downloads list", "⬇"], ["certifications", "Certifications", "✔"], ["associations", "Associations (ESOMAR…)", "◇"],
    ["af", "Accounts & Finance prices", "₹"], ["panels", "Panel numbers", "#"], ["pdfs", "PDF documents", "▤"], ["forms", "Forms", "☑"],
    ["videos", "Page videos", "▶"], ["celebrations", "Celebration calendar", "✦"], ["gallery", "Gallery", "▣"],
  ]],
  ["Marketing", [["emails", "Email templates", "✉"], ["automations", "Email automations", "⟳"], ["newsletters", "Newsletters", "📰"], ["social", "Social media", "📣"], ["ai", "AI assistant", "✨"]]],
  ["System", [["api", "API", "⇄"], ["keys", "Connections & keys", "🔑"], ["files", "Files", "🗂"], ["content", "All content", "{ }"]]],
  // build 78.3
  ["Access", [["approvals", "Approvals", "✓"], ["users", "Admins", "👤"], ["roles", "Roles & rights", "⚿"], ["account", "My account", "☺"]]],
];
// the area each section belongs to: the section shows for admins who may view that area (or have extra access in it)
const AREA = {
  visits: "activity", activity: "activity", leads: ["enquiries", "careers"], contacts: "marketing", chat: "enquiries", reviews: "enquiries",
  pages: "pages", "page-videos": "pages", "web-videos": "pages", "new-pages": "pages", menus: "menus", edit: "pages", logos: "menus", legal: "legal", seo: "seo",
  settings: "settings", contact: "company", team: "company", leadership: "company", "home-stats": "pages", design79: "pages", testimonials: "company", blogs: "blog", cards: "blog", cases: "blog",
  products: "products", portals: "products", careers: "company", downloads: "products", certifications: "company", associations: "company",
  af: "products", panels: "panels", pdfs: "products", forms: "forms", videos: "pages", celebrations: "settings", gallery: "company",
  emails: "marketing", automations: "marketing", newsletters: "marketing", social: "marketing", ai: "marketing",
  "client-onboarding": "onboarding", "vendor-onboarding": "onboarding", "onboarding-links": "company",
  api: "integrations", keys: "integrations", files: "media", users: "users", roles: "users",
};
const ALWAYS = new Set(["", "approvals", "account", "content"]);
const allowed = (me, id) => ALWAYS.has(id) || (!!me && [].concat(AREA[id] || "users").some((m) => admCan(me, m, "view") || admCan(me, m, "edit")));

function section(id, go) {
  switch (id) {
    case "": return <AdmHome go={go} />;
    case "seo": return <AdmSeo />;
    case "approvals": return <AdmApprovals />;
    case "users": return <AdmUsers go={go} />;
    case "roles": return <AdmRoles />;
    case "account": return <AdmAccount />;
    case "visits": return <AdmVisits />;
    case "activity": return <AdmActivity />;
    case "leads": return <AdmLeads />;
    case "chat": return <AdmChat />;
    case "reviews": return <AdmReviews />;
    case "edit": return <AdmPageEditor />;
    case "settings": return <AdmSettings />;
    case "contact": return <AdmObjectEditor ckey="contact" title="Contact & WhatsApp" intro="Company name, email, phone, address, the WhatsApp number (country code + number, digits only, e.g. 918178200573) and the message WhatsApp opens with, and the social links. Used everywhere on the site: header, footer, contact page, chat and WhatsApp button." />;
    case "team": return <AdmListEditor ckey="team" photos="team-photos" folder="team" title="Team" intro="Everyone on the Our team page: name, role, email, LinkedIn, team, video and photo. Add a person, hide one, or change the order with the arrows." />;
    case "leadership": return <AdmListEditor ckey="leadership" folder="team" title="Leadership messages" intro="The three director messages on the home page and the Our Team page: name, role, email, LinkedIn, the heading above the message, each paragraph of the message and the photo (leave the photo empty to keep the current portrait). Hide one or change the order with the arrows." />;
    case "home-stats": return <AdmListEditor ckey="home-stats" title="Home page numbers" intro="The four numbers on the home page (Frequent Research in numbers): the number, the sign after it (+ or %) and the label under it." />;
    case "design79": return <AdmObjectEditor ckey="design79" title="Hero texts (home & platforms)" intro="The headings, intro texts, buttons and moving tickers of the home page hero and the four platform pages (Market Research, Digital Marketing, IT & Development, Accounts & Finance). Anything you leave as it is keeps the current text." />;
    case "testimonials": return <AdmListEditor ckey="testimonials" title="Client testimonials" intro="The client quotes shown on the site. Never publish a testimonial without the client's permission." />;
    case "blogs": return <AdmListEditor ckey="blogs" folder="blog" title="Blog posts" intro="Every blog post with all its parts: title, description, date, key takeaways, sections, FAQs. Open a post to edit it; add a new post with + Add new (it starts with the same parts, empty), or let the AI assistant write a draft. Card designs for the blog page: Card designs." />;
    case "careers": return <AdmObjectEditor ckey="careers" folder="careers" title="Careers" intro="Departments in the application form, reasons to join and the other texts of the careers page." />;
    case "downloads": return <AdmListEditor ckey="downloads" title="Downloads list" />;
    case "certifications": return <AdmListEditor ckey="certifications" folder="logos" title="Certifications" />;
    case "associations": return <AdmListEditor ckey="associations" folder="logos" title="Associations & memberships" intro="ESOMAR, MSME and any other association shown with the certificates (footer, home page, about and legal pages). Change the logo, link or text, hide one, or add a new one with its logo." />;
    case "portals": return <AdmListEditor ckey="portals" folder="logos" title="Panel portals" intro="MyFrequentRewards, MyHealthOpinions and Turn2Opinion: names, links, texts, numbers." />;
    case "af": return <AdmObjectEditor ckey="af-services" title="Accounts & Finance services" intro="All 16 Accounts & Finance service pages: prices (hero price, plans), offers, FAQs and every text. Open a service to edit it." />;
    case "panels": return <AdmPanels />;
    case "pdfs": return <AdmPdfs />;
    case "celebrations": return <AdmCelebrations />;
    case "gallery": return <AdmGallery />;
    case "videos": return <AdmPageVideos />;
    case "contacts": return <AdmContacts go={go} />;
    case "pages": return <AdmPages go={go} />;
    case "page-videos": case "web-videos": return <AdmWebVideos />;
    case "new-pages": return <AdmNewPages />;
    case "menus": return <AdmMenus />;
    case "logos": return <AdmLogos />;
    case "legal": return <AdmLegal />;
    case "cards": return <AdmCardDesigns />;
    case "cases": return <AdmCases />;
    case "products": return <AdmListEditor ckey="products" folder="logos" title="Products" intro="Every Sampledge product: name, short name, category, texts, features, numbers and colours. Add a new product with + Add new: it appears in the Products menu and gets its own page at /products/<id>, in the same design as the others. Logos: Pages › Logos." />;
    case "forms": return <AdmForms go={go} />;
    case "emails": return <AdmEmails go={go} />;
    case "automations": return <AdmAutomations go={go} />;
    case "newsletters": return <AdmCampaigns go={go} />;
    case "social": return <AdmSocial go={go} />;
    case "ai": return <AdmAi go={go} />;
    case "client-onboarding": return <AdmOnboarding kind="client" go={go} />;
    case "vendor-onboarding": return <AdmOnboarding kind="vendor" go={go} />;
    case "onboarding-links": return <AdmObjectEditor ckey="onboarding-links" base={OB82_DEF} title="Onboarding links on the site" intro="The two cards that send new clients and new vendors to their onboarding forms (home page, Let's Talk, Scan & Connect) and the two footer links. To take a form off the whole website, set its “show” to No and save (set it back to Yes to bring it back). Change the form address (url), the texts, the time and the steps shown." />;
    case "api": return <AdmApis />;
    case "keys": return <AdmKeys />;
    case "files": return <AdmFiles />;
    case "content": return <AdmAllContent />;
    default: return <p className="adm-muted">This section does not exist.</p>;
  }
}

// the one-file demo (opened from file://) keeps the section in the hash: #/admin/leads
const DEMO = typeof window !== "undefined" && !!window.__FR_ADMIN_DEMO;
const sectionFromPath = () => (DEMO ? location.hash.replace(/^#\/?/, "") : location.pathname).replace(/^\/?admin\/?/, "").split(/[/?]/)[0].replace(/^web-videos$/, "page-videos"); // build 82.5: the old address opens the renamed section

function AdminApp() {
  const [inside, setInside] = ee.useState(!!admToken());
  const [sec, setSec] = ee.useState(sectionFromPath());
  const [menu, setMenu] = ee.useState(false);
  const [me, setMe] = ee.useState(null);
  const [ask, setAsk] = ee.useState(null);
  const [draft, setDraft] = ee.useState(null);
  useAdmTheme();
  ee.useEffect(() => {
    document.documentElement.classList.add("adm-mode");
    document.title = "Admin | Frequent Research";
    let m = document.querySelector('meta[name="robots"]');
    if (!m) { m = document.createElement("meta"); m.name = "robots"; document.head.appendChild(m); }
    m.content = "noindex, nofollow";
    admOnSignOut(() => { admForget(); setMe(null); setInside(false); });
    admOnStepUp((msg) => new Promise((resolve) => { admSfx("ask"); setAsk({ msg, resolve }); }));
    const pop = () => setSec(sectionFromPath());
    const dr = (e) => { admSfx("draft"); setDraft(e.detail); clearTimeout(dr.t); dr.t = setTimeout(() => setDraft(null), 12000); };
    window.addEventListener("popstate", pop);
    window.addEventListener("adm-draft", dr);
    return () => { window.removeEventListener("popstate", pop); window.removeEventListener("adm-draft", dr); };
  }, []);
  useAdmPalette();
  ee.useEffect(() => { if (inside) admMe(true).then((m) => { setMe(m); admApplyPrefs(m && m.user && m.user.prefs); }).catch(() => {}); }, [inside]);
  ee.useEffect(() => { const f = () => admMe(true).then(setMe).catch(() => {}); window.addEventListener("adm-me", f); return () => window.removeEventListener("adm-me", f); }, []);
  const go = (id) => { if (DEMO) history.pushState(null, "", "#/admin" + (id ? "/" + id : "")); else history.pushState(null, "", "/admin" + (id ? "/" + id : "")); setSec(id); setMenu(false); window.scrollTo(0, 0); admSfx("nav"); };
  const stepUp = <AdmStepUpBox ask={ask} onDone={(code) => { const a = ask; setAsk(null); a && a.resolve(code); }} />;
  // the one-time setup link works without signing in
  if (sec === "setup") return <AdmSetup />;
  if (!inside) return <AdmLogin onIn={() => { admForget(); admSfx("open"); setInside(true); }} />;
  const signOut = async () => { try { await admApi("/admin/logout", { body: {} }); } catch (e) {} admSetToken(""); admForget(); setMe(null); setInside(false); };
  const nav = NAV.map(([g, items]) => [g, items.filter(([id]) => allowed(me, id))]).filter(([, items]) => items.length);
  return (
    <div className={"adm" + (menu ? " is-menu" : "")} data-mood={admMood(sec)}>
      <aside className="adm-side">
        <div className="adm-side__brand"><AdmLogo size={34} /><b>Admin</b>{!DEMO && <a href="/" target="_blank" rel="noreferrer">View site ↗</a>}</div>
        {me && <button type="button" className="adm783-who adm784-who" onClick={() => go("account")}><AdmFace user={me.user} size={38} ring /><span><b>{me.user.name}</b><small>{me.roleName}</small></span></button>}
        <nav aria-label="Admin sections">
          {nav.map(([g, items]) => (
            <div key={g} className="adm-side__g"><small>{g}</small>
              {items.map(([id, l, ic]) => <a key={id} href={"/admin" + (id ? "/" + id : "")} className={sec === id ? "is-on" : ""} aria-current={sec === id ? "page" : undefined} onClick={(e) => { e.preventDefault(); go(id); }}><i aria-hidden="true">{ic}</i>{l}</a>)}
            </div>
          ))}
        </nav>
        <AdmSwitches />
        <AdmBtn kind="ghost" onClick={signOut}>Sign out</AdmBtn>
      </aside>
      <button className="adm-burger" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-label="Menu">☰</button>
      <main className="adm-main" key={sec} data-mood={admMood(sec)}>
        {draft && <p className="adm-status adm783-draft" role="status">Sent for approval: your change is saved as a draft and goes live when a colleague with the Approve right publishes it. <a href="/admin/approvals" onClick={(e) => { e.preventDefault(); setDraft(null); go("approvals"); }}>Follow it in Approvals</a></p>}
        {sec && sec !== "account" && (() => { for (const [g, items] of NAV) for (const [id, l] of items) if (id === sec) return <AdmAreaHero mood={admMood(sec)} group={g} label={l} sec={sec} />; return null; })()}
        {me && !allowed(me, sec) ? <p className="adm-status is-err">Your role does not include this section. Ask your Super Admin if you need it.</p> : section(sec, go)}
      </main>
      {stepUp}
    </div>
  );
}

export { AdminApp };
