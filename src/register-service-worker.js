const BASE_CLASS = `pwa-refresh-ui`
const SW_PATH = `/get-out-game-service-worker.js`

export default function registerServiceWorker() {
  if (!(`serviceWorker` in navigator)) return
  window.addEventListener(`load`, () => {
    navigator.serviceWorker
      .register(SW_PATH)
      .then(onRegistration)
      .catch(error => console.log(`Can't register Service Worker`, error))
  })
}

function showRefreshUI(registration) {
  const refreshContainer = document.createElement(`div`)
  refreshContainer.classList.add(BASE_CLASS)

  const refreshText = document.createElement(`p`)
  refreshText.classList.add(`${BASE_CLASS}__text`)
  refreshText.textContent = `New version available`

  const dismissButton = document.createElement(`button`)
  dismissButton.classList.add(`${BASE_CLASS}__dismiss`)
  dismissButton.textContent = `dismiss`

  const refreshButton = document.createElement(`button`)
  refreshButton.classList.add(`${BASE_CLASS}__refresh`)
  refreshButton.textContent = `refresh`

  function removeRefreshUI() {
    refreshContainer.parentNode.removeChild(refreshContainer)
  }

  dismissButton.addEventListener(`click`, removeRefreshUI)

  refreshButton.addEventListener(`click`, () => {
    if (!registration.waiting) {
      // Just to ensure registration.waiting is available before
      // calling postMessage()
      return
    }
    // this will trigger the `controllerchange` event
    registration.waiting.postMessage(`skipWaiting`)
    removeRefreshUI()
  })

  refreshContainer.appendChild(refreshText)
  refreshContainer.appendChild(dismissButton)
  refreshContainer.appendChild(refreshButton)
  document.body.appendChild(refreshContainer)
}

// https://redfin.engineering/how-to-fix-the-refresh-button-when-using-service-workers-a8e27af6df68#06d3
function listenForWaitingServiceWorker(registration, callback) {
  function awaitStateChange() {
    registration.installing.addEventListener(`statechange`, function() {
      if (this.state === `installed`) callback(registration)
    })
  }

  if (!registration) return

  if (registration.waiting) return callback(registration)

  if (registration.installing) awaitStateChange()

  registration.addEventListener(`updatefound`, () => {
    awaitStateChange()
  })
}

function onRegistration(registration) {
  // Track updates to the Service Worker.
  if (!navigator.serviceWorker.controller) {
    // The window client isn't currently controlled…
    // …so it's a new service worker that will activate immediately
    return
  }

  // When the user asks to refresh the UI, we'll need to reload the window
  let preventDevToolsReloadLoop = false
  navigator.serviceWorker.addEventListener(`controllerchange`, event => {
    // Ensure refresh is only called once.
    // This works around a bug in "force update on reload".
    if (preventDevToolsReloadLoop) return
    preventDevToolsReloadLoop = true
    window.location.reload()
  })

  listenForWaitingServiceWorker(registration, showRefreshUI)
}