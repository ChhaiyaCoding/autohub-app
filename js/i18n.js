/* =========================================================
   AutoHub — Internationalization (i18n)
   English (en) + Khmer (km). t(key) reads App.state.lang.
   Proper nouns (provider names, addresses, phones) are NOT
   translated — only UI chrome and labels.
   ========================================================= */

const I18N = {
  en: {
    // Bottom nav
    'nav.home': 'Home', 'nav.explore': 'Explore', 'nav.sos': 'SOS',
    'nav.favorites': 'Favorites', 'nav.profile': 'Profile',

    // Onboarding
    'ob.skip': 'Skip', 'ob.continue': 'Continue', 'ob.getStarted': 'Get Started',
    'ob.tagline': 'Your Drive, Our Care',
    'ob.s1.title': 'Find Nearby Auto Services',
    'ob.s1.desc': 'Discover trusted garages, mechanics, and car care services right around you in seconds.',
    'ob.s2.title': 'Get Emergency Help',
    'ob.s2.desc': 'Towing, battery, flat tire or fuel — one tap to reach 24/7 emergency assistance.',
    'ob.s3.title': 'Connect With Trusted Mechanics',
    'ob.s3.desc': 'Verified providers, real ratings, and transparent details so you drive with confidence.',

    // Home
    'home.hi': 'Hi,', 'home.search': 'Search services, garages, or locations',
    'home.sosTitle': 'Emergency? Get SOS Help',
    'home.sosSub': 'Tow, battery, tire & roadside · 24/7',
    'home.quick': 'Quick Services', 'home.seeAll': 'See all',
    'home.explore': 'Explore', 'home.nearby': 'Nearby Services',
    'home.featured': 'Featured & Recommended',

    // Explore pills (home)
    'pill.topRated': 'Top Rated', 'pill.topRated.sub': 'Best garages',
    'pill.openNow': 'Open Now', 'pill.openNow.sub': 'Available',
    'pill.nearest': 'Nearest', 'pill.nearest.sub': 'Close to you',
    'pill.popular': 'Popular', 'pill.popular.sub': 'Most booked',
    'pill.emergency': 'Emergency', 'pill.emergency.sub': '24/7 help',

    // Quick services (by id)
    'qs.sos': 'SOS Emergency', 'qs.mechanic': 'Mechanic', 'qs.towing': 'Towing',
    'qs.battery': 'Battery', 'qs.tire': 'Tire Service', 'qs.oil': 'Oil Change',
    'qs.ac': 'AC Service', 'qs.wash': 'Car Wash',
    'qs.fuelstation': 'Fuel Station', 'qs.evstation': 'EV Station',

    // Filters
    'filter.nearest': 'Nearest', 'filter.top': 'Top Rated', 'filter.open': 'Open Now',
    'filter.247': '24/7', 'filter.mobile': 'Mobile Service',

    // Status
    'st.open': 'Open', 'st.closed': 'Closed', 'st.247': '24/7',
    'badge.recommended': 'Recommended',

    // Category display names (provider.category)
    'catName.Mechanic': 'Mechanic', 'catName.Towing': 'Towing', 'catName.Battery': 'Battery',
    'catName.Tire': 'Tire Service', 'catName.AC Service': 'AC Service',
    'catName.Car Wash': 'Car Wash', 'catName.Detailing': 'Detailing',
    'catName.Oil Change': 'Oil Change', 'catName.Emergency': 'Emergency',
    'catName.Fuel Station': 'Fuel Station', 'catName.EV Station': 'EV Station',

    // Common buttons
    'btn.call': 'Call', 'btn.go': 'Go', 'btn.details': 'Details',

    // Category
    'cat.search': 'Search providers',
    'cat.found': 'provider found near you', 'cat.foundN': 'providers found near you',
    'cat.emptyTitle': 'No providers match',
    'cat.emptyDesc': 'Try a different filter to see more service providers nearby.',
    'cat.reset': 'Reset filters',

    // Detail
    'd.about': 'About', 'd.services': 'Services Offered', 'd.gallery': 'Gallery',
    'd.reviews': 'Reviews', 'd.seeAll': 'See all',
    'd.address': 'Address', 'd.hours': 'Opening Hours', 'd.phone': 'Phone',
    'd.reviewsCount': 'reviews', 'd.kmAway': 'km away', 'd.response': 'response',
    'd.request': 'Request Service', 'd.allReviews': 'All reviews — Coming Soon',
    'd.direction': 'Direction', 'd.pricing': 'Pricing',
    'd.bookService': 'Book our service now', 'd.includes': 'Includes',
    'd.highlights': 'Workshop Highlights', 'd.readMore': 'Read more...', 'd.readLess': 'Show less',
    'd.bookCard': "Book Now and we'll take care of the rest.",
    'd.priceService': 'Service', 'd.priceEst': 'Estimated Price ($)', 'd.priceNotes': 'Notes',
    'd.openMaps': 'Open in Google Maps',
    'd.note1': 'Includes oil + filter replacement', 'd.note2': 'Includes labour & parts',
    'd.note3': 'Parts charged separately', 'd.note4': 'Inspection included', 'd.note5': 'On-site service available',

    // SOS
    'sos.title': 'SOS Emergency', 'sos.heroTitle': 'Need Emergency Help?',
    'sos.heroDesc': "Choose a service below — we'll connect you to the nearest provider instantly.",
    'sos.yourLoc': 'Your current location', 'sos.share': 'Share',
    'sos.hotline': 'Call Emergency Hotline', 'sos.services': 'Emergency Services',
    'sos.nearby': 'Nearby Emergency Providers', 'sos.eta': 'ETA', 'sos.finding': 'Finding nearby:',
    'sos.shared': 'Location shared', 'sos.calling': 'Calling Emergency Hotline · 1234',

    // Emergency Assistance modal
    'em.title': 'Emergency Assistance',
    'em.subtitle': 'Select the type of emergency assistance you need:',
    'em.breakdown': 'Breakdown', 'em.towing': 'Towing', 'em.battery': 'Battery', 'em.flat': 'Flat Tire',
    'em.call': 'Call Emergency Assistance',
    'em.reach': 'Our support team will reach you immediately',
    'em.nearby': 'See nearby emergency providers',
    'em.confirmDesc': 'Are you sure you want to call emergency services?',
    'em.hotline': 'Call Emergency Hotline', 'em.cancel': 'Cancel',
    'em.connecting': 'Connecting to emergency hotline…',

    // Emergency options (by id)
    'eo.tow': 'Tow Truck', 'eo.tow.desc': 'Vehicle pickup & transport',
    'eo.jump': 'Battery Jump Start', 'eo.jump.desc': 'Dead battery boost on-site',
    'eo.flat': 'Flat Tire', 'eo.flat.desc': 'Tire change or repair',
    'eo.fuel': 'Fuel Delivery', 'eo.fuel.desc': 'Emergency fuel to you',
    'eo.mech': 'Emergency Mechanic', 'eo.mech.desc': 'Roadside diagnostics',

    // Explore
    'ex.title': 'Explore', 'ex.list': 'List', 'ex.map': 'Map',
    'ex.search': 'Search garages, services, areas',
    'ex.promos': 'Promotions', 'ex.nearbyGarages': 'Nearby Garages',
    'ex.emergency': 'Emergency Services', 'ex.popular': 'Popular Services',
    'ex.topRated': 'Top Rated Providers', 'ex.onMap': 'providers on the map · live demo',
    'ex.searchNearby': 'Search for workshop nearby', 'ex.availableToday': 'Available Today',
    'ex.zoomIn': 'Zoom in', 'ex.zoomOut': 'Zoom out', 'ex.recenter': 'Re-centering on your location',

    // Favorites
    'fav.title': 'Favorites', 'fav.saved': 'saved provider', 'fav.savedN': 'saved providers',
    'fav.emptyTitle': 'No favorites yet',
    'fav.emptyDesc': 'Tap the heart on any service provider to save it here for quick access.',
    'fav.explore': 'Explore services',

    // Activity
    'act.title': 'Activity', 'act.recent': 'Recently Viewed',
    'act.calls': 'Recent Calls', 'act.requests': 'Past Service Requests',
    'act.completed': 'Completed', 'act.cancelled': 'Cancelled',

    // Booking journey
    'bk.bookNow': 'Book Now', 'bk.from': 'From', 'bk.bookingAmount': 'Booking amount',
    'bk.selectTitle': 'Select', 'bk.selectHeading': 'Select vehicle to book a service',
    'bk.registered': 'Your Registered Vehicles',
    'bk.addNew': 'Add New Vehicle', 'bk.addNewSub': 'Register a new vehicle to your account',
    'bk.other': 'Other Vehicle', 'bk.otherSub': "Don't want to register? Use quick booking",
    'bk.continue': 'Continue', 'bk.confirm': 'Confirm Booking',
    'bk.car': 'Car', 'bk.bike': 'Bike', 'bk.scooter': 'Scooter', 'bk.bus': 'Bus', 'bk.truck': 'Truck',
    'bk.registerTitle': 'Register', 'bk.addYourVehicle': 'Add Your Vehicle',
    'bk.model': 'Vehicle Model', 'bk.modelPh': 'Enter your vehicle model',
    'bk.number': 'Vehicle Number', 'bk.numberPh': 'Enter your vehicle number',
    'bk.fuel': 'Fuel Type', 'bk.petrol': 'Petrol', 'bk.diesel': 'Diesel', 'bk.electric': 'Electric', 'bk.hybrid': 'Hybrid',
    'bk.year': 'Year', 'bk.yearPh': 'e.g. 2021', 'bk.color': 'Color', 'bk.colorPh': 'e.g. White',
    'bk.save': 'Save New Vehicle', 'bk.saved': 'Vehicle saved',
    'bk.needModel': 'Please enter the vehicle model & number',
    'bk.title': 'My Bookings', 'bk.searchBookings': 'Search your bookings here',
    'bk.emptyTitle': 'No Booking Yet.', 'bk.emptyDesc': "Looks like you haven't experienced quality services at “AutoHub”",
    'bk.confirmed': 'Confirmed', 'bk.completed': 'Completed', 'bk.cancelled': 'Cancelled',
    'bk.cancel': 'Cancel', 'bk.track': 'Track', 'bk.rebook': 'Rebook',
    'bk.cancelToast': 'Booking cancelled',
    'bk.successTitle': 'Booking Confirmed!', 'bk.successDesc': 'Your booking has been placed. You can track it anytime from My Bookings.',
    'bk.trackService': 'Track Service', 'bk.viewBookings': 'View Bookings',
    // Track service
    'tr.title': 'Track Service', 'tr.serviceType': 'Service Type', 'tr.vehicle': 'Vehicle',
    'tr.mechanic': 'Mechanic', 'tr.arriving': 'ARRIVING IN', 'tr.progress': 'Service Progress',
    'tr.accepted': 'Request Accepted', 'tr.enroute': 'En Route to Location',
    'tr.arrived': 'Arrived at Location', 'tr.inprogress': 'Service in Progress', 'tr.pending': 'Pending',
    'tr.chatSoon': 'Chat — Coming Soon', 'tr.callMechanic': 'Calling',

    // Authentication (mock UI only)
    'au.title': "Let's Get Started", 'au.welcome': "Welcome to your AutoHub! We're thrilled to have you here.",
    'au.google': 'Continue with Google', 'au.facebook': 'Continue with Facebook', 'au.apple': 'Continue with Apple',
    'au.or': 'Or', 'au.signIn': 'Sign In', 'au.noAccount': "Don't have an account?", 'au.createNow': 'Create now!',
    'au.forgot': 'Forgot password?', 'au.email': 'Email', 'au.emailPh': 'Enter your email',
    'au.password': 'Password', 'au.passwordPh': 'Enter your password',
    'au.signinTitle': 'Sign in to AutoHub', 'au.signinDesc': 'Enter your details to continue.',
    'au.resetTitle': 'Reset your password',
    'au.resetDesc': 'Enter your email and we will send you a link to reset your password.',
    'au.continue': 'Continue',
    'au.confirmPw': 'Confirm Password',
    'au.signupTitle': 'Create your account', 'au.signupDesc': 'Sign up with your email to get started.',
    'au.resetSentTitle': 'Check your email', 'au.resetSentDesc': "We've sent a password reset link to your email.",
    'au.backToLogin': 'Back to login',
    'au.needCreds': 'Please enter your email and password', 'au.needEmail': 'Please enter your email',
    'au.err.invalidEmail': "That email doesn't look right.",
    'au.err.userNotFound': 'No account found with that email.',
    'au.err.wrongPassword': 'Incorrect email or password.',
    'au.err.emailInUse': 'That email is already registered — try signing in instead.',
    'au.err.weakPassword': 'Password should be at least 6 characters.',
    'au.err.tooMany': 'Too many attempts — please try again later.',
    'au.err.popupClosed': 'Sign-in was cancelled.',
    'au.err.pwMismatch': "Passwords don't match.",
    'au.err.generic': 'Something went wrong — please try again.',
    'au.signedIn': 'Signed in successfully', 'au.pwReset': 'Password reset — Coming Soon',

    // Search
    'se.title': 'Search', 'se.placeholder': 'Search services, garages, or locations',
    'se.categories': 'Browse Categories', 'se.results': 'results', 'se.result': 'result',
    'se.emptyTitle': 'No results found', 'se.emptyDesc': 'Try a different keyword or browse the categories above.',
    'se.startTitle': 'Find anything', 'se.startDesc': 'Search by garage name, service type, or area.',

    // Location
    'lo.permTitle': "What's your location?", 'lo.permDesc': 'We need your location to show available nearby services.',
    'lo.allow': 'Allow', 'lo.manual': 'Enter location manually',
    'lo.pickPlaceholder': 'Search your location', 'lo.useCurrent': 'Use My Current Location',
    'lo.nearby': 'Places Near You', 'lo.updated': 'Location updated', 'lo.detecting': 'Detecting your location…',

    // Become a Partner (garage owner — mock UI)
    'pn.banner': 'Own a garage?', 'pn.bannerSub': 'List it on AutoHub & get more customers',
    'pn.title': 'Become a Partner', 'pn.heroTitle': 'Grow your garage with AutoHub',
    'pn.heroDesc': 'Reach thousands of drivers nearby, get more bookings, and manage your shop with ease.',
    'pn.benefit1': 'Reach nearby customers', 'pn.benefit2': 'Get bookings & calls', 'pn.benefit3': 'Manage your shop easily',
    'pn.getStarted': 'Register My Garage',
    'pn.formTitle': 'Register Your Garage',
    'pn.photos': 'Garage Photos', 'pn.photosHint': 'Add up to 5 photos', 'pn.addPhoto': 'Add photo',
    'pn.name': 'Garage Name', 'pn.namePh': 'e.g. Premium Auto Care',
    'pn.category': 'Category', 'pn.address': 'Address', 'pn.addressPh': 'Street, area, city',
    'pn.phone': 'Phone Number', 'pn.phonePh': 'e.g. +855 12 345 678',
    'pn.hours': 'Opening Hours', 'pn.hoursPh': 'e.g. Mon–Sun · 7AM – 8PM',
    'pn.services': 'Services Offered', 'pn.desc': 'Description', 'pn.descPh': 'Tell customers about your garage…',
    'pn.submit': 'Submit Application',
    'pn.successTitle': 'Application Submitted!', 'pn.successDesc': 'Our team will review your garage within 24 hours and contact you.',
    'pn.needName': 'Please enter your garage name & phone', 'pn.photoAdded': 'Photo added (demo)', 'pn.done': 'Done',

    // Profile
    'pf.title': 'Profile', 'pf.vehicle': 'My Vehicle', 'pf.add': 'Add',
    'pf.settings': 'Settings', 'pf.activity': 'Activity & History',
    'pf.locations': 'Saved Locations', 'pf.places': 'places',
    'pf.language': 'Language', 'pf.notifications': 'Notifications', 'pf.on': 'On', 'pf.off': 'Off',
    'pf.help': 'Help & Support', 'pf.settingsItem': 'Settings', 'pf.logout': 'Logout',
    'pf.version': 'AutoHub · v1.0.0 · Your Drive, Our Care',
    'pf.langName': 'English',

    // Notifications
    'ntf.markAllRead': 'Mark all read',
    'ntf.n1.t': 'Booking Confirmed', 'ntf.n1.d': 'Your Brake Service with AutoHub Partner Garage is confirmed for Jun 25.',
    'ntf.n2.t': 'Mechanic En Route', 'ntf.n2.d': 'Your mechanic is on the way — arriving in about 5 minutes.',
    'ntf.n3.t': 'Limited Promotion', 'ntf.n3.d': '20% off Full Detailing this week only.',
    'ntf.n4.t': 'Service Reminder', 'ntf.n4.d': "It's almost time for your Toyota Highlander's oil change.",
    'ntf.n5.t': 'Booking Completed', 'ntf.n5.d': 'Your Full Detailing service is done — rate your experience!',
    'ntf.time.10m': '10 min ago', 'ntf.time.1h': '1 hour ago', 'ntf.time.3h': '3 hours ago',
    'ntf.time.1d': 'Yesterday', 'ntf.time.2d': '2 days ago',

    // Saved locations
    'loc.home': 'Home', 'loc.work': 'Work', 'loc.other': 'Other',
    'loc.addNew': 'Add Location', 'loc.pickToAdd': 'Pick a place below to save it',
    'loc.added': 'Location saved',

    // Chat (mock — Track Service)
    'chat.placeholder': 'Type a message…',
    'chat.seed1': "Hi! I'm on my way to your location now.",
    'chat.autoReply': 'Got it, thanks! See you soon.',

    // Toasts / coming soon
    't.soon': 'Coming Soon', 't.searchSoon': 'Search is coming soon',
    't.addedFav': 'Added to favorites', 't.removedFav': 'Removed from favorites',
    't.calling': 'Calling', 't.directions': 'Opening directions to',
    't.noNotif': 'No new notifications', 't.requestSoon': 'Request Service — Coming Soon',
    't.shareSoon': 'Share — Coming Soon', 't.editSoon': 'Edit profile — Coming Soon',
    't.locSoon': 'Saved locations — Coming Soon', 't.notifSoon': 'Notifications — Coming Soon',
    't.helpSoon': 'Help & Support — Coming Soon', 't.settingsSoon': 'Settings — Coming Soon',
    't.vehicleSoon': 'Add vehicle — Coming Soon', 't.promoSoon': 'Promotion — Coming Soon',
    't.langSwitched': 'Language set to English',
  },

  km: {
    // Bottom nav
    'nav.home': 'ដើម', 'nav.explore': 'ស្វែងរក', 'nav.sos': 'សង្គ្រោះ',
    'nav.favorites': 'ចូលចិត្ត', 'nav.profile': 'គណនី',

    // Onboarding
    'ob.skip': 'រំលង', 'ob.continue': 'បន្ត', 'ob.getStarted': 'ចាប់ផ្ដើម',
    'ob.tagline': 'ការបើកបររបស់អ្នក ការថែទាំរបស់យើង',
    'ob.s1.title': 'រកសេវាជួសជុលរថយន្តនៅជិត',
    'ob.s1.desc': 'ស្វែងរកហាង ជាងរថយន្ត និងសេវាថែទាំរថយន្តដែលអាចទុកចិត្តបាន នៅជុំវិញអ្នកក្នុងរយៈពេលប៉ុន្មានវិនាទី។',
    'ob.s2.title': 'ទទួលជំនួយបន្ទាន់',
    'ob.s2.desc': 'អូសរថយន្ត អាគុយ កង់បែក ឬប្រេងឥន្ធនៈ — ចុចតែម្ដងដើម្បីទទួលជំនួយ ២៤ម៉ោង។',
    'ob.s3.title': 'ភ្ជាប់ជាមួយជាងរថយន្តដែលអាចទុកចិត្ត',
    'ob.s3.desc': 'អ្នកផ្ដល់សេវាដែលបានផ្ទៀងផ្ទាត់ ការវាយតម្លៃពិតប្រាកដ និងព័ត៌មានច្បាស់លាស់ ដើម្បីឲ្យអ្នកបើកបរដោយទំនុកចិត្ត។',

    // Home
    'home.hi': 'សួស្ដី,', 'home.search': 'ស្វែងរកសេវា ហាង ឬទីតាំង',
    'home.sosTitle': 'មានអាសន្ន? ទទួលជំនួយ SOS',
    'home.sosSub': 'អូស អាគុយ កង់ និងតាមផ្លូវ · ២៤ម៉ោង',
    'home.quick': 'សេវាកម្មរហ័ស', 'home.seeAll': 'មើលទាំងអស់',
    'home.explore': 'ស្វែងរក', 'home.nearby': 'សេវានៅជិត',
    'home.featured': 'ពិសេស និងណែនាំ',

    // Explore pills (home)
    'pill.topRated': 'វាយតម្លៃខ្ពស់', 'pill.topRated.sub': 'ហាងល្អបំផុត',
    'pill.openNow': 'បើកឥឡូវ', 'pill.openNow.sub': 'អាចប្រើបាន',
    'pill.nearest': 'ជិតបំផុត', 'pill.nearest.sub': 'នៅជិតអ្នក',
    'pill.popular': 'ពេញនិយម', 'pill.popular.sub': 'កក់ច្រើនបំផុត',
    'pill.emergency': 'អាសន្ន', 'pill.emergency.sub': 'ជំនួយ២៤ម៉ោង',

    // Quick services
    'qs.sos': 'សង្គ្រោះបន្ទាន់', 'qs.mechanic': 'ជាងរថយន្ត', 'qs.towing': 'អូសរថយន្ត',
    'qs.battery': 'អាគុយ', 'qs.tire': 'សេវាកង់', 'qs.oil': 'ប្ដូរប្រេងម៉ាស៊ីន',
    'qs.ac': 'សេវាម៉ាស៊ីនត្រជាក់', 'qs.wash': 'លាងរថយន្ត',
    'qs.fuelstation': 'ស្ថានីយ៍ប្រេង', 'qs.evstation': 'ស្ថានីយ៍ EV',

    // Filters
    'filter.nearest': 'ជិតបំផុត', 'filter.top': 'វាយតម្លៃខ្ពស់', 'filter.open': 'បើកឥឡូវ',
    'filter.247': '២៤ម៉ោង', 'filter.mobile': 'សេវាចល័ត',

    // Status
    'st.open': 'បើក', 'st.closed': 'បិទ', 'st.247': '២៤ម៉ោង',
    'badge.recommended': 'ណែនាំ',

    // Category display names (provider.category)
    'catName.Mechanic': 'ជាងរថយន្ត', 'catName.Towing': 'អូសរថយន្ត', 'catName.Battery': 'អាគុយ',
    'catName.Tire': 'សេវាកង់', 'catName.AC Service': 'សេវាម៉ាស៊ីនត្រជាក់',
    'catName.Car Wash': 'លាងរថយន្ត', 'catName.Detailing': 'សម្អាតលម្អិត',
    'catName.Oil Change': 'ប្ដូរប្រេងម៉ាស៊ីន', 'catName.Emergency': 'អាសន្ន',
    'catName.Fuel Station': 'ស្ថានីយ៍ប្រេងឥន្ធនៈ', 'catName.EV Station': 'ស្ថានីយ៍សាក EV',

    // Common buttons
    'btn.call': 'ហៅ', 'btn.go': 'ទៅ', 'btn.details': 'លម្អិត',

    // Category
    'cat.search': 'ស្វែងរកអ្នកផ្ដល់សេវា',
    'cat.found': 'អ្នកផ្ដល់សេវានៅជិតអ្នក', 'cat.foundN': 'អ្នកផ្ដល់សេវានៅជិតអ្នក',
    'cat.emptyTitle': 'គ្មានអ្នកផ្ដល់សេវាត្រូវនឹង',
    'cat.emptyDesc': 'សាកល្បងតម្រងផ្សេង ដើម្បីមើលអ្នកផ្ដល់សេវាបន្ថែមនៅជិត។',
    'cat.reset': 'កំណត់តម្រងឡើងវិញ',

    // Detail
    'd.about': 'អំពី', 'd.services': 'សេវាកម្មដែលផ្ដល់', 'd.gallery': 'វិចិត្រសាល',
    'd.reviews': 'មតិវាយតម្លៃ', 'd.seeAll': 'មើលទាំងអស់',
    'd.address': 'អាសយដ្ឋាន', 'd.hours': 'ម៉ោងបើក', 'd.phone': 'ទូរស័ព្ទ',
    'd.reviewsCount': 'មតិ', 'd.kmAway': 'គ.ម ឆ្ងាយ', 'd.response': 'ឆ្លើយតប',
    'd.request': 'ស្នើសុំសេវា', 'd.allReviews': 'មតិទាំងអស់ — នឹងមានឆាប់ៗ',
    'd.direction': 'ទិសដៅ', 'd.pricing': 'តម្លៃ',
    'd.bookService': 'កក់សេវារបស់យើងឥឡូវ', 'd.includes': 'រួមមាន',
    'd.highlights': 'ចំណុចពិសេសរបស់ហាង', 'd.readMore': 'អានបន្ថែម...', 'd.readLess': 'បង្រួម',
    'd.bookCard': 'កក់ឥឡូវ យើងនឹងថែទាំអ្វីៗដែលនៅសល់។',
    'd.priceService': 'សេវា', 'd.priceEst': 'តម្លៃប៉ាន់ស្មាន ($)', 'd.priceNotes': 'កំណត់សម្គាល់',
    'd.openMaps': 'បើកក្នុង Google Maps',
    'd.note1': 'រួមប្រេង + ប្ដូរតម្រង', 'd.note2': 'រួមថ្លៃពលកម្ម និងគ្រឿងបន្លាស់',
    'd.note3': 'គ្រឿងបន្លាស់គិតថ្លៃដាច់ដោយឡែក', 'd.note4': 'រួមការត្រួតពិនិត្យ', 'd.note5': 'មានសេវាដល់កន្លែង',

    // SOS
    'sos.title': 'សង្គ្រោះបន្ទាន់', 'sos.heroTitle': 'ត្រូវការជំនួយបន្ទាន់?',
    'sos.heroDesc': 'ជ្រើសរើសសេវាខាងក្រោម — យើងនឹងភ្ជាប់អ្នកទៅអ្នកផ្ដល់សេវានៅជិតបំផុតភ្លាមៗ។',
    'sos.yourLoc': 'ទីតាំងបច្ចុប្បន្នរបស់អ្នក', 'sos.share': 'ចែករំលែក',
    'sos.hotline': 'ហៅខ្សែទូរស័ព្ទបន្ទាន់', 'sos.services': 'សេវាសង្គ្រោះបន្ទាន់',
    'sos.nearby': 'អ្នកផ្ដល់សេវាបន្ទាន់នៅជិត', 'sos.eta': 'ETA', 'sos.finding': 'កំពុងស្វែងរកនៅជិត៖',
    'sos.shared': 'បានចែករំលែកទីតាំង', 'sos.calling': 'កំពុងហៅខ្សែទូរស័ព្ទបន្ទាន់ · 1234',

    // Emergency Assistance modal
    'em.title': 'ជំនួយបន្ទាន់',
    'em.subtitle': 'ជ្រើសរើសប្រភេទជំនួយបន្ទាន់ដែលអ្នកត្រូវការ៖',
    'em.breakdown': 'រថយន្តខូច', 'em.towing': 'អូសរថយន្ត', 'em.battery': 'អាគុយ', 'em.flat': 'កង់បែក',
    'em.call': 'ហៅជំនួយបន្ទាន់',
    'em.reach': 'ក្រុមការងាររបស់យើងនឹងទៅដល់អ្នកភ្លាមៗ',
    'em.nearby': 'មើលអ្នកផ្ដល់សេវាបន្ទាន់នៅជិត',
    'em.confirmDesc': 'តើអ្នកប្រាកដជាចង់ហៅសេវាបន្ទាន់មែនទេ?',
    'em.hotline': 'ហៅខ្សែទូរស័ព្ទបន្ទាន់', 'em.cancel': 'បោះបង់',
    'em.connecting': 'កំពុងភ្ជាប់ទៅខ្សែបន្ទាន់…',

    // Emergency options
    'eo.tow': 'ឡានអូស', 'eo.tow.desc': 'ទទួលនិងដឹកជញ្ជូនរថយន្ត',
    'eo.jump': 'ជំរុញអាគុយ', 'eo.jump.desc': 'ជំនួយអាគុយអស់នៅនឹងកន្លែង',
    'eo.flat': 'កង់បែក', 'eo.flat.desc': 'ប្ដូរ ឬជួសជុលកង់',
    'eo.fuel': 'ដឹកប្រេងឥន្ធនៈ', 'eo.fuel.desc': 'ប្រេងបន្ទាន់មកដល់អ្នក',
    'eo.mech': 'ជាងរថយន្តបន្ទាន់', 'eo.mech.desc': 'ពិនិត្យតាមផ្លូវ',

    // Explore
    'ex.title': 'ស្វែងរក', 'ex.list': 'បញ្ជី', 'ex.map': 'ផែនទី',
    'ex.search': 'ស្វែងរកហាង សេវា តំបន់',
    'ex.promos': 'ប្រូម៉ូសិន', 'ex.nearbyGarages': 'ហាងនៅជិត',
    'ex.emergency': 'សេវាសង្គ្រោះបន្ទាន់', 'ex.popular': 'សេវាពេញនិយម',
    'ex.topRated': 'អ្នកផ្ដល់សេវាវាយតម្លៃខ្ពស់', 'ex.onMap': 'អ្នកផ្ដល់សេវានៅលើផែនទី · សាកល្បង',
    'ex.searchNearby': 'ស្វែងរកហាងនៅជិត', 'ex.availableToday': 'អាចប្រើបានថ្ងៃនេះ',
    'ex.zoomIn': 'ពង្រីក', 'ex.zoomOut': 'បង្រួម', 'ex.recenter': 'កំពុងត្រឡប់ទៅទីតាំងអ្នក',

    // Favorites
    'fav.title': 'ចូលចិត្ត', 'fav.saved': 'បានរក្សាទុក', 'fav.savedN': 'បានរក្សាទុក',
    'fav.emptyTitle': 'មិនទាន់មានចូលចិត្ត',
    'fav.emptyDesc': 'ចុចរូបបេះដូងលើអ្នកផ្ដល់សេវាណាមួយ ដើម្បីរក្សាទុកនៅទីនេះសម្រាប់ងាយស្រួលប្រើ។',
    'fav.explore': 'ស្វែងរកសេវាកម្ម',

    // Activity
    'act.title': 'សកម្មភាព', 'act.recent': 'មើលថ្មីៗ',
    'act.calls': 'ការហៅថ្មីៗ', 'act.requests': 'សំណើសេវាពីមុន',
    'act.completed': 'បានបញ្ចប់', 'act.cancelled': 'បានលុបចោល',

    // Booking journey
    'bk.bookNow': 'កក់ឥឡូវ', 'bk.from': 'ចាប់ពី', 'bk.bookingAmount': 'ថ្លៃកក់',
    'bk.selectTitle': 'ជ្រើសរើស', 'bk.selectHeading': 'ជ្រើសរើសរថយន្តដើម្បីកក់សេវា',
    'bk.registered': 'រថយន្តដែលអ្នកបានចុះឈ្មោះ',
    'bk.addNew': 'បន្ថែមរថយន្តថ្មី', 'bk.addNewSub': 'ចុះឈ្មោះរថយន្តថ្មីទៅគណនីរបស់អ្នក',
    'bk.other': 'រថយន្តផ្សេងទៀត', 'bk.otherSub': 'មិនចង់ចុះឈ្មោះ? ប្រើការកក់រហ័ស',
    'bk.continue': 'បន្ត', 'bk.confirm': 'បញ្ជាក់ការកក់',
    'bk.car': 'ឡាន', 'bk.bike': 'ម៉ូតូ', 'bk.scooter': 'ស្គូទ័រ', 'bk.bus': 'ឡានក្រុង', 'bk.truck': 'ឡានដឹកទំនិញ',
    'bk.registerTitle': 'ចុះឈ្មោះ', 'bk.addYourVehicle': 'បន្ថែមរថយន្តរបស់អ្នក',
    'bk.model': 'ម៉ូដែលរថយន្ត', 'bk.modelPh': 'បញ្ចូលម៉ូដែលរថយន្ត',
    'bk.number': 'លេខរថយន្ត', 'bk.numberPh': 'បញ្ចូលលេខរថយន្ត',
    'bk.fuel': 'ប្រភេទប្រេង', 'bk.petrol': 'សាំង', 'bk.diesel': 'ម៉ាស៊ូត', 'bk.electric': 'អគ្គិសនី', 'bk.hybrid': 'ហៃប្រីដ',
    'bk.year': 'ឆ្នាំ', 'bk.yearPh': 'ឧ. 2021', 'bk.color': 'ពណ៌', 'bk.colorPh': 'ឧ. ស',
    'bk.save': 'រក្សាទុករថយន្ត', 'bk.saved': 'បានរក្សាទុករថយន្ត',
    'bk.needModel': 'សូមបញ្ចូលម៉ូដែល និងលេខរថយន្ត',
    'bk.title': 'ការកក់របស់ខ្ញុំ', 'bk.searchBookings': 'ស្វែងរកការកក់របស់អ្នក',
    'bk.emptyTitle': 'មិនទាន់មានការកក់', 'bk.emptyDesc': 'មើលទៅអ្នកមិនទាន់បានប្រើសេវានៅ “AutoHub” នៅឡើយទេ',
    'bk.confirmed': 'បានបញ្ជាក់', 'bk.completed': 'បានបញ្ចប់', 'bk.cancelled': 'បានលុបចោល',
    'bk.cancel': 'បោះបង់', 'bk.track': 'តាមដាន', 'bk.rebook': 'កក់ឡើងវិញ',
    'bk.cancelToast': 'បានបោះបង់ការកក់',
    'bk.successTitle': 'ការកក់បានបញ្ជាក់!', 'bk.successDesc': 'ការកក់របស់អ្នកត្រូវបានដាក់។ អ្នកអាចតាមដានបានគ្រប់ពេលនៅ ការកក់របស់ខ្ញុំ។',
    'bk.trackService': 'តាមដានសេវា', 'bk.viewBookings': 'មើលការកក់',
    // Track service
    'tr.title': 'តាមដានសេវា', 'tr.serviceType': 'ប្រភេទសេវា', 'tr.vehicle': 'រថយន្ត',
    'tr.mechanic': 'ជាងរថយន្ត', 'tr.arriving': 'មកដល់ក្នុង', 'tr.progress': 'ដំណើរការសេវា',
    'tr.accepted': 'បានទទួលសំណើ', 'tr.enroute': 'កំពុងធ្វើដំណើរទៅទីតាំង',
    'tr.arrived': 'មកដល់ទីតាំង', 'tr.inprogress': 'កំពុងធ្វើសេវា', 'tr.pending': 'កំពុងរង់ចាំ',
    'tr.chatSoon': 'ឆាត — នឹងមានឆាប់ៗ', 'tr.callMechanic': 'កំពុងហៅ',

    // Authentication (mock UI only)
    'au.title': 'ចាប់ផ្ដើមប្រើ', 'au.welcome': 'សូមស្វាគមន៍មកកាន់ AutoHub! យើងរីករាយដែលមានអ្នក។',
    'au.google': 'បន្តជាមួយ Google', 'au.facebook': 'បន្តជាមួយ Facebook', 'au.apple': 'បន្តជាមួយ Apple',
    'au.or': 'ឬ', 'au.signIn': 'ចូលគណនី', 'au.noAccount': 'មិនទាន់មានគណនី?', 'au.createNow': 'បង្កើតឥឡូវ!',
    'au.forgot': 'ភ្លេចពាក្យសម្ងាត់?', 'au.email': 'អ៊ីមែល', 'au.emailPh': 'បញ្ចូលអ៊ីមែលរបស់អ្នក',
    'au.password': 'ពាក្យសម្ងាត់', 'au.passwordPh': 'បញ្ចូលពាក្យសម្ងាត់',
    'au.signinTitle': 'ចូលគណនី AutoHub', 'au.signinDesc': 'បញ្ចូលព័ត៌មានរបស់អ្នកដើម្បីបន្ត។',
    'au.resetTitle': 'កំណត់ពាក្យសម្ងាត់ឡើងវិញ',
    'au.resetDesc': 'សូមបញ្ចូលអ៊ីមែលរបស់អ្នក យើងនឹងផ្ញើតំណភ្ជាប់ដើម្បីកំណត់ពាក្យសម្ងាត់ឡើងវិញ។',
    'au.continue': 'បន្ត',
    'au.confirmPw': 'បញ្ជាក់ពាក្យសម្ងាត់',
    'au.signupTitle': 'បង្កើតគណនីរបស់អ្នក', 'au.signupDesc': 'ចុះឈ្មោះដោយប្រើអ៊ីមែលរបស់អ្នកដើម្បីចាប់ផ្ដើម។',
    'au.resetSentTitle': 'សូមពិនិត្យអ៊ីមែលរបស់អ្នក', 'au.resetSentDesc': 'យើងបានផ្ញើតំណភ្ជាប់សម្រាប់កំណត់ពាក្យសម្ងាត់ឡើងវិញទៅអ៊ីមែលរបស់អ្នក។',
    'au.backToLogin': 'ត្រឡប់ទៅចូលគណនី',
    'au.needCreds': 'សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់', 'au.needEmail': 'សូមបញ្ចូលអ៊ីមែលរបស់អ្នក',
    'au.err.invalidEmail': 'អ៊ីមែលនេះមើលទៅមិនត្រឹមត្រូវទេ។',
    'au.err.userNotFound': 'រកមិនឃើញគណនីជាមួយអ៊ីមែលនេះទេ។',
    'au.err.wrongPassword': 'អ៊ីមែល ឬពាក្យសម្ងាត់មិនត្រឹមត្រូវ។',
    'au.err.emailInUse': 'អ៊ីមែលនេះបានចុះឈ្មោះរួចហើយ — សូមព្យាយាមចូលគណនីវិញ។',
    'au.err.weakPassword': 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច ៦ តួអក្សរ។',
    'au.err.tooMany': 'ព្យាយាមច្រើនដងពេក — សូមព្យាយាមម្តងទៀតពេលក្រោយ។',
    'au.err.popupClosed': 'ការចូលគណនីត្រូវបានលុបចោល។',
    'au.err.pwMismatch': 'ពាក្យសម្ងាត់មិនត្រូវគ្នាទេ។',
    'au.err.generic': 'មានបញ្ហាកើតឡើង — សូមព្យាយាមម្តងទៀត។',
    'au.signedIn': 'ចូលគណនីបានជោគជ័យ', 'au.pwReset': 'កំណត់ពាក្យសម្ងាត់ — នឹងមានឆាប់ៗ',

    // Search
    'se.title': 'ស្វែងរក', 'se.placeholder': 'ស្វែងរកសេវា ហាង ឬទីតាំង',
    'se.categories': 'ស្វែងរកតាមប្រភេទ', 'se.results': 'លទ្ធផល', 'se.result': 'លទ្ធផល',
    'se.emptyTitle': 'រកមិនឃើញលទ្ធផល', 'se.emptyDesc': 'សាកល្បងពាក្យផ្សេង ឬស្វែងរកតាមប្រភេទខាងលើ។',
    'se.startTitle': 'ស្វែងរកអ្វីៗ', 'se.startDesc': 'ស្វែងរកតាមឈ្មោះហាង ប្រភេទសេវា ឬតំបន់។',

    // Location
    'lo.permTitle': 'ទីតាំងរបស់អ្នកនៅឯណា?', 'lo.permDesc': 'យើងត្រូវការទីតាំងរបស់អ្នក ដើម្បីបង្ហាញសេវានៅជិត។',
    'lo.allow': 'អនុញ្ញាត', 'lo.manual': 'បញ្ចូលទីតាំងដោយដៃ',
    'lo.pickPlaceholder': 'ស្វែងរកទីតាំងរបស់អ្នក', 'lo.useCurrent': 'ប្រើទីតាំងបច្ចុប្បន្នរបស់ខ្ញុំ',
    'lo.nearby': 'ទីតាំងនៅជិតអ្នក', 'lo.updated': 'បានធ្វើបច្ចុប្បន្នភាពទីតាំង', 'lo.detecting': 'កំពុងរកទីតាំងរបស់អ្នក…',

    // Become a Partner (garage owner — mock UI)
    'pn.banner': 'មានហ្គារ៉ាស?', 'pn.bannerSub': 'ចុះឈ្មោះលើ AutoHub ដើម្បីទទួលអតិថិជនច្រើន',
    'pn.title': 'ក្លាយជាដៃគូ', 'pn.heroTitle': 'ពង្រីកហ្គារ៉ាសរបស់អ្នកជាមួយ AutoHub',
    'pn.heroDesc': 'ទៅដល់អ្នកបើកបររាប់ពាន់នាក់នៅជិត ទទួលការកក់ច្រើន និងគ្រប់គ្រងហាងបានងាយ។',
    'pn.benefit1': 'ទៅដល់អតិថិជននៅជិត', 'pn.benefit2': 'ទទួលការកក់ និងការហៅ', 'pn.benefit3': 'គ្រប់គ្រងហាងបានងាយ',
    'pn.getStarted': 'ចុះឈ្មោះហ្គារ៉ាសរបស់ខ្ញុំ',
    'pn.formTitle': 'ចុះឈ្មោះហ្គារ៉ាសរបស់អ្នក',
    'pn.photos': 'រូបថតហ្គារ៉ាស', 'pn.photosHint': 'បន្ថែមរហូតដល់ ៥ រូប', 'pn.addPhoto': 'បន្ថែមរូប',
    'pn.name': 'ឈ្មោះហ្គារ៉ាស', 'pn.namePh': 'ឧ. Premium Auto Care',
    'pn.category': 'ប្រភេទ', 'pn.address': 'អាសយដ្ឋាន', 'pn.addressPh': 'ផ្លូវ តំបន់ ក្រុង',
    'pn.phone': 'លេខទូរស័ព្ទ', 'pn.phonePh': 'ឧ. +855 12 345 678',
    'pn.hours': 'ម៉ោងបើក', 'pn.hoursPh': 'ឧ. ចន្ទ–អាទិត្យ · 7AM – 8PM',
    'pn.services': 'សេវាកម្មដែលផ្ដល់', 'pn.desc': 'ការពិពណ៌នា', 'pn.descPh': 'ប្រាប់អតិថិជនអំពីហ្គារ៉ាសរបស់អ្នក…',
    'pn.submit': 'ដាក់ស្នើ',
    'pn.successTitle': 'បានដាក់ស្នើ!', 'pn.successDesc': 'ក្រុមការងារយើងនឹងពិនិត្យហ្គារ៉ាសរបស់អ្នកក្នុង ២៤ម៉ោង ហើយទាក់ទងអ្នក។',
    'pn.needName': 'សូមបញ្ចូលឈ្មោះ និងលេខទូរស័ព្ទហ្គារ៉ាស', 'pn.photoAdded': 'បានបន្ថែមរូប (សាកល្បង)', 'pn.done': 'រួចរាល់',

    // Profile
    'pf.title': 'គណនី', 'pf.vehicle': 'រថយន្តរបស់ខ្ញុំ', 'pf.add': 'បន្ថែម',
    'pf.settings': 'ការកំណត់', 'pf.activity': 'សកម្មភាព និងប្រវត្តិ',
    'pf.locations': 'ទីតាំងបានរក្សាទុក', 'pf.places': 'កន្លែង',
    'pf.language': 'ភាសា', 'pf.notifications': 'ការជូនដំណឹង', 'pf.on': 'បើក', 'pf.off': 'បិទ',
    'pf.help': 'ជំនួយ និងគាំទ្រ', 'pf.settingsItem': 'ការកំណត់', 'pf.logout': 'ចាកចេញ',
    'pf.version': 'AutoHub · v1.0.0 · ការបើកបររបស់អ្នក ការថែទាំរបស់យើង',
    'pf.langName': 'ខ្មែរ',

    // Notifications
    'ntf.markAllRead': 'សម្គាល់ថាបានអានទាំងអស់',
    'ntf.n1.t': 'បានបញ្ជាក់ការកក់', 'ntf.n1.d': 'សេវាហ្វ្រាំង (Brake Service) របស់អ្នកជាមួយ AutoHub Partner Garage ត្រូវបានបញ្ជាក់សម្រាប់ថ្ងៃទី ២៥ មិថុនា។',
    'ntf.n2.t': 'ជាងកំពុងធ្វើដំណើរមក', 'ntf.n2.d': 'ជាងជួសជុលរបស់អ្នកកំពុងធ្វើដំណើរមក — នឹងមកដល់ក្នុងរយៈពេលប្រហែល ៥ នាទី។',
    'ntf.n3.t': 'ប្រូម៉ូសិនកំណត់ពេល', 'ntf.n3.d': 'បញ្ចុះតម្លៃ ២០% សម្រាប់ Full Detailing សប្តាហ៍នេះតែប៉ុណ្ណោះ។',
    'ntf.n4.t': 'រំលឹកសេវាកម្ម', 'ntf.n4.d': 'ជិតដល់ពេលប្តូរប្រេងម៉ាស៊ីនសម្រាប់ Toyota Highlander របស់អ្នកហើយ។',
    'ntf.n5.t': 'បានបញ្ចប់ការកក់', 'ntf.n5.d': 'សេវា Full Detailing របស់អ្នករួចរាល់ហើយ — សូមវាយតម្លៃបទពិសោធន៍!',
    'ntf.time.10m': '១០ នាទីមុន', 'ntf.time.1h': '១ ម៉ោងមុន', 'ntf.time.3h': '៣ ម៉ោងមុន',
    'ntf.time.1d': 'ម្សិលមិញ', 'ntf.time.2d': '២ ថ្ងៃមុន',

    // Saved locations
    'loc.home': 'ផ្ទះ', 'loc.work': 'កន្លែងធ្វើការ', 'loc.other': 'ផ្សេងទៀត',
    'loc.addNew': 'បន្ថែមទីតាំង', 'loc.pickToAdd': 'ជ្រើសរើសកន្លែងខាងក្រោមដើម្បីរក្សាទុក',
    'loc.added': 'បានរក្សាទុកទីតាំង',

    // Chat (mock — Track Service)
    'chat.placeholder': 'វាយសារ...',
    'chat.seed1': 'សួស្តី! ខ្ញុំកំពុងធ្វើដំណើរទៅកាន់ទីតាំងរបស់អ្នកឥឡូវនេះ។',
    'chat.autoReply': 'ទទួលបានហើយ អរគុណ!ជួបគ្នាឆាប់ៗនេះ។',

    // Toasts / coming soon
    't.soon': 'នឹងមានឆាប់ៗ', 't.searchSoon': 'ការស្វែងរកនឹងមានឆាប់ៗ',
    't.addedFav': 'បានបន្ថែមទៅចូលចិត្ត', 't.removedFav': 'បានដកចេញពីចូលចិត្ត',
    't.calling': 'កំពុងហៅ', 't.directions': 'កំពុងបើកផ្លូវទៅ',
    't.noNotif': 'គ្មានការជូនដំណឹងថ្មី', 't.requestSoon': 'ស្នើសុំសេវា — នឹងមានឆាប់ៗ',
    't.shareSoon': 'ចែករំលែក — នឹងមានឆាប់ៗ', 't.editSoon': 'កែគណនី — នឹងមានឆាប់ៗ',
    't.locSoon': 'ទីតាំងបានរក្សាទុក — នឹងមានឆាប់ៗ', 't.notifSoon': 'ការជូនដំណឹង — នឹងមានឆាប់ៗ',
    't.helpSoon': 'ជំនួយ និងគាំទ្រ — នឹងមានឆាប់ៗ', 't.settingsSoon': 'ការកំណត់ — នឹងមានឆាប់ៗ',
    't.vehicleSoon': 'បន្ថែមរថយន្ត — នឹងមានឆាប់ៗ', 't.promoSoon': 'ប្រូម៉ូសិន — នឹងមានឆាប់ៗ',
    't.langSwitched': 'បានប្ដូរទៅភាសាខ្មែរ',
  },
};

// Translate helper — falls back to English, then to the key itself.
function t(key) {
  const lang = (typeof App !== 'undefined' && App.state && App.state.lang) ? App.state.lang : 'en';
  return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
}

// Translate a provider/category display name.
function catLabel(cat) { return t('catName.' + cat); }
