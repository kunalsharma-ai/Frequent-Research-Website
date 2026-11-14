"""Build 65 update 24: moving festival dates for the celebrations calendar, worked out astronomically (no web data).

Hindu festivals use the amanta lunar calendar with tithi taken at the time the festival is observed (sunrise, midday,
afternoon, evening or midnight) in New Delhi, sidereal (Lahiri) months and Adhika masa; solar festivals use sidereal
sun ingress (sankranti). Checked against Kunal's 2026 calendar and known 2025 dates (see make_years.py --check).
"""
import datetime as dt, math
import ephem

IST = dt.timedelta(hours=5, minutes=30)
DELHI = ("28.6139", "77.2090")
KOCHI = ("9.9312", "76.2673")
KOLKATA = ("22.5726", "88.3639")

def _obs(loc):
    o = ephem.Observer(); o.lat, o.lon = loc; o.elevation = 216; o.pressure = 0; o.horizon = "-0:50"
    return o

def ayanamsa(jd):  # Lahiri, good to well under an arc-minute for 2020-2035
    t = (jd - 2451545.0) / 36525.0
    return 23.85305 + 1.39697 * t + 0.000308 * t * t

def _lon(body, d):
    b = body(); b.compute(d, epoch=d)
    return math.degrees(ephem.Ecliptic(b, epoch=d).lon)

def sun_lon(d): return _lon(ephem.Sun, d)
def moon_lon(d): return _lon(ephem.Moon, d)
def jd(d): return ephem.julian_date(d)
def sid_sun(d): return (sun_lon(d) - ayanamsa(jd(d))) % 360
def sid_moon(d): return (moon_lon(d) - ayanamsa(jd(d))) % 360
def elong(d): return (moon_lon(d) - sun_lon(d)) % 360
def tithi(d): return int(elong(d) // 12) + 1  # 1..30 (15 purnima, 30 amavasya)

def to_ephem(local):  # IST naive datetime -> ephem date (UTC)
    return ephem.Date(local - IST)

def to_local(e):
    return ephem.Date(e).datetime() + IST

def sunrise(day, loc=DELHI):
    o = _obs(loc); o.date = to_ephem(dt.datetime.combine(day, dt.time(0, 0)))
    return o.next_rising(ephem.Sun())

def sunset(day, loc=DELHI):
    o = _obs(loc); o.date = to_ephem(dt.datetime.combine(day, dt.time(6, 0)))
    return o.next_setting(ephem.Sun())

def moonrise(day, loc=DELHI):
    o = _obs(loc); o.date = to_ephem(dt.datetime.combine(day, dt.time(12, 0)))
    return o.next_rising(ephem.Moon())

def when(day, rule, loc=DELHI):
    sr, ss = sunrise(day, loc), sunset(day, loc)
    span = ss - sr
    if rule == "sunrise": return sr
    if rule == "midday": return sr + span * 0.5          # madhyahna centre
    if rule == "aparahna": return sr + span * 0.7        # afternoon (Dussehra, Bhai Dooj)
    if rule == "pradosh": return ss + ephem.hour * 1.0   # evening after sunset
    if rule == "nishita":                                  # local midnight between this day and the next
        nsr = sunrise(day + dt.timedelta(days=1), loc); return ss + (nsr - ss) * 0.5
    if rule == "moonrise": return moonrise(day, loc)
    raise ValueError(rule)

def _bisect(f, a, b, it=40):
    fa = f(a)
    for _ in range(it):
        m = (a + b) / 2
        if (f(m) > 0) == (fa > 0): a, fa = m, f(m)
        else: b = m
    return (a + b) / 2

def new_moons(year):
    out, d = [], ephem.Date(f"{year-1}/11/01")
    while True:
        d = ephem.next_new_moon(d)
        if d > ephem.Date(f"{year+1}/03/01"): break
        out.append(ephem.Date(d)); d = ephem.Date(d + 1)
    return out

MONTHS = ["chaitra", "vaishakha", "jyeshtha", "ashadha", "shravana", "bhadrapada", "ashwin", "kartika", "margashirsha", "pausha", "magha", "phalguna"]

def lunar_months(year):
    """amanta months as (name, adhika, start_new_moon, end_new_moon)."""
    nm = new_moons(year); out = []
    for a, b in zip(nm, nm[1:]):
        ra, rb = int(sid_sun(a) // 30), int(sid_sun(b) // 30)
        out.append((MONTHS[(ra + 1) % 12], ra == rb, a, b))
    return out

def month_of(e, months):
    for name, adh, a, b in months:
        if a <= e < b: return name, adh
    return None, None

def lunar(year, month, t, rule="sunrise", loc=DELHI):
    """Civil date (IST) in `year` of tithi t (1..30) of the nija amanta `month`, observed at `rule` time."""
    months = lunar_months(year)
    cands = [(a, b) for n, adh, a, b in months if n == month and not adh]
    for a, b in cands:
        d0 = to_local(a).date() - dt.timedelta(days=1)
        hits = []
        for k in range(0, 33):
            day = d0 + dt.timedelta(days=k)
            e = when(day, rule, loc)
            if a <= e < b and tithi(e) == t: hits.append(day)
        if not hits:  # kshaya: the tithi starts after one observance time and ends before the next; take that day
            prev, nxt = (t - 2) % 30 + 1, t % 30 + 1
            for k in range(0, 33):
                day = d0 + dt.timedelta(days=k)
                e, e2 = when(day, rule, loc), when(day + dt.timedelta(days=1), rule, loc)
                if e < b and e2 >= a and tithi(e) == prev and tithi(e2) == nxt: hits.append(day); break
        res = [h for h in hits if h.year == year]
        if res: return res[0]
    return None

def sankranti(year, deg, loc=DELHI):
    """Civil date of the sun's sidereal ingress into `deg`; after sunset counts for the next day (punya kaal)."""
    start = ephem.Date(f"{year}/01/01")
    f = lambda d: ((sid_sun(d) - deg + 180) % 360) - 180
    d = start
    while f(d) >= 0: d = ephem.Date(d + 5)   # ensure before
    while f(d) < 0: d = ephem.Date(d + 1)
    e = ephem.Date(_bisect(f, d - 1, d))
    day = to_local(e).date()
    if e > sunset(day, loc): day += dt.timedelta(days=1)
    return day

def onam(year):
    """Thiruvonam: the day in Chingam (sun in sidereal Leo) whose sunrise at Kochi falls in Shravana nakshatra."""
    a, b = sankranti(year, 120, KOCHI), sankranti(year, 150, KOCHI)
    for k in range((b - a).days):
        day = a + dt.timedelta(days=k)
        n = int(sid_moon(sunrise(day, KOCHI)) // (360 / 27))
        if n == 21: return day  # 0=Ashwini … 21=Shravana
    return None

def equinox_solstice(year):
    f = lambda e: (ephem.Date(e).datetime() - dt.timedelta(hours=5)).date()  # dates as listed in the Americas/UTC-5
    return {"mar": f(ephem.next_vernal_equinox(str(year))), "jun": f(ephem.next_summer_solstice(str(year))),
            "sep": f(ephem.next_autumnal_equinox(str(year))), "dec": f(ephem.next_winter_solstice(str(year)))}
