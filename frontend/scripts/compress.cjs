// Writes .gz and .br copies of every text file in the build (nginx serves them with gzip_static).
// Run last, after anything that changes files in dist (prerender, chat knowledge base, llms.txt).
// Usage: node scripts/compress.cjs [dist]
const fs = require('fs'), path = require('path'), zlib = require('zlib');
const dir = path.resolve(process.argv[2] || 'dist');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
let n = 0;
for (const f of walk(dir)) {
  if (!/\.(js|css|json|html|svg|xml|txt)$/.test(f)) continue;
  const b = fs.readFileSync(f);
  if (b.length < 1024) { for (const x of ['.gz', '.br']) fs.rmSync(f + x, { force: true }); continue; }
  const gz = f + '.gz';
  if (fs.existsSync(gz) && fs.statSync(gz).mtimeMs >= fs.statSync(f).mtimeMs) continue; // already up to date
  fs.writeFileSync(gz, zlib.gzipSync(b, { level: 9 }));
  fs.writeFileSync(f + '.br', zlib.brotliCompressSync(b, { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } }));
  n++;
}
console.log('compressed', n, 'files');
