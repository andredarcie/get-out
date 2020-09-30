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
    "url": "camp.2289b279.jpg",
    "revision": "a47d34422e8940a081c35d0c8fe50731"
  },
  {
    "url": "forest.37cdeff2.jpg",
    "revision": "0ff432442d02bcbcf4125853cb54d9d2"
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
    "revision": "d558d6c8a60d61f91694cd655b78a219"
  },
  {
    "url": "normalize.458d1ead.css",
    "revision": "a3e6ec9214680b9ca6634914d899ef02"
  },
  {
    "url": "src.13d4483d.js",
    "revision": "ae9826e832e9eadfeda98fb47f708ceb"
  },
  {
    "url": "style.590ac821.css",
    "revision": "b4484cfca7e8c520a80cf5a93ee9301d"
  },
  {
    "url": "/",
    "revision": "ab3d221189bcea84b5fb21a5c68ce71b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL(".//index.html"));
