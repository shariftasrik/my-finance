// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFZ8nwk1Z3HuJQnaXlC_XNfIFqAnO5_Zo",
  authDomain: "my-finance-155b9.firebaseapp.com",
  projectId: "my-finance-155b9",
  storageBucket: "my-finance-155b9.firebasestorage.app",
  messagingSenderId: "320350590743",
  appId: "1:320350590743:web:29da3637bd63c0564fc952",
  measurementId: "G-6HHH00KWVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};