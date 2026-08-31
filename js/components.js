/* =========================================================
   AutoHub — Icons + Reusable Components
   Components return HTML strings (stateless, composable).
   ========================================================= */

// ---- Icon library (inline SVG, stroke-based) ----
const ICONS = {
  sos:     '<path d="M12 3 5 5.8v5.4c0 4.2 2.9 7.4 7 8.8 4.1-1.4 7-4.6 7-8.8V5.8L12 3Z"/><path d="M12 8.2v3.8M12 15h.01"/>',
  wrench:  '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/>',
  tow:     '<path d="M2.5 16.5V6.5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v10M13.5 9.5h3.5l3.5 3.5v3.5h-1.6"/><circle cx="6" cy="17" r="1.9"/><circle cx="17" cy="17" r="1.9"/><path d="M8 16.5h7"/>',
  battery: '<rect x="2.5" y="8" width="18" height="11" rx="2.5"/><path d="M6.5 8V6.5h2.4V8M13.5 8V6.5h2.4V8"/><path d="M6.2 13.5h3.4M7.9 11.8v3.4M13.6 13.5h3.4"/>',
  tire:    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.4"/><path d="M12 3v5.6M12 21v-5.6M3 12h5.6M21 12h-5.6"/>',
  oil:     '<path d="M12 3.4c3.1 3.9 5.2 6.7 5.2 9.6a5.2 5.2 0 0 1-10.4 0c0-2.9 2.1-5.7 5.2-9.6Z"/><path d="M9.6 13.4a2.4 2.4 0 0 0 1.9 2.3"/>',
  ac:      '<path d="M12 2.5v19M4.2 7.2 19.8 16.8M19.8 7.2 4.2 16.8"/><path d="m12 6.3-2-1.3M12 6.3l2-1.3M12 17.7l-2 1.3M12 17.7l2 1.3M5.6 8.4 4.6 6.3M5.6 8.4 3.4 8.9M18.4 15.6l1 2.1M18.4 15.6l2.2-.5M18.4 8.4l1-2.1M18.4 8.4l2.2.5M5.6 15.6l-1 2.1M5.6 15.6l-2.2-.5"/>',
  wash:    '<path d="M4 16.5h16M5.6 16.5l1.1-4h10.6l1.1 4M8 12.5l1-2.3h6l1 2.3"/><circle cx="8" cy="17" r="1.2"/><circle cx="16" cy="17" r="1.2"/><circle cx="7" cy="6" r="1"/><circle cx="11" cy="4.4" r="1.1"/><circle cx="15.2" cy="6" r="1"/>',
  search:  '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  filter:  '<path d="M3 5h18M6 12h12M10 19h4"/>',
  pin:     '<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  star:    '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.6 1-5.8L3.5 9.7l5.9-.9L12 3.5Z" fill="currentColor" stroke="none"/>',
  phone:   '<path d="M5 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 22 2 14 2 5a2 2 0 0 1 2-2Z"/>',
  nav:     '<path d="M3 11l18-8-8 18-2-8-8-2Z"/>',
  arrow:   '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back:    '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  heart:   '<path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z"/>',
  clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  bolt:    '<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"/>',
  fire:    '<path d="M12 2c1 4-2 5-2 8a2 2 0 0 0 4 0c2 2 3 3.5 3 6a5 5 0 0 1-10 0c0-4 5-6 5-14Z"/>',
  share:   '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5"/>',
  chev:    '<path d="m9 6 6 6-6 6"/>',
  car:     '<path d="M5 16h14M6 16l-1.5-5L7 6h10l2.5 5L18 16M7 11h10M8 16v2M16 16v2"/><circle cx="8" cy="16" r="1.2" fill="currentColor"/><circle cx="16" cy="16" r="1.2" fill="currentColor"/>',
  map:     '<path d="m9 4 6 2 6-2v16l-6 2-6-2-6 2V6l6-2Zm0 0v16M15 6v16"/>',
  list:    '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  home:    '<path d="M4 11 12 4l8 7M6 10v9h12v-9"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
  user:    '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>',
  globe:   '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
  help:    '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01"/>',
  gear:    '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
  logout:  '<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 12h10M16 8l4 4-4 4"/>',
  edit:    '<path d="M12 20h8M4 16l9-9 4 4-9 9H4v-4Z"/>',
  bookmark:'<path d="M6 4h12v16l-6-4-6 4V4Z"/>',
  fuel:    '<path d="M5 21V9l4-4h6l4 4v12M4 21h16M9 5V3h6v2M8 13h8"/>',
  check:   '<path d="M20 6 9 17l-5-5"/>',
  plus:    '<path d="M12 5v14M5 12h14"/>',
  image:   '<rect x="3" y="4" width="18" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5L6 21"/>',
  info:    '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.5h.01"/>',
  mail:    '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  close:   '<path d="M6 6l12 12M18 6 6 18"/>',
  crosshair: '<circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  lock:    '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  eye:     '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  eyeoff:  '<path d="M3 3l18 18M10.6 10.6a3 3 0 0 0 4.2 4.2M9.9 5.1A9.6 9.6 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.5 6.6A17 17 0 0 0 2 12s3.5 7 10 7a9.6 9.6 0 0 0 3-.5"/>',
  store:   '<path d="M4 9.5 5.5 4h13L20 9.5M4 9.5a2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0 2 2 0 0 0 4 0M5 11.5V20h14v-8.5"/>',
  camera:  '<path d="M4 8h3l1.5-2h7L17 8h3v11H4Z"/><circle cx="12" cy="13" r="3.4"/>',
  handshake: '<path d="m11 17 2 2a1.4 1.4 0 0 0 2-2M4 13l3 3M4 13l3.5-3.5a2 2 0 0 1 2.8 0l2.7 2.7M13 8l3-3 4 4-3 3M20 12l-3 3"/>',
  lock:    '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  route:   '<circle cx="6.5" cy="17.5" r="2.5"/><circle cx="17.5" cy="6.5" r="2.5"/><path d="M9 17.5h5a3.5 3.5 0 0 0 0-7h-4a3.5 3.5 0 0 1 0-7"/>',
  tag:     '<path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9-9-9Z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  fuel2:   '<path d="M5 21V9l4-4h6l4 4v12M4 21h16M9 5V3h6v2M8 13h8"/>',
  shield:  '<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/>',
  location:'<path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/>',
  bell:    '<path d="M6 9a6 6 0 0 1 12 0c0 6 2 7 2 7H4s2-1 2-7M10 20a2 2 0 0 0 4 0"/>',
  siren:   '<path d="M5 19h14"/><path d="M7 19v-1a5 5 0 0 1 10 0v1"/><path d="M12 7V4M18.5 8.5 20 7M5.5 8.5 4 7"/>',
  clock2:  '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
};

function icon(name, cls = '') {
  const path = ICONS[name] || ICONS.car;
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round" class="${cls}">${path}</svg>`;
}

// ---- Custom hand-drawn filled SVG icons (override Iconify) ----
const CUSTOM_ICONS = {
  // Car puncture / flat tire — front-view car + radiating burst at lower-left
  'custom:car-puncture': '<svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.6 18 L6.6 9 C6.8 5.2 8.6 4.4 10.4 4.4 H14.8 C16.6 4.4 18.4 5.2 18.6 9 L19.6 18 Z M8.3 11 L9.3 7.6 C9.45 7.15 9.75 7 10.2 7 H14.6 C15.05 7 15.35 7.15 15.5 7.6 L16.5 11 Z M7.5 14.2 a1.5 1.5 0 1 0 3 0 a1.5 1.5 0 1 0 -3 0 Z M14.5 14.2 a1.5 1.5 0 1 0 3 0 a1.5 1.5 0 1 0 -3 0 Z"/><path d="M5 13.5 L2.4 11.8 M4.6 15 L1.7 14.2 M4.6 16.6 L1.7 17.4 M5 18 L2.6 19.6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
};

// ---- MDI filled icons (via Iconify) for services/vehicles — MECHANO style ----
function micon(name, size = 24) {
  if (CUSTOM_ICONS[name]) return CUSTOM_ICONS[name].replace('<svg ', `<svg style="width:${size}px;height:${size}px" `);
  return `<iconify-icon icon="${name}" style="font-size:${size}px"></iconify-icon>`;
}

// Map a category to an icon key (stroke set — legacy)
function catIcon(cat) {
  const map = {
    'Mechanic': 'wrench', 'Towing': 'tow', 'Battery': 'battery', 'Tire': 'tire',
    'AC Service': 'ac', 'Car Wash': 'wash', 'Detailing': 'wash', 'Oil Change': 'oil',
    'Emergency': 'sos',
  };
  return map[cat] || 'wrench';
}

// Map a service id → Material Symbol name (filled)
const MS_BY_SERVICE = {
  sos: 'mdi:car-emergency', mechanic: 'mdi:account-wrench', towing: 'mdi:tow-truck', battery: 'mdi:car-battery',
  tire: 'hugeicons:tire', oil: 'mdi:oil', ac: 'mdi:snowflake', wash: 'mdi:car-wash',
  fuelstation: 'mdi:gas-station', evstation: 'material-symbols:ev-station',
};
// Map a provider/category → MDI icon name (filled)
function catMS(cat) {
  const map = {
    'Mechanic': 'mdi:account-wrench', 'Towing': 'mdi:tow-truck', 'Battery': 'mdi:car-battery',
    'Tire': 'hugeicons:tire', 'AC Service': 'mdi:snowflake', 'Car Wash': 'mdi:car-wash',
    'Detailing': 'mdi:car-wash', 'Oil Change': 'mdi:oil', 'Emergency': 'mdi:car-emergency',
    'Fuel Station': 'mdi:gas-station', 'EV Station': 'material-symbols:ev-station',
  };
  return map[cat] || 'mdi:account-wrench';
}
// Vehicle type id → MDI icon name (filled)
const MS_BY_VEHICLE = {
  car: 'mdi:car', bike: 'mdi:motorbike', scooter: 'mdi:scooter', bus: 'mdi:bus', truck: 'mdi:truck',
};

// Gradient cover style for a provider/category
function coverStyle(c1, c2) {
  return `background: linear-gradient(135deg, ${c1}, ${c2});`;
}

// ---- Star rating ----
function ratingEl(rating, reviews) {
  return `<span class="rating">${icon('star')} ${rating.toFixed(1)}
    ${reviews != null ? `<span class="rev">(${reviews})</span>` : ''}</span>`;
}

// ---- Open / 24-7 badge ----
function statusBadge(p) {
  if (p.open24) return `<span class="badge badge-247"><span class="dot"></span>${t('st.247')}</span>`;
  return p.open
    ? `<span class="badge badge-open"><span class="dot"></span>${t('st.open')}</span>`
    : `<span class="badge badge-closed"><span class="dot"></span>${t('st.closed')}</span>`;
}

// ---- SearchBar ----
function SearchBar(placeholder, withFilter = true) {
  placeholder = placeholder || t('home.search');
  return `<div class="searchbar" onclick="App.go('search')">
    ${icon('search')}
    <input placeholder="${placeholder}" readonly tabindex="-1" />
    ${withFilter ? `<div class="filter-btn">${icon('filter')}</div>` : ''}
  </div>`;
}

// ---- FilterChips ----
function FilterChips(chips, activeId) {
  return `<div class="chip-row">${chips.map(c =>
    `<div class="chip ${c.id === activeId ? 'active' : ''}" onclick="App.setFilter('${c.id}')">${c.label}</div>`
  ).join('')}</div>`;
}

// ---- QuickServiceItem ----
function QuickServiceItem(s) {
  const onclick = s.id === 'sos' ? `App.openEmergency()` : `App.go('category','${s.category}')`;
  return `<div class="quick-item ${s.accent}" onclick="${onclick}">
    <div class="ico">${micon(MS_BY_SERVICE[s.id] || 'build', 30)}</div>
    <div class="lbl">${t('qs.' + s.id)}</div>
  </div>`;
}

// ---- ServiceCard (nearby horizontal) ----
function ServiceCard(p) {
  return `<div class="service-card card" onclick="App.go('detail','${p.id}')">
    <div class="cover" style="${coverStyle(p.color1, p.color2)}">
      ${statusBadge(p)}
      <div class="cover-icon">${micon(catMS(p.category), 54)}</div>
    </div>
    <div class="body">
      <div class="nm">${p.name}</div>
      <div class="meta">
        ${ratingEl(p.rating)}
        <span class="d">${icon('pin')} ${p.distance} km</span>
      </div>
    </div>
  </div>`;
}

// ---- MapCard (bottom carousel on full-screen map) ----
function MapCard(p) {
  const fav = App.isFav(p.id);
  const status = p.open24 ? t('st.247') : (p.open ? t('st.open') : t('st.closed'));
  return `<div class="map-card" onclick="App.go('detail','${p.id}')">
    <div class="mcard-img cover" style="${coverStyle(p.color1, p.color2)}">
      <span class="mcard-rate">${icon('star')} ${p.rating.toFixed(1)}</span>
      <div class="mcard-fav ${fav ? 'on' : ''}" onclick="event.stopPropagation();App.toggleFav('${p.id}')">${icon('heart')}</div>
      <div class="cover-icon">${micon(catMS(p.category), 54)}</div>
    </div>
    <div class="mcard-body">
      <div class="mcard-row">
        <div class="mcard-nm">${p.name}</div>
        <span class="mcard-km">${p.distance} Km</span>
      </div>
      <div class="mcard-desc">${p.tags.slice(0,2).join(' · ')}</div>
      <div class="mcard-foot">
        <span class="mcard-open">${icon('clock')} ${status}</span>
        ${p.open ? `<span class="mcard-avail">${t('ex.availableToday')}</span>` : ''}
      </div>
    </div>
  </div>`;
}

// ---- FeaturedCard (large) ----
function FeaturedCard(p) {
  return `<div class="featured-card card" onclick="App.go('detail','${p.id}')">
    <div class="cover" style="height:150px;${coverStyle(p.color1, p.color2)}">
      <div class="ribbon">${icon('fire')} ${t('badge.recommended')}</div>
      <div class="cover-icon">${micon(catMS(p.category), 54)}</div>
      <div class="over">
        <div class="nm">${p.name}</div>
        <div class="meta">
          ${ratingEl(p.rating, p.reviews).replace('class="rating"','class="rating" style="color:#fff"')}
          <span>${icon('pin')} ${p.distance} km · ${p.eta}</span>
        </div>
      </div>
    </div>
  </div>`;
}

// ---- ProviderCard (category / list) ----
function ProviderCard(p) {
  const fav = App.isFav(p.id);
  return `<div class="provider-card card">
    <div class="top">
      <div class="thumb cover" style="${coverStyle(p.color1, p.color2)}" onclick="App.go('detail','${p.id}')">
        <div class="cover-icon" style="right:8px;bottom:6px">${micon(catMS(p.category), 42)}</div>
        <div class="fav-btn ${fav ? 'on' : ''}" onclick="event.stopPropagation();App.toggleFav('${p.id}')">${icon('heart')}</div>
      </div>
      <div class="info" onclick="App.go('detail','${p.id}')">
        <div class="row1">
          <div class="nm">${p.name}</div>
          ${statusBadge(p)}
        </div>
        <div class="sub">
          ${ratingEl(p.rating, p.reviews)}
          <span class="d">${icon('pin')} ${p.distance} km</span>
          <span class="d">${icon('clock')} ${p.eta}</span>
        </div>
        <div class="tagline">${p.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
    <div class="actions">
      <button class="btn btn-ghost btn-sm" onclick="App.call('${p.id}')">${icon('phone')} ${t('btn.call')}</button>
      <button class="btn btn-ghost btn-sm" onclick="App.navigate('${p.id}')">${icon('nav')} ${t('btn.go')}</button>
      <button class="btn btn-blue btn-sm" onclick="App.go('detail','${p.id}')">${t('btn.details')}</button>
    </div>
  </div>`;
}

// ---- ExploreCard (pill) ----
function ExplorePill(item) {
  return `<div class="explore-pill" onclick="App.go('explore')">
    <div class="ico" style="background:${item.soft};color:${item.color}">${icon(item.icon)}</div>
    <b>${item.label}</b><span>${item.sub}</span>
  </div>`;
}

// ---- ReviewCard ----
function ReviewCard(r, color) {
  const initials = r.name.split(' ').map(w => w[0]).join('').slice(0,2);
  return `<div class="review-card card">
    <div class="rhead">
      <div class="rav" style="background:linear-gradient(135deg,${color},#b8430a)">${initials}</div>
      <div>
        <div class="rname">${r.name}</div>
        <div class="rdate">${r.date}</div>
      </div>
      <div style="margin-left:auto">${ratingEl(r.rating)}</div>
    </div>
    <div class="rtext">${r.text}</div>
  </div>`;
}

// ---- EmergencyOptionCard ----
function EmergencyOptionCard(o) {
  const msmap = { tow: 'mdi:tow-truck', jump: 'mdi:car-battery', flat: 'game-icons:flat-tire', fuel: 'mdi:gas-station', mech: 'mdi:account-wrench' };
  return `<div class="emerg-card card" onclick="App.toast(t('sos.finding') + ' ' + t('eo.${o.id}'))">
    <div class="ic">${micon(msmap[o.id] || 'car_repair', 24)}</div>
    <div class="nm">${t('eo.' + o.id)}</div>
    <div class="ds">${t('eo.' + o.id + '.desc')}</div>
    <div class="eta">${icon('clock')} ${t('sos.eta')} ${o.eta}</div>
  </div>`;
}

// ---- EmptyState ----
function EmptyState(ic, title, desc, btnLabel, btnAction) {
  return `<div class="empty">
    <div class="eic">${icon(ic)}</div>
    <h3>${title}</h3>
    <p>${desc}</p>
    ${btnLabel ? `<button class="btn btn-blue" style="max-width:240px;margin:0 auto" onclick="${btnAction}">${btnLabel}</button>` : ''}
  </div>`;
}

// ---- Section header ----
function sectionHead(title, linkLabel, linkAction) {
  return `<div class="section-head pad">
    <div class="h2">${title}</div>
    ${linkLabel ? `<div class="link" onclick="${linkAction}">${linkLabel}</div>` : ''}
  </div>`;
}

// ---- TopBar ----
function TopBar(title, transparent = false) {
  return `<div class="topbar ${transparent ? 'transparent' : ''}">
    <div class="icon-btn" onclick="App.back()">${icon('back')}</div>
    ${title ? `<div class="title">${title}</div>` : ''}
    <div class="spacer"></div>
  </div>`;
}
