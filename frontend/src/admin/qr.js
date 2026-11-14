// Build 78.3: a small QR code maker for the authenticator setup (byte mode, error correction M, versions 1-15).
// qrSvg(text) -> an SVG string. No outside library and nothing leaves the browser: the secret stays on this page.

// [ec codewords per block, blocks in group 1, data codewords per block g1, blocks g2, data per block g2] for level M
const EC_M = [null,
  [10, 1, 16, 0, 0], [16, 1, 28, 0, 0], [26, 1, 44, 0, 0], [18, 2, 32, 0, 0], [24, 2, 43, 0, 0],
  [16, 4, 27, 0, 0], [18, 4, 31, 0, 0], [22, 2, 38, 2, 39], [22, 3, 36, 2, 37], [26, 4, 43, 1, 44],
  [30, 1, 50, 4, 51], [22, 6, 36, 2, 37], [22, 8, 37, 1, 38], [24, 4, 40, 5, 41], [24, 5, 41, 5, 42],
];
const ALIGN = [null, [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50],
  [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70]];

// Galois field 256
const EXP = new Array(512), LOG = new Array(256);
for (let i = 0, x = 1; i < 255; i++) { EXP[i] = x; LOG[x] = i; x <<= 1; if (x & 256) x ^= 0x11d; }
for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
const mul = (a, b) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);
function rsGen(n) { let g = [1]; for (let i = 0; i < n; i++) { const r = new Array(g.length + 1).fill(0); for (let j = 0; j < g.length; j++) { r[j] ^= g[j]; r[j + 1] ^= mul(g[j], EXP[i]); } g = r; } return g; }
function rsEc(data, n) {
  const g = rsGen(n), res = data.concat(new Array(n).fill(0));
  for (let i = 0; i < data.length; i++) { const c = res[i]; if (c) for (let j = 0; j < g.length; j++) res[i + j] ^= mul(g[j], c); }
  return res.slice(data.length);
}

function codewords(bytes) {
  let v = 1;
  for (; v <= 15; v++) { const e = EC_M[v], cap = e[1] * e[2] + e[3] * e[4]; if (4 + (v < 10 ? 8 : 16) + bytes.length * 8 <= cap * 8) break; }
  if (v > 15) throw new Error('Text too long for the QR code');
  const e = EC_M[v], cap = e[1] * e[2] + e[3] * e[4];
  const bits = [];
  const put = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
  put(4, 4); put(bytes.length, v < 10 ? 8 : 16); for (const b of bytes) put(b, 8);
  put(0, Math.min(4, cap * 8 - bits.length));
  while (bits.length % 8) bits.push(0);
  const data = [];
  for (let i = 0; i < bits.length; i += 8) data.push(parseInt(bits.slice(i, i + 8).join(''), 2));
  for (let p = 0; data.length < cap; p++) data.push(p % 2 ? 0x11 : 0xec);
  // split into blocks, add error correction, interleave
  const blocks = [];
  let k = 0;
  for (let i = 0; i < e[1]; i++) { blocks.push(data.slice(k, k + e[2])); k += e[2]; }
  for (let i = 0; i < e[3]; i++) { blocks.push(data.slice(k, k + e[4])); k += e[4]; }
  const ecs = blocks.map((b) => rsEc(b, e[0]));
  const out = [];
  for (let i = 0; i < Math.max(e[2], e[4]); i++) for (const b of blocks) if (i < b.length) out.push(b[i]);
  for (let i = 0; i < e[0]; i++) for (const c of ecs) out.push(c[i]);
  return { v, out };
}

function bchFormat(mask) {
  const data = (0 << 3) | mask; // level M = 00
  let d = data << 10;
  for (let i = 14; i >= 10; i--) if ((d >> i) & 1) d ^= 0x537 << (i - 10);
  return ((data << 10) | d) ^ 0x5412;
}
function bchVersion(v) { let d = v << 12; for (let i = 17; i >= 12; i--) if ((d >> i) & 1) d ^= 0x1f25 << (i - 12); return (v << 12) | d; }

const MASKS = [
  (r, c) => (r + c) % 2 === 0, (r) => r % 2 === 0, (r, c) => c % 3 === 0, (r, c) => (r + c) % 3 === 0,
  (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0, (r, c) => ((r * c) % 2) + ((r * c) % 3) === 0,
  (r, c) => (((r * c) % 2) + ((r * c) % 3)) % 2 === 0, (r, c) => (((r + c) % 2) + ((r * c) % 3)) % 2 === 0,
];

function build(v, cw, mask) {
  const n = 17 + 4 * v;
  const m = Array.from({ length: n }, () => new Array(n).fill(null)); // null = free, else 0/1
  const fn = Array.from({ length: n }, () => new Array(n).fill(false));
  const set = (r, c, val) => { m[r][c] = val ? 1 : 0; fn[r][c] = true; };
  const finder = (r, c) => { for (let i = -1; i <= 7; i++) for (let j = -1; j <= 7; j++) { const rr = r + i, cc = c + j; if (rr < 0 || cc < 0 || rr >= n || cc >= n) continue; const on = i >= 0 && i <= 6 && j >= 0 && j <= 6 && (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)); set(rr, cc, on); } };
  finder(0, 0); finder(0, n - 7); finder(n - 7, 0);
  for (let i = 8; i < n - 8; i++) { set(6, i, i % 2 === 0); set(i, 6, i % 2 === 0); }
  const al = ALIGN[v], last = al.length - 1;
  for (let a = 0; a <= last; a++) for (let b = 0; b <= last; b++) {
    if ((a === 0 && b === 0) || (a === 0 && b === last) || (a === last && b === 0)) continue; // the finder corners
    const r = al[a], c = al[b];
    for (let i = -2; i <= 2; i++) for (let j = -2; j <= 2; j++) set(r + i, c + j, Math.max(Math.abs(i), Math.abs(j)) !== 1);
  }
  // format and version areas (filled after)
  const fmt = bchFormat(mask);
  const fb = (i) => (fmt >> i) & 1;
  for (let i = 0; i <= 5; i++) set(i, 8, fb(i));
  set(7, 8, fb(6)); set(8, 8, fb(7)); set(8, 7, fb(8));
  for (let i = 9; i < 15; i++) set(8, 14 - i, fb(i));
  for (let i = 0; i < 8; i++) set(8, n - 1 - i, fb(i));
  for (let i = 8; i < 15; i++) set(n - 15 + i, 8, fb(i));
  set(n - 8, 8, 1); // dark module
  if (v >= 7) { const vb = bchVersion(v); for (let i = 0; i < 18; i++) { const b = (vb >> i) & 1, a = Math.floor(i / 3), c = n - 11 + (i % 3); set(a, c, b); set(c, a, b); } }
  // data in the zig-zag
  let bit = 0;
  const total = cw.length * 8;
  for (let right = n - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < n; vert++) for (let j = 0; j < 2; j++) {
      const c = right - j, up = ((right + 1) & 2) === 0, r = up ? n - 1 - vert : vert;
      if (fn[r][c]) continue;
      let val = 0;
      if (bit < total) { val = (cw[bit >> 3] >> (7 - (bit & 7))) & 1; bit++; }
      if (MASKS[mask](r, c)) val ^= 1;
      m[r][c] = val;
    }
  }
  return m;
}

function penalty(m) {
  const n = m.length; let p = 0;
  for (let pass = 0; pass < 2; pass++) for (let i = 0; i < n; i++) {
    let run = 1;
    for (let j = 1; j < n; j++) { const a = pass ? m[j][i] : m[i][j], b = pass ? m[j - 1][i] : m[i][j - 1]; if (a === b) { run++; if (run === 5) p += 3; else if (run > 5) p++; } else run = 1; }
  }
  for (let i = 0; i < n - 1; i++) for (let j = 0; j < n - 1; j++) { const s = m[i][j] + m[i + 1][j] + m[i][j + 1] + m[i + 1][j + 1]; if (s === 0 || s === 4) p += 3; }
  const pat = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0], pat2 = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  for (let i = 0; i < n; i++) for (let j = 0; j <= n - 11; j++) for (const pt of [pat, pat2]) {
    if (pt.every((x, k) => m[i][j + k] === x)) p += 40;
    if (pt.every((x, k) => m[j + k][i] === x)) p += 40;
  }
  let dark = 0; for (const row of m) for (const x of row) dark += x;
  p += Math.floor(Math.abs((dark * 100) / (n * n) - 50) / 5) * 10;
  return p;
}

export function qrMatrix(text) {
  const bytes = [...new TextEncoder().encode(String(text))];
  const { v, out } = codewords(bytes);
  let best = null, bp = Infinity;
  for (let mask = 0; mask < 8; mask++) { const m = build(v, out, mask); const p = penalty(m); if (p < bp) { bp = p; best = m; } }
  return best;
}

export function qrSvg(text, { size = 220, fg = '#0B1437', bg = '#ffffff' } = {}) {
  const m = qrMatrix(text), n = m.length, q = 4, all = n + q * 2;
  let d = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (m[r][c]) d += `M${c + q} ${r + q}h1v1h-1z`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${all} ${all}" width="${size}" height="${size}" shape-rendering="crispEdges" role="img" aria-label="QR code for your authenticator app"><rect width="${all}" height="${all}" fill="${bg}"/><path d="${d}" fill="${fg}"/></svg>`;
}
