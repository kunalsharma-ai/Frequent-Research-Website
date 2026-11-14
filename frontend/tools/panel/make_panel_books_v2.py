#!/usr/bin/env python3
"""Convert the 2026-10-31 panel workbooks (one regional workbook per panel, one sheet per country) into JSON.

Usage: python3 tools/panel/make_panel_books_v2.py <kind> <folder-with-xlsx> public/data/panel-books
  kind: b2c | b2b | hcp | caregivers | patients   (hcp, caregivers, patients are written under hc/<kind>/)

Sheet layout (all five panels):
    "<COUNTRY> — ... PANEL BOOK"                      title
    "... · Income in CAD"                              subtitle (currency)
    ("Region"|"Country", None, "<x> Panel Size")       then (name, None, size)
    "PART n  ·  NAME"                                  chapter
    "<Country> – <Table title>"                        table title
    optional note line(s)                              kept as the table note
    (header, None, "Percentage", "Est. Panelists", "Check")
    (label, None, fraction, count, ...)                data rows
    ("TOTAL", ...)                                     end of table
Percentages are stored as fractions; they are written as percentages with one decimal. Rows at 0% are dropped.
Each row is [label, percent, panelists, (band text)].
Nothing is estimated here: figures are exactly the workbook figures (the workbooks themselves describe them as
modelled estimates; the site and the PDFs say so).
"""
import json, re, sys, glob, os, unicodedata
import openpyxl

ISO = {'united states': 'US', 'canada': 'CA', 'mexico': 'MX', 'costa rica': 'CR', 'austria': 'AT', 'switzerland': 'CH', 'germany': 'DE',
       'bulgaria': 'BG', 'united kingdom': 'GB', 'france': 'FR', 'italy': 'IT', 'ireland': 'IE', 'norway': 'NO', 'spain': 'ES', 'denmark': 'DK',
       'poland': 'PL', 'netherlands': 'NL', 'sweden': 'SE', 'russia': 'RU', 'belgium': 'BE', 'romania': 'RO', 'czech republic': 'CZ',
       'portugal': 'PT', 'ukraine': 'UA', 'australia': 'AU', 'india': 'IN', 'new zealand': 'NZ', 'singapore': 'SG', 'china': 'CN', 'taiwan': 'TW',
       'japan': 'JP', 'hong kong': 'HK', 'malaysia': 'MY', 'south korea': 'KR', 'indonesia': 'ID', 'vietnam': 'VN', 'cambodia': 'KH',
       'philippines': 'PH', 'thailand': 'TH', 'brazil': 'BR', 'colombia': 'CO', 'argentina': 'AR', 'peru': 'PE', 'chile': 'CL', 'algeria': 'DZ',
       'egypt': 'EG', 'iran': 'IR', 'israel': 'IL', 'kuwait': 'KW', 'qatar': 'QA', 'saudi arabia': 'SA', 'united arab emirates': 'AE',
       'nigeria': 'NG', 'south africa': 'ZA', 'kenya': 'KE', 'turkey': 'TR'}
REGION = {'NORTH_AMERICA': 'North America', 'EUROPE': 'Europe', 'APAC': 'Asia-Pacific', 'MENA_AFRICA': 'Middle East & Africa', 'SOUTH_AMERICA': 'South America'}
SKIP = {'Overview', 'Methodology & Notes', 'Change Log', 'Profile Index', 'Attribute Coverage'}

def slug(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower()
    return re.sub(r'[^a-z0-9]+', '-', s).strip('-')

def clean(s):
    return re.sub(r'\s+', ' ', str(s)).strip()

def num(v):
    return isinstance(v, (int, float)) and not isinstance(v, bool)

def part_title(s):
    t = re.sub(r'^PART\s*\d+\s*·\s*', '', clean(s), flags=re.I)
    t = re.split(r'\s+[—–]\s+', t)[0]
    t = re.sub(r'\s*\(.*?\)', '', t).strip()
    keep = {'AI', 'B2B', 'B2C', 'HCP', 'IT', 'HR', 'R&D'}
    if t.isupper():
        w = [x if x in keep else x.lower() for x in t.split(' ')]
        t = ' '.join(w)
        t = t[:1].upper() + t[1:]
    return t

def parse(ws, country, kind=""):
    rows = [list(r[:5]) for r in ws.iter_rows(max_row=8000, values_only=True)]
    out = {'panel': 0, 'cur': '', 'groups': []}
    m = re.search(r'(?:Income|Revenue) in ([A-Z]{3})', clean(rows[1][0] or '')) if len(rows) > 1 else None
    out['cur'] = m.group(1) if m else ''
    for r in rows[:8]:
        if r[0] and clean(r[0]).lower() == country.lower() and num(r[2]):
            out['panel'] = int(r[2])
    grp = None; tbl = None; buf = []; pre = re.compile(r'^' + re.escape(country) + r'\s*[–—-]\s*', re.I)
    for r in rows[5:]:
        a = r[0]
        if a is None:
            continue
        a = clean(a)
        if re.match(r'^PART\s*\d', a, re.I):
            grp = {'title': part_title(a), 'tables': []}; out['groups'].append(grp); tbl = None; buf = []; continue
        if isinstance(r[2], str) and 'percent' in r[2].lower():
            if grp is None:
                grp = {'title': '', 'tables': []}; out['groups'].append(grp)
            title = buf[0] if buf else a
            title = re.sub(r'^(\d+\.|Table\s*\d+\s*[–—:-])\s*', '', pre.sub('', title))
            tbl = {'title': title, 'head': a, 'rows': []}
            if len(buf) > 1:
                tbl['note'] = ' '.join(buf[1:])
            grp['tables'].append(tbl); buf = []; continue
        if a.upper() == 'TOTAL':
            tbl = None; buf = []; continue
        if tbl is not None and num(r[2]):
            v = round(float(r[2]) * 100, 1)
            if v > 0:
                # update 8: also keep the number of panelists (the workbook's Est. Panelists, or % x panel size when the
                # workbook stores it as an uncached formula) and the band text some tables carry in column B (income ranges)
                n = int(round(r[3])) if num(r[3]) else int(round(float(r[2]) * out['panel']))
                row = [a, v, n]
                if isinstance(r[1], str) and clean(r[1]):
                    row.append(clean(r[1]))
                tbl['rows'].append(row)
            continue
        if r[2] is None:
            tbl = None; buf.append(a)
    for g in out['groups']:
        g['tables'] = [t for t in g['tables'] if t['rows']]
    out['groups'] = [g for g in out['groups'] if g['tables']]
    if kind == 'b2b' and out['groups']:
        out['groups'][0]['title'] = ''   # firmographics = the base tables the business page draws first
    return out

def main(kind, src, dst):
    sub = os.path.join(dst, 'hc', kind) if kind in ('hcp', 'caregivers', 'patients') else os.path.join(dst, kind)
    os.makedirs(sub, exist_ok=True)
    ix_path = os.path.join(dst, 'index.json')
    ix = json.load(open(ix_path)) if os.path.exists(ix_path) else {}
    entries = []
    for f in sorted(glob.glob(os.path.join(src, '*.xlsx'))):
        reg = next((v for k, v in REGION.items() if os.path.basename(f).upper().startswith(k)), '')
        wb = openpyxl.load_workbook(f, read_only=True, data_only=True)
        for sh in wb.sheetnames:
            if sh in SKIP:
                continue
            name = clean(sh); key = name.lower()
            if key not in ISO:
                print('skip sheet', f, sh); continue
            d = parse(wb[sh], name, kind)
            if not d['groups']:
                print('no tables', f, sh); continue
            book = {'kind': kind, 'name': name, 'slug': slug(name), 'iso': ISO[key], 'region': reg, 'panel': d['panel'], 'cur': d['cur'], 'groups': d['groups']}
            json.dump(book, open(os.path.join(sub, book['slug'] + '.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
            nt = sum(len(g['tables']) for g in d['groups'])
            entries.append({'name': name, 'slug': book['slug'], 'iso': book['iso'], 'region': reg, 'panel': d['panel'], 'tables': nt, 'sectors': 0})
    entries.sort(key=lambda e: (list(REGION.values()).index(e['region']) if e['region'] in REGION.values() else 9, e['name']))
    ix[kind] = entries
    json.dump(ix, open(ix_path, 'w'), ensure_ascii=False, indent=0)
    print(kind, len(entries), 'countries', sum(e['tables'] for e in entries), 'tables')

if __name__ == '__main__':
    main(*sys.argv[1:4])
