import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { orbMaterial, pointsMaterial, glowTexture, runLoop, disposeScene, prefersReducedMotion, canUseWebGL } from './shared.js';

/* Illustrative org: departments sized by headcount, people orbit their team. */
const DEPTS = [
  { name: 'Assembly Line', n: 7, c: '#8B5CF6' },
  { name: 'People & Culture', n: 4, c: '#F59E0B' },
  { name: 'Finance', n: 3, c: '#0BC5FF' },
  { name: 'Quality', n: 2, c: '#FB7185' },
  { name: 'Manufacturing', n: 2, c: '#22C55E' },
  { name: 'Sales UK', n: 2, c: '#A78BFA' },
  { name: 'Talent', n: 1, c: '#14B8A6' },
];

/**
 * A playful, drag-to-spin version of SampCrew's Workforce Universe.
 * Labels are HTML elements positioned from 3D coordinates each frame.
 */
export default function UniverseScene() {
  const ref = useRef(null);
  const labelsRef = useRef([]);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!canUseWebGL()) {
      setFallback(true);
      return;
    }
    const reduced = prefersReducedMotion();
    const pr = Math.min(window.devicePixelRatio || 1, 1.75);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(pr);
    el.prepend(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 4.2, 12);
    camera.lookAt(0, -0.4, 0);
    const world = new THREE.Group();
    scene.add(world);

    const sphere = new THREE.SphereGeometry(1, 48, 48);
    const glowTex = glowTexture();
    const nodes = DEPTS.map((d, i) => {
      const a = (i / DEPTS.length) * Math.PI * 2;
      const r = i === 0 ? 0 : 3.4 + (i % 2) * 1.1;
      const g = new THREE.Group();
      g.position.set(Math.cos(a) * r, (i % 3 - 1) * 0.7, Math.sin(a) * r);
      const size = 0.32 + Math.sqrt(d.n) * 0.2;
      const m = new THREE.Mesh(sphere, orbMaterial(d.c, '#ffffff', 1.1));
      m.scale.setScalar(size);
      g.add(m);
      const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: d.c, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false, opacity: 0.8 }));
      sp.scale.setScalar(size * 4);
      g.add(sp);
      // orbiting people
      const cnt = d.n * 14;
      const pos = new Float32Array(cnt * 3);
      const col = new Float32Array(cnt * 3);
      const sz = new Float32Array(cnt);
      const sd = new Float32Array(cnt);
      const cc = new THREE.Color(d.c);
      for (let k = 0; k < cnt; k++) {
        const th = Math.random() * Math.PI * 2;
        const rr = size * (1.6 + Math.random() * 1.4);
        pos.set([Math.cos(th) * rr, (Math.random() - 0.5) * 0.35, Math.sin(th) * rr], k * 3);
        col.set([cc.r, cc.g, cc.b], k * 3);
        sz[k] = 2 + Math.random() * 3.5;
        sd[k] = Math.random();
      }
      const pg = new THREE.BufferGeometry();
      pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      pg.setAttribute('color', new THREE.BufferAttribute(col, 3));
      pg.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));
      pg.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));
      const pts = new THREE.Points(pg, pointsMaterial(pr));
      pts.rotation.x = 0.3 * (i % 2 ? 1 : -1);
      g.add(pts);
      g.userData = { m, pts, speed: 0.25 + Math.random() * 0.4 };
      world.add(g);
      return g;
    });

    // reporting lines (amber) between some departments
    const pairs = [[0, 1], [0, 2], [0, 3], [0, 4], [3, 4], [1, 6], [2, 5]];
    const lp = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], i) => {
      lp.set([...nodes[a].position.toArray(), ...nodes[b].position.toArray()], i * 6);
    });
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(lp, 3));
    world.add(new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: '#FBBF24', transparent: true, opacity: 0.35 })));

    // travelling sparks along lines = people moving between teams
    const sparks = pairs.map(() => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: '#FDE68A', blending: THREE.AdditiveBlending, transparent: true, depthWrite: false }));
      s.scale.setScalar(0.5);
      world.add(s);
      return { s, o: Math.random() };
    });

    // floor grid
    const grid = new THREE.PolarGridHelper(8, 12, 6, 64, 0x3b2a6b, 0x2a1e4f);
    grid.position.y = -1.6;
    grid.material.transparent = true;
    grid.material.opacity = 0.5;
    world.add(grid);

    const resize = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const far = 12 / Math.min(1, (w / h) * 0.9);
      camera.position.set(0, far * 0.35, far);
      camera.lookAt(0, -0.4, 0);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // drag to spin
    let drag = null;
    let vel = 0.12;
    let rotY = 0;
    let tiltX = 0;
    const down = (e) => {
      drag = { x: e.clientX, y: e.clientY };
      el.setPointerCapture?.(e.pointerId);
    };
    const move = (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      drag = { x: e.clientX, y: e.clientY };
      rotY += dx * 0.008;
      vel = dx * 0.4;
      tiltX = Math.max(-0.4, Math.min(0.5, tiltX + dy * 0.004));
    };
    const up = () => {
      drag = null;
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);

    const v = new THREE.Vector3();
    const a3 = new THREE.Vector3();
    const b3 = new THREE.Vector3();
    const frame = (t, dt) => {
      if (!drag) {
        vel += (0.12 - vel) * 0.02;
        rotY += vel * dt;
      }
      world.rotation.y = rotY;
      world.rotation.x = tiltX;
      nodes.forEach((n, i) => {
        n.userData.pts.rotation.y += n.userData.speed * dt;
        n.userData.m.material.uniforms.uTime.value = t + i;
        n.userData.pts.material.uniforms.uTime.value = t;
      });
      sparks.forEach((s, i) => {
        const [a, b] = pairs[i];
        const k = (t * 0.25 + s.o) % 1;
        a3.copy(nodes[a].position);
        b3.copy(nodes[b].position);
        s.s.position.lerpVectors(a3, b3, k);
        s.s.material.opacity = Math.sin(k * Math.PI);
      });
      renderer.render(scene, camera);
      // labels
      const w = el.clientWidth;
      const h = el.clientHeight;
      world.updateMatrixWorld();
      nodes.forEach((n, i) => {
        const lab = labelsRef.current[i];
        if (!lab) return;
        v.setFromMatrixPosition(n.matrixWorld);
        v.y -= 0.85;
        v.project(camera);
        const x = (v.x * 0.5 + 0.5) * w;
        const y = (-v.y * 0.5 + 0.5) * h;
        lab.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px)`;
        lab.style.opacity = v.z < 1 ? 1 : 0;
      });
    };
    let stop = () => {};
    if (reduced) frame(2, 0);
    else stop = runLoop(el, frame);
    return () => {
      stop();
      ro.disconnect();
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      disposeScene(scene, renderer);
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div className="universe-canvas" ref={ref} role="img" aria-label="Animated illustration of an organisation as a 3D universe: departments sized by headcount with people orbiting them. Drag to spin.">
      {!fallback &&
        DEPTS.map((d, i) => (
          <span key={d.name} className="u-label" ref={(n) => (labelsRef.current[i] = n)} style={{ '--c': d.c }}>
            {d.name} · {d.n}
          </span>
        ))}
      {fallback && <div className="orb-fallback small"><span /><span /><span /></div>}
      <span className="u-hint">Drag to spin</span>
    </div>
  );
}
