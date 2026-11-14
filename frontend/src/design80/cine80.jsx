/*
 * Build 80 (Kunal, 11 Nov: "remove all previous hero animations … new unique and attractive approach … each animation
 * should tell a story about their service"): full-screen moving scenes. The scene fills the hero behind the words
 * (not a picture in a box), and plays the service as a short story that loops. Styles: c80.css (.c80-*).
 * CSS and SVG only; every movement is transform / opacity so phones stay smooth.
 */
import * as ee from 'react';
import FLAGS from '../assets/images/flags/flags-sprite.json';
import { makeScene } from './kit80.jsx';
import { HEROES as H1 } from './heroes80.jsx';
import { HEROES_B } from './heroes80b.jsx';
import { HEROES_C } from './heroes80c.jsx';
import { HEROES_D } from './heroes80d.jsx';
const HEROES = { ...H1, ...HEROES_B, ...HEROES_C, ...HEROES_D };
import { SPECS } from './specs80.js';

const n_ = (k) => Array.from({ length: k }, (_, i) => i);
function Fl({ c }) {
  const i = FLAGS.order.indexOf(c);
  return i < 0 ? null : <i className="s79-flag" style={{ "--fx": i % FLAGS.cols, "--fy": Math.floor(i / FLAGS.cols) }} />;
}

/* ------------------------------------------------------------------ Consumer Panel
   Story: people all over the world → each one answers → the quotas fill → the sample is ready. */
function Panel() {
  const ppl = [["IN", "Priya, 29"], ["US", "Jake, 41"], ["GB", "Amelia, 35"], ["DE", "Lukas, 26"], ["JP", "Yuki, 33"], ["BR", "Ana, 38"], ["AE", "Omar, 44"], ["AU", "Mia, 22"]];
  return (
    <div className="c80 c80--panel">
      <i className="c80-panel__stars" />
      <div className="c80-panel__globe"><i className="c80-panel__land" /><i className="c80-panel__shine" /></div>
      <div className="c80-panel__orbit">
        {ppl.map(([c, t], i) => (
          <span key={c} className="c80-panel__seat" style={{ "--a": i * 45 + "deg", "--i": i }}>
            <span className="c80-panel__face">
              <b className="c80-panel__av" style={{ "--h": i * 45 }}><Fl c={c} /></b>
              <small>{t}</small>
            </span>
          </span>
        ))}
      </div>
      {n_(6).map((i) => <i key={i} className="c80-panel__ans" style={{ "--i": i }} />)}
      <div className="c80-card c80-panel__q">
        <p className="c80-card__h"><span className="c80-live" /> Live survey · 55+ markets</p>
        <p className="c80-panel__qt">How often do you shop online?</p>
        {[["Daily", 0.34], ["Weekly", 0.46], ["Monthly", 0.15], ["Rarely", 0.05]].map(([t, v], i) => (
          <p key={t} className="c80-panel__opt" style={{ "--v": v, "--i": i }}><span>{t}</span><i><b /></i><em>{Math.round(v * 100)}%</em></p>
        ))}
        <p className="c80-panel__n"><b><span>12,480</span><span>12,516</span><span>12,571</span><span>12,603</span></b> verified answers</p>
      </div>
      <div className="c80-card c80-panel__quota">
        <p className="c80-card__h">Quotas</p>
        {[["Women 50%", 0.92], ["Age 18–34", 0.78], ["Tier 1–3 cities", 0.64]].map(([t, v], i) => (
          <div key={i} className="c80-panel__ring" style={{ "--v": v, "--i": i }}>
            <svg viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" pathLength="100" /><circle className="is-on" cx="18" cy="18" r="15" pathLength="100" /></svg>
            <span>{Math.round(v * 100)}%</span><small>{t}</small>
          </div>
        ))}
      </div>
      <p className="c80-chip c80-panel__ok">✓ Sample ready · n = 2,400</p>
    </div>
  );
}

/* ------------------------------------------------------------------ Social Media Marketing
   Story: a post goes out → hearts and comments burst from the phone → reach climbs → followers grow. */
function Social() {
  const posts = [["Launch day", 0], ["Behind the scenes", 1], ["Customer story", 2], ["Reel · 0:15", 3], ["Launch day", 0], ["Behind the scenes", 1], ["Customer story", 2], ["Reel · 0:15", 3]];
  return (
    <div className="c80 c80--social">
      <i className="c80-social__glow" /><i className="c80-social__glow c80-social__glow--2" />
      <svg className="c80-social__net" viewBox="0 0 100 100" preserveAspectRatio="none">
        {[[8, 20, 30, 8], [30, 8, 62, 18], [62, 18, 90, 6], [8, 20, 18, 52], [90, 6, 94, 40], [18, 52, 10, 86], [94, 40, 70, 92]].map(([a, b, c, d], i) => <line key={i} x1={a} y1={b} x2={c} y2={d} style={{ "--i": i }} />)}
      </svg>
      {[[8, 20], [30, 8], [62, 18], [90, 6], [18, 52], [94, 40], [10, 86], [70, 92]].map(([x, y], i) => <i key={i} className="c80-social__node" style={{ "--x": x + "%", "--y": y + "%", "--h": i * 40, "--i": i }} />)}
      <div className="c80-social__phone">
        <div className="c80-social__scr">
          <p className="c80-social__top"><b>@yourbrand</b><span>● Live</span></p>
          <div className="c80-social__stories">{n_(5).map((i) => <i key={i} style={{ "--h": i * 60 }} />)}</div>
          <div className="c80-social__feed">
            {posts.map(([t, k], i) => (
              <div key={i} className={"c80-social__post c80-social__post--" + k}>
                <i />
                <p><b>♥ {(2.4 + k * 1.3).toFixed(1)}k</b><span>{t}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {n_(9).map((i) => <i key={i} className="c80-social__heart" style={{ "--i": i, "--x": (i % 3) * 7 - 7 + "cqw" }}>{i % 4 === 3 ? "★" : "♥"}</i>)}
      <p className="c80-bubble c80-social__c1">“Obsessed with this!”</p>
      <p className="c80-bubble c80-bubble--r c80-social__c2">“Where can I buy?”</p>
      <div className="c80-card c80-social__reach">
        <p className="c80-card__h">Reach this week</p>
        <p className="c80-social__big"><b>82.4K</b><span>▲ 214%</span></p>
        <svg viewBox="0 0 120 34" preserveAspectRatio="none"><path d="M0 30 L15 27 L30 28 L45 20 L60 22 L75 13 L90 15 L105 6 L120 3" pathLength="1" /></svg>
      </div>
      <p className="c80-toast c80-social__t1"><b>+1,284</b> new followers</p>
      <p className="c80-toast c80-social__t2"><b>9.8%</b> engagement</p>
    </div>
  );
}

/* ------------------------------------------------------------------ GST Services
   Story: an invoice is raised → GST is worked out → the return is stamped and filed → filed on time, credit claimed. */
function Gst() {
  return (
    <div className="c80 c80--gst">
      <i className="c80-gst__ring" /><i className="c80-gst__ring c80-gst__ring--2" />
      <b className="c80-gst__word">GST</b>
      <div className="c80-gst__inv">
        <p className="c80-gst__ih"><b>TAX INVOICE</b><span>INV-2026-1184</span></p>
        <p className="c80-gst__gstin">GSTIN 07ABCDE1234F1Z5</p>
        {[["Market research study", "₹ 2,40,000"], ["Data processing", "₹ 60,000"], ["CGST 9%", "₹ 27,000"], ["SGST 9%", "₹ 27,000"]].map(([a, b], i) => (
          <p key={a} className="c80-gst__row" style={{ "--i": i }}><span>{a}</span><b>{b}</b></p>
        ))}
        <p className="c80-gst__tot"><span>Total</span><b>₹ 3,54,000</b></p>
        <span className="c80-gst__stamp">GST ✓ FILED</span>
      </div>
      <div className="c80-gst__returns">
        {["GSTR-1", "GSTR-3B", "GSTR-9"].map((t, i) => <p key={t} className="c80-gst__ret" style={{ "--i": i }}><b>{t}</b><em>✓</em></p>)}
      </div>
      <div className="c80-card c80-gst__cal">
        <p className="c80-card__h">Due dates · November</p>
        <div className="c80-gst__days">{n_(21).map((i) => <i key={i} className={i === 10 || i === 19 ? "is-due" : ""} style={{ "--i": i }}>{i + 1}</i>)}</div>
      </div>
      <div className="c80-card c80-gst__itc">
        <p className="c80-card__h">Input tax credit</p>
        <p className="c80-gst__big"><b>₹ 2.4 L</b><span>claimed this quarter</span></p>
      </div>
      {n_(7).map((i) => <i key={i} className="c80-gst__coin" style={{ "--i": i, "--x": 10 + i * 12 + "%" }}>₹</i>)}
      <p className="c80-chip c80-gst__ok">✓ Filed on time · 0 penalties</p>
    </div>
  );
}

/* which services use the new scenes; the grade is the colour mood of the whole hero */
export const CINE = {
  "consumer-panel": { C: Panel, grade: "deep", pal: ["#0f9c8f", "#22d3ee", "#facc15"] },
  "social-media-marketing": { C: Social, grade: "noir", pal: ["#ff2e88", "#ff7a1a", "#ffd23f"] },
  "gst-services": { C: Gst, grade: "deep", pal: ["#1e3a8a", "#d4a017", "#22c55e"] },
};
for (const [k, sp] of Object.entries(SPECS)) CINE[k] = { C: makeScene(sp, HEROES[sp.hero.t]), grade: sp.grade, pal: sp.pal };
