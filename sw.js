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
    "url": "audio/button1.wav",
    "revision": "779604989b40d105025f206a27370f6c"
  },
  {
    "url": "audio/dice.mp3",
    "revision": "c902feb245d694876a33f9a6a0c2a37a"
  },
  {
    "url": "audio/ding.wav",
    "revision": "ff189adb8bd44a2eeaedc7b83e09d6ae"
  },
  {
    "url": "audio/fail.mp3",
    "revision": "5acd1a089942ad6d903b600a76ef063c"
  },
  {
    "url": "audio/rain.mp3",
    "revision": "963bd84bd1b05b07f476aee29e0bcd26"
  },
  {
    "url": "audio/success.wav",
    "revision": "619655f9a6327ed52257af4daa081468"
  },
  {
    "url": "audio/take-item.wav",
    "revision": "78b1298d7bd49ae81f2ffe399b795349"
  },
  {
    "url": "audio/throw.wav",
    "revision": "3e6c61d3ebe82d9e95a2a284b94c4369"
  },
  {
    "url": "audio/walk.mpeg",
    "revision": "78172c41a3bc966fcf0ebf8c9d039929"
  },
  {
    "url": "audio/write.wav",
    "revision": "fbb420e7ef763a2c9da908a99d103bde"
  },
  {
    "url": "camp.jpg",
    "revision": "a47d34422e8940a081c35d0c8fe50731"
  },
  {
    "url": "forest.37cdeff2.jpg",
    "revision": "0ff432442d02bcbcf4125853cb54d9d2"
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
    "url": "img/places/2.jpg",
    "revision": "ef18a8e162e940b76c33bbbe75c7adab"
  },
  {
    "url": "img/places/4.jpg",
    "revision": "514d3f2a5fb8fd9998486ded99ecf816"
  },
  {
    "url": "img/places/5.jpg",
    "revision": "423b7ef2d072a5cc5abd2c9beda4bc8d"
  },
  {
    "url": "img/places/6.jpg",
    "revision": "bec4b3e984e323172649addf293d5e84"
  },
  {
    "url": "img/places/7.jpg",
    "revision": "d8941adb0a020cbb58d44760477adda0"
  },
  {
    "url": "img/places/barn-abandoned-farm-homestead.jpg",
    "revision": "294915333664bb8cc15c760e7206c1e5"
  },
  {
    "url": "img/places/c.jpg",
    "revision": "294915333664bb8cc15c760e7206c1e5"
  },
  {
    "url": "img/places/ferris-wheel.jpg",
    "revision": "c6ab5004accccfd0d3bb04a43ae81fa7"
  },
  {
    "url": "img/places/forest-fog.jpg",
    "revision": "fcf0fa9b6201d91c89cb4033776ec761"
  },
  {
    "url": "img/places/geyser.jpg",
    "revision": "e4e01b8e9dc8ff192bb6b680266f0c09"
  },
  {
    "url": "img/places/milestone.jpg",
    "revision": "47f194cb73e50b61bcc32001d349f831"
  },
  {
    "url": "img/places/theme-park.jpg",
    "revision": "36eb4c33c285330518860f68bb0e2b16"
  },
  {
    "url": "index.html",
    "revision": "1366236fd750a26bbfd67ef1e58ef555"
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
    "url": "src.f4f9af94.js",
    "revision": "9c0c4df7579779d7b5c1c9069cd51568"
  },
  {
    "url": "style.52d4a984.css",
    "revision": "27f66d1837608ba78d10ffe64fffb5f5"
  },
  {
    "url": "TravelingTypewriter.1ec4c246.ttf",
    "revision": "1085a2aee20a01157165e248f7823a22"
  },
  {
    "url": "woman.d20d4f2a.jpg",
    "revision": "834ff52d317420ec54e6066591c25446"
  },
  {
    "url": "/",
    "revision": "c1902fb69989bfd6a6872da6a72807cb"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute(workbox.precaching.getCacheKeyForURL(".//index.html"));
