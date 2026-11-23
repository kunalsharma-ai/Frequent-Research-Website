/* Build 83.1: the SampConnect logo (mark from the product; wordmark set in the site's display font).
   Small on purpose: the menu and the footer use it on every page. Tile / wordmark styles live in styles/footer.css. */
import * as ee from 'react';

export function ScMark({ s = 32, tile = false }) {
  const svg = (
    <svg viewBox="0 0 120 120" width={tile ? '70%' : s} height={tile ? '70%' : s} aria-hidden="true" focusable="false">
      <path d="M60 12C90 12 108 30 108 54S90 94 62 94c-6 0-12-1-17-3L22 104l7-19C18 77 12 66 12 54 12 30 30 12 60 12Z" fill="#0F6B4F" />
      <path d="M73 38c-4-7-24-8-26 2s28 9 26 21-22 11-27 4" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="round" />
      <circle cx="92" cy="24" r="10" fill="#F5B83D" stroke="#fff" strokeWidth="3" />
    </svg>
  );
  return tile ? <span className="sc-tile" style={{ width: s, height: s }}>{svg}</span> : svg;
}
export function ScLogo({ h = 30, dark = false, tile = true }) {
  return (
    <span className={'sc-logo' + (dark ? ' sc-logo--dark' : '')} style={{ '--h': h + 'px' }} role="img" aria-label="SampConnect">
      <ScMark s={h} tile={tile} />
      <span className="sc-logo__w" aria-hidden="true">Samp<b>Connect</b></span>
    </span>
  );
}

