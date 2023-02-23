// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";

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

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
