import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs7wKzB33PIWr6B3i7aEq2AnLQFvZX3dI",
  authDomain: "chat-app-76799.firebaseapp.com",
  projectId: "chat-app-76799",
  storageBucket: "chat-app-76799.appspot.com",
  messagingSenderId: "832470787562",
  appId: "1:832470787562:web:f5409e61ac2efd8ddafe93",
  measurementId: "G-LY0B4D4TGX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const storage = getStorage();
export const db = getFirestore();
