// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-ede4f.firebaseapp.com",
  projectId: "mern-estate-ede4f",
  storageBucket: "mern-estate-ede4f.appspot.com",
  messagingSenderId: "963264998483",
  appId: "1:963264998483:web:3b6ee9f16da90862f7eaa6",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
