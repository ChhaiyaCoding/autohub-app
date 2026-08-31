/* =========================================================
   AutoHub — Firebase Cloud Messaging service worker
   Must live at the site root (not js/) so its default scope
   covers the whole origin. Handles push notifications that
   arrive while no AutoHub tab is focused. Foreground messages
   (tab open) are handled separately in js/app.js via onMessage.

   Service workers can't use the same CDN ES-module imports as
   the rest of the app, so this uses Firebase's "compat" build
   via importScripts — the standard pattern for FCM service
   workers. The config below is not a secret (see firebase-config.js).
   ========================================================= */
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyC714Ti2VnLCHCZydyBC53fWmsYU_hy8DM",
  authDomain: "auto-hub-931fd.firebaseapp.com",
  projectId: "auto-hub-931fd",
  storageBucket: "auto-hub-931fd.firebasestorage.app",
  messagingSenderId: "46675228156",
  appId: "1:46675228156:web:c58d60b2f079627dcc2e79",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = (payload.notification && payload.notification.title) || 'AutoHub';
  const body = (payload.notification && payload.notification.body) || '';
  self.registration.showNotification(title, {
    body,
    icon: 'img/onboard-1.jpg',
  });
});
