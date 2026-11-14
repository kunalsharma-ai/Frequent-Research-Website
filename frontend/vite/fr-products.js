/*
 * Build 68: the seven Sampledge product sites (src/products/<slug>/), each the product team's own React site,
 * shown inside the Frequent Research page at /products/<slug> (src/products/_shell/ProductSite.jsx).
 *
 * Each product site keeps its own code and styles. To keep its styles away from the rest of this site (and this
 * site's styles away from it) it renders inside a shadow root, so this plugin:
 *   1. compiles product JSX with React's automatic runtime (the rest of this site uses the classic `ee` pragma);
 *   2. turns every relative `import './x.css'` in product code into a string that the product's shadow root gets
 *      (src/products/_shell/registry.js), instead of a page-wide stylesheet;
 *   3. points the older product sites (lucide-react 0.4xx icon names) at the `lucide-legacy` package;
 *   4. (pzScope, a PostCSS plugin) rewrites the product stylesheets' :root / html / body rules to the product's
 *      own root element, .pz-root.
 * Package font imports (@fontsource…) stay page-wide on purpose: fonts must be declared on the page.
 */
import { transformWithOxc } from 'vite';

const PROD = /[\\/]src[\\/]products[\\/]([a-z0-9]+)[\\/].*\.(jsx?|mjs)$/;
const LEGACY_ICONS = new Set(['sampaudience', 'sampbidx', 'samptrek', 'talk2tax']);

export function frProducts() {
  return {
    name: 'fr-products',
    enforce: 'pre',
    async transform(code, id) {
      const clean = id.split('?')[0];
      const m = PROD.exec(clean);
      if (!m || /[\\/]_shell[\\/]/.test(clean)) return null;
      const slug = m[1];
      let n = 0;
      const adds = [];
      code = code.replace(/^\s*import\s+(['"])(\.{1,2}\/[^'"]+\.css)\1\s*;?/gm, (all, q, p) => {
        const v = '__pzc' + n++;
        adds.push(v);
        return `import ${v} from ${q}${p}?inline${q};`;
      });
      if (adds.length) code = `import { pzAdd as __pzAdd } from '/src/products/_shell/registry.js';\n` + code + `\n__pzAdd(${JSON.stringify(slug)}, [${adds.join(', ')}]);\n`;
      if (LEGACY_ICONS.has(slug)) code = code.replace(/from\s+(['"])lucide-react\1/g, "from 'lucide-legacy'");
      const r = await transformWithOxc(code, clean, { lang: 'jsx', jsx: { runtime: 'automatic', importSource: 'react' } });
      return { code: r.code, map: r.map || null };
    },
  };
}

/* PostCSS: :root, html and body in a product stylesheet mean the product's own root element */
export function pzScope() {
  const isProd = (file) => /[\\/]src[\\/]products[\\/][a-z0-9]+[\\/]/.test(file || '');
  const fix = (sel) =>
    sel
      .split(',')
      .map((s) => {
        let t = s.trim();
        t = t.replace(/^:root\s+(html|body)\b/, '.pz-root').replace(/^html\s+body\b/, '.pz-root');
        t = t.replace(/^(:root|html|body)(?=$|[\s.:#\[>+~])/, '.pz-root');
        return t;
      })
      .join(', ');
  return {
    postcssPlugin: 'pz-scope',
    Once(root) {
      if (!isProd(root.source && root.source.input && root.source.input.file)) return;
      root.walkRules((rule) => {
        const p = rule.parent;
        if (p && p.type === 'atrule' && /keyframes$/i.test(p.name)) return;
        rule.selector = fix(rule.selector);
      });
    },
  };
}
pzScope.postcss = true;
