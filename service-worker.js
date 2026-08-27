/**
 * NivxBoost Progressive Web App (PWA) Service Worker
 * v5.0.2 - Instant Responsive Buttons & Mobile Precision Layout
 */

const CACHE_NAME = 'nivxboost-pwa-v5.0.2';

// Only cache static assets (CSS, JS, icons) — NOT HTML pages
// HTML pages (index.html, login.html) are always fetched fresh from network
// so that auth changes take effect immediately in the installed PWA
const ASSETS_TO_CACHE = [
  './styles.css',
  './app.js',
  './manifest.json',
  './icon.svg'
];

// Pages that must ALWAYS be served fresh (never from cache)
const ALWAYS_FRESH = [
  '/Nivxboost/',
  '/Nivxboost/index.html',
  '/Nivxboost/login.html',
  '/',
  '/index.html',
  '/login.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const path = url.pathname;

  // Always pass network-only requests through
  if (
    url.href.includes('speed.cloudflare.com') ||
    url.href.includes('dns-query') ||
    url.href.includes('generate_204') ||
    url.href.includes('tile.openstreetmap.org') ||
    url.href.includes('googleapis.com') ||
    url.href.includes('accounts.google.com')
  ) {
    return;
  }

  // HTML pages: ALWAYS fetch fresh from network, fall back to cache if offline
  const isHtmlPage = ALWAYS_FRESH.some(p => path === p || path.endsWith('.html'));
  if (event.request.mode === 'navigate' || isHtmlPage) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Offline fallback
        return caches.match('./login.html') || caches.match('./index.html');
      })
    );
    return;
  }

  // Static assets: cache-first strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        // Cache new static assets on the fly
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return networkResponse;
      }).catch(() => undefined);
    })
  );
});
