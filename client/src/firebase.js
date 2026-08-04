// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-e-statemern.firebaseapp.com",
  projectId: "real-e-statemern",
  storageBucket: "real-e-statemern.firebasestorage.app",
  messagingSenderId: "650035155769",
  appId: "1:650035155769:web:dae4a4bae558a43d814ee8",
  measurementId: "G-6LPWJ62N1Y"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);