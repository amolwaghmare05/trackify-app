// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  projectId: "trackify-pz30w",
  appId: "1:9874083676:web:0d938ca36b38c43f557b99",
  storageBucket: "trackify-pz30w.firebasestorage.app",
  apiKey: "AIzaSyAWayj8rKGm55psjiE8hGI7c7hJ4Hr4pI8",
  authDomain: "trackify-pz30w.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "9874083676",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
