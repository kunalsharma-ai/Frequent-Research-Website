/*
 * Build 70: the red YouTube button plays the video of the page you are on (Kunal, 6 Nov: "every web page has its own
 * video … different design for each web page … attractive presentation when somebody clicks the YouTube button").
 * Prefix PV_ / pv- (styles: styles/pagevideo69.css).
 *
 * The list of pages, their links, designs and texts is data/PageVideos69.jsx, edited in the super admin under
 * "Page videos". The page's own video wins; while a page section with its own video is on screen (About us → Mission &
 * vision) that one is shown; a page without a link of its own plays its parent page's video, then the home video.
 * The player is YouTube's privacy-enhanced embed, loaded only when the visitor presses play.
 * Loops animate transform/opacity only; everything stops for reduced motion.
 */
import * as ee from 'react';
import * as ci from 'react-dom';
import { Link } from 'react-router-dom';
import { PV_LIST, PV_SCENES } from '../../data/PageVideos69.jsx';

const PV_CHANNEL = "https://www.youtube.com/@frequentresearch";

/* any YouTube link (youtu.be, watch?v=, shorts, embed, live) or a bare 11-character id -> { id, start, tall } */
function pvYt(u) {
  u = String(u || "").trim();
  if (/^[\w-]{11}$/.test(u)) return { id: u, start: 0, tall: false };
  try {
    const x = new URL(u);
    const h = x.hostname.replace(/^(www|m|music)\./, "");
    let id = "";
    if (h === "youtu.be") id = x.pathname.slice(1).split("/")[0];
    else if (/^youtube(-nocookie)?\.com$/.test(h)) {
      id = x.searchParams.get("v") || "";
      if (!id) {
        const m = x.pathname.match(/\/(embed|shorts|live|v)\/([\w-]{11})/);
        if (m) id = m[2];
      }
    }
    if (!/^[\w-]{11}$/.test(id)) return null;
    const t = String(x.searchParams.get("t") || x.searchParams.get("start") || "");
    const tm = t.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s?)?$/);
    const start = tm ? (+tm[1] || 0) * 3600 + (+tm[2] || 0) * 60 + (+tm[3] || 0) : 0;
    return { id, start, tall: /\/shorts\//.test(x.pathname) };
  } catch (e) {
    return null;
  }
}
const pvNorm = (p) => (String(p || "/").split(/[?#]/)[0].replace(/\/+$/, "") || "/").toLowerCase();
const pvHit = (e, p) => {
  const ep = pvNorm(e.path);
  return ep === p || (e.match === "prefix" && ep !== "/" && p.startsWith(ep + "/"));
};
const pvOk = (e) => e && e.path && e.show !== false && pvYt(e.url);
const pvInView = (sel) => {
  let el = null;
  try {
    el = sel ? document.querySelector(sel) : null;
  } catch (e) {}
  if (!el) return false;
  const s = el.closest("section") || el;
  const r = s.getBoundingClientRect();
  return r.top < innerHeight * 0.6 && r.bottom > innerHeight * 0.35;
};
/* the entries with a video for this path: [the one to show, …the others on the same page] */
function pvForPath(path) {
  const list = PV_LIST.filter(pvOk);
  let p = pvNorm(path);
  for (;;) {
    const here = list.filter((e) => pvHit(e, p)).sort((a, b) => (a.match === "exact" ? 0 : 1) - (b.match === "exact" ? 0 : 1) || pvNorm(b.path).length - pvNorm(a.path).length);
    if (here.length) {
      const sec = here.find((e) => e.section && pvInView(e.section));
      const main = sec || here.find((e) => !e.section) || here[0];
      return [main, ...here.filter((e) => e !== main)];
    }
    if (p === "/") break;
    p = p.slice(0, p.lastIndexOf("/")) || "/";
  }
  const home = list.find((e) => pvNorm(e.path) === "/");
  return home ? [home] : [];
}

/* Build 83.2 (Kunal, 22 Nov): ONE video per page for the red YouTube button and the "Watch this page" section at the
   bottom, so both always play exactly the same video. Order: the super admin's Page video component
   (GET /api/v1/page-videos?page=…), then the page's entry in Super admin → Page videos. Section videos (e.g. the
   mission video on About us) stay as "Also on this page" in the pop-up. One request per page (cached). */
const pvApiCache = new Map();
function pvApi(path) {
  const p = pvNorm(path);
  if (!pvApiCache.has(p)) {
    pvApiCache.set(p, typeof fetch === "undefined" ? Promise.resolve(null) : fetch("/api/v1/page-videos?page=" + encodeURIComponent(p), { credentials: "omit" })
      .then((r) => (r.ok && /json/.test(r.headers.get("content-type") || "") ? r.json() : null))
      .catch(() => null));
  }
  return pvApiCache.get(p);
}
function pvMainOf(list) { return list.find((e) => !e.section) || list[0] || null; }
/* → { list: [entry to play, …others on the page], video: { url, title, description } | null, api } */
async function pvPageVideo(path) {
  const api = await pvApi(path);
  const all = pvForPath(path);
  const main = pvMainOf(all);
  const others = all.filter((e) => e !== main);
  const av = api && api.video && api.video.url && pvYt(api.video.url) ? api.video : null;
  if (av) {
    const e = main ? { ...main, url: av.url } : { id: "page", page: av.title || "This page", path, match: "exact", url: av.url, template: "spotlight", title: av.title || "", lede: av.description || "", points: [], cta: { label: "", to: "" } };
    return { list: [e, ...others], video: av, api };
  }
  return { list: main ? [main, ...others] : [], video: main ? { url: main.url, title: "", description: main.lede || "" } : null, api };
}

function PV_Logo({ s = 26 }) {
  return (
    <svg viewBox="0 0 28 20" width={s} height={(s * 20) / 28} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="28" height="20" rx="5.5" fill="#fff" />
      <path d="M11 5.6v8.8l7.6-4.4z" fill="#E62117" />
    </svg>
  );
}
const PV_PlayIco = ({ s = 34 }) => (
  <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true">
    <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
  </svg>
);

/* the screen: the poster (YouTube's own thumbnail) until play, then the player */
function PV_Player({ yt, title, eyebrow }) {
  const [play, setPlay] = ee.useState(false);
  const [hq, setHq] = ee.useState(false);
  ee.useEffect(() => setPlay(false), [yt.id]);
  return (
    <div className={"pv-screen" + (yt.tall ? " is-tall" : "")}>
      {play ? (
        <iframe
          key={yt.id}
          title={title}
          src={"https://www.youtube-nocookie.com/embed/" + encodeURIComponent(yt.id) + "?autoplay=1&rel=0&modestbranding=1&playsinline=1" + (yt.start ? "&start=" + yt.start : "")}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <button type="button" className="pv-poster" onClick={() => setPlay(true)} aria-label={"Play the video: " + title}>
          <img
            src={"https://i.ytimg.com/vi/" + encodeURIComponent(yt.id) + (hq ? "/hqdefault.jpg" : "/maxresdefault.jpg")}
            alt=""
            onLoad={(e) => !hq && e.currentTarget.naturalWidth < 200 && setHq(true)}
            onError={(e) => (hq ? (e.currentTarget.style.visibility = "hidden") : setHq(true))}
          />
          <span className="pv-poster__play">
            <i />
            <i />
            <PV_PlayIco />
          </span>
          <span className="pv-poster__t">
            <small>{eyebrow || "Watch"}</small>
            {title}
          </span>
        </button>
      )}
    </div>
  );
}

/* the decoration behind each design (aria-hidden) */
function PV_Deco({ t }) {
  const n = (k) => Array.from({ length: k }, (_, i) => i);
  switch (t) {
    case "premiere":
      return (
        <>
          <i className="pv-curt pv-curt--l" />
          <i className="pv-curt pv-curt--r" />
          <i className="pv-spot" />
          <span className="pv-bulbs">{n(26).map((i) => <b key={i} style={{ "--i": i }} />)}</span>
        </>
      );
    case "briefing":
      return (
        <>
          <i className="pv-grid" />
          <i className="pv-sweep" />
        </>
      );
    case "studio":
      return (
        <>
          <i className="pv-wall" />
          <i className="pv-lamp" />
        </>
      );
    case "horizon":
      return (
        <>
          {n(4).map((i) => <i key={i} className="pv-ring" style={{ "--i": i }} />)}
          <i className="pv-star" />
        </>
      );
    case "filmstrip":
      return (
        <>
          <i className="pv-grain" />
          <i className="pv-projector" />
        </>
      );
    case "backstage":
      return (
        <>
          <i className="pv-truss" />
          {n(3).map((i) => <i key={i} className="pv-cone" style={{ "--i": i }} />)}
        </>
      );
    case "scanner":
      return (
        <>
          <i className="pv-dots" />
          {n(6).map((i) => <i key={i} className="pv-qr" style={{ "--i": i }} />)}
        </>
      );
    case "bubbles":
      return (
        <>
          {n(7).map((i) => <i key={i} className="pv-bub" style={{ "--i": i }} />)}
        </>
      );
    case "gift":
      return (
        <>
          {n(9).map((i) => <i key={i} className="pv-coin" style={{ "--i": i }} />)}
          <i className="pv-shine" />
        </>
      );
    case "pulse":
      return (
        <>
          <span className="pv-ecg">
            <svg viewBox="0 0 600 80" preserveAspectRatio="none">
              <path d="M0 40h120l14-22 16 50 18-62 16 50 10-16h106l14-22 16 50 18-62 16 50 10-16h106l14-22 16 50 18-62 16 50 10-16h30" />
            </svg>
            <svg viewBox="0 0 600 80" preserveAspectRatio="none">
              <path d="M0 40h120l14-22 16 50 18-62 16 50 10-16h106l14-22 16 50 18-62 16 50 10-16h106l14-22 16 50 18-62 16 50 10-16h30" />
            </svg>
          </span>
          <i className="pv-cross" />
        </>
      );
    case "campaign":
      return (
        <>
          <i className="pv-grid" />
          {n(5).map((i) => <i key={i} className="pv-heart" style={{ "--i": i }} />)}
        </>
      );
    default:
      return (
        <>
          <i className="pv-spot" />
          <i className="pv-floor" />
        </>
      );
  }
}

/* a point: "2015 · text" shows the year as its label, otherwise the number */
const pvPoint = (p, i) => {
  const m = String(p).match(/^\s*([^·]{1,14}?)\s*·\s*(.+)$/);
  return m ? [m[1], m[2]] : [String(i + 1).padStart(2, "0"), String(p)];
};


/* ---- build 70b: scene designs for the service pages (and any page the admin gives them to) ----
   Each scene is a small animated "prop" next to the screen that shows what the service does. The service pages get
   a scene that fits the service, their family's colours (research, marketing, IT, finance) in their own shade, and
   their own words. */

const pvN = (k) => Array.from({ length: k }, (_, i) => i);
function PV_Prop({ s, e }) {
  const P = (cls, kids) => <div className={"pv-prop pv-prop--" + cls} aria-hidden="true">{kids}</div>;
  const pts = (Array.isArray(e.points) ? e.points : []).filter(Boolean);
  const w = (i) => ({ "--i": i });
  switch (s) {
    case "survey": return P(s, <><b className="pv-prop__t">Q{(e.title || "").length % 9 + 3}. Your answer</b>{pvN(4).map((i) => <span key={i} style={w(i)}><i />{["Very likely", "Likely", "Not sure", "Unlikely"][i]}</span>)}</>);
    case "chart": return P(s, <>{pvN(6).map((i) => <i key={i} style={{ "--i": i, "--h": [.35, .55, .45, .7, .62, .9][i] }} />)}<b className="pv-prop__t">Insight ↑</b></>);
    case "globe": return P(s, <><span className="pv-prop__ball">{pvN(5).map((i) => <i key={i} style={w(i)} />)}</span><b className="pv-prop__t">55 countries</b></>);
    case "voice": return P(s, <><span className="pv-prop__mic" />{pvN(14).map((i) => <i key={i} style={w(i)} />)}</>);
    case "lens": return P(s, <><span className="pv-prop__grid">{pvN(24).map((i) => <i key={i} className={i % 7 === 3 ? "is-bad" : ""} />)}</span><span className="pv-prop__glass" /></>);
    case "report": return P(s, <>{pvN(3).map((i) => <span key={i} style={w(i)}><b />{pvN(4).map((j) => <i key={j} />)}</span>)}</>);
    case "serp": return P(s, <><span className="pv-prop__q">🔍 {(e.title || "").toLowerCase().slice(0, 22)}</span>{pvN(3).map((i) => <span key={i} style={w(i)} className={i === 0 ? "is-top" : ""}><b>{i + 1}</b><i /></span>)}</>);
    case "funnel": return P(s, <>{pvN(4).map((i) => <i key={i} style={w(i)}>{["Reach", "Visits", "Leads", "Sales"][i]}</i>)}</>);
    case "inbox": return P(s, <><span className="pv-prop__env" />{pvN(3).map((i) => <span key={i} style={w(i)}><b />{i === 0 ? <em>New</em> : null}</span>)}</>);
    case "chat": return P(s, <>{pvN(4).map((i) => <span key={i} style={w(i)} className={i % 2 ? "is-me" : ""}>{["Hi! 👋", "Is it available?", "Yes, sending details", "Thank you!"][i]}</span>)}</>);
    case "calendar": return P(s, <><b className="pv-prop__t">This month</b><span className="pv-prop__cal">{pvN(21).map((i) => <i key={i} className={[2, 6, 9, 13, 17, 19].includes(i) ? "is-on" : ""} style={w(i)} />)}</span></>);
    case "stars": return P(s, <><span className="pv-prop__stars">{pvN(5).map((i) => <i key={i} style={w(i)}>★</i>)}</span><b className="pv-prop__t">“Great work, fast replies.”</b></>);
    case "gauge": return P(s, <><span className="pv-prop__dial"><i /></span><b className="pv-prop__t">Score 92</b></>);
    case "social": return P(s, <><span className="pv-prop__av" /><b className="pv-prop__t">♥ 2.4k · ↗ 310</b>{pvN(3).map((i) => <i key={i} className="pv-prop__heart" style={w(i)} />)}</>);
    case "code": return P(s, <><span className="pv-prop__dots"><i /><i /><i /></span>{pvN(6).map((i) => <span key={i} style={{ "--i": i, "--w": [.6, .82, .45, .7, .9, .38][i] }}><i /></span>)}</>);
    case "browser": return P(s, <><span className="pv-prop__dots"><i /><i /><i /></span><span className="pv-prop__hero" />{pvN(3).map((i) => <i key={i} style={w(i)} />)}</>);
    case "phone": return P(s, <><span className="pv-prop__notch" />{pvN(4).map((i) => <i key={i} style={w(i)} />)}<span className="pv-prop__tab" /></>);
    case "cloud": return P(s, <><span className="pv-prop__cloud" />{pvN(3).map((i) => <i key={i} style={w(i)} />)}</>);
    case "shield": return P(s, <><span className="pv-prop__sh">✓</span>{pvN(2).map((i) => <i key={i} className="pv-prop__ring" style={w(i)} />)}</>);
    case "bot": return P(s, <><span className="pv-prop__face"><i /><i /></span><span className="pv-prop__say">How can I help?</span><span className="pv-prop__typing">{pvN(3).map((i) => <i key={i} style={w(i)} />)}</span></>);
    case "tests": return P(s, <>{(pts.length ? pts : ["Login", "Checkout", "Search", "Forms"]).slice(0, 4).map((x, i) => <span key={i} style={w(i)}><i>✓</i>{String(x).slice(0, 24)}</span>)}</>);
    case "flow": return P(s, <>{pvN(3).map((i) => <span key={i} className="pv-prop__node">{["Source", "Clean", "Store"][i]}</span>)}{pvN(4).map((i) => <i key={i} className="pv-prop__pkt" style={w(i)} />)}</>);
    case "ledger": return P(s, <><b className="pv-prop__t">Ledger</b>{pvN(5).map((i) => <span key={i} style={w(i)}><i /><em>{["12,400", "3,150", "8,920", "1,200", "25,670"][i]}</em></span>)}</>);
    case "calc": return P(s, <><span className="pv-prop__screen">25,670.00</span><span className="pv-prop__keys">{pvN(12).map((i) => <i key={i} />)}</span><span className="pv-prop__roll">{pvN(4).map((i) => <i key={i} style={w(i)} />)}</span></>);
    case "pie": return P(s, <><span className="pv-prop__pie" />{pvN(3).map((i) => <i key={i} style={w(i)} />)}</>);
    case "taxform": return P(s, <><b className="pv-prop__t">Return filed</b>{pvN(4).map((i) => <span key={i} style={w(i)}><i /></span>)}<em className="pv-prop__stamp">Filed ✓</em></>);
    case "coins": return P(s, <>{pvN(4).map((i) => <span key={i} style={{ "--i": i, "--n": i + 2 }}>{pvN(i + 2).map((j) => <i key={j} />)}</span>)}</>);
    case "payslip": return P(s, <><b className="pv-prop__t">Payslip · this month</b>{pvN(3).map((i) => <span key={i} style={w(i)}><i /><em>{["Basic", "Allowances", "Net pay"][i]}</em></span>)}<span className="pv-prop__paid">Paid ✓</span></>);
    default: return null;
  }
}

function PV_Stage({ t, e, yt }) {
  const title = [e.title, e.em].filter(Boolean).join(" ");
  const player = <PV_Player yt={yt} title={title} eyebrow={e.eyebrow} />;
  switch (t) {
    case "premiere":
      return (
        <div className="pv-stage">
          <div className="pv-marquee" aria-hidden="true">
            <span>Now showing</span>
          </div>
          {player}
        </div>
      );
    case "briefing":
      return (
        <div className="pv-stage">
          <span className="pv-rec" aria-hidden="true">
            <i /> Briefing
          </span>
          {player}
          <span className="pv-stamp" aria-hidden="true">
            Approved
            <small>Frequent Research</small>
          </span>
        </div>
      );
    case "studio":
      return (
        <div className="pv-stage">
          <div className="pv-polaroid">
            <i className="pv-tape pv-tape--a" aria-hidden="true" />
            <i className="pv-tape pv-tape--b" aria-hidden="true" />
            {player}
            <span className="pv-polaroid__cap">{e.eyebrow}</span>
          </div>
        </div>
      );
    case "filmstrip":
      return (
        <div className="pv-stage">
          <div className="pv-film">
            <i className="pv-holes pv-holes--t" aria-hidden="true" />
            {player}
            <i className="pv-holes pv-holes--b" aria-hidden="true" />
          </div>
        </div>
      );
    case "scanner":
      return (
        <div className="pv-stage">
          <div className="pv-scan">
            {["tl", "tr", "bl", "br"].map((k) => <i key={k} className={"pv-corner pv-corner--" + k} aria-hidden="true" />)}
            <i className="pv-line" aria-hidden="true" />
            {player}
          </div>
        </div>
      );
    case "bubbles":
      return (
        <div className="pv-stage">
          <div className="pv-speech">{player}</div>
        </div>
      );
    case "gift":
      return (
        <div className="pv-stage">
          <div className="pv-box">
            <i className="pv-ribbon pv-ribbon--v" aria-hidden="true" />
            <i className="pv-ribbon pv-ribbon--h" aria-hidden="true" />
            <i className="pv-bow" aria-hidden="true">
              <b />
              <b />
            </i>
            {player}
          </div>
        </div>
      );
    case "campaign":
      return (
        <div className="pv-stage">
          <div className="pv-post">
            <div className="pv-post__h" aria-hidden="true">
              <img src="/favicon.png" alt="" width="34" height="34" />
              <span>
                <b>Frequent Research</b>
                <small>Sponsored · {e.eyebrow}</small>
              </span>
              <i>•••</i>
            </div>
            {player}
            <div className="pv-post__f" aria-hidden="true">
              <span>♥ Like</span>
              <span>💬 Comment</span>
              <span>↗ Share</span>
            </div>
          </div>
          <div className="pv-kpis" aria-hidden="true">
            {[
              ["Reach", 86],
              ["Clicks", 64],
              ["Leads", 48],
            ].map(([k, w], i) => (
              <span key={k} style={{ "--i": i, "--w": w / 100 }}>
                <b>{k}</b>
                <i />
              </span>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div className="pv-stage">
          {player}
          {PV_SCENES[t] ? <PV_Prop s={t} e={e} /> : null}
        </div>
      );
  }
}

function PV_Info({ t, e, onClose, others, onPick }) {
  const pts = Array.isArray(e.points) ? e.points.filter(Boolean) : [];
  const cta = e.cta && e.cta.label && e.cta.to ? e.cta : null;
  const ext = cta && /^https?:/i.test(cta.to);
  const L = Link;
  const body = (
    <>
      <span className="pv-eye">
        <PV_Logo s={18} /> {e.eyebrow || e.page}
      </span>
      <h2 id="pv-h" className="pv-h">
        {e.title} {e.em ? <em>{e.em}</em> : null}
      </h2>
      {e.lede ? <p className="pv-lede">{e.lede}</p> : null}
      {pts.length ? (
        <ul className="pv-pts">
          {pts.map((p, i) => {
            const [b, s] = pvPoint(p, i);
            return (
              <li key={i} style={{ "--i": i }}>
                <b>{b}</b>
                <span>{s}</span>
              </li>
            );
          })}
        </ul>
      ) : null}
      <div className="pv-cta">
        {cta ? (
          ext ? (
            <a className="pv-btn pv-btn--main" href={cta.to} target="_blank" rel="noopener noreferrer">
              {cta.label} →
            </a>
          ) : (
            <L className="pv-btn pv-btn--main" to={cta.to} onClick={onClose}>
              {cta.label} →
            </L>
          )
        ) : null}
        <a className="pv-btn pv-btn--yt" href={PV_CHANNEL} target="_blank" rel="noopener noreferrer">
          <PV_Logo s={20} /> Subscribe
        </a>
        {onClose ? (
          <button type="button" className="pv-btn pv-btn--yt pv-btn--here" onClick={() => { onClose(); const h = document.querySelector(".w828-host"); h && setTimeout(() => h.scrollIntoView({ behavior: "smooth", block: "start" }), 60); }}>
            ↓ Same video at the bottom of this page
          </button>
        ) : null}
      </div>
      {others.length ? (
        <div className="pv-more">
          <small>Also on this page</small>
          {others.map((o) => (
            <button key={o.id} type="button" onClick={() => onPick(o)}>
              <PV_PlayIco s={14} /> {o.page}
            </button>
          ))}
        </div>
      ) : null}
    </>
  );
  if (t === "backstage")
    return (
      <div className="pv-info">
        <div className="pv-lanyard" aria-hidden="true" />
        <div className="pv-pass">
          <span className="pv-pass__hole" aria-hidden="true" />
          <span className="pv-pass__tag" aria-hidden="true">
            Crew pass · All access
          </span>
          {body}
        </div>
      </div>
    );
  if (t === "briefing")
    return (
      <div className="pv-info">
        <div className="pv-file">
          <span className="pv-file__tab" aria-hidden="true">
            Case file
          </span>
          {body}
        </div>
      </div>
    );
  return <div className="pv-info">{body}</div>;
}

function PV_Theatre({ list, onClose }) {
  const [cur, setCur] = ee.useState(list[0]);
  const box = ee.useRef(null);
  ee.useEffect(() => {
    const prev = document.activeElement;
    document.documentElement.classList.add("vd21-lock");
    const k = (ev) => {
      if (ev.key === "Escape") onClose();
      if (ev.key === "Tab" && box.current) {
        const f = [...box.current.querySelectorAll("a[href],button:not([disabled]),iframe")];
        if (!f.length) return;
        const a = f[0],
          z = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === a) (ev.preventDefault(), z.focus());
        else if (!ev.shiftKey && document.activeElement === z) (ev.preventDefault(), a.focus());
      }
    };
    window.addEventListener("keydown", k);
    setTimeout(() => {
      const b = box.current && box.current.querySelector(".pv-poster");
      (b || box.current) && (b || box.current).focus();
    }, 60);
    return () => {
      document.documentElement.classList.remove("vd21-lock");
      window.removeEventListener("keydown", k);
      try {
        prev && prev.focus && prev.focus();
      } catch (e) {}
    };
  }, []);
  const e = cur;
  const yt = pvYt(e.url);
  const t = String(e.template || "spotlight");
  const others = list.filter((o) => o !== e);
  const node = (
    <div className={"pv-ov pv--" + t + (PV_SCENES[t] ? " pv--scene pv-fam--" + (e.family || "fr") + (e.flip ? " is-flip" : "") : "")} style={PV_SCENES[t] ? { "--tone": +e.tone || 0 } : undefined} data-tone={PV_SCENES[t] ? (+e.tone || 0) % 4 : undefined} role="dialog" aria-modal="true" aria-labelledby="pv-h" onMouseDown={(ev) => ev.target === ev.currentTarget && onClose()}>
      <div className="pv-deco" aria-hidden="true">
        {PV_SCENES[t] ? (
          <>
            <i className="pv-fampat" />
            <span className="pv-word">{e.title}</span>
            <span className="pv-word pv-word--2">{e.title}</span>
          </>
        ) : (
          <PV_Deco t={t} />
        )}
      </div>
      <button type="button" className="pv-x" onClick={onClose} aria-label="Close the video">
        ×
      </button>
      <div className="pv-wrap" ref={box} tabIndex={-1} key={e.id} onMouseDown={(ev) => ev.target === ev.currentTarget && onClose()}>
        <PV_Info t={t} e={e} onClose={onClose} others={others} onPick={setCur} />
        {yt ? <PV_Stage t={t} e={e} yt={yt} /> : null}
      </div>
    </div>
  );
  return ci && ci.createPortal ? ci.createPortal(node, document.body) : node;
}

export { PV_Logo, PV_SCENES, PV_Theatre, pvApi, pvForPath, pvPageVideo, pvYt };
