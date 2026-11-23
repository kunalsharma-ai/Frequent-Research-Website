/*
 * Build 65 update 21 — the round red video button (every page, bottom left) and "FR TV", the watch showcase it opens.
 * Kunal: "round animated red button for video on left hand side … when somebody click on YouTube logo then it should
 * show watch this page in attractive way … mention this button every web page".
 * VD21_Button replaces the old "Watch our story" pill and the small "Videos" pill (K5_VideoBtn renders it).
 * Build 70: it opens this page's own video in this page's own design (PageVideo69.jsx); the old films-and-reels
 * showcase is gone (Kunal: videos are set per page in the super admin). Styles video21.css (vd21-fab).
 */
import * as ee from 'react';
import { useLocation } from 'react-router-dom';
import { PV_Theatre, pvApi, pvPageVideo, pvYt } from './PageVideo69.jsx';
/* build 83: every page opens its own Studio 83 design (PageVideo83.jsx, loaded on the first press) */
let pv83Mod = null;
const pv83Load = () => (pv83Mod ? Promise.resolve(pv83Mod) : import('./PageVideo83.jsx').then((m) => (pv83Mod = m)));

function VD21_Logo({ s = 26 }) {
  return (
    <svg viewBox="0 0 28 20" width={s} height={(s * 20) / 28} aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="28" height="20" rx="5.5" fill="#fff" />
      <path d="M11 5.6v8.8l7.6-4.4z" fill="#E62117" />
    </svg>
  );
}
function VD21_Button() {
  /* build 70: the button plays this page's own video (components/site/PageVideo69.jsx, set in the super admin) */
  const loc = useLocation();
  const [open, setOpen] = ee.useState(null);
  /* build 83.2: the same video as the "Watch this page" section at the bottom (pvPageVideo, one source for both) */
  const show = () => {
    // build 83.3 merge: the Studio 83 window, playing the video pvPageVideo picked (the one the bottom section plays)
    const path = loc.pathname;
    Promise.all([pvPageVideo(path).catch(() => null), pv83Load().catch(() => null)]).then(([r, m]) => {
      const url = r && r.video && r.video.url;
      const y = url ? pvYt(url) : null;
      if (m) {
        const l = m.pv83ForPath(path);
        const i = Math.max(0, l.findIndex((e) => !e.section));
        if (l.length) {
          let main = l[i];
          if (y) main = { ...main, url: "https://youtu.be/" + y.id, video: { kind: "yt", id: y.id, start: y.start || 0, tall: !!y.tall } };
          setOpen({ list: [main, ...l.filter((_, k) => k !== i)], Theatre: m.PV83_Theatre });
          return;
        }
      }
      // build 70 window if Studio 83 cannot load; no video set at all: the channel (same tab, a new tab would be blocked after the wait)
      if (r && r.list.length && r.list[0].url) setOpen({ list: r.list, Theatre: PV_Theatre });
      else window.location.assign("https://www.youtube.com/@frequentresearch");
    });
  };
  ee.useEffect(() => setOpen(null), [loc.pathname]);
  // ask early (once per page, shared with the bottom section) so the pop-up opens at once
  ee.useEffect(() => {
    const t = setTimeout(() => (window.requestIdleCallback ? requestIdleCallback(() => pvApi(loc.pathname)) : pvApi(loc.pathname)), 4000);
    return () => clearTimeout(t);
  }, [loc.pathname]);
  ee.useEffect(() => {
    const o = () => show();
    window.addEventListener("fr-watch-open", o);
    return () => window.removeEventListener("fr-watch-open", o);
  }, [loc.pathname]);
  return (
    <>
      <button type="button" className={"vd21-fab" + (open ? " is-open" : "")} onClick={show} aria-haspopup="dialog" aria-label="Watch our videos: watch this page's video" data-sfx="video">
        <i className="vd21-fab__wave" aria-hidden="true" />
        <i className="vd21-fab__wave vd21-fab__wave--2" aria-hidden="true" />
        <span className="vd21-fab__spin" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <defs>
              <path id="vd21-c" d="M50 50 m-39 0 a39 39 0 1 1 78 0 a39 39 0 1 1 -78 0" />
            </defs>
            <text>
              <textPath href="#vd21-c" textLength="238" lengthAdjust="spacing">WATCH ● OUR ● VIDEOS ● </textPath>
            </text>
          </svg>
        </span>
        <span className="vd21-fab__core" aria-hidden="true">
          <VD21_Logo s={30} />
        </span>
        <span className="vd21-fab__tip" aria-hidden="true">
          Watch this page's video
        </span>
      </button>
      {open ? <open.Theatre list={open.list} onClose={() => setOpen(null)} /> : null}
    </>
  );
}
export { VD21_Button };
