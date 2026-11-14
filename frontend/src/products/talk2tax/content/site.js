/**
 * Site-wide settings. Edit these before going live.
 *
 * Any value left as `null` renders a clearly marked placeholder on the page
 * (a dashed "Set in src/content/site.js" tag), so nothing fake goes live by accident.
 */
export const SITE = {
  productName: 'Talk2Tax',
  company: 'Sampledge',
  tagline: 'Talk. File. Relax.',

  /** Where "Book a demo" buttons go, e.g. a Calendly link or /contact. PLACEHOLDER until set. */
  demoUrl: '/lets-talk?type=demo&product=Talk2Tax',
  /** Where "Sign in" goes, e.g. https://app.talk2tax.com. PLACEHOLDER until set. */
  appUrl: null,
  /** Sales contact address shown in the final section. PLACEHOLDER until set. */
  contactEmail: 'sales@sampledge.com',
  /** Main Sampledge website, used by the "by Sampledge" links. PLACEHOLDER until set. */
  sampledgeUrl: 'https://www.sampledge.com',

  /** Footer legal links. PLACEHOLDER until set. */
  privacyUrl: null,
  termsUrl: null,
};

export const linkOr = (value, fallback = '#contact') => value || fallback;
