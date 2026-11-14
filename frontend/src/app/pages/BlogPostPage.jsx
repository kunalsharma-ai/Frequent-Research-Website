import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link, useParams } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { BLOG_AUTHOR, BLOG_POSTS, findBlogPost } from '../data/blogPosts.jsx';
import { CONTACT } from '../data/site.jsx';
import { findVertical } from '../data/products.jsx';
import { useJsonLd } from '../home/HeroParts.jsx';
import { RC_I } from '../shared/Reveal.jsx';
import { BV_ICONS } from '../shared/BlogCovers.jsx';
import { FaqList } from './VerticalPage.jsx';
import { NotFoundPage, usePageMeta } from '../SiteApp.jsx';
import { BlogCover } from '../../components/site/BlogCover.jsx';

function RichText({ text }) {
  const e = [],
    a = /\[([^\]]+)\]\(([^)]+)\)/g;
  let n = 0,
    s,
    i = 0;
  for (; (s = a.exec(text)); ) {
    if (s.index > n) e.push(text.slice(n, s.index));
    const [, o, r] = s;
    e.push(
      r.startsWith("/") ? (
        <Link to={r} key={i++}>
          {o}
        </Link>
      ) : /^https?:/.test(r) ? (
        <a href={r} target="_blank" rel="noopener noreferrer" className="ext" key={i++}>
          {o}
        </a>
      ) : (
        <a href={r} key={i++}>
          {o}
        </a>
      ),
    );
    n = a.lastIndex;
  }
  if (n < text.length) e.push(text.slice(n));
  return <>{e}</>;
}
const blogSlug = (t) =>
    t
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  BLOG_FORM_KEY = {
    "market-research": "feasibility",
    "digital-marketing": "digital",
    "it-development": "it",
    "accounts-finance": "finance",
  };
function BlogFigure({ f }) {
  return <BV_Figure f={f} />;
}
function BlogPostPage() {
  var v;
  const { slug } = useParams(),
    e = findBlogPost(slug),
    [a, n] = ee.useState(0),
    [s, i] = ee.useState(false);
  if (
    (usePageMeta(e ? e.metaTitle : "Not found", e == null ? undefined : e.description),
    useJsonLd(
      `post-${slug}`,
      e && {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting",
            headline: e.title,
            description: e.description,
            datePublished: e.date,
            dateModified: e.date,
            wordCount: e.words,
            keywords: e.keywords.join(", "),
            author: {
              "@type": "Organization",
              name: "Frequent Research",
            },
            publisher: {
              "@type": "Organization",
              name: "Frequent Research",
            },
            mainEntityOfPage: `${location.origin}/blog/${e.slug}`,
          },
          {
            "@type": "FAQPage",
            mainEntity: e.faqs.map((w) => ({
              "@type": "Question",
              name: w.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: w.a,
              },
            })),
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${location.origin}/`,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: `${location.origin}/blog`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: e.title,
              },
            ],
          },
        ],
      },
    ),
    ee.useEffect(() => {
      const w = () => {
        const B = document.querySelector(".bpost__article");
        if (!B) return;
        const y = B.getBoundingClientRect();
        n(Math.min(100, Math.max(0, (-y.top / (y.height - window.innerHeight)) * 100)));
      };
      w();
      window.addEventListener("scroll", w, {
        passive: true,
      });
      return () => window.removeEventListener("scroll", w);
    }, [slug]),
    !e)
  )
    return <NotFoundPage />;
  const o = findVertical(e.vertical),
    r = BLOG_POSTS.findIndex((w) => w.slug === e.slug),
    c = BLOG_POSTS[(r + 1) % BLOG_POSTS.length],
    d = BLOG_POSTS.filter((w) => w.slug !== e.slug),
    u = typeof window < "u" ? window.location.href : "",
    p = encodeURIComponent(u),
    g = () => {
      var w;
      if (!((w = navigator.clipboard) == null)) w.writeText(u);
      i(true);
      setTimeout(() => i(false), 1800);
    },
    A = Math.min(4, e.sections.length - 1);
  return (
    <div className={`bpost tone-${o.color}`}>
      <div className="readbar" aria-hidden="true">
        <span
          style={{
            width: `${a}%`,
          }}
        />
      </div>
      <header className="bpost__hero">
        <div className="container">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>
              <Link to="/blog">Blog</Link>
            </span>
            <span>
              <span aria-current="page">{o.name}</span>
            </span>
          </nav>
          <span className="pill">
            {o.icon} {o.name}
          </span>
          <HeroH1>{e.title}</HeroH1>
          <p className="bpost__desc">{e.description}</p>
          <div className="bpost__meta">
            <span className="bpost__avatar" aria-hidden="true">
              FR
            </span>
            <span>
              <strong>{BLOG_AUTHOR.name}</strong>
              <small>
                {new Date(e.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                {" · "}
                {e.readTime}
                {" min read"}
              </small>
            </span>
          </div>
        </div>
        <div className="container">
          <BlogCover post={e} size="hero" />
        </div>
      </header>
      <section className="section">
        <div className="container bpost__layout">
          <aside className="bpost__side">
            <nav className="toc" aria-label="Contents">
              <h2>In this article</h2>
              <ol>
                {e.sections.map((w) => (
                  <li key={w.h}>
                    <a href={`#${blogSlug(w.h)}`}>{w.h}</a>
                  </li>
                ))}
                <li>
                  <a href="#faqs">FAQs</a>
                </li>
              </ol>
            </nav>
            <div className="bpost__share">
              <h2>Share</h2>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${p}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(e.title + " " + u)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${p}&text=${encodeURIComponent(e.title)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                X
              </a>
              <button onClick={g}>{s ? "Copied ✓" : "Copy link"}</button>
            </div>
          </aside>
          <article className="article bpost__article">
            <BV_Takeaways items={e.takeaways} />
            {e.sections.map((w, B) => {
              var y, k;
              return (
                <section id={blogSlug(w.h)} key={w.h}>
                  <h2>{w.h}</h2>
                  {(y = w.p) == null
                    ? undefined
                    : y.map((x, S) => (
                        <p key={S}>
                          {l.jsx(RichText, {
                            text: x,
                          })}
                        </p>
                      ))}
                  {w.list && <BV_List items={w.list} Txt={RichText} />}
                  {w.figure &&
                    l.jsx(BlogFigure, {
                      f: w.figure,
                    })}
                  {(k = w.after) == null
                    ? undefined
                    : k.map((x, S) => (
                        <p key={`a${S}`}>
                          {l.jsx(RichText, {
                            text: x,
                          })}
                        </p>
                      ))}
                  {w.callout && (
                    <aside className="callout">
                      <strong>{w.callout.t}</strong>
                      <p>{w.callout.d}</p>
                    </aside>
                  )}
                  {B === A && (
                    <aside className="midcta">
                      <div>
                        <strong>
                          {"Talk to our "}
                          {o.name}
                          {" team"}
                        </strong>
                        <p>Get honest advice on your situation, usually within one working day.</p>
                      </div>
                      <Link className="btn btn--light" to={`/lets-talk?type=${BLOG_FORM_KEY[o.slug]}`}>
                        Book a free consultation
                      </Link>
                    </aside>
                  )}
                </section>
              );
            })}
            <section id="faqs">
              <h2>Frequently asked questions</h2>
              {l.jsx(FaqList, {
                items: e.faqs,
              })}
            </section>
            <section className="bpost__services">
              <h2>
                {"Explore our "}
                {o.name}
                {" services"}
              </h2>
              <div className="related-links">
                <Link to={`/services/${o.slug}`}>
                  <strong>
                    {o.name}
                    {" overview"}
                  </strong>
                </Link>
                {o.services.map((w) => (
                  <Link to={`/services/${o.slug}/${w.slug}`} key={w.slug}>
                    {w.name}
                  </Link>
                ))}
              </div>
            </section>
            {((v = e.sources) == null ? undefined : v.length) > 0 && (
              <section className="bpost__sources">
                <h2>Useful external resources</h2>
                <ul>
                  {e.sources.map((w) => (
                    <li key={w.url}>
                      <a href={w.url} target="_blank" rel="noopener noreferrer">
                        {w.label}
                        {" ↗"}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="authorbox">
              <span className="bpost__avatar bpost__avatar--lg" aria-hidden="true">
                FR
              </span>
              <div>
                <strong>{BLOG_AUTHOR.name}</strong>
                <p>
                  {BLOG_AUTHOR.role}
                  {". Questions about this article? Email "}
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
                </p>
              </div>
            </div>
            <Link to={`/blog/${c.slug}`} className="nextpost">
              <span>Next article</span>
              <strong>{c.title}</strong>
            </Link>
          </article>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <h2>Keep reading</h2>
          </div>
          <div className="bgrid bgrid--3">
            {d.map((w) => (
              <Link to={`/blog/${w.slug}`} className="bcard" key={w.slug}>
                <BlogCover post={w} size="sm" label={false} />
                <div className="bcard__body">
                  <span className="pill">{findVertical(w.vertical).name}</span>
                  <h3>{w.title}</h3>
                  <span className="bmeta">
                    {w.readTime}
                    {" min read"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
function bvIcons(items) {
  const used = new Set(),
    pool = ["check", "layers", "target", "bulb", "grid", "flag", "award", "sliders", "map", "box", "tag", "help"];
  return items.map((t) => {
    const hits = BV_ICONS.filter(([re]) => re.test(t)).map(([, ic2]) => ic2);
    let ic = hits.find((h) => !used.has(h)) || pool.find((h) => !used.has(h)) || hits[0] || "check";
    used.add(ic);
    return ic;
  });
}
function bvUseIn() {
  const ref = ee.useRef(null),
    [v, setV] = ee.useState(false);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setV(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es[0].isIntersecting) {
          setV(true);
          io.disconnect();
        }
      },
      {
        threshold: 0.2,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, v];
}
function BV_Figure({ f }) {
  const [ref, v] = bvUseIn();
  if (f.type === "image" && f.src) {
    return (
      <figure className="bfig bv-media" ref={ref}>
        <picture>
          {f.srcsetWebp && <source type="image/webp" srcSet={f.srcsetWebp} sizes="(max-width: 900px) 100vw, 760px" />}
          <img
            src={f.src}
            srcSet={f.srcset}
            sizes="(max-width: 900px) 100vw, 760px"
            alt={f.alt || f.title || ""}
            width={f.width}
            height={f.height}
            loading="lazy"
            decoding="async"
          />
        </picture>
        {f.title && <figcaption>{f.title}</figcaption>}
      </figure>
    );
  }
  if (f.type === "video" && f.src) {
    return (
      <figure className="bfig bv-media" ref={ref}>
        <video
          controls={!f.loop}
          muted={!!f.loop}
          autoPlay={!!f.loop && v}
          loop={!!f.loop}
          playsInline
          preload="none"
          poster={f.poster}
          width={f.width}
          height={f.height}
        >
          {f.webm && <source src={f.webm} type="video/webm" />}
          <source src={f.src} type="video/mp4" />
        </video>
        {f.title && <figcaption>{f.title}</figcaption>}
      </figure>
    );
  }
  if (f.type === "process") {
    const pic = bvIcons(f.steps);
    return (
      <figure
        className={"bfig bv-proc" + (v ? " is-in" : "")}
        ref={ref}
        style={{
          "--n": f.steps.length,
        }}
      >
        <figcaption>
          <span className="bv-fk">
            <RC_I n="loop" s={14} />
            Process
          </span>
          {f.title}
        </figcaption>
        <ol>
          {f.steps.map((s, i) => (
            <li
              key={s}
              style={{
                "--i": i,
              }}
            >
              <span className="bv-proc__ic">
                <RC_I n={pic[i]} s={20} />
              </span>
              <span className="bv-proc__n">{String(i + 1).padStart(2, "0")}</span>
              <strong>{s}</strong>
            </li>
          ))}
        </ol>
      </figure>
    );
  }
  const cic = bvIcons(f.rows.map((x) => x[0]));
  return (
    <figure className={"bfig bv-cmp" + (v ? " is-in" : "")} ref={ref}>
      <figcaption>
        <span className="bv-fk">
          <RC_I n="scale" s={14} />
          Comparison
        </span>
        {f.title}
      </figcaption>
      <div className="bv-cmp__t" role="table" aria-label={f.title}>
        <div role="row" className="bv-cmp__h">
          <span role="columnheader" />
          <span role="columnheader" className="bv-cmp__a">
            {f.cols[0]}
          </span>
          <span role="columnheader" className="bv-cmp__b">
            {f.cols[1]}
          </span>
        </div>
        {f.rows.map(([k, a, b], i) => (
          <div
            role="row"
            key={k}
            style={{
              "--i": i,
            }}
          >
            <strong role="rowheader">
              <RC_I n={cic[i]} s={15} />
              {k}
            </strong>
            <span role="cell">{a}</span>
            <span role="cell">{b}</span>
          </div>
        ))}
      </div>
    </figure>
  );
}
function BV_List({ items, Txt }) {
  const [ref, v] = bvUseIn();
  const ics = bvIcons(items);
  return (
    <ul className={"ticks bv-list" + (v ? " is-in" : "") + (items.length > 6 ? " bv-list--dense" : "")} ref={ref}>
      {items.map((x, i) => (
        <li
          key={x}
          style={{
            "--i": i,
          }}
        >
          <span className="bv-list__ic" aria-hidden="true">
            <RC_I n={ics[i]} s={17} />
          </span>
          <span>
            <Txt text={x} />
          </span>
        </li>
      ))}
    </ul>
  );
}
function BV_Takeaways({ items }) {
  const [ref, v] = bvUseIn();
  const ics = bvIcons(items);
  return (
    <div className={"takeaways bv-take" + (v ? " is-in" : "")} ref={ref}>
      <h2>
        <RC_I n="bulb" s={20} />
        Key takeaways
      </h2>
      <ol>
        {items.map((w, i) => (
          <li
            key={w}
            style={{
              "--i": i,
            }}
          >
            <span className="bv-take__n">{i + 1}</span>
            <span className="bv-take__ic">
              <RC_I n={ics[i]} s={18} />
            </span>
            <p>{w}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export { BlogCover, BlogPostPage, RichText };
