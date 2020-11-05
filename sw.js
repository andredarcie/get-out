/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v4.3.1/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v4.3.1"});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "1.4f022b7a.jpg",
    "revision": "29d1ad4532617e122e2f53b09b75fbb1"
  },
  {
    "url": "2.a2c87685.jpg",
    "revision": "ef18a8e162e940b76c33bbbe75c7adab"
  },
  {
    "url": "3.332a3909.jpg",
    "revision": "e1e1e4b00e6459d244a6068b681b9bd6"
  },
  {
    "url": "4.88fbf1a9.jpg",
    "revision": "514d3f2a5fb8fd9998486ded99ecf816"
  },
  {
    "url": "5.92f49589.jpg",
    "revision": "423b7ef2d072a5cc5abd2c9beda4bc8d"
  },
  {
    "url": "6.28c06797.jpg",
    "revision": "bec4b3e984e323172649addf293d5e84"
  },
  {
    "url": "7.c19e343f.jpg",
    "revision": "d8941adb0a020cbb58d44760477adda0"
  },
  {
    "url": "camp.2289b279.jpg",
    "revision": "a47d34422e8940a081c35d0c8fe50731"
  },
  {
    "url": "icon-128x128.8fad5fc0.png",
    "revision": "9ba208c19a6d23a9250880f35fd31f47"
  },
  {
    "url": "icon-144x144.a9e0ec4a.png",
    "revision": "255147a9bd0033284b5a29d94b860213"
  },
  {
    "url": "icon-152x152.a7faf067.png",
    "revision": "ef5db1b62691d2c5910098c0bfd0e8ef"
  },
  {
    "url": "icon-192x192.465e869b.png",
    "revision": "5e87ff8144a5cf29f6fe54f2e1f96016"
  },
  {
    "url": "icon-384x384.63c04a56.png",
    "revision": "d521fca1209dfe4d351c2ca0b3a37c72"
  },
  {
    "url": "icon-512x512.3d2d8e58.png",
    "revision": "7f495f9743c3e2ba396e4e049a475fcb"
  },
  {
    "url": "icon-72x72.2669970b.png",
    "revision": "57a7eb60e6130321079ec9ca73870ed4"
  },
  {
    "url": "icon-96x96.764c0a64.png",
    "revision": "d13bbec9f23fc92c49739cb22c81b66f"
  },
  {
    "url": "index.html",
    "revision": "8a5aea7f2bdb3aafcf1ef44203779faa"
  },
  {
    "url": "normalize.458d1ead.css",
    "revision": "a3e6ec9214680b9ca6634914d899ef02"
  },
  {
    "url": "src.e68f3384.js",
    "revision": "c748066bdaebeb2497f7aad61875b0f1"
  },
  {
    "url": "style.8095b8f6.css",
    "revision": "b8e8ad6221b63463f20b877da1d56f0e"
  },
  {
    "url": "/",
    "revision": "280d3ee50f52d53fde4e636af46628d6"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL(".//index.html"));
