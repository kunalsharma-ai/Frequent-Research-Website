// Build 82: the built-in fields of the two onboarding portals (new client onboarding, 7 steps; new vendor onboarding,
// 8 steps), so the super admin can label every detail of a submission and change the forms (hide, rename, make
// required or optional, new choices, extra fields, documents, POCs, step titles). Keep in step with
// onboarding-portals/<client|vendor>/frontend/src/steps/Steps.jsx: a path here is the `path` of the field there.
// "*" in a path stands for any number (contacts.management.*.email = every management contact's email).

const contact = (prefix, title, step) => [
  [`${prefix}.name`, `${title}: full name`, step, 'text'],
  [`${prefix}.designation`, `${title}: designation`, step, 'text'],
  [`${prefix}.email`, `${title}: email`, step, 'email'],
  [`${prefix}.phone`, `${title}: phone / mobile`, step, 'phone'],
];
const address = (prefix, title, step) => [
  [`${prefix}.line1`, `${title}: address line 1`, step, 'text'],
  [`${prefix}.line2`, `${title}: address line 2`, step, 'text'],
  [`${prefix}.city`, `${title}: city`, step, 'text'],
  [`${prefix}.state`, `${title}: state / province`, step, 'select'],
  [`${prefix}.postal`, `${title}: PIN / postal code`, step, 'text'],
  [`${prefix}.country`, `${title}: country`, step, 'select'],
];
const rows = (list) => list.map(([path, label, step, type, note]) => ({ path, label, step, type, ...(note ? { note } : {}) }));

export const CLIENT_STEPS = [
  { title: 'Company', desc: 'Tell us about your organisation and the services you need' },
  { title: 'Address & Tax', desc: 'Registered office, billing and tax registration' },
  { title: 'Contacts', desc: 'Management, finance, signatory and references' },
  { title: 'Commercial', desc: 'Payment terms, currency and purchase orders' },
  { title: 'Documents', desc: 'Upload your KYC documents' },
  { title: 'Review & Terms', desc: 'Confirm details and accept the terms' },
  { title: 'Sign Agreement', desc: 'Review your personalised MSA and sign' },
];
export const VENDOR_STEPS = [
  { title: 'Profile', desc: 'Who you are and what you will provide' },
  { title: 'Capabilities', desc: 'Coverage, methods, skills and quality' },
  { title: 'Address & Tax', desc: 'Address, GST / PAN or tax forms' },
  { title: 'Contacts', desc: 'Account, operations, accounts and signatory' },
  { title: 'Bank & Payment', desc: 'Payment terms, invoicing and bank account' },
  { title: 'Documents', desc: 'KYC and capability documents' },
  { title: 'Review & Terms', desc: 'Confirm details and accept the vendor terms' },
  { title: 'Sign Agreement', desc: 'Review your vendor agreement(s) and sign' },
];

const CLIENT_FIELDS = rows([
  ['poc.id', 'Your Frequent Research contact (POC)', 0, 'choice'],
  ['poc.custom', 'POC name (someone else)', 0, 'text'],
  ['region', 'Country of registration: India / outside India', 0, 'choice', 'Decides tax fields, documents and MSA wording: cannot be hidden'],
  ['company.country', 'Country of registration', 0, 'select'],
  ['address.registered.state', 'State / province', 0, 'select'],
  ['address.registered.city', 'City', 0, 'text'],
  ['company.legalName', 'Registered legal name', 0, 'text', 'Printed on the MSA: cannot be hidden'],
  ['company.tradeName', 'Trade / brand name', 0, 'text'],
  ['company.entityType', 'Type of entity', 0, 'select'],
  ['company.regNo', 'CIN / LLPIN / company registration number', 0, 'text'],
  ['company.incDate', 'Date of incorporation', 0, 'date'],
  ['company.years', 'Years in business', 0, 'select'],
  ['company.industry', 'Industry', 0, 'select'],
  ['company.employees', 'Company size (employees)', 0, 'select'],
  ['company.website', 'Website', 0, 'text'],
  ['company.linkedin', 'LinkedIn page', 0, 'text'],
  ['company.about', 'Brief about your business', 0, 'textarea'],
  ['company.services', 'Services you are interested in', 0, 'list'],
  ['company.customServices', 'Services in the client\'s own words', 0, 'list'],
  ...address('address.registered', 'Registered office', 1),
  ['address.billingSame', 'Billing address is the same as the registered office', 1, 'checkbox'],
  ...address('address.billing', 'Billing address', 1),
  ['address.phone', 'Office phone', 1, 'phone'],
  ['address.email', 'General company email', 1, 'email'],
  ['address.fax', 'Fax', 1, 'text'],
  ['tax.gstType', 'GST registration type', 1, 'select'],
  ['tax.gstin', 'GSTIN', 1, 'text'],
  ['tax.pan', 'PAN (company / firm)', 1, 'text'],
  ['tax.tan', 'TAN', 1, 'text'],
  ['tax.msme', 'Registered as an MSME (Udyam)?', 1, 'choice'],
  ['tax.udyam', 'Udyam registration number', 1, 'text'],
  ['tax.taxId', 'Tax ID (VAT / EIN / TRN …)', 1, 'text'],
  ['tax.duns', 'D-U-N-S number', 1, 'text'],
  ...contact('contacts.management.*', 'Management contact', 2),
  ...contact('contacts.finance', 'Accounts & finance contact', 2),
  ['contacts.invoiceEmail', 'Invoice email (accounts payable)', 2, 'email'],
  ['contacts.signatorySource', 'Who will sign?', 2, 'select'],
  ...contact('contacts.signatory', 'Authorised signatory', 2),
  ['contacts.references.*.company', 'Reference: company name', 2, 'text'],
  ['contacts.references.*.person', 'Reference: contact person', 2, 'text'],
  ['contacts.references.*.email', 'Reference: email', 2, 'email'],
  ['contacts.references.*.phone', 'Reference: phone', 2, 'phone'],
  ['commercial.paymentTerms', 'Payment terms', 3, 'choice'],
  ['commercial.customTerms', 'Client\'s own payment terms', 3, 'textarea'],
  ['commercial.currency', 'Billing currency', 3, 'select'],
  ['commercial.effectiveDate', 'Agreement effective date', 3, 'date'],
  ['commercial.poRequired', 'Do you issue purchase orders (PO)?', 3, 'choice'],
  ['commercial.monthlyVolume', 'Expected monthly spend', 3, 'select'],
  ['commercial.notes', 'Anything else we should know?', 3, 'textarea'],
  ['terms.accepted', 'Accepted the terms & conditions', 5, 'checkbox'],
  ['terms.accuracy', 'Confirmed the details are accurate', 5, 'checkbox'],
  ['terms.privacy', 'Accepted the privacy notice', 5, 'checkbox'],
  ['terms.credit', 'Agreed to credit checks', 5, 'checkbox'],
  ['sign.name', 'Signatory name', 6, 'text'],
  ['sign.designation', 'Signatory designation', 6, 'text'],
  ['sign.email', 'Signatory email', 6, 'email'],
  ['sign.place', 'Place of signing', 6, 'text'],
  ['sign.typedName', 'Typed signature', 6, 'text'],
]);

const VENDOR_FIELDS = rows([
  ['poc.id', 'Your Frequent Research contact (POC)', 0, 'choice'],
  ['poc.custom', 'POC name (someone else)', 0, 'text'],
  ['types', 'Vendor type (sample, fieldwork, freelance, tech)', 0, 'multiselect', 'Decides the agreements: cannot be hidden'],
  ['region', 'Country of registration: India / outside India', 0, 'choice', 'Decides tax, bank and documents: cannot be hidden'],
  ['company.country', 'Country', 0, 'select'],
  ['address.registered.state', 'State / province', 0, 'select'],
  ['address.registered.city', 'City', 0, 'text'],
  ['company.entityType', 'Type of business', 0, 'select'],
  ['company.legalName', 'Full / registered legal name', 0, 'text', 'Printed on the agreement: cannot be hidden'],
  ['company.tradeName', 'Trade / brand / professional name', 0, 'text'],
  ['company.regNo', 'CIN / LLPIN / company registration number', 0, 'text'],
  ['company.incDate', 'Date of incorporation', 0, 'date'],
  ['company.years', 'Years in business', 0, 'select'],
  ['company.employees', 'Team size', 0, 'select'],
  ['company.website', 'Website / portfolio', 0, 'text'],
  ['company.linkedin', 'LinkedIn', 0, 'text'],
  ['company.about', 'About your business / professional summary', 0, 'textarea'],
  ['caps.sample.countries', 'Sample: countries you can supply', 1, 'multiselect'],
  ['caps.sample.audiences', 'Sample: audiences', 1, 'multiselect'],
  ['caps.sample.methods', 'Sample: methods', 1, 'multiselect'],
  ['caps.sample.panelSize', 'Sample: total active panel size', 1, 'select'],
  ['caps.sample.esomar37', 'Sample: ESOMAR 37 questions answered?', 1, 'choice'],
  ['caps.sample.sources', 'Sample: how panel members are recruited', 1, 'multiselect'],
  ['caps.sample.quality', 'Sample: quality & compliance', 1, 'multiselect'],
  ['caps.sample.integration', 'Sample: how you connect to our survey links', 1, 'multiselect'],
  ['caps.sample.notes', 'Sample: feasibility notes', 1, 'textarea'],
  ['caps.fieldwork.methods', 'Fieldwork: methods', 1, 'multiselect'],
  ['caps.fieldwork.countries', 'Fieldwork: countries', 1, 'multiselect'],
  ['caps.fieldwork.cities', 'Fieldwork: main cities / regions', 1, 'text'],
  ['caps.fieldwork.languages', 'Fieldwork: interviewing languages', 1, 'multiselect'],
  ['caps.fieldwork.teamSize', 'Fieldwork: field team size', 1, 'select'],
  ['caps.fieldwork.catiSeats', 'Fieldwork: CATI seats', 1, 'text'],
  ['caps.fieldwork.facilities', 'Fieldwork: facilities', 1, 'textarea'],
  ['caps.fieldwork.notes', 'Fieldwork: quality control', 1, 'textarea'],
  ['caps.freelance.skills', 'Freelance: skills', 1, 'multiselect'],
  ['caps.freelance.languages', 'Freelance: working languages', 1, 'multiselect'],
  ['caps.freelance.experience', 'Freelance: experience', 1, 'select'],
  ['caps.freelance.availability', 'Freelance: availability', 1, 'select'],
  ['caps.freelance.rate', 'Freelance: standard rate', 1, 'text'],
  ['caps.freelance.rateUnit', 'Freelance: rate unit', 1, 'select'],
  ['caps.freelance.portfolio', 'Freelance: portfolio / work samples link', 1, 'text'],
  ['caps.freelance.notes', 'Freelance: notable projects', 1, 'textarea'],
  ['caps.tech.categories', 'Tech: what you supply', 1, 'multiselect'],
  ['caps.tech.description', 'Tech: products / services', 1, 'textarea'],
  ['caps.custom', 'Capabilities in the vendor\'s own words', 1, 'list'],
  ...address('address.registered', 'Registered address', 2),
  ['address.billingSame', 'Invoices are raised from the registered office', 2, 'checkbox'],
  ...address('address.billing', 'Invoicing address', 2),
  ['address.phone', 'Phone / mobile', 2, 'phone'],
  ['address.email', 'Email', 2, 'email'],
  ['tax.gstType', 'GST registration type', 2, 'select'],
  ['tax.gstin', 'GSTIN', 2, 'text'],
  ['tax.pan', 'PAN', 2, 'text'],
  ['tax.msme', 'Registered as an MSME (Udyam)?', 2, 'choice'],
  ['tax.udyam', 'Udyam registration number', 2, 'text'],
  ['tax.taxId', 'Tax ID / national tax number', 2, 'text'],
  ['tax.taxForm', 'US tax form you can provide', 2, 'select'],
  ...contact('contacts.management.0', 'Account / relationship manager', 3),
  ...contact('contacts.management.1', 'Operations / project contact', 3),
  ...contact('contacts.finance', 'Accounts contact', 3),
  ['contacts.invoiceEmail', 'Email for payment advices', 3, 'email'],
  ['contacts.signatorySource', 'Who will sign?', 3, 'select'],
  ...contact('contacts.signatory', 'Authorised signatory', 3),
  ['commercial.paymentTerms', 'Payment terms (standard Net 90)', 4, 'text', 'Vendor terms are always Net 90 days'],
  ['commercial.currency', 'Invoice currency', 4, 'select'],
  ['commercial.invoiceFrequency', 'How will you invoice?', 4, 'select'],
  ['commercial.effectiveDate', 'Agreement effective date', 4, 'date'],
  ['commercial.bank.holder', 'Bank: account holder name', 4, 'text'],
  ['commercial.bank.bankName', 'Bank: bank name', 4, 'text'],
  ['commercial.bank.accountNo', 'Bank: account number', 4, 'text'],
  ['commercial.bank.accountNo2', 'Bank: confirm account number', 4, 'text'],
  ['commercial.bank.accountType', 'Bank: account type', 4, 'select'],
  ['commercial.bank.ifsc', 'Bank: IFSC code', 4, 'text'],
  ['commercial.bank.swift', 'Bank: SWIFT / BIC', 4, 'text'],
  ['commercial.bank.iban', 'Bank: IBAN', 4, 'text'],
  ['commercial.bank.routing', 'Bank: ABA routing number', 4, 'text'],
  ['commercial.bank.sortCode', 'Bank: sort code', 4, 'text'],
  ['commercial.bank.branch', 'Bank: branch name & address', 4, 'text'],
  ['commercial.notes', 'Anything else we should know?', 4, 'textarea'],
  ['terms.accepted', 'Accepted the vendor terms', 6, 'checkbox'],
  ['terms.accuracy', 'Confirmed the details are accurate', 6, 'checkbox'],
  ['terms.privacy', 'Accepted the privacy notice', 6, 'checkbox'],
  ['terms.conduct', 'Accepted the code of conduct', 6, 'checkbox'],
  ['sign.name', 'Signatory name', 7, 'text'],
  ['sign.designation', 'Signatory designation', 7, 'text'],
  ['sign.email', 'Signatory email', 7, 'email'],
  ['sign.place', 'Place of signing', 7, 'text'],
  ['sign.typedName', 'Typed signature', 7, 'text'],
]);

// the documents each portal can ask for (which ones it asks depends on the country, entity type and vendor types)
const CLIENT_DOCS = [
  ['gst', 'GST Registration Certificate (India)'], ['pan', 'PAN Card (India)'], ['coi', 'Certificate of Incorporation / Registration'],
  ['msme', 'MSME / Udyam Certificate'], ['address', 'Registered / business address proof'], ['auth', 'Board Resolution / Authorisation Letter'],
  ['tax', 'Tax / VAT / EIN registration (international)'], ['id', 'Authorised signatory photo ID (international)'], ['moa', 'Memorandum & Articles / Operating Agreement'],
  ['goodstanding', 'Certificate of Good Standing / Incumbency'], ['trc', 'Tax Residency Certificate (TRC)'], ['profile', 'Company profile / capability deck'],
];
const VENDOR_DOCS = [
  ['pan', 'PAN Card'], ['gst', 'GST Registration Certificate'], ['gstdecl', 'GST non-registration declaration'], ['coi', 'Certificate of Incorporation / Registration'],
  ['cheque', 'Cancelled cheque / bank letter (India)'], ['id', 'Government photo ID / passport'], ['address', 'Address proof'], ['msme', 'MSME / Udyam Certificate'],
  ['lowtds', 'Lower / Nil TDS certificate (Sec. 197)'], ['taxform', 'IRS Form W-9 / W-8 (signed)'], ['taxreg', 'Tax / VAT registration certificate'],
  ['bank', 'Bank letter / void cheque / bank statement (international)'], ['trc', 'Tax Residency Certificate + Form 10F'], ['panelbook', 'Panel book'],
  ['esomar37', 'ESOMAR 37 answers'], ['fieldprofile', 'Fieldwork capability profile'], ['cv', 'CV / résumé'], ['catalogue', 'Product / service catalogue'],
  ['ratecard', 'Rate card (CPI / fees)'], ['iso', 'ISO / quality / security certificates'], ['auth', 'Board Resolution / Letter of Authority'],
].map(([id, label]) => ({ id, label }));

// paths the portal needs to work (agreements, routing): the admin may rename them but not hide them or make them optional
export const LOCKED = new Set(['region', 'types', 'company.legalName', 'company.country', 'sign.name', 'sign.email', 'poc.id']);

// an empty submission, the same shape the portals send (used for "+ Add new" in the admin)
const c0 = () => ({ name: '', designation: '', email: '', phoneCode: 'IN', phone: '' });
const a0 = () => ({ line1: '', line2: '', city: '', state: '', postal: '', country: '' });
export function emptySubmission(kind) {
  const base = {
    poc: { id: '', custom: '', name: '' }, region: '',
    address: { registered: a0(), billingSame: true, billing: a0(), phoneCode: 'IN', phone: '', fax: '', email: '' },
    contacts: { management: [c0(), c0()], finance: c0(), invoiceEmail: '', signatorySource: 'mgmt0', signatory: c0(), references: [] },
    sign: { name: '', designation: '', email: '', place: '', typedName: '' },
    agreements: [], extra: {},
  };
  if (kind === 'vendor') return {
    ...base, types: [],
    company: { country: '', legalName: '', tradeName: '', entityType: '', regNo: '', incDate: '', years: '', employees: '', website: '', linkedin: '', about: '' },
    caps: { sample: { countries: [], audiences: [], methods: [], panelSize: '', sources: [], quality: [], integration: [], esomar37: '', notes: '' }, fieldwork: { methods: [], countries: [], cities: '', languages: [], teamSize: '', catiSeats: '', facilities: '', notes: '' }, freelance: { skills: [], languages: [], experience: '', rate: '', rateUnit: '', availability: '', portfolio: '', notes: '' }, tech: { categories: [], description: '' }, custom: [] },
    tax: { gstType: '', gstin: '', pan: '', tan: '', msme: '', udyam: '', taxId: '', taxForm: '', duns: '' },
    commercial: { paymentTerms: '90', customTerms: '', currency: 'INR', effectiveDate: '', invoiceFrequency: '', notes: '', bank: { holder: '', bankName: '', accountNo: '', accountType: '', ifsc: '', swift: '', iban: '', routing: '', sortCode: '', branch: '' } },
  };
  return {
    ...base,
    company: { country: '', legalName: '', tradeName: '', entityType: '', regNo: '', incDate: '', years: '', industry: '', employees: '', website: '', linkedin: '', services: [], customServices: [], about: '' },
    tax: { gstType: '', gstin: '', pan: '', tan: '', msme: '', udyam: '', taxId: '', duns: '' },
    commercial: { paymentTerms: '30', customTerms: '', currency: 'INR', poRequired: '', effectiveDate: '', monthlyVolume: '', notes: '' },
  };
}

export const PRACTICES = { MR: 'Market Research', DM: 'Digital Marketing', IT: 'IT & Development', AF: 'Accounts & Finance', SP: 'Sample supply', FW: 'Fieldwork', FL: 'Freelance', TS: 'Technology & services' };

export const CATALOGUE = {
  client: { kind: 'client', name: 'New client onboarding', steps: CLIENT_STEPS, fields: CLIENT_FIELDS, docs: CLIENT_DOCS.map(([id, label]) => ({ id, label })), refPrefix: 'FR-MSA' },
  vendor: { kind: 'vendor', name: 'New vendor onboarding', steps: VENDOR_STEPS, fields: VENDOR_FIELDS, docs: VENDOR_DOCS, refPrefix: 'FR-VEN' },
};

// default POCs (the portals' own list in src/config/company.js)
export const DEFAULT_POCS = [
  { id: 'kunal', name: 'Kunal Sharma' }, { id: 'mayank', name: 'Mayank Rathore' }, { id: 'samiksha', name: 'Samiksha Arora' }, { id: 'manish', name: 'Manish Arora' },
];
export const CUSTOM_TYPES = ['text', 'textarea', 'email', 'number', 'phone', 'date', 'select', 'multiselect', 'radio', 'checkbox', 'file'];
