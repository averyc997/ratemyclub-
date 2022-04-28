// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
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


/*
const database = firebase.database().ref().child('reviews');

export const Push = () => {
    database.ref("review").set({
      stars : stars,
      tags : tags,
      descrip : descrip,
      likes : likes,
      dislikes : dislikes,
    }).catch(alert);
}
*/
export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const db = getDatabase(app)
