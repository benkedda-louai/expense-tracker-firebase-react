// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1Rg4dAJuti68aH_NvrIjOwJDjAjaZyLg",
  authDomain: "expense-tracker-955ea.firebaseapp.com",
  projectId: "expense-tracker-955ea",
  storageBucket: "expense-tracker-955ea.appspot.com",
  messagingSenderId: "768334905070",
  appId: "1:768334905070:web:c02edaf74323f86e1b3dff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(auth);
export const db = getFirestore(app);
//firebase login
//firebase init
//firebase deploy