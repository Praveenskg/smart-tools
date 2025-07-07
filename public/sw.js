const CACHE_NAME = 'smart-tools-v1.0.2';

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
  '/timezone-converter',
  '/unit-converter',
  '/favicon.svg',
  '/manifest.json',
];

self.addEventListener('install', event => {
  console.log('[SW] Installing new version:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activating and cleaning old caches...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        }),
      ),
    ),
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    }),
  );
});

// Push notification
self.addEventListener('push', event => {
  const options = {
    body: event.data
      ? event.data.text()
      : 'Smart Tools - New update available!',
    icon: '/favicon.svg',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: { dateOfArrival: Date.now(), primaryKey: 1 },
    actions: [
      { action: 'explore', title: 'Open App', icon: '/favicon.svg' },
      { action: 'close', title: 'Close', icon: '/favicon.svg' },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      'Smart Tools - Professional Calculator Suite',
      options,
    ),
  );
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(clients.openWindow('/'));
  }
});
