// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "househaven-1a57b.firebaseapp.com",
  projectId: "househaven-1a57b",
  storageBucket: "househaven-1a57b.appspot.com",
  messagingSenderId: "724245486062",
  appId: "1:724245486062:web:76bc399efc104e39bf56ff"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); 