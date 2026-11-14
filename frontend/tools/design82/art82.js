/* Build 82.3: HD 3D still pictures for the numbers band and the onboarding cards (src/assets/images/d82/*.webp).
   Rendered once with three.js in Chromium (tools/design82/render82.cjs); the site only loads the small webp files. */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

const mat = (color, o = {}) =>
  new THREE.MeshPhysicalMaterial({ color, roughness: 0.28, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.12, ...o });
const gold = () => mat('#F2C45A', { metalness: 0.85, roughness: 0.22 });
const rbox = (w, h, d, r, m) => new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 6, r), m);
const sph = (r, m) => new THREE.Mesh(new THREE.SphereGeometry(r, 64, 48), m);
const ring = (r, t, m) => new THREE.Mesh(new THREE.TorusGeometry(r, t, 24, 160), m);

function heartShape(s = 1) {
  const h = new THREE.Shape();
  h.moveTo(0, -1.0 * s);
  h.bezierCurveTo(-0.2 * s, -0.75 * s, -1.25 * s, -0.25 * s, -1.25 * s, 0.35 * s);
  h.bezierCurveTo(-1.25 * s, 0.95 * s, -0.55 * s, 1.15 * s, 0, 0.6 * s);
  h.bezierCurveTo(0.55 * s, 1.15 * s, 1.25 * s, 0.95 * s, 1.25 * s, 0.35 * s);
  h.bezierCurveTo(1.25 * s, -0.25 * s, 0.2 * s, -0.75 * s, 0, -1.0 * s);
  return h;
}
function checkMesh(m, s = 1) {
  const c = new THREE.Shape();
  c.moveTo(-0.55 * s, 0.05 * s); c.lineTo(-0.15 * s, -0.35 * s); c.lineTo(0.6 * s, 0.4 * s);
  c.lineTo(0.45 * s, 0.55 * s); c.lineTo(-0.15 * s, -0.05 * s); c.lineTo(-0.4 * s, 0.2 * s); c.closePath();
  return new THREE.Mesh(new THREE.ExtrudeGeometry(c, { depth: 0.18 * s, bevelEnabled: true, bevelSize: 0.04 * s, bevelThickness: 0.05 * s, bevelSegments: 6 }), m);
}

const SCENES = {
  markets(g) {
    const globe = sph(1.25, mat('#2FD3B8', { roughness: 0.35 }));
    g.add(globe);
    const lm = mat('#0B6F78', { roughness: 0.4 });
    for (const lat of [-0.75, -0.4, 0, 0.4, 0.75]) {
      const r = Math.cos(Math.asin(lat)) * 1.262;
      const t = ring(r, 0.025, lm); t.rotation.x = Math.PI / 2; t.position.y = lat * 1.25; g.add(t);
    }
    for (const a of [0, Math.PI / 3, (2 * Math.PI) / 3]) { const t = ring(1.262, 0.025, lm); t.rotation.y = a; g.add(t); }
    const pin = (lat, lon, c) => {
      const p = new THREE.Group();
      const head = sph(0.2, mat(c)); head.position.y = 0.55; p.add(head);
      const cone = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.42, 32), mat(c)); cone.rotation.x = Math.PI; cone.position.y = 0.27; p.add(cone);
      const v = new THREE.Vector3().setFromSphericalCoords(1.22, Math.PI / 2 - lat, lon);
      p.position.copy(v); p.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().normalize()); g.add(p);
    };
    pin(0.55, 0.3, '#FF6B6B'); pin(0.1, 0.95, '#F2C45A'); pin(-0.35, 0.15, '#6D4AFF'); pin(0.85, 1.2, '#2F6BFF');
    const orbit = ring(1.85, 0.03, gold()); orbit.rotation.set(1.2, 0.2, 0.3); g.add(orbit);
    const moon = sph(0.16, gold()); moon.position.set(1.7, 0.55, 0.4); g.add(moon);
    g.rotation.set(0.25, -0.5, 0);
  },
  services(g) {
    const C = ['#2F6BFF', '#6D4AFF', '#0E9C88', '#F2A93B'];
    const pos = [[-0.62, -0.62, 0.3], [0.62, -0.62, 0.3], [0, -0.62, -0.6], [0, 0.62, 0]];
    pos.forEach((p, i) => { const b = rbox(1.15, 1.15, 1.15, 0.2, mat(C[i])); b.position.set(...p); g.add(b); });
    const s1 = sph(0.22, gold()); s1.position.set(1.35, 0.75, 0.2); g.add(s1);
    const s2 = sph(0.14, mat('#FF7AB6')); s2.position.set(-1.3, 0.85, 0.3); g.add(s2);
    const r = ring(0.42, 0.06, gold()); r.position.set(-1.25, 0.1, 0.9); r.rotation.set(0.9, 0.4, 0); g.add(r);
    g.rotation.set(0.42, -0.7, 0); g.position.y = -0.05;
  },
  projects(g) {
    const base = rbox(3.1, 0.22, 1.4, 0.1, mat('#3A1D6E', { roughness: 0.35 })); base.position.y = -1.05; g.add(base);
    const H = [0.55, 0.9, 1.3, 1.75, 2.25];
    const C = ['#FF9AC8', '#FF7AB6', '#F5559B', '#E33D86', '#C9286F'];
    H.forEach((h, i) => { const b = rbox(0.42, h, 0.5, 0.1, mat(C[i])); b.position.set(-1.12 + i * 0.56, -0.94 + h / 2, 0); g.add(b); });
    const arrow = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.3, 32), gold()); arrow.add(shaft);
    const tip = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.42, 32), gold()); tip.position.y = 1.35; arrow.add(tip);
    arrow.rotation.z = -0.95; arrow.position.set(-0.1, 0.55, 0.55); g.add(arrow);
    g.rotation.set(0.25, -0.45, 0);
  },
  clients(g) {
    const heart = new THREE.Mesh(
      new THREE.ExtrudeGeometry(heartShape(1), { depth: 0.45, bevelEnabled: true, bevelSize: 0.16, bevelThickness: 0.2, bevelSegments: 10, curveSegments: 48 }),
      mat('#FF6F61', { roughness: 0.22 }),
    );
    heart.geometry.center(); heart.position.set(-0.1, 0, 0); g.add(heart);
    const h2 = heart.clone(); h2.material = gold(); h2.scale.setScalar(0.32); h2.position.set(1.35, 0.95, 0.2); h2.rotation.z = -0.3; g.add(h2);
    const h3 = heart.clone(); h3.material = mat('#FFB3C1'); h3.scale.setScalar(0.22); h3.position.set(-1.45, -0.75, 0.3); h3.rotation.z = 0.35; g.add(h3);
    const r = ring(1.75, 0.035, gold()); r.rotation.set(1.25, 0, 0.35); g.add(r);
    const r2 = ring(1.95, 0.02, mat('#FFD7A8')); r2.rotation.set(1.0, 0.5, -0.4); g.add(r2);
    g.rotation.set(0.15, -0.35, 0);
  },
  client(g) {
    const board = rbox(2.0, 2.6, 0.18, 0.12, mat('#2F6BFF')); g.add(board);
    const paper = rbox(1.7, 2.2, 0.06, 0.04, mat('#FFFFFF', { roughness: 0.5, clearcoat: 0.3 })); paper.position.set(0, -0.1, 0.12); g.add(paper);
    const clip = rbox(0.9, 0.36, 0.22, 0.1, gold()); clip.position.set(0, 1.25, 0.14); g.add(clip);
    const lc = ['#C9D6FF', '#C9D6FF', '#E3E9FF', '#E3E9FF'];
    [0.55, 0.15, -0.25, -0.65].forEach((y, i) => {
      const dot = sph(0.09, mat(i < 2 ? '#0E9C88' : '#9DB7FF')); dot.position.set(-0.6, y, 0.2); g.add(dot);
      const l = rbox(i % 2 ? 0.8 : 1.0, 0.1, 0.04, 0.03, mat(lc[i])); l.position.set(-0.05 + (i % 2 ? -0.1 : 0), y, 0.17); g.add(l);
    });
    const badge = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.22, 64), mat('#16B98E')); badge.rotation.x = Math.PI / 2; badge.position.set(0.95, -1.05, 0.45); g.add(badge);
    const ck = checkMesh(mat('#FFFFFF', { roughness: 0.3 }), 0.62); ck.position.set(0.95, -1.05, 0.55); g.add(ck);
    const pen = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 1.9, 32), mat('#6D4AFF')); pen.add(body);
    const nib = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.3, 32), gold()); nib.rotation.x = Math.PI; nib.position.y = -1.1; pen.add(nib);
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.35, 32), gold()); cap.position.y = 0.85; pen.add(cap);
    pen.rotation.set(0.2, 0, -0.65); pen.position.set(1.15, 0.45, 0.55); g.add(pen);
    g.rotation.set(0.12, -0.42, 0.04);
  },
  vendor(g) {
    const box = (w, h, d, c, x, y, z, ry) => {
      const b = new THREE.Group();
      b.add(rbox(w, h, d, 0.08, mat(c, { roughness: 0.45, clearcoat: 0.4 })));
      const tape = rbox(w * 0.22, h + 0.02, d + 0.02, 0.02, mat('#F2C45A', { roughness: 0.35 })); b.add(tape);
      b.position.set(x, y, z); b.rotation.y = ry; g.add(b);
    };
    box(1.5, 1.1, 1.3, '#0E9C88', -0.55, -0.75, 0, 0.1);
    box(1.2, 0.95, 1.1, '#16B9A3', 0.85, -0.82, 0.35, -0.25);
    box(1.05, 0.85, 1.0, '#0A6B66', -0.35, 0.22, 0.05, 0.35);
    const globe = sph(0.48, mat('#9FE7DC', { roughness: 0.3 })); globe.position.set(1.0, 0.55, 0.2); g.add(globe);
    const gr = ring(0.72, 0.035, gold()); gr.position.copy(globe.position); gr.rotation.set(1.1, 0.3, 0.2); g.add(gr);
    const link = ring(0.28, 0.07, gold()); link.position.set(-1.35, 0.55, 0.6); link.rotation.set(0.4, 0.9, 0); g.add(link);
    const link2 = ring(0.28, 0.07, mat('#FFFFFF')); link2.position.set(-1.1, 0.75, 0.6); link2.rotation.set(1.3, 0.2, 0.5); g.add(link2);
    g.rotation.set(0.32, -0.55, 0);
  },
};

export function renderArt(canvas, kind) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  r.setPixelRatio(1); r.setSize(canvas.clientWidth, canvas.clientHeight, false);
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 0.78; r.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const pm = new THREE.PMREMGenerator(r);
  scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture;
  const key = new THREE.DirectionalLight('#ffffff', 2.2); key.position.set(3, 5, 4); scene.add(key);
  const rim = new THREE.DirectionalLight('#9DB7FF', 1.0); rim.position.set(-4, 2, -3); scene.add(rim);
  const cam = new THREE.PerspectiveCamera(32, canvas.clientWidth / canvas.clientHeight, 0.1, 50);
  cam.position.set(0, 0, 8.2);
  const g = new THREE.Group(); SCENES[kind](g); scene.add(g);
  r.render(scene, cam);
}
