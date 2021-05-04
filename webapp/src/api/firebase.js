  
import firebase from "firebase/app";
import firestore from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAdiZHzzRhKV3BoE_bXmU5DpR6DTRlbVhY",
    authDomain: "radarines6b-8c519.firebaseapp.com",
    projectId: "radarines6b-8c519",
    storageBucket: "radarines6b-8c519.appspot.com",
    messagingSenderId: "581545841226",
    appId: "1:581545841226:web:077226882de054b0e94cb3"
  };

  //Inicializar firebase
  const fb = firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();