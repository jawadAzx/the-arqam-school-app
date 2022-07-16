// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQltLmUwSw_G7cuuoIAkxZmZb38CAL4zs",
  authDomain: "the-arqam-school-backend.firebaseapp.com",
  projectId: "the-arqam-school-backend",
  storageBucket: "the-arqam-school-backend.appspot.com",
  messagingSenderId: "715501499234",
  appId: "1:715501499234:web:6e8a4aa3ec4887e6de723b",
  measurementId: "G-7KBTZK5GC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();