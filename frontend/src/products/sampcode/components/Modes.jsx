import { Wifi, WifiOff, MapPin, Mic, Camera, RefreshCw, PhoneCall, Clock, EyeOff } from 'lucide-react';
import { modes } from '../content.js';
import { PhoneFrame, Reveal, SectionHead } from './ui.jsx';
import icon from '../assets/brand/sampcode-icon.svg';
import './Modes.css';

function CapiMock() {
  return (
    <div className="mk mk-capi" aria-label="Illustration of the SampCode offline interviewer app">
      <div className="mk-top">
        <img src={icon} alt="" width="22" height="22" />
        <b>Interviewer</b>
        <span className="mk-pill off">
          <WifiOff size={11} /> Offline
        </span>
      </div>
      <div className="mk-sync">
        <span className="mk-sync-a">
          <RefreshCw size={13} /> 3 interviews waiting to sync
        </span>
        <span className="mk-sync-b">
          <Wifi size={13} /> Back online · all synced
        </span>
      </div>
      <div className="mk-card">
        <div className="mk-prog">
          <i />
        </div>
        <small>Store visit · page 4 of 7</small>
        <strong>Take a photo of the coffee shelf</strong>
        <div className="mk-photo">
          <Camera size={26} />
        </div>
        <div className="mk-tags">
          <span>
            <MapPin size={11} /> GPS ±12 m
          </span>
          <span className="rec">
            <Mic size={11} /> Recording
          </span>
        </div>
        <div className="mk-next">Next</div>
      </div>
    </div>
  );
}

function CatiMock() {
  const dispositions = ['Complete', 'Call back', 'Busy', 'No answer', 'Do not call'];
  return (
    <div className="mk mk-cati" aria-label="Illustration of SampCode CATI calling">
      <div className="mk-top">
        <img src={icon} alt="" width="22" height="22" />
        <b>Calls</b>
        <span className="mk-pill ok">
          <Clock size={11} /> In calling hours
        </span>
      </div>
      <div className="mk-card">
        <small>Brand Health Q4 · case 1006 · attempt 1 of 5</small>
        <strong>Asha R.</strong>
        <div className="mk-num">
          <EyeOff size={13} /> Number hidden · ends …123
        </div>
        <div className="mk-call">
          <span className="mk-ripple" />
          <PhoneCall size={22} />
        </div>
        <div className="mk-timer">
          <i /> 00:42 on call
        </div>
        <small className="mk-q">How did the call end?</small>
        <div className="mk-disp">
          {dispositions.map((d, i) => (
            <span key={d} className={i === 0 ? 'on' : ''}>
              {d}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Modes() {
  return (
    <section id="modes" className="section modes">
      <div className="wrap">
        <SectionHead kicker={modes.kicker} title={modes.title} center />
        <div className="modes-grid">
          {modes.items.map((m, i) => (
            <Reveal key={m.id} delay={i * 0.12} className="mode" style={{ '--c': m.accent }}>
              <div className="mode-visual">
                <PhoneFrame image={m.image}>{m.mockup === 'capi' ? <CapiMock /> : m.mockup === 'cati' ? <CatiMock /> : null}</PhoneFrame>
              </div>
              <span className="mode-tag">{m.name}</span>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
