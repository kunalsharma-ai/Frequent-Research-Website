/* build 74: the marketplace steps, markets and flags the marketplace artwork (page heroes) uses, kept apart from the
   marketplace page */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { RG_FLAGS } from './maps.jsx';

const MkLink = (p) => <Link {...p} />;
const MK_FLOW = [
  ["Define", "target"],
  ["Configure", "sliders"],
  ["Check Feasibility", "search"],
  ["Review Cost", "file"],
  ["Purchase", "check"],
  ["Launch", "rocket"],
  ["Track", "bars"],
];
const MK_MARKETS = [
  ["in", "India"],
  ["us", "United States"],
  ["gb", "United Kingdom"],
  ["ae", "United Arab Emirates"],
  ["sa", "Saudi Arabia"],
  ["sg", "Singapore"],
  ["de", "Germany"],
  ["fr", "France"],
  ["au", "Australia"],
  ["ca", "Canada"],
  ["jp", "Japan"],
  ["br", "Brazil"],
  ["za", "South Africa"],
  ["my", "Malaysia"],
  ["id", "Indonesia"],
  ["mx", "Mexico"],
];
const mkFlag = (c) => RG_FLAGS[c] || null;
export { MK_FLOW, MK_MARKETS, MkLink, mkFlag };
