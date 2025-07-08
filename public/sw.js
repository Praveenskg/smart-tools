const CACHE_NAME = 'smart-tools-v1.0.6';

const urlsToCache = [
  '/',
  '/manifest.json',
  '/favicon.svg',
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
];

self.addEventListener('install', event => {
  console.log('[SW] Install:', CACHE_NAME);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)),
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('[SW] Activate: Cleaning old caches...');
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
  if (event.request.method !== 'GET') return;

  const req = event.request;
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req)),
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(
      cached =>
        cached ||
        fetch(req).then(res => {
          if (
            req.url.startsWith(self.location.origin) &&
            /\.(js|css|woff2?|png|jpg|jpeg|svg|webp|ico)$/.test(req.url)
          ) {
            const resClone = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, resClone));
          }
          return res;
        }),
    ),
  );
});

// ✅ Push Notification handler
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
      { action: 'open', title: 'Open App', icon: '/favicon.svg' },
      { action: 'close', title: 'Dismiss', icon: '/favicon.svg' },
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

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
