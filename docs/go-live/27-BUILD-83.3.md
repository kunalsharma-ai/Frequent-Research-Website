# Build 83.3 (22 Nov 2026)

Built on 83.2. Two changes asked for by Kunal on 22 Nov.

## 1. Equal round floating buttons

Before: live chat was a wide pill ("Ask us anything"), WhatsApp was 56 px at a different right edge, Rate & review was 66 px.

Now, on screens wider than 720 px:

| Button | Size | Right | Bottom |
|---|---|---|---|
| Live chat | 64 px circle | 24 px | 24 px |
| WhatsApp | 64 px circle | 24 px | 104 px |
| Rate & review | 64 px circle | 24 px | 184 px |

The chat words ("Ask us anything / Instant answers") and the WhatsApp words now appear as a bubble on hover or
keyboard focus, like the Rate & review bubble already did. Screen readers still hear "Chat with us".
Phones (720 px and below) are unchanged: the three buttons live in the bottom dock.

File: `frontend/src/styles/fab833.css`, imported last in `frontend/src/main.jsx`.

## 2. SampConnect pop-up to Sampledge

`/products/sampconnect` now uses the same scroll pop-up as the other Sampledge product pages (`components/site/Nudge19.jsx`).
After about 1.8 screens of scrolling it shows the SampConnect logo, "Ready to start? Visit sampledge.com", a button to
https://www.sampledge.com/ (new tab) and "Keep reading here". It shows once per browser tab session.
`Nudge19` now accepts an optional `logo` so the SampConnect page passes its own logo.

## 3. Footer cards removed

The SampConnect and "Watch Frequent Research on YouTube" cards that build 83.1 added to the footer are removed
(Kunal, 23 Nov). `components/site/Footer.jsx`, `styles/footer.css`.
