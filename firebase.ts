// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "---- replace with your key -----",
  authDomain: "---- replace with your key -----",
  projectId: "---- replace with your key -----",
  storageBucket: "---- replace with your key -----",
  messagingSenderId: "---- replace with your key -----",
  appId: "---- replace with your key -----"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export  {app,auth}