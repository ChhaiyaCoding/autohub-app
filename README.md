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
- Provider catalog, Authentication, and each signed-in user's favorites/vehicles/bookings run on real Firebase (Firestore + Auth) — see **Backend** below
- Notifications and saved locations persist to `localStorage`; everything else is in-memory mock data
- Map is a stylised placeholder with tappable pins by default — see **Live map** below to switch on a real Google Map

## Backend (Firebase)

The provider catalog, Authentication, and each signed-in user's favorites/vehicles/bookings run on Firebase:

- **Firestore** — `providers` (public catalog, seeded once via `seed.html`) and `users/{uid}` (favorites field, plus `vehicles`/`bookings` subcollections, created automatically on first sign-in)
- **Authentication** — Google + email/password, real sign-up/sign-in/sign-out/password-reset (see `js/app.js`'s `signInWithGoogle`/`emailSignIn`/`emailSignUp`/`logout`/`sendResetEmail`)
- **Security rules** — `firestore.rules` in this repo (copy it into the Firebase Console's Rules tab): public read on `providers`, admin-only writes; `users/{uid}` and its subcollections readable/writable only by that user (plus admin read); everything else denied by default

To point this at your own Firebase project: create one at [console.firebase.google.com](https://console.firebase.google.com), enable Firestore + Authentication (Email/Password + Google providers), paste your web app's config into `js/firebase-config.js`, then open `seed.html` once to load the provider catalog.

### Admin Panel

`admin.html` is a standalone dashboard (sign in with any AutoHub account) for managing the provider catalog and viewing every user's bookings. It's gated by a Firestore allowlist rather than Cloud Functions, so it works on the free Spark plan:

1. Sign in once via `admin.html` (or the main app) with the account you want as admin, and note its UID (shown on the "Access Denied" screen if it's not an admin yet).
2. In the Firebase Console → Firestore Database → Data, create a collection named `admins` with a document whose ID is that UID (any field/value works, e.g. `role: "admin"`).
3. Reload `admin.html` and sign in again — you'll see the Providers and Bookings tabs.

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
