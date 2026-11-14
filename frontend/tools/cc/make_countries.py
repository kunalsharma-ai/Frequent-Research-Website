"""Generate src/config/countries.json — every country/territory with an E.164 calling code.
Keeps the site's original 19 entries (and their digit rules) first, then all others A–Z, then "Other country".
Run after make_flags.py: python3 tools/cc/make_countries.py"""
import json,sys,os
sys.path.insert(0,os.path.dirname(__file__));from dial_codes import DIAL
iso=json.load(open('/usr/share/iso-codes/json/iso_3166-1.json'))['3166-1']
NAMES={c['alpha_2']:c.get('common_name',c['name']) for c in iso}
NAMES.update({"XK":"Kosovo","KR":"South Korea","KP":"North Korea","RU":"Russia","VN":"Vietnam","TW":"Taiwan","BO":"Bolivia","VE":"Venezuela",
 "TZ":"Tanzania","SY":"Syria","LA":"Laos","MD":"Moldova","IR":"Iran","PS":"Palestine","FM":"Micronesia","CD":"DR Congo","CG":"Congo",
 "MK":"North Macedonia","BN":"Brunei","CZ":"Czechia","VA":"Vatican City","CI":"Côte d'Ivoire","TR":"Türkiye","GB":"United Kingdom",
 "US":"United States","MF":"Saint Martin","SX":"Sint Maarten","BQ":"Caribbean Netherlands","FK":"Falkland Islands","VG":"British Virgin Islands",
 "VI":"U.S. Virgin Islands","SH":"Saint Helena","BL":"Saint Barthélemy","CW":"Curaçao","RE":"Réunion","AX":"Åland Islands","KN":"Saint Kitts and Nevis",
 "VC":"Saint Vincent and the Grenadines","PM":"Saint Pierre and Miquelon","SJ":"Svalbard and Jan Mayen","IO":"British Indian Ocean Territory",
 "MP":"Northern Mariana Islands","CC":"Cocos (Keeling) Islands","HK":"Hong Kong","MO":"Macao","SZ":"Eswatini","CV":"Cabo Verde","TL":"Timor-Leste",
 "BS":"Bahamas","GM":"Gambia"})
# original site entries with their validation rules (unchanged)
ORIG=[("IN",10,10,"^[6-9]"),("US",10,10,"^[2-9]"),("CA",10,10,"^[2-9]"),("GB",10,10,None),("AE",9,9,None),("SA",9,9,None),("QA",8,8,None),
 ("SG",8,8,None),("AU",9,9,None),("DE",10,11,None),("FR",9,9,None),("NL",9,9,None),("JP",10,10,None),("CN",11,11,None),("MY",9,10,None),
 ("ZA",9,9,None),("NP",10,10,None),("BD",10,10,None),("LK",9,9,None)]
fl=json.load(open('src/assets/images/flags/flags-sprite.json'))['order']
def e(i,mn,mx,st=None,top=False):
    d={"iso":i,"name":NAMES[i],"code":DIAL[i],"min":mn,"max":mx,"fi":fl.index(i) if i in fl else -1}
    if st:d["start"]=st
    if top:d["top"]=True
    return d
out=[e(i,a,b,s,True) for i,a,b,s in ORIG]
seen={o["iso"] for o in out}
nanp=[i for i,c in DIAL.items() if c=="+1"]
rest=sorted([i for i in DIAL if i not in seen],key=lambda i:NAMES[i])
for i in rest:
    out.append(e(i,10,10,"^[2-9]") if i in nanp else e(i,5,13))
out.append({"iso":"XX","name":"Other country","code":"","min":6,"max":14,"fi":-1,"other":True})
json.dump(out,open('src/config/countries.json','w'),ensure_ascii=False,indent=0)
print(len(out),'entries')
