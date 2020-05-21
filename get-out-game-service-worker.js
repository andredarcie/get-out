importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
  )
  
  workbox.core.setCacheNameDetails({ prefix: 'get-out-game-cache-v1' })
  
  workbox.precaching.suppressWarnings()
  workbox.precaching.precacheAndRoute([
  {
    "url": "camp.2289b279.jpg",
    "revision": "a47d34422e8940a081c35d0c8fe50731"
  },
  {
    "url": "forest.37cdeff2.jpg",
    "revision": "0ff432442d02bcbcf4125853cb54d9d2"
  },
  {
    "url": "house.84ab4454.jpg",
    "revision": "8686e1976a24ec1c8692d9343c6b4256"
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
    "revision": "ba63497fde6666234e5d8166c51ff238"
  },
  {
    "url": "normalize.458d1ead.css",
    "revision": "a3e6ec9214680b9ca6634914d899ef02"
  },
  {
    "url": "src.a160d3a0.js",
    "revision": "db28f8ff3f328c8419191ed7a7a8e52b"
  },
  {
    "url": "style.ddedc358.css",
    "revision": "92319095c0e236b63b0a7620737d2fc0"
  },
  {
    "url": "TravelingTypewriter.1ec4c246.ttf",
    "revision": "1085a2aee20a01157165e248f7823a22"
  },
  {
    "url": "/",
    "revision": "ed53cbfb9d287aa679c7833a821ff51d"
  }
])
  
  // workbox.routing.registerNavigationRoute('/index.html', {
  //   whitelist: [/\/(vowels|numbers|about|search|char\/)/],
  // })
  workbox.routing.registerNavigationRoute('/index.html')
  
  self.addEventListener('message', event => {
    if (!event.data) return
    switch (event.data) {
      case 'skipWaiting':
        self.skipWaiting()
        break
      default:
        break
    }
  })