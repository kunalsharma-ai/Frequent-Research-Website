# 17 · Security (build 82.6)

No system can be called unhackable. What this build does is close the usual ways in: guessing passwords, reaching
the database from the internet, reading a stolen copy of the data, injecting database commands, and flooding the
site. Most of it works on its own; a few steps (marked **You**) need the server team at go-live.

## What protects the site and the data

| Layer | Protection |
|---|---|
| Super admin sign-in | Personal accounts only (no shared or default login), scrypt-hashed passwords, MFA code from an authenticator app, recovery codes, account lock after repeated wrong passwords, 10 sign-in tries per 15 min per address (API) and 10 a minute (web server). Sessions end after 12 hours, or 2 hours unused. Deleting things asks for the MFA code again. |
| Who may do what | 8 roles plus per-person rights; every admin request is checked on the server (lib/access.js); every change is in the activity log with who, when and what. |
| Database | MongoDB sits on a private Docker network with **no internet access** and is never published to the outside. The API signs in as its own user `frapp`, which may only read and write the website's database (no admin rights, cannot create users or touch other databases). |
| Sensitive onboarding data | GSTIN, PAN, TAN, Udyam, tax IDs and every bank detail (account numbers, IFSC, SWIFT, IBAN, routing, sort code, holder, bank, branch) are **encrypted (AES-256-GCM)** in the database. Every onboarding document (signed MSAs, KYC files, logos) is encrypted too. A stolen database copy or backup shows only scrambled text. In the admin they look normal; search by full GSTIN / PAN / tax ID / account number / IBAN still works (through a keyed hash, never the number). |
| Keys for outside services | Typed in Connections & keys, stored encrypted (since build 78.4). |
| Requests | Database operator keys (`$where`, `$ne`, …) and prototype tricks are refused in every request; bodies are size-limited; every visitor (address) may make at most 300 API requests a minute (admin 1,200), and the web server adds 20 a second with short bursts. |
| Web server | HTTPS-only header (HSTS), no framing by other sites (clickjacking), no camera / microphone / location access, hidden files and backup files (`.env`, `.git`, `*.bak`, `*.sql` …) are never served, server version hidden. The admin can never be shown inside a frame. |
| Containers | The API container is read-only, runs as a normal user with every Linux privilege dropped; no container can gain extra privileges. |
| Onboarding portals | Deliveries to the website are signed (HMAC, 5-minute window). With `DATA_KEY` set, everything the portals keep on disk is encrypted. Per-address limits on submissions (15 per 10 min) and on wrong admin tokens (20 per 15 min). |

## **You**: at go-live

1. **Secrets in `.env`** (each one a different long random value, `openssl rand -hex 32`):
   `REVIEW_SECRET`, `KEYS_SECRET`, `DATA_KEY`, `MONGO_PASSWORD`, `MONGO_APP_PASSWORD`, `ONBOARDING_SECRET`.
   Each portal: `ADMIN_TOKEN`, `DATA_KEY`, `WEBSITE_SECRET` (= the website's `ONBOARDING_SECRET`).
   Never send them by email or chat, never put them in the code.
2. **Store `DATA_KEY` and `KEYS_SECRET` in a password manager, apart from the database backups.** Without them the
   encrypted data cannot be read, by anyone, including us.
3. **HTTPS** in front of the site (load balancer or proxy with a certificate) and `PUBLIC_URL=https://…`.
4. **Firewall**: only ports 80 and 443 open to the internet. Never open 27017 (MongoDB) or 8787 (API). SSH by key
   only, from your office addresses.
5. **Every admin turns on MFA** at first sign-in (the setup link asks for it). Remove people who leave on the same day
   (Admins → Deactivate).
6. **Backups**: `docker compose exec backend npm run backup -- /backups` daily (cron); copy the `fr-backups` volume to
   another place. Test a restore once a quarter.
7. **Updates**: rebuild the images monthly (`docker compose build --pull && docker compose up -d`) for operating
   system and Node security fixes.
8. Hosted MongoDB (Atlas) instead of the container: turn on its IP allow list (only the server), TLS, and a
   database user with `readWrite` on the website database only.

## Database created before build 82 (existing volume)

The `frapp` user is made automatically only when the database volume is created. For an existing one, once:

```
docker compose exec mongo mongosh -u fr -p "$MONGO_PASSWORD" --authenticationDatabase admin --eval \
  'db.getSiblingDB("frequentresearch").createUser({user:"frapp",pwd:"<MONGO_APP_PASSWORD>",roles:[{role:"readWrite",db:"frequentresearch"}]})'
docker compose up -d
docker compose exec backend npm run admin -- reseal-onboarding     # encrypts onboarding records saved before build 82
```

## Changing the data key

Put the old value in `DATA_KEY_OLD`, the new one in `DATA_KEY`, restart, run
`docker compose exec backend npm run admin -- reseal-onboarding`, then remove `DATA_KEY_OLD`.

## If you think someone got in

1. Admins → sign everyone out (deactivate the account in question); change the passwords and MFA of all Super Admins.
2. Change `REVIEW_SECRET` (signs everyone out), `ONBOARDING_SECRET` / `WEBSITE_SECRET`, the portal `ADMIN_TOKEN`s and
   every key in Connections & keys.
3. Look at Activity (who did what, from where) and the server logs; keep a copy before anything is cleaned.
