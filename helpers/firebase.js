// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAerqKzpher6mJfaZw5uxf6nNEYKwLQA2c",
  authDomain: "netflix-clone-dcd4e.firebaseapp.com",
  databaseURL: "https://netflix-clone-dcd4e-default-rtdb.firebaseio.com",
  projectId: "netflix-clone-dcd4e",
  storageBucket: "netflix-clone-dcd4e.appspot.com",
  messagingSenderId: "88813648776",
  appId: "1:88813648776:web:ad5510908ca846ae68d83d",
  measurementId: "G-1Z03KSCW9X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };
