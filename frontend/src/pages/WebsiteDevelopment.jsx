/*
 * Website Development — /services/it-development/website-development (URL unchanged)
 * Business-first technology page (build 33) on TX_Page. USP: the website as a digital business experience.
 * Signature visual: TXV_Website (Page → Experience → Business interface).
 * Kept from build 30: conversion anatomy, technology ecosystem selector, CMS workflow, the existing form.
 * No case study, no team details, no example boxes, no invented scores or guarantees.
 */
import * as ee from 'react';
import { DM_Form, ppIt } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Flow } from '../components/dm/kit.jsx';
import { DK_Anatomy, DK_Guide } from '../components/dm/kit2.jsx';
import { DK3_Tech } from '../components/dm/kit3.jsx';
import { TXV_Website, TX_Page, TX_Value } from '../components/dm/itkit.jsx';

const WD_URL = "/services/it-development/website-development";

const WD_TITLE = "Website Development Services | Frequent Research";

const WD_FORM = "wd-project";

const WD_FAQ = [
  ["How should a business website connect with CRM, analytics or other systems?", "Start from what should happen after a visitor acts: where an enquiry goes, who follows up and what needs measuring. Forms, CRM, booking, payments, analytics and marketing tools are then connected through their supported APIs or integrations, so the website feeds the business instead of creating another inbox."],
  ["How do you approach performance and accessibility?", "Both are designed in, not checked at the end: optimised images, efficient JavaScript, caching and Core Web Vitals considerations for performance, and WCAG-conscious design — keyboard access, contrast, focus states, accessible forms — for accessibility. Specific scores are never promised before they are measured."],
  ["Can an existing website be modernised instead of rebuilt?", "Often, yes. If the platform and content structure are sound, a redesign, performance work or new integrations may achieve more than a rebuild. A rebuild makes sense when the platform itself limits what the business needs."],
  ["Can you redesign my website without losing search visibility?", "A redesign should protect what already works: existing URLs are mapped, 301 redirects planned, metadata preserved and search performance monitored after launch."],
  ["How should a website be prepared for future functionality?", "By choosing a CMS and architecture that fit today's needs while leaving room for what is likely next — e-commerce, portals, integrations or AI-assisted search — without over-engineering for features that may never be needed."],
  ["Should I choose WordPress, Shopify or custom development?", "It depends on what the website must do. WordPress suits content-led sites that are edited often, Shopify suits product catalogues and online selling, and custom development suits unusual workflows, integrations or performance needs."],
  ["Where can AI genuinely add value on a website?", "Intelligent search, content assistance for editors, support journeys and analytics insights are common candidates. Each AI feature is planned with clear data boundaries and human review."],
  ["How much does website development cost?", "Cost depends on templates, custom functionality, CMS, integrations, content, languages and support needs, so a scoped estimate follows a short discovery rather than a generic price list."],
  ["Who owns the website after launch?", "Ownership of code, content, domains and accounts is set out in the project agreement. Holding your own domain, hosting and key accounts is recommended."],
];

const WD_CFG = {
  key: "wd",
  pfx: "wd",
  slug: "website-development",
  url: WD_URL,
  title: WD_TITLE,
  maTitle: "Website Development Services",
  desc: "Website development built around how the business works: clear journeys, connected CRM and analytics, performance, accessibility and room to grow.",
  crumb: "Website Development",
  name: "Website Development",
  serviceType: "Website development",
  schemaDesc:
    "Business-first website development: digital business experience, information architecture, UX, CMS, front-end and back-end development, CRM and analytics integration, performance, accessibility, security, AI-assisted search and content operations, and post-launch evolution.",
  formId: WD_FORM,
  hero: {
    kicker: "Digital business experience",
    h1: "Website Development",
    tag: "Build a Website That Works as Hard as Your Business Does.",
    lead: "Your website should not simply represent the company. It should help people understand, navigate, trust and interact with the business — and connect to the systems that act on what they do.",
    cta: "Discuss Your Website",
    cta2: "Explore Our Approach",
    trust: ["Business-first", "Connected to CRM & analytics", "Performance-minded", "WCAG-conscious", "AI where useful"],
    vis: <TXV_Website />,
  },
  statement: "A website is not a brochure. It is the front door to how the business works.",
  statementFlow: ["Discovery", "Communication", "Conversion", "Content", "Customer interface", "Integration", "Data"],
  caps: [
    ["Business Websites", "globe"],
    ["CMS & Content", "file"],
    ["UX & Information Architecture", "compass"],
    ["Front-end Development", "grid"],
    ["Integrations", "layers"],
    ["Performance", "rocket"],
    ["Accessibility", "users"],
    ["Analytics", "bars"],
  ],
  problem: {
    title: "When the Website Only Looks the Part",
    sub: "Most websites don't fail on design. They fail because they aren't built around what visitors and the business need to happen.",
    items: [
      ["Pretty but unclear", "Visitors can't tell quickly what the business does or who it's for.", "help"],
      ["Disconnected from the business", "Enquiries land in an inbox; nothing reaches the CRM or the right person.", "layers"],
      ["Slow and fragile", "Heavy pages and plugins that break with every update.", "clock"],
      ["Hard to change", "Simple content updates need a developer.", "file"],
      ["Built for one screen", "Navigation and forms that fight the user on mobile.", "phone"],
      ["No idea what works", "Analytics missing or never turned into decisions.", "bars"],
    ],
  },
  diff: {
    title: "A Website Built Around the Business, Not Just the Brand",
    sub: "What changes when a website is treated as a digital business experience.",
    items: [
      ["Business-first engineering", "flag", "The project starts with what the website must make possible — enquiries, bookings, sales, support, recruitment — before any template is chosen.", "Design and technology effort goes where it moves the business."],
      ["Experience + engineering", "compass", "Information architecture, content hierarchy and performance are planned together, so the experience and the build support each other.", "Visitors find what they need without fighting the interface."],
      ["Integration-aware development", "layers", "Forms, CRM, analytics, booking, payments and marketing tools are considered from the start, not bolted on after launch.", "Every action on the website reaches the system that acts on it."],
      ["Right-sized architecture", "sliders", "WordPress, Shopify, headless or custom — the platform follows the requirement, not habit or fashion.", "No paying for complexity the business doesn't need."],
      ["Build beyond launch", "refresh", "Launch is planned as the start of measuring, learning and improving the website.", "The website keeps up as the business changes."],
    ],
  },
  shift: {
    title: "From a Set of Pages to a Business Interface",
    sub: "What changes when the website is built around how the business works.",
    before: ["Brochure pages", "Generic contact form", "Manual follow-up", "Slow, heavy pages", "No reliable data"],
    after: ["Clear journeys for each audience", "Forms routed to the right system", "Connected CRM and analytics", "Fast, accessible experience", "Behaviour you can learn from"],
    chain: ["Discover", "Understand", "Trust", "Act", "Connect", "Learn"],
  },
  capabilities: {
    title: "What Website Development Can Cover",
    sub: "Each capability earns its place by what it makes possible.",
    layers: [
      ["UX & information architecture", "compass", ["Sitemaps", "User journeys", "Content hierarchy"], "Visitors understand the offer and find their next step faster."],
      ["Design & front-end", "grid", ["Responsive layouts", "Design systems", "React / Next.js where suitable"], "A consistent experience on every device, easier to extend later."],
      ["CMS & content operations", "file", ["WordPress", "Headless CMS", "Roles and approvals"], "Content changes don't wait for a developer."],
      ["Integrations", "layers", ["CRM", "Forms", "Booking", "Payments", "Marketing tools"], "Website actions reach the systems that act on them."],
      ["Performance", "rocket", ["Image optimisation", "Caching", "Core Web Vitals considerations"], "Pages load quickly enough that people stay."],
      ["Technical SEO foundations", "search", ["Crawlable structure", "Metadata", "Structured data", "Redirect planning"], "Search engines can understand and index the site."],
      ["Security & hosting", "shield", ["HTTPS", "Hardening", "Backups", "Updates"], "Lower risk to data, uptime and reputation."],
      ["Analytics", "bars", ["GA4 and tag setup", "Event tracking", "Dashboards"], "Decisions based on what visitors actually do."],
    ],
  },
  loop: {
    title: "How a Website Gets Built Around the Business",
    texts: [
      "Understand what the website must make possible, who it serves and what happens after a visitor acts.",
      "Design journeys, content hierarchy and the technical direction together.",
      "Engineer a fast, accessible, maintainable website on the platform that fits.",
      "Connect forms, CRM, analytics, booking, payments and other systems.",
      "Add intelligence — search, content assistance, insights — only where it helps.",
      "Measure what visitors do and where journeys break.",
      "Evolve content, features and integrations as the business changes.",
    ],
  },
  ai: {
    sub: "AI on a website should remove friction for visitors or editors — not decorate the homepage.",
    ai: [
      ["Intelligent search", "Visitors find answers in their own words."],
      ["Content assistance", "Editors get drafts and summaries to review."],
      ["Support journeys", "Common questions answered, with a route to a person."],
      ["Personalisation", "Relevant content where data and consent allow."],
      ["Analytics insights", "Patterns in behaviour surfaced for review."],
    ],
  },
  integrate: {
    title: "A Website Rarely Works Alone",
    sub: "Connect the systems the business already relies on instead of creating another isolated channel.",
    center: "Website",
    nodes: [
      ["CRM", "database", "Enquiries become records with an owner and a follow-up, not emails that get lost."],
      ["Forms", "clipboard", "Validated, spam-protected forms routed to the right place."],
      ["Analytics", "bars", "Events and journeys tracked so the website can be improved with evidence."],
      ["Booking", "clock", "Appointments and demos booked without back-and-forth."],
      ["Payments", "shield", "Secure payment providers connected through their supported integrations."],
      ["Marketing tools", "megaphone", "Email, automation and ad platforms receive the right signals."],
      ["E-commerce", "tag", "Catalogue and checkout where selling online is part of the job."],
    ],
    note: "Integrations depend on the APIs and plans each platform supports.",
  },
  assure: {
    title: "Performance, Accessibility and Security Are Part of the Experience",
    tabs: [
      ["Performance", "rocket", "Performance is part of the product experience", "cols", [["Experience", ["Responsive UI", "Optimised images", "Efficient JavaScript", "Loading states", "Core Web Vitals considerations"]], ["Engineering", ["Caching", "CDN", "Efficient queries", "Lean plugins and scripts", "Monitoring"]]], "No specific performance score is promised before it is measured."],
      ["Accessibility", "users", "WCAG-conscious design", "chips", [["Keyboard", "grid"], ["Contrast", "eyeoff"], ["Focus", "target"], ["Forms", "clipboard"], ["Screen readers", "msg"], ["Reduced motion", "sliders"], ["Error states", "flag"]], "Designed with WCAG in mind; certification is not claimed."],
      ["Security", "shield", "Security should be part of the build", "layers", ["HTTPS", "Access control", "Form protection", "Plugin and dependency updates", "Backups", "Monitoring"], "No website is completely secure; risk is reduced through design and maintenance."],
    ],
  },
  evolve: {
    sub: "A website keeps working for the business only if it keeps improving.",
    areas: ["Content updates", "Security and dependency updates", "Performance tuning", "New integrations", "New sections and features", "Analytics reviews"],
  },
  why: {
    title: "Why This Approach Matters",
    items: [
      ["The website has a job", "Every page is designed around what it should make possible.", "target"],
      ["Connected, not isolated", "Actions reach CRM, analytics and the right people.", "layers"],
      ["The platform fits the need", "No unnecessary complexity — or limits.", "sliders"],
      ["Fast and accessible", "Experience quality designed in from the start.", "rocket"],
      ["Easy to run", "Content and approvals the business controls.", "file"],
      ["Built to evolve", "Room for commerce, portals or AI later.", "refresh"],
    ],
  },
  related: {
    title: "Where a Website Connects Next",
    sub: "Most websites grow into other digital products.",
    links: [
      ["Web Application Development", "When the website needs portals, dashboards or workflows behind a login.", ppIt("web-application-development"), "it"],
      ["E-commerce Development", "When selling online becomes part of the website's job.", ppIt("e-commerce-development"), "it"],
      ["Mobile App Development", "When customers need a dedicated mobile experience.", ppIt("mobile-app-development"), "it"],
      ["Data Analytics & Dashboard Development", "Turn website and business data into dashboards.", ppIt("data-analytics-and-dashboard-development"), "data"],
      ["Website Maintenance & Support", "Keep the website secure, fast and up to date.", ppIt("website-maintenance-and-support"), "it"],
    ],
  },
  faq: WD_FAQ,
  faqTitle: "Website Development: Questions Worth Asking",
  final: {
    sigText: "A website built around business requirements, user experience and the systems that keep it moving.",
    title: "Have a Website Requirement That Needs More Than a Redesign?",
    text: "Tell us what the website needs to make possible, who it serves and which systems it should connect to. We'll help shape the right direction.",
  },
};

function WD_Page() {
  return (
    <TX_Page
      c={{
        ...WD_CFG,
        visuals: (
          <>
            <TX_Value
              id="wd-do-h"
              kicker="What a website should do"
              title="A Website Should Do More Than Look Good."
              sub="Six jobs a business website does. Select one to see what it means."
              tone="light"
              items={[
                ["Discover", "search", "Help people find the business — in search, from ads and through referrals."],
                ["Understand", "bulb", "Make the value proposition clear within seconds."],
                ["Trust", "shield", "Create confidence through clarity, proof and a reliable experience."],
                ["Act", "target", "Guide visitors toward meaningful actions — enquire, book, buy, apply."],
                ["Connect", "layers", "Pass those actions to CRM, booking, payments or other systems."],
                ["Learn", "bars", "Understand digital behaviour through appropriate analytics."],
              ]}
            />
                  <DK_Anatomy
        id="wd-anat-h"
        pageLabel="Page structure"
        kicker="Conversion anatomy"
        title="Every Section of a Page Has a Job"
        sub="Select a block to see the question it answers for a visitor."
        blocks={[
          ["Header & navigation", "Orientation", "Where am I, and where can I go?", "grid", "lg"],
          ["Hero", "Relevance", "Is this for me?", "target", "lg"],
          ["Proof", "Trust", "Can I believe them?", "shield", "sm"],
          ["Services", "Fit", "Do they do what I need?", "layers", "sm"],
          ["Process", "Confidence", "What happens if I go ahead?", "refresh", "sm"],
          ["FAQ", "Objections", "What about my concern?", "help", "sm"],
          ["Call to action", "Action", "What do I do next?", "arrow", "lg"],
        ]}
      />
          </>
        ),
        after: (
          <>
                  <DK_Flow
        id="wd-cms-h"
        tone="off"
        kicker="CMS workflow"
        title="Content Stays Under the Business's Control"
        steps={["Draft", "Add media", "Preview", "Review", "Approve", "Publish", "Measure"]}
        after={<p className="dk-note">Roles and approvals can be set so the right people review before anything goes live.</p>}
      />
                  <DK3_Tech
        id="wd-tech-h"
        kicker="Technology ecosystem"
        title="Technology Should Serve the Requirement"
        sub="Select a requirement to see the kind of technology that usually fits."
        groups={[
          ["CMS & platforms", ["WordPress", "Shopify", "WooCommerce", "Headless CMS", "Custom CMS"]],
          ["Front-end", ["HTML & CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"]],
          ["Back-end", ["PHP", "Node.js", "Laravel", "REST APIs", "GraphQL"]],
          ["Infrastructure", ["Managed hosting", "Cloud hosting", "CDN", "Caching", "Backups"]],
          ["Measurement", ["Google Analytics 4", "Tag Manager", "Search Console", "Heatmaps", "Consent tools"]],
        ]}
        needs={[
          ["Content-led business site", ["WordPress", "HTML & CSS", "PHP", "Managed hosting", "CDN", "Google Analytics 4", "Search Console"], "Content is edited often, so editor experience and SEO matter most."],
          ["Online store", ["Shopify", "WooCommerce", "JavaScript", "CDN", "Google Analytics 4", "Tag Manager"], "Catalogue, checkout and payments come first; the platform choice depends on scale and control."],
          ["High-performance marketing site", ["Headless CMS", "React", "Next.js", "Tailwind CSS", "CDN", "Caching", "Google Analytics 4"], "Speed and flexibility across many landing pages."],
          ["Custom functionality", ["Custom CMS", "React", "Node.js", "Laravel", "REST APIs", "Cloud hosting", "Backups"], "Unique workflows or integrations a theme can't handle."],
        ]}
        note="Common choices, not a fixed stack — confirmed after understanding the requirement. No partnerships are implied."
      />
          </>
        ),
        guideNode:       <DK_Guide
        id="wd-guide-h"
        title="Website Development for Businesses: How to Plan, Build and Launch a Website That Works"
        cover={["Guide", "Website Development", "Plan · Build · Launch"]}
        topics={["Setting goals", "Discovery and sitemap", "Choosing a platform", "Design and content", "SEO and performance", "Launch and after"]}
        to="/blog/website-development-guide"
      />,
        formNode:       <DM_Form
        id={WD_FORM}
        kicker="Website project"
        title="Discuss Your Website"
        sub="A few quick questions help us understand the requirement and recommend the right next step."
        type="Website Development Enquiry"
        service="Website Development"
        icon="globe"
        submitLabel="Discuss My Website"
        successTitle="Thank you. Your website project request has been sent."
        siteLabel="Current website URL (optional)"
        msgLabel="Project details (optional)"
        msgPh="Pages, features, integrations, timelines — whatever you know so far"
        nextSteps={["We review your requirement and current website.", "We contact you within one working day.", "You get a clear recommended next step."]}
        chips={[
          { k: "build", t: "Build", q: "What do you need?", label: "Build type", options: ["New website", "Redesign", "E-commerce website", "WordPress website", "Shopify store", "Custom website", "Speed / performance fix", "Website audit", "Not sure yet"] },
          { k: "goal", t: "Goal", q: "What's the main goal?", label: "Goal", multi: true, options: ["More enquiries", "Sell online", "Build credibility", "Better SEO", "Faster website", "Easier content updates", "Integrate tools", "Support a launch"] },
          { k: "industry", t: "Industry", q: "Your industry", label: "Industry", options: ["Healthcare", "Manufacturing", "Financial services", "Education", "Real estate", "Retail / D2C", "Technology", "Professional services", "Other"] },
          { k: "budget", t: "Budget", q: "Budget (optional)", label: "Budget", optional: true, options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { WD_Page };
