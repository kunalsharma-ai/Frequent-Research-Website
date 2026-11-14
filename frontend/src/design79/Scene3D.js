/*
 * Build 79, new design: the live 3D scenes (three.js). One scene per world:
 *   globe  home page: a globe of 4,000 land points, light arcs from our Delhi HQ to the markets we field in, and four
 *          satellites in the colours of the four platforms
 *   mr     Market Research ("Aurora"): an insight lens with three rings of respondents and a sonar pulse
 *   dm     Digital Marketing ("Neon Pop"): an iridescent knot, 3D hearts, play buttons and pills floating up
 *   it     IT & Development ("Terminal"): a scrolling circuit grid, a wireframe core and cubes that build a stack
 *   af     Accounts & Finance ("Gilded Ledger"): gold coin stacks that grow and a rising profit line
 *
 * mountScene(canvas, kind, { theme, still }) -> { setTheme(theme), dispose() }
 * This file (and three.js) is only downloaded on desktops with WebGL, after the page has started (Stage79.jsx); phones,
 * reduced motion and the first paint use the still pictures rendered from the same scenes (src/assets/images/d79/,
 * tools/design79/render-posters.cjs).
 */
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLOBE_LAND } from './globeLand.js';

const C = (h) => new THREE.Color(h);
export const D79_PALETTES = {
  globe: { a: "#2F6BFF", b: "#6D4AFF", c: "#22D3EE", dk: "#0B1437", sats: ["#14B8A6", "#FF2E88", "#B6FF3B", "#D4A84F"] },
  mr: { a: "#14B8A6", b: "#22D3EE", c: "#A7F3D0", dk: "#04141C" },
  dm: { a: "#FF2E88", b: "#FF7A1A", c: "#FFD23F", dk: "#1A0820" },
  it: { a: "#B6FF3B", b: "#7C5CFF", c: "#3DA9FC", dk: "#0B0D10" },
  af: { a: "#D4A84F", b: "#F3D58A", c: "#0E1B3D", dk: "#0E1B3D" },
};
const ll = (lat, lon, r) => {
  const p = (90 - lat) * Math.PI / 180, t = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(-r * Math.sin(p) * Math.cos(t), r * Math.cos(p), r * Math.sin(p) * Math.sin(t));
};
const rnd = (a, b) => a + Math.random() * (b - a);

/* ---------- shared bits ---------- */
function starField(n, r0, r1, color) {
  const g = new THREE.BufferGeometry(), p = new Float32Array(n * 3), s = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(rnd(r0, r1));
    p.set([v.x, v.y, v.z], i * 3); s[i] = Math.random();
  }
  g.setAttribute("position", new THREE.BufferAttribute(p, 3));
  g.setAttribute("seed", new THREE.BufferAttribute(s, 1));
  const m = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uT: { value: 0 }, uC: { value: C(color) }, uPR: { value: 1 }, uA: { value: 1 } },
    vertexShader: `attribute float seed; uniform float uT; uniform float uPR; varying float vA; varying float vS;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); gl_Position = projectionMatrix * mv;
        vS = seed; vA = 0.35 + 0.65 * (0.5 + 0.5 * sin(uT * (0.6 + seed * 1.8) + seed * 40.0));
        gl_PointSize = (1.2 + seed * 2.2) * uPR * (10.0 / -mv.z); }`,
    fragmentShader: `uniform vec3 uC; uniform float uA; varying float vA; varying float vS;
      void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(uC, vA * uA * smoothstep(0.5, 0.0, d)); }`,
  });
  const pts = new THREE.Points(g, m);
  pts.userData.tick = (t) => (m.uniforms.uT.value = t);
  return pts;
}
function glow(radius, color, power = 2.6, strength = 1) {
  const m = new THREE.ShaderMaterial({
    transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uC: { value: C(color) }, uP: { value: power }, uS: { value: strength } },
    vertexShader: `varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0);
      vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 uC; uniform float uP; uniform float uS; varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(max(0.0, -dot(vN, vV)), uP); gl_FragColor = vec4(uC, f * uS); }`,
  });
  return new THREE.Mesh(new THREE.SphereGeometry(radius, 64, 48), m);
}
function heartShape(s = 1) {
  const h = new THREE.Shape();
  h.moveTo(0, -0.9 * s);
  h.bezierCurveTo(-0.15 * s, -0.75 * s, -1 * s, -0.25 * s, -1 * s, 0.25 * s);
  h.bezierCurveTo(-1 * s, 0.75 * s, -0.45 * s, 0.95 * s, 0, 0.5 * s);
  h.bezierCurveTo(0.45 * s, 0.95 * s, 1 * s, 0.75 * s, 1 * s, 0.25 * s);
  h.bezierCurveTo(1 * s, -0.25 * s, 0.15 * s, -0.75 * s, 0, -0.9 * s);
  return h;
}
const extrude = (shape, depth = 0.3) => {
  const g = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 6, curveSegments: 24 });
  g.center();
  return g;
};

/* ---------- home: the globe ---------- */
function sceneGlobe(ctx) {
  const P = D79_PALETTES.globe, R = 1.55, root = new THREE.Group();
  const globe = new THREE.Group();
  globe.rotation.z = 0.32;
  root.add(globe);
  // land points
  const n = GLOBE_LAND.length / 2, pos = new Float32Array(n * 3), seed = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const v = ll(GLOBE_LAND[i * 2] / 10, GLOBE_LAND[i * 2 + 1] / 10, R);
    pos.set([v.x, v.y, v.z], i * 3); seed[i] = Math.random();
  }
  const lg = new THREE.BufferGeometry();
  lg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  lg.setAttribute("seed", new THREE.BufferAttribute(seed, 1));
  const lm = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uT: { value: 0 }, uA: { value: C(P.a) }, uB: { value: C(P.b) }, uC: { value: C(P.c) }, uPR: { value: 1 }, uDark: { value: 1 } },
    vertexShader: `attribute float seed; uniform float uT; uniform float uPR; varying float vF; varying float vS; varying float vY;
      void main(){ vec4 mv = modelViewMatrix * vec4(position,1.0); vec3 n = normalize(normalMatrix * normalize(position));
        vF = dot(n, normalize(-mv.xyz)); vS = seed; vY = position.y;
        gl_Position = projectionMatrix * mv; gl_PointSize = (4.2 + 2.4 * step(0.985, seed)) * uPR * (5.5 / -mv.z); }`,
    fragmentShader: `uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uT; uniform float uDark; varying float vF; varying float vS; varying float vY;
      void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
        float wave = 0.5 + 0.5 * sin(vY * 3.2 - uT * 1.4 + vS * 2.0);
        vec3 col = mix(mix(uA, uB, smoothstep(-1.2, 1.2, vY)), uC, wave * 0.55);
        float front = smoothstep(-0.25, 0.35, vF); float hot = step(0.985, vS) * (0.5 + 0.5 * sin(uT * 3.0 + vS * 90.0));
        float a = mix(0.10, 1.0, front) * smoothstep(0.5, 0.15, d);
        gl_FragColor = vec4(col + hot * 0.6, a * (0.85 + 0.15 * uDark)); }`,
  });
  const land = new THREE.Points(lg, lm);
  land.renderOrder = 3;
  lm.blending = THREE.AdditiveBlending;
  globe.add(land);
  // the sea: a dark glassy core that hides the back of the globe a little
  const core = new THREE.Mesh(new THREE.SphereGeometry(R * 0.985, 64, 48), new THREE.MeshStandardMaterial({ color: P.dk, roughness: 0.8, metalness: 0.0, envMapIntensity: 0.12, transparent: true, opacity: 0.9 }));
  core.renderOrder = 1;
  globe.add(core);
  const atmo = glow(R * 1.3, P.a, 2.6, 1.5);
  atmo.renderOrder = 4;
  root.add(atmo);
  // arcs from Delhi to the markets
  const HQ = [28.6, 77.2];
  const MK = [[38, -97], [52, -1], [51, 10], [-14, -51], [36, 138], [-25, 133], [-29, 24], [24, 54], [1.3, 103.8], [56, -106], [23, -102], [46, 2], [35, 104], [40, -4], [42, 12], [-34, -64], [9, 8], [60, 100], [37, 127], [-1, 37]];
  const arcCols = [D79_PALETTES.mr.a, D79_PALETTES.dm.a, D79_PALETTES.it.a, D79_PALETTES.af.a];
  const arcs = [];
  const a0 = ll(HQ[0], HQ[1], R);
  MK.forEach(([la, lo], i) => {
    const b0 = ll(la, lo, R), d = a0.distanceTo(b0);
    const mid = a0.clone().add(b0).multiplyScalar(0.5).normalize().multiplyScalar(R + d * 0.42);
    const curve = new THREE.QuadraticBezierCurve3(a0, mid, b0), N = 64;
    const g = new THREE.BufferGeometry().setFromPoints(curve.getPoints(N));
    const tt = new Float32Array(N + 1); for (let k = 0; k <= N; k++) tt[k] = k / N;
    g.setAttribute("t", new THREE.BufferAttribute(tt, 1));
    const m = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uT: { value: 0 }, uO: { value: i * 0.37 }, uC: { value: C(arcCols[i % 4]) } },
      vertexShader: `attribute float t; varying float vT; void main(){ vT = t; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform float uT; uniform float uO; uniform vec3 uC; varying float vT;
        void main(){ float h = fract(uT * 0.22 + uO); float a = smoothstep(0.22, 0.0, abs(vT - h * 1.3 + 0.15)) ; gl_FragColor = vec4(uC, 0.22 + a * 0.95); }`,
    });
    const line = new THREE.Line(g, m);
    globe.add(line); arcs.push(m);
    // a pulse ring where the arc lands
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.02, 0.035, 24), new THREE.MeshBasicMaterial({ color: arcCols[i % 4], transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    ring.position.copy(b0.clone().multiplyScalar(1.004)); ring.lookAt(b0.clone().multiplyScalar(2));
    ring.userData.o = i * 0.37;
    globe.add(ring); arcs.push(ring);
  });
  const hq = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), new THREE.MeshBasicMaterial({ color: "#FFC27A" }));
  hq.position.copy(a0); globe.add(hq);
  // four satellites, one per platform
  const sats = P.sats.map((col, i) => {
    const orbit = new THREE.Group();
    orbit.rotation.set(rnd(-0.5, 0.5) + (i % 2 ? 0.9 : -0.6), 0, i * 0.7);
    const s = new THREE.Group();
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.11, 32, 24), new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.15, metalness: 0.3, clearcoat: 1, emissive: col, emissiveIntensity: 0.25 }));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.012, 12, 64), new THREE.MeshStandardMaterial({ color: col, metalness: 0.8, roughness: 0.2 }));
    ring.rotation.x = 1.2;
    s.add(ball, ring);
    const r = 2.15 + i * 0.16;
    const path = new THREE.Mesh(new THREE.TorusGeometry(r, 0.0035, 6, 200), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: 0.32 }));
    path.rotation.x = Math.PI / 2;
    orbit.add(path, s);
    root.add(orbit);
    return { s, r, sp: 0.16 + i * 0.035, ph: i * 1.6 };
  });
  const stars = starField(900, 6, 14, "#ffffff");
  root.add(stars);
  return {
    root, cam: [0, 0, 6.7],
    theme(dark) {
      lm.uniforms.uDark.value = dark ? 1 : 0; lm.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending; lm.needsUpdate = true;
      lm.uniforms.uA.value = C(dark ? P.a : "#1D3FD8"); lm.uniforms.uB.value = C(dark ? P.b : "#5B2EE0"); lm.uniforms.uC.value = C(dark ? P.c : "#0A8FB0");
      core.material.color = C(dark ? P.dk : "#E8EEFF"); core.material.opacity = dark ? 0.82 : 0.6;
      atmo.material.uniforms.uS.value = dark ? 1.1 : 0.55;
      stars.material.uniforms.uC.value = C(dark ? "#ffffff" : "#5B6BFF"); stars.material.uniforms.uA.value = dark ? 1 : 0.5;
      arcs.forEach((m) => m.blending !== undefined && m.uniforms && (m.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending, m.needsUpdate = true));
    },
    update(t) {
      globe.rotation.y = t * 0.06;
      lm.uniforms.uT.value = t; stars.userData.tick(t);
      arcs.forEach((m) => {
        if (m.uniforms) m.uniforms.uT.value = t;
        else { const k = (t * 0.22 + m.userData.o) % 1; m.scale.setScalar(1 + k * 3); m.material.opacity = 1 - k; }
      });
      sats.forEach((x) => { const a = t * x.sp + x.ph; x.s.position.set(Math.cos(a) * x.r, 0, Math.sin(a) * x.r); x.s.rotation.y = t; });
    },
    pr(v) { lm.uniforms.uPR.value = v; stars.material.uniforms.uPR.value = v; },
  };
}

/* ---------- Market Research: the insight lens ---------- */
function sceneMR() {
  const P = D79_PALETTES.mr, root = new THREE.Group();
  const lens = new THREE.Mesh(new THREE.SphereGeometry(0.95, 96, 64), new THREE.MeshPhysicalMaterial({ color: "#bff7ef", roughness: 0.04, metalness: 0, transmission: 0.92, thickness: 1.2, ior: 1.35, iridescence: 1, iridescenceIOR: 1.4, clearcoat: 1, transparent: true }));
  const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 3), new THREE.MeshStandardMaterial({ color: P.a, emissive: P.a, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.2, flatShading: true }));
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.08, 0.075, 32, 160), new THREE.MeshStandardMaterial({ color: "#e6fffb", metalness: 0.9, roughness: 0.18 }));
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 1.3, 32), new THREE.MeshStandardMaterial({ color: "#0f766e", metalness: 0.6, roughness: 0.25 }));
  handle.position.set(1.15, -1.15, 0); handle.rotation.z = Math.PI / 4;
  const lensG = new THREE.Group(); lensG.add(lens, inner, rim, handle); lensG.rotation.set(0.15, -0.35, 0.1);
  root.add(lensG);
  // three rings of respondents: consumers, professionals, healthcare
  const rings = [[1.75, P.a, 0.35, 220], [2.15, P.b, -0.25, 260], [2.55, P.c, 0.18, 300]].map(([r, col, sp, n], k) => {
    const g = new THREE.BufferGeometry(), p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, j = rnd(-0.08, 0.08); p.set([Math.cos(a) * (r + j), rnd(-0.05, 0.05), Math.sin(a) * (r + j)], i * 3); }
    g.setAttribute("position", new THREE.BufferAttribute(p, 3));
    const m = new THREE.PointsMaterial({ color: col, size: 0.05, transparent: true, opacity: 0.95, depthWrite: false });
    const pts = new THREE.Points(g, m);
    const grp = new THREE.Group(); grp.add(pts); grp.rotation.set(1.15 + k * 0.18, 0, k * 0.5 - 0.4);
    root.add(grp);
    return { pts, sp, m };
  });
  // survey results: a ring of bars that rise and fall
  const NB = 36, bars = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 1, 0.07), new THREE.MeshStandardMaterial({ color: P.b, emissive: P.a, emissiveIntensity: 0.35, metalness: 0.3, roughness: 0.3 }), NB);
  const barG = new THREE.Group(); barG.add(bars); barG.position.y = -1.55; root.add(barG);
  const sonar = [0, 1, 2].map((i) => {
    const m = new THREE.Mesh(new THREE.RingGeometry(0.98, 1.0, 128), new THREE.MeshBasicMaterial({ color: P.b, transparent: true, side: THREE.DoubleSide, depthWrite: false }));
    m.rotation.x = -Math.PI / 2; m.position.y = -1.55; m.userData.o = i / 3; root.add(m); return m;
  });
  const stars = starField(500, 5, 12, P.c); root.add(stars);
  const o = new THREE.Object3D();
  return {
    root, cam: [0, 0.2, 6.4],
    theme(dark) { rings.forEach((r, i) => (r.m.color = C(dark ? [P.a, P.b, P.c][i] : ["#0f766e", "#0891b2", "#059669"][i]))); stars.material.uniforms.uA.value = dark ? 1 : 0.6; stars.material.uniforms.uC.value = C(dark ? P.c : "#0f766e"); },
    update(t) {
      lensG.rotation.y = -0.35 + Math.sin(t * 0.4) * 0.35; lensG.position.y = Math.sin(t * 0.8) * 0.08;
      inner.rotation.set(t * 0.3, t * 0.4, 0);
      rings.forEach((r) => (r.pts.rotation.y = t * r.sp));
      for (let i = 0; i < NB; i++) {
        const a = (i / NB) * Math.PI * 2, h = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * 1.6 + i * 0.7)) * (0.5 + 0.5 * Math.sin(i * 1.3));
        o.position.set(Math.cos(a) * 2.2, h / 2, Math.sin(a) * 2.2); o.scale.set(1, h, 1); o.updateMatrix(); bars.setMatrixAt(i, o.matrix);
      }
      bars.instanceMatrix.needsUpdate = true; barG.rotation.y = t * 0.1;
      sonar.forEach((m) => { const k = (t * 0.3 + m.userData.o) % 1; m.scale.setScalar(0.6 + k * 2.6); m.material.opacity = (1 - k) * 0.7; });
      stars.userData.tick(t);
    },
    pr(v) { stars.material.uniforms.uPR.value = v; },
  };
}

/* ---------- Digital Marketing: neon pop ---------- */
function sceneDM() {
  const P = D79_PALETTES.dm, root = new THREE.Group();
  const knotM = new THREE.ShaderMaterial({
    uniforms: { uT: { value: 0 }, uA: { value: C(P.a) }, uB: { value: C(P.b) }, uC: { value: C(P.c) } },
    vertexShader: `varying vec3 vN; varying vec3 vP; varying vec3 vV; void main(){ vN = normalize(normalMatrix * normal); vP = position; vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform float uT; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; varying vec3 vN; varying vec3 vP; varying vec3 vV;
      void main(){ float k = 0.5 + 0.5 * sin(vP.x * 2.2 + vP.y * 1.7 + uT * 1.2); float k2 = 0.5 + 0.5 * sin(vP.z * 2.5 - uT * 0.9);
        vec3 col = mix(mix(uA, uB, k), uC, k2 * 0.6); float fr = pow(1.0 - max(0.0, dot(vN, vV)), 2.0);
        float spec = pow(max(0.0, dot(reflect(-normalize(vec3(0.4,0.8,0.6)), vN), vV)), 24.0);
        gl_FragColor = vec4(col * (0.75 + 0.35 * dot(vN, normalize(vec3(0.3,0.9,0.5)))) + fr * 0.55 + spec * 0.6, 1.0); }`,
  });
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.85, 0.28, 260, 40, 2, 3), knotM);
  root.add(knot);
  const glossy = (col) => new THREE.MeshPhysicalMaterial({ color: col, roughness: 0.12, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.05, sheen: 0.4 });
  const heartG = extrude(heartShape(0.42), 0.18);
  const play = new THREE.Shape(); play.moveTo(-0.3, -0.36); play.lineTo(0.42, 0); play.lineTo(-0.3, 0.36); play.lineTo(-0.3, -0.36);
  const playG = extrude(play, 0.14);
  const pillG = new THREE.CapsuleGeometry(0.13, 0.36, 8, 24);
  const items = [];
  const kinds = [[heartG, P.a], [playG, P.c], [pillG, P.b], [heartG, P.b], [playG, P.a], [pillG, P.c], [heartG, P.c], [new THREE.SphereGeometry(0.16, 32, 24), P.a], [new THREE.TorusGeometry(0.18, 0.07, 20, 48), P.c], [pillG, P.a], [heartG, P.a], [new THREE.SphereGeometry(0.12, 32, 24), P.b]];
  kinds.forEach(([g, col], i) => {
    const m = new THREE.Mesh(g, glossy(col));
    const a = (i / kinds.length) * Math.PI * 2;
    m.userData = { a, r: rnd(1.7, 2.5), y0: rnd(-1.6, 1.6), sp: rnd(0.25, 0.5), rs: rnd(0.4, 1.2) };
    m.scale.setScalar(rnd(0.8, 1.25));
    root.add(m); items.push(m);
  });
  // megaphone
  const mega = new THREE.Group();
  const cone = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.14, 0.75, 48, 1, true), new THREE.MeshPhysicalMaterial({ color: P.c, roughness: 0.2, clearcoat: 1, side: THREE.DoubleSide }));
  const grip = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.3, 24), glossy(P.a)); grip.position.y = -0.5;
  mega.add(cone, grip); mega.rotation.z = -1.1; mega.position.set(-2.1, 1.0, -0.4); mega.scale.setScalar(0.85);
  root.add(mega);
  const conf = starField(400, 2.2, 6, P.c); root.add(conf);
  return {
    root, cam: [0, 0, 6.6],
    theme(dark) { conf.material.uniforms.uC.value = C(dark ? P.c : P.a); conf.material.uniforms.uA.value = dark ? 1 : 0.7; },
    update(t) {
      knot.rotation.set(t * 0.25, t * 0.33, 0); knotM.uniforms.uT.value = t;
      items.forEach((m) => { const u = m.userData, a = u.a + t * u.sp * 0.4; m.position.set(Math.cos(a) * u.r, ((u.y0 + t * u.sp * 0.5 + 2) % 4) - 2, Math.sin(a) * u.r * 0.6); m.rotation.set(t * u.rs * 0.5, t * u.rs, 0); });
      mega.rotation.y = Math.sin(t * 0.8) * 0.4; mega.position.y = 1.0 + Math.sin(t * 1.1) * 0.12;
      conf.userData.tick(t); conf.rotation.y = t * 0.05;
    },
    pr(v) { conf.material.uniforms.uPR.value = v; },
  };
}

/* ---------- IT & Development: terminal ---------- */
function sceneIT() {
  const P = D79_PALETTES.it, root = new THREE.Group();
  const gridM = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    uniforms: { uT: { value: 0 }, uA: { value: C(P.a) }, uB: { value: C(P.b) }, uO: { value: 1 } },
    vertexShader: `varying vec2 vU; void main(){ vU = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform float uT; uniform vec3 uA; uniform vec3 uB; uniform float uO; varying vec2 vU;
      void main(){ vec2 g = vU * vec2(28.0, 28.0); g.y += uT * 1.4; vec2 f = abs(fract(g) - 0.5);
        float l = 1.0 - smoothstep(0.0, 0.05, min(f.x, f.y)); float fade = smoothstep(1.0, 0.25, vU.y) * smoothstep(0.0, 0.2, vU.y);
        float node = 1.0 - smoothstep(0.0, 0.09, length(f - 0.5)); vec3 col = mix(uA, uB, vU.x);
        gl_FragColor = vec4(col, (l * 0.55 + node * 0.9) * fade * uO); }`,
  });
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), gridM); grid.rotation.x = -Math.PI / 2; grid.position.y = -1.6; root.add(grid);
  const coreG = new THREE.Group();
  const wire = new THREE.Mesh(new THREE.IcosahedronGeometry(1.0, 1), new THREE.MeshBasicMaterial({ color: P.a, wireframe: true, transparent: true, opacity: 0.85 }));
  const solid = new THREE.Mesh(new THREE.IcosahedronGeometry(0.62, 0), new THREE.MeshPhysicalMaterial({ color: P.b, emissive: P.b, emissiveIntensity: 0.4, roughness: 0.15, metalness: 0.4, clearcoat: 1, flatShading: true }));
  const shell = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.02, 8, 120), new THREE.MeshBasicMaterial({ color: P.c }));
  coreG.add(wire, solid, shell); coreG.position.set(0.9, 0.35, 0); root.add(coreG);
  // cubes that fly in and build a stack, then fly out again
  const N = 27, cubes = new THREE.InstancedMesh(new THREE.BoxGeometry(0.26, 0.26, 0.26), new THREE.MeshPhysicalMaterial({ roughness: 0.25, metalness: 0.2, clearcoat: 1 }), N);
  const home = [], from = [], cols = [P.a, P.b, P.c];
  for (let i = 0; i < N; i++) {
    home.push(new THREE.Vector3((i % 3) * 0.29 - 0.29, Math.floor(i / 9) * 0.29 - 0.9, (Math.floor(i / 3) % 3) * 0.29 - 0.29));
    from.push(new THREE.Vector3().randomDirection().multiplyScalar(rnd(2.5, 4)));
    cubes.setColorAt(i, C(cols[i % 3]));
  }
  const stackG = new THREE.Group(); stackG.add(cubes); stackG.position.set(-1.5, 0, 0.3); root.add(stackG);
  // the brackets </> made of bars
  const bar = (w, h, rz, x, y) => { const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.1), new THREE.MeshStandardMaterial({ color: P.a, emissive: P.a, emissiveIntensity: 0.7 })); m.position.set(x, y, 0); m.rotation.z = rz; return m; };
  const tag = new THREE.Group();
  tag.add(bar(0.42, 0.09, 0.6, -0.5, 0.11), bar(0.42, 0.09, -0.6, -0.5, -0.11), bar(0.09, 0.8, -0.35, 0, 0), bar(0.42, 0.09, -0.6, 0.5, 0.11), bar(0.42, 0.09, 0.6, 0.5, -0.11));
  tag.position.set(0.9, 1.75, -0.6); tag.scale.setScalar(0.6); root.add(tag);
  const bits = starField(500, 3, 10, P.a); root.add(bits);
  const o = new THREE.Object3D();
  return {
    root, cam: [0, 0.6, 6.4],
    theme(dark) { gridM.uniforms.uO.value = dark ? 1 : 0.8; gridM.uniforms.uA.value = C(dark ? P.a : "#3F8F00"); wire.material.color = C(dark ? P.a : "#3F8F00"); bits.material.uniforms.uC.value = C(dark ? P.a : P.b); bits.material.uniforms.uA.value = dark ? 1 : 0.6; tag.children.forEach((m) => { m.material.color = C(dark ? P.a : "#3F8F00"); m.material.emissive = C(dark ? P.a : "#2a6000"); }); },
    update(t) {
      gridM.uniforms.uT.value = t;
      wire.rotation.set(t * 0.2, t * 0.3, 0); solid.rotation.set(-t * 0.4, t * 0.25, 0); shell.rotation.set(1.2 + Math.sin(t * 0.5) * 0.2, t * 0.4, 0);
      const cyc = (t % 9) / 9, k = cyc < 0.45 ? Math.min(1, cyc / 0.4) : cyc < 0.8 ? 1 : 1 - (cyc - 0.8) / 0.2;
      for (let i = 0; i < N; i++) {
        const d = Math.min(1, Math.max(0, k * 1.6 - (i / N) * 0.6)), e = 1 - Math.pow(1 - d, 3);
        o.position.lerpVectors(from[i], home[i], e); o.rotation.set((1 - e) * 3 + i, (1 - e) * 2, 0); o.updateMatrix(); cubes.setMatrixAt(i, o.matrix);
      }
      cubes.instanceMatrix.needsUpdate = true; stackG.rotation.y = t * 0.35;
      tag.position.y = 1.75 + Math.sin(t * 1.2) * 0.1; tag.rotation.y = Math.sin(t * 0.6) * 0.5;
      bits.userData.tick(t); bits.position.y = ((t * 0.2) % 2) - 1;
    },
    pr(v) { bits.material.uniforms.uPR.value = v; },
  };
}

/* ---------- Accounts & Finance: gilded ledger ---------- */
function sceneAF() {
  const P = D79_PALETTES.af, root = new THREE.Group();
  const gold = new THREE.MeshPhysicalMaterial({ color: "#E2B65C", metalness: 1, roughness: 0.22, clearcoat: 0.6, clearcoatRoughness: 0.15 });
  const coinG = new THREE.CylinderGeometry(0.34, 0.34, 0.08, 64);
  const STACKS = [4, 7, 10, 14], per = STACKS.reduce((a, b) => a + b, 0);
  const coins = new THREE.InstancedMesh(coinG, gold, per);
  const stackG = new THREE.Group(); stackG.add(coins); stackG.position.set(0, -1.45, 0); root.add(stackG);
  // the profit line over the stacks
  const pts = [new THREE.Vector3(-1.9, -0.6, 0.5), new THREE.Vector3(-0.9, -0.2, 0.5), new THREE.Vector3(0, 0.05, 0.5), new THREE.Vector3(0.75, 0.55, 0.5), new THREE.Vector3(1.75, 1.35, 0.5)];
  const curve = new THREE.CatmullRomCurve3(pts);
  const tubeM = new THREE.MeshStandardMaterial({ color: "#16A34A", emissive: "#16A34A", emissiveIntensity: 0.45, metalness: 0.3, roughness: 0.3 });
  const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 160, 0.045, 12), tubeM);
  tube.geometry.setDrawRange(0, 0);
  const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.13, 0.3, 32), tubeM);
  root.add(tube, arrow);
  // a big standing coin, turning
  const big = new THREE.Group();
  const face = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.12, 96), gold);
  face.rotation.x = Math.PI / 2;
  const rimT = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.035, 16, 96), gold);
  rimT.position.z = 0.07;
  const rimT2 = rimT.clone(); rimT2.position.z = -0.07;
  big.add(face, rimT, rimT2); big.position.set(-1.6, 1.15, -0.6); root.add(big);
  const dust = starField(350, 2.5, 8, "#F3D58A"); root.add(dust);
  const o = new THREE.Object3D();
  return {
    root, cam: [0, 0.3, 6.2],
    theme(dark) { dust.material.uniforms.uA.value = dark ? 1 : 0.8; dust.material.uniforms.uC.value = C(dark ? "#F3D58A" : "#B8862B"); },
    update(t) {
      const cyc = (t % 12) / 12, grow = Math.min(1, cyc / 0.3) * (cyc > 0.94 ? 0 : 1);
      let idx = 0;
      STACKS.forEach((n, s) => {
        for (let i = 0; i < n; i++) {
          const show = Math.min(1, Math.max(0, grow * (n + 2) - i - s * 0.5));
          o.position.set(-1.35 + s * 0.9, i * 0.085 + (1 - show) * 1.5, 0); o.rotation.set(0, i * 0.4, 0); o.scale.setScalar(show > 0.01 ? 1 : 0.0001); o.updateMatrix(); coins.setMatrixAt(idx++, o.matrix);
        }
      });
      coins.instanceMatrix.needsUpdate = true;
      const k = Math.min(1, Math.max(0, (cyc - 0.12) / 0.35)) * (cyc > 0.94 ? 0 : 1), cnt = Math.floor(k * 160) * 12 * 6;
      tube.geometry.setDrawRange(0, cnt);
      const pt = curve.getPointAt(Math.max(0.001, k)), tg = curve.getTangentAt(Math.max(0.001, k));
      arrow.position.copy(pt); arrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), tg); arrow.visible = k > 0.02;
      big.rotation.y = t * 0.9; big.position.y = 1.15 + Math.sin(t * 1.3) * 0.08;
      stackG.rotation.y = Math.sin(t * 0.3) * 0.25;
      dust.userData.tick(t); dust.rotation.y = -t * 0.04;
    },
    pr(v) { dust.material.uniforms.uPR.value = v; },
  };
}

const SCENES = { globe: sceneGlobe, mr: sceneMR, dm: sceneDM, it: sceneIT, af: sceneAF };

export function mountScene(canvas, kind, { theme = "light", still = false, time = 6 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: !!still });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  scene.add(new THREE.AmbientLight("#ffffff", 0.5));
  const key = new THREE.DirectionalLight("#ffffff", 2.2); key.position.set(3, 4, 5); scene.add(key);
  const rimL = new THREE.PointLight(D79_PALETTES[kind]?.b || "#6D4AFF", 18, 20); rimL.position.set(-4, 1, -2); scene.add(rimL);
  const S = (SCENES[kind] || sceneGlobe)({});
  scene.add(S.root);
  cam.position.set(...S.cam);
  cam.lookAt(0, 0, 0);
  const pr = Math.min(window.devicePixelRatio || 1, still ? 2 : 1.75);
  renderer.setPixelRatio(pr);
  S.pr && S.pr(pr);
  let w = 0, h = 0;
  const size = () => {
    const r = canvas.parentElement.getBoundingClientRect();
    if (Math.abs(r.width - w) < 1 && Math.abs(r.height - h) < 1) return;
    w = r.width; h = r.height;
    renderer.setSize(w, h, false);
    cam.aspect = w / Math.max(1, h);
    // keep the whole scene in view on narrow frames
    cam.position.z = S.cam[2] * Math.max(1, 1.15 / cam.aspect);
    cam.updateProjectionMatrix();
  };
  const setTheme = (t) => S.theme && S.theme(t === "dark");
  setTheme(theme);
  size();
  // pointer parallax
  let px = 0, py = 0, tx = 0, ty = 0;
  const onMove = (e) => { tx = (e.clientX / innerWidth - 0.5) * 0.5; ty = (e.clientY / innerHeight - 0.5) * 0.3; };
  window.addEventListener("pointermove", onMove, { passive: true });
  const ro = "ResizeObserver" in window ? new ResizeObserver(size) : null;
  ro && ro.observe(canvas.parentElement);
  let vis = true, raf = 0, t0 = performance.now(), last = 0, acc = 0;
  const io = !still && "IntersectionObserver" in window ? new IntersectionObserver(([e]) => { vis = e.isIntersecting; if (vis && !raf) loop(performance.now()); }) : null;
  io && io.observe(canvas);
  const frame = (t) => {
    px += (tx - px) * 0.05; py += (ty - py) * 0.05;
    S.root.rotation.y = px; S.root.rotation.x = py;
    S.update(t);
    renderer.render(scene, cam);
  };
  function loop(now) {
    raf = 0;
    if (!vis || document.hidden) return;
    const dt = Math.min(0.05, (now - (last || now)) / 1000); last = now; acc += dt;
    frame(acc);
    raf = requestAnimationFrame(loop);
  }
  const onVis = () => { if (still) return; if (!document.hidden && vis && !raf) { last = 0; raf = requestAnimationFrame(loop); } };
  document.addEventListener("visibilitychange", onVis);
  if (still) frame(time);
  else raf = requestAnimationFrame(loop);
  return {
    setTheme: (t) => { setTheme(t); if (still) frame(time); },
    frame,
    dispose() {
      cancelAnimationFrame(raf); raf = -1; vis = false;
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      ro && ro.disconnect(); io && io.disconnect();
      scene.traverse((o) => { o.geometry && o.geometry.dispose(); const m = o.material; if (m) (Array.isArray(m) ? m : [m]).forEach((x) => x.dispose()); });
      pmrem.dispose(); renderer.dispose();
    },
  };
}
