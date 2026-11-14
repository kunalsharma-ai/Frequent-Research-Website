# Admin access: accounts, roles, approvals, recovery and backups (build 82.6)

The Super Admin decides who may do what. Nobody gets "all access" by default: each person gets a **role** (a set of
rights per area), and when needed **extra access to particular items or pages only** (for example only the blog
pages, or only the Team list). Changes by people without the Publish right wait for approval. The server checks
every right on every request, whatever the panel shows.

## 1. The first Super Admin (once, on the server)

There is no sign-up page, no shared password and no default login.

1. Set in `.env`: `PUBLIC_URL=https://www.frequentresearch.com` and (optional) `ADMIN_EMAIL_DOMAINS` (default
   `frequentresearch.com`: only these email addresses can be admins). Set up email (`12-MARKETING-AND-KEYS.md`) if the
   link should be emailed.
2. Start the containers, then run on the server:

   ```
   docker compose exec backend npm run admin -- create-super-admin --email kunal.sharma@frequentresearch.com --name "Kunal Sharma"
   ```

   (without Docker: `cd backend && npm run admin -- create-super-admin --email … --name …`).
3. The command prints a **one-time setup link** (and emails it when email is set up). It works once and expires in
   24 hours. Open it and:
   - choose a password: at least 12 characters, three kinds of characters (small, capital, digits, symbols), not your
     email name, not a common password. It is stored as a scrypt hash; nobody can read it;
   - scan the QR code with an authenticator app (Google Authenticator, Microsoft Authenticator, 1Password…) and type
     the 6-digit code. Opening the email link is the email check;
   - **save the 10 recovery codes** (download or print). Each works once if the phone is lost.
4. From then on `create-super-admin` refuses to run (an active Super Admin exists). First setup is closed.

Keep two Super Admins (for example Kunal and one director) so the panel never depends on one phone.

Everyone can add their own photo and choose the panel's colours (10 palettes, light or dark) in **My account**.

## 2. Inviting the team (in the panel)

**Access › Admins › + Invite an admin**: name, official email, mobile, department, designation and role, and optional
extra access. The person gets an email with a one-time link (72 hours) and sets their own password and authenticator.
If email is not set up yet, the panel shows the link to send privately.

Per admin: change details, role and extra access; **Send the invitation again**; **Suspend** (signed out at once, can
be reactivated); **Deactivate** (when someone leaves; history stays); **Sign out everywhere**; **Reset access** (lost
phone or password: removes password and authenticator and makes a new setup link); sessions and recent activity.

Safety rules the server enforces:
- nobody can give rights they do not have themselves; only a Super Admin can make a Super Admin;
- there is always at least one active Super Admin; nobody can change their own role;
- admins, roles, keys, exports, CVs and recovery codes ask for the authenticator code again (valid 10 minutes).

## 3. Roles (Access › Roles & rights)

| Role | For | Can |
|---|---|---|
| Super Admin | Kunal, a director | Everything |
| Website Admin | web team | Pages and sections, new pages, menus and logos, SEO and redirects, legal pages, forms; publishes |
| Content Admin | writers | Blogs, case studies, team, testimonials, products, page texts: **changes go to approval** |
| Marketing Admin | marketing | Contacts, email templates and automations, newsletters, social media, AI writer; suggests blog posts |
| HR Admin | HR | Careers applications and CVs, SampCrew, careers page, team (team changes go to approval) |
| Business Admin | sales | Enquiries and RFQs (assign, follow up, export), live chat, reviews, panel books, products and prices; new client & vendor onboarding (view, add, edit, export; not delete or change the forms) |
| IT Admin | IT | Connections and keys (types API keys; saved encrypted), media library, site settings, activity log |
| Viewer | management, auditors | Looks only; no personal data (enquiries, CVs, contacts) |

Rights: **View**, **Create**, **Edit**, **Delete**, **Publish** (put live), **Approve** (check others' changes),
**Export** (download lists), **Manage** (assign, roles), **Configure** (connections; for onboarding: the form fields).
Build 82 adds the area **Client & vendor onboarding** (bank details and documents inside): only the Super Admin has it
whole; the Business Admin has view, create, edit and export. Give it to others with care. Every role except Super Admin can
be changed, and new roles added (for example "Blog writer"). Changes apply at once.

**Extra access to particular items or pages** (Admins › a person › Role and access): pick an area, the rights, and
optionally only some items (for example only "Team") or only some pages, one address per line: `/about-us`,
`/blog/*` (every blog post), `/services/market-research/*`. Example: a Viewer with *Pages: View + Edit, pages
`/blog/*`* can change only blog page texts, and those changes wait for approval.

## 4. Approvals (Access › Approvals)

Draft → Waiting for review → Under review → Approved → Published (or Sent back with a note, or Archived).
- An admin without Publish on that area saves a **draft for approval**; the panel says "Sent for approval".
- Approvers (Approve right on that area or those pages) are emailed; they see the change next to what is live and
  **Approve**, **Approve and publish**, or **Send back** with a note. Nobody approves their own change.
- If the live version changed meanwhile, only the draft's pages are published; for other items the panel asks first.
- Every published version is kept: **All content › history** puts any earlier version back (needs Publish).

## 5. Enquiries, careers and media
- Leads have a **type** (service enquiry, RFQ, partnership, contact, download, chat, job application) and can be
  **assigned** to a colleague who can see that kind of lead; the colleague is emailed. Filter "Assigned to me".
- Business admins see enquiries, HR admins see job applications and CVs; CV downloads ask for the code again.
- Media library: alt text per picture (used on every page that shows it), **Replace** keeps the same address, and big
  JPG/PNG photos are turned into WebP (max 2400 px) before upload.
- SEO & redirects: title, description, keywords, canonical, sharing picture and texts, JSON-LD schema and no-index per
  page; redirects from old addresses. The sitemap and robots.txt are made at each release.

## 6. Security in short
Passwords: scrypt. Authenticator: TOTP (RFC 6238), codes cannot be reused. Recovery codes stored hashed. Sessions:
random token stored hashed, 12 hours, 2 hours idle, revocable. 10 sign-in tries per 15 minutes per address, 5 wrong
passwords lock the account 15 minutes. Setup and invitation links are single-use and expire. The panel sends the
token in a header (not a cookie), so cross-site request forgery does not apply. Every sign-in, failed sign-in and
change is in **Activity** with who, what, when and the details (kept 3 years); filter by person.

## 7. Recovery
- **Lost phone, has recovery codes**: sign in with a recovery code, then My account › Make new recovery codes, and ask a
  Super Admin for Reset access to connect the new phone.
- **Lost phone and codes, or forgot password**: a Super Admin uses **Reset access** on the account.
- **The only Super Admin is locked out**: on the server run
  `docker compose exec backend npm run admin -- recover --email kunal.sharma@frequentresearch.com`. It signs the account
  out everywhere, removes password and authenticator and prints a new one-time link (72 hours). Only people with
  server access can run it.
- `npm run admin -- list` shows every admin with role, status, MFA and last sign-in.

## 8. Backups
- Best: `mongodump` every night, kept 14 days, one copy off the server. Example (cron on the Docker host, 02:30):

  ```
  30 2 * * * docker compose -f /srv/fr/docker-compose.yml exec -T mongo sh -c 'mongodump --archive --gzip -u fr -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin' > /backups/fr-$(date +\%F).archive.gz && find /backups -name 'fr-*.archive.gz' -mtime +14 -delete
  ```

  Restore: `docker compose exec -T mongo mongorestore --archive --gzip --drop -u fr -p … --authenticationDatabase admin < fr-2026-11-09.archive.gz`.
- Without mongodump: `docker compose exec backend npm run backup -- /backups` writes a dated folder (one file per
  collection, uploaded files included, keeps the newest 14); `npm run backup -- restore /backups/fr-… --yes` puts it
  back. Sessions are not backed up, so a restore signs everyone out.
- Hosted MongoDB (Atlas): switch on its daily backups instead.
- Test a restore once a quarter on a spare machine.
- Keys typed in Connections & keys are in the backup, encrypted: the server you restore on needs the same `KEYS_SECRET`
  (or `REVIEW_SECRET` when `KEYS_SECRET` is empty).

## 9. Moving from build 78.2
`ADMIN_USER` and `ADMIN_TOKEN` are no longer used; remove them from `.env` (the backend warns while they are set).
Make the first Super Admin as in section 1. Everything else (content, leads, files) stays as it is.
