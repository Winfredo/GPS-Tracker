
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5pueHHZ38mr23DV2Abh1hfnbEJ6HCOAU",
  authDomain: "gps-tracker-405d9.firebaseapp.com",
  projectId: "gps-tracker-405d9",
  storageBucket: "gps-tracker-405d9.firebasestorage.app",
  messagingSenderId: "906549305989",
  appId: "1:906549305989:web:a606cd9f73af9ba0c93fec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);