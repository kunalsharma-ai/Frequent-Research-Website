/*
 * Downloads (build 51) — /downloads. Prefix DLX_. Styles: src/styles/downloads.css (dx-).
 *
 *  1. Service brochures — one per service (Market Research, Digital Marketing, IT & Development, Finance & Accounts),
 *     generated as branded PDFs from the site's own service content (frpBrochure).
 *  2. Country panel books — a consumer (B2C) and a business (B2B) book for every country in the supplied regional
 *     workbooks (public/data/panel-books, built by tools/panel/make_panel_books.py), previewed on the page and
 *     downloaded as PDFs (frpPanelBook).
 *  3. Other documents — healthcare panel book, company brochure and quality process, emailed by the existing
 *     download form (FRG_Gate; the PDF is generated in the browser by Pdfs.jsx FRP_DOCS — no email step).
 * Every PDF is behind the gated form (FRG_Gate). Deep links: ?panel=b2c|b2b&country=<slug>, and the old
 * ?book=<slug> (consumer book) and ?file=<key> links keep working.
 */
import * as ee from 'react';
import { FRK_Flag, FRK_I } from '../components/site/FrKit.jsx';

const DLX_INDEX_URL = "/data/panel-books/index.json";
const DLX_BOOK_URL = (kind, slug) => `/data/panel-books/${kind}/${slug}.json`;
const DLX_REGIONS = [
  ["North America", "#FF6B6B"],
  ["South America", "#FFB020"],
  ["Europe", "#4F7BFF"],
  ["Asia-Pacific", "#14C9A0"],
  ["Middle East & Africa", "#B05CFF"],
];
const dlxRegionColor = (r) => (DLX_REGIONS.find((x) => x[0] === r) || [0, "#4F7BFF"])[1];
const dlxCache = {};
const dlxBook = (kind, slug) => {
  const k = kind + "/" + slug;
  if (!dlxCache[k])
    dlxCache[k] = fetch(DLX_BOOK_URL(kind, slug), { headers: { Accept: "application/json" } }).then((r) => {
      if (!r.ok || !(r.headers.get("content-type") || "").includes("json")) throw new Error("This panel book could not be loaded. Please try again.");
      return r.json();
    });
  dlxCache[k].catch(() => delete dlxCache[k]);
  return dlxCache[k];
};
function dlxUseIndex() {
  const [ix, setIx] = ee.useState(null);
  ee.useEffect(() => {
    let on = true;
    fetch(DLX_INDEX_URL, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => on && setIx(j && j.b2c ? j : { b2c: [], b2b: [], failed: true }))
      .catch(() => on && setIx({ b2c: [], b2b: [], failed: true }));
    return () => {
      on = false;
    };
  }, []);
  return ix;
}

/* ── hero: a slowly turning ring of documents ──────────────────────────────────────────── */

/* ── service brochures ─────────────────────────────────────────────────────────────────── */
const DLX_BRO_ART = {
  "market-research": (
    <svg viewBox="0 0 120 120">
      <circle cx="52" cy="52" r="30" fill="none" stroke="#fff" strokeWidth="7" />
      <path d="M74 74l26 26" stroke="#fff" strokeWidth="9" strokeLinecap="round" />
      <path d="M36 60l10-12 9 8 13-18" fill="none" stroke="#22D3EE" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "digital-marketing": (
    <svg viewBox="0 0 120 120">
      <path d="M20 74l52-34v52z" fill="#fff" />
      <rect x="72" y="46" width="14" height="40" rx="5" fill="#FFD84D" />
      <path d="M30 78l8 26h12l-6-22" fill="#fff" opacity=".7" />
      <path d="M96 44c8 6 8 30 0 36M104 36c13 10 13 42 0 52" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  "it-development": (
    <svg viewBox="0 0 120 120">
      <rect x="14" y="22" width="92" height="64" rx="10" fill="#fff" />
      <rect x="14" y="22" width="92" height="14" rx="7" fill="#2EE6A6" />
      <path d="M44 52l-12 10 12 10M76 52l12 10-12 10M66 46l-12 32" fill="none" stroke="#7C4DFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="44" y="92" width="32" height="8" rx="4" fill="#fff" />
    </svg>
  ),
  "accounts-finance": (
    <svg viewBox="0 0 120 120">
      <rect x="18" y="64" width="16" height="34" rx="4" fill="#fff" />
      <rect x="42" y="48" width="16" height="50" rx="4" fill="#fff" />
      <rect x="66" y="32" width="16" height="66" rx="4" fill="#F4C152" />
      <circle cx="94" cy="30" r="16" fill="#fff" />
      <path d="M90 26c0-2 2-3 4-3s4 1 4 3-2 3-4 3.5-4 1.5-4 3.5 2 3 4 3 4-1 4-3M94 20v20" fill="none" stroke="#0F9D74" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
};

/* ── panel books ──────────────────────────────────────────────────────────────────────── */
function DLX_Mini({ book }) {
  /* first profile tables as quick bars */
  const t = (book.groups[0] || { tables: [] }).tables.slice(0, 3);
  return (
    <div className="dx-mini">
      {t.map((tb) => (
        <div key={tb.title} className="dx-mini__t">
          <b>{tb.title}</b>
          <ul>
            {tb.rows.slice(0, 6).map(([l, val], i) => (
              <li key={l} style={{ "--w": Math.min(100, val) + "%", "--i": i }}>
                <span>{l}</span>
                <i />
                <em>{Math.round(val * 10) / 10}%</em>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
function DLX_Preview({ kind, entry, onClose, onGet }) {
  const [book, setBook] = ee.useState(null);
  const [err, setErr] = ee.useState("");
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    setBook(null);
    setErr("");
    dlxBook(kind, entry.slug).then(setBook, (e) => setErr(e.message));
  }, [kind, entry.slug]);
  ee.useEffect(() => {
    const k = (e) => e.key === "Escape" && !document.querySelector(".fg-ov") && onClose();
    window.addEventListener("keydown", k);
    const t = setTimeout(() => ref.current && ref.current.focus(), 50);
    return () => (window.removeEventListener("keydown", k), clearTimeout(t));
  }, []);
  const b2b = kind === "b2b";
  const groups = book ? book.groups.filter((g) => g.title) : [];
  return (
    <div className="dx-sheet-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <aside ref={ref} tabIndex={-1} className={"dx-sheet dx-sheet--" + kind} role="dialog" aria-modal="true" aria-labelledby="dx-sheet-h" style={{ "--rc": dlxRegionColor(entry.region) }}>
        <button type="button" className="dx-sheet__x" onClick={onClose} aria-label="Close preview">
          <FRK_I n="x" s={20} />
        </button>
        <header className="dx-sheet__head">
          <span className="dx-sheet__flag">
            <FRK_Flag iso={entry.iso} />
          </span>
          <small>
            {entry.region} · {b2b ? "Business (B2B)" : "Consumer (B2C)"} panel book
          </small>
          <h2 id="dx-sheet-h">{entry.name}</h2>
          <div className="dx-sheet__kpi">
            <div>
              <b>{(entry.panel || 0).toLocaleString("en-IN")}</b>
              <span>{b2b ? "profiled professionals" : "profiled consumers"}</span>
            </div>
            <div>
              <b>{entry.tables}</b>
              <span>profile tables</span>
            </div>
            {b2b && (
              <div>
                <b>{entry.sectors}</b>
                <span>sector sections</span>
              </div>
            )}
          </div>
        </header>
        <div className="dx-sheet__body">
          {err ? <p className="dx-sheet__err">{err}</p> : !book ? <div className="dx-sheet__load" aria-busy="true"><i /><i /><i /></div> : (
            <>
              <h3>Inside this book</h3>
              <DLX_Mini book={book} />
              {groups.length > 0 && (
                <>
                  <h3>Sector sections</h3>
                  <ul className="dx-sheet__secs">
                    {groups.map((g) => (
                      <li key={g.title}>
                        <b>{g.title}</b>
                        <span>{g.tables.length} tables</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {!b2b && (
                <ul className="dx-sheet__chips">
                  {book.groups[0].tables.slice(3, 22).map((t) => (
                    <li key={t.title}>{t.title}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <footer className="dx-sheet__foot">
          <button type="button" className="frk-btn" onClick={() => onGet(kind, entry)}>
            <FRK_I n="down" s={18} /> Download the {entry.name} {b2b ? "B2B" : "consumer"} panel book
          </button>
          <small>Branded PDF · generated instantly · watermarked</small>
        </footer>
      </aside>
    </div>
  );
}

export { DLX_INDEX_URL, DLX_Preview, dlxBook, dlxUseIndex };
