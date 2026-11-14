/*
 * Build 80 speed: the 3D / canvas pictures at the top of the Sampledge product pages draw a frame 60 times a second.
 * On a phone or a test machine without a graphics chip each frame takes 50 to 150 ms, so the page stayed busy from the
 * first second and felt stuck (and PageSpeed counted it all as blocking time).
 *
 * pzRaf(fn) is used by those loops instead of requestAnimationFrame: each loop draws its first frames at once (so the
 * picture is there), then waits for the visitor's first sign of life (mouse move, touch, key, wheel, click) and from
 * then on runs exactly as before. Same rule as the home page's first screen (build 75/76).
 */
let used = false;
const held = new Set();
const SEEN = new WeakMap();
const FREE_FRAMES = 2;

function wake() {
  if (used) return;
  used = true;
  for (const ev of EVENTS) window.removeEventListener(ev, onEv, true);
  const list = [...held];
  held.clear();
  for (const h of list) if (!h.dead) h.id = requestAnimationFrame(h.fn);
}
const EVENTS = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'wheel', 'mousemove'];
function onEv(e) {
  // a real mouse move only (the browser sends a zero-length move when the page loads under the pointer)
  if ((e.type === 'pointermove' || e.type === 'mousemove') && !e.movementX && !e.movementY) return;
  wake();
}
if (typeof window !== 'undefined') {
  for (const ev of EVENTS) window.addEventListener(ev, onEv, { capture: true, passive: true });
}

/** requestAnimationFrame that holds a loop after its first frames until the visitor first interacts. */
export function pzRaf(fn) {
  if (used) return requestAnimationFrame(fn);
  const n = SEEN.get(fn) || 0;
  if (n < FREE_FRAMES) { SEEN.set(fn, n + 1); return requestAnimationFrame(fn); }
  const h = { fn, id: 0, dead: false };
  held.add(h);
  return h;
}

/** cancelAnimationFrame for ids from pzRaf. */
export function pzCancel(id) {
  if (id && typeof id === 'object') { id.dead = true; held.delete(id); if (id.id) cancelAnimationFrame(id.id); }
  else if (id) cancelAnimationFrame(id);
}
