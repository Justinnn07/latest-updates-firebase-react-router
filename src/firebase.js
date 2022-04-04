import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3r9LM6oRKeOwMfiAf932bMcDcGXln6U4",
  authDomain: "fir-learn-7a546.firebaseapp.com",
  projectId: "fir-learn-7a546",
  storageBucket: "fir-learn-7a546.appspot.com",
  messagingSenderId: "425629703240",
  appId: "1:425629703240:web:676b207ae5ebbfc7688c7d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
