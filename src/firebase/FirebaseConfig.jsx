// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjWX2R0OSgFTv6j5GAtjJxicxHMdMB_Fw",
  authDomain: "ezybuy-d7ac8.firebaseapp.com",
  projectId: "ezybuy-d7ac8",
  storageBucket: "ezybuy-d7ac8.appspot.com",
  messagingSenderId: "666677709302",
  appId: "1:666677709302:web:26845972fd825a876b5fd7",
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
