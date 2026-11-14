import * as ee from 'react';
import { Link } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { BLOG_POSTS } from '../data/blogPosts.jsx';
import { VERTICALS } from '../data/site.jsx';
import { findVertical } from '../data/products.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { BlogCover } from './BlogPostPage.jsx';
import { usePageMeta } from '../SiteApp.jsx';

function BlogPage() {
  usePageMeta(
    "Blog: Research, Marketing, Technology & Finance Guides",
    "In-depth guides on market research, digital marketing, software development and accounting, written by the Frequent Research team.",
  );
  const [t, e] = ee.useState("all"),
    [a, n] = ee.useState(""),
    s = ee.useMemo(
      () =>
        BLOG_POSTS.filter(
          (r) =>
            (t === "all" || r.vertical === t) &&
            (!a || `${r.title} ${r.description} ${r.keywords.join(" ")}`.toLowerCase().includes(a.toLowerCase())),
        ),
      [t, a],
    ),
    [i, ...o] = s;
  return (
    <>
      {l.jsx(PageHero, {
        title: "The Frequent Research blog",
        crumbs: [
          {
            label: "Blog",
          },
        ],
        intro:
          "Practical, in-depth guides from our research, marketing, technology and finance teams. Written to help you make better decisions, not to fill space.",
      })}
      <section className="section">
        <div className="container">
          <div className="blog-tools">
            <div className="filters" role="group" aria-label="Filter by topic">
              <button
                className={`filter ${t === "all" ? "is-on" : ""}`}
                aria-pressed={t === "all"}
                onClick={() => e("all")}
              >
                All topics
              </button>
              {VERTICALS.map((r) => (
                <button
                  className={`filter ${t === r.slug ? "is-on" : ""}`}
                  aria-pressed={t === r.slug}
                  onClick={() => e(r.slug)}
                  key={r.slug}
                >
                  {r.icon} {r.name}
                </button>
              ))}
            </div>
            <label className="blog-search">
              <span className="sr-only">Search articles</span>
              <input type="search" placeholder="Search articles…" value={a} onChange={(r) => n(r.target.value)} />
            </label>
          </div>
          {!i && <p className="muted">No articles match your search.</p>}
          {i && (
            <Link to={`/blog/${i.slug}`} className="bfeat">
              <BlogCover post={i} size="lg" />
              <div className="bfeat__body">
                <span className={`pill tone-${findVertical(i.vertical).color}`}>{findVertical(i.vertical).name}</span>
                <h2>{i.title}</h2>
                <p>{i.description}</p>
                <span className="bmeta">
                  {i.readTime}
                  {" min read · "}
                  {i.words.toLocaleString("en-IN")}
                  {" words"}
                </span>
              </div>
            </Link>
          )}
          <div className="bgrid">
            {o.map((r) => (
              <Link to={`/blog/${r.slug}`} className="bcard" key={r.slug}>
                <BlogCover post={r} size="sm" label={false} />
                <div className="bcard__body">
                  <span className={`pill tone-${findVertical(r.vertical).color}`}>{findVertical(r.vertical).name}</span>
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                  <span className="bmeta">
                    {r.readTime}
                    {" min read"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {l.jsx(CtaSection, {
        title: "Have a question we haven't answered?",
        text: "Ask our team directly. If it helps others too, it may become our next article.",
      })}
    </>
  );
}

export { BlogPage };
