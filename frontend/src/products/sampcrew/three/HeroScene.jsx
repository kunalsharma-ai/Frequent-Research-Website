import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { orbMaterial, pointsMaterial, glowTexture, runLoop, disposeScene, prefersReducedMotion, canUseWebGL } from './shared.js';

/**
 * Hero: the SampCrew mark brought to life. Three glowing orbs (the logo's
 * three circles) orbit a bright core, wrapped in rings of thousands of
 * "people" particles. Reacts to the pointer and to scroll.
 */
export default function HeroScene() {
  const ref = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!canUseWebGL()) {
      setFallback(true);
      return;
    }
    const reduced = prefersReducedMotion();
    const small = window.innerWidth < 760;
    const pr = Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(pr);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, small ? 13 : 10);

    const root = new THREE.Group();
    scene.add(root);

    // --- three orbs from the logo ---
    const orbGeo = new THREE.SphereGeometry(1, 64, 64);
    const orbDefs = [
      { a: '#8B5CF6', b: '#E879F9', angle: Math.PI * 0.75, r: 1.35 },
      { a: '#FB7185', b: '#F9A8D4', angle: Math.PI * 0.05, r: 1.25 },
      { a: '#F472B6', b: '#A78BFA', angle: Math.PI * 1.45, r: 1.3 },
    ];
    const orbs = orbDefs.map((d) => {
      const m = new THREE.Mesh(orbGeo, orbMaterial(d.a, d.b, 1));
      m.scale.setScalar(d.r * (small ? 0.72 : 1));
      m.userData = d;
      root.add(m);
      return m;
    });

    // --- the bright core (the white dot in the mark) ---
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true }));
    glow.scale.setScalar(2.6);
    root.add(glow);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.28, 32, 32), new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    root.add(core);

    // --- particle rings: the crew ---
    const palette = ['#FB7185', '#F472B6', '#8B5CF6', '#A78BFA', '#2F6BFF', '#0BC5FF', '#FDE68A'].map((c) => new THREE.Color(c));
    const rings = [];
    const ringDefs = [
      { count: small ? 700 : 1400, radius: 4.2, spread: 0.9, tilt: [1.15, 0.2, 0], speed: 0.05 },
      { count: small ? 500 : 1000, radius: 5.6, spread: 1.2, tilt: [1.35, -0.5, 0.3], speed: -0.035 },
      { count: small ? 350 : 700, radius: 7.4, spread: 1.8, tilt: [0.9, 0.8, -0.2], speed: 0.02 },
    ];
    const pMat = pointsMaterial(pr);
    for (const d of ringDefs) {
      const pos = new Float32Array(d.count * 3);
      const col = new Float32Array(d.count * 3);
      const size = new Float32Array(d.count);
      const seed = new Float32Array(d.count);
      for (let i = 0; i < d.count; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = d.radius + (Math.random() - 0.5) * d.spread * (Math.random() + 0.3);
        pos[i * 3] = Math.cos(a) * r;
        pos[i * 3 + 1] = (Math.random() - 0.5) * d.spread * 0.35;
        pos[i * 3 + 2] = Math.sin(a) * r;
        const c = palette[(Math.random() * palette.length) | 0];
        col.set([c.r, c.g, c.b], i * 3);
        size[i] = Math.random() < 0.04 ? 9 + Math.random() * 6 : 2 + Math.random() * 4;
        seed[i] = Math.random();
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
      g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      const p = new THREE.Points(g, pMat);
      p.rotation.set(...d.tilt);
      p.userData = d;
      root.add(p);
      rings.push(p);
    }

    // --- distant dust ---
    const dustN = small ? 400 : 900;
    const dPos = new Float32Array(dustN * 3);
    const dCol = new Float32Array(dustN * 3);
    const dSize = new Float32Array(dustN);
    const dSeed = new Float32Array(dustN);
    for (let i = 0; i < dustN; i++) {
      dPos.set([(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 24, -8 - Math.random() * 20], i * 3);
      const c = palette[(Math.random() * palette.length) | 0];
      dCol.set([c.r * 0.7, c.g * 0.7, c.b * 0.7], i * 3);
      dSize[i] = 3 + Math.random() * 6;
      dSeed[i] = Math.random();
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    dg.setAttribute('color', new THREE.BufferAttribute(dCol, 3));
    dg.setAttribute('aSize', new THREE.BufferAttribute(dSize, 1));
    dg.setAttribute('aSeed', new THREE.BufferAttribute(dSeed, 1));
    const dust = new THREE.Points(dg, pointsMaterial(pr));
    scene.add(dust);

    // --- constellation links from the core to random crew members ---
    const linkN = 28;
    const lPos = new Float32Array(linkN * 6);
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.BufferAttribute(lPos, 3));
    const links = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: '#F9A8D4', transparent: true, opacity: 0.18, blending: THREE.AdditiveBlending, depthWrite: false }));
    root.add(links);
    const linkTargets = Array.from({ length: linkN }, () => ({ ring: (Math.random() * rings.length) | 0, idx: (Math.random() * 600) | 0 }));
    const tmp = new THREE.Vector3();

    // --- sizing ---
    const resize = () => {
      const w = el.clientWidth || window.innerWidth;
      const h = el.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    // --- input ---
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    let scrollP = 0;
    const onScroll = () => {
      scrollP = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const frame = (t) => {
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      const spread = 1 + scrollP * 1.4;
      orbs.forEach((o, i) => {
        const d = o.userData;
        const a = d.angle + t * 0.18 + Math.sin(t * 0.5 + i) * 0.08;
        const rr = (1.15 + Math.sin(t * 0.7 + i * 2) * 0.12) * spread;
        o.position.set(Math.cos(a) * rr, Math.sin(a) * rr * 0.85, Math.sin(a * 1.3) * 0.6);
        o.material.uniforms.uTime.value = t + i * 3;
        o.material.uniforms.uI.value = 0.85 - scrollP * 0.4;
      });
      core.scale.setScalar(0.9 + Math.sin(t * 3.4) * 0.12);
      glow.scale.setScalar(2.4 + Math.sin(t * 3.4) * 0.35);
      rings.forEach((r) => {
        r.rotation.y += r.userData.speed * 0.016 * (1 + scrollP * 3);
      });
      pMat.uniforms.uTime.value = t;
      dust.material.uniforms.uTime.value = t;
      dust.rotation.z = t * 0.01;
      // links follow live particle positions
      root.updateMatrixWorld();
      linkTargets.forEach((lt, i) => {
        const ring = rings[lt.ring];
        const arr = ring.geometry.attributes.position.array;
        tmp.fromArray(arr, (lt.idx % (arr.length / 3)) * 3).applyMatrix4(ring.matrix);
        lPos.set([0, 0, 0, tmp.x, tmp.y, tmp.z], i * 6);
      });
      lg.attributes.position.needsUpdate = true;
      links.material.opacity = 0.1 + Math.sin(t * 1.3) * 0.06;

      root.rotation.x = 0.15 + pointer.y * 0.18;
      root.rotation.y = pointer.x * 0.35;
      camera.position.y = -scrollP * 1.5;
      camera.lookAt(0, -scrollP * 0.6, 0);
      renderer.render(scene, camera);
    };

    let stop = () => {};
    if (reduced) frame(4);
    else stop = runLoop(el, frame);

    return () => {
      stop();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      disposeScene(scene, renderer);
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="hero-canvas" ref={ref} aria-hidden="true">
      {fallback && (
        <div className="orb-fallback">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}
