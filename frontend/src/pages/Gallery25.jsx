/* ===== Gallery (build 65 update 25, gx25-) =====
   Kunal (2026-11-05): redesign the whole gallery, remove every photo and video, and give three sections that the super
   admin fills with photo and video links: Festivals Celebration, Awards & Appreciation, Birthdays.

   The page ships with NO photos or videos. Content comes from GET /api/gallery (saved by the super admin, see
   docs/go-live/07-GALLERY-ADMIN.md), falling back to /data/gallery.json (empty). Each item is just a link:
     { id, section: "festivals" | "awards" | "birthdays", type: "photo" | "video", url, thumb?, title, caption?,
       album?, person?, date?, featured?, show? }
   Links that work: any https image (jpg, png, webp, gif), Google Drive share links (photo or video), YouTube (watch,
   youtu.be, shorts, live), Vimeo, and direct video files (mp4, webm). Videos play inside the page.
   An empty section shows a designed "coming soon" frame, never a broken box. Loops animate transform/opacity only. */
import * as ee from 'react';
import * as ci from 'react-dom';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { K5_I, K5_Sec, K5_Words, k5Reduce, k5Sfx } from '../components/site/Kit65.jsx';

const GX25_SECTIONS = [
  {
    k: "festivals",
    t: "Festivals Celebration",
    kicker: "Lights, colours and togetherness",
    d: "Diwali, Holi, Independence Day, Christmas and every festival we celebrate together at the office.",
    soon: "Our festival moments will appear here soon.",
    c: "#D99A2B",
    c2: "#C8577E",
    art: "festivals",
  },
  {
    k: "awards",
    t: "Awards & Appreciation",
    kicker: "Hard work, celebrated",
    d: "Certificates, trophies and thank-yous for the people who go the extra mile for our clients and our team.",
    soon: "Our award and appreciation moments will appear here soon.",
    c: "#2F6BFF",
    c2: "#6D4AFF",
    art: "awards",
  },
  {
    k: "birthdays",
    t: "Birthdays",
    kicker: "Cakes, candles and wishes",
    d: "Every birthday at Frequent Research gets a cake, a song and a room full of smiles.",
    soon: "Our birthday celebrations will appear here soon.",
    c: "#C8577E",
    c2: "#0E9C88",
    art: "birthdays",
  },
];
const GX25_PAGE = 12; /* cards shown per section before "Show more" */

/* ---------- data ---------- */
let gx25P = null;
const gx25Get = (u) => fetch(u, { headers: { Accept: "application/json" } }).then((r) => (r.ok && /json/.test(r.headers.get("content-type") || "") ? r.json() : Promise.reject(new Error(r.status))));
const gx25Load = () =>
  gx25P ||
  (gx25P = gx25Get("/api/v1/gallery")
    .catch(() => gx25Get("/data/gallery.json"))
    .then((d) => (d && Array.isArray(d.items) ? d : { items: [] }))
    .catch(() => ({ items: [] })));
const gx25SafeUrl = (u) => (typeof u === "string" && /^(https:\/\/|\/(?!\/))/i.test(u.trim()) ? u.trim() : "");

/* turn any supported link into what the page needs: a picture to show and, for videos, what to play */
function gx25Media(it) {
  const u = gx25SafeUrl(it.url);
  const thumb = gx25SafeUrl(it.thumb);
  let m;
  if (!u) return null;
  if ((m = u.match(/(?:youtube(?:-nocookie)?\.com\/(?:watch\?(?:[^#]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/i)))
    return { kind: "yt", video: true, thumb: thumb || `https://i.ytimg.com/vi/${m[1]}/hqdefault.jpg`, embed: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0&modestbranding=1&playsinline=1`, vertical: /\/shorts\//i.test(u) };
  if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d{5,})/i))) return { kind: "vimeo", video: true, thumb, embed: `https://player.vimeo.com/video/${m[1]}?autoplay=1&dnt=1` };
  if ((m = u.match(/drive\.google\.com\/(?:file\/d\/|open\?(?:[^#]*&)?id=|uc\?(?:[^#]*&)?id=|thumbnail\?(?:[^#]*&)?id=)([\w-]{20,})/i))) {
    const id = m[1];
    if (it.type === "video") return { kind: "drive", video: true, thumb: thumb || `https://drive.google.com/thumbnail?id=${id}&sz=w1000`, embed: `https://drive.google.com/file/d/${id}/preview` };
    return { kind: "img", src: `https://drive.google.com/thumbnail?id=${id}&sz=w2000`, thumb: thumb || `https://drive.google.com/thumbnail?id=${id}&sz=w1000` };
  }
  if (it.type === "video" || /\.(mp4|webm|m4v|mov)(\?|#|$)/i.test(u)) return { kind: "file", video: true, src: u, thumb };
  return { kind: "img", src: u, thumb: thumb || u };
}
function gx25Prep(d) {
  const by = { festivals: [], awards: [], birthdays: [] };
  (d.items || []).forEach((it, i) => {
    if (!it || it.show === false || !by[it.section]) return;
    const media = gx25Media(it);
    if (!media) return;
    by[it.section].push({ ...it, id: it.id || "g" + i, media, title: String(it.title || "").slice(0, 120), caption: String(it.caption || "").slice(0, 300) });
  });
  /* featured first, then newest first (items without a date keep the admin's order) */
  Object.values(by).forEach((l) => l.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || String(b.date || "").localeCompare(String(a.date || ""))));
  return by;
}
const gx25Fmt = (d) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d || "")) return "";
  try {
    return new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch (e) {
    return d;
  }
};
const gx25Count = (l) => {
  const v = l.filter((x) => x.media.video).length;
  const p = l.length - v;
  return [p ? p + (p === 1 ? " photo" : " photos") : "", v ? v + (v === 1 ? " video" : " videos") : ""].filter(Boolean).join(" · ") || "Coming soon";
};
function gx25Go(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: k5Reduce() ? "auto" : "smooth", block: "start" });
}

/* ---------- illustrations (pure SVG; loops move only transform / opacity) ---------- */
function GX25_Art({ k, big }) {
  const cls = "gx25-art gx25-art--" + k + (big ? " is-big" : "");
  if (k === "festivals")
    return (
      <svg className={cls} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
        <defs>
          <radialGradient id={"gx25-glow-" + (big ? 1 : 0)} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#FFC27A" stopOpacity=".9" />
            <stop offset="1" stopColor="#FFC27A" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* marigold garland */}
        <g className="gx25-garland">
          <path d="M8 18 Q120 70 232 18" fill="none" stroke="#B4532A" strokeWidth="1.4" strokeOpacity=".5" />
          {Array.from({ length: 13 }, (_, i) => {
            const t = i / 12;
            const x = 8 + 224 * t;
            const y = 18 + 4 * 52 * t * (1 - t) * 1.0;
            return <circle key={i} cx={x} cy={y} r={i % 2 ? 5 : 6} fill={i % 3 === 0 ? "#D99A2B" : i % 3 === 1 ? "#FFC27A" : "#C8577E"} />;
          })}
        </g>
        {/* lanterns */}
        {[44, 196].map((x, i) => (
          <g key={x} className={"gx25-lantern gx25-lantern--" + i} style={{ transformOrigin: `${x}px 34px` }}>
            <line x1={x} y1="34" x2={x} y2="52" stroke="#B4532A" strokeWidth="1.2" />
            <rect x={x - 9} y="52" width="18" height="24" rx="7" fill="#C8577E" />
            <rect x={x - 9} y="52" width="18" height="24" rx="7" fill="url(#gx25-glow-0)" opacity=".5" />
            <rect x={x - 6} y="76" width="12" height="3" rx="1.5" fill="#D99A2B" />
          </g>
        ))}
        {/* diyas with flickering flames */}
        {[78, 120, 162].map((x, i) => (
          <g key={x} className="gx25-diya">
            <circle className={"gx25-halo gx25-d" + i} cx={x} cy="112" r="24" fill={"url(#gx25-glow-" + (big ? 1 : 0) + ")"} />
            <path className={"gx25-flame gx25-d" + i} style={{ transformOrigin: `${x}px 126px` }} d={`M${x} 98 C ${x + 7} 108 ${x + 6} 120 ${x} 126 C ${x - 6} 120 ${x - 7} 108 ${x} 98 Z`} fill="#FFC27A" />
            <path d={`M${x} 110 C ${x + 3} 115 ${x + 3} 121 ${x} 124 C ${x - 3} 121 ${x - 3} 115 ${x} 110 Z`} fill="#fff" opacity=".85" />
            <path d={`M${x - 24} 126 Q ${x} 150 ${x + 24} 126 Z`} fill="#B4532A" />
            <path d={`M${x - 24} 126 Q ${x} 134 ${x + 24} 126`} fill="none" stroke="#D99A2B" strokeWidth="2.4" />
          </g>
        ))}
        {/* sparks */}
        {[30, 70, 110, 150, 190, 220].map((x, i) => (
          <circle key={x} className={"gx25-spark gx25-s" + (i % 3)} cx={x} cy={96 - (i % 2) * 14} r="1.8" fill="#FFC27A" />
        ))}
      </svg>
    );
  if (k === "awards")
    return (
      <svg className={cls} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
        <g className="gx25-rays" style={{ transformOrigin: "120px 70px" }}>
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d="M120 70 L114 -10 L126 -10 Z" fill="#fff" opacity={i % 2 ? 0.07 : 0.13} transform={`rotate(${i * 30} 120 70)`} />
          ))}
        </g>
        {/* trophy */}
        <g className="gx25-trophy" style={{ transformOrigin: "120px 140px" }}>
          <path d="M92 34 H148 V58 C148 78 136 92 120 92 C104 92 92 78 92 58 Z" fill="#D99A2B" />
          <path d="M92 40 H78 C78 58 86 66 96 68" fill="none" stroke="#D99A2B" strokeWidth="6" strokeLinecap="round" />
          <path d="M148 40 H162 C162 58 154 66 144 68" fill="none" stroke="#D99A2B" strokeWidth="6" strokeLinecap="round" />
          <path d="M100 38 H112 V70 C104 66 100 58 100 50 Z" fill="#FFE2A8" opacity=".55" />
          <rect x="113" y="92" width="14" height="16" fill="#B4532A" />
          <rect x="98" y="108" width="44" height="10" rx="3" fill="#D99A2B" />
          <rect x="92" y="118" width="56" height="16" rx="4" fill="#0B1437" />
          <path d="M120 46 l4.6 9.4 10.4 1.5 -7.5 7.3 1.8 10.3 -9.3 -4.9 -9.3 4.9 1.8 -10.3 -7.5 -7.3 10.4 -1.5 Z" fill="#fff" />
        </g>
        {/* ribbon medal */}
        <g className="gx25-medal" style={{ transformOrigin: "190px 20px" }}>
          <path d="M182 20 L178 62 L190 56 L202 62 L198 20 Z" fill="#6D4AFF" />
          <circle cx="190" cy="70" r="15" fill="#FFC27A" stroke="#D99A2B" strokeWidth="3" />
          <text x="190" y="75" textAnchor="middle" fontSize="13" fontWeight="800" fill="#0B1437">1</text>
        </g>
        {/* stars */}
        {[
          [40, 40, 7],
          [62, 100, 4],
          [210, 112, 5],
          [30, 120, 3],
        ].map(([x, y, r], i) => (
          <path key={i} className={"gx25-star gx25-s" + (i % 3)} style={{ transformOrigin: `${x}px ${y}px` }} d={`M${x} ${y - r * 2} L${x + r * 0.6} ${y - r * 0.6} L${x + r * 2} ${y} L${x + r * 0.6} ${y + r * 0.6} L${x} ${y + r * 2} L${x - r * 0.6} ${y + r * 0.6} L${x - r * 2} ${y} L${x - r * 0.6} ${y - r * 0.6} Z`} fill="#FFC27A" />
        ))}
      </svg>
    );
  return (
    <svg className={cls} viewBox="0 0 240 160" aria-hidden="true" focusable="false">
      {/* balloons */}
      {[
        [40, 46, "#C8577E", 0],
        [70, 30, "#2F6BFF", 1],
        [196, 40, "#0E9C88", 2],
        [216, 66, "#FFC27A", 0],
      ].map(([x, y, c, d], i) => (
        <g key={i} className={"gx25-balloon gx25-s" + d} style={{ transformOrigin: `${x}px ${y + 60}px` }}>
          <path d={`M${x} ${y + 22} Q ${x + 6} ${y + 42} ${x - 2} ${y + 62}`} fill="none" stroke="#6B7395" strokeWidth="1" />
          <ellipse cx={x} cy={y} rx="14" ry="18" fill={c} />
          <ellipse cx={x - 5} cy={y - 7} rx="3.5" ry="6" fill="#fff" opacity=".45" />
          <path d={`M${x - 3} ${y + 18} L${x + 3} ${y + 18} L${x} ${y + 23} Z`} fill={c} />
        </g>
      ))}
      {/* cake */}
      <g className="gx25-cake">
        <rect x="80" y="104" width="80" height="34" rx="8" fill="#C8577E" />
        <path d="M80 112 Q90 122 100 112 T120 112 T140 112 T160 112 V104 H80 Z" fill="#FFE3EC" />
        <rect x="90" y="80" width="60" height="26" rx="7" fill="#F6EAF0" />
        <path d="M90 88 Q97.5 96 105 88 T120 88 T135 88 T150 88 V80 H90 Z" fill="#fff" />
        <rect x="70" y="136" width="100" height="6" rx="3" fill="#0B1437" opacity=".85" />
        {[104, 120, 136].map((x, i) => (
          <g key={x}>
            <rect x={x - 2.5} y="60" width="5" height="20" rx="2" fill={i === 1 ? "#2F6BFF" : "#0E9C88"} />
            <path className={"gx25-flame gx25-d" + i} style={{ transformOrigin: `${x}px 60px` }} d={`M${x} 46 C ${x + 5} 52 ${x + 4} 58 ${x} 60 C ${x - 4} 58 ${x - 5} 52 ${x} 46 Z`} fill="#FFC27A" />
          </g>
        ))}
      </g>
      {/* confetti */}
      {[
        [30, 120, "#FFC27A"],
        [58, 92, "#0E9C88"],
        [180, 104, "#6D4AFF"],
        [204, 128, "#C8577E"],
        [120, 26, "#D99A2B"],
        [150, 16, "#2F6BFF"],
      ].map(([x, y, c], i) => (
        <rect key={i} className={"gx25-confetti gx25-s" + (i % 3)} style={{ transformOrigin: `${x}px ${y}px` }} x={x} y={y} width="7" height="3" rx="1.5" fill={c} />
      ))}
    </svg>
  );
}

/* ---------- small pieces ---------- */
function GX25_Thumb({ it, eager }) {
  const [bad, setBad] = ee.useState(false);
  const src = it.media.thumb || it.media.src;
  if (!src || bad)
    return (
      <span className="gx25-ph" aria-hidden="true">
        <K5_I n={it.media.video ? "play" : "spark"} s={34} />
      </span>
    );
  if (it.media.kind === "file" && !it.media.thumb) return <video className="gx25-vthumb" src={it.media.src + "#t=0.5"} muted playsInline preload="metadata" aria-hidden="true" tabIndex={-1} />;
  return <img src={src} alt={it.title || it.caption || ""} loading={eager ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer" onError={() => setBad(true)} />;
}

function GX25_Card({ s, it, i, onOpen }) {
  const big = i === 0 && it.featured;
  const label = (it.media.video ? "Play video: " : "Open photo: ") + (it.title || it.caption || s.t);
  return (
    <li className={"gx25-card" + (big ? " is-big" : "") + (it.media.vertical ? " is-tall" : "")} style={{ "--i": i % GX25_PAGE }}>
      <button type="button" className="gx25-card__btn" onClick={() => (onOpen(i), k5Sfx("tap"))} aria-label={label}>
        <span className="gx25-card__media">
          <GX25_Thumb it={it} eager={i < 3} />
        </span>
        {it.media.video ? (
          <span className="gx25-card__play" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </span>
        ) : null}
        {s.k === "awards" && (it.person || it.featured) ? (
          <span className="gx25-card__badge" aria-hidden="true">
            <K5_I n="star" s={13} /> {it.featured ? "Spotlight" : "Award"}
          </span>
        ) : null}
        {s.k === "birthdays" && it.person ? (
          <span className="gx25-card__badge gx25-card__badge--bday" aria-hidden="true">
            🎂 Happy birthday
          </span>
        ) : null}
        <span className="gx25-card__cap">
          {it.album ? <span className="gx25-card__album">{it.album}</span> : null}
          {it.title ? <b>{it.title}</b> : null}
          {it.person ? <span className="gx25-card__who">{it.person}</span> : null}
          {it.date ? <span className="gx25-card__when">{gx25Fmt(it.date)}</span> : null}
        </span>
      </button>
    </li>
  );
}

/* one viewer for photos and videos; visitors never leave the page */
function GX25_View({ s, list, start, onClose }) {
  const [i, setI] = ee.useState(start);
  const n = list.length;
  const box = ee.useRef(null);
  const x0 = ee.useRef(null);
  const step = (d) => setI((v) => (v + d + n) % n);
  ee.useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", k);
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const back = document.activeElement;
    const t = setTimeout(() => box.current && box.current.querySelector(".gx25-lb__x").focus(), 30);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", k);
      document.body.style.overflow = o;
      if (back && back.focus) back.focus();
    };
  }, []);
  ee.useEffect(() => {
    const t = box.current && box.current.querySelector(".gx25-lb__strip .is-on");
    if (t && t.scrollIntoView) t.scrollIntoView({ block: "nearest", inline: "center" });
  }, [i]);
  const it = list[i];
  const m = it.media;
  const alt = it.title || it.caption || s.t;
  let media;
  if (m.kind === "img") media = <img src={m.src} alt={alt} referrerPolicy="no-referrer" />;
  else if (m.kind === "file") media = <video src={m.src} poster={m.thumb || undefined} controls autoPlay playsInline aria-label={alt} />;
  else media = <iframe src={m.embed} title={alt} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />;
  const node = (
    <div
      className="gx25-lb"
      role="dialog"
      aria-modal="true"
      aria-label={s.t + " viewer"}
      style={{ "--c": s.c, "--c2": s.c2 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onPointerDown={(e) => (x0.current = e.target.closest && e.target.closest("iframe,video,.gx25-lb__strip") ? null : e.clientX)}
      onPointerUp={(e) => {
        if (x0.current == null) return;
        const d = e.clientX - x0.current;
        x0.current = null;
        if (Math.abs(d) > 50) step(d < 0 ? 1 : -1);
      }}
    >
      <div ref={box} className="gx25-lb__box">
        <div className="gx25-lb__top">
          <span className="gx25-lb__t">{s.t}</span>
          <span aria-live="polite" className="gx25-lb__n">
            {i + 1} / {n}
          </span>
          <button type="button" className="gx25-lb__x" onClick={onClose} aria-label="Close viewer">
            ×
          </button>
        </div>
        <div className="gx25-lb__stage">
          {n > 1 ? (
            <button type="button" className="gx25-lb__nav gx25-lb__nav--prev" onClick={() => step(-1)} aria-label="Previous">
              <K5_I n="arrow" s={20} />
            </button>
          ) : null}
          <figure key={i} className={"gx25-lb__fig" + (m.video ? " is-video" : "") + (m.vertical ? " is-vert" : "")}>
            <div className="gx25-lb__media">{media}</div>
            {it.title || it.caption || it.person || it.date ? (
              <figcaption>
                {it.title ? <b>{it.title}</b> : null}
                {it.person ? <span className="gx25-lb__who">{it.person}</span> : null}
                {it.caption ? <span>{it.caption}</span> : null}
                {it.album || it.date ? <small>{[it.album, gx25Fmt(it.date)].filter(Boolean).join(" · ")}</small> : null}
              </figcaption>
            ) : null}
          </figure>
          {n > 1 ? (
            <button type="button" className="gx25-lb__nav gx25-lb__nav--next" onClick={() => step(1)} aria-label="Next">
              <K5_I n="arrow" s={20} />
            </button>
          ) : null}
        </div>
        {n > 1 ? (
          <div className="gx25-lb__strip" role="list">
            {list.map((x, j) => (
              <button key={x.id} type="button" role="listitem" className={j === i ? "is-on" : ""} onClick={() => setI(j)} aria-label={"Show " + (x.title || "item " + (j + 1))} aria-current={j === i}>
                <GX25_Thumb it={x} />
                {x.media.video ? <i className="gx25-lb__pv" aria-hidden="true" /> : null}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
  return typeof ci !== "undefined" && ci.createPortal ? ci.createPortal(node, document.body) : node;
}

/* empty section: a designed frame, never a broken box */
function GX25_Soon({ s }) {
  return (
    <div className="gx25-soon">
      <div className="gx25-soon__frames" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span key={i} className={"gx25-soon__f gx25-soon__f--" + i}>
            <span className="gx25-soon__shine" />
            {i === 1 ? <GX25_Art k={s.art} /> : <K5_I n={i === 0 ? "spark" : "play"} s={28} />}
          </span>
        ))}
      </div>
      <p className="gx25-soon__t">{s.soon}</p>
      <p className="gx25-soon__d">Photos and videos are added by our team as each moment happens. Check back soon.</p>
    </div>
  );
}

/* birthdays this month: a ribbon of names (only when the admin gave a person and a date) */
function GX25_BdayMonth({ list }) {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const names = [...new Set(list.filter((x) => x.person && /^\d{4}-(\d{2})-\d{2}$/.test(x.date || "") && x.date.slice(5, 7) === mm).map((x) => x.person))].slice(0, 12);
  if (!names.length) return null;
  const month = now.toLocaleDateString("en-GB", { month: "long" });
  return (
    <div className="gx25-bmonth">
      <span className="gx25-bmonth__t">🎉 {month} birthdays</span>
      <ul>
        {names.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}

function GX25_Section({ s, list, idx }) {
  const albums = ee.useMemo(() => [...new Set(list.map((x) => x.album).filter(Boolean))], [list]);
  const [alb, setAlb] = ee.useState("");
  const [more, setMore] = ee.useState(false);
  const [open, setOpen] = ee.useState(-1);
  const shown = alb ? list.filter((x) => x.album === alb) : list;
  const vis = more ? shown : shown.slice(0, GX25_PAGE);
  return (
    <K5_Sec className={"gx25-sec gx25-sec--" + s.k} id={"gx25-" + s.k} aria-labelledby={"gx25-" + s.k + "-h"} style={{ "--c": s.c, "--c2": s.c2 }}>
      <div className="container">
        <header className="gx25-sec__head">
          <div className="gx25-sec__copy">
            <span className="gx25-sec__num" aria-hidden="true">
              0{idx + 1}
            </span>
            <p className="gx25-sec__kicker">{s.kicker}</p>
            <h2 id={"gx25-" + s.k + "-h"} className="gx25-sec__h">
              {s.t}
            </h2>
            <p className="gx25-sec__d">{s.d}</p>
            <p className="gx25-sec__count">{gx25Count(list)}</p>
          </div>
          <div className="gx25-sec__art">
            <GX25_Art k={s.art} big />
          </div>
        </header>
        {s.k === "birthdays" ? <GX25_BdayMonth list={list} /> : null}
        {list.length ? (
          <>
            {albums.length > 1 ? (
              <div className="gx25-chips" role="group" aria-label={s.t + " albums"}>
                {["", ...albums].map((a) => (
                  <button key={a || "all"} type="button" className={alb === a ? "is-on" : ""} aria-pressed={alb === a} onClick={() => (setAlb(a), setMore(false))}>
                    {a || "All"}
                  </button>
                ))}
              </div>
            ) : null}
            <ul className="gx25-grid" role="list">
              {vis.map((it, i) => (
                <GX25_Card key={it.id} s={s} it={it} i={i} onOpen={setOpen} />
              ))}
            </ul>
            {shown.length > GX25_PAGE && !more ? (
              <div className="gx25-more">
                <button type="button" onClick={() => setMore(true)}>
                  Show all {shown.length} <K5_I n="arrow" s={16} />
                </button>
              </div>
            ) : null}
            {open >= 0 ? <GX25_View s={s} list={shown} start={open} onClose={() => setOpen(-1)} /> : null}
          </>
        ) : (
          <GX25_Soon s={s} />
        )}
      </div>
    </K5_Sec>
  );
}

function GX25_Nav({ by }) {
  const [on, setOn] = ee.useState(GX25_SECTIONS[0].k);
  ee.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setOn(e.target.id.replace("gx25-", ""))), { rootMargin: "-45% 0px -50% 0px" });
    GX25_SECTIONS.forEach((s) => {
      const el = document.getElementById("gx25-" + s.k);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="gx25-nav" aria-label="Gallery sections">
      <div className="container gx25-nav__in">
        {GX25_SECTIONS.map((s) => (
          <button key={s.k} type="button" className={on === s.k ? "is-on" : ""} style={{ "--c": s.c, "--c2": s.c2 }} aria-current={on === s.k ? "true" : undefined} onClick={() => gx25Go("gx25-" + s.k)}>
            <i aria-hidden="true" />
            {s.t}
            <small>{by[s.k].length || ""}</small>
          </button>
        ))}
      </div>
    </nav>
  );
}

/* update 26 (Kunal): the previous hero animation is back: a family under festival lights, twinkling sky, rolling
   motto (from the retired Gallery65 page; no photos). The buttons and chips now lead to the three new sections. */
const GL5_FOLK = [
  { x: 92, h: 1.0, c: "#5B8CFF" },
  { x: 160, h: 0.86, c: "#E8A33A" },
  { x: 226, h: 1.06, c: "#7B61FF" },
  { x: 294, h: 0.78, c: "#14B8A6" },
  { x: 360, h: 1.02, c: "#D06A8C" },
  { x: 428, h: 0.9, c: "#4F7DF0" },
  { x: 494, h: 0.98, c: "#C99A2E" },
];
function GL5_Scene() {
  return (
    <div className="gl5-scene" aria-hidden="true">
      <svg viewBox="0 0 586 420" className="gl5-scene__svg">
        <defs>
          <radialGradient id="gl5Glow" cx="50%" cy="62%" r="55%">
            <stop offset="0" stopColor="#FFD9A0" stopOpacity=".55" />
            <stop offset=".55" stopColor="#7B61FF" stopOpacity=".18" />
            <stop offset="1" stopColor="#0B1437" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="gl5Heart" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFB86B" />
            <stop offset="1" stopColor="#E26D8F" />
          </linearGradient>
        </defs>
        <circle cx="293" cy="250" r="230" fill="url(#gl5Glow)" className="gl5-scene__glow" />
        <path className="gl5-scene__heart" d="M293 330 C 180 250, 150 160, 215 120 C 255 96, 285 118, 293 142 C 301 118, 331 96, 371 120 C 436 160, 406 250, 293 330 Z" fill="none" stroke="url(#gl5Heart)" strokeWidth="3" strokeLinecap="round" />
        <path className="gl5-scene__wire" d="M10 40 Q 293 120 576 40" fill="none" />
        {Array.from({ length: 13 }, (_, i) => {
          const t = (i + 0.5) / 13;
          const x = 10 + 566 * t;
          const y = (1 - t) * (1 - t) * 40 + 2 * (1 - t) * t * 120 + t * t * 40;
          return <circle key={i} className="gl5-scene__bulb" cx={x} cy={y + 9} r="6" style={{ "--i": i }} />;
        })}
        <path className="gl5-scene__arms" d={"M" + GL5_FOLK.map((f) => `${f.x} ${388 - 112 * f.h}`).join(" L ")} fill="none" />
        {GL5_FOLK.map((f, i) => {
          const top = 388 - 150 * f.h;
          return (
            <g key={i} className="gl5-scene__p" style={{ "--i": i, "--c": f.c, transformOrigin: `${f.x}px 400px` }}>
              <rect x={f.x - 24} y={top + 34} width="48" height={400 - top - 34} rx="24" fill={f.c} />
              <circle cx={f.x} cy={top + 14} r="19" fill={f.c} />
              <circle cx={f.x} cy={top + 14} r="19" fill="#fff" opacity=".18" />
              <path d={`M${f.x - 7} ${top + 18} q7 6 14 0`} stroke="#0B1437" strokeOpacity=".55" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            </g>
          );
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path key={i} className="gl5-scene__luv" style={{ "--i": i, "--x": 120 + i * 70 + "px" }} d="M0 6 C -6 0,-12 6,0 16 C 12 6, 6 0, 0 6 Z" fill="url(#gl5Heart)" />
        ))}
      </svg>
      {Array.from({ length: 14 }, (_, i) => (
        <i key={i} className="gl5-scene__petal" style={{ "--i": i, left: ((i * 41) % 100) + "%" }} />
      ))}
    </div>
  );
}
const GL5_MOTTO = ["celebrate together.", "grow together.", "laugh together.", "light up together."];
function GL5_Motto() {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (k5Reduce()) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % GL5_MOTTO.length), 2600);
    return () => clearInterval(t);
  }, []);
  return (
    <p className="gl5-motto">
      <span>We</span>{" "}
      <span className="gl5-motto__roll" aria-live="off">
        <b key={i}>{GL5_MOTTO[i]}</b>
      </span>
    </p>
  );
}
function GX25_Hero({ by }) {
  return (
    <section className="gl5-hero" aria-labelledby="gx25-h">
      <div className="gl5-hero__sky" aria-hidden="true">
        {Array.from({ length: 26 }, (_, i) => (
          <i key={i} style={{ "--i": i, left: ((i * 37) % 100) + "%", top: ((i * 53) % 70) + "%" }} />
        ))}
      </div>
      <div className="container gl5-hero__in">
        <div className="gl5-hero__copy">
          <nav className="gl5-crumbs" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink>
            <HmLink to="/about-us">About Us</HmLink>
            <span aria-current="page">Gallery</span>
          </nav>
          <span className="gl5-kick">
            <K5_I n="heart" s={14} /> Life at Frequent Research
          </span>
          <K5_Words id="gx25-h" className="gl5-h1" text="One team. *One family.*" />
          <GL5_Motto />
          <p className="gl5-lead">Festivals we light up together, people we applaud, and birthdays we never forget. Every photo and video opens right here on the page.</p>
          <div className="gl5-hero__cta">
            <button type="button" className="k5-btn gl5-btn-warm" onClick={() => gx25Go("gx25-festivals")}>
              <K5_I n="play" s={16} /> See the celebrations
            </button>
            <button type="button" className="k5-btn gl5-btn-line" onClick={() => gx25Go("gx25-awards")}>
              Awards &amp; appreciation <K5_I n="arrow" s={16} />
            </button>
          </div>
          <ul className="gl5-hero__facts">
            {GX25_SECTIONS.map((x) => (
              <li key={x.k}>
                <a
                  href={"#gx25-" + x.k}
                  onClick={(e) => {
                    e.preventDefault();
                    gx25Go("gx25-" + x.k);
                  }}
                >
                  {x.t} <small>{gx25Count(by[x.k])}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <GL5_Scene />
      </div>
    </section>
  );
}

function GX25_Page() {
  usePageMeta("Gallery", "Life at Frequent Research: festival celebrations, awards and appreciation, and birthdays, in photos and videos that play on the page.");
  const [data, setData] = ee.useState(null);
  ee.useEffect(() => {
    let on = true;
    gx25Load().then((d) => on && setData(d));
    return () => {
      on = false;
    };
  }, []);
  const by = ee.useMemo(() => gx25Prep(data || { items: [] }), [data]);
  return (
    <div className="gx25">
      <GX25_Hero by={by} />
      <GX25_Nav by={by} />
      {GX25_SECTIONS.map((s, i) => (
        <GX25_Section key={s.k} s={s} list={by[s.k]} idx={i} />
      ))}
      <section className="gx25-end" aria-label="Join us">
        <div className="container gx25-end__in">
          <p>Want to be in the next photo?</p>
          <HmLink to="/careers" className="gx25-end__btn">
            See careers at Frequent Research <K5_I n="arrow" s={16} />
          </HmLink>
        </div>
      </section>
    </div>
  );
}
/* the /gallery route (scripts/v65_patches.js) renders GL5_Page */
function GL5_Page() {
  return <GX25_Page />;
}

export { GL5_Page };
