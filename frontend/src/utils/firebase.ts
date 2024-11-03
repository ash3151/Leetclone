import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "____",
  authDomain: "___",
  projectId: "____",
  storageBucket: "____",
  messagingSenderId: "___",
  appId: "____"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
