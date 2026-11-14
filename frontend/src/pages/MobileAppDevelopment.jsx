/*
 * Mobile App Development — /services/it-development/mobile-app-development (URL unchanged)
 * Business-first technology page (build 33) on TX_Page. USP: experience built around the moment of use.
 * Signature visual: TXV_Mobile (Open → Authenticate → Discover → Act → Confirm → Notify → Return, with Mobile → API → Backend → Data → Analytics).
 * Kept from build 30: offline split, notification rules, approach decision tree, the existing form.
 * No case study, no team details, no example boxes, no app-store approval or performance guarantees.
 */
import * as ee from 'react';
import { DM_Form, ppIt } from '../components/dm/shared.jsx';
import { DK_Guide, DK_Signals, DK_Split, DK_Tree } from '../components/dm/kit2.jsx';
import { TXV_Mobile, TX_Page } from '../components/dm/itkit.jsx';

const MB_URL = "/services/it-development/mobile-app-development";

const MB_TITLE = "Mobile App Development Services | Frequent Research";

const MB_FORM = "mb-project";

const MB_FAQ = [
  ["When does a business actually need a mobile app?", "When people need to do something repeatedly, on the move, at a specific moment — check in, capture, track, order, approve — or when device capabilities such as notifications, camera, location or offline access genuinely matter. If use is occasional and mostly reading, a responsive website or web app may be enough."],
  ["Can a mobile app connect to an existing backend?", "Yes. Apps can use existing APIs and systems — CRM, ERP, payment, booking and others — or new APIs can be built where the backend doesn't yet expose what the app needs."],
  ["How do you approach offline functionality?", "Only where the use case needs it. Offline-first design stores data locally, queues changes on the device and syncs when a connection returns, with clear rules for conflicts. It is planned from the start because it is hard to add later."],
  ["Can the same product support web and mobile experiences?", "Yes. A shared backend and API can serve a web application and mobile apps, each designed for how people use that device, so business logic and data stay consistent."],
  ["Should I choose native or cross-platform?", "Cross-platform frameworks such as Flutter or React Native suit many business apps and share one codebase. Native development suits apps that rely heavily on device hardware, complex graphics or platform-specific behaviour."],
  ["Can you guarantee app store approval?", "No one can — Apple and Google make those decisions. Apps are built to their published guidelines and submissions are prepared carefully to reduce the risk of rejection."],
  ["How much does mobile app development cost?", "It depends on platforms, screens, features, integrations, offline needs, security and support, so an estimate follows discovery rather than a generic price."],
  ["Who owns the app and source code?", "Ownership depends on the project agreement. It is recommended that your organisation holds the app store developer accounts and agrees code ownership upfront."],
];

const MB_CFG = {
  key: "mb",
  pfx: "mb",
  slug: "mobile-app-development",
  url: MB_URL,
  title: MB_TITLE,
  maTitle: "Mobile App Development Services",
  desc: "Mobile app development designed around the moment of use: focused journeys, secure APIs, notifications, offline where needed and analytics after launch.",
  crumb: "Mobile App Development",
  name: "Mobile App Development",
  serviceType: "Mobile app development",
  schemaDesc:
    "Business-first mobile app development: moment-of-use experience design, Android and iOS, cross-platform (Flutter, React Native) and native options, authentication, notifications, device capabilities, offline support, secure API connectivity, backend integration, mobile analytics and post-launch evolution.",
  formId: MB_FORM,
  hero: {
    kicker: "Experience built around the moment of use",
    h1: "Mobile App Development",
    tag: "Mobile Shouldn't Be a Smaller Website. It Should Be a Better Experience.",
    lead: "Mobile products work best when the experience is designed around the moments, tasks and contexts in which people actually use them — and connected to the systems that make each task possible.",
    cta: "Discuss Your Mobile App",
    cta2: "Explore Our Approach",
    trust: ["Android & iOS", "Cross-platform", "Secure APIs", "Offline where needed", "AI where useful"],
    vis: <TXV_Mobile />,
  },
  statement: "People don't open an app to browse a company. They open it to get something done.",
  statementFlow: ["Open", "Authenticate", "Discover", "Act", "Confirm", "Notify", "Return"],
  caps: [
    ["Android & iOS", "phone"],
    ["Flutter / React Native", "layers"],
    ["Mobile UX", "compass"],
    ["Push Notifications", "msg"],
    ["Offline Support", "refresh"],
    ["Secure APIs", "shield"],
    ["Backend Integration", "database"],
    ["Mobile Analytics", "bars"],
  ],
  problem: {
    title: "When an App Is Just the Website, Smaller",
    sub: "Most mobile apps don't fail on features. They fail because they ignore when, where and why people use them.",
    items: [
      ["Desktop thinking on a phone", "Long forms and dense screens in a moment that needs one action.", "phone"],
      ["Too many steps", "The core task is buried behind menus and onboarding.", "clock"],
      ["Notifications that nag", "Alerts that aren't relevant get every notification turned off.", "msg"],
      ["Breaks without signal", "Field users lose work when the connection drops.", "refresh"],
      ["Disconnected from the backend", "The app can't see the data people need.", "database"],
      ["No idea how it's used", "Launch happens; learning doesn't.", "bars"],
    ],
  },
  diff: {
    title: "Mobile Experiences Designed for the Moment, Not the Menu",
    sub: "What changes when a mobile app is designed around the moment of use.",
    items: [
      ["Product thinking before code", "compass", "The moments that matter are identified first — who uses the app, where, how often and for what task.", "Every screen supports a real job, so people come back."],
      ["Experience + engineering", "phone", "Mobile UX, performance and device capabilities are designed together: one primary action per screen, permissions only when needed.", "Faster task completion with less friction."],
      ["Right-sized architecture", "sliders", "Cross-platform, native or a progressive web app — chosen by features, users and long-term maintenance, not trend.", "The right investment for the experience required."],
      ["Integration-aware development", "layers", "The app is designed with its API, backend, data and analytics, not as a standalone front end.", "Mobile actions update the systems the business runs on."],
      ["Build beyond launch", "refresh", "Store releases, OS updates, analytics and feedback are planned from day one.", "The app stays compatible, useful and improving."],
    ],
  },
  shift: {
    title: "Many Mobile Experiences. One Connected Foundation.",
    sub: "Different apps for different moments — all connected through the same API, backend, data and analytics.",
    before: ["Customer app", "Employee app", "Field app", "Service app", "Commerce app", "Partner app"],
    after: ["API", "Backend", "Data", "Analytics", "Security", "Notifications"],
    chain: ["Mobile", "API", "Backend", "Data", "Analytics"],
    kicker: "Business value",
    beforeLabel: "Mobile experiences",
    afterLabel: "Connected foundation",
  },
  capabilities: {
    title: "What Mobile App Development Can Include",
    sub: "Capabilities are chosen for the moment of use — not added because they are available.",
    layers: [
      ["Mobile-first UX", "compass", ["Task-focused journeys", "Onboarding", "Accessible design"], "People complete the core task quickly."],
      ["Authentication", "shield", ["Secure sign-in", "Biometrics where supported", "Session handling"], "Access is safe without being a chore."],
      ["Push notifications", "msg", ["Event-based", "Preference-aware", "Deep links"], "Updates people value, not noise."],
      ["Device capabilities", "cpu", ["Camera", "Location", "Files", "Scanning where relevant"], "The phone does what a browser can't."],
      ["Offline support", "refresh", ["Local storage", "Sync queues", "Conflict rules"], "Work continues in low-signal conditions."],
      ["Mobile payments", "tag", ["Supported payment providers", "In-app purchase where relevant"], "Transactions inside the moment."],
      ["Secure API connectivity", "layers", ["REST / GraphQL", "Token security", "Backend integration"], "The app reaches the data and systems it needs."],
      ["Mobile analytics", "bars", ["Event tracking", "Crash reporting", "Funnels"], "Evidence for the next release."],
    ],
  },
  loop: {
    title: "How a Mobile Experience Gets Built",
    texts: [
      "Understand the users, the moments of use, the context and the business outcome the app supports.",
      "Design journeys, screens and the technical approach — cross-platform, native or web.",
      "Engineer the app and its API with performance and security in mind.",
      "Connect authentication, backend services, payments, notifications and data.",
      "Add intelligence — contextual assistance, smart notifications, document or image processing — where it helps.",
      "Measure usage, crashes, performance and task completion.",
      "Evolve with OS updates, feedback and new features.",
    ],
  },
  ai: {
    sub: "AI in a mobile app should make the moment of use easier.",
    ai: [
      ["Contextual assistance", "Help with the task the user is doing right now."],
      ["Intelligent notifications", "Surface events that matter to this user."],
      ["Image & document processing", "Capture, extract and classify from the camera."],
      ["Voice and natural language", "Where hands-free or quick input genuinely helps."],
      ["Usage insights", "Patterns in behaviour surfaced for product decisions."],
    ],
  },
  integrate: {
    title: "The App Is Only as Useful as What It Connects To",
    sub: "Mobile → API → Backend → Data → Analytics. Every step in the journey depends on the systems behind it.",
    center: "Mobile app",
    flow: ["Authenticate", "Request", "Process", "Store", "Notify", "Measure"],
    nodes: [
      ["API", "layers", "A secure, versioned API is the contract between the app and the business."],
      ["Backend", "cpu", "Business logic, rules and processing run server-side, not on the phone."],
      ["Identity", "shield", "Sign-in, tokens and permissions shared with web channels where needed."],
      ["Payments", "tag", "Payments through supported providers and app store rules."],
      ["Notifications", "msg", "Push messages triggered by real events and user preferences."],
      ["CRM / ERP", "database", "Customer, order and job data stays consistent with core systems."],
      ["Analytics", "bars", "Events, crashes and funnels feed product decisions."],
    ],
    note: "Integrations depend on the APIs and access each system supports.",
  },
  assure: {
    title: "Quality, Security and Performance on Real Devices",
    tabs: [
      ["Quality", "check", "Quality is built into the product lifecycle", "flow", ["Requirement", "UX validation", "Development", "Functional testing", "Device testing", "Integration testing", "Performance", "Security", "Accessibility", "Regression", "Store submission", "Monitoring"]],
      ["Security", "shield", "Security should be part of the architecture", "layers", ["Identity", "Authentication", "Authorization", "Secure storage", "API security", "Data protection", "Logging", "Monitoring", "Secure release"], "Risk is reduced through design and maintenance; no app is completely secure."],
      ["Performance", "rocket", "Performance is part of the product experience", "cols", [["Experience", ["Fast start", "Smooth navigation", "Loading and empty states", "Optimised images"]], ["Engineering", ["Efficient APIs", "Caching", "Background sync", "Crash monitoring"]]], "Performance is measured on real devices; no score is promised in advance."],
      ["Accessibility", "users", "WCAG-conscious mobile design", "chips", [["Screen readers", "msg"], ["Touch targets", "target"], ["Contrast", "eyeoff"], ["Dynamic text", "file"], ["Reduced motion", "sliders"], ["Error states", "flag"]], "Designed with accessibility guidelines in mind; certification is not claimed."],
    ],
  },
  evolve: {
    sub: "Mobile platforms change every year. The app has to keep moving with them.",
    areas: ["OS and device compatibility", "Bug fixes", "Security updates", "Store releases", "New features", "AI enhancements"],
  },
  why: {
    title: "Why This Approach Matters",
    items: [
      ["Built for the moment", "Each journey is designed around a real task.", "clock"],
      ["Honest platform advice", "Sometimes the answer isn't an app.", "help"],
      ["Connected foundation", "One API and backend across channels.", "layers"],
      ["Works in real conditions", "Offline and low-signal planned where needed.", "refresh"],
      ["Notifications with purpose", "Relevant, timely and easy to control.", "msg"],
      ["Launch is the start", "Analytics and releases keep it improving.", "bars"],
    ],
  },
  related: {
    title: "Where a Mobile App Connects Next",
    sub: "Mobile experiences are usually one part of a wider product.",
    links: [
      ["Web Application Development", "The web side of the same product and workflow.", ppIt("web-application-development"), "it"],
      ["API Development & Integration", "The APIs and backend the app depends on.", ppIt("api-development-and-integration"), "it"],
      ["SaaS Development", "When the app is part of a subscription product.", ppIt("saas-development"), "it"],
      ["UI/UX Design", "Journeys and interfaces designed for mobile.", ppIt("ui-ux-design"), "it"],
      ["Application Maintenance & Support", "Keep the app compatible and improving.", ppIt("application-maintenance-and-support"), "it"],
    ],
  },
  faq: MB_FAQ,
  faqTitle: "Mobile App Development: Questions Worth Asking",
  final: {
    sigText: "Mobile products built around the moment of use and connected to the systems behind it.",
    title: "Have a Mobile Idea That Needs More Than an App Store Listing?",
    text: "Tell us who will use it, when they'll use it and what it needs to connect to. We'll help shape the right mobile direction.",
  },
};

function MB_Page() {
  return (
    <TX_Page
      c={{
        ...MB_CFG,
        visuals: (
          <>
                  <DK_Tree
        id="mb-tree-h"
        kicker="Decision tree"
        title="Which Approach Fits Your App?"
        start="What does your app need most?"
        startIcon="phone"
        items={[
          ["Heavy use of device hardware, AR or complex graphics?", "Consider native development.", "cpu", "Native"],
          ["Same experience on Android and iOS, delivered efficiently?", "Cross-platform (Flutter or React Native).", "layers", "Cross-platform"],
          ["Mainly content and forms, used occasionally?", "A responsive web app or PWA may be enough.", "globe", "Web / PWA"],
        ]}
        end="Not sure? We'll recommend after discovery — sometimes the answer isn't an app."
      />
                  <DK_Split
        id="mb-off-h"
        kicker="Offline and low connectivity"
        title="Built for Real Network Conditions"
        states={[
          ["Online", "Connected", ["Data loads from the server", "Changes saved instantly", "Notifications arrive"], "The easy case."],
          ["Offline", "No signal — still working", ["Data available from local storage", "Changes queued on the device", "Sync when connection returns", "Conflicts handled by clear rules"], "The case that decides whether field users trust the app."],
        ]}
        caption="Offline-first design is planned from the start — it's hard to add later."
      />
          </>
        ),
        after: (
          <>
                  <DK_Signals
        id="mb-notif-h"
        label="Notification signals"
        tone="off"
        kicker="Notifications"
        title="Notifications That Help — Not Nag"
        engine="Notification rules"
        pipe={["Event", "Preference check", "Timing", "Channel", "Delivered"]}
        feed={[
          ["Appointment tomorrow", "clock", "Reminder sent at a sensible time"],
          ["Order shipped", "box", "Tracking link opens the right screen"],
          ["Task assigned", "check", "Field user alerted with job details"],
          ["Cart left behind", "tag", "One gentle reminder — if opted in"],
        ]}
      />
          </>
        ),
        guideNode:       <DK_Guide
        id="mb-guide-h"
        title="Mobile App Development: From Product Idea to Launch"
        cover={["Guide", "Mobile Apps", "Idea · Build · Launch"]}
        topics={["When you need an app", "Native vs cross-platform", "Designing the journey", "Testing and release", "After launch"]}
        to="/blog/mobile-app-development-guide"
      />,
        formNode:       <DM_Form
        id={MB_FORM}
        kicker="Mobile app project"
        title="Discuss Your Mobile App"
        sub="Six quick steps. We'll come back with questions, platform options and a recommended next step."
        type="Mobile App Development Enquiry"
        service="Mobile App Development"
        icon="phone"
        submitLabel="Discuss My Mobile App"
        successTitle="Thank you. Your app request has been sent."
        siteLabel="Current website or app URL (optional)"
        msgLabel="Your requirement (optional)"
        msgPh="Users, key features, integrations, timelines — whatever you know so far"
        nextSteps={["We review your app idea and current systems.", "We contact you within one working day.", "You get questions, platform options and a recommended next step."]}
        chips={[
          { k: "type", t: "Type", q: "What kind of app?", label: "App type", options: ["Customer app", "Field / workforce app", "Enterprise / internal app", "Healthcare app", "Commerce app", "Companion to a web platform", "New product / startup", "Improve an existing app"] },
          { k: "platform", t: "Platform", q: "Which platforms?", label: "Platform", options: ["Android", "iOS", "Both", "Not sure — advise me"] },
          { k: "problem", t: "Problem", q: "What should the app solve?", label: "Problem", multi: true, options: ["Faster buying / booking", "Paper-based field work", "Tools for staff on the move", "Customer self-service", "New product idea", "Existing app issues"] },
          { k: "systems", t: "Systems", q: "Which systems must it connect to?", label: "Current systems", text: true, optional: true, icon: "layers", ph: "e.g. existing website, CRM, ERP, payment gateway" },
          { k: "stage", t: "Stage", q: "Where is the project now?", label: "Project stage", options: ["Just an idea", "Requirements drafted", "Designs / prototype exist", "Existing app to improve", "Ready to start"] },
        ]}
      />,
      }}
    />
  );
}

export { MB_Page };
