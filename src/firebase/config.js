import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDHuY1iPteD0kNmAmw9wsXCiQOpkDG7w9Y",
  authDomain: "sportsvista-19664.firebaseapp.com",
  // databaseURL: "https://your-database-name.firebaseio.com",
  projectId: "sportsvista-19664",
  messagingSenderId: "319624225408",
  appId: "1:319624225408:android:f7250adb1a5fefbe07fc65",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const database = getFirestore();


export { firebase, database };
