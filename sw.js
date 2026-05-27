const CACHE_NAME = "portfolio-v0.1";

// arquivos essenciais (app shell)
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./css-minificado.css",
  "./main-minificado.js",
  "./manifest.json",

  // ícones PWA
  "./src/imagens/APP-192.png",
  "./src/imagens/APP-512.png",

  // imagens realmente usadas na UI
  "./src/imagens/perfil.webp",
  "./src/imagens/praia-oculos.webp",
];

// INSTALL → garante offline base
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
});

// ACTIVATE
self.addEventListener("activate", (event) => {
  self.clients.claim();
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
    )
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // apenas GET
  if (req.method !== "GET") return;

  // apenas mesma origem
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      return (
        cached ||
        fetch(req).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }

          const clone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, clone);
          });

          return response;
        })
      );
    })
  );
});

/*
  OBS: Eu não configurei essa parte do SW.js sozinho, usei IA + pesquisas na internet
*/