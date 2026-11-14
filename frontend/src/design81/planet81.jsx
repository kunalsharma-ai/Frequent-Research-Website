/*
 * Build 81.1 (Kunal, 12 Nov): "attractive moving planet" for the All services home slide, also the heart of the new
 * intro. A planet with the world turning on it (the dotted world map slides behind a round window, shading on top),
 * a glowing atmosphere, a tilted ring and moons in the four team colours orbiting in real 3D (they pass in front of and
 * behind the planet). Only transform moves; the piece is a size container, so all sizes are cqw. Styles: hx81.css (.p81*).
 */
import * as ee from 'react';

export const P81_MOONS = [
  { k: "mr", c: "#14b8a6", t: "Market Research" },
  { k: "dm", c: "#ec4899", t: "Digital Marketing" },
  { k: "it", c: "#6366f1", t: "IT & Development" },
  { k: "af", c: "#f59e0b", t: "Accounts & Finance" },
];
const ORB = [
  { r: 36, s: 11, a: [30, 210] },
  { r: 46, s: 17, a: [120, 300] },
];

export function Planet81({ labels = false, className = "", children }) {
  let n = 0;
  return (
    <div className={"p81 " + className} aria-hidden="true">
      <i className="p81__halo" />
      <div className="p81__sys">
        <i className="p81__ring" />
        <i className="p81__ring p81__ring--2" />
        <div className="p81__bb">
          <i className="p81__glow" />
          <div className="p81__ball">
            <div className="p81__land">
              <img src="__IMG:in18/world-dots__" alt="" decoding="async" />
              <img src="__IMG:in18/world-dots__" alt="" decoding="async" />
            </div>
            <i className="p81__shade" />
          </div>
        </div>
        {ORB.map((o, oi) => (
          <div key={oi} className="p81__orbit" style={{ "--r": o.r, "--s": o.s + "s" }}>
            {o.a.map((a) => {
              const m = P81_MOONS[n++];
              return (
                <div key={m.k} className="p81__arm" style={{ "--a": a + "deg" }}>
                  <div className="p81__hold">
                    <div className="p81__spin">
                      <span className="p81__moon" style={{ "--c": m.c }}>
                        <i />
                        {labels ? <b>{m.t}</b> : null}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}
