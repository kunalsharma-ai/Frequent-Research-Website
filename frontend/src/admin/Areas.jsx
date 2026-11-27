/* Build 78.4: every admin area has its own look. A banner at the top of each section with the area's own colours,
 * title font, a short line on what the section is for, and a small animated scene that belongs to that area:
 *   overview  live bars           website  a browser window building itself    content  pages fanning out in 3D
 *   inbox     ripples and letters marketing rising sparks and a megaphone       people   orbiting faces
 *   system    a circuit with running light                                      access   a shield with turning locks
 * Colours, fonts and art: styles/admin783.css (".adm784-area"). Calm palette tones, one family per area. */
import * as ee from 'react';
import { AdmImportButton } from './Import.jsx';
import { Activity, Briefcase, Cpu, Globe, Inbox, Megaphone, PenLine, ShieldCheck } from 'lucide-react';

const AREAS = {
  overview: { icon: Activity, tag: "Numbers that move with the website" },
  website: { icon: Globe, tag: "Build and shape the pages people visit" },
  content: { icon: PenLine, tag: "Stories, people and proof that fill the site" },
  inbox: { icon: Inbox, tag: "Every enquiry, chat and review in one place" },
  marketing: { icon: Megaphone, tag: "Reach people by email, social media and AI" },
  people: { icon: Briefcase, tag: "Team, careers and the people behind Frequent Research" },
  system: { icon: Cpu, tag: "Connections, files and everything under the hood" },
  access: { icon: ShieldCheck, tag: "Who may do what, safely" },
};

// one line per section
const TIPS = {
  visits: "Page views, visitors and where they came from.", activity: "Every sign-in and change, with who, what and when.",
  leads: "Enquiries, RFQs, downloads and job applications: assign, follow up, export.", contacts: "Everyone who wrote to you, and how each form is doing.",
  "client-onboarding": "Every new client: company, tax, contacts, MSAs, documents, POC and renewals. Edit anything, and change the form itself.",
  "page-videos": "Every website page with its video and a video design made for that page: link, title, description, design, icons, flags and custom fields.",
  leadership: "The messages from Manish, Sachin and Devashish: names, roles, photos and every paragraph.",
  "home-stats": "The four numbers on the home page and the labels under them.",
  design79: "The big headings, intro texts and buttons of the home and platform heroes.",
  "onboarding-links": "Where the website sends new clients and vendors: the two form addresses and the texts on their cards.",
  "vendor-onboarding": "Every new vendor: profile, capabilities, tax, bank, agreements, documents and renewals. Edit anything, and change the form itself.",
  chat: "Talk to visitors live, and read past conversations.", reviews: "Approve or hide the reviews visitors leave.",
  pages: "Every page and its sections: add, hide, reorder, edit.", "new-pages": "Make a brand-new page from ready sections.",
  menus: "The header and footer menus.", edit: "Click any text on a page and change it in place.", logos: "Every logo on the site.",
  legal: "Privacy, terms, cookies and other policies.", seo: "Titles, descriptions, sharing cards, schema and redirects.",
  settings: "Banners, switches and site-wide settings.", contact: "Phone, email, address, WhatsApp and social links.",
  team: "The people on the Our team page.", testimonials: "Client quotes shown across the site.", blogs: "Every blog post, from idea to published.",
  cards: "How blog and case study cards look.", cases: "Case studies by industry.", products: "The Sampledge products and their pages.",
  portals: "MyFrequentRewards, MyHealthOpinions and the other panel portals.", careers: "Departments, open roles and the application form.",
  downloads: "Brochures and documents visitors can download.", certifications: "ISO and other certificates.", associations: "ESOMAR, MSME and other memberships.",
  af: "Accounts & Finance services and prices.", panels: "Panel numbers for every country.", pdfs: "PDF documents and panel books.",
  forms: "Every form and its fields.", videos: "The video on each page.", celebrations: "Festival banners through the year.", gallery: "Photos from events and the office.",
  emails: "Email templates in the Frequent Research style.", automations: "Emails that go out by themselves after a form.",
  newsletters: "Newsletters to your contact lists.", social: "Plan and post to Facebook, Instagram, LinkedIn and X.", ai: "Draft blogs, emails and posts with AI.",
  api: "Every Frequent Research API: live status, what each one does, and Try it.",
  sampforce: "Every lead and enquiry to the Sampforce sales app: API keys and webhook.", keys: "Email, AI, social media and SampCrew keys, saved encrypted.", files: "Pictures, logos, videos and documents.", content: "Every content key, for experts.",
  approvals: "Changes waiting for review, and their history.", users: "Invite admins, change roles, suspend or reset access.", roles: "What each role may do, area by area.",
};

function Art({ mood }) {
  const n = (k) => Array.from({ length: k }, (_, i) => i);
  if (mood === "website") return <div className="a4-art a4-web"><div className="a4-web__win"><i className="a4-web__bar"><b /><b /><b /></i>{n(4).map((i) => <i key={i} className="a4-web__blk" style={{ "--i": i }} />)}</div></div>;
  if (mood === "content") return <div className="a4-art a4-doc">{n(4).map((i) => <i key={i} className="a4-doc__p" style={{ "--i": i }}><b /><b /><b /></i>)}</div>;
  if (mood === "inbox") return <div className="a4-art a4-rip">{n(3).map((i) => <i key={i} className="a4-rip__r" style={{ "--i": i }} />)}{n(4).map((i) => <i key={"m" + i} className="a4-rip__m" style={{ "--i": i }} />)}</div>;
  if (mood === "marketing") return <div className="a4-art a4-mk">{n(9).map((i) => <i key={i} className="a4-mk__s" style={{ "--i": i, "--x": ((i * 37) % 90) + "%" }} />)}</div>;
  if (mood === "people") return <div className="a4-art a4-ppl"><i className="a4-ppl__o" />{n(5).map((i) => <i key={i} className="a4-ppl__f" style={{ "--i": i }} />)}</div>;
  if (mood === "system") return <div className="a4-art a4-sys"><svg viewBox="0 0 200 120" aria-hidden="true"><path className="a4-sys__w" d="M10 20H70V60H130V20H190M10 100H50V60M150 60V100H190M100 60V110" /><path className="a4-sys__run" d="M10 20H70V60H130V20H190M10 100H50V60M150 60V100H190M100 60V110" pathLength="1" />{[[70, 60], [130, 60], [50, 60], [150, 60], [100, 60]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4" className="a4-sys__n" style={{ "--i": i }} />)}</svg></div>;
  if (mood === "access") return <div className="a4-art a4-acc"><i className="a4-acc__r" /><i className="a4-acc__r a4-acc__r--2" /><i className="a4-acc__k" /></div>;
  return <div className="a4-art a4-ov">{n(9).map((i) => <i key={i} style={{ "--i": i }} />)}</div>;
}

function AdmAreaHero({ mood, group, label, sec }) {
  const A = (/-onboarding$/.test(sec || "") ? { ...AREAS.inbox, tag: "New clients and vendors, from first form to renewal" } : AREAS[mood]) || AREAS.overview, Icon = A.icon;
  return (
    <header className="adm784-area" data-area={mood}>
      <div className="adm784-area__bg" aria-hidden="true"><i /><i /><i /></div>
      <span className="adm784-area__ic" aria-hidden="true"><Icon size={26} /></span>
      <div className="adm784-area__t">
        <small>{group} · {A.tag}</small>
        <h2>{label}</h2>
        {TIPS[sec] && <p>{TIPS[sec]}</p>}
        <AdmImportButton />
      </div>
      <Art mood={mood} />
    </header>
  );
}

export { AdmAreaHero };
