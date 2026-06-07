import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

 
const firebaseConfig = {
  apiKey: "AIzaSyBeJ6iJ72QI4aMUD4czYDjV0Cau1hlVz9U",
  authDomain: "netflix-68f0c.firebaseapp.com",
  projectId: "netflix-68f0c",
  storageBucket: "netflix-68f0c.firebasestorage.app",
  messagingSenderId: "683529143970",
  appId: "1:683529143970:web:eb325bf437a7198880b9fb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        toast.error(error.code.split("/")[1].split("-").join(" "))

    }
}

const login = async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "))

    }
}

const logout = ()=>{
    signOut(auth);
}

export{auth, db, login, signup, logout};