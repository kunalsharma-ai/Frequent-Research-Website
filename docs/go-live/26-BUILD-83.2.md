# 26 · Build 83.2: onboarding forms removed, SampConnect redesigned, one video for the YouTube button and the bottom section

This build answers Kunal's message of 22 Nov 2026. Build 83.2 is built on build 83.1.

## 1. New client and new vendor onboarding: removed from the website

The website no longer shows any onboarding form, card or link anywhere:

- the onboarding section on the **home page**, **Let's talk** and **Connect**;
- the two footer links ("New client onboarding", "New vendor onboarding");
- the super admin menu entry "Onboarding links on the site", because it no longer controls anything.

The super admin's **New client onboarding** and **New vendor onboarding** spaces (back-office records and form setup) are
unchanged. They are not part of the public website. The two onboarding portals themselves are separate apps on their own
addresses. If they are online, take them offline on their own servers.

## 2. SampConnect page: redesigned

- **Hero, carried over from the SampConnect showcase:**
  - the 3D globe (dotted continents, gold cities with pulsing rings, arcs that draw between cities with a light travelling along each, atmosphere, dashed orbit with satellites, starfield), following the pointer;
  - aurora background and moving perspective grid floor;
  - greetings in six languages popping in around the globe;
  - the headline revealed word by word, with "On servers you own." in a moving gradient serif;
  - the rotating verb (Chat, Meet, Approve, Translate, Sync, Connect);
  - the "Catch me up" card and a scroll cue.
- **The globe and speed:** the globe is the showcase's own scene, using the three.js library the site already has. It loads after the page is ready, so the first screen is never held up. Until it loads, a CSS planet is shown, and that planet stays if the device has no WebGL.
- **Every section now has its own moving visual:**
  - **Opening view:** the app window rises and flattens as you scroll, with a phone and floating cards, and the numbers count up.
  - **Tapes:** a gold capability tape and a violet channel tape.
  - **Why SampConnect:** a bento of live mini scenes (server rack, shield scan, offline queue, network, inbox, module orbit, brand palette).
  - **Product tour:** a glowing product tour.
  - **Calls:** a call with REC, media server and typed live captions, plus minutes that fill in.
  - **Offline:** an offline queue that travels to your server (Offline, then Reconnecting, then Delivered).
  - **Client Inbox:** 12 channels orbiting the inbox.
  - **Network:** a Connect ID network with moving links.
  - **Sampledge modules:** the 7 modules as fanned 3D cards linking to their pages.
  - **Private AI:** an assistant that types and answers, with sources.
  - **Branding:** tilted theme and branding screens.
  - **Mobile:** a fan of phones.
  - **Rest of the page:** security cards, how it works, compare, everything inside, and a final call to action over a glowing planet.
- **Content:** all from the showcase, as before. The page is dark in both site themes, like the showcase. The serif font
  (Instrument Serif, OFL licence) is self-hosted with the page.

## 3. The YouTube button and the bottom "Watch this page" section play the same video

Before this build, the round red YouTube button and the bottom section could show different videos. They read two
different super admin settings.

Both now ask one function for the page's video (`pvPageVideo` in `components/site/PageVideo69.jsx`). It checks:

1. Super admin → **Page video component** (`/api/v1/page-videos?page=…`).
2. If that is empty, Super admin → **Page videos** (the page's entry).

So whatever video is set for a page, the red button's pop-up and the bottom section play exactly the same one. The pop-up
has a new button, **"↓ Same video at the bottom of this page"**, which closes the pop-up and scrolls to the bottom
section. The footer's "Watch this page's video" button already scrolls there. Videos tied to one section (for example the
mission video on About us) still appear in the pop-up under "Also on this page".

## Files

- Removed from pages: `app/home/HomePage.jsx`, `pages/LetsTalk.jsx`, `pages/Connect65.jsx`, `components/site/Footer.jsx`,
  `app/altText.js`, `admin/AdminApp.jsx` (menu entry).
- SampConnect: `src/design83/sampconnect/SampConnect83.jsx`, `sc83.css`, new `ScGlobe.js`, `fonts/`, `sc-data.js` (new items).
- Video link-up: `components/site/PageVideo69.jsx`, `components/site/Video21.jsx`, `design82/Watch828.jsx`,
  `app/SiteApp.jsx`, `styles/pagevideo69.css`.
