#!/usr/bin/env python3
"""Convert the regional B2B / B2C panel workbooks into JSON for the country panel books.

Usage: python3 tools/panel/make_panel_books.py <folder-with-xlsx> public/data/panel-books

Each workbook holds one sheet per country. A sheet is a run of tables:
    title row      (text, empty)
    header row     (text, text)          e.g. ("Category", "Percentage")
    data rows      (label, number)
B2B sheets also have group titles ("Canada - Agriculture Industry Audience Distribution") that sit above
several tables. Values are stored either as fractions (0.59) or as whole percentages (59); each table is
normalised to percentages. "Total" rows are dropped. The panel size comes from the first table.
Nothing is estimated: a table that is missing from a sheet is simply not in that country's book.
"""
import json, re, sys, glob, os, unicodedata
import openpyxl

REGIONS = {'NORTH_AMERICA': 'North America', 'North_America': 'North America', 'EROUPE': 'Europe', 'APAC': 'Asia-Pacific',
           'MENA': 'Middle East & Africa', 'SOUTH_AMERICA': 'South America'}
ISO = {'united states': 'US', 'canada': 'CA', 'mexico': 'MX', 'costa rica': 'CR', 'austria': 'AT', 'switzerland': 'CH', 'germany': 'DE',
       'bulgaria': 'BG', 'united kingdom': 'GB', 'france': 'FR', 'italy': 'IT', 'ireland': 'IE', 'norway': 'NO', 'spain': 'ES', 'denmark': 'DK',
       'poland': 'PL', 'netherlands': 'NL', 'sweden': 'SE', 'russia': 'RU', 'belgium': 'BE', 'romania': 'RO', 'czech republic': 'CZ',
       'portugal': 'PT', 'ukraine': 'UA', 'australia': 'AU', 'india': 'IN', 'new zealand': 'NZ', 'singapore': 'SG', 'china': 'CN', 'taiwan': 'TW',
       'japan': 'JP', 'hong kong': 'HK', 'malaysia': 'MY', 'south korea': 'KR', 'indonesia': 'ID', 'vietnam': 'VN', 'cambodia': 'KH',
       'philippines': 'PH', 'thailand': 'TH', 'brazil': 'BR', 'colombia': 'CO', 'argentina': 'AR', 'peru': 'PE', 'chile': 'CL', 'algeria': 'DZ',
       'egypt': 'EG', 'iran': 'IR', 'israel': 'IL', 'kuwait': 'KW', 'qatar': 'QA', 'saudi arabia': 'SA', 'united arab emirates': 'AE',
       'nigeria': 'NG', 'south africa': 'ZA', 'kenya': 'KE'}
NAMES = {'united kingdom': 'United Kingdom', 'hong kong': 'Hong Kong', 'czech republic': 'Czech Republic'}

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def clean(s):
    s = re.sub(r'\s+', ' ', str(s)).strip()
    s = s.replace('—', '–')
    return s

def is_num(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool)

META = re.compile(r'^(note|country\s*:|each |presented|\(|base\s*=)|100%|independent|read me|explanation tab|top of chat', re.I)
SECTOR = re.compile(r'(industry profile|^industry distribution|government\s*&\s*defen[cs]e.*(profile|distribution)|^service industry profile)', re.I)
TBL = re.compile(r'^(table|level)\s*\d+\s*[-–—:]?\s*', re.I)

def tidy_group(t, country):
    t = re.sub(r'\(.*?\)', '', t)
    t = re.sub(re.escape(country), '', t, flags=re.I)
    t = re.sub(r'(?i)b2b panel (audience distribution|profile)|audience distribution|panel profile|distribution|profile|sector', '', t)
    t = re.sub(r'\s*\|.*$', '', t)
    t = re.sub(r'^[\s:—–-]+|[\s:—–-]+$', '', t)
    t = re.sub(r'\s{2,}', ' ', t)
    return (t[:1].upper() + t[1:].lower()) if t.isupper() else t

def parse_sheet(ws, kind, country=''):
    rows = []
    for r in ws.iter_rows(max_row=6000, values_only=True):
        cells = list(r[:6])
        if all(c is None or (isinstance(c, str) and not c.strip()) for c in cells):
            continue
        rows.append(cells)
    panel = None
    groups = [{'title': '', 'tables': []}]
    titles = []
    cur = None
    head_panel = False
    warn = []
    for r in rows:
        a = r[0]
        rest = [c for c in r[1:] if c is not None]
        b = rest[0] if rest else None
        if isinstance(a, str) and a.strip() and b is None:
            t = clean(a)
            if not META.search(t):
                titles.append(t)
            cur = None
            continue
        if isinstance(a, str) and isinstance(b, str):
            head_panel = bool(re.search(r'panel size', b, re.I))
            if not titles and cur is None: titles.append(clean(a))
            cur = None
            continue
        if a is None or (isinstance(a, str) and not a.strip()):
            continue
        if not is_num(b):
            warn.append('skip ' + repr(r[:3])); continue
        lab = clean(a)
        if re.search(r'panel size', lab, re.I) or head_panel:
            if panel is None: panel = int(b)
            head_panel = False; titles = []; continue
        if lab.lower() in ('total', 'grand total'):
            continue
        if cur is None:
            ttl = titles[-1] if titles else 'Profile'
            heads = [x for x in titles[:-1] if not TBL.match(x)]
            name = TBL.sub('', ttl).strip()
            if re.match(r'^region$', name, re.I):
                titles = []; cur = {'skip': True, 'rows': []}; continue
            started_sector = groups[-1]['title'] == '' and groups[-1]['tables'] and kind == 'b2b' and (TBL.match(ttl) or SECTOR.search(name))
            if heads:
                gname = tidy_group(heads[-1], country)
                if gname and gname.lower() != (groups[-1]['title'] or '').lower():
                    groups.append({'title': gname, 'tables': []})
                elif not gname and started_sector:
                    groups.append({'title': '', 'tables': [], 'auto': True})
            elif SECTOR.search(name) and kind == 'b2b' and groups[-1]['tables']:
                groups.append({'title': tidy_group(name, country), 'tables': [], 'auto': not tidy_group(name, country)})
            elif started_sector:
                groups.append({'title': '', 'tables': [], 'auto': True})
            cur = {'title': name or 'Profile', 'rows': []}
            groups[-1]['tables'].append(cur)
            titles = []
        if cur.get('skip'):
            if panel is None and b > 100: panel = int(b)
            continue
        cur['rows'].append([lab, float(b)])
    out = []
    for g in groups:
        tables = []
        for t in g['tables']:
            if not t['rows']:
                continue
            vals = [v for _, v in t['rows']]
            scale = 100.0 if max(vals) <= 1.0001 else 1.0
            title = re.sub(re.escape(' - ' + country) + '$', '', t['title'], flags=re.I).strip()
            title = (title[:1].upper() + title[1:].lower()) if title.isupper() else title
            tables.append({'title': title or 'Profile', 'rows': [[l, round(v * scale, 2)] for l, v in t['rows']]})
        if not tables:
            continue
        gt = g['title']
        if not gt and (g.get('auto') or out):
            gt = tables[0]['rows'][0][0] if tables[0]['rows'] else 'Industry'
        out.append({'title': gt, 'tables': tables})
    # canonical sector names, consecutive duplicates merged
    def canon(t, first):
        k = (t + ' ' + first).lower()
        if not t and not out2: return ''
        if 'agricult' in k or 'farm' in k: return 'Agriculture & allied industries'
        if 'manufactur' in k: return 'Manufacturing'
        if 'defen' in k or 'armed' in k: return 'Government & defence'
        if any(w in k for w in ('government', 'public admin', 'legislat', 'public sector', 'paramilitary', 'homeland')): return 'Government & defence'
        if 'service' in k: return 'Services'
        return None
    # a profile block that runs straight into a sector's tables (no heading between them): split it
    if kind == 'b2b' and out and out[0]['title'] == '' and len(out[0]['tables']) > 3:
        t0 = out[0]['tables']
        k = next((i for i, t in enumerate(t0) if i >= 3 and re.search(r'industry|department|farm|crop', t['title'], re.I)), None)
        if k is not None:
            out[0:1] = [{'title': '', 'tables': t0[:k]}, {'title': '', 'tables': t0[k:]}]
    out2 = []
    for g in out:
        if out2 and re.search(r'job.?title', g['title'], re.I) and not re.search(r'manufactur|service|government|defen|agricult', g['title'], re.I):
            out2[-1]['tables'].extend(g['tables']); continue
        first = (g['tables'][0]['title'] + ' ' + (g['tables'][0]['rows'][0][0] if g['tables'][0]['rows'] else '')) if g['tables'] else ''
        name = canon(g['title'], first) if (g['title'] or out2) else ''
        if name is None:
            if out2: out2[-1]['tables'].extend(g['tables']); continue
            name = g['title']
        if any(o['title'] == name and [t['title'] for t in o['tables']] == [t['title'] for t in g['tables']] for o in out2):
            continue  # a block repeated in the source sheet
        if out2 and out2[-1]['title'] == name:
            out2[-1]['tables'].extend(g['tables'])
        else:
            out2.append({'title': name, 'tables': list(g['tables'])})
    for g in out2:
        for t in g['tables']:
            t['title'] = re.sub(r'\s*[-–—]\s*' + re.escape(country) + r'\s*$', '', t['title'], flags=re.I).strip()
            t['title'] = re.sub(r'^[-–\s]+', '', t['title'])
            t['title'] = re.sub(r'^(Manufacturing|Service Industry|Services?) Sector Job Title Profile\s*[:–-]\s*', '', t['title'])
    return panel, out2, warn

def main(src, dst):
    index = {'b2c': [], 'b2b': []}
    os.makedirs(dst, exist_ok=True)
    for f in sorted(glob.glob(os.path.join(src, '*.xlsx'))):
        base = os.path.basename(f)
        kind = 'b2b' if 'B2B' in base else 'b2c' if 'B2C' in base else None
        if not kind:
            continue
        region = next((v for k, v in REGIONS.items() if k in base), None)
        if not region:
            continue
        wb = openpyxl.load_workbook(f, data_only=True, read_only=True)
        for ws in wb.worksheets:
            key = clean(ws.title).lower()
            name = NAMES.get(key, clean(ws.title).title() if ws.title.isupper() or ws.title.islower() else clean(ws.title))
            if key == 'canada': name = 'Canada'
            iso = ISO.get(key)
            panel, groups, warn = parse_sheet(ws, kind, name)
            if warn:
                print('  !', kind, name, warn[:3], file=sys.stderr)
            # B2C sheets: drop the US-style state list when its title names another country (none expected)
            book = {'kind': kind, 'name': name, 'slug': slug(name), 'iso': iso, 'region': region, 'panel': panel, 'groups': groups}
            os.makedirs(os.path.join(dst, kind), exist_ok=True)
            with open(os.path.join(dst, kind, book['slug'] + '.json'), 'w') as fh:
                json.dump(book, fh, ensure_ascii=False, separators=(',', ':'))
            ntab = sum(len(g['tables']) for g in groups)
            index[kind].append({'name': name, 'slug': book['slug'], 'iso': iso, 'region': region, 'panel': panel, 'tables': ntab, 'sectors': len([g for g in groups if g['title']])})
            print(kind, region, name, panel, ntab, 'tables', file=sys.stderr)
    for k in index:
        index[k].sort(key=lambda x: (x['region'], x['name']))
    with open(os.path.join(dst, 'index.json'), 'w') as fh:
        json.dump(index, fh, ensure_ascii=False, indent=0)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
