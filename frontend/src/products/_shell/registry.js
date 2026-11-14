/* Build 68: product stylesheets, collected per product (vite/fr-products.js) and put into that product's shadow root */
const R = {};
export function pzAdd(slug, list) {
  const a = R[slug] || (R[slug] = []);
  for (const c of list) if (a.indexOf(c) < 0) a.push(c);
}
export const pzCss = (slug) => (R[slug] || []).join('\n');
