# 24 · Build 83: three equal panel categories (Consumers, Professionals, Teens)

This build answers Kunal's brief of 21 Nov 2026, "Complete Website Redesign & Team Panel Integration". Kunal confirmed that "Team" means
the **Teen panel (ages 13 to 17)**. Build 83 is built on build 82.9.

The site's design, logo, animations, one H1 per page and the 10-second celebration banner are unchanged. This follows the standing rule.

**Information only.** No sign-up, login or registration screen was built (Kunal: "no new registration screens built at all").
Every join button goes to the existing panel or teen page:

- turn2opinion.com/teen/
- myfrequentrewards.com/paid-surveys-for-teens

## Sources used (nothing else was invented)

| Code | Source |
|---|---|
| [T] | *Minor Research Participation Terms & Parental Consent Agreement* MINOR-2026.10: 19 sections, the parent declaration, 6 permissions, the teen assent and the per-study card (`mfr-minor-terms` / `t2o-minor-terms`, `src/content/terms.js`) |
| [S] | MFR minor suite v2.0.0 and T2O minor suite v1.0.1: README, INTEGRATION, API, DATA-DICTIONARY, EMAIL-REMINDERS |
| [K] | Kunal's teen registration process (21 Nov 2026), summarised in `/mnt/project-files/build82.9/teen-panel-context.md` |
| [W] | The existing website: `PORTALS` in `src/app/data/site.jsx`, and the T2O, MFR and Portals pages |

All the facts sit in a single file, `src/design83/panel83-data.js`, with the source of each block marked. To change any wording, edit that file.

## What changed

| Where | What |
|---|---|
| **Turn2Opinion and MyFrequentRewards pages** | **Three ways to take part**: Consumers, Professionals and Teens as equal cards. Each card shows who can join, what you need, what the studies are about, the rewards and its own join button. This replaces the old "Consumer and Business" block on T2O. |
| | **Teen panel guide** (replaces the 82.9 teen section): what it is, why join, the 12-step registration journey (teen, parent and Frequent Research steps colour-coded), and four tabs: *What is required* (required vs optional, for the teen and for the parent), *If it does not complete*, *Privacy* and *Rewards*. |
| | **Consent and responsibilities**: adults consent for themselves; teens need two separate yeses (the parent's permission is verified); every study asks again. Five member responsibilities. |
| | **Quality**: the six-stage pipeline now explains each stage and what is added for teens. |
| | **FAQ in six tabs**: General, Consumers, Professionals, Teens, Consent & quality, Rewards. The FAQPage schema now covers every question. |
| | **Turn2Opinion or MyFrequentRewards?**: a comparison table. |
| | The page menu gained "Three Ways to Join" and "Consent". |
| **Portals page** | Three-ways cards (linking to both panels), the comparison table, consent and responsibilities, and the six-check quality section (replacing the old six reasons). |
| **Market research service pages** | A "who takes part" block before the FAQ on 9 pages: quantitative, qualitative (focus groups and interviews), online data collection, consumer panel, business panel (professionals only; teens are not invited to B2B studies), healthcare panel (MyHealthOpinions, no teen panel), face-to-face fieldwork, CATI, and research design. Each block says that participation depends on study screening. |
| **Header menu, Portals** | New entry "Consumers · Professionals · Teens", on desktop and phone. |
| **Footer, Research panels** | Links to the three ways to take part and to the Teen panel steps. |
| **Home, "Join our research panels", Teen tab** | Steps now read "Teen signs up → Parent says yes and is verified → Teen says yes too → Take teen surveys". The payout line was corrected (see below). |

### Wording corrected to match the source documents

- **"The parent chooses how rewards are paid out"** became **"where required, rewards go through a verified guardian-managed payout"**. This follows [T] §14, which says the guardian payout is used "where a payment provider or applicable law requires".
- **"Rewarded for every opinion"** (T2O intro and the home Consumers tab) became **"eligible, completed surveys earn rewards"**. The site's own FAQ says not every survey is rewarded.
- **Teen privacy** now follows [T] §9 and [S]:
  - No full date of birth (only the age is stored), no school name, no street address, and no GPS.
  - Clients get "combined or de-identified results where practicable". The earlier word "anonymous" was dropped, because §11 limits that word.

## Gaps to confirm (missing or contradictory information, not invented)

1. **The T2O teen consent page uses a misspelt domain.** `t2o-minor-terms` has `turr2opinion.com` in the operator, website, support email and privacy URL. Its own LEGAL-REVIEW.md says these were assumed. Fix this before that page goes live.
2. **Password step.** Kunal's process says "the teen gets the password link (username = email)". MFR suite v2.0.0 says "No create-password step anywhere" and "passwords (the create-password step was removed in v2)". The website follows Kunal's process. Please confirm which is correct.
3. **The teen's own email.** Kunal's process makes it the username. Terms §3 says a teen "may be able to register without a personal email address". The website lists the email as required.
4. **Date of birth.** Kunal's sign-up asks for the date of birth. Terms §9 says a full date of birth is not requested, and the suite keeps the birthday on the device and stores only the age. The website says "only the age is stored". The backend must do the same.
5. **City and postcode.** Kunal's teen sign-up asks for them. The suite stores only country and region for a minor. Please confirm.
6. **Which teen fields are required.** Kunal's process marks only the phone as optional. The required/optional status of gender, city and postcode was not stated separately.
7. **Teen reward threshold and methods.** None were given for teens. The website says only that thresholds and methods "can differ by country and age group" ([T] §14).
8. **The T2O threshold.** No amount was given (the existing site says "the applicable threshold"). The MFR threshold is $15 in the site data, but the MFR page body only says "minimum redemption threshold applies".
9. **Professional verification.** The documents give no professional-specific verification step for T2O or MFR, so the website describes only the work profile and study screening.
10. **Telephone and face-to-face studies with teens.** These are not described in the teen documents. The website says they are agreed case by case, with a suitability review and the parent and teen permissions.
11. **Backend support.** None of this exists on frequentresearch.com, by design. Everything depends on these being live on turn2opinion.com and myfrequentrewards.com: the DOB auto-switch, the parent Yes/No email, the verification link, the reminder worker (every 48 h, up to 8) and the 7-day token.
12. **Legal review.** The teen terms must still be reviewed by legal before go-live (LEGAL-REVIEW.md in both packages). Points to check: tap-to-consent, the age range by country, the verification method and the English-only PDF.
13. **Translations.** The new text shows in English until the language dictionaries are updated.
14. **Super admin copy wins.** A saved Portals copy in the super admin still overrides the built-in PORTALS text (as in 82.9).

## Files

- `src/design83/panel83-data.js` (facts), `Panel83.jsx` (components), `panel83.css` (styles, put on the page itself).
- Pages:
  - `app/pages/T2OPage.jsx`, `MFRPage.jsx`, `PortalsPage.jsx`.
  - The 9 service pages: `QNT`, `QLT`, `OD`, `CP`, `BP`, `HP`, `OFC`, `CATI`, `RDC`.
- Shared parts: `app/SiteHeader.jsx`, `components/site/Footer.jsx`, `components/site/Earn.jsx`, `app/data/site.jsx`, `styles/footer.css`.
