# Market research quality process: claims to confirm before go-live (build 82.6)

Internal checklist. The page (`/downloads/quality-process/market-research`) and its PDF were written from
"Quality process prompt 1.docx". Nothing was invented: no panel sizes, response rates, thresholds or screenshots were
added. A few statements still describe how the panels work and should be confirmed by the panel operations team. Edit
anything that is not accurate in `src/data/Quality65.jsx`; the page and the PDF both update from that file.

## Please confirm (tick when checked)
- [ ] **Five pillars and 12 journey stages** match how Turn2Opinion, MyFrequentRewards and MyHealthOpinions actually run.
- [ ] **18 checkpoints** (`QP5_SHIELD`): each one is really used, at the stage shown (join / profile / before / during / after / ongoing). CAPTCHA and bot detection, device and browser indicators, geographic consistency and completion-time checks are named. Remove any that are not in use.
- [ ] **Healthcare verification**: "licence checks where applicable / where they are available" for HCPs. Confirm the wording, or remove it if licence checks are not done.
- [ ] **B2B role list** (CEOs and founders, directors, finance, IT, HR, procurement, marketing and sales, industry specialists) and what each is qualified on.
- [ ] **Quality score 0–200**: shown everywhere as an *illustrative* model with example bands (0–59, 60–99, 100–139, 140–169, 170–200) and example factor maxima (25/25/35/30/25/25/20/15). If the panels use a different scale or no numeric score, change `QP5_BANDS` / `QP5_FACTORS` or say so and the section can be reworded.
- [ ] **Quality points are not reward points**: confirm this is how the panels explain it to members.
- [ ] **Rewards**: the wallet (1,200 points, +250 / +400 / +50 / −500, statuses) is labelled demonstration data. Confirm the 10 redemption steps; no payment methods or values are named.
- [ ] **Reporting**: the funnel (1,000 → 420 → 260 → 212 → 196) and outcome mix are labelled demo data. Confirm clients do receive a reconciled field report with these stages.
- [ ] **Privacy**: "Policies follow our ISO/IEC 27001:2013 information security management system" (the site already lists this certificate). Confirm data retention, respondent rights (view, update, delete) and the "health data gets extra care" statements.
- [ ] **PDF cover certifications**: ISO 20252:2019, ISO 9001:2015, ISO/IEC 27001:2013, ESOMAR member (same as the site logo). Confirm they are current.
- [ ] **FAQ** (25 answers in `QP5_FAQ`): read once; the last answer mentions ESOMAR 37 answers being available on request.
- [ ] **Panel websites**: www.turn2opinion.com, www.myfrequentrewards.com, www.myhealthopinions.com.

## Optional: real dashboard screenshots
The "See research from a panelist's perspective" section shows schematic browser mock-ups, labelled "Schematic
illustration … not a screenshot". To show real screens, add items to `QP5_SHOTS` in `src/data/Quality65.jsx`, for
example `{ panel: "t2o", src: "/media/quality/t2o-dashboard.webp", alt: "Turn2Opinion member dashboard" }`, with any
personal data removed from the images.
