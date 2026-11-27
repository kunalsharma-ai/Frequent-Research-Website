// IP address and country of a request, for the admin Visits and Activity tables (GitHub #15, #16).
//   plainIp(req)   the visitor's IP address as Express sees it (behind proxies: set TRUST_PROXY so req.ip is the real one)
//   ipCountry(req) two-letter country code from the CDN / proxy in front of the site, '' when none sends one.
//                  Cloudflare sends CF-IPCountry, CloudFront CloudFront-Viewer-Country, Vercel X-Vercel-IP-Country,
//                  App Engine X-AppEngine-Country, Fastly Fastly-Client-Country; an nginx with the geoip2 module can set
//                  X-Country-Code itself.
// The address is stored sealed (AES-256-GCM, see vault.js) when DATA_KEY / KEYS_SECRET is set, and opened only for admins.
import { openText, sealText } from './vault.js';

const HEADERS = ['cf-ipcountry', 'cloudfront-viewer-country', 'x-vercel-ip-country', 'x-appengine-country', 'fastly-client-country', 'x-country-code', 'x-geo-country'];

export const plainIp = (req) => String((req && req.ip) || '').replace(/^::ffff:/, '').slice(0, 64);

export function ipCountry(req) {
  for (const h of HEADERS) {
    const v = String(req.headers[h] || '').trim().toUpperCase();
    // XX = unknown, T1 = Tor (Cloudflare)
    if (/^[A-Z]{2}$/.test(v) && v !== 'XX' && v !== 'T1') return v;
  }
  return '';
}

// fields to add to a stored record
export const ipFields = (req) => ({ ipAddr: sealText(plainIp(req)), country: ipCountry(req) });

// the address as the admin sees it
export const ipOpen = (v) => (v ? openText(v) : '');
