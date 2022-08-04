import { initializeApp } from "firebase/app";
import toast  from 'react-hot-toast';
import { getAuth,GoogleAuthProvider ,signInWithPopup }  from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { signOut } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCl0dSrM92JNmsYiSTYcMSZKocF_CaV8FE",
  authDomain: "discord-2yt.firebaseapp.com",
  projectId: "discord-2yt",
  storageBucket: "discord-2yt.appspot.com",
  messagingSenderId: "729786037837",
  appId: "1:729786037837:web:4c013df4304e371f724e04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()

export const db = getFirestore(app) 

export const provider =  new GoogleAuthProvider()

export async function signOut1() {
    await signOut(auth);
  }

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
        toast.success(`başarıyla giriş yaptın,${result.user.displayName} `)
       

      })
      .catch((error) => {
        toast.error(error.message);
      });
  };


