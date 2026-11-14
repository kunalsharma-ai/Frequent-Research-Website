import * as ee from 'react';
import { Link } from 'react-router-dom';
import { PORTALS, VERTICALS } from '../data/site.jsx';
import { CAREERS, PRODUCTS, findVertical } from '../data/products.jsx';
import { PHONE_COUNTRIES } from '../data/phoneCountries.jsx';
import { FM_Enquiry } from './Forms.jsx';
import { FR_PageHero } from '../../components/site/PageHero.jsx';

function PageHero({ title, intro, tone = "ink", crumbs = [], children, icon }) {
  return (
    <FR_PageHero title={title} intro={intro} tone={tone} crumbs={crumbs} icon={icon}>
      {children}
    </FR_PageHero>
  );
}
function CtaSection({ title = "Let's find the right solution together", text, primary, secondary }) {
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>{title}</h2>
          <p>
            {text ||
              "Tell us what you're trying to achieve. Our team will understand your requirement and suggest the right approach, scope and next steps."}
          </p>
        </div>
        <div className="cta-band__actions">
          <Link className="btn btn--light btn--lg" to={(primary == null ? undefined : primary.to) || "/lets-talk?type=quote"}>
            {(primary == null ? undefined : primary.label) || "Request a Quote"}
          </Link>
          <Link className="btn btn--outline-light btn--lg" to={(secondary == null ? undefined : secondary.to) || "/lets-talk"}>
            {(secondary == null ? undefined : secondary.label) || "Talk to an Expert"}
          </Link>
        </div>
      </div>
    </section>
  );
}
const phoneDialCode = (t) => {
    const e = PHONE_COUNTRIES.find((a) => a.iso === t.country);
    return e != null && e.other ? t.otherCode : e == null ? undefined : e.code;
  };
const serviceNames = (t) => findVertical(t).services.map((e) => e.name),
  MARKETPLACE_PRODUCT = PRODUCTS.find((t) => t.slug === "panel-audience-marketplace"),
  SAMPLEDGE_PRODUCT = PRODUCTS.find((t) => t.slug === "sampledge"),
  ENQUIRY_TYPES = [
    {
      key: "general",
      label: "Contact Us",
      fieldLabel: "Service area",
      options: [...VERTICALS.map((t) => t.name), "Sampledge products", "Something else"],
    },
    {
      key: "quote",
      label: "Request a Quote",
      fieldLabel: "Service area",
      options: [...VERTICALS.map((t) => t.name), "Sampledge products"],
    },
    {
      key: "feasibility",
      label: "Request Research Feasibility",
      fieldLabel: "Research service",
      options: serviceNames("market-research"),
    },
    {
      key: "audience",
      label: "Request Audience Feasibility",
      fieldLabel: "Audience type",
      options: [...MARKETPLACE_PRODUCT.sections["Find your audience"], "Multiple audiences"],
    },
    {
      key: "demo",
      label: "Request a Sampledge Demo",
      fieldLabel: "Demo focus",
      options: [...SAMPLEDGE_PRODUCT.sections["Key capabilities"], "Full product walkthrough"],
    },
    {
      key: "digital",
      label: "Digital Marketing Consultation",
      fieldLabel: "Digital marketing service",
      options: serviceNames("digital-marketing"),
    },
    {
      key: "it",
      label: "IT Project Consultation",
      fieldLabel: "IT service",
      options: serviceNames("it-development"),
    },
    {
      key: "finance",
      label: "Finance Consultation",
      fieldLabel: "Finance service",
      options: serviceNames("accounts-finance"),
    },
    {
      key: "panel",
      label: "Join a Research Panel",
      fieldLabel: "Panel",
      options: PORTALS.map((t) => `${t.name} (${t.audience})`),
    },
    {
      key: "careers",
      label: "Career Application",
      fieldLabel: "Department",
      options: CAREERS.departments,
    },
  ];
function EnquiryForm({ type = "general", service = "", compact = false }) {
  return <FM_Enquiry type={type} service={service} compact={compact} />;
}
const CtaSectionBlock = (p) => ee.createElement(CtaSection, p);

export { CtaSection, CtaSectionBlock, ENQUIRY_TYPES, EnquiryForm, PageHero, phoneDialCode };
