import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa4KzLsS2T9TZl1GzreHBiUHpRiJw1LN0",
  authDomain: "diary-4ab5b.firebaseapp.com",
  projectId: "diary-4ab5b",
  storageBucket: "diary-4ab5b.appspot.com",
  messagingSenderId: "920624895206",
  appId: "1:920624895206:web:9b7fd8694195740b769727",
  measurementId: "G-PVXHQYZ6J4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

export {app, auth, db};