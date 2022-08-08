// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQltLmUwSw_G7cuuoIAkxZmZb38CAL4zs",
  authDomain: "the-arqam-school-backend.firebaseapp.com",
  projectId: "the-arqam-school-backend",
  storageBucket: "the-arqam-school-backend.appspot.com",
  messagingSenderId: "715501499234",
  appId: "1:715501499234:web:6e8a4aa3ec4887e6de723b",
  measurementId: "G-7KBTZK5GC7"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyC_31dqxiNUAn53MTyEoYbiPfMyu-JHqG8",
//     authDomain: "test-c7a3c.firebaseapp.com",
//     projectId: "test-c7a3c",
//     storageBucket: "test-c7a3c.appspot.com",
//     messagingSenderId: "771805029735",
//     appId: "1:771805029735:web:bbf78d467e00f42a7f7bc2",
//     measurementId: "G-VTB2YKXL2P"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();