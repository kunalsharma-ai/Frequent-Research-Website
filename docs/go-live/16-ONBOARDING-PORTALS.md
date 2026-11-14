# New client and new vendor onboarding in the super admin (build 82.6)

The two onboarding portals (new client onboarding, 7 steps, `newclient.frequentresearch.com`; new vendor onboarding,
8 steps, `vendors.frequentresearch.com`) stay their own apps, each a React + Vite frontend and an Express backend in
their own containers. Build 82 connects them to the website's super admin:

```
 client / vendor ──► portal backend (Express) ──┬──► SampBidx (as before: client / vendor, MSAs, renewals)
                     stores its own copy        └──► website /api/v1/integrations/onboarding/<kind>  (new, signed)
                                                         │  MongoDB "onboarding" + documents in GridFS
                                                         ▼
                              super admin › Onboarding › New client onboarding / New vendor onboarding
 portal opens ──► portal backend GET /api/form-config ──► website /api/v1/onboarding/form/<kind>  (Form fields)
```

## What the super admin can do (Onboarding in the menu)

**Submissions.** Every client / vendor, newest first, with counts (all, new, active, agreements expiring in 30 days),
search (name, reference, email, GSTIN, PAN, tax ID, POC, MSA number), filters (status, POC, expiry) and Export CSV
(every field as a column). **+ Add** makes a record by hand with every field of the form, empty.

**One submission** (click a row):
- **All details**: every single answer, field by field with the form's own labels, grouped like the form (company &
  POC, capabilities for vendors, address, tax, contacts, commercial / bank, extra fields, terms & signature, and anything
  else the portal sent). Change any value; add or remove management contacts, references and list entries; **+ Add a
  detail** adds your own field anywhere; ✕ removes one. **Save changes** keeps it; every changed detail goes to History.
- Status (new, in review, approved, active, on hold, rejected, expired, archived), owner at Frequent Research, tags.
- **MSAs & agreements**: each signed agreement with type, number, effective date, expiry, renewal notice date,
  services, "renewed by", and its PDF. Change dates, add an agreement signed outside the portal, remove one.
- **Documents**: signed agreement PDFs, signature, logo and every KYC / capability document, with size and SHA-256.
  View, download, rename, delete, or **+ Add a document** (countersigned MSA, NDA …).
- **Notes** (internal only) and **History** (who changed what and when). **Download JSON**, **Delete** (asks for the
  authenticator code).

**Renewals.** Every agreement with its expiry, soonest first: valid, due (30 days), expired, renewed.

**Form fields.** Changes the portal's form without touching its files. The portal reads it each time it opens (cached
up to a minute; if the website cannot be reached it keeps the last copy, and without one it is the form as built).
- every built-in field, step by step: show / hide, required / optional, label, placeholder, hint, ⓘ help text, and
  the choices of drop-downs and choice cards (one per line, `value | label`). Fields marked 🔒 (region, vendor types,
  legal name, country, POC, signatory) drive the agreement: they can be renamed but not hidden or made optional.
- **extra fields** on any step (text, long text, email, number, phone, date, drop-down, choice cards, tick boxes,
  yes/no, file upload) with an optional section heading; answers arrive under Extra fields, files under Documents.
- the **documents** asked for: switch off, required / optional, rename, new hint.
- the **step titles and descriptions**, the **POC list** (id for `?poc=` links, name, email for your reference) and a
  **notice** shown at the top of the form.

Rights: area **Client & vendor onboarding** (view, create, edit, delete, export, configure). Super Admin: all.
Business Admin: view, create, edit, export. Changing the form needs *configure*.

## Connect the portals (once, about 10 minutes)

1. Website admin › System › Connections & keys › **ONBOARDING_SECRET**: a long random value (`openssl rand -hex 32`).
2. Each portal backend's `.env` (`client-onboarding/backend/.env`, `vendor-onboarding/backend/.env`):
   ```
   WEBSITE_API=https://www.frequentresearch.com/api/v1
   WEBSITE_SECRET=<the same value>
   ```
   Restart the portal backend. `GET /api/health` on it now shows `"website": true`.
3. Submissions already stored on a portal: `npm run cli -- send-website --all` on that portal backend (a reference is
   never stored twice).
4. Optional: `FORM_CONFIG_URL` for the portal frontend container if its backend is not at
   `<SUBMIT_ENDPOINT without /api/onboarding>/api/form-config`.

SampBidx keeps working exactly as before (`SAMPBIDX_URL`, `SAMPBIDX_SECRET`). If the website is down, the portal keeps
the submission in `website-queue.json` and its scheduler retries (2, 4, 8 … minutes, up to 12 times); see it with
`GET /api/admin/website-queue`, send one again with `POST /api/admin/resend-website/<ref>`.

## Good to know

- The website copy is the full record, bank account number included (never the "confirm account number" copy);
  SampBidx still gets the masked number. Only admins with the onboarding area see it.
- Files up to 12 MB each (70 MB per submission) are copied; bigger ones stay on the portal server and are listed with
  their fingerprint under Documents.
- Renewal emails are still sent by SampBidx (or the portal server without SampBidx) from the dates they hold. If you
  change an expiry date in the admin, change it in SampBidx too.
- A field you hide is not asked any more; old submissions keep their answers.
