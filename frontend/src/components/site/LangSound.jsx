import { frsCtxGet, frsOn } from './Floaters.jsx';
/*
 * Language sounds — build 59. Prefix FRL_. No styles. Needs frsOn / frsCtxGet from Floaters.jsx (sound switch).
 *
 * When a visitor picks a language (panel, chips, toast), a short (~1–1.6 s) signature plays — synthesised with Web
 * Audio, no audio files. The 16 main languages have hand-designed motifs that nod to an instrument and scale from that
 * culture; every other language gets its own motif generated from its code (instrument, scale, root and melody are
 * derived from a hash), so no two languages sound the same and the same language always sounds the same.
 *
 *   en  glass chime arpeggio          zh-CN guzheng glissando (pentatonic)   zh-TW guzheng phrase + bell
 *   ja  koto, in-scale with bend      ko    gayageum with vibrato            hi    sitar meend over tanpura drone
 *   ar  oud, hijaz maqam              tr    saz tremolo, hicaz               es    flamenco strum, Phrygian cadence
 *   fr  accordion musette             de    brass fanfare                    it    mandolin tremolo
 *   pt  bossa nova nylon arpeggio     ru    balalaika tremolo, minor         id    gamelan metallophone (pelog)
 *   vi  đàn bầu pitch bends
 *
 * Volume is low, everything fades out, and it obeys the footer "Sound on/off" switch (localStorage fr-sound).
 * Played only from a click, never on page load (browsers would block it, and it would surprise people).
 */
const FRL_SC = {
  maj: [0, 2, 4, 5, 7, 9, 11],
  min: [0, 2, 3, 5, 7, 8, 10],
  penta: [0, 2, 4, 7, 9],
  mpenta: [0, 3, 5, 7, 10],
  in: [0, 1, 5, 7, 8],
  hijaz: [0, 1, 4, 5, 7, 8, 10],
  bhairav: [0, 1, 4, 5, 7, 8, 11],
  pelog: [0, 1, 3, 7, 8],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixo: [0, 2, 4, 5, 7, 9, 10],
  yo: [0, 2, 5, 7, 9],
  whole: [0, 2, 4, 6, 8, 10],
};
const frlHz = (root, sc, deg) => {
  const s = FRL_SC[sc] || FRL_SC.maj;
  const oct = Math.floor(deg / s.length),
    i = ((deg % s.length) + s.length) % s.length;
  return root * Math.pow(2, (s[i] + 12 * oct) / 12);
};

/* ---- voices: each schedules one note on (ctx, out, time, freq, dur, vol) ---- */
function frlEnv(g, t, a, peak, dur) {
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
}
function frlOsc(c, type, f, t, dur) {
  const o = c.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  o.start(t);
  o.stop(t + dur + 0.05);
  return o;
}
const FRL_V = {
  /* plucked string: bright attack whose filter closes quickly */
  pluck(c, out, t, f, dur, vol, o = {}) {
    const osc = frlOsc(c, o.wave || "sawtooth", f, t, dur),
      lp = c.createBiquadFilter(),
      g = c.createGain();
    lp.type = "lowpass";
    lp.Q.value = o.q || 1;
    lp.frequency.setValueAtTime(Math.min(f * (o.bright || 8), 12000), t);
    lp.frequency.exponentialRampToValueAtTime(Math.max(f * 1.2, 200), t + dur * 0.6);
    if (o.bend) osc.frequency.setTargetAtTime(f * Math.pow(2, o.bend / 12), t + (o.bendAt || 0.08), 0.06);
    if (o.vib) {
      const l = c.createOscillator(),
        lg = c.createGain();
      l.frequency.value = o.vib;
      lg.gain.setValueAtTime(0, t);
      lg.gain.linearRampToValueAtTime(f * 0.012, t + dur * 0.5);
      l.connect(lg).connect(osc.frequency);
      l.start(t);
      l.stop(t + dur + 0.05);
    }
    frlEnv(g, t, 0.004, vol, dur);
    osc.connect(lp).connect(g).connect(out);
  },
  /* bell / chime: sine partials */
  bell(c, out, t, f, dur, vol, o = {}) {
    (o.partials || [
      [1, 1],
      [2, 0.3],
      [3.01, 0.1],
    ]).forEach(([m, v]) => {
      const osc = frlOsc(c, "sine", f * m, t, dur),
        g = c.createGain();
      frlEnv(g, t, 0.01, vol * v, dur / (m > 2 ? 1.6 : 1));
      osc.connect(g).connect(out);
    });
  },
  /* gamelan metallophone: inharmonic partials + a detuned twin (the "shimmer" beating) */
  metal(c, out, t, f, dur, vol) {
    [
      [1, 1],
      [1.006, 0.8],
      [2.76, 0.25],
      [5.4, 0.08],
    ].forEach(([m, v]) => {
      const osc = frlOsc(c, "sine", f * m, t, dur),
        g = c.createGain();
      frlEnv(g, t, 0.005, vol * v, dur);
      osc.connect(g).connect(out);
    });
  },
  /* reed (accordion): two detuned saws with tremolo */
  reed(c, out, t, f, dur, vol) {
    const lp = c.createBiquadFilter(),
      g = c.createGain(),
      trem = c.createGain(),
      l = c.createOscillator(),
      lg = c.createGain();
    lp.type = "lowpass";
    lp.frequency.value = Math.min(f * 5, 5000);
    [0.996, 1.004].forEach((d) => frlOsc(c, "sawtooth", f * d, t, dur).connect(lp));
    l.frequency.value = 6.5;
    lg.gain.value = 0.35;
    trem.gain.value = 0.65;
    l.connect(lg).connect(trem.gain);
    l.start(t);
    l.stop(t + dur + 0.05);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.05);
    g.gain.setValueAtTime(vol, t + dur * 0.7);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    lp.connect(trem).connect(g).connect(out);
  },
  /* brass: saw with a swelling filter */
  brass(c, out, t, f, dur, vol) {
    const osc = frlOsc(c, "sawtooth", f, t, dur),
      lp = c.createBiquadFilter(),
      g = c.createGain();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(f * 1.5, t);
    lp.frequency.linearRampToValueAtTime(f * 6, t + 0.08);
    lp.frequency.exponentialRampToValueAtTime(f * 2.5, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(lp).connect(g).connect(out);
  },
  /* soft flute-ish sine with breathy vibrato */
  flute(c, out, t, f, dur, vol) {
    const osc = frlOsc(c, "sine", f, t, dur),
      g = c.createGain(),
      l = c.createOscillator(),
      lg = c.createGain();
    l.frequency.value = 5;
    lg.gain.value = f * 0.008;
    l.connect(lg).connect(osc.frequency);
    l.start(t);
    l.stop(t + dur + 0.05);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.06);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g).connect(out);
  },
  /* marimba: short sine + octave knock */
  marimba(c, out, t, f, dur, vol) {
    [
      [1, 1, dur],
      [4, 0.25, dur * 0.25],
    ].forEach(([m, v, d]) => {
      const osc = frlOsc(c, "sine", f * m, t, d),
        g = c.createGain();
      frlEnv(g, t, 0.003, vol * v, d);
      osc.connect(g).connect(out);
    });
  },
  /* đàn bầu: pure tone with a long expressive glide */
  bau(c, out, t, f, dur, vol, o = {}) {
    const osc = frlOsc(c, "triangle", f, t, dur),
      g = c.createGain();
    osc.frequency.setValueAtTime(f * Math.pow(2, (o.from || -3) / 12), t);
    osc.frequency.exponentialRampToValueAtTime(f, t + dur * 0.35);
    osc.frequency.exponentialRampToValueAtTime(f * Math.pow(2, (o.to || 2) / 12), t + dur * 0.9);
    frlEnv(g, t, 0.02, vol, dur);
    osc.connect(g).connect(out);
  },
  /* low drone (tanpura) */
  drone(c, out, t, f, dur, vol) {
    [1, 1.5, 2].forEach((m, i) => {
      const osc = frlOsc(c, "sawtooth", f * m, t, dur),
        lp = c.createBiquadFilter(),
        g = c.createGain();
      lp.type = "lowpass";
      lp.frequency.value = 900;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol * (i ? 0.5 : 1), t + 0.25);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      osc.connect(lp).connect(g).connect(out);
    });
  },
};

/* a note list: [time offset s, voice, scale degree | {hz}, dur, vol, opts] */
function frlNotes(c, out, t0, root, sc, list) {
  for (const [dt, v, deg, dur, vol, o] of list) {
    const f = typeof deg === "number" ? frlHz(root, sc, deg) : deg.hz;
    FRL_V[v](c, out, t0 + dt, f, dur, vol, o);
  }
}
const frlRun = (v, degs, step, dur, vol, o) => degs.map((d, i) => [i * step, v, d, dur, vol, o]);
const frlTrem = (v, deg, at, n, step, vol) => Array.from({ length: n }, (_, i) => [at + i * step, v, deg, step * 2.2, vol * (1 - i / (n * 1.4))]);

const FRL_P = {
  en: { g: 0.75, root: 659.25, sc: "maj", n: frlRun("bell", [0, 2, 4, 7], 0.09, 1.2, 0.5) },
  "zh-CN": { root: 587.33, sc: "penta", n: [...frlRun("pluck", [0, 1, 2, 3, 4, 5, 6], 0.045, 0.8, 0.35, { bright: 10 }), [0.4, "pluck", 4, 1.2, 0.5, { bright: 6, vib: 6 }]] },
  "zh-TW": { root: 523.25, sc: "penta", n: [...frlRun("pluck", [5, 4, 2, 3], 0.13, 0.9, 0.45, { bright: 7 }), [0.55, "bell", 5, 1.1, 0.3]] },
  ja: { root: 329.63, sc: "in", n: [[0, "pluck", 5, 1.1, 0.5, { bright: 9 }], [0.22, "pluck", 6, 1.1, 0.45, { bright: 9 }], [0.44, "pluck", 8, 1.3, 0.5, { bright: 8, bend: 1, bendAt: 0.3 }], [0.7, "pluck", 7, 1.2, 0.35, { bright: 7 }]] },
  ko: { root: 440, sc: "yo", n: [[0, "pluck", 0, 1.2, 0.5, { wave: "triangle", bright: 6, vib: 5.5 }], [0.25, "pluck", 2, 1.2, 0.45, { wave: "triangle", bright: 6, vib: 5.5 }], [0.5, "pluck", 4, 1.4, 0.5, { wave: "triangle", bright: 6, bend: -2, bendAt: 0.35 }]] },
  hi: { g: 1.3, root: 277.18, sc: "bhairav", n: [[0, "drone", { hz: 138.59 }, 1.6, 0.18], [0.05, "pluck", 7, 1.2, 0.45, { bright: 12, q: 4, bend: 1, bendAt: 0.15 }], [0.35, "pluck", 8, 0.8, 0.4, { bright: 12, q: 4 }], [0.55, "pluck", 11, 1.0, 0.45, { bright: 12, q: 4, bend: -1, bendAt: 0.25 }]] },
  ar: { g: 1.15, root: 293.66, sc: "hijaz", n: [[0, "pluck", 0, 0.7, 0.5, { bright: 4 }], [0.14, "pluck", 1, 0.6, 0.42, { bright: 4 }], [0.26, "pluck", 2, 0.6, 0.45, { bright: 4 }], [0.38, "pluck", 1, 0.6, 0.4, { bright: 4 }], [0.52, "pluck", 4, 1.2, 0.5, { bright: 4, vib: 5 }]] },
  tr: { g: 1.4, root: 440, sc: "hijaz", n: [...frlTrem("pluck", 4, 0, 8, 0.055, 0.4), [0.5, "pluck", 2, 0.6, 0.4, { bright: 9 }], [0.66, "pluck", 0, 1.0, 0.45, { bright: 9 }]] },
  es: {
    root: 164.81,
    sc: "hijaz",
    n: [
      ...[0, 4, 7, 11, 14].map((d, i) => [i * 0.018, "pluck", d, 0.9, 0.3, { bright: 7 }]),
      ...[1, 5, 8, 12].map((d, i) => [0.32 + i * 0.018, "pluck", d, 0.7, 0.28, { bright: 7 }]),
      ...[0, 4, 7, 11, 14].map((d, i) => [0.58 + (4 - i) * 0.02, "pluck", d, 1.2, 0.32, { bright: 6 }]),
    ],
  },
  fr: { g: 1.9, root: 523.25, sc: "maj", n: [[0, "reed", 4, 0.3, 0.16], [0.3, "reed", 2, 0.22, 0.14], [0.52, "reed", 3, 0.22, 0.14], [0.74, "reed", 4, 0.7, 0.17]] },
  de: { g: 2.3, root: 349.23, sc: "maj", n: [[0, "brass", 0, 0.22, 0.2], [0.2, "brass", 2, 0.22, 0.2], [0.4, "brass", 4, 0.22, 0.2], [0.6, "brass", 7, 0.8, 0.24], [0.6, "brass", 4, 0.8, 0.14]] },
  it: { g: 2.1, root: 587.33, sc: "maj", n: [...frlTrem("pluck", 2, 0, 7, 0.06, 0.32), ...frlTrem("pluck", 4, 0.45, 9, 0.06, 0.34)] },
  pt: { root: 220, sc: "maj", n: frlRun("pluck", [0, 4, 6, 9, 11, 13], 0.1, 1.4, 0.32, { wave: "triangle", bright: 5 }) },
  ru: { g: 1.7, root: 440, sc: "min", n: [...frlTrem("pluck", 4, 0, 6, 0.055, 0.36), ...frlTrem("pluck", 2, 0.34, 6, 0.055, 0.34), [0.7, "pluck", 0, 1.0, 0.42, { bright: 9 }]] },
  id: { g: 0.75, root: 392, sc: "pelog", n: [[0, "metal", 2, 1.3, 0.35], [0.18, "metal", 4, 1.3, 0.32], [0.36, "metal", 3, 1.3, 0.32], [0.54, "metal", 5, 1.6, 0.36], [0.54, "metal", { hz: 196 }, 1.6, 0.2]] },
  vi: { g: 1.5, root: 392, sc: "penta", n: [[0, "bau", 2, 1.0, 0.4, { from: -4, to: 2 }], [0.55, "bau", 4, 1.1, 0.4, { from: 3, to: -2 }]] },
};

/* every other language: a stable, unique motif from its code */
const FRL_GEN_V = ["bell", "pluck", "metal", "marimba", "flute", "reed", "pluck", "bell", "marimba"];
const FRL_GEN_S = ["maj", "penta", "min", "dorian", "lydian", "mixo", "mpenta", "yo", "pelog", "hijaz", "in", "whole"];
const FRL_GEN_R = [261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25, 587.33];
function frlHash(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}
function frlGen(code) {
  let h = frlHash(code);
  const pick = (arr) => {
    const v = arr[h % arr.length];
    h = Math.imul(h ^ (h >>> 15), 2246822507) >>> 0;
    return v;
  };
  const v = pick(FRL_GEN_V),
    sc = pick(FRL_GEN_S),
    root = pick(FRL_GEN_R);
  const len = 3 + (h % 3);
  h = Math.imul(h, 3266489909) >>> 0;
  const step = [0.1, 0.13, 0.16][h % 3];
  let d = h % 3;
  const vol = v === "reed" ? 0.15 : v === "flute" ? 0.3 : 0.42;
  const n = [];
  for (let i = 0; i < len; i++) {
    n.push([i * step, v, d, i === len - 1 ? 1.2 : v === "reed" || v === "flute" ? step * 1.6 : 0.9, vol, v === "pluck" ? { bright: 6 + (h % 5) } : undefined]);
    h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
    d += [1, 2, -1, 3, 1, -2][h % 6];
  }
  const g = { reed: 2, flute: 1.4, bell: 0.9, metal: 0.8, marimba: 1.25, pluck: 1 }[v] || 1;
  return { g, root, sc, n };
}

let frlLast = null;
function frlPlay(code) {
  try {
    if (typeof frsOn === "function" && !frsOn()) return;
    const c = typeof frsCtxGet === "function" ? frsCtxGet() : null;
    if (!c) return;
    const go = () => {
      const p = FRL_P[code] || FRL_P[String(code).split("-")[0]] || frlGen(String(code));
      const t = c.currentTime + 0.03;
      if (frlLast) {
        /* a quick fade on the previous signature so rapid switching never stacks up */
        try {
          frlLast.gain.cancelScheduledValues(t);
          frlLast.gain.setTargetAtTime(0.0001, t, 0.03);
        } catch (e) {}
      }
      const master = c.createGain();
      master.gain.value = 0.11 * (p.g || 1);
      const comp = c.createDynamicsCompressor();
      const delay = c.createDelay(1),
        fb = c.createGain(),
        wet = c.createGain();
      delay.delayTime.value = 0.19;
      fb.gain.value = 0.22;
      wet.gain.value = 0.35;
      delay.connect(fb).connect(delay);
      master.connect(comp);
      master.connect(delay);
      delay.connect(wet).connect(comp);
      comp.connect(c.destination);
      frlNotes(c, master, t, p.root, p.sc, p.n);
      frlLast = master;
      setTimeout(() => {
        try {
          master.disconnect();
          delay.disconnect();
          wet.disconnect();
          comp.disconnect();
        } catch (e) {}
        if (frlLast === master) frlLast = null;
      }, 3500);
    };
    if (c.state === "running") go();
    else c.resume().then(() => c.state === "running" && go()).catch(() => {});
  } catch (e) {}
}

export { frlPlay };
