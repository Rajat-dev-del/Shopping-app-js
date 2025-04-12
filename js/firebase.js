// firebase.js

// Import specific Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase config object
const firebaseConfig = {
    apiKey: "AIzaSyAnKgs_gRhclY3EohsINiat9myDxIedQ4E",
    authDomain: "ecommerce-js-eef28.firebaseapp.com",
    projectId: "ecommerce-js-eef28",
    storageBucket: "ecommerce-js-eef28.firebasestorage.app",
    messagingSenderId: "74845304399",
    appId: "1:74845304399:web:cb26ed858ddd2e46681c3a",
    measurementId: "G-FQ234XWLGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services for use in other files
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, addDoc, collection };
