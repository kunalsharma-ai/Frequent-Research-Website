import * as ee from 'react';
import { HeroH1 } from './shared/HeroH1.jsx';
import { HOME_TITLE, DESC_BY_PATH, fitDesc } from './seoText.js';
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { HomePage } from './home/HomePage.jsx';
import { SiteHeader } from './SiteHeader.jsx';
import { FRW_WhatsApp } from '../components/site/Floaters.jsx';
import { FR_Chat } from '../components/site/Chat.jsx';
import { RV_Prompt } from '../components/site/ReviewPrompt.jsx';
import { FR_Footer } from '../components/site/Footer.jsx';
import { fullPage } from './full.js';
import { cmsCustomPage } from './cms78.jsx';

// build 78: pages the super admin created (app/cmsBlocks.jsx, loaded only when such a page is opened)
const CmsPage = ee.lazy(() => import('./cmsBlocks.jsx').then((m) => ({ default: m.CmsPage })));

// build 74: every page but home comes from full.jsx (app/full.js)
const LetsTalkPage = fullPage("LetsTalkPage");
const VerticalPage = fullPage("VerticalPage");
const ServicesPage = fullPage("ServicesPage");
const OurTeamPage = fullPage("OurTeamPage");
const BlogPostPage = fullPage("BlogPostPage");
const BlogPage = fullPage("BlogPage");
const PrivacyPage = fullPage("PrivacyPage");
const LegalPage = fullPage("LegalPage");
const PortalPage = fullPage("PortalPage");
const PortalsPage = fullPage("PortalsPage");
const GovernmentCaseStudyPage = fullPage("GovernmentCaseStudyPage");
const GovernmentPage = fullPage("GovernmentPage");
const ServicePage = fullPage("ServicePage");
const ES_Page = fullPage("ES_Page");
const DL5_Page = fullPage("DL5_Page");
const PC5_Page = fullPage("PC5_Page");
const QP5_Page = fullPage("QP5_Page");
const SQ7_AF = fullPage("SQ7_AF");
const SQ7_DM = fullPage("SQ7_DM");
const SQ7_IT = fullPage("SQ7_IT");
const OJ_Page = fullPage("OJ_Page");
const RR_Page = fullPage("RR_Page");
const AB6_Page = fullPage("AB6_Page");
const CX6_Page = fullPage("CX6_Page");
const IN6_Hub = fullPage("IN6_Hub");
const IN6_Sector = fullPage("IN6_Sector");
const RC19_Page = fullPage("RC19_Page");
const CR5_Page = fullPage("CR5_Page");
const GL5_Page = fullPage("GL5_Page");
const PR5_Page = fullPage("PR5_Page");
const PR5_Product = fullPage("PR5_Product");
const CQ5_Page = fullPage("CQ5_Page");

function WhatsAppButton() {
  return <FRW_WhatsApp />;
}
// Sets the page title ("<title> | Frequent Research") and, when given, the meta description.
// build 82.7 (SEO): the home title is 60 characters and a description is at most 160 (app/seoText.js)
function usePageMeta(title, description) {
  ee.useEffect(() => {
    document.title = title ? `${title} | Frequent Research` : HOME_TITLE;
    const d = DESC_BY_PATH[location.pathname.replace(/\/+$/, "") || "/"] || (description && fitDesc(description));
    if (d) document.querySelector('meta[name="description"]')?.setAttribute("content", d);
  }, [title, description]);
}
function NotFoundPage() {
  usePageMeta("Page not found");
  return (
    <section className="section notfound">
      <div className="container center">
        <p className="notfound__code" aria-hidden="true">
          404
        </p>
        <HeroH1>This page couldn't be found</HeroH1>
        <p>The link may be old or mistyped. Try one of these instead.</p>
        <div className="notfound__links">
          <Link className="btn btn--primary" to="/">
            Home
          </Link>
          <Link className="btn btn--ghost" to="/services">
            Services
          </Link>
          <Link className="btn btn--ghost" to="/insights">
            Insights
          </Link>
          <Link className="btn btn--ghost" to="/lets-talk">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
function SiteApp() {
  const { pathname, hash } = useLocation();
  const custom = cmsCustomPage(pathname);
  // on every page change: scroll to the #anchor if there is one, otherwise to the top
  ee.useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 60);
    } else window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
  // in-page links (href="#section") scroll smoothly instead of changing the route
  ee.useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!id || id.startsWith("/")) return;
      const target = document.getElementById(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return (
    <>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <ee.Suspense fallback={<div className="page-loading" aria-busy="true" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AB6_Page />} />
            <Route path="/our-team" element={<OurTeamPage />} />
            <Route path="/portals" element={<PortalsPage />} />
            <Route path="/government-opinion-research" element={<GovernmentPage />} />
            <Route path="/government-opinion-research/case-study" element={<GovernmentCaseStudyPage />} />
            <Route path="/downloads" element={<DL5_Page />} />
            <Route path="/downloads/:section" element={<DL5_Page />} />
            <Route path="/downloads/quality-process/market-research" element={<QP5_Page />} />
            <Route path="/downloads/quality-process/digital-marketing" element={<SQ7_DM />} />
            <Route path="/downloads/quality-process/it-development" element={<SQ7_IT />} />
            <Route path="/downloads/quality-process/accounts-finance" element={<SQ7_AF />} />
            <Route path="/downloads/:section/:country" element={<PC5_Page />} />
            <Route path="/privacy-data-protection" element={<PrivacyPage />} />
            {["privacy-policy", "cookie-policy", "terms-conditions", "data-protection", "research-ethics"].map((slug) => (
              <Route path={`/${slug}`} element={<LegalPage slugOverride={slug} />} key={slug} />
            ))}
            <Route path="/portals/:portal" element={<PortalPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/:vertical" element={<VerticalPage />} />
            <Route path="/services/:vertical/:service" element={<ServicePage />} />
            <Route path="/products" element={<PR5_Page />} />
            <Route path="/products/:product" element={<PR5_Product />} />
            <Route path="/industries-case-studies" element={<IN6_Hub />} />
            <Route path="/industries-case-studies/:industry" element={<IN6_Sector />} />
            <Route path="/industries-case-studies/:industry/:caseSlug" element={<CX6_Page />} />
            <Route path="/insights" element={<Navigate to="/blog" replace={true} />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/careers" element={<CR5_Page />} />
            <Route path="/gallery" element={<GL5_Page />} />
            <Route path="/lets-talk" element={<LetsTalkPage />} />
            <Route path="/rates-reviews" element={<RR_Page />} />
            <Route path="/connect" element={<CQ5_Page />} />
            <Route path="/our-reach" element={<RC19_Page />} />
            <Route path="/our-journey" element={<OJ_Page />} />
            <Route path="/esomar-37" element={<ES_Page />} />
            <Route path="*" element={custom ? <CmsPage page={custom} /> : <NotFoundPage />} />
          </Routes>
        </ee.Suspense>
      </main>
      <FR_Footer />
      <WhatsAppButton />
      <RV_Prompt />
      <FR_Chat />
    </>
  );
}

export { NotFoundPage, SiteApp, usePageMeta };
