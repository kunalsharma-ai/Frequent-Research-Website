/*
 * "Get rewarded for your opinion" — home section for panel members (build 56). Prefix FRE_. Styles: src/styles/earn.css (fe-).
 *
 * Five audiences, five worlds (build 57): Consumer (coral → amber; phone survey + falling rewards), Professional (indigo →
 * teal; laptop expert study), Health Professionals (emerald; clinical monitor with ECG + role chips), Caregiver (lavender
 * → rose; heart with orbiting daily-care icons + care note) and Patient (sky → mint; anonymous chat survey + capsule).
 * Each has its own motto, tagline, perks, steps and the panels that recruit that audience. Panel names, links, steps and audiences come from the base panel data `Ri`
 * (Turn2Opinion, MyFrequentRewards, MyHealthOpinions); no reward amounts are stated (they vary by survey and panel).
 */
import * as ee from 'react';
import { PORTALS } from '../../app/data/site.jsx';
import { PpL } from '../dm/shared.jsx';
import { FRK_I, frkIn } from './FrKit.jsx';
import { useAuto82, A82Bar } from '../../design82/auto82.jsx';
import { frsPlay } from './Floaters.jsx';
import { FRL_Plate } from './Logos13.jsx';

const FRE_AUD = {
  consumer: {
    k: "Consumers",
    tab: "Consumer",
    ic: "heart",
    tag: "For everyday shoppers, users and households",
    motto: ["Your opinion ", "pays."],
    sub: "Answer short surveys from your phone or laptop and get rewarded for every opinion you share.",
    perks: [
      ["clock", "Surveys that fit your day"],
      ["trophy", "Rewards for completed surveys"],
      ["lock", "Your data stays private"],
    ],
    panels: ["turn2opinion", "myfrequentrewards"],
    note: {},
  },
  professional: {
    k: "Professionals",
    tab: "Professional",
    ic: "brief",
    tag: "For managers, specialists and decision-makers",
    motto: ["Your expertise, ", "rewarded."],
    sub: "Share what you know in studies for brands, agencies and B2B research — and get rewarded for your time.",
    perks: [
      ["target", "Studies matched to your role"],
      ["trophy", "Rewards for your insight"],
      ["shield", "Verified, confidential panels"],
    ],
    panels: ["turn2opinion", "myfrequentrewards"],
    note: { turn2opinion: "For business professionals", myfrequentrewards: "For business professionals" },
  },
  hcp: {
    k: "Health Professionals",
    tab: "Health Professionals",
    ic: "plus",
    tag: "For doctors, specialists, nurses and pharmacists",
    motto: ["Your clinical insight ", "shapes better care."],
    sub: "Take part in healthcare studies matched to your specialty and experience, and get rewarded for your professional time.",
    perks: [
      ["badge", "Specialty-matched studies"],
      ["clock", "Short, scheduled sessions"],
      ["shield", "Professional confidentiality"],
    ],
    panels: ["myhealthopinions"],
    note: { myhealthopinions: "For doctors, nurses & HCPs" },
  },
  caregiver: {
    k: "Caregivers",
    tab: "Caregiver",
    ic: "users",
    tag: "For family members and carers looking after a loved one",
    motto: ["You care for them. ", "We listen to you."],
    sub: "Share the realities of caring for someone so services, support and products can be designed around real needs.",
    perks: [
      ["heart", "Your experience matters"],
      ["clock", "Take part when it suits you"],
      ["lock", "Private and respectful"],
    ],
    // build 81.2 (Kunal, 12 Nov): caregivers and patients join MyHealthOpinions only
    panels: ["myhealthopinions"],
    note: { myhealthopinions: "For caregivers" },
  },
  patient: {
    k: "Patients",
    tab: "Patient",
    ic: "chat",
    tag: "For people living with a health condition",
    motto: ["Your experience can ", "improve healthcare."],
    sub: "Tell researchers what living with a condition is really like — your voice helps make treatment and care better for everyone.",
    perks: [
      ["chat", "Share your story, your way"],
      ["shield", "Confidential and anonymous"],
      ["trophy", "Rewarded for your time"],
    ],
    panels: ["myhealthopinions"],
    note: { myhealthopinions: "For patients" },
  },
};
const FRE_KEYS = Object.keys(FRE_AUD);
const fePanels = () => (Array.isArray(PORTALS) ? PORTALS : []);

function FRE_VisHcp() {
  return (
    <div className="fe-vis fe-vis--h" aria-hidden="true">
      <div className="fe-monitor">
        <span className="fe-monitor__top">
          <i />
          <b>Clinical study · Cardiology</b>
        </span>
        <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="fe-ecg">
          <path d="M0 55 H70 L84 55 L94 22 L106 88 L118 10 L130 70 L140 55 H190 L204 55 L214 30 L226 80 L236 55 H300" pathLength="100" />
        </svg>
        <span className="fe-monitor__vitals">
          <em>
            <FRK_I n="heart" s={14} /> Specialty matched
          </em>
          <em>
            <FRK_I n="clock" s={14} /> 20-min interview
          </em>
        </span>
      </div>
      {[
        ["Doctor", "badge"],
        ["Nurse", "heart"],
        ["Pharmacist", "plus"],
      ].map(([t, ic], i) => (
        <span key={t} className="fe-role" style={{ "--i": i }}>
          <FRK_I n={ic} s={15} /> {t}
        </span>
      ))}
      <span className="fe-cross">
        <i />
        <i />
      </span>
    </div>
  );
}
function FRE_VisCare() {
  return (
    <div className="fe-vis fe-vis--g" aria-hidden="true">
      <span className="fe-care">
        <span className="fe-care__ring" />
        <span className="fe-care__ring fe-care__ring--2" />
        <span className="fe-care__heart">
          <FRK_I n="heart" s={54} sw={1.6} />
        </span>
        {["building", "clock", "calendar", "chat", "users", "heart"].map((ic, i) => (
          <i key={ic + i} className="fe-care__sat" style={{ "--i": i }}>
            <FRK_I n={ic} s={16} />
          </i>
        ))}
      </span>
      <span className="fe-note">
        <small>Today</small>
        <b>Appointment · 10:30</b>
        <b>Medication · 14:00</b>
        <b>Share my experience ✓</b>
      </span>
    </div>
  );
}
function FRE_VisPatient() {
  return (
    <div className="fe-vis fe-vis--t" aria-hidden="true">
      <div className="fe-chat">
        <span className="fe-bub fe-bub--q" style={{ "--i": 0 }}>
          How easy was it to get the treatment you needed?
        </span>
        <span className="fe-bub fe-bub--a" style={{ "--i": 1 }}>
          <span className="fe-scale">
            {[1, 2, 3, 4, 5].map((n) => (
              <i key={n} className={n === 4 ? "is-on" : ""} />
            ))}
          </span>
        </span>
        <span className="fe-bub fe-bub--q" style={{ "--i": 2 }}>
          Thank you — your answer is anonymous.
        </span>
      </div>
      <span className="fe-pill">
        <i />
      </span>
      <span className="fe-shield">
        <FRK_I n="shield" s={22} /> Private &amp; anonymous
      </span>
    </div>
  );
}
function FRE_Visual({ aud }) {
  if (aud === "hcp") return <FRE_VisHcp />;
  if (aud === "caregiver") return <FRE_VisCare />;
  if (aud === "patient") return <FRE_VisPatient />;
  if (aud === "consumer")
    return (
      <div className="fe-vis fe-vis--c" aria-hidden="true">
        <div className="fe-phone">
          <span className="fe-phone__notch" />
          <div className="fe-q">
            <small>Quick survey · 5 min</small>
            <b>Which snack would you buy?</b>
            {["Baked chips", "Fruit bar", "Trail mix"].map((t, i) => (
              <span key={t} className={"fe-q__opt" + (i === 1 ? " is-pick" : "")} style={{ "--i": i }}>
                <i />
                {t}
              </span>
            ))}
            <span className="fe-q__done">
              <FRK_I n="check" s={14} sw={3} /> Reward earned
            </span>
          </div>
        </div>
        {Array.from({ length: 9 }, (_, i) => (
          <b key={i} className="fe-coin" style={{ "--i": i }}>
            {i % 3 === 2 ? "★" : "+1"}
          </b>
        ))}
        <span className="fe-gift">
          <FRK_I n="trophy" s={26} />
        </span>
      </div>
    );
  return (
    <div className="fe-vis fe-vis--p" aria-hidden="true">
      <div className="fe-laptop">
        <div className="fe-laptop__screen">
          <span className="fe-laptop__bar">
            <i />
            <i />
            <i />
          </span>
          <small>Expert study · B2B decision-makers</small>
          <svg viewBox="0 0 220 90" className="fe-chart">
            <path d="M0 80 L40 64 L80 70 L120 40 L160 46 L220 12" pathLength="100" />
          </svg>
          <span className="fe-laptop__rows">
            <i />
            <i />
            <i />
          </span>
        </div>
        <span className="fe-laptop__base" />
      </div>
      <span className="fe-badge">
        <FRK_I n="badge" s={22} /> Verified expert
      </span>
      <span className="fe-orbit">
        {["brief", "users", "heart", "target"].map((ic, i) => (
          <i key={ic} style={{ "--i": i }}>
            <FRK_I n={ic} s={16} />
          </i>
        ))}
      </span>
    </div>
  );
}

function FRE_Earn() {
  const [aud, setAud] = ee.useState("consumer");
  const [ref, inV] = frkIn(0.15);
  /* build 82.3: turns to the next panel on its own */
  const ai = FRE_KEYS.indexOf(aud);
  const auto = useAuto82(FRE_KEYS.length, ai, (j) => setAud(FRE_KEYS[j]), inV, 6000);
  const A = FRE_AUD[aud];
  const all = fePanels();
  const panels = A.panels.map((s) => all.find((p) => p.slug === s)).filter(Boolean);
  const steps = (all[0] && Array.isArray(all[0].steps) ? all[0].steps : []).slice(0, 4);
  return (
    <section ref={ref} className={"fe fe--" + aud + (inV ? " is-in" : "")} aria-labelledby="fe-h">
      <div className="fe__bg" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container">
        <header className="fe__head">
          <span className="fe__kick">
            <FRK_I n="trophy" s={14} /> Join our research panels
          </span>
          <div className="fe-switch" role="tablist" aria-label="I am a…" style={{ "--n": FRE_KEYS.length, "--i": FRE_KEYS.indexOf(aud) }} {...auto.bind}>
            <span className="fe-switch__pill" aria-hidden="true" />
            {FRE_KEYS.map((k) => (
              <button key={k} type="button" role="tab" aria-selected={aud === k} className={aud === k ? "is-on" : ""} onClick={() => (k !== aud && frsPlay("tab"), setAud(k))}>
                <FRK_I n={FRE_AUD[k].ic} s={16} /> {FRE_AUD[k].tab}
                {aud === k ? <A82Bar run={auto.run} ms={auto.ms} k={ai} /> : null}
              </button>
            ))}
          </div>
        </header>
        <div className="fe__stage" key={aud}>
          <div className="fe__copy">
            <span className="fe__tag">
              <FRK_I n={A.ic} s={14} /> {A.tag}
            </span>
            <h2 id="fe-h">
              {A.motto[0]}
              <em>{A.motto[1]}</em>
            </h2>
            <p>{A.sub}</p>
            <ul className="fe-perks">
              {A.perks.map(([ic, t], i) => (
                <li key={t} style={{ "--i": i }}>
                  <span>
                    <FRK_I n={ic} s={16} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            {steps.length > 0 && (
              <ol className="fe-steps">
                {steps.map((st, i) => (
                  <li key={st.t} style={{ "--i": i }}>
                    <b>{i + 1}</b>
                    {st.t}
                  </li>
                ))}
              </ol>
            )}
          </div>
          <FRE_Visual aud={aud} />
        </div>
        <ul className="fe-panels">
          {panels.map((p, i) => (
            <li key={p.slug} style={{ "--i": i }}>
              <span className="fe-panels__logo">
                <FRL_Plate k={p.slug} h={40} alt={p.name + " logo"} />
              </span>
              <small>{(A.note && A.note[p.slug]) || p.audience}</small>
              <p>{p.tagline}</p>
              <span className="fe-panels__act">
                <a className="fe-join" href={p.joinUrl || p.url} target="_blank" rel="noopener noreferrer">
                  Join free <FRK_I n="arrow" s={14} />
                  <span className="frk-sr"> (opens {p.name} in a new tab)</span>
                </a>
                <PpL to={`/portals/${p.slug}`} className="fe-more">
                  About {p.name}
                </PpL>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export { FRE_Earn };
