"""Accounts & Finance service data (build 62).
Inputs (all in tools/af/): briefs.json — capabilities, processes and industries extracted from the 16 service briefs
(extract_briefs.py); pricing.json — the service-packages proposal (parse_pricing.py); content.py — hand-written hero
copy, pain points, FAQs, palettes and scenes.
Usage: python3 tools/af/gen_af_data.py src/data/AccountsFinance.jsx tools/af/he.txt
  → AF_SVC / AF_FAM for the pages, and the base service list that scripts/v62_patches.js writes into the bundle.
"""
import json, re, sys
import os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from content import S, ORDER, CAPS_MANUAL, STEPS_MANUAL, IND_MANUAL

ext = json.load(open(os.path.join(HERE, 'briefs.json')))
pricing = json.load(open(os.path.join(HERE, 'pricing.json')))
byn = {}
for k, v in ext.items():
    byn[int(k.split(' ')[0])] = v

ACR = ['MIS', 'GST', 'TDS', 'TCS', 'PF', 'ESI', 'ERP', 'KPI', 'KPIs', 'FP&A', 'M&A', 'CFO', 'MSME', 'SME', 'SMEs', 'ITR', 'TRACES', 'AIS', 'TIS', 'NPV', 'IRR', 'EBITDA', 'ITC', 'GSTR-2B', 'GSTR-1', 'GSTR-3B', 'IT', 'SaaS', 'AP', 'AR', 'Q', 'CAPEX']
def sent(t):
    t = t.strip().rstrip('.')
    if t.isupper() or t == t.upper():
        w = t.lower().split(' ')
        out = []
        for i, x in enumerate(w):
            up = next((a for a in ACR if a.lower() == x), None)
            if up: out.append(up)
            elif x.upper() in ('VS.',): out.append('vs.')
            elif re.match(r'^form$', x) and i + 1 < len(w): out.append('Form')
            elif re.match(r'^\d+[a-z]+$', x): out.append(x.upper())
            else: out.append(x)
        t = ' '.join(out)
        t = t[0].upper() + t[1:]
        t = t.replace('form 16 and form 16a', 'Form 16 and Form 16A').replace('Form 16 and form 16a', 'Form 16 and Form 16A').replace('form 26as', 'Form 26AS').replace('Form 26as', 'Form 26AS')
        t = re.sub(r'\bForm (\d+)q\b', lambda m: 'Form ' + m.group(1) + 'Q', t)
        t = re.sub(r'\bindia\b', 'India', t)
    return t

def tc(t):
    w = t.split(' ')
    out = [w[0]]
    for x in w[1:]:
        if x in ACR or re.match(r'^[A-Z0-9-]{2,}$', x) or re.match(r'^GSTR', x): out.append(x)
        else: out.append(x[0].lower() + x[1:])
    r = ' '.join(out)
    r = re.sub(r'-([A-Z])([a-z])', lambda m: '-' + m.group(1).lower() + m.group(2), r)
    return r.replace('E-Invoicing', 'E-invoicing').replace('E-Way', 'E-way').replace('Tax-Efficient', 'Tax-efficient').replace('Post-Filing', 'post-filing').replace('Investment-Related', 'investment-related')

DROP = re.compile(r'^(Distinguish|Verify|Link internally|Get |Request |Discuss |Explore |Clearly|Do not|Explain|Include only|Where |Potential activities|CTA|Use the|Use only|Build |Each service|Every service|Relevant CTA|Cross-border|Confirm all|Create )')
def clean_items(items):
    out = []
    for x in items:
        x = x.strip().rstrip('.').strip()
        if not x or DROP.match(x): continue
        if x not in out: out.append(x)
    return out

def caps_for(slug, n):
    if slug in CAPS_MANUAL: return CAPS_MANUAL[slug]
    v = byn[n]
    caps = v['caps']
    res = []
    if n in (2, 3, 4):
        lines = caps[0][1]
        cur = None
        for x in lines:
            m = re.match(r'^Service \d+: (.+)$', x)
            if m:
                cur = [m.group(1), []]; res.append(cur); continue
            if cur is not None: cur[1].append(x)
        return [[tc(t), clean_items(it)] for t, it in res]
    for c in caps:
        if isinstance(c, list) and len(c) == 2 and isinstance(c[1], list):
            t = c[0]
            if t.startswith('DETAILED'): continue
            res.append([sent(t), clean_items(c[1])])
    return res

def steps_for(slug, n):
    if slug in STEPS_MANUAL: return STEPS_MANUAL[slug]
    st = byn[n]['process']
    return [re.sub(r'^Step \d+\s*[:—-]\s*', '', x).strip() for x in st]

def ind_for(slug, n):
    if slug in IND_MANUAL: return IND_MANUAL[slug]
    out = []
    for x in byn[n]['ind'][1:]:
        if x.startswith('Common') or x[0].islower() or re.search(r'(challenges|complexity|categories|considerations)$', x): break
        out.append(x)
    return out

def price_for(i):
    if i is None: return None
    p = pricing[i - 1]
    rows = p['rows']
    price = rows[0][1:]
    m = [re.match(r'^₹([\d,]+)/(\w+)$', x) for x in price]
    amt = [int(x.group(1).replace(',', '')) for x in m]
    unit = m[0].group(2)
    best = rows[1][1:]
    body = rows[2:]
    return {"u": unit, "a": amt, "best": best, "rows": body, "del": p.get('Key deliverables'), "ni": p.get('Not included'),
            "imp": p.get('Important'), "from": i in (12, 13, 15)}

FAM = {"books": ["Books & Reporting", "Accurate records and numbers you can read."],
       "tax": ["Tax & Compliance", "Returns, deductions and deadlines — organised."],
       "plan": ["Planning & Funding", "Budgets, cash, capital and investment decisions."],
       "strat": ["Strategic Finance", "CFO-level thinking for bigger decisions."]}

data = []
for slug in ORDER:
    s = S[slug]
    n = s['brief']
    caps = caps_for(slug, n)
    caps = [[t, it] for t, it in caps if it]
    d = {"s": slug, "n": s['n'], "t": s['t'], "fam": s['fam'], "ic": s['ic'], "pal": s['pal'], "mo": s['mo'],
         "h": s['h'], "sub": s['sub'], "meta": s['meta'], "pains": s['pains'], "faq": s['faq'],
         "caps": caps, "steps": steps_for(slug, n) if n or slug in STEPS_MANUAL else [], "ind": ind_for(slug, n),
         "pr": price_for(s['price'])}
    data.append(d)
    print(slug, len(caps), sum(len(x[1]) for x in caps), len(d['steps']), len(d['ind']), d['pr'] and d['pr']['a'])

# positioning lines (pricing doc) become the base service summaries
pos = {p['title']: p['pos'] for p in pricing}
for d in data:
    d['pos'] = pos.get(d['n']) or "Plan with confidence using budgets, rolling forecasts and scenarios."

js = "/* GENERATED by tools/af/gen_af_data.py from the Accounts & Finance briefs and the service-packages proposal (build 62).\n * Edit the source content (tools/af/content.py) and regenerate, or edit here and keep both in sync. */\n"
js += "const AF_FAM = " + json.dumps(FAM, ensure_ascii=False) + ";\n"
js += "const AF_SVC = " + json.dumps(data, ensure_ascii=False, separators=(',', ':')) + ";\n"
open(sys.argv[1], 'w').write(js)

# base He(...) list for the A&F vertical (keeps the slug derived from the name)
he = []
for d in data:
    inc = [c[0] for c in d['caps'][:4]]
    he.append('He(%s,%s,%s)' % (json.dumps(d['n'], ensure_ascii=False), json.dumps(d['pos'], ensure_ascii=False), json.dumps(inc, ensure_ascii=False, separators=(',', ':'))))
open(sys.argv[2], 'w').write('services:[' + ','.join(he) + ']}]')
