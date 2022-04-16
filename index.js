// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNdU2ys5fAFOx87qVEJETcCKcRF39TSx8",
  authDomain: "rate-my-club.firebaseapp.com",
  projectId: "rate-my-club",
  storageBucket: "rate-my-club.appspot.com",
  messagingSenderId: "730651835734",
  appId: "1:730651835734:web:45c483aa330561941eeaf7",
  measurementId: "G-VNB81873GL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);