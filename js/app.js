/* =========================================================
   AutoHub — App Controller (router + screens + state)
   ========================================================= */

const App = {
  // ---- state ----
  state: {
    route: 'onboarding',
    param: null,
    filter: 'nearest',
    onboardStep: 0,
    favorites: [...DEFAULT_FAVORITES],
    exploreView: 'list',
    lang: 'km',
    emergencyType: null,
    vehicles: [...DEFAULT_VEHICLES],
    bookings: [...DEFAULT_BOOKINGS],
    bookingDraft: null,   // { providerId, vehicleId } during the booking flow
    registerType: 'car',
    detailTab: 'about',
    detailExpanded: false,
    searchQuery: '',
    location: 'Phnom Penh, Cambodia',
    user: null,   // populated from Firebase Auth once signed in — see _watchAuthState
    notifications: [...DEFAULT_NOTIFICATIONS],
    notificationsEnabled: true,
    savedLocations: [...DEFAULT_SAVED_LOCATIONS],
    pickingSavedLocation: false,
    chatThreads: {},   // { [bookingId]: [{from:'user'|'provider', text, time}] }
  },

  root: null,

  init() {
    this.root = document.getElementById('app');
    // restore favorites if any
    try {
      const saved = JSON.parse(localStorage.getItem('autohub_favs'));
      if (Array.isArray(saved)) this.state.favorites = saved;
    } catch (e) {}
    // restore vehicles + bookings if any
    try {
      const savedVehicles = JSON.parse(localStorage.getItem('autohub_vehicles'));
      if (Array.isArray(savedVehicles) && savedVehicles.length) this.state.vehicles = savedVehicles;
    } catch (e) {}
    try {
      const savedBookings = JSON.parse(localStorage.getItem('autohub_bookings'));
      if (Array.isArray(savedBookings)) this.state.bookings = savedBookings;
    } catch (e) {}
    // restore notifications + saved locations if any
    try {
      const savedNotifs = JSON.parse(localStorage.getItem('autohub_notifications'));
      if (Array.isArray(savedNotifs)) this.state.notifications = savedNotifs;
    } catch (e) {}
    try {
      const savedLocs = JSON.parse(localStorage.getItem('autohub_saved_locations'));
      if (Array.isArray(savedLocs) && savedLocs.length) this.state.savedLocations = savedLocs;
    } catch (e) {}
    const notifEnabled = localStorage.getItem('autohub_notif_enabled');
    if (notifEnabled === '0') this.state.notificationsEnabled = false;
    const savedLang = localStorage.getItem('autohub_lang');
    if (savedLang === 'en' || savedLang === 'km') this.state.lang = savedLang;
    // Enter/Space activates any role="button" element (our keyboard-enhanced divs)
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const el = e.target.closest('[role="button"]');
      if (!el) return;
      e.preventDefault();
      el.click();
    });
    this.render();
    this._loadProvidersFromFirestore();
    this._watchAuthState();
  },

  // ---- Firebase Authentication ----
  AUTH_SCREENS: ['onboarding', 'login', 'signin', 'signup', 'resetPw'],
  _watchAuthState() {
    if (!window.auth || !window.authFns) return;
    window.authFns.onAuthStateChanged(window.auth, (user) => {
      if (user) {
        const name = user.displayName || (user.email ? user.email.split('@')[0] : 'User');
        this.state.user = {
          name, email: user.email || '',
          initials: name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
        };
        this._loadUserData(user.uid);
        if (this.AUTH_SCREENS.includes(this.state.route)) this.go('home');
        else this.render();
      } else {
        this.state.user = null;
        if (!this.AUTH_SCREENS.includes(this.state.route)) this.go('login');
      }
    });
  },
  _authErrorMessage(e) {
    const map = {
      'auth/invalid-email': t('au.err.invalidEmail'),
      'auth/user-not-found': t('au.err.userNotFound'),
      'auth/wrong-password': t('au.err.wrongPassword'),
      'auth/invalid-credential': t('au.err.wrongPassword'),
      'auth/email-already-in-use': t('au.err.emailInUse'),
      'auth/weak-password': t('au.err.weakPassword'),
      'auth/too-many-requests': t('au.err.tooMany'),
      'auth/popup-closed-by-user': t('au.err.popupClosed'),
    };
    return map[e.code] || e.message || t('au.err.generic');
  },
  async signInWithGoogle() {
    try {
      const provider = new window.authFns.GoogleAuthProvider();
      await window.authFns.signInWithPopup(window.auth, provider);
    } catch (e) {
      this.toast(this._authErrorMessage(e));
    }
  },
  async emailSignIn() {
    const email = (document.getElementById('signin-email') || {}).value || '';
    const password = (document.getElementById('signin-password') || {}).value || '';
    if (!email.trim() || !password) { this.toast(t('au.needCreds')); return; }
    try {
      await window.authFns.signInWithEmailAndPassword(window.auth, email.trim(), password);
    } catch (e) {
      this.toast(this._authErrorMessage(e));
    }
  },
  async emailSignUp() {
    const email = (document.getElementById('signup-email') || {}).value || '';
    const password = (document.getElementById('signup-password') || {}).value || '';
    const confirm = (document.getElementById('signup-confirm') || {}).value || '';
    if (!email.trim() || !password) { this.toast(t('au.needCreds')); return; }
    if (password !== confirm) { this.toast(t('au.err.pwMismatch')); return; }
    try {
      await window.authFns.createUserWithEmailAndPassword(window.auth, email.trim(), password);
    } catch (e) {
      this.toast(this._authErrorMessage(e));
    }
  },
  async sendResetEmail() {
    const email = (document.getElementById('reset-email') || {}).value || '';
    if (!email.trim()) { this.toast(t('au.needEmail')); return; }
    try {
      await window.authFns.sendPasswordResetEmail(window.auth, email.trim());
      const dialog = `<div class="dialog-card">
        <div class="dlg-ic ok">${icon('mail')}</div>
        <div class="dlg-t">${t('au.resetSentTitle')}</div>
        <div class="dlg-d">${t('au.resetSentDesc')}</div>
        <button class="btn btn-orange" onclick="App.closeModal();App.go('login')">${t('au.backToLogin')}</button>
      </div>`;
      this._renderModal(dialog, 'center');
    } catch (e) {
      this.toast(this._authErrorMessage(e));
    }
  },
  async logout() {
    try { await window.authFns.signOut(window.auth); } catch (e) {}
    this.go('login');
  },

  // Progressive enhancement: render immediately with the local mock catalog,
  // then swap in live Firestore data (if any) and re-render once it arrives.
  // Falls back silently to the mock data if Firestore is empty/unreachable.
  _loadProvidersFromFirestore() {
    if (!window.db || !window.fs) return;
    window.fs.getDocs(window.fs.collection(window.db, 'providers'))
      .then((snap) => {
        if (snap.empty) return;
        const docs = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        PROVIDERS.length = 0;
        PROVIDERS.push(...docs);
        this.render();
      })
      .catch((e) => console.warn('Firestore providers fetch failed, using local mock data', e));
  },

  // ---- Per-user data (Firestore, scoped to users/{uid}) ----
  // Falls back to localStorage only if signed out (shouldn't normally happen —
  // Home/Profile are only reachable once authenticated) so nothing crashes.
  _currentUid() { return window.auth && window.auth.currentUser && window.auth.currentUser.uid; },
  async _loadUserData(uid) {
    if (!window.db || !window.fs) return;
    try {
      const userRef = window.fs.doc(window.db, 'users', uid);
      const userSnap = await window.fs.getDoc(userRef);
      if (!userSnap.exists()) {
        // brand-new account — seed Firestore with the starting demo data.
        // Uses the DEFAULT_* constants (not this.state), since local state
        // may hold stale localStorage leftovers from before sign-in.
        this.state.favorites = [...DEFAULT_FAVORITES];
        this.state.vehicles = [...DEFAULT_VEHICLES];
        this.state.bookings = [...DEFAULT_BOOKINGS];
        await window.fs.setDoc(userRef, { favorites: this.state.favorites });
        for (const v of this.state.vehicles) {
          await window.fs.setDoc(window.fs.doc(window.db, 'users', uid, 'vehicles', v.id), v);
        }
        for (const b of this.state.bookings) {
          await window.fs.setDoc(window.fs.doc(window.db, 'users', uid, 'bookings', b.id), b);
        }
      } else {
        this.state.favorites = userSnap.data().favorites || [];
        const [vSnap, bSnap] = await Promise.all([
          window.fs.getDocs(window.fs.collection(window.db, 'users', uid, 'vehicles')),
          window.fs.getDocs(window.fs.collection(window.db, 'users', uid, 'bookings')),
        ]);
        this.state.vehicles = vSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
        this.state.bookings = bSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      }
      this.render();
    } catch (e) {
      console.warn('Firestore user-data load failed, using local data', e);
    }
  },
  _saveFavorites() {
    const uid = this._currentUid();
    if (uid && window.db && window.fs) {
      window.fs.setDoc(window.fs.doc(window.db, 'users', uid), { favorites: this.state.favorites }, { merge: true })
        .catch((e) => console.warn('Failed to save favorites to Firestore', e));
    } else {
      localStorage.setItem('autohub_favs', JSON.stringify(this.state.favorites));
    }
  },
  _saveVehicle(v) {
    const uid = this._currentUid();
    if (uid && window.db && window.fs) {
      window.fs.setDoc(window.fs.doc(window.db, 'users', uid, 'vehicles', v.id), v)
        .catch((e) => console.warn('Failed to save vehicle to Firestore', e));
    } else {
      localStorage.setItem('autohub_vehicles', JSON.stringify(this.state.vehicles));
    }
  },
  _saveBooking(b) {
    const uid = this._currentUid();
    if (uid && window.db && window.fs) {
      window.fs.setDoc(window.fs.doc(window.db, 'users', uid, 'bookings', b.id), b)
        .catch((e) => console.warn('Failed to save booking to Firestore', e));
    } else {
      localStorage.setItem('autohub_bookings', JSON.stringify(this.state.bookings));
    }
  },
  _updateBookingStatus(b) {
    const uid = this._currentUid();
    if (uid && window.db && window.fs) {
      window.fs.setDoc(window.fs.doc(window.db, 'users', uid, 'bookings', b.id), { status: b.status }, { merge: true })
        .catch((e) => console.warn('Failed to update booking in Firestore', e));
    } else {
      localStorage.setItem('autohub_bookings', JSON.stringify(this.state.bookings));
    }
  },
  _saveNotifications() { localStorage.setItem('autohub_notifications', JSON.stringify(this.state.notifications)); },
  _saveSavedLocations() { localStorage.setItem('autohub_saved_locations', JSON.stringify(this.state.savedLocations)); },

  // ---- language ----
  toggleLang() {
    this.state.lang = this.state.lang === 'en' ? 'km' : 'en';
    localStorage.setItem('autohub_lang', this.state.lang);
    this.render();
    this.toast(t('t.langSwitched'));
  },

  // ---- navigation ----
  go(route, param = null) {
    this.closeModal();
    this.state.route = route;
    this.state.param = param;
    if (route === 'category') this.state.filter = 'nearest';
    if (route === 'detail') { this.state.detailTab = 'about'; this.state.detailExpanded = false; }
    this.render();
    this.scrollTop();
  },
  back() {
    // simple contextual back
    const r = this.state.route;
    if (r === 'detail') {
      // go back to a sensible parent
      this.go('home');
    } else if (['category','sos','activity'].includes(r)) {
      this.go('home');
    } else {
      this.go('home');
    }
  },
  scrollTop() { window.scrollTo({ top: 0 }); if (this.root) this.root.scrollTop = 0; },

  setFilter(id) { this.state.filter = id; this.render(); },
  setExploreView(v) { this.state.exploreView = v; this.render(); },
  setDetailTab(tab) { this.state.detailTab = tab; this.render(); },
  toggleReadMore() { this.state.detailExpanded = !this.state.detailExpanded; this.render(); },

  // ---- favorites ----
  isFav(id) { return this.state.favorites.includes(id); },
  toggleFav(id) {
    const i = this.state.favorites.indexOf(id);
    if (i >= 0) { this.state.favorites.splice(i, 1); this.toast(t('t.removedFav')); }
    else { this.state.favorites.push(id); this.toast(t('t.addedFav')); }
    this._saveFavorites();
    this.render();
  },

  // ---- actions ----
  call(id) {
    const p = getProvider(id);
    if (p) { this.toast(`${t('t.calling')} ${p.name} · ${p.phone}`); window.location.href = `tel:${p.phone.replace(/\s/g,'')}`; }
  },
  navigate(id) {
    const p = getProvider(id);
    if (p) {
      this.toast(`${t('t.directions')} ${p.name}`);
      const q = encodeURIComponent(p.address);
      window.open(`https://maps.google.com/?q=${q}`, '_blank');
    }
  },
  // ---- Booking journey ----
  startBooking(providerId) {
    this.state.bookingDraft = { providerId, vehicleId: this.state.vehicles[0] ? this.state.vehicles[0].id : null, vehicleType: null };
    this.go('selectVehicle');
  },
  chooseVehicle(vehicleId) {
    if (!this.state.bookingDraft) return;
    this.state.bookingDraft.vehicleId = vehicleId;
    this.state.bookingDraft.vehicleType = null;
    this.render();
  },
  chooseQuickType(typeId) {
    if (!this.state.bookingDraft) return;
    this.state.bookingDraft.vehicleType = typeId;
    this.state.bookingDraft.vehicleId = null;
    this.render();
  },
  setRegisterType(typeId) { this.state.registerType = typeId; this.render(); },
  saveVehicle() {
    const model = (document.getElementById('veh-model') || {}).value || '';
    const number = (document.getElementById('veh-number') || {}).value || '';
    if (!model.trim() || !number.trim()) { this.toast(t('bk.needModel')); return; }
    const fuelEl = document.querySelector('.fuel-chip.active');
    const fuel = fuelEl ? fuelEl.getAttribute('data-fuel') : 'petrol';
    const year = (document.getElementById('veh-year') || {}).value || '';
    const color = (document.getElementById('veh-color') || {}).value || '';
    const v = { id: 'v' + Date.now(), type: this.state.registerType, name: model.trim(), plate: number.trim().toUpperCase(), fuel, year: year.trim(), color: color.trim() };
    this.state.vehicles.push(v);
    this._saveVehicle(v);
    if (this.state.bookingDraft) this.state.bookingDraft.vehicleId = v.id;
    this.toast(t('bk.saved'));
    this.go(this.state.bookingDraft ? 'selectVehicle' : 'profile');
  },
  confirmBooking() {
    const d = this.state.bookingDraft;
    if (!d) { this.go('home'); return; }
    const p = getProvider(d.providerId);
    const booking = {
      id: 'b' + Date.now(),
      createdAt: Date.now(),
      providerId: d.providerId,
      vehicleId: d.vehicleId,
      vehicleType: d.vehicleType,
      status: 'Confirmed',
      service: (p && p.services[0]) || 'General Service',
      date: 'Jun 24, 2026',
      time: '10:00 AM – 12:00 PM',
      location: (p && p.address) || 'Phnom Penh',
    };
    this.state.bookings.unshift(booking);
    this._saveBooking(booking);
    this.state.bookingDraft = null;
    this._lastBookingId = booking.id;
    this.bookingSuccess(booking.id);
  },
  bookingSuccess(bookingId) {
    const dialog = `<div class="dialog-card">
      <div class="dlg-ic ok">${icon('check')}</div>
      <div class="dlg-t">${t('bk.successTitle')}</div>
      <div class="dlg-d">${t('bk.successDesc')}</div>
      <button class="btn btn-orange" onclick="App.closeModal();App.go('track','${bookingId}')">${t('bk.trackService')}</button>
      <button class="btn btn-white" onclick="App.closeModal();App.go('bookings')">${t('bk.viewBookings')}</button>
    </div>`;
    this._renderModal(dialog, 'center');
  },
  cancelBooking(bookingId) {
    const b = this.state.bookings.find(x => x.id === bookingId);
    if (b) { b.status = 'Cancelled'; this._updateBookingStatus(b); this.toast(t('bk.cancelToast')); this.render(); }
  },

  // ---- toast ----
  toast(msg) {
    let wrap = document.getElementById('toast-wrap');
    if (!wrap) { wrap = document.createElement('div'); wrap.id = 'toast-wrap'; wrap.className = 'toast-wrap'; document.body.appendChild(wrap); }
    wrap.innerHTML = `<div class="toast">${icon('bolt')} ${msg}</div>`;
    clearTimeout(this._toastT);
    this._toastT = setTimeout(() => { wrap.innerHTML = ''; }, 2400);
  },

  // ---- modal layer (dark sheets & dialogs) ----
  _modalRoot() {
    let root = document.getElementById('modal-root');
    if (!root) { root = document.createElement('div'); root.id = 'modal-root'; root.className = 'modal-root'; document.body.appendChild(root); }
    return root;
  },
  _renderModal(html, kind) {
    const root = this._modalRoot();
    root.className = 'modal-root open';
    root.innerHTML = `<div class="modal-backdrop ${kind}" onclick="App.backdropClose(event)">${html}</div>`;
    this._enhanceA11y(root);
  },
  closeModal() {
    const root = document.getElementById('modal-root');
    if (root) { root.className = 'modal-root'; root.innerHTML = ''; }
  },
  backdropClose(e) { if (e.target.classList.contains('modal-backdrop')) this.closeModal(); },

  // ---- Emergency Assistance flow ----
  openEmergency() {
    this.state.emergencyType = null;
    const opts = [['breakdown','mdi:car-wrench'], ['towing','mdi:tow-truck'], ['battery','mdi:car-battery'], ['flat','game-icons:flat-tire']];
    const sheet = `<div class="sheet-card">
      <div class="sh-grip"></div>
      <div class="sheet-title">${t('em.title')} <span class="bell">${icon('siren')}</span></div>
      <div class="sheet-sub">${t('em.subtitle')}</div>
      <div class="em-grid">
        ${opts.map(([id, ms]) => `<div class="em-opt" data-id="${id}" onclick="App.selectEmergency('${id}')">
          <div class="c">${micon(ms, 26)}</div><div class="l">${t('em.' + id)}</div>
        </div>`).join('')}
      </div>
      <button class="btn btn-danger sheet-cta" onclick="App.openEmergencyConfirm()">${t('em.call')}</button>
      <div class="sheet-note">${t('em.reach')}</div>
      <div class="sheet-link" onclick="App.closeModal();App.go('sos')">${t('em.nearby')}</div>
    </div>`;
    this._renderModal(sheet, 'sheet');
  },
  selectEmergency(id) {
    this.state.emergencyType = (this.state.emergencyType === id) ? null : id;
    document.querySelectorAll('#modal-root .em-opt').forEach(el => {
      el.classList.toggle('sel', el.getAttribute('data-id') === this.state.emergencyType);
    });
  },
  openEmergencyConfirm() {
    const dialog = `<div class="dialog-card">
      <div class="dlg-ic">${icon('siren')}</div>
      <div class="dlg-t">${t('em.title')}</div>
      <div class="dlg-d">${t('em.confirmDesc')}</div>
      <button class="btn btn-danger" onclick="App.callHotline()">${t('em.hotline')}</button>
      <button class="btn btn-white" onclick="App.closeModal()">${t('em.cancel')}</button>
    </div>`;
    this._renderModal(dialog, 'center');
  },
  callHotline() {
    this.closeModal();
    this.toast(t('em.connecting'));
    window.location.href = 'tel:1234';
  },

  // ---- render dispatch ----
  render() {
    const r = this.state.route;
    let html = '';
    let showNav = true;

    switch (r) {
      case 'onboarding': html = this.Onboarding(); showNav = false; break;
      case 'login':      html = this.Login(); showNav = false; break;
      case 'signin':     html = this.SignIn(); showNav = false; break;
      case 'signup':     html = this.SignUp(); showNav = false; break;
      case 'resetPw':    html = this.ResetPw(); showNav = false; break;
      case 'home':       html = this.Home(); break;
      case 'category':   html = this.Category(); break;
      case 'detail':     html = this.Detail(); showNav = false; break;
      case 'sos':        html = this.SOS(); break;
      case 'explore':    html = this.Explore(); break;
      case 'favorites':  html = this.Favorites(); break;
      case 'activity':   html = this.Activity(); break;
      case 'bookings':   html = this.Bookings(); break;
      case 'selectVehicle':   html = this.SelectVehicle(); showNav = false; break;
      case 'registerVehicle': html = this.RegisterVehicle(); showNav = false; break;
      case 'track':      html = this.Track(); showNav = false; break;
      case 'search':     html = this.Search(); showNav = false; break;
      case 'location':   html = this.Location(); showNav = false; break;
      case 'partner':    html = this.Partner(); showNav = false; break;
      case 'partnerForm':html = this.PartnerForm(); showNav = false; break;
      case 'profile':    html = this.Profile(); break;
      case 'notifications':  html = this.Notifications(); break;
      case 'savedLocations': html = this.SavedLocations(); break;
      case 'chat':            html = this.Chat(); showNav = false; break;
      default:           html = this.Home();
    }

    this.root.innerHTML = html + (showNav ? this.BottomNav() : '');
    this._enhanceA11y(this.root);
    if (r === 'explore' && this.state.exploreView === 'map') this._initExploreGMap();
    if (r === 'location') this._initLocationGMap();
  },

  // Make every clickable div/span keyboard-focusable and announced as a button,
  // without touching markup/CSS or risking a <button> nested inside another.
  _enhanceA11y(root) {
    const NATIVE = new Set(['BUTTON', 'A', 'INPUT', 'TEXTAREA', 'SELECT']);
    root.querySelectorAll('[onclick]').forEach(el => {
      if (NATIVE.has(el.tagName)) return;
      if (!el.hasAttribute('tabindex')) el.tabIndex = 0;
      if (!el.hasAttribute('role')) el.setAttribute('role', 'button');
    });
  },

  // =========================================================
  // SCREEN: Onboarding
  // =========================================================
  Onboarding() {
    const steps = [
      { c1: '#ff7a3d', c2: '#e0431f', main: 'mdi:car-emergency',  sideL: 'mdi:account-wrench', sideR: 'mdi:tow-truck',        title: t('ob.s1.title'), desc: t('ob.s1.desc') },
      { c1: '#ff9a3d', c2: '#ef7a18', main: 'mdi:calendar-check', sideL: 'mdi:car-wrench',     sideR: 'mdi:cash-multiple',   title: t('ob.s2.title'), desc: t('ob.s2.desc') },
      { c1: '#ffab4a', c2: '#f2760f', main: 'mdi:cellphone-check', sideL: 'mdi:car-multiple',  sideR: 'mdi:map-marker-radius', title: t('ob.s3.title'), desc: t('ob.s3.desc') },
    ];
    const i = this.state.onboardStep;
    const step = steps[i];
    const isLast = i === steps.length - 1;

    return `<div class="screen no-nav ob2">
      <div class="ob2-top">
        <div class="ob2-word">Auto<span>Hub</span></div>
        <div class="ob2-skip" onclick="App.go('login')">${t('ob.skip')} ${icon('chev')}</div>
      </div>

      <div class="ob2-collage">
        <div class="ob2-photo side left" style="${coverStyle(step.c2, step.c1)}">${micon(step.sideL, 42)}</div>
        <div class="ob2-photo side right" style="${coverStyle(step.c1, step.c2)}">${micon(step.sideR, 42)}</div>
        <div class="ob2-photo main" style="${coverStyle(step.c1, step.c2)}">${micon(step.main, 88)}</div>
      </div>

      <div class="ob2-body">
        <h1 class="ob2-title">${step.title}</h1>
        <p class="ob2-desc">${step.desc}</p>
        <div class="ob2-foot">
          <div class="dots">
            ${steps.map((_, k) => `<div class="d ${k === i ? 'on' : ''}"></div>`).join('')}
          </div>
          <button class="btn btn-orange ob2-cta" onclick="App.onboardNext()">
            ${isLast ? t('ob.getStarted') : t('ob.continue')} ${icon('arrow')}
          </button>
        </div>
      </div>
    </div>`;
  },
  onboardNext() {
    if (this.state.onboardStep < 2) { this.state.onboardStep++; this.render(); }
    else { this.go('login'); }
  },

  // =========================================================
  // AUTH (mock UI only — no real credential capture)
  // =========================================================
  SignIn() {
    return `<div class="screen no-nav cta-screen">
      ${TopBar(t('au.signIn'))}
      <div class="pad" style="padding-top:8px">
        <h1 class="auth-h1 dark-text">${t('au.signinTitle')}</h1>
        <p class="auth-sub dark-text" style="margin-bottom:22px">${t('au.signinDesc')}</p>
        <label class="field-lbl">${t('au.email')}</label>
        <div class="field"><input id="signin-email" type="email" placeholder="${t('au.emailPh')}" /></div>
        <label class="field-lbl">${t('au.password')}</label>
        <div class="field"><input id="signin-password" type="password" placeholder="${t('au.passwordPh')}" onkeydown="if(event.key==='Enter')App.emailSignIn()" /></div>
        <div class="auth-forgot" onclick="App.go('resetPw')">${t('au.forgot')}</div>
      </div>
      <div class="sticky-cta">
        <button class="btn btn-orange" onclick="App.emailSignIn()">${t('au.signIn')}</button>
      </div>
      <div class="auth-foot" style="padding-bottom:20px">${t('au.noAccount')} <b onclick="App.go('signup')">${t('au.createNow')}</b></div>
    </div>`;
  },

  SignUp() {
    return `<div class="screen no-nav cta-screen">
      ${TopBar(t('au.createNow'))}
      <div class="pad" style="padding-top:8px">
        <h1 class="auth-h1 dark-text">${t('au.signupTitle')}</h1>
        <p class="auth-sub dark-text" style="margin-bottom:22px">${t('au.signupDesc')}</p>
        <label class="field-lbl">${t('au.email')}</label>
        <div class="field"><input id="signup-email" type="email" placeholder="${t('au.emailPh')}" /></div>
        <label class="field-lbl">${t('au.password')}</label>
        <div class="field"><input id="signup-password" type="password" placeholder="${t('au.passwordPh')}" /></div>
        <label class="field-lbl">${t('au.confirmPw')}</label>
        <div class="field"><input id="signup-confirm" type="password" placeholder="${t('au.passwordPh')}" onkeydown="if(event.key==='Enter')App.emailSignUp()" /></div>
      </div>
      <div class="sticky-cta">
        <button class="btn btn-orange" onclick="App.emailSignUp()">${t('au.createNow')}</button>
      </div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Home
  // =========================================================
  Home() {
    const u = this.state.user;
    const nearby = [...PROVIDERS].sort((a,b) => a.distance - b.distance).slice(0, 6);
    const featured = PROVIDERS.filter(p => p.featured).slice(0, 4);
    const explore = [
      { label: t('pill.topRated'), sub: t('pill.topRated.sub'), icon: 'star',  color: '#ffc850', soft: 'rgba(255,200,80,.14)' },
      { label: t('pill.openNow'),  sub: t('pill.openNow.sub'),  icon: 'clock', color: '#2bd47a', soft: 'rgba(43,212,122,.14)' },
      { label: t('pill.nearest'),  sub: t('pill.nearest.sub'),  icon: 'pin',   color: '#ff8a2a', soft: 'rgba(255,138,42,.14)' },
      { label: t('pill.popular'),  sub: t('pill.popular.sub'),  icon: 'fire',  color: '#ff7a18', soft: 'rgba(255,122,24,.14)' },
      { label: t('pill.emergency'),sub: t('pill.emergency.sub'),icon: 'sos',   color: '#ff3b48', soft: 'rgba(255,59,72,.14)' },
    ];

    return `<div class="screen">
      <div class="home-header">
        <div>
          <div class="greet-loc" onclick="App.openLocationPermission()">${icon('pin')} ${this.state.location} ${icon('chev')}</div>
          <div class="greet-name">${t('home.hi')} ${u.name.split(' ')[0]} 👋</div>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <div class="icon-btn" onclick="App.go('bookings')">${icon('bookmark')}</div>
          <div class="icon-btn" style="position:relative" onclick="App.go('notifications')">${icon('bell')}${this.unreadNotifCount() ? '<span class="badge-dot"></span>' : ''}</div>
          <div class="avatar" onclick="App.go('profile')">${u.initials}</div>
        </div>
      </div>

      <div class="pad" style="margin-top:14px">${SearchBar()}</div>

      <div class="pad">
        <div class="sos-banner" onclick="App.openEmergency()">
          <div class="ico">${icon('sos')}</div>
          <div class="txt"><b>${t('home.sosTitle')}</b><span>${t('home.sosSub')}</span></div>
          <div class="arrow">${icon('arrow')}</div>
        </div>
      </div>

      ${sectionHead(t('home.quick'), t('home.seeAll'), "App.go('explore')")}
      <div class="pad"><div class="quick-grid">
        ${QUICK_SERVICES.map(QuickServiceItem).join('')}
      </div></div>

      ${sectionHead(t('home.explore'), '', '')}
      <div class="explore-row">${explore.map(ExplorePill).join('')}</div>

      ${sectionHead(t('home.nearby'), t('home.seeAll'), "App.go('explore')")}
      <div class="h-scroll">${nearby.map(ServiceCard).join('')}</div>

      ${sectionHead(t('home.featured'), '', '')}
      <div class="pad">${featured.map(FeaturedCard).join('')}</div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Category
  // =========================================================
  Category() {
    const cat = this.state.param || 'Mechanic';
    let list = providersByCategory(cat);
    // fallback so screen is never empty
    if (list.length === 0) list = [...PROVIDERS];

    const filters = [
      { id: 'nearest',  label: t('filter.nearest') },
      { id: 'top',      label: t('filter.top') },
      { id: 'open',     label: t('filter.open') },
      { id: '247',      label: t('filter.247') },
      { id: 'mobile',   label: t('filter.mobile') },
    ];
    const f = this.state.filter;
    let filtered = [...list];
    if (f === 'open') filtered = filtered.filter(p => p.open);
    if (f === '247') filtered = filtered.filter(p => p.open24);
    if (f === 'mobile') filtered = filtered.filter(p => p.mobile);
    if (f === 'top') filtered.sort((a,b) => b.rating - a.rating);
    else filtered.sort((a,b) => a.distance - b.distance);

    const body = filtered.length
      ? `<div class="pad">${filtered.map(ProviderCard).join('')}</div>`
      : EmptyState('search', t('cat.emptyTitle'), t('cat.emptyDesc'), t('cat.reset'), "App.setFilter('nearest')");

    return `<div class="screen">
      ${TopBar(catLabel(cat))}
      <div class="pad" style="padding-top:14px">${SearchBar(t('cat.search'))}</div>
      <div style="margin:14px 0 6px">${FilterChips(filters, f)}</div>
      <div class="pad faint tiny" style="margin:6px 0 14px">${filtered.length} ${filtered.length!==1?t('cat.foundN'):t('cat.found')}</div>
      ${body}
    </div>`;
  },

  // =========================================================
  // SCREEN: Detail
  // =========================================================
  Detail() {
    const p = getProvider(this.state.param);
    if (!p) return this.Home();
    const fav = this.isFav(p.id);
    const tab = this.state.detailTab || 'about';
    const expanded = this.state.detailExpanded;
    const amount = p.rating >= 4.8 ? '3.00' : '2.50';
    const subtitle = `${catLabel(p.category)} · ${t('d.includes')} ${p.services.slice(0,2).join(', ')}`;
    const openText = p.open24 ? t('st.247') + ' · ' + p.hours.replace(/^Open\s*/i, '') : (p.open ? p.hours : t('st.closed'));

    const tabs = [['about','d.about','info'], ['direction','d.direction','route'], ['pricing','d.pricing','tag']];

    // --- About tab ---
    const aboutTab = `
      <div class="hl-card">
        <div class="hl-title">${t('d.highlights')}:</div>
        <p class="hl-text ${expanded ? '' : 'clamp'}">${p.description}</p>
        <span class="hl-more" onclick="App.toggleReadMore()">${expanded ? t('d.readLess') : t('d.readMore')}</span>
      </div>
      <div class="hl-cta card" onclick="App.startBooking('${p.id}')">
        <div class="ic">${icon('check')}</div>
        <div>${t('d.bookCard')}</div>
      </div>
      <div class="h2" style="margin:18px 0 12px">${t('d.services')}</div>
      <div class="chips-wrap" style="margin-bottom:18px">
        ${p.services.map(s => `<span class="tag" style="padding:8px 13px">${s}</span>`).join('')}
      </div>
      <div class="section-head" style="margin:6px 0 12px">
        <div class="h2">${t('d.reviews')}</div>
        <div class="link" onclick="App.toast(t('d.allReviews'))">${t('d.seeAll')}</div>
      </div>
      ${REVIEWS.slice(0,3).map(r => ReviewCard(r, p.color1)).join('')}
    `;

    // --- Direction tab ---
    const directionTab = `
      <div class="detail-map">
        <div class="dmap-route"></div>
        <div class="dmap-pin a">${icon('pin')}</div>
        <div class="dmap-pin b">${icon('car')}</div>
      </div>
      <div class="card pad" style="padding-top:4px;padding-bottom:4px;margin:14px 0 16px">
        <div class="info-line">
          <div class="ic">${icon('pin')}</div>
          <div><div class="k">${t('d.address')}</div><div class="v">${p.address}</div></div>
        </div>
        <div class="info-line">
          <div class="ic">${icon('clock')}</div>
          <div><div class="k">${t('d.hours')}</div><div class="v">${p.hours}</div></div>
        </div>
        <div class="info-line">
          <div class="ic">${icon('phone')}</div>
          <div><div class="k">${t('d.phone')}</div><div class="v">${p.phone}</div></div>
        </div>
      </div>
      <button class="btn btn-orange" onclick="App.navigate('${p.id}')">${icon('nav')} ${t('d.openMaps')}</button>
    `;

    // --- Pricing tab ---
    const PRICES = ['$15 – $40', '$45 – $120', '$80 – $200', '$150 – $400', '$25 – $90'];
    const pricingTab = `
      <div class="price-table card">
        <div class="pt-head">
          <div>${t('d.priceService')}</div><div>${t('d.priceEst')}</div><div>${t('d.priceNotes')}</div>
        </div>
        ${p.services.map((s, i) => `<div class="pt-row">
          <div class="pt-s">${s}</div>
          <div class="pt-p">${PRICES[i % PRICES.length]}</div>
          <div class="pt-n">${t('d.note' + ((i % 5) + 1))}</div>
        </div>`).join('')}
      </div>
    `;

    const content = tab === 'about' ? aboutTab : (tab === 'direction' ? directionTab : pricingTab);

    return `<div class="screen no-nav detail-screen">
      <div class="detail-cover cover" style="${coverStyle(p.color1, p.color2)}">
        ${TopBar('', true).replace('<div class="spacer"></div>',
          `<div class="spacer"></div><div class="icon-btn" onclick="App.toggleFav('${p.id}')" style="${fav?'color:#ff3b48':''}">${icon('heart')}</div>
           <div class="icon-btn" onclick="App.toast(t('t.shareSoon'))">${icon('share')}</div>`)}
        <div class="cover-icon">${micon(catMS(p.category), 86)}</div>
        <div class="carousel-count">${icon('image')} 1/3</div>
      </div>

      <div class="detail-sheet">
        <div class="grip"></div>

        <div class="book-row">
          <span class="book-label">${t('d.bookService')}</span>
          <span class="rating">${icon('star')} ${p.rating.toFixed(1)} <span class="rev">(${p.reviews})</span></span>
        </div>
        <div class="detail-name">${p.name}</div>
        <div class="detail-sub">${subtitle}</div>
        <div class="detail-open ${p.open ? 'on' : 'off'}">${icon('clock')} ${openText}</div>

        <div class="dtab-row">
          ${tabs.map(([id, key, ic]) => `<div class="dtab ${tab === id ? 'active' : ''}" onclick="App.setDetailTab('${id}')">${icon(ic)} ${t(key)}</div>`).join('')}
        </div>

        <div class="dtab-content">${content}</div>
      </div>

      <div class="detail-pricebar">
        <div class="pb-price">
          <div class="pb-from">${t('bk.from')} <s>$5.00</s></div>
          <div class="pb-amt">$${amount} <span>${t('bk.bookingAmount')}</span></div>
        </div>
        <button class="btn btn-orange pb-btn" onclick="App.startBooking('${p.id}')">${t('bk.bookNow')} !</button>
      </div>
    </div>`;
  },

  // =========================================================
  // SCREEN: SOS
  // =========================================================
  SOS() {
    const emergencyProviders = PROVIDERS.filter(p => p.emergency).sort((a,b) => a.distance - b.distance).slice(0, 4);

    return `<div class="screen sos-screen">
      <div class="topbar" style="background:transparent;border:none">
        <div class="icon-btn" onclick="App.go('home')">${icon('back')}</div>
        <div class="title">${t('sos.title')}</div><div class="spacer"></div>
      </div>

      <div class="sos-hero">
        <div class="pulse-wrap"><div class="sos-pulse">${icon('sos')}</div></div>
        <h1>${t('sos.heroTitle')}</h1>
        <p>${t('sos.heroDesc')}</p>
      </div>

      <div class="pad">
        <div class="loc-card card">
          <div class="ic">${icon('location')}</div>
          <div>
            <div class="k">${t('sos.yourLoc')}</div>
            <div class="v">St. 271, Toul Tom Poung, Phnom Penh</div>
          </div>
          <div class="share" onclick="App.toast(t('sos.shared'))">${t('sos.share')}</div>
        </div>
      </div>

      <div class="pad"><button class="btn btn-danger" style="margin-top:18px" onclick="App.toast(t('sos.calling'))">${icon('phone')} ${t('sos.hotline')}</button></div>

      ${sectionHead(t('sos.services'), '', '')}
      <div class="pad"><div class="emerg-grid">
        ${EMERGENCY_OPTIONS.map(EmergencyOptionCard).join('')}
      </div></div>

      ${sectionHead(t('sos.nearby'), '', '')}
      <div class="pad">${emergencyProviders.map(ProviderCard).join('')}</div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Explore
  // =========================================================
  Explore() {
    return this.state.exploreView === 'map' ? this.ExploreMap() : this.ExploreList();
  },

  // ---- Explore: full-screen dark map (MECHANO style, or live Google Map if configured) ----
  ExploreMap() {
    const nearby = [...PROVIDERS].sort((a,b) => a.distance - b.distance);
    const hasKey = !!GOOGLE_MAPS_API_KEY;
    // scattered pin positions across the map (placeholder mode only)
    const pinPos = [
      {l:'24%',t:'26%',a:'blue'},  {l:'62%',t:'20%',a:'orange'}, {l:'44%',t:'38%',a:'danger'},
      {l:'76%',t:'46%',a:'blue'},  {l:'30%',t:'56%',a:'orange'}, {l:'58%',t:'64%',a:'blue'},
      {l:'18%',t:'44%',a:'danger'},{l:'82%',t:'30%',a:'orange'},
    ];
    const seg = `<div class="map-seg">
      <button onclick="App.setExploreView('list')">${icon('list')} ${t('ex.list')}</button>
      <button class="active" onclick="App.setExploreView('map')">${icon('map')} ${t('ex.map')}</button>
    </div>`;

    const mapLayer = hasKey
      ? `<div class="map-full" id="gmap-explore"></div>`
      : `<div class="map-full">
          ${pinPos.map((pp,i) => {
            const p = nearby[i] || nearby[0];
            return `<div class="map-pin ${pp.a}" style="left:${pp.l};top:${pp.t}" onclick="App.scrollToMapCard(${i})"><div class="mp">${micon(catMS(p.category), 16)}</div></div>`;
          }).join('')}
          <div class="map-car"><div class="mc-glow"></div><div class="mc">${icon('car')}</div></div>
        </div>`;

    return `<div class="map-screen">
      ${mapLayer}

      <div class="map-top pad">
        <div class="map-search" onclick="App.go('search')">
          ${icon('search')}
          <input placeholder="${t('ex.searchNearby')}" readonly tabindex="-1" />
          <div class="map-filter">${icon('filter')}</div>
        </div>
      </div>
      ${seg}

      <div class="map-controls">
        <div class="mctrl" onclick="App.gmapZoom('explore',1)">+</div>
        <div class="mctrl" onclick="App.gmapZoom('explore',-1)">−</div>
        <div class="mctrl" onclick="App.gmapRecenter('explore')">${icon('compass')}</div>
      </div>

      <div class="map-cards" id="map-cards">
        ${nearby.slice(0,8).map(MapCard).join('')}
      </div>
    </div>`;
  },

  scrollToMapCard(i) {
    const wrap = document.getElementById('map-cards');
    if (!wrap) return;
    const card = wrap.children[i];
    if (card) card.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  },

  // ---- Google Maps loader (optional — see js/config.js) ----
  _gmaps: { loading: false, callbacks: [] },
  _loadGoogleMaps(cb) {
    if (!GOOGLE_MAPS_API_KEY) { cb(false); return; }
    if (window.google && window.google.maps) { cb(true); return; }
    this._gmaps.callbacks.push(cb);
    if (this._gmaps.loading) return;
    this._gmaps.loading = true;
    window.__onGoogleMapsLoaded = () => {
      this._gmaps.callbacks.forEach(fn => fn(true));
      this._gmaps.callbacks = [];
    };
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GOOGLE_MAPS_API_KEY)}&callback=__onGoogleMapsLoaded`;
    script.async = true;
    script.onerror = () => { this._gmaps.callbacks.forEach(fn => fn(false)); this._gmaps.callbacks = []; };
    document.head.appendChild(script);
  },
  _gmapInstances: {},
  gmapZoom(key, delta) {
    const map = this._gmapInstances[key];
    if (map) map.setZoom(map.getZoom() + delta);
    else this.toast(delta > 0 ? t('ex.zoomIn') : t('ex.zoomOut'));
  },
  gmapRecenter(key) {
    const map = this._gmapInstances[key];
    if (map) map.setCenter({ lat: 11.5564, lng: 104.9282 });
    else this.toast(t('ex.recenter'));
  },
  _gmapPin(color) {
    return { path: google.maps.SymbolPath.CIRCLE, fillColor: color, fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2, scale: 9 };
  },
  _initExploreGMap() {
    if (!document.getElementById('gmap-explore')) return;
    this._loadGoogleMaps((ok) => {
      const el = document.getElementById('gmap-explore');
      if (!ok || !el || this.state.route !== 'explore' || this.state.exploreView !== 'map') return;
      const nearby = [...PROVIDERS].sort((a,b) => a.distance - b.distance).slice(0, 8);
      const map = new google.maps.Map(el, {
        center: { lat: nearby[0].lat, lng: nearby[0].lng }, zoom: 13,
        disableDefaultUI: true, styles: DARK_MAP_STYLE,
      });
      nearby.forEach((p, i) => {
        const marker = new google.maps.Marker({
          position: { lat: p.lat, lng: p.lng }, map, title: p.name,
          icon: this._gmapPin(p.emergency ? '#ff3b48' : '#ff7a18'),
        });
        marker.addListener('click', () => this.scrollToMapCard(i));
      });
      this._gmapInstances.explore = map;
    });
  },
  _initLocationGMap() {
    if (!document.getElementById('gmap-location')) return;
    this._loadGoogleMaps((ok) => {
      const el = document.getElementById('gmap-location');
      if (!ok || !el || this.state.route !== 'location') return;
      const center = { lat: 11.5564, lng: 104.9282 };
      const map = new google.maps.Map(el, {
        center, zoom: 13, disableDefaultUI: true, styles: DARK_MAP_STYLE,
      });
      new google.maps.Marker({ position: center, map, icon: this._gmapPin('#ff7a18') });
      PLACES.forEach((pl, i) => {
        const marker = new google.maps.Marker({
          position: { lat: pl.lat, lng: pl.lng }, map, title: pl.label,
          icon: this._gmapPin('#3d92ff'),
        });
        marker.addListener('click', () => this.pickPlace(i));
      });
      this._gmapInstances.location = map;
    });
  },

  // ---- Explore: light list view ----
  ExploreList() {
    const topRated = [...PROVIDERS].sort((a,b) => b.rating - a.rating).slice(0, 4);
    const emergency = PROVIDERS.filter(p => p.emergency).slice(0, 4);
    const nearby = [...PROVIDERS].sort((a,b) => a.distance - b.distance);
    const popular = [...PROVIDERS].sort((a,b) => b.reviews - a.reviews).slice(0, 4);

    const listBlock = `
      ${sectionHead(t('ex.promos'), '', '')}
      <div class="h-scroll">${PROMOTIONS.map(pr => `
        <div class="promo-card" style="${coverStyle(pr.color1, pr.color2)}" onclick="App.toast(t('t.promoSoon'))">
          <div class="pt">${pr.tag}</div>
          <div class="ph">${pr.title}</div>
          <div class="ps">${pr.sub}</div>
        </div>`).join('')}</div>

      ${sectionHead(t('ex.nearbyGarages'), '', '')}
      <div class="h-scroll">${nearby.slice(0,6).map(ServiceCard).join('')}</div>

      ${sectionHead(t('ex.emergency'), '', '')}
      <div class="pad">${emergency.map(ProviderCard).join('')}</div>

      ${sectionHead(t('ex.popular'), '', '')}
      <div class="h-scroll">${popular.map(ServiceCard).join('')}</div>

      ${sectionHead(t('ex.topRated'), '', '')}
      <div class="pad">${topRated.map(ProviderCard).join('')}</div>
    `;

    return `<div class="screen">
      <div class="home-header" style="padding-bottom:0">
        <div class="h1">${t('ex.title')}</div>
        <div class="map-toggle">
          <button class="active" onclick="App.setExploreView('list')">${icon('list')} ${t('ex.list')}</button>
          <button onclick="App.setExploreView('map')">${icon('map')} ${t('ex.map')}</button>
        </div>
      </div>
      <div class="pad" style="margin-top:16px">${SearchBar(t('ex.search'))}</div>
      <div style="margin-top:14px">${FilterChips([
        {id:'nearest',label:t('filter.nearest')},{id:'top',label:t('filter.top')},{id:'open',label:t('filter.open')},
        {id:'247',label:t('filter.247')},{id:'mobile',label:t('filter.mobile')}
      ], this.state.filter)}</div>
      <div style="margin-top:8px">${listBlock}</div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Favorites
  // =========================================================
  Favorites() {
    const favs = this.state.favorites.map(getProvider).filter(Boolean);
    const garages = favs.filter(p => p.category !== 'Towing');

    const body = favs.length
      ? `<div class="pad">${favs.map(ProviderCard).join('')}</div>`
      : EmptyState('heart', t('fav.emptyTitle'), t('fav.emptyDesc'), t('fav.explore'), "App.go('explore')");

    return `<div class="screen">
      <div class="home-header" style="padding-bottom:8px"><div class="h1">${t('fav.title')}</div></div>
      ${favs.length ? `<div class="pad muted tiny" style="margin-bottom:12px">${favs.length} ${favs.length!==1?t('fav.savedN'):t('fav.saved')}</div>` : ''}
      ${body}
    </div>`;
  },

  // =========================================================
  // SCREEN: Activity
  // =========================================================
  Activity() {
    const recents = ACTIVITY.recentlyViewed.map(getProvider).filter(Boolean);

    const callRow = (c) => {
      const p = getProvider(c.id); if (!p) return '';
      return `<div class="act-row card" style="margin-bottom:10px" onclick="App.go('detail','${p.id}')">
        <div class="ac-ic" style="background:var(--blue-soft);color:var(--blue)">${icon('phone')}</div>
        <div><div class="at">${p.name}</div><div class="as">${p.phone}</div></div>
        <div class="atime">${c.time}</div>
      </div>`;
    };
    const reqRow = (r) => {
      const p = getProvider(r.id); if (!p) return '';
      const done = r.status === 'Completed';
      return `<div class="act-row card" style="margin-bottom:10px" onclick="App.go('detail','${p.id}')">
        <div class="ac-ic" style="background:${coverStyle(p.color1,p.color2)}">${micon(catMS(p.category), 19)}</div>
        <div><div class="at">${p.name}</div><div class="as">${r.service} · ${r.date}</div></div>
        <div class="atime"><span class="status-pill ${done?'done':'cancel'}">${done?t('act.completed'):t('act.cancelled')}</span></div>
      </div>`;
    };

    return `<div class="screen">
      <div class="home-header" style="padding-bottom:8px"><div class="h1">${t('act.title')}</div></div>

      ${sectionHead(t('act.recent'), '', '')}
      <div class="h-scroll">${recents.map(ServiceCard).join('')}</div>

      ${sectionHead(t('act.calls'), '', '')}
      <div class="pad">${ACTIVITY.recentCalls.map(callRow).join('')}</div>

      ${sectionHead(t('act.requests'), '', '')}
      <div class="pad">${ACTIVITY.pastRequests.map(reqRow).join('')}</div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Profile
  // =========================================================
  Profile() {
    const u = this.state.user;
    const menu = (ic, label, right, action) => `
      <div class="menu-item" onclick="${action}">
        <div class="mic">${icon(ic)}</div>
        <div class="ml">${label}</div>
        ${right ? `<div class="mr">${right}</div>` : ''}
        <div class="chev">${icon('chev')}</div>
      </div>`;

    return `<div class="screen">
      <div class="home-header" style="padding-bottom:8px"><div class="h1">${t('pf.title')}</div></div>

      <div class="pad">
        <div class="profile-card card">
          <div class="pav">${u.initials}</div>
          <div>
            <div class="pn">${u.name}</div>
            <div class="pe">${u.email}</div>
          </div>
          <div class="edit icon-btn" onclick="App.toast(t('t.editSoon'))">${icon('edit')}</div>
        </div>

        <div class="partner-banner" onclick="App.go('partner')">
          <div class="pb-ic">${icon('store')}</div>
          <div class="pb-txt"><b>${t('pn.banner')}</b><span>${t('pn.bannerSub')}</span></div>
          <div class="pb-arrow">${icon('arrow')}</div>
        </div>
      </div>

      ${sectionHead(t('pf.vehicle'), t('pf.add'), "App.go('registerVehicle')")}
      <div class="pad">
        ${this.state.vehicles.map(v => `<div class="vehicle-card card" style="margin-bottom:10px">
          <div class="vic">${icon('car')}</div>
          <div><div class="vn">${v.name}</div><div class="vp">${[t('bk.' + v.fuel), v.year, v.color].filter(Boolean).join(' · ')}</div></div>
          <div class="plate">${v.plate}</div>
        </div>`).join('')}
      </div>

      ${sectionHead(t('pf.settings'), '', '')}
      <div class="pad">
        <div class="menu-list card">
          ${menu('bookmark', t('bk.title'), '', "App.go('bookings')")}
          ${menu('clock', t('pf.activity'), '', "App.go('activity')")}
          ${menu('bookmark', t('pf.locations'), this.state.savedLocations.length + ' ' + t('pf.places'), "App.go('savedLocations')")}
          ${menu('globe', t('pf.language'), t('pf.langName'), "App.toggleLang()")}
          ${menu('bell', t('pf.notifications'), this.state.notificationsEnabled ? t('pf.on') : t('pf.off'), "App.toggleNotificationsEnabled()")}
          ${menu('help', t('pf.help'), '', "App.toast(t('t.helpSoon'))")}
          ${menu('gear', t('pf.settingsItem'), '', "App.toast(t('t.settingsSoon'))")}
        </div>
      </div>

      <div class="pad" style="margin-top:18px">
        <button class="btn btn-ghost" style="color:var(--danger)" onclick="App.logout()">${icon('logout')} ${t('pf.logout')}</button>
      </div>
      <div class="pad faint tiny" style="text-align:center;margin-top:18px">${t('pf.version')}</div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Notifications
  // =========================================================
  unreadNotifCount() { return this.state.notifications.filter(n => !n.read).length; },
  markAllNotifRead() {
    this.state.notifications.forEach(n => n.read = true);
    this._saveNotifications();
    this.render();
  },
  markNotifRead(id) {
    const n = this.state.notifications.find(x => x.id === id);
    if (n && !n.read) { n.read = true; this._saveNotifications(); this.render(); }
  },
  toggleNotificationsEnabled() {
    this.state.notificationsEnabled = !this.state.notificationsEnabled;
    localStorage.setItem('autohub_notif_enabled', this.state.notificationsEnabled ? '1' : '0');
    this.toast(this.state.notificationsEnabled ? t('pf.on') : t('pf.off'));
    this.render();
  },
  Notifications() {
    const row = (n) => `<div class="act-row card" style="margin-bottom:10px" onclick="App.markNotifRead('${n.id}')">
      <div class="ac-ic" style="background:var(--orange-soft);color:var(--orange)">${icon(n.icon)}</div>
      <div style="flex:1;min-width:0">
        <div class="at">${t(n.titleKey)}</div>
        <div class="as">${t(n.descKey)}</div>
      </div>
      <div class="atime">${!n.read ? '<span class="dot-unread"></span>' : ''}${t(n.timeKey)}</div>
    </div>`;
    return `<div class="screen">
      ${TopBar(t('pf.notifications'))}
      <div class="section-head pad" style="justify-content:flex-end;margin-top:8px">
        <div class="link" onclick="App.markAllNotifRead()">${t('ntf.markAllRead')}</div>
      </div>
      <div class="pad">${this.state.notifications.map(row).join('')}</div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Saved Locations
  // =========================================================
  setSavedLocation(id) {
    const loc = this.state.savedLocations.find(l => l.id === id);
    if (loc) this.setLocation(loc.address);
  },
  openAddSavedLocation() {
    this.state.pickingSavedLocation = true;
    this.go('location');
  },
  pickPlace(i) {
    const pl = PLACES[i];
    const address = `${pl.label}, ${pl.sub.split(',').slice(-1)[0].trim()}`;
    if (this.state.pickingSavedLocation) {
      this.state.pickingSavedLocation = false;
      this.state.savedLocations.push({ id: 'sl' + Date.now(), icon: 'pin', label: pl.label, address });
      this._saveSavedLocations();
      this.toast(t('loc.added'));
      this.go('savedLocations');
    } else {
      this.setLocation(address);
    }
  },
  locationBack() {
    const picking = this.state.pickingSavedLocation;
    this.state.pickingSavedLocation = false;
    this.go(picking ? 'savedLocations' : 'home');
  },
  SavedLocations() {
    const row = (l) => `<div class="veh-row" onclick="App.setSavedLocation('${l.id}')">
      <div class="veh-ic">${icon(l.icon)}</div>
      <div class="veh-info"><div class="veh-nm">${l.labelKey ? t(l.labelKey) : l.label}</div><div class="veh-plate">${l.address}</div></div>
      <div class="chev">${icon('chev')}</div>
    </div>`;
    return `<div class="screen">
      ${TopBar(t('pf.locations'))}
      <div class="pad" style="padding-top:8px">
        ${this.state.savedLocations.map(row).join('')}
        <div class="veh-row add" onclick="App.openAddSavedLocation()">
          <div class="veh-ic add">${icon('plus')}</div>
          <div class="veh-info"><div class="veh-nm">${t('loc.addNew')}</div></div>
          <div class="chev">${icon('chev')}</div>
        </div>
      </div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Select Vehicle (booking step 1)
  // =========================================================
  SelectVehicle() {
    const d = this.state.bookingDraft || {};
    const vehRow = (v) => {
      const sel = d.vehicleId === v.id;
      return `<div class="veh-row ${sel ? 'sel' : ''}" onclick="App.chooseVehicle('${v.id}')">
        <div class="veh-ic">${micon(MS_BY_VEHICLE[v.type] || 'directions_car', 24)}</div>
        <div class="veh-info"><div class="veh-nm">${v.name}</div><div class="veh-plate">${v.plate}</div></div>
        <div class="veh-check">${sel ? icon('check') : ''}</div>
      </div>`;
    };
    const typeCard = (tpe) => {
      const sel = d.vehicleType === tpe.id;
      return `<div class="qtype ${sel ? 'sel' : ''}" onclick="App.chooseQuickType('${tpe.id}')">
        <div class="qtype-ic">${micon(MS_BY_VEHICLE[tpe.id] || 'directions_car', 24)}</div>
        <div class="qtype-l">${t('bk.' + tpe.id)}</div>
      </div>`;
    };
    const canContinue = !!(d.vehicleId || d.vehicleType);

    return `<div class="screen no-nav cta-screen">
      ${TopBar(t('bk.selectTitle'))}
      <div class="pad" style="padding-top:8px">
        <div class="h2" style="text-align:center;margin:6px 0 20px">${t('bk.selectHeading')}</div>

        <div class="faint tiny" style="font-weight:700;margin-bottom:10px">${t('bk.registered')}</div>
        ${this.state.vehicles.map(vehRow).join('')}
        <div class="veh-row add" onclick="App.go('registerVehicle')">
          <div class="veh-ic add">${icon('plus')}</div>
          <div class="veh-info"><div class="veh-nm">${t('bk.addNew')}</div><div class="veh-plate">${t('bk.addNewSub')}</div></div>
          <div class="chev">${icon('chev')}</div>
        </div>

        <div class="faint tiny" style="font-weight:700;margin:24px 0 4px">${t('bk.other')}</div>
        <div class="faint tiny" style="margin-bottom:12px">${t('bk.otherSub')}</div>
        <div class="qtype-grid">${VEHICLE_TYPES.map(typeCard).join('')}</div>
      </div>

      <div class="sticky-cta">
        <button class="btn ${canContinue ? 'btn-orange' : 'btn-ghost'}" ${canContinue ? '' : 'disabled style="opacity:.5"'} onclick="${canContinue ? 'App.confirmBooking()' : ''}">${t('bk.confirm')}</button>
      </div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Register Vehicle (booking step 1b)
  // =========================================================
  RegisterVehicle() {
    const cur = this.state.registerType;
    const idx = Math.max(0, VEHICLE_TYPES.findIndex(v => v.id === cur));
    const curV = VEHICLE_TYPES[idx];
    const fuels = ['petrol', 'diesel', 'electric', 'hybrid'];
    return `<div class="screen no-nav cta-screen">
      <div class="bk-header">
        <div class="icon-btn" onclick="App.registerBack()">${icon('back')}</div>
        <div class="bk-title">${t('bk.registerTitle')}</div>
      </div>
      <div class="pad" style="padding-top:16px">
        <div class="h2" style="text-align:center;margin:0 0 16px">${t('bk.addYourVehicle')}</div>

        <div class="rv-stage">
          <button class="rv-arrow" onclick="App.registerStep(-1)">${icon('back')}</button>
          <div class="rv-card">
            <div class="rv-ic">${micon(MS_BY_VEHICLE[curV.id] || 'mdi:car', 84)}</div>
            <div class="rv-l">${t('bk.' + curV.id)}</div>
          </div>
          <button class="rv-arrow" onclick="App.registerStep(1)">${icon('chev')}</button>
        </div>
        <div class="rv-dots">
          ${VEHICLE_TYPES.map((tp, k) => `<span class="rv-dot ${k === idx ? 'on' : ''}" onclick="App.setRegisterType('${tp.id}')"></span>`).join('')}
        </div>

        <label class="field-lbl">${t('bk.model')}</label>
        <div class="field field-icon">${icon('car')}<input id="veh-model" placeholder="${t('bk.modelPh')}" /></div>

        <label class="field-lbl">${t('bk.number')}</label>
        <div class="field field-icon">${icon('bookmark')}<input id="veh-number" placeholder="${t('bk.numberPh')}" /></div>

        <div style="display:flex;gap:12px">
          <div style="flex:1">
            <label class="field-lbl">${t('bk.year')}</label>
            <div class="field"><input id="veh-year" inputmode="numeric" placeholder="${t('bk.yearPh')}" /></div>
          </div>
          <div style="flex:1">
            <label class="field-lbl">${t('bk.color')}</label>
            <div class="field"><input id="veh-color" placeholder="${t('bk.colorPh')}" /></div>
          </div>
        </div>

        <label class="field-lbl">${t('bk.fuel')}</label>
        <div class="chips-wrap" style="margin-bottom:8px">
          ${fuels.map((f, i) => `<div class="chip fuel-chip ${i === 0 ? 'active' : ''}" data-fuel="${f}" onclick="App.pickFuel(this)">${t('bk.' + f)}</div>`).join('')}
        </div>
      </div>

      <div class="sticky-cta">
        <button class="btn btn-orange" onclick="App.saveVehicle()">${t('bk.save')}</button>
      </div>
    </div>`;
  },

  registerStep(dir) {
    const idx = Math.max(0, VEHICLE_TYPES.findIndex(v => v.id === this.state.registerType));
    const next = (idx + dir + VEHICLE_TYPES.length) % VEHICLE_TYPES.length;
    this.state.registerType = VEHICLE_TYPES[next].id;
    this.render();
  },
  registerBack() { this.go(this.state.bookingDraft ? 'selectVehicle' : 'profile'); },
  pickFuel(el) {
    document.querySelectorAll('.fuel-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  },

  // =========================================================
  // SCREEN: My Bookings (booking step 2)
  // =========================================================
  Bookings() {
    const bookings = this.state.bookings;
    const statusClass = { Confirmed: 'confirmed', Completed: 'completed', Cancelled: 'cancelled' };
    const statusKey = { Confirmed: 'bk.confirmed', Completed: 'bk.completed', Cancelled: 'bk.cancelled' };

    const card = (b) => {
      const p = getProvider(b.providerId);
      if (!p) return '';
      const isConfirmed = b.status === 'Confirmed';
      return `<div class="booking-card card">
        <div class="bk-top">
          <div class="bk-thumb cover" style="${coverStyle(p.color1, p.color2)}" onclick="App.go('detail','${p.id}')">
            <div class="cover-icon" style="right:6px;bottom:4px;opacity:.4">${micon(catMS(p.category), 38)}</div>
          </div>
          <div class="bk-info">
            <div class="bk-row1">
              <div class="bk-nm">${p.name}</div>
              <span class="bk-status ${statusClass[b.status]}">${t(statusKey[b.status])}</span>
            </div>
            <div class="bk-meta">${icon('clock')} ${b.date} · ${b.time}</div>
            <div class="bk-meta">${icon('wrench')} ${b.service}</div>
            <div class="bk-meta">${icon('pin')} ${b.location}</div>
          </div>
        </div>
        ${isConfirmed ? `<div class="bk-actions">
          <button class="btn btn-sm btn-ghost" style="color:var(--danger)" onclick="App.cancelBooking('${b.id}')">${t('bk.cancel')}</button>
          <button class="btn btn-sm btn-orange" onclick="App.go('track','${b.id}')">${icon('nav')} ${t('bk.track')}</button>
        </div>` : `<div class="bk-actions">
          <button class="btn btn-sm btn-ghost" onclick="App.startBooking('${p.id}')">${icon('clock')} ${t('bk.rebook')}</button>
        </div>`}
      </div>`;
    };

    const body = bookings.length
      ? `<div class="pad">${bookings.map(card).join('')}</div>`
      : EmptyState('bookmark', t('bk.emptyTitle'), t('bk.emptyDesc'), t('fav.explore'), "App.go('explore')");

    return `<div class="screen">
      <div class="bk-header">
        <div class="icon-btn" onclick="App.go('home')">${icon('back')}</div>
        <div class="bk-title">${t('bk.title')}</div>
        <div class="bk-badge">${icon('bookmark')}<span>${bookings.filter(b=>b.status==='Confirmed').length}</span></div>
      </div>
      <div class="pad" style="padding-top:14px;margin-bottom:8px">
        <div class="searchbar" onclick="App.go('search')">${icon('search')}<input placeholder="${t('bk.searchBookings')}" readonly tabindex="-1" /></div>
      </div>
      ${body}
    </div>`;
  },

  // =========================================================
  // SCREEN: Track Service (booking step 3)
  // =========================================================
  Track() {
    const b = this.state.bookings.find(x => x.id === this.state.param) || this.state.bookings[0];
    if (!b) return this.Bookings();
    const p = getProvider(b.providerId);
    const v = this.state.vehicles.find(x => x.id === b.vehicleId);
    const vehType = v ? t('bk.' + v.type) : (b.vehicleType ? t('bk.' + b.vehicleType) : t('bk.car'));
    const steps = [
      { k: 'tr.accepted',  time: '2:15 PM', state: 'done' },
      { k: 'tr.enroute',   time: '2:16 PM', state: 'active' },
      { k: 'tr.arrived',   time: t('tr.pending'), state: 'pending' },
      { k: 'tr.inprogress',time: t('tr.pending'), state: 'pending' },
    ];

    return `<div class="screen no-nav">
      ${TopBar(t('tr.title'))}
      <div class="pad" style="padding-top:8px">
        <div class="track-provider card">
          <div class="tp-av" style="${coverStyle(p.color1, p.color2)}">${icon('user')}</div>
          <div class="tp-info">
            <div class="tp-nm">${p.name}</div>
            <div class="tp-role">${t('tr.mechanic')}</div>
          </div>
          <div class="tp-acts">
            <div class="tp-btn" onclick="App.call('${p.id}')">${icon('phone')}</div>
            <div class="tp-btn ghost" onclick="App.go('chat','${b.id}')">${icon('share')}</div>
          </div>
        </div>
        <div class="track-meta card">
          <div><div class="tm-k">${t('tr.serviceType')}</div><div class="tm-v">${b.service}</div></div>
          <div><div class="tm-k">${t('tr.vehicle')}</div><div class="tm-v">${vehType}</div></div>
        </div>

        <div class="track-map">
          <div class="tmap-route"></div>
          <div class="tmap-dest">${icon('pin')}</div>
          <div class="tmap-car">${icon('car')}</div>
          <div class="tmap-eta">${t('tr.arriving')}<b>5 mins</b></div>
        </div>

        <div class="h2" style="margin:20px 0 4px">${t('tr.progress')}</div>
        <div class="timeline">
          ${steps.map((s, i) => `<div class="tl-step ${s.state}">
            <div class="tl-dot"></div>
            ${i < steps.length - 1 ? '<div class="tl-line"></div>' : ''}
            <div class="tl-body"><div class="tl-t">${t(s.k)}</div><div class="tl-time">${s.time}</div></div>
          </div>`).join('')}
        </div>
      </div>
      <div class="chat-fab" onclick="App.go('chat','${b.id}')">${icon('share')}</div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Chat (mock — Track Service)
  // =========================================================
  _seedChat(bookingId, providerName) {
    if (!this.state.chatThreads[bookingId]) {
      this.state.chatThreads[bookingId] = [
        { from: 'provider', text: t('chat.seed1'), time: '2:16 PM' },
      ];
    }
    return this.state.chatThreads[bookingId];
  },
  sendChatMessage(bookingId) {
    const input = document.getElementById('chat-input');
    const text = (input.value || '').trim();
    if (!text) return;
    const thread = this.state.chatThreads[bookingId];
    thread.push({ from: 'user', text, time: 'Now' });
    input.value = '';
    this._renderChatMessages(bookingId);
    clearTimeout(this._chatReplyT);
    this._chatReplyT = setTimeout(() => {
      thread.push({ from: 'provider', text: t('chat.autoReply'), time: 'Now' });
      this._renderChatMessages(bookingId);
    }, 1200);
  },
  _renderChatMessages(bookingId) {
    const wrap = document.getElementById('chat-messages');
    if (!wrap) return;
    const thread = this.state.chatThreads[bookingId] || [];
    wrap.innerHTML = thread.map(m => `<div class="chat-row ${m.from === 'user' ? 'mine' : ''}">
      <div class="chat-bubble">${m.text}<span class="chat-time">${m.time}</span></div>
    </div>`).join('');
    wrap.scrollTop = wrap.scrollHeight;
  },
  Chat() {
    const b = this.state.bookings.find(x => x.id === this.state.param);
    if (!b) return this.Bookings();
    const p = getProvider(b.providerId);
    const thread = this._seedChat(b.id, p.name);
    return `<div class="screen no-nav chat-screen">
      <div class="topbar">
        <div class="icon-btn" onclick="App.go('track','${b.id}')">${icon('back')}</div>
        <div class="tp-av" style="width:36px;height:36px;border-radius:11px;${coverStyle(p.color1, p.color2)}">${icon('user')}</div>
        <div class="title" style="text-align:left;flex:1">${p.name}<div class="tp-role" style="font-weight:400">${t('tr.mechanic')}</div></div>
        <div class="icon-btn" onclick="App.call('${p.id}')">${icon('phone')}</div>
      </div>
      <div class="chat-messages" id="chat-messages">${thread.map(m => `<div class="chat-row ${m.from === 'user' ? 'mine' : ''}">
        <div class="chat-bubble">${m.text}<span class="chat-time">${m.time}</span></div>
      </div>`).join('')}</div>
      <div class="chat-input-bar">
        <input id="chat-input" placeholder="${t('chat.placeholder')}" onkeydown="if(event.key==='Enter')App.sendChatMessage('${b.id}')" />
        <div class="chat-send" onclick="App.sendChatMessage('${b.id}')">${icon('nav')}</div>
      </div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Search (functional)
  // =========================================================
  Search() {
    const q = this.state.searchQuery || '';
    const cats = QUICK_SERVICES.filter(s => s.id !== 'sos');
    return `<div class="screen no-nav">
      <div class="search-header">
        <div class="icon-btn" onclick="App.go('home')">${icon('back')}</div>
        <div class="search-field">
          ${icon('search')}
          <input id="search-input" value="${q.replace(/"/g,'&quot;')}" placeholder="${t('se.placeholder')}" oninput="App.doSearch(this.value)" />
          <span class="sf-clear" onclick="App.clearSearch()">${q ? icon('close') : ''}</span>
        </div>
      </div>
      <div class="chip-row" style="margin-top:16px">
        ${cats.map(s => `<div class="chip" onclick="App.searchByCat('${s.category}')">${t('qs.' + s.id)}</div>`).join('')}
      </div>
      <div id="search-results" style="margin-top:8px">${this._searchResults(q)}</div>
    </div>`;
  },
  _searchResults(q) {
    const query = (q || '').trim().toLowerCase();
    if (!query) {
      return EmptyState('search', t('se.startTitle'), t('se.startDesc'), '', '');
    }
    const matches = PROVIDERS.filter(p => {
      const hay = [p.name, catLabel(p.category), p.category, p.address, ...p.tags, ...p.services].join(' ').toLowerCase();
      return hay.includes(query);
    }).sort((a, b) => a.distance - b.distance);
    if (!matches.length) {
      return EmptyState('search', t('se.emptyTitle'), t('se.emptyDesc'), '', '');
    }
    const n = matches.length;
    return `<div class="pad faint tiny" style="margin:8px 0 12px">${n} ${n !== 1 ? t('se.results') : t('se.result')}</div>
      <div class="pad">${matches.map(ProviderCard).join('')}</div>`;
  },
  doSearch(v) {
    this.state.searchQuery = v;
    const box = document.getElementById('search-results');
    if (box) box.innerHTML = this._searchResults(v);
    const clr = document.querySelector('.sf-clear');
    if (clr) clr.innerHTML = v ? icon('close') : '';
  },
  clearSearch() {
    this.state.searchQuery = '';
    const inp = document.getElementById('search-input');
    if (inp) { inp.value = ''; inp.focus(); }
    this.doSearch('');
  },
  searchByCat(cat) {
    const label = catLabel(cat);
    this.state.searchQuery = label;
    const inp = document.getElementById('search-input');
    if (inp) inp.value = label;
    this.doSearch(label);
  },

  // =========================================================
  // SCREEN: Location picker + permission
  // =========================================================
  openLocationPermission() {
    const dialog = `<div class="dialog-card">
      <div class="dlg-ic loc">${icon('pin')}</div>
      <div class="dlg-t">${t('lo.permTitle')}</div>
      <div class="dlg-d">${t('lo.permDesc')}</div>
      <button class="btn btn-orange" onclick="App.allowLocation()">${t('lo.allow')}</button>
      <button class="btn btn-outline" onclick="App.closeModal();App.go('location')">${t('lo.manual')}</button>
    </div>`;
    this._renderModal(dialog, 'center');
  },
  allowLocation() {
    this.closeModal();
    this.toast(t('lo.detecting'));
    this.setLocation('St. 271, Toul Tom Poung, Phnom Penh');
  },
  setLocation(label) {
    this.state.pickingSavedLocation = false;
    this.state.location = label;
    this.toast(t('lo.updated'));
    this.go('home');
  },
  Location() {
    const picking = this.state.pickingSavedLocation;
    const hasKey = !!GOOGLE_MAPS_API_KEY;
    const pins = [
      {l:'30%',t:'26%',a:'orange'}, {l:'64%',t:'32%',a:'blue'}, {l:'46%',t:'52%',a:'orange'},
      {l:'22%',t:'58%',a:'blue'}, {l:'72%',t:'62%',a:'orange'},
    ];
    const mapLayer = hasKey
      ? `<div class="map-full" id="gmap-location"></div>`
      : `<div class="map-full">
          ${pins.map(pp => `<div class="map-pin ${pp.a}" style="left:${pp.l};top:${pp.t}"><div class="mp">${icon('pin')}</div></div>`).join('')}
          <div class="map-car"><div class="mc-glow"></div><div class="mc">${icon('pin')}</div></div>
        </div>`;
    return `<div class="map-screen">
      ${mapLayer}
      <div class="map-top pad">
        <div class="map-search">
          <div class="icon-btn" style="width:34px;height:34px;background:transparent;border:none" onclick="App.locationBack()">${icon('back')}</div>
          <input placeholder="${t('lo.pickPlaceholder')}" readonly tabindex="-1" />
          ${icon('search')}
        </div>
      </div>
      <div class="loc-sheet">
        ${picking
          ? `<div class="faint tiny" style="margin-bottom:14px">${t('loc.pickToAdd')}</div>`
          : `<button class="btn btn-outline btn-current" onclick="App.setLocation('St. 271, Toul Tom Poung, Phnom Penh')">${icon('crosshair')} ${t('lo.useCurrent')}</button>`}
        <div class="faint tiny" style="font-weight:700;margin:18px 0 6px">${t('lo.nearby')}</div>
        ${PLACES.map((pl, i) => `<div class="place-row" onclick="App.pickPlace(${i})">
          <div class="place-ic">${icon('pin')}</div>
          <div><div class="place-nm">${pl.label}</div><div class="place-sub">${pl.sub}</div></div>
        </div>`).join('')}
      </div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Auth — Login ("Let's Get Started")
  // =========================================================
  Login() {
    return `<div class="screen no-nav auth-dark">
      <div class="auth-hero">
        <div class="logo-mark">${icon('car')}</div>
        <div class="brand-title" style="color:#fff">Auto<span class="hl">Hub</span></div>
      </div>
      <div class="auth-body">
        <h2 class="auth-h">${t('au.title')}</h2>
        <p class="auth-sub">${t('au.welcome')}</p>
        <button class="social-btn" onclick="App.signInWithGoogle()">${micon('logos:google-icon', 20)} ${t('au.google')}</button>
        <button class="social-btn" onclick="App.toast(t('au.google') + ' ' + t('t.soon'))">${micon('logos:facebook', 20)} ${t('au.facebook')}</button>
        <button class="social-btn" onclick="App.toast(t('au.apple') + ' ' + t('t.soon'))"><span class="apple-ic">${micon('mdi:apple', 22)}</span> ${t('au.apple')}</button>
        <div class="auth-or"><span>${t('au.or')}</span></div>
        <button class="btn btn-orange" onclick="App.go('signin')">${t('au.signIn')}</button>
        <div class="auth-forgot" onclick="App.go('resetPw')">${t('au.forgot')}</div>
        <div class="auth-foot">${t('au.noAccount')} <b onclick="App.go('signup')">${t('au.createNow')}</b></div>
      </div>
    </div>`;
  },

  // ---- Reset password (real Firebase — sends an email reset link) ----
  ResetPw() {
    return `<div class="screen no-nav cta-screen">
      ${TopBar('')}
      <div class="pad" style="padding-top:6px">
        <h1 class="h1">${t('au.resetTitle')}</h1>
        <p class="muted" style="font-size:14px;line-height:1.6;margin:12px 0 24px">${t('au.resetDesc')}</p>
        <label class="field-lbl">${t('au.email')}</label>
        <div class="field field-icon">${icon('mail')}<input id="reset-email" type="email" placeholder="${t('au.emailPh')}" /></div>
      </div>
      <div class="sticky-cta"><button class="btn btn-orange" onclick="App.sendResetEmail()">${t('au.continue')}</button></div>
    </div>`;
  },

  // =========================================================
  // SCREEN: Become a Partner (garage owner — mock UI)
  // =========================================================
  Partner() {
    const benefits = [
      ['pin', 'pn.benefit1'], ['clock', 'pn.benefit2'], ['store', 'pn.benefit3'],
    ];
    return `<div class="screen no-nav cta-screen">
      ${TopBar(t('pn.title'))}
      <div class="pad" style="padding-top:6px">
        <div class="pn-hero">
          <div class="pn-hero-ic">${icon('handshake')}</div>
          <h1 class="pn-hero-t">${t('pn.heroTitle')}</h1>
          <p class="pn-hero-d">${t('pn.heroDesc')}</p>
        </div>
        <div class="pn-benefits">
          ${benefits.map(([ic, k]) => `<div class="pn-benefit">
            <div class="pn-b-ic">${icon(ic)}</div>
            <div class="pn-b-t">${t(k)}</div>
            <div class="pn-b-chk">${icon('check')}</div>
          </div>`).join('')}
        </div>
      </div>
      <div class="sticky-cta"><button class="btn btn-orange" onclick="App.go('partnerForm')">${t('pn.getStarted')} ${icon('arrow')}</button></div>
    </div>`;
  },

  PartnerForm() {
    const cats = ['Mechanic', 'Towing', 'Battery', 'Tire', 'AC Service', 'Car Wash', 'Oil Change', 'Fuel Station', 'EV Station'];
    const services = ['Engine Repair', 'Brake Service', 'Oil Change', 'Diagnostics', 'Battery', 'Tire Change', 'AC Service', 'Car Wash', 'Detailing', 'Roadside'];
    return `<div class="screen no-nav cta-screen">
      <div class="bk-header">
        <div class="icon-btn" onclick="App.go('partner')">${icon('back')}</div>
        <div class="bk-title">${t('pn.formTitle')}</div>
      </div>
      <div class="pad" style="padding-top:16px">
        <label class="field-lbl">${t('pn.photos')} <span class="faint" style="font-weight:400">· ${t('pn.photosHint')}</span></label>
        <div class="photo-upload">
          <div class="pu-add" onclick="App.toast(t('pn.photoAdded'))">${icon('camera')}<span>${t('pn.addPhoto')}</span></div>
          <div class="pu-thumb cover" style="${coverStyle('#ff9a3d', '#ef7a18')}">${micon('mdi:store', 30)}</div>
          <div class="pu-thumb cover" style="${coverStyle('#3d92ff', '#1f57c9')}">${micon('mdi:account-wrench', 30)}</div>
        </div>

        <label class="field-lbl">${t('pn.name')}</label>
        <div class="field field-icon">${icon('store')}<input id="pn-name" placeholder="${t('pn.namePh')}" /></div>

        <label class="field-lbl">${t('pn.category')}</label>
        <div class="chips-wrap" style="margin-bottom:6px">
          ${cats.map((c, i) => `<div class="chip pn-cat ${i === 0 ? 'active' : ''}" onclick="App.pickOne(this,'pn-cat')">${catLabel(c)}</div>`).join('')}
        </div>

        <label class="field-lbl">${t('pn.address')}</label>
        <div class="field field-icon">${icon('pin')}<input id="pn-addr" placeholder="${t('pn.addressPh')}" /></div>

        <label class="field-lbl">${t('pn.phone')}</label>
        <div class="field field-icon">${icon('phone')}<input id="pn-phone" inputmode="tel" placeholder="${t('pn.phonePh')}" /></div>

        <label class="field-lbl">${t('pn.hours')}</label>
        <div class="field field-icon">${icon('clock')}<input id="pn-hours" placeholder="${t('pn.hoursPh')}" /></div>

        <label class="field-lbl">${t('pn.services')}</label>
        <div class="chips-wrap" style="margin-bottom:6px">
          ${services.map(s => `<div class="chip pn-serv" onclick="this.classList.toggle('active')">${s}</div>`).join('')}
        </div>

        <label class="field-lbl">${t('pn.desc')}</label>
        <div class="field"><textarea id="pn-desc" class="ta" rows="3" placeholder="${t('pn.descPh')}"></textarea></div>
      </div>
      <div class="sticky-cta"><button class="btn btn-orange" onclick="App.submitPartner()">${t('pn.submit')}</button></div>
    </div>`;
  },
  pickOne(el, cls) {
    document.querySelectorAll('.' + cls).forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  },
  submitPartner() {
    const name = (document.getElementById('pn-name') || {}).value || '';
    const phone = (document.getElementById('pn-phone') || {}).value || '';
    if (!name.trim() || !phone.trim()) { this.toast(t('pn.needName')); return; }
    const dialog = `<div class="dialog-card">
      <div class="dlg-ic ok">${micon('mdi:store-check', 34)}</div>
      <div class="dlg-t">${t('pn.successTitle')}</div>
      <div class="dlg-d">${t('pn.successDesc')}</div>
      <button class="btn btn-orange" onclick="App.closeModal();App.go('profile')">${t('pn.done')}</button>
    </div>`;
    this._renderModal(dialog, 'center');
  },

  // =========================================================
  // Bottom Navigation
  // =========================================================
  BottomNav() {
    const r = this.state.route;
    const map = { home:'home', explore:'explore', favorites:'favorites', profile:'profile' };
    const active = (k) => map[r] === k ? 'active' : '';
    return `<div class="bottom-nav">
      <div class="nav-item ${active('home')}" onclick="App.go('home')">${icon('home')}<span>${t('nav.home')}</span></div>
      <div class="nav-item ${active('explore')}" onclick="App.go('explore')">${icon('compass')}<span>${t('nav.explore')}</span></div>
      <div class="nav-item sos-nav" onclick="App.openEmergency()"><div class="sos-fab">${icon('sos')}</div><span>${t('nav.sos')}</span></div>
      <div class="nav-item ${active('favorites')}" onclick="App.go('favorites')">${icon('heart')}<span>${t('nav.favorites')}</span></div>
      <div class="nav-item ${active('profile')}" onclick="App.go('profile')">${icon('user')}<span>${t('nav.profile')}</span></div>
    </div>`;
  },
};

// Activity is reachable from profile/home shortcuts; expose route
document.addEventListener('DOMContentLoaded', () => App.init());
