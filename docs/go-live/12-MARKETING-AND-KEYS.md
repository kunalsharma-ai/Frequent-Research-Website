# Email, newsletters, social media, AI and SampCrew: the keys to provide (build 82.6)

The super admin panel can send emails and newsletters, post to social media, write with AI and send job applications
to SampCrew. Each of these talks to an outside account that belongs to Frequent Research, so it works only after its
key is saved.

**Build 78.4: keys are typed in the panel.** Open **System › Connections & keys**, press **Add** next to a key, paste
it and confirm with your authenticator code. It is saved in the database (passwords, API keys and tokens encrypted
with AES-256-GCM using `KEYS_SECRET` from the server `.env`) and works at once, without a restart. Only people with
the Configure right on Connections (Super Admin, IT Admin) can do this, every change is in Activity (names only,
never values), and the panel never shows a saved secret again, only its last 4 characters. A key saved in the panel
wins over the same name in `.env`; **Remove** goes back to the `.env` value. Keys can still be put in `.env` instead
(then restart the backend with `docker compose up -d backend`).

Keep `KEYS_SECRET` safe and never change it after keys are saved: without the same value the saved secrets cannot be
read (the panel then marks them "Cannot be read" and you type them again). A database backup restored on another
server needs the same `KEYS_SECRET`.

Without a key, nothing breaks. The section stays visible, explains what is missing, and keeps your work: emails wait
in the queue, social posts wait as drafts, careers applications wait for SampCrew. The panel's **System › Connections
& keys** screen shows which connections are working, without showing any key.

Never put a key in a message, an email or a document. Only in the panel's Connections & keys, or in `.env` on the server.

**GitHub #28 (Nov 2026): what still has to be in `.env`.** Every email, AI, social media, SampCrew, CRM and Sampforce
setting above, and also `PUBLISH_MODE`, `LEADS`, `FB_GRAPH_VERSION` and `LINKEDIN_VERSION`, can be set in the panel.
Only the start-up secrets stay in `.env`, on purpose: `MONGODB_URI` (the panel needs the database to start),
`REVIEW_SECRET` / `KEYS_SECRET` (they encrypt the keys saved in the panel) and `DATA_KEY` / `DATA_KEY_OLD` (they encrypt
onboarding documents and visitor IP addresses in the database). Keeping an encryption key in the same database it
protects would let anyone with a copy of the database read everything, so these never move to the panel.

## 1. Website address (needed by all of the below)

| Key | Example | Why |
|---|---|---|
| `PUBLIC_URL` | `https://www.frequentresearch.com` | Links in emails (logo, unsubscribe, buttons) and the CV links SampCrew downloads |

## 2. Sending email (auto-replies, team alerts, follow-ups, newsletters)

Choose **one** provider. SMTP works with Google Workspace, Microsoft 365, Zoho or your host. A sending service
(Resend, SendGrid or Brevo) is better for newsletters because it handles volume and spam reputation.

| Key | What to put |
|---|---|
| `MAIL_FROM` | Sender, e.g. `Frequent Research <hello@frequentresearch.com>` (the domain must be verified with the provider) |
| `MAIL_REPLY_TO` | Optional: where replies go, e.g. `connect@frequentresearch.com` |
| `MAIL_NOTIFY` | Team addresses told about every new lead, separated by commas (each form can add its own in the panel) |
| `MAIL_PROVIDER` | Optional: `smtp`, `resend`, `sendgrid`, `brevo` or `off`. Left empty, it is chosen from the keys below |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` | SMTP: e.g. `smtp.gmail.com`, `587`, the mailbox, an app password, `0` (`1` for port 465) |
| `RESEND_API_KEY` | or: resend.com › API keys |
| `SENDGRID_API_KEY` | or: SendGrid › Settings › API keys (Mail send) |
| `BREVO_API_KEY` | or: Brevo › SMTP & API › API keys |
| `MAIL_PER_MINUTE` | Optional speed limit, default 60 emails a minute (newsletters go out in batches) |

Before sending newsletters, add the provider's SPF and DKIM records to the frequentresearch.com DNS (the provider shows
them when you verify the domain). Every marketing email carries a one-click unsubscribe link and only goes to people
who ticked consent or subscribed.

## 3. AI assistant (blogs, case studies, emails, newsletters, social posts, ads, video scripts)

| Key | What to put |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com › API keys (billing is per use) |
| `AI_MODEL` | Optional: leave empty to use the default |

AI never publishes anything by itself: blog posts and case studies are saved as hidden drafts, and social posts wait
for approval unless you switch autopilot to "post without asking".

## 4. Social media (post now, schedule, AI autopilot)

Add the platforms you use; the others stay off.

| Platform | Keys | Where to get them |
|---|---|---|
| Facebook page | `FB_PAGE_ID`, `FB_PAGE_TOKEN` | Meta for Developers › an app with `pages_manage_posts`; a long-lived Page access token |
| Instagram (business account linked to the page) | `IG_USER_ID`, `IG_TOKEN` (or the same page token) | The same Meta app with `instagram_content_publish`. Instagram needs a picture with every post |
| LinkedIn company page | `LINKEDIN_AUTHOR_URN` (`urn:li:organization:12345`), `LINKEDIN_TOKEN` | LinkedIn Developers › an app with Community Management API (`w_organization_social`) |
| X (Twitter) | `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET` | developer.x.com › a project with write access (paid tier needed for posting) |
| Anything else (YouTube, WhatsApp channel, Buffer, Zapier, Make) | `SOCIAL_WEBHOOK` | An `https://` address that receives each post as JSON |
| Optional | `FB_GRAPH_VERSION`, `LINKEDIN_VERSION` | Only if Meta or LinkedIn retire the default API version |

Paid ads: the AI writes ad copy and audiences in the panel; placing and paying for the ad stays in Meta Ads Manager,
LinkedIn Campaign Manager or Google Ads, where your billing is.

## 5. SampCrew (careers applications into the HR system)

| Key | What to put |
|---|---|
| `SAMPCREW_API_URL` | The SampCrew API address, `https://…` (from the SampCrew team) |
| `SAMPCREW_API_KEY` | A SampCrew API key with permission to create candidates |
| `SAMPCREW_WEBHOOK_SECRET` | Optional: a long random string shared with SampCrew, for stage updates |

What happens: every careers application is sent to `SAMPCREW_API_URL/candidates` (POST, `Authorization: Bearer
<key>`, JSON with the name, email, phone, role, message, every extra field and a signed CV link valid for 7 days).
If SampCrew is down, the panel shows it on the lead with a "Send to SampCrew" button.

For stage updates (shortlisted, interview, hired…), ask SampCrew to call
`https://www.frequentresearch.com/api/v1/integrations/sampcrew/webhook` with JSON `{ "externalId": <the id we sent>, "stage",
"note", "interviewAt" }` and the header `X-SampCrew-Signature`: the hex HMAC-SHA256 of the raw body with `SAMPCREW_WEBHOOK_SECRET`.
The stage then shows on the lead in Leads.

## 6. Other

| Key | What it does |
|---|---|
| `LEAD_WEBHOOK` | As before: an `https://` address (CRM, Zapier) that also gets every lead as JSON |
| `SAMPFORCE_WEBHOOK_URL`, `SAMPFORCE_WEBHOOK_SECRET` | Sampforce (sales app): every new lead is pushed here, signed. Optional `SAMPFORCE_WEBHOOK_EVENTS`. API keys for Sampforce to pull leads: System › Sampforce. Guide: 29-SAMPFORCE-API.md |
| `PUBLISH_MODE` | `auto` (default): new reviews go live at once; `manual`: they wait for approval. Panel: Connections & keys › Site |
| `LEADS` | `on` (default): this server saves the website forms; `off`: another service answers those paths. Panel: Site |
| `FB_GRAPH_VERSION`, `LINKEDIN_VERSION` | Optional API versions for Facebook/Instagram (default `v21.0`) and LinkedIn (default `202505`). Panel: Social media |
| `WORKERS` | `0` stops background sending (only for a second backend container or tests). Default on |

## Short list for Kunal

1. `PUBLIC_URL`
2. One email account: SMTP details, or a Resend / SendGrid / Brevo key, plus `MAIL_FROM` and `MAIL_NOTIFY`
3. `ANTHROPIC_API_KEY`
4. Social tokens for the platforms you use (Facebook, Instagram, LinkedIn, X) or one `SOCIAL_WEBHOOK`
5. `SAMPCREW_API_URL`, `SAMPCREW_API_KEY` and (optional) `SAMPCREW_WEBHOOK_SECRET`
