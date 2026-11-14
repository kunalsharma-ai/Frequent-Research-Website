/*
 * Build 65 update 19 — Sampledge product pages: after the reader has scrolled a while (about two screens), the page
 * blurs and a pop-up invites them to the product's page on sampledge.com (Kunal, 1 Nov 2026). Once per product per
 * browser session; Esc, the backdrop or "Keep reading" closes it. Prefix SX19_, styles in sampledge8.css (sx19-).
 * While it is open the page's own animations pause, so the blur costs one paint, not one per frame.
 */
import * as ee from 'react';
import * as ci from 'react-dom';
import { K5_I, k5Sfx } from './Kit65.jsx';
import { PR5_SITE } from '../../data/Sampledge65.jsx';
import { PR5_Logo } from './PR5Logo.jsx';

function SX19_Nudge({ p }) {
  const [open, setOpen] = ee.useState(false);
  const key = "fr-sx19-" + p.id;
  ee.useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(key) === "1";
    } catch (e) {}
    if (seen) return undefined;
    let raf = 0;
    const check = () => {
      raf = 0;
      if (window.scrollY > window.innerHeight * 1.8) {
        window.removeEventListener("scroll", onScroll);
        try {
          sessionStorage.setItem(key, "1");
        } catch (e) {}
        setOpen(true);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => (window.removeEventListener("scroll", onScroll), cancelAnimationFrame(raf));
  }, [p.id]);
  ee.useEffect(() => {
    const h = document.documentElement;
    if (!open) return undefined;
    h.classList.add("sx19-on");
    const esc = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    k5Sfx("tap");
    return () => (h.classList.remove("sx19-on"), window.removeEventListener("keydown", esc));
  }, [open]);
  if (!open) return null;
  const site = p.site || PR5_SITE;
  const node = (
    <div className="sx19" role="dialog" aria-modal="true" aria-labelledby="sx19-h" style={{ "--c1": p.c1, "--c2": p.c2, "--c3": p.c3 || p.c2 }} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="sx19-card">
        <i className="sx19-ring sx19-ring--a" aria-hidden="true" />
        <i className="sx19-ring sx19-ring--b" aria-hidden="true" />
        <span className="sx19-sparks" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, k) => (
            <i key={k} style={{ "--k": k }} />
          ))}
        </span>
        <button type="button" className="sx19-x" onClick={() => setOpen(false)} aria-label="Close">
          ×
        </button>
        <span className="sx19-logo"><PR5_Logo p={p} tone="dark" h={70} /></span>
        <span className="sx19-kick">Enjoying {p.short}?</span>
        <h2 id="sx19-h" className="sx19-h">
          Ready to start? <em>Visit sampledge.com</em>
        </h2>
        <p className="sx19-p">Plans, demos and sign-up for {p.short} are on the Sampledge website.</p>
        <div className="sx19-ctas">
          <a className="sx19-btn" href={site} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Visit {p.short} on sampledge.com <K5_I n="arrow" s={16} />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <button type="button" className="sx19-btn sx19-btn--ghost" onClick={() => setOpen(false)}>
            Keep reading here
          </button>
        </div>
      </div>
    </div>
  );
  return typeof ci !== "undefined" && ci && ci.createPortal ? ci.createPortal(node, document.body) : node;
}

export { SX19_Nudge };
