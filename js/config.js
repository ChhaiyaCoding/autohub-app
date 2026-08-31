/* =========================================================
   AutoHub — Local configuration
   Add your own Google Maps JavaScript API key below to turn
   on the live map (Explore "Map" view + Location picker).
   Leave it blank and the app falls back to the existing
   stylized placeholder map — nothing else is affected.

   Get a key: https://console.cloud.google.com/google/maps-apis/credentials
   Enable "Maps JavaScript API" on that project, then restrict
   the key to your domain (HTTP referrers) before you deploy —
   Maps JS keys are visible in browser requests by design; the
   referrer restriction is what keeps that safe.
   ========================================================= */
const GOOGLE_MAPS_API_KEY = '';

/* =========================================================
   Push Notifications (Firebase Cloud Messaging)
   Add your Web Push certificate (VAPID key) below to let users
   opt in to real, OS-level push notifications from Profile.
   Leave it blank and the "Enable Push Notifications" action just
   shows a friendly "not configured" message — nothing else breaks.

   Get the key: Firebase Console → Project Settings (gear icon) →
   "Cloud Messaging" tab → "Web configuration" → "Generate key pair"
   under "Web Push certificates".
   ========================================================= */
const FCM_VAPID_KEY = '';
