// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";

const firebaseConfig = {
   /* apiKey: "AIzaSyDNdU2ys5fAFOx87qVEJETcCKcRF39TSx8",
    authDomain: "rate-my-club.firebaseapp.com",
    projectId: "rate-my-club",
    storageBucket: "rate-my-club.appspot.com",
    messagingSenderId: "730651835734",
    appId: "1:730651835734:web:45c483aa330561941eeaf7",
    measurementId: "G-VNB81873GL"
    */
    apiKey: "AIzaSyCfWzR3uDcCkqxTJsRaIPRNWNNse9YqO_Y",
    authDomain: "ratemyclubunc.firebaseapp.com",
    projectId: "ratemyclubunc",
    storageBucket: "ratemyclubunc.appspot.com",
    messagingSenderId: "176628440389",
    appId: "1:176628440389:web:02c51b9098f50601aa722c",
    measurementId: "G-MGN580GLKF"
      
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}