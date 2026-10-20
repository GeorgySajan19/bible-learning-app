import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCBI1WYRwd6pSYHvw3xSlFUxtYRP1pFJVA",
  authDomain: "bible-learning-app-ba54a.firebaseapp.com",
  projectId: "bible-learning-app-ba54a",
  storageBucket: "bible-learning-app-ba54a.firebasestorage.app",
  messagingSenderId: "18562374027",
  appId: "1:18562374027:web:20d4957bb71875eae7778e",
  measurementId: "G-6F600RS98F"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);