import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJVl9HqyjGBWLn7lVpP_JwBZPwnaYPVYA",
  authDomain: "moodwatch-adba6.firebaseapp.com",
  projectId: "moodwatch-adba6",
  storageBucket: "moodwatch-adba6.appspot.com",
  messagingSenderId: "1005342121136",
  appId: "1:1005342121136:android:14c49a47bcf8d385f8ef75"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
