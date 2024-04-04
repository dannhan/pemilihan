// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBldJF3iaB50fygzf0h9J-HJAjVLem3IGE",
  authDomain: "pemilihan-omega.firebaseapp.com",
  projectId: "pemilihan-omega",
  storageBucket: "pemilihan-omega.appspot.com",
  messagingSenderId: "606654216825",
  appId: "1:606654216825:web:ea021899a67942d0cff2a8",
  measurementId: "G-9TF1WBQLWE",
};

// Initialize Firebase
export const firebaseApp = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseFirestore = getFirestore(firebaseApp);
