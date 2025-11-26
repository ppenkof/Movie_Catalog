// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByBHpGygyPxwL9wGAA8g47WHGSMkBNkAI",
  authDomain: "game-catalog-a97a4.firebaseapp.com",
  projectId: "game-catalog-a97a4",
  storageBucket: "game-catalog-a97a4.firebasestorage.app",
  messagingSenderId: "139709744840",
  appId: "1:139709744840:web:288d58b2227d2767e107fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);