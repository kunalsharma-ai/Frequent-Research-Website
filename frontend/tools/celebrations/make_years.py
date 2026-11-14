#!/usr/bin/env python3
"""Build 65 update 24: the celebrations calendar for the years after 2026.

Usage: python3 tools/celebrations/make_years.py [first_year] [last_year]      (default 2027 2030)
       python3 tools/celebrations/make_years.py --check                     (re-derive 2026 and compare)

Takes the 2026 calendar made from Kunal's workbook (public/data/celebrations.json) and moves every day to its date in
each later year:
  * fixed days (World Health Day, Christmas, Republic Day …) keep their date;
  * weekday rules (Mother's Day = 2nd Sunday of May, Thanksgiving, Black Friday …) are worked out;
  * moving festivals are calculated: Hindu festivals and sankrantis (panchang.py, astronomical, New Delhi),
    Islamic days (Umm al-Qura calendar with the same India offset as Kunal's 2026 sheet: moon sighting can still move
    them by a day), Easter and the days tied to it, Orthodox Easter, Jewish and Chinese festivals;
  * one-off or unscheduled events (CES, Davos, FIFA World Cup 2026, RBI and Fed meetings, tournaments, eclipses …)
    are left out, because their future dates are not published yet. Add them in the super admin panel when known.
Each day keeps its own animation (scene or icon) from 2026, so no two days in a year look the same. A day that was an
"also today" item in 2026 and now stands alone gets its own icon from PROMOTE below.
Writes public/data/celebrations-YYYY.json per year (the site loads only the year it needs).
"""
import json, re, sys, os, datetime as dt
from collections import defaultdict

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import panchang as P
from make_celebrations import motif, flags, MSG, write_icons
from hijridate import Hijri, Gregorian
import pyluach.dates as HD
from lunardate import LunarDate

ROOT = os.path.join(HERE, "..", "..")
D = dt.date
day = dt.timedelta(days=1)

# ---------------------------------------------------------------- rules (first match on the lower-cased name wins)
DROP = r"\bces\b|davos|world economic forum|wef\b|australian open|q3 fy\d* results|fomc|rbi mpc|rbi monetary|winter olympics|t20 world cup|super bowl|mwc|mobile world congress|annular|solar eclipse|not visible|french open|roland garros|fifa world cup|wimbledon|tour de france|commonwealth games|us open|asian games|earth hour|^belated$|dec 4–12"
RULES = [
    # Hindu lunar (amanta month, tithi 1-30, time the tithi must hold)
    (r"vasant panchami", ("lunar", "magha", 5, "midday")),
    (r"guru ravidas", ("lunar", "magha", 15, "sunrise")),
    (r"maha shivaratri", ("lunar", "magha", 29, "nishita")),
    (r"holika dahan", ("lunar", "phalguna", 15, "pradosh")),
    (r"^holi\b", ("lunar", "phalguna", 15, "pradosh", 1)),
    (r"ugadi|gudi padwa", ("lunar", "chaitra", 1, "sunrise")),
    (r"ram navami", ("lunar", "chaitra", 9, "midday")),
    (r"mahavir jayanti", ("lunar", "chaitra", 13, "sunrise")),
    (r"hanuman jayanti", ("lunar", "chaitra", 15, "sunrise")),
    (r"akshaya tritiya", ("lunar", "vaishakha", 3, "sunrise")),
    (r"buddha purnima", ("lunar", "vaishakha", 15, "sunrise")),
    (r"shani jayanti", ("lunar", "vaishakha", 30, "sunrise")),
    (r"kabir das", ("lunar", "jyeshtha", 15, "sunrise")),
    (r"rath yatra", ("lunar", "ashadha", 2, "sunrise")),
    (r"guru purnima", ("lunar", "ashadha", 15, "sunrise")),
    (r"raksha bandhan", ("rakhi",)),
    (r"janmashtami", ("lunar", "shravana", 23, "sunrise")),
    (r"ganesh chaturthi", ("lunar", "bhadrapada", 4, "midday")),
    (r"anant chaturdashi", ("rel", ("lunar", "bhadrapada", 4, "midday"), 10)),
    (r"pitru paksha", ("lunar", "bhadrapada", 15, "sunrise")),
    (r"mahalaya", ("lunar", "bhadrapada", 30, "sunrise")),
    (r"sharad navratri", ("lunar", "ashwin", 1, "sunrise")),
    (r"maha shashthi", ("durga", -2)),
    (r"maha saptami", ("durga", -1)),
    (r"durga ashtami", ("durga", 0)),
    (r"^maha navami", ("durga", 1)),
    (r"dussehra|vijayadashami", ("lunar", "ashwin", 10, "aparahna")),
    (r"sharad purnima", ("lunar", "ashwin", 15, "pradosh")),
    (r"valmiki", ("lunar", "ashwin", 15, "sunrise")),
    (r"karwa chauth", ("lunar", "ashwin", 19, "moonrise")),
    (r"ahoi ashtami", ("lunar", "ashwin", 23, "pradosh")),
    (r"dhanteras", ("lunar", "ashwin", 28, "pradosh")),
    (r"choti diwali|naraka chaturdashi", ("lunar", "ashwin", 30, "pradosh", -1)),
    (r"^diwali holiday", ("lunar", "ashwin", 30, "pradosh", 1)),
    (r"^diwali|deepavali", ("lunar", "ashwin", 30, "pradosh")),
    (r"govardhan", ("lunar", "kartika", 1, "sunrise")),
    (r"bhai dooj", ("lunar", "kartika", 1, "sunrise", 1)),
    (r"chhath", ("lunar", "kartika", 6, "sunrise")),
    (r"dev uthani", ("lunar", "kartika", 11, "sunrise")),
    (r"tulsi vivah", ("lunar", "kartika", 12, "sunrise")),
    (r"guru nanak|kartik purnima", ("lunar", "kartika", 15, "sunrise")),
    (r"gita jayanti", ("lunar", "margashirsha", 11, "sunrise")),
    # Hindu solar
    (r"^lohri", ("sank", 270, -1)),
    (r"mattu pongal", ("sank", 270, 1)),
    (r"makar sankranti|pongal|uttarayan|magh bihu", ("sank", 270, 0)),
    (r"baisakhi|vaisakhi", ("sank", 0, 0)),
    (r"pohela boishakh", ("sank", 0, 1)),
    (r"vishwakarma", ("sank", 150, 0)),
    (r"^onam", ("onam",)),
    # Islamic (Umm al-Qura + India offset as in Kunal's 2026 sheet)
    (r"shab-e-barat", ("isl", 8, 15, 0)),
    (r"ramadan begins", ("isl", 9, 1, 1)),
    (r"eid-ul-fitr|ramzan id", ("isl", 10, 1, 1)),
    (r"eid al-adha|bakrid", ("isl", 12, 10, 1)),  # 2026 sheet: +0; published 2027-30 lists: +1
    (r"islamic new year", ("isl", 1, 1, 0)),
    (r"muharram|ashura", ("isl", 1, 10, 1)),
    (r"milad", ("isl", 3, 12, 1)),
    # Christian (Easter based)
    (r"mardi gras", ("easter", -47)),
    (r"ash wednesday", ("easter", -46)),
    (r"palm sunday", ("easter", -7)),
    (r"good friday", ("easter", -2)),
    (r"orthodox easter", ("oeaster", 0)),
    (r"easter monday", ("easter", 1)),
    (r"easter", ("easter", 0)),
    (r"ascension", ("easter", 39)),
    (r"pentecost", ("easter", 49)),
    # Jewish (pyluach; evening starts are the day before)
    (r"passover", ("heb", 1, 15, -1, 0)),
    (r"rosh hashanah.*begins", ("heb", 7, 1, -1, 1)),
    (r"rosh hashanah", ("heb", 7, 1, 0, 1)),
    (r"yom kippur", ("heb", 7, 10, 0, 1)),
    (r"hanukkah", ("heb", 9, 25, -1, 1)),
    # Chinese lunisolar
    (r"chinese|lunar new year", ("chn", 1, 1)),
    (r"dragon boat", ("chn", 5, 5)),
    (r"mid-autumn", ("chn", 8, 15)),
    # weekday rules: (month, weekday Mon=0, n (−1 = last), extra days)
    (r"martin luther king", ("nth", 1, 0, 3)),
    (r"blue monday", ("nth", 1, 0, 3)),
    (r"world religion day", ("nth", 1, 6, 3)),
    (r"safer internet", ("nth", 2, 1, 2)),
    (r"presidents' day", ("nth", 2, 0, 3)),
    (r"world kidney", ("nth", 3, 3, 2)),
    (r"world password", ("nth", 5, 3, 1)),
    (r"mother's day", ("nth", 5, 6, 2)),
    (r"global accessibility", ("nth", 5, 3, 3)),
    (r"memorial day", ("nth", 5, 0, -1)),
    (r"father's day", ("nth", 6, 6, 3)),
    (r"system administrator", ("nth", 7, 4, -1)),
    (r"friendship day", ("nth", 8, 6, 1)),
    (r"labor day", ("nth", 9, 0, 1)),
    (r"software freedom", ("nth", 9, 5, 3)),
    (r"customer service week|world habitat", ("nth", 10, 0, 1)),
    (r"customer experience|cx day", ("nth", 10, 1, 1)),
    (r"thanksgiving \(canada\)|indigenous peoples' day", ("nth", 10, 0, 2)),
    (r"ada lovelace", ("nth", 10, 1, 2)),
    (r"global entrepreneurship week", ("nth", 11, 0, 3)),
    (r"thanksgiving", ("nth", 11, 3, 4)),
    (r"black friday", ("nth", 11, 3, 4, 1)),
    (r"small business saturday", ("nth", 11, 3, 4, 2)),
    (r"cyber monday", ("nth", 11, 3, 4, 4)),
    (r"giving tuesday", ("nth", 11, 3, 4, 5)),
    (r"get to know your customers", ("gtkyc",)),
    (r"world sleep day", ("sleep",)),
    (r"us tax day", ("taxday",)),
    (r"programmers' day", ("day256",)),
    (r"oktoberfest", ("okt",)),
    (r"computer science education week", ("csed",)),
    (r"nowruz|march equinox", ("eq", "mar")),
    (r"june solstice", ("eq", "jun")),
    (r"september equinox", ("eq", "sep")),
    (r"december solstice", ("eq", "dec")),
]

def rule_for(name):
    n = name.lower()
    if re.search(DROP, n): return ("drop",)
    for rx, r in RULES:
        if re.search(rx, n): return r
    return ("fixed",)

def easter(y):  # Anonymous Gregorian algorithm
    a, b, c = y % 19, y // 100, y % 100
    d, e = b // 4, b % 4
    f = (b + 8) // 25; g = (b - f + 1) // 3
    h = (19 * a + b - d - g + 15) % 30
    i, k = c // 4, c % 4
    l = (32 + 2 * e + 2 * i - h - k) % 7
    m = (a + 11 * h + 22 * l) // 451
    mo = (h + l - 7 * m + 114) // 31; da = (h + l - 7 * m + 114) % 31 + 1
    return D(y, mo, da)

def oeaster(y):  # Julian computus, shown in the Gregorian calendar
    a, b, c = y % 4, y % 7, y % 19
    d = (19 * c + 15) % 30; e = (2 * a + 4 * b - d + 34) % 7
    mo = (d + e + 114) // 31; da = (d + e + 114) % 31 + 1
    return D(y, mo, da) + dt.timedelta(days=13)

def nth(y, mo, wd, n):
    if n > 0:
        d0 = D(y, mo, 1); return d0 + dt.timedelta(days=(wd - d0.weekday()) % 7 + 7 * (n - 1))
    d0 = (D(y, mo + 1, 1) if mo < 12 else D(y + 1, 1, 1)) - day
    return d0 - dt.timedelta(days=(d0.weekday() - wd) % 7)

def islamic(y, m, d, off):
    out = []
    h0 = Gregorian(y, 1, 1).to_hijri().year
    for hy in (h0 - 1, h0, h0 + 1):
        try:
            g = Hijri(hy, m, d).to_gregorian(); g = D(g.year, g.month, g.day) + dt.timedelta(days=off)
        except Exception:
            continue
        if g.year == y: out.append(g)
    return out

def hebrew(y, m, d, off, yearshift):
    out = []
    for hy in (y + 3759, y + 3760, y + 3761):
        g = HD.HebrewDate(hy, m, d).to_greg(); g = D(g.year, g.month, g.day) + dt.timedelta(days=off)
        if g.year == y: out.append(g)
    return out

def dates_for(rule, y, base):
    k = rule[0]
    if k == "drop": return []
    if k == "fixed":
        try: return [D(y, base.month, base.day)]
        except ValueError: return []
    if k == "lunar":
        r = P.lunar(y, rule[1], rule[2], rule[3], P.KOLKATA if rule[1] == "ashwin" and 6 <= rule[2] <= 9 else P.DELHI); return [r + dt.timedelta(days=rule[4] if len(rule) > 4 else 0)] if r else []
    if k == "rel": return [d + dt.timedelta(days=rule[2]) for d in dates_for(rule[1], y, base)]
    if k == "durga":  # Durga Puja days around Maha Ashtami (Kolkata sunrise); Navami joins Ashtami when Dussehra follows
        a = P.lunar(y, "ashwin", 8, "sunrise", P.KOLKATA); dus = P.lunar(y, "ashwin", 10, "aparahna")
        if rule[1] == 1: return [a if a + day >= dus else a + day]
        return [a + dt.timedelta(days=rule[1])]
    if k == "rakhi":  # Shravana Purnima; if it ends within 6 ghatis (2 h 24 min) of sunrise, the day before
        d = P.lunar(y, "shravana", 15, "sunrise")
        return [d if P.tithi(P.sunrise(d) + P.ephem.hour * 2.4) == 15 else d - day]
    if k == "sank": return [P.sankranti(y, rule[1]) + dt.timedelta(days=rule[2])]
    if k == "onam": return [P.onam(y)]
    if k == "isl": return islamic(y, *rule[1:])
    if k == "easter": return [easter(y) + dt.timedelta(days=rule[1])]
    if k == "oeaster": return [oeaster(y) + dt.timedelta(days=rule[1])]
    if k == "heb": return hebrew(y, *rule[1:])
    if k == "chn":
        g = LunarDate(y, rule[1], rule[2]).to_solar_date(); return [D(g.year, g.month, g.day)]
    if k == "nth": return [nth(y, rule[1], rule[2], rule[3]) + dt.timedelta(days=rule[4] if len(rule) > 4 else 0)]
    if k == "gtkyc": return [nth(y, base.month, 3, 3)]  # third Thursday of Jan, Apr, Jul, Oct
    if k == "sleep":
        eq = P.equinox_solstice(y)["mar"]; d = eq - day
        while d.weekday() != 4: d -= day
        return [d]
    if k == "taxday":  # 15 April, moved past weekends and DC Emancipation Day (16 April, observed)
        em = D(y, 4, 16); em = em - day if em.weekday() == 5 else em + day if em.weekday() == 6 else em
        d = D(y, 4, 15)
        while d.weekday() >= 5 or d == em: d += day
        return [d]
    if k == "day256": return [D(y, 1, 1) + dt.timedelta(days=255)]
    if k == "okt":
        s = nth(y, 10, 6, 1); return [s - dt.timedelta(days=15)]
    if k == "csed":
        d = D(y, 12, 9); return [d - dt.timedelta(days=d.weekday())]
    if k == "eq": return [P.equinox_solstice(y)[rule[1]]]
    raise ValueError(rule)

def roman(n):
    out = ""
    for v, s in ((1000, "M"), (900, "CM"), (500, "D"), (400, "CD"), (100, "C"), (90, "XC"), (50, "L"), (40, "XL"), (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")):
        while n >= v: out += s; n -= v
    return out

ZODIAC = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]

def year_text(s, y):
    """Move year labels on, in one pass: FY 2026-27 → FY 2027-28, AY 2026-27, Q1 FY27, 2026, Year of the Horse …"""
    if not isinstance(s, str): return s
    dy = y - 2026
    def f(m):
        if m.group(1): return f"{int(m.group(1)) + dy}-{(int(m.group(2)) + dy) % 100:02d}"
        if m.group(3): return f"FY{int(m.group(3)) + dy}"
        if m.group(4): return str(int(m.group(4)) + dy)
        return "Year of the " + ZODIAC[(y - 2020) % 12]
    return re.sub(r"\b(20\d\d)-(\d\d)\b|\bFY(\d\d)\b|\b(2026)\b|Year of the [A-Z][a-z]+", f, s)

# Days that were "also today" in 2026 but may stand alone in other years: their own subject icon (main, accent)
PROMOTE_RAW = {  # name: (main icon candidates, first unused one wins; accent icon)
    "Epiphany": (["star", "building-church"], "crown"),
    "Rose Day": (["flower", "flower-off"], "heart"),
    "Propose Day": (["diamond", "ring"], "heart"),
    "Global Recycling Day": (["recycle"], "bottle"),
    "International Dance Day": (["shoe", "music"], "music"),
    "Desertification & Drought Day": (["cactus"], "sun-high"),
    "Paper Bag Day": (["paper-bag", "shopping-bag-plus"], "leaf"),
    "National Broadcasting Day": (["broadcast"], "radio"),
    "World Ozone Day": (["sun-wind", "haze"], "shield"),
    "International Animation Day": (["movie"], "sparkles"),
    "International Anti-Corruption Day": (["scale-outline", "gavel-off", "hand-off"], "shield-check"),
    "Chhatrapati Shivaji Maharaj Jayanti": (["sword", "swords"], "flag"),
    "Milad-un-Nabi": (["mosque", "moon-2"], "moon-stars"),
    "Mardi Gras": (["mask"], "music"),
    "Uttarakhand Foundation Day": (["mountain-2", "trekking"], "flag"),
    "Maha Navami": (["lamp", "flame-off"], "flower"),
    "Juneteenth": (["bell-ringing", "bell"], "flag"),
    "Pitru Paksha begins": (["lamp-2", "flame-off"], "leaf"),
    "Mahalaya Amavasya": (["moon-off", "moon-2"], "candle"),
    "Parakram Diwas": (["military-rank", "military-award"], "flag"),
    "Martin Luther King Jr. Day": (["message-2-heart", "quote-open"], "heart-handshake"),
    "Mattu Pongal": (["bell-school", "bell-ringing-2"], "plant-2"),
    "Guru Ravidas Jayanti": (["book-upload", "notebook"], "sun"),
    "Statehood Day: Tripura, Manipur, Meghalaya": (["map-pin-star", "map-pin-2"], "flag"),
    "Statehood Day: Arunachal Pradesh & Mizoram": (["map-pin-heart", "map-pins"], "flag"),
    "Nowruz Persian New Year": (["seedling", "plant"], "fish"),
    "Shani Jayanti": (["planet", "brightness", "planet-off"], "sun"),
    "Sant Kabir Das Jayanti": (["quote", "feather"], "book-2"),
    "Dev Uthani Ekadashi": (["sunrise", "plant-2"], "sun"),
    "Tulsi Vivah": (["leaf-2", "plant"], "heart"),
    "Gita Jayanti": (["book-upload", "notebook", "books"], "wheel"),
    "Passover begins": (["glass-full", "bread"], "star"),
    "Yom Kippur": (["quotes", "notes"], "candle"),
    "Hanukkah begins": (["brightness-up", "diamonds"], "star"),
    "World Religion Day": (["world-heart", "globe"], "heart-handshake"),
    "Ascension Day": (["cloud", "cloud-heart"], "sun"),
    "Pentecost": (["brightness-2", "haze-moon"], "sparkles"),
    "Labor Day": (["hammer", "tool"], "flag"),
    "Father's Day": (["tie", "mustache"], "heart"),
    "Giving Tuesday": (["gift", "gift-card"], "heart-handshake"),
    "Thanksgiving (USA)": (["meat", "bread"], "leaf"),
    "Africa Day": (["map-2", "map"], "sun"),
    "All Saints' Day": (["building-church", "home-2"], "star"),
    "Anti-Terrorism Day": (["shield-x"], "peace"),
    "Antyodaya Diwas": (["home-heart", "home-hand", "building-community"], "heart"),
    "Computer Security Day": (["lock", "lock-password"], "device-desktop"),
    "Financial Year-End FY 2025-26": (["calendar-check", "report-analytics"], "coins"),
    "State Formation Day": (["map-pins", "map-pin-2"], "flag"),
    "Get to Know Your Customers Day": (["user-heart"], "message-circle"),
    "International Accounting Day": (["calculator"], "file-spreadsheet"),
    "International Day for Disaster Risk Reduction": (["alert-octagon"], "lifebuoy"),
    "International Day for Tolerance": (["puzzle"], "heart"),
    "International Day for the Eradication of Poverty": (["soup", "bowl-spoon"], "heart"),
    "International Day of Family Remittances": (["cash-banknote-move", "cash"], "home"),
    "International Day of Human Space Flight": (["ufo", "rocket-off"], "star"),
    "International Day of Sport for Development & Peace": (["ball-volleyball", "ball-baseball"], "peace"),
    "International Day of the Girl Child": (["gender-female"], "star"),
    "International Internet Day": (["router"], "wifi"),
    "International Labour Day": (["hammer-drill", "tool"], "flag"),
    "International Tiger Day": (["eye-heart", "trees"], "leaf"),
    "NSS Day": (["hand-click", "hand-grab"], "heart"),
    "National Deworming Day": (["medicine-syrup", "prescription"], "school"),
    "National Maritime Day": (["sailboat"], "anchor"),
    "National Press Day": (["news-off", "file-text", "notebook"], "pencil"),
    "Singles' Day": (["discount", "shopping-bag-discount"], "shopping-cart"),
    "System Administrator Appreciation Day": (["server"], "terminal-2"),
    "World Autism Awareness Day": (["puzzle-2"], "heart"),
    "World Backup Day": (["database"], "cloud-upload"),
    "World Day Against Cyber Censorship": (["lock-open", "world-off"], "world-www"),
    "World Day for Cultural Diversity": (["brush"], "music"),
    "World Lupus Day": (["bandage"], "heart"),
    "World Pharmacists Day": (["prescription", "medicine-syrup"], "pill"),
    "World Pulses Day": (["grain", "bowl"], "leaf"),
    "World Science Day for Peace & Development": (["test-pipe"], "peace"),
    "World Thinking Day": (["brain"], "bulb"),
    "World Voice Day": (["volume"], "music"),
    "World Wildlife Day": (["deer"], "leaf"),
    "Brazil Independence Day": (["flag-star", "confetti"], "star"),
    "Mexico Independence Day": (["bell-ringing", "confetti-off"], "flag"),
    "Singapore National Day": (["building-skyscraper", "confetti"], "flag"),
    "Children's Day (Japan & Korea)": (["confetti", "balloon-off"], "star"),
}
ALSO_NAMES = {  # clearer names for "also today" items whose 2026 text lost its country or state
    ("01-21", "Statehood Day"): ("Statehood Day: Tripura, Manipur, Meghalaya", ["IN"]),
    ("02-20", "Statehood Day"): ("Statehood Day: Arunachal Pradesh & Mizoram", ["IN"]),
    ("09-07", "Independence Day"): ("Brazil Independence Day", ["BR"]),
    ("09-16", "Independence Day"): ("Mexico Independence Day", ["MX"]),
    ("08-14", "Independence Day"): ("Pakistan Independence Day", []),
    ("08-09", "National Day"): ("Singapore National Day", ["SG"]),
    ("11-01", "Formation Day"): ("State Formation Day", ["IN"]),
    ("05-05", "Children's Day"): ("Children's Day (Japan & Korea)", ["JP", "KR"]),
    ("02-11", "National Foundation Day"): ("National Foundation Day (Japan)", ["JP"]),
}

def _resolve_promote():
    nodes = json.load(open(os.path.join(HERE, "tabler", "tabler-nodes-outline.json")))
    base = json.load(open(os.path.join(ROOT, "public", "data", "celebrations.json")))
    used = {e["icon"][0] for e in base["events"] if e.get("icon")}
    out = {}
    for n, (cands, acc) in PROMOTE_RAW.items():
        pick = next((c for c in cands if c in nodes and c not in used), None)
        if not pick:
            raise SystemExit(f"no free icon for {n}: {cands}")
        if acc not in nodes: raise SystemExit(f"unknown accent {acc} for {n}")
        used.add(pick); out[n] = [pick, acc]
    return out
PROMOTE = _resolve_promote()

IMP = {"major": 3, "high": 2, "medium": 1}

def load_base():
    return json.load(open(os.path.join(ROOT, "public", "data", "celebrations.json")))

def items_from(base):
    """Every name in the 2026 calendar as an item: primaries keep their whole event (and so their animation)."""
    items = []
    for i, e in enumerate(base["events"]):
        bd = D.fromisoformat(e["date"])
        name = e["name"]
        prim = dict(e); prim.pop("also", None)
        # 2026-only combined names
        if name.startswith("Onam (Thiruvonam) + Milad"):
            prim.update(name="Onam (Thiruvonam)", title="Onam", full="Onam (Thiruvonam)")
            items.append({"kind": "also", "name": "Milad-un-Nabi", "flags": ["IN"], "motif": "crescent", "base": bd, "order": i})
        if name.startswith("Diwali holiday (day after) / Uttarakhand"):
            prim.update(name="Diwali holiday (day after)", title="Diwali holiday", full="Diwali holiday (day after)")
            items.append({"kind": "also", "name": "Uttarakhand Foundation Day", "flags": ["IN"], "motif": "globe", "base": bd, "order": i})
        if name.startswith("Durga Ashtami / Maha Navami"):
            prim.update(name="Durga Ashtami (Durga Puja)", title="Durga Ashtami", full="Durga Ashtami (Durga Puja)")
            items.append({"kind": "also", "name": "Maha Navami", "flags": ["IN"], "motif": "lotus", "base": bd, "order": i})
        items.append({"kind": "primary", "name": prim["name"], "ev": prim, "base": bd, "order": i})
        for a in e.get("also", []):
            nm = {"Hanukkah begins (evening": "Hanukkah begins"}.get(a["name"], a["name"])
            fl = a.get("flags", [])
            if (e["date"][5:], nm) in ALSO_NAMES: nm, fl = ALSO_NAMES[(e["date"][5:], nm)]
            items.append({"kind": "also", "name": nm, "flags": fl, "motif": a.get("motif", "globe"), "base": bd, "order": i})
    return items

def promoted_event(it, d, y, used):
    n = year_text(it["name"], y)
    t = n.lower()
    fest = re.search(r"jayanti|diwas|purnima|ekadashi|navami|amavasya|paksha|pongal|vivah|milad|passover|hanukkah|kippur|mardi gras|epiphany|nowruz|pentecost|ascension", t)
    cat = "Festival (India)" if fest and "IN" in it["flags"] else "Global Festival / Holiday" if fest else "Global Observance (UN / International)"
    if re.search(r"father's|thanksgiving|labor day|juneteenth|black friday|cyber monday|giving tuesday", t): cat = "Global Festival / Holiday"
    solemn = bool(re.search(r"yom kippur|mahaparinirvan|pitru|mahalaya", t))
    msg = (f"{n}: a day of quiet reflection." if solemn else MSG.get(cat, "Today is {n}.").replace("{n}", n))
    fl, glob = flags(n)
    ic = PROMOTE.get(it["name"])
    if not ic:
        return None
    ev = {"date": d.isoformat(), "name": n, "title": n, "full": n, "category": cat, "region": "", "importance": "medium",
          "motif": it["motif"] if it["motif"] != "globe" else motif(n), "flags": it["flags"] or fl, "global": glob and not it["flags"],
          "message": msg, "services": ["MR", "DM"], "show": True, "icon": ic}
    i = len(used)
    ev["anim"] = {"move": i % 12, "back": (i * 7) % 10, "fx": (i * 3) % 7, "pal": (i * 5) % 8}
    if solemn:
        ev["anim"].update({"move": 0, "fx": 3, "back": 1}); ev["solemn"] = True
    return ev

def build_year(y, base, items, log):
    bydate = defaultdict(list)
    for it in items:
        rule = it.get("rule") or rule_for(it["name"])
        try:
            ds = dates_for(rule, y, it["base"])
        except Exception as ex:
            log.append(f"{y} {it['name']}: {ex}"); ds = []
        for d in ds:
            if d and d.year == y: bydate[d].append(it)
    events, used_vis, seen_names = [], set(), set()
    for d in sorted(bydate):
        # festivals with a hand-drawn scene first, then other 2026 main days by importance, then former "also" days
        its = sorted(bydate[d], key=lambda it: (it["kind"] != "primary", "scene" not in it.get("ev", {}), -IMP.get(it.get("ev", {}).get("importance"), 0), it["order"]))
        lead = its[0]
        if lead["kind"] == "primary":
            ev = json.loads(json.dumps(lead["ev"]))
            ev["date"] = d.isoformat()
        else:
            ev = None
            for cand in its:
                ev = promoted_event(cand, d, y, used_vis)
                if ev: lead = cand; break
            if not ev:
                log.append(f"{y}-{d:%m-%d} no visual for: " + ", ".join(i["name"] for i in its)); continue
        for k in ("name", "title", "full", "message"):
            ev[k] = year_text(ev.get(k), y)
        if re.search(r"super bowl", ev["name"], re.I):
            ev["name"] = ev["title"] = re.sub(r"\b[LXVI]+$", roman(y - 1966), ev["name"])
        also = []
        for it in its:
            if it is lead: continue
            nm = year_text(it["ev"]["title"] if it["kind"] == "primary" else it["name"], y)
            if nm not in [a["name"] for a in also] and nm != ev["title"]:
                also.append({"name": nm, "flags": (it["ev"]["flags"] if it["kind"] == "primary" else it["flags"]), "motif": it["ev"]["motif"] if it["kind"] == "primary" else it["motif"]})
        ev["also"] = also[:3]
        vis = ev.get("scene") or "icon:" + (ev.get("icon") or ["?"])[0]
        if vis in used_vis and ev["name"] not in seen_names:
            log.append(f"{y}-{d:%m-%d} repeats the animation of another day: {ev['name']} ({vis})")
        used_vis.add(vis); seen_names.add(ev["name"])
        events.append(ev)
    return events

def check(base, items):
    """Re-derive 2026 with the rules and list every date that differs from Kunal's sheet."""
    bad = 0
    for it in items:
        rule = it.get("rule") or rule_for(it["name"])
        if rule[0] in ("fixed", "drop"): continue
        ds = dates_for(rule, 2026, it["base"])
        if it["base"] not in ds:
            bad += 1; print(f"  {it['name']}: sheet {it['base']}  rule {rule} -> {', '.join(map(str, ds))}")
    print(bad, "differences in 2026")

def main(a):
    base = load_base(); items = items_from(base)
    if a and a[0] == "--check":
        check(base, items); return
    y0, y1 = (int(a[0]), int(a[1])) if len(a) > 1 else (2027, 2030)
    # 2026 stays exactly as made from Kunal's sheet; a per-year copy lets the site load every year the same way
    json.dump(base, open(os.path.join(ROOT, "public", "data", "celebrations-2026.json"), "w"), ensure_ascii=False, indent=0)
    icons_extra = set()
    for y in range(y0, y1 + 1):
        log = []
        evs = build_year(y, base, items, log)
        for e in evs: icons_extra.update(e.get("icon", []))
        data = {"version": 1, "source": base["source"] + f" (moved to {y} by tools/celebrations/make_years.py)", "updated": dt.date.today().isoformat(),
                "timezone": base["timezone"], "year": y, "events": evs}
        json.dump(data, open(os.path.join(ROOT, "public", "data", f"celebrations-{y}.json"), "w"), ensure_ascii=False, indent=0)
        print(y, len(evs), "special days")
        for l in log: print("  ", l)
    # Icons22.jsx must hold the icons of every year (2026 + the promoted days of later years)
    allev = list(base["events"])
    for y in range(2026, 2100):
        f = os.path.join(ROOT, "public", "data", f"celebrations-{y}.json")
        if y > 2026 and os.path.exists(f): allev += json.load(open(f))["events"]
    write_icons(allev)
    return icons_extra

if __name__ == "__main__":
    main(sys.argv[1:])
