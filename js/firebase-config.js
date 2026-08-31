/* =========================================================
   AutoHub — Firebase initialization
   Loaded as <script type="module"> (see index.html) so it can
   import Firebase straight from the CDN — no npm/bundler needed,
   matching the rest of this zero-build app.

   Module scripts execute after the page's classic scripts but
   before DOMContentLoaded, so window.db / window.auth are ready
   by the time App.init() runs.

   The apiKey below is not a secret — Firebase is designed to run
   this config in the browser. Real protection comes from Firestore
   Security Rules (set those before going to production).
   ========================================================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, getDocs, doc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyC714Ti2VnLCHCZydyBC53fWmsYU_hy8DM",
  authDomain: "auto-hub-931fd.firebaseapp.com",
  projectId: "auto-hub-931fd",
  storageBucket: "auto-hub-931fd.firebasestorage.app",
  messagingSenderId: "46675228156",
  appId: "1:46675228156:web:c58d60b2f079627dcc2e79",
  measurementId: "G-LZ4MPYXQKJ",
};

const firebaseApp = initializeApp(firebaseConfig);

// Expose as globals — the rest of AutoHub (data.js, app.js, ...) are
// plain classic scripts, not modules, so they read Firebase off `window`.
window.firebaseApp = firebaseApp;
window.db = getFirestore(firebaseApp);
window.auth = getAuth(firebaseApp);
// Firestore function helpers, exposed for classic (non-module) scripts to call directly.
window.fs = { collection, getDocs, doc, setDoc, addDoc };
// Auth function helpers, same reason.
window.authFns = {
  onAuthStateChanged, signInWithPopup, GoogleAuthProvider,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, updateProfile,
};

isSupported().then((ok) => { if (ok) window.analytics = getAnalytics(firebaseApp); });
