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