/*
 * About Us, fresh design (build 65 update 6) — /about-us. Prefix AB6_. Styles: src/styles/about65x.css (ab6-).
 * Replaces AB5_Page (AboutUs65.jsx stays loaded: its data — teams, values, mission, panels — is reused here).
 *
 *  AB6_Hero       kinetic headline (a 3D word drum turns Research / Market / Build / Balance) + an isometric "one roof,
 *                 four towers" city, one tower per team, with light bridges between them
 *  AB6_Ticker     two counter-moving rows with every service name
 *  AB6_Manifesto  our story as text that lights up word by word while you scroll
 *  AB6_Ribbon     2015 → today on a folded paper ribbon
 *  AB6_Ring       the four teams on a 3D carousel ring that turns to the team you pick
 *  AB6_Lenses     mission and vision as two overlapping lenses, one line per team
 *  AB6_Table      the eleven values as a periodic table; each tile opens what the value means in every team
 *  AB6_Life       HD photos from the office (awards, Diwali, Independence Day) in a tilted mosaic
 *  AB6_Leaders    leadership (photos stay, as on the team pages)
 *  AB6_Galaxy     Sampledge with its seven product logos in orbit + the three research communities
 *  AB6_Proof      certifications + how quality looks in every team
 *  AB6_Doors      call to action: four doors, one per team
 * Colours follow the calm site palette (navy, royal, violet, rose, teal, gold). Loops move transform/opacity only.
 */
import * as ee from 'react';
import { AB5_T } from './AboutUs65.jsx';
import { AB21_Page } from './About21.jsx';

const AB6_T = [
  { ...AB5_T[0], c1: "#2F6BFF", c2: "#7EA2FF", word: "research", tower: 5, ph: "Hear every voice that matters." },
  { ...AB5_T[1], c1: "#C8577E", c2: "#F0A3BC", word: "market", tower: 4, ph: "Get found. Get chosen." },
  { ...AB5_T[2], c1: "#6D4AFF", c2: "#A996FF", word: "build", tower: 6, ph: "Ideas in. Software out." },
  { ...AB5_T[3], c1: "#0E9C88", c2: "#D99A2B", word: "balance", tower: 3, ph: "Clarity in every number." },
];

/* ── hero ─────────────────────────────────────────────────────────────────────────── */


/* ── manifesto: words light up with scroll ───────────────────────────────────────── */

/* ── the folded ribbon of years ───────────────────────────────────────────────────── */

/* ── the four teams on a 3D ring ──────────────────────────────────────────────────── */

/* ── mission & vision as two lenses ───────────────────────────────────────────────── */

/* ── values as a periodic table ───────────────────────────────────────────────────── */

/* ── life at the office: photos ───────────────────────────────────────────────────── */
 /* update 25: the gallery photos were removed (Kunal); this old About section is no longer shown */


/* ── Sampledge galaxy + research communities ──────────────────────────────────────── */



function AB6_Page() {
  return <AB21_Page />; // the current About Us page (pages/About21.jsx)
}

export { AB6_Page };
