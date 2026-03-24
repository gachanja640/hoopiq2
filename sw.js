const CACHE = 'hoopiq-v1';
const SHELL = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.anthropic.com')) { e.respondWith(fetch(e.request)); return; }
  e.respondWith(caches.match(e.request).then(cached => {
    if (cached) return cached;
    return fetch(e.request).then(res => {
      if (res && res.status === 200) { var clone = res.clone(); caches.open(CACHE).then(c => c.put(e.request, clone)); }
      return res;
    }).catch(() => caches.match('./index.html'));
  }));
});
self.addEventListener('push', e => {
  var d = {}; try { d = e.data.json(); } catch(err) { d = { title: 'HoopIQ', body: 'New basketball insights ready.' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'HoopIQ', { body: d.body, icon: './icon-192.png', badge: './icon-192.png', tag: 'hoopiq-daily' }));
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window' }).then(list => list.length ? list[0].focus() : clients.openWindow('./')));
});
