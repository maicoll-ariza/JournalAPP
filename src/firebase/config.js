// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvMfZBQa7Z-N5eVmFuMgCnsntCD3Y8r6k",
  authDomain: "journal-app-fernandoherrera.firebaseapp.com",
  projectId: "journal-app-fernandoherrera",
  storageBucket: "journal-app-fernandoherrera.appspot.com",
  messagingSenderId: "365649125057",
  appId: "1:365649125057:web:a7f0e5f472137d6bbcbe40"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

//Extraer toda la configuración de la autenticación
export const FirebaseAuth = getAuth( FirebaseApp ); 

//Extraer configuración de la base de datos CloudStore
export const FirebaseDB = getFirestore( FirebaseApp ); 