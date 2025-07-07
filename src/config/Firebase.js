
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {toast} from 'react-toastify';


const firebaseConfig = {
  apiKey: "AIzaSyCmoAoifFRPm6jN4WmVMJ1_QOHF1kLEQ9M",
  authDomain: "chat-app-gs-187fc.firebaseapp.com",
  projectId: "chat-app-gs-187fc",
  storageBucket: "chat-app-gs-187fc.firebasestorage.app",
  messagingSenderId: "96404537791",
  appId: "1:96404537791:web:6adeb3ed8fba157230a10a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db=getFirestore(app);
const signup = async (username,email,password)=>{
  try{
    //create user
    const res=await createUserWithEmailAndPassword(auth,email,password);
    const user=res.user;
    // store user data in firebase
    //whenever user create form two data collection form 1.chat 2. user data
    await setDoc(doc(db,"users",user.uid),{
      id:user.uid,
      username:username.toLowerCase(),
      email:email,
      name:"",
      avatar:"",
      bio:"Hey,There I am using caht-app",
      lastseen:Date.now()

    })

    await setDoc(doc(db, "chats", user.uid), {
  chatData: [],
});



  }catch(error){
    console.error(error);
    toast.error(error.code.replace("auth/", "").replaceAll("-", " "));
  }
}

const login=async(email,password)=>{
  try {
    await signInWithEmailAndPassword(auth,email,password)
    
  } catch (error) {
    console.error(error);
    toast.error(error.code.replace("auth/", "").replaceAll("-", " "));
   }
}

const logout= async()=>{
  try {
    await signOut(auth)
    
  } catch (error) {
     console.error(error);
    toast.error(error.code.replace("auth/", "").replaceAll("-", " "));
    
  }
  
}

 export {signup,login,logout,auth,db}

