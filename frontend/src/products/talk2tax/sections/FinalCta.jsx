import { ArrowRight, Mail } from 'lucide-react';
import { PLANS } from '../content/content';
import { SITE, linkOr } from '../content/site';
import Placeholder from '../components/Placeholder';
import Reveal from '../components/Reveal';
import icon from '../assets/brand/talk2tax-icon.svg';
import logo from '../assets/brand/talk2tax-logo-on-dark.svg';

export function FinalCta() {
  return (
    <section className="final" id="contact">
      <div className="final-rays" aria-hidden="true" />
      <div className="container final-inner">
        <Reveal variant="zoom" className="final-icon">
          <img src={icon} alt="" />
        </Reveal>
        <Reveal as="h2" className="final-title" delay={80}>
          <span>Talk.</span> <span>File.</span> <span>Relax.</span>
        </Reveal>
        <Reveal as="p" className="final-sub" delay={160}>
          See your own books answer back. We will set up a demo organisation and walk you through GST, payroll, the copilot and the digital twin.
        </Reveal>
        <Reveal className="final-ctas" delay={220}>
          <a className="btn btn-primary btn-lg" href={linkOr(SITE.demoUrl)}>
            Book a demo <ArrowRight size={18} />
          </a>
          {SITE.contactEmail ? (
            <a className="btn btn-ghost btn-lg" href={`mailto:${SITE.contactEmail}`}>
              <Mail size={18} /> {SITE.contactEmail}
            </a>
          ) : (
            <span className="btn btn-ghost btn-lg is-disabled">
              <Mail size={18} /> Email us
            </span>
          )}
        </Reveal>
        {(!SITE.demoUrl || !SITE.contactEmail) && (
          <div className="final-placeholders">
            {!SITE.demoUrl && <Placeholder what="demoUrl" />}
            {!SITE.contactEmail && <Placeholder what="contactEmail" />}
          </div>
        )}
        <Reveal className="plans" delay={280}>
          <span className="plans-label">Plans</span>
          {PLANS.map((p) => (
            <span key={p} className="plan">
              {p}
            </span>
          ))}
          <span className="plans-note">Monthly or annual. Ask us for pricing.</span>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img src={logo} alt="Talk2Tax. Talk. File. Relax. by Sampledge" className="footer-logo" width="234" height="64" />
        <nav className="footer-links" aria-label="Footer">
          <a href="#ask">Ask</a>
          <a href="#platform">Platform</a>
          <a href="#india">India tax</a>
          <a href="#future">Future lab</a>
          <a href="#gallery">Screens</a>
          <a href={linkOr(SITE.privacyUrl, '#')}>Privacy</a>
          <a href={linkOr(SITE.termsUrl, '#')}>Terms</a>
        </nav>
        <p className="footer-legal">
          © {year} {SITE.company}. Talk2Tax is a product of{' '}
          {SITE.sampledgeUrl ? <a href={SITE.sampledgeUrl}>{SITE.company}</a> : SITE.company}. Product screens show a demo organisation with synthetic data.
        </p>
        {(!SITE.privacyUrl || !SITE.termsUrl || !SITE.sampledgeUrl) && (
          <p className="footer-placeholders">
            {!SITE.privacyUrl && <Placeholder what="privacyUrl" />} {!SITE.termsUrl && <Placeholder what="termsUrl" />}{' '}
            {!SITE.sampledgeUrl && <Placeholder what="sampledgeUrl" />}
          </p>
        )}
      </div>
    </footer>
  );
}
