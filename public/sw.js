const CACHE_NAME = 'smart-tools-v1.0.5';

const urlsToCache = [
  '/',
  '/age-calculator',
  '/area-calculator',
  '/bmi-calculator',
  '/currency-converter',
  '/dob-calculator',
  '/emi-calculator',
  '/goal-tracker',
  '/gst-calculator',
  '/image-tools',
  '/percentage-calculator',
  '/qr-code-generator',
  '/tip-calculator',
  '/todo-list',
  '/timers-tools',
  '/timezone-converter',
  '/unit-converter',
  '/favicon.svg',
  '/manifest.json',
];

// ✅ Install
self.addEventListener('install', event => {
  console.log('[SW] Install:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
  );
  self.skipWaiting(); // immediately activate
});

// ✅ Activate
self.addEventListener('activate', event => {
  console.log('[SW] Activate: Cleaning old caches...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting:', key);
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
  self.clients.claim(); // control all open tabs
});

// ✅ Fetch with Network Fallback + Cache
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      return (
        cached ||
        fetch(event.request).then(response => {
          // Optionally cache new request
          return response;
        })
      );
    }),
  );
});

// ✅ Push Notifications
self.addEventListener('push', event => {
  const title = 'Smart Tools - Professional Calculator Suite';
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [200, 100, 200],
    data: {
      url: '/',
      timestamp: Date.now(),
    },
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/favicon.svg',
      },
      {
        action: 'close',
        title: 'Dismiss',
        icon: '/favicon.svg',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// ✅ Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'open') {
    event.waitUntil(clients.openWindow('/'));
  }
});
