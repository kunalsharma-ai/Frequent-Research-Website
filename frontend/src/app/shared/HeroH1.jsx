/*
 * Build 82.3: one H1 per page. On the four platform pages (/services/<platform>) the build-79 hero carries the H1 and
 * the page's older hero is hidden (h79-swap). Inside <HeroDemote> the old hero's title renders as a div, so the page
 * keeps a single H1 for search engines and screen readers.
 */
import * as ee from 'react';

const HeroDemoteCtx = ee.createContext(false);
function HeroDemote({ children }) {
  return <HeroDemoteCtx.Provider value={true}>{children}</HeroDemoteCtx.Provider>;
}
const HeroH1 = ee.forwardRef(function HeroH1(props, ref) {
  const off = ee.useContext(HeroDemoteCtx);
  return ee.createElement(off ? "div" : "h1", { ...props, ref });
});
export { HeroDemote, HeroH1 };
