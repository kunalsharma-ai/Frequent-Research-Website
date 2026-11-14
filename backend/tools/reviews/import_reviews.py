#!/usr/bin/env python3
"""
Import APPROVED customer reviews from a spreadsheet into the reviews store used by the backend (backend/src/routes/reviews.js)
(DATA_DIR/reviews.json, default backend/data/reviews.json). Build 51.

Only rows whose "Publication status" column starts with "Approved" are imported. Rows marked as fictional samples,
drafts, pending or anything else are skipped — this keeps invented reviews off the website. Mark a row "Approved"
only after the named customer has written or confirmed the review and agreed to its publication.

Expected columns (header row, any sheet; first matching sheet wins — "All 400" in the supplied workbook):
  Service | Reviewer name | Country | City/Region | Designation | Industry | Audience type | Rating | Review text |
  Publication status | (optional) Company | (optional) Email
Header names are matched loosely (case-insensitive, by keyword).

Usage:
  python3 tools/reviews/import_reviews.py reviews.xlsx [--data data] [--dry-run]
Requires: openpyxl (pip install openpyxl). Re-running is safe: rows already imported (same name + text) are skipped.
"""
import json, os, re, sys, hashlib, datetime

SERVICE_MAP = [
    (r"market|research", "market-research"),
    (r"digital|marketing", "digital-marketing"),
    (r"\bit\b|software|technolog|development|solutions", "it-development"),
    (r"financ|account|tax", "accounts-finance"),
]


def svc(v):
    s = str(v or "").lower()
    for pat, key in SERVICE_MAP:
        if re.search(pat, s):
            return key
    return None


def main():
    args = sys.argv[1:]
    if not args or args[0].startswith("-"):
        print(__doc__)
        sys.exit(2)
    src = args[0]
    data_dir = args[args.index("--data") + 1] if "--data" in args else os.path.join(os.path.dirname(__file__), "..", "..", "data")
    dry = "--dry-run" in args
    import openpyxl  # noqa: import here so --help works without it

    countries = json.load(open(os.path.join(os.path.dirname(__file__), "countries.json"), encoding="utf-8"))
    lc_countries = {k.lower(): v for k, v in countries.items()}
    wb = openpyxl.load_workbook(src, read_only=True, data_only=True)
    rows, head = None, None
    for ws in wb.worksheets:
        it = ws.iter_rows(values_only=True)
        h = [str(x or "").strip().lower() for x in next(it, [])]
        if any("status" in x for x in h):
            head, rows = h, list(it)
            break
    if rows is None:
        sys.exit('No sheet with a "Publication status" column found. Add one and mark approved rows "Approved".')

    def col(*keys):
        for i, h in enumerate(head):
            if all(k in h for k in keys):
                return i
        return None

    c = dict(service=col("service"), name=col("name"), country=col("country"), desig=col("designation"), rating=col("rating"),
             text=col("review", "text") if col("review", "text") is not None else col("comment"), status=col("status"), company=col("company"), email=col("email"))
    os.makedirs(data_dir, exist_ok=True)
    db_path = os.path.join(data_dir, "reviews.json")
    try:
        db = json.load(open(db_path, encoding="utf-8"))
    except Exception:
        db = []
    have = {(r.get("first", "") + " " + r.get("last", "")).strip().lower() + "|" + r.get("review", "") for r in db}
    added, skipped = [], {"not approved": 0, "fictional": 0, "invalid": 0, "duplicate": 0}
    for r in rows:
        get = lambda k: (r[c[k]] if c[k] is not None and c[k] < len(r) else None)
        status = str(get("status") or "").strip()
        if re.search(r"fiction|sample|draft", status, re.I):
            skipped["fictional"] += 1
            continue
        if not status.lower().startswith("approved"):
            skipped["not approved"] += 1
            continue
        name = str(get("name") or "").strip()
        text = re.sub(r"<[^>]*>", "", str(get("text") or "")).strip()[:1500]
        service = svc(get("service"))
        iso = lc_countries.get(str(get("country") or "").strip().lower(), "")
        try:
            rating = int(round(float(get("rating"))))
        except Exception:
            rating = 0
        if not name or len(text) < 20 or not service or not iso or not 1 <= rating <= 5:
            skipped["invalid"] += 1
            continue
        first, _, last = name.partition(" ")
        key = name.lower() + "|" + text
        if key in have:
            skipped["duplicate"] += 1
            continue
        have.add(key)
        added.append({
            "id": "r_" + hashlib.sha1(key.encode()).hexdigest()[:12], "status": "published", "first": first, "last": last,
            "email": str(get("email") or ""), "phone": "", "countryCode": "", "company": str(get("company") or "")[:80],
            "designation": str(get("desig") or "")[:70], "country": iso, "services": [service], "rating": rating, "review": text,
            "date": datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"), "ip": "", "page": "import", "source": "import:" + os.path.basename(src),
        })
    print(f"approved rows imported: {len(added)}; skipped: {skipped}")
    if added and not dry:
        db = added + db
        tmp = db_path + ".tmp"
        json.dump(db, open(tmp, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        os.replace(tmp, db_path)
        print("written", db_path, "— restart the backend (backend/src/routes/reviews.js) to serve them.")


if __name__ == "__main__":
    main()
