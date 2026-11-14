/*
 * Mobile dock — build 58 (FRD_Dock). The build-58 home hero that lived here (greeting sphere) was replaced in build 59
 * by the four-slide service hero in Hero59.jsx. Styles for the dock: src/styles/design58.css (frd-).
 */
/* ---------- mobile dock (build 58) ----------
   On phones the separate floating buttons (WhatsApp, chat, review badge) used to stack over the content on the right.
   Below 721 px they are replaced by one dock at the bottom: Services · Chat · Language (centre) · WhatsApp · Let's Talk.
   The chat opens through its existing "fr-open-chat" event; the language button opens the language panel. */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { whatsappUrl } from '../../app/data/site.jsx';
import { FRK_I } from './FrKit.jsx';
import { FRI_Glyph, friShort, friUse } from './I18n.jsx';

function FRD_Dock() {
  const s = friUse();
  const [hide, setHide] = ee.useState(false);
  ee.useEffect(() => {
    /* tuck the dock away while typing (on-screen keyboard) */
    const f = (e) => setHide(!!(e.target && e.target.matches && e.target.matches("input,textarea,select,[contenteditable]")));
    const b = () => setHide(false);
    document.addEventListener("focusin", f);
    document.addEventListener("focusout", b);
    return () => (document.removeEventListener("focusin", f), document.removeEventListener("focusout", b));
  }, []);
  const L = typeof Link !== "undefined" ? Link : "a";
  const wa = whatsappUrl();
  return (
    <nav className={"frd" + (hide ? " is-hidden" : "")} aria-label="Quick actions">
      <L to="/services" className="frd__i">
        <FRK_I n="grid" s={20} />
        <span>Services</span>
      </L>
      <button type="button" className="frd__i" onClick={() => window.dispatchEvent(new Event("fr-open-chat"))}>
        <FRK_I n="chat" s={20} />
        <span>Chat</span>
      </button>
      <button type="button" className="frd__lang" onClick={() => window.dispatchEvent(new Event("fri-open"))} translate="no">
        <FRI_Glyph />
        <span>{friShort(s.lang)}</span>
        <span className="pp-sr"> (change language)</span>
      </button>
      <a className="frd__i frd__i--wa" href={wa} target="_blank" rel="noopener noreferrer">
        <FRK_I n="whatsapp" s={20} />
        <span>WhatsApp</span>
      </a>
      <L to="/lets-talk" className="frd__i frd__i--go">
        <FRK_I n="send" s={20} />
        <span>Let's Talk</span>
      </L>
    </nav>
  );
}

export { FRD_Dock };
