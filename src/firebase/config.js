// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";  // ← AGREGAR ESTA LÍNEA

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD5NwRfexF9GkxvTiQuEK3QRAM_6wxZ9ss",
    authDomain: "pandora-fresh.firebaseapp.com",
    projectId: "pandora-fresh",
    storageBucket: "pandora-fresh.firebasestorage.app",
    messagingSenderId: "334780381698",
    appId: "1:334780381698:web:1a2a112e3542f511c5c61b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);  // ← AGREGAR ESTAS DOS LÍNEAS