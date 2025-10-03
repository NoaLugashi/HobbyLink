// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBr0BDnRpXUQ2eYQyHmDT173FWEGV101II",
    authDomain: "hobbylink-895ea.firebaseapp.com",
    databaseURL: "https://hobbylink-895ea-default-rtdb.firebaseio.com",
    projectId: "hobbylink-895ea",
    storageBucket: "hobbylink-895ea.firebasestorage.app",
    messagingSenderId: "290498820119",
    appId: "1:290498820119:web:a879bedc42bdb3ada04452",
    measurementId: "G-23Q86MW3G9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
const database = getDatabase(app);
const auth = getAuth(app);
export { auth };
export default database;
