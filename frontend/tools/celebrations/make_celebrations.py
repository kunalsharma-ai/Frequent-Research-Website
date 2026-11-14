#!/usr/bin/env python3
"""Build 65 update 22: turn Kunal's "Global Special Days & Festival Calendar" workbook into public/data/celebrations.json.

Usage: python3 tools/celebrations/make_celebrations.py <calendar.xlsx> [out.json]
Reads the "Full Year …" sheet. Month-theme fill days ("Low (theme)") are NOT special days, so they are skipped and the
banner stays hidden on those dates. Each event gets a motif (its animation), flags and a one-line message; every field
can be changed later in the super admin panel (same JSON shape, see docs/go-live/06-CELEBRATIONS-ADMIN.md).
"""
import json, re, sys, datetime
import openpyxl

MOTIFS = [  # first match wins: (motif, regex on name + category)
    ("halloween", r"halloween"),
    ("diya", r"diwali|deepavali|dhanteras|naraka|lakshmi|dev deepawali|kartik|bhai dooj|govardhan"),
    ("bonfire", r"lohri|holika|guy fawkes|bonfire"),
    ("colours", r"\bholi\b|dhulandi|rangpanchami"),
    ("kite", r"sankranti|uttarayan|pongal|bihu|kite"),
    ("crescent", r"\beid\b|ramadan|ramzan|muharram|milad|islamic|bakrid|ashura|shab"),
    ("lantern", r"chinese new year|lunar new year|lantern|mid-autumn|dragon boat"),
    ("xmas", r"christmas|xmas|hanukkah|advent"),
    ("tricolour", r"republic day|independence day.*india|^independence day|har ghar tiranga"),
    ("fireworks", r"new year|independence day|(?<!inter)national day|bastille|canada day|thanksgiving|fourth of july|4th of july|australia day|unification|guy fawkes"),
    ("waves", r"seafarer|drowning|tsunami|ocean|\bsea\b|water|wetland|river|fisheries|navy|coast guard|mangrove"),
    ("leaf", r"earth|environment|forest|wildlife|biodiversity|ozone|nature|tree|plant|climate|sparrow|tiger|elephant|bee\b|soil|desert|pollution|energy|vegan|environmental|lion|animal|coconut|bamboo|wind day|mountain|bicycle|plastic|food day|gastronomy|heritage"),
    ("ribbon", r"cancer|aids|diabetes|heart|health|doctor|nurse|tuberculosis|\btb\b|malaria|autism|mental|blood|kidney|hepatitis|alzheimer|stroke|lung|eye|sight|hand hygiene|immun|polio|leprosy|pharma|patient|medical|nutrition|breastfeed|thalassemia|disab|rare disease|zoonoses|obesity|hypertension|yoga|food safety"),
    ("sport", r"sport|olympic|cricket|football|fifa|world cup|games|ipl|tennis|marathon|hockey|super bowl|athlet|chess|wimbledon|tour de france|f1|grand prix"),
    ("coins", r"budget|tax|gst|tds|bank|financ|\bfy\b|rbi|stock|invest|account|audit|economic|insurance|money|fiscal|itr|mpc|sebi|chartered accountant"),
    ("tech", r"\bweb\b|internet|cyber|computer|software|data|\bai\b|artificial|tech|digital india|telecom|programmer|developer|it day|cloud|semicon|robot|mobile world|ces\b|code|engineer|password|science"),
    ("sale", r"black friday|cyber monday|singles|prime day|sale|shopping|e-commerce|ecommerce|boxing day|small business|marketing|social media|emoji|influencer"),
    ("survey", r"research|consumer|customer|survey|opinion|statistic|census|insight"),
    ("hearts", r"valentine|mother|father|friendship|children|child|family|women|daughter|sister|brother|raksha|rakhi|karva|parents|youth|kiss|hug|\blove\b|girl|grandparent|teachers|siblings|widow|older persons|men's day|men’s day|kindness|solidarity|elder|senior|albinism|discrimination|ngo day|introvert|stuttering"),
    ("book", r"theatre|creativity|museum|press freedom|radio|post day|teacher|literacy|book|education|student|braille|language|poetry|library|reading|mathematics|maths|hindi|grammar|school|knowledge"),
    ("lotus", r"meditation|buddha|vesak|mahavir|jayanti|navratri|durga|dussehra|ganesh|janmashtami|shivratri|ram navami|hanuman|chhath|onam|ugadi|gudi|baisakhi|vaisakhi|rath yatra|guru|purnima|ekadashi|puja|teej|nag panchami|basant|saraswati|vishu|chaitra|akshaya|parv|paryushan|ambedkar|festival"),
    ("dove", r"hiroshima|peace|non-violence|remembrance|martyr|memorial|human rights|tolerance|holocaust|armistice|veterans|refugee|humanitarian|justice|democracy|constitution|unity|harmony|sadbhavana|good friday|easter|labour|may day|flag day|army|air force|police|soldier|kargil|vijay|commemorat|\bformation|statehood|foundation"),
]
FLAG_WORDS = [
    (r"india|pan-india|delhi|punjab|haryana|kerala|bengal|odisha|gujarat|rajasthan|telangana|maharashtra|karnataka|bihar|goa|chennai|tamil|assam|tripura|jharkhand|hindu|jain|\bup\b|malayali", "IN"),
    (r"\busa\b|\bus\b|united states|north america|america", "US"), (r"\buk\b|britain|england|guy fawkes|commonwealth", "GB"),
    (r"canada|canada day", "CA"), (r"mexico|día de los muertos|dia de los muertos", "MX"), (r"china|chinese|lunar new year", "CN"),
    (r"japan", "JP"), (r"australia", "AU"), (r"france|bastille", "FR"), (r"germany|oktoberfest", "DE"), (r"spain|mobile world congress|mwc", "ES"),
    (r"italy", "IT"), (r"ireland|st\.? patrick", "IE"), (r"switzerland|davos", "CH"), (r"russia", "RU"), (r"saudi", "SA"),
    (r"uae|emirates|dubai", "AE"), (r"thailand|songkran", "TH"), (r"greece", None), (r"brazil|carnival", "BR"), (r"singapore", "SG"),
    (r"korea", "KR"), (r"vietnam", "VN"), (r"indonesia", "ID"), (r"malaysia", "MY"), (r"philippines", "PH"), (r"south africa", "ZA"),
    (r"kenya", "KE"), (r"nigeria", "NG"), (r"egypt", "EG"), (r"israel|jewish|hanukkah|passover", "IL"), (r"netherlands|king's day", "NL"), (r"sweden", "SE"),
]
GLOBAL = r"global|world|international|\(un\)|christian world|muslim world|europe|east & se asia|diaspora"
MSG = {
    "Festival (India)": "Happy {n}! Warm wishes to everyone celebrating, from all of us at Frequent Research.",
    "Global Festival / Holiday": "Happy {n}! Warm wishes to our clients, panellists and partners around the world.",
    "Global Observance (UN / International)": "Today is {n}. We join the world in raising awareness.",
    "National / Commemorative Day (India)": "Today we remember and honour {n}.",
    "Healthcare & Wellness": "{n}: health matters. Our MyHealthOpinions community helps every voice be heard.",
    "Finance, Banking & Tax": "{n}: an important date for every business. Our Accounts & Finance team is here to help.",
    "IT & Technology": "Celebrating {n} with every builder, coder and maker.",
    "Digital Marketing & E-commerce": "{n}: the right moment to reach the right audience.",
    "Sports & Mega Events": "Cheering on {n}! Good luck to every team and every fan.",
    "Market Research & Consumer Insights": "{n}: every opinion counts, and we make sure it is heard.",
    "Industry Event / Conference": "{n}: let's meet and talk about what's next.",
}

# update 22b: every special day has its own animation. Festivals (and Republic Day, Independence Day, Tsunami Day)
# have a hand-drawn scene (src/components/site/Festivals22.jsx); every other day gets its own subject icon (Tabler, MIT;
# day_icons.txt) plus its own mix of movement, backdrop, particles and colours ("anim").
FEST_SCENE = dict(x.split(" ") for x in """01-01 new-years-day|01-07 orthodox-christmas|01-13 lohri|01-14 makar-sankranti|01-23 vasant-panchami|01-26 republic-day|02-03 shab-e-barat|02-14 valentines-day|02-15 maha-shivaratri|02-16 presidents-day|02-17 chinese-new-year|02-18 ash-wednesday|02-19 ramadan-begins|03-03 holika-dahan|03-04 holi|03-17 st-patricks|03-19 ugadi|03-21 eid-ul-fitr|03-26 ram-navami|03-29 palm-sunday|03-31 mahavir-jayanti|04-02 hanuman-jayanti|04-03 good-friday|04-05 easter-sunday|04-06 easter-monday|04-12 orthodox-easter|04-13 songkran|04-14 baisakhi|04-15 pohela-boishakh|04-20 akshaya-tritiya|05-01 buddha-purnima|05-10 mothers-day|05-14 ascension-day|05-24 pentecost|05-25 memorial-day|05-27 eid-al-adha|06-16 islamic-new-year|06-19 dragon-boat|06-26 muharram|07-04 independence-day-usa|07-14 bastille-day|07-16 rath-yatra|07-29 guru-purnima|08-15 independence-day-india|08-26 onam|08-28 raksha-bandhan|09-04 janmashtami|09-07 labor-day|09-11 rosh-hashanah|09-12 rosh-hashanah-honey|09-14 ganesh-chaturthi|09-17 vishwakarma-puja|09-23 saudi-national-day|09-24 anant-chaturdashi|09-25 mid-autumn|10-03 german-unity-day|10-11 sharad-navratri|10-12 thanksgiving-canada|10-17 durga-puja|10-18 durga-puja-dhak|10-19 durga-ashtami|10-20 dussehra|10-25 sharad-purnima|10-26 valmiki-jayanti|10-29 karwa-chauth|10-31 halloween|11-01 ahoi-ashtami|11-02 dia-de-muertos|11-05 tsunami-day|11-06 dhanteras|11-07 choti-diwali|11-08 diwali|11-09 diwali-holiday|11-10 govardhan|11-11 bhai-dooj|11-15 chhath-puja|11-24 guru-nanak-jayanti|12-25 christmas|12-26 boxing-day|12-31 new-years-eve""".split("|"))
SOLEMN = {
    "good-friday": "Good Friday: a day of quiet reflection for Christians around the world.",
    "ash-wednesday": "Ash Wednesday: the start of Lent, a season of reflection.",
    "muharram": "Muharram: today we stand with everyone observing this day of remembrance.",
    "memorial-day": "Memorial Day: remembering those who gave their lives in service.",
}
DAY_ICONS = {}
for _l in open(__file__.rsplit("/", 1)[0] + "/day_icons.txt"):
    if "=" in _l and not _l.startswith("#"):
        _d, _v = _l.split("=")
        DAY_ICONS[_d.strip()] = _v.split()

def short(n):
    n = re.sub(r"\s*\((?:[^()]*\d[^()]*|month-long|week-long|[^()]*–[^()]*)\)", "", n).strip()
    return n

def headline(n):
    """Short banner headline: first part before ' / ' or ' – ', without the (UN)-style tags."""
    parts = re.split(r" / | – | \+ ", n)
    h = parts[0]
    if len(parts) > 1 and " " not in h.strip() and parts[1].split()[-1:] == ["Year"]:
        h = h + " " + parts[1]  # "Chinese / Lunar New Year" → "Chinese Lunar New Year"
    h = re.sub(r"\s*\((?:UN|UNESCO|ITU|FAO|IMO|UPU|WHO|begins evening)\)", "", h).strip()
    if h.count("(") > h.count(")"):
        h = h[: h.rindex("(")].strip()  # "Eid al-Adha (Bakrid / Id-ul-Zuha)" split in the middle
    m = re.match(r"^(.{6,}?)\s*\(([^()]{4,})\)$", h)
    return m.group(1).strip() if m and not re.fullmatch(r"canada|usa|india|uk|us", m.group(2).lower()) else h

def motif(text):
    t = text.lower()
    for m, rx in MOTIFS:
        if re.search(rx, t):
            return m
    return "globe"

def flags(*texts):
    t = " ".join(x for x in texts if x).lower()
    if re.search(r"christian world|muslim world|jewish", t) and not re.search(r"\bindia\b(?! \(gazetted\))", t.replace("india (gazetted)", "")):
        t = t.replace("india (gazetted)", "").replace("india", "")
    out = []
    for rx, iso in FLAG_WORDS:
        if iso and re.search(rx, t) and iso not in out:
            out.append(iso)
    return out[:4], bool(re.search(GLOBAL, t)) or not out

def main(src, dst):
    wb = openpyxl.load_workbook(src, data_only=True)
    ws = next(w for w in wb if w.title.lower().startswith("full year"))
    head = None
    events = []
    for r in ws.iter_rows(values_only=True):
        if r and r[0] == "Date":
            head = list(r)
            continue
        if not head or not isinstance(r[0], (datetime.date, datetime.datetime)):
            continue
        row = dict(zip(head, r))
        imp = (row.get("Importance") or "").strip()
        if imp.lower().startswith("low"):
            continue
        name = (row.get("Primary Event / Festival") or "").strip()
        cat = (row.get("Category") or "").strip()
        also = [a.strip() for a in re.split(r";", row.get("Also on this day (renowned / relevant)") or "") if a.strip()]
        n = short(name)
        fl, glob = flags(row.get("Region / Audience"), name)
        msg = MSG.get(cat, "Today is {n}.").replace("{n}", headline(n))
        if re.match(r"christmas", n, re.I):
            msg = "Merry Christmas! Warm wishes to our clients, panellists and partners around the world."
        if motif(name + " " + cat) == "xmas" and glob:
            fl = []  # a worldwide festival: show the globe, not one country
        events.append({
            "date": row["Date"].strftime("%Y-%m-%d"),
            "name": n,
            "title": headline(n),
            "full": name,
            "category": cat,
            "region": (row.get("Region / Audience") or "").strip(),
            "importance": {"★★★ Major": "major", "★★ High": "high", "★ Medium": "medium"}.get(imp, "medium"),
            "motif": motif(headline(n)) if motif(headline(n)) != "globe" else motif(name + " " + cat),
            "flags": fl,
            "global": glob,
            "message": msg,
            "also": [{"name": headline(short(a)), "flags": flags(headline(short(a)))[0], "motif": motif(a)} for a in also][:3],
            "services": [s.strip() for s in (row.get("Relevant Services") or "").split(",") if s.strip()],
            "show": True,
        })
        ev = events[-1]
        md = ev["date"][5:]
        if md in FEST_SCENE:
            ev["scene"] = FEST_SCENE[md]
            if ev["scene"] in SOLEMN:  # days of mourning or reflection: no "Happy …", no bunting
                ev["message"] = SOLEMN[ev["scene"]]
                ev["solemn"] = True
        elif md in DAY_ICONS:
            i = len([e for e in events if "icon" in e])
            ev["icon"] = DAY_ICONS[md]
            ev["anim"] = {"move": i % 12, "back": (i * 7 + i // 12) % 10, "fx": (i * 3 + i // 7) % 7, "pal": (i * 5 + i // 8) % 8}
            if re.search(r"remembrance|martyr|shaheed|hiroshima|holocaust|horrors|punyatithi|commemoration|slavery|suicide|violence|aids|cancer|tsunami|mahaparinirvan", ev["name"], re.I):
                ev["anim"].update({"move": 0 if i % 2 else 10, "fx": 3 if i % 2 else 2, "back": 1})  # calm and respectful
                ev["solemn"] = True
    missing = [e["date"] for e in events if "scene" not in e and "icon" not in e]
    if missing:
        print("WARNING: no scene or icon for", missing)
    write_icons(events)  # note: tools/celebrations/make_years.py rewrites Icons22.jsx with the icons of every year
    data = {"version": 1, "source": src.split("/")[-1], "updated": datetime.date.today().isoformat(), "timezone": "Asia/Kolkata", "events": events}
    json.dump(data, open(dst, "w"), ensure_ascii=False, indent=0)
    from collections import Counter
    print(len(events), "special days;", Counter(e["motif"] for e in events).most_common())

def write_icons(events):
    """src/data/Icons22.jsx: the Tabler icon outlines used by the calendar (only those), as CB22_ICONS."""
    import os
    root = os.path.dirname(os.path.abspath(__file__))
    nodes = json.load(open(os.path.join(root, "tabler", "tabler-nodes-outline.json")))
    used = sorted({n for e in events for n in e.get("icon", [])})
    bad = [n for n in used if n not in nodes]
    if bad:
        raise SystemExit("unknown Tabler icons: " + ", ".join(bad))
    out = {n: [[t, {k: v for k, v in a.items() if k != "key"}] for t, a in nodes[n]] for n in used}
    dst = os.path.join(root, "..", "..", "src", "data", "Icons22.jsx")
    with open(dst, "w") as f:
        f.write("/* Build 65 update 22b: Tabler icons (MIT, tools/celebrations/tabler/LICENSE) used by the celebration banner.\n"
                " * Generated by tools/celebrations/make_celebrations.py; do not edit. */\n")
        f.write("const CB22_ICONS = " + json.dumps(out, separators=(",", ":")) + ";\n")
    print(len(used), "icons written to src/data/Icons22.jsx")

if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "public/data/celebrations.json")
