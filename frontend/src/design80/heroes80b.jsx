/*
 * Build 80 centre pieces, set 2 (marketing and web pieces, also used by IT and Finance pages). Styles: k80b.css (.h80-*).
 */
import * as ee from 'react';
import { Fl, n_ } from './kit80.jsx';

/* search results: our page climbs from #7 to #1 */
function Serp({ q, rows, me }) {
  return (
    <div className="h80-serp">
      <p className="h80-serp__q"><span>⌕</span>{q}</p>
      <div className="h80-serp__list">
        {rows.map((t, i) => <div key={i} className="h80-serp__r" style={{ "--i": i }}><i /><p><b>{t}</b><span /></p></div>)}
        <div className="h80-serp__r is-me"><em className="h80-serp__pos"><b>#7</b><b>#3</b><b>#1</b></em><p><b>{me}</b><span /></p></div>
      </div>
    </div>
  );
}

/* a search ad gets shown, clicked, and the cost per click drops */
function Ads({ q, title, url, kws }) {
  return (
    <div className="h80-ads">
      <p className="h80-serp__q"><span>⌕</span>{q}</p>
      <div className="h80-ads__ad">
        <p className="h80-ads__sp"><b>Sponsored</b> · {url}</p>
        <p className="h80-ads__t">{title}</p>
        <p className="h80-ads__d">Free quote in 24 hours · Trusted by 2,000+ brands</p>
        <p className="h80-ads__btns"><span>Call now</span><span>Get offer</span></p>
        <i className="h80-ads__tap" />
      </div>
      <div className="h80-ads__kws">{kws.map(([k, c], i) => <p key={k} style={{ "--i": i }}><span>{k}</span><b>{c}</b></p>)}</div>
    </div>
  );
}

/* a funnel: dots fall through each stage, fewer but better at every step */
function Funnel({ steps }) {
  return (
    <div className="h80-fun">
      {steps.map(([t, v], i) => (
        <div key={t} className="h80-fun__s" style={{ "--i": i, "--w": 100 - i * 18 + "%" }}><span>{t}</span><b>{v}</b></div>
      ))}
      {n_(10).map((i) => <i key={i} className="h80-fun__d" style={{ "--i": i, "--x": ((i * 37) % 60) - 30 + "px" }} />)}
    </div>
  );
}

/* a rocket lifts off as returns climb */
function Rocket({ meter }) {
  return (
    <div className="h80-rkt">
      <svg className="h80-rkt__trail" viewBox="0 0 100 100" preserveAspectRatio="none"><path pathLength="1" d="M8 96 C 30 92, 50 70, 62 40 S 80 10, 92 4" /></svg>
      <div className="h80-rkt__ship">
        <i className="h80-rkt__body" /><i className="h80-rkt__fire" />
      </div>
      <p className="h80-rkt__m"><small>{meter[0]}</small><b><span>1.2x</span><span>2.6x</span><span>{meter[1]}</span></b></p>
      {n_(8).map((i) => <i key={i} className="h80-rkt__puff" style={{ "--i": i }} />)}
    </div>
  );
}

/* an envelope opens, the letter rises, and opens are counted */
function Mail({ subject, from }) {
  return (
    <div className="h80-mail">
      {n_(4).map((i) => <i key={i} className="h80-mail__fly" style={{ "--i": i }} />)}
      <div className="h80-mail__env">
        <div className="h80-mail__letter">
          <p className="h80-mail__from"><b>{from}</b><span>now</span></p>
          <p className="h80-mail__sub">{subject}</p>
          <i /><i /><i />
          <p className="h80-mail__cta">Shop the sale →</p>
        </div>
        <i className="h80-mail__front" /><i className="h80-mail__flap" />
      </div>
    </div>
  );
}

/* phone chat (WhatsApp style): an offer goes out, the customer replies and buys */
function Chat({ name, msgs }) {
  return (
    <div className="h80-phone h80-chat">
      <div className="h80-phone__scr">
        <p className="h80-chat__top"><b className="h80-av" style={{ "--h": 140 }} /><span><b>{name}</b><small>online</small></span></p>
        <div className="h80-chat__body">
          {msgs.map(([who, t], i) => <p key={i} className={"h80-chat__m h80-chat__m--" + who} style={{ "--i": i }}>{t}{who === "me" ? <em>✓✓</em> : null}</p>)}
        </div>
      </div>
    </div>
  );
}

/* reviews come in; the star score climbs */
function Stars({ reviews, from, to }) {
  return (
    <div className="h80-stars">
      <div className="h80-stars__score"><b><span>{from}</span><span>{to}</span></b><p>{n_(5).map((i) => <i key={i} style={{ "--i": i }}>★</i>)}</p><small>Google · 1,284 reviews</small></div>
      <div className="h80-stars__list">
        {reviews.map(([n, s, t], i) => (
          <div key={i} className="h80-stars__r" style={{ "--i": i }}>
            <b className="h80-av" style={{ "--h": i * 70 }} />
            <p><b>{n} <em>{"★".repeat(s)}</em></b><span>{t}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* a video plays: the bar runs, views count up, likes pop */
function Video({ title, chapters }) {
  return (
    <div className="h80-vid">
      <div className="h80-vid__scr">
        <i className="h80-vid__sky" /><i className="h80-vid__sun" /><i className="h80-vid__hill" /><i className="h80-vid__hill h80-vid__hill--2" />
        <i className="h80-vid__play" />
        <p className="h80-vid__t">{title}</p>
        <p className="h80-vid__bar"><i /></p>
      </div>
      <div className="h80-vid__ch">{chapters.map((t, i) => <p key={t} style={{ "--i": i }}><i style={{ "--h": 300 + i * 40 }} />{t}</p>)}</div>
    </div>
  );
}

/* creators: three profile cards, each one posts and its numbers jump */
function Creators({ people }) {
  return (
    <div className="h80-cre">
      {people.map(([n, h, f, c], i) => (
        <div key={n} className="h80-cre__c" style={{ "--i": i, "--h": 300 + i * 50 }}>
          <b className="h80-av h80-av--lg h80-cre__ring" style={{ "--h": 300 + i * 50 }}><Fl c={c} /></b>
          <p className="h80-cre__n">{n}<span>{h}</span></p>
          <i className="h80-cre__post" />
          <p className="h80-cre__f"><b>{f}</b> followers</p>
          <em className="h80-cre__like">♥ +2.1k</em>
        </div>
      ))}
    </div>
  );
}

/* A/B test: two versions of a page side by side; B wins and gets the crown */
function Ab({ a, b }) {
  return (
    <div className="h80-ab">
      {[["A", a, 0.42], ["B", b, 0.86]].map(([k, t, v], i) => (
        <div key={k} className={"h80-ab__p h80-ab__p--" + k} style={{ "--v": v, "--i": i }}>
          <p className="h80-ab__k">Version {k}</p>
          <i className="h80-ab__hero" /><p className="h80-ab__h">{t}</p><i className="h80-ab__l" /><i className="h80-ab__l h80-ab__l--s" />
          <p className="h80-ab__btn">{k === "B" ? "Start free →" : "Submit"}</p>
          <p className="h80-ab__cr"><span>Conversion</span><i><b /></i><em>{k === "B" ? "8.6%" : "4.2%"}</em></p>
          {k === "B" ? <em className="h80-ab__win">★ Winner</em> : null}
        </div>
      ))}
    </div>
  );
}

/* a shop: the product drops into the cart, the cart count climbs, orders roll in */
function Cart({ items }) {
  return (
    <div className="h80-cart">
      <div className="h80-cart__grid">
        {items.map(([t, p, h], i) => (
          <div key={t} className="h80-cart__p" style={{ "--i": i, "--h": h }}>
            <i className="h80-cart__img" /><p><b>{t}</b><span>{p}</span></p><span className="h80-cart__add">+ Add</span>
          </div>
        ))}
      </div>
      <i className="h80-cart__fly" />
      <div className="h80-cart__bag"><svg viewBox="0 0 24 24"><path d="M5 8h14l-1.4 11.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 8zM9 8V6a3 3 0 0 1 6 0v2" /></svg><b><span>2</span><span>3</span><span>4</span></b></div>
    </div>
  );
}

/* automation: a trigger fires and a token runs along the journey, branch by branch */
function Flow({ nodes }) {
  return (
    <div className="h80-flow">
      <svg className="h80-flow__w" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M50 8 V30 M50 30 V52 M50 52 C50 62, 22 62, 22 74 M50 52 C50 62, 78 62, 78 74" pathLength="1" />
      </svg>
      {nodes.map(([t, k], i) => (
        <p key={t} className={"h80-flow__n h80-flow__n--" + i} style={{ "--i": i }}><b>{k}</b>{t}</p>
      ))}
      <i className="h80-flow__tok" /><i className="h80-flow__tok h80-flow__tok--2" />
    </div>
  );
}

/* lead magnet: the magnet pulls visitors in, they become named leads in the list */
function Magnet({ leads }) {
  return (
    <div className="h80-mag">
      <div className="h80-mag__m"><i /></div>
      {n_(6).map((i) => <i key={i} className="h80-mag__dot" style={{ "--i": i, "--y": (i % 3) * 12 - 12 + "cqh" }} />)}
      <div className="h80-mag__list">
        {leads.map(([n, t, s], i) => (
          <p key={n} className="h80-mag__l" style={{ "--i": i }}><b className="h80-av" style={{ "--h": 20 + i * 60 }} /><span><b>{n}</b><small>{t}</small></span><em>{s}</em></p>
        ))}
      </div>
    </div>
  );
}

/* dashboard: KPI tiles count, a line draws, a donut fills */
function Dash({ kpis, title }) {
  return (
    <div className="h80-dash">
      <p className="h80-dash__h"><b>{title}</b><span><i className="c80-live" /> Live</span></p>
      <div className="h80-dash__k">{kpis.map(([t, v, d], i) => <p key={t} style={{ "--i": i }}><small>{t}</small><b>{v}</b><em>{d}</em></p>)}</div>
      <div className="h80-dash__row">
        <svg className="h80-dash__line" viewBox="0 0 200 80" preserveAspectRatio="none">
          <path className="is-area" d="M0 70 L25 62 L50 66 L75 48 L100 52 L125 34 L150 38 L175 18 L200 10 V80 H0 Z" />
          <path pathLength="1" d="M0 70 L25 62 L50 66 L75 48 L100 52 L125 34 L150 38 L175 18 L200 10" />
        </svg>
        <div className="h80-dash__donut"><svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="14" pathLength="100" /><circle className="is-on" cx="18" cy="18" r="14" pathLength="100" /></svg><b>72%</b></div>
      </div>
    </div>
  );
}

/* audit: a beam scans a website, problems get flagged, then fixed, and the score jumps */
function Scan({ issues, from, to }) {
  return (
    <div className="h80-scan">
      <div className="h80-scan__site">
        <p className="h80-form__bar"><i /><i /><i /><span>yourbrand.com</span></p>
        <i className="h80-scan__hero" /><i className="h80-scan__l" /><i className="h80-scan__l h80-scan__l--s" />
        <div className="h80-scan__cards"><i /><i /><i /></div>
        <i className="h80-scan__beam" />
        {issues.map(([t, x, y], i) => <em key={t} className="h80-scan__flag" style={{ "--x": x + "%", "--y": y + "%", "--i": i }}><b>!</b><b>✓</b><span>{t}</span></em>)}
      </div>
      <p className="h80-scan__score"><small>Health score</small><b><span>{from}</span><span>{to}</span></b></p>
    </div>
  );
}

/* strategy board: pieces move on a board, the winning move is marked */
function Chess({ moves }) {
  return (
    <div className="h80-chess">
      <div className="h80-chess__b">
        {n_(36).map((i) => <i key={i} className={(Math.floor(i / 6) + i) % 2 ? "is-d" : ""} />)}
        <b className="h80-chess__p h80-chess__p--k">♞</b><b className="h80-chess__p h80-chess__p--q">♛</b><b className="h80-chess__p h80-chess__p--x">♚</b>
        <i className="h80-chess__mark" />
      </div>
      <div className="h80-chess__moves">{moves.map((t, i) => <p key={t} style={{ "--i": i }}><b>{i + 1}</b>{t}</p>)}</div>
    </div>
  );
}

/* board: cards move from column to column until they are done */
function Kanban({ cols, cards }) {
  return (
    <div className="h80-kb">
      {cols.map((c, i) => <div key={c} className="h80-kb__col" style={{ "--i": i }}><p>{c}</p></div>)}
      {cards.map(([t, tag], i) => (
        <div key={t} className="h80-kb__card" style={{ "--i": i }}><span className="h80-kb__tag">{tag}</span><b>{t}</b><i className="h80-av" style={{ "--h": i * 80 }} /></div>
      ))}
    </div>
  );
}

/* social ad on a phone: the ad shows, "Shop now" is tapped, the audience rings fill */
function AdPhone({ brand, offer, aud }) {
  return (
    <div className="h80-adp">
      {aud.map((t, i) => <span key={t} className="h80-adp__aud" style={{ "--i": i, "--a": i * (360 / aud.length) + "deg" }}>{t}</span>)}
      <div className="h80-phone">
        <div className="h80-phone__scr h80-adp__scr">
          <p className="h80-adp__top"><b className="h80-av" style={{ "--h": 320 }} /><span><b>{brand}</b><small>Sponsored</small></span></p>
          <div className="h80-adp__img"><b>{offer}</b></div>
          <p className="h80-adp__btn"><span>Shop now</span><i>›</i></p>
          <p className="h80-adp__meta">♥ 4.2k · 318 comments</p>
          <i className="h80-adp__tap" />
        </div>
      </div>
    </div>
  );
}

/* bullseye: target accounts are picked, hit, and land in the pipeline */
function Target({ accounts }) {
  return (
    <div className="h80-tgt">
      <div className="h80-tgt__b"><i /><i /><i /><i /></div>
      {accounts.map(([t, s], i) => (
        <p key={t} className="h80-tgt__a" style={{ "--a": i * (360 / accounts.length) + "deg", "--i": i }}><b>{t}</b><small>{s}</small></p>
      ))}
      {n_(3).map((i) => <i key={i} className="h80-tgt__dart" style={{ "--i": i }} />)}
    </div>
  );
}

export const HEROES_B = { serp: Serp, ads: Ads, funnel: Funnel, rocket: Rocket, mail: Mail, chat: Chat, stars: Stars, video: Video, creators: Creators, ab: Ab, cart: Cart, flow: Flow, magnet: Magnet, dash: Dash, scan: Scan, chess: Chess, kanban: Kanban, adphone: AdPhone, target: Target };
export { ee };
