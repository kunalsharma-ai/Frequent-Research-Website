import * as ee from 'react';
import { HG_LAND } from '../data/maps.jsx';

const HG_HUBS = [
  [-74, 40.7],
  [-99.1, 19.4],
  [-46.6, -23.5],
  [-0.1, 51.5],
  [8.7, 50.1],
  [55.3, 25.2],
  [31.2, 30],
  [28, -26.2],
  [77.2, 28.6],
  [103.8, 1.35],
  [139.7, 35.7],
  [151.2, -33.9],
  [114.2, 22.3],
];
const HG_LINKS = [
  [0, 3],
  [3, 4],
  [4, 5],
  [5, 8],
  [8, 9],
  [9, 10],
  [9, 11],
  [3, 5],
  [0, 2],
  [1, 0],
  [5, 7],
  [6, 5],
  [8, 12],
  [12, 10],
  [0, 4],
  [3, 8],
];
function hgSlerp(a, b, t) {
  const toV = ([lon, lat]) => {
    const l = (lon * Math.PI) / 180,
      p = (lat * Math.PI) / 180;
    return [Math.cos(p) * Math.cos(l), Math.cos(p) * Math.sin(l), Math.sin(p)];
  };
  const A = toV(a),
    B = toV(b);
  const d = Math.acos(Math.max(-1, Math.min(1, A[0] * B[0] + A[1] * B[1] + A[2] * B[2])));
  if (d < 1e-6) return a;
  const s1 = Math.sin((1 - t) * d) / Math.sin(d),
    s2 = Math.sin(t * d) / Math.sin(d);
  const v = [A[0] * s1 + B[0] * s2, A[1] * s1 + B[1] * s2, A[2] * s1 + B[2] * s2];
  return [(Math.atan2(v[1], v[0]) * 180) / Math.PI, (Math.asin(Math.max(-1, Math.min(1, v[2]))) * 180) / Math.PI];
}
let HG_SCROLL_T = 0;
const hgMarkScroll = () => {
  HG_SCROLL_T = performance.now();
};
const hgScrolling = () => performance.now() - HG_SCROLL_T < 180 || window.__frStill === true;
function HG_Globe({ fade = false, fps = 24 } = {}) {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    const reduce =
      window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const arcs = HG_LINKS.map(([i, j]) => {
      const pts = [];
      for (let k = 0; k <= 40; k++) pts.push(hgSlerp(HG_HUBS[i], HG_HUBS[j], k / 40));
      return pts;
    });
    let W = 0,
      dpr = 1,
      raf = 0,
      visible = true,
      lam = -20;
    const bk = [[], [], [], [], [], []],
      BK_COL = [0, 1, 2, 3, 4, 5].map((b) => `rgba(190,208,255,${(0.25 + ((b + 0.5) / 6) * 0.65).toFixed(2)})`);
    const gap = 1e3 / fps - 2;
    const phi0 = (18 * Math.PI) / 180,
      sinP = Math.sin(phi0),
      cosP = Math.cos(phi0);
    const size = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(r.width > 420 ? 1 : 2, window.devicePixelRatio || 1);
      W = r.width;
      cv.width = Math.max(1, r.width * dpr);
      cv.height = Math.max(1, r.height * dpr);
    };
    size();
    const proj = (lon, lat, R, lift) => {
      const l = ((lon - lam) * Math.PI) / 180,
        p = (lat * Math.PI) / 180;
      const cp = Math.cos(p),
        sp = Math.sin(p),
        cl = Math.cos(l);
      const z = sinP * sp + cosP * cp * cl;
      const k = R * (lift || 1);
      return [k * cp * Math.sin(l), -k * (cosP * sp - sinP * cp * cl), z];
    };
    const draw = (t) => {
      const R = (W / 2) * 0.96,
        c = W / 2;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);
      const g = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R);
      g.addColorStop(0, "rgba(40,80,220,0.55)");
      g.addColorStop(1, "rgba(7,16,79,0.25)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(c, c, R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(160,185,255,0.35)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = "rgba(160,185,255,0.10)";
      ctx.lineWidth = 0.7;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let pen = false;
        for (let lon = -180; lon <= 180; lon += 6) {
          const [x, y, z] = proj(lon, lat, R);
          if (z > 0) {
            if (pen) ctx.lineTo(c + x, c + y);
            else ctx.moveTo(c + x, c + y);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();
      }
      for (let lon = -180; lon < 180; lon += 30) {
        ctx.beginPath();
        let pen = false;
        for (let lat = -84; lat <= 84; lat += 6) {
          const [x, y, z] = proj(lon, lat, R);
          if (z > 0) {
            if (pen) ctx.lineTo(c + x, c + y);
            else ctx.moveTo(c + x, c + y);
            pen = true;
          } else pen = false;
        }
        ctx.stroke();
      }
      const ds = Math.max(1, R / 85),
        hs = ds * 0.6,
        sz = ds * 1.2;
      for (let b = 0; b < 6; b++) bk[b].length = 0;
      for (let i = 0; i < HG_LAND.length; i += 2) {
        const [x, y, z] = proj(HG_LAND[i], HG_LAND[i + 1], R);
        if (z <= 0.02) continue;
        const bb = Math.min(5, (z * 6) | 0);
        bk[bb].push(c + x - hs, c + y - hs);
      }
      for (let b = 0; b < 6; b++) {
        const a = bk[b];
        if (!a.length) continue;
        ctx.fillStyle = BK_COL[b];
        ctx.beginPath();
        for (let j = 0; j < a.length; j += 2) ctx.rect(a[j], a[j + 1], sz, sz);
        ctx.fill();
      }
      arcs.forEach((pts, ai) => {
        ctx.beginPath();
        let pen = false;
        pts.forEach(([lon, lat], k2) => {
          const lift2 = 1 + 0.16 * Math.sin((Math.PI * k2) / 40);
          const [x, y, z] = proj(lon, lat, R, lift2);
          if (z > -0.05) {
            if (pen) ctx.lineTo(c + x, c + y);
            else ctx.moveTo(c + x, c + y);
            pen = true;
          } else pen = false;
        });
        ctx.strokeStyle = "rgba(110,224,206,0.62)";
        ctx.lineWidth = 1.3;
        ctx.stroke();
        const ph = ((t / 1e3) * 0.18 + ai * 0.137) % 1;
        const k = Math.floor(ph * 40),
          lift = 1 + 0.16 * Math.sin((Math.PI * k) / 40);
        const [px, py, pz] = proj(pts[k][0], pts[k][1], R, lift);
        if (pz > 0) {
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(c + px, c + py, 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      HG_HUBS.forEach(([lon, lat], i) => {
        const [x, y, z] = proj(lon, lat, R);
        if (z <= 0) return;
        const pulse = ((t / 1e3) * 0.5 + i * 0.21) % 1;
        ctx.strokeStyle = `rgba(110,224,206,${(0.7 * (1 - pulse) * z).toFixed(2)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(c + x, c + y, 3 + pulse * 9, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#6EE0CE";
        ctx.beginPath();
        ctx.arc(c + x, c + y, 2.6, 0, Math.PI * 2);
        ctx.fill();
      });
      const v = ctx.createRadialGradient(c, c, 0, c, c, R * 0.55);
      v.addColorStop(0, "rgba(7,16,79,0.72)");
      v.addColorStop(0.6, "rgba(7,16,79,0.42)");
      v.addColorStop(1, "rgba(7,16,79,0)");
      ctx.fillStyle = v;
      ctx.beginPath();
      ctx.arc(c, c, R * 0.55, 0, Math.PI * 2);
      ctx.fill();
      if (fade) {
        ctx.globalCompositeOperation = "destination-out";
        const f = ctx.createRadialGradient(c, c, W * 0.42, c, c, W * 0.5);
        f.addColorStop(0, "rgba(0,0,0,0)");
        f.addColorStop(1, "rgba(0,0,0,1)");
        ctx.fillStyle = f;
        ctx.fillRect(0, 0, W, W);
        ctx.globalCompositeOperation = "source-over";
      }
    };
    let last = 0;
    const loop = (t) => {
      if (visible && !document.hidden && !hgScrolling()) {
        if (last && t - last < gap) {
          raf = requestAnimationFrame(loop);
          return;
        }
        if (last) lam -= (t - last) * 0.006;
        last = t;
        draw(t);
      } else last = 0;
      raf = requestAnimationFrame(loop);
    };
    if (reduce) draw(0);
    else raf = requestAnimationFrame(loop);
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
      });
      io.observe(cv);
    }
    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            size();
            if (reduce) draw(0);
          })
        : null;
    if (ro) ro.observe(cv);
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      if (ro) ro.disconnect();
    };
  }, []);
  return <canvas ref={ref} className="hg-canvas" aria-hidden="true" />;
}

export { HG_Globe, hgMarkScroll };
