self.addEventListener("install", e => {
	e.waitUntil(
		caches.open("static").then(cache => {
			return cache.addAll(["./", "./css/master.css", "./img/helpmee.png", "./img/helpmee.webP", "./img/aerial2.webP", "./offline.html", "./views/privacy-policy.php", "./views/terms.php", "./views/about.php", "https://fonts.googleapis.com/icon?family=Material+Icons"]);
		})
	);
});

self.addEventListener("fetch", e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		}).catch( () => {
			return caches.match('./offline.html');
		})
	);
});

self.addEventListener("fetch", e => {
	e.respondWith(
		fetch(e.request).then(function(response){
			return response.headers.set('Refresh', '0');
		})
	);
	
});