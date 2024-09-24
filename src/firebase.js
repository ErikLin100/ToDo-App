import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
    apiKey: "AIzaSyCjpfHMlt2tl_9Z5vxH4mbWzh9RpfiyKEc",
    authDomain: "todoappwithreact-716c3.firebaseapp.com",
    projectId: "todoappwithreact-716c3",
    storageBucket: "todoappwithreact-716c3.appspot.com",
    messagingSenderId: "20838616601",
    appId: "1:20838616601:web:34685b235ab59bc3ef2488"
  };

  initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();

export { auth, db, provider };