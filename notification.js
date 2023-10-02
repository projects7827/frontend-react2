import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyDkeQhIjKjXl6ruJwZ3lOG0LwSa5-T9qLs",
    authDomain: "prateek-5bd13.firebaseapp.com",
    projectId: "prateek-5bd13",
    storageBucket: "prateek-5bd13.appspot.com",
    messagingSenderId: "550542718433",
    appId: "1:550542718433:web:1d980152172f1ba987cea0",
    measurementId: "G-4CHHHCPN48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app }
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const message = getMessaging(app);

getToken(message, { vapidKey: 'BKg-GBUo80Qroeqgvb6wNnH3gMwNF1u4nGoJFvCIp5iZRLq6FgVSXUCYoF6IWhpOavBqlK1c5Kf2TOYA2piMYWU' }).then((currentToken) => {
    if (currentToken) {
        console.log(currentToken)
        // Send the token to your server and update the UI if necessary
        // ...
    } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
    }
}).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
});
onMessage(message, (payload) => {
    if (window.innerWidth > 900) {
        let notification = new Notification("title", { "body": "hello" })
        notification.onclick = (e) => {
            window.location.href = e.notification.url
        }
        console.log('Message received. ', payload);
    }


    // Update the UI to include the received message.
});
