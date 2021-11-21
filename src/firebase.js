// // Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9KM0ixbgR6tlY2eT5Lzb0Vfwd6YeLMMo",
  authDomain: "susume-system.firebaseapp.com",
  projectId: "susume-system",
  storageBucket: "susume-system.appspot.com",
  messagingSenderId: "749473246151",
  appId: "1:749473246151:web:bfb6e68f33e092ad0cc7e2"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth()
