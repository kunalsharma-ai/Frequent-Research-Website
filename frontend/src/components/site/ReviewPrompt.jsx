/*
 * Rate & Review studio (build 54 redesign) — site-wide dialog + floating badge. Prefix RV_ / RX_ ;
 * styles src/styles/site-reviews.css (rv- for the badge/toast/QR block, rx- for the dialog).
 *
 * Five short steps, each with its own visual, and every visual re-dressed for the service being reviewed
 * (Market Research · Digital Marketing · IT & Development · Finance & Accounts — see RX_WORLD):
 *   1. Service — four animated "portals" (tick one or more)                                  (required)
 *   2. Rating  — a 1–5 instrument drawn per service: insight bars, rocket launch,
 *                build pipeline or rising ledger (radio group, arrow keys)                    (required)
 *   3. Review  — a writing pad styled per service (field notes, post composer, editor,
 *                statement) with service-specific quick phrases and an ink meter              (20–1,500 chars)
 *   4. You     — a reviewer badge that fills in live; full name, email, country and company required;
 *                designation and phone (flag + name + calling code) optional
 *   5. Publish — spotlight preview, CAPTCHA and consent; a stamp + confetti when sent
 * On success the review is shown at once for this visitor (frAddMine) and posted to POST /api/reviews, which stores
 * it and serves it from GET /api/reviews (after approval when PUBLISH_MODE=moderate). If that endpoint is not
 * deployed the review is still sent to the team through the existing /api/enquiry endpoint.
 *
 * Timing (unchanged from build 40): a small notification at 20–35 s, the dialog itself at 50–80 s or on exit
 * intent after 20 s — never on arrival, at most once per visit, postponed while the visitor types elsewhere.
 * Opens any time from the floating badge or a `fr-open-review` window event ({ detail: { service } }).
 * Accessibility: role=dialog, aria-modal, focus trap, Esc closes and focus returns, focus moves to each step's
 * heading; radio-group rating; labelled fields with inline errors; reduced-motion aware; storage in try/catch.
 */
import * as ee from 'react';
import { PpL } from '../dm/shared.jsx';
import { FRK_Captcha, FRK_Country, FRK_Field, FRK_Flag, FRK_I, FRK_Phone, FRK_Stars, FRK_V, FRK_VKEYS, frkCaptchaErr, frkCountry, frkLead, frkPhoneCode, frkPost, frkRule, frkSaveLead, frkV, frkVStyle } from './FrKit.jsx';
import { FRK_Logo, frsPlay } from './Floaters.jsx';
import { frAddMine, frCName, frClean, frInitials } from './LiveReviews.jsx';

const RV_PLACE_ID = "ChIJR36zkVYFDTkRXCVhgQK9UqY";
const RV_GBP_URL = `https://local.google.com/place?placeid=${RV_PLACE_ID}&utm_medium=noren&utm_source=gbp&utm_campaign=2026`;
const RV_WRITE_URL = `https://search.google.com/local/writereview?placeid=${RV_PLACE_ID}`;
const RV_QR_SRC = "__GBP_QR__"; /* replaced at build time with public/images/google-business-profile-qr.webp */
const RV_GOOGLE_SHARE = { qr: "__QR:google-share__", name: "Find us on Google", url: "https://share.google/Q2u2ukm6YPPESkJTb" };
const RV_PANELS = [
  { qr: "__QR:panel-frequent-research__", name: "Frequent Research Panels", url: "https://panels.frequentresearch.com/" },
  { qr: "__QR:panel-turn2opinion__", name: "Turn2Opinion", url: "https://www.turn2opinion.com/" },
  { qr: "__QR:panel-myfrequentrewards__", name: "MyFrequentRewards", url: "https://www.myfrequentrewards.com/" },
  { qr: "__QR:panel-myhealthopinions__", name: "MyHealthOpinions", url: "https://www.myhealthopinions.com/" },
];
const RV_SOCIAL = [
  { qr: "__QR:social-linkedin__", name: "LinkedIn", url: "https://www.linkedin.com/company/frequentresearch/" },
  { qr: "__QR:social-instagram__", name: "Instagram", url: "https://www.instagram.com/frequentresearchfield/" },
  { qr: "__QR:social-youtube__", name: "YouTube", url: "https://www.youtube.com/@frequentresearch" },
  { qr: "__QR:social-facebook__", name: "Facebook", url: "https://www.facebook.com/FrequentResearchFieldwork" },
  { qr: "__QR:social-x__", name: "X", url: "https://x.com/frequentrfs" },
  { qr: "__QR:social-pinterest__", name: "Pinterest", url: "https://pin.it/1ApfR1BQk" },
];
const RV_TABS = [
  ["google", "Google"],
  ["panels", "Our panels"],
  ["social", "Social"],
];
const RV_MIN_DWELL_MS = 20000;
const RV_TOUCH_DWELL_MS = 20000;
const RV_TOAST_MS = [20000, 35000];
const RV_AUTO_MS = [50000, 80000];
const rvRand = ([a, b]) => a + Math.floor(Math.random() * (b - a));
const rvBusy = () => {
  const a = document.activeElement;
  return !!(a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && !a.closest(".rv-dlg"));
};

const RV_POST_URL = "/api/v1/reviews";
const rvGet = (s, k) => {
  try {
    return window[s].getItem(k);
  } catch (e) {
    return null;
  }
};
const rvSet = (s, k, v) => {
  try {
    window[s].setItem(k, v);
  } catch (e) {}
};
const RV_LABELS = ["Poor", "Fair", "Good", "Very good", "Excellent"];
const RV_STAR_PATH = "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z";

function RV_Tile({ t }) {
  return (
    <li className="rv-tile">
      <a href={t.url} target="_blank" rel="noopener noreferrer">
        <img src={t.qr} width="132" height="132" alt={"QR code with the " + t.name + " logo"} loading="lazy" decoding="async" />
        <strong>{t.name}</strong>
        <span className="frk-sr"> (opens in a new tab)</span>
      </a>
    </li>
  );
}
function RV_Google({ compact }) {
  const [tab, setTab] = ee.useState("google");
  const pre = compact ? "rv-c-" : "rv-m-";
  const onKey = (e) => {
    const i = RV_TABS.findIndex(([k]) => k === tab);
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % RV_TABS.length;
    else if (e.key === "ArrowLeft") n = (i + RV_TABS.length - 1) % RV_TABS.length;
    if (n < 0) return;
    e.preventDefault();
    setTab(RV_TABS[n][0]);
    const el = document.getElementById(pre + "tab-" + RV_TABS[n][0]);
    if (el) el.focus();
  };
  return (
    <aside className={"rv-g" + (compact ? " rv-g--compact" : "")} aria-labelledby={pre + "g-h"}>
      <small className="rv-g__kick">Scan &amp; connect</small>
      <h3 id={pre + "g-h"}>Also review us on Google</h3>
      <div className="rv-tabs" role="tablist" aria-label="QR codes" onKeyDown={onKey}>
        {RV_TABS.map(([k, label]) => (
          <button key={k} type="button" role="tab" id={pre + "tab-" + k} aria-selected={tab === k} aria-controls={pre + "panel-" + k} tabIndex={tab === k ? 0 : -1} className={"rv-tab" + (tab === k ? " is-on" : "")} onClick={() => setTab(k)}>
            {label}
          </button>
        ))}
      </div>
      <div className="rv-tabpanel" role="tabpanel" id={pre + "panel-" + tab} aria-labelledby={pre + "tab-" + tab} key={tab}>
        {tab === "google" && (
          <>
            <div className="rv-g__qr">
              <img src={RV_QR_SRC} width="200" height="200" alt="QR code linking to the Frequent Research Fieldwork Solutions Pvt. Ltd. Google Business Profile" loading="lazy" decoding="async" />
            </div>
            <div className="rv-g__act">
              <a className="rv-g__btn" href={RV_WRITE_URL} target="_blank" rel="noopener noreferrer">
                Write a Google review<span className="frk-sr"> (opens in a new tab)</span>
              </a>
              <a className="rv-g__link" href={RV_GBP_URL} target="_blank" rel="noopener noreferrer">
                View our Google Business Profile<span className="frk-sr"> (opens in a new tab)</span>
              </a>
            </div>
            <ul className="rv-tiles rv-tiles--one">
              <RV_Tile t={RV_GOOGLE_SHARE} />
            </ul>
          </>
        )}
        {tab === "panels" && (
          <ul className="rv-tiles">
            {RV_PANELS.map((t) => (
              <RV_Tile key={t.name} t={t} />
            ))}
          </ul>
        )}
        {tab === "social" && (
          <ul className="rv-tiles">
            {RV_SOCIAL.map((t) => (
              <RV_Tile key={t.name} t={t} />
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

const RV_CHIPS_DOWN = [
  ["Slow updates", "Progress updates could have been more frequent."],
  ["Unclear scope", "The scope could have been defined more clearly at the start."],
  ["Missed timing", "Some timelines slipped."],
  ["Needs follow-up", "Follow-up after delivery could be better."],
];
/* the live preview card leans towards the pointer */

/* ── build 54: per-service worlds for the review studio ─────────────────────────────────────────────────── */
/* each service has its own scene (step 1), rating instrument (step 2), writing pad (step 3) and words */
const RX_WORLD = {
  mr: {
    d: "Surveys · panels · fieldwork · insight",
    ask: "How strong were the insights?",
    words: ["Inconclusive", "Some signal", "Solid insight", "Strong insight", "Breakthrough"],
    pad: "Field notes",
    padIc: "file",
    chips: [
      ["Clean data", "The data was clean and ready to use."],
      ["Hard-to-reach audience", "They reached an audience we had struggled to find."],
      ["On-time fieldwork", "Fieldwork finished on schedule."],
      ["Actionable insight", "The findings were clear and actionable."],
      ["Global coverage", "They covered every market we needed."],
    ],
  },
  dm: {
    d: "SEO · ads · social · content",
    ask: "How far did we take your brand?",
    words: ["Grounded", "Lift-off", "Climbing", "In orbit", "Sky-high"],
    pad: "New post",
    padIc: "send",
    chips: [
      ["Better leads", "The leads were the right fit for us."],
      ["Honest reporting", "Reporting was short, clear and honest."],
      ["Fresh creative", "The creative ideas stood out."],
      ["More visibility", "Our search visibility improved."],
      ["Quick replies", "The team replied quickly."],
    ],
  },
  it: {
    d: "Apps · web · cloud · testing",
    ask: "How did the build go?",
    words: ["Build failed", "With warnings", "Passing", "Optimised", "Shipped flawlessly"],
    pad: "review.md",
    padIc: "code",
    chips: [
      ["Stable software", "The software was stable and well built."],
      ["Milestones met", "Milestones were delivered on time."],
      ["Easy to follow", "Progress was easy to follow."],
      ["Solid support", "Support after launch was solid."],
      ["Clean code", "The code was clean and maintainable."],
    ],
  },
  af: {
    d: "Books · tax · payroll · virtual CFO",
    ask: "How healthy were your numbers?",
    words: ["In the red", "Breaking even", "Balanced", "Profitable", "Top returns"],
    pad: "Statement",
    padIc: "coin",
    chips: [
      ["Accurate books", "The books were accurate."],
      ["Compliance on time", "Filings and compliance were always on time."],
      ["Useful MIS", "The monthly reports told us what to fix."],
      ["Proactive advice", "They flagged issues before they became problems."],
      ["Responsive", "Questions were answered quickly."],
    ],
  },
};
const rxW = (slug) => RX_WORLD[frkV(slug).k];
const RX_STEPS = [
  ["Service", "grid"],
  ["Rating", "star"],
  ["Review", "quote"],
  ["You", "user"],
  ["Publish", "send"],
];

/* step-1 scenes: one small animated illustration per service (decorative) */
function RX_Scene({ k }) {
  const t = frkV(k).k;
  if (t === "mr")
    return (
      <svg className="rx-scene rx-scene--mr" viewBox="0 0 120 80" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} className="rx-sc-bar" x={14 + i * 18} y={20} width="11" height="50" rx="3" style={{ "--i": i }} />
        ))}
        <g className="rx-sc-lens">
          <circle cx="0" cy="0" r="12" />
          <path d="M9 9l9 9" />
        </g>
      </svg>
    );
  if (t === "dm")
    return (
      <svg className="rx-scene rx-scene--dm" viewBox="0 0 120 80" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <circle key={i} className="rx-sc-ring" cx="60" cy="40" r="14" style={{ "--i": i }} />
        ))}
        <path className="rx-sc-plane" d="M44 46l34-16-10 30-6-10z" />
        <path className="rx-sc-trail" d="M8 70 C 30 66, 30 50, 44 46" />
      </svg>
    );
  if (t === "it")
    return (
      <svg className="rx-scene rx-scene--it" viewBox="0 0 120 80" aria-hidden="true">
        <rect x="8" y="8" width="104" height="64" rx="8" className="rx-sc-win" />
        <circle cx="18" cy="17" r="2.5" /> <circle cx="26" cy="17" r="2.5" /> <circle cx="34" cy="17" r="2.5" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} className="rx-sc-line" x={18 + (i % 2) * 8} y={28 + i * 10} width={[54, 40, 62, 30][i]} height="4" rx="2" style={{ "--i": i }} />
        ))}
        <rect className="rx-sc-caret" x="54" y="58" width="3" height="8" />
      </svg>
    );
  return (
    <svg className="rx-scene rx-scene--af" viewBox="0 0 120 80" aria-hidden="true">
      <path className="rx-sc-chart" d="M8 64 L32 52 L50 58 L72 34 L92 40 L112 16" pathLength="100" />
      {[0, 1, 2].map((i) => (
        <ellipse key={i} className="rx-sc-coin" cx={24 + i * 34} cy="70" rx="11" ry="4" style={{ "--i": i }} />
      ))}
    </svg>
  );
}

/* step-2 instrument: a radio group of five, drawn differently for each service */
function RX_Meter({ k, value, onChange, onPeek, error }) {
  const t = frkV(k).k;
  const w = RX_WORLD[t];
  const [hover, setHover0] = ee.useState(0);
  const setHover = (n) => (setHover0(n), onPeek && onPeek(n));
  const shown = hover || value;
  const keys = (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") (e.preventDefault(), onChange(Math.min(5, (value || 0) + 1)));
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") (e.preventDefault(), onChange(Math.max(1, (value || 1) - 1)));
  };
  const IT_STAGES = ["Plan", "Code", "Test", "Deploy", "Ship"];
  return (
    <div className="rx-meter-wrap">
      <div className={"rx-meter rx-meter--" + t + (error ? " is-bad" : "")} style={{ "--lvl": shown }} role="radiogroup" aria-label="Your rating out of 5" aria-describedby={error ? "rv-err-rating" : undefined} onMouseLeave={() => setHover(0)}>
        <span className="rx-meter__deco" aria-hidden="true">
          {t === "mr" && (
            <span className="rx-lens">
              <FRK_I n="lens" s={26} sw={2.4} />
            </span>
          )}
          {t === "dm" && (
            <>
              <span className="rx-rocket">
                <FRK_I n="rocket" s={38} sw={2} />
                <i className="rx-rocket__flame" />
              </span>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <b key={i} className="rx-sky" style={{ "--i": i }}>
                  ✦
                </b>
              ))}
            </>
          )}
          {t === "it" && <i className="rx-pipe" />}
          {t === "af" && (
            <svg className="rx-ledger" viewBox="0 0 200 60" preserveAspectRatio="none">
              <path d={"M0 56 " + [1, 2, 3, 4, 5].map((n) => `L${n * 40 - 20} ${56 - Math.min(n, shown) * 10}`).join(" ") + " L200 " + (56 - shown * 10)} />
            </svg>
          )}
        </span>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} out of 5 — ${RV_LABELS[n - 1]}`}
            tabIndex={value ? (value === n ? 0 : -1) : n === 1 ? 0 : -1}
            className={"rx-m" + (n <= shown ? " is-on" : "") + (value === n ? " is-sel" : "")}
            style={{ "--n": n }}
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(0)}
            onKeyDown={keys}
          >
            <span className="rx-m__body" aria-hidden="true">
              {t === "it" ? <FRK_I n={n <= shown ? "check" : "minus"} s={14} sw={3} /> : t === "af" ? "₹" : null}
            </span>
            <span className="rx-m__lab" aria-hidden="true">
              {t === "it" ? IT_STAGES[n - 1] : n}
            </span>
          </button>
        ))}
      </div>
      <div className="rx-verdict" aria-live="polite">
        {shown ? (
          <>
            <b key={shown}>{shown}/5</b>
            <span>
              <strong>{RV_LABELS[shown - 1]}</strong>
              <em>{w.words[shown - 1]}</em>
            </span>
          </>
        ) : (
          <span className="rx-verdict__hint">Tap to rate · 1 to 5</span>
        )}
      </div>
      {error && (
        <em id="rv-err-rating" className="frk-err">
          {error}
        </em>
      )}
    </div>
  );
}

/* step-4 ID badge that fills in as the visitor types */
function RX_Badge({ v }) {
  const name = v.name.trim();
  const sub = [v.designation.trim(), v.company.trim()].filter(Boolean).join(" · ");
  return (
    <div className="rx-badge" aria-hidden="true">
      <span className="rx-badge__strap" />
      <span className="rx-badge__clip" />
      <div className="rx-badge__card">
        <span className="rx-badge__top">
          <FRK_Logo h={28} />
          <small>Reviewer</small>
        </span>
        <span className="rx-badge__av">
          {name ? frInitials(name) : <FRK_I n="user" s={28} />}
          {v.country && (
            <i>
              <FRK_Flag iso={v.country} />
            </i>
          )}
        </span>
        <b className={name ? "" : "is-ph"}>{name || "Your name"}</b>
        <small className={sub ? "" : "is-ph"}>{sub || "Designation · Company"}</small>
        <em>{v.country ? frCName(v.country) : "Country"}</em>
        <span className="rx-badge__bar">
          {Array.from({ length: 22 }, (_, i) => (
            <i key={i} style={{ "--w": ((i * 7) % 4) + 1 }} />
          ))}
        </span>
      </div>
    </div>
  );
}

const RV_BLANK = () => {
  const l = frkLead() || {};
  return { services: [], review: "", name: [l.first, l.last].filter(Boolean).join(" "), country: l.country || "", email: l.email || "", phone: l.phone || { country: l.country || "IN", number: "", otherCode: "" }, designation: l.designation || "", company: l.company || "", captcha: { answer: "" }, consent: false, website: "" };
};

function RV_Prompt() {
  const [open, setOpen] = ee.useState(false);
  const [step, setStep] = ee.useState(0);
  const [dir, setDir] = ee.useState(1);
  const [rating, setRating] = ee.useState(0);
  const [peek, setPeek] = ee.useState(0);
  const [focusSvc, setFocusSvc] = ee.useState("");
  const [hoverSvc, setHoverSvc] = ee.useState("");
  const [v, setV] = ee.useState(RV_BLANK);
  const [touched, setTouched] = ee.useState({});
  const [forced, setForced] = ee.useState({});
  const [state, setState] = ee.useState("idle"); /* idle | sending | done | error */
  const [msg, setMsg] = ee.useState("");
  const [result, setResult] = ee.useState(null);
  const dialogRef = ee.useRef(null);
  const lastFocus = ee.useRef(null);

  /* auto-open later in the visit (see the timing note above) */
  const [toast, setToast] = ee.useState(false);
  ee.useEffect(() => {
    if (toast) frsPlay("review"); /* build 57: notification sound */
  }, [toast]);
  ee.useEffect(() => {
    /* update 18 (Kunal: "design overlapping a lot"): no automatic toast or review window over the page; the Rate us
       button and the Rates & Reviews page stay */
    return undefined;
    if (rvGet("localStorage", "fr_review_sent") || rvGet("sessionStorage", "fr_review_seen")) return;
    const t0 = Date.now();
    let done = false;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const fire = () => {
      if (done || document.querySelector(".rv-ov")) return;
      if (rvBusy()) return later(fire, 15000);
      done = true;
      setToast(false);
      rvSet("sessionStorage", "fr_review_seen", "1");
      lastFocus.current = document.activeElement;
      setOpen(true);
      cleanup();
    };
    const showToast = () => {
      if (done || document.querySelector(".rv-ov")) return;
      if (rvBusy()) return later(showToast, 10000);
      setToast(true);
      later(() => setToast(false), 14000);
    };
    later(showToast, rvRand(RV_TOAST_MS));
    later(fire, rvRand(RV_AUTO_MS));
    const onOut = (e) => {
      if (Date.now() - t0 < RV_MIN_DWELL_MS) return;
      if (!e.relatedTarget && e.clientY <= 8) fire();
    };
    let lastY = window.scrollY,
      lastT = Date.now(),
      maxY = 0;
    const onScroll = () => {
      const y = window.scrollY,
        t = Date.now();
      maxY = Math.max(maxY, y);
      const sp = (lastY - y) / Math.max(1, t - lastT);
      if (t - t0 > RV_TOUCH_DWELL_MS && maxY > 800 && sp > 1.2 && y < maxY - 300) fire();
      lastY = y;
      lastT = t;
    };
    const touch = window.matchMedia && window.matchMedia("(hover: none)").matches;
    document.addEventListener("mouseout", onOut);
    if (touch) window.addEventListener("scroll", onScroll, { passive: true });
    function cleanup() {
      timers.forEach(clearTimeout);
      document.removeEventListener("mouseout", onOut);
      window.removeEventListener("scroll", onScroll);
    }
    return cleanup;
  }, []);

  const reopen = (svc) => {
    lastFocus.current = document.activeElement;
    if (state === "error") setState("idle");
    if (state === "done") {
      setState("idle");
      setStep(0);
      setRating(0);
      setV(RV_BLANK());
      setTouched({});
      setForced({});
    }
    if (svc && FRK_V[svc]) {
      setV((x) => ({ ...x, services: x.services.includes(svc) ? x.services : [...x.services, svc] }));
      setFocusSvc(svc);
    }
    setToast(false);
    rvSet("sessionStorage", "fr_review_seen", "1");
    setOpen(true);
  };
  ee.useEffect(() => {
    const h = (e) => reopen(e && e.detail && e.detail.service);
    window.addEventListener("fr-open-review", h);
    return () => window.removeEventListener("fr-open-review", h);
  });

  const close = ee.useCallback(() => {
    setOpen(false);
    rvSet("sessionStorage", "fr_review_seen", "1");
    const f = lastFocus.current;
    if (f && f.focus) setTimeout(() => f.focus(), 0);
  }, []);

  ee.useEffect(() => {
    if (!open) return;
    const d = dialogRef.current;
    const first = d && (d.querySelector(".rx-portal input") || d.querySelector("input, button"));
    if (first) setTimeout(() => first.focus(), 40);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (document.querySelector(".cc-pop")) return; /* a country list is open — it closes first */
        e.preventDefault();
        close();
      } else if (e.key === "Tab" && d) {
        const els = [...d.querySelectorAll('a[href],button:not([disabled]),input:not([type="hidden"]):not([tabindex="-1"]),select,textarea,[tabindex="0"]')].filter((x) => x.offsetParent !== null);
        if (!els.length) return;
        const a = els[0],
          z = els[els.length - 1];
        if (e.shiftKey && document.activeElement === a) (e.preventDefault(), z.focus());
        else if (!e.shiftKey && document.activeElement === z) (e.preventDefault(), a.focus());
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const set = (k) => (x) => setV((o) => ({ ...o, [k]: x && x.target ? (x.target.type === "checkbox" ? x.target.checked : x.target.value) : x }));
  const blur = (k) => () => { const x = v[k]; if (x && (!Array.isArray(x) || x.length)) setTouched((o) => ({ ...o, [k]: true })); }; // empty fields are flagged on submit only
  const RULES = {
    services: () => (v.services.length ? "" : "Pick at least one service you are reviewing."),
    rating: () => (rating ? "" : "Choose a rating from 1 to 5."),
    review: () => {
      const t = v.review.trim();
      if (t.length < 20) return `Write at least 20 characters (${t.length}/20).`;
      if (t.length > 1500) return "Keep your review under 1,500 characters.";
      if (/(https?:\/\/|www\.)/i.test(t)) return "Please leave out web links.";
      return "";
    },
    name: () => {
      const t = v.name.trim();
      if (!t) return "Enter your full name.";
      if (t.length < 2) return "Your name needs at least 2 letters.";
      if (t.length > 80) return "Keep your name under 80 characters.";
      return /^[\p{L}][\p{L} .'’-]*$/u.test(t) ? "" : "Use letters only (spaces, dots, apostrophes and hyphens are fine).";
    },
    country: () => frkRule.country(v.country),
    email: () => frkRule.email(v.email),
    phone: () => frkRule.phone(v.phone, false),
    designation: () => frkRule.text(v.designation, 70, "designation"),
    company: () => frkRule.text(v.company, 80, "company name", true) || (v.company.trim().length === 1 ? "Enter your company name." : ""),
    captcha: () => frkCaptchaErr(v.captcha),
    consent: () => (v.consent ? "" : "Please tick to agree before publishing."),
  };
  const STEP_KEYS = [["services"], ["rating"], ["review"], ["name", "email", "country", "company", "designation", "phone"], ["captcha", "consent"]];
  const LAST = STEP_KEYS.length - 1;
  const err = (k) => ((touched[k] || forced[k]) && RULES[k]()) || "";
  const okF = (k) => (touched[k] || forced[k]) && !RULES[k]() && !!v[k];
  const checkStep = (s) => {
    const keys = STEP_KEYS[s];
    const f = {};
    keys.forEach((k) => (f[k] = true));
    setForced((o) => ({ ...o, ...f }));
    const bad = keys.filter((k) => RULES[k]());
    if (bad.length) {
      setTimeout(() => {
        const el = dialogRef.current && dialogRef.current.querySelector('[aria-invalid="true"], .is-bad input, .rx-meter.is-bad .rx-m');
        if (el) el.focus();
      }, 30);
    }
    return !bad.length;
  };
  const go = (s) => {
    setDir(s > step ? 1 : -1);
    setStep(s);
    setTimeout(() => {
      const d = dialogRef.current;
      const m = d && d.querySelector(".rx-body");
      if (m) m.scrollTop = 0;
      const h = d && d.querySelector(".rx-pane h2");
      if (h) h.focus({ preventScroll: true });
    }, 20);
  };
  const next = () => {
    if (checkStep(step)) go(step + 1);
  };
  const toggleSvc = (k) =>
    setV((o) => {
      const on = o.services.includes(k);
      if (!on) setFocusSvc(k);
      return { ...o, services: on ? o.services.filter((x) => x !== k) : [...o.services, k] };
    });

  /* the world the dialog is dressed in: hovered portal → focused service → first chosen → research */
  const prim = v.services.includes(focusSvc) ? focusSvc : v.services[0] || "market-research";
  const world = step === 0 && hoverSvc ? hoverSvc : prim;
  const W = rxW(prim);
  const wk = frkV(prim).k;

  const preview = {
    id: "preview",
    first: v.name.trim() || "Your name",
    last: "",
    company: v.company.trim(),
    designation: v.designation.trim(),
    country: v.country,
    rating: rating || 5,
    quote: v.review.trim().length >= 12 ? v.review.trim() : "Your review will appear here, exactly as you write it.",
    services: v.services.length ? [prim, ...v.services.filter((s) => s !== prim)] : ["market-research"],
  };
  const pv = frClean(preview, "mine");

  const submit = async (ev) => {
    ev && ev.preventDefault();
    const all = STEP_KEYS.map((_, s) => s);
    if (!all.every((s) => checkStep(s))) {
      const firstBad = all.find((s) => STEP_KEYS[s].some((k) => RULES[k]()));
      if (firstBad != null && firstBad !== step) go(firstBad);
      return;
    }
    if (v.website) {
      setState("done");
      return;
    }
    setState("sending");
    setMsg("");
    const cty = frkCountry(v.country) || {};
    const body = {
      name: v.name.trim(),
      first: v.name.trim().split(/\s+/)[0],
      last: v.name.trim().split(/\s+/).slice(1).join(" "),
      email: v.email.trim(),
      country: v.country,
      countryName: cty.name || "",
      countryCode: v.phone.number.trim() ? frkPhoneCode(v.phone) : "",
      phone: v.phone.number.trim(),
      designation: v.designation.trim(),
      company: v.company.trim(),
      services: v.services,
      rating,
      review: v.review.trim(),
      captchaId: v.captcha.id || "",
      captcha: (v.captcha.answer || "").trim(),
      consent: true,
      publish: true,
      website: v.website,
      page: window.location.href,
    };
    let r = await frkPost(RV_POST_URL, body);
    if (r.ok === false) {
      if (r.errors && r.errors.captcha) setForced((o) => ({ ...o, captcha: true }));
      setState("error");
      setMsg(r.error || "Your review could not be sent.");
      return;
    }
    let stored = r.ok ? r.j.review || null : null;
    const status = r.ok ? r.j.status || (stored && stored.status) || "published" : "sent";
    if (r.preview) {
      /* no review store on this server yet: make sure the team still receives it */
      const names = v.services.map((s) => FRK_V[s].name).join(", ");
      const e = await frkPost("/api/v1/enquiry", {
        type: "Website Review",
        name: (body.first + " " + body.last).trim(),
        email: body.email,
        company: body.company,
        designation: body.designation,
        country: body.countryName,
        countryCode: body.countryCode,
        phone: body.phone,
        rating,
        service: `Review (${rating}/5) — ${names}`,
        message: `Rating: ${rating}/5 — ${RV_LABELS[rating - 1]}\nServices: ${names}\nCountry: ${body.countryName}\n\n${body.review}`,
        consent: true,
        website: "",
        page: body.page,
      });
      if (e.ok === false) {
        setState("error");
        setMsg(e.error || "Your review could not be sent.");
        return;
      }
    }
    const mine = stored || { ...preview, id: "local-" + Date.now().toString(36), date: new Date().toISOString() };
    if (status !== "pending") frAddMine({ ...mine, first: body.first, last: body.last, company: body.company, designation: body.designation, country: body.country, rating, quote: body.review, services: v.services });
    frkSaveLead({ first: body.first, last: body.last, email: body.email, country: body.country, company: body.company, designation: body.designation, phone: v.phone });
    rvSet("localStorage", "fr_review_sent", String(Date.now()));
    setResult({ status, preview: !!r.preview });
    setState("done");
  };

  const fid = (k) => "rv-" + k;
  const ARIA = (k) => ({ "aria-invalid": !!err(k) || undefined, "aria-describedby": err(k) ? fid(k) + "-err" : undefined, onBlur: blur(k) });
  const len = v.review.trim().length;
  const chips = rating && rating <= 2 ? RV_CHIPS_DOWN : rating === 3 ? [...W.chips.slice(0, 3), ...RV_CHIPS_DOWN.slice(0, 2)] : W.chips;
  const rate = (n) => (setRating(n), setTouched((o) => ({ ...o, rating: true })));

  return (
    <>
      {toast && !open && (
        <div className="rv-toast" role="status">
          <span className="rv-toast__ic" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d={RV_STAR_PATH} />
            </svg>
          </span>
          <span className="rv-toast__txt">
            <strong>Worked with Frequent Research?</strong>
            <small>Rate us in under a minute — your review goes straight onto our testimonials.</small>
          </span>
          <button type="button" className="rv-toast__go" onClick={() => reopen()}>
            Rate now
          </button>
          <button type="button" className="rv-toast__x" onClick={() => setToast(false)} aria-label="Dismiss">
            ×
          </button>
        </div>
      )}
      <button type="button" className="rv-fab" onClick={() => reopen()} aria-haspopup="dialog" aria-expanded={open}>
        {/* build 74: the name comes from this text (not aria-label), so it never disagrees with the ring's lettering */}
        <span className="pp-sr">Rate and review Frequent Research</span>
        <span className="rv-fab__spin" aria-hidden="true">
        <svg className="rv-fab__ring" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <path id="rv-fab-c" d="M50 50 m-37 0 a37 37 0 1 1 74 0 a37 37 0 1 1 -74 0" />
          </defs>
          <text>
            <textPath href="#rv-fab-c">RATE US ★ REVIEW ★ RATE US ★ REVIEW ★</textPath>
          </text>
        </svg>
        </span>
        <span className="rv-fab__star" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d={RV_STAR_PATH} />
          </svg>
        </span>
      </button>
      {open && (
        <div className="rv-ov rx-ov" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div ref={dialogRef} className={"rx rx--" + frkV(world).k + (state === "done" ? " is-done" : "")} role="dialog" aria-modal="true" aria-labelledby="rv-h" style={frkVStyle(world)}>
            <header className="rx-head">
              <span className="rx-head__bg" aria-hidden="true">
                <i />
                <i />
              </span>
              <span className="rx-head__brand">
                <FRK_Logo h={34} />
              </span>
              {state !== "done" ? (
                <ol className="rx-path" aria-label={`Step ${step + 1} of ${STEP_KEYS.length}`} style={{ "--p": step / LAST }}>
                  <span className="rx-path__rail" aria-hidden="true">
                    <i />
                  </span>
                  <span className="rx-path__token" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d={RV_STAR_PATH} />
                    </svg>
                  </span>
                  {RX_STEPS.map(([t, ic], i) => (
                    <li key={t} className={(i === step ? "is-now" : "") + (i < step ? " is-done" : "")} aria-current={i === step ? "step" : undefined}>
                      <span className="rx-path__dot">{i < step ? <FRK_I n="check" s={13} sw={3} /> : <FRK_I n={ic} s={13} />}</span>
                      <span className="rx-path__t">{t}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <span className="rx-head__done">
                  <FRK_I n="check" s={16} sw={3} /> Review sent
                </span>
              )}
              <button type="button" className="rx-x" onClick={close} aria-label="Close the review form">
                <FRK_I n="x" s={20} />
              </button>
            </header>

            {state === "done" ? (
              <div className="rx-body">
                <div className="rx-done">
                  <div className="rx-done__burst" aria-hidden="true">
                    {Array.from({ length: 22 }, (_, i) => (
                      <i key={i} style={{ "--a": i * 16.4 + "deg", "--i": i }} />
                    ))}
                  </div>
                  <div className="rx-done__stage" aria-hidden="true">
                    <span className="rx-orbit">
                      {[0, 1, 2, 3, 4].map((k) => (
                        <i key={k} className={k < rating ? "is-on" : ""} style={{ "--k": k }}>
                          ★
                        </i>
                      ))}
                    </span>
                    <span className="rx-done__tick">
                      <FRK_I n="check" s={40} sw={2.8} />
                    </span>
                    <span className={"rx-stamp" + (result && result.status === "pending" ? " is-pending" : "")}>{result && result.status === "pending" ? "Received" : "Published"}</span>
                  </div>
                  <div className="rx-done__copy">
                    <h2 id="rv-h" tabIndex={-1}>
                      Thank you{v.name.trim() ? ", " + v.name.trim().split(/\s+/)[0] : ""}!
                    </h2>
                    <p>
                      {result && result.status === "pending"
                        ? "Your review has reached us. It will appear in our client testimonials as soon as it has been checked."
                        : result && result.preview
                        ? "Your review has reached our team, and you can already see it in the Client Testimonials section."
                        : "Your review is live in our client testimonials and on the Rates & Reviews page."}
                    </p>
                    <div className="rx-done__act">
                      <PpL to="/rates-reviews" className="frk-btn rx-done__all" onClick={close}>
                        <FRK_I n="eye" s={18} /> See all rates &amp; reviews
                      </PpL>
                      <button type="button" className="rx-ghost" onClick={close}>
                        Close
                      </button>
                    </div>
                  </div>
                  <RV_Google compact />
                </div>
              </div>
            ) : (
              <form className="rx-form" onSubmit={step === LAST ? submit : (e) => (e.preventDefault(), next())} noValidate>
                <div className="rx-body">
                  {step === 0 && (
                    <div className={"rx-pane rx-pane--svc" + (dir < 0 ? " is-back" : "")} key="s0">
                      <small className="rx-kick">Step 1 · Choose your world</small>
                      <h2 id="rv-h" tabIndex={-1}>
                        Which service did we deliver for you?
                      </h2>
                      <fieldset className={"rx-portals" + (err("services") ? " is-bad" : "")} aria-describedby={err("services") ? "rv-services-err" : undefined}>
                        <legend className="frk-sr">Services you are reviewing (pick one or more)</legend>
                        {FRK_VKEYS.map((k, i) => {
                          const s = FRK_V[k],
                            on = v.services.includes(k);
                          return (
                            <label key={k} className={"rx-portal rx-portal--" + s.k + (on ? " is-on" : "")} style={{ ...frkVStyle(k), "--i": i }} onMouseEnter={() => setHoverSvc(k)} onMouseLeave={() => setHoverSvc("")}>
                              <input type="checkbox" checked={on} onChange={() => (toggleSvc(k), setTouched((o) => ({ ...o, services: true })))} />
                              <span className="rx-portal__art">
                                <RX_Scene k={k} />
                              </span>
                              <span className="rx-portal__t">
                                <FRK_I n={s.ic} s={16} /> {s.name}
                              </span>
                              <span className="rx-portal__d">{RX_WORLD[s.k].d}</span>
                              <span className="rx-portal__tick" aria-hidden="true">
                                <FRK_I n="check" s={14} sw={3} />
                              </span>
                            </label>
                          );
                        })}
                      </fieldset>
                      <p className="rx-note">
                        <FRK_I n="info" s={14} /> Worked with more than one team? Pick them all — your review is shown under each.
                      </p>
                      {err("services") && (
                        <em className="frk-err" id="rv-services-err" role="alert">
                          {err("services")}
                        </em>
                      )}
                    </div>
                  )}
                  {step === 1 && (
                    <div className={"rx-pane rx-pane--rate rx-pane--" + wk + (dir < 0 ? " is-back" : "")} key="s1">
                      <small className="rx-kick">Step 2 · Your rating</small>
                      <h2 id="rv-h" tabIndex={-1}>
                        {W.ask}
                      </h2>
                      {v.services.length > 1 && (
                        <div className="rx-pills" role="group" aria-label="Change the look for another service you picked">
                          {v.services.map((k) => (
                            <button key={k} type="button" className={"rx-pill" + (k === prim ? " is-on" : "")} style={frkVStyle(k)} aria-pressed={k === prim} onClick={() => setFocusSvc(k)}>
                              <FRK_I n={FRK_V[k].ic} s={13} /> {FRK_V[k].short}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="rx-arena">
                        <RX_Meter k={prim} value={rating} onPeek={setPeek} onChange={rate} error={err("rating")} />
                      </div>
                      <p className="rx-note">One overall score for your experience{v.services.length > 1 ? " with the teams you picked" : ""}. You can change it any time before publishing.</p>
                    </div>
                  )}
                  {step === 2 && (
                    <div className={"rx-pane rx-pane--words" + (dir < 0 ? " is-back" : "")} key="s2">
                      <small className="rx-kick">Step 3 · In your words</small>
                      <h2 id="rv-h" tabIndex={-1}>
                        {rating >= 4 ? "What stood out?" : rating === 3 ? "What would make it great?" : "What should we do better?"}
                      </h2>
                      <div className="rx-chips" role="group" aria-label="Quick phrases — tap to add to your review">
                        {chips.map(([t, line], k) => {
                          const used = v.review.includes(line);
                          return (
                            <button key={t} type="button" className={"rx-chip" + (used ? " is-on" : "")} style={{ "--k": k }} aria-pressed={used} onClick={() => setV((o) => ({ ...o, review: used ? o.review.replace(line, "").replace(/\s{2,}/g, " ").trim() : (o.review.trim() + " " + line).trim() }))}>
                              {used ? <FRK_I n="check" s={12} sw={3} /> : <FRK_I n="plus" s={12} sw={3} />} {t}
                            </button>
                          );
                        })}
                      </div>
                      <div className={"rx-pad rx-pad--" + wk + (err("review") ? " is-bad" : "")}>
                        <div className="rx-pad__bar" aria-hidden="true">
                          {wk === "it" ? (
                            <>
                              <i />
                              <i />
                              <i />
                            </>
                          ) : (
                            <FRK_I n={W.padIc} s={14} />
                          )}
                          <span>{W.pad}</span>
                          <span className="rx-pad__stars">
                            <FRK_Stars n={rating} s={12} label={false} />
                          </span>
                        </div>
                        <label htmlFor={fid("review")} className="frk-sr">
                          Your review (required)
                        </label>
                        <textarea id={fid("review")} rows="6" value={v.review} onChange={set("review")} maxLength={1500} placeholder="Share your experience in your own words…" required {...ARIA("review")} />
                        <div className="rx-pad__foot" aria-hidden="true">
                          <span className={"rx-ink" + (len >= 20 ? " is-ok" : "")} style={{ "--p": Math.min(1, len / 20) }}>
                            <i />
                          </span>
                          <small>{len < 20 ? `${20 - len} more character${20 - len === 1 ? "" : "s"} to go` : `Ready · ${len}/1500`}</small>
                        </div>
                      </div>
                      {err("review") && (
                        <em className="frk-err" id={fid("review") + "-err"} role="alert">
                          {err("review")}
                        </em>
                      )}
                    </div>
                  )}
                  {step === 3 && (
                    <div className={"rx-pane rx-pane--you" + (dir < 0 ? " is-back" : "")} key="s3">
                      <small className="rx-kick">Step 4 · Your reviewer badge</small>
                      <h2 id="rv-h" tabIndex={-1}>
                        Who's writing this review?
                      </h2>
                      <div className="rx-you">
                        <RX_Badge v={v} />
                        <div className="rx-grid">
                          <FRK_Field id={fid("name")} label="Full name" req error={err("name")} icon="user" ok={okF("name")} full>
                            <input id={fid("name")} type="text" autoComplete="name" spellCheck={false} value={v.name} onChange={set("name")} maxLength={80} {...ARIA("name")} />
                          </FRK_Field>
                          <FRK_Field id={fid("country")} label="Country" req error={err("country")} ok={okF("country")}>
                            <FRK_Country id={fid("country")} value={v.country} onChange={(iso) => setV((o) => ({ ...o, country: iso, phone: o.phone.number ? o.phone : { ...o.phone, country: iso } }))} onBlur={blur("country")} invalid={!!err("country")} describedBy={err("country") ? fid("country") + "-err" : undefined} />
                          </FRK_Field>
                          <FRK_Field id={fid("email")} label="Email ID" req error={err("email")} icon="mail" ok={okF("email")} hint="Never published.">
                            <input id={fid("email")} type="email" inputMode="email" autoComplete="email" value={v.email} onChange={set("email")} maxLength={160} {...ARIA("email")} />
                          </FRK_Field>
                          <FRK_Field id={fid("designation")} label="Designation" error={err("designation")} icon="brief" ok={okF("designation")}>
                            <input id={fid("designation")} type="text" autoComplete="organization-title" value={v.designation} onChange={set("designation")} maxLength={70} {...ARIA("designation")} />
                          </FRK_Field>
                          <FRK_Field id={fid("company")} label="Company name" req error={err("company")} icon="building" ok={okF("company")}>
                            <input id={fid("company")} type="text" autoComplete="organization" value={v.company} onChange={set("company")} maxLength={80} {...ARIA("company")} />
                          </FRK_Field>
                          <FRK_Field id={fid("phone")} label="Phone number" error={err("phone")} full hint="Optional · never published.">
                            <FRK_Phone id={fid("phone")} value={v.phone} onChange={(p) => setV((o) => ({ ...o, phone: p }))} onBlur={blur("phone")} error={err("phone")} />
                          </FRK_Field>
                        </div>
                      </div>
                    </div>
                  )}
                  {step === 4 && (
                    <div className={"rx-pane rx-pane--pub" + (dir < 0 ? " is-back" : "")} key="s4">
                      <small className="rx-kick">Step 5 · Check &amp; publish</small>
                      <h2 id="rv-h" tabIndex={-1}>
                        One last check, then publish
                      </h2>
                      <div className="rx-pub">
                        <div className="rx-sum">
                          <span className="rx-sum__k">Your review at a glance</span>
                          <div className="rx-sum__stars" aria-label={`${rating} out of 5`}>
                            {[1, 2, 3, 4, 5].map((n) => (
                              <i key={n} className={n <= rating ? "is-on" : ""} style={{ "--n": n }}>
                                ★
                              </i>
                            ))}
                          </div>
                          <ul className="rx-sum__list">
                            <li>
                              <FRK_I n="user" s={14} /> <span>{v.name.trim()}</span>
                              <button type="button" onClick={() => go(3)}>
                                Edit
                              </button>
                            </li>
                            <li>
                              {v.country ? <FRK_Flag iso={v.country} /> : <FRK_I n="globe" s={14} />} <span>{[v.company.trim(), v.country ? frCName(v.country) : ""].filter(Boolean).join(" · ")}</span>
                            </li>
                            <li>
                              <FRK_I n="layers" s={14} /> <span>{v.services.map((k) => FRK_V[k].short).join(" · ")}</span>
                              <button type="button" onClick={() => go(0)}>
                                Edit
                              </button>
                            </li>
                            <li>
                              <FRK_I n="quote" s={14} /> <span>{v.review.trim().length} characters</span>
                              <button type="button" onClick={() => go(2)}>
                                Edit
                              </button>
                            </li>
                          </ul>
                          <p className="rx-sum__note">
                            <FRK_I n="eye" s={13} /> Shown publicly: name, country &amp; flag, company{v.designation.trim() ? ", designation" : ""}, rating and review. <FRK_I n="lock" s={13} /> Email and phone stay private.
                          </p>
                        </div>
                        <div className="rx-pub__form">
                          <FRK_Field id={fid("captcha")} label="Security check" req error="" full>
                            <FRK_Captcha id={fid("captcha")} value={v.captcha} onChange={(c) => setV((o) => ({ ...o, captcha: { ...o.captcha, ...c } }))} onBlur={blur("captcha")} error={err("captcha")} />
                          </FRK_Field>
                          <div className="rv-hp" aria-hidden="true">
                            <label htmlFor="rv-website">Website</label>
                            <input id="rv-website" type="text" tabIndex={-1} autoComplete="off" value={v.website} onChange={set("website")} />
                          </div>
                          <label className={"rx-consent" + (err("consent") ? " is-bad" : "") + (v.consent ? " is-on" : "")}>
                            <input type="checkbox" checked={v.consent} onChange={(e) => (set("consent")(e), setTouched((o) => ({ ...o, consent: true })))} aria-invalid={!!err("consent") || undefined} />
                            <span className="rx-consent__box" aria-hidden="true">
                              <FRK_I n="check" s={14} sw={3} />
                            </span>
                            <span>
                              I confirm this review describes my own experience, and I agree that Frequent Research may publish it on this website with my name, country{v.company.trim() ? " and company" : ""}, and store my details as described in the{" "}
                              <PpL to="/privacy-policy" target="_blank" rel="noopener">
                                privacy policy<span className="frk-sr"> (opens in a new tab)</span>
                              </PpL>
                              .
                            </span>
                          </label>
                          {err("consent") && (
                            <em className="frk-err" role="alert">
                              {err("consent")}
                            </em>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {state === "error" && (
                    <p className="rx-fail" role="alert">
                      {msg} Please try again, or email <a href="mailto:info@frequentresearch.com">info@frequentresearch.com</a>.
                    </p>
                  )}
                </div>
                <div className="rx-foot">
                  {step > 0 ? (
                    <button type="button" className="rx-ghost" onClick={() => go(step - 1)}>
                      <FRK_I n="back" s={18} /> Back
                    </button>
                  ) : (
                    <button type="button" className="rx-ghost" onClick={close}>
                      Maybe later
                    </button>
                  )}
                  <PpL to="/rates-reviews" className="rx-foot__all" onClick={close}>
                    <FRK_I n="eye" s={15} /> Read client reviews
                  </PpL>
                  <button type="submit" className={"rx-go rv-go" + (step === LAST ? " is-final" : "")} disabled={state === "sending"}>
                    <span className="rx-go__fill" aria-hidden="true" style={{ "--p": (step + 1) / STEP_KEYS.length }} />
                    {state === "sending" ? (
                      <>
                        <i className="frk-spin" aria-hidden="true" /> Publishing…
                      </>
                    ) : step < LAST ? (
                      <>
                        Continue <FRK_I n="arrow" s={18} />
                      </>
                    ) : (
                      <>
                        <FRK_I n="send" s={18} /> Publish my review
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export { RV_Prompt };
