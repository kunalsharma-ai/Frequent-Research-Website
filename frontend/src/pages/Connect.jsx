/*
 * QR & Connect — /connect, linked from the About Us menu. Build 52, redesigned in build 62 and again in build 63.
 * Prefixes: FRQ_ (shared QR data + the footer "Follow us" widget) and CQ_ (the page). Styles: src/styles/connect.css
 * (frq- footer widget, cq- page).
 *
 * Every QR image is generated at build time and decode-verified (tools/qr/make_qr*.py; build 63 codes:
 * tools/qr/make_qr_b63.py) and inlined from public/images/qr/<name>.png through the "__QR:<name>__" placeholder.
 * Links are exactly as supplied (the MyFrequentRewards Facebook address is used as given). Nothing is fetched at run time.
 *
 * Page (build 64, "flip edition"): a hero with a split-flap board and a phone that scans each brand's code; one band
 * per brand, each with its own frame style — Frequent Research (glass grid), MyHealthOpinions (heartbeat), Turn2Opinion
 * (speech bubbles), MyFrequentRewards (coin flips), Sampledge (hologram orbit) — then direct lines as boarding passes.
 * Every code is a flip card: the QR side faces the visitor at rest (flat on white, scannable straight from the screen,
 * with Open and Download), the reverse carries the channel details. Cards flip in once as a cascade when their band
 * scrolls into view, and now and then one card does a quick flip-flop and lands back on its QR side.
 */
import * as ee from 'react';
import { SOC_LINKS } from '../app/shared/Social.jsx';
import { PpL } from '../components/dm/shared.jsx';
import { FRK_I, FRK_P } from '../components/site/FrKit.jsx';

const FRQ_THREADS_P =
  "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z";
const FRQ_WA = "https://wa.me/918178200573";
const FRQ_SOCIAL = [
  { k: "linkedin", name: "LinkedIn", handle: "frequentresearch", url: "https://www.linkedin.com/company/frequentresearch", qr: "__QR:social-linkedin__", c1: "#0A66C2", c2: "#38A3FF", line: "Company news, insights and hiring" },
  { k: "youtube", name: "YouTube", handle: "@frequentresearch", url: "https://www.youtube.com/@frequentresearch", qr: "__QR:social-youtube__", c1: "#FF0000", c2: "#FF7A59", line: "Explainers and behind the scenes" },
  { k: "facebook", name: "Facebook", handle: "FrequentResearchFieldwork", url: "https://www.facebook.com/FrequentResearchFieldwork", qr: "__QR:social-facebook__", c1: "#0866FF", c2: "#6FA8FF", line: "Updates, events and celebrations" },
  { k: "instagram", name: "Instagram", handle: "@frequentresearchfield", url: "https://www.instagram.com/frequentresearchfield", qr: "__QR:social-instagram__", c1: "#FF0069", c2: "#FFB547", line: "Team moments and stories" },
  { k: "threads", name: "Threads", handle: "@frequentresearchfield", url: "https://www.threads.com/@frequentresearchfield", qr: "__QR:social-threads__", c1: "#101010", c2: "#6B6B6B", line: "Conversations and quick updates" },
  { k: "x", name: "X", handle: "@frequentrfs", url: "https://x.com/frequentrfs", qr: "__QR:social-x__", c1: "#14171A", c2: "#5B6B7A", line: "Quick takes and announcements" },
  { k: "pinterest", name: "Pinterest", handle: "Frequent Research", url: "https://pin.it/1ApfR1BQk", qr: "__QR:social-pinterest__", c1: "#BD081C", c2: "#FF5A6E", line: "Research visuals and ideas" },
];
const FRQ_DIRECT = [
  { k: "whatsapp", name: "WhatsApp", sub: "Chat with the Frequent Research team", url: FRQ_WA, qr: "__QR:chat-whatsapp__", c1: "#0E9F4E", c2: "#7CF5A6", ic: "whatsapp", cta: "Start a chat" },
  { k: "google", name: "Google", sub: "Find us & leave a review", url: "https://share.google/Q2u2ukm6YPPESkJTb", qr: "__QR:google-share__", c1: "#EA4335", c2: "#FBBC05", ic: "star", cta: "Open on Google" },
  { k: "panels", name: "All our panels", sub: "panels.frequentresearch.com", url: "https://panels.frequentresearch.com/", qr: "__QR:panel-frequent-research__", c1: "#7C4DFF", c2: "#2EE6A6", ic: "grid", cta: "Open the panel hub" },
];
/* each panel's own profiles; WhatsApp support is one shared number, each panel's code carries that panel's logo */
const FRQ_PROFILES = [
  { slug: "myhealthopinions", id: "mho", name: "MyHealthOpinions", who: "Healthcare professionals, caregivers and patients", tag: "Your experience can improve healthcare.", c1: "#E5484D", c2: "#FF9F43", c0: "#3A0B12", site: "https://www.myhealthopinions.com/", siteQr: "__QR:panel-myhealthopinions__",
    links: [
      { k: "youtube", name: "YouTube", handle: "@MyHealthOpinions", url: "https://www.youtube.com/@MyHealthOpinions", qr: "__QR:myhealthopinions-youtube__" },
      { k: "instagram", name: "Instagram", handle: "@myhealthopinions", url: "https://www.instagram.com/myhealthopinions/", qr: "__QR:myhealthopinions-instagram__" },
      { k: "linkedin", name: "LinkedIn", handle: "company/myhealthopinions", url: "https://www.linkedin.com/company/myhealthopinions/posts/?feedView=all", qr: "__QR:myhealthopinions-linkedin__" },
      { k: "facebook", name: "Facebook", handle: "myhealthopinions", url: "https://www.facebook.com/myhealthopinions/", qr: "__QR:myhealthopinions-facebook__" },
      { k: "whatsapp", name: "WhatsApp support", handle: "+91 81782 00573", url: FRQ_WA, qr: "__QR:myhealthopinions-whatsapp__" },
    ] },
  { slug: "turn2opinion", id: "t2o", name: "Turn2Opinion", who: "Consumers, business professionals and teens 13–17", tag: "Turn your opinion into rewards.", c1: "#1E5BFF", c2: "#22D3EE", c0: "#071A4A", site: "https://www.turn2opinion.com/", siteQr: "__QR:panel-turn2opinion__",
    links: [
      { k: "youtube", name: "YouTube", handle: "@Turn2Opinion", url: "https://www.youtube.com/@Turn2Opinion", qr: "__QR:turn2opinion-youtube__" },
      { k: "instagram", name: "Instagram", handle: "@turn2opinion", url: "https://www.instagram.com/turn2opinion/", qr: "__QR:turn2opinion-instagram__" },
      { k: "linkedin", name: "LinkedIn", handle: "company/turn2opinionpanel", url: "https://www.linkedin.com/company/turn2opinionpanel", qr: "__QR:turn2opinion-linkedin__" },
      { k: "facebook", name: "Facebook", handle: "tryturn2opinion", url: "https://www.facebook.com/tryturn2opinion", qr: "__QR:turn2opinion-facebook__" },
      { k: "whatsapp", name: "WhatsApp support", handle: "+91 81782 00573", url: FRQ_WA, qr: "__QR:turn2opinion-whatsapp__" },
    ] },
  { slug: "myfrequentrewards", id: "mfr", name: "MyFrequentRewards", who: "Consumers, business professionals and teens 13–17", tag: "Share your views. Earn every time.", c1: "#F59E0B", c2: "#F0457E", c0: "#3A1A03", site: "https://www.myfrequentrewards.com/", siteQr: "__QR:panel-myfrequentrewards__",
    links: [
      { k: "youtube", name: "YouTube", handle: "@MyFrequentRewards", url: "https://www.youtube.com/@MyFrequentRewards", qr: "__QR:myfrequentrewards-youtube__" },
      { k: "instagram", name: "Instagram", handle: "@myfrequentrewards", url: "https://www.instagram.com/myfrequentrewards/", qr: "__QR:myfrequentrewards-instagram__" },
      { k: "linkedin", name: "LinkedIn", handle: "company/myfrequentrewards", url: "https://www.linkedin.com/company/myfrequentrewards/", qr: "__QR:myfrequentrewards-linkedin__" },
      { k: "facebook", name: "Facebook", handle: "myfrequentreswards", url: "https://www.facebook.com/myfrequentreswards/", qr: "__QR:myfrequentrewards-facebook__" },
      { k: "whatsapp", name: "WhatsApp support", handle: "+91 81782 00573", url: FRQ_WA, qr: "__QR:myfrequentrewards-whatsapp__" },
    ] },
];
/* build 63: Sampledge — its own codes (links exactly as supplied); WhatsApp support uses the same number */
const FRQ_SAMPLEDGE = {
  name: "Sampledge",
  what: "Project Management & Sample Management DIY tool",
  site: "https://www.sampledge.com/",
  links: [
    { k: "web", name: "Website", handle: "sampledge.com", url: "https://www.sampledge.com/", qr: "__QR:product-sampledge__" },
    { k: "youtube", name: "YouTube", handle: "@Sampledge_DIY_Marketplace", url: "https://www.youtube.com/@Sampledge_DIY_Marketplace", qr: "__QR:sampledge-youtube__" },
    { k: "instagram", name: "Instagram", handle: "@sampledge_diy", url: "https://www.instagram.com/sampledge_diy/", qr: "__QR:sampledge-instagram__" },
    { k: "threads", name: "Threads", handle: "@sampledge_diy", url: "https://www.threads.com/@sampledge_diy", qr: "__QR:sampledge-threads__" },
    { k: "x", name: "X", handle: "@SampledgeX", url: "https://x.com/SampledgeX", qr: "__QR:sampledge-x__" }, /* build 65 */
    { k: "linkedin", name: "LinkedIn", handle: "company/sampledge-diy-marketplace", url: "https://www.linkedin.com/company/sampledge-diy-marketplace", qr: "__QR:sampledge-linkedin__" },
    { k: "facebook", name: "Facebook", handle: "Sampledge", url: "https://www.facebook.com/people/Sampledge/61594616326502/", qr: "__QR:sampledge-facebook__" },
    { k: "whatsapp", name: "Sampledge WhatsApp support", handle: "+91 81782 00573", url: FRQ_WA, qr: "__QR:sampledge-whatsapp__" },
  ],
};
const FRQ_PCOL = { youtube: ["#FF0000", "#FF7A59"], instagram: ["#FF0069", "#FFB547"], linkedin: ["#0A66C2", "#38A3FF"], facebook: ["#0866FF", "#6FA8FF"], whatsapp: ["#0E9F4E", "#7CF5A6"], threads: ["#101010", "#6B6B6B"], x: ["#14171A", "#5B6B7A"], pinterest: ["#BD081C", "#FF5A6E"], web: ["#2F6BFF", "#7B4DFF"] };

const frqSocialPath = (k) => {
  if (k === "threads") return FRQ_THREADS_P;
  const s = SOC_LINKS.find((x) => x.k === k);
  return s ? s.p : FRK_P.link;
};
function FRQ_Icon({ k, s = 22 }) {
  if (k === "whatsapp") return <FRK_I n="whatsapp" s={s} />;
  if (k === "web") return <FRK_I n="globe" s={s} />;
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" focusable="false">
      <path fill="currentColor" d={frqSocialPath(k)} />
    </svg>
  );
}
const frqFile = (name) => "frequent-research-qr-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") + ".png";

/* footer: icons with a QR that pops on hover / keyboard focus, plus a link to /connect */
function FRQ_Follow() {
  return (
    <div className="frq-follow">
      <h3>Follow us</h3>
      <ul>
        {FRQ_SOCIAL.map((s, i) => (
          <li key={s.k} style={{ "--c1": s.c1, "--c2": s.c2, "--i": i }}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`Frequent Research on ${s.name}`}>
              <FRQ_Icon k={s.k} s={19} />
            </a>
            <span className="frq-follow__pop" aria-hidden="true">
              <img src={s.qr} width="120" height="120" alt="" loading="lazy" decoding="async" />
              <b>{s.name}</b>
              <small>Scan to follow</small>
            </span>
          </li>
        ))}
      </ul>
      <PpL to="/connect" className="frq-follow__all">
        <span className="frq-follow__qr" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        QR &amp; Connect — all QR codes
        <FRK_I n="arrow" s={14} />
      </PpL>
    </div>
  );
}

/* ---------- page ---------- */
const cqHost = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/* section shell: is-in once seen, is-done 2.8 s later (entrance styles removed, so nothing can stay half-flipped) */
/* now and then one card of a band does a quick flip-flop (only while the band is on screen and nobody is pointing at it) */

/* split-flap board */

/* one flip card: QR side (front, at rest) + details side */

export { FRQ_DIRECT, FRQ_Follow, FRQ_Icon, FRQ_PCOL, FRQ_PROFILES, FRQ_SAMPLEDGE, FRQ_SOCIAL, cqHost, frqFile };
