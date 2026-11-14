/**
 * Hero 3D scene: the SampCode mark (two code chevrons around a diamond core) extruded into glass-like
 * 3D, orbited by a galaxy of "respondent" particles and three streams flowing in (answers) and out (data).
 * Plain three.js, no React wrapper, so it is easy to tune. Returns a cleanup function.
 */
import * as THREE from 'three';
import { pzRaf, pzCancel } from '../../_shell/pzRaf.js';

const CYAN = new THREE.Color('#22D3EE');
const ICE = new THREE.Color('#7EE8FA');
const INDIGO = new THREE.Color('#6366F1');
const PURPLE = new THREE.Color('#A855F7');
const PINK = new THREE.Color('#FF7AB6');

// Logo polygons from the SampCode SVG (64 x 64 box, y down).
const LEFT = [[26, 8], [6, 32], [26, 56], [38, 56], [18, 32], [38, 8]];
const RIGHT = [[38, 8], [58, 32], [38, 56], [26, 56], [46, 32], [26, 8]];
const CORE = [[32, 25], [39, 32], [32, 39], [25, 32]];

function shapeFrom(points, scale = 0.085) {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const px = (x - 32) * scale;
    const py = -(y - 32) * scale;
    if (i === 0) s.moveTo(px, py);
    else s.lineTo(px, py);
  });
  s.closePath();
  return s;
}

function gradientGeometry(points, from, to, depth) {
  const geo = new THREE.ExtrudeGeometry(shapeFrom(points), {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.09,
    bevelSegments: 5,
    curveSegments: 1,
  });
  geo.translate(0, 0, -depth / 2);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp((pos.getX(i) - pos.getY(i) + 3) / 6, 0, 1);
    c.copy(from).lerp(to, t);
    colors.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  return geo;
}

function dotTexture() {
  const size = 64;
  const cv = document.createElement('canvas');
  cv.width = cv.height = size;
  const g = cv.getContext('2d');
  const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function createHeroScene(canvas, { reducedMotion = false, compact = false } = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null; // No WebGL: the caller shows the static logo instead.
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200);
  camera.position.set(0, 0, 21);

  // Lights: cyan key from the left, purple rim from the right, soft white fill.
  scene.add(new THREE.AmbientLight(0x8080ff, 0.55));
  const key = new THREE.PointLight(0x22d3ee, 90, 40, 1.6);
  key.position.set(-6, 4, 7);
  const rim = new THREE.PointLight(0xa855f7, 110, 40, 1.6);
  rim.position.set(6, -3, 5);
  const fill = new THREE.DirectionalLight(0xffffff, 1.4);
  fill.position.set(1, 3, 8);
  scene.add(key, rim, fill);

  // ---- The mark ----
  const mark = new THREE.Group();
  const glassMat = new THREE.MeshPhysicalMaterial({
    vertexColors: true,
    roughness: 0.18,
    metalness: 0.15,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    iridescence: 0.6,
    iridescenceIOR: 1.4,
    sheen: 0.6,
    sheenColor: new THREE.Color('#9aa4ff'),
    emissive: new THREE.Color('#1b1450'),
    emissiveIntensity: 0.6,
  });
  const left = new THREE.Mesh(gradientGeometry(LEFT, CYAN, INDIGO, 0.9), glassMat);
  const right = new THREE.Mesh(gradientGeometry(RIGHT, INDIGO, PURPLE, 0.9), glassMat.clone());
  right.material.transparent = true;
  right.material.opacity = 0.93;
  right.position.z = -0.05;
  const core = new THREE.Mesh(
    new THREE.ExtrudeGeometry(shapeFrom(CORE), { depth: 0.5, bevelEnabled: true, bevelThickness: 0.1, bevelSize: 0.06, bevelSegments: 4 }),
    new THREE.MeshPhysicalMaterial({ color: '#ffffff', emissive: '#bfe9ff', emissiveIntensity: 1.4, roughness: 0.1, clearcoat: 1 }),
  );
  core.geometry.center();
  core.position.z = 0.75;
  mark.add(left, right, core);

  // Glow sprite behind the mark.
  const glowTex = dotTexture();
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: '#6d5cff', transparent: true, opacity: 0.55, depthWrite: false, blending: THREE.AdditiveBlending }));
  glow.scale.set(11, 11, 1);
  glow.position.z = -1.5;
  mark.add(glow);
  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: '#9be8ff', transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending }));
  coreGlow.scale.set(2.4, 2.4, 1);
  coreGlow.position.z = 1.1;
  mark.add(coreGlow);
  scene.add(mark);

  // ---- Orbit rings ----
  const rings = new THREE.Group();
  const ringDefs = [
    { r: 3.7, color: '#22D3EE', tilt: [1.2, 0.2, 0], speed: 0.25 },
    { r: 4.3, color: '#A855F7', tilt: [1.35, -0.5, 0.3], speed: -0.18 },
    { r: 4.9, color: '#6366F1', tilt: [1.05, 0.6, -0.2], speed: 0.12 },
  ];
  ringDefs.forEach((d) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(d.r, 0.012, 8, 220),
      new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }),
    );
    ring.rotation.set(...d.tilt);
    ring.userData.speed = d.speed;
    // A bright "satellite" bead on each ring.
    const bead = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: d.color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    bead.scale.set(0.55, 0.55, 1);
    bead.position.set(d.r, 0, 0);
    ring.add(bead);
    rings.add(ring);
  });
  scene.add(rings);

  // ---- Galaxy of respondents ----
  const COUNT = compact ? 1400 : 2600;
  const gPos = new Float32Array(COUNT * 3);
  const gCol = new Float32Array(COUNT * 3);
  const palette = [CYAN, ICE, INDIGO, PURPLE, PINK];
  for (let i = 0; i < COUNT; i++) {
    const arm = i % 3;
    const r = 3.2 + Math.pow(Math.random(), 0.7) * 9;
    const a = r * 0.45 + (arm * Math.PI * 2) / 3 + (Math.random() - 0.5) * 0.9;
    gPos[i * 3] = Math.cos(a) * r;
    gPos[i * 3 + 1] = (Math.random() - 0.5) * (0.6 + r * 0.08);
    gPos[i * 3 + 2] = Math.sin(a) * r;
    const c = palette[Math.floor(Math.random() * palette.length)].clone().lerp(new THREE.Color('#ffffff'), Math.random() * 0.3);
    gCol.set([c.r, c.g, c.b], i * 3);
  }
  const galaxyGeo = new THREE.BufferGeometry();
  galaxyGeo.setAttribute('position', new THREE.BufferAttribute(gPos, 3));
  galaxyGeo.setAttribute('color', new THREE.BufferAttribute(gCol, 3));
  const galaxy = new THREE.Points(
    galaxyGeo,
    new THREE.PointsMaterial({ size: 0.09, map: glowTex, vertexColors: true, transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true }),
  );
  galaxy.rotation.x = 0.42;
  galaxy.rotation.z = -0.18;
  scene.add(galaxy);

  // ---- Streams: answers flow in from the left, clean data leaves to the right ----
  const STREAM = compact ? 160 : 320;
  const streams = [
    { from: new THREE.Vector3(-16, 5, -4), c1: new THREE.Vector3(-8, 6, 3), c2: new THREE.Vector3(-4, 1, 2), to: new THREE.Vector3(0, 0, 0), color: CYAN },
    { from: new THREE.Vector3(-15, -6, -2), c1: new THREE.Vector3(-9, -5, 4), c2: new THREE.Vector3(-3, -2, 2), to: new THREE.Vector3(0, 0, 0), color: PINK },
    { from: new THREE.Vector3(0, 0, 0), c1: new THREE.Vector3(4, 1, 2), c2: new THREE.Vector3(9, 4, 1), to: new THREE.Vector3(17, 3, -5), color: ICE },
  ];
  const sPos = new Float32Array(STREAM * streams.length * 3);
  const sCol = new Float32Array(STREAM * streams.length * 3);
  const sT = new Float32Array(STREAM * streams.length);
  const sOff = new Float32Array(STREAM * streams.length * 3);
  streams.forEach((st, si) => {
    for (let i = 0; i < STREAM; i++) {
      const k = si * STREAM + i;
      sT[k] = Math.random();
      sOff.set([(Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.7, (Math.random() - 0.5) * 0.7], k * 3);
      const c = st.color.clone().lerp(new THREE.Color('#fff'), Math.random() * 0.4);
      sCol.set([c.r, c.g, c.b], k * 3);
    }
  });
  const streamGeo = new THREE.BufferGeometry();
  streamGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
  streamGeo.setAttribute('color', new THREE.BufferAttribute(sCol, 3));
  const streamPts = new THREE.Points(
    streamGeo,
    new THREE.PointsMaterial({ size: 0.13, map: glowTex, vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  scene.add(streamPts);
  const curves = streams.map((s) => new THREE.CubicBezierCurve3(s.from, s.c1, s.c2, s.to));
  const tmp = new THREE.Vector3();
  function updateStreams(dt) {
    curves.forEach((curve, si) => {
      for (let i = 0; i < STREAM; i++) {
        const k = si * STREAM + i;
        sT[k] = (sT[k] + dt * (0.08 + (i % 7) * 0.012)) % 1;
        curve.getPoint(sT[k], tmp);
        const spread = si === 2 ? sT[k] : 1 - sT[k];
        sPos[k * 3] = tmp.x + sOff[k * 3] * spread * 2;
        sPos[k * 3 + 1] = tmp.y + sOff[k * 3 + 1] * spread * 2;
        sPos[k * 3 + 2] = tmp.z + sOff[k * 3 + 2] * spread * 2;
      }
    });
    streamGeo.attributes.position.needsUpdate = true;
  }
  updateStreams(0);

  // ---- Interaction ----
  const pointer = { x: 0, y: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let shiftX = 0;
  let baseY = 0;
  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // On wide screens the mark sits on the right, next to the headline.
    const wide = w > 900;
    shiftX = wide ? 5.2 * Math.min(camera.aspect / 1.6, 1.3) : 2.4;
    // On phones the mark sits small, top right, behind the headline.
    baseY = wide ? 0.6 : -5.5;
    camera.position.z = wide ? 21 : 30;
    camera.position.y = baseY;
    mark.scale.setScalar(wide ? 1 : 0.6);
    rings.scale.setScalar(wide ? 1 : 0.6);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);

  let last = performance.now();
  let raf = 0;
  let t = 0;
  function frame() {
    raf = pzRaf(frame);
    if (!visible) return;
    const now = performance.now();
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    t += reducedMotion ? 0 : dt;

    // Chevrons breathe apart and click back together, like the animated logo.
    const cycle = (t % 5) / 5;
    const open = cycle < 0.12 ? 1 - cycle / 0.12 : cycle > 0.86 ? (cycle - 0.86) / 0.14 : 0;
    const ease = open * open * (3 - 2 * open);
    left.position.x = -ease * 1.4;
    right.position.x = ease * 1.4;
    left.rotation.y = -ease * 0.6;
    right.rotation.y = ease * 0.6;
    const pulse = 0.85 + Math.sin(t * 3.4) * 0.15;
    core.scale.setScalar(pulse);
    core.rotation.z = Math.sin(t * 0.8) * 0.2;
    coreGlow.material.opacity = 0.6 + Math.sin(t * 3.4) * 0.3;

    mark.position.x = shiftX;
    mark.position.y = Math.sin(t * 0.9) * 0.18;
    const targetY = pointer.x * 0.45 + Math.sin(t * 0.35) * 0.25;
    const targetX = pointer.y * 0.25;
    mark.rotation.y += (targetY - mark.rotation.y) * 0.05;
    mark.rotation.x += (targetX - mark.rotation.x) * 0.05;

    rings.position.copy(mark.position);
    rings.children.forEach((r) => (r.rotation.z += r.userData.speed * dt));
    galaxy.position.copy(mark.position);
    galaxy.rotation.y += dt * 0.04;
    streamPts.position.copy(mark.position);
    if (!reducedMotion) updateStreams(dt);

    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.lookAt(mark.position.x * 0.5, baseY, 0);
    renderer.render(scene, camera);
  }
  frame();

  return () => {
    pzCancel(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener('pointermove', onPointer);
    scene.traverse((o) => {
      o.geometry?.dispose?.();
      if (o.material) [].concat(o.material).forEach((m) => m.dispose());
    });
    glowTex.dispose();
    renderer.dispose();
  };
}
