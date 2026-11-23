# Build 83.4 (23 Nov 2026)

Built on 83.3 (merged to GitHub main as PR #7). Asked for by Kunal on 23 Nov: "sampconnect is missing in this design".

## SampConnect in the home product switcher

The home page section "Built in-house by Sampledge" (`components/site/Sampledge8.jsx`, `SX8_Home`) had seven tabs.
It now has eight, with SampConnect last:

- Heading "Eight products. One connected ecosystem.", intro adds "team workspace".
- Tab mark: the SampConnect mark (`ScMark`); panel logo: `ScLogo`.
- Panel: "Your team, connected. Privately.", the SampConnect summary, three problems it fixes, five steps
  (Chat, Meet, Ask AI, Approve, Deliver), "Explore SampConnect" (/products/sampconnect) and "Visit on sampledge.com".
- Screen: the SampConnect chat screenshot with three floating chips (live captions, approved in chat, private AI).
  Styles at the end of `styles/sampledge8.css` (`.sx8sc-*`).

Only this switcher changes. `PR5_LIST` stays at seven, so the Products menu, footer list and the planet orbits are as before.

## Home page first-screen copy fix

The full release caught the home hero on the "All services" slide (the slides kept moving while the first-screen copy
was taken), and that copy is much taller than the live page, so desktop had a big layout shift (CLS 0.6–0.8, speed 76).
`scripts/phone-shell.cjs` now sets `window.__FR_SHELL_SNAP` while it takes the copies, which `HomeHero79.jsx` and
`fx.jsx` already read to hold the slides still. Home after the fix: desktop 99 (CLS 0), phone 96.
