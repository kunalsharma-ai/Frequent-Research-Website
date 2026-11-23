/*
 * Build 82.9 (Kunal, 21 Nov 2026: "create animation hero text and hero animation page for all panel turn2opinion,
 * myfrequentrewards and myhealthopinion … very attractive attention seeking"): a full-bleed moving hero for each of the
 * three panel portals, each with its own story, palette, type and headline animation, plus the Teen panel section
 * (ages 13 to 17, with a parent or guardian's permission) on the Turn2Opinion and MyFrequentRewards pages.
 *
 *   Turn2Opinion       "Opinion engine": consumer, professional and teen voices fly into a spinning 3D core that turns
 *                      them into products; electric blue / violet / cyan on night navy; words flip up in 3D.
 *   MyFrequentRewards  "Reward vault": invitations arrive, coins spin up a $15 ring, the vault opens; sunset amber /
 *                      magenta on plum; letters drop in and a gold shine runs over them.
 *   MyHealthOpinions   "Pulse of care": one ECG line runs across the whole hero, a beating heart with a DNA helix and the
 *                      five healthcare voices around it; clinical pearl / coral / teal (dark: deep teal night); the
 *                      headline is uncovered by a scan line.
 *
 * CSS and SVG only (portal829.css, put on the page by this file, not in the site stylesheet); every movement is
 * transform / opacity. One H1 (HeroH1). The <style> carries data-fr-own so the first-screen copy does not repeat it.
 */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import css from './portal829.css?inline';

const n_ = (k) => Array.from({ length: k }, (_, i) => i);
const words = (s, cls) => s.split(' ').flatMap((w, i) => [i ? ' ' : null, <span key={i} className={cls} style={{ '--i': i }}>{w}</span>]);
const letters = (s) => { let n = 0; return s.split(' ').flatMap((w, k) => [k ? ' ' : null, <span key={k} className="p9-lw">{[...w].map((c) => <span key={n} className="p9-l" style={{ '--i': n++ }}>{c}</span>)}</span>]); };

/* small line icons, 24 × 24 */
const IC = {
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  brief: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  teen: 'M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M17 4l2-2M19 7h2',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  check: 'M5 12.5l4.5 4.5L19 7',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  gift: 'M4 10h16v10H4zM2 7h20v3H2zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z',
  steth: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v3a4 4 0 0 0 8 0v-2M18 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
  pill: 'M8.5 15.5l7-7a3.5 3.5 0 0 0-5-5l-7 7a3.5 3.5 0 0 0 5 5ZM7 7l5 5',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3 6',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  key: 'M14 10a4 4 0 1 0-1.2 2.8L20 20M17 17l2-2',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18',
  game: 'M6 9h12a4 4 0 0 1 0 8c-1.5 0-2.5-1-3.5-2h-5C8.5 16 7.5 17 6 17a4 4 0 0 1 0-8ZM8 11v4M6 13h4M16 12h.01M18 14h.01',
  music: 'M9 18V6l11-2v12M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z',
  phone: 'M8 3h8v18H8zM11 18h2',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5',
  arrow: 'M5 12h14M13 6l6 6-6 6',
};
export function I9({ n, s = 18 }) {
  return (
    <svg className="p9-ic" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={IC[n] || IC.check} />
    </svg>
  );
}

/* the line that cycles through who the panel is for */
function Ticker({ lead, items }) {
  return (
    <p className="p9-tick">
      <span className="p9-tick__lead">{lead}</span>
      <span className="p9-tick__win" aria-hidden="true" style={{ '--n': items.length }}>
        <span className="p9-tick__rail">
          {items.concat(items[0]).map((t, i) => <b key={i}>{t}</b>)}
        </span>
      </span>
      <span className="sr-only">{items.join(', ')}</span>
    </p>
  );
}

/* ------------------------------------------------------------------ Turn2Opinion: the opinion engine */
function SceneT2O() {
  const voices = [
    ['user', 'Priya, 29', 'Consumer', 'Which snack would you buy?'],
    ['brief', 'Daniel, 44', 'IT director', 'Rate this cloud tool'],
    ['teen', 'Aarav, 15', 'Teen · parent said yes', 'Pick the best game cover'],
  ];
  return (
    <div className="p9s p9s--t2o" aria-hidden="true">
      <div className="t9-core">
        <i className="t9-core__ring t9-core__ring--a" /><i className="t9-core__ring t9-core__ring--b" /><i className="t9-core__ring t9-core__ring--c" />
        <span className="t9-core__orb"><i className="t9-core__shine" /><b>2</b></span>
        {n_(10).map((i) => <i key={i} className="t9-core__spark" style={{ '--i': i }} />)}
      </div>
      {voices.map(([ic, n, r, q], i) => (
        <div key={n} className={'t9-voice t9-voice--' + i} style={{ '--i': i }}>
          <span className="t9-voice__av"><I9 n={ic} s={20} /></span>
          <span className="t9-voice__who"><b>{n}</b><small>{r}</small></span>
          <span className="t9-voice__q">{q}</span>
          {n_(3).map((k) => <i key={k} className="t9-voice__dot" style={{ '--k': k }} />)}
        </div>
      ))}
      <div className="t9-out">
        {[['New snack', '#FF4FD8'], ['Better app', '#22D3EE'], ['Fairer game', '#A78BFA']].map(([t, c], i) => (
          <span key={t} className="t9-out__c" style={{ '--i': i, '--c': c }}><I9 n="spark" s={16} />{t}</span>
        ))}
      </div>
      <p className="t9-pts"><b>+120</b> points</p>
      <p className="t9-toast"><I9 n="gift" s={16} /> Reward unlocked</p>
    </div>
  );
}

/* ------------------------------------------------------------------ MyFrequentRewards: the reward vault */
function SceneMFR() {
  return (
    <div className="p9s p9s--mfr" aria-hidden="true">
      <i className="m9-rays" />
      <div className="m9-vault">
        <svg viewBox="0 0 200 200" className="m9-ring">
          <defs>
            <linearGradient id="m9g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FFD166" /><stop offset=".55" stopColor="#FF7A1A" /><stop offset="1" stopColor="#E11D74" /></linearGradient>
          </defs>
          <circle cx="100" cy="100" r="84" pathLength="100" className="m9-ring__bg" />
          <circle cx="100" cy="100" r="84" pathLength="100" className="m9-ring__on" stroke="url(#m9g)" />
          {n_(24).map((i) => <line key={i} x1="100" y1="6" x2="100" y2={i % 6 ? 11 : 15} transform={`rotate(${i * 15} 100 100)`} className="m9-ring__tick" />)}
        </svg>
        <div className="m9-door">
          <span className="m9-door__wheel">{n_(6).map((i) => <i key={i} style={{ '--i': i }} />)}</span>
          <p className="m9-door__v"><small>Reward balance</small><b><span>$4</span><span>$9</span><span>$13</span><span>$15</span></b><em>Threshold reached</em></p>
        </div>
        {n_(7).map((i) => <i key={i} className="m9-coin" style={{ '--i': i }}><b>$</b></i>)}
      </div>
      {n_(3).map((i) => (
        <span key={i} className="m9-env" style={{ '--i': i }}><I9 n="mail" s={18} /><small>{['Survey for you · 8 min', 'Brand study · 12 min', 'Quick poll · 3 min'][i]}</small></span>
      ))}
      <div className="m9-card">
        <p className="m9-card__h"><i /> Member profile</p>
        <p className="m9-card__tags"><span>Consumer</span><span>Business</span><span>Teen 13–17</span></p>
        <p className="m9-card__row"><I9 n="globe" s={15} /> 95+ countries</p>
      </div>
      <p className="m9-chip"><I9 n="check" s={15} /> Paid out: PayPal · UPI · Gift card</p>
      {n_(14).map((i) => <i key={i} className="m9-conf" style={{ '--i': i }} />)}
    </div>
  );
}

/* ------------------------------------------------------------------ MyHealthOpinions: the pulse of care */
function SceneMHO() {
  const who = [['steth', 'Physician'], ['heart', 'Nurse'], ['pill', 'Pharmacist'], ['user', 'Patient'], ['users', 'Caregiver']];
  return (
    <div className="p9s p9s--mho" aria-hidden="true">
      <div className="h9-heart">
        <i className="h9-heart__wave" /><i className="h9-heart__wave h9-heart__wave--2" /><i className="h9-heart__wave h9-heart__wave--3" />
        <svg viewBox="0 0 120 110" className="h9-heart__svg">
          <defs><linearGradient id="h9g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#FF8A8A" /><stop offset="1" stopColor="#E0294A" /></linearGradient></defs>
          <path d="M60 104S6 72 6 36A26 26 0 0 1 60 22a26 26 0 0 1 54 14c0 36-54 68-54 68Z" fill="url(#h9g)" />
          <path d="M18 52h22l7-14 9 30 8-22 5 6h33" className="h9-heart__ecg" pathLength="100" />
        </svg>
        <div className="h9-dna">{n_(12).map((i) => <i key={i} style={{ '--i': i }}><b /><b /></i>)}</div>
      </div>
      <div className="h9-orbit">
        {who.map(([ic, t], i) => (
          <span key={t} className="h9-who" style={{ '--a': i * 72 + 'deg', '--i': i }}>
            <span className="h9-who__in"><I9 n={ic} s={18} /><b>{t}</b></span>
          </span>
        ))}
      </div>
      <div className="h9-card">
        <p className="h9-card__h"><i /> Clinical study · Cardiology</p>
        <p className="h9-card__v"><b>72</b><small>bpm</small><b>20</b><small>min interview</small></p>
        <p className="h9-card__bar"><i /></p>
      </div>
      <p className="h9-chip"><I9 n="shield" s={15} /> Private &amp; specialty-matched</p>
    </div>
  );
}

const HEROES = {
  turn2opinion: {
    k: 't2o', Scene: SceneT2O,
    kick: 'Consumer, Business & Teen Research Panel',
    line: 'Say it. Shape it. Get rewarded.',
    lead: 'Turn2Opinion is Frequent Research’s online community of consumers, business professionals and teens aged 13 to 17 (with a parent or guardian’s permission). Your answers help brands, agencies and institutions build better products, and you are rewarded for every eligible survey.',
    tick: ['consumers', 'business professionals', 'teens 13–17, with a parent’s yes', 'decision-makers'],
    chips: [['user', 'Consumers'], ['brief', 'Business professionals'], ['teen', 'Teens 13–17']],
  },
  myfrequentrewards: {
    k: 'mfr', Scene: SceneMFR,
    kick: 'Consumer, Business & Teen Research Panel',
    line: 'Every opinion pays.',
    lead: 'MyFrequentRewards is Frequent Research’s worldwide research community for consumers, business professionals and teens aged 13 to 17 (with a parent or guardian’s permission). Get invitations matched to your profile and claim rewards from a low $15 threshold.',
    tick: ['95+ countries', 'a low $15 threshold', 'teens 13–17, with a parent’s yes', 'invitations by email'],
    chips: [['user', 'Consumers'], ['brief', 'Business professionals'], ['teen', 'Teens 13–17']],
  },
  myhealthopinions: {
    k: 'mho', Scene: SceneMHO,
    kick: 'Healthcare Professionals, Patients & Caregivers Research Panel',
    line: 'Every voice in care, heard.',
    lead: 'MyHealthOpinions is Frequent Research’s healthcare research panel for healthcare professionals, patients and caregivers. Share your experience of treatments, products and care, help healthcare organisations understand real needs, and be rewarded for eligible research.',
    tick: ['physicians & specialists', 'nurses & pharmacists', 'patients', 'caregivers'],
    chips: [['steth', 'Physicians'], ['pill', 'Nurses & pharmacists'], ['user', 'Patients'], ['users', 'Caregivers']],
  },
};

/* the hero of a portal page. Join, Logo and extra come from the page (its own join button, logo and researcher link) */
export function PortalHero829({ p, Logo, join, extra }) {
  const H = HEROES[p.slug];
  if (!H) return null;
  const { Scene } = H;
  return (
    <section className={'p9 p9--' + H.k} aria-label={p.name}>
      <style data-fr-own="">{css}</style>
      <div className="p9__bg" aria-hidden="true">
        <i className="p9__mesh" /><i className="p9__grid" /><i className="p9__glow p9__glow--a" /><i className="p9__glow p9__glow--b" />
        {H.k === 'mho' ? (
          <svg className="h9-ecg" viewBox="0 0 1200 120" preserveAspectRatio="none"><path d="M0 70h300l20-30 22 62 26-90 24 80 18-22h170l14-18 16 36 14-18h576" pathLength="100" /></svg>
        ) : null}
        {n_(H.k === 'mfr' ? 0 : 12).map((i) => <i key={i} className="p9__p" style={{ '--i': i }} />)}
      </div>
      <div className="container p9__in">
        <div className="p9__copy">
          <nav className="crumbs p9-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span><Link to="/portals">Portals</Link></span>
            <span><span aria-current="page">{p.name}</span></span>
          </nav>
          <div className="p9-brand">
            <Logo p={p} size="md" />
            <span>by Frequent Research</span>
          </div>
          <HeroH1 className="p9-h1">
            <span className="p9-h1__name">{p.name + ' '}</span>
            <span className="p9-h1__line">{H.k === 'mfr' ? letters(H.line) : words(H.line, 'p9-w')}</span>
          </HeroH1>
          <p className="p9-kick">{H.kick}</p>
          <Ticker lead="Made for" items={H.tick} />
          <p className="p9-lead">{H.lead}</p>
          <div className="p9-ctas">{join}{extra}</div>
          <ul className="p9-chips" aria-label="Who can join">
            {H.chips.map(([ic, t], i) => <li key={t} style={{ '--i': i }} className={ic === 'teen' ? 'is-teen' : ''}><I9 n={ic} s={15} />{t}</li>)}
          </ul>
        </div>
        <div className="p9__stage"><Scene /></div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ the Teen panel section (Turn2Opinion, MyFrequentRewards) */
const TEEN = {
  turn2opinion: { url: 'https://www.turn2opinion.com/teen/', name: 'Turn2Opinion Teen panel' },
  myfrequentrewards: { url: 'https://www.myfrequentrewards.com/paid-surveys-for-teens', name: 'MyFrequentRewards Teens' },
};
const STEPS = [
  ['teen', 'The teen signs up', 'Name, date of birth, email and where they live. A date of birth from 13 to 17 switches any sign-up to the teen route on its own.'],
  ['users', 'A parent or guardian is added', 'Mother, father or legal guardian, with their own email. They must be 18 or older.'],
  ['check', 'Both read and tick the consent', 'Clear terms written for families: what is asked, what is never asked, and how to stop at any time.'],
  ['mail', 'The parent says Yes or No by email', 'A bold Yes / No in the email. Yes opens the short parent onboarding and consent form.'],
  ['key', 'The teen sets a password', 'Once the parent has finished, the teen gets a link to create a password. The username is their email.'],
  ['spark', 'Welcome survey, then age-appropriate studies', 'A few basics only. Anything a family has already told us is never asked again.'],
];
const SAFE = [
  ['lock', 'Locked until a parent says yes', 'No password, no login and no survey before consent.'],
  ['shield', 'Age-appropriate topics only', 'Never alcohol, gambling, dating or adult topics. Health topics need a separate yes.'],
  ['user', 'No school, address or photos', 'We never ask for them and do not track location.'],
  ['gift', 'The parent chooses the payout', 'Teens collect points; the parent or guardian decides how rewards are paid.'],
  ['globe', 'Local rules by country', 'Research with young people follows each country’s rules.'],
  ['heart', 'Stop any time', 'A parent can withdraw consent and a teen can stop whenever they like.'],
];
export function TeenPanel829({ p, withCss }) {
  const T = TEEN[p.slug];
  const k = p.slug === 'turn2opinion' ? 't2o' : 'mfr';
  const ref = ee.useRef(null);
  const [on, setOn] = ee.useState(false);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setOn(true);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (setOn(true), io.disconnect())), { rootMargin: '0px 0px -15% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!T) return null;
  return (
    <section ref={ref} className={'tn9 tn9--' + k + (on ? ' is-on' : '')} id={k + '-teen'} aria-labelledby={k + '-teen-h'}>
      {withCss ? <style data-fr-own="">{css}</style> : null}
      <div className="tn9__bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container">
        <header className="tn9__head">
          <span className="tn9__kick"><I9 n="teen" s={15} /> New · Teen panel · ages 13 to 17</span>
          <h2 id={k + '-teen-h'}>{k === 't2o' ? <>Teens have opinions too. <em>Now they count.</em></> : <>Big opinions. <em>Safe space.</em> Real rewards.</>}</h2>
          <p>
            {p.name} now welcomes teens aged 13 to 17, with a parent or legal guardian’s permission. Under 13 cannot join; from 18 the normal
            consumer or professional sign-up applies. Teens share short, age-appropriate opinions on the things they use every day.
          </p>
          <ul className="tn9__topics" aria-label="What teen studies are about">
            {[['game', 'Games'], ['music', 'Music'], ['phone', 'Phones & apps'], ['book', 'Study apps'], ['spark', 'Snacks & trainers'], ['users', 'Creators & sport']].map(([ic, t], i) => (
              <li key={t} style={{ '--i': i }}><I9 n={ic} s={16} />{t}</li>
            ))}
          </ul>
        </header>
        <ol className="tn9-steps">
          <i className="tn9-steps__track" aria-hidden="true"><b /></i>
          {STEPS.map(([ic, t, d], i) => (
            <li key={t} style={{ '--i': i }}>
              <span className="tn9-steps__n"><I9 n={ic} s={20} /><small>{i + 1}</small></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <div className="tn9-safe">
          <h3 className="tn9-safe__h">Extra protection on every teen account</h3>
          <ul>
            {SAFE.map(([ic, t, d], i) => (
              <li key={t} style={{ '--i': i }}><span><I9 n={ic} s={18} /></span><b>{t}</b><small>{d}</small></li>
            ))}
          </ul>
        </div>
        <p className="tn9__cta">
          <a className="tn9__btn" href={T.url} target="_blank" rel="noopener noreferrer">Join the {T.name} <I9 n="arrow" s={16} /><span className="sr-only"> (opens in a new tab)</span></a>
          <span>Parents: the invitation email explains everything before you decide.</span>
        </p>
      </div>
    </section>
  );
}
