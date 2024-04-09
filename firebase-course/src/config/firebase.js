// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEHDHXCZcJuNOwZdeIRK0WxhNm51QPW8U",
  authDomain: "fir-course-bfaf3.firebaseapp.com",
  projectId: "fir-course-bfaf3",
  storageBucket: "fir-course-bfaf3.appspot.com",
  messagingSenderId: "63505290352",
  appId: "1:63505290352:web:4e32098952ebdc1925d0b5",
  measurementId: "G-0SF8P1W9E8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)
export const storage = getStorage(app)
