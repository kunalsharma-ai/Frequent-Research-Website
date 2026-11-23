/*
 * Build 82.8 (Kunal, 21 Nov): at the bottom of EVERY page, its own section "Watch this whole page in one video".
 * It presents the page's YouTube video in the page's own video design (the Page video component player, the same
 * 995 unique designs as the super admin), asks the visitor to watch it to the end, and to like, subscribe, follow
 * and share on YouTube. The section around the player has its own design on every page too: 12 animated backdrops ×
 * 8 headline animations × 5 fonts × 6 action decks × 8 3D objects × 10 wordings, with the page's own colours. No two
 * pages share a combination (scripts/make-watch-data.cjs).
 *
 * Where the words and the design come from:
 *   1. GET /api/v1/page-videos?page=…  (the super admin's video and design changes win)
 *   2. /data/pv/<page>.json            (the design made for this page at build time, also used by the offline preview)
 *   3. the page's red YouTube button video (data/PageVideos69.jsx, super admin › Page videos) when 1 has no video.
 * Loaded only when the visitor scrolls near the bottom, so the first screen and PageSpeed stay the same.
 * Loops animate transform/opacity only, stop while the section is off screen, and stop for "reduce motion".
 * Prefix w828 / .w8-*. Styles: watch828.css (put on the page by this script, not in the site stylesheet).
 */
import * as ee from 'react';
import css from './watch828.css?inline';
import flagsUrl from '../assets/images/w828/flags-sprite.webp';
import dotsUrl from '../assets/images/w828/world-dots.webp';
// pvPageVideo, pvYt (components/site/PageVideo69.jsx), FRQ_Icon, FRQ_SOCIAL (pages/Connect.jsx) come in through the `kit`
// prop from app/SiteApp.jsx: those files are already in the site's main script, and importing them here would split them out of it
let pvPageVideo, pvYt, FRQ_Icon, FRQ_SOCIAL;

const CHANNEL = 'https://www.youtube.com/@frequentresearch';
const SIZES = { b: 12, h: 8, f: 5, d: 6, x: 8, c: 10 }; // keep in step with scripts/make-watch-data.cjs (pages it does not know get a combination from their address)
const BACKDROPS = ['aurora', 'stars', 'grid', 'rings', 'beams', 'waves', 'bokeh', 'mesh', 'map', 'prism', 'ribbons', 'comets'];
const HEADS = ['sweep', 'rise', 'outline', 'split', 'neon', 'ribbon', 'type', 'flip'];
const FONTS = ['unb', 'serif', 'manrope', 'inter', 'mono'];
const DECKS = ['cards', 'orbit', 'tickets', 'rail', 'stack', 'tiles'];
const OBJECTS = ['cube', 'button', 'gyro', 'reel', 'thumb', 'bell', 'clap', 'tv'];
const FOLLOW = ['linkedin', 'instagram', 'facebook', 'x'];

const key = (p) => (p === '/' ? 'home' : p.replace(/^\/+|\/+$/g, '').replace(/\//g, '--'));
const norm = (p) => (String(p || '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/').toLowerCase();
function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16; return h >>> 0; }
function comboOf(p) { let n = hash(p); const o = {}; for (const [k, s] of Object.entries(SIZES)) { o[k] = n % s; n = Math.floor(n / s); } return o; }
const getJson = (u, o) => fetch(u, o).then((r) => (r.ok && /json/.test(r.headers.get('content-type') || 'json') ? r.json() : null)).catch(() => null);

/* the page name for the words: the page title without " | Frequent Research" */
function pageName(path, t) {
  let n = (typeof document !== 'undefined' ? document.title : '').split(/\s+[|·–—]\s+/)[0].trim();
  if (!n || /^frequent research/i.test(n) || path === '/') n = path === '/' ? 'Frequent Research' : (t && t.name) || 'this page';
  // long titles (blog posts): the part before the colon, then at most ~40 characters on a word boundary
  const c = n.split(/:\s+/)[0];
  if (c.length >= 12 && c.length < n.length) n = c;
  return n.length > 42 ? n.slice(0, 40).replace(/[\s,:;&–-]+\S*$/, '').replace(/[\s,:;&–-]+$/, '') + '…' : n;
}

/* ten wordings: [eyebrow, headline before the name, the name, after, lede] */
function words(c, name, isHome) {
  const N = isHome ? 'Frequent Research' : name;
  const L = [
    ['Watch this page in one video', 'Watch the whole of', N, 'in one video', 'Short on time? This video walks you through everything on this page, step by step, in the easiest way to understand it.'],
    ['Prefer watching to reading?', 'Let the video walk you through', N, '', 'Press play and see everything on this page explained clearly, from the first idea to the last detail.'],
    ['Video tour of this page', N, '', 'explained in one easy video', 'All the key points of this page in one place: clear, visual and easy to follow on any screen.'],
    ['Press play for the full picture', 'See', N, 'come to life', 'Everything you just scrolled through, brought together in one video so nothing is missed.'],
    ['The easiest way to understand it', 'Get total clarity on', N, 'in minutes', 'Watch the complete video for the clearest, quickest way to understand what this page offers you.'],
    ['One video. The whole page.', 'Your guided video tour of', N, '', 'Sit back and let us show you around: every section of this page, explained by the people who do the work.'],
    ['Watch it to the end', 'Everything about', N, 'in a single video', 'Watch the whole video to the end: the last part brings it all together and shows what to do next.'],
    ['Seeing is understanding', 'Watch', N, 'unfold on screen', 'Charts, examples and clear explanations: the video turns this page into something you can see.'],
    ['Your shortcut to clarity', 'No time to read it all?', '', 'Watch it instead.', `This video covers all of ${N} in one go. It is the fastest way to get the full story.`],
    ['Lights, camera, clarity', 'The story of', N, 'on video', 'Everything on this page, told as one clear story. Watch it to the end and share it with your team.'],
  ];
  return L[c % L.length];
}

/* a few inline icons (24 × 24 strokes) */
const IC = {
  play: 'M7 4.5v15l12.5-7.5z', like: 'M7 10v11H3V10zM7 10l4-8c1.7 0 3 1.3 3 3v4h5.2a2 2 0 0 1 2 2.4l-1.6 8A2 2 0 0 1 17.6 21H7',
  bell: 'M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21a2 2 0 0 0 4 0', share: 'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6M6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6M18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6M8.6 13.5l6.8 4M15.4 6.5l-6.8 4',
  follow: 'M15 20v-2a4 4 0 0 0-8 0v2M11 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M19 8v6M16 11h6', clock: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M12 7v5l3 2',
  eye: 'M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6', copy: 'M9 9h11v11H9zM5 15H4V4h11v1', check: 'M4 12l5 5L20 6',
  phone: 'M7 2h10v20H7zM11 18h2', spark: 'M12 2l2.2 6.8L21 11l-6.8 2.2L12 20l-2.2-6.8L3 11l6.8-2.2z', mail: 'M3 5h18v14H3zM3 6l9 7 9-7', wa: 'M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 9c0 3 3 6 6 6l1.5-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z',
};
function I({ n, s = 20 }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" focusable="false" className="w8-ic">
      <path d={IC[n]} fill={n === 'play' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function YT({ s = 22 }) {
  return (
    <svg viewBox="0 0 28 20" width={s} height={(s * 20) / 28} aria-hidden="true" focusable="false" className="w8-yt">
      <rect width="28" height="20" rx="5.5" fill="#FF0033" />
      <path d="M11.2 5.8v8.4l7.2-4.2z" fill="#fff" />
    </svg>
  );
}

/* the 3D objects (CSS 3D, transform-only motion) */
function Obj({ x }) {
  const k = OBJECTS[x];
  if (k === 'cube')
    return (
      <div className="w8-o w8-cube"><div className="w8-cube__in">
        {['play', 'like', 'bell', 'share', 'follow', 'eye'].map((n, i) => <span key={n} className={`w8-face f${i}`}><I n={n} s={34} /></span>)}
      </div></div>
    );
  if (k === 'button')
    return <div className="w8-o w8-btn3d"><div className="w8-btn3d__in">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <span key={i} style={{ '--z': i }} />)}<b><I n="play" s={44} /></b></div></div>;
  if (k === 'gyro')
    return <div className="w8-o w8-gyro"><i className="r1" /><i className="r2" /><i className="r3" /><b><I n="play" s={30} /></b></div>;
  if (k === 'reel')
    return (
      <div className="w8-o w8-reel"><div className="w8-reel__disc">{[0, 1, 2, 3, 4, 5].map((i) => <i key={i} style={{ '--i': i }} />)}</div>
        <div className="w8-reel__strip">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <i key={i} />)}</div></div>
    );
  if (k === 'thumb')
    return <div className="w8-o w8-thumb"><div className="w8-thumb__in">{[0, 1, 2, 3, 4, 5].map((i) => <span key={i} style={{ '--z': i }}><I n="like" s={70} /></span>)}</div><em>+1</em></div>;
  if (k === 'bell')
    return <div className="w8-o w8-bell"><i className="w1" /><i className="w2" /><i className="w3" /><b><I n="bell" s={60} /></b><em>1</em></div>;
  if (k === 'clap')
    return <div className="w8-o w8-clap"><div className="w8-clap__top" /><div className="w8-clap__body"><span>SCENE</span><span>TAKE 1</span><b>▶ PLAY</b></div></div>;
  return <div className="w8-o w8-tv"><div className="w8-tv__box"><div className="w8-tv__scr"><I n="play" s={30} /></div></div><i className="w8-tv__l" /><i className="w8-tv__r" /></div>;
}

function Backdrop({ b }) {
  const k = BACKDROPS[b];
  const n = { stars: 3, bokeh: 9, rings: 4, beams: 5, comets: 5, ribbons: 3, waves: 3, aurora: 3, prism: 1, mesh: 1, grid: 1, map: 6 }[k];
  return (
    <div className={`w8-bg w8-bg--${k}`} aria-hidden="true">
      {Array.from({ length: n }, (_, i) => <i key={i} style={{ '--i': i }} />)}
    </div>
  );
}

/* the headline, its words arriving one by one in the page's own style */
function Head({ id, before, name, after }) {
  let i = 0;
  const part = (s, cls) => s ? s.split(/\s+/).map((w) => <span key={i} className={cls} style={{ '--w': i++ }}>{w} </span>) : null;
  return (
    <h2 id={id} className="w8-h">
      {part(before, 'w8-w')}
      {name ? <span className="w8-name">{part(name, 'w8-w w8-w--n')}</span> : null}
      {part(after, 'w8-w')}
    </h2>
  );
}

function ShareMenu({ link, title, onClose }) {
  const [copied, setCopied] = ee.useState(false);
  const t = encodeURIComponent(title), u = encodeURIComponent(link);
  const list = [
    ['WhatsApp', 'wa', `https://wa.me/?text=${t}%20${u}`],
    ['LinkedIn', 'linkedin', `https://www.linkedin.com/sharing/share-offsite/?url=${u}`],
    ['Facebook', 'facebook', `https://www.facebook.com/sharer/sharer.php?u=${u}`],
    ['X', 'x', `https://x.com/intent/post?text=${t}&url=${u}`],
    ['E-mail', 'mail', `mailto:?subject=${t}&body=${u}`],
  ];
  ee.useEffect(() => {
    const k = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [onClose]);
  return (
    <div className="w8-share" role="dialog" aria-label="Share this video">
      {list.map(([n, k, href]) => (
        <a key={k} href={href} target="_blank" rel="noopener noreferrer" className={`w8-share__a s-${k}`}>
          {k === 'wa' || k === 'mail' ? <I n={k} s={18} /> : <FRQ_Icon k={k} s={18} />}<span>{n}</span>
        </a>
      ))}
      <button type="button" className="w8-share__a s-copy" onClick={() => { try { navigator.clipboard.writeText(link).then(() => setCopied(true), () => {}); } catch (e) {} }}>
        <I n={copied ? 'check' : 'copy'} s={18} /><span>{copied ? 'Link copied' : 'Copy link'}</span>
      </button>
      <button type="button" className="w8-share__x" aria-label="Close" onClick={onClose}>×</button>
    </div>
  );
}

function Deck({ d, watch, title }) {
  const [menu, setMenu] = ee.useState(false);
  const share = () => {
    if (navigator.share && matchMedia('(pointer:coarse)').matches) navigator.share({ title, url: watch }).catch(() => {});
    else setMenu((m) => !m);
  };
  const follow = FRQ_SOCIAL.filter((s) => FOLLOW.includes(s.k));
  const cards = [
    { k: 'like', n: '01', t: 'Like', s: 'Found it useful? Tap the thumbs-up on YouTube.', el: <a className="w8-go" href={watch} target="_blank" rel="noopener noreferrer"><I n="like" s={18} />Like on YouTube</a> },
    { k: 'sub', n: '02', t: 'Subscribe', s: 'Subscribe and tap the bell so you never miss a new video.', el: <a className="w8-go w8-go--red" href={CHANNEL + '?sub_confirmation=1'} target="_blank" rel="noopener noreferrer"><YT s={20} />Subscribe</a> },
    { k: 'follow', n: '03', t: 'Follow', s: 'Follow Frequent Research for news, insights and stories.', el: <span className="w8-soc">{follow.map((s) => <a key={s.k} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Follow Frequent Research on ${s.name}`} style={{ '--c': s.c1 }}><FRQ_Icon k={s.k} s={18} /></a>)}</span> },
    { k: 'share', n: '04', t: 'Share', s: 'Know someone who needs this? Send them the video.', el: <button type="button" className="w8-go" onClick={share} aria-expanded={menu}><I n="share" s={18} />Share the video</button> },
  ];
  return (
    <div className={`w8-deck w8-deck--${DECKS[d]}`}>
      <p className="w8-deck__h"><I n="spark" s={16} /> Enjoyed the video? Four quick ways to say thanks</p>
      <ul className="w8-deck__l">
        {cards.map((c, i) => (
          <li key={c.k} className={`w8-card w8-card--${c.k}`} style={{ '--i': i }}>
            <span className="w8-card__ic" aria-hidden="true"><I n={{ like: 'like', sub: 'bell', follow: 'follow', share: 'share' }[c.k]} s={26} /></span>
            <span className="w8-card__n" aria-hidden="true">{c.n}</span>
            <h3>{c.t}</h3>
            <p>{c.s}</p>
            {c.el}
            {c.k === 'share' && menu ? <ShareMenu link={watch} title={title} onClose={() => setMenu(false)} /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Watch828({ path, kit }) {
  ({ pvPageVideo, pvYt, FRQ_Icon, FRQ_SOCIAL } = kit);
  const ref = ee.useRef(null), pv = ee.useRef(null);
  const [st, setSt] = ee.useState(null);
  const [vis, setVis] = ee.useState(false);
  const [seen, setSeen] = ee.useState(false);
  ee.useEffect(() => { if (vis) setSeen(true); }, [vis]);
  // data: API (admin changes) + this page's file; the red-button video when the API has none
  ee.useEffect(() => {
    let live = true;
    setSt(null);
    (async () => {
      // build 83.2: the video comes from pvPageVideo, the same source the red YouTube button uses
      const [pvv, s0] = await Promise.all([pvPageVideo(path), getJson('/data/pv/' + key(path) + '.json')]);
      const a = pvv.api;
      let s = s0;
      if (!s && !(a && a.template)) s = await getJson('/data/pv/home.json');
      const template = (a && a.template) || (s && s.template);
      if (!live || !template) return;
      const video = pvv.video;
      setSt({ template, video, w: (s0 && s0.w) || comboOf(path) });
    })();
    return () => { live = false; };
  }, [path]);
  // the player (one script, shared with the super admin), then this page's design and video
  ee.useEffect(() => {
    if (!st || !pv.current) return;
    window.FR_PAGE_VIDEO_FILES = { 'flags.webp': flagsUrl, 'world-dots.webp': dotsUrl };
    let live = true;
    const box = pv.current;
    import('../admin/pagevideo-player.js').then(() => {
      if (!live) return;
      // made here and given its data before it is on the page, so it does not ask the API again
      const el = document.createElement('fr-page-video');
      el.setAttribute('always', '');
      el.setAttribute('page', path);
      el.data = { page: path, video: st.video, template: st.template };
      box.textContent = '';
      box.appendChild(el);
    });
    return () => { live = false; };
  }, [st, path]);
  // loops run only while the section is on screen
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || !window.IntersectionObserver) { setVis(true); return; }
    const io = new IntersectionObserver(([e]) => setVis(e.isIntersecting), { rootMargin: '120px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, [st]);
  if (!st || /not found/i.test(document.title)) return <div className="w828-slot" aria-hidden="true" />;
  const { template: t, video, w } = st;
  const p = t.palette || {};
  const isHome = path === '/';
  const name = pageName(path, t);
  const [eyebrow, before, nm, after, lede] = words(w.c, name, isHome);
  const yt = video ? pvYt(video.url) : null;
  const watch = yt ? `https://www.youtube.com/watch?v=${yt.id}` : CHANNEL;
  const style = {};
  for (const k of ['bg1', 'bg2', 'ink', 'muted', 'accent', 'accent2', 'glow']) if (/^#[0-9a-f]{6}$/i.test(p[k] || '')) style['--' + k] = p[k];
  style['--dots'] = `url("${dotsUrl}")`;
  const hid = 'w828-h';
  return (
    <section ref={ref} className={`w828 B-${BACKDROPS[w.b]} H-${HEADS[w.h]} F-${FONTS[w.f]} X-${OBJECTS[w.x]} T-${p.tone === 'light' ? 'light' : 'dark'}${vis ? ' is-on' : ''}${seen ? ' is-seen' : ''}`} style={style} aria-labelledby={hid} data-w828={Object.values(w).join('.')}>
      <style>{css}</style>
      <Backdrop b={w.b} />
      <div className="w8-in">
        <div className="w8-top">
          <div className="w8-copy">
            <span className="w8-eyebrow"><YT s={22} /><span>{eyebrow}</span><i className="w8-live" aria-hidden="true" /></span>
            <Head id={hid} before={before} name={nm} after={after} />
            <p className="w8-lede">{lede}</p>
            <ul className="w8-why">
              <li style={{ '--i': 0 }}><I n="clock" s={18} /> The whole page in one video</li>
              <li style={{ '--i': 1 }}><I n="eye" s={18} /> Easiest way to understand it</li>
              <li style={{ '--i': 2 }}><I n="phone" s={18} /> Plays on any screen</li>
            </ul>
          </div>
          <div className="w8-stage3d" aria-hidden="true"><Obj x={w.x} /><span className="w8-floor" /></div>
        </div>
        <div className="w8-player">
          <span className="w8-glow" aria-hidden="true" />
          <div ref={pv} className="w8-pv" />
        </div>
        <div className="w8-cta">
          <a className="w8-watch" href={watch} target="_blank" rel="noopener noreferrer"><span className="w8-watch__dot"><I n="play" s={18} /></span>Watch the full video on YouTube</a>
          <span className="w8-tip"><I n="clock" s={16} /> Watch it to the end: the last part shows what to do next</span>
          <a className="w8-subbig" href={CHANNEL + '?sub_confirmation=1'} target="_blank" rel="noopener noreferrer"><YT s={22} />Subscribe to our channel</a>
        </div>
        <Deck d={w.d} watch={watch} title={(t.headline || name) + ' | Frequent Research on YouTube'} />
      </div>
    </section>
  );
}

export { Watch828 };
