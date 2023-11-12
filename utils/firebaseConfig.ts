// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBGebHQEJYayYnUE_t6XEbFXNWxLyvcMng",
  authDomain: "jade-d0a9b.firebaseapp.com",
  projectId: "jade-d0a9b",
  storageBucket: "jade-d0a9b.appspot.com",
  messagingSenderId: "413806528499",
  appId: "1:413806528499:web:2db3ca62f0684066833486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { firestore };

// Get Auth instance
export const auth = getAuth(app);
