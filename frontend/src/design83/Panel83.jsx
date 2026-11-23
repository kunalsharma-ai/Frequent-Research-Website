/*
 * Build 83: Consumers, Professionals and Teens as three equal ways to take part (Turn2Opinion, MyFrequentRewards,
 * the Portals page and the market research service pages). Facts and their sources: ./panel83-data.js.
 * Information only: every join button goes to the existing panel or teen page; no registration screen is built.
 *
 * CSS lives in panel83.css and is put on the page by <Panel83Css/> (once per page) or by Takepart83 itself, with
 * data-fr-own so the first-screen copy does not repeat it. Only transform / opacity animate; reduced motion stops them.
 */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import css from './panel83.css?inline';
import {
  CATS, TEEN_URL, TEEN_NAME, TEEN_WHY, TEEN_REQ, TEEN_JOURNEY, TEEN_IF, CONSENT, DUTIES, TEEN_PRIVACY,
  TEEN_REWARDS, QUALITY, COMPARE, TAKE, faqTabs,
} from './panel83-data.js';

const IC = {
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0',
  users: 'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3 6',
  brief: 'M4 8h16v11H4zM9 8V5h6v3M4 13h16',
  teen: 'M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-6 9a6 6 0 0 1 12 0M17 4l2-2M19 7h2',
  check: 'M5 12.5l4.5 4.5L19 7',
  mail: 'M3 6h18v12H3zM3 7l9 7 9-7',
  clipboard: 'M8 4h8v3H8zM6 5H5v16h14V5h-1M8 12h8M8 16h5',
  book: 'M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5',
  hand: 'M8 11V5a1.5 1.5 0 0 1 3 0v5M11 10V4a1.5 1.5 0 0 1 3 0v6M14 10V5.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7 6 6 0 0 1-5-3l-2-4a1.5 1.5 0 0 1 2.5-1.5L8 15',
  lock: 'M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3',
  key: 'M14 10a4 4 0 1 0-1.2 2.8L20 20M17 17l2-2',
  spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6',
  star: 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  heart: 'M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z',
  gift: 'M4 10h16v10H4zM2 7h20v3H2zM12 7v13M12 7c-2-4-6-3-5 0M12 7c2-4 6-3 5 0',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM20 20l-4-4',
  x: 'M6 6l12 12M18 6 6 18',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  steth: 'M6 3v6a4 4 0 0 0 8 0V3M10 13v3a4 4 0 0 0 8 0v-2M18 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z',
};
export function I3({ n, s = 18 }) {
  return (
    <svg className="k3-ic" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={IC[n] || IC.check} />
    </svg>
  );
}
export function Panel83Css() {
  return <style data-fr-own="">{css}</style>;
}
/* adds .is-on once the element scrolls into view (reveal animations) */
function useOn() {
  const ref = ee.useRef(null);
  const [on, setOn] = ee.useState(false);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return setOn(true);
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (setOn(true), io.disconnect())), { rootMargin: '0px 0px -12% 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, on];
}
const Ext = ({ href, className, children }) => (
  <a className={className} href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);
const kOf = (p) => (p.slug === 'turn2opinion' ? 't2o' : p.slug === 'myfrequentrewards' ? 'mfr' : 'fr');

/* simple accessible tabs; every panel stays in the page (hidden), so search engines and AI readers see all of it */
function Tabs({ id, tabs, cls = '' }) {
  const [cur, setCur] = ee.useState(tabs[0][0]);
  const list = ee.useRef(null);
  const key = (e, i) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (i + d + tabs.length) % tabs.length;
    setCur(tabs[n][0]);
    const b = list.current && list.current.querySelectorAll('[role=tab]')[n];
    b && b.focus();
  };
  return (
    <div className={'k3-tabs ' + cls}>
      <div className="k3-tabs__list" role="tablist" ref={list}>
        {tabs.map(([k, t], i) => (
          <button key={k} type="button" role="tab" id={id + '-t-' + k} aria-controls={id + '-p-' + k} aria-selected={cur === k} tabIndex={cur === k ? 0 : -1} className={cur === k ? 'is-on' : ''} onClick={() => setCur(k)} onKeyDown={(e) => key(e, i)}>
            {t}
          </button>
        ))}
      </div>
      {tabs.map(([k, , body]) => (
        <div key={k} role="tabpanel" id={id + '-p-' + k} aria-labelledby={id + '-t-' + k} hidden={cur !== k} className="k3-tabs__panel">
          {body}
        </div>
      ))}
    </div>
  );
}

/* ================= 1. Three equal ways to take part ================= */
export function Trio83({ p, title, intro }) {
  const k = kOf(p);
  const [ref, on] = useOn();
  const teen = TEEN_URL[p.slug];
  const join = p.joinUrl || p.url;
  return (
    <section ref={ref} className={'k3 k3-trio' + (on ? ' is-on' : '')} id={k + '-ways'} aria-labelledby={k + '-ways-h'}>
      <div className="container">
        <header className="k3-head">
          <span className="k3-kick">Three ways to take part</span>
          <h2 id={k + '-ways-h'}>{title || <>Consumers. Professionals. Teens. <em>Equal voices.</em></>}</h2>
          <p>{intro || `${p.name} is one research community with three equal groups. Each has its own sign-up route, rules and protections, and every member goes through the same quality process.`}</p>
        </header>
        <div className="k3-trio__grid">
          {CATS.map((c, i) => (
            <article key={c.k} className={'k3-cat k3-cat--' + c.k} style={{ '--i': i }}>
              <div className="k3-cat__top">
                <span className="k3-cat__ic"><I3 n={c.ic} s={24} /></span>
                <div>
                  <h3>{c.t}</h3>
                  <span className="k3-cat__age">{c.age}</span>
                </div>
              </div>
              <p className="k3-cat__lead">{c.lead}</p>
              <h4>What you need</h4>
              <ul className="k3-ticks">{c.need.map((x) => <li key={x}><I3 n="check" s={15} />{x}</li>)}</ul>
              <h4>Studies about</h4>
              <ul className="k3-chips">{c.studies.map((x) => <li key={x}>{x}</li>)}</ul>
              <p className="k3-cat__rw"><I3 n="gift" s={16} />{c.reward}</p>
              <div className="k3-cat__go">
                {k === 'fr' ? (
                  <>
                    <Link className={'k3-btn k3-btn--' + c.k} to={'/portals/turn2opinion#t2o-' + (c.k === 'teen' ? 'teen' : 'ways')}>Turn2Opinion <I3 n="arrow" s={15} /></Link>
                    <Link className="k3-link" to={'/portals/myfrequentrewards#mfr-' + (c.k === 'teen' ? 'teen' : 'ways')}>MyFrequentRewards</Link>
                  </>
                ) : c.k === 'teen' ? (
                  <>
                    {teen ? <Ext className="k3-btn k3-btn--teen" href={teen}>Go to the teen page <I3 n="arrow" s={15} /></Ext> : null}
                    {k !== 'fr' ? <a className="k3-link" href={'#' + k + '-teen'}>See the 12 steps</a> : null}
                  </>
                ) : join ? (
                  <Ext className={'k3-btn k3-btn--' + c.k} href={join}>{c.k === 'pro' ? 'Join as a professional' : 'Join as a consumer'} <I3 n="arrow" s={15} /></Ext>
                ) : null}
              </div>
            </article>
          ))}
        </div>
        <p className="k3-foot">Not everyone qualifies for every study: invitations depend on your profile, each study’s screening rules and quotas.</p>
      </div>
    </section>
  );
}

/* ================= 2. The complete Teen panel guide ================= */
function TeenReq() {
  return (
    <div className="k3-req">
      {TEEN_REQ.map((r) => (
        <div className="k3-req__c" key={r.who}>
          <h4><I3 n={r.ic} s={18} />{r.who}</h4>
          <p className="k3-req__lbl">Required</p>
          <ul className="k3-ticks">{r.must.map((x) => <li key={x}><I3 n="check" s={15} />{x}</li>)}</ul>
          <p className="k3-req__lbl k3-req__lbl--opt">Optional</p>
          <ul className="k3-ticks k3-ticks--opt">{r.opt.map((x) => <li key={x}><I3 n="spark" s={15} />{x}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
function TeenIf() {
  return (
    <dl className="k3-if">
      {TEEN_IF.map(([t, d]) => (
        <div key={t}><dt>{t}</dt><dd>{d}</dd></div>
      ))}
    </dl>
  );
}
function TeenPriv() {
  return (
    <div className="k3-priv">
      <div><h4><I3 n="lock" s={18} />What may be kept</h4><ul className="k3-ticks">{TEEN_PRIVACY.kept.map((x) => <li key={x}><I3 n="check" s={15} />{x}</li>)}</ul></div>
      <div><h4><I3 n="shield" s={18} />Never asked for</h4><ul className="k3-ticks k3-ticks--no">{TEEN_PRIVACY.never.map((x) => <li key={x}><I3 n="x" s={15} />{x}</li>)}</ul></div>
      <p className="k3-priv__note">{TEEN_PRIVACY.note}</p>
    </div>
  );
}
function TeenRw() {
  return <ul className="k3-ticks k3-rw">{TEEN_REWARDS.map((x) => <li key={x}><I3 n="gift" s={15} />{x}</li>)}</ul>;
}
export function TeenGuide83({ p }) {
  const k = kOf(p);
  const [ref, on] = useOn();
  const url = TEEN_URL[p.slug];
  if (!url) return null;
  return (
    <section ref={ref} className={'k3 k3-teen k3-teen--' + k + (on ? ' is-on' : '')} id={k + '-teen'} aria-labelledby={k + '-teen-h'}>
      <div className="k3-teen__bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container">
        <header className="k3-head k3-head--light">
          <span className="k3-kick"><I3 n="teen" s={15} /> Teen panel · ages 13 to 17</span>
          <h2 id={k + '-teen-h'}>{k === 't2o' ? <>Teens have opinions too. <em>Now they count.</em></> : <>Big opinions. <em>Safe space.</em> Real rewards.</>}</h2>
          <p>
            The {TEEN_NAME[p.slug]} is for teens aged 13 to 17. A parent or legal guardian gives permission first, it is verified from their own
            email, and the teen gives their own yes. Until then the account stays locked: no password, no login and no surveys.
          </p>
        </header>
        <ul className="k3-why">
          {TEEN_WHY.map(([ic, t, d], i) => (
            <li key={t} style={{ '--i': i }}><span><I3 n={ic} s={20} /></span><b>{t}</b><small>{d}</small></li>
          ))}
        </ul>
        <h3 className="k3-teen__sub">The registration journey, in 12 steps</h3>
        <ol className="k3-jr">
          {TEEN_JOURNEY.map(([ic, who, t, d], i) => (
            <li key={t} style={{ '--i': i }} className={'k3-jr--' + (who === 'Parent' ? 'par' : who === 'Teen' ? 'teen' : 'fr')}>
              <span className="k3-jr__n"><I3 n={ic} s={18} /><small>{i + 1}</small></span>
              <div>
                <em>{who}</em>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
        <Tabs
          id={k + '-tg'}
          cls="k3-tabs--dark"
          tabs={[
            ['req', 'What is required', <TeenReq key="r" />],
            ['if', 'If it does not complete', <TeenIf key="i" />],
            ['priv', 'Privacy', <TeenPriv key="p" />],
            ['rw', 'Rewards', <TeenRw key="w" />],
          ]}
        />
        <p className="k3-teen__cta">
          <Ext className="k3-btn k3-btn--teen" href={url}>Go to the {TEEN_NAME[p.slug]} <I3 n="arrow" s={16} /></Ext>
          <span>The teen starts the sign-up there. Parents: the invitation email explains everything before you decide.</span>
        </p>
      </div>
    </section>
  );
}

/* ================= 3. Consent and responsibilities ================= */
export function Consent83({ p }) {
  const k = kOf(p);
  const [ref, on] = useOn();
  return (
    <section ref={ref} className={'k3 k3-consent' + (on ? ' is-on' : '')} id={k + '-consent'} aria-labelledby={k + '-consent-h'}>
      <div className="container">
        <header className="k3-head">
          <span className="k3-kick">Consent and responsibilities</span>
          <h2 id={k + '-consent-h'}>Who agrees to what, and when</h2>
          <p>Consent is personal. Nobody can agree for another adult, and one parent’s permission covers only the teen named in that registration.</p>
        </header>
        <div className="k3-consent__grid">
          {CONSENT.map((c, i) => (
            <div key={c.k} className={'k3-cs k3-cs--' + c.k} style={{ '--i': i }}>
              <h3><span><I3 n={c.ic} s={20} /></span>{c.t}</h3>
              <ul className="k3-ticks">{c.pts.map((x) => <li key={x}><I3 n="check" s={15} />{x}</li>)}</ul>
            </div>
          ))}
        </div>
        <h3 className="k3-duty__h">What every member agrees to do</h3>
        <ul className="k3-duty">
          {DUTIES.map(([t, d], i) => (
            <li key={t} style={{ '--i': i }}><b>{t}</b><span>{d}</span></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================= 4. Quality assurance, visible ================= */
function QRow() {
  return (
    <ol className="k3-q__row">
      {QUALITY.map(([ic, t, d, teen], i) => (
        <li key={t} style={{ '--i': i }}>
          <span className="k3-q__n"><I3 n={ic} s={20} /><small>{i + 1}</small></span>
          <h3>{t}</h3>
          <p>{d}</p>
          <p className="k3-q__teen"><I3 n="teen" s={14} />{teen}</p>
        </li>
      ))}
    </ol>
  );
}
export function Quality83({ p, id, bare }) {
  const k = kOf(p);
  const [ref, on] = useOn();
  if (bare) return <div ref={ref} className={'k3 k3-qbare' + (on ? ' is-on' : '')}><QRow /></div>;
  return (
    <section ref={ref} className={'k3 k3-q' + (on ? ' is-on' : '')} id={id || k + '-qa'} aria-labelledby={k + '-qa-h'}>
      <div className="container">
        <header className="k3-head">
          <span className="k3-kick">Quality assurance</span>
          <h2 id={k + '-qa-h'}>Six checks, for every member</h2>
          <p>The same quality process runs for consumers, professionals and teens. Teens get extra protection at each stage.</p>
        </header>
        <QRow />
      </div>
    </section>
  );
}

/* ================= 5. Turn2Opinion or MyFrequentRewards? ================= */
export function Compare83({ p }) {
  const k = kOf(p);
  const cur = p && p.slug;
  return (
    <section className="k3 k3-cmp" id={k + '-compare'} aria-labelledby={k + '-cmp-h'}>
      <div className="container">
        <header className="k3-head">
          <span className="k3-kick">Two panels, three groups each</span>
          <h2 id={k + '-cmp-h'}>Turn2Opinion or MyFrequentRewards?</h2>
          <p>Both welcome consumers, professionals and teens, and both are run by Frequent Research. Healthcare professionals, patients and caregivers join <Link to="/portals/myhealthopinions">MyHealthOpinions</Link>, which has no teen panel.</p>
        </header>
        <div className="k3-cmp__wrap">
          <table className="k3-cmp__t">
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Topic</span></th>
                <th scope="col" className={cur === 'turn2opinion' ? 'is-cur' : ''}><Link to="/portals/turn2opinion">Turn2Opinion</Link></th>
                <th scope="col" className={cur === 'myfrequentrewards' ? 'is-cur' : ''}><Link to="/portals/myfrequentrewards">MyFrequentRewards</Link></th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([t, a, b]) => (
                <tr key={t}>
                  <th scope="row">{t}</th>
                  <td className={cur === 'turn2opinion' ? 'is-cur' : ''}>{a}</td>
                  <td className={cur === 'myfrequentrewards' ? 'is-cur' : ''}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ================= 6. FAQ in six tabs ================= */
export function faqAll(p, general) {
  return faqTabs(p, general).flatMap(([, , items]) => items);
}
export function Faq83({ p, Faq, after, general }) {
  const k = kOf(p);
  return (
    <section className="section section--tint k3-faq" id={k + '-faq'}>
      <div className="container">
        <header className="k3-head">
          <span className="k3-kick">Questions and answers</span>
          <h2>{p.name} FAQ</h2>
          <p>For consumers, professionals, teens and parents. Pick a topic.</p>
        </header>
        <Tabs id={k + '-fq'} tabs={faqTabs(p, general).map(([key, t, items]) => [key, t, <Faq key={key} items={items} />])} />
        {after}
      </div>
    </section>
  );
}

/* ================= 7. Market research service pages: who takes part ================= */
const SVC_PANEL = {
  consumer: [['Turn2Opinion', '/portals/turn2opinion'], ['MyFrequentRewards', '/portals/myfrequentrewards']],
  pro: [['Turn2Opinion', '/portals/turn2opinion'], ['MyFrequentRewards', '/portals/myfrequentrewards'], ['Business panel', '/services/market-research/business-panel']],
  teen: [['Turn2Opinion Teen panel', '/portals/turn2opinion#t2o-teen'], ['MyFrequentRewards Teens', '/portals/myfrequentrewards#mfr-teen']],
};
export function Takepart83({ kind }) {
  const T = TAKE[kind];
  const [ref, on] = useOn();
  if (!T) return null;
  const cats = T.health
    ? [{ k: 'hcp', ic: 'steth', t: 'Healthcare professionals', age: 'Physicians, nurses, pharmacists', lead: 'Verified healthcare professionals.' }, { k: 'consumer', ic: 'heart', t: 'Patients and caregivers', age: 'Adults 18+', lead: 'People sharing their experience of care.' }]
    : CATS.filter((c) => !T.only || T.only.includes(c.k));
  return (
    <section ref={ref} className={'k3 k3-take' + (on ? ' is-on' : '')} aria-labelledby={'k3-take-' + kind}>
      <style data-fr-own="">{css}</style>
      <div className="container">
        <header className="k3-head">
          <span className="k3-kick">{T.k}</span>
          <h2 id={'k3-take-' + kind}>{T.h}</h2>
        </header>
        <div className={'k3-take__grid k3-take__grid--' + cats.length}>
          {cats.map((c, i) => (
            <div key={c.k + i} className={'k3-cat k3-cat--' + c.k + ' k3-cat--mini'} style={{ '--i': i }}>
              <div className="k3-cat__top">
                <span className="k3-cat__ic"><I3 n={c.ic} s={22} /></span>
                <div><h3>{c.t}</h3><span className="k3-cat__age">{c.age}</span></div>
              </div>
              <p className="k3-cat__lead">{c.lead}</p>
              <p className="k3-take__from">
                {'From: '}
                {(T.health ? [['MyHealthOpinions', '/portals/myhealthopinions']] : SVC_PANEL[c.k] || []).map(([t, to], n) => (
                  <ee.Fragment key={to}>{n ? ' · ' : ''}<Link to={to}>{t}</Link></ee.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
        <p className="k3-take__note"><I3 n="shield" s={16} />{T.note} Participation always depends on each study’s screening.</p>
        <p className="k3-take__cta"><Link className="k3-btn k3-btn--consumer" to="/lets-talk?type=audience">Request audience feasibility <I3 n="arrow" s={15} /></Link> <Link className="k3-link" to="/portals">How our panels work</Link></p>
      </div>
    </section>
  );
}
