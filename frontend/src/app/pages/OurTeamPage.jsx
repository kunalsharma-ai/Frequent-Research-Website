import * as ee from 'react';
import { cmsList } from '../cms.jsx';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { RC_I, RC_useInView } from '../shared/Reveal.jsx';
import { HmLink } from '../shared/HomeShared.jsx';
import { HG_Globe } from '../shared/Globe.jsx';
/* build 74: the Our Team page itself is TM_Page (TMPage.jsx, loaded with the rest of the site); this file keeps the
   leadership section the home page shows */
const LDR_IMG = {
  manish: "/assets/core/i.e16f346640.jpg",
  sachin: "/assets/core/i.edfa8a0203.jpg",
  devashish: "/assets/core/i.3ade9ea80e.jpg",
};
/* build 82.3: editable in the super admin (Website content > Leadership messages, key "leadership"); an empty photo
   keeps the built-in portrait */
const LDR_PEOPLE = cmsList("leadership", [
  {
    id: "manish",
    photo: "",
    name: "Manish Arora",
    role: "Managing Director | Founder | CEO",
    email: "manish@frequentresearch.com",
    linkedin: "https://www.linkedin.com/in/manisharora2124/",
    icon: "compass",
    label: "A message from our Managing Director, Founder & CEO",
    msg: [
      "The best client relationships we have started with a simple, honest conversation about what was possible. We would rather tell you early that an audience is hard to reach, or that a different approach will work better, than promise something we cannot deliver.",
      "As we have grown into marketing, technology and finance, that principle has not changed. Whatever you need, you will work with people who listen first, explain clearly and stay with you long after the project is complete.",
      "Thank you for your trust. We look forward to working with you.",
    ],
  },
  {
    id: "sachin",
    photo: "",
    name: "Sachin Gupta",
    role: "Director \u2013 Project Management & Supply",
    email: "sachin@frequentresearch.com",
    linkedin: "https://www.linkedin.com/in/sachingupta1787/",
    icon: "clipboard",
    label: "Leadership statement",
    msg: [
      "Working with Frequent Research has been a smooth and professional experience. Their team demonstrates strong project management, clear communication, and a practical understanding of research requirements. They are responsive, detail-oriented, and committed to delivering reliable results within agreed timelines. Their ability to manage project requirements efficiently makes them a dependable research partner.",
    ],
  },
  {
    id: "devashish",
    photo: "",
    name: "Devashish Roy",
    role: "Director \u2013 IT & HR",
    email: "devashish@frequentresearch.com",
    linkedin: "https://www.linkedin.com/in/devashishr/",
    icon: "cpu",
    label: "Leadership perspective",
    msg: [
      "At Frequent Research, we believe strong research is built on two foundations: technology and people.",
      "We invest in secure, reliable technology and a skilled, responsible workforce to ensure accuracy, efficiency, confidentiality, and client trust.",
      "From information security and technology infrastructure to talent development and operational processes, we continuously strengthen how our people and systems work together.",
      "Our commitment to internationally recognized quality and security standards reflects our focus on consistency, transparency, and responsible data management.",
      "We continue to invest in people, technology, and processes to deliver dependable research solutions to clients worldwide.",
    ],
    points: ["layers", "shield", "server", "award", "globe"],
  },
], "id");
const LDR_photo = (id, own) =>
  own ||
  LDR_IMG[id] ||
  "/team/" +
    {
      manish: "manish-arora",
      sachin: "sachin-gupta",
      devashish: "devashish-roy",
    }[id] +
    ".jpg";
function LDR_Mail() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="17"
      height="17"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
function LDR_In() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3zM9.5 9.75h3.8v1.5h.06c.53-1 1.83-1.85 3.76-1.85 4.02 0 4.88 2.5 4.88 5.9v5.45h-4v-4.85c0-1.16-.02-2.65-1.62-2.65-1.62 0-1.87 1.26-1.87 2.57v4.93h-4z" />
    </svg>
  );
}
function LDR_Dock({ p }) {
  return (
    <div className="ldr-dock">
      <a href={"mailto:" + p.email} aria-label={"Email " + p.name + " (" + p.email + ")"} title={p.email}>
        <LDR_Mail />
      </a>
      <a
        href={p.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={p.name + " on LinkedIn (opens in a new tab)"}
        title={"LinkedIn: " + p.name}
      >
        <LDR_In />
      </a>
    </div>
  );
}
function LDR_Portrait({ p, size = "lg", chip }) {
  const ref = ee.useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el || e.pointerType === "touch") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
    el.style.setProperty("--ry", (x * 12).toFixed(2) + "deg");
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  };
  const leave = () => {
    const el = ref.current;
    if (el) ["--rx", "--ry", "--mx", "--my"].forEach((k) => el.style.removeProperty(k));
  };
  return (
    <div className={"ldr-pf ldr-pf--" + size} ref={ref} onPointerMove={move} onPointerLeave={leave}>
      <div className="ldr-pf__stage">
        <span className="ldr-pf__grid" aria-hidden="true" />
        <span className="ldr-pf__glass" aria-hidden="true" />
        <div className="ldr-pf__img">
          <img src={LDR_photo(p.id, p.photo)} alt={p.name + ", " + p.role} width="640" height="640" />
          <span className="ldr-pf__sheen" aria-hidden="true" />
        </div>
        <svg className="ldr-pf__brk" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M2 16V2h14M84 2h14v14M98 84v14H84M16 98H2V84" />
        </svg>
        {chip && (
          <span className="ldr-pf__chip">
            <RC_I n={p.icon} s={16} />
            {chip}
          </span>
        )}
      </div>
    </div>
  );
}
function LDR_Body({ p }) {
  if (p.points)
    return (
      <ol className="ldr-pts">
        {p.msg.map((m, j) => (
          <li
            key={j}
            style={{
              "--j": j,
            }}
          >
            <span className="ldr-pts__ic" aria-hidden="true">
              <RC_I n={p.points[j]} s={16} />
            </span>
            <p>{m}</p>
          </li>
        ))}
      </ol>
    );
  if (p.id === "sachin") {
    const sp = p.msg[0],
      cut = sp.indexOf(". ") + 1;
    return (
      <>
        <blockquote className="ldr-q">
          <p>
            <strong>{sp.slice(0, cut)}</strong>
            {sp.slice(cut)}
          </p>
        </blockquote>
        <ul className="ldr-keys" aria-label="Key themes in this statement">
          {[
            ["clipboard", "Project management"],
            ["msg", "Clear communication"],
            ["clock", "Agreed timelines"],
            ["check", "Reliable results"],
          ].map(([ic, t], j) => (
            <li
              key={t}
              style={{
                "--j": j,
              }}
            >
              <RC_I n={ic} s={16} />
              {t}
            </li>
          ))}
        </ul>
      </>
    );
  }
  return (
    <blockquote className="ldr-q">
      {p.msg.map((m, j) => (
        <p key={j} className={j === 0 ? "ldr-q__lead" : ""}>
          {m}
        </p>
      ))}
    </blockquote>
  );
}
function LDR_Section({ id = "leadership", page = false }) {
  const [ref, inView] = RC_useInView(0.08);
  const [i, setI] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  const n = LDR_PEOPLE.length;
  const rm =
    typeof window !== "undefined" &&
    !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches); /* build 82.3: the phone lite mode no longer stops the turning */
  ee.useEffect(() => {
    if (!inView || hold || rm) return;
    const t = setTimeout(() => setI((x) => (x + 1) % n), 9e3);
    return () => clearTimeout(t);
  }, [i, inView, hold, rm]);
  const go = (d) => setI((x) => (x + d + n) % n);
  return (
    <section
      id={id}
      ref={ref}
      className={"section ldr ldr--deck" + (inView ? " is-in" : "")}
      aria-labelledby={id + "-title"}
    >
      <div className="ldr__bg" aria-hidden="true">
        <div className="ldr__globe">
          {inView ? <HG_Globe fade fps={15} /> : null}
        </div>
        <div className="ldr__floor">
          <span />
        </div>
      </div>
      <div className="container ldr__in">
        <header
          className="ldr__head ldr-rv"
          style={{
            "--d": "0ms",
          }}
        >
          {page && (
            <nav className="crumbs ldr-crumbs" aria-label="Breadcrumb">
              <HmLink to="/">Home</HmLink>
              <span>
                <HmLink to="/about-us">About Us</HmLink>
              </span>
              <span>
                <span aria-current="page">Our Team</span>
              </span>
            </nav>
          )}
          <span className="ldr__kicker">
            <i />
            Leadership
          </span>
          {page ? (
            <HeroH1 id={id + "-title"} className="ldr__h1">
              The People Leading Frequent Research
            </HeroH1>
          ) : (
            <h2 id={id + "-title"}>The People Leading Frequent Research</h2>
          )}
          <p>Meet our Managing Director, Founder & CEO and our Directors.</p>
        </header>
        <div
          className="ldr-pick ldr-rv"
          style={{
            "--d": "120ms",
          }}
          role="tablist"
          aria-label="Choose a leader"
        >
          {LDR_PEOPLE.map((p, k) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={k === i}
              className={"ldr-pick__b" + (k === i ? " is-on" : "")}
              onClick={() => {
                setHold(true);
                setI(k);
              }}
            >
              <img src={LDR_photo(p.id, p.photo)} alt="" width="48" height="48" />
              <span>
                <b>{p.name}</b>
                <small>{p.role}</small>
              </span>
              {k === i && !hold && !rm && inView && <i className="ldr-pick__t" key={i} />}
            </button>
          ))}
        </div>
        <div
          className="ldr-deck ldr-rv"
          style={{
            "--d": "220ms",
          }}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          aria-roledescription="carousel"
        >
          {LDR_PEOPLE.map((p, k) => {
            let off = k - i;
            if (off > n / 2) off -= n;
            if (off < -n / 2) off += n;
            return (
              <article
                key={p.id}
                className={"ldr-card" + (off === 0 ? " is-front" : "")}
                style={{
                  "--off": off,
                  "--abs": Math.abs(off),
                }}
                /* build 74: every leader's card stays readable (it was hidden from screen readers while it held links) */
                onClick={() => off !== 0 && setI(k)}
              >
                <span className="ldr-card__edge" aria-hidden="true" />
                <div className="ldr-card__art">
                  <LDR_Portrait p={p} size="eq" />
                </div>
                <div className="ldr-card__body">
                  <span className="ldr-label">{p.label}</span>
                  <svg className="ldr-qm" viewBox="0 0 48 40" aria-hidden="true">
                    <path d="M0 40V22C0 9 7 2 20 0l2 5C14 8 11 13 11 19h9v21zm26 0V22C26 9 33 2 46 0l2 5c-8 3-11 8-11 14h9v21z" />
                  </svg>
                  <div className="ldr-card__msg">
                    <LDR_Body p={p} />
                  </div>
                  <footer className="ldr-sig">
                    <div>
                      <h3>{p.name}</h3>
                      <span className="ldr-sig__role">
                        <RC_I n={p.icon} s={14} />
                        {p.role}
                      </span>
                    </div>
                    <LDR_Dock p={p} />
                  </footer>
                </div>
              </article>
            );
          })}
        </div>
        <div className="ldr-nav">
          <button
            className="ldr-round"
            onClick={() => {
              setHold(true);
              go(-1);
            }}
            aria-label="Previous leader"
          >
            ‹
          </button>
          <div className="ldr-dots">
            {LDR_PEOPLE.map((p, k) => (
              <button
                key={p.id}
                className={k === i ? "is-on" : ""}
                onClick={() => {
                  setHold(true);
                  setI(k);
                }}
                aria-label={"Show " + p.name}
              />
            ))}
          </div>
          <button
            className="ldr-round"
            onClick={() => {
              setHold(true);
              go(1);
            }}
            aria-label="Next leader"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

export { LDR_IMG, LDR_Section };
