/*
 * Super admin, build 83: "All website pages" (Kunal, 16 Nov: "put all web pages from frequent research website …
 * full fledged control of frequent research website in super admin").
 *
 * One directory of every page of the site (data/sitePages83.js, plus pages made in the admin and any page in the
 * build's page index), grouped as on the site, with search. Each page links straight to everything the super admin
 * can change about it: its content and sections (Pages & sections), its page video and design (Page videos), its
 * SEO, the menus, and the data behind it (services, products, portals, panel numbers, industries / case studies, blog
 * posts, legal pages). Hiding a page from visitors is done the same way as before: Pages & sections › hide its sections,
 * or SEO › redirects.
 */
import * as ee from 'react';
import { admGet } from './api.jsx';
import { AdmBtn } from './Fields.jsx';
import { admLoadSiteIndex } from './SiteContent.jsx';
import { sp83Groups } from '../data/sitePages83.js';
import './css83.js';

/* the admin sections that hold a page's data */
const DATA_OF = (p) => p.kind === "service" || p.kind === "vertical" ? (p.fam === "af" ? [["af", "Prices & texts"]] : [])
  : p.kind === "product" ? [["products", "Product data"]] : p.kind === "portal" ? [["portals", "Portal data"]]
  : p.kind === "panel" ? [["panels", "Panel numbers"], ["pdfs", "Panel book PDF"]] : p.kind === "industry" ? [["cases", "Case studies"]]
  : p.kind === "blog" ? [["blogs", "Blog post"]] : p.kind === "legal" ? [["legal", "Legal text"]] : p.path === "/our-team" ? [["team", "Team"]]
  : p.path === "/gallery" ? [["gallery", "Gallery"]] : p.path === "/careers" ? [["careers", "Careers"]] : p.path === "/rates-reviews" ? [["testimonials", "Testimonials"], ["reviews", "Reviews"]]
  : p.path.startsWith("/downloads") ? [["downloads", "Downloads list"], ["pdfs", "PDFs"]] : [];

function AllPages83({ go }) {
  const [extra, setExtra] = ee.useState([]);
  const [q, setQ] = ee.useState(""), [grp, setGrp] = ee.useState("");
  ee.useEffect(() => {
    let on = true;
    Promise.all([admGet("custom-pages").catch(() => []), admLoadSiteIndex().catch(() => null)]).then(([custom, ix]) => {
      if (!on) return;
      const out = (Array.isArray(custom) ? custom : []).filter((x) => x && x.path).map((x) => ({ path: x.path, name: x.title || x.path, group: "New pages (made in the admin)", kind: "custom", fam: "fr" }));
      if (ix && Array.isArray(ix.pages)) for (const p of ix.pages) out.push({ path: p.path, name: String(p.title || p.path).split(/\s+[|·–—]\s+/)[0], group: "Other pages (from the build's page list)", kind: "other", fam: "fr" });
      setExtra(out);
    });
    return () => { on = false; };
  }, []);
  const groups = ee.useMemo(() => {
    const seen = new Set();
    return sp83Groups(extra).map(([g, l]) => [g, l.filter((p) => !seen.has(p.path) && seen.add(p.path))]).filter(([, l]) => l.length);
  }, [extra]);
  const total = groups.reduce((a, [, l]) => a + l.length, 0);
  const to = (sec, path) => { go(sec); if (path) history.replaceState(null, "", location.pathname + "?page=" + encodeURIComponent(path)); };
  return (
    <section className="adm-sec adm-sec--wide adm83-ap">
      <header className="adm-sec__h"><h1>All website pages</h1></header>
      <p className="adm-muted">Every page of the website ({total}), grouped as on the site. Open any page's content and sections, its page video and design, its SEO and the data behind it from here.</p>
      <div className="adm-filters adm-row">
        <input className="adm-in" placeholder={"Search " + total + " pages…"} value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="adm-in adm-in--auto" value={grp} onChange={(e) => setGrp(e.target.value)}><option value="">All groups ({groups.length})</option>{groups.map(([g, l]) => <option key={g} value={g}>{g} ({l.length})</option>)}</select>
      </div>
      {groups.filter(([g]) => !grp || g === grp).map(([g, list]) => {
        const l = list.filter((p) => !q || (p.name + " " + p.path).toLowerCase().includes(q.toLowerCase()));
        if (!l.length) return null;
        return (
          <details key={g} open={!!q || !!grp || g === "Main pages"}>
            <summary><h2 style={{ display: "inline" }}>{g}</h2> <small>({l.length})</small></summary>
            <table>
              <tbody>
                {l.slice(0, 400).map((p) => (
                  <tr key={p.path}>
                    <td><b>{p.name}</b><small>{p.path}</small></td>
                    <td><span className="adm-row">
                      <a className="adm-btn adm-btn--sm adm-btn--ghost" href={p.path} target="_blank" rel="noreferrer">View ↗</a>
                      <AdmBtn small onClick={() => to("pages", p.path)}>Content & sections</AdmBtn>
                      <AdmBtn small onClick={() => to("videos", p.path)}>Page video</AdmBtn>
                      <AdmBtn small onClick={() => to("seo", p.path)}>SEO</AdmBtn>
                      <AdmBtn small onClick={() => to("edit", p.path)}>Edit on the page</AdmBtn>
                      {DATA_OF(p).map(([sec, l2]) => <AdmBtn key={sec} small kind="ghost" onClick={() => to(sec)}>{l2}</AdmBtn>)}
                    </span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        );
      })}
    </section>
  );
}

export { AllPages83 as AdmAllPages83 };
