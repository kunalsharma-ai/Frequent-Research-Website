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
