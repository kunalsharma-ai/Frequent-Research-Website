// Build 83.3: Meta (Facebook) Pixel on every page (Kunal, 17 Nov 2026; Pixel ID 1070404625443177).
// Usage: node scripts/meta-pixel.cjs dist   (part of `npm run prerender`, before compress.cjs; safe to run twice)
//
// Puts Meta's standard Pixel code at the end of the <head> of every page (not /admin), so audit
// tools find it in the page source. The site changes pages without reloading (React Router), so the same small
// script also sends a PageView whenever the address changes (history.pushState / replaceState / back and forward).
'use strict';
const fs = require('fs');
const path = require('path');

const PIXEL_ID = '1070404625443177';
const MARK = '<!-- Meta Pixel Code -->';
const dir = path.resolve(process.argv[2] || 'dist');

const SNIPPET = `${MARK}
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');
(function(){var last=location.pathname+location.search;function pv(){var now=location.pathname+location.search;if(now!==last){last=now;fbq('track','PageView');}}
['pushState','replaceState'].forEach(function(k){var o=history[k];history[k]=function(){var r=o.apply(this,arguments);setTimeout(pv,0);return r;};});
addEventListener('popstate',function(){setTimeout(pv,0);});})();
</script>
<noscript><img height="1" width="1" alt="" class="fr-px" src="https://www.facebook.com/tr?id=${PIXEL_ID}&amp;ev=PageView&amp;noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->`;

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'admin' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
let added = 0, skipped = 0;
for (const f of walk(dir).filter((f) => f.endsWith('.html') && !f.endsWith('.shell.html'))) {
  let h = fs.readFileSync(f, 'utf8');
  if (h.includes(MARK) || !h.includes('</head>')) { skipped++; continue; }
  // at the end of <head>: <meta charset> must stay in the first 1024 bytes (the server sends no charset)
  h = h.replace('</head>', SNIPPET + '\n</head>');
  // the 1x1 noscript picture stays hidden without an inline style (build 82.7: no style="" in pages)
  if (!h.includes('.fr-px{')) h = h.replace('</head>', '<style>.fr-px{display:none}</style>\n</head>');
  fs.writeFileSync(f, h);
  added++;
}
console.log(`Meta Pixel: added to ${added} pages (${skipped} already had it or have no <head>)`);
