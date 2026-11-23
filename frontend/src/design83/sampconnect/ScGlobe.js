/*
 * Build 83.2 (Kunal, 22 Nov 2026): the SampConnect hero globe, carried over from the SampConnect showcase.
 * Same scene as the showcase: dotted continents on a glowing green planet, gold city points with pulsing rings,
 * arcs that draw themselves between the cities with a light travelling along each, an atmosphere, a dashed orbit
 * with three satellites and a starfield. The globe follows the pointer a little.
 * Loaded on its own (dynamic import) after the page has loaded, so it never delays the first screen.
 * mount(el) returns a cleanup function. Returns null when WebGL is not available (the CSS planet stays).
 */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Mesh, SphereGeometry, ShaderMaterial, BufferGeometry,
  Float32BufferAttribute, Color, Points, PointsMaterial, LineBasicMaterial, Line, MeshBasicMaterial, RingGeometry,
  QuadraticBezierCurve3, Sprite, SpriteMaterial, CanvasTexture, AdditiveBlending, DoubleSide, BackSide,
  LineDashedMaterial, Clock, Vector3,
} from 'three';

// rough continents: [lat, lng, radius in degrees]
const LAND = [[50, -100, 22], [62, -110, 16], [38, -92, 14], [20, -100, 9], [10, -84, 5], [70, -45, 11], [-10, -58, 16], [-28, -62, 11], [-42, -69, 6], [5, -68, 8], [50, 12, 13], [58, 30, 12], [42, -4, 5], [62, 15, 7], [54, -3, 3.5], [10, 20, 17], [-10, 25, 14], [-26, 26, 9], [22, 5, 12], [26, 32, 7], [55, 80, 22], [60, 120, 18], [35, 105, 15], [22, 80, 9], [25, 45, 9], [15, 102, 6], [36, 138, 4], [-1, 115, 6], [-6, 140, 4], [-25, 134, 13], [-41, 173, 3]];
// London, New York, São Paulo, Mumbai, Delhi, Singapore, Tokyo, Berlin, Sydney, Dubai, Nairobi
const CITIES = [[51.5, -0.1], [40.7, -74], [-23.5, -46.6], [19, 72.8], [28.6, 77.2], [1.35, 103.8], [35.7, 139.7], [52.5, 13.4], [-33.9, 151.2], [25.2, 55.3], [-1.3, 36.8]];
const ROUTES = [[0, 1], [0, 4], [1, 2], [4, 5], [5, 6], [7, 9], [9, 3], [3, 8], [0, 10], [2, 7], [6, 1], [10, 9]];

const at = (lat, lng, r = 1) => {
  const p = (90 - lat) * Math.PI / 180, t = (lng + 180) * Math.PI / 180;
  return new Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
};
const isLand = (lat, lng) => {
  for (const [a, b, r] of LAND) {
    let d = Math.abs(lng - b); if (d > 180) d = 360 - d;
    const y = lat - a, dist = Math.sqrt(y * y + (d * Math.cos(lat * Math.PI / 180)) ** 2);
    const wobble = Math.sin(lat * 0.7 + lng * 0.3) * 2.2 + Math.cos(lng * 0.9) * 1.6;
    if (dist < r + wobble) return true;
  }
  return false;
};

export function mount(host, { reduced = false, lite = false } = {}) {
  let gl;
  try { gl = new WebGLRenderer({ antialias: !lite, alpha: true, powerPreference: 'high-performance' }); } catch (e) { return null; }
  if (!gl.getContext()) return null;
  gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, lite ? 1.5 : 2));
  gl.domElement.setAttribute('aria-hidden', 'true');
  host.appendChild(gl.domElement);

  const scene = new Scene();
  const cam = new PerspectiveCamera(36, 1, 0.1, 100);
  cam.position.set(0, 0, 4.1);
  const tilt = new Group(); tilt.rotation.z = -0.28; scene.add(tilt);
  const spin = new Group(); tilt.add(spin);

  // planet body with a soft rim light
  spin.add(new Mesh(new SphereGeometry(0.985, 64, 64), new ShaderMaterial({
    vertexShader: 'varying vec3 vN; varying vec3 vP; void main(){ vN = normalize(normalMatrix*normal); vec4 p = modelViewMatrix*vec4(position,1.); vP = p.xyz; gl_Position = projectionMatrix*p; }',
    fragmentShader: 'varying vec3 vN; varying vec3 vP; void main(){ vec3 v = normalize(-vP); float f = pow(1.0 - max(dot(vN, v), 0.0), 2.2); vec3 base = mix(vec3(0.02,0.16,0.11), vec3(0.05,0.36,0.25), max(dot(vN, normalize(vec3(-0.5,0.6,0.7))),0.0)); gl_FragColor = vec4(base + f*vec3(0.2,0.55,0.4), 1.0); }',
  })));

  // soft round sprite used by every glowing point
  const dot = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.45, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
    return new CanvasTexture(c);
  })();

  // dotted continents (Fibonacci sphere, land points only)
  const N = lite ? 9000 : 14000, pos = [], col = [], c1 = new Color('#9BEBC2'), c2 = new Color('#2FD08F');
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963229728653;
    const x = Math.cos(th) * r, z = Math.sin(th) * r;
    const lat = Math.asin(y) * 180 / Math.PI, lng = ((Math.atan2(z, -x) * 180 / Math.PI - 180 + 540) % 360) - 180;
    if (!isLand(lat, lng)) continue;
    pos.push(x * 1.003, y * 1.003, z * 1.003);
    const k = c1.clone().lerp(c2, Math.random() * 0.7); col.push(k.r, k.g, k.b);
  }
  const landG = new BufferGeometry();
  landG.setAttribute('position', new Float32BufferAttribute(pos, 3));
  landG.setAttribute('color', new Float32BufferAttribute(col, 3));
  spin.add(new Points(landG, new PointsMaterial({ size: 0.03, map: dot, vertexColors: true, transparent: true, depthWrite: false, opacity: 0.95 })));

  // latitude lines
  const latM = new LineBasicMaterial({ color: '#8FE0B6', transparent: true, opacity: 0.1 });
  for (let la = -60; la <= 60; la += 30) {
    const pts = []; for (let lo = -180; lo <= 180; lo += 4) pts.push(at(la, lo, 1.004));
    spin.add(new Line(new BufferGeometry().setFromPoints(pts), latM));
  }

  // cities with pulsing rings
  const gold = new Color('#F5B83D'), rings = [];
  CITIES.forEach(([la, lo], i) => {
    const p = at(la, lo, 1.01);
    const m = new Mesh(new SphereGeometry(0.018, 12, 12), new MeshBasicMaterial({ color: gold })); m.position.copy(p); spin.add(m);
    const ring = new Mesh(new RingGeometry(0.02, 0.032, 32), new MeshBasicMaterial({ color: gold, transparent: true, side: DoubleSide, depthWrite: false }));
    ring.position.copy(p); ring.lookAt(p.clone().multiplyScalar(2)); ring.userData.phase = i * 0.37; spin.add(ring); rings.push(ring);
  });

  // arcs that draw themselves, each with a light travelling along it
  const arcs = [], headM = new MeshBasicMaterial({ color: '#FFF6DA' });
  ROUTES.forEach(([a, b], i) => {
    const pa = at(...CITIES[a], 1.01), pb = at(...CITIES[b], 1.01);
    const mid = pa.clone().add(pb).multiplyScalar(0.5); mid.normalize().multiplyScalar(1 + pa.distanceTo(pb) * 0.42);
    const curve = new QuadraticBezierCurve3(pa, mid, pb), pts = curve.getPoints(80);
    const g = new BufferGeometry().setFromPoints(pts);
    const line = new Line(g, new LineBasicMaterial({ color: '#F5B83D', transparent: true, opacity: 0.55 }));
    g.setDrawRange(0, 0); line.userData = { start: 0.6 + i * 0.18, n: pts.length }; spin.add(line);
    const head = new Mesh(new SphereGeometry(0.014, 10, 10), headM); head.visible = false; spin.add(head);
    const glow = new Sprite(new SpriteMaterial({ map: dot, color: '#F5B83D', transparent: true, depthWrite: false, blending: AdditiveBlending }));
    glow.scale.set(0.12, 0.12, 0.12); head.add(glow);
    arcs.push({ line, curve, head, speed: 0.18 + (i % 4) * 0.05, off: i * 0.23 });
  });

  // atmosphere
  tilt.add(new Mesh(new SphereGeometry(1.18, 64, 64), new ShaderMaterial({
    side: BackSide, transparent: true, depthWrite: false, blending: AdditiveBlending,
    vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
    fragmentShader: 'varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0.,0.,1.)), 3.0); gl_FragColor = vec4(0.45,0.95,0.7,1.0)*i*0.8; }',
  })));

  // dashed orbit with three satellites
  const orbit = new Group(); orbit.rotation.set(1.18, 0.2, 0.35); tilt.add(orbit);
  const op = []; for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.04) op.push(new Vector3(Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0));
  const oLine = new Line(new BufferGeometry().setFromPoints(op), new LineDashedMaterial({ color: '#8FE0B6', transparent: true, opacity: 0.35, dashSize: 0.04, gapSize: 0.06 }));
  oLine.computeLineDistances(); orbit.add(oLine);
  const sats = [0, 2.1, 4.2].map((a, i) => {
    const s = new Sprite(new SpriteMaterial({ map: dot, color: i === 1 ? '#C4B5FD' : '#7DD3FC', transparent: true, depthWrite: false, blending: AdditiveBlending }));
    s.scale.set(0.09, 0.09, 0.09); s.userData.a = a; orbit.add(s); return s;
  });

  // starfield
  const sp = []; for (let i = 0; i < (lite ? 300 : 600); i++) { const v = new Vector3().randomDirection().multiplyScalar(6 + Math.random() * 10); sp.push(v.x, v.y, v.z - 6); }
  const starG = new BufferGeometry(); starG.setAttribute('position', new Float32BufferAttribute(sp, 3));
  const stars = new Points(starG, new PointsMaterial({ size: 0.03, color: '#BFF3D8', transparent: true, opacity: 0.6, map: dot, depthWrite: false }));
  scene.add(stars);

  const size = () => { const w = host.clientWidth, h = host.clientHeight; if (!w || !h) return; gl.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); };
  size();
  const ro = new ResizeObserver(size); ro.observe(host);
  const ptr = { x: 0, y: 0 };
  const onPtr = (e) => { ptr.x = (e.clientX / window.innerWidth - 0.5) * 0.5; ptr.y = (e.clientY / window.innerHeight - 0.5) * 0.35; };
  window.addEventListener('pointermove', onPtr, { passive: true });
  let vis = true;
  const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { threshold: 0 }); io.observe(host);
  const clock = new Clock();
  let raf;
  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!vis || document.hidden) return;
    const t = clock.getElapsedTime(), k = 1 - Math.pow(1 - Math.min(1, t / 1.6), 3);
    tilt.scale.setScalar(0.6 + 0.4 * k); tilt.position.y = -0.6 * (1 - k);
    spin.rotation.y = -2.75 + (reduced ? 0 : t * 0.07);
    tilt.rotation.x += (ptr.y - tilt.rotation.x) * 0.04; tilt.rotation.y += (ptr.x - tilt.rotation.y) * 0.04;
    orbit.rotation.z = t * 0.12; stars.rotation.y = t * 0.01;
    rings.forEach((r) => { const q = (t * 0.7 + r.userData.phase) % 1; r.scale.setScalar(1 + q * 3); r.material.opacity = 0.9 * (1 - q); });
    arcs.forEach(({ line, curve, head, speed, off }) => {
      const { start, n } = line.userData, q = Math.max(0, Math.min(1, (t - start) / 0.8));
      line.geometry.setDrawRange(0, Math.floor(q * n));
      if (q >= 1) { head.visible = true; head.position.copy(curve.getPoint((t * speed + off) % 1)); }
    });
    sats.forEach((s) => { const a = s.userData.a + t * 0.5; s.position.set(Math.cos(a) * 1.55, Math.sin(a) * 1.55, 0); });
    gl.render(scene, cam);
  };
  frame();
  host.classList.add('is-3d');
  return () => {
    cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onPtr);
    scene.traverse((o) => { o.geometry && o.geometry.dispose(); o.material && o.material.dispose(); });
    dot.dispose(); gl.dispose(); gl.domElement.remove(); host.classList.remove('is-3d');
  };
}
