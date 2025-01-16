import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFoHnMvEE0sq1aZIJZm96R3sHWmLZcd3A",
  authDomain: "myapp-b6546.firebaseapp.com",
  projectId: "myapp-b6546",
  storageBucket: "myapp-b6546.firebasestorage.app",
  messagingSenderId: "523598092599",
  appId: "1:523598092599:web:f419d61c96b0290c5122b2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 