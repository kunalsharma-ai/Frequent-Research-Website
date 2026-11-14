# Pre-launch checks (build 82.6)

Do each check on a desktop browser (Chrome) **and** a phone, in light and dark theme. Tick as you go.

## Every page
- [ ] The header shows the full Frequent Research logo; menus open with their original blue colours.
- [ ] The round red YouTube button sits bottom-left. Clicking it opens "Lights. Camera. Our story."; a highlight film and a reel both play inside the site; Esc or × closes it.
- [ ] The footer shows the full animated logo; footer links work.
- [ ] Chat ("Ask us anything"), WhatsApp and "Rate us" buttons open; none of them opens by itself.
- [ ] Language switch and theme switch work.

## Pages
- [ ] Home: all six hero slides change by tab and by swipe; "All services" shows the brief and four live engine screens.
- [ ] About Us: holo-table map with flag pins, "Who we are", mission and vision, the periodic table (filter by engine, open one service).
- [ ] Our reach (About menu): region portals, country flags (each opens its panel book), sectors, departments, job titles.
- [ ] Our Journey, Our Team, Careers.
- [ ] Gallery: before anything is added, all three sections show "coming soon". Add one photo and one YouTube link
      from the super admin panel, reload `/gallery`, open both in the viewer, then hide them again.
- [ ] Home on a computer: the first screen appears at once and still; moving the mouse starts the full site (every
      animation runs, the celebration banner shows today's special day for 10 seconds). On the first visit in a
      browser session the intro screen opens, closes on a click anywhere, and plays the opening sound when sound is on.
- [ ] Home on a phone: the first screen appears at once with a still hero; the first touch starts the full site and
      looks the same; tapping the menu button on that first screen opens the menu. No intro screen on phones.
- [ ] An old shared link such as `https://www.frequentresearch.com/#/careers` opens the Careers page.
- [ ] Google tag: Tag Assistant (https://tagassistant.google.com/) shows GTM-TDDKS62 firing on the home page and
      one other page.
- [ ] Services hub and one service page in each of the four teams.
- [ ] Products: the seven Sampledge products (SampCode, SampBidx, SampTrek, SampAudience, SampForce, Talk2Tax, SampCrew). Each `/products/<id>` page shows the product's own website with its moving hero; "Book a demo" opens the demo form; an old address such as `/products/zapx` opens SampCode. Scroll for a while and the "visit sampledge.com" pop-up appears once.
- [ ] Industries & Case Studies: hub, one industry, one case study, its PDF.
- [ ] Downloads: panel books (consumer, business, healthcare country), quality process, case study library. **Every download asks for the form, every time.**
- [ ] Let's Talk and Connect: submit one real test enquiry; confirm it arrives.
- [ ] Rate & review: submit a test review; approve it in moderation if `PUBLISH_MODE=manual`.
- [ ] A wrong address (e.g. `/xyz`) shows the "not found" page.

## Phone specifics
- [ ] Bottom bar (Services, Chat, language, WhatsApp, Let's Talk) does not cover form buttons.
- [ ] Nothing scrolls sideways on any page.
