import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBS18YyOrvaWBLNn9p0tJ4Ff4h3AAVHoOU",
  authDomain: "nodeserver-1f207.firebaseapp.com",
  projectId: "nodeserver-1f207",
  storageBucket: "nodeserver-1f207.firebasestorage.app",
  messagingSenderId: "547647090212",
  appId: "1:547647090212:web:15306dad374df84ccd72b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
