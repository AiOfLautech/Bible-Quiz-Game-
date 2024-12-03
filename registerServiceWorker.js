---

### **11. Running the Game Offline (Service Workers)**

The service worker file (`service-worker.js`) will cache your assets for offline use. It's important that the `service-worker.js` file is correctly registered to ensure offline functionality. You can add a `registerServiceWorker.js` file to handle service worker registration.

**`registerServiceWorker.js`**:


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('Service Worker registration failed: ', error);
      });
  });
}
