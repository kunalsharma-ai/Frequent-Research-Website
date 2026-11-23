/* Build 83.1: SampConnect spotlight band, on the home Sampledge section and the Products page (styles in footer.css). */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { ScLogo } from './ScMark.jsx';

export function ScSpot({ compact }) {
  return (
    <div className={'sc-spot' + (compact ? ' sc-spot--c' : '')}>
      <span className="sc-spot__glow" aria-hidden="true" />
      <div className="sc-spot__l">
        <span className="sc-spot__k">New from Sampledge</span>
        <ScLogo h={34} dark />
        <p className="sc-spot__t">Every conversation. Every country. <em>On servers you own.</em></p>
        <p className="sc-spot__d">Chat, video meetings, a private AI assistant and approvals in one self-hosted, offline-first workspace, with all seven Sampledge products built in.</p>
      </div>
      <ul className="sc-spot__pts" aria-label="SampConnect highlights">
        <li><b>100%</b> self-hosted, video and AI included</li>
        <li><b>7</b> Sampledge modules built in</li>
        <li><b>3</b> platforms: web, iPhone and Android</li>
      </ul>
      <Link className="sc-spot__go" to="/products/sampconnect">Explore SampConnect <span aria-hidden="true">→</span></Link>
    </div>
  );
}
