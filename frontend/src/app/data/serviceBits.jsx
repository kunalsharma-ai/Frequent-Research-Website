/* build 74: small service facts the home page, the chat and the service pages share, kept apart from the pages
   themselves so the home page does not load every service page */
import { VERTICALS } from './site.jsx';

const SERVICE_COUNT = VERTICALS.reduce((t, e) => t + e.services.length, 0);
function serviceFaqs(t, e) {
  const lc = (x) => x.replace(/[A-Za-z][A-Za-z0-9&/.-]*/g, (w) => (/[A-Z].*[A-Z]/.test(w) ? w : w.toLowerCase())),
    a = lc(e.name);
  return [
    {
      q: `What is included in your ${e.name} service?`,
      a: `${e.summary} A typical engagement covers ${lc(e.includes.slice(0, -1).join(", "))} and ${lc(e.includes[e.includes.length - 1])}. We tailor the scope to your goals after a short discussion.`,
    },
    {
      q: `How long does a ${a} project take?`,
      a: `${t.timeline}. We share a clear timeline with your proposal.`,
    },
    {
      q: `How much does ${a} cost?`,
      a: `Pricing depends on scope, volume and timelines. Share your requirement and we will send a clear quote${t.slug === "market-research" ? " with feasibility" : ""}, usually within one working day. There is no charge for the first consultation.`,
    },
    {
      q: `Who will work on my ${a} project?`,
      a: `Our ${t.name} team: ${t.team.roles.slice(0, 3).join(", ").toLowerCase()} and more, led by a single point of contact who stays with you from start to finish.`,
    },
    {
      q: `Do you offer ${a} for my industry?`,
      a: "Yes. We work across agriculture, manufacturing, healthcare & pharma, BFSI, automotive, technology, retail, education, energy and more. Tell us your sector and we will share relevant experience.",
    },
    ...t.faqs,
  ];
}
const SERVICE_INDUSTRIES = [
  "agriculture",
  "manufacturing",
  "automotive",
  "pharmaceutical",
  "healthcare",
  "financial-services",
  "food",
  "retail",
  "it",
  "telecommunications",
  "energy",
  "education",
  "real-estate",
  "government",
  "fashion",
  "mass-media",
];
export { SERVICE_COUNT, SERVICE_INDUSTRIES, serviceFaqs };
