// Build 78: the sections the super admin adds to a page ("page-blocks") and the pages it creates ("custom-pages").
// Loaded only on a page that has such a section, so the home page's first screen is unchanged.
// Block kinds and their fields: app/cmsBlockTypes.js. Colours: the site's own palette (styles/cmsblocks.css).
import { HeroH1 } from './shared/HeroH1.jsx';
import * as React from 'react';
import * as ee from 'react'; // the JSX in this project compiles to ee.createElement (vite.config.js)
import { createRoot } from 'react-dom/client';
import DOMPurify from 'dompurify';
import { navGo, navHref } from './nav.jsx';
import CSS_TEXT from '../styles/cmsblocks.css?inline';

// the styles come with this script (the site keeps one small stylesheet for the first screen)
if (typeof document !== "undefined" && !document.getElementById("cmsb-css")) {
  const st = document.createElement("style");
  st.id = "cmsb-css";
  st.textContent = CSS_TEXT;
  document.head.appendChild(st);
}

// any YouTube link (youtu.be, watch?v=, shorts, embed, live) or a bare id -> { id, start, tall } (as in PageVideo69.jsx)
function pvYt(u) {
  u = String(u || "").trim();
  if (/^[\w-]{11}$/.test(u)) return { id: u, start: 0, tall: false };
  try {
    const x = new URL(u), h = x.hostname.replace(/^(www|m|music)\./, "");
    let id = h === "youtu.be" ? x.pathname.slice(1).split("/")[0] : /^youtube(-nocookie)?\.com$/.test(h) ? x.searchParams.get("v") || (x.pathname.match(/\/(embed|shorts|live|v)\/([\w-]{11})/) || [])[2] || "" : "";
    if (!/^[\w-]{11}$/.test(id)) return null;
    const tm = String(x.searchParams.get("t") || x.searchParams.get("start") || "").match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/);
    return { id, start: tm ? (+tm[1] || 0) * 3600 + (+tm[2] || 0) * 60 + (+tm[3] || 0) : 0, tall: /\/shorts\//.test(x.pathname) };
  } catch (e) { return null; }
}
const S = (v) => (v == null ? "" : String(v));
const isObj = (x) => x && typeof x === "object" && !Array.isArray(x);
const arr = (v) => (Array.isArray(v) ? v.filter((x) => x != null && x !== "") : typeof v === "string" ? v.split("\n").map((x) => x.trim()).filter(Boolean) : []);
const safeUrl = (u) => {
  u = S(u).trim();
  if (!u) return "";
  if (/^(\/|#|mailto:|tel:|https?:\/\/)/i.test(u)) return u;
  return "";
};
const internal = (u) => /^\/(?!\/)/.test(u) && !/^\/(api|assets|downloads\/.*\.pdf)/i.test(u);

function A({ to, className, children, ...rest }) {
  const u = safeUrl(to);
  if (!u) return <span className={className}>{children}</span>;
  if (internal(u))
    return (
      <a href={navHref(u)} className={className} onClick={(e) => { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); navGo(u); }} {...rest}>
        {children}
      </a>
    );
  const ext = /^https?:/i.test(u) && !u.includes(location.host);
  return <a href={u} className={className} {...(ext ? { target: "_blank", rel: "noopener" } : {})} {...rest}>{children}</a>;
}

// **bold**, *italic*, [text](link) and line breaks; everything else is plain text
function inline(t, k = 0) {
  const out = [];
  const re = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m;
  while ((m = re.exec(t))) {
    if (m.index > last) out.push(t.slice(last, m.index));
    if (m[1]) out.push(<strong key={k + "b" + m.index}>{m[1]}</strong>);
    else if (m[2]) out.push(<em key={k + "i" + m.index}>{m[2]}</em>);
    else out.push(<A key={k + "a" + m.index} to={m[4]}>{m[3]}</A>);
    last = re.lastIndex;
  }
  if (last < t.length) out.push(t.slice(last));
  return out;
}
function Rich({ text, className }) {
  const paras = S(text).split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  if (!paras.length) return null;
  return (
    <div className={"cmsb-rich " + (className || "")}>
      {paras.map((p, i) => {
        const lines = p.split("\n");
        if (lines.every((x) => /^\s*[-•]\s+/.test(x)))
          return <ul key={i}>{lines.map((x, j) => <li key={j}>{inline(x.replace(/^\s*[-•]\s+/, ""), j)}</li>)}</ul>;
        if (/^#{2,3}\s/.test(p)) return <h3 key={i}>{inline(p.replace(/^#+\s/, ""))}</h3>;
        return <p key={i}>{lines.flatMap((x, j) => (j ? [<br key={"br" + j} />, ...inline(x, j)] : inline(x, j)))}</p>;
      })}
    </div>
  );
}
const Img = ({ src, alt, className }) => (safeUrl(src) ? <img src={safeUrl(src)} alt={S(alt)} className={className} loading="lazy" decoding="async" /> : null);
const Btn = ({ text, to, ghost }) => (text && to ? <A to={to} className={"btn " + (ghost ? "btn--ghost cmsb-btn2" : "btn--primary cmsb-btn")}>{text}</A> : null);
const Head = ({ b, center }) =>
  b.heading || b.eyebrow ? (
    <div className={"cmsb-head" + (center ? " is-center" : "")}>
      {b.eyebrow && <p className="cmsb-eyebrow">{b.eyebrow}</p>}
      {b.heading && <h2>{b.heading}</h2>}
    </div>
  ) : null;

/* ---- the kinds of section ---------------------------------------------------------------------------------------- */
const K = {};
K.hero = (b) => (
  <div className={"cmsb-hero d-" + (b.design || "gradient") + (b.image ? " has-img" : "")}>
    <div className="cmsb-in cmsb-hero__grid">
      <div>
        {b.eyebrow && <p className="cmsb-eyebrow">{b.eyebrow}</p>}
        {b.heading && <HeroH1>{b.heading}</HeroH1>}
        <Rich text={b.text} className="cmsb-lead" />
        <div className="cmsb-btns"><Btn text={b.button} to={b.link} /><Btn text={b.button2} to={b.link2} ghost /></div>
      </div>
      {b.image && <Img src={b.image} alt={b.heading} className="cmsb-hero__img" />}
    </div>
  </div>
);
K.text = (b) => (
  <div className={"cmsb-sec d-" + (b.design || "plain")}>
    <div className={"cmsb-in cmsb-narrow" + (b.align === "center" ? " is-center" : "")}>
      <Head b={b} center={b.align === "center"} />
      <Rich text={b.text} />
    </div>
  </div>
);
K.textImage = (b) => (
  <div className={"cmsb-sec d-" + (b.design || "plain")}>
    <div className={"cmsb-in cmsb-split" + (b.side === "left" ? " is-left" : "")}>
      <div>
        <Head b={b} />
        <Rich text={b.text} />
        <div className="cmsb-btns"><Btn text={b.button} to={b.link} /></div>
      </div>
      <Img src={b.image} alt={b.heading} className="cmsb-split__img" />
    </div>
  </div>
);
K.cards = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in">
      <Head b={b} center />
      <Rich text={b.text} className="cmsb-intro" />
      <div className={"cmsb-cards c-" + (b.columns || "3") + " d-" + (b.design || "lift")}>
        {arr(b.items).filter(isObj).map((c, i) => {
          const inner = (
            <>
              {c.image && <Img src={c.image} alt={c.title} className="cmsb-card__img" />}
              <div className="cmsb-card__body">
                {c.icon && <span className="cmsb-card__icon" aria-hidden="true">{c.icon}</span>}
                {c.title && <h3>{c.title}</h3>}
                <Rich text={c.text} />
              </div>
            </>
          );
          return c.link ? <A key={i} to={c.link} className="cmsb-card is-link">{inner}</A> : <div key={i} className="cmsb-card">{inner}</div>;
        })}
      </div>
    </div>
  </div>
);
K.stats = (b) => (
  <div className={"cmsb-sec d-" + (b.design || "navy")}>
    <div className="cmsb-in">
      <Head b={b} center />
      <div className="cmsb-stats">
        {arr(b.items).filter(isObj).map((s, i) => (
          <div key={i} className="cmsb-stat"><strong>{s.value}</strong><span>{s.label}</span></div>
        ))}
      </div>
    </div>
  </div>
);
K.steps = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in">
      <Head b={b} center />
      <ol className={"cmsb-steps d-" + (b.design || "timeline")}>
        {arr(b.items).filter(isObj).map((s, i) => (
          <li key={i}>
            <span className="cmsb-steps__n">{s.when || i + 1}</span>
            <div>{s.title && <h3>{s.title}</h3>}<Rich text={s.text} /></div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);
K.faq = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in cmsb-narrow">
      <Head b={b} center />
      <div className="cmsb-faq">
        {arr(b.items).filter(isObj).map((f, i) => (
          <details key={i}><summary>{f.q}</summary><Rich text={f.a} /></details>
        ))}
      </div>
    </div>
  </div>
);
K.cta = (b) => (
  <div className="cmsb-sec">
    <div className={"cmsb-in cmsb-cta d-" + (b.design || "gradient")}>
      <div>{b.heading && <h2>{b.heading}</h2>}<Rich text={b.text} /></div>
      <Btn text={b.button || "Let's talk"} to={b.link || "/lets-talk"} />
    </div>
  </div>
);
function Video({ b }) {
  const [play, setPlay] = React.useState(false);
  const yt = pvYt(b.url);
  if (!yt) return null;
  return (
    <div className="cmsb-sec">
      <div className="cmsb-in cmsb-narrow">
        <Head b={b} center />
        <Rich text={b.text} className="cmsb-intro" />
        <div className={"cmsb-video" + (yt.tall ? " is-tall" : "")}>
          {play ? (
            <iframe title={S(b.heading) || "Video"} src={"https://www.youtube-nocookie.com/embed/" + encodeURIComponent(yt.id) + "?autoplay=1&rel=0&playsinline=1" + (yt.start ? "&start=" + yt.start : "")} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />
          ) : (
            <button type="button" onClick={() => setPlay(true)} aria-label={"Play video" + (b.heading ? ": " + b.heading : "")}>
              <img src={"https://i.ytimg.com/vi/" + yt.id + "/hqdefault.jpg"} alt="" loading="lazy" />
              <span className="cmsb-video__play" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
K.video = (b) => <Video b={b} />;
K.gallery = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in">
      <Head b={b} center />
      <div className="cmsb-gallery">
        {arr(b.items).filter(isObj).map((g, i) => (
          <figure key={i}><Img src={g.image} alt={g.caption} />{g.caption && <figcaption>{g.caption}</figcaption>}</figure>
        ))}
      </div>
    </div>
  </div>
);
K.logos = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in">
      <Head b={b} center />
      <div className="cmsb-logos">
        {arr(b.items).filter(isObj).map((g, i) => (g.link ? <A key={i} to={g.link}><Img src={g.image} alt={g.alt} /></A> : <span key={i}><Img src={g.image} alt={g.alt} /></span>))}
      </div>
    </div>
  </div>
);
K.plans = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in">
      <Head b={b} center />
      <Rich text={b.text} className="cmsb-intro" />
      <div className="cmsb-plans">
        {arr(b.items).filter(isObj).map((p, i) => (
          <div key={i} className={"cmsb-plan" + (p.featured ? " is-featured" : "")}>
            {p.name && <h3>{p.name}</h3>}
            <p className="cmsb-plan__price">{p.price || "Ask us"}</p>
            {p.note && <p className="cmsb-plan__note">{p.note}</p>}
            <ul>{arr(p.features).map((f, j) => <li key={j}>{f}</li>)}</ul>
            <Btn text={p.button || "Get a proposal"} to={p.link || "/lets-talk"} />
          </div>
        ))}
      </div>
    </div>
  </div>
);
K.quotes = (b) => (
  <div className="cmsb-sec d-soft">
    <div className="cmsb-in">
      <Head b={b} center />
      <div className="cmsb-quotes">
        {arr(b.items).filter(isObj).map((q, i) => (
          <figure key={i}><blockquote>{q.text}</blockquote><figcaption><strong>{q.name}</strong>{q.role && <span>{q.role}</span>}</figcaption></figure>
        ))}
      </div>
    </div>
  </div>
);
K.team = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in">
      <Head b={b} center />
      <div className="cmsb-team">
        {arr(b.items).filter(isObj).map((p, i) => {
          const inner = (<>{p.image ? <Img src={p.image} alt={p.name} /> : <span className="cmsb-team__ini" aria-hidden="true">{S(p.name).split(/\s+/).map((x) => x[0]).join("").slice(0, 2)}</span>}<strong>{p.name}</strong><span>{p.role}</span></>);
          return p.link ? <A key={i} to={p.link} className="cmsb-person">{inner}</A> : <div key={i} className="cmsb-person">{inner}</div>;
        })}
      </div>
    </div>
  </div>
);
K.checklist = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in">
      <Head b={b} center />
      <ul className={"cmsb-check c-" + (b.columns || "2")}>{arr(b.items).map((x, i) => <li key={i}>{inline(S(x))}</li>)}</ul>
    </div>
  </div>
);
K.table = (b) => {
  const rows = arr(b.rows).map((r) => S(r).split("|").map((c) => c.trim()));
  if (!rows.length) return null;
  const [h, ...body] = rows;
  return (
    <div className="cmsb-sec">
      <div className="cmsb-in">
        <Head b={b} center />
        <div className="cmsb-table">
          <table>
            <thead><tr>{h.map((c, i) => <th key={i} scope="col">{c}</th>)}</tr></thead>
            <tbody>{body.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{inline(c)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
K.download = (b) => (
  <div className="cmsb-sec">
    <div className="cmsb-in cmsb-cta d-soft">
      <div>{b.heading && <h2>{b.heading}</h2>}<Rich text={b.text} /></div>
      {safeUrl(b.file) && <a className="btn btn--primary cmsb-btn" href={safeUrl(b.file)} target="_blank" rel="noopener" download>{b.button || "Download"}</a>}
    </div>
  </div>
);

const slug = (s) => S(s).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "").slice(0, 40) || "field";
function FormBlock({ b, news }) {
  const [state, setState] = React.useState({ busy: false, done: false, err: "" });
  const fields = news ? [] : arr(b.fields).filter(isObj);
  const key = news ? "newsletter" : S(b.formKey).trim() || "page:" + location.pathname;
  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const extra = {};
    for (const x of fields) { const n = slug(x.label); const v = x.type === "checkbox" ? (f.get(n) ? "Yes" : "No") : S(f.get(n)).trim(); if (v) extra[x.label || n] = v; }
    const body = news
      ? { email: f.get("email"), name: f.get("name"), consent: !!f.get("consent"), source: location.pathname, website: f.get("website") }
      : { name: f.get("name"), email: f.get("email"), phone: f.get("phone"), message: f.get("message"), service: b.heading || key, page: location.pathname, consent: !!f.get("consent"), formKey: key, extra, website: f.get("website") };
    setState({ busy: true, done: false, err: "" });
    try {
      const r = await fetch(news ? "/api/v1/newsletter" : "/api/v1/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.ok === false) throw new Error(j.error || "Something went wrong. Please try again.");
      setState({ busy: false, done: true, err: "" });
    } catch (x) {
      setState({ busy: false, done: false, err: x.message || "Something went wrong. Please try again." });
    }
  };
  return (
    <div className="cmsb-sec">
      <div className={"cmsb-in cmsb-formwrap" + (news ? " is-news" : "")}>
        <div><Head b={b} /><Rich text={b.text} /></div>
        {state.done ? (
          <p className="cmsb-done" role="status">{b.success || (news ? "Thank you. Please check your inbox." : "Thank you. Our team will get back to you shortly.")}</p>
        ) : (
          <form className="cmsb-form" onSubmit={submit} data-cms-form={key} noValidate={false}>
            <input type="text" name="website" tabIndex={-1} autoComplete="off" className="cmsb-hp" aria-hidden="true" />
            <label><span>Name</span><input name="name" required={!news} autoComplete="name" /></label>
            <label><span>Email</span><input name="email" type="email" required autoComplete="email" /></label>
            {!news && <label><span>Phone</span><input name="phone" type="tel" autoComplete="tel" /></label>}
            {fields.map((x, i) => {
              const n = slug(x.label), req = !!x.required;
              if (x.type === "textarea") return <label key={i} className="is-wide"><span>{x.label}</span><textarea name={n} rows={4} required={req} /></label>;
              if (x.type === "select") return <label key={i}><span>{x.label}</span><select name={n} required={req} defaultValue=""><option value="" disabled>Choose…</option>{arr(x.options).map((o, j) => <option key={j}>{o}</option>)}</select></label>;
              if (x.type === "checkbox") return <label key={i} className="is-wide cmsb-tick"><input type="checkbox" name={n} required={req} /><span>{x.label}</span></label>;
              return <label key={i}><span>{x.label}</span><input name={n} type={["tel", "number", "date"].includes(x.type) ? x.type : "text"} required={req} /></label>;
            })}
            {!news && <label className="is-wide"><span>Message</span><textarea name="message" rows={4} /></label>}
            <label className="is-wide cmsb-tick"><input type="checkbox" name="consent" required={news} /><span>{news ? "Yes, send me the Frequent Research newsletter. I can unsubscribe at any time." : "I agree to receive emails from Frequent Research. I can unsubscribe at any time."}</span></label>
            {state.err && <p className="cmsb-err is-wide" role="alert">{state.err}</p>}
            <button className="btn btn--primary cmsb-btn is-wide" disabled={state.busy}>{state.busy ? "Sending…" : b.button || (news ? "Subscribe" : "Send")}</button>
          </form>
        )}
      </div>
    </div>
  );
}
K.form = (b) => <FormBlock b={b} />;
K.newsletter = (b) => <FormBlock b={b} news />;

function BlogList({ b }) {
  const [posts, setPosts] = React.useState(null);
  React.useEffect(() => {
    let dead = false;
    import("./data/blogPosts.jsx").then((m) => !dead && setPosts(m.BLOG_POSTS || [])).catch(() => !dead && setPosts([]));
    return () => { dead = true; };
  }, []);
  if (!posts) return <div className="cmsb-sec"><div className="cmsb-in cmsb-blog is-loading" aria-busy="true" /></div>;
  const v = S(b.vertical).trim();
  const list = posts.filter((p) => !v || p.vertical === v).slice(0, +b.count || 3);
  return (
    <div className="cmsb-sec">
      <div className="cmsb-in">
        <Head b={b} center />
        <div className="cmsb-cards c-3 d-lift cmsb-blog">
          {list.map((p) => (
            <A key={p.slug} to={"/blog/" + p.slug} className="cmsb-card is-link">
              {p.cover && <Img src={p.cover} alt="" className="cmsb-card__img" />}
              <div className="cmsb-card__body"><h3>{p.title}</h3><p>{p.description}</p><span className="cmsb-meta">{p.readTime} min read</span></div>
            </A>
          ))}
        </div>
      </div>
    </div>
  );
}
K.blog = (b) => <BlogList b={b} />;
K.html = (b) => {
  const html = DOMPurify.sanitize(S(b.html), { FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form"], FORBID_ATTR: ["style"] });
  return <div className="cmsb-sec"><div className="cmsb-in cmsb-rich" dangerouslySetInnerHTML={{ __html: html }} /></div>;
};
K.spacer = (b) => <div className={"cmsb-space s-" + (b.size || "medium")} aria-hidden="true" />;

class Guard extends React.Component {
  constructor(p) { super(p); this.state = { bad: false }; }
  static getDerivedStateFromError() { return { bad: true }; }
  render() { return this.state.bad ? null : this.props.children; }
}
function CmsBlocks({ blocks }) {
  return (arr(blocks).filter((b) => isObj(b) && b.show !== false && K[b.type]).map((b, i) => (
    <section key={b.id || i} className={"cmsb cmsb--" + b.type} id={b.anchor ? S(b.anchor).replace(/[^\w-]/g, "") : undefined} data-cms-block={b.type}>
      <Guard>{K[b.type](b)}</Guard>
    </section>
  )));
}

// a section group inside an existing page (app/cms78.jsx placeBlocks)
const roots = new WeakMap();
function cmsMountBlocks(box, blocks) {
  let r = roots.get(box);
  if (!r) { r = createRoot(box); roots.set(box, r); }
  r.render(<CmsBlocks blocks={blocks} />);
}

// a page the super admin created (Pages > New page); shown by SiteApp for its address
function CmsPage({ page }) {
  React.useEffect(() => {
    document.title = (page.seoTitle || page.title || "Frequent Research") + " | Frequent Research";
    const d = page.description || page.seoDescription;
    if (d) document.querySelector('meta[name="description"]')?.setAttribute("content", d);
  }, [page]);
  const blocks = arr(page.blocks);
  const hasHero = blocks.some((b) => isObj(b) && b.type === "hero" && b.show !== false);
  return (
    <div className="cmsb-page" data-cms-page={page.path}>
      {!hasHero && page.title && (
        <div className="cmsb-hero d-gradient cmsb-hero--auto"><div className="cmsb-in"><HeroH1>{page.title}</HeroH1>{page.description && <p className="cmsb-lead">{page.description}</p>}</div></div>
      )}
      <CmsBlocks blocks={blocks} />
    </div>
  );
}

export { CmsBlocks, CmsPage, cmsMountBlocks };
