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
    "url": "girl.f844d34c.jpg",
    "revision": "3e04c4f87f36025235d1c92fef0e26a4"
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
    "revision": "13a8a4fde641474269fb271ae6432178"
  },
  {
    "url": "kid.4c5d2dd8.jpg",
    "revision": "998226c46c058ea5cba08e2c97d7ea04"
  },
  {
    "url": "man.071b7a93.jpg",
    "revision": "f85ecc7334f2b9c029ee86986e92fa24"
  },
  {
    "url": "normalize.458d1ead.css",
    "revision": "a3e6ec9214680b9ca6634914d899ef02"
  },
  {
    "url": "src.9eece1bd.js",
    "revision": "82d3ed65c12f202c782e178e14fdfc5e"
  },
  {
    "url": "style.23fe61f8.css",
    "revision": "e688c3c95e4cb020b8945875beb6eb32"
  },
  {
    "url": "woman.d20d4f2a.jpg",
    "revision": "834ff52d317420ec54e6066591c25446"
  },
  {
    "url": "/",
    "revision": "2c96dd0e46ae2b36f21f83003980065e"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL(".//index.html"));
