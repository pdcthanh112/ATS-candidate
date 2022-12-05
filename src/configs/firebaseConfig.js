// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCkoPCp9nfBwtr_Ocvpsd7F51IZxOvEt-g",
  authDomain: "ats-storage-44e44.firebaseapp.com",
  projectId: "ats-storage-44e44",
  storageBucket: "ats-storage-44e44.appspot.com",
  messagingSenderId: "568976035447",
  appId: "1:568976035447:web:8671bf01d9df2775ae4072",
  measurementId: "G-WCJMKVER8N"
  // apiKey: "AIzaSyCCSGSqImLjSlh9AE1v2V4IgaSUL5gCDq4",
  // authDomain: "sign-in-ce093.firebaseapp.com",
  // projectId: "sign-in-ce093",
  // storageBucket: "sign-in-ce093.appspot.com",
  // messagingSenderId: "664836381610",
  // appId: "1:664836381610:web:acbd444875c7c628dc29d3",
};
const firebaseAuthConfig = {
  apiKey: "AIzaSyCCSGSqImLjSlh9AE1v2V4IgaSUL5gCDq4",
  authDomain: "sign-in-ce093.firebaseapp.com",
  projectId: "sign-in-ce093",
  storageBucket: "sign-in-ce093.appspot.com",
  messagingSenderId: "664836381610",
  appId: "1:664836381610:web:acbd444875c7c628dc29d3",

};

// Initialize Firebase
const app = initializeApp(firebaseConfig, 'primary');
const appAuth = initializeApp(firebaseAuthConfig, 'secondary');
export const storage = getStorage(app);
export const auth = getAuth(appAuth);
