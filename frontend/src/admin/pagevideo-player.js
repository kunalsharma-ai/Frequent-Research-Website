/*!
 * Frequent Research · Page video component player (build 82.5)
 *
 * One line on any page of the website:
 *   <script src="/api/v1/page-videos/player.js" defer></script>
 *   <fr-page-video></fr-page-video>                       the video of the page it is on
 *   <fr-page-video page="/about-us"></fr-page-video>      the video of another page
 *
 * Attributes: page (default: this page), api (default: where this script came from), always (show the page's design
 * even when it has no video yet), compact (smaller, for side columns).
 * Everything shown (video, words, design) comes from the super admin › Pages › Page video component, through
 * GET /api/v1/page-videos?page=…  Nothing here needs changing when a video or its details change.
 * Script and data: no cookies, no tracking; YouTube plays from youtube-nocookie.com, only after the visitor presses play.
 */
(() => {
  if (window.customElements && customElements.get('fr-page-video')) return;
  const SCRIPT = document.currentScript && document.currentScript.src;
  const DEFAULT_API = SCRIPT ? new URL('./', SCRIPT).href.replace(/\/$/, '') : '/api/v1/page-videos';

  /* ---------------------------------------------------------------- icons (24 × 24, drawn with lines) --------- */
  const P = {
    chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2', pie: 'M12 2a10 10 0 1 0 10 10H12zM14 2.2A10 10 0 0 1 21.8 10H14z', survey: 'M9 3h6v3H9zM6 5H5v16h14V5h-1M8 11l2 2 4-4M8 17h8',
    users: 'M16 20v-2a4 4 0 0 0-8 0v2M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M22 20v-2a3 3 0 0 0-3-3M2 20v-2a3 3 0 0 1 3-3M18 5a3 3 0 0 1 0 6M6 5a3 3 0 0 0 0 6',
    usercheck: 'M14 20v-2a4 4 0 0 0-8 0v2M10 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M16 11l2 2 4-4', globe: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M2 12h20M12 2c3 3 4 6.5 4 10s-1 7-4 10c-3-3-4-6.5-4-10s1-7 4-10',
    pin: 'M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5', phone: 'M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2',
    mail: 'M3 5h18v14H3zM3 6l9 7 9-7', chat: 'M21 12a8 8 0 0 1-12 7l-5 1 1.5-4.5A8 8 0 1 1 21 12zM8 11h.01M12 11h.01M16 11h.01', megaphone: 'M3 10v4h3l7 5V5L6 10zM16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14',
    target: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12M12 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4', search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14M21 21l-5-5',
    rocket: 'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 15l-3-3c1-4 4-9 13-10-1 9-6 12-10 13zM15 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2M9 12l-3-1-2 2 4 1M12 15l1 3 2-2-1-4', code: 'M8 6l-6 6 6 6M16 6l6 6-6 6M14 4l-4 16',
    cpu: 'M6 6h12v12H6zM9 9h6v6H9zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4', cloud: 'M7 18a5 5 0 1 1 1-9.9A6 6 0 0 1 19 9a4.5 4.5 0 0 1 0 9z', shield: 'M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5zM8.5 12l2.5 2.5 4.5-5',
    lock: 'M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4M12 15v2', database: 'M12 3c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
    mobile: 'M7 2h10v20H7zM11 18h2', cart: 'M3 3h2l3 12h11l2-8H7M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2M18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2', truck: 'M2 6h12v10H2zM14 10h4l3 3v3h-7M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4M17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    factory: 'M2 21V10l6 4V10l6 4V6l8 5v10zM6 17h2M11 17h2M16 17h2', leaf: 'M5 21c0-9 5-15 16-17-1 11-7 16-16 17M5 21l8-8', car: 'M3 13l2-6h14l2 6v5H3zM3 13h18M7 18v2M17 18v2M7 15.5h.01M17 15.5h.01',
    plane: 'M2 13l8-2 4-8h2l-1 8 7 2v2l-7-1-1 5 2 2v1l-4-1-4 1v-1l2-2-1-5-7 1z', home: 'M3 11l9-8 9 8M5 9v12h14V9M10 21v-6h4v6', building: 'M4 21V3h11v18M15 9h5v12M2 21h20M8 7h3M8 11h3M8 15h3',
    bank: 'M3 9l9-6 9 6M5 9v9M10 9v9M14 9v9M19 9v9M3 21h18M3 18h18', coin: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18M15 9a3 3 0 0 0-3-1.5c-1.7 0-3 .9-3 2.2 0 3 6 1.6 6 4.6 0 1.3-1.3 2.2-3 2.2A3 3 0 0 1 9 15M12 6v1.5M12 16.5V18',
    rupee: 'M6 4h12M6 9h12M9 4c6 0 6 10 0 10H6l9 7', calculator: 'M5 2h14v20H5zM8 6h8v3H8zM8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01', receipt: 'M5 2v20l2-1.5L9 22l2-1.5 2 1.5 2-1.5 2 1.5 2-1.5V2zM9 7h6M9 11h6M9 15h4',
    file: 'M6 2h8l5 5v15H6zM14 2v5h5M9 13h7M9 17h7', download: 'M12 3v12M7 10l5 5 5-5M4 20h16', book: 'M12 6c-2-1.5-5-2-8-2v14c3 0 6 .5 8 2 2-1.5 5-2 8-2V4c-3 0-6 .5-8 2zM12 6v14', cap: 'M2 9l10-5 10 5-10 5zM6 11v5c3 3 9 3 12 0v-5M22 9v6',
    heart: 'M12 21s-8-5-9.5-10A5 5 0 0 1 12 6a5 5 0 0 1 9.5 5C20 16 12 21 12 21zM3 12h4l2-3 3 6 2-3h7', stethoscope: 'M5 3v6a5 5 0 0 0 10 0V3M5 3h2M13 3h2M10 14v2a5 5 0 0 0 10 0v-2M20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    pill: 'M10.5 3.5a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7zM7 7l10 10', flask: 'M9 2h6M10 2v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L14 8V2M7 15h10', bulb: 'M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2',
    trophy: 'M7 4h10v5a5 5 0 0 1-10 0zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4M12 14v4M8 21h8M9 18h6', star: 'M12 2l3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z', camera: 'M4 7h3l2-3h6l2 3h3v13H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8',
    play: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20M10 8l6 4-6 4z', film: 'M3 3h18v18H3zM7 3v18M17 3v18M3 8h4M3 13h4M3 18h4M17 8h4M17 13h4M17 18h4', calendar: 'M4 5h16v16H4zM4 10h16M8 3v4M16 3v4M8 14h2M14 14h2M8 17h2',
    briefcase: 'M3 7h18v13H3zM8 7V4h8v3M3 13h18', handshake: 'M2 11l4-4 4 2 3-2 4 1 5 3M2 11l6 6 2-1 2 2 2-1 2 1 5-6M9 13l3 3M12 12l3 3', award: 'M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12M8.5 13L7 22l5-3 5 3-1.5-9',
    zap: 'M13 2L4 14h7l-1 8 9-12h-7z', drop: 'M12 2s7 7.5 7 13a7 7 0 0 1-14 0c0-5.5 7-13 7-13z', food: 'M6 2v8a2 2 0 0 0 4 0V2M8 2v20M17 2c-2 2-3 5-3 8h3v12', shirt: 'M8 3l-5 3 2 5 3-1v11h8V10l3 1 2-5-5-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3z',
    tv: 'M3 6h18v12H3zM8 21h8M8 2l4 4 4-4', game: 'M6 9h12a4 4 0 0 1 4 4v1a3 3 0 0 1-5.5 1.7L15 14H9l-1.5 1.7A3 3 0 0 1 2 14v-1a4 4 0 0 1 4-4M8 11v4M6 13h4M16 12h.01M18 14h.01', bed: 'M2 20V6M2 14h20v6M22 14v-3a3 3 0 0 0-3-3h-8v6M6 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4',
    sun: 'M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10M12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1', sprout: 'M12 22V11M12 11C12 6 8 4 3 4c0 5 4 7 9 7M12 13c0-4 3-6 8-6 0 4-3 6-8 6',
    tree: 'M12 22v-6M12 2l6 8h-3l4 6H5l4-6H6z', ship: 'M3 17l2 4h14l2-4zM5 17V11h14v6M9 11V6h6v5M12 3v3', music: 'M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0M21 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0', news: 'M4 4h13v16H6a2 2 0 0 1-2-2zM17 8h3v10a2 2 0 0 1-2 2M7 8h7M7 12h7M7 16h4',
    gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 0 1-4 0v-.1A1.6 1.6 0 0 0 7.5 19.8l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1A1.6 1.6 0 0 0 3.6 14H3a2 2 0 0 1 0-4h.1A1.6 1.6 0 0 0 4.2 7.5l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1A1.6 1.6 0 0 0 10 3.6V3a2 2 0 0 1 4 0v.1a1.6 1.6 0 0 0 2.6 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1A1.6 1.6 0 0 0 20.4 10H21a2 2 0 0 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z',
    robot: 'M5 8h14v11H5zM12 4v4M12 3h.01M9 13h.01M15 13h.01M9 16h6M2 12v3M22 12v3', flag: 'M5 22V3M5 4h12l-2 4 2 4H5', ballot: 'M4 11h16v10H4zM8 11V4h8v7M10 7l1.5 1.5L14 6M9 15h6', scale: 'M12 3v18M7 21h10M4 7h16M7 7l-3 7a3 3 0 0 0 6 0zM17 7l-3 7a3 3 0 0 0 6 0z',
    fish: 'M2 12c3-5 9-7 14-4l5-3v14l-5-3c-5 3-11 1-14-4zM15 11h.01', flower: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6M12 9V4a3 3 0 0 1 0 5M15 12h5a3 3 0 0 1-5 0M12 15v5a3 3 0 0 1 0-5M9 12H4a3 3 0 0 1 5 0M12 22v-2', hammer: 'M14 4l6 6-3 3-6-6zM11 7L3 15l3 3 8-8M16 2l6 6',
    oil: 'M12 2s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11zM9 14a3 3 0 0 0 3 3', chip: 'M7 7h10v10H7zM10 10h4v4h-4zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4', link: 'M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1',
  };
  const FLAGS = 'AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GT GU GW GY HK HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS XK YE YT ZA ZM ZW'.split(' ');

  /* ---------------------------------------------------------------- styles ------------------------------------- */
  const CSS = `
:host{display:block;contain:layout paint;--ff:var(--fr-pv-font,Inter,'Segoe UI',system-ui,-apple-system,Roboto,Arial,sans-serif);font-family:var(--ff);margin:var(--fr-pv-margin,24px 0)}
:host([hidden]){display:none}
*{box-sizing:border-box}
.wrap{container-type:inline-size}
.pv{--sp:1;position:relative;overflow:hidden;isolation:isolate;border-radius:var(--fr-pv-radius,24px);aspect-ratio:16/9;min-height:340px;color:var(--ink);
  background:radial-gradient(120% 90% at 85% 10%,color-mix(in srgb,var(--glow) 28%,transparent),transparent 60%),linear-gradient(135deg,var(--bg1),var(--bg2));
  box-shadow:0 30px 80px -30px color-mix(in srgb,var(--bg2) 80%,#000),0 0 0 1px var(--line) inset;perspective:1200px}
.pv.T-dark{--glass:rgba(255,255,255,.08);--glass2:rgba(255,255,255,.14);--line:rgba(255,255,255,.16);--shade:rgba(0,0,0,.45)}
.pv.T-light{--glass:rgba(255,255,255,.55);--glass2:rgba(255,255,255,.8);--line:rgba(15,30,60,.12);--shade:rgba(20,30,60,.18)}
.pv.M-calm{--sp:1.45}.pv.M-bold{--sp:.7}
.bg,.fx{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.scrim{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(90deg,var(--bg1) 0,color-mix(in srgb,var(--bg1) 78%,transparent) 38%,transparent 66%)}
.L-split-rev .scrim{background:linear-gradient(270deg,var(--bg1) 0,color-mix(in srgb,var(--bg1) 78%,transparent) 38%,transparent 66%)}
.L-center .scrim,.L-orbit .scrim,.L-spotlight .scrim{background:radial-gradient(70% 60% at 50% 62%,color-mix(in srgb,var(--bg1) 80%,transparent),transparent)}
.L-poster .scrim,.L-ticker .scrim{background:linear-gradient(180deg,var(--bg1) 0,color-mix(in srgb,var(--bg1) 70%,transparent) 40%,transparent 70%)}
.L-magazine .scrim{background:linear-gradient(270deg,var(--bg1) 0,color-mix(in srgb,var(--bg1) 75%,transparent) 45%,transparent 75%)}
.L-card .scrim{display:none}
.fx{z-index:1}
.txt{position:absolute;z-index:4;display:flex;flex-direction:column;gap:10px;max-width:56%;left:6%;bottom:9%}
.kick{display:inline-flex;align-items:center;gap:8px;align-self:flex-start;font:600 12px/1.2 var(--ff);letter-spacing:.12em;text-transform:uppercase;color:var(--ink);background:var(--glass);border:1px solid var(--line);padding:7px 12px;border-radius:999px;backdrop-filter:blur(8px)}
.kick i{width:8px;height:8px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 4px color-mix(in srgb,var(--accent) 30%,transparent);animation:blink calc(2s*var(--sp)) infinite}
h3{margin:0;font:800 clamp(22px,4.1cqi,46px)/1.06 var(--ff);letter-spacing:-.02em;text-wrap:balance}
h3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;padding-bottom:.08em}
.long h3{font-size:clamp(20px,3.3cqi,38px)}.xl h3{font-size:clamp(19px,2.8cqi,32px)}
.long ul li:nth-child(3){display:none}
.long.L-center ul,.long.L-spotlight ul,.long.L-poster ul,.long.L-card ul{display:none}
h3 span{background:linear-gradient(90deg,var(--ink),color-mix(in srgb,var(--accent2) 70%,var(--ink)));-webkit-background-clip:text;background-clip:text;color:transparent}
.T-light h3{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;padding-bottom:.08em}
.long h3{font-size:clamp(20px,3.3cqi,38px)}.xl h3{font-size:clamp(19px,2.8cqi,32px)}
.long ul li:nth-child(3){display:none}
.long.L-center ul,.long.L-spotlight ul,.long.L-poster ul,.long.L-card ul{display:none}
h3 span{background:none;color:var(--ink)}
.sub{margin:0;font:700 clamp(14px,1.9cqi,21px)/1.3 var(--ff);color:color-mix(in srgb,var(--accent2) 55%,var(--ink))}
.T-light .sub{color:var(--accent)}
.tag{margin:0;font:400 clamp(13px,1.55cqi,17px)/1.5 var(--ff);color:var(--muted);max-width:60ch;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.long .tag{-webkit-line-clamp:2}
ul{list-style:none;margin:2px 0 0;padding:0;display:flex;flex-wrap:wrap;gap:8px}
li{font:600 12.5px/1.25 var(--ff);padding:7px 11px;border-radius:10px;background:var(--glass);border:1px solid var(--line);color:var(--ink);backdrop-filter:blur(6px);animation:rise calc(.7s*var(--sp)) both;animation-delay:calc(.15s*var(--i) + .3s)}
li b{color:var(--accent2);margin-right:6px}
.T-light li b{color:var(--accent)}
.row{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:6px}
.play{all:unset;cursor:pointer;display:inline-flex;align-items:center;gap:12px;border-radius:999px;padding:8px 20px 8px 8px;background:var(--ink);color:var(--bg1);font:700 15px/1 var(--ff);box-shadow:0 14px 34px -10px var(--shade);transition:transform .2s}
.T-light .play{background:var(--accent);color:#fff}
.play:hover{transform:translateY(-2px) scale(1.02)}
.play:focus-visible{outline:3px solid var(--accent2);outline-offset:4px}
.play .dot{position:relative;width:46px;height:46px;border-radius:50%;background:var(--accent);display:grid;place-items:center}
.T-light .play .dot{background:#fff}
.play .dot::before,.play .dot::after{content:"";position:absolute;inset:-6px;border-radius:50%;border:2px solid var(--accent);opacity:0;animation:ring calc(2.4s*var(--sp)) infinite}
.play .dot::after{animation-delay:calc(1.2s*var(--sp))}
.play .dot svg{display:block;width:18px;height:18px;fill:var(--bg1);margin-left:3px;position:relative;z-index:1}
.T-light .play .dot svg{fill:var(--accent)}
.stat{display:inline-flex;align-items:baseline;gap:8px;font:800 30px/1 var(--ff);color:var(--ink)}
.stat small{font:600 12.5px/1.2 var(--ff);color:var(--muted);max-width:14ch}
.flags{display:flex;gap:6px;align-items:center}
.flag{width:30px;height:22.5px;border-radius:4px;background-repeat:no-repeat;background-size:480px 360px;box-shadow:0 0 0 1px var(--line),0 4px 10px -4px var(--shade);animation:wave calc(3s*var(--sp)) ease-in-out infinite;animation-delay:calc(.25s*var(--i));transform-origin:left center}
.obj{position:absolute;z-index:2;right:6%;top:12%;width:34%;aspect-ratio:1;transform-style:preserve-3d;pointer-events:none}
.ico{position:absolute;z-index:3;width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:var(--glass2);border:1px solid var(--line);backdrop-filter:blur(8px);box-shadow:0 12px 26px -12px var(--shade);animation:float calc(6s*var(--sp)) ease-in-out infinite;animation-delay:calc(-1.3s*var(--i));pointer-events:none}
.ico svg{width:22px;height:22px;fill:none;stroke:var(--accent2);stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.T-light .ico svg{stroke:var(--accent)}
.media{position:absolute;z-index:2;inset:0;pointer-events:none}
.media img{width:100%;height:100%;object-fit:cover;opacity:.9}
.media::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--bg1) 8%,color-mix(in srgb,var(--bg1) 55%,transparent) 55%,transparent),linear-gradient(0deg,var(--bg1),transparent 55%)}
.frame{position:absolute;inset:0;z-index:10;background:#000;display:flex}
.frame iframe,.frame video{width:100%;height:100%;border:0}
.close{all:unset;cursor:pointer;position:absolute;z-index:11;top:12px;right:12px;width:40px;height:40px;border-radius:50%;background:rgba(0,0,0,.6);color:#fff;display:grid;place-items:center;font:600 22px/1 system-ui}
.close:focus-visible{outline:3px solid #fff}
.brand{position:absolute;z-index:4;right:5%;bottom:6%;font:700 11px/1 var(--ff);letter-spacing:.14em;text-transform:uppercase;color:var(--muted);opacity:.85}
.sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}

/* layouts */
.L-cinema .txt{max-width:58%}
.L-split .txt,.L-split-rev .txt{top:50%;bottom:auto;transform:translateY(-50%);max-width:48%}
.L-split .obj{right:8%;top:20%;width:36%}
.L-split-rev .txt{left:auto;right:6%}.L-split-rev .obj{left:8%;right:auto;top:20%;width:36%}.L-split-rev .brand{right:auto;left:5%}
.L-center .txt{left:50%;bottom:auto;top:50%;transform:translate(-50%,-50%);align-items:center;text-align:center;max-width:68%}
.L-center .kick{align-self:center}.L-center ul,.L-center .row{justify-content:center}
.L-center .obj{right:3%;top:auto;bottom:4%;width:20%}
.L-card .txt{left:6%;top:50%;bottom:auto;translate:0 -50%;max-height:88%;overflow:hidden;max-width:52%;padding:28px;border-radius:22px;background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(14px);justify-content:center;animation:tilt calc(9s*var(--sp)) ease-in-out infinite;transform-style:preserve-3d;box-shadow:0 30px 60px -30px var(--shade)}
.L-card .obj{right:7%;top:22%;width:34%}
.L-poster .txt{top:8%;bottom:auto;max-width:70%}
.L-poster h3{font-size:clamp(26px,5.2cqi,60px)}
.L-poster .obj{right:4%;top:auto;bottom:-6%;width:38%}
.L-magazine .txt{left:42%;right:5%;max-width:none;top:50%;bottom:auto;transform:translateY(-50%)}
.L-magazine .big{position:absolute;z-index:3;left:5%;top:50%;transform:translateY(-50%);font:900 clamp(60px,15cqi,190px)/.85 var(--ff);letter-spacing:-.05em;color:transparent;-webkit-text-stroke:2px var(--accent2);opacity:.9;max-width:36%;white-space:nowrap}
.T-light.L-magazine .big{-webkit-text-stroke-color:var(--accent)}
.L-magazine .obj{left:2%;right:auto;top:8%;width:30%;opacity:.5}
.L-magazine .stat{display:none}
.L-orbit .obj{right:auto;left:50%;top:7%;width:24%;transform:translateX(-50%)}
.L-orbit .txt{left:50%;transform:translateX(-50%);align-items:center;text-align:center;max-width:82%;bottom:7%}
.L-orbit .kick{align-self:center}.L-orbit ul,.L-orbit .row{justify-content:center}
.L-orbit .ring{position:absolute;z-index:3;left:50%;top:calc(7% + 12cqi);width:0;height:0;animation:spin calc(40s*var(--sp)) linear infinite}
.L-orbit .ring .ico{animation:none;transform:translate(-50%,-50%)}
.L-orbit .tag,.L-orbit ul{display:none}
.L-ticker .txt{top:7%;bottom:auto;max-width:56%}
.L-ticker .tag{-webkit-line-clamp:2}
.L-ticker .obj{right:6%;top:9%;width:30%}
.L-ticker .band{position:absolute;z-index:3;left:-5%;right:-5%;bottom:9%;transform:rotate(-3deg);background:var(--accent);color:#fff;padding:12px 0;overflow:hidden;white-space:nowrap;font:800 18px/1 var(--ff);letter-spacing:.04em;box-shadow:0 20px 40px -20px var(--shade)}
.L-ticker .band span{display:inline-block;padding-left:100%;animation:ticker calc(28s*var(--sp)) linear infinite}
.L-ticker .band.b2{bottom:0;transform:rotate(2deg);background:var(--accent2);opacity:.85}
.L-ticker .band.b2 span{animation-direction:reverse}
.L-ticker ul,.L-ticker .brand{display:none}
.L-window .txt{max-width:42%;top:50%;bottom:auto;transform:translateY(-50%)}
.L-window .win{position:absolute;z-index:2;right:5%;top:12%;width:46%;aspect-ratio:16/10;border-radius:14px;background:var(--glass2);border:1px solid var(--line);box-shadow:0 40px 80px -30px var(--shade);overflow:hidden;transform:rotateY(-14deg) rotateX(4deg);animation:sway calc(10s*var(--sp)) ease-in-out infinite;transform-style:preserve-3d}
.L-window .win::before{content:"● ● ●";display:block;padding:8px 12px;font:10px/1 system-ui;letter-spacing:2px;color:var(--muted);border-bottom:1px solid var(--line)}
.L-window .win .obj{position:absolute;inset:auto;left:50%;top:56%;width:52%;transform:translate(-50%,-50%)}
.L-window > .obj{right:2%;top:auto;bottom:3%;width:19%}
.L-window .win img{position:absolute;inset:26px 0 0;width:100%;height:calc(100% - 26px);object-fit:cover}
.L-stack .txt{max-width:46%;top:50%;bottom:auto;transform:translateY(-50%)}
.L-stack .panes{position:absolute;z-index:2;right:6%;top:14%;width:40%;height:72%;transform-style:preserve-3d;transform:rotateY(-24deg) rotateX(8deg)}
.L-stack .pane{position:absolute;left:0;right:0;height:31%;top:calc(var(--i)*34%);border-radius:18px;background:var(--glass);border:1px solid var(--line);backdrop-filter:blur(6px);padding:18px;display:flex;align-items:flex-end;font:700 15px/1.3 var(--ff);color:var(--ink);transform:translateZ(calc(var(--i)*-36px)) translateX(calc(var(--i)*16px));animation:hover calc(7s*var(--sp)) ease-in-out infinite;animation-delay:calc(-1s*var(--i));box-shadow:0 20px 40px -20px var(--shade)}
.L-stack .pane b{display:block;font:800 26px/1 var(--ff);color:var(--accent2);margin-bottom:8px}
.T-light.L-stack .pane b{color:var(--accent)}
.L-stack .obj{right:auto;left:auto;top:auto;bottom:-8%;right:-4%;width:22%}
.L-stack ul{display:none}
.L-spotlight .txt{left:50%;transform:translateX(-50%);align-items:center;text-align:center;max-width:80%;bottom:8%}
.L-spotlight .kick{align-self:center}.L-spotlight ul,.L-spotlight .row{justify-content:center}
.L-spotlight .obj{right:auto;left:50%;top:4%;width:22%;transform:translateX(-50%)}
.L-spotlight .bg::after{content:"";position:absolute;width:70%;height:140%;left:15%;top:-40%;background:radial-gradient(closest-side,color-mix(in srgb,var(--glow) 42%,transparent),transparent);animation:sweep calc(8s*var(--sp)) ease-in-out infinite alternate}
.L-spotlight .tag{display:none}

@container (min-width:641px) and (max-width:900px){ul{display:none!important}.tag{-webkit-line-clamp:2}h3{font-size:clamp(20px,3.6cqi,32px)}.long h3,.xl h3{font-size:clamp(18px,3cqi,26px)}.L-magazine .big{font-size:12cqi}}
/* narrow places (phones, side columns): one column, the design keeps its scene, object and colours */
@container (max-width:640px){
  .pv{aspect-ratio:auto;min-height:0;display:flex;flex-direction:column;padding:22px 20px 24px}
  .txt,.L-split-rev .txt,.L-center .txt,.L-card .txt,.L-magazine .txt,.L-orbit .txt,.L-window .txt,.L-stack .txt,.L-spotlight .txt,.L-poster .txt,.L-ticker .txt{position:relative;inset:auto;transform:none;max-width:none;left:auto;right:auto;top:auto;bottom:auto;align-items:flex-start;text-align:left;padding:0;background:none;border:0;backdrop-filter:none;animation:none;box-shadow:none}
  .kick,.L-center .kick,.L-orbit .kick,.L-spotlight .kick{align-self:flex-start}
  ul,.row{justify-content:flex-start!important}
  .obj,.L-center .obj,.L-split .obj,.L-split-rev .obj,.L-orbit .obj,.L-spotlight .obj,.L-magazine .obj,.L-stack .obj,.L-poster .obj,.L-card .obj,.L-ticker .obj{position:relative;inset:auto;transform:none;opacity:1;width:46%;max-width:180px;margin:0 auto 14px;order:-1}
  .L-window .win,.L-stack .panes,.ring,.band,.ico,.big,.brand,.media{display:none}
  .L-window .win .obj{display:block}
  .tag,.L-orbit .tag,.L-spotlight .tag{display:block}
  .L-ticker ul,.L-stack ul{display:flex}
  .L-magazine .stat{display:inline-flex}
  h3{font-size:clamp(22px,7cqi,32px)}
}
:host([compact]) .pv{aspect-ratio:auto;min-height:0}

/* ---- scenes ---- */
.s{position:absolute;border-radius:50%}
.S-aurora .s{width:70%;height:70%;filter:blur(50px);opacity:.55;animation:drift calc(16s*var(--sp)) ease-in-out infinite alternate}
.S-aurora .s:nth-child(1){background:var(--accent);left:-10%;top:-20%}
.S-aurora .s:nth-child(2){background:var(--accent2);right:-15%;bottom:-25%;animation-delay:-5s}
.S-aurora .s:nth-child(3){background:var(--glow);left:30%;top:20%;width:40%;height:40%;animation-delay:-9s}
.S-particles .s{width:var(--z);height:var(--z);background:var(--accent2);left:var(--x);bottom:-10px;opacity:.7;animation:up calc(var(--d)*var(--sp)) linear infinite;animation-delay:var(--t);box-shadow:0 0 10px var(--accent2)}
.S-bubbles .s{width:var(--z2);height:var(--z2);border:1.5px solid color-mix(in srgb,var(--accent2) 70%,transparent);background:radial-gradient(circle at 30% 30%,color-mix(in srgb,#fff 35%,transparent),transparent 45%);left:var(--x);bottom:-80px;animation:up calc(var(--d)*1.6*var(--sp)) ease-in infinite;animation-delay:var(--t)}
.S-bokeh .s{width:var(--z3);height:var(--z3);background:radial-gradient(circle,color-mix(in srgb,var(--c) 70%,transparent),transparent 70%);left:var(--x);top:var(--y);filter:blur(2px);animation:float calc(var(--d)*var(--sp)) ease-in-out infinite;animation-delay:var(--t)}
.S-stars .s{width:2px;height:2px;background:var(--ink);left:var(--x);top:var(--y);opacity:.2;animation:blink calc(var(--d)*.4*var(--sp)) ease-in-out infinite;animation-delay:var(--t)}
.S-rings .s{left:72%;top:42%;width:10px;height:10px;border:2px solid var(--accent2);transform:translate(-50%,-50%);animation:ripple calc(6s*var(--sp)) ease-out infinite;animation-delay:calc(var(--i)*-1.2s*var(--sp))}
.S-grid .floor{position:absolute;left:-50%;right:-50%;bottom:-30%;height:80%;background-image:linear-gradient(var(--line) 1.5px,transparent 1.5px),linear-gradient(90deg,var(--line) 1.5px,transparent 1.5px);background-size:60px 60px;transform:perspective(500px) rotateX(64deg);animation:floor calc(5s*var(--sp)) linear infinite;mask-image:linear-gradient(0deg,#000 40%,transparent)}
.S-grid .floor::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,transparent,color-mix(in srgb,var(--accent) 25%,transparent))}
.S-rays .rays{position:absolute;left:50%;top:50%;width:180%;aspect-ratio:1;transform:translate(-50%,-50%);background:repeating-conic-gradient(from 0deg,color-mix(in srgb,var(--glow) 18%,transparent) 0 6deg,transparent 6deg 18deg);animation:spin calc(60s*var(--sp)) linear infinite;mask-image:radial-gradient(closest-side,#000,transparent)}
.S-mesh .mesh{position:absolute;inset:-30%;background:radial-gradient(30% 40% at 20% 30%,color-mix(in srgb,var(--accent) 55%,transparent),transparent),radial-gradient(30% 40% at 80% 70%,color-mix(in srgb,var(--accent2) 50%,transparent),transparent),radial-gradient(25% 30% at 60% 20%,color-mix(in srgb,var(--glow) 45%,transparent),transparent);filter:blur(30px);animation:spin calc(40s*var(--sp)) linear infinite}
.S-worldmap .map{position:absolute;left:-2%;right:-2%;top:12%;height:76%;background:var(--map) center/contain no-repeat;opacity:.38;filter:drop-shadow(0 0 6px var(--accent2))}
.T-light.S-worldmap .map{opacity:.35;filter:invert(1) sepia(1) hue-rotate(180deg)}
.S-worldmap .s{width:10px;height:10px;background:var(--accent2);left:var(--x);top:var(--y2);box-shadow:0 0 0 0 var(--accent2);animation:ping calc(3s*var(--sp)) infinite;animation-delay:var(--t)}
.bg svg{position:absolute;inset:0;width:100%;height:100%}
.S-hexes .bg .hx{fill:none;stroke:var(--line);stroke-width:1.2}
.S-hexes .bg .hx.on{stroke:var(--accent2);animation:blink calc(4s*var(--sp)) ease-in-out infinite;animation-delay:var(--t)}
.S-waves .bg path{fill:color-mix(in srgb,var(--accent) 22%,transparent);animation:slide calc(14s*var(--sp)) linear infinite}
.S-waves .bg path:nth-child(2){fill:color-mix(in srgb,var(--accent2) 18%,transparent);animation-duration:calc(20s*var(--sp));animation-direction:reverse}
.S-waves .bg path:nth-child(3){fill:color-mix(in srgb,var(--glow) 14%,transparent);animation-duration:calc(26s*var(--sp))}
.S-ribbons .bg path{fill:none;stroke-width:60;stroke-linecap:round;opacity:.35;stroke-dasharray:900 600;animation:dash calc(12s*var(--sp)) linear infinite;filter:blur(8px)}
.S-ribbons .bg path:nth-child(1){stroke:var(--accent)}.S-ribbons .bg path:nth-child(2){stroke:var(--accent2);animation-delay:-4s}.S-ribbons .bg path:nth-child(3){stroke:var(--glow);animation-delay:-8s}
.S-circuit .bg path{fill:none;stroke:var(--line);stroke-width:1.5}
.S-circuit .bg path.on{stroke:var(--accent2);stroke-width:2;stroke-dasharray:40 400;animation:dash calc(6s*var(--sp)) linear infinite;animation-delay:var(--t);filter:drop-shadow(0 0 4px var(--accent2))}
.S-circuit .bg circle{fill:var(--accent2)}
.S-pulse .bg path{fill:none;stroke:var(--accent2);stroke-width:3;stroke-dasharray:1400;stroke-dashoffset:1400;animation:draw calc(4s*var(--sp)) linear infinite;filter:drop-shadow(0 0 6px var(--accent2))}
.S-pulse .bg path.g{stroke:var(--line);stroke-width:1;stroke-dasharray:none;animation:none;filter:none;stroke-dashoffset:0}
.S-bars .bar{position:absolute;bottom:0;width:5%;left:var(--x);height:var(--h);border-radius:8px 8px 0 0;background:linear-gradient(0deg,transparent,color-mix(in srgb,var(--c) 45%,transparent));transform-origin:bottom;animation:grow calc(var(--d)*var(--sp)) ease-in-out infinite alternate;animation-delay:var(--t)}

/* ---- 3D objects ---- */
.o3{position:absolute;inset:0;transform-style:preserve-3d;animation:turn calc(18s*var(--sp)) linear infinite}
.O-globe i.sphere{position:absolute;inset:6%;border-radius:50%;background:radial-gradient(circle at 32% 28%,color-mix(in srgb,#fff 55%,var(--accent)),var(--accent) 38%,color-mix(in srgb,var(--bg1) 70%,var(--accent)) 78%);box-shadow:0 0 60px -10px var(--accent),inset -20px -30px 60px rgba(0,0,0,.35)}
.O-globe i.sphere::after{content:"";position:absolute;inset:0;border-radius:50%;background:var(--map) 0 50%/220% auto repeat-x;opacity:.55;mix-blend-mode:screen;animation:pan calc(24s*var(--sp)) linear infinite}
.O-globe i.mer{position:absolute;inset:6%;border-radius:50%;border:1.5px solid color-mix(in srgb,#fff 45%,transparent);transform:rotateY(calc(var(--i)*30deg))}
.O-globe i.o3{animation-duration:calc(30s*var(--sp))}
.O-globe i.halo{position:absolute;inset:-6%;border-radius:50%;border:2px dashed color-mix(in srgb,var(--accent2) 60%,transparent);transform:rotateX(74deg);animation:spin calc(16s*var(--sp)) linear infinite}
.O-cube i.o3{left:20%;top:20%;width:60%;height:60%;animation:cube calc(16s*var(--sp)) linear infinite}
.O-cube i.f{position:absolute;inset:0;border-radius:14px;background:linear-gradient(135deg,color-mix(in srgb,var(--accent) 85%,#fff),color-mix(in srgb,var(--accent2) 80%,#000));border:1px solid color-mix(in srgb,#fff 40%,transparent);display:grid;place-items:center;backface-visibility:visible;opacity:.94}
.O-cube i.f svg{width:46%;height:46%;stroke:#fff;fill:none;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
.O-cube i.f:nth-child(1){transform:translateZ(var(--h3))}.O-cube i.f:nth-child(2){transform:rotateY(180deg) translateZ(var(--h3))}
.O-cube i.f:nth-child(3){transform:rotateY(90deg) translateZ(var(--h3))}.O-cube i.f:nth-child(4){transform:rotateY(-90deg) translateZ(var(--h3))}
.O-cube i.f:nth-child(5){transform:rotateX(90deg) translateZ(var(--h3))}.O-cube i.f:nth-child(6){transform:rotateX(-90deg) translateZ(var(--h3))}
.O-gyro i.r{position:absolute;inset:calc(var(--i)*9% + 4%);border-radius:50%;border:5px solid color-mix(in srgb,var(--c) 85%,transparent);box-shadow:0 0 24px -4px var(--c);animation:gyro calc((8s + var(--i)*3s)*var(--sp)) linear infinite;animation-delay:calc(var(--i)*-2s)}
.O-gyro i.core{position:absolute;inset:40%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--accent2));box-shadow:0 0 40px var(--accent2)}
.O-chart3d i.o3{animation:yaw calc(10s*var(--sp)) ease-in-out infinite alternate;transform:rotateX(-18deg)}
.O-chart3d i.b{position:absolute;bottom:14%;width:13%;left:calc(10% + var(--i)*16%);height:var(--h);transform-style:preserve-3d;animation:grow calc(3s*var(--sp)) ease-in-out infinite alternate;animation-delay:calc(var(--i)*-.6s);transform-origin:bottom}
.O-chart3d i.b i{position:absolute;inset:0;background:linear-gradient(0deg,color-mix(in srgb,var(--c) 70%,#000),var(--c));border-radius:4px 4px 0 0}
.O-chart3d i.b i:nth-child(2){transform:rotateY(90deg) translateZ(calc(var(--w)/2));transform-origin:right;background:color-mix(in srgb,var(--c) 55%,#000);width:60%;right:0;left:auto}
.O-chart3d i.b i:nth-child(3){top:-8px;height:16px;bottom:auto;border-radius:50%/40%;background:color-mix(in srgb,var(--c) 60%,#fff)}
.O-chart3d i.base{position:absolute;left:4%;right:4%;bottom:10%;height:8%;border-radius:50%;background:radial-gradient(closest-side,color-mix(in srgb,var(--accent) 50%,transparent),transparent)}
.O-slabs i.sl{position:absolute;left:12%;right:12%;top:calc(14% + var(--i)*15%);height:30%;border-radius:18px;background:linear-gradient(135deg,color-mix(in srgb,#fff 30%,transparent),color-mix(in srgb,var(--c) 40%,transparent));border:1px solid color-mix(in srgb,#fff 45%,transparent);backdrop-filter:blur(6px);transform:rotateX(60deg) rotateZ(-30deg) translateZ(calc(var(--i)*-30px));box-shadow:0 30px 40px -20px var(--shade);animation:hover calc(6s*var(--sp)) ease-in-out infinite;animation-delay:calc(var(--i)*-.8s)}
.O-coins i.c{position:absolute;left:24%;width:52%;height:16%;bottom:calc(12% + var(--i)*8.5%);border-radius:50%;background:radial-gradient(ellipse at 40% 35%,#fff7c8,var(--coin) 45%,color-mix(in srgb,var(--coin) 60%,#000));box-shadow:0 6px 0 color-mix(in srgb,var(--coin) 55%,#000),0 10px 20px -6px var(--shade);animation:bob calc(4s*var(--sp)) ease-in-out infinite;animation-delay:calc(var(--i)*-.3s)}
.O-coins i.flip{position:absolute;left:34%;top:4%;width:32%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fff7c8,var(--coin) 50%,color-mix(in srgb,var(--coin) 55%,#000));display:grid;place-items:center;animation:flip calc(3.4s*var(--sp)) ease-in-out infinite;box-shadow:0 0 30px -6px var(--coin)}
.O-coins i.flip svg{width:50%;stroke:color-mix(in srgb,var(--coin) 40%,#000);fill:none;stroke-width:2;stroke-linecap:round}
.O-phone i.dev{position:absolute;left:28%;top:4%;width:44%;height:92%;border-radius:26px;background:linear-gradient(160deg,#1d2433,#0a0f19);border:2px solid color-mix(in srgb,#fff 25%,transparent);box-shadow:0 40px 60px -20px var(--shade),inset 0 0 0 6px #05080f;animation:sway calc(8s*var(--sp)) ease-in-out infinite;overflow:hidden;transform:rotateY(-18deg) rotateX(6deg)}
.O-phone i.scr{position:absolute;inset:10px;border-radius:18px;background:linear-gradient(160deg,var(--accent),var(--accent2));display:flex;flex-direction:column;gap:8%;padding:16% 12%}
.O-phone i.scr i{display:block;height:9%;border-radius:6px;background:rgba(255,255,255,.4);animation:load calc(3s*var(--sp)) ease-in-out infinite;animation-delay:calc(var(--i)*-.5s);transform-origin:left}
.O-phone i.scr i:first-child{height:22%;background:rgba(255,255,255,.75)}
.O-document i.pg{position:absolute;left:22%;top:8%;width:56%;height:80%;border-radius:10px;background:linear-gradient(160deg,#fff,#e7ecf5);box-shadow:0 30px 50px -20px var(--shade);transform:rotateY(-20deg) rotateZ(-6deg) translateZ(0);animation:hover calc(6s*var(--sp)) ease-in-out infinite;padding:12% 10%;display:flex;flex-direction:column;gap:7%}
.O-document i.pg.back{transform:rotateY(-20deg) rotateZ(6deg) translate(16%,6%) translateZ(-40px);opacity:.6;animation-delay:-2s;background:linear-gradient(160deg,var(--accent2),var(--accent))}
.O-document i.pg i{height:5%;border-radius:4px;background:#c9d3e3}
.O-document i.pg i:first-child{height:12%;width:60%;background:var(--accent)}
.O-document i.pg i:nth-child(4){width:70%}
.O-document i.pg b{display:block;margin-top:auto;height:26%;border-radius:6px;background:linear-gradient(90deg,var(--accent) 0 30%,var(--accent2) 30% 62%,var(--glow) 62%);opacity:.85}
.O-pyramid i.o3{left:20%;top:16%;width:60%;height:60%;animation:turn calc(14s*var(--sp)) linear infinite}
.O-pyramid i.t{position:absolute;left:0;bottom:0;width:100%;height:100%;clip-path:polygon(50% 0,100% 100%,0 100%);background:linear-gradient(180deg,color-mix(in srgb,#fff 50%,var(--c)),var(--c));transform-origin:50% 100%;opacity:.9}
.O-pyramid i.t:nth-child(1){transform:translateZ(var(--h3)) rotateX(30deg)}.O-pyramid i.t:nth-child(2){transform:rotateY(90deg) translateZ(var(--h3)) rotateX(30deg)}
.O-pyramid i.t:nth-child(3){transform:rotateY(180deg) translateZ(var(--h3)) rotateX(30deg)}.O-pyramid i.t:nth-child(4){transform:rotateY(270deg) translateZ(var(--h3)) rotateX(30deg)}
.O-atom i.nuc{position:absolute;inset:40%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,var(--accent));box-shadow:0 0 50px var(--accent)}
.O-atom i.orb{position:absolute;inset:6%;border-radius:50%;border:2px solid color-mix(in srgb,var(--c) 80%,transparent);transform:rotateZ(calc(var(--i)*60deg)) rotateX(72deg);transform-style:preserve-3d}
.O-atom i.orb::after{content:"";position:absolute;width:9%;height:9%;left:45.5%;top:-4.5%;border-radius:50%;background:var(--c);box-shadow:0 0 16px var(--c);offset-path:circle(50%);animation:orbit calc((3s + var(--i)*1s)*var(--sp)) linear infinite}
.O-atom i.o3{animation:turn calc(26s*var(--sp)) linear infinite}

@keyframes turn{to{transform:rotateY(360deg)}}
@keyframes cube{0%{transform:rotateX(-20deg) rotateY(0)}100%{transform:rotateX(-20deg) rotateY(360deg)}}
@keyframes yaw{from{transform:rotateX(-14deg) rotateY(-28deg)}to{transform:rotateX(-14deg) rotateY(28deg)}}
@keyframes spin{to{rotate:360deg}}
@keyframes gyro{from{transform:rotateX(70deg) rotateY(0)}to{transform:rotateX(70deg) rotateY(360deg)}}
@keyframes float{0%,100%{translate:0 0}50%{translate:0 -14px}}
@keyframes hover{0%,100%{translate:0 0}50%{translate:0 -10px}}
@keyframes bob{0%,100%{translate:0 0}50%{translate:0 -4px}}
@keyframes sway{0%,100%{rotate:y -10deg}50%{rotate:y 8deg}}
@keyframes tilt{0%,100%{transform:rotateY(-4deg) rotateX(2deg)}50%{transform:rotateY(4deg) rotateX(-2deg)}}
@keyframes flip{0%,100%{transform:rotateY(0)}50%{transform:rotateY(180deg)}}
@keyframes up{from{transform:translateY(0);opacity:0}10%{opacity:.8}to{transform:translateY(-560px);opacity:0}}
@keyframes drift{from{transform:translate(0,0) scale(1)}to{transform:translate(12%,10%) scale(1.2)}}
@keyframes blink{0%,100%{opacity:.25}50%{opacity:1}}
@keyframes ring{0%{transform:scale(.9);opacity:.8}100%{transform:scale(1.7);opacity:0}}
@keyframes ripple{from{width:10px;height:10px;opacity:.9}to{width:120%;height:120%;opacity:0}}
@keyframes floor{to{background-position:0 60px}}
@keyframes slide{to{transform:translateX(-50%)}}
@keyframes dash{to{stroke-dashoffset:-1500}}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes grow{from{transform:scaleY(.55)}to{transform:scaleY(1)}}
@keyframes ping{0%{box-shadow:0 0 0 0 color-mix(in srgb,var(--accent2) 70%,transparent)}100%{box-shadow:0 0 0 18px transparent}}
@keyframes pan{to{background-position:-220% 50%}}
@keyframes load{0%,100%{transform:scaleX(.5)}50%{transform:scaleX(1)}}
@keyframes orbit{to{offset-distance:100%}}
@keyframes wave{0%,100%{transform:skewY(0) scaleX(1)}50%{transform:skewY(-4deg) scaleX(.96)}}
@keyframes rise{from{opacity:0;transform:translateY(10px)}}
@keyframes ticker{to{transform:translateX(-100%)}}
@keyframes sweep{from{transform:translateX(-25%) rotate(-12deg)}to{transform:translateX(25%) rotate(12deg)}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:0s!important;animation-iteration-count:1!important;transition:none!important}}
/* ===== build 82.6: showcase templates (words beside a framed video, like the Turn2Opinion video window) ===== */
.pv.SC{aspect-ratio:auto;min-height:0;display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:center;gap:clamp(18px,4cqi,56px);padding:clamp(26px,4.4cqi,60px) clamp(22px,4cqi,56px);
  background:radial-gradient(90% 80% at 80% 20%,color-mix(in srgb,var(--glow) 22%,transparent),transparent 62%),radial-gradient(70% 70% at 0% 100%,color-mix(in srgb,var(--accent) 14%,transparent),transparent 60%),linear-gradient(140deg,var(--bg1),var(--bg2))}
.pv.SC.L-showcase-rev{grid-template-columns:minmax(0,1.08fr) minmax(0,.92fr)}
.L-showcase-rev .info{order:2}
.SC .bg{opacity:.55}
.SC .info{position:relative;z-index:4;display:flex;flex-direction:column;gap:clamp(10px,1.5cqi,18px);min-width:0}
.SC .pill{display:inline-flex;align-items:center;gap:10px;align-self:flex-start;max-width:100%;padding:8px 16px 8px 10px;border-radius:999px;border:1px solid color-mix(in srgb,var(--accent) 45%,transparent);background:color-mix(in srgb,var(--bg1) 55%,transparent);color:var(--accent);font:800 clamp(11px,1.15cqi,14px)/1.2 var(--ff);letter-spacing:.14em;text-transform:uppercase;animation:rise .6s both}
.SC .pill span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.SC .yt{flex:none;width:26px;height:18px;border-radius:5px;background:#e62117;display:grid;place-items:center}
.SC .yt svg{width:9px;height:9px;fill:#fff;margin-left:1px}
.SC h3.sh{display:block;margin:0;font:800 clamp(26px,4.3cqi,56px)/1.03 var(--ff);letter-spacing:-.035em;color:var(--ink);text-wrap:balance;animation:rise .7s .08s both;-webkit-line-clamp:unset;overflow:visible}
.SC h3.sh em{display:block;margin-top:.06em;font-family:"Fraunces","Playfair Display","DM Serif Display",Georgia,serif;font-style:italic;font-weight:700;letter-spacing:-.02em;color:var(--accent);padding-right:.1em}
.SC.long h3.sh{font-size:clamp(23px,3.4cqi,44px)}.SC.xl h3.sh{font-size:clamp(21px,2.9cqi,36px)}
.SC .lede{margin:0;font:500 clamp(14px,1.55cqi,19px)/1.55 var(--ff);color:var(--muted);max-width:52ch;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;animation:rise .7s .16s both}
.SC .steps{display:grid;gap:clamp(10px,1.4cqi,16px);margin:4px 0 2px;padding:0;list-style:none}
.SC .step{display:grid;grid-template-columns:auto 1fr;align-items:center;column-gap:16px;row-gap:9px;font:700 clamp(14px,1.55cqi,19px)/1.3 var(--ff);color:var(--ink);padding:0;background:none;border:0;backdrop-filter:none;animation:rise .6s both;animation-delay:calc(.25s + .1s*var(--i))}
.SC .step b{grid-row:span 2;min-width:44px;height:44px;padding:0 6px;border-radius:12px;display:grid;place-items:center;background:color-mix(in srgb,var(--ink) 10%,transparent);border:1px solid var(--line);color:color-mix(in srgb,var(--accent) 70%,var(--ink));font:800 14px/1 var(--ff);margin:0}
.SC .step span{min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.SC .step i{display:block;height:6px;border-radius:9px;width:calc(var(--w)*100%);background:linear-gradient(90deg,var(--accent),color-mix(in srgb,var(--accent) 60%,var(--accent2)));transform-origin:left;animation:bar 1.4s cubic-bezier(.2,.8,.2,1) both;animation-delay:calc(.5s + .15s*var(--i));box-shadow:0 0 14px -2px color-mix(in srgb,var(--accent) 70%,transparent)}
.SC .meta{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
.SC .btns{display:flex;flex-wrap:wrap;gap:12px;margin-top:6px;animation:rise .7s .5s both}
.SC .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;min-height:52px;padding:0 26px;border-radius:999px;text-decoration:none;font:800 clamp(14px,1.45cqi,18px)/1 var(--ff);transition:transform .2s,box-shadow .2s;cursor:pointer;border:0}
.SC .btn:hover{transform:translateY(-2px)}
.SC .btn:focus-visible{outline:3px solid var(--ink);outline-offset:3px}
.SC .btn.go{background:var(--accent);color:var(--on);box-shadow:0 16px 36px -14px var(--accent)}
.SC .btn.sub{background:#e62117;color:#fff;box-shadow:0 16px 36px -14px #e62117}
.SC .btn.sub .yt{background:#fff}.SC .btn.sub .yt svg{fill:#e62117}
/* the stage: a frame around the video screen, a prop beside it, floating icons */
.SC .stage{position:relative;z-index:3;min-width:0;padding:clamp(10px,2cqi,26px) 0;animation:pop .9s .1s cubic-bezier(.2,.8,.2,1) both}
.SC .fr{position:relative;transform-style:preserve-3d;animation:tilt calc(9s*var(--sp)) ease-in-out infinite}
.SC .screen{container-type:inline-size;position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:16px;background:linear-gradient(150deg,var(--bg2),var(--bg1));isolation:isolate;box-shadow:0 30px 60px -28px rgba(0,0,0,.7)}
.SC .screen .frame{position:absolute;inset:0;z-index:20}
.SC .poster{position:absolute;inset:0;z-index:0;overflow:hidden;padding:6% 5.5%;display:flex;flex-direction:column;justify-content:center;gap:4%}
.SC .poster::before{content:"";position:absolute;inset:0;background:var(--map) 50% 40%/130% auto no-repeat;opacity:.16;z-index:-1}
.SC .poster::after{content:"";position:absolute;inset:-30%;background:radial-gradient(closest-side,color-mix(in srgb,var(--glow) 36%,transparent),transparent);left:30%;top:-40%;z-index:-1;animation:drift calc(9s*var(--sp)) ease-in-out infinite alternate}
.SC .bigt{margin:0;max-width:66%;font:900 clamp(16px,4.3cqi,54px)/.98 var(--ff);letter-spacing:-.035em;text-transform:uppercase;color:var(--ink);text-shadow:0 6px 24px rgba(0,0,0,.35)}
.SC .bigt span{display:block;animation:rise .7s both;animation-delay:calc(.3s + .12s*var(--i))}
.SC .bigt span:nth-child(2){color:color-mix(in srgb,var(--accent2) 85%,#fff)}
.SC .bigt span:nth-child(3){color:var(--accent)}
.T-light .SC .bigt,.SC.T-light .bigt{text-shadow:none}
.SC .chips{display:flex;flex-wrap:wrap;gap:6px;max-width:64%}
.SC .chip{font:800 clamp(8px,2.5cqi,15px)/1 var(--ff);padding:.55em .9em;border-radius:999px;background:color-mix(in srgb,var(--accent2) 30%,transparent);color:var(--ink);border:1px solid color-mix(in srgb,var(--accent2) 50%,transparent);animation:rise .6s both;animation-delay:calc(.7s + .1s*var(--i))}
.SC .chip:first-child{background:color-mix(in srgb,var(--accent) 34%,transparent);border-color:color-mix(in srgb,var(--accent) 60%,transparent)}
.SC .badge{position:absolute;z-index:3;top:5%;right:4%;display:flex;align-items:center;gap:7px;padding:.45em .9em .45em .45em;border-radius:999px;background:#fff;color:#14215a;font:900 clamp(7px,2.1cqi,13px)/1 var(--ff);letter-spacing:.02em;text-transform:uppercase;box-shadow:0 8px 20px -8px rgba(0,0,0,.5)}
.SC .badge i{width:1.7em;height:1.7em;border-radius:50%;background:conic-gradient(from 200deg,#2f6bff,#6d4aff,#0e9c88,#2f6bff);box-shadow:inset 0 0 0 3px #fff}
.SC .poster .obj{position:absolute;z-index:1;right:4%;top:auto;bottom:10%;width:34%;left:auto;transform:none}
.SC .pic{position:absolute;inset:0;z-index:2;width:100%;height:100%;object-fit:cover}
.SC .cap{position:absolute;z-index:4;left:0;right:0;bottom:0;padding:16% 5% 4.5%;background:linear-gradient(0deg,color-mix(in srgb,var(--bg1) 92%,transparent),transparent);display:flex;flex-direction:column;gap:4px;pointer-events:none}
.SC .cap small{font:800 clamp(8px,2cqi,13px)/1.2 var(--ff);letter-spacing:.16em;text-transform:uppercase;color:var(--accent)}
.SC .cap b{font:800 clamp(12px,3.8cqi,26px)/1.2 var(--ff);color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.SC .poster~.cap{display:none}
.SC.has-pic .poster~.cap{display:flex}
.SC .bigplay{all:unset;cursor:pointer;position:absolute;z-index:6;left:50%;top:46%;width:clamp(46px,17cqi,112px);aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);display:grid;place-items:center;background:#e62117;box-shadow:0 16px 40px -10px rgba(230,33,23,.8);transition:transform .2s}
.SC .poster~.bigplay{left:79%;top:58%}
.SC.has-pic .bigplay{left:50%;top:46%}
.SC .bigplay:hover{scale:1.07}
.SC .bigplay:focus-visible{outline:4px solid #fff;outline-offset:4px}
.SC .bigplay svg{width:34%;height:34%;fill:#fff;margin-left:8%}
.SC .bigplay::before,.SC .bigplay::after{content:"";position:absolute;inset:-14%;border-radius:50%;border:2px solid color-mix(in srgb,#fff 60%,transparent);animation:ring calc(2.6s*var(--sp)) infinite}
.SC .bigplay::after{inset:-30%;border-color:color-mix(in srgb,#fff 25%,transparent);animation-delay:calc(1.3s*var(--sp))}
.SC .bigplay[disabled]{opacity:.6;cursor:default}
.SC .ico{width:clamp(34px,4.4cqi,52px);height:clamp(34px,4.4cqi,52px)}
/* props: a small live card beside the screen that shows what the page is about */
.SC .prop{position:absolute;z-index:7;width:clamp(120px,15cqi,200px);padding:12px 13px;border-radius:14px;background:#ffffffee;color:#1b2340;box-shadow:0 22px 44px -18px rgba(0,0,0,.55);font:700 11.5px/1.3 var(--ff);display:grid;gap:6px;animation:float calc(7s*var(--sp)) ease-in-out infinite;backdrop-filter:blur(6px)}
.SC .prop.p-br{right:-3%;bottom:-6%}.SC .prop.p-bl{left:-4%;bottom:-8%}.SC .prop.p-tr{right:-3%;top:-4%}.SC .prop.p-tl{left:-4%;top:-6%}
.SC .prop .t{font:800 12px/1.2 var(--ff);color:#0b1437;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.SC .prop .r{display:flex;align-items:center;gap:7px;min-width:0}
.SC .prop .r>span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.SC .prop .k{flex:none;width:12px;height:12px;border-radius:50%;border:2px solid var(--accent2)}
.SC .prop .r:nth-child(3) .k{background:var(--accent2);box-shadow:inset 0 0 0 2px #fff}
.SC .prop .ln{height:7px;border-radius:5px;background:#d3d9e8;flex:1}
.SC .prop .ln.half{flex:.55}.SC .prop .ln.a{background:color-mix(in srgb,var(--accent2) 60%,#fff)}
.SC .prop .bars{display:flex;align-items:flex-end;gap:5px;height:58px}
.SC .prop .bars i{flex:1;height:calc(var(--h)*100%);border-radius:4px 4px 2px 2px;background:linear-gradient(0deg,var(--accent2),color-mix(in srgb,var(--accent) 70%,#fff));transform-origin:bottom;animation:grow calc(2.4s*var(--sp)) ease-in-out infinite alternate;animation-delay:calc(.2s*var(--i))}
.SC .prop .bub{justify-self:start;max-width:88%;padding:6px 9px;border-radius:12px 12px 12px 3px;background:#eef1f8;animation:rise .5s both;animation-delay:calc(.5s + .5s*var(--i))}
.SC .prop .bub.me{justify-self:end;border-radius:12px 12px 3px 12px;background:var(--accent2);color:#fff}
.SC .prop .num{margin-left:auto;font:700 11px/1 ui-monospace,Menlo,monospace;color:#3b4466}
.SC .prop .cal{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.SC .prop .cal i{aspect-ratio:1;border-radius:3px;background:#e8ecf6}
.SC .prop .cal i.on{background:var(--accent2);animation:blink calc(3s*var(--sp)) infinite;animation-delay:calc(.3s*var(--i))}
.SC .prop .stars{color:#f2b632;font-size:17px;letter-spacing:2px}
.SC .prop .stars i{font-style:normal;display:inline-block;animation:rise .4s both;animation-delay:calc(.4s + .15s*var(--i))}
.SC .prop .dial{position:relative;width:96px;height:48px;margin:0 auto;overflow:hidden}
.SC .prop .dial::before{content:"";position:absolute;inset:0 0 -100% 0;border-radius:50%;background:conic-gradient(from 270deg,#e5484d,#f2b632 25%,#30a46c 50%,transparent 50%);-webkit-mask:radial-gradient(closest-side,transparent 64%,#000 66%);mask:radial-gradient(closest-side,transparent 64%,#000 66%)}
.SC .prop .dial i{position:absolute;left:50%;bottom:0;width:3px;height:42px;margin-left:-1.5px;background:#0b1437;border-radius:3px;transform-origin:bottom;animation:needle calc(4s*var(--sp)) ease-in-out infinite alternate}
.SC .prop .code{display:grid;gap:5px}
.SC .prop .code i{height:6px;border-radius:4px;width:calc(var(--w)*100%);background:linear-gradient(90deg,var(--accent2) 30%,#c6cde0 30%);animation:type 2.4s steps(14) both;animation-delay:calc(.4s*var(--i))}
.SC .prop .dots{display:flex;gap:4px}.SC .prop .dots i{width:7px;height:7px;border-radius:50%;background:#e5484d}.SC .prop .dots i+i{background:#f2b632}.SC .prop .dots i+i+i{background:#30a46c}
.SC .prop .fun{display:grid;gap:4px;justify-items:center}
.SC .prop .fun i{display:block;height:16px;border-radius:5px;width:calc(100% - var(--i)*18%);background:color-mix(in srgb,var(--accent2) calc(90% - var(--i)*18%),#fff);color:#fff;font:800 9.5px/16px var(--ff);text-align:center;font-style:normal;animation:rise .5s both;animation-delay:calc(.3s + .15s*var(--i))}
.SC .prop .shd{width:54px;height:62px;margin:0 auto;background:linear-gradient(160deg,var(--accent2),color-mix(in srgb,var(--accent2) 50%,#0b1437));clip-path:polygon(50% 0,100% 18%,100% 55%,50% 100%,0 55%,0 18%);display:grid;place-items:center;color:#fff;font:900 22px/1 var(--ff);animation:pulse2 calc(2.4s*var(--sp)) ease-in-out infinite}
.SC .prop .ok{flex:none;width:16px;height:16px;border-radius:5px;background:#30a46c;color:#fff;font:900 10px/16px var(--ff);text-align:center;animation:rise .4s both;animation-delay:calc(.5s + .3s*var(--i))}
.SC .prop .pie{width:74px;height:74px;margin:0 auto;border-radius:50%;background:conic-gradient(var(--accent2) 0 42%,var(--accent) 0 70%,#c6cde0 0);animation:spin calc(16s*var(--sp)) linear infinite;-webkit-mask:radial-gradient(closest-side,transparent 45%,#000 47%);mask:radial-gradient(closest-side,transparent 45%,#000 47%)}
.SC .prop .q{padding:6px 9px;border-radius:999px;background:#eef1f8;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.SC .prop .top{outline:2px solid var(--accent2);border-radius:6px;padding:2px 4px}
.SC .prop .hrt{color:#e5484d}
.SC .prop .stamp{justify-self:end;rotate:-10deg;border:2px solid #30a46c;color:#30a46c;border-radius:6px;padding:2px 6px;font:900 11px/1.2 var(--ff);animation:rise .5s 1s both}
/* frames */
.F-bubble .screen{border-radius:22px;box-shadow:0 0 0 clamp(8px,1.2cqi,14px) color-mix(in srgb,var(--ink) 9%,transparent),0 0 0 clamp(9px,1.3cqi,15px) var(--line),0 30px 60px -28px rgba(0,0,0,.7)}
.F-bubble .fr::after{content:"";position:absolute;left:8%;bottom:calc(-1 * clamp(26px,3.6cqi,44px));width:clamp(26px,3.6cqi,44px);aspect-ratio:1;background:color-mix(in srgb,var(--ink) 12%,var(--bg1));clip-path:polygon(0 0,100% 0,0 100%)}
.F-tablet .screen{border-radius:12px;box-shadow:0 0 0 clamp(10px,1.6cqi,18px) #10131c,0 0 0 clamp(11px,1.7cqi,19px) #3a3f52,0 30px 60px -24px rgba(0,0,0,.8)}
.F-laptop .fr{padding-bottom:4%}.F-laptop .screen{border-radius:12px 12px 0 0;box-shadow:0 0 0 clamp(8px,1.2cqi,12px) #151925,0 0 0 clamp(9px,1.3cqi,13px) #444b60}
.F-laptop .fr::after{content:"";position:absolute;left:-7%;right:-7%;bottom:0;height:5%;border-radius:0 0 18px 18px;background:linear-gradient(#c9cfdd,#8e95a8);box-shadow:0 18px 30px -12px rgba(0,0,0,.6)}
.F-tv .fr{padding-bottom:8%}.F-tv .screen{border-radius:8px;box-shadow:0 0 0 clamp(6px,1cqi,10px) #0a0c12,0 0 0 clamp(7px,1.1cqi,11px) #30364a,0 0 40px -6px color-mix(in srgb,var(--accent2) 60%,transparent)}
.F-tv .fr::after{content:"";position:absolute;left:38%;right:38%;bottom:0;height:8%;background:linear-gradient(#3a4055,#1a1e2b);clip-path:polygon(30% 0,70% 0,100% 100%,0 100%);border-radius:4px}
.F-browser .screen{border-radius:0 0 14px 14px}
.F-browser .fr::before{content:"";display:block;height:clamp(22px,2.8cqi,34px);border-radius:14px 14px 0 0;background:radial-gradient(circle at 18px 50%,#e5484d 5px,transparent 6px),radial-gradient(circle at 36px 50%,#f2b632 5px,transparent 6px),radial-gradient(circle at 54px 50%,#30a46c 5px,transparent 6px),linear-gradient(#eef1f8,#dfe4ef)}
.F-phone .screen{border-radius:28px;box-shadow:0 0 0 clamp(9px,1.4cqi,14px) #0d1018,0 0 0 clamp(10px,1.5cqi,15px) #454c62,0 30px 60px -24px rgba(0,0,0,.8)}
.F-phone .screen::before{content:"";position:absolute;z-index:9;left:1.2%;top:38%;width:1.6%;height:24%;border-radius:9px;background:#0d1018}
.F-polaroid .fr{background:#fffdf6;padding:3.2% 3.2% 12%;border-radius:6px;box-shadow:0 30px 60px -26px rgba(0,0,0,.75);rotate:-2.2deg}
.F-polaroid .screen{border-radius:3px;box-shadow:none}
.F-polaroid .fr::after{content:"";position:absolute;left:40%;top:-3%;width:20%;height:7%;background:color-mix(in srgb,var(--accent) 45%,#fff8);rotate:-4deg;opacity:.85}
.F-film .fr{background:#0c0d12;padding:6% 2.5%;border-radius:8px;box-shadow:0 30px 60px -26px rgba(0,0,0,.8)}
.F-film .fr::before,.F-film .fr::after{content:"";position:absolute;left:2%;right:2%;height:3%;background:repeating-linear-gradient(90deg,#f4f1e8 0 3.2%,transparent 3.2% 6%);border-radius:2px;animation:holes calc(3s*var(--sp)) linear infinite}
.F-film .fr::before{top:1.5%}.F-film .fr::after{bottom:1.5%}
.F-film .screen{border-radius:3px}
.F-scanner .fr{padding:3%}
.F-scanner .fr::before{content:"";position:absolute;inset:0;z-index:8;pointer-events:none;background:linear-gradient(var(--accent),var(--accent)) 0 0/14% 3px,linear-gradient(var(--accent),var(--accent)) 0 0/3px 22%,linear-gradient(var(--accent),var(--accent)) 100% 0/14% 3px,linear-gradient(var(--accent),var(--accent)) 100% 0/3px 22%,linear-gradient(var(--accent),var(--accent)) 0 100%/14% 3px,linear-gradient(var(--accent),var(--accent)) 0 100%/3px 22%,linear-gradient(var(--accent),var(--accent)) 100% 100%/14% 3px,linear-gradient(var(--accent),var(--accent)) 100% 100%/3px 22%;background-repeat:no-repeat}
.F-scanner .screen::after{content:"";position:absolute;z-index:8;left:0;right:0;height:3px;background:var(--accent);box-shadow:0 0 18px 4px color-mix(in srgb,var(--accent) 70%,transparent);animation:scan calc(3.6s*var(--sp)) ease-in-out infinite alternate;pointer-events:none}
.F-gift .fr{padding:3.4%;border-radius:18px;background:color-mix(in srgb,var(--accent) 75%,#fff);box-shadow:0 30px 60px -26px rgba(0,0,0,.75)}
.F-gift .screen{border-radius:10px}
.F-gift .fr::before,.F-gift .fr::after{content:"";position:absolute;z-index:-1;background:linear-gradient(90deg,color-mix(in srgb,var(--accent2) 80%,#000),var(--accent2),color-mix(in srgb,var(--accent2) 80%,#000))}
.F-gift .fr{isolation:isolate}
.F-gift .fr::before{left:18%;top:0;bottom:0;width:6%}
.F-gift .fr::after{left:0;right:0;top:20%;height:9%;background:linear-gradient(color-mix(in srgb,var(--accent2) 80%,#000),var(--accent2),color-mix(in srgb,var(--accent2) 80%,#000))}
.F-gift .screen::before{content:"";position:absolute;z-index:9;left:calc(21% - 26px);top:-2px;width:52px;height:26px;background:radial-gradient(circle at 25% 60%,var(--accent2) 0 11px,transparent 12px),radial-gradient(circle at 75% 60%,var(--accent2) 0 11px,transparent 12px);filter:drop-shadow(0 3px 4px rgba(0,0,0,.4))}
.F-post .fr{background:#fff;border-radius:16px;padding:0 0 3.5%;box-shadow:0 30px 60px -26px rgba(0,0,0,.75);overflow:hidden}
.F-post .fr::before{content:"Frequent Research  ·  Sponsored";display:block;padding:3% 4% 3% 13%;font:800 clamp(10px,1.2cqi,14px)/1.2 var(--ff);color:#1b2340;background:radial-gradient(circle at 6.5% 50%,var(--accent2) 0 clamp(10px,1.4cqi,16px),transparent calc(clamp(10px,1.4cqi,16px) + 1px))}
.F-post .fr::after{content:"♥ Like      💬 Comment      ↗ Share";display:block;padding:3% 4% 0;font:700 clamp(10px,1.15cqi,13px)/1 var(--ff);color:#56607a}
.F-post .screen{border-radius:0;box-shadow:none}
.F-ticket .fr{background:color-mix(in srgb,var(--accent) 20%,#fff);padding:3% 3% 3% 13%;border-radius:14px;-webkit-mask:radial-gradient(circle 14px at 9% 0,#0000 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 14px at 9% 100%,#0000 98%,#000) bottom/100% 51% no-repeat;mask:radial-gradient(circle 14px at 9% 0,#0000 98%,#000) top/100% 51% no-repeat,radial-gradient(circle 14px at 9% 100%,#0000 98%,#000) bottom/100% 51% no-repeat}
.F-ticket .fr::before{content:"ADMIT ONE";position:absolute;left:1.6%;top:50%;writing-mode:vertical-rl;transform:translateY(-50%) rotate(180deg);font:900 clamp(8px,1.05cqi,12px)/1 var(--ff);letter-spacing:.2em;color:#3a1a2e}
.F-ticket .screen{border-radius:8px}
.F-folder .fr{background:#f4ebd8;padding:7% 3% 3%;border-radius:4px 14px 14px 14px;box-shadow:0 30px 60px -26px rgba(0,0,0,.75)}
.F-folder .fr::before{content:"CASE FILE";position:absolute;left:0;top:-7%;padding:1.3% 4%;background:#f4ebd8;border-radius:10px 10px 0 0;font:900 clamp(9px,1.15cqi,13px)/1 var(--ff);letter-spacing:.18em;color:#0b1437}
.F-folder .fr::after{content:"APPROVED";position:absolute;right:3%;top:1%;rotate:6deg;border:2px solid #b4441c;color:#b4441c;border-radius:6px;padding:.3% 2%;font:900 clamp(8px,1.1cqi,13px)/1.4 var(--ff);letter-spacing:.12em}
.F-folder .screen{border-radius:4px}
.F-neon .screen{border-radius:18px}
.F-neon .fr::before{content:"";position:absolute;inset:-5px;border-radius:22px;background:conic-gradient(from var(--a,0deg),var(--accent),var(--accent2),var(--glow),var(--accent));filter:blur(.5px);animation:neon calc(5s*var(--sp)) linear infinite;z-index:-1}
.F-neon .fr::after{content:"";position:absolute;inset:-5px;border-radius:22px;background:inherit;z-index:-2;box-shadow:0 0 50px 4px color-mix(in srgb,var(--accent2) 55%,transparent)}
.F-stack .screen{border-radius:16px}
.F-stack .fr::before,.F-stack .fr::after{content:"";position:absolute;inset:0;border-radius:16px;z-index:-1;background:color-mix(in srgb,var(--accent2) 30%,var(--bg2));border:1px solid var(--line);transform:translate(5%,-7%) scale(.94)}
.F-stack .fr::after{background:color-mix(in srgb,var(--accent) 22%,var(--bg2));transform:translate(10%,-14%) scale(.88);z-index:-2}
.F-glass .fr{padding:3%;border-radius:26px;background:color-mix(in srgb,var(--ink) 8%,transparent);border:1px solid var(--line);backdrop-filter:blur(12px);box-shadow:0 40px 80px -30px rgba(0,0,0,.7)}
.F-glass .screen{border-radius:18px}
.F-cinema .fr{padding:3% 3% 6%;border-radius:10px;background:linear-gradient(#5b1220,#2a0710);box-shadow:0 30px 60px -26px rgba(0,0,0,.8)}
.F-cinema .fr::before,.F-cinema .fr::after{content:"";position:absolute;top:0;bottom:0;width:9%;z-index:8;background:repeating-linear-gradient(90deg,#8d1a2e 0 6px,#5e0f1d 6px 12px);box-shadow:0 0 20px rgba(0,0,0,.6);animation:curtain calc(6s*var(--sp)) ease-in-out infinite alternate}
.F-cinema .fr::before{left:0;border-radius:10px 0 0 10px}.F-cinema .fr::after{right:0;border-radius:0 10px 10px 0}
.F-cinema .screen{border-radius:4px}
@keyframes bar{from{transform:scaleX(0)}}
@keyframes pop{from{opacity:0;transform:translateY(24px) scale(.96)}}
@keyframes needle{from{rotate:-70deg}to{rotate:55deg}}
@keyframes type{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes pulse2{0%,100%{scale:1}50%{scale:1.08}}
@keyframes scan{from{top:2%}to{top:96%}}
@keyframes holes{to{background-position:6% 0}}
@keyframes curtain{from{width:9%}to{width:6%}}
@property --a{syntax:"<angle>";initial-value:0deg;inherits:false}
@keyframes neon{to{--a:360deg}}
@container (max-width:900px){
  .pv.SC,.pv.SC.L-showcase-rev{grid-template-columns:1fr;gap:28px}
  .L-showcase-rev .info{order:0}
  .SC .stage{order:-1}
  .SC .prop{width:clamp(110px,26cqi,170px)}
}
@container (max-width:520px){
  .pv.SC{padding:26px 18px 30px}
  .SC h3.sh{font-size:clamp(28px,9cqi,40px)}.SC.long h3.sh,.SC.xl h3.sh{font-size:clamp(24px,7.4cqi,32px)}
  .SC .step span{white-space:normal}
  .SC .btns{flex-direction:column}.SC .btn{width:100%}
  .SC .prop{display:none}
  .SC .poster .obj{width:30%}
  .SC .bigt{max-width:72%}
  .F-ticket .fr{padding-left:10%}
}
@media (prefers-reduced-motion:reduce){.SC .fr,.SC .prop,.SC .step i,.SC .bigplay::before,.SC .bigplay::after,.F-neon .fr::before,.F-film .fr::before,.F-film .fr::after,.F-scanner .screen::after,.F-cinema .fr::before,.F-cinema .fr::after{animation:none}}
`;

  /* ---------------------------------------------------------------- helpers ------------------------------------ */
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined && text !== null) e.textContent = String(text); return e; };
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); return e; };
  const icon = (id) => { const s = svgEl('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }); s.appendChild(svgEl('path', { d: P[id] || P.play })); return s; };
  const rnd = (seed) => { let x = seed >>> 0 || 1; return () => ((x = Math.imul(x ^ (x >>> 15), 2246822507) ^ Math.imul(x ^ (x >>> 13), 3266489909)) >>> 0) / 4294967296; };
  const hashStr = (s) => { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const HEX = /^#[0-9a-f]{6}$/i;
  const safeLink = (u) => { try { const x = new URL(String(u || ''), location.href); return /^https?:$/.test(x.protocol) ? x.href : ''; } catch (e) { return ''; } };
  function youTubeId(u) { try { const x = new URL(u); if (/(^|\.)youtu\.be$/.test(x.hostname)) return x.pathname.slice(1, 12); if (/(^|\.)youtube(-nocookie)?\.com$/.test(x.hostname)) { if (x.searchParams.get('v')) return x.searchParams.get('v').slice(0, 11); const m = x.pathname.match(/\/(embed|shorts|live|v)\/([\w-]{11})/); if (m) return m[2]; } } catch (e) {} return ''; }
  function vimeoId(u) { try { const x = new URL(u); if (/(^|\.)vimeo\.com$/.test(x.hostname)) { const m = x.pathname.match(/(\d{6,12})/); if (m) return m[1]; } } catch (e) {} return ''; }

  function scene(kind, root, seed) {
    const r = rnd(seed), add = (n, fn) => { for (let i = 0; i < n; i++) { const s = el('i', 's'); fn(s, i); root.appendChild(s); } };
    const pct = () => (r() * 100).toFixed(1) + '%';
    const svg = (w, h) => { const s = svgEl('svg', { viewBox: `0 0 ${w} ${h}`, preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' }); root.appendChild(s); return s; };
    if (kind === 'aurora') add(3, () => {});
    if (kind === 'particles') add(26, (s) => { s.style.cssText = `--x:${pct()};--z:${(2 + r() * 5).toFixed(1)}px;--d:${(6 + r() * 8).toFixed(1)}s;--t:${(-r() * 14).toFixed(1)}s`; });
    if (kind === 'bubbles') add(14, (s) => { s.style.cssText = `--x:${pct()};--z2:${(14 + r() * 46).toFixed(0)}px;--d:${(7 + r() * 8).toFixed(1)}s;--t:${(-r() * 18).toFixed(1)}s`; });
    if (kind === 'bokeh') add(14, (s, i) => { s.style.cssText = `--x:${pct()};--y:${pct()};--z3:${(40 + r() * 120).toFixed(0)}px;--d:${(6 + r() * 6).toFixed(1)}s;--t:${(-r() * 8).toFixed(1)}s;--c:var(${['--accent', '--accent2', '--glow'][i % 3]})`; });
    if (kind === 'stars') add(70, (s) => { s.style.cssText = `--x:${pct()};--y:${pct()};--d:${(4 + r() * 8).toFixed(1)}s;--t:${(-r() * 8).toFixed(1)}s`; });
    if (kind === 'rings') add(5, (s, i) => s.style.setProperty('--i', i));
    if (kind === 'grid') root.appendChild(el('i', 'floor'));
    if (kind === 'rays') root.appendChild(el('i', 'rays'));
    if (kind === 'mesh') root.appendChild(el('i', 'mesh'));
    if (kind === 'worldmap') { root.appendChild(el('i', 'map')); add(7, (s) => { s.style.cssText = `--x:${(8 + r() * 84).toFixed(1)}%;--y2:${(25 + r() * 45).toFixed(1)}%;--t:${(-r() * 3).toFixed(1)}s`; }); }
    if (kind === 'bars') for (let i = 0; i < 16; i++) { const b = el('i', 'bar'); b.style.cssText = `--x:${(i * 6.4 + 1).toFixed(1)}%;--h:${(18 + r() * 52).toFixed(0)}%;--d:${(2 + r() * 3).toFixed(1)}s;--t:${(-r() * 4).toFixed(1)}s;--c:var(${i % 2 ? '--accent' : '--accent2'})`; root.appendChild(b); }
    if (kind === 'hexes') { const s = svg(800, 450); for (let y = 0; y < 9; y++) for (let x = 0; x < 16; x++) { const cx = x * 54 + (y % 2) * 27, cy = y * 47, h = 30; const pts = [0, 1, 2, 3, 4, 5].map((k) => [cx + h * Math.cos(Math.PI / 3 * k + Math.PI / 6), cy + h * Math.sin(Math.PI / 3 * k + Math.PI / 6)].map((v) => v.toFixed(1)).join(',')).join(' '); const p = svgEl('polygon', { points: pts, class: 'hx' + (r() < 0.12 ? ' on' : '') }); p.style.setProperty('--t', (-r() * 4).toFixed(1) + 's'); s.appendChild(p); } }
    if (kind === 'waves') { const s = svg(1600, 450); for (let k = 0; k < 3; k++) { const a = 18 + k * 10, y = 300 + k * 40; let d = `M0 ${y}`; for (let x = 0; x <= 1600; x += 100) d += ` Q${x + 50} ${y + (x / 100 % 2 ? a : -a)} ${x + 100} ${y}`; s.appendChild(svgEl('path', { d: d + ' V450 H0 Z' })); } }
    if (kind === 'ribbons') { const s = svg(800, 450); for (let k = 0; k < 3; k++) s.appendChild(svgEl('path', { d: `M-100 ${120 + k * 110} C 200 ${-40 + k * 140}, 500 ${420 - k * 90}, 900 ${100 + k * 120}` })); }
    if (kind === 'circuit') { const s = svg(800, 450); for (let k = 0; k < 14; k++) { let x = r() * 800, y = r() * 450, d = `M${x.toFixed(0)} ${y.toFixed(0)}`; for (let j = 0; j < 4; j++) { if (j % 2) x += (r() - 0.5) * 300; else y += (r() - 0.5) * 220; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`; } s.appendChild(svgEl('path', { d })); const on = svgEl('path', { d, class: 'on' }); on.style.setProperty('--t', (-r() * 6).toFixed(1) + 's'); s.appendChild(on); s.appendChild(svgEl('circle', { cx: x.toFixed(0), cy: y.toFixed(0), r: 3.5 })); } }
    if (kind === 'pulse') { const s = svg(1200, 450); let d = 'M0 300'; for (let x = 0; x < 1200; x += 200) d += ` L${x + 70} 300 L${x + 90} 250 L${x + 110} 350 L${x + 125} 200 L${x + 140} 300 L${x + 200} 300`; s.appendChild(svgEl('path', { d, class: 'g' })); s.appendChild(svgEl('path', { d })); }
  }

  function object3d(kind, root, t) {
    const o = el('div', 'o3'); root.appendChild(o);
    const C = ['var(--accent)', 'var(--accent2)', 'var(--glow)'];
    root.style.setProperty('--h3', 'calc(var(--ow) * .3)');
    if (kind === 'globe') { o.appendChild(el('i', 'sphere')); for (let i = 0; i < 6; i++) { const m = el('i', 'mer'); m.style.setProperty('--i', i); o.appendChild(m); } root.appendChild(el('i', 'halo')); }
    if (kind === 'cube') { const ids = (t.icons && t.icons.length ? t.icons : ['chart', 'globe', 'users']); for (let i = 0; i < 6; i++) { const f = el('i', 'f'); f.appendChild(icon(ids[i % ids.length])); o.appendChild(f); } }
    if (kind === 'gyro') { for (let i = 0; i < 3; i++) { const g = el('i', 'r'); g.style.setProperty('--i', i); g.style.setProperty('--c', C[i]); o.appendChild(g); } o.appendChild(el('i', 'core')); o.style.animation = 'none'; }
    if (kind === 'chart3d') { const hs = [40, 62, 50, 78, 92]; for (let i = 0; i < 5; i++) { const b = el('i', 'b'); b.style.cssText = `--i:${i};--h:${hs[i]}%;--c:${C[i % 3]};--w:calc(var(--ow) * .13)`; for (let k = 0; k < 3; k++) b.appendChild(el('i')); o.appendChild(b); } root.insertBefore(el('i', 'base'), o); }
    if (kind === 'slabs') { o.style.animation = 'none'; for (let i = 0; i < 4; i++) { const s = el('i', 'sl'); s.style.cssText = `--i:${i};--c:${C[i % 3]}`; o.appendChild(s); } }
    if (kind === 'coins') { o.style.animation = 'none'; root.style.setProperty('--coin', '#f2b632'); for (let i = 0; i < 6; i++) { const c = el('i', 'c'); c.style.setProperty('--i', i); o.appendChild(c); } const f = el('i', 'flip'); f.appendChild(icon(t.line === 'af' ? 'rupee' : 'star')); o.appendChild(f); }
    if (kind === 'phone') { o.style.animation = 'none'; const d = el('i', 'dev'), s = el('i', 'scr'); for (let i = 0; i < 5; i++) { const b = el('i'); b.style.setProperty('--i', i); s.appendChild(b); } d.appendChild(s); o.appendChild(d); }
    if (kind === 'document') { o.style.animation = 'none'; o.appendChild(el('i', 'pg back')); const p = el('i', 'pg'); for (let i = 0; i < 5; i++) p.appendChild(el('i')); p.appendChild(el('b')); o.appendChild(p); }
    if (kind === 'pyramid') for (let i = 0; i < 4; i++) { const f = el('i', 't'); f.style.setProperty('--c', C[i % 3]); o.appendChild(f); }
    if (kind === 'atom') { root.appendChild(el('i', 'nuc')); for (let i = 0; i < 3; i++) { const b = el('i', 'orb'); b.style.setProperty('--i', i); b.style.setProperty('--c', C[i]); o.appendChild(b); } }
  }

  /* build 82.6: a small live card beside the video screen ("prop") that shows what the page is about */
  function propCard(kind, t, seed) {
    const corner = ['br', 'bl'][(seed >>> 3) % 2]; const c = el('div', 'prop p-' + corner); c.dataset.corner = corner; c.setAttribute('aria-hidden', 'true');
    const add = (n) => { c.appendChild(n); return n; };
    const row = (kids) => { const r = el('div', 'r'); kids.forEach((k) => r.appendChild(k)); return add(r); };
    const ti = (s) => add(el('div', 't', s));
    const pts = (t.points || []).filter(Boolean);
    const words = (t.headline || '').split(/\s+/).slice(0, 4).join(' ');
    const v = (i, k = '--i') => { const x = el('i'); x.style.setProperty(k, i); return x; };
    switch (kind) {
      case 'survey': ti('Q' + (seed % 9 + 2) + '. Your answer'); ['Very likely', 'Likely', 'Not sure'].forEach((s) => row([el('i', 'k'), el('span', '', s)])); break;
      case 'chart': { ti((t.stat && t.stat.label && !/read|minute/i.test(t.stat.label) ? t.stat.label : 'Insight') + ' ↑'); const b = add(el('div', 'bars')); [.35, .55, .45, .72, .62, .92].forEach((h, i) => { const x = v(i); x.style.setProperty('--h', h); b.appendChild(x); }); break; }
      case 'chat': ['Hi! 👋 Can you help?', 'Yes, here is how', 'Perfect, thank you!'].forEach((s, i) => { const b = add(el('div', 'bub' + (i % 2 ? ' me' : ''), s)); b.style.setProperty('--i', i); }); break;
      case 'ledger': ti('Ledger · this month'); ['12,400', '3,150', '8,920', '25,670'].forEach((n, i) => row([el('i', 'ln' + (i === 3 ? ' a' : '')), el('span', 'num', n)])); break;
      case 'calendar': { ti('This month'); const g = add(el('div', 'cal')); for (let i = 0; i < 21; i++) { const x = el('i', [2, 6, 9, 13, 17, 19].includes(i) ? 'on' : ''); x.style.setProperty('--i', i % 6); g.appendChild(x); } break; }
      case 'stars': { const s = add(el('div', 'stars')); for (let i = 0; i < 5; i++) { const x = el('i', '', '★'); x.style.setProperty('--i', i); s.appendChild(x); } add(el('div', '', '“Clear answers, fast replies.”')); break; }
      case 'gauge': { const d = add(el('div', 'dial')); d.appendChild(el('i')); ti('Score ' + (80 + seed % 19)); break; }
      case 'code': { const d = add(el('div', 'dots')); d.append(el('i'), el('i'), el('i')); const g = add(el('div', 'code')); [.6, .82, .45, .74, .9].forEach((w, i) => { const x = v(i); x.style.setProperty('--w', w); g.appendChild(x); }); break; }
      case 'funnel': { const f = add(el('div', 'fun')); ['Reach', 'Visits', 'Leads', 'Sales'].forEach((s, i) => { const x = el('i', '', s); x.style.setProperty('--i', i); f.appendChild(x); }); break; }
      case 'shield': add(el('div', 'shd', '✓')); ti('Protected · verified'); break;
      case 'checklist': (pts.length ? pts : ['Planned', 'Checked', 'Delivered']).slice(0, 3).forEach((s, i) => { const k = el('i', 'ok', '✓'); k.style.setProperty('--i', i); row([k, el('span', '', s)]); }); break;
      case 'pie': add(el('div', 'pie')); ti('Share of answers'); break;
      case 'search': add(el('div', 'q', '🔍 ' + words.toLowerCase())); [0, 1, 2].forEach((i) => { const r = row([el('b', i ? '' : 'top', String(i + 1)), el('i', 'ln' + (i ? ' half' : ' a'))]); r.style.setProperty('--i', i); }); break;
      case 'social': ti('Frequent Research'); row([el('i', 'ln a'), el('i', 'ln half')]); add(el('div', '', '♥ 2.4k   ↗ 310   💬 96')).classList.add('hrt'); break;
      case 'receipt': ti('Return filed'); [0, 1, 2].forEach((i) => row([el('i', 'ln' + (i === 2 ? ' half' : ''))])); add(el('div', 'stamp', 'Done ✓')); break;
      default: return null;
    }
    return c;
  }
  const lumOf = (hex) => { const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
  const ytIcon = () => { const y = el('span', 'yt'); const s = svgEl('svg', { viewBox: '0 0 10 10', 'aria-hidden': 'true' }); s.appendChild(svgEl('path', { d: 'M2 1l7 4-7 4z' })); y.appendChild(s); return y; };
  const CHANNEL = 'https://www.youtube.com/@frequentresearch';

  function showcase(host, pv, t, v, title, seed, pic, yt, mkFlags) {
    pv.classList.add('SC', 'F-' + (t.frame || 'glass'));
    if (pic) pv.classList.add('has-pic');
    const pal = t.palette || {};
    if (HEX.test(pal.accent || '')) pv.style.setProperty('--on', lumOf(pal.accent) > 0.4 ? '#0b1437' : '#ffffff');
    const bg = el('div', 'bg'); scene(t.scene, bg, seed); pv.appendChild(bg);
    // the words
    const info = el('div', 'info');
    const pill = el('span', 'pill'); pill.appendChild(ytIcon()); pill.appendChild(el('span', '', t.kicker || 'Frequent Research')); info.appendChild(pill);
    const head = t.headline || title;
    const h = el('h3', 'sh', head.length > 110 ? head.slice(0, 107).replace(/\s+\S*$/, '') + '…' : head);
    if (t.em) h.appendChild(el('em', '', t.em));
    if (head.length > 36) pv.classList.add('long'); if (head.length > 64) pv.classList.add('xl');
    info.appendChild(h);
    const lede = t.tagline || (v && v.description ? v.description.split(/\n+/)[0] : '');
    if (lede) info.appendChild(el('p', 'lede', lede.length > 220 ? lede.slice(0, 217).replace(/\s+\S*$/, '') + '…' : lede));
    const pts = (t.points || []).filter(Boolean).slice(0, 3);
    if (pts.length) {
      const ol = el('ol', 'steps');
      pts.forEach((p, i) => { const li = el('li', 'step'); li.style.setProperty('--i', i); li.style.setProperty('--w', [0.98, 0.78, 0.58][i] * (0.86 + ((seed >>> (i * 3)) % 15) / 100)); li.append(el('b', '', '0' + (i + 1)), el('span', '', p), el('i')); ol.appendChild(li); });
      info.appendChild(ol);
    }
    const meta = el('div', 'meta');
    if (t.stat && t.stat.value) { const s = el('span', 'stat', t.stat.value); s.appendChild(el('small', '', t.stat.label || '')); meta.appendChild(s); }
    const fl = mkFlags(); if (fl) meta.appendChild(fl);
    if (meta.childNodes.length) info.appendChild(meta);
    const btns = el('div', 'btns');
    const lk = t.link && t.link.label && safeLink(t.link.to) ? t.link : null;
    if (lk) { const a = el('a', 'btn go', lk.label + ' →'); a.href = safeLink(lk.to); if (!/^\//.test(lk.to)) { a.target = '_blank'; a.rel = 'noopener'; } btns.appendChild(a); }
    if (t.subscribe !== false) { const a = el('a', 'btn sub'); a.href = CHANNEL; a.target = '_blank'; a.rel = 'noopener'; a.appendChild(ytIcon()); a.appendChild(document.createTextNode('Subscribe')); btns.appendChild(a); }
    if (btns.childNodes.length) info.appendChild(btns);
    pv.appendChild(info);
    // the framed video
    const stage = el('div', 'stage'), fr = el('div', 'fr'), scr = el('div', 'screen');
    const poster = el('div', 'poster'); poster.setAttribute('aria-hidden', 'true');
    const big = el('p', 'bigt'); const short = t.screenText || head.split(/\s*[:—–|?]\s+|\.\s/)[0]; const ws = short.replace(/[.!?…]+$/, '').split(/\s+/).filter(Boolean).slice(0, 9);
    const per = Math.max(1, Math.ceil(ws.length / 3)); const lines = []; for (let i = 0; i < ws.length; i += per) lines.push(ws.slice(i, i + per).join(' '));
    lines.slice(0, 3).forEach((s, i, a) => { const sp = el('span', '', s + (i === a.length - 1 && ws.length < short.split(/\s+/).length ? '…' : i === a.length - 1 ? '.' : '')); sp.style.setProperty('--i', i); big.appendChild(sp); });
    const longest = Math.max(...lines.map((s) => s.length), 6); big.style.fontSize = `clamp(12px,${Math.min(10, 62 / longest).toFixed(2)}cqi,64px)`;
    poster.appendChild(big);
    const chips = (t.chips && t.chips.length ? t.chips : [t.stat && t.stat.value ? t.stat.value + ' ' + (t.stat.label || '') : '', t.flags && t.flags.length > 1 ? t.flags.length + ' countries' : '', 'On video']).filter(Boolean).slice(0, 3);
    if (chips.length) { const cw = el('div', 'chips'); chips.forEach((s, i) => { const c = el('span', 'chip', s.length > 26 ? s.slice(0, 25) + '…' : s); c.style.setProperty('--i', i); cw.appendChild(c); }); poster.appendChild(cw); }
    const obj = el('div', 'obj'); new ResizeObserver(() => obj.style.setProperty('--ow', obj.clientWidth + 'px')).observe(obj); object3d(t.object, obj, t); poster.appendChild(obj);
    scr.appendChild(poster);
    const badge = el('span', 'badge'); badge.setAttribute('aria-hidden', 'true'); badge.appendChild(el('i')); badge.appendChild(document.createTextNode('Frequent Research')); scr.appendChild(badge);
    if (pic) { const im = el('img', 'pic'); im.alt = t.imageAlt || ''; im.loading = 'lazy'; im.decoding = 'async'; im.referrerPolicy = 'no-referrer'; im.src = pic; im.onerror = () => { if (yt && im.src.includes('maxresdefault')) im.src = `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`; else { im.remove(); pv.classList.remove('has-pic'); } }; scr.appendChild(im); }
    const cap = el('div', 'cap'); cap.append(el('small', '', t.kicker || 'Frequent Research'), el('b', '', (v && v.title) || head)); scr.appendChild(cap);
    const bp = el('button', 'bigplay'); bp.type = 'button'; const tri = svgEl('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }); tri.appendChild(svgEl('path', { d: 'M6 4l14 8-14 8z' })); bp.appendChild(tri);
    bp.setAttribute('aria-label', 'Play video: ' + ((v && v.title) || head));
    if (!v || !v.url) { bp.disabled = true; bp.title = 'The video is added in the super admin'; }
    bp.addEventListener('click', () => host.play());
    scr.appendChild(bp);
    fr.appendChild(scr); stage.appendChild(fr);
    const pc = propCard(t.prop, t, seed); if (pc) stage.appendChild(pc);
    const r = rnd(seed), corner = pc ? pc.dataset.corner : '', spots = [[-4, 12], [96, 30], [-3, 70], [94, 82]].filter(([x, y]) => !(corner === 'br' && x > 50 && y > 50) && !(corner === 'bl' && x < 50 && y > 50) && !(corner === 'tl' && x < 50 && y < 50));
    (t.icons || []).slice(0, 2).forEach((id, i) => { const c = el('i', 'ico'); const [x, y] = spots[(i + seed) % spots.length]; c.style.cssText = `left:${(x + r() * 3).toFixed(0)}%;top:${(y + r() * 4).toFixed(0)}%;--i:${i};z-index:6`; c.appendChild(icon(id)); stage.appendChild(c); });
    pv.appendChild(stage);
    host._screen = scr;
  }

  /* ---------------------------------------------------------------- the element -------------------------------- */
  class FrPageVideo extends HTMLElement {
    static get observedAttributes() { return ['page']; }
    constructor() { super(); this._root = this.attachShadow({ mode: 'open' }); this._data = null; }
    connectedCallback() { if (!this._manual && !this._data && !this._loading) this.load(); }
    attributeChangedCallback(n, a, b) { if (a !== b && this.isConnected && !this._manual && !this._loading) this.load(); }
    get api() { return (this.getAttribute('api') || DEFAULT_API).replace(/\/$/, ''); }
    asset(n) { const f = window.FR_PAGE_VIDEO_FILES; return (f && f[n]) || this.api + '/' + n; }
    set data(d) { this._manual = true; this._data = d; this.render(); } // set by the admin preview: no request
    get data() { return this._data; }
    async load() {
      this._loading = true;
      const page = this.getAttribute('page') || location.pathname;
      try {
        const r = await fetch(this.api + '?page=' + encodeURIComponent(page), { credentials: 'omit' });
        const j = r.ok ? await r.json() : null;
        if (this._manual) return;
        this._data = j;
      } catch (e) { this._data = null; }
      this._loading = false;
      if (this._manual) return;
      this.render();
    }
    render() {
      const d = this._data || {}, v = d.video, t = d.template;
      const root = this._root;
      root.textContent = '';
      if (!t || (!v && !this.hasAttribute('always'))) { this.hidden = true; return; }
      this.hidden = false;
      const st = el('style'); st.textContent = CSS; root.appendChild(st);
      const pal = t.palette || {};
      const wrap = el('div', 'wrap');
      const pv = el('section', `pv L-${t.layout} S-${t.scene} O-${t.object} M-${t.motion || 'lively'} T-${pal.tone === 'light' ? 'light' : 'dark'}`);
      for (const k of ['bg1', 'bg2', 'ink', 'muted', 'accent', 'accent2', 'glow']) if (HEX.test(pal[k] || '')) pv.style.setProperty('--' + k, pal[k]);
      pv.style.setProperty('--map', `url("${this.asset('world-dots.webp')}")`);
      const title0 = (v && v.title) || t.headline || '';
      const title = title0.length > 110 ? title0.slice(0, 107).replace(/\s+\S*$/, '') + '…' : title0;
      pv.setAttribute('aria-label', 'Video: ' + title);
      if (title.length > 58) pv.classList.add('long'); if (title.length > 80) pv.classList.add('xl');
      wrap.appendChild(pv); root.appendChild(wrap);
      const seed = hashStr(t.id || t.page || title);
      // picture: the admin's picture, else the YouTube thumbnail of the video (HD)
      const yt = v ? youTubeId(v.url) : '';
      const pic = safeLink(t.image) || (v && safeLink(v.poster)) || (yt ? `https://i.ytimg.com/vi/${yt}/maxresdefault.jpg` : '');
      const mkFlags = () => { if (!t.flags || !t.flags.length) return null; const f = el('span', 'flags'); f.setAttribute('aria-label', 'Countries: ' + t.flags.join(', ')); t.flags.slice(0, 6).forEach((c, i) => { const k = FLAGS.indexOf(c); if (k < 0) return; const x = el('i', 'flag'); x.style.cssText = `background-image:url("${this.asset('flags.webp')}");background-position:-${(k % 16) * 30}px -${Math.floor(k / 16) * 22.5}px;--i:${i}`; x.title = c; f.appendChild(x); }); return f; };
      this._screen = null;
      if (/^showcase/.test(t.layout)) { showcase(this, pv, t, v, title, seed, pic, yt, mkFlags); this._pv = pv; return; } // build 82.6
      const bg = el('div', 'bg'); scene(t.scene, bg, seed); pv.appendChild(bg); pv.appendChild(el('div', 'scrim'));
      const mkImg = (onFail) => { const im = el('img'); im.alt = t.imageAlt || ''; im.loading = 'lazy'; im.decoding = 'async'; im.referrerPolicy = 'no-referrer'; im.src = pic; im.onerror = () => { if (yt && im.src.includes('maxresdefault')) im.src = `https://i.ytimg.com/vi/${yt}/hqdefault.jpg`; else { im.remove(); if (onFail) onFail(); } }; return im; };
      if (pic && t.layout === 'cinema') { const m = el('div', 'media'); m.appendChild(mkImg()); pv.appendChild(m); }
      // 3D object (inside the window for the "window" layout)
      const obj = el('div', 'obj');
      new ResizeObserver(() => obj.style.setProperty('--ow', obj.clientWidth + 'px')).observe(obj);
      object3d(t.object, obj, t);
      if (t.layout === 'window') { const w = el('div', 'win'); if (pic) w.appendChild(mkImg(() => w.appendChild(obj))); else w.appendChild(obj); pv.appendChild(w); if (pic) pv.appendChild(obj); } else pv.appendChild(obj);
      if (t.layout === 'stack') { const ps = el('div', 'panes'); (t.points && t.points.length ? t.points : [t.kicker, t.cta]).slice(0, 3).reverse().forEach((p, i, a) => { const x = el('div', 'pane'); x.style.setProperty('--i', a.length - 1 - i); const b = el('b', '', '0' + (a.length - i)); x.appendChild(b); x.appendChild(document.createTextNode(p)); ps.appendChild(x); }); pv.appendChild(ps); }
      if (t.layout === 'magazine') { const n = t.stat && t.stat.value ? t.stat.value : String((seed % 89) + 10); const big = el('div', 'big', n); big.style.fontSize = Math.min(15, 62 / Math.max(2, n.length)).toFixed(1) + 'cqi'; pv.appendChild(big); }
      if (t.layout === 'ticker') { const words = [t.kicker, ...(t.points || []), t.cta].filter(Boolean).join('   ✦   '); for (const c of ['band', 'band b2']) { const b = el('div', c); b.setAttribute('aria-hidden', 'true'); b.appendChild(el('span', '', (words + '   ✦   ').repeat(3))); pv.appendChild(b); } }
      // floating icons (a ring around the play button for "orbit")
      const icons = (t.icons || []).slice(0, t.layout === 'orbit' ? 6 : 4);
      if (t.layout === 'orbit') { const ring = el('div', 'ring'); icons.forEach((id, i) => { const c = el('i', 'ico'); const a = (i / icons.length) * Math.PI * 2; c.style.left = (Math.cos(a) * 150).toFixed(0) + 'px'; c.style.top = (Math.sin(a) * 92).toFixed(0) + 'px'; c.appendChild(icon(id)); ring.appendChild(c); }); pv.appendChild(ring); }
      else {
        // icons sit only where the layout has no words
        const Z = { left: [[4, 8], [30, 6], [6, 74], [32, 84]], right: [[64, 6], [91, 12], [91, 70], [66, 84]], corners: [[4, 6], [92, 6], [4, 80], [92, 80]], poster: [[90, 8], [91, 46], [62, 84], [78, 70]] };
        const zone = /^(split-rev|magazine)$/.test(t.layout) ? Z.left : /^(center|spotlight|orbit)$/.test(t.layout) ? Z.corners : t.layout === 'poster' || t.layout === 'ticker' ? Z.poster : Z.right;
        const r = rnd(seed);
        icons.forEach((id, i) => { const c = el('i', 'ico'); const [x, y] = zone[(i + (seed % 4)) % 4]; c.style.cssText = `left:${Math.min(92, x + r() * 3).toFixed(0)}%;top:${Math.min(84, y + r() * 3).toFixed(0)}%;--i:${i}`; c.appendChild(icon(id)); pv.appendChild(c); });
      }
      // the words
      const txt = el('div', 'txt');
      const kick = el('span', 'kick'); kick.appendChild(el('i')); kick.appendChild(document.createTextNode(t.kicker || 'Frequent Research')); txt.appendChild(kick);
      const h = el('h3'); h.appendChild(el('span', '', title)); txt.appendChild(h);
      if (t.subline && !(v && v.title)) txt.appendChild(el('p', 'sub', t.subline));
      const desc = (v && v.description) ? v.description.split(/\n+/)[0] : t.tagline;
      if (desc) txt.appendChild(el('p', 'tag', desc.length > 220 ? desc.slice(0, 217).replace(/\s+\S*$/, '') + '…' : desc));
      if (t.points && t.points.length) { const ul = el('ul'); t.points.slice(0, 3).forEach((p, i) => { const li = el('li'); li.style.setProperty('--i', i); li.appendChild(el('b', '', '0' + (i + 1))); li.appendChild(document.createTextNode(p)); ul.appendChild(li); }); txt.appendChild(ul); }
      const row = el('div', 'row');
      const btn = el('button', 'play'); btn.type = 'button';
      const dot = el('span', 'dot'); const tri = svgEl('svg', { viewBox: '0 0 24 24', 'aria-hidden': 'true' }); tri.appendChild(svgEl('path', { d: 'M6 4l14 8-14 8z' })); dot.appendChild(tri);
      btn.appendChild(dot); btn.appendChild(el('span', '', (v && v.custom && typeof v.custom.ctaText === 'string' && v.custom.ctaText) || t.cta || 'Watch the video'));
      btn.setAttribute('aria-label', 'Play video: ' + title);
      if (!v || !v.url) { btn.disabled = true; btn.style.opacity = '.55'; btn.title = 'The video is added in the super admin'; }
      btn.addEventListener('click', () => this.play());
      row.appendChild(btn);
      if (t.stat && t.stat.value) { const s = el('span', 'stat', t.stat.value); s.appendChild(el('small', '', t.stat.label || '')); row.appendChild(s); }
      { const f = mkFlags(); if (f) row.appendChild(f); }
      txt.appendChild(row);
      pv.appendChild(txt);
      pv.appendChild(el('span', 'brand', 'Frequent Research'));
      this._pv = pv;
    }
    play() {
      const v = this._data && this._data.video; if (!v || !v.url) return;
      const yt = youTubeId(v.url), vm = vimeoId(v.url), url = safeLink(v.url);
      if (!url) return;
      const fr = el('div', 'frame');
      if (yt) { const f = el('iframe'); f.src = `https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0&modestbranding=1&playsinline=1`; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true; f.title = v.title || 'Video'; fr.appendChild(f); }
      else if (vm) { const f = el('iframe'); f.src = `https://player.vimeo.com/video/${vm}?autoplay=1`; f.allow = 'autoplay; fullscreen; picture-in-picture'; f.title = v.title || 'Video'; fr.appendChild(f); }
      else if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url) || /\/api\/v1\/files\//.test(url)) { const x = el('video'); x.src = url; x.controls = true; x.autoplay = true; x.playsInline = true; if (v.poster) x.poster = safeLink(v.poster); fr.appendChild(x); }
      else { window.open(url, '_blank', 'noopener'); return; }
      const c = el('button', 'close', '×'); c.type = 'button'; c.setAttribute('aria-label', 'Close the video');
      const box = this._screen || this._pv;
      c.addEventListener('click', () => { fr.remove(); c.remove(); const b = this._pv && this._pv.querySelector('.play,.bigplay'); if (b) b.focus(); });
      box.appendChild(fr); box.appendChild(c); c.focus();
      this.dispatchEvent(new CustomEvent('fr-video-play', { bubbles: true, composed: true, detail: { page: this._data.page, url } }));
    }
  }
  FrPageVideo.icons = P; FrPageVideo.flags = FLAGS; // for the super admin's template editor
  customElements.define('fr-page-video', FrPageVideo);
  window.FrPageVideo = FrPageVideo;
})();
