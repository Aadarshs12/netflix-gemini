// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Import the additional Firebase services you need
import { getAuth } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOfZab__ltbj96zbHmwwh5UWlxqq4QX3o",
  authDomain: "netflix-c53fb.firebaseapp.com",
  projectId: "netflix-c53fb",
  storageBucket: "netflix-c53fb.firebasestorage.app",
  messagingSenderId: "1093759204152",
  appId: "1:1093759204152:web:336689eaffcd4e611f5fcd",
  measurementId: "G-R01CRV39PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore services
const auth = getAuth(app);
const db = getFirestore(app);

// Export the initialized services to use elsewhere in your app
export { app, auth, db, analytics };
