/* build 74: the panel logos (Turn2Opinion, MyFrequentRewards, MyHealthOpinions) and their marks, kept apart from the
   service pages so the home page, the page heroes and the header do not load those pages */
import * as ee from 'react';
import { BR_MASK } from './Brand.jsx';
import { FRL_Panel } from '../../components/site/Logos13.jsx';

const TURN2OPINION_LOGO = "/assets/core/i.133c1edb9b.webp",
  MFR_LOGO = "/assets/core/i.60eeffa5ac.webp",
  MHO_LOGO = "/assets/core/i.0c1dddb587.webp",
  PANEL_LOGOS = {
    turn2opinion: TURN2OPINION_LOGO,
    myfrequentrewards: MFR_LOGO,
    myhealthopinions: MHO_LOGO,
  },
  panelLogo = (t) => PANEL_LOGOS[t.slug];
function PanelMark({ p, size = "md", className = "" }) {
  const n = panelLogo(p);
  if (n) return <BR_Panel p={p} size={size} className={className} src={n} />;
  return n ? (
    <span className={`plogo plogo--${size} ${className}`}>
      <img src={n} alt={`${p.name} logo`} width="840" height="200" loading="lazy" decoding="async" />
    </span>
  ) : (
    <PanelInitials p={p} size={size} />
  );
}
function PanelInitials({ p, size = "md" }) {
  return (
    <span className={`pmark pmark--${size} tone-${p.accent}`} aria-hidden="true">
      <span className="pmark__ring" />
      <span className="pmark__txt">{p.monogram}</span>
    </span>
  );
}
function BR_Panel({ p, size = "md", className = "", src }) {
  if (p && /turn2|reward|health/.test(p.slug || ""))
    return <FRL_Panel p={p} size={size} className={className} />;
  return (
    <span className={`plogo plogo--${size} br-pl br-pl--${p.slug} ${className}`}>
      <span className="br-pl__in">
        <img src={src} alt={`${p.name} logo`} width="840" height="200" loading="lazy" decoding="async" />
        <span className="br-sheen" style={BR_MASK(src)} aria-hidden="true" />
      </span>
    </span>
  );
}

export { BR_Panel, PANEL_LOGOS, PanelMark, panelLogo };
