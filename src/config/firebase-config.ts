// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8GOKBW5Rm_xmjvoTrhnqlKMNJgS3fFB0",
  authDomain: "mynotesrn.firebaseapp.com",
  databaseURL:
    "https://mynotesrn-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mynotesrn",
  storageBucket: "mynotesrn.appspot.com",
  messagingSenderId: "914336823878",
  appId: "1:914336823878:web:d07b2dfd3bcbe3684aa847",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
