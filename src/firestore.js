import firebase from "firebase";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYXTRZcJJ1Gp3OUZCYenPxuMxYsqBudYA",
  authDomain: "open-doors-english.firebaseapp.com",
  databaseURL: "https://open-doors-english.firebaseio.com",
  projectId: "open-doors-english",
  storageBucket: "open-doors-english.appspot.com",
  messagingSenderId: "1038283936761",
  appId: "1:1038283936761:web:2ff9a83e0acf6922df6328",
  measurementId: "G-BPEJYEDNYR",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// Firestore
export const db = firebase.firestore();

const { TimeStamp, GeoPoint } = firebase.firestore;
export { TimeStamp, GeoPoint };
