# 29 · Sampforce API: every website lead and enquiry for the sales app

Everything people send on the website (every enquiry form, download form, case study and resource download, live
chat lead, newsletter sign-up and review) is saved in the website's database and shows in the super admin. This API
gives the same leads to **Sampforce**, the sales app, in two ways that work together:

| Way | Who starts it | Use it for |
|---|---|---|
| **Pull** (REST API with an API key) | Sampforce calls the website | first import of all old leads, a sync every few minutes, looking up one lead, sending status back |
| **Push** (signed webhook) | The website calls Sampforce | each new lead reaches Sampforce within seconds |

Recommended: use the webhook for speed **and** a pull sync every 5–15 minutes as a safety net. Both use the same
`id`, so Sampforce can upsert by `id` and never makes duplicates.

Base address: `https://www.frequentresearch.com/api/v1/sampforce` (your `PUBLIC_URL` + `/api/v1/sampforce`).
All answers are JSON in UTF-8. All times are ISO 8601 in UTC (e.g. `2026-11-27T09:14:05.120Z`).

---

## 1. Set-up (5 minutes, in the super admin)

1. Sign in to `/admin` as a Super Admin or IT Admin (the **integrations · configure** right).
2. Open **System › Sampforce (sales)** and press **+ Make an API key**.
   - Name: e.g. `Sampforce production`.
   - Rights: keep the four ticked by default (see §3). Tick `careers:read` only if Sampforce should also get job
     applications (they go to SampCrew/HR already).
   - Optional: the Sampforce server IP addresses (the key then works only from there) and an expiry.
   - Press **Make key** and confirm with your authenticator code.
3. **Copy the key at once.** It starts with `sfk_` and is shown only this one time (the database keeps only a
   SHA-256 hash). Give it to the Sampforce developers through a password manager or another safe channel.
4. Optional, for push: open **System › Connections & keys › Sampforce** and save
   - `SAMPFORCE_WEBHOOK_URL`: the https address in Sampforce that receives the leads, e.g. `https://api.sampforce.com/hooks/website-leads`
   - `SAMPFORCE_WEBHOOK_SECRET`: a long random text that both sides know (e.g. `openssl rand -hex 32`)
   - `SAMPFORCE_WEBHOOK_EVENTS` (optional): which events to send, comma separated. Empty = `lead.created, lead.updated, newsletter.subscribed, review.created`. Add `careers.created` to send job applications too.

   Then press **Send a test** on the Sampforce page. To send leads that came in before the webhook was set up,
   pick a date and press **Send older leads**.
5. To stop Sampforce at once: **Revoke** the key (pull stops) and/or remove the webhook keys (push stops).

The same keys can also go in the backend `.env` file instead (`SAMPFORCE_WEBHOOK_URL=…` etc.); a value saved in the
admin wins over `.env`.

---

## 2. Authentication

Send the key on every request, either way:

```
Authorization: Bearer sfk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
X-API-Key: sfk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

- HTTPS only. Never put the key in a URL, a browser or a mobile app: call the API from the Sampforce server.
- A wrong, revoked or expired key gets `401`. 20 wrong keys from one IP address in 15 minutes block that address
  for 15 minutes (`429`).
- A key used from an IP address that is not on its list gets `403`.
- Limit: 300 requests per minute per IP address (shared with the website's public API). Page with `limit=500`
  and you will never come near it.

Check a key:

```bash
curl -H "Authorization: Bearer $SF_KEY" https://www.frequentresearch.com/api/v1/sampforce/ping
```
```json
{ "ok": true, "key": { "name": "Sampforce production", "prefix": "sfk_Pu5oq3", "scopes": ["leads:read", "contacts:read", "reviews:read", "leads:write"] }, "time": "2026-11-27T09:20:00.000Z", "version": "v1" }
```

---

## 3. Rights (scopes)

| Right | Lets the key… |
|---|---|
| `leads:read` | read every enquiry, download form and live chat lead (`/leads`, `/forms`) |
| `contacts:read` | read contacts, one per email address, with newsletter sign-ups (`/contacts`) |
| `reviews:read` | read reviews written on the website (`/reviews`) |
| `careers:read` | read careers applications (in `/leads` with `type=careers`), with a 7-day CV download link |
| `leads:write` | send status, stage, owner, Sampforce id and a note back to a lead (`PATCH /leads/:id`) |

Default for a new key: `leads:read, contacts:read, reviews:read, leads:write`.

---

## 4. Endpoints

| Method and path | What it returns | Right |
|---|---|---|
| `GET /sampforce/ping` | the key's name and rights | any key |
| `GET /sampforce/forms` | every form with its number of submissions; the lead types and statuses | `leads:read` or `careers:read` |
| `GET /sampforce/leads` | leads, oldest first, paged | `leads:read` or `careers:read` |
| `GET /sampforce/leads/:id` | one lead | `leads:read` or `careers:read` |
| `PATCH /sampforce/leads/:id` | change status / Sampforce details of one lead | `leads:write` |
| `GET /sampforce/contacts` | contacts (one per email), paged | `contacts:read` |
| `GET /sampforce/contacts/:email` | one contact | `contacts:read` |
| `GET /sampforce/reviews` | reviews, paged | `reviews:read` |
| `GET /sampforce/reviews/:id` | one review | `reviews:read` |

### 4.1 `GET /sampforce/leads`

Query parameters (all optional):

| Parameter | Example | Meaning |
|---|---|---|
| `since` | `2026-11-01` or `2026-11-27T09:00:00Z` | made at or after this time |
| `until` | `2026-12-01` | made before this time |
| `updatedSince` | `2026-11-27T09:00:00Z` | made **or changed** at or after this time (status, owner…). Use this for syncs |
| `type` | `enquiry,chat` | lead types, comma separated: `enquiry`, `download`, `resource-download`, `case-study-download`, `chat`, `careers` |
| `formKey` | `lets-talk` | the form, see `/forms` |
| `category` | `service,rfq` | `service`, `rfq`, `partnership`, `contact`, `download`, `chat`, `careers`, `other` |
| `status` | `new,contacted` | `new`, `contacted`, `qualified`, `won`, `lost`, `spam` |
| `email` | `asha.rao@acme.com` | exact email |
| `q` | `acme` | search in name, email, company, phone, country, service, message, form name |
| `order` | `asc` (default) / `desc` | oldest first (best for syncs) or newest first |
| `limit` | `100` (default), max `500` | page size |
| `cursor` | value of `nextCursor` | the next page |

Answer:

```json
{
  "ok": true,
  "count": 1,
  "hasMore": false,
  "nextCursor": null,
  "data": [
    {
      "id": "l_3f9a2c71b0de",
      "object": "lead",
      "type": "enquiry",
      "category": "service",
      "status": "new",
      "createdAt": "2026-11-27T09:14:05.120Z",
      "updatedAt": "2026-11-27T09:14:05.120Z",
      "form": { "key": "lets-talk", "name": "Let's Talk" },
      "contact": {
        "name": "Asha Rao", "firstName": "Asha", "lastName": "Rao",
        "email": "asha.rao@acme.com", "phone": "9810000000", "countryCode": "+91",
        "country": "India", "company": "Acme Pharma", "designation": "Insights Manager"
      },
      "enquiry": {
        "service": "Market Research: Online surveys", "timeline": "Within 1 month",
        "message": "We need 500 completes with doctors in India.",
        "resource": "", "title": "", "interest": ""
      },
      "page": "https://www.frequentresearch.com/contact",
      "consent": false,
      "extraFields": { "Designation": "Insights Manager", "Budget": "USD 5,000 - 10,000" },
      "otherFields": {},
      "owner": "",
      "adminNote": "",
      "sampforce": null
    }
  ]
}
```

Lead fields:

| Field | Meaning |
|---|---|
| `id` | the website's id for the lead. Store it in Sampforce: it is the key for upserts and for `PATCH` |
| `type` | which form endpoint received it (see the list above) |
| `category` | enquiry kind for follow-up (worked out by the website; the super admin can change it) |
| `status` | the lead's status in the super admin |
| `createdAt` / `updatedAt` | when it was sent / last changed (status, owner, note, Sampforce update) |
| `form.key` / `form.name` | the exact form on the website, e.g. `Let's Talk`, `Government & Opinion Research Brief`, `Accounts & Finance Enquiry` |
| `contact.*` | the person. Empty text when the form did not ask for it |
| `enquiry.*` | what they want: `service`, `timeline`, `message`; downloads have `resource` or `title`; chat leads have `interest` |
| `page` | the page address the form was sent from |
| `consent` | they ticked "send me emails" |
| `extraFields` | any extra form field added in the super admin (Forms), as label → value |
| `otherFields` | any other field the form sent, so nothing is lost |
| `owner` | the colleague the lead is assigned to in the super admin |
| `adminNote` | the team's note in the super admin |
| `sampforce` | what Sampforce sent back with `PATCH` (`sampforceId`, `stage`, `owner`, `note`, `url`, `updated`) or `null` |
| `careers`, `cv` | only for `type=careers`: department, experience, SampCrew stage; `cv.url` downloads the CV for 7 days from the time of the call |

Never included: the visitor's IP address, browser details or anything the super admin keeps private.

### 4.2 `GET /sampforce/leads/:id`

```bash
curl -H "Authorization: Bearer $SF_KEY" https://www.frequentresearch.com/api/v1/sampforce/leads/l_3f9a2c71b0de
```
`{ "ok": true, "data": { …one lead… } }`, or `404` when there is no such lead (or the key may not see it).

### 4.3 `PATCH /sampforce/leads/:id` (write back)

Tell the website what sales did with the lead. It shows in the super admin on the lead (Leads › the lead ›
"Sampforce (sales)"), and the status changes in the leads list.

```bash
curl -X PATCH https://www.frequentresearch.com/api/v1/sampforce/leads/l_3f9a2c71b0de \
  -H "Authorization: Bearer $SF_KEY" -H "Content-Type: application/json" \
  -d '{ "status": "qualified", "stage": "Proposal sent", "owner": "Riya Sharma", "sampforceId": "SF-10023", "url": "https://app.sampforce.com/leads/SF-10023", "note": "Call booked for Monday" }'
```

| Field | Rules |
|---|---|
| `status` | one of `new`, `contacted`, `qualified`, `won`, `lost`, `spam` (changes the lead's status in the super admin) |
| `stage` | text, 80 characters, your pipeline stage |
| `owner` | text, 120 characters, the salesperson |
| `sampforceId` | text, 80 characters, the id in Sampforce |
| `url` | `https://` link to the lead in Sampforce (shown as "Open in Sampforce") |
| `note` | text, 2,000 characters |

Answer: `{ "ok": true, "data": { …the lead, updated… } }`. Every change is written to the super admin Activity log as
"Sampforce · <key name>". A write-back does **not** fire the `lead.updated` webhook (no loops).

### 4.4 `GET /sampforce/forms`

```json
{
  "ok": true,
  "data": [
    { "type": "enquiry", "formKey": "lets-talk", "name": "Let's Talk", "count": 412, "firstAt": "2026-08-02T…", "lastAt": "2026-11-27T…" },
    { "type": "resource-download", "formKey": "resource-download", "name": "Resource download form", "count": 96, "firstAt": "…", "lastAt": "…" }
  ],
  "types": [{ "type": "enquiry", "name": "Enquiry form" }, { "type": "download", "name": "Download form" }, "…"],
  "statuses": ["new", "contacted", "qualified", "won", "lost", "spam"]
}
```

### 4.5 `GET /sampforce/contacts`

One row per email address: everyone who sent any form, plus newsletter sign-ups. Parameters: `since`, `until`,
`updatedSince`, `subscribed=true|false`, `source=newsletter`, `order`, `limit`, `cursor` (as for leads; `since`
is the time the contact was first seen).

```json
{
  "id": "nia@example.com", "object": "contact", "email": "nia@example.com", "name": "Nia Kapoor",
  "phone": "", "company": "", "country": "", "designation": "",
  "subscribed": true, "subscribedAt": "2026-11-27T08:01:00.000Z", "unsubscribedAt": null,
  "forms": ["newsletter"], "services": [], "sources": ["newsletter"], "tags": [], "leads": 0,
  "createdAt": "2026-11-27T08:01:00.000Z", "updatedAt": "2026-11-27T08:01:00.000Z", "lastActivityAt": "2026-11-27T08:01:00.000Z"
}
```

Respect `subscribed: false`: that person unsubscribed from marketing emails.

### 4.6 `GET /sampforce/reviews`

Parameters: `since`, `until`, `updatedSince`, `status=published,pending,hidden`, `order`, `limit`, `cursor`.

```json
{
  "id": "r_5b1e0f2a9c33", "object": "review", "status": "published", "rating": 5,
  "review": "Great field team, on time.", "services": ["Online surveys"], "reply": "",
  "contact": { "name": "Rae Kumar", "firstName": "Rae", "lastName": "Kumar", "email": "rae@client.com", "phone": "", "countryCode": "", "company": "Client Co", "designation": "Director", "country": "IN" },
  "page": "https://www.frequentresearch.com/rates-reviews", "createdAt": "…", "updatedAt": "…"
}
```

### 4.7 Errors

Every error is `{ "ok": false, "error": "a sentence you can log" }` with:

| Status | When |
|---|---|
| `400` | a bad parameter (`since` not a date, bad `cursor`, body not JSON) |
| `401` | key missing, wrong, revoked or expired (`WWW-Authenticate: Bearer`) |
| `403` | the key lacks the right, or is used from an IP address not on its list |
| `404` | no such lead / contact / review (or the key may not see it) |
| `422` | a `PATCH` value is not allowed (e.g. unknown status) |
| `429` | too many requests or too many wrong keys: wait and try again |
| `5xx` | server problem: try again with backoff |

---

## 5. Syncing all leads (pull)

**First import** (all old leads): walk the pages until `hasMore` is `false`.

```
GET /sampforce/leads?limit=500
GET /sampforce/leads?limit=500&cursor=<nextCursor>
… until hasMore = false
```

**Every 5–15 minutes after that** (new leads and changed ones):

1. Remember `T` = the time you **start** this sync (from your clock, minus 1 minute for safety).
2. Call `GET /sampforce/leads?updatedSince=<T of the last sync>&limit=500`, follow `nextCursor` until `hasMore` is false.
3. Upsert each lead by `id`. Save `T` for next time.

Example in Node.js 18+:

```js
const BASE = 'https://www.frequentresearch.com/api/v1/sampforce';
const KEY = process.env.SF_KEY;

export async function pullLeads(lastSync) {          // lastSync: ISO time or null for the first import
  const started = new Date(Date.now() - 60_000).toISOString();
  let cursor = null;
  do {
    const u = new URL(BASE + '/leads');
    u.searchParams.set('limit', '500');
    if (lastSync) u.searchParams.set('updatedSince', lastSync);
    if (cursor) u.searchParams.set('cursor', cursor);
    const r = await fetch(u, { headers: { Authorization: 'Bearer ' + KEY } });
    if (!r.ok) throw new Error(`Website API ${r.status}: ${(await r.json().catch(() => ({}))).error || ''}`);
    const page = await r.json();
    for (const lead of page.data) await upsertLeadInSampforce(lead);   // your code: upsert by lead.id
    cursor = page.hasMore ? page.nextCursor : null;
  } while (cursor);
  return started;                                    // save it; pass it as lastSync next time
}
```

Python:

```python
import os, requests
BASE = "https://www.frequentresearch.com/api/v1/sampforce"
H = {"Authorization": "Bearer " + os.environ["SF_KEY"]}

def pull_leads(last_sync=None):
    params, cursor = {"limit": 500}, None
    if last_sync: params["updatedSince"] = last_sync
    while True:
        if cursor: params["cursor"] = cursor
        page = requests.get(BASE + "/leads", headers=H, params=params, timeout=30).json()
        for lead in page["data"]:
            upsert_lead_in_sampforce(lead)          # your code: upsert by lead["id"]
        if not page["hasMore"]: break
        cursor = page["nextCursor"]
```

Do the same for `/contacts` and `/reviews` if Sampforce wants them.

---

## 6. Webhook (push)

When `SAMPFORCE_WEBHOOK_URL` and `SAMPFORCE_WEBHOOK_SECRET` are saved, the website sends a `POST` to that address
for each event, a second or two after it happens.

### Events

| Event | When | `data` is |
|---|---|---|
| `lead.created` | any enquiry, download, case study / resource download or live chat lead arrives | a lead (§4.1) |
| `lead.updated` | someone in the super admin changes a lead (status, owner, note, type) | a lead |
| `newsletter.subscribed` | someone signs up for the newsletter | a contact (§4.5) |
| `review.created` | someone writes a review | a review (§4.6) |
| `careers.created` | a job application arrives (only when listed in `SAMPFORCE_WEBHOOK_EVENTS`) | a lead with `careers` and `cv` |
| `ping` | **Send a test** in the super admin | `{ "id": "test", "message": "…" }` |

Leads sent with **Send older leads** come as `lead.created` with `"backfill": true` inside `data`.

### Request

```
POST <SAMPFORCE_WEBHOOK_URL>
Content-Type: application/json
User-Agent: FR-Website-Sampforce/1
X-Sampforce-Event: lead.created
X-Sampforce-Delivery: evt_8c41d2e07a9b
X-Sampforce-Signature: t=1795770845,v1=5f0c…64 hex characters…

{ "id": "evt_8c41d2e07a9b", "event": "lead.created", "createdAt": "2026-11-27T09:14:05.300Z", "attempt": 1, "data": { …lead… } }
```

### Check the signature (always)

`v1` is the hex HMAC-SHA256 of `"<t>.<raw body>"` with `SAMPFORCE_WEBHOOK_SECRET`. Use the **raw** body bytes, before
any JSON parsing. Refuse a `t` older than 5 minutes (stops replays).

Node.js (Express):

```js
import crypto from 'node:crypto';
import express from 'express';
const app = express();

app.post('/hooks/website-leads', express.raw({ type: '*/*', limit: '1mb' }), (req, res) => {
  const sig = String(req.get('X-Sampforce-Signature') || '');
  const m = /^t=(\d+),v1=([0-9a-f]{64})$/.exec(sig);
  if (!m || Math.abs(Date.now() / 1000 - Number(m[1])) > 300) return res.sendStatus(401);
  const want = crypto.createHmac('sha256', process.env.SAMPFORCE_WEBHOOK_SECRET).update(m[1] + '.' + req.body).digest('hex');
  if (!crypto.timingSafeEqual(Buffer.from(want), Buffer.from(m[2]))) return res.sendStatus(401);
  const evt = JSON.parse(req.body.toString('utf8'));
  // evt.id is unique per delivery: skip it if you have seen it already (a retry can repeat a delivery)
  queueForSampforce(evt);          // your code; answer fast, do the slow work after
  res.sendStatus(200);
});
```

Python (Flask):

```python
import hmac, hashlib, time, os, json
from flask import Flask, request, abort
app = Flask(__name__)

@app.post("/hooks/website-leads")
def website_leads():
    sig = request.headers.get("X-Sampforce-Signature", "")
    try:
        t, v1 = sig.split(",")[0][2:], sig.split(",")[1][3:]
    except IndexError:
        abort(401)
    if abs(time.time() - int(t)) > 300: abort(401)
    want = hmac.new(os.environ["SAMPFORCE_WEBHOOK_SECRET"].encode(), (t + ".").encode() + request.get_data(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(want, v1): abort(401)
    evt = json.loads(request.get_data())
    queue_for_sampforce(evt)     # upsert evt["data"] by evt["data"]["id"]
    return "", 200
```

PHP:

```php
$raw = file_get_contents('php://input');
if (!preg_match('/^t=(\d+),v1=([0-9a-f]{64})$/', $_SERVER['HTTP_X_SAMPFORCE_SIGNATURE'] ?? '', $m)) { http_response_code(401); exit; }
if (abs(time() - (int)$m[1]) > 300) { http_response_code(401); exit; }
$want = hash_hmac('sha256', $m[1] . '.' . $raw, getenv('SAMPFORCE_WEBHOOK_SECRET'));
if (!hash_equals($want, $m[2])) { http_response_code(401); exit; }
$evt = json_decode($raw, true);
// upsert $evt['data'] by $evt['data']['id']
http_response_code(200);
```

### Answers and retries

- Answer any `2xx` within 15 seconds: the delivery counts as sent. Do slow work after answering.
- Anything else (or no answer) is tried again after 1 minute, 5 minutes, 15 minutes, 1 hour, 3 hours, 6 hours and
  12 hours; after 8 tries it shows as **failed** in the super admin, where it can be sent again by hand.
- Redirects are not followed: give the final https address.
- A delivery can arrive twice (for example after a timeout). Use `id` (the delivery) or `data.id` (the lead) to skip
  repeats; upserting by `data.id` is enough.
- Deliveries are kept 30 days in the super admin (System › Sampforce › Webhook deliveries).

---

## 7. Postman

Import `docs/go-live/sampforce/Sampforce-API.postman_collection.json`. Set the collection variables `baseUrl`
(`https://www.frequentresearch.com/api/v1/sampforce`) and `apiKey` (the `sfk_…` key). Every request is ready to send.

---

## 8. Security summary

- Keys are random (240 bits), shown once, stored only as SHA-256 hashes; revoke in one click; optional IP list and expiry.
- Making or revoking a key needs the **integrations · configure** right and the authenticator code; each is in Activity.
- A Sampforce key cannot reach any `/admin` endpoint, and an admin session cannot use the Sampforce API.
- Careers applications are hidden unless the key has `careers:read`.
- Webhooks are signed (HMAC-SHA256 with a timestamp) and go only to an `https://` address. The secret is stored
  encrypted (AES-256-GCM, Connections & keys) and never shown again.
- No IP addresses or browser details of visitors leave the website.

## 9. For developers of the website

- Code: `backend/src/routes/sampforce.js` (API, webhook outbox and worker, admin endpoints),
  `frontend/src/admin/Sampforce.jsx` (System › Sampforce). Hooks: `saveLead` (leads.js), lead `PATCH` (leads.js),
  newsletter sign-up (marketing.js), new review (reviews.js).
- MongoDB: `sampforce_keys` (name, prefix, hash, scopes, ips, expires, revoked) and `sampforce_outbox` (deliveries,
  TTL 30 days). A lead gets `sampforce.{sampforceId, stage, owner, note, url, updated}` from write-backs.
- Rights: `lib/access.js` (`/admin/sampforce…` = integrations view / configure, keys need the code).
- Worker: runs every 30 seconds with the other workers (`WORKERS=0` turns it off on a second container).
- Tests: `backend/test/sampforce.test.js` (`npm test`).
