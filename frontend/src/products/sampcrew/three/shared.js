import * as THREE from 'three';
import { pzRaf, pzCancel } from '../../_shell/pzRaf.js';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export function canUseWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch {
    return false;
  }
}

/** Glassy glow orb: fresnel rim + two-colour gradient that slowly swirls. */
export function orbMaterial(colorA, colorB, intensity = 1) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTime: { value: 0 },
      uA: { value: new THREE.Color(colorA) },
      uB: { value: new THREE.Color(colorB) },
      uI: { value: intensity },
    },
    vertexShader: /* glsl */ `
      varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){
        vec4 wp = modelMatrix * vec4(position,1.0);
        vP = position;
        vN = normalize(normalMatrix * normal);
        vV = normalize(-(modelViewMatrix * vec4(position,1.0)).xyz);
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uTime; uniform vec3 uA; uniform vec3 uB; uniform float uI;
      varying vec3 vN; varying vec3 vV; varying vec3 vP;
      void main(){
        float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2);
        float s = sin(vP.x*2.2 + uTime*0.6) * cos(vP.y*2.0 - uTime*0.45) * 0.5 + 0.5;
        float g = clamp(vP.y*0.45 + 0.5 + (s-0.5)*0.5, 0.0, 1.0);
        vec3 col = mix(uA, uB, g);
        float body = 0.16 + 0.22*s;
        float a = (body + f*1.25) * uI;
        gl_FragColor = vec4(col * (0.55 + f*1.4), a);
      }`,
  });
}

/** Soft round points with per-point colour, size and twinkle. */
export function pointsMaterial(pixelRatio) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    uniforms: { uTime: { value: 0 }, uPR: { value: pixelRatio }, uFade: { value: 1 } },
    vertexShader: /* glsl */ `
      attribute float aSize; attribute float aSeed;
      uniform float uTime; uniform float uPR;
      varying vec3 vC; varying float vT;
      void main(){
        vC = color;
        vT = 0.55 + 0.45*sin(uTime*1.6 + aSeed*40.0);
        vec4 mv = modelViewMatrix * vec4(position,1.0);
        gl_PointSize = aSize * uPR * (14.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: /* glsl */ `
      uniform float uFade; varying vec3 vC; varying float vT;
      void main(){
        vec2 c = gl_PointCoord - 0.5; float d = length(c);
        float a = smoothstep(0.5, 0.0, d);
        a = a*a;
        gl_FragColor = vec4(vC, a * vT * uFade);
      }`,
  });
}

/** Additive glow sprite texture drawn on a canvas (no image files needed). */
export function glowTexture(inner = 'rgba(255,255,255,1)', outer = 'rgba(255,255,255,0)') {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, inner);
  grd.addColorStop(0.25, inner.replace(/[\d.]+\)$/, '0.45)'));
  grd.addColorStop(1, outer);
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/**
 * Runs a render loop only while the canvas is on screen and the tab is visible.
 * Returns a stop function.
 */
export function runLoop(el, frame) {
  let raf = 0;
  let visible = true;
  let onScreen = true;
  const clock = new THREE.Clock();
  const tick = () => {
    raf = 0;
    if (!visible || !onScreen) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    frame(clock.elapsedTime, dt);
    raf = pzRaf(tick);
  };
  const kick = () => {
    if (!raf && visible && onScreen) raf = pzRaf(tick);
  };
  const io = new IntersectionObserver(([e]) => {
    onScreen = e.isIntersecting;
    kick();
  });
  io.observe(el);
  const vis = () => {
    visible = document.visibilityState === 'visible';
    kick();
  };
  document.addEventListener('visibilitychange', vis);
  kick();
  return () => {
    pzCancel(raf);
    io.disconnect();
    document.removeEventListener('visibilitychange', vis);
  };
}

export function disposeScene(scene, renderer) {
  scene.traverse((o) => {
    o.geometry?.dispose?.();
    const m = o.material;
    if (Array.isArray(m)) m.forEach((x) => x.dispose());
    else m?.dispose?.();
  });
  renderer.dispose();
}
