import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import iconPng from '../assets/brand/talk2tax-icon-512.png';
import { pzRaf, pzCancel } from '../../_shell/pzRaf.js';

/**
 * The hero's 3D scene: the Talk2Tax mark (two speech bubbles and a % sign) built as real
 * extruded geometry from the logo's own SVG paths, glass-like, floating in an orbit of
 * money glyphs, coins and a particle ring. Follows the pointer; pauses when off-screen.
 * With prefers-reduced-motion it renders one still frame.
 */

// Paths copied from the logo SVG (viewBox units).
const LEFT_BUBBLE = 'M14 6 H32 a10 10 0 0 1 10 10 V28 a10 10 0 0 1 -10 10 H16 L8 45 V36 a10 10 0 0 1 -4 -8 V16 a10 10 0 0 1 10 -10 Z';
const RIGHT_BUBBLE = 'M32 22 H50 a10 10 0 0 1 10 10 V44 a10 10 0 0 1 -4 8 V61 L48 54 H32 a10 10 0 0 1 -10 -10 V32 a10 10 0 0 1 10 -10 Z';

const TEAL = new THREE.Color('#5EEAD4');
const SKY = new THREE.Color('#0EA5E9');
const BLUE = new THREE.Color('#1D4ED8');
const VIOLET = new THREE.Color('#7B4DFF');

function bubbleGeometry(d, depth) {
  const data = new SVGLoader().parse(`<svg xmlns="http://www.w3.org/2000/svg"><path d="${d}"/></svg>`);
  const shapes = data.paths.flatMap((p) => SVGLoader.createShapes(p));
  const geo = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled: true,
    bevelThickness: 1.6,
    bevelSize: 1.4,
    bevelSegments: 6,
    curveSegments: 24,
  });
  geo.rotateX(Math.PI); // SVG y points down; a rotation (not a mirror) keeps faces pointing outwards
  geo.translate(0, 0, depth / 2);
  return geo;
}

/** Diagonal gradient baked into vertex colours, like the logo's linear gradients. */
function paintGradient(geo, from, to) {
  geo.computeBoundingBox();
  const { min, max } = geo.boundingBox;
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const c = new THREE.Color();
  for (let i = 0; i < pos.count; i += 1) {
    const tx = (pos.getX(i) - min.x) / (max.x - min.x || 1);
    const ty = (max.y - pos.getY(i)) / (max.y - min.y || 1);
    c.copy(from).lerp(to, Math.min(1, (tx + ty) / 2));
    colors.set([c.r, c.g, c.b], i * 3);
  }
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
}

function glyphTexture(text, color) {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.font = '700 84px Sora, Inter, system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.fillStyle = color;
  ctx.fillText(text, size / 2, size / 2 + 4);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function glowTexture(inner, outer) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner);
  g.addColorStop(0.45, outer);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

export default function HeroScene({ reducedMotion }) {
  const mountRef = useRef(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    if (!hasWebGL()) {
      setFallback(true);
      return undefined;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      setFallback(true);
      return undefined;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 0, 12);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.6);
    key.position.set(4, 6, 8);
    scene.add(key);
    const rim = new THREE.PointLight(0x7b4dff, 40, 30);
    rim.position.set(-5, -3, 3);
    scene.add(rim);
    const rim2 = new THREE.PointLight(0x5eead4, 30, 30);
    rim2.position.set(5, 3, -2);
    scene.add(rim2);

    const disposables = [envTex, pmrem];
    const track = (...items) => {
      disposables.push(...items);
      return items[0];
    };

    // ---- The mark -------------------------------------------------------
    const mark = new THREE.Group();
    const S = 0.075; // SVG units -> world units
    const centre = new THREE.Vector3(-32 * S, 33.5 * S, 0);

    const glass = (opacity) =>
      track(
        new THREE.MeshPhysicalMaterial({
          vertexColors: true,
          roughness: 0.12,
          metalness: 0.05,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          iridescence: 0.35,
          iridescenceIOR: 1.4,
          transparent: opacity < 1,
          opacity,
          envMapIntensity: 0.6,
        }),
      );

    const leftGeo = track(bubbleGeometry(LEFT_BUBBLE, 6));
    paintGradient(leftGeo, TEAL, SKY);
    const left = new THREE.Mesh(leftGeo, glass(1));
    left.scale.setScalar(S);
    left.position.copy(centre);
    left.position.z = -0.35;

    const rightGeo = track(bubbleGeometry(RIGHT_BUBBLE, 6));
    paintGradient(rightGeo, SKY, BLUE);
    const right = new THREE.Mesh(rightGeo, glass(0.9));
    right.scale.setScalar(S);
    right.position.copy(centre);
    right.position.z = 0.35;

    const leftPivot = new THREE.Group();
    leftPivot.add(left);
    const rightPivot = new THREE.Group();
    rightPivot.add(right);
    mark.add(leftPivot, rightPivot);

    // % sign in front of the bubbles
    const white = track(
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xdff9ff, emissiveIntensity: 0.55, roughness: 0.25 }),
    );
    const pct = new THREE.Group();
    const toWorld = (x, y) => new THREE.Vector3(x * S + centre.x, -y * S + centre.y, 1.05);
    const ringGeo = track(new THREE.TorusGeometry(3.6 * S, 1.45 * S, 20, 48));
    const r1 = new THREE.Mesh(ringGeo, white);
    r1.position.copy(toWorld(24.5, 22.5));
    const r2 = new THREE.Mesh(ringGeo, white);
    r2.position.copy(toWorld(39.5, 39.5));
    const a = toWorld(40, 20);
    const b = toWorld(24, 42);
    const len = a.distanceTo(b);
    const barGeo = track(new THREE.CapsuleGeometry(1.7 * S, len, 8, 20));
    const bar = new THREE.Mesh(barGeo, white);
    bar.position.copy(a.clone().add(b).multiplyScalar(0.5));
    bar.rotation.z = Math.atan2(b.y - a.y, b.x - a.x) - Math.PI / 2;
    pct.add(r1, r2, bar);
    mark.add(pct);

    // Soft glow behind the mark
    const glowMat = track(
      new THREE.SpriteMaterial({
        map: track(glowTexture('rgba(94,234,212,0.55)', 'rgba(14,165,233,0.18)')),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true,
      }),
    );
    const glow = new THREE.Sprite(glowMat);
    glow.scale.set(7.5, 7.5, 1);
    glow.position.z = -2.5;
    scene.add(glow);
    scene.add(mark);

    // ---- Orbiting money glyphs -----------------------------------------
    const glyphs = ['₹', '%', 'Σ', '₹', '+', '%', '=', '₹', '∑', '%'];
    const palette = ['#5EEAD4', '#38BDF8', '#A78BFA', '#F0ABFC', '#FBBF24'];
    const orbiters = glyphs.map((g, i) => {
      const mat = track(
        new THREE.SpriteMaterial({
          map: track(glyphTexture(g, palette[i % palette.length])),
          transparent: true,
          depthWrite: false,
          opacity: 0.9,
        }),
      );
      const sp = new THREE.Sprite(mat);
      const s = 0.55 + (i % 3) * 0.18;
      sp.scale.set(s, s, 1);
      scene.add(sp);
      return { sp, radius: 3.6 + (i % 4) * 0.55, speed: 0.12 + (i % 5) * 0.03, phase: (i / glyphs.length) * Math.PI * 2, tilt: (i % 2 ? 1 : -1) * (0.35 + (i % 3) * 0.15), y: ((i % 5) - 2) * 0.55 };
    });

    // ---- Coins ----------------------------------------------------------
    const coinGeo = track(new THREE.CylinderGeometry(0.32, 0.32, 0.07, 40));
    const coinMat = track(new THREE.MeshPhysicalMaterial({ color: '#7dd3fc', metalness: 0.9, roughness: 0.18, clearcoat: 1 }));
    const coinMat2 = track(new THREE.MeshPhysicalMaterial({ color: '#c4b5fd', metalness: 0.9, roughness: 0.2, clearcoat: 1 }));
    const coins = Array.from({ length: 7 }, (_, i) => {
      const m = new THREE.Mesh(coinGeo, i % 2 ? coinMat2 : coinMat);
      scene.add(m);
      return { m, radius: 4.4 + (i % 3) * 0.5, speed: -0.09 - i * 0.012, phase: i * 0.9, y: Math.sin(i * 1.7) * 1.6, spin: 0.6 + i * 0.1 };
    });

    // ---- Particle ring --------------------------------------------------
    const COUNT = 1400;
    const pPos = new Float32Array(COUNT * 3);
    const pCol = new Float32Array(COUNT * 3);
    const c = new THREE.Color();
    for (let i = 0; i < COUNT; i += 1) {
      const ang = Math.random() * Math.PI * 2;
      const r = 4.2 + Math.pow(Math.random(), 0.7) * 3.2;
      pPos.set([Math.cos(ang) * r, (Math.random() - 0.5) * 0.7, Math.sin(ang) * r], i * 3);
      c.copy(TEAL).lerp(Math.random() > 0.5 ? VIOLET : SKY, Math.random());
      pCol.set([c.r, c.g, c.b], i * 3);
    }
    const pGeo = track(new THREE.BufferGeometry());
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const pMat = track(
      new THREE.PointsMaterial({
        size: 0.045,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    const ring = new THREE.Points(pGeo, pMat);
    ring.rotation.x = 0.42;
    ring.rotation.z = -0.18;
    scene.add(ring);

    // ---- Sizing ---------------------------------------------------------
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // Pull back on narrow screens so the orbit fits.
      camera.position.z = w / h < 0.9 ? 15.5 : 12;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // ---- Pointer --------------------------------------------------------
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointer, { passive: true });

    // ---- Loop -----------------------------------------------------------
    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;

    const place = (t) => {
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      mark.rotation.y = Math.sin(t * 0.35) * 0.35 + pointer.x * 0.45;
      mark.rotation.x = Math.sin(t * 0.27) * 0.08 + pointer.y * 0.25;
      mark.position.y = 0.55 + Math.sin(t * 0.8) * 0.12;
      // The two bubbles "talk": a small alternating nod.
      leftPivot.position.set(Math.sin(t * 1.3) * 0.06, Math.max(0, Math.sin(t * 1.3)) * 0.12, 0);
      rightPivot.position.set(-Math.sin(t * 1.3) * 0.06, Math.max(0, -Math.sin(t * 1.3)) * 0.12, 0);
      pct.rotation.z = Math.sin(t * 0.9) * 0.05;

      orbiters.forEach((o) => {
        const ang = o.phase + t * o.speed;
        o.sp.position.set(Math.cos(ang) * o.radius, o.y + Math.sin(ang) * o.tilt, Math.sin(ang) * o.radius * 0.6);
        o.sp.material.opacity = 0.35 + 0.6 * (0.5 + 0.5 * Math.sin(ang));
      });
      coins.forEach((o) => {
        const ang = o.phase + t * o.speed;
        o.m.position.set(Math.cos(ang) * o.radius, o.y + Math.sin(t * 0.7 + o.phase) * 0.3, Math.sin(ang) * o.radius * 0.5 - 0.5);
        o.m.rotation.set(t * o.spin, t * o.spin * 0.7, 0.4);
      });
      ring.rotation.y = t * 0.04;
      glow.material.opacity = 0.85 + Math.sin(t * 1.2) * 0.15;
      camera.position.x = pointer.x * 0.6;
      camera.position.y = -pointer.y * 0.4;
      camera.lookAt(0, 0, 0);
    };

    const frame = () => {
      raf = 0;
      if (!visible) return;
      place(clock.getElapsedTime());
      renderer.render(scene, camera);
      raf = pzRaf(frame);
    };

    let io;
    if (reducedMotion) {
      place(2.2);
      renderer.render(scene, camera);
      // Re-render the still frame on resize.
      ro.disconnect();
      const still = new ResizeObserver(() => {
        resize();
        renderer.render(scene, camera);
      });
      still.observe(mount);
      disposables.push({ dispose: () => still.disconnect() });
    } else {
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && !document.hidden;
        if (visible && !raf) raf = pzRaf(frame);
      });
      io.observe(mount);
      raf = pzRaf(frame);
    }

    return () => {
      pzCancel(raf);
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      disposables.forEach((d) => d.dispose?.());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reducedMotion]);

  return (
    <div className="hero-scene" ref={mountRef} aria-hidden="true">
      {fallback && <img className="hero-scene-fallback" src={iconPng} alt="" />}
    </div>
  );
}
