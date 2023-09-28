navigator.serviceWorker.ready.then(function (registration) {
    self.registration.showNotification('Notification with ServiceWorker');
});
