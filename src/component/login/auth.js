
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCE5mT37_JEC2tw_cvb-sPtCsxaPZVWHY0",
  authDomain: "transportation-2ce31.firebaseapp.com",
  projectId: "transportation-2ce31",
  storageBucket: "transportation-2ce31.firebasestorage.app",
  messagingSenderId: "1011398315134",
  appId: "1:1011398315134:web:3a11f03a84fbc480935c2f",
  measurementId: "G-FFXG4CN7ZV",
 // databaseURl:"https://console.firebase.google.com/u/0/project/transportation-2ce31/database/transportation-2ce31-default-rtdb/data/~2F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth};