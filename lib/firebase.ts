
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCr6OgmiLjNZyFbkUmcLpqRl0qbKG8wrls",
  authDomain: "simpleagentix-l.firebaseapp.com",
  projectId: "simpleagentix-l",
  storageBucket: "simpleagentix-l.firebasestorage.app",
  messagingSenderId: "758659783227",
  appId: "1:758659783227:web:63953f57fa7e66426b1a1e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
