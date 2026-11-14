"""Country positions for the home-hero flag globe (build 62).
Centroids are computed from the site's own world map (RG_MAP in the base bundle: Natural Earth 110m countries,
equirectangular 1000x500, keyed by ISO 3166-1 numeric) — largest polygon of each country, area-weighted.
UN member states too small for that map are added from SMALL (approximate capital positions).
Output: public/data/country-points.json  [[iso2, lat, lon], …]  (build-time data; inlined via "__HY_GLOBE__").
Usage: python3 tools/globe/make_country_points.py dist/site.html public/data/country-points.json
"""
import json, re, sys
NUM = dict(x.split(':') for x in """004:AF 008:AL 012:DZ 024:AO 031:AZ 032:AR 036:AU 040:AT 044:BS 050:BD 051:AM 056:BE 064:BT 068:BO 070:BA 072:BW 076:BR 084:BZ 090:SB 096:BN 100:BG 104:MM 108:BI 112:BY 116:KH 120:CM 124:CA 140:CF 144:LK 148:TD 152:CL 156:CN 158:TW 170:CO 178:CG 180:CD 188:CR 191:HR 192:CU 196:CY 203:CZ 204:BJ 208:DK 214:DO 218:EC 222:SV 226:GQ 231:ET 232:ER 233:EE 238:FK 242:FJ 246:FI 250:FR 260:TF 262:DJ 266:GA 268:GE 270:GM 275:PS 276:DE 288:GH 300:GR 304:GL 320:GT 324:GN 328:GY 332:HT 340:HN 348:HU 352:IS 356:IN 360:ID 364:IR 368:IQ 372:IE 376:IL 380:IT 384:CI 388:JM 392:JP 398:KZ 400:JO 404:KE 408:KP 410:KR 414:KW 417:KG 418:LA 422:LB 426:LS 428:LV 430:LR 434:LY 440:LT 442:LU 450:MG 454:MW 458:MY 466:ML 478:MR 484:MX 496:MN 498:MD 499:ME 504:MA 508:MZ 512:OM 516:NA 524:NP 528:NL 540:NC 548:VU 554:NZ 558:NI 562:NE 566:NG 578:NO 586:PK 591:PA 598:PG 600:PY 604:PE 608:PH 616:PL 620:PT 624:GW 626:TL 630:PR 634:QA 642:RO 643:RU 646:RW 682:SA 686:SN 688:RS 694:SL 703:SK 704:VN 705:SI 706:SO 710:ZA 716:ZW 724:ES 728:SS 729:SD 732:EH 740:SR 748:SZ 752:SE 756:CH 760:SY 762:TJ 764:TH 768:TG 780:TT 784:AE 788:TN 792:TR 795:TM 800:UG 804:UA 807:MK 818:EG 826:GB 834:TZ 840:US 854:BF 858:UY 860:UZ 862:VE 887:YE 894:ZM""".split())
SKIP = {"TF", "FK", "NC", "PR", "GL", "EH"}  # territories: not shown as countries
SMALL = {"SG": (1.35, 103.82), "BH": (26.07, 50.55), "MT": (35.9, 14.5), "MV": (3.2, 73.22), "MU": (-20.3, 57.58), "AD": (42.5, 1.52),
         "MC": (43.74, 7.42), "LI": (47.16, 9.55), "SM": (43.94, 12.46), "VA": (41.9, 12.45), "BB": (13.19, -59.54), "AG": (17.06, -61.8),
         "DM": (15.41, -61.37), "GD": (12.12, -61.68), "KN": (17.3, -62.72), "LC": (13.91, -60.98), "VC": (13.25, -61.2), "KM": (-11.88, 43.87),
         "CV": (15.12, -23.6), "ST": (0.19, 6.61), "SC": (-4.68, 55.49), "WS": (-13.76, -172.1), "TO": (-21.18, -175.2), "KI": (1.87, -157.36),
         "FM": (6.92, 158.16), "MH": (7.13, 171.18), "NR": (-0.52, 166.93), "PW": (7.51, 134.58), "TV": (-7.11, 177.65), "HK": (22.32, 114.17)}
html = open(sys.argv[1], encoding="utf8").read()
i = html.find("RG_MAP={") + 7
d, j = 0, i
while True:
    c = html[j]
    if c == "{": d += 1
    elif c == "}":
        d -= 1
        if d == 0: break
    j += 1
M = json.loads(html[i:j + 1])
W, H = M["w"], M["h"]
def rings(path):
    for part in path.split("Z"):
        pts = [tuple(map(float, p.split(","))) for p in re.findall(r"-?[\d.]+,-?[\d.]+", part)]
        if len(pts) > 2: yield pts
def area_c(p):
    a = cx = cy = 0
    for k in range(len(p)):
        x0, y0 = p[k]; x1, y1 = p[(k + 1) % len(p)]
        f = x0 * y1 - x1 * y0; a += f; cx += (x0 + x1) * f; cy += (y0 + y1) * f
    if abs(a) < 1e-9: return 0, p[0]
    return abs(a / 2), (cx / (3 * a), cy / (3 * a))
out = {}
for b in M["base"]:
    iso = NUM.get(str(b.get("id")))
    if not iso or iso in SKIP: continue
    best = max((area_c(r) for r in rings(b["d"])), key=lambda t: t[0])
    x, y = best[1]
    out[iso] = (round(90 - y / H * 180, 1), round(x / W * 360 - 180, 1))
# sanity check against the hand-placed panel-country pins (RG_MAP.pts)
bad = []
for k, (x, y) in M["pts"].items():
    lat, lon = 90 - y / H * 180, x / W * 360 - 180
    o = out.get(k.upper())
    if o and (abs(o[0] - lat) > 12 or abs(((o[1] - lon) + 180) % 360 - 180) > 15): bad.append((k, o, (round(lat, 1), round(lon, 1))))
for k, v in SMALL.items(): out.setdefault(k, v)
res = sorted([k, v[0], v[1]] for k, v in out.items())
json.dump(res, open(sys.argv[2], "w"), separators=(",", ":"))
print(len(res), "countries; pin mismatches:", bad)
