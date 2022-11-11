import { version } from '$service-worker';

const CACHE = `cache${version}`;

const IMAGE_CACHE_VER = '1659457045';
const IMAGE_CACHE = `cacheimg${IMAGE_CACHE_VER}`;

const IMAGE_URL = `${self.location.origin}/images/`;

self.addEventListener('install', () => {
	// @ts-ignore
	self.skipWaiting();
});

async function fetchAddCache(url) {
	try {
		const cache = await caches.open(CACHE);
		const cachedRes = await cache.match(url);

		if (cachedRes) return;

		const res = await fetch(url);
		if (res.ok) cache.put(url, res.clone());
	} catch (err) {
		console.error(err);
	}
}

self.addEventListener('activate', (event) => {
	// @ts-ignore
	event.waitUntil(
		caches.keys().then(async (keys) => {
			let needUpdate = false;
			// delete old caches
			for (const key of keys) {
				if (key !== CACHE && key !== IMAGE_CACHE) {
					await caches.delete(key);
					needUpdate = true;
				}
			}

			// @ts-ignore
			self.clients.claim();
			console.log('SW NEED UPDATE', needUpdate);

			fetchAddCache('/');
		})
	);
});

self.addEventListener('fetch', async (event) => {
	// @ts-ignore
	if (event.request.url.indexOf(self.location.origin) !== 0 || event.request.method !== 'GET')
		return;

	// @ts-ignore
	event.respondWith(
		(async () => {
			// @ts-ignore
			const cachePath = event.request.url.indexOf(IMAGE_URL) === 0 ? IMAGE_CACHE : CACHE;
			const cache = await caches.open(cachePath);
			// @ts-ignore
			const cachedRes = await cache.match(event.request);

			if (cachedRes) {
				return cachedRes;
			}

			// @ts-ignore
			const res = await fetch(event.request);
			// @ts-ignore
			if (res.ok) cache.put(event.request, res.clone());
			return res;
		})()
	);
});
