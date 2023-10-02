// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js");


// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyDkeQhIjKjXl6ruJwZ3lOG0LwSa5-T9qLs",
    authDomain: "prateek-5bd13.firebaseapp.com",
    projectId: "prateek-5bd13",
    storageBucket: "prateek-5bd13.appspot.com",
    messagingSenderId: "550542718433",
    appId: "1:550542718433:web:1d980152172f1ba987cea0",
    measurementId: "G-4CHHHCPN48"
};

firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();
let count = 0

messaging.onBackgroundMessage(function (payload) {
    count++;
    console.log("Received background message ", payload);
    const notificationTitle = 'pt';
    const notificationOptions = {
        body: "pt",
    };

    self.addEventListener("notificationclick", (event) => {
        event.notification.close();
        event.waitUntil(
            clients.openWindow("https://www.ockypocky.com/")
        )
    });
    self.registration.showNotification(notificationTitle, notificationOptions);

});