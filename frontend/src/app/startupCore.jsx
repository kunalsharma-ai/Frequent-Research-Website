// Build 74: the start-up patches the home page needs (split from app/startup.jsx, which full.jsx still runs for the
// rest of the site). They change data owned by other files, so they run before the first render.
import * as ee from 'react';
import { BR_IMG } from './shared/Brand.jsx';
import { PANEL_LOGOS } from './shared/PanelMark.jsx';
import { FRK_LOGO_FULL, FRK_LOGO_MFR, FRK_LOGO_MHO, FRK_LOGO_T2O } from '../components/site/FrKit.jsx';
import { CB22_G } from '../components/site/Celebrate22.jsx';

/* from components/site/Logos13.jsx: legacy static sources point at the new artwork too (chat avatar, OG uses) */
try {
  BR_IMG.lockup = BR_IMG.full = FRK_LOGO_FULL;
  Object.assign(PANEL_LOGOS, { turn2opinion: FRK_LOGO_T2O, myfrequentrewards: FRK_LOGO_MFR, myhealthopinions: FRK_LOGO_MHO });
} catch (e) {}

/* from components/site/Festivals22.jsx */
/* extra particle glyphs (viewBox 0 0 20 20) */
Object.assign(CB22_G, {
  note: <path d="M8 3l9-2v11.5a3 3 0 1 1-2-2.8V5L10 6v9a3 3 0 1 1-2-2.8z" />,
  drop: <path d="M10 1c4 6 6 9 6 12a6 6 0 0 1-12 0c0-3 2-6 6-12z" />,
  flower: <path d="M10 2a3 3 0 0 1 3 4 3 3 0 0 1 4 3 3 3 0 0 1-3 3 3 3 0 0 1-1 4 3 3 0 0 1-3-2 3 3 0 0 1-3 2 3 3 0 0 1-1-4 3 3 0 0 1-3-3 3 3 0 0 1 4-3 3 3 0 0 1 3-4zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />,
  maple: <path d="M10 1l2 4 3-1-1 4 4 1-3 3 1 2-4-1v6H8v-6l-4 1 1-2-3-3 4-1-1-4 3 1z" />,
  clover: <path d="M10 10a4 4 0 1 1 0-6 4 4 0 1 1 0 6zm0 0a4 4 0 1 1-6 0 4 4 0 1 1 6 0zm0 0a4 4 0 1 1 6 0 4 4 0 1 1-6 0zm0 0v9" />,
  star5: <path d="M10 1l2.6 6 6.4.5-5 4.2 1.6 6.3L10 14.6 4.4 18l1.6-6.3-5-4.2 6.4-.5z" />,
  bubble: <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1.8" />,
  feather: <path d="M10 19V8M10 8C6 6 5 2 10 1c5 1 4 5 0 7z" stroke="currentColor" strokeWidth="1.4" fill="currentColor" />,
  ring: <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.6" />,
  smoke: <circle cx="10" cy="10" r="8" opacity=".55" />,
  egg: <ellipse cx="10" cy="11" rx="6" ry="8" />,
  gift: <path d="M3 8h14v10H3zM2 5h16v3H2zM10 5v13M10 5C8 1 4 2 6 5M10 5c2-4 6-3 4 0" />,
});
