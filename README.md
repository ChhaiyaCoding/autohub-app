# AutoHub — Your Drive, Our Care

A premium, mobile-first UI/UX prototype for a nearby auto-service marketplace
(inspired by the MECHANO concept). **MECHANO-style hybrid theme** — light/white
content screens with a dark map and dark emergency modals — orange primary accent,
full Khmer ⇄ English support, built as a **zero-build vanilla web app** (no framework,
no bundler, runs anywhere).

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
npx serve -l 4321 .
# then open http://localhost:4321
```

Best viewed at a mobile width (~375–440px) or your browser's device-toolbar.

## Screens

1. **Splash / Onboarding** — logo, tagline, 3 intro slides, Get Started
2. **Home** — greeting + location, search, SOS banner, Quick Services, Explore, Nearby, Featured
3. **Service Category** — provider list with filter chips (Nearest / Top Rated / Open Now / 24/7 / Mobile) + Call / Go / Details
4. **Service Detail** — cover, stats, info, services, gallery, reviews, sticky Call / Navigate / Request Service
5. **SOS Emergency** — pulsing beacon, location card, hotline, emergency options, nearby providers
6. **Explore** — List / Map toggle, filters, promotions, nearby, emergency, popular, top rated
7. **Favorites** — saved providers + empty state
8. **Activity / History** — recently viewed, recent calls, past requests
9. **Profile** — user card, My Vehicle, settings menu, logout

Bottom nav: **Home · Explore · SOS · Favorites · Profile** (SOS is a raised center FAB).

## Project structure

```
index.html            App shell + font + script order
css/styles.css        Full design system (tokens, components, screens)
js/config.js          Local config — Google Maps API key (see Live map below)
js/firebase-config.js Firebase init (ES module, loaded from CDN) — window.db / window.auth
js/data.js            Mock data — Phnom Penh providers, services, reviews, activity
js/components.js      Icons + reusable components (ServiceCard, ProviderCard,
                      QuickServiceItem, ExplorePill, ReviewCard, EmergencyOptionCard,
                      SearchBar, FilterChips, EmptyState, TopBar)
js/app.js             App controller — hash-less router, state, all screen renderers
```

## What's mock / "Coming Soon" (by design)

- **Call** opens `tel:` · **Navigate** opens Google Maps with the address
- **Request Service**, search, share, booking, promotions → toast "Coming Soon"
- Favorites, vehicles, bookings, notifications, and saved locations persist to `localStorage`; everything else is in-memory mock data
- Map is a stylised placeholder with tappable pins by default — see **Live map** below to switch on a real Google Map

## Live map (optional)

The Explore "Map" view and the Location picker can show a real, interactive Google Map instead of the stylised placeholder:

1. Get a key at [console.cloud.google.com/google/maps-apis/credentials](https://console.cloud.google.com/google/maps-apis/credentials) and enable **Maps JavaScript API** on that project.
2. Paste it into `js/config.js`: `const GOOGLE_MAPS_API_KEY = 'your-key-here';`
3. Restrict the key to your domain (HTTP referrers) before deploying — for local testing, add `http://localhost:4321/*` to the allowed referrers.

Leave the key blank and the app runs exactly as before (no other feature is affected). Provider coordinates live on each entry in `js/data.js` (`lat`/`lng`).

## Ready for later

Designed to drop in real backends without restructuring the UI:
live provider API, calling/booking, garage network, auth, and Khmer i18n
(English labels first, layout is Khmer-friendly).
